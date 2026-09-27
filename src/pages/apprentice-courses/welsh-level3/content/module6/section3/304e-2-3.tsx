/**
 * Ported from the English course, combining:
 *   level2/module3/section2/Sub5.tsx
 *   level2/module4/section1/Sub3.tsx
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

/* ── Inline check questions ───────────────────────────────────────── */

const checks = [
  {
    id: 'm3-s2-sub5-reading-order',
    question:
      'You open a fresh drawing pack for a job you have never seen before. Which sheet do you read FIRST?',
    options: [
      'The cable schedule — so you can start ordering materials straight away',
      'The front sheet — drawing register, revision history, scale legend, title block',
      'The wiring diagram for the busiest circuit — it carries the most detail',
      'The schedule of accessories — so you know exactly what to buy',
    ],
    correctIndex: 1,
    explanation:
      'Front sheet first, every time. It tells you the project name, the revision you are looking at, what every sheet in the pack is for, the scale used and any general notes. Skip it and you risk working from a superseded revision or the wrong scale — both classic apprentice traps.',
  },
  {
    id: 'm3-s2-sub5-scale-derive',
    question:
      'On the 1:50 ground-floor plan you measure the run from the consumer unit to the kitchen ring "first socket" with a scale rule on the 1:50 face. The rule reads 4.6 m direct. The actual cable will follow the skirting and drop into a back-box. What do you write on the take-off?',
    options: [
      'Exactly 4.6 m — the scale rule reading on the 1:50 face is already the final cable length',
      '230 m — multiply the 4.6 m reading by the 1:50 scale denominator to get the true run',
      'Around 5.5 m — add an allowance for skirting follow, the back-box drop and slack at each end',
      '2.3 m — halve the 4.6 m reading because the rule is set to the 1:50 face',
    ],
    correctIndex: 2,
    explanation:
      'The scale rule on the 1:50 face reads real metres directly — so 4.6 m is the straight-line wall distance. Real cable follows the route (skirting, vertical drop into the box, slack at terminations) so add a sensible margin. About 10-20% on a domestic radial run is the convention. Multiplying by 50 again is the classic double-conversion mistake — the rule has already done the maths.',
  },
  {
    id: 'm3-s2-sub5-rfi-trigger',
    question:
      'The floor plan shows six sockets along the kitchen wall. The schedule of accessories lists eight sockets for the same kitchen, one of them an FCU for the boiler. What do you do?',
    options: [
      'Fit six sockets — the layout drawing always takes priority over a schedule',
      'Fit eight sockets — the schedule of accessories is the more detailed document',
      'Stop, raise an RFI in writing to the designer, work with whatever they confirm in writing',
      'Fit seven — split the difference between the two documents',
    ],
    correctIndex: 2,
    explanation:
      'Discrepancies between two designer-issued documents are an RFI (Request For Information), every time. You do not pick the one you prefer and carry on — you raise it in writing, wait for the written reply, and that reply becomes part of the project record. The cost of an extra back-box on day one is nothing compared to the cost of stripping out and rewiring at handover because you guessed wrong.',
  },
];

/* ── Quiz questions ───────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      'You have been handed a drawing pack labelled "Rev C" and another print of the same drawing labelled "Rev D" sat on the foreman’s desk. Which one do you work from?',
    options: [
      'Rev C — older drawings have been checked more',
      'Rev D — the higher revision letter is the most recent issue',
      'Whichever is on the cleaner paper',
      'Always the lowest revision until told otherwise',
    ],
    correctAnswer: 1,
    explanation:
      'Revisions go up alphabetically (or numerically). Rev D supersedes Rev C. Always work from the latest revision and physically destroy or clearly mark superseded copies "VOID" so nobody else picks them up by mistake. Working from a superseded drawing is one of the most common causes of expensive rework on a fit-out.',
  },
  {
    id: 2,
    question:
      'A floor plan shows a circle with a horizontal line through it and "FCU 13A" written next to it, positioned on the kitchen wall above worktop height. What is it and what does it feed?',
    options: [
      'A flush cooker unit, 13 A — the dedicated supply point for a built-in electric hob',
      'A floor cable union, 13 A — an in-line junction box set down into the floor screed',
      'A Fused Connection Unit, 13 A fuse — feeding a fixed appliance such as a boiler or extractor',
      'A final circuit unit, 13 A — the last socket position on the end of a radial circuit',
    ],
    correctAnswer: 2,
    explanation:
      'FCU = Fused Connection Unit, holding a BS 1362 fuse (commonly 13 A, sometimes 3 A or 5 A). Switched and unswitched variants exist. It spurs off a ring final or radial to feed a fixed appliance and gives that appliance its own local fuse and (if switched) local isolation point.',
  },
  {
    id: 3,
    question:
      'On the 1:100 first-floor plan you measure a 38 mm distance from the landing light position to the airing-cupboard wall. Real distance?',
    options: ['38 m', '0.38 m', '380 mm', '3.8 m'],
    correctAnswer: 3,
    explanation:
      'At 1:100, paper × 100 = real. 38 mm × 100 = 3800 mm = 3.8 m. The mental shortcut for 1:100 is "1 cm paper = 1 m real" — 3.8 cm on paper, 3.8 m real, same answer.',
  },
  {
    id: 4,
    question:
      'The cable schedule says "Cct 4 — 2.5 mm² T&E, 32 A Type B RCBO, 30 mA". The board layout drawing shows Cct 4 protected by a "B20" device. Which do you trust?',
    options: [
      'Neither — raise an RFI, two designer documents disagreeing is an unresolved item',
      'The cable schedule — schedules always override board layout drawings',
      'The board layout — what is drawn at the board is what gets installed',
      'Whichever device the merchant has already delivered to site',
    ],
    correctAnswer: 0,
    explanation:
      'Two designer-issued documents disagreeing is an RFI every time. You do not pick. The mismatch could be a typo on one document — but it could also signal the designer changed their mind and only updated one of the two. Get it confirmed in writing before anyone wires anything.',
  },
  {
    id: 5,
    question:
      'You are about to drill into a stud wall to fix a back-box. The original layout drawing was issued three years ago, before the kitchen was extended. There is no as-built drawing for the extension. What is the safe course of action?',
    options: [
      'Drill anyway — the original drawing shows the wall as empty, so the area must be clear',
      'Stop and check — get an as-built or sweep with a cable/pipe detector before drilling',
      'Drill a small pilot hole first to feel for anything before committing to the fixing',
      'Assume the extension was wired to the same layout and drill in the matching positions',
    ],
    correctAnswer: 1,
    explanation:
      'Working from out-of-date drawings is one of the classic causes of unexpected contact with live cables. The drawing showing the wall as empty is from before the extension was wired. Stop, ask, and check with a cable/pipe detector before any drilling. The minute lost is nothing compared to a shock from an undocumented sub-main.',
  },
  {
    id: 6,
    question:
      'The drawing pack symbol legend is incomplete — there is a symbol on the kitchen layout that is not in the legend, and it does not match anything in IEC 60617 / IEC 60617. What does Reg 514.9.2 (A4:2026) say about this?',
    options: [
      'Non-standard symbols are acceptable on site provided a legend entry is added to the pack later',
      'The installer may define any missing symbol to mean whatever best fits the rest of the layout',
      'Diagrams and notices shall comply with the applicable standards — a non-standard symbol is a non-conformance for the designer to fix',
      'The regulation applies only to commercial installation drawings, never to domestic ones',
    ],
    correctAnswer: 2,
    explanation:
      '514.9.2 (introduced in A4:2026) requires diagrams, charts and notices to comply with the applicable standards — and IEC 60617 is the applicable standard for graphical symbols on UK electrical drawings. A non-standard symbol on an installation drawing is a regulation non-conformance, and the right response is an RFI to the designer.',
  },
  {
    id: 7,
    question:
      'The schedule of accessories specifies "MK Logic Plus white moulded, switched, 2-gang" for every socket. The merchant has only delivered Crabtree equivalents. What do you do?',
    options: [
      'Fit the Crabtree — any equivalent-quality accessory automatically satisfies the spec',
      'Fit the Crabtree, then note the substitution on the certificate once the job is done',
      'Return everything to the merchant and refuse to start until the exact MK items arrive',
      'Stop and raise an RFI in writing — install nothing until the specifier confirms the swap',
    ],
    correctAnswer: 3,
    explanation:
      'The spec is contractually binding. "Equivalent" is not a decision you take on site — that decision belongs to the designer, the specifier or the client. Raise an RFI, get a written variation, then fit. Verbal "yeah it is fine" from a foreman is worth nothing if the snag list rejects the substitution six weeks later.',
  },
  {
    id: 8,
    question:
      'You have walked the install with the drawing pack open, ticked off every accessory location, cross-checked the schedule of accessories against the layout, and checked the cable schedule against the board configuration. The pack is consistent. What is the LAST thing to check before you start lifting tools?',
    options: [
      "Confirm safe isolation of the supply, check the RAMS for site-specific hazards, and agree the day's priorities with your supervisor",
      'Re-measure every cable run a second time over to be completely certain the take-off is right',
      'Order all the materials for the entire plot up front before lifting a single tool on site',
      'Photograph each drawing sheet so you keep a digital backup of the whole pack on your phone',
    ],
    correctAnswer: 0,
    explanation:
      "The drawing pack tells you WHAT goes where; the RAMS tells you HOW to do it safely on this specific site, and safe isolation is non-negotiable before any work on an existing supply. Confirming the day's priorities with your supervisor stops you starting on something the gang has already moved past. Drawing prep is one job; site prep is the next.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: 'What is actually IN a typical domestic drawing pack?',
    answer:
      'A standard pack for a 3-bed semi typically has: front sheet (drawing register + revision history + general notes), ground-floor layout (1:50), first-floor layout (1:50), single-line schematic of the consumer unit, schedule of circuits (every circuit, csa, OCPD rating, RCD type), schedule of accessories (every socket, switch, FCU, light fitting), cable schedule (run lengths and routing), symbol legend, and any manufacturer data sheets for non-standard equipment. Eight to twelve sheets is normal.',
  },
  {
    question: 'How do I know which revision of the drawing I should be working from?',
    answer:
      'The front sheet has a revision history table. The latest entry is the current revision. Every individual drawing also carries a revision letter or number in its title block. If you find two prints of the same drawing with different revisions, the higher revision wins and the older one should be marked "VOID" or destroyed. If you are unsure, ask the supervisor before you cut anything — never assume the print on the desk is the latest.',
  },
  {
    question: 'What is the difference between the schedule of accessories and the cable schedule?',
    answer:
      'Schedule of accessories lists every visible electrical fitting — sockets, switches, FCUs, light fittings, fans, smokes, doorbell. It tells you what to buy and where each goes. Cable schedule lists every cable run — circuit number, csa, type (T&E, SY, SWA), length, OCPD rating, RCD characteristics. It tells you what to wire with. They cross-reference: a socket on the schedule of accessories is fed by a cable on the cable schedule.',
  },
  {
    question: 'What if a manufacturer data sheet is missing from the pack?',
    answer:
      "Raise an RFI. Reg 526.1 makes following the manufacturer's instructions a regulation requirement (terminations, torques, mounting orientation, terminal capacities). Without the data sheet you cannot meet that requirement reliably. The designer or main contractor should issue the missing sheet — do not start commissioning the device without it.",
  },
  {
    question: 'I see "DO NOT SCALE FROM DRAWING" in the title block. Now what?',
    answer:
      'It means the drawing has probably been resized in printing (PDF "fit-to-page" or photocopy reduction) so scaling off it gives wrong answers. Use the named dimensions only — the small numbered measurement lines with arrows. Named dimensions are text and survive resizing. If a wall is labelled "4250" on the drawing and your scale rule reads 60 mm on a supposedly 1:100 print, trust the 4250.',
  },
  {
    question: 'Where do as-builts come into the pack?',
    answer:
      'They do not exist at the start of the job — that is the point. The drawing pack you start with is the "as-designed". As work progresses, every site variation (cable rerouted around a beam, socket moved 200 mm, additional FCU added) gets red-lined onto the working drawings. At handover, the red-lines are formally redrawn into clean as-builts and added to the O&M pack. Five years later when somebody adds a circuit, the as-built is what they will be reading.',
  },
];

/* ── Inline checks2 (wired into streaks/stats) ─────────────────────── */

const checks2 = [
  {
    id: 'mod4-s1-sub3-pat-myth',
    question:
      "Your colleague says 'this drill was PAT'd in January, so it's fine all year — no need to check it'. Is he right?",
    options: [
      'Yes — a valid PAT label is the legal proof a tool is safe to use, certifying it for the whole period until the next test, so a pre-use check before each job is unnecessary duplication.',
      'No — PAT is only one layer; PUWER Reg 5 also requires pre-use visual checks2 every shift and periodic competent-person inspections between PATs.',
      'Yes, but only because it is a cordless tool — battery tools are exempt from PAT, so the January test was a courtesy and the tool can run all year without further inspection.',
      'Partly — the tool is fine for low-risk work but a fresh PAT is legally required before any construction-site work, so it must be re-tested rather than relying on a daily visual.',
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
      "Wrap the split tightly with self-amalgamating tape, restoring the sheath's insulation and mechanical protection, then carry on — the cores aren't exposed so the repair holds for the rest of the shift.",
      'Gently open the split to inspect the cores; if the inner insulation looks intact, keep using the tool because the outer sheath is only a mechanical cover, not part of the electrical protection.',
      "Take the tool out of service — tag it 'do not use', set it aside and report it to the supervisor; tape is never a repair on a supply lead, so a competent person must replace the lead or condemn it.",
      'Finish the immediate task keeping the damaged section away from water and metalwork, then hand the tool in at the end of the day — a 20 mm split midway along the lead is minor enough for one more job.',
    ],
    correctIndex: 2,
    explanation:
      "Damaged supply cable on any portable tool = take out of service. PUWER Reg 5 (maintenance) and Reg 4 (suitability) both bite — a tool with a damaged lead is no longer in efficient working order and is no longer suitable for use. Apply a quarantine tag, put the tool in the firm's quarantine area, fill in the defect log, and tell the supervisor. The fix is a new lead fitted by a competent person — not insulating tape, never insulating tape.",
  },
  {
    id: 'mod4-s1-sub3-torque-cal',
    question:
      "Your firm's preset Wera 3.5 Nm torque screwdriver lives in the cab of the van and gets used every day for distribution-board terminations. The supervisor mentions it's 'due for calibration'. Why does that matter for an electrical install?",
    options: [
      'The click spring drifts with use and temperature, so the tool over- or under-torques every terminal — damaging conductors or leaving high-resistance joints that fail on test.',
      "Calibration is purely an insurance formality — the click mechanism never drifts, but firm policy needs a certificate on file so the tool can be shown as 'checked' at audit.",
      'Calibration re-sharpens the internal clutch so the bit keeps gripping; without it the tip cams out of distribution-board terminals, which is the real reason it matters on an install.',
      "Calibration resets the preset value each year to the latest BS 7671 torque requirements, which change with every amendment, so an un-calibrated tool applies last year's obsolete torque.",
    ],
    correctIndex: 0,
    explanation:
      "Torque drivers and torque wrenches are precision instruments and they drift with use. Annual calibration with a UKAS-traceable certificate is the standard requirement (every 5,000 cycles or 12 months, whichever first, per most manufacturers). A drifted torque driver causes either over-torqued and damaged terminals or under-torqued and high-resistance terminals — both fail BS 7671 526.1, both cause real installation problems on EICR. Calibration certificates live in the firm's tool register and get checked at scheme audits.",
  },
];

/* ── End-of-page Quiz (wired into streaks/stats) ──────────────────── */

const quizQuestions2 = [
  {
    id: 1,
    question:
      "PUWER 1998 Reg 5 requires work equipment to be 'maintained in an efficient state, in efficient working order and in good repair'. Which inspection regime, taken as a whole, discharges that duty for portable site tools?",
    options: [
      "A single formal Portable Appliance Test (PAT) on the documented cycle — as long as the PAT is in date the tool is maintained, because the electrical test is more thorough than any operative's visual check.",
      'Three layers together — operative pre-use visual every shift, periodic competent-person in-service inspection, and formal PAT on the cycle (3-monthly for 110 V site tools).',
      "The operative's pre-use visual check every shift alone — the user is closest to the tool, so their daily look-over is the complete regime and formal testing adds nothing the visual won't catch.",
      "Sending each tool back to the manufacturer once a year for a full service — the maker's strip-down and re-test is gold-standard maintenance that supersedes any on-site checks2 in between.",
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
      "EAWR 'electrical systems' means only the fixed wiring — cables, boards and accessories in the building; a plug-in tool is portable equipment outside the system, so only PUWER applies.",
      "EAWR Reg 4(2) covers the supply transformer and leads but stops at the socket — anything plugged in is the operative's own duty of care, not the employer's maintenance duty.",
      "EAWR 'electrical systems' includes the portable equipment supplied from them, so Reg 4(2) covers the tool as well as the supply — the second statutory hook alongside PUWER.",
      'EAWR applies only to systems above 1000 V, so a 110 V or 230 V portable tool falls outside it entirely and the relevant maintenance hook for site tools is PUWER alone.',
    ],
    correctAnswer: 2,
    explanation:
      "EAWR's definition of 'electrical system' is broad — it captures the supply chain from generation to point of use, including the portable equipment at the end. So a faulty drill on a site lead is squarely within EAWR Reg 4(2). The result is that PAT and pre-use checks2 discharge BOTH PUWER Reg 5 AND EAWR Reg 4(2) at the same time — two statutory hooks for the same activity.",
  },
  {
    id: 3,
    question:
      "What's the standard recommended PAT interval for a 110 V Class I (earthed metal-cased) portable tool used daily on a construction site, per HSE guidance HSG107 and the IET Code of Practice for In-service Inspection and Testing?",
    options: [
      'Every 12 months — the same annual cycle applies to all portable tools regardless of class or environment, because PAT intervals are fixed by statute at one year and cannot be varied.',
      'Weekly — site tools are tested every week because the construction environment is so harsh, with a full electrical PAT carried out each Monday before the tools go out.',
      "Every 5 years — combined inspection and test runs on the same cycle as a domestic EICR, so a site tool is PAT'd once at purchase and then every five years thereafter.",
      'Every 3 months — formal PAT for harsh-environment use; construction-site Class I tools sit at the short end of the HSE / IET typical intervals because the environment is rough.',
    ],
    correctAnswer: 3,
    explanation:
      "The IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (currently 5th edition) and HSE HSG107 'Maintaining portable electrical equipment' give typical intervals by class and environment. Construction-site Class I tools are 3-monthly because the environment is rough — cables get crushed, casings get knocked, water and dust get in. Office equipment runs much longer intervals. The interval is risk-based; the firm's appointed competent person sets it based on the specific tools and environment.",
  },
  {
    id: 4,
    question:
      'When you carry out a pre-use visual inspection on a 110 V portable tool, which six things should you check before plugging in?',
    options: [
      '(1) Supply cable — full length for cuts, abrasion, kinks, exposed conductor; (2) Plug — body intact, pins straight, cord-grip in place; (3) Tool casing — cracks, missing screws, contamination ingress; (4) Guard or shield — present, correctly fitted, not damaged; (5) Switch — operates positively, anti-restart works after release; (6) PAT label — current, in date, legible.',
      '(1) Insulation resistance of the lead with a 500 V tester; (2) earth-loop impedance at the socket; (3) RCD trip time on the supply; (4) polarity of the plug; (5) prospective fault current; (6) torque of the plug terminals. The six electrical tests that confirm the tool is safe before use.',
      '(1) Battery charge level; (2) chuck runout; (3) bearing noise on a test spin; (4) brush wear; (5) gearbox grease; (6) carbon dust in the vents. The six mechanical checks2 that tell you the motor is healthy before you load it.',
      "(1) Serial number against the asset register; (2) warranty expiry date; (3) hire-return date; (4) the operative's name marked on the handle; (5) the firm's QR asset tag; (6) the manufacturer's recall status. The six administrative checks2 done before issuing a tool.",
    ],
    correctAnswer: 0,
    explanation:
      "Six points, every shift, every tool, before plugging in. Cable, plug, casing, guard, switch, label. HSE HSG107 'Maintaining portable electrical equipment' and the IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (5th ed.) are the apprentice-friendly briefings on this. Most firms produce a small wallet-sized checklist or a sticker on the back of the tool roll; the routine becomes second-nature within a few months and saves you from picking up the one tool with the dodgy lead.",
  },
  {
    id: 5,
    question:
      "You spot a tool in the van with a red 'do not use' tag attached and the supply lead detached. What's the correct response?",
    options: [
      'Refit the lead and give the tool a quick test run — if it works fine the tag was clearly applied in error, so remove it and carry on, noting it now functions correctly.',
      'Leave the tag in place — a competent person has quarantined the tool; removing the tag without authority breaches HASAWA s.7. Find an alternative tool or speak to the supervisor.',
      'Remove the tag, reconnect the lead and use the tool for non-critical work only — the tag is a precaution rather than a prohibition, so light use away from the original fault is acceptable.',
      'Take the tool to the nearest socket and PAT it yourself; if it passes, the fault has evidently cleared and you can remove the tag on the strength of the pass result.',
    ],
    correctAnswer: 1,
    explanation:
      "Tag-out / lock-out is the formal way unsafe equipment is taken out of service while waiting for repair or condemnation. Removing the tag without authority defeats the safety system AND breaches HASAWA s.7 limb (b) (the duty to co-operate with safety arrangements). Same principle as not removing a colleague's lock-off on an isolated circuit. The tag stays until the competent person who fitted it (or someone with equivalent authority) removes it.",
  },
  {
    id: 6,
    question:
      'Hand tools (no electrical supply) still need safety checks2. Which inspection regime applies to a pair of side cutters or an insulated screwdriver?',
    options: [
      'No inspection regime applies — PUWER only covers powered equipment, so hand tools rely entirely on the operative replacing them when they wear out, with no formal check requirement.',
      'An annual PAT — insulated hand tools are tested electrically once a year to confirm the 1000 V rating of the handle, the same as any powered tool, with a pass label applied to the shaft.',
      "Operative pre-use visual every shift plus periodic competent-person inspection — there's no PAT for non-powered tools, but PUWER still covers them and the visual regime matters.",
      'A six-monthly insulation-resistance test of the VDE coating with a 500 V tester — the reading confirms the handle still meets its voltage rating, and the tool is withdrawn below 1 MΩ.',
    ],
    correctAnswer: 2,
    explanation:
      'PUWER applies to all work equipment, powered or not. Hand tools need pre-use visual checks2 (cutting edges, pivots, handles) and periodic competent-person inspection. VDE-rated insulated tools are particularly important — any visible damage to the insulation invalidates the 1000 V rating and the tool must be withdrawn. The visual routine is fast (a few seconds per tool) but catches the rolled cutter edge before it slips, the cracked driver handle before it shocks you.',
  },
  {
    id: 7,
    question:
      "Test instruments (multimeter, MFT, clamp meter) need calibration at a documented interval. What's the standard requirement and why does it matter?",
    options: [
      'No fixed interval — test instruments are calibrated once when bought and re-checked only if dropped or giving an obviously wrong reading, with a visual inspection each shift enough to confirm accuracy.',
      'Every five years, matching the EICR cycle, by the manufacturer only — because the readings feed certificates the calibration must be done by the maker rather than a UKAS lab, keeping costs down.',
      'Monthly self-calibration by the operative — null the leads and check the instrument against a known 230 V socket at the start of each job, replacing any external certificate.',
      "Annual calibration to a UKAS-traceable standard, with the certificate kept in the firm's instrument register, because instruments drift and wrong readings undermine BS 7671 Part 6 verification.",
    ],
    correctAnswer: 3,
    explanation:
      'Annual calibration with a UKAS-traceable certificate is the standard for test instruments used to demonstrate BS 7671 compliance. Megger, Fluke and Kewtech all offer manufacturer or third-party calibration services — typically £40–80 per instrument per year. The certificate is the evidence that the test results on your EIC / EICR are trustworthy. NICEIC, NAPIT and ELECSA all check this at scheme audits. The lessons on test instruments and calibration unpack this specifically.',
  },
  {
    id: 8,
    question: "A site tool fails its pre-use visual check. What's the correct sequence of actions?",
    options: [
      "(1) Take the tool out of service immediately. (2) Apply the firm's quarantine tag, signed and dated. (3) Move it to the quarantine area or supervisor's box. (4) Log the defect. (5) Tell the supervisor. (6) Continue with an alternative tool.",
      'Finish the current task with the tool used carefully, then hand it in at the end of the day with a note of the fault — completing the job first keeps the programme on track and it gets logged either way.',
      'Attempt a field repair yourself — most pre-use failures are minor (a loose screw, a frayed sheath) and fixing them on the spot saves a trip to the supervisor and keeps the tool in service.',
      'Set the tool aside and say nothing until asked — the supervisor checks2 the tools weekly, so the fault will be picked up at the next round without you needing to raise it.',
    ],
    correctAnswer: 0,
    explanation:
      "Six-step quarantine sequence, in that order. Out of service → tag → quarantine area → log → tell supervisor → continue with alternative. The PUWER Reg 5 system depends on damaged tools being taken out of circulation immediately, not used 'one more time'. The defect log gives the firm visibility on which tools fail at which intervals, which feeds back into purchasing and scheduling decisions.",
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs2 = [
  {
    question: 'Who actually does the formal PAT testing on a typical firm?',
    answer:
      'Three patterns. (1) The firm employs an in-house PAT tester (often a senior electrician with a City & Guilds 2377 qualification) who works through the inventory on a rolling cycle. (2) The firm contracts a third-party PAT testing service to come round and do the lot annually. (3) On larger sites, the principal contractor may PAT all tools on entry and tag them with a site-specific colour-of-the-quarter sticker. Smaller firms typically use option 2; larger firms often use option 1. Apprentices rarely do the formal test until later in their training, but the 2377 PAT qualification is one of the easier early add-ons most apprentices pick up at college.',
  },
  {
    question: 'What do the different PAT label colours mean?',
    answer:
      "The colours aren't a national standard — different firms use different schemes. Most common: green = passed and in date, red = failed (do not use), amber = passed but limited use, white/blank = not tested. Some sites use quarterly colour rotation (red Q1, green Q2, blue Q3, yellow Q4) so anyone can spot a tool that's missed its quarterly retest at a glance. Always check the date on the label rather than relying on the colour alone — colours are firm-specific, dates are universal.",
  },
  {
    question: 'If I damage a tool on the job, will I get in trouble?',
    answer:
      "Tools wear out — that's expected. Damaging one through normal use isn't a problem; it's how the wear-and-replace cycle works. Where you'd get in trouble is hiding the damage and putting the tool back — which puts the next user at risk. The right move is the same as for any other defect: take it out of service, tag it, log it, tell the supervisor. Firms much prefer an apprentice who reports a damaged tool to one who hides it. The reporting is what discharges your s.7 duty.",
  },
  {
    question: "Should I be doing user checks2 on the FIRM's tools, or just my own?",
    answer:
      "Both. PUWER Reg 5 puts the maintenance duty on the firm, but the operative's pre-use visual is a separate layer that applies to every tool you use, regardless of who owns it. The supervisor can't realistically check 50 tools at the start of every shift; the user check at the point of pick-up is what catches the new damage that's developed since the last formal inspection. If you pick up a firm tool, you check it before plugging in. Same routine as your own kit.",
  },
  {
    question: 'What about my insulated screwdrivers — do they need PAT?',
    answer:
      "Not PAT — that's for powered equipment. VDE-insulated hand tools are checked visually for damage to the insulation. Any visible crack, chip, melt-mark or peel on the insulation = withdraw the tool from service. Some firms periodically dielectric-test VDE tools (apply a 10 kV AC test to confirm the 1000 V rating still holds) but that's a workshop / laboratory test, not a site one. The everyday check is purely visual: insulation intact, undamaged, undeformed.",
  },
  {
    question:
      "What's the difference between 'pre-use check' and 'in-service inspection' and 'PAT'?",
    answer:
      'Three different things, three different intervals, three different inspectors. Pre-use check — done by the operative at the start of every shift, takes seconds, purely visual (cable, plug, casing, guard, switch, label). In-service inspection — done by a competent person (often the supervisor or appointed PAT tester) at a documented interval (monthly typical for site tools), more thorough visual including opening the plug to check terminations. PAT — done by a 2377-qualified competent person at the formal cycle (3-monthly for site Class I), full electrical test including earth continuity, insulation resistance and lead polarity. Three layers, all under PUWER Reg 5.',
  },
];

export default function Lesson304E_2_3() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Walk through a real domestic install drawing pack — every piece of paper an electrician
        opens before lifting a tool. Front sheet to as-built, applying everything from lessons
        2.1-2.4 on one project (Plot 14, 'The Hawthorn' — a 3-bed semi).
      </p>

      <TLDR
        points={[
          'Synthesis means reading the whole pack as one conversation — front sheet sets context, layouts show position, schedules detail the parts, schematics show the logic, manufacturer sheets tell you how to fit each device.',
          'There is a reading order. Front sheet, then schematic to understand the system, then layouts to walk the install, then the schedules to confirm parts and cables, then manufacturer sheets for anything non-standard.',
          'Discrepancies between any two designer documents (layout vs schedule, drawing vs spec, two prints with different revisions) are an RFI in writing — never a guess. Reg 132.13 (Documentation) and Reg 514.9.2 (diagrams to comply with applicable standards) back you up when the pack is incomplete or non-compliant.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Recognise the standard contents of a UK domestic drawing pack and the reading order that lets you understand the install in under fifteen minutes.',
          'Identify each drawing type in the pack (block, schematic, wiring, layout, schedule, as-built) and what question each one answers — applied across one project.',
          'Read IEC 60617 / IEC 60617 graphical symbols off a real layout drawing — sockets, switches, FCUs, lights, smoke detectors, MET, protective devices.',
          'Convert measurements off a 1:50 floor plan into real cable run distances using a scale rule, and add the right allowance for routing, drops and slack.',
          'Cross-reference the schedule of accessories, cable schedule and layout drawings to spot discrepancies and raise them as RFIs in writing before starting work.',
          'Apply Reg 514.9.2 (A4:2026 — diagrams shall comply with applicable standards) and Reg 526.1 (manufacturer instructions for terminations) when reviewing a drawing pack for completeness.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>What you already know</ContentEyebrow>

      <ConceptBlock title="You have the toolkit — this lesson puts it on a real pack">
        <p>
          Earlier lessons mapped the document hierarchy — BS 7671, OSG, GN3, manufacturer
          instructions, spec, RAMS, scheme bulletins, drawings. They introduced the six drawing
          types — block, schematic, wiring, circuit, layout, as-built — and what each one is for.
          They gave you the IEC 60617 / IEC 60617 graphical symbol set, the visual alphabet for
          every UK installation drawing. And they covered scale notation and the conversion
          between paper and real dimensions, with the do-not-scale rule for resized prints.
        </p>
        <p>
          This lesson puts all of it to work on a single project. We are walking through a real
          drawing pack for Plot 14, "The Hawthorn" — a typical UK 3-bed semi on a new-build
          estate. Eight sheets, all the document types you would expect, with a couple of
          deliberate wrinkles to show how an electrician handles real-world inconsistencies.
        </p>
        <p className="text-[13px] text-white/75 italic">
          Tool-bag thread: this is the prep that happens BEFORE you go to site. Two hours spent
          reading the pack properly saves a day on site. Skipping it is what makes first-fixes
          drag and drives the snag list at handover.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The pack — what arrives in the envelope</ContentEyebrow>

      <ConceptBlock
        title="Plot 14, 'The Hawthorn' — eight sheets in the pack"
        plainEnglish="A standard new-build 3-bed semi pack. Front sheet, two layouts, single-line schematic, three schedules, one manufacturer sheet."
        onSite="If your contractor sends you to site without all of these, raise it before you start. An incomplete pack is a project-management failure, not your problem to solve on the floor."
      >
        <p>The Hawthorn pack contains:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Sheet 01 — Front sheet.</strong> Project name, plot number, drawing register
            (a list of every sheet in the pack), revision history table, scale legend, title
            block, general notes.
          </li>
          <li>
            <strong>Sheet 02 — Ground-floor layout.</strong> Scale 1:50. Every socket, switch,
            FCU, light, smoke detector, doorbell, CT clamp marked in IEC 60617 symbols.
          </li>
          <li>
            <strong>Sheet 03 — First-floor layout.</strong> Scale 1:50. Same conventions as Sheet
            02.
          </li>
          <li>
            <strong>Sheet 04 — Consumer unit single-line schematic.</strong> Shows the supply, the
            main switch, every protective device with its rating and trip curve, every circuit
            destination at top level.
          </li>
          <li>
            <strong>Sheet 05 — Schedule of accessories.</strong> Tabular list of every visible
            fitting in the install, with type, manufacturer reference, mounting height, IP rating
            and finish.
          </li>
          <li>
            <strong>Sheet 06 — Cable schedule.</strong> Tabular list of every circuit — circuit
            number, csa, cable type, OCPD rating + curve, RCD type + sensitivity, estimated run
            length, route notes.
          </li>
          <li>
            <strong>Sheet 07 — Symbol legend.</strong> The IEC 60617 / IEC 60617 subset used
            across the pack, with each symbol named.
          </li>
          <li>
            <strong>Sheet 08 — Manufacturer data sheet for the consumer unit (CU).</strong>{' '}
            Type-tested CU manufacturer, board layout, terminal capacities, torque settings.
          </li>
        </ul>
        <p>
          Eight sheets. About 2-3 hours to read properly the first time, 30-40 minutes when you
          get fluent. The pages tell a single story: what is being built, where each part goes,
          what each part is and how the whole thing is wired and protected.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Reading order — the front sheet first, every time</ContentEyebrow>

      <ConceptBlock
        title="Sheet 01 — front sheet, drawing register, revision history"
        plainEnglish="The front sheet sets the context. Read it first, every time. Skip it and you risk working from the wrong revision or the wrong scale."
        onSite="The most common cause of expensive rework on a fit-out is somebody working from a superseded drawing. Two minutes on the revision history saves it."
      >
        <p>The front sheet has five things you must look at before opening any other sheet:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Project name + plot reference.</strong> Confirms the pack matches the job you
            are on. "The Hawthorn / Plot 14 / Greenacres Phase 2" — does that match the site
            address you were given?
          </li>
          <li>
            <strong>Drawing register.</strong> A list of every sheet that should be in the pack.
            Count the sheets you have actually been handed. Missing one? Raise it before lifting
            tools.
          </li>
          <li>
            <strong>Revision history.</strong> A table showing every revision issued, the date,
            what changed and who approved it. The latest row is the current revision. Every
            individual sheet should match this revision letter in its own title block.
          </li>
          <li>
            <strong>Scale legend.</strong> Confirms which scale the layouts are at (1:50 here),
            and whether different sheets use different scales (sometimes a site plan is at 1:200
            alongside floor plans at 1:50).
          </li>
          <li>
            <strong>General notes.</strong> Project-specific instructions that apply across the
            whole pack — for example "all cables to be LSF", "all RCBOs to be Type A", "all
            socket-outlets at 450 mm to centre except where noted". Read every note.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id={checks[0].id}
        question={checks[0].question}
        options={checks[0].options}
        correctIndex={checks[0].correctIndex}
        explanation={checks[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The schematic — understanding the system</ContentEyebrow>

      <ConceptBlock
        title="Sheet 04 — single-line consumer unit schematic"
        plainEnglish="Read the schematic next, before the layouts. It tells you how the install is split into circuits and protected — the system's logic."
        onSite="Two minutes on the schematic and you can answer 'what is on which way' for the whole house without ever looking at a layout."
      >
        <p>
          The Hawthorn CU schematic shows a TN-C-S supply (PME), a 100 A main switch, then twelve
          outgoing ways:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Cct 1 — Lighting downstairs, 6 A Type B RCBO, 30 mA Type A.</li>
          <li>Cct 2 — Lighting upstairs, 6 A Type B RCBO, 30 mA Type A.</li>
          <li>Cct 3 — Sockets downstairs ring final, 32 A Type B RCBO, 30 mA Type A.</li>
          <li>Cct 4 — Sockets upstairs ring final, 32 A Type B RCBO, 30 mA Type A.</li>
          <li>Cct 5 — Kitchen ring final, 32 A Type B RCBO, 30 mA Type A.</li>
          <li>Cct 6 — Cooker / hob, 32 A Type B RCBO, 30 mA Type A.</li>
          <li>Cct 7 — Shower, 40 A Type B RCBO, 30 mA Type A.</li>
          <li>Cct 8 — Boiler / heating, 6 A Type B RCBO, 30 mA Type A.</li>
          <li>Cct 9 — Smoke detectors (mains-linked), 6 A Type B RCBO, 30 mA Type A.</li>
          <li>
            Cct 10 — EV charge point feed, 32 A Type B RCBO, 30 mA Type A + Type B (per spec).
          </li>
          <li>Cct 11 — Outdoor sockets / garden, 16 A Type B RCBO, 30 mA Type A.</li>
          <li>
            Cct 12 — Spare way (no circuit yet — common on new builds for future expansion).
          </li>
        </ul>
        <p>
          The schematic also shows the MET, the earthing conductor route to the cut-out, the main
          protective bonding conductors out to gas and water (10 mm² on PME), and any SPDs (surge
          protection devices). The single-line view tells you the WHOLE story of the board in one
          diagram. Memorise this layout before you start at the CU on day one.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The layouts — walking the install on paper</ContentEyebrow>

      <ConceptBlock
        title="Sheet 02 — ground-floor layout (1:50)"
        plainEnglish="The layout shows where every accessory physically sits in the building. Read it with the schematic next to you so you know which way feeds what."
        onSite="Walk the layout once with a highlighter. Mark each circuit a different colour as you trace it. By the time you are on site you should be able to picture every back-box position with your eyes shut."
      >
        <p>
          The ground floor shows: front door, hall, downstairs WC, lounge, kitchen-diner, utility,
          back door. On the layout you can see in IEC 60617 symbols:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Lounge:</strong> 4 twin sockets (one per wall), 1-gang 1-way switch by door,
            pendant ceiling rose centre, TV outlet next to chimney breast.
          </li>
          <li>
            <strong>Hall:</strong> 1-gang 2-way switch by front door (paired with switch at top of
            stairs), pendant rose, smoke detector ceiling-mounted, doorbell push by door, 1 twin
            socket under stairs.
          </li>
          <li>
            <strong>Kitchen-diner:</strong> 5 twin sockets above worktops, 1 FCU 13 A switched for
            the boiler, 1 FCU 3 A switched for the extractor, cooker outlet (32 A radial), pendant
            rose over dining table, 6 downlighters over the kitchen run, 1-gang 2-way switch by
            each door (paired across the room).
          </li>
          <li>
            <strong>Utility:</strong> 1 twin socket, 1 FCU 13 A switched for the washing machine,
            1 FCU 13 A switched for the dryer, 1-gang 1-way switch, single batten light.
          </li>
          <li>
            <strong>WC:</strong> No socket (BS 7671 Section 701), pull-cord 2-way switch,
            downlighter (IP-rated for zone), shaver socket on the wall.
          </li>
          <li>
            <strong>External:</strong> 1 IP-rated twin socket on the rear wall (Cct 11), EV charge
            point on the front wall (Cct 10), porch light over the front door.
          </li>
        </ul>
        <p>
          Cross-check each one against the schematic — every accessory should belong to one of the
          twelve circuits. Anything orphaned (a socket the schematic does not feed) is a red flag
          — raise an RFI.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Applying scale — measuring a real cable run off the layout"
        plainEnglish="Take the scale rule, set to the 1:50 face, lay it on the route — the rule reads real metres directly. Then add an allowance for the actual route, not the straight line."
      >
        <p>
          Worked example — Cct 5 (kitchen ring final, 32 A). On the 1:50 ground floor with the
          scale rule on the 1:50 face you measure:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            CU to first kitchen socket: <strong>4.6 m</strong>
          </li>
          <li>
            Socket 1 → Socket 2 (along worktop): <strong>1.2 m</strong>
          </li>
          <li>
            Socket 2 → Socket 3: <strong>1.6 m</strong>
          </li>
          <li>
            Socket 3 → FCU (boiler): <strong>0.8 m</strong>
          </li>
          <li>
            FCU → Socket 4: <strong>1.4 m</strong>
          </li>
          <li>
            Socket 4 → Socket 5 (return leg): <strong>2.4 m</strong>
          </li>
          <li>
            Socket 5 back to CU (closing the ring): <strong>5.2 m</strong>
          </li>
        </ul>
        <p>
          Sum: 4.6 + 1.2 + 1.6 + 0.8 + 1.4 + 2.4 + 5.2 = <strong>17.2 m</strong> straight-line
          wall distance. Add ~15% for skirting follow, vertical drops into back-boxes, slack at
          terminations and the route up over a doorframe: ~19.8 m. Round up to{' '}
          <strong>21 m</strong> on the take-off — gives a small safety margin. Repeat for every
          circuit and you have a full cable take-off in about an hour.
        </p>
        <p className="text-[13px] text-white/75 italic">
          Sanity check on the maths: 1:50 means 1 cm paper = 0.5 m real. 4.6 m direct from the CU
          to the first socket reads as 9.2 cm on the rule when set to the 1:50 face — and the
          rule's scale face has those numbers printed as real metres, not paper millimetres. The
          rule does the conversion for you. Multiplying by 50 again is the classic
          double-conversion mistake.
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

      <ContentEyebrow>The schedules — confirming parts and cables</ContentEyebrow>

      <ConceptBlock
        title="Sheet 05 — schedule of accessories. Sheet 06 — cable schedule."
        plainEnglish="The schedules turn the visual layouts into ordering lists. Cross-reference both against the layouts — every accessory should appear on both."
      >
        <p>
          <strong>Schedule of accessories</strong> (sheet 05) lists every visible fitting: type,
          manufacturer reference (per spec), mounting height, IP rating, finish. Example row:
        </p>
        <p className="bg-white/[0.04] border border-white/10 rounded-lg p-3 text-[13.5px]">
          <strong>K-S-03:</strong> Twin switched socket, MK Logic Plus white moulded, 450 mm to
          centre, IP2X, kitchen worktop wall, fed from Cct 5.
        </p>
        <p>
          <strong>Cable schedule</strong> (sheet 06) lists every cable run: circuit number, csa,
          type, OCPD rating, RCD type, estimated length, route notes. Example row:
        </p>
        <p className="bg-white/[0.04] border border-white/10 rounded-lg p-3 text-[13.5px]">
          <strong>Cct 5:</strong> Kitchen ring final. 2.5/1.5 mm² T&E flat twin and earth. 32 A
          Type B RCBO, 30 mA Type A. Estimated total length 21 m. Route: from CU through
          under-stair void → kitchen wall via skirting → loops through 5 sockets and 2 FCUs →
          returns to CU via same route.
        </p>
        <p>
          Cross-check rule: every accessory on the schedule should appear on the layout, and every
          accessory on the layout should appear on the schedule. Counts do not match? That is
          exactly the RFI in InlineCheck 3 below.
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

      <ContentEyebrow>The symbol legend — your translation key</ContentEyebrow>

      <ConceptBlock
        title="Sheet 07 — IEC 60617 / IEC 60617 symbol legend"
        plainEnglish="The legend names every symbol used across the pack. If a symbol on a layout is not in the legend, raise it — it is a non-conformance under Reg 514.9.2."
        onSite="A complete legend is a sign of a competent design office. An incomplete or home-made-symbols legend is the first warning that the rest of the pack might be unreliable too."
      >
        <p>
          The Hawthorn legend covers about 25 symbols — the everyday set you met earlier.
          Switches (1G/1W, 1G/2W, 2G/2W, intermediate, pull-cord), socket-outlets (single, twin,
          switched, FCU 13 A, FCU 3 A, cooker outlet, shaver), lighting (pendant rose,
          downlighter, batten, wall light, emergency luminaire), accessories (smoke detector, heat
          detector, doorbell push, MET), protective devices on the schematic only (MCB, RCD, RCBO
          with rating + trip curve markings).
        </p>
        <p>
          Read the legend BEFORE the layouts. It is faster than guessing every symbol the first
          time.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 514.9.2 (paraphrased — new in A4:2026)"
        clause="514.9.2 has been introduced to advise that all diagrams, charts, and information or instruction notices comply with the applicable standards specified."
        meaning={
          <>
            The regulation that anchors everything in this lesson. Drawings need to use the
            applicable standards — IEC 60617 for graphical symbols, BS EN 60073 / 60446 for
            notices. A drawing pack with home-made symbols, missing legend entries, or
            non-standard scale notation does not comply with 514.9.2 and is an RFI back to the
            designer. Your job on site is to spot that and flag it, not to guess.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 5, Regulation 514.9.2 (paraphrased — full A4:2026 wording in the published amendment)"
      />

      <SectionRule />

      <ContentEyebrow>Manufacturer data sheets — the device-specific layer</ContentEyebrow>

      <ConceptBlock
        title="Sheet 08 — CU manufacturer data sheet"
        plainEnglish="The drawing pack tells you what circuits go where. The manufacturer sheet tells you how to fit the actual board — torque settings, terminal sizes, lacing, busbar limits."
      >
        <p>The CU manufacturer data sheet for the type-tested board on this plot will include:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Board layout — which way numbers go on which busbar segment.</li>
          <li>Terminal capacities — minimum and maximum csa each terminal accepts.</li>
          <li>Torque settings — line, neutral and earth terminals separately specified.</li>
          <li>RCBO compatibility list — which makes / models are compatible with this board.</li>
          <li>Maximum cable count per terminal — most are 1 or 2 conductors max.</li>
          <li>Conformity standards (BS EN 61439-3 typically for domestic CUs).</li>
        </ul>
        <p>
          Reg 526.1 makes following these terminal-specific instructions a regulation requirement.
          If the data sheet is missing from the pack — raise an RFI before you start terminating.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 526.1 (terminations — manufacturer instructions)"
        clause="Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection. The selection of the means of connection shall take account of, as appropriate: (a) the material of the conductor and its insulation; (b) the conductor class, the number and shape of the wires forming the conductor; (c) the cross-sectional area of the conductor; (d) the number of conductors to be connected together; (e) the temperature attained at the terminals in normal service; (f) the provision of adequate locking arrangements in situations subject to vibration or thermal cycling."
        meaning={
          <>
            The legal hook for following the manufacturer's installation instructions on every
            termination — torque, terminal type, conductor count, locking. Reading the data sheet
            for the CU before you wire it is what 526.1 expects of a competent person. Missing
            data sheet = RFI, not guesswork.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 5, Regulation 526.1 (verbatim)"
      />

      <SectionRule />

      <ContentEyebrow>
        The discrepancy — what an apprentice does when paper does not match paper
      </ContentEyebrow>

      <ConceptBlock
        title="The kitchen socket count — layout says six, schedule says eight"
        plainEnglish="Two designer-issued documents disagreeing is an RFI in writing, every time. You do not pick. You ask, and you wait for written confirmation."
        onSite="Inspectors and assessors will side with you on a clear paper trail. They will not side with you on 'I assumed the schedule was right'."
      >
        <p>
          Real walk-through. You count six twin sockets on the ground-floor kitchen layout (sheet
          02). You then open the schedule of accessories (sheet 05) and count rows for the kitchen
          — eight. One of the two extras is an FCU for the boiler (which you did spot on the
          layout — so the layout is missing one, or the schedule is double-counting the FCU). The
          other extra is a "twin socket for under-cupboard lighting transformer" that does not
          appear on the layout at all.
        </p>
        <p>
          You do NOT decide to fit eight, or six, or seven. You raise an RFI in writing to the
          designer / project manager:
        </p>
        <p className="bg-white/[0.04] border border-white/10 rounded-lg p-3 text-[13.5px] italic">
          "RFI 014 — The Hawthorn / Plot 14 / Cct 5 (Kitchen Ring). Drawing 02 Rev D shows 6 twin
          sockets + 1 FCU 13 A (boiler) + 1 FCU 3 A (extractor). Schedule of accessories sheet 05
          Rev D lists 6 twin sockets + 1 FCU 13 A (boiler) + 1 FCU 3 A (extractor) + 1 additional
          twin socket described as 'under-cupboard transformer feed'. The additional socket does
          not appear on drawing 02. Please confirm whether the additional socket is required and,
          if so, the position. Awaiting written response before first-fix."
        </p>
        <p>
          The reply (whatever it is) becomes part of the project record. If it turns out the extra
          socket WAS supposed to be there and the layout was wrong, you have written proof you
          asked. If it turns out the schedule was wrong and there is no extra socket, you have
          written proof you did not over-install. Either way, the cost of the RFI is an email; the
          cost of guessing wrong is a strip-out at handover.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Working from a superseded revision"
        whatHappens={
          <>
            Two prints of the same drawing are sat on the foreman's desk — Rev C and Rev D. The
            apprentice grabs the cleaner-looking one (Rev C, because nobody has spilt coffee on it
            yet) and starts working from it. Rev D moved a sub-main and added a new circuit; the
            apprentice misses both. Two weeks later when the inspector walks the install, the
            discrepancy comes out and a chunk of the work has to be redone.
          </>
        }
        doInstead={
          <>
            Make checking the revision letter the first thing you do on every new sheet — front
            sheet revision history first, then each individual sheet's title block. Latest
            revision wins, every time. Mark older copies "VOID" or destroy them so nobody else
            picks them up. If you find a revision that postdates the front-sheet revision history,
            raise an RFI — the pack itself is inconsistent.
          </>
        }
      />

      <CommonMistake
        title="Using the scale rule on a 'fit-to-page' PDF print"
        whatHappens={
          <>
            The drawing has been printed at A4 from a PDF that was originally A1, with
            "fit-to-page" selected at the printer dialog. The scale rule reads 60 mm where the
            named dimension says 4250. The apprentice trusts the rule, orders cable based on the
            rule's reading, and ends up 30% short.
          </>
        }
        doInstead={
          <>
            When the rule disagrees with named dimensions, the print is the problem — trust the
            named dimensions. They are text and survive resizing. If the title block says "DO NOT
            SCALE FROM DRAWING", stop scaling immediately and use only named dimensions. If you
            really need to scale (no named dimensions for what you are measuring), get the drawing
            reprinted at full scale or check the same measurement against a known feature (a
            standard door is ~900 mm wide, a standard worktop is 600 mm deep — sanity-check
            against those).
          </>
        }
      />

      <Scenario
        title="Plot 14 day one — what the apprentice actually does"
        situation={
          <>
            You arrive on site on first-fix Monday morning at Plot 14. You have the full drawing
            pack you have been studying for the last two days. The plot is at first-fix carcassing
            stage — joists exposed on the upstairs ceiling, dot-and-dab not yet on the walls,
            supply available at the temporary builder's board near the cut-out. Your supervisor
            points at the kitchen and says "you do that today, ring final and the cooker, I'll be
            back at lunch."
          </>
        }
        whatToDo={
          <>
            Open the pack on the floor. Front sheet first — confirm Rev D matches the prints.
            Schematic next — confirm Cct 5 (kitchen ring) and Cct 6 (cooker) feed from RCBO ways 5
            and 6 on the CU schematic. Layout (sheet 02) — walk to each kitchen position and chalk
            the back-box centre on the wall (or stud) at the spec'd height (450 mm to centre).
            Schedule of accessories — confirm the make/finish you were told to use is what arrived
            from the merchant. Cable schedule — confirm 2.5 T&E for the ring, 6.0 T&E for the
            cooker. Manufacturer data sheet — note the CU terminal torques and conductor capacity
            for when you get to second-fix. Discover the kitchen socket count discrepancy (six on
            layout vs eight on schedule), text or call the supervisor before chalking the extra
            back-box, raise an RFI in writing as soon as practical. Then start carcassing the runs
            you ARE confident about.
          </>
        }
        whyItMatters={
          <>
            Most of an apprentice's reputation in year one comes from the small things — not
            guessing, asking the right questions, leaving a paper trail. Reading the pack properly
            before you lift a tool is the single biggest thing you can do to separate yourself
            from the apprentices who arrive on Friday with a snag list because they did not read
            the schedules.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'A typical UK domestic drawing pack is 8-12 sheets: front sheet, layouts (1:50), single-line schematic, schedules of accessories and cables, symbol legend, manufacturer data sheets. Read in that order.',
          'Front sheet first — every time. Project name, drawing register, revision history, scale legend, general notes. Skip it and you will work from the wrong revision.',
          "Schematic gives you the system's logic in one diagram. Layouts give you positions in IEC 60617 / IEC 60617 symbols. Schedules turn both into ordering lists.",
          'Use a scale rule on the matching face — read real metres directly. Multiplying by the scale denominator on top of that is the classic double-conversion mistake.',
          'Discrepancies between any two designer documents are an RFI in writing, not a guess. The cost of asking is an email. The cost of guessing wrong is a strip-out at handover.',
          'Reg 514.9.2 (A4:2026) requires diagrams to comply with applicable standards. Reg 526.1 makes manufacturer terminal instructions a regulation requirement. Both back you up when you raise pack quality issues.',
        ]}
      />

      <Quiz title="Reading a drawing pack — synthesis check" questions={quizQuestions} />

      {/* ── Prev / next nav ─────────────────────────────────── */}

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        The layered inspection routine that keeps hand and power tools fit for use. Pre-use visual
        every shift, in-service inspection by a competent person, formal PAT on the documented
        cycle. The PUWER Reg 5 + EAWR Reg 4 legal hooks, the tag-out / lock-out routine for
        damaged tools, and the calibration story for torque drivers and test instruments.
      </p>

      <TLDR
        points={[
          'Three layers, every tool — pre-use visual every shift (operative duty), periodic in-service inspection (competent person, monthly typical for site), formal PAT on the cycle (3-monthly for 110 V site Class I).',
          'Damaged tool = quarantine, tag, log, report, replace. Insulating tape is NEVER a repair on a supply lead. The fix is a competent person fitting a new lead.',
          'Two regs sit behind the inspection routine — PUWER Reg 5 (maintenance) and EAWR Reg 4(2) (electrical systems maintained so as to prevent danger). Both bite at any incident investigation.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Describe the three layers of tool safety inspection — operative pre-use visual every shift, in-service inspection by a competent person, formal Portable Appliance Test (PAT) on the documented cycle.',
          'Identify the six points of a pre-use visual check on a portable power tool — cable, plug, casing, guard, switch, PAT label.',
          "Apply the firm's tag-out / lock-out procedure to a defective tool and identify the HASAWA s.7 duty to leave a quarantine tag in place.",
          "State PUWER 1998 Reg 5 'maintenance' duty and explain how the three-layer regime discharges it.",
          "State EAWR 1989 Reg 4(2) 'electrical systems' maintenance duty and identify portable tools as part of the system.",
          "Recognise the calibration requirement for torque drivers and test instruments — annual UKAS-traceable certificate, kept in the firm's tool register.",
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Why this lesson matters</ContentEyebrow>

      <ConceptBlock
        title="Tool maintenance is layered — never a single annual check"
        plainEnglish="The single biggest myth in tool safety is that 'PAT once a year and forget' covers it. PUWER Reg 5 expects a layered routine — the operative checks2 every shift, a competent person inspects more thoroughly at a documented interval, and PAT happens on the formal cycle. Three layers, three different inspectors, all running together. Missing any one weakens the legal defence and lets dangerous tools through."
        onSite="Walk into a tidy firm's van and you'll see PAT labels on every plug-in tool, a quarantine box for defective kit, a tool register on a clipboard, and a wallet-card pre-use check list in every operative's pocket. That's not bureaucracy — that's PUWER Reg 5 made visible. Walk into a sloppy firm's van and the labels are missing, the quarantine box has working tools in it, and nobody can tell you when the last check happened. That's how HSE prosecutions get built."
      >
        <p>The three layers in detail:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Layer 1 — Operative pre-use visual</strong>. Every shift, every tool, before
            plugging in. Six points: cable, plug, casing, guard, switch, label. Takes seconds per
            tool. The apprentice&apos;s daily duty.
          </li>
          <li>
            <strong>Layer 2 — In-service inspection</strong>. Documented interval (monthly typical
            for site tools, less frequent for office). Carried out by a competent person — usually
            the supervisor or appointed PAT tester. More thorough — may open the plug, check
            terminations, check brushes (corded tools), check trigger switch contacts.
          </li>
          <li>
            <strong>Layer 3 — Portable Appliance Test (PAT)</strong>. Formal electrical test on
            the documented cycle (3-monthly for 110 V site Class I tools per HSE HSG107 and the
            IET Code of Practice for In-service Inspection and Testing of Electrical Equipment,
            5th ed.). Carried out by a 2377-qualified competent person (in-house or contracted).
            Tests earth continuity (Class I), insulation resistance, lead polarity, switch
            operation. Produces a pass / fail label.
          </li>
        </ul>
        <p>
          All three together discharge PUWER Reg 5. Take any one out and you&apos;ve got a gap
          that a damaged tool will eventually slip through.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The legal hooks</ContentEyebrow>

      <ConceptBlock
        title="PUWER Reg 5 and EAWR Reg 4(2) — both bite, simultaneously"
        plainEnglish="Two statutory hooks back the inspection routine. PUWER Reg 5 covers ALL work equipment. EAWR Reg 4(2) covers ELECTRICAL SYSTEMS — and a portable electric tool plugged into a site supply is part of that system. Both regs require the same thing in slightly different words: keep the kit in good working order so it doesn't cause harm."
      >
        <p>The two regulations:</p>
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
            repair&quot; is the bar. Reg 5(2) is the documentation duty &mdash; if there&apos;s a
            maintenance log (and for portable tools there always is, in the firm&apos;s tool
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
            pre-use checks2 discharge Reg 4(2) at the same time as PUWER Reg 5 &mdash; one routine,
            two regs covered.
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
        <p>The six points, in order:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>1. Supply cable</strong> &mdash; whole length. Cuts, abrasion, kinks, exposed
            conductor, taped repairs (a taped repair = quarantine; it&apos;s not a repair,
            it&apos;s a marker that something needs replacing). Particular attention to the entry
            into the plug and entry into the tool body &mdash; those are the two most common
            failure points.
          </li>
          <li>
            <strong>2. Plug</strong> &mdash; body intact, no cracks. Pins straight and not pitted
            or burned. Cord-grip clamping the cable sheath, not the conductors. For 110 V CEEform
            plugs, the screw-collar is properly tight.
          </li>
          <li>
            <strong>3. Tool casing</strong> &mdash; cracks, missing screws, contamination ingress
            (cement dust, water marks, oil). Vents clear so the motor can breathe.
          </li>
          <li>
            <strong>4. Guard or shield</strong> &mdash; present, correctly fitted, not damaged.
            Particular attention on angle grinders (the most-removed guard on site) and circular
            saws.
          </li>
          <li>
            <strong>5. Switch</strong> &mdash; operates positively, no stuck contacts,
            anti-restart (no-volt release) works after release. Test by trigger-only operation
            before connecting the supply.
          </li>
          <li>
            <strong>6. PAT label</strong> &mdash; current and in-date. Read the date, not just the
            colour. If the date is in the past, take it out of service.
          </li>
        </ul>
        <p>
          Six points. Ten seconds. Every tool, every shift. The routine is what catches the cable
          that got crushed yesterday and the plug that got knocked off the kerb.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>PAT — the formal electrical test</ContentEyebrow>

      <ConceptBlock
        title="What PAT actually tests, and how often"
        plainEnglish="PAT (Portable Appliance Testing) is the formal electrical test layer. It's a combined visual inspection and electrical test carried out by a competent person on a documented cycle. Despite the name 'testing' it's NOT just an electrical test — the visual is the bigger half of the job."
        onSite="Most apprentices won't do the formal PAT until they've done the City & Guilds 2377 qualification (a short add-on course, often a single weekend). Until then your job is to (a) do the daily visual, (b) recognise an in-date PAT label, and (c) take any tool with an out-of-date or missing label out of service."
      >
        <p>The PAT cycle:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Visual inspection</strong> &mdash; the same six-point check as the daily
            routine, but more thorough. The tester may open the plug to inspect terminations, may
            open the tool body to check internal connections.
          </li>
          <li>
            <strong>Earth continuity test (Class I tools)</strong> &mdash; checks2 the path from
            the plug earth pin to any exposed metal of the tool. Limit typically &lt; 0.1 &Omega;
            per metre of lead.
          </li>
          <li>
            <strong>Insulation resistance test</strong> &mdash; 500 V DC test between live
            conductors and earth. Limit typically &gt; 1 M&Omega; for hand-held equipment.
          </li>
          <li>
            <strong>Polarity check</strong> &mdash; lead is wired correctly L to L, N to N, E to
            E.
          </li>
          <li>
            <strong>Switch operation</strong> &mdash; on/off works, no-volt release functions.
          </li>
        </ul>
        <p>
          Pass &rarr; new label with date and tester ID. Fail &rarr; quarantine tag, tool out of
          service, defect logged, supervisor notified for repair or condemnation. The full PAT
          regime is governed by the IET&apos;s Code of Practice for In-service Inspection and
          Testing of Electrical Equipment (currently 5th edition).
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

      <ContentEyebrow>Quarantine and tag-out</ContentEyebrow>

      <ConceptBlock
        title="The 'do not use' tag is a safety system, not a sticker"
        onSite="Quarantine tags work the same way as lock-offs on isolated circuits — they're a formal indication that something is unsafe and not to be used. Removing one without authority is the same s.7 breach as removing someone else's lock-off. The tag stays until the competent person who fitted it (or someone with equivalent authority — usually the supervisor) is satisfied the tool is fixed."
      >
        <p>The defective-tool sequence:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>1. Out of service</strong> &mdash; stop using it. Don&apos;t try to use it
            &apos;gently&apos; or &apos;just for one more job&apos;.
          </li>
          <li>
            <strong>2. Apply quarantine tag</strong> &mdash; the firm&apos;s &quot;do not
            use&quot; tag, signed by you and dated. Some firms also detach the supply lead as a
            physical reinforcement.
          </li>
          <li>
            <strong>3. Move to quarantine area</strong> &mdash; firm&apos;s designated spot. On
            site, the supervisor&apos;s box or an equivalent locked area. Not back in the
            van&apos;s general tool box.
          </li>
          <li>
            <strong>4. Log the defect</strong> &mdash; firm&apos;s tool register, defect log, or
            whatever paperwork the firm uses. Include the tool ID, the fault, the date, your name.
          </li>
          <li>
            <strong>5. Tell the supervisor</strong> &mdash; verbally as well as written.
            Don&apos;t rely on the paperwork being checked.
          </li>
          <li>
            <strong>6. Continue with alternative</strong> &mdash; get a replacement tool from the
            van or the supervisor. Don&apos;t skip the job; don&apos;t reuse the tagged tool.
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
        <p>The two main families that need calibration:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Torque tools</strong> &mdash; preset torque screwdrivers (Wera Click-Torque,
            Wiha torqueVario), torque wrenches (Norbar, Teng). Drift caused by spring fatigue and
            temperature. Annual calibration typical; some manufacturers say every 5,000 cycles.
            Critical for distribution-board terminations (1.2&ndash;3.5 Nm typical) and any
            control-gear work where torque is specified.
          </li>
          <li>
            <strong>Test instruments</strong> &mdash; multimeters, MFTs, clamp meters, insulation
            testers, voltage testers. Drift caused by component ageing and shock. Annual
            calibration with a UKAS-traceable certificate is required by NICEIC, NAPIT and ELECSA
            at scheme audits. The lessons on test instruments and calibration cover this in detail.
          </li>
        </ul>
        <p>
          The firm keeps an instrument register listing every calibrated tool, its serial number,
          last calibration date, next calibration due date, and the calibration certificate
          reference. At a scheme audit the assessor asks to see this register and a sample of
          certificates. An out-of-date instrument used for a documented test result invalidates
          that test.
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

      <ContentEyebrow>The firm&apos;s tool register</ContentEyebrow>

      <ConceptBlock
        title="What the paperwork actually looks like"
        plainEnglish="PUWER Reg 5(2) requires the maintenance log to be kept up to date. For a typical electrical contractor that means a tool register — a list of every tool the firm owns, with its inspection and PAT history. The register is what the HSE and the certification scheme assessor ask to see, and what feeds the supervisor's pre-shift sign-off on whether each tool is fit for work."
        onSite="Most firms run the tool register either as a spreadsheet in Google Sheets / Excel or in a dedicated tool-management app (Trakopolis, ToolWatch, ShareMyToolbox). The register is updated by the appointed PAT tester after each formal test, by supervisors when defects are reported, and by the office when new tools are purchased. Apprentices don't usually edit the register directly but should know how to look up a tool's status if asked."
      >
        <p>A typical tool-register entry holds:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Tool ID / asset number</strong> &mdash; firm-allocated unique identifier,
            often punch-marked or barcoded onto the tool body.
          </li>
          <li>
            <strong>Description</strong> &mdash; make, model, serial number (e.g. &quot;Makita
            HR2811FT 110 V SDS-Plus, S/N 12345&quot;).
          </li>
          <li>
            <strong>Voltage / class</strong> &mdash; 110 V, 230 V, cordless; Class I (earthed
            metal case) or Class II (double-insulated).
          </li>
          <li>
            <strong>Assigned operative or location</strong> &mdash; named individual or van/site.
          </li>
          <li>
            <strong>Last PAT date and result</strong> &mdash; with tester ID and pass/fail.
          </li>
          <li>
            <strong>Next PAT due date</strong> &mdash; calculated from the interval (3-monthly for
            110 V site Class I).
          </li>
          <li>
            <strong>Defect history</strong> &mdash; list of reported faults with dates and
            resolution (repaired / replaced / condemned).
          </li>
          <li>
            <strong>Calibration date and next-due date</strong> &mdash; for torque tools, test
            instruments, anything calibratable.
          </li>
        </ul>
        <p>
          The register is the firm&apos;s legal evidence under PUWER Reg 5 / Reg 5(2) and EAWR Reg
          4(2) that the &quot;system of work&quot; for tool maintenance exists and is being
          followed. At a NICEIC / NAPIT scheme audit the assessor asks to see it. At an HSE
          incident investigation the inspector asks to see it. An empty or out-of-date register is
          itself evidence of breach.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating PAT as the only check that matters"
        whatHappens={
          <>
            Apprentice picks up a 110 V SDS at the start of a shift. PAT label says &apos;tested 6
            weeks ago, valid for 3 months&apos;. Apprentice doesn&apos;t look further &mdash; PAT
            is in date, so the tool must be safe. Plugs in. The supply lead has been crushed by
            the van&apos;s sliding door overnight and the inner cores are showing through a 30 mm
            split in the outer sheath. RCD on the transformer trips immediately. Tool is
            destroyed; the apprentice gets a fright and a lecture.
          </>
        }
        doInstead={
          <>
            Pre-use visual check is YOUR daily duty regardless of PAT status. The PAT label says
            the tool was safe SIX WEEKS AGO &mdash; it doesn&apos;t say anything about what
            happened in the van between then and now. Six points: cable, plug, casing, guard,
            switch, label. Ten seconds per tool. The label is one of the six checks2, not a
            substitute for the other five.
          </>
        }
      />

      <CommonMistake
        title="Insulating-taping a damaged supply lead and carrying on"
        whatHappens={
          <>
            Apprentice notices a small split in a 110 V supply lead, wraps three turns of
            insulating tape around it, and uses the tool for the rest of the day. Tape works fine
            for the day. Two weeks later the tape has lifted at the edge, water has got in, the
            inner conductor is corroded, and the next user gets a shock when an un-RCD&apos;d 230
            V tool is used on a parallel circuit and induced voltage hits the now-exposed cable.
            The original apprentice didn&apos;t cause the shock but the paper trail leads back.
          </>
        }
        doInstead={
          <>
            Insulating tape is NEVER a repair on a supply lead. The fix is a competent person
            fitting a new lead. As soon as the outer sheath of a portable tool&apos;s lead is
            breached, the tool goes out of service: tag, log, report, replace. The whole point of
            the layered inspection routine is that NO tool with a known fault stays in
            circulation. A taped lead is a fault sticker, not a fix.
          </>
        }
      />

      <Scenario
        title="Pre-use check catches a crushed lead before plug-in"
        situation={
          <>
            You arrive on a fit-out at 7am. The van&apos;s tool box has been knocked about by the
            firm&apos;s overnight stock movements and a 110 V combi drill&apos;s lead has been
            pinched between the sliding door and the bulkhead. There&apos;s a 25 mm flat spot in
            the rubber sheath, the outer is intact but flattened and the cable feels stiff at that
            point when you flex it. PAT label is in date (last tested 8 weeks ago). What do you
            do?
          </>
        }
        whatToDo={
          <>
            Take the drill out of service. The pre-use visual check has done its job &mdash; the
            lead has been mechanically damaged since the last PAT and the integrity of the cores
            can&apos;t be confirmed without an electrical test. Apply the firm&apos;s quarantine
            tag, write the fault on the defect log (&quot;crushed/flattened lead 25 mm from plug,
            feels stiff on flex&quot;), put the drill in the supervisor&apos;s box, tell the
            supervisor verbally, and pick up an alternative drill from the van. The supervisor
            will arrange a new lead to be fitted by a competent person back at the workshop
            &mdash; that&apos;s a 10-minute repair that the apprentice doesn&apos;t do.
          </>
        }
        whyItMatters={
          <>
            The pre-use check exists for exactly this scenario &mdash; the damage that has
            happened SINCE the last PAT. PAT alone would have missed it. Catching it at 7am stops
            a 30 mA RCD trip mid-job (or worse, an un-RCD&apos;d circuit causing a shock). The 30
            seconds you spent on the visual saved the firm a tool, the supervisor an
            investigation, and you a hospital trip. That&apos;s why the layered regime exists and
            why the operative&apos;s daily duty is as important as the competent-person&apos;s
            formal test.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Three layers of inspection — operative pre-use visual every shift, in-service inspection by a competent person at a documented interval, formal PAT on the cycle (3-monthly for 110 V site Class I per HSE HSG107 + IET Code of Practice for In-service Inspection and Testing of Electrical Equipment, 5th ed.).',
          "Six-point pre-use check — cable, plug, casing, guard, switch, PAT label. Every tool, every shift, before plugging in. Ten seconds per tool once it's a habit.",
          'PUWER 1998 Reg 5 (maintenance) and EAWR 1989 Reg 4(2) (electrical systems maintained) both bite at the same time. The three-layer regime discharges both regs simultaneously.',
          "Defective tool sequence = take out of service, quarantine tag, move to quarantine area, log the defect, tell the supervisor, continue with an alternative. Insulating tape is NEVER a repair on a supply lead — the fix is a competent person fitting a new lead. Don't be the apprentice who 'uses it gently' or hides damage.",
          "Quarantine tag is a safety system, not a sticker. Removing it without authority is a HASAWA s.7 breach (failure to co-operate with employer's safety arrangements) — same as removing a colleague's lock-off.",
          'Hand tools (no electrical supply) still need pre-use visual checks2 under PUWER. VDE-insulated drivers — any visible damage to the insulation = withdraw from service.',
          'Torque tools and test instruments need annual UKAS-traceable calibration. Drifted torque drivers cause over- or under-torqued terminations that fail BS 7671 526.1. Drifted test instruments produce wrong test results that fail BS 7671 612.x.',
          "The firm's tool register is the legal evidence under PUWER Reg 5(2) that the maintenance system exists. NICEIC / NAPIT assessors and HSE inspectors both ask to see it; an empty register is itself evidence of breach.",
        ]}
      />

      <Quiz title="Tool safety checks2 knowledge check" questions={quizQuestions2} />
    </div>
  );
}
