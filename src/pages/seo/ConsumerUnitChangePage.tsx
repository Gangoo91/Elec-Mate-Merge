import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  ShieldCheck,
  Zap,
  PoundSterling,
  ClipboardCheck,
  Calculator,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Camera,
  Clock,
  Wrench,
  BookOpen,
} from 'lucide-react';

export default function ConsumerUnitChangePage() {
  return (
    <GuideTemplate
      title="Consumer Unit Change UK 2026 | Cost, Regulations & Guide"
      description="Complete guide to changing a consumer unit in the UK. Costs from £500 to £1,200, Part P notification requirements, BS EN 61439-3 metal enclosure regulations, AFDD considerations, and what's involved step by step."
      datePublished="2025-04-20"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'Consumer Unit Change', href: '/guides/consumer-unit-change' },
      ]}
      tocItems={[
        { id: 'when-to-replace', label: 'When Does a CU Need Replacing?' },
        { id: 'regulations', label: 'Regulations & Requirements' },
        { id: 'part-p', label: 'Part P Notification' },
        { id: 'afdd', label: 'AFDD Considerations' },
        { id: 'cost', label: 'Cost of a Consumer Unit Change' },
        { id: 'whats-involved', label: "What's Involved" },
        { id: 'how-to', label: 'Step-by-Step Process' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Guide"
      badgeIcon={Wrench}
      heroTitle={
        <>
          Consumer Unit Change UK
          <br />
          <span className="text-yellow-400">Cost, Regulations & Complete Guide</span>
        </>
      }
      heroSubtitle="Replacing a consumer unit is one of the most common — and most regulated — jobs in domestic electrical work. This guide covers everything: when replacement is needed, current regulations, Part P requirements, typical costs, and what the job involves from start to finish."
      readingTime={16}
      keyTakeaways={[
        'Replacing a consumer unit is notifiable work under Part P of the Building Regulations — it must be self-certified through a competent person scheme or notified to building control.',
        'All new consumer units in domestic premises must have a metal enclosure compliant with BS EN 61439-3 (Regulation 421.1.201).',
        'A full Electrical Installation Certificate (EIC) is required — a Minor Works Certificate is not appropriate for a consumer unit change.',
        'Typical cost for a like-for-like consumer unit replacement is £500 to £1,200 depending on the number of circuits, board type (RCBO vs split-load), and any additional work required.',
        'The job typically takes one day for a straightforward replacement, but can extend to two days if rewiring from the old board is needed or additional circuits are being added.',
      ]}
      sections={[
        {
          id: 'when-to-replace',
          heading: 'When Does a Consumer Unit Need Replacing?',
          content: (
            <>
              <p>
                Not every consumer unit needs replacing. A well-installed, modern unit with adequate
                protection for the circuits it serves can remain in service for decades. However,
                several conditions make replacement necessary or strongly advisable.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Old Rewirable Fuse Board</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    If the property still has a rewirable fuse board (with porcelain or Bakelite
                    fuse holders and fuse wire), it should be replaced. Rewirable fuses offer
                    limited overcurrent protection, provide no RCD protection, and the fuse wire can
                    be replaced with the wrong rating by an unqualified person. The board itself may
                    also be a plastic enclosure, which no longer meets current regulations for
                    domestic premises.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">No RCD Protection</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    If the existing consumer unit has no RCD protection at all, it does not meet the
                    current requirements of BS 7671 Regulations 411.3.3 and 411.3.4, which require
                    30 mA RCD protection for almost all circuits in a domestic installation. While
                    there is no legal requirement to upgrade an existing installation
                    retrospectively, the safety benefit of adding RCD protection is substantial — an
                    RCD can prevent fatal electric shock and reduce the risk of electrical fires.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Additional Circuits Needed</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    When new circuits are being added — for an{' '}
                    <SEOInternalLink href="/guides/ev-charger-installation">
                      EV charger
                    </SEOInternalLink>
                    , a kitchen extension, a garden office, or additional sockets — and the existing
                    consumer unit has no spare ways, a replacement with a larger board is necessary.
                    This is often combined with upgrading the RCD protection architecture at the
                    same time.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Physical Damage or Overheating</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Scorch marks, melted plastic, loose connections producing heat, or physical
                    damage to the enclosure all require immediate replacement. These conditions
                    indicate that the board has been subjected to fault conditions or has
                    deteriorated to the point where it presents a fire risk. An electrician
                    discovering these conditions during an{' '}
                    <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> would
                    typically classify them as C1 (Danger Present) or C2 (Potentially Dangerous).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Plastic Enclosure (Pre-2016 Board)
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Consumer units installed before January 2016 may have plastic enclosures. While
                    there is no requirement to replace them solely because of the enclosure
                    material, if the board is being replaced for any reason, the new unit must have
                    a metal enclosure compliant with BS EN 61439-3. Many electricians recommend
                    replacing older plastic boards proactively, particularly where they are mounted
                    on combustible surfaces.
                  </p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'regulations',
          heading: 'Current Regulations for Consumer Unit Changes',
          content: (
            <>
              <p>
                A consumer unit change in 2026 must comply with BS 7671:2018+A3:2024 — the 18th
                Edition of the IET Wiring Regulations with Amendment 3. The key regulatory
                requirements are:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Key Regulatory Requirements</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Metal enclosure (Regulation 421.1.201)
                      </strong>{' '}
                      — The consumer unit must comply with BS EN 61439-3 and be manufactured from
                      non-combustible material. In practice, this means a steel enclosure.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        30 mA RCD protection (Regulations 411.3.3 and 411.3.4)
                      </strong>{' '}
                      — Almost all circuits require 30 mA RCD protection. This is typically achieved
                      with individual RCBOs or a split-load arrangement with dual RCDs.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Type A RCDs minimum (Regulation 531.3.3)
                      </strong>{' '}
                      — RCDs must be at least Type A for circuits supplying equipment likely to
                      produce pulsating DC fault currents. In practice, this covers most domestic
                      circuits.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">SPD provision (Section 443)</strong> — A
                      risk assessment for surge protection is required. In most domestic
                      installations, a Type 2 SPD should be fitted within or adjacent to the
                      consumer unit.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Bidirectional devices (Regulation 530.3.201)
                      </strong>{' '}
                      — Introduced by Amendment 3 (A3:2024). Where the installation includes battery
                      storage, solar PV with battery backup, or V2G EV chargers, protective devices
                      must be suitable for bidirectional fault current flow.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Circuit labelling (Regulation 514.9.1)
                      </strong>{' '}
                      — Every circuit must be identified with a durable label at the consumer unit.
                      Labels must be accurate, legible, and identify the circuit purpose.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                For full details on the regulatory framework, see the{' '}
                <SEOInternalLink href="/guides/consumer-unit-regulations">
                  Consumer Unit Regulations
                </SEOInternalLink>{' '}
                guide.
              </p>
              <SEOAppBridge
                title="BS 7671 Compliance Built Into Every Certificate"
                description="Elec-Mate's EIC form is structured around BS 7671:2018+A3:2024 requirements. Every test result is validated against the correct limits, and the design section covers RCD selection, SPD provision, and all mandatory checklist items."
                icon={ShieldCheck}
              />
            </>
          ),
        },
        {
          id: 'part-p',
          heading: 'Part P Building Regulations Notification',
          content: (
            <>
              <p>
                Replacing a consumer unit is{' '}
                <strong className="text-white">always notifiable</strong> under Part P of the
                Building Regulations (England and Wales). This applies regardless of whether it is a
                like-for-like replacement, an upgrade, or part of a larger project. There are no
                exceptions — even if the old board is being replaced with an identical unit, the
                work is notifiable.
              </p>
              <p>There are two routes to compliance with Part P:</p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">
                    Route 1: Competent Person Scheme
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    The electrician is registered with an approved competent person scheme — NICEIC,
                    NAPIT, ELECSA, BRE, or equivalent. The electrician self-certifies the work and
                    notifies building control through the scheme. This is the most common route and
                    avoids the need for a separate building control inspection. The scheme provider
                    issues a building regulations compliance certificate to the homeowner.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">
                    Route 2: Building Control Notification
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    If the electrician is not registered with a competent person scheme, the work
                    must be notified to the local authority building control department{' '}
                    <strong className="text-white">before</strong> the work begins. A building
                    control officer will inspect the completed work and issue a completion
                    certificate. This route is more expensive (building control fees typically
                    £200-£400) and takes longer.
                  </p>
                </div>
              </div>
              <p>
                A full{' '}
                <SEOInternalLink href="/guides/eic-certificate">
                  Electrical Installation Certificate (EIC)
                </SEOInternalLink>{' '}
                is required for a consumer unit replacement. A Minor Works Certificate is{' '}
                <strong className="text-white">not</strong> appropriate — the work involves the
                replacement of a distribution board, which is defined as requiring a full EIC in BS
                7671. The EIC must include the design, construction, and inspection and testing
                sections, together with a complete schedule of test results for every circuit.
              </p>
            </>
          ),
        },
        {
          id: 'afdd',
          heading: 'Arc Fault Detection Devices (AFDDs)',
          content: (
            <>
              <p>
                Arc Fault Detection Devices (AFDDs) are an additional layer of protection that
                detect dangerous electrical arcing — sparks caused by damaged cables, loose
                connections, or deteriorated insulation that can start fires. Unlike RCDs (which
                detect earth leakage) and MCBs (which detect overcurrent), AFDDs use electronic
                monitoring to identify the characteristic waveform signatures of series and parallel
                arcs.
              </p>
              <p>
                BS 7671 Regulation 421.1.7 recommends that AFDDs to BS EN 62606 are considered for
                circuits in the following locations: premises with sleeping accommodation (houses,
                flats, care homes, hotels), locations with a risk of fire due to the nature of
                processed or stored materials, locations with combustible constructional materials
                (timber-framed buildings), fire-propagating structures, and locations with risks to
                irreplaceable goods (museums, galleries).
              </p>
              <p>
                The regulation uses the word "recommended" rather than "required," which means AFDDs
                are not currently mandatory in the UK. However, the direction of travel is clear —
                Amendment 4 to BS 7671 (expected 2026) may strengthen this recommendation. Many
                forward-thinking electricians are already fitting AFDDs on high-risk circuits,
                particularly in bedrooms and HMOs. The cost of an AFDD RCBO is typically £80-£120
                per circuit compared to £30-£50 for a standard RCBO.
              </p>
              <p>
                When specifying a consumer unit for a replacement, it is worth discussing AFDD
                provision with the customer. If the consumer unit has enough ways, AFDDs can be
                added to bedroom circuits and any circuits in locations with higher fire risk
                without replacing the entire board later.
              </p>
            </>
          ),
        },
        {
          id: 'cost',
          heading: 'How Much Does a Consumer Unit Change Cost in 2026?',
          content: (
            <>
              <p>
                The cost of a consumer unit change depends on several factors: the size of the
                board, the type of protection (RCBO vs split-load), the condition of the existing
                wiring, and whether any additional work is needed.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Typical UK Costs (2026)</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">Basic split-load replacement</h4>
                      <p className="text-white text-sm">6-8 ways, dual RCD, standard circuits</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">£500 - £700</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                    <div>
                      <h4 className="font-bold text-white">Full RCBO board</h4>
                      <p className="text-white text-sm">10-14 ways, individual RCBOs, SPD</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">£700 - £1,000</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">RCBO board with AFDDs</h4>
                      <p className="text-white text-sm">12-16 ways, AFDDs on bedroom circuits</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">£900 - £1,200</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">Additional work</h4>
                      <p className="text-white text-sm">
                        New tails, meter tails upgrade, earth rod
                      </p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">£100 - £300 extra</span>
                  </div>
                </div>
              </div>
              <p>
                These prices include the consumer unit, all protective devices, labour, testing, the
                EIC, and Part P notification through a competent person scheme. VAT is typically
                included for domestic work. Prices vary by region — London and the South East tend
                to be at the higher end, while the North and Midlands are typically lower.
              </p>
              <SEOAppBridge
                title="Price Jobs Accurately with AI Cost Engineer"
                description="Elec-Mate's AI Cost Engineer prices consumer unit changes based on your specific specification — board type, number of ways, RCBO vs split-load, SPD, AFDDs, and any additional work. Get an accurate quote in seconds, backed by real trade pricing data."
                icon={PoundSterling}
              />
            </>
          ),
        },
        {
          id: 'whats-involved',
          heading: 'What Is Involved in a Consumer Unit Change?',
          content: (
            <>
              <p>
                A straightforward consumer unit replacement typically takes one day for a competent
                electrician. The process involves isolating the supply, removing the old board,
                installing the new board, reconnecting all circuits, testing every circuit, and
                producing the EIC. Here is what happens at each stage:
              </p>
              <div className="space-y-3 mt-4">
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Survey and Assessment</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Before the day of the change, the electrician should survey the existing
                      installation. This includes noting the number of circuits, identifying the
                      cable sizes and types, checking the condition of the meter tails and earthing,
                      and assessing whether any circuits need modification. This is also when the
                      new board is specified and ordered.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Isolation and Old Board Removal</h4>
                    <p className="text-white text-sm leading-relaxed">
                      On the day, the supply is isolated at the main fuse (by the DNO if a sealed
                      cut-out is involved, or by the electrician if an isolator is available). The
                      old board is disconnected — each circuit is carefully labelled and recorded
                      before disconnection. The old board is then removed from the wall.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">New Board Installation</h4>
                    <p className="text-white text-sm leading-relaxed">
                      The new consumer unit is mounted and the meter tails connected. Each circuit
                      is reconnected to its designated protective device (RCBO or MCB), following
                      the design for the new board layout. The SPD is installed and connected. Earth
                      and bonding connections are made up.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    4
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Testing Every Circuit</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Once all circuits are connected and the supply is restored, every circuit must
                      be tested. The full{' '}
                      <SEOInternalLink href="/guides/testing-sequence">
                        testing sequence
                      </SEOInternalLink>{' '}
                      includes continuity of protective conductors (R1+R2), insulation resistance,
                      polarity, earth fault loop impedance (Zs), prospective fault current (Ipf),
                      and RCD testing on every RCD/RCBO.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    5
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Certification and Handover</h4>
                    <p className="text-white text-sm leading-relaxed">
                      The electrician completes and issues the Electrical Installation Certificate
                      (EIC) with all test results. The circuit chart is printed and fixed inside the
                      consumer unit door. The Part P notification is submitted through the competent
                      person scheme. The homeowner receives copies of the EIC and the building
                      regulations compliance certificate.
                    </p>
                  </div>
                </div>
              </div>
              <SEOAppBridge
                title="Board Scanner — Photograph the Old Board"
                description="Elec-Mate's Board Scanner photographs the existing consumer unit and uses AI to extract all circuit data — circuit numbers, MCB ratings, RCD types, and circuit descriptions. This saves time during the survey and creates a digital record before the old board is removed."
                icon={Camera}
              />
            </>
          ),
        },
      ]}
      howToHeading="How to Change a Consumer Unit — Step-by-Step Process"
      howToSteps={[
        {
          name: 'Survey the existing installation',
          text: 'Record all existing circuits, cable types, cable sizes, and the condition of the meter tails and earthing. Check the DNO cut-out and confirm whether a temporary disconnection is needed. Photograph the existing board for reference. Specify the new consumer unit based on the number of circuits, RCD architecture (RCBO or split-load), and any additional requirements (SPD, AFDD, spare ways for future circuits).',
        },
        {
          name: 'Isolate the supply',
          text: 'Isolate at the main switch and, if necessary, pull the DNO fuse or arrange a temporary disconnection. Carry out safe isolation procedure — prove-test-prove using a GS38-compliant voltage indicator. Lock off and apply warning labels. Inform the occupants that the supply will be off for the duration of the changeover.',
        },
        {
          name: 'Remove the old board and install the new one',
          text: 'Disconnect all circuits from the old board, labelling each cable clearly. Remove the old board. Mount the new metal consumer unit. Connect the meter tails (typically 25mm² for 100A supply). Install the main switch, SPD, and all RCBOs or MCBs. Reconnect each circuit to its designated protective device following the design layout.',
        },
        {
          name: 'Test every circuit',
          text: 'Restore the supply and carry out the full testing sequence on every circuit: continuity of protective conductors (R1+R2), insulation resistance at 500V DC, polarity verification, earth fault loop impedance (Zs), prospective fault current (PSCC and PEFC), and RCD operating time for every RCBO. Record all results in the schedule of test results.',
        },
        {
          name: 'Complete the EIC and Part P notification',
          text: 'Complete the Electrical Installation Certificate with all design, construction, and test data. Apply the circuit chart inside the consumer unit door. Submit the Part P notification through your competent person scheme. Issue copies of the EIC to the homeowner and retain your own copy for at least six years.',
        },
      ]}
      faqs={[
        {
          question: 'How long does a consumer unit change take?',
          answer:
            'A straightforward like-for-like consumer unit replacement typically takes one full day — approximately 6 to 8 hours. This includes removing the old board, installing the new one, reconnecting all circuits, carrying out the full testing sequence, and completing the Electrical Installation Certificate. More complex jobs — for example, where additional circuits are being added, the meter tails need upgrading, an earth rod is being installed, or the existing wiring needs modification — can take a day and a half to two days. The property will be without electricity for most of the day during the changeover, so homeowners should plan accordingly.',
        },
        {
          question: 'Do I need a new consumer unit if I have a plastic one?',
          answer:
            'There is no legal requirement to replace an existing plastic consumer unit solely because of its enclosure material. If the plastic unit was installed when it was compliant (before the metal enclosure regulation came into force in January 2016), it can remain in service. However, if the consumer unit is being replaced for any reason — damage, additional circuits, upgrading protection, or as part of a rewire — the new unit must have a metal enclosure compliant with BS EN 61439-3. Many electricians recommend proactive replacement of plastic boards, particularly where they are mounted on combustible surfaces such as timber, as the fire safety benefit is significant.',
        },
        {
          question: 'Can I change a consumer unit myself?',
          answer:
            'Legally, there is no law preventing a homeowner from carrying out their own electrical work. However, a consumer unit replacement is notifiable under Part P of the Building Regulations, which means it must be either self-certified by a registered electrician or inspected by building control. A homeowner who is not registered with a competent person scheme would need to notify building control before starting the work and pay for an inspection (typically £200-£400). The work must also comply with BS 7671, which requires competence in design, installation, and testing. In practice, the testing alone requires a calibrated multifunction test instrument (£500+) and the knowledge to interpret the results correctly. For these reasons, it is strongly recommended to use a qualified, registered electrician.',
        },
        {
          question: 'Should I choose RCBOs or a split-load board?',
          answer:
            'For most domestic installations in 2026, a full RCBO board is the recommended choice. Each circuit has its own individual RCBO, providing independent overcurrent and earth fault protection. This means a fault on one circuit trips only that circuit — every other circuit stays live. On a split-load board with dual RCDs, a fault on any circuit trips the RCD for that entire group, disconnecting half the circuits in the house. The cost difference is typically £60-£150 (the price of individual RCBOs versus two RCDs plus MCBs), which is easily justified by the improved discrimination and reduced nuisance tripping. The time saved in avoiding call-backs for nuisance tripping often pays for the difference on the first job.',
        },
        {
          question: 'What certificate do I get after a consumer unit change?',
          answer:
            'You should receive a full Electrical Installation Certificate (EIC) — not a Minor Works Certificate. The EIC has three sections: Design (confirming the new consumer unit design complies with BS 7671), Construction (confirming the installation work has been carried out correctly), and Inspection and Testing (with a complete schedule of test results for every circuit). The EIC must be signed by the designer, installer, and inspector — on many domestic jobs, the same electrician fills all three roles. You should also receive a Building Regulations Compliance Certificate from the competent person scheme (or from building control if the Route 2 notification was used). Keep both certificates safe — they are needed when selling the property.',
        },
        {
          question: 'Do I need an SPD (surge protection device) when changing the consumer unit?',
          answer:
            'BS 7671 Regulation 443.4.1 requires a risk assessment for surge protection. In most modern domestic installations, the risk assessment will conclude that an SPD should be fitted — particularly if the property contains valuable electronic equipment, has a lightning protection system, or is supplied by an overhead line. A Type 2 SPD suitable for domestic use costs between £30 and £60 and fits within the consumer unit. The cost of fitting one during a consumer unit change is minimal compared to the potential damage from a voltage surge. While not technically mandatory in all cases, fitting an SPD during a consumer unit change is now considered good practice by most electricians and competent person schemes.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/consumer-unit-regulations',
          title: 'Consumer Unit Regulations',
          description: 'Full guide to BS 7671 and BS EN 61439-3 regulatory requirements.',
          icon: BookOpen,
          category: 'Regulations',
        },
        {
          href: '/guides/part-p-building-regulations',
          title: 'Part P Building Regulations',
          description: 'What work is notifiable and how to comply.',
          icon: ShieldCheck,
          category: 'Regulations',
        },
        {
          href: '/guides/eic-certificate',
          title: 'EIC Certificate',
          description: 'How to complete an Electrical Installation Certificate.',
          icon: FileText,
          category: 'Certification',
        },
        {
          href: '/calculators/cable-sizing',
          title: 'Cable Sizing Calculator',
          description: 'Calculate correct cable sizes for every circuit.',
          icon: Calculator,
          category: 'Calculator',
        },
        {
          href: '/guides/testing-sequence',
          title: 'Testing Sequence Guide',
          description: 'The correct order of tests for initial verification.',
          icon: ClipboardCheck,
          category: 'Testing',
        },
        {
          href: '/guides/eicr-certificate',
          title: 'EICR Certificate',
          description: 'Condition reports for existing installations.',
          icon: FileText,
          category: 'Certification',
        },
      ]}
      ctaHeading="Certify Consumer Unit Changes on Your Phone"
      ctaSubheading="EIC forms, test result validation, Board Scanner, and Part P notification — all built into Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
