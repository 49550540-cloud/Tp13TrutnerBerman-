import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 8 },
  hint: { color: colors.text, fontSize: 20, letterSpacing: 1, fontFamily: 'monospace', textAlign: 'center' },
  button: { borderWidth: 1, borderColor: colors.warn, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 12 },
  buttonText: { color: colors.warn, fontWeight: '600' },
});
