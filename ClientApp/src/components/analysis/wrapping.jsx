import React, { useState } from 'react';
import { Form, Dropdown } from 'react-bootstrap';
import '../../css/form.css';

function Wrapping() {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);

  const handleDropdownChange = (event) => {
    alert(event.target.value);
    setSelectedOption(event.target.getAttribute('value'));
  };

  const handleInputChange = (event) => {
    alert(event.target.value);
    setInputValue(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    alert(event.target.value);
    setCheckboxValue(event.target.checked);
  };

  const handleSubmit = (event) => {
    alert(event.target.value);
    event.preventDefault();
    // handle form submission logic here
  };

  return (
    <div className="container">
      <h3>Wrapping Form</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Dropdown</Form.Label>
          <Dropdown value={selectedOption} onChange={handleDropdownChange}>
            <Dropdown.Toggle variant="secondary" className="w-100">
              {selectedOption ? selectedOption : 'Select an option'}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              <Dropdown.Item value="option1">Option 1</Dropdown.Item>
              <Dropdown.Item value="option2">Option 2</Dropdown.Item>
              <Dropdown.Item value="option3">Option 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group>
          <select
            className="form-select"
            value={selectedOption}
            onChange={handleDropdownChange}
          >
            <option value="">Select an option</option>
            <option value="Ford">Ford</option>
            <option value="Volvo">Volvo</option>
            <option value="Fiat">Fiat</option>
          </select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Input</Form.Label>
          <Form.Control
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Dropdown onChange={handleDropdownChange}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedOption ? selectedOption : 'Select an option'}
          </Dropdown.Toggle>

          <Dropdown.Menu onChange={handleDropdownChange}>
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Item>Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Check me out"
            checked={checkboxValue}
            onChange={handleCheckboxChange}
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export default Wrapping;
