import { useEffect, useRef, useState } from "react";
import styles from "./ChatBot.module.css";

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  role: "user" | "bot";
  content: string;
  loading?: boolean;
}

const ERROR_RESPONSE =
  "Opps! unable to connect with the server. Please try again! :(";

const ChatBot = ({ isOpen, onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "bot",
      content:
        "Welcome to CodePlexx. I am your AI assistant. How can I help you today?... :)",
    },
  ]);

  const [input, setInput] = useState("");
  const msgEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom
  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const sendMessage = () => {
    if (!input.trim()) return;

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

    setMessages(prev => [...prev, userMsg, loadingMsg]);
    setInput("");

    // Simulated API delay
    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.loading
            ? { ...msg, loading: false, content: ERROR_RESPONSE }
            : msg
        )
      );
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className={`${styles.chatbot} ${isOpen ? styles.open : ""}`}>
      <div className={styles.header}>
        <span>AI Assistant</span>
        <button onClick={onClose}>✕</button>
      </div>

      <div className={styles.messages}>
        {messages.map(msg => (
          <div
            key={msg.id}
            className={
              msg.role === "user"
                ? styles.msgRowUser
                : styles.msgRowBot
            }
          >
            <div className={`${msg.role === "user" ? styles.userMsg : styles.botMsg} ${msg.loading ? styles.loadingWrapper : ""}`}>
              {msg.loading ?
                <>
                  <div className={styles.skeleton} />
                  <div className={styles.skeleton} />
                </> : msg.content}
            </div>
          </div>
        ))}

        <div ref={msgEndRef} />

      </div>

      <div className={styles.inputBox}>
        <input
          type="text"
          placeholder="Ask something…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
