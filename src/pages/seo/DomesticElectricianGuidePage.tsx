import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Home,
  FileCheck2,
  Calculator,
  GraduationCap,
  PoundSterling,
  Wrench,
  ShieldCheck,
  Zap,
  ClipboardCheck,
  Plug,
  Receipt,
  Camera,
  BookOpen,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Domestic Electrician Guide', href: '/guides/domestic-electrician-guide' },
];

const tocItems = [
  { id: 'what-is-domestic-electrician', label: 'What Is a Domestic Electrician?' },
  { id: 'typical-domestic-jobs', label: 'Typical Domestic Jobs' },
  { id: 'part-p-requirements', label: 'Part P Building Regulations' },
  { id: 'competent-person-schemes', label: 'Competent Person Schemes' },
  { id: 'qualifications-needed', label: 'Qualifications Needed' },
  { id: 'typical-earnings', label: 'Typical Earnings' },
  { id: 'essential-tools', label: 'Essential Tools' },
  { id: 'day-in-the-life', label: 'A Day in the Life' },
  { id: 'building-client-base', label: 'Building a Client Base' },
  { id: 'elec-mate-for-domestic', label: 'Elec-Mate for Domestic Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A domestic electrician works exclusively on residential properties — houses, flats, bungalows, and HMOs — carrying out installations, alterations, inspections, and fault-finding on fixed electrical systems.',
  'Part P of the Building Regulations (England and Wales) requires that most domestic electrical work is either carried out by a registered competent person or notified to Building Control before work begins.',
  'Registration with a competent person scheme such as NICEIC Domestic Installer, NAPIT, or ELECSA allows you to self-certify notifiable work without involving Building Control, saving your customers time and money.',
  'Typical domestic electrician earnings in the UK range from £30,000 to £55,000 employed, with self-employed electricians earning £40,000 to £70,000+ depending on location, specialisation, and efficiency.',
  'Elec-Mate covers every domestic job — all 8 certificate types, cable sizing for house circuits, board scanner, quote builder, and invoice app. One subscription replaces multiple tools.',
];

const faqs = [
  {
    question: 'What qualifications do I need to become a domestic electrician?',
    answer:
      'To work as a domestic electrician in the UK, you need a core set of qualifications. The foundation is a Level 3 Diploma in Electrical Installation (C&G 2365 or the newer C&G 2357/5357), which covers the theory and practical skills of electrical installation work. On top of this, you need the 18th Edition IET Wiring Regulations qualification (C&G 2382-22), which confirms your knowledge of the current edition of BS 7671. If you plan to carry out inspection and testing — which most domestic electricians do — you will also need C&G 2391 (Inspection, Testing and Certification of Electrical Installations). Many employers and competent person schemes also expect you to hold a current ECS (Electrotechnical Certification Scheme) card, which requires you to demonstrate your qualifications and on-site experience. If you enter through an apprenticeship, you will typically complete the Level 3 Installation Electrician apprenticeship standard, which covers all of these elements over 3 to 4 years.',
  },
  {
    question: 'Do I need to register with a competent person scheme to do domestic work?',
    answer:
      'You are not legally required to register with a competent person scheme, but it is strongly recommended and commercially almost essential. Without registration, you cannot self-certify notifiable electrical work under Part P of the Building Regulations. Instead, you or your customer would need to notify the local authority Building Control before starting work, pay their fee (typically £200 to £400), and arrange for them to inspect the work on completion. This adds cost and delay for the customer, making you less competitive. Registration with a scheme like NICEIC Domestic Installer, NAPIT, or ELECSA allows you to self-certify your own work, issue Building Regulations compliance certificates directly, and list yourself on the scheme provider search directory — which is how many customers find electricians. The annual cost of scheme membership varies but is typically £400 to £800 per year, which is easily offset by the ability to self-certify and the marketing benefit of being a registered installer.',
  },
  {
    question: 'What is the difference between NICEIC Domestic Installer and Approved Contractor?',
    answer:
      'NICEIC offers two main registration levels: Domestic Installer and Approved Contractor. The Domestic Installer scheme covers work in domestic dwellings only — houses, flats, bungalows, and HMOs. It allows you to self-certify notifiable domestic work under Part P. The Approved Contractor scheme covers all types of electrical work, including commercial, industrial, and domestic. It is the higher level of registration and is typically required for commercial contracts, main contractor frameworks, and larger projects. Approved Contractors are assessed to a higher standard and can issue a wider range of certificates. If you only intend to work in domestic properties, the Domestic Installer scheme is sufficient and costs less. If you want to take on commercial or industrial work as well, you will need Approved Contractor status. NAPIT and ELECSA offer equivalent domestic and full-scope registration levels.',
  },
  {
    question: 'How much can a domestic electrician earn in the UK?',
    answer:
      'Earnings vary significantly depending on whether you are employed or self-employed, your location, your specialisation, and how efficiently you run your business. An employed domestic electrician in the UK typically earns £30,000 to £45,000, with experienced sparks in London and the South East earning towards £50,000 to £55,000. Self-employed domestic electricians generally earn more — £40,000 to £70,000 is realistic for a well-organised one-person business, with some earning over £80,000 by specialising in higher-value work such as full rewires, consumer unit upgrades with AFDD protection, or EV charger installations. The key to higher earnings as a self-employed electrician is efficiency: completing work quickly and accurately, certifying on the same day, sending the invoice immediately, and minimising unpaid admin time. Tools like Elec-Mate that handle certification, quoting, and invoicing on site directly contribute to higher effective earnings by eliminating evening desk work.',
  },
  {
    question: 'What is Part P and which domestic jobs are notifiable?',
    answer:
      'Part P is the section of the Building Regulations (England and Wales) that covers electrical safety in dwellings. Introduced in 2005, it requires that domestic electrical work is designed, installed, inspected, and tested so that it is safe. Notifiable work — work that must be either self-certified by a registered competent person or notified to Building Control — includes all new circuits, consumer unit (fuse board) replacements, work in bathrooms and kitchens involving new circuits, work in special locations (swimming pools, saunas), and any work involving the installation of a new distribution board. Minor works such as replacing a socket for socket, changing a light switch, or adding a spur to an existing circuit are generally not notifiable, provided they are not in a bathroom or other special location. However, all electrical work — notifiable or not — must comply with BS 7671 and must be carried out by a competent person. The penalties for carrying out notifiable work without notification or self-certification can include enforcement action by Building Control, difficulty selling the property, and potential liability if a fault causes injury.',
  },
  {
    question: 'What are the most profitable domestic electrical jobs?',
    answer:
      'The most profitable domestic jobs tend to be those with a good balance of materials, labour, and certification value. Full house rewires are the highest-value single job, typically priced at £3,000 to £6,000 for a 3-bedroom house, but they involve significant labour time (3 to 5 days with a mate) and physical effort. Consumer unit upgrades with AFDD and SPD protection are excellent — typically priced at £600 to £1,200, they can be completed in half a day, and the materials cost has come down significantly. EV charger installations are a growing market, priced at £800 to £1,500 depending on the cable run and whether a dedicated circuit or supply upgrade is needed. Landlord EICRs are highly profitable on a per-hour basis — a typical domestic EICR takes 2 to 3 hours and is priced at £150 to £250, with remedial work generating additional revenue. Additional circuit installations (showers, cookers, garden offices) and outdoor electrics (garden lighting, hot tub supplies) also offer good margins. The key to profitability across all domestic work is efficiency — and certification tools like Elec-Mate that eliminate post-visit paperwork directly increase your effective hourly rate.',
  },
  {
    question: 'Do I need separate insurance for domestic electrical work?',
    answer:
      'Yes, you need appropriate insurance before carrying out any domestic electrical work. The minimum is public liability insurance, which covers you if your work causes injury to a third party or damage to their property — for example, if a faulty connection causes a fire. Most competent person schemes require at least £2 million of public liability cover, and many recommend £5 million. If you employ anyone, you are legally required to have employers liability insurance. Professional indemnity insurance is also advisable — it covers you if a client suffers a financial loss due to your professional advice or design work (for example, if you design a circuit that turns out to be inadequate). Many electricians also carry tool insurance (covering theft of tools from your van) and van insurance appropriate for business use. The cost of a comprehensive insurance package for a sole trader domestic electrician is typically £500 to £1,200 per year. Your competent person scheme membership may include some insurance benefits, so check what is included before arranging separate cover.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/commercial-electrician-guide',
    title: 'Commercial Electrician Guide',
    description:
      'Moving into commercial work? Differences from domestic, qualifications, pricing, and CDM responsibilities.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types',
    description:
      'All 8 certificate types explained — EIC, MEIWC, EICR, minor works, fire alarm, emergency lighting, and more.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'Full guide to Part P requirements, notifiable work, and self-certification through competent person schemes.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-price-electrical-jobs',
    title: 'How to Price Electrical Jobs',
    description:
      'Pricing strategies for domestic work — day rates, fixed quotes, material markups, and the AI Cost Engineer.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-self-employed',
    title: 'Going Self-Employed',
    description:
      'Complete guide to setting up as a self-employed electrician — CIS, insurance, accounting, and finding work.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-change-guide',
    title: 'Consumer Unit Change Guide',
    description:
      'Step-by-step guide to replacing a consumer unit including AFDD, SPD, and current Part P requirements.',
    icon: Zap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-domestic-electrician',
    heading: 'What Is a Domestic Electrician?',
    content: (
      <>
        <p>
          A domestic electrician is a qualified electrician who specialises in residential
          electrical work. This covers houses, flats, bungalows, maisonettes, HMOs (Houses in
          Multiple Occupation), and any other dwelling where people live. The work ranges from small
          jobs like adding a socket to major projects like full house rewires, consumer unit
          upgrades, and EV charger installations.
        </p>
        <p>
          Unlike commercial or industrial electricians who work on three-phase systems, large
          distribution networks, and specialist installations, domestic electricians primarily work
          with single-phase supplies (230V, 100A typical in the UK), consumer units with MCBs and
          RCBOs, and relatively small cable sizes — 1.0mm, 1.5mm, 2.5mm, 4.0mm, 6.0mm, and 10.0mm
          twin and earth being the bread and butter.
        </p>
        <p>
          The regulatory framework for domestic work centres on{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          (England and Wales), which requires that electrical work in dwellings is safe and carried
          out by a competent person. Most domestic electricians register with a competent person
          scheme — NICEIC Domestic Installer, NAPIT, or ELECSA — which allows them to self-certify
          their work without involving Building Control.
        </p>
        <p>
          Domestic electrical work is the largest segment of the UK electrical industry by volume.
          There are approximately 280,000 domestic dwellings rewired or partially rewired each year,
          and an estimated 1.5 million consumer unit replacements. Add to that EICRs for landlords
          (now legally required every 5 years for all privately rented properties), EV charger
          installations (a rapidly growing market), and the everyday additions, alterations, and
          fault-finding work — domestic electricians are never short of work.
        </p>
      </>
    ),
  },
  {
    id: 'typical-domestic-jobs',
    heading: 'Typical Domestic Jobs',
    content: (
      <>
        <p>
          The range of work a domestic electrician handles on a daily basis is broad. Here are the
          most common job types, from routine to major:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full house rewires</strong> — stripping out all existing wiring and
                replacing it with new cables, a new consumer unit, and all accessories. The biggest
                single domestic job, typically taking 3 to 5 days for a 3-bedroom house. Requires a
                full Electrical Installation Certificate (EIC) on completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit changes</strong> — replacing an old fuse board with a modern
                consumer unit with MCBs, RCBOs, AFDDs, and SPDs.{' '}
                <SEOInternalLink href="/guides/consumer-unit-change-guide">
                  Consumer unit replacements
                </SEOInternalLink>{' '}
                are notifiable under Part P and require an EIC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional circuits</strong> — new ring circuits, radial circuits for
                cookers, showers, immersion heaters, outdoor sockets, and garden offices. Each new
                circuit is notifiable work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdoor electrics</strong> — garden lighting, outdoor sockets, hot tub
                supplies, shed and outbuilding supplies, and security lighting. Outdoor circuits
                require RCD protection and careful consideration of IP ratings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installations</strong> — installing dedicated EV charging points
                with their own circuit from the consumer unit. Requires an understanding of maximum
                demand, DNO notification thresholds, and OZEV grant requirements (where applicable).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart home installations</strong> — smart switches, smart lighting systems,
                home automation hubs, and network wiring. An increasingly popular add-on service
                that carries good margins.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICRs (periodic inspections)</strong> — inspecting and testing existing
                installations, particularly for{' '}
                <SEOInternalLink href="/guides/eicr-for-landlords">
                  landlord compliance
                </SEOInternalLink>
                . A steady, recurring revenue stream for domestic electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault-finding and repairs</strong> — diagnosing tripping RCDs, dead
                circuits, intermittent faults, and other problems. Requires strong diagnostic skills
                and systematic testing.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Every one of these jobs requires certification. The type of certificate depends on the
          work: an EIC for new installations and rewires, a{' '}
          <SEOInternalLink href="/guides/minor-works-certificate-explained">
            Minor Works Certificate
          </SEOInternalLink>{' '}
          for smaller alterations, and an EICR for periodic inspections. Elec-Mate handles all 8
          certificate types that a domestic electrician needs, directly from your phone.
        </p>
        <SEOAppBridge
          title="All 8 certificate types in one app"
          description="EIC, MEIWC, EICR, minor works, fire alarm, emergency lighting, EV charger, and PAT testing certificates. Complete them on your phone on site, send them to the customer before you leave. No evening paperwork."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'part-p-requirements',
    heading: 'Part P Building Regulations for Domestic Work',
    content: (
      <>
        <p>
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          is the section that governs electrical safety in dwellings in England and Wales. It was
          introduced in 2005 and has been updated since. The current version requires that
          electrical installation work in a dwelling is designed, installed, inspected, and tested
          so that it is safe for continued use.
        </p>
        <p>
          The key concept is <strong>notifiable work</strong>. Certain types of domestic electrical
          work must be notified to the local authority Building Control before work begins — unless
          the work is carried out by an electrician registered with a competent person scheme, in
          which case the electrician self-certifies the work directly. Notifiable work includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Installation of a new circuit (including new ring circuits, radial circuits,
                lighting circuits, and dedicated appliance circuits).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Replacement of a consumer unit (fuse board) — this is the most common notifiable
                domestic job.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Any electrical work in bathrooms and kitchens that involves installing a new circuit
                (not like-for-like replacements of accessories on existing circuits).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Electrical work in special installations and locations (swimming pools, saunas, hot
                tubs).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Any work that involves a new distribution board or sub-main cable.</span>
            </li>
          </ul>
        </div>
        <p>
          Non-notifiable work includes like-for-like replacements (swapping a socket for a socket, a
          light fitting for a light fitting), adding a spur to an existing circuit outside of a
          bathroom, and repair work. However, all work — notifiable or not — must comply with BS
          7671 and be carried out by a competent person.
        </p>
        <p>
          If you are not registered with a competent person scheme, your customer must pay the local
          authority Building Control to inspect the work. This typically costs £200 to £400 and
          involves a site visit, which adds delay. Registering with a scheme eliminates this
          requirement entirely, making you more competitive and your customers happier.
        </p>
      </>
    ),
  },
  {
    id: 'competent-person-schemes',
    heading: 'Competent Person Scheme Registration',
    content: (
      <>
        <p>
          A competent person scheme is a government-authorised registration body that allows
          electricians to self-certify their work as compliant with the Building Regulations. In
          England and Wales, the three main schemes for domestic electricians are:
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">NICEIC</h3>
            <p className="text-white text-sm leading-relaxed">
              The largest and most recognised scheme. Offers Domestic Installer (domestic work only)
              and Approved Contractor (all work) registration levels. Requires an annual assessment
              of your work, qualifications, test instruments, and insurance. Widely recognised by
              customers and letting agents. NICEIC Domestic Installer is the most popular choice for
              domestic-only electricians.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">NAPIT</h3>
            <p className="text-white text-sm leading-relaxed">
              A strong alternative to NICEIC with a growing membership base. Offers equivalent
              domestic and full-scope registration. The assessment process is similar, and the
              scheme is government-authorised to the same standard. Some electricians prefer NAPIT
              for its lower membership fees and more personal approach to assessments.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">ELECSA</h3>
            <p className="text-white text-sm leading-relaxed">
              A well-established scheme with a reputation for efficient administration and
              competitive pricing. Offers domestic and full-scope registration. ELECSA is part of
              the ECA (Electrical Contractors Association) group, which provides additional member
              benefits including technical support, contract templates, and employment advice.
            </p>
          </div>
        </div>
        <p>
          Regardless of which scheme you choose, the requirements are broadly the same: you must
          hold the current edition qualification (18th Edition, C&G 2382), an appropriate
          installation or inspection qualification, have calibrated test instruments, carry adequate
          insurance, and submit to periodic assessment of your work and records. The scheme assessor
          will visit your premises, review your certificates and test records, and inspect a sample
          of your completed work.
        </p>
        <p>
          The annual cost of scheme membership varies from approximately £400 to £800 depending on
          the scheme and registration level. This is a legitimate business expense and is easily
          offset by the ability to self-certify notifiable work, the marketing benefit of being
          listed on the scheme search directory, and the customer confidence that comes with being a
          registered installer.
        </p>
      </>
    ),
  },
  {
    id: 'qualifications-needed',
    heading: 'Qualifications Needed to Work as a Domestic Electrician',
    content: (
      <>
        <p>
          There is no single "licence to practise" for electricians in the UK — unlike gas
          engineers, who must be Gas Safe registered by law. However, there is a clear set of
          qualifications that you need to work competently and to satisfy the requirements of
          competent person schemes and employers.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Level 3 Diploma in Electrical Installation</strong> (C&G 2365, 2357, or
                5357) — the core installation qualification covering theory, practical skills,
                science, and regulations. This is the foundation qualification for all electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>18th Edition IET Wiring Regulations</strong> (C&G 2382-22) — confirms your
                knowledge of the current edition of{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>
                . Required by all competent person schemes and most employers. Must be renewed when
                a new edition is published.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection and Testing</strong> (C&G 2391 or equivalent) — the qualification
                for carrying out periodic inspections (EICRs) and initial verification testing.
                Essential if you want to carry out landlord EICRs or verify your own installation
                work to the highest standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS Card</strong> — the Electrotechnical Certification Scheme card
                (sometimes called the "gold card") proves your qualifications and competence. Most
                sites and many customers expect to see a valid ECS card. Requires evidence of
                qualifications and appropriate experience.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Additional qualifications that enhance your domestic offering include C&G 2919 (Electric
          Vehicle Charging Equipment Installation), the Level 3 Award in the Requirements for
          Electrical Installations in Dwellings, and various manufacturer-specific training courses
          for smart home systems, solar PV, and battery storage.
        </p>
        <p>
          If you are entering the trade through an{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
            electrical apprenticeship
          </SEOInternalLink>
          , your training provider and employer will guide you through the qualification pathway
          over 3 to 4 years, including on-the-job learning, college attendance, and the End-Point
          Assessment (EPA).
        </p>
      </>
    ),
  },
  {
    id: 'typical-earnings',
    heading: 'Typical Earnings for a Domestic Electrician in 2026',
    content: (
      <>
        <p>
          Domestic electrician earnings in the UK vary widely depending on employment status,
          location, experience, specialisation, and how efficiently you run your business. Here is a
          realistic breakdown:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Employed</h3>
            <div className="space-y-3 text-white text-sm leading-relaxed">
              <p>
                <strong>Newly qualified:</strong> £26,000 to £32,000 per year. You will likely be
                working under supervision initially, building your speed and confidence.
              </p>
              <p>
                <strong>Experienced (3 to 5 years):</strong> £32,000 to £42,000. By now you should
                be working independently and handling most domestic jobs without supervision.
              </p>
              <p>
                <strong>Senior / Supervisor:</strong> £42,000 to £55,000. Leading a team, managing
                larger projects, or specialising in high-value work.
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Self-Employed</h3>
            <div className="space-y-3 text-white text-sm leading-relaxed">
              <p>
                <strong>Starting out:</strong> £35,000 to £45,000. Building your client base,
                establishing your reputation, and learning to price work accurately.
              </p>
              <p>
                <strong>Established (3+ years):</strong> £45,000 to £65,000. Steady pipeline of
                work, repeat customers, landlord EICR contracts, and word-of-mouth referrals.
              </p>
              <p>
                <strong>Specialist / High efficiency:</strong> £65,000 to £80,000+. Specialising in
                rewires, CU upgrades, EV installations, or running a small team.
              </p>
            </div>
          </div>
        </div>
        <p>
          The single biggest lever for increasing your earnings as a self-employed domestic
          electrician is reducing unpaid admin time. Every hour you spend at home typing up
          certificates, writing quotes, or chasing invoices is an hour you could be on site earning.
          This is why tools that handle certification, quoting, and invoicing on site — rather than
          at your desk in the evening — have a direct impact on your bottom line.
        </p>
        <SEOAppBridge
          title="Stop doing paperwork in the evening"
          description="Complete certificates on site. Generate quotes from the schedule of rates. Send invoices before you leave the property. Elec-Mate eliminates the evening desk work that eats into your earnings. 7-day free trial."
          icon={Receipt}
        />
      </>
    ),
  },
  {
    id: 'essential-tools',
    heading: 'Essential Tools for Domestic Electricians',
    content: (
      <>
        <p>
          Beyond the standard hand tools (screwdrivers, pliers, side cutters, wire strippers, cable
          knives), a domestic electrician needs a specific set of test instruments and specialist
          tools to work safely and certify their work. Here are the essentials:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multifunction tester</strong> (e.g., Megger MFT or equivalent) — the single
                most important instrument. Tests continuity, insulation resistance, earth loop
                impedance, prospective fault current, and RCD operation. Required for all
                certification work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage indicator and proving unit</strong> — essential for{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation
                </SEOInternalLink>
                . GS38-compliant voltage indicator with fused test leads, plus a proving unit to
                confirm the indicator is working before and after testing. Non-negotiable safety
                equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket tester with RCD test</strong> — quick check of socket wiring
                (polarity, earth, neutral) and RCD operation. Not a substitute for proper testing
                but useful for initial checks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SDS drill, chasing tools, and hole saws</strong> — for installing cables in
                walls and ceilings. First-fix work requires good quality power tools and a range of
                drill bits and chasing equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable detection equipment</strong> — a cable avoidance tool (CAT) or similar
                device to locate existing cables and pipes before drilling. Essential for avoiding
                damage to hidden services.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Elec-Mate app</strong> — your digital tool belt. Certification, cable
                sizing, testing calculators, quote builder, invoice app, and AI-powered board
                scanner — all in your pocket. One subscription replaces a stack of paper
                certificates, a{' '}
                <SEOInternalLink href="/guides/cable-sizing-calculator">
                  cable sizing app
                </SEOInternalLink>
                , a separate quoting tool, and a separate invoicing tool.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'day-in-the-life',
    heading: 'A Day in the Life of a Domestic Electrician',
    content: (
      <>
        <p>
          No two days are the same for a domestic electrician, but here is a realistic example of a
          productive day for a self-employed spark working in the domestic sector:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-4 text-white">
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold shrink-0">07:30</span>
              <span>
                Arrive at the first job — a landlord EICR on a 2-bedroom flat. Open Elec-Mate, scan
                the consumer unit with the AI board scanner, start the dead testing. Complete the
                schedule of test results using voice entry while testing.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold shrink-0">09:30</span>
              <span>
                EICR complete. Two C2 observations found. Generate the remedial quote using the
                estimator, send the EICR and quote to the landlord by email from the app. Send the
                invoice for the EICR. Total time on site: 2 hours.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold shrink-0">10:00</span>
              <span>
                Drive to the second job — a consumer unit upgrade in a 3-bedroom semi. Isolate the
                supply, strip out the old board, install the new consumer unit with RCBOs and SPD.
                Test each circuit as you connect it.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold shrink-0">14:00</span>
              <span>
                Consumer unit complete. Run through the schedule of test results, complete the EIC
                on Elec-Mate, send the certificate and invoice to the customer. Quick lunch.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold shrink-0">15:00</span>
              <span>
                Third job — adding an outdoor socket and two garden lights for a customer who wants
                their patio electrics sorted before summer. Run the cable, install the accessories,
                test and certify. Minor Works Certificate completed on the app, sent to the customer
                with the invoice by 16:30.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold shrink-0">17:00</span>
              <span>
                Home. No paperwork to do — all three certificates, quotes, and invoices were
                completed and sent on site. Check tomorrow's schedule, reply to a couple of enquiry
                messages, done.
              </span>
            </div>
          </div>
        </div>
        <p>
          The critical difference between a productive day and an average one is what happens after
          5pm. An electrician who completes certification and invoicing on site goes home at 5pm. An
          electrician who still uses paper certificates or desktop software spends 1 to 2 hours
          every evening typing up paperwork. Over a year, that is 250 to 500 hours of unpaid work.
        </p>
      </>
    ),
  },
  {
    id: 'building-client-base',
    heading: 'Building a Domestic Client Base',
    content: (
      <>
        <p>
          For self-employed domestic electricians, building a reliable client base is the difference
          between a good living and a struggle. The best domestic electricians rarely advertise —
          they stay busy through repeat customers, word-of-mouth referrals, and a strong local
          reputation. Here is how to build that:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord contracts</strong> — build relationships with landlords and letting
                agents. A landlord with 10 properties needs an EICR for each one every 5 years, plus
                remedial work, consumer unit upgrades, and general maintenance. One good landlord
                relationship can generate steady work for years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional presentation</strong> — clean van, tidy appearance, branded
                workwear, professional certificates. Customers judge quality by presentation. A
                professional PDF certificate sent by email before you leave the property makes a far
                better impression than a handwritten form posted a week later.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prompt communication</strong> — reply to enquiries within 2 hours, provide
                written quotes promptly, confirm appointment times the day before. Customers choose
                the electrician who responds, not necessarily the cheapest one.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scheme registration and reviews</strong> — being listed on the NICEIC,
                NAPIT, or ELECSA search directory brings in new customers. Encourage happy customers
                to leave Google reviews and Checkatrade reviews. A 5-star profile with 50+ reviews
                is worth more than any paid advertising.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Upsell and advise</strong> — every job is an opportunity to advise the
                customer on improvements. An EICR with C3 observations is an opportunity to quote
                for upgrades. An old consumer unit is an opportunity to discuss RCBOs and AFDDs. A
                customer asking for one outdoor socket may also want garden lighting and a hot tub
                supply. Advise genuinely, and the extra work follows naturally.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The common thread is professionalism. Customers want an electrician who turns up when they
          say they will, does clean work, explains what they have done, provides proper
          certification immediately, and invoices promptly. Every part of that workflow is something
          Elec-Mate handles on your phone, on site, in real time.
        </p>
      </>
    ),
  },
  {
    id: 'elec-mate-for-domestic',
    heading: 'Elec-Mate: Built for Domestic Electricians',
    content: (
      <>
        <p>
          Elec-Mate was designed from the ground up for the domestic electrician workflow. Every
          feature is built to work on a phone, on site, with one hand — because the other hand is
          holding test leads, a drill, or a cup of tea. Here is what one subscription gives you:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">All 8 Certificate Types</h4>
                <p className="text-white text-sm leading-relaxed">
                  EIC, MEIWC, EICR, Minor Works, Fire Alarm (BS 5839), Emergency Lighting (BS 5266),
                  EV Charger, and PAT Testing. Every certificate a domestic electrician needs,
                  completed on your phone and exported as a professional PDF.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Board Scanner</h4>
                <p className="text-white text-sm leading-relaxed">
                  Photograph the consumer unit and Elec-Mate reads the MCB/RCBO ratings, circuit
                  descriptions, and board layout. Populates half the certificate automatically.
                  Works on domestic boards of all ages and manufacturers.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing and Calculators</h4>
                <p className="text-white text-sm leading-relaxed">
                  <SEOInternalLink href="/guides/cable-sizing-calculator">
                    Cable sizing calculator
                  </SEOInternalLink>{' '}
                  for every domestic circuit type — ring circuits, radials, showers, cookers, EV
                  chargers. Plus voltage drop, maximum demand, earth loop impedance, prospective
                  fault current, and conduit/trunking fill calculators.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Receipt className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Builder and Invoice App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Generate professional quotes from your schedule of rates. Convert quotes to
                  invoices with one tap. Send both by email or WhatsApp directly from the app. No
                  separate quoting or invoicing software needed.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          One subscription. One app. Every tool a domestic electrician needs, from certificates to
          calculators to invoices. No more juggling paper forms, spreadsheets, and separate apps.
        </p>
        <SEOAppBridge
          title="One app for every domestic job"
          description="Join 430+ UK electricians using Elec-Mate for domestic certification, calculations, quoting, and invoicing. All on your phone, all on site. 7-day free trial, cancel anytime."
          icon={Zap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function DomesticElectricianGuidePage() {
  return (
    <GuideTemplate
      title="Domestic Electrician Guide UK 2026 | Everything You Need"
      description="Complete guide to working as a domestic electrician in the UK. Typical jobs, Part P requirements, competent person schemes, qualifications, earnings, tools, and how Elec-Mate handles every domestic certification and calculation."
      datePublished="2025-06-15"
      dateModified="2026-02-14"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          Domestic Electrician Guide UK:{' '}
          <span className="text-yellow-400">Everything You Need to Know in 2026</span>
        </>
      }
      heroSubtitle="From rewires and consumer unit changes to EV chargers and landlord EICRs — what a domestic electrician does, what you need to get started, and how Elec-Mate handles every certificate, calculation, and invoice on your phone."
      readingTime={18}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Domestic Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Every Domestic Cert on Your Phone"
      ctaSubheading="Join 430+ UK electricians completing EICs, EICRs, minor works, and more on their phones. AI board scanner, cable sizing, quote builder, and instant delivery. 7-day free trial."
    />
  );
}
