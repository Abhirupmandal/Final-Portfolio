import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { coachingLabData } from "@/data/coachingLabData";

const ToolsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="tools" className="px-[5%] md:px-[8%] py-32 md:py-40 bg-[var(--section-alt)] relative">
      <div ref={ref} className={`${isVisible ? "scroll-visible" : "opacity-100 md:opacity-0"}`}>
        <div className="text-center mb-14">
          <span className="text-primary tracking-[3px] text-xs font-mono">THINKING ROOM</span>
          <h2 className="text-3xl md:text-4xl mt-3 text-foreground">Strategic Thinking Lab</h2>
          <p className="max-w-[680px] mx-auto mt-4 text-[var(--text-body)] leading-relaxed text-sm md:text-base">
            A private intelligence layer designed to sharpen judgment and support leaders.
          </p>
        </div>

        <div className="max-w-[1100px] mx-auto w-full relative pb-24">
          {coachingLabData.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.title}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group sticky w-full mb-20 md:mb-[25vh] top-[80px] md:top-[120px] origin-top"
                style={{
                  top: `calc(90px + ${i * 25}px)`,
                  zIndex: 10 + i,
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-0 bg-card rounded-[2rem] border border-border shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-500">
                  {/* Image placeholder */}
                  <div className="h-[200px] md:h-full min-h-[240px] bg-gradient-to-br from-secondary/20 via-primary/10 to-accent/20 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-primary/10" />
                    <Icon className="w-16 h-16 text-primary/40 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute bottom-3 left-3 text-[10px] font-mono text-muted-foreground/50 tracking-wider">IMAGE PLACEHOLDER</div>
                  </div>

                  {/* Details */}
                  <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                    <span className="text-primary tracking-[2px] text-[10px] font-mono mb-2">{tool.tag}</span>
                    <h3 className="text-lg md:text-2xl text-foreground font-semibold">{tool.title}</h3>
                    <p className="mt-2 text-[var(--text-body)] text-xs sm:text-sm md:text-base leading-relaxed">{tool.desc}</p>
                    <ul className="mt-4 flex flex-col gap-1.5">
                      {tool.points.map((p) => (
                        <li key={p} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={`/lab/${tool.id}`}
                      className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-medium shadow-[var(--glow-primary)] hover:shadow-[var(--glow-strong)] hover:translate-y-[-2px] transition-all duration-300 w-fit text-sm"
                    >
                      Launch Tool →
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
