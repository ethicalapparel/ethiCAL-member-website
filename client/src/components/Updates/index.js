import React, { Component } from 'react';
import axios from 'axios';
import {Divider, Header, Loader} from 'semantic-ui-react';
import './index.css';
import imageFile from './res/img/team-image.JPG';

const TeamUpdate = (props) => {
  const updates = props.data.filter(entry => entry.team == props.teamName)
    .map(entry => <li> {entry.name} </li>);
  return (
    <div>
      <Header as='h2'> {props.teamName} Updates: </Header>
      <ul> {updates}</ul>
    </div>
  );
};

class Updates extends Component {
  state = {
      data: []
  };

  infoBullets = <Loader active/>;

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

    if (this.state.data && this.state.data.length > 0) {
      this.infoBullets = (
      <div>
        <TeamUpdate teamName='Prez' data={this.state.data}/>
        <TeamUpdate teamName='Ops/Fin' data={this.state.data}/>
        <TeamUpdate teamName='Sales' data={this.state.data}/>
        <TeamUpdate teamName='Marketing' data={this.state.data}/>
        <TeamUpdate teamName='Design' data={this.state.data}/>
        <TeamUpdate teamName='Web' data={this.state.data}/>
        <TeamUpdate teamName='Sustainability' data={this.state.data}/>
      </div>
      );
    } else {
      this.infoBullets = <Loader inline active/>;
    }

    return(
        <div className="container">
          <div className="cover-photo">
              <div className="overlay">
                <img src={imageFile}/>
              </div>
              <Header as='h1' className='main-header'> Team Updates </Header>
          </div>
          <div className="information-bullets">
            {this.infoBullets}
          </div>
        </div>
      );
  };
};


export default Updates;
