import axios from 'axios';

const baseURL = process.env.NODE_ENV==="production"?`${process.env.REACT_APP_API_URL}/api/v1`:"/api/v1";
console.log(process.env.NODE_ENV);
const API = axios.create({
    baseURL,
});

API.interceptors.request.use((req)=>{
    const token = localStorage.getItem('token');
    if(token) req.headers.authorization=`Bearer ${token}`;
    return req;
}, (err)=>{
    console.log(err);
    return err;
});

export default API;


