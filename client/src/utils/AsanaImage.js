import React, { Component } from 'react';
import {Loader, Image} from 'semantic-ui-react';
import axios from 'axios'

class AsanaImage extends Component {
  state = {
      images: {}
      };

  getData() {
    axios.get('/asana/getAttachment?id=' + this.props.id)
      .then((response) => this.setState({images: response.data}));
  };

  componentWillMount() {
    this.getData();
  };

  // For now, can simply filter by an entry containing tags...

  render() {
    if (this.state.images && this.state.images.length ) {
      console.log(this.state.images);
      return (<Image src={this.state.images[0].view_url}/>);

    } else {
      return (<p> Image Loading... </p>);
    }
  };
};

export default AsanaImage;
