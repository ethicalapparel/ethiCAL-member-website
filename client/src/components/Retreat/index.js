import React, { Component } from 'react';
import axios from 'axios';
import {Divider, Header, Loader, Image} from 'semantic-ui-react';
import './index.css';
import imageFile from './res/img/team-image.JPG';

const RetreatSection = (props) => {
  const entries = props.data.filter(entry => entry.section == props.section)
  .map(entry => (
        <div>
          <Header as='h3'> {entry.name} </Header>
          <p> {entry.description}</p>
        </div>
    )
  );

  const loading = <Loader inline small centered active/>
  return(
    <div>
      <Header as='h2'> {props.section} </Header>
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
      <div class = "ui two column centered grid">
        <div id = "rows" class = "ten wide column"> <RetreatSection section='General' data={this.state.data}/> </div>
        <div id = "rows" class = "four wide column"> <RetreatSection section='Packing' data={this.state.data}/> </div>
        <div id = "rows" class = "fourteen wide column"> <RetreatSection section='Activities' data={this.state.data}/> </div>
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
