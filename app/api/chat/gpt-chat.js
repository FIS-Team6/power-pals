import { useChat } from "@vercel/ai";

const GPT_CHAT_API_URL =
    "https://api.openai.com/v1/engines/chatgpt/completions";

export default async function gptChat(prompt) {
    const { data } = await useChat({
        prompt,
        url: GPT_CHAT_API_URL,
    });

    return data.choices[0].text;
}
