"use client";
import { useChat } from "ai/react";
import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { createNewAssignment } from "../../server/firebase-functions";

export default function Chat({
    aiDataForFirestore, 
    setAiDataForFirestore,
    taskFormData,
    setTaskFormData,
}) {


    const {
        messages,
        input,
        setInput,
        handleInputChange,
        handleSubmit,
        onResponse,
        isLoading,
    } = useChat({
        api: "/api/chat",
    });

    const { currentUser } = useUser();

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

    const mockFormData = {
        uid: currentUser?.id,
        name: "final paper",
        type: "paper",
        startDate: "10/15/2023",
        dueDate: "10/31/2023",
        assignment:
            "Write a 2 page paper on the importance of water in your diet. site 2 sources.",
        numTasks: 3,
        subtasksMin: 2,
        subtasksMax: 4,
    };

    const constructPromptSentence = (formData) => {
        try {
            const sentenceParts = Object.entries(formData).map(
                ([key, value]) => {
                    // Create a default string for this key-value pair
                    return `${key}: ${value}`;
                }
            );

            return sentenceParts.join(". ") + ".";
        } catch (error) {
            console.error(`Error constructing prompt: ${error}`);
            return "";
        }
    };

    const promptSentence = constructPromptSentence(mockFormData);
    // console.log(promptSentence);

    const promptPrimer = `
Response must not be in json format, not stringified,
response must be an array of javascript objects. 
this is the assignment: ${mockFormData.assignment}.
I'm starting this assignment on ${mockFormData.startDate}. 
the assignment is due on ${mockFormData.dueDate} and i intend to complete everything the day before
based on the due date, divide the assignment into ${mockFormData.numTasks} tasks. 
tasks must be javascript objects, not json, not stringified the following keys: name, description, subTasks, and dueDate
name is the name of the task
Each task must contain between ${mockFormData.subtasksMin} and ${mockFormData.subtasksMax} subTasks 
The subtask is an array javascript objects nested under the task
each subtask must contain the following keys: name, description and dueDate
The subtasks will be saved as an array of objects under under each task 
description should describe the task or subTask it is under and maximum 1 - 2 sentences long.
response should NOt be in json format,not stringified
Please generate the JSON in a single line without any newline characters.

`;

    const [prompt, setPrompt] = useState(promptPrimer);
    const [settings, setSettings] = useState({});
    const [lastSystemMsg, setLastSystemMsg] = useState({});
    const [aiTaskArray, setAiTaskArray] = useState([]);

    useEffect(() => {
        const preparePrompt = () => {
            setPrompt(promptPrimer); // Set the local state
            setInput(promptPrimer); // Set the input state of useChat
            setTaskFormData(mockFormData); // Eventually this will be collected from form
            console.log();
        };

        preparePrompt();
    }, [promptPrimer]);

    // Filter out messages by the assistant role
    const assistantMessages = messages.filter(
        (message) => message.role === "assistant"
    );

    // Extract only the content of the last assistant message (if any)
    const lastAssistantMessage =
        assistantMessages.length > 0
            ? assistantMessages.slice(-1)[0].content
            : null;


    useEffect(() => {
        if (isLoading) {
            console.log("Loading...");
        } else {
            setAiDataForFirestore(lastAssistantMessage);
            console.log(lastAssistantMessage);
            console.log("Done loading.");
        }
        console.log(aiDataForFirestore); //
    }, [isLoading]);


    const [trackerData, setTrackerData] = useState([]);

    const spellingDataType =
        "Provide response as an array of javascript objects, NOt json. include these keys with corresponding values: letters in word, word, definition, sentence, partOfSpeech, syllables, phonetics, phoneticsAudio, phoneticsAudioSlow,  ";

    // setInput("2+2")
    return (
        <div>
            {/**Maps Message history, may be good for a log bot nut for what we need. */}
            {/* <ul>
                {messages.map((m, index) => (
                    <li key={index}>
                        {m.role === "user" ? "User: " : "AI: "}
                        {m.content}
                    </li>
                ))}
            </ul> */}
            <ul className='hidden'>
                {messages
                    .filter((m) => m.role === "assistant")
                    .slice(-3)
                    .map((m, index) => (
                        <li key={index}>System: {m.content}</li>
                    ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <input
                    className="hidden"
                    placeholder={input}
                    value={input}
                    onChange={handleInputChange}
                />
                <button
                    className="bg-yellow-500 border-2 text-red-500 w-md"
                    type="submit"
                >
                    Send
                </button>
            </form>
        </div>
    );
}
