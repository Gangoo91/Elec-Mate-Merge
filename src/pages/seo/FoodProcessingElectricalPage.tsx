import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  ClipboardCheck,
  Zap,
  FileCheck2,
  Building2,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Specialist Sectors', href: '/specialist-electrical-sectors' },
  { label: 'Food Processing Electrical', href: '/food-processing-electrical' },
];

const tocItems = [
  { id: 'overview', label: 'Food Processing Electrical Overview' },
  { id: 'ip69k-washdown', label: 'IP69K Wash-Down Environments' },
  { id: 'atex-dust-zones', label: 'ATEX Dust Explosion Zones' },
  { id: 'hygienic-design', label: 'Hygienic Design Principles' },
  { id: 'stainless-steel', label: 'Stainless Steel Enclosures' },
  { id: 'cable-management', label: 'Hygienic Cable Management' },
  { id: 'brc-global-standards', label: 'BRC Global Standards' },
  { id: 'allergen-segregation', label: 'Allergen Zone Segregation' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Food processing electrical installations must withstand regular high-pressure, high-temperature wash-down using aggressive cleaning agents. Minimum IP69K rating is required for equipment in wash-down zones — IP65 or IP66 is not sufficient.',
  'Grain, flour, sugar, and other organic dusts present a real explosion risk. ATEX dust zone classification (Zone 20, 21, 22) applies to mills, silos, conveyors, and mixing areas. DSEAR (Dangerous Substances and Explosive Atmospheres Regulations 2002) compliance is mandatory.',
  'Hygienic design principles — sloped tops on enclosures, no horizontal ledges, smooth crevice-free surfaces, stainless steel construction — prevent food residue accumulation and support effective cleaning and disinfection.',
  'BRC Global Standards (specifically BRC Food Safety) require that all equipment and structures in food manufacturing areas be hygienic in design and construction, cleanable without contaminating the product, and maintained in a condition that does not create a food safety risk.',
  'Allergen zone segregation may require dedicated electrical systems, separate cable routes, and physical separation of control panels to prevent cross-contamination between allergen and non-allergen production areas.',
  'CompEx qualification is required for electricians carrying out electrical work in ATEX dust-classified zones in flour mills, grain stores, and sugar processing facilities.',
];

const faqs = [
  {
    question:
      'What IP rating is required for electrical equipment in food processing wash-down areas?',
    answer:
      'Equipment in food processing wash-down areas requires IP69K as a minimum. IP69K is the highest ingress protection rating for solid particles and water — it certifies the equipment can withstand high-pressure, high-temperature water jets applied at close range and all angles. IP65 (dust-tight, water-jet resistant) and IP66 (powerful water jet resistant) are not sufficient for food processing wash-down environments where high-pressure steam cleaning or hot water lances are used. IP ratings are defined in IEC 60529 / BS EN 60529. The IP rating must be verified on the equipment certificate, not assumed from the enclosure material alone.',
  },
  {
    question: 'Which areas in a food factory require ATEX zone classification?',
    answer:
      'ATEX dust zone classification is required wherever combustible dust is present in sufficient concentration to create an explosion risk. In the food industry, this includes flour mills and bakeries (flour dust), grain stores and conveyors (grain dust), sugar processing areas (sugar dust), dried milk powder facilities, and cocoa processing areas. Zone 20 applies where combustible dust clouds are present continuously or for long periods — typically inside process vessels, hoppers, and conveying systems. Zone 21 applies where dust clouds are likely to occur in normal operation — near filling points, transfer points, and sifters. Zone 22 applies where dust clouds are unlikely but may occur in abnormal conditions — the general area around Zone 21 locations.',
  },
  {
    question: 'What does DSEAR compliance require in a food factory?',
    answer:
      'DSEAR (Dangerous Substances and Explosive Atmospheres Regulations 2002) requires employers to: identify all dangerous substances present and assess the risks they create; eliminate or reduce those risks; classify areas where explosive atmospheres may occur (zone classification); ensure equipment in hazardous zones meets ATEX requirements; provide appropriate training for staff working in hazardous areas; and maintain an area classification document and explosion protection document. For food factories with dust explosion risks, DSEAR compliance typically involves engaging a competent person to carry out zone classification and produce an explosion protection document, then ensuring all electrical equipment installed in classified zones is appropriately rated and maintained.',
  },
  {
    question: 'What is hygienic design and how does it apply to electrical enclosures?',
    answer:
      'Hygienic design is the design approach that makes equipment and structures easy to clean and disinfect without harbouring food residues, bacteria, or pests. For electrical enclosures, hygienic design means: sloped tops at a minimum 3-degree angle (typically 45 degrees for high-care areas) to prevent horizontal surfaces where residues can accumulate; smooth external surfaces without ledges, crevices, or protruding fixings; continuous welds (not intermittent) with smooth, crevice-free joints; IP69K ratings as appropriate; materials compatible with cleaning chemicals (typically 304 or 316 stainless steel); leg and frame designs that allow cleaning underneath; and gasketed, sealed cable entries that prevent liquid ingress. The European Hygienic Engineering and Design Group (EHEDG) publishes guidelines on hygienic design for equipment used in food processing.',
  },
  {
    question:
      'What BRC Global Standard requirements apply to electrical installations in food factories?',
    answer:
      'BRC Global Standard for Food Safety (Issue 9) is the primary UK food safety standard against which food manufacturers are audited for retailer and customer approval. Under the standard, all equipment, including electrical equipment, must be hygienic in design and construction, maintained in good condition, and not present a food safety risk. Electrical installations must not create contamination risks through shedding of particles, ingress of water or pests, or accumulation of food residues. Particular attention is paid to areas above open product — any electrical equipment above open food must be sealed to prevent falling contamination. Lighting in production areas must have shatter-resistant covers or be of the anti-shatter type.',
  },
  {
    question: 'Why does allergen zone segregation affect electrical installation design?',
    answer:
      'Allergen zone segregation is required to prevent cross-contamination between allergen-containing and allergen-free production areas. In the context of electrical installation, this means that cable routes, trunking, and conduit must not cross between allergen and non-allergen zones in a way that creates a contamination pathway — for example, trunking running from an allergen area through an opening in a partition into a non-allergen area. Separate control panels for allergen and non-allergen lines prevent the spread of dust through panel ventilation. Dedicated isolators and circuit protection in each zone support clear operational separation. Physical barriers, colour coding, and procedural controls are all part of allergen zone management.',
  },
  {
    question: 'What qualifications do electricians need for food processing work?',
    answer:
      'Standard trade qualifications (NVQ Level 3 or equivalent) and 18th Edition (BS 7671) certification are the baseline. CompEx certification is required for work in ATEX dust-classified zones in flour mills, grain stores, and other food processing facilities with combustible dust risks. Understanding of IP ratings (IEC 60529) and the selection of IP-rated equipment is essential. Knowledge of hygienic design principles and the BRC Global Standard is developed through experience in the sector. Food factories have rigorous hygiene procedures — all contractors working in food production areas must comply with site hygiene rules including PPE, no-go zone procedures, and foreign object control (no loose screws, cable ties, or tools left in production areas).',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/petrochemical-electrical',
    title: 'Petrochemical Electrical Installation',
    description:
      'ATEX zone classification, DSEAR compliance, CompEx qualification, and Ex equipment maintenance.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/pharmaceutical-electrical',
    title: 'Pharmaceutical Electrical Installation',
    description:
      'GMP cleanroom wiring, ISO classifications, IQ/OQ/PQ validation, and FDA 21 CFR Part 11.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/cleanroom-electrical',
    title: 'Cleanroom Electrical Installation',
    description:
      'ISO 14644 classifications, flush-mounted fittings, sealed cable entries, and UPS for critical environments.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Full guide to the Wiring Regulations — amendments, key changes, and compliance.',
    icon: Zap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Food Processing Electrical Installation in the UK',
    content: (
      <>
        <p>
          Food processing electrical installation is a demanding specialism that combines the
          challenges of industrial electrical work with strict food safety, hygiene, and in many
          cases, hazardous area requirements. The UK food manufacturing sector — one of the largest
          in Europe, employing over 400,000 people and producing £104bn of output annually —
          requires electrical contractors who understand both the technical and regulatory
          dimensions of food factory electrical work.
        </p>
        <p>
          The consequences of inadequate electrical installation in a food factory extend well
          beyond the electrical system itself. Contamination of food products, pest ingress through
          poorly sealed enclosures, explosion from combustible dust, and failure to comply with BRC
          or retailer audit requirements can all result from substandard electrical installation.
          The reputational and financial consequences for food manufacturers are severe.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulatory framework</strong> — food processing electrical installations
                must comply with BS 7671 (Wiring Regulations), DSEAR 2002 (where combustible dusts
                are present), the Food Safety Act 1990 and associated regulations, and industry
                standards including BRC Global Standard for Food Safety.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retailer requirements</strong> — major UK food retailers require their
                suppliers to achieve certification to the BRC Global Standard or equivalent (IFS
                Food, SQF). The electrical installation is assessed as part of the audit. Failures
                at audit due to electrical non-conformances can result in loss of supply contracts.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ip69k-washdown',
    heading: 'IP69K Wash-Down Environments',
    content: (
      <>
        <p>
          Wash-down is fundamental to food factory hygiene. Production areas are cleaned at the end
          of every shift — sometimes multiple times per day — using high-pressure hot water lances
          and caustic cleaning agents. All electrical equipment in these areas must be able to
          withstand this process without ingress of water, loss of function, or release of
          contaminants.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP69K requirements</strong> — IP69K (defined in IEC 60529) certifies
                protection against high-pressure, high-temperature water jets: test conditions are
                80°C water at 80 bar pressure, flow rate of 14–16 litres per minute, nozzle at
                100–150mm distance, applied from all angles over a 30-second duration. This closely
                mirrors the conditions used in food factory cleaning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Chemical resistance</strong> — IP rating alone does not address chemical
                resistance. Gaskets, seals, and enclosure materials must be compatible with the
                cleaning chemicals used on site — typically alkaline detergents (NaOH-based), acid
                rinses (phosphoric acid), and disinfectants (quaternary ammonium compounds,
                peracetic acid). Manufacturer compatibility data must be verified for each chemical
                used.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Drainage</strong> — even IP69K-rated enclosures can accumulate condensate
                internally. Internal drainage plugs or breathers allow condensate to drain without
                compromising the IP rating. In environments with significant temperature cycling,
                thermal management of enclosures prevents condensation damage to electrical
                components.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable glands and conduit entries</strong> — all cable entries into
                IP69K-rated enclosures must use IP69K-rated glands or conduit fittings. A weak seal
                at a cable entry undermines the enclosure's IP rating entirely. Glands must also be
                chemically compatible with cleaning agents.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'atex-dust-zones',
    heading: 'ATEX Dust Explosion Zones in Food Processing',
    content: (
      <>
        <p>
          Organic dusts — flour, grain, sugar, dried milk, cocoa, spice — are combustible and can
          form explosive clouds in concentrations above their Minimum Explosible Concentration
          (MEC). Dust explosions in food factories have caused fatalities and significant property
          damage in the UK. DSEAR 2002 and the ATEX Regulations require formal zone classification
          and appropriate equipment selection wherever these dusts are present.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 20</strong> — a combustible dust cloud is present continuously or for
                long periods inside equipment. Typically applies to the interior of hoppers, silos,
                mills, conveyors, cyclones, and bag filters. Zone 20 equipment must be Category 1D
                (Da).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 21</strong> — a combustible dust cloud is likely to occur in normal
                operation. Typically applies to the immediate surroundings of Zone 20 equipment,
                filling points, transfer points, loading spouts, and sifters. Category 2D (Db)
                equipment required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 22</strong> — a combustible dust cloud is unlikely to occur in normal
                operation but may occur in abnormal conditions. Typically applies to the wider area
                around Zone 21 locations where dust layers may accumulate. Category 3D (Dc)
                equipment required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>CompEx for dust zones</strong> — electricians carrying out installation or
                maintenance work in ATEX dust zones must hold{' '}
                <SEOInternalLink href="/petrochemical-electrical">
                  CompEx certification
                </SEOInternalLink>{' '}
                covering dust zone work (ExD units). Installation requirements differ from gas zones
                — dust can penetrate through smaller gaps and surface temperature limits are defined
                differently.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hygienic-design',
    heading: 'Hygienic Design Principles for Electrical Installations',
    content: (
      <>
        <p>
          Hygienic design is not simply about choosing stainless steel — it is a comprehensive
          approach to designing equipment and structures so that they can be effectively cleaned and
          do not harbour food residues, bacteria, or pests. The European Hygienic Engineering and
          Design Group (EHEDG) and the BRC Global Standard both provide detailed guidance on
          hygienic design requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sloped tops</strong> — horizontal surfaces on electrical enclosures are
                collection points for dust, food residues, and pests. All enclosures in food
                production areas must have sloped tops — a minimum of 3 degrees from horizontal, and
                45 degrees or more in high-care areas. Sloped tops allow wash-down water to drain
                rather than pool.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No horizontal ledges or recesses</strong> — shelves, ledges, and recesses
                inside and outside enclosures are contamination risks. All surfaces should be smooth
                and continuous. Any unavoidable external ledges must be sloped. Internal surfaces
                must be smooth and free of shafts, threads, or other features that cannot be
                cleaned.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuous welds</strong> — intermittent or spot welds create crevices where
                bacteria and food residues accumulate and are protected from cleaning. All welds on
                food contact or food proximity surfaces must be continuous, ground smooth, and free
                of porosity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accessible for cleaning</strong> — all parts of the electrical installation
                that require cleaning must be accessible without the need to dismantle equipment.
                Control panels must be positioned or mounted to allow cleaning of all surfaces
                including behind and beneath. Leg heights and clearances are defined in EHEDG
                guidance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'stainless-steel',
    heading: 'Stainless Steel Enclosures in Food Factories',
    content: (
      <>
        <p>
          Stainless steel is the material of choice for electrical enclosures in food processing
          environments. It resists corrosion from cleaning chemicals, can withstand high-pressure
          wash-down, does not harbour bacteria, and meets hygienic design requirements when
          correctly fabricated and finished.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade selection</strong> — 304 stainless steel (18/8, EN 1.4301) is suitable
                for most food processing environments. 316 stainless steel (18/10/2, EN 1.4401) is
                required in high-chloride environments such as fish processing, brine handling, and
                areas where hypochlorite disinfectants are used regularly. 316L (low-carbon) is
                preferred for welded fabrications to avoid sensitisation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surface finish</strong> — external surfaces of enclosures should have a
                smooth, polished finish (typically 2B or BA finish) that minimises surface roughness
                and is easy to clean. Rougher finishes (No. 4 brushed) are used in some applications
                but are harder to clean than polished finishes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fixings and hardware</strong> — all fixings (bolts, nuts, hinges, locks)
                should be stainless steel of the same grade as the enclosure, or at least of
                compatible grade. Dissimilar metal contact between stainless steel and carbon steel
                fixings causes galvanic corrosion. Nylon and non-metallic fixings are acceptable in
                many low-stress applications.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cable-management',
    heading: 'Hygienic Cable Management Without Crevices',
    content: (
      <>
        <p>
          Cable management in food processing areas presents significant challenges for hygienic
          design. Conventional cable tray, trunking, and ladder rack have many surfaces, edges, and
          fixings that are difficult to clean and may accumulate food residues or harbour pests.
          Hygienic cable management requires careful selection and detailing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stainless steel wire mesh tray</strong> — smooth-surfaced stainless steel
                wire mesh cable tray is widely used in food factories. It is easy to clean, allows
                drainage, and does not create horizontal ledges if mounted correctly. Joints and
                fixings must be stainless steel and flush to avoid contamination points.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimise horizontal runs above open product</strong> — cable management
                above open food should be minimised. Where overhead runs are unavoidable, use round
                conduit or smooth-surfaced trunking that cannot collect debris, and ensure that any
                failure (cable, conduit clip, or fixing) would not cause a product contamination
                incident.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sealed conduit systems</strong> — in high-care and high-hygiene areas,
                conduit systems may be preferred to open cable management because they enclose the
                cables and prevent ingress of food residues. All terminations must be sealed.
                Conduit must be self-draining or drainable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable types</strong> — cables in wash-down areas must have
                chemical-resistant outer sheaths compatible with the cleaning agents used on site.
                PVC sheathed cables are acceptable in many areas but may be attacked by certain
                disinfectants. LSF (Low Smoke Free) halogen-free cables with appropriate sheath
                materials are specified in many food factory projects.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'brc-global-standards',
    heading: 'BRC Global Standards & Electrical Compliance',
    content: (
      <>
        <p>
          BRC Global Standard for Food Safety (Issue 9, published 2022) is the most widely used food
          safety certification standard in the UK. Certification is required by most major UK
          retailers as a condition of supply and is recognised by the Global Food Safety Initiative
          (GFSI). The electrical installation is assessed as part of the BRC audit.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipment condition and maintenance</strong> — BRC requires that all
                equipment, including electrical equipment, be maintained in good condition and
                subject to a planned preventive maintenance programme. Evidence of maintenance
                records, calibration certificates, and corrective actions for defects must be
                available at audit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Anti-shatter lighting</strong> — lighting in food production areas must be
                protected against shattering to prevent glass contamination of food.
                Shatter-resistant sleeves, anti-shatter LED fittings, or enclosed luminaires are all
                acceptable. BRC auditors will check that lighting protection is in place and that
                there is a procedure for dealing with any broken lamp.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pest control integration</strong> — the electrical installation must not
                provide harborage for pests. Sealed enclosures, sealed cable entries, and hygienic
                mounting that eliminates voids and ledges all contribute to pest control. Open
                conduit ends, poorly sealed panels, and cable routes with voids behind walls are
                common BRC findings.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'allergen-segregation',
    heading: 'Allergen Zone Electrical Segregation',
    content: (
      <>
        <p>
          Allergen management is a food safety critical requirement. The 14 major allergens
          identified in UK food labelling law — including nuts, gluten, milk, eggs, and shellfish —
          must be controlled to prevent unintended cross-contamination. The electrical installation
          can contribute to or undermine allergen zone segregation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Physical separation of cable routes</strong> — cable management systems must
                not create pathways for allergen-containing dust or debris to travel from allergen
                zones to allergen-free zones. Trunking and conduit passing through partition walls
                between zones must be sealed to maintain physical separation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Separate control panels</strong> — where allergen and non-allergen
                production lines are in adjacent areas, separate control panels for each area
                support clear operational segregation and simplify allergen cleaning validation (the
                scope of cleaning for each panel is clear and separate).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Panel ventilation and filtration</strong> — control panel ventilation
                systems must not draw allergen-containing air from allergen zones and discharge it
                into allergen-free areas. Where ventilation or cooling is required, filtered air
                intake and directional discharge must be designed to respect the allergen zone
                boundaries.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Colour coding</strong> — many food factories use colour coding for
                electrical accessories, cable ties, and tools to reinforce allergen zone
                segregation. This is a site-specific procedural control but the electrical
                installation can support it through consistent use of zone-specific colours for
                socket outlets, isolators, and other field equipment.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Food Processing Facilities',
    content: (
      <>
        <p>
          Food processing electrical work combines the challenges of industrial electrical work with
          strict hygiene requirements, food safety regulations, and in some facilities, ATEX
          hazardous area requirements. It is well-rewarded, in constant demand, and offers
          interesting technical challenges.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Hygiene Rules Are Non-Negotiable</h4>
                <p className="text-white text-sm leading-relaxed">
                  Food factory hygiene rules apply to all contractors without exception. This
                  typically means hair covering, protective clothing, no jewellery or loose items,
                  no food or drink in production areas, and strict foreign object controls — every
                  screw, cable tie, and tool must be accounted for. Failure to comply with site
                  hygiene rules will result in immediate removal from site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Keep Records That Satisfy BRC Auditors
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  BRC auditors review electrical maintenance records, test certificates, and
                  corrective action records. Use{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">Elec-Mate</SEOInternalLink> to
                  produce professional, well-organised test records and inspection reports that
                  demonstrate compliance and give food factory quality managers the documentation
                  they need for audit.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Produce professional electrical records for food factory audits"
          description="Create test records and inspection reports that satisfy BRC Global Standard audit requirements. Join 1,000+ UK electricians using Elec-Mate. 7-day free trial."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function FoodProcessingElectricalPage() {
  return (
    <GuideTemplate
      title="Food Processing Electrical Installation UK | Food Factory Wiring"
      description="Complete guide to food processing electrical installation in the UK — IP69K wash-down environments, ATEX dust zones (Zone 20/21/22), hygienic design, stainless steel enclosures, BRC Global Standards, and allergen zone electrical segregation."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Specialist Sector"
      badgeIcon={Building2}
      heroTitle={
        <>
          Food Processing Electrical Installation UK:{' '}
          <span className="text-yellow-400">Food Factory Wiring Guide</span>
        </>
      }
      heroSubtitle="Everything UK electricians need to know about food processing electrical installation — IP69K wash-down ratings, ATEX dust explosion zones, hygienic design principles, stainless steel enclosures, BRC Global Standard requirements, and allergen zone electrical segregation."
      readingTime={17}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Food Processing Electrical Installation"
      relatedPages={relatedPages}
      ctaHeading="Produce BRC-Ready Electrical Records with Elec-Mate"
      ctaSubheading="Create professional test records and inspection reports for food factory BRC audits. Join 1,000+ UK electricians using Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
