import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Cable,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Activity,
  BookOpen,
  GraduationCap,
  FileCheck2,
  Search,
  Eye,
  Brain,
  Home,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'What Is Earthing', href: '/guides/what-is-earthing' },
];

const tocItems = [
  { id: 'what-is-earthing', label: 'What Is Earthing?' },
  { id: 'why-earthing-matters', label: 'Why Earthing Matters' },
  { id: 'how-earthing-works', label: 'How Earthing Provides Safety' },
  { id: 'earthing-arrangements', label: 'Earthing Arrangements: TN-S, TN-C-S, TT' },
  { id: 'bonding', label: 'Bonding: Main and Supplementary' },
  { id: 'visual-check', label: 'Visual Checks for Earthing' },
  { id: 'earthing-on-eicr', label: 'Earthing on the EICR' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Earthing connects the metalwork of an installation to the general mass of earth, providing a safe path for fault current. Without earthing, a fault could make a metal appliance casing live at mains voltage.',
  'The three main earthing arrangements in the UK are TN-S (separate earth conductor in the supply cable), TN-C-S or PME (combined neutral and earth in the supply cable, split at the origin), and TT (local earth electrode with no metallic connection to the supply earth).',
  'Main protective bonding connects the main earthing terminal to incoming services — gas, water, oil — so that a fault on any of them cannot create a dangerous voltage difference between metalwork.',
  'The earthing arrangement determines the maximum Zs values achievable, the bonding requirements, and the type of RCD protection needed. TT systems always require RCD protection because the earth fault loop impedance is too high for MCBs alone.',
  'During an EICR, the electrician checks the earthing arrangement, measures Ze (external earth fault loop impedance), inspects bonding conductors, and verifies that the earthing system is intact and effective.',
];

const faqs = [
  {
    question: 'What is the purpose of earthing in an electrical installation?',
    answer:
      'The primary purpose of earthing is to protect people from electric shock. Under normal conditions, the exposed metalwork of an installation (socket faceplates, appliance casings, radiators connected to metal pipework) should be at zero volts — the same potential as the ground you stand on. If a fault occurs — for example, a live wire touches a metal appliance casing — the earthing system provides a low-resistance path for the fault current to flow back to the source (the transformer). This high fault current causes the protective device (MCB, fuse, or RCD) to disconnect the supply quickly, removing the danger. Without earthing, the metal casing would sit at mains voltage (230V) and anyone touching it would receive a potentially fatal electric shock, because the current would flow through their body to earth instead.',
  },
  {
    question: 'What is the difference between earthing and bonding?',
    answer:
      "Earthing connects the installation's metalwork to the general mass of earth via the main earthing terminal and the earthing conductor. Its purpose is to provide a fault current path so protective devices operate. Bonding connects different metallic parts together so they are all at the same potential (voltage). Main protective bonding connects the main earthing terminal to incoming metallic services — gas pipes, water pipes, oil pipes, structural steelwork — at the point where they enter the building. This ensures that if a fault raises the voltage on one service, all services rise to the same voltage, so there is no dangerous voltage difference between them that someone could bridge by touching two things simultaneously. Supplementary bonding provides additional connections between exposed and extraneous conductive parts in specific locations (such as bathrooms) where the risk is higher.",
  },
  {
    question: 'How do I know what earthing arrangement my property has?',
    answer:
      'You can identify the earthing arrangement by looking at how the earth connection is made at the consumer unit or main intake position. For TN-S, look for a separate earth conductor — typically a green/yellow wire connected to the metal sheath or armouring of the supply cable, or to a separate earth terminal provided by the DNO. For TN-C-S (PME), the earth connection is typically made via a terminal on the supply cutout or meter tails — the earth comes from the supply neutral. There is no separate earth conductor in the supply cable. For TT, look for an earth electrode — usually a copper-coated steel rod driven into the ground outside the property, with an earth wire running from it to the main earthing terminal. TT systems also typically have an earth electrode resistance label. If you are unsure, a qualified electrician can identify the arrangement during an EICR by measuring the Ze and inspecting the incoming supply.',
  },
  {
    question: 'What is an open PEN fault and why is it dangerous?',
    answer:
      "An open PEN fault occurs on a TN-C-S (PME) system when the combined protective earth and neutral conductor breaks or becomes disconnected somewhere in the supply network between the transformer and the consumer's installation. Under normal conditions, the PEN conductor carries the return neutral current for all properties connected to that section of the supply. If it breaks, the neutral current has no path back through the cable — instead, it returns through the earth connections of all connected properties. This can raise the voltage on the earthed metalwork of every property on that section to a dangerous level — potentially close to mains voltage. The risk is that someone touches a bonded metal pipe or appliance casing and receives a shock. This is why PME supplies have strict bonding requirements and why certain locations (bathrooms in particular) have additional restrictions when supplied by PME. TN-S and TT systems are not affected by open PEN faults.",
  },
  {
    question: 'When is a TT earthing system used?',
    answer:
      'A TT system is used when the electricity supply does not provide a metallic earth connection — typically in rural areas with overhead supply lines, where there is no continuous metallic cable sheath to serve as an earth conductor. The installation provides its own earth by driving an earth electrode (a copper-coated steel rod, typically 1.2m or 2.4m long) into the ground. The earth fault loop impedance on a TT system is much higher than on TN systems (often 20 ohms or more, compared to less than 1 ohm on TN-S or TN-C-S). Because of this high impedance, the fault current under earth fault conditions is low — too low for an MCB to trip within the required time. This is why RCD protection is always required on TT systems. A 30mA RCD can trip at very low fault currents, providing the rapid disconnection needed for safety even with high Zs values.',
  },
  {
    question: 'What size should main bonding conductors be?',
    answer:
      "The minimum size of main protective bonding conductors is specified in BS 7671 Table 54.8. For a PME (TN-C-S) supply, the main bonding conductor must be at least 10mm² copper if the supply tails are up to 16mm², and 16mm² copper if the tails are up to 35mm². For TN-S and TT supplies, the minimum is 6mm² copper for tails up to 16mm², and 10mm² copper for tails up to 35mm². These are minimum sizes — the bonding conductor must never be less than half the cross-sectional area of the earthing conductor. In practice, 10mm² green/yellow single core cable is the most common size for domestic main bonding. The bonding connection must be made at the point where the service enters the building, on the consumer's side of any meter or stopcock, using a BS 951 clamp or equivalent approved method.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/how-electricity-works',
    title: 'How Electricity Works',
    description:
      "Basic electrical theory — voltage, current, resistance, Ohm's Law. The foundation for understanding why earthing matters.",
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/what-is-an-rcd',
    title: 'What Is an RCD?',
    description:
      'How RCDs detect earth leakage and protect against electric shock — essential on TT earthing systems.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/supplementary-bonding-guide',
    title: 'Supplementary Bonding Guide',
    description:
      'When supplementary bonding is required, where to connect it, and minimum conductor sizes.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/earth-fault-loop-explained',
    title: 'Earth Fault Loop Explained',
    description:
      'What Zs and Ze mean, how to measure them, and why they determine protective device operation.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/guides/earth-electrode-test',
    title: 'Earth Electrode Test',
    description:
      'How to test an earth electrode on a TT system — fall of potential method and interpretation of results.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-acronyms-glossary',
    title: 'Electrical Acronyms Glossary',
    description: 'A-Z reference of every electrical acronym — CPC, PEN, PME, TN-S, TT and more.',
    icon: BookOpen,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-earthing',
    heading: 'What Is Earthing?',
    content: (
      <>
        <p>
          Earthing is the connection between the metalwork of an electrical installation and the
          general mass of earth — the ground beneath your feet. Every electrical installation in the
          UK must have an effective earthing system. It is one of the most fundamental safety
          measures in electrical work, and it is a requirement of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671 (the IET Wiring Regulations)
          </SEOInternalLink>
          .
        </p>
        <p>
          In simple terms, earthing provides a safe path for fault current — if something goes wrong
          and a live conductor touches a metal part that someone could touch, the earthing system
          ensures that the fault current flows safely to earth, causing the protective device (MCB,
          fuse, or RCD) to disconnect the supply before anyone is injured.
        </p>
        <p>
          Without earthing, a fault would leave the metal casing of an appliance, a socket
          faceplate, or a light fitting at mains voltage — 230V. Anyone touching it would become the
          path to earth. That is how fatal electric shocks happen.
        </p>
      </>
    ),
  },
  {
    id: 'why-earthing-matters',
    heading: 'Why Earthing Matters: The Danger Without It',
    content: (
      <>
        <p>
          To understand why earthing matters, consider what happens when a fault occurs in an
          installation <strong>without</strong> earthing:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>A live wire touches a metal casing.</strong> The casing is now at 230V. It
                sits there, energised, with no visible indication of danger.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Someone touches the casing.</strong> Their body provides a path from the
                casing (at 230V) to the floor (at earth potential). Current flows through their
                body. The amount depends on the resistance of the path — skin, clothing, footwear,
                floor material.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>The protective device does not trip.</strong> Without an earthing path, the
                fault current flows only through the person — and at perhaps 50-200mA, it is far too
                low to trip an MCB (which needs many amps to operate). The MCB sees the fault
                current as a normal load. The circuit stays live. The person continues to receive a
                shock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Injury or death.</strong> A current of 30-50mA sustained for more than a
                second can cause ventricular fibrillation. Without earthing and without RCD
                protection, the person may not survive.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Now consider the same scenario <strong>with</strong> earthing: the casing is connected to
          earth via the CPC (circuit protective conductor). When the live wire touches the casing, a
          large fault current flows through the low-resistance earth path — hundreds of amps. The
          MCB trips in milliseconds. The supply is disconnected before anyone is hurt. That is what
          earthing does.
        </p>
      </>
    ),
  },
  {
    id: 'how-earthing-works',
    heading: 'How Earthing Provides Safety',
    content: (
      <>
        <p>
          The earthing system works by creating a low-resistance path from every exposed metal part
          in the installation back to the source of supply (the transformer). This path has three
          components:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit Protective Conductor (CPC).</strong> The earth wire in each circuit
                cable — the bare copper conductor in twin-and-earth cable, or the green/yellow
                insulated conductor in other cable types. It connects the earth terminal of each
                socket, light fitting, and appliance to the consumer unit's earth bar.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing conductor.</strong> The main conductor that connects the consumer
                unit's earth bar to the main earthing terminal (MET). Typically 10mm² or 16mm²
                green/yellow single core cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth return path.</strong> The path from the main earthing terminal back to
                the transformer star point. This varies depending on the earthing arrangement —
                through the supply cable sheath (TN-S), through the supply neutral (TN-C-S), or
                through the soil via an earth electrode (TT).
              </span>
            </li>
          </ul>
        </div>
        <p>
          The total impedance of this path — from the fault point, through the CPC, through the
          earthing conductor, through the earth return path, through the transformer, and back on
          the line conductor to the fault — is the{' '}
          <SEOInternalLink href="/guides/earth-fault-loop-explained">
            earth fault loop impedance (Zs)
          </SEOInternalLink>
          . The lower the Zs, the higher the fault current, and the faster the protective device
          trips. That is why low-resistance earthing connections matter.
        </p>
      </>
    ),
  },
  {
    id: 'earthing-arrangements',
    heading: 'Earthing Arrangements: TN-S, TN-C-S (PME), and TT',
    content: (
      <>
        <p>
          The UK has three main earthing arrangements, classified by how the earth connection is
          made between the installation and the supply transformer. The arrangement is determined by
          the Distribution Network Operator (DNO) — the electrician must work with whatever
          arrangement the supply provides.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Cable className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">TN-S — Separate Earth</h4>
                <p className="text-white text-sm leading-relaxed">
                  The supply cable has a separate earth conductor — typically the lead sheath or
                  steel wire armouring of the supply cable. The earth is continuous and metallic all
                  the way back to the transformer. Typical Ze: 0.35-0.8 ohms. Found in older
                  properties with underground lead-sheathed cables. Generally provides the most
                  reliable earth, but the sheath can corrode over time, especially on cables
                  installed before the 1960s. If the sheath is damaged, the earth can be lost
                  entirely.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Cable className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  TN-C-S — Combined Earth and Neutral (PME)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  The supply cable has a combined neutral and earth conductor (PEN — Protective
                  Earth and Neutral). At the consumer's main earthing terminal, the PEN is split
                  into separate neutral and earth conductors. This is Protective Multiple Earthing
                  (PME). Typical Ze: 0.2-0.35 ohms. The most common arrangement for newer UK
                  domestic properties. Provides a very low Ze, but carries the risk of an open PEN
                  fault — if the PEN conductor breaks, the earthed metalwork of all connected
                  properties can rise to a dangerous voltage. This is why PME supplies have strict
                  main bonding requirements.
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
                  The installation provides its own earth via an earth electrode driven into the
                  ground. There is no metallic earth connection through the supply cable. Common in
                  rural areas with overhead supply lines. Ze depends on the soil resistivity and
                  electrode type — can be anywhere from 2 ohms to over 200 ohms. Because Ze is
                  typically high, MCBs cannot provide fast enough disconnection under earth fault
                  conditions.{' '}
                  <SEOInternalLink href="/guides/what-is-an-rcd">RCD protection</SEOInternalLink> is
                  essential on all circuits in a TT installation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Record earthing arrangements on your EICR"
          description="Elec-Mate's EICR form captures the earthing arrangement, Ze reading, main bonding conductor sizes, and electrode details. The AI assistant helps identify the arrangement from your site observations."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'bonding',
    heading: 'Bonding: Main Protective and Supplementary',
    content: (
      <>
        <p>
          Bonding is closely related to earthing but serves a different purpose. While earthing
          provides a fault current path, bonding ensures that all metalwork in and around the
          installation is at the same voltage — so a person cannot bridge a dangerous potential
          difference by touching two things simultaneously.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Main Protective Bonding</h4>
                <p className="text-white text-sm leading-relaxed">
                  Connects the main earthing terminal (MET) to incoming metallic services at the
                  point where they enter the building: gas supply pipe, water supply pipe, oil
                  supply pipe, central heating pipework, structural steelwork. The bonding conductor
                  is typically 10mm² or 16mm² green/yellow single core cable, connected using a BS
                  951 earth clamp. This is required by Regulation 544.1 of BS 7671 and must be
                  present in every installation. Missing or disconnected main bonding is a C1
                  (Danger Present) observation on an EICR.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Supplementary Bonding</h4>
                <p className="text-white text-sm leading-relaxed">
                  Additional bonding connections between exposed conductive parts and extraneous
                  conductive parts in specific locations. The most common location is bathrooms,
                  where{' '}
                  <SEOInternalLink href="/guides/supplementary-bonding-guide">
                    supplementary bonding
                  </SEOInternalLink>{' '}
                  connects metal pipes, radiators, bath/shower trays (if metal), and any other
                  metalwork within arm's reach. Under BS 7671 Regulation 701.415.2, supplementary
                  bonding in bathrooms may be omitted if all circuits in the bathroom have RCD
                  protection and the main bonding is confirmed present.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'visual-check',
    heading: 'Visual Checks for Earthing: What to Look For',
    content: (
      <>
        <p>
          Whether you are a homeowner checking your own property or an apprentice learning the
          basics, here is what to look for when visually inspecting an earthing system. Note: only a
          qualified electrician should test or modify earthing and bonding connections.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main earthing terminal (MET).</strong> Usually located near the consumer
                unit or electricity meter. All earthing and bonding conductors connect here. Check
                that all connections are tight and there is no corrosion or damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing conductor.</strong> The green/yellow cable from the MET to the
                consumer unit earth bar. Check it is the correct size (at least 16mm² for PME, 10mm²
                for TN-S) and is securely connected at both ends.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main bonding conductors.</strong> Green/yellow cables from the MET to the
                gas pipe, water pipe, and any other incoming metallic services. Check they are
                present, connected with proper BS 951 clamps (not jubilee clips), and labelled with
                a "Safety Electrical Connection — Do Not Remove" label.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrode (TT systems).</strong> Usually a copper rod driven into the
                ground outside the property. Check the electrode is in good condition, the
                connection is clean and tight, and the cable from the electrode to the MET is intact
                and protected from mechanical damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bonding labels.</strong> All bonding connections should have a warning label
                stating "Safety Electrical Connection — Do Not Remove." Missing labels are a C3
                observation on an EICR.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'earthing-on-eicr',
    heading: 'Earthing on the EICR: What Gets Tested and Recorded',
    content: (
      <>
        <p>
          During an <SEOInternalLink href="/guides/eicr-for-landlords">EICR</SEOInternalLink>, the
          electrician carries out several tests and checks related to the earthing system:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ze measurement.</strong> The external earth fault loop impedance is measured
                at the origin of the installation. This confirms the earthing arrangement and
                verifies the supply earth is intact. Unusually high Ze may indicate a deteriorating
                supply earth.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zs measurement on each circuit.</strong> The earth fault loop impedance at
                the furthest point of each circuit confirms the CPC is intact and the total loop
                impedance allows the protective device to trip within the required time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>R1+R2 continuity test.</strong> Measures the combined resistance of the line
                and protective conductors end-to-end. This is the installation's contribution to Zs
                (Zs = Ze + R1+R2).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main bonding continuity.</strong> The resistance of each main bonding
                conductor is measured to confirm it is continuous and of low resistance. A reading
                above 0.05 ohms may indicate a poor connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrode resistance (TT systems).</strong> On TT systems, the
                resistance of the earth electrode is measured using the fall-of-potential method or
                the loop impedance method. See{' '}
                <SEOInternalLink href="/guides/earth-electrode-test">
                  earth electrode testing
                </SEOInternalLink>
                .
              </span>
            </li>
          </ul>
        </div>
        <p>
          Common earthing-related defects found during EICRs include: missing or disconnected main
          bonding (C1), undersized bonding conductors (C2), loose earthing connections (C2), missing
          bonding labels (C3), and high Ze readings indicating a deteriorating supply earth (C2 or
          FI for further investigation).
        </p>
        <SEOAppBridge
          title="Complete EICR certificates on your phone"
          description="Elec-Mate records all earthing details — earthing arrangement, Ze, Zs, R1+R2, bonding sizes, electrode resistance — directly into the EICR. Voice entry, AI assistance, and instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function WhatIsEarthingPage() {
  return (
    <GuideTemplate
      title="What Is Earthing? | Why Electrical Earthing Matters"
      description="Plain English guide to electrical earthing. Why earthing matters for safety, how it works, TN-S, TN-C-S (PME), and TT earthing arrangements explained, main and supplementary bonding, and what gets tested during an EICR."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Electrical Basics"
      badgeIcon={Cable}
      heroTitle={
        <>
          What Is Earthing? <span className="text-yellow-400">Why Electrical Earthing Matters</span>
        </>
      }
      heroSubtitle="Earthing is the single most important safety measure in any electrical installation. It provides a safe path for fault current, ensures protective devices operate, and prevents metal parts from sitting at mains voltage. This guide explains how earthing works, the three UK earthing arrangements, and what gets tested during an EICR."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Earthing"
      relatedPages={relatedPages}
      ctaHeading="Record Earthing Details on Your EICR"
      ctaSubheading="Elec-Mate captures earthing arrangements, Ze readings, bonding details, and electrode resistance directly into your EICR. Voice entry, AI assistance, and professional PDF export. 7-day free trial."
    />
  );
}
