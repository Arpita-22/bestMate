
export const setUser = (user) =>{
    console.log(user)
    return {
        type:'fetchUser',
        user: user
    }
}

export const signOut = () =>{
    // console.log("trigerred signout")
    localStorage.clear()
    return {
        type: 'logout'
    }
}

export const allowedFoods = (allowedFoods) =>{
    console.log(allowedFoods)
    return {
        type: 'updateAllowedFoods',
        allowedFoods: allowedFoods
    }
}

export const relatives = (relatives) =>{
    console.log(relatives)
    return {
        type: 'updateRelatives',
        relatives: relatives
    }
}

export const notes = (notes) =>{
    console.log(notes)
    return {
        type: 'updateNotes',
        notes: notes
    }
}