import React from 'react';
// import './App.css';
import Header from './container/Header'
import {MainContainer} from './container/MainContainer';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import SignUp from './container/SignUp';
import Login from './container/Login';
import {connect} from 'react-redux';
import { isLoggedAction } from './actions/';
import { Forbidden } from './container/errors/Forbidden';


class App extends React.Component {

  render(){
    const isLogged = this.props.isLogged
    console.log("!!!!!!!!!!!!!!!! Logged in - ", isLogged);
    return (
      <Router>
        <div className="app" >
          <Header />
          <Route exact path="/" component={MainContainer}/>
          <Route exact path="/Login" component={Login} />
          {isLogged === false? <Route exact path="/SignUp" component={SignUp} /> : <Route exact path="/" component={MainContainer} /> }
          {/* <Route exact path="/SignUp" component={SignUp} /> */}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogged : state.isLogged
  };
};
 
const mapDispatchToProps = () => {
  return {
    isLoggedAction
  };
};
 
export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(App);

//export default App;
