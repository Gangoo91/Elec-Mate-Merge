import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  Pullquote,
  DiagramPlaceholder,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm6s8-part-6-applies',
    question:
      'Part 6 of BS 7671 (Inspection and Testing) — does it apply to EV charging circuits?',
    options: [
      'No, Section 722 replaces Part 6',
      'Yes — Part 6 (Chapters 64 and 65) sets the inspection and testing framework for all installations. Section 722 adds EV-specific requirements; the Part 6 procedures (visual inspection, IR test at 500 V DC with 1 MΩ minimum, RCD test, ADS verification) all apply to EV circuits',
      'Only for commercial',
      'No verification needed',
    ],
    correctIndex: 1,
    explanation:
      'Part 6 applies to every installation. Chapter 64 covers initial verification (Reg 641-Reg 644); Chapter 65 covers periodic inspection. EV circuit testing layers: Reg 643.3 IR test at 500 V DC, 1 MΩ minimum (Table 64) on the AC final circuit; Reg 643.3.3 post-connection 250 V follow-up at 1 MΩ minimum; RCD trip-time test using Type B-capable instrument (Reg 643.1); ADS verification against Zs ≤ Table 41.3. Section 722-specific tests on top: OPDD function (Reg 722.411.4 d); RDC-DD self-test if integrated; CP/PP signalling verification; tethered cable mechanical check.',
  },
  {
    id: 'm6s8-rdc-dd-test',
    question:
      'How is the RDC-DD (6 mA DC residual detector) tested at commissioning?',
    options: [
      'No test available',
      'Manufacturer-specific built-in self-test. Most wallboxes have a "PEN test" or "DC fault test" mode in the app that injects a simulated 6 mA DC fault and verifies the wallbox’s internal contactor opens within milliseconds. Verify the test result + record in the cert evidence bundle. Standard third-party RCD testers cannot test RDC-DD (they test the upstream Type A RCD only)',
      'Replace it monthly',
      'Wait for a fault',
    ],
    correctIndex: 1,
    explanation:
      'RDC-DD per BS EN IEC 62955 is integrated into the wallbox electronics; standard third-party RCD testers cannot test it (they test the upstream Type A RCD which doesn’t respond to smooth DC). Test via the wallbox’s built-in self-test mode — typically accessed via the manufacturer app or wallbox display. The self-test injects a simulated 6 mA DC fault and verifies the wallbox opens its internal contactor + displays a fault state + recovers. Record the test result in the cert evidence bundle as part of commissioning. Future EICR uses the same self-test mode for periodic verification.',
  },
  {
    id: 'm6s8-eicr-code-missing-ozev',
    question:
      'EICR finds an OZEV / EVCS scheme-funded install where the OZEV documentation is missing from the customer’s handover pack. EICR coding?',
    options: [
      'C1 — danger',
      'C3 — improvement recommended. OZEV / EVCS documentation is a customer-facing administrative record, not a safety issue. EICR records the gap; recommends the customer ask the original installer for the documentation or contact OZEV / DfT for replacement. Doesn’t affect the electrical safety of the install',
      'No code',
      'C1 always',
    ],
    correctIndex: 1,
    explanation:
      'OZEV (Office for Zero Emission Vehicles) / EVCS (EV Chargepoint Grant) documentation is customer-facing administrative evidence — covers grant claim, installer accreditation under the scheme, etc. Missing documentation doesn’t affect electrical safety. EICR coding: C3 (improvement recommended) — note the gap, recommend the customer contact the original installer or OZEV for replacement. Some original-installer companies have closed; OZEV / DfT records typically provide replacement documentation on request. Customer-side issue, not an electrical safety finding. Reg 411 ADS, Reg 722.411.4 earthing-tree etc. are separate; those are electrical and may attract C1 / C2 codings on their own merits.',
  },
  {
    id: 'm6s8-customer-handover-essentials',
    question:
      'A UK 2025-26 EV install customer handover pack should record specific items. Which is essential?',
    options: [
      'Just the date',
      'Identity (wallbox manufacturer, model, serial), Section 722 layered compliance (earthing-tree route, RCD architecture, AFDD decision, BS EN 61851 + 62196-2 + 62955 DoC), SCP Regulations 2021 compliance, commissioning test results, customer-facing operating instructions (default schedule, override, tariff integration), warranty registration, manufacturer support contact, EICR interval recommendation',
      'Customer’s signature only',
      'No handover needed',
    ],
    correctIndex: 1,
    explanation:
      'A comprehensive customer handover pack ties together every Section 722 layer (Sections 6.1-6.7) plus the SCP Regulations 2021 compliance plus the operational guidance for the customer. Cert evidence bundle = installer-side record; customer handover pack = customer-side record. Both reference the same documents but the customer pack adds: how to use the device, expected annual costs / savings, override procedures, manufacturer support, warranty registration, EICR interval recommendation. Without a comprehensive pack, the customer doesn’t know how to use the install + the next EICR has to reconstruct what was done.',
  },
];

const quizQuestions = [
  {
    question:
      'Commissioning a new UK 2025-26 EV wallbox install. Which test sequence is correct?',
    options: [
      'Just energise and check it works',
      'Sequence: (1) Part 6 visual inspection per Chapter 64 schedule; (2) IR test at 500 V DC live-to-PE — 1 MΩ minimum per Table 64; (3) Post-connection 250 V DC test per Reg 643.3.3 — 1 MΩ minimum; (4) RCD trip-time test using Type B-capable instrument (Reg 643.1) — RCBO operates per Reg 411; (5) ADS verification — Zs ≤ Table 41.3 value for the RCBO type and rating; (6) Manufacturer-specific tests: OPDD self-test, RDC-DD self-test, CP/PP signalling check, BS EN 61851 functional test (manufacturer-defined); (7) SCP Regulations 2021 verification: default off-peak schedule active, randomised delay enabled. Each step recorded in cert evidence bundle',
      'Test only with Type AC RCD tester',
      'Skip protective device tests',
    ],
    correctAnswer: 1,
    explanation:
      'EV commissioning is the convergence point of every Section 722 layer + Part 6 + SCP Regulations. Test sequence: Part 6 inspections + IR tests (live and post-connection); RCD trip-time using Type B-capable instrument; ADS verification; manufacturer-specific OPDD + RDC-DD + CP/PP tests; SCP-Regs verification. Each step records in cert evidence bundle. The handover takes typically 30-45 minutes after the physical install is complete; rushed commissioning sets up future EICR problems.',
  },
  {
    question:
      'A 5-year EICR on an EV charging install. The Section 6 handover pack is missing — customer doesn’t have it. How does this affect the inspection?',
    options: [
      'Refuse the EICR',
      'EICR proceeds but is more extensive. The inspector reconstructs: wallbox identity (kit nameplate); earthing-tree decision (visual at service head + DNO confirmation + supply test); RCD architecture (read upstream RCD type from CU); SCP Regulations status (verify default off-peak via wallbox app); commissioning test re-runs where possible. Items that cannot be reconstructed: C3 (improvement recommended — handover pack to be obtained); FI for missing baseline data. Recommend the customer obtain pack from original installer',
      'Mark all C1',
      'Pass anyway',
    ],
    correctAnswer: 1,
    explanation:
      'Missing handover pack doesn’t stop the EICR but stretches it significantly. The inspector reconstructs as much as possible from on-site visual / test evidence + DNO records + manufacturer DoC sources online. Items that cannot be reconstructed (e.g. install-day OPDD test result, original RDC-DD self-test result, the customer-specific tariff configuration) get FI codes. Customer may need to contact the original installer for the pack copy. Cert evidence bundle for the EICR records what was reconstructible + what wasn’t.',
  },
  {
    question:
      'A 5-year EICR finds: (1) the Reg 570.6.8.202-equivalent warning label has been removed by the customer; (2) the Type A RCBO trip-time is now 280 ms (was 25 ms at install); (3) the wallbox’s integrated RDC-DD self-test fails. What’s the combined coding?',
    options: [
      'All C3',
      '(1) C3 — missing label is improvement (replace it); (2) C2 — RCBO trip-time within Reg 643.7 limit at 280 ms (close to limit; degradation evident; recommend RCBO replacement); (3) C2 — failed RDC-DD self-test removes smooth-DC fault protection; the upstream Type A is blind to that fault profile; the customer is no longer protected to the architectural standard. Combined outcome: EICR unsatisfactory due to C2 findings',
      'All C1',
      'Pass',
    ],
    correctAnswer: 1,
    explanation:
      'EICR findings coded individually. (1) Missing warning label = C3 (improvement recommended — replace label). (2) RCBO trip-time of 280 ms is within the Reg 643.7 limit but shows significant degradation from 25 ms baseline; C2 (potential degradation, urgent monitoring + recommend replacement). (3) Failed RDC-DD self-test = C2 (smooth-DC fault protection no longer working; the architectural integrity of Type A + RDC-DD is broken; customer is at risk if a smooth-DC fault occurs). Combined: EICR unsatisfactory (any C1 or C2 makes the report unsatisfactory). Customer pays for the remediation: replace label + replace RCBO + replace or repair wallbox’s RDC-DD component.',
  },
  {
    question:
      'The OZEV / EVCS Grant Scheme — what is it and how does it interact with the install?',
    options: [
      'Tax credit only',
      'OZEV = Office for Zero Emission Vehicles (UK Government). EVCS = EV Chargepoint Grant. Provides funding (typically £350-£500 per chargepoint) toward UK domestic / workplace install. Eligibility: customer is a UK leaseholder, tenant or qualifying property; installer is OZEV-accredited under the scheme. Customer applies; installer claims the grant against the customer’s invoice. Cert evidence bundle records OZEV claim + installer accreditation',
      'Foreign program',
      'Not available',
    ],
    correctAnswer: 1,
    explanation:
      'OZEV / EVCS Grant Scheme provides UK Government funding toward domestic / workplace EV chargepoint installation. Typical grant: £350-£500 per chargepoint (varies by scheme tier and customer eligibility). Customer eligibility: leaseholder / tenant of a qualifying property (multi-occupancy buildings, rental properties — narrower than full owner-occupier eligibility). Installer eligibility: OZEV-accredited under the scheme; installer holds the scheme certification + completes the install per scheme requirements. Customer applies via OZEV portal; installer claims against the customer’s invoice. Cert evidence bundle records the grant claim + installer accreditation. Note: the eligibility rules + grant amounts change frequently — verify current scheme at install time.',
  },
  {
    question:
      'A customer at year 5 EICR has had a thermal incident with their wallbox cable (visible discolouration at the connector end). What’s the inspection response?',
    options: [
      'Pass — not visible enough',
      'C2 — potential danger. Thermal damage at the connector end indicates: (1) sustained over-current (possibly customer using a wrong-rated cable + PP signalling not protecting; or PP-signalling fault); (2) poor connection at the connector head (high resistance + heating); (3) imminent connector failure. Recommend immediate replacement of cable; investigation of root cause (cable mis-rating, intermittent connection, customer plug behaviour); record in EICR',
      'C3 — improvement',
      'No issue',
    ],
    correctAnswer: 1,
    explanation:
      'Visible thermal damage at the Type 2 connector end = C2 (potential danger, urgent remediation). Causes: (1) customer using a wrong-rated cable (e.g. 13 A cable being driven at 32 A — PP signalling should prevent this but if PP resistor damaged, doesn’t); (2) poor connection at the connector head (intermittent contact during plug-in/out cycles develops high resistance + heating); (3) imminent connector failure. Remediation: replace the cable; verify wallbox’s PP signal interpretation is correct; check the wallbox’s contactor and CP signalling for correct sequencing. Customer education: keep cable in good condition, don’t use damaged cables, don’t leave the connector in muddy / debris-prone environments.',
  },
  {
    question:
      'How often should an EV wallbox be EICR-inspected after install?',
    options: [
      'Never',
      'The wider electrical installation’s EICR interval applies (typically 10 years for domestic, 5 years for landlord rental properties under the Electrical Safety Standards in the Private Rented Sector Regulations 2020). The EV wallbox itself = part of the installation. Manufacturer may recommend annual service for the smart functionality (BMS-style log review, firmware updates, RDC-DD self-test) — separate from the statutory EICR. Cert evidence bundle records the recommended intervals',
      'Daily',
      'Every 30 years',
    ],
    correctAnswer: 1,
    explanation:
      'EV wallbox EICR interval = the wider installation’s EICR interval. UK domestic: typically 10 years per BS 7671 advisory (some properties shorter); UK rental properties: 5 years per Electrical Safety Standards in the Private Rented Sector Regulations 2020 (separate UK Government regulation). Some installers offer annual service contracts for the smart functionality — firmware updates, RDC-DD / OPDD self-test verification, BMS log review. These are MANUFACTURER service intervals, not statutory EICR. Cert evidence bundle records the recommended intervals + customer responsibility for each.',
  },
];

const faqs = [
  {
    question: 'What instruments are essential for EV wallbox commissioning?',
    answer:
      'Type B-capable RCD trip-time tester (Megger MFT1731, Fluke 1664 FC, Kewtech KT64DL or equivalent) — older Type AC / A-only instruments cannot correctly test Type B RCDs and would invalidate the commissioning. Insulation tester capable of 500 V DC + 250 V DC tests per Reg 643.3. Earth fault loop impedance (EFLI) tester for Zs measurement. Continuity tester. The wallbox manufacturer app on the installer’s phone / tablet (for OPDD + RDC-DD + CP signalling tests). Camera for handover photographs.',
  },
  {
    question: 'When does the EV wallbox install need DNO involvement?',
    answer:
      'For a single 7 kW single-phase Mode 3 install on a typical 100 A domestic supply: usually no DNO notification needed (below thresholds in EREC G98 / G99). For: three-phase install, 22 kW install, multiple wallboxes on one supply, commercial / fleet sites — DNO notification under EREC G98 or G99 may apply (this is the connection-side notification, separate from the SCP Regulations). The wallbox manufacturer’s install guide typically flags this. Cert evidence bundle records any DNO notification + the DNO’s response.',
  },
  {
    question: 'What goes in the customer-facing handover document?',
    answer:
      'Customer handover document (separate from the cert evidence bundle): (1) wallbox identity and serial; (2) how to plug in / unplug safely; (3) the default off-peak schedule and override mechanism (SCP-Regs); (4) the customer’s tariff configuration (Octopus / OVO / EDF whichever); (5) expected charging speed; (6) manufacturer app credentials + customer-side account; (7) warranty registration confirmation; (8) emergency procedures (thermal smell, cable damage, what to do); (9) inspection interval recommendation; (10) manufacturer support contact + installer support contact; (11) the cert evidence bundle index. Customer keeps the document; installer keeps a copy.',
  },
  {
    question: 'What about a wallbox replacement at end-of-life?',
    answer:
      'Wallbox typical service life 7-15 years in UK 2025-26 (varies by manufacturer + exposure). At end-of-life: (1) isolate at the dedicated RCBO; (2) remove the wallbox + cable (tethered) or wallbox alone (untethered); (3) record removal date + reason in cert evidence bundle; (4) recycle the wallbox (WEEE — electronic equipment recycling); (5) install the replacement wallbox per Sections 6.1-6.7; (6) re-commission per this section. Cert evidence bundle for the new install replaces / supplements the original. Old wallbox’s SCP-Regs configuration cleared (cloud account closed).',
  },
  {
    question: 'Can the customer or another electrician do EICR-level work on the wallbox themselves?',
    answer:
      'Customer can do user-level tasks: keep clean, inspect cable, test the integral test button (if present), report issues. Cannot open the wallbox or do electrical work. Another electrician can do EICR, replacement, modifications — subject to Part 6 competence requirements (Reg 641.6 — competent skilled persons). Best-practice: stay with the original installer for service / warranty work where possible; otherwise an EV-trained electrician with Type B-capable test instruments is the right choice. Cert evidence bundle records all subsequent work.',
  },
];

export default function RenewableEnergyModule6Section8() {
  const navigate = useNavigate();

  useSEO({
    title: 'Commissioning, EICR & customer handover | Renewable Energy 6.8 | Elec-Mate',
    description:
      'EV wallbox commissioning sequence: Part 6 testing (IR, RCD trip-time, ADS), Section 722-specific tests (OPDD, RDC-DD, CP/PP, BS EN 61851 functional), SCP Regulations 2021 verification, OZEV / EVCS grant documentation, customer handover pack, EICR pattern for EV chargers, year-5 inspection findings.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 8 · BS 7671:2018+A4:2026 · Part 6 + Section 722 + SCP Regulations 2021"
            title="Commissioning, EICR & customer handover"
            description="The commissioning sequence that ties together Sections 6.1-6.7 into a defensible install. Part 6 testing + Section 722-specific tests + SCP Regulations 2021 verification + OZEV / EVCS documentation + customer handover + the year-5 EICR pattern."
            tone="yellow"
          />

          <TLDR
            points={[
              'EV commissioning is the convergence of Section 722 (every layer from Sections 6.1-6.6) + Part 6 (Reg 643 testing) + SCP Regulations 2021 (default off-peak + randomised delay + security). Cert evidence bundle records all three.',
              'Test sequence: (1) Part 6 visual; (2) IR test 500 V DC; (3) Post-connection 250 V DC test per Reg 643.3.3; (4) RCD trip-time using Type B-capable instrument; (5) ADS Zs ≤ Table 41.3; (6) OPDD self-test; (7) RDC-DD self-test; (8) CP/PP signalling check; (9) BS EN 61851 functional test (manufacturer-defined); (10) SCP-Regs verification.',
              'Type B-capable RCD tester essential — older Type AC / A-only instruments cannot test Type B RCDs and invalidate the commissioning. Megger MFT1731 / Fluke 1664 FC / Kewtech KT64DL.',
              'OZEV / EVCS Grant Scheme: UK Government funding (£350-£500 per chargepoint) for eligible customers via OZEV-accredited installers. Customer applies; installer claims. Cert evidence bundle records OZEV documentation + installer accreditation.',
              'Customer handover pack: identity, Section 722 compliance, SCP-Regs verification, commissioning results, operating instructions (default off-peak + override + tariff), warranty, manufacturer support, EICR interval.',
              'EICR interval: wider installation’s interval applies — typically 10 years domestic; 5 years landlord rentals per Electrical Safety Standards in the Private Rented Sector Regulations 2020.',
              'EICR pattern at year 5: visual + IR test + RCD test (Type B-capable) + OPDD + RDC-DD self-test + label / notice check + cable / connector visual + thermal damage check. Cert evidence bundle indices into the year-0 install pack.',
              'Common EICR findings: missing warning labels (C3); RCBO trip-time degraded but within limit (C2); failed OPDD / RDC-DD self-test (C2); thermal damage at connector end (C2); customer-modified default schedule (C3 + customer education).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Run the canonical EV wallbox commissioning sequence — Part 6 testing + Section 722-specific tests + SCP Regulations 2021 verification.',
              'Use Type B-capable instruments for RCD trip-time tests per Reg 643.1; older Type AC / A-only instruments are not acceptable.',
              'Execute manufacturer-specific tests: OPDD self-test, RDC-DD self-test, CP/PP signalling verification, BS EN 61851 functional test.',
              'Verify SCP Regulations 2021 compliance at commissioning: default off-peak schedule active, randomised delay enabled, security DoC reviewed.',
              'Apply OZEV / EVCS Grant Scheme requirements: installer accreditation, customer eligibility check, grant claim documentation.',
              'Assemble the customer handover pack: identity, Section 722 compliance evidence, SCP-Regs verification, operating instructions, warranty, support.',
              'Apply the EICR procedure at year 5 / year 10: visual + functional + protective device verification + manufacturer self-tests.',
              'Code EICR findings: missing safety notice C3; degraded RCBO trip-time within-limit C2; failed OPDD / RDC-DD self-test C2; visible thermal damage C2.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Commissioning is where Section 722 stops being a regulation and starts being a working install. Get the test sequence right and the EICR five years later is straightforward.
          </Pullquote>

          <ContentEyebrow>The commissioning sequence — Part 6 + Section 722 + SCP Regulations 2021</ContentEyebrow>

          <ConceptBlock
            title="The canonical commissioning sequence"
            plainEnglish="UK 2025-26 EV wallbox commissioning is a 10-step sequence covering Part 6 (general installation testing), Section 722-specific tests (PME-on-EV, RCD architecture, signalling), and the SCP Regulations 2021 (default off-peak, randomised delay, security)."
            onSite="Total commissioning time: typically 30-45 minutes after the physical install is complete. Each step records in the cert evidence bundle. Rushed commissioning sets up future EICR problems; methodical commissioning saves time at every future visit."
          >
            <p>The 10-step sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">1. Part 6 visual
                  inspection</strong> — Chapter 64 schedule; check
                wiring, terminations, labelling, IP / IK ratings;
                cable type and route; isolation point location +
                accessibility
              </li>
              <li>
                <strong className="text-white">2. IR test at 500 V
                  DC</strong> — Reg 643.3 + Table 64; minimum 1 MΩ
                live-to-PE on the AC final circuit
              </li>
              <li>
                <strong className="text-white">3. Post-connection 250 V
                  DC test</strong> — Reg 643.3.3; minimum 1 MΩ after
                connecting equipment back into the circuit
              </li>
              <li>
                <strong className="text-white">4. RCD trip-time
                  test</strong> — Reg 643.7 using Type B-capable
                instrument; verify trip-time within Reg 411 limits
              </li>
              <li>
                <strong className="text-white">5. ADS
                  verification</strong> — Zs measured at wallbox ≤
                Table 41.3 value for the RCBO type and rating; site
                limit per GN3 0.80 factor
              </li>
              <li>
                <strong className="text-white">6. OPDD
                  self-test</strong> — Reg 722.411.4(d) compliance;
                wallbox’s built-in "PEN test" mode simulates lost
                PEN; verify contactor opens within milliseconds
              </li>
              <li>
                <strong className="text-white">7. RDC-DD
                  self-test</strong> — Reg 722.531 + BS EN IEC 62955
                compliance; wallbox’s built-in test injects 6 mA
                DC; verify contactor opens
              </li>
              <li>
                <strong className="text-white">8. CP/PP signalling
                  check</strong> — plug a test cable / vehicle; verify
                CP transitions through ±12 V → ±9 V → ±6 V; verify PP
                rating reading matches cable label
              </li>
              <li>
                <strong className="text-white">9. BS EN 61851
                  functional test</strong> — manufacturer-defined; typically
                a charge initiation + brief draw + clean disconnect
                sequence to verify the full charging protocol
              </li>
              <li>
                <strong className="text-white">10. SCP Regulations 2021
                  verification</strong> — default off-peak schedule
                active and configured; randomised delay enabled;
                security DoC reviewed
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643 (Part 6 Chapter 64) — Initial verification"
            clause="Where appropriate during erection, and on completion of an installation or an addition or alteration to an installation, the installation shall be verified by inspection, testing and certification before being put into service. Reg 643.3 — IR test 500 V DC, Table 64 acceptance criteria. Reg 643.3.3 — post-connection 250 V DC test, 1 MΩ minimum. Reg 643.1 — measuring instruments per BS EN 61557."
            meaning="Part 6 / Chapter 64 sets the verification framework. Reg 643 supplies the test procedures. Reg 643.1 mandates instrument compliance with BS EN 61557; for an EV install with Type B RCD architecture, a Type B-capable instrument is required (older Type AC / A-only instruments do not comply with Reg 643.1 for the Type B test). Reg 643.3 covers IR tests; Reg 643.3.3 is the post-connection follow-up. Cert evidence bundle records every measurement with the instrument used + date + tester ID."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>OZEV / EVCS Grant Scheme</ContentEyebrow>

          <ConceptBlock
            title="OZEV — Office for Zero Emission Vehicles + EVCS Grant"
            plainEnglish="OZEV (Office for Zero Emission Vehicles, UK Government) runs the EV Chargepoint Grant (EVCS) scheme — funding (~£350-£500 per chargepoint) for eligible UK domestic / workplace installs. Eligibility narrowed in 2022 from full owner-occupier to leaseholders, tenants, and qualifying property types."
            onSite="At quote stage, check customer eligibility via the OZEV portal; check installer’s OZEV accreditation status (the install company must be accredited under the scheme). Customer applies for the grant; installer claims against the customer’s invoice. Cert evidence bundle records the OZEV claim + installer accreditation + customer eligibility confirmation."
          >
            <p>OZEV / EVCS Grant Scheme considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Customer eligibility (UK
                  2025-26)</strong> — leaseholder of a flat; tenant
                (with landlord permission); landlord (separate grant);
                ineligible: most owner-occupiers (eligibility narrowed
                in 2022 to focus on multi-occupancy + rental)
              </li>
              <li>
                <strong className="text-white">Grant amount</strong> —
                £350-£500 per chargepoint typically (varies by tier).
                Verify current scheme rules at install time
              </li>
              <li>
                <strong className="text-white">Installer
                  accreditation</strong> — installation company must
                hold OZEV accreditation; individual installers under
                the company’s accreditation umbrella
              </li>
              <li>
                <strong className="text-white">Installer
                  obligations</strong> — install meets BS 7671 / Section
                722 + SCP Regulations 2021 + manufacturer DoC; chargepoint
                model approved on the OZEV product list
              </li>
              <li>
                <strong className="text-white">Claim
                  process</strong> — customer applies via OZEV portal;
                installer claims via OZEV system against the customer
                invoice; grant deducted from customer’s install cost
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — OZEV claim reference + customer
                eligibility evidence + installer accreditation
                certificate + chargepoint model approval evidence
              </li>
              <li>
                <strong className="text-white">Customer-side
                  documentation</strong> — OZEV grant receipt + amount
                deducted from invoice + scheme reference. Customer
                keeps for tax / accounting / future-resale evidence
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The customer handover pack"
            plainEnglish="The customer handover pack is the customer-facing record of the install. Separate from the cert evidence bundle (installer-side) but referencing the same documents. Customer receives: the install’s identity, the regulatory compliance evidence, the operating instructions, and the contact / support / warranty information."
            onSite="Spend 15-20 minutes at handover walking the customer through the pack. Show them the default off-peak schedule on the wallbox app; demonstrate the override mechanism; demonstrate the manufacturer app; explain the tariff integration if applicable; show them where the emergency isolator is. The customer who understands the install is the customer who doesn’t call for support unnecessarily."
          >
            <p>Customer handover pack contents:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Install identity</strong>
                — wallbox manufacturer, model, serial number, install
                date, installer company + accreditation
              </li>
              <li>
                <strong className="text-white">Section 722
                  compliance</strong> — earthing-tree route (b/c/d/e
                per Reg 722.411.4); RCD architecture (Type B or Type A
                + RDC-DD); AFDD decision (exception under Reg
                722.421.1.7.201); BS EN 61851 + 62196-2 + 62955 DoCs
              </li>
              <li>
                <strong className="text-white">SCP Regulations 2021
                  compliance</strong> — default off-peak schedule active;
                randomised delay enabled; security + data privacy DoCs
              </li>
              <li>
                <strong className="text-white">Commissioning test
                  results</strong> — IR test values; RCD trip-time; ADS
                Zs; OPDD self-test result; RDC-DD self-test result;
                BS EN 61851 functional test result
              </li>
              <li>
                <strong className="text-white">Operating
                  instructions</strong> — how to plug in / unplug;
                default off-peak schedule + override; tariff
                integration if applicable; manufacturer app credentials;
                emergency procedures
              </li>
              <li>
                <strong className="text-white">Warranty +
                  support</strong> — manufacturer warranty period and
                terms; warranty registration confirmation; manufacturer
                support contact; installer support contact
              </li>
              <li>
                <strong className="text-white">EICR
                  interval</strong> — recommended interval per BS 7671
                + statutory requirements (PRS Regs for landlords);
                manufacturer service interval if separate
              </li>
              <li>
                <strong className="text-white">OZEV / EVCS
                  documentation</strong> — grant claim + amount deducted
                (if applicable)
              </li>
              <li>
                <strong className="text-white">Photographs</strong> —
                install location, mounting, cable entry, CU way,
                warning labels. Index into the cert evidence bundle
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>EICR pattern for EV chargers</ContentEyebrow>

          <Pullquote>
            Year-5 EICR is the install’s first big test. The cert evidence bundle from install day is the reconstruction key.
          </Pullquote>

          <ConceptBlock
            title="The year-5 EICR procedure for an EV install"
            plainEnglish="An EV wallbox’s EICR follows the standard BS 7671 procedure (Part 6 Chapter 65 + Reg 643 testing) with Section 722-specific items layered on top. The cert evidence bundle from install day is the entry point — without it, the inspector reconstructs from on-site evidence."
            onSite="Total EICR time on the EV portion: 30-45 minutes after the rest of the installation’s EICR is complete. Look for the typical degradation patterns (label removal, RCBO trip-time creep, thermal damage at connector end) + verify the manufacturer-specific protective measures still function via their self-test modes."
          >
            <p>The EICR procedure:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Visual
                  inspection</strong> — wallbox condition, cable
                condition, isolator condition, label / notice
                integrity, mounting integrity, ventilation
                clearances
              </li>
              <li>
                <strong className="text-white">Functional
                  test</strong> — energise wallbox via CU; verify
                normal operation; observe CP signalling and
                indication lights; brief charge to verify contactor
                operation
              </li>
              <li>
                <strong className="text-white">Part 6 IR
                  test</strong> — Reg 643.3; live-to-PE on AC final
                circuit; verify Table 64 acceptance criteria still
                met
              </li>
              <li>
                <strong className="text-white">RCD trip-time
                  test</strong> — Reg 643.7 with Type B-capable
                instrument; compare to install-day baseline; flag
                significant drift
              </li>
              <li>
                <strong className="text-white">ADS Zs check</strong>
                — measure Zs; compare to install-day baseline; verify
                still within Table 41.3 limits
              </li>
              <li>
                <strong className="text-white">OPDD self-test
                  re-run</strong> — wallbox built-in test mode; verify
                contactor opens correctly
              </li>
              <li>
                <strong className="text-white">RDC-DD self-test
                  re-run</strong> — wallbox built-in test mode; verify
                6 mA DC fault detection still working
              </li>
              <li>
                <strong className="text-white">Cable / connector
                  inspection</strong> — visible damage; thermal
                discolouration at connector ends; PP resistor still
                reading correctly (multimeter test if uncertain)
              </li>
              <li>
                <strong className="text-white">Warning label
                  presence</strong> — Reg 722.6.8 / OPDD reset label /
                wallbox identification labels still legible
              </li>
              <li>
                <strong className="text-white">SCP-Regs verification
                  (where applicable)</strong> — default off-peak
                schedule still active; randomised delay still
                configured
              </li>
              <li>
                <strong className="text-white">Document
                  findings</strong> — cert evidence bundle entry for the
                EICR; coding (C1/C2/C3/FI) for each finding;
                comparison to install-day baseline
              </li>
            </ul>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="EV wallbox commissioning + EICR procedure flowchart. Top: install-day commissioning 10-step sequence (Part 6 visual + IR + post-connection IR + RCD + ADS + OPDD + RDC-DD + CP/PP + BS EN 61851 + SCP-Regs). Middle: cert evidence bundle assembled. Bottom: year-5 EICR procedure (visual + functional + Part 6 tests + manufacturer self-tests + cable inspection + label check + SCP-Regs verification). Annotations: instrument requirements (Type B-capable RCD tester); baseline comparison; typical findings (label removal C3; RCBO trip drift C2; OPDD failure C2; thermal damage C2)."
            filename="renewable/m6s8-commissioning-eicr-flow.png"
          />

          <Scenario
            title="Year-5 EICR on a standard UK 2025-26 install"
            situation="EV wallbox installed in 2021 (pre-SCP-Regs); year-5 EICR due in 2026. Original cert evidence bundle missing (customer moved house twice; never received original from previous owner). Wallbox is a MyEnergi Zappi; supply is TN-C-S (PME); Type A RCBO upstream with integrated RDC-DD in the Zappi."
            whatToDo="Reconstruction-style EICR. Visual: wallbox identity from front panel (Zappi 7 kW); supply visual at service head confirms PME; CU way visual confirms Type A RCBO 32 A. Tests: IR test at 500 V — 1.4 MΩ live-to-PE on the EV final circuit (passes Table 64). RCD trip-time test with Type B-capable Megger MFT1731 (the RCBO is Type A but the wallbox’s RDC-DD adds the smooth-DC layer; install was per Reg 722.531 Type A + RDC-DD architecture): 24 ms — pass. Zs at wallbox: 0.85 Ω — well within Table 41.3 Type A 32 A B-curve limit. Zappi OPDD self-test (via Zappi app): passes. RDC-DD self-test (via Zappi app): passes. Cable visual: no thermal damage at connector end; PP resistor reads 220 Ω = 32 A as expected. Warning labels present and legible. Pre-SCP-Regs install: not retroactively non-compliant; note in EICR. Outcome: satisfactory; one C3 (improvement) for the missing original handover pack (recommend customer contact installer for replacement). Cert evidence bundle for the EICR records all reconstructed data + the photo set."
            whyItMatters="Real UK 2025-26 EICR scenario: pre-SCP-Regs install, multiple property transfers, missing original pack. The reconstructed EICR is the new baseline for the install. The Type A + RDC-DD architecture continues to provide the required fault profile coverage despite the standalone RCBO being only Type A — manufacturer DoC + integrated RDC-DD covers smooth-DC. Cert evidence bundle for the EICR is itself a useful pack for the customer’s next 5 years."
          />

          <Scenario
            title="EICR finds thermal damage at connector end + failed RDC-DD self-test"
            situation="Customer’s wallbox install from 2022. Year-5 EICR in 2026 finds: (1) visible thermal discolouration at the Type 2 connector end on the tethered cable; (2) Zappi RDC-DD self-test fails (the test injects 6 mA DC and waits for contactor open — contactor doesn’t open; fault state not triggered). Other tests pass."
            whatToDo="Coding: (1) thermal damage at connector = C2 (potential danger, urgent replacement of cable). (2) failed RDC-DD self-test = C2 (smooth-DC fault protection no longer functional; the Type A + RDC-DD architecture is broken; customer exposed to the smooth-DC fault scenario the architecture was designed to cover). EICR unsatisfactory. Remediation: replace the cable (manufacturer-specific replacement; some have replaceable connector heads); investigate root cause of RDC-DD failure (electronics fault inside Zappi — likely needs manufacturer engineer or replacement Zappi unit); re-commission after repair. Customer education: thermal damage at connector often indicates wrong-rated cable use or intermittent plug-in behaviour; manufacturer support contact provided. Cert evidence bundle: EICR finding + remediation plan + customer-signed acknowledgment."
            whyItMatters="Real UK 2025-26 EICR finding — the Type A + RDC-DD architecture’s smooth-DC coverage depends on the RDC-DD continuing to function. Electronics-side failures (rare but real) leave the install with Type A only coverage = Code C2. The thermal damage at connector is a more common finding; cable replacement is the standard remediation. Cert evidence bundle records the findings + the remediation; the next EICR five years later compares against the new baseline."
          />

          <CommonMistake
            title="Skipping the OPDD / RDC-DD self-tests at commissioning"
            whatHappens="Installer commissions a new wallbox install but skips the manufacturer-specific OPDD + RDC-DD self-tests — “the manufacturer’s factory test means they’re working”. Year-5 EICR finds the OPDD has been failing for an unknown duration (started failing perhaps 2 years ago after a firmware update). Customer has been exposed to the lost-PEN hazard without OPDD coverage during that period. C1 / C2 EICR finding + cert evidence bundle integrity questioned (no baseline to compare against)."
            doInstead="Run the OPDD + RDC-DD self-tests at commissioning AND record the results in the cert evidence bundle. The 5-10 minutes of testing time is essential for: (1) confirming the manufacturer-claimed function actually works on this specific unit; (2) establishing the baseline for future EICR comparison; (3) catching factory defects before customer takes ownership. Same principle as baseline capacity testing for BESS (Section 5.8). Cert evidence bundle records the test result with date + instrument used."
          />

          <CommonMistake
            title="Using a non-Type-B-capable instrument for the RCD trip-time test"
            whatHappens="Installer commissions a new wallbox with Type B RCBO upstream; uses an older Megger MFT1502 (Type AC / A only) for the trip-time test. The instrument reports a "pass" because it tests with AC waveform — but the Type B RCD’s smooth-DC fault detection cannot be tested with that instrument. Cert evidence bundle records a test result that doesn’t actually verify the Type B function. Reg 643.1 BS EN 61557 compliance violated."
            doInstead="Use a Type B-capable instrument for any EV install with Type B RCD architecture. Reg 643.1 requires BS EN 61557 compliance; the EV-specific test profile demands the instrument can generate the smooth-DC fault waveform. Megger MFT1731, Fluke 1664 FC, Kewtech KT64DL, Robin RDC-DD-100 etc. are Type B-capable. Older MFT1502 / MFT1721 / similar are NOT. Installer responsibility: own / rent Type B-capable kit for any EV commissioning work. Cert evidence bundle records the instrument used."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'EV commissioning = the convergence of Section 722 (every layer from Sections 6.1-6.6) + Part 6 (Reg 643 testing) + SCP Regulations 2021 (default off-peak + randomised delay + security).',
              'Test sequence (10 steps): Part 6 visual + IR test 500 V DC + post-connection 250 V DC + RCD trip-time (Type B-capable) + ADS Zs + OPDD self-test + RDC-DD self-test + CP/PP signalling + BS EN 61851 functional + SCP-Regs verification.',
              'Type B-capable RCD tester required per Reg 643.1. Older Type AC / A-only instruments cannot test Type B RCDs correctly and invalidate the commissioning.',
              'OZEV / EVCS Grant Scheme: UK Government funding (£350-£500 per chargepoint) via OZEV-accredited installers for eligible customers (leaseholders, tenants, qualifying property types). Customer applies; installer claims.',
              'Customer handover pack: identity + Section 722 compliance + SCP-Regs verification + commissioning results + operating instructions + tariff + warranty + manufacturer support + EICR interval. 15-20 minutes of customer briefing at handover.',
              'EICR interval = the wider installation’s interval. UK domestic typically 10 years; UK rental properties 5 years per Electrical Safety Standards in the Private Rented Sector Regulations 2020.',
              'Year-5 EICR procedure: visual + functional test + Part 6 IR + RCD trip-time + ADS Zs + OPDD self-test re-run + RDC-DD self-test re-run + cable / connector inspection + warning label check + SCP-Regs verification.',
              'Common EICR findings: missing warning labels (C3); RCBO trip-time degraded but within limit (C2 — monitoring + replacement recommended); failed OPDD / RDC-DD self-test (C2 — fault protection no longer functional); thermal damage at connector end (C2 — cable replacement urgent); customer-modified default schedule (C3 — re-configure to SCP-Regs default).',
              'Pre-2022 chargepoints not retroactively covered by SCP-Regs. EICR notes the status; recommends upgrade for tariff access.',
              'Missing handover pack at EICR: reconstruction work; FI for unreconstructable items; recommend customer obtain pack from original installer.',
              'Cert evidence bundle is the long-term truth of the install — same level of care at year-5 EICR as at install day.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 8 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-6-section-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 7
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Smart Charge Points Regulations + tariffs
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Module overview <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 6 complete
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
