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



class App extends React.Component {

  displayUser = (user) =>{
     //console.log(user)
  }


  render(){
      
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

