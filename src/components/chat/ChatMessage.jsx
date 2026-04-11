import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

/* =========================
   � MESSAGE FORMATTER
========================= */
function formatMessage(content) {
  // Return content as-is, let markdown handle code blocks
  return content;
}

/* =========================
   📋 COPY BUTTON
========================= */
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs text-gray-400 hover:text-white"
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}

/* =========================
   🧠 CODE BLOCK
========================= */
function CodeBlock({ language, children }) {
  const code = String(children).replace(/\n$/, "");

  return (
    <div className="my-4 rounded-xl border border-gray-700 bg-gray-950 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-3 py-2 bg-gray-900 border-b border-gray-700">
        <span className="text-xs text-gray-400 font-mono">
          {language || "code"}
        </span>
        <CopyButton text={code} />
      </div>

      {/* Code */}
      <div className="overflow-x-auto max-w-full">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          showLineNumbers
          wrapLines={true}
          wrapLongLines={true} // 🔥 CRITICAL FIX
          customStyle={{
            margin: 0,
            padding: "16px",
            background: "transparent",
            fontSize: "13px",
            width: "100%",
          }}
          codeTagProps={{
            style: {
              whiteSpace: "pre-wrap", // 🔥 prevents overflow
              wordBreak: "break-word",
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

/* =========================
   💬 MAIN COMPONENT
========================= */
export default function ChatMessage({ message }) {
  const isAI = message.role === "assistant";

  const formattedContent = useMemo(() => {
    return formatMessage(message.content);
  }, [message.content]);

  return (
    <div
      className={`flex gap-3 w-full ${isAI ? "justify-start" : "justify-end"}`}
    >
      {/* Avatar */}
      {isAI && (
        <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white shrink-0">
          M
        </div>
      )}

      {/* Message Container */}
      <div
        className={`min-w-0 ${
          isAI
            ? "w-full overflow-hidden"
            : "max-w-[78%] md:max-w-[72%] ml-auto flex justify-end"
        }`}
      >
        {isAI ? (
          <div className="group relative text-gray-800 dark:text-gray-100 text-sm leading-relaxed whitespace-pre-wrap wrap-break-word overflow-hidden pt-1">
            <div className="absolute right-0 -top-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              <CopyButton text={message.content} />
            </div>

            <ReactMarkdown
              skipHtml={true} // 🔥 PREVENT HTML BREAKING UI
              components={{
                p: (props) => <p className="mb-3 wrap-break-word" {...props} />,

                code({ inline, className, children }) {
                  const match = /language-(\w+)/.exec(className || "");
                  const lang = match ? match[1] : null;

                  if (inline) {
                    return (
                      <code className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-1.5 py-0.5 rounded text-xs break-all">
                        {children}
                      </code>
                    );
                  }

                  return <CodeBlock language={lang}>{children}</CodeBlock>;
                },

                pre: ({ children }) => (
                  <div className="w-full overflow-hidden">{children}</div>
                ),

                ul: (props) => (
                  <ul className="list-disc ml-4 space-y-1" {...props} />
                ),

                ol: (props) => (
                  <ol className="list-decimal ml-4 space-y-1" {...props} />
                ),

                a: (props) => (
                  <a
                    className="text-blue-600 dark:text-blue-400 underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),

                blockquote: (props) => (
                  <blockquote className="border-l-2 border-gray-300 dark:border-gray-600 pl-3 italic text-gray-600 dark:text-gray-400 my-3">
                    {props.children}
                  </blockquote>
                ),
              }}
            >
              {formattedContent}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="inline-block w-fit max-w-full bg-gray-800 text-white px-4 py-2.5 rounded-3xl text-sm whitespace-pre-wrap wrap-break-word leading-relaxed">
            {message.content}
          </div>
        )}
      </div>
    </div>
  );
}
