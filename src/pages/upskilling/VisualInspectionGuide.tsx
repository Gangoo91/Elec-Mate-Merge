import { ArrowLeft, Eye, AlertTriangle, CheckCircle, Camera, FileText, Clock, Target, BookOpen, Lightbulb, Shield, Zap, Settings, XCircle, Users, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const VisualInspectionGuide = () => {
  const inspectionSteps = [
    {
      step: 1,
      title: "Initial Assessment & Documentation Review",
      description: "Begin with reviewing all available documentation and preparing your inspection checklist",
      details: [
        "Review electrical installation certificate or previous inspection reports",
        "Check building plans and electrical drawings if available", 
        "Prepare inspection checklist and documentation forms",
        "Identify the scope of installation to be inspected",
        "Note any limitations or restrictions to the inspection"
      ],
      assessorLooks: [
        "Systematic approach to documentation review",
        "Proper preparation of inspection materials",
        "Clear understanding of inspection scope"
      ]
    },
    {
      step: 2,
      title: "Safe Approach & Initial Observations",
      description: "Conduct preliminary observations while maintaining safety protocols",
      details: [
        "Approach installation safely, noting any immediate hazards",
        "Check for obvious damage, burning, or deterioration",
        "Observe general condition and age of installation", 
        "Note environmental conditions affecting the installation",
        "Identify any non-standard or unusual arrangements"
      ],
      assessorLooks: [
        "Safety-conscious approach",
        "Systematic observation methodology",
        "Recognition of potential hazards"
      ]
    },
    {
      step: 3,
      title: "Distribution Board Inspection",
      description: "Thorough examination of the main distribution board and consumer units",
      details: [
        "Check board condition, mounting, and accessibility",
        "Verify correct labelling of circuits and protective devices",
        "Inspect protective devices for correct type and rating",
        "Check for signs of overheating, arcing, or damage",
        "Verify adequate working space and emergency access",
        "Examine earth and neutral bar connections",
        "Check for missing blanks in unused ways"
      ],
      assessorLooks: [
        "Methodical examination of all components",
        "Recognition of non-compliances",
        "Understanding of current regulations"
      ]
    },
    {
      step: 4,
      title: "Circuit Wiring Inspection", 
      description: "Examine all accessible wiring throughout the installation",
      details: [
        "Check cable types are appropriate for their application",
        "Verify cables are properly supported and protected",
        "Inspect for mechanical damage to cables and accessories",
        "Check installation methods comply with regulations",
        "Examine cable entries to enclosures and accessories",
        "Verify adequate protection against vermin damage",
        "Check for correct colour coding of conductors"
      ],
      assessorLooks: [
        "Knowledge of cable installation requirements",
        "Recognition of poor workmanship",
        "Understanding of protection methods"
      ]
    },
    {
      step: 5,
      title: "Accessories and Equipment Inspection",
      description: "Detailed examination of switches, sockets, and electrical equipment", 
      details: [
        "Check all accessories are properly secured and undamaged",
        "Verify correct IP ratings for locations",
        "Inspect socket outlets for correct type and positioning",
        "Check switch operation and mounting security",
        "Examine luminaires for correct installation and condition",
        "Verify earthing arrangements for Class I equipment",
        "Check for adequate provision of socket outlets"
      ],
      assessorLooks: [
        "Understanding of IP rating requirements",
        "Recognition of location-specific requirements", 
        "Knowledge of earthing requirements"
      ]
    },
    {
      step: 6,
      title: "Special Locations Inspection",
      description: "Focused examination of bathrooms, kitchens, and other special locations",
      details: [
        "Identify zone classifications in bathroom areas",
        "Check IP ratings are appropriate for each zone",
        "Verify socket positioning in kitchens and bathrooms",
        "Inspect supplementary bonding arrangements",
        "Check for RCD protection where required",
        "Examine outdoor installations and outbuildings",
        "Verify swimming pool or spa installations if present"
      ],
      assessorLooks: [
        "Knowledge of special location requirements",
        "Understanding of zone classifications",
        "Recognition of additional protection needs"
      ]
    },
    {
      step: 7,
      title: "Earthing and Bonding Systems",
      description: "Comprehensive examination of protective conductor arrangements",
      details: [
        "Check main earthing terminal and connections",
        "Inspect earth electrode arrangements if applicable",
        "Verify main protective bonding to services",
        "Check supplementary bonding where required",
        "Examine CPC continuity throughout circuits",
        "Verify bonding conductor sizes and identification",
        "Check accessibility of bonding connections"
      ],
      assessorLooks: [
        "Understanding of earthing arrangements",
        "Knowledge of bonding requirements",
        "Recognition of inadequate bonding"
      ]
    },
    {
      step: 8,
      title: "Documentation and Defect Recording",
      description: "Accurate recording of findings and preparation of inspection report",
      details: [
        "Record all observations systematically",
        "Classify defects using correct observation codes",
        "Photograph significant defects for evidence",
        "Complete inspection schedule accurately",
        "Prepare recommendations for remedial work",
        "Ensure all limitations are properly recorded",
        "Check all required signatures and dates"
      ],
      assessorLooks: [
        "Accurate use of observation codes",
        "Comprehensive defect recording",
        "Professional report presentation"
      ]
    }
  ];

  const commonDefects = [
    {
      category: "C1 - Danger Present",
      examples: [
        "Live parts accessible due to missing covers",
        "Damaged cables with exposed conductors", 
        "Incorrectly connected protective devices",
        "Missing earth connections on Class I equipment"
      ]
    },
    {
      category: "C2 - Potentially Dangerous",
      examples: [
        "Insufficient IP rating for location",
        "Damaged cable insulation",
        "Loose connections in accessories",
        "Missing RCD protection where required"
      ]
    },
    {
      category: "C3 - Improvement Recommended", 
      examples: [
        "Old cable colours in use",
        "Inadequate circuit labelling",
        "Non-standard installation methods",
        "Insufficient socket provision"
      ]
    }
  ];

  const assessorTips = [
    {
      title: "Systematic Approach",
      tip: "Follow a logical sequence from intake to final circuits - don't jump around randomly"
    },
    {
      title: "Safety First",
      tip: "Always demonstrate safe working practices and risk awareness throughout"
    },
    {
      title: "Know Your Codes",
      tip: "Understand when to use C1, C2, C3, and FI codes - this is crucial for assessment"
    },
    {
      title: "Document Everything",
      tip: "Record findings as you go - don't rely on memory for the final report"
    },
    {
      title: "Ask Questions",
      tip: "If you're unsure about something, ask the assessor - it shows engagement"
    },
    {
      title: "Time Management", 
      tip: "Practice timing your inspections - assessors expect efficient but thorough work"
    }
  ];

  const regulatoryGuidance = [
    {
      regulation: "BS 7671:2018 Chapter 61",
      title: "Initial Verification",
      requirements: [
        "Visual inspection must precede all testing activities",
        "All accessible parts of the installation must be inspected",
        "Inspection must verify compliance with BS 7671 requirements",
        "Documentation must be completed during inspection process"
      ]
    },
    {
      regulation: "BS 7671:2018 Section 621",
      title: "Visual Inspection Requirements",
      requirements: [
        "Connection of conductors (correct termination)",
        "Identification of conductors (correct colour coding)",
        "Routing of cables in prescribed zones",
        "Selection and erection of equipment and protective measures",
        "Presence of fire barriers, suitable seals and protection against thermal effects",
        "Methods of protection against electric shock",
        "Prevention of mutual detrimental influence",
        "Presence of appropriate documentation, warnings and labelling"
      ]
    }
  ];

  const detailedExamples = {
    distributionBoard: [
      {
        defect: "Missing Circuit Labels",
        code: "C3",
        description: "Circuits not properly identified with permanent labels",
        regulation: "BS 7671 Section 514.8.1",
        whatToLook: "Each protective device should have clear, permanent labelling indicating the circuit it protects",
        assessorExpects: "Recognition that whilst not immediately dangerous, proper labelling is essential for maintenance and emergency situations"
      },
      {
        defect: "Damaged Enclosure",
        code: "C2", 
        description: "Cracked or damaged consumer unit casing",
        regulation: "BS 7671 Section 416.2.1",
        whatToLook: "Any damage that could allow access to live parts or reduce IP rating",
        assessorExpects: "Understanding that damaged enclosures compromise protection and could lead to danger"
      },
      {
        defect: "Missing Blanking Plates",
        code: "C2",
        description: "Unused ways in consumer unit not fitted with blanks",
        regulation: "BS 7671 Section 416.2.1",
        whatToLook: "All unused ways should be fitted with appropriate blanking plates",
        assessorExpects: "Recognition that missing blanks allow access to live parts"
      }
    ],
    wiring: [
      {
        defect: "Cable in Safe Zones",
        code: "✓ Compliant",
        description: "Cables run in prescribed safe zones",
        regulation: "BS 7671 Section 522.6.101",
        whatToLook: "Cables should run vertically or horizontally from accessories within 150mm zones",
        assessorExpects: "Understanding of safe zone requirements and recognition of compliant installations"
      },
      {
        defect: "Inadequate Cable Support",
        code: "C3",
        description: "Cable runs not adequately supported",
        regulation: "BS 7671 Section 522.8.4",
        whatToLook: "Cables should be supported at appropriate intervals to prevent mechanical strain",
        assessorExpects: "Knowledge of support requirements and recognition of potential long-term issues"
      },
      {
        defect: "Mechanical Damage",
        code: "C1",
        description: "Cable with visible conductor damage",
        regulation: "BS 7671 Section 522.6.1",
        whatToLook: "Any damage exposing live conductors or significantly reducing insulation",
        assessorExpects: "Immediate recognition of danger and understanding of urgent remedial action required"
      }
    ]
  };

  const commonMistakes = [
    {
      mistake: "Incorrect Code Classification",
      description: "Using C2 when C1 is appropriate (or vice versa)",
      impact: "Fails to convey the actual level of risk to the client",
      avoidBy: "Understanding the difference: C1 = immediate danger, C2 = potentially dangerous",
      example: "Exposed live conductor should be C1, not C2"
    },
    {
      mistake: "Insufficient Detail in Recording",
      description: "Vague descriptions that don't help identify the specific defect",
      impact: "Remedial work cannot be properly planned and costed",
      avoidBy: "Be specific about location, nature, and extent of defects",
      example: "Instead of 'damaged cable', write 'damaged T&E cable in kitchen, outer sheath cut exposing inner conductors'"
    },
    {
      mistake: "Missing Regulatory References",
      description: "Not referencing the specific regulation that is contravened",
      impact: "Reduces credibility and makes it harder to justify recommendations",
      avoidBy: "Learn key regulation numbers and always reference them",
      example: "Missing supplementary bonding (BS 7671 Section 701.415.2)"
    },
    {
      mistake: "Focusing Only on Obvious Defects",
      description: "Missing subtle but important compliance issues",
      impact: "Incomplete inspection that could miss safety-critical items",
      avoidBy: "Systematic approach covering all aspects of the installation",
      example: "Checking cable entry methods, not just obvious damage"
    }
  ];

  const environmentalFactors = [
    {
      factor: "Moisture and Humidity",
      considerations: [
        "Check IP ratings appropriate for location",
        "Look for signs of water ingress or condensation",
        "Verify corrosion protection on metalwork",
        "Ensure drainage provisions where required"
      ],
      locations: "Bathrooms, kitchens, outdoor areas, basements",
      regulations: "BS 7671 Sections 512.2, 522.3"
    },
    {
      factor: "Temperature Extremes",
      considerations: [
        "Check cable derating calculations for high temperatures",
        "Look for signs of overheating or thermal damage",
        "Verify equipment rated for ambient conditions",
        "Check thermal insulation effects on cables"
      ],
      locations: "Boiler rooms, lofts, outdoor installations",
      regulations: "BS 7671 Sections 522.1, 523.3"
    },
    {
      factor: "Mechanical Damage Risk",
      considerations: [
        "Assess vulnerability to impact damage",
        "Check adequacy of mechanical protection",
        "Verify installation height requirements",
        "Look for signs of existing damage"
      ],
      locations: "Workshops, garages, commercial premises",
      regulations: "BS 7671 Section 522.6"
    },
    {
      factor: "Chemical Environment",
      considerations: [
        "Check material compatibility with environment",
        "Look for corrosion or degradation signs",
        "Verify IP ratings for dust and particles",
        "Assess ventilation requirements"
      ],
      locations: "Laboratories, industrial premises, agricultural buildings",
      regulations: "BS 7671 Section 522.5"
    }
  ];

  const practicalScenarios = [
    {
      scenario: "Domestic Kitchen Inspection",
      setup: "Modern kitchen with island unit, induction hob, and built-in appliances",
      keyPoints: [
        "Socket positioning relative to sink and hob",
        "RCD protection for all socket outlets",
        "Adequate number of sockets to prevent extension lead use",
        "Correct cable types behind built-in appliances",
        "Switch positioning and accessibility"
      ],
      commonFindings: [
        "Sockets too close to sink (C2)",
        "No RCD protection (C2)", 
        "Inadequate socket provision (C3)",
        "Damaged cable behind appliances (C1/C2)"
      ]
    },
    {
      scenario: "Bathroom Zone Assessment",
      setup: "Family bathroom with electric shower, extractor fan, and mirror lighting",
      keyPoints: [
        "Zone 0, 1, 2 classifications and boundaries",
        "IP rating requirements for each zone",
        "Supplementary bonding to metalwork",
        "RCD protection requirements",
        "Switch and socket positioning"
      ],
      commonFindings: [
        "Incorrect IP rating for zone (C2)",
        "Missing supplementary bonding (C2)",
        "Switch in wrong zone (C1)",
        "No RCD protection for shower (C1)"
      ]
    },
    {
      scenario: "Consumer Unit Inspection", 
      setup: "Split-load consumer unit with RCD protection and various circuit types",
      keyPoints: [
        "Condition of enclosure and mounting",
        "Correct protective device ratings",
        "RCD testing button accessibility",
        "Circuit labelling and identification",
        "Main switch operation and rating"
      ],
      commonFindings: [
        "Missing circuit labels (C3)",
        "Damaged enclosure (C2)",
        "Incorrect MCB ratings (C2)",
        "No RCD test record (FI)"
      ]
    }
  ];

  const advancedTechniques = [
    {
      technique: "Photographic Evidence",
      description: "Systematic documentation of defects using photography",
      application: [
        "Take wide shots to show context and location",
        "Close-up shots to show detail of defects",
        "Include measuring device for scale where relevant",
        "Ensure good lighting and sharp focus",
        "Number photos to match inspection schedule"
      ],
      assessorLooks: "Professional approach to evidence gathering"
    },
    {
      technique: "Defect Severity Assessment",
      description: "Consistent approach to classifying observation codes",
      application: [
        "C1: Immediate danger - installation unsafe for continued use",
        "C2: Potentially dangerous - urgent remedial action required",
        "C3: Improvement recommended - does not comply with current standards",
        "FI: Further investigation required - more detailed examination needed"
      ],
      assessorLooks: "Correct understanding and application of codes"
    },
    {
      technique: "Client Communication",
      description: "Professional explanation of findings and recommendations",
      application: [
        "Use clear, non-technical language for explanations",
        "Prioritise safety-critical items",
        "Provide realistic timescales for remedial work",
        "Explain legal and insurance implications",
        "Offer practical advice on temporary measures"
      ],
      assessorLooks: "Professional communication skills and client care"
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="module-8/section-3">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Practical Assessment
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="h-8 w-8 text-elec-yellow" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Visual Inspection Guide
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-white max-w-4xl">
            Comprehensive step-by-step guidance for conducting professional visual inspections on electrical installations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Introduction */}
          <Card className="bg-transparent border-elec-yellow/30">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <Target className="h-6 w-6" />
                Assessment Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Visual inspection is the first and most critical stage of electrical installation inspection and testing. 
                Assessors will evaluate your ability to systematically examine an installation, identify defects, 
                and accurately record findings using the correct observation codes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-elec-yellow/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-300 mb-2">Knowledge</h4>
                  <p className="text-sm">Understanding of current regulations and inspection requirements</p>
                </div>
                <div className="bg-green-600/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-300 mb-2">Skills</h4>
                  <p className="text-sm">Systematic inspection methodology and defect recognition</p>
                </div>
                <div className="bg-purple-600/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-300 mb-2">Application</h4>
                  <p className="text-sm">Accurate recording and classification of findings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step-by-Step Guide */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-elec-yellow mb-6">Step-by-Step Inspection Process</h2>
            
            {inspectionSteps.map((step) => (
              <Card key={step.step} className="bg-transparent border-transparent hover:border-elec-yellow/30 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Badge className="bg-elec-yellow text-black font-bold px-3 py-1 text-sm">
                      Step {step.step}
                    </Badge>
                    <div>
                      <CardTitle className="text-white text-xl">{step.title}</CardTitle>
                      <p className="text-white mt-2">{step.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        What to Do
                      </h4>
                      <ul className="space-y-2">
                        {step.details.map((detail, index) => (
                          <li key={index} className="text-white text-sm flex items-start gap-2">
                            <span className="text-elec-yellow mt-1">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-orange-400 mb-3 flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        What Assessors Look For
                      </h4>
                      <ul className="space-y-2">
                        {step.assessorLooks.map((item, index) => (
                          <li key={index} className="text-white text-sm flex items-start gap-2">
                            <span className="text-orange-400 mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Common Defects */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-elec-yellow mb-6">Common Defects and Observation Codes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {commonDefects.map((defect, index) => (
                <Card key={index} className="bg-transparent border-transparent">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className={`h-5 w-5 ${index === 0 ? 'text-red-400' : index === 1 ? 'text-orange-400' : 'text-elec-yellow'}`} />
                      <span className={index === 0 ? 'text-red-400' : index === 1 ? 'text-orange-400' : 'text-elec-yellow'}>
                        {defect.category}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {defect.examples.map((example, exIndex) => (
                        <li key={exIndex} className="text-white text-sm flex items-start gap-2">
                          <span className={`mt-1 ${index === 0 ? 'text-red-400' : index === 1 ? 'text-orange-400' : 'text-elec-yellow'}`}>•</span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Assessor Tips */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-elec-yellow mb-6">Professional Tips for Assessment Success</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assessorTips.map((tip, index) => (
                <Card key={index} className="bg-gradient-to-br from-elec-gray to-[#323232] border-elec-yellow/30">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-elec-yellow mb-2">{tip.title}</h4>
                    <p className="text-white text-sm">{tip.tip}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Final Checklist */}
          <Card className="bg-gradient-to-r from-green-900/20 to-elec-gray border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Pre-Assessment Checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Before You Start</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      PPE and safety equipment ready
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Inspection forms and checklist prepared
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Camera for photographing defects
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Understanding of installation scope
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">During Inspection</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Work systematically through each area
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Record findings immediately
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Use correct observation codes
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Maintain professional communication
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Regulatory Guidance */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-elec-yellow mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Regulatory Framework & Standards
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {regulatoryGuidance.map((reg, index) => (
                <Card key={index} className="bg-transparent border-elec-yellow/30">
                  <CardHeader>
                    <CardTitle className="text-elec-yellow text-lg flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      {reg.regulation}
                    </CardTitle>
                    <p className="text-white font-semibold">{reg.title}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {reg.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="text-white text-sm flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Detailed Defect Examples */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-elec-yellow mb-6 flex items-center gap-2">
              <Lightbulb className="h-6 w-6" />
              Detailed Defect Analysis
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Distribution Board Defects</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {detailedExamples.distributionBoard.map((example, index) => (
                    <Card key={index} className="bg-transparent border-transparent">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-white text-base">{example.defect}</CardTitle>
                          <Badge className={`
                            ${example.code === 'C1' ? 'bg-red-600/40 text-red-300' : 
                              example.code === 'C2' ? 'bg-orange-600/40 text-orange-300' : 
                              'bg-elec-yellow/40 text-yellow-300'}
                          `}>
                            {example.code}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3 pt-0">
                        <p className="text-white text-sm">{example.description}</p>
                        <div className="space-y-2">
                          <p className="text-xs text-elec-yellow font-semibold">Regulation: {example.regulation}</p>
                          <p className="text-xs text-white"><span className="font-semibold">Look for:</span> {example.whatToLook}</p>
                          <p className="text-xs text-orange-400"><span className="font-semibold">Assessor expects:</span> {example.assessorExpects}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Wiring and Cable Defects</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {detailedExamples.wiring.map((example, index) => (
                    <Card key={index} className="bg-transparent border-transparent">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-white text-base">{example.defect}</CardTitle>
                          <Badge className={`
                            ${example.code === 'C1' ? 'bg-red-600/40 text-red-300' : 
                              example.code === 'C2' ? 'bg-orange-600/40 text-orange-300' : 
                              example.code === 'C3' ? 'bg-elec-yellow/40 text-yellow-300' :
                              'bg-green-600/40 text-green-300'}
                          `}>
                            {example.code}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3 pt-0">
                        <p className="text-white text-sm">{example.description}</p>
                        <div className="space-y-2">
                          <p className="text-xs text-elec-yellow font-semibold">Regulation: {example.regulation}</p>
                          <p className="text-xs text-white"><span className="font-semibold">Look for:</span> {example.whatToLook}</p>
                          <p className="text-xs text-orange-400"><span className="font-semibold">Assessor expects:</span> {example.assessorExpects}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-elec-yellow mb-6 flex items-center gap-2">
              <XCircle className="h-6 w-6" />
              Common Student Mistakes
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {commonMistakes.map((mistake, index) => (
                <Card key={index} className="bg-gradient-to-br from-red-900/20 to-elec-gray border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-red-400 text-lg">{mistake.mistake}</CardTitle>
                    <p className="text-white text-sm">{mistake.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-orange-400 font-semibold text-sm mb-1">Impact:</h4>
                      <p className="text-white text-sm">{mistake.impact}</p>
                    </div>
                    <div>
                      <h4 className="text-green-400 font-semibold text-sm mb-1">Avoid by:</h4>
                      <p className="text-white text-sm">{mistake.avoidBy}</p>
                    </div>
                    <div className="bg-transparent/50 p-3 rounded-lg">
                      <h4 className="text-elec-yellow font-semibold text-sm mb-1">Example:</h4>
                      <p className="text-white text-sm italic">{mistake.example}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Environmental Factors */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-elec-yellow mb-6 flex items-center gap-2">
              <Building className="h-6 w-6" />
              Environmental Considerations
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {environmentalFactors.map((factor, index) => (
                <Card key={index} className="bg-transparent border-transparent">
                  <CardHeader>
                    <CardTitle className="text-cyan-400 text-lg">{factor.factor}</CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary" className="bg-cyan-600/20 text-cyan-300 text-xs">
                        {factor.regulations}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-2">Key Considerations:</h4>
                      <ul className="space-y-1">
                        {factor.considerations.map((consideration, cIndex) => (
                          <li key={cIndex} className="text-white text-sm flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">•</span>
                            {consideration}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-orange-400 font-semibold text-sm mb-1">Typical Locations:</h4>
                      <p className="text-white text-sm">{factor.locations}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Practical Scenarios */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-elec-yellow mb-6 flex items-center gap-2">
              <Users className="h-6 w-6" />
              Assessment Scenarios
            </h2>
            
            <div className="space-y-6">
              {practicalScenarios.map((scenario, index) => (
                <Card key={index} className="bg-transparent border-transparent">
                  <CardHeader>
                    <CardTitle className="text-purple-400 text-xl">{scenario.scenario}</CardTitle>
                    <p className="text-white">{scenario.setup}</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Key Points to Check
                        </h4>
                        <ul className="space-y-2">
                          {scenario.keyPoints.map((point, pointIndex) => (
                            <li key={pointIndex} className="text-white text-sm flex items-start gap-2">
                              <span className="text-green-400 mt-1">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-orange-400 mb-3 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Common Findings
                        </h4>
                        <ul className="space-y-2">
                          {scenario.commonFindings.map((finding, findingIndex) => (
                            <li key={findingIndex} className="text-white text-sm flex items-start gap-2">
                              <span className="text-orange-400 mt-1">•</span>
                              {finding}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Advanced Techniques */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-elec-yellow mb-6 flex items-center gap-2">
              <Target className="h-6 w-6" />
              Professional Techniques
            </h2>
            
            <div className="space-y-4">
              {advancedTechniques.map((technique, index) => (
                <Card key={index} className="bg-gradient-to-r from-elec-gray to-[#323232] border-elec-yellow/30">
                  <CardHeader>
                    <CardTitle className="text-elec-yellow text-lg">{technique.technique}</CardTitle>
                    <p className="text-white">{technique.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-white font-semibold mb-2">Application:</h4>
                      <ul className="space-y-1">
                        {technique.application.map((app, appIndex) => (
                          <li key={appIndex} className="text-white text-sm flex items-start gap-2">
                            <span className="text-elec-yellow mt-1">•</span>
                            {app}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-orange-900/20 p-3 rounded-lg border border-orange-500/20">
                      <h4 className="text-orange-400 font-semibold text-sm mb-1">What Assessors Look For:</h4>
                      <p className="text-white text-sm">{technique.assessorLooks}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default VisualInspectionGuide;