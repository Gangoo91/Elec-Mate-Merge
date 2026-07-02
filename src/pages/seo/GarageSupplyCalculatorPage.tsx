import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import DiversityFactorCalculator from '@/components/apprentice/calculators/DiversityFactorCalculator';
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
  BarChart3,
} from 'lucide-react';

export default function GarageSupplyCalculatorPage() {
  return (
    <ToolTemplate
      title="Garage Supply Calculator: Submain & Consumer Unit (UK)"
      description="Free garage supply calculator. Assess outbuilding load with diversity, size the SWA submain and choose the consumer unit and RCD to BS 7671 in seconds."
      datePublished="2026-07-02"
      dateModified="2026-07-02"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'Garage Supply Calculator', href: '/tools/garage-supply-calculator' },
      ]}
      tocItems={[
        { id: 'garage-supply-basics', label: 'What a Garage Supply Involves' },
        { id: 'load-assessment', label: 'Assessing the Load' },
        { id: 'worked-example', label: 'Worked Example: Workshop Garage' },
        { id: 'swa-submain', label: 'The SWA Submain' },
        { id: 'consumer-unit-earthing', label: 'Consumer Unit and Earthing' },
        { id: 'future-proofing', label: 'Future-Proofing: EV and Beyond' },
        { id: 'how-to', label: 'Step-by-Step Guide' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Outbuilding Submains"
      badgeIcon={Warehouse}
      heroTitle={
        <>
          <span className="text-yellow-400">Garage Supply Calculator</span> — Load Assessment,
          Submain Sizing, and Consumer Unit Selection
        </>
      }
      calculator={<DiversityFactorCalculator />}
      heroSubtitle="Add the garage's loads — sockets, lighting, heating, machinery, a future EV charger — and the calculator applies diversity to produce a realistic assessed demand, then recommends the main protective device. From there, size the SWA submain and pick the consumer unit. No more guessing between a 32A and a 63A feed."
      heroFeaturePills={[
        { icon: BarChart3, label: 'Load Assessment' },
        { icon: Cable, label: 'SWA Submains' },
        { icon: Shield, label: 'Small Consumer Units' },
        { icon: Car, label: 'EV-Ready Design' },
      ]}
      readingTime={11}
      keyTakeaways={[
        'A garage supply is a submain feeding a small consumer unit — the design starts with a realistic assessed demand, not the sum of every breaker in the garage board.',
        'Diversity is what separates a sensible 40A submain from an unnecessary 80A one: not everything in a garage runs at once, and the assessment should reflect how the space is actually used.',
        'A typical workshop garage — socket circuit, lighting, and a 2kW heater — assesses to around 30A, pointing to a 40A submain with headroom.',
        'Voltage drop governs most garage submains: the run is long and the submain must leave allowance within the 5% limit for the final circuits beyond it.',
        'Adding an EV charger changes everything — a 32A continuous load on top of the garage demand usually decides the submain size, so design for it now even if the charger comes later.',
      ]}
      sections={[
        {
          id: 'garage-supply-basics',
          heading: 'What a Garage Supply Involves',
          content: (
            <>
              <p>
                Feeding a detached garage or outbuilding properly means installing a submain: a
                suitably protected circuit from the house consumer unit (or a dedicated switch
                fuse) out to a small consumer unit in the garage, which then serves the garage's
                own final circuits — sockets, lighting, and whatever the space is really for.
              </p>
              <p>The parts of the job:</p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <ul className="space-y-3 text-white text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Load assessment</strong> — what will the
                      garage actually demand? This page and the calculator above.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">The submain cable</strong> — normally
                      buried SWA, sized for the assessed demand and the run length.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">The garage consumer unit</strong> — a
                      small board with RCD/RCBO protection for the final circuits.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">The earthing decision</strong> — export
                      the house earth or install a TT electrode at the garage.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                A single socket on a spur will do for a lawnmower; anything resembling a workshop,
                gym, office, or EV charging point deserves the full treatment.
              </p>
            </>
          ),
        },
        {
          id: 'load-assessment',
          heading: 'Assessing the Load: Realistic, Not Theoretical',
          content: (
            <>
              <p>
                The wrong way to size a garage supply is to add up the ratings of every protective
                device in the garage board — a 32A socket circuit plus a 6A lighting circuit plus a
                16A heater circuit does not mean a 54A demand. The right way is to assess what
                actually runs simultaneously:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>
                  <strong>Sockets</strong> — assess by use: a hobby workshop might realistically
                  see one big power tool plus a dust extractor and battery chargers at once, not a
                  fully loaded circuit.
                </li>
                <li>
                  <strong>Lighting</strong> — LED workshop lighting is a small, steady load; apply
                  standard lighting diversity.
                </li>
                <li>
                  <strong>Heating</strong> — the load most likely to run continuously; take fixed
                  heating at full rating in cold months.
                </li>
                <li>
                  <strong>Fixed machinery</strong> — compressors, welders, and saws by their duty:
                  a welder's demand is intermittent but high, and motor starting matters for
                  device selection. See the{' '}
                  <SEOInternalLink href="/tools/motor-starting-current-calculator">
                    motor starting current calculator
                  </SEOInternalLink>
                  .
                </li>
                <li>
                  <strong>EV charging</strong> — the exception to diversity: a single charger is a
                  continuous full-current load. Take it at 100%.
                </li>
              </ul>
              <p>
                The calculator above lets you add each load with its type, applies the appropriate
                diversity, and recommends the main device rating — the number the submain is then
                designed around.
              </p>
            </>
          ),
          appBridge: {
            title: 'Assess the Garage Demand in Seconds',
            description:
              'Add sockets, lighting, heating, and machinery as separate loads. The calculator applies diversity by load type and recommends the submain protective device.',
            icon: BarChart3,
          },
        },
        {
          id: 'worked-example',
          heading: 'Worked Example: Workshop Garage at 25 Metres',
          content: (
            <>
              <p>
                A detached double garage used as a workshop: one socket circuit, LED lighting, and
                a 2kW fixed heater. The trench run from the house board is 25 metres:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <ol className="space-y-3 text-white text-sm list-decimal pl-5">
                  <li>
                    <strong className="text-yellow-400">Sockets:</strong> assessed at{' '}
                    <strong>20A</strong> — realistic simultaneous workshop use, not the 32A device
                    rating
                  </li>
                  <li>
                    <strong className="text-yellow-400">Lighting:</strong> 460W of LED battens =
                    2A; with standard lighting diversity, take <strong>2A</strong>
                  </li>
                  <li>
                    <strong className="text-yellow-400">Heater:</strong> 2000 / 230 ={' '}
                    <strong>8.7A</strong> at full rating
                  </li>
                  <li>
                    <strong className="text-yellow-400">Assessed demand:</strong> 20 + 2 + 8.7 ={' '}
                    <strong>30.7A</strong> → a <strong>40A</strong> submain device gives sensible
                    headroom
                  </li>
                  <li>
                    <strong className="text-yellow-400">Submain cable:</strong> for a 40A buried
                    run, 10mm² SWA is the typical choice. Voltage drop using the published figure
                    of approximately 4.4 mV/A/m for 10mm² copper: 30.7A x 25m x 4.4 mV/A/m =
                    3,377mV = <strong>3.4V = 1.5%</strong> — leaving ample allowance for the final
                    circuits beyond the garage board
                  </li>
                </ol>
              </div>
              <p>
                Add a 32A EV charger to the same garage and the picture changes completely: 30.7 +
                32 = 62.7A assessed, pushing the design to a 63A/80A submain in 16mm² or 25mm² SWA
                — which is why the future-proofing conversation belongs at the start of the job,
                not after the trench is backfilled.
              </p>
            </>
          ),
        },
        {
          id: 'swa-submain',
          heading: 'The SWA Submain',
          content: (
            <>
              <p>
                The submain itself is almost always buried SWA. The full sizing detail lives on
                the{' '}
                <SEOInternalLink href="/tools/swa-cable-size-calculator">
                  SWA cable size calculator
                </SEOInternalLink>{' '}
                page; the submain-specific points:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>
                  <strong>Size for voltage drop first</strong> — the submain should use only part
                  of the 5% total allowance, because the garage's final circuits add their own
                  drop after the garage board. Keeping the submain under about 2% is a sound
                  working habit.
                </li>
                <li>
                  <strong>Burial requirements</strong> — BS 7671 requires buried cables to
                  incorporate an earthed armour or metal sheath (or equivalent duct protection),
                  marked with cable covers or marker tape, at a depth sufficient to avoid
                  foreseeable disturbance. Accepted practice is around 450mm in gardens, 600mm
                  under drives.
                </li>
                <li>
                  <strong>Duct it if you can</strong> — a duct with a draw cord turns the future
                  EV-charger upgrade into a cable pull instead of a second trench.
                </li>
                <li>
                  <strong>Protect it properly at the origin</strong> — the submain device in the
                  house board protects the cable; check disconnection times over the full run with
                  the{' '}
                  <SEOInternalLink href="/tools/disconnection-time-calculator">
                    disconnection time calculator
                  </SEOInternalLink>
                  .
                </li>
              </ul>
            </>
          ),
        },
        {
          id: 'consumer-unit-earthing',
          heading: 'The Garage Consumer Unit and the Earthing Decision',
          content: (
            <>
              <p>
                At the garage end, a small consumer unit distributes to the final circuits. Design
                points:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>
                  <strong>Main switch and ways</strong> — a compact two-to-six-way board covers
                  most garages: sockets, lighting, heating, and a spare way or two for the future.
                </li>
                <li>
                  <strong>RCD protection</strong> — socket outlets up to 32A require 30mA RCD
                  additional protection (Regulation 411.3.3). RCBOs per circuit avoid a workshop
                  freezer defrosting because a power tool tripped a shared RCD.
                </li>
                <li>
                  <strong>Discrimination with the house board</strong> — think about what trips
                  first: RCD protection at the garage board serving the garage circuits, with the
                  submain arranged so a garage fault does not take out house circuits.
                </li>
                <li>
                  <strong>The earthing arrangement</strong> — either export the house earthing
                  system to the garage via the submain, or create a TT island with a local earth
                  electrode at the outbuilding. On PME supplies, the decision needs particular
                  care where the garage has outdoor equipment, water, or an EV charger — assess,
                  decide deliberately, and record it on the certificate.
                </li>
              </ul>
              <p>
                The whole-house picture matters too: the garage's assessed demand lands on the
                house supply, so check it against the installation's{' '}
                <SEOInternalLink href="/tools/max-demand-calculator">
                  maximum demand
                </SEOInternalLink>{' '}
                before finalising the design.
              </p>
            </>
          ),
        },
        {
          id: 'future-proofing',
          heading: 'Future-Proofing: The EV Charger Question',
          content: (
            <>
              <p>
                The single most common regret on garage supplies installed in the last decade is
                sizing them before EV charging arrived. A 7.4kW charger adds a continuous 32A —
                usually more than the entire rest of the garage — and it cannot share capacity by
                diversity, because it genuinely draws full current for hours.
              </p>
              <p>Practical future-proofing, in ascending order of cost:</p>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>
                  <strong>Duct the route</strong> — even if today's cable is modest, a duct makes
                  the upgrade a pull-through.
                </li>
                <li>
                  <strong>Oversize the submain cable</strong> — the labour of the trench dwarfs
                  the cost difference between 10mm² and 16mm² SWA. Install the bigger cable now.
                </li>
                <li>
                  <strong>Design the submain for the charger</strong> — a 63A submain feeding a
                  garage board with a 32A EV way and the general circuits, with load management if
                  the house supply is tight. The{' '}
                  <SEOInternalLink href="/tools/ev-charger-load-calculator">
                    EV charger load calculator
                  </SEOInternalLink>{' '}
                  covers the supply-capacity side, and the{' '}
                  <SEOInternalLink href="/tools/ev-charger-cable-size-calculator">
                    EV charger cable size calculator
                  </SEOInternalLink>{' '}
                  the circuit itself.
                </li>
              </ul>
              <p>
                Have the conversation with the customer before quoting — "will this garage ever
                charge a car?" is a one-line question that changes the whole design.
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'List the garage loads',
          text: 'Sockets, lighting, heating, machinery, and any planned EV charger. Use realistic simultaneous figures for socket circuits, full rating for fixed heating, and 100% for EV charging.',
        },
        {
          name: 'Apply diversity and assess the demand',
          text: 'The calculator applies diversity by load type and produces the assessed demand with a recommended main device rating — the number the submain is designed around.',
        },
        {
          name: 'Size the SWA submain',
          text: 'Size for voltage drop first over the actual trench run (keep the submain portion around 2%), then confirm current-carrying capacity for the burial method.',
        },
        {
          name: 'Specify the garage consumer unit',
          text: 'A small board with RCBO-protected final circuits, sized with a spare way or two. Decide the earthing arrangement — exported earth or local TT — deliberately.',
        },
        {
          name: 'Check the house end and certify',
          text: 'Confirm the house maximum demand can take the garage, verify disconnection times over the submain, then test and certify the installation.',
        },
      ]}
      howToHeading="How to Design a Garage Supply"
      howToDescription="Five steps from load list to a certified outbuilding submain."
      features={[
        {
          icon: BarChart3,
          title: 'Multi-Load Diversity Assessment',
          description:
            'Add each garage load by type and get a realistic assessed demand with the diversity applied automatically.',
        },
        {
          icon: Shield,
          title: 'Main Device Recommendation',
          description:
            'The calculator recommends the submain protective device rating from the assessed demand.',
        },
        {
          icon: Cable,
          title: 'Submain Sizing Workflow',
          description:
            'Carry the assessed demand into the SWA and cable sizing calculators for the trench run design.',
        },
        {
          icon: Car,
          title: 'EV-Ready Planning',
          description:
            'Model the garage with and without a 32A charger to see how the submain requirement changes.',
        },
        {
          icon: Gauge,
          title: 'Voltage Drop Allocation',
          description:
            'Check the submain leaves allowance within the 5% limit for the garage final circuits.',
        },
        {
          icon: Calculator,
          title: '70+ Calculators in One App',
          description:
            'Diversity, maximum demand, cable sizing, adiabatic, and Zs — the complete outbuilding design chain.',
        },
      ]}
      featuresHeading="Garage Supply Calculator Features"
      featuresSubheading="From load list to submain spec, with the EV question answered up front."
      faqs={[
        {
          question: 'What size cable do I need to feed a garage?',
          answer:
            'It depends on the assessed demand and the run length. A basic garage (sockets and lighting, around 20-25A assessed) on a short run can be fed with 6mm² SWA; a workshop garage assessing around 30A at 25 metres typically lands on 10mm² SWA under a 40A device; add a 32A EV charger and the design moves to 16mm² or 25mm² SWA under a 63A-80A device. Voltage drop over the trench run usually governs, so size for that first — the calculator and the SWA cable size tool run both checks.',
        },
        {
          question: 'Does a garage need its own consumer unit?',
          answer:
            'For anything beyond a single lighting point or socket, yes — a small consumer unit in the garage is the right way to distribute to sockets, lighting, and heating circuits. It gives each circuit proper protection (30mA RCBOs for socket circuits, as BS 7671 requires additional RCD protection for sockets up to 32A), provides local isolation, and means a fault in the garage trips a garage device rather than plunging the house into darkness.',
        },
        {
          question: 'How do I work out the load for a garage supply?',
          answer:
            'List the loads and assess them realistically rather than adding up breaker ratings: sockets at their genuine simultaneous use (a workshop might assess at 20A even with a 32A circuit installed), lighting with standard diversity, fixed heating at full rating, and any EV charger at 100% with no diversity. A typical workshop garage — 20A sockets, 2A lighting, 8.7A heater — assesses to about 30.7A, pointing to a 40A submain. The calculator applies diversity by load type and recommends the main device.',
        },
        {
          question: 'Should a detached garage be on a TT earth?',
          answer:
            'Not automatically — it is a design decision. The options are exporting the house earthing arrangement through the submain, or creating a TT island with a local earth electrode at the garage. On PME (TN-C-S) supplies the assessment matters most where the garage involves outdoor equipment, water, or EV charging, since exporting a PME earth to such locations needs care. Whichever way you go, verify the arrangement by test and record it on the certificate.',
        },
        {
          question: 'Can I add an EV charger to an existing garage supply?',
          answer:
            'Only if the submain has the capacity. A 7.4kW charger is a continuous 32A — check the existing submain cable size, its protective device, the voltage drop over the run, and the assessed demand of everything else in the garage. Many older garage supplies are 6mm² on a 32A device, which the charger alone would saturate. If the submain falls short, the options are a new larger submain (far easier if the original run was ducted) or a charger with load management limited to the spare capacity.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/swa-cable-size-calculator',
          title: 'SWA Cable Size Calculator',
          description: 'Size the buried armoured submain for the trench run to the garage.',
          icon: Shield,
          category: 'Calculators',
        },
        {
          href: '/tools/diversity-factor-calculator',
          title: 'Diversity Factor Calculator',
          description: 'The full multi-load diversity tool behind this page\'s assessment.',
          icon: Calculator,
          category: 'Calculators',
        },
        {
          href: '/tools/max-demand-calculator',
          title: 'Maximum Demand Calculator',
          description: 'Check the house supply can take the garage demand on top.',
          icon: BarChart3,
          category: 'Calculators',
        },
        {
          href: '/tools/ev-charger-cable-size-calculator',
          title: 'EV Charger Cable Size Calculator',
          description: 'Size the 32A charger circuit the garage will sooner or later want.',
          icon: Car,
          category: 'Calculators',
        },
        {
          href: '/tools/voltage-drop-calculator',
          title: 'Voltage Drop Calculator',
          description: 'Allocate the 5% limit between the submain and the garage circuits.',
          icon: Gauge,
          category: 'Calculators',
        },
        {
          href: '/tools/disconnection-time-calculator',
          title: 'Disconnection Time Calculator',
          description: 'Verify disconnection times over the full submain run.',
          icon: Timer,
          category: 'Calculators',
        },
      ]}
      ctaHeading="Design garage supplies with confidence"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for load assessment, submain sizing, and certification. 7-day free trial, cancel anytime."
      toolPath="/tools/garage-supply-calculator"
    />
  );
}
