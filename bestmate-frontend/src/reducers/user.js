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
                // relative_id:""
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
            // return action.payload
        case "logout":
            return initialState
        case "updateAllowedFoods":
            console.log(action.allowedFoods)
            return {...state,user:{
                        ...state.user,allowed_foods:[...state.user.allowed_foods, action.allowedFoods]
                    }}
            // return  {...state,user:{
            //                 ...state.user,allowed_foods: action.allowedFoods
            //             }}
        case "updateRelatives":
            return{...state, user :{
                 ...state.user, relatives: [...state.user.relatives, action.relatives]
            }}
            // return{...state, user :{
            //      ...state.user, relatives: action.relatives
            // }}
        case "updateNotes":
            console.log(action.notes)
            // return{...state,user:{
            //     ...state.user,relatives:{
            //         ...state.user.relatives.map((relative) => relative.id === action.notes.relative_id ? {...relative,notes:relatives.notes.map(note => note.id === action.note.id?action.note:note)}:relative)
            //     }
            // }}
    
            // return{
            //     ...state, user:{
            //         ...state.user, relatives:[{
            //             ...state.user.relatives, [action.notes.relative_id]: {
            //                 ...state.user.relatives[action.notes.relative_id],
            //                 notes:action.notes
            //             }
            //         }]
            //     }
            // }

            // return{...state, user :{
            //     ...state.user, relatives: action.relatives
            // }}
            return{...state, user :{
                ...state.user, relatives:[...state.user.relatives, action.relatives]
            }}
                
        default:
            return state
    }

}

export default userReducer