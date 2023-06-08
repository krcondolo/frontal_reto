import axios from 'axios';

const challengueApi = axios.create({
    baseURL: 'https://backendmind.herokuapp.com/api/'
    // baseURL: "http://localhost:8000/api/"
});

// Todo: configurar interceptores
challengueApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})


export default challengueApi;



