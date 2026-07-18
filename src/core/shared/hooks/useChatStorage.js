// ── useChatStorage — Session-only storage (clears on refresh) ────────────────
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'gn_emitra_chat_history';
const MAX_STORED = 50;

export function useChatStorage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED)));
    } catch {
      // storage full — ignore
    }
  }, [messages]);

  const clearHistory = () => {
    setMessages([]);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return { messages, setMessages, clearHistory };
}
