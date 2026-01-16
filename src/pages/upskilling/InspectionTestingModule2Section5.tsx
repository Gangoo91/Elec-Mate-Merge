import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, CheckCircle2, AlertTriangle, Wrench, Users, Clock, Lightbulb, XCircle, ChevronDown, ChevronUp, FileText, Shield, Eye, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';
import useSEO from '@/hooks/useSEO';

const InspectionTestingModule2Section5 = () => {
  useSEO({
    title: "Working on Isolated Systems | Safe Isolation | Inspection & Testing Course",
    description: "Learn safe working practices for isolated electrical systems. Understand maintaining isolation integrity, team coordination, adjacent live working, and emergency procedures."
  });

  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const defined_learningOutcomes = [
    { id: 1, text: "Maintain isolation integrity throughout the work period", icon: Shield },
    { id: 2, text: "Coordinate safely with other workers on the same isolation", icon: Users },
    { id: 3, text: "Identify and manage risks from adjacent live equipment", icon: AlertTriangle },
    { id: 4, text: "Apply correct procedures for extended work periods and shift changes", icon: Clock },
    { id: 5, text: "Respond appropriately to emergency situations during isolated work", icon: Radio },
    { id: 6, text: "Maintain awareness of stored energy and other non-electrical hazards", icon: Eye }
  ];

  const defined_defined_defined_defined_faqs = [
    {
      question: "Can I remove covers from adjacent live equipment to check routing?",
      answer: "Only if you are competent, authorised, and take appropriate precautions. Opening covers on live equipment exposes live parts and creates arc flash risk. You should: assess if it's truly necessary, obtain appropriate authorisation, ensure correct PPE for live working, use appropriate tools, maintain safe distances, and have a second person present if required. Where possible, isolate the adjacent equipment instead or use documentation to verify routing without exposure."
    },
    {
      question: "What if I need to leave my isolated work area for a break?",
      answer: "Before leaving: verify your personal lock remains in place (or apply it if not already), ensure the work area is left safe (no exposed conductors, tools secured), inform colleagues if working in a team. On return: visually confirm your lock is still in place, check nothing has changed in the work area. For extended breaks, consider re-proving dead before resuming work, especially if the area was unattended."
    },
    {
      question: "How do I safely work near live equipment that cannot be isolated?",
      answer: "Working near live equipment requires: risk assessment to determine if the work is essential and cannot be done with isolation, barriers or screens to prevent accidental contact, appropriate PPE (insulated gloves, safety glasses minimum), accompaniment by a second competent person, clear definition of safe working distances, and avoiding unnecessary tools or materials that could bridge gaps. Consider if the work can be rescheduled to when isolation is possible."
    },
    {
      question: "What stored energy hazards might remain after electrical isolation?",
      answer: "Even after proving dead, beware: capacitors (can hold lethal charge for extended periods), inductors (can discharge when circuit is broken), UPS batteries, motor flywheel inertia, hydraulic/pneumatic systems, spring-loaded mechanisms, pressurised vessels, and potential energy (raised loads, tensioned cables). Each hazard requires specific controls - electrical isolation alone doesn't address mechanical or stored energy hazards."
    },
    {
      question: "What happens if someone else needs to work on the same circuit?",
      answer: "They must apply their own personal lock to the isolation point - this is the fundamental principle of multi-person lockout. Use a multi-hasp if necessary. They should also perform their own proving dead test and apply their own warning tag. Never rely on someone else's isolation or share locks/keys. Each person is responsible for their own safety through their own lock."
    },
    {
      question: "How should shift handovers be managed for extended isolation work?",
      answer: "Proper handover requires: documented handover procedure, face-to-face communication (not just notes), the incoming worker applying their lock before the outgoing worker removes theirs, re-proving dead by the incoming worker, clear communication of work status and any issues, updating tags/permits as required. Never have a period where no lock is present during handover."
    },
    {
      question: "What should I do if I discover the isolation is not as expected?",
      answer: "Stop work immediately. Do not attempt to correct the isolation yourself unless you are authorised and competent to do so. Treat everything as live. Notify the person responsible for the isolation, your supervisor, and anyone else working on the same circuit. Document the discrepancy. The isolation must be reverified before any work resumes."
    },
    {
      question: "Can I temporarily remove my lock to allow testing?",
      answer: "Only under controlled circumstances with proper procedures. For dead testing (continuity, insulation resistance), your lock should remain. For live testing, a specific procedure is needed: remove lock only when testing requires energisation, implement controlled re-energisation procedure, re-apply lock immediately after testing, re-prove dead before resuming dead work. This should be covered in the work method statement."
    }
  ];

  const defined_defined_defined_quizQuestions = [
    {
      question: "What is the PRIMARY method for maintaining personal safety during work on isolated equipment?",
      options: ["Warning signs around the area", "Having a colleague nearby", "Your personal lock remaining in place on the isolation", "Wearing insulated gloves throughout"],
      correctAnswer: 2,
      explanation: "Your personal lock on the isolation point is your primary protection - it physically prevents re-energisation. Warning signs, colleagues, and PPE are secondary controls. The lock ensures YOU control when the equipment can be re-energised."
    },
    {
      question: "When working near adjacent live equipment, what is the minimum distance you should maintain from exposed live parts at 230V?",
      options: ["25mm", "50mm", "As far as reasonably possible with barriers where practical", "No specific distance required if wearing gloves"],
      correctAnswer: 2,
      explanation: "While there are technical distance requirements, the practical approach is to maintain maximum possible distance and use physical barriers. Any unnecessary proximity to live parts increases risk. Barriers, screens, and insulated covers provide additional protection beyond distance alone."
    },
    {
      question: "During a shift handover of isolated work, at what point should the outgoing worker remove their personal lock?",
      options: ["When the handover conversation starts", "After the incoming worker has applied their lock", "When their shift ends regardless of handover status", "When the supervisor authorises it"],
      correctAnswer: 1,
      explanation: "The incoming worker must apply their lock BEFORE the outgoing worker removes theirs. This ensures continuous protection - there's never a moment when the isolation is unprotected. This is the core principle of safe isolation handover."
    },
    {
      question: "What type of stored energy hazard can remain in a circuit even after electrical isolation and proving dead?",
      options: ["Thermal energy only", "Capacitor charge", "Light energy", "Sound energy"],
      correctAnswer: 1,
      explanation: "Capacitors can retain dangerous charges for extended periods after isolation. Large capacitors in motor drives, power factor correction equipment, and power supplies can hold lethal voltage levels. Allow discharge time or use approved discharge procedures."
    },
    {
      question: "If you need to leave your isolated work area for lunch, what must you verify before leaving?",
      options: ["The circuit is still dead", "Your personal lock is in place on the isolation", "Someone else is watching the area", "The work is complete"],
      correctAnswer: 1,
      explanation: "Before leaving, verify your personal lock remains in place - this is your protection while away. If the lock is in place, no one can re-energise. On return, verify it's still there and consider re-proving dead if you have any doubt about the isolation status."
    },
    {
      question: "What should you do if you need to work near a distribution board where some circuits are live and others are isolated?",
      options: ["Work quickly to minimise exposure time", "Treat all circuits as live and use appropriate PPE and barriers", "Only work on clearly marked isolated circuits", "Request all circuits be isolated before work"],
      correctAnswer: 1,
      explanation: "When working near mixed live/dead circuits, treat the environment as live: use appropriate PPE, implement barriers between live and work areas, maintain vigilance. The safest option is always to request full isolation if possible."
    },
    {
      question: "When is it appropriate to temporarily remove your personal lock from an isolation point?",
      options: ["Never under any circumstances", "When testing requires controlled energisation under proper procedure", "When a colleague needs to use the circuit", "When the supervisor requests it"],
      correctAnswer: 1,
      explanation: "Temporary lock removal may be necessary for live testing, but only under controlled procedures: specific method statement, controlled re-energisation, immediate re-application of lock, and re-proving dead before resuming dead work. Never remove for someone else's convenience."
    },
    {
      question: "What is the correct action if you discover your isolation may be incomplete (e.g., unexpected voltage source found)?",
      options: ["Isolate the additional source yourself and continue", "Stop work immediately and report to the responsible person", "Continue if the voltage is below 50V", "Increase your PPE and continue"],
      correctAnswer: 1,
      explanation: "Stop immediately if isolation is found to be incomplete. Do not attempt to correct it yourself unless competent and authorised. Report to the responsible person, treat everything as live, and do not resume until the isolation is properly verified."
    },
    {
      question: "What additional hazard must you consider when working on motor circuits, even after electrical isolation?",
      options: ["Noise hazard", "Mechanical rotation from stored inertia", "Chemical hazard", "Radiation hazard"],
      correctAnswer: 1,
      explanation: "Motor shafts can continue rotating after electrical isolation due to stored rotational energy (flywheel effect). Coupled machinery may also move. Wait for complete stop, apply mechanical locks where possible, and verify rotation has ceased before working on motor internals."
    },
    {
      question: "What should be the FIRST thing you do each time you return to an isolated work area?",
      options: ["Continue where you left off", "Verify your personal lock is still in place", "Check your test equipment", "Look for any changes in the area"],
      correctAnswer: 1,
      explanation: "Always verify your lock is still in place first - this confirms the circuit cannot have been re-energised. Then check for any changes, and consider re-proving dead if the area was unattended or you have any doubt about isolation status."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/apprentice/upskilling/inspection-testing/module2')}
            className="flex items-center text-elec-yellow touch-target"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Module 2</span>
          </button>
          <span className="text-xs text-white/50 font-medium">Section 5 of 6</span>
        </div>
      </header>

      <main className="pb-24">
        {/* Hero Section */}
        <section className="px-4 pt-6 pb-8">
          <Badge className="bg-elec-yellow/20 text-elec-yellow border-0 mb-3">
            Module 2 • Safe Isolation
          </Badge>
          <h1 className="text-ios-title-large font-bold text-white mb-3">
            Working on Isolated Systems
          </h1>
          <p className="text-white/70 text-ios-body leading-relaxed">
            Once isolation is confirmed, safe working practices must be maintained throughout the work period. Learn to manage ongoing risks, coordinate with others, and respond to changes.
          </p>
        </section>

        {/* In 30 Seconds Card */}
        <section className="px-4 mb-8">
          <Card variant="ios-elevated" className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border-elec-yellow/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-elec-yellow" />
                In 30 Seconds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-white/90 text-sm leading-relaxed">
                • <strong>Maintain your lock</strong> - it's your lifeline. Check it's in place after every break
              </p>
              <p className="text-white/90 text-sm leading-relaxed">
                • <strong>Adjacent live work</strong> - use barriers, PPE, and maintain safe distances
              </p>
              <p className="text-white/90 text-sm leading-relaxed">
                • <strong>Stored energy</strong> - capacitors, motors, springs can remain hazardous after isolation
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Learning Outcomes */}
        <section className="px-4 mb-8">
          <h2 className="text-ios-headline font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 gap-3">
            {defined_learningOutcomes.map((outcome) => (
              <Card key={outcome.id} variant="ios" className="bg-white/5 border-white/10">
                <CardContent className="flex items-start gap-3 p-4">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <outcome.icon className="w-4 h-4 text-elec-yellow" />
                  </div>
                  <span className="text-white/90 text-sm leading-relaxed">{outcome.text}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 01: Maintaining Isolation Integrity */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-ios-title-2 font-bold text-white">Maintaining Isolation Integrity</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Once you've confirmed isolation, your focus shifts to <strong>maintaining</strong> that safe state throughout your work. The isolation is only as good as the ongoing vigilance applied to it.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Continuous Protection Measures</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Lock verification:</strong> Periodically confirm your lock is still in place, especially after breaks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Tag visibility:</strong> Ensure warning tags remain visible and legible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Barrier maintenance:</strong> Keep any barriers or screens in place throughout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Access control:</strong> Ensure only authorised personnel enter work area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Communication:</strong> Stay informed of any changes to site conditions</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">When to Re-Prove Dead</h4>
                <div className="space-y-2 text-white/80 text-sm">
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

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-1">Trust Your Lock</h4>
                    <p className="text-white/80 text-sm">
                      Your personal lock is your primary protection. As long as it's in place, no one can re-energise the circuit. However, always be prepared to verify dead status if anything seems different or uncertain.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 02: Team Coordination */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-ios-title-2 font-bold text-white">Team Coordination</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                When multiple people work on the same isolated system, clear coordination prevents dangerous misunderstandings. Each person must understand their role and the status of the isolation.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Multi-Person Working Rules</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                    <Users className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium text-sm">Each Person, Own Lock</p>
                      <p className="text-white/60 text-xs">Every worker applies their personal lock to the isolation point via multi-hasp</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                    <Radio className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium text-sm">Clear Communication</p>
                      <p className="text-white/60 text-xs">Regular check-ins on work status, especially before any changes to isolation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                    <Eye className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium text-sm">Mutual Awareness</p>
                      <p className="text-white/60 text-xs">Know where colleagues are working and what they're doing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                    <FileText className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium text-sm">Documented Coordination</p>
                      <p className="text-white/60 text-xs">Use permits, sign-on sheets, and formal communication for complex work</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-1">Team Communication</h4>
                    <p className="text-white/80 text-sm">
                      Before anyone removes their lock: call out to confirm all team members are clear, get verbal acknowledgment from each person, visually confirm the work area is clear. Never assume - always verify with direct communication.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Inline Check 1 */}
        <section className="px-4 mb-8">
          <InlineCheck
            question="When multiple workers are protected by the same isolation, what must each person do?"
            correctAnswer="Apply their own personal lock to the isolation point (using multi-hasp), perform their own proving dead test, and apply their own warning tag"
            explanation="Each person is responsible for their own safety. Relying on someone else's lock means you have no control over re-energisation. The multi-hasp allows everyone to have their personal lock in place simultaneously."
          />
        </section>

        {/* Section 03: Working Near Live Equipment */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">Working Near Live Equipment</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Often your isolated circuit will be located near equipment that remains energised. Managing the interface between your dead work area and adjacent live parts is critical for safety.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Protection Measures</h4>
                <div className="space-y-3">
                  <div className="bg-red-500/10 rounded-lg p-3">
                    <h5 className="text-red-400 font-medium mb-1">Physical Barriers</h5>
                    <p className="text-white/70 text-sm">Use insulated screens, blankets, or temporary barriers between work area and live parts. Barriers should be clearly marked and secured in place.</p>
                  </div>
                  <div className="bg-orange-500/10 rounded-lg p-3">
                    <h5 className="text-orange-400 font-medium mb-1">Safe Distance</h5>
                    <p className="text-white/70 text-sm">Maintain maximum practical distance from live parts. Consider the reach of tools and materials - not just your body position.</p>
                  </div>
                  <div className="bg-yellow-500/10 rounded-lg p-3">
                    <h5 className="text-yellow-400 font-medium mb-1">PPE for Proximity</h5>
                    <p className="text-white/70 text-sm">Even when working dead, if near live parts: insulated gloves, safety glasses, flame-resistant clothing may be required for accidental contact protection.</p>
                  </div>
                  <div className="bg-green-500/10 rounded-lg p-3">
                    <h5 className="text-green-400 font-medium mb-1">Clear Identification</h5>
                    <p className="text-white/70 text-sm">Clearly mark which circuits are isolated and which are live. Use colour-coded tape, labels, or barriers to distinguish safe and live zones.</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-red-400 font-semibold mb-1">Arc Flash Consideration</h4>
                    <p className="text-white/80 text-sm">
                      Even without direct contact, a tool or material bridging to a live part can cause an arc flash. Consider the arc flash boundaries of adjacent live equipment when planning your work position and movements.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 04: Extended Work and Shift Changes */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-ios-title-2 font-bold text-white">Extended Work and Shift Changes</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Work that extends over shifts or multiple days requires careful planning to maintain continuous protection. The handover process is a critical safety point where errors can occur.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Shift Handover Procedure</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow font-bold text-sm">1</span>
                    </div>
                    <span className="text-white/80 text-sm">Face-to-face handover (verbal + documented)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow font-bold text-sm">2</span>
                    </div>
                    <span className="text-white/80 text-sm">Incoming worker inspects isolation points</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow font-bold text-sm">3</span>
                    </div>
                    <span className="text-white/80 text-sm">Incoming worker applies their personal lock</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow font-bold text-sm">4</span>
                    </div>
                    <span className="text-white/80 text-sm">Outgoing worker removes their lock (only now)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow font-bold text-sm">5</span>
                    </div>
                    <span className="text-white/80 text-sm">Incoming worker proves dead before commencing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow font-bold text-sm">6</span>
                    </div>
                    <span className="text-white/80 text-sm">Update permit/documentation with new names/times</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-1">Critical Timing</h4>
                    <p className="text-white/80 text-sm">
                      There must <strong>never</strong> be a moment when no lock is present. The incoming worker's lock goes ON before the outgoing worker's lock comes OFF. This is the golden rule of isolation handover.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Handover Information</h4>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li>• Work completed and work remaining</li>
                  <li>• Any issues encountered or hazards discovered</li>
                  <li>• Status of all isolation points</li>
                  <li>• Location of tools and materials</li>
                  <li>• Any changes to the original plan</li>
                  <li>• Emergency contact arrangements</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Inline Check 2 */}
        <section className="px-4 mb-8">
          <InlineCheck
            question="During a shift handover, when should the outgoing worker remove their personal lock?"
            correctAnswer="Only AFTER the incoming worker has applied their own lock - there must never be a moment with no lock present"
            explanation="This ensures continuous protection. If the outgoing worker removed their lock first, there would be a period where re-energisation could occur. The overlap of locks during handover is essential for safety."
          />
        </section>

        {/* Section 05: Stored Energy Hazards */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">Stored Energy Hazards</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Electrical isolation removes the ongoing supply, but <strong>stored energy</strong> can remain in equipment long after isolation. These hazards require separate assessment and control.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Types of Stored Energy</h4>
                <div className="space-y-3">
                  <div className="bg-yellow-500/10 rounded-lg p-3">
                    <h5 className="text-yellow-400 font-medium mb-1 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Capacitor Charge
                    </h5>
                    <p className="text-white/70 text-sm">Large capacitors in drives, PFC, and power supplies can retain lethal charge for hours. Wait for discharge time or use approved discharge procedure.</p>
                  </div>
                  <div className="bg-blue-500/10 rounded-lg p-3">
                    <h5 className="text-blue-400 font-medium mb-1 flex items-center gap-2">
                      <Wrench className="w-4 h-4" />
                      Mechanical Inertia
                    </h5>
                    <p className="text-white/70 text-sm">Motor shafts, fans, and coupled loads can continue rotating after isolation. Wait for complete stop and apply mechanical locks if available.</p>
                  </div>
                  <div className="bg-green-500/10 rounded-lg p-3">
                    <h5 className="text-green-400 font-medium mb-1 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Battery Backup
                    </h5>
                    <p className="text-white/70 text-sm">UPS systems, emergency lighting, and control batteries provide alternative energy sources. Must be separately isolated.</p>
                  </div>
                  <div className="bg-purple-500/10 rounded-lg p-3">
                    <h5 className="text-purple-400 font-medium mb-1 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Potential Energy
                    </h5>
                    <p className="text-white/70 text-sm">Raised loads, tensioned springs, pressurised systems can release energy when circuits are disturbed. Apply mechanical restraints.</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-red-400 font-semibold mb-1">Capacitor Discharge</h4>
                    <p className="text-white/80 text-sm">
                      Large capacitors (motor drives, power factor correction) can hold lethal charge. Allow manufacturer's specified discharge time OR use approved discharge resistors. Never assume capacitors are discharged - verify with appropriate meter before touching.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 06: Emergency Procedures */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-ios-title-2 font-bold text-white">Emergency Procedures</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Despite best precautions, emergencies can occur. Knowing how to respond protects you and your colleagues. Pre-planning emergency response is essential.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">If You Suspect Energisation</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 bg-red-500/20 rounded-lg p-3">
                    <span className="text-red-400 font-bold">1.</span>
                    <span className="text-white/80 text-sm">STOP immediately - do not touch anything</span>
                  </div>
                  <div className="flex items-center gap-3 bg-red-500/20 rounded-lg p-3">
                    <span className="text-red-400 font-bold">2.</span>
                    <span className="text-white/80 text-sm">WARN colleagues to stop and move clear</span>
                  </div>
                  <div className="flex items-center gap-3 bg-red-500/20 rounded-lg p-3">
                    <span className="text-red-400 font-bold">3.</span>
                    <span className="text-white/80 text-sm">VERIFY - check your lock is still in place</span>
                  </div>
                  <div className="flex items-center gap-3 bg-red-500/20 rounded-lg p-3">
                    <span className="text-red-400 font-bold">4.</span>
                    <span className="text-white/80 text-sm">TEST - prove dead if safe to approach test point</span>
                  </div>
                  <div className="flex items-center gap-3 bg-red-500/20 rounded-lg p-3">
                    <span className="text-red-400 font-bold">5.</span>
                    <span className="text-white/80 text-sm">REPORT - notify supervisor and investigate</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Electric Shock Response</h4>
                <div className="space-y-2 text-white/80 text-sm">
                  <p><strong>Do not touch the casualty</strong> if they're still in contact with the source</p>
                  <p><strong>Isolate the supply</strong> if safe to do so (emergency stop, RCD, main switch)</p>
                  <p><strong>Call for help</strong> - emergency services and first aiders</p>
                  <p><strong>If safe, move casualty</strong> clear using insulated materials</p>
                  <p><strong>Commence CPR</strong> if not breathing and you're trained</p>
                  <p><strong>Apply AED</strong> if available and indicated</p>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-1">Know Before You Need</h4>
                    <p className="text-white/80 text-sm">
                      Before starting work: know the location of emergency stops, isolation points, first aid equipment, AED, and emergency exits. Know who to call and how. This planning takes seconds but can save lives.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Inline Check 3 */}
        <section className="px-4 mb-8">
          <InlineCheck
            question="What stored energy hazard can remain in motor drive equipment even after electrical isolation and proving dead?"
            correctAnswer="Capacitor charge - large capacitors in variable speed drives can retain lethal voltage for extended periods after isolation"
            explanation="DC bus capacitors in motor drives are designed to store significant energy. They have bleed resistors but these take time (often several minutes). Always allow manufacturer-specified discharge time or use approved discharge procedures."
          />
        </section>

        {/* Practical Guidance */}
        <section className="px-4 mb-8">
          <h2 className="text-ios-headline font-semibold text-white mb-4">Practical Guidance</h2>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <div className="bg-green-500/10 rounded-xl p-4">
                <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Top Tips
                </h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• Make checking your lock the first thing you do after every break</li>
                  <li>• When working near live parts, plan your movements to avoid reaching across</li>
                  <li>• Use non-conductive tools where possible near live equipment</li>
                  <li>• Maintain situational awareness - know what's happening around you</li>
                  <li>• When in doubt about anything, stop and verify</li>
                </ul>
              </div>

              <div className="bg-red-500/10 rounded-xl p-4">
                <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Common Mistakes
                </h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• Assuming someone else's isolation covers your work</li>
                  <li>• Not re-proving dead after extended breaks</li>
                  <li>• Forgetting about capacitor discharge times</li>
                  <li>• Poor communication during team work or handovers</li>
                  <li>• Getting complacent because "nothing has happened"</li>
                </ul>
              </div>

              <div className="bg-blue-500/10 rounded-xl p-4">
                <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Key Principles
                </h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• <strong>Your lock = your safety</strong> - never compromise on it</li>
                  <li>• <strong>Communication is critical</strong> - especially in teams</li>
                  <li>• <strong>Isolation isn't everything</strong> - consider stored energy</li>
                  <li>• <strong>When in doubt, verify</strong> - re-prove dead</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQs */}
        <section className="px-4 mb-8">
          <h2 className="text-ios-headline font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {defined_defined_defined_defined_faqs.map((faq, index) => (
              <Card key={index} variant="ios" className="bg-white/5 border-white/10">
                <button
                  className="w-full p-4 text-left flex items-center justify-between touch-target"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="text-white/90 font-medium text-sm pr-4">{faq.question}</span>
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/50 flex-shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-4 pb-4">
                    <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Reference Card */}
        <section className="px-4 mb-8">
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
        <section className="px-4 mb-8">
          <Quiz
            title="Test Your Knowledge"
            questions={defined_defined_defined_quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="px-4 pb-safe">
          <div className="flex gap-3">
            <Button
              variant="ios-secondary"
              className="flex-1 h-12"
              onClick={() => navigate('/study-centre/apprentice/upskilling/inspection-testing/module2/section4')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              variant="ios-primary"
              className="flex-1 h-12"
              onClick={() => navigate('/study-centre/apprentice/upskilling/inspection-testing/module2/section6')}
            >
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </div>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule2Section5;
