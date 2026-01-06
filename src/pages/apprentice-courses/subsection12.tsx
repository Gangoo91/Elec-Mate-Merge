import { ArrowLeft, Target, CheckCircle, Shield, FileCheck, Users, ClipboardList, Eye, Search, List, AlertTriangle, Scale, Settings, ArrowRight, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Method Statements - Level 2 Module 1 Section 3.3";
const DESCRIPTION = "Understanding method statements for electrical work: purpose, creation, components, legal requirements and practical application.";

const Section3_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions = [
    {
      id: "method-purpose",
      question: "What is the main purpose of a method statement?",
      options: [
        "To replace the risk assessment",
        "To describe how work will be done safely step by step",
        "To list all possible hazards",
        "To record accidents after they happen"
      ],
      correctIndex: 1,
      explanation: "A method statement describes how work will be done safely step by step, working alongside the risk assessment to ensure safe execution of tasks."
    },
    {
      id: "method-requirement",
      question: "When are method statements typically required?",
      options: [
        "Only for domestic work",
        "For commercial sites and high-risk tasks",
        "Never in electrical work",
        "Only when accidents occur"
      ],
      correctIndex: 1,
      explanation: "Method statements are typically required on commercial sites, high-risk tasks, and when working as a subcontractor where RAMS documentation is needed."
    },
    {
      id: "method-link",
      question: "Which document should a method statement refer to?",
      options: [
        "Company handbook only",
        "Previous job records",
        "The relevant risk assessment",
        "Electrical regulations only"
      ],
      correctIndex: 2,
      explanation: "A method statement should refer to the relevant risk assessment, as it builds on the hazards and controls identified in that document."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What is the primary purpose of a method statement in electrical work?",
      options: [
        "To replace the need for a risk assessment",
        "To provide step-by-step safe working procedures",
        "To list all company policies",
        "To record completed work activities"
      ],
      correctAnswer: 1,
      explanation: "A method statement provides detailed step-by-step procedures for carrying out work safely, building on the risk assessment to ensure safe execution."
    },
    {
      id: 2,
      question: "Which of these is NOT typically included in a method statement?",
      options: [
        "Personnel roles and responsibilities",
        "Required tools and equipment",
        "Company financial information",
        "Step-by-step procedures"
      ],
      correctAnswer: 2,
      explanation: "Company financial information is not relevant to a method statement, which focuses on safe working procedures, personnel, equipment, and risk controls."
    },
    {
      id: 3,
      question: "When would you typically need to produce a method statement?",
      options: [
        "Only for domestic electrical installations",
        "For high-risk tasks and commercial sites",
        "Never in electrical work",
        "Only after an accident has occurred"
      ],
      correctAnswer: 1,
      explanation: "Method statements are typically required for high-risk tasks, commercial sites, construction work, and when working as a subcontractor."
    },
    {
      id: 4,
      question: "What should be the relationship between a risk assessment and method statement?",
      options: [
        "They are completely separate documents",
        "The method statement replaces the risk assessment",
        "The method statement builds on the risk assessment",
        "Only one document is needed for any job"
      ],
      correctAnswer: 2,
      explanation: "The method statement builds on the risk assessment by explaining how the identified hazards will be controlled during the actual work process."
    },
    {
      id: 5,
      question: "Which section would you expect to find in a comprehensive method statement?",
      options: [
        "Weather forecasts for the next month",
        "Emergency procedures and contact details",
        "Company share prices",
        "Historical accident statistics"
      ],
      correctAnswer: 1,
      explanation: "Emergency procedures and contact details are essential components of a method statement to ensure quick response if something goes wrong."
    },
    {
      id: 6,
      question: "Who should typically review and approve a method statement before work begins?",
      options: [
        "Only the person doing the work",
        "The client's accountant",
        "A competent supervisor or site manager",
        "No approval is needed"
      ],
      correctAnswer: 2,
      explanation: "A competent supervisor or site manager should review and approve method statements to ensure they are suitable and complete."
    },
    {
      id: 7,
      question: "What type of information about personnel should be included?",
      options: [
        "Personal bank details",
        "Qualifications, roles, and competencies",
        "Home addresses",
        "Social media profiles"
      ],
      correctAnswer: 1,
      explanation: "Personnel sections should include relevant qualifications, defined roles, competencies, and any specific training required for the task."
    },
    {
      id: 8,
      question: "How often should a method statement be reviewed during a project?",
      options: [
        "Never, once written it's final",
        "Only at the end of the project",
        "Regularly and when conditions change",
        "Once per year"
      ],
      correctAnswer: 2,
      explanation: "Method statements should be reviewed regularly and updated whenever working conditions, personnel, or procedures change."
    },
    {
      id: 9,
      question: "What should happen if the actual work conditions differ from the method statement?",
      options: [
        "Continue with the original plan anyway",
        "Stop work and update the method statement",
        "Ignore the method statement completely",
        "Ask someone else to do the work"
      ],
      correctAnswer: 1,
      explanation: "If conditions differ from those described in the method statement, work should stop and the document should be reviewed and updated as necessary."
    },
    {
      id: 10,
      question: "Which of these best describes good method statement practice?",
      options: [
        "Use complex technical language to sound professional",
        "Keep it brief and exclude safety information",
        "Make it clear, detailed, and easy to follow",
        "Copy from other unrelated projects"
      ],
      correctAnswer: 2,
      explanation: "A good method statement should be clear, detailed, and easy to follow, ensuring all team members can understand and implement the procedures safely."
    }
  ];

  const faqs = [
    {
      question: "Do I need a method statement for all electrical work?",
      answer: "Not all electrical work requires a formal method statement. Simple, low-risk domestic tasks may not need one, but method statements are typically required for commercial work, high-risk tasks, construction sites, and when requested by clients or main contractors."
    },
    {
      question: "What's the difference between a method statement and a risk assessment?",
      answer: "A risk assessment identifies hazards and evaluates risks, while a method statement explains how the work will be carried out safely. The method statement builds on the risk assessment by detailing the step-by-step procedures and controls."
    },
    {
      question: "How detailed should a method statement be?",
      answer: "The level of detail should match the complexity and risk of the work. High-risk or complex tasks need more detailed method statements. Include enough detail so that a competent person could follow the procedures safely."
    },
    {
      question: "Who should write the method statement?",
      answer: "Method statements should be written by someone competent and familiar with the work - typically a qualified electrician, supervisor, or project manager. They should be reviewed and approved by a responsible person before work begins."
    },
    {
      question: "Can I use the same method statement for different projects?",
      answer: "Generic method statements can be used as templates, but they must be reviewed and adapted for each specific project. Working conditions, site layouts, equipment, and risks can vary significantly between jobs."
    },
    {
      question: "What happens if workers don't follow the method statement?",
      answer: "Deviation from the method statement without good reason is a serious safety issue. It could lead to accidents, disciplinary action, insurance problems, and potential legal liability. Any necessary changes should be documented and approved."
    },
    {
      question: "How do I ensure workers actually read and understand the method statement?",
      answer: "Hold toolbox talks, conduct briefings, get signed acknowledgments from workers, and regularly check that procedures are being followed. Make the method statement easily accessible on site."
    },
    {
      question: "Should method statements include emergency procedures?",
      answer: "Yes, method statements should include relevant emergency procedures, evacuation routes, emergency contact numbers, and first aid arrangements. This ensures quick response if something goes wrong."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <ClipboardList className="h-8 w-8 text-elec-yellow" />
            <div>
              <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 3.3
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Method Statements
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mt-2">
                Comprehensive guide to creating and implementing effective method statements for electrical work
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Definition:</strong> Written procedures detailing how work will be done safely.</li>
                <li><strong>Purpose:</strong> Link risk assessments to practical work methods.</li>
                <li><strong>Requirement:</strong> Essential for high-risk electrical activities.</li>
                <li><strong>Compliance:</strong> Must be followed by all personnel on site.</li>
                <li><strong>Updates:</strong> Living documents that should be updated as needed.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Complex installations, high-risk work, new procedures, regulatory requirements.</li>
                <li><strong>Use:</strong> Before starting electrical projects, during planning stages, safety briefings.</li>
                <li><strong>Apply:</strong> Clear step-by-step procedures, safety controls, emergency plans.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <p className="text-muted-foreground mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-foreground">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Understand the purpose and legal requirements for method statements</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Identify when method statements are required for electrical work</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Create comprehensive method statements with all key components</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Link method statements effectively with risk assessments</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Implement best practices for method statement use and maintenance</span>
            </li>
          </ul>
        </Card>

        {/* Section 1: What is a Method Statement */}
        <div className="mb-8">
          <div className="border-l-4 border-elec-yellow bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              What is a Method Statement?
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                A method statement is a documented procedure that describes how a specific work activity will be carried out safely. 
                For electrical work, it provides step-by-step instructions that ensure all safety measures identified in the risk assessment are properly implemented.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Key characteristics of effective method statements:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Task-specific and tailored to specific electrical work activities</li>
                    <li>Step-by-step instructions providing clear sequential guidance for safe execution</li>
                    <li>Risk-linked, directly addressing hazards identified in risk assessments</li>
                    <li>Practical and written in language that workers can understand and follow</li>
                    <li>Living documents that are updated as conditions or procedures change</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Legal context and requirements:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>CDM Regulations 2015: Required for construction electrical work</li>
                    <li>HASAWA 1974: Part of duty to ensure safe working practices</li>
                    <li>EAW Regulations 1989: Support compliance with electrical safety duties</li>
                    <li>Company policies: Often required by internal safety management systems</li>
                    <li>Insurance requirements: May be necessary for liability coverage</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Relationship to other safety documents:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Risk Assessment: Identifies what could go wrong and who could be harmed</li>
                    <li>Method Statement: Explains exactly how to do the work safely</li>
                    <li>Permit to Work: Formal authorisation system for high-risk activities</li>
                    <li>Safe System of Work: Overall framework combining all safety documentation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: When Required */}
        <div className="mb-8">
          <div className="border-l-4 border-elec-yellow bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              When Method Statements are Required
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                Method statements are not always required for electrical work, but there are specific situations where they become essential for legal compliance and safety management.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Legal and contractual requirements:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Construction work under CDM Regulations 2015</li>
                    <li>Work as a subcontractor where RAMS (Risk Assessment Method Statement) is requested</li>
                    <li>High-risk electrical activities identified in risk assessments</li>
                    <li>Client or main contractor specifications requiring documented procedures</li>
                    <li>Insurance policy requirements for certain types of work</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Type of work requiring method statements:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Working at height on electrical installations or repairs</li>
                    <li>Live electrical testing and fault finding procedures</li>
                    <li>Complex commercial and industrial electrical installations</li>
                    <li>Work in confined spaces such as substations or cable chambers</li>
                    <li>Coordination with other trades on construction sites</li>
                    <li>Emergency electrical repairs in operational facilities</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Workplace and project considerations:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Commercial and industrial premises requiring documented procedures</li>
                    <li>Healthcare facilities where work could affect critical systems</li>
                    <li>Educational establishments with specific safety requirements</li>
                    <li>Public buildings where members of the public could be affected</li>
                    <li>Sites with multiple contractors requiring coordination</li>
                    <li>Work in environments with additional hazards (chemicals, machinery)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Key Components */}
        <div className="mb-8">
          <div className="border-l-4 border-orange-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
              Key Components of a Method Statement
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                A comprehensive method statement should include all information necessary for safe execution of the work. The following components ensure complete coverage of safety requirements.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">1. Project and work description:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Clear description of the electrical work to be undertaken</li>
                    <li>Location details including site address and specific work areas</li>
                    <li>Project timescales and key milestones</li>
                    <li>Reference to relevant drawings, specifications, and standards</li>
                    <li>Connection to associated risk assessments and safety documents</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">2. Personnel requirements and responsibilities:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Competency requirements and necessary qualifications</li>
                    <li>Specific roles and responsibilities for each team member</li>
                    <li>Supervision arrangements and reporting lines</li>
                    <li>Training requirements and competency verification</li>
                    <li>Communication procedures and safety briefing requirements</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">3. Equipment, tools, and materials:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Complete list of required tools and electrical equipment</li>
                    <li>Personal protective equipment (PPE) specifications</li>
                    <li>Safety equipment including isolation devices and testing instruments</li>
                    <li>Material specifications and storage requirements</li>
                    <li>Equipment inspection and maintenance requirements</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">4. Step-by-step procedures:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Detailed sequence of operations from start to finish</li>
                    <li>Safety checks and verification procedures at each stage</li>
                    <li>Isolation and lockout/tagout procedures</li>
                    <li>Testing and commissioning requirements</li>
                    <li>Coordination points with other activities or trades</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">5. Emergency procedures and contacts:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Emergency contact numbers and escalation procedures</li>
                    <li>First aid arrangements and accident reporting procedures</li>
                    <li>Evacuation routes and assembly points</li>
                    <li>Procedures for electrical emergencies and system failures</li>
                    <li>Incident response and notification requirements</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Creation Process */}
        <div className="mb-8">
          <div className="border-l-4 border-purple-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
              Method Statement Creation Process
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                Creating an effective method statement requires systematic planning and input from competent personnel. Follow this structured approach to ensure comprehensive coverage.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Step 1: Preparation and planning</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Review the risk assessment and identify all significant hazards</li>
                    <li>Examine site conditions, drawings, and project specifications</li>
                    <li>Consult with experienced electricians familiar with the type of work</li>
                    <li>Check relevant regulations, standards, and company procedures</li>
                    <li>Identify any special requirements or client specifications</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Step 2: Structure and content development</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Break down the work into logical stages and sequences</li>
                    <li>Define control measures for each identified hazard</li>
                    <li>Specify required competencies and responsibilities</li>
                    <li>Detail equipment, tools, and safety systems needed</li>
                    <li>Include emergency procedures and contingency plans</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Step 3: Review and approval process</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Technical review by competent supervisor or senior electrician</li>
                    <li>Safety review by safety professional or appointed person</li>
                    <li>Client or principal contractor approval where required</li>
                    <li>Final approval by responsible manager before work commences</li>
                    <li>Distribution to all personnel involved in the work</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Step 4: Implementation and monitoring</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Brief all personnel before work begins</li>
                    <li>Ensure method statement is accessible on site</li>
                    <li>Monitor compliance with procedures during work</li>
                    <li>Address any deviations or changing conditions immediately</li>
                    <li>Update the method statement if conditions change</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Best Practices */}
        <div className="mb-8">
          <div className="border-l-4 border-teal-500 bg-teal-500/10 dark:bg-teal-500/10 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">5</span>
              Best Practices and Common Mistakes
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                Learning from experience helps create more effective method statements and avoid common pitfalls that can compromise safety and compliance.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Best practices for effective method statements:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Use clear, simple language that all workers can understand</li>
                    <li>Include diagrams, photos, or sketches where helpful</li>
                    <li>Make procedures specific to the actual work and site conditions</li>
                    <li>Regularly review and update based on lessons learned</li>
                    <li>Involve experienced workers in development and review</li>
                    <li>Ensure procedures are practical and achievable</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Common mistakes to avoid:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Generic method statements not adapted to specific conditions</li>
                    <li>Overly complex language or unnecessary technical jargon</li>
                    <li>Failing to link method statement to risk assessment</li>
                    <li>Not updating when conditions or procedures change</li>
                    <li>Inadequate consultation with workers who will use the document</li>
                    <li>Missing emergency procedures or contact information</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Implementation and communication:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Hold toolbox talks to explain key safety points</li>
                    <li>Get signed acknowledgment that workers have read and understood</li>
                    <li>Keep copies readily available on site for reference</li>
                    <li>Regular monitoring to ensure procedures are being followed</li>
                    <li>Encourage feedback and suggestions for improvement</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Continuous improvement:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Review method statements after project completion</li>
                    <li>Incorporate lessons learned into future method statements</li>
                    <li>Update template method statements based on experience</li>
                    <li>Share good practices across the organisation</li>
                    <li>Regular training on method statement development and use</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Search className="h-6 w-6 text-elec-yellow" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-medium text-foreground">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <List className="h-6 w-6 text-elec-yellow" />
            Method Statements - Quick Reference
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Essential Components:</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Work description and scope</li>
                <li>• Personnel roles and competencies</li>
                <li>• Required equipment and PPE</li>
                <li>• Step-by-step procedures</li>
                <li>• Emergency contacts and procedures</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Key Requirements:</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Link to risk assessment</li>
                <li>• Clear, understandable language</li>
                <li>• Review and approval process</li>
                <li>• Regular updates when needed</li>
                <li>• Accessible on site during work</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <div className="space-y-4 text-foreground">
            <p>
              Method statements are essential safety documents that translate risk assessments into practical, step-by-step procedures. 
              They ensure that electrical work is carried out safely, consistently, and in compliance with legal requirements.
            </p>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Remember:</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Method statements complement, don't replace, risk assessments</li>
                  <li>• They must be specific to the actual work and conditions</li>
                  <li>• All personnel must understand and follow the procedures</li>
                  <li>• Regular review and updates are essential</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Next Steps:</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Practice creating method statements for common electrical tasks</li>
                  <li>• Review examples from your workplace or training materials</li>
                  <li>• Understand your company's specific requirements and templates</li>
                  <li>• Learn about control measures in the next section</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Award className="h-6 w-6 text-elec-yellow" />
            Knowledge Check
          </h2>
          <Quiz questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between pt-8 border-t border-border/20">
          <Button variant="outline" asChild>
            <Link to="../subsection2" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous: Five Steps of Risk Assessment
            </Link>
          </Button>
          
          <Button asChild>
            <Link to="../subsection4" className="flex items-center gap-2">
              Next: Control Measures
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Section3_3;