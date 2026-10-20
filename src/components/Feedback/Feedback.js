import { Text } from 'react-native';
import { useGame } from '../../context/GameContext';
import { colors } from '../../theme';
import { styles } from './Feedback.styles';

const COLORS = { ok: colors.ok, bad: colors.bad, timeout: colors.warn };

export default function Feedback() {
  const { feedback } = useGame();
  if (!feedback) return null;
  return <Text style={[styles.text, { color: COLORS[feedback.type] }]}>{feedback.text}</Text>;
}
