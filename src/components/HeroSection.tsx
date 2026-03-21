import { useEffect, useState } from "react";
import dineshImg from "@/assets/dinesh-sir.png";

const messages = [
  {
    headline: "Lead With Clarity. Execute With Confidence.",
    subtext:
      "I coach ambitious professionals and emerging leaders to think strategically, communicate decisively, and unlock their next level of performance.",
  },
  {
    headline: "From Potential to Executive Presence.",
    subtext:
      "I partner with high-performing professionals to sharpen decision-making, elevate leadership impact, and accelerate career progression.",
  },
  {
    headline: "Think Like a Leader. Act Like an Owner.",
    subtext:
      "Through structured, high-impact coaching, I help professionals develop strategic clarity, influence without authority, and deliver measurable business outcomes.",
  },
  {
    headline: "Clarity. Confidence. Career Acceleration.",
    subtext:
      "I coach professionals navigating complex workplaces to lead with conviction, manage stakeholders effectively, and build long-term influence.",
  },
  {
    headline: "Executive Insight. Personal Transformation.",
    subtext:
      "I now dedicate my 3 decades of expertise to coaching professionals who aspire to lead at higher levels with sharper thinking, stronger influence, and greater impact.",
  },
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setFade(true);
      }, 1000);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-[calc(100vh-20px)] grid grid-cols-1 md:grid-cols-[1.2fr_1fr] items-center gap-6 md:gap-16 px-[5%] md:px-[8%] pt-20 sm:pt-24 md:pt-[110px] pb-8 md:pb-16 relative overflow-hidden text-foreground"
      style={{ background: "var(--hero-gradient)" }}
    >
      <div className="flex flex-col gap-3 md:gap-5 text-center md:text-left items-center md:items-start animate-slide-in-left order-last md:order-first">

        <div className="bg-primary/15 px-3 py-2 md:px-4 md:py-2 rounded-2xl text-xs border border-primary/20 shadow-lg font-mono">
          ● Executive Mentorship Availability
        </div>

     

        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[82px] font-extrabold leading-[1.08]">
          I am Coach <span className="text-primary">Dinesh</span>
        </h1>

        {/* <div className="bg-muted border border-border px-4 py-2 rounded-xl text-xs shadow-lg font-mono">
          ✨ Executive Leadership Coach
        </div> */}

        {/* ROTATING MESSAGE */}
        <div
          className={`transition-opacity duration-1000 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-sm md:text-lg lg:text-xl font-semibold max-w-[620px] mt-2">
            {messages[index].headline}
          </h2>

          <p className="text-muted-foreground leading-[1.6] max-w-[600px] text-xs md:text-sm mt-2 min-h-[85px]">
            {messages[index].subtext}
          </p>
        </div>

        <div className="flex gap-3 flex-wrap justify-center md:justify-start mt-2">
          <button
            onClick={() => scrollTo("about")}
            className="bg-primary px-5 py-3 rounded-xl text-sm shadow hover:translate-y-[-2px] transition"
          >
            Continue →
          </button>

          <button
            onClick={() => scrollTo("contact")}
            className="bg-muted border border-border px-5 py-3 rounded-xl text-sm hover:bg-accent transition"
          >
            Get In Touch ✉
          </button>
        </div>
      </div>

      <div className="flex justify-center items-end animate-slide-in-right">
        <img
          src={dineshImg}
          alt="Coach Dinesh"
          className="w-[180px] sm:w-[240px] md:w-[400px] lg:w-[460px] object-contain drop-shadow-2xl"
        />
      </div>
    </section>
  );
};

export default HeroSection;