import React, { useState, useEffect, useRef } from 'react';
import '../../App.css';
import './ChatBox.css';

export default function Chatbox() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [userName, setUserName] = useState('');
    const [isNameSet, setIsNameSet] = useState(false);
    const socketRef = useRef(null);
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null); // Reference for the end of messages

    // WebSocket connection and message handling
    useEffect(() => {
        socketRef.current = new WebSocket('ws://localhost:8080'); // Change port if needed

        socketRef.current.onopen = () => {
            console.log('Connected to WebSocket');
            setIsConnected(true);
        };

        socketRef.current.onmessage = (event) => {
            console.log('Message received:', event.data);
            try {
                const message = JSON.parse(event.data);
                setMessages((prevMessages) => [...prevMessages, message]);
            } catch (error) {
                console.error('Failed to parse message:', error);
            }
        };

        socketRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socketRef.current.onclose = () => {
            console.log('WebSocket closed');
            setIsConnected(false);
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    // Effect to scroll to the last message
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (inputMessage.trim() && isConnected && isNameSet) {
            const newMessage = {
                content: inputMessage,
                sender: userName,
                avatar: `https://via.placeholder.com/30?text=${userName.charAt(0)}`, // Placeholder avatar
            };
            socketRef.current.send(JSON.stringify(newMessage));
            console.log('Sent message:', newMessage);
            setInputMessage('');
            inputRef.current.focus();
        } else {
            console.warn('Message is empty or user name is not set.');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleSetName = () => {
        if (userName.trim()) {
            setIsNameSet(true);
            const welcomeMessage = {
                content: `${userName} has joined the chat!`,
                sender: 'System',
                avatar: 'https://via.placeholder.com/30?text=S', // System avatar
            };
            setMessages((prevMessages) => [...prevMessages, welcomeMessage]);
            console.log('User name set:', userName);
        }
    };

    return (
        <body >
        <div className='background2'>
            <div className='chatbox'>
                {!isNameSet ? (
                    <div className='nameInput'>
                        <h2>Enter your name:</h2>
                        <input
                            type='text'
                            className='inputBox'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Your name..."
                        />
                        <button className='button' onClick={handleSetName}>
                            Set Name
                        </button>
                    </div>
                ) : (
                    <>
                        <h1 className='welcomeMessage'>Welcome to the chat, {userName}!</h1>
                        <div className='layout'>
                            <div className="messages">
                                {messages.map((msg, index) => (
                                    <div key={index} className="message">
                                        <img src={msg.avatar} alt={msg.sender} className="avatar" />
                                        <span className="sender">{msg.sender}: </span>
                                        <span className="content">{msg.content}</span>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} /> {/* This div helps in scrolling */}
                            </div>
                        </div>
                        <div className='inputContainer'>
                            <input
                                type='text'
                                className='inputBox'
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Type your message..."
                                ref={inputRef}
                                onKeyPress={handleKeyPress} // Trigger send on Enter key
                            />
                            <button
                                className='button'
                                onClick={handleSendMessage}
                                disabled={!isConnected}
                            >
                                Send
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
        </body>
    );
}
