import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Home,
  Zap,
  FileCheck2,
  CheckCircle,
  Lightbulb,
  Phone,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Safety', href: '/electrical-safety-at-home' },
];

const tocItems = [
  { id: 'common-hazards', label: 'Common Electrical Hazards' },
  { id: 'overloaded-sockets', label: 'Overloaded Sockets' },
  { id: 'damaged-leads', label: 'Damaged Leads & Cables' },
  { id: 'diy-wiring', label: 'DIY Wiring Dangers' },
  { id: 'testing-rcds', label: 'How to Test Your RCD' },
  { id: 'when-to-call', label: 'When to Call an Electrician' },
  { id: 'children-safety', label: 'Electrical Safety for Children' },
  { id: 'christmas-safety', label: 'Christmas Decoration Safety' },
  { id: 'extension-leads', label: 'Extension Lead Safety' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Overloaded sockets are one of the leading causes of electrical fires in UK homes — never exceed the 13A maximum load on a single socket or extension lead.',
  'Test your RCD (Residual Current Device) monthly by pressing the test button. If it does not trip, call an electrician immediately.',
  'RoSPA does not recommend socket covers for standard UK sockets — modern UK sockets have built-in shutters that are safer than plastic covers.',
  'Damaged or frayed cables should be replaced immediately — wrapping with insulating tape is not a safe fix.',
  'Any new wiring work in a kitchen or bathroom must be notified to your local building control authority under Part P of the Building Regulations.',
  'If you smell burning from an electrical outlet or fitting, turn off the circuit at your consumer unit and call a qualified electrician.',
];

const faqs = [
  {
    question: 'Are socket covers safe for children in the UK?',
    answer:
      'No — RoSPA (Royal Society for the Prevention of Accidents) does not recommend socket covers for standard UK sockets. UK sockets are designed with built-in shutters that only open when both pins of a plug are inserted simultaneously. Socket covers can actually defeat these safety shutters if they are poorly designed. The Health and Safety Executive (HSE) and RoSPA both advise against using socket covers.',
  },
  {
    question: 'How do I test my RCD?',
    answer:
      'Press the test button (usually labelled "T" or "Test") on your RCD or on your consumer unit. The RCD should trip immediately, cutting power to the protected circuits. Reset it by pushing the switch back to the on position. You should do this monthly. If the RCD does not trip when you press the test button, or trips but cannot be reset, call a qualified electrician — the RCD may be faulty and not providing protection.',
  },
  {
    question: 'What is the maximum load I can put on a socket?',
    answer:
      'A standard UK socket outlet is rated at 13 amps. The total load of all appliances plugged into that socket (including via an extension lead) must not exceed 13A. To calculate the load in amps, divide the wattage by 230V. For example, a 2,500W kettle draws approximately 10.9A on its own, leaving very little headroom for other appliances on the same circuit.',
  },
  {
    question: 'Is it safe to do my own electrical work at home?',
    answer:
      'Minor tasks such as replacing a light fitting or a socket faceplate are generally permitted, but any notifiable electrical work — including new circuits, work in kitchens, work in bathrooms, or any work in a special location — must be either carried out by a registered electrician or notified to your local building control authority under Part P of the Building Regulations. Unregistered notifiable work can affect your home insurance and cause problems when selling your property.',
  },
  {
    question: 'What should I do if I smell burning from an electrical socket?',
    answer:
      'Turn off the power to that circuit at your consumer unit (fuse box) immediately. Do not use the socket or circuit until it has been inspected by a qualified electrician. A burning smell indicates overheating, arcing, or a loose connection — all of which are serious fire hazards. If you see smoke or flames, call 999 immediately.',
  },
  {
    question: 'How often should I have my home\'s electrics checked?',
    answer:
      'The IET (Institution of Engineering and Technology) recommends an Electrical Installation Condition Report (EICR) every ten years for owner-occupied homes, or every five years for privately rented properties (which is a legal requirement for landlords). If you move into an older property, have had significant electrical work done, or notice any warning signs such as flickering lights, frequent trips, or discoloured sockets, arrange an inspection sooner.',
  },
  {
    question: 'What does it mean when my RCD keeps tripping?',
    answer:
      'Frequent RCD tripping indicates a fault — most commonly a damaged appliance, a wiring fault, or a genuine earth leakage current. Try unplugging all appliances on the affected circuits and resetting the RCD. If it holds, plug appliances back in one at a time to identify the faulty one. If the RCD trips immediately with no appliances plugged in, there is a wiring fault and you should call a qualified electrician.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/extension-lead-safety',
    title: 'Extension Lead Safety',
    description:
      'Safe use of extension leads and multi-plugs, load limits, and when to get a socket installed.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/finding-emergency-electrician',
    title: 'Finding an Emergency Electrician',
    description:
      'What counts as an electrical emergency and how to find a 24/7 registered electrician.',
    icon: Phone,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord EICR requirements, compliance deadlines, and penalties.',
    icon: Home,
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
    id: 'common-hazards',
    heading: 'Common Electrical Hazards in UK Homes',
    content: (
      <>
        <p>
          Electricity is responsible for around 20,000 fires in UK homes each year, according to
          Electrical Safety First. Most of these fires are preventable. Understanding the most
          common electrical hazards is the first step to keeping your household safe.
        </p>
        <p>
          The most frequently occurring hazards are overloaded sockets and extension leads,
          damaged or deteriorated cables, and unauthorised DIY wiring. Each of these can cause
          electric shock, fire, or both. Modern homes protected by RCDs (Residual Current Devices)
          have significantly better protection than older properties, but no electrical protection
          system is a substitute for good habits and a properly maintained installation.
        </p>
      </>
    ),
  },
  {
    id: 'overloaded-sockets',
    heading: 'Overloaded Sockets: The Most Common Fire Risk',
    content: (
      <>
        <p>
          A standard UK socket outlet is rated at 13 amperes (A). When the total load of all
          appliances connected to a socket — including those on an extension lead — exceeds this
          limit, the cable and socket can overheat. This is one of the leading causes of electrical
          fires in UK homes.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calculate your load</strong> — divide the wattage of each appliance by
                230V to get the current in amps. A 2,500W kettle draws approximately 10.9A, a
                1,000W microwave draws 4.3A, and a 700W toaster draws 3A. The total must not
                exceed 13A per socket outlet.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Never use cube adaptors</strong> — the old-style cube (block) adaptors
                that allow two or three plugs in one socket are particularly dangerous as they
                concentrate load at a single outlet. Use a fused extension lead with individual
                switched sockets instead.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-current appliances need dedicated sockets</strong> — kettles, washing
                machines, tumble dryers, dishwashers, and electric cookers draw large currents and
                should ideally have their own dedicated socket outlet or, in the case of cookers,
                a dedicated circuit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          See the full guide to{' '}
          <SEOInternalLink href="/extension-lead-safety">
            extension lead safety
          </SEOInternalLink>{' '}
          for load calculations. If you regularly need more sockets than you have, the safest
          solution is to have additional socket outlets installed by a registered electrician —
          not to daisy-chain extension leads.
        </p>
      </>
    ),
  },
  {
    id: 'damaged-leads',
    heading: 'Damaged Leads and Cables: Do Not Use Insulating Tape',
    content: (
      <>
        <p>
          Damaged, frayed, or cracked cables and flexes are a serious hazard. Exposed conductors
          can cause electric shock if touched, and damaged insulation can allow arcing that leads
          to fire. Cable damage is particularly common on appliance leads that run under rugs,
          are trapped under furniture, or are regularly kinked at the point where the flex enters
          the plug.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replace damaged flexes — do not tape them</strong> — wrapping a damaged
                flex in insulating tape is not a safe repair. The tape cannot restore the
                structural integrity of the insulation, may conceal worsening damage, and will
                eventually fail. Replace the flex or the entire appliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check cords regularly</strong> — inspect appliance leads where they enter
                the plug and where they enter the appliance. These points take the most stress and
                are where damage most commonly starts. If the outer sheath is cracked or the inner
                conductors are visible, replace the flex immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Route cables safely</strong> — never run cables under rugs or carpets
                (where they can be damaged and overheat without being visible), around door
                frames, or in areas where they will be regularly walked on or compressed.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'diy-wiring',
    heading: 'DIY Wiring: What Is and Is Not Allowed',
    content: (
      <>
        <p>
          Part P of the Building Regulations governs electrical work in domestic premises in
          England and Wales. Not all electrical work requires notification — but the most
          important and risky work does.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Generally permitted without notification</strong> — replacing like-for-like
                fittings such as swapping a socket faceplate, replacing a ceiling light fitting
                (not in a bathroom), or replacing a consumer unit like-for-like. However, the
                work must still be carried out to BS 7671 standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notifiable work</strong> — installing a new circuit, adding a circuit
                in a kitchen or bathroom, any work in a bathroom (including replacing a fitting),
                installing electrical equipment in a garden, and installing solar PV or EV
                charging equipment. This work must be done by a registered competent person or
                notified to building control.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consequences of unpermitted work</strong> — completing notifiable work
                without registration or building control notification can invalidate your home
                insurance, cause problems when selling your property, and — most importantly —
                leave unsafe wiring without the independent verification a registered electrician
                provides.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'testing-rcds',
    heading: 'How to Test Your RCD Monthly',
    content: (
      <>
        <p>
          A Residual Current Device (RCD) monitors the electrical current flowing in a circuit.
          If it detects a difference between the live and neutral conductors — indicating current
          is leaking to earth, potentially through a person — it cuts the power in milliseconds.
          RCDs save lives, but they must be tested regularly to verify they are working correctly.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1 — Locate your RCDs</strong> — open your consumer unit (fuse box).
                RCDs are typically the larger switches with a T or Test button. Modern consumer
                units may have RCBO devices (combined RCD and circuit breaker) on individual
                circuits, or a main RCD covering multiple circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2 — Press the test button</strong> — press the button firmly. The
                RCD should trip immediately, clicking to the off position and cutting power to
                all circuits it protects. This will turn off lights and appliances on those
                circuits — be prepared for this.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3 — Reset</strong> — push the RCD switch back to the on position.
                Power should be restored to all protected circuits. If the RCD does not trip when
                tested, or cannot be reset after testing, call a qualified electrician — the RCD
                may be faulty and must be replaced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test monthly</strong> — set a reminder to test your RCDs monthly. Many
                households test on the first of every month. A functioning RCD can be the
                difference between a minor incident and a fatality.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'when-to-call',
    heading: 'When to Call a Qualified Electrician',
    content: (
      <>
        <p>
          Some electrical issues require immediate professional attention. Do not attempt to
          investigate or repair these yourself.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning smell</strong> from a socket, switch, or fitting
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scorch marks or discolouration</strong> around a socket or switch
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sparking</strong> from a socket, switch, or appliance connection
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Frequent circuit breaker or RCD trips</strong> without an obvious cause
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flickering lights</strong> that are not caused by a faulty bulb
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tingling sensation</strong> when touching an appliance or switch
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Water near electrics</strong> — any situation where water has contacted
                electrical fittings requires professional assessment before the circuit is
                re-energised
              </span>
            </li>
          </ul>
        </div>
        <p>
          Find a registered electrician through the NICEIC, NAPIT, or ELECSA online registers.
          All registered electricians are assessed for competence and carry professional
          indemnity insurance. For emergencies, see our guide on{' '}
          <SEOInternalLink href="/finding-emergency-electrician">
            finding an emergency electrician
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'children-safety',
    heading: 'Electrical Safety for Children: The Truth About Socket Covers',
    content: (
      <>
        <p>
          Many parents instinctively reach for plastic socket covers to protect young children.
          However, RoSPA (the Royal Society for the Prevention of Accidents) and the Health and
          Safety Executive do not recommend them — and for good reason.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>UK sockets already have built-in shutters</strong> — standard BS 1363
                socket outlets (the UK standard) have internal shutters that only open when both
                pins of a plug are inserted simultaneously. A child cannot insert a single object
                such as a finger or a hairpin and access live conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket covers can defeat the shutters</strong> — poorly designed socket
                covers — particularly those with only a single earth pin — can actually open the
                live and neutral shutters when inserted, creating a hazard rather than preventing
                one. The British Standards Institution has raised concerns about non-compliant
                socket covers on the market.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supervision and education</strong> — teaching children from an early age
                not to touch electrical sockets and appliances, and supervising young children
                near electrical equipment, is far more effective than socket covers.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'christmas-safety',
    heading: 'Christmas Decoration Electrical Safety',
    content: (
      <>
        <p>
          Christmas is a period of significantly increased electrical fire risk. The combination
          of additional electrical load from lights, drier indoor conditions, and proximity of
          decorations to heat sources increases the risk of both fire and electric shock.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check for the CE or UKCA mark</strong> — only buy Christmas lights marked
                with the UKCA (UK Conformity Assessed) or CE mark, indicating they meet UK or
                European safety standards. Avoid very cheap lights from unknown sources.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check lights before use</strong> — inspect lights each year for damaged
                wires, broken bulbs, or loose connections. Discard any sets with damaged wiring.
                Do not attempt to repair damaged light sets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not leave lights on unattended</strong> — turn off Christmas lights
                when leaving the house and before going to bed. Use a timer switch to automate
                this if helpful.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Indoor and outdoor lights are different</strong> — outdoor Christmas lights
                must be rated for outdoor use with an IP rating of at least IP44. Using indoor
                lights outdoors risks electric shock or fire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keep lights away from real trees</strong> — real Christmas trees dry out
                over the season and become increasingly flammable. Keep lights well clear of dry
                branches and never use older lights that may run warm.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'extension-leads',
    heading: 'Safe Use of Extension Leads at Home',
    content: (
      <>
        <p>
          Extension leads are one of the most misused items in UK homes. Used correctly they are
          safe; used incorrectly they present a significant fire risk.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Never daisy-chain extension leads</strong> — plugging one extension lead
                into another multiplies the risk of overloading and fire. Use a single extension
                lead with enough sockets for your needs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Uncoil cable reels fully</strong> — a coiled extension cable carrying
                current generates heat. A fully coiled 13A cable reel can reach temperatures high
                enough to melt the insulation and cause a fire. Always fully uncoil cable reels
                before use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consider a permanent socket</strong> — if you regularly need an extension
                lead in the same location, have a qualified electrician install an additional
                socket outlet. This is a safer and tidier long-term solution.
              </span>
            </li>
          </ul>
        </div>
        <p>
          See the full guide to{' '}
          <SEOInternalLink href="/extension-lead-safety">
            extension lead safety
          </SEOInternalLink>{' '}
          for more detail on load calculations, RCD-protected leads, and outdoor use.
        </p>
        <SEOAppBridge
          title="Are you an electrician? Complete EICRs faster with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. Start your 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalSafetyAtHomePage() {
  return (
    <GuideTemplate
      title="Electrical Safety at Home UK | Home Electrical Safety Guide"
      description="Complete guide to electrical safety at home in the UK. Common hazards, how to test RCDs monthly, DIY wiring rules, socket covers for children (RoSPA advice), Christmas light safety, and when to call an electrician."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Electrical Safety at Home UK:{' '}
          <span className="text-yellow-400">Your Complete Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about keeping your home electrically safe — from testing your RCD monthly and avoiding overloaded sockets, to the truth about socket covers for children and Christmas decoration safety."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Home Electrical Safety"
      relatedPages={relatedPages}
      ctaHeading="Are You an Electrician? Try Elec-Mate Free"
      ctaSubheading="Complete EICRs on your phone with AI board scanning, voice test entry, and instant PDF export. Join 430+ UK electricians. 7-day free trial, cancel anytime."
    />
  );
}
