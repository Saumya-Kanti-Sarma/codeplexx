"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ChatBot.module.css";
import axios from "axios";
import MarkdownRenderer from "@/components/Markdown/Markdown";

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  blogContent?: string;
}

interface Message {
  id: number;
  role: "user" | "bot";
  content: string;
  loading?: boolean;
}

const ERROR_RESPONSE =
  "Oops! Unable to connect with the server. Please try again! :)";

const RATE_LIMIT_MESSAGE =
  "You are sending messages too quickly. Please wait a moment before asking again.";

const ChatBot = ({ isOpen, onClose, blogContent }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "bot",
      content:
        "Welcome to CodePlexx. I am your AI assistant. You can ask me anything about this blog post. How can I help you today?... :)",
    },
  ]);

  const [input, setInput] = useState("");
  const [rateLimited, setRateLimited] = useState<{ retryAfter?: number } | null>(null);
  const [expanded, setExpanded] = useState(false);
  const msgEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom
  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setRateLimited(null);

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: input,
    };

    const loadingMsg: Message = {
      id: Date.now() + 1,
      role: "bot",
      content: "",
      loading: true,
    };

    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setInput("");

    try {
      const response = await axios.post("/api/chat", {
        messages: [...messages, userMsg],
        blogContent: blogContent || "",
      });

      const reply = response.data.reply || "No response received.";

      setMessages((prev) =>
        prev.map((msg) =>
          msg.loading ? { ...msg, loading: false, content: reply } : msg
        )
      );
    } catch (error: any) {
      if (error.response?.status === 429) {
        setRateLimited({
          retryAfter: error.response.data?.retryAfter,
        });
      } else {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.loading
              ? { ...msg, loading: false, content: ERROR_RESPONSE }
              : msg
          )
        );
      }
    } finally {
      setMessages((prev) =>
        prev.map((msg) => (msg.loading ? { ...msg, loading: false } : msg))
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className={`${styles.chatbot} ${expanded ? styles.expanded : ""} ${isOpen ? styles.open : ""}`}>
      <div className={styles.header}>
        <span>AI Assistant</span>
        <div className={styles.headerActions}>
          <button
            className={styles.expandBtn}
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? "↙" : "↗"}
          </button>
          <button onClick={onClose}>✕</button>
        </div>
      </div>

      {rateLimited && (
        <div className={styles.rateLimit}>
          {RATE_LIMIT_MESSAGE}
          {rateLimited.retryAfter && ` (Retry in ~${rateLimited.retryAfter}s)`}
        </div>
      )}

      <div className={styles.messages}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={
              msg.role === "user"
                ? styles.msgRowUser
                : styles.msgRowBot
            }
          >
            <div
              className={`${msg.role === "user" ? styles.userMsg : styles.botMsg} ${
                msg.loading ? styles.loadingWrapper : ""
              }`}
            >
              {msg.loading ? (
                <>
                  <div className={styles.skeleton} />
                  <div className={styles.skeleton} />
                </>
              ) : msg.role === "bot" ? (
                <MarkdownRenderer content={msg.content} />
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}

        <div ref={msgEndRef} />
      </div>

      <div className={styles.inputBox}>
        <input
          type="text"
          placeholder="Ask about this blog post…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!!rateLimited}
        />
        <button onClick={sendMessage} disabled={!!rateLimited || !input.trim()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
