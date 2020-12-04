
export const setUser = (user) =>{
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
    return {
        type: 'updateAllowedFoods',
        allowedFoods: allowedFoods
    }
}

export const relatives = (relatives) =>{
    console.log("LLLLLLLL", relatives);
    return {
        type: 'updateRelatives',
        relatives: relatives
    }
}

export const notes = (notes) =>{
    return {
        type: 'updateNotes',
        notes: notes
    }
}