import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Building2 } from "lucide-react";
import dineshSirImg from "@/assets/Dinesh-sir2.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/* ---------- Animated Counter ---------- */
const CountUp = ({ end, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;

      const duration = 1500;
      const startTime = performance.now();

      const animate = (t) => {
        const progress = Math.min((t - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ---------- Stats ---------- */
const stats = [
  { number: 27, suffix: "+ yrs", label: "Engineering & Product Leadership" },
  { number: 500, suffix: "+", label: "People / Resources Influenced" },
  { number: 8, suffix: "+", label: "Product Lines / Platforms" },
  { text: "Multi-Geo", label: "Global Delivery Environments" },
];

/* ---------- Phases ---------- */
const phases = [
  {
    title: "Foundation Phase",
    desc: "Deep technical grounding through hands-on experience, problem solving, and delivery ownership.",
  },
  {
    title: "Leadership Growth Phase",
    desc: "Transition into leading teams and programs, balancing delivery with people dynamics.",
  },
  {
    title: "Transformation Phase",
    desc: "Stepping into broader leadership roles, influencing larger teams, driving career growth, and shaping organisational strategy.",
  },
  {
    title: "Advisory Phase",
    desc: "Shifting from direct control to advisory influence — supporting senior leaders in sharpening judgement.",
  },
];

/* ---------- Companies ---------- */
const leadershipRoles = [
  { name: "NICE Ltd", role: "Senior Director of Engineering", duration: "Sep 2021 – Present", details: [
"Senior engineering leader driving global R&D initiatives for AI-powered customer experience and workforce solutions.",
"Leads large distributed teams delivering cloud-native enterprise products with high availability.",
"Focuses on innovation, product delivery, operational excellence, and strategic alignment.",
"Influences large-scale revenue growth and global engineering execution."
] },
  { name: "Capita SIMS (India) P. Ltd.", role: "Head of Engineering / Product Development", duration: "May 2016 – Sep 2021", details: [
"Led engineering and product development for education software used by thousands of schools globally.",
"Managed distributed teams, product roadmap, and delivery execution.",
"Championed cloud transformation, improved quality and efficiency.",
"Collaborated with international leadership to drive business growth and scalable enterprise product solutions."
]},
  { name: "IBM India P. Ltd", role: "Senior Manager Engineering", duration: "Mar 2010 – May 2016", details: [
"Managed engineering teams delivering enterprise procurement software solutions.",
"Led Agile adoption, product lifecycle execution, and engineering best practices.",
"Built high-performing teams while improving delivery efficiency and software quality.",
"Played a key role in scaling enterprise solutions and driving product innovation for global clients."
]},
  { name: "CoreObjects India P. Ltd.", role: "Engineering Manager", duration: "Sep 2008 – Apr 2010", details: [
"Oversaw engineering delivery and UI competency management for enterprise products.",
"Led development teams, improved engineering processes, and ensured quality delivery.",
"Focused on product design, technical execution, and enhancing development efficiency.",
"Supported client solutions through strong leadership and technical direction."
] },
];

const engineeringRoles = [
  { name: "Xpanxion International", role: "Senior Program Manager", duration: "Dec 2005 – Aug 2008", details: [
"Managed strategic software programs for international clients, coordinating multiple teams and projects.",
"Ensured timely delivery, quality execution, and stakeholder alignment.",
"Focused on project governance, process optimization, and client satisfaction.",
"Delivered complex enterprise software initiatives across distributed engineering environments."
]},
  { name: "Zensar Technologies Ltd.", role: "Project Manager", duration: "Mar 2002 – Dec 2005", details: [
"Led end-to-end enterprise software projects, managing development teams, client communication, and delivery timelines.",
"Ensured project quality, efficiency, and stakeholder satisfaction.",
"Built strong project management experience while delivering technology solutions for global customers.",
"Supported delivery across various business domains."
] },
  { name: "Ajilon LLC", role: "Technology Consultant", duration: "May 2001 – Mar 2002", details: [
"Worked as a technology consultant on enterprise client projects, including web portal development.",
"Collaborated with distributed teams to deliver software solutions and consulting services.",
"Gained international exposure while supporting design, development, and deployment of enterprise applications.",
"Supported large corporate clients with technology solutions."
] },
  { name: "Diaspark Inc.", role: "Software Consultant", duration: "Jan 2000 – May 2001", details: [
"Developed enterprise software solutions primarily using Java technologies.",
"Worked on financial services projects and supported client delivery initiatives.",
"Strengthened technical expertise while collaborating with international teams.",
"Contributed to scalable software development for enterprise business environments."
] },
];

/* ---------- Scroll Animation ---------- */
const ScrollReveal = ({ children, delay = 0 }) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="px-[5%] md:px-[8%] py-20 md:py-28 bg-[var(--section-alt)]">

    {/* Coaching Philosophy */}
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      <ScrollReveal>
        <div>
          <span className="text-primary tracking-[3px] text-xs font-mono">ABOUT ME</span>

          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl leading-tight">
            The Coaching <span className="text-primary">Philosophy</span>
          </h2>

          <div className="mt-10 bg-card border rounded-2xl p-8 shadow-md">
            <p className="text-lg mb-6">
              "True growth comes not from shortcuts, but from understanding the systems beneath the surface."
            </p>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                CD
              </div>
              <div>
                <strong>Coach Dinesh</strong>
                <div className="text-sm text-muted-foreground">
                  Executive Leadership Coach
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Leadership Journey */}
      <ScrollReveal delay={200}>
        <div>
          <span className="text-primary tracking-[3px] text-xs font-mono">
            LEADERSHIP JOURNEY
          </span>

          <h3 className="mt-4 text-3xl">
            An evolution of responsibility, judgement, and influence
          </h3>

          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            {phases.map(p => (
              <div key={p.title} className="bg-card border rounded-xl p-6 shadow-sm">
                <strong>{p.title}</strong>
                <p className="text-sm text-muted-foreground mt-2">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>

    {/* Experience at Scale (smaller + left aligned) */}
    <div className="mt-12 lg:mt-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div className="bg-card border rounded-2xl p-5 sm:p-8 shadow-md max-w-xl mx-auto lg:mx-0">
        <h3 className="mb-4 text-xl md:text-2xl font-bold">Experience at Scale</h3>
        <div className="grid grid-cols-2 gap-6 sm:gap-8">
          {stats.map(s => (
            <div key={s.label}>
              <strong className="text-xl sm:text-2xl md:text-3xl text-primary block">
                {s.number ? <CountUp end={s.number} suffix={s.suffix} /> : s.text}
              </strong>
              <div className="text-[10px] sm:text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Profiler image */}
      <ScrollReveal delay={200}>
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[280px] sm:max-w-md">
            {/* Background decorative accent */}
            <div className="absolute inset-0 bg-primary/20 rounded-2xl translate-x-2 translate-y-3 sm:translate-x-3 sm:translate-y-4 -z-10"></div>
            <img 
              src={dineshSirImg} 
              alt="Coach Dinesh" 
              className="rounded-2xl shadow-xl w-full h-auto object-cover border border-border"
            />
          </div>
        </div>
      </ScrollReveal>
    </div>

    {/* Companies */}
    <div className="mt-28">
      <h3 className="text-3xl mb-8">Companies I Have Worked With</h3>

      <h4 className="font-semibold mb-4">Leadership Roles</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-stretch">
        {leadershipRoles.map((c) => (
          <Dialog key={c.name}>
            <DialogTrigger asChild>
              <div className="bg-card border rounded-xl shadow-sm transition-all hover:shadow-md hover:border-primary/40 cursor-pointer h-full flex flex-col group">
                <div className="p-5 flex-1 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <Building2 size={20} />
                    </div>
                    <ArrowUpRight size={18} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <strong className="text-base truncate w-full mb-1">{c.name}</strong>
                  <p className="text-sm text-foreground/80 mb-3 line-clamp-2">{c.role}</p>
                  <div className="mt-auto">
                    <p className="text-xs text-muted-foreground">{c.duration}</p>
                  </div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl flex items-center gap-2">
                  <Building2 className="text-primary" size={24} />
                  {c.name}
                </DialogTitle>
                <DialogDescription className="text-base font-medium text-foreground pt-1">
                  {c.role}
                </DialogDescription>
              </DialogHeader>
              <div className="py-2">
                <span className="inline-block px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground mb-4">
                  {c.duration}
                </span>
                <ul className="space-y-3">
                  {c.details.map((detail, idx) => (
                    <li key={idx} className="text-sm flex items-start text-muted-foreground">
                      <span className="text-primary mr-3 mt-0.5 font-bold">•</span>
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      <h4 className="font-semibold mt-10 mb-4">Engineering Roles</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-stretch">
        {engineeringRoles.map((c) => (
          <Dialog key={c.name}>
            <DialogTrigger asChild>
              <div className="bg-card border rounded-xl shadow-sm transition-all hover:shadow-md hover:border-primary/40 cursor-pointer h-full flex flex-col group">
                <div className="p-5 flex-1 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <Building2 size={20} />
                    </div>
                    <ArrowUpRight size={18} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <strong className="text-base truncate w-full mb-1">{c.name}</strong>
                  <p className="text-sm text-foreground/80 mb-3 line-clamp-2">{c.role}</p>
                  <div className="mt-auto">
                    <p className="text-xs text-muted-foreground">{c.duration}</p>
                  </div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl flex items-center gap-2">
                  <Building2 className="text-primary" size={24} />
                  {c.name}
                </DialogTitle>
                <DialogDescription className="text-base font-medium text-foreground pt-1">
                  {c.role}
                </DialogDescription>
              </DialogHeader>
              <div className="py-2">
                <span className="inline-block px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground mb-4">
                  {c.duration}
                </span>
                <ul className="space-y-3">
                  {c.details.map((detail, idx) => (
                    <li key={idx} className="text-sm flex items-start text-muted-foreground">
                      <span className="text-primary mr-3 mt-0.5 font-bold">•</span>
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>

    {/* Education + Testimonials upgraded */}
    <div id="profile-extensions" className="mt-28 grid md:grid-cols-2 gap-12">

      <Link to="/education" className="group block">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
          <span className="text-primary tracking-[2px] text-xs font-mono">
            PROFILE EXTENSION
          </span>
          <h3 className="mt-4 text-2xl font-semibold">My Education</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Academic foundations, certifications, and technical depth shaping professional leadership.
          </p>
          <div className="mt-6 inline-flex px-5 py-2 rounded-lg bg-green-500 text-white text-sm font-semibold group-hover:bg-green-600 transition">
            Explore Now →
          </div>
        </div>
      </Link>

      <Link to="/testimonials" className="group block">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
          <span className="text-primary tracking-[2px] text-xs font-mono">
            PROFESSIONAL VOICES
          </span>
          <h3 className="mt-4 text-2xl font-semibold">My Testimonials</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Feedback from leaders, colleagues, and clients across engineering and leadership roles.
          </p>
          <div className="mt-6 inline-flex px-5 py-2 rounded-lg bg-green-500 text-white text-sm font-semibold group-hover:bg-green-600 transition">
            Explore Now →
          </div>
        </div>
      </Link>

    </div>

  </section>
  );
};

export default AboutSection;