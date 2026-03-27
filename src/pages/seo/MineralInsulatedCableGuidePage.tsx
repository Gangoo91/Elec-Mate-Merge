import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Flame,
  ShieldCheck,
  AlertTriangle,
  Wrench,
  Layers,
  Zap,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation Guides', href: '/guides/cable-installation' },
  { label: 'Mineral Insulated Cable Guide', href: '/mineral-insulated-cable-guide' },
];

const tocItems = [
  { id: 'what-is-micc', label: 'What is MICC / Pyro Cable?' },
  { id: 'construction', label: 'Construction and Materials' },
  { id: 'fire-resistance', label: 'Extreme Fire and Temperature Resistance' },
  { id: 'termination', label: 'Termination — Tools and Seals' },
  { id: 'applications', label: 'Applications' },
  { id: 'vs-fp200', label: 'MICC vs FP200 Gold' },
  { id: 'cost', label: 'Installation Cost vs Benefit' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Mineral Insulated Copper Clad (MICC) cable — commonly known by the brand name Pyrotenax — uses magnesium oxide as the insulating material and a seamless copper sheath, giving it unmatched fire and temperature resistance.',
  'MICC cable can operate continuously at conductor temperatures up to 250°C and can withstand direct exposure to flame temperatures exceeding 1000°C — far beyond the capability of any polymer-insulated cable.',
  'Termination of MICC cable requires a specialist crimping tool kit to fit the pot and seal, and a pot sealing compound to prevent moisture absorption by the hygroscopic magnesium oxide insulation.',
  'MICC is the cable of choice for emergency lighting, fire alarm, and power circuits in high-risk environments including tunnels, petrochemical facilities, power stations, and high-rise buildings.',
  'The high installation cost of MICC (typically 3–5× that of FP200 Gold per metre installed) is justified only where extreme fire conditions or very long circuit integrity periods are required.',
];

const faqs = [
  {
    question: 'What does MICC stand for and what is Pyrotenax?',
    answer:
      'MICC stands for Mineral Insulated Copper Clad cable, referring to the use of mineral (magnesium oxide) as the insulating material and a copper sheath as the outer conductor and mechanical protection. Pyrotenax is the original brand name for MICC cable, developed in the UK by Pyrotenax Ltd in the 1930s and now owned by Prysmian Group. The term "Pyro" is commonly used as a generic term for MICC cable by UK electricians, in the same way that "Hoover" is used for vacuum cleaners. Other manufacturers produce similar products under different brand names.',
  },
  {
    question: 'What temperature can MICC cable withstand?',
    answer:
      'MICC cable can withstand significantly higher temperatures than any polymer-insulated alternative. The magnesium oxide insulation is non-combustible and does not soften or decompose — it remains stable at temperatures exceeding 1000°C. Bare MICC cable (without a PVC or LSF oversheath) can operate at conductor temperatures up to 250°C continuously and can survive direct flame exposure during a fire. With the common PVC oversheath, continuous operation is typically limited to 70°C or 105°C depending on the sheath grade.',
  },
  {
    question: 'How do you terminate MICC cable?',
    answer:
      'MICC termination requires a specialist crimping kit consisting of a pot crimping tool, pot sealing tool, and sealing compound (typically an epoxy resin or Deroxit compound). The copper sheath is cut square with a MICC cutter, the sheath is stripped back, and the magnesium oxide insulation is removed from the conductors with a reamer. The termination pot is fitted over the conductors and crimped onto the copper sheath. Sealing compound is injected to fill the pot and prevent moisture absorption by the hygroscopic magnesium oxide insulation. Moisture in the termination causes insulation resistance failures. A suitable gland and tail seal complete the termination.',
  },
  {
    question: 'Why does MICC cable need to be sealed against moisture?',
    answer:
      'The magnesium oxide mineral insulation in MICC cable is hygroscopic — it readily absorbs moisture from the atmosphere. Moisture absorption dramatically reduces the insulation resistance of the cable, causing the installation to fail insulation resistance tests and potentially causing leakage currents. For this reason, all MICC cable terminations must be sealed immediately after cutting and stripping, using the appropriate sealing compound and pot. Ends of MICC cable on a reel or cut lengths stored on site must be capped or temporarily sealed until final termination.',
  },
  {
    question: 'Can MICC cable be used outdoors?',
    answer:
      'Bare MICC cable (plain copper sheath without oversheath) is suitable for indoor installation in dry locations. For outdoor use, humid environments, or where chemical attack is possible, MICC cable with an LSF (Low Smoke and Fume) or PVC oversheath is required. The oversheath protects the copper sheath from corrosion. Stainless steel sheath MICC cable is available for highly corrosive environments such as marine applications or chemical plant.',
  },
  {
    question: 'What is the minimum bend radius for MICC cable?',
    answer:
      'MICC cable has a minimum bend radius of 6× the overall cable diameter for 2-core cable and larger sizes. For single-core cable, the minimum is 3× the overall diameter. Unlike polymer-insulated cables, MICC cable cannot be re-bent at the same point multiple times — repeated bending at the same location can cause the copper sheath to work-harden and crack. Where bends are required, use a MICC cable bending tool or bending former to achieve a controlled, consistent bend radius.',
  },
  {
    question: 'Is MICC cable suitable for domestic fire alarm installations?',
    answer:
      'MICC cable is rarely used in domestic fire alarm installations due to its high cost and the specialist tools required for termination. For domestic fire alarm systems (Grade D, Category LD2 or LD3 per BS 5839-6), standard enhanced cables or FP200 Gold are usually specified. MICC is typically reserved for commercial, institutional, and industrial buildings where its extreme fire resistance performance justifies the higher cost, and for circuits requiring 60-minute or 90-minute circuit integrity under fire conditions.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/fp200-gold-cable-guide',
    title: 'FP200 Gold Cable Guide',
    description: 'Fire-resistant cable for fire alarm and emergency lighting — BS 7629-1 guide.',
    icon: Flame,
    category: 'Guide',
  },
  {
    href: '/armoured-cable-installation',
    title: 'Armoured Cable (SWA) Installation',
    description: 'Steel Wire Armoured cable — types, current ratings, burial depths, and glands.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/conduit-installation-guide',
    title: 'Conduit Installation Guide',
    description: 'Steel and PVC conduit — bending, threading, fire stopping, and earthing.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/cable-tray-installation',
    title: 'Cable Tray Installation',
    description: 'Commercial cable management — perforated, solid bottom, and wire mesh trays.',
    icon: Layers,
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
    id: 'what-is-micc',
    heading: 'What is Mineral Insulated Copper Clad (MICC) Cable?',
    content: (
      <>
        <p>
          Mineral Insulated Copper Clad (MICC) cable — universally known in the UK electrical
          industry by the brand name Pyrotenax — is the highest-performance fire-resistant cable
          available. It is used wherever conventional polymer-insulated cables would fail under
          extreme fire or temperature conditions.
        </p>
        <p>
          MICC cable consists of copper conductors embedded in highly compressed magnesium oxide
          (MgO) mineral insulation, all enclosed within a seamless drawn copper tube (the sheath).
          This construction is manufactured by feeding copper conductors through a copper tube
          packed with magnesium oxide powder, then drawing the assembly down through dies to
          compact the insulation and reduce the diameter to the finished cable size.
        </p>
        <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-combustible materials throughout</strong> — copper and magnesium oxide
                are both non-combustible. There is no polymer in the cable construction to ignite,
                burn, or emit toxic gases.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>No smoke or toxic gas emission</strong> — bare MICC cable produces no
                smoke and no toxic combustion products, as the materials cannot burn. This makes
                it particularly valuable in occupied buildings during a fire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Long service life</strong> — the inorganic materials in MICC cable do
                not age, degrade, or become brittle over time. MICC installations from the 1960s
                and 1970s are still found in service in many UK buildings.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'construction',
    heading: 'Construction and Materials',
    content: (
      <>
        <p>
          Understanding the construction of MICC cable helps explain both its exceptional
          properties and the specialist handling it requires during installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conductors</strong> — annealed copper conductors, available in
                single-core, 2-core, 3-core, 4-core, and 7-core configurations. Conductor
                sizes from 1mm² to 240mm² for power applications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation</strong> — highly compressed magnesium oxide (MgO) powder.
                MgO is a white inorganic compound with a melting point of 2852°C — it cannot
                burn and does not decompose under fire conditions experienced in buildings.
                However, it is hygroscopic and must be protected from moisture.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sheath</strong> — seamless drawn copper tube. The copper sheath acts
                as the outer conductor (providing the earth path), the mechanical protection,
                and the moisture barrier for the MgO insulation. The sheath must be kept intact
                and sealed at all termination points.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Oversheath (optional)</strong> — an outer PVC or LSF sheath is applied
                over the copper sheath for corrosion protection and identification. Bare MICC
                cable (no oversheath) is used indoors in dry, non-corrosive environments.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fire-resistance',
    heading: 'Extreme Fire and Temperature Resistance',
    content: (
      <>
        <p>
          MICC cable's fire performance far exceeds that of any polymer-insulated fire-resistant
          cable. This performance advantage is the reason MICC is specified for the most demanding
          fire-critical circuits.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuous operating temperature</strong> — up to 250°C for bare MICC
                (70°C or 105°C with PVC or LSF oversheath). This allows use in high-temperature
                environments such as boiler rooms, steam generating plant, and industrial
                processes — far beyond the capability of any conventional cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit integrity under fire</strong> — MICC can maintain circuit
                integrity at flame temperatures exceeding 1000°C for periods of 60 minutes
                and beyond. This exceeds the BS 7629-1 fire test conditions used for
                FP200 Gold and similar cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS EN 60702-1 compliance</strong> — MICC cables are tested and
                classified to BS EN 60702-1 (mineral insulated cables and their terminations),
                which specifies construction, test methods, and performance requirements.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For circuits specified to maintain function for 60 or 90 minutes under fire conditions
          (as required by some fire engineering designs and fire authority specifications), MICC
          is often the only cable type that can demonstrate compliance with certainty.
        </p>
      </>
    ),
  },
  {
    id: 'termination',
    heading: 'Termination — Tools, Pots, and Moisture Sealing',
    content: (
      <>
        <p>
          Correct termination is the most skill-intensive aspect of MICC cable installation.
          Incorrect termination is the most common cause of MICC installation failures, typically
          manifesting as low insulation resistance due to moisture ingress.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MICC cutter</strong> — used to cut the cable square. A hacksaw or
                standard cable cutters leave a rough sheath end that is difficult to seal.
                The MICC cutter produces a square, clean cut.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sheath stripper</strong> — removes the copper sheath without damaging
                the conductors. Cuts a ring in the sheath and allows the end section to be
                removed. The reamer tool is then used to remove the MgO insulation from around
                the conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Termination pot and crimping tool</strong> — a brass termination pot
                is threaded onto the cable conductors and crimped onto the copper sheath using
                a ratchet crimping tool. The pot provides the gland thread and the base for
                the sealing compound.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sealing compound</strong> — silicone rubber, epoxy resin, or
                proprietary compounds (such as Deroxit) are injected or packed into the pot
                to seal the MgO insulation against moisture. The compound must be allowed
                to cure fully before the installation is energised.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Seal cut ends immediately</strong> — never leave a cut MICC cable
                end unsealed, even for a short time. The MgO insulation begins absorbing
                moisture immediately on exposure to air. Pre-terminate or cap with
                electrician's tape as a temporary measure.
              </span>
            </li>
          </ul>
        </div>
        <p>
          After termination, test insulation resistance between conductors and between each
          conductor and the sheath earth using a 500V DC insulation resistance tester. Readings
          below 1MΩ indicate moisture in the insulation. Baking out the cable (heating the
          termination with a heat gun while the insulation resistance is monitored) can restore
          readings in mildly damp cables.
        </p>
      </>
    ),
  },
  {
    id: 'applications',
    heading: 'Applications for MICC Cable',
    content: (
      <>
        <p>
          MICC cable is specified where no other cable type provides adequate performance. Its
          high cost means it is reserved for applications where its unique properties genuinely
          justify the investment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm systems — high-risk</strong> — power and detection circuits
                in high-risk buildings (petrochemical, nuclear, and large hospitals) where
                60-minute or 90-minute circuit integrity is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting — high-risk</strong> — maintained emergency lighting
                circuits in tunnels, large public buildings, and high-rise buildings where
                evacuation routes must remain lit for extended periods.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-temperature environments</strong> — wiring in boiler rooms,
                generator sets, furnaces, steam raising plant, and industrial processes
                where ambient temperatures exceed the continuous rating of polymer-insulated
                cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hazardous areas</strong> — MICC cable is widely used in Zone 1 and
                Zone 2 hazardous areas (potentially explosive atmospheres) due to its
                non-combustible construction and suitability for use with explosion-proof
                termination fittings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Interference-sensitive circuits</strong> — the copper sheath provides
                excellent electromagnetic shielding. MICC is used for instrumentation and
                control cables in industrial environments where EMI shielding is required.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'vs-fp200',
    heading: 'MICC vs FP200 Gold: Which Should You Specify?',
    content: (
      <>
        <p>
          Both MICC and FP200 Gold are accepted by BS 5839-1 for fire alarm circuits and by
          BS 5266-1 for emergency lighting. The choice depends on the specific fire engineering
          requirements and budget.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Choose MICC when</strong> — the specification requires 60-minute or
                90-minute circuit integrity; the cable will be in an area of extreme fire
                load; the installation is in a high-temperature environment; or the client
                or fire engineer explicitly requires MICC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Choose FP200 Gold when</strong> — the specification requires 30-minute
                circuit integrity (BS 7629-1 minimum); the building is standard commercial or
                residential; budget is a significant factor; or the programme does not allow
                for the longer termination time required by MICC.
              </span>
            </li>
          </ul>
        </div>
        <p>
          See the{' '}
          <SEOInternalLink href="/fp200-gold-cable-guide">
            FP200 Gold cable guide
          </SEOInternalLink>{' '}
          for full details on fire-resistant cable for standard fire alarm and emergency lighting
          installations.
        </p>
      </>
    ),
  },
  {
    id: 'cost',
    heading: 'Installation Cost vs Benefit',
    content: (
      <>
        <p>
          MICC cable is significantly more expensive than any alternative fire-resistant cable,
          both in material cost and installation time. Understanding where this cost is and is
          not justified is important for project pricing and specification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Material cost</strong> — 2-core 1.5mm² MICC cable is typically 3 to
                5 times the price per metre of equivalent FP200 Gold. For large cable quantities,
                this difference is significant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Labour cost</strong> — MICC termination takes 3 to 4 times longer
                than FP200 Gold termination per end due to the specialist tools and sealing
                process required. On a large installation with hundreds of terminations,
                this has a major impact on project cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tool investment</strong> — a complete MICC termination kit costs
                several hundred pounds and requires maintenance. Electricians who rarely
                install MICC may need to hire tools or subcontract to a specialist.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Where cost is justified</strong> — nuclear, petrochemical, large
                hospitals, and critical national infrastructure where the cost of circuit
                failure during a fire is catastrophic. The additional cost of MICC is a
                small fraction of the total facility value.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Certifying MICC Installations',
    content: (
      <>
        <p>
          MICC cable installations must be certified with the appropriate Electrical Installation
          Certificate, with test results including insulation resistance values for each conductor
          to sheath and between conductors. Low insulation resistance on MICC is almost always
          a termination moisture issue.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certify MICC Installations on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certificate app
                  </SEOInternalLink>{' '}
                  to issue Electrical Installation Certificates for MICC installations.
                  Record insulation resistance test results, cable type, and installation
                  details — produce the PDF on site before you leave.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete MICC installation certificates on your phone"
          description="Elec-Mate's EIC and EICR apps let you certify fire-critical MICC cable installations on site. Record IR test results, cable details, and installation notes — instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function MineralInsulatedCableGuidePage() {
  return (
    <GuideTemplate
      title="Mineral Insulated Cable (MICC/PYRO) UK | Installation Guide"
      description="Complete UK guide to Mineral Insulated Copper Clad (MICC) cable — Pyrotenax, magnesium oxide insulation, extreme fire and temperature resistance, termination tools and seals, applications in fire circuits and hazardous areas, and cost comparison with FP200 Gold."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Flame}
      heroTitle={
        <>
          Mineral Insulated Cable (MICC / Pyro):{' '}
          <span className="text-yellow-400">UK Installation Guide</span>
        </>
      }
      heroSubtitle="The complete guide to Mineral Insulated Copper Clad (MICC) cable — Pyrotenax brand, magnesium oxide insulation, extreme fire and temperature resistance, specialist termination tools and moisture seals, applications, and honest cost vs benefit analysis."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Mineral Insulated (MICC) Cable"
      relatedPages={relatedPages}
      ctaHeading="Complete MICC Installation Certificates on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to certify fire-critical cable installations on site. Record insulation resistance test results and cable details — instant PDF export. 7-day free trial."
    />
  );
}
