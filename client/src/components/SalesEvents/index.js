import React, { Component } from 'react';
import axios from 'axios';
import {Divider, Header, Loader, Image} from 'semantic-ui-react';
import DescFormat from '../../utils/StringFormat.js'
import './index.css';
import imageFile from './res/img/sales-image.jpg';
import AsanaImage from '../../utils/AsanaImage.js';
// {entry.description.split("\n").map(line => <p> {line} </p>)}
const SalesInfo = (props) => {
  const entries = props.data.map(entry => (
    <div>
      <div>
        <Header as='h2'> {entry.name} </Header>
        <DescFormat text={entry.description}/>
        {entry.photo ? <AsanaImage id={entry.id}/> : null}
      </div>
    </div>
    )
  );
  const loading = <Loader inline small centered active/>
  return(
      entries && entries.length ? <div> {entries} </div>: loading
  );
}


class SalesEvents extends Component {
  state = {
      data: []
      };

  getData() {
    axios.get('/asana/sales')
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
          <Header as='h1' className='main-header'> Sales Event Info </Header>
        </div>

        <div className="information-bullets">
          <SalesInfo data={this.state.data}/>
        </div>
      </div>
      );
  };
};

export default SalesEvents;
