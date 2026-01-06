import axios from 'axios';

export const api = axios.create({
  // O endereço do seu Django (Backend)
  baseURL: 'http://localhost:8000', 
});

// Função para testar se a API está viva
export const checkBackendStatus = async () => {
  try {
    // Tenta acessar a home da API
    const response = await api.get('/api/home/');
    return response.status === 200;
  } catch (error) {
    console.error("Erro ao conectar no Django:", error);
    return false;
  }
};