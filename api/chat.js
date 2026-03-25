import { ChatOpenRouter } from "@langchain/openrouter";
import { Index } from "@upstash/vector";

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

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
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Set headers for streaming
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Query Upstash for relevant portfolio context
    const queryResults = await index.query({
      data: message,
      topK: 5,
      includeMetadata: true,
    });

    // Extract text from retrieved documents
    const context = queryResults
      .map((result) => result.metadata?.text || "")
      .filter(Boolean)
      .join("\n\n");

    // Build system prompt with context
    const systemPrompt = context
      ? `You are Marius Odediran's AI assistant. Here's information about Marius to help you answer questions:\n\n${context}\n\nUse this information to provide accurate answers about Marius's experience, projects, skills, and background.`
      : "You are Marius Odediran's AI assistant. Help answer questions about Marius professionally and helpfully.";

    const model = new ChatOpenRouter({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
      model: "nvidia/nemotron-3-super-120b-a12b:free",
      temperature: 0.7,
    });

    // Use streaming with context-enriched prompt
    const stream = await model.stream([
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: message,
      },
    ]);

    let fullContent = "";

    for await (const chunk of stream) {
      const content = chunk.content || "";
      fullContent += content;

      // Send each chunk as SSE event
      res.write(`data: ${JSON.stringify({ content, done: false })}\n\n`);
    }

    console.log("AI Response:", fullContent);

    // Send final event
    res.write(`data: ${JSON.stringify({ content: "", done: true })}\n\n`);
    res.end();
  } catch (error) {
    console.error("Chat API error:", error);
    res.write(
      `data: ${JSON.stringify({ error: "Failed to get response from AI", done: true })}\n\n`,
    );
    res.end();
  }
}
