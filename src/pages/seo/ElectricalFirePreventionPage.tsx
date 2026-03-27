import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Flame,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  ClipboardCheck,
  ShieldCheck,
  FileText,
  Zap,
  Bell,
  Shield,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Electrical Fire Prevention', href: '/guides/electrical-fire-prevention-uk' },
];

const tocItems = [
  { id: 'overview', label: 'Electrical Fire Statistics UK' },
  { id: 'causes', label: 'Common Causes of Electrical Fires' },
  { id: 'afdd', label: 'Arc Fault Detection Devices (AFDDs)' },
  { id: 'smoke-detectors', label: 'Smoke and Heat Detectors' },
  { id: 'consumer-unit', label: 'Consumer Unit Fire Protection' },
  { id: 'warning-signs', label: 'Warning Signs of Dangerous Wiring' },
  { id: 'eicr', label: 'EICR and Fire Prevention' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Approximately 20,000 electrical fires occur in the UK each year, accounting for around 50% of all accidental house fires. The majority are caused by faulty wiring, overloaded circuits, or faulty appliances.',
  'Arc Fault Detection Devices (AFDDs) can detect the electrical signatures of arcing faults before they develop into fires. BS 7671 recommends (but does not mandate) AFDDs for most domestic installations.',
  'Metal consumer unit enclosures have been mandatory for new installations in dwellings since Amendment 3 to BS 7671 (2015). Plastic consumer units are a fire risk if a fault causes arcing inside the enclosure.',
  'Optical smoke alarms are more effective than ionisation alarms for slow-burning fires (which are common in electrical fires starting in wall voids). Heat alarms are required in kitchens where cooking fumes would cause nuisance alarms from smoke detectors.',
  'Warning signs of dangerous wiring include scorch marks around sockets or switches, hot socket outlet plates, flickering lights, frequent circuit breaker trips, and the smell of burning plastic.',
];

const faqs = [
  {
    question: 'How many electrical fires occur in the UK each year?',
    answer:
      'UK fire and rescue service data indicates approximately 20,000 electrical fires occur in dwellings each year. Electrical fires account for around 50% of all accidental house fires. The leading causes are faulty wiring and cables (approximately 30% of electrical fires), faulty appliances (approximately 25%), and misuse of equipment such as overloaded extension leads (approximately 15%). The fatality risk from electrical fires is higher than from most other causes because electrical fires often start in concealed locations (wall voids, roof spaces, under floors) and can burn for a significant time before being detected.',
  },
  {
    question: 'What is an AFDD and does BS 7671 require them?',
    answer:
      'An Arc Fault Detection Device (AFDD) is a protective device that detects the electrical signatures of arc faults — abnormal electrical discharges that can occur in damaged, corroded, or deteriorating wiring and connections. Unlike RCDs (which detect earth leakage currents) and MCBs (which detect overcurrent), AFDDs detect the specific waveform characteristics of arcing faults that do not cause sufficient current to trip a standard protective device. BS 7671 (18th Edition) recommends the use of AFDDs for certain locations — specifically bedroom circuits in single-family dwellings, and in locations where a fire could have serious consequences. However, as of BS 7671:2018+A3:2024, AFDDs are recommended but not mandatory for most domestic installations in the UK. They are mandatory in some other European countries. Despite not being mandatory, AFDDs are increasingly specified for bedroom circuits as part of comprehensive fire protection.',
  },
  {
    question: 'Why are metal consumer units required in dwellings?',
    answer:
      'Amendment 3 to BS 7671 (2015) required that consumer units installed in domestic premises must have a metal (steel or other non-combustible material) enclosure. The requirement came from analysis of fires caused by arcing faults inside plastic consumer unit enclosures. When an arcing fault occurs inside a plastic enclosure, the arc can ignite the plastic and the fire can spread before any protective device operates. A metal enclosure contains the arc and any initial fire, giving the protective devices time to operate and preventing the fire from spreading to the surrounding structure. Plastic consumer units installed before 2015 do not need to be replaced immediately (unless there are other grounds for replacement), but any new consumer unit installed in a dwelling must have a metal enclosure.',
  },
  {
    question: 'What type of smoke alarm is best for bedrooms and living rooms?',
    answer:
      'Optical (photoelectric) smoke alarms are generally preferred for bedrooms and living rooms. Optical alarms detect smoke particles by measuring the scattering of light by smoke — they are more sensitive to slow-burning, smouldering fires, which are common in electrical fires that start in concealed locations. Ionisation smoke alarms are more sensitive to fast-flaming fires but are also more prone to nuisance alarms from cooking and toast. For comprehensive protection, a combination of optical and ionisation alarms (or combination alarms that incorporate both) provides the best coverage. Heat alarms (which detect a rapid rise in temperature) are required in kitchens and other cooking areas where smoke alarms would cause frequent nuisance alarms.',
  },
  {
    question: 'How do I know if my home wiring is a fire risk?',
    answer:
      'Warning signs of dangerous wiring include: scorch marks or heat discolouration around socket outlets or switches; socket outlet face plates that are hot or warm to the touch; flickering or dimming lights, particularly on one circuit; circuit breakers that trip frequently without an obvious cause; a burning plastic smell from outlets, the consumer unit, or from the ceiling near light fittings; and wiring that is old (rubber-insulated wiring from before the 1960s is a significant fire risk as the insulation becomes brittle and cracks). If any of these signs are present, an EICR should be commissioned immediately to assess the installation condition.',
  },
  {
    question: 'Can overloaded extension leads cause fires?',
    answer:
      'Yes. Overloaded extension leads are one of the leading causes of electrical fires in UK dwellings. The total load connected to an extension lead must not exceed its rated current (typically 13A for a standard 4-way extension lead). High-power appliances such as kettles (3kW, 13A), toasters (2kW, 8.7A), and portable heaters (2kW to 3kW) must not be connected to extension leads with other high-power appliances. The rule is simple: one high-power appliance per socket outlet. Extension leads are for convenience — they are not intended to be used as a permanent substitute for additional socket outlets. If socket outlets are insufficient, additional sockets should be installed permanently by a qualified electrician.',
  },
  {
    question: 'How often should an EICR be carried out to prevent electrical fires?',
    answer:
      'The recommended period for EICRs in owner-occupied dwellings is every 10 years, or on change of ownership. For privately rented dwellings, an EICR is now a legal requirement every 5 years under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. However, for older installations (particularly those with rubber-insulated wiring, rewireable fuses, or no RCD protection), a shorter period — 3 to 5 years — is more appropriate. An EICR that identifies C1 (danger present) or C2 (potentially dangerous) deficiencies must be remediated promptly. Regular EICRs are the most effective way to identify deteriorating wiring before it causes a fire.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/afdd-arc-fault-detection',
    title: 'AFDD Guide',
    description: 'Full guide to arc fault detection devices — how they work and where to install them.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete Electrical Installation Condition Reports on your phone.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/guides/electrical-safety-checks-new-home',
    title: 'Electrical Safety Checks for a New Home',
    description: 'What to check in the electrical installation of a property you are buying.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-upgrade',
    title: 'Consumer Unit Upgrade Guide',
    description: 'Metal consumer units, RCD protection, and upgrading old fuse boards.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-handover-documentation',
    title: 'Electrical Handover Documentation',
    description: 'Documents required when completing electrical fire protection work.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Issue EICs for consumer unit upgrades and AFDD installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Electrical Fire Statistics in the UK',
    content: (
      <>
        <p>
          Electrical fires are one of the leading causes of accidental house fires in the United
          Kingdom. UK fire and rescue service data shows approximately 20,000 electrical fires
          in dwellings each year, accounting for around 50% of all accidental house fires. These
          fires cause a significant number of deaths, injuries, and billions of pounds of property
          damage annually.
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 text-centre">
            <div className="text-3xl font-bold text-red-400 mb-2">~20,000</div>
            <p className="text-white text-sm">Electrical fires in UK dwellings each year</p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5 text-centre">
            <div className="text-3xl font-bold text-orange-400 mb-2">~50%</div>
            <p className="text-white text-sm">Of accidental house fires are electrical in origin</p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 text-centre">
            <div className="text-3xl font-bold text-yellow-400 mb-2">~70%</div>
            <p className="text-white text-sm">Caused by faulty wiring or appliances</p>
          </div>
        </div>
        <p>
          The risk is not evenly distributed across all properties. Older properties with
          deteriorating wiring, properties with overloaded circuits and extension leads, and
          properties with plastic consumer units and no RCD protection are at significantly
          higher risk. Properties with modern installations, metal consumer units, RCD protection,
          and appropriate smoke and heat detection are much safer.
        </p>
        <p>
          For electricians, understanding the causes of electrical fires and the protective
          measures available is essential — both for advising customers and for ensuring that
          installed work does not contribute to the problem.
        </p>
      </>
    ),
  },
  {
    id: 'causes',
    heading: 'Common Causes of Electrical Fires',
    content: (
      <>
        <p>
          The majority of electrical fires fall into three categories: faulty wiring, faulty or
          misused appliances, and poor installation workmanship. Understanding these causes helps
          electricians identify and remediate risks during EICR inspections and new installation work.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <strong>Deteriorating wiring and connections</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Old rubber-insulated wiring (pre-1960s) becomes brittle and cracks, exposing
                  conductors that can arc against each other or against earthed metalwork.
                  Loose connections at socket outlets, switches, light fittings, and the consumer
                  unit cause resistance heating and arcing. These faults are a leading cause of
                  electrical fires in older properties.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <strong>Overloaded circuits and extension leads</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Connecting more load than a circuit is rated to carry causes the cable to
                  overheat. Standard twin-and-earth cable buried in thermal insulation has a
                  significantly reduced current-carrying capacity. Overloaded extension leads in
                  poor condition are a common ignition source.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <strong>Arcing faults</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Arc faults occur when electricity jumps between damaged conductors, corroded
                  connections, or degraded insulation. Arcing generates extremely high temperatures
                  (over 6,000°C) that can ignite surrounding materials — including plastic cable
                  insulation and timber joists — even when the arc current is too low to trip a
                  standard MCB. AFDDs are specifically designed to detect and interrupt these faults.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <strong>Poor workmanship</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Incorrectly rated fuses, undersized cables, joints made in ceiling voids or
                  wall cavities without a junction box, and cables damaged during installation
                  (penetrated by nails or screws) are all workmanship issues that can cause fires
                  years after the installation was completed.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'afdd',
    heading: 'Arc Fault Detection Devices (AFDDs) — BS 7671 Guidance',
    content: (
      <>
        <p>
          Arc Fault Detection Devices (AFDDs) detect the electrical signatures of arcing faults
          — abnormal electrical discharges that can develop in damaged or deteriorating wiring and
          connections. AFDDs continuously monitor the current waveform in a circuit and use
          algorithms to distinguish between the normal current waveform of household loads and the
          irregular waveform characteristic of an arc fault.
        </p>
        <p>
          BS 7671 (18th Edition) addresses the use of AFDDs. It recommends
          that AFDDs should be provided in specific circumstances:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>Bedroom circuits in single-family dwellings (recommended)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>Locations where a fire would have particularly serious consequences</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>Locations where evacuation in the event of fire is difficult</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>Circuits supplying combustible materials (e.g. cable runs through timber-framed structures)</span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-yellow-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-white text-sm leading-relaxed">
              <strong>Recommended, not mandated (in most cases):</strong> As of BS 7671:2018+A3:2024,
              AFDDs are recommended but not mandatory for most domestic installations in England and
              Wales. They are mandatory in some European countries. BS 7671 recommends
              that AFDDs should be considered and specified where the risk assessment
              indicates they would provide meaningful additional protection. Electricians should
              discuss AFDD options with customers during consumer unit replacements and new
              installations.
            </p>
          </div>
        </div>
        <p>
          AFDDs are combined with MCBs in a single unit (AFDD+MCB) and replace standard MCBs
          on the ways they protect. They are currently more expensive than standard MCBs (typically
          £30 to £60 per way) but prices have reduced significantly and continue to fall. For
          bedroom circuits — where occupants are asleep and less likely to detect the early signs
          of a fire — the additional cost is a reasonable investment in safety.
        </p>
      </>
    ),
  },
  {
    id: 'smoke-detectors',
    heading: 'Smoke and Heat Detectors for Electrical Fire Protection',
    content: (
      <>
        <p>
          Smoke and heat detectors provide the earliest warning of an electrical fire, giving
          occupants time to escape and contact the fire brigade before the fire spreads. The type
          of detector and its location are important — the wrong type in the wrong location provides
          false security and nuisance alarms.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Optical (Photoelectric) Smoke Alarm</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              Detects smoke particles by measuring light scattering. More sensitive to slow-burning,
              smouldering fires — the type of fire commonly associated with electrical faults in
              wall voids and roof spaces. Less prone to nuisance alarms from cooking than ionisation
              alarms.
            </p>
            <div className="text-white text-sm font-semibold">Best locations:</div>
            <p className="text-white text-sm">Living rooms, hallways, bedrooms, landings</p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Ionisation Smoke Alarm</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              More sensitive to fast-flaming fires. Can give nuisance alarms from cooking and
              toast. Less effective at detecting slow-burning electrical fires in their early
              stages.
            </p>
            <div className="text-white text-sm font-semibold">Best locations:</div>
            <p className="text-white text-sm">
              Older recommendations — optical preferred in most domestic locations now
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat alarm for kitchens</strong> — a heat alarm (detects rapid temperature
                rise) rather than a smoke alarm is required in kitchens where cooking fumes and steam
                would trigger nuisance alarms from a smoke detector. Heat alarms are slower to activate
                than smoke alarms but are appropriate for high-humidity, high-fume environments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Interlinked alarms</strong> — BS 5839-6 recommends interlinked alarms
                (wired or wireless) so that when one alarm activates, all alarms in the property
                sound. This ensures occupants in remote rooms are alerted. Interlinked systems
                are required in new dwellings under Building Regulations Approved Document B.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Carbon monoxide alarms</strong> — not directly related to electrical fires,
                but BS 7671 encourages electricians to recommend CO alarms in properties with gas
                or oil appliances. Many modern combination smoke/CO alarm units are available.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'consumer-unit',
    heading: 'Consumer Unit Fire Protection — Metal Enclosures',
    content: (
      <>
        <p>
          Consumer units are the most common location for electrical arc faults in domestic
          installations — connections loosen over time, ageing protective devices develop faults,
          and the concentration of circuits in one location increases the risk.
        </p>
        <p>
          Amendment 3 to BS 7671 (2015) introduced the requirement that consumer units in
          domestic premises must have a metal enclosure. This requirement exists because plastic
          consumer units, when subjected to an internal arc fault, can ignite — and the plastic
          enclosure then becomes fuel for the fire. A metal enclosure contains the arc and any
          combustion products within the enclosure, giving the protective devices time to operate
          and preventing fire spread.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New consumer units must be metal</strong> — any consumer unit installed
                as a new installation or as a replacement in a domestic dwelling must have a metal
                (or other non-combustible) enclosure. This applies to both the main consumer unit
                and any sub-distribution board in a dwelling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Existing plastic units</strong> — properties with plastic consumer units
                installed before 2015 are not required to replace them immediately. However, if
                the EICR reveals that the installation is due for a consumer unit replacement for
                other reasons (overloaded, no RCD protection, insufficient ways), the new unit
                must be metal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Location matters</strong> — consumer units should not be installed in
                locations where they are exposed to moisture, thermal insulation, or combustible
                materials in direct contact with the enclosure. A metal consumer unit in a poorly
                ventilated location can still develop heat problems if the protective devices are
                overloaded.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Issue EICs for consumer unit upgrades on site"
          description="Elec-Mate's EIC Certificate app is designed for consumer unit replacements. AI board scanning populates the schedule of circuits automatically. Issue the certificate before you leave. Part P self-certification included."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'warning-signs',
    heading: 'Warning Signs of Dangerous Wiring',
    content: (
      <>
        <p>
          Homeowners and electricians should be aware of the warning signs that indicate dangerous
          or deteriorating electrical wiring. Early identification of these signs can prevent
          an electrical fire.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scorch marks around socket outlets or switches</strong> — discolouration
                or scorch marks indicate that arcing has already occurred at that point. This
                is a serious warning sign requiring immediate investigation and remediation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hot or warm socket outlet face plates</strong> — a socket outlet that is
                warm to the touch indicates a loose connection or overloaded circuit. This is
                abnormal — socket outlets should not be warm under normal conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flickering or dimming lights</strong> — particularly if limited to one
                circuit or correlated with operating specific loads. This indicates a loose
                connection or overloaded circuit — both fire risks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning plastic smell</strong> — the smell of burning plastic from sockets,
                the consumer unit, or ceiling voids is a serious warning sign. This can indicate
                that insulation is overheating or that a small fire has already started.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Frequent circuit breaker trips</strong> — a circuit that frequently trips
                without an obvious cause (such as a known high-load appliance) is overloaded or
                has a developing fault. Resetting a frequently tripping breaker without investigating
                the cause is dangerous.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Old wiring types</strong> — rubber-insulated wiring (black rubber outer
                sheath, pre-1960s), aluminium wiring (1960s to 1970s), and lead-sheathed wiring
                (pre-WWII) are all significantly past their design life and represent a serious
                fire risk. Any property with these wiring types should have an EICR and
                prioritise rewiring.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr',
    heading: 'EICR and Electrical Fire Prevention',
    content: (
      <>
        <p>
          An Electrical Installation Condition Report (EICR) is the most systematic way to
          identify electrical fire risks in an existing installation. The EICR assesses the
          condition of the fixed electrical installation — wiring, accessories, consumer unit,
          and earthing — and identifies deficiencies that could lead to fire or electric shock.
        </p>
        <p>
          Deficiencies are classified as:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span className="bg-red-500 text-white text-xs font-bold rounded px-2 py-1 shrink-0">C1</span>
              <span>
                <strong>Danger present</strong> — risk of injury. Immediate remedial action required.
                The circuit or equipment presenting the danger should be disconnected until remediated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-orange-500 text-white text-xs font-bold rounded px-2 py-1 shrink-0">C2</span>
              <span>
                <strong>Potentially dangerous</strong> — urgent remedial action required. Not
                immediately dangerous but could become so. Remediation should be completed as
                soon as possible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-yellow-500 text-black text-xs font-bold rounded px-2 py-1 shrink-0">C3</span>
              <span>
                <strong>Improvement recommended</strong> — not immediately dangerous but
                improvement would enhance safety. Typically for installations that do not meet
                current standards but are not inherently unsafe.
              </span>
            </li>
          </ul>
        </div>
        <p>
          An EICR that reveals C1 or C2 deficiencies — such as deteriorating wiring, no earth
          bonding, or inadequate RCD protection — must be addressed promptly. An installation
          with known deficiencies and no remedial action taken represents a serious and preventable
          fire risk. Use the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR certificate app</SEOInternalLink>{' '}
          to complete condition reports on site and provide customers with a clear, professional
          assessment of their installation's safety.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Advising on Electrical Fire Prevention',
    content: (
      <>
        <p>
          Electricians are uniquely positioned to advise homeowners on electrical fire prevention.
          Every consumer unit replacement, EICR, and new installation is an opportunity to discuss
          AFDDs, smoke alarm placement, RCD protection, and the condition of existing wiring.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR Certificate App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Electrical Installation Condition Reports
                  </SEOInternalLink>{' '}
                  on your phone. AI-assisted inspection guidance, code classification, and instant
                  PDF for the homeowner. Every EICR is an opportunity to identify and address
                  fire risks.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC for Consumer Unit Upgrades</h4>
                <p className="text-white text-sm leading-relaxed">
                  Consumer unit replacements (to metal enclosures with RCD protection and AFDDs)
                  require an{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink>.{' '}
                  Complete it on site with AI board scanning and send the PDF to the homeowner
                  immediately.
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

export default function ElectricalFirePreventionPage() {
  return (
    <GuideTemplate
      title="Electrical Fire Prevention UK | AFDDs, Consumer Units, Warning Signs"
      description="Complete guide to electrical fire prevention in UK homes. UK statistics (~20,000 electrical fires/year), arc fault detection devices (AFDDs), smoke detector types, metal consumer unit requirements post-2016, and warning signs of dangerous wiring."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Fire Safety Guide"
      badgeIcon={Flame}
      heroTitle={
        <>
          Electrical Fire Prevention:{' '}
          <span className="text-yellow-400">AFDDs, Consumer Units, and Warning Signs</span>
        </>
      }
      heroSubtitle="Approximately 20,000 electrical fires occur in UK homes each year — around 50% of all accidental house fires. This guide covers arc fault detection devices (AFDDs), metal consumer units, smoke detector selection, and the warning signs of dangerous wiring that electricians and homeowners must recognise."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Fire Prevention"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs and Consumer Unit Upgrade Certificates On Site"
      ctaSubheading="Elec-Mate helps UK electricians identify electrical fire risks during EICRs and certify consumer unit upgrades on site. AI-assisted inspection, instant PDFs, and professional documentation. 7-day free trial."
    />
  );
}
