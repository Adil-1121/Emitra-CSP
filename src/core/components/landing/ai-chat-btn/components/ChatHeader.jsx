import React, { memo } from 'react';

const ChatHeader = memo(({ onClose, onClear }) => (
  <div className="chat-header" role="banner">
    <div className="chat-header__left">
      <div className="chat-header__avatar" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
          <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.15)" />
          <path d="M8 10h8M8 13h5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          <circle cx="17" cy="7" r="3" fill="#F59E0B" />
        </svg>
        <span className="chat-header__online-dot" aria-hidden="true" />
      </div>
      <div className="chat-header__info">
        <span className="chat-header__name">G.N E-Mitra Assistant</span>
        <span className="chat-header__status">
          <span className="chat-header__pulse" aria-hidden="true" />
          Online Now
        </span>
      </div>
    </div>

    <div className="chat-header__actions">
      <button
        className="chat-header__btn"
        onClick={onClear}
        aria-label="Clear conversation"
        title="Clear chat"
      >
        <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        className="chat-header__btn chat-header__btn--close"
        onClick={onClose}
        aria-label="Close chat"
        title="Close"
      >
        <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  </div>
));

ChatHeader.displayName = 'ChatHeader';
export default ChatHeader;
