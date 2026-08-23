import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  BookOpen,
  Calculator,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  Layers,
  Scale,
  ShieldCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Shared classes
// -------------------------------------------------------------------

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const plainCardCn =
  '-mx-4 rounded-none border-y border-white/10 bg-white/[0.04] p-4 ' +
  'sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const tableWrapCn =
  '-mx-4 mt-6 overflow-x-auto border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x';

const thCn = 'px-4 py-3 text-left text-[13px] font-semibold text-white whitespace-nowrap';
const tdCn = 'px-4 py-3 align-top text-sm text-white';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'BS 7671 18th Edition: A4:2026 Changes Explained';
const PAGE_DESCRIPTION =
  'BS 7671:2018+A4:2026 explained: the parts of the standard, what each amendment changed, and the A4:2026 additions — Chapter 57 batteries, Section 716 PoE.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'BS 7671 18th Edition', href: '/guides/bs-7671-18th-edition-guide' },
];

const tocItems = [
  { id: 'what-is-bs7671', label: 'What Is BS 7671?' },
  { id: 'seven-parts', label: 'The Parts of BS 7671' },
  { id: 'changes-from-17th', label: 'Changes from 17th Edition' },
  { id: 'amendment-2', label: 'Amendment 2 (2022)' },
  { id: 'amendment-4', label: 'Amendment 4 (2026)' },
  { id: 'daily-practice', label: 'BS 7671 in Daily Practice' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The current standard is BS 7671:2018+A4:2026. Amendment 4 was issued on 15 April 2026 and may be implemented immediately; the previous version (A2:2022 + Corrigendum May 2023 + A3:2024) is withdrawn on 15 October 2026.',
  'The 18th Edition has had four amendments: A1:2020 (February 2020, electronic), A2:2022 (March 2022, brown cover), A3:2024 (31 July 2024, electronic) and A4:2026 (April 2026, orange cover). The 31 July 2024 date belongs to Amendment 3, not Amendment 4.',
  'Amendment 4 adds a new Chapter 57 (stationary secondary batteries), a new Section 716 (Power over Ethernet), a new Section 545 (functional earthing for ICT), and a new Chapter 81 (energy efficiency, replacing the deleted Appendix 17). It also redrafts Regulation 551.7.1 for bidirectional energy flow.',
  'AFDDs are not simply "recommended". Regulation 421.1.7 says AFDDs shall be provided for single-phase AC final circuits supplying socket-outlets rated up to 32 A in high rise residential buildings, HMOs, purpose-built student accommodation and care homes. For all other premises they are recommended.',
  'Regulation 411.3.4 has required a 30 mA RCD on AC final circuits supplying luminaires in domestic (household) premises since the 18th Edition was published in 2018 — it is not a new A4:2026 rule.',
  'Elec-Mate has every BS 7671 regulation built into the app — tap any certificate field to see the relevant clause, with 70+ calculators based on BS 7671 tables.',
];

const faqs = [
  {
    question: 'What is the difference between BS 7671 and the IET Wiring Regulations?',
    answer:
      'They are the same document. BS 7671 is the British Standard number assigned by the British Standards Institution (BSI). The IET Wiring Regulations is the common name used by the Institution of Engineering and Technology (IET), which publishes the standard jointly with BSI. The full title of the current version is "BS 7671:2018+A4:2026 Requirements for Electrical Installations — IET Wiring Regulations, Eighteenth Edition." Electricians, training providers, and competent person schemes use both names interchangeably. Cover colour is a common shorthand and it changes with each printing: BS 7671:2018 was issued with a blue cover, the Amendment 2:2022 printing was brown (hence "the brown book"), and the Amendment 4:2026 printing is orange. When someone refers to the 18th Edition, the Wiring Regs or BS 7671, they are all talking about the same standard.',
  },
  {
    question: 'Is BS 7671 a legal requirement?',
    answer:
      'BS 7671 is not itself a law — it is a British Standard, and the standard states plainly that compliance with a British Standard cannot confer immunity from legal obligations. However, it is referenced by laws and regulations that ARE legally enforceable. The Electricity at Work Regulations 1989 require all electrical systems to be constructed and maintained to prevent danger. The Building Regulations 2010 (Part P in England) require electrical installations in dwellings to be designed and installed to protect persons from fire and electric shock. Approved Document P specifically references BS 7671 as the means of demonstrating compliance. In practice, compliance with BS 7671 is the universally accepted way to demonstrate that electrical work meets the legal requirements. A court or enforcement body would expect an electrician to demonstrate compliance with BS 7671 as evidence that their work is safe. Failure to comply does not automatically constitute a criminal offence, but it would be extremely difficult to defend work that departs from the standard without a compelling technical justification.',
  },
  {
    question: 'What changed between the 17th and 18th Edition of BS 7671?',
    answer:
      'BS 7671:2018 was issued on 1 July 2018 and came into effect on 1 January 2019 — installations designed after 31 December 2018 are to comply with it. That gives a six-month overlap, not a full year. The main changes from BS 7671:2008+A3:2015 include: (1) A new Regulation 421.1.7 recommending arc fault detection devices (AFDDs) to mitigate fire risk in AC final circuits — the mandatory premises list came later, at A2:2022. (2) A new Regulation 411.3.4 requiring 30 mA RCD additional protection for AC final circuits supplying luminaires in domestic premises. (3) A completely revised Section 534 for surge protective devices, the most significant technical change being the selection requirements for the voltage protection level (Up). (4) A new Chapter 46 covering non-automatic isolation and switching, and a new Regulation group 419 for cases where automatic disconnection to Regulation 411.3.2 is not feasible. (5) Regulation 521.10.202 replacing 521.11.201, so cable support against premature collapse in a fire applies throughout the installation, not just in escape routes. (6) A completely restructured Part 6 — Chapters 61, 62 and 63 deleted and replaced by Chapters 64 and 65, with regulation numbering aligned to the CENELEC standard. (7) Appendix 17 introduced as informative guidance on energy efficiency, later replaced by Part 8. Regulation 421.1.201, the non-combustible consumer unit enclosure requirement, was carried forward from Amendment 3 to the 17th Edition (2015) rather than introduced in 2018.',
  },
  {
    question: 'Do I need to buy a new copy of BS 7671 for each amendment?',
    answer:
      'It depends on the amendment. Amendment 1:2020 was issued electronically in February 2020 and Amendment 3:2024 was issued electronically on 31 July 2024 — both are used alongside your existing copy. Amendment 2:2022 and Amendment 4:2026 were issued as full printed reprints of the standard: the A2:2022 printing is brown, the A4:2026 printing is orange. If you are working to the current standard you need the A4:2026 text, because A4 inserts new chapters and sections (57, 81, 545, 716) that simply are not in an older book. Elec-Mate includes the current regulation text within the app, so you always have it in your pocket without carrying the physical book on site.',
  },
  {
    question: 'What qualifications do I need to work to BS 7671?',
    answer:
      'There is no single mandatory qualification, but the industry standard is the City and Guilds 2382-22 (or the older 2382-18) qualification, which is the 18th Edition IET Wiring Regulations exam. This is a theory-based qualification that demonstrates understanding of the standard. Most competent person scheme providers (NICEIC, NAPIT and similar) require the 2382 as a minimum for registration, alongside practical qualifications such as the NVQ Level 3 in Electrotechnical Services and the City and Guilds 2391 (Inspection and Testing). Apprentices typically study BS 7671 as part of their Level 3 qualification. Because the exam is written against a specific version of the standard, expect the syllabus and the question bank to be reissued as amendments land.',
  },
  {
    question: 'How often is BS 7671 updated?',
    answer:
      'Major new editions appear roughly every decade. The 16th Edition was issued in 1991 and reissued as BS 7671:2001 in June 2001, the 17th Edition as BS 7671:2008 in January 2008, and the 18th Edition as BS 7671:2018 in July 2018. Between editions, amendments address urgent changes, new technologies, or corrections. The 18th Edition has had four amendments: Amendment 1 (February 2020), Amendment 2 (March 2022), Amendment 3 (31 July 2024) and Amendment 4 (April 2026). Amendment 4:2026 was issued on 15 April 2026 and may be implemented immediately; the previous version is withdrawn on 15 October 2026. The IET has not confirmed a date for a 19th Edition.',
  },
  {
    question: 'What did Amendment 4 introduce for bidirectional devices?',
    answer:
      'Regulation 530.3.201 — introduced by Amendment 3:2024 — requires that the selection and erection of equipment for protection shall take account of the appropriate use of either a unidirectional protective device or a bidirectional protective device. Its note points out that product standards require RCCBs, RCBOs, circuit-breakers and AFDDs to be marked to show whether they are unidirectional, for example "in" and "out", "line" and "load", or arrows. Amendment 4:2026 built on that by redrafting Regulation 551.7.1 for generating sets operating in parallel with another source: indent (c) requires protective devices to be selected in accordance with Regulation 530.3.201, and a new indent (d) prohibits connecting a source of supply to the load side of any RCD providing additional protection that is shared with other circuits, except where that RCD disconnects all live conductors including the neutral. A4 also split Regulation 551.7.2 in two: 551.7.2.1 requires the generating set to be installed on the supply side of all the protective devices for the final circuits of a distribution board, and states that stationary secondary batteries in accordance with the new Chapter 57 are to be considered a generating set and not a load. This matters wherever a battery energy storage system, solar PV with battery backup, or a vehicle-to-grid charger can push energy back towards the supply, because standard protective devices are built to interrupt fault current flowing one way.',
  },
];

const sections = [
  {
    id: 'what-is-bs7671',
    heading: 'What Is BS 7671?',
    content: (
      <>
        <p>
          BS 7671 is the British Standard that sets out the requirements for the design, erection,
          and verification of electrical installations in the United Kingdom. Published jointly by
          the British Standards Institution (BSI) and the Institution of Engineering and Technology
          (IET), it is the single most important document for every working electrician in the UK.
          The current version is <strong>BS 7671:2018+A4:2026</strong> — the 18th Edition, as
          amended by A1:2020, A2:2022, A3:2024 and A4:2026.
        </p>

        <div className={tableWrapCn}>
          <table className="w-full min-w-[520px] border-collapse">
            <caption className="sr-only">BS 7671 at a glance</caption>
            <thead>
              <tr className="border-b border-white/[0.14] bg-white/[0.06]">
                <th scope="col" className={thCn}>
                  Question
                </th>
                <th scope="col" className={thCn}>
                  Answer
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>Current version</td>
                <td className={tdCn}>BS 7671:2018+A4:2026</td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>Amendment 4 issued</td>
                <td className={tdCn}>15 April 2026 — may be implemented immediately</td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>Previous version withdrawn</td>
                <td className={tdCn}>15 October 2026 (A2:2022 + Corrigendum May 2023 + A3:2024)</td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>18th Edition issued</td>
                <td className={tdCn}>1 July 2018; in effect for designs after 31 December 2018</td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>Voltage scope</td>
                <td className={tdCn}>Up to and including 1000 V AC or 1500 V DC</td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>Structure</td>
                <td className={tdCn}>Parts 1 to 7, plus Part 8 (functional requirements)</td>
              </tr>
              <tr>
                <td className={tdCn}>Legal status</td>
                <td className={tdCn}>
                  Not law itself — the accepted route to satisfying the Electricity at Work
                  Regulations 1989 and Part P
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-6">
          The standard applies to circuits supplied at nominal voltages up to and including 1000 V
          AC or 1500 V DC. That covers virtually every domestic, commercial, and light industrial
          installation in the country — from a single socket-outlet in a flat to a complete rewire
          of a hospital. It does not cover certain specialist installations such as mines, quarries,
          explosive atmospheres, or high-voltage distribution systems, which are covered by separate
          regulations.
        </p>
        <p>
          BS 7671 is not a textbook or a how-to guide. It is a set of requirements — minimum
          standards that must be met for an installation to be considered safe. The companion
          documents — the IET Guidance Notes (GN1 through GN8), the On-Site Guide, and the
          Electrician&apos;s Guide — provide the practical interpretation and worked examples that
          help electricians apply the regulations on site. The most commonly referenced companion is{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">
            Guidance Note 3 (GN3): Inspection and Testing
          </SEOInternalLink>
          , now in its 9th Edition.
        </p>

        <h3 className="mt-8 text-base font-semibold text-white">
          Which amendment changed what — the short version
        </h3>
        <div className={tableWrapCn}>
          <table className="w-full min-w-[640px] border-collapse">
            <caption className="sr-only">Amendments to the 18th Edition</caption>
            <thead>
              <tr className="border-b border-white/[0.14] bg-white/[0.06]">
                <th scope="col" className={thCn}>
                  Amendment
                </th>
                <th scope="col" className={thCn}>
                  Issued
                </th>
                <th scope="col" className={thCn}>
                  Headline changes
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>A1:2020</td>
                <td className={tdCn}>February 2020 (electronic)</td>
                <td className={tdCn}>
                  Section 722 (EV charging) amended and rebased on HD 60364-7-722:2018
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>A2:2022</td>
                <td className={tdCn}>28 March 2022 (brown cover)</td>
                <td className={tdCn}>
                  AFDDs became a requirement in four premises types (421.1.7); new Chapter 82
                  (prosumer&apos;s installations); 443.5 risk-assessment method deleted; Appendix 3
                  Table 3A deleted and RCD testing changed
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>A3:2024</td>
                <td className={tdCn}>31 July 2024 (electronic)</td>
                <td className={tdCn}>
                  Two new definitions and one new regulation on bidirectional and unidirectional
                  devices (530.3.201)
                </td>
              </tr>
              <tr>
                <td className={tdCn}>A4:2026</td>
                <td className={tdCn}>15 April 2026 (orange cover)</td>
                <td className={tdCn}>
                  New Chapter 57 (stationary secondary batteries), new Section 716 (Power over
                  Ethernet), new Section 545 (functional earthing for ICT), new Chapter 81 (energy
                  efficiency); 551.7.1 redrafted for bidirectional energy flow
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <SEOAppBridge
          title="Every BS 7671 regulation in your pocket"
          description="Elec-Mate has auto BS 7671 regs built into every certificate. Tap any field and see the relevant regulation — clause number, full text…"
          icon={BookOpen}
        />
      </>
    ),
  },
  {
    id: 'seven-parts',
    heading: 'The Parts of BS 7671',
    content: (
      <>
        <p>
          BS 7671 is built from seven numbered parts covering design and installation, plus Part 8,
          which carries the functional requirements added by later amendments. Knowing the structure
          is what makes the book quick to use — whether you are looking up a regulation, studying
          for the 2382 exam, or checking compliance on site.
        </p>
        <div className="mt-6 space-y-4">
          <div className={cardCn}>
            <h3 className="mb-2 text-lg font-bold text-white">
              Part 1: Scope, Object, and Fundamental Principles
            </h3>
            <p className="text-sm leading-relaxed text-white">
              Defines the scope of the standard — what types of installations it covers and what it
              does not. Sets out the fundamental principles of electrical safety: protection against
              electric shock, protection against thermal effects, protection against overcurrent,
              protection against fault current, and protection against overvoltage. Regulation
              133.1.3 also sits here: where equipment is not to an applicable standard, or is used
              outside the scope of its standard, the designer must confirm it gives at least the
              same degree of safety and record it as a departure on the Part 6 certification.
            </p>
          </div>
          <div className={plainCardCn}>
            <h3 className="mb-2 text-lg font-bold text-white">Part 2: Definitions</h3>
            <p className="text-sm leading-relaxed text-white">
              Contains all the defined terms used throughout the standard. Understanding these
              definitions is critical because many terms have specific technical meanings that
              differ from everyday usage. For example, &quot;extraneous-conductive-part&quot; has a
              precise definition that determines whether bonding is required. &quot;Skilled
              person,&quot; &quot;instructed person,&quot; and &quot;ordinary person&quot; have
              specific meanings that affect the level of protection required. Part 2 is frequently
              tested in the 2382 exam.
            </p>
          </div>
          <div className={cardCn}>
            <h3 className="mb-2 text-lg font-bold text-white">
              Part 3: Assessment of General Characteristics
            </h3>
            <p className="text-sm leading-relaxed text-white">
              Requires the designer to assess the characteristics of the installation before
              starting the design: the purpose of the installation, the supply characteristics
              (earthing system, supply voltage, prospective fault current), the nature of the
              demand, the environmental conditions, and compatibility with other systems. You cannot
              size cables, select protective devices, or design earthing arrangements without first
              assessing the general characteristics. A4:2026 added a protective neutral bonding
              (PNB) figure and requirements to Regulation 312.2.1.1.
            </p>
          </div>
          <div className={plainCardCn}>
            <h3 className="mb-2 text-lg font-bold text-white">Part 4: Protection for Safety</h3>
            <p className="text-sm leading-relaxed text-white">
              The largest and most frequently referenced part. Covers protection against electric
              shock (Chapter 41), protection against thermal effects (Chapter 42), protection
              against overcurrent (Chapter 43), protection against voltage disturbances and
              electromagnetic disturbances (Chapter 44), and isolation and switching (Chapter 46).
              Chapter 41 holds the automatic disconnection of supply (ADS) requirements — Table 41.1
              maximum disconnection times and Tables 41.2 to 41.6 for maximum earth fault loop
              impedance — which are the tables electricians reach for most often on site.
            </p>
          </div>
          <div className={cardCn}>
            <h3 className="mb-2 text-lg font-bold text-white">
              Part 5: Selection and Erection of Equipment
            </h3>
            <p className="text-sm leading-relaxed text-white">
              Covers the practical selection and installation of equipment — wiring systems (Chapter
              52), protection, isolation, switching, control and monitoring (Chapter 53), earthing
              arrangements and protective conductors (Chapter 54), other equipment (Chapter 55),
              safety services (Chapter 56) and, new at A4:2026, stationary secondary batteries
              (Chapter 57). This is where you find cable selection, installation methods, minimum
              conductor sizes, and equipment ratings. Regulation 530.3.201 on unidirectional and
              bidirectional protective devices sits here, as does the redrafted Regulation 551.7.1
              for generating sets in parallel with another source.
            </p>
          </div>
          <div className={plainCardCn}>
            <h3 className="mb-2 text-lg font-bold text-white">Part 6: Inspection and Testing</h3>
            <p className="text-sm leading-relaxed text-white">
              Sets out the requirements for{' '}
              <SEOInternalLink href="/guides/testing-sequence-guide">
                initial verification (Chapter 64) and periodic inspection and testing (Chapter 65)
              </SEOInternalLink>
              . It specifies which tests must be carried out and what the pass criteria are. Table
              64 — minimum values of insulation resistance and the DC test voltages, applied by
              Regulation 643.3.2 — is in this part. The maximum earth fault loop impedance tables
              are not: they are Tables 41.2 to 41.6 in Chapter 41, with the supporting
              loop-impedance material in Appendix 3. Part 6 is the basis for every{' '}
              <SEOInternalLink href="/guides/electrical-certificate-types-uk">
                electrical certificate
              </SEOInternalLink>{' '}
              issued in the UK.
            </p>
          </div>
          <div className={cardCn}>
            <h3 className="mb-2 text-lg font-bold text-white">
              Part 7: Special Installations or Locations
            </h3>
            <p className="text-sm leading-relaxed text-white">
              Contains additional or modified requirements where the risk of electric shock or fire
              is increased. Sections include locations containing a bath or shower (701), swimming
              pools and other basins (702), saunas (703), construction and demolition sites (704),
              agricultural and horticultural premises (705), conducting locations with restricted
              movement (706), marinas (709), exhibitions, shows and stands (711), solar PV (712),
              Power over Ethernet (716, new at A4:2026), and EV charging (722). Where a Part 7
              section applies, its requirements supplement or modify the general requirements in
              Parts 1 to 6 and Part 8. Part 7 is heavily tested in the 2382 exam because it is full
              of specific, memorable requirements.
            </p>
          </div>
          <div className={plainCardCn}>
            <h3 className="mb-2 text-lg font-bold text-white">Part 8: Functional Requirements</h3>
            <p className="text-sm leading-relaxed text-white">
              Part 8 did not exist in the 2018 book — energy efficiency was informative guidance in
              Appendix 17. Amendment 2:2022 added Chapter 82, Prosumer&apos;s low-voltage electrical
              installations, which sets requirements for installations with local generation and
              storage (Sections 821 to 826). Amendment 4:2026 added Chapter 81, an informative
              chapter on energy efficiency that points the reader to the Building Regulations and to
              BS HD 60364-8-1:2019, and deleted Appendix 17.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Practice questions covering every part of BS 7671"
          description="Elec-Mate's 18th Edition course works through the whole standard with questions mapped to the City and Guilds 2382-22 exam syllabus."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'changes-from-17th',
    heading: 'Key Changes from the 17th Edition',
    content: (
      <>
        <p>
          BS 7671:2018 was issued on 1 July 2018 and came into effect on 1 January 2019, replacing
          the 17th Edition (BS 7671:2008+A3:2015). Installations designed after 31 December 2018 are
          to comply with the 18th Edition, so the overlap was six months rather than a year. These
          are the 2018 changes that still shape day-to-day practice.
        </p>
        <div className="mt-6 space-y-4">
          <div className={plainCardCn}>
            <h3 className="mb-1 font-bold text-white">
              30 mA RCD on domestic lighting — Regulation 411.3.4
            </h3>
            <p className="text-sm leading-relaxed text-white">
              Regulation 411.3.4, &quot;Additional requirements for circuits with luminaires&quot;,
              states: within domestic (household) premises, additional protection by an RCD with a
              rated residual operating current not exceeding 30 mA shall be provided for AC final
              circuits supplying luminaires. It uses &quot;shall&quot;, so it is a requirement, not
              a recommendation — and it has been in force since the 18th Edition was published in
              2018. It is often reported as a new Amendment 4 rule; it is not. On new work and
              rewires, lighting circuits are protected by a 30 mA RCD or RCBO.
            </p>
          </div>
          <div className={plainCardCn}>
            <h3 className="mb-1 font-bold text-white">
              Arc fault detection devices — Regulation 421.1.7
            </h3>
            <p className="text-sm leading-relaxed text-white">
              This is the most widely misquoted regulation in the book, in both directions. The 18th
              Edition introduced 421.1.7 in 2018 as a recommendation. Amendment 2:2022 redrafted it
              into a requirement for four premises types, and Amendment 4:2026 reworded the first of
              them. As it now stands, AFDDs conforming to BS EN 62606{' '}
              <strong>shall be provided</strong> for single-phase AC final circuits supplying
              socket-outlets with a rated current not exceeding 32 A in (a) high rise residential
              buildings (HRRBs), (b) houses in multiple occupation (HMOs), (c) purpose-built student
              accommodation, and (d) care homes. A note assumes an HRRB to be a residential building
              over 18 m in height or in excess of six storeys, whichever is met first. For all other
              premises, AFDDs are <strong>recommended</strong> for single-phase AC final circuits
              supplying socket-outlets not exceeding 32 A. Where used, they go at the origin of the
              circuit to be protected, and Regulation 532.6 confirms they are installed at the
              origin of the final circuits to be protected and in AC single-phase circuits not
              exceeding 230 V. Using an AFDD does not remove the need to apply the other measures in
              the standard.
            </p>
          </div>
          <div className={plainCardCn}>
            <h3 className="mb-1 font-bold text-white">
              Surge protection — Section 443 and Section 534
            </h3>
            <p className="text-sm leading-relaxed text-white">
              The two sections do different jobs, and they are routinely confused. Section 443
              decides <em>whether</em> you need protection against transient overvoltages; Section
              534 governs the selection and erection of the SPDs themselves. Section 534 was
              completely revised in 2018, the most significant technical change being the selection
              requirements for the voltage protection level (Up). Amendment 2:2022 then redrafted
              Section 443: Regulation 443.4.1 requires protection where the consequence of an
              overvoltage could cause serious injury or loss of human life, or significant financial
              or data loss — and for all other cases protection shall be provided{' '}
              <strong>unless the owner declares it is not required</strong> and accepts the risk.
              The old risk-assessment method in Regulation 443.5, and Annex A443, were deleted. In
              practice SPDs are now the default on most new installations.
            </p>
          </div>
          <div className={plainCardCn}>
            <h3 className="mb-1 font-bold text-white">EV charging installations — Section 722</h3>
            <p className="text-sm leading-relaxed text-white">
              Section 722 was not new in 2018 — the 18th Edition made significant changes to
              Regulation 722.411.4.1 on the use of a PME supply, deleting the &quot;reasonably
              practicable&quot; exception, and revised the requirements for external influences,
              RCDs, socket-outlets and connectors. Amendment 1:2020 then rewrote the section on the
              basis of HD 60364-7-722:2018, and Amendment 2:2022 folded that in alongside further
              changes, including prosumer&apos;s installations (722.826.3.201). Section 722 does not
              apply to wireless (inductive) charging.
            </p>
          </div>
          <div className={plainCardCn}>
            <h3 className="mb-1 font-bold text-white">RCD types — Regulation 531.3.3</h3>
            <p className="text-sm leading-relaxed text-white">
              Regulation 531.3.3 sets out the RCD types — AC, A, F and B — by how they behave in the
              presence of DC components and frequencies. Amendment 2:2022 added the sentence that
              changed specification in practice: RCD Type AC shall only be used to serve fixed
              equipment where it is known that the load current contains no DC components, with
              electric heating and simple filament lighting given as examples. Anything with
              electronics in it — washing machines, dishwashers, EV chargers, LED drivers — needs
              Type A or better. Most manufacturers now supply Type A as standard for domestic work.
            </p>
          </div>
          <div className={plainCardCn}>
            <h3 className="mb-1 font-bold text-white">
              Cable support, fire and escape routes — Regulation 521.10.202
            </h3>
            <p className="text-sm leading-relaxed text-white">
              Regulation 521.10.202 replaced 521.11.201 and requires cables to be adequately
              supported against premature collapse in the event of a fire{' '}
              <strong>throughout the installation</strong>, not just in escape routes as previously.
              This is the reason plastic clips alone are no longer acceptable for supporting cables
              on a ceiling. Amendment 4:2026 added a note explaining the intent of the regulation,
              and redrafted Regulation 422.2 and 422.2.1 so that 422.2.1 now lists the cables
              permitted in protected escape routes.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'amendment-2',
    heading: 'Amendment 2 (2022)',
    content: (
      <>
        <p>
          BS 7671:2018+A2:2022 was issued on 28 March 2022 and could be implemented immediately; BS
          7671:2018+A1:2020 remained current until it was withdrawn on 27 September 2022. A2 was a
          printed reprint of the whole standard — the brown cover — and it is still the version most
          often quoted second-hand, which is why several A2 changes get misattributed to Amendment
          4.
        </p>
        <p>
          The substantive A2:2022 changes that still matter on site are these. Regulation 411.3.1.2
          was redrafted, so main protective bonding applies to extraneous-conductive-parts liable to
          introduce a dangerous potential difference, with a note clarifying that metallic pipework
          fed by non-metallic pipes entering the building is not normally an
          extraneous-conductive-part. Regulation 421.1.7 became a requirement for AFDDs in high rise
          residential buildings, HMOs, purpose-built student accommodation and care homes. A new
          Chapter 82 introduced prosumer&apos;s low-voltage electrical installations. Regulation
          531.3.3 restricted Type AC RCDs to fixed equipment with no DC component in the load
          current. Appendix 11 (warning and user instruction labels) and a rewritten Appendix 13 on
          protected escape routes were added.
        </p>
        <div className={cardCn}>
          <h3 className="mb-3 text-lg font-bold text-white">
            The two testing changes A2:2022 made — still catching people out
          </h3>
          <p className="mb-3 text-sm leading-relaxed text-white">
            Regulation group 643.3 was redrafted. Where connected equipment is likely to influence
            the measurement or be damaged, the Table 64 test is applied <strong>before</strong> the
            equipment is connected; then, following connection, a test at <strong>250 V DC</strong>{' '}
            is applied between live conductors and the protective conductor, with a minimum
            acceptable value of <strong>1 MΩ</strong> (Regulation 643.3.3).
          </p>
          <p className="text-sm leading-relaxed text-white">
            RCD testing changed at the same time, and Table 3A in Appendix 3 was{' '}
            <strong>deleted</strong>. Regulation 643.8 now requires the effectiveness of automatic
            disconnection by RCDs to be verified using test equipment to BS EN 61557-6, and its note
            says that regardless of RCD type, effectiveness is deemed verified where the RCD
            disconnects within the stated time on an alternating current test at rated residual
            operating current (I∆n) — for a general non-delay type, 300 ms maximum. The old
            half-rated and five-times tests are product-standard tests, not an installation
            verification requirement in BS 7671.
          </p>
        </div>
        <p>
          For the consumer unit itself, A2:2022 is also where Regulation 531.3.2 indent (b) began
          highlighting the use of RCBOs on individual final circuits in residential premises to
          minimise unwanted tripping — the practical reason most new{' '}
          <SEOInternalLink href="/consumer-unit-regulations">consumer units</SEOInternalLink> are
          now fully populated with RCBOs rather than split-load RCDs.
        </p>
      </>
    ),
  },
  {
    id: 'amendment-4',
    heading: 'Amendment 4 (2026) — What Actually Changed',
    content: (
      <>
        <p>
          BS 7671:2018+A4:2026 was issued on <strong>15 April 2026</strong> and may be implemented
          immediately. The previous version — BS 7671:2018+A2:2022+Corrigendum (May 2023)+A3:2024 —
          remains current but is withdrawn on <strong>15 October 2026</strong>. Amendment 4 is a
          substantive amendment: it adds whole chapters and sections, so an older book cannot simply
          be annotated to match it.
        </p>
        <p>
          A point of frequent confusion: the electronic amendment issued on 31 July 2024 was{' '}
          <strong>Amendment 3 (A3:2024)</strong>, not Amendment 4. A3 was a very small amendment —
          two new definitions and one new regulation, 530.3.201, on the use of bidirectional and
          unidirectional devices.
        </p>

        <h3 className="mt-8 text-base font-semibold text-white">
          Amendment 4:2026 changes at a glance
        </h3>
        <div className={tableWrapCn}>
          <table className="w-full min-w-[640px] border-collapse">
            <caption className="sr-only">Main changes introduced by Amendment 4:2026</caption>
            <thead>
              <tr className="border-b border-white/[0.14] bg-white/[0.06]">
                <th scope="col" className={thCn}>
                  Regulation or section
                </th>
                <th scope="col" className={thCn}>
                  What changed
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>312.2.1.1</td>
                <td className={tdCn}>
                  Now includes a protective neutral bonding (PNB) figure and requirements
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>421.1.7(a)</td>
                <td className={tdCn}>
                  Reworded to read &quot;high rise residential buildings&quot;
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>422.2 and 422.2.1</td>
                <td className={tdCn}>
                  Protected escape routes modified; 422.2.1 now lists the cables permitted in a
                  protected escape route, and cables in a fire-resisting enclosure are deemed
                  outside it
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>434.2.1 and 434.3(a)</td>
                <td className={tdCn}>
                  &quot;Inherently short-circuit and earth fault proof&quot; introduced for
                  conductor selection and erection
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>Annex B443</td>
                <td className={tdCn}>Deleted</td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>Table 51</td>
                <td className={tdCn}>
                  Revised to identify combined protective and functional earthing conductors,
                  combined protective and functional bonding conductors, and functional bonding
                  conductors
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>Table 52.1</td>
                <td className={tdCn}>
                  Now carries the requirements for cables in a wall or partition
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>537.4.2</td>
                <td className={tdCn}>
                  Firefighter&apos;s switches now required in locations specified by the fire
                  engineer to support the building&apos;s fire strategy; 537.4.2.1 deleted
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>Section 545 (new)</td>
                <td className={tdCn}>
                  Functional earthing and functional equipotential bonding for ICT equipment and
                  systems
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>551.7.1 and 551.7.2</td>
                <td className={tdCn}>
                  Redrafted for generating sets in parallel — see the panel below
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>Chapter 57 (new)</td>
                <td className={tdCn}>
                  Stationary secondary batteries; the old Regulation 551.8 requirements moved here
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>653.1 and 653.2</td>
                <td className={tdCn}>
                  Condition reports must take account of the Appendix 6 notes for the person
                  producing the report and include guidance for the recipient
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>Section 716 (new)</td>
                <td className={tdCn}>
                  Power over Ethernet — distribution of ELV DC power over data cabling
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>Chapter 81 (new)</td>
                <td className={tdCn}>
                  Energy efficiency, referring to the Building Regulations and BS HD 60364-8-1:2019;
                  Appendix 17 deleted
                </td>
              </tr>
              <tr className="border-b border-white/[0.08]">
                <td className={tdCn}>Appendix 4</td>
                <td className={tdCn}>
                  Buried cables now have distinct reference methods and current-carrying capacities
                  depending on whether the cable is in direct contact with soil or in a conduit or
                  duct; Tables 4A2, 4D4A, 4E4A, 4H4A and 4J4A revised
                </td>
              </tr>
              <tr>
                <td className={tdCn}>Appendix 6</td>
                <td className={tdCn}>
                  Condition report notes redrafted and items rearranged; code FI no longer needs to
                  be marked as unsatisfactory
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={`${cardCn} my-6`}>
          <h3 className="mb-3 text-lg font-bold text-white">
            Bidirectional energy flow — Regulation 530.3.201 and 551.7.1
          </h3>
          <p className="mb-3 text-sm leading-relaxed text-white">
            Standard MCBs, RCDs and RCBOs are built to interrupt fault current flowing one way —
            from the supply, through the device, to the load. Where a battery or PV inverter can
            export, fault current can flow the other way. Regulation 530.3.201 requires the
            selection and erection of equipment for protection to take account of the appropriate
            use of either a unidirectional or a bidirectional protective device; its note points out
            that product standards require RCCBs, RCBOs, circuit-breakers and AFDDs to be marked to
            show which they are — &quot;in&quot; and &quot;out&quot;, &quot;line&quot; and
            &quot;load&quot;, or arrows. Amendment 4 then redrafted Regulation 551.7.1, which
            applies where a generating set runs in parallel with another source:
          </p>
          <ul className="space-y-3 text-sm leading-relaxed text-white">
            <li>
              <strong>Indent (c)</strong> — protective devices shall be selected in accordance with
              Regulation 530.3.201.
            </li>
            <li>
              <strong>Indent (d)</strong> — except where the RCD disconnects all live conductors
              including the neutral, a source of supply shall not be connected to the load side of
              any RCD providing additional protection that is shared with other circuits.
            </li>
            <li>
              <strong>Regulation 551.7.2.1</strong> — the generating set shall be installed on the
              supply side of all the protective devices for the final circuits of a distribution
              board, and stationary secondary batteries to Chapter 57 are to be treated as a
              generating set, not a load.
            </li>
          </ul>
        </div>

        <p>
          If you install solar PV, battery storage or EV chargers, that combination — 530.3.201,
          551.7.1, 551.7.2 and the new Chapter 57 — is the part of Amendment 4 that will change how
          you specify a job. It affects device selection, where the storage system lands relative to
          the RCD, and what you record on the certificate.
        </p>
        <SEOAppBridge
          title="70+ calculators built to BS 7671:2018+A4:2026"
          description="Cable sizing, voltage drop, Zs verification, maximum demand, adiabatic equation…"
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'daily-practice',
    heading: 'How BS 7671 Applies to Your Daily Work',
    content: (
      <>
        <p>
          For a working electrician, BS 7671 is not an abstract academic document — it is the
          reference you use every day when designing circuits, selecting cables, choosing protective
          devices, carrying out tests, and completing certificates. Here is how the key parts of the
          standard map to common on-site activities.
        </p>
        <div className="mt-6 space-y-4">
          <div className={plainCardCn}>
            <h3 className="mb-1 font-bold text-white">Cable sizing and circuit design</h3>
            <p className="text-sm leading-relaxed text-white">
              Appendix 4 contains the current-carrying capacity tables for each cable type and
              reference method, together with the rating factors for grouping, ambient temperature
              and thermal insulation. Every reference method has its own tabulated capacity — you
              read the column for the method you are actually using rather than applying a
              multiplier on top. For voltage drop, Section 525 sets the requirement and Regulation
              525.202 points you to Appendix 4, Section 6.4 for the permitted limits. Note that
              A4:2026 changed the buried-cable methods: direct in soil and in a conduit or duct now
              have distinct reference methods and distinct capacities.
            </p>
          </div>
          <div className={plainCardCn}>
            <h3 className="mb-1 font-bold text-white">Testing and certification</h3>
            <p className="text-sm leading-relaxed text-white">
              Part 6 specifies the{' '}
              <SEOInternalLink href="/guides/testing-sequence-guide">
                testing sequence
              </SEOInternalLink>
              , the tests required, and the acceptance criteria. Every test value you record on an{' '}
              <SEOInternalLink href="/guides/electrical-certificate-types-uk">
                EIC or EICR
              </SEOInternalLink>{' '}
              is compared against the BS 7671 limits. The model forms are in Appendix 6, which since
              A2:2022 carries separate pages for the schedule of circuit details and the schedule of
              test results, plus fields for recording SPD and AFDD details.
            </p>
          </div>
          <div className={plainCardCn}>
            <h3 className="mb-1 font-bold text-white">Protection and device selection</h3>
            <p className="text-sm leading-relaxed text-white">
              Chapters 41, 43 and 53 govern how you select protective devices — MCBs, RCDs, RCBOs,
              fuses — for protection against electric shock, overload and fault current. Regulation
              411.3.2.2 sets which final circuits the Table 41.1 maximum disconnection times apply
              to: circuits rated up to 63 A with one or more socket-outlets, and circuits rated up
              to 32 A supplying only fixed connected current-using equipment. Tables 41.2 to 41.6
              tell you whether the device will disconnect in time at the measured Zs; the adiabatic
              equation tells you whether the conductor survives the fault for that duration.
            </p>
          </div>
          <div className={plainCardCn}>
            <h3 className="mb-1 font-bold text-white">
              <SEOInternalLink href="/bs7671-observation-codes">Observation codes</SEOInternalLink>{' '}
              and condition reporting
            </h3>
            <p className="text-sm leading-relaxed text-white">
              When carrying out a periodic inspection you assess the installation against the
              current edition of BS 7671, recording every departure, defect and deterioration as an
              observation with a classification code (C1, C2, C3 or FI). A4:2026 touched this
              directly: Regulation 653.1 requires the Appendix 6 notes for the person producing the
              report to be taken into account, Regulation 653.2 requires guidance for the recipient
              to be included, and Appendix 6 now states that code FI no longer needs to be marked as
              unsatisfactory.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Tap any certificate field, see the BS 7671 regulation"
          description="Elec-Mate links every certificate field to its relevant BS 7671 clause. When you are on site and need to check a regulation, the answer is one tap away."
          icon={BookOpen}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/bs-7671-amendment-4-2026',
    title: 'Amendment 4 Changes (A4:2026)',
    description:
      'Detailed breakdown of Amendment 4 — the new Chapter 57, Section 716, Section 545 and the redrafted Regulation 551.7.1.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-amendment-3-changes',
    title: 'Amendment 3 Changes (A3:2024)',
    description:
      'The 31 July 2024 amendment: two new definitions and Regulation 530.3.201 on bidirectional and unidirectional devices.',
    icon: Layers,
    category: 'Guide',
  },
  {
    href: '/eighteenth-edition-course',
    title: '18th Edition Course',
    description:
      'Study for the C&G 2382-22 exam with practice questions and an AI study assistant.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description: 'Complete guide to C1, C2, C3, and FI classification codes for EICR reports.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description: 'The correct order for dead and live testing per GN3 and BS 7671.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description: 'How Part P interacts with BS 7671 — notifiable work, competent person schemes.',
    icon: Scale,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BS7671EighteenthEditionGuidePage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2024-09-01"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="BS 7671 Hub"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          BS 7671: 18th Edition <span className="text-yellow-400">Wiring Regulations Guide</span>
        </>
      }
      heroSubtitle="The complete guide to BS 7671:2018+A4:2026 — the 18th Edition of the IET Wiring Regulations. Every part of the standard explained, what each of the four amendments actually changed, and the A4:2026 additions: Chapter 57 for stationary secondary batteries, Section 716 for Power over Ethernet, Section 545 for ICT functional earthing, Chapter 81 for energy efficiency, and the redrafted Regulation 551.7.1 for bidirectional energy flow."
      readingTime={18}
      answerBox={{
        question: 'What is the current version of BS 7671?',
        answer:
          'BS 7671:2018+A4:2026 — the 18th Edition of the IET Wiring Regulations as amended by A1:2020, A2:2022, A3:2024 and A4:2026. Amendment 4 was issued on 15 April 2026 and may be implemented immediately; the previous version is withdrawn on 15 October 2026. BS 7671 is not statutory in itself, but compliance is the accepted way to satisfy the Electricity at Work Regulations 1989 and Part P of the Building Regulations.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Every BS 7671 regulation, always in your pocket"
      ctaSubheading="Join 1,600+ UK electricians using Elec-Mate for on-site regulation references, 70+ calculators, and 19 certificate types — all built to BS 7671:2018+A4:2026. 7-day free trial, cancel anytime."
    />
  );
}
