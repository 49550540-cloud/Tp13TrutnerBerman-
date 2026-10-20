import { Text, View } from 'react-native';
import { useGame } from '../../context/GameContext';
import { colors } from '../../theme';
import { styles } from './ScoreBoard.styles';

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
