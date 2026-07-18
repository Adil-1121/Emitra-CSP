import React, { useState, memo } from 'react';

// Minimal markdown renderer — bold (**text**), newlines, bullet points
function renderText(text) {
  return text.split('\n').map((line, i) => {
    // Bold: **text**
    const parts = line.split(/\*\*(.*?)\*\*/g);
    const rendered = parts.map((part, j) =>
      j % 2 === 1 ? <strong key={j}>{part}</strong> : part
    );
    return (
      <span key={i} className="chat-msg__line">
        {rendered}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    );
  });
}

function formatTime(iso) {
  try {
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

const MessageBubble = memo(({ msg, onCopy, onRetry }) => {
  const [copied, setCopied] = useState(false);
  const isBot = msg.sender === 'bot';

  const handleCopy = () => {
    onCopy(msg.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`chat-msg chat-msg--${msg.sender}${msg.isError ? ' chat-msg--error' : ''}`}
      role="listitem"
    >
      {isBot && (
        <div className="chat-msg__avatar" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
            <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.2)" />
            <path d="M8 10h8M8 13h5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      )}

      <div className="chat-msg__content">
        <div className="chat-msg__bubble">
          <p className="chat-msg__text">{renderText(msg.text)}</p>
        </div>

        <div className="chat-msg__meta">
          <span className="chat-msg__time">{formatTime(msg.timestamp)}</span>
          {isBot && !msg.isError && (
            <button
              className="chat-msg__copy"
              onClick={handleCopy}
              aria-label="Copy message"
              title="Copy"
            >
              {copied ? (
                <svg viewBox="0 0 24 24" fill="none" width="11" height="11">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" width="11" height="11">
                  <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              )}
            </button>
          )}
          {isBot && msg.isError && onRetry && (
            <button
              className="chat-msg__retry"
              onClick={onRetry}
              aria-label="Retry"
              title="Retry"
            >
              <svg viewBox="0 0 24 24" fill="none" width="11" height="11">
                <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

MessageBubble.displayName = 'MessageBubble';
export default MessageBubble;
