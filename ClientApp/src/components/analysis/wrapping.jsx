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
          <Form.Label>Samples Collected</Form.Label>
          <select
            className="form-select form-control"
            name="samplescollected_true"
            value={params.facebundles}
            onChange={handleParamChange}
          >
            <option value="">Select an option</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
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
            <option value="0">Very poor</option>
            <option value="1">Poor preservation</option>
            <option value="2">Moderate preservation</option>
            <option value="3">Well preserved</option>
            <option value="4">Pristine</option>
            <option value="U">Unknown</option>
          </select>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Wrapping;
