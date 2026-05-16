/**
 * Module 1 · Section 3 · Subsection 3 — PPE selection and verification
 * Maps to City & Guilds 2365-03 / Unit 201 / LO3 / AC 3.4
 *   AC 3.4 — "specify the appropriate protective clothing and equipment that is required
 *            for identified work tasks"
 *
 * Layered depth (supplementary):
 *   - 2357 Unit 601 ELTK01 / AC 3.5 — appropriate protective clothing/equipment
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'PPE selection and verification (3.4) | Level 3 Module 1.3.3 | Elec-Mate';
const DESCRIPTION = 'L3 PPE selection — matching kit to hazard, EN standards, fit, expiry, replacement schedules and the supervisor verification routine.';

const checks = [
  { id: 'l3-m1-s3-sub3-elec-gloves', question: 'You\'re briefed for live-test work on a 230V circuit. Which gloves do you select?', options: ['Any gloves.', 'EN 60903 Class 00 (rated to 500V AC) or Class 0 (rated to 1,000V AC) electrical insulating gloves, in date, visually inspected for pinholes / damage / contamination, with optional leather over-gloves for mechanical protection. Inspection log entry. NEVER use general-purpose work gloves for live work.', 'Cotton gardening gloves.', 'Surgical gloves.'], correctIndex: 1, explanation: 'Class 00 / Class 0 are the practical ratings for 230V work. Higher classes for higher voltages. Inspection before use is mandatory; a tiny pinhole is a fatality vector.' },
  { id: 'l3-m1-s3-sub3-arc', question: 'When is arc-flash PPE (EN 61482) appropriate?', options: ['Never for electricians.', 'When working on or near energised electrical equipment with potential for arc-flash — typically commercial / industrial switchgear, distribution boards above 32A, motor control centres. The PPE has an Arc Thermal Performance Value (ATPV cal/cm²) that must match the calculated incident energy at the working position.', 'Only on aircraft.', 'Only above 1MV.'], correctIndex: 1, explanation: 'Arc-flash is a real risk in commercial DBs and switchgear. ATPV-rated FR clothing is the appropriate response, after engineering controls (de-energise, remote racking) have been considered.' },
  { id: 'l3-m1-s3-sub3-marking', question: 'A pair of safety glasses is marked "EN 166 1 F". What does this mean?', options: ['Brand name.', 'EN 166 = the safety eyewear standard. "1" = optical class 1 (highest, for permanent wear). "F" = low-energy impact (45 m/s). For higher-impact work look for "B" (medium, 120 m/s) or "A" (high, 190 m/s). Other letters: T (temperature extremes), K (surface scratch), N (anti-fog).', 'Made in February.', 'First issue.'], correctIndex: 1, explanation: 'EN markings are coded but mean specific things. Knowing the code lets you verify suitability for the task without trusting marketing claims.' },
];

const quizQuestions = [
  { id: 1, question: 'What\'s the standard for safety footwear?', options: ['No standard.', 'EN ISO 20345. Grades S1, S1P, S2, S3, S4, S5 indicate features (toe protection, midsole protection, antistatic, water resistance, etc). For electrical work look for EH (Electrical Hazard) rating or Class 1 with insulating sole; for hazardous areas anti-static is required.', 'BS 7671.', 'Brown leather.'], correctAnswer: 1, explanation: 'EN ISO 20345 + appropriate S-grade. Generic boots aren\'t safety footwear regardless of how they look.' },
  { id: 2, question: 'What\'s the standard for hard hats?', options: ['No standard.', 'EN 397 (industrial helmets, general purpose) or EN 12492 (mountaineering / rope access — sometimes used for working at height with chinstrap). Date of manufacture marked underneath; typical service life 5 years from manufacture or 3 years from first use, whichever shorter (per manufacturer).', 'BS 7671.', 'Made of plastic.'], correctAnswer: 1, explanation: 'EN 397 industrial; EN 12492 some height work. Date markings matter; expired hats fail under impact.' },
  { id: 3, question: 'What\'s the standard for electrical insulating gloves?', options: ['Any gloves.', 'EN 60903 (and IEC 60903). Classes 00 / 0 / 1 / 2 / 3 / 4 by AC voltage rating: 500V / 1,000V / 7,500V / 17,000V / 26,500V / 36,000V. Visual inspection before each use. Periodic dielectric testing (typically 6-monthly per IEC 60903).', 'BS 7671.', 'Made in UK only.'], correctAnswer: 1, explanation: 'EN 60903 Class 00/0 covers most LV work. Higher classes for HV. Periodic dielectric testing is the maintenance regime.' },
  { id: 4, question: 'What\'s the standard for FFP3 masks?', options: ['Any mask.', 'EN 149 — FFP1 (assigned protection factor 4), FFP2 (APF 10), FFP3 (APF 20). FFP3 is the standard for respirable crystalline silica, asbestos-disturbance work (where licensed), wood dust. Face-fit test required.', 'BS 7671.', 'Made of paper.'], correctAnswer: 1, explanation: 'FFP3 = highest APF for negative-pressure disposable. For higher protection: powered respirators (TH3) or supplied-air. Fit-test mandatory.' },
  { id: 5, question: 'What\'s the standard for fall arrest harnesses?', options: ['Any harness.', 'EN 361 (full body harnesses for fall arrest). Combined with EN 354 (lanyards), EN 355 (energy absorbers) and an appropriate anchor (EN 795). Pre-use visual inspection mandatory; periodic detailed inspection by competent person every 6-12 months; service life typically 5-10 years from manufacture.', 'BS 7671.', 'Made of rope.'], correctAnswer: 1, explanation: 'Multi-standard system — harness, lanyard, energy absorber, anchor each have their own EN. Inspection regime under PUWER + LOLER.' },
  { id: 6, question: 'How is suitable PPE matched to a task?', options: ['Random selection.', 'Risk assessment identifies the hazards; hierarchy of control reduces them; PPE addresses residual risk. Match the standard to the specific hazard (electrical, mechanical, thermal, chemical, biological, ionising). Consider compatibility (multiple PPE items must work together — e.g. helmet + hearing defenders + safety glasses).', 'Personal preference.', 'Cheapest available.'], correctAnswer: 1, explanation: 'PPE selection is hazard-driven and assessment-based. Off-the-shelf "general PPE pack" rarely matches all task hazards.' },
  { id: 7, question: 'When should PPE be replaced?', options: ['Never.', 'Per manufacturer service life; on damage or contamination; after exposure to extreme conditions; when the standard has changed; on relevant change to the user (significant weight change for fitted RPE / harnesses); when periodic inspection identifies issues.', 'Once a decade.', 'Only on Tuesdays.'], correctAnswer: 1, explanation: 'Multi-trigger replacement. The cost of replacing PPE is trivial compared to the cost of a failure.' },
  { id: 8, question: 'L3 supervisor PPE verification routine — what does it cover?', options: ['Nothing.', 'Standard markings present and appropriate; condition (no damage, no expiry); fit (especially RPE); training (operative knows correct use); pre-use inspection done; replacement schedule current. Documented in the firm\'s PPE register and on RAMS.', 'Just colour.', 'Just price.'], correctAnswer: 1, explanation: 'Six-point check. The L3 supervisor doesn\'t inspect every item every time but spot-checks and intervenes when issues are seen.' },
];

const faqs = [
  { question: 'Are gloves alone enough for live testing?', answer: 'Insulating gloves are the primary barrier; combine with insulated test leads, voltage indicator, FR clothing for arc-flash potential, and EAWR Reg 14 three-test if it\'s actual live working (not just testing).' },
  { question: 'How do I check if electrical insulating gloves are damaged?', answer: 'Visual inspection — pinholes, cracks, embedded foreign material, contamination. Air-test by inflating and looking for leaks. Periodic dielectric testing per IEC 60903 (typically 6-monthly). Inspection log entry.' },
  { question: 'Do I need anti-static footwear in a server room?', answer: 'Often yes — anti-static (ESD) footwear required in many electronics environments to prevent static discharge damaging equipment. Customer/site H&S brief will normally specify.' },
  { question: 'What\'s the difference between EN 397 helmets and bump caps?', answer: 'EN 397 = full impact-rated industrial safety helmet. Bump cap (EN 812) = lighter protection against impact with stationary objects (low ceilings, pipes); NOT suitable for falling-object protection. Different hazards, different kit.' },
  { question: 'Can I share PPE with another operative?', answer: 'Most PPE is personal — fitted (RPE), hygiene-sensitive (gloves), or condition-tracked (harnesses). Sharing breaks the fit / hygiene / inspection chain. Some bulk items (eye protection on a shared site) may be exceptions but generally personal allocation is the norm.' },
  { question: 'How is the PPE register maintained?', answer: 'Firm\'s H&S system records each item issued — operative, item type, standard, date issued, expected service life, inspection record, replacement date. Often a digital record now; paper acceptable with retention.' },
  { question: 'How is arc-flash incident energy calculated?', answer: 'Most commonly via the IEEE 1584 framework, which gives a structured calculation based on the available short-circuit current, the arcing time (governed by the upstream protective device), the working distance and the equipment enclosure dimensions. The output is incident energy in cal/cm² at the working position. Specialist software (ETAP, SKM, ARCAD) handles the calculation. The result feeds the ATPV selection: choose PPE with ATPV at least equal to the calculated incident energy.' },
  { question: 'Do electrical insulating gloves protect against arc-flash?', answer: 'No — Class 0 / Class 00 insulating gloves protect against electric shock by isolating the hand from the conductor. They are NOT arc-flash rated. For arc-flash exposure, arc-rated gloves (EN 388 + EN 61482 combination) are required. Many switchgear tasks need BOTH protections, which requires a layered glove arrangement or specially-rated combination gloves.' },
  { question: 'What does &apos;G&apos; mean on the EN 166 eye protection marking?', answer: 'Not all EN 166 markings use single letters. Common letter codes: F (low-energy impact, 45 m/s), B (medium-energy, 120 m/s), A (high-energy, 190 m/s), T (extreme temperatures), K (resistance to surface scratching by fine particles), N (resistance to fogging), 3 (liquid droplets/splashes), 4 (large dust particles &gt;5&micro;m), 5 (gas and fine dust), 9 (molten metal and hot solids). Combined codes appear together on the frame and/or lens.' },
  { question: 'How is the PPE register typically audited?', answer: 'Internal audit by the firm&apos;s H&amp;S manager (annually as a minimum) sampling a cross-section of operatives and PPE items, checking the register entries against the physical items, fit-test certs, training records and replacement schedule. External audit happens via ISO 45001 surveillance, scheme body assessment, PQQ client audits, or HSE inspector visits. The register is one of the documents inspectors routinely request.' },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section3')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 3</button>
          <PageHero eyebrow="Module 1 · Section 3 · Subsection 3" title="PPE selection and verification" description="Remember from L2 — wear the right PPE for the task. At L3 the depth is the EN-standard literacy: knowing what each marking means and why one item is suitable while another isn't." tone="emerald" />
          <TLDR points={[
            "Match PPE to hazard via EN standards: footwear EN ISO 20345, hat EN 397, electrical gloves EN 60903, RPE EN 149 (FFP3), eye EN 166, harness EN 361, arc-flash EN 61482.",
            "Verify before use — standard markings present, in date, condition good, fit confirmed (especially RPE), training current.",
            "Replacement triggers: manufacturer service life, damage, contamination, extreme exposure, standard change, user change.",
            "Arc-flash PPE is rated by ATPV (cal/cm²) — must match or exceed calculated incident energy at the working position.",
            "Tool-belt PPE (GS38 leads, voltage indicators, insulating mats, lock-off kit) is part of the safe-isolation system — verify it as carefully as the textile PPE.",
            "EN 60903 electrical insulating gloves require 6-monthly dielectric testing plus pre-use air-test plus visual inspection; without the cert in date, the gloves are not fit for live work.",
          ]} />
          <LearningOutcomes outcomes={[
            "Specify appropriate PPE for common electrical-trade hazards — live testing, switchgear, arc-flash, masonry chasing, working at height, manual handling.",
            "Identify EN standards for the main PPE categories.",
            "State the inspection and replacement requirements per standard / manufacturer.",
            "Apply the L3 supervisor verification routine — markings, condition, fit, training, replacement.",
            "Recognise compatibility issues when multiple PPE items must work together (helmet + hearing + glasses).",
            "Identify face-fit testing requirement for tight-fitting RPE.",
            "Select arc-flash PPE by matching ATPV rating to calculated incident energy at the working position.",
            "Apply the 60-second pre-use inspection routine for electrical insulating gloves (Class 00 / 0 etc).",
            "Locate the relevant PPE Regs Reg (4 / 6 / 7 / 9) for a given compliance question.",
            "Identify safe-isolation tool-belt PPE — GS38 leads, two-pole voltage indicator, proving unit, insulating mat, lock-off kit.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>EN standards quick reference</ContentEyebrow>
          <ConceptBlock title="The standards behind the markings" plainEnglish="Every PPE item should bear an EN standard mark. Knowing what the mark means is how you verify suitability — not by trusting the manufacturer's marketing." onSite="The L3 supervisor reads the labels. Operatives often don't know what the markings mean; you do, and you check.">
            <p>Headline standards for electrical-trade PPE:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>EN ISO 20345</strong> — Safety footwear (S1 antistatic, S1P+midsole, S2 water resistance, S3 all features). EH (Electrical Hazard) rating for electrical work.</li>
              <li><strong>EN 397</strong> — Industrial safety helmets (general impact / penetration / ageing).</li>
              <li><strong>EN 12492</strong> — Climbing / mountaineering helmets (some rope-access H&amp;S applications).</li>
              <li><strong>EN 812</strong> — Industrial bump caps (low-impact protection only).</li>
              <li><strong>EN 388</strong> — Mechanical gloves (cut / abrasion / tear / puncture rated).</li>
              <li><strong>EN 60903 / IEC 60903</strong> — Electrical insulating gloves (Class 00/0/1/2/3/4 by voltage).</li>
              <li><strong>EN 50321</strong> — Electrical insulating footwear.</li>
              <li><strong>EN 166</strong> — Eye protection (1/2/3 optical class; F/B/A impact rating).</li>
              <li><strong>EN 149</strong> — Filtering facepieces (FFP1/FFP2/FFP3 by assigned protection factor).</li>
              <li><strong>EN 14387</strong> — Gas filters.</li>
              <li><strong>EN 12941 / EN 12942</strong> — Powered respirators.</li>
              <li><strong>EN 361</strong> — Full body harnesses (fall arrest).</li>
              <li><strong>EN 354</strong> — Lanyards.</li>
              <li><strong>EN 355</strong> — Energy absorbers.</li>
              <li><strong>EN 795</strong> — Anchor devices.</li>
              <li><strong>EN 61482</strong> — Arc-flash protective clothing (ATPV cal/cm² rating).</li>
              <li><strong>EN ISO 20471</strong> — High-visibility clothing (Class 1/2/3).</li>
              <li><strong>EN 352</strong> — Hearing protection (SNR / HML noise reduction values).</li>
              <li><strong>BS EN 61111</strong> — Insulating mats (rated by AC voltage class).</li>
              <li><strong>BS EN 60900</strong> — Hand tools insulated to 1,000V AC for live working.</li>
              <li><strong>EN 365</strong> — General requirements for PPE against falls from height (instructions, marking, packaging).</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="PPE Regs 1992 (as amended) — Reg 6 (assessment of PPE)" clause={<>"Before choosing any personal protective equipment which by virtue of regulation 4 he is required to ensure is provided, an employer or self-employed person shall ensure that an assessment is made to determine whether the personal protective equipment he intends will be provided is suitable."</>} meaning={<>The Reg 6 PPE assessment is separate from the broader Reg 3 risk assessment. It specifically considers PPE choice — is this item suitable for the user, the task and the workplace? Knowledge of EN standards is essential to discharge Reg 6 properly.</>} cite="Source: Personal Protective Equipment at Work Regulations 1992 (SI 1992/2966), Reg 6." />

          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />

          <SectionRule />
          <ContentEyebrow>Selection and verification routine</ContentEyebrow>
          <ConceptBlock title="The L3 supervisor's six-point check" plainEnglish="Before any task, six checks: standard markings present and appropriate; condition (no damage, no expiry); fit (especially RPE); training (operative knows correct use); pre-use inspection done; replacement schedule current." onSite="Spot-check rather than inspect-every-item-every-time, but intervene immediately when an issue is seen. The check signals to the team that PPE compliance is monitored.">
            <p>Each check unpacked:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Standard</strong> — EN marking matches the hazard.</li>
              <li><strong>Condition</strong> — physical inspection; in-date; not contaminated.</li>
              <li><strong>Fit</strong> — RPE seal, harness adjustment, glove size, footwear sizing.</li>
              <li><strong>Training</strong> — operative briefed on use, limitations, maintenance.</li>
              <li><strong>Pre-use inspection</strong> — operative has done it (visible log entry or verbal confirmation).</li>
              <li><strong>Replacement</strong> — schedule current; nothing approaching expiry.</li>
              <li><strong>Compatibility</strong> — multiple items work together (helmet + RPE + glasses must coexist).</li>
              <li><strong>Documentation</strong> — register entry current; cert in date for complex items.</li>
              <li><strong>Operative competence</strong> — they know what the PPE is FOR, not just how to wear it.</li>
              <li><strong>Backup arrangement</strong> — spare items available if something is damaged on site.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Compatibility — multiple PPE items together" plainEnglish="Wearing helmet + hearing defenders + safety glasses + RPE simultaneously can create compatibility issues — RPE seal broken by glasses arms, defenders pushed off by helmet rim, glasses blocking ear-side helmet vents. Selection should consider the full PPE stack." onSite="Test the combination on the operative before deploying. Manufacturers offer integrated solutions (helmet + hearing combo, RPE designed for use with prescription glasses). Spending a bit more on a compatible system avoids workarounds that create exposure.">
            <p>Common compatibility issues:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>RPE + safety glasses — arms can break the mask seal.</li>
              <li>Helmet + hearing defenders — clip-in defenders or compatible cup design.</li>
              <li>Helmet + RPE + face shield — geometry must work together.</li>
              <li>Harness + bulky FR clothing — buckles must be accessible.</li>
              <li>Gloves + tools — grip and dexterity must allow the task.</li>
              <li>Eye protection + prescription glasses — over-glasses or prescription safety glasses.</li>
              <li>Arc-flash hood + hearing — integrated hearing protection often included in arc hoods.</li>
              <li>FR base layer + outer FR garment — manufacturer&apos;s system rating governs the combination, not the simple sum of ATPVs.</li>
              <li>Insulating gloves + leather over-gloves — over-glove must not impede dexterity required for the task.</li>
              <li>Anti-static footwear + insulating mat — the antistatic path can defeat the insulation if not designed as a system.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>Inspection, expiry and lifecycle</ContentEyebrow>
          <ConceptBlock title="Pre-use inspection — the operative&apos;s discipline" plainEnglish="Every PPE item should be visually inspected by the operative before each use. For most items this is seconds — check for visible damage, contamination, expiry. For complex PPE (harness, electrical gloves) the inspection is structured and recorded. The inspection happens at the operative level (every use) and the supervisor level (periodic sampling) and the formal competent-person level (annual or semi-annual structured inspection)." onSite="The L3 supervisor builds the habit by modelling it. Visibly inspect your own PPE in front of the team. Ask &apos;when did you last check that?&apos; rather than checking yourself — coaching beats inspecting. The norm of inspecting becomes part of how the team works, not an exception.">
            <p>Pre-use inspection by category:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Helmet</strong> — no cracks, in-date (5 yrs typical from manufacture), harness intact.</li>
              <li><strong>Eye protection</strong> — no scratches obscuring vision, frame intact.</li>
              <li><strong>Gloves (mechanical)</strong> — no holes, cuts, contamination.</li>
              <li><strong>Gloves (electrical)</strong> — air-test inflate-and-look-for-leaks, dielectric test cert in date.</li>
              <li><strong>RPE (FFP3)</strong> — seal intact, straps present, in-date, fit-test cert current.</li>
              <li><strong>Harness</strong> — webbing un-cut and un-frayed, buckles function, stitching intact, periodic inspection cert in date.</li>
              <li><strong>Footwear</strong> — sole intact, no exposed steel, stitching intact.</li>
              <li><strong>Arc-flash kit</strong> — fabric un-damaged, ATPV cert current, no contamination by flammable material.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Expiry and replacement triggers" plainEnglish="PPE has a finite life. Some items have manufacturer expiry dates printed (helmets, harnesses, RPE filters, burn dressings). Others are condition-based (gloves, glasses). The L3 supervisor knows the regime for each category and intervenes before items reach expiry, not after." onSite="The firm&apos;s PPE register tracks issue dates and expected service life. Periodic review (quarterly) catches items approaching expiry. Replacement is cheaper than incident.">
            <p>Typical service lives:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Hard hat (EN 397)</strong> — 5 years from manufacture (printed underneath), or 3 years from first use, whichever shorter.</li>
              <li><strong>Harness (EN 361)</strong> — manufacturer-stated 5-10 years; periodic inspection by competent person every 6-12 months.</li>
              <li><strong>Electrical insulating gloves (EN 60903)</strong> — periodic dielectric test every 6 months; replace on damage.</li>
              <li><strong>FFP3 disposable mask</strong> — single-shift use; replace if damaged or after exposure event.</li>
              <li><strong>RPE filter cartridges</strong> — manufacturer-stated; track with usage log.</li>
              <li><strong>Safety footwear</strong> — replace on sole wear, toe damage, or contamination.</li>
              <li><strong>Eye protection</strong> — replace on scratching or pitting that obscures vision.</li>
              <li><strong>Arc-flash garments</strong> — manufacturer-stated; condition-based after any arc event.</li>
              <li><strong>Lanyards (EN 354)</strong> — manufacturer-stated 5-10 years; immediate retirement after shock load.</li>
              <li><strong>Anchor devices (EN 795)</strong> — periodic recertification per manufacturer; load test after any fall arrest.</li>
              <li><strong>Hearing protection (EN 352)</strong> — replace foam plugs daily; replace cup seals on damage.</li>
              <li><strong>Insulating mats (BS EN 61111)</strong> — replace on damage; periodic dielectric retest where used routinely.</li>
              <li><strong>First aid kit components</strong> — burn dressings, eye wash, plasters all have stated shelf life.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="The PPE register — administrative spine of the system" plainEnglish="A documented record of every item issued: who got it, when, expected service life, inspection schedule, replacement date. Often a digital system; paper acceptable. The register is the evidence of provision and lifecycle management under PPE Regs Reg 4 and Reg 7." onSite="The L3 supervisor sometimes maintains the register for their team or contributes entries for their own kit. The register links the firm&apos;s PPE policy to actual operational provision; without it, the firm has policy on paper and unknown reality on site.">
            <p>Register fields per item:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Operative name and ID.</li>
              <li>PPE item type and EN standard.</li>
              <li>Manufacturer, model, batch / serial number where applicable.</li>
              <li>Date issued.</li>
              <li>Manufacturer service life / next replacement date.</li>
              <li>Inspection schedule and last inspection result.</li>
              <li>Fit-test record (RPE / harness).</li>
              <li>Training record reference.</li>
              <li>Replacement / disposal record on retirement.</li>
              <li>Cost centre / purchase order reference.</li>
              <li>Storage location / accommodation arrangement (Reg 8).</li>
              <li>Compatibility notes — items intended to be used together.</li>
              <li>Linked Reg 6 assessment reference — the activity the PPE was selected for.</li>
              <li>Operative confirmation of receipt and briefing.</li>
              <li>Loss / damage reports under Reg 11.</li>
              <li>Periodic audit signature.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Damaged or post-event PPE — when to retire" plainEnglish="PPE that has experienced a significant event (fall arrest deployment, arc-flash exposure, chemical splash, impact on a hard hat) must be retired and inspected before any further use — typically scrapped. Visible damage is obvious; functional damage from a single event may not be. Err conservative." onSite="The L3 supervisor reflex on any event: that PPE comes out of service immediately. Replacement is firm cost, not personal. Arguing operative should &apos;just keep using it, looks fine&apos; is the wrong call. Replace, document the retirement, brief the team.">
            <p>Mandatory retirement triggers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Harness after any fall arrest deployment (energy absorber stretched).</li>
              <li>Hard hat after any impact (even if no visible crack).</li>
              <li>Arc-flash garment after any arc event (fabric integrity compromised).</li>
              <li>Electrical insulating glove after dielectric test failure or visible damage.</li>
              <li>RPE after damaged seal or contamination by hazardous substance.</li>
              <li>Eye protection after impact damage.</li>
              <li>Footwear after sole separation or toe damage.</li>
              <li>Any PPE past manufacturer expiry regardless of apparent condition.</li>
              <li>Lanyard after shock loading or visible damage to stitching / webbing.</li>
              <li>Energy absorber after any deployment (single-use device).</li>
              <li>Anchor device after any fall arrest event — load test or replace.</li>
              <li>Hearing protection after compression of foam or damage to seal cushions.</li>
              <li>RPE filter cartridges after manufacturer-stated service life or contamination.</li>
              <li>Insulating mat after damage, contamination or contact with sharp objects.</li>
              <li>GS38 test leads after damage to insulation or finger barriers.</li>
              <li>Voltage indicator after any drop, damage or failed pre-test against the proving unit.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="PPE Regs 1992 — Reg 7 (Maintenance and replacement)" clause={<>"Every employer shall ensure that any personal protective equipment provided to his employees is maintained (including replaced or cleaned as appropriate) in an efficient state, in efficient working order and in good repair."</>} meaning={<>Reg 7 — the maintenance duty. Provision (Reg 4) and selection (Reg 6) aren&apos;t enough; ongoing maintenance is required. Inspection regimes, replacement schedules and post-event retirement all sit under Reg 7. The L3 supervisor verification is the operational discharge of this duty.</>} cite="Source: Personal Protective Equipment at Work Regulations 1992 (SI 1992/2966), Reg 7." />

          <ConceptBlock title="EN 60903 dielectric testing — the electrical glove regime" plainEnglish="Electrical insulating gloves are tested electrically before first use, then at periodic intervals (IEC 60903 specifies 6-monthly maximum). The dielectric test applies a high voltage and measures leakage; pass / fail is binary. Test certs accompany each pair; the operative inspects pre-use AND has the cert as evidence of dielectric fitness." onSite="The L3 supervisor knows the cert regime. A glove without an in-date cert isn&apos;t fit for live work regardless of how it looks. Most firms outsource dielectric testing to a specialist who logs the cert against the glove serial. Pre-use air-test by the operative is additional, not a substitute.">
            <p>Electrical glove regime:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Class</strong> — match to working voltage (Class 00 = 500V; Class 0 = 1,000V; higher classes for HV).</li>
              <li><strong>Dielectric test</strong> — first use + 6-monthly per IEC 60903.</li>
              <li><strong>Certificate</strong> — accompanies the pair; serial-numbered.</li>
              <li><strong>Pre-use air-test</strong> — inflate by hand or with mini pump; look / listen for leaks.</li>
              <li><strong>Visual inspection</strong> — pinholes, cuts, embedded debris, contamination.</li>
              <li><strong>Storage</strong> — protective bag; not folded sharply; out of UV / heat.</li>
              <li><strong>Leather over-glove</strong> — optional mechanical protection over the insulating glove.</li>
              <li><strong>Retire on damage</strong> — any visible damage = scrap, not repair.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="PPE Regs 1992 — Reg 9 (Information, instruction and training)" clause={<>"Every employer who provides personal protective equipment to an employee shall ensure that the employee is provided with such information, instruction and training as is adequate and appropriate to enable the employee to know — (a) the risk or risks which the personal protective equipment will avoid or limit; (b) the purpose for which and the manner in which personal protective equipment is to be used; and (c) any action to be taken by the employee to ensure that the personal protective equipment remains in efficient working order and in good repair."</>} meaning={<>Reg 9 — the training duty. Issuing PPE without training is non-compliance. Brief on-issue for simple items; formal training and records for complex items. The L3 supervisor often delivers the on-issue brief and contributes to formal training records.</>} cite="Source: Personal Protective Equipment at Work Regulations 1992 (SI 1992/2966), Reg 9." />

          <SectionRule />
          <CommonMistake title="Issuing 'general PPE' without task-specific selection" whatHappens={<>Apprentice issued generic PPE pack on day 1; goes to a switchroom with FFP3 mask but no electrical insulating gloves; no arc-flash kit. PPE Regs Reg 4 / Reg 6 breach; firm prosecuted; injury could have been prevented by task-specific selection.</>} doInstead={<>Reg 6 PPE assessment per task-type. Issue the kit needed for the work, not a generic pack. Maintain a PPE matrix mapping task to required kit.</>} />

          <CommonMistake title="Ignoring expiry dates on hard hats" whatHappens={<>Operative wearing a 7-year-old hard hat (manufacturer states 5-year service life). Falling object causes the helmet to crack. Head injury follows. PUWER + PPE Regs breach; firm prosecuted; the helmet WAS supplied but was no longer suitable.</>} doInstead={<>Replacement schedule from date of manufacture (printed underneath helmet). 5 years typical for industrial helmets. Periodic check by supervisor; replace before service life expires.</>} />

          <Scenario title="Selecting PPE for a switchroom inspection" situation={<>You're scheduled to do an EICR on a small commercial switchroom — 400V three-phase distribution, 250A main switch, several sub-DBs. The work involves opening covers, observing terminations, taking insulation resistance readings (after isolation). Your firm\'s standard PPE pack has hard hat, safety glasses, hi-vis, safety boots and FFP3 masks.</>} whatToDo={<>Reassess PPE for this specific work. Not adequate as-is. Add: (1) electrical insulating gloves EN 60903 Class 00 (500V) or Class 0 (1,000V) for any test work or potential live-conductor proximity; (2) arc-flash PPE EN 61482 with ATPV rating matching the calculated incident energy at the working position (request from the design team or use a conservative estimate — typically 8-12 cal/cm² for a small commercial DB); (3) face shield rated for arc protection; (4) cotton or FR base layer (synthetic melts in arc events); (5) insulating mat if working in front of the panel; (6) voltage indicator + GS38 leads. Brief the L2 mate on the additions and the reasons. Document the PPE selection on the dynamic risk assessment. The standard pack isn\'t wrong; it\'s incomplete for this task.</>} whyItMatters={<>Switchgear arc-flash incidents are some of the highest-consequence electrical events. Standard hi-vis + FFP3 pack offers no arc protection. The L3 supervisor\'s PPE selection literacy turns "we have PPE" into "we have the right PPE". The gap between the two is what kills people in switchroom incidents.</>} />

          <SectionRule />
          <ContentEyebrow>Arc-flash ATPV — what the cal/cm² number actually means</ContentEyebrow>

          <ConceptBlock
            title="Selecting arc-rated kit by the incident energy at the working position"
            plainEnglish="Arc-flash PPE is rated by Arc Thermal Performance Value (ATPV) in calories per square centimetre (cal/cm²). The number represents the maximum incident energy the garment can absorb before there&apos;s a 50% probability of a second-degree burn through the fabric to the skin. ATPV ratings commonly available: 8 cal/cm², 12 cal/cm², 25 cal/cm², 40 cal/cm², 65 cal/cm², 100 cal/cm². The PPE selected must have an ATPV rating that exceeds the calculated incident energy at the working position."
            onSite="The L3 supervisor selecting arc-flash PPE asks &apos;what is the incident energy at this working position?&apos;. The answer comes from an arc-flash study (often by the design team or commissioning engineer) or from a conservative estimate using IEEE 1584 framework. For a typical small commercial DB the incident energy at the front of the panel may be 6-12 cal/cm² — meaning 12 cal/cm² PPE is the working minimum. For larger MCCs and switchgear the figure can be much higher; 40 cal/cm² &apos;moon suit&apos; is required for the higher-energy positions."
          >
            <p>Arc-flash PPE categories (NFPA 70E categories, used as informal industry shorthand):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>CAT 1 — 4 cal/cm²</strong>: long FR shirt + FR trousers + arc-rated
                face shield + hard hat + safety glasses + leather gloves + leather boots.
              </li>
              <li>
                <strong>CAT 2 — 8 cal/cm²</strong>: as CAT 1 + arc-rated balaclava OR arc
                hood + heavier FR layer.
              </li>
              <li>
                <strong>CAT 3 — 25 cal/cm²</strong>: arc-flash suit (FR coat + over-pants) +
                full arc hood with face shield + arc-rated gloves.
              </li>
              <li>
                <strong>CAT 4 — 40 cal/cm²</strong>: as CAT 3 with heavier layers; full
                &quot;moon suit&quot; appearance.
              </li>
              <li>
                <strong>Above 40 cal/cm²</strong>: HSE / industry guidance is generally
                that work should not proceed live; engineering controls (remote racking,
                temporary de-energisation) required.
              </li>
              <li>
                <strong>The number on the label is the ATPV</strong> — must match or
                exceed the calculated working-position incident energy.
              </li>
              <li>
                <strong>Layering</strong> — multiple lower-ATPV layers can combine to
                higher-rated systems; manufacturer&apos;s system rating governs.
              </li>
              <li>
                <strong>Underlayers</strong> — synthetic underlayers can melt; cotton or
                FR underlayers only.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Reg 4(4)"
            clause={
              <>
                &quot;Any equipment provided under these Regulations for the purpose of
                protecting persons at work on or near electrical equipment shall be suitable
                for the use for which it is provided, be maintained in a condition suitable
                for that use, and be properly used.&quot;
              </>
            }
            meaning={
              <>
                The Reg 4(4) trio — suitable, maintained, properly used. For arc-flash PPE
                that means: ATPV-rated for the working position (suitable); regularly
                inspected and not contaminated (maintained); donned correctly with no gaps,
                no synthetic underlayers, hood positioned and visor closed (properly used).
                A 40 cal/cm² suit worn over a polyester base layer fails Reg 4(4) just as
                badly as a 4 cal/cm² shirt worn on a 25 cal/cm² job — both are not
                &quot;properly used&quot;.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 4."
          />

          <SectionRule />
          <ContentEyebrow>Tool-belt PPE — the items operatives forget to count</ContentEyebrow>

          <ConceptBlock
            title="GS38 leads, voltage indicators, insulating mats and lock-off kit"
            plainEnglish="Some items don&apos;t feel like &apos;PPE&apos; but function as part of the personal protective system: GS38-compliant test leads (HSE Guidance Sheet 38 — finger barriers, fused, short uninsulated tips), two-pole voltage indicators (not multimeters used in voltage-detect mode), insulating mats (BS EN 61111 rated for the working voltage), lock-off devices and unique-issue padlocks. Together with the conventional PPE these form the safe-isolation kit."
            onSite="The L3 supervisor verification covers this kit as much as the textile PPE. GS38 leads from a reputable manufacturer, in date, no exposed pins. Two-pole voltage indicator that is itself tested before and after use against a known source. Insulating mat rated for the voltage. Lock-off kit with unique padlocks. Without these the safe-isolation procedure isn&apos;t actually safe."
          >
            <p>Safe-isolation kit checklist:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>GS38-compliant test leads</strong> — finger barriers, fused, short
                uninsulated tip max 4 mm.
              </li>
              <li>
                <strong>Two-pole voltage indicator</strong> — purpose-made, not a multimeter
                with leads.
              </li>
              <li>
                <strong>Proving unit</strong> — used to prove voltage indicator working
                before and after the test.
              </li>
              <li>
                <strong>Insulating mat</strong> — BS EN 61111 rated; placed in front of the
                gear when working at the panel.
              </li>
              <li>
                <strong>Lock-off devices</strong> — for MCBs, isolators, plugs; multi-lock
                hasps for multi-trade isolation.
              </li>
              <li>
                <strong>Unique padlocks</strong> — one per operative, keyed differently;
                operative retains key personally.
              </li>
              <li>
                <strong>Caution tags</strong> — name, date, contact; attached to lock-off.
              </li>
              <li>
                <strong>Fault-finding gloves</strong> — Class 00 / Class 0 electrical
                insulating, for any condition where re-energisation is possible.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Long-latency disease and the records you must keep</ContentEyebrow>

          <ConceptBlock
            title="Why the records of today&apos;s PPE compliance are the firm&apos;s defence in 2045"
            plainEnglish="Many occupational diseases have long latency periods — silicosis, asbestos-related disease, hand-arm vibration syndrome, occupational cancers including those from welding fume. The exposure that causes the disease today produces the diagnosis in 15-30 years. When the claim is brought, the firm&apos;s defence depends on the records that show what controls were in place at the time of the exposure. PPE register entries from 2025 may need to be producible in 2045 to defend a HAVS or silicosis claim. The L3 supervisor maintaining the PPE register today is contributing to a defence that may be needed decades from now."
            onSite="Practical implication for record retention: the standard 3-year RIDDOR retention is the legal minimum, not the practical sufficient period. Records relating to substance exposure (silica, welding fume, asbestos), vibration exposure, noise exposure should be retained for the working life of the operative plus a decade beyond. ISO 45001 certifications, PI insurer requirements and PQQ client expectations all push retention beyond the legal minimum. Digital storage with redundant backup is the standard arrangement."
          >
            <p>What records support a long-latency disease defence:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PPE register entries</strong> for the operative across their
                career — what items were issued, when, what standard, replacement cycle.
              </li>
              <li>
                <strong>Fit-test records</strong> for RPE — confirming the mask actually
                sealed when worn by this specific operative.
              </li>
              <li>
                <strong>Training records</strong> — Reg 9 information, instruction and
                training delivered, attendance signed, refresher cycle followed.
              </li>
              <li>
                <strong>Engineering control records</strong> — LEV thorough examination
                certificates (Reg 9 COSHH), wet-cut equipment inventory, M-class vacuum
                purchase and maintenance.
              </li>
              <li>
                <strong>Exposure monitoring</strong> where carried out — measurements
                against WEL, trend analysis, action thresholds.
              </li>
              <li>
                <strong>Health surveillance</strong> — Tier 1 questionnaires, Tier 2 nurse
                screening, Tier 3 medical screening, occupational health reports.
              </li>
              <li>
                <strong>RAMS and method statement</strong> for the specific activities
                across the operative&apos;s working time at the firm.
              </li>
              <li>
                <strong>Near-miss and incident records</strong> — what was raised, what
                was acted on, what lessons were shared.
              </li>
              <li>
                <strong>Material substitution evidence</strong> — when lower-hazard
                substances or methods were adopted; documentation of the substitution.
              </li>
              <li>
                <strong>Audit history</strong> — internal H&amp;S audit, ISO 45001
                surveillance, scheme body assessment, PQQ client audit.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <Scenario
            title="Issuing PPE to a new starter on day one"
            situation={
              <>
                A new L2 apprentice is starting with your firm on Monday. The contracts
                manager has handed you the firm&apos;s &quot;new-starter PPE pack&quot;
                — hard hat, safety boots, hi-vis, safety glasses, FFP3 mask, gloves — and
                asked you to issue it and brief them. The first job is a small commercial
                fit-out involving cable installation in containment, some chasing, light
                manual handling and possible work at low height from a step podium. The
                pack does not include electrical insulating gloves, fit-tested RPE, harness,
                or arc-flash kit.
              </>
            }
            whatToDo={
              <>
                Issue the pack with proper briefing under PPE Regs Reg 9 — what each item
                is for, how to use it, its limitations, how to maintain it, when to report
                damage or loss. Then identify what is MISSING for the specific task: the
                FFP3 mask in the pack needs to be face-fit tested before the chasing
                element can proceed (book the test for week 1); if any live work or
                isolation is anticipated, electrical insulating gloves and GS38 leads need
                to be added; the step podium needs to be inspected and tagged. Update the
                PPE register with the items issued; record the briefing. The L2 should
                NOT start chasing work before the fit-test is done. The L3 supervisor
                role is to identify these gaps before they create exposure, not after.
              </>
            }
            whyItMatters={
              <>
                Generic new-starter PPE packs are convenient but often inadequate for the
                specific work the operative will do. PPE Regs Reg 6 requires the
                assessment per activity, not per operative. The L3 supervisor issuing
                the pack closes the loop between the pack and the activity by checking
                what additional items are required. Skipping that step is how operatives
                end up doing chasing in an unfit-tested mask — administratively compliant
                (mask issued) but operationally non-compliant (mask not sealing to face).
              </>
            }
          />

          <SectionRule />
          <ContentEyebrow>Case study — R v Western Power Distribution [2019] and the cost of inadequate arc-flash PPE</ContentEyebrow>

          <ConceptBlock
            title="A &pound;1.6m fine after an arc-flash incident exposed a PPE-selection failure"
            plainEnglish="Western Power Distribution was fined &pound;1.6m at Plymouth Crown Court in 2019 after an operative suffered severe burns during switchgear racking operations at a substation in Cornwall. The HSE&apos;s investigation found that the operative had been wearing PPE rated to a lower ATPV than the calculated incident energy at the working position. The firm had not conducted a current arc-flash study; the PPE selection had been based on an older study that did not reflect the current upstream protection settings or the actual switchgear configuration. The Sentencing Council guideline placed the breach in the &apos;high culpability&apos; band because the failure to maintain a current arc-flash study was a systemic management failure, not an individual operative error."
            onSite="The L3 reading: the ATPV number on the label of the PPE is meaningless unless someone has done the corresponding calculation of incident energy at the working position. Both numbers must be available; the PPE rating must equal or exceed the incident energy. A firm that issues &apos;arc-flash kit&apos; without a corresponding arc-flash study is providing theatre, not protection. The L3 supervisor scheduled for switchgear work needs to know both numbers before starting work; if the study is out of date or absent, escalate before proceeding."
          >
            <p>What the Western Power case teaches about arc-flash PPE selection:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Arc-flash study is required before PPE selection</strong> — without
                a calculation of incident energy at each working position, the ATPV
                selection has no basis.
              </li>
              <li>
                <strong>Studies must be current</strong> — protection settings, upstream
                impedances and switchgear configuration change over the life of an
                installation; studies more than 5 years old are commonly out of date.
              </li>
              <li>
                <strong>Working position matters</strong> — incident energy varies sharply
                with distance from the arc; PPE rated for one position may be inadequate
                for another.
              </li>
              <li>
                <strong>Layering arithmetic is manufacturer-specific</strong> — combining
                an 8 cal/cm² shirt with a 12 cal/cm² coat does NOT give 20 cal/cm²
                protection unless the manufacturer&apos;s system rating supports it.
              </li>
              <li>
                <strong>Underlayers matter</strong> — synthetic underlayers melt in arc
                events; cotton or FR underlayers only.
              </li>
              <li>
                <strong>Donning sequence and integrity</strong> — gaps in coverage
                (rolled-up sleeves, open collars, raised visors) defeat the rating.
              </li>
              <li>
                <strong>Above 40 cal/cm²</strong> — HSE / industry guidance is that work
                should not proceed live; remote racking, temporary de-energisation or
                redesign of the working method is required.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Step-by-step procedure — pre-use inspection of electrical insulating gloves</ContentEyebrow>

          <ConceptBlock
            title="The 60-second routine that catches the pinhole that kills"
            plainEnglish="Electrical insulating gloves (EN 60903) are arguably the highest-stakes single piece of PPE in the electrical trade — they directly prevent fatal electric shock when used correctly, and provide negligible protection when defective. The pre-use inspection is mandatory under PPE Regs Reg 9 and under EAWR Reg 4(4). It takes 60 seconds and follows a standard sequence: external visual, internal visual, air-test (mechanical pressurisation), final external visual. The L3 supervisor models the routine in front of the team and verifies that operatives are doing it before live work."
            onSite="Practical sequence the L3 supervisor follows and demonstrates: (1) check the cert is in date; (2) remove gloves from storage bag, look at external surface for cracks, cuts, embedded particles, contamination, discolouration; (3) turn gloves inside out, repeat inspection of internal surface; (4) air-test by rolling the cuff to trap air, gently squeeze to pressurise, look and listen for leaks; (5) return to right-way-out, final external check; (6) only then use. Any anomaly = scrap the glove, draw a fresh pair, log the failed pair for the next dielectric test cycle."
          >
            <p>Pre-use inspection step-by-step:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Verify certificate in date</strong> — dielectric test typically
                6-monthly; cert accompanies the pair via serial number.
              </li>
              <li>
                <strong>External visual</strong> — surface defects, cracks, cuts,
                embedded grit, contamination by oil / solvent / chemical, signs of
                ageing (UV cracking, discolouration).
              </li>
              <li>
                <strong>Internal visual</strong> — turn inside out; repeat the visual
                inspection for the internal surface.
              </li>
              <li>
                <strong>Air-test</strong> — return to right-way-out; roll the cuff to
                trap air; squeeze gently to pressurise; look for any deflation, listen
                for any hiss; repeat for the other glove.
              </li>
              <li>
                <strong>Re-inspect after air-test</strong> — sometimes inflation reveals
                pinholes not visible flat.
              </li>
              <li>
                <strong>If any anomaly</strong> — pair is scrapped; do not use; log the
                failed pair; draw replacements.
              </li>
              <li>
                <strong>Storage between uses</strong> — protective bag; not folded
                sharply; out of UV / heat / chemical contamination.
              </li>
              <li>
                <strong>Leather over-gloves</strong> — optional mechanical protection over
                the insulating glove; inspect separately.
              </li>
              <li>
                <strong>Log entry</strong> — short note in the operative&apos;s job pack
                confirming the inspection was done; date and time.
              </li>
            </ol>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Cross-reference — PPE Regs Reg 4 / Reg 6 / Reg 7 / Reg 9 unpacked</ContentEyebrow>

          <ConceptBlock
            title="The four-part PPE duty structure and what each Regulation requires"
            plainEnglish="PPE Regs 1992 (as amended 2022) sets out the employer&apos;s duties across four key regulations that together form the operational compliance structure. Reg 4 — provision; Reg 6 — assessment; Reg 7 — maintenance; Reg 9 — information, instruction and training. The L3 supervisor literate in these four regs can locate the specific duty that applies to any PPE-related question and cite it precisely. Inspectors often ask which specific Reg is engaged when discussing a finding; being able to answer correctly strengthens the operative&apos;s position."
            onSite="The four regs sit underneath the daily PPE routine. When you issue an item to an operative, Reg 4 (provision) and Reg 9 (training) are engaged. When you select PPE for a specific task, Reg 6 (assessment) is engaged. When you check the harness inspection cert is in date, Reg 7 (maintenance) is engaged. Knowing which reg is engaged means knowing what evidence the inspector will ask for."
          >
            <p>The four Regs compared:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 4 — Provision</strong>. Suitable PPE must be provided to
                employees (extended to limb (b) workers since 2022) where risks cannot
                be adequately controlled by higher means. Provision means free of
                charge under HASAWA s.9.
              </li>
              <li>
                <strong>Reg 5 — Compatibility</strong>. Where multiple PPE items are
                required, the items must be compatible with each other and remain
                effective in combination.
              </li>
              <li>
                <strong>Reg 6 — Assessment</strong>. Before choosing PPE, an assessment
                must be made to determine whether the intended PPE is suitable. The
                assessment considers the risks, the characteristics of the PPE, the
                operative, and the workplace.
              </li>
              <li>
                <strong>Reg 7 — Maintenance and replacement</strong>. PPE provided must
                be maintained in efficient working order and good repair. Inspection
                regimes, replacement schedules and post-event retirement all sit here.
              </li>
              <li>
                <strong>Reg 8 — Accommodation</strong>. Appropriate accommodation must
                be provided for the PPE when not in use. Lockers, secure storage, dry
                conditions.
              </li>
              <li>
                <strong>Reg 9 — Information, instruction and training</strong>. The
                employee must be provided with information on the risks the PPE
                addresses, the manner of use, and the actions required to maintain it.
              </li>
              <li>
                <strong>Reg 10 — Use of PPE</strong>. Employer must take all reasonable
                steps to ensure PPE is properly used.
              </li>
              <li>
                <strong>Reg 11 — Reporting loss or defect</strong>. Employee must report
                loss of or obvious defect in PPE provided.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Inspector visit walkthrough — the PPE evidence the inspector requests</ContentEyebrow>

          <ConceptBlock
            title="What the HSE asks to see when PPE compliance is the focus"
            plainEnglish="HSE inspections that focus on PPE compliance (often triggered by a RIDDOR report or a sectoral campaign) follow a predictable pattern. The inspector requests the PPE register, the Reg 6 assessment for the activity being inspected, the inspection records for the items in use, the fit-test certs for any tight-fitting RPE, the training records for the operatives present, the replacement schedule, and a sample of the actual items to verify they match the register entries. Gaps between the documentary record and what is physically being worn are what trigger improvement notices and FFI."
            onSite="The L3 supervisor reflex on a PPE-focused inspection: produce documents promptly; demonstrate the inspection routine on the actual items; show fit-test certs current; show training records current; show the replacement schedule and items approaching expiry; show the post-event retirement procedure. Confidence and competence in the routine signals to the inspector that the firm runs the system; hesitation and inconsistency signals the opposite."
          >
            <p>The PPE inspection document list:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PPE register</strong> — items issued, to whom, when, expected
                service life, inspection record, replacement date.
              </li>
              <li>
                <strong>Reg 6 PPE assessment</strong> — for the current activity; what
                PPE was selected and why.
              </li>
              <li>
                <strong>Inspection records</strong> — periodic inspection by competent
                person for complex PPE (harness, electrical gloves, RPE).
              </li>
              <li>
                <strong>Fit-test certificates</strong> — for tight-fitting RPE; date,
                method, result, operative name.
              </li>
              <li>
                <strong>Training records</strong> — Reg 9 information, instruction and
                training; what was delivered, when, attendance.
              </li>
              <li>
                <strong>Replacement schedule</strong> — items approaching expiry; budget
                allocation for replacements.
              </li>
              <li>
                <strong>Post-event records</strong> — items retired after damage / event;
                replacement provided.
              </li>
              <li>
                <strong>Manufacturer documentation</strong> — for complex PPE: data
                sheets, system ratings, layering compatibility.
              </li>
              <li>
                <strong>Audit history</strong> — internal audit results, external scheme
                / ISO 45001 audit findings.
              </li>
              <li>
                <strong>Physical items</strong> — produced for inspection alongside the
                register entries.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from L2 — wear PPE. At L3 the depth is EN-standard literacy and verification.",
            "EN standards for the main PPE categories — footwear (EN ISO 20345), hat (EN 397), electrical gloves (EN 60903), RPE (EN 149), eye (EN 166), harness (EN 361), arc-flash (EN 61482).",
            "PPE Regs Reg 6 — task-specific PPE assessment; not a generic pack.",
            "Verification routine — standard, condition, fit, training, pre-use inspection, replacement schedule.",
            "Compatibility — multiple PPE items must work together; test combinations before deploying.",
            "Replacement triggers — manufacturer service life, damage, contamination, extreme exposure, standard change, user change.",
            "Face-fit testing required for tight-fitting RPE; periodic dielectric testing for electrical gloves.",
            "L3 supervisor reads the labels and intervenes when PPE doesn't match the hazard.",
            "Western Power Distribution &pound;1.6m (2019) — arc-flash PPE rated below the calculated incident energy at the working position.",
            "Arc-flash PPE selection requires both ATPV rating on the kit AND a current incident-energy study at the working position.",
            "EN 60903 dielectric testing every 6 months + pre-use air-test + visual inspection — three layers of glove verification.",
            "PPE Regs structure: Reg 4 provision, Reg 5 compatibility, Reg 6 assessment, Reg 7 maintenance, Reg 8 accommodation, Reg 9 training, Reg 10 use, Reg 11 reporting.",
          ]} />
          <Quiz title="PPE selection and verification — knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section3-2')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">3.2 PPE hierarchy of control</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section3-4')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">3.4 First-aid facilities</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
