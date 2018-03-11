import React, { Component } from 'react';
import axios from 'axios';
import './index.css';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));


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
      <div class="container">
        <h1> Club Calendar </h1>
        <BigCalendar
          events={this.state.data}
          style={{height: "400px"}}
          defaultDate={new Date()}
        />
        <h1> {JSON.stringify(this.state.data)} </h1>
      </div>

    );
  };
};

export default Calendar;
