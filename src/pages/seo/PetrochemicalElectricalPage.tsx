import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  PoundSterling,
  ClipboardCheck,
  Zap,
  FileCheck2,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Specialist Sectors', href: '/specialist-electrical-sectors' },
  { label: 'Petrochemical Electrical Installation', href: '/petrochemical-electrical' },
];

const tocItems = [
  { id: 'overview', label: 'Petrochemical Electrical Overview' },
  { id: 'dsear-atex', label: 'DSEAR & ATEX Zone Classification' },
  { id: 'ex-protection-concepts', label: 'Ex Protection Concepts' },
  { id: 'area-classification-drawings', label: 'Area Classification Drawings' },
  { id: 'equipment-selection', label: 'Equipment Selection & Marking' },
  { id: 'inspection-maintenance', label: 'Ex Equipment Inspection: BS EN 60079-17' },
  { id: 'compex-qualification', label: 'CompEx Qualification' },
  { id: 'permit-to-work', label: 'Permit to Work Systems' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'DSEAR (Dangerous Substances and Explosive Atmospheres Regulations 2002) is the UK legislation that requires employers to control the risks from flammable liquids, gases, and dusts. It mandates hazardous area zone classification, appropriate equipment selection, and formal explosion protection documentation.',
  'ATEX zone classification (Zone 0, 1, 2 for gas/vapour; Zone 20, 21, 22 for dust) defines the likelihood of an explosive atmosphere. All electrical equipment in classified zones must be ATEX-certified for that zone and the appropriate gas group and temperature class.',
  'The main Ex protection concepts used in petrochemical installations are Ex d (flameproof), Ex e (increased safety), Ex ia/ib (intrinsic safety), Ex p (pressurised enclosure), and Ex n/ec (non-sparking, for Zone 2 only). Each has specific installation requirements.',
  'BS EN 60079-17 (IEC 60079-17) is the standard for inspection and maintenance of Ex electrical installations. It defines three categories of inspection: visual, close, and detailed — each with increasing levels of intrusion and frequency requirements.',
  'CompEx is the UK industry-recognised qualification framework for engineers and electricians working on Ex electrical installations. It covers both gas zone work (ExI units) and dust zone work (ExD units). Without CompEx, you cannot legally carry out Ex electrical work in petrochemical facilities.',
  'Area classification drawings are the definitive reference for zone boundaries on any petrochemical site. They are produced in accordance with IEC 60079-10-1 (gas) and IEC 60079-10-2 (dust) and must be consulted before any equipment selection or installation work.',
];

const faqs = [
  {
    question: 'What is DSEAR and who does it apply to?',
    answer:
      'DSEAR (Dangerous Substances and Explosive Atmospheres Regulations 2002) is the UK legislation implementing the ATEX Workplace Directive (99/92/EC). It applies to all workplaces where dangerous substances — flammable liquids, flammable gases, explosive atmospheres from dusts — are present. DSEAR requires employers to: identify dangerous substances and assess the risks they present; eliminate or reduce those risks; classify areas where explosive atmospheres may occur into zones; ensure equipment in hazardous zones meets ATEX requirements; coordinate safety measures where multiple employers work in the same hazardous area; provide information, instruction, and training; and document the explosion protection measures in an Explosion Protection Document (EPD). DSEAR applies to refineries, chemical plants, petroleum storage facilities, gas terminals, and any site handling flammable materials.',
  },
  {
    question: 'What is the difference between ATEX and IECEx certification?',
    answer:
      'ATEX certification (from the ATEX Directive 2014/34/EU, retained in UK law as the UKEX Regulations) is the certification standard for equipment placed on the market in the UK and EU for use in potentially explosive atmospheres. IECEx is the international equivalent certification scheme administered by the International Electrotechnical Commission. ATEX/UKEX certification is required for equipment used in UK installations. IECEx certification from an IECEx-recognised certification body is widely accepted as equivalent and most Ex equipment carries both marks. Following Brexit, the UK has its own UKEX marking which applies to equipment placed on the GB market after 1 January 2022, though the technical requirements remain identical to ATEX.',
  },
  {
    question: 'What is CompEx and what units are required?',
    answer:
      'CompEx is the UK industry-recognised qualification framework for personnel working on Ex electrical installations, administered by Cogent. It comprises modular units covering different aspects of Ex work. For gas zone installation work, the core units are ExI01 (Fundamentals of Ex), ExI02 (Ex d flameproof enclosures), ExI03 (Ex e increased safety), and ExI04 (Ex i intrinsic safety). ExI05 covers Ex p pressurised enclosures. ExM01 to ExM04 cover inspection and maintenance of Ex installations. ExD units cover dust zone work. The CompEx Foundation certificate (ExI01-04) is the minimum required for most petrochemical electrical installation roles. Refresher assessment is required every five years.',
  },
  {
    question: 'What does BS EN 60079-17 require for Ex equipment inspection?',
    answer:
      'BS EN 60079-17 (the UK-adopted version of IEC 60079-17) defines the requirements for inspection and maintenance of Ex electrical installations. It specifies three grades of inspection. Visual inspection: a check for obvious defects without opening the equipment — checking the enclosure is intact, all bolts are present, the cable entry is secure, and there is no obvious damage. Close inspection: all visual inspection checks plus opening the enclosure (where accessible without live work) to check internally for moisture, damage, and correct assembly. Detailed inspection: all close inspection checks plus functional testing, insulation resistance testing, and verification of all aspects of the equipment condition against its certification documents. The frequency of each inspection grade is determined by the initial inspection interval (IEI), which is based on the installation environment and equipment type.',
  },
  {
    question: 'What are the main Ex protection concepts and where is each used?',
    answer:
      'Ex d (flameproof): the enclosure can contain an internal explosion and cool the products before they escape. Used for motors, switchgear, and junction boxes in Zone 1 and Zone 2. Ex e (increased safety): equipment that does not produce sparks in normal operation is enclosed to a higher standard. Used for terminal boxes, luminaires, and motors in Zone 1 and Zone 2. Ex ia/ib (intrinsic safety): electrical energy in the circuit is limited to safe levels. Ex ia is suitable for Zone 0 (two fault tolerance). Ex ib for Zone 1. Used for instrumentation. Ex p (pressurised): a protective gas at positive pressure excludes the hazardous atmosphere from the enclosure. Used for large control panels and analysers. Ex n or Ex ec (non-sparking/increased safety for Zone 2 only): simplified protection for Zone 2. Each protection concept has specific installation requirements defined in the IEC 60079 series.',
  },
  {
    question: 'How do I read Ex equipment marking?',
    answer:
      'Ex equipment marking provides all the information needed to verify that the equipment is suitable for the intended hazardous area. A typical marking: II 2 G Ex d IIC T4 Gb. Reading this: II = Equipment Group II (surface industries, not mining); 2 = Category 2 (suitable for Zone 1); G = gas/vapour hazard; Ex = explosion protected; d = protection concept (flameproof); IIC = gas group (IIC covers hydrogen and acetylene — the most ignition-sensitive group; IIA and IIB are less stringent); T4 = temperature class (maximum surface temperature 135°C); Gb = Equipment Protection Level (suitable for Zone 1). For dust: II 2 D Ex tb IIIC T135°C Db would indicate dust zone equipment for Zone 21, suitable for the most ignition-sensitive dust groups.',
  },
  {
    question: 'What is an Explosion Protection Document and who must produce it?',
    answer:
      'An Explosion Protection Document (EPD) is a formal document required by DSEAR that describes the hazardous area zone classification, the measures in place to control explosive atmosphere risks, the competence requirements for persons working in hazardous areas, and the overall explosion protection strategy. The employer (or duty holder) is responsible for producing and maintaining the EPD. In practice it is typically prepared by a competent person — a hazardous area specialist or process safety engineer — with input from electrical engineers who provide information on electrical installation and Ex equipment. The EPD must be reviewed and updated when any significant change is made to the plant or process. Area classification drawings form a key part of the EPD.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/offshore-electrical',
    title: 'Offshore Electrical Engineering',
    description:
      'ATEX Zone 0/1/2 on oil and gas platforms, BOSIET training, and day rates £400–£700.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/nuclear-site-electrical',
    title: 'Nuclear Site Electrical Engineering',
    description:
      'Nuclear Baseline QA, BPSS/SC clearance, ECS nuclear card, and pay rates £60–£100+/hr.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/food-processing-electrical',
    title: 'Food Processing Electrical Installation',
    description: 'IP69K wash-down, ATEX dust zones, hygienic design, and BRC Global Standards.',
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
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Petrochemical Electrical Installation in the UK',
    content: (
      <>
        <p>
          Petrochemical electrical installation encompasses electrical work on refineries, chemical
          plants, petroleum storage facilities, LNG terminals, and associated infrastructure. It is
          one of the most technically demanding and highly regulated areas of industrial electrical
          engineering in the UK — and one of the best paid.
        </p>
        <p>
          The fundamental challenge of petrochemical electrical installation is the presence of
          flammable and explosive substances throughout the plant. Hydrocarbons, solvents, gases,
          and in some cases dusts create potentially explosive atmospheres across large parts of the
          facility. Every electrical decision — equipment selection, cable routing, earthing,
          protection — must account for the hazardous area classification of the area in which the
          work is carried out.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Major UK petrochemical sites</strong> — Grangemouth (Ineos) in Scotland,
                Fawley Refinery (ExxonMobil) in Hampshire, Pembroke Refinery (Valero) in Wales,
                Stanlow Refinery (Essar) in Cheshire, and the major chemical manufacturing complexes
                at Teesside and Merseyside provide the majority of petrochemical electrical
                contractor demand in the UK.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shutdown and turnaround work</strong> — much petrochemical electrical
                contractor work is concentrated in planned shutdowns and turnarounds, when plant is
                taken offline for major inspection and maintenance. These intensive periods involve
                large numbers of contractors working around the clock to complete the work within
                the planned outage window.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dsear-atex',
    heading: 'DSEAR & ATEX Zone Classification',
    content: (
      <>
        <p>
          DSEAR (Dangerous Substances and Explosive Atmospheres Regulations 2002) is the UK
          legislation that drives hazardous area zone classification on petrochemical sites.
          Understanding DSEAR requirements and ATEX zone classification is the foundation of
          competent petrochemical electrical work.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 0</strong> — an explosive atmosphere in the form of a cloud of
                flammable gas, vapour, or mist is present continuously or for long periods. Zone 0
                locations include the interior of storage tanks, process vessels, and pipework.
                Category 1G (Ga) equipment required. Very few electrical devices are installed in
                Zone 0 — instrumentation such as level transmitters is the main exception.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 1</strong> — an explosive gas atmosphere is likely to occur in normal
                operation. Typical Zone 1 locations include pump sumps, drain pits, areas within
                1.5m of process flanges and valve glands, and the process deck area. Category 2G
                (Gb) equipment required. This is where the majority of petrochemical Ex electrical
                equipment is installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 2</strong> — an explosive gas atmosphere is unlikely to occur in normal
                operation but may occur in abnormal conditions. Zone 2 typically extends 3–5m from
                Zone 1 sources, and covers areas such as the wider process deck, pipe racks with
                potential for leakage, and areas below Zone 1 where heavier- than-air gases can
                accumulate. Category 3G (Gc) or better required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>DSEAR Explosion Protection Document</strong> — employers must produce and
                maintain an Explosion Protection Document (EPD) that records the zone
                classification, equipment selection criteria, personnel requirements, and overall
                explosion protection strategy. The EPD must be reviewed when plant or processes
                change significantly.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ex-protection-concepts',
    heading: 'Ex Protection Concepts: Ex d, e, i, m, n',
    content: (
      <>
        <p>
          The IEC 60079 series of standards defines the protection concepts (Ex types) that can be
          used to make electrical equipment safe for use in explosive atmospheres. Understanding the
          operating principle, application, and installation requirements of each protection concept
          is essential for CompEx-certified petrochemical electricians.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ex d — flameproof enclosure (IEC 60079-1)</strong> — the enclosure is
                designed to contain an internal ignition and cool the products of combustion before
                they escape through gaps and joints. Used for motors, switchgear, and junction boxes
                in Zone 1 and Zone 2. Heavy, robust construction. Flameproof joints and thread
                engagements must be maintained — damaged flanges cannot be repaired without
                recertification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ex e — increased safety (IEC 60079-7)</strong> — additional measures are
                applied to equipment that does not normally produce sparks or hot surfaces to
                prevent ignition of the surrounding atmosphere. Applies to terminal boxes,
                luminaires, and motors in Zone 1 and Zone 2. Lighter than Ex d. Terminal tightening
                torques and creepage/clearance distances are critical.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ex ia/ib — intrinsic safety (IEC 60079-11)</strong> — the energy in the
                circuit is limited to levels that cannot ignite the explosive atmosphere under
                defined normal and fault conditions. Ex ia (two fault tolerance) is the only
                protection concept suitable for Zone 0. Used exclusively for instrumentation and
                control systems. Associated apparatus (barriers, galvanic isolators) must be
                correctly selected and entity parameters matched.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ex m — encapsulation (IEC 60079-18)</strong> — components that could cause
                ignition are encapsulated in a compound that excludes the explosive atmosphere. Used
                for certain instrumentation, solenoid valve coils, and electronic modules. No
                maintenance is possible on the encapsulated components — replacement of the complete
                unit is required on failure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ex n / Ex ec — non-sparking (IEC 60079-15)</strong> — simplified protection
                for Zone 2 only. The equipment is designed to not produce sparks or hot surfaces
                capable of igniting a Zone 2 atmosphere under normal operating conditions. Lighter
                and less expensive than Zone 1 protection concepts. Common for Zone 2 luminaires and
                small motors.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'area-classification-drawings',
    heading: 'Area Classification Drawings',
    content: (
      <>
        <p>
          Area classification drawings are the definitive reference for zone boundaries on any
          petrochemical site. They are produced in accordance with IEC 60079-10-1 (for gas and
          vapour) and IEC 60079-10-2 (for combustible dust) and form a key part of the site's
          Explosion Protection Document.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What they show</strong> — area classification drawings show the boundaries
                of Zone 0, Zone 1, and Zone 2 areas on plan and elevation views. Zone boundaries are
                shown as dashed or coloured lines with the zone designation clearly marked. The
                drawings also identify the source of hazardous release (grade of release) that
                defines each zone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How they are used</strong> — before selecting or installing any electrical
                equipment on a petrochemical site, the electrician or engineer must consult the area
                classification drawings to determine the zone applicable to the intended equipment
                location. Equipment must be certified for the zone in which it is installed —
                installing Zone 2 equipment in a Zone 1 area is non-compliant and potentially
                dangerous.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintaining drawings</strong> — area classification drawings must be updated
                when plant layout, process conditions, or substance inventories change. Out-of-date
                drawings present a serious hazard — equipment may have been installed to the wrong
                zone specification. Document control is a critical aspect of area classification
                management.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'equipment-selection',
    heading: 'Ex Equipment Selection & Marking',
    content: (
      <>
        <p>
          Selecting the correct Ex equipment for a petrochemical installation requires understanding
          of the zone classification, the hazardous substance properties (gas group and ignition
          temperature), and the protection concepts available. Equipment must be certified to a
          standard compatible with the zone and must bear the correct marking.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gas groups</strong> — Group IIA covers propane, acetone, and most common
                hydrocarbons (minimum ignition energy &gt;180µJ). Group IIB covers ethylene and
                hydrogen sulphide (45–180µJ). Group IIC covers hydrogen and acetylene (&lt;45µJ) and
                requires the most stringent equipment. Equipment must be rated for the same or a
                higher gas group than the hazardous substance on site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Temperature classes</strong> — T1 (450°C maximum surface temperature)
                through T6 (85°C). The temperature class must be below the auto-ignition temperature
                (AIT) of the flammable substance by an appropriate margin. For petrol (AIT ~280°C),
                T3 equipment (200°C surface temperature) is appropriate. For hydrogen sulphide (AIT
                260°C), T3 or T4 is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipment Protection Level (EPL)</strong> — Ga, Gb, Gc (for gas zones) or
                Da, Db, Dc (for dust zones). EPL must match or exceed the zone requirement: Ga for
                Zone 0, Gb or Ga for Zone 1, Gc or better for Zone 2.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'inspection-maintenance',
    heading: 'Ex Equipment Inspection & Maintenance: BS EN 60079-17',
    content: (
      <>
        <p>
          BS EN 60079-17 (the UK adoption of IEC 60079-17) is the standard for the inspection and
          maintenance of electrical installations in explosive atmospheres. It is mandatory reading
          for anyone responsible for maintaining Ex electrical equipment on petrochemical sites, and
          CompEx ExM units are based directly on its requirements.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade 1 — Visual inspection</strong> — a check for obvious defects without
                the need to open equipment or use tools. Checks include: enclosure integrity (no
                cracks or damage), all bolts present and tightened, cable entry condition, no
                unauthorised modifications, warning labels in place, and equipment type and marking
                match the area classification. This grade can be performed by persons with basic Ex
                awareness.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade 2 — Close inspection</strong> — all visual inspection checks plus
                opening the equipment (where it can be done safely without live work) to check
                internally. Checks include: internal condition (moisture, damage, contamination),
                correct cable type and cross-sectional area, correct gland type and installation,
                correct terminal tightening, and earth continuity. Requires CompEx-qualified
                personnel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade 3 — Detailed inspection</strong> — all close inspection checks plus
                more detailed examination including verification against certification documents,
                measurement of Ex d flameproof gaps, insulation resistance testing, verification of
                intrinsically safe circuit entity parameters, and earth loop impedance testing.
                Requires competent CompEx-qualified personnel with appropriate test equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection intervals</strong> — initial inspection interval (IEI) is
                typically one to three years for Zone 1 and Zone 21 equipment, and three years for
                Zone 2 and Zone 22. The interval can be extended based on the results of initial
                inspections. All inspection findings must be formally recorded and defects formally
                managed through a corrective action process.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'compex-qualification',
    heading: 'CompEx Qualification for Petrochemical Electricians',
    content: (
      <>
        <p>
          CompEx is the UK industry-recognised qualification framework for personnel who install,
          inspect, and maintain electrical equipment in explosive atmospheres. It is a requirement
          for petrochemical electrical work and is specified by most major UK petrochemical
          operators and principal contractors as a condition of employment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CompEx Foundation (ExI01–ExI04)</strong> — covers the fundamentals of
                explosive atmospheres, zone classification, Ex d flameproof, Ex e increased safety,
                and Ex i intrinsic safety installation. This is the minimum requirement for most
                petrochemical installation roles. Typically delivered as a five-day course with
                practical and written assessments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CompEx Maintenance (ExM01–ExM04)</strong> — covers inspection and
                maintenance of Ex installations to BS EN 60079-17. Essential for maintenance
                electricians on petrochemical sites. Covers inspection grades, inspection records,
                and corrective action management.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CompEx Dust (ExD units)</strong> — covers dust zone classification and
                equipment selection for Zones 20, 21, and 22. Relevant for petrochemical sites with
                solid catalyst handling, powder processing, or other combustible dust risks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reassessment every five years</strong> — CompEx certification must be
                renewed by reassessment every five years. The reassessment demonstrates that the
                candidate has maintained their competence and is aware of any changes to the
                standards and regulations since their previous assessment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          CompEx-certified electricians working in petrochemical facilities typically command
          significant pay premiums. Experienced CompEx-qualified petrochemical electricians in
          permanent or long-term contract roles typically earn £45,000 to £70,000 per year.
          Self-employed contractors earn £40 to £65 per hour, with higher rates during shutdown and
          turnaround periods when demand peaks.
        </p>
      </>
    ),
  },
  {
    id: 'permit-to-work',
    heading: 'Permit to Work Systems in Petrochemical Facilities',
    content: (
      <>
        <p>
          All electrical work on petrochemical sites is managed through a formal permit to work
          (PTW) system. The PTW is the safety management mechanism that ensures all hazards are
          identified, appropriate precautions are in place, and work is properly authorised before
          it commences.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical isolation</strong> — all electrical work on live or potentially
                live circuits requires a formal isolation and lock-off procedure. The PTW specifies
                the isolation points, the lock-off procedure, and the verification testing required
                to confirm the system is dead before work commences. Isolation is typically achieved
                by a person authorised by the duty holder.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hot work permits</strong> — any work that creates a source of ignition —
                angle grinding, welding, use of non-Ex tools — in or near hazardous areas requires a
                hot work permit in addition to the standard electrical PTW. Hot work permits require
                gas testing before commencement and a fire watch during and after the work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Confined space permits</strong> — working inside process vessels, tanks, or
                enclosed spaces (even without an active explosive atmosphere risk) requires a
                confined space entry permit. Many petrochemical electrical tasks involve cable
                pulling or equipment installation in confined spaces.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Breaking Into Petrochemical Electrical Work',
    content: (
      <>
        <p>
          Petrochemical electrical work is financially rewarding, technically interesting, and in
          sustained demand from UK refineries, chemical plants, and the energy transition sector.
          CompEx certification is the essential first step.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Start with CompEx Foundation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Book CompEx ExI01–ExI04 (Foundation) as your first step. Without it, no
                  petrochemical operator or principal contractor will engage you for hazardous area
                  electrical work. Add ExM01–ExM04 if you are targeting maintenance roles. Register
                  with petrochemical electrical specialist agencies — most major UK refineries use a
                  small number of specialist contractors for shutdown work.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Keep Your Certifications Current</h4>
                <p className="text-white text-sm leading-relaxed">
                  CompEx requires five-yearly reassessment. 18th Edition must be renewed. Use{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">Elec-Mate</SEOInternalLink> to
                  track all your certifications and renewal dates, and to produce professional test
                  records and inspection reports that meet the documentation standards expected on
                  petrochemical sites.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage your CompEx and petrochemical certifications with Elec-Mate"
          description="Track CompEx, 18th Edition, and all petrochemical certifications with renewal reminders. Produce professional inspection records. Join 1,000+ UK electricians using Elec-Mate. 7-day free trial."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PetrochemicalElectricalPage() {
  return (
    <GuideTemplate
      title="Petrochemical Electrical Installation UK | Refinery & Chemical Plant"
      description="Complete guide to petrochemical electrical installation in the UK — ATEX/DSEAR zone classification, Ex d/e/i/m/n protection concepts, BS EN 60079-17 inspection, CompEx qualification, area classification drawings, and permit to work systems."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Specialist Sector"
      badgeIcon={AlertTriangle}
      heroTitle={
        <>
          Petrochemical Electrical Installation UK:{' '}
          <span className="text-yellow-400">Refinery & Chemical Plant Guide</span>
        </>
      }
      heroSubtitle="Everything UK electricians need to know about petrochemical electrical installation — DSEAR 2002 compliance, ATEX zone classification (Zone 0, 1, 2), Ex d/e/i/m/n protection concepts, area classification drawings, BS EN 60079-17 inspection requirements, and CompEx qualification."
      readingTime={18}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Petrochemical Electrical Installation"
      relatedPages={relatedPages}
      ctaHeading="Track Your CompEx & Petrochemical Certifications with Elec-Mate"
      ctaSubheading="Manage CompEx, 18th Edition, and all specialist certifications with renewal reminders. Produce professional inspection records. 7-day free trial, cancel anytime."
    />
  );
}
