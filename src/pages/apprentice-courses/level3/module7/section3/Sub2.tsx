/**
 * Module 7 · Section 3 · Subsection 2 — Insurance stack
 * Maps to C&G 2365-03 / Unit 308 / LO1 / AC 1.3
 *   AC 1.3 — "Identify the differences between employment and self-employment routes
 *             in building services engineering"
 *
 * Insurance for an electrical business — Public Liability, Employers'
 * Liability (mandatory under EL Compulsory Insurance Act 1969), Professional
 * Indemnity, Tools-in-Transit, Business Vehicle, Cyber, scheme-required
 * cover. What each policy covers, typical costs, common exclusions, brokers
 * who specialise in trade.
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

const TITLE = 'Insurance stack | Level 3 Module 7.3.2 | Elec-Mate';
const DESCRIPTION =
  'Insurance for an electrical business — PL, EL (Compulsory Insurance Act 1969), PI, Tools-in-Transit, Business Vehicle, scheme-required cover. What each policy covers, costs, exclusions.';

const checks = [
  {
    id: 'mod7-s3-sub2-pl',
    question: "What does Public Liability (PL) insurance cover?",
    options: [
      "Daily site diary, weekly time sheet, NVQ portfolio entries (evidence for the End-Point Assessment), off-the-job training log (apprenticeship standards), monthly apprentice review forms (you + employer + tutor), JIB grading entries where applicable, and any required H&S sign-on records (RAMS sign-on, toolbox talk attendance).",
      "Politely decline and explain you must work within the law. Tax evasion is a criminal offence under the Fraud Act 2006 and VAT legislation; accepting it puts your business, scheme registration and personal liability at serious risk. Decline firmly without lecturing the client.",
      "Stop. MEWP operation requires an IPAF licence (or equivalent recognised training). The Provision and Use of Work Equipment Regulations 1998 Reg 9 requires the operator to be adequately trained, and LOLER 1998 Reg 9 requires the MEWP itself to be subject to thorough examination. Plus you need a harness for boom-type MEWPs (cherry pickers) clipped to the basket anchor, and a familiarisation on the specific machine. Until the training is in place, the work goes to a competent operator.",
      "PL covers your legal liability for injury to third parties or damage to third-party property arising from your work — e.g. a customer injured by an electric shock from a fault you introduced, or fire damage caused by an installation defect. Typical cover £5-10m. Cost £200-500/year for a small electrical firm. Effectively required by all commercial clients and most CPS schemes.",
    ],
    correctIndex: 3,
    explanation:
      "PL is the foundational liability cover for any trade business. It covers third-party injury and property damage claims arising from your work or your premises. Most domestic and commercial customers expect PL evidence before contracting; main contractors require it for site access; CPS schemes require it for registration. £5m is typical minimum; £10m for larger commercial exposure. Get a broker who knows electrical trade — quotes vary widely.",
  },
  {
    id: 'mod7-s3-sub2-el',
    question: "When is Employers' Liability (EL) insurance legally required?",
    options: [
      "Posting customer property, customer information, project details or photos taken on site without explicit written consent; making derogatory comments about customers, colleagues, suppliers or competitors; representing personal opinions as the firm's opinions; sharing anything that could damage the firm's reputation. The policy applies to personal accounts because the duty travels with the content, not the platform.",
      "Two-way radios on a pre-agreed channel, tested before the pull starts. Brief both ends on the agreed call-words ('pull', 'stop', 'slack', 'snag'), confirm channel volume so both parties hear over background noise, and agree a default action if comms drop ('stop' is always the default). Phones are a backup, not the primary — they can ring while you're holding cable.",
      "EL is legally required from the moment you employ anyone (including apprentices) under the Employers' Liability (Compulsory Insurance) Act 1969. Statutory minimum cover is £5m; most policies provide £10m. EL covers claims by employees for injury or illness caused by their work. The current EL certificate must be displayed at the workplace and be available for inspection by HSE.",
      "Treat every fire alarm as real until proven otherwise. Stop work, leave tools where they are, ensure the customer evacuates with you, walk the planned escape route to the muster point, and await account-for. Re-entry only when the fire-marshal / building manager declares the all-clear. Tools and van keys can be retrieved later; the alarm response cannot be re-done.",
    ],
    correctIndex: 2,
    explanation:
      "EL is non-negotiable from day one of employing anyone — including apprentices. The Act sets the £5m statutory minimum and requires you to display the certificate. HSE can prosecute for failure to hold valid EL — fine of up to £2,500 for any day without cover, plus £1,000 for failing to display the certificate. Cost typically £200-600/year on top of PL for a small firm. EL is the boundary line between sole trader and employer.",
  },
  {
    id: 'mod7-s3-sub2-pi',
    question:
      "What does Professional Indemnity (PI) insurance cover and who needs it?",
    options: [
      "PI covers your legal liability for financial loss caused to a customer by professional advice or design errors — e.g. you specified the wrong cable size and it caused equipment damage; you made a calculation error in a fault-level study and the customer's switchgear failed. Typical cover £1-2m for small firms; £200-500+/year. Needed if you do any design work, technical advice, certification or specification.",
      "The Joint Industry Board (JIB) is the body that sets the working rules, pay rates, holiday entitlements, sick-pay and pension arrangements for electricians in England, Wales and Northern Ireland. It also runs the JIB grading structure (Apprentice / Improver / Electrician / Approved / Technician) and the Apprentice Code of Practice. As an apprentice your pay rate, your training requirements and your grading are set by JIB rules.",
      "It means the local LV cable, transformer or upstream HV network can’t safely accept the additional export without reinforcement (typically a transformer upgrade or cable replacement). The customer either pays for the reinforcement (often £10,000+), accepts an export-limited install (the inverter is throttled to a lower export rating), or chooses not to proceed.",
      "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 — requires the responsible person (employer / self-employed / person in control of premises) to report to the HSE certain work-related deaths, specified injuries, over-7-day injuries, occupational diseases and dangerous occurrences. Reports are made via the F2508 forms / online RIDDOR portal.",
    ],
    correctIndex: 0,
    explanation:
      "PI is the liability layer for design and advice work — distinct from PL (which covers physical damage from your work). Many electrical firms doing pure installation don't need PI; firms doing design, EICR reports, certification or technical consultancy do. The exposure outlives the install — design errors can surface years later when equipment fails. Get PI cover if you put your name on any design or certification document.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's the EL Compulsory Insurance Act 1969 statutory minimum cover?",
    options: [
      "That pressing the emergency stop immediately de-energises all hazardous motion, that the stop is maintained (latched) until manually reset, and that the machine cannot restart until the stop is released and a deliberate start action is taken",
      "£5 million per claim. The Act requires every UK employer (with limited specific exceptions) to hold an EL policy for at least £5m. Most policies offer £10m or more by default. The certificate must be displayed at the workplace where employees can see it. Failure to hold cover = fine up to £2,500 per day; failure to display = £1,000 fine.",
      "FI — further investigation needed. The reading is over the permitted maximum but you have one method only and a single reading. Confirm with R1+R2 plus Ze, retest with a fresh battery and lead-resistance check, and if the high reading is confirmed then reclassify as C2 (or C1 if dangerous combination present).",
      "Table 41.3 max Zs values in A4:2026 are now published with the Cmin factor (0.95) already applied — you don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t multiply by 0.95 yourself. Use the table value directly, then apply the 0.8 measured-vs-calculated correction (e.g. B32 max Zs = 1.37 Ω → 1.10 Ω corrected).",
    ],
    correctAnswer: 1,
    explanation:
      "£5m is the statutory minimum but most insurers provide £10m as standard because £5m is rarely enough for serious workplace injury claims. Annual EL premium typically £200-600 for a small electrical firm with 1-3 employees including apprentices. Always check the policy schedule shows the correct number of employees and the right SIC code (electrical contracting).",
  },
  {
    id: 2,
    question: "Are apprentices counted as employees for EL purposes?",
    options: [
      "The insulation chemistry differs — standard thermoplastic (PVC) softens above ~70 °C, modern thermosetting (LSF, XLPE) cross-links and tolerates 90 °C continuously. The cable's tabulated CCC depends on which insulation it has.",
      "Loss of fire alarm interfaces, loss of automatic doors, loss of emergency lighting (if isolated), interruption of process equipment, loss of computer-room cooling, loss of safety-critical controls in industrial environments. Plan and brief accordingly.",
      "Yes — apprentices are employees and EL applies to them in full. The Apprenticeship Agreement (under the Apprenticeships, Skills, Children and Learning Act 2009) is a specific form of employment contract. From the day the apprentice starts you must have EL in place covering them.",
      "An Electrical Installation Certificate (EIC), accompanied by a Schedule of Inspections AND a Schedule of Test Results — the three-document set required by Section 644 for full initial verification.",
    ],
    correctAnswer: 2,
    explanation:
      "Apprentices are employees under UK employment law and EL applies in full. Some sole-trader electricians take on apprentices without realising they need EL — that's a HSE prosecution risk. Many CPS schemes (NICEIC, NAPIT) check EL evidence at annual assessment for any registered firm with employees. EL premium for adding an apprentice is typically modest (£50-150/year) but the certificate must be in place from day one.",
  },
  {
    id: 3,
    question: "Does PL cover damage to your customer's existing installation?",
    options: [
      "Multiple sources accepted by CPS schemes: scheme-organised events (NICEIC Connect, NAPIT events, ELECSA training), accredited training providers (JTL, NET, IET Academy, Elec-Mate), trade events (ECA Live, Electric Vehicles Show), online platforms (IET Academy, scheme portals), manufacturer training (sometimes counts), reading and self-study (some schemes accept evidence). Keep a CPD log with date, topic, time, source.",
      "Typically £1,200-1,800 for the course, exam fees and practical assessment combined. Premium providers (SECTT in Scotland, JIB-approved providers, NICEIC training arm) sometimes charge £2,000+. Lower-cost providers around £900-1,200 with smaller class sizes or basic practical facilities. Always check exam and assessment fees are included in the headline price.",
      "Strictly there's no formal pre-requisite — anyone can sit 2391-52 if they can pass the exam and practical. In practice most providers expect candidates to hold C&G 2365-03 (or equivalent NVQ Level 3) and to have meaningful site experience. AM2 isn't formally required but is the strong norm because the practical content assumes installation competence.",
      "It depends on policy wording. Many PL policies have 'damage to property in your custody/care' exclusions that limit cover for damage to the very equipment or installation you're working on. Some policies offer a sub-limit (e.g. £25,000) for property in care; others exclude entirely. Always check the policy schedule. Specialist trade brokers (NICEIC Insurance, NAPIT Insurance, Hiscox, Tradesman Saver) understand this and offer relevant cover.",
    ],
    correctAnswer: 3,
    explanation:
      "The 'property in your care/custody/control' exclusion is a common gotcha — standard PL covers third-party property generally but excludes property you're actively working on. For an electrician this matters: if you damage the customer's consumer unit while working on it, that may not be covered by basic PL. Get cover that explicitly addresses property-in-care, or buy a separate Contract Works/Property in Care extension.",
  },
  {
    id: 4,
    question: "What's Tools-in-Transit insurance?",
    options: [
      "Specific cover for theft of tools and equipment from your van or work vehicle, typically with a per-claim limit (e.g. £5,000) and conditions about secure storage (alarmed van, specific locking systems, overnight storage location). Tool theft is a major UK trades risk — police-reported tool theft from vans runs into hundreds per week. Annual premium £100-300; high deductibles common.",
      "Combination pliers — heavy-duty grip, twisting solid conductors, pulling cable through tight runs, light cutting of soft material. Side cutters (sometimes called diagonal cutters or 'snips') — flush cutting of insulated and bare conductor, trimming cable ends. Long-nose pliers — forming loops, reaching into recessed terminals, holding small components while you tighten. One job each, no overlap if you can help it.",
      "On the metal consumer-side pipe, within 600 mm of the meter outlet union per Reg 544.1.2. The plastic supply pipe is not an extraneous-conductive-part (it can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t introduce a potential) so doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t need bonding — but the metal consumer pipework downstream of the meter does.",
      "A dutyholder is a person on whom statute imposes a duty regardless of contract. Employer, self-employed person, employee, occupier, manufacturer, designer, importer — each has statute-imposed duties under HASAWA or its associated regulations. Contractual reallocation of the risk doesn't transfer the statutory duty. You can't 'contract out' of HASAWA.",
    ],
    correctAnswer: 0,
    explanation:
      "Tool theft is a real and growing UK problem — vans get broken into overnight, tools stolen and resold. Tools-in-Transit policies typically have specific conditions: van must be alarmed, must be parked in specified locations overnight, tools must be in lockable storage. Read the conditions carefully — many claims are refused because the van wasn't parked in compliance with the policy. Check whether your home insurance covers tools at home (some do, some don't).",
  },
  {
    id: 5,
    question: "Do CPS schemes require specific insurance?",
    options: [
      "Safely isolate. Open all switches and disconnect any wired-in fixed appliances (or accept Reg 643.3.3 two-stage method). Disconnect L and N at the protective device; if the circuit shares a neutral bar with other circuits, lift its neutral too. Connect the IR tester between L and CPC, then N and CPC, then L and N (each combination). Press TEST. Reading must be ≥ 1 MΩ for a 500 V test.",
      "Yes. NICEIC, NAPIT, ELECSA all require members to hold PL (typically £5m+), EL if employing anyone, and (often) PI if doing design work. Specific minimum cover levels are set in scheme rules; the assessor checks evidence at annual assessment. Some schemes offer affiliated insurance products (NICEIC Insurance, NAPIT Insurance) at member rates.",
      "(1) Supply cable — full length for cuts, abrasion, kinks, exposed conductor; (2) Plug — body intact, pins straight, cord-grip in place; (3) Tool casing — cracks, missing screws, contamination ingress; (4) Guard or shield — present, correctly fitted, not damaged; (5) Switch — operates positively, no stuck contacts, anti-restart works after release; (6) PAT label — current, in date, legible. Plus check the tool is the right one for the job.",
      "The location, the specific activity (gas torch, grinding, welding), the operative names, the permit validity window (start time, end time), the precautions in place (combustibles cleared, fire blanket / extinguisher to hand, fire watch arranged for after work), the cool-down / fire-watch requirement (typically 30-60 minutes after work ceases), and signatures from issuer, operative and (on completion) the fire-watch confirming no smouldering.",
    ],
    correctAnswer: 1,
    explanation:
      "CPS scheme insurance requirements are part of the scheme rules — must be evidenced at annual assessment. Most schemes accept any reputable insurer; some prefer their affiliated products. The assessor wants to see live policy schedules at assessment, not just promises. Lapsed or under-cover insurance can cause scheme registration suspension. Treat insurance renewal calendar as seriously as scheme assessment calendar.",
  },
  {
    id: 6,
    question: "What's the typical insurance cost for a one-person sole trader electrical firm?",
    options: [
      "Under CDM 2015 Reg 6 a project is notifiable when the construction work is scheduled to last longer than 30 working days AND have more than 20 workers working simultaneously at any point, OR exceed 500 person-days. The Client must notify the HSE in writing as soon as practicable before construction starts using F10 notification.",
      "Because the high earth electrode resistance limits fault current to a few amps, far below what an MCB or fuse needs to operate. Without an RCD the fault current can flow indefinitely through the earth path with no clearing — the RCD is the only practical means of automatic disconnection.",
      "Roughly £400-800/year for the basic stack: PL £5-10m (£200-500), Tools-in-Transit (£100-300), van insurance (commercial separately, typically £600-1,200/year for a small van). Add EL if you have an apprentice (£200-600). Add PI if you do any design work (£200-500). Total annual insurance bill for a sole trader with apprentice and design work: roughly £1,500-2,500.",
      "To record what was actually done on the visit — labour hours, materials used, parts replaced, tests performed, customer comments, photos. It's the contemporaneous record that supports the invoice, feeds into the cert, and protects the firm if there's a later complaint about scope or quality.",
    ],
    correctAnswer: 2,
    explanation:
      "Insurance is a meaningful business cost but unavoidable. Shop around — quotes vary 50%+ between insurers for the same cover. Use a broker who specialises in trade (NICEIC Insurance, NAPIT Insurance, ECA Insure, Hiscox, Tradesman Saver). Don't auto-renew without comparison; loyalty rarely pays. Annual review of cover levels matters — as the business grows, cover levels need to grow.",
  },
  {
    id: 7,
    question: "What's a 'product recall' or 'defective workmanship' extension?",
    options: [
      "Electrical burns are usually small at the surface but deep at the tissue level — current passing through tissue heats it from the inside out. Thermal burns are usually obvious at the surface. Electrical burns may have separate entry and exit wounds. Both need cooling (10-20 min cool running water for thermal; less aggressive for electrical because of underlying tissue damage), covering with a clean non-adherent dressing, and medical assessment.",
      "A heat pump struggles in a poorly-insulated house with undersized radiators — it’s designed to deliver lots of low-temperature heat, not a little high-temperature heat. The realistic CoP will be poor (closer to 2 than 3), the running costs will surprise the customer, and the property may need insulation upgrades and rad-replacement first. Be honest before quoting.",
      "Read it, follow it, sign on, work to the controls and steps as written, and flag anything on site that doesn't match what the document describes. Writing RAMS is a Level 3 / 4 / supervisor competency — at Level 2 you're a reader and follower of RAMS, and a flagger when reality doesn't match.",
      "Optional extensions to PL covering specific risks: defective workmanship (claims arising from faulty work after completion, e.g. a fire caused by an installation defect months after the install), product recall (cost of recalling products you supplied if a fault is found). Increasingly important as electrical work involves more complex equipment (PV inverters, EV chargers, BMS components).",
    ],
    correctAnswer: 3,
    explanation:
      "Defective workmanship cover is a meaningful upgrade for installation work. Standard PL typically covers third-party damage during the work; it may not cover damage caused by the work after handover. For an electrical installation that fails 6 months later and causes a fire, the defective workmanship extension covers the resulting damages claim. Cost is modest (£50-200/year on top of PL) and worth it for any firm doing serious volume of work.",
  },
  {
    id: 8,
    question: "Should I use a price-comparison site for trade insurance?",
    options: [
      "Comparison sites are useful for pricing benchmarks but specialist trade brokers (NICEIC Insurance, NAPIT Insurance, ECA Insure, Hiscox, Tradesman Saver) typically offer better-fitting policies because they understand electrical-trade risks. Comparison sites can miss nuances (property-in-care exclusion, defective workmanship, scheme requirements). Use comparison sites to set a benchmark; talk to a trade-specialist broker for the actual purchase.",
      "A genuine shift to: \\\\\\\"This is the most challenging situation I have faced, but I now have a clear action plan to address the specific issues. I have identified three process improvements that will prevent recurrence. I feel motivated to apply these lessons, and this experience will make me a significantly more capable project manager\\\\\\\" — with the motivation to act matching the new belief",
      "(1) Take the tool out of service immediately — don't try to use it 'gently'. (2) Apply the firm's quarantine tag ('do not use', signed and dated). (3) Move the tool to the firm's quarantine area (or, on site, to the supervisor's box). (4) Log the defect in the firm's tool register or defect log. (5) Tell the supervisor — verbally as well as written. (6) Get an alternative tool to continue the work. The fix happens later by a competent person; the apprentice's job ends at quarantine + report.",
      "That the installation has more than one source of supply (mains plus PV, battery, generator, etc.), that opening the main switch does NOT isolate the entire installation, what additional isolation is needed, and where each isolation point is located. Critical for anyone working on the system because back-feed from PV/battery can energise the install with the main switch open.",
    ],
    correctAnswer: 0,
    explanation:
      "The trade-specialist broker route typically delivers better cover at a similar (or sometimes better) price than comparison sites. The broker knows the trade-specific risks and can structure cover that matches your actual exposure. For sole trader and small Ltd firms, broker fees are typically built into the policy premium rather than charged separately.",
  },
];

const faqs = [
  {
    question: "Can I just have one insurance policy that covers everything?",
    answer:
      "Yes — most trade-specialist insurers offer 'package' policies bundling PL, EL, Tools-in-Transit, Contract Works and (optionally) PI under a single policy with a single annual premium. This simplifies admin and often costs less than buying each separately. Specialist brokers in trade (NICEIC Insurance, Hiscox, Tradesman Saver) offer these packages.",
  },
  {
    question: "What if I'm self-employed but a sub-contractor on a main contractor's site?",
    answer:
      "You still need your own PL — main contractors require it as a contract condition. Some main contractors require £5m or £10m specifically. EL only if you have your own employees (which a one-person sub-contractor doesn't). Check the sub-contract document for exact insurance requirements before signing.",
  },
  {
    question: "Is my van insurance separate from business insurance?",
    answer:
      "Yes — van insurance is a separate motor policy (legal requirement under Road Traffic Act 1988). Make sure you have 'business use' on your van policy (not just 'social, domestic and pleasure') because pure SDP doesn't cover travel between job sites. Commercial vehicle insurance for a small van typically £600-1,200/year. Tools in the van are typically not covered by van insurance — you need separate Tools-in-Transit.",
  },
  {
    question: "What insurance do MCS-registered installers need extra?",
    answer:
      "MCS schemes typically require Public Liability (often £5m+), Employer's Liability if applicable, and the consumer code (RECC or HIES) requires deposit protection insurance. Some MCS schemes also require workmanship warranty cover beyond the standard 2-year minimum. Specialist renewables insurers (Quanta, NIB) offer MCS-tailored packages.",
  },
  {
    question: "What happens if I don't have insurance and something goes wrong?",
    answer:
      "Catastrophic. A serious injury claim against you personally (sole trader) or against your Ltd (with directors potentially exposed via wrongful trading) could run into hundreds of thousands or millions of pounds. Without insurance you're personally liable for the full amount — bankruptcy is the typical outcome. EL specifically: criminal prosecution by HSE (£2,500/day fine) plus the claim. Insurance isn't optional — it's the price of operating.",
  },
  {
    question: "Should I review insurance cover annually?",
    answer:
      "Yes — at least annually, ideally at scheme assessment time. Cover levels need to track business growth (turnover, employees, equipment value, contract sizes). Renewal time is also when you can shop competitive quotes; loyalty rarely pays. Use the annual review to reassess any optional extensions (defective workmanship, product recall, cyber) as your risk profile evolves.",
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 7 · Section 3 · Subsection 2"
            title="Insurance stack"
            description="Public Liability, Employers' Liability (Compulsory Insurance Act 1969), Professional Indemnity, Tools-in-Transit, Business Vehicle, scheme-required cover."
            tone="emerald"
          />

          <TLDR
            points={[
              "Public Liability (PL) — third-party injury or property damage. £5-10m cover, £200-500/year. Required by commercial clients, CPS schemes, main contractors.",
              "Employers' Liability (EL) — legally mandatory under EL Compulsory Insurance Act 1969 if employing anyone (including apprentices). £5m statutory minimum; certificate must be displayed.",
              "Professional Indemnity (PI) — design and advice errors. Needed if you do any design, EICR reports, certification, technical consultancy. £1-2m typical, £200-500/year.",
              "Tools-in-Transit — theft from van. Specific conditions on parking and locking. £100-300/year. Tool theft is a major UK trades risk.",
              "Total annual insurance for sole-trader-with-apprentice-and-design typically £1,500-2,500. Trade-specialist brokers (NICEIC Insurance, Hiscox, Tradesman Saver) offer better-fitting policies than generic comparison sites.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Maps to C&G 2365-03 / Unit 308 / LO1 / AC 1.3 — identify the differences between employment and self-employment routes including the insurance obligations of self-employment.",
              "Identify the main insurance policies needed by a UK electrical business (PL, EL, PI, Tools-in-Transit, Business Vehicle).",
              "State the legal requirement for EL under the Employers' Liability (Compulsory Insurance) Act 1969 and the £5m statutory minimum.",
              "Distinguish between PL (third-party physical damage) and PI (design/advice errors).",
              "Identify common policy exclusions (property in care, lapsed conditions, undeclared employees) and how to structure cover to avoid them.",
              "Identify the role of trade-specialist brokers and the value of annual cover review.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The core insurance stack</ContentEyebrow>

          <ConceptBlock
            title="Three core policies — PL, EL, PI"
            plainEnglish="Three policies form the core insurance stack for an electrical business. Public Liability (PL) covers third-party physical injury and property damage from your work. Employers' Liability (EL) covers employee claims for work-related injury or illness — legally mandatory under the Employers' Liability (Compulsory Insurance) Act 1969 from the day you employ anyone. Professional Indemnity (PI) covers liability for design and advice errors causing financial loss to customers."
            onSite="Most established UK electrical firms hold all three. Sole traders often start with PL only and add EL when they take on the first employee/apprentice. PI gets added when the work shifts from pure install to include any design, certification or technical advice. Each policy plugs a different gap; together they form the protective envelope around the business."
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Public Liability (PL)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Third-party injury / property damage from your work. &pound;5-10m cover.
                  &pound;200-500/year. Required by clients, CPS schemes, main contractors.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Employers&apos; Liability (EL)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Employee injury / illness claims. &pound;5m statutory minimum.
                  &pound;200-600/year. LEGALLY MANDATORY if you employ anyone &mdash;
                  including apprentices.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Professional Indemnity (PI)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Design / advice errors causing financial loss. &pound;1-2m typical.
                  &pound;200-500/year. Needed if you design, certify, advise or report.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Other policies you might need</ContentEyebrow>

          <ConceptBlock
            title="Tools-in-Transit, Business Vehicle, Cyber, Defective Workmanship"
            plainEnglish="Beyond the core PL/EL/PI stack, several additional policies may apply depending on the firm. Tools-in-Transit covers theft from your van. Business Vehicle insurance is the motor policy for your vans. Cyber insurance covers data breaches and cyber attacks (relevant if you hold customer data). Defective Workmanship extension covers post-completion claims from work defects."
            onSite="Tool theft is a real and growing UK problem — vans get broken into overnight, tools stolen and resold. Tools-in-Transit policies typically have specific conditions (alarm, lock-up, parking location). Read the conditions carefully — many claims are refused because the van wasn't parked in compliance with the policy. Defective workmanship is increasingly important as electrical work involves more complex equipment (PV inverters, EV chargers, BMS)."
          >
            <p>
              Common additional policies and typical costs:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Tools-in-Transit</strong> &mdash; theft of tools from van.
                &pound;100-300/year. Conditions on alarm, locking, parking location.
              </li>
              <li>
                <strong>Business Vehicle insurance</strong> &mdash; commercial van policy
                with &quot;business use&quot; class. &pound;600-1,200/year for a small van.
              </li>
              <li>
                <strong>Defective Workmanship extension</strong> &mdash; covers post-
                completion claims for installation defects. &pound;50-200/year on top of
                PL.
              </li>
              <li>
                <strong>Product Recall</strong> &mdash; cost of recalling products you
                supplied. Niche; relevant for firms supplying significant equipment.
              </li>
              <li>
                <strong>Cyber Insurance</strong> &mdash; data breach response, cyber attack.
                &pound;100-300/year for small firms.
              </li>
              <li>
                <strong>Contract Works</strong> &mdash; covers work in progress against
                damage. Sometimes required by main contractors.
              </li>
              <li>
                <strong>Plant and Equipment</strong> &mdash; covers fixed plant (e.g. test
                equipment, larger tools) against damage and theft.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Employers' Liability (Compulsory Insurance) Act 1969 (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The Employers&apos; Liability (Compulsory Insurance) Act 1969 requires:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    Every employer carrying on business in Great Britain to insure against
                    liability for bodily injury or disease sustained by employees in the
                    course of their employment.
                  </li>
                  <li>
                    Statutory minimum cover &pound;5 million per claim.
                  </li>
                  <li>
                    Certificate of insurance to be displayed at the workplace where employees
                    can readily see it.
                  </li>
                </ul>
                <p className="mt-2">
                  The Employers&apos; Liability (Compulsory Insurance) Regulations 1998 set
                  the detail. HSE enforces non-compliance: fines up to &pound;2,500 per day
                  for failure to insure; &pound;1,000 for failure to display the
                  certificate.
                </p>
              </>
            }
            meaning={
              <>
                EL is non-negotiable from day one of employing anyone, including apprentices.
                The statutory minimum &pound;5m is rarely enough for a serious claim &mdash;
                most insurers offer &pound;10m as standard. The certificate must be displayed
                where employees can see it (typically the workplace noticeboard or
                equivalent in a small firm). HSE inspectors check during workplace visits.
                Get cover before the first day of employment, not after.
              </>
            }
            cite="Source: Employers' Liability (Compulsory Insurance) Act 1969 (c.57) and Employers' Liability (Compulsory Insurance) Regulations 1998 (SI 1998/2573) — paraphrased from legislation.gov.uk."
          />

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.2 (general duties of employers)"
            clause={
              <>
                <p className="mb-2">
                  HASAWA s.2 places duties on employers to ensure, so far as is reasonably
                  practicable, the health, safety and welfare of all employees, including:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>Safe systems of work and safe use of plant.</li>
                  <li>Safe handling, storage and transport of articles and substances.</li>
                  <li>Information, instruction, training and supervision.</li>
                  <li>Safe place of work and safe access/egress.</li>
                  <li>Adequate welfare facilities.</li>
                </ul>
              </>
            }
            meaning={
              <>
                EL insurance is the financial backstop for HASAWA s.2 duties. If despite
                your best efforts an employee is injured at work, EL pays the resulting
                claim. But EL doesn&apos;t replace the s.2 duties &mdash; HSE prosecution
                for failure to manage safety can run alongside an EL claim. Treat
                health-and-safety management and EL insurance as complementary, not
                substitutes.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.2 — paraphrased from legislation.gov.uk."
          />

          <RegsCallout
            source="Road Traffic Act 1988 — s.143 (compulsory motor insurance)"
            clause={
              <>
                Section 143 of the Road Traffic Act 1988 makes it an offence to use a motor
                vehicle on a road or other public place without an insurance policy
                meeting the statutory requirements (third-party cover for personal injury
                and property damage). For commercial use the policy must include &quot;
                business use&quot; class.
              </>
            }
            meaning={
              <>
                Your van must have business-use motor insurance, not just SDP (social,
                domestic and pleasure). Driving to job sites is business use. SDP-only
                policies are void for business journeys. Tools in the van are typically not
                covered by motor insurance &mdash; you need separate Tools-in-Transit. Many
                trades fall foul of this distinction; check your policy schedule shows
                business use.
              </>
            }
            cite="Source: Road Traffic Act 1988 (c.52), s.143 — paraphrased from legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Taking on first apprentice without checking EL is in place"
            whatHappens={
              <>
                Sole-trader electrician takes on first apprentice in week 1. Doesn&apos;t
                check insurance &mdash; assumes existing PL covers everything. Three months
                in HSE inspector visits a job site for unrelated reasons, asks to see EL
                certificate. None exists. HSE issues an Improvement Notice and considers
                prosecution. Apprentice is also concerned about their cover.
              </>
            }
            doInstead={
              <>
                Get EL in place BEFORE the apprentice&apos;s first day. Tell your insurance
                broker you&apos;re hiring &mdash; they&apos;ll add EL to the policy
                (typically &pound;200-600/year). Display the certificate at your premises or
                in your van. EL is one of the few insurance lines that&apos;s actually
                criminally enforced &mdash; treat it as a non-negotiable pre-condition of
                employing anyone.
              </>
            }
          />

          <Scenario
            title="Customer claims fire damage from your install — what does insurance cover?"
            situation={
              <>
                Six months after you completed a kitchen rewire for a domestic customer, a
                fire breaks out and damages part of the kitchen. The insurance assessor for
                the customer&apos;s home insurance investigates and concludes the fire
                originated at the consumer unit you replaced. They&apos;re now pursuing a
                subrogated claim against you for &pound;15,000 of damages. What insurance
                covers what?
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; notify your insurance broker / insurer
                immediately</strong>. Don&apos;t admit liability or discuss the claim
                directly with the customer or their assessor &mdash; refer them to your
                insurer. Most policies require prompt notification of any potential claim;
                delay can void cover.
                <br /><br />
                <strong>Step 2 &mdash; check which policy covers</strong>. Standard PL
                covers third-party property damage from your work &mdash; should apply if
                your install actually caused the fire. Defective workmanship extension (if
                you have it) covers post-completion defects more cleanly. Without either,
                the claim could fall in the gap and you&apos;re personally liable.
                <br /><br />
                <strong>Step 3 &mdash; gather your evidence</strong>. Pull the EIC for that
                job, your test results, the schedule of test results, the photos of the
                completed install. Customer would have signed off the work at the time. The
                evidence pack helps your insurer defend the claim if causation is disputed.
                <br /><br />
                <strong>Step 4 &mdash; cooperate with the insurer&apos;s investigation</strong>.
                Insurer may instruct an expert assessor to examine the failed equipment.
                Cooperate fully. The forensic investigation often clarifies whether your
                install actually caused the fire (vs e.g. customer subsequently overloaded
                the circuit, or a separate equipment fault).
                <br /><br />
                <strong>Step 5 &mdash; learn for next time</strong>. Whatever the outcome,
                review whether your evidence pack on jobs is robust enough to defend
                against future claims. Photos, test results, signed sign-off sheets, copies
                of certificates retained for 6 years minimum. The paperwork is what wins
                (or loses) the dispute.
              </>
            }
            whyItMatters={
              <>
                Post-completion claims are the most common serious insurance claims for
                electrical firms. Without PL (or with a policy that excludes
                property-in-care and defective workmanship) you&apos;d be personally liable
                for the &pound;15,000. With proper cover, insurer handles it. The lesson:
                buy proper cover and keep the evidence pack robust on every job.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>The full insurance stack — what each policy actually does</ContentEyebrow>

          <ConceptBlock
            title="Public Liability (PL) — the foundation everyone needs"
            plainEnglish="Public Liability covers third-party injury and third-party property damage caused by your business activities. £5m cover is the typical CPS scheme minimum; £10m is increasingly demanded by commercial main contractors. Annual premium for a small electrical firm typically £200-500 at £5m cover. Critical exclusions to check: property in your care/custody/control (often excluded — needs separate cover), professional advice (excluded — needs PI), defective workmanship (often excluded for repair, included for damage caused by faulty workmanship)."
            onSite="PL is the policy you'll be asked for most often — every commercial customer, every main contractor, every CPS scheme audit, every letting agent. Have a digital copy of your certificate of insurance on your phone, ready to email. Renew on time — cover gaps are a serious problem. Read the policy schedule before you renew — the cheapest premium often has narrowest definition of 'electrical contracting' and excludes the work you actually do (e.g. excludes solar PV, EV charging, anything involving the supply being live)."
          >
            <p>
              PL practical specifics:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cover level</strong> &mdash; &pound;5m typical CPS minimum, &pound;10m for major main contractors.
              </li>
              <li>
                <strong>Premium</strong> &mdash; &pound;200&ndash;500/yr small firm, &pound;500&ndash;1,500 medium.
              </li>
              <li>
                <strong>Common exclusions</strong> &mdash; property in care/custody/control, defective workmanship per se.
              </li>
              <li>
                <strong>Specified activities</strong> &mdash; check renewables, EV, hot work, working at height all included.
              </li>
              <li>
                <strong>Sub-contractor cover</strong> &mdash; some policies include occasional sub-contractors; clarify if you use them.
              </li>
              <li>
                <strong>Excess</strong> &mdash; typically &pound;250&ndash;500.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Employers' Liability (EL) — legally compulsory once you have one employee"
            plainEnglish="Employers' Liability is legally compulsory under the Employers' Liability (Compulsory Insurance) Act 1969 from the moment you employ anyone — including apprentices, casual labour, and most sub-contractors operating under your direction. Minimum cover £5m (most policies issue at £10m as standard). Premium typically £200-600/year for a small firm with 1-3 employees. The certificate must be displayed at the workplace (or accessible electronically since 2008). Failure to hold EL when you have employees: £2,500/day fine."
            onSite="EL is non-negotiable from your first apprentice or labourer hire. The 'sub-contractor' question matters — HMRC and HSE may treat someone as your employee even if you call them a sub-contractor (similar to IR35 logic). Mate-and-driver style arrangements are particularly risky. Get the employment status assessed by your accountant or employment law adviser — wrongly classifying an employee as a sub-contractor and not having EL means a personal injury claim has no insurance backstop and can sink the business."
          >
            <p>
              EL key facts:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Legal basis</strong> &mdash; Employers' Liability (Compulsory Insurance) Act 1969.
              </li>
              <li>
                <strong>Minimum cover</strong> &mdash; &pound;5m statutory, &pound;10m typically issued.
              </li>
              <li>
                <strong>Required from</strong> &mdash; first employee (incl. apprentice).
              </li>
              <li>
                <strong>Premium</strong> &mdash; &pound;200&ndash;600/yr small firm.
              </li>
              <li>
                <strong>Display</strong> &mdash; certificate at workplace or electronic access.
              </li>
              <li>
                <strong>Penalty for non-compliance</strong> &mdash; &pound;2,500/day.
              </li>
              <li>
                <strong>Sub-contractor risk</strong> &mdash; mis-classified workers may still be 'employees' for EL purposes.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Professional Indemnity (PI) — the design and advice cover"
            plainEnglish="Professional Indemnity covers losses arising from your professional advice or design work — wrong advice, design errors, specification mistakes that cause customer financial loss. £500k-£2m cover typical for an electrical firm doing design work; £1-2m increasingly demanded by commercial customers. Premium £400-1,200/year depending on cover level and design scope. Critical for: firms doing D&B work, firms with in-house designers, firms specifying systems for customers, firms providing written reports (EICR with significant remedial recommendations), firms doing inspection and testing."
            onSite="PI is often overlooked by install-only firms but is increasingly important as your work scope broadens. An EICR with poor advice that leads to fire damage; a system specification that under-sizes a supply; a design recommendation that doesn't comply with current regs — all PI claims. Standard PL won't cover them because no third-party injury or property damage; the loss is purely the customer's financial loss following your advice. If you do EICRs, design work, or significant specification work, PI is not optional. Many CPS schemes now require minimum PI cover as scheme membership condition."
          >
            <p>
              PI cover scenarios:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Design error</strong> &mdash; under-sized supply causing customer to over-spend on remediation.
              </li>
              <li>
                <strong>EICR misdiagnosis</strong> &mdash; missed defect leading to subsequent fire/incident.
              </li>
              <li>
                <strong>Specification error</strong> &mdash; non-compliant equipment specified, customer pays for remediation.
              </li>
              <li>
                <strong>Wrong advice</strong> &mdash; verbal or written guidance that customer relies on at financial cost.
              </li>
              <li>
                <strong>Standard cover</strong> &mdash; &pound;500k&ndash;&pound;2m.
              </li>
              <li>
                <strong>Premium</strong> &mdash; &pound;400&ndash;1,200/yr.
              </li>
              <li>
                <strong>Run-off cover</strong> &mdash; needed for 6+ years after ceasing trading (claims can arise late).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Tools-in-Transit, Goods-in-Vehicle and Plant cover"
            plainEnglish="Tool theft from vans is one of the most common claims for electrical firms. Standard motor insurance does not cover tools or stock in the vehicle — that needs specific Tools-in-Transit / Goods-in-Vehicle cover. Typical limits £3,000-£10,000 per vehicle, premium £150-400/year. Many policies require overnight off-street parking (driveway, locked garage, secure compound) — read the small print. Plant cover (separate) for higher-value equipment — fusion splicer, megger MFT, thermal camera, larger generators — typically itemised on a goods schedule with full replacement-value cover."
            onSite="Tool theft is endemic in UK construction — over 10,000 reported tool thefts from vans annually, with electrical tools a prime target (high resale value, easy to fence). Practical mitigation alongside insurance: lockable van shelving, alarmed vehicle, deadlocks, GPS tracker, photographing tools individually for the insurance claim, marking tools with UV-pen ID, garaging the van overnight where possible. Insurers expect to see reasonable security or premiums rocket. The Lighthouse Construction Industry Charity (0345 605 1956) offers grants for stolen tools as a hardship measure if you're caught short."
          >
            <p>
              Tool/equipment cover essentials:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Tools-in-Transit</strong> &mdash; cover whilst in vehicle; typically &pound;3&ndash;10k per van.
              </li>
              <li>
                <strong>Tools-in-Premises</strong> &mdash; cover at home/workshop; check sub-limit.
              </li>
              <li>
                <strong>Goods-in-Vehicle</strong> &mdash; covers stock/materials in transit, often a sub-limit of TIT.
              </li>
              <li>
                <strong>Plant cover</strong> &mdash; for higher-value items, itemised schedule, full replacement value.
              </li>
              <li>
                <strong>Overnight parking conditions</strong> &mdash; off-street parking often required.
              </li>
              <li>
                <strong>Tool marking</strong> &mdash; UV pen, datadot, registered serial numbers help recovery and claim acceptance.
              </li>
              <li>
                <strong>Premium</strong> &mdash; &pound;150&ndash;400/yr Tools-in-Transit.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Business Vehicle Insurance — class of use and what it actually covers"
            plainEnglish="A 'private car' policy does not cover your van being used for business — wrong class of use. Electrical business vehicles need 'Class 3' (commercial use, carrying tools and equipment, multiple sites) or 'Hire & Reward' (if carrying customer goods or collecting/delivering on someone else's behalf). Premiums £600-1,400/year typical for a single van depending on driver age, claims history, postcode, vehicle value. Multi-vehicle policies (3+ vans) often consolidate at lower per-vehicle rates. Modified vans (extra ply lining, secondary battery, roof rack, racking) need declaration."
            onSite="Standard mistakes that void cover: claiming on a private policy when actually using business; not declaring modifications; carrying employees as passengers under a 'business use - sole driver' policy; using the van for delivery work (Hire & Reward). Telematics policies (black-box) are increasingly common for younger drivers and reduce premiums significantly. Get a broker (not direct comparison sites) for commercial vehicles — broker can place business cover with specialist insurers (Tradesman, Premierline, NIG, Aviva Trades) at significantly better rates than mainstream insurers."
          >
            <p>
              Vehicle insurance class of use:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Class 1</strong> &mdash; commuting only.
              </li>
              <li>
                <strong>Class 2</strong> &mdash; business use, single named driver only.
              </li>
              <li>
                <strong>Class 3</strong> &mdash; commercial use, multiple drivers, carrying tools to multiple sites.
              </li>
              <li>
                <strong>Hire &amp; Reward</strong> &mdash; carrying customer goods, delivery work.
              </li>
              <li>
                <strong>Trade plates</strong> &mdash; for vehicles being moved between trade premises (rarely relevant for electricians).
              </li>
              <li>
                <strong>Multi-vehicle discount</strong> &mdash; 3+ vans often pools at lower per-vehicle rate.
              </li>
              <li>
                <strong>Premium</strong> &mdash; &pound;600&ndash;1,400/yr typical single van.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Income Protection and Critical Illness — the personal-side cover most electricians skip"
            plainEnglish="Self-employed electricians have no employer sick pay scheme. Statutory Sick Pay is only £116.75/week (2024-25) and only for employees, not the self-employed. An injury or serious illness that takes you off work for 3-6 months can clean out savings and put the business under. Income Protection insurance pays a monthly benefit (typically 50-65% of income) if you can't work due to injury or illness, paid until you can return to work or until policy term ends. Premium £40-120/month for an electrician depending on age, smoker status, deferment period (waiting period before benefit kicks in)."
            onSite="Income Protection is the single most-overlooked policy in the small-firm electrical world. Most electricians carry full PL/EL but no IP — meaning a broken arm from a ladder fall (covered by NHS, no PL claim) leaves them 6 weeks without income and no insurance backstop. Critical Illness Cover is a related but different product — pays a lump sum if you're diagnosed with one of the named serious illnesses (cancer, heart attack, stroke). Often bundled with life insurance for mortgage protection. The Electrical Industries Charity (electricalcharity.org) provides hardship grants for electricians and families in genuine financial crisis — but personal insurance is the proper plan."
          >
            <p>
              Personal-side insurance products:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Income Protection</strong> &mdash; monthly benefit if unable to work; 50&ndash;65% of income; until recovery.
              </li>
              <li>
                <strong>Critical Illness Cover</strong> &mdash; lump sum on diagnosis of named serious illness.
              </li>
              <li>
                <strong>Life Insurance</strong> &mdash; lump sum to dependants on death.
              </li>
              <li>
                <strong>Personal Accident</strong> &mdash; lump sum on accidental injury, often bundled.
              </li>
              <li>
                <strong>Mortgage Protection</strong> &mdash; designed to clear mortgage on death/critical illness.
              </li>
              <li>
                <strong>Premium</strong> &mdash; varies massively by age, health, occupation, cover level.
              </li>
              <li>
                <strong>Backstop</strong> &mdash; Electrical Industries Charity hardship grants for genuine crisis.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Employers' Liability (Compulsory Insurance) Act 1969 — s.1 (compulsory insurance)"
            clause={
              <>
                "Except as otherwise provided by this Act, every employer carrying on any business in Great Britain
                shall insure, and maintain insurance, under one or more approved policies with an authorised insurer
                or insurers against liability for bodily injury or disease sustained by his employees, and arising out
                of and in the course of their employment in Great Britain in that business... The amount for which an
                employer is required by this Act to insure and maintain insurance shall be not less than five million
                pounds in respect of claims relating to any one or more of his employees arising out of any one
                occurrence."
              </>
            }
            meaning={
              <>
                EL is one of the few genuinely compulsory insurances for a UK business. The £5m statutory minimum is
                low (most policies are issued at £10m as standard). Failure to hold EL when you have employees is a
                criminal offence carrying a fine of up to £2,500 per day of non-compliance, and additional penalties
                if you fail to display the certificate. As an electrical firm with one or more apprentices,
                labourers or improvers, EL is non-negotiable from the moment you make the first hire. Many
                contractor-disqualification cases include EL non-compliance as an aggravating factor.
              </>
            }
            cite="Source: Employers' Liability (Compulsory Insurance) Act 1969 (c.57), s.1 — paraphrased and summarised from legislation.gov.uk."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Public Liability (PL) covers third-party injury and property damage. £5-10m cover, £200-500/year. Required by commercial clients, CPS schemes, main contractors.",
              "Employers' Liability (EL) is LEGALLY MANDATORY under the Employers' Liability (Compulsory Insurance) Act 1969 if you employ anyone — including apprentices. £5m statutory minimum.",
              "Professional Indemnity (PI) covers design and advice errors. £1-2m typical. Needed if you do any design, EICR reports, certification, technical consultancy.",
              "Tools-in-Transit covers theft from van. Conditions on alarm, locking, parking. Tool theft is a major UK trades risk.",
              "Business Vehicle insurance must include 'business use' class — driving to job sites is business use; SDP-only voids cover.",
              "Defective Workmanship extension covers post-completion install defect claims — important as electrical work involves more complex equipment.",
              "Trade-specialist brokers (NICEIC Insurance, NAPIT Insurance, ECA Insure, Hiscox, Tradesman Saver) typically offer better-fitting policies than generic comparison sites.",
              "Annual review of cover levels matters as business grows. Don't auto-renew without comparison.",
              "Property-in-care exclusion is a common gotcha — standard PL may exclude damage to the very equipment you're working on. Get cover that addresses this.",
            ]}
          />

          <Quiz title="Insurance stack — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section3-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.1 Legal forms
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section3-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.3 Pricing + invoicing
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
