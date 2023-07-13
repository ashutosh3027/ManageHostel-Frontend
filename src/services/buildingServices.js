
import API from './../axiosConfigure/axiosConfigure'
class BuildingService{
    async getAllHostels(){
        const {data} = await API.get('/buildings');
        return data.data
    }
    async getHostelById(id){
        const {data} = await API.get(`/buildings/${id}`);
        return data.data
    }
    async createHostel(hostelName, collegeName){
        const {data} = await API.post('/buildings/createBuilding', {buildingName:hostelName, collegeName});
        return data.data;
    }

  
}
const buildingObj =  new BuildingService()
export default buildingObj;