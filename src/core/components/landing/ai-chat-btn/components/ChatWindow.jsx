import React, { useEffect, memo } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const ChatWindow = memo(({ chatHook, onClose }) => {
  const {
    messages, input, setInput, isTyping, followUps,
    bottomRef, inputRef, sendMessage, handleKey,
    handleFollowUp, copyMessage, clearHistory, retryLast,
  } = chatHook;

  // Focus input when window opens
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [inputRef]);

  return (
    <div
      className="chat-window"
      role="dialog"
      aria-label="G.N E-Mitra AI Assistant"
      aria-modal="true"
    >
      <ChatHeader onClose={onClose} onClear={clearHistory} />

      <ChatMessages
        messages={messages}
        isTyping={isTyping}
        followUps={followUps}
        bottomRef={bottomRef}
        onCopy={copyMessage}
        onFollowUp={handleFollowUp}
        onRetry={retryLast}
      />

      <ChatInput
        value={input}
        onChange={setInput}
        onKeyDown={handleKey}
        onSend={sendMessage}
        inputRef={inputRef}
        disabled={isTyping}
      />
    </div>
  );
});

ChatWindow.displayName = 'ChatWindow';
export default ChatWindow;
