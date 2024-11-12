// components/CreateSessionButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CreateSessionButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} accessibilityLabel="Criar nova sessão personalizada">
      <Text style={styles.buttonText}>Criar Nova Sessão</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5da0a0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CreateSessionButton;
