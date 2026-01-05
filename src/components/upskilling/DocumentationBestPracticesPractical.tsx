import { Wrench, CheckCircle, AlertTriangle, Info, Clock, FileText, Target, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DocumentationBestPracticesPractical = () => {
  const practicalWorkflows = [
    {
      workflow: "Pre-Documentation Preparation",
      steps: [
        "Review client requirements and previous documentation",
        "Verify test equipment calibration and functionality",
        "Prepare appropriate documentation templates and materials",
        "Plan inspection route and documentation sequence",
        "Establish clear scope and limitations for the work"
      ],
      benefits: "Systematic approach, reduced errors, professional presentation",
      timeAllocation: "15-20% of total inspection time"
    },
    {
      workflow: "Real-Time Documentation",
      steps: [
        "Record measurements immediately during testing",
        "Use voice recording or mobile apps for complex observations",
        "Cross-reference circuit details with physical installation",
        "Photograph key defects and installation details where helpful",
        "Apply systematic decision-making for observation codes"
      ],
      benefits: "Accurate information capture, reduced transcription errors",
      timeAllocation: "60-70% of total inspection time"
    },
    {
      workflow: "Documentation Review and Completion",
      steps: [
        "Systematic review of all sections for completeness",
        "Technical validation by qualified reviewer where possible",
        "Client communication and explanation of findings",
        "Digital processing and backup procedures",
        "Distribution and follow-up scheduling"
      ],
      benefits: "Quality assurance, professional accountability, client satisfaction",
      timeAllocation: "15-20% of total inspection time"
    }
  ];

  const qualityTemplates = [
    {
      documentType: "Test Results Recording",
      template: {
        structure: "Circuit reference → Test type → Result → Units → Limit → Pass/Fail status",
        example: "RFC1 → Zs → 0.85Ω → (limit 1.44Ω) → PASS",
        validation: "Check units, verify against protective device rating, confirm within instrument accuracy"
      },
      commonErrors: ["Missing units", "Wrong decimal places", "Incorrect limits", "Unclear references"]
    },
    {
      documentType: "Observation Documentation",
      template: {
        structure: "Location → Defect description → Safety implication → Code → Remedial action",
        example: "Kitchen RFC → Socket outlet cracked exposing live terminal → Risk of electric shock → C1 → Replace socket outlet immediately",
        validation: "Verify code appropriateness, check clarity of description, confirm actionable remedial instruction"
      },
      commonErrors: ["Vague locations", "Unclear descriptions", "Wrong codes", "Non-actionable remediation"]
    },
    {
      documentType: "Circuit Schedule Completion", 
      template: {
        structure: "Reference → Description → Cable details → Protection → Load → Test results",
        example: "L1 → Ground floor lighting → 1.5mm² T&E, Method C → 6A Type B MCB → 3.2A → All tests satisfactory",
        validation: "Verify cable size matches protection, check load calculation, confirm test result consistency"
      },
      commonErrors: ["Mismatched cable/protection", "Missing load data", "Inconsistent references", "Incomplete testing"]
    },
    {
      documentType: "Competent Person Details",
      template: {
        structure: "Name → Qualifications → Registration → Contact details → Signature → Date",
        example: "J. Smith → C&G 2391, 18th Edition → NICEIC 12345 → 01234 567890 → [Signature] → 15/08/2024",
        validation: "Check current registration status, verify qualification currency, ensure clear signature"
      },
      commonErrors: ["Outdated qualifications", "Expired registrations", "Unclear signatures", "Missing contact details"]
    }
  ];

  const errorPrevention = [
    {
      errorType: "Transcription Errors",
      causes: ["Copying between handwritten notes and certificates", "Reading instrument displays incorrectly", "Misunderstanding circuit references"],
      preventionStrategies: [
        "Use direct digital recording where possible",
        "Implement double-checking procedures for critical data", 
        "Use structured recording sheets with clear formatting",
        "Verify circuit references against multiple sources"
      ],
      detectionMethods: ["Peer review", "Cross-referencing", "Range checking", "Client feedback"]
    },
    {
      errorType: "Calculation Errors",
      causes: ["Manual calculation mistakes", "Wrong formula application", "Unit conversion errors", "Outdated standard values"],
      preventionStrategies: [
        "Use validated calculation software where available",
        "Implement systematic checking procedures",
        "Maintain current reference materials and standards",
        "Cross-check calculations using alternative methods"
      ],
      detectionMethods: ["Independent calculation", "Software validation", "Reasonableness checks", "Historical comparison"]
    },
    {
      errorType: "Omission Errors",
      causes: ["Incomplete inspection coverage", "Forgotten documentation sections", "Operational limitations", "Time pressure"],
      preventionStrategies: [
        "Use comprehensive checklists and templates",
        "Plan adequate time allocation for thorough inspection",
        "Implement systematic review procedures",
        "Clear documentation of limitations and exclusions"
      ],
      detectionMethods: ["Systematic review", "Completeness checking", "Client verification", "Follow-up inspections"]
    },
    {
      errorType: "Consistency Errors",
      causes: ["Multiple inspectors with different approaches", "Changing standards interpretation", "Fatigue and concentration lapses", "Inadequate training"],
      preventionStrategies: [
        "Develop standardised procedures and decision criteria",
        "Implement regular training and calibration exercises",
        "Use peer review and quality assurance procedures",
        "Maintain decision-making documentation and precedents"
      ],
      detectionMethods: ["Peer comparison", "Statistical analysis", "Client feedback", "Regulatory review"]
    }
  ];

  const clientCommunication = [
    {
      scenario: "C1 Observation Explanation",
      approach: "Immediate, clear, non-technical explanation focusing on safety risk",
      keyMessages: [
        "Immediate danger exists that requires urgent attention",
        "Installation should not be used until made safe",
        "Specific action required and estimated timeframe",
        "Contact details for emergency electrical services if needed"
      ],
      documentation: "Record client notification, response, and any immediate actions taken"
    },
    {
      scenario: "Technical Results Explanation",
      approach: "Clear explanation of what tests show and their significance",
      keyMessages: [
        "Purpose of each test and what it demonstrates",
        "How results compare with safety requirements",
        "Implications for ongoing safe use of installation",
        "Recommended actions and timeframes"
      ],
      documentation: "Note client understanding and any questions raised"
    },
    {
      scenario: "Limitation Explanation",
      approach: "Clear explanation of what could not be inspected and why",
      keyMessages: [
        "Specific areas or circuits not inspected",
        "Reasons for limitations (operational, access, safety)",
        "Potential implications of uninspected areas",
        "Recommendations for future investigation"
      ],
      documentation: "Client acknowledgment of limitations and associated risks"
    },
    {
      scenario: "Follow-up Requirements",
      approach: "Clear guidance on next steps and ongoing responsibilities",
      keyMessages: [
        "Next inspection due date and regulatory requirements",
        "Recommended maintenance and monitoring procedures",
        "Contact arrangements for questions or concerns",
        "Record keeping and certificate retention responsibilities"
      ],
      documentation: "Client understanding of ongoing obligations and contact arrangements"
    }
  ];

  const continuousImprovement = [
    {
      activity: "Regular Self-Assessment",
      frequency: "Monthly",
      procedures: [
        "Review recent documentation for common errors or omissions",
        "Analyze client feedback and follow-up queries", 
        "Compare documentation efficiency and quality trends",
        "Identify areas requiring additional training or development"
      ],
      outcomes: "Personal development planning, skill gap identification"
    },
    {
      activity: "Peer Review and Collaboration",
      frequency: "Quarterly", 
      procedures: [
        "Participate in peer review exercises with colleagues",
        "Share challenging scenarios and decision-making rationale",
        "Discuss industry developments and standard changes",
        "Benchmark documentation quality against industry standards"
      ],
      outcomes: "Consistent standards, shared learning, professional development"
    },
    {
      activity: "Professional Development",
      frequency: "Annually",
      procedures: [
        "Attend relevant training courses and industry seminars",
        "Review changes to standards and regulatory requirements",
        "Assess competency against current industry expectations",
        "Update procedures and templates based on best practice"
      ],
      outcomes: "Current knowledge, maintained competency, improved practices"
    },
    {
      activity: "System and Process Review",
      frequency: "Annually",
      procedures: [
        "Evaluate effectiveness of documentation systems and procedures",
        "Consider new technology and software developments",
        "Review business processes for efficiency improvements",
        "Update quality assurance procedures based on experience"
      ],
      outcomes: "Optimized efficiency, enhanced quality, competitive advantage"
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Professional Documentation Workflows</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Systematic workflows ensure consistent documentation quality while optimizing efficiency. 
              These proven approaches support professional electrical certification across all work types.
            </p>
            <div className="space-y-4">
              {practicalWorkflows.map((workflow, index) => (
                <div key={index} className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                  <h4 className="text-blue-200 font-medium mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    {workflow.workflow}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div>
                      <p className="text-blue-300 font-medium text-sm mb-2">Key Steps:</p>
                        <ul className="text-foreground text-sm space-y-1 mb-3">
                          {workflow.steps.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-blue-400 mt-1 flex-shrink-0" />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-blue-300 font-medium mb-1">Benefits:</p>
                            <p className="text-foreground">{workflow.benefits}</p>
                          </div>
                          <div>
                            <p className="text-blue-300 font-medium mb-1">Time Allocation:</p>
                            <p className="text-foreground">{workflow.timeAllocation}</p>
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
          <h3 className="text-xl font-semibold text-foreground">Quality Documentation Templates</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Structured templates ensure consistency and completeness while reducing errors. 
              These proven formats support accurate and professional documentation across all certificate types.
            </p>
            <div className="space-y-4">
              {qualityTemplates.map((template, index) => (
                <div key={index} className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                  <h4 className="text-green-200 font-medium mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {template.documentType}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-sm">
                    <div className="space-y-3">
                      <div>
                        <p className="text-green-300 font-medium mb-1">Structure:</p>
                        <p className="text-foreground bg-[#2a2a2a] p-2 rounded font-mono text-xs">{template.template.structure}</p>
                      </div>
                      <div>
                        <p className="text-green-300 font-medium mb-1">Example:</p>
                        <p className="text-foreground bg-[#2a2a2a] p-2 rounded text-xs">{template.template.example}</p>
                      </div>
                      <div>
                        <p className="text-green-300 font-medium mb-1">Validation:</p>
                        <p className="text-foreground text-xs">{template.template.validation}</p>
                      </div>
                      <div>
                        <p className="text-red-300 font-medium mb-1">Common Errors to Avoid:</p>
                        <div className="flex flex-wrap gap-2">
                          {template.commonErrors.map((error, idx) => (
                            <span key={idx} className="bg-red-600/20 text-red-300 px-2 py-1 rounded text-xs">
                              {error}
                            </span>
                          ))}
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
          <h3 className="text-xl font-semibold text-foreground">Error Prevention Strategies</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Systematic error prevention protects professional reputation and ensures client safety. 
              These strategies address common error types with proven prevention and detection methods.
            </p>
            <div className="space-y-4">
              {errorPrevention.map((error, index) => (
                <div key={index} className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                  <h4 className="text-red-200 font-medium mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    {error.errorType}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-3">
                      <div>
                        <p className="text-red-300 font-medium mb-2">Common Causes:</p>
                        <ul className="text-foreground space-y-1">
                          {error.causes.map((cause, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span>•</span>
                              <span>{cause}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-red-300 font-medium mb-2">Detection Methods:</p>
                        <div className="flex flex-wrap gap-1">
                          {error.detectionMethods.map((method, idx) => (
                            <span key={idx} className="bg-red-600/20 text-red-300 px-2 py-1 rounded text-xs">
                              {method}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-red-300 font-medium mb-2">Prevention Strategies:</p>
                      <ul className="text-foreground space-y-1">
                        {error.preventionStrategies.map((strategy, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-red-400 mt-1 flex-shrink-0" />
                            <span>{strategy}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Effective Client Communication</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-gray-300 leading-relaxed mb-4">
              Clear client communication ensures understanding, supports decision-making, and maintains professional relationships. 
              These approaches address different scenarios requiring tailored communication strategies.
            </p>
            <div className="space-y-4">
              {clientCommunication.map((comm, index) => (
                <div key={index} className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                  <h4 className="text-yellow-200 font-medium mb-3 flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    {comm.scenario}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-sm">
                    <div className="space-y-3">
                      <div>
                        <p className="text-yellow-300 font-medium mb-1">Approach:</p>
                        <p className="text-foreground">{comm.approach}</p>
                      </div>
                      <div>
                        <p className="text-yellow-300 font-medium mb-2">Key Messages:</p>
                        <ul className="text-foreground space-y-1">
                          {comm.keyMessages.map((message, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span>•</span>
                              <span>{message}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-yellow-300 font-medium mb-1">Documentation Requirements:</p>
                        <p className="text-foreground">{comm.documentation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Continuous Improvement Framework</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-gray-300 leading-relaxed mb-4">
              Systematic continuous improvement maintains and enhances documentation quality while supporting 
              professional development. This framework ensures ongoing excellence in electrical certification.
            </p>
            <div className="space-y-4">
              {continuousImprovement.map((activity, index) => (
                <div key={index} className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                  <h4 className="text-purple-200 font-medium mb-3 flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    {activity.activity}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-sm">
                    <div className="space-y-3">
                      <div>
                        <p className="text-purple-300 font-medium mb-1">Frequency: <span className="text-gray-300">{activity.frequency}</span></p>
                      </div>
                      <div>
                        <p className="text-purple-300 font-medium mb-2">Procedures:</p>
                        <ul className="text-gray-300 space-y-1">
                          {activity.procedures.map((procedure, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Clock className="h-3 w-3 text-purple-400 mt-1 flex-shrink-0" />
                              <span>{procedure}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-purple-300 font-medium mb-1">Expected Outcomes:</p>
                        <p className="text-gray-300">{activity.outcomes}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default DocumentationBestPracticesPractical;