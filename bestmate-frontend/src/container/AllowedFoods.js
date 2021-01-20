import React from 'react';
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import {setUser,signOut,allowedFoods} from '../actions/useraction'
import { isLoggedAction } from '../actions/';
import {Grid,Menu,Icon} from 'semantic-ui-react'

class AllowedFoods extends React.Component {
    constructor(props){
        super(props)
        this.state={
        allowed_foods:[],
        clicked:false
        }
    }

    addAllowedFood = (e) =>{
        this.setState({
            allowed_foods:[...this.state.allowed_foods," "]})
    }

    handleAllowedFoodsChange = (e,index) =>{
        this.state.allowed_foods[index] = e.target.value
        this.setState({
            allowed_foods:this.state.allowed_foods })
    }

    handleRemoveAllowedFood = (index) =>{
        this.state.allowed_foods.splice(index, 1)
        this.setState({allowed_foods:this.state.allowed_foods})
    }

    handleSubmit = (e, allowed_foods, user) =>{
        e.preventDefault();
        let allowedFoodsModified = [];
        user.allowed_foods.forEach(food =>{
            allowedFoodsModified.push(food);
        });
        allowed_foods.map(allowed_food => {
            fetch(`https://secure-lake-64435.herokuapp.com/api/v1/allowed_foods`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        name: allowed_food,
                        user_id: user.id
                    }
                ),
            })
            .then(response => response.json())
            .then(data => {
                allowedFoodsModified.push(data.allowed_food);                
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
        this.setState({
            clicked: true,
            allowed_foods: allowedFoodsModified
       });  
       this.props.allowedFoods(allowedFoodsModified)        
    }

    handleReturn = (e) =>{
        e.preventDefault()
        this.setState({ clicked: !this.state.clicked })
    }

    render(){
        if (this.state.clicked === true){
            return <Redirect to='/Relatives'  />
        }
        let {allowed_foods} = this.state
        const{user} = this.props
        return(
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Menu secondary pointing>
                        <div className="allowed-foods">
                            <h1>AllowedFoods</h1>
                            <Menu.Item>
                                <button  id="add-allowed-food"  onClick ={(e) => this.addAllowedFood(e)}><Icon  name="plus"></Icon></button> 
                            </Menu.Item>
                            {this.state.allowed_foods.map((allowed_food,index) =>{
                                return(
                                <div key={index}>
                                    <input placeholder="allowed food" onChange={(e) => this.handleAllowedFoodsChange(e,index)}  value={allowed_food} />
                                    <Menu.Item>
                                        <button id="remove-allowed-food" onClick={() => this.handleRemoveAllowedFood(index)}><Icon name="minus"></Icon></button>
                                    </Menu.Item>
                                </div>
                                )
                            })} 
                            <hr/>
                            <Menu.Item>
                                <button id="submit-allowed-foods" onClick={(e) => this.handleSubmit(e, allowed_foods, user)}>Submit</button>
                                </Menu.Item>
                                <Menu.Item>
                                <button onClick={(e) => this.handleReturn(e)}>No more to add</button>
                            </Menu.Item>
                        </div>
                    </Menu>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      isLogged : state.isLogged,
      user: state.user.user
    };
  };
   
  const mapDispatchToProps = (Log_In) => {
    return {
      isLoggedAction,
      setUser,
      signOut,
      allowedFoods
    };
  };
   
  export default connect(
    mapStateToProps,
    mapDispatchToProps()
  )(AllowedFoods);

