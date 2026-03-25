// src/components/chat/ChatMessage.jsx
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

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
        className={`px-3 max-sm:px-3 py-2 max-sm:py-2 rounded-2xl max-w-lg max-sm:max-w-[85%] transition-all duration-200 ${
          isAI
            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-gray-600"
            : "bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-lg"
        }`}
      >
        <div className="text-sm max-sm:text-xs leading-relaxed max-w-none">
          {isAI ? (
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => (
                  <p className="mb-2 last:mb-0" {...props} />
                ),
                h1: ({ node, ...props }) => (
                  <h1 className="text-lg font-bold mb-2" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-base font-bold mb-2" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-sm font-bold mb-2" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    className="list-disc list-inside mb-2 last:mb-0"
                    {...props}
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol
                    className="list-decimal list-inside mb-2 last:mb-0"
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => (
                  <li className="ml-2 mb-1" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-bold" {...props} />
                ),
                em: ({ node, ...props }) => (
                  <em className="italic" {...props} />
                ),
                code: ({ node, inline, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || "");
                  const lang = match ? match[1] : "text";

                  return !inline ? (
                    <SyntaxHighlighter
                      style={dracula}
                      language={lang}
                      className="rounded text-xs mb-2"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className="bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded text-xs font-mono"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                pre: ({ node, ...props }) => (
                  <pre
                    className="bg-gray-800 p-0 rounded overflow-x-auto mb-2 last:mb-0"
                    {...props}
                  />
                ),
                a: ({ node, ...props }) => (
                  <a
                    className="text-blue-600 dark:text-blue-400 underline hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-gray-400 pl-3 italic mb-2 last:mb-0"
                    {...props}
                  />
                ),
                hr: ({ node, ...props }) => <hr className="my-2" {...props} />,
              }}
            >
              {message.content}
            </ReactMarkdown>
          ) : (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
        </div>
      </div>
    </div>
  );
}
