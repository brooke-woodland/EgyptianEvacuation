import React from 'react';
import { Form } from 'react-bootstrap';
import '../../css/form.css';

function Wrapping(props) {
  const params = props.parameters;
  const handleParamChange = props.handleParamChange;
  const handleDropdownChange = props.handleDropdownChange;

  return (
    <div className="container py-3">
      <h3>Wrapping Analysis</h3>
      <Form>
        <Form.Group>
          <Form.Label>Depth</Form.Label>
          <Form.Control
            type="text"
            name="depth"
            value={params.depth || ''}
            onChange={handleParamChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Length</Form.Label>
          <Form.Control
            name="length"
            type="text"
            value={params.length || ''}
            onChange={handleParamChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Wrapping</Form.Label>
          <select
            className="form-select form-control w-100"
            name="wrapping"
            value={params.wrapping}
            onChange={handleDropdownChange}
          >
            <option value="">Select an option</option>
            <option value="H">Head only</option>
            <option>Body only</option>
            <option value="W">Whole body</option>
          </select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Face Bundles</Form.Label>
          <select
            className="form-select form-control"
            name="facebundles_1"
            value={params.facebundles}
            onChange={handleParamChange}
          >
            <option value="">Select an option</option>
            <option value="0">None</option>
            <option value="1">Some</option>
            <option value="0">Moderate</option>
            <option value="0">Lots</option>
            <option value="0">Tons</option>
            <option value="0">Unknown</option>
          </select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Age</Form.Label>
          <select
            className="form-select form-control"
            name="adultsubadult_C"
            value={params.age}
            onChange={handleParamChange}
          >
            <option value="">Select an option</option>
            <option value="0">Adult</option>
            <option value="1">Child</option>
          </select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Preservation</Form.Label>
          <select
            className="form-select form-control"
            name="preservation"
            value={params.preservation}
            onChange={handleDropdownChange}
          >
            <option value="">Select an option</option>
            <option value="1">Very poor</option>
            <option value="1">Poor preservation</option>
            <option value="2">Moderate preservation</option>
            <option value="3">Well preserved</option>
            <option value="4">Practically brand new</option>
            <option value="U">Unknown</option>
          </select>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Wrapping;
