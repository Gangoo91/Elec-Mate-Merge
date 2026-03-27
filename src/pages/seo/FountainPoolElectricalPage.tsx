import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  Zap,
  ClipboardCheck,
  Building2,
  Settings,
  Plug,
  Droplets,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Specialist Installations', href: '/guides/specialist-electrical' },
  { label: 'Fountain & Feature Pool Electrical', href: '/fountain-pool-electrical' },
];

const tocItems = [
  { id: 'bs7671-section-702', label: 'BS 7671 Section 702' },
  { id: 'zones', label: 'Zone Requirements' },
  { id: 'ip-ratings', label: 'IP Ratings for Water Features' },
  { id: 'selv', label: 'SELV Requirements in Zone 0 and 1' },
  { id: 'underwater-luminaires', label: 'Underwater Luminaires' },
  { id: 'bonding', label: 'Bonding Requirements' },
  { id: 'garden-water-features', label: 'Garden Water Features' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671:2018+A3:2024 Section 702 — Swimming Pools and Other Basins — applies to decorative fountains, feature pools, garden ponds with electrical equipment, and other water-containing basins in addition to swimming pools.',
  'Section 702 defines three zones (Zone 0 inside the water, Zone 1 immediately above/around the water, Zone 2 further out) with progressively less restrictive requirements. All electrical equipment must be rated for the zone in which it is installed.',
  'In Zone 0 (inside the water), only SELV (Separated Extra-Low Voltage) at a maximum of 12 V AC or 30 V DC is permitted. The SELV transformer must be located outside Zone 0 and Zone 1.',
  'Underwater luminaires in Zone 0 must be specifically designed and approved for underwater use. They must comply with BS EN 60598-2-18 and carry an appropriate IP rating (minimum IP68 for continuously submerged equipment).',
  'Supplementary equipotential bonding must connect all simultaneously accessible conductive parts — including fountain structure metalwork, water pipes, pump housings, and any other metalwork near the water — to prevent dangerous potential differences.',
  'RCD protection with a rated residual operating current not exceeding 30 mA is required for all circuits supplying electrical equipment in or near water features, regardless of whether SELV is used for some circuits.',
];

const faqs = [
  {
    question: 'Does BS 7671 Section 702 apply to decorative fountains?',
    answer:
      'Yes. BS 7671:2018+A3:2024 Section 702 — Swimming Pools and Other Basins — applies to basins of swimming pools, paddling pools, fountains, garden ponds with electrical equipment, and other similar locations. The section title refers to swimming pools because that was the original scope, but the regulations explicitly extend to other water-containing basins where electrical equipment is installed. Any basin containing water in which electrical equipment is installed or near which persons may be present must comply with Section 702.',
  },
  {
    question: 'What is SELV and why is it required in Zone 0?',
    answer:
      'SELV (Separated Extra-Low Voltage) is a system where the supply voltage does not exceed 12 V AC or 30 V DC, and the circuit is electrically separated from earth and from other circuits by a safety isolating transformer complying with BS EN 61558-2-6. In Zone 0 (inside the water), the risk of electric shock is extreme because the body is immersed in a conductive medium. Even very low fault currents can cause fatal ventricular fibrillation when the body is immersed. SELV eliminates the risk of dangerous shock currents by limiting the available voltage to a level that cannot drive a lethal current through the body.',
  },
  {
    question: 'What IP rating is required for equipment inside a fountain or pool?',
    answer:
      'Equipment installed in Zone 0 (inside the water, continuously submerged) must have a minimum IP rating of IP68 — completely dust-tight and protected against continuous immersion in water under defined conditions. Zone 1 equipment (immediately above or around the water feature, subject to splashing) must be at least IP55. Zone 2 equipment must be at least IP44. The IP rating must be maintained throughout the equipment\'s service life, which requires regular inspection for damage and deterioration.',
  },
  {
    question: 'Does garden pond lighting require a qualified electrician?',
    answer:
      'Yes. Any fixed electrical installation in or near a garden pond, water feature, or decorative fountain must comply with BS 7671 Section 702 and must be installed by a competent electrician. The work is notifiable under Part P of the Building Regulations in England (it involves an electrical installation in a special location). The installer must be registered with a competent person scheme (such as NICEIC or NAPIT) or the work must be inspected and certified by the local authority building control.',
  },
  {
    question: 'Can I use a standard 230 V pump in a decorative fountain?',
    answer:
      'A 230 V pump may be used in a decorative fountain, but only if it is specifically designed and approved for submersible use and carries the appropriate IP rating (minimum IP68 if submerged, IP55 if subject to splashing). The pump circuit must be protected by a 30 mA RCD. The pump itself must not be located in Zone 0 unless it is a SELV device (12 V AC or 30 V DC maximum). If the pump is located in Zone 1 or beyond, a 230 V supply may be used with appropriate protection.',
  },
  {
    question: 'What bonding is required around a decorative fountain?',
    answer:
      'Supplementary equipotential bonding must connect all simultaneously accessible conductive parts that are within reach of the water feature or that could transmit a potential to the area around it. This typically includes: the metallic structure of the fountain basin, water supply and drainage pipes, pump housings and motor casings, light fitting bodies, any metal handrails or decorative features, and any other extraneous conductive parts. The bonding conductor must be connected to the main protective earth and must be sized in accordance with BS 7671 Table 54.2.',
  },
  {
    question: 'How often should fountain and water feature electrical installations be inspected?',
    answer:
      'IET Guidance Note 3 recommends a maximum periodic inspection interval of 1 year for swimming pools and similar locations, including decorative fountains and feature pools. The combination of continuous water exposure, UV degradation of cables and fittings, and the life-safety hazards of electrical faults in water means that annual inspection is the appropriate interval. Inspections should include testing of RCDs, continuity of bonding conductors, insulation resistance of all circuits, and visual inspection of all equipment for damage or deterioration.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/section-701-bathrooms-guide',
    title: 'Bathroom Electrical Regulations (Section 701)',
    description: 'Zone requirements, IP ratings, and SELV for bathroom electrical installations.',
    icon: Droplets,
    category: 'Guide',
  },
  {
    href: '/guides/swimming-pool-electrical',
    title: 'Swimming Pool Electrical Guide',
    description: 'Full guide to swimming pool electrical installations under BS 7671 Section 702.',
    icon: Droplets,
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
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete periodic inspection reports on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'bs7671-section-702',
    heading: 'BS 7671 Section 702: Swimming Pools and Other Basins',
    content: (
      <>
        <p>
          BS 7671:2018+A3:2024 Section 702 — Swimming Pools and Other Basins — is the
          authoritative technical standard for electrical installations in and around all types
          of water-containing basins in the UK, including decorative fountains, ornamental pools,
          garden ponds with electrical equipment, water walls, and similar features in addition
          to swimming pools.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scope</strong> — Section 702 applies to basins of swimming pools,
                paddling pools, fountain basins, garden ponds with electrical equipment, and
                similar. It applies to all electrical equipment installed within the defined
                zones around these water features and to the circuits supplying that equipment.
                Compliance is required for both new installations and alterations to existing
                installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>The electric shock hazard</strong> — water is a conductor of electricity.
                The human body in or near water presents a low-resistance path for fault currents.
                Even small fault currents can cause fatal electric shock when the body is immersed
                in or in contact with water. Section 702 applies strict requirements precisely
                because the consequences of an electrical fault in these locations are severe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P notification</strong> — electrical work at decorative fountains,
                garden ponds with electrical equipment, and similar water features is notifiable
                under Part P of the Building Regulations in England. Installers must be registered
                with a competent person scheme or arrange building control inspection and
                certification.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians working on water feature installations should hold a current{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671 qualification
          </SEOInternalLink>{' '}
          and be thoroughly familiar with Section 702. The IET Guidance Note 7 (Special Locations)
          provides detailed supplementary guidance.
        </p>
      </>
    ),
  },
  {
    id: 'zones',
    heading: 'Zone Requirements Under Section 702',
    content: (
      <>
        <p>
          Section 702 defines three zones around water basins — Zone 0, Zone 1, and Zone 2 —
          with progressively less restrictive requirements as distance from the water increases.
          The dimensions of each zone depend on the type of basin and are defined in the standard.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 0 — inside the water</strong> — the interior of the water basin
                itself (the water volume). This is the highest risk zone. Only SELV equipment
                operating at a maximum of 12 V AC or 30 V DC is permitted. Equipment must be
                IP68 rated. No switching devices, socket outlets, or junction boxes are permitted
                in Zone 0.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 1 — immediately around the water</strong> — extends 2 m horizontally
                from the edge of the basin and 2.5 m vertically above the floor level (for
                fountains and similar, the zone extends above the basin lip). SELV or PELV at
                a maximum of 12 V AC or 30 V DC is required. Equipment must be IP44 rated as
                a minimum. No switches, socket outlets, or junction boxes are permitted except
                special types approved for Zone 1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 2 — the outer zone</strong> — extends a further 1.5 m horizontally
                beyond Zone 1 (so 3.5 m total from the basin edge). Equipment in Zone 2 must
                be IP44 rated as a minimum and must be protected by a 30 mA RCD. Socket outlets
                are not permitted in Zone 2 (for swimming pools and paddling pools; the
                application to fountains depends on the specific installation).
              </span>
            </li>
          </ul>
        </div>
        <p>
          For decorative fountains without a walkable surround — where members of the public
          cannot enter the water — the zone dimensions may be interpreted differently. The
          designer must assess the specific installation and apply the intent of Section 702
          to the actual risk presented by the feature.
        </p>
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings for Water Feature Electrical Equipment',
    content: (
      <>
        <p>
          Ingress protection (IP) ratings are critical for all electrical equipment installed
          in or near water features. The rating must be appropriate to the zone and to the
          actual conditions of installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP68 — Zone 0 (continuously submerged)</strong> — the highest standard
                for continuous submersion. Equipment rated IP68 is tested to remain watertight
                when submerged to a defined depth for a defined period. Underwater luminaires,
                submersible pumps, and any other equipment permanently submerged must be IP68.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP55 — Zone 1 (splashing and spray)</strong> — protection against dust
                ingress and water jets from any direction. Required for equipment in Zone 1 that
                is not submerged but is subject to water splash from the fountain mechanism.
                IP44 is the stated minimum for Zone 1, but IP55 is strongly recommended.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP44 — Zone 2 (splash risk)</strong> — protection against solid objects
                greater than 1 mm and water splashing from any direction. This is the minimum
                for Zone 2 equipment. In practice, equipment in Zone 2 of an outdoor water
                feature should exceed this minimum to account for UK weather conditions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'selv',
    heading: 'SELV Requirements in Zone 0 and Zone 1',
    content: (
      <>
        <p>
          Separated Extra-Low Voltage (SELV) is the mandatory supply system for electrical
          equipment in Zone 0 of water features. SELV eliminates the risk of dangerous electric
          shock by limiting the available voltage to a level that cannot drive lethal currents
          through the body, even when immersed in water.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage limits</strong> — SELV is limited to 12 V AC or 30 V DC under
                BS 7671. For aquatic environments (Section 702, Zone 0), the maximum voltage is
                12 V AC. The safety isolating transformer supplying the SELV circuit must comply
                with BS EN 61558-2-6 and must be located outside Zone 0 and Zone 1 — typically
                at least 3.5 m from the water basin edge.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>No earth connection</strong> — SELV circuits must not be earthed. The
                live conductors of a SELV circuit must be separated from earth and from all other
                circuits. If the SELV circuit were earthed, it would no longer be separated
                extra-low voltage and would lose its shock-protection characteristics.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELV cable routing</strong> — cables of SELV circuits must be physically
                separated from, or have additional insulation from, cables of other circuits.
                SELV conductors must be identifiable and must not be confused with conductors
                of other circuits. In practice, SELV cables are routed in separate conduit or
                trunking.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'underwater-luminaires',
    heading: 'Underwater Luminaires for Fountains and Pools',
    content: (
      <>
        <p>
          Underwater luminaires are a distinctive and technically demanding component of
          decorative fountain and feature pool installations. They must be specifically designed
          and tested for continuous submersion and must comply with both the luminaire standard
          and BS 7671 Section 702.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS EN 60598-2-18</strong> — underwater luminaires must comply with
                BS EN 60598-2-18 (luminaires — particular requirements — luminaires for
                swimming pools and similar applications). This standard covers the design,
                construction, and testing of luminaires intended for submersion. Only luminaires
                bearing this certification should be used in Zone 0 of fountains and pools.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>LED technology</strong> — modern underwater luminaires are predominantly
                LED-based, which offers advantages of lower heat generation (reducing thermal
                stress on seals), lower power consumption, and longer service life. LED
                luminaires are available in colour-changing variants for dramatic fountain
                effects. All LED drivers for Zone 0 luminaires must be located outside Zones
                0 and 1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintenance access</strong> — underwater luminaires must be accessible
                for inspection and relamping (where applicable) without draining the entire
                basin. Many designs incorporate a pull-out mechanism so the luminaire body
                can be withdrawn from its housing in the basin wall for maintenance. The
                housing itself remains watertight when the luminaire is removed.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bonding',
    heading: 'Bonding Requirements for Water Features',
    content: (
      <>
        <p>
          Supplementary equipotential bonding is a mandatory requirement for all water feature
          installations. Its purpose is to ensure that no dangerous potential difference can
          exist between simultaneously accessible conductive parts in or around the water feature.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>What must be bonded</strong> — Regulation 702.415.2 requires supplementary
                equipotential bonding of all simultaneously accessible extraneous conductive parts
                in Zones 0, 1, and 2. This includes: metallic fountain basin structure, water
                supply and drainage pipes (including flexible hoses with metallic fittings), pump
                motor casings, luminaire housings, metallic handrails or decorative features,
                and any other metallic components accessible from the water or its immediate
                surroundings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bonding conductor sizing</strong> — supplementary bonding conductors must
                be sized in accordance with BS 7671 Table 54.2. The minimum cross-sectional area
                of copper bonding conductors is 4 mm² where mechanically protected or 6 mm²
                where not mechanically protected. All bonding conductors must be identifiable
                (green and yellow sleeving) and must be connected to the main earthing terminal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing bonding continuity</strong> — the continuity of all supplementary
                bonding conductors must be tested and recorded at installation and at each
                periodic inspection. Bonding connections are subject to corrosion in the wet
                environment and must be inspected for deterioration at each annual inspection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'garden-water-features',
    heading: 'Garden Water Features and Pond Electrical Installations',
    content: (
      <>
        <p>
          Domestic garden water features — ornamental ponds, water walls, millstone fountains,
          and similar — are increasingly popular and present the same fundamental electrical
          hazards as commercial fountains. Section 702 applies equally to domestic garden
          water features with electrical equipment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Submersible pumps</strong> — the pump is typically the most hazardous
                component in a garden water feature. Only pumps specifically designed and
                approved for submersible use (rated IP68) may be placed in the water. All pump
                circuits must be protected by a 30 mA RCD. The RCD must be at the consumer
                unit or in a weatherproof outdoor enclosure — not inside the house where it
                is remote from the pump location.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pond lighting</strong> — submersible pond lights must be specifically
                designed for underwater use. Low-voltage (12 V AC or 30 V DC) pond lighting
                systems are the safest option and the only option permitted in Zone 0. The
                transformer supplying the low-voltage lighting must be located outside Zones
                0 and 1, typically in a waterproof housing away from the pond edge.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdoor socket outlets</strong> — socket outlets used to supply garden
                water features must be weatherproof, RCD-protected, and installed in accordance
                with the{' '}
                <SEOInternalLink href="/guides/outdoor-electrical">
                  outdoor electrical installation requirements
                </SEOInternalLink>
                . Plugs and cables must be rated for outdoor use. Extension leads used outdoors
                must be fully unwound to prevent overheating.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All garden pond and water feature electrical work in England is notifiable under Part P
          of the Building Regulations. Homeowners commissioning this work should verify that their
          electrician is registered with a competent person scheme such as NICEIC or NAPIT, and
          will provide an Electrical Installation Certificate upon completion.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Water Feature and Fountain Electrical Work',
    content: (
      <>
        <p>
          Water feature and fountain electrical work is a specialist area with significant design
          and installation skill requirements. Electricians who master Section 702 can work on
          high-value commercial fountain installations in public spaces, hotels, and office
          developments, as well as domestic garden pond and water feature projects.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certify Water Feature Installations</h4>
                <p className="text-white text-sm leading-relaxed">
                  All new water feature electrical installations require an Electrical Installation
                  Certificate (EIC). Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certificate app
                  </SEOInternalLink>{' '}
                  to complete the EIC on your phone — including the schedule of test results
                  covering insulation resistance, continuity, RCD test results, and earth
                  electrode resistance. Generate the PDF certificate on site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Annual Inspection Contracts</h4>
                <p className="text-white text-sm leading-relaxed">
                  Commercial fountain installations require annual periodic inspection. Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to offer annual maintenance contracts to commercial property managers and
                  facilities teams. Water feature maintenance contracts often include the
                  electrical inspection as part of a broader maintenance package.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Water feature electrical certification made simple with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EIC and EICR completion, test result recording, and instant PDF export. Ideal for fountain, pool, and water feature installations. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function FountainPoolElectricalPage() {
  return (
    <GuideTemplate
      title="Decorative Fountain & Feature Pool Electrical | BS 7671 Section 702"
      description="Complete guide to decorative fountain, feature pool, and garden water feature electrical installations under BS 7671 Section 702. Zone requirements, IP ratings, SELV, underwater luminaires, and supplementary bonding."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Specialist Installation"
      badgeIcon={Droplets}
      heroTitle={
        <>
          Decorative Fountain & Feature Pool Electrical:{' '}
          <span className="text-yellow-400">BS 7671 Section 702</span>
        </>
      }
      heroSubtitle="Everything electricians need to know about electrical installations for decorative fountains, feature pools, and garden water features — BS 7671 Section 702 zone requirements, IP ratings, SELV in Zone 0, underwater luminaires, and supplementary bonding requirements."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Fountain and Water Feature Electrical Installations"
      relatedPages={relatedPages}
      ctaHeading="Complete Water Feature Electrical Certificates on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EIC and EICR completion, test result recording, and instant PDF export. Perfect for fountain and water feature installations. 7-day free trial."
    />
  );
}
