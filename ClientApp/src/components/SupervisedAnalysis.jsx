import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Wrapping from './analysis/wrapping';
import Direction from './analysis/head-direction';

function SupervisedAnalysis() {
  const [activeAnalysisType, setActiveAnalysisType] = useState('wrapping');
  const handleAnalysis = (analysisType) => {
    setActiveAnalysisType(analysisType);
  };

  const [parameters, setParameters] = useState({
    depth: 0,
    length: 0,
    wrapping_H: 0,
    wrapping_W: 0,
    facebundles_1: 0,
    adultsubadult_C: 0,
    preservation_1: 0,
    preservation_2: 0,
    preservation_3: 0,
    preservation_4: 0,
    preservation_U: 0,
  });
  var prediction = '';

  const handleOnClick = () => {
    let message = 'Selected parameters:\n';
    for (const key in parameters) {
      message += `${key}: ${parameters[key]}\n`;
    }
    alert(message); // create an alert with selected items

    // The Beautiful API call:
    const axios = require('axios');
    let data = JSON.stringify(parameters);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://54.219.174.191/predict',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        prediction = response.data.prediction;
      })
      .catch((error) => {
        console.log(error);
      });

    setParameters({
      depth: 0,
      length: 0,
      wrapping_H: 0,
      wrapping_W: 0,
      facebundles_1: 0,
      adultsubadult_C: 0,
      preservation_1: 0,
      preservation_2: 0,
      preservation_3: 0,
      preservation_4: 0,
      preservation_U: 0,
    });
  };

  const handleParamChange = (event) => {
    const { name, value } = event.target;
    setParameters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleDropdownChange = (event) => {
    const { name, value } = event.target;
    const fullName = name + '_' + value;
    setParameters((prevState) => ({
      ...prevState,
      [fullName]: 1,
    }));
  };

  return (
    <div className="mb-10">
      <Row className="mb-10">
        <Col className="col-6">
          <Card className="p-20 mb-10 shadow rounded">
            <Card.Header className="d-flex">
              <button
                type="button"
                className={`btn flex-grow-1 mx-2 ${
                  activeAnalysisType === 'wrapping'
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
                onClick={() => handleAnalysis('wrapping')}
              >
                Wrapping Analysis
              </button>
              <button
                type="button"
                className={`btn flex-grow-1 ${
                  activeAnalysisType === 'direction'
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
                onClick={() => handleAnalysis('direction')}
              >
                Direction Analysis
              </button>
            </Card.Header>

            {activeAnalysisType === 'wrapping' ? (
              <Wrapping
                parameters={parameters}
                handleParamChange={handleParamChange}
                handleDropdownChange={handleDropdownChange}
              />
            ) : (
              <Direction
                parameters={parameters}
                handleParamChange={handleParamChange}
                handleDropdownChange={handleDropdownChange}
              />
            )}
            <Card.Footer>
              <Button onClick={handleOnClick} className="btn-block">
                Perform Analysis
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col className="col-4 d-flex align-items-center">
          <Card className="p-20 shadow rounded">
            <Card.Header>Supervised Analysis Results:</Card.Header>
            <div className="p-4">
              {prediction ||
                'Please select an analysis type and enter burial details. Then click "Perform Analysis" to see the results.'}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default SupervisedAnalysis;
