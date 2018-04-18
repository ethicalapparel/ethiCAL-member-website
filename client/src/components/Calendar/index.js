import React, { Component } from 'react';
import axios from 'axios';
import './index.css';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

const ASANA_AUTH_HEADER = "Bearer " + process.env.ASANA_PAT;
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));



class Calendar extends Component {
  state = {
      data: [],
      name: "Event Description",
      date: "",
      description: "",
      // rsvp:[],
      currEvent:null
  };

  componentDidMount() {
    axios.get('/asana/calendar')
      .then((response) => this.setState({data: response.data}));
  };

  handleSelectEvent(event) {
    var t = event.start.toString().slice(0, 10);
    this.setState({
      name: event.title,
      date: t,
      description: event.description,
      // rsvp: event.rsvp,
      currEvent:event
    })
  };



  render() {
    return (
      <div class="container">
        <h1> Club Calendar </h1>
        <BigCalendar
          events={this.state.data}
          onSelectEvent={(event) =>this.handleSelectEvent(event)}
          style={{height: "400px"}}
          defaultDate={new Date()}
        />
        <div class="ui fluid card">
          <div class="content">
            <a class="header">{this.state.name}</a>
            <div class="meta">
              <span class="date">{this.state.date}</span>
            </div>
            <div class="description">
              {this.state.description}
            </div>
          </div>
        </div>
      </div>

    );
  };
};
// <h1> {JSON.stringify(this.state.data)} </h1>

export default Calendar;
