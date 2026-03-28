import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const testimonials = [
  { name: "Rajesh Dankh", role: "Infra Architect", quote: "Dinesh is one of those rare managers who naturally serves as an inspiring mentor for the whole staff. He exhibits strong interpersonal skills and a unique capacity for empathy, motivating teams to care deeply about project success." },
  { name: "Rommel Sharma", role: "Digital Transformation Leader", quote: "Technically very sound and always willing to share his knowledge, Dinesh creates an environment that is light, positive, and highly productive." },
  { name: "Seema Kamble Nadkarni", role: "Flutter Developer", quote: "Dinesh is a very supportive manager who encourages team members to give their best while exploring different technologies and modules." },
  { name: "Sandeep Garud", role: "CEO", quote: "A sincere and meticulous planner, Dinesh sets clear goals and inspires confidence across the team." },
  { name: "Anand Mitragotri", role: "Program Manager", quote: "An intelligent and motivated leader who guides multi‑layered teams and solves complex technical and cultural challenges." },
  { name: "Manisha Bathia", role: "Project Manager", quote: "A disciplined and enthusiastic manager who creates a welcoming, high‑performing team culture." },
];

const Testimonials = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const animRef = useRef<number>(0);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const track = trackRef.current;
    if (!track) return;
    let autoFlow = true, isDragging = false, lastX = 0, velocity = 0;

    const animate = () => {
      if (!isDragging && autoFlow) offsetRef.current -= 1.0;
      if (!isDragging && !autoFlow) {
        offsetRef.current += velocity;
        velocity *= 0.95;
        if (Math.abs(velocity) < 0.1) { autoFlow = true; velocity = 0; }
      }
      if (Math.abs(offsetRef.current) > track.scrollWidth / 2) offsetRef.current = 0;
      track.style.transform = `translateX(${offsetRef.current}px)`;
      animRef.current = requestAnimationFrame(animate);
    };

    const onDown = (x: number) => { isDragging = true; autoFlow = false; lastX = x; velocity = 0; };
    const onMove = (x: number) => { if (!isDragging) return; velocity = x - lastX; offsetRef.current += velocity; lastX = x; };
    const onEnd = () => { isDragging = false; };

    track.addEventListener("mousedown", (e) => onDown(e.clientX));
    track.addEventListener("touchstart", (e) => onDown(e.touches[0].clientX));
    window.addEventListener("mousemove", (e) => onMove(e.clientX));
    window.addEventListener("touchmove", (e) => onMove(e.touches[0].clientX));
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchend", onEnd);

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const allCards = [...testimonials, ...testimonials];

  return (
    <div className="min-h-screen overflow-x-clip relative">
      <Link to="/#profile-extensions" className="fixed top-6 left-5 md:left-7 z-50 text-primary text-sm font-mono px-3 py-2 rounded-xl bg-card/90 backdrop-blur-lg border border-primary/20 shadow-md hover:translate-y-[-2px] transition-all duration-300 no-underline">
        ← Back to About Me
      </Link>

      <section className="pt-36 pb-20 px-[5%] md:px-[10%]">
        <div ref={headerRef} className={`max-w-[1100px] mx-auto mb-20 scroll-hidden ${headerVisible ? "scroll-visible" : ""}`}>
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_0.6fr] gap-10 items-center">
            <div>
              <span className="font-mono text-primary text-xs tracking-[2px]">TRUST, IN PRACTICE</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] mt-3 text-foreground">
                Leadership is felt<br />before it is explained
              </h1>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--text-body)]">
                Reflections from leaders, peers, and collaborators who have experienced clarity and leadership presence first‑hand.
              </p>
            </div>
            <div>
              <div className="w-[140px] h-[2px] bg-gradient-to-r from-primary to-transparent animate-pulse-line" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl mb-4 text-foreground">What it feels like to work together</h2>
        <p className="max-w-[760px] text-[var(--text-body)] leading-relaxed mb-16">
          Voices from people who have worked closely with me.
        </p>

        <div className="overflow-hidden cursor-grab select-none" style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}>
          <div ref={trackRef} className="flex gap-10 md:gap-16 w-max">
            {allCards.map((t, i) => (
              <div
                key={i}
                onClick={() => setSelectedIdx(i % testimonials.length)}
                className={`w-[300px] sm:w-[360px] flex-shrink-0 bg-card border rounded-3xl p-8 md:p-10 shadow-md cursor-pointer hover-lift transition-all duration-300 ${
                  selectedIdx === i % testimonials.length ? "border-primary shadow-[var(--glow-strong)]" : "border-border"
                }`}
              >
                <p className="text-sm md:text-base leading-relaxed text-[var(--text-body)]">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-dashed border-border">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">{t.name[0]}</div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedIdx !== null && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-xl flex items-center justify-center z-[9999] p-4 animate-fade-in-scale" onClick={() => setSelectedIdx(null)}>
          <div className="max-w-[720px] w-full bg-card border border-primary/30 rounded-3xl p-10 md:p-12 shadow-xl relative animate-fade-in-scale" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedIdx(null)} className="absolute top-5 right-6 text-2xl text-muted-foreground hover:text-primary transition-colors">×</button>
            <p className="text-base md:text-lg leading-relaxed text-foreground">"{testimonials[selectedIdx].quote}"</p>
            <div className="flex items-center gap-3 mt-7 pt-5 border-t border-dashed border-border">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">{testimonials[selectedIdx].name[0]}</div>
              <div>
                <div className="text-sm font-semibold text-foreground">{testimonials[selectedIdx].name}</div>
                <div className="text-xs text-muted-foreground">{testimonials[selectedIdx].role}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;
