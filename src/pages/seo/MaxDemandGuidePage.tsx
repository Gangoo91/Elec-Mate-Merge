import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Calculator,
  Zap,
  Activity,
  BookOpen,
  FileText,
  Gauge,
  Lightbulb,
  Home,
  Building2,
  Flame,
  BarChart3,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Calculators', href: '/tools/electrical-testing-calculators' },
  { label: 'Max Demand Guide', href: '/guides/max-demand-calculation-guide' },
];

const tocItems = [
  { id: 'what-is-max-demand', label: 'What Is Max Demand?' },
  { id: 'why-it-matters', label: 'Why Max Demand Matters' },
  { id: 'diversity-factors', label: 'Diversity Factors by Circuit Type' },
  { id: 'worked-example-domestic', label: 'Worked Example: Domestic' },
  { id: 'worked-example-commercial', label: 'Worked Example: Commercial' },
  { id: 'typical-values', label: 'Table of Typical Values' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'elec-mate-calculator', label: 'Using the Elec-Mate Calculator' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Max demand is the maximum load in amperes or kilowatts that an electrical installation is expected to draw at any one time, taking into account that not all circuits operate simultaneously at full load.',
  'Diversity factors from BS 7671 Appendix A (Table A1) and the IET On-Site Guide allow you to reduce the total connected load to a realistic maximum demand figure for each circuit type.',
  'Getting max demand wrong leads to undersized cables and protective devices (if too low) or unnecessary cost from oversized equipment (if too high).',
  'Domestic installations typically have a max demand of 60 to 100 A on a single-phase supply, depending on whether electric heating, showers, or EV chargers are installed.',
  'Elec-Mate includes a max demand calculator that applies the correct diversity factors automatically, plus 50+ other calculators including cable sizing, voltage drop, Zs, and PFC.',
];

const faqs = [
  {
    question: 'What is the difference between max demand and total connected load?',
    answer:
      'Total connected load is the sum of the rated current of every circuit and appliance in the installation, assuming everything runs at full load simultaneously. Max demand is the realistic maximum load the installation is expected to draw at any one time, after diversity factors have been applied. For example, a domestic installation might have a total connected load of 200 A (adding up every socket, cooker, shower, and lighting circuit), but a max demand of 80 A because it is extremely unlikely that every circuit will draw full load at the same time. The diversity factors from BS 7671 Appendix A (Table A1) and the IET On-Site Guide provide the reduction percentages for each circuit type. Max demand is the figure that matters when sizing the main incoming cable, main switch, and distribution board.',
  },
  {
    question: 'Where do I find the diversity factors in BS 7671?',
    answer:
      'The diversity factors for domestic and small commercial installations are set out in BS 7671 Appendix A, specifically Table A1 (Allowances for diversity). The IET On-Site Guide (Appendix H) also reproduces the same table with additional guidance notes. These tables break down diversity by circuit type: lighting, heating, cooking appliances, motors, socket outlets, water heaters, and so on. Each circuit type has a different percentage reduction. For larger commercial and industrial installations, diversity factors are typically agreed with the Distribution Network Operator (DNO) based on the specific load profile and historical data rather than applying the standard domestic table.',
  },
  {
    question: 'Do I need to calculate max demand for every job?',
    answer:
      'You need to calculate max demand whenever you are designing or significantly altering an electrical installation and need to determine the size of the incoming supply, main cable, or distribution board. For a simple like-for-like replacement (for example, swapping a socket for a socket on an existing circuit), a max demand calculation is not required because the existing supply capacity is not being changed. However, for new installations, consumer unit upgrades, additions that increase the load (such as adding an EV charger or electric shower), or commercial fit-outs, a max demand assessment is essential. It also forms part of the design documentation required by BS 7671 Part 3 (Assessment of General Characteristics) — specifically Regulation 311 (Purpose, Supplies, and Structure) and Regulation 313 (Assessment of Maximum Demand).',
  },
  {
    question: 'How does max demand affect the DNO supply?',
    answer:
      'The Distribution Network Operator (DNO) supplies a service fuse and incoming cable rated to a specific capacity — typically 60 A or 100 A single-phase for domestic properties. If your max demand calculation shows that the installation will exceed the existing supply capacity, you must apply to the DNO for a supply upgrade before starting work. This is particularly relevant when adding high-load circuits such as EV chargers (typically 32 A), electric showers (40 to 50 A), or electric heating systems. The DNO application process can take several weeks and may involve a charge, so it needs to be factored into project planning. Your max demand calculation is the evidence the DNO will require to justify the upgrade.',
  },
  {
    question: 'Can I use the max demand calculator on Elec-Mate?',
    answer:
      'Yes. Elec-Mate includes a max demand calculator that lets you enter each circuit type and rating. It applies the correct diversity factors from BS 7671 Appendix A automatically and calculates the total max demand in amperes and kilowatts. The calculator covers all standard domestic circuit types — lighting, socket outlets, cooking appliances, water heaters, immersion heaters, electric showers, space heating, and EV chargers. It shows the diversity factor applied to each circuit and the resulting diversified load, so you can see exactly how the final figure is derived. The result can be included in your design documentation. Elec-Mate also includes 50+ other calculators covering cable sizing, voltage drop, Zs, PFC, adiabatic equation, conduit fill, trunking fill, power factor, and three-phase power.',
  },
  {
    question: 'What diversity factor applies to socket outlets?',
    answer:
      'For a domestic installation, BS 7671 Appendix A (Table A1) applies the following diversity to socket outlets: 100% of the largest circuit plus 40% of the remaining circuits. For example, if you have a 32 A ring final circuit and two 20 A radial circuits, the diversified demand would be 32 A (100% of the largest) + 8 A (40% of 20 A) + 8 A (40% of 20 A) = 48 A. This reflects the reality that while one ring circuit might be heavily loaded (powering a kettle, microwave, and toaster in the kitchen), other socket circuits are unlikely to be at full load simultaneously. The On-Site Guide notes that for commercial installations with heavy socket loads (such as open-plan offices with many computer workstations), a higher diversity allowance or a specific load survey may be appropriate.',
  },
  {
    question: 'Is max demand the same as design current (Ib)?',
    answer:
      'They are related but not identical. Max demand is the overall maximum load of the entire installation (or a section of it), expressed in amperes or kilowatts. Design current (Ib) is the current a specific circuit is expected to carry in normal service — it is the starting point for selecting the cable size and protective device rating for that individual circuit. When calculating Ib for a circuit, you may apply diversity if the circuit feeds multiple loads that will not all operate simultaneously. The max demand calculation for the whole installation uses the individual circuit loads (which may already include some diversity) and then applies the overall diversity factors from Table A1 to arrive at the total maximum demand on the incoming supply.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/max-demand-calculator',
    title: 'Max Demand Calculator',
    description:
      'Calculate max demand with automatic diversity factor application for domestic and commercial installations.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables correctly using design current, correction factors, and current-carrying capacity tables.',
    icon: Activity,
    category: 'Calculator',
  },
  {
    href: '/tools/diversity-factor-calculator',
    title: 'Diversity Factor Calculator',
    description:
      'Apply BS 7671 diversity factors to each circuit type and calculate the total diversified load.',
    icon: BarChart3,
    category: 'Calculator',
  },
  {
    href: '/guides/appendix-4-tables-bs-7671',
    title: 'Appendix 4 Tables Guide',
    description:
      'How to use the current-carrying capacity tables in Appendix 4 of BS 7671 for cable selection.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/three-phase-calculations',
    title: 'Three Phase Calculations',
    description:
      'Power, current, and voltage calculations for three-phase circuits including star and delta configurations.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-size-cables-bs-7671',
    title: 'How to Size Cables',
    description:
      'Step-by-step cable sizing process from design current through correction factors to final selection.',
    icon: FileText,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-max-demand',
    heading: 'What Is Max Demand?',
    content: (
      <>
        <p>
          Max demand (sometimes written as maximum demand) is the greatest electrical load, measured
          in amperes or kilowatts, that an installation is expected to draw from the supply at any
          one time. It is not the total of every circuit added together — it is a realistic
          assessment of the peak simultaneous load, taking into account that most circuits will not
          be at full capacity at the same moment.
        </p>
        <p>
          BS 7671:2018+A3:2024 requires the designer of an electrical installation to assess the
          maximum demand as part of the general characteristics assessment under Part 3,
          specifically Regulation 311.1 and the guidance in Appendix A. This assessment directly
          affects the sizing of the incoming supply cable, the main protective device, the
          distribution board, and every downstream cable and device.
        </p>
        <p>
          The concept is straightforward: a typical domestic property might have a 10 kW electric
          shower, a 13 kW cooker, a 3 kW kettle, a 3 kW immersion heater, a 7 kW{' '}
          <SEOInternalLink href="/guides/ev-charger-installation">EV charger</SEOInternalLink>, and
          dozens of socket outlets. If you added up the rating of every circuit and appliance, you
          might reach 200 A or more. But in practice, you will never run the shower, cooker, kettle,
          immersion heater, and EV charger all at full load simultaneously while also loading every
          socket circuit to its maximum. Max demand accounts for this by applying diversity factors.
        </p>
      </>
    ),
  },
  {
    id: 'why-it-matters',
    heading: 'Why Max Demand Matters',
    content: (
      <>
        <p>
          Getting the max demand calculation right is critical for two reasons: safety and cost.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underestimate max demand</strong> and you risk undersizing the incoming
                cable and protective devices. This can lead to overloaded cables, overheating,
                nuisance tripping of the main switch or service fuse, and in the worst case, a fire.
                The DNO service fuse may blow repeatedly, leaving the property without power.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overestimate max demand</strong> and you specify larger cables, bigger
                distribution boards, and a higher-rated incoming supply than necessary. This
                increases material costs unnecessarily. For commercial installations, an oversized
                supply can also mean higher standing charges from the DNO.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DNO supply applications</strong> depend on your max demand figure. If you
                need to request a supply upgrade (for example, from 60 A to 100 A single-phase, or a
                three-phase supply for a commercial unit), the DNO will ask for your max demand
                assessment. Getting this wrong delays the project and may result in paying for a
                supply you do not need.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For domestic installations, the max demand assessment is often a quick calculation using
          the standard diversity factors. For larger commercial and industrial installations, it
          requires a detailed load analysis — and may need to be agreed with the DNO based on
          historical load data or projected usage patterns.
        </p>
      </>
    ),
  },
  {
    id: 'diversity-factors',
    heading: 'Diversity Factors by Circuit Type',
    content: (
      <>
        <p>
          Diversity factors are percentage reductions applied to the rated load of each circuit type
          to reflect the realistic likelihood of simultaneous use. They are set out in{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671 Appendix A (Table A1)
          </SEOInternalLink>{' '}
          and reproduced in the IET On-Site Guide (Appendix H). The key circuit types and their
          diversity allowances for a typical domestic installation are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 overflow-x-auto">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-4 font-semibold">Circuit Type</th>
                <th className="text-left py-3 pr-4 font-semibold">Diversity Allowance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-3 pr-4 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-400 shrink-0" />
                  Lighting
                </td>
                <td className="py-3 pr-4">66% of total connected load</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 flex items-center gap-2">
                  <Home className="w-4 h-4 text-yellow-400 shrink-0" />
                  Socket outlets (general use)
                </td>
                <td className="py-3 pr-4">100% of largest circuit + 40% of remaining</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-yellow-400 shrink-0" />
                  Cooking appliances
                </td>
                <td className="py-3 pr-4">
                  10 A + 30% of remainder + 5 A for socket in cooker control
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400 shrink-0" />
                  Instantaneous water heaters (showers)
                </td>
                <td className="py-3 pr-4">100% of largest + 100% of second largest (if any)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-yellow-400 shrink-0" />
                  Immersion heater
                </td>
                <td className="py-3 pr-4">100% of full load (no diversity)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-yellow-400 shrink-0" />
                  Space heating (fixed)
                </td>
                <td className="py-3 pr-4">100% of largest + 40% of remaining</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-yellow-400 shrink-0" />
                  EV charger
                </td>
                <td className="py-3 pr-4">100% (usually a dedicated circuit)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          These factors apply to domestic and small commercial installations. For larger
          installations, diversity is typically assessed on a case-by-case basis using load
          profiles, power monitoring data, or industry-specific guidance. The IET Guidance Note 1
          (Selection and Erection) provides further commentary on applying diversity in practice.
        </p>
      </>
    ),
  },
  {
    id: 'worked-example-domestic',
    heading: 'Worked Example: Domestic Installation',
    content: (
      <>
        <p>Consider a typical three-bedroom house with the following circuits:</p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-4">Connected Load</h4>
          <ul className="space-y-2 text-white text-sm">
            <li>Lighting: 2 circuits at 5 A each = 10 A total</li>
            <li>Ring final circuits: 2 x 32 A = 64 A total</li>
            <li>Cooker circuit: 32 A (13 kW cooker + socket outlet)</li>
            <li>Electric shower: 40 A (9.5 kW)</li>
            <li>Immersion heater: 16 A (3 kW)</li>
            <li>EV charger: 32 A (7.4 kW)</li>
          </ul>
          <p className="text-white text-sm mt-3">
            <strong>Total connected load: 194 A</strong>
          </p>
        </div>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-4">Diversified Max Demand</h4>
          <ul className="space-y-2 text-white text-sm">
            <li>
              Lighting: 66% of 10 A = <strong>6.6 A</strong>
            </li>
            <li>
              Socket outlets: 100% of 32 A + 40% of 32 A = 32 + 12.8 = <strong>44.8 A</strong>
            </li>
            <li>
              Cooker: 10 A + 30% of (32 - 10) A + 5 A socket = 10 + 6.6 + 5 ={' '}
              <strong>21.6 A</strong>
            </li>
            <li>
              Electric shower: 100% of 40 A = <strong>40 A</strong>
            </li>
            <li>
              Immersion heater: 100% of 16 A = <strong>16 A</strong>
            </li>
            <li>
              EV charger: 100% of 32 A = <strong>32 A</strong>
            </li>
          </ul>
          <p className="text-white text-sm mt-3">
            <strong>Total max demand: 161 A</strong> — down from 194 A connected load
          </p>
          <p className="text-white text-sm mt-2">
            This exceeds a standard 100 A single-phase supply. The designer would need to consider
            load management (such as an EV charger with load balancing), a{' '}
            <SEOInternalLink href="/guides/three-phase-calculations">
              three-phase supply
            </SEOInternalLink>
            , or negotiating a higher supply capacity with the DNO.
          </p>
        </div>
        <SEOAppBridge
          title="Calculate max demand in seconds"
          description="Enter your circuit types and ratings into the Elec-Mate max demand calculator. It applies the correct diversity factors from BS 7671 Appendix A automatically and gives you the total max demand in amperes and kilowatts."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'worked-example-commercial',
    heading: 'Worked Example: Small Commercial Unit',
    content: (
      <>
        <p>
          For a small commercial unit (office or retail), the diversity assessment is different.
          Socket outlet loading in commercial premises is typically higher and more sustained than
          in domestic properties, and specific loads such as air conditioning, commercial kitchen
          equipment, or server rooms need individual assessment.
        </p>
        <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-4">Example: Small Office (Single Phase)</h4>
          <ul className="space-y-2 text-white text-sm">
            <li>
              LED lighting: 3 circuits at 5 A each = 15 A (apply 90% for commercial LED ={' '}
              <strong>13.5 A</strong>)
            </li>
            <li>
              Socket outlets: 4 x 32 A ring circuits = 128 A (apply 100% + 40% + 40% + 40% = 32 +
              12.8 + 12.8 + 12.8 = <strong>70.4 A</strong>)
            </li>
            <li>
              Air conditioning: 20 A dedicated circuit = <strong>20 A</strong> (100%)
            </li>
            <li>
              Water heater (under-sink): 13 A = <strong>13 A</strong> (100%)
            </li>
            <li>
              Server room: 20 A dedicated = <strong>20 A</strong> (100%, continuous load)
            </li>
          </ul>
          <p className="text-white text-sm mt-3">
            <strong>Total max demand: approximately 137 A</strong> — likely requiring a three-phase
            supply or careful load balancing on a 100 A single-phase supply.
          </p>
        </div>
        <p>
          For commercial installations, it is common to use a spreadsheet or calculator tool to
          document the max demand assessment. This forms part of the design records required by{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink> and
          should be retained with the Electrical Installation Certificate.
        </p>
      </>
    ),
  },
  {
    id: 'typical-values',
    heading: 'Table of Typical Max Demand Values',
    content: (
      <>
        <p>
          The following table shows typical max demand values for common installation types. These
          are approximate figures based on standard UK installations and should be verified with a
          proper calculation for each specific project.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 overflow-x-auto">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-4 font-semibold">Installation Type</th>
                <th className="text-left py-3 pr-4 font-semibold">Typical Max Demand</th>
                <th className="text-left py-3 pr-4 font-semibold">Supply</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-3 pr-4">1-bed flat (gas heating)</td>
                <td className="py-3 pr-4">30 to 50 A</td>
                <td className="py-3 pr-4">Single-phase 60 A</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">3-bed house (gas heating, electric shower)</td>
                <td className="py-3 pr-4">60 to 80 A</td>
                <td className="py-3 pr-4">Single-phase 100 A</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">3-bed house (electric heating, shower, EV charger)</td>
                <td className="py-3 pr-4">120 to 160 A</td>
                <td className="py-3 pr-4">Three-phase or load management</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Small retail unit</td>
                <td className="py-3 pr-4">60 to 100 A</td>
                <td className="py-3 pr-4">Single-phase 100 A</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Medium office (20+ desks)</td>
                <td className="py-3 pr-4">100 to 200 A</td>
                <td className="py-3 pr-4">Three-phase</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Restaurant with commercial kitchen</td>
                <td className="py-3 pr-4">150 to 300 A</td>
                <td className="py-3 pr-4">Three-phase</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Small industrial workshop</td>
                <td className="py-3 pr-4">100 to 400 A</td>
                <td className="py-3 pr-4">Three-phase</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          These are guidelines only. Every installation must be assessed individually. The presence
          of high-load items such as electric vehicle chargers, heat pumps, or commercial kitchen
          equipment can significantly increase the max demand beyond the typical ranges shown.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes in Max Demand Calculations',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Forgetting to apply diversity.</strong> Adding up every circuit rating
                without diversity produces a total connected load, not max demand. This leads to
                massively oversized supplies and unnecessary cost. Always apply the factors from
                Table A1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Applying diversity to individual circuits instead of circuit types.</strong>{' '}
                Diversity factors apply to groups of circuits of the same type. You do not apply the
                lighting diversity factor to an individual lighting circuit — you apply it to the
                total lighting load across the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ignoring future load growth.</strong> If the client is likely to add an EV
                charger, heat pump, or extension in the near future, it makes sense to factor this
                into the max demand assessment now — even if the circuit is not installed yet. This
                avoids a costly supply upgrade later.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Using domestic diversity factors for commercial installations.</strong> The
                Table A1 factors are designed for domestic premises. Commercial and industrial
                installations may need higher diversity allowances — especially for socket outlets
                in offices, commercial kitchens, or process loads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not documenting the calculation.</strong> BS 7671 requires design records.
                Your max demand calculation should be documented and retained with the Electrical
                Installation Certificate. A{' '}
                <SEOInternalLink href="/tools/max-demand-calculator">
                  max demand calculator tool
                </SEOInternalLink>{' '}
                makes this straightforward.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'elec-mate-calculator',
    heading: 'Using the Elec-Mate Max Demand Calculator',
    content: (
      <>
        <p>
          Elec-Mate includes a purpose-built max demand calculator as part of its suite of 50+
          electrical calculators. The calculator is designed for UK electricians working to{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink> and
          does the following:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Automatic Diversity Factors</h4>
                <p className="text-white text-sm leading-relaxed">
                  Select the circuit type from a dropdown (lighting, sockets, cooker, shower,
                  immersion, space heating, EV charger, etc.) and enter the rated current. The
                  calculator applies the correct diversity factor from BS 7671 Appendix A
                  automatically.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <BarChart3 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Clear Breakdown</h4>
                <p className="text-white text-sm leading-relaxed">
                  The result shows each circuit type, the connected load, the diversity factor
                  applied, and the diversified load — so you can see exactly how the final max
                  demand figure is derived. This transparency makes it easy to verify and to include
                  in design documentation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Activity className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">50+ Calculators in One App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Max demand is just one of over 50 calculators on Elec-Mate. Others include{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing
                  </SEOInternalLink>
                  ,{' '}
                  <SEOInternalLink href="/guides/voltage-drop-guide-bs-7671">
                    voltage drop
                  </SEOInternalLink>
                  ,{' '}
                  <SEOInternalLink href="/guides/earth-fault-loop-impedance-calculation">
                    earth fault loop impedance (Zs)
                  </SEOInternalLink>
                  ,{' '}
                  <SEOInternalLink href="/guides/prospective-fault-current-explained">
                    PFC
                  </SEOInternalLink>
                  ,{' '}
                  <SEOInternalLink href="/tools/adiabatic-equation-calculator">
                    adiabatic equation
                  </SEOInternalLink>
                  , conduit fill, trunking fill, power factor, and three-phase power.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Try all 50+ calculators free for 7 days"
          description="Max demand, cable sizing, voltage drop, Zs, PFC, adiabatic, conduit fill, trunking fill, power factor, diversity factor, three-phase power — all in one app, designed for UK electricians working to BS 7671."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function MaxDemandGuidePage() {
  return (
    <GuideTemplate
      title="Max Demand Calculation Guide | BS 7671 Method"
      description="Complete guide to calculating max demand for electrical installations using BS 7671 diversity factors. Worked examples for domestic and commercial installations, table of typical values, and common mistakes to avoid."
      datePublished="2025-03-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Technical Guide"
      badgeIcon={Calculator}
      heroTitle={
        <>
          Max Demand Calculation:{' '}
          <span className="text-yellow-400">The BS 7671 Method Explained</span>
        </>
      }
      heroSubtitle="Max demand is the starting point for every installation design. Get it wrong and you undersize the supply or waste money on oversized equipment. This guide walks through diversity factors, worked examples for domestic and commercial installations, and the common mistakes that trip electricians up."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Max Demand Calculations"
      relatedPages={relatedPages}
      ctaHeading="Calculate Max Demand on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's 50+ calculators including max demand, cable sizing, voltage drop, Zs, PFC, and more. 7-day free trial, cancel anytime."
    />
  );
}
