import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Search,
  ClipboardCheck,
  PoundSterling,
  Scale,
  GraduationCap,
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

const warnCardCn =
  '-mx-4 rounded-none border-y border-orange-500/30 bg-orange-500/10 p-4 ' +
  'sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const goodCardCn =
  '-mx-4 rounded-none border-y border-green-500/25 bg-green-500/10 p-4 ' +
  'sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const tableWrapCn =
  '-mx-4 my-5 overflow-x-auto border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x';

const thCn = 'px-4 py-3 text-left text-[13px] font-semibold text-white whitespace-nowrap';
const tdCn = 'px-4 py-3 align-top text-sm text-white';
const cardTitleCn = 'text-[15px] font-semibold tracking-tight text-white';
const listCn = 'mt-3 space-y-2.5 text-sm leading-relaxed text-white';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Certificates', href: '/guides/electrical-certificate-types-uk' },
  { label: 'EICR Limitations', href: '/guides/eicr-limitations' },
];

const tocItems = [
  { id: 'section-d', label: 'Section D at a Glance' },
  { id: 'agreed-vs-operational', label: 'Agreed vs Operational Limitations' },
  { id: 'default-exclusions', label: 'Limitations Already Printed on the Form' },
  { id: 'extent-of-inspection', label: 'Extent of the Inspection' },
  { id: 'sampling', label: 'Sampling: Why Not Every Circuit Is Tested' },
  { id: 'concealed-wiring', label: 'Concealed Wiring' },
  { id: 'what-eicr-does-not-cover', label: 'What the EICR Does Not Cover' },
  { id: 'recording-limitations', label: 'Recording Limitations Correctly' },
  { id: 'common-limitations', label: 'Common Limitation Examples' },
  { id: 'for-electricians', label: 'For Electricians: Getting It Right' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Limitations go in Section D of the Electrical Installation Condition Report — "Extent and limitations of inspection and testing". Regulation 653.2 requires the report to state both (a) details of those parts of the installation that have been inspected and tested and (b) any limitations of the inspection and testing.',
  'There are two kinds. Agreed limitations are scope exclusions confirmed with the person ordering the report (and other interested parties) before the inspection. Operational limitations are the things that stopped you on the day — no access to part of the installation or to an item of equipment.',
  'The model form already carries its own default exclusions: unless specifically agreed beforehand, cables concealed in conduit and trunking, under floors, in roof spaces, generally within the building fabric or underground have not been inspected, and no checks are made for safety alerts, corrective actions or product recalls.',
  'Regulation 651.2 sets the method: periodic inspection is carried out without dismantling, or with partial dismantling as required, supplemented by appropriate tests from Chapter 64. Lifting floors and opening up concealed areas is extra work that has to be agreed.',
  'Intake equipment is not excluded — it is inspected visually only. Service cable, service head, earthing arrangement, meter tails and metering equipment get a visual check, and an outcome against that section (other than access to live parts) does not determine the overall satisfactory/unsatisfactory result.',
  'Sampling is a GN3 obligation, not a negotiation. GN3 Chapter 8 Reg 8.2 requires the sampling plan to be justified by risk assessment and documented in the Schedule of Inspections and Schedule of Test Results.',
  'A4:2026 changed how a limitation-driven FI lands. The summary of changes for Appendix 6 states that the code FI no longer needs to be marked as unsatisfactory — an observation coded C3 or FI does not affect the overall assessment, which turns on C1 and C2.',
];

const faqs = [
  {
    question: 'Why does the EICR have a "limitations" section?',
    answer:
      'Because no periodic inspection can examine every part of an electrical installation. Regulation 651.2 states that periodic inspection is carried out without dismantling, or with partial dismantling as required, supplemented by appropriate tests and measurements from Chapter 64. Some wiring is buried in walls, above ceilings or under floors; some areas are behind furniture, locked, or unsafe to reach. Regulation 653.2 requires the report to include both details of those parts of the installation that have been inspected and tested and any limitations of the inspection and testing. Those entries go in Section D of the model Electrical Installation Condition Report in Appendix 6. Without them, a reader could assume the whole installation was examined and found satisfactory when parts of it were never assessed.',
  },
  {
    question: 'What is the difference between agreed and operational limitations?',
    answer:
      'An agreed limitation is a scope exclusion settled before the inspection starts. The notes for the person producing the report state that any agreed limitations, including the reasons for them, that have been confirmed with the person ordering the report and other interested parties are to be recorded in Section D. Guidance for recipients names typical interested parties as a licensing authority, insurance company, mortgage provider and the like. An operational limitation is something encountered on the day: the same notes give the example of inability to gain access to parts of the installation or an item of equipment. Both go in Section D, in their own boxes, each with its reason.',
  },
  {
    question: 'Does a limitation mean the EICR is incomplete?',
    answer:
      'No. Limitations are a normal and expected part of every EICR — the model form prints a set of default ones before you write anything. A well-recorded set of limitations shows the inspector has documented what they could and could not assess. An EICR with nothing at all in Section D is more concerning. The report is complete when everything within the agreed extent has been inspected and tested and anything outside it is clearly recorded. That said, if a limitation is significant — the main consumer unit could not be accessed, for example — the client should understand that the report may not give a full picture and further work may be needed.',
  },
  {
    question: 'Can I ask the electrician to lift floorboards and check concealed wiring?',
    answer:
      'Yes, but it has to be agreed in advance. Regulation 651.2 sets periodic inspection as being carried out without dismantling, or with partial dismantling as required — the inspector tests at accessible points (sockets, switches, distribution boards, junction boxes) and uses the results to infer the condition of the wiring between them. The model form makes this explicit: unless specifically agreed between the client and the inspector beforehand, cables concealed within trunking and conduit, under floors, in roof spaces and generally within the fabric of the building or underground have not been inspected. Lifting floors, removing ceiling panels or opening up trunking is additional work that takes longer and may involve making good, so it should be priced and agreed separately. It is normally warranted where the wiring is very old, where test results suggest a concealed fault, or where a previous report recommended it.',
  },
  {
    question: 'Does the EICR cover the supply authority equipment?',
    answer:
      'Partly — and the distinction matters. The Schedule of Inspections for a Condition Report includes a section headed "Intake equipment (visual inspection only)" covering the service cable, service head, earthing arrangement, meter tails and metering equipment. So these items are looked at, but not tested and not worked on. That section carries its own rule: an outcome against an item in it, other than access to live parts, should not be used to determine the overall outcome of the report. Where an inadequacy in the intake equipment might result in a dangerous or potentially dangerous situation, the person ordering the inspection and testing and/or the dutyholder must be informed, and it is strongly recommended that they inform the appropriate authority. Note also that the consumer\'s means of isolation and the consumer\'s meter tails are listed separately as part of the installation, so they are not covered by the intake-equipment carve-out.',
  },
  {
    question: 'Is PAT testing part of the EICR?',
    answer:
      'No. The EICR covers the fixed electrical installation — wiring, consumer unit, sockets, switches, light fittings, and permanently connected equipment such as cookers, immersion heaters and shower units. It does not cover portable or moveable equipment that plugs into the sockets. In-service inspection and testing of electrical equipment is a separate exercise with its own documentation. Electricians often offer it alongside an EICR, which is convenient for landlords, but they are distinct processes — if you need both, request both and expect separate paperwork for each.',
  },
  {
    question: 'What does an FI code actually mean under A4:2026?',
    answer:
      'In BS 7671:2018+A4:2026 the code reads "FI — Further investigation is advised". It is used where the inspection and testing has identified a potential issue for which the inspector is unable to determine a classification code until further investigation has taken place. The notes for the person producing the report tie it directly to this page\'s subject: where further investigation is advised because the inspection has identified an issue the inspector is unable to verify due to the extent and limitations, it is to be recorded in Section K as FI. This is where A4:2026 made a real change. The summary of changes for Appendix 6 states that the notes for the person producing the condition report have been redrafted and that the code FI no longer needs to be marked as unsatisfactory. The model form now states that observations classified C3 or FI do not affect the overall assessment, and the installation is reported as unsatisfactory where an observation is given a C1 or C2 classification. So an FI is not a finding of danger — it is an open question, and the guidance recommends that further investigations are carried out to obtain the information the inspector needs to reach a conclusion on the appropriate classification code.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone with AI board scanning and voice test entry.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description: 'In-depth guide to C1, C2, C3, and FI classification codes with real examples.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/how-to-fill-in-eicr',
    title: 'How to Fill In an EICR',
    description: 'Step-by-step guide to completing every section of the EICR form correctly.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Legal requirements, penalties, and landlord obligations for EICR compliance.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-cost-uk',
    title: 'EICR Cost UK 2026',
    description: 'Average EICR prices by property type and what to charge as an electrician.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/inspection-testing-course',
    title: 'Inspection & Testing Course',
    description: 'Study for C&G 2391 with structured training content on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'section-d',
    heading: 'Section D at a Glance: The Four Boxes You Have to Fill',
    content: (
      <>
        <p>
          Limitations are not free text bolted onto the end of an EICR. They live in a named part of
          the model form: <strong>Section D — Extent and limitations of inspection and testing</strong>
          , which the form itself cross-references to Regulation 651. Section D has four entries, and
          each one wants something different.
        </p>
        <div className={tableWrapCn}>
          <table className="w-full border-collapse text-left">
            <thead className="bg-white/[0.06]">
              <tr>
                <th className={thCn}>Section D entry</th>
                <th className={thCn}>What belongs in it</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className={tdCn}>
                  Details of those parts of the installation that have been inspected and tested
                </td>
                <td className={tdCn}>
                  The extent. Which distribution boards, which circuits, which parts of the premises,
                  and whether the whole installation or only part of it is covered.
                </td>
              </tr>
              <tr>
                <td className={tdCn}>Agreed limitations including the reasons</td>
                <td className={tdCn}>
                  Scope the client chose to exclude, settled before the inspection began — plus why.
                </td>
              </tr>
              <tr>
                <td className={tdCn}>Agreed with</td>
                <td className={tdCn}>
                  Who signed off those exclusions. Not optional, and not you.
                </td>
              </tr>
              <tr>
                <td className={tdCn}>Operational limitations including the reasons</td>
                <td className={tdCn}>
                  What stopped you on the day: no access to a part of the installation or to an item
                  of equipment — plus why.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The requirement behind the form is Regulation 653.2. It states that the Report shall
          include (a) details of those parts of the installation that have been inspected and tested
          and (b) any limitations of the inspection and testing. Regulation 653.1 requires the report
          to be based on the model given in{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>{' '}
          Appendix 6, taking account of the notes for the person producing the report. Section D is
          not housekeeping — it is what the declaration in Section G is qualified by, because the
          inspector declares the report to be an accurate assessment of the installation{' '}
          <em>taking into account the stated extent and limitations in Section D</em>.
        </p>
        <div className={plainCardCn}>
          <h3 className={cardTitleCn}>What A4:2026 changed here</h3>
          <ul className={listCn}>
            <li>
              Regulation 653.1 now requires the notes for the person producing the report, provided
              in Appendix 6, to be taken into account on the Condition Report.
            </li>
            <li>
              Regulation 653.2 now requires the report to include guidance for the recipient(s) based
              on the model in Appendix 6, and a note has been added that photographic and/or
              thermographic images can be appended to the report — useful evidence where a limitation
              stopped you getting closer.
            </li>
            <li>
              The Appendix 6 notes for the person producing the condition report have been redrafted
              and items rearranged, and{' '}
              <strong>the code FI no longer needs to be marked as unsatisfactory</strong>.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'agreed-vs-operational',
    heading: 'Agreed vs Operational Limitations',
    content: (
      <>
        <p>
          The two boxes are not interchangeable, and putting an entry in the wrong one weakens it.
          The difference is <strong>when it was settled and who agreed it</strong>.
        </p>
        <div className={tableWrapCn}>
          <table className="w-full border-collapse text-left">
            <thead className="bg-white/[0.06]">
              <tr>
                <th className={thCn}></th>
                <th className={thCn}>Agreed limitation</th>
                <th className={thCn}>Operational limitation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className={thCn}>Settled</td>
                <td className={tdCn}>Before the inspection is carried out</td>
                <td className={tdCn}>Encountered during the inspection</td>
              </tr>
              <tr>
                <td className={thCn}>Confirmed with</td>
                <td className={tdCn}>
                  The person ordering the report and other interested parties — a licensing
                  authority, insurance company, mortgage provider and the like
                </td>
                <td className={tdCn}>
                  Nobody in advance. The inspector records it and the reason for it
                </td>
              </tr>
              <tr>
                <td className={thCn}>Typical entry</td>
                <td className={tdCn}>
                  "Inspection limited to the landlord&apos;s communal installation; tenant demises
                  excluded at client&apos;s instruction."
                </td>
                <td className={tdCn}>
                  "Garage sub-board not tested — garage locked, key not available at the time of
                  inspection."
                </td>
              </tr>
              <tr>
                <td className={thCn}>Common mistake</td>
                <td className={tdCn}>Left blank, or filled in after the event</td>
                <td className={tdCn}>Written without the reason, which is what makes it useful</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The extent of the installation covered by the report is also to be agreed before the
          inspection and testing is undertaken — not decided afterwards to match what you managed to
          reach.
        </p>
      </>
    ),
  },
  {
    id: 'default-exclusions',
    heading: 'The Limitations Already Printed on the Form',
    content: (
      <>
        <p>
          Before you write anything, the model Condition Report already excludes certain things. The
          agreed-limitations box carries pre-printed wording that applies{' '}
          <strong>unless specifically agreed between the client and inspector prior to the
          inspection</strong>:
        </p>
        <div className={cardCn}>
          <h3 className={cardTitleCn}>Printed default exclusions</h3>
          <ul className={listCn}>
            <li>
              Cables concealed within trunking and conduits, under floors, in roof spaces, and
              generally within the fabric of the building or underground, have not been inspected.
            </li>
            <li>
              No checks for safety alerts, corrective actions or product recalls for electrical
              equipment forming part of the installation have been made.
            </li>
            <li>
              An inspection should be made of other electrical equipment housed within an accessible
              roof space.
            </li>
          </ul>
        </div>
        <p>
          This is why repeating "concealed wiring not inspected" in your own words adds nothing — it
          is already there. What earns its place in Section D is anything{' '}
          <em>beyond</em> the printed defaults, or anything that narrows them further.
        </p>
        <h3 className={cardTitleCn}>The Schedule of Inspections points back at Section D</h3>
        <p>
          Two items on the Condition Report Schedule of Inspections explicitly refer the reader to
          Section D, because they cannot be answered without knowing what you could see:
        </p>
        <div className={plainCardCn}>
          <ul className={listCn}>
            <li>
              <strong>Concealed cables installed in prescribed zones</strong> (see Section D, Extent
              and limitations) — Regulation 522.6.202.
            </li>
            <li>
              <strong>
                Cables concealed under floors, above ceilings or in walls/partitions, adequately
                protected against damage
              </strong>{' '}
              (see Section D, Extent and limitations) — Regulation 522.6.204.
            </li>
          </ul>
        </div>
        <p>
          If Section D says the concealed cabling was not inspected, those two items cannot honestly
          be marked as verified. The two documents have to agree with each other.
        </p>
      </>
    ),
  },
  {
    id: 'extent-of-inspection',
    heading: 'Extent of the Inspection: What Is Covered',
    content: (
      <>
        <p>
          A standard EICR covers the fixed electrical installation from the origin to the final
          circuits and accessories. Regulation 651.2 sets the method: periodic inspection is carried
          out <strong>without dismantling, or with partial dismantling as required</strong>,
          supplemented by appropriate tests and measurements from Chapter 64.
        </p>
        <div className={cardCn}>
          <ul className={listCn}>
            <li>
              <strong>Consumer unit / distribution board.</strong> Condition, labelling, protective
              devices (MCBs, RCDs, RCBOs), main switch, connections.
            </li>
            <li>
              <strong>Earthing and bonding.</strong> Main earth terminal, earthing conductor, main
              protective bonding conductors, supplementary bonding where applicable.
            </li>
            <li>
              <strong>Final circuits.</strong> Wiring to socket-outlets, lighting circuits, cooker
              circuits, shower circuits, and any other final circuits.
            </li>
            <li>
              <strong>Accessories.</strong> Socket-outlets, switches, light fittings, connection
              units, and other fixed electrical equipment.
            </li>
            <li>
              <strong>Permanently connected equipment.</strong> Cookers, immersion heaters, electric
              showers, towel rails and other fixed appliances.
            </li>
            <li>
              <strong>Consumer&apos;s means of isolation and consumer&apos;s meter tails.</strong>{' '}
              Listed as installation items on the Schedule of Inspections, separately from the
              distributor&apos;s intake equipment.
            </li>
          </ul>
        </div>
        <h3 className={cardTitleCn}>Two checkpoints that catch people out</h3>
        <p>
          Regulation 411.3.4 — introduced with BS 7671:2018 itself, not by a later amendment —
          requires that within domestic (household) premises, additional protection by an RCD with a
          rated residual operating current not exceeding 30 mA shall be provided for AC final
          circuits supplying luminaires. Regulation 421.1.7 covers arc fault detection devices, and
          the Schedule of Inspections carries a matching item: confirmation of indication that
          AFDD(s) are operational (421.1.7; 532.6; 651.2(e)).
        </p>
        <div className={warnCardCn}>
          <h3 className={cardTitleCn}>
            An older installation is not automatically unsatisfactory
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white">
            The notes for the person producing the report are explicit: an installation which was
            designed to an earlier version of BS 7671 or the IEE Wiring Regulations, and which does
            not fully comply with the current version, is not necessarily unsafe for continued use or
            in need of upgrading. What is to be recorded is damage, deterioration, defects, dangerous
            conditions and non-compliances which might give rise to danger. So a pre-A4 lighting
            circuit without 30 mA RCD protection is an observation to be classified on its risk — not
            an automatic fail.
          </p>
        </div>
        <p>
          The extent entry should specify which circuits were tested, how many distribution boards
          were inspected, and whether the inspection covered the whole installation or a defined part
          of it.
        </p>
      </>
    ),
  },
  {
    id: 'sampling',
    heading: 'Sampling: Why Not Every Circuit Is Tested',
    content: (
      <>
        <p>
          On larger installations — particularly commercial premises with many circuits — testing
          every circuit and accessory is not always practical. The inspector then uses a sampling
          approach, tests a representative proportion, and records what was sampled.
        </p>
        <p>
          Guidance Note 3 Chapter 8 Reg 8.2 describes sampling as the procedure where, for groups of
          similar circuits, not all are tested if an appropriate sampling plan is justified. The
          conditions attached to it are the part people skip: sampling{' '}
          <strong>shall be documented, justified by risk assessment</strong>, and the details
          included in the Schedule of Inspections and Schedule of Test Results. It is not a
          percentage you negotiate over the phone.
        </p>
        <div className={cardCn}>
          <h3 className={cardTitleCn}>Sampling that will stand up</h3>
          <ul className={listCn}>
            <li>
              Do the risk assessment first and document the justification in the Schedule of
              Inspections and Schedule of Test Results (GN3 Ch 8 Reg 8.2).
            </li>
            <li>
              Agree the approach with the client before starting, and record it in Section D as an
              agreed limitation.
            </li>
            <li>
              Choose a representative sample — different circuit types, ages and locations, not the
              four easiest ways to reach.
            </li>
            <li>
              If a sampled circuit shows a defect, increase the sample for that circuit type to
              establish whether the issue is widespread.
            </li>
            <li>
              Record which circuits were tested and which were not. GN3 also asks for the extent and
              location of sampling of cable terminations to be stated in Section D.
            </li>
          </ul>
        </div>
        <p>
          "10% sample of lighting circuits tested — circuits 4, 7 and 11 of 30" is informative.
          "Sampling applied" is not a limitation, it is a shrug.
        </p>
      </>
    ),
  },
  {
    id: 'concealed-wiring',
    heading: 'Concealed Wiring: The Biggest Limitation',
    content: (
      <>
        <p>
          The most significant limitation on any EICR is concealed wiring. In most properties, the
          majority of the cabling is hidden — buried in walls, run under floorboards, routed through
          ceiling voids, or enclosed in trunking. During a standard EICR the inspector cannot see it,
          and the model form says so before you do.
        </p>
        <p>
          Instead, the inspector infers condition from test results. Insulation resistance testing at
          500 V DC (Table 64, minimum 1.0 MΩ for circuits up to and including 500 V) can reveal
          degraded insulation. Continuity testing can find broken or high-resistance conductors.
          Earth fault loop impedance testing can expose problems with the protective conductor. None
          of these detects physical damage to cable sheathing, a non-compliant cable route, or
          mechanical damage that has not yet changed the electrical properties.
        </p>
        <div className={cardCn}>
          <h3 className={cardTitleCn}>What a concealed-wiring limitation actually means</h3>
          <ul className={listCn}>
            <li>
              The wiring behind walls, under floors and above ceilings has not been visually
              inspected.
            </li>
            <li>
              Results for concealed circuits come from measurements taken at accessible points —
              sockets, switches, distribution boards.
            </li>
            <li>
              Physical damage, incorrect installation methods or non-compliant cable routes may exist
              and cannot be identified without opening up.
            </li>
            <li>
              Where test results suggest a concealed fault the inspector cannot classify, that is
              exactly the case for an FI — further investigation is advised.
            </li>
          </ul>
        </div>
        <h3 className={cardTitleCn}>Insulation resistance where equipment cannot be disconnected</h3>
        <p>
          Regulation Group 643.3 was redrafted at A2:2022 and the requirement is a two-stage test,
          not a reduced one. Under Regulation 643.3.3, where connected equipment is likely to
          influence the measurement or result of the test, or be damaged, the test shall be applied{' '}
          <strong>prior to the connection of such equipment</strong>, in accordance with Table 64.
          Following connection of the equipment, a test at <strong>250 V DC</strong> shall be applied
          between live conductors and the protective conductor connected to the earthing arrangement,
          and the insulation resistance shall be at least <strong>1 MΩ</strong>.
        </p>
        <p>
          So the 250 V test does not replace the Table 64 test, and its acceptance threshold is not
          lower than the 1.0 MΩ that Table 64 sets for low voltage circuits. Where you could only
          perform the second stage — because the equipment was already connected and could not be
          taken out — that is a limitation and belongs in Section D, for example: "IR at 250 V DC
          with equipment connected; sensitive electronics on lighting circuit 3 could not be
          disconnected."
        </p>
        <p>
          For most properties, accepting the concealed-wiring limitation is reasonable. Where the
          wiring is very old, where there is a history of electrical problems, or where a previous
          report reported overheating, the client may want to commission invasive inspection of
          specific areas.
        </p>
      </>
    ),
  },
  {
    id: 'what-eicr-does-not-cover',
    heading: 'What the EICR Does Not Cover',
    content: (
      <>
        <p>
          Knowing what falls outside the scope matters as much as knowing what is inside it — and one
          of these is more nuanced than the usual shorthand suggests.
        </p>
        <div className={tableWrapCn}>
          <table className="w-full border-collapse text-left">
            <thead className="bg-white/[0.06]">
              <tr>
                <th className={thCn}>Item</th>
                <th className={thCn}>EICR position</th>
                <th className={thCn}>What is needed instead</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className={tdCn}>Portable and moveable appliances</td>
                <td className={tdCn}>
                  Out of scope. Anything that plugs into a socket is not part of the fixed
                  installation
                </td>
                <td className={tdCn}>
                  Separate{' '}
                  <SEOInternalLink href="/guides/pat-testing-guide-uk">
                    in-service inspection and testing
                  </SEOInternalLink>
                </td>
              </tr>
              <tr>
                <td className={tdCn}>Gas installations</td>
                <td className={tdCn}>Out of scope entirely</td>
                <td className={tdCn}>
                  A Gas Safe registered engineer and a separate gas safety record
                </td>
              </tr>
              <tr>
                <td className={tdCn}>
                  Distributor&apos;s intake equipment — service cable, service head, earthing
                  arrangement, meter tails, metering equipment
                </td>
                <td className={tdCn}>
                  <strong>Visual inspection only.</strong> An outcome against this section, other
                  than access to live parts, does not determine the overall outcome of the report
                </td>
                <td className={tdCn}>
                  Report inadequacies to the person ordering the work and/or dutyholder; they are
                  strongly advised to inform the appropriate authority
                </td>
              </tr>
              <tr>
                <td className={tdCn}>Telephone, data and TV cabling</td>
                <td className={tdCn}>
                  Out of scope. These are extra-low voltage (Band I) circuits, not the low voltage
                  (Band II) installation BS 7671 is inspecting here
                </td>
                <td className={tdCn}>
                  Only the mains-powered part — a powered amplifier or PoE source, for example — is
                  in scope
                </td>
              </tr>
              <tr>
                <td className={tdCn}>Fire detection and alarm systems</td>
                <td className={tdCn}>
                  Presence may be noted; the EICR is not a system assessment
                </td>
                <td className={tdCn}>Inspection to BS 5839-1 by a competent person</td>
              </tr>
              <tr>
                <td className={tdCn}>Emergency lighting</td>
                <td className={tdCn}>Presence may be noted; not an emergency lighting test</td>
                <td className={tdCn}>Inspection and testing to BS 5266</td>
              </tr>
              <tr>
                <td className={tdCn}>Structural and building fabric issues</td>
                <td className={tdCn}>
                  Water ingress, damp and insulation are noted where they affect the installation
                </td>
                <td className={tdCn}>A building surveyor for a full assessment</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          If you are a landlord or property manager, commission the right inspection for each system.
          An EICR alone does not cover everything, and the intake-equipment line is the one most
          often misread in both directions — it is inspected, but it is not tested and it does not
          drive the overall result.
        </p>
      </>
    ),
  },
  {
    id: 'recording-limitations',
    heading: 'Recording Limitations Correctly on the EICR',
    content: (
      <>
        <p>
          Recording limitations is a professional skill. Generic statements do not serve the purpose.
          Every entry should name the thing, name the place, and give the reason.
        </p>
        <div className="my-5 grid gap-4 sm:grid-cols-2">
          <div className={warnCardCn}>
            <h3 className={cardTitleCn}>Poor entries</h3>
            <ul className={listCn}>
              <li>&quot;Limited inspection.&quot;</li>
              <li>&quot;Some areas not accessed.&quot;</li>
              <li>&quot;Non-invasive inspection only.&quot;</li>
              <li>&quot;As per standard limitations.&quot;</li>
              <li>&quot;Concealed wiring not inspected&quot; — already pre-printed on the form.</li>
            </ul>
          </div>
          <div className={goodCardCn}>
            <h3 className={cardTitleCn}>Entries that do the job</h3>
            <ul className={listCn}>
              <li>
                &quot;Loft space not accessed — hatch obstructed by fitted wardrobe in bedroom
                2.&quot;
              </li>
              <li>
                &quot;Ground floor under-floor wiring not visually inspected — solid floor, no
                access.&quot;
              </li>
              <li>
                &quot;Garage sub-board not tested — garage locked, key not available at time of
                inspection.&quot;
              </li>
              <li>
                &quot;Distribution board 2 inspected externally only — cover secured by tamper-proof
                fixings, no key on site.&quot;
              </li>
            </ul>
          </div>
        </div>
        <p>
          The second column tells the reader exactly what was excluded and why. That matters for
          accountability: if a fault later develops in an area recorded as a limitation, Section D
          shows it was outside the inspection, and the Section G declaration is expressly qualified
          by it.
        </p>
        <SEOAppBridge
          title="Get the limitations section right first time"
          description="Elec-Mate prompts you to record the extent and limitations as you work through the EICR. Pre-populated options for common limitations…"
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'common-limitations',
    heading: 'Common Limitation Examples by Property Type',
    content: (
      <>
        <p>The limitations you meet vary by property type. Common ones:</p>
        <div className="my-5 space-y-4">
          <div className={plainCardCn}>
            <h3 className={cardTitleCn}>Domestic properties</h3>
            <ul className={listCn}>
              <li>
                Furniture not moved — sockets behind heavy wardrobes, beds or kitchen units not
                accessed.
              </li>
              <li>
                Loft wiring not visually inspected — insufficient boarding, or insulation covering
                cables.
              </li>
              <li>
                Under-floor wiring not inspected — solid floors, or fully carpeted timber floors.
              </li>
              <li>Outbuildings not included — separate supply, not part of this installation.</li>
            </ul>
          </div>
          <div className={plainCardCn}>
            <h3 className={cardTitleCn}>Commercial properties</h3>
            <ul className={listCn}>
              <li>Sampling applied — 20% of lighting circuits, 100% of socket circuits tested.</li>
              <li>
                Ceiling void wiring not visually inspected — suspended ceiling tiles not removed.
              </li>
              <li>Server room circuits not tested — could not be isolated during business hours.</li>
              <li>
                Three-phase distribution not tested — main isolator could not be operated during
                trading hours.
              </li>
            </ul>
          </div>
          <div className={plainCardCn}>
            <h3 className={cardTitleCn}>Houses in multiple occupation</h3>
            <ul className={listCn}>
              <li>
                Tenant rooms 3 and 5 not accessed — tenants not available at time of inspection.
              </li>
              <li>Communal under-stair cupboard locked — key not provided.</li>
              <li>
                External lighting circuit to rear not tested — area inaccessible due to overgrown
                vegetation.
              </li>
            </ul>
          </div>
          <div className={warnCardCn}>
            <h3 className={cardTitleCn}>AFDDs — what Regulation 421.1.7 actually says</h3>
            <p className="mt-2 text-sm leading-relaxed text-white">
              Arc fault detection devices conforming to BS EN 62606 shall be provided for{' '}
              <strong>single-phase AC</strong> final circuits supplying socket-outlets with a rated
              current not exceeding 32 A in four categories of premises: high rise residential
              buildings (HRRBs), houses in multiple occupation (HMOs), purpose-built student
              accommodation, and care homes. A note assumes HRRBs to be residential buildings over 18
              m in height or in excess of six storeys, whichever is met first. For all other premises
              the use of AFDDs is <strong>recommended</strong>, not required. Where used, AFDDs shall
              be placed at the origin of the circuit to be protected. The requirement in those four
              premises dates from A2:2022; A4:2026 changed sub-item (a) to read &quot;high rise
              residential buildings&quot;, so a report or template still saying &quot;higher risk
              residential buildings&quot; is using superseded wording.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white">
              On an EICR of an existing installation in one of the four categories, absence of AFDDs
              is a non-compliance with the current version of BS 7671 to be classified on the danger
              it presents — read alongside the note that an installation designed to an earlier
              version is not necessarily unsafe for continued use.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Getting Limitations Right',
    content: (
      <>
        <p>
          Recording extent and limitations properly is one of the clearest markers of a competent
          inspector. It shows you thought about scope and were straight about what you could and
          could not assess.
        </p>
        <div className={cardCn}>
          <ul className={listCn}>
            <li>
              <strong>Agree the extent before you start.</strong> The extent of the installation
              covered by the report is to be agreed prior to the inspection and testing being
              undertaken. Whole installation or defined part? Known access restrictions? Will someone
              be there to move furniture and provide keys?
            </li>
            <li>
              <strong>Record limitations as you go.</strong> Do not try to reconstruct them at the
              van. Log each one at the moment you hit it, with the reason.
            </li>
            <li>
              <strong>Put each entry in the right box.</strong> Agreed limitations were confirmed
              beforehand and need a name in &quot;Agreed with&quot;. Operational limitations were
              encountered on the day.
            </li>
            <li>
              <strong>Keep Section D and the Schedule of Inspections consistent.</strong> The
              concealed-cable items on the schedule refer back to Section D — they cannot say
              &quot;verified&quot; if Section D says you never saw them.
            </li>
            <li>
              <strong>Use FI where the limitation blocks a classification.</strong> FI is for a
              potential issue where you cannot determine a code until further investigation has taken
              place — which is precisely what a limitation produces.
            </li>
            <li>
              <strong>Talk the client through it.</strong> Explain what each limitation means in
              practice at handover, and what further investigation would involve.
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Record extent and limitations as you inspect"
          description="Elec-Mate walks you through the extent and limitations section as part of the EICR workflow. Common limitation templates plus free text…"
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRLimitationsPage() {
  return (
    <GuideTemplate
      title="EICR Limitations: Operational vs Agreed Examples"
      description="Operational limitations are what couldn't be switched off or accessed; agreed limitations are the scope the client chose. Section D wording and examples."
      datePublished="2025-03-20"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Limitations:{' '}
          <span className="text-yellow-400">What the Report Does and Does Not Cover</span>
        </>
      }
      heroSubtitle="Every EICR has a Section D — extent and limitations of inspection and testing. This guide sets out what goes in each of its four boxes, the difference between agreed and operational limitations, the exclusions already printed on the model form, and how to word an entry that will stand up."
      readingTime={12}
      answerBox={{
        question: 'What are limitations on an EICR?',
        answer:
          'Limitations are the parts of the installation the inspector did not or could not inspect and test, recorded in Section D of the Electrical Installation Condition Report — "Extent and limitations of inspection and testing". Regulation 653.2 requires the report to include both details of those parts that have been inspected and tested and any limitations of the inspection and testing. There are two kinds: agreed limitations, which are scope exclusions confirmed with the person ordering the report before the inspection, and operational limitations, such as an inability to gain access to parts of the installation or an item of equipment on the day. Both must be recorded with the reason.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICR Limitations"
      relatedPages={relatedPages}
      ctaHeading="Complete Professional EICRs on Your Phone"
      ctaSubheading="AI board scanning, voice test entry, structured extent and limitations recording, and instant PDF delivery. Join 1,000+ electricians doing EICRs the smart way. 7-day free trial."
    />
  );
}
