import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { firebase } from '../firebaseConfig';
import { toast } from 'react-toastify';

const CreateSessionModal = ({ visible, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('Relaxamento');

  const categories = [
    { label: 'Relaxamento', value: 'Relaxamento' },
    { label: 'Concentração', value: 'Concentração' },
    { label: 'Energia', value: 'Energia' },
    { label: 'Respiração', value: 'Respiração' },
    { label: 'Música', value: 'Música' },
  ];

  const handleCreate = async () => {
    if (!name || !duration || !category) {
      toast.error('Preencha todos os campos para criar uma sessão.', { position: 'top-right', autoClose: 3000 });
      return;
    }

    try {
      const userId = firebase.auth().currentUser?.uid;
      const newSession = {
        title: name,
        category,
        duration: parseInt(duration),
        createdBy: userId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await firebase.firestore().collection('sessions').add(newSession);
      toast.success('Sessão personalizada criada com sucesso!', { position: 'top-right', autoClose: 3000 });
      onCreate(newSession);
      setName('');
      setDuration('');
      setCategory('Relaxamento');
      onClose();
    } catch (error) {
      toast.error('Erro ao criar sessão personalizada. Tente novamente.', { position: 'top-right', autoClose: 3000 });
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
            <TouchableOpacity style={styles.button} onPress={handleCreate}>
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
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    padding: 10,
    backgroundColor: '#5da0a0',
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default CreateSessionModal;
