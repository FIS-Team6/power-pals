"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const fetchReply = async ({ apiKey, messages }) => {
    try {
        const result = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                prompt: messages,
                max_tokens: 100,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );
        return result.data.choices[0].text.trim();
    } catch (error) {
        console.error("Failed to fetch reply:", error);
        throw error;
    }
};

export default function AITest() {
    const [text, setText] = useState("");
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (loading) {
            (async () => {
                try {
                    const assistantMessage = await fetchReply({
                        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
                        messages: conversation,
                    });

                    setConversation((prevConversation) => [
                        ...prevConversation,
                        { role: "assistant", content: assistantMessage },
                    ]);
                    setLoading(false);
                } catch (err) {
                    setError(err);
                    setLoading(false);
                }
            })();
        }
    }, [loading]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userMessage = { role: "user", content: text };
        setConversation([...conversation, userMessage]);
        setLoading(true);
        setText("");
    };

    return (
        <div>
            <h1>Chat with Assistant</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    Send
                </button>
            </form>
            <div>
                {error && <p>Error: {error.message}</p>}
                {conversation.map((message, idx) => (
                    <div key={idx}>
                        <strong>{message.role}:</strong> {message.content}
                    </div>
                ))}
            </div>
        </div>
    );
}
