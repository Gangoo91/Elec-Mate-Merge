import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Zap, CheckCircle, Shield, Users, Clock, AlertTriangle, Radio, Eye, Lightbulb, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';
import useSEO from '@/hooks/useSEO';

const InspectionTestingModule2Section5 = () => {
  useSEO({
    title: "Working on Isolated Systems | Safe Isolation | Inspection & Testing Course",
    description: "Learn safe working practices for isolated electrical systems. Understand maintaining isolation integrity, team coordination, adjacent live working, and emergency procedures."
  });

  const defined_faqs = [
    {
      question: "Can I remove covers from adjacent live equipment to check routing?",
      answer: "Only if you are competent, authorised, and take appropriate precautions. Opening covers on live equipment exposes live parts and creates arc flash risk. You should: assess if it's truly necessary, obtain appropriate authorisation, ensure correct PPE for live working, use appropriate tools, maintain safe distances, and have a second person present if required."
    },
    {
      question: "What if I need to leave my isolated work area for a break?",
      answer: "Before leaving: verify your personal lock remains in place (or apply it if not already), ensure the work area is left safe (no exposed conductors, tools secured), inform colleagues if working in a team. On return: visually confirm your lock is still in place, check nothing has changed in the work area."
    },
    {
      question: "How do I safely work near live equipment that cannot be isolated?",
      answer: "Working near live equipment requires: risk assessment to determine if the work is essential, barriers or screens to prevent accidental contact, appropriate PPE (insulated gloves, safety glasses minimum), accompaniment by a second competent person, clear definition of safe working distances, and avoiding unnecessary tools or materials that could bridge gaps."
    },
    {
      question: "What stored energy hazards might remain after electrical isolation?",
      answer: "Even after proving dead, beware: capacitors (can hold lethal charge for extended periods), inductors (can discharge when circuit is broken), UPS batteries, motor flywheel inertia, hydraulic/pneumatic systems, spring-loaded mechanisms, pressurised vessels, and potential energy (raised loads, tensioned cables)."
    },
    {
      question: "What happens if someone else needs to work on the same circuit?",
      answer: "They must apply their own personal lock to the isolation point - this is the fundamental principle of multi-person lockout. Use a multi-hasp if necessary. They should also perform their own proving dead test and apply their own warning tag. Never rely on someone else's isolation."
    },
    {
      question: "How should shift handovers be managed for extended isolation work?",
      answer: "Proper handover requires: documented handover procedure, face-to-face communication (not just notes), the incoming worker applying their lock before the outgoing worker removes theirs, re-proving dead by the incoming worker, clear communication of work status and any issues, and updating tags/permits as required."
    },
    {
      question: "What should I do if I discover the isolation is not as expected?",
      answer: "Stop work immediately. Do not attempt to correct the isolation yourself unless you are authorised and competent to do so. Treat everything as live. Notify the person responsible for the isolation, your supervisor, and anyone else working on the same circuit. Document the discrepancy."
    },
    {
      question: "Can I temporarily remove my lock to allow testing?",
      answer: "Only under controlled circumstances with proper procedures. For dead testing (continuity, insulation resistance), your lock should remain. For live testing, a specific procedure is needed: remove lock only when testing requires energisation, implement controlled re-energisation procedure, re-apply lock immediately after testing."
    }
  ];

  const quizQuestions = [
    {
      question: "What is the PRIMARY method for maintaining personal safety during work on isolated equipment?",
      options: ["Warning signs around the area", "Having a colleague nearby", "Your personal lock remaining in place on the isolation", "Wearing insulated gloves throughout"],
      correctAnswer: 2,
      explanation: "Your personal lock on the isolation point is your primary protection - it physically prevents re-energisation. Warning signs, colleagues, and PPE are secondary controls."
    },
    {
      question: "When working near adjacent live equipment, what is the minimum distance you should maintain from exposed live parts at 230V?",
      options: ["25mm", "50mm", "As far as reasonably possible with barriers where practical", "No specific distance required if wearing gloves"],
      correctAnswer: 2,
      explanation: "While there are technical distance requirements, the practical approach is to maintain maximum possible distance and use physical barriers. Any unnecessary proximity to live parts increases risk."
    },
    {
      question: "During a shift handover of isolated work, at what point should the outgoing worker remove their personal lock?",
      options: ["When the handover conversation starts", "After the incoming worker has applied their lock", "When their shift ends regardless of handover status", "When the supervisor authorises it"],
      correctAnswer: 1,
      explanation: "The incoming worker must apply their lock BEFORE the outgoing worker removes theirs. This ensures continuous protection - there's never a moment when the isolation is unprotected."
    },
    {
      question: "What type of stored energy hazard can remain in a circuit even after electrical isolation and proving dead?",
      options: ["Thermal energy only", "Capacitor charge", "Light energy", "Sound energy"],
      correctAnswer: 1,
      explanation: "Capacitors can retain dangerous charges for extended periods after isolation. Large capacitors in motor drives, power factor correction equipment, and power supplies can hold lethal voltage levels."
    },
    {
      question: "If you need to leave your isolated work area for lunch, what must you verify before leaving?",
      options: ["The circuit is still dead", "Your personal lock is in place on the isolation", "Someone else is watching the area", "The work is complete"],
      correctAnswer: 1,
      explanation: "Before leaving, verify your personal lock remains in place - this is your protection while away. If the lock is in place, no one can re-energise."
    },
    {
      question: "What should you do if you need to work near a distribution board where some circuits are live and others are isolated?",
      options: ["Work quickly to minimise exposure time", "Treat all circuits as live and use appropriate PPE and barriers", "Only work on clearly marked isolated circuits", "Request all circuits be isolated before work"],
      correctAnswer: 1,
      explanation: "When working near mixed live/dead circuits, treat the environment as live: use appropriate PPE, implement barriers between live and work areas, maintain vigilance."
    },
    {
      question: "When is it appropriate to temporarily remove your personal lock from an isolation point?",
      options: ["Never under any circumstances", "When testing requires controlled energisation under proper procedure", "When a colleague needs to use the circuit", "When the supervisor requests it"],
      correctAnswer: 1,
      explanation: "Temporary lock removal may be necessary for live testing, but only under controlled procedures: specific method statement, controlled re-energisation, immediate re-application of lock."
    },
    {
      question: "What is the correct action if you discover your isolation may be incomplete (e.g., unexpected voltage source found)?",
      options: ["Isolate the additional source yourself and continue", "Stop work immediately and report to the responsible person", "Continue if the voltage is below 50V", "Increase your PPE and continue"],
      correctAnswer: 1,
      explanation: "Stop immediately if isolation is found to be incomplete. Do not attempt to correct it yourself unless competent and authorised. Report to the responsible person and treat everything as live."
    },
    {
      question: "What additional hazard must you consider when working on motor circuits, even after electrical isolation?",
      options: ["Noise hazard", "Mechanical rotation from stored inertia", "Chemical hazard", "Radiation hazard"],
      correctAnswer: 1,
      explanation: "Motor shafts can continue rotating after electrical isolation due to stored rotational energy (flywheel effect). Wait for complete stop and apply mechanical locks where possible."
    },
    {
      question: "What should be the FIRST thing you do each time you return to an isolated work area?",
      options: ["Continue where you left off", "Verify your personal lock is still in place", "Check your test equipment", "Look for any changes in the area"],
      correctAnswer: 1,
      explanation: "Always verify your lock is still in place first - this confirms the circuit cannot have been re-energised. Then check for any changes and consider re-proving dead if you have any doubt."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Minimal Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/study-centre/upskilling/inspection-testing/module-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Module 2
            </Button>
          </Link>
          <span className="text-xs text-muted-foreground">Section 5 of 6</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-24 max-w-3xl mx-auto">
        {/* Centered Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-elec-yellow" />
            <span className="text-sm text-muted-foreground">Module 2 Section 5</span>
          </div>
          <h1 className="text-2xl font-bold">Working on Isolated Systems</h1>
        </div>

        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mb-8">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Maintain Your Lock</p>
              <p className="font-medium">Check it's in place after every break</p>
            </div>
            <div>
              <p className="text-muted-foreground">Adjacent Live Work</p>
              <p className="font-medium">Use barriers, PPE, safe distances</p>
            </div>
            <div>
              <p className="text-muted-foreground">Stored Energy</p>
              <p className="font-medium">Capacitors, motors, springs remain hazardous</p>
            </div>
            <div>
              <p className="text-muted-foreground">Handover Rule</p>
              <p className="font-medium">New lock ON before old lock OFF</p>
            </div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Maintain isolation integrity throughout the work period</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Coordinate safely with other workers on the same isolation</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Identify and manage risks from adjacent live equipment</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Apply correct procedures for extended work periods and shift changes</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Respond appropriately to emergency situations during isolated work</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Maintain awareness of stored energy and other non-electrical hazards</span>
            </div>
          </div>
        </div>

        {/* Section 01: Maintaining Isolation Integrity */}
        <section className="mb-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            <h2 className="text-xl font-semibold">Maintaining Isolation Integrity</h2>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Once you've confirmed isolation, your focus shifts to <strong>maintaining</strong> that safe state throughout your work. The isolation is only as good as the ongoing vigilance applied to it.
            </p>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-elec-yellow" />
                Continuous Protection Measures
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Lock verification:</strong> Periodically confirm your lock is still in place, especially after breaks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Tag visibility:</strong> Ensure warning tags remain visible and legible</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Barrier maintenance:</strong> Keep any barriers or screens in place throughout</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Access control:</strong> Ensure only authorised personnel enter work area</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Communication:</strong> Stay informed of any changes to site conditions</span>
                </li>
              </ul>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">When to Re-Prove Dead</h4>
              <div className="space-y-1 text-sm">
                <p>Consider re-proving dead in these situations:</p>
                <ul className="space-y-1 ml-4">
                  <li>• After any extended break from the work area</li>
                  <li>• If the area was unattended for any period</li>
                  <li>• If you have any doubt about the isolation status</li>
                  <li>• After any incident or alarm affecting the electrical system</li>
                  <li>• At the start of each shift for extended work</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-400 font-semibold mb-1">Trust Your Lock</h4>
                  <p className="text-sm">
                    Your personal lock is your primary protection. As long as it's in place, no one can re-energise the circuit. However, always be prepared to verify dead status if anything seems different or uncertain.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Team Coordination */}
        <section className="mb-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            <h2 className="text-xl font-semibold">Team Coordination</h2>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              When multiple people work on the same isolated system, clear coordination prevents dangerous misunderstandings. Each person must understand their role and the status of the isolation.
            </p>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-elec-yellow" />
                Multi-Person Working Rules
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-background/50 rounded-lg p-3">
                  <Users className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground font-medium text-sm">Each Person, Own Lock</p>
                    <p className="text-xs">Every worker applies their personal lock to the isolation point via multi-hasp</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-background/50 rounded-lg p-3">
                  <Radio className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground font-medium text-sm">Clear Communication</p>
                    <p className="text-xs">Regular check-ins on work status, especially before any changes to isolation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-background/50 rounded-lg p-3">
                  <Eye className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground font-medium text-sm">Mutual Awareness</p>
                    <p className="text-xs">Know where colleagues are working and what they're doing</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-blue-400 font-semibold mb-1">Team Communication</h4>
                  <p className="text-sm">
                    Before anyone removes their lock: call out to confirm all team members are clear, get verbal acknowledgment from each person, visually confirm the work area is clear. Never assume - always verify with direct communication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <div className="mb-8">
          <InlineCheck
            question="When multiple workers are protected by the same isolation, what must each person do?"
            correctAnswer="Apply their own personal lock to the isolation point (using multi-hasp), perform their own proving dead test, and apply their own warning tag"
            explanation="Each person is responsible for their own safety. Relying on someone else's lock means you have no control over re-energisation. The multi-hasp allows everyone to have their personal lock in place simultaneously."
          />
        </div>

        {/* Section 03: Working Near Live Equipment */}
        <section className="mb-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            <h2 className="text-xl font-semibold">Working Near Live Equipment</h2>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Often your isolated circuit will be located near equipment that remains energised. Managing the interface between your dead work area and adjacent live parts is critical for safety.
            </p>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">Protection Measures</h4>
              <div className="space-y-3">
                <div className="bg-red-500/10 rounded-lg p-3">
                  <h5 className="text-red-400 font-medium mb-1">Physical Barriers</h5>
                  <p className="text-sm">Use insulated screens, blankets, or temporary barriers between work area and live parts. Barriers should be clearly marked and secured in place.</p>
                </div>
                <div className="bg-orange-500/10 rounded-lg p-3">
                  <h5 className="text-orange-400 font-medium mb-1">Safe Distance</h5>
                  <p className="text-sm">Maintain maximum practical distance from live parts. Consider the reach of tools and materials - not just your body position.</p>
                </div>
                <div className="bg-yellow-500/10 rounded-lg p-3">
                  <h5 className="text-yellow-400 font-medium mb-1">PPE for Proximity</h5>
                  <p className="text-sm">Even when working dead, if near live parts: insulated gloves, safety glasses, flame-resistant clothing may be required for accidental contact protection.</p>
                </div>
                <div className="bg-green-500/10 rounded-lg p-3">
                  <h5 className="text-green-400 font-medium mb-1">Clear Identification</h5>
                  <p className="text-sm">Clearly mark which circuits are isolated and which are live. Use colour-coded tape, labels, or barriers to distinguish safe and live zones.</p>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-400 font-semibold mb-1">Arc Flash Consideration</h4>
                  <p className="text-sm">
                    Even without direct contact, a tool or material bridging to a live part can cause an arc flash. Consider the arc flash boundaries of adjacent live equipment when planning your work position.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Extended Work and Shift Changes */}
        <section className="mb-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            <h2 className="text-xl font-semibold">Extended Work and Shift Changes</h2>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Work that extends over shifts or multiple days requires careful planning to maintain continuous protection. The handover process is a critical safety point where errors can occur.
            </p>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-elec-yellow" />
                Shift Handover Procedure
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-elec-yellow font-bold text-xs">1</div>
                  <span className="text-sm">Face-to-face handover (verbal + documented)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-elec-yellow font-bold text-xs">2</div>
                  <span className="text-sm">Incoming worker inspects isolation points</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-elec-yellow font-bold text-xs">3</div>
                  <span className="text-sm">Incoming worker applies their personal lock</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-elec-yellow font-bold text-xs">4</div>
                  <span className="text-sm">Outgoing worker removes their lock (only now)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-elec-yellow font-bold text-xs">5</div>
                  <span className="text-sm">Incoming worker proves dead before commencing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-elec-yellow font-bold text-xs">6</div>
                  <span className="text-sm">Update permit/documentation with new names/times</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-400 font-semibold mb-1">Critical Timing</h4>
                  <p className="text-sm">
                    There must <strong>never</strong> be a moment when no lock is present. The incoming worker's lock goes ON before the outgoing worker's lock comes OFF. This is the golden rule of isolation handover.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <div className="mb-8">
          <InlineCheck
            question="During a shift handover, when should the outgoing worker remove their personal lock?"
            correctAnswer="Only AFTER the incoming worker has applied their own lock - there must never be a moment with no lock present"
            explanation="This ensures continuous protection. If the outgoing worker removed their lock first, there would be a period where re-energisation could occur. The overlap of locks during handover is essential for safety."
          />
        </div>

        {/* Section 05: Stored Energy Hazards */}
        <section className="mb-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            <h2 className="text-xl font-semibold">Stored Energy Hazards</h2>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Electrical isolation removes the ongoing supply, but <strong>stored energy</strong> can remain in equipment long after isolation. These hazards require separate assessment and control.
            </p>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">Types of Stored Energy</h4>
              <div className="space-y-3">
                <div className="bg-yellow-500/10 rounded-lg p-3">
                  <h5 className="text-yellow-400 font-medium mb-1 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Capacitor Charge
                  </h5>
                  <p className="text-sm">Large capacitors in drives, PFC, and power supplies can retain lethal charge for hours. Wait for discharge time or use approved discharge procedure.</p>
                </div>
                <div className="bg-blue-500/10 rounded-lg p-3">
                  <h5 className="text-blue-400 font-medium mb-1 flex items-center gap-2">
                    <Wrench className="w-4 h-4" />
                    Mechanical Inertia
                  </h5>
                  <p className="text-sm">Motor shafts, fans, and coupled loads can continue rotating after isolation. Wait for complete stop and apply mechanical locks if available.</p>
                </div>
                <div className="bg-green-500/10 rounded-lg p-3">
                  <h5 className="text-green-400 font-medium mb-1 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Battery Backup
                  </h5>
                  <p className="text-sm">UPS systems, emergency lighting, and control batteries provide alternative energy sources. Must be separately isolated.</p>
                </div>
                <div className="bg-purple-500/10 rounded-lg p-3">
                  <h5 className="text-purple-400 font-medium mb-1 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Potential Energy
                  </h5>
                  <p className="text-sm">Raised loads, tensioned springs, pressurised systems can release energy when circuits are disturbed. Apply mechanical restraints.</p>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-400 font-semibold mb-1">Capacitor Discharge</h4>
                  <p className="text-sm">
                    Large capacitors (motor drives, power factor correction) can hold lethal charge. Allow manufacturer's specified discharge time OR use approved discharge resistors. Never assume capacitors are discharged - verify with appropriate meter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Emergency Procedures */}
        <section className="mb-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            <h2 className="text-xl font-semibold">Emergency Procedures</h2>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Despite best precautions, emergencies can occur. Knowing how to respond protects you and your colleagues. Pre-planning emergency response is essential.
            </p>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">If You Suspect Energisation</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 bg-red-500/20 rounded-lg p-3">
                  <span className="text-red-400 font-bold">1.</span>
                  <span className="text-sm">STOP immediately - do not touch anything</span>
                </div>
                <div className="flex items-center gap-3 bg-red-500/20 rounded-lg p-3">
                  <span className="text-red-400 font-bold">2.</span>
                  <span className="text-sm">WARN colleagues to stop and move clear</span>
                </div>
                <div className="flex items-center gap-3 bg-red-500/20 rounded-lg p-3">
                  <span className="text-red-400 font-bold">3.</span>
                  <span className="text-sm">VERIFY - check your lock is still in place</span>
                </div>
                <div className="flex items-center gap-3 bg-red-500/20 rounded-lg p-3">
                  <span className="text-red-400 font-bold">4.</span>
                  <span className="text-sm">TEST - prove dead if safe to approach test point</span>
                </div>
                <div className="flex items-center gap-3 bg-red-500/20 rounded-lg p-3">
                  <span className="text-red-400 font-bold">5.</span>
                  <span className="text-sm">REPORT - notify supervisor and investigate</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">Electric Shock Response</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Do not touch the casualty</strong> if they're still in contact with the source</p>
                <p><strong>Isolate the supply</strong> if safe to do so (emergency stop, RCD, main switch)</p>
                <p><strong>Call for help</strong> - emergency services and first aiders</p>
                <p><strong>If safe, move casualty</strong> clear using insulated materials</p>
                <p><strong>Commence CPR</strong> if not breathing and you're trained</p>
                <p><strong>Apply AED</strong> if available and indicated</p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-blue-400 font-semibold mb-1">Know Before You Need</h4>
                  <p className="text-sm">
                    Before starting work: know the location of emergency stops, isolation points, first aid equipment, AED, and emergency exits. Know who to call and how.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <div className="mb-8">
          <InlineCheck
            question="What stored energy hazard can remain in motor drive equipment even after electrical isolation and proving dead?"
            correctAnswer="Capacitor charge - large capacitors in variable speed drives can retain lethal voltage for extended periods after isolation"
            explanation="DC bus capacitors in motor drives are designed to store significant energy. They have bleed resistors but these take time (often several minutes). Always allow manufacturer-specified discharge time or use approved discharge procedures."
          />
        </div>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {defined_faqs.map((faq, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reference Card */}
        <section className="mb-8">
          <UnitsPocketCard
            title="Working Isolated Quick Reference"
            items={[
              { term: "Lock Check", definition: "Verify your personal lock after every break" },
              { term: "Multi-Person", definition: "Each person applies own lock via multi-hasp" },
              { term: "Adjacent Live", definition: "Use barriers, PPE, maintain safe distance" },
              { term: "Handover Rule", definition: "New lock ON before old lock OFF" },
              { term: "Capacitor Discharge", definition: "Wait for manufacturer time or use discharge procedure" },
              { term: "Re-Prove Dead", definition: "After breaks, doubt, incidents, or shift changes" },
              { term: "Emergency", definition: "Stop, warn, verify, test, report" }
            ]}
          />
        </section>

        {/* Quiz */}
        <section className="mb-8">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex justify-between gap-4 pt-8 border-t border-border">
          <Link to="/study-centre/upskilling/inspection-testing/module-2/section-4" className="flex-1">
            <Button variant="ghost" className="w-full justify-start">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link to="/study-centre/upskilling/inspection-testing/module-2/section-6" className="flex-1">
            <Button className="w-full justify-end bg-elec-yellow hover:bg-elec-yellow/90 text-black">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule2Section5;
