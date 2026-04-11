import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ClipboardCheck,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  GraduationCap,
  Zap,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Polarity Testing', href: '/guides/polarity-testing-guide-bs7671' },
];

const tocItems = [
  { id: 'overview', label: 'Why Polarity Testing Matters' },
  { id: 'visual-first', label: 'Visual Inspection First' },
  { id: 'live-polarity', label: 'Live Polarity Check' },
  { id: 'common-failures', label: 'Common Polarity Failures' },
  { id: 'regulation-643-5', label: 'Regulation 643.5 Explained' },
  { id: 'three-phase', label: 'Three-Phase Polarity' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Polarity testing verifies that the line (live) conductor is connected to the line terminal throughout the installation, and that single-pole protective and switching devices are connected in the line conductor only — never in the neutral.',
  'BS 7671 Regulation 643.5 requires polarity to be verified on all circuits. Incorrect polarity is a serious safety hazard — a reversed line and neutral means that an appliance appears dead at its switch but remains live internally.',
  'Visual inspection is carried out first, before energising. Check that conductors are connected to the correct terminals at each accessory, luminaire, and consumer unit.',
  'Live polarity checking uses an approved voltage indicator (GS38 compliant) or a calibrated multimeter to verify that the line conductor is at 230V and the neutral is at or near 0V relative to earth at every accessible test point.',
  'Common polarity failures include line and neutral reversed at socket outlets, centre-contact bayonet lamp holders connected to neutral instead of line, and single-pole switches or fuses in the neutral conductor.',
];

const faqs = [
  {
    question: 'What is reversed polarity and why is it dangerous?',
    answer:
      'Reversed polarity occurs when the line (live) conductor is connected to the terminal that should carry the neutral, and vice versa. The appliance or fitting may appear to work normally — the circuit is complete regardless of which way the conductors are connected — but the consequences are significant. For a switched circuit (such as a light fitting), switching the switch breaks the neutral rather than the line. The fitting appears to be switched off, but all internal metalwork and lamp components remain at live potential. Anyone touching the lamp holder or a metal part of the fitting when replacing a bulb risks electric shock. For a socket outlet with reversed polarity, any two-pin unpolarised plug (such as a phone charger) will have its internal circuitry connected to the line conductor via the terminal that it expects to be neutral — which may cause equipment damage or shock.',
  },
  {
    question: 'What does Regulation 643.5 require?',
    answer:
      'BS 7671:2018+A3:2024 Regulation 643.5 requires that the polarity of the installation is verified by inspection and testing. Specifically: all fuses and single-pole control devices must be connected in the line conductor only; the centre contact of Edison screw lamp holders must be connected to the line conductor; and the correct polarity of socket outlets must be verified. The test must confirm that the line conductor is at line potential and the neutral conductor is at neutral potential at every accessible test point. On an initial inspection, this must be verified throughout the installation before the certificate is issued. On an EICR, polarity is verified at a representative sample of accessories.',
  },
  {
    question: 'How do I carry out a live polarity test?',
    answer:
      'After the installation has been energised (all other initial verification tests completed first), use a GS38-compliant approved voltage indicator or a calibrated multimeter with appropriate rated leads. At each test point (socket outlet, light switch, light fitting terminal): measure the voltage between L and N terminals — should be approximately 230V; measure between L and E — should be approximately 230V; measure between N and E — should be approximately 0V (may be a few volts due to neutral current). A high voltage reading between N and E, or a low reading between L and E, indicates a polarity reversal. At a socket outlet, check that the phase slot (identified on the socket faceplate with the letter L) is at 230V relative to earth.',
  },
  {
    question: 'What are the most common causes of reversed polarity?',
    answer:
      'The most common causes of reversed polarity in UK domestic installations are: incorrect termination at socket outlet faceplates (line connected to N terminal and neutral to L terminal); incorrect wiring at consumer unit where the line and neutral of a circuit are swapped at the MCB and neutral bar; incorrect wiring at a junction box or loop-in ceiling rose where the feed conductors have been transposed; older red/black wiring from before 2004 where a cable has been re-used without verifying the conductor colours (old red = line, old black = neutral — but the colours may have faded or the cable may have been incorrectly identified previously); and DIY wiring where the person carrying out the work did not understand polarity.',
  },
  {
    question: 'Can I detect polarity errors during continuity testing before energising?',
    answer:
      'Yes. For socket outlets, a polarity test can be carried out before energising using a continuity tester. At the consumer unit, link the line and neutral bars of a single circuit together temporarily. At a socket outlet on that circuit, measure between the L and N terminals — the reading should be low (near zero ohms, subject to conductor resistance) confirming the circuit is continuous. If the meter reads open circuit (infinity), the L terminal at the socket is not connected to either the line or neutral of the circuit, suggesting a wiring error. Then, at a different socket on the same ring or radial, measure between L and E, and between N and E, with the test link in place — this can help identify if the line and neutral have been swapped. Confirming with a live test after energising is still essential.',
  },
  {
    question: 'Does polarity matter for single-phase socket outlets?',
    answer:
      'Yes, polarity matters for all single-phase socket outlets in the UK. BS 7671 and BS 1363 (the standard for 13A plug and socket outlets) both require that the line terminal is on the correct pin. Reversed polarity at a socket outlet means that any appliance plugged in has its switch or internal protection connected to the neutral rather than the line. For many modern appliances this causes no immediate problem because they contain transformers or switch-mode power supplies that work on either polarity, but it remains a code violation (C2 on an EICR) because it defeats the safety function of the switch or fuse in the appliance. It also presents a risk with older appliances and lighting that may have exposed metalwork at line potential.',
  },
  {
    question: 'How is polarity tested on three-phase circuits?',
    answer:
      'On three-phase circuits, polarity testing verifies that each phase conductor (L1, L2, L3) is connected to the correct terminal throughout the installation. At each three-phase distribution board or motor starter, measure between each phase and neutral (should be approximately 230V each), and between each phase pair (should be approximately 400V). Verify that phase rotation is correct where motors are connected — incorrect phase rotation causes motors to run in reverse. For three-phase socket outlets (BS EN 60309 industrial sockets), verify that the L1, L2, L3, N, and E contacts are correctly connected. Phase rotation testing requires a dedicated phase rotation instrument.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/continuity-testing-electricians-guide',
    title: 'Continuity Testing Guide',
    description: 'R1+R2 measurement, ring circuit testing, and CPC continuity procedures.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/insulation-resistance-testing-bs7671',
    title: 'Insulation Resistance Testing',
    description: 'Test voltages, minimum values, and BS 7671 Regulation 643.3.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates with polarity test records on site.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete periodic inspection reports with polarity verification on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/earth-fault-loop-impedance-testing',
    title: 'Earth Fault Loop Impedance Testing',
    description: 'Zs testing procedure and Appendix 3 accepted values.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 with modules covering all initial verification tests.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Polarity Testing Matters',
    content: (
      <>
        <p>
          Polarity testing verifies that line and neutral conductors are connected to the correct
          terminals throughout an electrical installation. An installation with incorrect polarity
          may function apparently normally — appliances work, lights illuminate, circuits pass other
          tests — but contains a serious shock hazard that may only become apparent when a user
          interacts with the installation in ways that reveal the error.
        </p>
        <p>
          The most dangerous form of polarity error is a single-pole switch, fuse, or MCB connected
          in the neutral rather than the line conductor. In this configuration, switching the device
          to the off position breaks the neutral — the appliance or fitting appears dead but remains
          connected to the line conductor. Any person touching internal metalwork — for example,
          when replacing a light bulb in a lamp holder — is at risk of electric shock.
        </p>
        <p>
          BS 7671:2018+A3:2024 Regulation 643.5 requires that polarity is verified on all circuits
          as part of the initial verification of a new installation and as part of periodic
          inspection and testing (EICR). The test is carried out in two stages: visual inspection
          before energising, and live electrical testing after energising.
        </p>
      </>
    ),
  },
  {
    id: 'visual-first',
    heading: 'Visual Inspection First — Before Energising',
    content: (
      <>
        <p>
          Before the installation is energised, a visual inspection of all accessible terminations
          is carried out. The objective is to identify any obvious polarity errors before the
          installation is made live. Check the following:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit / distribution board</strong> — verify that line conductors
                are connected to MCBs and neutral conductors to the neutral bar. Confirm no
                conductors are cross-connected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket outlets</strong> — open each socket outlet and verify that the brown
                (line) conductor goes to the L terminal, the blue (neutral) to the N terminal, and
                green/yellow to E.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Light switches</strong> — single-pole switches must be in the line conductor
                only. For loop-in wiring, verify that the switch is connected via the switch wire
                (line side) and not the neutral.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Luminaires and lamp holders</strong> — for bayonet cap and Edison screw lamp
                holders, the centre contact must be connected to the line conductor. The outer
                contact or screwed shell must be connected to neutral.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Junction boxes</strong> — verify that all connections in junction boxes
                maintain correct polarity, particularly where cables have been extended or joined.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Complete polarity verification records on your phone"
          description="Elec-Mate's EICR app captures polarity test results for all circuits and accessories, generating professional inspection records that comply with BS 7671. Used by 1,000+ UK electricians."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'live-polarity',
    heading: 'Live Polarity Check — After Energising',
    content: (
      <>
        <p>
          After all other initial verification tests (continuity, insulation resistance, Zs) are
          complete, the installation is energised and a live polarity check is carried out. Use an
          approved voltage indicator (GS38 compliant) or a calibrated multimeter with appropriately
          rated leads.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">At Socket Outlets</h3>
            <p className="text-white text-sm leading-relaxed">
              Use a socket outlet polarity tester (plug-in type) for speed. These devices illuminate
              LEDs to indicate correct wiring, reversed polarity, missing earth, or open neutral.
              Alternatively, use a multimeter: L to E should be approximately 230V, N to E should be
              approximately 0V, L to N should be approximately 230V.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">At Light Fittings and Switches</h3>
            <p className="text-white text-sm leading-relaxed">
              With the switch in the off position, measure voltage at the lamp holder terminals
              relative to earth. The neutral terminal should be near 0V. The switched line terminal
              should be near 0V (switch open). The permanent line terminal (if accessible) should be
              230V. Confirm that operating the switch changes the switched terminal between 0V and
              230V.
            </p>
          </div>
        </div>
        <p>
          Document the results for each circuit on the schedule of test results. For ring final
          circuits, test polarity at a representative sample of socket outlets — at minimum, the
          first and last outlets on the ring, and any outlets added by a previous installer.
        </p>
      </>
    ),
  },
  {
    id: 'common-failures',
    heading: 'Common Polarity Failures and Their Causes',
    content: (
      <>
        <p>
          Polarity errors occur more frequently than many electricians expect, particularly on
          alterations and additions to older installations. The most common failures are:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reversed at socket outlets</strong> — the most common error. Line connected
                to N terminal and neutral to L terminal. Often caused by incorrect termination
                during fitting or when a socket has been replaced without checking conductor
                colours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Centre-contact lamp holder connected to neutral</strong> — found in older
                installations with pre-2004 cable colours (red = line, black = neutral). The black
                conductor was sometimes incorrectly connected to the centre contact of a BC or ES
                lamp holder.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single-pole switch in the neutral</strong> — found in older domestic
                installations where the switch loop was wired with black as the switched conductor
                but the outer (insulated) sleeve was not applied to re-identify the black as line.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transposition at consumer unit</strong> — line and neutral swapped at the
                MCB and neutral bar for a specific circuit. Causes entire circuit to have reversed
                polarity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>DIY additions with unknown conductor colours</strong> — extensions or
                additions to existing circuits where the new wiring has been connected without
                verifying the polarity of the existing conductors.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'regulation-643-5',
    heading: 'Regulation 643.5 — What It Requires',
    content: (
      <>
        <p>BS 7671:2018+A3:2024 Regulation 643.5 states that verification shall be made that:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                All fuses and single-pole control and protective devices are connected in the line
                conductor only.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The centre contact of Edison screw lamp holders is connected to the line conductor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The wiring of socket outlets and similar accessories is correct throughout.
              </span>
            </li>
          </ul>
        </div>
        <p>
          On an EICR, polarity failures are typically coded as C2 (potentially dangerous) where they
          represent a genuine shock risk — for example, a single-pole switch in the neutral, or a
          reversed lamp holder where the user may come into contact with the live centre contact.
          Reversed polarity at socket outlets is also typically C2.
        </p>
      </>
    ),
  },
  {
    id: 'three-phase',
    heading: 'Three-Phase Polarity',
    content: (
      <>
        <p>
          For three-phase installations, polarity testing extends to verifying that each phase
          conductor is correctly identified and connected throughout the distribution system. Key
          checks include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Phase-to-neutral voltage</strong> — each phase should read approximately
                230V to neutral. Significant deviation indicates a connection error or supply
                problem.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Phase-to-phase voltage</strong> — each phase pair should read approximately
                400V. Readings of 0V between two phases indicate they are connected to the same
                phase.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Motor phase rotation</strong> — for three-phase motors, incorrect phase
                rotation causes the motor to run in reverse. Verify phase rotation with a phase
                rotation meter before energising motor circuits.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Efficient Polarity Testing',
    content: (
      <>
        <p>Polarity testing is straightforward but must be thorough. Here are practical tips:</p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Use a Socket Tester for Speed</h4>
                <p className="text-white text-sm leading-relaxed">
                  A plug-in socket tester (RCD test + polarity indicator) takes seconds per socket
                  and is faster than a multimeter for checking polarity at ring final circuit
                  outlets. Always supplement with a multimeter at a sample of sockets to confirm the
                  tester is working correctly.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Check Old Cable First</h4>
                <p className="text-white text-sm leading-relaxed">
                  On EICR work in installations with pre-2004 red/black cable, be especially
                  vigilant about polarity. The old black was used both as a neutral and as a
                  switched line return — without correct re-identification sleeves, polarity errors
                  are common. Visual inspection of all accessible junction boxes is worth the extra
                  time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PolarityTestingPage() {
  return (
    <GuideTemplate
      title="Polarity Testing Guide BS 7671 | Reversed Polarity and Regulation 643.5"
      description="Complete guide to polarity testing under BS 7671 for UK electricians. Covers visual inspection first, live polarity checks, common failures (reversed at accessories), and Regulation 643.5 requirements."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={ClipboardCheck}
      heroTitle={
        <>
          Polarity Testing:{' '}
          <span className="text-yellow-400">
            Visual Inspection, Live Checks, and Common Failures
          </span>
        </>
      }
      heroSubtitle="A complete guide to polarity testing for UK electricians. Covers visual inspection first, live polarity checks, common polarity failures (reversed at accessories), three-phase polarity, and BS 7671 Regulation 643.5."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Polarity Testing"
      relatedPages={relatedPages}
      ctaHeading="Record Polarity Tests and Complete EICs on Your Phone"
      ctaSubheading="Elec-Mate captures polarity test results for all circuits and generates professional test schedules on site. Join 1,000+ UK electricians. 7-day free trial."
    />
  );
}
