// ── useChatStorage — LocalStorage persistence hook ───────────────────────────
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'gn_emitra_chat_history';
const MAX_STORED = 50; // keep last 50 messages

export function useChatStorage() {
  const [messages, setMessages] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      const toStore = messages.slice(-MAX_STORED);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    } catch {
      // storage full — ignore
    }
  }, [messages]);

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { messages, setMessages, clearHistory };
}
