import React, { Component } from 'react';
import axios from 'axios';
import { Form } from 'semantic-ui-react';

class Feedback extends Component {
  state = {
    feedbackSubmitted: false,
    submission: ''
  };


  submit = () => {
    axios.post('asana/submitFeedback', this.state.submission);
    this.setState({feedbackSubmitted: true, submission: ''});
  };


  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    return (
      <div>
        <Form size='large' onSubmit={this.submit}>
          <Form.Group>
            <Form.Input placeholder='Submission' name='submission' value={this.state.submission} onChange={this.handleChange}/>
            <Form.Button content='Submit'/>
          </Form.Group>
          <div>
          {this.state.feedbackSubmitted && "Thank you for your submission!"}
          </div>
        </Form>
      </div>
    );
  };
};

export default Feedback;
