import React from 'react';
// import './App.css';
import Header from './container/Header'
import {MainContainer} from './container/MainContainer';

// import {createStore} from 'redux';


// const initialState={
//    count:0,
//    value:1
// }

// const reducer = (state = initialState, action) =>{
//   console.log( state,  action)
//   return state
// }

// export const store = createStore(reducer)
export class App extends React.Component {
  render(){
  return (
    <div className="app" >
      <Header />
      <MainContainer />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header> */}
    </div>
  );
  }
}

export default App;
