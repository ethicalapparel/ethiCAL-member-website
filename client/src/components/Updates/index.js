import React, { Component } from 'react';
import axios from 'axios';
import {Header, Loader} from 'semantic-ui-react';
import './index.css';

const TeamUpdate = (props) => {
  const updates = props.data.filter(entry => entry.team == props.teamName)
    .map(entry => <li> {entry.name} </li>);
  return (
    <div>
      <Header as='h2'> {props.teamName} Updates: </Header>
      <div><ul> {updates}</ul></div>
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
    if (this.state.data && this.state.data.length > 0) {
      return (
        <div>
          <h1> Team Updates </h1>
          <div className="information-bullets">
            <TeamUpdate teamName='Prez' data={this.state.data}/>
            <TeamUpdate teamName='Ops/Fin' data={this.state.data}/>
            <TeamUpdate teamName='Sales' data={this.state.data}/>
            <TeamUpdate teamName='Marketing' data={this.state.data}/>
            <TeamUpdate teamName='Design' data={this.state.data}/>
            <TeamUpdate teamName='Web' data={this.state.data}/>
          </div>
        </div>
      );
    } else {
      return <Loader active/>
    }
  };
};


export default Updates;
