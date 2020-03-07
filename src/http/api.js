import axios from 'axios';

export default axios.create({
    baseURL: 'http://menu:8080'
});
