// fetch('http://localhost:3000/api/v1/users')
// .then(response => {
//   return response.json()
// }).then(data => {
//   // instead of logging here, call dispatch and send the cat JSON data to your store
//   console.log(data)
//   dispatch({ type: 'fetchUsers', users })
// })
export const setUser = (user) =>{
    return {
        type:'fetchUser',
        user: user
    }
}