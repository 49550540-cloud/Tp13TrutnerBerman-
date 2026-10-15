import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useGame } from '../context/GameContext';
import { normalize } from '../utils/helpers';
import { colors } from '../theme';

// Modo banderas: se escribe el país o se elige de las sugerencias.
export default function GuessForm() {
  const { countries, guess } = useGame();
  const [text, setText] = useState('');

  const suggestions = useMemo(() => {
    const query = normalize(text);
    if (query.length < 2) return [];
    return countries.filter((c) => normalize(c.name).includes(query)).slice(0, 5);
  }, [text, countries]);

  function submit(value) {
    if (!value.trim()) return;
    guess(value);
    setText('');
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="¿De qué país es? (en inglés)"
          placeholderTextColor={colors.muted}
          autoCorrect={false}
          autoCapitalize="words"
          returnKeyType="send"
          onSubmitEditing={() => submit(text)}
        />
        <Pressable style={styles.button} onPress={() => submit(text)}>
          <Text style={styles.buttonText}>Arriesgar</Text>
        </Pressable>
      </View>
      {suggestions.map((c) => (
        <Pressable key={c.iso2} style={styles.suggestion} onPress={() => submit(c.name)}>
          <Text style={styles.suggestionText}>{c.name}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
