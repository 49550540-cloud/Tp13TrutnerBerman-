import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { useGame } from '../context/GameContext';
import { fallbackFlagUrl, flagPngUrl } from '../utils/helpers';
import { colors } from '../theme';

export default function Flag() {
  const { currentCountry } = useGame();
  const [useFallback, setUseFallback] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setUseFallback(false);
    setLoaded(false);
  }, [currentCountry]);

  if (!currentCountry) return null;

  const uri = useFallback ? fallbackFlagUrl(currentCountry.iso2) : flagPngUrl(currentCountry.flag);

  return (
    <View style={styles.box}>
      {!loaded && <ActivityIndicator style={StyleSheet.absoluteFill} color={colors.primary} />}
      <Image
        key={uri}
        source={{ uri, headers: { 'User-Agent': 'TP13FlagGame/1.0 (Expo; school project)' } }}
        style={styles.flag}
        resizeMode="contain"
        onLoad={() => setLoaded(true)}
        onError={() => !useFallback && setUseFallback(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
