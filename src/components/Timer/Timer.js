import { Text, View } from 'react-native';
import { ROUND_SECONDS, useGame } from '../../context/GameContext';
import { colors } from '../../theme';
import { styles } from './Timer.styles';

export default function Timer() {
  const { timeLeft } = useGame();
  const color = timeLeft > 8 ? colors.ok : timeLeft > 4 ? colors.warn : colors.bad;

  return (
    <View style={styles.wrap}>
      <View style={styles.track}>
        <View style={[styles.bar, { width: `${(timeLeft / ROUND_SECONDS) * 100}%`, backgroundColor: color }]} />
      </View>
      <Text style={[styles.text, { color }]}>{timeLeft}s</Text>
    </View>
  );
}
