import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PrivacyPolicy from '../PrivacyPolicy';

export class FooterComp extends Component {
  static displayName = FooterComp.name;

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
      <footer className="bg-secondary py-1 mt-10">
        <Container>
          <Row>
            <Col className="col-6"></Col>
            <Col className="col-4">
              <p className="text-right">
                &copy; 2023 BYU Information Systems Group 2-3.
              </p>
            </Col>
            <Col className="col">
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
