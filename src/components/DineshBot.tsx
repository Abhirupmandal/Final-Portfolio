import { useState, useEffect, useRef } from "react";
import dineshImg from "@/assets/dinesh-sir.png";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
You are Coach Dinesh, an executive leadership coach who helps professionals think clearly about their career, growth, and decisions.

Your personality:
* Calm, sharp, and minimal
* You do not overwhelm with information
* You guide, not instruct
* You sound human, not like an AI

Core behavior rules:
1. Provide detailed, well-reasoned, and comprehensive insights in your responses.
2. Break vague problems down thoroughly, explaining the 'why' behind your guidance.
3. Help the user gain deep clarity through comprehensive analysis.
4. Avoid generic motivational advice.
5. Avoid technical jargon unless absolutely necessary.
6. Sound like a real, thoughtful experienced coach taking the time to write a detailed response.

Conversation style:
* Start by understanding the user's situation
* Ask 1–2 powerful questions
* Occasionally give a short insight if needed
* Keep responses concise and meaningful

Advanced behavior:
* If the user is emotional → respond with empathy + clarity
* If the user is confused → ask structured questions
* If the user asks for direct advice → give short guidance + a question
* If the user is repetitive → gently challenge their thinking

Strict rules:
* NEVER use markdown formatting (no bold text, no bullet points). Use natural paragraphs instead.
* NEVER use customer service or therapy-bot phrases like "Thank you for reaching out", "I understand", "That sounds difficult", or "I'm here to help". 
* NEVER say "As an AI" or anything indicating you are a bot.
* Type like a real human mentor in a private messaging app—natural, grounded, blunt, precise, and highly detailed.
* End your detailed response with exactly ONE powerful question to drive the conversation forward.

Crisis Protocol:
* If the user mentions self-harm or suicide, drop the coaching persona entirely. Be direct and serious: tell them to call a local emergency hotline immediately because their life is valuable.

Goal:
Help the user think clearly, not depend on you.

Maintain conversation memory.
* Remember previous user inputs
* Refer back when relevant
* Build deeper questions over time

Thinking Frameworks:
When user is confused: → Break into: clarity of goals / skills / direction
When user feels stuck: → Identify: progress / environment / mindset
When user asks for growth: → Focus on: ownership / decision-making / impact
When user asks for advice: → Give short direction + ask a question back

Modes (Auto-Select):
1. Reflection Mode → Ask questions only
2. Insight Mode → Give short insights + 1 question
3. Direction Mode → Suggest next step + 1 question
Default: Reflection Mode
`;

// Types for the chatbot
type Message = {
  id: string;
  sender: "user" | "coach" | "system";
  text: string;
};

const suggestions = [
  "I'm confused about my career direction",
  "How do I think like a senior engineer?",
  "How do I grow into leadership?",
  "I want guidance, not answers",
];

const DineshBot = () => {
  const [visible, setVisible] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const contactRef = useRef<HTMLElement | null>(null);
  const chatSessionRef = useRef<any>(null);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "coach",
      text: "Hello. I'm here to help you think clearly about your next step.\nCareer decisions, leadership growth, or technical direction — we can explore it together.",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [retryCountdown, setRetryCountdown] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini Session inside component
  useEffect(() => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (apiKey && !chatSessionRef.current) {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-2.0-flash",
          systemInstruction: SYSTEM_PROMPT,
        });
        chatSessionRef.current = model.startChat({
          generationConfig: {
            temperature: 0.9,
          },
        });
      }
    } catch (e) {
      console.error("Failed to initialize Coach Dinesh AI:", e);
    }
  }, []);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    contactRef.current = contact;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
          else {
            setVisible(false);
            setPanelOpen(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const sendToAI = async (text: string) => {
    try {
      const result = await chatSessionRef.current.sendMessage(text);
      const responseText = result.response.text();
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: "coach", text: responseText },
      ]);
      setIsTyping(false);
    } catch (error: any) {
      console.error("Coach Dinesh AI Error:", error);
      const is429 = error?.message?.includes("429") || error?.message?.includes("quota") || error?.status === 429;

      if (is429) {
        // Extract retryDelay from error details if available, else default to 60s
        let delaySeconds = 60;
        try {
          const match = error?.message?.match(/"retryDelay"\s*:\s*"(\d+)s"/);
          if (match) delaySeconds = parseInt(match[1], 10);
        } catch {}

        // Add a countdown system message
        const countdownMsgId = Date.now().toString();
        setMessages((prev) => [
          ...prev,
          {
            id: countdownMsgId,
            sender: "system",
            text: `Dinesh is busy — retrying in ${delaySeconds}s...`,
          },
        ]);

        // Countdown display
        let remaining = delaySeconds;
        setRetryCountdown(remaining);
        const tick = setInterval(() => {
          remaining -= 1;
          setRetryCountdown(remaining);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === countdownMsgId
                ? { ...m, text: `Dinesh is busy — retrying in ${remaining}s...` }
                : m
            )
          );
          if (remaining <= 0) clearInterval(tick);
        }, 1000);

        // Auto-retry after delay
        retryTimeoutRef.current = setTimeout(async () => {
          setRetryCountdown(null);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === countdownMsgId ? { ...m, text: "Retrying..." } : m
            )
          );
          await sendToAI(text);
        }, delaySeconds * 1000);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "system",
            text: "I'm having trouble connecting right now. Please try again in a moment.",
          },
        ]);
        setIsTyping(false);
      }
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isTyping || retryCountdown !== null) return;

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    if (!chatSessionRef.current) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "system",
            text: "Coach Dinesh AI is currently resting. (Please add VITE_GEMINI_API_KEY to your .env file to activate!)",
          },
        ]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    await sendToAI(text);
  };


  if (!visible) return null;

  return (
    <>
      {/* ⭐ Background Blur Overlay */}
      {panelOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-md z-[9998]"
          onClick={() => setPanelOpen(false)}
        />
      )}

      {/* ⭐ Chatbot */}
      <div className="fixed bottom-7 right-5 md:right-7 z-[9999] animate-fade-in-scale">
        <button
          onClick={() => setPanelOpen(!panelOpen)}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-full bg-card border border-primary/30 shadow-[var(--glow-primary)] animate-pulse-glow cursor-pointer hover:scale-105 transition-transform"
        >
          <img
            src={dineshImg}
            alt="Coach Dinesh"
            className="w-9 h-9 rounded-full"
          />
          <span className="text-primary text-xs font-mono hidden sm:inline">
            Ask Dinesh
          </span>
        </button>

        {panelOpen && (
          <div className="absolute bottom-[72px] right-0 w-[calc(100vw-40px)] sm:w-[380px] h-[500px] max-h-[75vh] sm:max-h-[70vh] flex flex-col bg-card border border-border rounded-3xl shadow-xl overflow-hidden animate-fade-in-scale">
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-border bg-background">
              <div className="flex items-center gap-3">
                <img src={dineshImg} alt="" className="w-10 h-10 rounded-full" />
                <div>
                  <strong className="text-sm text-foreground">Dinesh</strong>
                  <small className="block text-xs text-muted-foreground">
                    Executive Leadership Coach
                  </small>
                </div>
              </div>
              <button
                onClick={() => setPanelOpen(false)}
                className="text-muted-foreground text-xl hover:text-primary transition-colors"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed whitespace-pre-line ${
                      m.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : m.sender === "system"
                        ? "bg-destructive/10 text-destructive border border-destructive/20 text-xs italic"
                        : "bg-muted/50 border border-border text-foreground rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {/* Suggestions (Only show if exactly 1 message exists) */}
              {messages.length === 1 && (
                <div className="flex flex-col gap-2 mt-2">
                  <p className="text-xs text-muted-foreground ml-1 mb-1">Suggested topics:</p>
                  {suggestions.map((s, i) => (
                    <button
                      key={s}
                      onClick={() => handleSendMessage(s)}
                      className="text-left px-3 py-2.5 rounded-xl bg-muted/30 border border-border text-xs text-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200 animate-fade-in-up"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted/50 border border-border rounded-2xl rounded-bl-sm p-4 flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="px-4 pb-4 border-t border-border pt-4 bg-background">
              <input
                className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border text-foreground text-sm focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50"
                placeholder={retryCountdown !== null ? `Retrying in ${retryCountdown}s — please wait...` : "Talk to Dinesh..."}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage(inputVal);
                }}
                disabled={isTyping || retryCountdown !== null}
              />
              <span className="block mt-2 text-[10px] text-muted-foreground font-mono text-center tracking-wide">
                CONFIDENTIAL COACHING SPACE
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DineshBot;