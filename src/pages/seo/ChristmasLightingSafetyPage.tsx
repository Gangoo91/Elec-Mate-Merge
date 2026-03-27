import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Zap,
  Timer,
  Droplets,
  Cable,
  GraduationCap,
  ClipboardCheck,
  ThermometerSun,
  Plug,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Safety', href: '/guides/electrical-safety-tips' },
  { label: 'Christmas Lighting Safety', href: '/guides/christmas-lighting-safety' },
];

const tocItems = [
  { id: 'overview', label: 'Christmas Lighting Safety Overview' },
  { id: 'indoor-vs-outdoor', label: 'Indoor vs Outdoor Lighting' },
  { id: 'ip-ratings', label: 'IP Ratings for Outdoor Lights' },
  { id: 'overloading', label: 'Overloading Sockets and Circuits' },
  { id: 'commercial-pat', label: 'PAT Testing for Commercial Displays' },
  { id: 'timer-switches', label: 'Timer Switches and Automation' },
  { id: 'rcd-protection', label: 'RCD Protection' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Indoor Christmas lights must not be used outdoors — they lack the IP rating and insulation needed to withstand moisture, which creates a serious electric shock risk.',
  'Outdoor lights must be rated at least IP44 (protected against splashing water from any direction) and connected via an RCD-protected circuit in accordance with BS 7671 Regulation 411.3.3.',
  'Overloading sockets with multiple adaptors and extension leads is one of the most common causes of electrical fires during the Christmas period — always check the total load against the circuit rating.',
  'Commercial Christmas lighting displays (shopping centres, high streets, pubs, restaurants) require PAT testing before each season and a formal risk assessment under the Electricity at Work Regulations 1989.',
  'Timer switches reduce the risk of overheating by ensuring lights are not left on continuously — use a timer or smart plug to limit operating hours to 8 to 10 hours per day.',
];

const faqs = [
  {
    question: 'Can I use indoor Christmas lights outdoors?',
    answer:
      'No. Indoor Christmas lights are not designed to withstand moisture, rain, or frost. They lack the IP (Ingress Protection) rating needed for outdoor use. Using indoor lights outdoors exposes live parts to water, creating a serious electric shock risk. Always check the packaging or the label on the transformer — outdoor-rated lights will be marked IP44 or higher. If the label does not specify an IP rating, assume the lights are for indoor use only.',
  },
  {
    question: 'What IP rating do I need for outdoor Christmas lights?',
    answer:
      'Outdoor Christmas lights should be rated at least IP44. The first digit (4) means protected against solid objects larger than 1mm (wires, screws). The second digit (4) means protected against splashing water from any direction. For lights that will be close to the ground, in areas prone to puddles, or exposed to heavy rain, IP65 (dust-tight and protected against water jets) is a better choice. Always check the IP rating on the product packaging before purchasing.',
  },
  {
    question: 'How many Christmas lights can I plug into one socket?',
    answer:
      'A standard 13A socket on a ring circuit can supply up to 3,000W (13A x 230V). However, you should not load a socket to its maximum. As a practical rule, keep the total load on any one socket below 2,500W. Most LED Christmas light sets draw between 5W and 50W, so the wattage limit is rarely the problem — the danger comes from daisy-chaining multiple extension leads and adaptors, which creates loose connections and overheating at the plug and adaptor joints. Use one good-quality extension lead rated for the total load, and never daisy-chain extension leads.',
  },
  {
    question: 'Do commercial Christmas lighting displays need PAT testing?',
    answer:
      'Yes. Under the Electricity at Work Regulations 1989, employers and duty holders must ensure that all electrical equipment is maintained in a safe condition. For commercial Christmas lighting displays — in shops, restaurants, pubs, shopping centres, and high street installations — PAT testing before each season is the established method of demonstrating compliance. The test confirms the insulation integrity, earth continuity (for Class I equipment), and visual condition of the lights, cables, plugs, and transformers. Records should be kept for at least 5 years.',
  },
  {
    question: 'Should Christmas lights be on an RCD-protected circuit?',
    answer:
      'Yes, especially for outdoor lights. BS 7671 Regulation 411.3.3 requires additional protection by an RCD with a rated residual operating current not exceeding 30mA for socket-outlets with a rated current not exceeding 32A. This covers the sockets that Christmas lights are typically plugged into. If the property consumer unit does not have RCD protection on the relevant circuit (common in older installations), a plug-in RCD adaptor provides the same protection and costs under £15. For commercial displays and outdoor installations, RCD protection is essential.',
  },
  {
    question: 'How long can I leave Christmas lights on?',
    answer:
      'LED Christmas lights generate very little heat and are safe to run for extended periods, but it is still good practice to switch them off overnight and when the property is unoccupied. Older incandescent lights generate significant heat and should not run for more than 8 to 10 hours continuously, as sustained heat near curtains, carpets, or a dry Christmas tree creates a fire risk. A plug-in timer switch or smart plug is the easiest way to automate on/off schedules and remove the risk of forgetting to switch them off.',
  },
  {
    question: 'What should I check on Christmas lights before using them each year?',
    answer:
      'Before using Christmas lights each season, carry out a visual inspection: check the cable for cuts, splits, or bare wires; check the plug for cracks or burn marks; check the transformer (if present) for damage or discolouration; check each lamp holder for damage; ensure all lamps are secure and none are missing. If the set has replaceable fuses (in the plug or inline), check they are the correct rating. Any lights that fail the visual inspection should be discarded — repairing Christmas lights is rarely practical or safe.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/pat-testing-guide',
    title: 'PAT Testing Guide',
    description: 'Complete guide to portable appliance testing for commercial and domestic settings.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-types-explained',
    title: 'RCD Types Explained',
    description: 'Understanding Type AC, A, B, and F RCDs and their applications.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/ip-rating-guide',
    title: 'IP Rating Guide',
    description: 'Full IP rating chart with practical examples for electrical installations.',
    icon: Droplets,
    category: 'Guide',
  },
  {
    href: '/guides/outdoor-electrics',
    title: 'Outdoor Electrics Guide',
    description: 'Regulations and best practice for outdoor electrical installations.',
    icon: ThermometerSun,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete electrical inspection condition reports on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 with structured training modules.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Christmas Lighting Safety: A Guide for Homeowners and Electricians',
    content: (
      <>
        <p>
          Every December, UK fire and rescue services respond to hundreds of electrical fires linked
          to Christmas lighting. Overloaded sockets, damaged cables, indoor lights used outdoors, and
          lights left running all night on dry Christmas trees are the most common causes.
        </p>
        <p>
          Most of these incidents are entirely preventable. This guide covers the key safety
          principles for Christmas lighting — from choosing the right lights and understanding IP
          ratings, to avoiding overloaded circuits, PAT testing commercial displays, and using timer
          switches to reduce risk.
        </p>
        <p>
          For electricians, the Christmas period is an opportunity to advise customers on safe
          lighting practices, offer PAT testing services for commercial clients, and check that
          outdoor circuits have adequate{' '}
          <SEOInternalLink href="/guides/rcd-types-explained">RCD protection</SEOInternalLink> in
          accordance with BS 7671.
        </p>
      </>
    ),
  },
  {
    id: 'indoor-vs-outdoor',
    heading: 'Indoor vs Outdoor Christmas Lights',
    content: (
      <>
        <p>
          The most important distinction in Christmas lighting is whether the lights are rated for
          indoor or outdoor use. This is not a suggestion — it is a safety-critical classification.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Indoor Lights</h3>
            <p className="text-white text-sm leading-relaxed">
              Indoor Christmas lights are designed for dry conditions only. They typically have
              thinner cable insulation, basic plug connections, and no IP rating (or IP20 at most —
              protected against solid objects larger than 12mm, no water protection). They are safe
              to use inside the home, away from moisture, provided they are not overloaded or left
              in contact with combustible materials such as curtains or a dry Christmas tree.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Outdoor Lights</h3>
            <p className="text-white text-sm leading-relaxed">
              Outdoor Christmas lights are built to withstand rain, frost, and temperature
              variation. They have heavier cable insulation, sealed connections, waterproof
              transformers, and an IP rating of at least IP44. The connections and lamp holders are
              designed to prevent water ingress even when exposed to sustained rain. Outdoor-rated
              lights can also be used indoors, but indoor lights must never be used outdoors.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <p className="text-white text-sm leading-relaxed">
              <strong>Safety warning:</strong> Using indoor lights outdoors exposes live parts to
              water. This creates a risk of electric shock that can be fatal. If in doubt about
              whether lights are rated for outdoor use, check the packaging for an IP rating. No IP
              rating or IP20 means indoor only.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings for Outdoor Christmas Lights',
    content: (
      <>
        <p>
          The IP (Ingress Protection) rating tells you exactly what level of protection a product
          has against solid objects and water. For outdoor Christmas lights, the IP rating
          determines whether the lights can safely withstand the British winter.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP44</strong> — Protected against solid objects larger than 1mm and
                splashing water from any direction. This is the minimum for outdoor Christmas
                lights hung under eaves or in sheltered positions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP54</strong> — Dust-protected and splash-proof. Suitable for most outdoor
                positions including exposed walls and fences.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP65</strong> — Dust-tight and protected against water jets. Suitable for
                ground-level installations, areas prone to standing water, and exposed positions
                without shelter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP67/IP68</strong> — Submersible. Required for lights placed in or near
                water features, ponds, or areas that flood.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For a detailed breakdown of all IP ratings and their applications, see the{' '}
          <SEOInternalLink href="/guides/ip-rating-guide">IP Rating Guide</SEOInternalLink>.
        </p>
      </>
    ),
  },
  {
    id: 'overloading',
    heading: 'Overloading Sockets and Circuits',
    content: (
      <>
        <p>
          Socket overloading is one of the most common causes of electrical fires in the UK during
          the Christmas period. The temptation to plug multiple sets of lights, a tree, outdoor
          displays, and other decorations into a single socket — often via a chain of extension
          leads and adaptors — creates a fire risk.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Never daisy-chain extension leads</strong> — plugging one extension lead
                into another creates high resistance at the joints, which generates heat. This is a
                fire risk regardless of the load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check the total load</strong> — add up the wattage of everything plugged
                into a socket or extension lead. A 13A socket can supply 3,000W, but keep below
                2,500W as a practical limit. Most LED light sets draw only 5W to 50W, but
                incandescent sets draw significantly more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Uncoil extension reels fully</strong> — a coiled extension reel generates
                heat in the coil under load. If you must use a cable reel, unwind it completely
                even if you do not need the full length.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use LED lights</strong> — LED Christmas lights draw a fraction of the power
                of incandescent lights, generate far less heat, and last longer. Replacing old
                incandescent sets with LEDs significantly reduces both the fire risk and the
                electrical load.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'commercial-pat',
    heading: 'PAT Testing for Commercial Christmas Displays',
    content: (
      <>
        <p>
          Commercial Christmas lighting displays — in shops, restaurants, pubs, hotels, shopping
          centres, and on high streets — fall under the Electricity at Work Regulations 1989. The
          duty holder (employer, landlord, or facilities manager) must ensure all electrical
          equipment is maintained in a safe condition.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual PAT testing</strong> — Christmas lights stored for 11 months and then
                deployed should be PAT tested before each season. Storage can cause cable
                degradation, insulation cracking, and rodent damage that is not visible from a quick
                look.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — check all cables, plugs, transformers,
                connections, and lamp holders for physical damage, cracking, discolouration, or
                exposed conductors. Discard and replace any items that fail the visual inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance test</strong> — test at 500V DC. The minimum
                acceptable insulation resistance is 1 megohm. Moisture ingress during storage is a
                common cause of low insulation resistance in Christmas lights.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record keeping</strong> — maintain a register of all Christmas lighting
                equipment, PAT test dates, results, and any items discarded or replaced. This
                demonstrates compliance if challenged by the HSE or local authority.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electricians, offering a pre-season PAT testing service for commercial Christmas
          lighting is a reliable annual revenue stream. Many businesses need this service in late
          October and November.
        </p>
      </>
    ),
  },
  {
    id: 'timer-switches',
    heading: 'Timer Switches and Automation',
    content: (
      <>
        <p>
          Leaving Christmas lights on continuously — especially overnight or when the property is
          unoccupied — increases the fire risk and wastes electricity. Timer switches and smart plugs
          offer a simple, low-cost solution.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Timer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mechanical timer switches</strong> — plug-in timers with a 24-hour dial
                allow setting on/off times in 15-minute increments. Cheap, reliable, and no
                internet connection required. Set lights to come on at dusk (around 4pm in December)
                and switch off at 10pm or 11pm.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart plugs</strong> — Wi-Fi connected plugs that can be controlled via a
                phone app, set to schedules, or triggered by sunset/sunrise times. Useful for
                outdoor lights where manual switching is inconvenient. Ensure outdoor smart plugs
                have an appropriate IP rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Light-sensitive switches</strong> — dusk-to-dawn sensors automatically
                switch lights on when ambient light drops and off at sunrise. Ideal for outdoor
                displays that should operate only during dark hours.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For commercial displays, timer control is not optional — lights must be on a controlled
          schedule to manage fire risk, energy costs, and light pollution compliance.
        </p>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection for Christmas Lighting',
    content: (
      <>
        <p>
          RCD (Residual Current Device) protection is critical for Christmas lighting, especially
          outdoor installations. Under BS 7671 Regulation 411.3.3, socket-outlets with a rated
          current not exceeding 32A require additional protection by an RCD with a rated residual
          operating current not exceeding 30mA.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Modern consumer units</strong> — if the property has a consumer unit installed
                after January 2016, all circuits should already have RCD protection (split-load or
                RCBO configuration). The sockets used for Christmas lights will be protected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Older installations</strong> — properties with older consumer units (rewireable
                fuses, no RCDs) lack this protection. A plug-in RCD adaptor provides 30mA RCD
                protection at the socket. This is an essential precaution for outdoor Christmas
                lights on older installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test the RCD monthly</strong> — press the test button on the RCD (at the
                consumer unit or on the plug-in adaptor) to confirm it trips. If it does not trip,
                the RCD has failed and must be replaced immediately. This applies year-round, not
                just at Christmas.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Christmas Lighting Services',
    content: (
      <>
        <p>
          The Christmas period offers several revenue opportunities for electricians: outdoor
          lighting installations, PAT testing for commercial clients, consumer unit upgrades to
          provide RCD protection, and general electrical safety checks.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">PAT Testing Service</h4>
                <p className="text-white text-sm leading-relaxed">
                  Offer pre-season PAT testing for commercial Christmas lighting displays. Pubs,
                  restaurants, shops, and offices need this service annually. Use the{' '}
                  <SEOInternalLink href="/guides/pat-testing-guide">
                    PAT testing guide
                  </SEOInternalLink>{' '}
                  for procedures and record-keeping requirements.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Plug className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Outdoor Socket Installation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Install dedicated RCD-protected outdoor sockets for customers who want permanent
                  outdoor lighting capability. This is notifiable work under Part P and requires an{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EIC certificate</SEOInternalLink>.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Consumer Unit Upgrade</h4>
                <p className="text-white text-sm leading-relaxed">
                  For properties without RCD protection, a consumer unit upgrade provides whole-house
                  protection — not just for Christmas lights but for all circuits. This is a high-value
                  job that delivers genuine safety improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify Christmas lighting work"
          description="Use Elec-Mate to quote outdoor socket installations, complete EIC certificates on site, and manage PAT testing records. 7-day free trial."
          icon={Sparkles}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ChristmasLightingSafetyPage() {
  return (
    <GuideTemplate
      title="Christmas Lighting Safety | Electrical Safety Guide UK"
      description="Complete guide to Christmas lighting safety in the UK. Indoor vs outdoor lights, IP ratings, overloading sockets, PAT testing for commercial displays, timer switches, and RCD protection. Safety advice for homeowners and electricians."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={Sparkles}
      heroTitle={
        <>
          Christmas Lighting Safety:{' '}
          <span className="text-yellow-400">Keeping Your Home and Business Safe</span>
        </>
      }
      heroSubtitle="Every year, electrical fires and shock incidents spike during the Christmas period. This guide covers indoor vs outdoor lights, IP ratings, overloading risks, PAT testing for commercial displays, and timer switches — for homeowners and electricians."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Christmas Lighting Safety"
      relatedPages={relatedPages}
      ctaHeading="Keep Your Customers Safe This Christmas"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for PAT testing records, quoting outdoor installations, and on-site EIC certificates. 7-day free trial, cancel anytime."
    />
  );
}
