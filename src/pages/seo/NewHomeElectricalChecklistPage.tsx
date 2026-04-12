import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  AlertTriangle,
  PoundSterling,
  Home,
  ClipboardCheck,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Flame,
  Gauge,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Safety Guides', href: '/guides/eicr-for-landlords' },
  { label: 'New Home Electrical Checklist', href: '/new-home-electrical-checklist' },
];

const tocItems = [
  { id: 'locate-consumer-unit', label: 'Locate the Consumer Unit' },
  { id: 'test-rcds', label: 'Test the RCDs' },
  { id: 'smoke-co-detectors', label: 'Smoke and CO Detectors' },
  { id: 'emergency-turnoff', label: 'Emergency Turn-Off Procedure' },
  { id: 'test-circuits', label: 'Test Each Circuit' },
  { id: 'outdoor-sockets', label: 'Outdoor Sockets and IP Rating' },
  { id: 'register-meter', label: 'Register the Meter' },
  { id: 'energy-account', label: 'Set Up Your Energy Account' },
  { id: 'eicr-on-moving-in', label: 'Should You Get an EICR?' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'On moving day or the day before, locate the consumer unit (fuse box) and know how to operate the main switch. In an emergency you need to be able to isolate the electricity supply immediately.',
  'Test every RCD in the consumer unit on the day you move in by pressing the T (test) button. Each RCD should trip within 300 milliseconds. If an RCD fails to trip or will not reset, call a qualified electrician before using the circuits it protects.',
  'Check that working smoke detectors are present on every floor and a carbon monoxide detector is fitted in any room with a gas appliance, solid fuel appliance, or oil boiler. Test all detectors when you move in.',
  'Outdoor socket outlets must be rated to at least IP44 (splash-proof) and preferably IP65 (jet-proof). All outdoor sockets must be protected by a 30mA RCD under Regulation 411.3.3 of BS 7671.',
  'Register your electricity meter with the energy supplier on the day you take possession. Take a meter reading with a photograph showing the reading and the meter serial number to avoid billing disputes.',
];

const faqs = [
  {
    question: 'What should I do with the consumer unit when I move into a new house?',
    answer:
      'First, locate it — typically under the stairs, in a hallway cupboard, or in the kitchen. Note the position of the main switch (usually on the left) and all the individual circuit breakers. Check that all breakers are labelled — if they are not, add your own labels after testing each circuit. Test the RCD test buttons to confirm they operate correctly. Photograph the consumer unit and keep the image as a reference.',
  },
  {
    question: 'How do I test an RCD in a consumer unit?',
    answer:
      'Each RCD in the consumer unit has a small T or Test button. With the circuits energised, press the T button firmly. The RCD should trip — all the breakers on that side of the board should go off — within about 300 milliseconds. If the RCD does not trip, it may be faulty and should be tested by a qualified electrician. Once tripped, reset the RCD by pushing the switch fully up. If the RCD will not reset, there may be a fault on one of the circuits it protects — disconnect any plugged-in appliances and try again.',
  },
  {
    question: 'Where should smoke detectors be positioned in a new home?',
    answer:
      'Under BS 5839-6, the recommended minimum for a new dwelling is a Grade D, LD2 system: mains-powered interlinked detectors in the hallway and landing (escape routes), plus heat detectors in the kitchen. A smoke detector in the living room and all bedrooms provides additional protection. Detectors should be positioned on the ceiling at least 300mm from any wall or light fitting, away from cooking appliances, and away from bathrooms where steam might cause false alarms.',
  },
  {
    question: 'Do I need a carbon monoxide detector?',
    answer:
      'Yes. Under the Building Safety Act 2022 changes to the Smoke and Carbon Monoxide Alarm (England) Regulations 2022, landlords are required to install CO detectors in rooms containing a gas boiler, gas fire, or solid fuel appliance. For owner-occupiers this is not legally compulsory but is strongly recommended. CO is odourless and colourless — a detector is the only reliable way to detect a leak. Fit one in any room with a boiler, gas fire, wood-burning stove, or oil appliance.',
  },
  {
    question: 'What IP rating do outdoor socket outlets need?',
    answer:
      'Outdoor socket outlets must be rated to at least IP44 (protection against solid objects over 1mm and water splashing from any direction) under BS 7671 Section 522 requirements for equipment in outdoor locations. IP65 (dust-tight and protection against water jets) is preferable, particularly for sockets used with hosepipes or in exposed locations. All outdoor socket outlets must be protected by a 30mA RCD under Regulation 411.3.3 of BS 7671.',
  },
  {
    question: 'How do I register a meter when moving into a new home?',
    answer:
      "Take meter readings for all fuel types (electricity, gas) on the day you take possession. Photograph each meter showing the reading and the meter serial number (MPAN for electricity, MPRN for gas). Contact the existing supplier to transfer the account to your name or switch to your preferred supplier. You are not obliged to stay with the vendor's supplier. If you switch, give the opening readings to both the old and new supplier to ensure you are billed correctly from the start.",
  },
  {
    question: 'Should I commission an EICR when moving into a property I have just bought?',
    answer:
      'If you commissioned an EICR during the purchase process and the result was Satisfactory, you do not need to commission another one immediately. File the EICR and diarise the next recommended inspection date. If you did not commission an EICR during purchase, or if you bought the property without a survey, commissioning one within your first year of ownership is strongly recommended — particularly for properties over 25 years old.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/buying-house-electrical-guide',
    title: 'Buying a House Electrical Checklist',
    description:
      'What to check at viewing, signs of DIY work, and rewire costs to factor into your offer.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/electrical-survey-before-buying',
    title: 'Electrical Survey When Buying',
    description: 'Do you need an EICR when buying? Costs, what it reveals, and how to negotiate.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/home-office-electrical-guide',
    title: 'Home Office Electrical Guide',
    description:
      'Dedicated circuits, data points, garden office power, and UPS for working from home.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/kitchen-electrical-requirements',
    title: 'Kitchen Electrical Requirements',
    description: 'Zone requirements, socket positions, cooker circuits, and Part P compliance.',
    icon: Gauge,
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
    id: 'locate-consumer-unit',
    heading: 'Step 1 — Locate the Consumer Unit and Main Switch',
    content: (
      <>
        <p>
          The consumer unit (often called the fuse box) is the central hub of your home's electrical
          installation. Knowing where it is and how to operate it is the single most important piece
          of electrical knowledge for any new homeowner.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Find it on day one</strong> — consumer units are commonly located under the
                stairs, in a hallway cupboard, in the kitchen, or in a utility room. In flats, it
                may be in a hallway cabinet. Make sure every member of your household knows where it
                is.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Identify the main switch</strong> — this is usually on the left side of the
                consumer unit and is typically larger than the individual circuit breakers.
                Switching it off isolates the entire electrical installation. In an emergency, this
                is the switch to operate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check the circuit labels</strong> — modern consumer units should have each
                circuit breaker labelled (lighting, sockets, cooker, shower, etc.). If labels are
                missing or unreadable, test and label each circuit yourself by switching off one
                breaker at a time and noting which sockets and lights go off.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Photograph the consumer unit</strong> — take a clear photograph of the
                consumer unit interior with the cover open, showing all breaker positions and
                labels. This is a useful reference if a breaker trips unexpectedly.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'test-rcds',
    heading: 'Step 2 — Test the RCDs',
    content: (
      <>
        <p>
          Residual Current Devices (RCDs) are the primary protection against electric shock. They
          detect small imbalances in electrical current (which occur when current flows through a
          person to earth) and disconnect the circuit within 300 milliseconds — fast enough to
          prevent cardiac fibrillation in most cases.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Press the T (Test) button on each RCD</strong> — the RCD should trip (switch
                off) immediately. If your consumer unit has two RCDs (a split-load board), test
                both. If it has individual RCBOs (one per circuit), test each one.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>If the RCD does not trip</strong> — this is a serious fault. The RCD is not
                providing protection. Do not use the circuits it covers until a qualified
                electrician has inspected and replaced the faulty device.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>If the RCD will not reset</strong> — there is likely a fault on one of the
                circuits it protects. Switch off all the individual circuit breakers on that side of
                the board, then reset the RCD. Switch each breaker back on one at a time until the
                RCD trips again — the last circuit switched on is the faulty one. Disconnect
                appliances from that circuit and try again.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test RCDs every six months</strong> — the Electricity at Work Regulations
                1989 recommend regular testing of protective devices. Press the T button every six
                months to confirm the RCD continues to operate correctly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Under Regulation 411.3.3 of BS 7671, socket-outlet circuits rated up to 32A must be
          protected by a 30mA RCD. If your consumer unit has no RCDs at all, commission an{' '}
          <SEOInternalLink href="/electrical-survey-before-buying">EICR</SEOInternalLink> as a
          priority — this is a C2 (potentially dangerous) finding.
        </p>
      </>
    ),
  },
  {
    id: 'smoke-co-detectors',
    heading: 'Step 3 — Check Smoke and Carbon Monoxide Detectors',
    content: (
      <>
        <p>
          Working smoke and carbon monoxide detectors save lives. On moving into a new property,
          check that appropriate detectors are present, test them all, and replace batteries or
          units as needed.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smoke detectors on every floor</strong> — at minimum, fit ionisation or
                optical smoke detectors in the hallway and on every landing. Optical detectors are
                better for slow-burning fires; ionisation detectors respond faster to fast-flaming
                fires. Ideally, fit both types or combination detectors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat detector in the kitchen</strong> — optical smoke detectors in kitchens
                cause false alarms from cooking. Fit a heat detector instead, which triggers on
                temperature rise rather than particles.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Carbon monoxide detector in rooms with combustion appliances</strong> — fit
                a CO detector in any room containing a gas boiler, gas fire, wood-burning stove,
                solid fuel appliance, or oil appliance. Under the Smoke and Carbon Monoxide Alarm
                (England) Regulations 2022, this is mandatory in rented properties and strongly
                recommended for owner-occupiers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test every detector</strong> — press the test button on each smoke and CO
                detector on moving-in day. Replace batteries if the alarm is faint. Replace the
                entire unit if it is more than 10 years old (smoke detectors) or more than 7 years
                old (CO detectors). Check the manufacture date on the back of the unit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'emergency-turnoff',
    heading: 'Step 4 — Know Your Emergency Turn-Off Procedures',
    content: (
      <>
        <p>
          In an electrical emergency, every member of the household needs to know how to isolate the
          electricity supply safely and quickly.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical fire</strong> — switch off the main switch on the consumer unit
                immediately. Never use water on an electrical fire. Use a CO2 or dry powder
                extinguisher. If the fire is large, evacuate and call 999. Do not re-enter the
                building until the fire service has confirmed it is safe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric shock</strong> — do not touch the person while they may still be in
                contact with the electrical source. Switch off the main switch or remove the plug
                from the socket. Call 999. If the person is not breathing, begin CPR if trained to
                do so.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flooding</strong> — if water enters areas near electrical equipment, switch
                off the main switch before entering any flooded area. Do not operate electrical
                switches or enter flooded areas before the power is off. Call a qualified
                electrician before restoring the supply after any flooding incident.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Note emergency contact numbers</strong> — save your electricity
                distributor's 24-hour emergency line (National Grid: 0800 816 9176, or your regional
                distributor) and a reliable local electrician's number in your phone before you need
                them.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'test-circuits',
    heading: 'Step 5 — Test Each Circuit',
    content: (
      <>
        <p>
          Within your first week, test every circuit in the property to confirm it is working and to
          understand the layout of the installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket circuits</strong> — plug a lamp or charger into every socket outlet
                in the property to confirm it is live. Mark any dead sockets and report them to a
                qualified electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting circuits</strong> — test every light fitting in the property.
                Replace any blown lamps. Note any fittings that are damaged, missing covers, or
                where the lampshade shows signs of heat damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cooker and shower circuits</strong> — confirm the cooker circuit breaker is
                correctly rated for your cooker (typically 32A or 40A for a full electric range).
                Test the electric shower if fitted. Note the shower's rated power (kW) and confirm
                the circuit breaker matches.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Immersion heater</strong> — if the property has an immersion heater, confirm
                the circuit breaker is operational and the timer (if fitted) is correctly set.
                Immersion heaters typically operate on a dedicated 15A or 16A circuit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'outdoor-sockets',
    heading: 'Step 6 — Check Outdoor Socket IP Rating',
    content: (
      <>
        <p>
          Outdoor socket outlets are convenient but must be correctly rated and protected to be safe
          in external environments. Inspect any outdoor sockets on the property as a priority.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum IP44 rating</strong> — outdoor sockets must be rated to at least
                IP44. This rating provides protection against solid objects over 1mm and water
                splashing from any direction. IP65 (jet-proof) is better for exposed locations.
                Check for the IP rating moulded into the back of the socket housing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection required</strong> — all outdoor socket outlets must be
                protected by a 30mA RCD under Regulation 411.3.3 of BS 7671. Check that the outdoor
                sockets are on a circuit protected by an RCD in the consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check for weatherproof covers</strong> — outdoor sockets should have
                spring-loaded covers or flap covers that close over the socket when not in use.
                Sockets without weatherproof covers should be replaced by a qualified electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Garden lighting and outbuildings</strong> — check any garden lighting
                circuits and external wiring to outbuildings, sheds, or garages. Look for armoured
                cable (SWA) where cables are buried underground or surface-mounted in exposed
                locations. Inadequate outdoor wiring is a common EICR finding.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'register-meter',
    heading: 'Step 7 — Register the Meter',
    content: (
      <>
        <p>
          Registering your electricity meter correctly on moving-in day prevents billing disputes
          that can arise months later when the previous occupier's usage is eventually reconciled.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Take photos of the meter reading</strong> — photograph your electricity (and
                gas) meter on the day you take possession, showing the reading and the meter serial
                number. Photograph the MPAN (electricity) and MPRN (gas) numbers from the meter
                label.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contact the existing supplier</strong> — call or email the energy supplier
                currently serving the property to give them your opening meter reading and to
                transfer the account to your name. You can find the current supplier using the Meter
                Point Administration Service (MPAS) by calling 0870 608 1524.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consider switching supplier</strong> — you are not obliged to stay with the
                current supplier. Once you have established the supply in your name, you can switch
                to a tariff and supplier of your choice using a comparison site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart meter upgrade</strong> — if the property has an old-style analogue
                meter, ask your supplier about a free smart meter installation. Smart meters provide
                real-time energy usage data and eliminate estimated bills.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'energy-account',
    heading: 'Step 8 — Set Up Your Energy Account',
    content: (
      <>
        <p>
          Setting up your energy account correctly at the start avoids billing problems later and
          ensures you are on the right tariff for your usage.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Economy 7 or Economy 10</strong> — if the property has storage heaters or an
                off-peak hot water cylinder, it may be on an Economy 7 or Economy 10 tariff with
                cheaper overnight electricity. Confirm whether the meter is single-rate or
                multi-rate and choose a tariff accordingly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Direct debit</strong> — set up a direct debit for your energy bill. Most
                suppliers offer a discount for direct debit customers. Review the direct debit
                amount after two or three months to ensure it reflects your actual usage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger and solar PV</strong> — if you plan to install an EV charger or
                solar panels, discuss EV tariffs and Smart Export Guarantee (SEG) options with your
                supplier before installation. Some tariffs significantly reduce the cost of
                overnight EV charging.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-on-moving-in',
    heading: 'Should You Get an EICR After Moving In?',
    content: (
      <>
        <p>
          If you commissioned an{' '}
          <SEOInternalLink href="/electrical-survey-before-buying">
            EICR during the purchase process
          </SEOInternalLink>{' '}
          and the result was Satisfactory, you do not need to commission another one immediately.
          File it and note the next recommended inspection date.
        </p>
        <p>
          If you did not commission an EICR during purchase — which is common — consider
          commissioning one within your first year of ownership, particularly for properties over 25
          years old. An EICR costs £150 to £400 and gives you a comprehensive picture of the
          installation's condition, including any issues that should be addressed proactively.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>New builds</strong> — a brand-new property will have an Electrical
                Installation Certificate (EIC) issued by the building contractor's electrician.
                Request a copy from the developer at completion. The recommended first periodic
                inspection for a new domestic installation is after 10 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Properties over 25 years old</strong> — commission an EICR within the first
                year if you did not obtain one during purchase. This gives you a baseline and
                identifies any work needed before it becomes urgent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before making alterations</strong> — always get an EICR before starting any
                significant electrical work such as adding circuits, installing an EV charger, or
                rewiring a kitchen. Knowing the existing installation's condition helps the
                electrician plan the work correctly.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: New Home Inspection Work',
    content: (
      <>
        <p>
          New homeowners who discover electrical issues soon after moving in are a strong source of
          remedial work. Many commission an EICR in their first year of ownership, and those who
          found issues during purchase need the work carried out promptly.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Deliver the EICR Before You Leave</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete and issue the report on the day of inspection. New homeowners
                  appreciate speed — they want to understand their installation and plan any
                  necessary work quickly.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Remedial and Upgrade Work</h4>
                <p className="text-white text-sm leading-relaxed">
                  New homeowners often want upgrades as well as remedial work — extra sockets, EV
                  charger points, outdoor circuits. Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to provide comprehensive quotes on the day and win the full scope of work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Win new homeowner electrical work with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. Deliver reports on the day and quote upgrade work immediately. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NewHomeElectricalChecklistPage() {
  return (
    <GuideTemplate
      title="New Home Electrical Checklist UK | Moving into a New House"
      description="Complete electrical checklist for moving into a new home in the UK. Locate consumer unit, test RCDs, check smoke and CO detectors, know emergency procedures, test outdoor sockets IP rating, register meter, and set up energy account."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Homeowner Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          New Home Electrical Checklist UK:{' '}
          <span className="text-yellow-400">8 Things to Do When You Move In</span>
        </>
      }
      heroSubtitle="Moving into a new home is hectic, but a few electrical checks in the first days can prevent serious problems later. This checklist covers locating the consumer unit, testing RCDs, checking smoke and CO detectors, knowing emergency procedures, testing outdoor sockets, and registering your meter."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Safety in a New Home"
      relatedPages={relatedPages}
      ctaHeading="Complete Home Electrical Inspections on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning and instant PDF export. Deliver reports to new homeowners before you leave. 7-day free trial."
    />
  );
}
