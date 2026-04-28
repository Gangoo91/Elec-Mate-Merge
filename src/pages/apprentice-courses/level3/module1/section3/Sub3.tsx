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
          ]} />
          <LearningOutcomes outcomes={[
            "Specify appropriate PPE for common electrical-trade hazards — live testing, switchgear, arc-flash, masonry chasing, working at height, manual handling.",
            "Identify EN standards for the main PPE categories.",
            "State the inspection and replacement requirements per standard / manufacturer.",
            "Apply the L3 supervisor verification routine — markings, condition, fit, training, replacement.",
            "Recognise compatibility issues when multiple PPE items must work together (helmet + hearing + glasses).",
            "Identify face-fit testing requirement for tight-fitting RPE.",
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
            </ul>
          </ConceptBlock>

          <RegsCallout source="PPE Regs 1992 (as amended) — Reg 6 (assessment of PPE)" clause={<>"Before choosing any personal protective equipment which by virtue of regulation 4 he is required to ensure is provided, an employer or self-employed person shall ensure that an assessment is made to determine whether the personal protective equipment he intends will be provided is suitable."</>} meaning={<>The Reg 6 PPE assessment is separate from the broader Reg 3 risk assessment. It specifically considers PPE choice — is this item suitable for the user, the task and the workplace? Knowledge of EN standards is essential to discharge Reg 6 properly.</>} cite="Source: Personal Protective Equipment at Work Regulations 1992 (SI 1992/2966), Reg 6 — verbatim from legislation.gov.uk." />

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
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>Inspection, expiry and lifecycle</ContentEyebrow>
          <ConceptBlock title="Pre-use inspection — the operative&apos;s discipline" plainEnglish="Every PPE item should be visually inspected by the operative before each use. For most items this is seconds — check for visible damage, contamination, expiry. For complex PPE (harness, electrical gloves) the inspection is structured and recorded." onSite="The L3 supervisor builds the habit by modelling it. Visibly inspect your own PPE in front of the team. Ask &apos;when did you last check that?&apos; rather than checking yourself — coaching beats inspecting.">
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
            </ul>
          </ConceptBlock>

          <RegsCallout source="PPE Regs 1992 — Reg 7 (Maintenance and replacement)" clause={<>"Every employer shall ensure that any personal protective equipment provided to his employees is maintained (including replaced or cleaned as appropriate) in an efficient state, in efficient working order and in good repair."</>} meaning={<>Reg 7 — the maintenance duty. Provision (Reg 4) and selection (Reg 6) aren&apos;t enough; ongoing maintenance is required. Inspection regimes, replacement schedules and post-event retirement all sit under Reg 7. The L3 supervisor verification is the operational discharge of this duty.</>} cite="Source: Personal Protective Equipment at Work Regulations 1992 (SI 1992/2966), Reg 7 — verbatim from legislation.gov.uk." />

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

          <RegsCallout source="PPE Regs 1992 — Reg 9 (Information, instruction and training)" clause={<>"Every employer who provides personal protective equipment to an employee shall ensure that the employee is provided with such information, instruction and training as is adequate and appropriate to enable the employee to know — (a) the risk or risks which the personal protective equipment will avoid or limit; (b) the purpose for which and the manner in which personal protective equipment is to be used; and (c) any action to be taken by the employee to ensure that the personal protective equipment remains in efficient working order and in good repair."</>} meaning={<>Reg 9 — the training duty. Issuing PPE without training is non-compliance. Brief on-issue for simple items; formal training and records for complex items. The L3 supervisor often delivers the on-issue brief and contributes to formal training records.</>} cite="Source: Personal Protective Equipment at Work Regulations 1992 (SI 1992/2966), Reg 9 — verbatim from legislation.gov.uk." />

          <SectionRule />
          <CommonMistake title="Issuing 'general PPE' without task-specific selection" whatHappens={<>Apprentice issued generic PPE pack on day 1; goes to a switchroom with FFP3 mask but no electrical insulating gloves; no arc-flash kit. PPE Regs Reg 4 / Reg 6 breach; firm prosecuted; injury could have been prevented by task-specific selection.</>} doInstead={<>Reg 6 PPE assessment per task-type. Issue the kit needed for the work, not a generic pack. Maintain a PPE matrix mapping task to required kit.</>} />

          <CommonMistake title="Ignoring expiry dates on hard hats" whatHappens={<>Operative wearing a 7-year-old hard hat (manufacturer states 5-year service life). Falling object causes the helmet to crack. Head injury follows. PUWER + PPE Regs breach; firm prosecuted; the helmet WAS supplied but was no longer suitable.</>} doInstead={<>Replacement schedule from date of manufacture (printed underneath helmet). 5 years typical for industrial helmets. Periodic check by supervisor; replace before service life expires.</>} />

          <Scenario title="Selecting PPE for a switchroom inspection" situation={<>You're scheduled to do an EICR on a small commercial switchroom — 400V three-phase distribution, 250A main switch, several sub-DBs. The work involves opening covers, observing terminations, taking insulation resistance readings (after isolation). Your firm\'s standard PPE pack has hard hat, safety glasses, hi-vis, safety boots and FFP3 masks.</>} whatToDo={<>Reassess PPE for this specific work. Not adequate as-is. Add: (1) electrical insulating gloves EN 60903 Class 00 (500V) or Class 0 (1,000V) for any test work or potential live-conductor proximity; (2) arc-flash PPE EN 61482 with ATPV rating matching the calculated incident energy at the working position (request from the design team or use a conservative estimate — typically 8-12 cal/cm² for a small commercial DB); (3) face shield rated for arc protection; (4) cotton or FR base layer (synthetic melts in arc events); (5) insulating mat if working in front of the panel; (6) voltage indicator + GS38 leads. Brief the L2 mate on the additions and the reasons. Document the PPE selection on the dynamic risk assessment. The standard pack isn\'t wrong; it\'s incomplete for this task.</>} whyItMatters={<>Switchgear arc-flash incidents are some of the highest-consequence electrical events. Standard hi-vis + FFP3 pack offers no arc protection. The L3 supervisor\'s PPE selection literacy turns "we have PPE" into "we have the right PPE". The gap between the two is what kills people in switchroom incidents.</>} />

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
            "L3 supervisor reads the labels and intervenes when PPE doesn\'t match the hazard.",
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
