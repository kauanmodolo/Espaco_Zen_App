// screens/PerfilScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Navbar from '../components/Navbar';
import { firebase } from '../firebaseConfig';

const PerfilScreen = ({ navigation }) => {
  const currentUser = firebase.auth().currentUser?.displayName || firebase.auth().currentUser?.email;

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigation.replace('Login');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bem-vindo(a), {currentUser}!</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Deslogar</Text>
      </TouchableOpacity>
      <Navbar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PerfilScreen;
