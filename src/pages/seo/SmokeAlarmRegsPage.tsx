import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Bell,
  ShieldCheck,
  Zap,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Home,
  ClipboardCheck,
} from 'lucide-react';

export default function SmokeAlarmRegsPage() {
  return (
    <GuideTemplate
      title="Smoke Alarm Regulations UK 2026 | BS 5839-6"
      description="Complete UK guide to smoke alarm regulations. Smoke and Carbon Monoxide Alarm Regulations 2022, BS 5839-6 grades and categories, LD1/LD2/LD3, interlinked alarms, hard-wired vs battery, Scottish requirements, landlord obligations, and Building Regulations Part B."
      datePublished="2025-07-01"
      dateModified="2026-02-14"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'Smoke Alarm Regulations UK', href: '/guides/smoke-alarm-regulations-uk' },
      ]}
      tocItems={[
        { id: 'overview', label: 'Overview' },
        { id: 'regulations-2022', label: 'Regulations 2022 (England)' },
        { id: 'bs5839-grades', label: 'BS 5839-6 Grades' },
        { id: 'bs5839-categories', label: 'Categories LD1, LD2, LD3' },
        { id: 'interlinked', label: 'Interlinked Alarms' },
        { id: 'hardwired-vs-battery', label: 'Hard-Wired vs Battery' },
        { id: 'scotland', label: 'Scottish Requirements' },
        { id: 'landlord', label: 'Landlord Obligations' },
        { id: 'new-builds', label: 'New Build Requirements' },
        { id: 'installation-practice', label: 'Installation Best Practice' },
        { id: 'how-to', label: 'Step-by-Step Installation' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Regulations Guide"
      badgeIcon={Bell}
      heroTitle={
        <>
          Smoke Alarm Regulations UK 2026
          <br />
          <span className="text-yellow-400">BS 5839-6, Grades, Categories & Compliance</span>
        </>
      }
      heroSubtitle="Smoke and carbon monoxide alarm regulations have become significantly more stringent in recent years. This guide covers the Smoke and Carbon Monoxide Alarm Regulations 2022 (England), BS 5839-6 grades and categories, interlinked alarms, landlord obligations, Scottish requirements, and Building Regulations Part B — everything an electrician needs to specify and install compliant alarm systems."
      readingTime={17}
      keyTakeaways={[
        'The Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022 require smoke alarms on every storey with a habitable room and carbon monoxide alarms in rooms with fixed combustion appliances (excluding gas cookers) — this applies to all rented properties in England.',
        'BS 5839-6 classifies fire detection systems by Grade (A to F, covering the type of equipment) and Category (LD1, LD2, LD3, covering the extent of coverage) — the combination determines the level of protection.',
        'For new builds and material alterations, Building Regulations Approved Document B requires a Grade D Category LD2 system minimum — mains-powered, interlinked alarms in circulation spaces and high-risk rooms.',
        'Scotland has the most stringent requirements in the UK: since February 2022, all homes (owned and rented) must have interlinked fire alarms in every circulation space, living room, and kitchen, plus a heat alarm in the kitchen and CO alarm where required.',
        "Elec-Mate's Fire Alarm Certificate covers smoke alarm installations to BS 5839-6, and the EICR form captures the condition and compliance of existing smoke alarm systems during periodic inspection.",
      ]}
      sections={[
        {
          id: 'overview',
          heading: 'Smoke Alarm Regulations — Overview',
          content: (
            <>
              <p>
                Smoke and fire alarm regulations in the UK are governed by a combination of
                legislation, building regulations, and British Standards. The requirements differ
                depending on whether the property is a new build, an existing property, a rented
                property, or an owner-occupied property, and whether it is in England, Scotland, or
                Wales. For electricians, understanding these requirements is essential — smoke alarm
                work is a common part of both new installations and EICR inspections.
              </p>
              <p>
                The key documents are: the Smoke and Carbon Monoxide Alarm (Amendment) Regulations
                2022 (legislation for rented properties in England), BS 5839-6:2019 (the British
                Standard for fire detection and alarm systems in domestic premises), and Building
                Regulations Approved Document B (the building regulations guidance for new builds
                and material alterations). Scotland has separate legislation under the Housing
                (Scotland) Act 2006 as amended.
              </p>
              <p>
                The trend in UK smoke alarm regulation is clear — requirements have become
                progressively more stringent over the past decade, moving from simple standalone
                smoke alarms to interlinked, mains-powered systems with broader coverage.
                Electricians who understand the current requirements and can advise homeowners and
                landlords accurately have a significant competitive advantage.
              </p>
            </>
          ),
        },
        {
          id: 'regulations-2022',
          heading: 'Smoke and Carbon Monoxide Alarm Regulations 2022 (England)',
          content: (
            <>
              <p>
                The Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022 came into force on
                1 October 2022 and apply to all rented properties in England (both social housing
                and the private rented sector). They amended the original 2015 regulations to
                strengthen the requirements. The key provisions are:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">
                  2022 Regulations — Requirements
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Smoke alarm on every storey</strong> — At
                      least one smoke alarm must be installed on each storey of the property that
                      has a habitable room. The alarm should be in the circulation space (hallway or
                      landing) — not inside bedrooms or living rooms.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Carbon monoxide alarm in rooms with combustion appliances
                      </strong>{' '}
                      — A CO alarm must be installed in any room containing a fixed combustion
                      appliance (gas boiler, wood-burning stove, open fire, oil boiler). Gas cookers
                      are excluded from this requirement.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Social housing included</strong> — The
                      2022 amendment extended the regulations to cover social housing (local
                      authority and housing association properties), which were previously excluded
                      from the 2015 regulations.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Repair and replace duty</strong> —
                      Landlords must repair or replace alarms that are reported as faulty. The duty
                      to ensure alarms are in working order applies at the start of each new tenancy
                      and whenever a fault is reported.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                The regulations do not specify the type of alarm (mains-powered or battery), nor do
                they require interlinking. However, the guidance recommends that alarms comply with
                BS 5839-6, and best practice is to install mains-powered, interlinked alarms
                wherever feasible. For landlords, installing a compliant system that exceeds the
                minimum regulatory requirement provides better protection for tenants and reduces
                liability.
              </p>
            </>
          ),
        },
        {
          id: 'bs5839-grades',
          heading: 'BS 5839-6 Grades — Types of Equipment',
          content: (
            <>
              <p>
                BS 5839-6:2019 classifies fire detection and alarm systems by Grade, which defines
                the type of equipment used. Understanding the grades is essential for specifying the
                correct system.
              </p>
              <div className="space-y-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-xl mb-1">Grade A</h3>
                  <p className="text-white text-sm leading-relaxed">
                    A system incorporating a fire alarm control panel, detectors, and sounders
                    connected by dedicated fire alarm wiring. This is a full fire alarm system as
                    found in commercial buildings — control panel with zone indication, manual call
                    points, dedicated wiring, and monitored connections. Grade A is rarely used in
                    standard domestic properties but may be specified in large houses, HMOs (Houses
                    in Multiple Occupation), and sheltered accommodation.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-xl mb-1">Grade B</h3>
                  <p className="text-white text-sm leading-relaxed">
                    A system of fire detectors and sounders connected to a common power supply
                    (typically a central mains power supply with battery backup), but without a fire
                    alarm control panel. The detectors are connected by dedicated fire alarm wiring
                    and communicate with each other directly. Grade B provides a high level of
                    protection without the complexity and cost of a full panel-based system. It is
                    sometimes used in larger domestic properties and HMOs.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-xl mb-1">Grade C</h3>
                  <p className="text-white text-sm leading-relaxed">
                    A system of fire detectors and sounders connected to the domestic mains supply,
                    with an integral standby power supply (backup battery) in each detector. The
                    detectors are interconnected by hardwired connections so that activation of any
                    detector triggers all sounders. Grade C has traditionally been the standard for
                    hard-wired domestic systems — a cable (typically 3-core-and-earth) runs between
                    all alarm positions.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-xl mb-1">Grade D</h3>
                  <p className="text-white text-sm leading-relaxed">
                    A system of one or more mains-powered fire alarm devices, each with an integral
                    standby power supply (backup battery). Grade D devices can be interconnected by
                    hardwire, radio frequency (wireless), or a combination.{' '}
                    <strong className="text-yellow-400">
                      Grade D is the minimum requirement for new builds
                    </strong>{' '}
                    under Building Regulations Approved Document B. Modern Grade D systems with
                    wireless interlinking have largely replaced traditional Grade C hardwired
                    systems for new domestic installations due to easier and faster installation.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-xl mb-1">Grade E</h3>
                  <p className="text-white text-sm leading-relaxed">
                    A system of mains-powered fire alarm devices without standby power supplies. If
                    the mains supply fails, the alarms do not operate. Grade E provides a lower
                    level of protection than Grade D and is generally not recommended for new
                    installations because the backup battery in Grade D devices costs very little
                    extra and provides essential protection during power cuts.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-xl mb-1">Grade F</h3>
                  <p className="text-white text-sm leading-relaxed">
                    A system of one or more battery-powered fire alarm devices with no connection to
                    the mains supply. This is the simplest and cheapest option — standalone battery
                    smoke alarms. Grade F meets the minimum legal requirement for existing rented
                    properties in England (the 2022 regulations do not specify a grade) but provides
                    the lowest level of protection. The alarms are not interlinked, and the
                    batteries require regular checking and replacement (sealed lithium batteries
                    with 10-year life are recommended).
                  </p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'bs5839-categories',
          heading: 'Categories — LD1, LD2, LD3 Coverage',
          content: (
            <>
              <p>
                BS 5839-6 uses the LD (Life safety Detection) category system to define the extent
                of detection coverage. The category determines where detectors are placed within the
                property.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-yellow-400 text-2xl mb-1">LD3</h3>
                  <h4 className="font-bold text-white mb-3">Escape Route Protection</h4>
                  <p className="text-white text-sm leading-relaxed">
                    Detectors in all circulation spaces that form part of the escape route —
                    hallways, landings, and staircases. LD3 provides the minimum level of coverage,
                    warning occupants of fire in the escape route so they can evacuate. It does not
                    detect fires originating in rooms before they spread to the circulation space.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-2xl mb-1">LD2</h3>
                  <h4 className="font-bold text-white mb-3">Escape Routes + High-Risk Rooms</h4>
                  <p className="text-white text-sm leading-relaxed">
                    Detectors in all circulation spaces (as LD3) plus rooms that present a higher
                    fire risk — typically the kitchen and the principal living room.{' '}
                    <strong className="text-yellow-400">LD2 is the minimum for new builds</strong>{' '}
                    under Building Regulations Approved Document B. It provides earlier warning of
                    fire than LD3 by detecting fires in the rooms where they are most likely to
                    start.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-yellow-400 text-2xl mb-1">LD1</h3>
                  <h4 className="font-bold text-white mb-3">Full Coverage — All Rooms</h4>
                  <p className="text-white text-sm leading-relaxed">
                    Detectors in all rooms, including bedrooms, living rooms, kitchen, dining room,
                    and any other habitable room, plus all circulation spaces. LD1 provides the
                    highest level of protection with the earliest possible warning of fire in any
                    location. Required in Scotland for all homes.
                  </p>
                </div>
              </div>
              <p>
                The combination of Grade and Category defines the complete system specification. For
                example, "Grade D Category LD2" means mains-powered, interlinked detectors in
                circulation spaces and high-risk rooms — this is the Building Regulations minimum
                for new builds in England. "Grade A Category LD1" would be a full fire alarm panel
                system with detection in every room — this might be specified for a large HMO or
                sheltered housing scheme.
              </p>
            </>
          ),
        },
        {
          id: 'interlinked',
          heading: 'Interlinked Alarms — Why and How',
          content: (
            <>
              <p>
                Interlinking means that when any one alarm in the system detects fire, all alarms in
                the property sound simultaneously. This is critical for occupant safety — a smoke
                alarm sounding only in the kitchen may not be heard by someone asleep in an upstairs
                bedroom with the door closed. Interlinked alarms ensure the warning is heard
                throughout the property regardless of where the fire originates.
              </p>
              <p>There are three methods of interlinking:</p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Hardwired interlinking</strong> — A
                      dedicated interconnect cable (typically 3-core-and-earth) runs between all
                      alarm positions. When one alarm activates, it sends a signal along the
                      interconnect wire to trigger all other alarms. This is the traditional method
                      for Grade C systems and provides reliable, interference-free communication.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Radio frequency (wireless) interlinking
                      </strong>{' '}
                      — Each alarm contains a radio transmitter and receiver. When one alarm
                      activates, it broadcasts a signal to all other alarms in the system,
                      triggering them to sound. Modern RF-interlinked alarms are reliable and
                      significantly faster to install than hardwired systems — no interconnect cable
                      is needed, only a mains supply to each alarm position.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Mixed (hardwire and wireless)</strong> —
                      Some systems support both methods, allowing new wireless alarms to be added to
                      an existing hardwired system. This is useful when extending or upgrading an
                      existing installation.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Interlinking is required for Grade A, B, C, and D systems under BS 5839-6. It is not
                required for Grade E or F (standalone) alarms, although interlinked Grade F battery
                alarms are available and recommended. Building Regulations require interlinking for
                new builds (Grade D minimum), and Scotland requires interlinking in all homes.
              </p>
            </>
          ),
        },
        {
          id: 'hardwired-vs-battery',
          heading: 'Hard-Wired vs Battery Alarms',
          content: (
            <>
              <p>
                The choice between mains-powered (hard-wired) and battery-only alarms depends on the
                situation — new build vs existing property, regulatory requirements, budget, and
                practical considerations.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">
                    Mains-Powered (Grade C/D)
                  </h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    Connected to the mains electricity supply with an integral backup battery (Grade
                    D) or shared standby supply (Grade C). Provides reliable, continuous power
                    without the need for battery replacement. The backup battery ensures operation
                    during power cuts — typically providing 72 hours of standby.
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    <strong className="text-white">Required for:</strong> New builds (Building
                    Regulations), material alterations, and recommended for landlord properties.{' '}
                    <strong className="text-white">Installation:</strong> Requires a mains supply to
                    each alarm position — this involves running cables and may require surface
                    wiring or lifting floorboards in existing properties.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">Battery-Only (Grade F)</h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    Powered entirely by batteries — either replaceable alkaline batteries (which
                    need changing annually) or sealed lithium batteries with a 10-year life. No
                    mains connection required. Quick and easy to install — simply screw the base
                    plate to the ceiling and clip the alarm on.
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    <strong className="text-white">Suitable for:</strong> Existing rented properties
                    meeting minimum legal requirements, properties where mains wiring is
                    impractical, and as a temporary measure.{' '}
                    <strong className="text-white">Limitation:</strong> Relies entirely on battery
                    power — if the battery fails and is not replaced, the alarm provides no
                    protection.
                  </p>
                </div>
              </div>
              <p>
                For professional electricians, mains-powered installations are the recommended
                approach. The{' '}
                <SEOInternalLink href="/guides/part-p-building-regulations">
                  Part P notification
                </SEOInternalLink>{' '}
                requirement applies if new permanent wiring is installed for the alarm system. A
                Minor Works Certificate covers the electrical work for adding mains-powered alarms
                to an existing installation.
              </p>
            </>
          ),
        },
        {
          id: 'scotland',
          heading: 'Scottish Smoke Alarm Requirements',
          content: (
            <>
              <p>
                Scotland has the most stringent smoke alarm requirements in the UK. Since 1 February
                2022, all homes in Scotland — whether owner-occupied, privately rented, or social
                housing — must comply with the tolerable standard, which requires:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">
                  Scottish Requirements (All Homes)
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        One smoke alarm in the living room
                      </strong>{' '}
                      — (or the room you use most). An optical smoke alarm is recommended for living
                      areas due to lower susceptibility to false alarms from cooking.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        One smoke alarm in every hallway and landing
                      </strong>{' '}
                      — Covering all circulation spaces and escape routes. Optical or ionisation
                      types are both suitable.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">One heat alarm in the kitchen</strong> —
                      Heat alarms (not smoke alarms) are specified for kitchens to reduce false
                      alarms from cooking. The heat alarm should be mounted on the ceiling, ideally
                      within 1.5m of the cooking appliance.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">All alarms must be interlinked</strong> —
                      All smoke alarms and the kitchen heat alarm must be interlinked (hardwired or
                      wireless) so that activation of any alarm triggers all alarms to sound.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Carbon monoxide alarm</strong> — A CO
                      alarm is required in any room with a carbon-fuelled appliance (gas boiler,
                      wood burner, open fire, etc.).
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                The Scottish requirements are broadly equivalent to BS 5839-6 Grade D Category LD2,
                with the addition of a living room detector (which pushes it closer to LD1 in
                practice). The legislation applies to all homes regardless of tenure, which makes
                Scotland the only part of the UK where owner-occupied properties have a legal smoke
                alarm obligation.
              </p>
            </>
          ),
        },
        {
          id: 'landlord',
          heading: 'Landlord Obligations',
          content: (
            <>
              <p>
                Landlords in England have specific legal obligations regarding smoke and carbon
                monoxide alarms under the Smoke and Carbon Monoxide Alarm (Amendment) Regulations
                2022. Failure to comply can result in a fine of up to £5,000.
              </p>
              <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5 my-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-2">Landlord Legal Requirements</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Landlords must ensure that at least one smoke alarm is installed on each
                      storey with a habitable room, and a carbon monoxide alarm is installed in any
                      room with a fixed combustion appliance (excluding gas cookers). The alarms
                      must be in working order at the start of each new tenancy. The landlord has a
                      duty to repair or replace faulty alarms when reported by the tenant. Local
                      authorities can impose a fine of up to £5,000 for non-compliance.
                    </p>
                  </div>
                </div>
              </div>
              <p>
                While the regulations specify only the minimum (which can be met with standalone
                battery alarms), the recommended approach for landlords is to install mains-powered,
                interlinked alarms complying with BS 5839-6 Grade D Category LD2. This exceeds the
                minimum requirement but provides significantly better protection and reduces the
                risk of battery-related failures and tenant complaints. For HMOs (Houses in Multiple
                Occupation), additional requirements apply under HMO licensing conditions —
                typically a Grade A or Grade D system to LD2 or LD1 category.
              </p>
              <p>
                During an{' '}
                <SEOInternalLink href="/guides/eicr-certificate">EICR inspection</SEOInternalLink>{' '}
                of a rented property, the condition of the smoke and carbon monoxide alarm system
                should be recorded, even though it is not technically part of the fixed electrical
                installation. Many landlords expect the electrician carrying out the EICR to also
                check the alarm system compliance.
              </p>
            </>
          ),
        },
        {
          id: 'new-builds',
          heading: 'New Build Requirements — Building Regulations Part B',
          content: (
            <>
              <p>
                Building Regulations Approved Document B (Fire Safety) sets out the fire detection
                and alarm requirements for new-build properties and material alterations to existing
                properties. The current requirements for new dwellings are:
              </p>
              <ul className="space-y-2 my-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Minimum Grade D Category LD2</strong> —
                    Mains-powered interlinked detectors with integral standby supply, covering all
                    circulation spaces (hallways, landings, stairwells) and high-risk rooms
                    (kitchen, principal habitable room).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Heat detector in the kitchen</strong> — A heat
                    alarm (not a smoke alarm) should be used in the kitchen to reduce false alarms.
                    Multi-sensor alarms that combine optical smoke and heat detection are an
                    alternative.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">CO alarm</strong> — Carbon monoxide alarms are
                    required in rooms with combustion appliances as per the 2022 regulations.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Material alterations</strong> — Work that
                    constitutes a "material alteration" (such as a loft conversion, an extension, or
                    structural modifications) triggers the same requirements as new build for the
                    altered area, and may require upgrading the alarm system for the entire
                    property.
                  </span>
                </li>
              </ul>
              <p>
                The Building Regulations requirements apply to new builds in England and Wales.
                Scotland has its own Building Standards, which require a Grade D Category LD2 system
                as a minimum in new-build domestic properties, with enhanced provisions for
                three-storey dwellings and open-plan layouts.
              </p>
            </>
          ),
        },
        {
          id: 'installation-practice',
          heading: 'Installation Best Practice',
          content: (
            <>
              <p>
                Correct positioning and installation of smoke and heat alarms is critical for
                reliable detection. BS 5839-6 provides detailed guidance on alarm placement:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Alarm Placement Guidelines</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Ceiling-mounted</strong> — Alarms should
                      be mounted on the ceiling, at least 300mm from any wall or light fitting. If
                      ceiling mounting is not possible, wall mounting is permitted provided the top
                      of the alarm is between 150mm and 300mm below the ceiling.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Avoid dead air spaces</strong> — Do not
                      mount alarms in the apex of a pitched ceiling or at the peak of a stairwell
                      where hot air can create a dead air space that smoke does not penetrate
                      effectively.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Hallways and landings</strong> — Position
                      the alarm centrally in the circulation space, or at the point closest to the
                      bedrooms if the hallway is long or L-shaped. On landings, position the alarm
                      between the bedroom doors and the stairwell.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Kitchen heat alarms</strong> — Mount
                      within 1.5 metres of the cooking appliance but not directly above it. The heat
                      alarm responds to temperature rather than smoke, reducing false alarms from
                      cooking.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Avoid locations prone to false alarms
                      </strong>{' '}
                      — Do not position smoke alarms directly outside bathrooms (steam), in garages
                      (vehicle exhaust), or in dusty environments (workshops). Use heat alarms or
                      multi-sensor alarms in these locations.
                    </span>
                  </li>
                </ul>
              </div>
              <SEOAppBridge
                title="Fire Alarm Certificate in Elec-Mate"
                description="Elec-Mate's Fire Alarm Certificate covers domestic smoke alarm installations to BS 5839-6. Record the system grade and category, detector types and locations, interlinking method, and test results. The AI Installation Specialist provides guidance on alarm placement for any property layout."
                icon={FileText}
              />
            </>
          ),
        },
      ]}
      howToHeading="How to Install a Domestic Smoke Alarm System — Step-by-Step"
      howToDescription="A step-by-step guide to installing a mains-powered, interlinked smoke alarm system in a domestic property to BS 5839-6."
      howToSteps={[
        {
          name: 'Assess the property and determine the system specification',
          text: 'Survey the property — number of storeys, room layout, existing alarm system (if any), and any combustion appliances requiring CO alarms. Determine the required grade and category based on the applicable regulations: Grade D Category LD2 minimum for new builds, or the appropriate specification for existing and rented properties. Identify detector positions for each room and circulation space.',
        },
        {
          name: 'Select the alarm equipment',
          text: 'Choose the alarm manufacturer and model range. Decide on interlinking method — hardwired (3-core-and-earth cable between all positions) or wireless RF interlinking (mains supply only, no interconnect cable). Select detector types: optical smoke alarms for circulation spaces and living rooms, heat alarms for kitchens, and multi-sensor alarms where appropriate. Ensure all devices are from the same manufacturer range for interlink compatibility.',
        },
        {
          name: 'Install the mains supply and interlinking',
          text: 'For hardwired systems, run the mains supply and 3-core-and-earth interconnect cable to each alarm position. For wireless RF systems, run a mains supply cable to each alarm position (no interconnect cable needed). The mains supply is typically taken from the lighting circuit — this ensures the alarms lose power only if the lighting circuit trips, which is immediately obvious to the occupants. Use a dedicated, unswitched fused connection unit (3A fuse) to protect the alarm supply.',
        },
        {
          name: 'Mount and connect the alarms',
          text: 'Fix the alarm base plates to the ceiling at the correct positions. Connect the mains supply and interconnect wires to each base plate. Clip each alarm unit onto its base plate. For wireless systems, follow the manufacturer pairing procedure to register each alarm with the network.',
        },
        {
          name: 'Test the system',
          text: 'Test each alarm individually by pressing the test button — verify that it sounds locally. Test the interlinking by activating each alarm in turn and confirming that all other alarms in the system sound simultaneously. Test the standby battery by switching off the mains supply and verifying that the alarms remain operational. Record all test results.',
        },
        {
          name: 'Certify and hand over',
          text: 'Complete the Fire Alarm Certificate documenting the system grade, category, detector types and locations, interlinking method, and test results. If new mains wiring was installed, complete a Minor Works Certificate for the electrical work. Demonstrate the system to the homeowner or tenant, explain the testing procedure (monthly test button press), and provide the manufacturer documentation.',
        },
      ]}
      faqs={[
        {
          question: 'Do smoke alarms need to be interlinked by law?',
          answer:
            'In England, the Smoke and Carbon Monoxide Alarm Regulations 2022 do not specifically require interlinking — the legal minimum can be met with standalone battery alarms. However, Building Regulations Approved Document B requires interlinked alarms (Grade D minimum) for new builds and material alterations. In Scotland, all homes (owned and rented) must have interlinked alarms since February 2022 — this is a legal requirement under the tolerable standard. In Wales, new builds require interlinked alarms under Building Regulations. For existing rented properties in England, interlinking is strongly recommended by BS 5839-6 even though it is not a legal requirement. Most professional electricians and fire safety advisers recommend interlinked systems in all properties — the additional cost is modest and the safety benefit is substantial.',
        },
        {
          question: 'What is the difference between a smoke alarm and a heat alarm?',
          answer:
            'A smoke alarm detects the presence of smoke particles in the air. There are two main types: optical (also called photoelectric) alarms, which use a light beam and sensor to detect smoke particles, and ionisation alarms, which use a small radioactive source to detect smoke. Optical alarms are better at detecting slow, smouldering fires (soft furnishings, overheating cables) while ionisation alarms respond faster to fast-flaming fires. A heat alarm detects a rise in temperature rather than the presence of smoke. It does not respond to smoke, steam, or cooking fumes, making it the correct choice for kitchens where smoke alarms would cause frequent false alarms. Heat alarms are available in two types: fixed temperature (triggers at a specific temperature, typically 58 degrees Celsius) and rate-of-rise (triggers when the temperature increases rapidly). Heat alarms are slower to respond to fire than smoke alarms, which is why they are used only in kitchens and garages — never as the sole detection in bedrooms or circulation spaces.',
        },
        {
          question: 'Can I use wireless interlinked alarms instead of hardwired?',
          answer:
            'Yes. BS 5839-6 permits both hardwired and wireless (radio frequency) interlinking for Grade D systems. Modern wireless interlinked alarms from reputable manufacturers (such as Aico, Kidde, and FireAngel) are reliable and meet the requirements of BS 5839-6. Wireless interlinking is significantly faster to install in existing properties because there is no need to run an interconnect cable between alarm positions — only a mains supply to each alarm. This is particularly beneficial in finished properties where running cables would involve lifting floorboards or surface wiring. For new builds where first-fix cabling is straightforward, hardwired interlinking remains a valid and slightly lower-cost option. Some systems support mixed operation — hardwired interlinking between accessible positions and wireless interlinking to more difficult positions.',
        },
        {
          question: 'How often should smoke alarms be tested and replaced?',
          answer:
            "Smoke alarms should be tested monthly by pressing the test button on each alarm — this verifies that the sounder, battery, and (for interlinked systems) the communication link are all functioning. The test should be carried out by the occupant, not just at the annual landlord inspection. BS 5839-6 recommends that smoke alarms and heat alarms are replaced every 10 years, regardless of whether they appear to be functioning correctly. Over time, the sensor sensitivity degrades due to dust accumulation, ageing of electronic components, and (for ionisation alarms) decay of the radioactive source. Many modern alarms have a 10-year sealed lithium battery and are designed to be replaced as a complete unit at the end of the battery life. CO alarms have a shorter lifespan — typically 5-7 years — and must be replaced according to the manufacturer's stated lifespan.",
        },
        {
          question: 'What type of smoke alarm should I use in each room?',
          answer:
            'BS 5839-6 recommends different detector types for different locations based on the likely fire type and the risk of false alarms. For hallways and landings, an optical smoke alarm is the standard choice — it responds well to smouldering fires and is not prone to false alarms in circulation spaces. For living rooms and bedrooms, an optical smoke alarm is recommended. For kitchens, a heat alarm (not a smoke alarm) is recommended to avoid false alarms from cooking. Multi-sensor alarms, which combine optical smoke and heat detection with intelligent algorithms, are increasingly popular and can be used in most locations including kitchens (in smoke-and-heat mode) with reduced false alarm rates. For garages and utility rooms, a heat alarm is recommended due to the risk of false alarms from dust, vehicle exhaust, and other contaminants. CO alarms should be positioned in rooms with combustion appliances, at head height (or ceiling-mounted, following the manufacturer instructions).',
        },
        {
          question: 'Is installing smoke alarms notifiable under Part P?',
          answer:
            'It depends on the scope of the work. Installing battery-only smoke alarms does not involve any fixed wiring and is not notifiable. Installing mains-powered smoke alarms that use new permanent wiring is minor electrical installation work and may be covered by a Minor Works Certificate. It is generally not notifiable under Part P unless it involves work in a special location (bathroom, swimming pool area) or is part of a larger notifiable project (such as a kitchen or bathroom refit, or a new build). If the smoke alarm installation is part of a new-build project or a material alteration, it falls within the scope of the overall Part P notification for that project. When in doubt, check with your Competent Person Scheme. The important thing is to issue the appropriate electrical certificate (Minor Works or EIC) for the mains wiring work.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/fire-alarm-certificate',
          title: 'Fire Alarm Certificate',
          description: 'Complete fire alarm certificates to BS 5839 in Elec-Mate.',
          icon: FileText,
          category: 'Certification',
        },
        {
          href: '/guides/eicr-certificate',
          title: 'EICR Certificate',
          description: 'Capture smoke alarm condition during periodic inspection.',
          icon: ClipboardCheck,
          category: 'Certification',
        },
        {
          href: '/guides/part-p-building-regulations',
          title: 'Part P Building Regulations',
          description: 'When is smoke alarm installation notifiable?',
          icon: ShieldCheck,
          category: 'Regulations',
        },
        {
          href: '/guides/minor-works-certificate',
          title: 'Minor Works Certificate',
          description: 'Certifying mains-powered smoke alarm installations.',
          icon: FileText,
          category: 'Certification',
        },
        {
          href: '/guides/consumer-unit-regulations',
          title: 'Consumer Unit Regulations',
          description: 'Consumer unit requirements including alarm circuit protection.',
          icon: Zap,
          category: 'Regulations',
        },
        {
          href: '/guides/eicr-for-landlords',
          title: 'EICR for Landlords',
          description: 'Landlord electrical safety obligations including smoke alarms.',
          icon: Home,
          category: 'Guide',
        },
      ]}
      ctaHeading="Certify Smoke Alarm Installations With Confidence"
      ctaSubheading="Fire Alarm Certificates, EICR forms, Minor Works, and AI Installation Specialist guidance — all in Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
