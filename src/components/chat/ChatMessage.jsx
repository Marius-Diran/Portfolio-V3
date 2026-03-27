import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getModelById } from "../../config/models";

export default function ChatMessage({ message }) {
  const isAI = message.role === "assistant";
  const isError = message.isError;
  const model = message.model ? getModelById(message.model) : null;

  return (
    <div className={`flex gap-2 ${isAI ? "justify-start" : "justify-end"}`}>
      {/* AI Avatar */}
      {isAI && (
        <div className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center shrink-0 text-xs font-semibold text-gray-900 dark:text-white">
            M
          </div>
          {model && (
            <span className="text-xs text-gray-600 dark:text-gray-500 font-medium">
              {model.name}
            </span>
          )}
        </div>
      )}

      {/* Message */}
      <div
        className={
          isAI
            ? isError
              ? "max-w-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-200 px-4 py-2.5 rounded-lg"
              : "max-w-2xl text-gray-900 dark:text-gray-100"
            : "max-w-xl text-white bg-blue-600 dark:bg-blue-700 px-4 py-2.5 rounded-lg"
        }
      >
        {isAI && !isError ? (
          <ReactMarkdown
            components={{
              p: ({ node, ...props }) => (
                <p
                  className="mb-2 last:mb-0 text-sm leading-relaxed"
                  {...props}
                />
              ),
              h1: ({ node, ...props }) => (
                <h1
                  className="text-lg font-semibold mb-2 mt-3 first:mt-0"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-base font-semibold mb-2 mt-3 first:mt-0"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-sm font-semibold mb-2 mt-3 first:mt-0"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="list-disc list-inside mb-2 last:mb-0 ml-2 text-sm"
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="list-decimal list-inside mb-2 last:mb-0 ml-2 text-sm"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              strong: ({ node, ...props }) => (
                <strong className="font-semibold" {...props} />
              ),
              em: ({ node, ...props }) => <em className="italic" {...props} />,
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || "");
                const lang = match ? match[1] : "text";

                return !inline ? (
                  <SyntaxHighlighter
                    style={dracula}
                    language={lang}
                    className="rounded text-xs mb-2 p-3! m-0!"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-xs font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              pre: ({ node, ...props }) => (
                <pre className="mb-2 last:mb-0" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-2 border-gray-300 dark:border-gray-600 pl-3 italic mb-2 last:mb-0 text-sm text-gray-600 dark:text-gray-400"
                  {...props}
                />
              ),
              hr: ({ node, ...props }) => (
                <hr
                  className="my-2 border-gray-200 dark:border-gray-700"
                  {...props}
                />
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        ) : (
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        )}
      </div>

      {/* User avatar spacer */}
      {!isAI && <div className="w-6 h-6" />}
    </div>
  );
}
