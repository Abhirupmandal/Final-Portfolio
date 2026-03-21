import { useState, useEffect, useRef } from "react";
import dineshImg from "@/assets/dinesh-sir.png";

const suggestions = [
  "I'm confused about my career direction",
  "How do I think like a senior engineer?",
  "How do I grow into leadership?",
  "I want guidance, not answers",
];

const DineshBot = () => {
  const [visible, setVisible] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const contactRef = useRef(null);

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
          <div className="absolute bottom-[72px] right-0 w-[320px] sm:w-[360px] bg-card border border-border rounded-3xl shadow-xl overflow-hidden animate-fade-in-scale">
            <div className="flex justify-between items-center px-5 py-4 border-b border-border">
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
              >
                ×
              </button>
            </div>

            <div className="p-5 text-sm leading-relaxed">
              <p className="text-foreground text-base mb-2">
                Hello. I'm here to help you think clearly about your next step.
              </p>
              <p className="text-muted-foreground text-xs mb-4">
                Career decisions, leadership growth, or technical direction —
                we can explore it together.
              </p>

              <div className="flex flex-col gap-2">
                {suggestions.map((s, i) => (
                  <button
                    key={s}
                    className="text-left px-3 py-2.5 rounded-xl bg-muted/50 border border-border text-xs text-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-4 pb-4 border-t border-border pt-4">
              <input
                className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="Type your question…"
              />
              <span className="block mt-2 text-[11px] text-muted-foreground text-center">
                This conversation is private.
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DineshBot;