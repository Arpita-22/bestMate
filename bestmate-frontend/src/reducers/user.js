const initialState={
     user:{
        id:'',
        name:"",
        address:"",
        age: '',
        allowed_foods:[],
        relatives:[],
        password:"",
        token:""

    }
}
const userReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'displayUser':
            return {...state}
        default:
            return state
    }

}

export default userReducer