import { Pressable, Text, View } from 'react-native';
import { useGame } from '../../context/GameContext';
import ScoreBoard from '../../components/ScoreBoard/ScoreBoard';
import Timer from '../../components/Timer/Timer';
import Flag from '../../components/Flag/Flag';
import Hint from '../../components/Hint/Hint';
import Feedback from '../../components/Feedback/Feedback';
import GuessForm from '../../components/GuessForm/GuessForm';
import CapitalOptions from '../../components/CapitalOptions/CapitalOptions';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import { styles } from './GameScreen.styles';

export default function GameScreen() {
  const { mode, skipCountry, resetScore, endGame } = useGame();

  return (
    <View style={styles.wrap}>
      <ScoreBoard />
      <Timer />
      <Flag />
      <Hint />
      <Feedback />
      {mode === 'capitals' ? <CapitalOptions /> : <GuessForm />}

      <View style={styles.actions}>
        <Pressable style={styles.action} onPress={skipCountry}>
          <Text style={styles.actionText}>Saltar</Text>
        </Pressable>
        <Pressable style={styles.action} onPress={resetScore}>
          <Text style={styles.actionText}>Reiniciar puntos</Text>
        </Pressable>
        <Pressable style={[styles.action, styles.end]} onPress={endGame}>
          <Text style={styles.actionText}>Terminar</Text>
        </Pressable>
      </View>

      <Leaderboard />
    </View>
  );
}
