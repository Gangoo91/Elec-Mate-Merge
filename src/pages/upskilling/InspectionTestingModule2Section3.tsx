import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Zap, CheckCircle, Lock, Tag, Users, Key, FileText, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';
import useSEO from '@/hooks/useSEO';

const InspectionTestingModule2Section3 = () => {
  useSEO({
    title: "Lock-Off/Tag-Out Procedures | Safe Isolation | Inspection & Testing Course",
    description: "Master lock-out tag-out (LOTO) procedures for electrical isolation. Learn about personal locks, multi-lock hasps, warning tags, and permit-to-work systems."
  });

  const defined_faqs = [
    {
      question: "Who can remove my personal lock from an isolation point?",
      answer: "Only YOU should remove your personal lock - that's the fundamental principle of LOTO. However, in genuine emergencies where you cannot be contacted, most organisations have a documented lock removal procedure requiring: senior management authorisation, verification the circuit/equipment is safe to energise, documented evidence of attempts to contact the lock owner, and witnessed removal."
    },
    {
      question: "What if I need to leave site before work is complete?",
      answer: "Never leave your lock in place if you're not continuing the work. Before leaving: verify the work status with team members, ensure proper handover to the next worker who must apply their own lock, remove your lock only after the replacement worker's lock is in place (if using multi-hasp), and document the handover."
    },
    {
      question: "Can I use the same lock for multiple isolation points?",
      answer: "No - you need to apply your personal lock to EVERY isolation point protecting your work. If a circuit requires isolation at multiple points (e.g., main supply and backup supply), each point needs your lock. Use multiple padlocks (all keyed alike to the same key if preferred)."
    },
    {
      question: "What information should be on a warning tag?",
      answer: "At minimum: 'DANGER - DO NOT OPERATE' or similar warning, name of person who applied it, date and time applied, reason for isolation (brief description), and contact number or location of key holder. Tags should be durable, clearly legible, and attached with non-reusable ties."
    },
    {
      question: "What's the difference between LOTO and a permit-to-work?",
      answer: "LOTO is a physical isolation method using locks and tags to prevent equipment operation. A permit-to-work (PTW) is a documented management system that authorises and controls hazardous work, including specifying required isolations. For complex or high-risk work, both are used together."
    },
    {
      question: "How do group lockout procedures work?",
      answer: "When multiple workers need protection from the same isolation: a competent person performs and verifies the isolation, they apply their lock to a multi-hasp device, each worker adds their personal lock to the same hasp, work proceeds, each worker removes their own lock when finished, and the supervisor removes their lock last."
    },
    {
      question: "Are there different types of locks for different purposes?",
      answer: "Yes, organisations often use colour-coded padlocks: Red = personal lockout (individual workers), Blue = group lockout (supervisor's lock), Yellow = maintenance/testing, Green = operational/temporary. All locks should be durable, identifiable (engraved name/number), and used only for lockout purposes."
    },
    {
      question: "What should I do if I find an unattended lock on equipment I need to use?",
      answer: "Never remove or bypass an unattended lock. Instead: try to identify the owner (check tag, ask colleagues), contact the owner to verify the work status, if you cannot contact them, report to supervision, and wait for authorisation through proper lock removal procedure."
    }
  ];

  const quizQuestions = [
    {
      question: "What is the primary purpose of a personal padlock in LOTO procedures?",
      options: ["To prevent theft of equipment", "To ensure only the worker who applied it can remove it", "To identify who is responsible for the equipment", "To comply with insurance requirements"],
      correctAnswer: 1,
      explanation: "The personal padlock ensures that only the worker who applied it can remove it, preventing re-energisation while they are working on or near the isolated equipment."
    },
    {
      question: "When multiple workers need protection from the same isolation point, what device allows multiple padlocks to be applied?",
      options: ["Multi-point isolator", "Distribution lock", "Multi-lock hasp (scissor hasp)", "Gang lock"],
      correctAnswer: 2,
      explanation: "A multi-lock hasp (also called scissor hasp) has multiple holes allowing several padlocks to be attached. The isolation cannot be removed until all padlocks are removed."
    },
    {
      question: "What minimum information should be on a danger tag attached to an isolation point?",
      options: ["Just 'DANGER'", "The circuit reference number only", "Name of person, date/time applied, reason for isolation", "Company logo and safety policy"],
      correctAnswer: 2,
      explanation: "Warning tags must identify who applied the isolation (name), when (date/time), and why (reason for isolation). This allows anyone finding the tag to understand the isolation status."
    },
    {
      question: "In a group lockout scenario, who should remove their lock last?",
      options: ["The first person who finished their work", "Anyone who verifies the work is complete", "The supervisor or person who performed the initial isolation", "The most senior person on site"],
      correctAnswer: 2,
      explanation: "The supervisor or authorised person who performed the initial isolation removes their lock last, ensuring they can verify all work is complete and all other workers have removed their locks."
    },
    {
      question: "What should you do if you cannot find the key to your own padlock at the end of the work?",
      options: ["Cut the lock off yourself", "Ask a colleague to cut it off", "Follow your organisation's lock removal procedure with management authorisation", "Leave the lock in place and go home"],
      correctAnswer: 2,
      explanation: "Even for your own lock, follow the documented lock removal procedure. This typically requires management authorisation, verification the circuit is safe, and documented evidence."
    },
    {
      question: "What colour padlock is typically used for personal lockout (individual worker protection)?",
      options: ["Blue", "Red", "Yellow", "Green"],
      correctAnswer: 1,
      explanation: "Red padlocks are typically assigned for personal lockout - protecting individual workers during maintenance or testing."
    },
    {
      question: "Why must warning tags be attached with non-reusable ties?",
      options: ["They are cheaper than reusable ties", "To prevent tags being moved between isolation points", "For environmental reasons", "To make them more visible"],
      correctAnswer: 1,
      explanation: "Non-reusable ties ensure tags cannot be removed and reattached to different isolation points, which could create dangerous confusion about what is actually isolated."
    },
    {
      question: "When is a permit-to-work typically required in addition to LOTO?",
      options: ["For all electrical work", "Only for work above 1000V", "For complex isolations involving multiple energy sources or high-risk work", "Only when working alone"],
      correctAnswer: 2,
      explanation: "Permits-to-work are typically required for complex isolations with multiple energy sources, high-risk work, or where work affects other systems."
    },
    {
      question: "If you find equipment you need to use has an unattended lock on it, what is the correct action?",
      options: ["Remove the lock if it's been there more than an hour", "Cut the lock and add your own", "Identify the owner and follow proper procedures", "Assume the work is finished and remove the lock"],
      correctAnswer: 2,
      explanation: "Never remove an unattended lock without proper authorisation. Identify the owner, contact them to verify work status, or report to supervision."
    },
    {
      question: "What does 'Try' refer to in the isolation sequence 'Isolate-Lock-Tag-Try'?",
      options: ["Try to find the isolation point", "Try to operate the isolated equipment to verify isolation", "Try the key in the lock", "Try to contact the worker"],
      correctAnswer: 1,
      explanation: "'Try' means attempting to operate the isolated equipment (pressing start button, etc.) to verify the isolation is effective, done AFTER locking and tagging but BEFORE starting work."
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
          <span className="text-xs text-muted-foreground">Section 3 of 6</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-24 max-w-3xl mx-auto">
        {/* Centered Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-elec-yellow" />
            <span className="text-sm text-muted-foreground">Module 2 Section 3</span>
          </div>
          <h1 className="text-2xl font-bold">Lock-Off/Tag-Out Procedures</h1>
        </div>

        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mb-8">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Personal Lock</p>
              <p className="font-medium">Only YOU can remove it</p>
            </div>
            <div>
              <p className="text-muted-foreground">Warning Tag</p>
              <p className="font-medium">Name, date, time, reason</p>
            </div>
            <div>
              <p className="text-muted-foreground">Multi-Hasp</p>
              <p className="font-medium">Multiple workers, one point</p>
            </div>
            <div>
              <p className="text-muted-foreground">LOTO Sequence</p>
              <p className="font-medium">Isolate-Lock-Tag-Try-Prove</p>
            </div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Apply personal lock-off devices correctly to prevent re-energisation</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Use appropriate warning tags and labels according to site procedures</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Implement multi-lock hasp systems for team working scenarios</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Understand permit-to-work requirements for complex isolations</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Manage key control and lock-off documentation</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Follow correct procedures for lock-off removal and re-energisation</span>
            </div>
          </div>
        </div>

        {/* Section 01: LOTO Fundamentals */}
        <section className="mb-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            <h2 className="text-xl font-semibold">LOTO Fundamentals</h2>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Lock-Out Tag-Out (LOTO) is a safety procedure that uses physical locks and warning tags to ensure hazardous energy sources cannot be released while work is being performed. It is the critical follow-up to electrical isolation, ensuring the isolation remains secure.
            </p>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Lock className="w-4 h-4 text-elec-yellow" />
                The LOTO Sequence
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">1. ISOLATE</p>
                    <p className="text-sm">Identify and operate all isolation points</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">2. LOCK</p>
                    <p className="text-sm">Apply personal padlock to each isolation point</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <Tag className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">3. TAG</p>
                    <p className="text-sm">Attach warning tag with your details</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">4. TRY</p>
                    <p className="text-sm">Attempt to operate equipment to verify isolation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">5. PROVE DEAD</p>
                    <p className="text-sm">Use approved voltage indicator to confirm dead</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-400 font-semibold mb-1">Critical Principle</h4>
                  <p className="text-sm">
                    <strong>One person, one lock.</strong> Your personal padlock stays in your possession until you remove it. Never give your key to anyone else, and never remove someone else's lock without following emergency procedures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Personal Padlock Requirements */}
        <section className="mb-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            <h2 className="text-xl font-semibold">Personal Padlock Requirements</h2>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Your personal padlock is your primary protection against re-energisation. It must be under your exclusive control at all times and identifiable as yours.
            </p>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">Padlock Specifications</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Durable construction:</strong> Metal body and shackle - not for physical security but for durability</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Identifiable:</strong> Engraved with your name or unique identifier</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Unique key:</strong> Different key from other locks (or keyed alike set for your use only)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Dedicated use:</strong> Used only for LOTO - never for securing property</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Colour coded:</strong> Red for personal isolation (typically)</span>
                </li>
              </ul>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">Colour Coding System (Typical)</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 bg-red-500/20 rounded-lg p-3">
                  <div className="w-6 h-6 rounded bg-red-500"></div>
                  <div>
                    <p className="text-foreground text-sm font-medium">RED</p>
                    <p className="text-xs">Personal lockout</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-blue-500/20 rounded-lg p-3">
                  <div className="w-6 h-6 rounded bg-blue-500"></div>
                  <div>
                    <p className="text-foreground text-sm font-medium">BLUE</p>
                    <p className="text-xs">Supervisor/group</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-yellow-500/20 rounded-lg p-3">
                  <div className="w-6 h-6 rounded bg-yellow-500"></div>
                  <div>
                    <p className="text-foreground text-sm font-medium">YELLOW</p>
                    <p className="text-xs">Maintenance</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-green-500/20 rounded-lg p-3">
                  <div className="w-6 h-6 rounded bg-green-500"></div>
                  <div>
                    <p className="text-foreground text-sm font-medium">GREEN</p>
                    <p className="text-xs">Operational</p>
                  </div>
                </div>
              </div>
              <p className="text-xs mt-3">Note: Colour schemes vary between organisations - always follow your company's system.</p>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <div className="mb-8">
          <InlineCheck
            question="Why must LOTO padlocks be used exclusively for lockout purposes and never for securing property?"
            correctAnswer="To maintain the integrity of the LOTO system - if locks are used for other purposes, they may not be available when needed for safety, and the system loses its disciplined approach"
            explanation="Dedicated LOTO locks ensure the system maintains its safety purpose. Mixed-use locks can lead to confusion about whether a lock is for safety or security, and locks may be unavailable when needed for critical isolation."
          />
        </div>

        {/* Section 03: Warning Tags */}
        <section className="mb-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            <h2 className="text-xl font-semibold">Warning Tags</h2>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Warning tags (danger tags) provide essential information about who has isolated the equipment and why. They supplement locks but must <strong>never be used alone</strong> as they can be removed without tools.
            </p>

            <div className="bg-red-600 rounded-lg p-4">
              <div className="text-center border-b border-white/30 pb-2 mb-3">
                <p className="text-white text-xl font-black">DANGER</p>
                <p className="text-white font-bold text-sm">DO NOT OPERATE</p>
              </div>
              <div className="space-y-1 text-white text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Isolated by:</span>
                  <span className="font-medium">J. Smith</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Date:</span>
                  <span className="font-medium">15/01/2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Time:</span>
                  <span className="font-medium">09:30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Reason:</span>
                  <span className="font-medium">Cable repair</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Contact:</span>
                  <span className="font-medium">07xxx xxxxxx</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">Tag Requirements</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Durable material:</strong> Waterproof, tear-resistant (plastic or laminated card)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Clear warning:</strong> Bold DANGER message visible from distance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Non-reusable ties:</strong> Single-use attachment to prevent moving tags</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Permanent writing:</strong> Use indelible marker - info must not wash off</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-400 font-semibold mb-1">Tags Are Not Locks</h4>
                  <p className="text-sm">
                    Warning tags alone do not physically prevent operation - they rely on people reading and respecting them. Always use tags <strong>with</strong> padlocks, never as a substitute.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Multi-Lock Hasps */}
        <section className="mb-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            <h2 className="text-xl font-semibold">Multi-Lock Hasps</h2>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              When multiple workers need protection from the same isolation point, a <strong>multi-lock hasp</strong> (or scissor hasp) allows each person to apply their own padlock. The isolation cannot be removed until everyone has finished and removed their lock.
            </p>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-elec-yellow" />
                Group Lockout Procedure
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-400 font-bold text-xs">1</div>
                  <div>
                    <p className="text-foreground font-medium text-sm">Supervisor Performs Isolation</p>
                    <p className="text-xs">Competent person isolates and verifies all energy sources</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-400 font-bold text-xs">2</div>
                  <div>
                    <p className="text-foreground font-medium text-sm">Attach Multi-Lock Hasp</p>
                    <p className="text-xs">Hasp attached to isolation point, supervisor's lock applied</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 text-red-400 font-bold text-xs">3</div>
                  <div>
                    <p className="text-foreground font-medium text-sm">Workers Apply Personal Locks</p>
                    <p className="text-xs">Each worker adds their own padlock to the hasp</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 text-green-400 font-bold text-xs">4</div>
                  <div>
                    <p className="text-foreground font-medium text-sm">Work Proceeds</p>
                    <p className="text-xs">All workers protected until they remove their own locks</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 text-orange-400 font-bold text-xs">5</div>
                  <div>
                    <p className="text-foreground font-medium text-sm">Workers Remove Locks When Finished</p>
                    <p className="text-xs">Each worker removes only their own lock when clear</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-400 font-bold text-xs">6</div>
                  <div>
                    <p className="text-foreground font-medium text-sm">Supervisor Removes Last</p>
                    <p className="text-xs">Verifies all clear, removes final lock, authorises re-energisation</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">Hasp Types</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-background/50 rounded-lg p-3">
                  <h5 className="text-elec-yellow font-medium mb-1">Scissor Hasp (6-hole)</h5>
                  <p>Most common type - accommodates up to 6 padlocks. Jaws fold flat when not all holes used.</p>
                </div>
                <div className="bg-background/50 rounded-lg p-3">
                  <h5 className="text-elec-yellow font-medium mb-1">Extended Hasp (8-12 hole)</h5>
                  <p>For larger teams or complex isolations. May use interlocking hasps for more capacity.</p>
                </div>
                <div className="bg-background/50 rounded-lg p-3">
                  <h5 className="text-elec-yellow font-medium mb-1">Lockout Box</h5>
                  <p>Contains keys for multiple isolation points. Each worker's lock secures the box, controlling all keys inside.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <div className="mb-8">
          <InlineCheck
            question="In a group lockout scenario, why must the supervisor remove their lock LAST?"
            correctAnswer="To ensure all workers have finished and removed their locks, and to verify the area is clear before authorising re-energisation"
            explanation="The supervisor's final lock ensures the isolation remains until everyone is accounted for. Only after confirming all work is complete and all workers have removed their locks can the supervisor remove theirs and authorise re-energisation."
          />
        </div>

        {/* Section 05: Permit-to-Work Systems */}
        <section className="mb-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            <h2 className="text-xl font-semibold">Permit-to-Work Systems</h2>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              A permit-to-work (PTW) is a formal documented system providing additional management control for high-risk work. It specifies the work to be done, hazards involved, and precautions required including isolation requirements.
            </p>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-elec-yellow" />
                When Permits Are Required
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Work on HV equipment (always)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Complex isolations with multiple energy sources</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Work affecting critical systems or other workers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Work in hazardous areas (confined spaces, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Work crossing shift changes or multiple days</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Third-party contractor work on site systems</span>
                </li>
              </ul>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">Permit Contents</h4>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="bg-background/50 rounded-lg p-3">
                  <span className="text-elec-yellow font-medium">Description:</span>
                  <span className="ml-2">Precise description of work and location</span>
                </div>
                <div className="bg-background/50 rounded-lg p-3">
                  <span className="text-elec-yellow font-medium">Isolations:</span>
                  <span className="ml-2">All isolation points identified and signed off</span>
                </div>
                <div className="bg-background/50 rounded-lg p-3">
                  <span className="text-elec-yellow font-medium">Hazards:</span>
                  <span className="ml-2">Identified hazards and control measures</span>
                </div>
                <div className="bg-background/50 rounded-lg p-3">
                  <span className="text-elec-yellow font-medium">PPE:</span>
                  <span className="ml-2">Required personal protective equipment</span>
                </div>
                <div className="bg-background/50 rounded-lg p-3">
                  <span className="text-elec-yellow font-medium">Authorisation:</span>
                  <span className="ml-2">Signatures of issuer and recipient</span>
                </div>
                <div className="bg-background/50 rounded-lg p-3">
                  <span className="text-elec-yellow font-medium">Time Limits:</span>
                  <span className="ml-2">Validity period and renewal requirements</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-1">PTW + LOTO Together</h4>
              <p className="text-sm">
                The permit specifies WHAT isolations are required. LOTO physically implements those isolations. The permit provides documented management control; locks provide physical protection. Both work together for comprehensive safety.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Lock Removal and Re-energisation */}
        <section className="mb-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            <h2 className="text-xl font-semibold">Lock Removal and Re-energisation</h2>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              The safe removal of locks and re-energisation of equipment is just as important as the initial isolation. Rushing this process or not following correct procedures has caused many accidents.
            </p>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">Before Removing Your Lock</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Verify your work is complete and tested</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>All tools and materials removed from work area</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>All personnel clear of the equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Guards and covers replaced</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Team members aware re-energisation is imminent</span>
                </li>
              </ul>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">Re-energisation Sequence</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-elec-yellow font-bold text-xs">1</div>
                  <span className="text-sm">Confirm all workers have removed their locks</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-elec-yellow font-bold text-xs">2</div>
                  <span className="text-sm">Physical check that work area is clear</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-elec-yellow font-bold text-xs">3</div>
                  <span className="text-sm">Remove warning tags (destroy used tags)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-elec-yellow font-bold text-xs">4</div>
                  <span className="text-sm">Remove final lock(s) from isolation points</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-elec-yellow font-bold text-xs">5</div>
                  <span className="text-sm">Alert affected persons before re-energising</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-elec-yellow font-bold text-xs">6</div>
                  <span className="text-sm">Close isolation devices and restore supply</span>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-400 font-semibold mb-2">Emergency Lock Removal</h4>
              <p className="text-sm mb-2">
                If a lock must be removed and the owner is unavailable, follow your organisation's documented emergency procedure:
              </p>
              <ul className="space-y-1 text-xs">
                <li>• Management authorisation required (documented)</li>
                <li>• All reasonable efforts to contact owner documented</li>
                <li>• Verification equipment is safe to energise</li>
                <li>• Witnessed removal with documented evidence</li>
                <li>• Lock owner notified at earliest opportunity</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <div className="mb-8">
          <InlineCheck
            question="What should be done with used warning tags after lock removal?"
            correctAnswer="They should be destroyed - not reused - to prevent confusion about isolation status"
            explanation="Destroying used tags prevents any possibility of confusion about what is currently isolated. Reused tags could cause dangerous misunderstandings if they contain outdated information from previous isolations."
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
            title="LOTO Quick Reference"
            items={[
              { term: "Personal Lock", definition: "Unique to you, only you hold the key" },
              { term: "Warning Tag", definition: "Name, date, time, reason, contact - never alone" },
              { term: "Multi-Hasp", definition: "6+ holes for multiple workers' locks" },
              { term: "LOTO Sequence", definition: "Isolate - Lock - Tag - Try - Prove Dead" },
              { term: "Permit-to-Work", definition: "Documented control for complex/high-risk work" },
              { term: "Re-energisation", definition: "All locks removed, area clear, alert given" },
              { term: "Emergency Removal", definition: "Management authorised, documented, witnessed" }
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
          <Link to="/study-centre/upskilling/inspection-testing/module-2/section-2" className="flex-1">
            <Button variant="ghost" className="w-full justify-start">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link to="/study-centre/upskilling/inspection-testing/module-2/section-4" className="flex-1">
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

export default InspectionTestingModule2Section3;
