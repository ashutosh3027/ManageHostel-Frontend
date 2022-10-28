import API from './../axiosConfigure/axiosConfigure'
class requestServices{
    async makeReqest(roomNumber){
        console.log(roomNumber);
        const data = await API.post('/requests', {roomNumber});
        return data;
    }
    async getAllRequests(){
        const {data} = await API.get('/requests');
        console.log(data);
        return data;
    }
    async getRequests(requestType){
        const {data}= await API.get(`/requests?requestType=${requestType}`);
        console.log(data)
        return data;
    }
    async updateRequest(id, requestStatus){
         const {data}= await API.post('/requests/requestUpdates', {id, requestStatus});
         console.log(data);
         return data;
    }
}
export default new requestServices();