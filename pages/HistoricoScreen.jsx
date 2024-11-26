// screens/HistoricoScreen.js
import React from 'react';
import { View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import { useProgress } from '../contexts/ProgressContext';
import MeditationCard from '../components/MeditationCard';
import ProgressBar from '../components/ProgressBar';
import Navbar from '../components/Navbar';

// Função para formatar a data e hora
const formatDate = (completedAt) => {
  if (!completedAt) return 'Data não disponível';

  // Verifica o tipo de `completedAt` e converte para uma `Date`
  const date = completedAt.toDate ? completedAt.toDate() : new Date(completedAt);

  const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('pt-BR', options);
};

const HistoricoScreen = () => {
  const { progress, completedSessions, incrementProgress, addCompletedSession } = useProgress();

  // Função para iniciar a sessão e atualizar o progresso e o histórico
  const handleStartMeditation = (session) => {
    Alert.alert('Sessão Iniciada', `Iniciando sessão de ${session.duration} minutos`);
    incrementProgress(session.duration); // Atualiza o progresso global
    addCompletedSession(session); // Adiciona a sessão ao histórico no Firebase
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Seu Histórico de Meditação</Text>
      
      {/* Barra de progresso com base no progresso atual */}
      <ProgressBar progress={progress / 100} />

      {completedSessions.length > 0 ? (
        <FlatList
          data={completedSessions}
          keyExtractor={(item, index) => `${item.id}-${index}`} // Chave exclusiva para permitir duplicatas
          renderItem={({ item }) => (
            <View style={styles.sessionContainer}>
              <MeditationCard
                title={item.title}
                category={item.category}
                duration={item.duration}
                onStart={() => handleStartMeditation(item)} // Permite iniciar a sessão a partir do histórico
              />
              {/* Exibe a data de conclusão formatada */}
              <Text style={styles.dateText}>Concluída em: {formatDate(item.completedAt)}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noResults}>Você ainda não concluiu nenhuma sessão de meditação.</Text>
      )}

      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingBottom: 60,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  sessionContainer: {
    marginBottom: 10,
  },
  dateText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 4,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default HistoricoScreen;
