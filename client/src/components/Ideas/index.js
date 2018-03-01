import React, { Component } from 'react';
import {Card, Header, Loader, Button, Modal, Container, Form} from 'semantic-ui-react';
import axios from 'axios';
import './index.css';
import auth from "../../Auth.js";

class IdeaModal extends Component {
  state = {
      data: [],
      comment: "",
  };

  comment = () => {
    // API Call to submit feedback
    //console.log(auth.id);
    //if (this.state.comment) {
    clearInterval(this.countdown);
    axios.post('/asana/postComment?id=' + this.props.entry.id,
      {text: this.state.comment});
    var arrayvar = this.state.data.slice();
    arrayvar.push({created_at: "just now", text: this.state.comment});
    this.setState({ data: arrayvar });
    //this.getData();
    setTimeout(() => {
      this.countdown = setInterval(() => (this.getData()), 3000);
    }, 10000)
    this.setState({comment: ''});
    //}
    //this.props.prompt();
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  getData = () => {
    axios.get('/asana/ideaComments?id=' + this.props.entry.id)
      .then((response) => this.setState({data: response.data}));
  };


  modalOpen = () => {
    this.getData();
    this.countdown = setInterval(()=>this.getData(), 3000);
  }

  modalClose = () => {
    clearInterval(this.countdown);
  }


  componentWillUnmount() {
    clearInterval(this.countdown);
  };

  render() {
    return (
      <Modal trigger={
        <Card.Content extra>
          <Button color='green'>
          More Info
          </Button>
          <div>
            {this.props.entry.loves}
          </div>
        </Card.Content>}
        onOpen={this.modalOpen}
        onClose={this.modalClose}
        closeIcon
        >
        <Modal.Content>
        <Modal.Header as='h1'>{this.props.entry.idea}</Modal.Header>
        <Modal.Description>
          <p>{this.props.entry.description}</p>
          <div> {this.state.data.map((elem) => (<p> <b> {elem.text} </b> {elem.created_at}</p>))}</div>
          <Form onSubmit={this.comment}>
                <Form.Field>
                  <Form.Input placeholder='Comment...' name='comment' value={this.state.comment} onChange={this.handleChange}/>
                </Form.Field>
                <Form.Button content='Comment!'/>
          </Form>
        </Modal.Description>
      </Modal.Content>
      </Modal>);
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
      <IdeaModal entry={entry}/>
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
class IdeaForm extends Component {
  state = {
    ideaSubmitted: false,
    idea: '',
    description: ''
  };


  submit = () => {
    // API Call to submit feedback
    //console.log(auth.id);
    if (this.state.idea) {
      axios.post('/asana/submitIdea',
        {name: this.state.idea, notes: this.state.description, enum_id: auth.id});
      this.setState({ideaSubmitted: true, idea: '', description: ''});
    }
    //this.props.prompt();
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render () {
    return (<Form onSubmit={this.submit}>
      <Header as='h1'> Submit your idea here! </Header>
      <Form.Field>
        <Form.Input placeholder='Idea' name='idea' value={this.state.idea} onChange={this.handleChange}/>
      </Form.Field>

      <Form.Field>
        <Form.TextArea placeholder='Description' name='description' value={this.state.description} onChange={this.handleChange}/>
      </Form.Field>

      <Form.Button content='Submit'/>
      <div>
      {this.state.ideaSubmitted && "Thank you for your submission!"}
      </div>
    </Form>);
  }
}

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
    this.countdown = setInterval(()=>this.getData(), 5000);
  };

  componentWillUnmount() {
    clearInterval(this.countdown);
  };


  render() {
    return (
      <div>
        <Header as='h1'> Ideas Thread </Header>
        <IdeaForm prompt={this.getData}/>
        <IdeaCards data={this.state.data}/>
      </div>
    );
  };
};

export default Ideas;
