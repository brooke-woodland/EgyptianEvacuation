import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PrivacyPolicy from './PrivacyPolicy';

export class Footer extends Component {
  static displayName = Footer.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <footer className="bg-light py-3 footer fixed-bottom">
        <Container>
          <hr />
          <Row>
            <Col>
              <p className="text-center">
                &copy; 2023 BYU Information Systems Group 2-3. All rights
                reserved.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="text-center">
                <PrivacyPolicy />
              </p>{' '}
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}
