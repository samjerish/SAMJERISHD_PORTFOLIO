import React, { useState, useEffect } from 'react';
import './MailboxGraphic.css';

interface MailboxGraphicProps {
  isDelivering?: boolean;
}

export const MailboxGraphic: React.FC<MailboxGraphicProps> = ({ isDelivering = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isDelivering) {
      setIsOpen(false); // Ensure it starts closed
    }
  }, [isDelivering]);

  return (
    <div className={`mailbox-graphic-container ${isDelivering ? 'is-delivering' : ''}`}>
      
      <div className={`mailbox ${isOpen ? 'is-open' : ''}`} onClick={() => !isDelivering && setIsOpen(!isOpen)}>
        <div className="mailbox-post"></div>
        <div className="mailbox-body">
          
          <div className="mailbox-door">
            <div className="mailbox-door-front">
              <div className="mailbox-nameplate">
                SAM JERISH D
              </div>
              <div className="mailbox-slot"></div>
              <div className="mailbox-handle"></div>
            </div>
          </div>
          <div className="mailbox-flag"></div>
          
          {/* Inner content visible when open */}
          <div className="mailbox-inside">
            <div className="letter">
              <div className="letter-lines"></div>
            </div>
          </div>

        </div>
        <div className="mailbox-shadow"></div>
      </div>

      {/* Postman Delivery Character */}
      <div className="postman-character">
        <div className="postman-body">
          <div className="postman-head"></div>
          <div className="postman-arm">
             <div className="delivery-letter"></div>
          </div>
        </div>
      </div>

      <div className="mailbox-hint">
        {isDelivering ? "Delivery in progress..." : (isOpen ? "Click to close" : "Click to open")}
      </div>
    </div>
  );
};

