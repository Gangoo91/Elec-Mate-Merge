/**
 * Ported from the English course, combining:
 *   level3/module1/section4/Sub6.tsx
 *   level2/module1/section2/Sub6.tsx
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

const checks = [
  {
    id: 'l3-m1-s4-sub6-pre2000',
    question: 'When was asbestos use in UK building materials banned?',
    options: [
      '1999 — all asbestos use in new building products banned; pre-2000 buildings presumed to contain it.',
      '1985 — when amosite (brown) and crocidolite (blue) were prohibited and all building use then ceased.',
      '2012 — when CAR came into force, banning both new use and continued presence in existing premises.',
      '1970 — when the first Asbestos Regulations ended the use of all asbestos types in construction.',
    ],
    correctIndex: 0,
    explanation:
      'Asbestos in new building products was banned in 1999. Buildings constructed OR significantly refurbished before 2000 should be presumed to contain asbestos until survey rules it out. CAR 2012 duty-to-manage applies to non-domestic buildings; the presumption underpins safe systems of work in any case.',
  },
  {
    id: 'l3-m1-s4-sub6-register',
    question: "Under CAR 2012 Reg 4, what's the asbestos register?",
    options: [
      'An HSE certificate confirming a building has been surveyed and is entirely free of asbestos materials.',
      'A log each licensed contractor keeps of every job, submitted annually to the HSE for licence renewal.',
      'A documented record of the location, condition and type of asbestos-containing materials in the premises.',
      'A list of waste consignment notes a contractor must keep for three years after disposal of the material.',
    ],
    correctIndex: 2,
    explanation:
      'Reg 4 duty to manage. The register covers ACMs in non-domestic premises (and the common parts of multi-occupied residential); the dutyholder (typically owner/landlord) maintains it and provides it to anyone working on the fabric. Ask for it before any work that may disturb materials.',
  },
  {
    id: 'l3-m1-s4-sub6-licensed',
    question: 'What’s "licensed asbestos work" vs "non-licensed"?',
    options: [
      'Licensed means any work touching asbestos; non-licensed means work merely in a building containing it.',
      'Licensed — high-risk activities (friable insulation, large AIB) needing an HSE-licensed contractor under Reg 8; non-licensed — lower-risk work by trained operatives.',
      'Licensed is removal by the building owner under their duty-to-manage; non-licensed is by an outside contractor.',
      'Licensed is anything involving white (chrysotile) asbestos; non-licensed covers brown and blue types.',
    ],
    correctIndex: 1,
    explanation:
      'Licensed work (Reg 8) covers high-risk activities — most disturbance of friable insulation, large quantities of AIB, sprayed coatings — and needs an HSE-licensed contractor. Non-licensed (some sealed cement product, very limited disturbance) follows NNLW or basic non-licensed procedures. The L3 supervisor identifies the category and escalates to licensed where appropriate — never attempting licensed work without a licence.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does CAR 2012 stand for?',
    options: [
      'Controlled Asbestos Removal 2012 — a code of practice setting out methods for stripping asbestos.',
      'Control of Asbestos Regulations 2012 — the principal UK asbestos regulation.',
      'Construction Asbestos Rules 2012 — the part of CDM dealing with asbestos found on construction sites.',
      'Codes for Asbestos Reporting 2012 — HSE guidance on recording discoveries of asbestos in premises.',
    ],
    correctAnswer: 1,
    explanation:
      'CAR 2012 is THE UK asbestos regulation. It covers duty to manage (Reg 4), exposure assessment (Reg 6), prevention or reduction (Reg 7), licensed work (Reg 8), training (Reg 10), respiratory PPE, hygiene, monitoring and surveillance. Knowing it by name is L3-essential.',
  },
  {
    id: 2,
    question: 'What are the three main asbestos types?',
    options: [
      'Friable, bonded and encapsulated — classified by fibre release rather than by the mineral itself.',
      'Insulation board, asbestos cement and textured coating — the three forms commonly found in buildings.',
      'Chrysotile (white), amosite (brown) and crocidolite (blue).',
      'Tremolite, actinolite and anthophyllite — the three types most often used in UK construction.',
    ],
    correctAnswer: 2,
    explanation:
      'Three types, all hazardous; crocidolite considered most carcinogenic. Most UK use was chrysotile in cement products and AIB, amosite in insulation board and pipe lagging, crocidolite in some sprayed insulation. Visual identification is rarely possible — sampling required.',
  },
  {
    id: 3,
    question: 'Where might asbestos be encountered in pre-2000 buildings?',
    options: [
      'Only in industrial and commercial premises — domestic housing never used asbestos materials.',
      'Mainly in the structural steelwork and concrete frame, the only elements where asbestos added strength.',
      'Almost entirely in roofing felt and bitumen, with the building interior generally asbestos-free.',
      'A wide range — textured ceilings, insulation board, cement products, lagging, floor tiles, gaskets and more.',
    ],
    correctAnswer: 3,
    explanation:
      'A wide range: textured ceilings (artex), insulation board (AIB), cement products (roofing, soffits, downpipes), pipe and boiler lagging, sprayed coatings, floor tiles and adhesive, gaskets and seals, some old fuse boards, bath panels, window putty, wall claddings. Presumption is the safe default.',
  },
  {
    id: 4,
    question: 'What’s a "refurbishment survey"?',
    options: [
      'An asbestos survey carried out before refurbishment or demolition, locating ACMs in areas to be disturbed.',
      'A minimally intrusive survey carried out during occupation to keep the register up to date.',
      'A visual-only inspection of the building exterior to check asbestos cement cladding and roofing.',
      'A survey carried out after refurbishment, to confirm no asbestos was disturbed during the works.',
    ],
    correctAnswer: 0,
    explanation:
      'Refurbishment survey = pre-disturbance survey. More intrusive than a management survey, required before significant disturbance work, commissioned by the dutyholder. The L3 supervisor asks for one (or escalates) before any work likely to disturb pre-2000 materials.',
  },
  {
    id: 5,
    question: "What's the asbestos awareness training requirement?",
    options: [
      'A one-off induction briefing from the site manager; no formal certificated course needed for trades.',
      'CAR 2012 Reg 10 — anyone who may be exposed must receive adequate training.',
      'Only operatives who physically remove asbestos need training; those who simply work nearby are exempt.',
      'A full medical examination and lung-function test, repeated every two years, in place of classroom training.',
    ],
    correctAnswer: 1,
    explanation:
      'Asbestos awareness is mandatory for trades likely to encounter asbestos. UKATA / IATP-certified asbestos awareness (1-day) is the typical baseline; higher levels (non-licensed, licensed work) require more advanced training.',
  },
  {
    id: 6,
    question: 'What do you do if you find suspected asbestos during work?',
    options: [
      'Carefully bag the material yourself, double-wrapped, and finish the task quickly to limit fibre exposure.',
      'Dampen the material with water to bind the fibres, then continue working around it while keeping it wet.',
      "Stop work, don't disturb it, vacate and close off the area, and escalate before doing anything further.",
      'Take a sample to send to a laboratory, then carry on with the rest of the work while you wait.',
    ],
    correctAnswer: 2,
    explanation:
      "Stop work immediately; don't disturb further; vacate and close off the area; inform the dutyholder, your supervisor and the principal contractor (where appointed); don't restart until a survey confirms it is safe or a licensed contractor takes over. Document everything.",
  },
  {
    id: 7,
    question: "What's the disposal route for asbestos waste?",
    options: [
      'General construction skip — bonded cement can be treated as inert rubble once broken down.',
      'Household waste recycling centre — small quantities from domestic jobs go in the hazardous-household stream.',
      "Buried on site in a sealed pit and recorded on the drawings, with the dutyholder's written consent.",
      'As hazardous waste — double-bagged, with a consignment note, by a licensed carrier to a permitted facility.',
    ],
    correctAnswer: 3,
    explanation:
      'Asbestos waste is hazardous waste: double-bagged, labelled, accompanied by a Hazardous Waste Consignment Note, transported by a licensed asbestos waste carrier, disposed of at a permitted facility. CAR 2012, Hazardous Waste Regs 2005 and EPA 1990 all apply; mixing with general waste is multiple offences.',
  },
  {
    id: 8,
    question: "What's the supervisor escalation when asbestos is suspected?",
    options: [
      "Stop work and ensure no further disturbance, document, phone the firm and dutyholder, and don't proceed without confirmation.",
      'Report the discovery only at the end of the day in the site diary, so the team can keep working meanwhile.',
      'Notify the HSE directly by phone within two hours, as discovery is a RIDDOR dangerous occurrence in itself.',
      'Carry on with the work but issue FFP3 masks, recording that respiratory protection was provided.',
    ],
    correctAnswer: 0,
    explanation:
      "Five-step escalation: stop work and prevent disturbance; photograph and document; phone the firm's contracts/H&S manager; inform the dutyholder; do NOT proceed without confirmation the material is non-asbestos or a licensed contractor has taken over. Documentation throughout protects the team and the firm.",
  },
];

const faqs = [
  {
    question: 'Is the asbestos register mandatory for domestic premises?',
    answer:
      "Not under CAR 2012 Reg 4 (which covers non-domestic). However, the duty to manage extends to common parts of multi-occupied residential. Single-occupancy domestic is on the homeowner; in practice you can ask but they often don't have one.",
  },
  {
    question: 'Can I do "low-level" asbestos work (small cement panel) myself?',
    answer:
      'Some non-licensed work may be permitted by trained operatives, but the L3 supervisor approach is conservative — escalate to specialist. The categorisation (licensed / NNLW / non-licensed) is technical; getting it wrong creates exposure.',
  },
  {
    question: "What's the carcinogenic mechanism?",
    answer:
      'Asbestos fibres inhaled lodge in lung tissue (and sometimes pleural / mesothelial); cause inflammation; over decades develop into asbestosis (lung scarring), lung cancer, and mesothelioma (cancer of the pleura). Latency typically 20-40 years; diseases often present after retirement.',
  },
  {
    question: "What happens if I've been exposed?",
    answer:
      "Document the exposure (date, location, material type if known, duration). Inform employer who should record. Health surveillance under CAR 2012 Reg 22 if licensed work; otherwise periodic GP review. Most short, low-level exposures don't cause disease but the cumulative dose matters.",
  },
  {
    question: 'Why are pre-2000 buildings the cut-off?',
    answer:
      'Asbestos use in new building products banned in 1999. Pre-2000 buildings (and refurbishments) can contain asbestos materials. Newer buildings should be asbestos-free in their original construction (subsequent additions of older materials still possible).',
  },
  {
    question: "How does the L3 supervisor manage the customer's expectations on asbestos?",
    answer:
      "Honest, calm explanation. \"We've found suspect material. Until we're sure, we can't safely proceed with this part of the work. The right step is a survey / licensed contractor depending on what it turns out to be. This is to protect you and us.\" Most customers respond well; the alternative is a much worse conversation if we proceed and exposure occurs.",
  },
  {
    question: 'What is the CAR 2012 Control Limit and why does it matter?',
    answer:
      'CAR 2012 sets a Control Limit of 0.1 fibres per cm³ of air, averaged over 4 hours. The control limit is the maximum airborne concentration that must not be exceeded. The Action Level (related to historic regulations) and the Notification threshold for NNLW use similar metrics. The L3 doesn&apos;t personally measure airborne fibre levels — that&apos;s analyst territory — but knowing the threshold exists informs the conversation about why monitoring is required around any disturbance work.',
  },
  {
    question: 'What is COSHH 2002 and how does it relate to CAR 2012?',
    answer:
      'COSHH 2002 (Control of Substances Hazardous to Health Regulations) is the general regulation for hazardous substance exposure at work — chemicals, fume, dust, biological agents. Asbestos has its own dedicated regulation (CAR 2012) because of its specific hazard profile, but COSHH provides the wider framework — exposure assessment under Reg 6, prevention or control under Reg 7, monitoring under Reg 10. The L3 supervisor on solder fume, cleaning solvents, dust from chasing, even cement dust applies the COSHH framework even where the substance isn&apos;t separately regulated.',
  },
  {
    question: 'What about asbestos in cable insulation specifically?',
    answer:
      'Very old cables (pre-1960s) sometimes used asbestos braid as insulation reinforcement. Most has been removed during subsequent rewires but occasionally surfaces in old industrial buildings, original installations in heritage properties, or specialist applications (heating cables, boiler-room runs). Treat as suspect; sample if necessary; licensed contractor for removal.',
  },
  {
    question: 'Does the duty to manage extend to schools and care homes?',
    answer:
      'Yes — the duty to manage under CAR 2012 Reg 4 applies to all non-domestic premises including schools, care homes, hospitals, offices, shops, industrial premises. Local authorities, NHS trusts, school boards typically hold the duty. The L3 working in these premises asks for the asbestos register before work; particular care given the vulnerable occupant profile.',
  },
];

/* ── Inline checks2 (wired into streaks/stats) ─────────────────────── */

const checks2 = [
  {
    id: 'mod1-s2-sub6-stop-work',
    question:
      "You're an apprentice. Your supervisor isn't on site. The customer wants you to lift a 1980s ceiling tile to run a new fire-alarm cable. You don't know if the tile is asbestos. What's the right call right now?",
    options: [
      'Lift the tile carefully by one corner to check the back for the fibrous look of AIB.',
      "Stop, don't disturb the tile, and ask the dutyholder for the asbestos register first.",
      'Damp the tile down with water first, then lift it to keep any dust from going airborne.',
      "Crack on — the customer is paying and one ceiling tile won't release enough to matter.",
    ],
    correctIndex: 1,
    explanation:
      "Stop, isolate the area, escalate. CAR 2012 Reg 5 says you don't disturb a material that may contain asbestos until an assessment has been done. The dutyholder for any non-domestic building is legally required to hold an asbestos register and produce it on request — that's where you find out whether the tile is AIB. 'Lifting carefully' is still 'disturbing' in the eyes of the regulator.",
  },
  {
    id: 'mod1-s2-sub6-escalation-route',
    question:
      "You spot an obvious safety breach by your supervisor — they've removed your lock-off because the customer's complaining. You raise it; they tell you to drop it. Under HASAWA s.7 and MHSWR Reg 14, what do you do next?",
    options: [
      'Do as the supervisor says and drop it — they outrank you, so the responsibility is now theirs.',
      'Carry on working but quietly refit your own lock-off without telling the supervisor.',
      'Walk straight off site and report the supervisor directly to the HSE before telling anyone else.',
      'Escalate above the supervisor — your employer, the principal contractor, the scheme helpline — and note the conversation.',
    ],
    correctIndex: 3,
    explanation:
      "Section 7 of HASAWA puts a personal duty on YOU to take reasonable care AND to co-operate with the employer's safety arrangements. If your immediate supervisor has overridden a control, the escalation chain is: supervisor → your own employer / line manager → principal contractor on site → scheme provider helpline → HSE as last resort. Walking off without notifying anyone leaves the hazard live for the next person. The HSE is a real route, but you give the firm a chance to fix it first.",
  },
  {
    id: 'mod1-s2-sub6-acm-locations',
    question:
      'Which of these is NOT a typical place to find asbestos-containing materials in a UK pre-2000 building?',
    options: [
      'PVC twin-and-earth cable installed in 2018.',
      'Lagging on old central-heating pipework.',
      'Vinyl floor tiles and the bitumen adhesive under them.',
      'Suspended ceiling tiles (AIB).',
    ],
    correctIndex: 0,
    explanation:
      'Asbestos was banned in the UK in 1999. Anything manufactured after that date — including modern PVC T&E — is not an ACM. The other three are textbook ACM locations in pre-2000 buildings: AIB tiles, pipe lagging (often chrysotile or amosite), and floor tiles plus their black bitumen backing/adhesive.',
  },
];

/* ── End-of-page Quiz (wired into streaks/stats) ──────────────────── */

const quizQuestions2 = [
  {
    id: 1,
    question:
      'When was the import, supply and use of all forms of asbestos finally banned in the UK?',
    options: ['1985', '1999', '2006', '2012'],
    correctAnswer: 1,
    explanation:
      "Crocidolite (blue) and amosite (brown) were banned in 1985. Chrysotile (white) wasn't fully banned until 1999. The practical takeaway: any building constructed or refurbished BEFORE 2000 may contain asbestos. Anything built after 2000 is presumed not to — but that presumption is only as good as the building's history.",
  },
  {
    id: 2,
    question:
      'Under the Control of Asbestos Regulations 2012, who holds the legal duty to manage asbestos in a non-domestic building?',
    options: [
      'The electrician carrying out the work in the building.',
      'The local authority building control department.',
      'The dutyholder — usually the building owner or whoever has responsibility for maintenance and repair (often via the lease).',
      'The HSE, which surveys every non-domestic building directly.',
    ],
    correctAnswer: 2,
    explanation:
      "CAR 2012 Reg 4 places the duty to manage asbestos squarely on the dutyholder — the person or organisation with responsibility for the maintenance and repair of the non-domestic premises. They have to keep an asbestos register, share it with anyone who might disturb the fabric (you), and have a written management plan. As an apprentice you ASK FOR the register; you're not expected to produce one.",
  },
  {
    id: 3,
    question:
      "You arrive on site and the dutyholder can't produce an asbestos register for the area you're about to drill into. Right call?",
    options: [
      "No register means there's no asbestos on record, so it's safe to drill straight in.",
      'Take a small sample yourself and send it off to an accredited lab before continuing.',
      'Carry on but wear a dust mask and keep the area damp down as you work.',
      "Stop, don't disturb the fabric, and treat it as presumed asbestos until proven clean.",
    ],
    correctAnswer: 3,
    explanation:
      "No register doesn't mean no asbestos — it means no information. HSE guidance (HSG264 and the Asbestos Essentials a0 sheet) is clear: in pre-2000 buildings without a clean survey, the material is treated as presumed ACM until proven otherwise. The dutyholder has to commission the survey and the analysis; you don't sample yourself. Calling HSE is rarely the first step — usually you escalate internally first.",
  },
  {
    id: 4,
    question:
      'Which of these asbestos types was the most heavily used in the UK and is the one most commonly encountered in pre-2000 building fabric?',
    options: [
      'Chrysotile (white).',
      'Amosite (brown).',
      'Crocidolite (blue).',
      'Tremolite (clear).',
    ],
    correctAnswer: 0,
    explanation:
      'Chrysotile (white) was the workhorse — cement sheets, textured coatings (like Artex), gaskets, brake linings, vinyl floor tiles, electrical insulation backing boards. Amosite (brown) is most commonly found in AIB ceiling tiles and pipe insulation. Crocidolite (blue) is the most dangerous fibre but was banned earliest (1985). VISUAL identification is unreliable — only lab analysis gives you the type.',
  },
  {
    id: 5,
    question: "What does the HSE Asbestos Essentials task sheet 'a0' cover?",
    options: [
      'How to take a safe sample of a suspected asbestos material for lab analysis.',
      'Work with asbestos that does NOT need a licence — the basic precautions and which task sheets (a1–a40) cover specific jobs.',
      'The full list of licensed asbestos contractors approved by the HSE.',
      'The medical surveillance requirements for workers exposed to asbestos fibres.',
    ],
    correctAnswer: 1,
    explanation:
      "Asbestos Essentials a0 is HSE's introductory sheet for non-licensed asbestos work — what an electrician or other tradesperson might lawfully do (with training and the right kit) on lower-risk ACMs like cement sheets or floor tiles. The a1–a40 sheets then describe the specific tasks. ANY work on AIB, sprayed coatings or pipe lagging is licensed work and must be done by a licensed contractor — never by you.",
  },
  {
    id: 6,
    question:
      "You suspect a ceiling tile in a 1970s school is AIB. The supervisor says 'just lift one corner so I can see the back, then we'll decide.' Right call?",
    options: [
      "Do as asked — lifting one corner gently isn't really disturbance and helps you both decide.",
      'Lift the corner but hold your breath and wear a dust mask while you do it.',
      "Stop, don't touch it — lifting even a corner is disturbance — and check the register.",
      'Lift the corner only if you spray it with water first to bind any loose fibres.',
    ],
    correctAnswer: 2,
    explanation:
      "'Just lifting a corner' to inspect AIB is the textbook way junior tradespeople expose themselves and everyone else in the room to airborne fibres. Disturbance is disturbance. CAR 2012 Reg 5 requires an assessment BEFORE any work that could disturb ACMs. The supervisor asking you to do it doesn't transfer the liability — HASAWA s.7 is still on you personally. Escalate.",
  },
  {
    id: 7,
    question:
      "Under MHSWR 1999 Regulation 14, what is your duty as an employee when you spot a serious and imminent danger or a shortcoming in the employer's safety arrangements?",
    options: [
      "Put right the danger yourself before telling anyone, so the job isn't held up.",
      'Note it privately but say nothing unless someone is actually injured first.',
      'Report it straight to the HSE without involving your own employer at all.',
      'Inform your employer of the danger or shortcoming and co-operate to put it right.',
    ],
    correctAnswer: 3,
    explanation:
      "MHSWR Reg 14(2) puts the legal duty on every employee to inform the employer (or another employee with H&S responsibility) of any work situation representing a serious and immediate danger AND any shortcoming in the employer's protection arrangements. That's the legal hook for raising it up the chain — and protects you from being treated as the cause of a problem you flagged.",
  },
  {
    id: 8,
    question:
      "After raising a concern with your supervisor and being told to 'drop it', what's the most defensible thing to do BESIDES re-raising it?",
    options: [
      'Make a dated note of who you spoke to and what was said, then escalate to the level above.',
      'Let it go — you raised it once, so your duty under HASAWA is fully discharged.',
      'Take a photo of the hazard and post it on a trade group to get other opinions.',
      "Carry on with the work but make sure you're not the one operating the unsafe kit.",
    ],
    correctAnswer: 0,
    explanation:
      'Documenting the conversation (time, name, what was said) is what turns a verbal escalation into something you can later prove you did. It discharges your s.7 / Reg 14 duty even if the supervisor later denies the conversation happened. Then you escalate up — silence is what makes the prosecution stick to you as well.',
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs2 = [
  {
    question: "What does 'exceeds my level of responsibility' actually mean in practice?",
    answer:
      "Anything you haven't been trained or signed off to do. Working on live LV equipment, working at height beyond a low step, anything involving suspected asbestos, anything you're not competent at, anything where the RAMS doesn't cover what's actually in front of you. The rule is simple: if it's outside your competence, you stop, you don't guess, and you escalate to someone who IS competent.",
  },
  {
    question:
      "If I keep escalating, won't I get a reputation as the apprentice who's always 'difficult'?",
    answer:
      "No — the opposite. Supervisors and contracts managers want apprentices who flag issues early, because the alternative is finding out about them after an incident. The apprentice who quietly gets on with it and then has the accident is the expensive one. Escalating is what 'professional' looks like at apprentice level. Phrase it well and you build credit, not friction.",
  },
  {
    question: 'How do I tell asbestos by sight?',
    answer:
      "You can't, reliably. There are visual clues — AIB ceiling tiles often have a fibrous, slightly chalky face; pipe lagging in pre-1990 boiler rooms is a classic; textured Artex coatings on pre-2000 ceilings often contain chrysotile. But the only definitive test is a lab analysis of a properly taken sample. The right behaviour is to TREAT the material as suspect if the building is pre-2000 and you don't have a clean survey, then escalate.",
  },
  {
    question: 'If I disturb something tiny that turns out to be asbestos, am I in trouble?',
    answer:
      "Trouble depends on what you did before disturbing it. If you checked the asbestos register, found it clean, and disturbed something the survey missed — that's the dutyholder's failure, not yours. If you didn't check, didn't ask, just cracked on — then you (and your employer) are in the frame for a CAR 2012 / HASAWA breach. Always ASK first, document the answer, and act on it. That paperwork is your defence.",
  },
  {
    question: 'What about domestic jobs — does CAR 2012 still apply?',
    answer:
      "Reg 4 (the duty to manage and the asbestos register) only applies to non-domestic premises and the common parts of domestic premises (stairwells, lift shafts in flats). In a private house there's no legal register. BUT — the rest of CAR 2012 still applies to anyone doing work that could disturb asbestos. So in a 1960s house where you suspect AIB or pipe lagging, the procedure is the same: stop, don't disturb, talk to the homeowner, recommend a survey before the work proceeds. Your s.7 / Reg 14 duties don't change with the building type.",
  },
  {
    question: 'Where does asbestos turn up in things an electrician actually touches?',
    answer:
      "More places than people realise. Electrical insulation backing boards behind old fuseboards. Asbestos-cement flue pipes from old boilers running through ceiling voids. Gaskets in older switchgear. Textured coatings on the ceiling you're drilling through. Vinyl floor tiles (and the black bitumen adhesive under them) in commercial corridors. The sprayed coating on the underside of a pre-1985 metal-deck ceiling. Soffit boards on pre-2000 houses. The list is long — which is why 'pre-2000 building = check the register first' is the rule, not the exception.",
  },
];

export default function Lesson303_4_1() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        {
          "Remember from L2 — pre-2000 = suspect, don't disturb. At L3 you understand the licensed-vs-non-licensed boundary, the survey types, the disposal regime and the supervisor escalation chain."
        }
      </p>

      <TLDR
        points={[
          'CAR 2012 is THE UK asbestos regulation. Reg 4 duty to manage; Reg 8 licensed work; Reg 10 training.',
          'Pre-2000 buildings = presumed asbestos until survey rules out. Wide range of materials: AIB, cement, lagging, textured coating, floor tiles, gaskets, sprayed insulation.',
          "Supervisor reflex on suspect material: STOP, don't disturb, escalate to dutyholder + firm + principal contractor. Document. Don't proceed without confirmation or licensed contractor.",
          'Asbestos kills around 5,000 UK workers per year — single largest occupational killer. Electricians and other building trades historically over-represented.',
          'Control Limit 0.1 f/cm³ over 4 hours under CAR 2012; Reg 6 exposure assessment, Reg 7 prevention / reduction, Reg 22 health surveillance for licensed and some NNLW workers.',
          'Disposal as hazardous waste under EPA 1990 + Hazardous Waste Regs 2005 — double-bagged, HWCN, licensed carrier, permitted facility.',
        ]}
      />
      <LearningOutcomes
        outcomes={[
          'Explain situations where asbestos may be encountered.',
          'Specify the procedures for dealing with suspected asbestos.',
          'Identify the three main asbestos types (chrysotile, amosite, crocidolite).',
          'State the CAR 2012 dutyholder requirement (Reg 4) and the asbestos register.',
          'Distinguish licensed work (CAR 2012 Reg 8) from NNLW and non-licensed work.',
          'Apply the supervisor escalation chain on discovery of suspect material.',
          'Describe the asbestos exposure assessment (Reg 6) and prevention / reduction hierarchy (Reg 7).',
          'State the CAR 2012 Control Limit (0.1 f/cm³ over 4 hours) and its role in clearance.',
          'Identify the disposal regime under EPA 1990 s.34 and Hazardous Waste Regulations 2005 Reg 35.',
          'Describe the COSHH 2002 framework and its relationship to CAR 2012.',
          'Recognise asbestos-related disease categories and the CAR 2012 Reg 22 health-surveillance regime.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Where asbestos is encountered</ContentEyebrow>
      <ConceptBlock
        title="Pre-2000 buildings and the asbestos materials"
        plainEnglish='Asbestos use in new building products banned in 1999. Pre-2000 buildings (and refurbishments) routinely contain asbestos. Three main types — chrysotile (white), amosite (brown), crocidolite (blue) — used in many materials including textured ceilings, insulation board, cement products, lagging, floor tiles, sprayed insulation, gaskets, electrical components. Crocidolite was largely phased out by the late 1970s as the most dangerous form; amosite use ended in 1985; chrysotile (the "white" asbestos, the most common and the last permitted) was banned in 1999. The full ban under the Asbestos (Prohibition) Regulations 1992 / 1999 / amendment 2003 closes the supply chain — but the materials installed before the bans remain in place and continue to be discovered during refurbishment and demolition. HSE figures show approximately 5,000 UK deaths per year from asbestos-related diseases — the single largest occupational killer.'
        onSite="Default presumption: pre-2000 = suspect until proven otherwise. Visual identification rarely possible — laboratory sampling required. The L3 supervisor on first walking into any unfamiliar pre-2000 building asks the dutyholder for the asbestos register before any work; cross-references the register against the work scope; identifies areas where the work could disturb a registered or suspect material; plans the work to avoid disturbance or escalates for survey / licensed contractor. The cost of pre-job survey is small relative to the cost of an inadvertent disturbance."
      >
        <p>Common asbestos-containing materials (ACMs):</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Textured coatings (e.g. artex)</strong> — chrysotile, often low-content but
            disturbance creates fibre release.
          </li>
          <li>
            <strong>Asbestos Insulation Board (AIB)</strong> — amosite or chrysotile; common as
            panel ceilings, soffits, fire-proofing around steel beams.
          </li>
          <li>
            <strong>Asbestos cement products</strong> — chrysotile-bonded; roofing sheets,
            soffits, downpipes, flue pipes.
          </li>
          <li>
            <strong>Pipe and boiler lagging</strong> — amosite/crocidolite; high-risk, often
            friable.
          </li>
          <li>
            <strong>Sprayed coatings</strong> — friable; often around steel beams in industrial
            buildings.
          </li>
          <li>
            <strong>Floor tiles and adhesive</strong> — chrysotile; vinyl tiles and bitumen
            adhesive.
          </li>
          <li>
            <strong>Gaskets and seals</strong> — many electrical / mechanical gaskets pre-2000.
          </li>
          <li>
            <strong>Window putty and mastics</strong> — older formulations.
          </li>
          <li>
            <strong>Electrical fuse boards</strong> — some older units use AIB backing or sealing.
          </li>
          <li>
            <strong>Bath panels and toilet cisterns</strong> — older units.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Control of Asbestos Regulations 2012 — Reg 4(1)"
        clause={
          <>
            "In order to manage the risk from asbestos in non-domestic premises, the dutyholder
            must ensure that — (a) a suitable and sufficient assessment is carried out as to
            whether asbestos is or is liable to be present in the premises; (b) in making the
            assessment, the dutyholder must ensure that suitable inspections are made of those
            parts of the premises which are reasonably accessible; ..."
          </>
        }
        meaning={
          <>
            Reg 4 duty to manage. Dutyholder = person in control of the premises (typically owner
            / landlord / managing agent). The asbestos register / management plan must be
            available to anyone working on the fabric. Ask for it before any disturbance work.
          </>
        }
        cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 4."
      />

      <InlineCheck {...checks[0]} />
      <InlineCheck {...checks[1]} />

      <SectionRule />
      <ContentEyebrow>Survey types and licensed work</ContentEyebrow>
      <ConceptBlock
        title="Management survey vs refurbishment survey"
        plainEnglish='Management survey — finds and assesses ACMs in normal use of the building; minimally intrusive; for the asbestos register. Refurbishment survey — pre-disturbance; intrusive; required before significant alteration / demolition. Different scopes; different costs; different prerequisites. The HSG264 guidance "Asbestos: The survey guide" (2nd edition, HSE 2012) is the headline reference. Surveys are carried out by qualified surveyors — typically holding the BOHS P402 / W504 qualifications and working for UKAS-accredited inspection bodies. Sampling and analysis is carried out by UKAS-accredited laboratories using polarised light microscopy (PLM) for bulk samples and phase-contrast microscopy (PCM) for airborne fibres.'
        onSite='Before drilling / chasing / cutting in pre-2000 building, a refurbishment survey of the affected area is the gold standard. Management survey alone may be inadequate — it assesses normal-use exposure, not what happens if you open up the fabric. The L3 supervisor on quotation stage flags the survey cost back to the customer — "before we can quote firm, we need a refurbishment survey of the wall void / ceiling void / etc" — and waits for the survey results before committing to scope and price.'
      >
        <p>Survey distinctions:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Management survey</strong> — for the register; assesses normal-use exposure.
          </li>
          <li>
            <strong>Refurbishment survey</strong> — pre-alteration; assesses what will be
            disturbed.
          </li>
          <li>
            <strong>Demolition survey</strong> — pre-demolition; comprehensive sampling of all
            areas.
          </li>
          <li>
            Surveys carried out by accredited / competent surveyors (UKAS-accredited inspection
            bodies).
          </li>
          <li>Sampling and lab analysis required for confirmation; visual ID not enough.</li>
          <li>Reports become part of the asbestos register.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Licensed vs non-licensed work"
        plainEnglish="CAR 2012 Reg 8 — high-risk asbestos work requires HSE-licensed contractor. Includes most disturbance of friable insulation, AIB beyond very small quantities, sprayed coatings. Lower-risk work may be NNLW (Notifiable Non-Licensed Work) — trained operatives, written plan, notification. Lowest-risk may be non-licensed (still trained, still controlled). The Asbestos (Licensing) Regulations 1983 originally established the licensing regime; CAR 2012 incorporates and extends it. Licences are issued by the HSE for periods up to 3 years; licensed contractors are subject to inspection, audit, and renewal review. The HSE published list of licensed contractors is publicly available."
        onSite="The categorisation is technical. Get it wrong and exposure occurs. The L3 supervisor approach is conservative — escalate to specialist who can categorise correctly. Don't attempt anything beyond observation without confirmed competence. The exam-question approach to categorisation: friable (easily crumbled) → likely licensed; AIB beyond a small handful of fixings → likely licensed; sprayed coating → almost always licensed; intact cement sheet with minor non-friable disturbance → possibly non-licensed by trained operative; awareness-only encounter with no disturbance → non-licensed but training required."
      >
        <p>Categorisation summary:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Licensed work (Reg 8)</strong> — sprayed coatings, lagging, large AIB removal,
            friable insulation. HSE-licensed contractor only.
          </li>
          <li>
            <strong>NNLW (Notifiable Non-Licensed Work)</strong> — limited removal of less-friable
            materials by trained personnel; HSE notification + medical surveillance + records.
          </li>
          <li>
            <strong>Non-licensed work</strong> — short, infrequent, low-risk tasks (e.g. small
            cement product handling) by trained operatives following CAR 2012 controls.
          </li>
          <li>
            <strong>Awareness only</strong> — knowing it's there but not disturbing it.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Control of Asbestos Regulations 2012 — Reg 8(1)"
        clause={
          <>
            "Subject to regulation 3(2), an employer must ensure that any work with asbestos
            undertaken by the employer&apos;s employees is carried out in accordance with a
            licence granted by the Executive under regulation 3(1) of the Asbestos (Licensing)
            Regulations 1983 unless the work is exempted from the requirement for a licence by
            regulation 3(2)."
          </>
        }
        meaning={
          <>
            Reg 8 — licensed work requires an HSE licence. The exemptions in Reg 3(2) and
            elsewhere create the NNLW and non-licensed categories for lower-risk activity. Most
            apprentice-encountered asbestos work falls in the licensed or NNLW band; default to
            escalation.
          </>
        }
        cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 8."
      />

      <InlineCheck {...checks[2]} />

      <SectionRule />
      <ContentEyebrow>Discovery procedure and disposal</ContentEyebrow>
      <ConceptBlock
        title="Found suspect material — what to do"
        plainEnglish="Stop, don’t disturb, evacuate area, escalate. The L3 supervisor reflex on discovery: protect the team, document, escalate to dutyholder + firm + principal contractor where applicable, await confirmation before proceeding."
        onSite="Photograph the material from a safe distance; don’t touch; close off the area; brief the team to stay clear. Phone the firm’s H&S manager and the customer’s responsible person. Don’t speculate on type or risk — let the surveyor determine."
      >
        <p>Discovery procedure:</p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>STOP work immediately.</li>
          <li>Don&apos;t disturb further (no touching, no tools, no movement of material).</li>
          <li>Vacate the immediate area; close off if possible.</li>
          <li>
            Document — photo from safe distance; note location, type apparent, condition,
            surrounding materials.
          </li>
          <li>Phone firm&apos;s H&amp;S manager / contracts manager.</li>
          <li>Inform dutyholder (building owner / managing agent / customer).</li>
          <li>Inform principal contractor (if appointed) for cascade through the project.</li>
          <li>
            Don&apos;t restart work in the affected area until: (a) confirmed non-asbestos by
            survey, OR (b) licensed contractor takes over disturbance work.
          </li>
          <li>Update RAMS to reflect the discovery and the new procedure.</li>
          <li>Notify own exposure if any disturbance occurred; record on personal file.</li>
        </ol>
      </ConceptBlock>

      <ConceptBlock
        title="Disposal of asbestos waste"
        plainEnglish="Asbestos waste is hazardous waste. Double-bagged in heavy-duty asbestos bags (red inner, clear outer with label), labelled, accompanied by Hazardous Waste Consignment Note, transported by licensed asbestos waste carrier, disposed of at permitted asbestos waste facility."
        onSite="The L3 supervisor doesn’t handle asbestos waste personally (that’s licensed work). But knowing the regime exists informs the customer conversation about why the disposal is more involved than ‘a skip’."
      >
        <p>Disposal regime:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Double-bagged: red inner (asbestos-marked), clear outer with hazardous waste label.
          </li>
          <li>Each bag labelled with details of producer, type, quantity, date.</li>
          <li>Hazardous Waste Consignment Note (HWCN) accompanies transport.</li>
          <li>Licensed asbestos waste carrier — registered with EA / SEPA / NRW.</li>
          <li>Permitted asbestos waste facility (specific landfill cells).</li>
          <li>Producer retains HWCN for 3 years (Hazardous Waste Regs 2005).</li>
          <li>
            Mixing with general waste is multiple offences (CAR 2012, Hazardous Waste Regs, EPA
            1990).
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>
        Health surveillance, training duties and electrical-trade specifics
      </ContentEyebrow>
      <ConceptBlock
        title="CAR 2012 Reg 10 — training tiers"
        plainEnglish="Three training tiers under CAR 2012 Reg 10. Asbestos awareness (Category A) — for anyone whose work may foreseeably expose them; UKATA / IATP 1-day course; refresher annually. Non-licensed work training (Category B) — for those carrying out non-licensed asbestos work; more comprehensive. Licensed work training (Category C) — for licensed contractor operatives; specialised."
        onSite="The L3 supervisor at minimum holds Category A awareness; checks all team members' awareness training is current; ensures Category B / C is held by anyone undertaking actual disturbance work. Without training, work cannot lawfully proceed."
      >
        <p>Training tier requirements:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Category A — Asbestos Awareness</strong> — UKATA / IATP 1-day; refresher
            annually; for any trade that may encounter ACMs.
          </li>
          <li>
            <strong>Category B — Non-Licensed Work</strong> — additional training; HSE
            notification (NNLW) where work scope crosses notifiable threshold.
          </li>
          <li>
            <strong>Category C — Licensed Work</strong> — operatives of HSE-licensed contractors;
            comprehensive specialist training.
          </li>
          <li>
            <strong>Refresher</strong> — annual for awareness; periodic for higher tiers per
            scheme.
          </li>
          <li>
            <strong>Records</strong> — operative training matrix; cert numbers; expiry dates.
          </li>
          <li>
            <strong>L3 supervisor</strong> — verifies team training currency before any work in
            pre-2000 building.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Health surveillance under CAR 2012"
        plainEnglish="CAR 2012 Reg 22 requires medical surveillance for employees doing licensed asbestos work or NNLW. Initial medical, then 2-yearly review. Records retained 40 years (lifetime exposure tracking). The medical includes lung function tests and clinical examination."
        onSite="The L3 supervisor on a routine electrical install isn't doing licensed work, so Reg 22 surveillance won't typically apply. But knowing it exists informs the conversation when escalating to licensed contractor — 'this is why we don't do this work ourselves; their operatives have surveillance set up'."
      >
        <p>Surveillance regime per work tier:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Awareness only</strong> — no surveillance required (no exposure expected).
          </li>
          <li>
            <strong>Non-licensed work</strong> — surveillance not strictly required by CAR 2012
            but good practice; some firms apply.
          </li>
          <li>
            <strong>NNLW</strong> — surveillance required under CAR 2012 Reg 22 (some categories).
          </li>
          <li>
            <strong>Licensed work</strong> — surveillance required under Reg 22; biennial review.
          </li>
          <li>
            <strong>Records</strong> — 40 years retention (lifetime tracking).
          </li>
          <li>
            <strong>Post-employment</strong> — exposure history follows the worker; civil claims
            decades later possible.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Asbestos in electrical-trade equipment specifically"
        plainEnglish="Beyond building fabric, electrical equipment from the asbestos era can contain asbestos in its own construction. Older fuse boards (AIB backing), gaskets in motors and switchgear, insulation in older cables, arc chutes in some MCCBs, asbestos-containing seal materials in older transformers."
        onSite="When working on pre-2000 electrical equipment, treat the equipment itself as suspect, not just the building around it. Removal / replacement of older fuse boards may disturb AIB backing. Older motor gaskets disturbed during termination work can release fibres. Brief team accordingly."
      >
        <p>Equipment-specific risk areas:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Fuse boards (pre-1985)</strong> — possible AIB backing; cement asbestos
            enclosures.
          </li>
          <li>
            <strong>Motor gaskets</strong> — older motor flange / terminal-box gaskets.
          </li>
          <li>
            <strong>Switchgear arc chutes</strong> — some older MCCB / ACB designs.
          </li>
          <li>
            <strong>Transformer seals</strong> — older transformer gaskets and bushings.
          </li>
          <li>
            <strong>Cable insulation</strong> — very old cables (pre-1960s) may have asbestos
            braid.
          </li>
          <li>
            <strong>Cable trays / runs in fire-rated walls</strong> — original asbestos lining
            around penetrations.
          </li>
          <li>
            <strong>Heat shields and barriers</strong> — original heat-resistant materials around
            equipment.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Control of Asbestos Regulations 2012 — Reg 10 (Information, instruction and training)"
        clause={
          <>
            "Every employer must ensure that adequate information, instruction and training is
            given to those of his employees — (a) who are or who are liable to be exposed to
            asbestos, or who supervise such employees so they are aware of — (i) the properties of
            asbestos and its effects on health, including its interaction with smoking; (ii) the
            types of products or materials likely to contain asbestos; (iii) the operations which
            could result in asbestos exposure and the importance of preventive controls to
            minimise exposure; ..."
          </>
        }
        meaning={
          <>
            Reg 10 — training duty. Information, instruction AND training all required. UKATA /
            IATP-certified courses meet the requirement for awareness; higher tiers for
            non-licensed and licensed work. Records of training retained as competence evidence.
            Without training, the work cannot lawfully be done.
          </>
        }
        cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 10."
      />

      <SectionRule />
      <CommonMistake
        title="Drilling into a textured ceiling without checking"
        whatHappens={
          <>
            Apprentice drills into 1980s domestic textured ceiling to fit a ceiling rose; releases
            dust into the room. Customer mentions ceiling has the textured finish; apprentice
            realises chrysotile was probably present. Personal exposure recorded; CAR 2012 Reg 6
            (exposure assessment) and Reg 7 (prevention) breach; firm prosecuted; potential health
            surveillance for the operative.
          </>
        }
        doInstead={
          <>
            Pre-2000 textured coating = suspect chrysotile until survey rules out. STOP. Customer
            can be asked about previous surveys; if none, recommend testing before any
            disturbance. Many test labs offer fast turnaround for a single sample.
          </>
        }
      />

      <CommonMistake
        title="Disposing of a small piece of cement product in the general skip"
        whatHappens={
          <>
            Apprentice replaces an old electrical box mounted on an asbestos cement panel; small
            fragment broken off; tossed into general skip with confidence that &quot;it&apos;s
            only cement bonded&quot;. Skip is later inspected; load contaminated; firm fined under
            Hazardous Waste Regs and CAR 2012 disposal requirements.
          </>
        }
        doInstead={
          <>
            Asbestos cement = hazardous waste regardless of bonding. Don&apos;t handle disposal
            personally; escalate to licensed contractor for removal AND for compliant disposal.
            The cost is small; the alternative is multiple regulatory offences.
          </>
        }
      />

      <Scenario
        title="Suspected asbestos found mid-job"
        situation={
          <>
            You’re partway through a small electrical alteration in a 1970s commercial unit.
            Drilling a fixing hole in the ceiling has revealed what looks like AIB above the
            suspended ceiling tiles. You weren’t expecting it; the customer’s site manager
            thought it had all been removed years ago.
          </>
        }
        whatToDo={
          <>
            Stop drilling immediately. Withdraw from the area. Do not allow further drilling /
            disturbance in the area. Photograph from safe distance — note location, what you saw,
            the fact you drilled into it. Phone your firm&apos;s H&amp;S manager / contracts
            manager — &quot;suspect AIB found mid-job; have stopped&quot;. Inform the
            customer&apos;s site manager — &quot;need to confirm what this is before we can
            continue&quot;. The site manager (as dutyholder) needs to engage a surveyor / licensed
            contractor; that&apos;s their decision and their cost. Update your dynamic risk
            assessment with the discovery. Brief the rest of your team; close off the area;
            restrict access. Personal: record your potential exposure (brief, single-bore drill —
            likely low-level but record). The customer&apos;s assumption that &quot;it&apos;s all
            been removed&quot; is a common error; their asbestos register may not be current.
            Don&apos;t recommence work in the affected area until either confirmed non-asbestos or
            licensed contractor has dealt with the disturbance properly.
          </>
        }
        whyItMatters={
          <>
            This is a textbook scenario that the L3 supervisor handles routinely on pre-2000
            buildings. The discovery isn&apos;t failure; the response is the test. Stopping
            immediately, escalating, documenting, restricting access — these are the supervisor
            acts that protect the team and create the evidence trail. The customer&apos;s
            commercial pressure (&quot;just finish the job today&quot;) is real but cannot
            override CAR 2012. ERA s.44 protects the refusal. The firm&apos;s reputation for
            thoroughness is reinforced; the alternative — proceeding and contaminating the wider
            area — would be career-defining in the wrong direction.
          </>
        }
      />

      <SectionRule />
      <ContentEyebrow>Asbestos health effects and surveillance</ContentEyebrow>

      <ConceptBlock
        title="Why asbestos kills more UK workers than any other workplace agent"
        plainEnglish="Asbestos is the single largest occupational killer in the UK. HSE figures show around 5,000 deaths per year from asbestos-related diseases, with electricians and other building-trades operatives consistently among the highest-affected occupations. The diseases — mesothelioma, asbestos-related lung cancer, asbestosis, pleural plaques — have decades-long latency. Operatives exposed in their 20s die of mesothelioma in their 60s and 70s. There is no safe exposure level for the carcinogenic effects."
        onSite="The L3 reading: even a single significant exposure can cause disease decades later. The cumulative low-level exposures across a career add up. The discipline that protects you isn't glamorous — pre-2000 presumption, surveys before disturbance, refusing to drill into unknown surfaces, escalating discoveries — but it's what stops you being one of the 5,000 names on next decade's register."
      >
        <p>Asbestos-related diseases:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Mesothelioma</strong> — cancer of the lining of lungs, heart or abdomen.
            Caused exclusively by asbestos. Always fatal. 20-50 year latency.
          </li>
          <li>
            <strong>Asbestos-related lung cancer</strong> — clinically indistinguishable from
            smoking-related lung cancer; the asbestos exposure shifts the attribution.
          </li>
          <li>
            <strong>Asbestosis</strong> — progressive lung scarring. Heavy cumulative exposure;
            not seen with low-level work-only exposure.
          </li>
          <li>
            <strong>Pleural plaques</strong> — thickening of the pleural lining; largely benign
            but indicates significant prior exposure; marker for elevated mesothelioma risk.
          </li>
          <li>
            <strong>Pleural thickening (diffuse)</strong> — more extensive than plaques; can
            affect lung function.
          </li>
          <li>
            <strong>Combined smoking</strong> — multiplicative effect on lung cancer risk;
            asbestos + smoking is far worse than either alone.
          </li>
          <li>
            <strong>Health surveillance</strong> — under CAR 2012 Reg 22, mandatory for licensed
            workers and recommended for non-licensed; lung function tests, chest radiographs,
            occupational health review.
          </li>
          <li>
            <strong>Records retained 40 years</strong> — CAR 2012 Reg 22(7); long-latency disease
            requires long-retention records.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>Exposure assessment, monitoring and prevention</ContentEyebrow>

      <ConceptBlock
        title="CAR 2012 Regs 6 and 7 — exposure assessment and prevention"
        plainEnglish="Before any work that may expose employees to asbestos, CAR 2012 Reg 6 requires the employer to make a suitable and sufficient assessment of whether asbestos is liable to be present and, if so, what the exposure is likely to be. Reg 7 then requires prevention of exposure where reasonably practicable, or reduction to the lowest level reasonably practicable. The hierarchy of control applies in the asbestos context: eliminate (don't do the work; avoid disturbance); substitute (use a different work method that doesn't disturb the material); engineering controls (local exhaust ventilation, controlled wetting); administrative controls (limit time exposed, rotate personnel, exclusion zones); RPE (respiratory protective equipment as last line)."
        onSite="The L3 supervisor reading the firm's asbestos exposure assessment for the job: what materials are presumed or confirmed asbestos; what work activities are planned; what exposure is anticipated; what controls are in place; what RPE is specified; what air-monitoring (if any) is in place. The L3 doesn't personally write the assessment for licensed work (that's the licensed contractor's competence), but reads and understands it before authorising any team activity in the area."
      >
        <p>CAR 2012 exposure-control hierarchy in practice:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Eliminate</strong> — avoid the work; route services round the ACM; design
            alternative.
          </li>
          <li>
            <strong>Substitute</strong> — use a non-disturbance method (e.g. surface cable run vs
            chasing).
          </li>
          <li>
            <strong>Engineering controls</strong> — local exhaust ventilation (H-class
            extraction), controlled wetting, enclosure, negative-pressure containment.
          </li>
          <li>
            <strong>Administrative controls</strong> — limit time; exclusion zone; signage;
            competent operatives only; supervision.
          </li>
          <li>
            <strong>RPE</strong> — face-fitted respirator appropriate to the work type; FFP3
            disposables (basic non-licensed), full or half-face filter (mid-tier), powered
            air-purifying respirator (licensed); face-fit testing required.
          </li>
          <li>
            <strong>Personal decontamination</strong> — vacuum (H-class only), disposable
            coveralls, change facility, washing.
          </li>
          <li>
            <strong>Air monitoring</strong> — reassurance (background), personal (operative
            exposure), leak (containment integrity), clearance (post-work) — all by accredited
            analyst.
          </li>
          <li>
            <strong>Clearance certificate</strong> — &quot;Certificate of Reoccupation&quot;
            following 4-stage clearance (visual, cleaning, air test, final visual) on licensed
            work.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="The control limit, action level and analyst's role"
        plainEnglish='CAR 2012 sets a Control Limit of 0.1 fibres per cm³ averaged over 4 hours. The control limit is the absolute maximum airborne concentration that must not be exceeded by any worker. Note: the absence of a fibre reading above the control limit does NOT mean "safe" — the cumulative dose matters for long-latency disease, and the control limit is a regulatory threshold, not a health-based safe level. Below it is "not in breach" but still hazardous. Analyst&apos;s reports specify the sample period, the analytical method (PCM for routine, SEM for low concentrations), and the concentration result.'
        onSite="The L3 supervisor on a licensed-work job won't personally interpret analyst's reports but will see them on handover. The two key things to look at: was the work-area concentration kept below 0.1 f/cm³ over 4 hours; did the final clearance certificate (Certificate of Reoccupation) confirm clean air, clean surfaces, no visible debris. The licensed contractor packs the clearance evidence into the project's health and safety file."
      >
        <p>Analytical and monitoring framework:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>PCM (Phase Contrast Microscopy)</strong> — standard analytical method for
            airborne fibre concentration; counts fibres on filter membranes.
          </li>
          <li>
            <strong>SEM (Scanning Electron Microscopy)</strong> — used at very low concentrations
            or where fibre identification is needed.
          </li>
          <li>
            <strong>PLM (Polarised Light Microscopy)</strong> — for bulk sample identification;
            distinguishes asbestos types from non-asbestos minerals.
          </li>
          <li>
            <strong>Control limit</strong> — 0.1 f/cm³ over 4 hours under CAR 2012; not a
            health-based safe level.
          </li>
          <li>
            <strong>Clearance air test</strong> — &lt; 0.01 f/cm³ for reoccupation following
            licensed work.
          </li>
          <li>
            <strong>Analyst competence</strong> — accredited under ISO/IEC 17025; analysts hold
            P403 / P404 / S301 qualifications.
          </li>
          <li>
            <strong>Reporting</strong> — formal reports retained in the project safety file;
            copies to dutyholder and licensed contractor.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Control of Asbestos Regulations 2012 — Reg 7(1) (Prevention or reduction of exposure to asbestos)"
        clause={
          <>
            &quot;Every employer must — (a) prevent the exposure to asbestos of any employee
            employed by that employer so far as is reasonably practicable; or (b) where it is not
            reasonably practicable to prevent such exposure — (i) take the measures necessary to
            reduce exposure to asbestos to the lowest level reasonably practicable by measures
            other than the use of respiratory protective equipment; and (ii) ensure that the
            number of employees exposed to asbestos is as low as is reasonably practicable.&quot;
          </>
        }
        meaning={
          <>
            Reg 7 — the prevention-first principle. Note the explicit priority of prevention over
            reduction, and within reduction the explicit priority of non-RPE measures over RPE.
            This is the hierarchy of control in regulatory form. RPE is the last line — used only
            after engineering and administrative controls have reduced exposure as far as
            reasonably practicable.
          </>
        }
        cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 7."
      />

      <SectionRule />
      <ContentEyebrow>COSHH 2002 — the wider hazardous-substance framework</ContentEyebrow>

      <ConceptBlock
        title="Why COSHH matters to the electrical trade — beyond asbestos"
        plainEnglish="The Control of Substances Hazardous to Health Regulations 2002 are the general framework for workplace exposure to hazardous substances — chemicals, dusts, fumes, vapours, mists, gases, biological agents. Asbestos has its own dedicated regulation (CAR 2012) because of its specific risk profile, but the COSHH structure provides the wider model the L3 supervisor applies day to day. COSHH requires the employer to identify substances used (Reg 6 exposure assessment), apply the hierarchy of control under Reg 7 (eliminate, substitute, engineering controls, administrative controls, PPE), provide information / instruction / training under Reg 12, monitor exposure under Reg 10, conduct health surveillance under Reg 11 where required."
        onSite="The L3 reflex on substances encountered in normal electrical work: solder fume (lead-free now standard, but flux fume still hazardous); cleaning solvents (IPA, electrical contact cleaner); cable lubricant; flexible conduit dust; cement dust from chasing; silica dust from concrete cutting (Reg 7 specific control); machine oil; battery electrolyte. Each is a COSHH substance. The control hierarchy applies — local exhaust ventilation for solder fume, on-tool dust extraction for chasing, water-suppression for concrete cutting, gloves for solvents, eye protection for any spray application. Compliance is documented in COSHH assessments held by the firm."
      >
        <p>COSHH Regulations key duties:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Reg 6 — Exposure assessment</strong>: identify substances, routes of exposure,
            persons exposed, control measures needed.
          </li>
          <li>
            <strong>Reg 7 — Prevention or control</strong>: hierarchy of control mirroring MHSWR
            Schedule 1.
          </li>
          <li>
            <strong>Reg 8 — Use of control measures</strong>: provided controls actually used by
            operatives.
          </li>
          <li>
            <strong>Reg 9 — Maintenance, examination and test of controls</strong>: extraction
            systems, RPE, etc.
          </li>
          <li>
            <strong>Reg 10 — Monitoring</strong>: airborne concentration monitoring where
            appropriate.
          </li>
          <li>
            <strong>Reg 11 — Health surveillance</strong>: where exposure creates identifiable
            disease and validated technique exists.
          </li>
          <li>
            <strong>Reg 12 — Information, instruction and training</strong>: workers know the
            hazards and controls.
          </li>
          <li>
            <strong>Schedule 1</strong> — substances with specific provisions (lead, mercury,
            etc).
          </li>
          <li>
            <strong>Workplace Exposure Limits (WELs)</strong> — published in HSE EH40; quoted in
            8-hour and short-term reference periods.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="The hazardous-waste framework — disposal regime end to end"
        plainEnglish="Disposal of waste material from work activities is governed by the Environmental Protection Act 1990 Part II (waste duty of care under s.34), the Hazardous Waste (England and Wales) Regulations 2005, the equivalent regimes in Scotland and Northern Ireland, and the relevant List of Wastes Regulations. Asbestos waste, lead-acid batteries, lithium batteries, fluorescent tubes (mercury), oil-filled equipment (transformers, capacitors with possible PCB content), some sealed-source smoke detectors, contaminated soils, and aerosol cans are common electrical-trade waste streams that classify as hazardous. The duty of care under EPA s.34 requires the producer of the waste to ensure it is managed properly all the way to final disposal — passing it to an unlicensed carrier is itself an offence."
        onSite="The L3 supervisor on any project producing hazardous waste: identify the waste streams; segregate at source; use authorised waste carriers (registered with the Environment Agency / SEPA / NRW); raise the Hazardous Waste Consignment Note (HWCN); retain records for at least 3 years; cross-check carrier registration before handover. WEEE (Waste Electrical and Electronic Equipment) under the WEEE Regulations 2013 covers fluorescent tubes, control equipment, transformers, lighting. Some categories of WEEE are also hazardous waste (mercury tubes, oil-filled capacitors) — both regimes apply."
      >
        <p>Hazardous-waste handling rules:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Identification</strong> — match waste to the List of Wastes codes; flag as
            hazardous where applicable.
          </li>
          <li>
            <strong>Segregation</strong> — keep hazardous streams separate from general; never
            mix.
          </li>
          <li>
            <strong>Storage</strong> — appropriate container; labelled; drip-tray under liquid
            waste; locked where vulnerable to tampering.
          </li>
          <li>
            <strong>HWCN</strong> — Hazardous Waste Consignment Note for every movement of
            hazardous waste; producer copy, carrier copy, recipient copy.
          </li>
          <li>
            <strong>Licensed carrier</strong> — registered with the relevant environmental
            regulator; cross-check on EA / SEPA / NRW register.
          </li>
          <li>
            <strong>Permitted facility</strong> — only authorised facilities can receive specific
            waste types.
          </li>
          <li>
            <strong>Records</strong> — HWCN, carrier registration, recipient permit — retained 3
            years minimum.
          </li>
          <li>
            <strong>WEEE 2013</strong> — separate but overlapping regime for electrical equipment;
            producer takeback obligations.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Environmental Protection Act 1990 — s.34(1) (Duty of care as respects waste)"
        clause={
          <>
            &quot;It shall be the duty of any person who imports, produces, carries, keeps, treats
            or disposes of controlled waste or, as a broker, has control of such waste, to take
            all such measures applicable to him in that capacity as are reasonable in the
            circumstances — (a) to prevent any contravention by any other person of section 33
            above; (b) to prevent the escape of the waste from his control or that of any other
            person; and (c) on the transfer of the waste, to secure — (i) that the transfer is
            only to an authorised person or to a person for authorised transport purposes; and
            (ii) that there is transferred such a written description of the waste as will enable
            other persons to avoid a contravention of that section and to comply with the duty
            under this subsection as respects the escape of waste.&quot;
          </>
        }
        meaning={
          <>
            EPA s.34 — the waste duty of care. Applies to the producer of the waste (the
            contractor doing the works) as well as the carrier and the receiver. The duty
            doesn&apos;t end when the skip leaves site — it ends when the waste reaches its final
            authorised disposal point. The L3 supervisor verifies carrier registration before any
            hazardous-waste movement; retains the HWCN; chases the recipient&apos;s
            acknowledgement of receipt. Sloppy waste handling is a criminal offence under both
            s.33 (unauthorised deposit) and s.34 (failure of duty of care).
          </>
        }
        cite="Source: Environmental Protection Act 1990 (1990 c.43), s.34."
      />

      <RegsCallout
        source="Hazardous Waste (England and Wales) Regulations 2005 — Reg 35(1)"
        clause={
          <>
            &quot;Every person who, in the course of a business or otherwise for profit,
            transports controlled waste between different premises must on each occasion ensure
            that the waste is accompanied by a transfer note containing the prescribed
            particulars.&quot;
          </>
        }
        meaning={
          <>
            Reg 35 — the hazardous-waste consignment-note regime. Every movement of hazardous
            waste must be documented; the producer retains a copy; the carrier retains a copy; the
            recipient retains a copy. Failure is an offence and is the most common hazardous-waste
            enforcement action.
          </>
        }
        cite="Source: Hazardous Waste (England and Wales) Regulations 2005 (SI 2005/894), Reg 35."
      />

      <RegsCallout
        source="Control of Asbestos Regulations 2012 — Reg 22(1) (Health records and medical surveillance)"
        clause={
          <>
            &quot;Every employer must ensure that a health record, containing particulars approved
            by the Executive, is maintained in respect of each of his employees who is exposed to
            asbestos in a case where that exposure is by reason of work which is subject to
            medical surveillance under paragraph (2), and the record or a copy thereof is kept
            available for at least 40 years from the date of the last entry made in it.&quot;
          </>
        }
        meaning={
          <>
            Reg 22 — health records and medical surveillance. The 40-year retention reflects the
            long latency of asbestos-related disease: an exposure today could give rise to a claim
            or disease decades later, and the records must outlast the employment, the firm in
            many cases, and the original employer&apos;s knowledge of who was exposed. For
            licensed work and most NNLW, biennial medical surveillance is required; the record
            covers exposure history, medical examinations, and any abnormal findings.
          </>
        }
        cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 22."
      />

      <ConceptBlock
        title="Asbestos and the customer conversation — managing expectation"
        plainEnglish="The L3 supervisor's ability to manage the customer conversation when asbestos is discovered is a real professional skill. Customers' reactions vary — some are unconcerned (&quot;a bit of asbestos never hurt anyone&quot;), some panic, some are angry at being told. The L3 framing is calm, factual, brief: &quot;We've found suspect material that we need confirmed before we can safely continue. The standard route is a sample tested at an accredited lab; turnaround is typically 1-3 working days. If confirmed, we then need either a licensed contractor for removal or a documented 'leave in place' plan, depending on what the survey says.&quot; The conversation is short, factual, and ends with a clear next step."
        onSite="Don't speculate about type or risk — let the survey speak. Don't describe the material in alarming language (&quot;poison&quot;, &quot;deadly&quot;) — accurate and measured is more credible. Do explain why the response is what it is — the law, the duty of care, the protection of the customer's building and the team. Do offer to liaise with the customer's preferred specialist or recommend one. Do follow up in writing immediately after the conversation. The customer's subsequent perception is shaped largely by the calm professionalism of the L3 at the discovery moment."
      >
        <p>Customer-conversation framework on suspect material:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>State what was found, where, when — factually.</li>
          <li>State why work has stopped — &quot;until we know what it is&quot;.</li>
          <li>State the next step — survey / sample / specialist.</li>
          <li>State the timescale — typical turnaround, expected resumption.</li>
          <li>
            State the customer&apos;s role — they&apos;re the dutyholder; they engage the survey /
            contractor.
          </li>
          <li>Document the conversation in writing immediately.</li>
          <li>Be available for follow-up questions.</li>
          <li>
            Refer the customer to HSE asbestos guidance for further reading if they want it.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="WEEE Regulations 2013 — electrical and electronic equipment waste"
        plainEnglish="The Waste Electrical and Electronic Equipment Regulations 2013 implement the EU WEEE Directive and govern the disposal of electrical and electronic equipment at end of life. EEE includes consumer items (TVs, white goods) and commercial / industrial equipment (luminaires, control panels, transformers, lifting gear). The Regulations place producer-responsibility duties on equipment producers (take-back schemes, registration with compliance schemes); distributor duties (in-store take-back); and end-user duties (treat EEE separately from general waste, present at authorised treatment facility). Significant overlaps with hazardous waste — many EEE items contain mercury, lead, cadmium, PCBs, or other regulated substances and the WEEE Regs and Hazardous Waste Regs both apply."
        onSite="The L3 supervisor on any project involving removal of installed electrical equipment: identify the WEEE streams; segregate; arrange transport through an approved Authorised Treatment Facility (ATF); raise documentation; consider whether items also classify as hazardous waste (mercury tubes, oil-filled capacitors, smoke detectors with sealed radioactive sources, lithium / lead batteries). Larger installations (commercial refit, hospital strip-out, industrial removal) generate substantial WEEE volumes; the regulatory regime is consequential. Documentation retained as part of project handover."
      >
        <p>WEEE classifications relevant to electrical trade:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Category 1</strong> — Large household appliances (washers, cookers, fridges
            with refrigerant gases — F-gas regime overlap).
          </li>
          <li>
            <strong>Category 2</strong> — Small household appliances.
          </li>
          <li>
            <strong>Category 3</strong> — IT and telecommunications equipment.
          </li>
          <li>
            <strong>Category 5</strong> — Lighting equipment (fluorescent tubes, LED panels,
            emergency lighting fittings) — major electrical-trade stream.
          </li>
          <li>
            <strong>Category 6</strong> — Electrical and electronic tools (drills, test equipment)
            at end of life.
          </li>
          <li>
            <strong>Category 9</strong> — Monitoring and control instruments (older meters,
            control panels).
          </li>
          <li>
            <strong>Producer responsibility</strong> — equipment producers pay into compliance
            schemes; treatment funded.
          </li>
          <li>
            <strong>Authorised Treatment Facility (ATF)</strong> — registered with EA / SEPA /
            NRW; receives WEEE for treatment / recycling.
          </li>
          <li>
            <strong>Hazardous overlap</strong> — mercury, lead, cadmium, PCBs, radioactive — both
            regimes apply where present.
          </li>
        </ul>
      </ConceptBlock>

      <Scenario
        title="Fluorescent tube and luminaire removal during a commercial refit"
        situation={
          <>
            A 1990s commercial office is being stripped out for refit. Your firm is the principal
            contractor for the electrical works, including removal of around 200 existing
            fluorescent fittings with T8 tubes, some emergency-lit, the older units with
            tar-bonded ballasts and some likely to contain PCBs in the capacitors. The customer
            says &quot;just chuck it all in the general skip — the demolition firm has a big one
            outside&quot;.
          </>
        }
        whatToDo={
          <>
            Stop. Fluorescent tubes contain small quantities of mercury and are classified as
            hazardous WEEE; older ballast capacitors may contain PCBs (polychlorinated biphenyls)
            which are Persistent Organic Pollutants requiring specific destruction routes. The
            &quot;general skip&quot; approach is a clear breach of EPA s.34, Hazardous Waste
            Regulations 2005, and WEEE Regulations 2013. Educate the customer: &quot;these tubes
            are hazardous waste under the WEEE Regs. We have to handle them separately.
            Here&apos;s our plan.&quot; Plan: (1) Segregate tubes from luminaires at point of
            removal. (2) Tubes transported intact (don&apos;t break) to a licensed WEEE facility;
            specific tube-storage tubes used for transport. (3) Older ballast capacitors examined
            for PCB labelling; suspect units quarantined; tested where uncertain. (4) Luminaire
            bodies (steel) recycled through metals waste stream. (5) HWCN raised for the tubes and
            any PCB-containing capacitors; carrier registration verified. (6) Records retained.
            (7) The customer signs off the hazardous-waste manifest. Cost passed through; worth
            the conversation up front. The cost is small relative to regulatory exposure.
          </>
        }
        whyItMatters={
          <>
            Skip contamination with hazardous waste is a routine enforcement action — EA
            spot-checks at skip yards find hazardous waste mixed with general regularly. The
            producer (your firm) is primarily liable; the demolition firm is also liable as
            carrier; the customer as commissioning party may have contributory liability. Fines
            under EPA / Hazardous Waste Regs / WEEE Regs run into thousands per offence; the
            regulator aggregates across the consignment. The L3 supervisor&apos;s two-minute
            customer conversation prevents a much worse conversation later.
          </>
        }
      />

      <SectionRule />
      <FAQ items={faqs} />
      <SectionRule />
      <KeyTakeaways
        points={[
          'Remember from L2 — pre-2000 = suspect asbestos. At L3 the depth is CAR 2012 specifics, survey types, licensed-vs-non-licensed boundary.',
          'CAR 2012 Reg 4 — duty to manage; asbestos register required for non-domestic premises and common parts of multi-occupied residential.',
          'Three asbestos types: chrysotile (white), amosite (brown), crocidolite (blue). All hazardous.',
          'Wide range of ACMs: textured coatings, AIB, cement products, lagging, sprayed coatings, floor tiles, gaskets, electrical components.',
          'Two survey types: Management (for register) and Refurbishment (pre-disturbance). Refurb survey before significant alteration.',
          'Licensed work (CAR 2012 Reg 8) requires HSE-licensed contractor. NNLW for some lower-risk; non-licensed for least-risk. Default = escalate.',
          "Discovery procedure: STOP → don't disturb → evacuate area → document → escalate to firm + dutyholder + PC.",
          'Disposal: double-bagged, HWCN, licensed carrier, permitted facility. Mixing with general waste = multiple offences.',
          'CAR 2012 Reg 7 hierarchy — prevent exposure first; reduce by non-RPE measures; RPE as last line; competent RPE selection with face-fit test.',
          'Control Limit 0.1 f/cm³ over 4 hours under CAR 2012; clearance air test &lt; 0.01 f/cm³ for reoccupation.',
          'COSHH 2002 is the umbrella for non-asbestos hazardous substances at work — same hierarchy, broader scope.',
          'EPA 1990 s.34 waste duty of care + Hazardous Waste Regs 2005 Reg 35 + WEEE Regs 2013 — full hazardous-waste regime applies.',
          'Approximately 5,000 UK deaths per year from asbestos-related diseases — single largest occupational killer; latency 20-50 years.',
        ]}
      />
      <Quiz title="Asbestos — knowledge check" questions={quizQuestions} />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Two related ideas in one Sub. WHEN you stop and escalate any H&S concern that's outside
        your competence — and the specific case study of suspected asbestos: where it lurks in
        pre-2000 UK buildings, what an electrician actually touches, and the exact procedure on
        the day.
      </p>

      <TLDR
        points={[
          'Stop-work authority is a personal duty, not a favour. HASAWA s.7 and MHSWR Reg 14 require you to refuse work beyond your competence and to inform someone in authority when you spot a hazard or a shortcoming.',
          'Asbestos was banned in the UK in 1999. Any building built or refurbished BEFORE 2000 may contain asbestos-containing materials (ACMs) — and an electrician touches those buildings every week.',
          "On suspicion: STOP, don't disturb, isolate the area, notify your supervisor, ask the dutyholder for the asbestos register. CAR 2012 Reg 4 makes that register a legal entitlement on non-domestic premises.",
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'State the actions to be taken in situations which exceed their level of responsibility for Health and Safety in the workplace.',
          'Explain the situations where asbestos may be encountered.',
          'Specify the procedures for dealing with the suspected presence of asbestos in the workplace.',
          'Identify the legal hooks behind stop-work authority — HASAWA s.7, MHSWR Reg 14, CAR 2012 Regs 4, 5 and 11 — and what each one obliges you personally to do.',
          'Recognise the typical pre-2000 locations where asbestos-containing materials (ACMs) appear in UK building fabric.',
          'Distinguish licensed from non-licensed asbestos work and know which work an electrician may NEVER do.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Why these three ACs sit together</ContentEyebrow>

      <ConceptBlock
        title="Stop-work authority and suspected asbestos are the same procedure"
        plainEnglish="These criteria are taught together because the response to a suspected ACM is exactly the same shape as the response to any other H&S issue beyond your competence: STOP, ISOLATE the area, NOTIFY someone in authority, DON'T MAKE IT WORSE while you wait."
        onSite="On site this is one habit. The moment something doesn't match the RAMS — strange material, undisclosed PV, a meter cupboard you weren't told about, a ceiling tile that looks AIB — your hands come off the kit, the door comes shut, the supervisor gets a phone call. Same drill, different trigger."
      >
        <p>
          This qualification puts asbestos alongside the other hazardous materials
          because it's the most common hazard you'll meet that's genuinely beyond your competence
          as an apprentice. You can't sample it, you can't survey it, and you almost certainly
          can't lawfully work on it. Everything you do with it is done in the language of
          escalation.
        </p>
        <p>
          The broader principle sits with the wider hazard outcome. Asbestos is one trigger; live LV
          outside your competence is another; an unsafe access platform is another; a roofer above
          you with no edge protection is another. The action you take is the same shape every
          time.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Stop-work authority — the legal hooks</ContentEyebrow>

      <ConceptBlock
        title="Three regulations that all point at the same duty on YOU"
        plainEnglish="HASAWA s.7 says take reasonable care and co-operate with the employer's safety arrangements. MHSWR Reg 14 spells that out — you must inform the employer of any serious and immediate danger AND any shortcoming in the safety arrangements. CAR 2012 Reg 5 specifically requires an assessment before any work that may disturb asbestos."
        onSite="In practice this is one phone call. 'I've stopped work because [reason]. I'm not in a position to deal with it. What do you want me to do?' The act of making the call is what discharges your duty under all three regulations at once."
      >
        <p>
          The chain of authority isn't optional. It's how the law expects safety to flow up an
          organisation. Sit on a hazard hoping it goes away and the law treats your silence as
          part of the breach. Pick up the phone and the law treats you as having done what was
          required.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="Health and Safety at Work etc Act 1974 — s.7"
        clause={
          <>
            &quot;It shall be the duty of every employee while at work — (a) to take reasonable
            care for the health and safety of himself and of other persons who may be affected by
            his acts or omissions at work; and (b) as regards any duty or requirement imposed on
            his employer or any other person by or under any of the relevant statutory provisions,
            to co-operate with him so far as is necessary to enable that duty or requirement to be
            performed or complied with.&quot;
          </>
        }
        meaning={
          <>
            Two limbs that bite together for stop-work. Limb (a) — your acts AND omissions count,
            so saying nothing while a hazard sits in front of you is itself a breach. Limb (b) —
            co-operate with the employer's safety arrangements, including the reporting routes
            they've put in place. Refusing to escalate up is a refusal to co-operate.
          </>
        }
        cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.7 — verbatim from legislation.gov.uk."
      />

      <RegsCallout
        source="Management of Health and Safety at Work Regulations 1999 — Regulation 14"
        clause={
          <>
            &quot;Every employee shall use any machinery, equipment, dangerous substance,
            transport equipment, means of production or safety device provided to him by his
            employer in accordance both with any training in the use of the equipment concerned
            which has been received by him and the instructions respecting that use which have
            been provided to him by the said employer in compliance with the requirements and
            prohibitions imposed upon that employer by or under the relevant statutory provisions.
            (2) Every employee shall inform his employer or any other employee of that employer
            with specific responsibility for the health and safety of his fellow employees — (a)
            of any work situation which a person with the first-mentioned employee's training and
            instruction would reasonably consider represented a serious and immediate danger to
            health and safety; and (b) of any matter which a person with the first-mentioned
            employee's training and instruction would reasonably consider represented a
            shortcoming in the employer's protection arrangements for health and safety.&quot;
          </>
        }
        meaning={
          <>
            Reg 14(1) — only use the kit you've been trained on. Reg 14(2) — inform the employer
            of any serious and immediate danger AND any shortcoming in the safety arrangements.
            The legal threshold is what a reasonable person with YOUR training would judge to be
            dangerous. As an apprentice that bar is sensibly low — if you're unsure, you escalate.
            The Reg explicitly protects that judgement.
          </>
        }
        cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 14 — verbatim from legislation.gov.uk."
      />

      <ConceptBlock
        title="The escalation chain — five steps in order"
        onSite="Memorise the order. Skip to the wrong step and you either look reckless (going straight to HSE without telling your firm) or look complicit (drop the issue when the supervisor pushes back). Both end badly."
      >
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Stop work and isolate the area.</strong> Hands off the kit. Door shut. People
            out of the immediate area if there's any release risk. If you've got the lock-off kit
            on you, lock the source out so nobody else can walk in and re-energise.
          </li>
          <li>
            <strong>Notify your supervisor.</strong> Phone call beats a text — gets a two-way
            conversation, gets a decision, and gives you the chance to record it. Be factual: what
            you've found, why you've stopped, what you need from them.
          </li>
          <li>
            <strong>If the supervisor can't or won't act — escalate above them.</strong> Your own
            employer's office contact / contracts manager, the principal contractor's site
            manager, the firm's safety advisor. Document the conversation as you go (date, name,
            what was said).
          </li>
          <li>
            <strong>If the firm still won't act — go external.</strong> Your scheme provider's
            helpline (NICEIC, NAPIT etc.) is usually first. Your union if you're in one. The HSE
            has an online concerns reporting form for genuine breaches that the employer won't
            fix.
          </li>
          <li>
            <strong>In every case — record what you did.</strong> A note in your phone with date,
            time, names and what was said is enough. That note is what proves later that YOU
            discharged your s.7 / Reg 14 duty even if everyone above you was negligent.
          </li>
        </ol>
      </ConceptBlock>

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Asbestos — the short history every electrician needs</ContentEyebrow>

      <ConceptBlock
        title="Three fibres, three banning dates, one underlying problem"
        plainEnglish="Asbestos is a naturally-occurring silicate fibre that was used in UK building products for most of the 20th century because it's cheap, fire-resistant, durable and a good electrical insulator. Inhaled, the fibres lodge in the lung lining and cause incurable disease decades later — mesothelioma, asbestosis, lung cancer."
        onSite="The reason it's still your problem in 2026 is that the buildings are still standing. Every pre-2000 commercial unit, every 1970s school, every 1960s office block, every old council estate — all of them potentially contain asbestos in their fabric. The kill rate now (around 5,000 UK deaths per year, mostly tradespeople) is from exposure 30+ years ago. What you do today decides the kill rate in 2055."
      >
        <p>The three asbestos types you might encounter:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Crocidolite (blue)</strong> — the most dangerous fibre, banned in 1985.
            Sometimes found in sprayed coatings and pipe lagging in industrial buildings from the
            1950s–70s. Visual cue: blue-grey fibrous appearance, often degraded.
          </li>
          <li>
            <strong>Amosite (brown)</strong> — banned in 1985 alongside crocidolite. The workhorse
            for AIB (Asbestos Insulating Board) ceiling tiles, partition boards and pipe
            insulation. Classic location: 1960s–80s commercial suspended ceilings.
          </li>
          <li>
            <strong>Chrysotile (white)</strong> — by far the most heavily used in the UK. Banned
            in 1999 (the final one). Found in cement sheets, textured coatings (Artex), gaskets,
            vinyl floor tiles, brake linings, and some electrical insulation.
          </li>
        </ul>
        <p>
          Visual identification is unreliable — fibres can look identical to the eye and they're
          usually bound into a matrix (cement, board, coating) that disguises them further. The
          only reliable identification is laboratory analysis. As an apprentice you don't sample;
          you escalate.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Where asbestos lives in a building an electrician walks into"
        plainEnglish="If the building was up before 2000, assume ACMs are present somewhere until the asbestos register tells you otherwise."
        onSite="The places that catch electricians out are the places we go that nobody else goes — ceiling voids, behind old consumer units, under floor boards, in plant rooms, behind soffits, in the bottom of switchgear cubicles. The dust that's been undisturbed for forty years is the dust your drill kicks into the air."
      >
        <p>The classic pre-2000 ACM locations an electrician actually touches:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>AIB ceiling tiles and partition boards</strong> — suspended ceilings in
            1960s–80s offices, schools, hospitals, council buildings. You drill through these to
            fix luminaires, fire-alarm sounders, smoke detectors, emergency lighting. Working on
            AIB is LICENSED work.
          </li>
          <li>
            <strong>Pipe lagging</strong> — wrapped or moulded insulation on old central-heating
            and steam pipework. Common in plant rooms, boiler houses, under stairwells, in service
            ducts. Disturbing lagging is LICENSED work.
          </li>
          <li>
            <strong>Sprayed coatings</strong> — &quot;limpet&quot; sprayed asbestos on the
            underside of metal-deck ceilings, structural steelwork, the underside of stairs. Most
            dangerous form to disturb. LICENSED work.
          </li>
          <li>
            <strong>Textured coatings</strong> — Artex and similar decorative ceilings in pre-2000
            housing. Usually chrysotile. Drilling, sanding or cutting releases fibres.
          </li>
          <li>
            <strong>Asbestos cement</strong> — flue pipes from old boilers, soffit boards on
            pre-2000 houses, garage roofs, water tanks in lofts. Lower fibre release than friable
            forms but still controlled work.
          </li>
          <li>
            <strong>Vinyl and thermoplastic floor tiles</strong> — the tile itself often contains
            chrysotile, the black bitumen adhesive under it almost always does. Common in
            commercial corridors.
          </li>
          <li>
            <strong>Gaskets and seals</strong> — in older switchgear, motor flanges and pump
            glands. Usually chrysotile woven or compressed.
          </li>
          <li>
            <strong>Electrical insulation backing boards</strong> — behind some old fuseboards and
            switch panels, especially in industrial and commercial pre-1990 installations. The
            board you've spent twenty minutes trying to unscrew may be the ACM.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The duty to manage — CAR 2012 Reg 4</ContentEyebrow>

      <ConceptBlock
        title="Every non-domestic building has a dutyholder. They have to produce the register on request."
        plainEnglish="The Control of Asbestos Regulations 2012 puts a duty to manage asbestos on whoever is responsible for the maintenance and repair of any non-domestic premises. They have to find out (or assume) where ACMs are, record them in a register, assess their condition, and share that information with anyone whose work could disturb them — including you."
        onSite="At day-one site induction on any commercial / industrial / public-sector job, ASK to see the asbestos register. If there isn't one, that's a CAR 2012 Reg 4 breach by the dutyholder — and your cue to stop and escalate before any drilling, lifting or chasing happens."
      >
        <p>
          The register tells you three things: WHERE ACMs are presumed or confirmed to be, WHAT
          condition they're in, and WHAT controls are in place. Most modern registers come with a
          marked-up plan showing the exact locations colour-coded by ACM type. If you're working
          in an area marked &quot;AIB above ceiling — do not disturb without licensed contractor
          present&quot;, your job has just changed shape.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="Control of Asbestos Regulations 2012 — Regulation 4 (Duty to manage asbestos in non-domestic premises)"
        clause={
          <>
            &quot;(1) This regulation applies to non-domestic premises. (2) The dutyholder shall —
            (a) take such steps as are reasonable in the circumstances to determine whether
            asbestos is or is liable to be present in the premises; (b) take account of building
            plans or other relevant information and the age of the premises; (c) inspect those
            parts of the premises which are reasonably accessible. (3) Where, after such
            inspection, a dutyholder suspects that asbestos is or may be present in any part of
            the premises, the dutyholder shall presume that the asbestos is present until there is
            evidence to the contrary. (4) The dutyholder shall ensure that — (a) a determination
            of the risk from that asbestos is made; (b) a written plan identifying those parts of
            the premises concerned is prepared; and (c) the measures which are to be taken for
            managing the risk are specified in the written plan.&quot;
          </>
        }
        meaning={
          <>
            The dutyholder has to ASSUME asbestos is present until they prove it isn't. They have
            to write down where it is and how they're managing it. And they have to make that
            information available to anyone whose work could disturb it. As the electrician
            walking onto site, that information is your legal entitlement — not a favour.
          </>
        }
        cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 4 — verbatim from legislation.gov.uk."
      />

      <RegsCallout
        source="Control of Asbestos Regulations 2012 — Regulation 5 (Identification of the presence of asbestos)"
        clause={
          <>
            &quot;An employer must not undertake work in demolition, maintenance, or any other
            work which exposes or is liable to expose employees of that employer to asbestos in
            respect of any premises unless either — (a) the employer has carried out a suitable
            and sufficient assessment as to whether asbestos, what type of asbestos, contained in
            what material and in what condition is present or is liable to be present in those
            premises; or (b) if there is doubt as to whether asbestos is present in those premises
            the employer — (i) assumes that asbestos is present, and that it is not chrysotile
            alone, and (ii) observes the applicable provisions of these Regulations.&quot;
          </>
        }
        meaning={
          <>
            Reg 5 turns the dutyholder's register into your work-planning document. No assessment,
            no work — full stop. If there's any doubt, the regulation requires you to ASSUME the
            worst (asbestos present, not just chrysotile) and apply the full CAR 2012 controls.
            That's the legal basis for the &quot;treat as suspect until proven otherwise&quot;
            rule on every pre-2000 building.
          </>
        }
        cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 5 — verbatim from legislation.gov.uk."
      />

      <RegsCallout
        source="Control of Asbestos Regulations 2012 — Regulation 11 (Prevention or reduction of exposure to asbestos)"
        clause={
          <>
            &quot;(1) Every employer must — (a) prevent the exposure to asbestos of any employee
            employed by that employer so far as is reasonably practicable; (b) where it is not
            reasonably practicable to prevent such exposure — (i) take the measures necessary to
            reduce the exposure of any employee employed by that employer to asbestos to as low a
            level as is reasonably practicable without resorting to the use of respiratory
            protective equipment, and (ii) ensure that the number of employees who are exposed to
            asbestos at any one time is as low as is reasonably practicable.&quot;
          </>
        }
        meaning={
          <>
            The hierarchy is the same one you met for risk control in §3 — eliminate first (do the
            work somewhere else, leave the ACM in place), then engineer (enclose, isolate the
            area, use wet stripping, controlled removal), then administer (limit who's in the
            area), then RPE as the last layer. RPE is the LAST control, not the first. The RAMS
            for any work near suspected ACMs has to follow this hierarchy explicitly.
          </>
        }
        cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 11 — paraphrased where indicated and verbatim where quoted, from legislation.gov.uk."
      />

      <SectionRule />

      <ContentEyebrow>What you ACTUALLY do on suspicion</ContentEyebrow>

      <ConceptBlock
        title="The procedure on the day — six steps"
        plainEnglish="Memorise these. They're the same six steps whether the ACM is a ceiling tile, pipe lagging, a textured coating or a gasket."
        onSite="The wrong move is almost always 'just have a quick look first'. Inspection IS disturbance. The right move is 'hands off, area sealed, supervisor on the phone, register requested'."
      >
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>STOP work immediately.</strong> Drill out, screwdriver down, hands off the
            material. If you were drilling and you've already cut into something suspect, don't
            pull the bit out — leave it where it is for now to avoid kicking the dust loose.
          </li>
          <li>
            <strong>ISOLATE the area.</strong> Get yourself and anyone else out of the immediate
            space. Close the door. If there's no door, tape off the area or put up warning signs.
            Open windows AWAY from people if you can do so without disturbing the material —
            fibres are most dangerous in still air where they stay airborne.
          </li>
          <li>
            <strong>DO NOT TOUCH, MOVE OR CLEAN.</strong> Don't sweep up the dust (sweeping
            releases fibres). Don't hoover (a domestic vacuum disperses them). Don't bag the
            offcut. Don't take a sample. Leave everything exactly where it is until a competent
            person decides what to do.
          </li>
          <li>
            <strong>NOTIFY your supervisor.</strong> Phone, not text. State what you found, where
            you found it, what you've already done (stopped, isolated, sealed). Ask for
            instructions and confirm them in writing afterwards.
          </li>
          <li>
            <strong>REQUEST the asbestos register from the dutyholder.</strong> On non-domestic
            sites this is a legal entitlement under CAR 2012 Reg 4. The register will tell you
            whether the material is known ACM, presumed ACM, or surveyed clean. If there's no
            register, the dutyholder has a CAR Reg 4 / 5 breach and the work cannot continue until
            the survey is done.
          </li>
          <li>
            <strong>RECORD what you did.</strong> Note in your phone (date, time, what you found,
            who you called, what they said). That note discharges your s.7 / Reg 14 duty even if
            the dutyholder or your supervisor later try to play the incident down.
          </li>
        </ol>
      </ConceptBlock>

      <ConceptBlock
        title="HSE Asbestos Essentials — what an electrician can and cannot do"
        plainEnglish="HSE publishes a series of free task sheets called 'Asbestos Essentials'. Sheet a0 is the introduction — it explains which work needs an asbestos licence (most of it) and which work a properly trained tradesperson can do non-licensed. Sheets a1 through a40 cover specific tasks in detail."
        onSite="The simple rule: if you ever find yourself reading an Asbestos Essentials sheet and thinking 'I could do that', stop. The sheets exist for trained, equipped operatives at companies that are set up to do non-licensed asbestos work. As an apprentice you are NEVER the right person — your job is to recognise, stop and escalate."
      >
        <p>
          The split between licensed and non-licensed work matters because it tells you what's
          even available to your firm. Licensed work — work on AIB, sprayed coatings, pipe lagging
          — must be done by an HSE-licensed asbestos contractor, full stop. No general electrical
          contractor can lawfully do it, regardless of training.
        </p>
        <p>
          Non-licensed work covers lower-risk ACMs (asbestos cement, certain floor tiles, gaskets)
          and only when the firm has trained operatives, the right RPE, the right method statement
          and the right disposal route. Notifiable non-licensed work (NNLW) sits in between —
          non-licensed but high enough risk that it must be notified to HSE and recorded in a
          separate register. None of this is apprentice work.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="'I'll just have a quick look first'"
        whatHappens={
          <>
            Apprentice spots a suspect ceiling tile while running a new fire-alarm sounder cable.
            Lifts the corner of one tile to &quot;check the back to see if it's AIB&quot;. The
            tile crumbles slightly at the edge, releases a small puff of dust, drops back into
            place. Apprentice carries on. Three days later, the dutyholder produces the register —
            that section IS marked AIB. A licensed contractor has to come in, the room has to be
            cleared, the ceiling void has to be air-tested, and the apprentice has to be put on
            the medical surveillance register. All from one &quot;quick look&quot;.
          </>
        }
        doInstead={
          <>
            Inspection IS disturbance. The whole point of the asbestos register is that the
            inspection (by a competent surveyor with proper kit) has already happened. If there's
            no register or it doesn't cover the area, the answer isn't to do an informal one
            yourself — the answer is to STOP and escalate. CAR 2012 Reg 5 is explicit on this and
            it doesn't have a &quot;but only a little bit&quot; exemption.
          </>
        }
      />

      <CommonMistake
        title="Thinking only ceiling tiles are asbestos"
        whatHappens={
          <>
            Apprentice has been told about AIB ceiling tiles in their CSCS test prep, so they
            assume that's the only place to worry about. They go into a 1960s school plant room,
            see the lagged pipework, and crack on running a new supply alongside it — drilling
            brackets into the wall right next to the lagging, knocking off small pieces of
            insulation as they work. The pipe lagging turns out to be amosite. Same disturbance,
            same exposure, much higher fibre release than from the AIB tiles they were trained to
            spot.
          </>
        }
        doInstead={
          <>
            Read the full list of typical ACM locations and treat the whole pre-2000 building as a
            potential ACM source. Pipe lagging, sprayed coatings, textured ceilings, vinyl floor
            tiles, asbestos cement flues, gaskets, electrical insulation backing boards — any of
            them. The rule isn't &quot;is it a ceiling tile?&quot;, it's &quot;do I have a clean
            asbestos register for this area?&quot;. If no, stop.
          </>
        }
      />

      <Scenario
        title="Drilling for a new fire-alarm sounder in a 1980s school"
        situation={
          <>
            You&apos;re second-year, on a refurb at a 1980s comprehensive over half-term. The job
            is straightforward — install eight new addressable fire-alarm sounders in classroom
            corridors, replace existing devices that don&apos;t meet the new standard. The
            supervisor has gone to the wholesaler. You set up under the first ceiling tile, drill
            point marked, hammer drill on. As you start the hole, the tile crumbles slightly under
            the pressure and you see a fibrous edge inside the hole. The tile looks like AIB.
          </>
        }
        whatToDo={
          <>
            Stop the drill. Pull it back gently, but don&apos;t pull the bit out immediately if
            dust is still moving — let it settle for a few seconds. Step away from the area, get
            out of the corridor, close the door behind you. Ring the supervisor: &quot;I&apos;ve
            stopped at the first sounder location — the ceiling tile looks AIB and there&apos;s
            some fibre release. I need the asbestos register before going any further.&quot; Find
            the dutyholder on-site contact (school caretaker, site manager, business manager). Ask
            for the register. If the area is marked AIB, the work cannot continue without a
            licensed contractor either removing the tiles or working under controlled conditions.
            If the register is missing or out of date, the work stops until it&apos;s sorted. Note
            the timeline in your phone.
          </>
        }
        whyItMatters={
          <>
            Schools built between the 1950s and the early 1980s are one of the highest
            AIB-prevalence building types in the UK. The school&apos;s dutyholder is legally
            required to have a current asbestos register and a management plan that anticipates
            exactly this kind of refurb work. By stopping early you turn a potential CAR 2012
            incident into a planning exercise — and you protect every kid who walks back into that
            corridor on Monday morning.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Stop-work authority is a legal duty on YOU under HASAWA s.7 and MHSWR Reg 14 — not a favour to your employer. Silence in the face of a hazard is itself a breach.',
          'The escalation chain is: stop and isolate → notify supervisor → escalate above them if needed → external (scheme, union, HSE) as last resort → record everything in writing.',
          'Asbestos was banned in the UK in 1999. Any building constructed or refurbished BEFORE 2000 may contain ACMs — and an electrician walks into pre-2000 buildings every week.',
          'ACMs in pre-2000 buildings include AIB ceiling tiles, pipe lagging, sprayed coatings, textured coatings (Artex), asbestos cement, vinyl floor tiles, gaskets and electrical insulation backing boards. Visual identification is unreliable — only lab analysis is definitive.',
          'Non-domestic premises must have an asbestos register under CAR 2012 Reg 4. As the contractor you have a legal entitlement to see it BEFORE work starts. No register means no work until the survey is done.',
          'On suspicion: STOP, ISOLATE, do NOT touch / move / clean / sample, NOTIFY supervisor, REQUEST the register from the dutyholder, RECORD what you did. Inspection IS disturbance.',
          'Work on AIB, sprayed coatings and pipe lagging is LICENSED work — it can ONLY be done by an HSE-licensed asbestos contractor. As an apprentice you are NEVER the right person to do asbestos work of any kind.',
          "Domestic jobs aren't covered by CAR Reg 4 (no statutory register requirement) but the rest of CAR 2012 still applies and your s.7 / Reg 14 duties don't change with the building type. Same procedure: stop, don't disturb, escalate, recommend a survey.",
        ]}
      />

      <Quiz
        title="Asbestos awareness and stop-work authority — knowledge check"
        questions={quizQuestions2}
      />

      {/* ── Prev / next nav ─────────────────────────────────── */}
    </div>
  );
}
