import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use((config) => {
    return config;
})

export default instance;

