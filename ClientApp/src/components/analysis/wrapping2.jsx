import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import '../../css/form.css';

function Wrapping(props) {
  const setParameters = props.setParameters;
  const [inputDepth, setDepth] = useState();
  const [inputLength, setLength] = useState();
  const [inputWrapping, setWrapping] = useState();
  const [inputFacebundles, setFacebundles] = useState();
  const [inputAdultsubadult, setAdultsubadult] = useState();
  const [inputPreservation, setPreservation] = useState();

  /*
  Depth -
var
Length - 
var
Wrapping - 
(H, W, B)
Adultsubadult-
(a, c)
Preservation - 
(0,1,2,3,4,U)
*/
  const handleSubmit = (event) => {
    alert(event.target.value);
    event.preventDefault();
  };
  const handleDepthChange = (event) => {
    setDepth(event.target.value);
    setParameters({
      depth: event.target.value,
    });
  };
  const handleLengthChange = (event) => {
    if (event.target.value !== '') {
      setLength(event.target.value);
      setParameters((prevState) => ({
        ...prevState,
        length: event.target.value,
      }));
    }
  };
  const handleWrappingChange = (event) => {
    setWrapping(event.target.value);
    const { name } = event.target;
    if (name) {
      setParameters((prevState) => ({
        ...prevState,
        [name]: 1,
      }));
    }
  };
  const handleFacebundlesChange = (event) => {
    setFacebundles(event.target.value);
  };
  const handleAdultsubadultChange = (event) => {
    setAdultsubadult(event.target.value);
    if (event.target.value === 'child') {
      setParameters({
        adultsubadult_C: 1,
      });
    } else {
      setParameters({
        adultsubadult_C: 0,
      });
    }
  };
  const handlePreservationChange = (event) => {
    setPreservation(event.target.value);
    const { name } = event.target;
    setParameters((prevState) => ({
      ...prevState,
      [name]: 1,
    }));
  };

  return (
    <div className="container py-3">
      <h3>Wrapping Analysis</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Depth</Form.Label>
          <Form.Control
            type="text"
            value={inputDepth}
            onChange={handleDepthChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Length</Form.Label>
          <Form.Control
            type="text"
            value={inputLength}
            onChange={handleLengthChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Wrapping</Form.Label>
          <select
            className="form-select"
            value={inputWrapping}
            onChange={handleWrappingChange}
          >
            <option value="">Select an option</option>
            <option value="H" name="wrapping_H">
              Head only
            </option>
            <option value="B">Body only</option>
            <option value="W" name="wrapping_W">
              Whole body
            </option>
          </select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Face Bundles</Form.Label>
          <select
            className="form-select"
            value={inputFacebundles}
            onChange={handleFacebundlesChange}
          >
            <option value="">Select an option</option>
            <option value="0">None</option>
            <option value="1">Some</option>
            <option value="2">Moderate</option>
            <option value="3">Lots</option>
            <option value="4">Tons</option>
            <option value="U">Unknown</option>
          </select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Age</Form.Label>
          <select
            className="form-select"
            value={inputAdultsubadult}
            onChange={handleAdultsubadultChange}
          >
            <option value="">Select an option</option>
            <option value="adult">Adult</option>
            <option value="child">Child</option>
          </select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Preservation</Form.Label>
          <select
            className="form-select"
            value={inputPreservation}
            onChange={handlePreservationChange}
          >
            <option value="">Select an option</option>
            <option value="0" name="preservation_0">
              Very poor
            </option>
            <option value="1" name="preservation_1">
              Poor preservation
            </option>
            <option value="2" name="preservation_2">
              Moderate preservation
            </option>
            <option value="3" name="preservation_3">
              Well preserved
            </option>
            <option value="4" name="preservation_4">
              Practically brand new
            </option>
            <option value="U" name="preservation_U">
              Unknown
            </option>
          </select>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Wrapping;
