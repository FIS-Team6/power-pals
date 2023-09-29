'use client'
import { useChat } from "ai/react";
import React, { useState, useEffect} from "react";

export default function Chat() {
    const { messages, input, setInput, handleInputChange, handleSubmit } = useChat({
        api: "/api/chat",
    });

    const [wordSettings, setWordSettings] = useState({
        grade: 3,
        count: 30,
        subject: "animals",
    });

    const spellingDataType =
        "Provide response as an array of javascript objects. include these keys with corresponding values: letters in word, word, definition, sentence, partOfSpeech, syllables, phonetics, phoneticsAudio, phoneticsAudioSlow,  ";

    const [prompt, setPrompt] = useState("");

    useEffect(() => {
        const preparePrompt = (wordSettings) => {
            const grade = wordSettings.grade;
            const count = wordSettings.count;
            const subject = wordSettings.subject;
            const newPrompt = `Provide ${count} spelling words for grade level: ${grade} with the theme of ${subject}. ${spellingDataType}`;
            setPrompt(newPrompt);
            setInput(newPrompt);
        };

        preparePrompt(wordSettings)

    }, []);

    // setInput("2+2")
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
                    <input placeholder={input} value={input} onChange={handleInputChange} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}
