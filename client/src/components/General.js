import React, { Component } from 'react';
import axios from 'axios';

class General extends Component {
  state = {
      data: [
        {title: "General Info 1", description: ["Update 1", "Update 2"]},
        {title: "General Info 2", description: ["Update 1", "Update 2"]}
        ]
      };

  render() {
    return (
      <div>
        <h1> General Information </h1>
      </div>
    );
  };
};

export default General;
