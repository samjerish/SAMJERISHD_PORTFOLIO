import React, { useState } from 'react';
import './MailboxGraphic.css';

export const MailboxGraphic: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mailbox-graphic-container">
      <div className={`mailbox ${isOpen ? 'is-open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <div className="mailbox-post"></div>
        <div className="mailbox-body">
          
          <div className="mailbox-nameplate">
            SAM JERISH D
          </div>

          <div className="mailbox-door">
            <div className="mailbox-door-front">
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
      <div className="mailbox-hint">
        {isOpen ? "Click to close" : "Click to open"}
      </div>
    </div>
  );
};

