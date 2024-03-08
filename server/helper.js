let users = []
const addUser = ({socket_id, name, user_id, room_id}) =>{
    const exist = users.find(user => user.user_id === user_id && user.room_id === room_id);
    if (exist){
        return{
            error: 'User already exists in this room'
        }
    }
    const user = {socket_id, name, user_id, room_id};
    users.push(user)
    return{
        user
    }
}

const removeUser = (socket_id) =>{
    const index = users.findIndex(user=> user.socket_id === socket_id);
    if (index !== -1){ // "!== -1" means tha the user can be found, it exist in the array
        return users.splice(index,1)[0] //[0] means that we are returning an object 
    }

}

const getUser = (socket_id) => users.find(user => user.socket_id === socket_id)


module.exports = {addUser, removeUser, getUser};