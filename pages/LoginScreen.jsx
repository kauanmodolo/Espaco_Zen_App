// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, Image, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import { firebase } from '../firebaseConfig';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      // Autentica o usuário com email e senha
      await firebase.auth().signInWithEmailAndPassword(email, password);
      
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      setEmail('');
      setPassword('');
      navigation.replace('Home'); // Navega para a tela "Home" após login
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Email ou senha incorretos.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.label}>Entre com seu email e senha</Text>
      <InputField 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input} 
      />
      <InputField 
        placeholder="Senha" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
        style={styles.input} 
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.createButton} 
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.createButtonText}>Criar uma conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  input: {
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 10,
    width: 250,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  label: {
    width: 250,
    padding: 10,
    marginBottom: 30,
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#5da0a0',
    borderRadius: 5,
    marginVertical: 5,
    width: 200,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  createButton: {
    borderColor: '#d8d9d7',
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 5,
    width: 200,
    paddingVertical: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: 'black',
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default LoginScreen;
