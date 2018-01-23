import React, { Component } from 'react';
import axios from 'axios';
import {Divider, Header, Loader, Image} from 'semantic-ui-react';
import './index.css';


const RetreatSection = (props) => {
  const entries = props.data.filter(entry => entry.section == props.section)
  .map(entry => (
        <div>
          <div style={{size: '16px'}}> {entry.name} </div>
          <p> {entry.description}</p>
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
        <Header as='h1'> Retreat Information </Header>
        <div className="information-bullets">
          {this.infoBullets}
        </div>
      </div>
      );
  };
};

export default Retreat;
