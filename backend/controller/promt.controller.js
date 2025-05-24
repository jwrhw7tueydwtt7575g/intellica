import OpenAI from "openai";
import { Promt } from "../model/promt.model.js";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const sendPromt = async (req, res) => {
  const { content } = req.body;
  const userId = req.userId;

  if (!content || content.trim() === "") {
    return res.status(400).json({ errors: "Prompt content is required" });
  }

  try {
    // Save user's prompt
    const userPromt = await Promt.create({
      userId,
      role: "user",
      content,
    });

    // Send prompt to Groq's OpenAI-compatible API
    const completion = await openai.chat.completions.create({
        model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content }],
    });

    const aiContent = completion.choices[0].message.content;

    // Save assistant's response
    const aiMessage = await Promt.create({
      userId,
      role: "assistant",
      content: aiContent,
    });

    return res.status(200).json({ reply: aiContent });
  } catch (error) {
    console.log("Error in Promt: ", error);
    return res
      .status(500)
      .json({ error: "Something went wrong with the AI response" });
  }
};
