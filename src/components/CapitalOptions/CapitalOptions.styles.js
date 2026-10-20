import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export const styles = StyleSheet.create({
  wrap: { gap: 8 },
  question: { color: colors.muted, textAlign: 'center' },
  option: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  optionText: { color: colors.text, fontSize: 17, fontWeight: '600' },
});
