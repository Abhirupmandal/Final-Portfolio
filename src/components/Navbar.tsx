import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dwLogo from "@/assets/dw-logo.jpeg";

const navItems = [
  { label: "About Me", href: "/#about" },
  { label: "Coaching Lab", href: "/#services" },
  { label: "Thinking Room", href: "/#tools" },
  { label: "Begin the Conversation", href: "/#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;
    
    // Set to keep track of all currently intersecting sections
    const visibleSections = new Set<string>();
    // DOM order
    const sectionOrder = ["home", "about", "services", "tools", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        let changed = false;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target.id);
            changed = true;
          } else {
            if (visibleSections.has(entry.target.id)) {
              visibleSections.delete(entry.target.id);
              changed = true;
            }
          }
        });

        if (changed && visibleSections.size > 0) {
          // Find the active section by looking backwards through the order (lowest in DOM wins if overlapping) 
          for (let i = sectionOrder.length - 1; i >= 0; i--) {
            if (visibleSections.has(sectionOrder[i])) {
              setActiveSection(sectionOrder[i]);
              break;
            }
          }
        }
      },
      // Trigger intersection when any part of the section enters the middle 40% of the viewport. This safely catches very tall sections.
      { threshold: 0, rootMargin: "-30% 0px -30% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    
    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      setActiveSection(id); // Manual update for immediate feedback
      if (location.pathname !== "/") {
        window.location.href = href;
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full h-[70px] backdrop-blur-xl flex items-center justify-between px-5 md:px-12 z-[999] transition-all duration-500 ${scrolled ? "bg-card/95 shadow-lg border-b border-border" : "bg-transparent"}`}>
        <Link to="/" className="flex items-center">
          <img src={dwLogo} alt="Dinesh Wadhwani" className="h-10 md:h-12 object-contain" />
        </Link>

        <div className="hidden md:flex gap-4 lg:gap-7">
          {navItems.map((item) => {
            const id = item.href.replace("/#", "");
            const isActive = activeSection === id;
            return (
              <motion.button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`text-sm px-4 py-2 rounded-lg transition-all duration-300 relative ${
                  isActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-primary/10 border border-primary/30 rounded-lg shadow-[var(--glow-primary)]"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        <button className="md:hidden text-foreground z-[1001]" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[998] backdrop-blur-xl bg-card/90 flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between px-5 h-[70px] border-b border-border">
              <img src={dwLogo} alt="Dinesh Wadhwani" className="h-10 object-contain" />
              <button onClick={() => setMobileOpen(false)} className="text-foreground">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col px-6 pt-8 gap-2">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.35 }}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left text-lg text-foreground/80 hover:text-primary py-4 px-2 border-b border-border/50 transition-all duration-300"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
