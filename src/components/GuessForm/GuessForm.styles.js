import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export const styles = StyleSheet.create({
  wrap: { gap: 6 },
  row: { flexDirection: 'row', gap: 8 },
  input: {
    flex: 1,
    backgroundColor: colors.card,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  button: { backgroundColor: colors.primary, borderRadius: 8, paddingHorizontal: 14, justifyContent: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
  suggestion: { backgroundColor: colors.card, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 12 },
  suggestionText: { color: colors.text, fontSize: 15 },
});
