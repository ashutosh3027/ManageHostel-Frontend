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
    async getRoomByBuildingId(buildingId){
        const {data}= await API.get(`/rooms/getRoomsByBuildingId/${buildingId}`)
        return data.rooms;
    }
    async bookRoom(roomNumber, buildingId, userId){
        const data= await API.post('/rooms/book-room', {buildingId, roomNumber, userId});
        console.log(data)
        return data;
    }
    async getRoomUser(roomId){
        const data = await API.get(`/rooms/${roomId}/user`);
        return data;
    }
    async vacantRoom(roomId){
        const data = await API.post(`/rooms/vacant-room/${roomId}`);
        return data;
    }
    async createNewRoom(roomNumber, buildingId, roomType){
        const {data} = await API.post('/rooms/', {roomNumber, buildingId, roomType});
        return data;
    }
    async deleteRoom(roomNumber, buildingId){
        const {data} = await API.delete('/rooms/deleteRoom', {data:{roomNumber, buildingId}});
        return data;
    }
}
export default new roomServices();