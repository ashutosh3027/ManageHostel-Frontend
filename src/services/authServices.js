
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
    async forgotPassword(email) {
      return await API.post("/users/forgotPassword", {
        email,
      });
    }
    async resetPassword(password, cPassword, token){
      const {data} = await API.patch(`/users/resetPassword/${token}`, {password, passwordConfirm:cPassword});
      console.log(data);
      return data;
    }
  
}
const AuthObj =  new AuthServices()
export default AuthObj;