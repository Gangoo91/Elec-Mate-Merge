import { FileX, Info, Target, Clipboard, AlertTriangle, CheckCircle, Search, Zap, Shield, Users, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ObservationCodesContent = () => {
  const introductionContent = {
    overview: "Observation codes provide a standardised classification system for defects, non-compliance issues, and safety concerns identified during electrical inspections. This systematic approach ensures consistent risk assessment, appropriate prioritisation of remedial actions, and clear communication between electrical professionals and clients.",
    importance: "Correct application of observation codes is fundamental to electrical safety management and professional accountability. These codes directly influence remedial action timeframes, insurance compliance, legal obligations, and most importantly, the protection of persons and property from electrical hazards.",
    scope: "This section provides comprehensive coverage of the four observation codes (C1, C2, C3, FI), their definitions, application criteria, decision-making processes, and practical examples. Understanding these codes is essential for all electrical inspection and testing activities."
  };

  const learningObjectives = [
    "Master the definitions and applications of all four observation codes",
    "Apply systematic decision-making processes for code selection",
    "Understand legal and professional implications of each code classification",
    "Recognise typical scenarios requiring each specific code",
    "Differentiate between immediate, urgent, and recommended actions",
    "Understand the relationship between codes and BS 7671 compliance",
    "Apply codes consistently across different installation types",
    "Communicate code implications clearly to clients and stakeholders",
    "Document observations with appropriate supporting evidence",
    "Understand when further investigation is required"
  ];

  const observationCodes = [
    {
      code: "C1",
      title: "Danger Present",
      description: "Risk of injury exists. Immediate remedial action is required.",
      urgency: "IMMEDIATE",
      action: "Make installation safe immediately - may require isolation",
      legalImplication: "Continuing to use installation may breach safety regulations",
      examples: [
        "Live parts accessible to touch without tools",
        "Missing or inadequate earth connections on Class I equipment",
        "Damaged cables exposing live conductors",
        "Non-functional RCD protection where required for safety",
        "Broken enclosures allowing access to live parts",
        "Incorrect polarity on lighting circuits with accessible metalwork"
      ],
      considerations: [
        "Installation may need immediate isolation",
        "Client must be informed of danger immediately",
        "Work should not continue until danger is removed",
        "May require emergency call-out for repairs"
      ]
    },
    {
      code: "C2", 
      title: "Potentially Dangerous",
      description: "Urgent remedial action is required to remove potential danger.",
      urgency: "URGENT",
      action: "Action required as matter of urgency",
      legalImplication: "Potential breach of safety standards requiring prompt attention",
      examples: [
        "Inadequate earthing or main protective bonding",
        "Overloaded circuits exceeding cable capacity",
        "Incorrect protective device ratings",
        "Missing RCD protection in locations requiring enhanced safety",
        "Inadequate segregation of safety circuits",
        "Deteriorated insulation approaching dangerous levels"
      ],
      considerations: [
        "Installation can remain in use with caution",
        "Client should be advised of urgency",
        "Remedial work should be prioritised",
        "May affect insurance coverage if not addressed"
      ]
    },
    {
      code: "C3",
      title: "Improvement Recommended", 
      description: "Improvement recommended to enhance safety and compliance.",
      urgency: "RECOMMENDED",
      action: "Action recommended to improve safety standards",
      legalImplication: "No immediate safety concern but improvement beneficial",
      examples: [
        "Lack of RCD protection where recommended but not mandatory",
        "Old accessories in good condition but not to current standards",
        "Missing circuit identification or labelling",
        "Absence of supplementary bonding where not required by current standards",
        "Single-pole switching on neutral conductors in old installations",
        "Non-standard installation methods that are safe but outdated"
      ],
      considerations: [
        "Installation is safe for continued use",
        "Improvements enhance safety and future-proof installation",
        "Can be addressed during planned maintenance",
        "May be required for insurance or regulatory compliance"
      ]
    },
    {
      code: "FI",
      title: "Further Investigation Required",
      description: "Further investigation required without delay to determine safety status.",
      urgency: "INVESTIGATION",
      action: "Investigation needed to classify safety risk",
      legalImplication: "Unknown risk level requires professional assessment",
      examples: [
        "Circuits not tested due to operational requirements",
        "Inaccessible parts requiring detailed investigation",
        "Unusual test results requiring specialist analysis",
        "Suspected hidden damage requiring trace investigation",
        "Complex systems requiring specialist knowledge",
        "Equipment that cannot be de-energised for testing"
      ],
      considerations: [
        "Safety status unknown until investigation complete",
        "Investigation should be prioritised",
        "May require specialist expertise or equipment",
        "Could result in any of the other code classifications"
      ]
    }
  ];

  const decisionMatrix = [
    {
      question: "Is there an immediate risk of injury or fire?",
      yes: "C1 - Immediate action required",
      no: "Continue assessment",
      examples: "Live parts accessible, missing earth on Class I equipment, damaged live cables"
    },
    {
      question: "Could the defect lead to danger during normal use?",
      yes: "C2 - Urgent remedial action required", 
      no: "Continue assessment",
      examples: "Inadequate earthing, overloaded circuits, incorrect protective device ratings"
    },
    {
      question: "Would improvement enhance safety or compliance?",
      yes: "C3 - Improvement recommended",
      no: "No observation required",
      examples: "Missing RCD protection where recommended, old but safe accessories"
    },
    {
      question: "Is the safety status unclear or unknown?",
      yes: "FI - Further investigation required",
      no: "No observation required", 
      examples: "Inaccessible circuits, unusual test results, operational limitations"
    }
  ];

  const applicationPrinciples = [
    {
      principle: "Consistency",
      description: "Apply codes consistently across all installations and inspectors",
      importance: "Ensures reliable risk assessment and client confidence"
    },
    {
      principle: "Evidence-Based",
      description: "Base code selection on objective evidence and measurable criteria",
      importance: "Supports professional decisions and reduces subjective interpretation"
    },
    {
      principle: "Client Communication", 
      description: "Explain code implications clearly to enable informed decisions",
      importance: "Ensures clients understand urgency and can plan appropriate responses"
    },
    {
      principle: "Professional Judgment",
      description: "Apply experience and knowledge to interpret situations appropriately",
      importance: "Allows for context-specific decisions while maintaining standards"
    },
    {
      principle: "Documentation",
      description: "Provide clear, specific descriptions supporting code selection",
      importance: "Enables other professionals to understand and act on observations"
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardContent className="space-y-8 pt-6">
        
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Info className="h-6 w-6 text-elec-yellow" />
            Introduction
          </h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-foreground mb-2">Overview</h4>
                <p className="text-foreground leading-relaxed">{introductionContent.overview}</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-foreground mb-2">Importance</h4>
                <p className="text-foreground leading-relaxed">{introductionContent.importance}</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-foreground mb-2">Scope of Learning</h4>
                <p className="text-foreground leading-relaxed">{introductionContent.scope}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Learning Objectives</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Develop comprehensive competency in observation code application through systematic learning 
              and practical scenarios. Each objective builds critical skills for professional electrical inspection.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningObjectives.map((objective, index) => (
                <div key={index} className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-foreground text-sm">{objective}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Comprehensive Code Definitions</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-6">
            <p className="text-foreground leading-relaxed mb-4">
              Each observation code represents a specific level of risk and required response timeframe. 
              Understanding these distinctions is crucial for appropriate safety management and professional accountability.
            </p>
            <div className="space-y-6">
              {observationCodes.map((code, index) => (
                <div key={index} className={`${
                  code.code === 'C1' ? 'bg-red-600/10 border border-red-600/20' :
                  code.code === 'C2' ? 'bg-orange-600/10 border border-orange-600/20' :
                  code.code === 'C3' ? 'bg-yellow-600/10 border border-yellow-600/20' :
                  'bg-blue-600/10 border border-blue-600/20'
                } rounded-lg p-5`}>
                  <div className="flex items-start gap-4">
                    <span className={`w-16 h-16 ${
                      code.code === 'C1' ? 'bg-red-500' :
                      code.code === 'C2' ? 'bg-orange-500' :
                      code.code === 'C3' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    } text-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0`}>
                      {code.code}
                    </span>
                    <div className="flex-1">
                      <h4 className={`text-lg font-bold mb-2 ${
                        code.code === 'C1' ? 'text-red-200' :
                        code.code === 'C2' ? 'text-orange-200' :
                        code.code === 'C3' ? 'text-yellow-200' :
                        'text-blue-200'
                      }`}>{code.title}</h4>
                      <p className="text-foreground text-sm mb-3">{code.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-foreground font-medium text-sm mb-1">Required Action:</p>
                          <p className="text-foreground text-xs">{code.action}</p>
                        </div>
                        <div>
                          <p className="text-foreground font-medium text-sm mb-1">Legal Implication:</p>
                          <p className="text-foreground text-xs">{code.legalImplication}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-foreground font-medium text-sm mb-2">Typical Examples:</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {code.examples.map((example, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <AlertTriangle className={`h-3 w-3 mt-1 flex-shrink-0 ${
                                  code.code === 'C1' ? 'text-red-400' :
                                  code.code === 'C2' ? 'text-orange-400' :
                                  code.code === 'C3' ? 'text-yellow-400' :
                                  'text-blue-400'
                                }`} />
                                <span className="text-foreground text-xs">{example}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-foreground font-medium text-sm mb-2">Key Considerations:</p>
                          <div className="space-y-1">
                            {code.considerations.map((consideration, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle className={`h-3 w-3 mt-1 flex-shrink-0 ${
                                  code.code === 'C1' ? 'text-red-400' :
                                  code.code === 'C2' ? 'text-orange-400' :
                                  code.code === 'C3' ? 'text-yellow-400' :
                                  'text-blue-400'
                                }`} />
                                <span className="text-foreground text-xs">{consideration}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Decision-Making Process</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Systematic decision-making ensures consistent and appropriate code application. This process 
              should be followed for every observation to maintain professional standards and reliability.
            </p>
            <div className="space-y-4">
              {decisionMatrix.map((decision, index) => (
                <div key={index} className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <span className="w-8 h-8 bg-purple-500 text-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-purple-200 font-medium mb-2">{decision.question}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-green-400 font-medium">Yes: {decision.yes}</p>
                          <p className="text-red-400 font-medium">No: {decision.no}</p>
                        </div>
                        <div>
                          <p className="text-purple-300 font-medium mb-1">Examples:</p>
                          <p className="text-foreground text-xs">{decision.examples}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Professional Application Principles</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Professional application of observation codes requires adherence to fundamental principles 
              that ensure consistency, reliability, and appropriate risk management across all inspections.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {applicationPrinciples.map((principle, index) => (
                <div key={index} className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Settings className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-green-200 font-medium mb-1">{principle.principle}</h4>
                      <p className="text-foreground text-sm mb-2">{principle.description}</p>
                      <p className="text-green-300 text-xs font-medium">Why it matters: {principle.importance}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Legal and Professional Implications</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Observation codes carry significant legal weight and professional responsibility. 
              Understanding these implications protects both the inspector and the client from potential liability.
            </p>
            <div className="space-y-4">
              <div className="bg-red-600/10 border border-red-600/20 rounded p-4">
                <Shield className="h-6 w-6 text-red-400 mb-3" />
                <h4 className="text-red-200 font-medium mb-3">Legal Responsibilities</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Electrical Safety Standards in Private Rented Sector Regulations compliance</li>
                  <li>• Health and Safety at Work Act obligations for risk assessment</li>
                  <li>• Consumer Protection Act implications for service provision</li>
                  <li>• Professional negligence liability for incorrect code application</li>
                  <li>• Insurance implications for unreported or incorrectly classified risks</li>
                  <li>• Building Regulations compliance and enforcement considerations</li>
                </ul>
              </div>
              <div className="bg-cyan-600/10 border border-cyan-600/20 rounded p-4">
                <Users className="h-6 w-6 text-cyan-400 mb-3" />
                <h4 className="text-cyan-200 font-medium mb-3">Professional Standards</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Competent person scheme requirements and assessment criteria</li>
                  <li>• Professional indemnity insurance coverage and claim prevention</li>
                  <li>• Client duty of care and safety information provision</li>
                  <li>• Continuing professional development to maintain competency</li>
                  <li>• Industry best practice compliance and peer review standards</li>
                  <li>• Quality assurance procedures and documentation requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Clipboard className="h-6 w-6 text-elec-yellow" />
            Summary
          </h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed">
              Observation codes provide the foundation for effective electrical safety management through 
              systematic risk assessment and clear communication. Professional competency in their application 
              is essential for maintaining safety standards and meeting legal obligations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="text-lg font-medium text-foreground mb-3">Key Principles</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Each code represents specific risk levels and response timeframes</li>
                  <li>• Systematic decision-making ensures consistent application</li>
                  <li>• Professional judgment must be supported by objective evidence</li>
                  <li>• Clear communication helps clients understand implications</li>
                  <li>• Legal responsibilities accompany all code classifications</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium text-foreground mb-3">Professional Standards</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Consistency across inspectors maintains industry credibility</li>
                  <li>• Evidence-based decisions support professional accountability</li>
                  <li>• Ongoing competency development ensures current knowledge</li>
                  <li>• Quality assurance procedures prevent application errors</li>
                  <li>• Client safety remains the primary consideration</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-[#2a2a2a] border border-gray-600 rounded p-4 mt-6">
              <p className="text-foreground text-sm">
                <strong className="text-foreground">Next Steps:</strong> Practice code application through practical 
                scenarios, develop decision-making workflows, and test knowledge with the comprehensive quiz. 
                Remember that observation codes directly impact safety outcomes and professional credibility.
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default ObservationCodesContent;