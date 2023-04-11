import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './burial.css';

function BurialPopup(props) {
  const [showBurial, setShowBurial] = useState(false);

  function handleShowPrivacyPolicy() {
    setShowBurial(true);
  }

  function handleClosePrivacyPolicy() {
    setShowBurial(false);
  }

  return (
    <>
      <Button className="btn btn-link" onClick={handleShowPrivacyPolicy}>
        Privacy Policy
      </Button>
      {showBurial && (
        <div className="privacy-policy">
          <div className="privacy-policy-content">
            <h1>Privacy Policy</h1>
            <p>This is your privacy policy content.</p>
            <Button className="btn btn-link" onClick={handleClosePrivacyPolicy}>
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default BurialPopup;
