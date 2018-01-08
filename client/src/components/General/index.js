import React, { Component } from 'react';
import axios from 'axios';
import {Divider, Header} from 'semantic-ui-react';
import './index.css';

const Info = (props) => {
  const entries = props.data.map(entry => (
      <div>
        <Header as='h2'> {entry.name} </Header>
        <p> {entry.description} </p>
      </div>
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
  };

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
        <Header as='h1' className='main-header'> General Info </Header>
        <Info data={this.state.data}/>
      </div>
    );
  };
};

export default General;
