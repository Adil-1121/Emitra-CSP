import React, { useState, memo } from 'react';

// ── Inline markdown: bold, italic, inline-code ────────────────────────────────
function renderInline(text, key) {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*'))
      return <em key={i}>{part.slice(1, -1)}</em>;
    if (part.startsWith('`') && part.endsWith('`'))
      return <code key={i} className="chat-msg__code">{part.slice(1, -1)}</code>;
    return part;
  });
}

// ── Block markdown renderer ───────────────────────────────────────────────────
function renderMarkdown(text) {
  const lines = text.split('\n');
  const elements = [];
  let listItems = [];
  let orderedItems = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length) {
      elements.push(
        <ul key={key++} className="chat-msg__list">
          {listItems.map((item, i) => <li key={i}>{renderInline(item)}</li>)}
        </ul>
      );
      listItems = [];
    }
    if (orderedItems.length) {
      elements.push(
        <ol key={key++} className="chat-msg__list chat-msg__list--ordered">
          {orderedItems.map((item, i) => <li key={i}>{renderInline(item)}</li>)}
        </ol>
      );
      orderedItems = [];
    }
  };

  lines.forEach((line) => {
    // Heading ## or ###
    if (/^###\s+/.test(line)) {
      flushList();
      elements.push(<p key={key++} className="chat-msg__h3">{renderInline(line.replace(/^###\s+/, ''))}</p>);
    } else if (/^##\s+/.test(line)) {
      flushList();
      elements.push(<p key={key++} className="chat-msg__h2">{renderInline(line.replace(/^##\s+/, ''))}</p>);
    }
    // Bullet: - or *
    else if (/^[-*]\s+/.test(line)) {
      if (orderedItems.length) flushList();
      listItems.push(line.replace(/^[-*]\s+/, ''));
    }
    // Numbered: 1. 2. etc
    else if (/^\d+\.\s+/.test(line)) {
      if (listItems.length) flushList();
      orderedItems.push(line.replace(/^\d+\.\s+/, ''));
    }
    // Horizontal rule
    else if (/^---+$/.test(line.trim())) {
      flushList();
      elements.push(<hr key={key++} className="chat-msg__hr" />);
    }
    // Empty line → spacing
    else if (line.trim() === '') {
      flushList();
      elements.push(<div key={key++} className="chat-msg__spacer" />);
    }
    // Normal paragraph
    else {
      flushList();
      elements.push(<p key={key++} className="chat-msg__p">{renderInline(line)}</p>);
    }
  });

  flushList();
  return elements;
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
          <img src="/favicon.ico" alt="AI" width="28" height="28" style={{ borderRadius: '50%' }} />
        </div>
      )}

      <div className="chat-msg__content">
        <div className="chat-msg__bubble">
          <div className="chat-msg__text">
            {isBot ? renderMarkdown(msg.text) : <p className="chat-msg__p">{msg.text}</p>}
          </div>
        </div>

        <div className="chat-msg__meta">
          <span className="chat-msg__time">{formatTime(msg.timestamp)}</span>
          {isBot && !msg.isError && (
            <button className="chat-msg__copy" onClick={handleCopy} aria-label="Copy message" title="Copy">
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
            <button className="chat-msg__retry" onClick={onRetry} aria-label="Retry">
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
