import React, { Component } from 'react';
import axios from 'axios';

class Updates extends Component {
  state = {
      data: []
  };

  componentDidMount() {
    axios.get('/asana/updates')
      .then((response) => this.setState({data: response.data.filter((entry) => (entry.tags.length > 0))}));
  };


  render() {
    return (
      <div>
        <h1> Updates Go Here </h1>
        <h1> {JSON.stringify(this.state.data)} </h1>
      </div>
    );
  };
};

export default Updates;
