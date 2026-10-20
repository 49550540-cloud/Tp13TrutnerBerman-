# TP13 - Adiviná el País (Trutner Berman)

Juego móvil hecho con **React Native + Expo**. Se muestra una bandera y hay que adivinar de qué país es (o, en el modo Capitales, cuál es su capital).

Datos: [CountriesNow API](https://countriesnow.space)
- Banderas: `GET /api/v0.1/countries/flag/images`
- Capitales: `GET /api/v0.1/countries/capital`

## Cómo correrlo en el celular (Expo Go)

1. Instalar **Expo Go** en el celular (Play Store / App Store), actualizado a la última versión (el proyecto usa Expo SDK 57).
2. En la compu:
   ```bash
   npm install
   npx expo start
   npm install @expo/ngrok@^4.1.0

   ```
3. Escanear el QR con Expo Go (Android) o con la cámara (iOS). El celu y la compu tienen que estar en la misma red Wi-Fi; si no, usar `npx expo start --tunnel`.

## Reglas

- Acierto: **+10 puntos** + los segundos que quedaban en el timer, y pasa a otro país al azar.
- Error: **−1 punto**.
- Timer de **15 s** por bandera. Si se termina, se muestra la respuesta y pasa al siguiente país.
- Pistas: en Banderas revela una letra al azar del nombre; en Capitales borra una opción incorrecta. Cada pista pedida resta **2 s** al timer.
- En el modo Capitales además se borra automáticamente una opción incorrecta cada 5 s (siempre quedan al menos 2).
- Multijugador: cada jugador pone su nombre antes de jugar. Al tocar **Terminar** se guarda su mejor puntaje en el ranking.
- El ranking se guarda en el teléfono con **AsyncStorage** (el equivalente a `localStorage` en React Native), así que sobrevive a cerrar la app.

Los nombres de los países vienen en inglés desde la API. Mientras escribís aparecen sugerencias que se pueden tocar. La comparación ignora mayúsculas y acentos.

## Estructura

Todo el estado y la lógica viven en `GameContext` (`createContext` + `useContext`). Ningún componente recibe datos del juego por props: cada uno usa el hook `useGame()`.

```
App.js / App.styles.js       <GameProvider> envuelve toda la app
src/context/GameContext.js   estado: países, país actual, puntaje, jugador, timer, pistas, ranking
                             funciones: startGame, guess, guessCapital, nextCountry, skipCountry,
                                        requestHint, resetScore, endGame, clearLeaderboard
src/theme.js                 colores compartidos
src/screens/
  StartScreen/       nombre del jugador + elegir modo + ranking
  GameScreen/        pantalla de juego
src/components/
  Flag/              bandera actual
  GuessForm/         input + sugerencias (modo Banderas)
  CapitalOptions/    3 opciones de capital (modo Capitales)
  ScoreBoard/        jugador y puntaje
  Timer/             cuenta regresiva
  Hint/              pistas
  Feedback/          mensaje de acierto/error
  Leaderboard/       tabla de posiciones
```

Cada componente y pantalla tiene su propia carpeta con dos archivos:
- `Nombre.js`: el código del componente.
- `Nombre.styles.js`: los estilos (`StyleSheet.create`), que el componente importa como `styles`.

React Native no usa archivos `.css`: los estilos se escriben en JavaScript con `StyleSheet`, por eso van en un `.styles.js` aparte.

Las banderas de la API son SVG de Wikimedia. Como el componente `Image` de React Native no dibuja SVG, se pide la miniatura PNG que Wikimedia genera para ese mismo archivo. Si falla, se usa `flagcdn.com` con el código ISO2 del país.
