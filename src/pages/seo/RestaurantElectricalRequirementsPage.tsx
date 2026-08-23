import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Building,
  Flame,
  ShieldCheck,
  FileCheck2,
  Calculator,
  Camera,
  GraduationCap,
  Lightbulb,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Shared presentation classes
// -------------------------------------------------------------------

const cardCn =
  '-mx-4 my-5 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const alertCn =
  '-mx-4 my-5 rounded-none border-y border-amber-500/30 bg-amber-500/[0.08] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const tableWrapCn = '-mx-4 my-5 overflow-x-auto sm:mx-0';

const tableCn =
  'w-full min-w-[34rem] border-collapse text-left text-sm sm:min-w-0 sm:rounded-2xl sm:overflow-hidden';

const thCn = 'whitespace-nowrap px-3 py-3 font-semibold text-white sm:px-4';
const tdCn = 'px-3 py-3 align-top text-white sm:px-4';

const dlCn = 'divide-y divide-white/[0.1]';
const dRowCn = 'py-3.5 first:pt-0 last:pb-0';
const dtCn = 'text-[15px] font-semibold text-white';
const ddCn = 'mt-1.5 text-sm leading-relaxed text-white';

const subHeadCn = 'mt-8 mb-2 text-[15px] font-semibold tracking-tight text-white';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Restaurant Requirements', href: '/guides/restaurant-electrical-requirements' },
];

const tocItems = [
  { id: 'overview', label: 'Restaurant Electrical Overview' },
  { id: 'three-phase-supply', label: 'Three-Phase Supply' },
  { id: 'extract-ventilation', label: 'Extract Fans and Ventilation' },
  { id: 'commercial-equipment', label: 'Commercial Kitchen Equipment' },
  { id: 'isolation-switching', label: 'Isolation and Emergency Switching' },
  { id: 'emergency-lighting', label: 'Emergency Lighting' },
  { id: 'fire-alarm', label: 'Fire Alarm Systems' },
  { id: 'eicr-intervals', label: 'EICR Intervals for Restaurants' },
  { id: 'compliance-checklist', label: 'Compliance Checklist' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Most commercial kitchens need a three-phase supply. A 100A three-phase supply delivers roughly 69 kW against a typical post-diversity demand of 40-80 kW for a 40-60 cover restaurant — a 100A single-phase supply delivers about 23 kW and is rarely enough.',
  'Socket-outlets rated up to 32A need 30 mA RCD additional protection under BS 7671 Reg 411.3.3. The documented risk-assessment exception applies only to indent (b) — it is not available for outlets liable to be used by ordinary persons, which covers almost every socket in a restaurant.',
  'Commercial cooking and dishwashing equipment often has a protective conductor current above 10 mA. Reg 543.7.1.203 then requires a high integrity protective conductor connection, and Reg 543.7.1.205 requires the affected circuits to be indicated at the distribution board.',
  'Where gas cooking equipment is used, an interlock between the gas supply and the mechanical extract ventilation is required — the gas shuts off if the extract stops. This is a Gas Safe and BS 6173 requirement, not a BS 7671 one, but the electrician installs and maintains the electrical side.',
  'BS 7671 sets no fixed EICR interval. Reg 652.1 requires the frequency to be determined from the type of installation, its use, the quality of maintenance, external influences and previous reports; Reg 653.4 requires the report to state a recommended interval with an explanation. For commercial kitchens 1-3 years is typical.',
];

const faqs = [
  {
    question: 'Does a restaurant need a three-phase electricity supply?',
    answer:
      'It depends on the total electrical load. A small cafe or takeaway with domestic-grade equipment may manage on a single-phase 100A supply, which delivers roughly 23 kW. Most sit-down restaurants with commercial kitchens require a three-phase supply because the combined load of combi ovens (typically 15-40 kW each), commercial dishwashers (6-18 kW), extract fans (2-7 kW), and refrigeration exceeds that. A 100A three-phase supply delivers approximately 69 kW at unity power factor, which suits many mid-size restaurants. BS 7671 Reg 311.1 requires the maximum demand to be determined for economic and reliable design within thermal limits and admissible voltage drop, and permits diversity to be taken into account. If you are fitting out new premises or taking over an existing unit, arrange a site survey so maximum demand can be calculated against the agreed supply capacity. Supply upgrades must be arranged through the Distribution Network Operator (DNO) and can take 6-12 weeks, so plan well ahead of your opening date.',
  },
  {
    question: 'How do I check whether a unit has enough power for electric cooking equipment?',
    answer:
      'Listing details rarely tell you. Before you commit, ask the agent or landlord for four things in writing: the number of phases at the incoming supply, the rating of the main switch or cut-out fuse, the DNO agreed capacity in kVA, and a copy of the most recent EICR with its distribution board schedules. Then compare that figure against the connected load of the equipment you intend to install, with diversity applied. A single-phase 100A supply gives about 23 kW, which will not run a combi oven and a commercial dishwasher together. A three-phase 100A supply gives about 69 kW. Also ask whether the meter is whole-current or CT-metered, how many spare ways the board has, and whether the existing supply is shared with flats or another unit in the building. If the answers are vague, treat the unit as needing a DNO upgrade and price the 6-12 week lead time into your programme.',
  },
  {
    question: 'How often does a restaurant need an EICR?',
    answer:
      'There is no fixed maximum interval in BS 7671. Reg 652.1 requires the frequency of periodic inspection and testing to be determined having regard to the type of installation and equipment, its use and operation, the frequency and quality of maintenance, and the external influences to which it may be subjected — and the results and recommendations of previous certificates and condition reports must also be taken into account. Reg 653.4 then requires the report itself to indicate a recommended interval until the next inspection, supported by an explanation. For a commercial kitchen, inspectors typically recommend a 1-3 year interval given the heat, steam, grease, moisture and aggressive cleaning chemicals. Many local authorities, insurers, and premises licence conditions independently specify a 3-year interval for restaurants. Under the Health and Safety at Work Act 1974 and the Electricity at Work Regulations 1989, the duty holder is responsible for ensuring the installation is maintained in a safe condition. Failure to provide a current EICR can affect your premises licence, insurance validity, and compliance status.',
  },
  {
    question: 'What are the emergency lighting requirements for a restaurant?',
    answer:
      'Emergency lighting in restaurants must comply with BS 5266-1:2016 (Emergency lighting — Code of practice for the emergency lighting of premises). The Regulatory Reform (Fire Safety) Order 2005 requires the responsible person to ensure that emergency routes and exits are provided with adequate emergency lighting. In practice this means illuminated exit signs above all final exit doors, emergency lighting along all escape routes, open-area lighting to prevent panic in rooms larger than 60 square metres, and high-risk task area lighting in the commercial kitchen. The system must provide a minimum 3-hour duration on battery backup, achieve a minimum 1 lux on the centre line of escape routes and 0.5 lux in open areas, and be tested monthly (functional test) and annually (full-duration test). Test records must be maintained in a log book and made available to the Fire and Rescue Service on request.',
  },
  {
    question: 'Is a fire alarm certificate required for a restaurant?',
    answer:
      'Under the Regulatory Reform (Fire Safety) Order 2005, the responsible person must carry out a fire risk assessment and install appropriate fire detection and alarm systems. For most restaurants, a fire alarm system designed and installed to BS 5839-1:2025 is required. The system category depends on the fire risk assessment — most restaurants require at least a Category L2 system (covering defined areas of risk, such as the kitchen, store rooms, and escape routes) or Category M (manual call points only, for smaller premises with simple layouts). After installation, the fire alarm system must be commissioned, and a Fire Alarm Certificate should be issued. Ongoing maintenance requires weekly user testing of the alarm and periodic servicing by a competent fire alarm engineer at the frequency set by BS 5839-1 and the fire risk assessment. Records of all testing and maintenance must be kept. Elec-Mate supports fire alarm certificates with BS 5839-1 compliance built into the form structure.',
  },
  {
    question: 'What electrical certificates are needed to open a restaurant?',
    answer:
      'Opening a restaurant typically requires the following electrical documentation: an Electrical Installation Certificate (EIC) for any new installation work, a Minor Works Certificate for smaller additions or alterations, a current EICR (Electrical Installation Condition Report) confirming the existing installation is safe, an Emergency Lighting Certificate confirming compliance with BS 5266-1, a Fire Alarm Certificate confirming compliance with BS 5839-1, and PAT testing records for all portable appliances. Building Regulations Part P applies to electrical installations in dwellings, so it is only engaged where the premises include or adjoin a dwelling — a flat over the restaurant, for example. These documents are typically requested by the local authority licensing team, environmental health officers, the Fire and Rescue Service, and your insurance company. An incomplete set of certificates can delay your premises licence approval and your opening date.',
  },
  {
    question: 'Do commercial dishwashers need a special electrical supply?',
    answer:
      'Most commercial dishwashers require a dedicated circuit. Pass-through (hood-type) dishwashers typically draw 6-10 kW and require a 32A supply. Rack conveyor dishwashers can draw 18-30 kW and usually require a three-phase supply. Flight-type (continuous conveyor) machines for very large operations can exceed 50 kW. BS 7671 Reg 314.2 requires separate circuits for parts of the installation that need to be separately controlled, and Reg 462.2 requires every circuit to be provided with a means of isolation for all live conductors. The cable must be sized for the full rated current of the machine with the appropriate rating factors applied for ambient temperature, grouping, and installation method. Check the manufacturer data sheet for the protective conductor current too — where it exceeds 10 mA, Reg 543.7.1.202 restricts how the machine may be connected. Always confirm the power rating, number of phases, and connection type before specifying the circuit, as these vary significantly between models.',
  },
  {
    question: 'What is the gas interlock requirement for commercial kitchens?',
    answer:
      'In any commercial kitchen that uses gas cooking equipment, an interlock is required between the gas supply and the mechanical extract ventilation system, as set out in BS 6173 and reflected in Building Regulations guidance. The gas supply must automatically shut off if the extract fan stops operating or fails. The interlock typically uses a current-sensing relay or air pressure switch monitoring the extract fan, and a gas solenoid valve on the gas supply pipework. When the extract is running and confirmed operational, the solenoid valve is held open. If the extract stops for any reason — power failure, motor fault, belt failure — the valve closes and the gas supply is cut. This prevents the build-up of combustion products in the kitchen. The interlock must be tested at commissioning and at each gas safety inspection. A qualified electrician installs the electrical components (current sensing relay, wiring, and control panel), while a Gas Safe registered engineer installs the gas solenoid valve and commissions the gas side.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone. AI board scanner, voice test entry, and professional PDF export for commercial premises.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/fire-alarm-certificate',
    title: 'Fire Alarm Certificate',
    description:
      'BS 5839-1 compliant fire alarm certificates for restaurants and commercial premises. Digital completion and instant delivery.',
    icon: Flame,
    category: 'Certificate',
  },
  {
    href: '/emergency-lighting-certificate',
    title: 'Emergency Lighting Certificate',
    description:
      'BS 5266-1 compliant emergency lighting certificates with test schedules, battery duration records, and lux level documentation.',
    icon: Lightbulb,
    category: 'Certificate',
  },
  {
    href: '/how-to-fill-in-eicr',
    title: 'How to Fill In an EICR',
    description:
      'Step-by-step guide to completing every section of the EICR form correctly for commercial inspections.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/max-demand-calculator',
    title: 'Max Demand Calculator',
    description:
      'Calculate maximum demand for commercial kitchens with diversity factors applied to three-phase loads.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/inspection-testing-course',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training courses covering commercial inspection and testing on the Elec-Mate platform.',
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
    heading: 'Restaurant Electrical Requirements: What You Need to Know',
    content: (
      <>
        <p>
          Restaurants, cafes, and commercial food establishments have some of the most demanding
          electrical installations in the commercial sector. High-power cooking equipment,
          mechanical extract ventilation, emergency lighting, fire alarm systems, refrigeration,
          EPOS tills and ambient lighting combine into a load that needs careful design, correct
          circuit division, and ongoing maintenance in a genuinely hostile environment.
        </p>

        <h3 className={subHeadCn}>The regulations that actually apply</h3>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr className="bg-white/[0.07]">
                <th className={thCn}>Instrument</th>
                <th className={thCn}>What it covers here</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-medium`}>BS 7671:2018+A4:2026</td>
                <td className={tdCn}>
                  Design, installation, inspection and testing of the fixed electrical installation.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-medium`}>Electricity at Work Regulations 1989</td>
                <td className={tdCn}>
                  Duty on the duty holder to maintain systems so as to prevent danger.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-medium`}>Health and Safety at Work Act 1974</td>
                <td className={tdCn}>
                  Overarching duty of care to employees and members of the public.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-medium`}>Fire Safety Order 2005</td>
                <td className={tdCn}>
                  Fire risk assessment, escape route lighting, fire detection and alarm provision.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-medium`}>Building Regulations Part B and Part F</td>
                <td className={tdCn}>
                  Fire safety, and ventilation of the food preparation area.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-medium`}>Building Regulations Part P</td>
                <td className={tdCn}>
                  Electrical safety in <strong>dwellings</strong> only. It bites on a restaurant fit-out
                  only where the premises include or adjoin a dwelling, such as a flat above.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-medium`}>Gas Safety (Installation and Use) Regs 1998</td>
                <td className={tdCn}>
                  Gas side of the extract interlock, with BS 6173 for catering appliances.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Part P is the one most commonly cited in error. Approved Document P applies to electrical
          installations in dwellings — a standalone restaurant unit is not notifiable work under Part
          P, though a mixed-use building with flats above may well be. The rest of the fixed
          installation is governed by{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>{' '}
          and the Electricity at Work Regulations 1989.
        </p>
      </>
    ),
  },
  {
    id: 'three-phase-supply',
    heading: 'Three-Phase Supply for Commercial Kitchens',
    content: (
      <>
        <p>
          The first question for any restaurant installation is whether the existing supply is
          adequate. Reg 311.1 requires maximum demand to be determined so the installation is
          designed within thermal limits and admissible voltage drop, and permits diversity to be
          taken into account. Start with what the supply can actually deliver:
        </p>

        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr className="bg-white/[0.07]">
                <th className={thCn}>Supply</th>
                <th className={thCn}>Approximate capacity</th>
                <th className={thCn}>Realistic for</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-medium`}>100A single-phase</td>
                <td className={tdCn}>~23 kW</td>
                <td className={tdCn}>Cafe, sandwich bar, takeaway with domestic-grade equipment</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-medium`}>100A three-phase</td>
                <td className={tdCn}>~69 kW</td>
                <td className={tdCn}>Most mid-size sit-down restaurants</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-medium`}>200A three-phase</td>
                <td className={tdCn}>~138 kW</td>
                <td className={tdCn}>Large restaurant, two combi ovens, full extract plant</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-medium`}>400A three-phase</td>
                <td className={tdCn}>~276 kW</td>
                <td className={tdCn}>Hotel kitchen, central production unit, multi-unit site</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-white">
          Capacities are the arithmetic product of the supply voltage and current at unity power
          factor (three-phase: 3 &times; 230V &times; I). Treat them as a sanity check, not a design
          figure — confirm the agreed capacity in kVA with the DNO.
        </p>

        <h3 className={subHeadCn}>Typical connected loads, 40-60 covers</h3>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr className="bg-white/[0.07]">
                <th className={thCn}>Equipment</th>
                <th className={thCn}>Typical load</th>
                <th className={thCn}>Supply and notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-medium`}>Combi oven</td>
                <td className={tdCn}>15-40 kW</td>
                <td className={tdCn}>
                  Three-phase, hardwired. The single largest load in most kitchens — and some
                  kitchens have two.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-medium`}>Commercial dishwasher</td>
                <td className={tdCn}>6-18 kW</td>
                <td className={tdCn}>
                  Pass-through types typically 32A; rack conveyor types usually three-phase.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-medium`}>Extract ventilation system</td>
                <td className={tdCn}>2-7 kW</td>
                <td className={tdCn}>
                  Canopy extract plus make-up air. Often three-phase on larger systems.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-medium`}>Walk-in cold room and freezer</td>
                <td className={tdCn}>1-3 kW each</td>
                <td className={tdCn}>Dedicated circuits; condensing unit usually external.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-medium`}>Power, lighting, EPOS, CCTV</td>
                <td className={tdCn}>5-15 kW</td>
                <td className={tdCn}>
                  Front and back of house power, ambient and feature lighting, tills, security.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Total connected load commonly reaches 60-120 kW before diversity. After diversity, maximum
          demand typically falls to 40-80 kW — which is why a 100A three-phase supply suits many
          mid-size restaurants and a single-phase supply rarely does. If the premises are
          single-phase, a three-phase upgrade must be arranged through the Distribution Network
          Operator, involving a formal application, a connection quotation, and a lead time of 6-12
          weeks.
        </p>

        <h3 className={subHeadCn}>What to ask before you take a unit</h3>
        <div className={cardCn}>
          <dl className={dlCn}>
            <div className={dRowCn}>
              <dt className={dtCn}>How many phases, and what is the main switch rated at?</dt>
              <dd className={ddCn}>
                Ask for a photograph of the intake, the cut-out fuse rating, and the main switch.
                Three brown tails is not the same as an agreed three-phase capacity.
              </dd>
            </div>
            <div className={dRowCn}>
              <dt className={dtCn}>What is the DNO agreed capacity in kVA?</dt>
              <dd className={ddCn}>
                Get it in writing. The fuse rating is what is fitted; the agreed capacity is what you
                are allowed to draw, and the two often differ.
              </dd>
            </div>
            <div className={dRowCn}>
              <dt className={dtCn}>Can I see the last EICR and the board schedules?</dt>
              <dd className={ddCn}>
                A current report tells you the earthing arrangement, the outcome, any C1/C2 codes
                outstanding, and how many spare ways you have to work with.
              </dd>
            </div>
            <div className={dRowCn}>
              <dt className={dtCn}>Is the meter whole-current or CT-metered?</dt>
              <dd className={ddCn}>
                CT metering usually indicates a substantial supply. A whole-current single-phase
                meter is a strong signal that heavy electric cooking will not fit.
              </dd>
            </div>
            <div className={dRowCn}>
              <dt className={dtCn}>Is the supply shared with flats or another unit?</dt>
              <dd className={ddCn}>
                A shared intake constrains what you can add and complicates any upgrade application.
              </dd>
            </div>
          </dl>
        </div>
      </>
    ),
  },
  {
    id: 'extract-ventilation',
    heading: 'Extract Fans and Ventilation Systems',
    content: (
      <>
        <p>
          Mechanical extract ventilation is not optional in a commercial kitchen. Building
          Regulations Part F covers ventilation of the food preparation area, and the detailed
          specification is set out in DW/172 (the BESA Specification for Kitchen Ventilation
          Systems).
        </p>
        <div className={cardCn}>
          <dl className={dlCn}>
            <div className={dRowCn}>
              <dt className={dtCn}>Dedicated circuit</dt>
              <dd className={ddCn}>
                The extract fan takes its own circuit, sized for the full load current of the motor
                with the appropriate rating factors applied. Reg 314.2 requires separate circuits for
                parts of an installation that need to be separately controlled.
              </dd>
            </div>
            <div className={dRowCn}>
              <dt className={dtCn}>Gas interlock</dt>
              <dd className={ddCn}>
                Where gas cooking equipment is used, an interlock between the gas supply and the
                extract is required under BS 6173. A current-sensing relay or air pressure switch
                proves the extract is running; if it stops, the gas solenoid valve closes and shuts
                off the supply to all cooking equipment.
              </dd>
            </div>
            <div className={dRowCn}>
              <dt className={dtCn}>Make-up air</dt>
              <dd className={ddCn}>
                The supply air fan providing replacement air is interlocked with the extract, so the
                supply system cannot run without the extract running.
              </dd>
            </div>
            <div className={dRowCn}>
              <dt className={dtCn}>Speed control</dt>
              <dd className={ddCn}>
                Variable speed drives are common on extract motors. Install to minimise
                electromagnetic disturbance and use screened cable between drive and motor. Reg
                314.1(e) explicitly lists mitigating the effects of electromagnetic disturbances as a
                reason to divide an installation into circuits.
              </dd>
            </div>
          </dl>
        </div>
        <p>
          The gas interlock is the most safety-critical element of the electrical installation in a
          gas kitchen. It must be tested at commissioning and at every subsequent gas safety
          inspection. The electrician installs and maintains the electrical components — current
          sensor, relay, control panel and wiring — while the Gas Safe registered engineer installs
          the solenoid valve and certifies the gas side.
        </p>
      </>
    ),
  },
  {
    id: 'commercial-equipment',
    heading: 'Commercial Kitchen Equipment: Electrical Requirements',
    content: (
      <>
        <p>
          Every piece of commercial kitchen equipment has specific electrical requirements that must
          be settled at fit-out. Get the manufacturer data sheets before you design the board
          schedule — power rating, number of phases, connection type and protective conductor current
          all vary between models.
        </p>

        <div className="my-5 space-y-4">
          <div className={cardCn}>
            <h4 className="mb-2 font-bold text-white">Combi ovens</h4>
            <p className="text-sm leading-relaxed text-white">
              The most power-hungry item in most kitchens, commonly 15-40 kW on a three-phase supply,
              hardwired on a dedicated circuit with a local means of isolation. Water and drain
              connections are also required, and the position must allow clearance for ventilation
              and servicing.
            </p>
          </div>
          <div className={cardCn}>
            <h4 className="mb-2 font-bold text-white">Commercial dishwashers</h4>
            <p className="text-sm leading-relaxed text-white">
              Pass-through (hood-type) models typically need a 32A supply. Rack conveyor models need
              three-phase, often 32A or 63A depending on the model, and flight-type machines for
              high-volume operations can exceed 50 kW. Each takes a dedicated circuit with a means of
              isolation adjacent to the machine.
            </p>
          </div>
          <div className={cardCn}>
            <h4 className="mb-2 font-bold text-white">Walk-in cold rooms and freezers</h4>
            <p className="text-sm leading-relaxed text-white">
              Dedicated circuits, typically 16A or 20A, with the condensing unit usually sited
              externally or in a plant area. An internal emergency door release must be fitted, and an
              internal alarm is recommended. Luminaires inside must be rated for the temperature and
              humidity — IP65 LED fittings are standard.
            </p>
          </div>
          <div className={cardCn}>
            <h4 className="mb-2 font-bold text-white">Deep fat fryers</h4>
            <p className="text-sm leading-relaxed text-white">
              Electric fryers range from about 3 kW (single-tank countertop) to 25 kW (double-tank
              floor-standing, three-phase). They sit under the extract canopy on dedicated circuits,
              with a means of emergency switching off within reach of the operator — see the section
              below for what BS 7671 actually requires of that control.
            </p>
          </div>
        </div>

        <h3 className={subHeadCn}>High protective conductor current (Reg 543.7)</h3>
        <p>
          This is the requirement most often missed on commercial kitchen fit-outs. Combi ovens,
          dishwashers, induction ranges and variable speed drives all carry EMC filters, and their
          protective conductor current in normal service is frequently above 10 mA. BS 7671 then
          imposes three separate obligations:
        </p>
        <div className={cardCn}>
          <dl className={dlCn}>
            <div className={dRowCn}>
              <dt className={dtCn}>Reg 543.7.1.202 — how the equipment may be connected</dt>
              <dd className={ddCn}>
                Equipment with a protective conductor current exceeding 10 mA must be permanently
                connected to the fixed wiring, or connected by a flexible cable with a BS EN IEC
                60309-2 plug and socket-outlet whose protective conductor is at least 2.5mm&sup2; for
                16A plugs and at least 4mm&sup2; above 16A, or protected by a BS 4444 earth monitoring
                system that disconnects on a protective conductor continuity fault.
              </dd>
            </div>
            <div className={dRowCn}>
              <dt className={dtCn}>Reg 543.7.1.203 — high integrity protective connection</dt>
              <dd className={ddCn}>
                Where the total protective conductor current on a circuit is likely to exceed 10 mA,
                the wiring needs a high integrity protective connection: a single 10mm&sup2;
                protective conductor, or a single 4mm&sup2; copper protective conductor with
                additional mechanical protection, or two individual protective conductors, or a BS
                4444 monitoring system, or supply via a double-wound transformer.
              </dd>
            </div>
            <div className={dRowCn}>
              <dt className={dtCn}>Reg 543.7.1.205 — label the board</dt>
              <dd className={ddCn}>
                Information must be provided at the distribution board indicating which circuits have
                a high protective conductor current, positioned so it is visible to anyone modifying
                or extending the circuit.
              </dd>
            </div>
          </dl>
        </div>
        <p>
          The same accumulation of filter current is the usual cause of nuisance RCD tripping in
          kitchens. Reg 314.1(d) lists reducing unwanted tripping of RCDs due to excessive protective
          conductor currents as an explicit reason to divide the installation into more circuits —
          which is a better answer than uprating the RCD.
        </p>

        <div className={alertCn}>
          <h4 className="mb-2 font-bold text-white">
            RCD protection for kitchen socket-outlets (Reg 411.3.3)
          </h4>
          <p className="text-sm leading-relaxed text-white">
            In AC systems, 30 mA RCD additional protection is required for socket-outlets rated up to
            32A in locations where they are liable to be used by ordinary persons (BA1) or children
            (BA2), for socket-outlets up to 32A in other locations, and for mobile equipment up to 32A
            used outdoors. The documented risk-assessment exception applies to the second of those
            only. In a restaurant, kitchen and front-of-house sockets are used by ordinary persons, so
            the exception is not available for them — and the regulation's own note is explicit that
            an ordinary person instructed in the use of the installation does not stop being an
            ordinary person. Training the kitchen brigade does not buy you out of the requirement.
          </p>
        </div>

        <p>
          Before starting any fit-out, collect the manufacturer data sheets, calculate the total
          connected load, apply diversity, and design the board schedule around it. Use Elec-Mate's{' '}
          <SEOInternalLink href="/tools/max-demand-calculator">
            max demand calculator
          </SEOInternalLink>{' '}
          to confirm the supply is adequate before you commit.
        </p>
      </>
    ),
  },
  {
    id: 'isolation-switching',
    heading: 'Isolation and Emergency Switching in the Kitchen',
    content: (
      <>
        <p>
          Isolation and emergency switching off are two different functions with two different sets
          of requirements, and commercial kitchens need both. Confusing them is a common EICR
          observation.
        </p>

        <h3 className={subHeadCn}>Isolation</h3>
        <p>
          Reg 462.2 requires every circuit to be provided with a means of isolation for all live
          conductors, and Reg 462.3 requires isolation devices to be designed or installed so as to
          prevent unintentional or inadvertent closure — by being within a lockable enclosure, by
          padlocking, or by being located adjacent to the associated equipment. For fixed kitchen
          equipment, a local isolator beside the machine is the practical answer: it matches the third
          of those examples and lets an engineer work on a fryer without shutting the whole kitchen
          down.
        </p>

        <h3 className={subHeadCn}>Emergency switching off</h3>
        <p>
          Reg 465.1 requires a means of emergency switching off for any part of an installation where
          it may be necessary to control the supply to remove an unexpected danger — a fryer, a mixer,
          a slicer. Reg 465.3 requires it to act as directly as possible on the supply conductors,
          with a single action interrupting the supply. Section 537 sets out what the device itself
          has to do:
        </p>
        <div className={cardCn}>
          <dl className={dlCn}>
            <div className={dRowCn}>
              <dt className={dtCn}>Red, on a contrasting background (Reg 537.3.3.5)</dt>
              <dd className={ddCn}>
                The means of operating must be clearly identified, preferably by colour. Where colour
                is used it shall be red with a contrasting background — yellow is the example given in
                the regulation. A bare red mushroom head on a stainless splashback does not meet this.
              </dd>
            </div>
            <div className={dRowCn}>
              <dt className={dtCn}>It must latch off (Reg 537.3.3.7)</dt>
              <dd className={ddCn}>
                The means of operation must be capable of latching in the OFF position, unless both
                the emergency switching off and the re-energising are under the control of the same
                person. A momentary pushbutton is not acceptable.
              </dd>
            </div>
            <div className={dRowCn}>
              <dt className={dtCn}>A plug is not an emergency stop (Reg 537.3.3.3)</dt>
              <dd className={ddCn}>
                Plugs and socket-outlets shall not be provided for use as a means for emergency
                switching off. &ldquo;Just pull the plug out&rdquo; is not a compliant arrangement.
              </dd>
            </div>
            <div className={dRowCn}>
              <dt className={dtCn}>Readily accessible where the danger is (Reg 537.3.3.6)</dt>
              <dd className={ddCn}>
                The control must be readily accessible at places where a danger might occur, and
                where appropriate at a remote position from which the danger can be removed. Behind
                the fryer is not readily accessible.
              </dd>
            </div>
            <div className={dRowCn}>
              <dt className={dtCn}>It must break the full load (Reg 537.3.3.2)</dt>
              <dd className={ddCn}>
                Devices for emergency switching off must be capable of breaking the full load current
                of the relevant parts of the installation, taking stalled motor currents into account
                where appropriate.
              </dd>
            </div>
          </dl>
        </div>

        <h3 className={subHeadCn}>Cables in protected escape routes (Reg 422.2)</h3>
        <p>
          Restaurants nearly always have a protected escape route, and Reg 422.2.201 restricts what
          may run through a firefighting shaft or a protected stairway: only an essential fire safety
          or related safety system, general needs lighting, or socket-outlets provided for cleaning or
          maintenance. Reg 422.2.1 further restricts which cables may be installed in protected escape
          routes to fire-resistant cables meeting Reg 560.8.1, or cables with resistance to flame
          propagation to the relevant part of the BS EN 60332-3 series, among the listed options. Reg
          422.2.202 deems cables to be outside the escape route where they are installed in a
          fire-resisting enclosure of the same fire resistance as the compartment they pass through.
          Routing a general power circuit up a protected stairway to save a few metres of cable is a
          straightforward non-compliance.
        </p>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting in Restaurants',
    content: (
      <>
        <p>
          Emergency lighting is a legal requirement for restaurants and commercial food premises under
          the Regulatory Reform (Fire Safety) Order 2005. The system must comply with{' '}
          <SEOInternalLink href="/emergency-lighting-certificate">BS 5266-1:2016</SEOInternalLink> and
          illuminate escape routes, exit doors, and high-risk areas including the kitchen, on failure
          of the normal supply.
        </p>

        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr className="bg-white/[0.07]">
                <th className={thCn}>Area</th>
                <th className={thCn}>Minimum illuminance</th>
                <th className={thCn}>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-medium`}>Escape routes</td>
                <td className={tdCn}>1 lux on the centre line</td>
                <td className={tdCn}>
                  Uniformity ratio no worse than 40:1 between brightest and darkest points.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-medium`}>Open areas (anti-panic)</td>
                <td className={tdCn}>0.5 lux</td>
                <td className={tdCn}>
                  Applies to open areas larger than 60m&sup2;, such as the main dining room.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-medium`}>High-risk task areas</td>
                <td className={tdCn}>
                  10% of the normal maintained illuminance, or 15 lux, whichever is greater
                </td>
                <td className={tdCn}>
                  The commercial kitchen is a high-risk task area — staff need enough light to shut
                  equipment down safely.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-medium`}>Duration</td>
                <td className={tdCn}>3 hours</td>
                <td className={tdCn}>
                  1 hour is only acceptable where premises are evacuated immediately and not
                  reoccupied until the supply is restored.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Illuminated exit signs, maintained or non-maintained, go above every final exit door and at
          any point where the direction of escape is not immediately obvious; signs comply with BS
          5499.
        </p>

        <h3 className={subHeadCn}>Testing and records</h3>
        <p>
          Testing is mandatory: a monthly functional test (simulate supply failure and confirm every
          luminaire illuminates) and an annual full-duration test (run the system for its full rated
          duration on battery and confirm illumination is maintained throughout). Every result goes in
          the log book, which the Fire and Rescue Service may ask to see. For more on test procedure
          and order, see our{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">
            testing sequence guide
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'fire-alarm',
    heading: 'Fire Alarm Systems for Restaurants',
    content: (
      <>
        <p>
          The Regulatory Reform (Fire Safety) Order 2005 requires the responsible person — typically
          the restaurant owner or operator — to ensure appropriate fire detection and alarm systems
          are in place. The system is designed, installed and maintained to{' '}
          <SEOInternalLink href="/fire-alarm-certificate">BS 5839-1:2025</SEOInternalLink>, with the
          category set by the fire risk assessment.
        </p>
        <div className="my-5 grid gap-4 sm:grid-cols-2">
          <div className={`${cardCn} sm:my-0`}>
            <h3 className="mb-2 text-lg font-bold text-white">Category M</h3>
            <p className="text-sm leading-relaxed text-white">
              Manual system only — call points at exit doors, no automatic detection. Suitable for
              smaller premises with simple layouts and a low fire risk, where occupants would discover
              a fire quickly.
            </p>
          </div>
          <div className={`${cardCn} sm:my-0`}>
            <h3 className="mb-2 text-lg font-bold text-white">Category L2</h3>
            <p className="text-sm leading-relaxed text-white">
              Automatic detection in defined high-risk areas (kitchen, store rooms, plant rooms) plus
              all escape routes and rooms opening onto them. The most common category for mid-size
              restaurants.
            </p>
          </div>
        </div>
        <p>
          Cooking produces heat and airborne particles that trigger false alarms, so heat detectors —
          rate-of-rise or fixed-temperature, rated for the environment — are used in cooking areas
          rather than smoke detectors. Multi-sensor detectors are increasingly used in transitional
          areas such as the pass between kitchen and dining room.
        </p>

        <h3 className={subHeadCn}>Systems the alarm has to talk to</h3>
        <div className={cardCn}>
          <dl className={dlCn}>
            <div className={dRowCn}>
              <dt className={dtCn}>Electromagnetic door holders</dt>
              <dd className={ddCn}>
                Fire doors held open on electromagnetic retainers must release automatically on alarm
                activation.
              </dd>
            </div>
            <div className={dRowCn}>
              <dt className={dtCn}>Kitchen suppression system</dt>
              <dd className={ddCn}>
                Where a wet chemical canopy suppression system is fitted, it interfaces with the fire
                alarm panel so activation is signalled and logged.
              </dd>
            </div>
            <div className={dRowCn}>
              <dt className={dtCn}>Gas shut-off</dt>
              <dd className={ddCn}>
                The fire alarm can be arranged to drop the gas solenoid valve, cutting the gas supply
                on activation.
              </dd>
            </div>
          </dl>
        </div>
        <p>
          Maintenance is weekly user testing of the alarm, plus periodic inspection and servicing by a
          competent fire alarm engineer at the frequency set by BS 5839-1 and the fire risk
          assessment. Keep every record.
        </p>
      </>
    ),
  },
  {
    id: 'eicr-intervals',
    heading: 'EICR Intervals for Restaurants and Commercial Kitchens',
    content: (
      <>
        <p>
          There is no fixed BS 7671 maximum interval for commercial premises. Reg 652.1 requires the
          frequency of periodic inspection and testing to be determined having regard to the type of
          installation and equipment, its use and operation, the frequency and quality of maintenance,
          and the external influences to which it may be subjected — and the results and
          recommendations of previous certificates and condition reports must also be taken into
          account. Reg 653.4 then requires the report to indicate a recommended interval until the
          next inspection, supported by an explanation for the recommendation.
        </p>
        <p>
          Read those two together and a commercial kitchen argues itself into a short interval. Heat,
          steam, grease, water, aggressive cleaning chemicals and heavy daily use are exactly the
          &ldquo;external influences&rdquo; and &ldquo;use and operation&rdquo; factors Reg 652.1 puts
          in front of the inspector. IET Guidance Note 3 gives the same steer for periodic inspection
          of commercial installations.
        </p>
        <div className={cardCn}>
          <dl className={dlCn}>
            <div className={dRowCn}>
              <dt className={dtCn}>The interval is the inspector's judgement, not a table lookup</dt>
              <dd className={ddCn}>
                Reg 653.4 requires the recommendation and the explanation behind it to appear on the
                report. &ldquo;5 years&rdquo; with no reasoning does not satisfy it.
              </dd>
            </div>
            <div className={dRowCn}>
              <dt className={dtCn}>1-3 years is typical for a restaurant kitchen</dt>
              <dd className={ddCn}>
                Shorter where the installation is older, heavily loaded, or regularly exposed to
                moisture and cleaning chemicals. Many insurers, local authorities and fire and rescue
                services independently specify 3 years as a condition of cover or licensing.
              </dd>
            </div>
            <div className={dRowCn}>
              <dt className={dtCn}>Mobile catering units are a different job</dt>
              <dd className={ddCn}>
                A transportable catering unit falls under BS 7671 Section 717 (mobile or transportable
                units), which brings its own requirements — including the Reg 717.514 permanent notice
                at the supply inlet stating the supply types accepted, voltage rating, number of
                supplies and phases, on-board earthing arrangement, and maximum power requirement.
              </dd>
            </div>
            <div className={dRowCn}>
              <dt className={dtCn}>A maintenance regime can replace periodic inspection</dt>
              <dd className={ddCn}>
                Reg 652.2 allows periodic inspection and testing to be replaced by an adequate regime
                of continuous monitoring and maintenance by skilled persons, under an effective
                management system for preventative maintenance, with appropriate records kept. Few
                independent restaurants will meet that bar; larger groups sometimes do.
              </dd>
            </div>
          </dl>
        </div>
        <p>
          Under the Health and Safety at Work Act 1974 and the Electricity at Work Regulations 1989
          (Regulation 4 in particular), the duty holder must ensure electrical installations are
          maintained so as to prevent danger. A current EICR is the standard evidence of that. Failing
          to hold one can lead to enforcement action from the HSE, invalidated insurance, and
          difficulty renewing a premises licence.
        </p>
        <SEOAppBridge
          title="Commercial kitchen electrical requirements"
          description="BS 7671:2018+A4:2026 compliance for restaurant kitchens. Calculate load demands, design circuits, and issue certificates. Free guide for electricians."
          icon={Camera}
        />
      </>
    ),
  },
  {
    id: 'compliance-checklist',
    heading: 'Restaurant Electrical Compliance Checklist',
    content: (
      <>
        <p>
          Work through this before signing off a restaurant installation or closing out an EICR.
          Regulation references are to BS 7671:2018+A4:2026.
        </p>
        <div className={cardCn}>
          <ul className="space-y-4 text-white">
            {[
              {
                title: 'Supply adequacy (Reg 311.1)',
                body: 'Maximum demand determined and checked against the DNO agreed capacity, with diversity applied. Three-phase supply in place where required.',
              },
              {
                title: 'Circuit division (Regs 314.1, 314.2, 314.4)',
                body: 'Installation divided into circuits to avoid danger, facilitate testing and maintenance, and reduce unwanted RCD tripping from protective conductor currents. Each final circuit on its own way in the board.',
              },
              {
                title: 'Distribution board schedule',
                body: 'All circuits clearly labelled with correct ratings, and adequate spare ways for future equipment.',
              },
              {
                title: 'RCD protection (Reg 411.3.3)',
                body: '30 mA RCD additional protection on socket-outlets rated up to 32A. Remember the documented risk-assessment exception covers indent (b) only, and does not reach outlets liable to be used by ordinary persons.',
              },
              {
                title: 'High protective conductor current (Reg 543.7)',
                body: 'Equipment above 10 mA connected by a permitted method (543.7.1.202), circuits given a high integrity protective connection (543.7.1.203), and the affected circuits indicated at the board (543.7.1.205).',
              },
              {
                title: 'Isolation (Regs 462.2, 462.3)',
                body: 'Every circuit has a means of isolating all live conductors, and isolators for fixed kitchen equipment are located adjacent to the equipment or otherwise secured against inadvertent closure.',
              },
              {
                title: 'Emergency switching off (Regs 465.1, 537.3.3)',
                body: 'Provided where needed to remove an unexpected danger; red on a contrasting background, latching in the OFF position, readily accessible, and able to break the full load current. Not a plug and socket.',
              },
              {
                title: 'AFDDs (Regs 421.1.7, 532.6)',
                body: 'Required in high rise residential buildings, HMOs, purpose-built student accommodation and care homes for single-phase AC final circuits supplying socket-outlets up to 32A; recommended for all other premises on the same circuit type. Where fitted, at the origin of the circuit.',
              },
              {
                title: 'Escape route wiring (Reg 422.2)',
                body: 'Nothing in a firefighting shaft or protected stairway beyond essential safety systems, general needs lighting, and cleaning or maintenance socket-outlets. Cables in protected escape routes meet Reg 422.2.1.',
              },
              {
                title: 'Gas interlock',
                body: 'Extract-to-gas-solenoid interlock installed, commissioned and tested. Current sensing or air pressure proving confirmed operational.',
              },
              {
                title: 'Emergency lighting',
                body: 'BS 5266-1 compliant system installed. Exit signs, escape route lighting, open-area lighting and high-risk task area lighting all verified, with the test schedule established.',
              },
              {
                title: 'Fire alarm',
                body: 'BS 5839-1 system installed to the category set by the fire risk assessment. Heat detection in cooking areas. Integration with door holders, suppression and gas shut-off proven.',
              },
              {
                title: 'Cable adequacy (Section 523)',
                body: 'Cables confirmed adequate for current-carrying capacity for the type and nature of the installation, with rating factors for ambient temperature, grouping and installation method applied.',
              },
              {
                title: 'Cable support (Regs 521.10.202, 522.8.5)',
                body: 'Cables correctly supported throughout their run, and wiring systems supported such that they are not liable to premature collapse in the event of a fire.',
              },
              {
                title: 'EICR (Regs 653.1, 653.4)',
                body: 'Current report in place with a Satisfactory outcome, and a recommended interval to the next inspection recorded with the reasoning behind it.',
              },
              {
                title: 'Portable appliances',
                body: 'In-service inspection and testing carried out and recorded for all portable equipment.',
              },
            ].map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-elec-yellow" />
                <span>
                  <strong>{item.title}</strong> — {item.body}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Restaurant Work as a Revenue Stream',
    content: (
      <>
        <p>
          Restaurant and commercial kitchen work is a strong specialism. Periodic EICRs, emergency
          lighting testing, fire alarm servicing, in-service appliance testing and reactive
          maintenance together produce a recurring income from every restaurant client — and the
          barrier to entry is knowing Section 543, Chapter 46 and Section 537 well enough to specify
          properly.
        </p>
        <div className={cardCn}>
          <dl className={dlCn}>
            <div className={dRowCn}>
              <dt className={dtCn}>Periodic EICR</dt>
              <dd className={ddCn}>
                At the interval recommended on the previous report — commonly 1-3 years for a
                commercial kitchen. Thirty to fifty circuits is a full day on site. Price accordingly.
              </dd>
            </div>
            <div className={dRowCn}>
              <dt className={dtCn}>Emergency lighting testing</dt>
              <dd className={ddCn}>
                Monthly functional tests and the annual full-duration test, usually sold as a
                maintenance contract.
              </dd>
            </div>
            <div className={dRowCn}>
              <dt className={dtCn}>Fire alarm servicing</dt>
              <dd className={ddCn}>
                Scheduled servicing visits at the frequency set by BS 5839-1 and the fire risk
                assessment. Another contract opportunity.
              </dd>
            </div>
            <div className={dRowCn}>
              <dt className={dtCn}>Reactive maintenance</dt>
              <dd className={ddCn}>
                Restaurants trade long hours and cannot serve without a working kitchen. Being on call
                generates premium-rate callout work.
              </dd>
            </div>
          </dl>
        </div>
        <p>
          Elec-Mate covers the full range of certificates restaurant work needs —{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>,{' '}
          <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink>,{' '}
          <SEOInternalLink href="/minor-works-certificate">Minor Works</SEOInternalLink>, fire alarm,
          emergency lighting and appliance testing. Complete each one on your phone, generate a
          professional PDF, and send it to the owner before you leave the premises.
        </p>
        <SEOAppBridge
          title="All restaurant certificates in one app"
          description="EICR, EIC, Fire Alarm, Emergency Lighting, PAT Testing — complete every certificate a restaurant needs on your phone."
          icon={Building}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RestaurantElectricalRequirementsPage() {
  return (
    <GuideTemplate
      title="Commercial Kitchen Wiring: 100A 3-Phase = 69 kW"
      description="100A three-phase delivers ~69 kW; single-phase only ~23 kW. A 40-60 cover restaurant needs 40-80 kW after diversity. RCD rules, isolation, gas interlock."
      datePublished="2025-06-15"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Commercial Guide"
      badgeIcon={Building}
      heroTitle={
        <>
          Restaurant Electrical Requirements:{' '}
          <span className="text-elec-yellow">Commercial Kitchen Electrics Guide</span>
        </>
      }
      heroSubtitle="From three-phase supply sizing to gas interlocks, emergency switching to EICR intervals — every electrical requirement for restaurants and commercial kitchens in the UK, referenced to BS 7671:2018+A4:2026."
      readingTime={16}
      answerBox={{
        question: 'What are the electrical requirements for a commercial kitchen?',
        answer:
          'Most commercial kitchens need a three-phase supply: 100A three-phase gives roughly 69 kW against a typical post-diversity demand of 40-80 kW. Each fixed appliance takes its own circuit (Reg 314.2) with a local means of isolation (Reg 462.2). Socket-outlets up to 32A need 30 mA RCD protection (Reg 411.3.3), emergency switching off must be red on a contrasting background and latch off (Reg 537.3.3), and gas cooking equipment must be interlocked with the extract ventilation.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Restaurant Electrical Requirements"
      relatedPages={relatedPages}
      ctaHeading="Complete Restaurant Certificates on Your Phone"
      ctaSubheading="EICR, Fire Alarm, Emergency Lighting, PAT Testing — every certificate a restaurant needs, completed on site with AI-powered tools. Join 1,600+ UK electricians using Elec-Mate. 7-day free trial."
    />
  );
}
