import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
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
        {rowData.Title}
      </button>
      {showBurial && (
        <div className="privacy-policy">
          <div className="privacy-policy-content">
            <h1>{rowData.Id}</h1>

            {rowData.Title}
            {rowData.Description}
            {rowData.Year}
            {rowData.Director}
            {/* add more Card.Text components as needed for additional fields */}

            <Button
              className="btn btn-primary"
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
