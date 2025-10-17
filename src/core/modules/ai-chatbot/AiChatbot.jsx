// AiChatbot.jsx
import React, { useState, useEffect, useRef } from "react";
import "./aiChatbot.scss";
import Navbar from "../../components/common-components/navbar/navbar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faSearch,
    faComments,
    faPaperPlane,
    faRobot,
    faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../components/common-components/sidebar/sidebar";
// import avatar from "E:/Emitra-CSP/src/assets/avatar.png";

const sidebarOptions = [
    { label: "New Orders", icon: faComments },
    { label: "Manage Inventory", icon: faComments },
    { label: "Customer Queries", icon: faComments },
    { label: "Payment Reports", icon: faComments },
    { label: "Sales Analytics", icon: faComments },
];

const AiChatbot = () => {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! 👋 How can I assist you today?" },
    ]);
    const [input, setInput] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // sidebar search term
    const messagesEndRef = useRef(null);

    const handleSend = () => {
        if (input.trim() === "") return;

        setMessages((prev) => [...prev, { sender: "user", text: input }]);
        const userMessage = input;
        setInput("");

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: `AI Response to: "${userMessage}"` },
            ]);
        }, 700);
    };

    const handleNewChat = () => {
        setMessages([{ sender: "bot", text: "Hello! 👋 How can I assist you today?" }]);
        setInput("");
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Filtered sidebar options based on search
    const filteredOptions = sidebarOptions.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="ai-chatbot-page">
            {/* Main Chat Section */}
            <div className="main-container">
                <Navbar />
                <div className="chat-container">
                    <Sidebar />
                    <div className="chat-area">
                        <div className="messages">
                            {messages.map((msg, index) => (
                                <div key={index} className={`message ${msg.sender}`}>
                                    <span className="avatar">
                                        {msg.sender === "bot" ? (
                                            <FontAwesomeIcon icon={faRobot} className="bot-icon" />
                                        ) : (
                                            <img
                                                src={faQuestion} alt="User"
                                            />
                                        )}
                                    </span>
                                    <Card className="msg-bubble">{msg.text}</Card>
                                </div>
                            ))}

                            <div ref={messagesEndRef}></div>
                        </div>


                        {/* Input Area */}
                        <div className="input-area">
                            <div className="input-with-icon">
                                <FontAwesomeIcon icon={faSearch} className="input-icon" />
                                <InputText
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your message..."
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                />
                            </div>
                            <Button
                                icon={<FontAwesomeIcon icon={faPaperPlane} />}
                                onClick={handleSend}
                                className="send-btn"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Left Sidebar */}
            <div className="chat-sidebar">
                <h2>GN EMITRA AI</h2>
                <hr />
                <Button
                    label="New Chat"
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    className="new-chat-btn"
                    onClick={handleNewChat} // ✅ new chat click handler
                />

                {/* Sidebar Search */}
                <div className="search-box">
                    <FontAwesomeIcon icon={faSearch} />
                    <InputText
                        placeholder="Search chats..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Recent Chats */}
                <div className="recent-chats">
                    <div className="recent-chats-header">
                        <h4>Recent Chats</h4>
                        <span className="help-icon">
                            <FontAwesomeIcon icon={faQuestion} />
                        </span>
                    </div>

                    <ul>
                        {filteredOptions.map((opt, i) => (
                            <li key={i}>
                                <FontAwesomeIcon icon={opt.icon} /> {opt.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AiChatbot;
