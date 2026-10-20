import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { normalize, randomItem, shuffle } from '../utils/helpers';

const FLAGS_URL = 'https://countriesnow.space/api/v0.1/countries/flag/images';
const CAPITALS_URL = 'https://countriesnow.space/api/v0.1/countries/capital';
const LEADERBOARD_KEY = 'tp13:leaderboard';

export const ROUND_SECONDS = 15;
export const HINT_COST_SECONDS = 2;
const OPTION_REMOVAL_EVERY = 5;
const CORRECT_POINTS = 10;
const WRONG_POINTS = -1;

const GameContext = createContext(null);

export function GameProvider({ children }) {
  // Datos de la API
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Partida
  const [phase, setPhase] = useState('start'); // 'start' | 'playing'
  const [mode, setMode] = useState('flags'); // 'flags' | 'capitals'
  const [playerName, setPlayerName] = useState('');
  const [currentCountry, setCurrentCountry] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);

  // Timer
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [elapsed, setElapsed] = useState(0);

  // Pistas
  const [revealed, setRevealed] = useState([]); // índices de letras reveladas (modo banderas)
  const [capitalOptions, setCapitalOptions] = useState([]); // 3 opciones (modo capitales)
  const [removedOptions, setRemovedOptions] = useState([]);

  // Ranking
  const [leaderboard, setLeaderboard] = useState([]);

  const roundOver = useRef(false);

  // Al montar: traer países (banderas + capitales) y el ranking guardado.
  useEffect(() => {
    async function loadCountries() {
      try {
        const [flagsRes, capitalsRes] = await Promise.all([fetch(FLAGS_URL), fetch(CAPITALS_URL)]);
        const flagsJson = await flagsRes.json();
        const capitalsJson = await capitalsRes.json();
        const capitalByIso = {};
        capitalsJson.data.forEach((c) => {
          if (c.iso2 && c.capital) capitalByIso[c.iso2] = c.capital;
        });
        const list = flagsJson.data.map((c) => ({
          name: c.name,
          flag: c.flag.trim(),
          iso2: c.iso2,
          capital: capitalByIso[c.iso2] || null,
        }));
        setCountries(list);
        setCurrentCountry(randomItem(list));
      } catch (e) {
        setError('No se pudieron cargar los países. Revisá tu conexión.');
      } finally {
        setLoading(false);
      }
    }

    async function loadLeaderboard() {
      try {
        const saved = await AsyncStorage.getItem(LEADERBOARD_KEY);
        if (saved) setLeaderboard(JSON.parse(saved));
      } catch (e) {
        // Si falla la lectura arrancamos con el ranking vacío.
      }
    }

    loadCountries();
    loadLeaderboard();
  }, []);

  const capitalCountries = useMemo(() => countries.filter((c) => c.capital), [countries]);

  const nextCountry = useCallback(
    (gameMode = mode) => {
      const pool = gameMode === 'capitals' ? capitalCountries : countries;
      if (pool.length === 0) return;
      let next = randomItem(pool);
      if (pool.length > 1) {
        while (next.iso2 === currentCountry?.iso2) next = randomItem(pool);
      }
      setCurrentCountry(next);
      setTimeLeft(ROUND_SECONDS);
      setElapsed(0);
      setRevealed([]);
      setRemovedOptions([]);
      if (gameMode === 'capitals') {
        const wrong = shuffle(
          [...new Set(capitalCountries.map((c) => c.capital))].filter((cap) => cap !== next.capital)
        ).slice(0, 2);
        setCapitalOptions(shuffle([next.capital, ...wrong]));
      } else {
        setCapitalOptions([]);
      }
      roundOver.current = false;
    },
    [mode, countries, capitalCountries, currentCountry]
  );

  // Timer: baja un segundo por vez mientras se está jugando.
  useEffect(() => {
    if (phase !== 'playing' || !currentCountry) return;
    const id = setInterval(() => {
      setTimeLeft((t) => Math.max(t - 1, 0));
      setElapsed((e) => e + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [phase, currentCountry]);

  // Se terminó el tiempo: se muestra la respuesta y pasa al siguiente país.
  useEffect(() => {
    if (phase !== 'playing' || timeLeft > 0 || roundOver.current) return;
    roundOver.current = true;
    const answer = mode === 'capitals' ? `${currentCountry.capital} (${currentCountry.name})` : currentCountry.name;
    setFeedback({ type: 'timeout', text: `¡Se acabó el tiempo! Era ${answer}.` });
    nextCountry();
  }, [timeLeft, phase, mode, currentCountry, nextCountry]);

  const removeWrongOption = useCallback(() => {
    if (!currentCountry) return;
    setRemovedOptions((removed) => {
      const remaining = capitalOptions.filter(
        (o) => o !== currentCountry.capital && !removed.includes(o)
      );
      // Siempre dejamos al menos 2 opciones visibles.
      if (remaining.length <= 1) return removed;
      return [...removed, randomItem(remaining)];
    });
  }, [capitalOptions, currentCountry]);

  // Modo capitales: se borra una opción incorrecta cada 5 segundos.
  useEffect(() => {
    if (phase !== 'playing' || mode !== 'capitals' || elapsed === 0) return;
    if (elapsed % OPTION_REMOVAL_EVERY === 0) removeWrongOption();
  }, [elapsed, phase, mode, removeWrongOption]);

  const startGame = useCallback(
    (name, gameMode) => {
      setPlayerName(name.trim());
      setMode(gameMode);
      setScore(0);
      setFeedback(null);
      setPhase('playing');
      nextCountry(gameMode);
    },
    [nextCountry]
  );

  const handleCorrect = useCallback(() => {
    const bonus = timeLeft;
    setScore((s) => s + CORRECT_POINTS + bonus);
    const label = mode === 'capitals' ? `${currentCountry.capital} es la capital de ${currentCountry.name}` : `Era ${currentCountry.name}`;
    setFeedback({ type: 'ok', text: `¡Correcto! ${label}. +${CORRECT_POINTS} y +${bonus} por tiempo.` });
    roundOver.current = true;
    nextCountry();
  }, [timeLeft, mode, currentCountry, nextCountry]);

  const handleWrong = useCallback((text) => {
    setScore((s) => s + WRONG_POINTS);
    setFeedback({ type: 'bad', text: `${text} no es correcto. ${WRONG_POINTS} punto.` });
  }, []);

  // Modo banderas: arriesgar el nombre del país.
  const guess = useCallback(
    (text) => {
      if (!currentCountry || !text.trim()) return false;
      if (normalize(text) === normalize(currentCountry.name)) {
        handleCorrect();
        return true;
      }
      handleWrong(`"${text.trim()}"`);
      return false;
    },
    [currentCountry, handleCorrect, handleWrong]
  );

  // Modo capitales: elegir una de las opciones.
  const guessCapital = useCallback(
    (option) => {
      if (!currentCountry) return;
      if (option === currentCountry.capital) handleCorrect();
      else {
        handleWrong(option);
        setRemovedOptions((removed) => [...removed, option]);
      }
    },
    [currentCountry, handleCorrect, handleWrong]
  );

  // Pista a pedido: cuesta 2 segundos del timer.
  const requestHint = useCallback(() => {
    if (!currentCountry || timeLeft <= HINT_COST_SECONDS) return;
    if (mode === 'capitals') {
      const visible = capitalOptions.filter((o) => !removedOptions.includes(o));
      if (visible.length <= 2) return;
      removeWrongOption();
    } else {
      const hidden = [...currentCountry.name]
        .map((ch, i) => (ch !== ' ' && !revealed.includes(i) ? i : null))
        .filter((i) => i !== null);
      if (hidden.length === 0) return;
      setRevealed([...revealed, randomItem(hidden)]);
    }
    setTimeLeft((t) => Math.max(t - HINT_COST_SECONDS, 0));
  }, [currentCountry, timeLeft, mode, revealed, capitalOptions, removedOptions, removeWrongOption]);

  const hintText = useMemo(() => {
    if (!currentCountry) return '';
    return [...currentCountry.name]
      .map((ch, i) => (ch === ' ' ? '  ' : revealed.includes(i) ? ch : '_'))
      .join(' ');
  }, [currentCountry, revealed]);

  const visibleOptions = capitalOptions.filter((o) => !removedOptions.includes(o));

  // Saltar el país actual sin sumar ni restar puntos.
  const skipCountry = useCallback(() => {
    if (!currentCountry) return;
    const answer = mode === 'capitals' ? `${currentCountry.capital} (${currentCountry.name})` : currentCountry.name;
    setFeedback({ type: 'timeout', text: `Salteado. Era ${answer}.` });
    nextCountry();
  }, [currentCountry, mode, nextCountry]);

  const resetScore = useCallback(() => setScore(0), []);

  const saveLeaderboard = useCallback(async (list) => {
    setLeaderboard(list);
    try {
      await AsyncStorage.setItem(LEADERBOARD_KEY, JSON.stringify(list));
    } catch (e) {
      // Si no se puede guardar, el ranking queda solo en memoria.
    }
  }, []);

  // Termina la partida: guarda el mejor puntaje del jugador en el modo jugado.
  const endGame = useCallback(() => {
    const existing = leaderboard.find((e) => e.name === playerName && e.mode === mode);
    let list = leaderboard;
    if (!existing) {
      list = [...leaderboard, { name: playerName, mode, score }];
    } else if (score > existing.score) {
      list = leaderboard.map((e) => (e === existing ? { ...e, score } : e));
    }
    saveLeaderboard([...list].sort((a, b) => b.score - a.score));
    setPhase('start');
    setFeedback(null);
  }, [leaderboard, playerName, mode, score, saveLeaderboard]);

  const clearLeaderboard = useCallback(() => saveLeaderboard([]), [saveLeaderboard]);

  const value = {
    countries,
    loading,
    error,
    phase,
    mode,
    playerName,
    currentCountry,
    score,
    feedback,
    timeLeft,
    hintText,
    visibleOptions,
    leaderboard,
    startGame,
    guess,
    guessCapital,
    nextCountry,
    skipCountry,
    requestHint,
    resetScore,
    endGame,
    clearLeaderboard,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame debe usarse dentro de <GameProvider>');
  return context;
}
