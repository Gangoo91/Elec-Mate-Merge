import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  PoundSterling,
  Home,
  ClipboardCheck,
  Zap,
  ShieldCheck,
  FileCheck2,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Property Guides', href: '/guides/period-property-electrical' },
  { label: 'Post-War Property Electrical Guide', href: '/post-war-property-electrical' },
];

const tocItems = [
  { id: 'postwar-overview', label: 'Post-War Properties Overview' },
  { id: 'pvc-wiring', label: 'Early PVC Wiring' },
  { id: 'fuse-boxes', label: 'Rewirable Fuse Boxes' },
  { id: 'earthing-issues', label: 'Earthing Issues' },
  { id: 'signs-of-upgrade', label: 'Signs It Needs Upgrading' },
  { id: 'rewire-costs', label: 'Upgrade Costs 2026' },
  { id: 'eicr-findings', label: 'Typical EICR Findings' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Post-war properties built between 1945 and 1965 were wired with early PVC-insulated cables — a significant improvement over rubber, but now 60 to 80 years old. PVC from this era can become brittle and crack, and is installed to wiring regulations that are significantly out of date.',
  'The ring main circuit (introduced 1947) is the dominant socket circuit arrangement in post-war housing. Many original ring mains from the 1950s remain in use, often without any RCD protection.',
  'Fuse boxes with rewirable fuses were standard in post-war construction through to the 1970s. These cannot provide modern RCD protection and are a common source of C2 observations on EICR inspections.',
  'Post-war properties frequently have earthing issues — TN-C-S (PME) earthing was not universally adopted until the late 1960s, and some properties may have inadequate or missing earthing arrangements.',
  'A consumer unit replacement on a post-war property (where the existing wiring is in acceptable condition) typically costs £400 to £900. A full rewire costs £2,500 to £6,000 depending on size.',
];

const faqs = [
  {
    question: 'Is 1950s wiring still safe?',
    answer:
      'Early PVC wiring from the 1950s is significantly better than rubber insulation, but it is now 70 to 75 years old and was installed to wiring regulations (the 5th Edition IEE Wiring Regulations, 1955) that are now considerably out of date. Whether it is safe depends on its condition — an EICR will assess this. Common issues include absence of RCD protection, inadequate earthing, and in some cases insulation that has become brittle or has been damaged by rodents, damp, or physical contact.',
  },
  {
    question: 'When did rewirable fuse boxes stop being fitted?',
    answer:
      'Rewirable fuse boxes were gradually superseded by consumer units with MCBs (Miniature Circuit Breakers) during the 1970s and 1980s. However, rewirable fuse boards were installed in new properties as late as the early 1970s and were not formally displaced until the later editions of the IEE Wiring Regulations required better overcurrent protection. Many post-war properties still have their original rewirable fuse board, particularly those that have not been renovated.',
  },
  {
    question: 'What is TN-C-S earthing and why does it matter in post-war properties?',
    answer:
      'TN-C-S earthing (also called PME — Protective Multiple Earthing) uses the supply neutral conductor as the earth return path. It is the most common earthing arrangement in the UK today. TN-C-S was not universally adopted until the late 1960s, so some post-war properties may have older TN-S or TT earthing arrangements, or may have earthing that was originally TN-S but was changed without proper documentation. The earthing arrangement must be identified and verified during an EICR.',
  },
  {
    question: 'Do I need to rewire a 1950s house or just replace the consumer unit?',
    answer:
      'The answer depends on the condition of the existing wiring, which only an EICR can determine. If the wiring is early PVC in good condition with adequate earthing, a consumer unit replacement may be sufficient to bring the installation up to an acceptable standard. If the wiring has deteriorated, lacks earth conductors, or has been subject to significant DIY modifications, a full rewire is more appropriate. An honest electrician will advise based on the EICR findings rather than a blanket recommendation.',
  },
  {
    question: 'Why are there so few sockets in a post-war house?',
    answer:
      'Post-war properties were designed when domestic appliances were few — a television, a radio, a vacuum cleaner, and some lighting. The original specification typically provided 2 to 4 socket outlets per floor. Modern households require far more socket provision, and the absence of adequate sockets often results in the use of multi-way extension leads, which are a hazard when used to overload a single socket or ring circuit.',
  },
  {
    question: 'My 1960s house has never been rewired — should I be worried?',
    answer:
      'A property last rewired in the 1960s is now 60 years since it was installed. The wiring would have been done to the 14th or 15th Edition IEE Wiring Regulations and will be missing RCD protection, may have inadequate earthing, and may have insulation that has been subject to 60 years of heat cycling and physical degradation. An EICR is strongly recommended. The outcome will determine whether a consumer unit upgrade suffices or a full rewire is required.',
  },
  {
    question: 'Can a post-war property get a satisfactory EICR without a full rewire?',
    answer:
      'Yes, in many cases. Post-war PVC wiring in good condition, with adequate earthing and no dangerous modifications, can receive a Satisfactory EICR outcome after a consumer unit upgrade providing RCD protection. This is not guaranteed — it depends on the condition found during inspection. An EICR followed by consumer unit replacement and any remedial work identified during the inspection is a common and cost-effective approach for post-war properties.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/interwar-property-electrical',
    title: '1920s/1930s Property Electrical Guide',
    description:
      'Interwar properties with rubber wiring, round pin sockets, and rewiring challenges.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/period-property-electrical',
    title: 'Period Property Electrical Guide',
    description: 'General guide covering all pre-1966 properties — what to look for at survey.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: ShieldCheck,
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
    id: 'postwar-overview',
    heading: 'Post-War Properties and Electrical Modernisation',
    content: (
      <>
        <p>
          The period from 1945 to approximately 1965 saw the largest sustained house-building
          programme in UK history. The post-war housing shortage, combined with slum clearance in
          cities and the growth of new towns, produced millions of new homes across the country.
          These properties were wired with the technology of their era — early PVC insulation, ring
          main circuits, and rewirable fuse boards — all of which are now 60 to 80 years old.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Housing types</strong> — post-war housing ranges from prefabricated "prefab"
                homes (temporary structures many of which are still occupied) through to substantial
                brick-built council estates, new towns (Harlow, Crawley, Stevenage), and private
                semi-detached and detached developments. All share broadly similar electrical
                characteristics for their period.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The ring main revolution</strong> — the ring main circuit (a circuit loop
                returning to the consumer unit rather than a radial spur) was introduced in 1947
                following recommendations by the Electrical Research Association. Post-war housing
                was the first generation to be built with ring mains as standard, enabling the
                familiar 13-amp square pin socket (BS 1363) to replace the older round pin system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Condition today</strong> — post-war wiring is better than rubber-insulated
                wiring but is not without significant issues. The wiring regulations of the 1950s
                and 1960s did not require RCD protection, had different earthing requirements, and
                were designed for far lower electrical loads than a modern household generates. Many
                post-war properties are now overdue for electrical assessment.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pvc-wiring',
    heading: 'Early PVC Wiring — Better Than Rubber, But Not Indefinite',
    content: (
      <>
        <p>
          PVC (polyvinyl chloride) insulation was adopted in UK domestic wiring from the early 1950s
          and represents a significant improvement over rubber. PVC is more resistant to moisture,
          heat, and oxidation than natural rubber. However, early PVC formulations from the 1950s
          and early 1960s were not as stable as modern PVC — and any wiring is now at least 60 years
          old.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plasticiser migration</strong> — early PVC insulation contains plasticisers
                that give it flexibility. Over time these plasticisers migrate out of the PVC
                compound, causing the insulation to become hard and brittle. This is most noticeable
                where cables are bent sharply or are exposed to heat. Brittle PVC cracks when
                disturbed, creating shock and fire hazards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conductor sizing</strong> — post-war ring main circuits were typically wired
                in 1.5mm² or early 2.5mm² cable, often at the lower end of what is acceptable for a
                modern fully loaded ring circuit. Socket circuits in a modern household carry far
                higher loads than they were designed for in 1955.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Colours (pre-harmonisation)</strong> — post-war wiring used the old UK
                colour convention: red for live, black for neutral, and green for earth (later
                green-and-yellow from around 1970). Pre-harmonisation cables in a property that has
                had subsequent work carried out in the new colours (brown live, blue neutral) must
                be clearly identified to avoid confusion and incorrect connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rodent damage</strong> — PVC insulation is attractive to rodents as a
                gnawing material. Properties with a history of rodent activity (common in rural
                areas and near farmland) may have cables with damaged insulation in loft spaces and
                below suspended floors, creating shock and fire hazards that are not immediately
                apparent.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fuse-boxes',
    heading: 'Rewirable Fuse Boxes in Post-War Properties',
    content: (
      <>
        <p>
          Rewirable fuse boxes were standard in post-war UK housing until the 1970s. Many remain in
          service today. While not immediately dangerous if the fuse wire is of the correct rating
          and in good condition, rewirable fuse boxes cannot provide modern RCD protection and are a
          consistent source of EICR observations.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection</strong> — rewirable fuse boards predate RCD technology.
                Regulation 411.3.3 of BS 7671 requires 30mA RCD protection on socket-outlet
                circuits. Without this, the installation is assessed as Unsatisfactory in an EICR. A
                person contacting a live conductor connected to an unprotected socket circuit may
                not be saved by the existing protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incorrect fuse wire</strong> — rewirable fuses require the correct gauge of
                fuse wire for the circuit they protect. A 20A fuse (for a ring main) must have 20A
                wire — not 30A wire borrowed from another holder. Over the decades, successive
                occupants may have replaced blown fuses with the wrong gauge of wire, or in extreme
                cases with non-fuse materials. When opening a fuse box for inspection, check every
                fuse holder individually.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Enclosure condition</strong> — post-war consumer units were made from mild
                steel, Bakelite, or early plastics. Steel units may be corroded; Bakelite units
                become brittle with age. Damaged enclosures that expose live terminals are a C1
                observation. Enclosures that restrict safe access are a C2 or C3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-combustible requirement</strong> — Amendment 3 to BS 7671 (effective
                from 2016) requires consumer unit enclosures to be of non-combustible construction
                (typically steel). While existing Bakelite or early plastic consumer units are not
                required to be replaced immediately on these grounds alone, they cannot be
                refurbished to add modern protective devices and replacement with a modern
                metal-clad unit is the correct remedy.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'earthing-issues',
    heading: 'Earthing Issues in Post-War Properties',
    content: (
      <>
        <p>
          Earthing in post-war properties is a common area of concern during EICR inspections. The
          earthing arrangements required by the wiring regulations of the 1950s and 1960s differ
          significantly from modern requirements, and many post-war properties have earthing that is
          inadequate by current standards.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TN-S vs TN-C-S</strong> — many post-war properties were originally connected
                to TN-S supplies (earthing via the lead sheath of the incoming supply cable). As
                supply infrastructure has been replaced, some of these properties have been switched
                to TN-C-S (PME) without the earthing arrangements in the property being updated. An
                EICR will check that the earthing arrangement matches the supply type.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing main bonding</strong> — main equipotential bonding conductors to gas
                and water services were not always installed in post-war properties to the standard
                now required by Regulation 411.3.1.2 of BS 7671. Missing main bonding is a common C2
                finding in post-war EICR inspections. Bonding conductors are relatively inexpensive
                to install (typically £80 to £200) and are an effective immediate safety
                improvement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrode systems</strong> — some rural post-war properties have TT
                earthing systems (earth electrode rather than a supply earth). TT earthing requires
                an RCD as the primary means of fault protection, and the earth electrode resistance
                must be tested and documented. An electrode that has corroded, been disturbed by
                ground works, or is undersized will not provide adequate fault protection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'signs-of-upgrade',
    heading: 'Signs Your Post-War Property Needs an Electrical Upgrade',
    content: (
      <>
        <p>
          Even without an EICR, there are visible signs that a post-war property's electrical
          installation may need attention. The following are common indicators that a professional
          assessment is warranted.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD button on the consumer unit</strong> — if the fuse box or consumer
                unit has no test button for an RCD (a button marked "T" or "Test"), the installation
                has no RCD protection. This is one of the strongest indicators that an upgrade is
                needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuses</strong> — if the fuse board requires fuse wire to be
                replaced when a circuit trips (rather than a switch or button to reset), it is a
                rewirable fuse board. These should be replaced with a modern consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scorch marks or burn smell</strong> — any discolouration around sockets,
                switches, or the consumer unit, or any smell of burning from the consumer unit, is
                an immediate indication of a potential electrical fault. Turn off the power to the
                affected area and call a qualified electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Old-colour wiring visible</strong> — if you can see cables with red and
                black insulation (old UK colours, used before 2006) in the loft, under floorboards,
                or at the consumer unit, the wiring is at least 20 years old and may be considerably
                older. Pre-harmonisation wiring that has not been assessed recently warrants an
                EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Persistent tripping</strong> — if circuit breakers or RCDs trip frequently
                without obvious cause, this may indicate insulation breakdown in the wiring. Do not
                simply reset the device — have the cause investigated by a qualified electrician.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rewire-costs',
    heading: 'Electrical Upgrade Costs for Post-War Properties (2026)',
    content: (
      <>
        <p>
          Post-war properties in good structural condition are often candidates for a consumer unit
          replacement rather than a full rewire, particularly if the PVC wiring has been assessed as
          adequate during an EICR. The following costs reflect both options.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement only</strong> — £400 to £900 for a standard
                3-bedroom post-war house. Includes a modern metal-clad consumer unit with dual RCD
                or RCBO protection. Suitable where the existing wiring is in acceptable condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit plus bonding and remedials</strong> — £700 to £1,500. Consumer
                unit replacement plus installation of missing main equipotential bonding to gas and
                water services and any other C2 remedial work identified during an EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire — two-bedroom post-war house</strong> — £2,500 to £4,500.
                Includes consumer unit, all new circuits, sockets, switches, and lighting points.
                Post-war cavity wall construction makes routing slightly easier than solid-wall
                properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire — three or four-bedroom post-war house</strong> — £3,500 to
                £6,000. Larger properties at the higher end. Council-built properties with
                standardised layouts are often at the lower end of the range.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The decision between consumer unit replacement and full rewire should be based on the
          findings of an EICR. An electrician who recommends a full rewire without first carrying
          out an EICR is not following best practice. An EICR-first approach protects both the
          homeowner and the electrician.
        </p>
      </>
    ),
  },
  {
    id: 'eicr-findings',
    heading: 'Typical EICR Findings in Post-War Properties',
    content: (
      <>
        <p>
          An <SEOInternalLink href="/guides/eicr-observation-codes-explained">EICR</SEOInternalLink>{' '}
          on a post-war property typically produces a mix of C2 and C3 observations. The following
          are the most commonly encountered findings.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — No RCD protection on socket circuits</strong> — the single most common
                C2 finding in post-war properties. Absence of 30mA RCD protection as required by
                Regulation 411.3.3 makes the EICR Unsatisfactory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — Missing main equipotential bonding</strong> — bonding conductors to gas
                and water services absent or undersized relative to the main earth conductor.
                Required by Regulation 411.3.1.2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — Rewirable fuse board</strong> — the presence of rewirable fuses without
                any RCD protection is typically recorded as a C2 making the installation
                Unsatisfactory. Some inspectors record this as FI (Further Investigation) where the
                fuse ratings cannot be verified.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C3 — Insufficient socket outlets</strong> — a recommendation to increase
                socket provision to reduce reliance on extension leads and adaptors.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Post-War Property Electrical Work',
    content: (
      <>
        <p>
          Post-war properties represent one of the largest and most accessible markets for domestic
          electrical work in the UK. Consumer unit replacements, main bonding installations, and
          full rewires on 1940s to 1960s properties generate consistent work for domestic
          electricians nationwide.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR Before Consumer Unit Replacement</h4>
                <p className="text-white text-sm leading-relaxed">
                  Always carry out an{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    EICR with the Elec-Mate app
                  </SEOInternalLink>{' '}
                  before replacing a post-war consumer unit. The EICR establishes whether the
                  existing wiring is suitable for connection to a new unit. It also identifies any
                  additional work (bonding, remedials) that should be included in the scope to
                  achieve a Satisfactory outcome.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Bundle the Work — Increase Job Value</h4>
                <p className="text-white text-sm leading-relaxed">
                  Post-war properties almost always need bonding alongside the consumer unit
                  replacement, and often need additional sockets or dedicated appliance circuits.
                  Quote the complete package using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to maximise job value and give clients a complete solution rather than a piecemeal
                  approach.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete post-war property EICRs and quotes with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, consumer unit replacement paperwork, and professional quoting. AI board scanning, instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PostWarPropertyElectricalPage() {
  return (
    <GuideTemplate
      title="1940s/1950s House Electrical Guide | Post-War Property Electrical UK"
      description="Complete electrical guide for post-war properties built 1945–1965. Early PVC wiring, rewirable fuse boxes, earthing issues, signs your installation needs upgrading, and upgrade costs £400–£6,000 for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Property Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          1940s &amp; 1950s House Electrical Guide:{' '}
          <span className="text-yellow-400">Post-War Property Electrical</span>
        </>
      }
      heroSubtitle="Post-war properties built between 1945 and 1965 introduced early PVC wiring and the ring main circuit — a significant improvement over rubber insulation, but now 60 to 80 years old. This guide covers the specific hazards of post-war electrical installations, rewirable fuse boxes, earthing issues, and the signs that your installation needs upgrading, with upgrade costs of £400 to £6,000."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Post-War Property Electrical Installations"
      relatedPages={relatedPages}
      ctaHeading="Complete Post-War Property EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
