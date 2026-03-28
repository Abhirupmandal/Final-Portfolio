import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { servicesData } from "@/data/servicesData";

const ServicesSection = () => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation();
  const s = servicesData[active];
  const Icon = s.icon;

  return (
    <section id="services" className="px-[5%] md:px-[8%] py-28 relative">
      <div className="absolute w-[420px] h-[420px] rounded-full bg-primary/20 blur-[160px] opacity-30 -top-[120px] -left-[120px] animate-float-orb pointer-events-none" />
      <div className="absolute w-[420px] h-[420px] rounded-full bg-accent/30 blur-[160px] opacity-30 -bottom-[140px] -right-[140px] animate-float-orb-reverse pointer-events-none" />

      <div ref={ref} className={`relative z-10 scroll-hidden ${isVisible ? "scroll-visible" : "opacity-100 md:opacity-0"}`}>
        <h2 className="text-3xl md:text-4xl text-foreground">Advisory Engagements</h2>
        <p className="max-w-[760px] mt-3 text-[var(--text-body)] leading-relaxed text-base md:text-lg">
          The Coaching Lab is designed as a structured executive development environment.
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8">
          <div className="bg-card backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-border flex flex-col gap-2 shadow-lg">
            {servicesData.map((svc, i) => {
              const SvcIcon = svc.icon;
              return (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`text-left px-4 py-3 rounded-2xl transition-all duration-300 text-sm flex items-center gap-3 ${
                    active === i
                      ? "bg-primary/10 border border-primary/30 shadow-[var(--glow-primary)] text-primary font-medium"
                      : "hover:bg-muted border border-transparent text-foreground"
                  }`}
                >
                  <SvcIcon className="w-5 h-5 shrink-0" />
                  {svc.title}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="bg-card backdrop-blur-xl p-7 md:p-10 rounded-3xl border border-border shadow-lg"
            >
              {/* ✅ ONLY CHANGED PART */}
            <div className="w-full rounded-2xl overflow-hidden shadow-md border border-border mb-6 bg-black/5 flex items-center justify-center">
  <img
    src={s.image}
    alt={s.title}
  className="w-full h-full object-cover object-[center_60%] transition-transform duration-700 hover:scale-105"         
    loading="lazy"
  />
</div>

              <div className="flex items-center gap-3 mb-3">
                <Icon className="w-6 h-6 text-primary" />
                <h3 className="text-xl md:text-2xl text-foreground">{s.title}</h3>
              </div>
              <p className="leading-relaxed text-[var(--text-body)] text-sm md:text-base">{s.desc}</p>
              <ul className="mt-4 ml-4 flex flex-col gap-1.5">
                {s.points.map((p, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/service/${s.id}`)}
                className="mt-6 inline-block px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-[var(--glow-primary)] hover:shadow-[var(--glow-strong)] transition-all duration-300"
              >
                Explore Now →
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;