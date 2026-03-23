// src/components/chat/ChatMessage.jsx

export default function ChatMessage({ message }) {
  const isAI = message.role === "assistant";

  return (
    <div
      className={`flex gap-2 max-sm:gap-1.5 ${isAI ? "justify-start" : "justify-end"}`}
    >
      {/* AI Avatar */}
      {isAI && (
        <div className="w-6 h-6 max-sm:w-5 max-sm:h-5 rounded-full bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center shrink-0 flex-none shadow-md">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="white"
            className="max-sm:w-3 max-sm:h-3"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`px-3 max-sm:px-3 py-2 max-sm:py-2 rounded-2xl max-w-xs max-sm:max-w-[85%] transition-all duration-200 ${
          isAI
            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-gray-600"
            : "bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-lg"
        }`}
      >
        <p className="text-sm max-sm:text-xs leading-relaxed whitespace-pre-wrap wrap-break-word">
          {message.content}
        </p>
      </div>
    </div>
  );
}
