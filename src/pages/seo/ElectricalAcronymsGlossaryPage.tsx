import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  BookOpen,
  Zap,
  ShieldCheck,
  Cable,
  GraduationCap,
  FileCheck2,
  Activity,
  Search,
  Calculator,
  Brain,
  Lightbulb,
  AlertTriangle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Acronyms Glossary', href: '/guides/electrical-acronyms-glossary' },
];

const tocItems = [
  { id: 'why-acronyms', label: 'Why Electricians Use So Many Acronyms' },
  { id: 'protective-devices', label: 'Protective Devices' },
  { id: 'testing-values', label: 'Testing Values and Measurements' },
  { id: 'earthing-systems', label: 'Earthing Systems' },
  { id: 'certificates-standards', label: 'Certificates and Standards' },
  { id: 'wiring-components', label: 'Wiring and Components' },
  { id: 'qualifications-bodies', label: 'Qualifications and Bodies' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'MCB (Miniature Circuit Breaker) protects against overcurrent. RCD (Residual Current Device) protects against earth leakage. RCBO combines both in one device.',
  'AFDD (Arc Fault Detection Device) detects dangerous arcing. SPD (Surge Protection Device) protects against voltage spikes. Both are increasingly required by BS 7671.',
  'PFC (Prospective Fault Current) and Zs (Earth Fault Loop Impedance) are the two most critical test values on any EICR or EIC. They determine whether protective devices will operate fast enough.',
  'TN-S, TN-C-S (PME), and TT are the three main earthing systems in the UK. The earthing arrangement affects every aspect of an installation — from bonding requirements to protective device selection.',
  'Elec-Mate includes a built-in AI assistant that explains any acronym or technical term in plain English — just ask it during a certificate or study session.',
];

const faqs = [
  {
    question: 'What is the difference between MCB, RCD, and RCBO?',
    answer:
      'An MCB (Miniature Circuit Breaker) protects a circuit against overcurrent — it trips when too much current flows, either from an overload (thermal trip) or a short circuit (magnetic trip). An RCD (Residual Current Device) protects against earth leakage — it compares the current flowing out on the line conductor with the current returning on the neutral, and trips if there is a difference (typically 30mA for personal protection). An RCBO (Residual Current Breaker with Overcurrent protection) combines both functions in a single device — it provides both overcurrent protection and earth leakage protection for an individual circuit. The advantage of RCBOs is selectivity: if one circuit develops a fault, only that circuit trips, rather than an RCD protecting a group of circuits causing multiple circuits to lose power.',
  },
  {
    question: 'What does AFDD stand for and when is it required?',
    answer:
      'AFDD stands for Arc Fault Detection Device. It detects dangerous electrical arcing — such as arcing caused by damaged cable insulation, loose connections, or crushed cables — and disconnects the circuit before the arcing can start a fire. AFDDs are covered by Regulation 421.1.7 of BS 7671:2018+A2:2022, which recommends their use in AC single-phase circuits supplying socket outlets rated up to 32A in residential premises and locations with sleeping accommodation. Amendment 2 (2022) strengthened the recommendation. While not yet a mandatory requirement in all cases, AFDDs are increasingly specified by building control and are expected to become mandatory in future amendments. They are already required in some European countries under HD 60364.',
  },
  {
    question: 'What is the difference between Ze and Zs?',
    answer:
      "Ze (External Earth Fault Loop Impedance) is the impedance of the earth fault return path external to the installation — from the transformer, through the supply cables, and back to the installation's main earthing terminal. It is measured at the origin of the installation with the main bonding disconnected. Zs (Earth Fault Loop Impedance) is the total impedance of the complete earth fault loop — Ze plus the impedance of the installation's own line and protective conductors (R1+R2) for a specific circuit. Zs = Ze + (R1+R2). The Zs value determines whether the protective device on that circuit will disconnect fast enough under fault conditions. Maximum permitted Zs values for each type and rating of protective device are listed in the tables of BS 7671 (Appendix 3, Tables 41.2 to 41.6).",
  },
  {
    question: 'What is PME and why does it matter?',
    answer:
      'PME stands for Protective Multiple Earthing. It is the UK term for a TN-C-S earthing system, where the supply neutral conductor also serves as the earth (called a PEN conductor — Protective Earth and Neutral combined) in the supply cable, and is split into separate neutral and earth conductors at the consumer\'s main earthing terminal. PME is the most common earthing arrangement for newer UK domestic properties. It matters because if the PEN conductor breaks (an "open PEN" fault), the metalwork of the installation can rise to mains voltage. This is why PME supplies have strict supplementary bonding requirements (Regulation 544.1) and why certain special locations (bathrooms, swimming pools, caravan parks) have additional restrictions or prohibitions on using the PME earth.',
  },
  {
    question: 'What does CPC stand for?',
    answer:
      'CPC stands for Circuit Protective Conductor. It is the conductor that connects exposed conductive parts (such as the metal casing of an appliance or the earth terminal of a socket) to the main earthing terminal of the installation. In twin-and-earth cable, the CPC is the bare copper conductor that runs between the line and neutral insulated conductors. The CPC provides the fault current return path — if a live conductor touches an exposed metal part, the fault current flows through the CPC back to the source, causing the protective device to trip. The CPC must have adequate cross-sectional area to carry the fault current without overheating. Its size is determined by the adiabatic equation (Regulation 543.1.3) or by reference to Table 54.7 of BS 7671.',
  },
  {
    question: 'What is the difference between EIC, EICR, and Minor Works?',
    answer:
      'An EIC (Electrical Installation Certificate) is issued when a new installation or a significant alteration/addition is completed. It confirms that the new work complies with BS 7671. An EICR (Electrical Installation Condition Report) is issued following a periodic inspection and test of an existing installation — it records the condition of the installation and identifies any defects. Minor Works (properly called an Electrical Installation Certificate for Minor Electrical Installation Works) is a simplified certificate for small jobs that do not involve a new circuit — for example, adding a socket to an existing circuit or replacing a light fitting. Each has a specific purpose and format defined in Appendix 6 of BS 7671.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/how-electricity-works',
    title: 'How Electricity Works',
    description:
      "Voltage, current, resistance, Ohm's Law, AC vs DC — basic electrical theory explained in plain English.",
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/what-is-a-circuit-breaker',
    title: 'What Is a Circuit Breaker?',
    description:
      'How MCBs work, thermal and magnetic trip mechanisms, and Type B, C, and D explained.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/what-is-an-rcd',
    title: 'What Is an RCD?',
    description:
      'How residual current devices detect earth leakage and protect against electric shock.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/what-is-earthing',
    title: 'What Is Earthing?',
    description: 'TN-S, TN-C-S, and TT earthing arrangements explained with practical guidance.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description: 'C1, C2, C3, and FI classification codes explained with real-world examples.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete guide to the IET Wiring Regulations — the standard behind every acronym on this page.',
    icon: FileCheck2,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-acronyms',
    heading: 'Why the Electrical Trade Uses So Many Acronyms',
    content: (
      <>
        <p>
          Walk onto any job site and the conversation is a stream of letters: MCB, RCD, RCBO, CPC,
          PME, PFC, Zs, Ze, R1+R2, EICR, EIC, C1, C2, FI. For apprentices, it can feel like learning
          a new language. For experienced electricians, these acronyms are second nature — but even
          qualified sparks occasionally encounter one they need to look up.
        </p>
        <p>
          This glossary covers every common electrical acronym used in UK installation work,
          testing, and certification. Each entry explains what the acronym stands for, what it means
          in practice, and why it matters. Use it as a reference whenever you encounter an
          unfamiliar term — whether you are studying for your{' '}
          <SEOInternalLink href="/guides/18th-edition-exam-tips">18th Edition exam</SEOInternalLink>
          , filling in an <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR</SEOInternalLink>
          , or explaining something to a customer.
        </p>
      </>
    ),
  },
  {
    id: 'protective-devices',
    heading: 'Protective Devices: MCB, RCD, RCBO, AFDD, SPD',
    content: (
      <>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">MCB — Miniature Circuit Breaker</h4>
                <p className="text-white text-sm leading-relaxed">
                  Protects a circuit against overcurrent (overload and short circuit). Contains a
                  thermal element (bimetallic strip) that trips on sustained overload and a magnetic
                  element (solenoid) that trips instantly on short circuit. Available in{' '}
                  <SEOInternalLink href="/guides/mcb-types-b-c-d">Type B, C, and D</SEOInternalLink>{' '}
                  — the type determines the instantaneous trip threshold. Type B trips at 3-5x rated
                  current (domestic). Type C at 5-10x (commercial/motor circuits). Type D at 10-20x
                  (heavy inductive loads).
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">RCD — Residual Current Device</h4>
                <p className="text-white text-sm leading-relaxed">
                  Detects earth leakage by comparing current on the line and neutral conductors. If
                  the difference exceeds the rated sensitivity (typically 30mA for personal
                  protection), the RCD trips. Protects against electric shock from indirect contact
                  and reduces fire risk from earth faults. Does not protect against overcurrent —
                  that is the MCB's job. See our{' '}
                  <SEOInternalLink href="/guides/what-is-an-rcd">
                    full guide to RCDs
                  </SEOInternalLink>
                  .
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  RCBO — Residual Current Breaker with Overcurrent Protection
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Combines MCB and RCD protection in one device. Provides overcurrent protection and
                  earth leakage protection for an individual circuit. The key advantage is
                  selectivity — a fault on one circuit trips only that RCBO, not an entire bank of
                  circuits. Increasingly used in new consumer units. See{' '}
                  <SEOInternalLink href="/guides/rcbo-vs-rcd-mcb">
                    RCBO vs RCD+MCB comparison
                  </SEOInternalLink>
                  .
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AFDD — Arc Fault Detection Device</h4>
                <p className="text-white text-sm leading-relaxed">
                  Detects dangerous electrical arcing — from damaged insulation, crushed cables, or
                  loose connections — and disconnects the circuit before a fire starts. Analyses the
                  waveform of the current for arc signatures. Recommended by BS 7671 Regulation
                  421.1.7 for socket circuits up to 32A in dwellings with sleeping accommodation.
                  Expected to become mandatory in future amendments.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">SPD — Surge Protection Device</h4>
                <p className="text-white text-sm leading-relaxed">
                  Protects the installation and connected equipment against transient overvoltages
                  (voltage spikes) caused by lightning or switching operations. Required by{' '}
                  <SEOInternalLink href="/guides/spd-surge-protection-guide">
                    BS 7671 Regulation 443
                  </SEOInternalLink>{' '}
                  in most new installations and rewires where the consequence of an overvoltage
                  could be serious (injury, loss of life, disruption to public services). Fitted at
                  the origin of the installation, between line and earth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'testing-values',
    heading: 'Testing Values: PFC, Ze, Zs, R1+R2, IR',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PFC — Prospective Fault Current.</strong> The maximum current that would
                flow under fault conditions at a given point in the installation. Measured at the
                origin and at distribution boards. Must not exceed the breaking capacity of the
                protective devices. Calculated from Ohm's Law: PFC = V / Zs. See{' '}
                <SEOInternalLink href="/guides/prospective-fault-current-guide">
                  PFC explained
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ze — External Earth Fault Loop Impedance.</strong> The impedance of the
                earth fault return path external to the installation — from the transformer, through
                the supply cables, to the main earthing terminal. Measured at the origin with main
                bonding disconnected. Typical values: TN-S 0.35-0.8Ω, TN-C-S (PME) 0.2-0.35Ω, TT can
                be very high.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zs — Earth Fault Loop Impedance.</strong> Total impedance of the complete
                earth fault loop for a specific circuit. Zs = Ze + (R1+R2). Must be low enough for
                the protective device to disconnect within the required time (0.4s for socket
                circuits, 5s for fixed equipment circuits under BS 7671). Maximum Zs values are
                tabulated in{' '}
                <SEOInternalLink href="/guides/maximum-zs-values">
                  BS 7671 Tables 41.2-41.6
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>R1+R2 — Circuit Loop Resistance.</strong> The combined resistance of the
                line conductor (R1) and the protective conductor (R2) for a circuit, measured
                end-to-end. This is the installation's contribution to the earth fault loop
                impedance. Measured during the{' '}
                <SEOInternalLink href="/guides/continuity-testing-r1-r2">
                  R1+R2 continuity test
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IR — Insulation Resistance.</strong> The resistance of the insulation
                between live conductors and earth, measured at 500V DC. Must be at least 1MΩ (one
                megohm) for circuits rated up to 500V. Low insulation resistance indicates damaged
                or deteriorated insulation and is a common cause of RCD tripping. See{' '}
                <SEOInternalLink href="/guides/insulation-resistance-test">
                  insulation resistance testing
                </SEOInternalLink>
                .
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Record test results by voice"
          description="Elec-Mate's voice entry feature lets you speak your test results — 'Ring 1, R1+R2 0.32, Zs 0.89, IR 200 megohms' — and the app fills in the schedule of test results while you keep your hands on the probes."
          icon={Activity}
        />
      </>
    ),
  },
  {
    id: 'earthing-systems',
    heading: 'Earthing Systems: TN-S, TN-C-S (PME), TT',
    content: (
      <>
        <p>
          The earthing system determines how the installation is connected to the general mass of
          earth. It affects bonding requirements, protective device selection, and the maximum Zs
          values that can be achieved. See our{' '}
          <SEOInternalLink href="/guides/what-is-earthing">full guide to earthing</SEOInternalLink>.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Cable className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">TN-S — Separate Neutral and Earth</h4>
                <p className="text-white text-sm leading-relaxed">
                  The supply has separate neutral and earth conductors all the way back to the
                  transformer. The earth conductor is typically the metal sheath or armouring of the
                  supply cable. Common in older properties with lead-sheathed supply cables. Typical
                  Ze: 0.35-0.8Ω. Generally the most reliable earthing arrangement.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Cable className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  TN-C-S — Combined Neutral and Earth (PME)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  The supply neutral also serves as the earth (PEN conductor) in the supply cable.
                  At the consumer's origin, the PEN is split into separate N and E. This is
                  Protective Multiple Earthing (PME) — the most common arrangement for newer UK
                  domestic properties. Typical Ze: 0.2-0.35Ω. The risk is an open PEN fault, which
                  is why PME supplies have strict{' '}
                  <SEOInternalLink href="/guides/supplementary-bonding-guide">
                    bonding requirements
                  </SEOInternalLink>
                  .
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Cable className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">TT — Earth Electrode</h4>
                <p className="text-white text-sm leading-relaxed">
                  The installation has its own earth electrode (typically a driven rod) with no
                  metallic earth return through the supply. Common in rural properties and overhead
                  supply areas. Ze can be very high (often 20Ω or more), so fault loop impedance
                  values are much higher than TN systems. RCD protection is essential on TT systems
                  because the high Zs means MCBs alone cannot disconnect fast enough under earth
                  fault conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'certificates-standards',
    heading: 'Certificates and Standards: EIC, EICR, BS 7671, GN3',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC — Electrical Installation Certificate.</strong> Issued when new
                installation work or a significant alteration is completed. Confirms the work
                complies with BS 7671. See{' '}
                <SEOInternalLink href="/guides/eicr-vs-eic">EIC vs EICR comparison</SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR — Electrical Installation Condition Report.</strong> Issued after a
                periodic inspection and test of an existing installation. Records the condition and
                identifies defects using{' '}
                <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                  observation codes (C1, C2, C3, FI)
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 — IET Wiring Regulations.</strong> The national standard for
                electrical installation in the UK. Current edition is{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>{' '}
                (18th Edition with Amendment 3). Covers design, installation, inspection, and
                testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>GN3 — Guidance Note 3: Inspection and Testing.</strong> Published by the IET
                to supplement BS 7671. Provides practical guidance on the testing sequence, methods,
                and interpretation of results. Essential reading for anyone preparing for C&G 2391.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P — Building Regulations (England and Wales).</strong> Approved
                Document P covers electrical safety in dwellings. Certain types of work are
                notifiable and must be either carried out by a registered competent person or
                inspected by building control. See{' '}
                <SEOInternalLink href="/guides/notifiable-work-guide">
                  notifiable work guide
                </SEOInternalLink>
                .
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'wiring-components',
    heading: 'Wiring and Components: CPC, SWA, MICC, PEN',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CPC — Circuit Protective Conductor.</strong> The earth conductor in a
                circuit. In twin-and-earth cable, it is the bare copper wire. Its job is to provide
                a low-impedance path for fault current so the protective device trips quickly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SWA — Steel Wire Armoured cable.</strong> A heavy-duty cable with steel wire
                armouring for mechanical protection. Used for external runs, underground
                installations, and industrial applications. The armouring can serve as the CPC if
                properly terminated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MICC — Mineral Insulated Copper Clad cable.</strong> Also known as Pyro
                cable. Uses compressed magnesium oxide insulation inside a copper sheath. Extremely
                fire-resistant — used in fire alarm circuits, emergency lighting, and high-risk
                areas where circuit integrity must be maintained during a fire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PEN — Protective Earth and Neutral.</strong> A conductor that serves as both
                the neutral and the earth simultaneously. Found in TN-C-S (PME) supply systems. The
                PEN conductor is split into separate N and E at the consumer's main earthing
                terminal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DB — Distribution Board.</strong> The enclosure containing the protective
                devices (MCBs, RCDs, RCBOs) that control and protect individual circuits. Also
                referred to as a consumer unit (CU) in domestic installations.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="AI board scanner reads your consumer unit"
          description="Point your phone camera at the distribution board and Elec-Mate reads the MCB ratings, circuit details, and board layout from the photo. Half the EICR data is filled in before you pick up the test leads."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'qualifications-bodies',
    heading: 'Qualifications and Bodies: C&G, NICEIC, NAPIT, ECS',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C&G — City and Guilds.</strong> The awarding body for the main electrical
                qualifications in the UK: C&G 2382 (18th Edition), C&G 2391 (Inspection and
                Testing), C&G 2365 (Electrical Installation), and the Level 3 NVQ.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  NICEIC — National Inspection Council for Electrical Installation Contracting.
                </strong>{' '}
                One of the main competent person scheme providers. NICEIC registration allows
                electricians to self-certify notifiable work under Part P without involving building
                control. See{' '}
                <SEOInternalLink href="/guides/niceic-registration-guide">
                  NICEIC registration guide
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  NAPIT — National Association of Professional Inspectors and Testers.
                </strong>{' '}
                Another competent person scheme provider, offering similar registration and
                self-certification rights to NICEIC. See{' '}
                <SEOInternalLink href="/guides/niceic-vs-napit">
                  NICEIC vs NAPIT comparison
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS — Electrotechnical Certification Scheme.</strong> Issues the ECS card
                (commonly called the "sparky card") which proves an electrician's qualifications and
                competence. Required for access to most construction sites. Different{' '}
                <SEOInternalLink href="/guides/ecs-card-types">card types</SEOInternalLink> exist
                for different levels of qualification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IET — Institution of Engineering and Technology.</strong> The professional
                body that publishes BS 7671 (the Wiring Regulations), the Guidance Notes, and the
                On-Site Guide. Membership demonstrates professional commitment to the trade.
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

export default function ElectricalAcronymsGlossaryPage() {
  return (
    <GuideTemplate
      title="Electrical Acronyms & Glossary | A-Z Reference"
      description="Complete A-Z glossary of electrical acronyms and abbreviations used in UK installation work. MCB, RCD, RCBO, AFDD, SPD, PFC, Ze, Zs, CPC, PME, TN-S, TN-C-S, TT — all explained in plain English."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Reference"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          Electrical Acronyms &amp; Glossary:{' '}
          <span className="text-yellow-400">Every Abbreviation Explained</span>
        </>
      }
      heroSubtitle="MCB, RCD, RCBO, AFDD, SPD, PFC, Ze, Zs, CPC, PME, TN-S, TN-C-S, TT — the electrical trade runs on acronyms. This A-Z reference explains every one you will encounter in UK installation, testing, and certification work."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Acronyms"
      relatedPages={relatedPages}
      ctaHeading="Never Get Stuck on an Acronym Again"
      ctaSubheading="Elec-Mate's built-in AI assistant explains any electrical term or acronym instantly. Ask it during a certificate, a study session, or on site. 7-day free trial, cancel anytime."
    />
  );
}
