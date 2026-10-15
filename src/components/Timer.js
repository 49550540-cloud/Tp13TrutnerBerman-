import { StyleSheet, Text, View } from 'react-native';
import { ROUND_SECONDS, useGame } from '../context/GameContext';
import { colors } from '../theme';

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

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  track: { flex: 1, height: 10, backgroundColor: colors.card, borderRadius: 5, overflow: 'hidden' },
  bar: { height: '100%', borderRadius: 5 },
  text: { width: 36, textAlign: 'right', fontWeight: '700', fontSize: 16 },
});
