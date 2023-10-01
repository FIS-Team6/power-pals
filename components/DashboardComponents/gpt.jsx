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
    setFinalPreview,
    finalPreview,
    preview,
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
        numTasks: 2,
        subtasksMin: 2,
        subtasksMax: 3,
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
Response must be in json format, dateformat is timestamp
no quotations before the beginning and and end of the array.
no text outside of the json array
this is the assignment: ${taskFormData.assignment}.
I'm starting this assignment on ${taskFormData.startDate}. 
the assignment is due on ${taskFormData.dueDate} and i intend to complete everything the day before
based on the due date, divide the assignment into ${taskFormData.numTasks} tasks. 
tasks must be json objects with the following keys: name, description, subTasks, and dueDate
name is the name of the task
Each task must contain between ${taskFormData.subtasksMin} and ${taskFormData.subtasksMax} subTasks 
The subtask is an object nested under the task's subclass key
each subtask must contain the following keys: name, description and dueDate
The subtasks will be saved as an array of objects under under each task 
description should describe the task or subTask it is under and maximum 1 - 2 sentences long.
respond with an array of javascript objects. starting and ending with brackets
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
        };
        preparePrompt();
    }, [taskFormData]);

    // Filter out messages by the assistant role
    const assistantMessages = messages.filter(
        (message) => message.role === "assistant"
    );

    // Extract only the content of the last assistant message (if any)
    const lastAssistantMessage =
        assistantMessages.length > 0
            ? assistantMessages.slice(-1)[0].content
            : null;

    function cleanJSONString(str) {
        // Replace escaped quotes
        let cleanedString = str.replace(/\\\"/g, '"');

        // Replace double double-quotes around property names
        cleanedString = cleanedString.replace(
            /\"\"([a-zA-Z0-9_]+)\"\"/g,
            '"$1"'
        );

        // Remove invalid control characters
        cleanedString = cleanedString.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
        cleanedString = cleanedString.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?\s*:/g, '"$2" :');

        return cleanedString;
    }


    //** This useEffect handles most of the flow of the open ai interaction / response  */
    useEffect(() => {
        if (isLoading) {
            console.log("Loading...");
        } else {
            if (lastAssistantMessage) {
                console.log(lastAssistantMessage);
                const cleanJSON = cleanJSONString(lastAssistantMessage);
                console.log(cleanJSON);
                const array = JSON.parse(cleanJSON);
                console.log(array);
                setAiDataForFirestore(array);
                setFinalPreview(true);
            }

            console.log(aiDataForFirestore);
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
            <ul className="hidden">
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
                {(!preview || finalPreview) ? <></>
                :
                <button
                    className="border-2 btn text-red-500 w-md text-center justify-items-center"
                    type="submit"
                >
                    Generate Assignment Plan
                </button>
                }
            </form>
        </div>
    );
}
