import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Home,
  Zap,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Cable,
  FileText,
  Calculator,
  ClipboardCheck,
  Brain,
  Plug,
  Wrench,
} from 'lucide-react';

export default function ElectricalRetrofitGuidePage() {
  return (
    <GuideTemplate
      title="Electrical Retrofit Guide | Upgrading Older Properties"
      description="Complete guide to retrofitting electrical installations in older UK properties. Covers common wiring issues, rewire vs partial upgrade, consumer unit changes, earthing upgrades, Part P notification, and how to plan a cost-effective retrofit."
      datePublished="2026-01-15"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Installation', href: '/guides' },
        { label: 'Retrofit Guide', href: '/guides/electrical-retrofit-guide' },
      ]}
      tocItems={[
        { id: 'common-issues', label: 'Common Issues in Older Wiring' },
        { id: 'rewire-vs-upgrade', label: 'Full Rewire vs Partial Upgrade' },
        { id: 'consumer-unit-change', label: 'Consumer Unit Change' },
        { id: 'earthing-upgrade', label: 'Earthing and Bonding Upgrades' },
        { id: 'part-p', label: 'Part P Notification' },
        { id: 'planning-retrofit', label: 'Planning a Retrofit Project' },
        { id: 'how-to', label: 'Step-by-Step Process' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          Electrical Retrofit Guide
          <br />
          <span className="text-yellow-400">Upgrading Older Properties Safely</span>
        </>
      }
      heroSubtitle="Older UK properties present unique electrical challenges — from degraded rubber-insulated cabling and missing earth conductors to outdated consumer units and inadequate bonding. This guide explains how to assess what needs upgrading, whether a full rewire is necessary or a targeted retrofit will suffice, and how to handle Part P notification for the work."
      readingTime={13}
      keyTakeaways={[
        'A full rewire is not always necessary — many older properties can be brought up to a safe standard with targeted upgrades such as a consumer unit change, earthing improvement, and replacement of the worst circuits.',
        'The most common issues found in pre-1970s properties are degraded rubber insulation, missing circuit protective conductors (CPCs), rewirable fuse boards, no RCD protection, and inadequate main bonding.',
        'A consumer unit upgrade to a modern RCBO board with SPD is often the single most impactful improvement — it adds RCD protection to every circuit without rewiring.',
        'Earthing upgrades may involve fitting a new main earthing terminal, upgrading main bonding to 10mm or 16mm, and adding supplementary bonding in bathrooms and kitchens where required.',
        'All retrofit work that involves new circuits, consumer unit changes, or work in special locations (bathrooms, kitchens with new circuits) is notifiable under Part P of the Building Regulations.',
      ]}
      sections={[
        {
          id: 'common-issues',
          heading: 'Common Issues Found in Older Wiring',
          content: (
            <>
              <p>
                Properties built before the 1970s frequently have electrical installations that no
                longer meet current safety standards. The age alone does not determine whether the
                installation is dangerous — the condition of the insulation, connections, and
                protective devices is what matters. However, certain types of wiring and equipment
                are inherently problematic and should be addressed.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Cable className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Degraded Rubber Insulation (VIR Cable)
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Vulcanised india rubber (VIR) cable was standard in properties built before the
                    1960s. Over decades, the rubber insulation becomes brittle and cracks,
                    particularly where cables are exposed to heat from lighting or run through warm
                    loft spaces. When disturbed during any work, the insulation can crumble away
                    entirely, exposing bare copper conductors. This is invariably coded as{' '}
                    <SEOInternalLink href="/guides/eicr-observation-codes">
                      C1 (Danger Present)
                    </SEOInternalLink>{' '}
                    on an EICR.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Missing Earth Conductors</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Very old wiring systems used only live and neutral conductors with no separate
                    circuit protective conductor (CPC). Without an earth path, protective devices
                    cannot clear earth faults, and Class I equipment connected to these circuits is
                    extremely dangerous. Adding an earth conductor to existing circuits without a
                    CPC requires running a separate CPC alongside the existing cable or rewiring the
                    affected circuit entirely.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Rewirable Fuse Boards</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Porcelain or Bakelite rewirable fuse holders with wire carriers provide only
                    basic overcurrent protection. There is no RCD protection, no discrimination
                    between circuits, and the fuse wire can easily be replaced with an incorrect
                    rating. A{' '}
                    <SEOInternalLink href="/guides/consumer-unit-change">
                      consumer unit change
                    </SEOInternalLink>{' '}
                    to a modern board with RCBOs is one of the most effective safety upgrades for
                    older properties.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Inadequate Bonding</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Many older properties lack proper main bonding to gas and water services, or
                    have bonding conductors that are undersized by current standards. BS 7671
                    requires main bonding conductors to be at least 10mm² (or 6mm² where the supply
                    is PME/TN-C-S with appropriate conditions). Missing or undersized bonding
                    creates a risk of dangerous touch voltages on metallic services during a fault.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Plug className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Overloaded Circuits</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Properties wired decades ago were designed for far fewer appliances. A typical
                    1960s installation might have two socket circuits and two lighting circuits for
                    the entire house. Modern electrical demand — with multiple appliances, home
                    computing, electric heating, and EV charging — can easily overload these
                    original circuits. Signs include warm cables, tripping fuses, and discoloured
                    outlet plates.
                  </p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'rewire-vs-upgrade',
          heading: 'Full Rewire vs Partial Upgrade — Which Do You Need?',
          content: (
            <>
              <p>
                The decision between a{' '}
                <SEOInternalLink href="/guides/house-rewire-guide">
                  full house rewire
                </SEOInternalLink>{' '}
                and a targeted retrofit depends on the condition of the existing installation, the
                scope of the planned work, and the budget available. A full rewire replaces every
                cable, accessory, and the consumer unit. A partial upgrade addresses specific
                deficiencies while retaining wiring that is still in acceptable condition.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">
                  When a Full Rewire Is Required
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        VIR or lead-sheathed cable throughout
                      </strong>{' '}
                      — If the majority of circuits use degraded rubber or lead-sheathed insulation,
                      a full rewire is the only safe option. Patching individual circuits while
                      leaving others with failing insulation is not a long-term solution.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Multiple C1/C2 observations across all circuits
                      </strong>{' '}
                      — An <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink>{' '}
                      with systemic failures indicates the entire installation has deteriorated
                      beyond economical repair.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        No earth conductors on any circuit
                      </strong>{' '}
                      — If the entire installation lacks CPCs, the cost of retrofitting earth
                      conductors to every circuit often exceeds the cost of a complete rewire.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">
                  When a Partial Upgrade May Suffice
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">PVC cable in acceptable condition</strong>{' '}
                      — If the existing PVC-insulated cable passes insulation resistance tests and
                      is correctly sized, it can be retained while upgrading the consumer unit and
                      bonding.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Localised issues only</strong> — If the
                      EICR identifies problems on specific circuits (e.g., one lighting circuit with
                      failing insulation) while others are satisfactory, targeted replacement is
                      appropriate.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Budget constraints with phased plan
                      </strong>{' '}
                      — A consumer unit upgrade now, followed by circuit replacement over time, can
                      be a pragmatic approach as long as immediate safety issues are resolved first.
                    </span>
                  </li>
                </ul>
              </div>
              <SEOAppBridge
                title="AI Circuit Designer for Retrofit Planning"
                description="Elec-Mate's AI Circuit Designer helps plan which circuits to retain and which to replace. Input the existing circuit data from your EICR and get a recommended retrofit specification — including consumer unit sizing, cable schedules, and estimated material costs."
                icon={Brain}
              />
            </>
          ),
        },
        {
          id: 'consumer-unit-change',
          heading: 'Consumer Unit Change in Older Properties',
          content: (
            <>
              <p>
                Replacing the consumer unit is frequently the centrepiece of a retrofit project. A
                modern consumer unit with individual RCBOs provides RCD protection to every circuit
                — significantly reducing the risk of electric shock and fire even on older wiring
                that may have minor insulation deterioration. The{' '}
                <SEOInternalLink href="/guides/consumer-unit-change">
                  consumer unit change guide
                </SEOInternalLink>{' '}
                covers the full process in detail.
              </p>
              <p>
                In older properties, the consumer unit change often reveals additional issues that
                must be addressed:
              </p>
              <div className="space-y-3 mt-4">
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Tails May Need Upgrading</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Older properties may have 16mm² tails or smaller. Modern consumer units with
                      higher rated main switches may require 25mm² tails. The DNO meter tails from
                      the cutout to the meter may also need upgrading — this work must be carried
                      out by the DNO or their appointed contractor.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Nuisance Tripping on Old Circuits</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Adding RCD protection to circuits with deteriorating insulation can cause
                      nuisance tripping. Insulation resistance below 1 MΩ may be acceptable without
                      RCD protection but will cause an RCD to trip. This is actually a benefit — it
                      reveals circuits that need attention — but the customer must be informed
                      before the work begins.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">SPD Requirements</h4>
                    <p className="text-white text-sm leading-relaxed">
                      BS 7671 now requires a surge protection device (SPD) to be fitted as part of a
                      consumer unit change unless a risk assessment concludes it is not necessary.
                      The SPD protects sensitive electronic equipment from transient overvoltages.
                      In older properties with equipment earthing that may be less than ideal, an
                      SPD is particularly valuable.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'earthing-upgrade',
          heading: 'Earthing and Bonding Upgrades',
          content: (
            <>
              <p>
                Earthing deficiencies are among the most common findings during inspections of older
                properties. The{' '}
                <SEOInternalLink href="/guides/earthing-arrangements">
                  earthing arrangements guide
                </SEOInternalLink>{' '}
                covers the theory in detail. In a retrofit context, the practical considerations
                are:
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Main Earthing Terminal</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Some older properties have no formal main earthing terminal (MET) — the earth
                    connection may go directly from the supply earth to the consumer unit earth bar
                    with no accessible connection point. Installing a proper MET near the consumer
                    unit provides a central point for all earthing and bonding connections, making
                    future maintenance and testing easier.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Cable className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Main Bonding Conductors</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Main bonding conductors must connect the main earthing terminal to all
                    extraneous-conductive-parts — typically the gas and water services, and oil
                    pipework where applicable. In older properties, bonding may be missing entirely,
                    connected to the wrong point (e.g., after the gas meter rather than within 600mm
                    of the point of entry), or undersized. Upgrading to 10mm² or 16mm² (depending on
                    the supply earth arrangement) is a straightforward but essential upgrade.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Supplementary Bonding</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    In bathrooms and other special locations, supplementary bonding may be required
                    to connect all simultaneously accessible extraneous-conductive-parts and
                    exposed-conductive-parts. However, Regulation 415.2.2 allows supplementary
                    bonding to be omitted where all circuits in the room are protected by 30mA RCDs
                    and the main bonding is satisfactory. A consumer unit upgrade with RCBOs can
                    therefore eliminate the need for supplementary bonding in bathrooms — a
                    significant practical benefit in retrofit work where running new bonding
                    conductors through tiled bathrooms is disruptive and expensive.
                  </p>
                </div>
              </div>
              <SEOAppBridge
                title="EICR Digital Form for Retrofit Documentation"
                description="Elec-Mate's digital EICR form captures all test results before and after retrofit work. Document the existing installation condition, record the improvements made, and issue a satisfactory report — all validated against BS 7671 limits automatically."
                icon={ClipboardCheck}
              />
            </>
          ),
        },
        {
          id: 'part-p',
          heading: 'Part P Notification for Retrofit Work',
          content: (
            <>
              <p>
                Not all retrofit work is notifiable under{' '}
                <SEOInternalLink href="/guides/part-p-building-regulations">
                  Part P of the Building Regulations
                </SEOInternalLink>
                , but several common retrofit activities are. Understanding what requires
                notification — and what does not — avoids problems for both the electrician and the
                homeowner.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Notifiable Retrofit Work</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Consumer unit change</strong> — Always
                      notifiable, regardless of how minor the change appears.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">New circuits</strong> — Adding any new
                      circuit to the installation requires notification.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Work in special locations</strong> — Any
                      electrical work in bathrooms (zones 0, 1, 2), swimming pools, saunas, or
                      similar special locations.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">New outdoor circuits</strong> — Including
                      garden lighting, external socket outlets, and outbuilding supplies.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Non-Notifiable Retrofit Work</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Like-for-like replacement</strong> —
                      Replacing accessories (sockets, switches, light fittings) on existing circuits
                      with equivalent items.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Bonding upgrades</strong> — Adding or
                      upgrading main bonding and supplementary bonding conductors.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Adding to existing circuits outside special locations
                      </strong>{' '}
                      — Adding a socket to an existing ring final or radial circuit (e.g., adding a
                      spur) outside a bathroom.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                The correct certificate type depends on the scope of work. A consumer unit change
                with no other alterations requires an{' '}
                <SEOInternalLink href="/guides/eic-certificate">
                  Electrical Installation Certificate (EIC)
                </SEOInternalLink>
                . Adding a spur or replacing accessories requires a{' '}
                <SEOInternalLink href="/guides/minor-works-certificate">
                  Minor Works Certificate
                </SEOInternalLink>
                . A larger retrofit involving multiple new circuits and a consumer unit change
                requires a full EIC covering all the new work.
              </p>
            </>
          ),
        },
        {
          id: 'planning-retrofit',
          heading: 'Planning a Cost-Effective Retrofit',
          content: (
            <>
              <p>
                The most effective approach to retrofit work in older properties is to start with a
                thorough <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink>{' '}
                that identifies every deficiency, then prioritise the remedial work based on safety
                impact and cost-effectiveness.
              </p>
              <div className="space-y-3 mt-4">
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      Priority 1 — Immediate Dangers (C1)
                    </h4>
                    <p className="text-white text-sm leading-relaxed">
                      Any C1 observations must be addressed immediately. These include exposed live
                      conductors, missing earth connections on circuits supplying Class I equipment,
                      and any condition presenting an immediate risk of electric shock or fire.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      Priority 2 — Consumer Unit and Earthing (C2)
                    </h4>
                    <p className="text-white text-sm leading-relaxed">
                      Upgrading the consumer unit and earthing system delivers the biggest safety
                      improvement for the investment. A modern RCBO board with SPD and proper
                      bonding addresses multiple EICR observations in a single piece of work.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      Priority 3 — Worst Circuits First (C2/C3)
                    </h4>
                    <p className="text-white text-sm leading-relaxed">
                      Replace circuits with the lowest insulation resistance readings or the most C2
                      observations first. Often one or two circuits account for the majority of
                      problems while others remain serviceable.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    4
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      Priority 4 — Additional Circuits for Modern Demand
                    </h4>
                    <p className="text-white text-sm leading-relaxed">
                      Once the safety issues are resolved, add circuits to meet modern demand —
                      additional socket circuits, dedicated circuits for high-power appliances,
                      outdoor circuits, and{' '}
                      <SEOInternalLink href="/guides/ev-charger-installation">
                        EV charger
                      </SEOInternalLink>{' '}
                      cable runs where needed.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ),
        },
      ]}
      howToHeading="Electrical Retrofit — Step-by-Step Process"
      howToDescription="A practical guide to planning and executing a retrofit upgrade on an older property."
      howToSteps={[
        {
          name: 'Carry out a thorough EICR',
          text: "Inspect and test every circuit in the existing installation. Record all observations with C1, C2, C3, and FI codes. Note the type and condition of all cables, the earthing arrangement, bonding, and the consumer unit. Use Elec-Mate's digital EICR form to capture everything on site.",
        },
        {
          name: 'Assess and prioritise the remedial work',
          text: 'Review the EICR findings and determine whether a full rewire or partial upgrade is appropriate. Prepare a prioritised list of improvements ranked by safety impact. Discuss options and costs with the homeowner.',
        },
        {
          name: 'Upgrade the consumer unit and earthing',
          text: 'Replace the existing fuse board or consumer unit with a modern metal enclosure containing RCBOs and an SPD. Upgrade the main earthing terminal and main bonding conductors. Test all circuits after the consumer unit change to identify any that trip the new RCDs.',
        },
        {
          name: 'Replace or upgrade deficient circuits',
          text: 'Rewire circuits identified as failing — typically those with degraded insulation, missing CPCs, or consistently low insulation resistance readings. Add new circuits where required to meet modern demand.',
        },
        {
          name: 'Test, certify, and notify',
          text: 'Carry out the full testing sequence on all new and altered circuits. Complete the EIC or Minor Works Certificate as appropriate. Submit Part P notification for notifiable work. Issue all certificates to the homeowner.',
        },
      ]}
      faqs={[
        {
          question: 'How much does it cost to upgrade the electrics in an older property?',
          answer:
            'The cost varies enormously depending on the scope. A consumer unit change alone typically costs £600-£1,200 including SPD, testing, EIC, and Part P notification. Adding earthing and bonding upgrades adds £200-£500. Replacing individual circuits costs £300-£800 per circuit depending on access and length. A comprehensive retrofit (consumer unit, bonding, 3-4 circuit replacements) for a 3-bedroom property typically costs £2,000-£4,000 — substantially less than a full rewire at £3,500-£6,000.',
        },
        {
          question: 'Can I keep the existing wiring if I change the consumer unit?',
          answer:
            'Yes, a consumer unit change does not require rewiring. However, the new consumer unit will add RCD protection to all circuits, which may cause nuisance tripping on circuits with deteriorated insulation. This is actually beneficial — it highlights circuits that need attention. If the existing wiring passes insulation resistance tests and is correctly sized, it can remain in service indefinitely. The key requirement is that all existing circuits must be tested as part of the consumer unit change, and the results recorded on the EIC.',
        },
        {
          question: 'Is a partial upgrade safe, or should I always do a full rewire?',
          answer:
            'A well-planned partial upgrade can be perfectly safe. The critical factor is a thorough EICR that identifies all deficiencies. If the existing PVC cable is in good condition and passes insulation resistance tests, there is no technical requirement to replace it. A new consumer unit with RCBOs adds a layer of protection that was not present in the original installation. The decision should be based on test results and observations, not simply on the age of the installation.',
        },
        {
          question: 'What certificate do I need for retrofit work?',
          answer:
            'The certificate type depends on the scope of work. A consumer unit change requires a full Electrical Installation Certificate (EIC), not a Minor Works Certificate, because it constitutes a new installation of the distribution equipment. Adding a spur or replacing accessories on an existing circuit requires a Minor Works Certificate. A larger retrofit involving both a consumer unit change and new circuits requires a full EIC covering all the work. All notifiable work must also be submitted through a competent person scheme for Part P compliance.',
        },
        {
          question:
            'Do I need to bring the whole installation up to current BS 7671 standards during a retrofit?',
          answer:
            'No. BS 7671 applies to new work. When you carry out alterations or additions to an existing installation, the new work must comply with current standards, but you are not required to bring the entire existing installation up to current standards. However, the new work must not adversely affect the safety of the existing installation, and the existing installation must be in a suitable condition for the new work to be connected to it. If the existing installation is in such poor condition that connecting new work to it would create a danger, the existing installation must be improved first.',
        },
        {
          question: 'How does Elec-Mate help with retrofit projects?',
          answer:
            'Elec-Mate provides all the tools an electrician needs for retrofit work. The digital EICR form captures the initial condition survey with all observation codes and test results. The AI Circuit Designer recommends which circuits to retain and which to replace. The cable sizing calculator handles derating for existing installation methods. The EIC and Minor Works digital forms validate all test results against BS 7671 limits. And everything syncs to the cloud for professional PDF output and Part P documentation.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/house-rewire-guide',
          title: 'House Rewire Guide',
          description: 'Complete guide to full house rewiring in the UK.',
          icon: Home,
          category: 'Guide',
        },
        {
          href: '/guides/consumer-unit-change',
          title: 'Consumer Unit Change',
          description: 'Step-by-step guide to consumer unit replacement.',
          icon: Zap,
          category: 'Guide',
        },
        {
          href: '/guides/earthing-arrangements',
          title: 'Earthing Arrangements',
          description: 'TN-S, TN-C-S, and TT earthing systems explained.',
          icon: ShieldCheck,
          category: 'Guide',
        },
        {
          href: '/guides/eicr-certificate',
          title: 'EICR Certificate',
          description: 'How to carry out and report an EICR.',
          icon: ClipboardCheck,
          category: 'Certification',
        },
        {
          href: '/guides/part-p-building-regulations',
          title: 'Part P Building Regulations',
          description: 'Which electrical work requires notification.',
          icon: FileText,
          category: 'Regulation',
        },
        {
          href: '/calculators/cable-sizing',
          title: 'Cable Sizing Calculator',
          description: 'Calculate correct cable sizes with derating factors.',
          icon: Calculator,
          category: 'Calculator',
        },
      ]}
      ctaHeading="Plan and Certify Retrofit Work With Elec-Mate"
      ctaSubheading="Digital EICR forms, AI Circuit Designer, cable sizing calculator, EIC and Minor Works certificates — everything you need for retrofit projects. 7-day free trial, cancel anytime."
    />
  );
}
