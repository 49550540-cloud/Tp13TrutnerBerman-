import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useGame } from '../context/GameContext';
import { colors } from '../theme';

// Modo capitales: 3 opciones, una es la capital correcta.
export default function CapitalOptions() {
  const { visibleOptions, guessCapital } = useGame();

  return (
    <View style={styles.wrap}>
      <Text style={styles.question}>¿Cuál es la capital de este país?</Text>
      {visibleOptions.map((option) => (
        <Pressable key={option} style={styles.option} onPress={() => guessCapital(option)}>
          <Text style={styles.optionText}>{option}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
