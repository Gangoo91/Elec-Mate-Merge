import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Sun,
  Shield,
  BookOpen,
  Zap,
  Cable,
  AlertTriangle,
  Brain,
  GraduationCap,
  Calculator,
  FileCheck2,
  Droplet,
  Shovel,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Garden Lighting', href: '/guides/garden-lighting-regulations' },
];

const tocItems = [
  { id: 'introduction', label: 'Garden Lighting Overview' },
  { id: 'ip-ratings', label: 'IP Ratings for Outdoor Use' },
  { id: 'cable-types', label: 'Cable Types and Burial Depths' },
  { id: 'rcd-protection', label: 'RCD Protection Requirements' },
  { id: 'selv-pelv', label: 'SELV and PELV Options' },
  { id: 'part-p', label: 'Part P Notification' },
  { id: 'design-considerations', label: 'Design Considerations' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'All outdoor lighting circuits must be protected by a 30 mA RCD under BS 7671 Regulation 411.3.3, regardless of whether the installation is mains voltage or extra-low voltage.',
  'SWA (Steel Wire Armoured) cable is the standard choice for buried outdoor circuits. It must be buried at a minimum depth of 0.5 m and protected by cable route markers or yellow warning tape.',
  'IP ratings for outdoor luminaires must be at least IP44 (sheltered locations) or IP65/IP66 (exposed locations). Ground-level fittings (drive-over lights) typically need IP67 or IP68.',
  'SELV (12 V or 24 V) garden lighting systems avoid the need for deep cable burial and reduce shock risk, but the transformer must still be RCD-protected and correctly rated.',
  'Elec-Mate cable sizing calculator handles SWA cable sizing for long outdoor runs, and the AI regulations lookup answers any question about outdoor installation requirements.',
];

const faqs = [
  {
    question: 'Do I need to notify Building Control for garden lighting?',
    answer:
      'It depends on the scope of work. Under Approved Document P of the Building Regulations (England and Wales), adding a new outdoor circuit from the consumer unit is notifiable work if it involves adding a new circuit. If you are a member of a competent person scheme (NICEIC, NAPIT, ELECSA), you can self-certify the work and notify Building Control electronically — no inspection visit is needed. If you are not registered with a competent person scheme, you must notify the local authority Building Control department before starting the work. They will arrange an inspection and issue a Building Control completion certificate. Simply replacing an existing outdoor luminaire on an existing circuit (a like-for-like replacement) is generally not notifiable. Adding a spur from an existing outdoor circuit to serve additional lights may not be notifiable, but adding a completely new circuit from the consumer unit always is.',
  },
  {
    question: 'What cable should I use for garden lighting?',
    answer:
      'For mains voltage (230 V) garden lighting, SWA (Steel Wire Armoured) cable is the standard choice for buried outdoor circuits. The steel wire armouring provides mechanical protection against spade damage, and the cable can be buried directly in the ground at a minimum depth of 0.5 m (or 0.6 m under a road or driveway). Yellow warning tape or cable covers should be placed above the cable at approximately 0.15 m depth. Common sizes are 2.5 mm squared 3-core SWA for lighting circuits and 4 mm squared or 6 mm squared for longer runs or higher loads. For SELV (12 V or 24 V) garden lighting, standard outdoor-rated flexible cable can be used, but it should still be protected from mechanical damage and UV degradation. Some manufacturers supply purpose-made outdoor lighting cable rated for direct burial.',
  },
  {
    question: 'Can I use a plug-in RCD for garden lights?',
    answer:
      'A plug-in RCD (also called a socket outlet RCD or portable RCD) provides 30 mA protection at the socket outlet. While this offers some protection, it is not a substitute for the fixed RCD protection required by BS 7671 for outdoor circuits. Regulation 411.3.3 requires that socket outlets with a rated current not exceeding 32 A that may reasonably be expected to supply portable equipment for use outdoors must be protected by a 30 mA RCD. For a permanently wired garden lighting circuit, the RCD must be a fixed device at the consumer unit — either an RCBO protecting the individual circuit or an RCD protecting a group of circuits that includes the outdoor lighting. A plug-in RCD could provide additional protection on top of the fixed RCD, but it does not replace it. For temporary outdoor lighting powered from an indoor socket (e.g., festive lights), a plug-in RCD is better than nothing but does not meet the standard for a permanent installation.',
  },
  {
    question: 'What IP rating do I need for outdoor garden lights?',
    answer:
      'The minimum IP rating depends on the installation location and exposure to weather. For wall-mounted lights under an eave or porch (sheltered from direct rain), IP44 is generally sufficient — this provides protection against solid objects greater than 1 mm and water splashing from any direction. For fully exposed wall-mounted or post-mounted lights, IP65 (dust-tight, protected against low-pressure water jets) or IP66 (dust-tight, protected against powerful water jets) is recommended. For ground-recessed or drive-over lights, IP67 (dust-tight, protected against temporary immersion) or IP68 (dust-tight, protected against continuous immersion) is required because these fittings are regularly submerged in rainwater. Always check the manufacturer declared IP rating and ensure it matches the installation conditions. A light rated IP44 installed in a fully exposed position would not meet the requirements.',
  },
  {
    question: 'Is SELV garden lighting safer than mains voltage?',
    answer:
      'SELV (Separated Extra-Low Voltage) garden lighting operates at 12 V or 24 V, which is below the threshold that can cause a lethal electric shock under most conditions. This makes SELV inherently safer than 230 V mains in terms of shock risk. However, SELV is not without its own challenges. The transformer must be correctly rated for the total lamp load (including inrush current for LED drivers), and the low voltage means higher currents and greater voltage drop over long cable runs. A 12 V system running 100 W of lighting draws 8.3 A compared with 0.43 A at 230 V — this means larger cable sizes are needed for the same run length. SELV transformers must comply with BS EN 61558-2-6 for safety isolation, and the transformer location must be dry, ventilated, and accessible. The mains supply to the transformer must still be RCD-protected. In summary: SELV reduces shock risk but requires careful design for voltage drop and load capacity. Mains voltage (230 V) is fine for outdoor use provided the circuit is RCD-protected, cables are correctly installed, and equipment has appropriate IP ratings.',
  },
  {
    question: 'How deep should garden lighting cables be buried?',
    answer:
      'Under BS 7671, buried cables must be installed at sufficient depth to avoid damage from foreseeable activities. For SWA cable in a domestic garden, the standard recommendation is a minimum burial depth of 0.5 m (500 mm) below finished ground level. Under driveways, paths, or other areas subject to vehicular traffic, a minimum of 0.6 m is recommended. The cable should be laid on a bed of fine sand or sifted soil, covered with a further layer of fine sand or sifted soil, and then a yellow warning tape or cable cover should be placed approximately 0.15 m (150 mm) above the cable before backfilling. Cable route markers should be placed at each end and at any change of direction. If using ducts or conduit, the same burial depths apply. The location of the cable route should be recorded on a plan and provided to the property owner as part of the installation documentation. This is particularly important because garden landscaping, fence post installation, and tree planting are common activities that can damage buried cables.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/special-locations-part-7-bs-7671',
    title: 'Special Locations Part 7 Guide',
    description:
      'Complete overview of every Part 7 special location in BS 7671 — from bathrooms to solar PV.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/swimming-pool-electrical-regulations',
    title: 'Swimming Pool Electrical Regulations',
    description:
      'Section 702 zones, IP ratings, and SELV requirements — relevant if the garden includes a pool or hot tub.',
    icon: Droplet,
    category: 'Guide',
  },
  {
    href: '/guides/cable-sizing-calculator-bs-7671',
    title: 'Cable Sizing Calculator',
    description: 'Size SWA cable for outdoor runs with voltage drop and thermal checks built in.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/building-regulations-electrical',
    title: 'Building Regulations Electrical',
    description:
      'Approved Document P — when garden lighting is notifiable and how to self-certify.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/earthing-arrangements-explained',
    title: 'Earthing Arrangements Explained',
    description:
      'TN-S, TN-C-S, and TT earthing — critical for outdoor circuits where PME restrictions may apply.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations-uk',
    title: 'Consumer Unit Regulations',
    description:
      'Adding a new circuit for garden lighting — RCBO selection, circuit protection, and labelling.',
    icon: Shield,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'introduction',
    heading: 'Garden Lighting Regulations: What You Need to Know',
    content: (
      <>
        <p>
          Garden lighting is one of the most common outdoor electrical installations in the UK. From
          simple post-top lanterns along a path to elaborate landscape lighting schemes with
          ground-recessed uplighters and underwater pond lights, the range of installations is broad
          — but the regulations are consistent.
        </p>
        <p>
          The key regulatory framework is{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (the IET Wiring Regulations, 18th Edition with Amendment 3), supplemented by Approved
          Document P of the Building Regulations for England and Wales. Between them, these
          documents cover cable selection, burial depths, IP ratings, RCD protection, SELV/PELV
          options, and notification requirements.
        </p>
        <p>
          Whether you are a homeowner commissioning outdoor lighting or an electrician designing and
          installing it, this guide covers every regulation and practical consideration you need.
        </p>
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings for Outdoor Luminaires',
    content: (
      <>
        <p>
          Every outdoor light fitting must have an IP (Ingress Protection) rating appropriate for
          its location. The IP rating is a two-digit code: the first digit indicates protection
          against solid objects (dust), and the second digit indicates protection against water.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP44</strong> — suitable for sheltered locations (under eaves, porches,
                covered pergolas). Protected against solid objects greater than 1 mm and water
                splashing from any direction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP65</strong> — suitable for exposed wall-mounted and post-mounted lights.
                Dust-tight and protected against low-pressure water jets from any direction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP66</strong> — suitable for fully exposed locations subject to driving rain
                or hose-down cleaning. Dust-tight and protected against powerful water jets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP67/IP68</strong> — required for ground-recessed, drive-over, and
                underwater fittings. Dust-tight and protected against temporary (IP67) or continuous
                (IP68) immersion.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always check the manufacturer's declared IP rating against the installation conditions. A
          fitting rated IP44 installed in a fully exposed location does not meet the requirements
          and would be recorded as a defect on an{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR inspection</SEOInternalLink>.
        </p>
      </>
    ),
  },
  {
    id: 'cable-types',
    heading: 'Cable Types and Burial Depths',
    content: (
      <>
        <p>
          The choice of cable for outdoor garden lighting depends on the voltage (mains or SELV) and
          the installation method (buried, surface-mounted, or overhead).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SWA (Steel Wire Armoured) cable</strong> — the standard choice for buried
                mains voltage outdoor circuits. The steel wire armouring provides mechanical
                protection, and the cable can be buried directly in the ground. Common sizes: 1.5 mm
                squared 3-core for lighting, 2.5 mm squared 3-core for mixed lighting and socket
                outlets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum burial depth: 0.5 m</strong> for domestic gardens. 0.6 m under
                driveways, paths, or areas subject to vehicular traffic. The cable must be laid on a
                bed of fine sand and covered with yellow warning tape or cable covers at 0.15 m
                above the cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable route markers</strong> must be placed at each end of the buried
                section and at every change of direction. The route must be recorded on a plan
                provided to the property owner.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELV cable</strong> — for 12 V or 24 V systems, purpose-made outdoor
                lighting cable or suitably rated flexible cable can be used. It does not need to be
                armoured but must be protected from mechanical damage and UV degradation. Burial
                depths for SELV cable are less prescriptive, but 0.3 m minimum is good practice.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For long SWA runs, voltage drop must be checked. BS 7671 allows a maximum voltage drop of
          3% for lighting circuits (6.9 V on a 230 V supply). On a 50 m run of 1.5 mm squared SWA,
          voltage drop can become an issue — use the{' '}
          <SEOInternalLink href="/guides/voltage-drop-calculator-bs-7671">
            voltage drop calculator
          </SEOInternalLink>{' '}
          to verify compliance.
        </p>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection Requirements',
    content: (
      <>
        <p>
          All outdoor circuits must be protected by a 30 mA RCD under BS 7671 Regulation 411.3.3.
          This applies to both mains voltage and SELV circuits (the mains supply to the SELV
          transformer must be RCD-protected).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated RCBO</strong> — the preferred approach is to protect the outdoor
                lighting circuit with its own RCBO at the{' '}
                <SEOInternalLink href="/guides/consumer-unit-regulations-uk">
                  consumer unit
                </SEOInternalLink>
                . This provides both overcurrent and RCD protection on a single device and prevents
                nuisance tripping from affecting other circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>30 mA trip current</strong> — the RCD must have a rated residual operating
                current not exceeding 30 mA. This provides additional protection against electric
                shock in the event of a fault between live conductors and earth.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type A or Type AC</strong> — for standard lighting loads, a Type AC RCD is
                sufficient. If the circuit includes LED drivers with DC components, a Type A RCD may
                be more appropriate to detect smooth DC fault currents.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the garden lighting circuit also serves outdoor socket outlets, those sockets must have
          additional protection — typically via a separate RCBO for the socket circuit, or at
          minimum via the shared 30 mA RCD. Best practice is to keep lighting and socket circuits
          separate.
        </p>
      </>
    ),
  },
  {
    id: 'selv-pelv',
    heading: 'SELV and PELV Options for Garden Lighting',
    content: (
      <>
        <p>
          Many garden lighting installations use SELV (Separated Extra-Low Voltage) at 12 V or 24 V
          instead of mains voltage. This significantly reduces the risk of electric shock and
          simplifies the cable installation requirements.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">SELV (12 V / 24 V)</h3>
            <p className="text-white text-sm leading-relaxed">
              SELV provides electrical separation from the mains via a safety isolating transformer
              (BS EN 61558-2-6). The secondary circuit is not connected to earth. At 12 V, even with
              wet skin, the current cannot reach dangerous levels. Advantages: reduced shock risk,
              simpler cable burial requirements, no need for armoured cable. Disadvantages: higher
              currents mean larger cable sizes for long runs, voltage drop is more significant, and
              the transformer adds cost and must be housed in a dry location.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">PELV (12 V / 24 V)</h3>
            <p className="text-white text-sm leading-relaxed">
              PELV (Protective Extra-Low Voltage) is similar to SELV but the secondary circuit is
              connected to earth. This provides a defined earth reference, which can be useful for
              some lighting control systems. PELV is not permitted in{' '}
              <SEOInternalLink href="/guides/swimming-pool-electrical-regulations">
                swimming pool zones
              </SEOInternalLink>{' '}
              (only SELV is allowed there) but is acceptable for general garden lighting. The
              transformer must still be a safety isolating type. The mains supply must be
              RCD-protected.
            </p>
          </div>
        </div>
        <p>
          For most domestic garden lighting, SELV at 12 V is the simpler and safer option. Mains
          voltage (230 V) with SWA cable and RCD protection is the standard choice for larger or
          more professional installations where longer cable runs and higher lamp wattages make SELV
          impractical.
        </p>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Notification: When Is Garden Lighting Notifiable?',
    content: (
      <>
        <p>
          Under{' '}
          <SEOInternalLink href="/guides/building-regulations-electrical">
            Approved Document P
          </SEOInternalLink>{' '}
          of the Building Regulations (England and Wales), certain outdoor electrical work is
          notifiable to Building Control.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notifiable:</strong> Adding a new circuit from the consumer unit to supply
                outdoor lighting. This includes installing a new RCBO and running SWA cable to the
                garden.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notifiable:</strong> Adding a new outdoor socket outlet on a new circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Generally not notifiable:</strong> Replacing an existing outdoor light
                fitting on an existing circuit (like-for-like replacement). Adding a light fitting
                to an existing outdoor circuit via a spur (no new circuit from the consumer unit).
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you are registered with a competent person scheme (NICEIC, NAPIT, ELECSA), you can
          self-certify the work. You complete the installation, test it, issue an Electrical
          Installation Certificate (EIC), and notify Building Control electronically through your
          scheme provider. The homeowner receives a Building Regulations compliance certificate
          without needing a Building Control inspection visit.
        </p>
        <p>
          If you are not registered with a competent person scheme, you must notify the local
          authority Building Control department before starting the work. They will arrange an
          inspection (which will incur a fee) and issue a completion certificate if the work is
          satisfactory.
        </p>
      </>
    ),
  },
  {
    id: 'design-considerations',
    heading: 'Design Considerations for Garden Lighting',
    content: (
      <>
        <p>
          Good garden lighting design combines aesthetics with electrical compliance. Here are the
          key technical considerations:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage drop on long runs.</strong> BS 7671 limits voltage drop to 3% for
                lighting circuits (6.9 V on a 230 V supply). On a 40 m run of 1.5 mm squared 3-core
                SWA carrying 6 A, the voltage drop is approximately 5.8 V — within limits. For
                longer runs or higher loads, upsize the cable. For 12 V SELV systems, voltage drop
                is much more significant — a 5% drop on 12 V is only 0.6 V, which can visibly dim
                LEDs at the end of the run.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Junction boxes and connections.</strong> All outdoor junction boxes must
                have an IP rating appropriate for the location — typically IP66 or IP68 for buried
                or ground-level connections. Gel-filled junction boxes are commonly used for
                direct-burial connections as they maintain the IP rating after cable entry.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switching and controls.</strong> Outdoor lighting can be controlled by
                manual switches, photocells (dusk-to-dawn sensors), PIR motion sensors, timers, or
                smart home systems. The control device must be rated for the lamp type (LED drivers
                have different inrush characteristics from incandescent lamps).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>If the garden includes a pond or water feature,</strong>{' '}
                <SEOInternalLink href="/guides/swimming-pool-electrical-regulations">
                  Section 702
                </SEOInternalLink>{' '}
                requirements may apply depending on the size and design. Purpose-made pond lights
                are typically SELV (12 V) and rated IPX8 for submersion.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes to Avoid',
    content: (
      <>
        <p>
          Garden lighting installations are straightforward if the regulations are followed
          correctly. Here are the most common mistakes found during EICR inspections:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insufficient burial depth.</strong> SWA cable buried at 200 mm instead of
                500 mm. This is a C2 (Potentially Dangerous) defect — a garden fork or rotavator can
                easily reach 200 mm depth.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection.</strong> Outdoor circuits connected to a non-RCD
                protected MCB at the consumer unit. This is a C2 defect under Regulation 411.3.3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wrong IP rating for the location.</strong> An IP44 wall light installed in a
                fully exposed position, or an IP44 bollard light where water pools around the base.
                The IP rating must match the actual conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-armoured cable buried without protection.</strong> Twin and earth
                (6242Y) cable buried directly in the ground without mechanical protection. This
                cable has no armouring and is not rated for direct burial.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No cable route documentation.</strong> No plan provided to the homeowner
                showing where the buried cables are routed. Future landscaping work could damage the
                cable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Every one of these mistakes would be picked up on a competent EICR inspection. If you are
          installing garden lighting, getting it right first time saves the cost and disruption of
          remedial work later.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Garden Lighting Made Easier',
    content: (
      <>
        <p>
          Garden lighting is profitable work — customers want it, it is relatively quick to install,
          and it generates follow-on work (outdoor sockets, hot tub circuits, EV chargers). The key
          is getting the design right, sizing the cable correctly, and completing the certification
          efficiently.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Size the SWA cable for the outdoor run with the Elec-Mate{' '}
                  <SEOInternalLink href="/guides/cable-sizing-calculator-bs-7671">
                    cable sizing calculator
                  </SEOInternalLink>
                  . Enter the load, cable length, installation method, and ambient temperature. Get
                  the correct cable size with voltage drop and thermal checks — on your phone, on
                  site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Regulations Lookup</h4>
                <p className="text-white text-sm leading-relaxed">
                  Not sure about the IP rating for a specific location? Need to check the burial
                  depth requirement? Ask Elec-Mate AI and get the exact regulation reference with
                  practical guidance — in seconds.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC Certificate</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  for the new outdoor circuit on your phone. AI board scanner reads the consumer
                  unit, voice entry captures test results, and the finished certificate is sent to
                  the customer as a professional PDF.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Design and certify garden lighting faster"
          description="Cable sizing, voltage drop checks, AI regulations lookup, and digital certificates — all on your phone. Join 430+ UK electricians using Elec-Mate. 7-day free trial."
          icon={Sun}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function GardenLightingRegsPage() {
  return (
    <GuideTemplate
      title="Garden Lighting Regulations | Outdoor Electrical Guide"
      description="Complete guide to garden lighting regulations for UK electricians. IP ratings, SWA cable burial depths, RCD protection, SELV/PELV options, Part P notification requirements, and common installation mistakes to avoid."
      datePublished="2025-05-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulations Guide"
      badgeIcon={Sun}
      heroTitle={
        <>
          Garden Lighting Regulations:{' '}
          <span className="text-yellow-400">The Complete Outdoor Electrical Guide</span>
        </>
      }
      heroSubtitle="Outdoor lighting installations must meet BS 7671 requirements for IP ratings, cable protection, RCD protection, and Part P notification. This guide covers SWA cable burial depths, SELV options, mains voltage requirements, and common mistakes to avoid."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Garden Lighting Regulations"
      relatedPages={relatedPages}
      ctaHeading="Size Outdoor Cables in Seconds"
      ctaSubheading="Elec-Mate cable sizing calculator handles SWA runs, voltage drop checks, and thermal verification — plus AI regulations lookup for any outdoor installation question. 7-day free trial."
    />
  );
}
