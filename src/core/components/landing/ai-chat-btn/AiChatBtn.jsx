import React, { useState, useRef, useEffect } from 'react';
import './AiChatBtn.scss';

const INITIAL_MESSAGES = [
  { id: 1, sender: 'user', text: 'How can I apply for a birth certificate?' },
  {
    id: 2,
    sender: 'bot',
    text: "To apply for a birth certificate, you need to provide the following documents: Hospital Discharge Summary, Parent's Aadhaar Card, and Address Proof. You can start the application process here or visit your nearest E-Mitra center. Would you like assistance with the online form?",
  },
];

const BOT_RESPONSES = {
  default:
    'I can help you with Aadhaar updates, PAN card services, bill payments, government schemes, and more. Please describe your query.',
  aadhaar:
    'For Aadhaar updates, visit our center with your existing Aadhaar and supporting documents. Biometric verification will be done on-site.',
  pan:
    'For a new PAN card, bring your Aadhaar, passport photo, and address proof. We assist with the complete online application.',
  bill:
    'You can pay electricity, water, and other utility bills instantly at our center using government-approved payment gateways.',
  certificate:
    "To apply for a birth certificate, you need: Hospital Discharge Summary, Parent's Aadhaar Card, and Address Proof. Visit our nearest E-Mitra center.",
};

const getBotReply = (text) => {
  const t = text.toLowerCase();
  if (t.includes('aadhaar') || t.includes('aadhar')) return BOT_RESPONSES.aadhaar;
  if (t.includes('pan')) return BOT_RESPONSES.pan;
  if (t.includes('bill') || t.includes('electricity')) return BOT_RESPONSES.bill;
  if (t.includes('certificate') || t.includes('birth') || t.includes('death')) return BOT_RESPONSES.certificate;
  return BOT_RESPONSES.default;
};

const AiChatBtn = () => {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput]       = useState('');
  const [typing, setTyping]     = useState(false);
  const bottomRef               = useRef(null);
  const inputRef                = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: getBotReply(text) },
      ]);
    }, 900);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      {/* ── Floating trigger button ── */}
      <div className="ai-chat-btn__wrap">
        {!open && (
          <span className="ai-chat-btn__label">Ask AI Assistant</span>
        )}
        <button
          className="ai-chat-btn"
          onClick={() => setOpen((o) => !o)}
          aria-label="Open AI Assistant"
          aria-expanded={open}
        >
          <svg viewBox="0 0 40 40" fill="none" width="26" height="26" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
            <path d="M13 16h14M13 20h10M13 24h7" stroke="#fff" strokeWidth="2"
              strokeLinecap="round" />
            <circle cx="28" cy="12" r="5" fill="#fff" fillOpacity="0.15" />
            <text x="25.5" y="15.5" fontSize="7" fill="#fff" fontWeight="bold">AI</text>
          </svg>
        </button>
      </div>

      {/* ── Chat window ── */}
      {open && (
        <div className="ai-chat-window" role="dialog" aria-label="AI Assistant chat">

          {/* Header */}
          <div className="ai-chat-window__header">
            <div className="ai-chat-window__header-left">
              <div className="ai-chat-window__avatar" aria-hidden="true">
                <svg viewBox="0 0 40 40" fill="none" width="22" height="22">
                  <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                  <path d="M12 18h16M12 22h12M12 26h8" stroke="#fff" strokeWidth="2"
                    strokeLinecap="round" />
                  <circle cx="28" cy="12" r="5" fill="rgba(255,255,255,0.2)" />
                  <text x="25.5" y="15.5" fontSize="7" fill="#fff" fontWeight="bold">AI</text>
                </svg>
              </div>
              <span className="ai-chat-window__title">AI Assistant</span>
            </div>
            <button
              className="ai-chat-window__close"
              onClick={() => setOpen(false)}
              aria-label="Close AI Assistant"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="ai-chat-window__messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`ai-chat-msg ai-chat-msg--${msg.sender}`}
              >
                <p>{msg.text}</p>
              </div>
            ))}

            {typing && (
              <div className="ai-chat-msg ai-chat-msg--bot ai-chat-msg--typing">
                <span /><span /><span />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="ai-chat-window__input-wrap">
            <input
              ref={inputRef}
              className="ai-chat-window__input"
              type="text"
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              aria-label="Type your message"
            />
            <button
              className="ai-chat-window__send"
              onClick={sendMessage}
              aria-label="Send message"
              disabled={!input.trim()}
            >
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                  stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

        </div>
      )}
    </>
  );
};

export default AiChatBtn;
