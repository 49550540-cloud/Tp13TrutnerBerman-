import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar as RNStatusBar, StyleSheet } from 'react-native';
import { GameProvider, useGame } from './src/context/GameContext';
import StartScreen from './src/screens/StartScreen';
import GameScreen from './src/screens/GameScreen';
import { colors } from './src/theme';

function Main() {
  const { phase } = useGame();
  return phase === 'playing' ? <GameScreen /> : <StartScreen />;
}

export default function App() {
  return (
    <GameProvider>
      <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Main />
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style="light" />
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: {
    padding: 16,
    paddingTop: (Platform.OS === 'android' ? RNStatusBar.currentHeight || 24 : 54) + 12,
    paddingBottom: 40,
  },
});
