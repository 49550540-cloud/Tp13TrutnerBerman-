import { Pressable, StyleSheet, Text, View } from 'react-native';
import { HINT_COST_SECONDS, useGame } from '../context/GameContext';
import { colors } from '../theme';

export default function Hint() {
  const { mode, hintText, requestHint } = useGame();

  return (
    <View style={styles.wrap}>
      {mode === 'flags' && <Text style={styles.hint}>{hintText}</Text>}
      <Pressable style={styles.button} onPress={requestHint}>
        <Text style={styles.buttonText}>
          💡 {mode === 'capitals' ? 'Borrar una opción' : 'Revelar una letra'} (−{HINT_COST_SECONDS}s)
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 8 },
  hint: { color: colors.text, fontSize: 20, letterSpacing: 1, fontFamily: 'monospace', textAlign: 'center' },
  button: { borderWidth: 1, borderColor: colors.warn, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 12 },
  buttonText: { color: colors.warn, fontWeight: '600' },
});
