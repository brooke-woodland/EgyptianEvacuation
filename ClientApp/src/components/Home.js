import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import mummyGuys from '../img/guyswmummy.JPG';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <>
        <Container>
          <Row>
            <Col className="col-3">
              <div className="row">
                <img
                  src={mummyGuys}
                  alt="Archaeologists"
                  className="w-100 center"
                  style={{ maxWidth: '500px' }}
                />
              </div>
            </Col>
            <Col className="col-3"></Col>
          </Row>

          <div>
            <h1 className="text-center">BYU Archaeology</h1>
            <p>
              Learn more about mummies and how certain aspects of their burial
              help us learn more about the person!!
            </p>
            <br />
            <p>Learn more about this dig</p>
            <ul>
              <li>
                <a href="https://www-sciencedirect-com.erl.lib.byu.edu/science/article/pii/S2352409X15000188">
                  Click Here!
                </a>
              </li>
            </ul>
            <h3>What else does this site offer?</h3>
            <ul>
              <li>
                A dynamic list of all the burials with attached important
                information regarding each one!
              </li>
              <li>
                An analysis of the mummies using computers to predict gender of
                mummies based off their attributes
              </li>
              <li>
                An analysis of the mummies to group them together and discover
                more about them!
              </li>
            </ul>
          </div>

          <div className="row">
            <div className="col"></div>
          </div>
        </Container>
      </>
    );
  }
}
