import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WorkExperience from "./pages/WorkExperience";
import Education from "./pages/Education";
import Testimonials from "./pages/Testimonials";
import LeadershipTest from "./pages/LeadershipTest";
import ServiceDetail from "./pages/ServiceDetail";
import ToolExperience from "./pages/ToolExperience";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/work-experience" element={<WorkExperience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/leadership-test" element={<LeadershipTest />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/lab/:id" element={<ToolExperience />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
