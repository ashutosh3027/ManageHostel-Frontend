
import API from './../axiosConfigure/axiosConfigure'
class AuthServices{
    async signup(name, email, section, semester, branch, password, passwordConfirm){
      const {data} = await API.post('/users/signup', {name, email, section, semester, branch, password, passwordConfirm});
      return data;
    }
    async login(email, password){
        const data = await API.post('/users/login', {password, email});
        return data;
    }
    logout(){
       localStorage.removeItem('jwt')
    }
    async getCurrentUser(){
      const  {data} = await API.get('/users/profile') ;
      return data;
    }
    async getAllRooms(){
      const {data}= await API.get('/rooms');
      return data;
    }
    forgotPassword(email) {
      return API.post("/users/forgotPassword", {
        email,
      });
    }
  
}
export default new AuthServices();