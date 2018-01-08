import React, { Component } from 'react';
import axios from 'axios';
import {Divider, Header} from 'semantic-ui-react';
import './index.css';

const Info = (props) => {
  const entries = props.data.map(entry => (
      <div> <h2> {entry.name} </h2> <p> {entry.description} </p> </div>
    )
  );
  return(
    <div>
      {entries}
    </div>
  );
}
class General extends Component {
  state = {
      data: [
        {title: "General Info 1", description: ""},
        {title: "General Info 2", description: ""}
        ]
      };

  getData() {
    axios.get('/asana/general')
      .then((response) => this.setState({data: response.data}));
  }

  componentDidMount() {
    this.getData();
    this.countdown = setInterval(()=>this.getData(), 10000);
  };

  componentWillUnmount() {
    clearInterval(this.countdown);
  };
  // For now, can simply filter by an entry containing tags...

  render() {
    return (
      <div>
        <h1> General Info </h1>
        <Info data={this.state.data}/>
      </div>
    );
  };
};

export default General;
