import { ArrowLeft, Eye, CheckCircle, Shield, Zap, TestTube, AlertTriangle, Settings, Play, Clock, BookOpen, Info, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import TypesOfTestingQuiz from '@/components/upskilling/TypesOfTestingQuiz';

const Module1Section4 = () => {
  const testTypes = [
    {
      title: "Visual Inspection",
      description: "The first step before any electrical testing. Identifies physical faults, poor workmanship, or missing components. Checks enclosures, terminations, labelling, IP ratings, and accessibility.",
      icon: Eye,
      color: "text-elec-yellow",
      details: "Must check for damaged equipment, correct IP ratings, proper labelling, and compliance with manufacturer instructions.",
      whenRequired: "Always performed first, before any live testing"
    },
    {
      title: "Continuity Testing",
      description: "Verifies that protective conductors (e.g., CPC) are properly connected. Essential for confirming fault paths exist for disconnection in a fault condition.",
      icon: CheckCircle,
      color: "text-green-400",
      details: "Tests protective conductor continuity, ring final circuit continuity, and correct polarity of accessories.",
      whenRequired: "Dead testing - performed with supply disconnected"
    },
    {
      title: "Insulation Resistance",
      description: "Ensures there's no unintentional connection between conductors or to earth. Helps detect damaged insulation or unsafe cable conditions.",
      icon: Shield,
      color: "text-purple-400",
      details: "Minimum values: 1MΩ for SELV/PELV circuits, 1MΩ for circuits up to 500V, 1MΩ for circuits above 500V.",
      whenRequired: "Dead testing - after continuity but before live tests"
    },
    {
      title: "Polarity Testing",
      description: "Confirms correct connection of line, neutral, and earth. Prevents reverse polarity which can be dangerous in certain devices.",
      icon: Zap,
      color: "text-elec-yellow",
      details: "Ensures line conductors are connected to fuses/MCBs, switches control line conductors, and accessories are correctly wired.",
      whenRequired: "Can be combined with continuity testing"
    },
    {
      title: "Earth Fault Loop Impedance (Zs & Ze)",
      description: "Confirms that fault current can flow quickly enough to trip protective devices. Low Zs = fast disconnection.",
      icon: TestTube,
      color: "text-red-400",
      details: "Ze is external earth fault loop impedance, Zs is total earth fault loop impedance. Values must not exceed those in BS7671 tables.",
      whenRequired: "Live testing - requires supply to be energised"
    },
    {
      title: "Prospective Fault Current (PSC/PEFC)",
      description: "Measures the highest current that could flow during a fault. Ensures protective devices are rated to handle it.",
      icon: AlertTriangle,
      color: "text-orange-400",
      details: "PSC = Prospective Short Circuit Current, PEFC = Prospective Earth Fault Current. Must not exceed device ratings.",
      whenRequired: "Live testing - measured at main intake and distribution points"
    },
    {
      title: "RCD Testing",
      description: "Checks residual current devices trip within required time and current levels. Ensures protection against electric shock and fire.",
      icon: Settings,
      color: "text-cyan-400",
      details: "Tests at 50% (should not trip), 100% (should trip within 300ms), and 5x rated current (should trip within 40ms).",
      whenRequired: "Live testing - performed on all RCD protected circuits"
    },
    {
      title: "Functional Testing",
      description: "Confirms correct operation of switches, controls, indicators, and interlocks. Often the final step before certification.",
      icon: Play,
      color: "text-indigo-400",
      details: "Tests all switchgear, control equipment, RCDs, emergency lighting, fire alarm systems, and safety systems.",
      whenRequired: "Final testing phase - after all other tests complete"
    }
  ];

  const testingSequence = [
    { step: 1, title: "Visual Inspection", description: "Always first - identify obvious defects before testing" },
    { step: 2, title: "Dead Testing", description: "Continuity, Insulation Resistance, Polarity (supply OFF)" },
    { step: 3, title: "Live Testing", description: "Earth Fault Loop, PSC/PEFC, RCD Testing (supply ON)" },
    { step: 4, title: "Functional Testing", description: "Test operation of all equipment and safety systems" }
  ];

  const safetyConsiderations = [
    "Always carry out visual inspection first to identify immediate dangers",
    "Ensure supply is properly isolated before dead testing",
    "Use appropriate test equipment calibrated within 12 months",
    "Follow safe isolation procedures including proving unit dead",
    "Never bypass safety devices during testing",
    "Be aware of sensitive electronic equipment that may be damaged by testing"
  ];

  const commonMistakes = [
    {
      mistake: "Skipping visual inspection",
      consequence: "Missing obvious safety hazards before testing begins",
      prevention: "Always start with thorough visual inspection"
    },
    {
      mistake: "Wrong testing sequence",
      consequence: "Risk of damage to equipment or false readings",
      prevention: "Follow BS7671 prescribed testing order"
    },
    {
      mistake: "Using uncalibrated equipment",
      consequence: "Inaccurate results and potential safety risks",
      prevention: "Ensure all test equipment is calibrated within 12 months"
    },
    {
      mistake: "Not proving instruments",
      consequence: "Risk of using faulty test equipment",
      prevention: "Always prove test instruments before and after use"
    }
  ];

  const learningOutcomes = [
    "List the main types of tests required under BS7671",
    "Understand the purpose of each test type",
    "Recognise the standard testing sequence",
    "Identify safety considerations for each test type",
    "Understand minimum acceptable values for key tests"
  ];

  const keyTakeaways = [
    "Visual inspection comes before any testing - it's mandatory",
    "BS7671 outlines a specific test sequence that must be followed",
    "Each test has a clear purpose and safety role in the verification process",
    "Dead tests are performed first, followed by live tests",
    "Skipping or misordering tests can lead to unsafe sign-off or equipment damage",
    "All test equipment must be calibrated and proven before use"
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../module-1">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-elec-yellow/40 text-elec-yellow border-0">
              Section 4
            </Badge>
            <Badge variant="secondary" className="bg-elec-yellow/40 text-blue-200 border-0">
              Essential Knowledge
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Types of Testing (Overview)
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            A comprehensive guide to the core tests involved in inspection and testing. Learn what each test checks, when to perform them, and how they ensure electrical safety.
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

          {/* Testing Sequence Overview */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-6 w-6 text-elec-yellow" />
                Testing Sequence Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-white mb-4">
                BS7671 prescribes a specific sequence for testing that must be followed to ensure safety and accuracy:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {testingSequence.map((phase, index) => (
                  <div key={index} className="bg-transparent/80 p-4 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center font-bold text-sm">
                        {phase.step}
                      </div>
                      <h3 className="text-white font-semibold text-sm">{phase.title}</h3>
                    </div>
                    <p className="text-white text-xs leading-relaxed">{phase.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Test Types */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-elec-yellow" />
                Detailed Test Types
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-white">
                Each test type serves a specific purpose in ensuring electrical safety and compliance with BS7671:
              </p>
              <div className="grid grid-cols-1 gap-6">
                {testTypes.map((test, index) => {
                  const IconComponent = test.icon;
                  return (
                    <div key={index} className="bg-transparent/80 p-6 rounded-lg border border-gray-700">
                      <div className="flex items-start gap-4">
                        <IconComponent className={`h-8 w-8 ${test.color} mt-1 flex-shrink-0`} />
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-lg mb-2">{index + 1}. {test.title}</h3>
                          <p className="text-white mb-3 leading-relaxed">{test.description}</p>
                          <div className="space-y-2">
                            <div className="bg-transparent p-3 rounded">
                              <p className="text-sm text-white mb-1"><strong className="text-white">Details:</strong></p>
                              <p className="text-sm text-white">{test.details}</p>
                            </div>
                            <div className="bg-transparent p-3 rounded">
                              <p className="text-sm text-white mb-1"><strong className="text-white">When Required:</strong></p>
                              <p className="text-sm text-white">{test.whenRequired}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Safety Considerations */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-red-400" />
                Safety Considerations
              </CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-white mb-4">
                Safety must be the primary consideration throughout all testing activities:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {safetyConsiderations.map((consideration, index) => (
                  <div key={index} className="bg-transparent/80 p-4 rounded-lg border border-red-700/30">
                    <p className="text-white text-sm flex items-start gap-2">
                      <span className="text-red-400 mt-1">⚠</span>
                      {consideration}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Common Mistakes */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-400" />
                Common Mistakes to Avoid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commonMistakes.map((item, index) => (
                  <div key={index} className="bg-transparent/80 p-4 rounded-lg border border-orange-700/30">
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <span className="text-orange-400">✗</span>
                      {item.mistake}
                    </h4>
                    <p className="text-red-300 text-sm mb-2">
                      <strong>Consequence:</strong> {item.consequence}
                    </p>
                    <p className="text-green-300 text-sm">
                      <strong>Prevention:</strong> {item.prevention}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* On-the-Job Scenario */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                🧰 Real-World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-transparent/80 p-6 rounded-lg border border-gray-700">
                <h4 className="text-white font-semibold mb-3">Scenario: New Office Installation Testing</h4>
                 <p className="text-white mb-4">
                  You arrive at a new office building to carry out initial verification testing on a recently completed electrical installation. The contractor mentions they've already done "some basic checks" and suggests you can skip the visual inspection to save time.
                </p>
                <div className="space-y-3">
                  <div className="bg-red-900/20 p-3 rounded border border-red-700/30">
                    <p className="text-red-300 text-sm">
                      <strong>Wrong Approach:</strong> Skipping visual inspection and going straight to electrical testing.
                    </p>
                  </div>
                  <div className="bg-green-900/20 p-3 rounded border border-green-700/30">
                    <p className="text-green-300 text-sm">
                      <strong>Correct Approach:</strong> Insist on conducting a thorough visual inspection first. This might reveal missing labels, incorrect IP ratings, or damaged equipment that could affect testing or pose safety risks.
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
                  <h4 className="text-white font-semibold mb-2">Check 1: Testing Sequence</h4>
                  <p className="text-sm">What must always come first in any testing procedure?</p>
                  <details className="mt-2">
                    <summary className="text-elec-yellow cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">Visual inspection - to identify obvious hazards before any electrical testing</p>
                  </details>
                </div>
                <div className="bg-green-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 2: Insulation Values</h4>
                  <p className="text-sm">What's the minimum insulation resistance for circuits up to 500V?</p>
                  <details className="mt-2">
                    <summary className="text-elec-yellow cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">1 MΩ (1 Megohm) minimum</p>
                  </details>
                </div>
                <div className="bg-purple-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 3: RCD Testing</h4>
                  <p className="text-sm">At what percentage of rated current should an RCD NOT trip?</p>
                  <details className="mt-2">
                    <summary className="text-elec-yellow cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">50% - this ensures the RCD isn't over-sensitive</p>
                  </details>
                </div>
                <div className="bg-orange-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 4: Dead vs Live Testing</h4>
                  <p className="text-sm">Which tests are performed with the supply disconnected?</p>
                  <details className="mt-2">
                    <summary className="text-elec-yellow cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">Continuity, Insulation Resistance, and Polarity (dead tests)</p>
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
                  <h4 className="text-white font-semibold mb-2">Q: Why can't I skip visual inspection if I'm only doing specific electrical tests?</h4>
                  <p className="text-sm text-white">A: Visual inspection is mandatory because it can reveal immediate dangers that electrical tests might miss, such as damaged enclosures, incorrect IP ratings, or unsafe installations that could harm you during testing.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: What happens if my insulation resistance readings are below 1MΩ?</h4>
                  <p className="text-sm text-white">A: Stop testing immediately and investigate. Low readings indicate potentially dangerous insulation breakdown. The fault must be found and rectified before any further testing or energising of the circuit.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Can I change the testing sequence if I think it would be more efficient?</h4>
                  <p className="text-sm text-white">A: No. BS 7671 prescribes the testing sequence for safety and accuracy reasons. Changing the order could damage equipment, give false readings, or create dangerous conditions.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: How often should I calibrate my test equipment?</h4>
                  <p className="text-sm text-white">A: Test instruments should be calibrated annually (within 12 months). Using uncalibrated equipment could give inaccurate results and potentially pass dangerous installations as safe.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: What's the difference between PSC and PEFC?</h4>
                  <p className="text-sm text-white">A: PSC (Prospective Short Circuit current) is the fault current between live conductors. PEFC (Prospective Earth Fault Current) is the fault current between a live conductor and earth. Both must be measured to ensure protective devices can handle the maximum fault currents.</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Q: Why must I prove my test instruments before and after use?</h4>
                  <p className="text-sm text-white">A: Proving instruments (testing on a known supply) ensures they're working correctly. A faulty instrument could show false 'safe' readings on a dangerous installation, or false 'dangerous' readings on a safe installation.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                🧠 Knowledge Check Quiz - 10 Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-4">
                Test your understanding of the different types of testing and their requirements with this comprehensive 10-question quiz covering all essential test types and procedures.
              </p>
              <TypesOfTestingQuiz />
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default Module1Section4;
