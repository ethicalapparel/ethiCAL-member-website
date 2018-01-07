import React, { Component } from 'react';
import axios from 'axios';
import { Form, Grid, Header } from 'semantic-ui-react';

class Feedback extends Component {
  state = {
    feedbackSubmitted: false,
    feedback: '',
    description: ''
  };


  submit = () => {
    axios.post('/asana/submitFeedback',
      {name: this.state.feedback, notes: this.state.description});
    this.setState({feedbackSubmitted: true, feedback: '', description: ''});
  };


  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    return (
      <Grid centered columns={1} style={{marginTop: '20vh'}}>
        <Form onSubmit={this.submit}>
          <Header as='h1'> Give Feedback </Header>
          <label> pls do not spam </label>
          <Form.Field>
            <Form.Input placeholder='Feedback' name='feedback' value={this.state.feedback} onChange={this.handleChange}/>
          </Form.Field>

          <Form.Field>
            <Form.TextArea placeholder='Description' name='description' value={this.state.description} onChange={this.handleChange}/>
          </Form.Field>

          <Form.Button content='Submit'/>
          <div>
          {this.state.feedbackSubmitted && "Thank you for your submission!"}
          </div>
        </Form>
      </Grid>
    );
  };
};

export default Feedback;
