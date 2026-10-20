import { Pressable, Text, View } from 'react-native';
import { useGame } from '../../context/GameContext';
import { styles } from './Leaderboard.styles';

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
