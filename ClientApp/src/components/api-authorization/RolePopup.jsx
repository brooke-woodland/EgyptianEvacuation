import React, { useState } from 'react';
import { Button, Col, Row, Container } from 'react-bootstrap';
import './role.css';

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
                {rowData.userName}
            </button>
            {showBurial && (

                <div className="privacy-policy">
                    <div className="privacy-policy-content">
                        <Container className="burial-popup-scale">
                            <Row>
                                <h1>Id: {rowData.id}</h1>
                            </Row>
                            <Row className="mb-5">
                                <Col>
                                    <h5>Burial Number</h5>
                                    {rowData.userName ?? "Missing data..."}
                                </Col>
                                <Col>
                                    <h5>Depth</h5>
                                    {rowData.RoleName ?? "Missing data..."}
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
