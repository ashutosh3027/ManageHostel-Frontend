import API from './../axiosConfigure/axiosConfigure'
class roomServices{
    async getRoomById(roomId){
        const {data} = await API.get(`/rooms/${roomId}`);

        const resp = data.data;
        const {room} = resp;
        console.log(data);
        return room;
    }
    async getAllRooms(){
        const {data}=await API.get('/rooms');
        console.log(data);
        return data;
    }
}
export default new roomServices();