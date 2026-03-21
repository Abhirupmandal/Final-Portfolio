import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { coachingLabData, ToolData, Question } from "@/data/coachingLabData";
import { ArrowLeft, ChevronRight, Activity, BrainCircuit, RefreshCcw } from "lucide-react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend,
  ScatterChart, Scatter, ZAxis, Cell
} from "recharts";

// Mock Data Generators for Charts
const generateRadarData = () => [
  { subject: 'Visibility', A: Math.floor(Math.random() * 5) + 5, fullMark: 10 },
  { subject: 'Communication', A: Math.floor(Math.random() * 5) + 5, fullMark: 10 },
  { subject: 'Ownership', A: Math.floor(Math.random() * 5) + 5, fullMark: 10 },
  { subject: 'Decision Speed', A: Math.floor(Math.random() * 5) + 5, fullMark: 10 },
  { subject: 'Empathy', A: Math.floor(Math.random() * 5) + 5, fullMark: 10 },
];

const generateBarData = () => [
  { name: 'Control', value: Math.floor(Math.random() * 40) + 60 },
  { name: 'Trust', value: Math.floor(Math.random() * 50) + 30 },
  { name: 'Execution', value: Math.floor(Math.random() * 40) + 60 },
  { name: 'Vision', value: Math.floor(Math.random() * 50) + 40 },
];

const generateScatterData = () => [
  { x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100), z: 200 },
];

const ToolExperience = () => {
  const { id } = useParams();
  const tool = coachingLabData.find((t) => t.id === id);
  const [stage, setStage] = useState<"intro" | "diagnostic" | "dialogue" | "analyzing" | "report">("intro");
  
  // Diagnostic State
  const [index, setIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [responses, setResponses] = useState<number[]>([]);

  // Dialogue State
  const [messages, setMessages] = useState<{role: 'user' | 'coach', text: string}[]>([
    { role: 'coach', text: "Welcome to the thought space. What decision or challenge is currently dominating your cognitive bandwidth?" }
  ]);
  const [inputVal, setInputVal] = useState("");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, stage]);

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <h1 className="text-3xl text-foreground font-semibold">Diagnostic Not Found</h1>
        <Link to="/" className="mt-6 text-primary underline">Return to Coaching Lab</Link>
      </div>
    );
  }

  const handleOption = (val: number) => {
    const newResponses = [...responses, val];
    setResponses(newResponses);
    
    if (tool.questions && index + 1 >= tool.questions.length) {
      setStage("analyzing");
      setTimeout(() => setStage("report"), 2500); // 2.5s analysis simulation
    } else {
      setIndex(index + 1);
      setAnimKey((k) => k + 1);
    }
  };

  const handleSendMessage = () => {
    if(!inputVal.trim()) return;
    const newMsgs = [...messages, { role: 'user' as const, text: inputVal }];
    setMessages(newMsgs);
    setInputVal("");
    
    // Simple mock response generator for the premium chat feel
    setTimeout(() => {
      const coachReplies = [
        "Interesting. What underlying assumption makes you believe that is the only option?",
        "If we remove the emotional weight of stakeholder expectations, what is the raw, logical move?",
        "That sounds like a symptom. What is the actual root systemic issue here?",
        "Are you optimizing for comfort right now, or are you optimizing for growth?",
        "Let's pressure-test that. If you execute that tomorrow, what fractures first?"
      ];
      setMessages([...newMsgs, { 
        role: 'coach', 
        text: coachReplies[Math.floor(Math.random() * coachReplies.length)] 
      }]);
    }, 1200);
  };

  const endDialogue = () => {
    setStage("analyzing");
    setTimeout(() => setStage("report"), 2500);
  };

  const renderChart = () => {
    if (!tool.graphType) return null;
    
    const COLORS = ['#10b981', '#3b82f6', '#f43f5e', '#f59e0b', '#8b5cf6'];

    if (tool.graphType === "Radar Chart") {
      return (
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={generateRadarData()}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--foreground)' }} />
              <Radar name="Performance" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      );
    }
    
    if (tool.graphType === "Bar Chart") {
      return (
        <div className="h-[300px] w-full">
           <ResponsiveContainer width="100%" height="100%">
            <BarChart data={generateBarData()} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--foreground)" opacity={0.5} />
              <YAxis stroke="var(--foreground)" opacity={0.5} />
              <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]}>
                {generateBarData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (tool.graphType === "2-axis map") {
      return (
        <div className="h-[300px] w-full bg-card/50 rounded-xl border border-border flex items-center justify-center relative shadow-inner">
           <div className="absolute inset-y-0 left-1/2 w-px bg-border/50" />
           <div className="absolute inset-x-0 top-1/2 h-px bg-border/50" />
           <div className="absolute top-4 text-xs text-muted-foreground font-mono">LONG-TERM GROWTH</div>
           <div className="absolute bottom-4 text-xs text-muted-foreground font-mono">SHORT-TERM COMFORT</div>
           <div className="absolute right-4 text-xs text-muted-foreground font-mono" style={{writingMode: 'vertical-rl'}}>HIGH RISK</div>
           <div className="absolute left-4 pos text-xs text-muted-foreground font-mono" style={{transform: 'rotate(180deg)', writingMode: 'vertical-rl'}}>LOW RISK</div>
           
           <div className="w-6 h-6 rounded-full bg-primary/80 animate-pulse absolute shadow-[0_0_15px_rgba(16,185,129,0.5)]" style={{ top: '30%', left: '70%', transform: 'translate(-50%, -50%)' }} />
        </div>
      )
    }

    // Default aesthetic fallback for other types (Score Meter, Cycle Diagram, Scale)
    return (
      <div className="py-8 px-4 flex flex-col items-center">
        <div className="relative w-48 h-48 rounded-full border-[8px] border-muted flex items-center justify-center overflow-hidden">
           <div className="absolute bottom-0 left-0 right-0 bg-primary/20 h-3/4" />
           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/60 to-transparent h-1/2" />
           <span className="text-5xl font-bold text-foreground relative z-10">72<span className="text-xl text-primary">%</span></span>
        </div>
        <p className="mt-4 font-mono text-sm text-muted-foreground tracking-widest uppercase">Alignment Index</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col p-6 lg:p-12 relative overflow-hidden bg-[var(--section-alt)]">
      {/* Dynamic Background FX */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-primary/10 blur-[180px] opacity-40 -top-[200px] -left-[200px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button onClick={() => window.history.back()} className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Exit Lab
          </button>
          <div className="flex items-center gap-2 bg-background border border-border px-4 py-1.5 rounded-full text-xs font-mono text-muted-foreground shadow-sm">
            <tool.icon className="w-3.5 h-3.5 text-primary" />
            {tool.tag}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          
          {/* INTRO STAGE */}
          {stage === "intro" && (
            <div className="animate-fade-in-up text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6">
                {tool.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
                {tool.desc}
              </p>
              
              <div className="bg-card border border-border rounded-2xl p-8 mb-12 shadow-sm text-left max-w-2xl mx-auto">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">Diagnostic Targets</h4>
                <ul className="space-y-3">
                  {tool.points.map((pt, i) => (
                    <li key={i} className="flex items-center text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-4" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => setStage(tool.type === "diagnostic" ? "diagnostic" : "dialogue")}
                className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg shadow-[var(--glow-primary)] hover:shadow-[var(--glow-strong)] hover:translate-y-[-2px] transition-all duration-300"
              >
                Initiate Sequence
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* DIAGNOSTIC STAGE */}
          {stage === "diagnostic" && tool.questions && (
            <div key={animKey} className="w-full max-w-3xl mx-auto bg-card border border-border rounded-[2rem] p-8 md:p-14 shadow-xl animate-fade-in-scale">
               <div className="flex items-center justify-between mb-10">
                 <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Diagnostic Sequence</span>
                 <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">
                   {index + 1} / {tool.questions.length}
                 </span>
               </div>
               
               <h2 className="text-2xl md:text-3xl font-medium text-foreground leading-snug mb-10">
                 {tool.questions[index].q}
               </h2>

               <div className="flex flex-col gap-4">
                 {tool.questions[index].opts.map((opt, i) => (
                   <button
                     key={i}
                     onClick={() => handleOption(i)}
                     className="w-full p-5 rounded-xl bg-background border border-border text-foreground text-left hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 group flex items-start"
                     style={{ animationDelay: `${i * 80}ms` }}
                   >
                     <div className="w-6 h-6 shrink-0 rounded-full border border-border mr-4 mt-0.5 group-hover:border-primary group-hover:bg-primary/20 transition-all flex items-center justify-center text-[10px] text-primary">
                       {String.fromCharCode(65 + i)}
                     </div>
                     <span className="text-base leading-relaxed">{opt}</span>
                   </button>
                 ))}
               </div>

               <div className="mt-12 h-1 bg-background rounded-full overflow-hidden">
                 <div className="h-full bg-primary transition-all duration-700 ease-out" style={{ width: `${((index) / tool.questions.length) * 100}%` }} />
               </div>
            </div>
          )}

          {/* DIALOGUE STAGE */}
          {stage === "dialogue" && (
            <div className="flex flex-col h-[70vh] bg-card border border-border rounded-[2rem] shadow-xl overflow-hidden animate-fade-in-scale">
              <div className="flex items-center justify-between p-6 border-b border-border bg-background/50">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-semibold text-foreground">Secure Channel Active</span>
                </div>
                <button onClick={endDialogue} className="text-xs font-semibold px-4 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-colors">
                  Conclude Session
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                    <div className={`max-w-[80%] rounded-2xl p-5 text-[15px] leading-relaxed ${m.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-background border border-border text-foreground rounded-tl-sm shadow-sm'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border bg-background/50">
                <div className="flex items-end gap-3">
                  <textarea 
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                    placeholder="Articulate your thought process here..."
                    className="flex-1 min-h-[60px] max-h-[150px] resize-none bg-background border border-border rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow"
                  />
                  <button onClick={handleSendMessage} className="h-[60px] px-6 rounded-xl bg-primary text-white font-medium shadow-sm hover:shadow-md transition-shadow flex items-center justify-center shrink-0">
                    Transmit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ANALYZING STAGE */}
          {stage === "analyzing" && (
            <div className="flex flex-col items-center justify-center animate-pulse">
              <BrainCircuit className="w-20 h-20 text-primary mb-8" />
              <h2 className="text-2xl font-semibold tracking-wide text-foreground">Synthesizing Patterns</h2>
              <p className="mt-3 text-muted-foreground font-mono text-sm uppercase tracking-widest">Generating Executive Diagnostic</p>
              <div className="mt-12 w-48 h-1 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-primary animate-progress-indeterminate" />
              </div>
            </div>
          )}

          {/* REPORT STAGE */}
          {stage === "report" && (
            <div className="w-full bg-background border border-border rounded-[2rem] overflow-hidden shadow-2xl animate-fade-in-up">
              {/* Report Header */}
              <div className="bg-card p-10 border-b border-border relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <span className="text-primary font-mono text-xs font-bold tracking-[3px] uppercase block mb-3">Diagnostic Output</span>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">{tool.title} Report</h2>
                <div className="mt-6 inline-flex items-center gap-2 bg-background border border-border px-4 py-2 rounded-lg">
                   <Activity className="w-4 h-4 text-primary" />
                   <span className="text-sm font-medium text-foreground">Insight Generation Complete</span>
                </div>
              </div>

              {/* Report Body */}
              <div className="grid lg:grid-cols-5 gap-0">
                {/* Left Col: Analysis & Summary */}
                <div className="lg:col-span-3 p-10 border-r border-border flex flex-col gap-12">
                  <div>
                    <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Core Executive Insight</h3>
                    <p className="text-xl md:text-2xl text-foreground font-medium leading-snug border-l-4 border-primary pl-6 py-2">
                       "{tool.reportConfig?.insight || 'Analyzing your behavioral patterns... Please wait for a complete systematic diagnosis.'}"
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Identified Weaknesses</h3>
                      <ul className="space-y-3">
                        {tool.reportConfig?.weaknesses.map((w, idx) => (
                          <li key={idx} className="flex gap-3 text-sm text-[var(--text-body)]">
                            <span className="text-destructive font-bold">•</span> {w}
                          </li>
                        )) || (
                          <li className="flex gap-3 text-sm text-[var(--text-body)]"><span className="text-destructive font-bold">•</span> Insufficient data for precise weakness extraction.</li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Critical Shift Required</h3>
                      <div className="bg-primary/10 border border-primary/20 rounded-xl p-5 text-sm font-medium text-foreground">
                        {tool.reportConfig?.shift || 'Awaiting further systemic execution to determine the optimal strategic pivot.'}
                      </div>
                    </div>
                  </div>

                  <div>
                     <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Your Reflective Filter</h3>
                     <div className="bg-card rounded-xl p-6 border border-border italic text-foreground/80 font-serif">
                       "{tool.reportConfig?.question || 'What is the most uncomfortable conversation you are currently avoiding?'}"
                     </div>
                  </div>
                </div>

                {/* Right Col: Graphs */}
                <div className="lg:col-span-2 bg-card p-10 flex flex-col justify-center">
                   <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-8 text-center">Performance Telemetry ({tool.graphType})</h3>
                   {renderChart()}
                   
                   <p className="text-xs text-muted-foreground text-center mt-8">
                     Data points extrapolated based on internal diagnostic patterns and response velocity markers.
                   </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="bg-card border-t border-border p-8 flex justify-between items-center bg-background/50">
                 <button onClick={() => { setStage("intro"); setIndex(0); setResponses([]); setMessages([{ role: 'coach', text: "Welcome back. Shall we explore further?" }]); }} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                   <RefreshCcw className="w-4 h-4" /> Reset Diagnostic
                 </button>
                 <a href="/#contact" className="px-8 py-3 bg-foreground text-background rounded-full font-semibold text-sm hover:bg-foreground/90 transition-colors shadow-lg">
                   Book De-brief Session
                 </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ToolExperience;
