import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useProgress } from '../contexts/ProgressContext';
import MeditationCard from '../components/MeditationCard';
import ProgressBar from '../components/ProgressBar';
import Navbar from '../components/Navbar';
import { fetchRandomQuote } from '../api/quotable';
import SubmitQuoteModal from '../components/SubmitQuoteModal';

const HomeScreen = () => {
  const { progress, incrementProgress, addCompletedSession } = useProgress();
  const [quote, setQuote] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const staticSessions = [
    { id: '1', title: 'Meditação Guiada 🧠', category: 'Relaxamento', duration: 10 },
    { id: '2', title: 'Meditação para Ansiedade 🧘🏻', category: 'Bem-Estar', duration: 15 },
    { id: '3', title: 'Meditação para Sono 😴', category: 'Relaxamento', duration: 20 },
  ];

  // Função para buscar uma citação aleatória
  const fetchQuote = async () => {
    try {
      const randomQuote = await fetchRandomQuote();
      setQuote(randomQuote);
    } catch (error) {
      setQuote('Erro ao carregar a citação. Tente novamente mais tarde.');
    }
  };

  // Carrega a citação quando a tela é montada
  useEffect(() => {
    fetchQuote();
  }, []);

  const handleStartMeditation = (session) => {
    Alert.alert('Sessão Iniciada', `Iniciando sessão de ${session.duration} minutos`);
    incrementProgress(session.duration);
    addCompletedSession(session);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Bem-vindo(a)!</Text>
      <Text style={styles.quote}>{quote}</Text>
      <TouchableOpacity onPress={fetchQuote}>
        <Text style={styles.refreshText}>🔄 Atualizar Citação</Text>
      </TouchableOpacity>
      <ProgressBar progress={progress / 100} />
      <FlatList
        data={staticSessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MeditationCard
            title={item.title}
            category={item.category}
            duration={item.duration}
            onStart={() => handleStartMeditation(item)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 120 }} // Garante espaço para o botão e navbar
      />
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.submitButton}>
        <Text style={styles.submitQuoteText}>✍️ Enviar Citação</Text>
      </TouchableOpacity>
      <SubmitQuoteModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingBottom: 80, // Espaço extra para o botão e navbar
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    marginVertical: 10,
    textAlign: 'center',
    color: '#5da0a0',
  },
  refreshText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#007BFF',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 120, // Espaço para o botão
  },
  submitButton: {
    backgroundColor: '#5da0a0',
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  submitQuoteText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
