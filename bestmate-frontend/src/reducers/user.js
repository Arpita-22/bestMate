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
            return {...state,user: action.user}
        case 'displayUser':
            return {user:state.user}
            // return action.payload
        case "logout":
            return initialState
        case "updateAllowedFoods":
            return {...state,user:{
                        ...state.user,allowed_foods:action.allowedFoods
                    }}
        case "updateRelatives":
            return{...state, user:{
                 ...state.user, relatives: [{...state.user.relatives}, action.relatives]
            }}
        case "updateNotes":
            console.log("!!!!!!!!!!!!!!!!", state.user)
            // return{...state,user:{
            //     ...state.user,relatives:{
            //         ...state.user.relatives.map((relative) => relative.id === action.note.relative_id)
            //     }
            // }}
            return{
                ...state, user:{
                    ...state.user, relatives:[{
                        ...state.user.relatives, [action.notes.relativeId]: {
                            ...state.user.relatives[action.notes.relativeId],
                            notes:action.notes
                        }
                    }]
                }
            }
        default:
            return state
    }

}

export default userReducer