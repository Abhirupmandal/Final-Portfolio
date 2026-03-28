import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const questions = [
  { q: "When confronted with organisational ambiguity, how do you typically orient your response?", opts: ["Immediate decisive action", "Structured analytical reflection", "Collaborative sense‑making", "Delayed engagement"] },
  { q: "How do you regulate emotional tone during high‑stakes leadership conversations?", opts: ["Direct assertiveness", "Calm analytical framing", "Empathic modulation", "Situational avoidance"] },
  { q: "What best describes your decision horizon?", opts: ["Short‑term tactical", "Balanced operational", "Strategic foresight", "Reactive adjustment"] },
  { q: "How frequently do you engage in structured leadership reflection?", opts: ["Rarely", "Occasionally", "Consistently", "Systematically"] },
  { q: "Your influence style tends toward:", opts: ["Authority driven", "Evidence driven", "Relationship driven", "Adaptive situational"] },
  { q: "When facing failure, your dominant response is:", opts: ["Immediate correction", "Root cause analysis", "Learning integration", "External attribution"] },
  { q: "How do you approach cross‑functional conflict?", opts: ["Directive resolution", "Data‑anchored dialogue", "Facilitated alignment", "Passive distancing"] },
  { q: "Leadership growth for you primarily means:", opts: ["Position advancement", "Capability expansion", "Influence depth", "Situational adaptation"] },
  { q: "How do you interpret organisational change signals?", opts: ["Operational disruption", "Strategic opportunity", "Cultural evolution", "Uncertain noise"] },
  { q: "Your leadership identity is currently closest to:", opts: ["Emerging executor", "Developing integrator", "Strategic architect", "Adaptive explorer"] },
];

const LeadershipTest = () => {
  const [stage, setStage] = useState<"intro" | "quiz" | "done">("intro");
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const handleOption = (val: number) => {
    setScore(score + val);
    if (index + 1 >= questions.length) {
      setStage("done");
    } else {
      setIndex(index + 1);
      setAnimKey((k) => k + 1);
    }
  };

  const getResult = () => {
    if (score <= 10) return "Emerging Leader — You show potential with room for strategic depth.";
    if (score <= 20) return "Developing Integrator — Your leadership is growing in influence and clarity.";
    return "Strategic Architect — You demonstrate mature leadership cognition and foresight.";
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center p-6 relative overflow-x-clip bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/15 blur-[160px] opacity-60 -top-[150px] -left-[100px] animate-float-orb" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-accent/20 blur-[160px] opacity-60 -bottom-[180px] -right-[100px] animate-float-orb-reverse" />
      </div>

      {stage === "intro" && (
        <div className="w-full max-w-[95%] md:max-w-[1000px] p-10 md:p-20 rounded-[40px] bg-card border border-border shadow-xl text-center animate-fade-in-scale">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-5 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent tracking-wide">
            Leadership Intelligence Lab
          </h1>
          <p className="text-base md:text-xl leading-relaxed text-[var(--text-body)]">
            This immersive assessment explores decision maturity, influence architecture, reflective depth, and long‑range strategic cognition.
          </p>
          <button onClick={() => setStage("quiz")} className="mt-10 md:mt-14 px-10 md:px-20 py-4 md:py-5 rounded-full text-base md:text-lg font-semibold text-primary-foreground bg-primary shadow-[var(--glow-strong)] hover:translate-y-[-6px] hover:scale-105 transition-all duration-300">
            Begin Leadership Evaluation
          </button>
          <div className="mt-8">
            <Link to="/" className="text-primary text-sm story-link">← Back to Home</Link>
          </div>
        </div>
      )}

      {stage === "quiz" && (
        <div key={animKey} className="w-full max-w-[95%] md:max-w-[800px] p-10 md:p-16 rounded-[32px] bg-card border border-border shadow-xl animate-fade-in-scale">
          <h2 className="text-xl sm:text-2xl md:text-3xl mb-8 text-foreground">{questions[index].q}</h2>
          <div className="flex flex-col gap-3">
            {questions[index].opts.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOption(i)}
                className="w-full px-5 py-4 md:py-5 rounded-2xl bg-muted/50 border border-border text-foreground text-sm md:text-base text-left hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-[1.02] hover:shadow-[var(--glow-primary)] transition-all duration-300"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="mt-6 text-xs text-muted-foreground text-center">Question {index + 1} / {questions.length}</div>
          <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
          </div>
        </div>
      )}

      {stage === "done" && (
        <div className="w-full max-w-[95%] md:max-w-[800px] p-10 md:p-16 rounded-[32px] bg-card border border-border shadow-xl text-center animate-fade-in-scale">
          <h2 className="text-2xl md:text-4xl mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Assessment Complete</h2>
          <p className="text-lg md:text-xl leading-relaxed mb-8 text-foreground">{getResult()}</p>
          <p className="text-sm text-muted-foreground mb-10">Score: {score} / {(questions.length - 1) * 3}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => { setStage("intro"); setIndex(0); setScore(0); }} className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-[var(--glow-primary)] hover:shadow-[var(--glow-strong)] hover:translate-y-[-2px] transition-all duration-300">Retake Assessment</button>
            <Link to="/" className="px-8 py-3 rounded-full border border-border text-foreground hover:bg-muted transition-all duration-300 text-center">Back to Home</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadershipTest;
