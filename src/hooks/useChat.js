import { useState, useCallback, useEffect } from "react";

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("chatHistory");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load chat history:", e);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = useCallback(async (userMessage) => {
    if (!userMessage.trim()) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
    setError(null);

    try {
      // Mock response for local testing
      if (!import.meta.env.PROD) {
        setTimeout(() => {
          setMessages((prev) => [...prev, {
            role: "assistant",
            content: `Mock response: You said "${userMessage}". Deploy to Vercel to use real AI!`
          }]);
          setIsLoading(false);
        }, 1000);
        return;
      }

      // Add empty AI message placeholder
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages // Send full conversation history
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines[lines.length - 1];

        for (let i = 0; i < lines.length - 1; i++) {
          const line = lines[i];
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.done) {
                setIsLoading(false);
              } else if (data.content) {
                // Update last AI message with streamed content
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1].content += data.content;
                  return updated;
                });
              }
            } catch (e) {
              console.error("Failed to parse SSE data:", e);
            }
          }
        }
      }
    } catch (err) {
      setError(err.message);
      console.error("Chat error:", err);
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    localStorage.removeItem("chatHistory");
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
};
