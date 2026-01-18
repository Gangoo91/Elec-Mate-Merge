import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Zap, CheckCircle, AlertTriangle, Power, Bell, Users, Lightbulb, XCircle, FileText, Shield, ClipboardCheck, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';
import useSEO from '@/hooks/useSEO';

const InspectionTestingModule2Section6 = () => {
  useSEO({
    title: "Re-energisation Procedures | Safe Isolation | Inspection & Testing Course",
    description: "Master the safe re-energisation procedures for electrical installations. Learn proper verification checks, communication protocols, and systematic energisation sequences."
  });

  const learningOutcomes = [
    "Execute systematic pre-energisation checks before restoring supply",
    "Communicate effectively with all affected parties before energisation",
    "Follow correct sequence for removing locks, tags, and closing isolators",
    "Verify successful energisation and respond to abnormal conditions",
    "Complete documentation and handover of energised systems",
    "Apply staged energisation for complex or unfamiliar systems"
  ];

  const faqs = [
    {
      question: "Who is responsible for authorising re-energisation?",
      answer: "The person who holds ultimate responsibility for the isolation - typically the permit holder, senior authorised person, or supervisor who controlled the original isolation. For simple isolations, this may be the worker who performed the isolation. For permitted work, the permit must be formally closed/cancelled before re-energisation. Never re-energise without proper authorisation through the documented system."
    },
    {
      question: "What if I notice a problem after removing locks but before energising?",
      answer: "Stop immediately. If it's safe to correct, reapply your lock, fix the issue, and restart the pre-energisation checks. If you cannot safely correct it, the isolation must be re-established with full LOTO procedure before any remedial work. Never continue with energisation if you've identified a problem, even a minor one - it may indicate a larger issue."
    },
    {
      question: "How should I handle re-energisation of critical systems?",
      answer: "Critical systems (life safety, process critical, high-consequence) require enhanced procedures: formal authorisation from operations/management, staged energisation with verification at each stage, monitoring of connected loads, standby personnel for emergency response, and communication with affected parties. Some organisations require witnessed re-energisation with documented sign-off."
    },
    {
      question: "What checks should I do after energisation?",
      answer: "Post-energisation checks include: verify supply restored (measure voltage), check protective devices haven't tripped, confirm equipment operates correctly, monitor for unusual sounds/smells/heat, check indicator lamps show expected status, verify connected loads are working, and monitor for any signs of overload or fault. Initial monitoring period length depends on the equipment type."
    },
    {
      question: "What if the circuit trips immediately upon energisation?",
      answer: "This indicates a fault condition. Immediately re-isolate using the isolation point (don't reset the tripped device). Apply LOTO again and investigate the cause - it could be: work error (tool left in, connection error), existing fault exposed by isolation, or component failure during work. Never repeatedly reset a tripping device - find and fix the fault first."
    },
    {
      question: "How do I safely energise after working on high-current circuits?",
      answer: "High-current circuits require extra care: verify all connections are torqued to specification, check clearances are maintained, ensure no debris or tools remain, consider thermal imaging during initial operation, and be prepared for higher inrush currents. For very high-current systems, staged loading may be appropriate rather than immediate full load."
    },
    {
      question: "What documentation is required after re-energisation?",
      answer: "Document: confirmation all locks/tags removed, pre-energisation checks completed, authorisation obtained, time and date of re-energisation, any issues encountered, post-energisation verification results, and notification to affected parties. For permitted work, the permit must be formally closed. Test certificates should record successful re-energisation where applicable."
    },
    {
      question: "What if someone's lock is still on the isolation point when I want to energise?",
      answer: "Do NOT remove someone else's lock. Their lock means they (or someone they're protecting) may still be at risk. Contact them to verify their status. If they've forgotten, they must come and remove it themselves. If genuinely unavailable, follow your organisation's emergency lock removal procedure (requires management authorisation, documentation, verification of safety). Never bypass another person's lock."
    }
  ];

  const quizQuestions = [
    {
      question: "What is the FIRST action before beginning re-energisation procedures?",
      options: ["Remove warning tags", "Close the isolator", "Verify all personnel are clear and all work is complete", "Remove your padlock"],
      correctAnswer: 2,
      explanation: "Before any physical steps of re-energisation, you must verify all personnel are clear of the work area and all work is complete. This includes visual verification, verbal confirmation from team members, and checking the work scope is finished."
    },
    {
      question: "In what order should locks, tags, and isolators be addressed during re-energisation?",
      options: ["Close isolator, remove locks, remove tags", "Remove tags, remove locks, close isolator", "Remove locks, remove tags, close isolator", "All can be done simultaneously"],
      correctAnswer: 2,
      explanation: "The correct sequence is: verify area clear -> remove locks -> remove tags -> close isolator -> verify energisation. Locks come off after verification but before closing the isolator. Tags are removed just before energising. Never close the isolator while locks are still attached."
    },
    {
      question: "What must happen before closing the main isolator after multi-person work?",
      options: ["Only the supervisor's lock needs removing", "At least one lock can remain", "ALL locks from ALL workers must be removed", "A vote can decide if locks should remain"],
      correctAnswer: 2,
      explanation: "Every personal lock must be removed before energisation can proceed. Each lock represents a person who may be at risk. If any lock remains, it means someone hasn't confirmed they're clear. Never energise with any lock still in place."
    },
    {
      question: "Who should be notified before energising a circuit that feeds other work areas?",
      options: ["Only the person who requested the isolation", "Anyone who might be affected by the energisation", "No notification required if work is complete", "Only management personnel"],
      correctAnswer: 1,
      explanation: "Anyone who might be affected by energisation must be notified - this includes other workers in the area, operators of connected equipment, and anyone who may have assumed the circuit would remain dead. Clear communication prevents unexpected energisation incidents."
    },
    {
      question: "If a circuit immediately trips when energised after maintenance, what should you do?",
      options: ["Reset it and try again", "Call an electrician to reset it", "Re-isolate, apply LOTO, and investigate the fault", "Leave it and report to management"],
      correctAnswer: 2,
      explanation: "Immediate tripping indicates a fault condition. Re-isolate immediately (don't reset), apply LOTO, and investigate. The fault could be from the work performed or an existing issue. Never repeatedly reset a tripping device without finding the cause."
    },
    {
      question: "What should you verify AFTER successful energisation?",
      options: ["Nothing - energisation is the final step", "Only that the isolator is closed", "Voltage present, no trips, equipment operates correctly, no abnormal conditions", "Only that warning tags are removed"],
      correctAnswer: 2,
      explanation: "Post-energisation verification confirms the system is operating correctly: voltage present, protective devices haven't tripped, equipment functions properly, no unusual sounds/smells/heat, and connected loads operate as expected. Initial monitoring catches problems early."
    },
    {
      question: "What is 'staged energisation' and when is it used?",
      options: ["Energising multiple circuits at once", "Gradually increasing voltage levels", "Energising in controlled steps with verification at each stage", "A theatrical term not used in electrical work"],
      correctAnswer: 2,
      explanation: "Staged energisation means energising in controlled steps - perhaps one section at a time, or verifying each stage before proceeding. It's used for complex systems, after major work, or when there's uncertainty about the result, allowing problems to be identified before full energisation."
    },
    {
      question: "What documentation must be completed after re-energisation of permitted work?",
      options: ["No documentation required", "Only a log book entry", "Formal permit closure/cancellation with sign-off", "Just a verbal report to supervisor"],
      correctAnswer: 2,
      explanation: "Permitted work requires formal permit closure - this documents that all isolations have been removed, work is complete, and the system is returned to service. This provides a clear audit trail and ensures proper handback of system responsibility."
    },
    {
      question: "If you notice a missing cover or guard during pre-energisation checks, what should you do?",
      options: ["Energise anyway and fix it later", "Energise with a warning to operators", "Stop and rectify before energisation", "Note it in the log and energise"],
      correctAnswer: 2,
      explanation: "All identified issues must be rectified before energisation. Missing covers or guards create hazards when the system is energised. If you cannot fix it, re-establish isolation and complete the work properly. Never energise a known deficiency."
    },
    {
      question: "What is the 'point of no return' in re-energisation procedures?",
      options: ["When the supervisor authorises energisation", "When warning tags are removed", "When the isolator is closed and supply is restored", "When you leave the work area"],
      correctAnswer: 2,
      explanation: "Once the isolator is closed and supply is restored, the system is live and the 'safe' period is over. All verification must be complete before this point. After energisation, any further work requires a new isolation procedure. This is why pre-energisation checks are so critical."
    }
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Minimal Header */}
      <header className="px-4 py-3 flex items-center justify-between border-b border-border">
        <Link to="/study-centre/upskilling/inspection-testing/module-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Module 2
          </Button>
        </Link>
        <span className="text-xs text-muted-foreground">Section 6 of 6</span>
      </header>

      <main className="px-4 py-6 pb-24 max-w-2xl mx-auto space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-5 h-5 text-elec-yellow" />
            <span className="text-sm text-muted-foreground">Module 2 Section 6</span>
          </div>
          <h1 className="text-2xl font-bold">Re-energisation Procedures</h1>
        </div>

        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
          <h2 className="text-sm font-semibold text-elec-yellow mb-3">In 30 Seconds</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <ClipboardCheck className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">Verify clear</strong> - all personnel clear, work complete, tools removed, guards replaced</span>
            </div>
            <div className="flex items-start gap-2">
              <Bell className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">Communicate</strong> - warn everyone affected before energising</span>
            </div>
            <div className="flex items-start gap-2">
              <Power className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">Sequence</strong> - remove ALL locks, remove tags, close isolator, verify operation</span>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">If trip occurs</strong> - re-isolate, LOTO, investigate - never repeatedly reset</span>
            </div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {learningOutcomes.map((outcome, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 01: Pre-Energisation Verification */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Pre-Energisation Verification
          </h2>

          <p className="text-muted-foreground">
            Before any physical actions to restore supply, a systematic verification ensures everything is ready for safe energisation. Rushing this stage has caused many incidents.
          </p>

          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="font-medium mb-3">Pre-Energisation Checklist</h3>
            <div className="space-y-2">
              {[
                "Work is complete and tested",
                "All personnel clear of the work area",
                "All tools and materials removed",
                "Covers, guards, and barriers replaced",
                "Connections secure and correctly torqued",
                "Any temporary modifications removed",
                "Insulation resistance test passed (if applicable)",
                "Authorisation obtained for re-energisation"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-green-500/10 rounded-lg p-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-amber-500/30 bg-amber-500/10 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-500 mb-1">Physical Verification</h4>
                <p className="text-sm text-muted-foreground">
                  Don't rely solely on verbal confirmations. Physically walk the work area to verify personnel are clear and all work is genuinely complete. A quick visual check can prevent serious incidents.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Communication Before Energisation */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Communication Before Energisation
          </h2>

          <p className="text-muted-foreground">
            Clear communication ensures everyone who might be affected by re-energisation is aware and prepared. Unexpected energisation is a leading cause of electrical incidents.
          </p>

          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="font-medium mb-3">Who to Notify</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Users className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">All team members</strong> who were involved in the work</span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Workers in adjacent areas</strong> who may be affected</span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Operators</strong> of equipment fed by the circuit</span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Control room/operations</strong> if site uses central monitoring</span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Anyone who might assume</strong> the circuit would remain dead</span>
              </li>
            </ul>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="font-medium mb-3">Communication Methods</h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-background/50 rounded-lg p-3">
                <h4 className="text-elec-yellow font-medium text-sm mb-1">Direct Verbal Warning</h4>
                <p className="text-xs text-muted-foreground">"I am about to energise [circuit/equipment]. Is everyone clear?"</p>
              </div>
              <div className="bg-background/50 rounded-lg p-3">
                <h4 className="text-elec-yellow font-medium text-sm mb-1">Radio Communication</h4>
                <p className="text-xs text-muted-foreground">For larger sites or when personnel are dispersed. Get acknowledgment.</p>
              </div>
              <div className="bg-background/50 rounded-lg p-3">
                <h4 className="text-elec-yellow font-medium text-sm mb-1">PA/Tannoy System</h4>
                <p className="text-xs text-muted-foreground">For site-wide notification where appropriate.</p>
              </div>
              <div className="bg-background/50 rounded-lg p-3">
                <h4 className="text-elec-yellow font-medium text-sm mb-1">Permit System</h4>
                <p className="text-xs text-muted-foreground">Formal permit cancellation confirms authorisation to energise.</p>
              </div>
            </div>
          </div>

          <div className="border border-blue-500/30 bg-blue-500/10 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-500 mb-1">Wait for Acknowledgment</h4>
                <p className="text-sm text-muted-foreground">
                  Don't just announce - wait for positive acknowledgment from affected parties. "Clear" or "Understood" should be received before proceeding. No response means do not energise until you've verified directly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <InlineCheck
          question="Before energising a circuit after maintenance, what is the FIRST thing you must verify?"
          correctAnswer="That all personnel are clear of the work area and all work is complete - physical verification, not just verbal confirmation"
          explanation="Physical verification means actually checking the area, not just asking if everyone is clear. People can forget they're still in a location, or not hear the question. A visual check is essential before any energisation."
        />

        {/* Section 03: Lock and Tag Removal Sequence */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Lock and Tag Removal Sequence
          </h2>

          <p className="text-muted-foreground">
            The physical steps of re-energisation must follow a logical sequence that maintains safety until the moment of supply restoration.
          </p>

          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="font-medium mb-4">Re-Energisation Sequence</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-green-500/10 rounded-lg p-3">
                <div className="w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-500 font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Verify Complete</p>
                  <p className="text-xs text-muted-foreground">All pre-energisation checks done, authorisation obtained</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-blue-500/10 rounded-lg p-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-500 font-bold">2</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Remove Personal Locks</p>
                  <p className="text-xs text-muted-foreground">Each person removes only their own lock after confirming clear</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-yellow-500/10 rounded-lg p-3">
                <div className="w-8 h-8 rounded-full bg-yellow-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-yellow-500 font-bold">3</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Remove Warning Tags</p>
                  <p className="text-xs text-muted-foreground">Destroy used tags - never reuse them</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-orange-500/10 rounded-lg p-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-500 font-bold">4</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Final Warning</p>
                  <p className="text-xs text-muted-foreground">"Energising now" - final call to all affected personnel</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-red-500/10 rounded-lg p-3">
                <div className="w-8 h-8 rounded-full bg-red-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-500 font-bold">5</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Close Isolator</p>
                  <p className="text-xs text-muted-foreground">Supply is now restored - point of no return</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-purple-500/10 rounded-lg p-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-500 font-bold">6</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Verify Energisation</p>
                  <p className="text-xs text-muted-foreground">Check voltage present, no trips, normal operation</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-red-500/30 bg-red-500/10 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-500 mb-1">ALL Locks Must Be Removed</h4>
                <p className="text-sm text-muted-foreground">
                  Never close an isolator while ANY lock remains in place. Each lock represents a person who hasn't confirmed they're clear. If someone has left their lock and is unavailable, follow emergency lock removal procedures - never just remove it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Post-Energisation Verification */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Post-Energisation Verification
          </h2>

          <p className="text-muted-foreground">
            Energisation isn't complete until you've verified the system is operating correctly. Initial monitoring catches problems before they escalate.
          </p>

          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="font-medium mb-3">Immediate Checks</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Voltage present:</strong> Verify supply has been restored (test at safe point)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">No trips:</strong> Protective devices haven't operated</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Indicator status:</strong> Pilot lamps show expected state</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">No alarms:</strong> Control systems show normal status</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Equipment function:</strong> Connected equipment operates correctly</span>
              </li>
            </ul>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="font-medium mb-3">Signs of Problems</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Immediate trip:</strong> Indicates fault condition - re-isolate and investigate</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Unusual sounds:</strong> Buzzing, arcing, humming beyond normal</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Burning smell:</strong> Indicates overheating - isolate immediately</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Visual sparking:</strong> Through ventilation gaps or covers</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Excessive heat:</strong> Abnormal warming of enclosures or cables</span>
              </li>
            </ul>
          </div>

          <div className="border border-blue-500/30 bg-blue-500/10 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-500 mb-1">Initial Monitoring Period</h4>
                <p className="text-sm text-muted-foreground">
                  Stay nearby during the initial operation period - typically at least a few minutes for simple circuits, longer for complex equipment. This allows immediate response if issues develop that weren't apparent at first energisation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <InlineCheck
          question="If a circuit trips immediately when the isolator is closed, what should you do?"
          correctAnswer="Re-isolate immediately using the isolation point (not the tripped device), apply LOTO, and investigate the cause of the fault"
          explanation="Immediate tripping indicates a fault - either from the work performed or an existing problem. Never repeatedly reset a tripping device. Re-isolate completely, apply LOTO, and find the root cause before any further attempt at energisation."
        />

        {/* Section 05: Staged Energisation */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Staged Energisation
          </h2>

          <p className="text-muted-foreground">
            For complex systems or after major work, <strong>staged energisation</strong> allows verification at each step rather than energising everything at once.
          </p>

          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="font-medium mb-3">When to Use Staged Energisation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>After major alterations or new installations</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>Complex systems with multiple subsections</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>When there's uncertainty about the work outcome</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>High-consequence systems (critical processes, life safety)</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>First energisation of unfamiliar equipment</span>
              </li>
            </ul>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="font-medium mb-3">Staged Approach</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-elec-yellow font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Energise Main Supply Only</p>
                  <p className="text-xs text-muted-foreground">Verify incoming supply, check main protection</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-elec-yellow font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Energise Distribution</p>
                  <p className="text-xs text-muted-foreground">Power submains without final circuits</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-elec-yellow font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Energise Final Circuits Section by Section</p>
                  <p className="text-xs text-muted-foreground">Verify each section before proceeding to next</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-elec-yellow font-bold text-sm">4</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Start Loads Gradually</p>
                  <p className="text-xs text-muted-foreground">Bring equipment online incrementally, monitor performance</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-green-500/30 bg-green-500/10 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-500 mb-1">Benefits of Staged Approach</h4>
                <p className="text-sm text-muted-foreground">
                  Problems are caught in isolation before they affect the entire system. If a fault occurs, it's easier to identify which section is affected. Less risk of cascading failures or widespread damage from a single fault.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Documentation and Handover */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Documentation and Handover
          </h2>

          <p className="text-muted-foreground">
            Proper documentation closes the loop on the isolation-work-energisation cycle, providing evidence of safe practices and a clear handover of system responsibility.
          </p>

          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="font-medium mb-3">Required Documentation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Permit closure:</strong> Formal cancellation of permit-to-work (if used)</span>
              </li>
              <li className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Lock removal record:</strong> Confirmation all locks/tags removed</span>
              </li>
              <li className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Energisation confirmation:</strong> Date, time, verified by whom</span>
              </li>
              <li className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Test results:</strong> Any post-energisation test results</span>
              </li>
              <li className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Abnormalities:</strong> Any issues noted during energisation</span>
              </li>
              <li className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span><strong className="text-foreground">Handover confirmation:</strong> System returned to operations</span>
              </li>
            </ul>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="font-medium mb-3">Handover to Operations</h3>
            <p className="text-sm text-muted-foreground mb-2"><strong className="text-foreground">Face-to-face handover</strong> where possible, covering:</p>
            <ul className="space-y-1 text-sm text-muted-foreground ml-4">
              <li>- What work was performed</li>
              <li>- Any changes to system configuration</li>
              <li>- Results of testing/verification</li>
              <li>- Any limitations or ongoing monitoring needed</li>
              <li>- Documentation provided/updated</li>
            </ul>
          </div>

          <div className="border border-amber-500/30 bg-amber-500/10 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-500 mb-1">Clear Responsibility Transfer</h4>
                <p className="text-sm text-muted-foreground">
                  Until formal handover, you remain responsible for the work you've done. The handover point transfers responsibility to operations/the client. Make sure this transfer is clear and documented - ambiguity about who is responsible can lead to safety gaps.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <InlineCheck
          question="What should be done with warning tags after they are removed during re-energisation?"
          correctAnswer="Destroy them - they should never be reused as they contain information specific to one isolation"
          explanation="Warning tags are single-use items. Reusing tags could lead to confusion about which isolation they relate to, potentially with old names, dates, and reasons being misinterpreted as current information."
        />

        {/* Practical Guidance */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Practical Guidance</h2>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <h3 className="font-semibold text-green-500 mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Top Tips
            </h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>- Use a physical checklist for pre-energisation - don't rely on memory</li>
              <li>- Make the final "Energising now" call loud and clear</li>
              <li>- Stay at the isolation point during initial energisation to react quickly</li>
              <li>- Have emergency stop or isolation means within reach</li>
              <li>- Document any unusual observations for future reference</li>
            </ul>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <h3 className="font-semibold text-red-500 mb-2 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              Common Mistakes
            </h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>- Not physically verifying the area is clear before energising</li>
              <li>- Rushing pre-energisation checks under time pressure</li>
              <li>- Not waiting for acknowledgment of warnings</li>
              <li>- Energising with someone else's lock still in place</li>
              <li>- Not monitoring after energisation ("job done, move on")</li>
            </ul>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h3 className="font-semibold text-blue-500 mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Key Regulations
            </h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>- <strong className="text-foreground">EAW Reg 13:</strong> Precautions for dead work (includes re-energisation)</li>
              <li>- <strong className="text-foreground">HSG85:</strong> Electricity at Work - Safe working practices</li>
              <li>- <strong className="text-foreground">BS 7671:</strong> Verification before energisation (Chapter 64)</li>
              <li>- Your organisation's LOTO and permit procedures</li>
            </ul>
          </div>
        </section>

        {/* Module Complete Banner */}
        <div className="bg-gradient-to-r from-green-500/20 to-green-500/5 border border-green-500/30 rounded-lg p-4">
          <h3 className="font-semibold text-green-500 mb-2 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Module 2 Complete!
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            You've completed the Safe Isolation Procedures module. You should now understand:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>- Principles of safe isolation and legal requirements</li>
            <li>- Selection and use of approved test equipment and PPE</li>
            <li>- Lock-out tag-out procedures for individual and team work</li>
            <li>- Proving dead techniques including prove-test-prove</li>
            <li>- Safe working practices during isolation</li>
            <li>- Correct re-energisation procedures</li>
          </ul>
        </div>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <h3 className="font-medium text-sm mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reference Card */}
        <UnitsPocketCard
          title="Re-energisation Quick Reference"
          items={[
            { term: "Pre-Energisation", definition: "Verify clear, work complete, tools removed, guards replaced" },
            { term: "Communication", definition: "Notify all affected, wait for acknowledgment" },
            { term: "Sequence", definition: "Remove ALL locks -> Remove tags -> Final warning -> Close isolator" },
            { term: "Post-Energisation", definition: "Verify voltage, no trips, equipment operates correctly" },
            { term: "Staged Approach", definition: "For complex systems - energise section by section" },
            { term: "Immediate Trip", definition: "Re-isolate, LOTO, investigate - never repeatedly reset" },
            { term: "Documentation", definition: "Permit closure, handover, any issues noted" }
          ]}
        />

        {/* Quiz */}
        <Quiz
          title="Test Your Knowledge"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex justify-between gap-4 pt-8 border-t border-border">
          <Link to="/study-centre/upskilling/inspection-testing/module-2/section-5" className="flex-1">
            <Button variant="ghost" className="w-full justify-start">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link to="/study-centre/upskilling/inspection-testing/module-3" className="flex-1">
            <Button className="w-full justify-end bg-elec-yellow hover:bg-elec-yellow/90 text-black">
              Module 3
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule2Section6;
