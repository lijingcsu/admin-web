import axios from 'axios';
import env from '../config/env';

let util = {

};

const ajaxUrl = env === 'development' ?
    'http://127.0.0.1:8888' :
    env === 'production' ?
    'https://www.url.com' :
    'https://debug.url.com';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000,
    withCredentials: true,
    changeOrigin: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});

export default util;
