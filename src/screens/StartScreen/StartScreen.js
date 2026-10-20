import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';
import { useGame } from '../../context/GameContext';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import { colors } from '../../theme';
import { styles } from './StartScreen.styles';

const MODES = [
  { id: 'flags', label: '🏳️ Banderas', description: 'Escribí el país de la bandera' },
  { id: 'capitals', label: '🏛️ Capitales', description: 'Elegí la capital entre 3 opciones' },
];

export default function StartScreen() {
  const { loading, error, countries, startGame } = useGame();
  const [name, setName] = useState('');
  const [selectedMode, setSelectedMode] = useState('flags');

  const canStart = name.trim().length > 0 && countries.length > 0;

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Adiviná el País</Text>
      <Text style={styles.subtitle}>Acertá = +10 y los segundos que sobren · Errá = −1</Text>

      {loading && <ActivityIndicator size="large" color={colors.primary} />}
      {error && <Text style={styles.error}>{error}</Text>}
      {!loading && !error && <Text style={styles.muted}>{countries.length} países cargados</Text>}

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Tu nombre"
        placeholderTextColor={colors.muted}
        maxLength={20}
      />

      <View style={styles.modes}>
        {MODES.map((m) => (
          <Pressable
            key={m.id}
            style={[styles.mode, selectedMode === m.id && styles.modeSelected]}
            onPress={() => setSelectedMode(m.id)}
          >
            <Text style={styles.modeLabel}>{m.label}</Text>
            <Text style={styles.modeDescription}>{m.description}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={[styles.start, !canStart && styles.disabled]}
        disabled={!canStart}
        onPress={() => startGame(name, selectedMode)}
      >
        <Text style={styles.startText}>Jugar</Text>
      </Pressable>

      <Leaderboard />
    </View>
  );
}
