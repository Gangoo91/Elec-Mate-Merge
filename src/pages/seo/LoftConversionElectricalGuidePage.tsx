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
  Flame,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Conversion Guides', href: '/loft-conversion-electrical-guide' },
  { label: 'Loft Conversion Electrical Guide', href: '/loft-conversion-electrical-guide' },
];

const tocItems = [
  { id: 'circuit-planning', label: 'Circuit Planning' },
  { id: 'smoke-detection', label: 'Smoke Detection (BS 5839)' },
  { id: 'escape-route-lighting', label: 'Escape Route Lighting' },
  { id: 'part-p', label: 'Part P Building Regulations' },
  { id: 'cable-routes', label: 'Cable Routes and Installation' },
  { id: 'eic-certificate', label: 'EIC Certificate' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A loft conversion is notifiable under Part P of the Building Regulations 2010. An Electrical Installation Certificate (EIC) must be issued on completion — this is a legal requirement and essential for building regulations sign-off.',
  'Interlinked mains-powered smoke alarms are required in all new habitable rooms created by a loft conversion under BS 5839-6:2019. Grade D (mains-powered with battery backup) LD2 or LD3 coverage is the typical minimum for domestic properties.',
  'If the loft conversion creates a new storey, escape route lighting becomes a building regulations requirement. This typically means mains-powered luminaires or emergency lighting on the escape route from the loft to the final exit.',
  'A bedroom loft conversion should be planned with a dedicated lighting circuit, a minimum of six double socket-outlet positions, and consideration for an en-suite shower circuit if applicable — all with RCD protection under Regulation 411.3.3 of BS 7671.',
  'Home office loft conversions may also require data infrastructure. Running conduit and ethernet cable during electrical first fix is far cheaper than retro-fitting later.',
];

const faqs = [
  {
    question: 'Do I need an electrician for a loft conversion?',
    answer:
      'Yes. All fixed electrical work in a loft conversion is notifiable under Part P of the Building Regulations 2010. Using a registered competent person scheme electrician (NICEIC, NAPIT, ELECSA) means they self-certify and notify the scheme on your behalf. If you use any other electrician, you must notify building control before work starts. Either way, an Electrical Installation Certificate (EIC) is legally required on completion.',
  },
  {
    question: 'What smoke detectors are required in a loft conversion?',
    answer:
      'BS 5839-6:2019 is the British Standard for fire detection in domestic premises. For a loft conversion creating a new habitable room, interlinked mains-powered smoke alarms with battery backup (Grade D) are required. The coverage level depends on risk assessment but typically includes a smoke alarm in the new loft room, on the landing outside, and an alarm linked to all existing alarms in the property. A heat alarm (rather than smoke alarm) is recommended in kitchens. All alarms must be interlinked so they all sound together.',
  },
  {
    question: 'Does a loft conversion need emergency lighting?',
    answer:
      'Building Regulations Approved Document B (Fire Safety) requires that escape routes in new storeys have adequate escape lighting. For most domestic loft conversions, this is achieved using mains-powered luminaires on the escape route (stairs and landings) that are part of the permanent lighting installation. Dedicated emergency lighting (battery-backed luminaires that illuminate on power failure) is required if the escape route has areas with no natural light or if the loft is used for commercial purposes.',
  },
  {
    question: 'How many sockets should a loft conversion bedroom have?',
    answer:
      'BS 7671 does not specify a minimum, but the 18th Edition guidance and good practice suggest at least six double socket-outlet positions for a bedroom loft conversion. Position sockets on all available walls rather than just one side of the room. Include USB charging sockets if the client requests them. If the loft will be used as a home office, plan for at least eight double sockets and dedicated data infrastructure.',
  },
  {
    question: 'Can the existing consumer unit handle the extra circuits for a loft conversion?',
    answer:
      'This depends entirely on the existing installation. The electrician must check that the consumer unit has sufficient spare ways for the new circuits, the incoming main fuse is rated for the additional load, and the overall diversity calculation is acceptable. Old consumer units with rewirable fuses or without RCD protection should be upgraded before loft conversion circuits are added. A modern dual-RCD or full RCBO consumer unit is the appropriate choice for a new installation.',
  },
  {
    question: 'What cable should be used in a loft conversion?',
    answer:
      'In most loft conversions, twin and earth flat cable (6242Y) is used for circuits within the habitable space. In accessible roof voids or areas where cables could be subject to mechanical damage, the cables must be protected in conduit or routed to avoid damage risk. Under Regulation 522.6.101 of BS 7671, cables buried in walls must be run in safe zones (horizontally or vertically from an accessory) or protected by a metallic conduit or mechanical protection.',
  },
  {
    question: 'How much does electrical work for a loft conversion cost?',
    answer:
      'Electrical costs for a loft conversion typically range from £1,200 to £3,500 depending on the extent of work. A standard bedroom conversion with lighting, sockets, and smoke alarm interlink is at the lower end. An en-suite with shower circuit, electric underfloor heating, and consumer unit upgrade will push costs towards the top of the range. Always obtain at least three quotes from registered electricians and ensure the price includes the EIC and Part P notification.',
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
    href: '/garage-conversion-electrical',
    title: 'Garage Conversion Electrical Work',
    description: 'Upgrading from garage supply to habitable room standard — full wiring guide.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/basement-conversion-electrical',
    title: 'Basement Conversion Electrical Work',
    description: 'IP ratings, damp considerations, sump pumps, and emergency lighting for basements.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates on your phone with instant PDF export.',
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
    id: 'circuit-planning',
    heading: 'Circuit Planning for Your Loft Conversion',
    content: (
      <>
        <p>
          The electrical requirements for a loft conversion depend on how the space will be used.
          A bedroom, a home office, and an en-suite loft all have different circuit requirements.
          Agreeing on the intended use before first fix is essential to avoid expensive alterations
          later.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bedroom loft</strong> — a dedicated lighting circuit (or connection to the
                nearest floor circuit), a minimum of six double socket-outlet positions, a phone or
                USB charging point near the bed, and switched connections for bedside lamps. If
                fitted wardrobes are planned, include sockets inside the wardrobe space for lighting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Home office loft</strong> — a minimum of eight double socket-outlets,
                a dedicated circuit for a multi-monitor workstation, ethernet ports (run Cat6 during
                first fix), and a separate circuit for a printer or laser scanner. Consider an
                uninterruptible power supply (UPS) socket position for the main workstation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>En-suite loft</strong> — if the loft includes a shower room or en-suite,
                a separate 45A shower circuit is required (or 32A for electric shower units up to
                7.5kW). The bathroom circuits must comply with BS 7671 Section 701 (special
                locations — bathrooms), including IP-rated fittings for the appropriate zones and
                supplementary bonding where required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Velux and roof window switches</strong> — electrically operated roof
                windows require a dedicated switching circuit. This is often overlooked at planning
                stage and is costly to add retrospectively.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All socket-outlet circuits in the loft conversion must have RCD protection with a rated
          residual operating current not exceeding 30mA, in accordance with Regulation 411.3.3 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'smoke-detection',
    heading: 'Smoke Detection Requirements Under BS 5839-6',
    content: (
      <>
        <p>
          Smoke detection is one of the most safety-critical elements of a loft conversion electrical
          installation. Building Regulations Approved Document B and BS 5839-6:2019 (Fire detection
          and fire alarm systems — Code of practice for the design, installation, commissioning and
          maintenance of fire detection and fire alarm systems in domestic premises) set out the
          requirements.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade D — the domestic standard</strong> — Grade D systems use mains-powered
                alarms with integral battery backup. This is the minimum grade required for most
                domestic loft conversions. Grade D alarms are self-contained and do not require a
                separate control panel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>LD2 or LD3 coverage</strong> — the coverage level defines where detectors
                are positioned. LD3 covers escape routes only (hallways and landings). LD2 covers
                escape routes plus high-risk rooms such as kitchens. For a loft conversion creating
                a new sleeping storey, LD2 coverage is the recommended minimum, with detectors in
                the loft room, on the stair landing, and on all floors between the loft and the
                ground floor exit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Interlinked alarms</strong> — all smoke alarms in the property must be
                interlinked so that all alarms sound simultaneously when any one detector is
                triggered. Modern radio-interlinked (wireless) Grade D alarms are acceptable and
                avoid the need to run new cables to existing alarm positions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat alarms for kitchens</strong> — a heat alarm (rather than a smoke alarm)
                is recommended in kitchens under BS 5839-6 to avoid false alarms from cooking. The
                heat alarm must be interlinked with the smoke alarm system.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The smoke alarm installation forms part of the fixed electrical installation and must be
          included in the scope of the{' '}
          <SEOInternalLink href="/tools/eic-certificate">Electrical Installation Certificate</SEOInternalLink>{' '}
          issued on completion of the loft conversion electrical work.
        </p>
      </>
    ),
  },
  {
    id: 'escape-route-lighting',
    heading: 'Escape Route Lighting for Loft Conversions',
    content: (
      <>
        <p>
          When a loft conversion creates a new storey (typically a loft room accessed via a
          new staircase), Building Regulations Approved Document B requires that the escape
          route from the new storey to the final exit at ground level is adequately lit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mains-powered stair and landing lighting</strong> — the minimum requirement
                in most domestic loft conversions is mains-powered lighting on the loft staircase,
                all intermediate landings, and the ground floor hallway to the exit door. This
                lighting must be on permanently wired circuits (not plug-in lamps).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting — when required</strong> — dedicated emergency
                lighting (self-contained battery-backed luminaires that illuminate automatically on
                mains failure) is required where the escape route includes areas with no natural
                light, where a building control officer determines the risk justifies it, or where
                the loft is used for commercial or business purposes. For most residential loft
                conversions, mains-powered luminaires on the escape route are sufficient.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switch positions</strong> — staircase lighting must be controllable from
                the top and bottom of each flight. Two-way and intermediate switching is required
                where three or more switch positions are needed (for example, loft landing,
                intermediate floor landing, and ground floor hallway).
              </span>
            </li>
          </ul>
        </div>
        <p>
          The escape route lighting installation should be agreed with the building control officer
          at the initial consultation stage, before the electrical first fix begins. Requirements
          can vary between projects and local authority interpretations.
        </p>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Building Regulations for Loft Conversions',
    content: (
      <>
        <p>
          Loft conversion electrical work is always notifiable under Part P of the Building
          Regulations 2010. There are no exemptions for loft conversions — even minor electrical
          work in the new space (adding a single socket, for example) is notifiable if it forms
          part of the conversion project.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use a competent person scheme electrician</strong> — this is the simplest
                route. NICEIC, NAPIT, and ELECSA registered electricians can self-certify their
                work and notify the scheme on completion. The scheme notifies the local authority
                and you receive a completion certificate to keep with your property documents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building regulations sign-off</strong> — loft conversions typically require
                full building regulations approval (not just Part P notification) because they
                involve structural work, fire safety upgrades, and potentially planning permission.
                The building control officer will inspect the electrical work as part of the overall
                sign-off. The EIC must be available for inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Selling without an EIC</strong> — if you sell the property without an EIC
                for the loft conversion electrical work, your solicitor will flag the non-compliance
                and the buyer's solicitor will require an indemnity insurance policy. This costs
                money and raises concerns about the quality of all the work carried out.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cable-routes',
    heading: 'Cable Routes and Installation in Loft Conversions',
    content: (
      <>
        <p>
          Routing cables in a loft conversion presents unique challenges compared to standard
          domestic work. The new staircase, insulation, and roof structure all create obstacles
          and require careful planning.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermal insulation</strong> — cables buried in or adjacent to thermal
                insulation must be derated in accordance with BS 7671 Appendix 4. In practice this
                often means upsizing the cable from 2.5mm² to 4mm² for socket circuits, or routing
                cables through ventilated conduit above the insulation layer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safe zones</strong> — under Regulation 522.6.101 of BS 7671, cables in
                walls must run in defined safe zones (vertically above or below accessories, or
                horizontally from accessories) or be protected by metallic conduit or mechanical
                protection. This is particularly important in stud walls, which are common in
                loft conversions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Routing from lower floors</strong> — the main feed cables from the consumer
                unit to the loft will need to pass through existing floors and walls. Plan these
                routes with the builder before boarding begins, as retro-fitting cable routes through
                fire-stopped floors and insulated walls is significantly more disruptive.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eic-certificate',
    heading: 'Electrical Installation Certificate for Loft Conversions',
    content: (
      <>
        <p>
          An Electrical Installation Certificate (EIC) is a legal requirement for all new electrical
          work carried out in a loft conversion. The EIC confirms that the work has been designed,
          installed, inspected, and tested in accordance with BS 7671 and is safe to use.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scope of the EIC</strong> — the EIC must cover all new circuits installed
                in the loft conversion, including lighting, sockets, shower (if applicable), smoke
                alarm interlink, and any underfloor heating. If the consumer unit is upgraded, the
                EIC scope includes the consumer unit installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Schedule of test results</strong> — every circuit covered by the EIC must
                have measured values recorded for continuity, insulation resistance, polarity, earth
                fault loop impedance, and RCD operating time. These values prove that the circuits
                are safe and compliant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Store the EIC safely</strong> — keep the EIC with the property's building
                regulations completion certificate. Both documents are required when the property
                is sold and may be requested by insurers.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Use the{' '}
          <SEOInternalLink href="/tools/eic-certificate">Elec-Mate EIC app</SEOInternalLink> to
          complete the full certificate on site, including the schedule of test results. Generate a
          professional PDF and email it to the client immediately on completion.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Loft Conversion Electrical Work',
    content: (
      <>
        <p>
          Loft conversions are one of the most consistent sources of quality electrical work for
          domestic electricians. The combination of first fix, second fix, smoke alarm installation,
          testing, and certification makes these jobs both interesting and profitable.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue the EIC Before You Leave</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Elec-Mate EIC certificate app
                  </SEOInternalLink>{' '}
                  to complete the certificate and schedule of test results on site. The client gets
                  their document the same day, and you avoid chasing paperwork weeks after the job
                  is complete.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote the Full Scope Upfront</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to itemise every element of the loft conversion electrical works — first fix,
                  second fix, smoke alarms, testing, EIC, and Part P notification. A professional
                  itemised quote builds confidence and avoids disputes on completion.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage loft conversion jobs with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for EIC certificates, quoting, job management, and compliance. 7-day free trial, cancel anytime."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LoftConversionElectricalGuidePage() {
  return (
    <GuideTemplate
      title="Loft Conversion Electrical Guide UK | Wiring Your Loft"
      description="Complete guide to electrical work in a loft conversion. Circuit planning for bedroom, office, and en-suite use, smoke detection requirements under BS 5839-6, escape route lighting, Part P notification, and EIC certificate requirements."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Conversion Guide"
      badgeIcon={Flame}
      heroTitle={
        <>
          Loft Conversion Electrical Guide:{' '}
          <span className="text-yellow-400">Wiring Your Loft Right</span>
        </>
      }
      heroSubtitle="Everything you need to know about electrical work in a loft conversion — circuit planning for bedroom, home office, and en-suite use cases, interlinked smoke detection under BS 5839-6, escape route lighting, Part P notification, and the mandatory EIC certificate."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Loft Conversion Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Complete Loft Conversion EICs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EIC completion, quoting, and job management. 7-day free trial, cancel anytime."
    />
  );
}
