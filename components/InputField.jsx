import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputField = ({ value, onChangeText, placeholder, secureTextEntry = false, style }) => {
  return (
    <TextInput
      style={[styles.input, style]} // permite o uso de estilos personalizados junto ao estilo padrão
      placeholder={placeholder}
      placeholderTextColor="gray"
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderBottomColor: 'gray',  // Define a cor da borda inferior
    borderBottomWidth: 1,       // Define a espessura da borda inferior
    marginBottom: 10,
    paddingHorizontal: 10,      // Define o padding horizontal
    width: 200,
    backgroundColor: 'white',    // Fundo branco para o input
  },
});

export default InputField;
