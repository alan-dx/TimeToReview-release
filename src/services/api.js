import axios from 'axios';

const api = axios.create({
    baseURL: 'https://timetoreview.herokuapp.com'
});

export default api;