import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

class ApiService {
  async uploadDocument(file) {
    const formData = new FormData();
    formData.append('document', file);

    try {
      const response = await axios.post(`${API_BASE_URL}/extract`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Upload failed: ${error.response?.data?.message || error.message}`);
    }
  }

  async checkHealth() {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      return response.data;
    } catch (error) {
      throw new Error(`Health check failed: ${error.message}`);
    }
  }
}

export default new ApiService();
