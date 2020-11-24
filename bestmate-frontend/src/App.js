import React from 'react';
import Header from './container/Header'
import {MainContainer} from './container/MainContainer';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import SignUp from './container/SignUp';
import Login from './container/Login';
import {connect} from 'react-redux';
import { isLoggedAction } from './actions/';
import { Forbidden } from './container/errors/Forbidden';
import InteractionMode from './container/InteractionMode';
import FrontPage from './container/FrontPage';
import {store} from './index.js'



class App extends React.Component {


  componentDidMount(){
  fetch('http://localhost:3000/api/v1/users')
  .then(response => response.json())
  .then(users => users.map(user =>{
    this.props.user.id = user.id
    this.props.user.name = user.name
    this.props.user.address = user.address
    this.props.user.age = user.age
    this.props.user.password = user.password
  }) 
  );
  }

  displayUser = (data) =>{
    console.log(data)
  }


  render(){
    console.log(this.props.user)
    const isLogged = this.props.isLogged
    return (
      <Router>
        <div className="app" >
          <Header />
          <Route exact path="/" component={FrontPage}/>
          <Route exact path="/Login" render={props => <Login displayUser={this.displayUser}/> }  />
          {isLogged === false? <Route exact path="/SignUp" component={SignUp} /> : <Route exact path="/MainContainer" render={props => <MainContainer {...props} displayUser={this.displayUser} />} /> }
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
    isLoggedAction
  };
};
 
export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(App);

