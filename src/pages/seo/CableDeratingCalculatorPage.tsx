import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { RecentReviews } from '@/components/seo/RecentReviews';
import CableDeratingCalculator from '@/components/apprentice/calculators/CableDeratingCalculator';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Calculator,
  Thermometer,
  Layers,
  Shield,
  Zap,
  BookOpen,
  Cable,
  Activity,
  FileCheck2,
  Gauge,
  Snowflake,
  Building,
} from 'lucide-react';

export default function CableDeratingCalculatorPage() {
  return (
    <ToolTemplate
      title="Cable Derating Calculator | Correction Factors Tool"
      description="Calculate cable derating correction factors to BS 7671. Apply Ca (ambient temperature), Cg (grouping), Ci (thermal insulation), and Cf (BS 3036 fuse) correction factors. Free cable derating calculator for UK electricians."
      datePublished="2026-01-22"
      dateModified="2026-06-10"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'Cable Derating Calculator', href: '/tools/cable-derating-calculator' },
      ]}
      tocItems={[
        { id: 'what-is-cable-derating', label: 'What Is Cable Derating?' },
        { id: 'ambient-temperature-ca', label: 'Ca — Ambient Temperature' },
        { id: 'grouping-factor-cg', label: 'Cg — Grouping Factor' },
        { id: 'thermal-insulation-ci', label: 'Ci — Thermal Insulation' },
        { id: 'semi-enclosed-fuse-cf', label: 'Cf — Semi-Enclosed Fuse Factor' },
        { id: 'combining-factors', label: 'Combining Correction Factors' },
        { id: 'how-to', label: 'Step-by-Step Guide' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="BS 7671 Compliant"
      badgeIcon={Thermometer}
      heroTitle={
        <>
          <span className="text-yellow-400">Cable Derating Calculator</span> — Correction Factors
          Made Simple
        </>
      }
      calculator={<CableDeratingCalculator />}
      heroSubtitle="Apply all four BS 7671 correction factors in seconds. Enter the ambient temperature, number of grouped circuits, insulation conditions, and protective device type. The calculator determines the required tabulated current carrying capacity (It) so you select the correct cable size every time."
      heroFeaturePills={[
        { icon: Thermometer, label: 'Ca Factor' },
        { icon: Layers, label: 'Cg Factor' },
        { icon: Snowflake, label: 'Ci Factor' },
        { icon: Shield, label: 'Cf Factor' },
      ]}
      readingTime={9}
      keyTakeaways={[
        'Cable derating adjusts the tabulated current carrying capacity (Iz) to account for real-world installation conditions that differ from the BS 7671 reference conditions.',
        'Ca (ambient temperature factor) reduces the cable rating when ambient temperature exceeds the reference 30°C — for example, Ca = 0.87 at 40°C for 70°C thermoplastic cable.',
        'Cg (grouping factor) accounts for mutual heating between cables installed together — six circuits in conduit gives Cg = 0.57, nearly halving the permitted current.',
        'Ci (thermal insulation factor) applies when cables are enclosed in thermal insulation — a cable totally surrounded for more than 0.5m receives a 0.5 derating factor.',
        'Cf (semi-enclosed fuse factor) of 0.725 applies when protection is by BS 3036 rewirable fuses, because their fusing factor allows currents up to twice the rated value before disconnection.',
      ]}
      sections={[
        {
          id: 'what-is-cable-derating',
          heading: 'What Is Cable Derating?',
          content: (
            <>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3 mb-4 flex items-center gap-3 text-sm text-white/70">
                <BookOpen className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>
                  Content verified against BS 7671:2018+A4:2026 by a JIB-registered electrician.
                </span>
              </div>
              <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 mb-4">
                <p className="font-semibold text-yellow-400 mb-2">How do you calculate cable derating?</p>
                <p className="text-white text-sm">
                  Identify the four BS 7671 correction factors for your installation: Ca (ambient
                  temperature), Cg (grouping), Ci (thermal insulation) and Cf (semi-enclosed fuse).
                  Multiply them together, then divide the protective device rating (In) by the
                  result — It = In / (Ca × Cg × Ci × Cf). Select a cable whose tabulated capacity
                  (Iz) for your reference method is at least equal to It.
                </p>
              </div>
              <p>
                Cable derating is the process of reducing the tabulated current carrying capacity of
                a cable to account for installation conditions that are less favourable than the
                reference conditions assumed in the BS 7671 tables. The current carrying capacity
                tables in Appendix 4 of BS 7671 assume a specific set of conditions: an ambient
                temperature of 30°C, a single circuit with no grouping, no thermal insulation in
                contact with the cable, and protection by an MCB or HRC fuse with a fusing factor
                close to 1.
              </p>
              <p>
                When real-world conditions differ from these assumptions — and they almost always do
                — correction factors must be applied. Each factor adjusts the effective current
                carrying capacity of the cable. The combined effect of all applicable factors
                determines the minimum tabulated current (It) that the selected cable must have.
                This directly affects the{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  cable sizing calculation
                </SEOInternalLink>{' '}
                and can mean the difference between a cable that runs safely within its thermal
                limits and one that overheats, degrades its insulation, and ultimately poses a fire
                risk.
              </p>
              <p>
                Understanding and correctly applying these correction factors is one of the
                fundamental skills in electrical design. It is tested extensively in the{' '}
                <SEOInternalLink href="/training/city-guilds-2391">
                  City and Guilds 2391
                </SEOInternalLink>{' '}
                examination and is a daily requirement for any electrician designing or verifying
                circuits to BS 7671.
              </p>
            </>
          ),
          appBridge: {
            title: 'Calculate Derating Factors Instantly',
            description:
              'Enter your installation conditions and the calculator applies all four correction factors automatically.',
            icon: Calculator,
          },
        },
        {
          id: 'ambient-temperature-ca',
          heading: 'Ca — Ambient Temperature Correction Factor',
          content: (
            <>
              <p>
                The ambient temperature correction factor (Ca) adjusts the cable rating for
                installations where the surrounding air temperature differs from the reference
                temperature. For cables in air, the reference temperature is 30°C. For cables buried
                directly in the ground, the reference temperature is 20°C.
              </p>
              <p>
                The Ca values are found in BS 7671 Tables 4B1 (for cables in air) and 4B2 (for
                cables in the ground). Higher ambient temperatures reduce the cable rating because
                the cable cannot dissipate heat as effectively when the surrounding air is already
                warm. Conversely, temperatures below the reference value increase the permitted
                current slightly.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <p className="font-semibold text-white mb-3">
                  Ca values from Table 4B1 — 70°C thermoplastic (PVC) vs 90°C thermosetting (XLPE):
                </p>
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-yellow-500/10 text-yellow-400">
                        <th className="text-left font-semibold px-3 py-2">Ambient temperature</th>
                        <th className="text-center font-semibold px-3 py-2">70°C thermoplastic</th>
                        <th className="text-center font-semibold px-3 py-2">90°C thermosetting</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      {[
                        { t: '25°C', tp: '1.03', ts: '1.04' },
                        { t: '30°C (reference)', tp: '1.00', ts: '1.00' },
                        { t: '35°C', tp: '0.94', ts: '0.96' },
                        { t: '40°C', tp: '0.87', ts: '0.91' },
                        { t: '45°C', tp: '0.79', ts: '0.87' },
                        { t: '50°C', tp: '0.71', ts: '0.82' },
                        { t: '55°C', tp: '0.61', ts: '0.76' },
                        { t: '60°C', tp: '0.50', ts: '0.71' },
                      ].map((row) => (
                        <tr key={row.t} className="border-t border-white/10">
                          <td className="px-3 py-2 font-medium">{row.t}</td>
                          <td className="px-3 py-2 text-center font-mono">{row.tp}</td>
                          <td className="px-3 py-2 text-center font-mono">{row.ts}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-white/60 text-xs mt-3">
                  90°C thermosetting (XLPE/LSOH) cable derates far less aggressively at high
                  temperatures, which is one reason it is preferred in hot locations such as plant
                  rooms and beneath PV modules.
                </p>
              </div>
              <p>
                In most UK domestic installations, the ambient temperature is close to 30°C and Ca
                does not significantly affect the cable size. However, in plant rooms, boiler
                cupboards, roof spaces in summer, and commercial kitchens, temperatures of 35-45°C
                are common and Ca becomes a significant factor. The{' '}
                <SEOInternalLink href="/tools/voltage-drop-calculator">
                  voltage drop calculator
                </SEOInternalLink>{' '}
                can also apply a temperature correction to the mV/A/m values for more accurate
                results on lightly loaded cables.
              </p>
              <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-4">
                <p className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 shrink-0" />
                  Solar PV installations — BS 7671 Reg 712.523.101 (A4:2026)
                </p>
                <p className="text-white text-sm">
                  For cables subjected to direct heating from the underside of a PV module, BS 7671
                  Reg 712.523.101 (introduced in Amendment 4:2026) requires that the ambient
                  temperature used for Ca derating shall be taken as at least{' '}
                  <strong>70&deg;C</strong>, regardless of the actual measured air temperature. This
                  mandatory requirement applies at the design and sizing stage, and also governs the
                  minimum insulation temperature rating of cables selected for that location.
                  Standard 70&deg;C thermoplastic (PVC) cable is therefore not suitable beneath PV
                  modules — XLPE or LSOH insulated cable rated to 90&deg;C is the typical compliant
                  solution.
                </p>
              </div>
            </>
          ),
        },
        {
          id: 'grouping-factor-cg',
          heading: 'Cg — Grouping Correction Factor',
          content: (
            <>
              <p>
                The grouping correction factor (Cg) accounts for the mutual heating effect when
                multiple cables or circuits are installed together. Cables generate heat when
                carrying current, and when they are grouped close together, they heat each other up.
                This reduces the ability of each cable to dissipate its own heat, so the current
                carrying capacity must be reduced.
              </p>
              <p>
                The Cg values are found in BS 7671 Tables 4C1 through 4C5, depending on the
                installation arrangement. The factor depends on the number of circuits grouped
                together and the installation method (conduit, trunking, cable tray, clipped direct,
                etc.).
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <p className="font-semibold text-white mb-3">
                  Cg values from Table 4C1 — bunched/enclosed vs single layer spaced on a
                  perforated tray:
                </p>
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-yellow-500/10 text-yellow-400">
                        <th className="text-left font-semibold px-3 py-2">Circuits grouped</th>
                        <th className="text-center font-semibold px-3 py-2">
                          Bunched / enclosed
                        </th>
                        <th className="text-center font-semibold px-3 py-2">
                          Single layer on tray
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      {[
                        { n: '1 circuit', b: '1.00', t: '1.00' },
                        { n: '2 circuits', b: '0.80', t: '0.88' },
                        { n: '3 circuits', b: '0.70', t: '0.82' },
                        { n: '4 circuits', b: '0.65', t: '0.77' },
                        { n: '5 circuits', b: '0.60', t: '0.75' },
                        { n: '6 circuits', b: '0.57', t: '0.73' },
                        { n: '9 circuits', b: '0.50', t: '0.72' },
                      ].map((row) => (
                        <tr key={row.n} className="border-t border-white/10">
                          <td className="px-3 py-2 font-medium">{row.n}</td>
                          <td className="px-3 py-2 text-center font-mono">{row.b}</td>
                          <td className="px-3 py-2 text-center font-mono">{row.t}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-white/60 text-xs mt-3">
                  Bunched factors apply when cables touch in conduit, trunking or clipped together;
                  the single-layer column applies to multicore cables spaced on a perforated
                  horizontal or vertical tray. No grouping factor is needed at all where horizontal
                  spacing between cables exceeds twice their overall diameter.
                </p>
              </div>
              <p>
                Grouping is one of the most impactful correction factors. Six circuits in a single
                conduit reduces each cable's capacity to just 57% of its tabulated value. This is
                why cables in heavily loaded trunking runs often need to be larger than you might
                expect. The{' '}
                <SEOInternalLink href="/tools/conduit-fill-calculator">
                  conduit fill calculator
                </SEOInternalLink>{' '}
                and{' '}
                <SEOInternalLink href="/tools/trunking-fill-calculator">
                  trunking fill calculator
                </SEOInternalLink>{' '}
                work alongside the derating calculator to ensure both physical space and thermal
                capacity are adequate.
              </p>
            </>
          ),
        },
        {
          id: 'thermal-insulation-ci',
          heading: 'Ci — Thermal Insulation Correction Factor',
          content: (
            <>
              <p>
                The thermal insulation correction factor (Ci) applies when cables are in contact
                with or enclosed by thermal insulating material. Modern building regulations require
                high levels of thermal insulation, which means cables increasingly pass through or
                are surrounded by insulation in walls, ceilings, and loft spaces.
              </p>
              <p>
                BS 7671 Regulation 523.9 provides the rules for cables in thermal insulation. The
                derating depends on the extent of contact with the insulation:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-3">
                    <Snowflake className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Totally surrounded for more than 0.5m:
                      </strong>{' '}
                      Ci = 0.5 — this is the most severe derating, halving the cable capacity.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Snowflake className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        One side in contact with insulation:
                      </strong>{' '}
                      Use Reference Method 100 (formerly 101/102), which is built into the current
                      carrying capacity table values.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Snowflake className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Short penetration through insulation:
                      </strong>{' '}
                      If the cable is totally surrounded for less than 0.5m, the derating depends on
                      the length in insulation, as set out in the table below.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <p className="font-semibold text-white mb-3">
                  Derating for a cable totally surrounded for less than 0.5m (Appendix 4, Section
                  2.6):
                </p>
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-yellow-500/10 text-yellow-400">
                        <th className="text-left font-semibold px-3 py-2">Length in insulation</th>
                        <th className="text-center font-semibold px-3 py-2">Derating factor</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      {[
                        { l: '50 mm', f: '0.88' },
                        { l: '100 mm', f: '0.78' },
                        { l: '200 mm', f: '0.63' },
                        { l: '400 mm', f: '0.51' },
                        { l: '500 mm or more', f: '0.50' },
                      ].map((row) => (
                        <tr key={row.l} className="border-t border-white/10">
                          <td className="px-3 py-2 font-medium">{row.l}</td>
                          <td className="px-3 py-2 text-center font-mono">{row.f}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-white/60 text-xs mt-3">
                  These factors apply to conductors up to 10mm&sup2; in insulation with a thermal
                  conductivity greater than 0.04 W/m·K. At 0.5m or more, the factor settles at 0.5 —
                  the same as the fully enclosed case.
                </p>
              </div>
              <p>
                In practice, the most common scenario in domestic installations is flat twin and
                earth cable running through joist spaces where loft insulation lies over the cable.
                This is treated as one side in contact, and Reference Method 100 values are used
                from the tables. The Ci = 0.5 factor is reserved for cables that are genuinely
                enclosed in insulation — for example, a cable run through a fully insulated cavity
                wall where the insulation wraps around the cable on all sides.
              </p>
            </>
          ),
          appBridge: {
            title: 'All Four Correction Factors in One Calculator',
            description:
              'Stop looking up Ca, Cg, Ci, and Cf values in separate tables. The derating calculator applies all factors automatically and recommends the minimum cable…',
            icon: Thermometer,
          },
        },
        {
          id: 'semi-enclosed-fuse-cf',
          heading: 'Cf — Semi-Enclosed Fuse Factor',
          content: (
            <>
              <p>
                The semi-enclosed fuse factor (Cf = 0.725) applies when the circuit is protected by
                a BS 3036 rewirable fuse. These fuses have a fusing factor of approximately 2,
                meaning they may not blow until the current reaches twice their rated value. This
                means the cable could be carrying significantly more current than the fuse rating
                for an extended period before the fuse operates.
              </p>
              <p>
                To compensate, the cable must be rated higher. The Cf factor of 0.725 effectively
                increases the required tabulated current carrying capacity by approximately 38%. For
                example, if the protective device is a 30A BS 3036 fuse, the required It = 30 / (Ca
                x Cg x Ci x 0.725), which gives a significantly larger cable than would be needed
                with an MCB or HRC fuse.
              </p>
              <p>
                BS 3036 fuses are still found in older installations but are rarely specified for
                new work. If you encounter them during an{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR inspection</SEOInternalLink>,
                you need to verify that the cables are adequately rated with the Cf factor applied.
                The Elec-Mate derating calculator makes this straightforward — select BS 3036 as the
                protective device type and the 0.725 factor is applied automatically.
              </p>
              <p>
                The current-carrying capacity requirements that the correction factors serve sit in
                Section 523 of BS 7671. During periodic inspection and testing (Chapter 65), an
                inspector assessing an installation has to satisfy themselves that conductors were
                selected with adequate current-carrying capacity for the conditions — which in
                practice means that all applicable correction factors (Ca, Cg, Ci, and Cf) were
                correctly applied at the design stage. Correct cable derating is therefore not just
                a design obligation but a judgement that feeds directly into the EICR coding
                decision when an undersized circuit is found.
              </p>
            </>
          ),
        },
        {
          id: 'combining-factors',
          heading: 'Combining All Correction Factors',
          content: (
            <>
              <p>
                When more than one correction factor applies — which is the case in almost every
                real-world installation — the factors are multiplied together to give the overall
                correction. The required tabulated current carrying capacity is then:
              </p>
              <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-4 text-center">
                <p className="text-xl font-mono font-bold text-yellow-400">
                  It = In / (Ca x Cg x Ci x Cf)
                </p>
                <div className="mt-3 text-left max-w-md mx-auto space-y-1 text-sm text-white">
                  <p>
                    <strong className="text-yellow-400">It</strong> = required tabulated current
                    carrying capacity
                  </p>
                  <p>
                    <strong className="text-yellow-400">In</strong> = nominal rating of the
                    protective device
                  </p>
                  <p>
                    <strong className="text-yellow-400">Ca, Cg, Ci, Cf</strong> = correction factors
                    as applicable
                  </p>
                </div>
              </div>
              <p>
                For example, consider a circuit protected by a 32A Type B MCB, with 4 circuits
                grouped in trunking (Cg = 0.65), at an ambient temperature of 35°C (Ca = 0.94), with
                no thermal insulation (Ci = 1.0) and no BS 3036 fuse (Cf = 1.0):
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <p className="font-mono text-white">
                  It = 32 / (0.94 x 0.65 x 1.0 x 1.0) = 32 / 0.611 ={' '}
                  <strong className="text-yellow-400">52.4A</strong>
                </p>
                <p className="text-white text-sm mt-2">
                  The selected cable must have a tabulated Iz of at least 52.4A for the relevant
                  reference method. This is significantly higher than the 32A device rating,
                  demonstrating how correction factors can substantially increase the required cable
                  size.
                </p>
              </div>
              <p>
                The Elec-Mate{' '}
                <SEOInternalLink href="/tools/electrical-testing-calculators">
                  electrical calculator suite
                </SEOInternalLink>{' '}
                links the derating calculator directly to the cable sizing tables, so once you have
                your It value, the recommended cable size is displayed immediately.
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Determine the protective device rating',
          text: 'Note the nominal current rating (In) of the protective device for the circuit — for example, 20A, 32A, or 40A. This is the starting value for the calculation.',
        },
        {
          name: 'Measure or estimate the ambient temperature',
          text: 'Determine the maximum ambient temperature in the cable route. For most domestic installations, 30°C is standard. For plant rooms, commercial kitchens, or roof spaces, measure the actual temperature and look up the Ca value from BS 7671 Table 4B1.',
        },
        {
          name: 'Count the grouped circuits',
          text: 'Count the number of circuits grouped together in the same conduit, trunking, or cable run. Look up the Cg value from Tables 4C1-4C5 based on the number of circuits and arrangement method.',
        },
        {
          name: 'Assess thermal insulation contact',
          text: 'Determine whether the cable is in contact with thermal insulation. If totally surrounded for more than 0.5m, apply Ci = 0.5. If one side is in contact, use Reference Method 100 values from the tables.',
        },
        {
          name: 'Check the protective device type',
          text: 'If the protective device is a BS 3036 semi-enclosed (rewirable) fuse, apply Cf = 0.725. For MCBs, RCBOs, and cartridge fuses, Cf = 1.0 (no additional derating needed).',
        },
        {
          name: 'Calculate It and select the cable',
          text: 'Divide the protective device rating (In) by the product of all applicable correction factors to get It. Select a cable from the BS 7671 Appendix 4 tables with a tabulated Iz value equal to or greater than It for your installation reference method.',
        },
      ]}
      howToHeading="How to Apply Cable Derating Factors"
      howToDescription="Six steps to calculate the required tabulated current carrying capacity using BS 7671 correction factors."
      features={[
        {
          icon: Thermometer,
          title: 'Automatic Ca Lookup',
          description:
            'Enter the ambient temperature and cable insulation type. The calculator looks up the correct Ca value from BS 7671 Tables 4B1/4B2 automatically.',
        },
        {
          icon: Layers,
          title: 'Grouping Factor Tables',
          description:
            'Select the number of circuits and arrangement method. All grouping tables from 4C1 to 4C5 are built in, covering conduit, trunking, cable tray…',
        },
        {
          icon: Snowflake,
          title: 'Insulation Assessment',
          description:
            'Specify the thermal insulation conditions. The calculator applies Ci = 0.5 for enclosed cables or selects Reference Method 100 for one-sided contact…',
        },
        {
          icon: Shield,
          title: 'BS 3036 Fuse Detection',
          description:
            'Select the protective device type and the 0.725 factor is applied when a BS 3036 rewirable fuse is specified. MCBs and HRC fuses are handled with Cf = 1.0.',
        },
        {
          icon: Calculator,
          title: 'Instant It Calculation',
          description:
            'All factors are multiplied together and the required tabulated current (It) is calculated instantly.',
        },
        {
          icon: Gauge,
          title: 'Works Offline on Site',
          description:
            'All BS 7671 correction factor tables are stored locally. Calculate derating factors in any location with no internet connection required.',
        },
      ]}
      featuresHeading="Cable Derating Calculator Features"
      featuresSubheading="Every BS 7671 correction factor table at your fingertips, with automatic calculations and cable recommendations."
      faqs={[
        {
          question: 'What does cable derating mean?',
          answer:
            'Cable derating means reducing the tabulated current carrying capacity of a cable to account for real-world installation conditions that are less favourable than the reference conditions assumed in the BS 7671 tables. The reference conditions are 30°C ambient temperature, a single circuit (no grouping), no thermal insulation contact, and protection by an MCB or HRC fuse. When conditions differ from these — higher temperature, multiple grouped circuits, thermal insulation contact, or BS 3036 fuse protection — the cable can carry less current safely, so correction factors are applied to increase the required cable size.',
        },
        {
          question: 'How do I know which correction factors to apply?',
          answer:
            'You must assess the actual installation conditions along the entire cable route. Check the ambient temperature — if it exceeds 30°C, apply Ca from Table 4B1. Count how many circuits are grouped together — if more than one, apply Cg from Tables 4C1-4C5. Check whether the cable is in contact with thermal insulation — if so, apply Ci. Check the protective device type — if it is a BS 3036 rewirable fuse, apply Cf = 0.725. In most installations, at least two correction factors will apply. The Elec-Mate calculator guides you through each factor with clear prompts.',
        },
        {
          question: 'Do I need to derate cables protected by MCBs?',
          answer:
            'You do not need to apply the Cf factor (0.725) for cables protected by MCBs, because MCBs have a fusing factor close to 1 — they trip at approximately 1.13 to 1.45 times their rated current depending on the trip curve (B, C, or D). The Cf factor only applies to BS 3036 semi-enclosed (rewirable) fuses, which may not blow until the current reaches approximately twice their rated value. However, you still need to apply Ca (ambient temperature) and Cg (grouping) factors to cables protected by MCBs if the conditions differ from the reference values.',
        },
        {
          question: 'What is the worst-case derating scenario?',
          answer:
            'The worst-case scenario combines multiple unfavourable factors. For example, a circuit with a BS 3036 fuse (Cf = 0.725) in a hot plant room at 40°C (Ca = 0.87) with 6 circuits grouped in conduit (Cg = 0.57) and the cable totally enclosed in thermal insulation (Ci = 0.5) would give a combined correction of 0.725 x 0.87 x 0.57 x 0.5 = 0.18. For a 20A fuse, the required It would be 20 / 0.18 = 111A — meaning you would need a cable rated for 111A just to protect a 20A circuit. This extreme scenario highlights why it is important to avoid combining unfavourable installation conditions wherever possible.',
        },
        {
          question: 'Does cable derating affect voltage drop calculations?',
          answer:
            'Not directly. Voltage drop is calculated using the design current (Ib) and the cable mV/A/m value from the BS 7671 tables — it is independent of the correction factors. However, because derating often forces you to select a larger cable size, the voltage drop for the larger cable will be lower (because larger cables have lower mV/A/m values). So while derating does not change the voltage drop formula, it can indirectly improve the voltage drop result by requiring a larger conductor cross-sectional area. The Elec-Mate voltage drop calculator works alongside the derating calculator to check both requirements simultaneously.',
        },
        {
          question: 'Can grouping factors be reduced by spacing cables apart?',
          answer:
            'Yes. The grouping correction factor assumes cables are touching or bunched together. If cables are spaced apart by at least one cable diameter, the grouping factor is more favourable. On cable trays, spacing cables by one cable diameter apart allows use of the single-layer spaced factors from Table 4C3, which are significantly less severe than the bunched factors. For example, 6 circuits touching on a tray gives Cg = 0.57, but the same 6 circuits spaced apart on a tray can use Cg = 0.73. Where space allows, spacing cables out is an effective way to reduce derating.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/cable-sizing-calculator',
          title: 'Cable Sizing Calculator',
          description:
            'Full cable sizing to BS 7671 with automatic correction factors, voltage drop, and fault withstand.',
          icon: Cable,
          category: 'Calculators',
        },
        {
          href: '/tools/voltage-drop-calculator',
          title: 'Voltage Drop Calculator',
          description:
            'Calculate voltage drop and check compliance with 3% lighting and 5% power limits.',
          icon: Activity,
          category: 'Calculators',
        },
        {
          href: '/tools/conduit-fill-calculator',
          title: 'Conduit Fill Calculator',
          description:
            'Check conduit fill capacity to BS 7671 — maximum 45% fill ratio with space factor calculations.',
          icon: Layers,
          category: 'Calculators',
        },
        {
          href: '/tools/trunking-fill-calculator',
          title: 'Trunking Fill Calculator',
          description:
            'Verify trunking cable capacity to BS 7671 with automatic cable factor summation.',
          icon: Building,
          category: 'Calculators',
        },
        {
          href: '/tools/electrical-testing-calculators',
          title: 'All 50+ Calculators',
          description:
            'Browse the full suite of BS 7671 electrical calculators for cable sizing, testing, and design.',
          icon: Calculator,
          category: 'Tools',
        },
        {
          href: '/tools/eicr-certificate',
          title: 'EICR Certificate',
          description:
            'Full EICR with AI board scanner, voice test entry, and automatic BS 7671 validation.',
          icon: FileCheck2,
          category: 'Certificates',
        },
      ]}
      ctaHeading="Calculate derating factors in seconds"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for BS 7671 cable sizing and derating. 7-day free trial, cancel anytime."
      toolPath="/tools/cable-derating-calculator"
    />
  );
}
