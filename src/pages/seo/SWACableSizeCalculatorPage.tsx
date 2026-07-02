import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import CableSizingCalculator from '@/components/apprentice/calculators/CableSizingCalculator';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Calculator,
  Zap,
  Shield,
  Cable,
  Gauge,
  Activity,
  CheckCircle2,
  Timer,
  Warehouse,
  Car,
  Shovel,
} from 'lucide-react';

export default function SWACableSizeCalculatorPage() {
  return (
    <ToolTemplate
      title="SWA Cable Size Calculator: Submains & Outbuildings"
      description="Free SWA cable size calculator for garden offices, garages and submains. Steel wire armoured sizing with voltage drop and burial guidance to BS 7671."
      datePublished="2026-07-02"
      dateModified="2026-07-02"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'SWA Cable Size Calculator', href: '/tools/swa-cable-size-calculator' },
      ]}
      tocItems={[
        { id: 'what-is-swa', label: 'What Is SWA Cable?' },
        { id: 'when-to-use-swa', label: 'When to Use SWA' },
        { id: 'sizing-factors', label: 'What Governs the Size' },
        { id: 'worked-example', label: 'Worked Example: Outbuilding' },
        { id: 'burying-swa', label: 'Burying SWA: Depths and Ducting' },
        { id: 'glands-earthing', label: 'Glands, Armour and Earthing' },
        { id: 'how-to', label: 'Step-by-Step Guide' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Armoured Cable Design"
      badgeIcon={Shield}
      heroTitle={
        <>
          <span className="text-yellow-400">SWA Cable Size Calculator</span> — Steel Wire Armoured
          Sizing for Submains and Outbuildings
        </>
      }
      calculator={<CableSizingCalculator />}
      heroSubtitle="Enter the load current, run length, and installation method — buried, ducted, clipped, or on tray. The calculator sizes the steel wire armoured cable, applies the correction factors, and checks voltage drop over the long runs SWA is usually asked to make. Select the SWA cable type in the calculator for armoured ratings."
      heroFeaturePills={[
        { icon: Shield, label: 'SWA Ratings' },
        { icon: Shovel, label: 'Buried Runs' },
        { icon: Gauge, label: 'Voltage Drop' },
        { icon: Warehouse, label: 'Outbuilding Submains' },
      ]}
      readingTime={11}
      keyTakeaways={[
        'SWA (steel wire armoured) cable is the standard choice for buried and external runs — BS 7671 requires a cable buried in the ground to incorporate an earthed armour or metal sheath, or be installed in a duct giving equivalent protection.',
        'Voltage drop usually governs SWA sizing, not current-carrying capacity — outbuilding runs of 25-60 metres routinely push the size up a step or two beyond what the load current alone would need.',
        'Buried cables must be marked by cable covers or marker tape and buried deep enough to avoid foreseeable disturbance — accepted practice is around 450mm under gardens and 600mm under driveways, though BS 7671 states no fixed figure.',
        'The steel armour can serve as the circuit protective conductor where its conductance is adequate — verify it for the size and length, or run a separate CPC.',
        'A typical 10kW outbuilding at 40m works out at 43.5A, pointing to a 10mm² SWA submain once voltage drop is checked — the calculator confirms the size for your actual load and length.',
      ]}
      sections={[
        {
          id: 'what-is-swa',
          heading: 'What Is SWA Cable?',
          content: (
            <>
              <p>
                Steel wire armoured cable is a multicore cable with a layer of galvanised steel
                wires wound around the insulated cores, under an outer PVC sheath. The armour does
                two jobs: it protects the cable from mechanical damage — spades, rodents, ground
                movement, impacts — and it can act as an earthed metallic layer around the live
                conductors, which is what makes SWA suitable for burial.
              </p>
              <p>
                SWA is available with PVC or XLPE insulation (XLPE runs at a higher conductor
                temperature and carries more current for the same size), in 2-core, 3-core, 4-core,
                and 5-core configurations. For a single-phase submain, 3-core is common (line,
                neutral, and a core used as CPC, or armour as CPC with the third core spare); for
                three-phase, 4-core or 5-core.
              </p>
              <p>
                The calculator above includes SWA cable types with their tabulated ratings — select
                the armoured option and the installation method (buried, in duct, clipped, on
                tray) to size from the correct table.
              </p>
            </>
          ),
        },
        {
          id: 'when-to-use-swa',
          heading: 'When to Use SWA',
          content: (
            <>
              <p>The jobs where SWA is the standard answer:</p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <ul className="space-y-3 text-white text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Outbuilding submains</strong> — garages,
                      garden offices, workshops, summer houses. Usually buried across the garden.
                      See the{' '}
                      <SEOInternalLink href="/tools/garage-supply-calculator">
                        garage supply calculator
                      </SEOInternalLink>{' '}
                      for the load-assessment side.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">EV charger runs</strong> — external or
                      buried sections to driveway charging points. The{' '}
                      <SEOInternalLink href="/tools/ev-charger-cable-size-calculator">
                        EV charger cable size calculator
                      </SEOInternalLink>{' '}
                      covers the circuit design.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Hot tubs and outdoor equipment</strong> —
                      hardwired outdoor supplies where the cable needs mechanical protection. See
                      the{' '}
                      <SEOInternalLink href="/tools/hot-tub-electrical-calculator">
                        hot tub electrical calculator
                      </SEOInternalLink>
                      .
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Commercial and industrial distribution
                      </strong>{' '}
                      — submains on tray or ladder, external plant, and anywhere the cable is
                      exposed to mechanical risk.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                The common thread is exposure: outdoors, underground, or anywhere twin and earth
                would be vulnerable. BS 7671 requires that a cable buried in the ground
                incorporates an earthed armour or metal sheath suitable for use as a protective
                conductor — or is installed in a conduit or duct that provides equivalent
                protection against mechanical damage. SWA is the simplest way to meet that.
              </p>
            </>
          ),
        },
        {
          id: 'sizing-factors',
          heading: 'What Governs the Size: Capacity, Volt Drop, and the Ground',
          content: (
            <>
              <p>Four things decide an SWA size, and on long runs it is rarely the first one:</p>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>
                  <strong>Current-carrying capacity</strong> — the tabulated rating for the cable
                  type and installation method, derated where needed. Buried cables have their own
                  ratings, affected by soil thermal resistivity and burial depth; cables in ducts
                  are rated differently from direct-buried.
                </li>
                <li>
                  <strong>Voltage drop</strong> — the usual governing factor for outbuilding
                  submains. A 40-60 metre run at 40A+ eats into the 5% limit fast, and the submain
                  should not use the whole allowance — the final circuits in the outbuilding need
                  their share too.
                </li>
                <li>
                  <strong>Earth fault loop impedance</strong> — a long submain adds impedance, and
                  the protective device at the origin still has to disconnect in time. Check with
                  the{' '}
                  <SEOInternalLink href="/tools/disconnection-time-calculator">
                    disconnection time calculator
                  </SEOInternalLink>
                  .
                </li>
                <li>
                  <strong>Grouping</strong> — where several SWA cables share a trench or tray,
                  grouping factors reduce each cable's capacity.
                </li>
              </ul>
              <p>
                A useful habit for submains: size for voltage drop first, then confirm capacity.
                The calculator runs both checks together and tells you which one governed.
              </p>
            </>
          ),
          appBridge: {
            title: 'Size an SWA Run in Seconds',
            description:
              'Select the SWA cable type, enter the load and length, choose buried or clipped, and get the size with voltage drop verified.',
            icon: Shield,
          },
        },
        {
          id: 'worked-example',
          heading: 'Worked Example: 10kW Outbuilding at 40 Metres',
          content: (
            <>
              <p>
                A garden workshop needs a submain for an assessed demand of 10kW — a small consumer
                unit feeding sockets, lighting, and a 3kW heater. The trench run is 40 metres:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <ol className="space-y-3 text-white text-sm list-decimal pl-5">
                  <li>
                    <strong className="text-yellow-400">Design current:</strong> I = P / V = 10000
                    / 230 = <strong>43.5A</strong> → a 45A or 50A protective device at the origin
                  </li>
                  <li>
                    <strong className="text-yellow-400">First-pass size:</strong> on current alone,
                    a 6mm² or 10mm² SWA might carry it depending on method — but check voltage drop
                    before settling
                  </li>
                  <li>
                    <strong className="text-yellow-400">Voltage drop at 10mm²:</strong> using the
                    published figure of approximately 4.4 mV/A/m for 10mm² copper: 43.5A x 40m x
                    4.4 mV/A/m = 7,656mV = <strong>7.66V</strong>. As a percentage: 7.66 / 230 ={' '}
                    <strong>3.3%</strong>
                  </li>
                  <li>
                    <strong className="text-yellow-400">Judgement:</strong> 3.3% passes the 5%
                    limit, but leaves only 1.7% for the final circuits inside the workshop. For a
                    workshop with a heavily loaded socket circuit, stepping up to 16mm²
                    (approximately 2.8 mV/A/m, giving 4.87V = 2.1%) buys comfortable headroom for
                    the whole installation
                  </li>
                </ol>
              </div>
              <p>
                This is the classic SWA sizing story: the load says 10mm², the distance says think
                bigger. The calculator shows the voltage drop at each size so the trade-off is
                explicit rather than guessed.
              </p>
            </>
          ),
        },
        {
          id: 'burying-swa',
          heading: 'Burying SWA: Depths, Marker Tape, and Ducting',
          content: (
            <>
              <p>
                BS 7671 sets the principles for buried cables: the cable must incorporate an
                earthed armour or metal sheath suitable for use as a protective conductor (or be in
                a duct with equivalent mechanical protection), the route must be marked by cable
                covers or suitable marker tape, and the cable must be buried at a depth sufficient
                to avoid damage from any reasonably foreseeable disturbance of the ground.
              </p>
              <p>
                BS 7671 deliberately does not state a fixed depth — "sufficient" depends on what
                happens above. Accepted practice in the trade:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Around 450mm</strong> under lawns and flower beds — below spade and
                      rotavator depth
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Around 600mm</strong> under driveways, vehicle routes, and cultivated
                      ground
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong>Sand bed and marker tape</strong> — lay the cable on a bed free of
                      sharp stones, cover, then marker tape part-way up the backfill
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Ducting is worth serious consideration even where direct burial is permitted: a
                duct with a draw cord makes the inevitable future upgrade — a bigger outbuilding
                load, an EV charger, three-phase — a pull-through rather than a re-dig. Note that
                cables in ducts have lower tabulated ratings than direct-buried cables of the same
                size, so re-check the capacity if you switch from direct burial to duct. The
                calculator covers both methods.
              </p>
            </>
          ),
        },
        {
          id: 'glands-earthing',
          heading: 'Glands, Armour, and Earthing',
          content: (
            <>
              <p>
                SWA is terminated with mechanical glands that clamp the armour, providing strain
                relief and electrical continuity from the armour to the gland plate. Getting the
                termination right matters for safety, not just neatness:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>
                  <strong>The armour must be earthed.</strong> It is an exposed (or extraneous)
                  metallic layer around live conductors — the gland and banjo/earth tag connect it
                  to the earthing arrangement at the supply end as a minimum.
                </li>
                <li>
                  <strong>Armour as CPC</strong> — BS 7671 recognises the earthed armour of a
                  buried cable as suitable for use as a protective conductor. Whether it is
                  adequate on its own depends on its conductance for the size and length of the
                  run, verified against the adiabatic requirement — use the{' '}
                  <SEOInternalLink href="/tools/adiabatic-equation-calculator">
                    adiabatic equation calculator
                  </SEOInternalLink>{' '}
                  or run a dedicated CPC core where in doubt.
                </li>
                <li>
                  <strong>Outdoor glands</strong> — use weatherproof glands with shrouds for
                  external terminations, and maintain the enclosure's IP rating.
                </li>
                <li>
                  <strong>Earthing at the outbuilding</strong> — decide deliberately whether the
                  outbuilding takes the origin's earthing arrangement or a local TT electrode; on
                  PME supplies this decision needs particular care for outdoor and
                  water-associated equipment.
                </li>
              </ul>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Assess the load',
          text: 'Total the demand the SWA run will supply, with diversity where appropriate. For an outbuilding, list the circuits it will feed and use a realistic assessed demand, not the sum of every breaker.',
        },
        {
          name: 'Measure the route',
          text: 'Measure the actual trench or tray route including both ends inside the buildings. Note the installation method for each section — direct buried, in duct, clipped — the worst case governs.',
        },
        {
          name: 'Size for voltage drop first',
          text: 'On runs over about 25 metres, voltage drop usually governs. Keep the submain drop low enough to leave allowance for the final circuits beyond it.',
        },
        {
          name: 'Confirm current-carrying capacity',
          text: 'Check the tabulated SWA rating for the method, derated for grouping and ground conditions where applicable. The calculator applies these automatically.',
        },
        {
          name: 'Plan the burial and terminations',
          text: 'Trench to an appropriate depth (accepted practice around 450-600mm), lay marker tape, and specify glands with the armour earthed — verifying the armour if it serves as the CPC.',
        },
      ]}
      howToHeading="How to Size an SWA Cable"
      howToDescription="Five steps from load assessment to a buried, terminated, verified submain."
      features={[
        {
          icon: Shield,
          title: 'SWA Ratings Built In',
          description:
            'Steel wire armoured cable types with their tabulated ratings — multicore and single-core armoured options.',
        },
        {
          icon: Shovel,
          title: 'Buried and Ducted Methods',
          description:
            'Direct-buried and in-duct installation methods with the correct rating basis for each.',
        },
        {
          icon: Gauge,
          title: 'Long-Run Voltage Drop',
          description:
            'The governing check for most submains — calculated from tabulated mV/A/m values over your actual route length.',
        },
        {
          icon: Cable,
          title: 'Submain Design Workflow',
          description:
            'Pairs with the diversity and maximum demand calculators to go from outbuilding loads to a finished submain spec.',
        },
        {
          icon: Zap,
          title: 'Adiabatic and Zs Checks',
          description:
            'Verify the armour as CPC and the disconnection times with the adiabatic and earth fault loop tools in the same app.',
        },
        {
          icon: Calculator,
          title: '70+ Calculators in One App',
          description:
            'Every design calculation an electrician needs, in one place, on the phone in the van.',
        },
      ]}
      featuresHeading="SWA Calculator Features"
      featuresSubheading="Armoured cable sizing for the runs that twin and earth cannot make."
      faqs={[
        {
          question: 'What size SWA do I need for a garden office?',
          answer:
            'It depends on the assessed load and the run length. A typical garden office with sockets, lighting, and a 2kW heater might assess at 25-32A, where 6mm² SWA covers the current on short runs — but voltage drop over a 30-50 metre garden usually pushes the answer to 10mm², and a workshop-grade load of 40A+ at that distance often lands on 16mm². Size for voltage drop first on long runs, then confirm capacity. The calculator does both from your actual load and length.',
        },
        {
          question: 'How deep should SWA cable be buried?',
          answer:
            'BS 7671 requires buried cables to be at a depth sufficient to avoid damage from any reasonably foreseeable disturbance of the ground, and for the route to be marked with cable covers or marker tape — it deliberately does not state a fixed depth. Accepted practice is around 450mm under lawns and beds, and around 600mm under driveways or ground that gets cultivated or trafficked. Lay the cable on a bed free of sharp stones and place marker tape in the backfill above it.',
        },
        {
          question: 'Does SWA have to be buried in a duct?',
          answer:
            'No. SWA can be direct-buried because its earthed steel armour provides the mechanical protection and earthed metallic layer BS 7671 requires of a buried cable. A duct is an alternative route to compliance for unarmoured cables (where it provides equivalent protection) and a genuinely useful upgrade path for SWA too — a duct with a draw cord makes future replacement a pull-through instead of a re-dig. Note that in-duct ratings are lower than direct-buried ratings for the same cable, so re-check the size if you switch.',
        },
        {
          question: 'Can the SWA armour be used as the earth (CPC)?',
          answer:
            'Yes, where it qualifies — BS 7671 requires a buried cable to incorporate an earthed armour or metal sheath suitable for use as a protective conductor, and steel wire armour can be exactly that. Whether the armour alone is adequate depends on its conductance for the cable size and run length, verified against the adiabatic requirement for the fault level and disconnection time. On smaller sizes and long runs many electricians terminate the armour to earth for its protective function and also run or use a separate CPC core. Verify rather than assume.',
        },
        {
          question: 'Is XLPE SWA better than PVC SWA?',
          answer:
            'XLPE-insulated SWA runs at a higher permitted conductor temperature than PVC, so the same size carries more current. That can let you drop a size on capacity grounds — but on long submains voltage drop usually governs, and volt drop does not improve with insulation type, so the XLPE advantage often disappears in practice. Price and availability being similar, XLPE is a sensible default; just size against the correct table, which the calculator selects for you.',
        },
        {
          question: 'What checks does a long SWA submain need besides cable size?',
          answer:
            'Three main ones. First, earth fault loop impedance: the added impedance of a long run must still allow the protective device to disconnect in time. Second, voltage drop allocation: the submain and the final circuits beyond it share the 5% total, so keep the submain portion low. Third, the earthing arrangement at the far end: decide whether the outbuilding uses the origin earth or a local TT electrode, with particular care on PME supplies feeding outdoor or water-associated equipment.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/cable-sizing-calculator',
          title: 'Cable Sizing Calculator',
          description:
            'The full BS 7671 cable sizing tool with all cable types and correction factors.',
          icon: Cable,
          category: 'Calculators',
        },
        {
          href: '/tools/garage-supply-calculator',
          title: 'Garage Supply Calculator',
          description:
            'Assess the outbuilding load with diversity before sizing the SWA submain.',
          icon: Warehouse,
          category: 'Calculators',
        },
        {
          href: '/tools/voltage-drop-calculator',
          title: 'Voltage Drop Calculator',
          description: 'Check long submain runs against the BS 7671 voltage drop limits.',
          icon: Gauge,
          category: 'Calculators',
        },
        {
          href: '/tools/ev-charger-cable-size-calculator',
          title: 'EV Charger Cable Size Calculator',
          description: 'Size the SWA run to a driveway or garage EV charging point.',
          icon: Car,
          category: 'Calculators',
        },
        {
          href: '/tools/adiabatic-equation-calculator',
          title: 'Adiabatic Equation Calculator',
          description: 'Verify the armour or CPC size against fault current and disconnection time.',
          icon: Zap,
          category: 'Calculators',
        },
        {
          href: '/tools/disconnection-time-calculator',
          title: 'Disconnection Time Calculator',
          description: 'Confirm disconnection times over the added impedance of a long submain.',
          icon: Timer,
          category: 'Calculators',
        },
      ]}
      ctaHeading="Size SWA submains with confidence"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for armoured cable sizing, voltage drop, and certification. 7-day free trial, cancel anytime."
      toolPath="/tools/swa-cable-size-calculator"
    />
  );
}
