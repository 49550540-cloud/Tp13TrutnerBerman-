import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { GameProvider, useGame } from './src/context/GameContext';
import StartScreen from './src/screens/StartScreen/StartScreen';
import GameScreen from './src/screens/GameScreen/GameScreen';
import { styles } from './App.styles';

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
