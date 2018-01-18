import React, { Component } from 'react';
import axios from 'axios';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import './index.css';

BigCalendar.momentLocalizer(moment);

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
        <BigCalendar step={60} defaultDate={new Date(2015,3,1)}> </BigCalendar>
      </div>
    );
  };
};

export default Calendar;
