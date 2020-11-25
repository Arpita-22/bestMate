
export const setUser = (user) =>{
    return {
        type:'fetchUser',
        user: user
    }
}

export const signOut = () =>{
    console.log("trigerred signout")
    localStorage.clear()
    return {
        type: 'logout'
    }
}