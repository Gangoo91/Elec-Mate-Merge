
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
      title: "Company Research & Role Fit",
      icon: Target,
      category: "preparation",
      difficulty: "Essential",
      overviewTitle: "Know the employer",
      overviewDescription: "Research projects, sectors, clients, and role expectations to tailor answers and show genuine interest.",
      steps: [
        "Scan the website for recent projects, sectors, and clients",
        "Check LinkedIn for company updates and interviewer profiles",
        "Map your experience to the role advert (3–5 bullet matches)",
        "Note any safety awards, accreditations, or frameworks",
        "Prepare two tailored questions about work type and team"
      ],
      keyPoints: [
        "Use specifics from their projects in examples",
        "Show how your tickets/experience fit their sites",
        "Demonstrate awareness of their safety culture",
        "Be concise and confident, not scripted",
        "Finish with a clear summary of fit"
      ],
      questions: [
        "What types of sites or sectors will I mainly work on?",
        "How is safety leadership demonstrated day-to-day?",
        "What does a successful first 90 days look like?",
        "How is overtime/call-out typically managed?",
        "What progression or training paths exist?"
      ],
      bs7671: [
        "Manufacturer instructions and O&M documentation",
        "Coordination with site-specific safety procedures",
        "Temporary supplies and distribution considerations"
      ],
      checklist: [
        "Role spec and your bullet match list",
        "Key project names noted",
        "Interviewers' names and roles",
        "Two tailored questions prepared",
        "Travel and parking sorted"
      ]
    },
    {
      title: "Regulation Refresh (BS 7671)",
      icon: Lightbulb,
      category: "preparation",
      difficulty: "Essential",
      overviewTitle: "Be BS 7671 ready",
      overviewDescription: "Quick revision of the 18th Edition highlights most likely to be probed.",
      steps: [
        "Revise ADS, maximum Zs, and disconnection times",
        "Review RCD types (AC/A/F) and additional protection",
        "Revisit earthing systems (TN-S, TN-C-S, TT) and bonding",
        "Walk through initial verification test sequence",
        "Know AFDD application guidance"
      ],
      keyPoints: [
        "Quote regs sparingly and correctly",
        "Explain assumptions in calculations",
        "Link test figures to safety decisions",
        "Use UK terminology consistently",
        "Be methodical"
      ],
      questions: [
        "When is additional RCD protection required?",
        "How do you confirm polarity on a ring final?",
        "When might AFDDs be considered?",
        "How do you determine max Zs for a device?",
        "Outline your testing sequence"
      ],
      bs7671: [
        "Chapter 41 – Protection against electric shock",
        "Chapter 43 – Overcurrent protection",
        "Chapter 54 – Earthing and bonding",
        "Appendix 3 – Time/current characteristics",
        "Appendix 6 – Certification and reports"
      ],
      checklist: [
        "Reg book tabs or notes",
        "Sample calc sheets",
        "Test sequence crib",
        "Device curves refresher",
        "Common Zs values"
      ]
    },
    {
      title: "STAR Examples & Behavioural",
      icon: MessageCircle,
      category: "preparation",
      difficulty: "Essential",
      overviewTitle: "Tell strong stories",
      overviewDescription: "Prepare 3–4 concise STAR examples that prove judgement, safety, and teamwork.",
      steps: [
        "Pick examples: safety, fault-finding, deadline pressure, teamwork",
        "Write 4–5 bullets for Situation/Task/Action/Result",
        "Highlight BS 7671 compliance and documentation",
        "Keep answers to ~60–90 seconds",
        "Practise out loud"
      ],
      keyPoints: [
        "Evidence beats opinion",
        "Safety-first decisions called out",
        "Clear result/learning at the end",
        "No blaming others",
        "Professional tone"
      ],
      questions: [
        "Describe a time you found non-compliance and fixed it",
        "A difficult fault you diagnosed",
        "How you handle competing priorities",
        "An example of improving a plan through preparation",
        "How you escalate issues"
      ],
      bs7671: [
        "Inspection, testing, and documentation links",
        "Earthing/bonding verification during alterations"
      ],
      checklist: [
        "3–4 examples on cards/notes",
        "Results quantified where possible",
        "Clear escalation route explained",
        "Client-friendly language ready",
        "Practice partner or voice notes"
      ]
    },
    {
      title: "Logistics & Documents",
      icon: Clock,
      category: "preparation",
      difficulty: "Essential",
      overviewTitle: "Arrive ready",
      overviewDescription: "Remove avoidable stress – bring the right things and be punctual.",
      steps: [
        "Plan route with buffer; confirm parking/security",
        "Bring ID, right-to-work, ECS/CSCS, and certificates",
        "Carry printed CV and references",
        "Check PPE if a site visit is planned",
        "Phone on silent; water and notepad ready"
      ],
      keyPoints: [
        "First impressions matter",
        "Documents speed compliance checks",
        "Professional kit shows standards",
        "Polite and calm throughout",
        "Thank-you follow-up"
      ],
      questions: [
        "What ID or PPE should I bring?",
        "Will there be a site walk-through?",
        "Expected duration and format?",
        "Who will I meet?",
        "Any documents you’d like in advance?"
      ],
      bs7671: [
        "Links to certification and record keeping",
        "Temporary works and permits interface"
      ],
      checklist: [
        "ID, cards, certs",
        "Printed CV",
        "PPE if requested",
        "Arrive 10–15 minutes early",
        "Contact details handy"
      ]
    },
    {
      title: "Practice & Mock Interviews",
      icon: Star,
      category: "preparation",
      difficulty: "Essential",
      overviewTitle: "Rehearse to win",
      overviewDescription: "Short, focused practice to tighten delivery and confidence.",
      steps: [
        "Record yourself answering 5 common questions",
        "Run a 20‑minute mock with a friend/mentor",
        "Time answers and remove filler",
        "Practise explaining a simple schematic",
        "Review and refine"
      ],
      keyPoints: [
        "Tight delivery beats waffle",
        "Calm tone and pace",
        "Explain your thinking simply",
        "End on outcome/learning",
        "Smile – be human"
      ],
      questions: [
        "Walk through safe isolation",
        "Explain a past fault-finding approach",
        "When would you select a Type A RCD?",
        "How do you manage client pressure and safety?",
        "What would your first 90 days focus on?"
      ],
      bs7671: [
        "Safe isolation sequence",
        "Disconnection times and RCD application"
      ],
      checklist: [
        "5 practice Qs recorded",
        "Notes on improvements",
        "Mock scheduled",
        "Thank-you email template",
        "Reg refresh list"
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
    },
    {
      title: "Offer & Negotiation (UK)",
      icon: Target,
      category: "process",
      difficulty: "Intermediate",
      overviewTitle: "Close strongly",
      overviewDescription: "Prepare for salary, overtime, travel and contract terms typical in UK electrical roles.",
      steps: [
        "Research typical rates in your region and sector",
        "Know your minimum acceptable base, O/T, and call-out",
        "Clarify travel time, van use, fuel card, and parking",
        "Ask about training budgets, 18th refreshers, and 2391",
        "Confirm next steps, start date, and paperwork required"
      ],
      keyPoints: [
        "Be polite and factual – never adversarial",
        "Discuss total package not just base rate",
        "Clarify standby/call-out structure and caps",
        "Ask about PPE, tools, and test instrument provisions",
        "Summarise agreed points in an email"
      ],
      questions: [
        "How are overtime and call-outs paid (rate and minimums)?",
        "Is travel time to client sites paid?",
        "What training or certification budget is available?",
        "What is the probation period and review?",
        "When would you like me to start?"
      ],
      bs7671: [
        "CPD and keeping current with amendments",
        "Documentation responsibilities and sign-off authority"
      ],
      checklist: [
        "Written offer reviewed",
        "Clarified O/T and call-out terms",
        "Travel/van policy confirmed",
        "Training and PPE provisions noted",
        "Start date agreed"
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
              <MobileAccordionItem key={index} value={`guide-${index}`} className="rounded-lg mb-4">
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
                <MobileAccordionContent className="bg-elec-gray border border-elec-yellow/20 border-t-0 rounded-b-lg px-4 py-3 text-[12px]">
                  {"overviewTitle" in guide && (
                    <div className="mb-2">
                      <h5 className="font-semibold text-[13px]">{(guide as any).overviewTitle}</h5>
                      <p className="text-xs text-muted-foreground">{(guide as any).overviewDescription}</p>
                    </div>
                  )}

                  <div className="border-t pt-3">
                    <h5 className="font-semibold text-[13px] mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Implementation Steps
                    </h5>
                    <ul className="space-y-2">
                      {guide.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-2 text-[13px]">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {"questions" in guide && (
                    <div className="border-t pt-3">
                      <h5 className="font-semibold text-[13px] mb-2">Practice Questions</h5>
                      <ul className="space-y-2">
                        {(guide as any).questions.map((q: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-[13px]">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="leading-relaxed">{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {"bs7671" in guide && (
                    <div className="border-t pt-3">
                      <h5 className="font-semibold text-[13px] mb-2">BS 7671 Focus</h5>
                      <ul className="space-y-2">
                        {(guide as any).bs7671.map((p: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-[13px]">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="leading-relaxed">{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {"checklist" in guide && (
                    <div className="border-t pt-3">
                      <h5 className="font-semibold text-[13px] mb-2">Quick Checklist</h5>
                      <ul className="space-y-2">
                        {(guide as any).checklist.map((p: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-[13px]">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {extra?.good?.length ? (
                    <div className="border-t pt-3">
                      <h5 className="font-semibold text-[13px] mb-2">What good looks like</h5>
                      <ul className="space-y-2">
                        {extra.good.map((g: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-[13px]">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{g}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {extra?.avoid?.length ? (
                    <div className="border-t pt-3">
                      <h5 className="font-semibold text-[13px] mb-2 flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Avoid
                      </h5>
                      <ul className="space-y-2">
                        {extra.avoid.map((a: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-[13px]">
                            <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {extra?.phrase ? (
                    <div className="border-t pt-3">
                      <h5 className="font-semibold text-[13px] mb-2">Pocket phrase</h5>
                      <p className="text-xs text-muted-foreground italic">"{extra.phrase}"</p>
                    </div>
                  ) : null}

                  <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-2.5 mt-3">
                    <div className="text-[13px] font-medium text-green-300 mb-1">Impact</div>
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
