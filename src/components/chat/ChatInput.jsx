import { useRef, useState, useEffect } from "react";
import { AVAILABLE_MODELS } from "../../config/models";

export default function ChatInput({
  onSend,
  isTyping,
  disabled = false,
  selectedModel,
  onModelChange,
}) {
  const [text, setText] = useState("");
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [focused, setFocused] = useState(false);
  const textAreaRef = useRef(null);
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);

  const canSend = text.trim() && !isTyping && !disabled;

  const resizeTextarea = (element) => {
    if (!element) return;
    element.style.height = "auto";
    const maxHeight = 200;
    element.style.height = `${Math.min(element.scrollHeight, maxHeight)}px`;
    element.style.overflowY =
      element.scrollHeight > maxHeight ? "auto" : "hidden";
  };

  const handleSend = () => {
    if (!canSend) return;
    onSend(text.trim());
    setText("");
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "24px";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault();
      handleSend();
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowModelDropdown(false);
      }
    };
    if (showModelDropdown) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showModelDropdown]);

  return (
    <div className="px-4 pb-4 pt-2 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        {/* Unified container — like Claude's */}
        <div
          ref={containerRef}
          className={`
            flex flex-col rounded-2xl border transition-all duration-150
            bg-white dark:bg-gray-800
            ${
              focused
                ? "border-gray-400 dark:border-gray-500 shadow-sm"
                : "border-gray-300 dark:border-gray-600"
            }
            ${disabled ? "opacity-60" : ""}
          `}
        >
          {/* Textarea row */}
          <div className="px-4 pt-3 pb-1">
            <textarea
              ref={textAreaRef}
              rows={1}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                resizeTextarea(e.target);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              disabled={disabled}
              placeholder="Message Milo..."
              className="chat-scrollbar-input w-full bg-transparent resize-none outline-none text-sm leading-relaxed text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 overflow-hidden"
              style={{ height: "24px", minHeight: "24px" }}
            />
          </div>

          {/* Bottom toolbar row */}
          <div className="flex items-center justify-between px-3 pb-3 pt-1">
            {/* Left — model selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-md transition-colors"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
                </svg>
                <span className="max-w-30 truncate">
                  {selectedModel?.name ?? "Select model"}
                </span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="shrink-0"
                >
                  <polyline points="1 3 5 7 9 3" />
                </svg>
              </button>

              {/* Dropdown */}
              {showModelDropdown && (
                <div className="absolute bottom-full mb-2 left-0 min-w-48 max-h-60 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-y-auto chat-scrollbar">
                  <div className="py-1">
                    {AVAILABLE_MODELS.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          onModelChange(model);
                          setShowModelDropdown(false);
                        }}
                        className={`w-full px-3 py-2.5 text-left text-xs flex items-center justify-between gap-3 transition-colors ${
                          selectedModel?.id === model.id
                            ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/60"
                        }`}
                      >
                        <span className="truncate">{model.name}</span>
                        {selectedModel?.id === model.id && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="2 6 5 9 10 3" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile backdrop */}
              {showModelDropdown && (
                <div
                  className="fixed inset-0 bg-black/50 z-40 sm:hidden"
                  onClick={() => setShowModelDropdown(false)}
                />
              )}
            </div>

            {/* Right — send button */}
            <button
              onClick={handleSend}
              disabled={!canSend}
              aria-label="Send message"
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-150 ${
                canSend
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 scale-100"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed scale-95"
              }`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[11px] text-gray-400 dark:text-gray-600 mt-2">
          Milo can make mistakes. Always verify important information.
        </p>
      </div>
    </div>
  );
}
