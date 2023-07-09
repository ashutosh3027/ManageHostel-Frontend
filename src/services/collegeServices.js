
import API from './../axiosConfigure/axiosConfigure'
class CollegeService{
    async getAllColleges(){
        const {data} = await API.get('/colleges');
        console.log(data)
        return data.colleges;
    }
  
}
export default new CollegeService();