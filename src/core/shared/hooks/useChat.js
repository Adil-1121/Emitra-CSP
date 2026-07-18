// ── useChat — Main chat orchestration hook ───────────────────────────────────
import { useState, useRef, useEffect, useCallback } from 'react';
import { getResponse } from '../../../services/ai/chatEngine';
import { useChatStorage } from './useChatStorage';

export function useChat() {
  const { messages, setMessages, clearHistory } = useChatStorage();
  const [input, setInput]         = useState('');
  const [isTyping, setIsTyping]   = useState(false);
  const [followUps, setFollowUps] = useState([]);
  const [error, setError]         = useState(null);
  const bottomRef                 = useRef(null);
  const inputRef                  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const _fetchResponse = useCallback(async (userMessage, historySnapshot) => {
    try {
      const { text: botText, followUps: suggestions } = await getResponse(
        userMessage,
        historySnapshot
      );
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botText,
          timestamp: new Date().toISOString(),
        },
      ]);
      setFollowUps(suggestions || []);
    } catch (err) {
      const errorText = err?.userFacing
        ? err.message
        : '❌ Something went wrong. Please try again or call us at +91 98765 43210.';
      setError(errorText);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: errorText,
          timestamp: new Date().toISOString(),
          isError: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [setMessages]);

  const sendMessage = useCallback(async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || isTyping) return;

    setError(null);
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setFollowUps([]);
    _fetchResponse(trimmed, messages);
  }, [input, isTyping, messages, _fetchResponse, setMessages]);

  const handleKey = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

  const handleFollowUp = useCallback((text) => {
    sendMessage(text);
  }, [sendMessage]);

  const copyMessage = useCallback((text) => {
    navigator.clipboard?.writeText(text).catch(() => {});
  }, []);

  const retryLast = useCallback(() => {
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === 'user');
    if (!lastUserMsg || isTyping) return;

    setMessages((prev) => {
      const lastBot = [...prev].reverse().find((m) => m.sender === 'bot' && m.isError);
      if (lastBot) return prev.filter((m) => m.id !== lastBot.id);
      return prev;
    });

    setError(null);
    setIsTyping(true);
    setFollowUps([]);

    const historyWithoutLastError = messages.filter(
      (m) => !(m.sender === 'bot' && m.isError)
    );
    _fetchResponse(lastUserMsg.text, historyWithoutLastError.slice(0, -1));
  }, [messages, isTyping, _fetchResponse, setMessages]);

  return {
    messages,
    input,
    setInput,
    isTyping,
    followUps,
    error,
    bottomRef,
    inputRef,
    sendMessage,
    handleKey,
    handleFollowUp,
    copyMessage,
    clearHistory,
    retryLast,
  };
}
