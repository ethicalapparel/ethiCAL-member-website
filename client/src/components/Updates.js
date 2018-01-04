import React, { Component } from 'react';
import axios from 'axios';

class Updates extends Component {
  state = {
      data: ["Initial Data": "HI"]
  };

  componentDidMount() {
    axios.get('/asana/calendar')
      .then((response) => this.setState({data: response.data}));
  };

  render() {
    return (
      <div>
        <h1> Hello, World</h1>
      </div>
    );
  };
};

export default Updates;
