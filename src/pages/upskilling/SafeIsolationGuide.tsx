import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Zap, Lock, Eye, FileText, Clock, Target, BookOpen, XCircle, Users, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const SafeIsolationGuide = () => {
  const isolationSteps = [
    {
      step: 1,
      title: "Obtain Permission and Information",
      description: "Secure proper authorisation and gather essential information before beginning isolation",
      details: [
        "Obtain written permission to work from responsible person",
        "Ask permission to turn off/isolate the power supply",
        "Confirm timing and duration of power outage acceptable",
        "Identify all sources of supply to the circuit/equipment",
        "Check for any alternative supply routes or UPS systems",
        "Verify the scope of work and isolation requirements",
        "Confirm emergency procedures and key personnel contacts",
        "Check for any time constraints or restrictions",
        "Identify any critical processes that may be affected"
      ],
      safetyPoints: [
        "Never assume isolation without proper verification",
        "Ensure all personnel are aware of planned isolation",
        "Have emergency contact details readily available"
      ],
      assessorLooks: [
        "Professional approach to obtaining permissions",
        "Understanding of potential alternative supplies",
        "Recognition of emergency procedures"
      ]
    },
    {
      step: 2,
      title: "Identify the Circuit and Switching Points",
      description: "Locate and identify all switching and isolation points for the circuit",
      details: [
        "Trace the circuit from load back to source",
        "Identify main switch or isolator positions",
        "Locate all intermediate switching points",
        "Check circuit diagrams and as-built drawings",
        "Verify protective device locations and ratings",
        "Note any local isolation switches near equipment"
      ],
      safetyPoints: [
        "Never work on assumptions about circuit routes",
        "Always verify against documentation where available",
        "Be aware of borrowed neutrals and shared supplies"
      ],
      assessorLooks: [
        "Systematic approach to circuit identification",
        "Use of available documentation",
        "Understanding of circuit arrangements"
      ]
    },
    {
      step: 3,
      title: "Test Approved Voltage Indicator",
      description: "Verify the voltage indicator is functioning correctly before use",
      details: [
        "Check calibration certificate is current and valid",
        "Perform function test on known live supply",
        "Verify correct operation on proving unit",
        "Check indicator leads for damage or deterioration",
        "Ensure appropriate voltage range for circuit",
        "Test audible and visual indication functions"
      ],
      safetyPoints: [
        "Never use an untested voltage indicator",
        "Test immediately before and after each use",
        "Replace damaged leads or faulty equipment immediately"
      ],
      assessorLooks: [
        "Proper testing procedure followed",
        "Understanding of equipment limitations",
        "Recognition of safety-critical nature"
      ]
    },
    {
      step: 4,
      title: "Switch Off and Secure Isolation",
      description: "De-energise the circuit and prevent unauthorised re-energising",
      details: [
        "Switch off at the main isolator or protective device",
        "Lock off the isolation point with unique padlock",
        "Attach prohibition notice with details and signature",
        "Remove fuses where appropriate (store safely)",
        "Isolate at distribution board and local switches",
        "Inform all relevant personnel of isolation status"
      ],
      safetyPoints: [
        "Use only your own personal padlock and key",
        "Never remove someone else's lock or permit",
        "Ensure isolation point cannot be accidentally operated"
      ],
      assessorLooks: [
        "Correct locking procedure followed",
        "Proper use of permits and notices",
        "Understanding of lock-out tag-out principles"
      ]
    },
    {
      step: 5,
      title: "Test the Voltage Indicator Again",
      description: "Re-verify the voltage indicator is still functioning after isolation",
      details: [
        "Test on proving unit or known live supply",
        "Verify correct operation of all functions",
        "Check leads and connections are secure",
        "Confirm appropriate range settings",
        "Replace or repair if any malfunction detected",
        "Do not proceed if indicator fails to function"
      ],
      safetyPoints: [
        "This step is mandatory - never skip it",
        "Any malfunction means starting the process again",
        "Equipment failure indicates potential safety risk"
      ],
      assessorLooks: [
        "Adherence to testing requirements",
        "Recognition of critical safety step",
        "Proper response to equipment issues"
      ]
    },
    {
      step: 6,
      title: "Test for Absence of Voltage",
      description: "Verify the circuit is completely de-energised at all relevant points",
      details: [
        "Test between all line conductors at the point of work",
        "Test between each line conductor and earth",
        "Test between each line conductor and neutral",
        "Test at multiple points if circuit is extensive",
        "Check all cores in multi-core cables",
        "Verify complete absence of voltage indication"
      ],
      safetyPoints: [
        "Test at the actual point where work will be done",
        "Test all possible conductor combinations",
        "Any voltage reading means unsafe to proceed"
      ],
      assessorLooks: [
        "Comprehensive testing methodology",
        "Testing at appropriate locations",
        "Understanding of potential voltage sources"
      ]
    },
    {
      step: 7,
      title: "Test the Voltage Indicator Once More",
      description: "Final verification that the voltage indicator remains functional",
      details: [
        "Third and final test on proving unit",
        "Confirm all functions operate correctly",
        "Verify continuity of test leads",
        "Check battery condition if applicable",
        "Ensure no damage occurred during testing",
        "Store equipment safely for duration of work"
      ],
      safetyPoints: [
        "Third test confirms equipment integrity throughout",
        "Equipment must function correctly before work begins",
        "Any failure requires complete restart of process"
      ],
      assessorLooks: [
        "Consistent testing procedure",
        "Understanding of equipment reliability needs",
        "Professional approach to safety verification"
      ]
    },
    {
      step: 8,
      title: "Apply Temporary Earth if Required",
      description: "Install temporary earthing where necessary for additional safety",
      details: [
        "Assess need for temporary earthing arrangements",
        "Apply earth at point of work if required",
        "Use proper earthing equipment and connections",
        "Ensure adequate current-carrying capacity",
        "Label temporary earth connections clearly",
        "Maintain earthing throughout work duration"
      ],
      safetyPoints: [
        "Required for some high voltage or complex systems",
        "Never assume existing earthing is adequate",
        "Temporary earth must be first on, last off"
      ],
      assessorLooks: [
        "Understanding of when earthing is required",
        "Proper earthing techniques and equipment",
        "Recognition of additional safety measures"
      ]
    }
  ];

  const equipmentRequirements = [
    {
      equipment: "Approved Voltage Indicator",
      specifications: [
        "Calibrated within last 12 months",
        "Appropriate voltage range for circuit",
        "Current calibration certificate",
        "Undamaged test leads and probes",
        "Audible and visual indication",
        "Battery condition indicator if applicable"
      ],
      regulations: "GS38, BS 7671 Section 612.1"
    },
    {
      equipment: "Proving Unit or Known Live Supply",
      specifications: [
        "Voltage output matching test range",
        "Portable and easily accessible",
        "Current calibration if required",
        "Clear voltage indication",
        "Safe connection points",
        "Appropriate for test equipment"
      ],
      regulations: "GS38, HSE Guidance"
    },
    {
      equipment: "Personal Padlocks and Keys",
      specifications: [
        "Unique to individual user only",
        "Suitable for electrical isolation points",
        "Durable and tamper-resistant",
        "Clearly identified to user",
        "Multiple locks if multiple points",
        "Spare keys securely stored"
      ],
      regulations: "HSE LOTO Procedures"
    },
    {
      equipment: "Prohibition Notices and Tags",
      specifications: [
        "Pre-printed standard format",
        "Space for date, time, signature",
        "Clear prohibition message",
        "Weather-resistant if outdoor use",
        "Secure attachment method",
        "Contact details for permit holder"
      ],
      regulations: "Company procedures, HSE guidance"
    }
  ];

  const commonErrors = [
    {
      error: "Incorrect Testing Sequence",
      description: "Not following the prove-test-prove sequence correctly",
      consequences: [
        "Working on live circuits unknowingly",
        "Equipment failure not detected",
        "Serious injury or fatality risk"
      ],
      prevention: "Always follow: Prove → Test → Prove sequence religiously",
      assessorResponse: "Immediate failure of assessment"
    },
    {
      error: "Inadequate Circuit Identification", 
      description: "Failing to identify all supply sources to equipment",
      consequences: [
        "Alternative supplies remain energised",
        "Incomplete isolation achieved",
        "Risk of electric shock during work"
      ],
      prevention: "Thorough investigation of all potential supplies",
      assessorResponse: "Major deduction for safety awareness"
    },
    {
      error: "Using Faulty Test Equipment",
      description: "Proceeding with malfunctioning voltage indicators",
      consequences: [
        "False sense of security",
        "Live circuits appear dead",
        "Potentially fatal consequences"
      ],
      prevention: "Rigorous equipment testing and replacement",
      assessorResponse: "Assessment terminated for safety"
    },
    {
      error: "Poor Lock-Out Procedures",
      description: "Inadequate securing of isolation points",
      consequences: [
        "Accidental re-energising possible",
        "Unauthorised interference with isolation",
        "Risk during work activities"
      ],
      prevention: "Proper padlocks, tags, and communication",
      assessorResponse: "Significant marks deduction"
    }
  ];

  const regulatoryContext = [
    {
      regulation: "Health and Safety at Work Act 1974",
      requirements: [
        "Duty of care to ensure safe working conditions",
        "Provision of safe systems of work",
        "Training and competency requirements",
        "Risk assessment and control measures"
      ]
    },
    {
      regulation: "Electricity at Work Regulations 1989",
      requirements: [
        "Regulation 4: Systems to be constructed to prevent danger",
        "Regulation 12: Means for cutting off supply and isolation",
        "Regulation 13: Precautions for working on dead equipment",
        "Regulation 14: Work on or near live conductors"
      ]
    },
    {
      regulation: "BS 7671:2018 Chapter 53",
      requirements: [
        "Selection and erection of switchgear",
        "Isolation and switching requirements",
        "Emergency switching provisions",
        "Functional switching arrangements"
      ]
    }
  ];

  const assessmentScenarios = [
    {
      scenario: "Domestic Consumer Unit Work",
      setup: "Replacing MCB in domestic split-load consumer unit",
      challenges: [
        "Multiple RCD protection arrangements",
        "Shared neutral connections",
        "Limited working space",
        "Household disruption considerations"
      ],
      keyPoints: [
        "Isolate at main switch position",
        "Test all incoming and outgoing connections",
        "Consider effect on other circuits",
        "Plan work to minimise disruption"
      ]
    },
    {
      scenario: "Industrial Distribution Board",
      setup: "Maintenance work on 3-phase distribution board",
      challenges: [
        "Multiple supply sources possible",
        "High fault current levels",
        "Business continuity requirements",
        "Complex earthing arrangements"
      ],
      keyPoints: [
        "Identify all supply sources",
        "Coordinate with operations team",
        "Test all phases and neutral",
        "Consider temporary supplies if needed"
      ]
    },
    {
      scenario: "Socket Outlet Replacement",
      setup: "Replacing damaged socket outlet in office environment",
      challenges: [
        "Ring final circuit arrangements",
        "Possible spur connections",
        "Shared circuits with other outlets",
        "Minimal disruption requirements"
      ],
      keyPoints: [
        "Identify circuit at distribution board",
        "Test at socket location",
        "Consider ring final implications",
        "Verify isolation effectiveness"
      ]
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-sm px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Link to="module-8/section-3">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md min-h-[48px] touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Practical Assessment
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-elec-yellow" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Safe Isolation Procedures
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Comprehensive guide to safe isolation procedures for electrical work - the foundation of electrical safety
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Critical Safety Warning */}
          <Card className="bg-gradient-to-r from-red-900/30 to-elec-gray border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2 text-xl">
                <AlertTriangle className="h-6 w-6" />
                Critical Safety Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white">
                Safe isolation is the most critical safety procedure in electrical work. Failure to follow correct procedures 
                can result in serious injury or death. The prove-test-prove sequence is mandatory and must never be compromised.
              </p>
              <div className="bg-red-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-red-300 mb-2">Remember: Dead circuits can kill</h4>
                <p className="text-red-200 text-sm">
                  Always assume circuits are live until proven dead using proper testing procedures. 
                  Never rely on switches, indicators, or assumptions about circuit status.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Step-by-Step Procedure */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-elec-yellow mb-6 flex items-center gap-2">
              <Lock className="h-6 w-6" />
              The 8-Step Safe Isolation Procedure
            </h2>
            
            {isolationSteps.map((step) => (
              <Card key={step.step} className="bg-transparent border-transparent hover:border-elec-yellow/30 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Badge className="bg-elec-yellow text-black font-bold px-3 py-1 text-sm min-w-[60px]">
                      Step {step.step}
                    </Badge>
                    <div className="flex-1">
                      <CardTitle className="text-white text-xl">{step.title}</CardTitle>
                      <p className="text-white mt-2">{step.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Procedure Details
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
                      <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Safety Points
                      </h4>
                      <ul className="space-y-2">
                        {step.safetyPoints.map((point, index) => (
                          <li key={index} className="text-white text-sm flex items-start gap-2">
                            <span className="text-red-400 mt-1">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-orange-400 mb-3 flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Assessment Focus
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

          {/* Equipment Requirements */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-elec-yellow mb-6 flex items-center gap-2">
              <Activity className="h-6 w-6" />
              Essential Equipment Requirements
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {equipmentRequirements.map((equipment, index) => (
                <Card key={index} className="bg-transparent border-transparent">
                  <CardHeader>
                    <CardTitle className="text-cyan-400 text-lg">{equipment.equipment}</CardTitle>
                    <Badge variant="secondary" className="bg-cyan-600/20 text-cyan-300 text-xs w-fit">
                      {equipment.regulations}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {equipment.specifications.map((spec, specIndex) => (
                        <li key={specIndex} className="text-white text-sm flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Common Errors */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-elec-yellow mb-6 flex items-center gap-2">
              <XCircle className="h-6 w-6" />
              Critical Errors and Consequences
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {commonErrors.map((error, index) => (
                <Card key={index} className="bg-gradient-to-br from-red-900/20 to-elec-gray border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-red-400 text-lg">{error.error}</CardTitle>
                    <p className="text-white text-sm">{error.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-orange-400 font-semibold text-sm mb-2">Consequences:</h4>
                      <ul className="space-y-1">
                        {error.consequences.map((consequence, cIndex) => (
                          <li key={cIndex} className="text-white text-sm flex items-start gap-2">
                            <span className="text-red-400 mt-1">•</span>
                            {consequence}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-green-400 font-semibold text-sm mb-1">Prevention:</h4>
                      <p className="text-white text-sm">{error.prevention}</p>
                    </div>
                    <div className="bg-red-900/30 p-3 rounded-lg border border-red-500/30">
                      <h4 className="text-red-300 font-semibold text-sm mb-1">Assessor Response:</h4>
                      <p className="text-red-200 text-sm">{error.assessorResponse}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Regulatory Context */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-elec-yellow mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Legal and Regulatory Framework
            </h2>
            
            <div className="space-y-4">
              {regulatoryContext.map((reg, index) => (
                <Card key={index} className="bg-transparent border-elec-yellow/30">
                  <CardHeader>
                    <CardTitle className="text-elec-yellow text-lg">{reg.regulation}</CardTitle>
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

          {/* Assessment Scenarios */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-elec-yellow mb-6 flex items-center gap-2">
              <Users className="h-6 w-6" />
              Practical Assessment Scenarios
            </h2>
            
            <div className="space-y-6">
              {assessmentScenarios.map((scenario, index) => (
                <Card key={index} className="bg-transparent border-transparent">
                  <CardHeader>
                    <CardTitle className="text-purple-400 text-xl">{scenario.scenario}</CardTitle>
                    <p className="text-white">{scenario.setup}</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-orange-400 mb-3 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Assessment Challenges
                        </h4>
                        <ul className="space-y-2">
                          {scenario.challenges.map((challenge, challengeIndex) => (
                            <li key={challengeIndex} className="text-white text-sm flex items-start gap-2">
                              <span className="text-orange-400 mt-1">•</span>
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Key Success Points
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Final Assessment Reminder */}
          <Card className="bg-gradient-to-r from-green-900/20 to-elec-gray border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2 text-xl">
                <Shield className="h-6 w-6" />
                Assessment Success Checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Before Starting</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Calibrated voltage indicator ready
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Personal padlocks and prohibition notices
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Permission obtained and documented
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Circuit identification completed
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">During Procedure</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Prove-Test-Prove sequence followed exactly
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      All conductor combinations tested
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Isolation properly secured and labeled
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Safety-first mindset demonstrated throughout
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default SafeIsolationGuide;