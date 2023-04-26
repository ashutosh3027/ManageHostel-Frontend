import axios from 'axios';
// const baseURL = 'api/v1/';
const baseURL = `${(process.env.NODE_ENV==="production"?process.env.REACT_APP_API_URL:process.env.REACT_APP_API_LOCAL_URL)}api/v1`;
console.log(process.env.NODE_ENV);
const API = axios.create({
    baseURL,
    withCredentials: true
});

API.interceptors.request.use((req)=>{
    const token = localStorage.getItem('jwt');
    console.log(token)
    if(token) req.headers.authorization=`Bearer ${token}`;
    return req;
}, (err)=>{
    console.log(err);
    return err;
});
export default API;


