import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Tractor,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Droplets,
  FileCheck2,
  Calculator,
  GraduationCap,
  ClipboardCheck,
  Brain,
  Search,
  Thermometer,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Agricultural Installations', href: '/guides/agricultural-electrical-installations' },
];

const tocItems = [
  { id: 'section-705-overview', label: 'BS 7671 Section 705 Overview' },
  { id: 'earthing-agricultural', label: 'Earthing in Agricultural Buildings' },
  { id: 'ip-ratings-environment', label: 'IP Ratings and Environmental Protection' },
  { id: 'livestock-protection', label: 'Protection Against Livestock Contact' },
  { id: 'external-influences', label: 'External Influences and Corrosion' },
  { id: 'testing-agricultural', label: 'Testing Agricultural Installations' },
  { id: 'common-defects', label: 'Common Defects in Farm Installations' },
  { id: 'for-electricians', label: 'For Electricians on Agricultural Sites' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671 Section 705 sets out the specific requirements for agricultural and horticultural premises, including farms, glasshouses, stables, and similar locations.',
  'Earthing in agricultural buildings requires supplementary equipotential bonding connecting all extraneous-conductive-parts — metal stalls, water pipes, feeding troughs, and structural steelwork — to the main earthing terminal.',
  'All electrical equipment in agricultural locations must have a minimum IP rating of IP44 (or higher where water jets, dust, or corrosive atmospheres are present), and circuits must be protected by 30 mA RCDs.',
  'Livestock are far more sensitive to electric shock than humans — a touch voltage as low as 25 V can cause distress or injury to cattle, making equipotential bonding critical.',
  'Elec-Mate lets electricians complete EICR and EIC certificates for agricultural installations on site, with AI-assisted observation coding and instant PDF delivery to the farmer.',
];

const faqs = [
  {
    question: 'What does BS 7671 Section 705 cover?',
    answer:
      'Section 705 of BS 7671:2018+A2:2022 applies to all fixed electrical installations in agricultural and horticultural premises. This includes farmhouses, barns, livestock buildings, milking parlours, grain stores, glasshouses, stables, equestrian centres, and any other buildings or locations used for agricultural or horticultural purposes. The section sets out additional requirements beyond the general rules of BS 7671, reflecting the specific hazards found in agricultural environments — including the presence of livestock, high levels of moisture and dust, corrosive atmospheres (ammonia from animal waste, fertiliser chemicals), mechanical damage from farm machinery, and the presence of combustible materials (hay, straw, grain). Section 705 does not apply to dwellings within agricultural premises — a farmhouse is treated as a normal domestic installation. However, outbuildings, workshops, and any building used for agricultural purposes fall within the scope of Section 705.',
  },
  {
    question: 'Why is supplementary bonding so critical in agricultural buildings?',
    answer:
      'Supplementary equipotential bonding is critical in agricultural buildings because livestock — particularly cattle and horses — are far more sensitive to electric shock than humans. The physiological threshold for perception of electric current in cattle is approximately 2 to 4 mA, compared with around 1 mA for humans. However, the critical difference is that cattle cannot release their grip on an energised conductor, and even small touch voltages can cause behavioural disturbance (reduced milk yield, refusal to enter the milking parlour, kicking) that has a direct economic impact on the farmer. BS 7671 Regulation 705.415.2 requires supplementary equipotential bonding connecting all extraneous-conductive-parts accessible to livestock — including metal stalls, partitions, water pipes, feeding troughs, milking equipment, and structural steelwork — to the protective conductor. The bonding conductor must be at least 4 mm² copper (or equivalent). This bonding ensures that the touch voltage between any two simultaneously accessible parts is minimised, even under fault conditions.',
  },
  {
    question: 'What IP ratings are required for electrical equipment on farms?',
    answer:
      'The minimum IP rating for electrical equipment in agricultural locations depends on the specific environmental conditions. As a general rule, BS 7671 Regulation 705.512.2 requires a minimum of IP44 for all electrical equipment in agricultural premises. This provides protection against solid objects greater than 1 mm (such as wire and small tools) and protection against splashing water from all directions. In locations where water jets are used for cleaning (for example, milking parlours, dairy wash-down areas, and livestock buildings that are hosed out regularly), the minimum IP rating increases to IP55 or IP56 — protecting against low-pressure water jets or powerful water jets respectively. In dusty environments such as grain stores, feed mills, and hay barns, a minimum of IP5X or IP6X may be required for the ingress protection against dust. Equipment installed outdoors must be suitable for the specific weather conditions and must withstand UV degradation, temperature extremes, and wind-driven rain. In practice, electricians working on farms should always over-specify the IP rating rather than risk equipment failure in harsh conditions.',
  },
  {
    question: 'Do all circuits in agricultural buildings need RCD protection?',
    answer:
      'Yes. BS 7671 Regulation 705.411.1 requires that all circuits in agricultural and horticultural premises are protected by a residual current device (RCD) with a rated residual operating current not exceeding 30 mA. This applies to all circuits — lighting, power, socket-outlets, and fixed equipment. There are no exemptions for circuits that would normally be exempt from RCD protection in domestic or commercial installations. The 30 mA RCD requirement reflects the increased risk of electric shock in agricultural environments due to the presence of moisture, conductive floors (concrete, earth), and livestock. For socket-outlet circuits rated above 32 A (for example, three-phase supplies to large farm equipment), a 30 mA RCD is still required unless the equipment is under the supervision of a skilled or instructed person and an appropriate risk assessment has been carried out. In addition to the 30 mA RCD protection, fire protection may require additional consideration — particularly in locations where combustible materials (hay, straw, wood shavings) are stored.',
  },
  {
    question: 'How often should agricultural installations be inspected?',
    answer:
      'The recommended maximum interval between periodic inspections for agricultural and horticultural installations is 3 years. This is shorter than the 5-year interval recommended for domestic installations, reflecting the harsher environmental conditions and higher risk of damage in agricultural settings. The 3-year interval is a recommendation in IET Guidance Note 3 (Inspection and Testing) and Table 3A of BS 7671. Some insurance providers and farm assurance schemes may require more frequent inspections — particularly for dairy farms, poultry units, and pig units where the electrical installation is critical to animal welfare and production. The inspection should cover all fixed electrical installations in the agricultural premises, including outbuildings, external supplies, and any temporary installations (for example, seasonal lighting in livestock buildings). The inspector should pay particular attention to the condition of bonding conductors, the integrity of IP-rated enclosures, and any evidence of corrosion or mechanical damage.',
  },
  {
    question: 'Can I use standard domestic consumer units in a farm building?',
    answer:
      "A standard domestic consumer unit is unlikely to be suitable for an agricultural building. Agricultural installations typically require equipment with a higher IP rating (minimum IP44, often IP55 or IP65 for wash-down areas), protection against corrosive atmospheres (ammonia, chemicals), mechanical robustness to withstand impacts from livestock and machinery, and suitability for the wider temperature range found in unheated agricultural buildings. In practice, most agricultural distribution boards are industrial-grade enclosures (GRP or stainless steel) with IP65 or IP66 rating, fitted with DIN-rail mounted MCBs, RCBOs, and isolators. The enclosure must be mounted at a height that prevents access by livestock but is still accessible for operation and testing. The location should also be protected from direct contact with water, feed, and animal waste. Consulting the equipment manufacturer's installation instructions and selecting products specifically rated for agricultural environments is essential.",
  },
  {
    question: 'What are the cable requirements for agricultural installations?',
    answer:
      'Cables in agricultural installations must be selected and installed to withstand the specific environmental conditions. BS 7671 Regulation 705.522.7 requires that cables are installed at a height of at least 2.5 m above floor level in areas accessible to livestock, or be mechanically protected (for example, within steel conduit or trunking) to prevent damage from animals chewing, rubbing, or kicking. Steel wire armoured (SWA) cable is the standard choice for agricultural installations because it provides mechanical protection, can be installed on the surface or buried underground, and is resistant to rodent damage. PVC-insulated cables without mechanical protection should not be used in livestock areas. Underground cables between farm buildings must be installed at a minimum depth of 600 mm (or 1000 mm in areas subject to vehicular traffic) and protected by cable covers or marker tape. All cable entries to enclosures must maintain the IP rating of the enclosure using appropriate cable glands or entry fittings.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone. AI board scanner, voice test entry, and professional PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/earthing-arrangements-explained',
    title: 'Earthing Arrangements Explained',
    description:
      'In-depth guide to TN-S, TN-C-S, and TT earthing systems with practical guidance for each type.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete overview of BS 7671:2018+A2:2022 with regulation references for every section.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Calculate correct cable sizes accounting for voltage drop, grouping, thermal insulation, and ambient temperature.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/guides/rcd-testing-guide',
    title: 'RCD Testing Guide',
    description:
      'Step-by-step guide to RCD testing including trip times, test currents, and recording results.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with 50+ structured training modules on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'section-705-overview',
    heading: 'BS 7671 Section 705: What It Covers and Why It Matters',
    content: (
      <>
        <p>
          Section 705 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A2:2022
          </SEOInternalLink>{' '}
          is one of the "Part 7" special installations sections, and it applies specifically to
          agricultural and horticultural premises. This includes farms, dairy units, poultry houses,
          pig units, equestrian centres, stables, glasshouses, garden centres, grain stores, and any
          building or outdoor area used for agricultural or horticultural purposes.
        </p>
        <p>
          The rationale for a dedicated section is straightforward: agricultural environments
          present hazards not typically found in domestic or commercial settings. Livestock are
          present and are more sensitive to electric shock than humans. Moisture levels are high —
          from animal drinking systems, wash-down operations, condensation, and exposure to weather.
          Dust from grain, feed, and bedding materials creates both an ingress protection challenge
          and a fire risk. Corrosive atmospheres from ammonia (animal waste), fertilisers, and
          cleaning chemicals attack equipment and wiring. Mechanical damage from large farm
          machinery, heavy livestock, and general agricultural operations is a constant risk.
        </p>
        <p>
          Section 705 supplements the general rules of BS 7671 with additional requirements for
          protection against electric shock, selection and erection of equipment, earthing and
          bonding, and periodic inspection intervals. It does not replace the general rules — it
          adds to them. An electrician working on an agricultural installation must apply both the
          general rules and the specific requirements of Section 705.
        </p>
      </>
    ),
  },
  {
    id: 'earthing-agricultural',
    heading: 'Earthing and Bonding in Agricultural Buildings',
    content: (
      <>
        <p>
          Earthing and bonding in agricultural buildings is one of the most critical aspects of
          Section 705. The requirements go beyond what is needed in domestic or commercial
          installations because of the presence of livestock and the nature of the building
          construction.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supplementary equipotential bonding (Regulation 705.415.2).</strong> All
                extraneous-conductive-parts simultaneously accessible to livestock must be connected
                by supplementary bonding conductors. This includes metal stalls, partitions, feeding
                troughs, water pipes, milking equipment, gate frames, structural steelwork, and any
                other metal parts that livestock can touch.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bonding conductor size.</strong> The supplementary bonding conductor must be
                at least 4 mm² copper (or equivalent cross-sectional area in another material). This
                is larger than the 2.5 mm² minimum specified in the general rules because of the
                increased risk of mechanical damage in agricultural environments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing system considerations.</strong> Many agricultural premises are on
                TT earthing systems (earth rod) because they are in rural areas without a PME
                (TN-C-S) supply, or because the DNO restricts PME earthing for agricultural
                buildings. On a TT system, the earth rod resistance must be low enough to ensure the
                30 mA RCD operates within the required disconnection time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PME restrictions.</strong> The DNO may restrict or prohibit the use of the
                PME (TN-C-S) earth terminal in agricultural buildings where livestock are present,
                because a fault on the PEN conductor could introduce a dangerous voltage onto the
                bonded metalwork. In such cases, a TT earthing arrangement must be used for the
                agricultural building, even if the farmhouse uses the PME earth.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The practical challenge for electricians is ensuring that every piece of accessible
          metalwork is bonded. In a large livestock building, this can involve dozens of bonding
          connections. Each connection must be secure, accessible for inspection, and protected
          against corrosion. Brass or stainless steel bonding clamps are recommended over standard
          copper clamps in corrosive environments.
        </p>
      </>
    ),
  },
  {
    id: 'ip-ratings-environment',
    heading: 'IP Ratings and Environmental Protection',
    content: (
      <>
        <p>
          The environmental conditions in agricultural buildings are far more demanding than in
          domestic or office settings. Equipment selection must account for moisture, dust,
          corrosive gases, temperature extremes, and mechanical impact.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP44 minimum (Regulation 705.512.2).</strong> All electrical equipment in
                agricultural premises must have a minimum IP rating of IP44, providing protection
                against objects larger than 1 mm and splashing water from all directions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP55/IP56 for wash-down areas.</strong> In milking parlours, dairy rooms,
                and any area where water jets are used for cleaning, a minimum of IP55 (low-pressure
                jets) or IP56 (powerful jets) is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP5X/IP6X for dusty environments.</strong> Grain stores, feed mills, and hay
                barns generate significant quantities of fine dust. Equipment must be dust-
                protected (IP5X) or dust-tight (IP6X) to prevent ingress that could cause tracking,
                overheating, or fire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Temperature and UV.</strong> Equipment installed in unheated buildings or
                outdoors must be rated for the expected temperature range (typically -25°C to +40°C
                in the UK) and must be UV-resistant if exposed to direct sunlight.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Standard domestic accessories — white plastic sockets, plate switches, and surface-mounted
          consumer units — are not suitable for agricultural buildings. The correct choice is
          industrial-grade, IP-rated equipment: GRP or stainless steel enclosures, interlocked
          socket-outlets with IP-rated plugs, weatherproof switches, and sealed cable glands at
          every entry point.
        </p>
      </>
    ),
  },
  {
    id: 'livestock-protection',
    heading: 'Protecting Livestock from Electrical Hazards',
    content: (
      <>
        <p>
          Livestock — cattle, horses, pigs, and poultry — are significantly more sensitive to
          electric shock than humans. This is one of the primary reasons Section 705 exists. The
          physiological effects on livestock include:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Low perception threshold.</strong> Cattle can perceive electric current at
                approximately 2 to 4 mA. A touch voltage of just 8 V can cause a perceptible shock
                to cattle standing on a wet concrete floor, compared with a threshold of around 50 V
                for humans under similar conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Behavioural effects.</strong> Even sub-lethal stray voltages can cause cows
                to refuse to enter the milking parlour, reduce milk yield, kick during milking, and
                show signs of stress. These effects have a direct economic impact on the farmer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inability to release.</strong> Like humans, animals cannot release their
                grip on an energised conductor at higher currents. A cow in contact with a live
                metal part (for example, a faulty water trough or feeding rail) will remain in
                contact until the circuit is de-energised.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contact with wet concrete.</strong> Livestock in agricultural buildings
                typically stand on wet concrete — a conductive surface that significantly reduces
                body impedance and increases the severity of any electric shock.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The combined effect of these factors means that the protective measures in agricultural
          buildings must be more stringent than in domestic or commercial installations. The
          supplementary bonding requirements, 30 mA RCD protection on all circuits, and minimum IP
          ratings are all designed to minimise the risk to livestock. Electricians inspecting
          agricultural installations should check for stray voltages between bonded metalwork and
          the floor — even a few volts can indicate a bonding deficiency or neutral-earth fault.
        </p>
      </>
    ),
  },
  {
    id: 'external-influences',
    heading: 'External Influences: Corrosion, Moisture, and Mechanical Damage',
    content: (
      <>
        <p>
          Agricultural environments are among the most challenging for electrical installations. The
          external influences described in BS 7671 Appendix C are particularly relevant and must be
          assessed at the design stage:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Corrosive Atmospheres</h3>
            <p className="text-white text-sm leading-relaxed">
              Ammonia from animal waste, hydrogen sulphide from slurry stores, and chemical vapours
              from fertilisers and pesticides attack standard copper conductors, brass terminals,
              and steel enclosures. In corrosive environments, use stainless steel enclosures, tin-
              plated or nickel-plated terminals, and cables with LSZH (Low Smoke Zero Halogen)
              sheaths. Standard PVC sheathing degrades in ammonia-rich atmospheres. Silicone-sealed
              cable glands provide better long-term protection than standard nylon glands.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Mechanical Damage</h3>
            <p className="text-white text-sm leading-relaxed">
              Farm machinery, livestock, and day-to-day agricultural operations pose a constant risk
              of mechanical damage to cables and equipment. Cables must be installed at a minimum
              height of 2.5 m above floor level in areas accessible to livestock, or be mechanically
              protected within steel conduit, galvanised trunking, or by using SWA (steel wire
              armoured) cable. Distribution boards and switches should be mounted at a height that
              is accessible to the user but protected from livestock contact. Impact- resistant
              enclosures (IK08 or higher) are recommended for areas where machinery operates.
            </p>
          </div>
        </div>
        <p>
          The key principle is this: what would last 25 years in a domestic environment may last
          only 5 years on a farm. Equipment selection must account for the accelerated wear and
          tear, and the electrician should specify equipment rated for the actual environmental
          conditions, not the generic minimum.
        </p>
      </>
    ),
  },
  {
    id: 'testing-agricultural',
    heading: 'Testing Agricultural Installations',
    content: (
      <>
        <p>
          Testing agricultural installations follows the same sequence as any installation under BS
          7671, but with additional attention to the specific requirements of Section 705 and the
          practical challenges of working in agricultural environments.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuity of supplementary bonding.</strong> Every supplementary bonding
                connection identified during the visual inspection must be tested for continuity.
                The resistance between any two simultaneously accessible extraneous-conductive-parts
                should be low enough to ensure the touch voltage remains within safe limits under
                fault conditions. Record each bonding connection individually on the schedule of
                test results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance.</strong> Insulation resistance testing may be
                affected by moisture in the environment. Test during dry conditions where possible.
                If readings are lower than expected, check for moisture ingress into enclosures,
                junction boxes, and cable terminations before recording the result.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrode resistance (TT systems).</strong> Most agricultural
                buildings use TT earthing with an earth rod. The earth electrode resistance must be
                tested and recorded. The resistance must be low enough to ensure the 30 mA RCD
                operates within the required disconnection time (0.2 s for final circuits and 1 s
                for distribution circuits).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD testing.</strong> All RCDs must be tested at the rated residual
                operating current (typically 30 mA) and at 5x the rated current (150 mA) to verify
                trip time. Record both the trip current and the trip time for each RCD.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The recommended inspection interval for agricultural installations is every 3 years —
          shorter than the 5-year domestic interval. This reflects the harsher conditions and higher
          rate of deterioration in agricultural environments.
        </p>
      </>
    ),
  },
  {
    id: 'common-defects',
    heading: 'Common Defects Found in Farm Electrical Installations',
    content: (
      <>
        <p>
          Agricultural installations are often neglected. Farmers focus on production and may not
          prioritise electrical maintenance until a problem occurs. Common defects found during
          periodic inspections include:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing or damaged supplementary bonding.</strong> Bonding conductors
                disconnected during building modifications, corroded bonding clamps, or bonding
                never installed in the first place. This is the most common and most dangerous
                defect in agricultural installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP-rated enclosures compromised.</strong> Cable entry knockouts left open,
                missing gland plates, cracked or broken enclosure lids, and door seals perished.
                Once the IP rating is compromised, moisture and dust ingress accelerate
                deterioration of internal components.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cables damaged by livestock or machinery.</strong> Cables accessible to
                livestock chewed or rubbed through, cables crushed by machinery, and temporary
                repairs (insulation tape) left permanently in place.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection.</strong> Older agricultural installations may pre-date
                the RCD requirements of Section 705. Socket-outlet circuits and lighting circuits
                without 30 mA RCD protection are a C2 (Potentially Dangerous) defect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Corroded wiring and terminations.</strong> Ammonia and moisture cause copper
                conductors to oxidise and corrode at terminations, increasing resistance and
                creating potential hot spots and fire risks.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Many of these defects are C1 (Danger Present) or C2 (Potentially Dangerous) under the{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            EICR observation code system
          </SEOInternalLink>
          . Electricians should document each defect carefully with photographs, accurate
          descriptions, and the correct classification code.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Agricultural Work with Elec-Mate',
    content: (
      <>
        <p>
          Agricultural electrical work requires specialist knowledge of Section 705, robust
          equipment selection, and thorough testing. The paperwork is the same as any other
          installation — EIC for new work, EICR for periodic inspections — but the content is more
          detailed because of the additional requirements for bonding, IP ratings, and environmental
          factors.
        </p>
        <p>Elec-Mate streamlines the certification process for agricultural installations:</p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Observation Code Assistant</h4>
                <p className="text-white text-sm leading-relaxed">
                  Describe the defect — "no supplementary bonding to metal feeding troughs in cattle
                  shed" — and the AI returns the correct observation code with the matching BS 7671
                  regulation reference (705.415.2). No looking up regulation numbers in the book
                  while standing in a barn.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Photo Documentation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Attach photographs of defects, bonding connections, distribution boards, and cable
                  routes directly to the certificate. Farm installations often need more
                  photographic evidence than domestic work — the photos are embedded in the PDF
                  export.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Built-In Calculators</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  and{' '}
                  <SEOInternalLink href="/tools/voltage-drop-calculator">
                    voltage drop calculator
                  </SEOInternalLink>{' '}
                  to verify designs for long cable runs between farm buildings. Account for ambient
                  temperature, grouping factors, and installation method in a single calculation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Agricultural work is specialist, well-paid, and repeat. Farms need inspections every 3
          years, and the remedial work generated by each inspection provides a steady revenue
          stream. The electrician who delivers a professional, well-documented certificate on site
          earns the farmer's trust and the repeat booking.
        </p>
        <SEOAppBridge
          title="Professional farm certificates on your phone"
          description="Join 430+ UK electricians creating EICR and EIC certificates with AI-assisted observation coding, photo documentation, and instant PDF delivery. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function AgriculturalInstallationsPage() {
  return (
    <GuideTemplate
      title="Agricultural Electrical Installations | BS 7671 Part 7"
      description="Complete guide to agricultural electrical installations under BS 7671 Section 705. Earthing and bonding for livestock buildings, IP ratings, RCD protection, supplementary bonding requirements, and periodic inspection intervals for farms."
      datePublished="2025-07-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Agricultural Guide"
      badgeIcon={Tractor}
      heroTitle={
        <>
          Agricultural Electrical Installations:{' '}
          <span className="text-yellow-400">BS 7671 Section 705 Explained</span>
        </>
      }
      heroSubtitle="Farms, livestock buildings, milking parlours, and glasshouses all fall under BS 7671 Section 705 — with stricter earthing, bonding, IP rating, and RCD requirements than domestic installations. This guide covers everything electricians need to know about agricultural electrical work."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Agricultural Electrical Installations"
      relatedPages={relatedPages}
      ctaHeading="Complete Agricultural EICRs on Your Phone"
      ctaSubheading="Join 430+ UK electricians creating professional certificates with AI observation coding, photo documentation, and instant PDF delivery. Built for specialist work including agricultural installations. 7-day free trial, cancel anytime."
    />
  );
}
