// App.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CadastroScreen from '../pages/CadastroScreen';
import LoginScreen from '../pages/LoginScreen';
import HomeScreen from '../pages/HomeScreen';
import SessoesScreen from '../pages/SessoesScreen';
import PerfilScreen from '../pages/PerfilScreen';
import HistoricoScreen from '../pages/HistoricoScreen';
import { ProgressProvider } from '../contexts/ProgressContext'; // Importa o contexto

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ProgressProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sessoes" component={SessoesScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="Historico" component={HistoricoScreen} />
      </Stack.Navigator>
    </ProgressProvider>
  );
};

export default App;
