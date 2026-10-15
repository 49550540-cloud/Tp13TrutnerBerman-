import { StyleSheet, Text, View } from 'react-native';
import { useGame } from '../context/GameContext';
import { colors } from '../theme';

export default function ScoreBoard() {
  const { playerName, score, mode } = useGame();

  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.label}>Jugador</Text>
        <Text style={styles.name}>{playerName}</Text>
        <Text style={styles.mode}>{mode === 'capitals' ? 'Modo Capitales' : 'Modo Banderas'}</Text>
      </View>
      <View style={styles.scoreBox}>
        <Text style={styles.label}>Puntos</Text>
        <Text style={[styles.score, score < 0 && { color: colors.bad }]}>{score}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: colors.muted, fontSize: 12, textTransform: 'uppercase' },
  name: { color: colors.text, fontSize: 18, fontWeight: '700' },
  mode: { color: colors.primary, fontSize: 13 },
  scoreBox: { alignItems: 'flex-end' },
  score: { color: colors.ok, fontSize: 32, fontWeight: '800' },
});
