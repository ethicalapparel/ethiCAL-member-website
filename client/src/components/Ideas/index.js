import React, { Component } from 'react';
import {Card, Header, Loader, Button, Modal, Container} from 'semantic-ui-react';
import axios from 'axios';
import './index.css';

class IdeaModal extends Component {
  state = {
      data: []
  };
}

const IdeaCards = (props) => {
  const entries = props.data.map(entry => (
    <Card centered color='violet'>
      <Card.Content>
        <Card.Header>
          {entry.idea}
        </Card.Header>
        <Card.Meta>
          {entry.memberName}
        </Card.Meta>
        <Card.Description>
          {entry.description.substring(0,10) + "..."}
        </Card.Description>
      </Card.Content>
      <Modal trigger={
        <Card.Content extra>
          <Button color='green'>
          More Info
          </Button>
          <div>
            {entry.loves}
          </div>
        </Card.Content>}
        >
        <Modal.Content>
          <Modal.Header as='h1'>{entry.idea}</Modal.Header>
          <Modal.Description>
            <p>{entry.description}</p>
            <div> <Header as='h1'> COMMENTS GO HERE </Header> </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </Card>
    )
  );
  const loading = <Loader active/>
  return(
    <Container>
      <Card.Group>
        {entries && entries.length > 0 ? entries : loading}
      </Card.Group>
    </Container>
  );
};

class Ideas extends Component {
  state = {
      data: []
  };

  getData() {
    axios.get('/asana/ideas')
      .then((response) => this.setState({data: response.data}));
  };

  componentDidMount() {
    this.getData();
    this.countdown = setInterval(()=>this.getData(), 10000);
  };

  componentWillUnmount() {
    clearInterval(this.countdown);
  };


  render() {
    return (
      <div>
        <Header as='h1'> Ideas Thread </Header>
        <IdeaCards data={this.state.data}/>
      </div>
    );
  };
};

export default Ideas;
