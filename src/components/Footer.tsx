import { Link } from "react-router-dom";
import { Linkedin, Twitter, Mail, Youtube, ArrowUp } from "lucide-react";
import dwLogo from "@/assets/dw-logo.jpeg";

const footerLinks = [
  { label: "About Me", href: "/#about" },
  { label: "Coaching Lab", href: "/#services" },
  { label: "Thinking Room", href: "/#tools" },
  { label: "Begin the Conversation", href: "/#contact" },
];

const socials = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Mail, href: "mailto:coach@dineshwadhwani.com", label: "Email" },
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
              <p>coach@dineshwadhwani.com</p>
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
