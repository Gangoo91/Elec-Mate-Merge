import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Zap,
  AlertTriangle,
  ClipboardCheck,
  Home,
  ShieldCheck,
  PoundSterling,
  Droplets,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Conversion Guides', href: '/basement-conversion-electrical' },
  { label: 'Basement Conversion Electrical Work', href: '/basement-conversion-electrical' },
];

const tocItems = [
  { id: 'damp-considerations', label: 'Damp and Water Considerations' },
  { id: 'ip-ratings', label: 'IP Ratings Near Drainage' },
  { id: 'sump-pump', label: 'Sump Pump Electrical Supply' },
  { id: 'emergency-lighting', label: 'Emergency Lighting' },
  { id: 'flood-protection', label: 'Flood Sensor Integration' },
  { id: 'part-p', label: 'Part P and Building Regulations' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Basement electrical installations must address damp and moisture risk as a primary design consideration. All electrical equipment in zones with potential moisture exposure must have appropriate IP ratings under BS 7671 Section 522.3.',
  'Areas near drainage channels, sumps, and basement drainage are classified as special locations under BS 7671 and require equipment with IP ratings appropriate to the expected moisture level — typically IP44 or higher for general areas, IP55 or higher near water features.',
  'A sump pump protecting a converted basement must have a dedicated, reliable electrical supply — ideally a dedicated circuit with RCD protection and consideration for battery backup or an uninterruptible power supply (UPS) to maintain pump operation during a power cut.',
  'Where a basement is used for commercial purposes, or has a windowless escape route, emergency lighting under BS 5266-1 is a building regulations requirement. Even in residential basements, emergency lighting is best practice.',
  'All basement conversion electrical work is notifiable under Part P of the Building Regulations 2010 and requires an Electrical Installation Certificate (EIC) on completion.',
];

const faqs = [
  {
    question: 'Can you have electrical sockets in a basement?',
    answer:
      'Yes, but the installation must account for the moisture risk. All socket-outlets must be on RCD-protected circuits (30mA maximum, under Regulation 411.3.3 of BS 7671). In areas close to drainage channels, sump pits, or where the floor may flood, socket-outlets must be positioned at an appropriate height above floor level and may need to have an IP rating suitable for the expected moisture environment. Your electrician will assess the specific risk in each zone of the basement.',
  },
  {
    question: 'What IP rating do I need in a basement?',
    answer:
      'IP rating requirements depend on the specific location within the basement. BS 7671 Section 522.3 requires electrical equipment to be appropriate for the environmental conditions it will face. In a dry, habitable basement living room, standard IP2X equipment (normal domestic accessories) is acceptable. In areas near drainage channels, sump pits, or where splashing is possible, IP44 (protected against solid objects over 1mm and water splashing from any direction) is the minimum. Areas subject to regular water ingress or hosing should use IP55 or higher.',
  },
  {
    question: 'Does a basement conversion require emergency lighting?',
    answer:
      'Emergency lighting is required under Approved Document B (Fire Safety) and BS 5266-1 where a basement is used for commercial or business purposes, or where the escape route from the basement includes windowless areas where occupants cannot see natural light. For residential basements used as living space, emergency lighting is not a strict legal requirement but is strongly recommended as best practice — if the mains power fails, a windowless basement can be completely dark, creating a serious safety risk.',
  },
  {
    question: 'Does a sump pump need its own electrical circuit?',
    answer:
      'A sump pump should be on a dedicated circuit — it must not share a socket with other appliances, as the socket must always be available to the pump. The circuit should have RCD protection (30mA). For basements where flooding represents a significant risk, consideration should be given to a battery-backup sump pump that continues to operate during a power cut, or a UPS (uninterruptible power supply) on the pump circuit. The sump pump circuit should be clearly labelled at the consumer unit.',
  },
  {
    question: 'Do I need a flood sensor in a converted basement?',
    answer:
      'Flood sensors are not a legal requirement under the Building Regulations, but they are strongly recommended for any converted basement, particularly those with a sump system or at risk of groundwater ingress. A flood sensor connected to an alarm system or smart home hub provides early warning of water ingress before it reaches damaging levels. The sensor and any associated alarm equipment must be installed by a competent person and positioned at an appropriate height to detect early-stage water ingress.',
  },
  {
    question: 'How much does electrical work for a basement conversion cost?',
    answer:
      'Basement conversion electrical work is typically more expensive than equivalent above-ground work due to the moisture risk, IP-rated equipment costs, and complexity of installation. A standard basement living room conversion typically costs £2,000 to £4,500 for electrical work. A basement with a sump pump, emergency lighting, flood sensors, and commercial-grade equipment can cost £4,000 to £8,000 or more. Always obtain at least three quotes from registered electricians with experience in basement installations.',
  },
  {
    question: 'What type of cable should be used in a basement conversion?',
    answer:
      'Standard PVC-insulated twin and earth cable (6242Y) is acceptable in a dry, habitable basement. In areas subject to dampness or potential moisture exposure, XLPE-insulated cables, cables with an additional sheath, or cables installed in sealed conduit are preferable. Cables must not be installed in conduit or trunking where water could collect and remain. Mineral-insulated cable (MICC) is an option for areas with persistent moisture but is more expensive and requires specialist termination skills.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/house-extension-electrical-guide',
    title: 'House Extension Electrical Guide',
    description: 'Circuit planning, consumer unit checks, Part P, and EIC for house extensions.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/loft-conversion-electrical-guide',
    title: 'Loft Conversion Electrical Guide',
    description: 'Smoke detection, escape route lighting, and Part P for loft conversions.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/garage-conversion-electrical',
    title: 'Garage Conversion Electrical Work',
    description: 'Upgrading from garage supply to habitable room standard — full wiring guide.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Complete guide to the current wiring regulations for UK electricians.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'damp-considerations',
    heading: 'Damp and Moisture Considerations in Basement Electrical Design',
    content: (
      <>
        <p>
          Damp is the defining electrical design challenge in a basement conversion. Even a basement
          that appears dry can experience groundwater ingress during heavy rainfall, rising damp
          from the floor slab, or condensation forming on cold surfaces. Electrical installations
          must be designed to be safe in these conditions.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Risk assessment before design</strong> — the electrician and waterproofing
                specialist must agree on the drainage strategy before the electrical installation is
                designed. If a cavity drain membrane system is used, the drainage channels and sump
                location must be finalised so that electrical equipment is not positioned in zones
                where water will collect or be directed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipment positioning</strong> — socket-outlets and electrical accessories
                should be positioned a minimum of 150mm above finished floor level in areas where
                flooding risk exists. In high-risk areas, raising accessories to 600mm or higher
                provides additional protection. The consumer unit or sub-board serving the basement
                should be positioned at high level (1.5m or above) and away from areas where water
                could reach it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conduit installation</strong> — cables in basement walls and floors should
                be installed in sealed conduit or cable trunking wherever possible. This prevents
                water tracking along cable sheaths into wall voids or consumer units. Conduit
                penetrations through waterproofing membranes must be properly sealed by the
                waterproofing specialist.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not install below the finished drainage level</strong> — no electrical
                equipment should be installed below the level at which the drainage system
                discharges. If water rises above the drainage discharge point, it will flood the
                basement and any equipment below that level will be submerged.
              </span>
            </li>
          </ul>
        </div>
        <p>
          BS 7671:2018+A3:2024 Section 522.3 requires that the selection and erection of electrical
          equipment takes into account the environmental conditions, including moisture. The
          designer's risk assessment for the basement must justify the IP ratings selected for each
          zone of the installation.
        </p>
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings for Zones Near Drainage in Basement Conversions',
    content: (
      <>
        <p>
          The IP (Ingress Protection) rating system, defined in BS EN 60529, classifies the degree
          of protection provided by an enclosure against solid objects and water ingress. In a
          basement conversion, appropriate IP ratings must be selected for different zones based on
          the expected moisture exposure.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dry habitable areas — IP2X</strong> — standard domestic electrical
                accessories (IP2X) are acceptable in areas of the basement that are permanently dry,
                have effective waterproofing, and are not subject to condensation. This is the
                minimum IP rating for any domestic electrical accessory under BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Areas near drainage channels — IP44</strong> — within 300mm of drainage
                channels or sump pits, equipment should have IP44 rating (protection against solid
                objects over 1mm and water splashing from any direction). Downlighters, junction
                boxes, and socket-outlets in these zones must meet this minimum.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Areas subject to water ingress — IP55</strong> — where the basement is known
                to experience periodic water ingress or where equipment may be subject to water jets
                (for example, near a washing area or in a utility basement), IP55 (protection
                against low-pressure water jets from any direction) should be specified.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sump pump enclosures — IP65 or higher</strong> — the sump pump itself and
                its electrical connections should be rated IP65 or higher (dust-tight and protected
                against water jets). Many submersible sump pumps are rated IP68 (continuous
                submersion).
              </span>
            </li>
          </ul>
        </div>
        <p>
          The IP rating requirements for each zone should be documented by the electrician in the
          design records. Where basement bathrooms or wet rooms are included, the zone
          classification under BS 7671 Section 701 (Special Locations — Bathrooms) also applies.
        </p>
      </>
    ),
  },
  {
    id: 'sump-pump',
    heading: 'Sump Pump Electrical Supply',
    content: (
      <>
        <p>
          A sump pump is a critical element of the waterproofing strategy for most converted
          basements. The electrical supply to the sump pump must be reliable, properly protected,
          and clearly identified at the consumer unit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit</strong> — the sump pump must be on a dedicated circuit
                from the consumer unit. It must never share a socket with other appliances. The
                circuit should be protected by an RCBO (combined RCD and circuit breaker) so that a
                fault on the pump circuit does not trip the entire board and leave the basement
                without lighting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery backup or UPS</strong> — a basement flood is most likely during a
                storm, which may also cause a power cut. A battery-backup sump pump (with a separate
                battery-powered pump that activates if the mains pump fails) or a UPS on the mains
                pump circuit provides critical protection when it is most needed. This is strongly
                recommended for basements where flooding risk is significant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit labelling</strong> — the sump pump circuit must be clearly labelled
                at the consumer unit so that it is never accidentally switched off. Consider fitting
                a lockable cover over the circuit breaker to prevent inadvertent operation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-water alarm</strong> — a high-water level alarm connected to the sump
                provides warning if the pump fails or cannot keep pace with inflow. The alarm should
                be connected to a circuit separate from the pump circuit — if the pump circuit
                trips, the alarm must still function.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting in Basement Conversions',
    content: (
      <>
        <p>
          Emergency lighting activates automatically when the mains supply fails, illuminating
          escape routes to allow occupants to evacuate safely. BS 5266-1 (Emergency lighting — Code
          of practice for the emergency lighting of premises) sets out the requirements.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial and mixed-use basements — mandatory</strong> — where a converted
                basement is used for commercial purposes (a studio, office, gym, or any space
                accessed by clients or employees), emergency lighting on the escape route is a legal
                requirement under the Regulatory Reform (Fire Safety) Order 2005 and BS 5266-1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Residential basements — best practice</strong> — for a basement used purely
                as domestic living space, emergency lighting is not a strict legal requirement.
                However, a windowless basement in a power cut is completely dark and represents a
                real fall and injury risk. Self-contained emergency luminaires (maintained or
                non-maintained) on the escape route are strongly recommended.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-contained luminaires</strong> — self-contained emergency luminaires
                contain their own battery, charger, and lamp. They connect to a standard lighting
                circuit and charge continuously. When mains power fails, the battery maintains the
                lamp for a minimum of one hour (or three hours for higher-risk premises) under BS
                5266-1.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Emergency luminaires must be tested monthly (function test) and annually (rated duration
          discharge test) under BS 5266-1. For commercial basements, a maintenance log must be kept.
        </p>
      </>
    ),
  },
  {
    id: 'flood-protection',
    heading: 'Flood Sensor Integration',
    content: (
      <>
        <p>
          Flood sensors provide early warning of water ingress, allowing homeowners to take action
          before significant damage occurs. While not a Building Regulations requirement, they are a
          prudent addition to any converted basement electrical installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sensor positioning</strong> — sensors should be placed at the lowest points
                of the basement floor, near drainage channels, and adjacent to the sump pit. A
                sensor should also be positioned at the point where groundwater ingress is most
                likely to occur first.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Alarm outputs</strong> — flood sensors should connect to an audible alarm
                (to alert occupants when they are in the basement) and ideally to a smart home
                system or GSM dialler that sends an alert to the homeowner's phone when they are not
                present. A flooded basement discovered days later causes far more damage than one
                detected within hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Integration with sump pump control</strong> — some advanced sump pump
                controllers integrate with flood sensors and can automatically alert the homeowner
                when the sump fill rate is unusually high, indicating abnormal water ingress before
                the pump is overwhelmed.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P and Building Regulations for Basement Conversions',
    content: (
      <>
        <p>
          Basement conversion electrical work is always notifiable under Part P of the Building
          Regulations 2010. The overall basement conversion also requires full building regulations
          approval for structural, waterproofing, fire safety, and ventilation aspects.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use a competent person scheme electrician</strong> — NICEIC, NAPIT, or
                ELECSA registered electricians can self-certify the electrical element of the work.
                Given the complexity of a basement installation, experience with special locations
                and moisture risk is important — check the electrician has relevant experience
                before appointing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC on completion</strong> — an Electrical Installation Certificate (EIC)
                must be issued covering all new circuits in the basement conversion. Use the{' '}
                <SEOInternalLink href="/eic-certificate">Elec-Mate EIC app</SEOInternalLink>{' '}
                to complete and issue the certificate on site.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Basement Conversion Electrical Work',
    content: (
      <>
        <p>
          Basement conversion electrical work is specialist and well-remunerated. Electricians with
          experience in special locations, moisture risk assessment, and emergency lighting can
          command premium rates on these projects.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Document Everything</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Elec-Mate EIC certificate app
                  </SEOInternalLink>{' '}
                  to produce comprehensive documentation on site. For basement installations, the IP
                  rating decisions and zone assessments should be clearly recorded — this protects
                  you if questions arise about the installation in future.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Itemise Your Quotes Thoroughly</h4>
                <p className="text-white text-sm leading-relaxed">
                  Basement projects have higher material costs due to IP-rated accessories, conduit,
                  emergency luminaires, and sump pump circuits. Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to itemise all elements so clients understand exactly what they are paying for.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage basement conversion jobs with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for EIC certificates, quoting, and job management. Specialist work deserves specialist tools. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BasementConversionElectricalPage() {
  return (
    <GuideTemplate
      title="Basement Conversion Electrical Work UK | Cellar Wiring Guide"
      description="Complete guide to electrical work in a basement conversion. Damp considerations, IP ratings for zones near drainage, sump pump electrical supply, emergency lighting requirements, flood sensor integration, and Part P Building Regulations compliance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Conversion Guide"
      badgeIcon={Droplets}
      heroTitle={
        <>
          Basement Conversion Electrical Work:{' '}
          <span className="text-yellow-400">UK Cellar Wiring Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about electrical work in a basement or cellar conversion — damp considerations, IP ratings for zones near drainage, sump pump supply, emergency lighting, flood sensor integration, and the mandatory EIC certificate under Part P."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Basement Conversion Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Complete Basement Conversion EICs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion, quoting, and job management. 7-day free trial, cancel anytime."
    />
  );
}
