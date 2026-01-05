import { CheckCircle, Info, Target, Clipboard, AlertTriangle, Shield, Users, Settings, FileText, Database, Timer, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const DocumentationBestPracticesContent = () => {
  const introductionContent = {
    overview: "Professional electrical documentation requires systematic approaches to ensure accuracy, clarity, and legal compliance. Proper documentation practices protect both practitioners and clients while supporting effective electrical safety management throughout installation lifecycles. Quality documentation demonstrates professional competency and forms the foundation of electrical safety assurance.",
    importance: "High-quality documentation demonstrates professional competency, supports legal compliance, enables effective maintenance planning, and provides essential information for future electrical work. Poor documentation can lead to safety risks, legal liability, professional reputation damage, and potential prosecution under electrical safety regulations.",
    scope: "This section covers comprehensive documentation standards, common mistakes and prevention strategies, quality assurance procedures, best practices for professional electrical certification, digital documentation systems, and continuous improvement methodologies for maintaining documentation excellence."
  };

  const learningObjectives = [
    "Implement systematic documentation standards across all certificate types",
    "Identify and prevent common documentation errors and omissions",
    "Apply quality assurance procedures for consistent documentation quality",
    "Understand legal implications and professional responsibilities of documentation",
    "Develop efficient workflows for accurate and timely certificate completion",
    "Utilise digital systems effectively while maintaining professional standards",
    "Communicate technical information clearly to diverse stakeholders",
    "Maintain comprehensive records for professional accountability",
    "Implement continuous improvement processes for documentation quality",
    "Ensure compliance with industry standards and regulatory requirements"
  ];

  const commonMistakes = [
    {
      category: "Test Results Documentation",
      mistakes: [
        "Recording 'PASS/FAIL' instead of actual numerical values",
        "Leaving blank fields instead of recording 'N/A' where appropriate",
        "Missing units of measurement (Ω, mA, ms, etc.)",
        "Inconsistent decimal places and rounding", 
        "Failure to record test instrument details and calibration status",
        "Missing environmental conditions affecting test results"
      ],
      consequences: "Invalid certificates, inability to assess compliance trends, difficulty in fault diagnosis",
      prevention: "Use structured recording templates, implement peer review, maintain calibrated instruments"
    },
    {
      category: "Circuit Information Accuracy",
      mistakes: [
        "Mismatched cable sizes between schedule and actual installation",
        "Incorrect protective device ratings or characteristics",
        "Wrong circuit references and descriptions",
        "Installation method not matching actual cable routing",
        "Missing or incorrect RCD protection details",
        "Inadequate circuit load information"
      ],
      consequences: "Future electrical work based on incorrect information, safety risks from wrong assumptions",
      prevention: "Physical verification during inspection, cross-reference multiple information sources"
    },
    {
      category: "Observation Documentation",
      mistakes: [
        "Vague descriptions that don't enable effective action",
        "Missing precise location information for defects",
        "Unclear priority or urgency indicators",
        "No reference to specific standards or requirements",
        "Inconsistent observation coding across similar defects",
        "Inadequate supporting evidence or rationale"
      ],
      consequences: "Ineffective remedial action, misunderstood priorities, professional liability",
      prevention: "Structured observation templates, systematic decision-making processes"
    },
    {
      category: "Administrative Completeness",
      mistakes: [
        "Missing signatures or incomplete competent person details",
        "Incorrect dates or missing test completion dates",
        "Inadequate contact information for follow-up",
        "Missing next inspection due dates or recommendations",
        "Incomplete certificate distribution records",
        "Poor legibility in handwritten sections"
      ],
      consequences: "Invalid certificates, legal compliance issues, communication breakdown",
      prevention: "Pre-completion checklists, digital completion systems, quality review processes"
    }
  ];

  const documentationStandards = [
    {
      standard: "Accuracy and Precision",
      requirements: [
        "All test results recorded to appropriate precision (typically 0.01Ω for resistance values)",
        "Measurements include correct units and are within instrument accuracy limits",
        "Circuit details verified against physical installation during inspection",
        "Calculations checked and cross-referenced with supporting documentation",
        "Any assumptions or limitations clearly documented and justified"
      ],
      benefits: "Reliable technical information, effective fault diagnosis, professional credibility"
    },
    {
      standard: "Clarity and Communication", 
      requirements: [
        "Use clear, unambiguous technical language appropriate for target audience",
        "Provide specific location information enabling easy identification",
        "Include sufficient detail for effective remedial action planning",
        "Use standard electrical terminology and recognised abbreviations",
        "Structure information logically with clear section organisation"
      ],
      benefits: "Effective communication, reduced misunderstandings, improved safety outcomes"
    },
    {
      standard: "Completeness and Compliance",
      requirements: [
        "All mandatory fields completed with appropriate information",
        "Supporting documentation attached where required",
        "Compliance with current standards and regulatory requirements demonstrated",
        "Next inspection intervals calculated and clearly stated",
        "Distribution records maintained for all certificate copies"
      ],
      benefits: "Legal compliance, comprehensive safety assessment, audit trail maintenance"
    },
    {
      standard: "Professional Presentation",
      requirements: [
        "Consistent formatting and layout throughout documentation",
        "Legible presentation whether handwritten or digitally produced",
        "Appropriate company branding and professional identification",
        "Quality assurance evidence through signatures and review processes",
        "Secure storage and backup procedures for digital records"
      ],
      benefits: "Professional credibility, client confidence, business reputation enhancement"
    }
  ];

  const qualityAssurance = [
    {
      stage: "Pre-Documentation Planning",
      procedures: [
        "Review previous inspection reports and client requirements",
        "Ensure current knowledge of applicable standards and requirements",
        "Plan documentation approach including templates and systems to be used",
        "Verify availability of calibrated test instruments and recording materials",
        "Establish clear scope and limitations for the inspection documentation"
      ],
      outcomes: "Systematic approach, reduced errors, appropriate documentation scope"
    },
    {
      stage: "During Documentation",
      procedures: [
        "Record information immediately during inspection and testing",
        "Use structured templates and systematic recording approaches",
        "Cross-reference information between different sections of documentation",
        "Apply consistent decision-making criteria for observations and codes",
        "Verify completeness before leaving site where possible"
      ],
      outcomes: "Accurate information capture, consistent quality, reduced re-work"
    },
    {
      stage: "Post-Documentation Review",
      procedures: [
        "Systematic review of all sections for completeness and accuracy",
        "Technical review by qualified person (preferably different from inspector)",
        "Client communication planning and stakeholder notification",
        "Secure storage and backup procedures implementation",
        "Follow-up scheduling for recommended actions"
      ],
      outcomes: "Quality assurance, professional accountability, effective client service"
    },
    {
      stage: "Continuous Improvement",
      procedures: [
        "Regular review of documentation quality and client feedback",
        "Participation in peer review and professional development activities",
        "Updates to procedures based on regulatory changes and industry developments",
        "Investment in training and system improvements",
        "Benchmarking against industry best practices"
      ],
      outcomes: "Ongoing quality enhancement, professional development, competitive advantage"
    }
  ];

  const digitalSystems = [
    {
      aspect: "System Selection",
      considerations: [
        "Compliance with industry standards and certificate formats",
        "Integration capabilities with test equipment and existing systems",
        "Data security and backup procedures",
        "User interface design and ease of use",
        "Cost-effectiveness and scalability for business growth",
        "Technical support and training availability"
      ],
      benefits: "Appropriate technology investment, effective system utilisation"
    },
    {
      aspect: "Implementation Strategy",
      considerations: [
        "Staff training and competency development requirements",
        "Migration strategy for existing documentation and client records",
        "Quality assurance procedures for digital documentation",
        "Client communication and acceptance of digital certificates",
        "Backup procedures and disaster recovery planning",
        "Regular system updates and maintenance scheduling"
      ],
      benefits: "Smooth transition, maintained service quality, business continuity"
    },
    {
      aspect: "Quality Management",
      considerations: [
        "Built-in validation and error checking procedures",
        "Standardised templates and calculation verification",
        "Audit trails and version control for documentation changes",
        "User access controls and professional accountability",
        "Regular data backup and security monitoring",
        "Performance monitoring and system optimisation"
      ],
      benefits: "Enhanced accuracy, improved efficiency, professional accountability"
    }
  ];

  const legalImplications = [
    {
      area: "Professional Liability",
      obligations: [
        "Duty of care to provide accurate, honest professional assessment",
        "Professional indemnity insurance coverage for documentation errors",
        "Competency maintenance and continuing professional development",
        "Adherence to competent person scheme requirements and assessments",
        "Client confidentiality and data protection compliance",
        "Quality assurance and peer review participation"
      ],
      risks: "Professional negligence claims, insurance coverage issues, reputation damage"
    },
    {
      area: "Regulatory Compliance",
      obligations: [
        "Electrical Safety Standards in Private Rented Sector Regulations compliance",
        "Building Regulations notification and compliance documentation",
        "Health and Safety at Work Act risk assessment obligations",
        "Consumer Protection Act service provision standards",
        "Data Protection Act information handling requirements",
        "Industry-specific regulations and local authority requirements"
      ],
      risks: "Prosecution, financial penalties, enforcement action, business closure"
    },
    {
      area: "Civil Liability",
      obligations: [
        "Accurate representation of installation safety status",
        "Clear communication of risks and recommended actions",
        "Timely provision of certificates and safety information",
        "Professional accountability for technical decisions and advice",
        "Reasonable skill and care in service provision",
        "Appropriate limitation of liability through clear terms of engagement"
      ],
      risks: "Civil claims for damages, economic loss claims, injunctive relief"
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
              Develop comprehensive competency in professional electrical documentation through systematic 
              learning and practical application. Each objective builds essential skills for maintaining 
              documentation excellence and professional accountability.
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
          <h3 className="text-xl font-semibold text-foreground">Common Documentation Mistakes</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-6">
            <p className="text-foreground leading-relaxed mb-4">
              Understanding and preventing common documentation mistakes is essential for maintaining 
              professional standards and avoiding potential liability. These examples show typical errors 
              and their serious consequences for safety and professional credibility.
            </p>
            <div className="space-y-6">
              {commonMistakes.map((category, index) => (
                <div key={index} className="bg-red-600/10 border border-red-600/20 rounded-lg p-5">
                  <h4 className="text-red-200 font-bold text-lg mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    {category.category}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
                    <div>
                      <p className="text-red-300 font-medium text-sm mb-2">Common Mistakes:</p>
                      <ul className="text-foreground text-sm space-y-1">
                        {category.mistakes.map((mistake, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-red-400">•</span>
                            <span>{mistake}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-red-300 font-medium mb-1">Consequences:</p>
                      <p className="text-foreground">{category.consequences}</p>
                    </div>
                    <div>
                      <p className="text-red-300 font-medium mb-1">Prevention:</p>
                      <p className="text-foreground">{category.prevention}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Professional Documentation Standards</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Professional documentation standards ensure consistency, reliability, and effectiveness 
              across all electrical certification activities. These standards form the foundation 
              of quality electrical documentation practice.
            </p>
            <div className="space-y-4">
              {documentationStandards.map((standard, index) => (
                <div key={index} className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                  <h4 className="text-green-200 font-medium mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    {standard.standard}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div>
                      <p className="text-green-300 font-medium text-sm mb-2">Requirements:</p>
                      <ul className="text-foreground text-sm space-y-1 mb-3">
                        {standard.requirements.map((requirement, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span>•</span>
                            <span>{requirement}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-green-300 font-medium text-sm mb-1">Benefits:</p>
                      <p className="text-foreground text-sm">{standard.benefits}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Quality Assurance Framework</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Systematic quality assurance ensures consistent documentation quality and continuous 
              improvement in professional standards. This framework supports excellence in electrical certification.
            </p>
            <div className="space-y-4">
              {qualityAssurance.map((stage, index) => (
                <div key={index} className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                  <h4 className="text-purple-200 font-medium mb-3 flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    {stage.stage}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div>
                      <p className="text-purple-300 font-medium text-sm mb-2">Procedures:</p>
                      <ul className="text-foreground text-sm space-y-1 mb-3">
                        {stage.procedures.map((procedure, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-purple-400 mt-1 flex-shrink-0" />
                            <span>{procedure}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-purple-300 font-medium text-sm mb-1">Expected Outcomes:</p>
                      <p className="text-foreground text-sm">{stage.outcomes}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Digital Documentation Systems</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-gray-300 leading-relaxed mb-4">
              Digital documentation systems offer significant advantages for efficiency, accuracy, and quality management. 
              Proper implementation and management of these systems enhances professional capabilities and client service.
            </p>
            <div className="space-y-4">
              {digitalSystems.map((system, index) => (
                <div key={index} className="bg-cyan-600/10 border border-cyan-600/20 rounded-lg p-4">
                  <h4 className="text-cyan-200 font-medium mb-3 flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    {system.aspect}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div>
                      <p className="text-cyan-300 font-medium text-sm mb-2">Key Considerations:</p>
                      <ul className="text-foreground text-sm space-y-1 mb-3">
                        {system.considerations.map((consideration, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span>•</span>
                            <span>{consideration}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-cyan-300 font-medium text-sm mb-1">Benefits:</p>
                      <p className="text-foreground text-sm">{system.benefits}</p>
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
              Professional electrical documentation carries significant legal and professional obligations. 
              Understanding these implications is essential for risk management and professional protection.
            </p>
            <div className="space-y-4">
              {legalImplications.map((area, index) => (
                <div key={index} className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                  <h4 className="text-orange-200 font-medium mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    {area.area}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div>
                      <p className="text-orange-300 font-medium text-sm mb-2">Key Obligations:</p>
                      <ul className="text-foreground text-sm space-y-1 mb-3">
                        {area.obligations.map((obligation, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Shield className="h-3 w-3 text-orange-400 mt-1 flex-shrink-0" />
                            <span>{obligation}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-orange-300 font-medium text-sm mb-1">Associated Risks:</p>
                      <p className="text-foreground text-sm">{area.risks}</p>
                    </div>
                  </div>
                </div>
              ))}
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
              Professional electrical documentation excellence requires systematic approaches, quality assurance, 
              and continuous improvement. These practices ensure electrical safety, legal compliance, and 
              professional credibility while supporting effective electrical safety management.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="text-lg font-medium text-foreground mb-3">Essential Principles</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Accuracy and precision in all technical documentation</li>
                  <li>• Clear communication supporting effective decision-making</li>
                  <li>• Systematic quality assurance preventing errors and omissions</li>
                  <li>• Professional accountability through comprehensive documentation</li>
                  <li>• Continuous improvement maintaining excellence standards</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium text-foreground mb-3">Professional Standards</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Legal compliance protects practitioners and clients</li>
                  <li>• Quality documentation supports electrical safety management</li>
                  <li>• Digital systems enhance efficiency while maintaining quality</li>
                  <li>• Professional development ensures current knowledge and skills</li>
                  <li>• Industry leadership through documentation excellence</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-[#2a2a2a] border border-gray-600 rounded p-4 mt-6">
              <p className="text-gray-300 text-sm">
                <strong className="text-foreground">Next Steps:</strong> Implement systematic documentation procedures, 
                develop quality assurance frameworks, and test knowledge with the comprehensive quiz. 
                Remember that documentation quality directly reflects professional competency and commitment to electrical safety.
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default DocumentationBestPracticesContent;