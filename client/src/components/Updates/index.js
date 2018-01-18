import React, { Component } from 'react';
import axios from 'axios';
import {Divider, Header} from 'semantic-ui-react';
import './index.css';
import Image from './res/img/team-image.JPG';

const TeamUpdate = (props) => {
  const updates = props.data.filter(entry => entry.team == props.teamName)
    .map(entry => <li> {entry.name} </li>);
  return (
    <div>
      <h2> {props.teamName} Updates: </h2>
      <ul> {updates}</ul>
    </div>
  );
};

class Updates extends Component {
  state = {
      data: []
  };

  getData() {
    axios.get('/asana/updates')
      .then((response) => this.setState({data: response.data}));
  };

  componentDidMount() {
    this.getData();
    this.countdown = setInterval(()=>this.getData(), 10000);
  };

  componentWillUnmount() {
    clearInterval(this.countdown);
  };


  render() {
    return (
      <div className="container">
        <div className="cover-photo">
            <div className="overlay">
              <img src={Image}/>
            </div>
            <Header as='h1' className='main-header'> Team Updates </Header>
        </div>
        <div className="information-bullets">
        <div>
          <TeamUpdate teamName='Prez' data={this.state.data}/>
          <TeamUpdate teamName='Ops/Fin' data={this.state.data}/>
          <TeamUpdate teamName='Sales' data={this.state.data}/>
          <TeamUpdate teamName='Marketing' data={this.state.data}/>
          <TeamUpdate teamName='Design' data={this.state.data}/>
          <TeamUpdate teamName='Web' data={this.state.data}/>
        </div>
        </div>
      </div>
    );
  };
};


export default Updates;
