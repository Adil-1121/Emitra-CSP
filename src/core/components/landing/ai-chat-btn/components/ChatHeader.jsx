import React, { memo } from 'react';

const ChatHeader = memo(({ onClose, expanded, onToggleSize }) => (
  <div className="chat-header" role="banner">
    <div className="chat-header__left">
      <div className="chat-header__avatar" aria-hidden="true">
        <img src="/favicon.ico" alt="AI" width="36" height="36" style={{ borderRadius: '50%' }} />
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
        onClick={onToggleSize}
        aria-label={expanded ? 'Minimize chat size' : 'Maximize chat size'}
        title={expanded ? 'Minimize' : 'Maximize'}
      >
        {expanded ? (
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
            <path d="M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
            <path d="M4 14h6v6M20 10h-6V4M14 10l6-6M4 20l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <button
        className="chat-header__btn chat-header__btn--close"
        onClick={onClose}
        aria-label="Close chat"
        title="Close"
      >
        <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  </div>
));

ChatHeader.displayName = 'ChatHeader';
export default ChatHeader;
