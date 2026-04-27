/**
 * Module 4 · Section 1 · Subsection 3 — Safety checks used for tools
 * Maps to City & Guilds 2365-02 / Unit 204 / LO1 / AC 1.3
 *   AC 1.3 — "Describe safety checks used for tools"
 *
 * Frame: the layered inspection routine that keeps hand and power tools fit
 * for use. Pre-use visual every shift, in-service inspection by a competent
 * person, formal PAT on the documented cycle. The PUWER Reg 5 + EAWR Reg 4
 * legal hooks, the tag-out / lock-out routine for damaged tools, and the
 * calibration story for torque drivers and test instruments.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Safety checks used for tools (1.3) | Level 2 Module 4.1.3 | Elec-Mate';
const DESCRIPTION =
  'The layered tool-inspection routine — pre-use visual every shift, in-service inspection by a competent person, formal PAT on the documented cycle. PUWER Reg 5, EAWR Reg 4, the tag-out / lock-out routine for damaged tools, and the calibration story for torque drivers and test instruments.';

/* ── Inline checks (wired into streaks/stats) ─────────────────────── */

const checks = [
  {
    id: 'mod4-s1-sub3-pat-myth',
    question:
      "Your colleague says 'this drill was PAT'd in January, so it's fine all year — no need to check it'. Is he right?",
    options: [
      'Yes — PAT covers it for 12 months.',
      "No. PAT (Portable Appliance Testing) is one layer of inspection — typically annual for offices, every 3 months for harsh construction-site use. PUWER Reg 5 ALSO requires user pre-use visual checks every shift AND periodic competent-person in-service inspections between PATs. A tool can pass PAT in January and develop a damaged cable in February — the user check is what catches it.",
      'Sometimes — depends on the colour of the PAT label.',
      'PAT is optional anyway.',
    ],
    correctIndex: 1,
    explanation:
      "PAT is the formal electrical test on the documented cycle. It's necessary but not sufficient. PUWER Reg 5 expects three layers: pre-use visual by the operative every shift; periodic in-service inspection (a more thorough visual by a competent person at a documented interval — typically monthly for site tools); and PAT on the formal cycle. Treating PAT as the only check is the single most common mistake in real-world tool inspection.",
  },
  {
    id: 'mod4-s1-sub3-damaged-cable',
    question:
      "You're about to use a 110 V SDS and you spot a 20 mm split in the rubber outer sheath of the lead, midway along its length. The inner cores aren't visible but the sheath is clearly compromised. What do you do?",
    options: [
      'Wrap insulating tape around it and crack on.',
      "Take the tool out of service. Apply a 'do not use' tag (or follow the firm's lock-out / tag-out procedure), put the tool aside, and report it to the supervisor. Insulating tape is NOT a repair on a 110 V (or any voltage) supply lead — once the outer sheath is breached, the cable is damaged and only a competent person can either repair it (replace the lead, not patch it) or condemn it. Your duty is to flag it, not fix it.",
      'Ignore it.',
      'Switch it on to test if it still works.',
    ],
    correctIndex: 1,
    explanation:
      "Damaged supply cable on any portable tool = take out of service. PUWER Reg 5 (maintenance) and Reg 4 (suitability) both bite — a tool with a damaged lead is no longer in efficient working order and is no longer suitable for use. Apply a quarantine tag, put the tool in the firm's quarantine area, fill in the defect log, and tell the supervisor. The fix is a new lead fitted by a competent person — not insulating tape, never insulating tape.",
  },
  {
    id: 'mod4-s1-sub3-torque-cal',
    question:
      "Your firm's preset Wera 3.5 Nm torque screwdriver lives in the cab of the van and gets used every day for distribution-board terminations. The supervisor mentions it's 'due for calibration'. Why does that matter for an electrical install?",
    options: [
      'It doesn\'t — torque drivers don\'t go out of calibration.',
      "Torque tools drift over time — the spring inside that gives the click loses tension with use and temperature cycles. A 3.5 Nm preset tool that drifts to 4.5 Nm will over-torque every terminal it touches, deforming the conductor and the screw, and a tool that drifts to 2.5 Nm will under-torque every terminal, leaving high-resistance joints that fail R1+R2 on test and run hot in service. Annual calibration with a certificate is the standard requirement; some firms shorten that to 6-monthly for daily-use tools.",
      'It only matters for testing tools, not torque drivers.',
      'Calibration is just paperwork.',
    ],
    correctIndex: 1,
    explanation:
      "Torque drivers and torque wrenches are precision instruments and they drift with use. Annual calibration with a UKAS-traceable certificate is the standard requirement (every 5,000 cycles or 12 months, whichever first, per most manufacturers). A drifted torque driver causes either over-torqued and damaged terminals or under-torqued and high-resistance terminals — both fail BS 7671 526.1, both cause real installation problems on EICR. Calibration certificates live in the firm's tool register and get checked at scheme audits.",
  },
];

/* ── End-of-page Quiz (wired into streaks/stats) ──────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "PUWER 1998 Reg 5 requires work equipment to be 'maintained in an efficient state, in efficient working order and in good repair'. Which inspection regime, taken as a whole, discharges that duty for portable site tools?",
    options: [
      "Annual PAT only.",
      "Three layers operating together: (1) operative pre-use visual inspection every shift — cable, plug, casing, guard, switch, anti-restart; (2) periodic in-service inspection by a competent person at a documented interval (monthly for harsh site use is typical); (3) formal Portable Appliance Test (PAT) on the documented cycle — every 3 months for 110 V site tools is HSE-recommended typical. Missing any one layer weakens the Reg 5 defence at any post-incident investigation.",
      "Just user check.",
      "Only PAT done by an electrician.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 5 expects a layered regime, not a single annual test. Pre-use visual is the operative's daily duty (HSE HSG107 'Maintaining portable electrical equipment' and the IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (5th ed.) are the source documents for the layered routine on construction and harsh-environment use). In-service inspection is a competent-person job at a documented interval. PAT is the formal electrical test on the cycle. The three layers together demonstrate the firm has a 'system of work' for tool maintenance — which is what the HSE wants to see at any incident investigation.",
  },
  {
    id: 2,
    question:
      "EAWR 1989 Reg 4(2) requires that all electrical systems are 'maintained so as to prevent, so far as is reasonably practicable, danger'. How does this map onto a portable tool?",
    options: [
      "It doesn't — EAWR is for fixed wiring only.",
      "EAWR 'electrical systems' includes portable equipment supplied from those systems. A faulty 110 V SDS on a 110 V site supply is part of the electrical system in EAWR terms. The maintenance duty under Reg 4(2) covers the supply (transformer, leads, sockets) AND the equipment plugged into it. Visual checks, PAT, and competent-person inspection all sit under this duty — EAWR is the second statutory hook alongside PUWER.",
      "Only fixed installations are covered.",
      "Only if the tool is over £100.",
    ],
    correctAnswer: 1,
    explanation:
      "EAWR's definition of 'electrical system' is broad — it captures the supply chain from generation to point of use, including the portable equipment at the end. So a faulty drill on a site lead is squarely within EAWR Reg 4(2). The result is that PAT and pre-use checks discharge BOTH PUWER Reg 5 AND EAWR Reg 4(2) at the same time — two statutory hooks for the same activity.",
  },
  {
    id: 3,
    question:
      "What's the standard recommended PAT interval for a 110 V Class I (earthed metal-cased) portable tool used daily on a construction site, per HSE guidance HSG107 and the IET Code of Practice for In-service Inspection and Testing?",
    options: [
      "Every 5 years.",
      "Every 3 months — formal PAT (combined visual + electrical test) for harsh-environment use. HSE HSG107 'Maintaining portable electrical equipment' and the IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (5th ed.) publish typical intervals; construction-site Class I portable tools are at the short end at 3 months. Office Class I equipment is 12 months (the low-risk regime in HSE INDG236). Class II (double-insulated) and battery chargers are typically longer.",
      "Once when bought.",
      "Never.",
    ],
    correctAnswer: 1,
    explanation:
      "The IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (currently 5th edition) and HSE HSG107 'Maintaining portable electrical equipment' give typical intervals by class and environment. Construction-site Class I tools are 3-monthly because the environment is rough — cables get crushed, casings get knocked, water and dust get in. Office equipment runs much longer intervals. The interval is risk-based; the firm's appointed competent person sets it based on the specific tools and environment.",
  },
  {
    id: 4,
    question:
      "When you carry out a pre-use visual inspection on a 110 V portable tool, which six things should you check before plugging in?",
    options: [
      "Just turn it on.",
      "(1) Supply cable — full length for cuts, abrasion, kinks, exposed conductor; (2) Plug — body intact, pins straight, cord-grip in place; (3) Tool casing — cracks, missing screws, contamination ingress; (4) Guard or shield — present, correctly fitted, not damaged; (5) Switch — operates positively, no stuck contacts, anti-restart works after release; (6) PAT label — current, in date, legible. Plus check the tool is the right one for the job.",
      "Just the plug.",
      "Just the cable.",
    ],
    correctAnswer: 1,
    explanation:
      "Six points, every shift, every tool, before plugging in. Cable, plug, casing, guard, switch, label. HSE HSG107 'Maintaining portable electrical equipment' and the IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (5th ed.) are the apprentice-friendly briefings on this. Most firms produce a small wallet-sized checklist or a sticker on the back of the tool roll; the routine becomes second-nature within a few months and saves you from picking up the one tool with the dodgy lead.",
  },
  {
    id: 5,
    question:
      "You spot a tool in the van with a red 'do not use' tag attached and the supply lead detached. What's the correct response?",
    options: [
      "Re-attach the lead and use it.",
      "Leave the tag in place. The tag means a competent person has identified a fault and quarantined the tool. Removing the tag without authority is a HASAWA s.7 breach (failure to co-operate with the employer's safety arrangements) AND likely a PUWER Reg 4 breach (using equipment that's not been certified suitable). Either find an alternative tool or speak to the supervisor.",
      "Remove the tag and use the tool.",
      "Take the tag off and rebadge it.",
    ],
    correctAnswer: 1,
    explanation:
      "Tag-out / lock-out is the formal way unsafe equipment is taken out of service while waiting for repair or condemnation. Removing the tag without authority defeats the safety system AND breaches HASAWA s.7 limb (b) (the duty to co-operate with safety arrangements). Same principle as not removing a colleague's lock-off on an isolated circuit. The tag stays until the competent person who fitted it (or someone with equivalent authority) removes it.",
  },
  {
    id: 6,
    question:
      "Hand tools (no electrical supply) still need safety checks. Which inspection regime applies to a pair of side cutters or an insulated screwdriver?",
    options: [
      "None — hand tools are exempt.",
      "Operative pre-use visual every shift — check the cutting edges aren't chipped or rolled, the pivot is tight, the handle insulation is intact (especially on VDE-rated drivers — any cracked or chipped insulation = take out of service). Periodic competent-person inspection — annually typical. No 'PAT' equivalent for non-powered hand tools, but the visual regime is just as important. PUWER applies to ALL work equipment, not just powered.",
      "Only when broken.",
      "Once a year only.",
    ],
    correctAnswer: 1,
    explanation:
      "PUWER applies to all work equipment, powered or not. Hand tools need pre-use visual checks (cutting edges, pivots, handles) and periodic competent-person inspection. VDE-rated insulated tools are particularly important — any visible damage to the insulation invalidates the 1000 V rating and the tool must be withdrawn. The visual routine is fast (a few seconds per tool) but catches the rolled cutter edge before it slips, the cracked driver handle before it shocks you.",
  },
  {
    id: 7,
    question:
      "Test instruments (multimeter, MFT, clamp meter) need calibration at a documented interval. What's the standard requirement and why does it matter?",
    options: [
      "Calibration is optional.",
      "Annual calibration to a UKAS-traceable standard, with a calibration certificate kept in the firm's instrument register. Test instruments drift over time — a multimeter that reads 235 V on a 230 V supply, or an insulation tester that reads 200 MΩ on a 100 MΩ test, will produce wrong test results that fail BS 7671 612.x. Most certification schemes (NICEIC, NAPIT) require evidence of in-date calibration as part of audit. Sub 1.5 covers test instruments in detail.",
      "Calibration is for laboratories only.",
      "Once every 5 years.",
    ],
    correctAnswer: 1,
    explanation:
      "Annual calibration with a UKAS-traceable certificate is the standard for test instruments used to demonstrate BS 7671 compliance. Megger, Fluke and Kewtech all offer manufacturer or third-party calibration services — typically £40–80 per instrument per year. The certificate is the evidence that the test results on your EIC / EICR are trustworthy. NICEIC, NAPIT and ELECSA all check this at scheme audits. Sub 1.5 unpacks test instruments specifically.",
  },
  {
    id: 8,
    question:
      "A site tool fails its pre-use visual check. What's the correct sequence of actions?",
    options: [
      "Use it carefully.",
      "(1) Take the tool out of service immediately — don't try to use it 'gently'. (2) Apply the firm's quarantine tag ('do not use', signed and dated). (3) Move the tool to the firm's quarantine area (or, on site, to the supervisor's box). (4) Log the defect in the firm's tool register or defect log. (5) Tell the supervisor — verbally as well as written. (6) Get an alternative tool to continue the work. The fix happens later by a competent person; the apprentice's job ends at quarantine + report.",
      "Throw it in the bin.",
      "Just keep using it.",
    ],
    correctAnswer: 1,
    explanation:
      "Six-step quarantine sequence, in that order. Out of service → tag → quarantine area → log → tell supervisor → continue with alternative. The PUWER Reg 5 system depends on damaged tools being taken out of circulation immediately, not used 'one more time'. The defect log gives the firm visibility on which tools fail at which intervals, which feeds back into purchasing and scheduling decisions.",
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs = [
  {
    question: "Who actually does the formal PAT testing on a typical firm?",
    answer:
      "Three patterns. (1) The firm employs an in-house PAT tester (often a senior electrician with a City & Guilds 2377 qualification) who works through the inventory on a rolling cycle. (2) The firm contracts a third-party PAT testing service to come round and do the lot annually. (3) On larger sites, the principal contractor may PAT all tools on entry and tag them with a site-specific colour-of-the-quarter sticker. Smaller firms typically use option 2; larger firms often use option 1. Apprentices rarely do the formal test until later in their training, but the 2377 PAT qualification is one of the easier early add-ons most apprentices pick up at college.",
  },
  {
    question: "What do the different PAT label colours mean?",
    answer:
      "The colours aren't a national standard — different firms use different schemes. Most common: green = passed and in date, red = failed (do not use), amber = passed but limited use, white/blank = not tested. Some sites use quarterly colour rotation (red Q1, green Q2, blue Q3, yellow Q4) so anyone can spot a tool that's missed its quarterly retest at a glance. Always check the date on the label rather than relying on the colour alone — colours are firm-specific, dates are universal.",
  },
  {
    question: "If I damage a tool on the job, will I get in trouble?",
    answer:
      "Tools wear out — that's expected. Damaging one through normal use isn't a problem; it's how the wear-and-replace cycle works. Where you'd get in trouble is hiding the damage and putting the tool back — which puts the next user at risk. The right move is the same as for any other defect: take it out of service, tag it, log it, tell the supervisor. Firms much prefer an apprentice who reports a damaged tool to one who hides it. The reporting is what discharges your s.7 duty.",
  },
  {
    question: "Should I be doing user checks on the FIRM's tools, or just my own?",
    answer:
      "Both. PUWER Reg 5 puts the maintenance duty on the firm, but the operative's pre-use visual is a separate layer that applies to every tool you use, regardless of who owns it. The supervisor can't realistically check 50 tools at the start of every shift; the user check at the point of pick-up is what catches the new damage that's developed since the last formal inspection. If you pick up a firm tool, you check it before plugging in. Same routine as your own kit.",
  },
  {
    question: "What about my insulated screwdrivers — do they need PAT?",
    answer:
      "Not PAT — that's for powered equipment. VDE-insulated hand tools are checked visually for damage to the insulation. Any visible crack, chip, melt-mark or peel on the insulation = withdraw the tool from service. Some firms periodically dielectric-test VDE tools (apply a 10 kV AC test to confirm the 1000 V rating still holds) but that's a workshop / laboratory test, not a site one. The everyday check is purely visual: insulation intact, undamaged, undeformed.",
  },
  {
    question: "What's the difference between 'pre-use check' and 'in-service inspection' and 'PAT'?",
    answer:
      "Three different things, three different intervals, three different inspectors. Pre-use check — done by the operative at the start of every shift, takes seconds, purely visual (cable, plug, casing, guard, switch, label). In-service inspection — done by a competent person (often the supervisor or appointed PAT tester) at a documented interval (monthly typical for site tools), more thorough visual including opening the plug to check terminations. PAT — done by a 2377-qualified competent person at the formal cycle (3-monthly for site Class I), full electrical test including earth continuity, insulation resistance and lead polarity. Three layers, all under PUWER Reg 5.",
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1 · Subsection 3"
            title="Safety checks used for tools"
            description="The layered inspection routine that keeps hand and power tools fit for use. Pre-use visual every shift, in-service inspection by a competent person, formal PAT on the documented cycle. The PUWER Reg 5 + EAWR Reg 4 legal hooks, the tag-out / lock-out routine for damaged tools, and the calibration story for torque drivers and test instruments."
            tone="emerald"
          />

          <TLDR
            points={[
              "Three layers, every tool — pre-use visual every shift (operative duty), periodic in-service inspection (competent person, monthly typical for site), formal PAT on the cycle (3-monthly for 110 V site Class I).",
              "Damaged tool = quarantine, tag, log, report, replace. Insulating tape is NEVER a repair on a supply lead. The fix is a competent person fitting a new lead.",
              "Two regs sit behind the inspection routine — PUWER Reg 5 (maintenance) and EAWR Reg 4(2) (electrical systems maintained so as to prevent danger). Both bite at any incident investigation.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Describe the three layers of tool safety inspection — operative pre-use visual every shift, in-service inspection by a competent person, formal Portable Appliance Test (PAT) on the documented cycle.",
              "Identify the six points of a pre-use visual check on a portable power tool — cable, plug, casing, guard, switch, PAT label.",
              "Apply the firm's tag-out / lock-out procedure to a defective tool and identify the HASAWA s.7 duty to leave a quarantine tag in place.",
              "State PUWER 1998 Reg 5 'maintenance' duty and explain how the three-layer regime discharges it.",
              "State EAWR 1989 Reg 4(2) 'electrical systems' maintenance duty and identify portable tools as part of the system.",
              "Recognise the calibration requirement for torque drivers and test instruments — annual UKAS-traceable certificate, kept in the firm's tool register.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this Sub matters</ContentEyebrow>

          <ConceptBlock
            title="Tool maintenance is layered — never a single annual check"
            plainEnglish="The single biggest myth in tool safety is that 'PAT once a year and forget' covers it. PUWER Reg 5 expects a layered routine — the operative checks every shift, a competent person inspects more thoroughly at a documented interval, and PAT happens on the formal cycle. Three layers, three different inspectors, all running together. Missing any one weakens the legal defence and lets dangerous tools through."
            onSite="Walk into a tidy firm's van and you'll see PAT labels on every plug-in tool, a quarantine box for defective kit, a tool register on a clipboard, and a wallet-card pre-use check list in every operative's pocket. That's not bureaucracy — that's PUWER Reg 5 made visible. Walk into a sloppy firm's van and the labels are missing, the quarantine box has working tools in it, and nobody can tell you when the last check happened. That's how HSE prosecutions get built."
          >
            <p>
              The three layers in detail:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Layer 1 — Operative pre-use visual</strong>. Every shift, every tool, before plugging in. Six points: cable, plug, casing, guard, switch, label. Takes seconds per tool. The apprentice&apos;s daily duty.
              </li>
              <li>
                <strong>Layer 2 — In-service inspection</strong>. Documented interval (monthly typical for site tools, less frequent for office). Carried out by a competent person — usually the supervisor or appointed PAT tester. More thorough — may open the plug, check terminations, check brushes (corded tools), check trigger switch contacts.
              </li>
              <li>
                <strong>Layer 3 — Portable Appliance Test (PAT)</strong>. Formal electrical test on the documented cycle (3-monthly for 110 V site Class I tools per HSE HSG107 and the IET Code of Practice for In-service Inspection and Testing of Electrical Equipment, 5th ed.). Carried out by a 2377-qualified competent person (in-house or contracted). Tests earth continuity (Class I), insulation resistance, lead polarity, switch operation. Produces a pass / fail label.
              </li>
            </ul>
            <p>
              All three together discharge PUWER Reg 5. Take any one out and you&apos;ve got a gap that a damaged tool will eventually slip through.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The legal hooks</ContentEyebrow>

          <ConceptBlock
            title="PUWER Reg 5 and EAWR Reg 4(2) — both bite, simultaneously"
            plainEnglish="Two statutory hooks back the inspection routine. PUWER Reg 5 covers ALL work equipment. EAWR Reg 4(2) covers ELECTRICAL SYSTEMS — and a portable electric tool plugged into a site supply is part of that system. Both regs require the same thing in slightly different words: keep the kit in good working order so it doesn't cause harm."
          >
            <p>
              The two regulations:
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Provision and Use of Work Equipment Regulations 1998 — Reg 5"
            clause={
              <>
                <p className="mb-2">
                  <strong>Reg 5(1)</strong> &mdash; &quot;Every employer shall ensure that work
                  equipment is maintained in an efficient state, in efficient working order and in
                  good repair.&quot;
                </p>
                <p>
                  <strong>Reg 5(2)</strong> &mdash; &quot;Every employer shall ensure that where any
                  machinery has a maintenance log, the log is kept up to date.&quot;
                </p>
              </>
            }
            meaning={
              <>
                Reg 5(1) is the maintenance duty. &quot;Efficient state, working order, good
                repair&quot; is the bar. Reg 5(2) is the documentation duty &mdash; if there&apos;s
                a maintenance log (and for portable tools there always is, in the firm&apos;s tool
                register), it has to be kept current. The HSE asks to see the log at any
                investigation; an empty or out-of-date log is itself evidence of breach.
              </>
            }
            cite="Source: Provision and Use of Work Equipment Regulations 1998 (S.I. 1998/2306), Reg 5 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Reg 4(2)"
            clause={
              <>
                &quot;As may be necessary to prevent danger, all systems shall be maintained so as to
                prevent, so far as is reasonably practicable, such danger.&quot;
              </>
            }
            meaning={
              <>
                EAWR&apos;s definition of &apos;system&apos; in Reg 2 is broad &mdash; it includes
                &quot;an electrical system in which all the electrical equipment is, or may be,
                electrically connected to a common source of electrical energy&quot;. That captures
                the portable tool plugged into a site supply. So PAT, in-service inspection and
                pre-use checks discharge Reg 4(2) at the same time as PUWER Reg 5 &mdash; one
                routine, two regs covered.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (S.I. 1989/635), Reg 4(2) — verbatim from legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>Pre-use visual — the daily six-point check</ContentEyebrow>

          <ConceptBlock
            title="Six points, every shift, every tool, before plugging in"
            onSite="The six-point check is the apprentice's most-repeated H&S routine. It takes about 10 seconds per tool once you've done it 100 times. Doing it visibly, every time, is what tells the supervisor you understand PUWER Reg 5 and what stops the one cracked-cable tool getting plugged in on a wet site morning."
          >
            <p>
              The six points, in order:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Supply cable</strong> &mdash; whole length. Cuts, abrasion, kinks, exposed conductor, taped repairs (a taped repair = quarantine; it&apos;s not a repair, it&apos;s a marker that something needs replacing). Particular attention to the entry into the plug and entry into the tool body &mdash; those are the two most common failure points.
              </li>
              <li>
                <strong>2. Plug</strong> &mdash; body intact, no cracks. Pins straight and not pitted or burned. Cord-grip clamping the cable sheath, not the conductors. For 110 V CEEform plugs, the screw-collar is properly tight.
              </li>
              <li>
                <strong>3. Tool casing</strong> &mdash; cracks, missing screws, contamination ingress (cement dust, water marks, oil). Vents clear so the motor can breathe.
              </li>
              <li>
                <strong>4. Guard or shield</strong> &mdash; present, correctly fitted, not damaged. Particular attention on angle grinders (the most-removed guard on site) and circular saws.
              </li>
              <li>
                <strong>5. Switch</strong> &mdash; operates positively, no stuck contacts, anti-restart (no-volt release) works after release. Test by trigger-only operation before connecting the supply.
              </li>
              <li>
                <strong>6. PAT label</strong> &mdash; current and in-date. Read the date, not just the colour. If the date is in the past, take it out of service.
              </li>
            </ul>
            <p>
              Six points. Ten seconds. Every tool, every shift. The routine is what catches the cable that got crushed yesterday and the plug that got knocked off the kerb.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>PAT — the formal electrical test</ContentEyebrow>

          <ConceptBlock
            title="What PAT actually tests, and how often"
            plainEnglish="PAT (Portable Appliance Testing) is the formal electrical test layer. It's a combined visual inspection and electrical test carried out by a competent person on a documented cycle. Despite the name 'testing' it's NOT just an electrical test — the visual is the bigger half of the job."
            onSite="Most apprentices won't do the formal PAT until they've done the City & Guilds 2377 qualification (a short add-on course, often a single weekend). Until then your job is to (a) do the daily visual, (b) recognise an in-date PAT label, and (c) take any tool with an out-of-date or missing label out of service."
          >
            <p>
              The PAT cycle:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Visual inspection</strong> &mdash; the same six-point check as the daily routine, but more thorough. The tester may open the plug to inspect terminations, may open the tool body to check internal connections.
              </li>
              <li>
                <strong>Earth continuity test (Class I tools)</strong> &mdash; checks the path from the plug earth pin to any exposed metal of the tool. Limit typically &lt; 0.1 &Omega; per metre of lead.
              </li>
              <li>
                <strong>Insulation resistance test</strong> &mdash; 500 V DC test between live conductors and earth. Limit typically &gt; 1 M&Omega; for hand-held equipment.
              </li>
              <li>
                <strong>Polarity check</strong> &mdash; lead is wired correctly L to L, N to N, E to E.
              </li>
              <li>
                <strong>Switch operation</strong> &mdash; on/off works, no-volt release functions.
              </li>
            </ul>
            <p>
              Pass &rarr; new label with date and tester ID. Fail &rarr; quarantine tag, tool out of service, defect logged, supervisor notified for repair or condemnation. The full PAT regime is governed by the IET&apos;s Code of Practice for In-service Inspection and Testing of Electrical Equipment (currently 5th edition).
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Quarantine and tag-out</ContentEyebrow>

          <ConceptBlock
            title="The 'do not use' tag is a safety system, not a sticker"
            onSite="Quarantine tags work the same way as lock-offs on isolated circuits — they're a formal indication that something is unsafe and not to be used. Removing one without authority is the same s.7 breach as removing someone else's lock-off. The tag stays until the competent person who fitted it (or someone with equivalent authority — usually the supervisor) is satisfied the tool is fixed."
          >
            <p>
              The defective-tool sequence:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Out of service</strong> &mdash; stop using it. Don&apos;t try to use it &apos;gently&apos; or &apos;just for one more job&apos;.
              </li>
              <li>
                <strong>2. Apply quarantine tag</strong> &mdash; the firm&apos;s &quot;do not use&quot; tag, signed by you and dated. Some firms also detach the supply lead as a physical reinforcement.
              </li>
              <li>
                <strong>3. Move to quarantine area</strong> &mdash; firm&apos;s designated spot. On site, the supervisor&apos;s box or an equivalent locked area. Not back in the van&apos;s general tool box.
              </li>
              <li>
                <strong>4. Log the defect</strong> &mdash; firm&apos;s tool register, defect log, or whatever paperwork the firm uses. Include the tool ID, the fault, the date, your name.
              </li>
              <li>
                <strong>5. Tell the supervisor</strong> &mdash; verbally as well as written. Don&apos;t rely on the paperwork being checked.
              </li>
              <li>
                <strong>6. Continue with alternative</strong> &mdash; get a replacement tool from the van or the supervisor. Don&apos;t skip the job; don&apos;t reuse the tagged tool.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Calibration of torque tools and test instruments</ContentEyebrow>

          <ConceptBlock
            title="Calibration is the inspection layer for precision tools"
            plainEnglish="PAT covers electrical safety. Calibration covers measurement accuracy. Torque drivers, torque wrenches, multimeters, MFTs, clamp meters, insulation testers — anything that has a numerical reading drift over time and needs periodic verification against a known reference. Annual calibration with a UKAS-traceable certificate is the standard requirement."
            onSite="When the supervisor sends a torque driver away for calibration it normally goes to a manufacturer (Wera, Wiha) or a UKAS-accredited calibration lab. Cost is £30–60 per tool. The certificate comes back, the date goes in the firm's instrument register, and the cycle repeats annually. Without the certificate the tool can't be used to demonstrate compliance with anything that needs a documented torque value."
          >
            <p>
              The two main families that need calibration:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Torque tools</strong> &mdash; preset torque screwdrivers (Wera Click-Torque, Wiha torqueVario), torque wrenches (Norbar, Teng). Drift caused by spring fatigue and temperature. Annual calibration typical; some manufacturers say every 5,000 cycles. Critical for distribution-board terminations (1.2&ndash;3.5 Nm typical) and any control-gear work where torque is specified.
              </li>
              <li>
                <strong>Test instruments</strong> &mdash; multimeters, MFTs, clamp meters, insulation testers, voltage testers. Drift caused by component ageing and shock. Annual calibration with a UKAS-traceable certificate is required by NICEIC, NAPIT and ELECSA at scheme audits. Sub 1.5 covers test instruments in detail.
              </li>
            </ul>
            <p>
              The firm keeps an instrument register listing every calibrated tool, its serial number, last calibration date, next calibration due date, and the calibration certificate reference. At a scheme audit the assessor asks to see this register and a sample of certificates. An out-of-date instrument used for a documented test result invalidates that test.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The firm&apos;s tool register</ContentEyebrow>

          <ConceptBlock
            title="What the paperwork actually looks like"
            plainEnglish="PUWER Reg 5(2) requires the maintenance log to be kept up to date. For a typical electrical contractor that means a tool register — a list of every tool the firm owns, with its inspection and PAT history. The register is what the HSE and the certification scheme assessor ask to see, and what feeds the supervisor's pre-shift sign-off on whether each tool is fit for work."
            onSite="Most firms run the tool register either as a spreadsheet in Google Sheets / Excel or in a dedicated tool-management app (Trakopolis, ToolWatch, ShareMyToolbox). The register is updated by the appointed PAT tester after each formal test, by supervisors when defects are reported, and by the office when new tools are purchased. Apprentices don't usually edit the register directly but should know how to look up a tool's status if asked."
          >
            <p>
              A typical tool-register entry holds:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Tool ID / asset number</strong> &mdash; firm-allocated unique identifier, often punch-marked or barcoded onto the tool body.
              </li>
              <li>
                <strong>Description</strong> &mdash; make, model, serial number (e.g. &quot;Makita HR2811FT 110 V SDS-Plus, S/N 12345&quot;).
              </li>
              <li>
                <strong>Voltage / class</strong> &mdash; 110 V, 230 V, cordless; Class I (earthed metal case) or Class II (double-insulated).
              </li>
              <li>
                <strong>Assigned operative or location</strong> &mdash; named individual or van/site.
              </li>
              <li>
                <strong>Last PAT date and result</strong> &mdash; with tester ID and pass/fail.
              </li>
              <li>
                <strong>Next PAT due date</strong> &mdash; calculated from the interval (3-monthly for 110 V site Class I).
              </li>
              <li>
                <strong>Defect history</strong> &mdash; list of reported faults with dates and resolution (repaired / replaced / condemned).
              </li>
              <li>
                <strong>Calibration date and next-due date</strong> &mdash; for torque tools, test instruments, anything calibratable.
              </li>
            </ul>
            <p>
              The register is the firm&apos;s legal evidence under PUWER Reg 5 / Reg 5(2) and EAWR Reg 4(2) that the &quot;system of work&quot; for tool maintenance exists and is being followed. At a NICEIC / NAPIT scheme audit the assessor asks to see it. At an HSE incident investigation the inspector asks to see it. An empty or out-of-date register is itself evidence of breach.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Treating PAT as the only check that matters"
            whatHappens={
              <>
                Apprentice picks up a 110 V SDS at the start of a shift. PAT label says
                &apos;tested 6 weeks ago, valid for 3 months&apos;. Apprentice doesn&apos;t look
                further &mdash; PAT is in date, so the tool must be safe. Plugs in. The supply
                lead has been crushed by the van&apos;s sliding door overnight and the inner cores
                are showing through a 30 mm split in the outer sheath. RCD on the transformer trips
                immediately. Tool is destroyed; the apprentice gets a fright and a lecture.
              </>
            }
            doInstead={
              <>
                Pre-use visual check is YOUR daily duty regardless of PAT status. The PAT label
                says the tool was safe SIX WEEKS AGO &mdash; it doesn&apos;t say anything about
                what happened in the van between then and now. Six points: cable, plug, casing,
                guard, switch, label. Ten seconds per tool. The label is one of the six checks,
                not a substitute for the other five.
              </>
            }
          />

          <CommonMistake
            title="Insulating-taping a damaged supply lead and carrying on"
            whatHappens={
              <>
                Apprentice notices a small split in a 110 V supply lead, wraps three turns of
                insulating tape around it, and uses the tool for the rest of the day. Tape works
                fine for the day. Two weeks later the tape has lifted at the edge, water has got
                in, the inner conductor is corroded, and the next user gets a shock when an
                un-RCD&apos;d 230 V tool is used on a parallel circuit and induced voltage hits
                the now-exposed cable. The original apprentice didn&apos;t cause the shock but the
                paper trail leads back.
              </>
            }
            doInstead={
              <>
                Insulating tape is NEVER a repair on a supply lead. The fix is a competent person
                fitting a new lead. As soon as the outer sheath of a portable tool&apos;s lead is
                breached, the tool goes out of service: tag, log, report, replace. The whole point
                of the layered inspection routine is that NO tool with a known fault stays in
                circulation. A taped lead is a fault sticker, not a fix.
              </>
            }
          />

          <Scenario
            title="Pre-use check catches a crushed lead before plug-in"
            situation={
              <>
                You arrive on a fit-out at 7am. The van&apos;s tool box has been knocked about by
                the firm&apos;s overnight stock movements and a 110 V combi drill&apos;s lead has
                been pinched between the sliding door and the bulkhead. There&apos;s a 25 mm flat
                spot in the rubber sheath, the outer is intact but flattened and the cable feels
                stiff at that point when you flex it. PAT label is in date (last tested 8 weeks
                ago). What do you do?
              </>
            }
            whatToDo={
              <>
                Take the drill out of service. The pre-use visual check has done its job &mdash;
                the lead has been mechanically damaged since the last PAT and the integrity of
                the cores can&apos;t be confirmed without an electrical test. Apply the firm&apos;s
                quarantine tag, write the fault on the defect log (&quot;crushed/flattened lead
                25 mm from plug, feels stiff on flex&quot;), put the drill in the supervisor&apos;s
                box, tell the supervisor verbally, and pick up an alternative drill from the van.
                The supervisor will arrange a new lead to be fitted by a competent person back at
                the workshop &mdash; that&apos;s a 10-minute repair that the apprentice doesn&apos;t
                do.
              </>
            }
            whyItMatters={
              <>
                The pre-use check exists for exactly this scenario &mdash; the damage that has
                happened SINCE the last PAT. PAT alone would have missed it. Catching it at
                7am stops a 30 mA RCD trip mid-job (or worse, an un-RCD&apos;d circuit causing a
                shock). The 30 seconds you spent on the visual saved the firm a tool, the
                supervisor an investigation, and you a hospital trip. That&apos;s why the layered
                regime exists and why the operative&apos;s daily duty is as important as the
                competent-person&apos;s formal test.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Three layers of inspection — operative pre-use visual every shift, in-service inspection by a competent person at a documented interval, formal PAT on the cycle (3-monthly for 110 V site Class I per HSE HSG107 + IET Code of Practice for In-service Inspection and Testing of Electrical Equipment, 5th ed.).",
              "Six-point pre-use check — cable, plug, casing, guard, switch, PAT label. Every tool, every shift, before plugging in. Ten seconds per tool once it's a habit.",
              "PUWER 1998 Reg 5 (maintenance) and EAWR 1989 Reg 4(2) (electrical systems maintained) both bite at the same time. The three-layer regime discharges both regs simultaneously.",
              "Defective tool sequence = take out of service, quarantine tag, move to quarantine area, log the defect, tell the supervisor, continue with an alternative. Insulating tape is NEVER a repair on a supply lead — the fix is a competent person fitting a new lead. Don't be the apprentice who 'uses it gently' or hides damage.",
              "Quarantine tag is a safety system, not a sticker. Removing it without authority is a HASAWA s.7 breach (failure to co-operate with employer's safety arrangements) — same as removing a colleague's lock-off.",
              "Hand tools (no electrical supply) still need pre-use visual checks under PUWER. VDE-insulated drivers — any visible damage to the insulation = withdraw from service.",
              "Torque tools and test instruments need annual UKAS-traceable calibration. Drifted torque drivers cause over- or under-torqued terminations that fail BS 7671 526.1. Drifted test instruments produce wrong test results that fail BS 7671 612.x.",
              "The firm's tool register is the legal evidence under PUWER Reg 5(2) that the maintenance system exists. NICEIC / NAPIT assessors and HSE inspectors both ask to see it; an empty register is itself evidence of breach.",
            ]}
          />

          <Quiz title="Tool safety checks knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section1/1-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.2 Power tools
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section1/1-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.4 Cable-prep tools
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
