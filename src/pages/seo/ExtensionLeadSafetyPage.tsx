import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Zap,
  FileCheck2,
  CheckCircle,
  Home,
  Thermometer,
  PoundSterling,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Safety', href: '/guides/electrical-safety-at-home' },
  { label: 'Extension Lead Safety', href: '/extension-lead-safety' },
];

const tocItems = [
  { id: 'why-it-matters', label: 'Why Extension Lead Safety Matters' },
  { id: 'load-calculation', label: 'Load Calculation' },
  { id: 'daisy-chaining', label: 'Daisy-Chaining' },
  { id: 'rcd-protected-leads', label: 'RCD-Protected Extension Leads' },
  { id: 'coiled-cable-reels', label: 'Coiled Cable Reels' },
  { id: 'outdoor-use', label: 'Outdoor Extension Leads' },
  { id: 'when-to-upgrade', label: 'When to Get a Socket Installed' },
  { id: 'choosing-a-lead', label: 'Choosing a Safe Extension Lead' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Never exceed 13A total load across all appliances on a single extension lead — overloading is the leading cause of extension lead fires.',
  'Never daisy-chain extension leads (plug one into another) — this is a fire risk and a common cause of overloading.',
  'Always fully uncoil cable drum extension leads before use — a coiled 13A lead can overheat and melt its own insulation.',
  'Outdoor extension leads must have an IP44 rating or higher and must be plugged into an RCD-protected socket.',
  'RCD-protected extension leads add meaningful protection for power tools and garden equipment.',
  'If you need an extension lead permanently in the same spot, the right solution is to have an additional socket outlet installed by a registered electrician.',
];

const faqs = [
  {
    question: 'How many appliances can I plug into an extension lead?',
    answer:
      'There is no fixed maximum number of appliances — what matters is the total current draw. A standard UK extension lead is rated at 13A at 230V, giving a maximum power load of around 3,000W. Add up the wattages of all appliances you intend to use simultaneously and divide by 230 to get the total current in amps. This must not exceed 13A. High-wattage appliances such as kettles (2,500W / 10.9A) or electric heaters (2,000–3,000W) should ideally not share an extension lead with other appliances.',
  },
  {
    question: 'Is it safe to plug an extension lead into another extension lead?',
    answer:
      'No — daisy-chaining extension leads (plugging one into another) is unsafe and should never be done. It multiplies the risk of overloading the circuit and the original socket. The connection point between the two leads also creates a potential arcing and overheating hazard. If you need more sockets, use a single extension lead with an adequate number of outlets, or have additional sockets installed.',
  },
  {
    question: 'Do I need to uncoil my extension lead fully?',
    answer:
      'Yes, for cable drum extension leads (cable reels). When a cable is coiled, the magnetic fields of individual turns cancel out less effectively and the insulation acts as a heat trap. A fully coiled 13A rated cable drum extension carrying a significant load can reach temperatures sufficient to melt its own insulation and cause a fire. Always fully uncoil cable drum reels before use, even if you only need a short length.',
  },
  {
    question: 'What IP rating do I need for an outdoor extension lead?',
    answer:
      'Outdoor extension leads must have an IP (Ingress Protection) rating of at least IP44, which means protected against solid objects greater than 1mm and against water splashing from any direction. For use in very wet conditions or near irrigation, IP55 or higher is preferable. Never use an indoor-rated extension lead outdoors — the insulation and connectors are not designed to withstand moisture.',
  },
  {
    question: 'What is an RCD-protected extension lead?',
    answer:
      'An RCD-protected extension lead contains a built-in Residual Current Device (RCD) that trips in milliseconds if it detects a current imbalance suggesting electricity is flowing through a person. These are particularly valuable for power tools, garden equipment, and any situation where the lead may be cut or damaged. Look for leads with a 30mA RCD — this is the rating that provides protection against electrocution.',
  },
  {
    question: 'Can I use an extension lead permanently?',
    answer:
      'Extension leads are designed for temporary use. Using an extension lead as a permanent solution — especially under carpets, around door frames, or in hidden locations — is a fire risk. If you regularly need an extension lead in the same position, the correct solution is to have a registered electrician install additional socket outlets. This is safer, neater, and protects your home insurance validity.',
  },
  {
    question: 'What fuse should be in an extension lead plug?',
    answer:
      'Most standard extension leads are rated at 13A, so the plug should contain a 13A fuse (coloured brown). Some lighter-duty leads or trailing sockets rated below 13A may be fitted with a 3A (red) or 5A (black) fuse — check the lead\'s rating label. Never replace a blown fuse with one of a higher rating to "fix" a tripping problem — a blown fuse indicates a fault that must be investigated.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-safety-at-home',
    title: 'Electrical Safety at Home',
    description:
      'Complete guide to home electrical safety including RCD testing, socket hazards, and DIY rules.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/power-surge-protection',
    title: 'Power Surge Protection',
    description:
      'SPDs explained — Type 1, Type 2, and Type 3 surge protection devices and BS 7671 requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/finding-emergency-electrician',
    title: 'Finding an Emergency Electrician',
    description:
      'What counts as an electrical emergency and how to find a 24/7 NICEIC-registered electrician.',
    icon: ShieldCheck,
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
    id: 'why-it-matters',
    heading: 'Why Extension Lead Safety Matters',
    content: (
      <>
        <p>
          Extension leads are one of the most commonly misused items in UK homes and workplaces.
          Electrical Safety First estimates that overloaded extension leads cause thousands of fires
          in the UK every year. The combination of multiple high-wattage appliances, coiled cables,
          and the temptation to daisy-chain leads creates conditions that can result in fire and
          electric shock.
        </p>
        <p>
          The good news is that extension lead hazards are almost entirely preventable. A small
          amount of knowledge about load limits, lead types, and safe usage turns a potential hazard
          into a safe, useful tool.
        </p>
      </>
    ),
  },
  {
    id: 'load-calculation',
    heading: 'Load Calculation: Do Not Exceed 13A',
    content: (
      <>
        <p>
          Every UK standard extension lead is rated at a maximum of 13 amperes (A) at 230 volts,
          giving a maximum power capacity of approximately 3,000 watts (W). Before plugging in
          multiple appliances, calculate the total load.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <p className="font-semibold text-white mb-3">Load calculation: Amps = Watts ÷ 230V</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>Kettle (2,500W) — approximately 10.9A</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>Electric heater (2,000W) — approximately 8.7A</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>Microwave (1,000W) — approximately 4.3A</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>Laptop charger (65W) — approximately 0.3A</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>Television (100W) — approximately 0.4A</span>
            </li>
          </ul>
          <p className="text-white mt-3 text-sm">
            A kettle alone uses nearly 11A — almost the entire capacity of a 13A extension lead.
            Never plug a kettle and a microwave into the same extension lead simultaneously.
          </p>
        </div>
        <p>
          Check the wattage label on the back or underside of each appliance and add up the totals.
          Most extension leads also have a maximum load label — always respect it. Some economy
          leads are rated at less than 13A despite having a 13A plug fuse.
        </p>
      </>
    ),
  },
  {
    id: 'daisy-chaining',
    heading: 'Daisy-Chaining Extension Leads: Never Do It',
    content: (
      <>
        <p>
          Daisy-chaining — plugging one extension lead into another — is one of the most dangerous
          things you can do with extension leads. It is prohibited in many workplace settings and is
          a common cause of electrical fires in homes.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Compound overloading risk</strong> — the total load on a daisy-chain appears
                at the original socket outlet and at the connection between the two leads. The
                original socket, its wiring, and the plug connection all carry the full combined
                load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Arcing at the connection point</strong> — the connection between the first
                lead's socket and the second lead's plug is a loose mechanical contact that can arc
                if it works loose under load. Arcing generates heat and is a direct fire hazard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>The correct solution</strong> — use a single extension lead with sufficient
                sockets, or have additional socket outlets installed by a registered electrician.
                See the section below on when to upgrade to a permanent socket.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-protected-leads',
    heading: 'RCD-Protected Extension Leads',
    content: (
      <>
        <p>
          An RCD (Residual Current Device) protected extension lead contains a built-in RCD that
          trips in milliseconds if electricity starts flowing through an unintended path — for
          example, through a person who has cut through the cable or touched a live conductor. These
          leads significantly reduce the risk of fatal electric shock.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use for power tools</strong> — always use an RCD-protected extension lead or
                plug-in RCD adaptor when using power tools such as drills, circular saws, and angle
                grinders. A 30mA RCD can trip fast enough to prevent a fatal shock even if you cut
                through the cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use for garden equipment</strong> — lawnmowers, hedge trimmers, and garden
                power tools must be used with RCD protection. Regulation 411.3.3 of BS 7671 requires
                RCD protection (not exceeding 30mA) for socket outlets in certain locations used to
                supply portable equipment outdoors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>30mA is the protective rating</strong> — only 30mA RCDs provide protection
                against electrocution. Higher-rated RCDs (100mA, 300mA) protect against fire but not
                against fatal shock. Ensure your RCD-protected lead is rated at 30mA.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the sockets in your home or workplace are not already RCD-protected, you can also use a
          plug-in RCD adaptor (a small device that fits between the plug and the socket) to add
          protection. These cost around £10 to £20 and provide 30mA protection for the appliance
          plugged into them.
        </p>
      </>
    ),
  },
  {
    id: 'coiled-cable-reels',
    heading: 'Coiled Cable Reels: Always Uncoil Fully',
    content: (
      <>
        <p>
          Cable drum extension leads — the type wound on a reel — present a specific hazard that
          flat extension leads do not: overheating when used while coiled.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Why coiling causes overheating</strong> — when a conductor carries current,
                it generates heat proportional to the square of the current (P = I²R). In a coil,
                this heat cannot dissipate effectively — each turn insulates adjacent turns. A 13A
                cable carrying significant current while coiled can reach temperatures far above its
                insulation rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>The fire risk is real</strong> — there are documented cases of cable drum
                extension leads causing fires when used coiled under load. The insulation melts,
                conductors contact each other or the drum casing, and a fire starts. This can happen
                in minutes with a high load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>The rule: always fully uncoil</strong> — before plugging in any load, unwind
                the entire cable from the drum. This applies even if you only need a short length.
                Some cable drums have a coiled-use rating printed on them at a very low wattage — if
                so, only use at that rating or lower if you cannot fully uncoil.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'outdoor-use',
    heading: 'Outdoor Extension Leads: IP Rating and RCD Requirements',
    content: (
      <>
        <p>
          Using the wrong extension lead outdoors is a common cause of electric shock. Indoor
          extension leads are not weatherproof and must not be used in gardens, on patios, or in any
          location where they may be exposed to rain, damp, or moisture.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP44 minimum for outdoor use</strong> — IP44 means the lead and its
                connections are protected against solid particles greater than 1mm and against water
                splashing from any direction. Look for the IP44 (or higher) marking on the lead
                itself, not just on the packaging.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Connect to an RCD-protected socket</strong> — outdoor socket outlets must be
                RCD-protected under BS 7671 Regulation 411.3.3. If your outdoor socket is not
                RCD-protected, use a plug-in RCD adaptor rated at 30mA.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keep connections dry</strong> — even weatherproof leads should not have
                their socket end submerged or left in standing water. If connections become wet,
                allow them to dry completely before reconnecting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Store indoors after use</strong> — UV exposure, frost, and temperature
                cycles degrade extension lead insulation over time. Store outdoor leads indoors and
                inspect them before each use for cracking or damage.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'when-to-upgrade',
    heading: 'When to Get a Socket Installed Instead',
    content: (
      <>
        <p>
          Extension leads are designed as a temporary solution. If you find yourself regularly using
          an extension lead in the same location, or running leads across floors, under rugs, or
          through doorways, it is time to have a qualified electrician install additional socket
          outlets.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost</strong> — adding a double socket outlet typically costs £80 to £200
                depending on location and the ease of running new cabling. This is a one-time cost
                that eliminates a permanent fire risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance and compliance</strong> — a properly installed socket outlet
                fitted by a registered electrician comes with an Electrical Installation Certificate
                (EIC) or a Minor Works Certificate, demonstrating compliance with Part P of the
                Building Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdoor sockets</strong> — if you regularly use power tools or garden
                equipment, having a dedicated weatherproof outdoor socket installed is significantly
                safer than running an extension lead from an indoor socket.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Find a NICEIC or NAPIT registered electrician to carry out this work. All notifiable work
          (including new socket circuits) must be registered with building control or completed by a
          registered competent person who self-certifies the work.
        </p>
      </>
    ),
  },
  {
    id: 'choosing-a-lead',
    heading: 'Choosing a Safe Extension Lead',
    content: (
      <>
        <p>
          Not all extension leads on the UK market are equal. Very cheap leads may use undersized
          conductors or sub-standard insulation, making them unsafe at their rated current.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Look for UKCA or CE marking</strong> — this confirms the lead has been
                assessed against UK or European safety standards. Avoid very cheap leads without
                clear conformity markings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check the conductor size</strong> — a 13A extension lead should have
                conductors of at least 1.25mm². Leads with thinner conductors may overheat before
                the 13A fuse blows. Good-quality leads will state the conductor size on the lead
                itself or packaging.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Individual switched sockets</strong> — extension leads with individually
                switched socket outlets make it easy to turn off appliances without unplugging them,
                reducing the total standby load and making the lead safer and more convenient.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surge protection for sensitive electronics</strong> — for computers,
                televisions, and audio equipment, consider a surge-protected extension lead. These
                contain metal oxide varistors (MOVs) that absorb voltage spikes. See our guide on{' '}
                <SEOInternalLink href="/power-surge-protection">
                  power surge protection
                </SEOInternalLink>{' '}
                for more detail.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Are you an electrician? Manage jobs and certificates with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, quoting, and invoicing. Start your 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ExtensionLeadSafetyPage() {
  return (
    <GuideTemplate
      title="Extension Lead Safety UK | Safe Use of Extension Leads & Multi-Plugs"
      description="Complete guide to safe extension lead use in the UK. Load calculations (do not exceed 13A), daisy-chaining dangers, RCD-protected leads, coiled cable reel fire risk, outdoor IP ratings, and when to get a socket installed instead."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Extension Lead Safety UK: <span className="text-yellow-400">The Complete Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about using extension leads safely in the UK — from calculating loads and avoiding daisy-chaining, to choosing RCD-protected leads and knowing when to get a permanent socket installed."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Extension Lead Safety"
      relatedPages={relatedPages}
      ctaHeading="Are You an Electrician? Try Elec-Mate Free"
      ctaSubheading="Complete EICRs on your phone, generate quotes instantly, and manage all your certificates in one place. Join 1,000+ UK electricians. 7-day free trial."
    />
  );
}
