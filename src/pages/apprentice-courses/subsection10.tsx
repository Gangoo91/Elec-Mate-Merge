import { ArrowLeft, Target, CheckCircle, Shield, FileCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Purpose of Risk Assessments - Level 2 Module 1 Section 3.1";
const DESCRIPTION = "Understanding why risk assessments are essential for electrical safety, covering legal requirements, ALARP principles, and practical applications.";

const Section3_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions = [
    {
      id: "purpose-check",
      question: "What is the primary purpose of a risk assessment in electrical work?",
      options: [
        "To increase paperwork and bureaucracy",
        "To identify hazards and control risks to protect people",
        "To blame workers when accidents occur",
        "To delay work until all risks are eliminated"
      ],
      correctIndex: 1,
      explanation: "Risk assessment's primary purpose is to systematically identify hazards, evaluate risks, and implement control measures to protect people from harm. It's a proactive safety tool, not a blame mechanism."
    },
    {
      id: "alarp-check", 
      question: "What does ALARP mean in risk management?",
      options: [
        "All Levels Are Risk Proof",
        "As Low As Reasonably Practicable", 
        "Always Look At Risk Profiles",
        "Automated Level Assessment Risk Protocol"
      ],
      correctIndex: 1,
      explanation: "ALARP stands for 'As Low As Reasonably Practicable', meaning risks should be reduced to the lowest level achievable while considering cost, time, and effort constraints."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What is the primary purpose of a risk assessment?",
      options: [
        "To blame workers for accidents",
        "To identify hazards and control risks",
        "To increase paperwork",
        "To avoid work activities"
      ],
      correctAnswer: 1,
      explanation: "The primary purpose of risk assessment is to identify hazards, evaluate risks, and implement control measures to protect people from harm."
    },
    {
      id: 2,
      question: "When must a risk assessment be reviewed?",
      options: [
        "Only when an accident occurs",
        "Every five years",
        "When there are significant changes or new hazards",
        "Never, once completed"
      ],
      correctAnswer: 2,
      explanation: "Risk assessments must be reviewed when there are significant changes to work activities, new hazards are identified, or following incidents."
    },
    {
      id: 3,
      question: "Who is responsible for ensuring risk assessments are carried out?",
      options: [
        "The Health and Safety Executive only",
        "Individual workers only",
        "The employer or duty holder",
        "Insurance companies"
      ],
      correctAnswer: 2,
      explanation: "Under the Management of Health and Safety at Work Regulations 1999, employers and duty holders are responsible for ensuring suitable and sufficient risk assessments are carried out."
    },
    {
      id: 4,
      question: "What does ALARP stand for in risk management?",
      options: [
        "All Levels Are Risk Proof",
        "As Low As Reasonably Practicable",
        "Always Look At Risk Profiles",
        "Automated Level Assessment Risk Protocol"
      ],
      correctAnswer: 1,
      explanation: "ALARP stands for As Low As Reasonably Practicable, meaning risks should be reduced to the lowest level that is reasonably achievable considering the costs and benefits."
    },
    {
      id: 5,
      question: "True or False: Risk assessments only need to be done for high-voltage electrical work.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Risk assessments are required for all electrical work, regardless of voltage level, as hazards exist at all voltage levels."
    },
    {
      id: 6,
      question: "Which regulation specifically requires employers to conduct risk assessments?",
      options: [
        "Building Regulations 2010",
        "Management of Health and Safety at Work Regulations 1999",
        "Construction (Design and Management) Regulations 2015",
        "Personal Protective Equipment Regulations 2002"
      ],
      correctAnswer: 1,
      explanation: "Regulation 3 of the Management of Health and Safety at Work Regulations 1999 specifically requires employers to conduct suitable and sufficient risk assessments."
    },
    {
      id: 7,
      question: "Who should conduct electrical risk assessments?",
      options: [
        "Anyone can do it",
        "Only HSE inspectors",
        "Competent persons with appropriate knowledge and experience",
        "Only electrical engineers"
      ],
      correctAnswer: 2,
      explanation: "Risk assessments must be carried out by competent persons who have the necessary knowledge, training, and experience to identify electrical hazards and evaluate risks effectively."
    },
    {
      id: 8,
      question: "When must risk assessment findings be recorded?",
      options: [
        "Never, verbal communication is sufficient",
        "Always, regardless of company size",
        "Only for companies with 5 or more employees",
        "Only after an accident occurs"
      ],
      correctAnswer: 2,
      explanation: "Under the Management Regulations, significant findings must be recorded if the company has 5 or more employees, though good practice suggests recording findings regardless of size."
    },
    {
      id: 9,
      question: "What should happen to risk assessments after they are completed?",
      options: [
        "File them away and forget about them",
        "Communicate findings and review regularly",
        "Send them to the HSE immediately",
        "Keep them confidential from workers"
      ],
      correctAnswer: 1,
      explanation: "Risk assessments should be communicated to all affected personnel and reviewed regularly, especially when circumstances change or after incidents."
    },
    {
      id: 10,
      question: "Which of these is NOT a common mistake in risk assessment?",
      options: [
        "Using generic, copied assessments",
        "Involving experienced workers in the process",
        "Failing to review after incidents",
        "Poor communication of findings"
      ],
      correctAnswer: 1,
      explanation: "Involving experienced workers in the risk assessment process is actually good practice, not a mistake. They bring valuable practical knowledge about workplace hazards."
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
            <Target className="h-8 w-8 text-emerald-400" />
            <div>
              <span className="inline-block bg-emerald-500 text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 3.1
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Purpose of Risk Assessments
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mt-2">
                Understanding why risk assessments are essential for electrical safety
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Legal requirement:</strong> Risk assessments are mandatory under health and safety regulations.</li>
                <li><strong>Protect lives:</strong> Identify electrical hazards before they cause harm or death.</li>
                <li><strong>ALARP principle:</strong> Reduce risks to As Low As Reasonably Practicable.</li>
                <li><strong>Business benefits:</strong> Reduce insurance costs, prevent prosecution, maintain reputation.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> New work activities, changed conditions, incident follow-ups, significant hazards.</li>
                <li><strong>Use:</strong> Before starting any electrical work, when planning installations, during method statements.</li>
                <li><strong>Apply:</strong> Document findings, implement controls, train workers, review regularly.</li>
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
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Explain the fundamental purpose of risk assessment in electrical work</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Understand the legal requirements and business benefits</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Recognise when risk assessments are required</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Apply the ALARP principle to electrical safety decisions</span>
            </li>
          </ul>
        </Card>

        {/* Section 1: Purpose of Risk Assessment */}
        <div className="mb-8">
          <div className="border-l-4 border-emerald-500 bg-emerald-50/50 dark:bg-blue-950/50 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              Purpose of Risk Assessment
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                Risk assessment is a systematic process for identifying hazards, evaluating risks, and implementing control measures. 
                In electrical work, it's both a legal requirement and essential safety practice.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Core objectives:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Identify electrical hazards that could cause harm to people or property</li>
                    <li>Evaluate the likelihood and severity of potential harm from identified hazards</li>
                    <li>Determine and implement appropriate control measures to eliminate or reduce risks</li>
                    <li>Monitor and review the effectiveness of control measures regularly</li>
                    <li>Ensure legal compliance with health and safety regulations</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Key benefits:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Protects workers, public, and future maintenance personnel from electrical hazards</li>
                    <li>Provides legal defence against prosecution under health and safety law</li>
                    <li>Reduces insurance costs and potential compensation claims</li>
                    <li>Improves operational efficiency through better planning and preparation</li>
                    <li>Enhances company reputation and competitive advantage in tendering</li>
                    <li>Creates systematic approach to safety management</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Electrical industry relevance:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Electrical work involves multiple serious hazards requiring careful assessment</li>
                    <li>Compliance with BS 7671 and other electrical standards supports risk assessment</li>
                    <li>Safe systems of work and competence requirements derive from risk assessment</li>
                    <li>Method statements and permit-to-work systems implement risk assessment findings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: The ALARP Principle */}
        <div className="mb-8">
          <div className="border-l-4 border-emerald-500 bg-emerald-50/50 dark:bg-blue-950/50 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              The ALARP Principle
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                ALARP stands for "As Low As Reasonably Practicable" - the fundamental principle for managing risk in UK health and safety law.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Definition and scope:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Legal requirement to reduce risks to the lowest level reasonably practicable</li>
                    <li>Balance between risk reduction and the cost, time, and effort required</li>
                    <li>Applies to all workplace hazards, not just high-risk activities</li>
                    <li>Requires ongoing assessment as technology and knowledge improve</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">ALARP risk regions:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Unacceptable region:</strong> Risk cannot be justified and must be eliminated regardless of cost</li>
                    <li><strong>Tolerable region (ALARP):</strong> Risk acceptable only if further reduction is impracticable</li>
                    <li><strong>Broadly acceptable region:</strong> Risk generally acceptable with routine monitoring</li>
                    <li>Decisions must be proportionate to the level of risk involved</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Practical application:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Consider hierarchy of control measures when implementing ALARP</li>
                    <li>Document reasoning for decisions, especially when not implementing measures</li>
                    <li>Review regularly as new control measures become available</li>
                    <li>Industry good practice sets minimum standards for what is reasonably practicable</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Legal Requirements */}
        <div className="mb-8">
          <div className="border-l-4 border-emerald-500 bg-emerald-50/50 dark:bg-blue-950/50 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
              Legal Requirements
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                Risk assessments are mandatory under several key regulations governing electrical work and general workplace safety.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Management of Health and Safety at Work Regulations 1999:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Regulation 3 requires employers to conduct suitable and sufficient risk assessments</li>
                    <li>Must cover all work activities and persons who may be affected</li>
                    <li>Assessment must be reviewed if it is no longer valid or circumstances change</li>
                    <li>Significant findings must be recorded for employers with 5 or more employees</li>
                    <li>Employees must be provided with comprehensible information about risks and control measures</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Electricity at Work Regulations 1989:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Regulation 4(3) requires that work on or near electrical equipment be carried out safely</li>
                    <li>Regulation 14 mandates that work on live conductors only occurs where reasonable in circumstances</li>
                    <li>Risk assessment must inform decisions about dead vs live working</li>
                    <li>Assessment must consider precautions needed for safe working</li>
                    <li>Emergency procedures must be planned based on risk assessment findings</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Corporate manslaughter implications:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Failure to conduct adequate risk assessments can lead to corporate manslaughter charges</li>
                    <li>Senior management duty to ensure systematic approach to risk management</li>
                    <li>Risk assessments provide evidence of due diligence in legal proceedings</li>
                    <li>Must demonstrate continuous improvement in safety management systems</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: When Risk Assessments Are Required */}
        <div className="mb-8">
          <div className="border-l-4 border-emerald-500 bg-emerald-50/50 dark:bg-blue-950/50 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
              When Risk Assessments Are Required
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                Risk assessments are required before starting any electrical work and must be reviewed regularly or when circumstances change.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Mandatory timing requirements:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Before commencing any new electrical installation or modification work</li>
                    <li>Prior to maintenance, repair, or testing activities on electrical systems</li>
                    <li>When planning emergency electrical work or fault-finding operations</li>
                    <li>Before introducing new electrical equipment or changing work procedures</li>
                    <li>At regular intervals as determined by risk level and regulatory requirements</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Review triggers:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Significant changes to work environment, equipment, or electrical systems</li>
                    <li>Following electrical incidents, near misses, or accidents</li>
                    <li>When new hazards are identified or existing controls prove inadequate</li>
                    <li>After substantial changes in personnel, especially key electrical staff</li>
                    <li>When new regulations, standards, or industry guidance are introduced</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Special circumstances:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Working in hazardous environments (explosive atmospheres, confined spaces)</li>
                    <li>High-voltage electrical work requiring additional precautions</li>
                    <li>Live working operations where dead working is not reasonably practicable</li>
                    <li>Work affecting safety-critical electrical systems (fire alarms, emergency lighting)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Who Should Conduct Risk Assessments */}
        <div className="mb-8">
          <div className="border-l-4 border-emerald-500 bg-emerald-50/50 dark:bg-blue-950/50 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">5</span>
              Who Should Conduct Risk Assessments
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                Risk assessments must be carried out by competent persons with appropriate knowledge, training, and experience.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Essential knowledge and skills:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Understanding of electrical hazards, their effects, and control measures</li>
                    <li>Knowledge of relevant regulations (EAWR, MHSWR, CDM) and standards (BS 7671)</li>
                    <li>Familiarity with electrical systems, equipment, and safe working practices</li>
                    <li>Risk assessment methodology, including hazard identification and risk evaluation</li>
                    <li>Understanding of hierarchy of control measures and ALARP principles</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Competency framework:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Formal qualifications in electrical engineering or related field</li>
                    <li>Practical experience in electrical work and hazard recognition</li>
                    <li>Training in risk assessment techniques and legal requirements</li>
                    <li>Continuing professional development to maintain currency</li>
                    <li>Ability to communicate findings clearly to all levels of personnel</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Team approach benefits:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Electrical engineers provide technical expertise and design knowledge</li>
                    <li>Safety professionals bring regulatory knowledge and risk management skills</li>
                    <li>Experienced electricians contribute practical workplace hazard recognition</li>
                    <li>Operations personnel understand work processes and environmental factors</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Documentation Requirements */}
        <div className="mb-8">
          <div className="border-l-4 border-emerald-500 bg-emerald-50/50 dark:bg-blue-950/50 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">6</span>
              Documentation Requirements
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                Proper documentation ensures risk assessments are communicated effectively and can be reviewed and updated as needed.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Legal documentation requirements:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Record significant findings if employing 5 or more people</li>
                    <li>Include hazards identified and persons at risk</li>
                    <li>Document existing control measures and their effectiveness</li>
                    <li>Record additional control measures required and implementation plans</li>
                    <li>Set review dates and assign responsibilities for updates</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Documentation standards:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Use clear, simple language that all workers can understand</li>
                    <li>Include site-specific details and accurate hazard descriptions</li>
                    <li>Reference applicable standards, regulations, and guidance documents</li>
                    <li>Ensure assessments are dated, signed, and version controlled</li>
                    <li>Keep records proportionate to the risk level and complexity</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Communication and accessibility:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Share findings with all affected personnel through briefings and toolbox talks</li>
                    <li>Make assessments available at work locations and project offices</li>
                    <li>Include key points in method statements and work instructions</li>
                    <li>Provide training on control measures identified in assessments</li>
                    <li>Ensure subcontractors and visitors understand relevant risks</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: Common Mistakes to Avoid */}
        <div className="mb-8">
          <div className="border-l-4 border-emerald-500 bg-emerald-50/50 dark:bg-blue-950/50 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">7</span>
              Common Mistakes to Avoid
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                Understanding common pitfalls helps ensure risk assessments are effective and legally compliant.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Assessment quality issues:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Using generic, copied assessments that don't reflect actual site conditions</li>
                    <li>Failing to involve competent people with relevant electrical knowledge</li>
                    <li>Inadequate hazard identification missing key electrical risks</li>
                    <li>Poor risk evaluation that doesn't consider likelihood and severity properly</li>
                    <li>Selecting inappropriate control measures not suited to the specific hazards</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Process and management failures:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Failing to review assessments when conditions change significantly</li>
                    <li>Not updating assessments following incidents or near misses</li>
                    <li>Poor communication of findings to workers and supervisors</li>
                    <li>Lack of monitoring to ensure control measures remain effective</li>
                    <li>Treating risk assessment as a paper exercise rather than practical tool</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Legal and compliance problems:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Failing to document significant findings as required by regulations</li>
                    <li>Not providing adequate information and training to employees</li>
                    <li>Ignoring hierarchy of control measures and jumping to PPE solutions</li>
                    <li>Inadequate consultation with workers who have practical experience</li>
                    <li>Missing links between risk assessment and safe systems of work</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Key Takeaways</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Essential Points</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Risk assessment protects people and businesses</li>
                <li>• Legal requirement under multiple regulations</li>
                <li>• ALARP principle guides risk decisions</li>
                <li>• Must be reviewed when circumstances change</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Best Practices</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Involve competent people in assessments</li>
                <li>• Focus on significant risks first</li>
                <li>• Keep records proportionate to risk</li>
                <li>• Communicate findings to all involved</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        <Quiz 
          questions={quizQuestions}
          title="Purpose of Risk Assessments Quiz"
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
          
          <Button asChild>
            <Link to="../subsection11">
              Next: The Five Steps of Risk Assessment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Section3_1;