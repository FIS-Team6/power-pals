'use client'
import { useChat } from "ai/react";
import React, { useState} from "react";

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: "/api/chat",
    });

    return (
        <div>
            <ul>
                {messages.map((m, index) => (
                    <li key={index}>
                        {m.role === "user" ? "User: " : "AI: "}
                        {m.content}
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <label>
                    Say something...
                </label>
                    <input value={input} onChange={handleInputChange} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}