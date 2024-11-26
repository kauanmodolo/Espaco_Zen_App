import axios from 'axios';

// URL de exemplo para a API simulada de envio
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Buscar uma citação aleatória
export const fetchRandomQuote = async () => {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    return response.data.content; // Retorna apenas o texto da citação
  } catch (error) {
    console.error('Erro ao buscar citação:', error);
    throw error;
  }
};

// Enviar uma citação personalizada para a API
export const sendUserQuote = async (quote) => {
  try {
    const response = await axios.post(`${BASE_URL}/posts`, {
      content: quote,
    });
    return response.data; // Retorna os dados de resposta da API simulada
  } catch (error) {
    console.error('Erro ao enviar citação:', error);
    throw error;
  }
};
