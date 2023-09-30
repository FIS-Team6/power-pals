'use client'
import { useChat } from "ai/react";
import React, { useState, useEffect} from "react";

export default function Chat() {
    const { messages, input, setInput, handleInputChange, handleSubmit } = useChat({
        api: "/api/chat",
    });
    
    const [prompt, setPrompt] = useState("1+1");

//** This section is for the spelling version, keeping for later */
    // const [wordSettings, setWordSettings] = useState({
    //     grade: 3,
    //     count: 5,
    //     subject: "animals",
    // });
    
    // useEffect(() => {
    //     const preparePrompt = (wordSettings) => {
    //         const grade = wordSettings.grade;
    //         const count = wordSettings.count;
    //         const subject = wordSettings.subject;
    //         const newPrompt = `Provide ${count} spelling words for grade level: ${grade} with the theme of ${subject}. ${spellingDataType}`;
    //         setPrompt(newPrompt);
    //         setInput(newPrompt);
    //         console.log(input)
    //     };

    //     preparePrompt(wordSettings)

    // }, []);

   

//** This section is for research paper planner */

const mockPastedData = "Write a 2 page paper on the importance of water in your diet. site 2 sources."
const promptPrimer = "Provide response as an array of javascript objects, NOt json.  "

const [settings, setSettings] = useState({});
const [lastSystemMsg, setLastSystemMsg] = useState({});




    const [trackerData, setTrackerData] = useState([])

    const spellingDataType =
        "Provide response as an array of javascript objects, NOt json. include these keys with corresponding values: letters in word, word, definition, sentence, partOfSpeech, syllables, phonetics, phoneticsAudio, phoneticsAudioSlow,  ";



    useEffect(() => {
        try {
            const systemMsg = messages?.filter(message => message?.role === "system")
            const lastMsg = systemMsg[systemMsg.length - 1]
            setLastSystemMsg(lastMsg)
            
        } catch(e) {
            console.error(e)
        }
        console.log(lastSystemMsg)
    }, [messages]);

    // setInput("2+2")
    return (
        <div>
            {/**Maps Message history, may be good for a log bot nut for what we need. */}
            <ul>
                {messages.map((m, index) => (
                    <li key={index}>
                        {m.role === "user" ? "User: " : "AI: "}
                        {m.content}
                    </li>
                ))}
            </ul>
            <ul>
    {messages
        .filter((m) => m.role === "system")
        .slice(-3)
        .map((m, index) => (
            <li key={index}>
                System: {m.content}
            </li>
        ))
    }
</ul>


            <form onSubmit={handleSubmit}>

                    <input className='hidden' placeholder={input} value={input} onChange={handleInputChange} />
                <button className="bg-yellow-500 border-2 text-red-500 w-md"  type="submit">Send</button>
            </form>
        </div>
    );
}
