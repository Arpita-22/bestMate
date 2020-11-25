import React from 'react';
import Header from './container/Header'
import {MainContainer} from './container/MainContainer';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import SignUp from './container/SignUp';
import Login from './container/Login';
import {connect} from 'react-redux';
import { isLoggedAction, } from './actions/';
import { Forbidden } from './container/errors/Forbidden';
import InteractionMode from './container/InteractionMode';
import FrontPage from './container/FrontPage';
import {store} from './index.js'
import {setUser, signOut} from './actions/useraction'


class App extends React.Component {


  componentDidMount(){
    const token = localStorage.getItem("token");
    if (token){
      //make fetch request to backend route profile or whichever route with authorization set user state
      return fetch("http://localhost:3000/api/v1/users/profile", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          this.props.setUser(data.user)
          this.props.isLoggedAction(true);
        })
    }
  }

  // action that would call the reducer action do not need map
  
  logout = () => {
    this.props.signOut();
    this.props.isLoggedAction(false);
  }


  render(){
    const isLogged = this.props.isLogged
    return (
      <Router>
        <div className="app" >
          {/* <Header signOut={this.props.signOut}/> */}
          <Header logout={this.logout} isUserLoggedIn={isLogged}/>
          <Route exact path="/" component={FrontPage}/>
          <Route exact path="/Login" render={props => <Login displayUser={this.displayUser}/> }  />
          {isLogged === false? <Route exact path="/SignUp" component={SignUp} /> : <Route exact path="/MainContainer" render={(props) => <MainContainer {...props} displayUser={this.displayUser} />} /> }
          {/* <Route exact path="/Logout" render={() => window.localStorage.clear()} /> */}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogged : state.isLogged,
    user: state.user.user
  };
};
 
const mapDispatchToProps = () => {
  return {
    isLoggedAction,
    setUser,
    signOut
  };
};
 
export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(App);

