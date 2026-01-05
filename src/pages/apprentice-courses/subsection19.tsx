import { ArrowLeft, Shield, CheckCircle, AlertTriangle, Zap, Lock, FileCheck, Wrench, TestTube, Tag, BookOpen, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Equipment Required for Isolation - Section 5.2 | Level 2 Electrical Course";
const DESCRIPTION = "Essential tools and equipment for safe electrical isolation procedures including lock-off kits, voltage testers, and proving units.";

const Section5_2 = () => {
  useSEO(TITLE, DESCRIPTION);
  const quizQuestions = [
    {
      id: 1,
      question: "What tool is used to check that a voltage tester is working?",
      options: [
        "Multimeter",
        "Proving unit",
        "Oscilloscope",
        "Clamp meter"
      ],
      correctAnswer: 1,
      explanation: "A proving unit is a battery-powered device that provides a known voltage to test that your voltage tester is working before and after use."
    },
    {
      id: 2,
      question: "Why are multimeters not suitable for proving dead?",
      options: [
        "They are too expensive",
        "They don't meet GS38 standards for safety",
        "They are too complicated to use",
        "They are not accurate enough"
      ],
      correctAnswer: 1,
      explanation: "Multimeters don't meet GS38 safety standards for proving dead circuits. They have exposed metal parts and aren't designed for this safety-critical task."
    },
    {
      id: 3,
      question: "What does a lock-off device prevent?",
      options: [
        "Theft of equipment",
        "Accidental re-energising of circuits",
        "Moisture ingress",
        "Electromagnetic interference"
      ],
      correctAnswer: 1,
      explanation: "Lock-off devices prevent others from accidentally switching circuits back on while work is in progress, preventing serious injury or death."
    },
    {
      id: 4,
      question: "What standard should your voltage tester meet?",
      options: [
        "BS 7671",
        "GS38",
        "IEC 60364",
        "BS EN 61010"
      ],
      correctAnswer: 1,
      explanation: "GS38 is the UK standard for electrical test equipment safety, ensuring probes have insulated leads and meet safety requirements for proving dead."
    },
    {
      id: 5,
      question: "True or False: You must test your tester both before and after use.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "True. You must test your voltage tester on a proving unit both before and after testing to ensure it's working correctly throughout the process."
    },
    {
      id: 6,
      question: "What is the maximum exposed metal tip allowed on GS38 test probes?",
      options: [
        "2mm",
        "4mm",
        "6mm",
        "8mm"
      ],
      correctAnswer: 1,
      explanation: "GS38 requires a maximum of 4mm exposed metal at the probe tip to reduce the risk of accidental contact with live parts."
    },
    {
      id: 7,
      question: "When should you replace your proving unit?",
      options: [
        "Only when it stops working completely",
        "Every 6 months regardless of condition",
        "When the battery is low or it fails to provide accurate voltage",
        "Only after 5 years of use"
      ],
      correctAnswer: 2,
      explanation: "Replace proving units when the battery is low, it fails calibration, or doesn't provide accurate known voltage - reliability is critical for safety."
    },
    {
      id: 8,
      question: "What should you do if your lock-off device doesn't fit the isolator?",
      options: [
        "Use tape to secure the switch",
        "Leave a warning note only",
        "Find the correct lock-off device for that isolator type",
        "Ask someone else to watch the switch"
      ],
      correctAnswer: 2,
      explanation: "Always use the correct lock-off device for each isolator type. Improvised solutions like tape are not acceptable for safety-critical isolation."
    },
    {
      id: 9,
      question: "How often should isolation equipment be visually inspected?",
      options: [
        "Once a year",
        "Before each use",
        "Once a month",
        "Only when it appears damaged"
      ],
      correctAnswer: 1,
      explanation: "Visual inspection before each use is essential - check for damaged leads, cracked insulation, bent probes, and secure connections every time."
    },
    {
      id: 10,
      question: "What information should be included on isolation warning tags?",
      options: [
        "Just 'Do Not Switch On'",
        "Name, date, and nature of work only",
        "Name, date, time, nature of work, and contact details",
        "Company name only"
      ],
      correctAnswer: 2,
      explanation: "Complete isolation tags should include the electrician's name, date, time, nature of work, and contact details for emergencies or questions."
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
              Back to Section 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="h-8 w-8 text-emerald-400" />
            <div>
              <span className="inline-block bg-emerald-500 text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 5.2
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Equipment Required for Isolation
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mt-2">
                Essential tools and equipment for safe isolation procedures
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
                <li><strong>Lock-off kit:</strong> Prevents accidental re-energising during work.</li>
                <li><strong>Voltage tester:</strong> GS38-compliant device to prove circuits dead.</li>
                <li><strong>Proving unit:</strong> Tests your tester before and after use.</li>
                <li><strong>Warning labels:</strong> Alert others to work in progress.</li>
                <li><strong>Never substitute:</strong> Each tool has a specific safety purpose.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Missing lock-off, using multimeters, untested testers, no warning signs.</li>
                <li><strong>Use:</strong> Complete isolation kit, GS38 testers, prove-before-prove-after sequence.</li>
                <li><strong>Apply:</strong> Full equipment checklist every isolation.</li>
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
              <span>Identify the correct tools for safe isolation</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Understand how to use each item correctly</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Learn how to check equipment is working before and after use</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Know why each part of the isolation kit is essential</span>
            </li>
          </ul>
        </Card>

        {/* Essential Equipment */}
        <div className="mb-8 border-l-4 border-emerald-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Essential Equipment for Safe Isolation</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-emerald-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="font-medium text-blue-800 dark:text-blue-200 mb-3">
                To carry out safe isolation correctly, electricians need the right tools and equipment. Each item plays a vital role in keeping you and others protected from electric shock and accidental energising.
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-foreground">The Four Essential Components:</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Lock-Off Kit</h5>
                    <p className="text-muted-foreground text-sm">Selection of lock-off devices, padlocks with unique keys, warning tags and labels</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Proving Unit</h5>
                    <p className="text-muted-foreground text-sm">Battery-powered device providing known voltage to test your tester before and after use</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Voltage Indicator (GS38 Compliant)</h5>
                    <p className="text-muted-foreground text-sm">Two-pole voltage tester rated for system voltage - NOT a multimeter</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">4</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Warning Notices</h5>
                    <p className="text-muted-foreground text-sm">"Do Not Operate" or "Danger: Electrician Working" labels placed at isolation points</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-800 dark:text-red-200 mb-2">Important: Why Not Multimeters?</p>
                  <p className="text-red-700 dark:text-emerald-400 text-sm">
                    Multimeters are not suitable for proving dead circuits because they don't meet GS38 safety standards and have exposed metal parts that could be dangerous.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck
          id="equipment-purpose"
          question="What tool is used to check that a voltage tester is working?"
          options={[
            "Multimeter",
            "Proving unit",
            "Oscilloscope",
            "Clamp meter"
          ]}
          correctIndex={1}
          explanation="A proving unit is a battery-powered device that provides a known voltage to test that your voltage tester is working before and after use."
        />

        {/* Steps to Use Equipment */}
        <div className="mb-8 border-l-4 border-emerald-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Steps to Use the Equipment</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
              <p className="font-medium text-emerald-800 dark:text-emerald-200 mb-3">
                Follow this sequence every time to ensure safe isolation:
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Test Your Tester</h5>
                    <p className="text-muted-foreground text-sm">Use the proving unit to check your voltage tester is working (before use)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Isolate the Circuit</h5>
                    <p className="text-muted-foreground text-sm">Switch off using the correct MCB, fuse, or isolator</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Apply Lock-Off Device</h5>
                    <p className="text-muted-foreground text-sm">Secure with padlock and keep the key with you</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">4</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Place Warning Tag</h5>
                    <p className="text-muted-foreground text-sm">Attach warning notice to the isolation device</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">5</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Test the Circuit</h5>
                    <p className="text-muted-foreground text-sm">Check all conductors: line to neutral, line to earth, neutral to earth</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">6</div>
                  <div>
                    <h5 className="font-semibold text-foreground">Retest Your Tester</h5>
                    <p className="text-muted-foreground text-sm">Use proving unit again to confirm tester is still working correctly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Safety Checks */}
        <div className="mb-8 border-l-4 border-purple-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Equipment Safety Checks</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <p className="font-medium text-purple-800 dark:text-purple-200 mb-3">
                Regular inspection and maintenance of isolation equipment is critical for safety:
              </p>
            </div>
            
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Visual Inspections</h4>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• Inspect leads and probes for damage</li>
                    <li>• Check for cracked or worn insulation</li>
                    <li>• Look for bent or damaged probe tips</li>
                    <li>• Ensure all connections are secure</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Standards Compliance</h4>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• Voltage testers must be GS38 compliant</li>
                    <li>• Check calibration dates and certificates</li>
                    <li>• Verify voltage ratings match system voltage</li>
                    <li>• Ensure CAT ratings are appropriate</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Replacement Schedule</h4>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• Replace any worn or expired proving units</li>
                    <li>• Update damaged lock-off devices</li>
                    <li>• Replace torn or faded warning labels</li>
                    <li>• Keep spare equipment available</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Storage and Care</h4>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• Keep lock-off devices clean, dry, and secure</li>
                    <li>• Store testers in protective cases</li>
                    <li>• Avoid extreme temperatures</li>
                    <li>• Keep proving units charged or with fresh batteries</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GS38 Requirements */}
        <div className="mb-8 border-l-4 border-amber-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">GS38 Requirements</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <p className="font-medium text-amber-800 dark:text-amber-200 mb-3">
                GS38 is the UK standard for electrical test equipment safety:
              </p>
            </div>
            
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-1 flex-shrink-0" />
                  <span><strong>Insulated test leads</strong> with finger barriers or shrouded probes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-1 flex-shrink-0" />
                  <span><strong>Maximum 4mm exposed tip</strong> on test probes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-1 flex-shrink-0" />
                  <span><strong>Appropriate voltage rating</strong> for the system being tested</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-1 flex-shrink-0" />
                  <span><strong>Clear indication</strong> when voltage is present</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Practical Tips for Equipment Selection */}
        <div className="mb-8 border-l-4 border-indigo-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Practical Tips for Equipment Selection</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
              <p className="font-medium text-indigo-800 dark:text-indigo-200 mb-3">
                Real-world guidance for choosing and maintaining isolation equipment:
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Voltage Tester Selection</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Choose dual-voltage testers (230V/400V) for versatility</li>
                    <li>• Look for LED and audible indication - easier in noisy environments</li>
                    <li>• Ensure CAT III rating minimum for installation work</li>
                    <li>• Consider probe storage - retractable or capped probes last longer</li>
                    <li>• Battery indicator essential - low battery = unreliable readings</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Lock-off Kit Essentials</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Universal MCB lockouts - fit most common brands</li>
                    <li>• Different sizes for 1-pole, 2-pole, 3-pole breakers</li>
                    <li>• Isolator lockouts for rotary switches</li>
                    <li>• Unique padlocks - same key type causes confusion</li>
                    <li>• Weatherproof tags for outdoor installations</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Proving Unit Features</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Auto-off function saves battery life</li>
                    <li>• Dual voltage output (50V and 250V) tests tester range</li>
                    <li>• Robust case - equipment gets dropped on site</li>
                    <li>• Annual calibration certificate required</li>
                    <li>• Spare batteries - never rely on mains charging</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Warning Labels Best Practice</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Pre-printed tags are clearer than handwritten</li>
                    <li>• Include mobile number for urgent contact</li>
                    <li>• Date and time prevent confusion on long jobs</li>
                    <li>• Laminated tags survive weather and handling</li>
                    <li>• Remove immediately after work completion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Equipment Problems and Solutions */}
        <div className="mb-8 border-l-4 border-rose-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-rose-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">6</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Common Equipment Problems and Solutions</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-lg p-4">
              <p className="font-medium text-rose-800 dark:text-rose-200 mb-3">
                Learn from common issues electricians face with isolation equipment:
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="space-y-6">
                <div className="border-b border-border pb-4">
                  <h4 className="font-semibold mb-2 text-foreground">Problem: "My voltage tester keeps giving inconsistent readings"</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-muted-foreground mb-1">Likely Causes:</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Dirty or corroded probe tips</li>
                        <li>• Loose internal connections</li>
                        <li>• Low battery affecting sensitivity</li>
                        <li>• Damaged test leads</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-muted-foreground mb-1">Solutions:</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Clean probes with fine emery cloth</li>
                        <li>• Replace if internal damage suspected</li>
                        <li>• Always check battery before use</li>
                        <li>• Test on proving unit to verify operation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-b border-border pb-4">
                  <h4 className="font-semibold mb-2 text-foreground">Problem: "Lock-off device won't fit the isolator properly"</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-muted-foreground mb-1">Likely Causes:</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Wrong size for breaker type</li>
                        <li>• Non-standard isolator design</li>
                        <li>• Worn or damaged lock-off device</li>
                        <li>• Debris preventing proper fit</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-muted-foreground mb-1">Solutions:</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Carry variety of lock-off types</li>
                        <li>• Custom solutions for unusual equipment</li>
                        <li>• Regular inspection and replacement</li>
                        <li>• Clean isolator before fitting lock-off</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Problem: "Proving unit won't turn on when I need it"</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-muted-foreground mb-1">Likely Causes:</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Dead or low batteries</li>
                        <li>• Corroded battery contacts</li>
                        <li>• Internal component failure</li>
                        <li>• Moisture ingress damage</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-muted-foreground mb-1">Solutions:</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Always carry spare batteries</li>
                        <li>• Clean contacts with isopropyl alcohol</li>
                        <li>• Replace unit immediately if faulty</li>
                        <li>• Store in dry conditions with battery removed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real World Case Studies */}
        <div className="mb-8 border-l-4 border-violet-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-violet-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">7</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Real World Case Studies</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800 rounded-lg p-4">
              <p className="font-medium text-violet-800 dark:text-violet-200 mb-3">
                Learn from actual incidents where equipment played a crucial role:
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="space-y-6">
                <div className="border-b border-border pb-4">
                  <h4 className="font-semibold mb-2 text-foreground">Case Study 1: The Faulty Tester</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-muted-foreground mb-2">The Incident:</h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        Electrician working on 400V sub-main in factory. Voltage tester gave "dead" reading, but circuit was still live. 
                        Fortunately discovered when another electrician double-checked with different tester.
                      </p>
                      <h5 className="font-medium text-muted-foreground mb-1">What Went Wrong:</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• No proving unit check before testing</li>
                        <li>• Tester had internal failure</li>
                        <li>• Relied on single test method</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-muted-foreground mb-1">Lessons Learned:</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Always prove-test-prove sequence</li>
                        <li>• Cross-check with colleague when possible</li>
                        <li>• Replace equipment at first sign of trouble</li>
                        <li>• Visual inspection not enough - circuits can look dead but be live</li>
                      </ul>
                      <div className="mt-3 p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded text-sm">
                        <strong className="text-emerald-800 dark:text-emerald-200">Result:</strong> 
                        <span className="text-emerald-700 dark:text-emerald-400"> Site implemented mandatory proving unit checks - no incidents since.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b border-border pb-4">
                  <h4 className="font-semibold mb-2 text-foreground">Case Study 2: The Missing Lock-off</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-muted-foreground mb-2">The Incident:</h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        Apprentice working on lighting circuit. Switched off at distribution board but didn't lock off. 
                        Cleaner switched lights back on while apprentice had hands in ceiling void.
                      </p>
                      <h5 className="font-medium text-muted-foreground mb-1">What Went Wrong:</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• No lock-off device used</li>
                        <li>• No warning sign displayed</li>
                        <li>• Poor communication with other site users</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-muted-foreground mb-1">Lessons Learned:</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Lock-off is not optional - it's essential</li>
                        <li>• Clear warning signs prevent misunderstandings</li>
                        <li>• Brief all site personnel before starting work</li>
                        <li>• Apprentices need extra supervision on isolation procedures</li>
                      </ul>
                      <div className="mt-3 p-2 bg-amber-100 dark:bg-amber-900/30 rounded text-sm">
                        <strong className="text-amber-800 dark:text-amber-200">Result:</strong> 
                        <span className="text-amber-700 dark:text-amber-300"> Minor shock, full recovery. Company now provides lock-off training to all trades.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Case Study 3: The Equipment That Saved Lives</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-muted-foreground mb-2">The Incident:</h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        Major switchboard upgrade in hospital. Multiple isolations required. One circuit unexpectedly had 
                        backfeed from UPS system. Proper isolation equipment detected the voltage.
                      </p>
                      <h5 className="font-medium text-muted-foreground mb-1">What Went Right:</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Comprehensive testing of all conductors</li>
                        <li>• High-quality GS38 tester detected UPS backfeed</li>
                        <li>• Multiple isolation points properly locked off</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-muted-foreground mb-1">Success Factors:</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Thorough isolation procedure followed</li>
                        <li>• Quality equipment revealed hidden danger</li>
                        <li>• Team worked systematically through checklist</li>
                        <li>• No shortcuts taken despite time pressure</li>
                      </ul>
                      <div className="mt-3 p-2 bg-emerald-600 dark:bg-emerald-700 rounded text-sm">
                        <strong className="text-white">Result:</strong> 
                        <span className="text-emerald-50"> Zero incidents. Project completed safely and on time.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-8 border-l-4 border-slate-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-slate-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">8</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Summary</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
              <p className="font-medium text-slate-800 dark:text-slate-200 mb-3">
                Key points to remember:
              </p>
            </div>
            
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-sm">Complete isolation kit includes lock-off devices, GS38 voltage tester, proving unit, and warning labels</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-sm">Always test your tester before and after use with a proving unit</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-sm">Multimeters are not suitable for proving dead circuits in isolation procedures</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-sm">Regular equipment inspection and maintenance is essential for safety</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-sm">GS38 compliance ensures test equipment meets required safety standards</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />
      </div>
    </div>
  );
};

export default Section5_2;