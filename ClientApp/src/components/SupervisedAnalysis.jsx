import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Wrapping from './analysis/wrapping';

export class SupervisedAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      isLoading: false,
      error: null,
      selectedItems: [], // add a state for selected items
    };
  }

  handleSelectedItems = (items) => {
    this.setState({ selectedItems: items }); // update the state with selected items
  };

  handleOnClick = () => {
    alert(`Selected items: ${this.state.selectedItems.join(', ')}`); // create an alert with selected items
  };

  render() {
    return (
      <>
        <Row>
          <Col className="col-6">
            <Card>
              <Card.Header className="bg-light">
                <Wrapping onSelected={this.handleSelectedItems} />
              </Card.Header>

              <Card.Footer>
                <Button onClick={this.handleOnClick}>Perform Analysis</Button>
              </Card.Footer>
            </Card>
          </Col>
          <Col className="col-6 d-flex align-items-center">
            <Card>
              <Card.Header>Supervised Analysis Results:</Card.Header>
              Hello World
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

//{cardBody}
