import React, { Component } from 'react';
import { Form, Dropdown, Button } from 'react-bootstrap';

class Wrapping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
      inputValue: '',
      checkboxValue: false,
    };
  }

  handleDropdownChange = (event) => {
    this.setState({ selectedOption: event.target.value });
  };

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleCheckboxChange = (event) => {
    this.setState({ checkboxValue: event.target.checked });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic here
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Dropdown</Form.Label>
          <Dropdown
            value={this.state.selectedOption}
            onChange={this.handleDropdownChange}
          >
            <Dropdown.Toggle variant="primary">
              Select an option
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item value="option1">Option 1</Dropdown.Item>
              <Dropdown.Item value="option2">Option 2</Dropdown.Item>
              <Dropdown.Item value="option3">Option 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Form.Group>
          <Form.Label>Input</Form.Label>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Check me out"
            checked={this.state.checkboxValue}
            onChange={this.handleCheckboxChange}
          />
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default Wrapping;
