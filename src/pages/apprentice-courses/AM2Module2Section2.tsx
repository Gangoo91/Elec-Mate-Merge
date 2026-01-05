import { ArrowLeft, AlertTriangle, FileText, CheckSquare, Shield, Clock, Users, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
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
        "PPE → Engineering → Administrative → Elimination",
        "Elimination → Substitution → Engineering → Administrative → PPE",
        "Administrative → PPE → Engineering → Elimination",
        "Engineering → PPE → Administrative → Substitution"
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-0 self-start" asChild>
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 2
              </Link>
            </Button>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>25 min read</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Beginner Level</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-12">
        {/* Title Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm font-medium rounded-full mb-4">
            <FileText className="w-4 h-4" />
            Module 2 – Section 2
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Risk Assessments and Method Statements (RAMS)
          </h1>
          <p className="text-base text-muted-foreground mb-8 leading-relaxed">
            Complete guide to RAMS for AM2 assessment - legal requirements, common mistakes, and proper documentation.
          </p>
        </div>

        {/* RAMS Warning */}
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30 mb-8">
          <div className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  CRITICAL: RAMS Documentation Requirements
                </h3>
                <p className="text-sm text-red-700 dark:text-emerald-400 mb-3">
                  Risk Assessments and Method Statements (RAMS) are about proving you can plan safe work before starting. 
                  In the AM2, you will be expected to complete RAMS documentation for given tasks. This isn't just paperwork — 
                  it's a legal requirement in industry under the Management of Health and Safety at Work Regulations 1999 and Electricity at Work Regulations 1989.
                </p>
                <p className="text-sm text-red-700 dark:text-emerald-400 font-medium">
                  Many candidates lose marks by rushing RAMS or writing vague answers. This section ensures you know how to complete them properly, both for AM2 and real-world site practice.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <CheckSquare className="w-5 h-5" />
              Learning Outcomes
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              By the end of this section, you should be able to:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Explain the purpose of risk assessments and method statements
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Complete a RAMS form correctly for AM2 tasks
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Identify hazards, risks, and suitable control measures
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Demonstrate how RAMS links to electrical safety law
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Avoid the vague or incomplete entries that cost marks
              </li>
            </ul>
          </div>
        </Card>

        {/* Purpose of RAMS */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              1. Purpose of RAMS
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div>
                <h3 className="font-semibold text-base mb-2">Risk Assessment:</h3>
                <p className="mb-2">Identify hazards, assess likelihood/severity, put in controls.</p>
                <p className="text-muted-foreground">A systematic examination of work activities to identify what could cause harm to people, property, or the environment. The assessment considers the likelihood of occurrence and potential severity of consequences.</p>
              </div>
              <div>
                <h3 className="font-semibold text-base mb-2">Method Statement:</h3>
                <p className="mb-2">Step-by-step description of how the job will be done safely.</p>
                <p className="text-muted-foreground">A detailed, logical sequence describing how work activities will be carried out, including safety measures, equipment required, and personnel responsibilities.</p>
              </div>
              <div>
                <h3 className="font-semibold text-base mb-2">Used Together:</h3>
                <p className="mb-2">RAMS shows you've thought through risks and how to mitigate them.</p>
                <p className="text-muted-foreground">The combination demonstrates competent planning, legal compliance, and professional approach to electrical installation work.</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-blue-200 dark:border-blue-800/30 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Legal Framework</h4>
              <ul className="space-y-1 text-sm text-blue-700 dark:text-emerald-400">
                <li>• Management of Health and Safety at Work Regulations 1999 (Regulation 3)</li>
                <li>• Electricity at Work Regulations 1989 (Regulation 4)</li>
                <li>• Construction (Design and Management) Regulations 2015</li>
                <li>• Health and Safety at Work Act 1974</li>
              </ul>
            </div>
            <InlineCheck {...quickCheckQuestions[0]} />
          </div>
        </Card>

        {/* Equipment and Documentation */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              Equipment & Documentation Requirements
            </h2>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="font-semibold text-base mb-3">Essential Documentation</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    RAMS form (provided by assessor)
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    Site drawings/plans
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    Equipment specifications
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    Isolation procedures
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    Emergency contact details
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-base mb-3">Reference Materials</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    BS 7671 IET Wiring Regulations
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    IET Code of Practice
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    HSE Guidance Notes
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    Manufacturer instructions
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    Company safety policies
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Pre-RAMS Checklist */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              Pre-RAMS Checklist
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Before completing your RAMS documentation, ensure you have:
            </p>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="font-semibold text-base mb-3">Site Analysis</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-foreground">
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
                <h3 className="font-semibold text-base mb-3">Task Planning</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-foreground">
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
          </div>
        </Card>

        {/* How RAMS appears in AM2 */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              2. How RAMS appears in AM2
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-base mb-3">NET Assessment Structure</h3>
                <p className="text-xs sm:text-sm text-foreground mb-4">
                  RAMS documentation is a mandatory component of every AM2 practical assessment. Candidates receive a RAMS form at the start of their assessment task and must complete it before beginning practical work.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-blue-700 dark:text-emerald-400">Time Allocation</h4>
                    <ul className="space-y-1 text-xs sm:text-sm text-foreground">
                      <li>• Allow 15-20 minutes for completion</li>
                      <li>• Complete before starting practical work</li>
                      <li>• Cannot proceed without assessor approval</li>
                      <li>• Forms part of overall time management</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-blue-700 dark:text-emerald-400">Marking Weighting</h4>
                    <ul className="space-y-1 text-xs sm:text-sm text-foreground">
                      <li>• Significant marks allocation in assessment</li>
                      <li>• Poor RAMS can cause overall failure</li>
                      <li>• Assessed alongside practical work quality</li>
                      <li>• Professional competence demonstration</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-base mb-3">NET Assessor Requirements</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  What NET assessors specifically look for in RAMS documentation:
                </p>
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-blue-200 dark:border-blue-800/30 p-4 rounded-lg">
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-emerald-400">
                    <li>• Task-specific hazard identification relevant to actual work</li>
                    <li>• Detailed control measures with specific PPE requirements</li>
                    <li>• Consideration of BS 7671 compliance and electrical safety</li>
                    <li>• Evidence of systematic risk assessment approach</li>
                    <li>• Professional language and technical accuracy</li>
                    <li>• Logical work sequence in method statement</li>
                    <li>• Emergency procedures and contact information</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-base mb-3">Legal Framework Integration</h3>
                <p className="text-xs sm:text-sm text-foreground mb-3">
                  RAMS demonstrates understanding of key electrical safety legislation:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">MHSWR 1999</h4>
                    <ul className="space-y-1 text-xs text-foreground">
                      <li>• Regulation 3: Risk assessment requirements</li>
                      <li>• Regulation 5: Health and safety arrangements</li>
                      <li>• Regulation 13: Capabilities and training</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">EAWR 1989</h4>
                    <ul className="space-y-1 text-xs text-foreground">
                      <li>• Regulation 4: Systems, work activities and protective equipment</li>
                      <li>• Regulation 12: Cutting off the supply</li>
                      <li>• Regulation 13: Precautions for work on dead equipment</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-base mb-3">Common Assessment Scenarios</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Typical NET AM2 tasks requiring RAMS completion:
                </p>
                <ul className="space-y-1 text-xs sm:text-sm text-foreground">
                  <li>• Socket outlet installation and circuit extension</li>
                  <li>• Lighting circuit modifications and switch additions</li>
                  <li>• Consumer unit upgrades and circuit protection</li>
                  <li>• Inspection and testing procedures</li>
                  <li>• Emergency lighting installations</li>
                  <li>• Three-phase equipment connections</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[4]} />

            <h3 className="font-semibold text-base mb-3 mt-6">Must include:</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground mb-4">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Task description
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Identified hazards (electrical, slips, manual handling, working at height, etc.)
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Who may be harmed (self, others, public)
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Control measures (isolation, PPE, signage, supervision, permits)
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Residual risk
              </li>
            </ul>
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 p-4 rounded-lg">
              <p className="text-sm text-red-700 dark:text-emerald-400 font-medium">
                Vague answers like "be careful" = no marks.
              </p>
            </div>
          </div>
        </Card>

        {/* Step-by-Step RAMS Completion */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              3. Step-by-Step RAMS Completion Guide
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
                  <div className="w-6 h-6 bg-emerald-500 text-black rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  Task Description
                </h3>
                <p className="text-xs sm:text-sm text-foreground mb-2">
                  Write a clear, specific description of what you're doing:
                </p>
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 p-3 rounded-lg mb-2">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    ✅ "Installation of new 13A twin socket outlet in domestic kitchen, including 2.5mm² T&E cable run from consumer unit"
                  </p>
                </div>
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 p-3 rounded-lg">
                  <p className="text-sm text-red-700 dark:text-emerald-400">
                    ❌ "Socket installation" (too vague)
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
                  <div className="w-6 h-6 bg-emerald-500 text-black rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  Hazard Identification
                </h3>
                <p className="text-xs sm:text-sm text-foreground mb-3">
                  Consider ALL potential hazards systematically:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Electrical Hazards</h4>
                    <ul className="space-y-1 text-xs sm:text-sm text-foreground">
                      <li>• Electric shock from live conductors</li>
                      <li>• Burns from arcing/short circuits</li>
                      <li>• Fire from overheating connections</li>
                      <li>• Explosion from gas ignition</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Physical Hazards</h4>
                    <ul className="space-y-1 text-xs sm:text-sm text-foreground">
                      <li>• Cuts from sharp edges/tools</li>
                      <li>• Eye injury from debris</li>
                      <li>• Manual handling strains</li>
                      <li>• Slips/trips from cables/debris</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Environmental</h4>
                    <ul className="space-y-1 text-xs sm:text-sm text-foreground">
                      <li>• Dust inhalation</li>
                      <li>• Confined spaces</li>
                      <li>• Working at height</li>
                      <li>• Noise exposure</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Human Factors</h4>
                    <ul className="space-y-1 text-xs sm:text-sm text-foreground">
                      <li>• Unauthorised access to work area</li>
                      <li>• Interference by building users</li>
                      <li>• Inadequate lighting</li>
                      <li>• Time pressure affecting decisions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
                  <div className="w-6 h-6 bg-emerald-500 text-black rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  Who May Be Harmed
                </h3>
                <p className="text-xs sm:text-sm text-foreground mb-2">
                  Consider everyone who could be affected:
                </p>
                <ul className="space-y-1 text-xs sm:text-sm text-foreground">
                  <li>• Yourself (the electrician)</li>
                  <li>• Work colleagues/apprentices</li>
                  <li>• Building occupants (residents/staff)</li>
                  <li>• Visitors to the premises</li>
                  <li>• Emergency services personnel</li>
                  <li>• Members of the public</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
                  <div className="w-6 h-6 bg-emerald-500 text-black rounded-full flex items-center justify-center text-xs font-bold">4</div>
                  Control Measures
                </h3>
                <p className="text-xs sm:text-sm text-foreground mb-3">
                  Apply hierarchy of controls - be specific about each measure:
                </p>
                <div className="space-y-3">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-sm text-green-700 dark:text-green-300">Elimination/Substitution</h4>
                    <p className="text-sm text-muted-foreground">Remove hazard completely or replace with safer alternative</p>
                  </div>
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <h4 className="font-semibold text-sm text-blue-700 dark:text-emerald-400">Engineering Controls</h4>
                    <p className="text-sm text-muted-foreground">Isolation procedures, earthing, RCD protection, barriers</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-sm text-orange-700 dark:text-emerald-400">Administrative Controls</h4>
                    <p className="text-sm text-muted-foreground">Permits to work, signage, training, supervision, procedures</p>
                  </div>
                  <div className="border-l-4 border-l-red-500 pl-4">
                    <h4 className="font-semibold text-sm text-red-700 dark:text-emerald-400">Personal Protective Equipment</h4>
                    <p className="text-sm text-muted-foreground">Last resort - specify exact type and purpose</p>
                  </div>
                </div>

                <div className="mt-6">
                  <InlineCheck {...quickCheckQuestions[2]} />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Common Mistakes */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              4. Common Mistakes in AM2 RAMS (NET list)
            </h2>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="font-semibold text-base mb-3 text-red-600 dark:text-emerald-400">Critical Failures</h3>
                <ul className="space-y-3 text-xs sm:text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    Writing "use PPE" without stating type (gloves, goggles, insulated mat)
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    Not identifying all hazards (focusing only on electrical, ignoring environment)
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    Failing to include signage, lock-off, or permits as control measures
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    Copy-pasting generic answers without linking to task
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-base mb-3 text-orange-600 dark:text-emerald-400">Common Errors</h3>
                <ul className="space-y-3 text-xs sm:text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    Not writing a logical sequence in method statement
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    Forgetting to mention isolation verification procedures
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    Omitting emergency procedures and contact details
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    Not considering building occupants' safety
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Examples of Inadequate Entries</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-red-700 dark:text-emerald-400 mb-1">Wrong:</p>
                  <ul className="space-y-1 text-red-600 dark:text-emerald-400">
                    <li>• "Use appropriate PPE"</li>
                    <li>• "Be careful with electricity"</li>
                    <li>• "Follow safe working practices"</li>
                    <li>• "Avoid hazards"</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-green-700 dark:text-green-300 mb-1">Correct:</p>
                  <ul className="space-y-1 text-green-600 dark:text-green-400">
                    <li>• "Wear insulated gloves rated 1000V for testing"</li>
                    <li>• "Isolate circuit at MCB, verify dead with proving unit"</li>
                    <li>• "Display warning signs 'Electrician at Work'"</li>
                    <li>• "Maintain 1m exclusion zone around work area"</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <InlineCheck {...quickCheckQuestions[3]} />
            </div>
          </div>
        </Card>

        {/* RAMS Hazard Matrix */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              5. RAMS Hazard Identification Matrix
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Use this systematic approach to ensure you identify all relevant hazards for AM2 tasks:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border">
                <thead>
                  <tr className="bg-emerald-500/20">
                    <th className="border border-border p-3 text-left">Hazard Category</th>
                    <th className="border border-border p-3 text-left">Specific Hazards</th>
                    <th className="border border-border p-3 text-left">Typical Control Measures</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3 font-semibold">Electrical</td>
                    <td className="border border-border p-3">
                      <ul className="space-y-1">
                        <li>• Electric shock from live parts</li>
                        <li>• Burns from arc flash/short circuit</li>
                        <li>• Fire from overheated connections</li>
                      </ul>
                    </td>
                    <td className="border border-border p-3">
                      <ul className="space-y-1">
                        <li>• Isolation and lock-off procedures</li>
                        <li>• Proving unit verification</li>
                        <li>• Insulated tools and PPE</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-semibold">Physical</td>
                    <td className="border border-border p-3">
                      <ul className="space-y-1">
                        <li>• Cuts from sharp tools/edges</li>
                        <li>• Eye injury from drilling debris</li>
                        <li>• Manual handling of equipment</li>
                      </ul>
                    </td>
                    <td className="border border-border p-3">
                      <ul className="space-y-1">
                        <li>• Safety glasses and gloves</li>
                        <li>• Proper lifting techniques</li>
                        <li>• Tool inspection before use</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-semibold">Environmental</td>
                    <td className="border border-border p-3">
                      <ul className="space-y-1">
                        <li>• Dust from drilling/cutting</li>
                        <li>• Working at height (even stepladders)</li>
                        <li>• Confined or restricted spaces</li>
                      </ul>
                    </td>
                    <td className="border border-border p-3">
                      <ul className="space-y-1">
                        <li>• Dust masks/extraction</li>
                        <li>• Stable working platform</li>
                        <li>• Adequate lighting and ventilation</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-semibold">Human</td>
                    <td className="border border-border p-3">
                      <ul className="space-y-1">
                        <li>• Unauthorised access to work area</li>
                        <li>• Interference by building users</li>
                        <li>• Communication failures</li>
                      </ul>
                    </td>
                    <td className="border border-border p-3">
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
          </div>
        </Card>

        {/* Control Measures Library */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              6. Control Measures Library
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Specific control measures to use in your RAMS documentation:
            </p>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="font-semibold text-base mb-3">Isolation Controls</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-foreground">
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
                <h3 className="font-semibold text-base mb-3">PPE Specifications</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-foreground">
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
                <h3 className="font-semibold text-base mb-3">Access Control</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-foreground">
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
                <h3 className="font-semibold text-base mb-3">Emergency Procedures</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-foreground">
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
            
            <div className="mt-6">
              <InlineCheck {...quickCheckQuestions[4]} />
            </div>
          </div>
        </Card>

        {/* Real-world Link */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              7. Real-world Link
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-foreground">
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                In industry, RAMS protect workers and cover employers legally
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                HSE requires that work on or near electrical systems must be properly assessed and controlled
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Poor RAMS = unsafe site, increased risk of accidents
              </li>
            </ul>
          </div>
        </Card>

        {/* Practice RAMS Scenarios */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              5. Practice RAMS Scenarios
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Typical AM2 scenarios you should be able to complete RAMS for:
            </p>
            <div className="space-y-6">
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-blue-200 dark:border-blue-800/30 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Scenario 1: Socket Installation</h3>
                <p className="text-sm text-blue-700 dark:text-emerald-400 mb-3">
                  "Install new 13A twin socket outlet in domestic kitchen, including 2.5mm² T&E cable run from existing ring circuit"
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Key Hazards to Consider:</h4>
                    <ul className="space-y-1 text-emerald-400 dark:text-emerald-400">
                      <li>• Electric shock from existing ring circuit</li>
                      <li>• Water ingress in kitchen environment</li>
                      <li>• Dust from chasing walls</li>
                      <li>• Manual handling of tools/materials</li>
                      <li>• Kitchen users accessing work area</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Essential Control Measures:</h4>
                    <ul className="space-y-1 text-emerald-400 dark:text-emerald-400">
                      <li>• Isolate ring circuit at MCB</li>
                      <li>• Dust extraction during chasing</li>
                      <li>• Temporary barriers around work area</li>
                      <li>• IP rating suitable for location</li>
                      <li>• RCD protection verification</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Scenario 2: Lighting Circuit Modification</h3>
                <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                  "Add new ceiling light point in commercial office, including switch line modification and ceiling access"
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Key Hazards to Consider:</h4>
                    <ul className="space-y-1 text-green-600 dark:text-green-400">
                      <li>• Working at height on ladder/platform</li>
                      <li>• Ceiling void hazards (services/insulation)</li>
                      <li>• Existing lighting circuit energisation</li>
                      <li>• Office occupancy during work</li>
                      <li>• Emergency lighting implications</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Essential Control Measures:</h4>
                    <ul className="space-y-1 text-green-600 dark:text-green-400">
                      <li>• Stable working platform setup</li>
                      <li>• Ceiling void inspection before entry</li>
                      <li>• Coordinated isolation procedures</li>
                      <li>• Office notification and alternative lighting</li>
                      <li>• Proper PPE for ceiling work</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Scenario 3: Consumer Unit Replacement</h3>
                <p className="text-sm text-orange-700 dark:text-emerald-400 mb-3">
                  "Replace existing rewirable fuse consumer unit with modern RCBO unit in domestic premises"
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Key Hazards to Consider:</h4>
                    <ul className="space-y-1 text-orange-600 dark:text-emerald-400">
                      <li>• DNO supply isolation requirements</li>
                      <li>• Old installation condition unknown</li>
                      <li>• Total loss of power to premises</li>
                      <li>• Heavy equipment manual handling</li>
                      <li>• Asbestos in old installations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Essential Control Measures:</h4>
                    <ul className="space-y-1 text-orange-600 dark:text-emerald-400">
                      <li>• Coordinate with DNO for isolation</li>
                      <li>• Pre-work installation condition survey</li>
                      <li>• Alternative power arrangements</li>
                      <li>• Two-person lift for heavy components</li>
                      <li>• Asbestos awareness procedures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* What Assessors Look For */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              6. What Assessors Look For
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Understanding assessment criteria helps you focus on what earns marks:
            </p>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="font-semibold text-base mb-3 text-green-600 dark:text-green-400">What Gets Marks</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-foreground">
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
                  <li className="flex items-start gap-2">
                    <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Reference to relevant standards (BS 7671, BS GS 38)
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-base mb-3 text-red-600 dark:text-emerald-400">What Loses Marks</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    Generic or vague descriptions
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    Missing key hazards for the task
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    Inappropriate or missing control measures
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    Illogical or incomplete method sequence
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    Failing to consider building occupants
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    No emergency planning
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    Copy-paste answers not relevant to task
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <h4 className="font-semibold text-emerald-400 mb-2">Time Management Tips</h4>
              <ul className="space-y-1 text-xs sm:text-sm text-foreground">
                <li>• Allow 15-20 minutes for RAMS completion</li>
                <li>• Read the task description twice before starting</li>
                <li>• Use bullet points for clarity and speed</li>
                <li>• Focus on task-specific details, not generic safety advice</li>
                <li>• Review for completeness before submitting</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-world Examples */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              8. Real-world Examples and Case Studies
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-base mb-3">AM2 Assessment Examples</h3>
                <div className="space-y-4 text-xs sm:text-sm text-foreground">
                  <div className="border-l-4 border-l-red-500 pl-4">
                    <h4 className="font-semibold mb-1 text-red-700 dark:text-emerald-400">Example 1: Vague PPE Entry</h4>
                    <p className="mb-2">Candidate wrote "wear PPE" in risk assessment. No marks awarded because it didn't specify type.</p>
                    <p className="text-muted-foreground italic">Should have written: "Wear insulated gloves rated 1000V for electrical testing and safety glasses to BS EN 166 for drilling operations"</p>
                  </div>
                  <div className="border-l-4 border-l-red-500 pl-4">
                    <h4 className="font-semibold mb-1 text-red-700 dark:text-emerald-400">Example 2: Missing Hazard</h4>
                    <p className="mb-2">RAMS omitted "unauthorised access" as a hazard. Candidate lost marks.</p>
                    <p className="text-muted-foreground italic">Should have included: "Risk of building occupants entering work area during electrical work"</p>
                  </div>
                  <div className="border-l-4 border-l-red-500 pl-4">
                    <h4 className="font-semibold mb-1 text-red-700 dark:text-emerald-400">Example 3: Incomplete Documentation</h4>
                    <p className="mb-2">Candidate listed hazards but not control measures. RAMS marked incomplete.</p>
                    <p className="text-muted-foreground italic">Each hazard must have corresponding specific control measures</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold mb-1 text-green-700 dark:text-green-300">Example 4: Excellent RAMS</h4>
                    <p className="mb-2">Candidate achieved full marks by linking specific PPE to specific hazards and including detailed method statement.</p>
                    <p className="text-muted-foreground italic">Example: "Insulated gloves for protection against electric shock when testing circuits; dust mask FFP2 when chasing walls to prevent silica inhalation"</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-base mb-3">Industry Incidents</h3>
                <div className="space-y-4 text-sm">
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Case Study: Lock-off Failure</h4>
                    <p className="text-red-700 dark:text-emerald-400 mb-2">
                      An electrician failed to lock off an isolator because it wasn't specified in the RAMS. 
                      An apprentice unknowingly re-energised the circuit while the electrician was working, 
                      resulting in electric shock and burns requiring hospital treatment.
                    </p>
                    <p className="text-red-600 dark:text-emerald-400 font-semibold">
                      Lesson: RAMS must specify lock-off procedures and responsibility for key control
                    </p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Case Study: Inadequate Barriers</h4>
                    <p className="text-orange-700 dark:text-emerald-400 mb-2">
                      Office workers bypassed inadequate barriers around electrical work, leading to a trip incident 
                      over cables. Worker sustained injuries and work was delayed for incident investigation.
                    </p>
                    <p className="text-orange-600 dark:text-emerald-400 font-semibold">
                      Lesson: RAMS must consider all building users and specify effective access control
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-foreground mb-1">Q1: Do I need to list every possible hazard?</h3>
                <p className="text-muted-foreground">A: Only the relevant ones — but think broadly (environment, tools, access, people).</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Q2: Can I copy generic RAMS wording from memory?</h3>
                <p className="text-muted-foreground">A: No. Assessors want task-specific detail.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Q3: How detailed should PPE entries be?</h3>
                <p className="text-muted-foreground">A: State type and purpose: e.g., "insulated gloves for testing, safety glasses for drilling."</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Q4: What's the biggest reason people lose marks in RAMS?</h3>
                <p className="text-muted-foreground">A: Vague or incomplete entries.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Q5: Will assessors mark spelling/grammar?</h3>
                <p className="text-muted-foreground">A: No, but clarity matters — write plainly and logically.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              Summary
            </h2>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              RAMS is about proving you can plan safe work. In AM2, weak RAMS entries = easy lost marks. Always:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Identify specific hazards
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                State clear control measures
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Link PPE, signage, and lock-off to the actual task
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Write a logical method sequence
              </li>
            </ul>
            <p className="text-xs sm:text-sm text-foreground mt-4">
              Done right, RAMS is quick, clear, and earns you marks while protecting you in real work.
            </p>
          </div>
        </Card>

        {/* Quiz Section */}
        <Card className="bg-card border-emerald-500/30">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              Test Your Knowledge
            </h2>
            <Quiz questions={quizQuestions} title="RAMS Quiz" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AM2Module2Section2;