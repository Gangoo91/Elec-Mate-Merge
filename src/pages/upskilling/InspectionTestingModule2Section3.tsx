import { ArrowLeft, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 462.3 lists three example precautions for preventing inadvertent closure of an isolation device. Which combination matches the regulation verbatim?',
    options: [
      'Locking the breaker, removing the fuse, and posting a guard',
      'Located within a lockable space or lockable enclosure; padlocking; located adjacent to the associated equipment',
      'Tagging, padlocking, and witness sign-off',
      'A red lock, a blue lock, and a permit-to-work',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 462.3 lists three examples verbatim: (a) located within a lockable space or lockable enclosure, (b) padlocking, (c) located adjacent to the associated equipment. They are not exhaustive — but they are the named precautions you can cite if challenged.',
  },
  {
    id: 2,
    question:
      'A multi-hasp scissor device has six holes. Three operatives are working on the same isolated circuit. How many padlocks should be on the hasp during the work?',
    options: [
      'One — the supervisor opens it for everyone',
      'Three — one per operative',
      'Four — one per operative plus the lead spark',
      'Six — fill every hole for redundancy',
    ],
    correctAnswer: 1,
    explanation:
      'One person, one lock. Each operative fits their own padlock when they arrive, removes it when they leave the work. The hasp cannot be reopened until every lock is gone. The supervisor only adds a lock if they themselves are working on the system.',
  },
  {
    id: 3,
    question:
      'During a kitchen rewire, the apprentice goes for lunch. Their personal lock is still on the multi-hasp at the consumer unit. What is the correct action when they return?',
    options: [
      'Nothing — the lock has been on the whole time, work resumes',
      'Re-prove dead at the point of work before any cable is touched',
      'Just check the lock is still there and crack on',
      'Remove the lock, prove dead, then refit the lock',
    ],
    correctAnswer: 1,
    explanation:
      'A lock that stayed in place is a strong indication the circuit was not re-energised, but it is not a substitute for re-proving dead. After any break in work — and certainly after the work area was unattended — re-prove dead at the point of work using the prove-test-prove sequence before any conductor is touched.',
  },
  {
    id: 4,
    question:
      'Who can remove a personal lock from an isolation point? Pick the strictest correct answer.',
    options: [
      'Anyone on site, once the work appears complete',
      'The site supervisor, at any time',
      'Only the person who fitted it, except under a documented emergency lock-removal procedure with management authorisation, verification of safety, and witnessed removal',
      'Anyone holding a duplicate key',
    ],
    correctAnswer: 2,
    explanation:
      'The principle is one person, one lock, one key. Only the operative who fitted the lock removes it. The single tightly-controlled exception is the documented emergency procedure: management authorisation, verification the equipment is safe to re-energise, recorded attempts to contact the lock owner, and witnessed removal. This is a last resort, not a workaround.',
  },
  {
    id: 5,
    question:
      'You arrive at a board to start work and find an MCB lock-off device already fitted with an unattended padlock and a tag with no name on it. What do you do?',
    options: [
      'Cut the lock off — an unsigned tag is invalid',
      'Identify the owner, contact them to verify status, and if you cannot, escalate via the documented lock-removal procedure. Do not bypass or cut the lock',
      'Add your own lock to the same MCB and start work',
      'Override the MCB at the next isolation point upstream',
    ],
    correctAnswer: 1,
    explanation:
      'An unattended lock means somebody, somewhere, may be relying on it for safety. You never cut, bypass, or override it on your own authority. Identify, contact, escalate. The illegible tag is a separate problem to raise with the originator after the safety question is settled.',
  },
  {
    id: 6,
    question:
      'OSG Appendix M directs you to two external sources for safe-isolation working practice. Which two?',
    options: [
      'BS EN 61010 and BS EN 61557',
      'HSE HSG85 (Electricity at Work: Safe Working Practices) and Electrical Safety First Best Practice Guide 2',
      'IET Wiring Regulations summary and BS 7909',
      'BS 7671 Appendix 6 and the EAWR Approved Code of Practice',
    ],
    correctAnswer: 1,
    explanation:
      'OSG Appendix M cites HSE HSG85 (the HSE’s safe-working publication) and Electrical Safety First Best Practice Guide 2 as the procedural sources for safe-isolation and lock-off. BS 7671 itself states the principle (Reg 462.3, Reg 537.2.4); the HSG85 + BPG2 documents give you the step-by-step.',
  },
  {
    id: 7,
    question:
      'Reg 537.2.4 reinforces Reg 462.3 by giving the same list of acceptable means. According to Reg 537.2.4, which of these is also explicitly permitted?',
    options: [
      'Removing the breaker entirely and putting it in a tool bag',
      'Locating the device in a lockable space or lockable enclosure, or by padlocking, or by other suitable means',
      'A verbal hand-over to the next shift',
      'Painting the breaker red',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 537.2.4 states: “This may be achieved by locating the device in a lockable space or lockable enclosure or by padlocking or by other suitable means.” It deliberately mirrors Reg 462.3 and adds the open phrase “other suitable means” — you can use a method not specifically listed if it achieves the same result, but the burden is on you to justify it.',
  },
  {
    id: 8,
    question:
      'A site uses an isolation device that is not directly lockable. Per Reg 537.2.5, what alternative is explicitly permitted for off-load isolating devices?',
    options: [
      'Just leave a tag on it',
      'Locate the device in a lockable space or lockable enclosure, padlock it, or interlock it with a load-breaking device',
      'Replace it with a lockable one only at the next maintenance window',
      'Use a witness instead of a lock',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 537.2.5 covers off-load isolators (e.g. isolation links): “Provision shall be made for securing off-load isolating devices against unwanted or unintentional opening. This may be achieved, for example, by locating the device in a lockable space or lockable enclosure or by padlocking. Alternatively, the off-load device may be interlocked with a load-breaking one.” Interlocking is the third route.',
  },
  {
    id: 9,
    question:
      'A tag without a lock on an isolation device — what is its legal/regulatory status under BS 7671?',
    options: [
      'Equivalent to a lock — Reg 462.3 accepts tags as a precaution',
      'A useful information aid, but not, on its own, a means of preventing inadvertent closure under Reg 462.3 — it must accompany a physical lock or another listed means',
      'Required by Reg 537.2.7 in addition to a lock',
      'Only acceptable on HV systems',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 462.3 names lockable enclosure, padlocking and adjacent location as the means of preventing inadvertent closure. A tag is information; it does not physically prevent closure. Tags are essential for identifying who, why and contact — but never as a substitute for the physical lock. Reg 537.2.7 separately requires durable identification of the device, which is an identity duty, not an isolation duty.',
  },
  {
    id: 10,
    question:
      'An MCB lock-off jaw fits the breaker toggle but a colleague observes that, with the jaw clipped on, the breaker can still be flicked back to ON if pushed firmly. The padlock is engaged. What is the correct call?',
    options: [
      'Acceptable — the padlock is on, the device satisfies Reg 462.3',
      'Not acceptable. Reg 462.3 requires the device to prevent inadvertent closure. If the breaker can still be operated, the lock-off is not fit for purpose. Replace the lock-off jaw with one matched to the breaker, or isolate at the next upstream device',
      'Acceptable as long as a tag is also fitted',
      'Acceptable for radial circuits only',
    ],
    correctAnswer: 1,
    explanation:
      'A lock-off device that does not actually block the breaker mechanism does not satisfy Reg 462.3 — the regulation is about preventing inadvertent closure, not about looking like it does. MCB lock-off jaws are size/brand specific; the wrong jaw is worse than no jaw, because it gives false confidence. Use the correct jaw or isolate further upstream at a device that can be properly secured.',
  },
];

const inlineChecks = [
  {
    id: 'mod2-s3-462-3-named-routes',
    question:
      'A client questions why your lock-off scheme uses a padlocked cabinet door rather than a padlock directly on the device. Which Reg 462.3 named route are you relying on, and is it valid?',
    options: [
      'None — only padlocking on the device satisfies Reg 462.3.',
      'Reg 462.3(a) — located within a lockable space or lockable enclosure. Yes, it is one of three named routes verbatim in the regulation, alongside (b) padlocking and (c) located adjacent to the associated equipment.',
      'Reg 537.2.7 — labelling.',
      'Reg 514 — identification.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 462.3 names three example precautions verbatim: (a) lockable space or enclosure, (b) padlocking, (c) adjacent to equipment. The lockable cabinet door is route (a) — perfectly valid and explicitly named. Reg 537.2.4 mirrors the same duty and adds "or by other suitable means" to keep it open.',
  },
  {
    id: 'mod2-s3-multi-hasp-count',
    question:
      'Three sparks plus a supervisor are working on the same isolated panel. The supervisor is overseeing only — not touching conductors. How many padlocks should be on the multi-hasp?',
    options: [
      'Four — one per person on site, including the supervisor.',
      'Three — one per operative actually working on conductors. The supervisor only adds a lock if they are personally working on the system. A "supervisor blue lock" left after they leave is a fiction nobody is protected by.',
      'One — the supervisor locks for the team.',
      'Six — fill every hole for redundancy.',
    ],
    correctIndex: 1,
    explanation:
      'One person, one lock — for each person actively working on the isolated system. A supervisor who is only overseeing and never touches conductors does not fit a lock; if they did, and they left site, the lock would stay on without an active worker behind it. The principle is personal accountability tied to the work, not to the role.',
  },
  {
    id: 'mod2-s3-tag-vs-lock',
    question:
      'You arrive at a board where the previous shift left a paper tag wrapped around the MCB toggle reading "DO NOT OPERATE — DANGER". The MCB is still in the ON position. The tag has a name and a phone number. Is this compliant with Reg 462.3?',
    options: [
      'Yes — the tag identifies the operative and the danger.',
      'Yes, provided the tag is laminated.',
      'No. Reg 462.3 names lockable enclosure, padlocking, and adjacent location as the means of preventing inadvertent closure. A tag is information; it does not physically prevent the toggle moving. The MCB is also still in the ON position — the isolation has not even happened.',
      'No, but only because the tag is paper.',
    ],
    correctIndex: 2,
    explanation:
      'Reg 462.3 wants a physical barrier to inadvertent closure. A tag conveys information; it does not block movement. And the MCB being ON shows isolation never happened. The two failures stack: no isolation, and no lock-off device. Tag without lock is information without protection — exactly what Reg 462.3 is structured to prevent.',
  },
  {
    id: 'mod2-s3-emergency-removal',
    question:
      'A spark goes home with their personal lock still on a multi-hasp at a tenanted property. Saturday morning the client demands the supply restored. You cannot reach the spark by phone. What is the correct sequence?',
    options: [
      'Cut the lock — the client is paying.',
      'Use the documented emergency lock-removal procedure: management authorisation in writing, repeated contact attempts logged, a competent person re-proves dead at the work area, witnessed cutting, lock owner notified at earliest opportunity afterwards. The procedure is for emergencies; over-using it for convenience erodes the principle.',
      'Re-energise without cutting and address the lock on Monday.',
      'Cut the lock and bin it without paperwork — the spark forfeited it.',
    ],
    correctIndex: 1,
    explanation:
      'The emergency lock-removal procedure exists precisely for this scenario but with strict structure: written authorisation, logged contact attempts, competent re-proving, witness, owner notified. Skipping the structure turns the procedure into a workaround. The far better answer is to brief operatives that locks come off before they leave site — every time.',
  },
];

const InspectionTestingModule2Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Lock-off and tag-out procedures | I&T Module 2.3 | Elec-Mate',
    description:
      'Reg 462.3 + Reg 537.2.4/2.5 + OSG Appendix M: lock-off devices, tag information, multi-operative hasp working, lock removal, and the documentation that ties it to the day’s risk assessment.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3"
            title="Lock-off and tag-out procedures"
            description="Reg 462.3 says the isolation device must prevent inadvertent closure. This is how you actually deliver that on site — single-padlock, multi-hasp, MCB lock-off, tag information, and the rules around removal."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 462.3 is the duty: devices for isolation shall be designed and/or installed so as to prevent unintentional or inadvertent closure. The named examples are (a) lockable space or enclosure, (b) padlocking, (c) located adjacent to the equipment.',
              'Reg 537.2.4 mirrors that duty for selection and erection: lockable space, lockable enclosure, padlocking, or other suitable means. Reg 537.2.5 adds interlocking as a fourth route for off-load isolators.',
              'A tag is not a lock. Tags carry information — who, when, why, contact — and they live on top of the lock, never instead of it.',
              'Multi-operative work: every operative fits their own padlock to a multi-hasp at the isolation point. Each operative removes only their own lock when they leave. Last lock off authorises re-energisation.',
              'OSG Appendix M points to HSE HSG85 and Electrical Safety First Best Practice Guide 2 for the procedural detail. BS 7671 sets the duty; HSG85/BPG2 set the steps.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the duty in Reg 462.3 and the four routes (lockable space, lockable enclosure, padlocking, other suitable means) named in Reg 537.2.4 / 537.2.5',
              'Select the correct lock-off device for any given isolation point (single padlock, multi-hasp, MCB lock-off jaw, breaker lock-out kit, lockout box)',
              'Specify the minimum information set on a danger tag and explain why each item exists',
              'Run a multi-operative isolation: hasp fitted, each operative’s lock applied, each removed only by its owner, last lock off authorises re-energisation',
              'Recognise an unattended lock and follow the right escalation — never cut, never bypass',
              'Document the isolation in the day’s risk assessment / permit-to-work so the chain of evidence stands up if challenged',
            ]}
          />

          <ContentEyebrow>What the regulation actually says</ContentEyebrow>

          <ConceptBlock
            title="Reg 462.3 — the duty to prevent inadvertent closure"
            plainEnglish="Once you have isolated a circuit, the isolation device itself has to be in a state where nobody can flick it back on by accident. BS 7671 names three example routes: keep it inside a lockable space or enclosure, padlock the device, or position the device right next to the equipment so the person working on it controls it personally."
            onSite="Reg 462.3 is the legal hook for everything that follows. Every lock-off product, every multi-hasp, every MCB lock-off jaw is a way of delivering this one duty. If you cannot show, after the fact, that the device prevented inadvertent closure, the isolation was not compliant — even if nothing went wrong."
          >
            <p>
              Reg 462.3 in BS&nbsp;7671:2018+A4:2026 is short and precise. The wording is:
              &ldquo;Devices for isolation shall be designed and/or installed so as to prevent
              unintentional or inadvertent closure.&rdquo; The regulation then lists three example
              precautions: (a) located within a lockable space or lockable enclosure, (b)
              padlocking, (c) located adjacent to the associated equipment.
            </p>
            <p>
              The list is not exhaustive — Reg 537.2.4 expands the same idea in the
              equipment-selection chapter and adds &ldquo;or by other suitable means&rdquo;, and Reg
              537.2.5 specifically permits interlocking with a load-breaking device for off-load
              isolators. But the three named examples are the ones you can cite verbatim if a
              client, an inspector, or an HSE investigator asks how the isolation was secured.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 462.3"
            clause={
              <>
                Devices for isolation shall be designed and/or installed so as to prevent
                unintentional or inadvertent closure. Examples of precautions are as follows: (a)
                located within a lockable space or lockable enclosure; (b) padlocking; (c) located
                adjacent to the associated equipment.
              </>
            }
            meaning="Three named routes plus an implicit “any method that achieves the same outcome”. A padlock on the device itself is the most common method on site. Lockable cabinet doors and adjacent-location are the alternatives the reg explicitly recognises — useful when a device cannot accept a padlock directly."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 537.2.4"
            clause={
              <>
                Devices for isolation shall be selected and/or installed so as to prevent unwanted
                or unintentional closure (see Regulation 462.3). This may be achieved by locating
                the device in a lockable space or lockable enclosure or by padlocking or by other
                suitable means.
              </>
            }
            meaning="The selection-and-erection mirror of Reg 462.3 — the same duty, expressed for the person specifying or installing the gear. The phrase &lsquo;other suitable means&rsquo; opens the door to lock-off accessories (MCB jaws, breaker lock-out kits, lockout boxes) provided they actually deliver the outcome."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 537.2.5"
            clause={
              <>
                Provision shall be made for securing off-load isolating devices against unwanted or
                unintentional opening. This may be achieved, for example, by locating the device in
                a lockable space or lockable enclosure or by padlocking. Alternatively, the off-load
                device may be interlocked with a load-breaking one.
              </>
            }
            meaning="Off-load isolators (typical example: an isolation link in a panel) cannot be operated under load and so the lock-off duty is about stopping the link being closed in error — padlock it, or interlock it with the load-breaking device upstream so the link cannot be touched while the load device is closed."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The lock-off device family — picking the right tool</ContentEyebrow>

          <ConceptBlock
            title="Single-padlock applications"
            plainEnglish="The simplest case: an isolator switch, a switch-fuse, or a main switch that has a built-in hasp on the operating handle. You operate the device to OFF, the hasp aligns, you fit your padlock through it. Done. The lock physically prevents the handle from being moved back to ON."
          >
            <p>
              Pre-requisite: the device must have an isolation function and a built-in lock-off
              feature recognised by Reg 537.2.1. Most switch-disconnectors, switch-fuses and main
              switches sold for installation use have one. If the device does not, you do not
              improvise — you either pick a different device, or you isolate further upstream at one
              that does, or you secure the device by Reg 462.3(a) (lockable cabinet) or 537.2.4
              (other suitable means).
            </p>
            <p>
              The padlock itself: durable, identifiable as yours, dedicated to isolation duty (not
              security duty), unique key under your control. A site that uses the same padlock for
              tool-store security and circuit isolation has a problem waiting to happen — a
              tool-store lock can be cut by anyone with bolt-croppers and an opinion.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Multi-hasp (scissor hasp) for multi-operative work"
            plainEnglish="A multi-hasp is a metal scissor that fits through the lock-off hasp on the device. The scissor has multiple holes — typically six, sometimes more. Each operative fits their own padlock through one of the holes. The scissor cannot close (and the device cannot move) until every padlock has been removed."
            onSite="One person, one lock. The scissor enforces it physically. The lead spark / supervisor only fits a lock if they themselves are working on the system; they do not lock for the team. A &lsquo;blue supervisor lock&rsquo; that stays on after the supervisor leaves the site is a fiction nobody is protected by."
          >
            <p>Sequence on site:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>Competent person performs the isolation and proves dead.</li>
              <li>Multi-hasp fitted to the device’s lock-off feature. The scissor is open.</li>
              <li>
                First operative arrives at the work area, returns to the board, fits their padlock
                through one hole of the scissor.
              </li>
              <li>
                Each subsequent operative does the same — their own padlock, their own key, their
                own hole.
              </li>
              <li>Work proceeds. Scissor cannot close, isolator cannot move.</li>
              <li>
                As each operative finishes their part, they remove their own padlock and only their
                own padlock.
              </li>
              <li>
                Last padlock off: scissor releases, hasp opens, device can be re-energised under
                whatever permit / sign-off the job requires.
              </li>
            </ol>
            <p>
              Variations: extended-length hasps (8–12 holes) for larger teams; interlocking hasps
              that chain together for very large teams; lockout boxes that hold the keys to multiple
              isolation points behind a single multi-hasp door (one key per isolation, all keys
              captured, the box cannot open until every operative’s padlock is off).
            </p>
          </ConceptBlock>

          {/* Multi-hasp diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Multi-hasp on an isolator — four operatives, four padlocks
            </h4>
            <svg
              viewBox="0 0 800 360"
              className="w-full h-auto"
              role="img"
              aria-label="Multi-hasp lock-off device fitted through the hasp of an isolator switch. Four operatives have each fitted their own padlock through one of the six holes in the scissor hasp. The scissor cannot close and the isolator cannot be moved back to ON until every padlock has been removed by its owner."
            >
              {/* Isolator body */}
              <rect
                x="50"
                y="60"
                width="180"
                height="240"
                rx="10"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <text
                x="140"
                y="84"
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="11"
                fontWeight="bold"
              >
                ISOLATOR
              </text>
              <text x="140" y="100" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                (Switched OFF, locked)
              </text>

              {/* Handle in OFF position */}
              <rect
                x="100"
                y="130"
                width="80"
                height="36"
                rx="6"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              <text
                x="140"
                y="153"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="11"
                fontWeight="bold"
              >
                OFF
              </text>

              {/* Lock-off hasp on the isolator (small ring) */}
              <circle
                cx="140"
                cy="200"
                r="14"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
              />
              <text x="140" y="232" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9">
                hasp on isolator
              </text>

              {/* Multi-hasp scissor (yellow body to the right of isolator hasp) */}
              <path
                d="M154,200 L260,200"
                stroke="#FBBF24"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <rect
                x="260"
                y="170"
                width="220"
                height="60"
                rx="10"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="2"
              />
              <text
                x="370"
                y="160"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                MULTI-HASP (scissor, 6 holes)
              </text>

              {/* 6 holes inside the multi-hasp body */}
              <circle
                cx="285"
                cy="200"
                r="9"
                fill="rgba(0,0,0,0.55)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <circle
                cx="320"
                cy="200"
                r="9"
                fill="rgba(0,0,0,0.55)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <circle
                cx="355"
                cy="200"
                r="9"
                fill="rgba(0,0,0,0.55)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <circle
                cx="390"
                cy="200"
                r="9"
                fill="rgba(0,0,0,0.55)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <circle
                cx="425"
                cy="200"
                r="9"
                fill="rgba(0,0,0,0.55)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <circle
                cx="460"
                cy="200"
                r="9"
                fill="rgba(0,0,0,0.55)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />

              {/* Padlock 1 — red, operative A */}
              <g>
                <path
                  d="M278,200 Q278,182 285,182 Q292,182 292,200"
                  stroke="#EF4444"
                  strokeWidth="2.4"
                  fill="none"
                />
                <rect x="272" y="200" width="26" height="22" rx="3" fill="#EF4444" />
                <text
                  x="285"
                  y="216"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="9"
                  fontWeight="bold"
                >
                  A
                </text>
                <text x="285" y="252" textAnchor="middle" fill="#EF4444" fontSize="9">
                  Op. A
                </text>
              </g>
              {/* Padlock 2 — red, operative B */}
              <g>
                <path
                  d="M313,200 Q313,182 320,182 Q327,182 327,200"
                  stroke="#EF4444"
                  strokeWidth="2.4"
                  fill="none"
                />
                <rect x="307" y="200" width="26" height="22" rx="3" fill="#EF4444" />
                <text
                  x="320"
                  y="216"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="9"
                  fontWeight="bold"
                >
                  B
                </text>
                <text x="320" y="252" textAnchor="middle" fill="#EF4444" fontSize="9">
                  Op. B
                </text>
              </g>
              {/* Padlock 3 — red, operative C */}
              <g>
                <path
                  d="M348,200 Q348,182 355,182 Q362,182 362,200"
                  stroke="#EF4444"
                  strokeWidth="2.4"
                  fill="none"
                />
                <rect x="342" y="200" width="26" height="22" rx="3" fill="#EF4444" />
                <text
                  x="355"
                  y="216"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="9"
                  fontWeight="bold"
                >
                  C
                </text>
                <text x="355" y="252" textAnchor="middle" fill="#EF4444" fontSize="9">
                  Op. C
                </text>
              </g>
              {/* Padlock 4 — blue, supervisor (only if working) */}
              <g>
                <path
                  d="M383,200 Q383,182 390,182 Q397,182 397,200"
                  stroke="#3B82F6"
                  strokeWidth="2.4"
                  fill="none"
                />
                <rect x="377" y="200" width="26" height="22" rx="3" fill="#3B82F6" />
                <text
                  x="390"
                  y="216"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="9"
                  fontWeight="bold"
                >
                  S
                </text>
                <text x="390" y="252" textAnchor="middle" fill="#3B82F6" fontSize="9">
                  Sup.
                </text>
              </g>
              {/* Two empty holes — spare */}
              <text x="425" y="252" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                spare
              </text>
              <text x="460" y="252" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                spare
              </text>

              {/* Tag attached — red, info on isolator */}
              <g>
                <path
                  d="M154,200 L154,300"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
                <rect
                  x="500"
                  y="60"
                  width="240"
                  height="180"
                  rx="8"
                  fill="rgba(239,68,68,0.10)"
                  stroke="#EF4444"
                  strokeWidth="1.5"
                />
                <text
                  x="620"
                  y="86"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="14"
                  fontWeight="900"
                >
                  DANGER
                </text>
                <text
                  x="620"
                  y="104"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="11"
                  fontWeight="bold"
                >
                  DO NOT OPERATE
                </text>
                <text x="514" y="128" fill="rgba(255,255,255,0.85)" fontSize="10">
                  Isolated by:
                </text>
                <text x="610" y="128" fill="#fff" fontSize="10" fontWeight="bold">
                  J. Smith
                </text>
                <text x="514" y="146" fill="rgba(255,255,255,0.85)" fontSize="10">
                  Date / Time:
                </text>
                <text x="610" y="146" fill="#fff" fontSize="10" fontWeight="bold">
                  28/04/26 09:30
                </text>
                <text x="514" y="164" fill="rgba(255,255,255,0.85)" fontSize="10">
                  Reason:
                </text>
                <text x="610" y="164" fill="#fff" fontSize="10" fontWeight="bold">
                  Kitchen rewire
                </text>
                <text x="514" y="182" fill="rgba(255,255,255,0.85)" fontSize="10">
                  Contact:
                </text>
                <text x="610" y="182" fill="#fff" fontSize="10" fontWeight="bold">
                  07xxx xxx xxx
                </text>
                <text x="514" y="208" fill="rgba(255,255,255,0.6)" fontSize="9">
                  RA reference:
                </text>
                <text x="610" y="208" fill="#fff" fontSize="9">
                  RA-2026-0428-K01
                </text>
                <text x="514" y="224" fill="rgba(255,255,255,0.6)" fontSize="9">
                  Permit-to-work:
                </text>
                <text x="610" y="224" fill="#fff" fontSize="9">
                  PTW 1142
                </text>
              </g>

              {/* Caption */}
              <rect
                x="50"
                y="320"
                width="700"
                height="32"
                rx="6"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text x="400" y="340" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                One person, one lock, one key. The hasp cannot close and the isolator cannot move
                until every padlock is removed by its own owner.
              </text>
            </svg>
          </div>

          <ConceptBlock
            title="MCB lock-off jaws and breaker lock-out kits"
            plainEnglish="Most modern MCBs do not have a built-in lock-off feature on the toggle. The lock-off jaw is a small plastic / metal clip that fits over the toggle in the OFF position; the clip itself has a hole that takes a padlock. With the jaw clipped on and a padlock through it, the toggle cannot be flicked back to ON. Breaker lock-out kits do the same job for moulded-case circuit-breakers (MCCBs)."
            onSite="The single most important rule with MCB lock-offs is fit. Lock-off jaws are not universal — they are sized for specific brands and breaker frames. The wrong jaw clips on but does not prevent the toggle from being flicked. That is worse than no jaw, because it gives a false sense of security."
          >
            <p>Procedure:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>Operate the breaker to the OFF position.</li>
              <li>
                Select the lock-off jaw matched to the breaker frame (manufacturer-listed, ideally
                part-numbered to the breaker series).
              </li>
              <li>
                Clip the jaw over the toggle. Test by trying to push the toggle back to ON with
                normal hand pressure — it should not move. If it does, the jaw is wrong; do not
                proceed.
              </li>
              <li>
                Fit your padlock (or a multi-hasp + padlocks for multi-operative work) through the
                hole in the jaw.
              </li>
              <li>
                Tag the breaker with a danger tag (information; not a substitute for the padlock).
              </li>
              <li>
                Where multiple MCBs feed the same work area, lock off every one. Reg 462.2 +
                537.2.1.1 require every circuit to be capable of individual isolation; the converse
                duty in practice is that every supply route to your work has to be actually
                isolated, not just one of them.
              </li>
            </ol>
          </ConceptBlock>

          <Scenario
            title="Two operatives, three sources, one mistake away from a serious injury"
            situation="A small commercial unit. Lighting circuit being re-fed off a new panel. Existing supply on MCB 4 of the old board. Backup feed from a separate sub-board. Two sparks on the job. The lead isolates MCB 4 on the old board, fits an MCB lock-off jaw, padlocks it, hangs a tag. Apprentice starts work at the luminaire. Lead realises ten minutes later they did not isolate the backup feed at the sub-board. The backup is a manual transfer, currently in the &lsquo;normal’ position — so the luminaire is dead today, but anyone walking through the sub-board could put it live by flicking one switch."
            whatToDo="Stop the apprentice. Re-prove dead at the luminaire. Walk to the sub-board, isolate the backup feed, fit the second multi-hasp + apprentice’s padlock + own padlock + tag. Re-prove dead at the work point. Update the day’s risk assessment to add the second isolation point and the second tag reference. Brief the apprentice on the second isolation before work resumes."
            whyItMatters="Reg 462.1 says ‘each electrical installation shall have provisions for isolation from each supply’. Each supply means each. A circuit fed from two sources requires both to be isolated, both to be locked off, both tagged, both in the day’s risk-assessment. The apprentice was unprotected for ten minutes against a single-switch error by anyone in the sub-board area."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The tag — information, not protection</ContentEyebrow>

          <ConceptBlock
            title="Minimum information on every danger tag"
            plainEnglish="A tag answers four questions for whoever finds it: who put this here, when, why, and how do I contact them? Without those four answers the tag does not do its job, and adding a fifth (the risk-assessment / permit reference) ties the tag to the wider documentation chain."
          >
            <p>Minimum tag content:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>DANGER — DO NOT OPERATE</strong> banner, bold, visible at distance. The
                wording is conventional and recognised; it removes any &lsquo;what does this mean’
                latency for someone unfamiliar with the site.
              </li>
              <li>
                <strong>Isolated by:</strong> printed name of the operative who fitted the lock. A
                signature is fine; an unreadable scrawl is not.
              </li>
              <li>
                <strong>Date and time fitted:</strong> the timestamp lets supervision and anyone
                investigating later reconstruct the sequence of events.
              </li>
              <li>
                <strong>Reason:</strong> brief one-line description (‘Kitchen rewire’, ‘Cable repair
                at FCU’4’, ‘Board change’). Specific enough that someone unfamiliar with the job can
                tell what is going on, vague enough that you do not put confidential client
                information on a public tag.
              </li>
              <li>
                <strong>Contact number:</strong> mobile of the operative who fitted the lock. Site
                phone is acceptable as a fallback; ‘ask the foreman’ is not, because the foreman may
                also be unavailable.
              </li>
              <li>
                <strong>Risk-assessment / permit reference</strong> (good practice, not strictly
                required by BS 7671): RA-YYYY-MMDD-XX or PTW number. Ties the tag to the day’s
                paperwork.
              </li>
            </ul>
            <p>
              Material: waterproof, tear-resistant card or plastic. Information written in indelible
              marker, not pencil. Attached with non-reusable cable ties, not string loops — a tag
              that can be lifted off, moved, and re-tied is a tag that can end up on the wrong
              device.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating the tag as the isolation"
            whatHappens="A breaker is left ON with a paper tag wrapped around the toggle saying ‘DO NOT OPERATE’. Cleaner / passing trade / next-shift electrician walks past, does not notice the tag among the other paperwork on the board, flicks the breaker on as part of an unrelated job. Operative working downstream gets a 230 V shock through the conductors they were just stripping."
            doInstead="Tags carry information. Locks prevent action. Reg 462.3 names lockable enclosure, padlocking, and adjacent location — it does not name tagging. Every tag must be on a device that is also physically locked off, or the tag is performing a job it is not capable of doing. The two go together; neither replaces the other."
          />

          <CommonMistake
            title="Untraceable tags and shared keys"
            whatHappens="Site uses generic tags pre-printed with no name, no contact, attached with reusable string. A multi-hasp at the consumer unit has four padlocks on it but only two operatives are anywhere on site — the other two padlocks were left from yesterday and nobody knows whose they are. The first electrician to need the system back has to either cut locks (with no authorisation), wait for an indeterminate time, or break the principle and hope. The whole isolation regime is now degraded."
            doInstead="Personalise every tag at the moment of fitting (printed name + mobile, no exceptions). Audit lock-offs at the end of every shift: every lock either gets removed by its owner or rolls into a documented hand-over with a fresh tag. A weekly check on the lock-off cabinet that reconciles padlocks-out vs padlocks-in stops the drift before it becomes a culture."
          />

          <CommonMistake
            title="Wrong MCB lock-off jaw — it clips on but does not block the toggle"
            whatHappens="A spark grabs the nearest MCB lock-off jaw from the kit. It clips over the breaker toggle, the padlock goes through the hole, the tag is fitted. Visually the breaker is locked off. In practice the jaw is sized for a different breaker frame and the toggle has 2–3 mm of free travel — enough that a firm push moves it back to ON without ever needing to remove the jaw or the padlock. The work is started believing the circuit is locked dead."
            doInstead="Match the jaw to the breaker frame — most manufacturers part-number their lock-off jaws to specific breaker series. After fitting, test by trying to operate the toggle with normal hand pressure. If the toggle moves at all, the jaw is wrong: stop, replace the jaw, or isolate at the next upstream device that can be properly secured (Reg 462.3 is not satisfied by a half-measure)."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Lock removal — the rules that matter most</ContentEyebrow>

          <ConceptBlock
            title="Only the person who fitted the lock removes the lock"
            plainEnglish="The whole regime falls apart if anyone other than the lock’s owner can remove it. The owner alone holds the key. Anyone else cutting, picking, bypassing, or convincing the owner to hand over the key has just defeated the safety system."
            onSite="The two failure modes are (1) someone else opens the lock for &lsquo;efficiency’, (2) the owner leaves site without removing it. Both are addressed by the same rule: the lock comes off when, and only when, its owner has confirmed the work is finished and the area is clear, and they remove it themselves."
          >
            <p>Standard procedure for an operative leaving the work:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>Confirm your part of the work is complete and tested.</li>
              <li>Remove all tools, materials, and personal items from the work area.</li>
              <li>Replace any guards, covers, or front plates you removed.</li>
              <li>
                Confirm no other operatives are still working downstream of the point you are about
                to clear.
              </li>
              <li>Walk to the isolation point. Remove your padlock. Take your key.</li>
              <li>
                If you are the last operative off the multi-hasp: notify the supervisor /
                permit-issuer that the system is ready for re-energisation. Re-energisation follows
                the documented sequence (alert affected persons, restore supply, log the time).
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="Emergency lock removal — the very narrow exception"
            plainEnglish="If a lock has to come off but the owner cannot be contacted, you do not cut it. You follow the documented emergency procedure: management authorisation, all reasonable contact attempts logged, verification that re-energising the equipment is safe, witnessed cutting. The lock owner is informed at the earliest opportunity afterwards."
          >
            <p>
              Every site that operates a lock-off regime has, or should have, a written lock-removal
              procedure. The procedure exists so that the &lsquo;impossible’ case — owner
              uncontactable, system cannot remain isolated — has a structured answer. The structure
              is what stops the procedure being abused for ordinary convenience.
            </p>
            <p>Required elements, common to most schemes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Authorisation:</strong> a named senior person (electrical supervisor, duty
                manager) approves in writing.
              </li>
              <li>
                <strong>Contact attempts:</strong> documented, time-stamped, multiple channels
                (mobile, supervisor, employer).
              </li>
              <li>
                <strong>Safety verification:</strong> someone competent confirms that re-energising
                the equipment will not endanger anyone — typically by walking the work area and
                re-proving dead.
              </li>
              <li>
                <strong>Witnessed removal:</strong> two people present, both sign off.
              </li>
              <li>
                <strong>Owner notification:</strong> the lock owner is contacted as soon as possible
                afterwards and given a copy of the documentation.
              </li>
            </ul>
            <p>
              If the lock-removal cabinet contains a pair of bolt croppers and no paperwork, the
              regime is broken — you have a tool that can defeat the safety system on demand and no
              audit trail. Fix the documentation before the next isolation.
            </p>
          </ConceptBlock>

          <Scenario
            title="Apprentice goes home with the only key"
            situation="Friday afternoon. Apprentice fits a personal padlock to the multi-hasp at the consumer unit, finishes the day’s second-fix, drives home with their lock keys in their jacket. Saturday morning, the client phones — they need the kitchen ring back on for a weekend dinner. The lead spark is on a different job, can only reach the apprentice via voicemail."
            whatToDo="Do not cut the lock unless every step of the documented emergency procedure is exhausted and recorded. Steps in order: (1) ring the apprentice repeatedly across the morning, log each attempt; (2) escalate to the employer / supervisor; (3) attempt to contact the apprentice through next-of-kin if appropriate; (4) if all attempts genuinely fail and the system has to be re-energised, the supervisor authorises in writing, a competent person re-proves dead at the consumer unit + the work area, the cut is witnessed, all of it is documented; (5) the apprentice is informed Monday and given the file. The far better answer is the next time you brief an apprentice: ‘your lock comes off before you leave site, every time, no exceptions’."
            whyItMatters="The emergency lock-removal procedure is for emergencies. Friday-afternoon apprenticeship blunders are not emergencies. Using the procedure for ordinary convenience is the fastest way to erode the principle that protects everyone on site, including the apprentice next time they fit a lock and rely on it."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Documentation — the chain of evidence</ContentEyebrow>

          <ConceptBlock
            title="Tying the lock-off into the day’s risk assessment / permit-to-work"
            plainEnglish="A lock on a board, on its own, is a fact. A lock on a board that is referenced in a dated risk-assessment, that links to a method statement, that names the operatives, that identifies the isolation points and the lock-off devices used — that is a system. The system survives investigation; the bare lock does not."
            onSite="The OSG points to OSG Appendix M and HSE HSG85 / Electrical Safety First BPG2 for the procedural detail. Use them — the documents exist precisely so you do not have to invent the procedure fresh on every job."
          >
            <p>Minimum entries in the day’s paperwork:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Risk-assessment reference</strong> on the tag and on the certificate / job
                sheet.
              </li>
              <li>
                <strong>Identified isolation points</strong> (board / breaker number / source
                description). One row per isolation, ticked when locked off, ticked again when
                removed.
              </li>
              <li>
                <strong>Lock-off devices used</strong> (multi-hasp serial / kit reference). A site
                that recovers all its lock-off kit at the end of the job has a stronger audit
                position than one that does not.
              </li>
              <li>
                <strong>Operatives present</strong> with their personal lock IDs (engraved number on
                the padlock body).
              </li>
              <li>
                <strong>Times</strong> of isolation, prove-dead, work commenced, work finished,
                locks removed, re-energisation. Five timestamps minimum.
              </li>
              <li>
                <strong>Sign-offs</strong> for each transition. The supervisor signing the final
                re-energisation row is the closing entry that says &lsquo;this isolation is
                released, the system is live, the next job can begin’.
              </li>
            </ul>
            <p>
              For higher-risk work — HV, multiple energy sources, third-party premises, work that
              crosses a shift change — the risk-assessment is supplemented by a permit-to-work. The
              permit names the work, the isolations required, the precautions, the time window, and
              the named issuer / receiver. The lock-off physically delivers what the permit
              specifies.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="GN3 · Reg 2.16 (continuity of metallic enclosures used as protective conductors)"
            clause={
              <>
                Before performing the continuity test on metallic enclosures used as protective
                conductors, ensure the main switch is off and secured by a safety locking device.
                This prevents inadvertent energisation during testing and is part of the safe
                isolation procedure prior to conducting continuity measurements.
              </>
            }
            meaning="Even when the test on the table is purely a low-voltage continuity check, GN3 wants the supply locked off with a safety locking device first. Lock-off is not just for the cable cutter — it sits in front of every test that might otherwise see live current pass through the inspector."
          />

          <SectionRule />

          <ContentEyebrow>
            How this connects to the rest of the safe-isolation sequence
          </ContentEyebrow>

          <ConceptBlock
            title="Lock-off in the wider Isolate → Lock → Tag → Try → Prove sequence"
            plainEnglish="Lock-off is the second step. It is the step that protects the first step. Without it, the isolator is a switch that anyone can flip back. With it, the isolator is a state that nobody can change without your key. The next step — prove dead — is the subject of Section 4 and is what actually confirms you are safe to start work."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Isolate</strong> the circuit at all sources. Reg 462.1 / 537.2.1.1 — every
                supply, every circuit, every live conductor.
              </li>
              <li>
                <strong>Lock</strong> the isolator(s) using the appropriate device (single padlock,
                multi-hasp + padlocks, MCB lock-off jaw, breaker lock-out kit, lockout box). Reg
                462.3 / 537.2.4 / 537.2.5.
              </li>
              <li>
                <strong>Tag</strong> with name, date/time, reason, contact, RA reference.
              </li>
              <li>
                <strong>Try</strong> to operate the equipment downstream of the isolation (press
                start, flick the local switch). Confirms the isolation is doing what it should.
              </li>
              <li>
                <strong>Prove dead</strong> at the point of work using the prove-test-prove sequence
                with a GS38-compliant voltage indicator. Section 4 covers this in full.
              </li>
            </ol>
            <p>
              Lock-off without prove-dead is a procedure that mostly works. Prove-dead without
              lock-off is a procedure that mostly does not. Both together is the regime BS 7671 +
              EAWR + HSG85 are written to deliver.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Reg 462.3: isolation devices shall be designed and/or installed so as to prevent unintentional or inadvertent closure. Lockable space, lockable enclosure, padlocking, located adjacent to equipment.',
              'Reg 537.2.4 / 537.2.5: same duty in the selection-and-erection chapter, with interlocking explicitly added for off-load isolators.',
              'One person, one lock, one key. Multi-operative work uses a multi-hasp — every operative’s own padlock through one hole.',
              'Tags are information, not protection. Tag content: name, date/time, reason, contact, RA reference. Always with a lock, never instead of one.',
              'Match MCB lock-off jaws to the breaker frame. Test the toggle does not move with the jaw fitted before trusting it.',
              'Only the person who fitted the lock removes the lock. The emergency lock-removal procedure is for emergencies, not Friday afternoons.',
              'Tie the lock-off into the day’s risk-assessment / permit-to-work. Five timestamps minimum: isolated, proved, started, finished, re-energised.',
              'OSG Appendix M points to HSE HSG85 and Electrical Safety First Best Practice Guide 2 for the procedural detail — BS 7671 sets the duty, those documents set the steps.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Does Reg 462.3 require a padlock specifically, or are other methods acceptable?',
                answer:
                  'Reg 462.3 lists three example precautions verbatim: (a) located within a lockable space or lockable enclosure, (b) padlocking, (c) located adjacent to the associated equipment. Reg 537.2.4 adds “or by other suitable means”. So a padlock is one route; a lockable cabinet door is another; locating the device next to the equipment under the personal control of the person doing the work is a third. The duty is preventing inadvertent closure, not specifically padlocking.',
              },
              {
                question: 'Is a tag on its own ever sufficient under BS 7671?',
                answer:
                  'No. Reg 462.3 names lockable enclosure, padlocking, and adjacent location as the means of preventing inadvertent closure. A tag does not physically prevent closure — it conveys information. Tags must always accompany a physical lock-off measure. Reg 537.2.7 separately requires durable identification of the device, but identification and isolation-securing are different duties.',
              },
              {
                question: 'Can I use the same padlock for site security and circuit lock-off?',
                answer:
                  'No, and the reason is operational discipline. A lock-off padlock has to be: under your sole control, identifiable as yours, and dedicated to lock-off duty so it is available when you need it. Mix-use means the lock might be on the tool box when an isolation is needed, or might get cut by site security thinking it is a forgotten store-room lock. Keep lock-off padlocks separate, dedicated, and ideally engraved with your name or unique number.',
              },
              {
                question:
                  'What if the isolation device does not have a built-in hasp — say, a screw-fix isolator inside a panel?',
                answer:
                  'Reg 462.3(a) and 537.2.4 cover this: locate the device within a lockable space or lockable enclosure. Padlock the panel door, not the device inside. Or use Reg 462.3(c): if the device is adjacent to the equipment and remains under your personal control while you work (a small fused-spur-style isolator at a single piece of equipment), that itself is one of the three named routes. For an off-load isolator inside a panel, Reg 537.2.5 also permits interlocking with the upstream load-breaking device so the off-load device cannot be operated while the load device is closed.',
              },
              {
                question: 'How do I run lock-off when one circuit feeds two work locations?',
                answer:
                  'One isolation, one multi-hasp at the source, every operative working anywhere downstream fits their own padlock to the same hasp. The hasp cannot release until every lock is gone. Both work locations are protected by the same isolation, and each operative carries their own protection home with them. The tag at the source identifies which work areas are downstream so anyone reading it knows the scope.',
              },
              {
                question:
                  'Do I need a permit-to-work as well as lock-off for ordinary domestic work?',
                answer:
                  'Not normally. A permit-to-work is the right tool for high-risk work — HV, work crossing shift changes, multiple energy sources, third-party contractor work on a managed site, work that affects critical systems. For ordinary domestic / small commercial work, the day’s risk-assessment + the lock-off + the tag carrying the RA reference is the standard chain of evidence. Move to a formal permit when complexity, multiple parties, or risk justify it; do not over-paper the simple cases.',
              },
              {
                question:
                  'I’ve found a multi-hasp at a consumer unit with four locks on it, two of which look weeks old. What do I do?',
                answer:
                  'Treat every lock as belonging to a real person until proved otherwise. Identify each lock’s owner from the tag, contact each in turn, document the conversation. Do not cut. If two are genuinely abandoned (operative left employment, no record, no contact possible) then the documented emergency lock-removal procedure applies — manager authorisation, witness, written sign-off. Then raise the underlying problem: a site whose lock-off cabinet is silently accumulating abandoned locks has a documentation gap that needs fixing, not a single-incident workaround.',
              },
              {
                question:
                  'OSG references HSE HSG85 and Electrical Safety First Best Practice Guide 2 — are those mandatory?',
                answer:
                  'BS 7671 sets the duty (Reg 462.3, 537.2.4, 537.2.5). HSG85 and BPG2 are the procedural sources — they are not BS 7671, but they are what the inspector and the courts will reach for if someone asks “what is good practice on safe isolation”. The Electricity at Work Regulations 1989 sit underneath both. In practice: BS 7671 tells you the device must prevent inadvertent closure; HSG85 + BPG2 tell you the steps for getting there safely; the EAWR is the legal duty to behave reasonably. Treat the three as a stack — you cite BS 7671 in the certificate, you follow HSG85 / BPG2 on the day, the EAWR is the legal backstop.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Lock-off and tag-out — Module 2.3" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-2/section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.4 Proving dead techniques
              </div>
            </button>
          </div>

          <div className="hidden">
            <Lock />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default InspectionTestingModule2Section3;
