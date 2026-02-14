import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Calculator,
  Zap,
  BarChart3,
  FileText,
  CheckCircle2,
  Scale,
  Brain,
  TrendingUp,
  Building2,
  Car,
  Plug,
  AlertTriangle,
} from 'lucide-react';

export default function ElectricalLoadAssessmentPage() {
  return (
    <GuideTemplate
      title="Electrical Load Assessment | Maximum Demand Guide"
      description="Complete guide to electrical load assessments and maximum demand calculations for UK electricians. When an assessment is required, how to calculate maximum demand with diversity, DNO notification triggers, EV charger and heat pump considerations, and when to recommend a supply upgrade."
      datePublished="2026-01-22"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'Load Assessment', href: '/guides/electrical-load-assessment' },
      ]}
      tocItems={[
        { id: 'what-is-load-assessment', label: 'What Is a Load Assessment?' },
        { id: 'when-required', label: 'When Is It Required?' },
        { id: 'maximum-demand', label: 'Calculating Maximum Demand' },
        { id: 'diversity', label: 'Applying Diversity' },
        { id: 'dno-notification', label: 'DNO Notification' },
        { id: 'ev-chargers-heat-pumps', label: 'EV Chargers and Heat Pumps' },
        { id: 'supply-upgrade-triggers', label: 'Supply Upgrade Triggers' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Technical Guide"
      badgeIcon={Calculator}
      heroTitle={
        <>
          Electrical Load Assessment: <span className="text-yellow-400">Maximum Demand Guide</span>
        </>
      }
      heroSubtitle="Getting the load assessment right prevents nuisance tripping, supply overloads, and costly upgrades. This guide explains when a load assessment is required, how to calculate maximum demand with diversity factors, when to notify the DNO, and the common triggers that mean a supply upgrade is unavoidable."
      readingTime={14}
      keyTakeaways={[
        'A load assessment calculates the maximum electrical demand of an installation to ensure the supply (fuse, cable, and meter) can handle the total load without overloading.',
        'Load assessments are required before adding significant new loads such as EV chargers, heat pumps, electric showers, or additional circuits during an extension or conversion.',
        'Diversity factors from BS 7671 Appendix A (Table A1) reduce the calculated maximum demand to reflect the fact that not all loads operate simultaneously at full capacity.',
        'DNO notification is required under the Electricity Safety, Quality and Continuity Regulations 2002 when the maximum demand exceeds or is likely to exceed the existing supply capacity.',
        "Elec-Mate's Max Demand Calculator applies BS 7671 diversity factors automatically and flags when the calculated demand approaches or exceeds the supply threshold, so you know exactly when to contact the DNO.",
      ]}
      sections={[
        {
          id: 'what-is-load-assessment',
          heading: 'What Is an Electrical Load Assessment?',
          content: (
            <>
              <p>
                An electrical load assessment is a calculation that determines the maximum
                electrical demand (in amps or kilowatts) that an installation will place on its
                supply. It is the fundamental starting point for any design decision about an
                electrical installation, whether you are designing a new installation from scratch
                or adding load to an existing one.
              </p>
              <p>
                The assessment considers every fixed electrical load in the property: lighting
                circuits, socket outlets, cooker, shower, immersion heater, heating system, and any
                specialist loads such as EV chargers, heat pumps, or workshop equipment. Each load
                is recorded with its rated current, and diversity factors are applied to account for
                the fact that not every load operates simultaneously.
              </p>
              <p>
                The result is the assessed maximum demand, which is compared against the available
                supply. For most UK domestic properties, the supply is a single-phase 100 A supply
                with a 60 A, 80 A, or 100 A service fuse. If the assessed maximum demand exceeds the
                supply capacity, the installation cannot safely operate and a supply upgrade is
                required before the new load can be connected.
              </p>
              <p>
                Load assessments are not optional. Regulation 311.1 of{' '}
                <SEOInternalLink href="/guides/bs7671-18th-edition">BS 7671</SEOInternalLink>{' '}
                requires that the maximum demand of every installation is assessed to ensure that
                the supply characteristics are adequate. Getting this wrong means the supply fuse
                blows under peak load, or worse, the supply cable overheats because the fuse rating
                has been increased without upgrading the cable.
              </p>
            </>
          ),
        },
        {
          id: 'when-required',
          heading: 'When Is a Load Assessment Required?',
          content: (
            <>
              <p>
                A load assessment should be carried out whenever the electrical demand of a property
                is likely to change. The most common triggers are:
              </p>
              <div className="space-y-4 mt-6">
                <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Car className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">EV Charger Installation</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    A 7.4 kW{' '}
                    <SEOInternalLink href="/guides/ev-charger-installation">
                      EV charger
                    </SEOInternalLink>{' '}
                    draws 32 A continuously. On a property with an existing maximum demand of 60 A,
                    adding a 32 A continuous load may push the total demand beyond the supply
                    capacity. Load management systems can mitigate this, but the assessment must be
                    done first to determine whether management or an upgrade is needed.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Extensions and Conversions</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Adding rooms means adding circuits: lighting, sockets, potentially a shower,
                    underfloor heating, or additional cooking facilities. A loft conversion or
                    garage conversion can add 20-40 A of demand depending on the specification. The
                    assessment determines whether the existing supply can accommodate the additional
                    load.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Plug className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">New Connections</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    New-build properties and major renovations requiring a new supply connection
                    must submit a load assessment to the DNO as part of the connection application.
                    The DNO uses this to determine the appropriate supply capacity, service cable
                    size, and fuse rating for the new connection.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Full Rewires</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    A{' '}
                    <SEOInternalLink href="/guides/house-rewire-guide">full rewire</SEOInternalLink>{' '}
                    is an opportunity to reassess the maximum demand. Older properties may have been
                    designed for a fraction of the modern electrical load. The rewire specification
                    should be based on the assessed maximum demand, not just a like-for-like
                    replacement of existing circuits.
                  </p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'maximum-demand',
          heading: 'Calculating Maximum Demand',
          content: (
            <>
              <p>
                Maximum demand is calculated by listing every fixed electrical load in the
                installation, recording its rated current, and then applying diversity factors to
                produce a realistic total. Without diversity, the raw total of all loads would
                produce an unrealistically high figure because it assumes every load operates
                simultaneously at full capacity.
              </p>
              <h3 className="text-xl font-bold text-white mt-6 mb-3">Step 1: List All Loads</h3>
              <p>
                Record every fixed electrical load with its rated current in amps. Common domestic
                loads include:
              </p>
              <div className="overflow-x-auto my-6">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="py-3 pr-4 text-white font-bold">Load</th>
                      <th className="py-3 pr-4 text-white font-bold">Typical Rating</th>
                      <th className="py-3 text-white font-bold">Circuit Protection</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Lighting (per circuit)</td>
                      <td className="py-3 pr-4">Up to 6 A</td>
                      <td className="py-3">6 A MCB</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Ring final circuit (sockets)</td>
                      <td className="py-3 pr-4">Up to 32 A</td>
                      <td className="py-3">32 A MCB</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Electric cooker</td>
                      <td className="py-3 pr-4">30-45 A</td>
                      <td className="py-3">32 A or 40 A MCB</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Electric shower (9.5 kW)</td>
                      <td className="py-3 pr-4">41 A</td>
                      <td className="py-3">40 A or 45 A MCB</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Immersion heater (3 kW)</td>
                      <td className="py-3 pr-4">13 A</td>
                      <td className="py-3">16 A MCB</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">EV charger (7.4 kW)</td>
                      <td className="py-3 pr-4">32 A</td>
                      <td className="py-3">32 A MCB/RCBO</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Heat pump (typical domestic)</td>
                      <td className="py-3 pr-4">10-20 A</td>
                      <td className="py-3">16 A or 20 A MCB</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">Step 2: Apply Diversity</h3>
              <p>
                Diversity factors from BS 7671 Appendix A, Table A1 are applied to each load
                category. These factors account for the reality that not all loads run at full power
                simultaneously. The{' '}
                <SEOInternalLink href="/tools/diversity-factor-calculator">
                  diversity factor calculator
                </SEOInternalLink>{' '}
                in Elec-Mate applies these automatically.
              </p>

              <h3 className="text-xl font-bold text-white mt-6 mb-3">
                Step 3: Sum the Diversified Loads
              </h3>
              <p>
                Add up all the diversified load values to produce the assessed maximum demand.
                Compare this figure against the available supply (typically 60 A, 80 A, or 100 A for
                domestic single-phase). If the assessed demand exceeds the supply, action is needed.
              </p>
              <SEOAppBridge
                title="Max Demand Calculator with automatic diversity"
                description="Enter your loads and Elec-Mate applies BS 7671 Table A1 diversity factors automatically. See instantly whether the supply can handle the load and get flagged when DNO notification is needed."
                icon={Calculator}
              />
            </>
          ),
        },
        {
          id: 'diversity',
          heading: 'Understanding Diversity',
          content: (
            <>
              <p>
                Diversity is the principle that not all electrical loads in an installation will
                operate simultaneously at their maximum rating. A house with a 45 A cooker, a 41 A
                shower, a 32 A EV charger, and multiple ring circuits does not draw 150+ A because
                not all of these loads run at the same time at full output.
              </p>
              <p>
                BS 7671 Appendix A, Table A1 provides standard diversity factors for domestic
                premises. These factors specify what proportion of each load category should be
                included in the maximum demand calculation. For example, the first 10 A of cooking
                appliance load is taken at 100%, but the remainder is taken at 30%. For socket
                outlets, the first ring circuit is assessed at 100% of the connected load, and
                additional circuits at 40%.
              </p>
              <p>
                Diversity factors do not apply to individual circuits for cable sizing purposes.
                Each circuit cable must be sized for the full expected load on that circuit. The{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  cable sizing calculator
                </SEOInternalLink>{' '}
                handles this separately from the maximum demand calculation.
              </p>
              <p>
                Diversity is only used to assess the total demand on the supply. It answers the
                question: "Can the incoming supply handle all these loads, given that they will not
                all be running at full power at the same time?" If the answer is no — even after
                applying diversity — the supply needs upgrading.
              </p>
              <p>
                It is important to note that diversity factors are based on typical domestic usage
                patterns. Properties with unusual load profiles (home workshops, multiple EV
                chargers, cryptocurrency mining, commercial-grade kitchens in domestic premises) may
                require a more conservative approach with reduced or no diversity applied to the
                atypical loads.
              </p>
            </>
          ),
        },
        {
          id: 'dno-notification',
          heading: 'DNO Notification',
          content: (
            <>
              <p>
                The Electricity Safety, Quality and Continuity Regulations (ESQCR) 2002, Regulation
                22, requires consumers (or their electrician) to give notice to the DNO before
                making any change to the electrical installation that may significantly affect the
                load. In practice, this means notifying the DNO when:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      The assessed maximum demand exceeds or is likely to exceed the rating of the
                      existing service fuse
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      You are installing an EV charger (most DNOs have a specific notification
                      process)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>You are installing a heat pump or other large continuous load</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>The property is converting from single-phase to three-phase supply</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      You are installing solar PV or battery storage systems that export to the grid
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      A new supply connection is required for a new build or major renovation
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                DNO notification is typically done via the DNO's website or through your competent
                person scheme registration (NICEIC, NAPIT, etc.). Some schemes include DNO
                notification as part of the Building Regulations notification process. The DNO will
                respond with either an acceptance (the existing supply is adequate) or a requirement
                for a supply upgrade.
              </p>
              <p>
                Failure to notify the DNO is a breach of ESQCR 2002 and can result in the DNO
                refusing to supply, or the supply fuse blowing repeatedly because the load exceeds
                its rating. It also leaves the electrician liable if the supply cable overheats
                because the assessment was not done.
              </p>
            </>
          ),
        },
        {
          id: 'ev-chargers-heat-pumps',
          heading: 'EV Chargers and Heat Pumps',
          content: (
            <>
              <p>
                The two loads that most frequently trigger supply upgrade discussions in 2026 are EV
                chargers and heat pumps. Both are large, continuous loads that significantly
                increase the maximum demand of a domestic property.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 mt-6">
                <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Car className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">EV Chargers</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    A 7.4 kW single-phase charger draws 32 A continuously for several hours. On a
                    property with a 60 A fuse and existing demand of 40-50 A, this is problematic.
                    Load management systems (CT clamp monitoring) can dynamically reduce the charge
                    rate when household demand is high, but this slows charging. A supply upgrade to
                    80 A or 100 A is the permanent solution.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Heat Pumps</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Air-source and ground-source heat pumps typically draw 10-20 A depending on
                    capacity, and they run for extended periods during cold weather. Combined with
                    an EV charger, a heat pump can push a domestic installation well beyond a 60 A
                    or even 80 A supply. Properties transitioning from gas heating to heat pumps
                    need a load assessment before the heat pump is specified and ordered.
                  </p>
                </div>
              </div>
              <p className="mt-6">
                The combination of EV charger plus heat pump on a single-phase domestic supply is
                one of the most common load assessment scenarios in 2026. Many older properties with
                60 A service fuses simply cannot accommodate both without an upgrade. As a
                responsible electrician, identifying this early in the project saves the customer
                from costly surprises mid-installation.
              </p>
              <SEOAppBridge
                title="EV and heat pump load calculations in seconds"
                description="Elec-Mate's Max Demand Calculator handles EV chargers, heat pumps, and all standard domestic loads with BS 7671 diversity applied automatically. Know instantly if the supply is adequate."
                icon={Brain}
              />
            </>
          ),
        },
        {
          id: 'supply-upgrade-triggers',
          heading: 'Supply Upgrade Triggers',
          content: (
            <>
              <p>
                A supply upgrade is required when the assessed maximum demand exceeds the capacity
                of the existing supply infrastructure. This is not just the service fuse rating — it
                also includes the service cable capacity and the meter rating.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
                <h3 className="font-bold text-white text-lg mb-4">Common Upgrade Triggers</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Fuse upgrade (60 A to 80 A or 100 A)
                      </strong>{' '}
                      — The DNO can often upgrade the service fuse without replacing the service
                      cable, provided the existing cable is adequate. Cost: often free or minimal if
                      the cable is already rated for the higher fuse.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Service cable upgrade</strong> — If the
                      existing service cable cannot support the higher fuse rating, the DNO must
                      replace it. This involves excavation and is significantly more expensive,
                      often £500-£2,000+ depending on the length and route.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Single-phase to three-phase conversion
                      </strong>{' '}
                      — Required when the single-phase supply cannot provide enough capacity even at
                      100 A. Common for large properties with EV charger, heat pump, electric
                      cooking, and workshop equipment. Cost: £2,000-£10,000+ depending on the
                      distance from the transformer.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">New main tails</strong> — If the existing
                      meter tails are undersized (commonly 16 mm or 25 mm in older installations),
                      they must be upgraded to match the supply capacity. This is the electrician's
                      responsibility, not the DNO's. Typically 25 mm for 80 A or 35 mm for 100 A.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Always discuss potential supply upgrade costs with the customer early in the
                project. A customer who expects to pay £800 for an EV charger installation may not
                be prepared for an additional £2,000+ if a supply upgrade is needed. Early
                communication prevents disputes and lost deposits.
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'List all existing and proposed loads',
          text: 'Record every fixed electrical load in the installation including lighting circuits, socket outlet circuits, cooker, shower, immersion heater, heating system, EV charger, and any specialist loads. Include the rated current for each load.',
        },
        {
          name: 'Apply BS 7671 diversity factors',
          text: 'Apply the appropriate diversity factor from BS 7671 Appendix A, Table A1 to each load category. This reduces the raw total to reflect realistic simultaneous usage patterns.',
        },
        {
          name: 'Calculate the assessed maximum demand',
          text: 'Sum all the diversified load values to produce the total assessed maximum demand in amps. Compare this figure against the available supply capacity (service fuse rating, service cable capacity, and meter rating).',
        },
        {
          name: 'Determine if the supply is adequate',
          text: 'If the assessed maximum demand is within the supply capacity with a reasonable margin, the existing supply is adequate. If the demand approaches or exceeds the supply, further action is needed.',
        },
        {
          name: 'Notify the DNO or arrange a supply upgrade',
          text: 'If the supply is inadequate, notify the DNO and discuss options: fuse upgrade, service cable replacement, or single-phase to three-phase conversion. Include the supply upgrade timeline and cost in the project plan.',
        },
      ]}
      howToHeading="How to Carry Out an Electrical Load Assessment"
      howToDescription="A step-by-step process for calculating maximum demand and determining whether the existing supply is adequate for a domestic installation."
      faqs={[
        {
          question: 'What is the maximum demand of a typical UK house?',
          answer:
            'A typical modern 3-bedroom UK house with gas central heating has an assessed maximum demand (after diversity) of approximately 40-60 A. This includes lighting, socket outlets, cooker, shower, and immersion heater. Properties with electric heating instead of gas have significantly higher demand, often 60-80 A. Adding an EV charger (32 A) and/or a heat pump (10-20 A) can push the demand to 80-100 A or beyond. The exact figure depends on the number of circuits, the size of the cooking appliance, the shower rating, and what other high-power loads are installed. This is why every property needs an individual assessment rather than a generic estimate.',
        },
        {
          question: 'Do I need to do a load assessment for an EV charger?',
          answer:
            'Yes. Every EV charger installation should include a maximum demand assessment. A 7.4 kW single-phase charger draws 32 A continuously, which is a significant addition to any domestic installation. The assessment determines whether the existing supply can handle the additional load, whether load management is needed (a CT clamp system that reduces the charge rate when household demand is high), or whether a supply upgrade is required. Most DNOs also require specific notification when an EV charger is installed, separate from the Building Regulations notification. The assessment should be done before ordering the charger so that any supply upgrade timeline can be factored into the project.',
        },
        {
          question: 'What happens if the maximum demand exceeds the supply?',
          answer:
            'If the assessed maximum demand exceeds the available supply capacity, you have three options. First, load management: install a system (typically CT clamp based) that monitors total demand and reduces non-essential loads (such as EV charging) when demand is high. This avoids a supply upgrade but limits the charging rate. Second, supply upgrade: contact the DNO to upgrade the service fuse and, if necessary, the service cable. A fuse upgrade from 60 A to 80 A or 100 A is often straightforward if the existing cable is adequate. Third, three-phase conversion: for very high demands, a three-phase supply provides three times the single-phase capacity. This is expensive and involves significant works by the DNO.',
        },
        {
          question: 'How do diversity factors work in BS 7671?',
          answer:
            'Diversity factors in BS 7671 Appendix A, Table A1 reduce the contribution of each load category to the total maximum demand to reflect realistic usage patterns. For example, the first 10 A of cooking appliance load is taken at 100%, but the remaining load is taken at only 30%, because a cooker rarely operates with all rings, both ovens, and the grill running simultaneously at maximum. For socket outlets, the current demand of the first ring circuit is taken at 100%, and additional circuits at 40%, because most socket outlets are lightly loaded most of the time. These are standard factors for domestic premises; commercial and industrial installations may require different diversity assumptions based on the specific use case.',
        },
        {
          question: 'When should I notify the DNO about a load change?',
          answer:
            'You should notify the DNO before making any significant change to the electrical demand of a property. Specifically: when installing an EV charger (most DNOs have a dedicated notification portal), when installing a heat pump, when the assessed maximum demand exceeds or is likely to exceed the service fuse rating, when installing solar PV or battery storage that exports to the grid, when applying for a new supply connection, and when requesting a fuse upgrade or three-phase conversion. Notification is a legal requirement under ESQCR 2002 Regulation 22. Failure to notify can result in the DNO refusing supply, the service fuse blowing repeatedly, or liability issues if the supply infrastructure is damaged by overloading.',
        },
        {
          question: 'How much does a supply upgrade cost?',
          answer:
            'Supply upgrade costs vary significantly depending on what is needed. A simple fuse upgrade (e.g., 60 A to 100 A) where the existing service cable is adequate may be free or cost a small fee (some DNOs charge £100-£300). If the service cable needs replacing, the cost is typically £500-£2,000 depending on the length and route. A single-phase to three-phase conversion is the most expensive option, ranging from £2,000 to £10,000+ depending on the distance from the nearest three-phase supply point (usually the local transformer). These are DNO charges; you will also need to budget for your own work upgrading the meter tails, consumer unit, and internal wiring. Always get a quote from the DNO before committing to the project so the customer knows the full cost.',
        },
        {
          question: 'Can Elec-Mate calculate maximum demand for me?',
          answer:
            'Yes. Elec-Mate includes a Max Demand Calculator that applies BS 7671 Appendix A, Table A1 diversity factors automatically. You enter the loads (lighting, sockets, cooker, shower, EV charger, heat pump, etc.) and the calculator produces the assessed maximum demand in amps. It compares this against the existing supply capacity and flags when the demand approaches or exceeds the threshold, prompting you to contact the DNO. The calculator is designed for speed on site — enter the loads from the consumer unit schedule and the existing supply details, and get an answer in under a minute.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/max-demand-calculator',
          title: 'Max Demand Calculator',
          description:
            'Calculate maximum demand with BS 7671 diversity factors applied automatically.',
          icon: Calculator,
          category: 'Calculator',
        },
        {
          href: '/tools/diversity-factor-calculator',
          title: 'Diversity Factor Calculator',
          description: 'Apply BS 7671 Table A1 diversity factors to any load configuration.',
          icon: BarChart3,
          category: 'Calculator',
        },
        {
          href: '/tools/cable-sizing-calculator',
          title: 'Cable Sizing Calculator',
          description:
            'Size cables correctly for current capacity, voltage drop, and fault current.',
          icon: Zap,
          category: 'Calculator',
        },
        {
          href: '/guides/ev-charger-installation',
          title: 'EV Charger Installation',
          description:
            'Complete guide to installing EV chargers including supply assessment and notification.',
          icon: Car,
          category: 'Guide',
        },
        {
          href: '/guides/bs7671-18th-edition',
          title: 'BS 7671 18th Edition',
          description: 'The national standard for electrical installations and its requirements.',
          icon: Scale,
          category: 'Guide',
        },
        {
          href: '/tools/three-phase-power-calculator',
          title: 'Three-Phase Power Calculator',
          description:
            'Calculate three-phase power, current, and load balancing for commercial installations.',
          icon: TrendingUp,
          category: 'Calculator',
        },
      ]}
      ctaHeading="Calculate Maximum Demand in Under a Minute"
      ctaSubheading="BS 7671 diversity factors applied automatically, instant supply adequacy check, and DNO notification triggers flagged. Join 430+ UK electricians using Elec-Mate for fast, accurate load assessments. 7-day free trial."
    />
  );
}
