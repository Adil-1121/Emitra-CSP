import React, { useState, useRef, useEffect } from "react";
import "./chatbot.scss";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faTimes, faPaperPlane, faSearch, faUser, faRobot } from "@fortawesome/free-solid-svg-icons";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ from: "bot", text: "Hi! How can I help you today?" }]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { from: "user", text: input }]);
        setInput("");
        setTimeout(() => {
            setMessages(prev => [...prev, { from: "bot", text: "This is a placeholder response." }]);
        }, 500);
    };

    const handleKeyPress = e => {
        if (e.key === "Enter") handleSend();
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="chatbot-fixed-container">
            {!isOpen && (
                <>
                    <Tooltip target=".chatbot-toggle" content="Open Chatbot" position="top" />
                    <button className="chatbot-toggle" onClick={toggleChat}>
                        <FontAwesomeIcon icon={faCommentDots} />
                    </button>
                </>
            )}

            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <span>GN E-Mitra AI Assistant</span>
                        <Tooltip target=".chatbot-close" content="Close" position="left" />
                        <button className="chatbot-close" onClick={toggleChat}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`chatbot-message-wrapper ${msg.from}`}>
                                <div className="chatbot-avatar">
                                    <FontAwesomeIcon icon={msg.from === "user" ? faUser : faRobot} />
                                </div>
                                <div className={`chatbot-message ${msg.from}`}>{msg.text}</div>
                            </div>
                        ))}
                        <div ref={messagesEndRef}></div>
                    </div>

                    <div className="chatbot-input-area">
                        <div className="chatbot-input-wrapper">
                            <FontAwesomeIcon icon={faSearch} className="input-icon" />
                            <InputText
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Ask me anything..."
                            />
                        </div>
                        <button className="chatbot-send" onClick={handleSend}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
