import React, { Component } from 'react';
import {Card, Header, Loader, Button, Modal, Container, Form, Icon} from 'semantic-ui-react';
import axios from 'axios';
import './index.css';
import auth from "../../Auth.js";


const AppreciationCards = (props) => {
  const entries = props.data.map(entry => (
    <Card centered color='#c8dde1'>
      <Card.Content>
        <Card.Header>
          {entry.person}
        </Card.Header>
        <Card.Meta>
          {entry.memberName}
        </Card.Meta>
        <Card.Description>
          {entry.description}
        </Card.Description>
      </Card.Content>
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

// <Modal.Content>
//   <IdeaModal entry={entry}/>
//   <Modal.Header as='h1'>{entry.idea}</Modal.Header>
//   <Modal.Description>
//     <p>{entry.description}</p>
//     <div> <Header as='h1'> COMMENTS GO HERE </Header> </div>
//   </Modal.Description>
// </Modal.Content>
class AppreciationForm extends Component {
  state = {
    apprSubmitted: false,
    person: '',
    description: ''
  };


  submit = () => {
    // API Call to submit feedback
    //console.log(auth.id);
    if (this.state.person) {
      axios.post('/asana/submitAppreciation',
        {name: this.state.person, notes: this.state.description, enum_id: auth.id});
      this.setState({apprSubmitted: true, person: '', description: ''});
    }
    //this.props.prompt();
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render () {
    return (<Form onSubmit={this.submit}>

      <div id = 'form-container'>
      <Header as='h1'> {"Member's Appreciation"}</Header>
      <Header as='h2'> I Appreciate </Header>

      <div id = 'form'>
        <Form.Field>
          <Form.Input placeholder='Member Name' name='person' value={this.state.person} onChange={this.handleChange}/>
        </Form.Field>
        <Header as='h2'> Because </Header>
        <Form.Field>
          <Form.TextArea placeholder='Reason...' name='description' value={this.state.description} onChange={this.handleChange}/>
        </Form.Field>

        <Form.Button content='Appreciate!!'/>
      </div>

      </div>

      <div>
      {this.state.apprSubmitted && "Thank you for sending appreciation!!"}
      </div>
    </Form>);
  }
}

class Appreciation extends Component {
  state = {
      data: []
  };

  getData() {
    axios.get('/asana/appreciation')
      .then((response) => this.setState({data: response.data}));
  };

  componentDidMount() {
    this.getData();
    this.countdown = setInterval(()=>this.getData(), 2000);
  };

  componentWillUnmount() {
    clearInterval(this.countdown);
  };


  render() {
    const entries = this.state.data.map(entry => (
      <Card centered color='#c8dde1'>
        <Card.Content>
          <Card.Header>
            {entry.person}
          </Card.Header>
          <Card.Meta>
            {entry.memberName}
          </Card.Meta>
          <Card.Description>
            {entry.description}
          </Card.Description>
        </Card.Content>
      </Card>
      )
    );
    const loading = <Loader active/>
    return (
      <div as='appreciation-container'>
        <div as='appreciation-form'>
          <AppreciationForm prompt={this.getData}/>
        </div>

        <div as='appreciation-submitted'>
          <Container>
            <Card.Group>
              {entries && entries.length > 0 ? entries : loading}
            </Card.Group>
          </Container>
        </div>
      </div>
    );
  };
};

export default Appreciation;
