// components/ProgressBar.js
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar as RNProgressBar } from 'react-native-paper';

const ProgressBar = ({ progress }) => {
  const textColor = progress > 0.2 ? '#fff' : '#333'; // Ajusta a cor do texto com base no progresso

  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>Progresso Diário</Text>
      <View style={styles.progressBarContainer}>
        <RNProgressBar progress={progress} color="#5da0a0" style={styles.progressBar} />
        <Text style={[styles.percentageText, { color: textColor }]}>
          {Math.round(progress * 100)}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressBarContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  progressBar: {
    height: 15,
    borderRadius: 5,
  },
  percentageText: {
    position: 'absolute',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default ProgressBar;
