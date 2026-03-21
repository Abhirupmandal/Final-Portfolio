import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { servicesData } from "@/data/servicesData";
import { ArrowLeft, CheckCircle2, ChevronRight, CheckSquare, Square } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = servicesData.find((s) => s.id === id);
  const [selectedServices, setSelectedServices] = useState<string[]>(id ? [id] : []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) setSelectedServices([id]);
  }, [id]);

  const toggleService = (serviceId: string) => {
    if (serviceId === id) return;
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(s => s !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleConfirm = () => {
    const query = selectedServices.join(",");
    setIsDialogOpen(false);
    navigate(`/?services=${query}#contact`);
  };

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl text-foreground font-semibold">Service Not Found</h1>
        <button onClick={() => navigate(-1)} className="mt-6 text-primary underline">Go Back</button>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-primary/10 blur-[180px] -top-[200px] -left-[200px] animate-float-orb" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-accent/15 blur-[180px] -bottom-[200px] -right-[200px] animate-float-orb-reverse" />
      </div>

      {/* Navbar Buffer */}
      <div className="pt-24 md:pt-32 px-[5%] md:px-[10%]">
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Services
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 animate-fade-in-up">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-primary/10 text-primary mb-6 shadow-[inset_0_0_20px_rgba(var(--primary),0.1)]">
              <Icon className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight mb-6">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-body)] leading-relaxed mb-10">
              {service.desc}
            </p>
          </div>

          <div className="order-1 lg:order-2 animate-fade-in-scale">
            <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-border/50 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-80" />
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                 <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold tracking-wider uppercase mb-2">
                   Premium Engagement
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Info Section */}
        <div className="mt-24 pb-16 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="bg-card/40 backdrop-blur-2xl border border-border rounded-[2.5rem] p-8 md:p-14 shadow-xl">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">What to Expect</h3>
                <p className="text-[var(--text-body)] text-base md:text-lg leading-relaxed mb-8">
                  This engagement is meticulously structured to deliver profound cognitive clarity and actionable leadership frameworks. By deep-diving into the core mechanisms behind your decision-making, we collectively engineer sustainable growth architectures specifically tailored to your evolving environment.
                </p>
                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                  <h4 className="font-semibold text-primary mb-2 text-lg">Program Duration</h4>
                  <p className="text-sm md:text-base text-foreground/80 leading-relaxed">Typically ranges from 6 to 12 weeks, scaling based on custom objectives and your operational cadence.</p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Core Deliverables</h3>
                <ul className="space-y-5">
                  {service.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                      <div className="mt-1 bg-primary/20 text-primary rounded-full p-1 shrink-0 shadow-sm">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-base md:text-lg text-[var(--text-body)] leading-relaxed font-medium">{pt}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                    <div className="mt-1 bg-primary/20 text-primary rounded-full p-1 shrink-0 shadow-sm">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-base md:text-lg text-[var(--text-body)] leading-relaxed font-medium">Continuous strategic alignment and recalibration tracking.</span>
                  </li>
                  <li className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                    <div className="mt-1 bg-primary/20 text-primary rounded-full p-1 shrink-0 shadow-sm">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-base md:text-lg text-[var(--text-body)] leading-relaxed font-medium">Priority access to proprietary frameworks and analytical tools.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button & Selection Dialog */}
        <div className="pb-32 flex justify-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button 
                className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-primary text-primary-foreground font-bold text-xl shadow-[var(--glow-primary)] hover:shadow-[var(--glow-strong)] hover:-translate-y-1 transition-all duration-300"
              >
                Apply for this service
                <ChevronRight className="w-6 h-6" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-xl bg-card border-border rounded-[2.5rem] p-6 md:p-10 shadow-2xl">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold text-foreground">Optimize Your Engagement</DialogTitle>
                <DialogDescription className="text-muted-foreground mt-2">
                  You are applying for <strong>{service.title}</strong>. Many leaders choose to stack advisory layers for a comprehensive transformation. Select any additional services you wish to explore below.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto pr-2">
                {servicesData.map((s) => {
                  const isCurrent = s.id === id;
                  const isSelected = selectedServices.includes(s.id);
                  
                  return (
                    <div 
                      key={s.id}
                      onClick={() => toggleService(s.id)}
                      className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-primary/5 border-primary shadow-sm' 
                          : 'bg-background border-border hover:border-primary/50'
                      } ${isCurrent ? 'opacity-90 cursor-default' : ''}`}
                    >
                      <div className="mt-0.5 shrink-0 text-primary">
                        {isSelected ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 opacity-40" />}
                      </div>
                      <div>
                        <h4 className={`font-semibold text-sm ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                          {s.title} {isCurrent && <span className="ml-3 text-[10px] uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-full text-primary">Primary Selection</span>}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                          {s.desc}
                        </p>
                        {!isCurrent && (
                          <div className="mt-2 text-right">
                             <button 
                               onClick={(e) => {
                                 e.stopPropagation();
                                 setIsDialogOpen(false);
                                 navigate(`/service/${s.id}`);
                               }}
                               className="text-[10px] text-primary hover:text-primary/80 hover:underline font-bold tracking-wider uppercase transition-all"
                             >
                               Explore it first →
                             </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-border flex justify-end gap-4">
                <button 
                  onClick={() => setIsDialogOpen(false)}
                  className="px-6 py-3 rounded-xl font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirm}
                  className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold shadow-[var(--glow-primary)] hover:shadow-lg transition-all"
                >
                  Confirm & Proceed
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
