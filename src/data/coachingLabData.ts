import {
  Eye,
  MessageCircle,
  Activity,
  Compass,
  Target,
  Repeat,
  UserCircle,
  Unlock
} from "lucide-react";

export type Question = {
  q: string;
  opts: string[];
};

export type ReportConfig = {
  insight: string;
  weaknesses: string[];
  shift: string;
  question: string;
};

export type ToolData = {
  id: string;
  tag: string;
  title: string;
  desc: string;
  points: string[];
  icon: any;
  type: "diagnostic" | "dialogue";
  questions?: Question[];
  graphType?: "Radar Chart" | "Bar Chart" | "Score Indicators" | "2-axis map" | "Cycle Diagram" | "Score Meter" | "Scale";
  reportConfig: ReportConfig;
};

export const coachingLabData: ToolData[] = [
  {
    id: "blind-spot-discovery",
    tag: "AWARENESS",
    title: "Blind-Spot Discovery",
    desc: "Identify unnoticed behavioural patterns and communication gaps that may be limiting your professional growth and influence.",
    points: ["Hidden performance gaps", "Perception vs reality analysis", "Communication blind zones"],
    icon: Eye,
    type: "diagnostic",
    graphType: "Radar Chart",
    questions: [
      { q: "When a project under your ownership fails, what is your immediate internal narrative?", opts: ["It was an execution failure by the team.", "External factors shifted unexpectedly.", "I failed to provide adequate clarity.", "The strategy itself was flawed."] },
      { q: "How often do peers intentionally seek your perspective on decisions outside your direct domain?", opts: ["Rarely, they stay in their lanes.", "Occasionally, on specific functional matters.", "Frequently, as a trusted sounding board.", "Constantly, I am a central node of influence."] },
      { q: "When delivering critical feedback to a high performer, you typically:", opts: ["Soften it to preserve the relationship.", "Focus purely on the metrics.", "Delay until structured review cycles.", "Address it immediately and directly."] },
      { q: "If your team were surveyed anonymously, what would they identify as your primary bottleneck?", opts: ["Micromanagement / inability to delegate.", "Vagueness in strategic direction.", "Slow decision-making velocity.", "Over-indexing on rapid changes."] },
      { q: "How do you respond when a subordinate challenges your strategic assumptions in a public forum?", opts: ["Shut it down to maintain authority.", "Defend the logic vigorously.", "Acknowledge but defer to private follow-up.", "Publicly validate and explore their challenge."] },
      { q: "What is your default mechanism for assessing your own performance?", opts: ["Hard revenue / delivery metrics.", "Feedback from my direct manager.", "Feedback from my peers.", "A structured, self-directed reflection matrix."] },
      { q: "When cross-functional friction arises, your instinct is to:", opts: ["Escalate to leadership.", "Rely on process to dictate outcomes.", "Ignore it if it doesn't block delivery.", "Facilitate a direct, uncomfortable conversation."] },
      { q: "How accurately do you believe you can predict your CEO / Board’s reaction to a major risk?", opts: ["I am often surprised.", "I can predict general sentiment.", "I anticipate their precise concerns.", "I proactively frame the narrative before they react."] },
      { q: "If you left your role tomorrow, what would fracture first?", opts: ["Operational execution.", "Team morale and cohesion.", "Strategic vision alignment.", "Nothing. I have built a resilient system."] },
      { q: "Which of these best describes your current communication ceiling?", opts: ["Struggling to articulate the 'why'.", "Over-indexing on details over vision.", "Failing to tailor the message to the executive level.", "I communicate effectively across all altitudes."] }
    ],
    reportConfig: {
      insight: "You often protect team harmony at the cost of execution speed, meaning your biggest risks are hidden behind a culture of politeness rather than transparency.",
      weaknesses: [
        "Delaying difficult performance conversations.",
        "Relying on positional authority over objective data in conflicts.",
        "A tendency to absorb your team's failures instead of holding them accountable."
      ],
      shift: "Transition from being a 'harmonizer' to a 'clarifier'. Clear, unapologetic expectations are a form of professional respect.",
      question: "If you completely removed the fear of being disliked by your team today, what specific directive would you issue tomorrow morning?"
    }
  },
  {
    id: "chat-with-coach",
    tag: "DIALOGUE",
    title: "Chat with Coach",
    desc: "A focused clarity channel to think through decisions, career moves, and leadership challenges in real time.",
    points: ["Real-time advisory sessions", "Structured thinking prompts", "Confidential thought space"],
    icon: MessageCircle,
    type: "dialogue",
    graphType: "Score Indicators",
    reportConfig: {
      insight: "Your real-time cognitive processing shows a tendency to over-analyze systemic problems rather than isolating the singular variable that controls the outcome.",
      weaknesses: [
        "Getting lost in hypothetical 'what-if' scenarios.",
        "Treating simple decisions as complex structural dilemmas.",
        "Hesitating to pull the trigger without 100% consensus."
      ],
      shift: "Move from 'seeking perfect information' to 'acting on sufficient probability'. Accept that leadership requires operating in the dark.",
      question: "What is the single most important decision you are currently avoiding by seeking more data?"
    }
  },
  {
    id: "leadership-pattern-audit",
    tag: "LEADERSHIP",
    title: "Leadership Pattern Audit",
    desc: "Examine how you lead under pressure and identify patterns that influence team performance and outcomes.",
    points: ["Decision behavior under stress", "Control vs trust dynamics", "Leadership bias detection"],
    icon: Activity,
    type: "diagnostic",
    graphType: "Bar Chart",
    questions: [
      { q: "When a deadline is severely at risk, your default shift in behavior is:", opts: ["Taking direct control of the work.", "Increasing reporting frequency.", "Re-negotiating scope with stakeholders.", "Trusting the team while removing blockers."] },
      { q: "How do you typically handle ambiguity in a new, unstructured initiative?", opts: ["Wait for top-down clarity.", "Create a rigid structure immediately.", "Experiment carefully with small bets.", "Set a vision and let the team define the structure."] },
      { q: "What is your primary method for building trust with new stakeholders?", opts: ["Delivering flawless results quickly.", "Transparent, vulnerable communication.", "Relying on positional authority.", "Finding continuous alignment on shared goals."] },
      { q: "When a direct report makes a significant, costly mistake, you focus on:", opts: ["Creating new policies to prevent recurrence.", "The immediate financial/reputational fix.", "The underlying systemic failure.", "Their personal learning and accountability loop."] },
      { q: "How much of your week is spent in 'firefighting' vs. 'capacity building'?", opts: ["80% Firefighting / 20% Building", "60% Firefighting / 40% Building", "40% Firefighting / 60% Building", "20% Firefighting / 80% Building"] },
      { q: "If a peer leader proposes a strategy that conflicts with your team's goals, you:", opts: ["Block the proposal to protect your team.", "Comply defensively to avoid conflict.", "Compromise to keep peace.", "Seek a synthesized solution that elevates both goals."] },
      { q: "How would you describe your delegation threshold?", opts: ["I delegate tasks, but retain all decision-making.", "I delegate execution to proven performers.", "I delegate outcomes and monitor closely.", "I delegate outcomes and provide autonomous authority."] },
      { q: "When entering a high-stakes negotiation, your primary focus is:", opts: ["Maximizing my personal/team leverage.", "Defending against downside risks.", "Finding a balanced, transactional compromise.", "Expanding the total value created for both sides."] },
      { q: "How do you treat 'dissenting voices' in your team meetings?", opts: ["I ignore them if they delay the agenda.", "I tolerate them but override them.", "I listen but rarely change course.", "I actively mine their dissent for hidden risks."] },
      { q: "What is the primary narrative you tell yourself about your leadership?", opts: ["'I am the person who gets things done.'", "'I am the protector of my team.'", "'I am the strategic visionary.'", "'I am a multiplier of intelligence.'"] }
    ],
    reportConfig: {
      insight: "Under high-stress environments, you revert to tactical micromanagement. This creates a bottleneck where your team stops thinking and waits for your commands.",
      weaknesses: [
        "Hoarding critical decisions when deadlines are tight.",
        "Failing to build systemic redundancy for operations.",
        "Valuing personal intervention over team autonomy."
      ],
      shift: "Shift from 'doing the work' to 'designing the systems that do the work'. Your value is no longer your output, but your architecture.",
      question: "If you were forced to disappear for 30 days starting right now, what specific operational node would break first?"
    }
  },
  {
    id: "decision-clarity",
    tag: "DECISION",
    title: "Decision Clarity",
    desc: "Break down complex choices and uncover the real trade-offs driving hesitation and indecision.",
    points: ["Trade-off mapping", "Risk vs reward clarity", "Hidden hesitation triggers"],
    icon: Compass,
    type: "diagnostic",
    graphType: "2-axis map",
    questions: [
      { q: "When facing a difficult career divergence, what usually paralyzes you?", opts: ["Fear of closing off future options.", "Incomplete data on the potential outcomes.", "Anxiety about stakeholder disappointment.", "Doubt regarding my own capabilities."] },
      { q: "How do you weigh short-term discomfort against long-term strategic gain?", opts: ["I avoid short-term discomfort at all costs.", "I endure it only if the outcome is guaranteed.", "I tolerate it if the analytical model supports it.", "I actively embrace it as a necessary filter for growth."] },
      { q: "What is your primary method for breaking a decision deadlock?", opts: ["Seeking consensus from all parties.", "Gathering more granular data.", "Relying on gut instinct and moving on.", "Forcing a structural constraint (e.g., timebox)."] },
      { q: "When a past decision results in a negative outcome, your processing style is:", opts: ["Ruminating on what I should have done.", "Quickly rationalizing the failure to protect my ego.", "Externalizing the blame to market conditions.", "Extracting the algorithm of failure to prevent recurrence."] },
      { q: "When choosing between two equally compelling candidates/opportunities, you rely on:", opts: ["Which one feels safer.", "Which one offers higher immediate upside.", "Which one aligns best with core values.", "Which one provides asymmetric long-term leverage."] },
      { q: "What is the hidden cost of your current state of indecision?", opts: ["Lost revenue or market positioning.", "Erosion of team confidence in my leadership.", "Personal cognitive fatigue.", "There is no cost; waiting is the right strategic move."] },
      { q: "If you had to make your most pressing decision with only 50% of the data, you would:", opts: ["Refuse to make the decision.", "Make a reversible, low-stakes bet.", "Defer to a subordinate or peer.", "Act decisively and prepare to pivot."] },
      { q: "How heavily does 'sunk cost' (time/money already spent) influence your decisions?", opts: ["Heavily; I must see things through.", "Moderately; it's a factor in the optics.", "Slightly; I try to ignore it.", "Not at all; I evaluate from present-state only."] },
      { q: "What trade-off are you currently trying to pretend doesn't exist?", opts: ["Speed vs. Quality.", "Autonomy vs. Alignment.", "Personal health/time vs. Career acceleration.", "Short-term revenue vs. Long-term brand equity."] },
      { q: "When your intuition violently opposes the data, what do you do?", opts: ["Always follow the data.", "Always follow the intuition.", "Paralyze in the contradiction.", "Interrogate the intuition to find the missing variable."] }
    ],
    reportConfig: {
      insight: "You consistently optimize for short-term comfort over long-term strategic growth, meaning you are playing not to lose, rather than playing to win.",
      weaknesses: [
        "Prioritizing immediate stability over necessary disruption.",
        "Allowing the 'sunk cost fallacy' to drag out failing initiatives.",
        "Compromising too early in high-stakes negotiations."
      ],
      shift: "Reframe discomfort as a necessary filter for growth. If a strategic decision feels entirely comfortable, it is likely not bold enough.",
      question: "What necessary but painful trade-off are you currently pretending doesn't exist?"
    }
  },
  {
    id: "career-direction",
    tag: "ALIGNMENT",
    title: "Career Direction",
    desc: "Assess whether your current path aligns with how you naturally think, work, and perform.",
    points: ["Role and environment fit", "Growth vs stability alignment", "Energy pattern analysis"],
    icon: Target,
    type: "diagnostic",
    graphType: "Bar Chart",
    questions: [
      { q: "At the end of a typical workday, your energy level is:", opts: ["Completely depleted and cynical.", "Tired but satisfied with the output.", "Neutral, feeling like just another day.", "Stimulated and generating new ideas."] },
      { q: "What percentage of your current role leverages your unique zone of genius?", opts: ["Less than 20%.", "20% - 40%.", "40% - 70%.", "Over 70%."] },
      { q: "When you look at the role directly above yours, your reaction is:", opts: ["I desperately want the title and compensation.", "I want the strategic leverage it provides.", "I respect it, but I don't want the political headache.", "I am actively positioning myself to surpass it."] },
      { q: "How closely does your current organisational culture match your core values?", opts: ["Active friction and misalignment.", "Tolerable, but superficial alignment.", "Strong alignment in theory, weak in practice.", "Deep, authentic resonance."] },
      { q: "What is your primary driver for seeking a career transition right now?", opts: ["Escaping a toxic or stagnant environment.", "Chasing higher financial leverage.", "Seeking greater autonomy and ownership.", "Pursuing a more complex class of problems."] },
      { q: "If your compensation were fixed for the next 5 years, would you stay in your current trajectory?", opts: ["Absolutely not.", "Only if the title increased.", "Yes, because the work is comfortable.", "Yes, because the learning curve is steep."] },
      { q: "How do you evaluate 'stability' in your career?", opts: ["A primary requirement for peace of mind.", "A necessary baseline for taking calculated risks.", "A trap that breeds complacency.", "Irrelevant; agility is the only true stability."] },
      { q: "The tasks that consistently fall to the bottom of your to-do list are:", opts: ["Administrative reporting and compliance.", "Difficult personnel conversations.", "Long-term strategic planning.", "Tactical execution and quality assurance."] },
      { q: "When you succeed currently, how much of it feels like 'luck' vs 'systematic design'?", opts: ["Mostly luck or riding a market wave.", "A mix of hard work and good timing.", "Mostly systematic execution.", "Entirely the result of designed strategic leverage."] },
      { q: "Where do you see your industry positioning in 3 years, and where are you in relation to it?", opts: ["The industry is changing, and I am falling behind.", "I am keeping pace with the standard evolution.", "I am slightly ahead of the curve.", "I am actively defining the edge of the transformation."] }
    ],
    reportConfig: {
      insight: "Your natural zone of genius is creative architectural thinking, yet your calendar reflects the schedule of a tactical executor. Your energy is misaligned with your altitude.",
      weaknesses: [
        "Agreeing to tasks that others should legally own.",
        "Tolerating a culture that doesn't challenge your intellect.",
        "Measuring productivity by hours logged rather than leverage gained."
      ],
      shift: "You must relentlessly protect your deep-work cognitive bandwidth. Delegate anything that does not require your specific executive judgment.",
      question: "If your compensation was the same regardless of what you did, what 80% of your current role would you drop?"
    }
  },
  {
    id: "behavior-patterns",
    tag: "PATTERNS",
    title: "Behavior Patterns",
    desc: "Identify recurring behavioral loops that shape your outcomes and limit consistent progress.",
    points: ["Trigger → action cycles", "Habit loop breakdown", "Pattern interruption points"],
    icon: Repeat,
    type: "diagnostic",
    graphType: "Cycle Diagram",
    questions: [
      { q: "When you receive a vague but urgent email from a superior, your first action is:", opts: ["Panic and immediately drop everything.", "Over-analyze the potential hidden meanings.", "Reply defensively to establish boundaries.", "Pause, clarify the ask, and prioritize objectively."] },
      { q: "Under high stress, your communication style shifts toward:", opts: ["Silence and withdrawal.", "Aggressive, rapid-fire directives.", "Over-explaining and justifying.", "Hyper-analytical detachment."] },
      { q: "What is your typical pattern when taking on a massive new project?", opts: ["Procrastinate until the pressure forces action.", "Dive into the granular details immediately.", "Create a flawless plan but struggle to execute.", "Build a rapid prototype and iterate."] },
      { q: "When you feel 'imposter syndrome', how do you compensate?", opts: ["By working unsustainable hours.", "By avoiding the spotlight and staying quiet.", "By becoming overly critical of others.", "By seeking rapid external validation."] },
      { q: "How do you typically handle the 'last 10%' of a major initiative?", opts: ["I lose interest and struggle to finish.", "I micromanage to ensure perfection.", "I delegate it poorly and hope it works out.", "I push through systematically to closure."] },
      { q: "What triggers your most destructive professional habit?", opts: ["Boredom and lack of challenge.", "Overwhelm and lack of control.", "Conflicts with specific personality types.", "Ambiguity and lack of clear metrics."] },
      { q: "When you commit to a new personal growth routine, what usually breaks the cycle?", opts: ["A singular bad day that ruins the streak.", "An unexpected crisis at work.", "Getting bored when results aren't immediate.", "I rarely break my commitments."] },
      { q: "How do you respond when someone gives you constructive criticism you weren't expecting?", opts: ["Immediate internal defensiveness and external justification.", "Complete agreement while internally resenting them.", "Shutting down and dismissing their competence.", "Curiosity and a request for specific examples."] },
      { q: "What describes your relationship with 'rest' and 'recovery'?", opts: ["I feel guilty whenever I am not producing.", "I rest only when my body physically forces me to.", "I use rest as an escape metric from stress.", "I cycle rest as a strategic performance tool."] },
      { q: "When a strategy fails, what is your predictable thought loop?", opts: ["'I am not capable enough for this level.'", "'The market/team didn't understand the vision.'", "'If I had just worked harder, this would have worked.'", "'What is the structural flaw in my model?'"] }
    ],
    reportConfig: {
      insight: "You suffer from 'action bias'—the belief that simply moving fast equates to moving forward. This creates chaotic momentum without a strategic vector.",
      weaknesses: [
        "Reacting to urgent emails without parsing actual priority.",
        "Launching initiatives before scoping the 'last 10%'.",
        "Over-committing to new ideas before finishing older bets."
      ],
      shift: "Inject a 'mandatory pause' before execution. Silence and stillness are strategic tools used to separate urgency from actual, compounding priority.",
      question: "What is a recent outcome that failed not because of lack of effort, but because you started running too soon?"
    }
  },
  {
    id: "self-perception-mirror",
    tag: "REFLECTION",
    title: "Self-Perception Mirror",
    desc: "Reveal the gap between what you say you want and how you actually behave.",
    points: ["Intent vs action gap", "Avoidance patterns", "Internal contradiction insights"],
    icon: UserCircle,
    type: "diagnostic",
    graphType: "Score Meter",
    questions: [
      { q: "You claim you want 'more strategic focus', but your calendar reveals:", opts: ["Back-to-back tactical check-ins.", "Empty space that gets filled with putting out fires.", "Meetings where I am not functionally required.", "Dedicated, protected blocks for deep work."] },
      { q: "You state that you value 'candor', but when tension arises, you:", opts: ["Use corporate jargon to soften the blow.", "Avoid the conversation until absolutely necessary.", "Deploy aggressive candor without empathy.", "Deliver the truth clearly with supportive framing."] },
      { q: "You say you want 'a high-performing autonomous team', but in reality:", opts: ["You double-check their work constantly.", "You provide no guardrails and blame them for failures.", "You hoard the high-visibility tasks.", "You set clear parameters and step back."] },
      { q: "You desire 'work-life balance', but when the laptop closes:", opts: ["You check Slack/Emails constantly on your phone.", "You are physically present but mentally absent.", "You feel anxiety about what you aren't doing.", "You successfully compartmentalize and disconnect."] },
      { q: "You believe you are open-minded, but when presented with a radically different approach:", opts: ["You immediately look for the flaws.", "You pretend to listen while waiting to speak.", "You get defensive about your current system.", "You stress-test the idea through objective inquiry."] },
      { q: "You assert that you prioritize 'health', but your daily actions reflect:", opts: ["Sacrificing sleep for minimal professional gains.", "Using stress as an excuse for poor habits.", "Inconsistent bursts of extreme effort followed by crashes.", "Systematic routines that protect your physical baseline."] },
      { q: "You claim you want 'mentorship/coaching', but when challenged directly:", opts: ["You argue to prove you are already correct.", "You nod along but change nothing.", "You feel personally attacked and withdraw.", "You absorb, integrate, and report back on results."] },
      { q: "You state you want 'financial freedom', but your behavioral loop shows:", opts: ["Lifestyle creep matching every income increase.", "High risk tolerance without a safety net.", "Paralysis in making investment decisions.", "Calculated, disciplined allocation of resources."] },
      { q: "You desire to be seen as an 'industry thought leader', but your output is:", opts: ["Non-existent because it 'isn't perfect yet'.", "Echoing generic consensus without unique insight.", "Sporadic and disconnected.", "Consistent, provocative, and uniquely framed."] },
      { q: "What is the biggest lie you are currently telling yourself about your career?", opts: ["'I'll make the jump when the time is right.'", "'I am indispensable to this organization.'", "'I don't have enough time to focus on strategy.'", "'I am fully aligned with my current trajectory.'"] }
    ],
    reportConfig: {
      insight: "There is a massive gap between your stated desire for scaling your execution and your actual behavioral loop. You want the reward, but reject the required systems.",
      weaknesses: [
        "Inconsistent execution of personal discipline routines.",
        "Saying you value candor but communicating through corporate fluff.",
        "Failing to hold yourself to the standards you demand of others."
      ],
      shift: "Align your calendar with your stated ambitions. A vision means nothing if it is not broken down into ruthless, daily verifiable habits.",
      question: "What is the biggest comfortable lie you are currently telling yourself about why you haven't reached the next tier?"
    }
  },
  {
    id: "limiting-beliefs",
    tag: "MINDSET",
    title: "Limiting Beliefs",
    desc: "Challenge assumptions that quietly restrict your decisions and performance.",
    points: ["Belief origin analysis", "Evidence vs assumption", "Cognitive reframing"],
    icon: Unlock,
    type: "diagnostic",
    graphType: "Scale",
    questions: [
      { q: "Which implicit belief limits your delegation the most?", opts: ["'If I don't do it, it won't meet the standard.'", "'It takes longer to explain it than to just do it.'", "'If my team does everything, what is my value?'", "'None. I delegate effectively without emotional friction.'"] },
      { q: "What assumption holds you back from aggressive networking?", opts: ["'I don't want to seem transactional or desperate.'", "'My work should speak for itself.'", "'I don't have anything valuable to offer them yet.'", "'Nothing. I systematically build social capital.'"] },
      { q: "When considering a bold, contrarian strategic move, your inner voice says:", opts: ["'What if I am wrong and look foolish?'", "'The stakeholders will never approve this.'", "'We don't have the resources to execute this.'", "'How can we test the validity of this hypothesis rapidly?'"] },
      { q: "What limits your ability to set firm professional boundaries?", opts: ["The belief that my value is tied to my limitless availability.", "The fear of being perceived as 'not a team player'.", "The anxiety of missing out on critical implicit information.", "Nothing. My boundaries are rigid and respected."] },
      { q: "Which assumption restricts your compensation asks?", opts: ["'I should wait until the annual review cycle.'", "'The market is tight, I should be grateful.'", "'I haven't proven myself enough in this specific domain.'", "'None. I negotiate based on the objective value I create.'"] },
      { q: "Your belief about your own 'weaknesses' is typically:", opts: ["'These are permanent flaws I must hide.'", "'These are areas I must laboriously improve to baseline.'", "'These are excuses for why I haven't reached the next level.'", "'These are irrelevant. I build systems/teams to cover them.'"] },
      { q: "When looking at leaders significantly ahead of you, you assume:", opts: ["They had advantages/connections I don't possess.", "They sacrificed their personal lives entirely to get there.", "They possess a raw intelligence I lack.", "They operate on a structural playbook I can learn and execute."] },
      { q: "What holds you back from launching an imperfect product/idea?", opts: ["The fear of reputational damage.", "The need for absolute certainty of success.", "The belief that 'first impressions are final'.", "Nothing. I prioritize velocity and market feedback."] },
      { q: "Which belief limits your capacity to rest?", opts: ["'If I stop moving, the momentum will die.'", "'My competitors are working while I am sleeping.'", "'Rest is a reward only for completing all tasks.'", "'None. Rest is a non-negotiable performance multiplier.'"] },
      { q: "What is the core assumption preventing you from operating at 10x your current level?", opts: ["'I lack the capital/resources.'", "'The market doesn't value my specific skill set enough.'", "'I am not ready. I need one more credential/year of experience.'", "'Nothing. It is simply an engineering problem I am currently solving.'"] }
    ],
    reportConfig: {
      insight: "You fundamentally believe that your value is tied to your limitless availability. This assumption prevents you from establishing the boundaries necessary for elite performance.",
      weaknesses: [
        "Assuming that resting mathematically equals losing momentum.",
        "Believing you must have all the answers to maintain authority.",
        "Fearing that asking for help exposes incompetence."
      ],
      shift: "Adopt the mindset that your primary asset is your judgment, not your stamina. Protecting your critical thought-time is a strategic necessity.",
      question: "If you assumed your team was twice as capable as you currently believe they are, what project would you hand over to them today?"
    }
  }
];
