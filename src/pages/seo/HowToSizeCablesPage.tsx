import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOAppPreview } from '@/components/seo/SEOAppPreview';
import { SEOWhyNotGoogle } from '@/components/seo/SEOWhyNotGoogle';
import {
  Cable,
  Thermometer,
  ShieldCheck,
  Zap,
  Calculator,
  ClipboardCheck,
  BookOpen,
  AlertTriangle,
  ArrowRight,
  Check,
  Brain,
  FileCheck,
} from 'lucide-react';

const features = [
  {
    icon: Calculator,
    title: 'All BS 7671 Tables Built In',
    description:
      'Appendix 4 current-carrying capacity tables, correction factor tables, and mV/A/m values \u2014 no flipping through the brown book.',
  },
  {
    icon: Thermometer,
    title: 'Automatic Derating',
    description:
      'Enter ambient temperature, grouping, and insulation conditions. The calculator applies Ca, Cg, Ci, and Cc automatically.',
  },
  {
    icon: Zap,
    title: 'Voltage Drop Verification',
    description:
      'Checks your cable selection against BS 7671 voltage drop limits: 3% for lighting (6.9V) and 5% for power (11.5V) from a 230V supply.',
  },
  {
    icon: ShieldCheck,
    title: 'Fault Current Check',
    description:
      'Verifies the cable can withstand fault current using the adiabatic equation (k\u00B2S\u00B2 \u2265 I\u00B2t) so your design is fully compliant.',
  },
  {
    icon: Cable,
    title: 'Every Cable Type',
    description:
      'Twin and earth, singles in conduit, SWA, MICC, fire-resistant, flexible \u2014 all installation methods from Reference A to G covered.',
  },
  {
    icon: ClipboardCheck,
    title: 'Complete Circuit Schedule',
    description:
      'Generates a full circuit schedule with cable size, protection device, voltage drop, and Zs values for your certificates.',
  },
];

const appPreviewFeatures = [
  {
    icon: Calculator,
    title: '70 Electrical Calculators',
    description:
      'Cable sizing is one of 70 calculators. Also includes voltage drop, Zs lookup, diversity, max demand, conduit fill, and 64 more.',
  },
  {
    icon: Brain,
    title: 'AI Circuit Designer',
    description:
      'Describe your job and the AI designs the complete circuit \u2014 cable sizes, protection devices, voltage drop, and Zs verification. All BS 7671 compliant.',
  },
  {
    icon: FileCheck,
    title: '8 Certificate Types',
    description:
      'EICR, EIC, Minor Works, EV Charger, Emergency Lighting, Fire Alarm, Solar PV, and PAT \u2014 auto-filled, digitally signed, PDF exported.',
  },
  {
    icon: BookOpen,
    title: '36+ Training Courses',
    description:
      '18th Edition, Level 2, Level 3, AM2, EPA, Inspection & Testing, plus 16 H&S courses. All with mock exams and AI study tools.',
  },
  {
    icon: ShieldCheck,
    title: 'BS 7671:2018+A3:2024',
    description:
      'Every calculator, every AI agent, every course \u2014 updated to the latest Amendment 3 (issued July 2024). No outdated references.',
  },
  {
    icon: Zap,
    title: '8 Elec-AI Specialists',
    description:
      'Circuit Designer, Cost Engineer, Health & Safety, Installation Guide, Commissioning, Board Reader, Portfolio Analyser, and AI Assistant.',
  },
];

const faqs = [
  {
    q: 'What is the cable sizing process to BS 7671?',
    a: 'Cable sizing to BS 7671 follows four steps: (1) Determine the design current (Ib) from the load. (2) Select a protective device with rated current In \u2265 Ib. (3) Calculate the tabulated current rating It by dividing In by all applicable correction factors (ambient temperature, grouping, thermal insulation, semi-enclosed fuse). (4) Select a cable from BS 7671 Appendix 4 with current-carrying capacity Iz \u2265 It. Then verify voltage drop and fault current withstand. Elec-Mate\u2019s cable sizing calculator does all of this automatically with every BS 7671 table built in.',
  },
  {
    q: 'What are the BS 7671 correction factors for cable sizing?',
    a: 'There are four correction factors: Ca (ambient temperature \u2014 from Table 4B1, e.g. 0.87 at 40\u00B0C for 70\u00B0C PVC), Cg (grouping \u2014 from Table 4C1, e.g. 0.70 for 3 circuits touching on a surface), Ci (thermal insulation \u2014 0.5 if fully surrounded, 0.89 if one side only), and Cc (semi-enclosed fuse factor \u2014 0.725 for BS 3036 fuses). These multiply together: It = In \u00F7 (Ca \u00D7 Cg \u00D7 Ci \u00D7 Cc).',
  },
  {
    q: 'What are the voltage drop limits in BS 7671?',
    a: 'BS 7671 limits voltage drop to 3% for lighting circuits and 5% for all other circuits, measured from the origin of the installation. From a 230V single-phase supply, that\u2019s 6.9V for lighting and 11.5V for power. For three-phase 400V supplies, it\u2019s 12V for lighting and 20V for power. Voltage drop is calculated as: VD = mV/A/m \u00D7 Ib \u00D7 L \u00F7 1000, where mV/A/m comes from Appendix 4 tables.',
  },
  {
    q: 'How do I check fault current withstand for a cable?',
    a: 'Use the adiabatic equation: k\u00B2S\u00B2 \u2265 I\u00B2t, where k is the cable factor (115 for PVC/copper line conductor, 143 for PVC/copper CPC), S is the cross-sectional area in mm\u00B2, I is the prospective fault current in amps, and t is the disconnection time of the protective device in seconds. If k\u00B2S\u00B2 is greater than or equal to I\u00B2t, the cable can withstand the fault. Elec-Mate calculates this automatically.',
  },
  {
    q: 'What cable size do I need for a 32A ring circuit?',
    a: 'A standard domestic ring final circuit uses 2.5mm\u00B2 twin and earth cable with a 32A Type B MCB. This is suitable for a maximum floor area of 100m\u00B2. The cable has a current-carrying capacity of 27A per leg (Reference Method C), but because it\u2019s a ring, both legs share the load. Always check voltage drop for longer cable runs and apply derating factors if cables are grouped or in thermal insulation.',
  },
  {
    q: 'Do I need to derate cables in thermal insulation?',
    a: 'Yes. If a cable is enclosed in thermal insulation for more than 0.5m, you must apply correction factor Ci. For cables totally surrounded by thermal insulation: Ci = 0.5 (a massive derating). For cables touching insulation on one side only: Ci = 0.89. This is one of the most commonly missed derating factors and can lead to undersized cables overheating. BS 7671 Regulation 523.9 covers this requirement.',
  },
  {
    q: 'Is Elec-Mate\u2019s cable sizing calculator free?',
    a: 'Elec-Mate offers a 7-day free trial with full access to all 70 calculators, 8 certificate types, 8 Elec-AI agents, and 36+ training courses. After the trial, plans start from \u00A34.99/month. Cancel anytime \u2014 no contracts, no lock-in.',
  },
];

export default function HowToSizeCablesPage() {
  useSEO({
    title: 'How to Size Cables to BS 7671 | Complete Guide | Elec-Mate',
    description:
      'Complete guide to cable sizing using BS 7671:2018+A3:2024 Appendix 4 tables. Current carrying capacity, derating factors, voltage drop, and fault current verification with worked examples.',
    canonical: 'https://elec-mate.com/guides/how-to-size-cables-bs-7671',
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Size Cables to BS 7671',
            description:
              'Step-by-step cable sizing process using BS 7671:2018+A3:2024 Appendix 4 tables with correction factors, voltage drop, and fault current verification.',
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'Determine the design current (Ib)',
                text: 'Calculate the design current from the load. For single-phase: Ib = P \u00F7 (V \u00D7 cos\u03C6). For three-phase: Ib = P \u00F7 (\u221A3 \u00D7 VL \u00D7 cos\u03C6). This is the current the cable must carry in normal service.',
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'Select the protective device (In)',
                text: 'Choose a protective device with rated current In \u2265 Ib. For MCBs: standard ratings are 6, 10, 16, 20, 25, 32, 40, 50, 63A. The protective device must also be appropriate for the circuit type (Type B for general, Type C for motors, Type D for transformers).',
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'Apply correction factors and calculate It',
                text: 'Calculate the minimum tabulated current rating: It = In \u00F7 (Ca \u00D7 Cg \u00D7 Ci \u00D7 Cc). Ca = ambient temperature correction (Table 4B1). Cg = grouping correction (Table 4C1). Ci = thermal insulation correction. Cc = 0.725 for BS 3036 semi-enclosed fuses, or 1.0 for MCBs.',
              },
              {
                '@type': 'HowToStep',
                position: 4,
                name: 'Select cable from Appendix 4 tables',
                text: 'Choose a cable with current-carrying capacity Iz \u2265 It from the appropriate Appendix 4 table for your installation method (Reference Method A to G) and cable type.',
              },
              {
                '@type': 'HowToStep',
                position: 5,
                name: 'Verify voltage drop',
                text: 'Calculate VD = mV/A/m \u00D7 Ib \u00D7 L \u00F7 1000 using Appendix 4 voltage drop values. Check against limits: 3% for lighting (6.9V from 230V) and 5% for power (11.5V from 230V).',
              },
              {
                '@type': 'HowToStep',
                position: 6,
                name: 'Verify fault current withstand',
                text: 'Check the adiabatic equation: k\u00B2S\u00B2 \u2265 I\u00B2t, where k is the cable factor, S is the cross-sectional area, I is the prospective fault current, and t is the disconnection time.',
              },
            ],
            tool: [
              { '@type': 'HowToTool', name: 'BS 7671:2018+A3:2024 (IET Wiring Regulations)' },
              { '@type': 'HowToTool', name: 'Elec-Mate Cable Sizing Calculator' },
              { '@type': 'HowToTool', name: 'Scientific calculator' },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="pt-12 sm:pt-16 pb-10 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-sm font-medium text-yellow-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              BS 7671:2018+A3:2024
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm font-medium text-blue-400">
              <Calculator className="w-3.5 h-3.5" />
              70 Calculators Included
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            How to Size Cables to <span className="text-yellow-400">BS 7671</span>
          </h1>
          <p className="text-lg text-white max-w-3xl mx-auto leading-relaxed mb-8">
            The complete step-by-step guide to cable sizing using BS 7671:2018+A3:2024 Appendix 4
            tables. Current carrying capacity, correction factors, voltage drop verification, and
            fault current withstand — with worked examples.
          </p>
        </div>
      </section>

      {/* Step-by-step guide */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            The 6-Step Cable Sizing Process
          </h2>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-5">
              <div className="shrink-0 w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-lg">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">
                  Determine the Design Current (I<sub>b</sub>)
                </h3>
                <p className="text-white leading-relaxed mb-4">
                  The design current is the current the cable must carry in normal service.
                  Calculate it from the load:
                </p>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mb-4">
                  <p className="text-white font-mono text-sm mb-2">
                    <strong>Single-phase:</strong> I<sub>b</sub> = P &divide; (V &times; cos&phi;)
                  </p>
                  <p className="text-white font-mono text-sm">
                    <strong>Three-phase:</strong> I<sub>b</sub> = P &divide; (&radic;3 &times; V
                    <sub>L</sub> &times; cos&phi;)
                  </p>
                </div>
                <p className="text-white leading-relaxed">
                  For a 7.4kW electric shower on a 230V single-phase supply (power factor 1.0): I
                  <sub>b</sub> = 7,400 &divide; (230 &times; 1.0) = <strong>32.2A</strong>
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-5">
              <div className="shrink-0 w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-lg">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">
                  Select the Protective Device (I<sub>n</sub>)
                </h3>
                <p className="text-white leading-relaxed mb-4">
                  Choose a protective device with rated current I<sub>n</sub> &ge; I<sub>b</sub>.
                  Standard MCB ratings: 6, 10, 16, 20, 25, 32, 40, 50, 63A.
                </p>
                <p className="text-white leading-relaxed mb-4">
                  For our 32.2A shower: the next standard rating up is{' '}
                  <strong>40A Type B MCB</strong>.
                </p>
                <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                  <p className="text-white text-sm leading-relaxed">
                    <strong className="text-yellow-400">Tip:</strong> Select the MCB type based on
                    the load. Type B for general circuits (trips at 3-5&times; rated current). Type
                    C for motors (5-10&times;). Type D for transformers and high inrush loads
                    (10-20&times;).
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-5">
              <div className="shrink-0 w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-lg">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">
                  Apply Correction Factors &amp; Calculate I<sub>t</sub>
                </h3>
                <p className="text-white leading-relaxed mb-4">
                  This is where most mistakes happen. You must account for conditions that reduce
                  the cable&apos;s ability to dissipate heat:
                </p>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mb-4">
                  <p className="text-white font-mono text-sm mb-3">
                    I<sub>t</sub> = I<sub>n</sub> &divide; (C<sub>a</sub> &times; C<sub>g</sub>{' '}
                    &times; C<sub>i</sub> &times; C<sub>c</sub>)
                  </p>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/8">
                    <p className="text-white text-sm leading-relaxed">
                      <strong>
                        C<sub>a</sub> — Ambient Temperature
                      </strong>{' '}
                      (Table 4B1): At 30&deg;C = 1.0. At 35&deg;C = 0.94. At 40&deg;C = 0.87. At
                      45&deg;C = 0.79.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/8">
                    <p className="text-white text-sm leading-relaxed">
                      <strong>
                        C<sub>g</sub> — Grouping
                      </strong>{' '}
                      (Table 4C1): 2 circuits = 0.80. 3 circuits = 0.70. 4 circuits = 0.65. 6
                      circuits = 0.57. 9 circuits = 0.50.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/8">
                    <p className="text-white text-sm leading-relaxed">
                      <strong>
                        C<sub>i</sub> — Thermal Insulation
                      </strong>
                      : Cable touching insulation on one side = 0.89. Fully enclosed in insulation
                      (over 0.5m) = 0.50.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/8">
                    <p className="text-white text-sm leading-relaxed">
                      <strong>
                        C<sub>c</sub> — Semi-enclosed Fuses
                      </strong>
                      : 0.725 for BS 3036 fuses. 1.0 for MCBs and RCBOs (no correction needed).
                    </p>
                  </div>
                </div>

                <p className="text-white leading-relaxed">
                  For our shower: installed alone (C<sub>g</sub> = 1.0), in a 35&deg;C loft (C
                  <sub>a</sub> = 0.94), touching insulation one side (C<sub>i</sub> = 0.89), MCB
                  protection (C<sub>c</sub> = 1.0):
                </p>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mt-3">
                  <p className="text-white font-mono text-sm">
                    I<sub>t</sub> = 40 &divide; (0.94 &times; 1.0 &times; 0.89 &times; 1.0) = 40
                    &divide; 0.8366 = <strong>47.8A</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-5">
              <div className="shrink-0 w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-lg">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">Select Cable from Appendix 4</h3>
                <p className="text-white leading-relaxed mb-4">
                  Find a cable with current-carrying capacity I<sub>z</sub> &ge; I<sub>t</sub>{' '}
                  (47.8A) from the correct table for your installation method and cable type.
                </p>
                <p className="text-white leading-relaxed mb-4">
                  For twin and earth in an enclosed space (Reference Method A), from Table 4D5A
                  column 6:
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm text-white">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 pr-4 font-semibold">Cable Size</th>
                        <th className="text-left py-2 pr-4 font-semibold">
                          I<sub>z</sub> (Method A)
                        </th>
                        <th className="text-left py-2 font-semibold">Suitable?</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4">6mm&sup2;</td>
                        <td className="py-2 pr-4">32A</td>
                        <td className="py-2 text-red-400">No (32 &lt; 47.8)</td>
                      </tr>
                      <tr className="border-b border-white/5 bg-green-500/5">
                        <td className="py-2 pr-4 font-semibold">10mm&sup2;</td>
                        <td className="py-2 pr-4 font-semibold">43A</td>
                        <td className="py-2 text-red-400">No (43 &lt; 47.8)</td>
                      </tr>
                      <tr className="border-b border-white/5 bg-green-500/5">
                        <td className="py-2 pr-4 font-bold">16mm&sup2;</td>
                        <td className="py-2 pr-4 font-bold">57A</td>
                        <td className="py-2 text-green-400 font-bold flex items-center gap-1">
                          <Check className="w-4 h-4" />
                          Yes (57 &ge; 47.8)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-white leading-relaxed">
                  Result: <strong>16mm&sup2; twin and earth</strong> for this installation. However,
                  if using Reference Method C (clipped direct), 10mm&sup2; may suffice as I
                  <sub>z</sub> = 52A for that method.
                </p>

                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 mt-4">
                  <p className="text-white text-sm leading-relaxed">
                    <strong className="text-red-400">
                      <AlertTriangle className="w-4 h-4 inline mr-1" />
                      Common Mistake:
                    </strong>{' '}
                    Using the wrong installation method. Reference Method A (enclosed in insulated
                    wall) has much lower ratings than Method C (clipped direct). Check the actual
                    route the cable will take — use the worst-case method for any portion of the
                    run.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-5">
              <div className="shrink-0 w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-lg">
                5
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">Verify Voltage Drop</h3>
                <p className="text-white leading-relaxed mb-4">
                  Check the cable selection meets BS 7671 voltage drop limits:{' '}
                  <strong>3% for lighting</strong> (6.9V from 230V) and{' '}
                  <strong>5% for power</strong> (11.5V from 230V).
                </p>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mb-4">
                  <p className="text-white font-mono text-sm mb-2">
                    VD = mV/A/m &times; I<sub>b</sub> &times; L &divide; 1000
                  </p>
                </div>
                <p className="text-white leading-relaxed mb-4">
                  For 10mm&sup2; T&amp;E (clipped direct), the mV/A/m value from Appendix 4 is 4.4.
                  With I<sub>b</sub> = 32.2A and a 12m cable run:
                </p>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mb-4">
                  <p className="text-white font-mono text-sm">
                    VD = 4.4 &times; 32.2 &times; 12 &divide; 1000 = <strong>1.7V</strong> (0.74% of
                    230V)
                  </p>
                </div>
                <p className="text-white leading-relaxed">
                  1.7V is well within the 5% power limit (11.5V).{' '}
                  <span className="text-green-400 font-semibold">
                    <Check className="w-4 h-4 inline" /> Compliant.
                  </span>
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="flex gap-5">
              <div className="shrink-0 w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-lg">
                6
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">
                  Verify Fault Current Withstand
                </h3>
                <p className="text-white leading-relaxed mb-4">
                  The final check ensures the cable can withstand a short circuit without damage.
                  Use the adiabatic equation:
                </p>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mb-4">
                  <p className="text-white font-mono text-sm mb-2">k&sup2;S&sup2; &ge; I&sup2;t</p>
                  <p className="text-white text-xs mt-2">
                    k = 115 (PVC/copper line conductor) | S = cable CSA in mm&sup2; | I =
                    prospective fault current | t = disconnection time
                  </p>
                </div>
                <p className="text-white leading-relaxed mb-4">
                  For 10mm&sup2; cable, fault current 3kA, 40A MCB disconnecting in 0.1s:
                </p>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mb-4">
                  <p className="text-white font-mono text-sm">
                    k&sup2;S&sup2; = 115&sup2; &times; 10&sup2; = 13,225 &times; 100 = 1,322,500
                  </p>
                  <p className="text-white font-mono text-sm mt-1">
                    I&sup2;t = 3,000&sup2; &times; 0.1 = 9,000,000 &times; 0.1 = 900,000
                  </p>
                  <p className="text-white font-mono text-sm mt-1">
                    1,322,500 &ge; 900,000{' '}
                    <span className="text-green-400 font-bold">
                      <Check className="w-4 h-4 inline" /> Compliant
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary box */}
      <section className="py-8 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              Worked Example Summary
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-white text-sm">
              <div className="space-y-2">
                <p>
                  <strong>Load:</strong> 7.4kW electric shower
                </p>
                <p>
                  <strong>
                    Design current (I<sub>b</sub>):
                  </strong>{' '}
                  32.2A
                </p>
                <p>
                  <strong>Protective device:</strong> 40A Type B MCB
                </p>
                <p>
                  <strong>Conditions:</strong> 35&deg;C loft, touching insulation one side
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  <strong>
                    Required I<sub>t</sub>:
                  </strong>{' '}
                  47.8A
                </p>
                <p>
                  <strong>Cable selected:</strong> 10mm&sup2; T&amp;E (clipped direct, I<sub>z</sub>{' '}
                  = 52A)
                </p>
                <p>
                  <strong>Voltage drop:</strong> 1.7V (0.74%) &mdash; compliant
                </p>
                <p>
                  <strong>Fault withstand:</strong> k&sup2;S&sup2; &gt; I&sup2;t &mdash; compliant
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elec-Mate calculator features */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Skip the Manual Calculations
            </h2>
            <p className="text-white max-w-2xl mx-auto leading-relaxed">
              Elec-Mate&apos;s cable sizing calculator does all 6 steps in seconds. Every BS 7671
              table is built in — just enter your load, conditions, and cable run length.
            </p>
          </div>
          <SEOFeatureGrid features={features} />
        </div>
      </section>

      {/* What you get inside */}
      <SEOAppPreview
        heading="What You Get Inside Elec-Mate"
        subheading="The cable sizing calculator is one of 70 calculators inside the complete platform. Here's what else is waiting for you:"
        features={appPreviewFeatures}
      />

      {/* Why not Google */}
      <SEOWhyNotGoogle />

      {/* FAQ */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 py-6 first:pt-0 last:border-b-0">
                <h3 className="text-lg font-semibold text-white mb-3">{faq.q}</h3>
                <p className="text-white leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Size Cables in Seconds, Not Minutes"
        subheading="Join 430+ UK electricians using Elec-Mate. 70 calculators, 8 certificate types, 8 Elec-AI agents, and 36+ training courses — all BS 7671:2018+A3:2024 compliant."
      />
    </PublicPageLayout>
  );
}
