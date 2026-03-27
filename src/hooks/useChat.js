import { useState, useCallback, useEffect } from "react";
import { DEFAULT_MODEL } from "../config/models";

const normalizeErrorMessage = (errorValue) => {
  if (!errorValue) return "Unknown error";
  if (typeof errorValue === "string") return errorValue;

  try {
    return JSON.stringify(errorValue);
  } catch {
    return String(errorValue);
  }
};

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dailyCount, setDailyCount] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL);

  const DAILY_LIMIT = 500;

  // Load messages and model from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("chatHistory");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load chat history:", e);
      }
    }

    // Load selected model
    const savedModel = localStorage.getItem("selectedModel");
    if (savedModel) {
      try {
        setSelectedModel(JSON.parse(savedModel));
      } catch (e) {
        console.error("Failed to load selected model:", e);
      }
    }

    // Load and check daily message count
    const countData = localStorage.getItem("dailyMessageCount");
    if (countData) {
      try {
        const { count, date } = JSON.parse(countData);
        const today = new Date().toDateString();
        if (date === today) {
          setDailyCount(count);
          setLimitReached(count >= DAILY_LIMIT);
        } else {
          // Reset for new day
          setDailyCount(0);
          setLimitReached(false);
          localStorage.setItem(
            "dailyMessageCount",
            JSON.stringify({ count: 0, date: today }),
          );
        }
      } catch (e) {
        console.error("Failed to load daily count:", e);
        setDailyCount(0);
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

      // Check daily limit
      if (dailyCount >= DAILY_LIMIT) {
        setError(
          `Daily message limit (${DAILY_LIMIT}) reached. Please try again tomorrow.`,
        );
        setLimitReached(true);
        return;
      }

      setIsLoading(true);
      setError(null);

      // Increment daily count
      const newCount = dailyCount + 1;
      const today = new Date().toDateString();
      localStorage.setItem(
        "dailyMessageCount",
        JSON.stringify({ count: newCount, date: today }),
      );
      setDailyCount(newCount);

      if (newCount >= DAILY_LIMIT) {
        setLimitReached(true);
      }

      try {
        // Mock response for local testing
        console.log(
          "Mode check - PROD:",
          import.meta.env.PROD,
          "isDev:",
          !import.meta.env.PROD,
        );
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

        console.log("Fetching /api/chat with:", {
          message: userMessage,
          model: selectedModel.id,
          historyLength: messages.length,
        });
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage,
            model: selectedModel.id,
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

          if (value) {
            buffer += decoder.decode(value, { stream: true });
          }

          // Process all complete lines in buffer
          const lines = buffer.split("\n");
          buffer = lines[lines.length - 1]; // Keep incomplete line in buffer

          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i];
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.error) {
                  const detailedError = normalizeErrorMessage(data.error);
                  console.error("API error received:", detailedError);
                  setError(detailedError);
                  setMessages((prev) => {
                    if (prev.length === 0) {
                      return [
                        {
                          role: "assistant",
                          content: detailedError,
                          isError: true,
                        },
                      ];
                    }

                    const updated = [...prev];
                    updated[updated.length - 1] = {
                      ...updated[updated.length - 1],
                      content: detailedError,
                      isError: true,
                    };
                    return updated;
                  });
                  setIsLoading(false);
                } else if (data.done) {
                  // Attach model info to the last assistant message
                  if (data.model) {
                    setMessages((prev) => {
                      const updated = [...prev];
                      updated[updated.length - 1].model = data.model;
                      return updated;
                    });
                  }
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

          if (done) break;
        }

        // Process any remaining data in buffer after stream ends
        if (buffer.trim() && buffer.startsWith("data: ")) {
          try {
            const data = JSON.parse(buffer.slice(6));
            if (data.error) {
              const detailedError = normalizeErrorMessage(data.error);
              console.error("API error in final buffer:", detailedError);
              setError(detailedError);
              setMessages((prev) => {
                if (prev.length === 0) {
                  return [
                    {
                      role: "assistant",
                      content: detailedError,
                      isError: true,
                    },
                  ];
                }

                const updated = [...prev];
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  content: detailedError,
                  isError: true,
                };
                return updated;
              });
              setIsLoading(false);
            } else if (data.done) {
              // Attach model info to the last assistant message
              if (data.model) {
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1].model = data.model;
                  return updated;
                });
              }
              setIsLoading(false);
            } else if (data.content) {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1].content += data.content;
                return updated;
              });
            }
          } catch (e) {
            console.error("Failed to parse final SSE data:", e);
          }
        }
      } catch (err) {
        const errMsg = err?.message || String(err) || "Unknown error";
        console.error("❌ Chat error:", errMsg, err);
        setError(errMsg);
        setIsLoading(false);

        // Only mark last message as error if it exists
        setMessages((prev) => {
          if (prev.length === 0) {
            return [{ role: "assistant", content: errMsg, isError: true }];
          }

          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: errMsg,
            isError: true,
          };
          return updated;
        });
      }
    },
    [messages, selectedModel],
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    localStorage.removeItem("chatHistory");
  }, []);

  const changeModel = useCallback((newModel) => {
    setSelectedModel(newModel);
    localStorage.setItem("selectedModel", JSON.stringify(newModel));
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    dailyCount,
    limitReached,
    remainingMessages: Math.max(0, DAILY_LIMIT - dailyCount),
    dailyLimit: DAILY_LIMIT,
    selectedModel,
    changeModel,
  };
};
