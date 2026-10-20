import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  track: { flex: 1, height: 10, backgroundColor: colors.card, borderRadius: 5, overflow: 'hidden' },
  bar: { height: '100%', borderRadius: 5 },
  text: { width: 36, textAlign: 'right', fontWeight: '700', fontSize: 16 },
});
