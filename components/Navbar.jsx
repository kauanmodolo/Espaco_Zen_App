// components/Navbar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Usando ícones do Expo

const Navbar = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Obtém a rota ativa atual

  // Função para verificar se a rota está ativa
  const isActiveRoute = (routeName) => route.name === routeName;

  return (
    <View style={styles.navbarContainer}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
        <MaterialCommunityIcons 
          name="home-outline" 
          size={24} 
          color={isActiveRoute('Home') ? '#5da0a0' : '#000'} 
        />
        <Text style={[styles.navText, { color: isActiveRoute('Home') ? '#5da0a0' : '#000' }]}>Início</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Sessoes')}>
        <MaterialCommunityIcons 
          name="meditation" 
          size={24} 
          color={isActiveRoute('Sessoes') ? '#5da0a0' : '#000'} 
        />
        <Text style={[styles.navText, { color: isActiveRoute('Sessoes') ? '#5da0a0' : '#000' }]}>Sessões</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Historico')}>
        <MaterialCommunityIcons 
          name="history" 
          size={24} 
          color={isActiveRoute('Historico') ? '#5da0a0' : '#000'} 
        />
        <Text style={[styles.navText, { color: isActiveRoute('Historico') ? '#5da0a0' : '#000' }]}>Histórico</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Perfil')}>
        <MaterialCommunityIcons 
          name="account-circle-outline" 
          size={24} 
          color={isActiveRoute('Perfil') ? '#5da0a0' : '#000'} 
        />
        <Text style={[styles.navText, { color: isActiveRoute('Perfil') ? '#5da0a0' : '#000' }]}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default Navbar;
