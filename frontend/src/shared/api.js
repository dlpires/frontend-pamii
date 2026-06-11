const API_BASE = 'http://localhost:3001';

export const api = {
  async post(path, body) {
    const response = await fetch(API_BASE + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro na requisição');
    }

    return response.json();
  },

  async get(path) {
    const token = localStorage.getItem('token');
    const response = await fetch(API_BASE + path, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      const error = await response.json();
      throw new Error(error.message || 'Erro na requisição');
    }

    return response.json();
  },

  async patch(path, body) {
    const token = localStorage.getItem('token');
    const response = await fetch(API_BASE + path, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro na requisição');
    }

    return response.json();
  },

  async delete(path) {
    const token = localStorage.getItem('token');
    const response = await fetch(API_BASE + path, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro na requisição');
    }

    return response.json();
  }
};
