import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { servicesData } from "@/data/servicesData";

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", skillLevel: "Student", interest: "Leadership", message: "" });
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const servicesParam = params.get("services");
    
    if (servicesParam) {
      const selectedIds = servicesParam.split(",");
      const selectedTitles = selectedIds
        .map(id => servicesData.find(s => s.id === id)?.title)
        .filter(Boolean);
        
      if (selectedTitles.length > 0) {
        setForm(prev => ({
          ...prev,
          message: `I want to apply for the following services:\n• ${selectedTitles.join("\n• ")}\n\nAdditional Notes:\n`
        }));
        
        // Clean up the URL so it doesn't persist on refresh
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast({ title: "Please fill required fields", variant: "destructive" });
      return;
    }
    toast({ title: "✅ Enquiry submitted!", description: "Coach will respond within 24 hours." });
    setForm({ name: "", email: "", phone: "", skillLevel: "Student", interest: "Leadership", message: "" });
  };

  const inputClass = "mt-1.5 w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300";

  return (
    <section id="contact" className="px-[5%] md:px-[8%] py-28 relative">
      <div ref={ref} className={`max-w-[980px] mx-auto ${isVisible ? "animate-fade-up" : "opacity-100 md:opacity-0"}`}>
        <div className="text-center mb-12">
          <span className="text-primary tracking-[3px] text-xs font-mono">BEGIN THE CONVERSATION</span>
          <h2 className="text-3xl md:text-4xl mt-3 text-foreground">A thoughtful place to <span className="text-primary">start</span></h2>
          <p className="max-w-[680px] mx-auto mt-4 text-[var(--text-body)] leading-relaxed text-sm md:text-base">
            If you are curious, intentional, and serious about learning — this is a quiet starting point.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-lg border border-border hover-glow transition-shadow duration-500"
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs text-muted-foreground font-medium">Full Name *</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Enter your full name" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-medium">Email Address *</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="your.email@example.com" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-medium">Phone Number</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="+91 XXXXXXXXXX" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-medium">Current Skill Level *</label>
              <select value={form.skillLevel} onChange={(e) => setForm({ ...form, skillLevel: e.target.value })} className={inputClass + " font-mono"}>
                <option>Student</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-medium">Area of Interest *</label>
              <select value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} className={inputClass + " font-mono"}>
                <option>Leadership</option><option>Career Growth</option><option>Decision Making</option><option>Mentorship</option>
              </select>
            </div>
            <div>
              {/* Empty for grid alignment */}
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-muted-foreground font-medium">Additional Message</label>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className={inputClass} placeholder="Share what you are trying to learn..." />
            </div>
            <div className="md:col-span-2 text-center mt-4">
              <motion.button
                type="submit"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary text-primary-foreground px-12 py-4 rounded-2xl text-base font-semibold shadow-[var(--glow-primary)] hover:shadow-[var(--glow-strong)] transition-all duration-300"
              >
                Submit Enquiry
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
