import React, { Component } from 'react';
import axios from 'axios';

class Calendar extends Component {
  state = {
      data: []
  };

  componentDidMount() {
    axios.get('/asana/calendar')
      .then((response) => this.setState({data: response.data}));
  };

  render() {
    return (
      <div>
        <h1> Club Calendar </h1>
        <h1> {JSON.stringify(this.state.data)} </h1>
      </div>
    );
  };
};

export default Calendar;
