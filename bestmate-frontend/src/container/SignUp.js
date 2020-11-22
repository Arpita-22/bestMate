import React from 'react';
 
class SignUp extends React.Component {
  render() {
    return (
      <form>
        <h1>SignUp</h1>
        <div>
          <input type="text" name="name" placeholder="name" />
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <input type="text" name="address" placeholder="address" />
          <label htmlFor="">Address</label>
        </div>
        <div>
          <input type="integer" name="age" placeholder="age" />
          <label htmlFor="age">Age</label>
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" />
          <label htmlFor="password">Password</label>
        </div>
        <input type="submit" value="SignUp" />
      </form>
    );
  }
}
 
export default SignUp;