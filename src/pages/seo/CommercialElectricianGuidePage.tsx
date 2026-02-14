import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Building2,
  FileCheck2,
  Calculator,
  GraduationCap,
  PoundSterling,
  ShieldCheck,
  Zap,
  ClipboardCheck,
  Receipt,
  Brain,
  Home,
  HardHat,
  Flame,
  Lightbulb,
  Cable,
  Ruler,
  FileText,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career', href: '/guides' },
  { label: 'Commercial Electrician', href: '/guides/commercial-electrician-guide' },
];

const tocItems = [
  { id: 'what-is-commercial-electrician', label: 'What Is a Commercial Electrician?' },
  { id: 'differences-from-domestic', label: 'Differences from Domestic Work' },
  { id: 'typical-commercial-jobs', label: 'Typical Commercial Jobs' },
  { id: 'qualifications-needed', label: 'Qualifications for Commercial Work' },
  { id: 'niceic-approved-vs-domestic', label: 'Approved Contractor vs Domestic Installer' },
  { id: 'pricing-commercial-work', label: 'Pricing Commercial Work' },
  { id: 'working-with-main-contractors', label: 'Working with Main Contractors' },
  { id: 'cdm-responsibilities', label: 'CDM Responsibilities' },
  { id: 'elec-mate-for-commercial', label: 'Elec-Mate for Commercial Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Commercial electricians work on non-domestic premises — offices, shops, warehouses, factories, schools, hospitals, and public buildings — dealing with three-phase supplies, larger installations, fire alarm systems, emergency lighting, and containment systems.',
  'The key qualifications for commercial work are C&G 2391 (Inspection and Testing) and C&G 2396 (Design and Verification of Electrical Installations), plus the 18th Edition (C&G 2382). Design skills are essential for commercial projects.',
  'NICEIC Approved Contractor status (or equivalent full-scope registration with NAPIT or ELECSA) is required for commercial work — the Domestic Installer scheme does not cover non-domestic premises.',
  'Commercial electricians must understand CDM (Construction (Design and Management)) Regulations 2015, as most commercial electrical projects fall within CDM scope and carry health and safety obligations.',
  'Elec-Mate handles commercial work — EICR for commercial premises, fire alarm and emergency lighting certificates, three-phase calculators, AI Circuit Designer for commercial layouts, RAMS generator, and AI Cost Engineer for pricing.',
];

const faqs = [
  {
    question: 'What is the difference between a domestic and commercial electrician?',
    answer:
      'The core electrical principles are the same, but commercial work involves larger and more complex installations. Domestic electricians work predominantly with single-phase 230V supplies, consumer units with up to 20 ways, and relatively small cable sizes. Commercial electricians regularly work with three-phase 400V supplies, large distribution boards, sub-distribution boards, rising mains, busbar trunking, SWA (Steel Wire Armoured) cables, containment systems (cable tray, basket, ladder rack, dado and skirting trunking), fire alarm systems to BS 5839, emergency lighting systems to BS 5266, and data/communications cabling. Commercial projects also involve design work — producing schematic diagrams, distribution board schedules, cable calculations, and containment layouts — which requires the C&G 2396 qualification. The working environment differs too: commercial electricians often work on construction sites under CDM regulations, alongside other trades, within main contractor programmes that require precise scheduling and coordination.',
  },
  {
    question: 'Do I need C&G 2396 to work as a commercial electrician?',
    answer:
      'While C&G 2396 (Design and Verification of Electrical Installations) is not legally mandated to work as an electrician, it is effectively essential for commercial work. Most commercial projects require you to produce or interpret electrical designs — distribution board schedules, schematic diagrams, cable sizing calculations, protective device coordination, and discrimination studies. Without the 2396, you are limited to installing work that someone else has designed, which significantly reduces your earning potential and your ability to tender for commercial contracts independently. The 2396 builds on the 2391 (Inspection and Testing) and adds design skills: load assessment, circuit design, protective device selection, cable selection and calculation, and verification of compliance with BS 7671. If you are serious about commercial work, completing the 2391 and 2396 should be your priority after the 18th Edition. Many training providers offer combined 2391/2396 courses that cover both qualifications in 2 to 3 weeks of classroom time plus home study and assignments.',
  },
  {
    question: 'How does pricing differ for commercial electrical work?',
    answer:
      'Commercial pricing differs from domestic in several ways. First, commercial contracts are typically priced from detailed specifications, bills of quantities, or scope of works documents — not from a site visit and a verbal description. You need to be able to read architectural and electrical drawings, quantify materials accurately, and price labour based on measured work rates (often using industry-standard pricing books like Spon or SPONS Electrical). Second, commercial customers expect formal quotations with itemised breakdowns, not lump-sum verbal quotes. Third, margins are different: material markups are typically lower on commercial work (10 to 20% versus 25 to 40% on domestic), but volumes are higher. Labour rates vary by region and project type but are generally £35 to £55 per hour for a qualified electrician on commercial work, with overtime, weekend, and shift premiums where applicable. Fourth, payment terms are longer — 30 to 60 days is standard on commercial contracts, compared to immediate or 7-day payment on domestic work. You need cash flow management skills to handle this. Finally, many commercial contracts use JCT or NEC forms of contract, which have specific provisions for variations, delay, and dispute resolution that you need to understand.',
  },
  {
    question: 'What CDM responsibilities does an electrical subcontractor have?',
    answer:
      'Under the Construction (Design and Management) Regulations 2015, an electrical subcontractor on a commercial project has several duties. As a contractor, you must plan, manage, and monitor your own work to ensure it is carried out safely. You must provide your workers with appropriate information, instruction, training, and supervision. You must ensure your work does not put others at risk — this includes safe isolation procedures, permit-to-work systems, and coordination with other trades working in the same area. You must cooperate with the principal contractor and comply with their construction phase plan. You must report anything you become aware of that is likely to endanger health or safety. If you are also acting as a designer (for example, producing the electrical design for the project), you have additional designer duties under CDM: you must eliminate foreseeable risks where possible, reduce risks that cannot be eliminated, and provide information about remaining risks to other designers and contractors. In practice, for most electrical subcontractors on commercial projects, the key CDM obligations are producing RAMS (Risk Assessments and Method Statements) for your work activities, attending site inductions, following the construction phase plan, and maintaining competence records for your workforce.',
  },
  {
    question: 'What fire alarm qualifications do I need for commercial work?',
    answer:
      'Fire alarm work in commercial premises requires specific knowledge beyond general electrical installation skills. The fire alarm system must comply with BS 5839-1 (fire detection and fire alarm systems for buildings — code of practice for design, installation, commissioning, and maintenance). As a minimum, you should hold the 18th Edition (C&G 2382) and have a thorough understanding of BS 5839-1. Many employers and clients also expect FIA (Fire Industry Association) qualifications — specifically the FIA Foundation Module and the FIA Unit 3 (Fire Detection and Alarm). These cover system design (category L1/L2/L3/L4 and M systems), detector spacing and siting, call point positioning, sounder coverage, cable selection (fire-resistant cables to BS 7629 or BS 8434), zone planning, cause and effect matrices, and commissioning procedures. For maintenance and inspection of existing fire alarm systems, the FIA Unit 4 is relevant. If you are designing fire alarm systems for commercial premises, some clients and fire risk assessors will expect third-party certification of the design — typically through a BAFE SP203 certificated company. Becoming a BAFE-registered company requires demonstrating competence, quality management systems, and ongoing surveillance.',
  },
  {
    question: 'How do I get started in commercial electrical work?',
    answer:
      'If you are currently working in domestic and want to move into commercial, the transition requires investment in qualifications, registration, and experience. Start by ensuring your qualifications are up to date — 18th Edition (C&G 2382) and Inspection and Testing (C&G 2391) are prerequisites. Then add Design and Verification (C&G 2396), which is the qualification that distinguishes commercial electricians from domestic-only workers. Register with a competent person scheme at the Approved Contractor level — NICEIC Approved Contractor, NAPIT Full Scope, or ELECSA Full Scope. The Domestic Installer scheme does not cover commercial premises. Gain experience by working with an established commercial electrical contractor before going out on your own — even 6 to 12 months on commercial sites will teach you about containment systems, three-phase distribution, fire alarm work, coordination with main contractors, and CDM compliance. Build your RAMS templates, method statements, and quality management documentation. Consider SSIP (Safety Schemes in Procurement) accreditation — most main contractors require this before allowing subcontractors on site. Invest in three-phase test equipment (your domestic multifunction tester may not be sufficient for larger commercial installations). And start small — take on smaller commercial projects (shop fits, office refurbishments) before bidding for larger contracts.',
  },
  {
    question: 'What insurance do I need for commercial electrical work?',
    answer:
      'Commercial electrical work requires higher levels of insurance cover than domestic. Public liability insurance should be a minimum of £5 million — many main contractors require £10 million before they will let you on site. Professional indemnity insurance is essential for commercial work because you are likely designing systems, not just installing them — a design error that causes a loss to the client could result in a substantial claim. Employers liability insurance is a legal requirement if you employ anyone (including subcontractors on your team). Product liability insurance covers you if a product you supply or install causes damage — some main contractors require this as a separate line item. Contractors all-risk insurance covers the works themselves — materials, equipment, and completed work — against damage during the contract period. Finally, ensure your van and tool insurance covers the higher value of equipment used on commercial work (three-phase test instruments, specialist tools, and materials can represent £10,000 or more). The total cost of a comprehensive insurance package for a small commercial electrical contractor is typically £2,000 to £5,000 per year, depending on turnover, number of employees, and levels of cover.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/domestic-electrician-guide',
    title: 'Domestic Electrician Guide',
    description:
      'Complete guide to domestic electrical work — Part P, competent person schemes, qualifications, and typical jobs.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-commercial-premises',
    title: 'EICR for Commercial Premises',
    description:
      'Legal requirements for commercial EICRs, Health and Safety at Work Act obligations, and employer duties.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/fire-alarm-certificate',
    title: 'Fire Alarm Certificate',
    description:
      'BS 5839-1 compliance, system categories, design standards, and digital fire alarm certification.',
    icon: Flame,
    category: 'Certificate',
  },
  {
    href: '/guides/emergency-lighting-certificate',
    title: 'Emergency Lighting Certificate',
    description:
      'BS 5266 requirements, testing schedules, system design, and emergency lighting certification on your phone.',
    icon: Lightbulb,
    category: 'Certificate',
  },
  {
    href: '/guides/how-to-price-electrical-jobs',
    title: 'How to Price Electrical Jobs',
    description:
      'Pricing strategies for commercial and domestic work, with AI-powered cost engineering.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/rams-generator',
    title: 'RAMS Generator',
    description:
      'Generate professional Risk Assessments and Method Statements with AI for commercial projects.',
    icon: HardHat,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-commercial-electrician',
    heading: 'What Is a Commercial Electrician?',
    content: (
      <>
        <p>
          A commercial electrician works on non-domestic premises — offices, retail units, shops,
          restaurants, hotels, warehouses, factories, schools, colleges, universities, hospitals,
          care homes, leisure centres, and public buildings. The work covers the full range of
          electrical installation, maintenance, inspection, and design for buildings that are used
          for commercial, industrial, institutional, or public purposes.
        </p>
        <p>
          Commercial electrical work is fundamentally different from domestic work in scale,
          complexity, and regulatory requirements. While a domestic electrician might work with a
          16-way consumer unit and 6mm cables, a commercial electrician regularly deals with
          three-phase distribution boards, sub-distribution boards, rising mains, busbar trunking
          systems, SWA (Steel Wire Armoured) cables up to 300mm or larger, and containment systems
          spanning entire buildings.
        </p>
        <p>
          Beyond the core electrical installation, commercial electricians often work on specialist
          systems that are rarely found in domestic settings: fire alarm systems to{' '}
          <SEOInternalLink href="/guides/fire-alarm-certificate">BS 5839-1</SEOInternalLink>,{' '}
          <SEOInternalLink href="/guides/emergency-lighting-certificate">
            emergency lighting systems
          </SEOInternalLink>{' '}
          to BS 5266, data and communications cabling, access control, CCTV, intruder alarms, and
          building management systems (BMS). This breadth of work makes commercial electrical
          installation one of the most technically demanding and rewarding areas of the trade.
        </p>
      </>
    ),
  },
  {
    id: 'differences-from-domestic',
    heading: 'Key Differences from Domestic Work',
    content: (
      <>
        <p>
          If you are used to domestic work and considering moving into commercial, understanding the
          key differences is essential. The gap between domestic and commercial is not just about
          bigger cables — it is a fundamentally different working environment with different skills,
          different tools, and different commercial pressures.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase supplies</strong> — commercial premises typically have a
                three-phase 400V supply, not a single-phase 230V supply. You need to understand
                three-phase distribution, phase balancing, three-phase protective device selection,
                and three-phase fault calculations. Your test instruments must be rated for
                three-phase systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Larger installations and distribution</strong> — commercial buildings have
                main distribution boards feeding sub-distribution boards, sometimes across multiple
                floors. Rising mains, sub-main cables, busbar trunking, and cable management systems
                (cable tray, ladder rack, basket, dado and skirting trunking) are standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm systems (BS 5839-1)</strong> — most commercial buildings require
                a fire detection and alarm system. Design categories (L1 through L4, M) determine
                the extent of coverage. Installation requires fire-resistant cables, specific
                detector spacing, zone planning, cause and effect matrices, and commissioning to the
                standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting (BS 5266)</strong> — commercial premises require
                emergency escape lighting that operates when the normal lighting fails. The system
                must illuminate escape routes, exit signs, and high-risk areas. Testing and
                certification must comply with BS 5266.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SWA cabling</strong> — Steel Wire Armoured cable is the standard for
                external and underground cable runs on commercial sites. Stripping, terminating, and
                glanding SWA requires specific tools and skills not commonly used in domestic work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Ruler className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design work</strong> — commercial projects require electrical design:
                schematic diagrams, distribution board schedules, cable sizing calculations,
                protective device selection and coordination, discrimination studies, and
                containment layouts. This is where the C&G 2396 qualification becomes essential.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The working environment is also different. Commercial electricians typically work on
          construction sites with other trades, under the supervision of a main contractor or
          project manager, within CDM regulations, and to a programme. Site inductions, RAMS, CSCS
          or ECS cards, PPE requirements, and toolbox talks are all part of the daily routine.
        </p>
      </>
    ),
  },
  {
    id: 'typical-commercial-jobs',
    heading: 'Typical Commercial Electrical Jobs',
    content: (
      <>
        <p>
          Commercial electrical work covers a wide range of project types. Here are the most common:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Office fit-outs and refurbishments</strong> — installing power, lighting,
                data, fire alarm, and emergency lighting for new office spaces or refurbishments of
                existing spaces. This is the bread-and-butter of commercial electrical work,
                covering everything from small single-room offices to multi-floor corporate
                headquarters.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retail and hospitality</strong> — shop fits, restaurant installations, hotel
                refurbishments, and leisure facilities. Typically involves decorative lighting,
                display lighting, kitchen extracts, commercial kitchen power, and customer-facing
                finishes that must look as good as they function.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warehouse and industrial</strong> — power distribution for machinery and
                equipment, high-bay lighting, three-phase motor installations, distribution board
                installations, containment runs, and external SWA supplies. Involves heavy cables,
                large protective devices, and mechanical fixings at height.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Schools and education</strong> — new-build schools, refurbishments, and
                planned maintenance programmes. Requires careful coordination with the school
                timetable, DBS checks for workers, and awareness of safeguarding requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Healthcare</strong> — hospitals, GP surgeries, dental practices, and care
                homes. Specialist requirements including medical IT systems, supplementary
                equipotential bonding, and emergency power supplies. HTM (Health Technical
                Memoranda) standards apply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Periodic inspection and testing (commercial EICRs)</strong> — inspecting and
                testing existing commercial installations. Larger, more complex, and more
                time-consuming than domestic EICRs, often involving multiple distribution boards,
                three-phase systems, and hundreds of circuits.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Commercial EICR on your phone"
          description="Elec-Mate's EICR handles multi-board commercial installations. Board scanner works on commercial distribution boards. Schedule of tests supports unlimited circuits. Send the EICR and invoice to the building manager from site."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'qualifications-needed',
    heading: 'Qualifications for Commercial Electrical Work',
    content: (
      <>
        <p>
          Commercial electrical work demands a broader set of qualifications than domestic-only
          work. Here is the qualification pathway for a commercial electrician:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Level 3 Diploma in Electrical Installation</strong> (C&G 2365, 2357, or
                5357) — the foundation installation qualification. Same as domestic, but commercial
                work requires a deeper understanding of the three-phase and design elements covered
                in the later units.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>18th Edition IET Wiring Regulations</strong> (C&G 2382-22) — essential
                knowledge of{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>
                . The same qualification as domestic, but commercial electricians need a deeper
                understanding of Part 3 (assessment of general characteristics), Part 5 (selection
                and erection of equipment), and Part 7 (special installations and locations).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection and Testing</strong> (C&G 2391) — essential for carrying out
                initial verification of your own installations and periodic inspections of existing
                commercial installations. Commercial EICRs are a significant revenue stream.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design and Verification</strong> (C&G 2396) — the critical qualification
                that distinguishes a commercial electrician from a domestic installer. Covers load
                assessment, circuit design, cable selection and calculation, protective device
                selection and coordination, discrimination, and verification that a design complies
                with BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm qualifications</strong> — FIA Foundation Module and FIA Unit 3
                (Fire Detection and Alarm) for installing fire alarm systems to BS 5839-1. Required
                if you intend to design, install, or commission fire alarm systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SSIP accreditation</strong> (Safety Schemes in Procurement) — most main
                contractors require SSIP-registered subcontractors. Options include CHAS,
                SafeContractor, Constructionline, and Acclaim. Demonstrates your health and safety
                management system meets a recognised standard.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Beyond formal qualifications, commercial electricians need practical skills that come with
          experience: reading and interpreting architectural drawings, coordinating with M&E
          (Mechanical and Electrical) consultants and other design team members, programming and
          commissioning fire alarm and emergency lighting panels, and managing subcontractor
          documentation on large projects.
        </p>
      </>
    ),
  },
  {
    id: 'niceic-approved-vs-domestic',
    heading: 'NICEIC Approved Contractor vs Domestic Installer',
    content: (
      <>
        <p>
          If you are moving from domestic to commercial work, one of the first decisions is
          upgrading your competent person scheme registration. The Domestic Installer scheme
          (offered by NICEIC, NAPIT, and ELECSA) covers work in dwellings only. To work on
          commercial premises, you need the full-scope registration — NICEIC Approved Contractor,
          NAPIT Full Scope, or ELECSA Full Scope.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Domestic Installer</h3>
            <div className="space-y-3 text-white text-sm leading-relaxed">
              <p>
                <strong>Scope:</strong> Domestic dwellings only — houses, flats, bungalows, HMOs.
              </p>
              <p>
                <strong>Self-certification:</strong> Part P Building Regulations for domestic work.
              </p>
              <p>
                <strong>Assessment:</strong> Annual assessment of domestic work samples,
                qualifications, test instruments, and insurance.
              </p>
              <p>
                <strong>Cost:</strong> Lower annual fee (typically £400 to £600).
              </p>
              <p>
                <strong>Suitable for:</strong> Electricians who work exclusively in residential
                properties.
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Approved Contractor</h3>
            <div className="space-y-3 text-white text-sm leading-relaxed">
              <p>
                <strong>Scope:</strong> All electrical work — domestic, commercial, industrial, and
                specialist installations.
              </p>
              <p>
                <strong>Self-certification:</strong> Part P for domestic, plus certification of all
                commercial and industrial work.
              </p>
              <p>
                <strong>Assessment:</strong> More rigorous annual assessment covering a broader
                range of work, design competence, and management systems.
              </p>
              <p>
                <strong>Cost:</strong> Higher annual fee (typically £600 to £1,000).
              </p>
              <p>
                <strong>Suitable for:</strong> Electricians who take on commercial, industrial, or
                mixed-use projects.
              </p>
            </div>
          </div>
        </div>
        <p>
          Upgrading from Domestic Installer to Approved Contractor involves an additional assessment
          by your scheme provider. They will want to see evidence of your competence in commercial
          work — typically through completed commercial projects, C&G 2396 qualification,
          appropriate test instruments for three-phase systems, and higher levels of insurance
          cover. If you have not yet completed any commercial work, some schemes allow you to
          upgrade based on qualifications and supervised experience, with a condition that your
          early commercial work is assessed more closely.
        </p>
      </>
    ),
  },
  {
    id: 'pricing-commercial-work',
    heading: 'Pricing Commercial Electrical Work',
    content: (
      <>
        <p>
          Pricing commercial work is more structured than domestic pricing. Instead of estimating a
          job from a site visit and providing a verbal or emailed quote, commercial pricing
          typically involves:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Taking off from drawings</strong> — quantifying materials and labour from
                architectural and electrical drawings, specifications, and bills of quantities. This
                requires the ability to read scaled floor plans, circuit schematics, and reflected
                ceiling plans.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Material pricing</strong> — obtaining trade prices for all materials from
                your electrical wholesaler. Commercial jobs involve bulk quantities, and discounts
                can make a significant difference to your competitiveness. Building good
                relationships with wholesale account managers pays off.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Labour rates and measured work</strong> — calculating labour time based on
                measured work rates. Industry pricing guides (SPONS Electrical, Electrical
                Estimating Guide) provide standard times for common tasks. Your own records of
                actual time taken on previous jobs are even more valuable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overhead and profit</strong> — commercial tenders must include your business
                overheads (van, insurance, tools, scheme fees, office costs, admin time) and a
                profit margin. Typical net margins on commercial electrical work range from 5% to
                15%, depending on the project size and your competitive position.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Getting commercial pricing right is the difference between winning profitable contracts
          and either losing bids or winning unprofitable ones. Many commercial electricians use
          estimating software, but the fundamentals are the same: accurate quantities, realistic
          labour times, competitive material prices, and an appropriate margin.
        </p>
        <SEOAppBridge
          title="AI Cost Engineer for commercial pricing"
          description="Elec-Mate's AI Cost Engineer prices commercial electrical work using real trade data and measured work rates. Upload the spec, describe the scope, and get a detailed price breakdown — materials, labour, and margin — in minutes, not hours."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'working-with-main-contractors',
    heading: 'Working with Main Contractors',
    content: (
      <>
        <p>
          Most commercial electrical work is carried out as a subcontractor working under a main
          contractor (also called the principal contractor on CDM-notifiable projects). The main
          contractor manages the overall construction project and coordinates the various trade
          subcontractors — electrical, mechanical, plumbing, fire protection, ceilings, joinery,
          decoration, and so on.
        </p>
        <p>
          Working with main contractors requires a different set of skills compared to working
          directly with domestic customers. Here is what to expect:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pre-qualification</strong> — before you can tender for work, most main
                contractors require you to pass a pre-qualification process. This typically involves
                providing evidence of your competent person scheme registration, SSIP accreditation,
                insurance certificates, health and safety policy, recent project references, and
                financial standing. Some use online portals (Constructionline, BuildingConfidence)
                to manage subcontractor pre-qualification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Programme and coordination</strong> — your work must fit within the main
                contractor's programme. First-fix electrical work typically follows structural and
                framing work but precedes plasterboard and ceilings. Second-fix follows decoration.
                Delays in other trades will affect your start dates, and you need to manage your
                labour accordingly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Payment terms</strong> — commercial contracts typically operate on monthly
                valuations with 30 to 60-day payment terms. You submit a monthly application for
                payment based on the value of work completed that month, the main contractor
                assesses it, and payment follows. Cash flow management is critical — you may be
                paying for materials and labour weeks before you receive payment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Variations and extras</strong> — commercial contracts rarely run exactly to
                plan. Changes to the scope, additional work, and unforeseen issues are managed
                through formal variation orders. Always document variations in writing before
                carrying out the work, and agree the cost with the main contractor.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Building a reputation with main contractors is one of the best ways to secure a steady
          pipeline of commercial work. Main contractors want reliable subcontractors who turn up
          when they say they will, do quality work, manage their own health and safety, provide
          documentation promptly, and do not cause problems. Be that subcontractor, and the work
          follows.
        </p>
      </>
    ),
  },
  {
    id: 'cdm-responsibilities',
    heading: 'CDM Responsibilities for Electrical Contractors',
    content: (
      <>
        <p>
          The Construction (Design and Management) Regulations 2015 (CDM 2015) apply to all
          construction projects in the UK, including most commercial electrical work. CDM places
          duties on clients, principal designers, principal contractors, designers, and contractors.
          As an electrical subcontractor, you are a "contractor" under CDM, and if you are also
          producing the electrical design, you may also be a "designer."
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contractor duties</strong> — plan, manage, and monitor your own work to
                ensure it is carried out safely and without risk to health. Provide your workers
                with appropriate supervision, information, instruction, and training. Ensure your
                workers have the skills, knowledge, experience, and (where required) organisational
                capability to carry out the work safely. Not begin work unless reasonable steps have
                been taken to prevent unauthorised access to the site. Report anything that is
                likely to endanger health or safety.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Designer duties (if applicable)</strong> — if you are designing the
                electrical installation (not just installing someone else's design), you have
                designer duties under CDM. You must eliminate foreseeable risks where possible (for
                example, designing cable routes that avoid working at height where possible). Reduce
                risks that cannot be eliminated. Provide information about remaining risks in the
                health and safety file.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RAMS (Risk Assessments and Method Statements)</strong> — for every
                significant work activity, you must produce a risk assessment and method statement
                before starting work. This covers the hazards, the people at risk, the control
                measures, the sequence of work, the equipment required, and the competence of the
                workers. RAMS must be specific to the site and the work — generic templates are not
                sufficient.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In practice, CDM compliance for electrical subcontractors means attending the site
          induction, reviewing the construction phase plan, producing site-specific RAMS for your
          work activities, holding toolbox talks with your team, maintaining competence records, and
          cooperating with the principal contractor on health and safety matters. It is
          administrative work, but it is legally required and commercially expected — main
          contractors will not let you on site without it.
        </p>
      </>
    ),
  },
  {
    id: 'elec-mate-for-commercial',
    heading: 'Elec-Mate for Commercial Electricians',
    content: (
      <>
        <p>
          Elec-Mate is not just for domestic work. The platform includes a full suite of tools
          designed for commercial electrical installation, inspection, and design. Here is what
          commercial electricians get:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Commercial EICR with Unlimited Circuits
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  The EICR module handles multi-board commercial installations with no limit on the
                  number of circuits. Add multiple distribution boards, sub-boards, and hundreds of
                  circuit test results. The AI board scanner works on commercial distribution boards
                  just as it does on domestic consumer units.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Flame className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Fire Alarm and Emergency Lighting Certificates
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete{' '}
                  <SEOInternalLink href="/guides/fire-alarm-certificate">
                    fire alarm certificates
                  </SEOInternalLink>{' '}
                  to BS 5839 and{' '}
                  <SEOInternalLink href="/guides/emergency-lighting-certificate">
                    emergency lighting certificates
                  </SEOInternalLink>{' '}
                  to BS 5266 on your phone. Record system details, zone plans, device schedules, and
                  test results. Export as professional PDFs and send to the building manager on
                  site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Circuit Designer</h4>
                <p className="text-white text-sm leading-relaxed">
                  Describe the commercial installation — the building type, supply details, load
                  requirements, and special considerations — and the AI Circuit Designer produces a
                  compliant electrical design with distribution board schedules, cable sizing, and
                  protective device selection. Perfect for design-and-build commercial projects.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Three-Phase Calculators</h4>
                <p className="text-white text-sm leading-relaxed">
                  Cable sizing for three-phase circuits, three-phase power calculations, maximum
                  demand assessment, voltage drop calculations for long sub-main runs, and
                  prospective fault current calculations. All the calculators a commercial
                  electrician needs, right in the app.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">RAMS Generator and AI Cost Engineer</h4>
                <p className="text-white text-sm leading-relaxed">
                  Generate site-specific RAMS for any commercial work activity. Price commercial
                  projects using the AI Cost Engineer with real trade data and measured work rates.
                  Two tools that save hours on every commercial project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CommercialElectricianGuidePage() {
  return (
    <GuideTemplate
      title="Commercial Electrician Guide | Roles & Requirements UK"
      description="Complete guide to working as a commercial electrician in the UK. Three-phase systems, fire alarms, emergency lighting, design work, CDM responsibilities, pricing commercial contracts, and Elec-Mate tools for commercial electricians."
      datePublished="2025-06-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          Commercial Electrician Guide:{' '}
          <span className="text-yellow-400">Working in Commercial Electrical Installation</span>
        </>
      }
      heroSubtitle="Three-phase distribution, fire alarms, emergency lighting, SWA cabling, containment systems, and design work. What commercial electricians do, the qualifications you need, how to price commercial contracts, and how Elec-Mate handles it all."
      readingTime={20}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Commercial Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Commercial Electrical Tools on Your Phone"
      ctaSubheading="Multi-board EICRs, fire alarm certificates, emergency lighting certs, three-phase calculators, AI design, RAMS, and pricing. Everything a commercial electrician needs. 7-day free trial."
    />
  );
}
