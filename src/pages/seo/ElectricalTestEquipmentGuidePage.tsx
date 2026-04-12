import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  ClipboardCheck,
  ShieldCheck,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/home-office-electrical-guide' },
  { label: 'Electrical Test Equipment Guide', href: '/electrical-test-equipment-guide' },
];

const tocItems = [
  { id: 'mft-buying-guide', label: 'Multifunction Tester (MFT) Buying Guide' },
  { id: 'clamp-meters', label: 'Clamp Meters' },
  { id: 'voltage-indicators', label: 'Voltage Indicators and Proximity Testers' },
  { id: 'loop-tester', label: 'Loop and RCD Testers' },
  { id: 'cat-ratings', label: 'CAT III vs CAT IV Safety Ratings' },
  { id: 'calibration', label: 'Calibration Requirements' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A multifunction tester (MFT) is the essential instrument for UK electrical testing, performing insulation resistance, earth continuity, loop impedance, RCD testing, and prospective short-circuit current measurement in a single unit. The Megger MFT1741, Fluke 1664FC, and Metrel MI3152 are among the most widely used instruments in the UK.',
  'CAT (Category) safety ratings define the overvoltage impulse protection of a meter. CAT IV is the highest rating, suitable for measurements at the supply origin and outdoor conductors. CAT III covers distribution and installation level work. Most UK electricians need CAT III 600V minimum — never use a lower-rated meter at higher CAT levels.',
  'Test instruments used for verification of electrical installations must comply with BS EN 61557 for safety and functional requirements. Instruments must also meet the accuracy requirements of BS 7671 Appendix 14 for the specific test being performed.',
  'Calibration of test equipment is required at regular intervals — typically annually — to verify that instruments continue to meet the stated accuracy specifications. A calibration certificate from a UKAS-accredited laboratory is the recognised standard for compliance evidence.',
  'GS38 (HSE guidance on test leads and probes) requires that test leads used by electricians have shrouded connectors, finger guards, and exposed metal tip lengths no greater than 4mm (2mm for tip probes). Non-compliant test leads are an immediate safety risk and should be replaced.',
];

const faqs = [
  {
    question: 'What is the best multifunction tester for a UK electrician?',
    answer:
      'The most widely used MFTs among UK electricians are the Megger MFT1741, Megger MFT1821, Fluke 1664FC, and Metrel MI3152. The Megger MFT1741 is a popular mid-range instrument with auto-sequencing for faster insulation resistance testing, RCD testing to 10mA, and a clear backlit display. The Fluke 1664FC offers wireless data logging to the Fluke Connect app, which streamlines test result recording. The Metrel MI3152 is favoured for its comprehensive RCD testing range and integration with the Metrel DeltaPatPlus reporting software. For apprentices and those starting out, a used or refurbished Megger or Fluke from a reputable instrument supplier is a cost-effective entry point. Always verify calibration is current before purchasing second-hand equipment.',
  },
  {
    question: 'What does CAT III and CAT IV mean on a multimeter?',
    answer:
      'CAT (Category) ratings define the overvoltage impulse protection built into a measuring instrument. CAT IV is the highest rating and applies to measurements at the supply origin, service entrance, outdoor conductors, and electricity metering equipment. CAT III applies to distribution level — fixed installations, distribution boards, feeders, and industrial equipment. CAT II covers single-phase receptacle connected loads — appliance testing and most domestic socket measurements. CAT I is for protected electronic circuits only. For general electrical installation work in the UK, CAT III 600V is the absolute minimum. Working at the cutout, meter tails, or service head requires CAT IV. Never use a CAT II instrument at CAT III or IV locations — overvoltage events can cause instruments to explode, potentially causing serious injury.',
  },
  {
    question: 'Do I need a separate loop tester or does an MFT do everything?',
    answer:
      'A modern MFT performs earth fault loop impedance (Ze and Zs) measurements, prospective short-circuit current (PSCC) measurement, and RCD trip time and trip current testing — all in one instrument. A standalone loop tester is generally not needed if you own a good-quality MFT. However, some electricians carry a dedicated loop tester (such as the Metrel MI3143 or Megger LT335) as a backup or for faster measurements on large sites. Standalone RCD testers with ramp-test and pulse-test capability are also available and can be faster for high-RCD-count installations. The MFT is the most cost-effective solution for most UK electrical contractors.',
  },
  {
    question: 'How often do I need to calibrate my test instruments?',
    answer:
      'Test instruments should be calibrated at least annually, or more frequently if they are subject to heavy use, physical shock, or environmental extremes. Calibration by a UKAS (United Kingdom Accreditation Service) accredited laboratory provides the recognised standard of traceability. The calibration certificate should state the standards used, the test results before and after adjustment, and the next calibration due date. Keep calibration certificates with the instrument and have them available for inspection if questioned by a client, scheme provider, or HSE inspector. Instruments that are out of calibration or have expired certificates should not be used for formal installation testing.',
  },
  {
    question: 'What are the GS38 requirements for test leads?',
    answer:
      'HSE Guidance Note GS38 (Electrical test equipment for use by electricians) specifies requirements for safe test leads and probes. Key requirements include: shrouded or plugged connectors with no exposed metal on the body; finger guards on probes to prevent accidental contact with live parts; exposed metal probe tip length no greater than 4mm (or 2mm for higher-risk work); insulation rated for the voltage and CAT level of the test; robust construction capable of withstanding mechanical abuse. Non-compliant test leads — particularly those with bare banana plug connectors or unguarded probes — are a significant shock risk at LV and must be replaced. GS38-compliant leads are available from all major instrument suppliers.',
  },
  {
    question: 'What instruments do I need to carry out a full EICR?',
    answer:
      'A complete EICR typically requires: (1) A multifunction tester (MFT) for insulation resistance, continuity, loop impedance, RCD testing, and PSCC; (2) a voltage indicator (not a multimeter — use a two-pole voltage tester such as a Fluke T5 or Martindale VI15000) for proving dead before work and verifying absence of voltage; (3) a proving unit to test the voltage indicator before and after use; (4) a clamp meter for measuring load currents without circuit isolation; (5) a torch and phone camera for inspecting distribution boards and accessible wiring. GS38-compliant test leads and a calibration certificate for the MFT complete the equipment set.',
  },
  {
    question: 'Why should I use a two-pole voltage tester rather than a multimeter to prove dead?',
    answer:
      'HSE Guidance Note GS38 and the IET Code of Practice recommend a two-pole voltage indicator (also called a voltage tester or tick tester) for proving dead before working on electrical systems, rather than a multimeter. A two-pole voltage tester applies a load to the circuit being tested, which detects induced voltages that a high-impedance multimeter would falsely read as live. Two-pole testers are also more robust and have a simpler pass/fail indication less likely to be misread. Always use a proving unit (a low-voltage test source) to verify the tester is functioning before and after every dead test — if the proving unit test fails, the tester must not be used. Popular two-pole testers include the Fluke T5-600, Megger LVD1500, and Martindale VI15000.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/cable-jointing-guide',
    title: 'Cable Jointing Guide',
    description:
      'Insulation testing after jointing, BS 7671 Regulation 526, and jointing techniques.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord obligations for electrical inspections in rented properties.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/electrical-apprenticeship-apply',
    title: 'Electrical Apprenticeship — How to Apply',
    description: 'Level 2 and Level 3 pathways, ECS card, JTL, and application tips.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'mft-buying-guide',
    heading: 'Multifunction Tester (MFT) Buying Guide',
    content: (
      <>
        <p>
          A multifunction tester (MFT) is the cornerstone instrument of every UK electrician's test
          kit. It combines the most frequently used electrical installation tests in a single
          portable instrument, making it indispensable for EICR work, new installation verification,
          and fault finding.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">What an MFT Must Measure</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance (IR):</strong> 250V, 500V, and 1,000V DC test
                voltages. Required for circuits up to 1,000V per BS 7671 Chapter 64.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth continuity:</strong> Low resistance measurement using a 200mA test
                current per BS EN 61557-4 to verify CPC integrity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth fault loop impedance (Zs and Ze):</strong> Live measurement of loop
                impedance to verify disconnection times per BS 7671 Chapter 41.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD testing:</strong> Trip time at rated, half rated, and five times rated
                current; ramp test; plus high-current trip test for Type B RCDs on modern
                instruments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prospective short-circuit current (PSCC):</strong> Measured at the supply
                origin to verify that protective devices have sufficient breaking capacity.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">
            Recommended MFT Instruments (2024)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Megger MFT1741:</strong> Popular mid-range instrument, auto-sequence
                testing, 10mA RCD testing, USB connectivity. Street price approximately \u00a3450 to
                \u00a3550.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fluke 1664FC:</strong> Wireless connectivity to Fluke Connect app,
                auto-sequence, ramp RCD test, compact form factor. Street price approximately
                \u00a3600 to \u00a3750.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Metrel MI3152:</strong> Comprehensive RCD test range including Type B, EV
                charger testing capability, Bluetooth. Street price approximately \u00a3700 to
                \u00a3900.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kewtech KT65:</strong> Budget-friendly option for apprentices and occasional
                use. Good basic functionality at approximately \u00a3280 to \u00a3350.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'clamp-meters',
    heading: 'Clamp Meters for Electricians',
    content: (
      <>
        <p>
          A clamp meter measures AC current by sensing the magnetic field around a conductor,
          without requiring the circuit to be broken. This makes it an invaluable diagnostic tool
          for measuring load currents, identifying unbalanced three-phase loads, and tracing fault
          currents.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AC clamp meters:</strong> The standard type, measuring fundamental 50Hz
                current. Suitable for most domestic and commercial electrical work. Range: typically
                0.1A to 600A or 1,000A depending on model.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>True RMS clamp meters:</strong> Measure the true root-mean-square value of
                non-sinusoidal waveforms, giving accurate readings in circuits with variable-speed
                drives, LED drivers, switch-mode power supplies, and other non-linear loads.
                Recommended for modern commercial installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flexible clamp (Rogowski coil):</strong> A flexible current sensor that can
                be looped around large conductors or multiple conductors in tight spaces where a
                rigid clamp cannot be positioned. Useful for busbars and large LV cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recommended models:</strong> Fluke 376FC (true RMS, wireless), Fluke 325
                (compact, 400A), Megger DCM305E, Kewtech KC20. For occasional use, a Uni-T or Klein
                Tools clamp meter provides basic functionality at lower cost.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'voltage-indicators',
    heading: 'Voltage Indicators and Proximity Testers',
    content: (
      <>
        <p>
          Before working on any electrical circuit, proving the circuit is dead is a legal
          requirement under the Electricity at Work Regulations 1989. The correct instrument for
          this is a two-pole voltage indicator (also called a voltage tester), not a multimeter.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-pole voltage tester:</strong> Applies a load to the circuit under test,
                detecting induced voltages that high-impedance multimeters would misread as live.
                GS38 compliant probes and test leads required. Use a proving unit before and after
                every dead test. Recommended: Fluke T5-600, Megger LVD1500, Martindale VI15000,
                Kewtech KT150.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-contact voltage tester (NCV / proximity tester):</strong> A useful
                supplementary tool for quickly identifying live conductors before using a two-pole
                tester. NCV testers detect the electric field around conductors without contact. Not
                acceptable as the sole method of proving dead — always follow up with a two-pole
                test. Popular models: Fluke LVD2, Klein Tools NCVT-3.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'loop-tester',
    heading: 'Loop and RCD Testers',
    content: (
      <>
        <p>
          Earth fault loop impedance testing and RCD testing are core elements of BS 7671 Chapter 64
          verification requirements. Modern MFTs perform both, but standalone instruments are
          available for sites with high volumes of RCDs or complex RCD types.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No-trip loop testers:</strong> Standard loop impedance tests briefly draw a
                high test current that may trip RCDs. No-trip loop measurement uses a lower current
                method to measure loop impedance without tripping the RCD — useful where circuit
                isolation is impractical. Available on most modern MFTs and standalone loop testers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD ramp test:</strong> Gradually increases the test current from a low
                starting value until the RCD trips, identifying the actual trip threshold. Important
                for verifying 10mA and 30mA RCDs operate within limits and do not trip prematurely
                (nuisance tripping) or late.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type B RCD testing:</strong> EV chargers and some industrial equipment
                require Type B RCDs (sensitive to DC fault current components). Type B RCD testing
                requires specialist MFTs such as the Metrel MI3155 or Megger MFT1835.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cat-ratings',
    heading: 'CAT III vs CAT IV Safety Ratings Explained',
    content: (
      <>
        <p>
          CAT (Measurement Category) ratings are defined in BS EN 61010-1 and define the overvoltage
          impulse withstand capability of a measuring instrument. Using an under-rated instrument at
          higher CAT levels creates a serious risk of arc flash injury when a transient overvoltage
          occurs.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CAT I:</strong> Protected electronic equipment and low-energy circuits.
                Household electronics on battery or isolated supply. Lowest impulse protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CAT II:</strong> Single-phase receptacle connected loads — domestic
                appliance testing, outlet-connected equipment. Typical domestic household socket
                circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CAT III 600V:</strong> Fixed electrical installation — consumer units,
                distribution boards, three-phase distribution, industrial equipment. This is the
                minimum standard for general electrical installation work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CAT IV 600V:</strong> Supply origin, service entrance, electricity metering,
                outdoor conductors subject to direct lightning exposure. Required for working at the
                cutout, meter tails, and DNO equipment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When purchasing test equipment, verify the CAT rating and voltage rating are printed on
          the instrument (not just the test leads). A CAT III 300V instrument is not equivalent to a
          CAT III 600V instrument — the voltage rating matters.
        </p>
      </>
    ),
  },
  {
    id: 'calibration',
    heading: 'Calibration Requirements for Test Instruments',
    content: (
      <>
        <p>
          Calibration verifies that a test instrument produces accurate measurements within its
          stated specifications. For electrical installation testing, calibration is essential
          because incorrect test results can lead to unsafe installations being certified, or safe
          installations being condemned.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calibration interval:</strong> Most MFTs should be calibrated annually. The
                interval may be shorter if the instrument is subject to heavy use, frequent
                transportation, physical shocks, or if used in demanding environmental conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>UKAS accreditation:</strong> Calibration by a UKAS (United Kingdom
                Accreditation Service) accredited laboratory provides traceable calibration linked
                to national measurement standards. UKAS calibration certificates are the accepted
                standard for compliance evidence in the UK.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Daily check:</strong> Before each use, verify the instrument against a known
                reference — either a purpose-made calibration check adaptor or a known circuit.
                Check that the battery is charged and the display is functioning. Record the daily
                check in the instrument log.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Competent person scheme providers (NICEIC, NAPIT, ELECSA) may request evidence of current
          calibration certificates as part of their annual audit process. Keep calibration records
          accessible — the{' '}
          <SEOInternalLink href="/tools/eicr-certificate" label="EICR Certificate app" /> can store
          instrument details alongside test records.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians — Recording Test Results',
    content: (
      <>
        <p>
          Test instruments are only as useful as the records produced from them. Elec-Mate helps you
          record all test results in compliant certificates, reducing paperwork time on site.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/tools/eicr-certificate" label="EICR Certificate" /> — record
                all loop impedance, insulation resistance, continuity and RCD test results in a
                structured BS 7671 Chapter 64 format. AI board scanning speeds up schedule of
                circuits entry.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/eic-certificate" label="EIC Certificate" /> — generate a
                complete Electrical Installation Certificate with test schedules, instrument
                details, and calibration certificate references.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalTestEquipmentGuidePage() {
  return (
    <GuideTemplate
      title="Electrical Test Equipment Guide — MFT, Clamp Meter, CAT Ratings, Calibration"
      description="Complete UK buying guide for electricians: multifunction testers (Megger MFT1741, Fluke 1664FC), clamp meters, voltage indicators, CAT III vs CAT IV safety ratings, GS38 compliance, and calibration requirements."
      datePublished="2024-06-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Test Equipment"
      badgeIcon={Wrench}
      heroTitle={
        <>
          Electrical Test Equipment Guide{' '}
          <span className="text-yellow-400">— UK Buying Guide for Electricians</span>
        </>
      }
      heroSubtitle="MFT buying guide (Megger MFT1741, Fluke 1664FC), clamp meters, voltage indicators, CAT III vs CAT IV safety ratings explained, GS38 test lead requirements, and calibration."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Electrical Test Equipment — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Record test results in compliant certificates instantly"
      ctaSubheading="Elec-Mate links your test readings directly to BS 7671-compliant EICs and EICRs."
    />
  );
}
