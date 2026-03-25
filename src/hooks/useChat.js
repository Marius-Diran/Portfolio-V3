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

  const sendMessage = useCallback(
    async (userMessage) => {
      if (!userMessage.trim()) return;

      setIsLoading(true);
      setError(null);

      try {
        // Mock response for local testing
        console.log("Mode check - PROD:", import.meta.env.PROD, "isDev:", !import.meta.env.PROD);
        if (!import.meta.env.PROD) {
          console.log("Using mock response");
          setMessages((prev) => [
            ...prev,
            { role: "user", content: userMessage },
          ]);
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                content: `Mock response: You said "${userMessage}". Deploy to Vercel to use real AI!`,
              },
            ]);
            setIsLoading(false);
          }, 1000);
          return;
        }

        console.log("Using production API");

        // For production: Add user message and empty AI placeholder
        setMessages((prev) => [
          ...prev,
          { role: "user", content: userMessage },
          { role: "assistant", content: "" },
        ]);

        console.log("Fetching /api/chat with:", { message: userMessage, historyLength: messages.length });
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage,
            history: messages,
          }),
        });

        console.log("API response status:", response.status);
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`API error ${response.status}: ${text}`);
        }

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
        const errMsg = err?.message || String(err) || "Unknown error";
        console.error("❌ Chat error:", errMsg, err);
        setError(errMsg);
        setIsLoading(false);

        // Only mark last message as error if it exists
        setMessages((prev) => {
          if (prev.length === 0) return prev;
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            isError: true,
          };
          return updated;
        });
      }
    },
    [messages],
  );

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
