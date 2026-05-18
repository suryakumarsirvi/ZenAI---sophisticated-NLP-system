import {create} from 'axios';

export const API = create({
    baseURL: 'http://localhost:5000/api/v1',
    withCredentials: true
});