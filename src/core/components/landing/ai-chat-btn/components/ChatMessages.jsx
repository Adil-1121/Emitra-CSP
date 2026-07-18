import React, { memo } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import QuickActions from './QuickActions';

const WelcomeScreen = memo(({ onSelect }) => (
  <div className="chat-welcome">
    <div className="chat-welcome__icon" aria-hidden="true">
      <img src="/favicon.ico" alt="AI" width="70" height="70" style={{ borderRadius: '50%' }} />
    </div>
    <h3 className="chat-welcome__title">Welcome! 👋</h3>
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
