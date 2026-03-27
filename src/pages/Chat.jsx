import { Plus, Menu, X, Trash2, Settings } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ChatMessage from "../components/chat/ChatMessage";
import ChatInput from "../components/chat/ChatInput";
import TypingIndicator from "../components/chat/TypingIndicator";
import { useChat } from "../hooks/useChat";

const SidebarButton = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
  >
    <Icon size={16} />
    <span>{label}</span>
  </button>
);

const Chat = () => {
  const {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    dailyCount,
    limitReached,
    remainingMessages,
    dailyLimit,
    selectedModel,
    changeModel,
  } = useChat();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      100;

    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSend = (text) => {
    sendMessage(text);
  };

  return (
    <div className="h-screen max-sm:h-dvh bg-white dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-0"} border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col transition-all duration-300 overflow-hidden shrink-0 relative max-sm:fixed max-sm:inset-y-0 max-sm:left-0 max-sm:z-40 max-sm:w-screen max-sm:max-w-64 ${sidebarOpen ? "max-sm:translate-x-0" : "max-sm:-translate-x-full"}`}
      >
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={clearMessages}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 transition text-sm font-medium"
          >
            <Plus size={16} />
            <span>New chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 min-h-0 chat-scrollbar">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-500 px-2 py-2">
            Chat History
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 p-3 space-y-1 shrink-0">
          <SidebarButton icon={Settings} label="Settings" />
          <SidebarButton
            icon={Trash2}
            label="Clear chat"
            onClick={clearMessages}
          />
        </div>
      </div>

      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between shrink-0 bg-white dark:bg-gray-900">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition text-gray-600 dark:text-gray-400"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-sm font-semibold text-gray-900 dark:text-white">
            Milo
          </h1>
          <div className="w-10" />
        </div>

        <div
          className="chat-scrollbar flex-1 overflow-y-auto flex flex-col bg-white dark:bg-gray-900"
          ref={scrollContainerRef}
        >
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center px-4">
              <div>
                <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">
                  How can I help you today?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md">
                  Ask me about the portfolio or anything else
                </p>
              </div>
            </div>
          ) : (
            <div className="px-4 py-6 space-y-4 max-w-3xl w-full mx-auto">
              {messages.map(
                (msg, idx) =>
                  (msg.content !== "" || msg.isError) && (
                    <ChatMessage key={idx} message={msg} />
                  ),
              )}
              {isLoading && messages.length > 0 && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center shrink-0 text-xs font-semibold text-gray-900 dark:text-white">
                    M
                  </div>
                  <div className="pt-1">
                    <TypingIndicator />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Daily Limit Notice */}
        {(limitReached || remainingMessages < 10) && (
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {limitReached ? (
                <>
                  Daily limit reached. Back tomorrow to chat more (limit:{" "}
                  {dailyLimit})
                </>
              ) : (
                <>
                  {remainingMessages} message
                  {remainingMessages !== 1 ? "s" : ""} left today
                </>
              )}
            </p>
          </div>
        )}

        <ChatInput
          onSend={handleSend}
          isTyping={isLoading}
          disabled={limitReached}
          selectedModel={selectedModel}
          onModelChange={changeModel}
        />
      </div>
    </div>
  );
};

export default Chat;
