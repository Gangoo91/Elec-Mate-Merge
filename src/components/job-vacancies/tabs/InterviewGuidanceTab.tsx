
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MobileAccordion,
  MobileAccordionItem,
  MobileAccordionTrigger,
  MobileAccordionContent,
} from "@/components/ui/mobile-accordion";

import { cn } from "@/lib/utils";
import { 
  MessageCircle, 
  CheckCircle, 
  Clock, 
  Lightbulb,
  Target,
  Star,
  XCircle
} from "lucide-react";

const InterviewGuidanceTab = () => {
  const categoryColors = {
    preparation: "indigo",
    technical: "purple", 
    process: "blue",
    questions: "cyan",
    tips: "teal"
  };

  const categoryStyle: Record<string, { iconBg: string; icon: string; badgeBg: string; badgeText: string }> = {
    indigo: { iconBg: "bg-indigo-500/10", icon: "text-indigo-400", badgeBg: "bg-indigo-500/10", badgeText: "text-indigo-300" },
    purple: { iconBg: "bg-purple-500/10", icon: "text-purple-400", badgeBg: "bg-purple-500/10", badgeText: "text-purple-300" },
    blue: { iconBg: "bg-blue-500/10", icon: "text-blue-400", badgeBg: "bg-blue-500/10", badgeText: "text-blue-300" },
    cyan: { iconBg: "bg-cyan-500/10", icon: "text-cyan-400", badgeBg: "bg-cyan-500/10", badgeText: "text-cyan-300" },
    teal: { iconBg: "bg-teal-500/10", icon: "text-teal-400", badgeBg: "bg-teal-500/10", badgeText: "text-teal-300" },
  };

  const difficultyColors = {
    Essential: "green",
    Intermediate: "yellow",
    Advanced: "red"
  };

  const difficultyStyle: Record<string, { bg: string; text: string; border: string }> = {
    green: { bg: "bg-green-500/10", text: "text-green-300", border: "border-green-500/20" },
    yellow: { bg: "bg-yellow-500/10", text: "text-yellow-300", border: "border-yellow-500/20" },
    red: { bg: "bg-red-500/10", text: "text-red-300", border: "border-red-500/20" },
  };
const extras: Record<string, { good: string[]; avoid: string[]; phrase: string }> = {
  preparation: {
    good: [
      "Evidence of research into company projects and clients",
      "Organised documents and punctual arrival",
      "STAR answers with safety-first outcomes"
    ],
    avoid: [
      "Vague answers and guesswork",
      "No awareness of 18th Edition updates",
      "Late arrival or missing ID"
    ],
    phrase: "I'm prepared, BS 7671 aware, and ready to add value from day one."
  },
  technical: {
    good: [
      "Clear calculations with stated assumptions",
      "Accurate, ordered test sequence",
      "Links results to protection selection and safety"
    ],
    avoid: [
      "Mixing up TN systems or bonding rules",
      "Quoting regulations incorrectly",
      "Skipping isolation or re-energising prematurely"
    ],
    phrase: "I'll talk through my method, verify safely, and justify decisions with the regs."
  },
  process: {
    good: [
      "Clarifies expectations and safety requirements for each stage",
      "Brings PPE and ID when requested",
      "Confirms next steps and follows up politely"
    ],
    avoid: [
      "Complaining about assessments or time limits",
      "Arriving unprepared for site protocols",
      "No questions at the end"
    ],
    phrase: "I adapt to each stage while keeping quality and safety consistent."
  },
  questions: {
    good: [
      "Specific, concise examples with outcomes",
      "Explains escalation and documentation",
      "Balances technical detail with client-friendly language"
    ],
    avoid: [
      "Blaming others or sounding defensive",
      "Overlong stories without clear outcomes",
      "Speculation without evidence"
    ],
    phrase: "Here's a concise example using STAR that shows the outcome."
  },
  tips: {
    good: [
      "Polite, professional tone and body language",
      "Curiosity about training, supervision, and safety culture",
      "Sends a brief thank-you note within 24 hours"
    ],
    avoid: [
      "Jargon-heavy answers when not needed",
      "Speaking over interviewers",
      "Negative comments about previous employers"
    ],
    phrase: "Thanks for your time today. I'm excited about the role and the team."
  }
};

const interviewGuides = [
    {
      title: "Interview Preparation",
      icon: Target,
      category: "preparation",
      difficulty: "Essential",
      overviewTitle: "Preparation Overview",
      overviewDescription: "Get ready quickly and professionally for UK electrical interviews – focused, BS 7671 aware, and employer specific.",
      steps: [
        "Research the company projects, sectors, and clients using their website and LinkedIn",
        "Review BS 7671 18th Edition key updates including AFDD application guidance",
        "Prepare 3–4 STAR examples covering safety, fault finding, time pressure, and teamwork",
        "Check travel route, ID, ECS/CSCS card, and bring copies of certificates",
        "Practise clear, concise answers aloud – aim for 60–90 seconds per response"
      ],
      keyPoints: [
        "Company research shows intent and helps tailor answers",
        "Structured STAR examples keep answers focused",
        "Evidence of certification and cards speeds onboarding",
        "Communication clarity matters as much as technical depth",
        "Safety-first mindset is essential in all answers"
      ],
      questions: [
        "Walk me through how you plan safe isolation on a live site",
        "Tell me about a time you diagnosed a difficult fault",
        "How do you ensure compliance with 18th Edition changes?",
        "Describe how you prioritise when multiple jobs are urgent",
        "What would you do if a client pressures you to cut corners?"
      ],
      bs7671: [
        "Part 4 – Protection for safety (fault protection, RCD application)",
        "Chapter 41 – ADS and RCD requirements",
        "Chapter 52 – Cable selection and installation (support in escape routes)",
        "Appendix 6 – Inspection and testing sequence",
        "Guidance on AFDD application in higher risk residential buildings"
      ],
      checklist: [
        "Photo ID, ECS/CSCS card, certifications",
        "Printed CV and references",
        "Pens, notepad, and PPE if requested",
        "Arrival 10–15 minutes early",
        "Phone on silent and no gum"
      ]
    },
    {
      title: "Technical Interview Skills",
      icon: Lightbulb,
      category: "technical",
      difficulty: "Advanced",
      overviewTitle: "Technical Focus",
      overviewDescription: "Demonstrate solid fundamentals and the ability to apply BS 7671 in practical scenarios.",
      steps: [
        "Refresh on earthing systems (TN-S, TN-C-S, TT) and where each is typical",
        "Practise Zs, Ze, and prospective fault current calculations",
        "Revise RCD testing procedures and trip times including Type A vs AC",
        "Review safe isolation, permits to work, and lock-off tagging",
        "Be ready to sketch simple schematics to explain your thinking"
      ],
      keyPoints: [
        "Use UK terminology consistently (ring final circuits, protective devices)",
        "Quote regs where relevant without overdoing it",
        "Explain your assumptions when doing calculations",
        "Link test results to safety decisions",
        "Show methodical troubleshooting"
      ],
      questions: [
        "Explain differences between TN-S and TT and implications for RCD use",
        "How do you determine maximum Zs for a given protective device?",
        "Outline your sequence for initial verification testing",
        "When would AFDDs be considered and why?",
        "How do you confirm polarity on a ring circuit?"
      ],
      bs7671: [
        "Chapter 41 – Disconnection times",
        "Chapter 43 – Protection against overcurrent",
        "Chapter 54 – Earthing arrangements and protective conductors",
        "Appendix 3 – Time-current characteristics",
        "Appendix 6 – Test sequences"
      ],
      checklist: [
        "Calculator and test sheet familiarity",
        "Know common device curves and trip times",
        "Be ready with worked examples",
        "Use precise, concise language",
        "Relate answers to safety impact"
      ]
    },
    {
      title: "Interview Process Types",
      icon: Clock,
      category: "process",
      difficulty: "Intermediate",
      overviewTitle: "Process Overview",
      overviewDescription: "What each stage assesses and how to prepare for it.",
      steps: [
        "Phone/video: availability, attitude, and basics – quiet space and notes ready",
        "Technical: deeper knowledge checks – prepare examples and whiteboard sketches",
        "On-site: practical skills and culture fit – bring PPE if requested",
        "Assessment: timed tasks – read instructions twice, stay methodical",
        "Final: offer discussion – be ready with salary expectations"
      ],
      keyPoints: [
        "Each stage has different focus – adapt your preparation",
        "Bring evidence of tickets and recent work",
        "Ask clear questions about safety culture and supervision",
        "Confirm travel, parking, and security steps in advance",
        "Follow up with a concise thank-you email"
      ],
      questions: [
        "What will the practical assessment involve?",
        "How are permits to work managed on site?",
        "What is the team structure and typical shift pattern?",
        "What does success in the first 90 days look like?",
        "Are there upskilling opportunities and funded courses?"
      ],
      bs7671: [
        "Appendix 6 – Test documentation",
        "Part 6 – Inspection and testing responsibilities",
        "Health and safety integration with electrical work",
        "Manufacturer instructions and coordination",
        "Risk assessments for temporary supplies"
      ],
      checklist: [
        "Devices, ID, and PPE as requested",
        "Printed directions and contact name",
        "Allow buffer time for security",
        "Know expected duration",
        "Plan follow-up questions"
      ]
    },
    {
      title: "Common Interview Questions",
      icon: MessageCircle,
      category: "questions",
      difficulty: "Essential",
      overviewTitle: "Question Themes",
      overviewDescription: "Be ready for technical, safety, behavioural, and client-facing scenarios.",
      steps: [
        "Prepare short, specific examples with outcomes",
        "Translate site experience into client-friendly language",
        "Show how you handle pressure without cutting corners",
        "Demonstrate collaborative working with other trades",
        "Have two thoughtful questions prepared"
      ],
      keyPoints: [
        "Answer the question asked – then stop",
        "Evidence beats opinion",
        "Link to regulation or best practice when relevant",
        "Be honest about limits and how you escalate",
        "Stay calm and professional"
      ],
      questions: [
        "Describe a time you found a non-compliant installation and how you handled it",
        "How do you prioritise safety when deadlines are tight?",
        "Give an example of improving a job through planning",
        "What documentation do you complete after testing?",
        "How do you communicate risks to non-technical stakeholders?"
      ],
      bs7671: [
        "Certification and reporting requirements",
        "RCD additional protection in various locations",
        "Special locations and additional measures",
        "Earthing and bonding checks during alterations",
        "Record keeping and traceability"
      ],
      checklist: [
        "Two STAR examples ready",
        "One safety example and one customer example",
        "Clear salary and shift expectations",
        "Availability dates noted",
        "References contactable"
      ]
    },
    {
      title: "Interview Success Tips",
      icon: Star,
      category: "tips",
      difficulty: "Essential",
      overviewTitle: "Final Polishing",
      overviewDescription: "Simple behaviours that make a strong impression and speed offers.",
      steps: [
        "Arrive early, greet everyone politely, and maintain eye contact",
        "Answer concisely and avoid jargon unless asked",
        "Show safety-first decisions in examples",
        "Ask about training, supervision, and safety culture",
        "Summarise your fit at the end and thank the panel"
      ],
      keyPoints: [
        "Professionalism is remembered",
        "Safety and compliance are non-negotiable",
        "Clarity beats complexity",
        "Curiosity shows growth mindset",
        "Follow-up confirms reliability"
      ],
      questions: [
        "What development routes are available (2391, 18th refresh, HV authorisations)?",
        "How do you manage toolbox talks and refreshers?",
        "How are overtime and call-outs structured?",
        "What tools and test instruments are provided?",
        "What are the typical sites and hazards?"
      ],
      bs7671: [
        "Inspection intervals and reporting",
        "Updates since the 18th Edition amendments",
        "Selection of protective devices",
        "Documentation accuracy and sign-off",
        "Temporary works considerations"
      ],
      checklist: [
        "Thank-you note sent within 24 hours",
        "Right-to-work docs ready",
        "Referees briefed",
        "Clean PPE if site visit expected",
        "Travel planned with backup"
      ]
    }
  ];

  return (
    <Card className="bg-elec-dark border-none shadow-none">
      <CardHeader className="text-center space-y-2 pt-2">
        <div className="mx-auto w-10 h-10 rounded-lg bg-elec-yellow/10 flex items-center justify-center">
          <MessageCircle className="h-5 w-5 text-elec-yellow" />
        </div>
        <CardTitle className="text-xl">Interview Guidance</CardTitle>
        <p className="text-muted-foreground max-w-prose mx-auto">Professional step-by-step guides for electrical job interviews</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Metric tiles like Business Development */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: 'Preparation Success', sub: 'Candidates ready in 3–5 days', icon: <CheckCircle className="h-4 w-4 text-green-400" /> },
            { title: 'Time to Offer', sub: '7–14 days typical', icon: <Clock className="h-4 w-4 text-elec-yellow" /> },
            { title: 'Technical Pass Rate', sub: '↑ with focused revision', icon: <Lightbulb className="h-4 w-4 text-blue-400" /> },
            { title: 'Interview ROI', sub: 'Higher offer & salary outcomes', icon: <Target className="h-4 w-4 text-purple-400" /> },
          ].map((m, i) => (
            <Card key={i} className="border-elec-yellow/20 bg-elec-gray p-2.5">
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center">{m.icon}</div>
                <div className="text-xs font-medium text-elec-light">{m.title}</div>
                <div className="text-[11px] text-muted-foreground">{m.sub}</div>
              </div>
            </Card>
          ))}
        </div>

        <MobileAccordion type="single" collapsible className="w-full">
          {interviewGuides.map((guide, index) => {
            const Icon = guide.icon;
            const categoryColor = categoryColors[guide.category as keyof typeof categoryColors];
            const difficultyColor = difficultyColors[guide.difficulty as keyof typeof difficultyColors];
            const cat = categoryStyle[categoryColor] || categoryStyle.indigo;
            const extra = (extras as any)[guide.category];
            
            return (
              <MobileAccordionItem key={index} value={`guide-${index}`} className="rounded-lg mb-3">
                <MobileAccordionTrigger
                  className="px-4 py-2"
                  icon={
                    <div className={cn("p-2 rounded-lg", cat.iconBg)}>
                      <Icon className={cn("h-5 w-5", cat.icon)} />
                    </div>
                  }
                >
                  <div className="text-[13px] sm:text-sm font-semibold text-elec-light">{guide.title}</div>
                </MobileAccordionTrigger>
                <MobileAccordionContent className="bg-elec-gray border border-elec-yellow/20 border-t-0 rounded-b-lg px-4 py-3 text-[13px]">
                  {"overviewTitle" in guide && (
                    <div className="mb-2">
                      <h5 className="font-semibold text-sm">{(guide as any).overviewTitle}</h5>
                      <p className="text-xs text-muted-foreground">{(guide as any).overviewDescription}</p>
                    </div>
                  )}

                  <div className="border-t pt-3">
                    <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Implementation Steps
                    </h5>
                    <ul className="space-y-2">
                      {guide.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {"questions" in guide && (
                    <div className="border-t pt-3">
                      <h5 className="font-semibold text-sm mb-2">Practice Questions</h5>
                      <ul className="space-y-2">
                        {(guide as any).questions.map((q: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="leading-relaxed">{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {"bs7671" in guide && (
                    <div className="border-t pt-3">
                      <h5 className="font-semibold text-sm mb-2">BS 7671 Focus</h5>
                      <ul className="space-y-2">
                        {(guide as any).bs7671.map((p: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="leading-relaxed">{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {"checklist" in guide && (
                    <div className="border-t pt-3">
                      <h5 className="font-semibold text-sm mb-2">Quick Checklist</h5>
                      <ul className="space-y-2">
                        {(guide as any).checklist.map((p: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {extra?.good?.length ? (
                    <div className="border-t pt-3">
                      <h5 className="font-semibold text-sm mb-2">What good looks like</h5>
                      <ul className="space-y-2">
                        {extra.good.map((g: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{g}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {extra?.avoid?.length ? (
                    <div className="border-t pt-3">
                      <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Avoid
                      </h5>
                      <ul className="space-y-2">
                        {extra.avoid.map((a: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {extra?.phrase ? (
                    <div className="border-t pt-3">
                      <h5 className="font-semibold text-sm mb-2">Pocket phrase</h5>
                      <p className="text-xs text-muted-foreground italic">"{extra.phrase}"</p>
                    </div>
                  ) : null}

                  <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-2.5 mt-3">
                    <div className="text-sm font-medium text-green-300 mb-1">Impact</div>
                    <p className="text-xs text-muted-foreground">
                      Following this guidance typically improves interview performance and offer rates while demonstrating BS 7671 awareness.
                    </p>
                  </div>
                </MobileAccordionContent>
              </MobileAccordionItem>
            );
          })}
        </MobileAccordion>
      </CardContent>
    </Card>
  );
};

export default InterviewGuidanceTab;
