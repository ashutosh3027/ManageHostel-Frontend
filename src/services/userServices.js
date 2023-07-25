import API from './../axiosConfigure/axiosConfigure'
class UserServices{
    async updateCollege(collegeName){
        const {data} = await API.patch('/users/update-college', {collegeName});
        return data;
    }
}
const UserObj =  new UserServices()
export default UserObj;