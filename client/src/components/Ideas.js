import React, { Component } from 'react';
import axios from 'axios';

class Ideas extends Component {
  state = {
      data: [
        {title: "Web Team Updates", updates: ["Update 1", "Update 2"]},
        {title: "Sales Updates", updates: ["Update 1", "Update 2"]}
        ]
      };

  render() {
    return (
      <div>
        <h1> Ideas Thread Goes Here </h1>
      </div>
    );
  };
};

export default Ideas;
