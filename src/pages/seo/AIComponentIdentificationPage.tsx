import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Camera,
  ScanLine,
  Database,
  Cpu,
  RefreshCw,
  ShieldCheck,
  Package,
  Search,
  Zap,
  Brain,
} from 'lucide-react';

export default function AIComponentIdentificationPage() {
  return (
    <ToolTemplate
      title="AI Component ID | Photo Scanner Tool | Elec-Mate"
      description="Point your phone camera at any electrical component and Elec-Mate's AI identifies it instantly. Get specifications, BS 7671 compliance details, compatible replacements, and supplier pricing — all from a single photo."
      datePublished="2026-01-20"
      dateModified="2026-02-13"
      toolPath="/tools/ai-component-identification"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'AI Component Identification', href: '/tools/ai-component-identification' },
      ]}
      tocItems={[
        { id: 'what-is-component-id', label: 'What Is AI Component ID?' },
        { id: 'how-it-works', label: 'How It Works' },
        { id: 'what-it-identifies', label: 'What It Identifies' },
        { id: 'replacements-and-alternatives', label: 'Replacements and Alternatives' },
        { id: 'on-site-scenarios', label: 'On-Site Scenarios' },
        { id: 'how-to', label: 'How to Use It' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="AI-Powered Tool"
      badgeIcon={Camera}
      heroTitle={
        <>
          <span className="text-yellow-400">AI Component ID</span> — Identify Any Electrical
          Component from a Photo
        </>
      }
      heroSubtitle="Point your phone camera at an MCB, RCBO, contactor, relay, or any electrical component. Elec-Mate's AI identifies it in seconds — manufacturer, model, specifications, BS 7671 compliance, and compatible replacements with current trade pricing."
      heroFeaturePills={[
        { icon: Camera, label: 'Photo Recognition' },
        { icon: Database, label: 'Component Database' },
        { icon: RefreshCw, label: 'Replacement Finder' },
        { icon: ShieldCheck, label: 'BS 7671 Specs' },
      ]}
      readingTime={10}
      keyTakeaways={[
        'Photograph any electrical component and the AI identifies the manufacturer, model, and full technical specification in seconds.',
        'The component database covers MCBs, RCBOs, RCDs, contactors, relays, isolators, SPDs, timers, and hundreds of other devices from all major UK manufacturers.',
        'Compatible replacement suggestions include current-production equivalents when the original component is obsolete or discontinued.',
        'Trade pricing from UK wholesalers is shown alongside each replacement, so you can quote remedial work on the spot.',
        'All identified components include BS 7671:2018+A3:2024 compliance information, including breaking capacity, disconnection characteristics, and applicable regulations.',
      ]}
      sections={[
        {
          id: 'what-is-component-id',
          heading: 'What Is AI Component Identification?',
          content: (
            <>
              <p>
                AI Component Identification is a tool built into the Elec-Mate platform that uses
                computer vision to recognise electrical components from photographs. You point your
                phone camera at a component — an MCB inside a consumer unit, an RCBO on a DIN rail,
                a contactor in a distribution board, or any other electrical device — and the AI
                identifies what it is, who manufactured it, what its technical specifications are,
                and whether it is still in production.
              </p>
              <p>
                This solves a problem that every electrician encounters regularly. You open a
                consumer unit or distribution board and find components that are decades old, with
                faded labels, obscured part numbers, or manufacturers that have changed names or
                been acquired by other companies. Identifying the exact component matters because
                you need to know its breaking capacity, its disconnection characteristics, and
                whether it is still compliant with current regulations. You also need to know what
                to replace it with if it has failed or is no longer suitable.
              </p>
              <p>
                The AI Component Identifier draws on a database that covers all major UK electrical
                component manufacturers — Hager, Schneider Electric, Eaton (MEM), Wylex, Crabtree,
                ABB, Siemens, Chint, and many others — including legacy and discontinued product
                ranges. This means it can identify components from the 1970s-era Wylex rewireable
                fuse boards just as effectively as current-production Hager RCBOs.
              </p>
              <p>
                The tool is part of Elec-Mate's broader AI toolkit, which includes the{' '}
                <SEOInternalLink href="/tools/ai-electrician">AI Board Scanner</SEOInternalLink>,
                the{' '}
                <SEOInternalLink href="/tools/ai-circuit-designer">
                  AI Circuit Designer
                </SEOInternalLink>
                , and the{' '}
                <SEOInternalLink href="/tools/ai-cost-engineer">AI Cost Engineer</SEOInternalLink>.
                Together, these tools handle identification, design, and costing of electrical
                components and circuits from a single platform.
              </p>
            </>
          ),
          appBridge: {
            title: 'AI Component Identifier — Built Into Elec-Mate',
            description:
              'Photograph any electrical component and the AI identifies it instantly. Manufacturer, model, specifications, and compatible replacements with trade pricing. No separate app needed.',
            icon: Camera,
          },
        },
        {
          id: 'how-it-works',
          heading: 'How the AI Recognition Works',
          content: (
            <>
              <p>
                The Component Identifier uses a combination of computer vision and a specialist
                electrical component database. When you take a photo, the AI analyses multiple
                visual features simultaneously: the physical shape and form factor of the device,
                the colour and styling (which varies between manufacturers), any visible text
                including ratings, part numbers, and certification marks, the mounting arrangement
                (DIN rail, surface mount, panel mount), and the terminal configuration.
              </p>
              <p>
                This multi-feature approach is important because no single visual cue is sufficient
                for reliable identification. A faded label might be unreadable, but the physical
                form factor combined with the terminal layout and colour scheme can narrow the
                identification to a specific manufacturer and product range. The AI then
                cross-references this against its database to determine the exact model.
              </p>
              <p>
                The system handles the real-world conditions that electricians work in. Photos taken
                in poorly lit distribution boards, images of dust-covered components, partially
                obscured devices behind cables — the AI is trained on thousands of real-world
                installation photographs, not just clean product images from manufacturer
                catalogues. This means it performs well in the conditions you actually encounter on
                site.
              </p>
              <p>
                For components where the AI cannot achieve a high-confidence single identification,
                it presents the most likely candidates ranked by probability, along with the
                distinguishing features to check. For example, if a device could be either a
                Schneider Acti9 iC60N or an older Multi 9 C60N, it will explain the visual
                differences to help you confirm which one you have.
              </p>
            </>
          ),
        },
        {
          id: 'what-it-identifies',
          heading: 'What Components the AI Can Identify',
          content: (
            <>
              <p>
                The Component Identifier covers the full range of electrical components found in UK
                domestic, commercial, and light industrial installations. The database includes:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">
                    Miniature Circuit Breakers (MCBs)
                  </span>{' '}
                  — Type B, Type C, and Type D from all major manufacturers. Ratings from 2A to
                  125A. Single pole, double pole, triple pole, and TP+N configurations.
                </li>
                <li>
                  <span className="font-semibold text-white">
                    Residual Current Circuit Breakers with Overcurrent Protection (RCBOs)
                  </span>{' '}
                  — Type A and Type B sensitivity. All standard ratings and breaking capacities.
                </li>
                <li>
                  <span className="font-semibold text-white">Residual Current Devices (RCDs)</span>{' '}
                  — 30mA, 100mA, and 300mA sensitivity ratings. Type AC, Type A, and Type B.
                </li>
                <li>
                  <span className="font-semibold text-white">Surge Protection Devices (SPDs)</span>{' '}
                  — Type 1, Type 2, and Type 1+2 combined devices. Status indicators and replacement
                  cartridge identification.
                </li>
                <li>
                  <span className="font-semibold text-white">Contactors and relays</span> — Heating
                  contactors, lighting contactors, motor starters, auxiliary relays, and time delay
                  relays.
                </li>
                <li>
                  <span className="font-semibold text-white">
                    Isolators and switch disconnectors
                  </span>{' '}
                  — Main switches, rotary isolators, and fused switch disconnectors from 20A to
                  800A.
                </li>
                <li>
                  <span className="font-semibold text-white">Legacy and obsolete devices</span> —
                  Rewireable fuses (BS 3036), cartridge fuses (BS 88 and BS 1361), and discontinued
                  MCB ranges from Wylex, MEM, Crabtree, and other manufacturers that are no longer
                  in production but still found in existing installations.
                </li>
              </ul>
              <p>
                The database is updated regularly as manufacturers release new products and
                discontinue existing ones. When a product is discontinued, the database retains the
                identification data but adds a discontinued flag and links to the manufacturer's
                recommended replacement.
              </p>
            </>
          ),
        },
        {
          id: 'replacements-and-alternatives',
          heading: 'Replacements and Alternatives',
          content: (
            <>
              <p>
                One of the most valuable features of the Component Identifier is its ability to
                suggest compatible replacements. When you identify a component, the AI shows you
                current-production equivalents from all major manufacturers — not just the original
                manufacturer. This is particularly useful when dealing with obsolete equipment.
              </p>
              <p>
                For example, if you identify an old MEM MCB that is no longer manufactured, the
                system will suggest the equivalent Eaton device (since Eaton acquired MEM), plus
                comparable products from Hager, Schneider, and other manufacturers. Each suggestion
                includes the key technical parameters — breaking capacity, disconnection
                characteristics, physical dimensions, and terminal compatibility — so you can verify
                that the replacement is a genuine like-for-like substitute.
              </p>
              <p>
                The replacement suggestions also include current UK trade pricing from major
                wholesalers. This means you can provide the customer with a remedial cost on the
                spot — "this MCB needs replacing, a suitable replacement costs approximately X, and
                the labour to fit it would be Y." Combined with Elec-Mate's{' '}
                <SEOInternalLink href="/tools/ai-cost-engineer">AI Cost Engineer</SEOInternalLink>,
                you can generate a formal quotation for component replacements directly from the
                identification results.
              </p>
              <p>
                For installations where the existing board is obsolete and replacement components
                are not available, the system flags this clearly and recommends a full consumer unit
                upgrade. It explains why — for example, that the existing board uses a mounting
                system that is not compatible with current-production devices, or that replacement
                rewireable fuse carriers are no longer manufactured to the required standard.
              </p>
              <SEOAppBridge
                title="Component to Quote in 60 Seconds"
                description="Identify a component, see replacement options with trade pricing, and generate a professional quotation for the customer — all from one photograph. The AI Component Identifier integrates with the Cost Engineer for instant remedial quotes."
                icon={Package}
              />
            </>
          ),
        },
        {
          id: 'on-site-scenarios',
          heading: 'On-Site Scenarios',
          content: (
            <>
              <p>
                The Component Identifier is designed for the situations electricians encounter every
                working day. Here are the most common use cases:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">EICR inspections</span> — you open a
                  distribution board and need to record every device for the schedule of circuits.
                  Instead of squinting at faded labels and manually looking up specifications, you
                  photograph each device and the data populates your{' '}
                  <SEOInternalLink href="/guides/eicr-certificate">EICR form</SEOInternalLink>{' '}
                  automatically.
                </li>
                <li>
                  <span className="font-semibold text-white">Fault finding</span> — a device has
                  tripped or failed and you need to identify it to determine whether it is the
                  correct type and rating for the circuit it protects. The Component Identifier
                  shows you the full specification instantly, so you can verify compliance without
                  searching through manufacturer catalogues.
                </li>
                <li>
                  <span className="font-semibold text-white">Remedial work quoting</span> — during
                  an inspection, you identify devices that need replacing. Photograph each one, get
                  the replacement options and pricing, and produce a remedial works quotation before
                  you leave the site.
                </li>
                <li>
                  <span className="font-semibold text-white">Apprentice training</span> —
                  apprentices learning to identify components can use the tool as a learning aid.
                  Photograph a device, see what it is, and read the technical specification. This
                  builds component recognition skills that are essential for site work. See our
                  guide on{' '}
                  <SEOInternalLink href="/guides/ai-for-electrical-apprentices">
                    AI for electrical apprentices
                  </SEOInternalLink>{' '}
                  for more training applications.
                </li>
                <li>
                  <span className="font-semibold text-white">Stock management</span> — photograph
                  components in your van stock to quickly check what you have, verify ratings, and
                  identify any items that have been superseded by newer models.
                </li>
              </ul>
              <p>
                The tool works offline for previously cached components, so you can use it even in
                basements and plant rooms where mobile signal is weak. New identifications require a
                data connection, but the results are cached for future offline access.
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Open the Component Identifier',
          text: 'Navigate to the AI Tools section in Elec-Mate and select Component Identifier. Grant camera access when prompted.',
        },
        {
          name: 'Photograph the component',
          text: 'Point your phone camera at the electrical component. Ensure the device face is visible, including any ratings or labels. The AI works best with clear, well-lit images but handles low-light conditions effectively.',
        },
        {
          name: 'Review the identification',
          text: 'The AI identifies the manufacturer, model, and full technical specification within seconds. Check the confidence rating and verify the identification matches the physical device.',
        },
        {
          name: 'View replacements and pricing',
          text: 'See compatible replacement options from all major manufacturers with current UK trade pricing. Compare specifications side by side to confirm compatibility.',
        },
        {
          name: 'Generate a quote or add to your report',
          text: 'Send the identified component and replacement to the Cost Engineer for a formal quotation, or add the component data directly to your EICR or EIC schedule of circuits.',
        },
      ]}
      howToHeading="How to Use AI Component Identification"
      howToDescription="Identify any electrical component from a photo in five simple steps."
      features={[
        {
          icon: Camera,
          title: 'Photo Recognition',
          description:
            'Point and shoot identification using your phone camera. Works in real-world conditions — low light, dust, faded labels, and partially obscured devices.',
        },
        {
          icon: Database,
          title: 'Comprehensive Database',
          description:
            'Covers all major UK manufacturers including Hager, Schneider, Eaton, Wylex, Crabtree, ABB, Siemens, and Chint. Includes legacy and discontinued products.',
        },
        {
          icon: ScanLine,
          title: 'Full Specification Data',
          description:
            'Breaking capacity, disconnection characteristics, rated current, voltage rating, IP rating, terminal sizes, and physical dimensions for every identified component.',
        },
        {
          icon: RefreshCw,
          title: 'Replacement Finder',
          description:
            'Compatible replacements from all manufacturers with current-production alternatives for obsolete devices. Cross-referenced for electrical and physical compatibility.',
        },
        {
          icon: Package,
          title: 'Trade Pricing',
          description:
            'Current UK trade pricing from major wholesalers shown alongside each replacement option. Generate remedial work quotes directly from identification results.',
        },
        {
          icon: ShieldCheck,
          title: 'BS 7671 Compliance Data',
          description:
            'Every identified component includes BS 7671:2018+A3:2024 compliance information — applicable regulations, required characteristics, and any restrictions on use.',
        },
      ]}
      featuresHeading="Component Identifier Features"
      featuresSubheading="Everything you need to identify, specify, and replace electrical components on site."
      faqs={[
        {
          question: 'How accurate is the AI component identification?',
          answer:
            'The AI Component Identifier achieves high accuracy for components from major UK manufacturers, including current-production and recently discontinued ranges. Accuracy is highest when the device face is clearly visible with readable text — in these cases, the system typically identifies the exact model and variant. For older or heavily worn devices where labels are unreadable, the AI uses physical form factor, colour, terminal configuration, and mounting style to narrow the identification to a manufacturer and product range, then presents the most likely specific models. In all cases, the system shows a confidence percentage so you can judge whether manual verification is needed.',
        },
        {
          question: 'Can it identify components inside consumer units without removing them?',
          answer:
            'Yes. The Component Identifier is designed to work with in-situ photographs — you do not need to remove devices from the board. The AI can identify MCBs, RCBOs, and RCDs from their visible face in a consumer unit, including the device type, manufacturer, rating, and breaking capacity. For devices that are partially obscured by cables or bus bar covers, the system uses whatever visual information is available. If the front face is completely hidden, you may need to photograph from a different angle. The system works alongside the AI Board Scanner, which identifies the complete consumer unit layout, so you can scan the whole board and identify individual components in a single workflow.',
        },
        {
          question: 'Does it work with three-phase distribution boards?',
          answer:
            'Yes. The Component Identifier works with all types of electrical enclosures — domestic consumer units, commercial distribution boards, motor control centres, and industrial switchgear. For three-phase installations, it identifies triple-pole MCBs, TP+N devices, three-phase RCDs, MCCBs, ACBs, contactors, motor starters, and all associated control gear. It recognises devices from commercial and industrial manufacturers including Schneider Electric (Acti9, Compact NSX), ABB (System Pro M, Tmax), Eaton (xPole, NZM), and Hager (HRC fuse switches, load break switches).',
        },
        {
          question: 'What happens if a component is obsolete and no direct replacement exists?',
          answer:
            'When the AI identifies a component that has been discontinued with no direct replacement, it takes a different approach. Instead of suggesting a like-for-like swap (which is not possible), it recommends the nearest equivalent devices from current manufacturers and clearly explains any differences in physical dimensions, terminal positions, or mounting compatibility. If the replacement device requires a different DIN rail arrangement or backplate, the system flags this. In cases where the board itself is obsolete and no current-production devices are physically compatible, the system recommends a full consumer unit or distribution board upgrade and can generate a specification for the replacement board using the AI Circuit Designer.',
        },
        {
          question: 'Can I use the Component Identifier for PAT testing equipment identification?',
          answer:
            'The Component Identifier is primarily designed for fixed installation components — protective devices, switchgear, and control gear. However, it can identify many types of portable equipment and accessories that electricians encounter during PAT testing, including plug types (BS 1363, BS 546, IEC 60309), connector ratings, and appliance classification labels. For detailed PAT testing guidance and procedures, see our PAT testing guide.',
        },
        {
          question: 'How often is the component database updated?',
          answer:
            'The component database is updated regularly as manufacturers release new products, discontinue existing lines, or rebrand following acquisitions. Major product launches from Hager, Schneider, Eaton, and other key manufacturers are typically added within days of release. Discontinued product flags are added as manufacturers withdraw devices from sale. The database also receives ongoing improvements to recognition accuracy based on real-world usage data — as more electricians use the tool and provide feedback on identifications, the AI becomes better at recognising components in challenging conditions.',
        },
        {
          question:
            'Does it show the wiring diagram or terminal arrangement for identified components?',
          answer:
            'Yes. For components where wiring diagrams are available, the identification results include the terminal arrangement diagram showing the connection points, their labelling, and the correct wiring configuration. This is particularly useful for contactors, relays, and timer switches where the terminal arrangement is not always obvious. The system also shows the torque settings for terminals where specified by the manufacturer, which is important for compliance with BS 7671 Regulation 526.1.',
        },
      ]}
      faqHeading="AI Component Identification FAQs"
      relatedPages={[
        {
          href: '/tools/ai-electrician',
          title: 'AI Board Scanner',
          description:
            'Photograph a complete consumer unit and extract all circuit data, device ratings, and board layout in seconds.',
          icon: ScanLine,
          category: 'AI Tools',
        },
        {
          href: '/tools/ai-circuit-designer',
          title: 'AI Circuit Designer',
          description:
            'Design complete consumer unit schedules with cable sizes, protective devices, and diversity calculations to BS 7671.',
          icon: Cpu,
          category: 'AI Tools',
        },
        {
          href: '/tools/ai-cost-engineer',
          title: 'AI Cost Engineer',
          description:
            'Generate itemised quotes with real UK trade pricing, labour estimates, and profit margins from a job description.',
          icon: Package,
          category: 'AI Tools',
        },
        {
          href: '/guides/ai-tools-for-electricians',
          title: 'AI Tools for Electricians 2026',
          description:
            'Complete guide to every AI tool available for UK electricians — board scanning, defect classification, cost estimation, and more.',
          icon: Brain,
          category: 'Guides',
        },
        {
          href: '/guides/ai-for-electrical-apprentices',
          title: 'AI for Electrical Apprentices',
          description:
            'How apprentices can use AI tools for component identification, regulation lookup, exam preparation, and on-site learning.',
          icon: Search,
          category: 'Guides',
        },
        {
          href: '/guides/ai-electrical-fault-finding',
          title: 'AI Electrical Fault Finding',
          description:
            'How AI analyses symptoms, suggests probable causes, and recommends test sequences for electrical fault diagnosis.',
          icon: Zap,
          category: 'Guides',
        },
      ]}
      ctaHeading="Identify any component in seconds"
      ctaSubheading="Join 430+ UK electricians using AI for instant component identification, replacement sourcing, and remedial quoting. 7-day free trial, cancel anytime."
    />
  );
}
