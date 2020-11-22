import React from 'react';
// import './App.css';
import Header from './container/Header'
import {MainContainer} from './container/MainContainer';
import {  BrowserRouter as Router,Route} from 'react-router-dom';
import SignUp from './container/SignUp';
import Login from './container/Login';

// import {createStore} from 'redux';


const initialState={
   user:"",
   token:""
}

// const reducer = (state = initialState, action) =>{
//   console.log( state,  action)
//   return state
// }

// export const store = createStore(reducer)
export class App extends React.Component {
  render(){
  return (
    <Router>
    <div className="app" >
      <Header />
      <Route exact path="/" />
      <Route exact path="/SignUp" component={SignUp} />
      <Route exact path="/Login" component={Login} />
      {/* <Route exact path="/" component={MainContainer} /> */}
      <MainContainer />
    </div>
    </Router>
  );
  }
}

export default App;
