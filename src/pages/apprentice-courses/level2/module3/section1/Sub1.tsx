/**
 * Module 3 · Section 1 · Sub 1 — Statutory regulations that govern UK electrical work
 * Maps to City & Guilds 2365-02 / Unit 203 / LO1 / AC 1.1, 1.3
 *   AC 1.1 — "Identify statutory regulations"
 *   AC 1.3 — "State implications of statutory regulations"
 *
 * Frame: these aren't guidance. They're the law. Break them and you can lose
 * your card, your livelihood, or your liberty. Module 1 introduced HASAWA and
 * EAWR in a safety context — here we frame all four statutory instruments as
 * DESIGN and INSTALL obligations, with enforcement consequences.
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
  'Statutory regulations — HASAWA, EAWR, ESQCR, Part P (1.1, 1.3) | Level 2 Module 3.1.1 | Elec-Mate';
const DESCRIPTION =
  'The four statutory regs every UK installer answers to — Health and Safety at Work Act, Electricity at Work Regs, ESQCR and Building Regs Part P. Who they bind, what they oblige and what happens when you breach them.';

/* ── Inline checks (wired into streaks/stats) ─────────────────────── */

const checks = [
  {
    id: 'mod3-s1-sub1-eawr-isolation',
    question:
      'You isolate a circuit at the consumer unit, lock off the breaker, voltage-test it dead and start work. Halfway through, the customer slips into the cupboard and toggles the breaker back on. Which statutory instrument did THEY breach?',
    options: [
      'The Electricity at Work Regulations 1989 — Reg 14 covers work on or near live conductors and Reg 13 covers the precautions for dead working. Anyone interfering with an isolation in place breaches EAWR, not just the electrician.',
      'The Health and Safety at Work etc. Act 1974, s.8 — interfering with anything provided in the interests of health and safety, which is the only provision that captures a person who is neither employer nor employee on the job.',
      'The Building Regulations 2010, Part P — because the breaker forms part of the consumer unit, re-energising it without authorisation counts as an unnotified alteration to a domestic circuit.',
      'The Provision and Use of Work Equipment Regulations 1998 — the breaker is work equipment, and operating it without authority is a misuse of equipment under PUWER rather than an electrical-safety breach.',
    ],
    correctIndex: 0,
    explanation:
      "EAWR binds 'every employer, employee and self-employed person'. That captures the customer once they touch the lock-off. In practice you flag it to the supervisor, retest dead, and document it — but legally the customer has put themselves on the wrong side of EAWR Reg 13/14, not you.",
  },
  {
    id: 'mod3-s1-sub1-esqcr-voltage',
    question:
      'A customer rings up — incoming voltage at the head is reading 198 V on the multimeter. They want you to "fix it". What statutory framework actually governs this and whose problem is it?',
    options: [
      'BS 7671 Reg 525 — the installer must correct any voltage drop below the permitted limit, so the fix is to upsize the meter tails until the reading at the head comes back up to 230 V.',
      "EAWR 1989 Reg 4 — the installer is responsible for the safety of the whole electrical system, so a low supply voltage is the installer's problem to remedy at the consumer unit.",
      'The Building Regulations Part P — a supply outside tolerance counts as an unsafe installation, so the installer must notify Building Control and bring the supply within limits before signing off.',
      'ESQCR 2002 — the supply is meant to sit at 230 V −6% / +10% (216–253 V). 198 V is below the legal floor, so this is a DNO obligation under ESQCR, not an installer fix.',
    ],
    correctIndex: 3,
    explanation:
      "ESQCR is the supply-side statute. It binds the Distribution Network Operator (DNO), not the installer. Anything below 216 V at the cut-out is the DNO's compliance problem — you raise it with the customer, advise them to call the DNO (or call it in yourself if you've got a relationship), and don't start hacking around in their meter.",
  },
  {
    id: 'mod3-s1-sub1-partp-notify',
    question:
      "You're swapping a damaged socket-outlet in a domestic kitchen for a like-for-like replacement. Does this need notifying under Building Regs Part P?",
    options: [
      'Yes — any electrical work in a kitchen is notifiable under Part P, because the kitchen is classed as a special location alongside bathrooms in the current Building Regulations.',
      'No — replacements, repairs and maintenance of existing accessories on existing circuits are NOT notifiable work under Part P, even in a kitchen. Notifiable work is new circuits and consumer unit replacements (and additions/alterations in special locations under the older interpretation).',
      'Yes — replacing any socket-outlet is notifiable because it alters a final circuit, so Building Control must be informed before the new accessory is connected.',
      'No — but only if the replacement socket is the same make and model; fitting a different brand counts as an alteration to the circuit and would then become notifiable.',
    ],
    correctIndex: 1,
    explanation:
      "Part P (England, post-2013) limits notifiable work to: a) install of a new circuit; b) replacement of a consumer unit; c) any addition/alteration to existing circuits in a special location (locations containing a bath/shower being the live one in domestic). Like-for-like socket swap on an existing circuit isn't on that list — but you still issue a Minor Works cert.",
  },
];

/* ── End-of-page Quiz (wired into streaks/stats) ──────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "A self-employed sub-contractor working on a commercial fit-out gets injured because his employer (the main contractor) didn't supply the agreed RCD-protected supply. Under HASAWA, who carries duties here?",
    options: [
      "Only the main contractor — as the employer who failed to supply the agreed RCD-protected supply, the duty rests entirely with them under HASAWA s.2, and the sub-contractor carries no personal duty for the incident.",
      "Both — HASAWA s.2 puts duties on employers towards employees, s.3 puts duties on employers towards non-employees affected by their work, and s.7 puts duties on every employee/self-employed person to take reasonable care for themselves and others.",
      "Only the injured sub-contractor — as a self-employed person he is responsible for his own safety under HASAWA s.7, so the duty for the injury sits with him alone.",
      "Neither under HASAWA — a failure to provide an RCD is purely an EAWR matter, so HASAWA places no duty on either party in this situation.",
    ],
    correctAnswer: 1,
    explanation:
      "HASAWA is layered. The main contractor owes duties to the sub under s.3 (people not in his employment but affected by his undertaking). The sub owes duties under s.7 (himself and others). Both can be prosecuted independently — and very often are, particularly post-incident.",
  },
  {
    id: 2,
    question:
      "Which statutory instrument explicitly requires that 'no person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or, where appropriate, injury, unless he possesses such knowledge or experience'?",
    options: [
      'HASAWA 1974 s.2 — the general duty on employers to provide training and supervision',
      'EAWR 1989 Reg 4 — the duty to maintain electrical systems to prevent danger',
      'EAWR 1989 Reg 16 — the competence regulation for technical knowledge and experience',
      'CDM 2015 Reg 8 — the duty on appointees to have the skills, knowledge and experience',
    ],
    correctAnswer: 2,
    explanation:
      "EAWR Reg 16. This is the legal definition of 'competence' for electrical work in Great Britain. The HSE uses this regulation to prosecute unqualified or under-supervised work. Your apprentice card, your scheme membership, your supervisor's sign-off — all of it exists to demonstrate compliance with EAWR Reg 16.",
  },
  {
    id: 3,
    question:
      "A homeowner hires a non-registered handyman to install a new shower circuit and consumer unit in a domestic property. The work is competent and safe. Have any statutory regs been breached?",
    options: [
      "No — because the work was carried out competently and safely, the technical duties under EAWR are satisfied, and Part P only bites where the installation is actually unsafe.",
      "No — Part P notification is the homeowner's responsibility, not the handyman's, so any breach falls on the householder rather than the person who did the work.",
      "Yes — EAWR Reg 16, because the handyman was not competent within the meaning of the regulation, regardless of whether the finished work happened to be safe.",
      "Yes — Building Regulations Part P. New circuits and CU replacements in dwellings are notifiable. The handyman should have either been on a competent person scheme (self-certifying) or notified Local Authority Building Control before starting. Safe work doesn't excuse the notification breach.",
    ],
    correctAnswer: 3,
    explanation:
      "Part P is a separate notification offence from the technical safety of the work. Even a perfect installation is unlawful if it's a notifiable category and wasn't notified. The Local Authority can require it to be ripped out, made compliant by a registered person, and re-certificated — at the homeowner's cost.",
  },
  {
    id: 4,
    question:
      "EAWR Reg 4(3) requires that 'every work activity, including operation, use and maintenance' of an electrical system shall be carried out in such a manner as not to give rise to danger. What practical activity does this directly mandate?",
    options: [
      "A safe system of work — including risk assessment, isolation procedure, voltage proving (dead-test), lock-off, and a written method statement where appropriate. Reg 4(3) is the legal hook for everything you'd recognise as 'site safety procedure'.",
      "Periodic inspection and testing of the fixed installation at the intervals given in BS 7671 Table 3.2, producing an EICR each time so the system's condition is formally recorded.",
      "Provision of suitable personal protective equipment to every operative before any electrical work begins, as the primary control for preventing danger during use and maintenance.",
      "Notification of all maintenance work to Building Control in advance, so the local authority can inspect the system before it is returned to service.",
    ],
    correctAnswer: 0,
    explanation:
      "Reg 4(3) is the everyday-work duty. It covers the whole lifecycle — operation, use, maintenance — not just the original install. That's why your safe-isolation procedure, your method statements and your daily site briefings are all legally framed by this single regulation.",
  },
  {
    id: 5,
    question:
      "Under ESQCR, what is the legal nominal supply voltage and tolerance at the consumer's cut-out for a single-phase domestic supply?",
    options: [
      "240 V −6% to +10% (so 226 V to 264 V)",
      "230 V −6% to +10% (so 216 V to 253 V)",
      "230 V ±10% (so 207 V to 253 V)",
      "230 V ±6% (so 216 V to 244 V)",
    ],
    correctAnswer: 1,
    explanation:
      "Schedule 1 of ESQCR sets the supply at 230 V with an asymmetric tolerance of −6% / +10%. That's 216 V to 253 V. Anything outside that band at the cut-out is a DNO compliance problem under ESQCR, not the installer's. Worth knowing because customers blame the electrician first.",
  },
  {
    id: 6,
    question:
      "An electrician is prosecuted after an electrocution caused by a missing earth. Which statutory instrument is most likely to be the primary charge and which body would bring it?",
    options: [
      "Building Regulations Part P — brought by Local Authority Building Control, because a missing earth is an unnotified breach of the notification regime for domestic work.",
      "ESQCR 2002 — brought by Ofgem, because the earthing arrangement is a supply-side matter that falls to the network operator's regulator.",
      "EAWR (almost always Reg 4, sometimes Reg 14 or 16) — brought by the Health and Safety Executive (HSE), or in a domestic context the Local Authority. HASAWA s.7 may be charged in parallel.",
      "The Consumer Rights Act 2015 — brought by Trading Standards, because the unsafe installation was a service that failed to meet the standard the customer was entitled to expect.",
    ],
    correctAnswer: 2,
    explanation:
      "EAWR is the workhorse regulation for electrical incident prosecutions. The HSE has primary enforcement on industrial/commercial sites; the Local Authority enforces in lower-risk premises (offices, shops, domestic-adjacent). HASAWA s.7 personal-duty charges often run alongside EAWR.",
  },
  {
    id: 7,
    question:
      "Maximum penalties on indictment (Crown Court) for a serious HASAWA / EAWR breach include:",
    options: [
      "A fixed maximum fine of £20,000 for individuals and companies alike, with no power to impose a custodial sentence regardless of how serious the breach was.",
      "An unlimited fine for individuals but no possibility of imprisonment, since health and safety breaches are treated purely as regulatory rather than criminal matters.",
      "Up to 6 months imprisonment and a £5,000 fine for individuals, the same caps that apply in the magistrates' court, because serious breaches are not triable in the Crown Court.",
      "Unlimited fine and/or up to 2 years imprisonment for individuals; unlimited fine for companies. Sentencing follows the Definitive Guideline (HSE Sentencing Council, 2016) and turns on culpability, harm and turnover.",
    ],
    correctAnswer: 3,
    explanation:
      "Unlimited fines, 2 years' custody for individuals on indictment. Companies have been hit with fines well into seven figures under the Sentencing Council guideline — culpability and turnover drive the number. This is why personal liability under HASAWA s.7 should genuinely focus the mind.",
  },
  {
    id: 8,
    question:
      "BS 7671 is referenced inside the Memorandum of Guidance to EAWR (HSR25). What does that referencing actually do legally?",
    options: [
      "It establishes BS 7671 as a means of demonstrating compliance with EAWR — meaning a court will treat following BS 7671 as strong evidence of having met the EAWR duty, and ignoring it as strong evidence of not having met it. BS 7671 itself remains non-statutory.",
      "It makes BS 7671 legally binding — once referenced in HSR25, a breach of any BS 7671 regulation becomes a criminal offence in its own right, prosecutable directly by the HSE.",
      "It replaces the relevant EAWR regulations with the BS 7671 text — from that point the British Standard, not the statutory instrument, is the document the courts apply to electrical work.",
      "It has no legal effect at all — HSR25 is guidance only, so the reference to BS 7671 is purely informative and carries no weight in any prosecution under EAWR.",
    ],
    correctAnswer: 0,
    explanation:
      "This is the bridge between Sub 1.1 (statutory) and Sub 1.2 (non-statutory). HSR25 lists BS 7671 as a way to comply with EAWR Reg 4. So while BS 7671 is technically just a British Standard, ignoring it puts you on the wrong side of the statutory regulation that DOES carry criminal sanctions.",
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs = [
  {
    question: "If BS 7671 isn't law, why does everyone keep treating it like it is?",
    answer:
      "Because the statutory regs (specifically EAWR Reg 4) demand that electrical systems be safe, but don't tell you HOW to make them safe. BS 7671 is the document that the HSE, the courts and every scheme provider use as the reference for 'how'. Ignore it and the prosecution case against you under EAWR writes itself. Sub 1.2 covers this in detail.",
  },
  {
    question: "What's the actual difference between HASAWA and EAWR?",
    answer:
      "HASAWA 1974 is the parent Act — it covers all work at work, electrical or not. EAWR 1989 is a set of regulations made under HASAWA that drill specifically into electrical work. EAWR is more detailed and more commonly used in electrician prosecutions, but HASAWA s.7 (personal duty) often gets charged alongside it.",
  },
  {
    question: "Does Part P apply in Scotland and Wales?",
    answer:
      "No. Part P is a Building Regulations 2010 instrument and Building Regs are devolved. Scotland has the Building (Scotland) Regulations and the Scottish Technical Handbooks. Wales has its own version of the Building Regs (the Part P notification rules in Wales mirror England's at present). Northern Ireland uses the Building Regulations (Northern Ireland) 2012. The technical standard everyone follows is still BS 7671.",
  },
  {
    question: "Who enforces what — HSE, Local Authority, Building Control or someone else?",
    answer:
      "HSE — higher-risk premises (factories, construction sites, utilities). Local Authority Environmental Health — lower-risk (offices, shops, leisure). Building Control (LABC or an Approved Inspector) — Part P notifiable work. ESQCR is enforced by the Secretary of State via the Energy Networks Association in practice. Ofgem regulates the DNOs commercially. Different breach, different enforcer.",
  },
  {
    question: "If I'm not on a competent person scheme, can I still legally do electrical work?",
    answer:
      "Yes — but with caveats. You can do non-notifiable work (most repairs, alterations on existing circuits outside special locations). For notifiable work in dwellings (new circuits, CU replacements, special-location additions in England/Wales) you must either be on a CPS (NICEIC, NAPIT, ELECSA, etc.) and self-certify, OR notify Local Authority Building Control BEFORE starting and pay them to inspect/sign off. Most working electricians are on a scheme because the second route is slow and expensive.",
  },
  {
    question: "Can I be personally prosecuted, or just my employer?",
    answer:
      "Both. HASAWA s.7 is a personal duty — every employee and self-employed person has to take reasonable care for themselves and anyone affected by their acts/omissions. EAWR Reg 16 is also personal — competence sits with the individual doing the work. Your employer can be prosecuted under HASAWA s.2/s.3 and EAWR. You can be prosecuted under HASAWA s.7 and EAWR. They are not mutually exclusive — both routinely run together post-incident.",
  },
];

export default function Sub1() {
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
            eyebrow="Module 3 · Section 1 · Subsection 1"
            title="Statutory regulations that govern UK electrical work"
            description="HASAWA, EAWR, ESQCR and Building Regs Part P — the four legal instruments every UK installer answers to. These aren't guidance. Break them and you can lose your card, your livelihood or your liberty."
            tone="emerald"
          />

          <TLDR
            points={[
              "Four statutory instruments bind UK electrical work: HASAWA 1974 (parent Act), EAWR 1989 (the trade-specific one), ESQCR 2002 (supply-side rules) and Building Regs Part P (notification of domestic work in England/Wales).",
              "All four carry criminal sanctions. EAWR Reg 4 (safe systems), Reg 13/14 (dead working) and Reg 16 (competence) are the regs the HSE prosecutes electricians under most often.",
              "Personal liability is real. HASAWA s.7 puts a duty on every individual on site — employer, employee, sub. You can be prosecuted alongside your firm, not instead of it.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the four statutory instruments that govern UK electrical installation work — HASAWA, EAWR, ESQCR and Building Regs Part P.",
              "Distinguish which regulation binds whom — installer, employer, DNO, customer, designer.",
              "State the implications of HASAWA s.2/s.3/s.7 — duties of employers and the personal duty under s.7.",
              "Explain the practical impact of EAWR Reg 4 (safe systems), Reg 13/14 (work on isolated and live conductors) and Reg 16 (competence).",
              "State the ESQCR supply-voltage tolerance (230 V −6%/+10%) and identify it as a DNO obligation, not an installer one.",
              "Identify which categories of domestic work are notifiable under Building Regs Part P in England, and the two routes to compliance (CPS self-certification vs LABC notification).",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this matters</ContentEyebrow>

          <ConceptBlock
            title="Statutory means criminal — not 'guidance you should probably follow'"
            plainEnglish="Statute is law made by Parliament. Breach a statutory regulation and you face a criminal court — fines, custody, a record, the lot. Non-statutory documents (BS 7671, GN3, OSG — covered in Sub 1.2) are evidence of HOW you complied with statute, but the statute itself is what carries the teeth."
            onSite="Module 1 met HASAWA and EAWR in a safety context. This Sub re-frames the same regs as DESIGN and INSTALL obligations. Same Acts, but the lens shifts from 'don't electrocute yourself' to 'here is the legal floor every installation has to clear before you sign anything.'"
          >
            <p>
              Four statutory instruments matter for everyday UK electrical work:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Health and Safety at Work etc Act 1974 (HASAWA)</strong> — the parent Act,
                covers all work activity in Great Britain.
              </li>
              <li>
                <strong>Electricity at Work Regulations 1989 (EAWR)</strong> — the trade-specific
                regulations made under HASAWA, applies to all work on or near electrical systems.
              </li>
              <li>
                <strong>Electricity Safety, Quality and Continuity Regulations 2002 (ESQCR)</strong>{' '}
                — the supply-side rules. Binds the DNO; the installer touches it only at the
                consumer's cut-out boundary.
              </li>
              <li>
                <strong>Building Regulations 2010, Part P</strong> — England's notification regime
                for domestic electrical work. Wales mirrors it; Scotland and Northern Ireland have
                their own equivalents.
              </li>
            </ul>
            <p>
              Get the order of priority straight in your head. HASAWA is the umbrella. EAWR sits
              under it for electrical work. ESQCR runs in parallel for supply. Part P is a
              standalone notification regime. All four can apply to the same job.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>HASAWA 1974 — the parent Act</ContentEyebrow>

          <ConceptBlock
            title="The Act that sits underneath everything else"
            plainEnglish="HASAWA is the umbrella law for all work activity. Every more specific regulation (EAWR, CDM, COSHH, the lot) is made under powers granted by HASAWA. It binds employers, employees, the self-employed, and anyone else whose work activity affects others."
          >
            <p>
              HASAWA's three load-bearing sections for an electrician:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Section 2</strong> — duty of every employer to ensure, so far as is
                reasonably practicable, the health, safety and welfare of his employees. Covers
                training, supervision, plant, working environment.
              </li>
              <li>
                <strong>Section 3</strong> — duty of every employer (and self-employed person)
                towards persons NOT in his employment who may be affected by his undertaking.
                Customers, the public, sub-contractors on the same site — all covered.
              </li>
              <li>
                <strong>Section 7</strong> — duty of every employee at work to take reasonable
                care for himself and others, and to co-operate with the employer's safety
                arrangements. This is the personal-liability hook.
              </li>
            </ul>
            <p>
              S.7 is the section most apprentices skip over and shouldn't. Your supervisor can be
              prosecuted under s.2, but YOU can be prosecuted under s.7 for the same incident,
              independently, in your own name. Two convictions, same job.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="'Reasonably practicable' — the phrase that carries all the weight"
            onSite="When the HSE knock on the door, this is the phrase they're testing. Did you do what was reasonably practicable? Reasonably practicable means the cost (time, money, effort) of the precaution was disproportionate to the risk. The bar is set by what a competent person would have done, not by what's convenient."
          >
            <p>
              HASAWA duties are nearly all qualified by 'so far as is reasonably practicable'
              (SFAIRP). It's a balancing test laid down by the courts (Edwards v National Coal Board,
              1949): the more serious the risk, the more you have to do to control it, until the
              cost of further precautions becomes disproportionate to the residual risk.
            </p>
            <p>
              In practice that means: a 30 mA RCD on a socket circuit serving outdoor equipment is
              reasonably practicable (cheap, well-known, prevents shock). Ignoring it because the
              customer didn't ask for it is not a defence — the cost is trivial against the risk
              avoided.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>EAWR 1989 — the trade-specific one</ContentEyebrow>

          <ConceptBlock
            title="The regulations that drill into electrical work"
            plainEnglish="EAWR is what HASAWA looks like when you point it specifically at electrical systems. Same legal weight as HASAWA (made under it), but the duties are spelled out in electrical terms — isolation, dead working, competence, equipment construction."
            onSite="If an electrician gets prosecuted after an incident, the primary charge is almost always one or more EAWR regs. Reg 4 is the everyday workhorse. Reg 13/14 covers isolation and live working. Reg 16 covers competence. These three account for the vast majority of HSE electrical enforcement notices."
          >
            <p>
              The EAWR regs that come up on every site:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 4 — systems, work activities and protective equipment.</strong> Every
                electrical system shall be constructed, maintained and used to prevent danger.
                Every work activity (operation, use, maintenance) shall be carried out so as not
                to give rise to danger. This is the legal hook for safe systems of work.
              </li>
              <li>
                <strong>Reg 13 — precautions for work on equipment made dead.</strong> Adequate
                precautions shall be taken to prevent equipment from becoming live again whilst
                work is in progress. This is your lock-off, your warning notice, your isolation
                procedure.
              </li>
              <li>
                <strong>Reg 14 — work on or near live conductors.</strong> No person shall be
                engaged in any work activity on or so near any live conductor that danger may arise
                unless three conditions are met: (a) it is unreasonable for it to be dead, (b)
                it is reasonable for the work to be done live, AND (c) suitable precautions are
                taken to prevent injury. The 'dead unless impractical' default sits here.
              </li>
              <li>
                <strong>Reg 16 — persons to be competent to prevent danger and injury.</strong>{' '}
                The competence regulation. No-one shall be engaged in a work activity where
                technical knowledge or experience is necessary to prevent danger unless they
                possess such knowledge or experience, or are under appropriate supervision.
              </li>
            </ul>
            <p>
              EAWR also covers strength and capability of equipment (Reg 5), adverse environments
              (Reg 6), insulation (Reg 7), earthing (Reg 8), integrity of conductors (Reg 9),
              connections (Reg 10), means of protection (Reg 11), means of cutting off and
              isolation (Reg 12) and adequate working space, access and lighting (Reg 15).
              Every one of those reads like a chapter heading in BS 7671 — that's deliberate.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Memorandum of Guidance on EAWR (HSR25) — referencing BS 7671"
            clause="The Memorandum of Guidance on the Electricity at Work Regulations 1989 (HSR25, published by the HSE) recognises that compliance with the requirements of BS 7671 is one means of demonstrating that the requirements of the Electricity at Work Regulations have been satisfied for fixed electrical installations in scope of BS 7671."
            meaning={
              <>
                This is the legal bridge. BS 7671 itself is non-statutory (Sub 1.2). But the HSE's
                own guidance to EAWR says: follow BS 7671 and you're presumed to have complied with
                the statutory duty. Don't follow it and you've got a problem demonstrating you met
                EAWR Reg 4. That's why every electrician on site follows BS 7671 even though
                technically nobody's making them.
              </>
            }
            cite="Reference: HSE publication HSR25 (Memorandum of Guidance on the Electricity at Work Regulations 1989) — see the discussion of fixed installations and the role of BS 7671 (paraphrased)."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>ESQCR 2002 — the supply-side rules</ContentEyebrow>

          <ConceptBlock
            title="The regulations that bind the DNO, not you"
            plainEnglish="ESQCR is the law that sits on the supply side of the cut-out — the bit owned by the Distribution Network Operator (UK Power Networks, Northern Powergrid, SP Energy Networks, etc). It tells the DNO what voltage to deliver, how to earth, how to maintain the overhead network. The installer's interest is mostly in knowing where ESQCR ends and BS 7671 begins."
            onSite="The boundary in a normal domestic is the consumer's terminals on the meter. Everything to the supply-side of that is ESQCR / DNO territory. Everything to the load-side is yours, and BS 7671 takes over."
          >
            <p>
              The bits of ESQCR that affect day-to-day install work:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Schedule 1 — voltage and frequency.</strong> Single-phase nominal is 230 V
                with a tolerance of −6% to +10% (so 216 V to 253 V). Three-phase is 400 V with the
                same percentage tolerance. Frequency is 50 Hz ±1%. If the supply is reading outside
                that band at the cut-out, it's a DNO compliance problem.
              </li>
              <li>
                <strong>Earthing arrangements.</strong> ESQCR sets the rules for the DNO providing
                earthing facilities to the consumer. TN-C-S (PME / Protective Multiple Earthing)
                terminology comes from here. The 2026 amendment to BS 7671 (A4:2026) explicitly
                recognises PNB (Protective Neutral Bonding) as a TN-C-S sub-arrangement on the
                inspection schedules — see Module 4 for the install-side detail.
              </li>
              <li>
                <strong>Reg 28 — duty of consumer.</strong> The customer (and by extension the
                installer working for them) must not connect equipment that interferes with the
                supply, the meter or the earthing. Things like back-feeding generators or
                misconnecting solar inverters can put you in breach of ESQCR.
              </li>
              <li>
                <strong>Reg 29 — beyond the cut-out.</strong> Confirms that the DNO's
                responsibility ends at the consumer's terminals. Past that point you, the
                installer, are the responsible party under EAWR.
              </li>
            </ul>
            <p>
              Practical takeaway: if the customer's voltage is 198 V at the head, that's an
              ESQCR Schedule 1 problem and the DNO has to fix it. You don't fit a buck-boost
              transformer — you call the DNO and document it.
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

          <ContentEyebrow>Building Regulations Part P</ContentEyebrow>

          <ConceptBlock
            title="The notification regime for domestic electrical work"
            plainEnglish="Part P is the bit of the Building Regulations 2010 that says certain categories of electrical work in dwellings must be notified to Building Control — either via a Competent Person Scheme (NICEIC, NAPIT, ELECSA) self-certifying, or via the Local Authority before starting."
            onSite="Part P is England-only as written; Wales mirrors it; Scotland and Northern Ireland have their own Building Regs. The technical standard everyone follows on either side of the border is still BS 7671. Part P is about NOTIFICATION, not technical compliance."
          >
            <p>
              In England, post-2013, the notifiable categories under Part P are:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>(a) Installation of a new circuit</strong> — anything that adds a new
                circuit at the consumer unit, e.g. a new shower circuit, a dedicated EV charger
                circuit, a new garage sub-main.
              </li>
              <li>
                <strong>(b) Replacement of a consumer unit</strong> — full CU swap-out, common when
                upgrading from a board with no RCD/RCBO protection to a current-spec board.
              </li>
              <li>
                <strong>(c) Any addition or alteration to existing circuits in a special location</strong>{' '}
                — locations containing a bath or shower being the live one in domestic. So
                extending an existing lighting circuit into a bathroom IS notifiable; extending
                the same circuit into a bedroom isn't.
              </li>
            </ul>
            <p>
              Anything else (replacement accessories, like-for-like socket swaps, repairs to
              existing circuits outside special locations) is non-notifiable. You should still
              issue a Minor Works certificate, but you don't have to notify Building Control.
            </p>
            <p>
              Two routes to compliance for notifiable work:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Competent Person Scheme (CPS)</strong> — registered with NICEIC, NAPIT,
                ELECSA, Stroma, etc. You self-certify, the scheme provider notifies LABC on your
                behalf within 30 days, the homeowner gets the Building Reg compliance certificate.
                Fast and built into the workflow.
              </li>
              <li>
                <strong>LABC notification</strong> — notify Local Authority Building Control BEFORE
                starting, pay them a fee, they (or an Approved Inspector) inspect and sign off the
                work. Slow, expensive, only used when the electrician isn't on a CPS.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Building Regulations 2010 (England) — Part P, Requirement P1"
            clause="Reasonable provision shall be made in the design and installation of electrical installations in order to protect persons operating, maintaining or altering the installations from fire or injury."
            meaning={
              <>
                That single sentence is Part P in its entirety. It doesn't tell you HOW to protect
                people — it points at BS 7671 (via Approved Document P) as the deemed-to-satisfy
                route. Comply with BS 7671 and you're presumed to have met Part P. The rest of the
                Part P regime (notification, CPS schemes, LABC sign-off) sits in regs 12 and 20 of
                the Building Regulations 2010, not in Part P itself.
              </>
            }
            cite="Source: The Building Regulations 2010 (SI 2010/2214), Schedule 1, Part P, Requirement P1; supported by Approved Document P (paraphrased)."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Enforcement and personal liability</ContentEyebrow>

          <ConceptBlock
            title="Who enforces what — and what they can hit you with"
            onSite="Different regs, different enforcers, different sanctions. Knowing who shows up after a job goes wrong is half the battle in understanding why each statute exists."
          >
            <p>
              Enforcement breakdown:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>HASAWA / EAWR — HSE</strong> on higher-risk premises (factories, construction
                sites, utilities). <strong>Local Authority Environmental Health</strong> on
                lower-risk (offices, shops, leisure, most retail). Both can issue improvement
                notices, prohibition notices and prosecute.
              </li>
              <li>
                <strong>ESQCR</strong> — enforced by the Secretary of State (in practice through
                the Energy Networks Association and Ofgem). Mostly bites the DNO, occasionally the
                customer for breaches of Reg 28 (back-feeding, interference).
              </li>
              <li>
                <strong>Building Regs / Part P</strong> — enforced by Local Authority Building
                Control (LABC) or an Approved Inspector. Can require non-compliant work to be
                ripped out, made compliant by a registered person, and re-certificated at the
                building owner's expense. Fines up to £5,000 plus £50 per day for continuing
                offences.
              </li>
            </ul>
            <p>
              Sentencing for serious HASAWA/EAWR breaches on indictment: unlimited fine and/or up
              to 2 years' imprisonment for individuals; unlimited fine for companies. Sentencing
              follows the HSE Sentencing Council Definitive Guideline (2016) — the headline
              numbers turn on culpability, harm and (for companies) annual turnover. Sevenfigure
              fines for large firms are routine after a fatality.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating BS 7671 as the law and statutory regs as 'the boring bit at the back of the book'"
            whatHappens={
              <>
                Apprentice memorises BS 7671 reg numbers, can quote 411.3.4 in his sleep, but
                couldn't tell you which Act made BS 7671 relevant in the first place. After an
                incident, the prosecution charge isn't 'breach of BS 7671' — it's 'breach of EAWR
                Reg 4', and BS 7671 is just the document used to prove what 'safe' looked like.
                Knowing the technical reg without knowing the statutory hook leaves you exposed
                in a witness box and clueless about why the inspector is asking what they're
                asking.
              </>
            }
            doInstead={
              <>
                Get the hierarchy straight. HASAWA is the law. EAWR is the law. ESQCR is the law.
                Part P is the law. BS 7671 is the standard the courts use to judge whether you
                complied with the law. When you cite a BS 7671 reg, mentally tag it to the
                statutory duty it satisfies — that's how the inspector thinks, that's how the
                court thinks, and that's how you should think.
              </>
            }
          />

          <CommonMistake
            title="Assuming ESQCR is 'the DNO's problem' and skipping it on the apprentice paper"
            whatHappens={
              <>
                Question comes up about supply voltage tolerance, or about back-feed protection on a
                domestic solar install, or about why the DNO needs to be notified for a CU change.
                Apprentice draws a blank because they parked ESQCR as 'not my reg'. In practice
                ESQCR Reg 28 absolutely binds the installer the moment you connect anything to the
                consumer's installation that could affect the supply or the earthing.
              </>
            }
            doInstead={
              <>
                Treat ESQCR as the rules at the boundary. The supply side is the DNO's. The
                consumer side is yours under BS 7671. But anything you do at the boundary
                (earthing arrangements, generator interconnection, EV charger DC-fault protection,
                CU change-out on a TN-C-S supply) puts you back into ESQCR territory. Know
                Schedule 1 and Reg 28/29 cold.
              </>
            }
          />

          <Scenario
            title="EICR fail because the inspector says you ignored a manufacturer's instruction"
            situation={
              <>
                You did a CU change-out on a TN-C-S supply six months ago, NICEIC-certified the
                work, all clear. The customer commissions a periodic EICR through a different firm.
                The inspector codes a C2 because the SPD you fitted is installed with 700 mm of
                bundled lead, contrary to BS 7671 Section 534 AND contrary to the manufacturer's
                installation literature. The customer is on the phone, refusing to pay the bill
                and threatening to report you to NICEIC.
              </>
            }
            whatToDo={
              <>
                Three legal frames are running here at once. (1) BS 7671 534.4.4.2 / 534.4.10 — the
                technical breach. (2) BS 7671 Reg 510.3 / 134.1.1 — selection and erection 'shall
                take account of manufacturers' instructions' and 'good workmanship by skilled
                persons shall be used'. (3) EAWR Reg 4 sitting underneath the lot — by ignoring the
                BS 7671 method that demonstrates compliance with EAWR, you've weakened your defence
                to any subsequent statutory action. Fix the install, reissue the cert, log it on the
                NICEIC portal as a remediated job. Don't argue the BS 7671 point — argue the
                manufacturer's-instruction point and you'll lose every time.
              </>
            }
            whyItMatters={
              <>
                The non-statutory documents (BS 7671, manufacturer's literature, scheme rules) are
                what give the statutory regs their teeth. Sub 1.2 covers this in detail. The C2
                isn't just a coding judgement — it's evidence the inspector would hand to the HSE
                if the SPD ever failed and a fire followed.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Four statutory instruments govern UK electrical work: HASAWA 1974, EAWR 1989, ESQCR 2002 and Building Regs Part P (England/Wales). All four carry criminal sanctions.",
              "HASAWA is the parent Act. s.2 binds employers to employees; s.3 binds them to non-employees affected; s.7 is the personal duty on every worker — including you.",
              "EAWR is the trade-specific reg. Reg 4 (safe systems), Reg 13/14 (dead working / live working), Reg 16 (competence) are the regs the HSE prosecutes electricians under most often.",
              "ESQCR sets supply tolerance at 230 V −6% / +10% (216–253 V) under Schedule 1. Below 216 V at the cut-out is a DNO problem, not yours.",
              "Part P notifiable work in England: new circuits, CU replacements, and additions/alterations in special locations. Two routes: CPS self-certification or LABC notification.",
              "BS 7671 is non-statutory but referenced in HSR25 as the means of demonstrating compliance with EAWR Reg 4. That's the bridge to Sub 1.2.",
              "Personal liability under HASAWA s.7 and EAWR Reg 16 is real. You can be prosecuted alongside your firm, not instead of it. Maximum sentence on indictment: unlimited fine and/or 2 years' custody for individuals.",
            ]}
          />

          <Quiz title="Statutory regulations — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section6/6-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous module
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module 2 — Principles of electrical science
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section1/1-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Non-statutory regulations and guidance
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
