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
  Bell,
  ClipboardCheck,
  Brain,
  Scale,
  Shield,
  Flame,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Smoke Alarm Regs', href: '/guides/smoke-alarm-regulations-2022' },
];

const tocItems = [
  { id: 'overview', label: 'What Changed in 2022?' },
  { id: 'requirements', label: 'Key Requirements' },
  { id: 'who-must-comply', label: 'Who Must Comply?' },
  { id: 'alarm-types', label: 'Alarm Types and Standards' },
  { id: 'interlinked-alarms', label: 'Interlinked Alarms Explained' },
  { id: 'carbon-monoxide', label: 'Carbon Monoxide Alarms' },
  { id: 'installation-guidance', label: 'Installation Guidance' },
  { id: 'enforcement', label: 'Enforcement and Penalties' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022 came into force on 1 October 2022 and apply to all privately rented properties in England.',
  'Landlords must ensure at least one smoke alarm on every storey with a habitable room, and a carbon monoxide alarm in any room with a fixed combustion appliance (excluding gas cookers).',
  'From 1 October 2022, landlords must repair or replace faulty alarms once notified by the tenant — the "repair or replace" duty is new.',
  'Interlinked alarms (wired or radio-frequency) are strongly recommended by guidance but not yet legally mandated for existing installations in England.',
  'Elec-Mate helps electricians document fire alarm installations and look up the latest regulations through its AI assistant and certificate tools.',
];

const faqs = [
  {
    question: 'Do smoke alarms have to be interlinked in rented properties?',
    answer:
      'The Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022 for England require smoke alarms on every storey with a habitable room, but do not specifically require those alarms to be interlinked. However, the accompanying government guidance strongly recommends interlinked alarms, and for new-build properties, Building Regulations Approved Document B already requires interlinked alarms. In Scotland, the Housing (Scotland) Act 2006 and the associated Tolerable Standard (updated February 2022) do require interlinked alarms in all homes — including owner-occupied properties. This is a legally binding requirement in Scotland. For HMOs (Houses in Multiple Occupation) in England, the licensing conditions typically require a mains-wired, interlinked fire detection system to BS 5839-6 Grade A or Grade D Category LD2, depending on the property layout. The practical recommendation is clear: interlinked alarms save lives by alerting all occupants simultaneously, and the direction of travel is towards making them mandatory in all rented properties across the UK.',
  },
  {
    question: 'Do I need a carbon monoxide alarm in every room?',
    answer:
      'No. Under the 2022 Regulations, a carbon monoxide (CO) alarm is required in any room that contains a fixed combustion appliance — this includes gas boilers, gas fires, oil-fired boilers, wood-burning stoves, open fires, and solid fuel appliances. Gas cookers are explicitly excluded from this requirement, although fitting a CO alarm in a kitchen with a gas cooker is still good practice. The CO alarm must comply with BS EN 50291-1 and should be positioned at head height or on the ceiling, between 1 and 3 metres from the combustion appliance. For rooms with a flued gas boiler (such as a combi boiler in a utility room or kitchen), a CO alarm is required. For boilers in sealed compartments or cupboards, the alarm should be positioned in the room outside the compartment where occupants would be present. If the property has no fixed combustion appliances at all (fully electric heating, electric hob, and electric oven), CO alarms are not required under the regulations.',
  },
  {
    question: 'What happens if a landlord does not comply with the 2022 smoke alarm regulations?',
    answer:
      'If a landlord fails to comply with the Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022, the local authority can serve a remedial notice requiring the landlord to install or repair alarms within 28 days. If the landlord fails to comply with the remedial notice, the local authority can arrange the work themselves and recover the costs from the landlord, and can issue a civil penalty of up to £5,000 for a first offence. Repeat offences can attract higher penalties. The local authority can also take non-compliance into account when assessing the property under the Housing Health and Safety Rating System (HHSRS), potentially leading to further enforcement action including improvement notices or prohibition orders. Non-compliance can also affect the landlord ability to serve a valid Section 21 eviction notice. In practice, the cost of compliance is minimal — smoke alarms and CO alarms are inexpensive and straightforward to fit — so there is no reasonable excuse for non-compliance.',
  },
  {
    question: 'Can battery-only smoke alarms be used in rented properties?',
    answer:
      'The 2022 Regulations for England do not specify that smoke alarms must be mains-wired — battery-operated alarms with sealed long-life lithium batteries (10-year lifespan) are acceptable for compliance in existing rented properties. However, for new installations or significant renovations where Building Regulations apply, Approved Document B requires mains-wired alarms with battery backup, interlinked throughout the property. For HMOs, the licensing conditions typically require mains-wired, interlinked systems to BS 5839-6 — battery-only alarms would not meet the HMO licensing standard. In Scotland, the Tolerable Standard requires sealed-battery or mains-wired alarms that are interlinked (radio-frequency interlinking is acceptable). The practical advice for landlords is: mains-wired, interlinked alarms with battery backup are the gold standard. They are more reliable, eliminate the risk of tenants removing batteries, and future-proof the property against tightening regulations. For electricians, recommending mains-wired interlinked alarms creates more installation work and provides a better service to the client.',
  },
  {
    question: 'What is the difference between LD1, LD2, and LD3 fire detection categories?',
    answer:
      'These categories come from BS 5839-6 (the code of practice for fire detection and fire alarm systems in domestic premises). LD3 is the minimum level — it provides protection to escape routes only (hallways, stairs, and landings). LD2 extends protection to escape routes plus high-risk rooms (kitchens, living rooms where the main fire risk exists). LD1 is the highest level — it provides protection throughout the entire dwelling, including all rooms where a fire could start (bedrooms, living rooms, kitchens, utility rooms, loft spaces). For rented properties in England, the 2022 Regulations effectively require LD3 coverage as a minimum (a smoke alarm on every storey with a habitable room), with additional CO alarms where combustion appliances are present. For HMOs, licensing conditions typically require LD2 or LD1 depending on the property size and layout. For new-build properties, Building Regulations Approved Document B requires LD2 as a minimum. The IET Wiring Regulations (BS 7671) do not specify fire detection categories — they defer to BS 5839-6 for the detailed requirements.',
  },
  {
    question: 'Are the smoke alarm regulations different in Scotland?',
    answer:
      'Yes, significantly. Scotland introduced the most stringent smoke alarm requirements in the UK. From February 2022, the Tolerable Standard (part of the Housing (Scotland) Act 2006) requires all homes in Scotland — including owner-occupied, not just rented — to have interlinked fire detection. The specific requirements are: one smoke alarm in the living room (or the room most frequently used during the day), one smoke alarm in every circulation space on each storey (hallway, landing), one heat alarm in the kitchen, and one carbon monoxide alarm in every room with a carbon-burning appliance (including gas boilers and fires). All alarms must be interlinked so that when one activates, they all sound. The alarms can be mains-wired with battery backup or sealed long-life battery units with radio-frequency interlinking. This applies to all Scottish homes regardless of tenure. England has not yet matched this level of requirement, but the direction of travel suggests similar provisions may come in future.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/fire-alarm-certificate',
    title: 'Fire Alarm Certificate',
    description:
      'Create BS 5839-6 compliant fire alarm certificates on your phone with professional PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/notifiable-electrical-work',
    title: 'Notifiable Electrical Work',
    description:
      'Which electrical work requires Part P notification and how competent person schemes operate.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete overview of the IET Wiring Regulations with amendment history and key requirements.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Legal requirements, penalties, and deadlines for landlord electrical inspections in England.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/guides/competent-person-scheme-electrical',
    title: 'Competent Person Schemes',
    description:
      'NICEIC, NAPIT, ELECSA, and BRE registration — how to self-certify notifiable work.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Structured training for C&G 2391 covering all aspects of periodic inspection and testing.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'What Changed with the 2022 Smoke Alarm Regulations?',
    content: (
      <>
        <p>
          The Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022 came into force on 1
          October 2022. They amend the original 2015 Regulations and introduce two significant
          changes for landlords of privately rented properties in England.
        </p>
        <p>
          First, they extend the carbon monoxide alarm requirement. Under the 2015 Regulations, CO
          alarms were only required in rooms with a solid fuel appliance (wood burner, open fire).
          The 2022 amendment expands this to cover any room with a{' '}
          <strong>fixed combustion appliance</strong> — including gas boilers, gas fires, and
          oil-fired appliances. Gas cookers remain excluded, but every other fuel-burning appliance
          now requires a CO alarm in the same room.
        </p>
        <p>
          Second, they introduce a <strong>repair or replace duty</strong>. Under the original 2015
          Regulations, landlords had to ensure alarms were installed and working at the start of
          each tenancy but had no ongoing obligation during the tenancy. The 2022 amendment changes
          this: once a tenant notifies the landlord that an alarm is faulty, the landlord must
          repair or replace it. This creates an ongoing duty throughout the tenancy, not just a
          check-in obligation.
        </p>
        <p>
          These changes bring England closer to the more comprehensive requirements already in place
          in Scotland, where interlinked alarms are mandatory in all homes. For electricians, the
          2022 changes create additional work — particularly in fitting CO alarms to properties with
          gas boilers that previously did not require them.
        </p>
      </>
    ),
  },
  {
    id: 'requirements',
    heading: 'Key Requirements Under the 2022 Regulations',
    content: (
      <>
        <p>
          The combined effect of the original 2015 Regulations and the 2022 Amendment creates the
          following requirements for landlords in England:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smoke alarm on every storey.</strong> At least one smoke alarm must be
                installed on every storey of the property that contains a habitable room. This
                includes the ground floor, first floor, and any converted loft space used as a
                bedroom or living area. The alarm should be positioned in the circulation space
                (hallway or landing) unless the storey has no circulation space, in which case it
                should be in the main habitable room.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Carbon monoxide alarm in rooms with combustion appliances.</strong> A CO
                alarm must be fitted in any room containing a fixed combustion appliance — gas
                boilers, gas fires, oil boilers, wood burners, solid fuel stoves, and open fires.
                Gas cookers are excluded. The alarm must comply with BS EN 50291-1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Alarms must be working at the start of each tenancy.</strong> The landlord
                must test all smoke and CO alarms on the day the tenancy begins (or have evidence
                they were tested). This should be recorded — a simple check-in inventory note is
                sufficient.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Repair or replace duty (new in 2022).</strong> If a tenant reports that a
                smoke or CO alarm is faulty, the landlord must repair or replace it. This is an
                ongoing duty throughout the tenancy — not just at the start.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The regulations do not specify the exact type of smoke alarm (ionisation, optical, or
          multi-sensor) or whether it must be mains-wired. However, the government guidance
          recommends optical or multi-sensor alarms (which are less prone to nuisance tripping from
          cooking) and mains-wired units with battery backup where possible.
        </p>
      </>
    ),
  },
  {
    id: 'who-must-comply',
    heading: 'Who Must Comply?',
    content: (
      <>
        <p>The Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022 apply to:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>All private landlords in England</strong> with assured shorthold tenancies,
                assured tenancies, and regulated tenancies. This covers the vast majority of private
                rented housing in England.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Registered social housing providers</strong> — from 1 October 2022, the
                regulations were extended to cover social housing for the first time. Housing
                associations and council properties must now comply with the same requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO landlords</strong> — Houses in Multiple Occupation already have fire
                detection requirements under HMO licensing conditions, but the 2022 Regulations
                apply as an additional layer. HMO licensing typically requires a higher standard
                (mains-wired, interlinked, to{' '}
                <SEOInternalLink href="/tools/fire-alarm-certificate">BS 5839-6</SEOInternalLink>
                ).
              </span>
            </li>
          </ul>
        </div>
        <p>
          The regulations do not apply to owner-occupied homes (in England), long leases of 21 years
          or more, or live-in landlords with lodgers. However, Building Regulations (Approved
          Document B) require smoke detection in all new-build homes regardless of tenure, and the
          government strongly recommends that all homeowners install smoke and CO alarms.
        </p>
        <p>
          In Scotland, the Tolerable Standard applies to all homes regardless of whether they are
          rented or owner-occupied — this is a key distinction from the English regulations.
        </p>
      </>
    ),
  },
  {
    id: 'alarm-types',
    heading: 'Alarm Types and British Standards',
    content: (
      <>
        <p>Smoke alarms and CO alarms must comply with the relevant British Standards:</p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Bell className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Smoke Alarms — BS EN 14604</h4>
                <p className="text-white text-sm leading-relaxed">
                  All smoke alarms must comply with BS EN 14604. There are three main sensor types:
                  <strong> Ionisation</strong> — fast response to flaming fires but prone to
                  nuisance tripping from cooking. <strong> Optical (photoelectric)</strong> — better
                  at detecting slow, smouldering fires and less prone to cooking false alarms.
                  <strong> Multi-sensor</strong> — combines optical and heat sensing for the best
                  all-round detection with minimal false alarms. Government guidance recommends
                  optical or multi-sensor alarms for rented properties.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Heat Alarms — BS 5446-2</h4>
                <p className="text-white text-sm leading-relaxed">
                  Heat alarms respond to temperature rise rather than smoke particles. They are
                  designed for kitchens and garages where smoke alarms would cause frequent false
                  alarms from cooking or vehicle exhaust. Heat alarms are not a substitute for smoke
                  alarms in circulation spaces — they are slower to respond to fire and only trigger
                  when the temperature reaches approximately 58 degrees Celsius. In Scotland, a heat
                  alarm in the kitchen is a legal requirement.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">CO Alarms — BS EN 50291-1</h4>
                <p className="text-white text-sm leading-relaxed">
                  Carbon monoxide alarms must comply with BS EN 50291-1. They use electrochemical
                  sensors to detect CO gas. Position the alarm at head height on a wall or on the
                  ceiling, between 1 and 3 metres horizontally from the combustion appliance. CO
                  alarms have a limited sensor life (typically 5 to 7 years) and must be replaced
                  when they reach end of life, even if the battery is still good. Check the expiry
                  date on the unit.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          For mains-wired smoke alarm systems in domestic premises, the design and installation
          should follow{' '}
          <SEOInternalLink href="/guides/bs5839-fire-alarm-standard">BS 5839-6</SEOInternalLink>{' '}
          (the code of practice for fire detection and fire alarm systems in domestic premises).
          This standard covers system grades (A to F), categories (LD1, LD2, LD3), positioning,
          wiring, interlinking, and testing.
        </p>
      </>
    ),
  },
  {
    id: 'interlinked-alarms',
    heading: 'Interlinked Alarms: What They Are and Why They Matter',
    content: (
      <>
        <p>
          Interlinked alarms are connected so that when one alarm detects smoke, heat, or CO, all
          alarms in the system sound simultaneously. This ensures that occupants anywhere in the
          property are alerted immediately — even if the fire starts on a different floor or in a
          room with the door closed.
        </p>
        <p>There are two methods of interlinking:</p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Hard-Wired Interlinking</h3>
            <p className="text-white text-sm leading-relaxed">
              A dedicated interconnect wire runs between all alarms — typically a 3-core and earth
              cable where the third core carries the alarm signal. When one unit triggers, it sends
              a signal down the interconnect wire to activate all other units. This is the most
              reliable method and is required for new-build installations under Building
              Regulations. It requires cabling to be run between alarm locations, which can be
              disruptive in existing properties.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Radio-Frequency (RF) Interlinking</h3>
            <p className="text-white text-sm leading-relaxed">
              RF-interlinked alarms communicate wirelessly. Each alarm has a built-in radio
              transmitter and receiver. When one unit triggers, it sends a radio signal to all other
              paired units, which then sound their own sirens. RF interlinking is ideal for
              retrofitting existing properties because no interconnect cabling is needed. The alarms
              can be battery-powered (sealed lithium, 10-year life) or mains-wired with RF
              interlinking for the alarm signal.
            </p>
          </div>
        </div>
        <p>
          In England, the 2022 Regulations do not mandate interlinking for existing rented
          properties, but the government guidance strongly recommends it. In Scotland, interlinked
          alarms are a legal requirement in all homes. The direction of travel across the UK is
          clear: interlinked alarms will eventually be required everywhere.
        </p>
        <p>
          For electricians, recommending and installing interlinked alarm systems in rented
          properties is both a safety improvement and a revenue opportunity. A full interlinked
          system (smoke alarms in hallways and landings, heat alarm in the kitchen, CO alarm at
          boiler) typically costs £200 to £500 installed — a straightforward job that can be
          completed in under 2 hours.
        </p>
        <SEOAppBridge
          title="Look up fire alarm regulations instantly"
          description="Use Elec-Mate's AI regulations assistant to check smoke alarm, heat alarm, and CO alarm requirements for any property type — rented, HMO, new-build, or owner-occupied. Get the correct BS 5839-6 category and grade in seconds."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'carbon-monoxide',
    heading: 'Carbon Monoxide Alarms: The 2022 Extension',
    content: (
      <>
        <p>
          The most significant change in the 2022 Amendment is the extension of the carbon monoxide
          alarm requirement. Before October 2022, CO alarms were only legally required in rooms with
          solid fuel appliances — wood burners, open fires, and coal fires. The 2022 Amendment
          extends this to all fixed combustion appliances, with the sole exception of gas cookers.
        </p>
        <p>This means that the following now require a CO alarm in the room:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gas boilers</strong> — both combi and system boilers, in any location
                (kitchen, utility room, airing cupboard, garage). This is the biggest change: most
                rented properties with a gas boiler now need a CO alarm where they previously did
                not.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gas fires</strong> — wall-mounted, freestanding, or inset gas fires in
                living rooms or bedrooms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Oil-fired boilers</strong> — common in rural properties without mains gas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wood-burning stoves and open fires</strong> — already covered under the 2015
                Regulations, now confirmed under the 2022 Amendment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Carbon monoxide is odourless and colourless. It kills approximately 60 people per year in
          the UK and sends a further 4,000 to hospital. A faulty boiler flue, a blocked chimney, or
          a poorly maintained gas fire can produce lethal levels of CO within hours. The extension
          of CO alarm requirements to cover gas boilers is a direct response to this ongoing risk.
        </p>
        <p>
          When installing CO alarms, position them at head height on a wall or on the ceiling,
          between 1 and 3 metres from the combustion appliance. Do not place them directly above a
          cooker, next to a window (draughts affect sensor readings), or in a location where they
          would be covered by curtains or furniture. Test the alarm after installation and record
          the installation details.
        </p>
      </>
    ),
  },
  {
    id: 'installation-guidance',
    heading: 'Installation Guidance for Electricians',
    content: (
      <>
        <p>
          Whether fitting battery-operated alarms for a basic landlord compliance job or installing
          a full mains-wired interlinked system, getting the installation right is critical for both
          safety and professional reputation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Positioning smoke alarms.</strong> Install on the ceiling, at least 300 mm
                from any wall or light fitting. In hallways, position the alarm between the bedroom
                doors and the staircase. Avoid locations near bathrooms (steam causes false alarms),
                kitchens (cooking fumes), or garages (vehicle exhaust). If the ceiling is sloped,
                position the alarm between 150 mm and 600 mm below the apex.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Positioning heat alarms.</strong> Install in the kitchen, on the ceiling, as
                close to the centre of the room as practicable. Heat alarms are less affected by
                cooking fumes and should not give nuisance alarms during normal cooking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiring for mains-wired systems.</strong> Use 1.5 mm twin and earth for the
                supply and a 3-core and earth cable for the interconnect if hard-wired interlinking
                is used. The alarm circuit should be on a dedicated 6A MCB in the consumer unit. Do
                not connect alarms to a lighting circuit — a lighting circuit fault could disable
                the fire detection. This is{' '}
                <SEOInternalLink href="/guides/notifiable-electrical-work">
                  notifiable work under Part P
                </SEOInternalLink>{' '}
                if it involves a new circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing after installation.</strong> Test every alarm individually and
                verify that interlinked alarms all sound when one is triggered. Record the test
                results and provide the landlord with installation details, including alarm model
                numbers, locations, and the date of installation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For{' '}
          <SEOInternalLink href="/guides/competent-person-scheme-electrical">
            competent person scheme
          </SEOInternalLink>{' '}
          registered electricians, a new mains-wired smoke alarm circuit is notifiable work that can
          be self-certified. Issue an{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate
          </SEOInternalLink>{' '}
          for the new circuit and notify the work through your scheme provider.
        </p>
        <SEOAppBridge
          title="Create fire alarm certificates on site"
          description="Elec-Mate generates professional fire alarm installation certificates and BS 5839-6 compliance documents. Complete the certificate on your phone, export as PDF, and send to the landlord before you leave."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'enforcement',
    heading: 'Enforcement and Penalties',
    content: (
      <>
        <p>
          Enforcement of the Smoke and Carbon Monoxide Alarm Regulations falls to the local
          authority (the district or borough council). The enforcement process follows a structured
          escalation:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial notice.</strong> If the local authority has reasonable grounds to
                believe the landlord has not complied (no alarms fitted, or alarms not working), it
                can serve a remedial notice requiring the landlord to take action within 28 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local authority action.</strong> If the landlord fails to comply with the
                remedial notice, the local authority can enter the property (with the tenant
                consent) and fit the alarms themselves. The costs are recovered from the landlord.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil penalty.</strong> The local authority can impose a civil penalty of up
                to £5,000 for failure to comply with a remedial notice. Repeat offences or
                persistent non-compliance can attract higher penalties and be taken into account in
                other enforcement actions (HHSRS assessments, licensing decisions).
              </span>
            </li>
          </ul>
        </div>
        <p>
          In practice, enforcement has been inconsistent across local authorities — some are
          proactive, others are reactive (only acting on tenant complaints). However, the trend is
          towards more active enforcement, particularly as part of broader{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">
            landlord compliance checks
          </SEOInternalLink>{' '}
          that also cover EICR, gas safety, and energy performance certificates.
        </p>
        <p>
          For landlords, the cost of compliance is negligible — a few battery-operated alarms cost
          under £50 total. There is no financial justification for non-compliance, and the
          reputational and legal consequences of a fire in a property without working alarms would
          be catastrophic.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SmokeAlarmRegs2022Page() {
  return (
    <GuideTemplate
      title="Smoke Alarm Regulations 2022 | England Requirements"
      description="Complete guide to the Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022 for England. Covers interlinked alarms, CO alarm requirements for gas boilers, landlord duties, enforcement, and installation guidance for electricians."
      datePublished="2025-03-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulations Guide"
      badgeIcon={Bell}
      heroTitle={
        <>
          Smoke Alarm Regulations 2022:{' '}
          <span className="text-yellow-400">What Landlords and Electricians Must Know</span>
        </>
      }
      heroSubtitle="The 2022 Amendment extends carbon monoxide alarm requirements to all rooms with gas boilers and introduces an ongoing repair-or-replace duty for landlords. This guide covers every requirement, alarm type, installation standard, and enforcement mechanism."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Smoke Alarm Regulations"
      relatedPages={relatedPages}
      ctaHeading="Create Fire Alarm Certificates on Your Phone"
      ctaSubheading="Elec-Mate helps electricians document alarm installations, look up BS 5839-6 requirements with AI, and generate professional certificates. 7-day free trial, cancel anytime."
    />
  );
}
