import React, { Component } from 'react';
import axios from 'axios';
import './index.css';

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
      <div>
        <h1> Team Updates </h1>
        <TeamUpdate teamName='Prez' data={this.state.data}/>
        <TeamUpdate teamName='Ops/Fin' data={this.state.data}/>
        <TeamUpdate teamName='Sales' data={this.state.data}/>
        <TeamUpdate teamName='Marketing' data={this.state.data}/>
        <TeamUpdate teamName='Design' data={this.state.data}/>
        <TeamUpdate teamName='Web' data={this.state.data}/>
      </div>
    );
  };
};


export default Updates;
