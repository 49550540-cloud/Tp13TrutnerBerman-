import { Platform, StatusBar as RNStatusBar, StyleSheet } from 'react-native';
import { colors } from './src/theme';

export const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: {
    padding: 16,
    paddingTop: (Platform.OS === 'android' ? RNStatusBar.currentHeight || 24 : 54) + 12,
    paddingBottom: 40,
  },
});
