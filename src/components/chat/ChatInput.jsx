// src/components/chat/ChatInput.jsx
import { useRef, useState } from "react";

export default function ChatInput({ onSend, isTyping }) {
  const [text, setText] = useState("");
  const textAreaRef = useRef(null);

  const resizeTextarea = (element) => {
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  const handleSend = () => {
    if (!text.trim() || isTyping) return;
    onSend(text.trim());
    setText("");
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "26px";
    }
  };

  const handleKeyDown = (e) => {
    // Send on Enter, new line on Shift+Enter
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-4 py-4 max-sm:px-2.5 max-sm:py-2.5 border-t border-[#2a2a2a] bg-transparent">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-3xl max-sm:rounded-2xl border border-[#3b3b3b] bg-linear-to-br from-[#2f2f2f] to-[#282828] px-5 py-4 max-sm:px-3 max-sm:py-3 shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
          <textarea
            ref={textAreaRef}
            rows={1}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              resizeTextarea(e.target);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Message Milo..."
            className="chat-scrollbar chat-scrollbar-input w-full bg-transparent resize-none outline-none text-[#ececec] text-[15px] max-sm:text-sm leading-relaxed placeholder:text-[#8a8a8a] max-h-44 max-sm:max-h-36 overflow-y-auto"
            style={{ height: "26px" }}
          />

          <div className="mt-3 max-sm:mt-2.5 flex items-center justify-between gap-2">
            <button
              type="button"
              className="w-9 h-9 max-sm:w-8 max-sm:h-8 rounded-full flex items-center justify-center text-[#b7b7b7] hover:text-[#f0f0f0] hover:bg-[#3a3a3a] transition-colors duration-150"
              aria-label="Attach"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>

            <div className="flex items-center gap-2 max-sm:gap-1.5 min-w-0">
              <button
                type="button"
                className="px-3 py-1.5 max-sm:px-2.5 max-sm:py-1 rounded-full text-[#d0d0d0] text-sm max-sm:text-xs hover:bg-[#3a3a3a] transition-colors duration-150 truncate"
              >
                Sonnet 4.6
                <span className="ml-1 text-[11px] align-middle text-[#9d9d9d]">
                  v
                </span>
              </button>

              <button
                onClick={handleSend}
                disabled={!text.trim() || isTyping}
                className={`w-9 h-9 max-sm:w-8 max-sm:h-8 rounded-full flex items-center justify-center transition-all duration-150
                  ${
                    text.trim() && !isTyping
                      ? "bg-[#dc7545] hover:bg-[#c8663a]"
                      : "bg-[#3a3a3a] cursor-not-allowed"
                  }`}
                aria-label="Send message"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={text.trim() && !isTyping ? "white" : "#6a6a6a"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-[12px] max-sm:text-[11px] text-[#6d6d6d] mt-2 max-sm:mt-1.5 px-2">
          Milo can make mistakes. Please double-check responses.
        </p>
      </div>
    </div>
  );
}
