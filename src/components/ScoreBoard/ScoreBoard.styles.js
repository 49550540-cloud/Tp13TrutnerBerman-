import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: colors.muted, fontSize: 12, textTransform: 'uppercase' },
  name: { color: colors.text, fontSize: 18, fontWeight: '700' },
  mode: { color: colors.primary, fontSize: 13 },
  scoreBox: { alignItems: 'flex-end' },
  score: { color: colors.ok, fontSize: 32, fontWeight: '800' },
});
