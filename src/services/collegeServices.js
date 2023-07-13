
import API from './../axiosConfigure/axiosConfigure'
class CollegeService{
    async getAllColleges(){
        const {data} = await API.get('/colleges');
        return data.colleges;
    }
    async createCollege(collegeName){
        const {data} =await API.post('/colleges/createCollege', {collegeName});
        return data.college;
    }
    async getAllBuildingsByCollegeId(collegeId){
        const {data} = await API.get(`/colleges/${collegeId}/buildings`);
        console.log(data)
        return data.data.buildings;
    }
    async getCollege(collegeId){
        const {data}= await API.get(`/colleges/${collegeId}`);
        console.log(data)
        return data.data.college;
    }
  
}
const collegeObj = new CollegeService();
export default collegeObj;