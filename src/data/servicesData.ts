import { Star, Target, Brain, RefreshCw, Tent, Rocket, BookOpen, BarChart3 } from "lucide-react";
import sirTalking from "../assets/sir-talking-single.jpg";
import mentorshipImg from "../assets/mentorship.jpg";
import strategyImg from "../assets/strategy.jpg";
import transformationImg from "../assets/transformation.jpg";
import workshopImg from "../assets/workshop.jpg";
import leadershipImg from "../assets/leadership.jpg";
import caseStudyImg from "../assets/casestudy.jpg";
import marketImg from "../assets/market.jpg";

export const servicesData = [
  {
    id: "1-1-leadership-mentorship",
    icon: Star,
    title: "1–1 Leadership Mentorship",
    desc: "Personalised guidance for emerging and mid-level professionals to build executive presence, improve communication clarity, and develop confident decision-making habits.",
    points: [
      "Reflective micro-frameworks and behavioural recalibration loops.",
      "Structured executive cognition drills for consistent growth."
    ],
    image: sirTalking,
  },
  {
    id: "senior-industry-mentorship",
    icon: Target,
    title: "Senior / Industry Mentorship",
    desc: "Focused sessions for experienced professionals navigating senior responsibilities, stakeholder management, and cross-team leadership dynamics.",
    points: [
      "Strategic influence mapping and board-room simulation.",
      "Contextual leadership pattern analysis."
    ],
    image: mentorshipImg,
  },
  {
    id: "strategic-decision-guidance",
    icon: Brain,
    title: "Strategic Decision Guidance",
    desc: "Structured thinking frameworks that help leaders evaluate complex situations, reduce uncertainty, and make high-impact strategic decisions.",
    points: [
      "Scenario modelling matrices and probabilistic foresight.",
      "Decision latency reduction methods."
    ],
    image: strategyImg,
  },
  {
    id: "change-transformation-support",
    icon: RefreshCw,
    title: "Change & Transformation Support",
    desc: "Support for leaders and teams undergoing transitions such as role shifts, organisational restructuring, or growth phases.",
    points: [
      "Adaptive leadership diagnostics.",
      "Systemic recalibration checkpoints."
    ],
    image: transformationImg,
  },
  {
    id: "offsite-leadership-workshops",
    icon: Tent,
    title: "Offsite Leadership Workshops",
    desc: "Immersive experiential environments designed to simulate executive pressure scenarios and collaborative leadership exercises.",
    points: [
      "Reflective silence intervals and cognitive reset modules.",
      "Cross-functional alignment simulations."
    ],
    image: workshopImg,
  },
  {
    id: "leadership-capability-building",
    icon: Rocket,
    title: "Leadership & Capability Building",
    desc: "Long-horizon capability architecture programs aimed at strengthening influence bandwidth and organisational foresight.",
    points: [
      "Layered skill scaffolding and executive resilience.",
      "Neuro-behavioural reinforcement loops."
    ],
    image: leadershipImg,
  },
  {
    id: "case-study-discussions",
    icon: BookOpen,
    title: "Case Study Discussions",
    desc: "Analytical dialogue sessions dissecting real-world organisational case scenarios to sharpen judgement and risk evaluation.",
    points: [
      "Hypothetical inversion exercises.",
      "Multi-angle reasoning drills."
    ],
    image: caseStudyImg,
  },
  {
    id: "market-research-insights",
    icon: BarChart3,
    title: "Market Research & Insights",
    desc: "Data-anchored strategic intelligence explorations translating market signals into executive-level foresight architectures.",
    points: [
      "Trend deconstruction and signal-to-noise filtration.",
      "Predictive opportunity mapping models."
    ],
    image: marketImg,
  },
];