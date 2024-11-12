// components/CreateSessionModal.js
import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { firebase } from '../firebaseConfig';

const CreateSessionModal = ({ visible, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('Relaxamento');
  const [isCreating, setIsCreating] = useState(false); // Estado para evitar duplicação

  const categories = [
    { label: 'Relaxamento', value: 'Relaxamento' },
    { label: 'Concentração', value: 'Concentração' },
    { label: 'Energia', value: 'Energia' },
    { label: 'Respiração', value: 'Respiração' },
    { label: 'Música', value: 'Música' },
  ];

  const handleCreate = async () => {
    if (isCreating) return; // Evita duplicação

    if (name && duration && category) {
      setIsCreating(true); // Define como em criação
      const userId = firebase.auth().currentUser?.uid;
      const newSession = {
        title: name,
        category,
        duration: parseInt(duration),
        createdBy: userId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      try {
        await firebase.firestore().collection('sessions').add(newSession);
        onCreate(newSession); // Atualiza a lista de sessões localmente
        setName('');
        setDuration('');
        setCategory('Relaxamento');
        onClose();
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível criar a sessão. Tente novamente.');
        console.error(error);
      } finally {
        setIsCreating(false); // Redefine após criação
      }
    } else {
      Alert.alert('Erro', 'Preencha todos os campos.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Criar Nova Sessão</Text>
          <TextInput
            placeholder="Nome da sessão"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Duração (minutos)"
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
            style={styles.input}
          />
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            items={categories}
            value={category}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
            }}
            placeholder={{ label: 'Selecione uma categoria', value: null }}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, isCreating && { opacity: 0.6 }]}
              onPress={handleCreate}
              disabled={isCreating}
            >
              <Text style={styles.buttonText}>Criar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  button: {
    padding: 10,
    backgroundColor: '#5da0a0',
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CreateSessionModal;
