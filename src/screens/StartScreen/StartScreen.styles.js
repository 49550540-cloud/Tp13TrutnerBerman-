import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export const styles = StyleSheet.create({
  wrap: { gap: 14 },
  title: { color: colors.text, fontSize: 32, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: colors.muted, textAlign: 'center' },
  muted: { color: colors.muted, textAlign: 'center', fontSize: 12 },
  error: { color: colors.bad, textAlign: 'center' },
  input: {
    backgroundColor: colors.card,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 17,
  },
  modes: { flexDirection: 'row', gap: 10 },
  mode: { flex: 1, backgroundColor: colors.card, borderRadius: 10, padding: 12, borderWidth: 2, borderColor: 'transparent' },
  modeSelected: { borderColor: colors.primary },
  modeLabel: { color: colors.text, fontSize: 16, fontWeight: '700' },
  modeDescription: { color: colors.muted, fontSize: 12, marginTop: 4 },
  start: { backgroundColor: colors.ok, borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  disabled: { opacity: 0.4 },
  startText: { color: '#fff', fontSize: 18, fontWeight: '800' },
});
