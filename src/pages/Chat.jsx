import { Plus, Menu, X, Trash2, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import ChatMessage from "../components/chat/ChatMessage";
import ChatInput from "../components/chat/ChatInput";

const SidebarButton = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 max-sm:gap-2 px-3 max-sm:px-2.5 py-2 max-sm:py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm max-sm:text-xs transition"
  >
    <Icon size={16} />
    <span>{label}</span>
  </button>
);

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

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
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setIsLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "This is a sample response. Connect this to your API.",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="h-screen max-sm:h-dvh bg-white dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-0"} border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 flex flex-col transition-all duration-300 overflow-hidden shrink-0 relative max-sm:fixed max-sm:inset-y-0 max-sm:left-0 max-sm:z-40 max-sm:h-screen ${sidebarOpen ? "max-sm:translate-x-0" : "max-sm:-translate-x-full"}`}
      >
        <div className="p-4 max-sm:p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="hidden max-sm:flex items-center justify-between mb-2 px-0.5">
            <span className="text-[11px] font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">
              Menu
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition"
              aria-label="Close sidebar"
            >
              <X size={15} />
            </button>
          </div>

          <button
            onClick={() => setMessages([])}
            className="w-full flex items-center justify-center gap-2 px-4 max-sm:px-3 py-2.5 max-sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-900 dark:text-gray-100 transition font-medium text-sm max-sm:text-xs"
          >
            <Plus size={18} />
            <span>New chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 max-sm:p-2.5">
          <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 px-3 max-sm:px-2 py-3 max-sm:py-2">
            Chat History
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 p-3 max-sm:p-2.5 space-y-2 max-sm:space-y-1.5">
          <SidebarButton icon={Settings} label="Settings" />
          <SidebarButton
            icon={Trash2}
            label="Clear history"
            onClick={() => setMessages([])}
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
        <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 max-sm:px-3 max-sm:py-2.5 flex items-center justify-between shrink-0 bg-white dark:bg-gray-900">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 max-sm:p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-600 dark:text-gray-400"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-base max-sm:text-sm font-semibold text-gray-900 dark:text-white">
            Milo
          </h1>
          <div className="w-8 max-sm:w-7" />
        </div>

        <div className="chat-scrollbar flex-1 overflow-y-auto flex flex-col bg-white dark:bg-gray-900">
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center px-4 max-sm:px-3">
              <div>
                <h2 className="text-2xl max-sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 max-sm:mb-1.5">
                  How can I help you today?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm max-sm:text-xs max-w-md">
                  Start a new chat to begin
                </p>
              </div>
            </div>
          ) : (
            <div className="px-3 sm:px-6 max-sm:px-2.5 py-4 max-sm:py-3 space-y-3 max-sm:space-y-2 max-w-4xl w-full mx-auto">
              {messages.map((msg, idx) => (
                <ChatMessage key={idx} message={msg} />
              ))}
            </div>
          )}
        </div>

        <ChatInput onSend={handleSend} isTyping={isLoading} />
      </div>
    </div>
  );
};

export default Chat;
