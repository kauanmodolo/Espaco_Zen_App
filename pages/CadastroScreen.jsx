import React, { useState } from 'react';
import { View, Text, Image, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import { firebase } from '../firebaseConfig';

const CadastroScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleRegister = async () => {
    if (!username || !password || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (password !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(username, password);
      const userId = userCredential.user.uid;

      await firebase.firestore().collection('users').doc(userId).set({
        username: username,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Sucesso', 'Usuário criado com sucesso!');
      setUsername('');
      setPassword('');
      setConfirmarSenha('');
      navigation.replace('Home');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível criar o usuário.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.label}>Preencha os campos abaixo para criar sua conta</Text>
      <InputField 
        placeholder="Usuário" 
        value={username} 
        onChangeText={setUsername} 
        style={styles.input} 
      />
      <InputField 
        placeholder="Senha" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
        style={styles.input} 
      />
      <InputField 
        placeholder="Confirmar senha" 
        secureTextEntry 
        value={confirmarSenha} 
        onChangeText={setConfirmarSenha} 
        style={styles.input} 
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.createButton} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.createButtonText}>Fazer login</Text>
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

export default CadastroScreen;
