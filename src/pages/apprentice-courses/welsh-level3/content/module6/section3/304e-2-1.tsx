/**
 * Ported from the English course, combining:
 *   level2/module3/section1/Sub1.tsx
 *   level2/module3/section1/Sub2.tsx
 *
 * The Welsh Level 3 qualification covers this material, so the teaching is
 * carried into this course rather than sending a learner out to read it in
 * another one. The text is unchanged; only the page shell was removed.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
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
      'Only the main contractor — as the employer who failed to supply the agreed RCD-protected supply, the duty rests entirely with them under HASAWA s.2, and the sub-contractor carries no personal duty for the incident.',
      'Both — HASAWA s.2 puts duties on employers towards employees, s.3 puts duties on employers towards non-employees affected by their work, and s.7 puts duties on every employee/self-employed person to take reasonable care for themselves and others.',
      'Only the injured sub-contractor — as a self-employed person he is responsible for his own safety under HASAWA s.7, so the duty for the injury sits with him alone.',
      'Neither under HASAWA — a failure to provide an RCD is purely an EAWR matter, so HASAWA places no duty on either party in this situation.',
    ],
    correctAnswer: 1,
    explanation:
      'HASAWA is layered. The main contractor owes duties to the sub under s.3 (people not in his employment but affected by his undertaking). The sub owes duties under s.7 (himself and others). Both can be prosecuted independently — and very often are, particularly post-incident.',
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
      'A homeowner hires a non-registered handyman to install a new shower circuit and consumer unit in a domestic property. The work is competent and safe. Have any statutory regs been breached?',
    options: [
      'No — because the work was carried out competently and safely, the technical duties under EAWR are satisfied, and Part P only bites where the installation is actually unsafe.',
      "No — Part P notification is the homeowner's responsibility, not the handyman's, so any breach falls on the householder rather than the person who did the work.",
      'Yes — EAWR Reg 16, because the handyman was not competent within the meaning of the regulation, regardless of whether the finished work happened to be safe.',
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
      'Provision of suitable personal protective equipment to every operative before any electrical work begins, as the primary control for preventing danger during use and maintenance.',
      'Notification of all maintenance work to Building Control in advance, so the local authority can inspect the system before it is returned to service.',
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
      '240 V −6% to +10% (so 226 V to 264 V)',
      '230 V −6% to +10% (so 216 V to 253 V)',
      '230 V ±10% (so 207 V to 253 V)',
      '230 V ±6% (so 216 V to 244 V)',
    ],
    correctAnswer: 1,
    explanation:
      "Schedule 1 of ESQCR sets the supply at 230 V with an asymmetric tolerance of −6% / +10%. That's 216 V to 253 V. Anything outside that band at the cut-out is a DNO compliance problem under ESQCR, not the installer's. Worth knowing because customers blame the electrician first.",
  },
  {
    id: 6,
    question:
      'An electrician is prosecuted after an electrocution caused by a missing earth. Which statutory instrument is most likely to be the primary charge and which body would bring it?',
    options: [
      'Building Regulations Part P — brought by Local Authority Building Control, because a missing earth is an unnotified breach of the notification regime for domestic work.',
      "ESQCR 2002 — brought by Ofgem, because the earthing arrangement is a supply-side matter that falls to the network operator's regulator.",
      'EAWR (almost always Reg 4, sometimes Reg 14 or 16) — brought by the Health and Safety Executive (HSE), or in a domestic context the Local Authority. HASAWA s.7 may be charged in parallel.',
      'The Consumer Rights Act 2015 — brought by Trading Standards, because the unsafe installation was a service that failed to meet the standard the customer was entitled to expect.',
    ],
    correctAnswer: 2,
    explanation:
      'EAWR is the workhorse regulation for electrical incident prosecutions. The HSE has primary enforcement on industrial/commercial sites; the Local Authority enforces in lower-risk premises (offices, shops, domestic-adjacent). HASAWA s.7 personal-duty charges often run alongside EAWR.',
  },
  {
    id: 7,
    question:
      'Maximum penalties on indictment (Crown Court) for a serious HASAWA / EAWR breach include:',
    options: [
      'A fixed maximum fine of £20,000 for individuals and companies alike, with no power to impose a custodial sentence regardless of how serious the breach was.',
      'An unlimited fine for individuals but no possibility of imprisonment, since health and safety breaches are treated purely as regulatory rather than criminal matters.',
      "Up to 6 months imprisonment and a £5,000 fine for individuals, the same caps that apply in the magistrates' court, because serious breaches are not triable in the Crown Court.",
      'Unlimited fine and/or up to 2 years imprisonment for individuals; unlimited fine for companies. Sentencing follows the Definitive Guideline (HSE Sentencing Council, 2016) and turns on culpability, harm and turnover.',
    ],
    correctAnswer: 3,
    explanation:
      "Unlimited fines, 2 years' custody for individuals on indictment. Companies have been hit with fines well into seven figures under the Sentencing Council guideline — culpability and turnover drive the number. This is why personal liability under HASAWA s.7 should genuinely focus the mind.",
  },
  {
    id: 8,
    question:
      'BS 7671 is referenced inside the Memorandum of Guidance to EAWR (HSR25). What does that referencing actually do legally?',
    options: [
      'It establishes BS 7671 as a means of demonstrating compliance with EAWR — meaning a court will treat following BS 7671 as strong evidence of having met the EAWR duty, and ignoring it as strong evidence of not having met it. BS 7671 itself remains non-statutory.',
      'It makes BS 7671 legally binding — once referenced in HSR25, a breach of any BS 7671 regulation becomes a criminal offence in its own right, prosecutable directly by the HSE.',
      'It replaces the relevant EAWR regulations with the BS 7671 text — from that point the British Standard, not the statutory instrument, is the document the courts apply to electrical work.',
      'It has no legal effect at all — HSR25 is guidance only, so the reference to BS 7671 is purely informative and carries no weight in any prosecution under EAWR.',
    ],
    correctAnswer: 0,
    explanation:
      'This is the bridge between the statutory documents and the non-statutory ones. HSR25 lists BS 7671 as a way to comply with EAWR Reg 4. So while BS 7671 is technically just a British Standard, ignoring it puts you on the wrong side of the statutory regulation that DOES carry criminal sanctions.',
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs = [
  {
    question: "If BS 7671 isn't law, why does everyone keep treating it like it is?",
    answer:
      "Because the statutory regs (specifically EAWR Reg 4) demand that electrical systems be safe, but don't tell you HOW to make them safe. BS 7671 is the document that the HSE, the courts and every scheme provider use as the reference for 'how'. Ignore it and the prosecution case against you under EAWR writes itself.",
  },
  {
    question: "What's the actual difference between HASAWA and EAWR?",
    answer:
      'HASAWA 1974 is the parent Act — it covers all work at work, electrical or not. EAWR 1989 is a set of regulations made under HASAWA that drill specifically into electrical work. EAWR is more detailed and more commonly used in electrician prosecutions, but HASAWA s.7 (personal duty) often gets charged alongside it.',
  },
  {
    question: 'Does Part P apply in Scotland and Wales?',
    answer:
      "No. Part P is a Building Regulations 2010 instrument and Building Regs are devolved. Scotland has the Building (Scotland) Regulations and the Scottish Technical Handbooks. Wales has its own version of the Building Regs (the Part P notification rules in Wales mirror England's at present). Northern Ireland uses the Building Regulations (Northern Ireland) 2012. The technical standard everyone follows is still BS 7671.",
  },
  {
    question: 'Who enforces what — HSE, Local Authority, Building Control or someone else?',
    answer:
      'HSE — higher-risk premises (factories, construction sites, utilities). Local Authority Environmental Health — lower-risk (offices, shops, leisure). Building Control (LABC or an Approved Inspector) — Part P notifiable work. ESQCR is enforced by the Secretary of State via the Energy Networks Association in practice. Ofgem regulates the DNOs commercially. Different breach, different enforcer.',
  },
  {
    question: "If I'm not on a competent person scheme, can I still legally do electrical work?",
    answer:
      'Yes — but with caveats. You can do non-notifiable work (most repairs, alterations on existing circuits outside special locations). For notifiable work in dwellings (new circuits, CU replacements, special-location additions in England/Wales) you must either be on a CPS (NICEIC, NAPIT, ELECSA, etc.) and self-certify, OR notify Local Authority Building Control BEFORE starting and pay them to inspect/sign off. Most working electricians are on a scheme because the second route is slow and expensive.',
  },
  {
    question: 'Can I be personally prosecuted, or just my employer?',
    answer:
      'Both. HASAWA s.7 is a personal duty — every employee and self-employed person has to take reasonable care for themselves and anyone affected by their acts/omissions. EAWR Reg 16 is also personal — competence sits with the individual doing the work. Your employer can be prosecuted under HASAWA s.2/s.3 and EAWR. You can be prosecuted under HASAWA s.7 and EAWR. They are not mutually exclusive — both routinely run together post-incident.',
  },
];

/* ── Inline checks2 (wired into streaks/stats) ─────────────────────── */

const checks2 = [
  {
    id: 'mod3-s1-sub2-bs7671-status',
    question:
      'True or false: BS 7671 is a Statutory Instrument and ignoring it is automatically a criminal offence.',
    options: [
      'False — BS 7671 is a British Standard published by BSI / co-published by the IET. It carries no statutory force on its own, but it is the document that the HSE, the courts and every CPS use to decide whether you complied with EAWR Reg 4. Ignoring it makes the prosecution case under EAWR a lot easier to bring.',
      'True — BS 7671 was given statutory force by the Building Regulations 2010, so a breach of any of its regulations is a criminal offence prosecutable in the same way as a breach of EAWR.',
      'True — because the Electricity at Work Regulations 1989 incorporate BS 7671 by reference, the standard became part of the statute itself, so failing to follow it is automatically unlawful.',
      'False — BS 7671 is purely advisory and has no bearing on any prosecution; the courts rely solely on the wording of EAWR and never refer to British Standards as evidence of compliance.',
    ],
    correctIndex: 0,
    explanation:
      "BS 7671 is non-statutory by status but quasi-mandatory in practice. HSR25 (the HSE's guidance on EAWR) explicitly cites compliance with BS 7671 as a way to demonstrate compliance with EAWR. So the law is EAWR; the document used to judge whether you met it is BS 7671. Same effect, different legal route.",
  },
  {
    id: 'mod3-s1-sub2-gn3-vs-bs7671',
    question:
      "You're doing an EICR. The GN3 example test sequence and the wording in BS 7671 Chapter 64 give slightly different ways of describing the same test. Which one wins?",
    options: [
      'BS 7671 is the standard; GN3 is a guidance document that explains how to apply BS 7671 in practice. If they conflict, BS 7671 is the authority. GN3 should be read as the recommended practical interpretation, not as a competing standard.',
      'GN3 wins — as the more recently published document it supersedes the older BS 7671 wording, so where they differ the GN3 test sequence is the one to follow.',
      'Whichever the scheme inspector prefers — there is no formal hierarchy between the two, so the deciding factor is the personal interpretation of whoever assesses the EICR.',
      "Neither — for an EICR you follow the manufacturer's instructions for the test instrument instead, because the device documentation overrides both BS 7671 and GN3 on test method.",
    ],
    correctIndex: 0,
    explanation:
      "GN3 is published by the IET as a guidance note specifically supporting BS 7671 Part 6 (Inspection and Testing). It's authoritative because the same body publishes both, but BS 7671 is the standard, GN3 is the explanation. The scheme inspector will accept either, but if they conflict on a fine point, the BS 7671 wording is the one you cite.",
  },
  {
    id: 'mod3-s1-sub2-cps-implication',
    question:
      "A NICEIC-registered firm fits a consumer unit, doesn't do an OPDC test, doesn't issue an EIC, and the customer complains. The work is electrically sound. What's the realistic non-criminal consequence the firm faces?",
    options: [
      'A criminal prosecution by the HSE — failing to issue an EIC is a breach of EAWR Reg 4, so the firm faces an unlimited fine and possible imprisonment of the director responsible.',
      "NICEIC scheme action — non-conformance notice, possible suspension, possible removal from the scheme. Removal from the CPS means: no more self-certification under Part P, customers' insurance defences weakened, marketing claims (logo, badge) withdrawn, and frequently insurer-driven loss of public liability cover. The job stays civil, but the firm's ability to trade collapses.",
      'A Trading Standards investigation under the Consumer Rights Act 2015 — the missing certificate means the service was not as described, so the firm is ordered to refund the customer and pay a fixed penalty.',
      "A Building Control enforcement notice requiring the consumer unit to be removed — because no EIC was issued, the work is treated as unnotified and the local authority can have it ripped out at the firm's cost.",
    ],
    correctIndex: 1,
    explanation:
      "Scheme membership is voluntary and non-statutory, but losing it has commercial consequences far worse than most fines. Without a CPS, you can't self-certify Part P notifiable work. Without a Part P self-cert route, your turnaround on every domestic job slows by weeks. Without scheme membership, your insurer often refuses cover. The non-statutory framework's enforcement is commercial, not criminal — but it bites hard.",
  },
];

/* ── End-of-page Quiz (wired into streaks/stats) ──────────────────── */

const quizQuestions2 = [
  {
    id: 1,
    question:
      'What does BS 7671:2018+A4:2026 actually mean as a citation — break down the four parts.',
    options: [
      'BS = British Standard, 7671 = the year the standard was first published, 2018 = the edition number written in date form, A4 = the room or section the standard applies to, 2026 = the year the standard expires and must be renewed.',
      'BS = British Standard, 7671 = standard number, 2018 = base edition publication year (the 18th Edition), A4 = the fourth amendment to that base edition, 2026 = year that fourth amendment was published.',
      'BS = British Standard, 7671 = the IET membership number of the publishing committee, 2018 = the first amendment year, A4 = the paper size the standard is printed on, 2026 = the base edition year.',
      'BS = British Standard, 7671 = the EAWR regulation it implements, 2018 = the year it became statutory, A4 = the appendix number, 2026 = the year it was withdrawn and replaced.',
    ],
    correctAnswer: 1,
    explanation:
      "Read it as 'British Standard 7671, 2018 base edition, fourth amendment dated 2026'. So the underlying standard is the 18th Edition (2018), and we're now on the A4:2026 amendment. Knowing the citation matters because BS 7671 changes substantially between amendments — A4:2026 brought AFDD requirements, the TN-C-S → PNB renaming and new inspection schedule columns.",
  },
  {
    id: 2,
    question:
      'Which IET publication is the practical companion specifically to BS 7671 Part 6 (Inspection and Testing)?',
    options: [
      'Guidance Note 1 — Selection and Erection',
      'On-Site Guide (OSG)',
      'Guidance Note 3 — Inspection and Testing',
      'Guidance Note 8 — Earthing and Bonding',
    ],
    correctAnswer: 2,
    explanation:
      'GN3 is the dedicated I&T companion. It walks through initial verification and periodic inspection, gives example test sequences, recommended condition codes (C1/C2/C3/FI), and the worked examples for filling out an EIC and EICR. Every working electrician on testing duties has a copy.',
  },
  {
    id: 3,
    question: 'The On-Site Guide (OSG) is aimed primarily at:',
    options: [
      'Designers of large industrial and three-phase distribution systems — it pulls the complex load-calculation and discrimination tables out of BS 7671 for high-current commercial design work.',
      'Inspectors and testers carrying out EICRs — it sets out the periodic-inspection test sequence and condition-coding framework as the field reference for testing duties.',
      'Manufacturers of electrical accessories — it specifies the product standards and markings a device must meet before it can be sold for use under BS 7671.',
      'Installers of standard domestic and small commercial installations — it pulls the most-used BS 7671 tables (cable sizing, diversity, ratings) into a pocket-sized reference and explains the standard install methods.',
    ],
    correctAnswer: 3,
    explanation:
      "The OSG is the install-side companion to BS 7671. It doesn't replace BS 7671 — it picks out the parts a typical site electrician uses every day (single-phase, sub-100 A supplies, common cable types) and gives quick-reference tables and worked examples. For anything outside the standard envelope, you go back to BS 7671 itself.",
  },
  {
    id: 4,
    question: 'What does JIB grading determine for an electrician on a JIB-affiliated job?',
    options: [
      'The minimum hourly/weekly rate of pay, the holiday entitlement, the travel/lodging allowances, the categorisation (Adult Trainee → Labourer → Apprentice → Electrician → Approved Electrician → Technician), and the H&S handbook obligations. Grading is verified by JIB card.',
      'Which categories of Part P notifiable work the electrician may self-certify, since the JIB grade is the competent person scheme that authorises Building Regulations sign-off.',
      'The maximum prospective fault current the electrician is permitted to work on, with higher JIB grades cleared for higher-energy switchgear and distribution work.',
      'The frequency of periodic inspection the electrician must apply to their installations, with the JIB grade setting the EICR interval the contractor is allowed to recommend.',
    ],
    correctAnswer: 0,
    explanation:
      "The JIB (Joint Industry Board) is the national wage and conditions agreement for the electrical contracting industry in England, Wales and Northern Ireland (Scotland has SJIB). The grading on your card determines what the contractor must pay you, what you're allowed to do unsupervised on a JIB site, and what your H&S obligations are.",
  },
  {
    id: 5,
    question:
      "A registered NICEIC contractor's annual assessment shows persistent failure to keep test instrument calibration certificates. What's the realistic outcome?",
    options: [
      'Immediate prosecution by the HSE — uncalibrated test instruments mean the test results are unreliable, which is a direct criminal breach of EAWR Reg 4 carrying an unlimited fine.',
      'Non-conformance issued, given a deadline to evidence calibration, re-assessed. Persistent failure or refusal to remediate triggers escalation: warning, suspension, removal from scheme. Scheme rules are contractual — you signed up to them in writing on enrolment.',
      'No consequence at all — calibration certificates are a best-practice recommendation only, so a contractor can continue to self-certify regardless of whether the instruments are in date.',
      "Automatic withdrawal of the electrician's JIB grade — calibration is a JIB working-rule requirement, so the grading body downgrades the operative until the certificates are produced.",
    ],
    correctAnswer: 1,
    explanation:
      "Scheme rules are contractual obligations between the contractor and the scheme operator. Failure isn't criminal but it is grounds for scheme action up to and including expulsion. Once you're out of the scheme you can't self-certify Part P, your insurer often pulls the rug, and the customer-facing badge disappears.",
  },
  {
    id: 6,
    question:
      "A circuit breaker carries the marking 'BS EN 60898-1, 6 kA, B32'. What is BS EN 60898-1?",
    options: [
      'An installation regulation — the part of BS 7671 that sets out how MCBs must be arranged in a consumer unit, including spacing and labelling requirements.',
      'A test method — the standard that defines how an inspector must verify the trip characteristics of an MCB during initial verification and periodic inspection.',
      'A product standard — the European harmonised standard for circuit breakers used in domestic and similar installations. BS 7671 references this standard for MCB selection. Devices marked to BS EN 60898 are deemed-to-comply under BS 7671.',
      'A scheme requirement — the NICEIC rule specifying which makes of MCB a registered contractor is permitted to install under the competent person scheme.',
    ],
    correctAnswer: 2,
    explanation:
      "BS EN standards are product specifications — they tell the manufacturer what the product must meet. BS 7671 references them so that when you select an MCB to BS EN 60898 you don't have to re-prove its short-circuit performance, breaking capacity or thermal characteristics. The standard does that work for you. Similarly BS EN 60947 for industrial switchgear and contactors, BS EN 61008/61009 for RCDs/RCBOs.",
  },
  {
    id: 7,
    question:
      'Why does ignoring a non-statutory document like BS 7671 weaken your defence in a statutory prosecution under EAWR?',
    options: [
      'Because BS 7671 is itself a statutory instrument, so any departure from it is a separate criminal offence that is automatically added to the EAWR charge against you.',
      'Because the court is not permitted to hear any technical evidence other than BS 7671, so without it you have no way to demonstrate that your work was safe.',
      'Because ignoring BS 7671 voids your competent person scheme membership, and only scheme members are allowed to defend themselves against an EAWR prosecution.',
      "Because the HSE's Memorandum of Guidance to EAWR (HSR25) cites BS 7671 as a means of demonstrating compliance with EAWR Reg 4. Following BS 7671 raises a presumption of compliance; departing from it requires you to prove your alternative method was at least as safe — a much harder argument to win in court.",
    ],
    correctAnswer: 3,
    explanation:
      "The legal logic is 'reverse onus by reference standard'. If the recognised standard is BS 7671 and you followed it, the burden is on the prosecution to show that wasn't enough. If you ignored it, the burden flips to you to show your method was equivalent. Most defendants can't carry that burden — which is why everyone follows BS 7671 in practice.",
  },
  {
    id: 8,
    question:
      "A homeowner's house insurance is voided after a fire. The insurer cites 'failure to demonstrate the electrical installation was maintained in accordance with current standards'. Which non-statutory framework typically supplies the evidence the insurer wants to see?",
    options: [
      "An EICR carried out and signed by a competent person (usually a CPS-registered contractor) in accordance with BS 7671 Part 6 / IET GN3, at the recommended frequency for the premises type, with a satisfactory or remediated outcome. Without that, the insurer's claim that the installation wasn't maintained to current standards is hard to refute.",
      'A Building Regulations Part P completion certificate from the original install, since this proves the installation was lawfully notified and is therefore deemed maintained to current standards for the life of the property.',
      'The original Electrical Installation Certificate from when the property was built, which certifies the installation as compliant and stands as the maintenance record regardless of how many years have since passed.',
      "A current PAT testing record for the property's portable appliances, which demonstrates the electrical equipment in the home has been inspected and maintained to the recognised standard.",
    ],
    correctAnswer: 0,
    explanation:
      "Insurance contracts almost always include a 'maintained to a reasonable standard' clause. The non-statutory documents (BS 7671 + GN3 + a CPS-issued EICR) ARE the evidence base for that clause. No EICR, no defence — the insurer walks away from the claim. This is one of the biggest practical reasons the non-statutory framework matters as much as the statutory one.",
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs2 = [
  {
    question: "Why is BS 7671 'non-statutory' if literally every electrician follows it?",
    answer:
      "Because it's published by BSI (the British Standards Institution) and the IET, not by Parliament. Parliament makes statutes (HASAWA, EAWR, ESQCR, Building Regs); BSI publishes standards. The way they hook together is via the HSE's HSR25 guidance, which lists BS 7671 as a means of complying with EAWR. So legally non-statutory, practically mandatory.",
  },
  {
    question: "What's the difference between NICEIC, NAPIT and ELECSA?",
    answer:
      "All three are competent person schemes — they assess and register electrical contractors so the contractor can self-certify Part P notifiable work in dwellings. NICEIC and ELECSA are both run by Certsure. NAPIT is a separate organisation. Functionally they cover the same ground; the differences are in fees, assessment style and the badge you stick on the van. From a regulator's perspective they're equivalent.",
  },
  {
    question: "If I'm not in the JIB, can I still work as an electrician?",
    answer:
      "Yes. The JIB sets the national agreement for pay, conditions and grading on JIB-affiliated jobs (most large commercial and industrial sites in England/Wales/NI go JIB). Self-employed electricians on domestic work often aren't JIB-graded. But many tier-1 contractors will only let JIB-carded operatives on site, and your apprentice progression card sits inside the JIB grading system.",
  },
  {
    question: 'Do I need to know the BS EN product standards by number?',
    answer:
      "Not all of them. Know the headline ones — BS EN 60898 (MCBs), BS EN 60947 (industrial switchgear and contactors), BS EN 61008/61009 (RCDs and RCBOs), BS EN 62606 (AFDDs), BS EN 60439 (assemblies). When you read a BS 7671 reg that says 'devices to BS EN xxxxx', you should at least recognise what kind of device the standard covers. The detail lives in the catalogue, not in your head.",
  },
  {
    question: 'What changes does BS 7671 A4:2026 actually bring?',
    answer:
      "Headline changes: stronger AFDD requirements (Reg 421.1.7), the renaming of TN-C-S supplies to PNB (Protective Neutral Bonding), updated inspection schedule columns, and revisions to the model EIC / EICR / Minor Works forms. The lesson on types of earthing systems covers earthing and the PNB rename in detail. The point for this lesson: BS 7671 is a living document — every amendment shifts what 'compliant' looks like, and the amendment date in the citation matters.",
  },
  {
    question: 'Can a customer demand I work to an old version of BS 7671?',
    answer:
      "No — and you shouldn't. Once a new amendment is published and in force, that's the standard the courts and inspectors use. Working to a withdrawn version means your work won't satisfy the deemed-to-comply route under EAWR, your CPS scheme will refuse to certify it, and your insurer will treat it as non-compliant. Customer preferences don't outrank current standards.",
  },
];

export default function Lesson304E_2_1() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        HASAWA, EAWR, ESQCR and Building Regs Part P — the four legal instruments every UK
        installer answers to. These aren't guidance. Break them and you can lose your card, your
        livelihood or your liberty.
      </p>

      <TLDR
        points={[
          'Four statutory instruments bind UK electrical work: HASAWA 1974 (parent Act), EAWR 1989 (the trade-specific one), ESQCR 2002 (supply-side rules) and Building Regs Part P (notification of domestic work in England/Wales).',
          'All four carry criminal sanctions. EAWR Reg 4 (safe systems), Reg 13/14 (dead working) and Reg 16 (competence) are the regs the HSE prosecutes electricians under most often.',
          'Personal liability is real. HASAWA s.7 puts a duty on every individual on site — employer, employee, sub. You can be prosecuted alongside your firm, not instead of it.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Identify the four statutory instruments that govern UK electrical installation work — HASAWA, EAWR, ESQCR and Building Regs Part P.',
          'Distinguish which regulation binds whom — installer, employer, DNO, customer, designer.',
          'State the implications of HASAWA s.2/s.3/s.7 — duties of employers and the personal duty under s.7.',
          'Explain the practical impact of EAWR Reg 4 (safe systems), Reg 13/14 (work on isolated and live conductors) and Reg 16 (competence).',
          'State the ESQCR supply-voltage tolerance (230 V −6%/+10%) and identify it as a DNO obligation, not an installer one.',
          'Identify which categories of domestic work are notifiable under Building Regs Part P in England, and the two routes to compliance (CPS self-certification vs LABC notification).',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Why this matters</ContentEyebrow>

      <ConceptBlock
        title="Statutory means criminal — not 'guidance you should probably follow'"
        plainEnglish="Statute is law made by Parliament. Breach a statutory regulation and you face a criminal court — fines, custody, a record, the lot. Non-statutory documents (BS 7671, GN3, OSG) are evidence of HOW you complied with statute, but the statute itself is what carries the teeth."
        onSite="You met HASAWA and EAWR in a safety context earlier in the course. This lesson re-frames the same regs as DESIGN and INSTALL obligations. Same Acts, but the lens shifts from 'don't electrocute yourself' to 'here is the legal floor every installation has to clear before you sign anything.'"
      >
        <p>Four statutory instruments matter for everyday UK electrical work:</p>
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
            <strong>Electricity Safety, Quality and Continuity Regulations 2002 (ESQCR)</strong> —
            the supply-side rules. Binds the DNO; the installer touches it only at the consumer's
            cut-out boundary.
          </li>
          <li>
            <strong>Building Regulations 2010, Part P</strong> — England's notification regime for
            domestic electrical work. Wales mirrors it; Scotland and Northern Ireland have their
            own equivalents.
          </li>
        </ul>
        <p>
          Get the order of priority straight in your head. HASAWA is the umbrella. EAWR sits under
          it for electrical work. ESQCR runs in parallel for supply. Part P is a standalone
          notification regime. All four can apply to the same job.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>HASAWA 1974 — the parent Act</ContentEyebrow>

      <ConceptBlock
        title="The Act that sits underneath everything else"
        plainEnglish="HASAWA is the umbrella law for all work activity. Every more specific regulation (EAWR, CDM, COSHH, the lot) is made under powers granted by HASAWA. It binds employers, employees, the self-employed, and anyone else whose work activity affects others."
      >
        <p>HASAWA's three load-bearing sections for an electrician:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Section 2</strong> — duty of every employer to ensure, so far as is reasonably
            practicable, the health, safety and welfare of his employees. Covers training,
            supervision, plant, working environment.
          </li>
          <li>
            <strong>Section 3</strong> — duty of every employer (and self-employed person) towards
            persons NOT in his employment who may be affected by his undertaking. Customers, the
            public, sub-contractors on the same site — all covered.
          </li>
          <li>
            <strong>Section 7</strong> — duty of every employee at work to take reasonable care
            for himself and others, and to co-operate with the employer's safety arrangements.
            This is the personal-liability hook.
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
          1949): the more serious the risk, the more you have to do to control it, until the cost
          of further precautions becomes disproportionate to the residual risk.
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
        <p>The EAWR regs that come up on every site:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Reg 4 — systems, work activities and protective equipment.</strong> Every
            electrical system shall be constructed, maintained and used to prevent danger. Every
            work activity (operation, use, maintenance) shall be carried out so as not to give
            rise to danger. This is the legal hook for safe systems of work.
          </li>
          <li>
            <strong>Reg 13 — precautions for work on equipment made dead.</strong> Adequate
            precautions shall be taken to prevent equipment from becoming live again whilst work
            is in progress. This is your lock-off, your warning notice, your isolation procedure.
          </li>
          <li>
            <strong>Reg 14 — work on or near live conductors.</strong> No person shall be engaged
            in any work activity on or so near any live conductor that danger may arise unless
            three conditions are met: (a) it is unreasonable for it to be dead, (b) it is
            reasonable for the work to be done live, AND (c) suitable precautions are taken to
            prevent injury. The 'dead unless impractical' default sits here.
          </li>
          <li>
            <strong>Reg 16 — persons to be competent to prevent danger and injury.</strong> The
            competence regulation. No-one shall be engaged in a work activity where technical
            knowledge or experience is necessary to prevent danger unless they possess such
            knowledge or experience, or are under appropriate supervision.
          </li>
        </ul>
        <p>
          EAWR also covers strength and capability of equipment (Reg 5), adverse environments (Reg
          6), insulation (Reg 7), earthing (Reg 8), integrity of conductors (Reg 9), connections
          (Reg 10), means of protection (Reg 11), means of cutting off and isolation (Reg 12) and
          adequate working space, access and lighting (Reg 15). Every one of those reads like a
          chapter heading in BS 7671 — that's deliberate.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="Memorandum of Guidance on EAWR (HSR25) — referencing BS 7671"
        clause="The Memorandum of Guidance on the Electricity at Work Regulations 1989 (HSR25, published by the HSE) recognises that compliance with the requirements of BS 7671 is one means of demonstrating that the requirements of the Electricity at Work Regulations have been satisfied for fixed electrical installations in scope of BS 7671."
        meaning={
          <>
            This is the legal bridge. BS 7671 itself is non-statutory. But the HSE's own
            guidance to EAWR says: follow BS 7671 and you're presumed to have complied with the
            statutory duty. Don't follow it and you've got a problem demonstrating you met EAWR
            Reg 4. That's why every electrician on site follows BS 7671 even though technically
            nobody's making them.
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
        <p>The bits of ESQCR that affect day-to-day install work:</p>
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
            inspection schedules — see the lesson on types of earthing systems for the
            install-side detail.
          </li>
          <li>
            <strong>Reg 28 — duty of consumer.</strong> The customer (and by extension the
            installer working for them) must not connect equipment that interferes with the
            supply, the meter or the earthing. Things like back-feeding generators or
            misconnecting solar inverters can put you in breach of ESQCR.
          </li>
          <li>
            <strong>Reg 29 — beyond the cut-out.</strong> Confirms that the DNO's responsibility
            ends at the consumer's terminals. Past that point you, the installer, are the
            responsible party under EAWR.
          </li>
        </ul>
        <p>
          Practical takeaway: if the customer's voltage is 198 V at the head, that's an ESQCR
          Schedule 1 problem and the DNO has to fix it. You don't fit a buck-boost transformer —
          you call the DNO and document it.
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
        <p>In England, post-2013, the notifiable categories under Part P are:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>(a) Installation of a new circuit</strong> — anything that adds a new circuit
            at the consumer unit, e.g. a new shower circuit, a dedicated EV charger circuit, a new
            garage sub-main.
          </li>
          <li>
            <strong>(b) Replacement of a consumer unit</strong> — full CU swap-out, common when
            upgrading from a board with no RCD/RCBO protection to a current-spec board.
          </li>
          <li>
            <strong>
              (c) Any addition or alteration to existing circuits in a special location
            </strong>{' '}
            — locations containing a bath or shower being the live one in domestic. So extending
            an existing lighting circuit into a bathroom IS notifiable; extending the same circuit
            into a bedroom isn't.
          </li>
        </ul>
        <p>
          Anything else (replacement accessories, like-for-like socket swaps, repairs to existing
          circuits outside special locations) is non-notifiable. You should still issue a Minor
          Works certificate, but you don't have to notify Building Control.
        </p>
        <p>Two routes to compliance for notifiable work:</p>
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
            Part P regime (notification, CPS schemes, LABC sign-off) sits in regs 12 and 20 of the
            Building Regulations 2010, not in Part P itself.
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
        <p>Enforcement breakdown:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>HASAWA / EAWR — HSE</strong> on higher-risk premises (factories, construction
            sites, utilities). <strong>Local Authority Environmental Health</strong> on lower-risk
            (offices, shops, leisure, most retail). Both can issue improvement notices,
            prohibition notices and prosecute.
          </li>
          <li>
            <strong>ESQCR</strong> — enforced by the Secretary of State (in practice through the
            Energy Networks Association and Ofgem). Mostly bites the DNO, occasionally the
            customer for breaches of Reg 28 (back-feeding, interference).
          </li>
          <li>
            <strong>Building Regs / Part P</strong> — enforced by Local Authority Building Control
            (LABC) or an Approved Inspector. Can require non-compliant work to be ripped out, made
            compliant by a registered person, and re-certificated at the building owner's expense.
            Fines up to £5,000 plus £50 per day for continuing offences.
          </li>
        </ul>
        <p>
          Sentencing for serious HASAWA/EAWR breaches on indictment: unlimited fine and/or up to 2
          years' imprisonment for individuals; unlimited fine for companies. Sentencing follows
          the HSE Sentencing Council Definitive Guideline (2016) — the headline numbers turn on
          culpability, harm and (for companies) annual turnover. Sevenfigure fines for large firms
          are routine after a fatality.
        </p>
      </ConceptBlock>

      <CommonMistake
        title="Treating BS 7671 as the law and statutory regs as 'the boring bit at the back of the book'"
        whatHappens={
          <>
            Apprentice memorises BS 7671 reg numbers, can quote 411.3.4 in his sleep, but couldn't
            tell you which Act made BS 7671 relevant in the first place. After an incident, the
            prosecution charge isn't 'breach of BS 7671' — it's 'breach of EAWR Reg 4', and BS
            7671 is just the document used to prove what 'safe' looked like. Knowing the technical
            reg without knowing the statutory hook leaves you exposed in a witness box and
            clueless about why the inspector is asking what they're asking.
          </>
        }
        doInstead={
          <>
            Get the hierarchy straight. HASAWA is the law. EAWR is the law. ESQCR is the law. Part
            P is the law. BS 7671 is the standard the courts use to judge whether you complied
            with the law. When you cite a BS 7671 reg, mentally tag it to the statutory duty it
            satisfies — that's how the inspector thinks, that's how the court thinks, and that's
            how you should think.
          </>
        }
      />

      <CommonMistake
        title="Assuming ESQCR is 'the DNO's problem' and skipping it on the apprentice paper"
        whatHappens={
          <>
            Question comes up about supply voltage tolerance, or about back-feed protection on a
            domestic solar install, or about why the DNO needs to be notified for a CU change.
            Apprentice draws a blank because they parked ESQCR as 'not my reg'. In practice ESQCR
            Reg 28 absolutely binds the installer the moment you connect anything to the
            consumer's installation that could affect the supply or the earthing.
          </>
        }
        doInstead={
          <>
            Treat ESQCR as the rules at the boundary. The supply side is the DNO's. The consumer
            side is yours under BS 7671. But anything you do at the boundary (earthing
            arrangements, generator interconnection, EV charger DC-fault protection, CU change-out
            on a TN-C-S supply) puts you back into ESQCR territory. Know Schedule 1 and Reg 28/29
            cold.
          </>
        }
      />

      <Scenario
        title="EICR fail because the inspector says you ignored a manufacturer's instruction"
        situation={
          <>
            You did a CU change-out on a TN-C-S supply six months ago, NICEIC-certified the work,
            all clear. The customer commissions a periodic EICR through a different firm. The
            inspector codes a C2 because the SPD you fitted is installed with 700 mm of bundled
            lead, contrary to BS 7671 Section 534 AND contrary to the manufacturer's installation
            literature. The customer is on the phone, refusing to pay the bill and threatening to
            report you to NICEIC.
          </>
        }
        whatToDo={
          <>
            Three legal frames are running here at once. (1) BS 7671 534.4.4.2 / 534.4.10 — the
            technical breach. (2) BS 7671 Reg 510.3 / 134.1.1 — selection and erection 'shall take
            account of manufacturers' instructions' and 'good workmanship by skilled persons shall
            be used'. (3) EAWR Reg 4 sitting underneath the lot — by ignoring the BS 7671 method
            that demonstrates compliance with EAWR, you've weakened your defence to any subsequent
            statutory action. Fix the install, reissue the cert, log it on the NICEIC portal as a
            remediated job. Don't argue the BS 7671 point — argue the manufacturer's-instruction
            point and you'll lose every time.
          </>
        }
        whyItMatters={
          <>
            The non-statutory documents (BS 7671, manufacturer's literature, scheme rules) are
            what give the statutory regs their teeth. The C2 isn't
            just a coding judgement — it's evidence the inspector would hand to the HSE if the SPD
            ever failed and a fire followed.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Four statutory instruments govern UK electrical work: HASAWA 1974, EAWR 1989, ESQCR 2002 and Building Regs Part P (England/Wales). All four carry criminal sanctions.',
          'HASAWA is the parent Act. s.2 binds employers to employees; s.3 binds them to non-employees affected; s.7 is the personal duty on every worker — including you.',
          'EAWR is the trade-specific reg. Reg 4 (safe systems), Reg 13/14 (dead working / live working), Reg 16 (competence) are the regs the HSE prosecutes electricians under most often.',
          'ESQCR sets supply tolerance at 230 V −6% / +10% (216–253 V) under Schedule 1. Below 216 V at the cut-out is a DNO problem, not yours.',
          'Part P notifiable work in England: new circuits, CU replacements, and additions/alterations in special locations. Two routes: CPS self-certification or LABC notification.',
          "BS 7671 is non-statutory but referenced in HSR25 as the means of demonstrating compliance with EAWR Reg 4. That's the bridge between the two.",
          "Personal liability under HASAWA s.7 and EAWR Reg 16 is real. You can be prosecuted alongside your firm, not instead of it. Maximum sentence on indictment: unlimited fine and/or 2 years' custody for individuals.",
        ]}
      />

      <Quiz title="Statutory regulations — knowledge check" questions={quizQuestions} />

      {/* ── Prev / next nav ─────────────────────────────────── */}

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        BS 7671, GN3, OSG, JIB and the competent person schemes. Not law in their own right — but
        if you ignore them, the prosecution case under the statutory regs writes
        itself.
      </p>

      <TLDR
        points={[
          "BS 7671:2018+A4:2026 is the IET Wiring Regulations — non-statutory but referenced by HSR25 as the way to demonstrate compliance with EAWR. Ignore it and you've lost your defence to a statutory prosecution.",
          'GN3, the OSG, the JIB Handbook and the BS EN product standards are the practical documents that turn BS 7671 into a job spec. Each has its own audience and each carries enforcement consequences when ignored.',
          "Competent person schemes (NICEIC, NAPIT, ELECSA) are voluntary but their teeth are commercial — lose your scheme and you lose Part P self-certification, your insurer's cover and your ability to trade.",
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Identify the main non-statutory documents that govern UK electrical work — BS 7671, IET GN3, IET OSG, JIB Handbook, scheme rules, BS EN product standards.',
          'Read a BS 7671 citation correctly (BS 7671:2018+A4:2026) and explain what each part of the citation means.',
          'Distinguish between BS 7671 (the standard) and the IET Guidance Notes (the practical companions), and know which one wins in a conflict.',
          "Explain how non-statutory documents derive their practical force from the statutory regs, via HSR25's reference to BS 7671 as a deemed-to-comply route under EAWR.",
          'Identify the consequences of ignoring non-statutory standards — civil claims, insurance void, scheme withdrawal, weakened defence to statutory prosecution.',
          'Distinguish a competent person scheme (Part P route) from a JIB grading (pay/conditions route) and explain which body enforces which.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Why non-statutory still bites</ContentEyebrow>

      <ConceptBlock
        title="'Not technically law' is not the same as 'optional'"
        plainEnglish="Non-statutory means Parliament didn't pass it. It does NOT mean you can ignore it. The non-statutory documents are the standards everyone in the trade — the HSE, the courts, the insurers, the schemes — uses to judge whether you did the job to a competent standard."
        onSite="The phrase to remember: 'deemed to comply'. If you follow BS 7671, you're deemed to have complied with EAWR. If you didn't, the burden falls on you to prove your alternative method was at least as safe — and that's a hill no working electrician wants to die on."
      >
        <p>The non-statutory framework that matters every day:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>BS 7671:2018+A4:2026</strong> — the IET Wiring Regulations. The technical
            standard for electrical installations in the UK.
          </li>
          <li>
            <strong>IET Guidance Note 3 (GN3)</strong> — the practical companion to BS 7671 Part 6
            (Inspection and Testing).
          </li>
          <li>
            <strong>IET On-Site Guide (OSG)</strong> — the install-side quick-reference for
            standard domestic and small commercial work.
          </li>
          <li>
            <strong>The other IET Guidance Notes</strong> — GN1 (Selection and Erection), GN2
            (Isolation and Switching), GN4 (Protection against fire), GN5 (Protection against
            electric shock), GN6 (Protection against overcurrent), GN7 (Special locations), GN8
            (Earthing and bonding), GN9 (Cabling).
          </li>
          <li>
            <strong>JIB National Working Rules + JIB Health &amp; Safety Handbook</strong> — pay,
            conditions, grading and site H&amp;S obligations on JIB-affiliated jobs.
          </li>
          <li>
            <strong>NICEIC / NAPIT / ELECSA</strong> — competent person schemes, certification
            authority, the badge that lets you self-certify Part P notifiable work.
          </li>
          <li>
            <strong>BS EN product standards</strong> — BS EN 60898 (MCBs), BS EN 60947 (industrial
            contactors), BS EN 61008/61009 (RCDs and RCBOs), BS EN 62606 (AFDDs) and dozens more.
            BS 7671 references these so you don't have to re-prove the product's electrical
            performance every time.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>BS 7671 — the IET Wiring Regulations</ContentEyebrow>

      <ConceptBlock
        title="The standard the whole industry runs on"
        plainEnglish="BS 7671 is the British Standard that defines the requirements for electrical installations in the UK. Co-published by BSI and the IET. Every working electrician refers to it. Currently in its 18th Edition (the 2018 base) with the A4 amendment dated 2026."
        onSite="Read the citation: BS 7671:2018+A4:2026. 'BS' = British Standard. '7671' = standard number. '2018' = base edition publication year. 'A4' = the fourth amendment to that base. '2026' = the year that fourth amendment was published. Know the amendment your work was done under because BS 7671 changes substantially between amendments."
      >
        <p>BS 7671's structure is worth carrying in your head as a navigational map:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Part 1</strong> — Scope, object and fundamental principles (Reg 110–134).
          </li>
          <li>
            <strong>Part 2</strong> — Definitions.
          </li>
          <li>
            <strong>Part 3</strong> — Assessment of general characteristics of the installation.
          </li>
          <li>
            <strong>Part 4</strong> — Protection for safety (shock, thermal effects, overcurrent,
            voltage disturbances). This is where Reg 411.3.4 (30 mA RCD on domestic socket and
            lighting circuits) and Reg 421.1.7 (AFDDs) live.
          </li>
          <li>
            <strong>Part 5</strong> — Selection and erection of equipment. Chapters 51–55 (common
            rules, wiring systems, isolation/switching, earthing, other equipment). Reg 510.3
            (manufacturer's instructions) and Section 534 (SPDs) sit here.
          </li>
          <li>
            <strong>Part 6</strong> — Inspection and testing (Chapters 64, 65). Where the EICR
            test sequence and condition codes are defined.
          </li>
          <li>
            <strong>Part 7</strong> — Special installations or locations (bathrooms, swimming
            pools, agricultural premises, marinas, EV charging — Section 722, etc).
          </li>
          <li>
            <strong>Part 8</strong> — Functional requirements (energy efficiency, prosumer's
            installations).
          </li>
          <li>
            <strong>Appendices</strong> — model forms, voltage drop tables, cable selection
            tables, current-carrying capacities, the lot.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 134.1.1"
        clause="Good workmanship by one or more skilled or instructed persons and proper materials shall be used in the erection of the electrical installation. The installation of electrical equipment shall take account of manufacturers' instructions."
        meaning={
          <>
            Two phrases worth dwelling on. 'Skilled or instructed persons' is the BS 7671
            equivalent of EAWR Reg 16 — competence is required, supervision counts. 'Take account
            of manufacturers' instructions' is the hook that turns ignoring an SPD lead-length
            spec or a CU manufacturer's torque setting into a regs breach. Reg 134.1.1 is the
            regulation a scheme inspector quotes when they're calling out poor workmanship without
            it being a specific technical-test failure.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 134.1.1."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 510.3"
        clause="Every item of equipment shall be selected and erected so as to allow compliance with the regulations stated in this chapter and the relevant regulations in other parts of BS 7671 and shall take account of manufacturers' instructions."
        meaning={
          <>
            Reg 510.3 is the second pillar of the manufacturer's-instruction obligation (Reg
            134.1.1 is the first). Selection AND erection both have to take account of the
            manufacturer's literature. So fitting a CU to one brand's schematic and stuffing it
            with another brand's modules — without checking compatibility — puts you in breach of
            510.3 even if every individual component is fine on its own.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 51, Regulation 510.3."
      />

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The IET Guidance Notes</ContentEyebrow>

      <ConceptBlock
        title="GN3 — the I&T practical companion"
        plainEnglish="BS 7671 Part 6 tells you WHAT to test. GN3 tells you HOW to test it, in what order, with what kit, and how to write up the result."
        onSite="GN3 lives in the testing engineer's bag right next to the MFT. It's the document a scheme inspector will reference when they're querying whether your test sequence was right or your condition coding was justified. The current edition tracks BS 7671 amendments — make sure your GN3 matches the amendment your test was done under."
      >
        <p>GN3 covers the full I&amp;T workflow:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Initial verification</strong> — the EIC test sequence on a new install or an
            addition.
          </li>
          <li>
            <strong>Periodic inspection</strong> — the EICR test sequence, frequency guidance for
            different premises types, and the C1 / C2 / C3 / FI condition coding framework.
          </li>
          <li>
            <strong>Worked examples</strong> — fully filled-out EIC, EICR and Minor Works forms
            with realistic test values, so you can see what 'good' looks like on paper.
          </li>
          <li>
            <strong>Test instrument requirements</strong> — accuracy classes, calibration
            expectations, MFT functions and how to use them.
          </li>
        </ul>
        <p>
          GN3 is published by the IET. It's authoritative because the same body publishes BS 7671.
          But it doesn't override BS 7671 — where the two appear to conflict, BS 7671 is the
          standard; GN3 is the practical interpretation.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The On-Site Guide (OSG) — installer's pocket reference"
        plainEnglish="The OSG is BS 7671 distilled into the bits a typical install electrician uses every day. Cable sizing tables for the common cases. Diversity factors. Ratings of accessories. Standard install methods for sub-100 A single-phase work."
        onSite="If the install is a domestic CU change, a kitchen rewire, a small commercial fit-out — the OSG covers it. If you're outside that envelope (industrial three-phase, sub-mains, complex special locations) you go back to BS 7671. The OSG is faster on site; BS 7671 is the authority."
      >
        <p>
          Why two documents from the same publisher? Because BS 7671 is too dense to flip through
          on a job. The OSG picks out the common-case tables, gives them in a smaller format, and
          adds practical notes the spec-style BS 7671 wording doesn't include. For 80% of domestic
          work the OSG is enough; for the other 20%, you reach for BS 7671.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The other IET Guidance Notes — GN1 to GN9"
        onSite="You don't need every GN on day one. Most working electricians have GN3 (testing) and the OSG by default. GN8 (earthing and bonding) gets pulled out when you're sizing main bonding conductors or arguing about main earthing arrangements. GN7 (special locations) for any bathroom or pool job. The rest sit on the shelf for reference."
      >
        <p>The full set:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>GN1</strong> — Selection and Erection (BS 7671 Part 5 companion).
          </li>
          <li>
            <strong>GN2</strong> — Isolation and Switching.
          </li>
          <li>
            <strong>GN3</strong> — Inspection and Testing (Part 6 companion).
          </li>
          <li>
            <strong>GN4</strong> — Protection against Fire.
          </li>
          <li>
            <strong>GN5</strong> — Protection against Electric Shock.
          </li>
          <li>
            <strong>GN6</strong> — Protection against Overcurrent.
          </li>
          <li>
            <strong>GN7</strong> — Special Locations (Part 7 companion).
          </li>
          <li>
            <strong>GN8</strong> — Earthing and Bonding.
          </li>
          <li>
            <strong>GN9</strong> — Cabling.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>JIB and the trade infrastructure</ContentEyebrow>

      <ConceptBlock
        title="JIB — pay, conditions and grading"
        plainEnglish="The Joint Industry Board for the Electrical Contracting Industry sets the national agreement for pay, conditions, grading and H&S in England, Wales and Northern Ireland. (Scotland has SJIB.) Your JIB card carries your grade and is the proof of your status on a JIB-affiliated job."
        onSite="Most large commercial and industrial sites are JIB-only. Without a current JIB card at the right grade you don't get on site. The grading also determines what you're paid and what you're allowed to sign for unsupervised."
      >
        <p>The JIB grading hierarchy you'll progress through:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Adult Trainee / Labourer</strong> — entry route for those without
            qualifications.
          </li>
          <li>
            <strong>Apprentice</strong> — graded by year of apprenticeship, with the JIB card
            tracking your progress through the standard (you're here).
          </li>
          <li>
            <strong>Electrician</strong> — fully qualified (Level 3 + AM2/E + 18th Ed) and
            completed apprenticeship.
          </li>
          <li>
            <strong>Approved Electrician</strong> — Electrician + additional experience and
            competence demonstration.
          </li>
          <li>
            <strong>Technician</strong> — top working grade, additional design and fault-finding
            competence.
          </li>
        </ul>
        <p>
          Beyond grading, the JIB H&amp;S Handbook is the practical site-safety reference for JIB
          jobs and is referenced by main contractors as the H&amp;S baseline they expect everyone
          on site to be working to.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Competent person schemes</ContentEyebrow>

      <ConceptBlock
        title="NICEIC, NAPIT, ELECSA — the Part P self-certification route"
        plainEnglish="A Competent Person Scheme is a Government-approved body that assesses electrical contractors and lets them self-certify their Part P notifiable work in dwellings, instead of having to go through Local Authority Building Control on every job. NICEIC and ELECSA are run by Certsure. NAPIT is separate."
        onSite="No CPS = no self-cert = LABC notification on every job (slow, expensive, customer-facing pain). That's why effectively every contractor doing domestic work is on a scheme. The badge on the van is a marketing tool too — customers actively look for it."
      >
        <p>How a CPS works:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Enrolment</strong> — apply, pay the fee, evidence qualifications, equipment
            (calibrated MFT, etc), insurance, premises, signed scheme rules.
          </li>
          <li>
            <strong>Assessment</strong> — annual visit by the scheme assessor. They watch you
            work, check certs, check calibration, check H&amp;S paperwork, audit a sample of
            completed jobs.
          </li>
          <li>
            <strong>Self-certification</strong> — for every notifiable job you do, you upload the
            cert to the scheme portal; the scheme notifies LABC on your behalf within 30 days; the
            homeowner gets a Building Reg compliance certificate by post.
          </li>
          <li>
            <strong>Non-conformance</strong> — assessor finds an issue, you get a non-conformance
            notice with a deadline to remediate. Persistent or serious issues escalate to
            suspension or removal.
          </li>
        </ul>
        <p>
          The catch: scheme membership is voluntary, but the consequences of losing it are brutal.
          No Part P self-cert. Public liability insurance often pulled (insurers require scheme
          membership for cover). Marketing badges withdrawn. Customer trust gone. The
          non-statutory framework's enforcement is commercial, not criminal — but it ends the
          trading firm just as effectively as a fine would.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>BS EN product standards</ContentEyebrow>

      <ConceptBlock
        title="The standards behind the markings on every device"
        plainEnglish="When you read a circuit breaker that says 'BS EN 60898-1, B32, 6 kA' — those references are non-statutory product standards. They define what the device must meet. BS 7671 references them so that selecting a device to the right BS EN means you don't have to re-prove its electrical performance."
        onSite="The headline ones to recognise on day one — BS EN 60898 (MCBs for domestic), BS EN 60947 (industrial switchgear / contactors), BS EN 61008 (standalone RCDs), BS EN 61009 (RCBOs), BS EN 62606 (AFDDs), BS EN 60439 / 61439 (assemblies, the panel itself)."
      >
        <p>The chain of authority:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            BS 7671 says 'use a device to BS EN 60898 with the right characteristic and breaking
            capacity for the circuit'.
          </li>
          <li>
            BS EN 60898 says 'an MCB sold under this standard must withstand X short-circuit
            current, trip within Y time at Z multiple of rated current, etc'.
          </li>
          <li>The manufacturer designs to BS EN 60898 and marks the device accordingly.</li>
          <li>
            You select the device based on its BS EN markings and the BS 7671 requirements for the
            circuit.
          </li>
        </ul>
        <p>
          That four-step chain — install standard → product standard → manufacturer compliance →
          installer selection — is how the non-statutory regs actually work in practice. No
          statute in sight. No criminal sanction. But every link in the chain is mandatory if you
          want the deemed-to-comply route under EAWR Reg 4.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Quoting a withdrawn BS 7671 amendment because that's the book on your shelf"
        whatHappens={
          <>
            Apprentice cites Reg 411.3.3 from the 17th Edition Amendment 3 because it's the only
            IET book the firm ever bought. The actual cert he's filling out is dated 2026 —
            A4:2026 is in force, the regs have moved on, and the inspector picks up that the test
            schedule's missing the new columns introduced by A4. Cert is invalid. Job has to be
            re-tested at the firm's cost.
          </>
        }
        doInstead={
          <>
            Use the current edition. Always. Check the amendment date on the cover. If you're
            signing anything in 2026 onwards, you're working to BS 7671:2018+A4:2026 — that's what
            the cert needs to reference and that's the standard the inspector will assess against.
            The firm should renew the IET subscription so everyone has the live edition.
          </>
        }
      />

      <CommonMistake
        title="Treating manufacturer's instructions as 'optional advice'"
        whatHappens={
          <>
            Electrician fits a smart RCBO without reading the manufacturer's commissioning
            literature. The device requires a specific busbar arrangement and a torque setting
            spec'd at 1.4 Nm. Electrician uses the same busbar as the older non-smart RCBOs and
            pinches the terminals up to 'firm by hand'. Six months later, one of the terminals
            arcs because the connection wasn't tight to spec. Customer has a fire. Insurance
            claim. Investigator finds the torque was never set to spec. The defence — 'BS 7671
            doesn't say 1.4 Nm specifically' — fails because Reg 134.1.1 and Reg 510.3 both
            require the install to take account of manufacturer's instructions.
          </>
        }
        doInstead={
          <>
            Read the manufacturer's literature. Every time. Use a torque screwdriver. Note the
            torque settings on your install paperwork (some certs now have a tick-box for it).
            Manufacturer's instructions are part of the BS 7671 obligation, which is part of the
            EAWR obligation. The chain runs all the way back to criminal sanction if it breaks.
          </>
        }
      />

      <Scenario
        title="Insurance void after a fire because no EICR in the last decade"
        situation={
          <>
            Customer's house burns down. Origin is electrical — a failed accessory in a 30-year
            old kitchen. House insurance claim filed for £180,000. Insurer asks for evidence that
            the electrical installation was maintained. There's no EICR on file from the last ten
            years. Insurer rejects the claim, citing the policy clause requiring 'maintenance to a
            reasonable standard'. Customer is now hunting for the firm that last did electrical
            work — your firm, who fitted a new shower circuit four years ago — and asking why you
            didn't recommend an EICR.
          </>
        }
        whatToDo={
          <>
            Get your records out fast. The EIC you issued for the shower circuit (assuming you did
            issue one — you should have) doesn't certify the rest of the installation, but the
            cert text usually carries a recommendation that the customer arranges a full EICR
            within a stated period. If you recommended it in writing and they didn't action it,
            the obligation moves to them. If you didn't recommend it, you've got a weaker
            position. This is why the model EIC and EICR forms include the recommendation panel —
            non-statutory documents protecting you from non-statutory claims.
          </>
        }
        whyItMatters={
          <>
            The non-statutory framework (BS 7671 model forms, GN3 recommended frequencies, CPS
            cert routes) IS the documentary trail that decides civil cases like this one. No
            criminal court is involved. No HSE prosecution. But the financial damage runs into six
            figures and the firm's reputation is on the line. Treat the paperwork as seriously as
            you treat the install.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          "Non-statutory means 'not Parliament-made', NOT 'optional'. BS 7671, GN3, OSG, JIB rules and scheme rules all carry real consequences when ignored — civil, commercial and (via the deemed-to-comply route) statutory.",
          'BS 7671:2018+A4:2026 is the IET Wiring Regulations — the technical standard for UK electrical installations. Always work to the current amendment.',
          'GN3 is the practical companion to BS 7671 Part 6 (Inspection and Testing). The OSG is the install-side quick-reference for standard domestic and small commercial work. Where they conflict, BS 7671 wins.',
          'The JIB sets pay, conditions and grading on JIB-affiliated jobs (most large commercial/industrial sites). The card carries your grade and is your route on site.',
          "NICEIC, NAPIT and ELECSA are competent person schemes — voluntary but commercially essential. Lose your scheme and you lose Part P self-cert, your insurer's cover and your ability to trade.",
          'BS EN product standards (60898 MCBs, 60947 contactors, 61008/61009 RCDs/RCBOs, 62606 AFDDs) define what each device must meet. BS 7671 references them so selection is shorthand instead of full re-proof.',
          'The chain that ties it all together: HSR25 cites BS 7671 as a means of complying with EAWR. Follow BS 7671 = deemed compliant. Ignore it = your defence to a statutory prosecution under EAWR is in tatters before you even start.',
        ]}
      />

      <Quiz title="Non-statutory regs and guidance — knowledge check" questions={quizQuestions2} />

      {/* ── Prev / next nav ─────────────────────────────────── */}
    </div>
  );
}
