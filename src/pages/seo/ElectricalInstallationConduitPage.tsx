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
  { label: 'Electrical Installation Conduit', href: '/electrical-installation-conduit' },
];

const tocItems = [
  { id: 'steel-vs-plastic', label: 'Steel vs Plastic Conduit' },
  { id: 'trunking-fill', label: 'Trunking Fill Calculations' },
  { id: 'bending-cutting', label: 'Bending and Cutting Techniques' },
  { id: 'earthing-steel', label: 'Earthing of Steel Conduit' },
  { id: 'ip-ratings', label: 'IP Ratings and Environmental Protection' },
  { id: 'fire-stopping', label: 'Fire Stopping Requirements' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Conduit is selected by material (steel or PVC), type (rigid or flexible), and installation environment. BS EN 61386 governs the performance classification of conduit systems using a four-digit code covering mechanical, thermal, electromagnetic and electrical properties.',
  'Fill calculations for conduit and trunking must comply with BS 7671:2018+A3:2024 Appendix 5 and the associated cable factor tables. Overfilling conduit creates heat build-up and makes future cable changes impractical.',
  'Steel conduit used as a circuit protective conductor (CPC) must be continuous throughout, with screwed fittings only — no push-fit joints are permissible. Cross-sectional area must be verified against BS 7671 Table 54.7.',
  'Outdoor and underground conduit installations require appropriate IP-rated fittings and boxes. Buried conduit must meet BS 7671 Regulation 522.8.10 regarding depth and mechanical protection.',
  'Fire stopping around conduit penetrations through fire-resisting structures is a legal requirement under Building Regulations Approved Document B and must be carried out with intumescent materials rated to match the element being penetrated.',
];

const faqs = [
  {
    question: 'What is the difference between BS EN 61386 conduit classification codes?',
    answer:
      'BS EN 61386 uses a four-digit classification system. The first digit (1–5) indicates mechanical compression resistance: 1 = very light, 2 = light, 3 = medium, 4 = heavy, 5 = very heavy. The second digit covers the impact resistance (1–5 similarly graded). The third digit covers resistance to heat and cold, and the fourth covers electrical properties including continuity. A standard heavy-duty steel conduit might be classified 4445, indicating very heavy compression, very high impact resistance, wide operating temperature range, and continuous protective conductor capability. When specifying conduit for a project, the classification must match the environmental and mechanical demands of the installation.',
  },
  {
    question: 'How do I calculate how many cables I can fit in a conduit?',
    answer:
      'BS 7671 Appendix 5 provides cable factor tables for conduit and trunking fill. Each cable size has a factor value, and each conduit size has a maximum total factor. For example, a 20mm conduit has a factor of 460 for straight runs but only 294 for runs with one bend. A 2.5mm\u00b2 single core PVC cable has a factor of around 30 to 35 depending on the conductor type. Divide the conduit factor by the cable factor to find the maximum number of cables. Always allow spare capacity — aim for no more than 45% of conduit space to be occupied, leaving room for future additions and heat dissipation.',
  },
  {
    question: 'Can I use PVC conduit outdoors?',
    answer:
      'PVC (polyvinyl chloride) conduit can be used outdoors provided it is correctly rated for UV exposure, temperature variation, and mechanical impact. Standard PVC conduit is generally not suitable for direct burial without protection. For outdoor above-ground runs, use conduit rated to at least IP44 and consider UV-stabilised grades for long-term exposure. For underground runs, use heavy-duty orange ducting conforming to BS EN 61386-24 for buried conduit, installed at a minimum depth of 600mm under garden areas and 750mm under roads or driveways per BS 7671 Regulation 522.8.10.',
  },
  {
    question: 'Does steel conduit need to be earthed?',
    answer:
      'Yes. When steel conduit is used as a circuit protective conductor (CPC), it must provide a continuous metallic path throughout the entire run. All joints must be screwed (not push-fit), all boxes must be metal, and continuity must be verified by testing. The cross-sectional area of steel conduit as a CPC is assessed against BS 7671 Table 54.7 — a 20mm conduit provides approximately 35mm\u00b2 effective CPC cross-section for steel. Where continuity cannot be guaranteed (e.g. flexible conduit sections), a separate CPC must be run inside. Even where a separate CPC is provided, exposed metalwork should still be bonded.',
  },
  {
    question: 'How do I bend conduit without collapsing it?',
    answer:
      'For steel conduit, a proper pipe bending machine (hickey bender for 20mm and 25mm, or a hydraulic bender for larger sizes) is essential. Fill the conduit with dry sand and cap both ends before bending by hand if no bender is available — this prevents the pipe from collapsing. The minimum bending radius for steel conduit is typically six times the outside diameter. For PVC conduit, use a spring bender inserted inside the conduit to support the walls, or gently heat the conduit with a hot air gun to soften it before bending. Never use a naked flame. Allow PVC to cool in the bent position before removing the spring.',
  },
  {
    question: 'What fire stopping is required where conduit passes through walls?',
    answer:
      'Where conduit penetrates a fire-resisting wall, floor, or ceiling, the penetration must be fire-stopped to maintain the fire resistance of the element. This is required under Building Regulations Approved Document B (England) and the equivalent Scottish and Welsh regulations. Suitable methods include intumescent putty pads, intumescent collars (for PVC conduit), or mineral wool with intumescent mastic. The fire stopping system must be rated to match the fire resistance of the element — typically 30, 60, or 90 minutes. Steel conduit is less problematic than PVC as it does not melt, but any gaps around the conduit must still be filled. Product data sheets should be retained as evidence for building control.',
  },
  {
    question: 'What trunking fill percentage is recommended under BS 7671?',
    answer:
      'BS 7671 Appendix 5 specifies cable factors for trunking fill. The space factor — the ratio of the sum of the effective cross-sectional areas of all cables to the internal cross-sectional area of the trunking — should not exceed 45% for new installations. This 45% limit allows adequate space for heat dissipation, for cables to lie without damage, and for future additions. Where multi-core cables of different sizes are mixed, calculate the total cable factor using the individual cable factors from the appendix tables and compare against the trunking factor for the selected size. Mini trunking (e.g. 16\u00d716mm, 25\u00d716mm) has published factors in manufacturers\u2019 data and Appendix 5.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/cable-jointing-guide',
    title: 'Cable Jointing Guide',
    description:
      'MV and LV cable jointing techniques, heat shrink vs cold shrink, and BS 7671 requirements.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'C1, C2, C3 and FI codes — what they mean and what remedial action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/external-lighting-installation',
    title: 'External Lighting Installation',
    description:
      'IP ratings, cable burial depth, PIR wiring and BS 7671 outdoor installation requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Electrical inspection obligations for landlords in England, Scotland and Wales.',
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
    id: 'steel-vs-plastic',
    heading: 'Steel vs Plastic Conduit — Choosing the Right System',
    content: (
      <>
        <p>
          Conduit is one of the most widely used cable management systems in UK electrical
          installations, providing mechanical protection, a tidy finish, and — in the case of steel
          conduit — a circuit protective conductor path. The choice between steel and PVC conduit
          depends on the environment, mechanical demands, and whether the conduit is to serve as the
          CPC.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-4">Steel Conduit</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Material:</strong> Hot-dip galvanised or stove-enamelled mild steel.
                Standard sizes: 16mm, 20mm, 25mm, 32mm, 38mm, 50mm outside diameter. Conforms to BS
                EN 61386-21 (rigid steel conduit).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Advantages:</strong> Superior mechanical protection, fire resistance, can
                serve as CPC, EMC shielding for sensitive circuits, suitable for hazardous areas
                (with appropriate fittings), long service life.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Disadvantages:</strong> Heavier, more time-consuming to install, requires
                screwed fittings, susceptible to corrosion in wet environments unless stainless
                steel or galvanised grade is specified.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical applications:</strong> Industrial premises, plant rooms, exposed
                runs in commercial buildings, areas subject to mechanical impact.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-4">PVC (Rigid Plastic) Conduit</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Material:</strong> Unplasticised PVC (UPVC). Standard sizes: 16mm, 20mm,
                25mm, 32mm outside diameter. Conforms to BS EN 61386-22 (rigid non-metallic
                conduit).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Advantages:</strong> Lightweight, corrosion-resistant, faster to install,
                lower material cost, push-fit or solvent-welded fittings available, no metallic
                continuity issues.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Disadvantages:</strong> Cannot serve as CPC (separate CPC required), less
                impact-resistant than steel, becomes brittle at low temperatures, melts in fire,
                requires separate bonding to exposed metalwork.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical applications:</strong> Domestic surface wiring, office
                installations, concealed runs in dry environments, underground ducts (heavy-duty
                grade).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Performance classification under <strong>BS EN 61386</strong> uses a four-digit code. For
          most commercial and industrial applications, specify conduit classified to at least medium
          mechanical protection (third digit 3 or above). Always check the manufacturer data sheet
          against the installation environment requirements.
        </p>
      </>
    ),
  },
  {
    id: 'trunking-fill',
    heading: 'Trunking Fill Calculations (BS 7671 Appendix 5)',
    content: (
      <>
        <p>
          Overloading conduit or trunking with too many cables is one of the most common
          installation defects identified on EICRs. The fill limits in BS 7671 Appendix 5 exist to
          ensure cables can dissipate heat safely and can be withdrawn and replaced without damage.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">How to Calculate Conduit Fill</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1:</strong> Identify the cable type and conductor size for each cable
                to be installed. Look up the cable factor from BS 7671 Appendix 5 Table 5A
                (single-core PVC), Table 5B (multi-core PVC), or equivalent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2:</strong> Add up the cable factors for all cables to be installed in
                the conduit. This gives the total cable factor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3:</strong> Compare the total cable factor against the conduit factor
                from Table 5C. Use the straight run column for runs without bends, or the bend
                column if one or more bends are present. Select the conduit size whose factor
                exceeds the total cable factor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Example:</strong> Six 2.5mm\u00b2 single-core PVC cables (factor 30 each) in
                a straight run = total factor 180. A 20mm conduit has a straight-run factor of 460.
                A 16mm conduit has a factor of 290. Either would accommodate the cables, but 20mm is
                preferred to allow future capacity.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Derating for grouping:</strong> Where cables are grouped together, the
                current-carrying capacity of each cable must be derated using BS 7671 Table 4C1 (for
                cables in conduit) or Table 4B1 (for trunking). This is separate from the fill
                calculation — both must be applied.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Trunking space factor:</strong> For cable trunking, BS 7671 Appendix 5
                specifies that the ratio of the sum of cable cross-sectional areas to the internal
                trunking cross-sectional area (the space factor) should not exceed 45%. This applies
                to all new installations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always document your fill calculations as part of the installation records. If completing
          an{' '}
          <SEOInternalLink
            href="/tools/eic-certificate"
            label="Electrical Installation Certificate"
          />
          , note the conduit sizes and cable quantities in the circuit schedule.
        </p>
      </>
    ),
  },
  {
    id: 'bending-cutting',
    heading: 'Bending and Cutting Techniques',
    content: (
      <>
        <p>
          Neat, correctly made bends are a mark of professional conduit installation. Poorly formed
          bends reduce the conduit internal cross-section, making cable pulling difficult and
          risking cable damage. The following techniques apply to both steel and PVC conduit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Steel Conduit Bending</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Use a purpose-made conduit bender (hickey bender) for 20mm and 25mm. For 32mm and
                above, a hydraulic bender is recommended. The minimum bending radius is 2.5 times
                the outside diameter for metal conduit per BS EN 61386.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Mark set distances accurately with a chinagraph pencil or felt tip. For a
                right-angle bend, measure from the end of the conduit to the centre of the bend,
                subtract the take-up (typically 100mm for 20mm conduit), and mark the bending point.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Cut steel conduit with a pipe slice or junior hacksaw. Deburr all cut ends with a
                conduit reamer before drawing cables — sharp edges will damage cable insulation.
                Bush all conduit entries to boxes with PVC or rubber bushes.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">PVC Conduit Bending</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Insert a correctly sized conduit spring inside the conduit before bending. For cold
                bending, lever the conduit gently over your knee — do not rush or the conduit will
                kink. Remove the spring by attaching a length of cord before insertion and pulling
                it free after bending.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                For warm bending, apply a hot air gun evenly along the bend area (approximately
                100mm length for 20mm conduit). Rotate the conduit to heat evenly. When pliable,
                bend over a former and hold until cool. Never use a naked flame.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Cut PVC conduit with a junior hacksaw or pipe cutter. Deburr with a file or
                deburring tool. Use solvent cement or push-fit couplers for jointing. Ensure
                push-fit joints are fully engaged — a partial joint will leak in wet environments
                and is mechanically weak.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'earthing-steel',
    heading: 'Earthing of Steel Conduit',
    content: (
      <>
        <p>
          Steel conduit can be used as the circuit protective conductor (CPC) for circuits it
          contains, provided specific requirements under BS 7671:2018+A3:2024 Regulation 543 are
          met. This is a legitimate and widely used practice in industrial and commercial
          installations, but requires careful attention to jointing and continuity.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Screwed fittings only:</strong> Every joint in a conduit system used as a
                CPC must be made with screwed couplers and screwed-entry boxes. Push-fit or
                clip-together fittings do not provide reliable electrical continuity and must not be
                used where the conduit is the CPC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flexible conduit sections:</strong> Flexible conduit (also known as Anaconda
                or SWA flexible) does not provide reliable CPC continuity. A separate insulated CPC
                must be run inside flexible sections and connected at both ends.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuity testing:</strong> After installation, verify end-to-end
                continuity of the conduit system as a CPC. The resistance measured should be
                consistent with the cross-sectional area of the conduit and the length of run. Test
                at each circuit termination point.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cross-sectional area check:</strong> Verify that the steel conduit provides
                sufficient CPC cross-sectional area per BS 7671 Table 54.7 for the phase conductor
                size. A 20mm steel conduit provides approximately 35mm\u00b2 equivalent CPC
                cross-section.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Where conduit runs are long or the fault current could be high, consider installing a
          separate insulated CPC inside the conduit in addition to relying on the steel for
          continuity. Record the CPC type used on the circuit schedule of the{' '}
          <SEOInternalLink
            href="/tools/eic-certificate"
            label="Electrical Installation Certificate"
          />
          .
        </p>
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings and Environmental Protection',
    content: (
      <>
        <p>
          Ingress Protection (IP) ratings define the degree of protection provided by conduit
          fittings and boxes against solid particles and liquids. The rating is defined in BS EN
          60529 and consists of two digits — the first for solid particle protection (0–6), the
          second for liquid ingress protection (0–9).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP2X:</strong> Protection against fingers and solid objects over 12mm.
                Minimum requirement for accessible indoor wiring accessories.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP44:</strong> Dust protection (solid objects over 1mm) and splash
                protection from any direction. Minimum for outdoor above-ground conduit fittings and
                boxes in exposed locations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP65:</strong> Complete dust exclusion and protection against water jets
                from any direction. Required for conduit boxes in car washes, external walls exposed
                to direct rain, and food production areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP67/IP68:</strong> Complete dust exclusion and temporary/permanent
                submersion protection. Required for underground junction boxes and conduit systems
                installed below ground level.
              </span>
            </li>
          </ul>
        </div>
        <p>
          BS 7671 Regulation 522.3 requires that the installation method used provides adequate
          protection for the environment. Select conduit, fittings and boxes with IP ratings
          appropriate to the worst conditions they will encounter during the lifetime of the
          installation, not just during commissioning.
        </p>
      </>
    ),
  },
  {
    id: 'fire-stopping',
    heading: 'Fire Stopping Requirements',
    content: (
      <>
        <p>
          Every penetration through a fire-resisting wall, floor, or ceiling must be fire-stopped to
          maintain the element's fire resistance rating. This is a legal requirement under Building
          Regulations Approved Document B (England), Section 7 of the Technical Handbooks
          (Scotland), and Part B of the Building Regulations (Wales and Northern Ireland).
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Steel conduit penetrations:</strong> Steel conduit does not melt or combust,
                so the main concern is any annular gap around the conduit. Pack with mineral wool
                and seal with intumescent mastic rated to match the wall's fire resistance (30, 60,
                or 90 minutes). Some manufacturers provide tested steel conduit sealing systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PVC conduit penetrations:</strong> PVC melts in fire, leaving an open hole.
                Intumescent collars must be fitted around PVC conduit at every penetration through a
                fire-resisting element. The collar expands on heating, sealing the gap left by the
                melting conduit. Use products with third-party test evidence to the required fire
                resistance period.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record keeping:</strong> Retain product data sheets, installation
                instructions, and photographs as evidence of compliance. Building control may
                request this evidence during inspections, and it is invaluable if a subsequent EICR
                or fire risk assessment raises questions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians — Documenting Conduit Installations',
    content: (
      <>
        <p>
          Conduit installations require an Electrical Installation Certificate (EIC) for new
          circuits and an EICR observation where defects are identified. Elec-Mate provides
          mobile-optimised certificate tools to make paperwork fast and compliant on-site.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge
                  href="/tools/eic-certificate"
                  label="Electrical Installation Certificate"
                />{' '}
                — record conduit type, cable sizes, circuit protective conductor details, and test
                results in a fully compliant EIC with instant PDF export.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/tools/eicr-certificate" label="EICR Certificate" /> — document
                overfilled conduit, missing earth continuity, or absent fire stopping as C2 or C3
                observations with full supporting evidence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/tools/minor-works" label="Minor Works Certificate" /> — issue
                minor electrical installation works certificates for small conduit extensions or
                additional circuit outlets.
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

export default function ElectricalInstallationConduitPage() {
  return (
    <GuideTemplate
      title="Electrical Installation Conduit Guide — Steel, PVC, Fill Calculations & Earthing"
      description="Complete UK guide to electrical conduit installation: steel vs PVC conduit, BS EN 61386 classification, trunking fill calculations per BS 7671 Appendix 5, earthing of steel conduit, IP ratings, and fire stopping requirements."
      datePublished="2024-06-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Wrench}
      heroTitle={
        <>
          Electrical Installation Conduit{' '}
          <span className="text-yellow-400">— Complete UK Guide</span>
        </>
      }
      heroSubtitle="Steel vs PVC conduit, BS EN 61386 classification, trunking fill calculations per BS 7671 Appendix 5, earthing requirements, IP ratings, and fire stopping — everything electricians need for compliant conduit installations."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Electrical Conduit Installation — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Document conduit installations on your phone"
      ctaSubheading="Generate compliant EICs and EICRs on-site with Elec-Mate — fast, accurate, PDF-ready."
    />
  );
}
