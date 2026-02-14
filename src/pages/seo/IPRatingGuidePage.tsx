import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Shield,
  Calculator,
  Zap,
  BookOpen,
  Droplets,
  FileCheck2,
  Eye,
  Hand,
  Waves,
  ShowerHead,
  Building,
  Search,
} from 'lucide-react';

export default function IPRatingGuidePage() {
  return (
    <ToolTemplate
      title="IP Rating Guide | Ingress Protection Explained"
      description="Complete guide to IP ratings for electrical equipment. Explains first digit (solids 0-6), second digit (liquids 0-9), IP2X, IPXXB, and common ratings like IP20, IP44, IP55, IP65, IP67, and IP68. UK electrician reference with BS EN 60529."
      datePublished="2026-01-30"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'IP Rating Guide', href: '/tools/ip-rating-guide' },
      ]}
      tocItems={[
        { id: 'what-is-ip-rating', label: 'What Is an IP Rating?' },
        { id: 'first-digit', label: 'First Digit — Solid Objects' },
        { id: 'second-digit', label: 'Second Digit — Liquids' },
        { id: 'common-ratings', label: 'Common IP Ratings Explained' },
        { id: 'ip2x-ipxxb', label: 'IP2X and IPXXB — Finger Protection' },
        { id: 'how-to', label: 'How to Choose the Right IP Rating' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="BS EN 60529 Reference"
      badgeIcon={Shield}
      heroTitle={
        <>
          <span className="text-yellow-400">IP Rating Guide</span> — Ingress Protection Explained
          for UK Electricians
        </>
      }
      heroSubtitle="Understand every IP rating from IP00 to IP69K. This guide explains the first digit (solid object protection), the second digit (liquid protection), and what ratings like IP20, IP44, IP55, IP65, and IP68 mean in practice. Essential knowledge for selecting equipment to BS EN 60529."
      heroFeaturePills={[
        { icon: Shield, label: 'BS EN 60529' },
        { icon: Hand, label: 'Solids 0-6' },
        { icon: Droplets, label: 'Liquids 0-9' },
        { icon: Search, label: 'Quick Lookup' },
      ]}
      readingTime={9}
      keyTakeaways={[
        'IP stands for Ingress Protection, defined by BS EN 60529. The two-digit code describes protection against solid objects (first digit 0-6) and liquids (second digit 0-9).',
        'IP2X and IPXXB mean the enclosure is protected against finger contact with live parts — a fundamental safety requirement in BS 7671.',
        'IP44 is the minimum for general outdoor use. IP55 is suitable for exposed outdoor locations. IP65 is dust-tight. IP67 and IP68 are submersible.',
        'The IP rating of enclosures, accessories, and luminaires must match the environmental conditions of the installation location.',
        "Elec-Mate's IP rating lookup tool lets you decode any IP rating instantly and check it against BS 7671 zone requirements.",
      ]}
      sections={[
        {
          id: 'what-is-ip-rating',
          heading: 'What Is an IP Rating?',
          content: (
            <>
              <p>
                IP stands for Ingress Protection (sometimes called International Protection). It is
                a classification system defined by BS EN 60529 (IEC 60529) that describes how well
                an electrical enclosure protects its contents against the intrusion of solid objects
                (dust, fingers, tools) and liquids (dripping water, sprays, jets, submersion).
              </p>
              <p>
                Every piece of electrical equipment — from consumer units to outdoor luminaires,
                from socket outlets to junction boxes — has an IP rating that tells the installer
                what environments it can be safely used in. Selecting equipment with the wrong IP
                rating for the location is a common cause of equipment failure, water damage, and
                potential safety hazards.
              </p>
              <p>
                The IP rating is written as "IP" followed by two digits. The first digit describes
                protection against solid objects (0 to 6). The second digit describes protection
                against liquids (0 to 9). A higher number means greater protection. For example,
                IP65 means the enclosure is completely dust-tight (6) and protected against water
                jets from any direction (5). This knowledge is fundamental when completing{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR inspections</SEOInternalLink>{' '}
                and verifying that installed equipment is appropriate for its location.
              </p>
            </>
          ),
          appBridge: {
            title: 'IP Rating Quick Lookup',
            description:
              'Decode any IP rating instantly. Enter the two digits and Elec-Mate explains exactly what protection the enclosure provides. Part of the built-in reference tools.',
            icon: Search,
          },
        },
        {
          id: 'first-digit',
          heading: 'First Digit — Protection Against Solid Objects',
          content: (
            <>
              <p>
                The first digit of the IP code indicates the level of protection against solid
                objects and body parts accessing hazardous internal components:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-6">
                <div className="grid grid-cols-3 gap-px bg-white/10">
                  <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                    Digit
                  </div>
                  <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                    Object Size
                  </div>
                  <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                    Description
                  </div>
                </div>
                {[
                  {
                    digit: '0',
                    size: 'No protection',
                    desc: 'No protection against contact or ingress',
                  },
                  {
                    digit: '1',
                    size: '> 50 mm',
                    desc: 'Back of hand — no deliberate contact with live parts',
                  },
                  {
                    digit: '2',
                    size: '> 12.5 mm',
                    desc: 'Fingers — prevents finger contact with live parts',
                  },
                  {
                    digit: '3',
                    size: '> 2.5 mm',
                    desc: 'Tools — prevents access with screwdrivers, thick wire',
                  },
                  {
                    digit: '4',
                    size: '> 1.0 mm',
                    desc: 'Wire — prevents fine wire and small tools entering',
                  },
                  {
                    digit: '5',
                    size: 'Dust protected',
                    desc: 'Limited dust ingress — not enough to affect operation',
                  },
                  {
                    digit: '6',
                    size: 'Dust tight',
                    desc: 'No dust ingress whatsoever — complete seal',
                  },
                ].map((row) => (
                  <div key={row.digit} className="grid grid-cols-3 gap-px bg-white/5">
                    <div className="p-4 bg-[#0a0a0a] text-white text-sm font-medium">
                      {row.digit}
                    </div>
                    <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.size}</div>
                    <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.desc}</div>
                  </div>
                ))}
              </div>
              <p>
                For electrical safety, the most important level is 2 (finger protection). BS 7671
                requires that live parts must be protected against finger contact — this is why IP2X
                is such a critical requirement. Consumer units installed in domestic premises must
                meet IP2X or IPXXB as a minimum when the cover is removed, per{' '}
                <SEOInternalLink href="/guides/consumer-unit-regulations">
                  consumer unit regulations
                </SEOInternalLink>
                .
              </p>
            </>
          ),
        },
        {
          id: 'second-digit',
          heading: 'Second Digit — Protection Against Liquids',
          content: (
            <>
              <p>
                The second digit describes the degree of protection against water and other liquids.
                Each level includes all the protection of the levels below it (for example, IPX5
                provides protection against water jets, which inherently includes protection against
                splashes and drips):
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-6">
                <div className="grid grid-cols-3 gap-px bg-white/10">
                  <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                    Digit
                  </div>
                  <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                    Water Test
                  </div>
                  <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                    Description
                  </div>
                </div>
                {[
                  { digit: '0', test: 'No protection', desc: 'No protection against water' },
                  {
                    digit: '1',
                    test: 'Vertical drips',
                    desc: 'Protection against vertically falling drops',
                  },
                  {
                    digit: '2',
                    test: 'Drips at 15 degrees',
                    desc: 'Protection when tilted up to 15 degrees',
                  },
                  {
                    digit: '3',
                    test: 'Spraying water',
                    desc: 'Protection against spray up to 60 degrees from vertical',
                  },
                  {
                    digit: '4',
                    test: 'Splashing water',
                    desc: 'Protection against splashing from any direction',
                  },
                  {
                    digit: '5',
                    test: 'Water jets',
                    desc: 'Protection against jets from a 6.3 mm nozzle, any direction',
                  },
                  {
                    digit: '6',
                    test: 'Powerful jets',
                    desc: 'Protection against powerful jets from a 12.5 mm nozzle',
                  },
                  {
                    digit: '7',
                    test: 'Immersion (1 m)',
                    desc: 'Protection during temporary immersion to 1 metre',
                  },
                  {
                    digit: '8',
                    test: 'Submersion',
                    desc: 'Protection during continuous submersion (manufacturer specified)',
                  },
                  {
                    digit: '9',
                    test: 'High pressure',
                    desc: 'Protection against high-pressure, high-temperature wash-down',
                  },
                ].map((row) => (
                  <div key={row.digit} className="grid grid-cols-3 gap-px bg-white/5">
                    <div className="p-4 bg-[#0a0a0a] text-white text-sm font-medium">
                      {row.digit}
                    </div>
                    <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.test}</div>
                    <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.desc}</div>
                  </div>
                ))}
              </div>
              <p>
                Note that IPX7 and IPX8 (immersion/submersion) are independent tests — an enclosure
                rated IPX7 is not necessarily rated IPX5 (jets) unless it is tested and rated for
                both. Some manufacturers specify dual ratings such as IP65/IP67 to confirm both jet
                and immersion protection. This is relevant when selecting outdoor{' '}
                <SEOInternalLink href="/tools/lighting-lux-calculator">
                  lighting fixtures
                </SEOInternalLink>{' '}
                and external accessories.
              </p>
            </>
          ),
        },
        {
          id: 'common-ratings',
          heading: 'Common IP Ratings Explained',
          content: (
            <>
              <p>
                The following IP ratings are the ones electricians encounter most frequently in UK
                installations:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">IP20</span> — protected against finger
                  contact and objects larger than 12.5 mm. No water protection. Standard for indoor
                  consumer units, distribution boards, and socket outlets in dry locations.
                </li>
                <li>
                  <span className="font-semibold text-white">IP44</span> — protected against objects
                  larger than 1 mm and splashing water from any direction. Minimum for general
                  outdoor use and bathrooms Zone 2 (where required). Common for outdoor socket
                  outlets.
                </li>
                <li>
                  <span className="font-semibold text-white">IP55</span> — dust-protected and
                  protected against water jets. Suitable for exposed outdoor locations and
                  industrial environments. Common for external junction boxes and motor terminal
                  boxes.
                </li>
                <li>
                  <span className="font-semibold text-white">IP65</span> — dust-tight and protected
                  against water jets. Used for outdoor luminaires, floodlights, and equipment in
                  wash-down areas. The standard rating for commercial LED battens in industrial
                  settings.
                </li>
                <li>
                  <span className="font-semibold text-white">IP67</span> — dust-tight and protected
                  against temporary immersion to 1 metre. Used for in-ground lighting, equipment in
                  wet pits, and connectors exposed to flooding risk.
                </li>
                <li>
                  <span className="font-semibold text-white">IP68</span> — dust-tight and protected
                  against continuous submersion. Used for swimming pool lighting, underwater
                  equipment, and cable glands on submersible pumps.
                </li>
              </ul>
              <p>
                Selecting the correct IP rating for each location is checked during{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR inspections</SEOInternalLink>.
                Equipment with an insufficient IP rating for its location is recorded as a departure
                from BS 7671 and may result in a C2 (potentially dangerous) or C3 (improvement
                recommended) observation code. Understanding{' '}
                <SEOInternalLink href="/guides/bs7671-observation-codes">
                  observation codes
                </SEOInternalLink>{' '}
                helps interpret these findings correctly.
              </p>
            </>
          ),
        },
        {
          id: 'ip2x-ipxxb',
          heading: 'IP2X and IPXXB — Finger Protection Requirements',
          content: (
            <>
              <p>
                BS 7671 frequently references IP2X and IPXXB as minimum requirements for protection
                against direct contact with live parts. These two designations are related but not
                identical:
              </p>
              <p>
                <strong className="text-yellow-400">IP2X</strong> means the enclosure prevents a
                standard test finger (12 mm diameter, 80 mm long) from making adequate contact with
                live parts. The "2" is the first digit, referring to solid object protection. The
                "X" means the second digit (liquid protection) is not specified — it could be
                anything from 0 upwards.
              </p>
              <p>
                <strong className="text-yellow-400">IPXXB</strong> uses the additional letter "B"
                from BS EN 60529, which specifically means protection against access with a jointed
                test finger (12 mm diameter, 80 mm long, with two articulations). This is a more
                realistic representation of a human finger and is the test used for consumer unit
                compliance in domestic premises.
              </p>
              <p>
                Since January 2016, BS 7671 has required that consumer units in domestic premises
                must comply with BS EN 61439-3 and must have all live parts protected to at least
                IPXXB or IP2X when the cover is removed. This is why modern consumer units have
                finger-safe busbar systems and individual circuit blanking plates. If an existing
                board does not meet IP2X/IPXXB, this is recorded as an observation during an{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR inspection</SEOInternalLink>.
              </p>
              <p>
                Bathroom zones have specific IP requirements too. Zone 1 requires at least IPX4
                (splash protection), and equipment in Zone 0 must be at least IPX7 (temporary
                immersion). The{' '}
                <SEOInternalLink href="/tools/eic-certificate">EIC certificate</SEOInternalLink>{' '}
                records the IP rating of equipment installed in special locations.
              </p>
            </>
          ),
          appBridge: {
            title: 'IP Rating Reference Built Into Elec-Mate',
            description:
              'Decode any IP rating instantly. Check BS 7671 zone requirements. Verify that installed equipment has the correct IP rating for its location — all from one app.',
            icon: Shield,
          },
        },
      ]}
      howToSteps={[
        {
          name: 'Identify the installation environment',
          text: 'Determine whether the location is indoors or outdoors, dry or wet, dusty or clean, and whether there is risk of water jets, splashing, or submersion.',
        },
        {
          name: 'Check BS 7671 requirements for the location',
          text: 'BS 7671 specifies minimum IP ratings for certain locations — bathroom zones, swimming pools, agricultural premises, construction sites, and outdoor installations all have specific requirements.',
        },
        {
          name: 'Decode the IP rating on the equipment',
          text: 'Read the IP rating printed on the equipment (e.g., IP65). The first digit tells you the solid object protection level. The second digit tells you the liquid protection level.',
        },
        {
          name: 'Verify compliance',
          text: 'Check that the equipment IP rating meets or exceeds the minimum requirement for the location. Record the IP rating on the certificate or schedule of inspections.',
        },
        {
          name: 'Use the Elec-Mate IP lookup tool',
          text: 'Enter any IP rating into Elec-Mate and get an instant explanation of the protection level, plus a check against BS 7671 zone requirements.',
        },
      ]}
      howToHeading="How to Choose the Right IP Rating"
      howToDescription="Five steps to selecting equipment with the correct IP rating for any location."
      features={[
        {
          icon: Search,
          title: 'Instant IP Decode',
          description:
            'Enter any IP code (IP00 to IP69K) and get an instant plain-English explanation of the first digit, second digit, and any additional letters.',
        },
        {
          icon: Droplets,
          title: 'Water Protection Guide',
          description:
            'Clear explanation of each water protection level — from drips to jets to submersion — with practical examples for UK electrical installations.',
        },
        {
          icon: Hand,
          title: 'Solid Object Protection',
          description:
            'Explains each solid protection level from no protection (0) to dust-tight (6), with the critical IP2X/IPXXB finger protection requirement highlighted.',
        },
        {
          icon: Building,
          title: 'Zone Requirements',
          description:
            'Built-in BS 7671 zone requirements for bathrooms, swimming pools, saunas, and other special locations. Check compliance instantly.',
        },
        {
          icon: Eye,
          title: 'EICR Observation Helper',
          description:
            'Identifies when equipment IP rating is insufficient for the installation location, helping you record accurate observations on EICR certificates.',
        },
        {
          icon: BookOpen,
          title: 'BS EN 60529 Reference',
          description:
            "Complete reference to BS EN 60529 (IEC 60529) IP classification system. Part of Elec-Mate's 50+ tools and references for UK electricians.",
        },
      ]}
      featuresHeading="IP Rating Guide Features"
      featuresSubheading="The complete IP rating reference, built into your on-site toolkit."
      faqs={[
        {
          question: 'What IP rating do I need for a bathroom?',
          answer:
            'BS 7671 specifies minimum IP ratings for bathroom zones. Zone 0 (inside the bath or shower tray): minimum IPX7 (temporary immersion). Zone 1 (directly above the bath/shower to 2.25 m): minimum IPX4 (splash protection). Zone 2 (0.6 m beyond Zone 1): minimum IPX4 if water jets are likely, otherwise no specific requirement beyond IP2X. Outside the zones: no specific water protection requirement, but good practice suggests at least IPX4 for equipment near water sources.',
        },
        {
          question: 'What does the X mean in an IP rating like IPX4?',
          answer:
            'The X replaces a digit that has not been tested or is not relevant. IPX4 means the equipment has been tested for splash protection (second digit 4) but has not been specifically tested for solid object protection (first digit replaced by X). Similarly, IP2X means the equipment is tested for finger protection (first digit 2) but the liquid protection level is not specified. The X does not mean zero protection — it simply means that specific test was not performed.',
        },
        {
          question: 'Is IP65 waterproof?',
          answer:
            'IP65 means the enclosure is dust-tight (6) and protected against water jets from any direction (5). This provides excellent weather protection and is suitable for most outdoor installations, wash-down areas, and industrial environments. However, it is not rated for immersion — if the equipment could be submerged (even temporarily), you need IP67 or higher. For most practical outdoor electrical installations in the UK, IP65 is more than adequate.',
        },
        {
          question: 'What is the difference between IP55 and IP65?',
          answer:
            'The difference is in the first digit: dust protection. IP55 is dust-protected — some dust may enter, but not enough to affect the operation of the equipment. IP65 is dust-tight — no dust enters at all. For most outdoor electrical installations, IP55 is adequate because a small amount of dust does not affect electrical equipment. IP65 is specified for environments where dust contamination would be harmful — clean rooms, food processing areas, and equipment with sensitive optical components like some LED drivers.',
        },
        {
          question: 'What IP rating is needed for outdoor socket outlets?',
          answer:
            'BS 7671 does not specify a single IP rating for all outdoor sockets, but the equipment must be suitable for the external influences present. In practice, IP44 is the minimum for a sheltered outdoor location (under a porch or canopy). IP55 or IP66 is recommended for fully exposed outdoor locations. The socket must maintain its IP rating when in use — many outdoor socket outlets have a hinged cover that provides IP44 or higher only when the cover is closed. Some designs maintain IP rating with plugs inserted.',
        },
        {
          question: 'Do I need to record IP ratings on an EICR?',
          answer:
            'You do not need to record the IP rating of every accessory on the EICR. However, you must verify that equipment in special locations (bathrooms, swimming pools, saunas, outdoor areas) has an IP rating appropriate for the zone or environmental conditions. If equipment has an insufficient IP rating, this should be recorded as an observation — typically a C3 (improvement recommended) if no immediate danger exists, or a C2 (potentially dangerous) if water ingress could cause an electric shock risk.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/eicr-certificate',
          title: 'EICR Certificate',
          description:
            'Complete digital EICRs with IP rating verification for special locations built into the inspection checklist.',
          icon: FileCheck2,
          category: 'Certificates',
        },
        {
          href: '/guides/consumer-unit-regulations',
          title: 'Consumer Unit Regulations',
          description: 'IP2X and IPXXB requirements for domestic consumer units explained in full.',
          icon: Shield,
          category: 'Guides',
        },
        {
          href: '/guides/bs7671-observation-codes',
          title: 'EICR Observation Codes',
          description:
            'C1, C2, C3, and FI observation codes explained — including when to use them for IP rating issues.',
          icon: BookOpen,
          category: 'Guides',
        },
        {
          href: '/tools/lighting-lux-calculator',
          title: 'Lighting Lux Calculator',
          description:
            'Calculate lux levels for indoor and outdoor lighting — where IP rating selection is critical.',
          icon: Calculator,
          category: 'Calculators',
        },
        {
          href: '/tools/cable-sizing-calculator',
          title: 'Cable Sizing Calculator',
          description:
            'Size cables for circuits in wet or outdoor locations where derating for installation method applies.',
          icon: Calculator,
          category: 'Calculators',
        },
        {
          href: '/tools/electrical-testing-calculators',
          title: 'All Electrical Calculators',
          description: '50+ BS 7671 calculators and reference tools for UK electricians.',
          icon: Calculator,
          category: 'Tools',
        },
      ]}
      ctaHeading="Decode any IP rating in seconds"
      ctaSubheading="Join UK electricians using Elec-Mate's 50+ tools and calculators on every job. 7-day free trial, cancel anytime."
      toolPath="/tools/ip-rating-guide"
    />
  );
}
