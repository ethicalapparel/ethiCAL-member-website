import React, { Component } from 'react';
import {Card, Header, Loader, Button, Modal, Container, Form, Icon} from 'semantic-ui-react';
import axios from 'axios';
import './index.css';
import auth from "../../Auth.js";

class IdeaModal extends Component {
  state = {
      data: [],
      comment: ""
  };

  comment = () => {
    // API Call to submit feedback
    //console.log(auth.id);
    //if (this.state.comment) {
    //if (this.state.comment.length > 0) {
    if (this.state.comment.length > 0) {
      clearInterval(this.countdown);
      var commentText = this.state.comment + "~" + auth.username;
      axios.post('/asana/postComment?id=' + this.props.entry.id,
        {text: commentText});
      var arrayvar = this.state.data.slice();
      arrayvar.push({created_at: "just now", text: this.state.comment, username: auth.username});
      this.setState({ data: arrayvar });
      //this.getData();
      this.setState({comment: ''});
      setTimeout(() => {
        this.countdown = setInterval(() => (this.getData()), 3000);
      }, 5000)
    }
  //  }
    //}
    //this.props.prompt();
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  getData = () => {
    axios.get('/asana/ideaComments?id=' + this.props.entry.id)
      .then((response) => this.setState({data: response.data}));
  };

  componentDidMount() {
    this.getData();
  }

  modalOpen = () => {
    //this.getData();
    this.countdown = setInterval(()=>this.getData(), 3000);
  }

  modalClose = () => {
    clearInterval(this.countdown);
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
  };

  render() {
    var comments;
    comments =this.state.data.map((elem) => {
    var commentArr = elem.text.split("~");
      var user;
      var commentText;
      //console.log(elem);
      if (elem.username != "Andrew Linxie") {
        user = elem.username.split(" ")[0];
        commentText = elem.text;
      } else {
        if (commentArr.length > 1) {
          user = commentArr[commentArr.length - 1].split(" ")[0];
          console.log(commentArr[0]);
          commentText = commentArr[0];
        } else {
          user = "Andrew";
          commentText = elem.text;
        }
      }
      console.log(commentText);
      var date_string = elem.created_at == "just now" ? "just now" : new Date(elem.created_at).toLocaleString();

      return (<div id="idea-comment"> <p> <b> {user + ": "}</b>  {commentText} <b style={{float:"right"}}> {date_string}</b>
          </p> </div>);
    });


    return (
      <Modal trigger={
          <Button inverted color='violet'>
          {"More Info & Comments (" + comments.length +")"}
          </Button>
        }
        onOpen={this.modalOpen}
        onClose={this.modalClose}
        closeIcon
        >
        <Modal.Content>
        <Modal.Header as='h1'>{this.props.entry.idea}</Modal.Header>
        <Modal.Description>
          <p id='idea-description'>{this.props.entry.description}</p>
           <div> {comments}</div>
          <Form onSubmit={this.comment}>
            <Form.Group fluid>
                <Form.Field width={13}>
                  <Form.Input placeholder='Comment...' name='comment' value={this.state.comment} onChange={this.handleChange}/>
                </Form.Field>
                <Form.Button content='Comment!' width={2}/>
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
      </Modal>);
  };
}


const IdeaCards = (props) => {

  const entries = props.data.map(entry => (
    <Card centered color='#c8dde1'>
      <Card.Content>
        <Card.Header>
          {entry.idea}
        </Card.Header>
        <Card.Meta>
          <b>{entry.memberName}</b>
        </Card.Meta>
        <Card.Meta>
          {new Date(entry.created_at).toLocaleDateString()}
        </Card.Meta>
        <Card.Description>
          {entry.description.substring(0,30) + "..."}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <IdeaModal entry={entry}/>
      </Card.Content>
    </Card>
    )
  );
  // heart... for another time :( <div style={{float: 'right', poition: 'absolute'}}>
  //   <Icon name='heart' link> </Icon>
  //   {entry.loves}
  // </div>
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

      <div id = 'form-container'>
      <Header as='h1'> Ideas Thread </Header>
      <Header as='h2'> Submit your idea here! </Header>

      <div id = 'form'>
        <Form.Field>
          <Form.Input placeholder='Idea' name='idea' value={this.state.idea} onChange={this.handleChange}/>
        </Form.Field>

        <Form.Field>
          <Form.TextArea placeholder='Description' name='description' value={this.state.description} onChange={this.handleChange}/>
        </Form.Field>

        <Form.Button content='Submit'/>
      </div>

      </div>

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
    this.countdown = setInterval(()=>this.getData(), 2000);
  };

  componentWillUnmount() {
    clearInterval(this.countdown);
  };


  render() {
    return (
      <div as='ideas-container'>
        <div as='ideas-form'>
          <IdeaForm prompt={this.getData}/>
        </div>

        <div as='ideas-submitted'>
          <IdeaCards data={this.state.data}/>
        </div>
      </div>
    );
  };
};

export default Ideas;
