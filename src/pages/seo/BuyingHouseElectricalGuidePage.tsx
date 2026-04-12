import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  AlertTriangle,
  PoundSterling,
  Home,
  ClipboardCheck,
  Search,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Buying a House Guides', href: '/guides/electrical-survey-before-buying' },
  { label: 'Buying a House Electrical Checklist', href: '/buying-house-electrical-guide' },
];

const tocItems = [
  { id: 'viewing-checklist', label: 'What to Check at Viewing' },
  { id: 'consumer-unit', label: 'Consumer Unit Age and Type' },
  { id: 'sockets-and-wiring', label: 'Sockets and Visible Wiring' },
  { id: 'diy-warning-signs', label: 'DIY Electrical Warning Signs' },
  { id: 'pre-1966-properties', label: 'Pre-1966 Properties' },
  { id: 'getting-an-eicr', label: 'Getting an EICR During Purchase' },
  { id: 'negotiating', label: 'Negotiating on Electrical Issues' },
  { id: 'rewire-costs', label: 'Rewire Costs to Factor Into Your Offer' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "A homebuyer's survey does not include an electrical inspection. You must commission a separate Electrical Installation Condition Report (EICR) to understand the true condition of the wiring.",
  'At viewing, check the consumer unit age and type, count sockets per room, look for visible wiring in unusual materials (rubber, lead, fabric), and note any evidence of DIY electrical work.',
  'Properties built before 1966 may still have original wiring that is now at the end of its serviceable life. Pre-1966 rubber-insulated wiring is brittle, potentially dangerous, and will require a full rewire.',
  'A full house rewire typically costs £3,500 to £10,000 depending on property size. Factor this into your offer or ask the vendor to rectify before exchange.',
  'C1 and C2 observations on an EICR indicate dangerous or potentially dangerous conditions. A C1 finding gives you significant leverage to renegotiate the purchase price or require the vendor to carry out the remedial work.',
];

const faqs = [
  {
    question: "Does a homebuyer's survey check the electrics?",
    answer:
      'No. A standard RICS Level 2 Homebuyer Survey or Level 3 Building Survey does not include a detailed electrical inspection or testing. The surveyor may note visible concerns (such as an old consumer unit or outdated wiring) as a prompt for further investigation, but they do not carry out continuity tests, insulation resistance tests, or earth fault loop impedance tests. To understand the true condition of the electrical installation, you need a separate EICR carried out by a qualified electrician.',
  },
  {
    question: 'What should I look for in the consumer unit when viewing a property?',
    answer:
      'Check whether the consumer unit (fuse box) has RCD protection — this is indicated by the presence of a residual current device, usually a wide switch in the centre of the unit. Older properties may have a rewirable fuse board with ceramic fuse holders, which predates modern protective devices. A consumer unit with a "Wylex" bayonet-style board or a split-load board without RCDs is a sign the installation may need upgrading. Modern consumer units installed after 2016 should have RCBO or dual RCD protection on all circuits.',
  },
  {
    question: 'How many sockets should each room have?',
    answer:
      'There is no minimum legal requirement for socket numbers, but as a guide: a bedroom should have at least four double sockets, a kitchen at least six double sockets (excluding the cooker circuit), a living room at least six double sockets, and a home office eight or more. Older properties often have only one or two single sockets per room — a sign of original wiring that has not been updated. Extension leads are not a safe long-term solution for chronic under-socketing.',
  },
  {
    question: 'What are the warning signs of dangerous DIY electrical work?',
    answer:
      'Warning signs include sockets or switches that are not flush with the wall, cables run on the surface in plastic trunking in unusual locations, junction boxes visible in ceilings or walls, mismatched socket and switch styles throughout the property, non-standard colours of cable or conduit, and consumer units with mixed-brand or non-standard breakers. DIY electrical work that has not been certified under Part P of the Building Regulations is a legal issue as well as a safety concern — it can affect your ability to sell the property and may invalidate your insurance.',
  },
  {
    question: 'What is the danger with pre-1966 rubber-insulated wiring?',
    answer:
      'Properties built before approximately 1966 may still have their original wiring insulated with vulcanised rubber (VIR — vulcanised india rubber) or early PVC. Rubber insulation becomes brittle and cracks with age and heat, causing the copper conductors to be exposed. This is a serious fire and shock risk. Original rubber-insulated wiring will almost certainly generate C1 (danger present) observations on an EICR. In most cases, the only remedy is a full rewire.',
  },
  {
    question: 'How much does a full house rewire cost in the UK?',
    answer:
      'A full rewire typically costs £3,500 to £5,500 for a two-bedroom property, £4,500 to £7,000 for a three-bedroom property, and £6,000 to £10,000 for a four-bedroom property. These costs include first and second fix wiring, consumer unit replacement, socket and switch replacement, and certification under BS 7671. They do not include redecoration after the electrician has chased channels in walls. Prices vary significantly by region — London and the South East are typically 20 to 30 per cent higher than the national average.',
  },
  {
    question: 'Can I use EICR findings to renegotiate the purchase price?',
    answer:
      'Yes, and this is one of the most practical uses of commissioning an EICR during a purchase. If the EICR reveals C1 or C2 observations, you have documented evidence of the cost of remedial work. You can request that the vendor either carries out the work before completion or reduces the purchase price by the cost of the work. Vendors are generally more willing to negotiate on the price than to manage the remedial work themselves. Get two or three quotes from electricians for the remedial work before presenting your case.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrical-survey-before-buying',
    title: 'Electrical Survey When Buying',
    description: 'Do you need an EICR when buying? Costs, what it reveals, and how to negotiate.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/electrical-issues-house-value',
    title: 'How Electrical Issues Affect House Value',
    description: 'How rewires, consumer unit upgrades, and EICR failures affect property value.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/new-home-electrical-checklist',
    title: 'New Home Electrical Checklist',
    description: 'Things to do when you move into a new property to keep your family safe.',
    icon: CheckCircle2,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'viewing-checklist',
    heading: 'What to Check at a Property Viewing',
    content: (
      <>
        <p>
          Most buyers focus on room sizes, the kitchen, and the condition of the roof at viewings.
          The electrical installation is rarely on anyone's checklist — yet it can be one of the
          most expensive things to put right. A few minutes spent on these checks during a viewing
          can save thousands of pounds later.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Find the consumer unit</strong> — usually in a hallway cupboard, utility
                room, or under the stairs. Note whether it has RCD protection (a wider toggle
                switch), whether it is a modern plastic unit or an old rewirable fuse board, and
                whether the casing is in good condition with no scorch marks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Count the sockets per room</strong> — note how many socket outlets are
                present in each room and whether they appear modern. Single sockets or two-pin
                round-pin sockets are signs of very old wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Look at visible wiring</strong> — check under the stairs and in any
                accessible loft space. Old rubber-insulated cables are dark brown or black and the
                insulation often appears dry and cracked. Lead-sheathed cables are grey and very
                heavy. Fabric-braided cables are grey or brown woven material.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check light fittings</strong> — pull-cord switches in bathrooms and kitchen
                are appropriate; standard switches indicate non-compliant work. Look for shaver
                sockets in bathrooms — these should be BS EN 61558 shaver supply units, not standard
                sockets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Note any signs of water damage near electrics</strong> — staining around
                sockets or switches near the kitchen, bathroom, or external walls may indicate water
                ingress near live wiring.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Take photographs of the consumer unit, any visible wiring, and any concerns you notice.
          These help the EICR inspector understand your concerns and can be useful when negotiating
          with the vendor if issues are found.
        </p>
      </>
    ),
  },
  {
    id: 'consumer-unit',
    heading: 'Consumer Unit Age and Type — What to Look For',
    content: (
      <>
        <p>
          The consumer unit (often called the fuse box) is the heart of the electrical installation.
          Its age and type tell you a great deal about how the installation has been maintained and
          what work might be needed.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Modern split-load or RCBO board (post-2016)</strong> — compliant with the
                17th Amendment to BS 7671. Look for a metal-clad consumer unit (required since 2016
                under BS 7671:2008+A3:2015) with individual RCBOs or two RCDs. This is what you want
                to see.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>White plastic split-load board (2000s–2016)</strong> — has RCD protection
                but may have a plastic casing that does not comply with current regulations.
                Functional and reasonably safe, but an{' '}
                <SEOInternalLink href="/electrical-survey-before-buying">EICR</SEOInternalLink> will
                likely note the non-compliant casing as a C3 (improvement recommended).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Older MCB-only board (1980s–1990s)</strong> — has miniature circuit breakers
                but no RCD protection. Regulation 411.3.3 of BS 7671 requires RCD protection on
                socket-outlet circuits. Absence of RCDs is commonly recorded as a C2 (potentially
                dangerous) observation. Budget for a consumer unit replacement at £400 to £900.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuse board (pre-1980s)</strong> — ceramic fuse holders with
                rewirable fuse wire. No RCD protection. The board itself is serviceable, but its
                presence strongly suggests the wiring has not been significantly updated. Likely to
                generate multiple C2 observations and possibly C1 findings if the associated wiring
                is original rubber-insulated cable.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'sockets-and-wiring',
    heading: 'Sockets, Switches, and Visible Wiring',
    content: (
      <>
        <p>
          The sockets and switches throughout the property are indicators of when the electrical
          work was last updated. While aesthetics are not the concern, the style and number of
          socket outlets give you useful data.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Round-pin sockets</strong> — two-pin round-pin sockets indicate pre-1947
                wiring. Three-pin round-pin sockets indicate 1940s to early 1960s wiring. Both are
                signs the property requires a full rewire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Modern 13A rectangular sockets</strong> — these have been standard since
                approximately 1947. The style and brand can indicate when they were installed.
                Switched sockets have been the norm since the 1960s.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surface-mounted trunking</strong> — flat plastic surface-mounted cable
                trunking added on top of skirting boards is common when sockets have been added
                without full first-fix work. It is not necessarily dangerous but indicates the
                original installation lacked sufficient circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visible cables in loft and under floors</strong> — grey PVC-insulated twin
                and earth cable (T&amp;E) is modern and fine. Older cloth or rubber-sheathed cable
                is a concern. Lead-sheathed cable should be considered a priority for replacement.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'diy-warning-signs',
    heading: 'Evidence of DIY Electrical Work — What to Watch For',
    content: (
      <>
        <p>
          Uncertified DIY electrical work is one of the most common findings during house purchase
          inspections. Under Part P of the Building Regulations, most electrical work in a dwelling
          (including fitting new socket circuits, adding a consumer unit, or installing electric
          showers) must either be carried out by a registered competent person or be inspected and
          approved by the local authority building control.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask for electrical certificates</strong> — request copies of any Building
                Regulations certificates (Minor Works Certificates, Electrical Installation
                Certificates) for work done in the last 10 years. An extension with a new circuit, a
                kitchen refit, or an EV charger installation should all have certification. Missing
                certificates are a red flag.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mismatched fittings</strong> — sockets or switches of different styles in
                the same room, or consumer unit breakers from different manufacturers fitted
                together, suggest DIY additions without proper design.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-standard wiring routes</strong> — cables run across ceiling joists
                without protection (required under the building zones specified in BS 7671 Section
                522), or cables that enter socket back-boxes at unusual angles, suggest
                non-professional installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Garden electrical work</strong> — garden rooms, sheds, outbuildings with
                electricity, and external sockets all require proper certification. Uncertified
                sub-mains to outbuildings are common and potentially very dangerous.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you discover uncertified electrical work after purchase, you may be required by your
          insurer or mortgage lender to have the work inspected and brought into compliance. The
          cost falls on you as the new owner. This is another reason to commission an EICR before
          exchange of contracts.
        </p>
      </>
    ),
  },
  {
    id: 'pre-1966-properties',
    heading: 'Common Problems in Pre-1966 Properties',
    content: (
      <>
        <p>
          Properties built before 1966 are particularly likely to have electrical installations that
          have reached the end of their serviceable life. The post-war housing boom produced
          millions of homes with rubber-insulated wiring that is now 60 or more years old.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rubber-insulated wiring (VIR)</strong> — vulcanised india rubber insulation
                becomes brittle and cracks with age. The earthed conductors in early
                rubber-insulated systems were often bare copper, creating exposed live conductors in
                ceiling roses and junction boxes. This is a C1 (danger present) finding under BS
                7671 Section 631.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No earth on lighting circuits</strong> — pre-1966 lighting circuits often
                have no earth conductor. This means metal light fittings cannot be safely earthed.
                Class II (double-insulated) fittings can be used as a workaround, but the underlying
                lack of earthing is a C2 observation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT earthing systems</strong> — older rural and some suburban properties may
                have a TT (earth electrode) earthing system rather than the modern TN-S or TN-C-S
                (PME). TT systems require RCD protection on all circuits under Regulation 411.5.3 of
                BS 7671 and often need the earth electrode to be tested and possibly replaced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No main equipotential bonding</strong> — properties of this age frequently
                lack main protective bonding conductors to gas and water services. These are
                required under Regulation 411.3.1.2 of BS 7671 and their absence is a C2
                observation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For pre-1966 properties, budget for a full rewire as a likely cost. Partial remedial work
          on 60-year-old wiring is rarely cost-effective — electricians will often recommend a
          complete rewire rather than attempting piecemeal repairs on an installation that will
          continue to generate faults.
        </p>
      </>
    ),
  },
  {
    id: 'getting-an-eicr',
    heading: 'Getting an EICR During the Purchase Process',
    content: (
      <>
        <p>
          The best time to commission an{' '}
          <SEOInternalLink href="/electrical-survey-before-buying">
            Electrical Installation Condition Report
          </SEOInternalLink>{' '}
          is after your offer has been accepted but before exchange of contracts. This gives you the
          information you need to negotiate and the option to withdraw if the findings are serious,
          without being legally committed to the purchase.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who commissions it?</strong> — you commission the EICR at your own cost. The
                vendor must allow reasonable access for the inspection. Most vendors will cooperate
                as they understand it is a standard part of the purchase process for informed
                buyers. Cost is typically £150 to £400 for a typical three-bedroom house.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who carries it out?</strong> — the EICR must be carried out by a qualified
                electrician registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or
                equivalent). Verify qualifications and registration before booking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>What does it cover?</strong> — the EICR tests the condition of fixed
                electrical wiring, the consumer unit, earthing, bonding, and circuits throughout the
                property. It does not cover portable appliances. The inspector will carry out visual
                inspection and a series of electrical tests at each circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Satisfactory vs Unsatisfactory</strong> — the EICR is classified as
                Satisfactory (no C1 or C2 observations) or Unsatisfactory (one or more C1 or C2
                observations). A Satisfactory EICR with only C3 (improvement recommended)
                observations is a good result for an older property.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'negotiating',
    heading: 'Negotiating on Electrical Issues',
    content: (
      <>
        <p>
          A poor EICR is not necessarily a reason to withdraw from a purchase, but it is strong
          grounds to renegotiate. Electrical remedial work has a quantifiable cost — use that to
          your advantage.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get two or three quotes</strong> — before approaching the vendor, obtain
                written quotes for the remedial work from qualified electricians. This gives you a
                documented, evidence-based figure for your negotiation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Price reduction vs vendor remediation</strong> — a price reduction is
                usually preferable. Vendor-managed remediation may be rushed or carried out by the
                cheapest available contractor. A price reduction gives you control over the quality
                of work after completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retention</strong> — in some cases, your solicitor can arrange a retention —
                part of the purchase price held back at completion and released only when the
                remedial work has been completed and certified. This is less common but worth
                exploring for substantial works.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When to walk away</strong> — if the vendor refuses any concession and the
                remedial cost is significant (for example, a full rewire at £7,000 on a property
                where you have already negotiated to the maximum), withdrawing before exchange may
                be the right decision. You will lose your survey and EICR costs but avoid a much
                larger problem post-completion.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rewire-costs',
    heading: 'Rewire Costs to Factor Into Your Offer (2026 Prices)',
    content: (
      <>
        <p>
          A full rewire is the most significant electrical cost a buyer can face. Use these figures
          when assessing whether an offer price is fair and when negotiating with the vendor.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £2,500 to £4,000. Typically 1 to 2 days' work
                with a team of two. Includes consumer unit replacement, new circuits, sockets, and
                switches.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom house or flat</strong> — £3,500 to £5,500. Two to three days.
                Redecoration after chasing channels in walls is an additional cost — budget £1,000
                to £2,000 for basic redecoration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £4,500 to £7,000. The most common rewire
                scenario. Three to four days. Prices in London and the South East are typically
                £6,000 to £10,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom house</strong> — £6,000 to £10,000. Four to five days. Complex
                Victorian properties with solid masonry walls cost more due to the difficulty of
                chasing channels.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement only</strong> — £400 to £900. If the wiring is in
                good condition but the consumer unit is outdated, replacement alone is a much
                smaller cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD retrofit and bonding</strong> — £300 to £700. Fitting a new consumer
                unit with RCDs plus main bonding conductors, if the wiring itself is otherwise
                serviceable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These costs do not include VAT (which is charged at 5% on residential rewires) or Building
          Regulations fees. Always ensure the electrician will provide an Electrical Installation
          Certificate (EIC) on completion — this is the document you will need when you come to sell
          the property.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: House Purchase EICR Work',
    content: (
      <>
        <p>
          House purchase EICRs are a growing and lucrative source of work. Buyers are increasingly
          commissioning EICRs as part of their due diligence, and a good EICR that reveals remedial
          work frequently leads directly to a rewire or consumer unit replacement quote.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICRs on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete the full report on your phone while still at the property. Send the
                  PDF to the buyer before you leave. House purchase EICRs are often time-sensitive —
                  buyers need the report quickly to progress their purchase.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote the Remedial Work Immediately</h4>
                <p className="text-white text-sm leading-relaxed">
                  When C1 or C2 observations are found, quote the remedial work while still on site
                  using the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting tool
                  </SEOInternalLink>
                  . The buyer needs this quote to negotiate with the vendor — they will use
                  whichever electrician gives them a quote quickly. Being first wins the work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Win house purchase EICR work with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. Complete the report before you leave the property. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BuyingHouseElectricalGuidePage() {
  return (
    <GuideTemplate
      title="Buying a House Electrical Checklist UK | What to Check Before Buying"
      description="Complete guide to electrical checks when buying a house in the UK. What to look for at viewing, getting an EICR during purchase, pre-1966 wiring dangers, negotiating on electrical issues, and 2026 rewire costs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Buyer's Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          Buying a House Electrical Checklist UK:{' '}
          <span className="text-yellow-400">What to Check Before You Buy</span>
        </>
      }
      heroSubtitle="Most buyers focus on kitchens and roof condition — but the electrical installation can be one of the most expensive things to put right. This guide covers what to check at viewings, how to read a consumer unit, pre-1966 wiring dangers, commissioning an EICR during purchase, and using the findings to negotiate."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Checks When Buying a House"
      relatedPages={relatedPages}
      ctaHeading="Complete House Purchase EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. Send the report to buyers before you leave the property. 7-day free trial."
    />
  );
}
