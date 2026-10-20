import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export const styles = StyleSheet.create({
  box: {
    width: '100%',
    aspectRatio: 3 / 2,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    justifyContent: 'center',
  },
  flag: { width: '100%', height: '100%' },
});
