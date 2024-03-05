import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/users';

const AuthService = {
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      return response.data.token;
    } catch (error) {
      throw new Error('Authentication failed. Please check your credentials.');
    }
  },
  register: async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, { username, email, password });
      return response.data;
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    }
  }
};

export { AuthService };
