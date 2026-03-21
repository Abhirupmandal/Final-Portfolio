import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const education = [
  { title: "Master of Computer Applications", org: "XYZ University • 2020 – 2022", desc: "Specialised in Software Engineering and Distributed Systems." },
  { title: "Bachelor of Computer Science", org: "ABC College • 2017 – 2020", desc: "Built strong foundations in programming, data structures, and algorithms." },
];

const certs = [
  { title: "AWS Solutions Architect – Professional", org: "Amazon Web Services", year: "2022" },
  { title: "Kubernetes Administrator (CKA)", org: "Cloud Native Computing Foundation", year: "2021" },
  { title: "Google Cloud Professional Cloud Architect", org: "Google Cloud", year: "2020" },
  { title: "Certified Scrum Master", org: "Scrum Alliance", year: "2018" },
];

const publications = [
  { title: "Scaling Microservices for Enterprise Applications", org: "IEEE Software Engineering Conference", year: "2019" },
  { title: "Effective Mentorship Patterns in Software Engineering", org: "ACM Computing Surveys", year: "2021" },
];

const CardReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`scroll-hidden ${isVisible ? "scroll-visible" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const Education = () => {
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      <Link to="/#profile-extensions" className="fixed top-6 left-5 md:left-7 z-50 text-primary text-sm font-mono px-3 py-2 rounded-xl bg-card/90 backdrop-blur-lg border border-primary/20 shadow-md hover:translate-y-[-2px] transition-all duration-300 no-underline">
        ← Back to About Me
      </Link>

      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute w-[420px] h-[420px] rounded-full bg-primary/10 blur-[160px] opacity-50 -top-[140px] -left-[140px]" />
        <div className="absolute w-[420px] h-[420px] rounded-full bg-accent/20 blur-[160px] opacity-50 -bottom-[160px] -right-[160px]" />
      </div>

      <section className="px-[5%] md:px-[10%] pt-28 pb-20">
        <div ref={ref} className={`mb-16 scroll-hidden ${isVisible ? "scroll-visible" : ""}`}>
          <span className="font-mono text-primary tracking-[3px] text-xs">MY EDUCATION</span>
          <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl text-foreground">Academic Journey & Credentials</h1>
          <p className="mt-4 max-w-[760px] text-[var(--text-body)] text-sm md:text-base leading-relaxed">
            A curated view of formal education, professional certifications, and published work.
          </p>
        </div>

        <h2 className="text-2xl md:text-3xl mb-6 text-foreground">Education</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {education.map((e, i) => (
            <CardReveal key={e.title} delay={i * 150}>
              <div className="bg-card border border-border rounded-2xl p-7 hover-lift hover-glow shadow-md h-full">
                <strong className="text-foreground">{e.title}</strong>
                <div className="text-sm text-muted-foreground mt-1">{e.org}</div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{e.desc}</p>
              </div>
            </CardReveal>
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl mb-6 text-foreground">Professional Certifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {certs.map((c, i) => (
            <CardReveal key={c.title} delay={i * 100}>
              <div className="bg-card border border-border rounded-2xl p-7 hover-lift hover-glow shadow-md h-full">
                <strong className="text-foreground">{c.title}</strong>
                <div className="text-sm text-muted-foreground mt-1">{c.org}</div>
                <div className="text-primary text-xs font-mono mt-2">{c.year}</div>
              </div>
            </CardReveal>
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl mb-6 text-foreground">Publications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publications.map((p, i) => (
            <CardReveal key={p.title} delay={i * 150}>
              <div className="bg-card border border-border rounded-2xl p-7 hover-lift hover-glow shadow-md h-full">
                <strong className="text-foreground">{p.title}</strong>
                <div className="text-sm text-muted-foreground mt-1">{p.org}</div>
                <div className="text-primary text-xs font-mono mt-2">{p.year}</div>
              </div>
            </CardReveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Education;
