import React, { Component } from 'react';
import axios from 'axios';
import './index.css';

class Ideas extends Component {
  state = {
      data: []
  };

  componentDidMount() {
    axios.get('/asana/ideas')
      .then((response) => this.setState({data: response.data}));
  };

  render() {
    return (
      <div>
        <h1> Ideas Thread Goes Here </h1>
        <h1> {JSON.stringify(this.state.data)} </h1>
      </div>
    );
  };
};

export default Ideas;
