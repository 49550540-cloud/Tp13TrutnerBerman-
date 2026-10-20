import { Pressable, Text, View } from 'react-native';
import { HINT_COST_SECONDS, useGame } from '../../context/GameContext';
import { styles } from './Hint.styles';

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
