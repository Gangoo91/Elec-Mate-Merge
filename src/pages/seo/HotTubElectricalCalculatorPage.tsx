import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import SwimmingPoolCalculator from '@/components/apprentice/calculators/SwimmingPoolCalculator';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Calculator,
  Zap,
  Shield,
  Cable,
  Gauge,
  CheckCircle2,
  Timer,
  Droplets,
  Plug,
  Warehouse,
  ShowerHead,
} from 'lucide-react';

export default function HotTubElectricalCalculatorPage() {
  return (
    <ToolTemplate
      title="Hot Tub Electrical Calculator: 13A vs 32A Supply (UK)"
      description="Free hot tub electrical calculator. Plan a 13A plug-in or 32A hardwired supply with RCD protection, outdoor cabling and voltage drop checks to BS 7671."
      datePublished="2026-07-02"
      dateModified="2026-07-02"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'Hot Tub Electrical Calculator', href: '/tools/hot-tub-electrical-calculator' },
      ]}
      tocItems={[
        { id: 'supply-types', label: '13A Plug-In vs 32A Hardwired' },
        { id: 'worked-example', label: 'Worked Example: 32A Hot Tub' },
        { id: 'outdoor-supply', label: 'The Outdoor Supply Run' },
        { id: 'rcd-protection', label: 'RCD Protection and Earthing' },
        { id: 'isolation-positioning', label: 'Isolation and Positioning' },
        { id: 'commissioning', label: 'Testing and Certification' },
        { id: 'how-to', label: 'Step-by-Step Guide' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Outdoor Water Installations"
      badgeIcon={Droplets}
      heroTitle={
        <>
          <span className="text-yellow-400">Hot Tub Electrical Calculator</span> — Supply Sizing,
          RCD Protection, and Outdoor Cabling
        </>
      }
      calculator={<SwimmingPoolCalculator />}
      heroSubtitle="Hot tubs installed outdoors are designed using the same BS 7671 rules as swimming pools and other basins — the calculator below applies those requirements. Enter the pump, heater, and supply details to get the circuit design, zone guidance, and protection requirements for the installation."
      heroFeaturePills={[
        { icon: Plug, label: '13A vs 32A Supplies' },
        { icon: Shield, label: '30mA RCD Protection' },
        { icon: Cable, label: 'SWA Outdoor Runs' },
        { icon: Droplets, label: 'Zone Requirements' },
      ]}
      readingTime={10}
      keyTakeaways={[
        'Hot tubs come in two electrical flavours: 13A "plug and play" tubs that run from a suitable socket, and hardwired tubs — typically on a 32A dedicated circuit — that heat faster and run pumps and heater together.',
        'A typical hardwired tub with a 3kW heater and two pumps totals around 6.5kW, giving a design current of 28.3A (6500 / 230) — inside a 32A circuit.',
        'Every hot tub supply needs 30mA RCD protection — BS 7671 requires additional protection for socket outlets up to 32A, and outdoor water installations are treated to the same requirements applied to swimming pools and other basins.',
        'The outdoor run is normally SWA cable, buried with marker tape at a depth sufficient to avoid disturbance, to a weatherproof rotary isolator near (but not too near) the tub.',
        'On PME (TN-C-S) supplies, take care with the earthing arrangement for outdoor water-associated equipment — many installers use a TT arrangement for the hot tub circuit; assess the installation before deciding.',
      ]}
      sections={[
        {
          id: 'supply-types',
          heading: '13A Plug-and-Play vs 32A Hardwired Hot Tubs',
          content: (
            <>
              <p>The first question on any hot tub job is which kind of supply it needs:</p>
              <div className="grid gap-4 sm:grid-cols-2 my-4">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <h3 className="font-bold text-yellow-400 text-lg mb-2">13A Plug-and-Play</h3>
                  <ul className="space-y-2 text-white text-sm">
                    <li>Runs from a 13A supply — up to about 3kW total</li>
                    <li>Heater and pumps interlock: heating pauses when jets run</li>
                    <li>Slower to heat (often 12-24 hours from cold)</li>
                    <li>Needs a suitable outdoor socket with 30mA RCD protection</li>
                    <li>Not "just an extension lead" — see the FAQ below</li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <h3 className="font-bold text-yellow-400 text-lg mb-2">32A Hardwired</h3>
                  <ul className="space-y-2 text-white text-sm">
                    <li>Dedicated circuit from the consumer unit</li>
                    <li>Heater (typically 2-3kW) and pumps run together</li>
                    <li>Heats in hours rather than a day</li>
                    <li>SWA run to a weatherproof rotary isolator</li>
                    <li>The standard choice for anything beyond the smallest tubs</li>
                  </ul>
                </div>
              </div>
              <p>
                Larger tubs and swim spas can require 40A or even two circuits — always design
                from the manufacturer's installation manual, which states the required supply.
                Whichever type is installed, the supply needs 30mA RCD protection and a properly
                designed outdoor run.
              </p>
            </>
          ),
        },
        {
          id: 'worked-example',
          heading: 'Worked Example: 32A Hardwired Tub, 15m Run',
          content: (
            <>
              <p>
                A hardwired hot tub has a 3kW heater, a 1.5kW circulation pump, a 1.5kW jet pump,
                and 0.5kW of controls, lighting, and ancillaries — all able to run together. The
                consumer unit is 15 metres away:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <ol className="space-y-3 text-white text-sm list-decimal pl-5">
                  <li>
                    <strong className="text-yellow-400">Total load:</strong> 3.0 + 1.5 + 1.5 + 0.5
                    = <strong>6.5kW</strong>
                  </li>
                  <li>
                    <strong className="text-yellow-400">Design current:</strong> I = P / V = 6500 /
                    230 = <strong>28.3A</strong> → a 32A dedicated circuit
                  </li>
                  <li>
                    <strong className="text-yellow-400">Cable:</strong> 6mm² SWA is the typical
                    choice for a 32A outdoor run of this length — confirm the derated capacity for
                    the burial method in the calculator
                  </li>
                  <li>
                    <strong className="text-yellow-400">Voltage drop:</strong> using the published
                    figure of approximately 7.3 mV/A/m for 6mm² copper: 28.3A x 15m x 7.3 mV/A/m =
                    3,099mV = <strong>3.1V</strong>. As a percentage: 3.1 / 230 ={' '}
                    <strong>1.3%</strong> — well within the 5% limit
                  </li>
                  <li>
                    <strong className="text-yellow-400">Protection:</strong> 32A Type A 30mA RCBO
                    (or RCD-protected circuit), weatherproof rotary isolator adjacent to the tub
                  </li>
                </ol>
              </div>
              <p>
                No diversity is applied here — hot tub heaters run for long periods and pumps run
                with them, so the circuit is sized for the full connected load the control system
                allows to run simultaneously. The manufacturer's manual states that figure; when
                in doubt, use the nameplate rating.
              </p>
            </>
          ),
        },
        {
          id: 'outdoor-supply',
          heading: 'The Outdoor Supply Run',
          content: (
            <>
              <p>
                Getting the circuit from the consumer unit to the tub is usually the bulk of the
                job. The standard approach:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>
                  <strong>SWA cable for the external section</strong> — BS 7671 requires a buried
                  cable to incorporate an earthed armour or metal sheath (or run in a duct giving
                  equivalent protection), with the route marked by cable covers or marker tape and
                  buried deep enough to avoid foreseeable disturbance. Accepted practice is around
                  450mm under lawns and 600mm under drives. The{' '}
                  <SEOInternalLink href="/tools/swa-cable-size-calculator">
                    SWA cable size calculator
                  </SEOInternalLink>{' '}
                  covers armoured sizing in detail.
                </li>
                <li>
                  <strong>Weatherproof terminations</strong> — glands with shrouds, enclosures with
                  an IP rating appropriate to the location, and drip loops on cable entries.
                </li>
                <li>
                  <strong>Voltage drop</strong> — garden runs get long. Check against the 5% limit
                  with the{' '}
                  <SEOInternalLink href="/tools/voltage-drop-calculator">
                    voltage drop calculator
                  </SEOInternalLink>{' '}
                  and step up a size where needed.
                </li>
                <li>
                  <strong>Disconnection times</strong> — the added run length raises the earth
                  fault loop impedance; verify with the{' '}
                  <SEOInternalLink href="/tools/disconnection-time-calculator">
                    disconnection time calculator
                  </SEOInternalLink>
                  .
                </li>
              </ul>
            </>
          ),
          appBridge: {
            title: 'Design the Whole Outdoor Circuit',
            description:
              'Pumps, heater, supply voltage, earthing system, and installation method — the calculator produces the circuit design and protection requirements in one pass.',
            icon: Droplets,
          },
        },
        {
          id: 'rcd-protection',
          heading: 'RCD Protection, Zones, and Earthing',
          content: (
            <>
              <p>
                Water and electricity in the same garden concentrate the mind, and BS 7671 treats
                outdoor water installations accordingly:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>
                  <strong>30mA RCD protection</strong> — required for socket outlets rated up to
                  32A (Regulation 411.3.3), which covers a plug-and-play tub's socket, and standard
                  practice for the hardwired circuit. A Type A RCBO dedicated to the hot tub
                  circuit is the clean solution.
                </li>
                <li>
                  <strong>Zone-based requirements</strong> — BS 7671's section on swimming pools
                  and other basins notes its requirements may also be applied to hot tubs installed
                  outdoors. That brings zone-based restrictions on what equipment can sit near the
                  water and the IP ratings it needs, which the calculator above applies.
                </li>
                <li>
                  <strong>Earthing on PME supplies</strong> — exporting a PME earth to outdoor
                  equipment where a person can be in contact with water and true earth
                  simultaneously deserves careful assessment. Many installers put the hot tub
                  circuit on a TT arrangement (local earth electrode) instead; assess the
                  installation and document the decision.
                </li>
                <li>
                  <strong>Supplementary bonding</strong> — check what the manufacturer requires and
                  what the installation's protective measures rely on; metallic structures around
                  the tub may need bonding into the arrangement.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: 'isolation-positioning',
          heading: 'Isolation and Positioning',
          content: (
            <>
              <p>Points that make the installation safe to use and maintain:</p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <ul className="space-y-3 text-white text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Rotary isolator</strong> — a weatherproof
                      double-pole isolator near the tub lets it be isolated for servicing and water
                      changes without a trip to the consumer unit. Position it out of reach of a
                      person in the water but convenient for maintenance.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Socket positioning</strong> — for
                      plug-and-play tubs, the socket should be positioned per the manufacturer's
                      minimum distance from the water, protected from weather, and never reachable
                      from inside the tub.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Equipment near the water</strong> —
                      lighting, sockets, and accessories close to the tub are constrained by the
                      zone requirements; choose IP-rated equipment accordingly.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Manufacturer's manual</strong> — hot tub
                      warranty terms very often require installation by a qualified electrician to
                      the manual's specification. Keep it with the certificate.
                    </span>
                  </li>
                </ul>
              </div>
            </>
          ),
        },
        {
          id: 'commissioning',
          heading: 'Testing and Certification',
          content: (
            <>
              <p>
                A hot tub supply is notifiable work in most cases — a new outdoor circuit — and it
                gets the full test sequence: continuity, insulation resistance, polarity, earth
                fault loop impedance, and RCD operation, recorded on an Electrical Installation
                Certificate. Points specific to hot tubs:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>
                  Verify the RCD trips correctly — it is the primary additional protection for
                  people in the water.
                </li>
                <li>
                  Measure Zs at the isolator and at the tub connection; long garden runs can eat
                  the loop impedance margin.
                </li>
                <li>
                  Record the earthing arrangement decision (PME vs TT for the outdoor circuit) on
                  the certificate.
                </li>
                <li>
                  If the tub replaces a plug-and-play unit on an existing socket, resist the
                  temptation to skip design checks — the hardwired load profile is different.
                </li>
              </ul>
              <p>
                Elec-Mate takes the circuit design straight through to the EIC — size it here,
                test it, certify it in the app, and hand the customer a professional pack.
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Check the manufacturer requirements',
          text: 'The installation manual states the required supply — 13A plug-and-play, 32A hardwired, or larger. Design from that document, using the nameplate rating where anything is unclear.',
        },
        {
          name: 'Calculate the design current',
          text: 'Total the simultaneous load (heater + pumps + ancillaries) and divide by 230V. A typical 6.5kW hardwired tub gives 28.3A — a 32A circuit. Apply no diversity.',
        },
        {
          name: 'Design the outdoor run',
          text: 'SWA buried with marker tape at an appropriate depth (accepted practice 450-600mm), or ducted. Size for current and check voltage drop over the actual garden run.',
        },
        {
          name: 'Specify protection and isolation',
          text: '30mA Type A RCD protection on the circuit, a weatherproof rotary isolator near the tub, and IP-rated equipment respecting the zone requirements around the water.',
        },
        {
          name: 'Decide the earthing arrangement',
          text: 'On PME supplies, assess whether to export the earth to the outdoor water installation or use a TT arrangement for the circuit. Document the decision, then test and certify.',
        },
      ]}
      howToHeading="How to Design a Hot Tub Supply"
      howToDescription="Five steps from the manufacturer's manual to a certified outdoor circuit."
      features={[
        {
          icon: Droplets,
          title: 'Outdoor Water Installation Design',
          description:
            'The calculator applies the BS 7671 approach for swimming pools and other basins — which extends to hot tubs installed outdoors.',
        },
        {
          icon: Shield,
          title: 'RCD and Zone Guidance',
          description:
            '30mA RCD requirements, zone-based equipment restrictions, and IP rating guidance for kit near the water.',
        },
        {
          icon: Cable,
          title: 'Supply and Cable Sizing',
          description:
            'Pump and heater loads totalled into a design current, with the SWA run sized and voltage drop checked.',
        },
        {
          icon: Plug,
          title: '13A and 32A Supplies',
          description:
            'Covers plug-and-play socket requirements and dedicated hardwired circuits alike.',
        },
        {
          icon: Zap,
          title: 'Earthing Arrangement Support',
          description:
            'TN-S, TN-C-S, and TT selections with guidance on the PME question for outdoor water equipment.',
        },
        {
          icon: Calculator,
          title: 'From Design to Certificate',
          description:
            'Carry the circuit into an EIC in Elec-Mate — design, test results, and certification in one app.',
        },
      ]}
      featuresHeading="Hot Tub Calculator Features"
      featuresSubheading="Everything between the consumer unit and the water, designed properly."
      faqs={[
        {
          question: 'Can I run a hot tub off a normal socket?',
          answer:
            'Only if it is a genuine 13A plug-and-play tub, and only from a suitable socket — one in good condition, with 30mA RCD protection (required by BS 7671 for socket outlets up to 32A), ideally on its own circuit rather than shared with other garden loads, and positioned per the manufacturer\'s minimum distance from the water. A 13A tub drawing near-full current for many hours is a demanding load for a socket, and long extension leads are not acceptable. Anything larger than about 3kW needs a hardwired supply.',
        },
        {
          question: 'What size supply does a hardwired hot tub need?',
          answer:
            'Most hardwired domestic tubs specify a 32A single-phase supply. A typical example — 3kW heater, two pumps at 1.5kW each, 0.5kW of ancillaries — totals 6.5kW, a design current of 28.3A (6500 / 230), which sits inside a 32A dedicated circuit in 6mm² SWA for typical run lengths. Larger tubs and swim spas can require 40A or dual supplies. Always design from the manufacturer\'s installation manual, and apply no diversity — heater and pumps run together for long periods.',
        },
        {
          question: 'Does a hot tub need an RCD?',
          answer:
            'Yes — 30mA RCD protection is essential on any hot tub supply. For a plug-and-play tub, BS 7671 requires 30mA RCD additional protection for socket outlets rated up to 32A. For hardwired tubs, the circuit is given 30mA RCD protection as standard practice for an outdoor water installation — a dedicated Type A RCBO is the usual choice, keeping the tub from tripping other circuits. Test the RCD at commissioning and advise the customer to use the test button periodically.',
        },
        {
          question: 'What cable do I use for a hot tub supply?',
          answer:
            'The external section is normally SWA (steel wire armoured) cable — BS 7671 requires buried cables to incorporate an earthed armour or metal sheath, or equivalent duct protection, with the route marked by marker tape and buried deep enough to avoid foreseeable disturbance (accepted practice is around 450-600mm). For a 32A tub circuit, 6mm² SWA is the typical size on shorter garden runs, stepping up where voltage drop over a long garden demands it. Terminate with weatherproof glands into IP-rated enclosures.',
        },
        {
          question: 'Is a hot tub covered by the swimming pool regulations?',
          answer:
            'BS 7671\'s section covering swimming pools and other basins states its requirements may also be applied to hot tubs installed outdoors — so the zone-based approach, equipment restrictions, and protection requirements used for pools are the appropriate design basis for an outdoor hot tub. Indoor hot tubs in bathrooms interact with the requirements for locations containing a bath or shower instead. Either way: 30mA RCD protection, careful equipment selection near the water, and a properly designed dedicated supply.',
        },
        {
          question: 'Should a hot tub be on a TT earth?',
          answer:
            'On a PME (TN-C-S) supply, exporting the earth to outdoor equipment where a person can simultaneously touch the water and true earth needs careful assessment — under certain supply fault conditions the PME earth can rise above true earth potential. Many installers therefore supply outdoor hot tubs from a TT arrangement with a local earth electrode and RCD protection. It is an assessment, not an automatic rule: consider the installation, follow the manufacturer\'s instructions, and record the decision on the certificate.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/swa-cable-size-calculator',
          title: 'SWA Cable Size Calculator',
          description: 'Size the buried armoured run from the consumer unit to the tub.',
          icon: Shield,
          category: 'Calculators',
        },
        {
          href: '/tools/cable-sizing-calculator',
          title: 'Cable Sizing Calculator',
          description:
            'The full BS 7671 cable sizing tool with all installation methods and correction factors.',
          icon: Cable,
          category: 'Calculators',
        },
        {
          href: '/tools/voltage-drop-calculator',
          title: 'Voltage Drop Calculator',
          description: 'Check long garden runs against the 5% BS 7671 limit.',
          icon: Gauge,
          category: 'Calculators',
        },
        {
          href: '/tools/garage-supply-calculator',
          title: 'Garage Supply Calculator',
          description: 'Feeding the tub from an outbuilding? Assess the submain load first.',
          icon: Warehouse,
          category: 'Calculators',
        },
        {
          href: '/tools/shower-cable-size-calculator',
          title: 'Shower Cable Size Calculator',
          description: 'The indoor cousin: dedicated high-current circuits for electric showers.',
          icon: ShowerHead,
          category: 'Calculators',
        },
        {
          href: '/tools/disconnection-time-calculator',
          title: 'Disconnection Time Calculator',
          description: 'Verify disconnection times over the added impedance of the garden run.',
          icon: Timer,
          category: 'Calculators',
        },
      ]}
      ctaHeading="Design hot tub supplies with confidence"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for outdoor circuit design, cable sizing, and certification. 7-day free trial, cancel anytime."
      toolPath="/tools/hot-tub-electrical-calculator"
    />
  );
}
