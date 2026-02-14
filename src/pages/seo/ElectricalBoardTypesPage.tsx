import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Layers,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calculator,
  BookOpen,
  Brain,
  Cable,
  Zap,
  Flame,
  ClipboardCheck,
} from 'lucide-react';

export default function ElectricalBoardTypesPage() {
  return (
    <GuideTemplate
      title="Consumer Unit Types | Split Load, Dual RCD & RCBO Boards"
      description="Complete guide to consumer unit types used in UK domestic and commercial electrical installations. Split load boards, dual RCD boards, high integrity boards, all-RCBO boards, main switch only boards — pros, cons, cost comparison, and which to specify for each job type."
      datePublished="2025-06-01"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'Consumer Unit Types', href: '/guides/consumer-unit-types' },
      ]}
      tocItems={[
        { id: 'overview', label: 'Consumer Unit Types Overview' },
        { id: 'split-load', label: 'Split Load Boards' },
        { id: 'dual-rcd', label: 'Dual RCD Boards' },
        { id: 'high-integrity', label: 'High Integrity Boards' },
        { id: 'all-rcbo', label: 'All-RCBO Boards' },
        { id: 'main-switch-only', label: 'Main Switch Only Boards' },
        { id: 'choosing', label: 'Choosing the Right Board' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Installation Guide"
      badgeIcon={Layers}
      heroTitle={
        <>
          Consumer Unit Types
          <br />
          <span className="text-yellow-400">Split Load, Dual RCD & RCBO Boards</span>
        </>
      }
      heroSubtitle="Understanding the different types of consumer unit is essential for every UK electrician. This guide covers split load boards, dual RCD boards, high integrity boards, all-RCBO boards, and main switch only boards — with detailed pros, cons, and guidance on which type to specify for each installation."
      readingTime={12}
      keyTakeaways={[
        'All-RCBO boards provide the best discrimination and eliminate nuisance tripping caused by cumulative earth leakage — a fault on one circuit trips only that circuit, keeping all other circuits live.',
        'Dual RCD split load boards are the most cost-effective option but suffer from poor discrimination — a single earth fault trips half the installation, and cumulative leakage can cause nuisance tripping.',
        'High integrity boards add a third RCD to protect critical circuits (freezer, alarm, lighting) that must remain live even when other circuits trip.',
        'Main switch only boards are used where all circuits are protected by individual RCBOs — no RCDs are needed in the board because each RCBO provides its own residual current protection.',
        'Elec-Mate includes consumer unit design tools, circuit schedule generators, and AI guidance to help specify the right board type for every job.',
      ]}
      sections={[
        {
          id: 'overview',
          heading: 'Consumer Unit Types Overview',
          content: (
            <>
              <p>
                The consumer unit (CU) is the heart of every domestic electrical installation. It
                houses the main switch, the protective devices for each circuit, and increasingly,
                surge protection devices. The type of consumer unit you specify determines how
                circuits are grouped, how RCD protection is provided, and how the installation
                behaves when a fault occurs.
              </p>
              <p>
                Under{' '}
                <SEOInternalLink href="/guides/consumer-unit-regulations">
                  current BS 7671 regulations
                </SEOInternalLink>
                , all consumer units in domestic premises must have metal enclosures (Regulation
                421.1.201), and almost every circuit requires 30 mA RCD protection (Regulation
                411.3.4). The question is not whether to provide RCD protection, but how to arrange
                it — and that decision depends on the type of consumer unit you choose.
              </p>
              <p>
                There are five main types of consumer unit available in the UK market. Each has
                distinct advantages and limitations, and understanding the differences is essential
                for specifying the right board for each job. The choice affects cost,
                discrimination, reliability, and the client experience when a fault occurs.
              </p>
            </>
          ),
        },
        {
          id: 'split-load',
          heading: 'Split Load Consumer Units',
          content: (
            <>
              <p>
                A split load consumer unit uses a single RCD to protect a group of circuits, with
                the remaining circuits connected directly to the main switch without RCD protection.
                This was the standard arrangement for many years but has become less common as BS
                7671 has expanded the requirement for RCD protection to cover almost every circuit.
              </p>
              <p>
                In a typical split load board, the main switch feeds one side directly (the non-RCD
                side) and the other side through a single 63A or 80A, 30 mA RCD. Circuits that do
                not require RCD protection — such as fire alarm supplies and emergency lighting —
                are connected to the non-RCD side. All other circuits are connected to the
                RCD-protected side.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">
                  Split Load Board — Key Characteristics
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Lowest cost</strong> — Only one RCD plus
                      MCBs, making it the cheapest option for consumer unit materials.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Very poor discrimination</strong> — A fault on
                      any RCD-protected circuit trips the single RCD, disconnecting every circuit on
                      that side. This could mean losing all socket outlets and most lighting
                      simultaneously.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">High cumulative leakage risk</strong> — All
                      RCD-protected circuits share one RCD. The standing earth leakage from every
                      appliance, electronic device, and LED driver accumulates, increasing the risk
                      of nuisance tripping.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Limited compliance</strong> — With BS 7671 now
                      requiring RCD protection for almost all circuits, very few circuits can
                      legally be connected to the non-RCD side, reducing the practical benefit of
                      the split load arrangement.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Split load boards are rarely specified for new installations today. The poor
                discrimination and the near-universal requirement for RCD protection make them
                impractical for most modern domestic work. However, you may encounter them during{' '}
                <SEOInternalLink href="/guides/eicr-certificate">
                  periodic inspections
                </SEOInternalLink>{' '}
                on existing installations.
              </p>
            </>
          ),
        },
        {
          id: 'dual-rcd',
          heading: 'Dual RCD Consumer Units',
          content: (
            <>
              <p>
                The dual RCD board has been the most common type of domestic consumer unit for the
                past decade. It uses two RCDs (typically 63A or 80A, 30 mA) to protect two groups of
                circuits, with a main switch providing isolation for the entire installation.
                Non-RCD circuits (fire alarm, emergency lighting) are connected to the main switch
                side.
              </p>
              <p>
                Circuits are distributed between the two RCDs to balance the load and provide some
                degree of discrimination. The general practice is to ensure that critical services
                are split between the two RCDs — for example, upstairs lighting on one RCD and
                downstairs lighting on the other — so that a single RCD trip does not cause a
                complete loss of lighting.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">Advantages</h3>
                  <ul className="space-y-3 text-white text-sm leading-relaxed">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-yellow-400">Cost-effective</strong> — Two RCDs plus
                        MCBs cost significantly less than individual RCBOs for every circuit.
                        Typically 60 to 100 pounds cheaper than an all-RCBO board.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-yellow-400">Better than split load</strong> — A
                        fault only trips half the circuits rather than all RCD-protected circuits.
                        Some services remain available during a fault.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-yellow-400">Widely available</strong> — Every
                        consumer unit manufacturer offers dual RCD boards in various sizes.
                        Replacement parts and additional MCBs are easy to source.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">Disadvantages</h3>
                  <ul className="space-y-3 text-white text-sm leading-relaxed">
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Poor discrimination</strong> — A fault on any
                        circuit trips the entire RCD group, disconnecting 4 to 6 circuits
                        simultaneously. Loss of half the installation is a common complaint.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Cumulative leakage</strong> — Standing earth
                        leakage from all circuits on one RCD side adds up. Modern homes with many
                        electronic devices can easily exceed the 10 mA threshold for reliable RCD
                        operation.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Difficult fault diagnosis</strong> — When an
                        RCD trips, you must isolate circuits one by one to find the faulty circuit.
                        This is time-consuming and frustrating for the householder.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <p>
                Dual RCD boards remain popular for budget-conscious domestic installations, but the
                trend is firmly towards all-RCBO boards for new work. The cost difference has
                narrowed significantly, and the practical benefits of individual circuit protection
                increasingly outweigh the material savings.
              </p>
              <SEOInternalLink href="/guides/rcbo-vs-rcd-mcb">
                See our RCBO vs RCD+MCB comparison guide
              </SEOInternalLink>{' '}
              for a detailed cost and performance comparison.
            </>
          ),
        },
        {
          id: 'high-integrity',
          heading: 'High Integrity Consumer Units',
          content: (
            <>
              <p>
                A high integrity consumer unit builds on the dual RCD design by adding a third RCD
                to protect critical circuits that should not be affected by faults on other
                circuits. The typical arrangement uses three RCDs: two protecting the main circuit
                groups, and a third protecting circuits such as the freezer, burglar alarm, smoke
                detection, and external lighting.
              </p>
              <p>
                The concept behind high integrity boards is that certain circuits are more important
                to keep live during a fault condition. A freezer full of food can suffer hundreds of
                pounds of damage if disconnected for several hours. A burglar alarm that loses power
                is no longer protecting the property. By placing these circuits on a dedicated RCD
                with no other circuits to cause a trip, the risk of nuisance disconnection is
                virtually eliminated for those critical services.
              </p>
              <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6 my-6">
                <h3 className="font-bold text-yellow-400 text-lg mb-3">
                  Typical High Integrity Board Layout
                </h3>
                <div className="space-y-4 text-white text-sm leading-relaxed">
                  <p>
                    <strong className="text-yellow-400">Main Switch Side (non-RCD):</strong> Fire
                    alarm, emergency lighting, smoke detection interconnect — circuits where RCD
                    protection could compromise safety.
                  </p>
                  <p>
                    <strong className="text-yellow-400">RCD 1 (Group A):</strong> Downstairs
                    sockets, kitchen ring, cooker, downstairs lighting — general domestic circuits.
                  </p>
                  <p>
                    <strong className="text-yellow-400">RCD 2 (Group B):</strong> Upstairs sockets,
                    upstairs lighting, bathroom, immersion heater — second group of domestic
                    circuits.
                  </p>
                  <p>
                    <strong className="text-yellow-400">RCD 3 (Critical):</strong> Freezer, burglar
                    alarm, external lighting, garage supply — circuits that must remain live when
                    other groups trip.
                  </p>
                </div>
              </div>
              <p>
                High integrity boards cost more than standard dual RCD boards (typically 20 to 40
                pounds more for the board itself, plus the cost of the additional RCD) but less than
                a full RCBO board. They offer a good compromise between cost and discrimination for
                installations where budget is a factor but the client has critical circuits that
                must not be interrupted.
              </p>
              <p>
                However, the circuits within each RCD group still suffer from the same poor
                discrimination as a standard dual RCD board — a fault on the kitchen ring will still
                trip all of RCD Group A. For this reason, many electricians now prefer to go
                straight to an all-RCBO board rather than use a high integrity arrangement.
              </p>
            </>
          ),
        },
        {
          id: 'all-rcbo',
          heading: 'All-RCBO Consumer Units',
          content: (
            <>
              <p>
                An all-RCBO consumer unit provides individual RCD and overcurrent protection for
                every circuit using individual RCBO devices. There are no group RCDs in the board —
                the main switch provides isolation only, and each circuit has its own dedicated RCBO
                combining 30 mA RCD protection with MCB overcurrent protection.
              </p>
              <p>
                This design provides the best possible discrimination. When a fault occurs on any
                circuit, only that single circuit is disconnected. Every other circuit in the
                installation remains fully operational. The householder experiences minimal
                disruption, and the electrician can immediately identify which circuit has the fault
                simply by looking at which RCBO has tripped.
              </p>
              <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6 my-6">
                <h3 className="font-bold text-yellow-400 text-lg mb-4">
                  Why All-RCBO Boards Are the Professional Choice
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Perfect discrimination</strong> — A fault
                      on any circuit trips only that circuit. The cooker circuit tripping does not
                      take out the lighting. A faulty appliance does not disconnect the freezer.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">No cumulative leakage</strong> — Each RCBO
                      monitors only its own circuit. Standing earth leakage from other circuits has
                      zero effect. This virtually eliminates nuisance tripping.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Instant fault identification</strong> —
                      The tripped RCBO immediately tells you which circuit has the fault. No need to
                      isolate circuits one by one.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Fewer call-backs</strong> — The time saved
                      in nuisance tripping call-backs often pays for the additional cost of RCBOs
                      within the first year of installation.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Future-proof</strong> — Adding circuits is
                      straightforward. No need to worry about balancing loads across RCD groups or
                      exceeding cumulative leakage thresholds.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                The main disadvantage of all-RCBO boards is cost. Individual RCBOs are more
                expensive than MCBs — typically 25 to 50 pounds per RCBO compared to 5 to 10 pounds
                per MCB. For a 10-way board, this adds approximately 150 to 400 pounds to the
                material cost compared to a dual RCD board. However, this cost difference has been
                steadily decreasing, and the practical benefits make all-RCBO boards the preferred
                choice for most professional electricians.
              </p>
              <SEOAppBridge
                title="Design Consumer Units with AI Assistance"
                description="Elec-Mate's AI circuit designer helps you specify the right consumer unit type, select appropriate RCBOs for each circuit, and generate a complete circuit schedule with cable sizes, protection devices, and Zs values — all compliant with BS 7671:2018+A3:2024."
                icon={Brain}
              />
            </>
          ),
        },
        {
          id: 'main-switch-only',
          heading: 'Main Switch Only Consumer Units',
          content: (
            <>
              <p>
                A main switch only consumer unit contains just the main isolating switch and the
                bus-bars for connecting individual protective devices. There are no RCDs built into
                the board — all RCD protection is provided by individual RCBOs fitted into the
                available ways.
              </p>
              <p>
                This type of board is essentially the chassis for an all-RCBO installation. It
                provides maximum flexibility because every way can accept any RCBO from the
                manufacturer range, and there are no RCD groups to manage. The electrician simply
                selects the appropriate RCBO (type, rating, and sensitivity) for each circuit and
                fits it to the board.
              </p>
              <p>
                Main switch only boards are also used where external RCDs are required — for
                example, where time-delayed RCDs are used for discrimination in sub-distribution
                boards, or where specific RCD types (Type B for EV chargers, Type F for
                inverter-driven equipment) are needed on individual circuits.
              </p>
              <p>
                Many manufacturers now supply their standard domestic consumer unit range in both
                dual RCD and main switch only configurations, giving electricians the choice of RCD
                architecture for the same physical enclosure. When ordering, ensure you specify the
                correct variant — a dual RCD board cannot easily be converted to a main switch only
                board, and vice versa.
              </p>
              <SEOInternalLink href="/guides/consumer-unit-regulations">
                See our consumer unit regulations guide
              </SEOInternalLink>{' '}
              for the full regulatory requirements for consumer unit design and installation.
            </>
          ),
        },
        {
          id: 'choosing',
          heading: 'Choosing the Right Board Type',
          content: (
            <>
              <p>
                The choice of consumer unit type depends on several factors: budget, the number of
                circuits, the client's expectations, the type of premises, and the specific
                requirements of the installation.
              </p>
              <div className="space-y-4 my-6">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">
                        New domestic installations and rewires
                      </h3>
                      <p className="text-white text-sm leading-relaxed">
                        All-RCBO board is the recommended choice. The superior discrimination,
                        elimination of nuisance tripping, and ease of fault diagnosis justify the
                        additional material cost. Most professional electricians now specify
                        all-RCBO boards as standard for new work.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">
                        Budget-conscious consumer unit replacements
                      </h3>
                      <p className="text-white text-sm leading-relaxed">
                        A dual RCD board remains acceptable under BS 7671 and costs less. However,
                        explain the disadvantages to the client and offer the all-RCBO upgrade as an
                        option. Many clients choose the upgrade once they understand the benefits.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">
                        Installations with EV chargers or solar PV
                      </h3>
                      <p className="text-white text-sm leading-relaxed">
                        Main switch only board with individual RCBOs, including Type B or Type F
                        RCBOs where required. EV charger circuits may need Type B RCDs (for DC fault
                        detection), which are only available as individual devices, not as group
                        RCDs in standard consumer units.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">
                        Commercial and industrial distribution boards
                      </h3>
                      <p className="text-white text-sm leading-relaxed">
                        Three-phase distribution boards with individual RCBOs or MCBs downstream of
                        RCDs. Commercial boards follow BS EN 61439-2 rather than BS EN 61439-3 and
                        have different design considerations.{' '}
                        <SEOInternalLink href="/guides/three-phase-installation">
                          See our three-phase guide
                        </SEOInternalLink>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <SEOAppBridge
                title="Generate Circuit Schedules for Any Board Type"
                description="Elec-Mate generates complete circuit schedules with cable sizes, protection devices, Zs values, and voltage drop for all consumer unit types. Export directly to your EIC or EICR certificate. All BS 7671:2018+A3:2024 compliant."
                icon={ClipboardCheck}
              />
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What is the difference between a dual RCD board and an all-RCBO board?',
          answer:
            'A dual RCD board uses two RCDs (typically 63A or 80A, 30 mA) to protect groups of circuits, with MCBs providing overcurrent protection for individual circuits within each group. A fault on any circuit trips the RCD for that entire group, disconnecting all circuits on that side. An all-RCBO board uses individual RCBO devices for each circuit, combining RCD and MCB protection in a single device. A fault on any circuit trips only that individual RCBO, keeping all other circuits live. The all-RCBO board provides vastly superior discrimination and eliminates cumulative earth leakage issues, but costs more in materials.',
        },
        {
          question: 'How much more does an all-RCBO board cost compared to a dual RCD board?',
          answer:
            'The material cost difference depends on the number of circuits and the RCBO brand. Individual RCBOs typically cost 25 to 50 pounds each, compared to 5 to 10 pounds per MCB. For a typical 10-way domestic board, the additional material cost for RCBOs over MCBs is approximately 150 to 400 pounds. However, dual RCD boards include the cost of two RCDs (approximately 25 to 40 pounds each), so the net difference is somewhat smaller. Many electricians find that the time saved in call-backs for nuisance tripping and fault diagnosis pays for the cost difference within the first year.',
        },
        {
          question: 'What is a high integrity consumer unit?',
          answer:
            'A high integrity consumer unit uses three RCDs instead of two. The third RCD protects critical circuits that must remain live even when other circuits trip — typically the freezer, burglar alarm, smoke detection, and external lighting. The idea is that these critical circuits have their own dedicated RCD with no other circuits that could cause a nuisance trip. High integrity boards cost slightly more than standard dual RCD boards but less than all-RCBO boards. They offer a compromise between cost and discrimination, though the circuits within each RCD group still suffer from poor discrimination.',
        },
        {
          question: 'Can I use MCBs instead of RCBOs in a new consumer unit?',
          answer:
            'MCBs can be used in a consumer unit, but they must be downstream of an RCD to provide the 30 mA RCD protection required by BS 7671 for most domestic circuits. MCBs alone do not provide RCD protection and cannot comply with Regulation 411.3.4. In a dual RCD board, MCBs are used within each RCD-protected group. In a main switch only board, you would need individual RCBOs because there are no group RCDs. The only circuits that may use MCBs without RCD protection are those exempt from the RCD requirement, such as fire alarm circuits where RCD protection could compromise safety.',
        },
        {
          question: 'Do all consumer units need to be metal under BS 7671?',
          answer:
            'Yes, in domestic (household) premises. BS 7671 Regulation 421.1.201 requires that consumer units and similar switchgear assemblies in domestic premises shall have their enclosure manufactured from non-combustible material. In practice, this means metal (steel) enclosures. This applies to all new installations and consumer unit replacements. It does not require retrospective replacement of existing plastic consumer units that were compliant when installed. The requirement was introduced following investigations that identified plastic consumer unit enclosures contributing to the spread of fire by melting and dripping burning material.',
        },
        {
          question: 'Which consumer unit type does Elec-Mate recommend?',
          answer:
            'For new domestic installations and consumer unit replacements, Elec-Mate recommends all-RCBO boards as the professional standard. The superior discrimination, elimination of nuisance tripping, instant fault identification, and reduced call-backs justify the additional material cost. However, dual RCD boards remain compliant with BS 7671 and are acceptable where budget is a primary concern. The Elec-Mate AI circuit designer can help you specify the right board type for each job, generate the circuit schedule, and produce the associated certificate documentation.',
        },
        {
          question: 'What is the maximum number of ways in a domestic consumer unit?',
          answer:
            'Standard domestic consumer units are available from 6 to 22 ways, with 12 to 16 ways being the most common for typical domestic installations. The number of ways needed depends on the number of circuits in the installation. A standard 3-bedroom house might have 8 to 12 circuits (two lighting, two ring finals, cooker, shower, immersion heater, smoke detection, possibly EV charger and outdoor circuits). Always specify a board with spare ways for future additions — a minimum of 2 spare ways is good practice. If AFDD devices are to be used, remember they are wider than standard RCBOs (typically 2 modules each), which reduces the effective number of available circuits.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/consumer-unit-regulations',
          title: 'Consumer Unit Regulations',
          description: 'Metal CU requirements, RCD protection, and Amendment 3 changes.',
          icon: ShieldCheck,
          category: 'Regulations',
        },
        {
          href: '/guides/rcbo-vs-rcd-mcb',
          title: 'RCBO vs RCD+MCB',
          description: 'Detailed cost and performance comparison.',
          icon: Zap,
          category: 'Guide',
        },
        {
          href: '/guides/afdd-arc-fault-detection',
          title: 'AFDD Arc Fault Detection',
          description: 'Arc fault devices, BS 7671 requirements, and manufacturers.',
          icon: Flame,
          category: 'Guide',
        },
        {
          href: '/guides/consumer-unit-change',
          title: 'Consumer Unit Change Guide',
          description: 'Step-by-step guide to replacing a consumer unit.',
          icon: FileText,
          category: 'Installation',
        },
        {
          href: '/guides/spd-surge-protection',
          title: 'SPD Surge Protection',
          description: 'Type 1, 2, 3 SPDs and BS 7671 requirements.',
          icon: Cable,
          category: 'Guide',
        },
        {
          href: '/guides/bs7671-eighteenth-edition',
          title: 'BS 7671 18th Edition',
          description: 'Complete guide to the current Wiring Regulations.',
          icon: BookOpen,
          category: 'Regulations',
        },
      ]}
      ctaHeading="Design Consumer Units with Confidence"
      ctaSubheading="Elec-Mate's circuit designer, calculators, and certificate forms support every board type. Join 430+ UK electricians. 7-day free trial, cancel anytime."
    />
  );
}
