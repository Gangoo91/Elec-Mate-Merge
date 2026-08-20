import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { Award, BookOpen, GraduationCap, FileCheck2, Target, Users } from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

/** Edge-to-edge on phones, inset and rounded from sm: up. */
const panelCn =
  '-mx-4 my-6 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6';

const breadcrumbs = [
  { label: 'Career', href: '/guides/how-to-become-an-electrician' },
  { label: 'ECS Card Types', href: '/guides/ecs-card-types' },
];

const tocItems = [
  { id: 'what-are-ecs-cards', label: 'What Are ECS Cards?' },
  { id: 'card-types', label: 'ECS Card Types Explained' },
  { id: 'which-card', label: 'Which Card Do You Need?' },
  { id: 'how-to-apply', label: 'How to Apply' },
  { id: 'renewal', label: 'Renewal Process' },
  { id: 'cscs-link', label: 'ECS and CSCS' },
  { id: 'career-progression', label: 'Career Progression Through Cards' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The ECS (Electrotechnical Certification Scheme) card is the industry-recognised identity and competence card for electricians and electrical workers in the UK. It carries the CSCS logo, so it is accepted on CSCS-controlled sites.',
  'There is a card for each career stage — Apprentice, Provisional, Installation Electrician (the gold card), Technician, Manager and a range of specialist occupations — and each has its own qualification requirements.',
  'The gold Installation Electrician card is built on an NVQ Level 3, the AM2 practical assessment, C&G 2382 (BS 7671) and C&G 2391 (inspection and testing). BS 7671 Reg 651.5 requires periodic inspection and testing to be carried out by one or more skilled persons competent in such work, and Reg 641.6 says the same for initial verification — the 2391 is how you evidence that competence.',
  'ECS cards are time-limited and require evidence of ongoing CPD at renewal. Your BS 7671 qualification must be to the edition in force: the current edition is BS 7671:2018+A4:2026, issued 15 April 2026, and the previous edition (A3:2024) is withdrawn on 15 October 2026.',
  'A4:2026 introduced a new Chapter 57 (stationary secondary batteries), a new Section 716 (Power over Ethernet) and a new Chapter 81 (energy efficiency); it revised the Appendix 4 reference methods for buried cables and deleted Appendix 17.',
  'IET Guidance Note 3 (9th Edition) is the companion guidance to BS 7671 Part 6. It states that the person responsible for inspection and testing shall be prepared to formally demonstrate competence, and that a recognised inspection and testing qualification held alongside a current Level 3 BS 7671 certificate is an acceptable way to do so.',
  'Elec-Mate helps you prepare for every qualification you need for your ECS card — 46+ training courses, flashcards, mock exams, and the AM2 simulator.',
];

const faqs = [
  {
    question: 'What is the difference between an ECS card and a CSCS card?',
    answer:
      'The ECS (Electrotechnical Certification Scheme) card is the specific card for the electrical sector, operated by the JIB (Joint Industry Board). The CSCS (Construction Skills Certification Scheme) is the broader construction industry card. ECS cards are recognised as equivalent to CSCS cards — if you hold an ECS card, you do not need a separate CSCS card to access construction sites. Your ECS card has the CSCS logo on it to confirm this. The key difference is that the ECS scheme is tailored to electrotechnical occupations and recognises electrical qualifications specifically, whereas the CSCS scheme covers all construction trades. For electricians, the ECS card is the correct card to hold. Other trades (plumbers, bricklayers, carpenters) hold CSCS cards relevant to their own sector schemes.',
  },
  {
    question: 'How long does it take to get an ECS card?',
    answer:
      "Once you submit your application with all required evidence (qualifications, photo, health and safety test result), processing typically takes 2 to 4 weeks. The card is posted to your home address. If your application is straightforward and all documents are in order, it can be quicker. Delays usually occur when qualification evidence is missing or when the JIB needs to verify qualifications with the awarding body. You can apply online through the JIB/ECS website, which is faster than paper applications. If you need a card urgently for site access, some employers can arrange a temporary visitor pass while your ECS card is being processed, but this is at the site contractor's discretion.",
  },
  {
    question: 'Do I need an ECS card to work as an electrician?',
    answer:
      'Legally, there is no law that requires you to hold an ECS card to carry out electrical work. However, in practice, an ECS card is essential. Almost all commercial and industrial construction sites require workers to hold a valid ECS or CSCS card for site access — it is a standard condition in contracts and site rules. Many domestic electrical employers also expect their electricians to hold the card. Registration with a competent person scheme (such as NICEIC or NAPIT) does not require an ECS card, but the qualifications needed for scheme registration (C&G 2382, C&G 2391, NVQ Level 3) are the same qualifications that qualify you for the ECS card. In summary: you can technically work without one, but you will find it very difficult to access sites, gain employment with reputable companies, or demonstrate your credentials to customers.',
  },
  {
    question: 'What qualifications do I need for the gold ECS card?',
    answer:
      'The gold Installation Electrician card (the most widely held ECS card for qualified electricians) requires: (1) An NVQ Level 3 in Electrotechnical Services (or the older NVQ Level 3 in Installing Electrotechnical Systems and Equipment). (2) The AM2 (or AM2S) practical assessment — a hands-on assessment of your installation and testing skills, typically taken at a JIB-approved assessment centre. (3) C&G 2382 (18th Edition IET Wiring Regulations) or equivalent. (4) C&G 2391 or equivalent inspection and testing qualification. (5) A current Health, Safety and Environment (HS&E) test pass from the CSCS/JIB testing system. Some of these requirements may be embedded within your NVQ — check with the JIB. The AM2 is often the final hurdle, as it is a practical assessment that must be taken at a specialist centre.',
  },
  {
    question: 'Can I upgrade my ECS card?',
    answer:
      'Yes, you can upgrade your ECS card as you gain additional qualifications. For example, if you currently hold a Provisional card and then complete your NVQ Level 3 and pass the AM2, you can apply for the gold Installation Electrician card. If you hold the Installation Electrician card and later gain an HNC/HND or degree in electrical engineering, you can upgrade to the Technician card. The process is straightforward: submit a new application through the JIB/ECS website with evidence of your additional qualifications. You will receive a new card reflecting your upgraded status. Your old card should be returned or destroyed. There is an application fee for each new card.',
  },
  {
    question: 'How much does an ECS card cost?',
    answer:
      'The ECS card application fee is typically £36 to £40 for a standard card, valid for 3 to 5 years depending on the card type. Renewal costs a similar amount. You will also need to pay for the HS&E test (approximately £21) if you have not already passed it. These costs are separate from the costs of obtaining the qualifications themselves (NVQ, AM2, 18th Edition, 2391). Some employers will cover the ECS card application fee as part of your employment or apprenticeship. Check with your employer or training provider. The JIB/ECS website has the most up-to-date fee schedule.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/how-to-become-an-electrician',
    title: 'How to Become an Electrician',
    description:
      'Complete pathway from school leaver to qualified electrician, including all qualifications needed.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/guides/nvq-level-3-electrical',
    title: 'NVQ Level 3 Electrical',
    description: 'What is involved in the NVQ Level 3 and how to build your portfolio of evidence.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/am2-exam-tips',
    title: 'AM2 Exam Tips',
    description:
      'Preparation guide for the AM2 practical assessment — the final step to the gold card.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/guides/18th-edition-exam-tips',
    title: '18th Edition Exam Tips',
    description:
      'How to pass the C&G 2382 exam — format, regulations, book tabs, and time management.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-qualifications-pathway',
    title: 'Electrical Qualifications Pathway',
    description: 'The full map of electrical qualifications from Level 2 to Level 4 and beyond.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/cpd-for-electricians',
    title: 'CPD for Electricians',
    description: 'How to meet the CPD requirements for ECS card renewal and scheme registration.',
    icon: Award,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-are-ecs-cards',
    heading: 'What Are ECS Cards and Why Do They Matter?',
    content: (
      <>
        <p>
          The Electrotechnical Certification Scheme (ECS) is the industry card scheme for
          electricians and electrical workers in the UK. Managed by the JIB (Joint Industry Board),
          the ECS card is your proof of qualifications, competence, and identity on site. It is the
          electrical trade's equivalent of a passport — without it, you cannot access most
          commercial and industrial construction sites.
        </p>
        <p>
          The ECS card carries the CSCS logo, which means it is recognised across the entire
          construction industry — not just by electrical contractors. Main contractors, site
          managers, and health and safety officers all recognise the ECS card as valid proof that
          you are qualified to carry out electrotechnical work.
        </p>
        <p>
          There are several types of ECS card, each corresponding to a different level of
          qualification and experience. The card you hold tells employers and clients exactly what
          level of work you are qualified to carry out. As you gain qualifications and experience,
          you can upgrade your card to reflect your progression through the trade.
        </p>
      </>
    ),
  },
  {
    id: 'card-types',
    heading: 'ECS Card Types Explained',
    content: (
      <>
        <p>
          These are the four cards that cover almost every electrician. Scroll the table sideways on
          a phone to see the full row.
        </p>
        <div className="-mx-4 my-6 overflow-x-auto border-y border-white/10 sm:mx-0 sm:rounded-2xl sm:border-x">
          <table className="w-full min-w-[720px] text-sm text-white border-collapse">
            <thead>
              <tr className="bg-white/[0.07] text-left">
                <th className="px-4 py-3 font-semibold border-b border-white/10">Card type</th>
                <th className="px-4 py-3 font-semibold border-b border-white/10">Colour</th>
                <th className="px-4 py-3 font-semibold border-b border-white/10">
                  Key qualifications required
                </th>
                <th className="px-4 py-3 font-semibold border-b border-white/10">Validity</th>
                <th className="px-4 py-3 font-semibold border-b border-white/10">Who it is for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              <tr className="bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <td className="px-4 py-3 font-medium">Apprentice</td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-0.5 rounded bg-red-500/20 text-red-300 text-xs font-semibold">
                    Red
                  </span>
                </td>
                <td className="px-4 py-3">
                  Enrolled on a recognised apprenticeship; current HS&E test
                </td>
                <td className="px-4 py-3 whitespace-nowrap">Duration of apprenticeship</td>
                <td className="px-4 py-3">Registered apprentices working under supervision</td>
              </tr>
              <tr className="hover:bg-white/[0.04] transition-colors">
                <td className="px-4 py-3 font-medium">Provisional</td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-xs font-semibold">
                    Blue
                  </span>
                </td>
                <td className="px-4 py-3">
                  Academic qualifications complete (e.g. Diploma); NVQ / AM2 not yet achieved
                </td>
                <td className="px-4 py-3 whitespace-nowrap">Up to 3 years</td>
                <td className="px-4 py-3">Trainees building NVQ portfolio before AM2</td>
              </tr>
              <tr className="bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <td className="px-4 py-3 font-medium">Installation Electrician</td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 text-xs font-semibold">
                    Gold
                  </span>
                </td>
                <td className="px-4 py-3">
                  NVQ Level 3, AM2 pass, C&G 2382 (BS 7671), C&G 2391, HS&E test
                </td>
                <td className="px-4 py-3 whitespace-nowrap">5 years</td>
                <td className="px-4 py-3">Fully qualified electricians working independently</td>
              </tr>
              <tr className="hover:bg-white/[0.04] transition-colors">
                <td className="px-4 py-3 font-medium">Technician</td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-xs font-semibold">
                    Black
                  </span>
                </td>
                <td className="px-4 py-3">
                  All gold-card requirements plus HNC/HND or foundation degree
                </td>
                <td className="px-4 py-3 whitespace-nowrap">5 years</td>
                <td className="px-4 py-3">Engineers, designers, and senior technical staff</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={panelCn}>
          <div className="space-y-6">
            <div>
              <h3 className="text-[15px] font-semibold tracking-tight text-white">
                Apprentice card (red)
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white">
                For registered{' '}
                <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
                  electrical apprentices
                </SEOInternalLink>{' '}
                working towards their qualifications. Requires enrolment on a recognised
                apprenticeship programme and a current HS&E test pass. Valid for the duration of the
                apprenticeship (typically 3 to 4 years). It gives site access to apprentices working
                under supervision.
              </p>
            </div>
            <div className="border-t border-white/[0.1] pt-5">
              <h3 className="text-[15px] font-semibold tracking-tight text-white">
                Provisional card (blue)
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white">
                For people who have finished their academic qualifications — such as the Diploma in
                Electrical Installation — but have not yet completed the NVQ Level 3 or passed the
                AM2. It recognises that you hold the theoretical knowledge while you are still
                building the practical evidence for your NVQ portfolio. Valid for up to 3 years,
                during which you should be working towards the NVQ and AM2.
              </p>
            </div>
            <div className="border-t border-white/[0.1] pt-5">
              <h3 className="text-[15px] font-semibold tracking-tight text-white">
                Installation Electrician card (gold)
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white">
                The standard card for fully qualified Installation Electricians, and the one most
                electricians are working towards. Requires an NVQ Level 3, an AM2 pass,{' '}
                <SEOInternalLink href="/guides/18th-edition-exam-tips">
                  C&G 2382 (BS 7671 Wiring Regulations)
                </SEOInternalLink>
                ,{' '}
                <SEOInternalLink href="/guides/2391-exam-tips">
                  C&G 2391 (inspection and testing)
                </SEOInternalLink>{' '}
                and a current HS&E test pass. Valid for 5 years.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white">
                The 2391 requirement is grounded in BS 7671 itself. Reg 641.6 requires initial
                verification to be made by one or more skilled persons competent in such work, and
                Reg 651.5 places the same duty on periodic inspection and testing. IET Guidance Note
                3 goes further, stating that the person responsible shall be prepared to formally
                demonstrate competence — and that a recognised inspection and testing qualification
                held with a current Level 3 BS 7671 certificate is an acceptable way to do it.
              </p>
            </div>
            <div className="border-t border-white/[0.1] pt-5">
              <h3 className="text-[15px] font-semibold tracking-tight text-white">
                Technician card (black)
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white">
                For electricians holding higher-level qualifications on top of the standard
                Installation Electrician requirements — typically an HNC/HND or foundation degree in
                electrical or electronic engineering. It recognises a higher level of technical
                knowledge and is often held by engineers, designers and senior technical staff.
              </p>
            </div>
            <div className="border-t border-white/[0.1] pt-5">
              <h3 className="text-[15px] font-semibold tracking-tight text-white">
                Manager and specialist cards
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white">
                Beyond the four cards above, the ECS scheme issues a Manager card for people in
                electrotechnical management roles, plus cards for Maintenance Electricians,
                Electrical Improvers, Highway Electrical operatives, Fire and Security engineers,
                Data and Communications engineers, and Building Management Systems (BMS) engineers.
                Each has its own qualification requirements — check the JIB/ECS website for the
                current list and criteria before you apply.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'which-card',
    heading: 'Which ECS Card Do You Need?',
    content: (
      <>
        <p>
          Find the line that describes you. The card you need depends on where you are in your
          career and which qualifications you already hold.
        </p>
        <div className="-mx-4 my-6 overflow-x-auto border-y border-white/10 sm:mx-0 sm:rounded-2xl sm:border-x">
          <table className="w-full min-w-[520px] border-collapse text-sm text-white">
            <thead>
              <tr className="bg-white/[0.07] text-left">
                <th className="border-b border-white/10 px-4 py-3 font-semibold">
                  Where you are now
                </th>
                <th className="border-b border-white/10 px-4 py-3 font-semibold">
                  Card to apply for
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              <tr className="bg-white/[0.02]">
                <td className="px-4 py-3">
                  Starting an apprenticeship — your employer or training provider normally arranges
                  this as part of your registration
                </td>
                <td className="px-4 py-3 font-medium">Apprentice (red)</td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  Academic qualifications finished, NVQ Level 3 or AM2 still outstanding
                </td>
                <td className="px-4 py-3 font-medium">Provisional (blue)</td>
              </tr>
              <tr className="bg-white/[0.02]">
                <td className="px-4 py-3">
                  Fully qualified — NVQ Level 3, AM2, C&G 2382 and C&G 2391 all held
                </td>
                <td className="px-4 py-3 font-medium">Installation Electrician (gold)</td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  HNC/HND or a degree on top of your installation qualifications
                </td>
                <td className="px-4 py-3 font-medium">Technician (black)</td>
              </tr>
              <tr className="bg-white/[0.02]">
                <td className="px-4 py-3">
                  Years of experience but no formal NVQ — ask the JIB about the Experienced Worker
                  assessment route rather than going back to college
                </td>
                <td className="px-4 py-3 font-medium">Experienced Worker route</td>
              </tr>
            </tbody>
          </table>
        </div>
        <SEOAppBridge
          title="Prepare for every qualification with Elec-Mate"
          description="Whether you are studying for the 18th Edition, 2391, NVQ, or preparing for the AM2, Elec-Mate has you covered."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'how-to-apply',
    heading: 'How to Apply for Your ECS Card',
    content: (
      <>
        <p>
          Applying for an ECS card is done through the JIB/ECS website. The process is
          straightforward:
        </p>
        <div className={panelCn}>
          <ol className="list-inside list-decimal space-y-4 text-white">
            <li>
              <strong>Pass the HS&E test.</strong> Before you can apply for any ECS card, you must
              pass the Health, Safety and Environment test. This is a computer-based test taken at a
              Pearson VUE centre. It covers general health and safety knowledge relevant to
              construction sites. The test costs approximately £21 and is valid for 2 years.
            </li>
            <li>
              <strong>Gather your qualification evidence.</strong> You will need copies of your
              qualification certificates — the specific ones depend on which card you are applying
              for. For the gold Installation Electrician card: NVQ Level 3 certificate, AM2 pass
              certificate, C&G 2382 certificate, and C&G 2391 certificate.
            </li>
            <li>
              <strong>Create an account on the JIB/ECS website.</strong> Register and complete the
              online application form. Upload your qualification evidence and a passport-style
              photo.
            </li>
            <li>
              <strong>Pay the application fee.</strong> The fee is typically £36 to £40, payable
              online by card.
            </li>
            <li>
              <strong>Wait for processing.</strong> The JIB will verify your qualifications and
              process your application. This usually takes 2 to 4 weeks. Your card will be posted to
              your home address.
            </li>
          </ol>
        </div>
        <p>
          If you are an apprentice, your employer or training provider usually handles the
          application on your behalf. For all other card types, you apply directly.
        </p>
      </>
    ),
  },
  {
    id: 'renewal',
    heading: 'ECS Card Renewal: What You Need',
    content: (
      <>
        <p>
          ECS cards are not permanent — they must be renewed. The renewal process ensures that
          cardholders are keeping their knowledge and skills up to date.
        </p>
        <div className={panelCn}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>Validity period.</strong> Most ECS cards are valid for 5 years. Apprentice
              cards are valid for the duration of the apprenticeship. Provisional cards are
              typically valid for 3 years.
            </li>
            <li>
              <strong>CPD requirement.</strong> To renew, you must show that you have completed{' '}
              <SEOInternalLink href="/guides/cpd-for-electricians">
                Continuing Professional Development (CPD)
              </SEOInternalLink>{' '}
              during the card's validity period. The JIB requires evidence of relevant learning
              activities — courses, training, seminars or structured self-study.
            </li>
            <li>
              <strong>Current qualifications.</strong> Your BS 7671 qualification must be to the
              edition in force. The current edition is <strong>BS 7671:2018+A4:2026</strong>, issued
              on 15 April 2026; the previous edition (A2:2022 + Corrigendum + A3:2024) remains
              current but is withdrawn on 15 October 2026. If you qualified under an earlier
              edition, a{' '}
              <SEOInternalLink href="/guides/18th-edition-exam-tips">
                BS 7671 update course
              </SEOInternalLink>{' '}
              will bring you current before renewal.
            </li>
            <li>
              <strong>HS&E test.</strong> You may need a current HS&E test pass at renewal. The test
              is valid for 2 years, so you may need to retake it during your card's validity period.
            </li>
          </ul>
        </div>
        <h3 className="mb-3 mt-8 text-[15px] font-semibold tracking-tight text-white">
          What changed at A4:2026
        </h3>
        <p>
          Amendment 4:2026 is not a light touch. The changes most likely to come up on an update
          course, and in conversation on site, are:
        </p>
        <div className={panelCn}>
          <ul className="space-y-3 text-white">
            <li>
              <strong>New Chapter 57</strong> — requirements for stationary secondary battery
              installations used for storage and supply.
            </li>
            <li>
              <strong>New Section 716</strong> — Power over Ethernet: distributing ELV DC power over
              balanced information technology cabling.
            </li>
            <li>
              <strong>New Chapter 81</strong> — energy efficiency, replacing the deleted Appendix
              17.
            </li>
            <li>
              <strong>New Section 545</strong> — functional earthing and functional equipotential
              bonding for ICT equipment and systems.
            </li>
            <li>
              <strong>Appendix 4</strong> — the reference methods for buried cables now distinguish
              between a cable in direct contact with soil and one in a conduit or duct, with
              different current-carrying capacities for each.
            </li>
            <li>
              <strong>Reg 537.4.2</strong> — firefighter's switches are now required in locations
              specified by the fire engineer to support the building's fire strategy.
            </li>
          </ul>
        </div>
        <p>
          IET Guidance Note 3 (9th Edition) is the companion guidance to BS 7671 Part 6, Inspection
          and Testing. It is worth reading alongside the regulations at renewal time, because it is
          the document that spells out how an inspector is expected to evidence competence.
          Elec-Mate's{' '}
          <SEOInternalLink href="/guides/18th-edition-exam-tips">BS 7671 training</SEOInternalLink>{' '}
          and <SEOInternalLink href="/guides/cpd-for-electricians">CPD resources</SEOInternalLink>{' '}
          cover the core regulations and the A4:2026 updates.
        </p>
        <p>
          The JIB sends renewal reminders before your card expires. Do not let your card lapse —
          turning up to site with an expired card is the same as turning up with no card. Apply for
          renewal at least 4 to 6 weeks before the expiry date.
        </p>
      </>
    ),
  },
  {
    id: 'cscs-link',
    heading: 'ECS Cards and the CSCS Scheme',
    content: (
      <>
        <p>
          The ECS scheme is a partner scheme of the CSCS (Construction Skills Certification Scheme).
          This means your ECS card carries the CSCS logo and is recognised on all CSCS-controlled
          sites. You do not need a separate CSCS card if you hold a valid ECS card.
        </p>
        <p>
          When you arrive on site and the gateman asks for your CSCS card, your ECS card serves the
          same purpose. The colour tells the site manager your occupation and qualification level at
          a glance — red for an apprentice under supervision, blue for a provisional holder building
          practical experience, gold for a fully qualified Installation Electrician working
          independently, and black for a Technician. The table near the top of this guide sets out
          what sits behind each colour.
        </p>
        <p>
          The CSCS scheme periodically reviews its partner schemes to ensure standards are
          maintained. The ECS scheme has consistently met these standards, making it one of the most
          respected sector card schemes in UK construction.
        </p>
      </>
    ),
  },
  {
    id: 'career-progression',
    heading: 'Career Progression Through ECS Cards',
    content: (
      <>
        <p>
          Your ECS card tells a story of your career progression. Most electricians follow this
          path:
        </p>
        <div className={panelCn}>
          <ol className="list-inside list-decimal space-y-4 text-white">
            <li>
              <strong>Apprentice card (red)</strong> — start your apprenticeship, study{' '}
              <SEOInternalLink href="/level2-electrical">Level 2</SEOInternalLink> and{' '}
              <SEOInternalLink href="/guides/nvq-level-3-electrical">Level 3</SEOInternalLink> at
              college while gaining on-site experience.
            </li>
            <li>
              <strong>Provisional card (blue)</strong> — finish your college qualifications,
              continue building your NVQ portfolio and preparing for the AM2.
            </li>
            <li>
              <strong>Installation Electrician card (gold)</strong> — pass the AM2, complete the NVQ
              Level 3, and hold C&G 2382 and C&G 2391. You are now fully qualified.
            </li>
            <li>
              <strong>Technician card (black)</strong> — gain higher-level qualifications (HNC/HND
              or degree) while continuing to work in the trade. Optional but opens doors to
              engineering and design roles.
            </li>
          </ol>
        </div>
        <p>
          Each step up requires additional study and assessment. Elec-Mate supports every stage of
          this journey with tailored training courses, from{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
            apprentice-level content
          </SEOInternalLink>{' '}
          through to advanced inspection and testing preparation.
        </p>
        <SEOAppBridge
          title="Track your qualification progress with Elec-Mate"
          description="Elec-Mate's progress tracking shows you exactly where you are on the path to your gold card. Complete courses, flashcard sets…"
          icon={Award}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ECSCardTypesPage() {
  return (
    <GuideTemplate
      title="ECS Card Types: Which Card Do You Need?"
      description="Complete guide to ECS card types for electricians in the UK. Covers Apprentice, Provisional, Installation Electrician (gold), and Technician cards."
      datePublished="2025-05-10"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={Award}
      heroTitle={
        <>
          ECS Card Types: <span className="text-yellow-400">Which Card Do You Need?</span>
        </>
      }
      heroSubtitle="The ECS card is your proof of qualifications and your passport to UK construction sites. There are different cards for different career stages — Apprentice, Provisional, Installation Electrician (gold), and Technician. This guide explains each type, what qualifications you need, how to apply, and how to renew."
      readingTime={9}
      answerBox={{
        question: 'What are the different ECS card types?',
        answer:
          'There are four main ECS cards: Apprentice (red) while you are training, Provisional (blue) once your academic qualifications are done but the NVQ or AM2 is not, Installation Electrician (gold) for fully qualified electricians, and Technician (black) for HNC/HND or degree holders. A Manager card and a range of specialist cards sit alongside them. The gold card needs an NVQ Level 3, an AM2 pass, C&G 2382, C&G 2391 and a current health and safety test.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About ECS Cards"
      relatedPages={relatedPages}
      ctaHeading="Prepare for Your Gold Card with Elec-Mate"
      ctaSubheading="46+ training courses covering the 18th Edition, 2391, NVQ, and AM2. Flashcards, mock exams, AM2 simulator, and progress tracking. 7-day free trial, cancel anytime."
    />
  );
}
