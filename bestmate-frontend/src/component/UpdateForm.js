import React from 'react';
import { Redirect } from "react-router-dom";
 
class UpdateForm extends React.Component {

  constructor() {
      super();
      this.state = {
        user:{
          name: "" ,
          address: "",
          age: "",
          password:""
        },
        token:"",
        signedUp: true
      };
    }

render() {
    // if (this.state.signedUp) {
    //   return <Redirect to='/Login' />
    // }
    return (
      <div>
        <form onSubmit={() => console.log()}>
          <h1>Update</h1>
          {/* <h2>Personal Details</h2> */}
          <div>
            <input type="text" name="name" placeholder="name" onChange={() => console.log()} value={this.state.name} />
            <label htmlFor="name">Name</label>
          </div>
          <div>
            <input type="text" name="address" placeholder="address" onChange={() => console.log()} value={this.state.address}/>
            <label htmlFor="">Address</label>
          </div>
          <div>
            <input type="integer" name="age" placeholder="age" onChange={() => console.log()} value={this.state.age} />
            <label htmlFor="age">Age</label>
          </div>
          <div>
            <input type="password" name="password" placeholder="Password" onChange={() => console.log()} />
            <label htmlFor="password">Password</label>
          </div>
          <input type="submit" value="Update" />
        </form>
      </div>
    );
  }
}

export default UpdateForm;