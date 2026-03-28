import { Link } from "react-router-dom";
import { Linkedin, Youtube, ArrowUp } from "lucide-react";

// Instagram SVG icon (not in lucide-react)
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

// WhatsApp SVG icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.297.446-.445.149-.149.199-.258.298-.43.099-.174.049-.327-.025-.476-.073-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.868.118.571-.086 1.758-.718 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
import dwLogo from "@/assets/dw-logo.jpeg";

const footerLinks = [
  { label: "About Me", href: "/#about" },
  { label: "Coaching Lab", href: "/#services" },
  { label: "Thinking Room", href: "/#tools" },
  { label: "Begin the Conversation", href: "/#contact" },
];

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/dineshkwadhwani/", label: "LinkedIn" },
  { icon: InstagramIcon, href: "https://www.instagram.com/thecoachdinesh", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/@TheCoachDinesh", label: "YouTube" },
  { icon: WhatsAppIcon, href: "https://wa.me/919767676738", label: "WhatsApp" },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const el = document.getElementById(href.replace("/#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="px-[5%] md:px-[8%] py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] gap-12 md:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <img src={dwLogo} alt="Dinesh Wadhwani" className="h-12 w-fit object-contain brightness-0 invert" />
            <p className="text-secondary-foreground/70 text-sm leading-relaxed max-w-[320px]">
              Executive Leadership Coach helping professionals build clarity, confidence, and strategic thinking skills.
            </p>
            <div className="flex gap-3 mt-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-secondary-foreground/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-sm tracking-[2px] mb-5 text-secondary-foreground/60">QUICK LINKS</h4>
            <div className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-sm text-secondary-foreground/70 hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </button>
              ))}
              <Link to="/work-experience" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors duration-300">
                Work Experience
              </Link>
              <Link to="/education" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors duration-300">
                Education
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-sm tracking-[2px] mb-5 text-secondary-foreground/60">GET IN TOUCH</h4>
            <div className="flex flex-col gap-3 text-sm text-secondary-foreground/70">
              <p>+91 97676 76738</p>
              <p>Mumbai, India</p>
              <button
                onClick={() => handleNavClick("/#contact")}
                className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm w-fit hover:shadow-[var(--glow-primary)] transition-all duration-300"
              >
                Start a Conversation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-secondary-foreground/10 px-[5%] md:px-[8%] py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-secondary-foreground/50">
          © {new Date().getFullYear()} Dinesh Wadhwani. All rights reserved.
        </p>
        <button
          onClick={scrollToTop}
          className="w-9 h-9 rounded-full border border-secondary-foreground/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
