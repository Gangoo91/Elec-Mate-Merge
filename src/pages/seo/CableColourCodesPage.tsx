import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  FileCheck2,
  Cable,
  BookOpen,
  Activity,
  ClipboardCheck,
  Camera,
  Palette,
  ShieldCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Shared presentation
// -------------------------------------------------------------------

/** Tables scroll inside their own container so the page body never scrolls sideways. */
const tableWrap = '-mx-4 my-6 overflow-x-auto sm:mx-0';
const tableCn = 'w-full min-w-[32rem] border-collapse text-left text-sm';
const thCn =
  'border-b border-white/[0.18] px-4 py-3 text-[13px] font-semibold uppercase tracking-wide text-white';
const tdCn = 'border-b border-white/[0.08] px-4 py-3 align-top text-white';
const rowHeadCn =
  'border-b border-white/[0.18] bg-white/[0.05] px-4 py-2 text-[12px] font-semibold uppercase tracking-wide text-white';

/** Cards run edge-to-edge on phones, inset and rounded from sm: up. */
const cardCn =
  '-mx-4 my-6 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';
const noteCn =
  '-mx-4 my-6 rounded-none border-y border-orange-500/30 bg-orange-500/10 p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Cable Colour Codes UK', href: '/guides/cable-colour-codes-uk' },
];

const tocItems = [
  { id: 'current-colours', label: 'Colour Chart: Current vs Old' },
  { id: 'old-uk-colours', label: 'Old UK Colours (Pre-2004)' },
  { id: 'three-phase-colours', label: 'Three-Phase Colours' },
  { id: 'flex-colours', label: 'Flexible Cable Colours' },
  { id: 'identification-requirements', label: 'BS 7671 Identification Requirements' },
  { id: 'mixed-installations', label: 'Mixed Colour Installations' },
  { id: 'notice-requirements', label: 'Section 514 Notice Requirements' },
  { id: 'sleeving-requirements', label: 'Sleeving and Marking' },
  { id: 'common-mistakes', label: 'Common Identification Mistakes' },
  { id: 'faq', label: 'FAQs' },
  { id: 'related', label: 'Related Guides' },
];

const keyTakeaways = [
  'Current harmonised colours (Table 51): single-phase — line brown, neutral blue, protective conductor green-and-yellow. Three-phase — L1 brown, L2 black, L3 grey. Introduced by Amendment 2 to BS 7671:2001, issued March 2004.',
  'Old UK colours (pre-2004): line red, neutral black, earth green or bare copper. Three-phase was L1 red, L2 yellow, L3 blue, with a black neutral. Both schemes are still in service and must be identified correctly on an EICR.',
  'The two schemes overlap dangerously. Blue was L3 in the old three-phase system and is the neutral now. Black was the neutral and is now L2. Never assume a core is a neutral because it is blue or black.',
  'Regulation 514.3.1 requires cable cores to be identified by colour (Reg 514.4) and/or by letters and numbers (Reg 514.5), except where Regulation 514.6 omits identification. Regulation 514.4.2 reserves green-and-yellow exclusively for protective conductors: one colour covers at least 30% and at most 70% of the surface being coloured, the other covers the remainder.',
  'Regulation 514.14 — the old mixed-colour warning notice — was deleted by BS 7671:2018+A2:2022 and there is no regulation at that number in A4:2026. The On-Site Guide (Reg 6.12, Figure 6.12) still recommends the notice, so fit it as good practice but do not cite 514.14 on paperwork.',
];

const faqs = [
  {
    question: 'What are the current cable colours in the UK?',
    answer:
      'Under Table 51 of BS 7671 the current harmonised colours are: brown for the line conductor, blue for the neutral, and green-and-yellow for the protective (earth) conductor. In three-phase circuits, L1 is brown, L2 is black and L3 is grey, with a blue neutral and a green-and-yellow earth. These colours were introduced by Amendment 2 to BS 7671:2001, issued in March 2004, and became mandatory for all new installations from 31 March 2006. All UK cable manufacturers now produce cable in these colours as standard.',
  },
  {
    question: 'What were the old UK cable colours?',
    answer:
      'The old UK colour code, used before 2004, was red for the line conductor, black for the neutral, and green (or bare copper) for the earth. For three-phase circuits: red was L1, yellow was L2, blue was L3, and black was the neutral. These colours are still found in many existing installations, particularly properties not rewired since before 2006. During an EICR the inspector must identify them correctly. The most dangerous trap is blue: it was a line colour in the old three-phase system but is the neutral colour now.',
  },
  {
    question: 'Do I need to rewire an installation with old colours?',
    answer:
      'No. An installation using the old pre-2004 colour code does not need rewiring purely because of the colours. Those colours were compliant when installed and remain acceptable in existing installations. Note that BS 7671 Regulation 514.14, which previously required a warning notice in mixed-colour installations, was deleted by BS 7671:2018+A2:2022 and there is no regulation at that number in BS 7671:2018+A4:2026. The On-Site Guide (Reg 6.12) continues to recommend a caution notice at or near the appropriate distribution board, and Figure 6.12 of the Guide shows the wording. Following that guidance remains good practice. Separately, if old-colour circuits have conductors used as switch wires without correct identification, that is a deficiency in its own right under Regulation 514.3.2.',
  },
  {
    question: 'What colour is a switch wire in the old system?',
    answer:
      'In the old UK colour code, two-core and earth cable was used for switch drops, with red as the permanent line to the switch and black as the switched line (switch return). The black conductor carries line voltage when the switch is on, so it should be sleeved red at its terminations to identify it as a line conductor. Regulation 514.3.2 requires every core of a cable to be identifiable at its terminations, and binding and identification sleeves are to comply with BS 3858 where appropriate. Missing red sleeving on black switch wires is one of the most common defects found during EICRs on older installations. In the current harmonised system the equivalent is brown as the permanent line and blue as the switched line, with the blue conductor sleeved brown at its terminations.',
  },
  {
    question: 'What are the flexible cable colours in the UK?',
    answer:
      'Flexible cables (flex) take their identification from the same Table 51 as fixed wiring: brown for line, blue for neutral, and green-and-yellow for the protective conductor. Two-core flex for Class II equipment has no protective conductor and uses brown and blue only; three-core flex adds the green-and-yellow. Flex was already using brown, blue and green-and-yellow before the 2004 change to fixed wiring, so the harmonisation did not alter flex identification — this is why you will not find red-and-black flex on modern appliances. The current-carrying capacity of a flexible cable depends on its conductor cross-sectional area, the installation method and the ambient temperature; refer to the manufacturer’s data and to BS 7671 Appendix 4 for the applicable figure.',
  },
  {
    question: 'What warning notice is required for mixed colour installations?',
    answer:
      'None is currently required by BS 7671. Regulation 514.14, which previously required a warning notice for non-standard colours, was deleted by BS 7671:2018+A2:2022 and remains deleted in A4:2026. The On-Site Guide (Reg 6.12, "Warning notice — non-standard colours") continues to recommend a notice at or near the appropriate distribution board where additions or alterations have left some wiring in the harmonised colours and some in the earlier colours; Figure 6.12 of the Guide shows the wording, advising that the installation has wiring colours to two versions of BS 7671. The notice should be durable and legible. Because no operative regulation mandates it, an EICR observation for a missing notice has no BS 7671 clause to cite and no C-code is prescribed by the standard.',
  },
  {
    question: 'What did A4:2026 change about conductor colours?',
    answer:
      'Table 51 was revised. It now includes identification for a combined protective and functional earthing conductor (CPFE), a combined protective and functional bonding conductor (CPFB) — both green-and-yellow — and a functional bonding conductor (FB). A note was also added stating that neither the designation FE nor the bi-colour combination green-and-yellow should be used to identify a functional bonding conductor. Functional earthing and functional bonding conductors are identified pink in Table 51. The line, neutral and protective conductor colours themselves are unchanged by A4:2026.',
  },
];

const relatedPages = [
  {
    href: '/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description: 'Consumer unit change requirements and wiring standards.',
    icon: ShieldCheck,
    category: 'Guide' as const,
  },
  {
    href: '/guides/distribution-board-wiring',
    title: 'Distribution Board Wiring',
    description: 'Three-phase distribution board wiring and colour coding.',
    icon: Activity,
    category: 'Guide' as const,
  },
  {
    href: '/guides/house-rewire-guide',
    title: 'House Rewire Guide',
    description: 'Complete guide to domestic rewiring including colour changeover.',
    icon: Cable,
    category: 'Guide' as const,
  },
  {
    href: '/polarity-test-guide',
    title: 'Polarity Testing Guide',
    description: 'Verify correct conductor connections at every point.',
    icon: ClipboardCheck,
    category: 'Guide' as const,
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition',
    description: 'Complete guide to the current Wiring Regulations.',
    icon: BookOpen,
    category: 'Regulations' as const,
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'current-colours',
    heading: 'UK Cable Colour Chart: Current vs Old',
    content: (
      <>
        <p>
          Every UK conductor colour in one table. The current colours come from Table 51 of BS 7671,
          introduced by Amendment 2 to BS 7671:2001 (issued March 2004) and mandatory for new
          installations from 31 March 2006. The old colours were compliant when installed and are
          still found throughout the existing housing stock.
        </p>
        <div className={tableWrap}>
          <table className={tableCn}>
            <caption className="sr-only">
              UK cable colour codes: current harmonised colours compared with the pre-2004 colours
            </caption>
            <thead>
              <tr>
                <th className={thCn} scope="col">
                  Conductor
                </th>
                <th className={thCn} scope="col">
                  Current (Table 51)
                </th>
                <th className={thCn} scope="col">
                  Old UK (pre-2004)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className={rowHeadCn} colSpan={3} scope="colgroup">
                  Single-phase AC
                </th>
              </tr>
              <tr>
                <th className={`${tdCn} font-semibold`} scope="row">
                  Line
                </th>
                <td className={`${tdCn} font-semibold text-yellow-400`}>Brown</td>
                <td className={tdCn}>Red</td>
              </tr>
              <tr>
                <th className={`${tdCn} font-semibold`} scope="row">
                  Neutral
                </th>
                <td className={`${tdCn} font-semibold text-yellow-400`}>Blue</td>
                <td className={tdCn}>Black</td>
              </tr>
              <tr>
                <th className={`${tdCn} font-semibold`} scope="row">
                  Protective (CPC / earth)
                </th>
                <td className={`${tdCn} font-semibold text-yellow-400`}>Green-and-yellow</td>
                <td className={tdCn}>Green, or bare copper</td>
              </tr>
              <tr>
                <th className={rowHeadCn} colSpan={3} scope="colgroup">
                  Three-phase AC
                </th>
              </tr>
              <tr>
                <th className={`${tdCn} font-semibold`} scope="row">
                  Line 1 (L1)
                </th>
                <td className={`${tdCn} font-semibold text-yellow-400`}>Brown</td>
                <td className={tdCn}>Red</td>
              </tr>
              <tr>
                <th className={`${tdCn} font-semibold`} scope="row">
                  Line 2 (L2)
                </th>
                <td className={`${tdCn} font-semibold text-yellow-400`}>Black</td>
                <td className={tdCn}>Yellow</td>
              </tr>
              <tr>
                <th className={`${tdCn} font-semibold`} scope="row">
                  Line 3 (L3)
                </th>
                <td className={`${tdCn} font-semibold text-yellow-400`}>Grey</td>
                <td className={tdCn}>Blue</td>
              </tr>
              <tr>
                <th className={`${tdCn} font-semibold`} scope="row">
                  Neutral
                </th>
                <td className={`${tdCn} font-semibold text-yellow-400`}>Blue</td>
                <td className={tdCn}>Black</td>
              </tr>
              <tr>
                <th className={`${tdCn} font-semibold`} scope="row">
                  Protective (CPC / earth)
                </th>
                <td className={`${tdCn} font-semibold text-yellow-400`}>Green-and-yellow</td>
                <td className={tdCn}>Green, or bare copper</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-8 mb-3 text-base font-semibold text-white">
          Why the colours are called &ldquo;harmonised&rdquo;
        </h3>
        <p>
          The colours align with the code used across Europe under the CENELEC harmonisation
          documents. Before harmonisation each country ran its own scheme, which created real
          confusion around imported equipment and for anyone working across borders. The UK adopted
          the harmonised set at Amendment 2 to BS 7671:2001 with a transitional period ending in
          2006.
        </p>

        <h3 className="mt-8 mb-3 text-base font-semibold text-white">
          Which cables the colours apply to
        </h3>
        <p>
          Table 51 identification applies to all fixed wiring — twin and earth (flat cable), SWA
          (steel wire armoured), MICC (mineral insulated), and singles in conduit or trunking. The
          protective conductor in twin and earth cable is a bare copper conductor and carries no
          insulation colour of its own, so it is identified with green-and-yellow sleeving at its
          terminations.
        </p>
      </>
    ),
  },
  {
    id: 'old-uk-colours',
    heading: 'Old UK Cable Colours (Pre-2004)',
    content: (
      <>
        <p>
          The old UK colour code ran for decades before harmonisation. Any property not rewired
          since before 2006 is likely to be on it, so every electrician must be able to read it
          during{' '}
          <SEOInternalLink href="/tools/eicr-certificate">inspection and testing</SEOInternalLink>.
          The colours themselves are in the chart above; what matters on site is where the two
          schemes collide.
        </p>
        <div className={noteCn}>
          <h4 className="mb-2 font-bold text-white">The two colours that changed meaning</h4>
          <ul className="space-y-2 text-sm leading-relaxed text-white">
            <li>
              <strong>Blue</strong> was L3 in the old three-phase system. It is the neutral in the
              current system.
            </li>
            <li>
              <strong>Black</strong> was the neutral in both the old single-phase and old
              three-phase systems. It is L2 in the current system.
            </li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-white">
            A blue or black core proves nothing on its own. In a mixed installation, establish which
            scheme a circuit belongs to before you touch it, and confirm by test rather than by
            colour.
          </p>
        </div>
        <p>
          Old-colour wiring does not have to be replaced. What does have to be right is the
          identification: switch wires sleeved, bare protective conductors sleeved at terminations,
          and — as good practice rather than regulation — a caution notice at the board where both
          schemes are present.
        </p>
      </>
    ),
  },
  {
    id: 'three-phase-colours',
    heading: 'Three-Phase Cable Colours',
    content: (
      <>
        <p>
          The three-phase change was the more significant half of harmonisation. It introduced two
          colours that had not been line colours before (black and grey) and moved blue from a line
          colour to the neutral. The full mapping is in the chart above; the practical consequences
          are below.
        </p>
        <div className={cardCn}>
          <h3 className="mb-3 text-base font-semibold text-white">What goes wrong on site</h3>
          <ul className="space-y-3 text-sm leading-relaxed text-white">
            <li>
              <strong>Phase rotation.</strong> Getting L1, L2 and L3 the wrong way round reverses
              rotation on three-phase motors. Rotation is a test result, not a colour — verify it.
            </li>
            <li>
              <strong>Blue mistaken for a neutral.</strong> In an old three-phase board a blue core
              is L3 and sits at 230 V to earth. Assuming it is a neutral is the single most
              dangerous error on this page.
            </li>
            <li>
              <strong>Black mistaken for a neutral.</strong> The mirror of the above in a modern
              board, where black is L2.
            </li>
            <li>
              <strong>Identification at terminations.</strong> Regulation 514.3.2 requires every
              core of a cable to be identifiable at its terminations, and preferably throughout its
              length. In a grouped three-phase run, colour alone is often not enough — use
              alphanumeric identification to Regulation 514.5 as well.
            </li>
          </ul>
        </div>
        <p>
          This matters most for{' '}
          <SEOInternalLink href="/guides/distribution-board-wiring">
            distribution board wiring
          </SEOInternalLink>{' '}
          and{' '}
          <SEOInternalLink href="/guides/three-phase-installation">
            three-phase installations
          </SEOInternalLink>
          , where several colour schemes can meet inside one enclosure.
        </p>
      </>
    ),
  },
  {
    id: 'flex-colours',
    heading: 'Flexible Cable (Flex) Colours',
    content: (
      <>
        <p>
          Flexible cables take their identification from the same Table 51 as fixed wiring: brown
          line, blue neutral, green-and-yellow protective conductor. Flex was already on these
          colours before fixed wiring changed in 2004, so the harmonisation did not alter flex — one
          reason red-and-black flex does not appear on modern appliances.
        </p>
        <div className={cardCn}>
          <h3 className="mb-3 text-base font-semibold text-white">Common flex types</h3>
          <ul className="space-y-3 text-sm leading-relaxed text-white">
            <li>
              <strong>2-core flex (no protective conductor).</strong> Brown and blue only. Used for
              double-insulated (Class II) equipment such as some power tools, chargers and table
              lamps, which require no earth connection.
            </li>
            <li>
              <strong>3-core flex.</strong> Brown, blue and green-and-yellow. Used for Class I
              equipment that requires an earth connection — kettles, irons, toasters, washing
              machines and most domestic appliances.
            </li>
            <li>
              <strong>Heat-resistant flex.</strong> The same colours, with heat-resistant insulation
              (typically silicone or butyl rubber). Used for immersion heaters, storage heaters and
              anything that runs hot at the connection point.
            </li>
          </ul>
        </div>
        <p>
          Current-carrying capacity is a separate question from colour. It depends on conductor
          cross-sectional area, installation method and ambient temperature — take it from the
          manufacturer&rsquo;s data and BS 7671 Appendix 4 for the specific flex type and condition,
          never from the colour or a rule of thumb.
        </p>
      </>
    ),
  },
  {
    id: 'identification-requirements',
    heading: 'BS 7671 Conductor Identification Requirements',
    content: (
      <>
        <p>
          Section 514 of BS 7671 sets out conductor identification. Regulation 514.3.1 requires
          that, except where identification is not required by Regulation 514.6, cores of cables
          shall be identified by colour as required by Regulation 514.4 and/or by letters and
          numbers as required by Regulation 514.5. Regulation 514.3.2 adds that every core shall be
          identifiable at its terminations and preferably throughout its length, and that binding
          and sleeves used for identification shall comply with BS 3858 where appropriate.
        </p>
        <div className={cardCn}>
          <h3 className="mb-3 text-base font-semibold text-white">The four rules that get cited</h3>
          <ul className="space-y-4 text-sm leading-relaxed text-white">
            <li>
              <strong>Protective conductors — Reg 514.4.2.</strong> Green-and-yellow is used
              exclusively for protective conductors and for no other purpose. Where the bi-colour is
              applied, one colour covers at least 30% and at most 70% of the surface being coloured
              and the other covers the remainder. A single-core cable identified green-and-yellow
              throughout its length may only be used as a protective conductor and shall not be
              overmarked at its terminations, except as permitted by Regulation 514.4.3 for PEN
              conductors.
            </li>
            <li>
              <strong>Bare conductors — Regs 514.4.2 and 514.4.6.</strong> A bare conductor or
              busbar used as a protective conductor is identified, where necessary, by equal
              green-and-yellow stripes not less than 15 mm and not more than 100 mm wide, close
              together, either throughout its length or in each compartment and unit and at each
              accessible position. Other bare conductors are identified, where necessary, by tape,
              sleeve or disc of the colour prescribed in Table 51, or by painting.
            </li>
            <li>
              <strong>Neutral conductors — Reg 514.4.1.</strong> Where a circuit includes a neutral
              or midpoint conductor identified by colour, the colour used shall be blue. A blue core
              pressed into service as a switched line has to be identified brown at its terminations
              so it is not read as a neutral.
            </li>
            <li>
              <strong>The single colour green — Reg 514.4.5.</strong> Plain green shall not be used
              to identify live conductors in power circuits, protective conductors, or functional
              earthing and bonding conductors.
            </li>
          </ul>
        </div>
        <div className={noteCn}>
          <h4 className="mb-2 font-bold text-white">A4:2026 change — Table 51 revised</h4>
          <p className="text-sm leading-relaxed text-white">
            Table 51 was revised at A4:2026 to add identification for a combined protective and
            functional earthing conductor (CPFE) and a combined protective and functional bonding
            conductor (CPFB), both green-and-yellow, and for a functional bonding conductor (FB).
            Functional earthing and functional bonding conductors are identified pink in Table 51. A
            note was added: neither the designation FE nor the bi-colour combination
            green-and-yellow should be used to identify a functional bonding conductor. The line,
            neutral and protective conductor colours are unchanged.
          </p>
        </div>
        <p>
          Identification of conductors (514.3.1) is a listed item on the schedule of inspections.
          During an <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>, missing
          or incorrect identification is recorded as an observation: missing protective conductor
          sleeving is typically coded C3, while a missing switch-wire identification that creates a{' '}
          <SEOInternalLink href="/polarity-test-guide">polarity</SEOInternalLink> risk may be coded
          C2. Coding remains the inspector&rsquo;s judgement — BS 7671 does not prescribe a code for
          either.
        </p>
      </>
    ),
  },
  {
    id: 'mixed-installations',
    heading: 'Mixed Colour Installations',
    content: (
      <>
        <p>
          Many UK installations contain wiring from both colour codes. That is entirely lawful — the
          old colours were compliant when installed and do not need replacing. What it creates is an
          identification risk that has to be managed, and the regulatory position has changed.
        </p>
        <div className={noteCn}>
          <h4 className="mb-2 font-bold text-white">Reg 514.14 was deleted at A2:2022</h4>
          <p className="text-sm leading-relaxed text-white">
            Regulation 514.14, which previously required a warning notice for non-standard colours,
            was deleted by BS 7671:2018+A2:2022. It remains deleted in BS 7671:2018+A4:2026 — there
            is no regulation text at that clause number. Do not cite 514.14 as the basis for an
            observation, a departure, or a specification clause.
          </p>
        </div>
        <p>
          The On-Site Guide (Reg 6.12, &ldquo;Warning notice — non-standard colours&rdquo;)
          continues to recommend a caution notice at or near the appropriate distribution board
          where additions or alterations have left some wiring in the harmonised colours and some in
          the earlier colours. Figure 6.12 of the Guide shows the wording:
        </p>
        <blockquote className={cardCn}>
          <p className="text-sm italic leading-relaxed text-white">
            &ldquo;Caution — This installation has wiring colours to two versions of BS 7671. Great
            care should be taken before undertaking extension, alteration or repair that all
            conductors are correctly identified.&rdquo;
          </p>
          <p className="mt-3 text-[13px] font-semibold text-white">
            On-Site Guide, Reg 6.12 / Figure 6.12 — recommendation, not a BS 7671 requirement
          </p>
        </blockquote>
        <p>
          The notice should be durable and legible, and positioned at or near the{' '}
          <SEOInternalLink href="/consumer-unit-regulations">consumer unit</SEOInternalLink> or
          distribution board where circuits of both codes are present. Self-adhesive labels are
          available from wholesalers, or the notice can be printed and laminated.
        </p>
        <p>
          During an{' '}
          <SEOInternalLink href="/how-to-fill-in-eicr">EICR inspection</SEOInternalLink>, check
          every board in a mixed-colour installation. Fitting the notice remains good practice, but
          if it is absent there is no operative BS 7671 clause to cite against it and the standard
          prescribes no C-code.
        </p>
        <SEOAppBridge
          title="UK Wiring Colour Codes: Old vs New (BS 7671)"
          description="UK cable colour codes explained: the new harmonised colours vs the old red and black, for single, twin & earth and three-phase, with a comparison."
          icon={Camera}
        />
      </>
    ),
  },
  {
    id: 'notice-requirements',
    heading: 'Section 514 Notice Requirements',
    content: (
      <>
        <p>
          Two notice requirements in Section 514 come up constantly on modern boards and are worth
          separating from the deleted 514.14. Neither is new at A4:2026 — Regulation 514.15 is
          carried from BS 7671:2018 and Regulation 514.16.1 was introduced at A2:2022 — but both are
          live and both are commonly missed.
        </p>
        <div className={cardCn}>
          <h3 className="mb-2 text-base font-semibold text-white">
            Reg 514.15.1 — alternative and additional sources of supply
          </h3>
          <p className="text-sm leading-relaxed text-white">
            Where an installation includes alternative or additional sources of supply (solar PV,
            battery storage, a generator), warning notices shall be affixed at: (a) the origin of
            the installation; (b) the meter position, if remote from the origin; (c) the consumer
            unit or distribution board to which the sources are connected; and (d) all points of
            isolation of all sources of supply. The notice shall be durably marked and shall
            identify the relevant point(s) of isolation. An example is given in Figure 11E of
            Appendix 11.
          </p>
        </div>
        <div className={cardCn}>
          <h3 className="mb-2 text-base font-semibold text-white">
            Reg 514.16.1 — presence of surge protective devices
          </h3>
          <p className="text-sm leading-relaxed text-white">
            Where SPDs are present, their presence shall be indicated by an information notice at or
            near the relevant distribution board(s). The exception for domestic (household) premises
            is conditional, not automatic: it applies where the information is instead recorded on
            the appropriate certification for initial verification, or on an Electrical Installation
            Condition Report, complete with the guidance for recipients detailed in Appendix 6, and
            issued to the person ordering the work. Omit the label in a house and leave it off the
            paperwork too, and the exception does not apply.
          </p>
        </div>
        <p>
          On an <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> covering an
          installation with solar PV, battery storage or SPDs, check for these notices and record
          their absence as an observation where the requirement applies.
        </p>
      </>
    ),
  },
  {
    id: 'sleeving-requirements',
    heading: 'Sleeving and Marking Requirements',
    content: (
      <>
        <p>
          Sleeving is how you satisfy Regulation 514.3.2 — every core identifiable at its
          terminations — when the factory insulation colour does not match the conductor&rsquo;s
          function. Binding and identification sleeves are to comply with BS 3858 where appropriate.
          Two applications account for almost all of it.
        </p>
        <div className={cardCn}>
          <h3 className="mb-2 text-base font-semibold text-white">Protective conductor sleeving</h3>
          <p className="text-sm leading-relaxed text-white">
            The bare copper protective conductor in twin and earth cable carries no colour of its
            own, so it is sleeved green-and-yellow at its terminations — at the consumer unit, at
            every junction box, and at every switch, socket and light fitting. The sleeving should
            run from the point where the conductor emerges from the cable sheath to the termination.
            Regulation 514.4.2 also fixes the proportions: one colour covers at least 30% and at
            most 70% of the surface being coloured, the other covers the remainder. Sleeving that is
            the wrong proportion fails on its own even when the colours are right. Missing
            protective conductor sleeving is one of the most common EICR findings.
          </p>
        </div>
        <div className={cardCn}>
          <h3 className="mb-2 text-base font-semibold text-white">Switch wire sleeving</h3>
          <p className="text-sm leading-relaxed text-white">
            In switch circuits wired in two-core and earth, the blue core (black in old wiring) is
            used as the switched line back from the switch to the light. It carries line voltage
            when the switch is on, so it is sleeved brown (red in old wiring) at its terminations so
            it is not read as a neutral. Missing switch-wire sleeving creates a polarity
            identification risk and is commonly raised as a C2 or C3 on an EICR, depending on
            accessibility and the rest of the installation.
          </p>
        </div>
        <p>
          Sleeving must be the correct colour, the correct size for the conductor, and fitted so it
          cannot slide or fall off. Heat-shrink gives a more secure fit than push-on PVC.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Conductor Identification Mistakes',
    content: (
      <>
        <p>
          Identification errors are among the most common EICR findings. These four account for most
          of them.
        </p>
        <div className={cardCn}>
          <h3 className="mb-2 text-base font-semibold text-white">
            Missing protective conductor sleeving
          </h3>
          <p className="text-sm leading-relaxed text-white">
            Bare copper conductors without green-and-yellow sleeving at terminations. Extremely
            common in older installations and in DIY work. Typically coded C3.
          </p>
        </div>
        <div className={cardCn}>
          <h3 className="mb-2 text-base font-semibold text-white">Missing switch wire sleeving</h3>
          <p className="text-sm leading-relaxed text-white">
            Blue or black cores used as switched lines without brown or red identification. A
            conductor carrying line voltage is presented as a neutral — a real risk to the next
            person in the ceiling rose. Typically C2 or C3 depending on circumstances.
          </p>
        </div>
        <div className={cardCn}>
          <h3 className="mb-2 text-base font-semibold text-white">Incorrect phase identification</h3>
          <p className="text-sm leading-relaxed text-white">
            Missing or wrong L1/L2/L3 identification in three-phase installations, leading to
            rotation errors, neutrals confused with lines, and dangerous voltage assumptions
            downstream.
          </p>
        </div>
        <div className={noteCn}>
          <h4 className="mb-2 font-bold text-white">Citing the deleted Reg 514.14</h4>
          <p className="text-sm leading-relaxed text-white">
            A mixed-colour installation with no caution notice at the{' '}
            <SEOInternalLink href="/consumer-unit-regulations">consumer unit</SEOInternalLink> is
            still worth raising, but 514.14 was deleted by BS 7671:2018+A2:2022 and citing it on an
            EICR is a defect in the report, not in the installation. Reference the On-Site Guide
            (Reg 6.12) recommendation instead.
          </p>
        </div>
        <SEOAppBridge
          title="20 Pair Colour Code UK Cable Guide"
          description="20 pair cable colour codes explained for UK electricians. BS 7671:2018+A4:2026 compliant identification. Quick reference chart and installation rules."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CableColourCodesPage() {
  return (
    <GuideTemplate
      title="3 Phase Cable Colours UK: Brown, Black, Grey"
      description="Harmonised three-phase: L1 brown, L2 black, L3 grey, neutral blue, earth green/yellow. Old UK was red, yellow, blue. Plus single-phase and mixed colours."
      datePublished="2025-05-15"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Essential Reference"
      badgeIcon={Palette}
      heroTitle={
        <>
          Cable Colour Codes UK
          <br />
          <span className="text-yellow-400">Complete Reference for Electricians</span>
        </>
      }
      heroSubtitle="Every UK cable colour code in one reference — current harmonised colours, old UK colours, three-phase identification, flex colours, and BS 7671 requirements. Includes EICR observation guidance for common identification defects."
      readingTime={11}
      answerBox={{
        question: 'What are the current UK cable colours?',
        answer:
          'Under Table 51 of BS 7671 (identification per Reg 514.3): single-phase — line brown, neutral blue, protective conductor green-and-yellow. Three-phase — L1 brown, L2 black, L3 grey, with a blue neutral and green-and-yellow earth. The old pre-2004 colours (red line, black neutral; red, yellow and blue for L1, L2 and L3) are still in service. The trap is blue: it was L3 then, and it is the neutral now.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Identify Cable Colours with AI Board Scanner"
      ctaSubheading="Elec-Mate's board scanner identifies cable colours from consumer unit photographs, flags missing sleeving, and auto-populates circuit data. Join 1,000+ UK electricians. 7-day free trial."
    />
  );
}
