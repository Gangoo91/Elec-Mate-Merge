/**
 * Module 4 · Section 5 · Subsection 4 — Safe disposal of damaged equipment + leaving the area safe
 * Maps to C&G 2365-03 / Unit 303 / LO5 / AC 5.3 (partial) + AC 5.4 (partial)
 *   AC 5.3 — "specify methods for replacement of damaged equipment and components"
 *   AC 5.4 — "specify the procedures for the safe disposal of waste materials"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 5.3 + 5.4 — methods for the safe
 * disposal of damaged components and the procedures for leaving the work area
 * in a safe condition.
 *
 * Frame: rectification produces waste — failed RCBOs, scorched accessories,
 * burnt cable offcuts, crushed conduit, mercury-bearing fluorescent tubes,
 * lithium battery packs from emergency lighting. Each waste stream has a
 * legal route. Plus the area itself has to be left safe before walking out.
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
  "Safe disposal + leaving the area safe (5.3/5.4) | Level 3 Module 4.5.4 | Elec-Mate";
const DESCRIPTION =
  "WEEE Regulations, Hazardous Waste (England and Wales) Regulations, Duty of Care under EPA 1990 — how the L3 apprentice routes failed RCBOs, scorched MK sockets, burnt cable, mercury-bearing fluorescent tubes and lithium emergency lighting batteries. Plus the leave-area-safe checklist before walking out.";

const checks = [
  {
    id: "mod4-s5-sub4-weee",
    question:
      "You've replaced a failed Hager NDN132B 32 A RCBO and a scorched MK Logic Plus K2747 socket front. Where do these go after the job?",
    options: [
      "General waste skip.",
      "WEEE — Waste Electrical and Electronic Equipment. Both items contain electronic components (RCBO has the residual current detection electronics, the MK socket assembly itself is borderline but the burnt one is contaminated). Standard route is the firm's WEEE bin (most electrical wholesalers — CEF, Edmundson, Rexel — accept trade WEEE returns free under the Distributor Take-Back Scheme). DON'T skip-bin them. WEEE Regulations 2013 make the producer / distributor responsible for end-of-life routing, but it lands on the contractor in practice. Document on the job sheet.",
      "Customer's bin.",
      "Bury them.",
    ],
    correctIndex: 1,
    explanation:
      "Failed protective devices and scorched accessories are WEEE. The Distributor Take-Back Scheme makes wholesalers (CEF, Edmundson, Rexel) accept trade returns at the counter. Routing them through the customer's general waste is non-compliant and the firm carries the Duty of Care under EPA 1990 s.34 regardless of where the waste physically ends up.",
  },
  {
    id: "mod4-s5-sub4-fluorescent",
    question:
      "You're replacing a failed 5-foot 58 W T8 fluorescent tube in a workshop fitting. The tube is intact. Where does it go?",
    options: [
      "Smash and bin.",
      "Hazardous waste. Fluorescent tubes contain mercury vapour (typically 3–5 mg per 5-foot tube) — that's enough to make the tube a Hazardous Waste under the Hazardous Waste (England and Wales) Regulations 2005. NEVER smash on site (releases mercury vapour). Transport intact in the original sleeve or a tube-tube; route via a licensed hazardous waste carrier or a wholesaler with a tube-recycling scheme (CEF, Edmundson run these). The firm needs to hold the Consignment Note (or Hazardous Waste Annual Return registration if they generate over 500 kg / year). Disposal cost is around £1–2 per tube.",
      "Recycle bin.",
      "Customer's general waste.",
    ],
    correctIndex: 1,
    explanation:
      "Fluorescent tubes are Hazardous Waste because of the mercury content. Smashing on site is a serious environmental breach and a personal exposure risk. Intact transport + licensed disposal route is the only compliant path. The Consignment Note is the documentary trail proving the firm met its Duty of Care.",
  },
  {
    id: "mod4-s5-sub4-leave-safe",
    question:
      "You've completed rectification on a kitchen ring final at 19:30. The customer is back at 21:00. You're packing up. What's the leave-area-safe checklist?",
    options: [
      "Just leave.",
      "Six-point check. (1) ENERGISE the rectified circuit AND verify the affected sockets work (kettle test or known-good appliance). (2) ALL other circuits restored to their pre-visit state — check no breakers left off, no insulation tape on terminals. (3) DB closed and locked, cover screws back in. (4) NO TOOLS / OFFCUTS / WASTE left in the work area — sweep visually before walking out. (5) NO TRIP HAZARDS — cables clipped, carpet replaced, kitchen drawers closed. (6) CUSTOMER HANDOVER — show them the work, demonstrate the fix, hand over the certificate, explain any follow-up. The customer arriving home to a dark kitchen because you forgot to flick a breaker back on is the worst hand-back failure.",
      "Take photos.",
      "Send invoice.",
    ],
    correctIndex: 1,
    explanation:
      "Leave-area-safe is the closing routine that turns a completed fix into a satisfied customer. It's also the EAWR Reg 4 + HSWA s.3 (duty to non-employees) closing duty — when you walk out, the installation has to be in a state where the customer or anyone else can use it without harm. Skipping any of the six points is how walk-out incidents happen.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Why does the WEEE Regulations 2013 framework apply to a failed RCBO that you've replaced under a fault rectification visit?",
    options: [
      "It doesn't.",
      "WEEE applies to electrical and electronic equipment that has reached end-of-life — and a failed protective device is exactly that. The Regulations make the producer (Hager, MK, Schneider) responsible for funding end-of-life recovery, with the distributor (CEF, Edmundson, Rexel) operating the Take-Back Scheme at the counter. The contractor's role is to ROUTE the WEEE into that scheme rather than into general waste — the firm holds the Duty of Care under Environmental Protection Act 1990 s.34 for any waste it produces. Skipping the scheme and putting WEEE in the customer's bin breaches both the producer-responsibility framework and the Duty of Care.",
      "Just bin it.",
      "Send to the customer.",
    ],
    correctAnswer: 1,
    explanation:
      "WEEE is one of the cornerstones of UK environmental waste law — producer responsibility (the manufacturer funds the system), distributor take-back (the wholesaler operates the collection point), end-user responsibility (the contractor routes the waste correctly). For an L3 apprentice, the practical action is — failed device goes in the firm's WEEE bag, which goes back to the wholesaler at the next trade-counter visit. Free of charge; legally compliant; documented.",
  },
  {
    id: 2,
    question:
      "What's the legal status of a fluorescent tube under the Hazardous Waste (England and Wales) Regulations 2005?",
    options: [
      "Not hazardous.",
      "Hazardous Waste under EWC code 20 01 21* (the asterisk denotes hazardous). Fluorescent tubes contain mercury vapour — typically 3–5 mg in a 5-foot T8, less in modern T5 and CFL. Mercury is acutely toxic if inhaled and persistent in the environment. Producers of hazardous waste who generate over 500 kg / year must register with the Environment Agency; under that threshold the firm is exempt but still has the Duty of Care to use a licensed carrier and disposal route. Consignment Notes accompany the waste and are kept for three years.",
      "Just glass.",
      "General waste.",
    ],
    correctAnswer: 1,
    explanation:
      "EWC 20 01 21* — fluorescent tubes and other mercury-containing waste — is one of the most commonly encountered hazardous waste streams in electrical work. The L3 apprentice routes intact tubes via the wholesaler tube-recycling scheme or the firm's hazardous waste carrier; the Consignment Note is the documentary proof. Smashing on site exposes the apprentice and contaminates the area with mercury vapour.",
  },
  {
    id: 3,
    question:
      "An emergency lighting fitting has a failed 4 V 4 Ah sealed lead-acid battery. How does this differ from a lithium-ion battery from a more modern fitting and what's the disposal route?",
    options: [
      "Same — bin both.",
      "Both are batteries under the Waste Batteries and Accumulators Regulations 2009 — separate stream from WEEE, separate Take-Back Scheme via wholesalers and battery distributors. Lead-acid (older emergency lighting, alarm panels) — non-spillable but contains lead and sulphuric acid; route via the wholesaler battery bin or a licensed battery recycler. Lithium-ion (newer fittings, including some LED emergency packs) — fire risk if punctured, short-circuited or thermally abused; tape the terminals, transport in a non-conductive container, never bin. Both routes are free at the wholesaler; both are legal requirements.",
      "Lead is fine.",
      "Lithium is fine.",
    ],
    correctAnswer: 1,
    explanation:
      "Batteries Regulations are separate from WEEE — even though batteries come out of WEEE products, they have their own Take-Back Scheme. Lithium-ion is the higher-risk stream because of fire potential — terminals taped, kept apart from metal offcuts in the van, routed through the wholesaler battery bin or a specialist recycler. The Hermes / Royal Mail networks DO NOT accept lithium batteries by post.",
  },
  {
    id: 4,
    question:
      "Cable offcuts after rectification — what's the route and why does it matter?",
    options: [
      "General skip.",
      "Cable is mixed-material waste — copper conductor, PVC insulation, sometimes aluminium tape, sometimes a steel wire armour. Pure copper is high-value scrap (£4–6 / kg in 2026) and most firms collect offcuts in a copper-only bag for the wholesaler weighbridge or a licensed scrap dealer. PVC-only sheath / insulation goes to general construction waste. SWA cable contains steel and is normally segregated. The L3 apprentice keeps offcuts segregated; the firm gets the scrap value back; the disposal is compliant. NEVER burn PVC insulation off scrap copper — releases dioxins and is a criminal offence under the Environmental Permitting Regulations.",
      "Just bury.",
      "Burn it off.",
    ],
    correctAnswer: 1,
    explanation:
      "Cable scrap is one of the few waste streams that pays the firm rather than costing it — copper is valuable, scrap dealers pay by weight. Segregation at the point of generation (separate bag for copper, separate for general) is the practical step. Burning the insulation off is illegal and a serious environmental offence — dioxins are persistent, toxic, and the Environment Agency prosecutes when caught.",
  },
  {
    id: 5,
    question:
      "The Duty of Care under Environmental Protection Act 1990 s.34 says what about waste produced by a contractor on a customer's premises?",
    options: [
      "The customer owns it.",
      "The waste belongs to the contractor who produced it (the firm doing the work), and the firm carries the Duty of Care all the way until the waste reaches a licensed disposal facility. That means — the firm must (a) prevent the waste escaping, (b) only transfer it to an authorised carrier, (c) ensure it's accompanied by a Waste Transfer Note (or Consignment Note for hazardous), (d) keep records for at least two years (three for hazardous). Leaving WEEE or hazardous waste in the customer's general bin transfers nothing legally — the firm still carries the duty and is liable if the waste is found in the wrong place.",
      "Anyone can take it.",
      "It's the wholesaler's.",
    ],
    correctAnswer: 1,
    explanation:
      "EPA 1990 s.34 is the cornerstone of the UK waste-management framework — the Duty of Care travels with the waste-producer, not the waste itself. For a contractor on a customer's premises, the practical implication is — every bag of waste leaves with the contractor unless the customer has explicitly agreed to take it (and even then the contractor's liability for incorrect routing isn't fully transferred). The Waste Transfer Note (£0 to issue, available free from the Environment Agency) is the documentary proof.",
  },
  {
    id: 6,
    question:
      "Asbestos insulation found inside an old Wylex consumer unit during rectification — what's the immediate response?",
    options: [
      "Pull it out.",
      "STOP. Asbestos is a notifiable hazardous material under the Control of Asbestos Regulations 2012 — even a small amount in an old DB. (1) STOP work immediately, do not disturb further. (2) ISOLATE the area (the customer and other trades out of the room). (3) DOCUMENT what you found (mobile photo from a safe distance — do NOT touch). (4) ESCALATE to the supervisor — the supervisor coordinates a licensed asbestos contractor (HSE-licensed for asbestos removal work). (5) NEVER attempt removal yourself; an L3 apprentice is not licensed for asbestos. The cost of getting this wrong is health-life — asbestos-related disease has a 20–40 year latency, and the legal liability is criminal.",
      "Vacuum it.",
      "Just continue.",
    ],
    correctAnswer: 1,
    explanation:
      "Asbestos is the canonical 'stop and escalate' situation. Old Wylex DBs (pre-1980s), some old switchgear, some flame-proof boxes, some heating insulation — asbestos can appear unexpectedly. The L3 apprentice's job is to RECOGNISE the possibility, STOP work, and ESCALATE — not to deal with it. Trying to handle it yourself is a Control of Asbestos Regulations breach AND a personal health risk that can take decades to manifest.",
  },
  {
    id: 7,
    question:
      "Before walking out at the end of a rectification visit, what's the LAST documentary action you take?",
    options: [
      "Just go.",
      "Three-step closing: (1) Update the Minor Works Certificate or EICR + remedial works certificate with the WORK DONE field — what was found, what was replaced, what tests passed. (2) Sign the Designer / Constructor / Inspector boxes with name, date, signature. (3) Complete the customer hand-back — show them the certificate, give them the copy (paper or PDF email), explain the warranty terms. The certificate is the legal record that BS 7671 643 testing was done and passed; the customer's copy is their proof for insurance / sale / building control. Walking out without the certificate is not a complete job — and no certificate means no BS 7671 compliance demonstration.",
      "Photo only.",
      "Verbal only.",
    ],
    correctAnswer: 1,
    explanation:
      "The certificate is the documentary closure of the work. BS 7671 Part 6 (Inspection and Testing) requires a certificate for new circuits, additions and alterations; remedial works after EICR-found faults need a Minor Works Certificate (small scope) or EIC (larger scope). The customer's copy is their Building Regs / insurance proof. Without it, the work was done but not formally completed.",
  },
  {
    id: 8,
    question:
      "What's the practical kit an L3 apprentice carries in the van for compliant waste segregation on a typical rectification visit?",
    options: [
      "One bin bag.",
      "Five-bag setup, all clearly labelled: (1) WEEE — failed devices, scorched accessories, electronic components. (2) BATTERIES — taped terminals, separate from metalwork. (3) HAZARDOUS — fluorescent tubes (intact, in tube tube), CFLs, mercury switches. (4) COPPER SCRAP — cable offcuts (insulation on, never stripped by burning), bare copper offcuts. (5) GENERAL — packaging, plastic offcuts, non-recyclable. Each bag goes to its correct route at the next wholesaler trip OR firm scrap collection. The five-bag system makes compliance routine, not a special effort.",
      "Just hands.",
      "Customer bin.",
    ],
    correctAnswer: 1,
    explanation:
      "Segregation at the point of generation is the practical key to compliance. The five-bag system in the van is industry standard — costs the firm £20 / year in bag stock and saves the firm hundreds in disposal cost (copper scrap pays back), avoids prosecution risk, and makes the apprentice's day-to-day decisions automatic rather than effortful.",
  },
];

const faqs = [
  {
    question: "Can I leave waste in the customer's wheelie bin if they say it's OK?",
    answer:
      "Legally no — the Duty of Care under Environmental Protection Act 1990 s.34 stays with the contractor who produced the waste. The customer's verbal agreement doesn't transfer the legal duty. If WEEE or hazardous waste turns up in the customer's bin, the local authority traces it back, the contractor carries the prosecution risk. Practically the only waste that can go in a customer's bin is genuine general waste (plastic packaging from a new accessory, for example) and even then most firms route it through their own van for tidiness and audit-trail reasons.",
  },
  {
    question: "What's a Waste Transfer Note and when do I need one?",
    answer:
      "Waste Transfer Note is the document that accompanies non-hazardous waste when it changes hands — the contractor (waste producer) hands the waste to a registered carrier (could be the firm itself if registered, or a licensed waste contractor), and the WTN records what waste, how much, where it's going. Required for any commercial waste transfer; not required for waste taken back to the firm's own premises in the firm's own van. Available free from the Environment Agency or pre-printed from suppliers. Keep for two years. For hazardous waste it's a Consignment Note (more detail, kept three years).",
  },
  {
    question: "Why can't I just smash a fluorescent tube into a bin?",
    answer:
      "Three reasons. (1) Mercury vapour release — a 5-foot T8 contains 3–5 mg of mercury in vapour form; smashing releases it into the air you're breathing. Acute exposure causes headache, nausea; chronic exposure damages kidneys and central nervous system. (2) Glass fragments puncture bin bags and cause injury to waste handlers downstream. (3) Hazardous Waste Regulations make smashing-and-binning a documentation breach — the tube was hazardous before you smashed it, and changing its physical form doesn't change its legal status. Intact transport via the wholesaler tube scheme is the only compliant route.",
  },
  {
    question: "Are LED tubes and lamps still hazardous waste?",
    answer:
      "LED lamps and tubes don't contain mercury so they're not hazardous waste in the same way fluorescent is — but they ARE WEEE because they contain electronics (driver, LED chips, sometimes a small capacitor). Route via the WEEE Take-Back Scheme at the wholesaler or via the firm's WEEE bag. Don't put them in general waste — the WEEE Regulations apply because of the electronic content. Some LED retrofit tubes still contain a small driver PCB inside the end cap that contains traces of regulated substances under RoHS.",
  },
  {
    question: "What happens if the firm gets caught putting WEEE in general waste?",
    answer:
      "The Environment Agency or the local authority can take action under several routes — Fixed Penalty Notice (typically £300–£500 per breach for the firm), formal Caution, or for repeat / serious breaches a prosecution under the WEEE Regulations 2013 or the EPA 1990. The fines can run into thousands per offence, and a prosecution carries an unlimited fine in the magistrates' court. Beyond the legal cost, the reputational cost on local authority and commercial frameworks is significant — many public-sector contracts require the contractor to demonstrate compliant waste routing as a tender condition. A small upfront discipline (the five-bag van system) prevents all of it.",
  },
  {
    question: "How long do I keep the certificates and waste documents after the job?",
    answer:
      "Different retention periods by document type. Electrical certificates (EIC, MWC, EICR, Minor Works) — recommended retention is the lifetime of the installation, but most firms keep at least seven years for Companies Act / VAT / professional liability reasons, and they're also the customer's record so duplicate copies live with them too. Waste Transfer Notes — two years minimum under EPA 1990. Hazardous Waste Consignment Notes — three years minimum. Risk assessments and method statements — three years minimum, often kept longer. The firm's compliance system normally automates this; the L3 apprentice's job is to make sure the document gets filed, not to remember the period.",
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module4-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5 · Subsection 4"
            title="Safe disposal of damaged equipment + leaving the area safe"
            description="WEEE, Hazardous Waste, Batteries Regulations, EPA 1990 Duty of Care — the legal routing of failed RCBOs, scorched MK accessories, mercury-bearing fluorescent tubes, lithium emergency lighting batteries — plus the leave-area-safe checklist that closes every rectification visit."
            tone="emerald"
          />

          <TLDR
            points={[
              "WEEE Regulations 2013 cover failed devices and scorched electrical accessories — route via the wholesaler Distributor Take-Back Scheme (CEF, Edmundson, Rexel — free of charge).",
              "Fluorescent tubes are Hazardous Waste (mercury vapour) — never smash on site; intact transport, wholesaler tube-recycling scheme, Consignment Note for the trail.",
              "EPA 1990 s.34 Duty of Care travels with the waste-producer — the firm carries it until the waste reaches a licensed facility. Customer's bin is not a transfer of duty.",
              "Leave-area-safe is a six-point check before walking out — energise, restore other circuits, lock DB, no tools / waste / trip hazards left, customer hand-back with certificate.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Apply the WEEE Regulations 2013 framework to failed protective devices and scorched accessories — Distributor Take-Back Scheme via wholesalers.",
              "Apply the Hazardous Waste (England and Wales) Regulations 2005 to fluorescent tubes, CFLs and other mercury-bearing waste — intact transport, licensed disposal route, Consignment Note.",
              "Apply the Waste Batteries and Accumulators Regulations 2009 to lead-acid and lithium-ion batteries — separate stream, terminal taping for lithium, wholesaler battery bin.",
              "Apply the Environmental Protection Act 1990 s.34 Duty of Care to waste produced on a customer's premises — the firm carries the duty until licensed disposal.",
              "Recognise the limits of L3 apprentice authority — asbestos found in old switchgear is a STOP-and-escalate situation, never an apprentice removal.",
              "Apply the leave-area-safe six-point check at the close of every rectification visit — energise, restore, lock, sweep, customer hand-back, certificate.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The four waste-law frameworks you live under</ContentEyebrow>

          <ConceptBlock
            title="WEEE, Hazardous Waste, Batteries, Duty of Care — the four pillars"
            plainEnglish="UK waste law for an electrical contractor sits on four legal frameworks that overlap. WEEE (electronics end-of-life), Hazardous Waste (mercury, asbestos, oils), Batteries (separate stream from WEEE), and the umbrella Duty of Care under EPA 1990. Knowing which framework catches which waste stream is the L3 step-up from L2 (where 'put it in the bin' was the typical answer)."
            onSite="Most rectification visits produce a mix — failed RCBO (WEEE), fluorescent tube (Hazardous), emergency light battery (Batteries), cable offcuts (general / scrap copper), packaging (general). The five-bag van system in the FAQ map closely to these four frameworks plus copper scrap."
          >
            <p>The four frameworks and what they catch:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>WEEE Regulations 2013</strong> — anything electrical or electronic at end of life. Failed RCBOs, scorched accessories, dead LED drivers, broken sensors, old smoke alarms.</li>
              <li><strong>Hazardous Waste (England and Wales) Regulations 2005</strong> — mercury (fluorescent tubes, CFLs), asbestos (old DBs), oils (transformer / switchgear), some batteries.</li>
              <li><strong>Waste Batteries and Accumulators Regulations 2009</strong> — separate stream from WEEE. Lead-acid (emergency lighting, alarm panels), lithium-ion (newer fittings), nickel (some industrial).</li>
              <li><strong>Environmental Protection Act 1990 s.34</strong> — the umbrella Duty of Care. Producer responsibility, authorised carrier, Waste Transfer Note (or Consignment Note for hazardous), record retention.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Environmental Protection Act 1990 — Section 34 (Duty of Care)"
            clause={
              <>
                "It shall be the duty of any person who imports, produces, carries, keeps, treats, disposes of or, as a dealer, has control of controlled waste, to take all such measures applicable to him in that capacity as are reasonable in the circumstances &mdash; (a) to prevent any contravention by any other person of section 33 above; (b) to prevent the escape of the waste from his control or that of any other person; (c) on the transfer of the waste, to secure that the transfer is only to an authorised person; AND (d) on the transfer of the waste, that there is transferred such a written description of the waste as will enable other persons to comply with the duty under this section as respects the escape of the waste from their control."
              </>
            }
            meaning={
              <>
                The Duty of Care travels with the waste-producer (the contractor) all the way until the waste reaches a licensed facility. Practical implications &mdash; (1) prevent escape (closed bags, no fly-tipping), (2) authorised transfer only (registered carrier), (3) Waste Transfer Note accompanies every transfer (Consignment Note for hazardous), (4) records kept for two years (three for hazardous). Leaving waste in a customer's bin transfers neither the waste nor the duty &mdash; the contractor remains liable.
              </>
            }
            cite="Source: Environmental Protection Act 1990 s.34."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Hazardous waste — fluorescent, CFL, asbestos</ContentEyebrow>

          <ConceptBlock
            title="Mercury, asbestos and the legal trail"
            onSite="Every old domestic kitchen fluorescent fitting, every workshop tube, every commercial CFL — mercury inside. Every pre-1980s Wylex consumer unit, every old fuse holder with mineral insulation, every old sub-station switchgear — possible asbestos. The L3 apprentice meets both regularly and the response to each is tightly defined."
          >
            <p>Hazardous waste handling for L3 apprentices:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Fluorescent tubes / CFLs</strong> — intact transport in the original sleeve or a tube tube. Wholesaler take-back (CEF, Edmundson, Rexel) is normal. Never smash on site.</li>
              <li><strong>Asbestos in old switchgear</strong> — STOP, isolate the area, photograph from a safe distance, escalate to supervisor. NEVER attempt removal. Licensed asbestos contractor required under CAR 2012.</li>
              <li><strong>Capacitor oils (older PFC capacitors, transformers)</strong> — possible PCBs in pre-1986 equipment. Treat as hazardous; specialist disposal route.</li>
              <li><strong>Consignment Note</strong> — accompanies hazardous waste transfer; firm keeps three years; identifies the EWC code and the disposal route.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Hazardous Waste (England and Wales) Regulations 2005 — Reg 35"
            clause={
              <>
                "A producer of hazardous waste must, before it leaves his premises, ensure that a consignment note has been completed in accordance with regulation 36 in respect of that waste."
              </>
            }
            meaning={
              <>
                Every transfer of hazardous waste off the premises requires a Consignment Note. The firm completes the producer section; the carrier completes the transport section; the disposal facility completes the destination section. The note has to be retained for three years. For an L3 apprentice, the practical implication is &mdash; ensure waste leaves with documentation, never in a back-of-van pile that would not survive an Environment Agency stop-check.
              </>
            }
            cite="Source: Hazardous Waste (England and Wales) Regulations 2005, Reg 35."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The leave-area-safe routine</ContentEyebrow>

          <ConceptBlock
            title="The closing six-point check that turns 'work done' into 'safely handed back'"
            plainEnglish="Walking out without the closing routine is how the small disasters happen — customer arrives home to a dark kitchen because a breaker is still off, finds tools left in the cupboard, trips on a cable left across the hall. The six-point check is 90 seconds at the end of a job and prevents the comeback visit."
            onSite="The six points map to BS 7671 Part 6 verification (energise + functional test), EAWR Reg 4 (system left in safe condition), HSWA s.3 (duty to non-employees — the customer who walks back into the property), the Building Regs (the certificate as documentary closure), and customer-experience common sense (no tools left)."
          >
            <p>The six-point leave-area-safe check:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>(1) Energise + verify</strong> — the rectified circuit on, the load tested (kettle, lamp, appliance switched on at the affected socket / switch).</li>
              <li><strong>(2) Restore other circuits</strong> — every breaker that was off for the work back on; insulation tape removed from terminals; any temporary jumpers removed.</li>
              <li><strong>(3) DB closed and locked</strong> — cover screws back in, no exposed live parts at the consumer unit.</li>
              <li><strong>(4) Sweep the work area</strong> — no tools, no offcuts, no waste left. Visual scan from doorway.</li>
              <li><strong>(5) No trip hazards</strong> — cables clipped, carpet replaced, kitchen drawers and cupboards closed.</li>
              <li><strong>(6) Customer hand-back</strong> — show the work, demonstrate the fix, hand over the certificate (Minor Works or EIC), explain warranty + any follow-up.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>WEEE evidence and the duty-of-care chain</ContentEyebrow>

          <ConceptBlock
            title="The waste paperwork that comes back at audit time"
            plainEnglish="Hazardous and electrical waste leaves a documentary trail. The L3 apprentice carries blank consignment notes, knows where the firm&apos;s waste-carrier registration lives, and never hands waste to anyone who can&apos;t produce theirs."
            onSite="The Environment Agency Waste Carriers Register is searchable online; check before you let an unfamiliar van drive off with a stack of CUs. SEPA in Scotland, NIEA in Northern Ireland, NRW in Wales run equivalent registers."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Waste Transfer Note</strong> &mdash; non-hazardous WEEE. Description, EWC code, weight, transferor and transferee details, signed both sides.</li>
              <li><strong>Hazardous Waste Consignment Note</strong> &mdash; for fluorescent / CFL lamps, capacitors with PCBs, lead-acid batteries. Five-part form, retained for three years.</li>
              <li><strong>Producer registration</strong> &mdash; over 5&nbsp;tonnes per year of WEEE, the firm registers as a producer with the EA.</li>
              <li><strong>Photo evidence</strong> &mdash; on smaller domestic jobs where formal paperwork may not apply, a phone photo of the waste being loaded into a registered carrier&apos;s van is proportionate evidence.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Customer information at the closing handover</ContentEyebrow>

          <ConceptBlock
            title="What the customer needs to know before you drive away"
            plainEnglish="The closing handover isn&apos;t small talk &mdash; it&apos;s the formal handover that satisfies your duty to inform. Customer keeps the certificate, the receipts, the schedule of any further work, and a clear understanding of what to do if the symptom comes back."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>What was found</strong> &mdash; root cause in plain English, not just &ldquo;sorted it&rdquo;.</li>
              <li><strong>What was done</strong> &mdash; scope of repair, parts replaced, any temporary measures still in place.</li>
              <li><strong>What wasn&apos;t done</strong> &mdash; advisory items, recommended follow-up, any safety findings outside the agreed scope.</li>
              <li><strong>What to watch for</strong> &mdash; symptoms that would indicate the fault has returned or a related fault has surfaced.</li>
              <li><strong>How to contact you</strong> &mdash; office number, out-of-hours line if applicable, who to ask for if it&apos;s a follow-up.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Lithium battery packs — emergency lighting and small UPS handling"
            plainEnglish="Modern emergency lighting and small UPS units use lithium-ion or lithium iron phosphate (LiFePO4) battery packs. End-of-life lithium batteries are flammable when crushed, punctured or short-circuited and have caused fires in waste-collection trucks. Disposal goes through the Batteries Directive route — never landfill, never general waste. Authorised treatment facilities (ATFs) handle them through the firm's waste contractor, with separate consignment paperwork."
            onSite="Remove the battery from the host fitting, tape over the terminals to prevent short circuit, place in a fire-resistant bag or bucket (sand-filled box for transit), and store away from heat and direct sunlight until disposed. Trade wholesalers (CEF, Edmundson, Rexel) increasingly accept end-of-life lithium packs through their take-back schemes. Larger volumes go to a battery recycling specialist (Ecobat, Valpak, Recolight). Note the chemistry on the consignment note — Li-ion and LiFePO4 follow slightly different routes."
          >
            <p>
              Lithium battery handling rules:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Tape the terminals</strong> — prevents short circuit
                during handling and transit.
              </li>
              <li>
                <strong>Damaged batteries</strong> — visibly swollen, vented or
                heat-damaged packs are higher risk; bag separately, brief the
                waste handler.
              </li>
              <li>
                <strong>Storage</strong> — fire-resistant bag or bucket; cool,
                dry, away from heat or direct sunlight; not stored on a wooden
                shelf without thermal protection.
              </li>
              <li>
                <strong>Take-back routes</strong> — wholesaler counter,
                manufacturer take-back, ATF via the firm's waste contractor.
              </li>
              <li>
                <strong>Paperwork</strong> — Hazardous Waste Consignment Note
                for any quantity above the small-load exemption; firm's waste
                carrier licence number on the note.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Cable offcut recycling — copper value and the metal merchant route"
            plainEnglish="Cable offcuts have value as scrap copper. A typical L3 day on first-fix work generates 5-10 kg of mixed-grade T&E offcut; over a quarter that is 100-200 kg. Trade wholesalers and dedicated metal merchants pay scrap rates per kg of stripped copper. The firm's compliance is to use a registered waste carrier (or carry their own waste-carrier licence) and to keep the receipt as evidence of routing. Cable to landfill is wasted income and a missed sustainability win."
            onSite="On the van, separate cable from other waste at point of removal. T&E offcut goes in the metal-waste bag; failed accessories go in the WEEE bag; general waste in the third bag. At end of week or end of month the metal bag goes to the local scrap merchant or back to the wholesaler's metal counter — receipt obtained, weight recorded, value credited to the firm's account or paid in cash to the contractor. Some firms make the cable revenue a per-apprentice incentive; small motivator, real money over a year."
          >
            <p>
              Cable recycling logistics:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Separate at source</strong> — metal bag on the van;
                offcuts and short pieces go straight in.
              </li>
              <li>
                <strong>Strip vs unstripped</strong> — stripped copper pays
                more per kg than insulated cable; some merchants accept both,
                others only stripped.
              </li>
              <li>
                <strong>Wholesaler vs metal merchant</strong> — wholesalers
                often accept under their take-back scheme; dedicated metal
                merchants pay better per kg.
              </li>
              <li>
                <strong>Waste carrier licence</strong> — required to transport
                trade waste even between sites; firm's licence number is on the
                consignment note.
              </li>
              <li>
                <strong>Receipt evidence</strong> — keep the metal merchant
                receipt as evidence of legal disposal; lives in the firm's
                waste compliance file.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Site cleanup standard — leaving the customer's space tidier than you found it"
            plainEnglish="The cleanup standard is the L3 apprentice's most visible discipline. Customers may not understand the test results or the certificate; they always notice whether you left the kitchen floor swept and the dust sheets folded. Five extra minutes at the end of every visit — sweep, vacuum if available, fold sheets, return any moved furniture, wipe drilling dust off the door frame and skirting — is the difference between a satisfied customer and a five-star review."
            onSite="Run the cleanup as a checklist: dust sheets folded, vacuum the work area (use the customer's vacuum if they offer or a small van vac), wipe down adjacent surfaces, return any moved furniture to original position, dispose of all packaging and offcuts in the appropriate van bag (not the customer's bin), final glance for stray screws or wire offcuts on the floor. The end-of-visit cleanup is what the customer remembers when they post their review."
          >
            <p>
              Cleanup checklist before walking out:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Dust sheets folded</strong> — tagged or wrapped for the
                next visit; debris bagged on the way out.
              </li>
              <li>
                <strong>Floor and adjacent surfaces vacuumed</strong> — drill
                dust, wire offcuts, packaging.
              </li>
              <li>
                <strong>Moved furniture returned</strong> — back to the
                original position the customer expects.
              </li>
              <li>
                <strong>Adjacent surfaces wiped</strong> — drilling dust on
                door frames, skirting, worktops.
              </li>
              <li>
                <strong>Final glance</strong> — stray screws, washers, wire
                offcuts on the floor; customer's children and pets do not
                appreciate finds like that.
              </li>
              <li>
                <strong>Customer's bins untouched</strong> — trade waste in
                the van, not in the customer's wheelie bin.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 644.4"
            clause={
              <>
                "The person or persons responsible for the design, construction and verification of the installation shall issue the Certificate, which takes account of their respective responsibilities, to the person ordering the work, together with the records mentioned in Regulation 644.3."
              </>
            }
            meaning={
              <>
                Certificate issue is the formal closure of the job. The Regulation puts it on the person responsible for the work, not optional and not contingent on customer request. Hand it over at the close of the visit alongside the schedule of inspections and test results.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 644.4, verbatim."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Putting WEEE in the customer's wheelie bin"
            whatHappens={
              <>
                Apprentice replaces a failed RCBO and a scorched single socket on a kitchen ring final, drops the old parts in the customer's general waste bin on the way out. Local authority bin truck operative spots the electrical components, traces the bin back to the address, address back to the contractor (job advertised on the firm's social media that morning). Environment Agency Fixed Penalty Notice issued to the firm for breach of EPA 1990 s.34 and the WEEE Regulations 2013. Cost of the FPN plus the loss of a public-sector framework that requires demonstrated compliant waste routing.
              </>
            }
            doInstead={
              <>
                Carry a labelled WEEE bag in the van; failed devices and scorched accessories go in the WEEE bag at the point of removal; the bag is dropped at the next wholesaler trip (CEF, Edmundson, Rexel all accept under the Distributor Take-Back Scheme, free of charge). The customer's bin is for the customer's general waste, not for trade waste of any description.
              </>
            }
          />

          <CommonMistake
            title="Smashing a fluorescent tube to fit it in the bin"
            whatHappens={
              <>
                Apprentice has replaced a 5-foot T8 fluorescent tube in a workshop fitting. The intact tube does not fit in the firm's general waste bag, so the apprentice smashes it on the workshop floor to fit the pieces in the bag. Mercury vapour released into the workshop air; the apprentice and the customer breathe it for the next hour. Glass fragments scattered across the floor. Hazardous Waste Regulations breach (waste smashed without authorisation); HSWA breach (personal exposure to mercury); environmental offence under the Environmental Permitting Regulations.
              </>
            }
            doInstead={
              <>
                Intact tube in the van, in a tube-tube or in the original sleeve from the new tube box. Routed at the next wholesaler trip via the tube-recycling scheme (typical disposal cost £1&ndash;2 per tube, often free under wholesaler trade-account terms). The intact tube travels safely; the disposal trail is documented; nobody breathes the mercury.
              </>
            }
          />

          <Scenario
            title="Closing a rectification on a kitchen ring at 19:30"
            situation={
              <>
                You've completed rectification on the kitchen ring final at the customer's home &mdash;
                replaced a failed Hager 32&nbsp;A NDN132B RCBO that had been nuisance-tripping
                under microwave inrush, IR-tested the circuit at 500&nbsp;V on the Megger MFT1741
                (all conductors over 200&nbsp;M&Omega;), R1+R2 confirmed at 0.34&nbsp;&Omega;,
                Zs at the furthest socket 0.42&nbsp;&Omega; (well within the 1.10&nbsp;&Omega; limit
                for a 32&nbsp;A Type B), RCD trip-time at I&Delta;n 18&nbsp;ms. It's 19:30, the
                customer is back at 21:00, you have a 45-minute drive home.
              </>
            }
            whatToDo={
              <>
                Six-point leave-area-safe check, in order. (1) ENERGISE the kitchen ring at the
                Hager DB; verify the kettle boils (kettle is the high-load proof load); microwave
                runs without trip. (2) RESTORE other circuits &mdash; every breaker back to its
                pre-visit state; check the lighting circuit and the upstairs sockets which were on
                throughout but verify nothing accidentally toggled. (3) DB cover back on, screws
                back in, no exposed terminations. (4) SWEEP the kitchen &mdash; no tools, no
                offcuts, no insulation tape on the worktop, the failed RCBO already in the WEEE
                bag in the van. (5) NO TRIP HAZARDS &mdash; the cable that was disturbed at the
                socket back-box clipped properly, the kitchen kickboard refitted. (6) CUSTOMER
                HAND-BACK &mdash; show them the new RCBO labelled in the DB, demonstrate the
                kettle test, hand over the Minor Works Certificate (printed from the van laptop or
                emailed PDF), explain the 12-month workmanship warranty. Walk out at 19:50.
              </>
            }
            whyItMatters={
              <>
                The 90-second closing routine is the difference between a complete job and a
                comeback visit. The customer arriving home to a working kitchen, a sealed DB and
                a certificate in their inbox is the satisfied-customer outcome. Skipping any of
                the six points &mdash; especially the energise-and-verify step &mdash; is how
                "I thought it was working" complaints become "you left my kitchen broken"
                arguments at 21:30 over the phone.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "WEEE Regulations 2013 cover failed devices and scorched accessories — Distributor Take-Back Scheme at CEF / Edmundson / Rexel, free of charge.",
              "Hazardous Waste Regulations 2005 cover fluorescent tubes (mercury) — never smash; intact transport; Consignment Note retained three years.",
              "Batteries Regulations 2009 cover lead-acid and lithium-ion separately from WEEE — terminal taping for lithium, wholesaler battery bin.",
              "EPA 1990 s.34 Duty of Care travels with the waste-producer — the firm carries it until licensed disposal; customer's bin is not a transfer.",
              "Five-bag van system: WEEE / Batteries / Hazardous / Copper scrap / General — segregation at the point of generation makes compliance routine.",
              "Asbestos in old switchgear is STOP-and-escalate — licensed contractor required under CAR 2012; never an L3 apprentice action.",
              "Cable offcuts: copper scrap pays back; never burn insulation off (Environmental Permitting Regulations breach, dioxin release).",
              "Leave-area-safe is a six-point closing check: energise + verify, restore other circuits, lock DB, sweep, no trip hazards, customer hand-back with certificate.",
            ]}
          />

          <Quiz title="Safe disposal + leaving the area safe — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/level3-module4-section5-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">5.3 Restoring building fabric</div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/level3-module4-section5-5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">5.5 Reporting + handover documentation</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
