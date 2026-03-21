import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const timeline = [
  { role: "Consultant", company: "Ajilon North America / Diaspark Inc", desc: "Built and delivered enterprise web systems in high‑expectation client environments.", points: ["Client‑facing engineering execution", "Foundational system architecture", "Delivery discipline under constraints"] },
  { role: "Project / Program Manager", company: "Zensar Technologies", desc: "Transitioned from individual delivery to accountable program ownership.", points: ["End‑to‑end program delivery", "Distributed team coordination", "Stakeholder alignment"] },
  { role: "Senior Program Manager", company: "Xpanxion", desc: "Led multi‑client programs with increasing organisational complexity.", points: ["Scaled delivery maturity", "Cross‑client governance", "Execution consistency"] },
  { role: "Engineering Manager", company: "Core Objects", desc: "Shifted focus from delivery to people, capability, and culture.", points: ["Engineering competency leadership", "Team growth and mentorship", "Operational discipline"] },
  { role: "Senior Manager – Engineering", company: "IBM", desc: "Operated at enterprise scale across products, platforms, and teams.", points: ["Large‑scale delivery ownership", "Business‑technology integration", "Strategic execution"] },
  { role: "Head of Engineering", company: "Capita SIMS", desc: "Led large organisations delivering education and enterprise platforms.", points: ["Portfolio and roadmap ownership", "Platform and team scaling", "Executive operational leadership"] },
];

const TimelineCard = ({ item, i }: { item: typeof timeline[0]; i: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  return (
    <div ref={ref} className={`relative pl-14 md:pl-0 md:ml-[50%] md:pl-10 pb-12 scroll-hidden ${isVisible ? "scroll-visible" : ""}`} style={{ transitionDelay: `${i * 100}ms` }}>
      <div className="absolute left-4 md:left-0 md:-translate-x-1/2 top-8 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_hsla(174,72%,40%,0.4)]" />
      <div className="bg-card border border-border rounded-2xl p-6 shadow-md hover-lift group relative">
        <span className="absolute -top-3 right-5 bg-primary text-primary-foreground text-[10px] px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">Responsibility Expanded</span>
        <h3 className="text-base md:text-lg font-semibold text-foreground">{item.role}</h3>
        <span className="text-primary text-sm mt-1 block">{item.company}</span>
        <p className="mt-3 text-sm text-[var(--text-body)] leading-relaxed">{item.desc}</p>
        <ul className="mt-3 pl-4 list-disc text-sm text-[var(--text-body)]">
          {item.points.map((p, j) => <li key={j} className="mb-1">{p}</li>)}
        </ul>
      </div>
    </div>
  );
};

const WorkExperience = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: currentRef, isVisible: currentVisible } = useScrollAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      <Link to="/#profile-extensions" className="fixed top-6 left-5 md:left-7 z-50 text-primary text-sm font-mono px-3 py-2 rounded-xl bg-card/90 backdrop-blur-lg border border-primary/20 shadow-md hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300 no-underline">
        ← Back to About Me
      </Link>

      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute w-[420px] h-[420px] rounded-full bg-primary/10 blur-[160px] opacity-50 -top-[120px] -left-[120px] animate-float-orb" />
        <div className="absolute w-[420px] h-[420px] rounded-full bg-accent/20 blur-[160px] opacity-50 -bottom-[140px] -right-[140px] animate-float-orb-reverse" />
      </div>

      <section ref={headerRef} className={`text-center pt-28 pb-16 px-[5%] md:px-[8%] scroll-hidden ${headerVisible ? "scroll-visible" : ""}`}>
        <span className="text-primary tracking-[3px] text-xs font-mono">PROFESSIONAL EVOLUTION</span>
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl text-foreground">Work Experience</h1>
        <p className="mt-4 max-w-[760px] mx-auto text-[var(--text-body)] text-base md:text-lg leading-relaxed">
          Executive engineering leadership with 27+ years of experience.
        </p>
      </section>

      <div className="text-center max-w-[760px] mx-auto mb-16 px-6">
        <p className="text-lg text-foreground/90">Responsibility did not jump — it expanded deliberately.</p>
        <p className="mt-3 text-sm text-muted-foreground">Each role reflects broader scope and deeper impact over time.</p>
      </div>

      <div className="relative max-w-[700px] mx-auto pb-20 px-6">
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary/50 to-transparent -translate-x-1/2" />
        {timeline.map((item, i) => <TimelineCard key={i} item={item} i={i} />)}
      </div>

      <div ref={currentRef} className={`relative max-w-[820px] mx-auto mb-20 mx-6 p-8 md:p-12 bg-gradient-to-br from-primary to-secondary rounded-3xl text-primary-foreground text-center shadow-[var(--glow-strong)] scroll-hidden-scale ${currentVisible ? "scroll-visible-scale" : ""}`}>
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-background text-primary text-[11px] px-4 py-1.5 rounded-full tracking-[2px] font-mono border border-primary/20">Current Focus</span>
        <h2 className="text-2xl md:text-3xl">Current Focus</h2>
        <p className="mt-4 text-sm md:text-base leading-relaxed">
          Senior Director of Engineering – NICE Ltd<br /><br />
          Operating at the executive layer where technology, people, and business strategy intersect.
        </p>
      </div>
    </div>
  );
};

export default WorkExperience;
