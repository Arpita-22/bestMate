//FrontPage, Header, Form, InteractionMode
import React from 'react';
import InteractionMode from './InteractionMode';
import NavBar from './NavBar';
import { Divider,Segment } from 'semantic-ui-react'


export class MainContainer extends React.Component {
  render(){
    return (
      <Segment basic>
          <div className="master-detail-element">
            <NavBar displayUser={this.props.displayUser} />
            {/* <Divider horizontal></Divider> */}
            <InteractionMode/>
          </div>
          </Segment>
  );
  }
}

export default MainContainer;