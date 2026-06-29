/**
 * Module 5 · Section 5 · Subsection 5 — EICR vs Initial Verification,
 * frequency tables, landlord legal requirements
 * Maps to C&G 2365-03 / Unit 304 / LO5 / AC 5.4 — "specify the recommended
 *   frequency of periodic inspection and testing for different installation
 *   types"
 *
 * Layered depth: 2357 Unit 607 ELTK06 / AC 4.x; 2366-03 Unit 302 / AC 4.x
 * (frequency and recommended intervals).
 *
 * The L3 lift on EICR frequency — beyond memorising "5 years for rented" into
 * the underlying logic of why each installation type gets the interval it
 * does, plus the contrast with Initial Verification (which is one-off per new
 * install or alteration), plus the statutory framework that turns the
 * recommended interval into a legal duty for rented dwellings via the
 * Electrical Safety Standards in the Private Rented Sector (England)
 * Regulations 2020.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';

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

const TITLE = 'EICR vs Initial Verification, frequencies, landlord law | Level 3 Module 5.5.5 | Elec-Mate';
const DESCRIPTION =
  'The legal and technical contrast between Initial Verification and Periodic Inspection — frequency tables per ESF guidance, the underlying logic, and the statutory landlord duty under the Electrical Safety Standards in the Private Rented Sector Regulations 2020.';

const checks = [
  {
    id: 'm5-s5-sub5-iv-vs-eicr',
    question: 'The fundamental difference between Initial Verification and Periodic Inspection (EICR) is:',
    options: [
      "Initial Verification is one-off, performed before the installation is energised for the first time (or after major alteration), and produces an EIC. Periodic Inspection is recurring, performed at intervals throughout the installation's life to verify it remains in safe condition, and produces an EICR. Initial Verification is in BS 7671 Chapter 64; Periodic Inspection is in Chapter 65.",
      "Initial Verification is the visual inspection only, while Periodic Inspection is the testing only. The two are different halves of the same one-off process carried out at commissioning — the inspector looks first (Initial Verification), then tests (Periodic Inspection), and both are recorded together on the EIC.",
      "Initial Verification applies to domestic installations and Periodic Inspection to commercial ones. The distinction is by property type rather than by lifecycle stage, so a new factory gets a Periodic Inspection at commissioning and a new house gets an Initial Verification.",
      "Initial Verification is carried out by the installer and Periodic Inspection by the DNO. Both happen at commissioning, but the network operator performs the periodic check of the supply while the contractor performs the initial check of the consumer's wiring; both produce an EIC.",
    ],
    correctIndex: 0,
    explanation:
      'Initial Verification (BS 7671 Chapter 64) verifies a new installation (or major alteration) complies with BS 7671 before it is placed into service for the first time. The output is an EIC. The duty is on the installer/designer/inspector and arises from BS 7671 Reg 641.1. Periodic Inspection (Chapter 65) verifies an existing installation remains in safe condition at intervals through its life. The output is an EICR. The duty is on the installation owner/occupier under EAWR Reg 4(2) (and on landlords under the PRS Regs 2020 for rented dwellings). Both are inspections; both are required; they sit at different points in the installation lifecycle.',
  },
  {
    id: 'm5-s5-sub5-frequency',
    question: 'Per Electrical Safety First and IET GN3 frequency guidance, the typical EICR interval for a rented dwelling is:',
    options: [
      "1 year — a rented dwelling must be inspected annually under the PRS Regulations 2020 because tenants change frequently and the landlord carries a heightened duty of care. The annual EICR is the statutory minimum and cannot be extended even where the installation is in good condition.",
      "10 years (or change of tenancy, whichever is sooner) — the same interval as an owner-occupied dwelling. The PRS Regulations adopt the standard domestic 10-year cycle, with a fresh EICR only triggered earlier if a new tenant moves in.",
      "3 years — the PRS Regulations set a three-year cycle for rented dwellings, sitting between the commercial and domestic intervals. The three-year figure reflects the higher turnover of tenants compared with owner-occupiers.",
      "5 years (or change of tenancy, whichever is sooner) — per the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. The 5-year interval is the statutory maximum; shorter intervals can be specified on the EICR where condition warrants.",
    ],
    correctIndex: 3,
    explanation:
      'The PRS Regs 2020 fix the rented-dwelling EICR interval at a statutory maximum of 5 years (or change of tenancy, whichever is sooner). The interval is a hard maximum — landlords cannot stretch it; local authorities can enforce. The inspector can recommend a shorter interval on the EICR where the installation condition warrants (e.g. older installation with multiple defects being remediated, where the inspector wants to verify the remediation within 1-2 years). The 5-year interval aligns with ESF and GN3 guidance for rented domestic dwellings; owner-occupied dwellings get 10 years per the same guidance, but with no statutory backing.',
  },
  {
    id: 'm5-s5-sub5-prs-penalty',
    question: 'A landlord receives an Unsatisfactory EICR. Under the PRS Regulations 2020 the landlord must remediate within 28 days and provide written confirmation. Failure to comply can result in:',
    options: [
      "A criminal prosecution carrying an unlimited fine and up to two years' imprisonment for the landlord. Breach of the PRS Regulations is an either-way offence under the Health and Safety at Work Act, so the landlord faces the Crown Court rather than any civil penalty.",
      "Immediate revocation of the landlord's rental licence by the Electrical Safety First charity, which administers the scheme. ESF withdraws the landlord's registration and bars them from letting property until the remediation is verified.",
      "Local authority enforcement with civil penalties up to £30,000 per breach. Multiple breaches can result in cumulative penalties. The local authority can also undertake the remedial works themselves and recover the cost from the landlord. Severe or repeat breaches can affect the landlord's standing in the rental market and (in extreme cases) result in property prohibition orders.",
      "Automatic eviction of the tenant by the council so the property can be made safe. The local authority's remedy is to clear the property rather than penalise the landlord, after which the landlord is free to carry out the remedial works at their own pace.",
    ],
    correctIndex: 2,
    explanation:
      "The PRS Regs 2020 give local authorities real enforcement powers. Civil penalties up to £30,000 per breach is the headline number; in practice the local authority can also undertake the remedial works and recover the cost, issue improvement notices, and (in extreme cases of refusal) seek property prohibition. The landlord's exposure is real — multiple breaches across a property portfolio can quickly run into six figures of penalties. Inspectors should brief landlords on these consequences at the EICR handover so the landlord understands the urgency of remediation, not just the inspector's opinion.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS 7671 Chapter 64 (Initial Verification) and Chapter 65 (Periodic Inspection) differ in their:',
    options: [
      "Test voltage only — Chapter 64 uses a 500 V insulation-resistance test for a new install while Chapter 65 uses 250 V for a periodic inspection. Every other aspect of the two chapters is identical, including the output document and the duty holder.",
      "Trigger event (Chapter 64 = before energising / after major alteration; Chapter 65 = recurring through installation life), output document (EIC for Chapter 64; EICR for Chapter 65), duty holder for commissioning (installer/designer for Chapter 64; owner/occupier for Chapter 65), and emphasis (Chapter 64 = compliance with BS 7671 at certification; Chapter 65 = safe condition for continued service).",
      "Property type only — Chapter 64 covers domestic installations and Chapter 65 covers commercial and industrial ones. Both are carried out at the same point in the installation's life and both produce an EIC; the chapter chosen simply depends on the kind of building.",
      "Who pays only — Chapter 64 work is charged to the customer while Chapter 65 work is funded by the DNO. The technical content and timing of the two chapters is the same; the chapters exist purely to separate the billing arrangements.",
    ],
    correctAnswer: 1,
    explanation:
      "The two chapters serve distinct purposes in the installation lifecycle. Chapter 64 is the entry verification — does this new (or substantially altered) installation comply with BS 7671 and is it safe to energise? Chapter 65 is the ongoing condition assessment — is the existing installation still in safe condition for continued service? The technical tests overlap (continuity, IR, polarity, Zs, RCD operation are common to both) but the framing, output document, duty holder, and emphasis differ. A competent inspector understands both and applies the right framework for the right context.",
  },
  {
    id: 2,
    question: 'A new build housing development reaches practical completion. The contractor issues an EIC for each dwelling. The next inspection event for each dwelling is:',
    options: [
      "A second Initial Verification within twelve months of occupation, to confirm the new wiring has bedded in. The contractor returns a year after completion to repeat the EIC, and only then does the periodic inspection cycle begin.",
      "An EICR after exactly one year regardless of property type. Every new dwelling is given a fixed first-year periodic inspection to catch installation defects early, after which it reverts to the standard 5- or 10-year cycle.",
      "An EICR at the end of the recommended interval set on the EIC — typically 10 years for owner-occupied, 5 years for rented under PRS Regs. The first periodic interval starts from EIC sign-off.",
      "No further inspection at all — the EIC certifies the dwelling for the life of the installation. Because the wiring was verified as compliant at completion, a new build never needs a periodic EICR unless it is altered.",
    ],
    correctAnswer: 2,
    explanation:
      "The EIC issued at completion sets the start of the periodic inspection cycle. The recommended interval on the EIC (per BS 7671 Section 651 and GN3 guidance) defines when the first EICR is due. For owner-occupied dwellings the interval is typically 10 years; for rented dwellings under the PRS Regs the maximum is 5 years (with the first EICR before the first tenancy starts in some interpretations, definitely required at the end of the first 5-year window or change of tenancy). The Building Regulations Part P Compliance Certificate (separate from the EIC) is issued by the scheme provider for notifiable work and is part of the Reg 132.13 documentation handover.",
  },
  {
    id: 3,
    question: "A commercial premises (small office, no special-risk equipment, owner-occupied by a small business) typically gets an EICR every:",
    options: [
      "1 year per ESF/GN3 guidance — all commercial premises must be inspected annually because business use is inherently higher-risk than domestic. The annual cycle is fixed and cannot be extended even for a low-risk office.",
      "10 years per ESF/GN3 guidance — a small low-risk office gets the same interval as an owner-occupied house, because both are low-footfall environments. The commercial setting makes no difference to the recommended interval.",
      "Whenever the premises changes hands — there is no fixed interval for commercial property, and an EICR is only required at sale or new lease. A business that stays in the same premises indefinitely never needs a periodic inspection.",
      "5 years per ESF/GN3 frequency guidance — adjusted shorter where condition or risk warrants. The 5-year interval is a recommended starting point; commercial environments with higher risk (workshops, kitchens, public-facing spaces) typically warrant shorter intervals.",
    ],
    correctAnswer: 3,
    explanation:
      "ESF and GN3 frequency guidance gives commercial premises a typical 5-year cycle as the starting point. The actual interval recommended on each EICR adjusts for the specific environment — a small low-risk office might justify 5 years; a public-facing retail space with higher footfall and accidental damage risk might warrant 3-4 years; a workshop with industrial-process risk might warrant 1-3 years. The duty under EAWR Reg 4(2) sits with the duty holder; the inspector advises on appropriate frequency based on the specific installation.",
  },
  {
    id: 4,
    question: "An industrial installation (small manufacturing unit with general process equipment) typically gets an EICR every:",
    options: [
      "3 years per ESF/GN3 guidance for general industrial — adjusted shorter for higher-risk processes (chemical, foundry, heavy machinery) or where the installation operates 24/7 with elevated thermal cycling.",
      "10 years per ESF/GN3 guidance — industrial premises get the longest interval of any property type because the installations are robustly built for heavy duty and rarely altered.",
      "6 months per ESF/GN3 guidance — every industrial installation must be inspected twice a year regardless of process risk, because manufacturing environments are the most hazardous of all building types.",
      "There is no recommended interval for industrial installations — they are inspected only when a fault occurs, because continuous production cannot be interrupted for a scheduled EICR.",
    ],
    correctAnswer: 0,
    explanation:
      "Industrial installations carry higher inherent risk than commercial — heavier loads, more thermal cycling, more vibration, more accidental damage from equipment movement, more frequent additions and modifications. ESF/GN3 typical interval is 3 years for general industrial as the starting point. Higher-risk processes (chemical handling, foundries, heavy machinery, 24/7 operation) typically warrant 1-2 year cycles. Specialist locations (petrochemical, hazardous areas under DSEAR/ATEX) have their own specific inspection regimes that may run alongside or replace the standard EICR cycle.",
  },
  {
    id: 5,
    question: "A change of tenancy in a rented dwelling under the PRS Regulations 2020 triggers:",
    options: [
      "A fresh EICR every single time, regardless of how recent the existing certificate is. The PRS Regulations require a brand-new inspection at the start of each tenancy, so a certificate issued only months earlier is void as soon as a new tenant moves in.",
      "An EICR if the existing certificate is more than 5 years old at the date of the new tenancy starting. If the existing certificate is less than 5 years old, it carries forward to the new tenancy. Some local authorities or scheme providers recommend a refreshed EICR at any change of tenancy regardless of certificate age, but the statutory trigger is the 5-year maximum interval (or change of tenancy, whichever is sooner).",
      "No inspection at all — a change of tenancy never triggers an EICR, only the passage of five years does. The existing certificate always carries forward to a new tenant for the remainder of its five-year life regardless of its age.",
      "A Minor Works Certificate rather than an EICR. At each change of tenancy the landlord commissions an MWC to confirm nothing has changed since the last full inspection, which resets the clock without the cost of a complete EICR.",
    ],
    correctAnswer: 1,
    explanation:
      "The PRS Regs 2020 set the maximum interval at 5 years OR change of tenancy, whichever is sooner. So a change of tenancy does not automatically trigger a new EICR — it triggers one only if the existing certificate is more than 5 years old at the date of the new tenancy. A landlord who renews tenancy 2 years after the EICR was issued can carry the existing certificate forward to the new tenant. Best practice — many landlords and managing agents commission a refreshed EICR at change of tenancy regardless, both for tenant assurance and to reset the 5-year clock cleanly. The Regulations set the floor; landlords can exceed it.",
  },
  {
    id: 6,
    question: "Special locations (Section 700 series — bathrooms, swimming pools, agricultural premises, caravans, marinas, EV charging) typically warrant:",
    options: [
      "Longer cycles than the standard for the parent property type, because special-location circuits are designed to a higher specification and so degrade more slowly. A bathroom or swimming-pool circuit is inspected less often than the rest of the dwelling.",
      "The same cycle as the parent property type — special locations carry no different inspection interval because Section 700 circuits are part of the same installation. A bathroom in a rented house is inspected on the same five-year cycle as everything else and never more often.",
      "Shorter cycles than the standard for the parent property type because the elevated risk in special locations justifies more frequent inspection. EV charge points are commonly inspected annually by the EV-charging-equipment manufacturer's recommendation; swimming pools annually for plant room; agricultural premises every 3 years given the harsh environment; caravans and marinas have their own GN3 Chapter 66 frequencies.",
      "No periodic inspection at all — special locations are exempt from the EICR regime because their circuits are protected by 30 mA RCDs, which are deemed to remove the need for routine inspection of those areas.",
    ],
    correctAnswer: 2,
    explanation:
      "Special locations carry elevated risk — proximity to water, agricultural environment, public access, harsh outdoor conditions — that justifies shorter inspection cycles than the parent property type. EV charge points: typically annual or per manufacturer recommendation. Swimming pool plant rooms: annual. Agricultural premises: 3 years per GN3 Section 705 guidance. Caravans and marinas: GN3 Chapter 66 (added in A3) provides specific frequency guidance. The standard property-type interval (5 years rented domestic, 10 years owner-occupied) is the floor for the general installation; special locations within or attached to the property may warrant much shorter cycles within that overall envelope.",
  },
  {
    id: 7,
    question: "The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to:",
    options: [
      'All domestic properties in England, both rented and owner-occupied. The 2020 Regulations made the five-yearly EICR a legal duty for every homeowner as well as every landlord, so an owner living in their own house must commission an EICR every five years.',
      'All commercial and industrial premises in the United Kingdom. The PRS Regulations are a workplace safety measure requiring five-yearly EICRs across offices, shops and factories nationwide; domestic property is covered by separate housing legislation.',
      'Holiday lets and short-term Airbnb-style accommodation only. The Regulations were written specifically for the short-stay rental market and do not apply to ordinary assured shorthold tenancies, which remain outside any mandatory EICR regime.',
      'Rented domestic properties in England — including most assured shorthold tenancies, licences to occupy, and HMOs. Excludes social housing tenancies under separate regulation, lodger arrangements where the landlord shares the dwelling, long leases (7+ years), student halls of residence under separate regimes, and accommodation provided to family members. Wales has its own equivalent (Renting Homes Wales Act 2016 plus the Renting Homes — Fitness for Human Habitation Regulations 2022); Scotland has the Housing (Scotland) Act 2006 plus tolerable standard / repairing standard guidance; Northern Ireland follows similar requirements via the Housing (Northern Ireland) Order 2003.',
    ],
    correctAnswer: 3,
    explanation:
      "The 2020 Regulations apply specifically to rented domestic properties in England. The scope captures most private rented sector tenancies but excludes various special cases (social housing, lodger arrangements, long leases, student halls). Wales, Scotland and Northern Ireland have their own equivalent regimes — broadly similar in effect (5-year periodic inspection, written confirmation to tenants, local authority enforcement) but with different statutory wording and authority. Inspectors working across the UK nations need to know which regime applies to which property; a property in Cardiff is governed by Welsh, not English, law.",
  },
  {
    id: 8,
    question: "After remediation of an Unsatisfactory EICR, the landlord must provide which evidence to demonstrate compliance with the PRS Regulations 2020?",
    options: [
      'Written confirmation from a competent person that (a) the remedial works have been completed, (b) the installation now meets the relevant safety standard. Plus the original EICR (showing the Unsatisfactory finding), the MWC or EIC for the remedial works, and ideally a re-issued or supplementary EICR confirming Satisfactory status. The matched pair (original EICR + remedial certs) evidences the full cycle. The landlord retains for at least the next 5-year cycle and provides on local authority request within 7 days.',
      'A dated photograph of each repaired item, which the landlord emails to the tenant. The Regulations accept photographic evidence as proof of remediation, so a set of before-and-after images is sufficient to demonstrate compliance.',
      "The electrician's invoice for the remedial works. The PRS Regulations treat the paid invoice as confirmation that the faults have been put right, so the landlord simply retains the bill as evidence of compliance.",
      "A signed statement from the tenant confirming the property feels safe to live in. Because the Regulations exist to protect occupants, the tenant's written acceptance is the evidence the landlord must keep, rather than any certificate from the electrician.",
    ],
    correctAnswer: 0,
    explanation:
      "PRS Regs 2020 require written confirmation from a competent person that remediation is complete and the installation now meets the safety standard. The minimum is a written statement; best practice is the matched pair of original EICR plus remedial MWC/EIC plus (where appropriate) a supplementary or re-issued EICR. The landlord retains the evidence for at least the next 5-year cycle and produces it on local authority request within 7 days. An invoice or photo alone is not sufficient — the regulations specify written competent-person confirmation. Inspectors carrying out remedial works should always issue the appropriate certification and confirmation letter so the landlord has the evidence pack the regulations require.",
  },
];

const faqs = [
  {
    question: 'Where do the EICR frequency tables actually come from?',
    answer:
      "Two main sources: IET Guidance Note 3 (which gives recommended intervals per installation type as a non-statutory standard) and Electrical Safety First (which publishes consumer-facing guidance broadly aligned with GN3). For rented dwellings in England the 5-year interval is also a statutory maximum under the PRS Regulations 2020. For owner-occupied dwellings, commercial, industrial, and special locations the intervals are recommendations only — the underlying duty is EAWR Reg 4(2) which requires the duty holder to maintain the installation in safe condition; the recommended intervals are the industry's view of how to discharge that duty.",
  },
  {
    question: "Can the inspector recommend a shorter or longer interval than the standard?",
    answer:
      "Yes — and should where the specific installation warrants it. The standard intervals are starting points; the actual recommended interval on the EICR reflects the inspector's judgement about the specific installation. A heavily-defective installation undergoing remediation might warrant 1-2 years to verify the remediation. An installation in excellent condition with documented O&M might justify the standard interval. An installation under intensive management with competent permanent on-site staff might justify GN3's alternative-regime route (no formal periodic, reliance on the management system). For PRS rented dwellings the 5-year statutory maximum cannot be extended, but shorter intervals can be specified.",
  },
  {
    question: 'Does the PRS Regulations 2020 5-year interval apply if the property is between tenancies?',
    answer:
      "The Regulations apply when there is a tenancy (or licence to occupy) in place. Between tenancies the active duty pauses but the underlying EAWR Reg 4(2) duty on the property owner continues. The next tenancy starting more than 5 years after the previous EICR triggers a fresh EICR before the new tenant moves in. Best practice — many landlords commission an EICR refresh at change of tenancy regardless of the timing, both for tenant assurance and to reset the 5-year clock cleanly aligned to the tenancy.",
  },
  {
    question: "What is the difference between an EIC and an EICR in plain terms?",
    answer:
      'An EIC (Electrical Installation Certificate) is the certificate issued for a NEW installation (or major alteration to an existing one) — it certifies that the installation complies with BS 7671 at the point of certification. An EICR (Electrical Installation Condition Report) is the report issued for an EXISTING installation as part of periodic inspection — it reports on the condition of the installation against current BS 7671 standards. EIC = "this is built right". EICR = "this is still safe to use". Both are formal documents under BS 7671 Appendix 6; both carry legal weight; they have different content, different layout, different purpose, and different duty holders for commissioning.',
  },
  {
    question: 'Are HMOs (Houses in Multiple Occupation) covered by the PRS Regulations?',
    answer:
      "Yes — HMOs are within the scope of the PRS Regulations 2020 along with other private rented sector dwellings. HMOs may also have additional licensing requirements through the local authority HMO licensing regime, which can layer further inspection and compliance duties on top of the PRS Regs baseline. Larger HMOs (5+ unrelated occupants in some local authority schemes, all HMOs in others) require a HMO licence which often includes electrical safety conditions. The 2020 PRS baseline (5-year EICR maximum, written confirmation duties) applies regardless of HMO licensing.",
  },
  {
    question: "What if the landlord disputes a finding on the EICR after the local authority has requested it?",
    answer:
      "The local authority has its own enforcement framework — they will usually accept the EICR as the competent person's professional report. If the landlord disputes the coding, the right route is for the landlord to commission an independent second EICR rather than to argue with the local authority directly. A second competent inspector reviewing the same installation will typically reach a similar conclusion if the original coding was sound; significant disagreement between two competent inspectors usually indicates a quality issue with one of them and may need scheme provider technical review. Inspectors should not weaken their original coding under landlord pressure once the local authority is involved — that would compromise both their professional standing and the integrity of the original report.",
  },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 5 · Subsection 5"
            title="EICR vs Initial Verification, frequency, landlord law"
            description="The lifecycle contrast — Initial Verification before energising, Periodic Inspection through the installation's life — and the statutory framework that turns a recommended interval into a legal duty for rented dwellings under the PRS Regulations 2020."
            tone="emerald"
          />

          <TLDR
            points={[
              "Initial Verification (BS 7671 Chapter 64) — one-off, before energising / after major alteration. Output: EIC. Duty on installer/designer/inspector under Reg 641.1.",
              "Periodic Inspection (BS 7671 Chapter 65) — recurring through installation life. Output: EICR. Duty on owner/occupier under EAWR Reg 4(2); on landlord under PRS Regs 2020 for rented dwellings.",
              "ESF/GN3 typical intervals — rented domestic 5 years (statutory maximum), owner-occupied domestic 10 years, commercial 5 years, industrial 3 years, special locations shorter.",
              "PRS Regs 2020 — statutory maximum 5 years (or change of tenancy, whichever sooner), Unsatisfactory triggers 28-day landlord remediation, written confirmation duties, local authority enforcement up to £30,000 per breach.",
              "Wales / Scotland / Northern Ireland have their own equivalent regimes — broadly similar effect but different statutory wording and authority.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Distinguish Initial Verification from Periodic Inspection in trigger, output, duty holder, and emphasis.",
              "Cite the chapter structure of BS 7671 Part 6 and the role of Chapters 64, 65, 66 in the inspection framework.",
              "State the typical EICR intervals per ESF/GN3 frequency guidance for major property types.",
              "Apply the statutory PRS Regulations 2020 framework for rented dwellings in England — 5-year maximum, change-of-tenancy trigger, written confirmation duties, local authority enforcement.",
              "Distinguish the PRS Regs scope from social housing, lodger arrangements, long leases and student halls.",
              "Recognise the separate regimes in Wales (Renting Homes Wales Act / Fitness for Human Habitation Regulations), Scotland (Housing Scotland Act / tolerable and repairing standards), and Northern Ireland.",
              "Adjust recommended inspection intervals for installation-specific factors — condition, use, environment, defect history, management system in place.",
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>Initial Verification vs Periodic Inspection</ContentEyebrow>

          <ConceptBlock
            title="Two inspections, two purposes, two chapters"
            plainEnglish="BS 7671 Part 6 contains two distinct inspection regimes. Chapter 64 covers Initial Verification — the one-off pre-energising check on a new installation or major alteration. Chapter 65 covers Periodic Inspection — the recurring through-life check that the installation remains safe in service. They use overlapping test methods but serve different purposes and produce different documents."
            onSite="When you arrive on site, the first question is which regime applies. New installation just completed = Initial Verification under Chapter 64, output EIC. Existing installation due for periodic check = Periodic Inspection under Chapter 65, output EICR. Major alteration to an existing installation = Initial Verification of the altered part under Chapter 64, plus consideration of impact on the wider periodic cycle."
          >
            <p>The contrast, structured:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Trigger event.</strong> Initial Verification — before the installation is
                energised for the first time, or after major alteration. Periodic Inspection —
                recurring at intervals through the installation's life.
              </li>
              <li>
                <strong>Output document.</strong> Initial Verification — Electrical Installation
                Certificate (EIC) per BS 7671 Appendix 6. Periodic Inspection — Electrical
                Installation Condition Report (EICR) per BS 7671 Appendix 6.
              </li>
              <li>
                <strong>Duty holder for commissioning.</strong> Initial Verification — installer /
                designer / contractor under BS 7671 Reg 641.1 (and via Building Regulations Part P
                for notifiable domestic work). Periodic Inspection — owner / occupier under EAWR
                Reg 4(2); landlord under PRS Regs 2020 for rented dwellings; employer under
                Workplace (H&S) Regulations 1992 for workplace installations.
              </li>
              <li>
                <strong>Emphasis.</strong> Initial Verification — does this installation comply
                with BS 7671 at certification? Periodic Inspection — is this installation safe to
                remain in service, assessed against current BS 7671 standards?
              </li>
              <li>
                <strong>Coding system.</strong> Initial Verification — no observation codes;
                installation either passes (EIC issued) or fails and is not certified.
                Periodic Inspection — C1, C2, C3, FI codes per the BPG4 framework.
              </li>
              <li>
                <strong>Test sequence.</strong> Both follow BS 7671 Part 6 dead-test sequence
                (continuity → IR → polarity → Zs → RCD operation under Reg 643.7.3 single AC test
                A4:2026), but Initial Verification typically includes 100% of all tests on all
                circuits, while Periodic Inspection allows sampling per GN3 Chapter 3 guidance.
              </li>
              <li>
                <strong>Continuing duty after sign-off.</strong> Initial Verification — installer
                retains continuing duty if defects later attributable to original work emerge.
                Periodic Inspection — inspector retains continuing duty for any C1 found and made
                safe; ongoing maintenance duty under EAWR Reg 4(2) sits with the duty holder.
              </li>
            </ul>
            <p>
              The two regimes work together across the installation lifecycle. Initial
              Verification certifies the installation as built. Periodic Inspection verifies it
              remains safe in service. Major alterations during the life of the installation
              trigger Initial Verification of the altered portion (with an EIC for that work) and
              may shorten the next Periodic Inspection interval if the alteration substantially
              changes the installation profile.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Guidance Note 3 — Purpose of periodic inspection and testing"
            clause="The purpose of periodic inspection and testing is to determine whether an electrical installation is in a satisfactory condition for continued service and to identify any deterioration, defects, or potential safety hazards that may give rise to danger. This includes assessing whether existing circuits, equipment, and protective measures continue to comply with current safety requirements and remain effective."
            meaning={
              <>
                GN3 frames the periodic purpose distinctly from initial verification — "satisfactory
                condition for continued service" rather than "compliance with BS 7671 at
                construction". The shift is important. A periodic inspection assesses an
                installation that may have been built to an older edition of BS 7671 against
                current safety requirements; the question is whether it remains safe, not whether
                it complies retrospectively with standards that did not exist when it was built.
                The coding framework (C1/C2/C3/FI) serves this purpose by communicating
                ongoing-safety judgements rather than as-built compliance.
              </>
            }
            cite="Source: IET Guidance Note 3 — purpose of periodic inspection and testing distinguishing it from initial verification."
          />

          <SectionRule />

          <ContentEyebrow>The frequency framework</ContentEyebrow>

          <ConceptBlock
            title="ESF / GN3 frequency guidance — the typical intervals"
            plainEnglish="Electrical Safety First and IET Guidance Note 3 publish frequency tables that give recommended EICR intervals per property type. The intervals are starting points; actual intervals on each EICR adjust for the specific installation's age, condition, use, environment, and defect history."
            onSite="Quote the standard interval, then adjust based on what you find. A pristine installation in good condition might justify the standard interval; a heavily-defective installation under remediation might justify a 1-2 year interval to verify remediation. The recommendation goes on the EICR Section H (Recommended next inspection date)."
          >
            <p>The typical intervals per property type:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Owner-occupied domestic dwelling.</strong> 10 years per ESF/GN3. Most
                common interval for the UK domestic stock. Underlying duty is EAWR Reg 4(2) on
                the homeowner; no statutory periodic interval but the recommended cycle is the
                standard for discharging the duty.
              </li>
              <li>
                <strong>Rented domestic dwelling (England).</strong> 5 years per PRS Regs 2020
                statutory maximum, OR change of tenancy whichever is sooner. The 5-year interval
                is statutory; the change-of-tenancy trigger is a hard reset only if the existing
                certificate is more than 5 years old at the new tenancy.
              </li>
              <li>
                <strong>Commercial premises (offices, retail, light commercial).</strong> 5 years
                per ESF/GN3 as starting point. Adjusted shorter for higher-risk environments
                (public-facing retail, food service, public assembly) typically 3-4 years.
              </li>
              <li>
                <strong>Industrial premises (manufacturing, workshops, light industrial).</strong>
                3 years per ESF/GN3 as starting point. Heavier industrial environments
                (foundries, chemical handling, 24/7 operation) typically 1-2 years; specialist
                hazardous-area regimes (DSEAR/ATEX) may run separately or in addition.
              </li>
              <li>
                <strong>Public buildings (schools, hospitals, public assembly).</strong> Variable
                — schools typically 5 years per ESF guidance with annual or termly visual checks;
                hospitals often 3 years for general areas with shorter cycles for theatres and
                critical care; public assembly venues 1-3 years per local authority licensing
                regime.
              </li>
              <li>
                <strong>Special locations (Section 700 series).</strong> Generally shorter than
                parent property type — bathroom inspection within parent dwelling cycle but with
                100% inspection rather than sample; swimming pool plant rooms annual; agricultural
                premises 3 years; EV charge points typically annual or per manufacturer
                recommendation; caravans and marinas per GN3 Chapter 66.
              </li>
              <li>
                <strong>Construction site installations.</strong> 3 months per BS 7375 / GN3 —
                temporary, hostile environment, frequent reconfiguration justify the short cycle.
              </li>
              <li>
                <strong>Petrol filling stations.</strong> Annual per APEA / EI guidance — high
                consequence in fault, hazardous-area zones require frequent verification.
              </li>
            </ul>
            <p>
              The intervals above are typical ESF/GN3 recommendations as starting points. The
              inspector adjusts based on installation-specific factors. For PRS rented dwellings
              the 5-year interval is a statutory maximum that cannot be extended; for all other
              property types the intervals are recommendations, with the underlying EAWR Reg 4(2)
              duty driving compliance.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Guidance Note 3 — Frequency determined by condition and use, per EAWR"
            clause="The frequency (periodicity) of periodic inspection and testing shall be determined on the basis of the condition of the installation, type of installation, severity of the loading and external influences, and the probable effects of deterioration, in accordance with the duty under EAWR. GN3 provides guidance to assess appropriate intervals; the regulation does not prescribe fixed intervals for all installations."
            meaning={
              <>
                GN3 is explicit — frequency is a judgement call rooted in the EAWR Reg 4(2) duty,
                not a fixed-table prescription. The standard intervals (5 years rented domestic,
                10 years owner-occupied, etc.) are starting points reflecting typical condition
                and use; the inspector adjusts based on the specific installation. A new
                installation in excellent condition may justify the standard interval; an aged
                installation with multiple defects under remediation typically warrants a shorter
                interval to verify the remediation. The recommended interval goes on the EICR and
                the duty holder is responsible for commissioning the next inspection on time.
              </>
            }
            cite="Source: IET Guidance Note 3 — frequency determination per EAWR Reg 4(2) duty and installation-specific factors."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The PRS Regulations 2020 — statutory landlord duty</ContentEyebrow>

          <ConceptBlock
            title="Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020"
            plainEnglish="The PRS Regs 2020 turn the recommended 5-year EICR interval for rented dwellings into a statutory duty on the landlord. They specify what the inspection must cover, when it must happen, what the landlord must do with the report, and what enforcement powers the local authority has."
            onSite="Brief every landlord client on the PRS Regs at the EICR handover. Many landlords are unaware of the recipient duties (28 days to tenants, 7 days to local authority on request) and the enforcement powers (£30,000 per breach). The inspector who briefs the landlord properly turns the EICR into a real compliance tool, not just a piece of paper."
          >
            <p>The key provisions of the PRS Regs 2020:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Scope.</strong> Rented domestic dwellings in England under most assured
                shorthold tenancies, licences to occupy, and HMOs. Excludes social housing under
                separate regulation, lodger arrangements where the landlord shares the dwelling,
                long leases (7+ years), student halls of residence under separate regimes, and
                accommodation provided to family members.
              </li>
              <li>
                <strong>Inspection duty.</strong> Landlord must ensure the electrical installation
                is inspected and tested at intervals not exceeding 5 years, OR change of tenancy
                whichever is sooner. The inspection is the standard EICR per BS 7671 Chapter 65
                conducted by a competent person.
              </li>
              <li>
                <strong>Competent person definition.</strong> Suitably qualified and experienced
                to inspect the installation — typically a member of a Competent Person Scheme
                (NICEIC, NAPIT, Stroma, Elecsa) registered for periodic inspection and testing,
                or holding 2391 / 2395 / 2394 industry qualifications with documented experience.
              </li>
              <li>
                <strong>Report provision to tenants.</strong> Landlord must provide the EICR (or
                equivalent confirmation) to existing tenants within 28 days of the inspection, to
                new tenants before they occupy the dwelling.
              </li>
              <li>
                <strong>Report provision to local authority.</strong> Landlord must provide the
                EICR to the local authority within 7 days of any request.
              </li>
              <li>
                <strong>Remedial works duty on Unsatisfactory.</strong> Where the EICR identifies
                C1, C2 or FI items requiring remedial works, the landlord must complete the
                remedial works within 28 days of the EICR (or shorter period specified on the
                report) and obtain written confirmation from a competent person that the remedial
                works have been completed and the installation now meets the safety standard.
              </li>
              <li>
                <strong>Local authority enforcement.</strong> Local authority can issue civil
                penalties up to £30,000 per breach, undertake remedial works themselves and
                recover cost from landlord, issue improvement notices, and (in extreme cases)
                seek property prohibition.
              </li>
              <li>
                <strong>Retention.</strong> Landlord must retain the EICR (and any subsequent
                remedial certification) for at least the next inspection cycle (5 years) and
                make available on request to tenants and local authority.
              </li>
            </ul>
            <p>
              The PRS Regs 2020 are the most prescriptive electrical safety regime in UK
              residential property. Inspectors working with landlord clients should treat the
              briefing on PRS Regs as part of every EICR handover; landlords frequently
              under-estimate the recipient duties and the enforcement consequences.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Guidance Note 3 — UK Government guide for landlords electrical safety standards PRS"
            clause="The guidance 'Electrical safety standards in the private rented sector: guide for landlords, tenants and local authorities' can be found on the UK Government website at https://www.gov.uk/government/publications/electrical-safety-standards-in-the-private-rented-sector-guidance-for-landlords-tenants-and-local-authorities/guide-for-landlords-electrical-safety-standards-in-the-private-rented-sector. This is cited as a source of statutory/ best-practice information for landlords."
            meaning={
              <>
                GN3 explicitly references the UK Government guide as a primary source for
                landlords. Inspectors should know this resource exists and direct landlord clients
                to it at the EICR handover. The Government guide unpacks the statutory duties in
                plain language, defines competent person requirements, gives templates for the
                tenant notification, and lists the local authority enforcement powers. A landlord
                who has read the Government guide is a landlord who understands their duties; the
                inspector's briefing role is to point them to the guide and walk through the
                key duties relevant to their specific EICR.
              </>
            }
            cite="Source: UK Government guide for landlords on the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 — referenced in IET Guidance Note 3."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The other UK nations</ContentEyebrow>

          <ConceptBlock
            title="EICR coding — C1, C2, C3, FI and what each one obliges"
            plainEnglish="The EICR records observations against the BS 7671 standard, then assigns each one a code. C1 is danger present, immediate action. C2 is potentially dangerous, urgent remedial. C3 is improvement recommended. FI is further investigation required. The coding drives the customer's response — and a wrong code (under-coded danger or over-coded triviality) carries professional risk for the inspector."
            onSite="The Electrical Safety First Best Practice Guide 4 (Electrical Installation Condition Reporting: Classification Codes for Domestic and Similar Electrical Installations) is the reference. Every observation gets a code; the inspector signs the report; the report's overall conclusion is Satisfactory only if there are no C1, no C2 and no FI. C3-only reports are typically Satisfactory with recommendations. Customers receiving an Unsatisfactory report on a rented dwelling have 28 days under the PRS Regs 2020 to get the work done."
          >
            <p>
              Coding worked through with examples:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>C1 — Danger present</strong> — exposed live conductors at a damaged
                socket, live chassis on a faulty appliance feeding back, broken main switch
                handle leaving the disconnector unable to isolate. Must be made safe before
                the inspector leaves the property; written into the report and the customer
                signed off. C1 makes the report Unsatisfactory.
              </li>
              <li>
                <strong>C2 — Potentially dangerous</strong> — missing CPC at a metal
                accessory, wrong RCD type on an EV charger, no open-PEN protection on a PME
                EV install, no main bonding to incoming gas / water. Customer is advised
                urgent remedial within an agreed window (typically 28 days). C2 makes the
                report Unsatisfactory.
              </li>
              <li>
                <strong>C3 — Improvement recommended</strong> — no AFDD on a circuit where
                A4:2026 now recommends one, missing Section 712 PV signage on an older
                install, no surge protection device, plastic CU pre-2016 amendment. Sensible
                upgrades, not safety-critical. C3 alone leaves the report Satisfactory with
                recommendations.
              </li>
              <li>
                <strong>FI — Further investigation</strong> — anomalous test reading the
                inspector cannot resolve in the visit time, intermittent fault the customer
                reports but is not present on inspection day, suspected damaged conductor
                hidden behind plaster. FI makes the report Unsatisfactory until the
                investigation closes.
              </li>
              <li>
                <strong>Wrong codes carry consequences</strong> — under-coding a C2 as a
                C3 leaves a serious defect uncorrected and exposes the inspector
                professionally; over-coding a C3 as a C2 forces the customer into
                unnecessary expense and damages the inspector's credibility on the next
                job.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Sample-size on a periodic — what proportion to actually test"
            plainEnglish="An EICR is not a 100 percent retest of every accessory and every circuit. The inspector samples — typically 10 percent for low-risk circuits in good condition, rising to 100 percent for high-risk areas (special locations, recently modified circuits, areas with reported defects). The sample size is recorded on the report and is the basis for the inspector signing off the wider installation."
            onSite="GN3 gives the sample-size guidance and the BS 7671 643.1.1 framework backs it. A typical 4-bed domestic EICR samples 10-20 percent of socket outlets across the property, every CPC is verified end-to-end, every RCD is tested, every special location (bathroom, kitchen, outdoor) is 100 percent. Commercial sample sizes are pegged to circuit risk — laboratory benches and food-prep areas at 100 percent; office socket spurs at 10 percent. Document the sample size and the rationale on the report — inspectors who under-sample then miss a defect are professionally exposed."
          >
            <p>
              Sample-size benchmarks per circuit category:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Bathroom and kitchen (special locations)</strong> — 100 percent
                inspection and test. The risk and the reg-driven extra requirements
                (Section 701, supplementary bonding history, RCD coverage) make sampling
                inappropriate.
              </li>
              <li>
                <strong>Recently modified circuits</strong> — 100 percent. The
                modification window is where defects get introduced; inspect everything
                affected.
              </li>
              <li>
                <strong>Standard final circuits in good condition</strong> — 10 percent
                of accessories per circuit, plus end-to-end CPC verification, plus
                furthest-point Zs, plus RCD test on the protective device. Adequate to
                evidence the circuit is healthy.
              </li>
              <li>
                <strong>Circuits with reported defects</strong> — 100 percent. The
                customer reported it; investigate it fully.
              </li>
              <li>
                <strong>Sample size on the report</strong> — record explicitly with the
                rationale. Future inspectors and the customer's solicitor / mortgage
                lender both look for this transparency.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Mortgage, insurance and conveyancing triggers — the EICR outside the routine cycle"
            plainEnglish="The five-year cycle is not the only trigger for an EICR. House sales increasingly see solicitors request a current EICR as part of the conveyancing pack. Mortgage lenders flag old or absent EICRs on lending decisions, particularly on unmodernised properties. Buildings insurance can refuse cover or load the premium on installations without recent inspection evidence. Each of these triggers an EICR outside the routine schedule — and the customer normally calls a contractor at short notice with paperwork urgency."
            onSite="Treat the conveyancing-driven EICR as a normal job with a tighter document turnaround. Inspect to the same standard, code to the same standard, but turn the report around within 5-10 working days because the customer's exchange date depends on it. Insurance-driven EICRs are similar but typically less urgent. Mortgage-lender-driven EICRs sometimes come with a list of specific items the lender wants reassurance on — read the request, address the listed items explicitly in the report observations, and the lender's underwriter is satisfied."
          >
            <p>
              Common non-cycle triggers and what the customer expects:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Conveyancing</strong> — solicitor's pre-contract enquiries
                include the EICR question. Buyer's solicitor reads the report; an
                Unsatisfactory finding can re-open the price negotiation or stall
                exchange.
              </li>
              <li>
                <strong>Mortgage lender</strong> — older properties, formerly tenanted
                properties, or properties with visible electrical concerns prompt a
                lender retention or condition. Customer needs the EICR to release the
                retention.
              </li>
              <li>
                <strong>Buildings insurance renewal</strong> — many policies now ask
                about EICR currency. An Unsatisfactory or absent EICR can void a fire
                claim if traced back to electrical cause.
              </li>
              <li>
                <strong>Major insurer-required upgrades</strong> — RCD protection on
                circuits, plastic-CU replacement, modern bonding. Customers receive an
                insurer letter and need a contractor to inspect, quote and certify the
                remediation.
              </li>
              <li>
                <strong>Selling tenanted property</strong> — customer needs the current
                PRS-Regs EICR to evidence compliance through the sale to the new
                landlord. The cycle clock resets to the date of the most recent EICR,
                not the sale date.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Wales, Scotland, Northern Ireland — equivalent regimes"
            plainEnglish="The PRS Regs 2020 apply only to England. Wales, Scotland and Northern Ireland have their own equivalent regimes — broadly similar in effect (5-year periodic inspection, written confirmation to tenants, local authority enforcement) but with different statutory wording and authorities. Inspectors working across the UK nations need to know which regime applies."
            onSite="If you take on landlord work outside England, check the relevant national regime. The technical inspection (the EICR itself) is the same — same BS 7671, same GN3 framework, same coding rubric. The statutory framework around it differs."
          >
            <p>The three other nations:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Wales.</strong> The Renting Homes Wales Act 2016 plus the Renting Homes
                (Fitness for Human Habitation) Regulations 2022 together impose electrical safety
                duties on landlords broadly aligned with the English PRS Regs — periodic
                inspection (typically 5 years), written confirmation to tenants, local authority
                enforcement. The Welsh framework is administered through Welsh local authorities
                with their own enforcement powers.
              </li>
              <li>
                <strong>Scotland.</strong> The Housing (Scotland) Act 2006 plus Scottish
                Government guidance on the tolerable standard and repairing standard for private
                rented sector dwellings. Includes electrical safety requirements with periodic
                inspection (typically 5 years) and written confirmation duties. Administered
                through Scottish local authorities with reference to the Tolerable Standard
                guidance.
              </li>
              <li>
                <strong>Northern Ireland.</strong> The Housing (Northern Ireland) Order 2003 plus
                Department for Communities guidance on private rented sector electrical safety.
                Periodic inspection requirements broadly aligned with the English PRS Regs;
                local authority enforcement through the NIHE / district councils.
              </li>
            </ul>
            <p>
              The technical EICR is identical across all four UK nations — BS 7671 is the
              recognised standard UK-wide. The statutory framework, recipient duties, and
              enforcement powers differ. An inspector working in Cardiff applies the Welsh
              framework; in Edinburgh the Scottish framework; in Belfast the Northern Irish
              framework. The customer briefing should reflect the relevant national regime.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Guidance Note 3 — Scottish Government guidance on tolerable and repairing standards"
            clause="The Scottish Government has published guidance on meeting the tolerable standard and repairing standard in Scotland, which includes guidance on electrical installations and appliances in private rented sector dwellings."
            meaning={
              <>
                GN3 acknowledges the devolved nature of UK electrical safety regulation in the
                rented sector. The Scottish framework differs from the English PRS Regs in
                statutory wording but the technical effect on the installation and the EICR is
                broadly similar. Inspectors operating in Scotland should reference the Scottish
                guidance on the tolerable and repairing standards rather than the English PRS
                Regs when briefing landlord clients on their statutory duties.
              </>
            }
            cite="Source: IET Guidance Note 3 — recognition of Scottish Government guidance on tolerable and repairing standards for private rented sector electrical safety."
          />

          <CommonMistake
            title="Treating the PRS Regs 5-year interval as a guideline rather than a statutory maximum"
            whatHappens={
              <>
                A landlord asks you to inspect a property where the previous EICR was issued 6
                years ago. You note the certificate is over 5 years old but assume "5 years is a
                guideline" and the landlord can extend if there are no apparent issues. You issue
                the new EICR Satisfactory and date the next inspection 5 years from now. Two
                months later the local authority audits the landlord's portfolio and finds the
                gap between certificates exceeded 5 years. The landlord is fined under the PRS
                Regs; the audit also flags your contractor company as having issued the
                replacement certificate without challenging the gap. Your scheme provider opens
                an investigation.
              </>
            }
            doInstead={
              <>
                The 5-year interval under PRS Regs 2020 is a statutory maximum, not a guideline.
                A gap exceeding 5 years is a landlord breach regardless of whether a competent
                inspector subsequently certifies. When you find a property with an over-due
                previous EICR, brief the landlord on the breach (it has already happened — the
                gap exists in the historical record). Carry out the new EICR. Document on the
                Extent and Limitations note the date of the previous certificate and the
                resulting gap. Recommend the landlord seek their own legal advice on the
                historical breach. The new EICR is a clean restart of the cycle but does not
                erase the historical breach; that is between the landlord and the local
                authority.
              </>
            }
          />

          <CommonMistake
            title="Assuming the PRS Regs apply to social housing"
            whatHappens={
              <>
                You take on inspection work for a housing association that owns 200 social
                housing units. You apply the PRS Regs framework — 5-year statutory cycle,
                landlord must provide reports to tenants within 28 days, local authority
                enforcement under the PRS Regs. The housing association legal team challenges
                your approach — social housing tenancies are not within the scope of the PRS
                Regs 2020. The housing association has its own statutory framework under the
                Decent Homes Standard and the Regulator of Social Housing's safety standards.
                Your briefing has been wrong; the housing association's internal compliance
                framework is what governs.
              </>
            }
            doInstead={
              <>
                Check the regulatory scope before briefing on statutory duties. PRS Regs 2020
                cover private rented sector dwellings in England — most ASTs, licences to
                occupy, and HMOs. Social housing is governed by separate regimes — the Decent
                Homes Standard, the Regulator of Social Housing's safety standards, the
                Building Safety Act 2022 for higher-risk residential buildings (HRRBs). Many
                of these regimes use the same EICR mechanism but with different recipient
                duties, different intervals, and different enforcement frameworks. Where a
                client straddles multiple regimes (a housing association with some private rented
                stock and some social housing), brief on each regime as it applies to the
                relevant units.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Worked scenario — landlord 5-year periodic and the lifecycle</ContentEyebrow>

          <Scenario
            title="The full lifecycle — Initial Verification through five-year periodic on a rented dwelling"
            situation={
              <>
                You are reviewing the documentation history for a three-bed terrace your
                contractor was first engaged on in 2020. The 2020 work was a full rewire and CU
                replacement — your colleague issued an EIC at that time. The property was then
                let to its first tenants in 2021. The landlord has now phoned to commission the
                statutory 5-year EICR — due in 2026 since the EIC dated 2020 sits as the cycle
                start.
              </>
            }
            whatToDo={
              <>
                Review the lifecycle. The 2020 EIC under BS 7671 Chapter 64 certified the
                installation as built, with a recommended next inspection date of 5 years (per
                the rented-property recommendation on the EIC at the time, anticipating the PRS
                Regs framework). The first tenancy in 2021 was within the 5-year window of the
                EIC so no fresh EICR was statutorily required at that point under PRS Regs (the
                EIC effectively functions as the inspection record for the period). The 2026
                EICR is now due — under BS 7671 Chapter 65 not Chapter 64 — and the landlord
                must have it in place to maintain compliance with PRS Regs. Plan the EICR with
                the landlord — agree scope, sampling rate (the installation is only 6 years old
                and under continuous tenancy with no documented incidents, so a typical 10%
                sampling rate of accessories with full CU/DB inspection is appropriate). Carry
                out the inspection. Apply the BPG4 coding framework. Issue the EICR with
                recommended next inspection date 2031 (assuming Satisfactory). Brief the
                landlord on the PRS Regs recipient duties. Diary the next cycle. The lifecycle
                continues — EIC at construction, EICR every 5 years thereafter under PRS Regs,
                with each document evidencing the duty holder's discharge of the relevant duty
                at that point.
              </>
            }
            whyItMatters={
              <>
                The lifecycle perspective shows how Initial Verification and Periodic Inspection
                fit together over a property's life. The EIC is a one-off entry document; the
                EICR cycle is the ongoing safety record. Together they evidence the chain of
                competent oversight from construction through use. For PRS rented dwellings the
                5-year cycle is statutory; missing one cycle is a landlord breach with civil
                penalty exposure up to £30,000. For owner-occupied dwellings the 10-year cycle
                is recommended rather than statutory but the EAWR Reg 4(2) duty on the
                homeowner means failure to maintain becomes a civil and potentially criminal
                matter on incident. The inspector's role spans both regimes — Initial
                Verification competence under Chapter 64 and Periodic Inspection competence
                under Chapter 65 are distinct skill sets that a Level 3 apprentice builds
                through the structured progression of this Unit 304 syllabus.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The competent person requirement</ContentEyebrow>

          <ConceptBlock
            title="Competent person — what the PRS Regs (and EAWR Reg 16) actually require"
            plainEnglish="Both the PRS Regs 2020 and EAWR Reg 16 require electrical inspection and testing to be carried out by a competent person. Competence is task-specific and proportionate — there is no single qualification that automatically confers competence for every inspection. The combination of qualifications, scheme registration, documented experience, and continuing development together evidences competence."
            onSite="Build your competence path deliberately. 2365-03 gives you the underpinning knowledge. 2391/2394/2395 industry quals give you the periodic-specific competence. Scheme registration (NICEIC/NAPIT/Stroma/Elecsa) gives you the audited evidence of practice. Continuing development (A4:2026 updates, scheme CPD) keeps it current. Each layer matters; none on its own is enough."
          >
            <p>The competence stack for periodic inspection work:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Underpinning qualification.</strong> 2365-03 (this course) or 2330 / 2360
                / older equivalents. Plus 2382 (BS 7671 Wiring Regulations) at the current
                edition. These give the theory base.
              </li>
              <li>
                <strong>Practical competence.</strong> Apprenticeship, AM2 / AM2S assessment, or
                equivalent on-the-job competence-build. Plus inspection and testing experience
                under supervision on real installations.
              </li>
              <li>
                <strong>Periodic-specific qualification.</strong> 2391 (initial verification +
                periodic inspection of LV electrical installations), 2394 (initial verification
                only), 2395 (periodic inspection only). These industry quals are the formal
                evidence of periodic inspection competence beyond the apprentice base.
              </li>
              <li>
                <strong>Scheme registration.</strong> NICEIC, NAPIT, Stroma, Elecsa — each runs
                a Competent Person Scheme that audits members and registers them as competent for
                specific work types. Periodic inspection registration is the relevant
                registration for EICR work; some schemes require demonstrated 2391/2395
                qualification plus practical assessment.
              </li>
              <li>
                <strong>Continuing development.</strong> A4:2026 updates (Reg 643.7.3 single AC
                RCD test, Reg 421.1.7 AFDD recommendation, Table 41.3 updated Zs, Reg 132.13
                documentation, TN-C-S PNB clarification), scheme CPD requirements, ongoing
                practice. Competence is not a one-shot achievement.
              </li>
              <li>
                <strong>Specialist competence where relevant.</strong> Special-location
                competence (EV charging Section 722, agricultural Section 705, swimming pools
                Section 702, hazardous areas DSEAR/ATEX), thermographic surveying competence
                where used, dynamic-load testing competence on industrial installations.
              </li>
            </ol>
            <p>
              The competent-person requirement protects everyone — the duty holder relies on the
              inspector's competence; the inspector's professional standing depends on
              maintaining competence; the regulatory framework presumes competence underpins the
              certificates and reports it requires. An inspector who issues EICRs without the
              competence stack to support them puts themselves, their clients, and ultimately
              the end users at risk.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Initial Verification (BS 7671 Chapter 64) is one-off pre-energising / post-major-alteration. Output: EIC. Duty on installer/designer/inspector under Reg 641.1.",
              "Periodic Inspection (BS 7671 Chapter 65) is recurring through installation life. Output: EICR. Duty on owner/occupier under EAWR Reg 4(2); on landlord under PRS Regs 2020 for rented dwellings.",
              "ESF/GN3 typical intervals — owner-occupied domestic 10 years, rented domestic 5 years (statutory under PRS Regs), commercial 5 years, industrial 3 years, special locations shorter.",
              "PRS Regs 2020 — statutory 5-year maximum (or change of tenancy whichever sooner) for rented dwellings in England; 28-day landlord remediation duty on Unsatisfactory; written confirmation to tenants within 28 days; to local authority within 7 days of request.",
              "Local authority enforcement under PRS Regs — civil penalties up to £30,000 per breach, recovery of remedial works cost from landlord, improvement notices, prohibition orders.",
              "Wales (Renting Homes Wales Act 2016 + Fitness for Human Habitation Regs 2022), Scotland (Housing Scotland Act 2006 + tolerable/repairing standards), Northern Ireland (Housing NI Order 2003) have equivalent regimes — broadly similar effect, different statutory wording.",
              "Frequency is judgement-led — standard intervals are starting points; inspector adjusts for installation-specific condition, use, environment, defect history, management system in place.",
              "Competent person requirement under PRS Regs 2020 + EAWR Reg 16 — combination of qualifications (2365-03, 2382, 2391/2394/2395), scheme registration, documented experience, and continuing development together evidence competence.",
            ]}
          />

          <Quiz title="EICR vs Initial Verification, frequencies, landlord law — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section5-4')}
              className="rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors border border-white/10 p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white/60">
                <ArrowLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.4 Reporting and remedial works
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Section complete <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Back to Module 5
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
