import { FileText, AlertTriangle, CheckSquare, Shield, Eye, Wrench, Scale, Layers } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";
import useSEO from "@/hooks/useSEO";

const AM2Module2Section2 = () => {
  useSEO(
    "Risk Assessments and Method Statements (RAMS) - AM2 Module 2",
    "Complete guide to RAMS for AM2 assessment - legal requirements, common mistakes, and proper documentation"
  );

  const quickCheckQuestions = [
    {
      id: "rams-difference",
      question: "What's the difference between a risk assessment and a method statement?",
      options: [
        "They are the same thing",
        "Risk assessment identifies hazards/controls; method statement describes safe working procedure",
        "Risk assessment is for electrical work; method statement is for general work",
        "Method statement identifies hazards; risk assessment describes procedures"
      ],
      correctIndex: 1,
      explanation: "Risk assessment identifies hazards and control measures, whilst method statement provides the step-by-step safe working procedure."
    },
    {
      id: "ppe-specificity",
      question: "If you write 'use PPE' in RAMS, is it enough?",
      options: [
        "Yes, it shows safety awareness",
        "No, you must specify type and purpose",
        "Yes, if combined with other measures",
        "Only if PPE is available on site"
      ],
      correctIndex: 1,
      explanation: "'Use PPE' is too vague and scores no marks. You must specify type (safety glasses, insulated gloves) and purpose (protection from debris, electrical protection)."
    },
    {
      id: "hazard-identification",
      question: "Which of these is the most important hazard to identify in electrical installation work?",
      options: [
        "Bad weather conditions",
        "Electric shock and burns",
        "Traffic noise",
        "Tool availability"
      ],
      correctIndex: 1,
      explanation: "Electric shock and burns are the primary hazards in electrical work that can cause serious injury or death, making them the most critical to identify and control."
    },
    {
      id: "control-hierarchy",
      question: "What is the correct hierarchy of control measures?",
      options: [
        "PPE > Engineering > Administrative > Elimination",
        "Elimination > Substitution > Engineering > Administrative > PPE",
        "Administrative > PPE > Engineering > Elimination",
        "Engineering > PPE > Administrative > Substitution"
      ],
      correctIndex: 1,
      explanation: "The hierarchy prioritises elimination (removing the hazard) first, followed by substitution, engineering controls, administrative controls, and PPE as the last resort."
    },
    {
      id: "legal-requirements",
      question: "Which regulations specifically require electrical work to be properly planned and assessed?",
      options: [
        "Only Building Regulations",
        "MHSWR 1999 and EAWR 1989",
        "Only CDM Regulations",
        "Only company policies"
      ],
      correctIndex: 1,
      explanation: "Both the Management of Health and Safety at Work Regulations 1999 and Electricity at Work Regulations 1989 legally require proper planning and risk assessment."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What's the difference between a risk assessment and a method statement?",
      options: [
        "They are the same thing",
        "Risk assessment identifies hazards/controls; method statement describes safe working procedure",
        "Risk assessment is for electrical work; method statement is for general work",
        "Method statement identifies hazards; risk assessment describes procedures"
      ],
      correctAnswer: 1,
      explanation: "Risk assessment identifies hazards and control measures, whilst method statement provides the step-by-step safe working procedure."
    },
    {
      id: 2,
      question: "Which regulations require safe planning of electrical work in the UK?",
      options: [
        "Only EAWR 1989",
        "Only MHSWR 1999",
        "Both MHSWR 1999 and EAWR 1989",
        "Only BS7671"
      ],
      correctAnswer: 2,
      explanation: "Both the Management of Health and Safety at Work Regulations 1999 and Electricity at Work Regulations 1989 require proper planning and risk assessment."
    },
    {
      id: 3,
      question: "True or false: Vague answers like 'be careful' score marks in RAMS.",
      options: [
        "True - any safety awareness gets marks",
        "False - specific, detailed entries are required",
        "True - if combined with other measures",
        "False - only PPE entries get marks"
      ],
      correctAnswer: 1,
      explanation: "Vague entries like 'be careful' score no marks. Assessors require specific, detailed control measures."
    },
    {
      id: 4,
      question: "Name three typical hazards in an AM2 installation task:",
      options: [
        "Rain, wind, cold",
        "Electrical shock, manual handling, working at height",
        "Time pressure, noise, lighting",
        "Tools, materials, transport"
      ],
      correctAnswer: 1,
      explanation: "Common AM2 hazards include electrical shock/burns, manual handling of equipment, and working at height (even low level)."
    },
    {
      id: 5,
      question: "Why must PPE be written specifically in RAMS?",
      options: [
        "It looks more professional",
        "Generic 'use PPE' entries score no marks - type and purpose must be stated",
        "To meet word count requirements",
        "Only expensive PPE needs to be listed"
      ],
      correctAnswer: 1,
      explanation: "'Use PPE' is too vague. You must specify type (safety glasses, insulated gloves) and purpose (protection from debris, electrical protection)."
    },
    {
      id: 6,
      question: "Who should be considered under 'who may be harmed'?",
      options: [
        "Only the electrician",
        "Only building occupants",
        "Self, colleagues, building occupants, public",
        "Only people in the immediate work area"
      ],
      correctAnswer: 2,
      explanation: "Consider all who might be affected: yourself, work colleagues, building occupants, members of the public, and anyone who might access the area."
    },
    {
      id: 7,
      question: "Give one example of a control measure other than PPE:",
      options: [
        "Working faster to reduce exposure time",
        "Isolation and lock-off procedures",
        "Ignoring minor hazards",
        "Working alone to reduce risk to others"
      ],
      correctAnswer: 1,
      explanation: "Isolation and lock-off, warning signs, barriers, permits to work, supervision, and training are all control measures beyond PPE."
    },
    {
      id: 8,
      question: "What's the purpose of a method statement?",
      options: [
        "To list all possible hazards",
        "To provide step-by-step safe working procedure",
        "To calculate project costs",
        "To record accident details"
      ],
      correctAnswer: 1,
      explanation: "Method statements describe the logical sequence of work activities and how they will be carried out safely."
    },
    {
      id: 9,
      question: "Why do generic/copy-paste RAMS answers fail?",
      options: [
        "They're too long",
        "Assessors want task-specific detail relevant to the actual work",
        "They use technical language",
        "They mention too many hazards"
      ],
      correctAnswer: 1,
      explanation: "Assessors look for task-specific analysis. Generic answers show you haven't properly considered the actual work and site conditions."
    },
    {
      id: 10,
      question: "What happens in AM2 if your RAMS is incomplete?",
      options: [
        "You get a warning but can continue",
        "You lose marks and may fail the assessment",
        "You get extra time to complete it",
        "Nothing - it's optional"
      ],
      correctAnswer: 1,
      explanation: "Incomplete or poor RAMS documentation will result in lost marks and can contribute to overall assessment failure."
    }
  ];

  const learningOutcomes = [
    "Explain the purpose of risk assessments and method statements",
    "Complete a RAMS form correctly for AM2 tasks",
    "Identify hazards, risks, and suitable control measures",
    "Demonstrate how RAMS links to electrical safety law",
    "Avoid the vague or incomplete entries that cost marks"
  ];

  return (
    <AM2SectionLayout
      backHref="/study-centre/apprentice/am2/module2"
      breadcrumbs={["AM2", "Module 2", "Section 2"]}
    >
      {/* Hero Section */}
      <AM2HeroSection
        icon={FileText}
        title="Risk Assessments and Method Statements (RAMS)"
        description="Complete guide to RAMS for AM2 assessment - legal requirements, common mistakes, and proper documentation."
        badge="Module 2 - Section 2"
      />

      {/* Critical Warning */}
      <AM2CriticalWarning title="RAMS Documentation Requirements">
        <p className="text-ios-callout text-white/90 mb-3">
          Risk Assessments and Method Statements (RAMS) are about proving you can plan safe work before starting.
          In the AM2, you will be expected to complete RAMS documentation for given tasks. This isn't just paperwork -
          it's a legal requirement in industry under the Management of Health and Safety at Work Regulations 1999 and Electricity at Work Regulations 1989.
        </p>
        <p className="text-ios-callout text-white/90 font-medium">
          Many candidates lose marks by rushing RAMS or writing vague answers. This section ensures you know how to complete them properly, both for AM2 and real-world site practice.
        </p>
      </AM2CriticalWarning>

      {/* Learning Outcomes */}
      <AM2LearningOutcomes outcomes={learningOutcomes} />

      {/* Purpose of RAMS */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3">1. Purpose of RAMS</h2>
        <div className="space-y-4 text-ios-callout text-white/90">
          <div>
            <h3 className="text-ios-headline font-semibold text-white mb-2">Risk Assessment:</h3>
            <p className="mb-2">Identify hazards, assess likelihood/severity, put in controls.</p>
            <p className="text-white/70">A systematic examination of work activities to identify what could cause harm to people, property, or the environment. The assessment considers the likelihood of occurrence and potential severity of consequences.</p>
          </div>
          <div>
            <h3 className="text-ios-headline font-semibold text-white mb-2">Method Statement:</h3>
            <p className="mb-2">Step-by-step description of how the job will be done safely.</p>
            <p className="text-white/70">A detailed, logical sequence describing how work activities will be carried out, including safety measures, equipment required, and personnel responsibilities.</p>
          </div>
          <div>
            <h3 className="text-ios-headline font-semibold text-white mb-2">Used Together:</h3>
            <p className="mb-2">RAMS shows you've thought through risks and how to mitigate them.</p>
            <p className="text-white/70">The combination demonstrates competent planning, legal compliance, and professional approach to electrical installation work.</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl">
          <h4 className="text-ios-headline font-semibold text-elec-yellow mb-2 flex items-center gap-2">
            <Scale className="w-4 h-4" />
            Legal Framework
          </h4>
          <ul className="space-y-1 text-ios-callout text-white/80">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Management of Health and Safety at Work Regulations 1999 (Regulation 3)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Electricity at Work Regulations 1989 (Regulation 4)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Construction (Design and Management) Regulations 2015</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Health and Safety at Work Act 1974</span>
            </li>
          </ul>
        </div>
      </AM2ContentCard>

      <InlineCheck {...quickCheckQuestions[0]} />

      {/* Equipment and Documentation */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Equipment & Documentation Requirements
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-ios-headline font-semibold text-white mb-3">Essential Documentation</h3>
            <ul className="space-y-2 text-ios-callout text-white/80">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                RAMS form (provided by assessor)
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Site drawings/plans
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Equipment specifications
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Isolation procedures
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Emergency contact details
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-ios-headline font-semibold text-white mb-3">Reference Materials</h3>
            <ul className="space-y-2 text-ios-callout text-white/80">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                BS 7671 IET Wiring Regulations
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                IET Code of Practice
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                HSE Guidance Notes
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Manufacturer instructions
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Company safety policies
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Pre-RAMS Checklist */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <CheckSquare className="h-5 w-5" />
          Pre-RAMS Checklist
        </h2>
        <p className="text-ios-body text-white/90 mb-4">
          Before completing your RAMS documentation, ensure you have:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-ios-headline font-semibold text-white mb-3">Site Analysis</h3>
            <ul className="space-y-2 text-ios-callout text-white/80">
              <li className="flex items-start gap-2">
                <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Examined work location thoroughly
              </li>
              <li className="flex items-start gap-2">
                <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Identified access/egress routes
              </li>
              <li className="flex items-start gap-2">
                <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Noted environmental conditions
              </li>
              <li className="flex items-start gap-2">
                <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Checked for existing installations
              </li>
              <li className="flex items-start gap-2">
                <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Assessed building occupancy
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-ios-headline font-semibold text-white mb-3">Task Planning</h3>
            <ul className="space-y-2 text-ios-callout text-white/80">
              <li className="flex items-start gap-2">
                <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Understood work scope completely
              </li>
              <li className="flex items-start gap-2">
                <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Listed required tools/equipment
              </li>
              <li className="flex items-start gap-2">
                <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Determined work sequence
              </li>
              <li className="flex items-start gap-2">
                <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Identified competency requirements
              </li>
              <li className="flex items-start gap-2">
                <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Considered time constraints
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* How RAMS appears in AM2 */}
      <AM2ContentCard accent>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3">2. How RAMS Appears in AM2</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-ios-headline font-semibold text-white mb-3">NET Assessment Structure</h3>
            <p className="text-ios-callout text-white/80 mb-4">
              RAMS documentation is a mandatory component of every AM2 practical assessment. Candidates receive a RAMS form at the start of their assessment task and must complete it before beginning practical work.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-ios-subheadline font-semibold text-elec-yellow mb-2">Time Allocation</h4>
                <ul className="space-y-1 text-ios-footnote text-white/70">
                  <li>• Allow 15-20 minutes for completion</li>
                  <li>• Complete before starting practical work</li>
                  <li>• Cannot proceed without assessor approval</li>
                  <li>• Forms part of overall time management</li>
                </ul>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-ios-subheadline font-semibold text-elec-yellow mb-2">Marking Weighting</h4>
                <ul className="space-y-1 text-ios-footnote text-white/70">
                  <li>• Significant marks allocation in assessment</li>
                  <li>• Poor RAMS can cause overall failure</li>
                  <li>• Assessed alongside practical work quality</li>
                  <li>• Professional competence demonstration</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-ios-headline font-semibold text-white mb-3">Must Include:</h3>
            <ul className="space-y-2 text-ios-callout text-white/80">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Task description
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Identified hazards (electrical, slips, manual handling, working at height, etc.)
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Who may be harmed (self, others, public)
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Control measures (isolation, PPE, signage, supervision, permits)
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Residual risk
              </li>
            </ul>
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-ios-callout text-red-400 font-medium">
                Vague answers like "be careful" = no marks.
              </p>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck {...quickCheckQuestions[4]} />

      {/* Step-by-Step RAMS Completion */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3">3. Step-by-Step RAMS Completion Guide</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-ios-headline font-semibold text-white mb-3 flex items-center gap-2">
              <div className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold">1</div>
              Task Description
            </h3>
            <p className="text-ios-callout text-white/80 mb-2">
              Write a clear, specific description of what you're doing:
            </p>
            <div className="p-3 rounded-xl border border-green-500/30 bg-green-500/10 mb-2">
              <p className="text-ios-callout text-green-400">
                Good: "Installation of new 13A twin socket outlet in domestic kitchen, including 2.5mm T&E cable run from consumer unit"
              </p>
            </div>
            <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/10">
              <p className="text-ios-callout text-red-400">
                Bad: "Socket installation" (too vague)
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-ios-headline font-semibold text-white mb-3 flex items-center gap-2">
              <div className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold">2</div>
              Hazard Identification
            </h3>
            <p className="text-ios-callout text-white/80 mb-3">
              Consider ALL potential hazards systematically:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-ios-subheadline font-semibold text-white mb-2">Electrical Hazards</h4>
                <ul className="space-y-1 text-ios-footnote text-white/70">
                  <li>• Electric shock from live conductors</li>
                  <li>• Burns from arcing/short circuits</li>
                  <li>• Fire from overheating connections</li>
                  <li>• Explosion from gas ignition</li>
                </ul>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-ios-subheadline font-semibold text-white mb-2">Physical Hazards</h4>
                <ul className="space-y-1 text-ios-footnote text-white/70">
                  <li>• Cuts from sharp edges/tools</li>
                  <li>• Eye injury from debris</li>
                  <li>• Manual handling strains</li>
                  <li>• Slips/trips from cables/debris</li>
                </ul>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-ios-subheadline font-semibold text-white mb-2">Environmental</h4>
                <ul className="space-y-1 text-ios-footnote text-white/70">
                  <li>• Dust inhalation</li>
                  <li>• Confined spaces</li>
                  <li>• Working at height</li>
                  <li>• Noise exposure</li>
                </ul>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-ios-subheadline font-semibold text-white mb-2">Human Factors</h4>
                <ul className="space-y-1 text-ios-footnote text-white/70">
                  <li>• Unauthorised access to work area</li>
                  <li>• Interference by building users</li>
                  <li>• Inadequate lighting</li>
                  <li>• Time pressure affecting decisions</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-ios-headline font-semibold text-white mb-3 flex items-center gap-2">
              <div className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold">3</div>
              Who May Be Harmed
            </h3>
            <p className="text-ios-callout text-white/80 mb-2">
              Consider everyone who could be affected:
            </p>
            <ul className="space-y-1 text-ios-callout text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Yourself (the electrician)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Work colleagues/apprentices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Building occupants (residents/staff)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Visitors to the premises</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Emergency services personnel</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Members of the public</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-ios-headline font-semibold text-white mb-3 flex items-center gap-2">
              <div className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold">4</div>
              Control Measures
            </h3>
            <p className="text-ios-callout text-white/80 mb-3">
              Apply hierarchy of controls - be specific about each measure:
            </p>
            <div className="space-y-3">
              <div className="border-l-4 border-green-500 pl-4 py-2 bg-white/5 rounded-r-xl">
                <h4 className="text-ios-subheadline font-semibold text-green-400">Elimination/Substitution</h4>
                <p className="text-ios-footnote text-white/70">Remove hazard completely or replace with safer alternative</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2 bg-white/5 rounded-r-xl">
                <h4 className="text-ios-subheadline font-semibold text-blue-400">Engineering Controls</h4>
                <p className="text-ios-footnote text-white/70">Isolation procedures, earthing, RCD protection, barriers</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4 py-2 bg-white/5 rounded-r-xl">
                <h4 className="text-ios-subheadline font-semibold text-orange-400">Administrative Controls</h4>
                <p className="text-ios-footnote text-white/70">Permits to work, signage, training, supervision, procedures</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4 py-2 bg-white/5 rounded-r-xl">
                <h4 className="text-ios-subheadline font-semibold text-red-400">Personal Protective Equipment</h4>
                <p className="text-ios-footnote text-white/70">Last resort - specify exact type and purpose</p>
              </div>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck {...quickCheckQuestions[2]} />

      {/* Common Mistakes */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          4. Common Mistakes in AM2 RAMS (NET list)
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-ios-headline font-semibold text-red-400 mb-3">Critical Failures</h3>
            <ul className="space-y-3 text-ios-callout text-white/80">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                Writing "use PPE" without stating type (gloves, goggles, insulated mat)
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                Not identifying all hazards (focusing only on electrical, ignoring environment)
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                Failing to include signage, lock-off, or permits as control measures
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                Copy-pasting generic answers without linking to task
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-ios-headline font-semibold text-orange-400 mb-3">Common Errors</h3>
            <ul className="space-y-3 text-ios-callout text-white/80">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                Not writing a logical sequence in method statement
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                Forgetting to mention isolation verification procedures
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                Omitting emergency procedures and contact details
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                Not considering building occupants' safety
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <h4 className="text-ios-headline font-semibold text-red-400 mb-2">Examples of Inadequate Entries</h4>
          <div className="grid md:grid-cols-2 gap-4 text-ios-callout">
            <div>
              <p className="font-semibold text-red-400 mb-1">Wrong:</p>
              <ul className="space-y-1 text-white/70">
                <li>• "Use appropriate PPE"</li>
                <li>• "Be careful with electricity"</li>
                <li>• "Follow safe working practices"</li>
                <li>• "Avoid hazards"</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-green-400 mb-1">Correct:</p>
              <ul className="space-y-1 text-white/70">
                <li>• "Wear insulated gloves rated 1000V for testing"</li>
                <li>• "Isolate circuit at MCB, verify dead with proving unit"</li>
                <li>• "Display warning signs 'Electrician at Work'"</li>
                <li>• "Maintain 1m exclusion zone around work area"</li>
              </ul>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck {...quickCheckQuestions[3]} />

      {/* RAMS Hazard Matrix */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Layers className="h-5 w-5" />
          5. RAMS Hazard Identification Matrix
        </h2>
        <p className="text-ios-body text-white/90 mb-4">
          Use this systematic approach to ensure you identify all relevant hazards for AM2 tasks:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-ios-footnote border border-white/20 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-elec-yellow/20">
                <th className="border border-white/20 p-3 text-left text-white">Hazard Category</th>
                <th className="border border-white/20 p-3 text-left text-white">Specific Hazards</th>
                <th className="border border-white/20 p-3 text-left text-white">Typical Control Measures</th>
              </tr>
            </thead>
            <tbody className="text-white/80">
              <tr>
                <td className="border border-white/20 p-3 font-semibold text-elec-yellow">Electrical</td>
                <td className="border border-white/20 p-3">
                  <ul className="space-y-1">
                    <li>• Electric shock from live parts</li>
                    <li>• Burns from arc flash/short circuit</li>
                    <li>• Fire from overheated connections</li>
                  </ul>
                </td>
                <td className="border border-white/20 p-3">
                  <ul className="space-y-1">
                    <li>• Isolation and lock-off procedures</li>
                    <li>• Proving unit verification</li>
                    <li>• Insulated tools and PPE</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="border border-white/20 p-3 font-semibold text-elec-yellow">Physical</td>
                <td className="border border-white/20 p-3">
                  <ul className="space-y-1">
                    <li>• Cuts from sharp tools/edges</li>
                    <li>• Eye injury from drilling debris</li>
                    <li>• Manual handling of equipment</li>
                  </ul>
                </td>
                <td className="border border-white/20 p-3">
                  <ul className="space-y-1">
                    <li>• Safety glasses and gloves</li>
                    <li>• Proper lifting techniques</li>
                    <li>• Tool inspection before use</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="border border-white/20 p-3 font-semibold text-elec-yellow">Environmental</td>
                <td className="border border-white/20 p-3">
                  <ul className="space-y-1">
                    <li>• Dust from drilling/cutting</li>
                    <li>• Working at height (even stepladders)</li>
                    <li>• Confined or restricted spaces</li>
                  </ul>
                </td>
                <td className="border border-white/20 p-3">
                  <ul className="space-y-1">
                    <li>• Dust masks/extraction</li>
                    <li>• Stable working platform</li>
                    <li>• Adequate lighting and ventilation</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="border border-white/20 p-3 font-semibold text-elec-yellow">Human</td>
                <td className="border border-white/20 p-3">
                  <ul className="space-y-1">
                    <li>• Unauthorised access to work area</li>
                    <li>• Interference by building users</li>
                    <li>• Communication failures</li>
                  </ul>
                </td>
                <td className="border border-white/20 p-3">
                  <ul className="space-y-1">
                    <li>• Warning signs and barriers</li>
                    <li>• Briefing of building occupants</li>
                    <li>• Clear communication protocols</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </AM2ContentCard>

      {/* Control Measures Library */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          6. Control Measures Library
        </h2>
        <p className="text-ios-body text-white/90 mb-4">
          Specific control measures to use in your RAMS documentation:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-ios-headline font-semibold text-white mb-3">Isolation Controls</h3>
            <ul className="space-y-2 text-ios-callout text-white/80">
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                "Isolate circuit at consumer unit MCB"
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                "Apply padlock and danger tag to isolator"
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                "Verify dead using proving unit to BS GS 38"
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                "Re-prove test instrument on known live source"
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-ios-headline font-semibold text-white mb-3">PPE Specifications</h3>
            <ul className="space-y-2 text-ios-callout text-white/80">
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                "Insulated gloves rated 1000V for electrical testing"
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                "Safety glasses to BS EN 166 for drilling operations"
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                "Hard hat where overhead hazards present"
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                "Dust mask FFP2 for drilling in masonry"
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-ios-headline font-semibold text-white mb-3">Access Control</h3>
            <ul className="space-y-2 text-ios-callout text-white/80">
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                "Display 'Electrician at Work' warning signs"
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                "Maintain 1m exclusion zone around work area"
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                "Brief building occupants on work activities"
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                "Restrict access during high-risk activities"
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-ios-headline font-semibold text-white mb-3">Emergency Procedures</h3>
            <ul className="space-y-2 text-ios-callout text-white/80">
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                "Emergency contact: Site supervisor [number]"
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                "First aid kit location identified and accessible"
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                "Emergency isolation procedure communicated"
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                "Fire evacuation routes kept clear"
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck {...quickCheckQuestions[1]} />

      {/* What Assessors Look For */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Eye className="h-5 w-5" />
          7. What Assessors Look For
        </h2>
        <p className="text-ios-body text-white/90 mb-4">
          Understanding assessment criteria helps you focus on what earns marks:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-ios-headline font-semibold text-green-400 mb-3">What Gets Marks</h3>
            <ul className="space-y-2 text-ios-callout text-white/80">
              <li className="flex items-start gap-2">
                <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Specific, detailed hazard identification
              </li>
              <li className="flex items-start gap-2">
                <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Control measures linked to specific hazards
              </li>
              <li className="flex items-start gap-2">
                <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Task-specific PPE with purpose stated
              </li>
              <li className="flex items-start gap-2">
                <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Logical work sequence in method statement
              </li>
              <li className="flex items-start gap-2">
                <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Consideration of all affected persons
              </li>
              <li className="flex items-start gap-2">
                <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Emergency procedures included
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-ios-headline font-semibold text-red-400 mb-3">What Loses Marks</h3>
            <ul className="space-y-2 text-ios-callout text-white/80">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                Generic or vague descriptions
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                Missing key hazards for the task
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                Inappropriate or missing control measures
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                Illogical or incomplete method sequence
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                Failing to consider building occupants
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                Copy-paste answers not relevant to task
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl">
          <h4 className="text-ios-headline font-semibold text-elec-yellow mb-2">Time Management Tips</h4>
          <ul className="space-y-1 text-ios-callout text-white/80">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Allow 15-20 minutes for RAMS completion</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Read the task description twice before starting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Use bullet points for clarity and speed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Focus on task-specific details, not generic safety advice</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Review for completeness before submitting</span>
            </li>
          </ul>
        </div>
      </AM2ContentCard>

      {/* FAQs */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-ios-headline text-white font-semibold mb-1">Q1: Do I need to list every possible hazard?</h3>
            <p className="text-ios-callout text-white/70">A: Only the relevant ones - but think broadly (environment, tools, access, people).</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-ios-headline text-white font-semibold mb-1">Q2: Can I copy generic RAMS wording from memory?</h3>
            <p className="text-ios-callout text-white/70">A: No. Assessors want task-specific detail.</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-ios-headline text-white font-semibold mb-1">Q3: How detailed should PPE entries be?</h3>
            <p className="text-ios-callout text-white/70">A: State type and purpose: e.g., "insulated gloves for testing, safety glasses for drilling."</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-ios-headline text-white font-semibold mb-1">Q4: What's the biggest reason people lose marks in RAMS?</h3>
            <p className="text-ios-callout text-white/70">A: Vague or incomplete entries.</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-ios-headline text-white font-semibold mb-1">Q5: Will assessors mark spelling/grammar?</h3>
            <p className="text-ios-callout text-white/70">A: No, but clarity matters - write plainly and logically.</p>
          </div>
        </div>
      </AM2ContentCard>

      {/* Summary */}
      <AM2ContentCard accent>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3">Summary</h2>
        <p className="text-ios-body text-white/90 mb-4">
          RAMS is about proving you can plan safe work. In AM2, weak RAMS entries = easy lost marks. Always:
        </p>
        <ul className="space-y-2 text-ios-callout text-white/90">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            Identify specific hazards
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            State clear control measures
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            Link PPE, signage, and lock-off to the actual task
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            Write a logical method sequence
          </li>
        </ul>
        <p className="text-ios-body text-white/90 mt-4">
          Done right, RAMS is quick, clear, and earns you marks while protecting you in real work.
        </p>
      </AM2ContentCard>

      {/* Quiz Section */}
      <Quiz
        questions={quizQuestions}
        title="RAMS Quiz"
      />

      {/* Navigation Footer */}
      <AM2NavigationFooter
        prevHref="../section1"
        prevLabel="Previous: Section 1"
        nextHref="../section3"
        nextLabel="Continue to Section 3"
        currentSection={2}
        totalSections={8}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module2Section2;
