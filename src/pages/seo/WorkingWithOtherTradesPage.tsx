import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  ClipboardCheck,
  FileCheck2,
  Users,
  Briefcase,
  Shield,
  AlertTriangle,
  Calendar,
  Hammer,
  Wrench,
  Droplets,
  Paintbrush,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/how-to-get-first-electrical-customer' },
  { label: 'Working with Other Trades', href: '/guides/working-with-other-trades-electrician' },
];

const tocItems = [
  { id: 'overview', label: 'Coordination on Site' },
  { id: 'first-fix-timing', label: 'First Fix Timing' },
  { id: 'plumbers', label: 'Working with Plumbers' },
  { id: 'builders', label: 'Working with Builders and Bricklayers' },
  { id: 'plasterers', label: 'Working with Plasterers' },
  { id: 'protecting-cables', label: 'Protecting Your Cables' },
  { id: 'communication', label: 'Communication and Scheduling' },
  { id: 'disputes', label: 'Handling Disputes' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'First fix electrical must happen after the structural shell is complete but before insulation and plasterboard go up. If you miss your window, you are either chasing finished walls (expensive and ugly) or holding up the project.',
  'Coordinate with plumbers before first fix — agree on routes through joists, positions of boiler connections, underfloor heating manifold locations, and bathroom fan/shaver socket positions. Whoever gets there first should not block the other trade.',
  'Protect your cables. Run cables through safe zones (as defined in BS 7671 Regulation 522.6) and use mechanical protection where required. Label cable positions clearly before plasterboard goes up. Damage caused by other trades is YOUR liability if the cable was not installed correctly.',
  'Communicate your schedule in writing — a quick message in the group chat or email confirming when you need access and what needs to be done before you arrive. Verbal agreements on building sites are forgotten within minutes.',
  'If another trade damages your work, document it immediately with photos and notify the site manager or main contractor in writing. Do not just fix it silently — you lose your ability to claim for the extra work.',
];

const faqs = [
  {
    question: 'When should I do my first fix electrical?',
    answer:
      'First fix electrical should happen after the building shell is watertight and structural work is complete, but before insulation, vapour barriers, and plasterboard go up. On a typical domestic extension or new build, the sequence is: structural frame and roof complete, windows and external doors fitted, first fix plumbing (hot and cold pipes, waste), first fix electrical (cables, back boxes, consumer unit connections), insulation, plasterboard. On a rewire in an existing property, first fix means running new cables before the plasterer makes good. Always confirm your slot with the builder or project manager at least 2 weeks in advance — if you turn up and the plasterboard is already going up, you have a problem.',
  },
  {
    question: 'Who should go first — electrician or plumber?',
    answer:
      'On most domestic projects, the plumber goes first for first fix because their pipes and waste runs are larger and less flexible than electrical cables. Plumbing pipes need gravity falls and cannot be bent as easily, so they get priority on routes through joists and stud walls. However, this is not a hard rule — it depends on the specific project. The best approach is to meet the plumber on site before first fix starts and agree: joist drilling positions (electrical notches at the top, plumbing at the centre — in accordance with building regulations), shared stud walls, and bathroom layouts. If you both need to cross the same joist, the plumber takes the centre (within the safe drilling zone) and you take the top.',
  },
  {
    question: 'What if the builder damages my cables during construction?',
    answer:
      'First, document the damage with photos immediately and note the date, location, and nature of the damage. Notify the site manager or main contractor in writing (email or message) within 24 hours. Do not simply repair and move on — you need a record for two reasons: (1) you should be paid for the repair work, and (2) if the cable damage is not your fault, you do not want to be held responsible later if there is an issue. If the cable was installed in a safe zone (as defined in BS 7671) with appropriate mechanical protection, and the builder drilled or nailed through it, liability clearly falls on the builder. If your cable was outside a safe zone and not mechanically protected, you may share responsibility. Always install within safe zones and use cable covers or conduit in high-risk areas.',
  },
  {
    question: 'How do I coordinate with the plasterer?',
    answer:
      'The plasterer needs to know: where all your back boxes are (so they can plaster up to them, not over them), where cables enter the wall (so they do not fill your conduit entries with plaster), and that all your cables and back boxes are fully secured before they start. Before the plasterer begins, walk the job and check: all back boxes are at the correct depth for the chosen plaster thickness (typically 12 to 13mm for skim on plasterboard, 15 to 20mm for multi-coat on brick), all cables are clipped securely and will not be displaced by plastering, and any surface-mounted conduit or trunking is complete. A 10-minute walk-around with the plasterer saves hours of problems later.',
  },
  {
    question: 'What are safe zones for cable routing?',
    answer:
      'BS 7671 Regulation 522.6 defines safe zones where cables in walls should be installed to reduce the risk of damage from nails, screws, and fixings. The safe zones are: horizontally within 150mm of the top of the wall or partition, horizontally within 150mm of a finished floor, vertically within 150mm of the angle of two walls, and within the zone running horizontally or vertically from an accessory (socket, switch, etc.) on either side. Cables installed within these zones are assumed to be protected by their position. Cables outside safe zones must have additional mechanical protection (such as earthed metal conduit, steel capping, or RCD protection on the circuit). Always install within safe zones where possible and use cable covers where you cannot.',
  },
  {
    question: 'How do I handle scheduling conflicts with other trades?',
    answer:
      'Scheduling conflicts are inevitable on building sites. The key is to communicate early and in writing. At the start of a project, ask for the programme (schedule) and identify your first fix and second fix windows. Two weeks before your slot, confirm with the site manager that the preceding work is on track. If your slot is moved, get the new date in writing and confirm that you can accommodate it. If multiple trades need the same space at the same time, propose a solution: "I can do the upstairs while the plumber works downstairs" or "I need 2 hours clear access in the kitchen for the consumer unit — can we schedule that for first thing Tuesday?" Being flexible and solutions-oriented wins you repeat work from builders.',
  },
  {
    question: 'Should I charge extra if I have to work around other trades?',
    answer:
      'If the original quote assumed clear access and you now have to work around other trades (which slows you down), you are entitled to claim for the additional time. On a fixed-price domestic job, this is a grey area — it depends on whether your quote specified clear access. On commercial subcontracts, variations for restricted access are standard. The best approach is to specify in your quote: "This price assumes clear, unobstructed access to all areas during first fix and second fix. If access is restricted by other trades, additional time will be charged at £X per hour." This sets the expectation upfront and avoids awkward conversations later.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/health-safety-policy-electrician',
    title: 'Health and Safety Policy',
    description:
      'Multi-trade sites require robust H&S procedures and RAMS.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-project-handover-guide',
    title: 'Project Handover Guide',
    description:
      'Coordinated handover with all trades for a professional finish.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/finding-commercial-electrical-work',
    title: 'Finding Commercial Work',
    description:
      'Commercial sites involve more trade coordination — be prepared.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-estimating-guide',
    title: 'Electrical Estimating Guide',
    description:
      'Factor coordination time into your estimates for multi-trade projects.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete your certificates on site during the handover process.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/hiring-first-employee-electrician',
    title: 'Hiring Your First Employee',
    description:
      'Grow your team for larger projects requiring multi-trade coordination.',
    icon: Users,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Working with Other Trades: Coordination Is Everything',
    content: (
      <>
        <p>
          On any project involving more than one trade — which is most projects — your work
          will overlap with plumbers, builders, plasterers, carpenters, decorators, and others.
          How well you coordinate determines whether the project runs smoothly or descends
          into finger-pointing and delays.
        </p>
        <p>
          Poor coordination leads to cables being damaged, access being blocked, work being
          ripped out and redone, and relationships being destroyed. Good coordination means
          agreeing routes, respecting timings, protecting each other&apos;s work, and
          communicating clearly.
        </p>
        <p>
          This guide covers the practical realities of working alongside other trades on both
          domestic and commercial projects — from first fix timing to protecting your cables
          to handling disputes when things go wrong.
        </p>
      </>
    ),
  },
  {
    id: 'first-fix-timing',
    heading: 'First Fix Timing: Get Your Slot Right',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-yellow-400" /> Typical Domestic First Fix Sequence
          </h4>
          <div className="space-y-3 text-white text-sm">
            <div className="flex items-start gap-3 border-b border-white/10 pb-2">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex items-center justify-center shrink-0">1</span>
              <span><strong>Structural work complete</strong> — walls, roof, windows, external doors</span>
            </div>
            <div className="flex items-start gap-3 border-b border-white/10 pb-2">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <span><strong>First fix plumbing</strong> — hot/cold pipes, waste runs, underfloor heating pipes</span>
            </div>
            <div className="flex items-start gap-3 border-b border-white/10 pb-2">
              <span className="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <span><strong>First fix electrical</strong> — cable runs, back boxes, consumer unit wiring</span>
            </div>
            <div className="flex items-start gap-3 border-b border-white/10 pb-2">
              <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <span><strong>Insulation</strong> — cavity, stud wall, and loft insulation</span>
            </div>
            <div className="flex items-start gap-3 border-b border-white/10 pb-2">
              <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex items-center justify-center shrink-0">5</span>
              <span><strong>Plasterboard and plastering</strong></span>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center shrink-0">6</span>
              <span><strong>Second fix</strong> — all trades fit their final accessories and fittings</span>
            </div>
          </div>
        </div>
        <p>
          <strong>If you miss first fix:</strong> You either have to chase finished walls
          (expensive, messy, and the customer will not be happy) or surface-mount cables
          (which may not be acceptable). Always confirm your first fix date at least 2 weeks
          in advance and chase the week before.
        </p>
      </>
    ),
  },
  {
    id: 'plumbers',
    heading: 'Working with Plumbers',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-400" /> Coordination Points
            </h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Boiler connection — agree position of fused spur and controls wiring</li>
              <li>Unvented cylinder — immersion heater circuit and wiring centre position</li>
              <li>Underfloor heating — manifold and thermostat wiring positions</li>
              <li>Bathroom — extractor fan, shaver socket, heated towel rail positions</li>
              <li>Kitchen — dishwasher, washing machine, and waste disposal FCU positions</li>
              <li>Outside tap — may need a frost thermostat or trace heating connection</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" /> Watch Out For
            </h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Plumbing pipes clipped over your cables — ask them to route around</li>
              <li>Water leaks onto electrical connections — report immediately</li>
              <li>Joist drilling conflicts — agree zones before either of you starts</li>
              <li>Bonding — supplementary bonding in bathrooms, main bonding of gas/water</li>
              <li>Unvented cylinders need specific controls wiring — confirm spec with plumber</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'builders',
    heading: 'Working with Builders and Bricklayers',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Hammer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mark your cable routes before bricklaying and plastering.</strong> Use
                cable markers, photographs, or a simple sketch showing cable positions relative
                to fixed points. This protects you if a builder later drills through a cable
                and claims they did not know it was there.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Hammer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Agree chase sizes and routes before the builder cuts them.</strong> If
                the builder is chasing walls for you, specify the depth (minimum 25mm for
                twin and earth in capping), width, and route. Supervise if possible — a
                builder who chases too deep in a load-bearing wall creates a structural problem.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Hammer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ducting and conduit before concrete floors are poured.</strong> If you
                need cables under a concrete floor, get your conduit or ducting in before the
                pour. Once the concrete is down, you cannot retrofit cables without breaking
                it up.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Hammer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lintels and steels.</strong> Cable routes that cross above windows and
                doors will encounter lintels and steel beams. Plan your route to avoid drilling
                through structural steel — route above, below, or around.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'plasterers',
    heading: 'Working with Plasterers',
    content: (
      <>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Paintbrush className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Before Plasterboard Goes Up</h4>
                <p className="text-white text-sm leading-relaxed">
                  Check all cables are clipped, all back boxes are positioned correctly, all
                  cable entries are clear, and all first fix is complete. Once plasterboard is
                  up, you cannot access anything without pulling boards off.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Paintbrush className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Back Box Depth</h4>
                <p className="text-white text-sm leading-relaxed">
                  Back boxes must be set to the correct depth for the finished plaster
                  surface. For plasterboard with skim (approximately 13mm total), the front
                  edge of the back box should sit 13mm behind the face of the stud. If the
                  plasterer has to build up around proud back boxes or your boxes are recessed
                  too deep, second fix will be a nightmare.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Paintbrush className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Plaster in Back Boxes</h4>
                <p className="text-white text-sm leading-relaxed">
                  The most common frustration: the plasterer fills your back boxes with
                  plaster. Use box blanks or tape over your back boxes before the plasterer
                  starts. It takes 5 minutes and saves hours of chiselling plaster out of
                  boxes during second fix.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'protecting-cables',
    heading: 'Protecting Your Cables from Damage',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Install within safe zones (BS 7671 Reg 522.6)</strong> — horizontally
                within 150mm of the ceiling or floor, vertically within 150mm of corners, and
                within the zone running directly up or across from accessories.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use cable covers in chases</strong> — galvanised steel capping over
                cables in wall chases provides mechanical protection and satisfies the
                requirement for earthed metallic covering in safe zones.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Photograph cable routes</strong> — before plasterboard or plaster
                covers your cables, photograph every route. These photos are invaluable for
                second fix, future alterations, and dispute resolution if someone damages a
                cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use joist notching guards</strong> — metal plates over notches in
                joists prevent nails and screws from penetrating cables when floorboards are
                refixed.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'communication',
    heading: 'Communication and Scheduling',
    content: (
      <>
        <p>
          Most problems between trades come down to poor communication. A 2-minute message
          can prevent a 2-day problem.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use the site WhatsApp group.</strong> Most multi-trade projects have a
                group chat. Use it to confirm dates, flag issues, and share photos of progress.
                If there is not one, create one.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Confirm your schedule in writing.</strong> "I will be on site Monday and
                Tuesday for first fix. I need clear access to all rooms. Please ensure first
                fix plumbing is complete before I arrive." This sets expectations and gives you
                a record if things go wrong.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flag problems immediately.</strong> If you arrive on site and the
                conditions are not what was agreed (plumbing not done, walls not ready, access
                blocked), notify the builder or project manager immediately in writing. Do not
                just turn around and go home — communicate.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'disputes',
    heading: 'Handling Disputes with Other Trades',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Do</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Document damage with timestamped photos</li>
              <li>Notify the site manager or main contractor in writing</li>
              <li>Propose a solution along with the problem</li>
              <li>Charge for repair work if the damage was not your fault</li>
              <li>Keep records for every project — they protect you</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Do Not</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Fix damage silently and absorb the cost</li>
              <li>Confront other trades aggressively on site</li>
              <li>Damage another trade&apos;s work in retaliation</li>
              <li>Walk off site without communicating</li>
              <li>Discuss disputes in front of the customer</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Be the Trade Everyone Wants to Work With',
    content: (
      <>
        <p>
          The electricians who get the most repeat work from builders and main contractors
          are the ones who communicate clearly, turn up when they say they will, protect
          other trades&apos; work, and solve problems instead of creating them. Your technical
          skill gets you the first job — your professionalism gets you every job after that.
        </p>
        <SEOAppBridge
          title="Schedule and manage multi-trade projects"
          description="Elec-Mate helps you manage your schedule, track jobs across multiple sites, and keep documentation organised for every project. 7-day free trial."
          icon={Users}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function WorkingWithOtherTradesPage() {
  return (
    <GuideTemplate
      title="Working with Other Trades as an Electrician UK 2026 | Site Guide"
      description="Guide to working with plumbers, builders, and plasterers on site. First fix timing, protecting cables, coordination, scheduling, and handling disputes. Practical advice for electricians."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Site Guide"
      badgeIcon={Users}
      heroTitle={
        <>
          Working with Other Trades:{' '}
          <span className="text-yellow-400">Coordination, Timing, and Protecting Your Work</span>
        </>
      }
      heroSubtitle="First fix timing, working with plumbers and builders, protecting your cables, communication, and handling disputes. The practical guide to multi-trade coordination for electricians."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Working with Other Trades"
      relatedPages={relatedPages}
      ctaHeading="Manage Multi-Trade Projects with Confidence"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for scheduling, job management, and on-site documentation. Stay organised across every project. 7-day free trial, cancel anytime."
    />
  );
}
