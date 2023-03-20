import axios from "axios";

const URL = 'http://localhost:4000'

const api = {
  films: {
    fetchAll: () => axios.get(`${URL}/api/authfilms`)
        .then((res) => res.data.films)
        .catch((e) => console.dir(e.message))
        .finally(() => console.log('dit')),
    create: (film) =>
      axios.post(`${URL}/api/authfilms`, { film }).then((res) => res.data.film),
    update: (film) =>
      axios
        .put(`${URL}/api/authfilms/${film._id}`, { film })
        .then((res) => res.data.film),
    delete: (film) => axios.delete(`${URL}/api/authfilms/${film._id}`),
  },
  users: {
    create: (user) => axios.post(`${URL}/api/users`, { user }),
    login: (credentials) =>
      axios.post(`${URL}/api/auth`, { credentials }).then((res) => res.data.token),
  },
};

export const setAuthorizationHeader = (token = null) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export default api;
