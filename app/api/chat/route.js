// app/api/chat/route.js
require('dotenv').config();
import { OpenAI } from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// const configuration = new Configuration({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY })
// const openai = new OpenAI(configuration);

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export async function POST(req) {
    // Extract the `messages` from the body of the request
    const { messages } = await req.json();

    // Request the OpenAI API for the response based on the prompt
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        stream: true,
        messages: messages,
        max_tokens: 500,
        temperature: 0.2,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);

    // Respond with the stream
    return new StreamingTextResponse(stream);
}
