import React, { useState, useCallback, lazy, Suspense } from 'react';
import { useChat } from '../../../shared/hooks/useChat';
import './AiChatBtn.scss';

// Lazy-load the heavy chat window — zero impact on page load
const ChatWindow = lazy(() => import('./components/ChatWindow'));

const AiChatBtn = () => {
  const [open, setOpen] = useState(false);
  const chatHook = useChat();

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const hasMessages = chatHook.messages.length > 0;

  return (
    <>
      {/* ── Premium Floating Trigger ── */}
      {!open && <div className="ai-fab" aria-label="Open AI Assistant">
        <span className="ai-fab__label" aria-hidden="true">
          Ask AI Assistant
        </span>

        <button
          className={`ai-fab__btn ${open ? 'ai-fab__btn--open' : ''}`}
          onClick={open ? handleClose : handleOpen}
          aria-label={open ? 'Close AI Assistant' : 'Open AI Assistant'}
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          {/* Rotating gradient ring */}
          <span className="ai-fab__ring" aria-hidden="true" />
          {/* Pulse glow */}
          <span className="ai-fab__pulse" aria-hidden="true" />

          {/* Icon — chat when closed, X when open */}
          <span className="ai-fab__icon" aria-hidden="true">
            {open ? (
              <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                  fill="rgba(255,255,255,0.15)" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
                <circle cx="9" cy="10" r="1.2" fill="#fff" />
                <circle cx="12" cy="10" r="1.2" fill="#fff" />
                <circle cx="15" cy="10" r="1.2" fill="#fff" />
              </svg>
            )}
          </span>

          {/* Notification dot — shown when there are messages */}
          {hasMessages && !open && (
            <span className="ai-fab__badge" aria-label="Chat history available" />
          )}
        </button>
      </div>}

      {/* ── Chat Window ── */}
      {open && (
        <Suspense fallback={null}>
          <ChatWindow chatHook={chatHook} onClose={handleClose} />
        </Suspense>
      )}
    </>
  );
};

export default AiChatBtn;
