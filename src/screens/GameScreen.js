import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useGame } from '../context/GameContext';
import ScoreBoard from '../components/ScoreBoard';
import Timer from '../components/Timer';
import Flag from '../components/Flag';
import Hint from '../components/Hint';
import Feedback from '../components/Feedback';
import GuessForm from '../components/GuessForm';
import CapitalOptions from '../components/CapitalOptions';
import Leaderboard from '../components/Leaderboard';
import { colors } from '../theme';

export default function GameScreen() {
  const { mode, skipCountry, resetScore, endGame } = useGame();

  return (
    <View style={styles.wrap}>
      <ScoreBoard />
      <Timer />
      <Flag />
      <Hint />
      <Feedback />
      {mode === 'capitals' ? <CapitalOptions /> : <GuessForm />}

      <View style={styles.actions}>
        <Pressable style={styles.action} onPress={skipCountry}>
          <Text style={styles.actionText}>Saltar</Text>
        </Pressable>
        <Pressable style={styles.action} onPress={resetScore}>
          <Text style={styles.actionText}>Reiniciar puntos</Text>
        </Pressable>
        <Pressable style={[styles.action, styles.end]} onPress={endGame}>
          <Text style={styles.actionText}>Terminar</Text>
        </Pressable>
      </View>

      <Leaderboard />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 14 },
  actions: { flexDirection: 'row', gap: 8 },
  action: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingVertical: 10, alignItems: 'center' },
  end: { borderColor: colors.bad },
  actionText: { color: colors.text, fontWeight: '600', fontSize: 13 },
});
