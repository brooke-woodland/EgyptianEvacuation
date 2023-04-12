import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import '../css/PrivacyPolicy.css';

function PrivacyPolicy() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  function handleShowPrivacyPolicy() {
    setShowPrivacyPolicy(true);
  }

  function handleClosePrivacyPolicy() {
    setShowPrivacyPolicy(false);
  }

  return (
    <>
      <Button className="btn btn-primary" onClick={handleShowPrivacyPolicy}>
        Privacy Policy
      </Button>
      {showPrivacyPolicy && (
        <div className="privacy-policy">
          <div className="privacy-policy-content">
            <h1>Privacy Policy</h1>
            <p>This is your privacy policy content.</p>
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

export default PrivacyPolicy;
