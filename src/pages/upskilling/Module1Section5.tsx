
import { ArrowLeft, Shield, Users, BookOpen, AlertTriangle, CheckCircle, Scale, UserCheck, Clock, Target, Info, GraduationCap, FileText, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import ResponsibilityCompetencyQuiz from '@/components/upskilling/ResponsibilityCompetencyQuiz';

const Module1Section5 = () => {
  const competencyComponents = [
    {
      title: "Technical Skills",
      description: "Practical ability to perform tests correctly and safely using appropriate equipment",
      icon: CheckCircle,
      color: "text-green-400",
      examples: [
        "Correct use of test instruments",
        "Understanding of test procedures",
        "Safe isolation techniques",
        "Proper connection methods"
      ]
    },
    {
      title: "Knowledge",
      description: "Understanding of electrical principles, regulations, and safety requirements",
      icon: BookOpen,
      color: "text-elec-yellow",
      examples: [
        "BS7671 requirements",
        "Electrical theory",
        "Safety procedures",
        "Legal obligations"
      ]
    },
    {
      title: "Experience",
      description: "Practical exposure to different installations and testing scenarios",
      icon: Clock,
      color: "text-purple-400",
      examples: [
        "Various installation types",
        "Different fault conditions",
        "Complex testing scenarios",
        "Problem-solving situations"
      ]
    },
    {
      title: "Understanding",
      description: "Ability to interpret results, recognise problems, and make informed decisions",
      icon: Eye,
      color: "text-elec-yellow",
      examples: [
        "Result interpretation",
        "Risk assessment",
        "Decision making",
        "Problem identification"
      ]
    }
  ];

  const legalRequirements = [
    {
      regulation: "Electricity at Work Regulations 1989",
      requirement: "Only competent persons may work on electrical systems",
      penalties: ["Unlimited fines", "Up to 6 months imprisonment", "Corporate liability"],
      keyPoint: "Regulation 16 specifically requires competent persons for electrical work"
    },
    {
      regulation: "Health and Safety at Work Act 1974",
      requirement: "Duty of care to ensure safety of self and others",
      penalties: ["Unlimited fines", "Up to 2 years imprisonment", "Director disqualification"],
      keyPoint: "Creates general duty for workplace safety including electrical work"
    },
    {
      regulation: "Building Regulations Part P",
      requirement: "Competent person schemes for notifiable electrical work",
      penalties: ["Local authority action", "Remedial work orders", "Prosecution"],
      keyPoint: "Requires competency for domestic electrical installations"
    }
  ];

  const competencyDemonstration = [
    {
      method: "Recognised Qualifications",
      examples: [
        "City & Guilds 2391-50/2391-52 (Inspection and Testing)",
        "City & Guilds 2392-10 (Fundamental Inspection and Testing)",
        "EAL 600/1562/6 (Inspection and Testing)",
        "NAPIT/NICEIC assessment schemes"
      ],
      importance: "Provides structured learning and assessment of competency"
    },
    {
      method: "Practical Experience",
      examples: [
        "Supervised work under competent persons",
        "Gradually increasing complexity of tasks",
        "Experience across different installation types",
        "Fault-finding and problem-solving experience"
      ],
      importance: "Develops real-world application skills and judgement"
    },
    {
      method: "Continuing Professional Development",
      examples: [
        "Regular updates on BS7671 amendments",
        "New technology training",
        "Safety procedure updates",
        "Industry best practice seminars"
      ],
      importance: "Maintains currency with evolving standards and technology"
    },
    {
      method: "Professional Membership",
      examples: [
        "NICEIC Approved Contractor/Domestic Installer",
        "NAPIT Member",
        "ECA Membership",
        "SELECT (Scotland) Membership"
      ],
      importance: "Provides ongoing assessment and professional accountability"
    }
  ];

  const responsibilities = [
    {
      area: "Technical Responsibility",
      description: "Ensuring all tests are performed correctly and results are accurate",
      obligations: [
        "Use calibrated test equipment within validity period",
        "Follow correct test sequences as per BS7671",
        "Record accurate measurements and observations",
        "Identify and report all defects and limitations"
      ]
    },
    {
      area: "Legal Responsibility",
      description: "Compliance with statutory requirements and professional standards",
      obligations: [
        "Only work within proven competency levels",
        "Ensure certificates reflect actual installation condition",
        "Maintain records and documentation requirements",
        "Report dangerous conditions to relevant authorities"
      ]
    },
    {
      area: "Professional Responsibility",
      description: "Upholding professional standards and ethical conduct",
      obligations: [
        "Honest reporting of findings",
        "Transparent communication with clients",
        "Maintain professional insurance coverage",
        "Respect client confidentiality and property"
      ]
    },
    {
      area: "Safety Responsibility",
      description: "Protecting self, colleagues, and the public from electrical hazards",
      obligations: [
        "Follow safe isolation procedures",
        "Use appropriate PPE and safety equipment",
        "Identify and mitigate testing risks",
        "Emergency procedures and first aid awareness"
      ]
    }
  ];

  const competencyLimitations = [
    {
      scenario: "Unfamiliar Installation Type",
      description: "Encountering a system or technology you haven't worked with before",
      risks: ["Incorrect test procedures", "Safety hazards", "Invalid certification"],
      correctAction: "Seek training or supervision before proceeding"
    },
    {
      scenario: "Complex Fault Conditions",
      description: "Finding faults or conditions beyond your experience level",
      risks: ["Misdiagnosis", "Unsafe recommendations", "Inadequate remedial action"],
      correctAction: "Consult with more experienced colleagues or specialists"
    },
    {
      scenario: "Specialised Equipment",
      description: "Systems requiring specific manufacturer training or certification",
      risks: ["Equipment damage", "Warranty invalidation", "Safety breaches"],
      correctAction: "Obtain proper training or refer to qualified specialists"
    },
    {
      scenario: "Time or Commercial Pressure",
      description: "Pressure to complete work quickly or cut corners",
      risks: ["Rushed testing", "Missed defects", "Legal liability"],
      correctAction: "Maintain professional standards regardless of pressure"
    }
  ];

  const learningOutcomes = [
    "Define competency in the context of electrical inspection and testing",
    "Understand legal requirements under EAWR 1989 and related legislation",
    "Recognise your personal and professional responsibilities",
    "Identify methods for demonstrating and maintaining competency",
    "Understand the consequences of working outside competency limits",
    "Apply competency principles to real-world scenarios"
  ];

  const keyTakeaways = [
    "Competency requires skills, knowledge, experience, AND understanding - not just qualifications",
    "Legal responsibility lies with the person who signs the certificate or report",
    "EAWR 1989 requires only competent persons to work on electrical systems",
    "You cannot rely on others' work - you must personally verify what you certify",
    "Working outside competency limits creates serious legal and safety risks",
    "Competency must be maintained through ongoing learning and development",
    "Professional integrity requires honest reporting regardless of commercial pressures"
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="/study-centre/upskilling/inspection-testing-module-1">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-elec-yellow/40 text-elec-yellow border-0">
              Section 5
            </Badge>
            <Badge variant="secondary" className="bg-red-600/40 text-red-200 border-0">
              Critical Knowledge
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Responsibilities & Competency
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Understanding who can perform inspection and testing, what competency means in practice, and where legal and professional accountability lies.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Learning Outcomes */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-elec-yellow" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-4">By the end of this section, you'll be able to:</p>
              <ul className="space-y-2">
                {learningOutcomes.map((outcome, index) => (
                  <li key={index} className="text-white flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* What Is Competency */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <UserCheck className="h-6 w-6 text-elec-yellow" />
                What Is Competency?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-white leading-relaxed">
                Competency in electrical inspection and testing is not simply about holding a qualification. It's a combination of four essential elements that work together to ensure safe and effective practice:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {competencyComponents.map((component, index) => {
                  const IconComponent = component.icon;
                  return (
                    <div key={index} className="bg-transparent/80 p-6 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-3 mb-4">
                        <IconComponent className={`h-6 w-6 ${component.color}`} />
                        <h3 className="text-white font-semibold text-lg">{component.title}</h3>
                      </div>
                      <p className="text-white mb-4 text-sm leading-relaxed">{component.description}</p>
                      <div className="space-y-2">
                        <p className="text-white font-medium text-sm">Examples:</p>
                        <ul className="space-y-1">
                          {component.examples.map((example, exIndex) => (
                            <li key={exIndex} className="text-white text-sm flex items-start gap-2">
                              <span className="text-elec-yellow mt-1 text-xs">•</span>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700/30">
                <p className="text-blue-200 text-sm">
                  <strong>Key Point:</strong> Competency develops over time through education, training, and supervised experience. It's not achieved overnight and must be maintained throughout your career.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Legal Requirements */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Scale className="h-6 w-6 text-red-400" />
                Legal Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-white leading-relaxed">
                UK law is very clear about competency requirements for electrical work. The legal framework creates serious obligations and potential consequences:
              </p>
              
              <div className="space-y-6">
                {legalRequirements.map((req, index) => (
                  <div key={index} className="bg-transparent/80 p-6 rounded-lg border border-red-700/30">
                    <h3 className="text-white font-semibold text-lg mb-3">{req.regulation}</h3>
                    <p className="text-white mb-4">{req.requirement}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-red-300 font-medium mb-2">Potential Penalties:</p>
                        <ul className="space-y-1">
                          {req.penalties.map((penalty, pIndex) => (
                            <li key={pIndex} className="text-red-200 text-sm flex items-start gap-2">
                              <span className="text-red-400 mt-1">⚠</span>
                              {penalty}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-blue-300 font-medium mb-2">Key Point:</p>
                        <p className="text-blue-200 text-sm">{req.keyPoint}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Demonstrating Competency */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-purple-400" />
                Demonstrating Competency
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-white leading-relaxed">
                Competency can be demonstrated through various means, typically requiring a combination of formal qualifications, practical experience, and ongoing development:
              </p>
              
              <div className="space-y-6">
                {competencyDemonstration.map((method, index) => (
                  <div key={index} className="bg-transparent/80 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-white font-semibold text-lg mb-3">{method.method}</h3>
                    <p className="text-purple-200 text-sm mb-4 italic">{method.importance}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {method.examples.map((example, exIndex) => (
                        <div key={exIndex} className="bg-transparent p-3 rounded">
                          <p className="text-white text-sm flex items-start gap-2">
                            <span className="text-purple-400 mt-1">•</span>
                            {example}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Professional Responsibilities */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-400" />
                Professional Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-white leading-relaxed">
                As a competent person carrying out inspection and testing, you have multiple layers of responsibility:
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {responsibilities.map((resp, index) => (
                  <div key={index} className="bg-transparent/80 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-white font-semibold text-lg mb-3">{resp.area}</h3>
                    <p className="text-white text-sm mb-4">{resp.description}</p>
                    
                    <div className="space-y-2">
                      <p className="text-green-300 font-medium text-sm">Key Obligations:</p>
                      <ul className="space-y-2">
                        {resp.obligations.map((obligation, obIndex) => (
                          <li key={obIndex} className="text-white text-sm flex items-start gap-2">
                            <span className="text-green-400 mt-1 text-xs">•</span>
                            {obligation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Working Within Competency Limits */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-400" />
                Working Within Your Competency Limits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-white leading-relaxed">
                Recognising and respecting the limits of your competency is crucial for safety and legal compliance. Here are common scenarios where competency limits may be reached:
              </p>
              
              <div className="space-y-6">
                {competencyLimitations.map((limitation, index) => (
                  <div key={index} className="bg-transparent/80 p-6 rounded-lg border border-orange-700/30">
                    <h3 className="text-white font-semibold text-lg mb-3">{limitation.scenario}</h3>
                    <p className="text-white mb-4">{limitation.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-red-300 font-medium mb-2">Potential Risks:</p>
                        <ul className="space-y-1">
                          {limitation.risks.map((risk, rIndex) => (
                            <li key={rIndex} className="text-red-200 text-sm flex items-start gap-2">
                              <span className="text-red-400 mt-1">⚠</span>
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-green-300 font-medium mb-2">Correct Action:</p>
                        <p className="text-green-200 text-sm">{limitation.correctAction}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-red-900/20 p-4 rounded-lg border border-red-700/30">
                <p className="text-red-200 text-sm">
                  <strong>Critical Warning:</strong> Never sign off or certify work that you haven't personally verified or that exceeds your competency level. The legal and professional consequences can be severe.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Scenario */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-cyan-400" />
                Real-World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-transparent/80 p-6 rounded-lg border border-gray-700">
                <h4 className="text-white font-semibold mb-3">Scenario: EICR Sign-off Responsibility</h4>
                <p className="text-white mb-4">
                  A junior electrician with basic qualifications is asked to complete an EICR (Electrical Installation Condition Report) independently. 
                  Their supervisor reviews the paperwork quickly and tells them to sign it off. Later, a fault in the installation causes a fire, 
                  and investigations reveal several defects that should have been identified during the inspection.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-red-900/20 p-4 rounded border border-red-700/30">
                    <p className="text-red-300 text-sm mb-2"><strong>Question:</strong> Who is legally liable for the missed defects?</p>
                    <p className="text-red-200 text-sm">
                      <strong>Answer:</strong> The person who signed the EICR certificate is legally liable. The supervisor's verbal approval 
                      provides no legal protection. Only the competent person who certifies the work bears legal responsibility.
                    </p>
                  </div>
                  
                  <div className="bg-green-900/20 p-4 rounded border border-green-700/30">
                    <p className="text-green-300 text-sm mb-2"><strong>Correct Approach:</strong></p>
                    <p className="text-green-200 text-sm">
                      The junior electrician should have either: (1) refused to sign the certificate and requested supervision throughout the inspection, 
                      or (2) obtained proper training and competency assessment before taking on independent EICR responsibilities.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Takeaways */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Info className="h-6 w-6 text-elec-yellow" />
                Key Takeaways
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="text-white flex items-start gap-3">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span className="leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Quick Knowledge Checks */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-elec-yellow" />
                Quick Knowledge Checks
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-elec-yellow/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 1: EAWR Competency</h4>
                  <p className="text-sm">Which regulation in EAWR 1989 requires competent persons?</p>
                  <details className="mt-2">
                    <summary className="text-elec-yellow cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">Regulation 16 - requires technical knowledge and experience</p>
                  </details>
                </div>
                <div className="bg-green-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 2: Four Elements</h4>
                  <p className="text-sm">What are the four elements of competency?</p>
                  <details className="mt-2">
                    <summary className="text-elec-yellow cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">Skills, Knowledge, Experience, and Understanding</p>
                  </details>
                </div>
                <div className="bg-purple-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 3: Legal Responsibility</h4>
                  <p className="text-sm">Who is legally responsible when you sign a certificate?</p>
                  <details className="mt-2">
                    <summary className="text-elec-yellow cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">You are - the person who signs takes full legal responsibility</p>
                  </details>
                </div>
                <div className="bg-orange-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 4: Professional Bodies</h4>
                  <p className="text-sm">Name two competent person scheme operators.</p>
                  <details className="mt-2">
                    <summary className="text-elec-yellow cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">NICEIC, NAPIT, Stroma, BSI, Benchmark (any two)</p>
                  </details>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Frequently Asked Questions */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-elec-yellow" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="space-y-4">
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Is a qualification enough to prove competency?</h4>
                  <p className="text-sm text-white">A: No. While qualifications are important, competency requires the combination of skills, knowledge, experience, and understanding. A qualification alone doesn't prove you can safely carry out the work in practice.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Can I rely on someone else's testing if I sign the certificate?</h4>
                  <p className="text-sm text-white">A: No. When you sign a certificate, you are legally stating that you have personally verified the work. You cannot delegate this responsibility or rely on others' assurances without personal verification.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: What happens if I work outside my competency level?</h4>
                  <p className="text-sm text-white">A: This creates serious legal and safety risks including potential prosecution, imprisonment, unlimited fines, professional sanctions, and most importantly, could endanger lives. Always work within your proven competency limits.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: How do I demonstrate competency to employers or clients?</h4>
                  <p className="text-sm text-white">A: Through recognised qualifications (like C&G 2391), practical experience records, professional membership, ongoing CPD, insurance cover, and references from previous work demonstrating competency in similar installations.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Do I need to be registered with a scheme to do electrical work?</h4>
                  <p className="text-sm text-white">A: For domestic notifiable work under Part P, yes, unless you notify Building Control separately. For other work, scheme registration isn't legally required but provides professional support and demonstrates ongoing competency assessment.</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Q: How often should I update my competency?</h4>
                  <p className="text-sm text-white">A: Competency should be maintained continuously through ongoing learning, especially when regulations change (like BS 7671 amendments), new technologies emerge, or when expanding into unfamiliar work areas.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Scenario */}
          <Card className="bg-elec-yellow/10 border-blue-600/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="h-6 w-6 text-elec-yellow" />
                Real-World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-elec-yellow/20 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Scenario: Pressure to Cut Corners</h4>
                <p className="text-sm mb-3">
                  You're asked to certify an installation where the contractor claims "everything was tested properly" but you haven't personally verified the work. The client is pushing for quick completion, and the contractor says "just sign it - I'll take responsibility."
                </p>
                <h5 className="text-white font-semibold mb-2">Critical Considerations:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Your signature means YOU take full legal responsibility</li>
                  <li>• EAWR 1989 requires personal competency verification</li>
                  <li>• Commercial pressure never justifies compromising safety</li>
                  <li>• Contractor's assurances have no legal standing on your certificate</li>
                  <li>• Insurance may not cover work you haven't personally verified</li>
                </ul>
                <div className="mt-3 p-3 bg-elec-yellow/20 rounded">
                  <p className="text-xs"><strong>Correct Action:</strong> Refuse to sign without personal verification. Explain your legal obligations and offer to carry out proper inspection and testing. Professional integrity is non-negotiable.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-6 w-6 text-cyan-400" />
                Knowledge Check Quiz - 10 Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-4">
                Test your understanding of responsibilities and competency requirements in electrical inspection and testing with this comprehensive 10-question quiz:
              </p>
              <ResponsibilityCompetencyQuiz />
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default Module1Section5;
