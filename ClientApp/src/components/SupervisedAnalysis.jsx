import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Wrapping from './analysis/wrapping';
import Direction from './analysis/head-direction';

function SupervisedAnalysis() {
  const [activeAnalysisType, setActiveAnalysisType] = useState('wrapping');
  const [prediction, setPrediction] = useState('');
  const [sendRequest, setSendRequest] = useState(false);
  const [endpoint, setEndpoint] = useState('predict-head-direction');
  const [parameters, setParameters] = useState({
    depth: 0,
    length: 0,
    wrapping_H: 0,
    wrapping_W: 0,
    adultsubadult_C: 0,
    facebundles_1: 0,
    preservation_1: 0,
    preservation_2: 0,
    preservation_3: 0,
    preservation_4: 0,
    preservation_U: 0,
  });
  const [wrapParameters, setWrapParameters] = useState({
    preservation_1: 0,
    preservation_2: 0,
    preservation_3: 0,
    preservation_4: 0,
    samplescollected_true: 0,
  });

  const handleAnalysis = (analysisType) => {
    setActiveAnalysisType(analysisType);
    setEndpoint('predict-' + analysisType);
  };

  useEffect(() => {
    const sendRequestToServer = async () => {
      console.log(JSON.stringify(parameters));

      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      if (activeAnalysisType === 'head-direction') {
        var raw = JSON.stringify({
          depth: parameters.depth,
          length: parameters.length,
          wrapping_H: parameters.wrapping_H,
          wrapping_W: parameters.wrapping_W,
          adultsubadult_C: parameters.adultsubadult_C,
          facebundles_1: parameters.facebundles_1,
          preservation_1: parameters.preservation_1,
          preservation_2: parameters.preservation_2,
          preservation_3: parameters.preservation_3,
          preservation_4: parameters.preservation_4,
          preservation_U: parameters.preservation_U,
        });
      } else {
        raw = JSON.stringify({
          preservation_1: wrapParameters.preservation_1,
          preservation_2: wrapParameters.preservation_2,
          preservation_3: wrapParameters.preservation_3,
          preservation_4: wrapParameters.preservation_4,
          samplescollected_true: wrapParameters.samplescollected_true,
        });
      }
      console.log('raw: ' + raw);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        //referer: 'no-referrer',
      };

      const url = 'https://mummysupervised23.is404.net/';
      const fullEndpoint = url + endpoint;

      fetch(fullEndpoint, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          setPrediction(result);
        })
        .catch((error) => console.log('error', error));

      setParameters((prevState) => ({
        ...prevState,
        depth: 0,
        length: 0,
        wrapping_H: 0,
        wrapping_W: 0,
        adultsubadult_C: 0,
        facebundles_1: 0,
        preservation_1: 0,
        preservation_2: 0,
        preservation_3: 0,
        preservation_4: 0,
        preservation_U: 0,
      }));
      setWrapParameters((prevState) => ({
        ...prevState,
        preservation_1: 0,
        preservation_2: 0,
        preservation_3: 0,
        preservation_4: 0,
        samplescollected_true: 0,
      }));

      setSendRequest(false);
    };

    if (sendRequest) {
      sendRequestToServer();
    }
  }, [
    sendRequest,
    parameters,
    prediction,
    endpoint,
    wrapParameters,
    activeAnalysisType,
  ]);

  // maybe add to package.json
  // "proxy": "httpS://mummysupervised23.is404.net/",

  const handleOnClick = () => {
    // create an alert with selected items
    setSendRequest(true);
  };
  const handleParamChange = (event) => {
    const { name, value } = event.target;
    setParameters((prevState) => ({
      ...prevState,
      [name]: parseInt(value),
    }));
  };
  const handleDropdownChange = (event) => {
    const { name, value } = event.target;
    const fullName = name + '_' + value;
    if (parameters.hasOwnProperty(fullName)) {
      setParameters((prevState) => ({
        ...prevState,
        [fullName]: 1,
      }));
    }
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
                  activeAnalysisType === 'head-direction'
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
                onClick={() => handleAnalysis('head-direction')}
              >
                Head Direction Analysis
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
