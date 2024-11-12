// screens/HomeScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { useProgress } from '../contexts/ProgressContext';
import MeditationCard from '../components/MeditationCard';
import ProgressBar from '../components/ProgressBar';
import Navbar from '../components/Navbar';

const HomeScreen = () => {
  const { progress, incrementProgress, addCompletedSession } = useProgress();

  const staticSessions = [
    { id: '1', title: 'Meditação Guiada 🧠', category: 'Relaxamento', duration: 10 },
    { id: '2', title: 'Meditação para Ansiedade 🧘🏻', category: 'Bem-Estar', duration: 15 },
    { id: '3', title: 'Meditação para Sono 😴', category: 'Relaxamento', duration: 20 },
  ];

  const handleStartMeditation = (session) => {
    Alert.alert('Sessão Iniciada', `Iniciando sessão de ${session.duration} minutos`);
    incrementProgress(session.duration);
    addCompletedSession(session); // Adiciona ao histórico de sessões concluídas
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Bem-vindo(a)!</Text>
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
        contentContainerStyle={styles.listContainer}
      />
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 16,
  },
});

export default HomeScreen;
