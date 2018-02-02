import React, { Component } from 'react';
import axios from 'axios';
import {Divider, Header, Loader, Image} from 'semantic-ui-react';
import DescFormat from '../../utils/StringFormat.js';
import './index.css';
import imageFile from './res/img/team-image.JPG';

const RetreatSection = (props) => {
  const entries = props.data.filter(entry => entry.section == props.section)
  .map(entry => (
        <div>
          <div style={{size: '16px'}}> {entry.name} </div>
          <DescFormat text={entry.description}/>
        </div>
    )
  );

  const loading = <Loader inline small centered active/>
  return(
    <div>
      <Header as='h3'> {props.section} </Header>
      {entries}
    </div>
  );
}


class Retreat extends Component {
  state = {
      data: []
      };

  infoBullets = <Loader active/>;

  getData() {
    axios.get('/asana/retreat')
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

    if (this.state.data && this.state.data.length > 0) {
      this.infoBullets = (
      <div>
        <RetreatSection section='General' data={this.state.data}/>
        <RetreatSection section='Packing' data={this.state.data}/>
        <RetreatSection section='Activities' data={this.state.data}/>
      </div>
      );
    } else {
      this.infoBullets = <Loader inline active/>;
    }

    return (
      <div className="container">
        <div className="cover-photo">
          <div className="overlay">
            <img src={imageFile}/>
          </div>
          <Header as='h1' className='main-header'> Retreat Information </Header>
        </div>
        <div className="information-bullets">
          {this.infoBullets}
        </div>
      </div>
      );
  };
};

export default Retreat;
