const initialInteractionType ={
    interactionMode: {
       type: ""
   }
}

const interactionReducer = (state = initialInteractionType, action) =>{
    return {interactionMode: action.type}
}
export default interactionReducer