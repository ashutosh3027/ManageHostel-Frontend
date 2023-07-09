
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

  
}
export default new BuildingService();