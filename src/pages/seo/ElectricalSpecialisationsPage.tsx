import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  Flame,
  Sun,
  Cable,
  Cpu,
  Factory,
  ShieldCheck,
  GraduationCap,
  PoundSterling,
  Briefcase,
  FileText,
  Building,
  Award,
  Plug,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career', href: '/guides/how-to-become-electrician' },
  { label: 'Specialisations', href: '/guides/electrical-specialisations' },
];

const tocItems = [
  { id: 'why-specialise', label: 'Why Specialise?' },
  { id: 'fire-alarm', label: 'Fire Alarm Engineer' },
  { id: 'ev-charging', label: 'EV Charging Installer' },
  { id: 'solar-pv', label: 'Solar PV Installer' },
  { id: 'data-cabling', label: 'Data Cabling Specialist' },
  { id: 'bms', label: 'BMS Engineer' },
  { id: 'industrial', label: 'Industrial Electrician' },
  { id: 'testing-specialist', label: 'Testing Specialist' },
  { id: 'choosing-specialisation', label: 'How to Choose' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Specialising in a niche area of electrical work can significantly increase your earning potential — specialists typically earn 20% to 40% more than generalist electricians.',
  'The fastest-growing specialisations in 2026 are EV charge point installation, solar PV, and BMS (Building Management Systems), driven by the UK net-zero agenda.',
  'Most specialisations require additional qualifications beyond the standard 18th Edition and 2391 — plan your training pathway to build the right credentials.',
  'You do not have to abandon general electrical work to specialise — many electricians maintain a core domestic or commercial workload while building a specialism alongside it.',
  'Elec-Mate offers training courses covering fire alarm, EV charging, and other specialisations, alongside professional development tools to track your CPD and build your ElecID profile.',
];

const faqs = [
  {
    question: 'How long does it take to specialise as an electrician?',
    answer:
      'It depends on the specialisation. Some areas — like EV charging — require a single course (C&G 2919, typically 3 to 5 days) and can be added to your services almost immediately. Others — like fire alarm engineering or BMS — require more extensive training and practical experience, often 1 to 2 years of supervised work before you are fully competent. Solar PV installation requires the MCS (Microgeneration Certification Scheme) qualification, which involves training, assessment, and registration. Data cabling has its own qualification framework (BICSI, City & Guilds). In general, plan for 3 to 12 months to gain the necessary qualifications and 6 to 24 months to build sufficient practical experience to work independently in a new specialism.',
  },
  {
    question: 'Can I specialise without being a fully qualified electrician?',
    answer:
      'For most electrical specialisations, you need to be a qualified electrician first. Fire alarm installation, EV charging, solar PV, and testing all require a foundation of electrical knowledge that comes from your core qualifications (18th Edition, 2391, AM2). Data cabling is one area where you can specialise without full electrical qualifications, as it involves low-voltage structured cabling (Cat5e, Cat6, fibre) rather than mains voltage work. BMS engineering can be entered from either an electrical or a controls/automation background. However, having full electrical qualifications always gives you an advantage and wider career flexibility.',
  },
  {
    question: 'Which electrical specialisation pays the most?',
    answer:
      'The highest-paying specialisations tend to be those with the greatest demand-to-supply imbalance and the highest complexity. In 2026, BMS engineers and commissioning engineers are among the highest paid, with experienced professionals earning £55,000 to £75,000+ per year employed, or significantly more as contractors. Solar PV and EV charging installers who run their own businesses can earn £60,000 to £100,000+ due to strong consumer demand. Industrial electricians with HV (high voltage) experience also command premium rates. Testing specialists (periodic inspectors) earn well if they maintain a high volume of EICR work, particularly landlord and commercial inspections. The key factor is not just the specialisation itself but your skill level, reputation, and business acumen.',
  },
  {
    question: 'Should I do domestic or commercial specialisation?',
    answer:
      'This depends on your working style and career goals. Domestic specialisations (EV charging, solar PV, smart home) suit self-employed electricians who enjoy direct client relationships and want to expand their domestic service offering. Commercial specialisations (fire alarm, BMS, data cabling, industrial) suit electricians who prefer larger projects, team working, and the career progression available in commercial contracting companies. Some specialisations — like testing — work equally well in both sectors. Consider where your current experience lies, what you enjoy, and where you see the most opportunity in your area.',
  },
  {
    question: 'Do I need to be registered with a specific body for my specialisation?',
    answer:
      'For some specialisations, yes. Solar PV installation requires MCS certification to install systems that qualify for the Smart Export Guarantee (SEG). EV charging installation through the OZEV grant scheme (now ended, but relevant for prior work) required TrustMark and PAS 2030 registration. Fire alarm work to BS 5839 is typically carried out by BAFE-registered companies or those with third-party certification (NSI, SSAIB). For testing and periodic inspection, your competent person scheme registration (NICEIC, NAPIT, ELECSA) covers you. Data cabling professionals may hold BICSI certification. In general, check what registration or accreditation your target clients and market require before investing in training.',
  },
  {
    question: 'Can I combine multiple specialisations?',
    answer:
      'Absolutely, and many successful electricians do. Common combinations include: domestic installation plus EV charging plus solar PV (offering homeowners a complete energy package), commercial installation plus fire alarm plus emergency lighting (a full building services package), or testing specialist plus domestic installation (offering EICRs alongside remedial and upgrade work). The key is ensuring you maintain competence in each area through regular CPD and practical work. Spreading yourself too thin across too many specialisations can dilute your expertise — it is better to be excellent in 2 to 3 areas than mediocre in 6.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/domestic-vs-commercial-electrician',
    title: 'Domestic vs Commercial',
    description:
      'Compare the two main sectors of the electrical industry — work types, earnings, and career progression.',
    icon: Building,
    category: 'Career',
  },
  {
    href: '/guides/electrician-salary-uk',
    title: 'Electrician Salary UK 2026',
    description:
      'Salary data by specialisation, region, and experience level — see what specialists earn.',
    icon: PoundSterling,
    category: 'Career',
  },
  {
    href: '/guides/electrical-qualifications-pathway',
    title: 'Qualifications Pathway',
    description:
      'Map out the qualifications you need for your chosen specialisation, from Level 2 to Level 4.',
    icon: Award,
    category: 'Career',
  },
  {
    href: '/guides/cpd-for-electricians',
    title: 'CPD for Electricians',
    description:
      'How to maintain and develop your professional skills with continuing professional development.',
    icon: GraduationCap,
    category: 'Career',
  },
  {
    href: '/guides/electrician-self-employed',
    title: 'Self-Employed Electrician',
    description:
      'Set up your specialist business — insurance, marketing, pricing, and scheme registration.',
    icon: Briefcase,
    category: 'Business',
  },
  {
    href: '/guides/niceic-vs-napit',
    title: 'NICEIC vs NAPIT',
    description:
      'Which scheme best supports your specialisation? Compare costs, coverage, and assessment.',
    icon: ShieldCheck,
    category: 'Career',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-specialise',
    heading: 'Why Specialise as an Electrician?',
    content: (
      <>
        <p>
          Most electricians qualify as general installers, capable of doing rewires, consumer unit
          changes, new circuits, and periodic inspection and testing. This gives you a solid,
          versatile skill set — but it also puts you in direct competition with every other general
          electrician in your area. Specialising sets you apart.
        </p>
        <p>
          A specialisation does three things for your career. First, it increases your earning
          potential — specialists charge higher rates because they have skills and qualifications
          that generalists do not. Second, it reduces competition — fewer electricians in your area
          will offer the same specialist service. Third, it future-proofs your career — the UK
          electrical industry is evolving rapidly, driven by the net-zero transition, and
          electricians who specialise in growing areas like{' '}
          <SEOInternalLink href="/guides/ev-charger-installation">EV charging</SEOInternalLink> and
          solar PV are positioning themselves for sustained demand.
        </p>
        <p>
          This guide covers the seven most in-demand electrical specialisations in the UK in 2026,
          with details on what each involves, what qualifications you need, and what you can expect
          to earn. Whether you are a{' '}
          <SEOInternalLink href="/guides/how-to-become-electrician">
            newly qualified electrician
          </SEOInternalLink>{' '}
          planning your career or an experienced installer looking to diversify, there is a
          specialisation here that fits.
        </p>
      </>
    ),
  },
  {
    id: 'fire-alarm',
    heading: 'Fire Alarm Engineer (BS 5839)',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <div className="flex items-start gap-4">
            <Flame className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">Overview</h4>
              <p className="text-white text-sm leading-relaxed">
                Fire alarm engineers design, install, commission, and maintain fire detection and
                alarm systems in accordance with BS 5839 (Part 1 for commercial, Part 6 for
                domestic). This includes conventional, addressable, and analogue-addressable systems
                from manufacturers like Kentec, Advanced, Morley, and Notifier.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications needed:</strong> FIA (Fire Industry Association) approved
                training, BS 5839 Parts 1 and 6 courses, manufacturer-specific training, plus your
                core electrical qualifications (18th Edition, 2391).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earning potential:</strong> £35,000 - £50,000 employed; £45,000 - £70,000+
                self-employed or as a specialist subcontractor. Senior fire alarm design engineers
                can earn £55,000+.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Registration:</strong> Companies typically need to be BAFE-registered
                (SP203-1 for design/installation, SP203-4 for maintenance) or hold NSI/SSAIB
                accreditation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Demand for fire alarm engineers is consistently strong, driven by new-build construction,
          commercial refurbishment, and the ongoing maintenance requirements of existing systems.
          The Grenfell Tower inquiry and subsequent regulatory changes have increased scrutiny of
          fire safety systems, making qualified fire alarm engineers more valuable than ever.
        </p>
      </>
    ),
  },
  {
    id: 'ev-charging',
    heading: 'EV Charge Point Installer',
    content: (
      <>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5 my-4">
          <div className="flex items-start gap-4">
            <Plug className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">Overview</h4>
              <p className="text-white text-sm leading-relaxed">
                EV charge point installers fit home and workplace charging equipment for electric
                vehicles. The work involves installing dedicated circuits (typically 32A for 7kW
                home chargers or up to 100A for 22kW+ commercial units), earthing arrangements
                specific to EV charging, and commissioning smart chargers with network connectivity.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications needed:</strong> C&G 2919 (Electric Vehicle Charging
                Equipment Installation), 18th Edition, and ideally Part P scheme registration.
                Manufacturer training from Podpoint, Zappi, Easee, or Ohme is also valuable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earning potential:</strong> A typical domestic EV charger installation takes
                2 to 4 hours and can be charged at £300 to £600 (labour only). An efficient
                installer can complete 2 per day, generating £600 to £1,200 in daily revenue.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Market outlook:</strong> The UK ban on new petrol and diesel car sales from
                2035, combined with rapidly growing EV adoption, means demand for EV charger
                installation is expected to grow significantly through to 2030 and beyond.
              </span>
            </li>
          </ul>
        </div>
        <p>
          EV charging is one of the most accessible specialisations for domestic electricians. The
          C&G 2919 course takes 3 to 5 days, the equipment is relatively straightforward, and the
          demand is growing rapidly. Many electricians add{' '}
          <SEOInternalLink href="/guides/ev-charger-installation">EV charging</SEOInternalLink> to
          their existing domestic service offering as a natural extension.
        </p>
      </>
    ),
  },
  {
    id: 'solar-pv',
    heading: 'Solar PV Installer',
    content: (
      <>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-4">
            <Sun className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">Overview</h4>
              <p className="text-white text-sm leading-relaxed">
                Solar PV installers design and install photovoltaic systems on domestic and
                commercial roofs, including panel mounting, DC wiring, inverter installation, and
                connection to the consumer unit. Increasingly, this also includes battery storage
                systems and hybrid inverters.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications needed:</strong> C&G 2399 (Solar PV Installation), MCS
                certification (required for Smart Export Guarantee eligibility), 18th Edition, and
                competent person scheme registration. Some installers also complete IPAF and working
                at height training for roof access.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earning potential:</strong> A typical domestic 4kW PV installation generates
                £1,500 to £3,000 in labour and margin for the installer. Experienced solar PV
                businesses with multiple teams can turn over £500,000+ per year. Employed solar
                electricians earn £35,000 - £50,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Market outlook:</strong> UK solar installations hit record levels in 2025,
                driven by rising energy costs and improving battery storage technology. The trend is
                expected to continue strongly through 2026 and beyond. BS 7671:2018+A3:2024
                introduced Regulation 530.3.201 covering bidirectional devices, reflecting the
                growing importance of solar and battery systems.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'data-cabling',
    heading: 'Data Cabling Specialist',
    content: (
      <>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <div className="flex items-start gap-4">
            <Cable className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">Overview</h4>
              <p className="text-white text-sm leading-relaxed">
                Data cabling specialists install structured cabling systems — Cat5e, Cat6, Cat6a,
                and fibre optic — in commercial and residential buildings. This includes rack
                installation, patch panel termination, cable management, and testing/certification
                to ensure the cabling meets performance standards.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications needed:</strong> City & Guilds 3667 (Data Communications
                Cabling), BICSI RCDD or RTPM certifications, manufacturer-specific training (e.g.,
                Excel, Molex, Panduit). Electrical qualifications are advantageous but not always
                required for low-voltage work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earning potential:</strong> £30,000 - £45,000 employed; £40,000 - £60,000+
                as a specialist subcontractor. Fibre optic specialists and those with BICSI
                certifications can command premium rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Market outlook:</strong> Data cabling demand is driven by office fit-outs,
                Wi-Fi infrastructure, AV installations, and the growth of smart building technology.
                Every new office needs cabling, and many existing buildings are being upgraded.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bms',
    heading: 'BMS Engineer (Building Management Systems)',
    content: (
      <>
        <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5 my-4">
          <div className="flex items-start gap-4">
            <Cpu className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">Overview</h4>
              <p className="text-white text-sm leading-relaxed">
                BMS engineers install, commission, and maintain building management systems — the
                automated controls that manage heating, ventilation, air conditioning (HVAC),
                lighting, and energy monitoring in commercial buildings. This is a growing field
                that combines electrical knowledge with controls engineering and IT skills.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications needed:</strong> Electrical qualifications (18th Edition),
                controls and automation training, manufacturer-specific BMS training (Trend,
                Siemens, Honeywell, Schneider). Understanding of communication protocols (BACnet,
                Modbus, KNX, DALI) is essential.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earning potential:</strong> £40,000 - £60,000 employed; £55,000 - £75,000+
                as a senior BMS engineer or commissioning specialist. Contract rates for experienced
                BMS engineers can exceed £350 per day.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Market outlook:</strong> With the UK government's net-zero targets and
                increasing focus on building energy performance, BMS engineers are in extremely high
                demand. BREEAM and LEED certification requirements drive BMS installations in all
                major new commercial buildings.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Track your specialist CPD with Elec-Mate"
          description="Log your specialist training courses, manufacturer certifications, and CPD hours in one place. Your ElecID profile shows clients and employers your verified specialist credentials."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'industrial',
    heading: 'Industrial Electrician',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <div className="flex items-start gap-4">
            <Factory className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">Overview</h4>
              <p className="text-white text-sm leading-relaxed">
                Industrial electricians work in manufacturing plants, processing facilities, power
                stations, and heavy industry. The work involves three-phase power distribution,
                motor control centres, PLCs (programmable logic controllers), variable speed drives,
                high voltage (HV) systems, and hazardous area installations (ATEX/IECEx).
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications needed:</strong> 18th Edition, CompEx (for hazardous areas),
                HV switching and safety training, PLC programming courses, and manufacturer-specific
                drive and motor control training. NVQ Level 3 in Electrotechnical Services
                (Maintenance).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earning potential:</strong> £38,000 - £55,000 employed; £45,000 - £70,000+
                for HV-qualified or CompEx-qualified engineers. Shutdown and outage work on
                petrochemical and power generation sites can pay premium rates of £300 - £450+ per
                day.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Market outlook:</strong> Industrial electricians are in steady demand across
                manufacturing, food processing, pharmaceuticals, and energy sectors. The transition
                to renewable energy and the growth of battery storage facilities is creating new
                industrial electrical opportunities.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'testing-specialist',
    heading: 'Inspection and Testing Specialist',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">Overview</h4>
              <p className="text-white text-sm leading-relaxed">
                Testing specialists focus primarily on periodic inspection and testing of electrical
                installations, producing{' '}
                <SEOInternalLink href="/guides/eicr-for-landlords">EICRs</SEOInternalLink> for
                landlords, commercial premises, and domestic clients. This is a high-demand,
                high-volume niche that suits experienced electricians who excel at systematic
                testing and accurate reporting.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications needed:</strong>{' '}
                <SEOInternalLink href="/guides/city-guilds-2391">C&G 2391</SEOInternalLink>{' '}
                (Inspection and Testing) is the essential qualification, plus 18th Edition and
                competent person scheme registration. Experience and a thorough understanding of GN3
                (Guidance Note 3) are critical.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earning potential:</strong> A testing specialist completing 2 to 3 EICRs per
                day can generate £300 to £750 in daily revenue. Annual earnings of £50,000 to
                £80,000+ are achievable for efficient, well-organised inspectors who build a steady
                pipeline of landlord and commercial inspection work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Market outlook:</strong> The 5-year EICR cycle for rented properties under
                the 2020 Regulations creates a permanent, recurring demand for testing specialists.
                Combined with commercial EICR requirements and landlord compliance work, this is one
                of the most stable specialisations available.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Complete EICRs faster with Elec-Mate"
          description="AI board scanner, voice test entry, automatic defect coding, and instant PDF delivery. Testing specialists using Elec-Mate complete EICRs in half the time — more inspections per day, more revenue per week."
          icon={Zap}
        />
      </>
    ),
  },
  {
    id: 'choosing-specialisation',
    heading: 'How to Choose the Right Specialisation',
    content: (
      <>
        <p>
          Choosing a specialisation is a significant career decision. Here are the factors to
          consider:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What do you enjoy?</strong> If you hate being on roofs, solar PV is not for
                you. If you love fault finding and systematic testing, become a testing specialist.
                If you are fascinated by technology and automation, BMS engineering could be your
                path. Enjoyment matters — you will spend decades doing this work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What does your local market need?</strong> Research demand in your area. If
                your area has a high proportion of rented properties, testing specialisation makes
                sense. If you are in a region with heavy industry, industrial electrical skills are
                in demand. If you are in an affluent area with high EV adoption, EV charging is a
                natural fit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What is the investment?</strong> Some specialisations require minimal
                investment (EV charging: one course and basic tooling). Others require significant
                investment (solar PV: MCS certification, scaffolding/roof access training, and
                panel/inverter stock).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What is the long-term trajectory?</strong> Consider where the industry is
                heading. EV charging, solar PV, BMS, and battery storage are all growth areas tied
                to the UK net-zero agenda. Traditional areas like domestic rewiring will always have
                demand but are not growing.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Whichever direction you choose, invest in quality training, build practical experience,
          and track your <SEOInternalLink href="/guides/cpd-for-electricians">CPD</SEOInternalLink>{' '}
          to demonstrate your ongoing competence in your specialist area.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalSpecialisationsPage() {
  return (
    <GuideTemplate
      title="Electrical Specialisations | Career Options UK"
      description="Guide to electrical specialisations in the UK: fire alarm, EV charging, solar PV, data cabling, BMS, industrial, and testing specialist. Qualifications, earning potential, and career paths for each."
      datePublished="2025-07-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Electrical Specialisations:{' '}
          <span className="text-yellow-400">Career Options for UK Electricians</span>
        </>
      }
      heroSubtitle="General electrical work pays the bills. Specialist skills build a career. From fire alarm engineering to EV charging, solar PV to BMS, this guide covers the seven most in-demand electrical specialisations in the UK — what they involve, what qualifications you need, and what you can earn."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Specialisations"
      relatedPages={relatedPages}
      ctaHeading="Build Your Specialist Career"
      ctaSubheading="Access specialist training courses, track your CPD, and build your ElecID profile — all on Elec-Mate. Show clients and employers your verified specialist qualifications. 7-day free trial."
    />
  );
}
