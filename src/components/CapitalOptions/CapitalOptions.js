import { Pressable, Text, View } from 'react-native';
import { useGame } from '../../context/GameContext';
import { styles } from './CapitalOptions.styles';

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
