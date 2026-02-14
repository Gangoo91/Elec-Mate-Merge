import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Home,
  ShieldCheck,
  FileCheck2,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  Brain,
  Shield,
  Zap,
  Calculator,
  Search,
  Link2,
  Droplets,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Supplementary Bonding', href: '/guides/supplementary-bonding' },
];

const tocItems = [
  { id: 'what-is-supplementary-bonding', label: 'What Is Supplementary Bonding?' },
  { id: 'regulation-415-2', label: 'Regulation 415.2 Explained' },
  { id: 'when-required', label: 'When Is It Required?' },
  { id: 'when-omitted', label: 'When Can It Be Omitted?' },
  { id: 'bathrooms', label: 'Bathroom Bonding' },
  { id: 'conductor-sizes', label: '4 mm Conductor Requirements' },
  { id: 'installation-method', label: 'Installation Method' },
  { id: 'testing-bonding', label: 'Testing Supplementary Bonding' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Supplementary bonding connects exposed-conductive-parts and extraneous-conductive-parts within a specific location (such as a bathroom) to ensure they are at the same potential — reducing the risk of electric shock from simultaneous contact.',
  'Regulation 415.2 of BS 7671 sets out the requirement for supplementary equipotential bonding, which applies primarily to locations of increased shock risk such as bathrooms (Section 701).',
  'Supplementary bonding can be omitted in bathrooms if all circuits in the room have 30 mA RCD protection AND the main bonding is in place AND all extraneous-conductive-parts are connected to the protective equipotential bonding via the main bonding system.',
  'Where required, the supplementary bonding conductor must be at least 4 mm copper (or 2.5 mm if mechanically protected) for connections between extraneous-conductive-parts, and sized according to Regulation 544.2 for connections involving exposed-conductive-parts.',
  'Elec-Mate includes an AI regulations assistant that can confirm supplementary bonding requirements for any bathroom or special location scenario in seconds.',
];

const faqs = [
  {
    question: 'Is supplementary bonding still required in bathrooms?',
    answer:
      'It depends on the installation. Under BS 7671:2018 Regulation 701.415.2, supplementary bonding is not required in a bathroom if three conditions are all met: (1) all circuits serving the bathroom have 30 mA RCD protection, (2) all extraneous-conductive-parts in the bathroom are effectively connected to the protective equipotential bonding (main bonding) system, and (3) the main bonding complies with Regulation 411.3.1.2. If all three conditions are satisfied, the supplementary bonding can be omitted. If any condition is not met — for example, if the lighting circuit does not have RCD protection, or if a metallic water pipe in the bathroom is not connected to a bonded service — then supplementary bonding must be installed. In practice, most modern installations with RCBO boards or split-load consumer units with RCD protection on all circuits will satisfy condition (1). The key question is usually condition (2): are all the metallic pipes in the bathroom connected to a bonded service, or is there an unbonded metallic path that could introduce a potential? Careful assessment is needed on a case-by-case basis.',
  },
  {
    question: 'What size conductor is needed for supplementary bonding?',
    answer:
      'The conductor size for supplementary bonding depends on what is being connected. For connections between two extraneous-conductive-parts (for example, a water pipe to a gas pipe within a bathroom), the minimum is 4 mm copper if unprotected, or 2.5 mm copper if mechanically protected (in conduit or behind plasterboard). For connections between an exposed-conductive-part and an extraneous-conductive-part (for example, an earth terminal on a bathroom light fitting to a nearby water pipe), the conductor must be at least half the size of the CPC connected to the exposed-conductive-part, with a minimum of 2.5 mm copper (or 4 mm if not mechanically protected). For most domestic bathroom supplementary bonding, 4 mm green/yellow single-core cable is the standard choice. It is robust, easy to work with, and eliminates any ambiguity about compliance. Use the 4 mm cable throughout and you will not go wrong.',
  },
  {
    question: 'Do I need to bond a metal bath?',
    answer:
      'A metal bath is an exposed-conductive-part if it has an earth terminal or is connected to earthed metalwork. If the bath is connected to metallic water supply pipes that are themselves bonded through the main bonding system, the bath is effectively bonded through those pipes. In this case, separate supplementary bonding to the bath may not be needed (provided the omission conditions under Regulation 701.415.2 are met). However, if the bath is isolated from bonded services (for example, the water supply is entirely plastic, the waste is plastic, and there is no metallic connection to a bonded service), the bath could be at a different potential and supplementary bonding should be provided. The practical assessment is: can you trace a metallic path from the bath to the main bonding system? If yes, supplementary bonding can potentially be omitted. If no, bond it. Many electricians take the pragmatic approach of bonding metal baths regardless, as the cost is minimal and it eliminates any doubt.',
  },
  {
    question: 'Where do I connect supplementary bonding conductors in a bathroom?',
    answer:
      'Supplementary bonding conductors in a bathroom connect all extraneous-conductive-parts and exposed-conductive-parts within the room to each other. Typical connection points include: metallic water pipes (hot and cold) using bonding clamps, metallic waste pipes (if metal), metallic radiator pipes, the earth terminal of electric towel rails or bathroom heaters, metallic structural elements (steel bath supports, exposed steelwork), and the earth terminal of electrical accessories (light fittings, shaver sockets, extractor fans). The connections are made using BS 951 bonding clamps on pipes and standard earth terminals on electrical equipment. The bonding conductors can connect in a daisy-chain configuration (each part bonded to the next) or star configuration (each part connected back to a common bonding point, typically the earth terminal of the nearest electrical accessory). Both methods are acceptable under BS 7671, provided the conductor is continuous and correctly sized.',
  },
  {
    question: 'Can supplementary bonding be omitted in a kitchen?',
    answer:
      'Kitchens are not classified as a special location under BS 7671 (Section 701 applies to bathrooms and shower rooms, not kitchens). Therefore, the specific supplementary bonding requirements of Regulation 701.415.2 do not apply to kitchens. However, the general requirements for earthing and main bonding still apply throughout the installation. If a kitchen has metallic water and gas pipes, those pipes should be connected to the main bonding system (main protective bonding conductors from the MET). This is main bonding, not supplementary bonding. There is no general requirement to provide supplementary bonding between metallic parts within a kitchen under BS 7671:2018. However, if the risk assessment for a specific installation identifies a risk of simultaneous contact between earthed metalwork and an extraneous-conductive-part in the kitchen (for example, a metal sink connected to metal waste pipes that are in contact with the ground), supplementary bonding may be deemed appropriate as an additional protective measure.',
  },
  {
    question: 'What is the difference between main bonding and supplementary bonding?',
    answer:
      'Main bonding (or main protective bonding) connects extraneous-conductive-parts to the main earthing terminal at the origin of the installation. It creates the primary equipotential zone for the entire building. Main bonding uses 10 mm or 6 mm copper conductors and connects services at their point of entry into the building — water pipes near the stopcock, gas pipes near the meter, oil pipes near the tank connection. Supplementary bonding is additional bonding within a specific location (typically a bathroom) that connects exposed-conductive-parts and extraneous-conductive-parts within that room to each other. It creates a local equipotential zone within the room, reducing the touch voltage between metallic parts that a person might simultaneously contact while wet (which lowers body resistance and increases the risk of shock). Supplementary bonding uses 4 mm or 2.5 mm copper conductors and connects parts within the room — pipes, bath, radiator, light fitting earth terminals. Main bonding is always required. Supplementary bonding is only required in specific locations and can sometimes be omitted if certain conditions are met.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/protective-earthing-bonding',
    title: 'Protective Earthing and Bonding',
    description:
      'Main earthing terminal, main bonding conductors, and the complete BS 7671 earthing guide.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/bathroom-electrical-regulations',
    title: 'Bathroom Electrical Regulations',
    description:
      'Zones, IP ratings, RCD protection, and all the rules for electrical work in bathrooms.',
    icon: Droplets,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete overview of the IET Wiring Regulations with chapter-by-chapter coverage.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/tools/earth-loop-impedance-calculator',
    title: 'Earth Loop Impedance Calculator',
    description: 'Calculate Zs values and verify disconnection times comply with BS 7671 tables.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/how-to-fill-in-eicr',
    title: 'How to Fill In an EICR',
    description:
      'Step-by-step guide to completing every section of the EICR, including bonding inspections.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 covering continuity, bonding, and all dead and live testing procedures.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-supplementary-bonding',
    heading: 'What Is Supplementary Bonding?',
    content: (
      <>
        <p>
          Supplementary bonding (also called supplementary equipotential bonding) is the practice of
          connecting exposed-conductive-parts and extraneous-conductive-parts within a specific
          location to each other, creating a local equipotential zone. The purpose is to reduce the
          potential difference (voltage) between metallic parts that a person might simultaneously
          touch, particularly in locations where the risk of electric shock is increased.
        </p>
        <p>
          The most common location where supplementary bonding is discussed is the bathroom. In a
          bathroom, a person is often wet or standing on a wet floor — both of which significantly
          reduce body resistance and increase the severity of an electric shock. If a person
          simultaneously touches two metallic parts that are at different electrical potentials (for
          example, a metal tap connected to a water pipe and a metal towel rail connected to an
          earthed circuit), the potential difference between them could cause a dangerous current to
          flow through the body.
        </p>
        <p>
          Supplementary bonding eliminates this risk by ensuring that all metallic parts within the
          room are at the same potential. If everything is at the same voltage, there can be no
          current flow between them — regardless of what voltage that might be relative to true
          earth.
        </p>
        <p>
          This is different from{' '}
          <SEOInternalLink href="/guides/protective-earthing-bonding">
            main protective bonding
          </SEOInternalLink>
          , which connects services at the point of entry into the building. Supplementary bonding
          is additional, local bonding within a specific room. Under certain conditions in{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>,
          supplementary bonding in bathrooms can be omitted — but understanding when and why is
          essential.
        </p>
      </>
    ),
  },
  {
    id: 'regulation-415-2',
    heading: 'Regulation 415.2: The Core Requirement',
    content: (
      <>
        <p>
          Regulation 415.2 of BS 7671:2018 is the general regulation for supplementary equipotential
          bonding. It states that where the conditions for automatic disconnection of supply cannot
          be met (specifically, where disconnection times under Regulation 411.3.2.2 or 411.3.2.4
          cannot be achieved), supplementary equipotential bonding must be provided.
        </p>
        <p>
          In the context of bathrooms, the specific regulation is 701.415.2, which provides a
          modified set of rules for bathroom locations. The interaction between these regulations
          determines whether supplementary bonding is required in any given bathroom.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 415.2 (General):</strong> Supplementary bonding must be provided
                where the conditions for automatic disconnection of supply cannot be met. The
                supplementary bonding conductor must connect all simultaneously accessible
                exposed-conductive-parts and extraneous-conductive-parts. The resistance between the
                bonded parts must not exceed 50V divided by the operating current of the protective
                device (Ia).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 701.415.2 (Bathrooms):</strong> Supplementary bonding is required
                in bathrooms connecting all extraneous-conductive-parts and exposed-conductive-parts
                of equipment in Zones 0, 1, 2, and 3 (the zones defined in Section 701). However,
                this bonding may be omitted if specific conditions are met (see the omission
                criteria below).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 544.2 (Conductor sizing):</strong> Supplementary bonding
                conductors between two extraneous-conductive-parts must have a cross-section of at
                least 2.5 mm copper if mechanically protected, or 4 mm if not. Between an
                exposed-conductive-part and an extraneous-conductive-part, the conductor must be at
                least half the size of the CPC of the circuit, with a minimum of 2.5 mm.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The 50V/Ia formula from Regulation 415.2 provides a way to verify the effectiveness of
          supplementary bonding by testing. If the resistance between two simultaneously accessible
          bonded parts is low enough that the touch voltage cannot exceed 50V, the bonding is
          effective. In practice, this means the resistance measured between bonded parts should be
          very low — typically less than 0.05 ohms.
        </p>
      </>
    ),
  },
  {
    id: 'when-required',
    heading: 'When Is Supplementary Bonding Required?',
    content: (
      <>
        <p>Supplementary bonding is required in the following situations:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bathrooms where the omission conditions are not met.</strong> If any circuit
                serving the bathroom does not have 30 mA RCD protection — for example, if the
                bathroom lighting is on a lighting circuit without an RCD — supplementary bonding is
                required. This is the most common reason for requiring supplementary bonding in
                domestic installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bathrooms where main bonding is absent or defective.</strong> If the water
                or gas service is not bonded to the main earthing terminal (or the bonding is
                corroded, disconnected, or undersized), the main bonding condition is not met and
                supplementary bonding is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Locations where disconnection times cannot be achieved.</strong> If the
                earth fault loop impedance on a circuit is too high to achieve the required
                disconnection time under Regulation 411.3.2, supplementary bonding can be used as an
                alternative protective measure. However, this is a last resort — the preferred
                approach is to reduce the impedance or add RCD protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Special installations.</strong> Swimming pools (Section 702), saunas
                (Section 703), and other special locations may require supplementary bonding
                regardless of RCD protection. Check the specific section requirements.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In practice, most modern domestic installations with RCBO consumer units or split-load
          boards with RCD protection on all circuits will meet the omission conditions for
          bathrooms. However, older installations with rewireable fuseboards or MCB-only boards
          without RCD protection will almost always require supplementary bonding in the bathroom.
        </p>
      </>
    ),
  },
  {
    id: 'when-omitted',
    heading: 'When Can Supplementary Bonding Be Omitted?',
    content: (
      <>
        <p>
          Under Regulation 701.415.2, supplementary bonding in a bathroom can be omitted if
          <strong> all three</strong> of the following conditions are met:
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Condition 1: All circuits have 30 mA RCD protection.</strong> Every circuit
                that serves the bathroom — lighting, socket outlets, electric shower, heated towel
                rail, extractor fan — must be protected by a 30 mA RCD. This means each circuit must
                have its own RCBO, or be on a group RCD that provides 30 mA protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  Condition 2: All extraneous-conductive-parts are connected to the protective
                  equipotential bonding.
                </strong>{' '}
                Every metallic service in the bathroom (water pipes, gas pipes if present, heating
                pipes) must be connected to the main bonding system. This means the main bonding
                conductors must be in place, correctly sized, and properly connected at both ends.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Condition 3: Main bonding complies with Regulation 411.3.1.2.</strong> The
                main bonding conductors must be correctly sized (typically 10 mm copper for domestic
                installations), properly installed, and in good condition. Corroded, loose, or
                undersized main bonding does not meet this condition.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If any one of these conditions is not met, supplementary bonding must be provided. During
          a periodic inspection (
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>
          ), you must assess all three conditions before deciding whether supplementary bonding is
          required or can be validly omitted. If supplementary bonding has been omitted but the
          conditions for omission are not all met, record this as a C2 observation.
        </p>
        <p>
          A common mistake is assuming that RCD protection alone is sufficient to omit supplementary
          bonding. All three conditions must be met — not just the RCD condition. Check the main
          bonding carefully before deciding that supplementary bonding can be left out.
        </p>
        <SEOAppBridge
          title="Check bonding requirements with AI"
          description="Describe the bathroom installation to Elec-Mate's AI regulations assistant — RCD protection, pipe materials, main bonding status — and get a clear answer on whether supplementary bonding is required or can be omitted."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'bathrooms',
    heading: 'Bathroom Bonding: The Practical Scenario',
    content: (
      <>
        <p>
          Bathrooms are where supplementary bonding questions arise most frequently. Here is the
          practical decision process for a typical domestic bathroom:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Droplets className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Modern Installation (RCBO Board)</h4>
                <p className="text-white text-sm leading-relaxed">
                  The consumer unit has RCBOs on every circuit, including the bathroom lighting and
                  any sockets. The water and gas services are bonded with 10 mm copper to the MET.
                  The bonding is in good condition and correctly connected. In this scenario, all
                  three omission conditions are met — supplementary bonding is not required. Record
                  on the EICR that supplementary bonding is not required due to compliance with
                  Regulation 701.415.2 omission conditions.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Droplets className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Older Installation (Split-Load Board)</h4>
                <p className="text-white text-sm leading-relaxed">
                  The consumer unit is a dual-RCD split-load board. The socket circuits are on one
                  RCD and the lighting circuits are on the other. Both RCDs are 30 mA. The water is
                  bonded with 10 mm copper, the gas is bonded with 10 mm copper, both connections
                  are secure. All three omission conditions are met — supplementary bonding is not
                  required. However, check that the bathroom lighting is definitely on the
                  RCD-protected side of the split-load board — if it is on the non-RCD side (the
                  main switch side), condition 1 is not met and supplementary bonding is required.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <Droplets className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Legacy Installation (No RCD Protection)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  The consumer unit has MCBs only — no RCDs. The bathroom lighting and electric
                  shower are on MCB-protected circuits without RCD protection. Condition 1 is not
                  met. Supplementary bonding is required in the bathroom. Bond all metallic pipes
                  (hot, cold, heating), any metal bath or shower tray, and the earth terminals of
                  all electrical equipment (towel rail, extractor fan, light fittings) using 4 mm
                  green/yellow cable. Alternatively, recommend upgrading the consumer unit to
                  provide RCD protection on all circuits, which would then allow the supplementary
                  bonding to be omitted.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          During periodic inspections, check the bathroom bonding as part of the standard inspection
          schedule. Record whether supplementary bonding is present, absent, or not required (with
          the reason). If bonding is required but absent, record as C2 (Potentially Dangerous).
        </p>
      </>
    ),
  },
  {
    id: 'conductor-sizes',
    heading: '4 mm Conductors: The Standard for Supplementary Bonding',
    content: (
      <>
        <p>
          The conductor size for supplementary bonding is set out in Regulation 544.2 of BS 7671.
          The rules are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Between two extraneous-conductive-parts:</strong> 4 mm copper minimum if not
                mechanically protected, 2.5 mm copper if mechanically protected (run in conduit,
                trunking, or buried in plaster behind a wall). In practice, most supplementary
                bonding in bathrooms is surface-clipped and therefore requires 4 mm.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  Between an exposed-conductive-part and an extraneous-conductive-part:
                </strong>{' '}
                at least half the cross-section of the CPC serving the circuit, with a minimum of
                2.5 mm copper. For a circuit with a 1.5 mm CPC (such as a 1.0 mm lighting circuit
                with an integral CPC), the supplementary bonding conductor must be at least 2.5 mm.
                For a circuit with a 2.5 mm CPC, the minimum would be 2.5 mm (half of 2.5 is 1.25,
                but the minimum is 2.5).
              </span>
            </li>
          </ul>
        </div>
        <p>
          The simplest approach is to use <strong>4 mm green/yellow single-core cable</strong> for
          all supplementary bonding connections. This meets the requirement for both
          extraneous-to-extraneous and exposed-to-extraneous connections, regardless of mechanical
          protection. It avoids any need to calculate conductor sizes or assess mechanical
          protection — just use 4 mm and it complies.
        </p>
        <p>
          The 4 mm cable is readily available, inexpensive, and easy to terminate. Use BS 951
          bonding clamps on pipes and standard screw terminals on electrical equipment earth
          terminals. Where the cable is surface-run, clip it neatly using green/yellow saddle clips.
        </p>
      </>
    ),
  },
  {
    id: 'installation-method',
    heading: 'How to Install Supplementary Bonding',
    content: (
      <>
        <p>
          Installing supplementary bonding in a bathroom is a straightforward task. Here is the
          step-by-step process:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Identify all parts to be bonded.</strong> Walk the bathroom and identify every
              extraneous-conductive-part (metallic water pipes, heating pipes, gas pipes if present)
              and exposed-conductive-part (earth terminals of light fittings, towel rails, extractor
              fans, shaver sockets). Note the positions and plan the routing.
            </li>
            <li>
              <strong>Plan the conductor route.</strong> Plan the shortest practical route for the 4
              mm bonding conductor. You can use a daisy-chain configuration (connecting from one
              part to the next in sequence) or a star configuration (running separate conductors
              from a central bonding point to each part). The daisy-chain method uses less cable but
              creates a single-path dependency.
            </li>
            <li>
              <strong>Install bonding clamps on pipes.</strong> Clean the pipe surface with emery
              cloth to ensure a good metal-to-metal contact. Fit a BS 951 bonding clamp at each
              connection point. Tighten the clamp securely. Attach the permanent safety label:
              "Safety Electrical Connection — Do Not Remove."
            </li>
            <li>
              <strong>Connect to electrical equipment earth terminals.</strong> Where equipment has
              an earth terminal (towel rail, fan, light fitting), connect the supplementary bonding
              conductor to that terminal. Do not disturb the existing CPC connection.
            </li>
            <li>
              <strong>Route and clip the conductor.</strong> Run the 4 mm green/yellow cable between
              all bonding points. Clip neatly using saddle clips at regular intervals. Where the
              cable passes through a wall, use a grommet. Keep the cable accessible for future
              inspection.
            </li>
            <li>
              <strong>Test the installation.</strong> Use a low-resistance ohmmeter to verify
              continuity between all bonded parts. The resistance between any two bonded parts
              should be very low — typically less than 0.05 ohms. Record the test results.
            </li>
          </ol>
        </div>
        <p>
          The entire installation for a typical bathroom takes 30 to 60 minutes and uses a few
          metres of 4 mm cable plus a handful of bonding clamps. It is a small job but a critical
          one — supplementary bonding can be the difference between a safe bathroom and a lethal
          one.
        </p>
      </>
    ),
  },
  {
    id: 'testing-bonding',
    heading: 'Testing Supplementary Bonding',
    content: (
      <>
        <p>
          Testing supplementary bonding is part of the standard inspection and testing sequence,
          both for initial verification of new work and for periodic inspection (
          <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR</SEOInternalLink>
          ).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuity test.</strong> Using a low-resistance ohmmeter, measure the
                resistance between each pair of bonded parts. Place one probe on a bonded pipe and
                the other on another bonded part (a different pipe, a light fitting earth terminal,
                etc.). The reading should be very low — typically less than 0.05 ohms. A high
                reading indicates a loose clamp, corroded connection, or broken conductor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection.</strong> Check all bonding clamps for security and
                corrosion. Verify that safety labels are present and legible. Check that the bonding
                conductor is correctly sized (4 mm minimum for unprotected runs), properly routed,
                and not damaged. Confirm that the conductor is green/yellow throughout its length.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verification formula.</strong> The resistance between bonded parts should
                satisfy: R less than or equal to 50V / Ia, where Ia is the operating current of the
                protective device for the circuit. For a 30 mA RCD, this gives R less than or equal
                to 50 / 0.03 = 1,667 ohms — which is easily met. For an MCB-only circuit, the
                required resistance is much lower (for a 32A MCB, R less than or equal to 50 / 160 =
                0.31 ohms, where 160A is the magnetic trip current of a Type B 32A MCB).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Record the supplementary bonding test results on the EICR or EIC. Note which parts are
          bonded, the measured resistance, and the conductor size. If supplementary bonding is
          absent where required, record it as C2. If the bonding is present but deteriorated
          (corroded clamps, loose connections), record the specific defect with the appropriate
          classification.
        </p>
        <SEOAppBridge
          title="Record bonding test results on your phone"
          description="Elec-Mate lets you record inspection and test results for supplementary bonding, main bonding, and all other tests directly on your phone. Voice entry, AI validation, and professional PDF export. Complete the EICR on site."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SupplementaryBondingGuidePage() {
  return (
    <GuideTemplate
      title="Supplementary Bonding | When Is It Required? UK Guide"
      description="Complete guide to supplementary bonding under BS 7671. Covers Regulation 415.2, bathroom bonding requirements, when supplementary bonding can be omitted, 4mm conductor sizing, installation methods, and testing procedures."
      datePublished="2025-05-25"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulations Guide"
      badgeIcon={Link2}
      heroTitle={
        <>
          Supplementary Bonding:{' '}
          <span className="text-yellow-400">When Is It Required and When Can It Be Omitted?</span>
        </>
      }
      heroSubtitle="Supplementary bonding in bathrooms is one of the most misunderstood topics in BS 7671. This guide explains Regulation 415.2, the three conditions for omission, 4 mm conductor requirements, and how to test bonding correctly."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Supplementary Bonding"
      relatedPages={relatedPages}
      ctaHeading="Get Bonding Requirements Right Every Time"
      ctaSubheading="Elec-Mate's AI regulations assistant confirms supplementary bonding requirements for any installation scenario. Plus calculators, EICR certificates, and training courses. 7-day free trial."
    />
  );
}
