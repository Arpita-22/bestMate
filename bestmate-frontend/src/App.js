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
import AllowedFoods from './container/AllowedFoods'
import Relatives from './container/Relatives'
import CreateNotes from './container/CreateNotes'
import 'semantic-ui-css/semantic.min.css'


class App extends React.Component {


  componentDidMount(){
    const token = localStorage.getItem("token");
    if (token){
      //make fetch request to backend route profile or whichever route with authorization set user state
      return fetch("https://secure-lake-64435.herokuapp.com/api/v1/users/profile", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
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

  logout = () => {
    this.props.signOut();
    this.props.isLoggedAction(false);
  }

  render(){
    const isLogged = this.props.isLogged
    return (
      <Router>
        <div className="app" >
          <Header logout={this.logout} isUserLoggedIn={isLogged}/>
          <Route exact path="/" component={FrontPage}/>
          <Route exact path="/Login" render={props => <Login displayUser={this.displayUser}/> }  />
          {isLogged === false? <Route exact path="/SignUp" component={SignUp} /> : <Route exact path="/MainContainer" render={(props) => <MainContainer {...props} displayUser={this.displayUser} />} /> }
          <Route exact path='/AllowedFoods' component={AllowedFoods} />
          <Route exact path='/Relatives' component={Relatives} />
          <Route exact path='/CreateNotes' component={CreateNotes} />
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

