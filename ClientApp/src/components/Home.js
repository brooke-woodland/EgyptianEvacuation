import React, { Component } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import mummyGuys from '../img/guyswmummy.JPG';
import '../../src/css/style.css';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <>
        <Container>
          <Row>
            <Col className="col-6">
              <div className="row col d-flex justify-content-center">
                <img
                  src={mummyGuys}
                  alt="Archaeologists"
                  className="img-fluid shadow rounded-lg"
                  style={{ maxWidth: '100%' }}
                />
              </div>
            </Col>
            <Col className="col">
              <Card className="shadow rounded-lg border-0">
                <Card.Header className="text-white px-5 py-3 rounded-top bg-byu ">
                  Fag el-Gamous Burial Site and Seila Pyramid
                </Card.Header>
                <Card.Body className="px-5 py-4">
                  <p className="card-text">
                    The BYU Egypt Excavation Project has created a database that
                    presents data gained from decades of excavation of the Fag
                    el-Gamous cemetery during the Graeco-Roman era of Egyptian
                    history. This database provides an opportunity to tell the
                    stories of those who lived long ago in Egypt and enables us
                    to study the changing burial patterns and the multiple uses
                    of textiles. The Excavation Team, College of Religious
                    Education, College of Life Sciences, and Department of
                    Information Systems inside the Marriott School of Business
                    have worked together to make this database available to the
                    world.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="mt-5">
              The Fag el-Gamous cemetery provides a marvelous opportunity for
              demographic studies, statistical studies of burial practices, and
              various textile studies. The cemetery includes wealthier burials
              in mudstone escarpments and less wealthy burials that range from
              being fully skeletonized to extremely well preserved, dating from
              just after 300 BC to about 500 AD. Our most recent publications
              detail the many analyses of the site and artifacts, including
              which mummy portraits came from Fag el-Gamous, analysis of common
              burial practices at the cemetery, and a report of a survey done of
              the nearby town of Philadelphia. The Seila Pyramid excavation is
              the other part of the project and provides evidence for ritual
              activity and an important witness of Snefru's innovations in
              regard to pyramid complexes, representing an important role in the
              development of pyramids.
            </Col>
          </Row>

          <div>
            <br />
            <p>Learn more about this dig</p>
            <a
              class="btn btn-primary"
              href="https://www-sciencedirect-com.erl.lib.byu.edu/science/article/pii/S2352409X15000188"
            >
              Click Here!
            </a>
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
