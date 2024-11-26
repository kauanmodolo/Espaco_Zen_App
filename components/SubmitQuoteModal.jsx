import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { toast } from 'react-toastify';
import { sendUserQuote } from '../api/quotable';

const SubmitQuoteModal = ({ visible, onClose }) => {
  const [quote, setQuote] = useState('');

  const handleSubmit = async () => {
    if (!quote.trim()) {
      toast.error('Por favor, insira uma citação válida.', { position: 'top-right', autoClose: 3000 });
      return;
    }

    try {
      const response = await sendUserQuote(quote.trim());
      toast.success(`Citação enviada: ${response.content}`, { position: 'top-right', autoClose: 3000 });
      setQuote('');
      onClose();
    } catch (error) {
      toast.error('Erro ao enviar a citação. Tente novamente mais tarde.', { position: 'top-right', autoClose: 3000 });
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enviar Citação</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua citação..."
            value={quote}
            onChangeText={setQuote}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Enviar</Text>
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

export default SubmitQuoteModal;
