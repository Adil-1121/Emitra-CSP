import React, { memo } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import QuickActions from './QuickActions';

const WelcomeScreen = memo(({ onSelect }) => (
  <div className="chat-welcome">
    <div className="chat-welcome__icon" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
        <circle cx="24" cy="24" r="22" fill="rgba(124,58,237,0.15)" stroke="rgba(124,58,237,0.4)" strokeWidth="1.5" />
        <path d="M14 20h20M14 25h14M14 30h10" stroke="#7C3AED" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="34" cy="14" r="6" fill="#F59E0B" />
        <path d="M32 14h4M34 12v4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
    <h3 className="chat-welcome__title">Namaste! 🙏</h3>
    <p className="chat-welcome__desc">
      I'm your <strong>G.N E-Mitra AI Assistant</strong>. Ask me anything about our services, documents required, working hours, or how to reach us.
    </p>
    <QuickActions onSelect={onSelect} />
  </div>
));

WelcomeScreen.displayName = 'WelcomeScreen';

const FollowUps = memo(({ suggestions, onSelect }) => {
  if (!suggestions?.length) return null;
  return (
    <div className="chat-followups" role="group" aria-label="Suggested follow-up questions">
      {suggestions.map((s, i) => (
        <button
          key={i}
          className="chat-followups__chip"
          onClick={() => onSelect(s)}
          style={{ animationDelay: `${i * 0.08}s` }}
        >
          {s}
        </button>
      ))}
    </div>
  );
});

FollowUps.displayName = 'FollowUps';

const ChatMessages = memo(({ messages, isTyping, followUps, bottomRef, onCopy, onFollowUp, onRetry }) => (
  <div className="chat-messages" role="list" aria-live="polite" aria-label="Chat messages">
    {messages.length === 0 ? (
      <WelcomeScreen onSelect={onFollowUp} />
    ) : (
      <>
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            msg={msg}
            onCopy={onCopy}
            onRetry={msg.isError ? onRetry : undefined}
          />
        ))}
        {isTyping && <TypingIndicator />}
        {!isTyping && followUps.length > 0 && (
          <FollowUps suggestions={followUps} onSelect={onFollowUp} />
        )}
      </>
    )}
    <div ref={bottomRef} />
  </div>
));

ChatMessages.displayName = 'ChatMessages';
export default ChatMessages;
