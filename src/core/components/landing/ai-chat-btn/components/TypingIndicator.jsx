import React from 'react';

const TypingIndicator = () => (
  <div className="chat-typing" aria-label="AI is typing" role="status">
    <div className="chat-typing__avatar" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
        <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.2)" />
        <path d="M8 10h8M8 13h5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
    <div className="chat-typing__bubble">
      <span /><span /><span />
    </div>
  </div>
);

export default TypingIndicator;
