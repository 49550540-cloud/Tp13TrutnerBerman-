import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useGame } from '../context/GameContext';
import { colors } from '../theme';

export default function Leaderboard() {
  const { leaderboard, clearLeaderboard } = useGame();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>🏆 Ranking</Text>
      {leaderboard.length === 0 ? (
        <Text style={styles.empty}>Todavía no hay partidas guardadas.</Text>
      ) : (
        leaderboard.slice(0, 10).map((entry, i) => (
          <View key={`${entry.name}-${entry.mode}`} style={styles.row}>
            <Text style={styles.pos}>{i + 1}.</Text>
            <Text style={styles.name}>{entry.name}</Text>
            <Text style={styles.mode}>{entry.mode === 'capitals' ? 'Capitales' : 'Banderas'}</Text>
            <Text style={styles.score}>{entry.score}</Text>
          </View>
        ))
      )}
      {leaderboard.length > 0 && (
        <Pressable onPress={clearLeaderboard}>
          <Text style={styles.clear}>Borrar ranking</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 14, gap: 6 },
  title: { color: colors.text, fontSize: 18, fontWeight: '700', marginBottom: 4 },
  empty: { color: colors.muted },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pos: { color: colors.muted, width: 24 },
  name: { color: colors.text, flex: 1, fontSize: 15 },
  mode: { color: colors.muted, fontSize: 12 },
  score: { color: colors.ok, fontWeight: '700', width: 48, textAlign: 'right' },
  clear: { color: colors.bad, textAlign: 'right', marginTop: 6, fontSize: 13 },
});
