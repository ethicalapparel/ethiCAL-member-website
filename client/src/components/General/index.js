import React, { Component } from 'react';
import axios from 'axios';
import {Divider, Header, Loader, Image} from 'semantic-ui-react';
import './index.css';
import imageFile from './res/img/general-info.JPG';

const Info = (props) => {
  const entries = props.data.map(entry => (
    <div>
      <div>
        <Header as='h2'> {entry.name} </Header>
        <p> {entry.description} </p>
      </div>
    </div>
    )
  );
  const loading = <Loader inline small centered active/>
  return(
      entries && entries.length ? <div> {entries} </div>: loading
  );
}


class General extends Component {
  state = {
      data: []
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
      <div className="container">
        <div className="cover-photo">
          <div className="overlay">
            <img src={imageFile}/>
          </div>
          <Header as='h1' className='main-header'> General Info </Header>
        </div>
        <div className="information-bullets">
          <Info data={this.state.data}/>
        </div>
      </div>
      );
  };
};

export default General;
