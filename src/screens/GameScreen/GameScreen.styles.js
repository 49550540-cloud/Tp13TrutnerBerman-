import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export const styles = StyleSheet.create({
  wrap: { gap: 14 },
  actions: { flexDirection: 'row', gap: 8 },
  action: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingVertical: 10, alignItems: 'center' },
  end: { borderColor: colors.bad },
  actionText: { color: colors.text, fontWeight: '600', fontSize: 13 },
});
