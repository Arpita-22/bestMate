import { relatives } from "../actions/useraction"

const initialState={
     user:{
        id:'',
        name:"",
        address:"",
        age: '',
        allowed_foods:[{
            id:"",
            name:""
        }],
        relatives:[{
            id:"",
            name:"",
            address:"",
            age:"",
            relationship:"",
            distance:'',
            notes:[{
                id:"",
                description:"",
                relative_id:""
               }]
        }],
        password:"",
        token:""
    }
}
const userReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'fetchUser':
            return {...state, user: action.user}
        case 'displayUser':
            return {user:state.user}
        case "logout":
            return initialState
        case "updateAllowedFoods":
            return {...state, user:{
                        ...state.user, allowed_foods: action.allowedFoods
                    }}
        case "updateRelatives":
            return{...state, user :{
                 ...state.user, relatives: action.relatives
            }}
        case "updateNotes":
            return{...state, user :{
                ...state.user, relatives: action.relatives
            }}
        default:
            return state
    }

}

export default userReducer