import React, { useState } from 'react';
import { Button, Col, Row, Container } from 'react-bootstrap';
import './burial.css';

function BurialPopup({ rowData }) {
    const [showBurial, setShowBurial] = useState(false);

    function handleShowPrivacyPolicy() {
        setShowBurial(true);
    }

    function handleClosePrivacyPolicy() {
        setShowBurial(false);
    }

    return (
        <>

            <button className=" btn-link" onClick={handleShowPrivacyPolicy}>
                {rowData.burialMainId}
            </button>
            {showBurial && (

                <div className="privacy-policy">
                    <div className="privacy-policy-content">
                        <Container className="burial-popup-scale">
                            <Row>
                                <h1>Id: {rowData.burialMainId}</h1>
                            </Row>
                            <Row className="mb-5 text-left">
                                <Col>
                                    <h5>Burial Number</h5>
                                    {rowData.burialNumber ?? "Missing data..."}
                                </Col>
                                <Col>
                                    <h5>Depth</h5>
                                    {rowData.depth ?? "Missing data..."}
                                </Col>
                                <Col>
                                    <h5>Death Age</h5>
                                    {rowData.deathAge ?? "Missing data..."}
                                </Col>
                                <Col>
                                    <h5>Head Direction</h5>
                                    {rowData.headDirection ?? "Missing data..."}
                                </Col>
                            </Row>
                            <Row className="mb-5">
                                <Col>
                                    <h5>Textile color</h5>
                                    {rowData.color ?? "Missing data..."}
                                </Col>
                                <Col>
                                    <h5>Textile structure</h5>
                                    {rowData.structure ?? "Missing data..."}
                                </Col>
                                <Col>
                                    <h5>Square North South</h5>
                                    {rowData.squareNorthSouth ?? "Missing data..."}
                                </Col>
                                <Col>
                                    <h5>North South</h5>
                                    {rowData.northSouth ?? "Missing data..."}
                                </Col>
                            </Row>
                            <Row className="mb-5">
                                <Col>
                                    <h5>Square East West</h5>
                                    {rowData.squareEastWest ?? "Missing data..."}
                                </Col>
                                <Col>
                                    <h5>East West</h5>
                                    {rowData.eastWest ?? "Missing data..."}
                                </Col>
                                <Col>
                                    <h5>Area</h5>
                                    {rowData.area ?? "Missing data..."}
                                </Col>
                                <Col>
                                    <h5>Hair Color</h5>
                                    {rowData.hairColor ?? "Missing data..."}
                                </Col>
                            </Row>
                            <Row className="mb-5">
                                <Col>
                                    <h5>Estimate Stature</h5>
                                    {rowData.estimateStature ?? "Missing data..."}
                                </Col>
                                <Col>
                                    <h5>Color</h5>
                                    {rowData.color ?? "Missing data..."}
                                </Col>
                                <Col>
                                    <h5>Structure</h5>
                                    {rowData.structure ?? "Missing data..."}
                                </Col>
                                <Col>
                                    <h5>Sex</h5>
                                    {rowData.sex ?? "Missing data..."}
                                </Col>
                            </Row>


                            {/* add more Card.Text components as needed for additional fields 
             {rowData.Title}
            {rowData.Description}
            {rowData.Year}
            {rowData.Director}*/}
                        </Container>
                        <Button
                            className="btn btn-primary align-right"
                            onClick={handleClosePrivacyPolicy}
                        >
                            Close
                        </Button>

                    </div>
                </div>
            )}
        </>
    );
}

export default BurialPopup;
