import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, Shield, Zap, Eye, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Common Mistakes and How to Avoid Them - Level 2 Electrical Course";
const DESCRIPTION = "Learn from common isolation failures to prevent electrical accidents. Understand mistakes, consequences, and prevention strategies for safe electrical work.";

const Section5_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Why is it unsafe to rely on switch positions or labels?",
      options: [
        "They might be outdated or incorrect",
        "Switches can fail mechanically", 
        "Labels can be damaged",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "Switch positions and labels can be unreliable due to outdated information, mechanical failures, damage, or incorrect installation. Always verify through proper testing."
    },
    {
      id: 2,
      question: "What type of tester must be used for proving dead?",
      options: [
        "Digital multimeter",
        "GS38-compliant two-pole voltage tester",
        "Neon screwdriver tester",
        "Clamp meter"
      ],
      correctAnswer: 1,
      explanation: "Only a GS38-compliant two-pole voltage tester should be used for proving dead, as it meets the specific safety requirements for electrical isolation testing."
    },
    {
      id: 3,
      question: "What is the danger of sharing a lock-off key?",
      options: [
        "It violates company policy",
        "It breaks the chain of individual accountability",
        "Keys can be lost more easily",
        "It's inefficient"
      ],
      correctAnswer: 1,
      explanation: "Sharing lock-off keys breaks the chain of individual accountability. Each worker must control their own safety through personal locks and keys."
    },
    {
      id: 4,
      question: "Why is it important to retest your tester after use?",
      options: [
        "To save battery life",
        "To confirm the tester didn't fail during testing",
        "To reset the tester settings",
        "Company procedure requirement"
      ],
      correctAnswer: 1,
      explanation: "Retesting the tester after use confirms it didn't fail during the isolation testing process, which could have given false 'dead' readings."
    },
    {
      id: 5,
      question: "True or False: Multimeters are acceptable for safe isolation if you're careful.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Multimeters are not suitable for proving dead regardless of how careful you are. Only GS38-compliant two-pole voltage testers should be used."
    },
    {
      id: 6,
      question: "What should you do if you discover a circuit is mislabelled?",
      options: [
        "Continue working and ignore it",
        "Report it and update the labelling system",
        "Just remember it for next time",
        "Leave it for someone else to fix"
      ],
      correctAnswer: 1,
      explanation: "Mislabelled circuits are a serious safety hazard. Report immediately and ensure the labelling system is corrected to prevent future incidents."
    },
    {
      id: 7,
      question: "Which conductors must be tested during safe isolation?",
      options: [
        "Only the live conductor",
        "Live and neutral only",
        "Live, neutral, and earth",
        "Just the main live feed"
      ],
      correctAnswer: 2,
      explanation: "All conductors (live, neutral, and earth) must be tested to ensure complete isolation and detect any potential faults or backfeed situations."
    },
    {
      id: 8,
      question: "When working in teams, how many locks should be applied?",
      options: [
        "One lock from the team leader",
        "One lock per team",
        "One lock per person working",
        "Two locks maximum"
      ],
      correctAnswer: 2,
      explanation: "Each person working must apply their own individual lock to maintain personal control over their safety and prevent work continuing without their knowledge."
    },
    {
      id: 9,
      question: "What is the main consequence of rushing isolation procedures?",
      options: [
        "Slightly delayed work completion",
        "Increased risk of potentially fatal mistakes",
        "Equipment might get damaged",
        "Paperwork complications"
      ],
      correctAnswer: 1,
      explanation: "Rushing isolation procedures significantly increases the risk of making potentially fatal mistakes. The time saved is never worth the life-threatening risks involved."
    },
    {
      id: 10,
      question: "Why should isolation mistakes be reported even if no harm occurred?",
      options: [
        "For insurance purposes only",
        "To blame the person responsible",
        "To learn from near-misses and prevent future incidents",
        "It's not necessary if no harm occurred"
      ],
      correctAnswer: 2,
      explanation: "Near-miss incidents provide valuable learning opportunities to prevent future accidents. Reporting them helps improve safety culture and procedures for everyone."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/80 hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title Block */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="h-8 w-8 text-elec-yellow" />
            <div>
              <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 5.5
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Common Mistakes and How to Avoid Them
              </h1>
              <p className="text-xl text-white">
                Learning from common isolation failures to prevent accidents
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/20">
              <h3 className="font-semibold text-white mb-3">In 30 seconds</h3>
              <ul className="space-y-1 text-sm text-white">
                <li>• Most electrical accidents are preventable</li>
                <li>• Common mistakes result from rushing or cutting corners</li>
                <li>• Following proper procedures saves lives</li>
                <li>• Professional discipline prevents fatal errors</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-elec-yellow/30">
              <h3 className="font-semibold text-white mb-3">Spot it / Use it</h3>
              <ul className="space-y-1 text-sm text-white">
                <li>• Not using lock-off devices</li>
                <li>• Wrong test equipment being used</li>
                <li>• Shared keys or shortcuts taken</li>
                <li>• Rushed isolation procedures</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Learning Outcomes</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-white">Identify frequent mistakes made during isolation</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-white">Understand the consequences of incorrect procedures</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-white">Learn how to prevent errors through habits, training, and checks</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-white">Develop professional discipline and safety awareness</span>
            </li>
          </ul>
        </Card>

        {/* Section 1: Not locking off */}
        <div className="mb-8 border-l-4 border-red-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">Not locking off</h2>
          </div>
          
          <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
            <p className="text-white mb-4">
              <strong>The mistake:</strong> Just switching off the breaker or isolator without applying a physical lock.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-white mb-2">❌ Why it's dangerous</h4>
                <ul className="space-y-1 text-sm text-white">
                  <li>• Someone else could easily switch it back on</li>
                  <li>• No physical barrier prevents re-energising</li>
                  <li>• Relies on trust rather than proven safety</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">✅ The solution</h4>
                <ul className="space-y-1 text-sm text-white">
                  <li>• Always use a lock-off device and padlock</li>
                  <li>• Apply your own personal lock every time</li>
                  <li>• Never rely on switches alone</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Inline Check */}
        <InlineCheck
          id="lock-off-check"
          question="What is the main danger of not using a lock-off device during isolation?"
          options={[
            "It takes longer to complete the work",
            "Someone else could accidentally re-energise the circuit",
            "The switch might wear out faster",
            "It violates company policy"
          ]}
          correctIndex={1}
          explanation="Without a physical lock, anyone can accidentally or intentionally switch the circuit back on while you're working, creating a potentially fatal situation. Lock-off devices provide the essential physical barrier to prevent re-energising."
        />

        {/* Section 2: Using wrong test equipment */}
        <div className="mb-8 border-l-4 border-orange-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">Using wrong test equipment</h2>
          </div>
          
          <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
            <p className="text-white mb-4">
              <strong>The mistake:</strong> Using multimeters or non-compliant testers for proving dead.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-white mb-2">❌ Why it's dangerous</h4>
                <ul className="space-y-1 text-sm text-white">
                  <li>• Multimeters aren't designed for safe isolation</li>
                  <li>• May not detect all dangerous voltages</li>
                  <li>• Can give false readings</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">✅ The solution</h4>
                <ul className="space-y-1 text-sm text-white">
                  <li>• Only use GS38-compliant two-pole voltage testers</li>
                  <li>• Test the tester before and after use</li>
                  <li>• Keep proving units for verification</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Assuming circuits are off */}
        <div className="mb-8 border-l-4 border-purple-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">Assuming circuits are off</h2>
          </div>
          
          <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
            <p className="text-white mb-4">
              <strong>The mistake:</strong> Trusting labels, switch positions, or someone's word without testing.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-white mb-2">❌ Why it's dangerous</h4>
                <ul className="space-y-1 text-sm text-white">
                  <li>• Circuits may be mislabelled</li>
                  <li>• Wiring could be incorrect</li>
                  <li>• Switches can fail or be bypassed</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">✅ The solution</h4>
                <ul className="space-y-1 text-sm text-white">
                  <li>• Always test all conductors</li>
                  <li>• Test line, neutral, and earth</li>
                  <li>• Verify circuit identity before isolation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Sharing lock-off keys */}
        <div className="mb-8 border-l-4 border-amber-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">Sharing lock-off keys</h2>
          </div>
          
          <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
            <p className="text-white mb-4">
              <strong>The mistake:</strong> Multiple workers sharing a single padlock key or using communal locks.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-white mb-2">❌ Why it's dangerous</h4>
                <ul className="space-y-1 text-sm text-white">
                  <li>• Breaks chain of individual accountability</li>
                  <li>• Work can continue without everyone present</li>
                  <li>• No personal control over safety</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">✅ The solution</h4>
                <ul className="space-y-1 text-sm text-white">
                  <li>• Each person must have own lock and key</li>
                  <li>• Use group lock boxes for multi-worker jobs</li>
                  <li>• Never share or lend keys</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Skipping final tester check */}
        <div className="mb-8 border-l-4 border-indigo-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">Skipping final tester check</h2>
          </div>
          
          <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
            <p className="text-white mb-4">
              <strong>The mistake:</strong> Not retesting the voltage tester after proving dead.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-white mb-2">❌ Why it's dangerous</h4>
                <ul className="space-y-1 text-sm text-white">
                  <li>• Tester may have failed during testing</li>
                  <li>• Could have given false 'dead' readings</li>
                  <li>• No way to verify tester integrity</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">✅ The solution</h4>
                <ul className="space-y-1 text-sm text-white">
                  <li>• Always retest tester after use</li>
                  <li>• Use proving unit for verification</li>
                  <li>• Replace faulty testers immediately</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Isolating the wrong circuit */}
        <div className="mb-8 border-l-4 border-rose-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-rose-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">6</div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">Isolating the wrong circuit</h2>
          </div>
          
          <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
            <p className="text-white mb-4">
              <strong>The mistake:</strong> Isolating the wrong circuit due to poor labelling or circuit identification.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-white mb-2">❌ Why it happens</h4>
                <ul className="space-y-1 text-sm text-white">
                  <li>• Incorrect or outdated circuit labels</li>
                  <li>• Complex installations with poor documentation</li>
                  <li>• Assuming labels are accurate</li>
                  <li>• Not physically tracing circuits</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">✅ The solution</h4>
                <ul className="space-y-1 text-sm text-white">
                  <li>• Visually trace circuits where possible</li>
                  <li>• Use circuit tracers and identification tools</li>
                  <li>• Verify by testing at the work location</li>
                  <li>• Update labels when inaccuracies found</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: Rushing isolation procedures */}
        <div className="mb-8 border-l-4 border-pink-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">7</div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">Rushing isolation procedures</h2>
          </div>
          
          <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
            <p className="text-white mb-4">
              <strong>The mistake:</strong> Skipping steps or rushing through isolation due to time pressure.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-white mb-2">Common shortcuts taken</h4>
                <ul className="space-y-1 text-sm text-white">
                  <li>• Skipping the "test-lock-test" sequence</li>
                  <li>• Not testing all conductors thoroughly</li>
                  <li>• Inadequate proving unit checks</li>
                  <li>• Poor communication with site team</li>
                  <li>• Incomplete documentation</li>
                </ul>
              </div>
              <div className="bg-red-500/20 border border-border/30 rounded-lg p-3">
                <p className="text-red-200 font-medium text-sm">
                  <strong>Remember:</strong> The few minutes saved by rushing are never worth the potential fatal consequences. Proper isolation takes time, and that time investment saves lives.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 8: Not communicating with others */}
        <div className="mb-8 border-l-4 border-cyan-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">8</div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">Poor communication and signage</h2>
          </div>
          
          <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
            <p className="text-white mb-4">
              <strong>The mistake:</strong> Failing to properly communicate isolation status to others on site.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-white mb-2">Communication failures</h4>
                <ul className="space-y-1 text-sm text-white">
                  <li>• No warning signs at isolation points</li>
                  <li>• Poor handover between shifts</li>
                  <li>• Inadequate permit-to-work procedures</li>
                  <li>• Not informing site management</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Best practice communication</h4>
                <ul className="space-y-1 text-sm text-white">
                  <li>• Clear, visible warning signs</li>
                  <li>• Proper permit documentation</li>
                  <li>• Shift handover procedures</li>
                  <li>• Site-wide communication systems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 9: Consequences of isolation failures */}
        <div className="mb-8 border-l-4 border-red-600 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">9</div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">Consequences of isolation failures</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-medium text-white mb-3">Personal Impact</h4>
                <ul className="space-y-2 text-sm text-white">
                  <li>• Electric shock and burns</li>
                  <li>• Hospital treatment required</li>
                  <li>• Permanent disability risk</li>
                  <li>• Psychological trauma</li>
                  <li>• Loss of income during recovery</li>
                  <li>• Potential fatality</li>
                </ul>
              </div>
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-medium text-white mb-3">Professional Impact</h4>
                <ul className="space-y-2 text-sm text-white">
                  <li>• Loss of professional qualifications</li>
                  <li>• Industry reputation damage</li>
                  <li>• Legal prosecution possible</li>
                  <li>• Difficulty obtaining work</li>
                  <li>• Insurance complications</li>
                  <li>• Mandatory retraining</li>
                </ul>
              </div>
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-medium text-white mb-3">Workplace Impact</h4>
                <ul className="space-y-2 text-sm text-white">
                  <li>• HSE investigation and fines</li>
                  <li>• Work stoppages and delays</li>
                  <li>• Increased insurance costs</li>
                  <li>• Team morale affected</li>
                  <li>• Additional safety training required</li>
                  <li>• Potential contract losses</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-500/20 border border-border/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-200 font-medium mb-2">
                    Real Cost of Electrical Accidents
                  </p>
                  <p className="text-red-200 text-sm">
                    According to HSE statistics, electrical accidents result in an average of 30 fatalities and over 3,000 injuries annually in the UK construction industry. The total cost including medical treatment, legal fees, lost productivity, and regulatory fines often exceeds £1 million per serious incident.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 10: Professional development and safety culture */}
        <div className="mb-8 border-l-4 border-green-600 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">10</div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">Building professional safety discipline</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Developing safety habits</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-white mb-2">Daily practices</h5>
                  <ul className="space-y-1 text-sm text-white">
                    <li>• Start each job with safety planning</li>
                    <li>• Check equipment before each use</li>
                    <li>• Follow procedures consistently</li>
                    <li>• Document all isolation work</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-white mb-2">Continuous improvement</h5>
                  <ul className="space-y-1 text-sm text-white">
                    <li>• Attend regular safety training</li>
                    <li>• Learn from incident reports</li>
                    <li>• Share knowledge with colleagues</li>
                    <li>• Stay updated with regulations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Creating a positive safety culture</h4>
              <ul className="space-y-2 text-sm text-white">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Speak up when you see unsafe practices - it could save a life</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Support colleagues who prioritise safety over speed</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Report near-misses without blame to prevent future incidents</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Lead by example - others are watching your safety practices</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 11: Additional case studies */}
        <div className="mb-8 border-l-4 border-violet-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-violet-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">11</div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">Additional real-world case studies</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <p className="text-white mb-4">
                <strong>Case Study 1: The Wrong Circuit</strong><br/>
                An experienced electrician was replacing a faulty switch in an office block. He isolated what he believed was the correct MCB based on the consumer unit labels. However, the office had been rewired years earlier, and the labels were never updated. When he removed the switch, he received a 230V shock from the live conductor.
              </p>
              
              <div className="mt-3 p-2 bg-elec-yellow bg-elec-yellow rounded text-sm">
                <p className="text-white font-medium">Lessons learned:</p>
                <p className="text-white">
                  Circuit verification using proper testing methods is essential. Never trust labels alone. The company implemented a circuit verification policy requiring testing at both the distribution board and the work location before any isolation work begins.
                </p>
              </div>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <p className="text-white mb-4">
                <strong>Case Study 2: Shared Key Incident</strong><br/>
                Three electricians were working on different lighting circuits in a warehouse. They used a single shared lock to save time. When one electrician finished early and left with the key, another team member arrived and assumed all work was complete. He restored power while the remaining electrician was still working, resulting in a serious electrical burn.
              </p>
              
              <div className="mt-3 p-2 bg-elec-yellow bg-elec-yellow rounded text-sm">
                <p className="text-white font-medium">Lessons learned:</p>
                <p className="text-white">
                  Individual accountability cannot be compromised. The site now requires personal locks for each worker and uses group lock boxes for multi-person jobs. Communication protocols were also strengthened with mandatory team briefings before energising any systems.
                </p>
              </div>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <p className="text-white mb-4">
                <strong>Case Study 3: The Faulty Tester</strong><br/>
                During routine maintenance, an electrician tested a circuit and confirmed it was dead using his voltage tester. However, he didn't retest the tester after use. Unknown to him, the tester had failed during the testing process due to an internal fault. He proceeded to work on what he thought was a dead circuit but received a severe shock when he touched the live conductor.
              </p>
              
              <div className="mt-3 p-2 bg-elec-yellow bg-elec-yellow rounded text-sm">
                <p className="text-white font-medium">Lessons learned:</p>
                <p className="text-white">
                  The "test-lock-test" procedure exists for critical safety reasons. The company now requires annual tester calibration, monthly functionality checks, and mandatory proving unit testing before and after every use. They also implemented a buddy system for isolation procedures on high-risk work.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 12: Practical prevention checklist */}
        <div className="mb-8 border-l-4 border-elec-yellow p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">12</div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">Practical prevention checklist</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h4 className="font-medium text-white mb-4">Pre-work safety checklist</h4>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h5 className="font-medium text-white mb-3">Equipment check</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-4 h-4 border border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
                      <span className="text-sm text-white">GS38-compliant voltage tester</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-4 h-4 border border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
                      <span className="text-sm text-white">Proving unit functioning correctly</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-4 h-4 border border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
                      <span className="text-sm text-white">Lock-off devices and personal padlock</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-4 h-4 border border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
                      <span className="text-sm text-white">Warning signs and tags ready</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-white mb-3">Planning check</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-4 h-4 border border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
                      <span className="text-sm text-white">Circuit identification verified</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-4 h-4 border border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
                      <span className="text-sm text-white">Site team informed of work</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-4 h-4 border border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
                      <span className="text-sm text-white">Permit-to-work completed if required</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-4 h-4 border border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
                      <span className="text-sm text-white">Emergency contacts available</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/20 border border-border/30 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">The professional approach</h4>
              <p className="text-white text-sm mb-3">
                True electrical professionals understand that safety procedures aren't bureaucratic obstacles - they're life-saving protocols developed from decades of industry experience and accident analysis.
              </p>
              <ul className="space-y-2 text-sm text-white">
                <li>• Quality over speed - every time</li>
                <li>• Procedures exist to protect you and others</li>
                <li>• Your reputation depends on consistent safety practices</li>
                <li>• Small corners cut can lead to major consequences</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 13: Summary and key takeaways */}
        <div className="mb-8 border-l-4 border-slate-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-slate-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">13</div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">Summary and key takeaways</h2>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
            <p className="text-white mb-6">
              Electrical isolation failures are almost always preventable human errors. Professional discipline, proper procedures, and consistent safety practices eliminate these risks and save lives.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="font-medium text-white mb-3">Critical success factors</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                    <span className="text-white text-sm">Never skip steps in the isolation process</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                    <span className="text-white text-sm">Use only proper, calibrated test equipment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                    <span className="text-white text-sm">Maintain individual lock and key control</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                    <span className="text-white text-sm">Verify circuit identity before isolation</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-3">Professional standards</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                    <span className="text-white text-sm">Time pressure never justifies cutting corners</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                    <span className="text-white text-sm">Communicate clearly with all site personnel</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                    <span className="text-white text-sm">Report near-misses to prevent future incidents</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                    <span className="text-white text-sm">Lead by example in safety practices</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg">
              <p className="text-white font-medium text-center">
                "Safety isn't just about following rules - it's about going home to your family every day. Make every isolation count."
              </p>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />
      </div>
    </div>
  );
};

export default Section5_5;