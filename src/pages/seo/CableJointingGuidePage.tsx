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
  { label: 'Cable Jointing Guide', href: '/cable-jointing-guide' },
];

const tocItems = [
  { id: 'jointing-overview', label: 'Cable Jointing Overview' },
  { id: 'heat-vs-cold-shrink', label: 'Heat Shrink vs Cold Shrink Joints' },
  { id: 'scotchlok-connectors', label: 'Scotchlok and Crimp Connectors' },
  { id: 'cable-stripping', label: 'Cable Stripping Techniques' },
  { id: 'insulation-testing', label: 'Insulation Testing After Jointing' },
  { id: 'bs7671-requirements', label: 'BS 7671 Requirements for Joints' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Cable joints in LV and MV systems must be mechanically and electrically sound and provide equivalent insulation, moisture and mechanical protection to the cable itself. BS 7671:2018+A3:2024 Regulation 526.1 requires joints and terminations to be made using suitable accessories.',
  'Heat shrink jointing systems use thermoplastic tubing applied with a hot air gun to provide insulation, semi-conductive screening (MV joints), and mechanical protection in a single system. Cold shrink systems use pre-expanded silicone rubber that contracts when a support tube is removed — no heat source required.',
  'Insulation resistance must be tested before and after jointing. A significant reduction after jointing indicates moisture ingress, damaged insulation, or contamination of the conductor connection. Minimum values depend on the voltage rating of the cable per BS 7671 Chapter 64.',
  'Scotchlok (insulation displacement) connectors and mechanical crimp connectors are acceptable for LV jointing of small conductors but are not suitable for service entry cables, meter tails, or any conductor subject to significant current load without manufacturer testing evidence.',
  'All cable joints must be accessible for inspection unless specifically designed and certified for permanent burial or submersion. Buried joints require waterproof jointing kits with gel-filled or resin-poured enclosures rated IP68.',
];

const faqs = [
  {
    question: 'What does BS 7671 say about cable joints?',
    answer:
      'BS 7671:2018+A3:2024 Regulation 526.1 requires every connection between conductors or between a conductor and other equipment to provide durable electrical continuity and adequate mechanical strength. The joint must also provide insulation, protection against mechanical damage, and protection against environmental conditions (moisture, corrosion) equivalent to that of the cable itself. Regulation 526.3 states that joints and connections should be accessible for inspection and testing unless they are in a compound-filled or encapsulated enclosure, or are joints in conduit or trunking systems specifically designed for concealed installation.',
  },
  {
    question: 'What is the difference between heat shrink and cold shrink jointing?',
    answer:
      'Heat shrink jointing uses polyolefin tubing that shrinks to approximately half its original diameter when heated with a hot air gun at 120 to 200\u00b0C. For MV cables, multi-layer systems include semi-conductive stress control tubing, insulation tube, and outer protection tube applied in sequence. Cold shrink jointing uses silicone rubber components pre-expanded onto a rigid support tube. The support tube is removed on-site by pulling a cord, allowing the silicone to contract and grip the cable. Cold shrink is preferred in confined spaces, flammable environments, or where heat sources cannot be used safely. Both systems must be from a single manufacturer and applied strictly per the installation instructions — mixing components from different manufacturers invalidates the joint.',
  },
  {
    question: 'Can I use Scotchlok connectors for permanent cable joints?',
    answer:
      'Scotchlok insulation displacement connectors (IDCs) from 3M and similar products are suitable for low-current telecommunications and data cable joints, and for permanent splicing of small control cables (typically up to 1.5mm\u00b2). They are not suitable for power circuits carrying significant current, meter tails, service entries, or any safety-critical circuit. BS 7671 Regulation 526.1 requires that joints be appropriate for the conductor cross-section and current. For power conductors above 1.5mm\u00b2, use mechanical screw-type connectors, compression ferrules crimped with a ratchet tool, or welded/brazed connections in industrial applications.',
  },
  {
    question: 'How do I prepare a cable for jointing?',
    answer:
      'Cable preparation is the most critical part of jointing. For LV cables: (1) cut the cable square using a cable knife or junior hacksaw; (2) remove the outer sheath to the required length using a rotary cable stripper — never score around the cable with a knife as this damages the insulation beneath; (3) remove armour wires or tape screening if present, leaving a sufficient length for the earth connection; (4) remove individual core insulation to the exact stripping length specified by the joint kit manufacturer using a dedicated stripping tool calibrated for the cable outer diameter; (5) clean conductors with a lint-free cloth and approved cleaning fluid. Any contamination on conductors will compromise the joint resistance. For MV cables, semiconductor layers must be removed cleanly to a precise pencil taper — use a semi-con stripping tool, not a knife.',
  },
  {
    question: 'What insulation resistance values should I expect after jointing?',
    answer:
      'BS 7671:2018+A3:2024 Chapter 64 requires insulation resistance to be measured at a test voltage appropriate to the circuit nominal voltage. For circuits up to 500V, the test voltage is 500V DC and the minimum acceptable reading is 1M\u03a9. For circuits between 500V and 1,000V, the test voltage is 1,000V DC and the minimum is also 1M\u03a9. In practice, well-made joints on new cable should measure hundreds or thousands of M\u03a9. A reading below 10M\u03a9 on a new joint warrants investigation. After a joint is made, allow the resin (if used) to cure fully before final testing — testing too soon may give falsely low readings.',
  },
  {
    question: 'What protection is required for buried cable joints?',
    answer:
      'Buried cable joints must be protected against moisture, soil chemicals, mechanical loading, and root penetration. The joint kit must be rated for permanent submersion — typically IP68 (to a defined depth and duration). Suitable products include resin-poured joint boxes (the resin cures to a solid, waterproof block), gel-filled enclosures, and purpose-made heat shrink systems with anti-tracking outer protection. BS 7671 Regulation 522.8.10 requires buried cables and joints to be protected against damage from excavation and states that joints should be accessible where possible. Where buried joints are unavoidable, fit a joint marker post above ground and record the joint location on the as-installed drawings.',
  },
  {
    question: 'Do I need to re-test a circuit after making a cable joint?',
    answer:
      'Yes. Any work on a circuit that involves opening or modifying cables requires re-testing before the circuit is returned to service. The minimum tests after cable jointing are continuity of conductors (including the circuit protective conductor), insulation resistance between phase, neutral, and earth, and verification that the joint has not affected the circuit earth fault loop impedance. For MV jointing, high voltage (HV) pressure testing is standard practice and is typically a requirement of the network operator or asset owner before the circuit is re-energised. Document all pre- and post-jointing test results on a Minor Works Certificate or EIC as appropriate.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrical-installation-conduit',
    title: 'Electrical Installation Conduit Guide',
    description: 'Steel vs PVC conduit, fill calculations, earthing, IP ratings and fire stopping.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/electrical-test-equipment-guide',
    title: 'Electrical Test Equipment Guide',
    description: 'Buying guide for MFTs, clamp meters, voltage indicators and loop testers.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
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
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Generate compliant Electrical Installation Certificates on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'jointing-overview',
    heading: 'Cable Jointing Overview',
    content: (
      <>
        <p>
          Cable jointing is the process of creating a permanent, insulated connection between two
          lengths of cable. In UK electrical installations, jointing arises in several common
          scenarios: extending underground cable runs, repairing damaged cables, connecting
          distribution cables to service cables, and jointing LV mains cables in public and private
          distribution networks.
        </p>
        <p>
          The fundamental requirement — from BS 7671:2018+A3:2024 Regulation 526.1 — is that a joint
          must provide electrical continuity and mechanical strength equivalent to the cable itself,
          together with insulation and environmental protection commensurate with the cable type and
          installation conditions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Types of Joint by Application</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Straight joint:</strong> Joins two cable ends in line. The most common type
                for underground cable extensions and cable repairs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tee joint:</strong> Branches off a through-cable to a tee connection. Used
                in distribution networks and sub-mains from mains cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Termination:</strong> Seals the end of a cable for connection to switchgear,
                transformer, or distribution board. Heat shrink termination kits are the standard
                solution for LV and MV cables.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For MV (medium voltage, 1kV to 36kV) jointing, specialist training and accreditation is
          required. Network operators such as National Grid, SP Energy Networks, and UK Power
          Networks require their own jointing accreditation schemes in addition to basic electrical
          qualifications. LV jointing (up to 1kV) is within the competence of a qualified
          electrician familiar with the techniques.
        </p>
      </>
    ),
  },
  {
    id: 'heat-vs-cold-shrink',
    heading: 'Heat Shrink vs Cold Shrink Joints',
    content: (
      <>
        <p>
          Heat shrink and cold shrink are the two dominant jointing technologies for LV and MV power
          cables. Each has distinct advantages and is preferred in different installation scenarios.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-4">Heat Shrink Jointing Systems</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Polyolefin tubing shrinks to grip the cable when heated with a hot air gun at 120 to
                200\u00b0C. Multi-layer MV systems include stress control, insulation, and outer
                protection tubes applied sequentially.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Advantages:</strong> Well-established technology, lower material cost, wide
                range of cable sizes covered, joints can be made in field conditions if a suitable
                heat source is available.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limitations:</strong> Requires a gas torch or hot air gun — not suitable
                near flammable materials or in confined spaces with poor ventilation. Overheating
                can damage the cable insulation beneath the joint.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Key manufacturers:</strong> 3M, Tyco Electronics (now TE Connectivity),
                Raychem — all supply comprehensive heat shrink jointing kits with installation
                instructions that must be followed precisely.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-4">Cold Shrink Jointing Systems</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Silicone rubber components pre-expanded onto a rigid support tube. Remove the tube
                by pulling a spiral cord — the silicone contracts to grip the cable without any heat
                source.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Advantages:</strong> No heat source required — safe in flammable
                atmospheres, confined spaces, and underground chambers. Silicone provides excellent
                dielectric properties and long service life. Faster installation in adverse
                conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limitations:</strong> Higher material cost, larger installed size than heat
                shrink, may not suit cables with irregular profiles or unusual outer diameters.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Key manufacturers:</strong> 3M Cold Shrink range, nkt Cables JCS jointing
                systems, Prysmian Group cold shrink kits.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'scotchlok-connectors',
    heading: 'Scotchlok and Crimp Connectors',
    content: (
      <>
        <p>
          For smaller-conductor LV cable joints, insulation displacement connectors (IDCs) such as
          3M Scotchlok and various mechanical crimp connectors offer a fast and reliable solution
          without requiring specialist jointing equipment or heat sources.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scotchlok IDCs:</strong> A metal contact pierces the cable insulation to
                make contact with the conductor — no stripping required. Suitable for solid or
                stranded conductors up to approximately 2.5mm\u00b2 depending on product range.
                Widely used in telecom, data, and low-current control wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Crimp ferrules:</strong> Conductors are inserted into a copper or aluminium
                ferrule and compressed with a ratchet crimping tool calibrated for the ferrule size.
                Provides a gas-tight connection that resists corrosion. Essential for aluminium
                conductors where screw-type connectors would cause cold flow and loosening.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mechanical connectors:</strong> Split-bolt, Polaris multi-tap, and
                proprietary maintenance-free connectors for LV distribution cables up to
                300mm\u00b2. Suitable for copper or aluminium conductors with appropriate
                bi-metallic connectors where required.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Current capacity:</strong> Always verify that the connector current rating
                equals or exceeds the cable current-carrying capacity. IDC connectors for data use
                are not suitable for power cables — the contact area is insufficient for
                heating-cycle loads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protection after jointing:</strong> After connector installation, the joint
                must be enclosed in a suitable enclosure providing appropriate IP protection. Do not
                leave connectors exposed — moisture ingress leads to corrosion and resistance
                increase over time.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cable-stripping',
    heading: 'Cable Stripping Techniques',
    content: (
      <>
        <p>
          Correct cable stripping is fundamental to joint quality. Damage to cable insulation during
          preparation is the leading cause of joint failure. Using the correct tools for each cable
          type is non-negotiable on quality jointing work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outer sheath removal (LV SWA/XLPE):</strong> Use a rotary cable stripper set
                to cut through the outer sheath without penetrating the armour or bedding. Score a
                ring cut to the required strip length, then make a longitudinal cut and peel back
                the sheath. Never use a craft knife around the circumference of the cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Armour removal:</strong> Cut individual armour wires with side cutters one
                at a time, or use armour cutters for larger cables. Bend wires back carefully to
                avoid damaging the cable bedding. Leave sufficient armour for connection to the
                earth clamp.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Core insulation removal:</strong> Use a calibrated wire stripper set for the
                conductor cross-section. Automatic or ratchet strippers provide the most consistent
                strip length and avoid nicking conductors. For XLPE insulation, a thermal wire
                stripper provides the cleanest cut.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Semi-conducting layer (MV cables):</strong> Use a purpose-made semi-con
                stripping tool. The semi-con must be removed cleanly to a precise tapered pencil end
                — any residue left on the XLPE insulation will cause electrical stress concentration
                and eventual joint failure.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'insulation-testing',
    heading: 'Insulation Testing After Jointing',
    content: (
      <>
        <p>
          Insulation resistance (IR) testing must be carried out after every cable joint to verify
          that the joint has not introduced insulation defects. Testing before and after jointing
          provides a baseline comparison and demonstrates that the joint has not degraded the
          circuit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test voltage (BS 7671 Chapter 64):</strong> 500V DC for circuits up to 500V
                nominal; 1,000V DC for circuits 500V to 1,000V. The test voltage must not damage
                sensitive equipment — disconnect electronic devices before testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum acceptable values:</strong> BS 7671 Table 64 specifies 1M\u03a9
                minimum for circuits up to 500V and 1M\u03a9 for 500V to 1,000V circuits. In
                practice, values below 10M\u03a9 on a new joint warrant investigation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing methodology:</strong> Test between each conductor pair (L1-L2,
                L1-L3, L2-L3, L1-E, L2-E, L3-E). For three-phase cables with neutral, test N-E and
                each phase to neutral as well. Record all readings on the test schedule.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Resin cure time:</strong> If a resin-poured enclosure is used, allow the
                resin to fully cure per the manufacturer instructions before final IR testing.
                Testing during cure can give misleadingly low readings.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bs7671-requirements',
    heading: 'BS 7671 Requirements for Cable Joints',
    content: (
      <>
        <p>
          BS 7671:2018+A3:2024 sets out specific requirements for cable joints and connections in
          Part 5 (Selection and Erection of Equipment) and Chapter 52 (Selection and Erection of
          Wiring Systems). Understanding these requirements is essential for compliant installation
          and EICR assessment.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 526.1:</strong> Every connection between conductors or between a
                conductor and equipment must provide durable electrical continuity and adequate
                mechanical strength. Connections must use suitable accessories and be made by a
                skilled person.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 526.3:</strong> Joints must generally be accessible for
                inspection unless in a compound-filled or encapsulated enclosure. Buried or enclosed
                joints must be made with specifically designed and tested products.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 543.1:</strong> The circuit protective conductor must be
                continuous and of sufficient cross-sectional area. A joint in the CPC must meet the
                same requirements as joints in phase conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mechanical protection:</strong> Regulation 522.6 requires that cables be
                protected against mechanical damage appropriate to the installation. Joints in cable
                ducts or underground should be enclosed in a suitably rated junction box or
                compound-filled system.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Record all jointing work on a{' '}
          <SEOInternalLink href="/tools/minor-works" label="Minor Works Certificate" /> for small
          repairs or an{' '}
          <SEOInternalLink
            href="/tools/eic-certificate"
            label="Electrical Installation Certificate"
          />{' '}
          for new circuit work. Test results must be documented.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians — Documenting Cable Jointing Work',
    content: (
      <>
        <p>
          Cable jointing and repair work requires appropriate certification and test records.
          Elec-Mate provides the certificate tools you need to document jointing work efficiently
          on-site.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/tools/minor-works" label="Minor Works Certificate" /> — issue
                minor electrical installation works certificates for cable repairs and joint work,
                including pre- and post-repair insulation resistance readings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge
                  href="/tools/eic-certificate"
                  label="Electrical Installation Certificate"
                />{' '}
                — generate a compliant EIC for new underground cable installations including
                jointing details and test schedules.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/tools/eicr-certificate" label="EICR Certificate" /> — document
                inaccessible or defective joints identified during periodic inspection as C2 or C3
                observations with photographic evidence.
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

export default function CableJointingGuidePage() {
  return (
    <GuideTemplate
      title="Cable Jointing Guide — LV and MV Jointing for UK Electricians"
      description="Complete guide to cable jointing for UK electricians: heat shrink vs cold shrink joints, Scotchlok connectors, cable stripping techniques, insulation testing after jointing, and BS 7671 Regulations 526.1 and 526.3 requirements."
      datePublished="2024-06-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cable Jointing"
      badgeIcon={Wrench}
      heroTitle={
        <>
          Cable Jointing Guide{' '}
          <span className="text-yellow-400">— LV and MV Jointing for Electricians</span>
        </>
      }
      heroSubtitle="Heat shrink vs cold shrink joints, Scotchlok connectors, cable stripping, insulation testing after jointing, and BS 7671 requirements for cable joints and connections."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Cable Jointing — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Certificate cable repair and jointing work instantly"
      ctaSubheading="Generate compliant Minor Works Certificates and EICs on-site with Elec-Mate."
    />
  );
}
