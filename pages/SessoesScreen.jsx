// screens/SessoesScreen.js
import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import { useProgress } from '../contexts/ProgressContext';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import MeditationCard from '../components/MeditationCard';
import CreateSessionButton from '../components/CreateSessionButton';
import CreateSessionModal from '../components/CreateSessionModal';
import ProgressBar from '../components/ProgressBar';
import Navbar from '../components/Navbar';

const SessoesScreen = () => {
  const { progress, sessions, incrementProgress, addCompletedSession } = useProgress();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedDuration, setSelectedDuration] = useState('Todas');

  const predefinedSessions = [
    { id: '1', title: 'Meditação Guiada 🧠', category: 'Relaxamento', duration: 10 },
    { id: '2', title: 'Meditação para Ansiedade 🧘🏻', category: 'Bem-Estar', duration: 15 },
    { id: '3', title: 'Meditação para Sono 😴', category: 'Relaxamento', duration: 20 },
  ];

  const filteredSessions = [...predefinedSessions, ...sessions].filter((session) => {
    const matchesSearchText = session.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || session.category === selectedCategory;
    const matchesDuration =
      selectedDuration === 'Todas' ||
      (selectedDuration === '5-10 min' && session.duration >= 5 && session.duration <= 10) ||
      (selectedDuration === '10-20 min' && session.duration > 10 && session.duration <= 20) ||
      (selectedDuration === '20+ min' && session.duration > 20);

    return matchesSearchText && matchesCategory && matchesDuration;
  });

  const handleStartMeditation = (session) => {
    Alert.alert('Sessão Iniciada', `Iniciando sessão de ${session.duration} minutos`);

    // Atualiza o progresso e adiciona a sessão ao histórico de concluídas
    incrementProgress(session.duration); 
    addCompletedSession(session); 
  };

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress / 100} />
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <FilterBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
      />
      {filteredSessions.length > 0 ? (
        <FlatList
          data={filteredSessions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MeditationCard
              title={item.title}
              category={item.category}
              duration={item.duration}
              onStart={() => handleStartMeditation(item)}
            />
          )}
        />
      ) : (
        <Text style={styles.noResults}>Nenhuma sessão encontrada.</Text>
      )}
      <CreateSessionButton onPress={() => setModalVisible(true)} />
      <CreateSessionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={(newSession) => {
          setModalVisible(false);
        }}
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
    paddingBottom: 60,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default SessoesScreen;
