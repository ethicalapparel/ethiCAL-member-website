import React, { Component } from 'react';
import axios from 'axios';
import {Divider, Header} from 'semantic-ui-react';
import './index.css';

class General extends Component {
  state = {
      data: [
        {title: "General Info 1", description: ["Update 1", "Update 2"]},
        {title: "General Info 2", description: ["Update 1", "Update 2"]}
        ]
      };

  componentDidMount() {
    axios.get('/asana/general')
      .then((response) => this.setState({data: response.data.filter((entry) => (entry.tags.length > 0))}));
  };
  // For now, can simply filter by an entry containing tags...

  render() {
    return (
      <div>
        <h1> General Info </h1>
        <div> {JSON.stringify(this.state.data, null, 2)}</div>
      </div>
    );
  };
};

export default General;
