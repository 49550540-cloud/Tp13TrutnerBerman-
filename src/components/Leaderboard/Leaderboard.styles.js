import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export const styles = StyleSheet.create({
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
