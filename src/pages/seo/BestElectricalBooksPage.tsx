import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Book,
  Zap,
  ShieldCheck,
  Calculator,
  ClipboardCheck,
  Brain,
  GraduationCap,
  BookOpen,
  FileCheck2,
  Star,
  Award,
  Bookmark,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/guides' },
  { label: 'Best Books', href: '/guides/best-electrical-books' },
];

const tocItems = [
  { id: 'books-overview', label: 'Why Books Still Matter' },
  { id: 'bs7671-brown-book', label: 'BS 7671 (The Brown Book)' },
  { id: 'on-site-guide', label: 'On-Site Guide (OSG)' },
  { id: 'guidance-note-3', label: 'Guidance Note 3 (GN3)' },
  { id: 'electricians-guide', label: "Electrician's Guide to the Building Regs" },
  { id: 'brian-scaddan', label: 'Brian Scaddan Books' },
  { id: 'exam-preparation', label: 'Exam Preparation Books' },
  { id: 'additional-reads', label: 'Additional Recommended Reads' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671:2018+A2:2022 (the Brown Book) is the essential reference — every electrician must own the current edition and keep it accessible on site or at home.',
  'The On-Site Guide (OSG) is the practical companion to BS 7671, providing quick-reference tables for cable sizing, Zs limits, disconnection times, and correction factors.',
  'Guidance Note 3 (GN3) is the definitive reference for inspection and testing — essential reading for anyone doing EICRs, EICs, or preparing for the 2391 exam.',
  'Brian Scaddan books are the best-selling electrical training textbooks in the UK, covering the 18th Edition in accessible, apprentice-friendly language.',
  'Elec-Mate complements your bookshelf by putting BS 7671 regulation references, Zs limits, and calculation tools on your phone — accessible on site without carrying books.',
];

const faqs = [
  {
    question: 'Do I need to buy the full BS 7671 book or is the OSG enough?',
    answer:
      'You need both, but for different purposes. The On-Site Guide (OSG) is a quick-reference companion that covers the most commonly needed information — cable selection tables, maximum Zs values, disconnection times, correction factors, and simplified guidance on common installation scenarios. It is the book you reach for most often on site. However, the OSG is not a substitute for BS 7671 itself. The full BS 7671 book contains the complete text of every regulation, appendix, and table. You need it when you encounter an unusual installation, face a compliance question, or need to reference a specific regulation number for an EICR observation. For inspectors and those doing certification work, the full BS 7671 is essential. For apprentices, start with the OSG and a Brian Scaddan textbook, then invest in the full BS 7671 as you progress towards your Level 3.',
  },
  {
    question: 'Which edition of BS 7671 should I buy?',
    answer:
      'Buy BS 7671:2018+A2:2022, which is the 18th Edition including Amendment 1 and Amendment 2. This is the current printed book available from the IET. Amendment 4 (A4:2026) is published as a free PDF supplement — download it from the IET website and keep it with your book. Do not buy a second-hand copy of an older edition (16th or 17th Edition) unless you specifically need it for reference — all current work must be to the 18th Edition. When searching online, look for ISBN 978-1-78561-170-4 to ensure you get the correct current edition.',
  },
  {
    question: 'What is Guidance Note 3 and do I need it?',
    answer:
      'Guidance Note 3 (GN3) is titled "Inspection and Testing" and is published by the IET. It provides detailed guidance on how to carry out the inspection and testing required by BS 7671, including the correct sequence of tests, how to interpret results, how to complete certificates, and how to assign observation codes. GN3 is essential reading for anyone who carries out EICR inspections, issues EICs, or is studying for the City and Guilds 2391 (Inspection and Testing) qualification. It is the 9th Edition (aligned with the 18th Edition of BS 7671). Even experienced inspectors refer to GN3 regularly — it clarifies the testing procedures and provides worked examples that BS 7671 itself does not include.',
  },
  {
    question: 'Are Brian Scaddan books good for apprentices?',
    answer:
      'Yes. Brian Scaddan is the most widely recommended author for apprentice electricians in the UK. His books are written in clear, accessible language and cover the same material as BS 7671 and the IET Guidance Notes, but in a way that is easier to understand for students. Key titles include "Electrical Installation Work" (the comprehensive textbook used on most college courses), "IET Wiring Regulations: Explained and Illustrated" (a companion to BS 7671), and "17th Edition IET Wiring Regulations: Design and Verification of Electrical Installations" (covers design and verification). Note that some of his titles have not been updated for the 18th Edition — check the publication date and ensure you are buying the most recent version.',
  },
  {
    question: 'What books do I need for the 2391 exam?',
    answer:
      'For the City and Guilds 2391-52 (Initial Verification and Periodic Inspection and Testing), you need: BS 7671:2018+A2:2022 (the full regulation book), the On-Site Guide (OSG), Guidance Note 3 (GN3), and the IET model forms for EIC, EICR, and Minor Works Certificate. Many candidates also use a study guide such as "Inspection and Testing" by Chris Kitcher or "The City & Guilds 2391 Exam Guide" (check for 18th Edition versions). You are permitted to take BS 7671, the OSG, and GN3 into the exam, so ensure your copies are well-tabbed and you know where to find key tables quickly. Practice completing certificates and schedules of test results by hand — speed and accuracy under exam conditions are crucial.',
  },
  {
    question: 'Is Guidance Note 8 worth buying?',
    answer:
      'Guidance Note 8 covers earthing and bonding — a critical topic for all electricians but particularly for those working on older installations where earthing arrangements may be inadequate or non-standard. If you do a lot of EICR work, consumer unit changes, or new installation work, GN8 is a valuable reference. It explains TN-S, TN-C-S, and TT earthing systems in detail, covers protective bonding requirements, and provides guidance on measuring earth electrode resistance. Other Guidance Notes worth considering are GN1 (Selection and Erection), GN5 (Protection Against Electric Shock), and GN7 (Special Locations).',
  },
  {
    question: 'Can Elec-Mate replace my electrical books?',
    answer:
      'Elec-Mate complements your books rather than replacing them. The app provides instant access to BS 7671 regulation references, Zs limits, cable selection data, correction factors, and 70 electrical calculators — all accessible on your phone while on site. The 8 Elec-AI agents can answer regulation questions and provide referenced guidance in real time. However, for deep study, exam preparation, and understanding the reasoning behind regulations, physical books remain valuable. The ideal setup is BS 7671 and GN3 at home for study and reference, with Elec-Mate on your phone for instant access on site.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete guide to BS 7671:2018+A4:2026 — structure, key regulations, and amendment changes.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/training/18th-edition-course',
    title: '18th Edition Course Guide',
    description:
      'Everything about the City and Guilds 2382 18th Edition course — content, cost, and preparation.',
    icon: GraduationCap,
    category: 'Course',
  },
  {
    href: '/training/city-guilds-2391',
    title: '2391 Inspection and Testing',
    description:
      'Guide to the City and Guilds 2391 qualification — what it covers, exam tips, and career benefits.',
    icon: ClipboardCheck,
    category: 'Course',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description: 'Complete guide to becoming an electrical apprentice in the UK.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/cpd-for-electricians',
    title: 'CPD for Electricians',
    description:
      'How to plan and record your continuing professional development as a UK electrician.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/am2-exam-tips',
    title: 'AM2 Exam Tips',
    description:
      'Practical tips and strategies for passing the AM2 practical assessment first time.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'books-overview',
    heading: 'Why Electrical Books Still Matter in 2026',
    content: (
      <>
        <p>
          In an age of apps, AI, and instant search, physical books remain essential for
          electricians. The{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            18th Edition wiring regulations
          </SEOInternalLink>{' '}
          are the legal foundation of your work. The IET Guidance Notes provide the practical
          interpretation you need to apply those regulations correctly. And the best training
          textbooks give apprentices and experienced electricians alike the deep understanding that
          no quick search can provide.
        </p>
        <p>
          This guide covers the essential books every UK electrician should own, from the BS 7671
          Brown Book to exam preparation texts. Whether you are a first-year apprentice building
          your bookshelf or an experienced electrician updating your library for the latest
          amendments, this is your reading list for 2026.
        </p>
        <h3 className="font-bold text-white text-lg mt-6 mb-3">The core four at a glance</h3>
        <div className="overflow-hidden rounded-2xl border border-white/10 my-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/[0.06] text-left">
                <th className="px-4 py-3 font-bold text-white">Book</th>
                <th className="px-4 py-3 font-bold text-white">Who needs it</th>
                <th className="px-4 py-3 font-bold text-white">Indicative price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10 bg-yellow-500/[0.06]">
                <td className="px-4 py-3 font-bold text-white">BS 7671 (Brown Book)</td>
                <td className="px-4 py-3 text-white">Every electrician</td>
                <td className="px-4 py-3 font-bold text-yellow-400">£90 — £100</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="px-4 py-3 font-bold text-white">On-Site Guide (OSG)</td>
                <td className="px-4 py-3 text-white">Every electrician — daily use</td>
                <td className="px-4 py-3 font-bold text-yellow-400">£30 — £35</td>
              </tr>
              <tr className="border-t border-white/10 bg-yellow-500/[0.06]">
                <td className="px-4 py-3 font-bold text-white">Guidance Note 3 (GN3)</td>
                <td className="px-4 py-3 text-white">Inspectors, 2391 students</td>
                <td className="px-4 py-3 font-bold text-yellow-400">£35 — £40</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="px-4 py-3 font-bold text-white">Electrician's Guide to the Building Regs</td>
                <td className="px-4 py-3 text-white">Domestic electricians (Part P)</td>
                <td className="px-4 py-3 font-bold text-yellow-400">£30 — £35</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-white/60 text-xs -mt-2">
          Prices are indicative market guidance, not a quote — check the IET and trade suppliers for
          current pricing.
        </p>
      </>
    ),
  },
  {
    id: 'bs7671-brown-book',
    heading: 'BS 7671:2018+A2:2022 — The Brown Book',
    content: (
      <>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <div className="flex items-start gap-4">
            <Book className="w-8 h-8 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-bold text-white text-xl mb-2">
                Requirements for Electrical Installations
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-white mb-1">Publisher</div>
                  <div className="text-base font-bold text-white">IET / BSI</div>
                </div>
                <div>
                  <div className="text-sm text-white mb-1">Price</div>
                  <div className="text-base font-bold text-yellow-400">£90 — £100</div>
                </div>
                <div>
                  <div className="text-sm text-white mb-1">Edition</div>
                  <div className="text-base font-bold text-white">18th (2018+A2:2022)</div>
                </div>
                <div>
                  <div className="text-sm text-white mb-1">Essential For</div>
                  <div className="text-base font-bold text-white">Every electrician</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p>
          BS 7671 — universally known as "the Brown Book" due to its cover colour — is the
          definitive reference for electrical installation in the UK. It contains every regulation,
          every table, and every appendix that governs how electrical work must be designed,
          installed, inspected, and tested.
        </p>
        <p>
          Every electrician must own the current edition. It is referenced on every{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>, every EIC, and
          every Minor Works Certificate. It is required for{' '}
          <SEOInternalLink href="/training/18th-edition-course">
            the 18th Edition course
          </SEOInternalLink>{' '}
          and the <SEOInternalLink href="/training/city-guilds-2391">2391 exam</SEOInternalLink>. When a
          competent person scheme auditor visits, BS 7671 should be on your shelf.
        </p>
        <p>
          The current printed edition is BS 7671:2018+A2:2022 (incorporating Amendments 1 and 2).
          Amendment 4 (A4:2026) is a free PDF supplement available from the IET website — download
          it and keep it with your Brown Book. Among the A4:2026 changes, Regulation 530.3.201
          requires the selection and erection of protective equipment to take account of whether a
          device is unidirectional or bidirectional — relevant to installations with solar PV,
          battery storage, and other sources that can export energy.
        </p>
      </>
    ),
  },
  {
    id: 'on-site-guide',
    heading: 'The On-Site Guide (OSG)',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="flex items-start gap-4">
            <Book className="w-8 h-8 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-bold text-white text-xl mb-2">IET On-Site Guide</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-white mb-1">Publisher</div>
                  <div className="text-base font-bold text-white">IET</div>
                </div>
                <div>
                  <div className="text-sm text-white mb-1">Price</div>
                  <div className="text-base font-bold text-yellow-400">£30 — £35</div>
                </div>
                <div>
                  <div className="text-sm text-white mb-1">Edition</div>
                  <div className="text-base font-bold text-white">18th Edition aligned</div>
                </div>
                <div>
                  <div className="text-sm text-white mb-1">Essential For</div>
                  <div className="text-base font-bold text-white">Every electrician</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p>
          The On-Site Guide is the practical companion to BS 7671. Where the Brown Book gives you
          the regulations, the OSG gives you the quick-reference tables and simplified guidance you
          need day-to-day on site. It distils the data you reach for most often into a tool-bag-sized
          book:
        </p>
        <div className="grid sm:grid-cols-2 gap-3 my-4">
          {[
            {
              label: 'Cable current-carrying capacity',
              detail:
                'Installation-method tables for tabulated current (It) — the starting point for every cable-sizing calculation.',
            },
            {
              label: 'Maximum Zs values',
              detail:
                'Earth fault loop impedance limits by protective device type and rating, so disconnection times are met.',
            },
            {
              label: 'Correction factors',
              detail:
                'Grouping, ambient temperature, and thermal insulation factors applied when de-rating a cable.',
            },
            {
              label: 'Disconnection times',
              detail:
                'Maximum disconnection times from BS 7671 Table 41.1 for automatic disconnection of supply.',
            },
            {
              label: 'Standard final circuits',
              detail:
                'Simplified guidance and example circuits for common domestic ring and radial arrangements.',
            },
            {
              label: 'Bonding & earthing sizes',
              detail:
                'Minimum sizes for main protective bonding and circuit protective conductors.',
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-4"
            >
              <div className="flex items-start gap-3">
                <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">{item.label}</h4>
                  <p className="text-white text-sm leading-relaxed">{item.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p>
          One table candidates lean on most is the maximum disconnection times for automatic
          disconnection of supply. These are set by BS 7671 Regulation 411.3.2.2 and Table 41.1 for
          final circuits up to 63 A with socket-outlets (or 32 A supplying fixed equipment), at a
          nominal line-to-earth voltage of 230 V AC:
        </p>
        <div className="overflow-hidden rounded-2xl border border-white/10 my-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/[0.06] text-left">
                <th className="px-4 py-3 font-bold text-white">Circuit / system</th>
                <th className="px-4 py-3 font-bold text-white">Max disconnection time</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10 bg-blue-900/20">
                <td className="px-4 py-3 text-white">Final circuit, TN system (230 V AC)</td>
                <td className="px-4 py-3 font-bold text-yellow-400">0.4 s</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="px-4 py-3 text-white">Final circuit, TT system (230 V AC)</td>
                <td className="px-4 py-3 font-bold text-yellow-400">0.2 s</td>
              </tr>
              <tr className="border-t border-white/10 bg-blue-900/20">
                <td className="px-4 py-3 text-white">
                  Distribution circuit, TN system
                </td>
                <td className="px-4 py-3 font-bold text-yellow-400">5 s</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="px-4 py-3 text-white">
                  Distribution circuit, TT system
                </td>
                <td className="px-4 py-3 font-bold text-yellow-400">1 s</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-white/60 text-xs -mt-2 mb-4">
          Final-circuit values from BS 7671:2018 Table 41.1; distribution-circuit values from
          Regulations 411.3.2.3 (TN) and 411.3.2.4 (TT). Indicative summary — always confirm against
          the current standard for the exact system and voltage.
        </p>
        <p>
          The OSG is small enough to carry in your tool bag or van and is the book most electricians
          reach for most often. It is also permitted in the{' '}
          <SEOInternalLink href="/training/city-guilds-2391">2391 exam</SEOInternalLink> alongside BS 7671 and
          GN3 — tab the key tables in advance so you can find them quickly under exam conditions.
        </p>
        <SEOAppBridge
          title="OSG tables on your phone with Elec-Mate"
          description="All the cable sizing tables, Zs limits, correction factors, and disconnection times from the OSG are built into Elec-Mate's 70+ calculators."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'guidance-note-3',
    heading: 'Guidance Note 3: Inspection and Testing (GN3)',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="flex items-start gap-4">
            <Book className="w-8 h-8 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-bold text-white text-xl mb-2">
                IET Guidance Note 3: Inspection and Testing
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-white mb-1">Publisher</div>
                  <div className="text-base font-bold text-white">IET</div>
                </div>
                <div>
                  <div className="text-sm text-white mb-1">Price</div>
                  <div className="text-base font-bold text-yellow-400">£35 — £40</div>
                </div>
                <div>
                  <div className="text-sm text-white mb-1">Edition</div>
                  <div className="text-base font-bold text-white">9th (18th Edition)</div>
                </div>
                <div>
                  <div className="text-sm text-white mb-1">Essential For</div>
                  <div className="text-base font-bold text-white">Inspectors, 2391 students</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p>
          Guidance Note 3 is the single most important reference for anyone carrying out inspection
          and testing. It covers the correct{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">sequence of tests</SEOInternalLink>
          , how to interpret test results, how to complete certificates and schedules of test
          results, and how to assign{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            observation codes
          </SEOInternalLink>{' '}
          (C1, C2, C3, FI).
        </p>
        <p>
          GN3 is essential reading for the{' '}
          <SEOInternalLink href="/training/city-guilds-2391">2391 qualification</SEOInternalLink> and is
          permitted in the exam. It provides worked examples of test procedures, guidance on
          interpreting marginal results, and advice on the professional judgement required when
          assigning observation codes. Even experienced inspectors refer to GN3 when they encounter
          unusual installations or borderline test results.
        </p>
        <p>
          The current edition is the 9th Edition, aligned with the 18th Edition of BS 7671. It was
          updated to reflect the changes in Amendment 2.
        </p>
      </>
    ),
  },
  {
    id: 'electricians-guide',
    heading: "Electrician's Guide to the Building Regulations",
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="flex items-start gap-4">
            <Book className="w-8 h-8 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-bold text-white text-xl mb-2">
                Electrician's Guide to the Building Regulations
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-white mb-1">Publisher</div>
                  <div className="text-base font-bold text-white">IET</div>
                </div>
                <div>
                  <div className="text-sm text-white mb-1">Price</div>
                  <div className="text-base font-bold text-yellow-400">£30 — £35</div>
                </div>
                <div>
                  <div className="text-sm text-white mb-1">Edition</div>
                  <div className="text-base font-bold text-white">6th Edition</div>
                </div>
                <div>
                  <div className="text-sm text-white mb-1">Essential For</div>
                  <div className="text-base font-bold text-white">Domestic electricians</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p>
          This IET publication bridges the gap between BS 7671 and the Building Regulations —
          specifically{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>{' '}
          (Electrical Safety in Dwellings). It explains which domestic electrical work is
          notifiable, which work can be done without notification, and how competent person schemes
          operate.
        </p>
        <p>
          For domestic electricians, this book is as important as BS 7671 itself. It covers the
          practical application of the regulations to real-world domestic situations — consumer unit
          changes, kitchen rewires, bathroom circuits, garden lighting, and outbuilding supplies. It
          also includes guidance on certificates and notification requirements.
        </p>
      </>
    ),
  },
  {
    id: 'brian-scaddan',
    heading: 'Brian Scaddan: The Apprentice Electrician Bible',
    content: (
      <>
        <p>
          Brian Scaddan is the most widely read author in UK electrical training. His books are used
          on college courses across the country and are recommended by training providers, tutors,
          and experienced electricians alike.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Electrical Installation Work (9th Edition)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  The comprehensive textbook used on most Level 2 and Level 3 college courses.
                  Covers science principles, installation methods, inspection and testing, fault
                  diagnosis, and the 18th Edition regulations. Written in clear, accessible language
                  with worked examples and practice questions. Price: £35 to £45.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  IET Wiring Regulations: Explained and Illustrated
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  A companion to BS 7671 that explains the regulations in plain English with
                  diagrams and illustrations. Excellent for understanding the reasoning behind the
                  regulations rather than just memorising them. Price: £25 to £35.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Design and Verification of Electrical Installations
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Covers the design process — selecting cables, protective devices, and earthing
                  arrangements to meet BS 7671 requirements. Includes worked examples of cable
                  sizing calculations, Zs verification, and circuit design. Essential for Level 3
                  students and the 2391 qualification. Price: £25 to £35.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          When buying Brian Scaddan books, always check the publication date. Some titles have been
          updated for the 18th Edition; older editions covering the 17th Edition are still available
          and should be avoided unless you need them for reference.
        </p>
      </>
    ),
  },
  {
    id: 'exam-preparation',
    heading: 'Exam Preparation Books',
    content: (
      <>
        <p>
          Whether you are preparing for the{' '}
          <SEOInternalLink href="/training/18th-edition-course">
            18th Edition course (2382)
          </SEOInternalLink>
          , the{' '}
          <SEOInternalLink href="/training/city-guilds-2391">
            2391 inspection and testing exam
          </SEOInternalLink>
          , or the{' '}
          <SEOInternalLink href="/guides/am2-exam-tips">AM2 practical assessment</SEOInternalLink>,
          targeted exam preparation books can make the difference between passing and failing.
        </p>
        <div className="space-y-4 my-4">
          {[
            {
              title: '18th Edition Exam Guide (2382)',
              description:
                'Practice questions and mock exams for the City and Guilds 2382-22 (18th Edition) course. The exam is open-book — you can take BS 7671 and the OSG.',
            },
            {
              title: '2391 Inspection and Testing Exam Guide',
              description:
                'Covers both the written exam and the practical assessment. Includes practice questions, worked examples of certificate completion…',
            },
            {
              title: 'AM2 Practical Assessment Guide',
              description:
                'The AM2 is a practical assessment, so the best preparation is hands-on practice. However, guides that explain the marking criteria, common mistakes…',
            },
            {
              title: 'Level 2 and Level 3 Study Guides',
              description:
                'Various publishers produce study guides aligned with the City and Guilds 5357 and EAL qualifications.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-5"
            >
              <div className="flex items-start gap-3">
                <Bookmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-white text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <SEOAppBridge
          title="Study courses and exam prep built into Elec-Mate"
          description="Level 2, Level 3, AM2, and EPA preparation courses with interactive modules, practice questions, and AI-powered tutoring."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'additional-reads',
    heading: 'Additional Recommended Reads',
    content: (
      <>
        <p>
          Beyond the core texts, these additional publications are worth investing in as your career
          develops and you take on more specialised work — for example, the IET Code of Practice for{' '}
          <SEOInternalLink href="/guides/ev-charger-installation">
            EV charging equipment installation
          </SEOInternalLink>{' '}
          complements the Section 722 requirements in BS 7671:
        </p>
        <div className="space-y-4 my-4">
          {[
            {
              title: 'IET Code of Practice for EV Charging Equipment Installation',
              description:
                'Essential for electricians installing EV chargers. Covers cable sizing, earthing, protection, and the specific requirements of Section 722 of BS 7671.',
            },
            {
              title: 'Guidance Note 7: Special Locations',
              description:
                'Covers the requirements for bathrooms, swimming pools, saunas, construction sites, marinas, caravan parks…',
            },
            {
              title: 'Guidance Note 8: Earthing and Bonding',
              description:
                'In-depth guidance on TN-S, TN-C-S, and TT earthing systems, protective bonding, and earth electrode testing.',
            },
            {
              title: 'IET Code of Practice for In-Service Inspection and Testing',
              description:
                'The definitive reference for PAT testing in the UK. Covers appliance classification, test procedures, pass/fail criteria, and recording requirements.',
            },
            {
              title: "Electrician's Guide to Emergency Lighting",
              description:
                'Covers BS 5266 emergency lighting design, installation, testing, and certification. Increasingly important as fire safety regulations tighten following…',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-5"
            >
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-white text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p>
          Building a quality bookshelf takes time and money. Start with the essentials (BS 7671,
          OSG, GN3) and add specialist titles as your career develops. Complement your books with
          Elec-Mate for on-site access to regulation references, calculators, and AI-powered
          guidance.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BestElectricalBooksPage() {
  return (
    <GuideTemplate
      title="Best Electrical Books 2026 | Top Reads for Electricians"
      description="The best electrical books for UK electricians in 2026. BS 7671 Brown Book, On-Site Guide, Guidance Note 3, Brian Scaddan textbooks…"
      datePublished="2025-11-01"
      dateModified="2026-06-10"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Training Guide"
      badgeIcon={Book}
      heroTitle={
        <>
          Best Electrical Books 2026:{' '}
          <span className="text-yellow-400">Top Reads for Electricians</span>
        </>
      }
      heroSubtitle="From the BS 7671 Brown Book to Brian Scaddan's apprentice textbooks, these are the essential reads for UK electricians in 2026. Whether you are a first-year apprentice or an experienced inspector, this guide covers every book worth buying — and how Elec-Mate complements your bookshelf on site."
      readingTime={13}
      answerBox={{
        question: 'What are the best electrical books for UK electricians?',
        answer:
          'The four essentials are BS 7671:2018+A2:2022 (the Brown Book), the IET On-Site Guide, IET Guidance Note 3 (Inspection and Testing), and a Brian Scaddan training textbook. Domestic installers should add the Electrician’s Guide to the Building Regulations for Part P. Keep the free A4:2026 amendment PDF with your Brown Book.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Books"
      relatedPages={relatedPages}
      ctaHeading="Your bookshelf on your phone"
      ctaSubheading="BS 7671 regulation references, Zs limits, cable sizing tables, and 70+ calculators — all accessible on site without carrying books. 7-day free trial, cancel anytime."
    />
  );
}
