import dotenv from "dotenv";
dotenv.config();

import { ChatOpenRouter } from "@langchain/openrouter";
import { Index } from "@upstash/vector";

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

function extractErrorMessage(error) {
  const directMessage =
    error?.message ||
    error?.cause?.message ||
    error?.response?.data?.error?.message ||
    error?.response?.data?.message ||
    error?.error?.message;

  if (directMessage) return directMessage;

  const responseData = error?.response?.data;
  if (responseData) {
    if (typeof responseData === "string") return responseData;
    try {
      return JSON.stringify(responseData);
    } catch {
      // Continue to fallback below.
    }
  }

  try {
    return JSON.stringify(error);
  } catch {
    return "Failed to get response from AI";
  }
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );

  // Handle preflight
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, history = [], model } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Set headers for streaming
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Only query Upstash if the user asks about Marius or portfolio
    let context = "";
    const userMessage = message.toLowerCase();
    const mariusKeywords = ["marius", "odediran"];

    const isMariusQuestion = mariusKeywords.some((keyword) =>
      userMessage.includes(keyword),
    );

    if (isMariusQuestion) {
      // Only use RAG if user is asking about Marius
      const queryResults = await index.query({
        data: message,
        topK: 5,
        includeMetadata: true,
      });

      context = queryResults
        .map((result) => result.metadata?.text || "")
        .filter(Boolean)
        .join("\n\n");
    }

    // Simple, neutral system prompt - just be helpful
    let systemPrompt = `You are a helpful AI assistant. Answer questions accurately, thoroughly, and conversationally. Be friendly and engaged. Follow the user's lead and stay on topic.`;

    if (context) {
      systemPrompt += `\n\nYou also have access to information about Marius Odediran:\n\n${context}\n\nUse this information when answering questions about Marius.`;
    }

    const modelId = model || "nvidia/nemotron-3-super-120b-a12b:free";

    const modelInstance = new ChatOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY,
      model: modelId,
      temperature: 0.7,
      maxTokens: 2000,
    });

    // Build messages array with full conversation history
    const messages = [
      {
        role: "system",
        content: systemPrompt,
      },
      ...history.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: "user",
        content: message,
      },
    ];

    // Use streaming with context-enriched prompt and full conversation history
    const stream = await modelInstance.stream(messages);

    let fullContent = "";

    for await (const chunk of stream) {
      const content = chunk.content || "";
      fullContent += content;

      // Send each chunk as SSE event
      res.write(`data: ${JSON.stringify({ content, done: false })}\n\n`);
    }

    console.log("AI Response:", fullContent);

    // Send final event with model info
    res.write(
      `data: ${JSON.stringify({ content: "", done: true, model: modelId })}\n\n`,
    );
    res.end();
  } catch (error) {
    const errorMessage = extractErrorMessage(error);

    console.error("Chat API error:", errorMessage);
    console.error("Full error stack:", error.stack);

    // Log more details about the error
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }

    // Only try to write if response hasn't been sent
    if (!res.headersSent) {
      res.setHeader("Content-Type", "text/event-stream");
      res.write(
        `data: ${JSON.stringify({ error: errorMessage, done: true })}\n\n`,
      );
    }
    res.end();
  }
}
