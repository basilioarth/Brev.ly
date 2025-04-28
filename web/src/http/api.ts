import axios, { AxiosError } from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3333',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // if (error.response) {
    
    //   const status = error.response.status;
    //   const message = error.response.data || 'Erro desconhecido na API';

    //   switch (status) {
    //     case 400:
    //       console.error('Validation Error', message);
    //       break;
    //     case 401:
    //       console.error('Não autorizado:', message);
    //       // Exemplo: Redirecionar para login
    //       window.location.href = '/login';
    //       break;
    //     case 404:
    //       console.error('Recurso não encontrado:', message);
    //       break;
    //     case 500:
    //       console.error('Erro interno do servidor:', message);
    //       break;
    //     default:
    //       console.error('Erro na API:', message);
    //   }
    // } else if (error.request) {
    //   console.error('Sem resposta do servidor. Verifique sua conexão.');
    // } else {
    //   console.error('Erro ao realizar a requisição:', error.message);
    // }

    return Promise.reject({
      message: (error.response?.data as { message?: string })?.message || 'Erro ao conectar com a API',
      status: error.response?.status,
    });
  }
);

export default apiClient;