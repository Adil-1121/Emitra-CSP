import React, { memo } from 'react';

const ChatInput = memo(({ value, onChange, onKeyDown, onSend, inputRef, disabled }) => (
  <div className="chat-input-wrap">
    <div className="chat-input-inner">
      <textarea
        ref={inputRef}
        className="chat-input"
        placeholder="Type your message… (Enter to send)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        rows={1}
        aria-label="Type your message"
        disabled={disabled}
      />
      <button
        className="chat-input__send"
        onClick={onSend}
        disabled={!value.trim() || disabled}
        aria-label="Send message"
      >
        <svg viewBox="0 0 24 24" fill="none" width="16" height="16" aria-hidden="true">
          <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
            stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
    <p className="chat-input__hint">Enter ↵ to send · Shift+Enter for new line</p>
  </div>
));

ChatInput.displayName = 'ChatInput';
export default ChatInput;
