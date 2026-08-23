import { ArrowLeft, PenTool, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Engineering Drawing Conventions - MOET Module 6 Section 1.1';
const DESCRIPTION =
  'Why standardised engineering drawings exist, the drawing types a maintenance technician meets, line types, title blocks, revision control, scales, projection awareness, drawing registers, red-lining discipline and IEC 60617 electrical symbols.';

const quickCheckQuestions = [
  {
    id: 'why-conventions',
    question: 'Why are engineering drawing conventions standardised across the industry?',
    options: [
      'So that any competent person can read a drawing produced by someone else, at a different time, in a different organisation, and arrive at the same understanding',
      'So that drawing offices can charge a standard rate for each sheet they produce',
      'So that every drawing can be printed on the same size of paper regardless of content',
      'So that only the original designer is able to interpret the information correctly',
    ],
    correctIndex: 0,
    explanation:
      'A drawing is a contract between the person who designed the installation and everyone who later builds, commissions, maintains or decommissions it. Standard conventions — agreed line types, symbols, projection methods, title block content and revision marking — remove personal interpretation, so the drawing means the same thing to a designer in 2019 and a maintenance technician in 2031. Without that shared language, every drawing would need a translator.',
  },
  {
    id: 'which-drawing',
    question:
      'You need to find which terminal number a motor thermistor lands on inside a control panel. Which drawing do you reach for?',
    options: [
      'The single-line diagram, because it shows the whole distribution system on one sheet',
      'The layout drawing, because it shows where the panel sits in the building',
      'The wiring or connection diagram, because it shows physical terminal numbers, cable references and core identification',
      'The P&ID, because it shows the process the motor is driving',
    ],
    correctIndex: 2,
    explanation:
      'Schematic and circuit diagrams show how a circuit functions; they deliberately ignore physical position. Wiring or connection diagrams show the installed reality — terminal rail numbers, terminal numbers, cable references, core numbers and gland positions. When the question is "which screw does this core go under", the connection diagram is the document that answers it.',
  },
  {
    id: 'superseded-revision',
    question: 'Why is working to a superseded revision of a drawing dangerous?',
    options: [
      'The older sheet is usually printed at a smaller scale and is harder to read',
      'The drawing office charges a fee each time an obsolete sheet is reissued',
      'Superseded drawings are always drawn in third angle projection instead of first angle',
      'The installation has since been changed, so the drawing no longer describes what is actually there — a way shown as spare may now be live, and a circuit shown as isolated may now be fed from a second source',
    ],
    correctIndex: 3,
    explanation:
      'A drawing is only a record of the installation at the moment the revision was issued. Every modification after that point is captured on a later revision. If you plan an isolation, a test or a modification from a superseded sheet you are planning against an installation that no longer exists — which is how technicians open enclosures expecting dead busbars and find them live.',
  },
  {
    id: 'iec-60617',
    question:
      'Which standard supplies the graphical symbols used in electrical diagrams referenced by BS 7671:2018+A4:2026?',
    options: [
      'BS EN 60617, which remains the current source of electrotechnical diagram symbols',
      'IEC 60617, maintained as a central online database — the earlier British Standard symbol publications were withdrawn',
      'BS 8888, which defines both mechanical drawing practice and every electrical symbol',
      'BS EN ISO 7010, which defines all diagram symbols as well as safety signage',
    ],
    correctIndex: 1,
    explanation:
      'Regulation 514.9.1 of BS 7671:2018+A4:2026 requires that any symbol used in the diagrams, charts, tables or schedules provided with an installation complies with IEC 60617. The older British Standard symbol publications, including BS EN 60617, were withdrawn and the IEC 60617 database is now the source for electrotechnical symbols. BS 8888 governs technical product documentation and drawing practice generally; BS EN ISO 7010 covers safety signs, not diagram symbols.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The primary purpose of an engineering drawing convention is to:',
    options: [
      'Make drawings look consistent so that they are attractive to clients',
      'Remove ambiguity, so that the drawing carries the same meaning to every competent reader regardless of who produced it or when',
      'Reduce the number of sheets required for a project',
      'Allow the designer to keep the detail of the design confidential',
    ],
    correctAnswer: 1,
    explanation:
      'Conventions exist to remove personal interpretation. A standard line type, symbol set, projection method and title block mean that the reader does not have to guess what the author intended. On a maintenance job that certainty is a safety control, not a nicety.',
  },
  {
    id: 2,
    question:
      'A drawing that shows the function of a control circuit, laid out for ease of understanding rather than physical position, is a:',
    options: [
      'Layout or general arrangement drawing',
      'Wiring or connection diagram',
      'Schematic or circuit diagram',
      'Piping and instrumentation diagram',
    ],
    correctAnswer: 2,
    explanation:
      'A schematic (circuit) diagram explains how the circuit works. Contacts, coils, timers and interlocks are arranged to make the sequence readable — often as vertical rungs between supply rails — with no attempt to show where anything physically sits. It answers "what happens when this contact closes", not "where is it".',
  },
  {
    id: 3,
    question: 'A single-line diagram is best described as:',
    options: [
      'A distribution overview in which a multi-phase circuit is drawn as one line, showing sources, switchgear, protective devices, busbars and outgoing ways',
      'A drawing containing only one continuous line from supply to load',
      'A diagram limited to single-phase installations only',
      'A drawing of a single circuit on a single sheet',
    ],
    correctAnswer: 0,
    explanation:
      'On a single-line (one-line) diagram a three-phase circuit is represented by one line, so the sheet can show the whole distribution system: incomer, transformer, main switch, busbar, outgoing devices, ratings, cable sizes and downstream boards. It is the drawing you use to understand where a supply comes from and what upstream device protects it.',
  },
  {
    id: 4,
    question:
      'Regulation 514.9.1 of BS 7671:2018+A4:2026 requires that a diagram, chart or table (or equivalent information) is provided indicating, in particular:',
    options: [
      'The manufacturer and purchase price of every item of switchgear installed',
      'The type and composition of each circuit, the method used for compliance with Regulation 410.3.2, the information needed to identify devices performing protection, isolation and switching and their location, and any circuit or equipment vulnerable to the tests required by Part 6',
      'Only the number of circuits at each distribution board',
      'The names of every operative who worked on the installation',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 514.9.1 lists what the information must convey: circuit type and composition (points served, number and size of conductors, type of wiring), the method used for compliance with Regulation 410.3.2, identification and location of devices performing protection, isolation and switching, and any circuit or equipment vulnerable to the electrical tests required by Part 6. A4:2026 added an exception relating to domestic (household) premises — check the published wording before you rely on it.',
  },
  {
    id: 5,
    question: 'On an engineering drawing, a thin dashed line normally represents:',
    options: [
      'The outline of the object as seen from the front',
      'A hidden edge or outline — a feature that exists but cannot be seen from that viewing direction',
      'A dimension between two features',
      'The boundary of a hatched, sectioned area',
    ],
    correctAnswer: 1,
    explanation:
      'Thin dashed lines carry hidden detail: concealed cable routes, knockouts on a rear face, internal rails, buried conduit runs, rear-mounted terminal strips. For a maintenance technician, hidden detail is often the most valuable information on the sheet because it describes what you cannot see when you stand in front of the equipment.',
  },
  {
    id: 6,
    question: 'Information you would expect to find in a title block includes:',
    options: [
      'Drawing title, unique drawing number, revision letter or number, scale, projection symbol, sheet number, originator, checker and approver, date, and the client or project reference',
      'Only the drawing title and the name of the person who drew it',
      'A full parts list for every component shown, and nothing else',
      'The site risk assessment and method statement for the work shown',
    ],
    correctAnswer: 0,
    explanation:
      'The title block is the identity of the sheet. It tells you what the drawing is, which unique number it carries, which revision you are holding, at what scale it was drawn, which projection convention was used, who produced and approved it, and when. Every one of those fields is something you may need to prove later on a maintenance record.',
  },
  {
    id: 7,
    question: 'The revision table on a drawing exists to:',
    options: [
      'Record how many copies of the drawing have been printed',
      'List the alternative scales at which the drawing may be reproduced',
      'Record each issued change — revision reference, a description of what changed, the date and who authorised it — so the history of the drawing can be audited',
      'Note the personal preferences of the draughtsperson who created the sheet',
    ],
    correctAnswer: 2,
    explanation:
      'A revision table gives every issued change a reference, a description, a date and an authorising signature. It lets you answer two questions that matter on site: is this the current issue, and what changed since the version I last worked to. Changed areas are often flagged on the drawing with a revision cloud or a triangle carrying the revision letter.',
  },
  {
    id: 8,
    question: 'A drawing drawn to a scale of 1:50 means that:',
    options: [
      '1 mm on the drawing represents 50 mm on the real installation — the drawing is one fiftieth of full size',
      '50 mm on the drawing represents 1 mm on the real installation',
      'The drawing must be printed on 50 separate sheets',
      'The drawing is accurate only to within 50 mm',
    ],
    correctAnswer: 0,
    explanation:
      'A ratio of 1:50 is a reduction — 1 unit on paper equals 50 units in reality. Layout drawings for buildings are commonly 1:50 or 1:100; enclosure details may be 1:5 or 1:2; small components can be enlarged at 2:1. Never measure a printed sheet to obtain a dimension: prints stretch, photocopies rescale and PDF pages are often fitted to the page. Use the stated dimension, or measure the installation.',
  },
  {
    id: 9,
    question: 'The truncated cone symbol found in or near the title block tells you:',
    options: [
      'Whether the drawing is metric or imperial',
      'Whether the drawing is a schematic or a layout',
      'Whether the drawing uses first angle or third angle projection',
      'Whether the drawing has been approved for construction',
    ],
    correctAnswer: 2,
    explanation:
      'The projection symbol — a truncated cone shown in two views — identifies the convention used to arrange the views. First angle (the usual UK and European practice) places the plan below the front elevation and the right side view to the left of it; third angle (usual in North America) reverses those positions. Check the symbol before you interpret which side of an enclosure a feature is on.',
  },
  {
    id: 10,
    question: 'A drawing register is:',
    options: [
      'The controlled list of every drawing for an installation, giving the drawing number, title, current revision and status, so you can confirm you are holding the current issue',
      'The site book in which operatives sign to say they have received a toolbox talk',
      'A list of the drawing instruments issued to the drawing office',
      'The index of symbols used across a set of drawings',
    ],
    correctAnswer: 0,
    explanation:
      'The register is the master index. Before you work from a drawing, check the register: it tells you the current revision for that drawing number and its status (for example preliminary, for construction, as-built or superseded). If the sheet in your hand does not match the register, you have the wrong sheet.',
  },
  {
    id: 11,
    question: 'Red-lining (marking up an as-built change) should be carried out:',
    options: [
      'Only if the change is thought to be significant enough to matter',
      'At the end of the year, from memory, when the paperwork is caught up',
      'At the time of the change, on the current revision of the drawing, with the change clearly marked, dated and signed, and returned to whoever controls the drawings',
      'On any spare copy of the drawing that happens to be in the panel, without telling anyone',
    ],
    correctAnswer: 2,
    explanation:
      'Red-lining is only worth anything if it is done immediately, on the current revision, and returned into the document control system so the next revision can incorporate it. A mark-up made on a loose copy left in a panel is invisible to the next technician, and a mark-up made from memory weeks later is unreliable. Mark, date, sign, return.',
  },
];

const faqs = [
  {
    question: 'Do I really need to understand mechanical drawing conventions as an electrician?',
    answer:
      'Yes. A maintenance technician working to ST1426 is expected to read the documentation that comes with the plant, and that documentation is mixed. An enclosure general arrangement, a motor mounting detail, a cable tray support bracket and a gland plate drilling schedule are all mechanical drawings. If you cannot read a title block, a scale, a hidden detail line or a projection symbol, you cannot verify that a replacement item will physically fit, and you will end up drilling or cutting to find out.',
  },
  {
    question: 'What is the difference between a schematic diagram and a wiring diagram?',
    answer:
      'A schematic (circuit) diagram explains function. It shows contacts, coils, interlocks and control logic arranged so that the sequence of operation can be followed, usually with no relationship to physical position. A wiring (connection) diagram explains installation. It shows the actual terminals, terminal numbers, cable references, core numbers and routes, so that the circuit can be built, traced or reconnected exactly as designed. Fault finding usually needs both: the schematic to work out what should happen, the wiring diagram to find the physical point at which to test.',
  },
  {
    question: 'Why does a maintenance technician need to read a P&ID?',
    answer:
      'A piping and instrumentation diagram shows the process — vessels, pumps, valves, and the instruments that measure and control them. Electrical maintenance in process environments is rarely purely electrical: a level transmitter, a solenoid valve, a flow switch or a temperature element is an electrical device whose purpose only makes sense in process terms. The P&ID gives you the instrument tag numbers that appear on the loop drawings and in the control system, and it tells you what a device is actually doing before you take it out of service.',
  },
  {
    question: 'Which projection convention will I see on UK drawings?',
    answer:
      'First angle projection is the usual convention on UK and European drawings, in line with BS 8888 practice for technical product documentation. Third angle is the usual North American convention, so equipment manufactured in the United States or Canada — large motors, switchgear, packaged plant — frequently arrives with third angle drawings. Neither is more correct, and both carry identical information, but reading one as though it were the other places features on the wrong side of the object. Always check the projection symbol first.',
  },
  {
    question: 'What should I do if the drawing does not match what I find on site?',
    answer:
      'Stop and treat the drawing as unreliable until it is resolved. First check that you are holding the current revision against the drawing register — a mismatch is very often a superseded sheet rather than an undocumented modification. If you are on the current revision and the installation still differs, do not proceed on assumption: prove the installation by inspection and test, record what you actually found, red-line the drawing, and report it so that a corrected revision is issued. Silent discrepancies are how the next person gets caught out.',
  },
  {
    question:
      'Does BS 7671 say anything about the symbols used on the diagrams supplied with an installation?',
    answer:
      'It does. Regulation 514.9.1 of BS 7671:2018+A4:2026 requires that any symbol used in the diagrams, charts, tables or schedules complies with IEC 60617. The older British Standard symbol publications, including BS EN 60617, were withdrawn and the IEC 60617 online database is now the reference source for electrotechnical symbols. That matters in practice: a legacy drawing may show symbols drawn to a withdrawn publication, so check the drawing date and the symbol key before assuming a symbol means what you expect.',
  },
];

const MOETModule6Section1_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <PenTool className="h-4 w-4" />
            <span>Module 6.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Engineering Drawing Conventions
          </h1>
          <p className="text-white">
            Why standardised drawings exist, the drawing types you will meet, line types, title
            blocks, revision control and the symbols on electrical diagrams
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">
              In 30 Seconds
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>Conventions:</strong> A shared language so a drawing means one thing to
                everyone
              </li>
              <li className="pl-1">
                <strong>Drawing types:</strong> Schematic, wiring, layout, single-line, P&amp;ID —
                each answers a different question
              </li>
              <li className="pl-1">
                <strong>Title block:</strong> Number, revision, scale, projection, who approved it
                and when
              </li>
              <li className="pl-1">
                <strong>Revision control:</strong> Working to a superseded sheet is working blind
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">
              Electrical Maintenance Context
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>Isolation planning:</strong> Single-line diagrams show what feeds what
              </li>
              <li className="pl-1">
                <strong>Fault finding:</strong> Schematic for logic, wiring diagram for terminals
              </li>
              <li className="pl-1">
                <strong>BS 7671:</strong> Regulation 514.9.1 requires diagram symbols to comply with
                IEC 60617
              </li>
              <li className="pl-1">
                <strong>ST1426:</strong> Interpreting technical documentation is assessed competence
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain why engineering drawing conventions are standardised and what happens when they are ignored',
              'Identify the main drawing types a maintenance technician meets and choose the right one for the task',
              'Recognise standard line types and the information each one carries',
              'Read a title block, drawing number and revision table, and explain the danger of a superseded revision',
              'Interpret drawing scales and recognise first angle and third angle projection from the symbol',
              'Use a drawing register and apply disciplined red-lining and as-built marking',
              'Recognise that electrical diagram symbols are drawn from IEC 60617 and identify common examples',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Standardised Drawings Exist
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An engineering drawing is a message sent forward in time. The person who drew it may
              have left the company; the installation may have been built by a contractor who no
              longer trades; the technician reading it may be doing so at three in the morning with
              a plant stoppage costing thousands an hour. None of those people can ask the author
              what a particular line or symbol was meant to convey. The only thing that makes the
              message survive is convention: an agreed set of rules about how information is drawn,
              so that the sheet means the same thing to everyone who is competent to read it.
            </p>
            <p>
              Standardisation is not decoration. Every convention on a drawing replaces a
              conversation that cannot happen. A thick continuous line means a visible edge — nobody
              needs to ask. A thin dashed line means a hidden feature. A truncated cone symbol in
              the title block settles which side of an enclosure a cable entry is on. A revision
              letter settles whether the sheet describes the installation as it is today or as it
              was four modifications ago. Remove any one of those and the drawing becomes an opinion
              rather than a record.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                What Conventions Actually Give You
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Portability:</strong> A drawing produced by one organisation can be read
                  by another without translation or explanation
                </li>
                <li className="pl-1">
                  <strong>Longevity:</strong> A sheet issued twenty years ago still carries the same
                  meaning today, provided you check which symbol standard was current at the time
                </li>
                <li className="pl-1">
                  <strong>Auditability:</strong> Numbering and revision rules make it possible to
                  prove which version of the information a decision was based on
                </li>
                <li className="pl-1">
                  <strong>Safety:</strong> Isolation, testing and modification are planned from
                  drawings, so an ambiguous drawing is a hazard, not just an inconvenience
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Where the Rules Come From
              </h3>
              <p className="text-sm text-white mb-2">
                In the UK, general engineering drawing practice — sheet layout, line types,
                dimensioning, projection and the content of technical product documentation — is
                governed by BS 8888, which aligns with the international ISO drawing standards.
                Graphical symbols for electrical diagrams come from a different source: IEC 60617,
                maintained as a central database. BS 7671:2018+A4:2026 ties the two worlds together
                at Regulation 514.9.1, which requires that any symbol used in the diagrams, charts,
                tables or schedules provided with an installation complies with IEC 60617.
              </p>
              <p className="text-sm text-white">
                Do not expect BS 7671 to teach you draughtsmanship — it does not. It tells you what
                information must be provided with an installation and which symbol standard the
                diagrams must use. How that information is laid out on a sheet is drawing practice,
                and that is where BS 8888 applies.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                What BS 7671 Requires To Be Provided
              </h3>
              <p className="text-sm text-white mb-2">
                Regulation 514.9.1 of BS 7671:2018+A4:2026 requires that a diagram, chart or table —
                or an equivalent form of information — is provided, indicating in particular:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  The type and composition of each circuit: the points of utilisation served, the
                  number and size of conductors, and the type of wiring
                </li>
                <li className="pl-1">The method used for compliance with Regulation 410.3.2</li>
                <li className="pl-1">
                  The information necessary to identify each device performing the functions of
                  protection, isolation and switching, and its location
                </li>
                <li className="pl-1">
                  Any circuit or equipment vulnerable to the electrical tests required by Part 6
                </li>
              </ul>
              <p className="text-sm text-white mt-2">
                A4:2026 introduced an exception to Regulation 514.9.1 relating to domestic
                (household) premises. Read the published wording before relying on it — an exception
                that applies to a dwelling does not travel with you onto an industrial site.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Notice what item four of that list means for a maintenance
              technician. The documentation is required to tell you which circuits or equipment are
              vulnerable to the tests in Part 6. If you never read the drawing before testing, you
              can destroy electronic equipment with an insulation resistance test that the paperwork
              specifically warned you about.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Drawing Types You Will Meet
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maintenance technicians rarely work from a single drawing. A typical intervention on a
              motor control centre might touch four documents: a single-line diagram to establish
              where the supply comes from, a schematic to understand the control sequence, a wiring
              diagram to find the terminals, and a layout drawing to locate the equipment in the
              building. Each drawing type deliberately throws away some information in order to
              present the rest clearly. Understanding what each one keeps and what it discards is
              what lets you pick the right sheet quickly.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Schematic and Circuit Diagrams
              </h3>
              <p className="text-sm text-white mb-2">
                A schematic explains function. Components are drawn as standard symbols and arranged
                so the logic reads cleanly — commonly as horizontal rungs between two vertical
                supply rails, read left to right and top to bottom. Physical position is ignored
                completely: the two halves of a single relay may appear on opposite ends of the
                sheet, linked only by a coil reference and a cross-reference to the rung where each
                contact appears.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Shows:</strong> Control logic, interlocks, sequence of operation, contact
                  and coil relationships, protection and alarm chains
                </li>
                <li className="pl-1">
                  <strong>Hides:</strong> Physical layout, terminal numbers on some formats, cable
                  routes, panel geometry
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Wiring and Connection Diagrams
              </h3>
              <p className="text-sm text-white mb-2">
                A wiring or connection diagram describes the installed reality. It shows terminal
                rails and terminal numbers, cable references, core numbers or colours, gland plate
                positions and the physical destination of every conductor. Where a schematic says
                that the start contact energises the contactor coil, the connection diagram says
                that core 4 of cable MCC-14 lands on terminal X2:17.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Shows:</strong> Terminal numbers, cable and core references, physical
                  connection points, terminal rail arrangement
                </li>
                <li className="pl-1">
                  <strong>Hides:</strong> The overall logic — you cannot easily follow a control
                  sequence on a connection diagram
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Layout and General Arrangement Drawings
              </h3>
              <p className="text-sm text-white mb-2">
                Layout drawings place equipment in space. A building layout shows the position of
                distribution boards, luminaires, socket-outlets, containment routes and plant on a
                floor plan, usually to a stated scale such as 1:50 or 1:100. An equipment general
                arrangement drawing does the same job at a smaller scope: the physical size,
                mounting centres, cable entry positions and door swing of a single enclosure.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Shows:</strong> Physical position, dimensions, mounting centres, clearance
                  and access space, containment routes
                </li>
                <li className="pl-1">
                  <strong>Hides:</strong> Circuit function and electrical connection detail
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Single-Line (One-Line) Diagrams
              </h3>
              <p className="text-sm text-white mb-2">
                On a single-line diagram, a three-phase circuit is drawn as one line. Throwing away
                the individual phases buys enormous clarity: an entire distribution system fits on a
                sheet, from the incoming supply and transformer through the main switch, busbar,
                outgoing protective devices and submains to each downstream board, with device
                ratings, cable sizes and board references annotated along the way.
              </p>
              <p className="text-sm text-white mb-2">
                This is the isolation planning drawing. Before a permit is raised, the single-line
                diagram is how you establish what feeds the equipment, which device isolates it,
                whether there is a second source such as a generator or UPS, and what remains live
                once the isolation is applied. BS 7671:2018+A4:2026 recognises the value of this at
                Regulation 560.7.9, which requires that full details of all electrical safety
                sources, together with a general schematic diagram, are maintained adjacent to the
                distribution board — and notes that a single-line diagram is sufficient for that
                schematic.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Shows:</strong> Sources, switchgear, protective devices, busbars,
                  submains, board hierarchy, ratings
                </li>
                <li className="pl-1">
                  <strong>Hides:</strong> Individual phase conductors, control wiring, physical
                  position
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Piping and Instrumentation Diagrams (P&amp;ID)
              </h3>
              <p className="text-sm text-white mb-2">
                A P&amp;ID is a process drawing, but it is not somebody else&apos;s problem. It
                shows vessels, pumps, pipework, valves and — crucially for you — every instrument in
                the process, each carrying a unique tag number. Those tag numbers follow the
                instrument through the loop drawings, the marshalling cabinet, the control system
                and the maintenance history. When a level transmitter fails, the P&amp;ID tells you
                what it is measuring, what trips depend on it and what happens to the process if you
                take it out of service.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Shows:</strong> Process flow, vessels and pipework, valves, instruments
                  and their tag numbers, control and trip functions
                </li>
                <li className="pl-1">
                  <strong>Hides:</strong> Electrical supply arrangements, physical position, wiring
                  detail
                </li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Which Drawing Do I Reach For?
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">The Question</th>
                      <th className="border border-white/10 px-3 py-2 text-left">The Drawing</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Where does this supply come from and what isolates it?
                      </td>
                      <td className="border border-white/10 px-3 py-2">Single-line diagram</td>
                      <td className="border border-white/10 px-3 py-2">
                        Shows sources, switchgear and the board hierarchy on one sheet
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Why does the contactor not pull in?
                      </td>
                      <td className="border border-white/10 px-3 py-2">Schematic diagram</td>
                      <td className="border border-white/10 px-3 py-2">
                        Shows the control logic and every permissive in the chain
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Which terminal does this core land on?
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Wiring or connection diagram
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Shows terminal numbers, cable references and core identification
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Where in the building is board DB-3?
                      </td>
                      <td className="border border-white/10 px-3 py-2">Layout drawing</td>
                      <td className="border border-white/10 px-3 py-2">
                        Places equipment and containment on a scaled floor plan
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Will the replacement starter fit the existing backplate?
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        General arrangement drawing
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Gives overall dimensions, mounting centres and cable entry positions
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        What does this transmitter control, and what trips if I isolate it?
                      </td>
                      <td className="border border-white/10 px-3 py-2">P&amp;ID</td>
                      <td className="border border-white/10 px-3 py-2">
                        Shows the process function and tag number of every instrument
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> A large proportion of wasted time on a breakdown is
              spent reading the wrong drawing. If you are chasing terminals on a schematic, or
              chasing logic on a connection diagram, stop and pick up the other sheet. Two minutes
              spent choosing the right document saves an hour of tracing.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Line Types and What They Mean
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Line type is the oldest convention in engineering drawing and still one of the most
              information-dense. Thickness, continuity and the pattern of dashes each carry meaning,
              and the meanings are consistent across mechanical and electrical sheets prepared to
              standard drawing practice. Reading line types fluently is the difference between
              seeing a diagram and seeing the information inside it.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Line Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Appearance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Continuous thick</td>
                      <td className="border border-white/10 px-3 py-2">Solid, heavy</td>
                      <td className="border border-white/10 px-3 py-2">
                        Visible outlines and edges — what you can actually see from that direction
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Continuous thin</td>
                      <td className="border border-white/10 px-3 py-2">Solid, light</td>
                      <td className="border border-white/10 px-3 py-2">
                        Dimension lines, projection lines, leader lines, hatching
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dashed thin</td>
                      <td className="border border-white/10 px-3 py-2">Even short dashes</td>
                      <td className="border border-white/10 px-3 py-2">
                        Hidden edges and outlines — features present but not visible in that view
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Chain thin</td>
                      <td className="border border-white/10 px-3 py-2">Long dash, short dash</td>
                      <td className="border border-white/10 px-3 py-2">
                        Centre lines, axes of symmetry, hole and shaft centres
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Chain, thick at ends</td>
                      <td className="border border-white/10 px-3 py-2">
                        Long-short with heavy ends and arrows
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Cutting plane for a sectional view, lettered A-A, B-B
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Chain thin, double dash</td>
                      <td className="border border-white/10 px-3 py-2">Long dash, two short</td>
                      <td className="border border-white/10 px-3 py-2">
                        Outlines of adjacent parts, or a moving part shown in an alternative
                        position
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Continuous thin irregular
                      </td>
                      <td className="border border-white/10 px-3 py-2">Wavy freehand</td>
                      <td className="border border-white/10 px-3 py-2">
                        Break line — the object continues beyond the edge of the view
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Line Conventions on Electrical Diagrams
              </h3>
              <p className="text-sm text-white mb-2">
                Electrical diagrams borrow the same vocabulary but add conventions of their own, and
                these vary a little between drawing offices. Always check the legend or notes on the
                sheet before assuming:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Heavier lines for power, lighter for control:</strong> A common convention
                  that lets you separate the power circuit from the control circuit at a glance
                </li>
                <li className="pl-1">
                  <strong>Dashed lines for mechanical linkage:</strong> A dashed line between two
                  symbols often means they are mechanically coupled — for example two contact sets
                  operated by the same actuator
                </li>
                <li className="pl-1">
                  <strong>Chain or dotted boundaries for equipment limits:</strong> Used to enclose
                  the parts of a circuit that sit inside one enclosure, panel or supplied item
                </li>
                <li className="pl-1">
                  <strong>Crossing versus joining:</strong> A junction is shown by a dot; crossing
                  conductors without a dot are not connected. Never assume a connection that has no
                  dot
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Why Hidden Detail Matters in Maintenance
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Concealed containment:</strong> Conduit and trunking runs buried in
                  structure or above ceilings appear as hidden detail on layout drawings
                </li>
                <li className="pl-1">
                  <strong>Rear-face knockouts:</strong> Cable entries on the back of an enclosure
                  are shown dashed on the front elevation
                </li>
                <li className="pl-1">
                  <strong>Internal rails and barriers:</strong> DIN rail positions and internal
                  segregation barriers behind a closed door
                </li>
                <li className="pl-1">
                  <strong>Fixings you cannot see:</strong> Rear mounting studs and captive nuts you
                  need to know about before you attempt to remove an item
                </li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Line type tells you what the author could not tell you in
              words. On a maintenance job the dashed lines are frequently more valuable than the
              solid ones, because they describe everything you cannot see from where you are
              standing.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Title Blocks, Drawing Numbers and Revision Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The title block is the identity card of the sheet. It sits in the bottom right corner
              of a standard drawing frame so that it remains visible when sheets are folded, and it
              carries everything you need to establish what the drawing is, whether you should be
              working from it, and who is accountable for its content. Reading the title block first
              is a habit worth building — most drawing errors on site are not misread lines, they
              are the right lines read from the wrong sheet.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                What Lives in a Title Block
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Drawing title and number:</strong> What the sheet shows, and the unique
                  identifier used to request, file and cross-reference it
                </li>
                <li className="pl-1">
                  <strong>Revision and status:</strong> Which issue you are holding, and whether it
                  is preliminary, for construction, as-built or superseded
                </li>
                <li className="pl-1">
                  <strong>Scale and projection symbol:</strong> The ratio the sheet was drawn at (or
                  NTS), and whether views are arranged in first or third angle
                </li>
                <li className="pl-1">
                  <strong>Sheet number:</strong> Position within a set, such as sheet 3 of 7 — your
                  proof that you are holding all of it
                </li>
                <li className="pl-1">
                  <strong>Drawn, checked, approved:</strong> Who produced it, who verified it, who
                  authorised its issue, and on what dates
                </li>
                <li className="pl-1">
                  <strong>Client and project reference:</strong> Which site and contract the drawing
                  belongs to
                </li>
                <li className="pl-1">
                  <strong>Units and general tolerance:</strong> The default unit, usually
                  millimetres, and any blanket tolerance note
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Drawing Numbers: Structure, Not Sequence
              </h3>
              <p className="text-sm text-white mb-2">
                Drawing numbers are rarely a simple count. Most organisations use a structured
                number in which each block of characters means something — project, area or system,
                discipline, drawing type and a serial number. A number such as P4821-MCC2-E-SCH-014
                might read as project 4821, motor control centre 2, electrical discipline,
                schematic, sheet 14. Once you learn the scheme in use on your site you can predict
                where a drawing lives and request the right one first time.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>
                    The number identifies the drawing; the revision identifies the issue.
                  </strong>{' '}
                  The number never changes when the content is amended
                </li>
                <li className="pl-1">
                  <strong>Discipline codes matter:</strong> E for electrical, M for mechanical, C
                  for civil, I for instrumentation — the same area may have four drawings with
                  otherwise similar numbers
                </li>
                <li className="pl-1">
                  <strong>Always quote number and revision together:</strong> Asking for &quot;the
                  MCC schematic&quot; invites the wrong sheet; asking for a number at a stated
                  revision does not
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                How Revision Control Works
              </h3>
              <p className="text-sm text-white mb-2">
                Every issued change to a drawing creates a new revision. Conventions vary — letters
                (A, B, C) are common for pre-construction issues and numbers for issued-for-
                construction revisions, but the principle is universal. The revision table on the
                sheet records, for each revision, a reference, a short description of what changed,
                the date, and the initials of the person who authorised it. Changed regions of the
                drawing are usually flagged with a revision cloud or a small triangle carrying the
                revision reference, so you can see at a glance what moved.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Read the revision table before the drawing:</strong> It tells you what
                  changed and therefore where to look carefully
                </li>
                <li className="pl-1">
                  <strong>Check the revision against the register:</strong> The sheet cannot tell
                  you that a later revision exists — only the register can
                </li>
                <li className="pl-1">
                  <strong>Destroy or clearly mark superseded prints:</strong> An obsolete sheet left
                  in a panel door will be picked up and used by somebody
                </li>
                <li className="pl-1">
                  <strong>Never amend a drawing informally:</strong> Changes go through document
                  control and come back as an issued revision
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">
                Site Scenario: The Sheet in the Panel Door
              </p>
              <p className="text-sm text-white mb-2">
                A technician is asked to add a local control station to a conveyor drive at MCC-2.
                He takes the single-line diagram from the plastic wallet inside the MCC door,
                because it is the copy that has always been there. It shows way 7 as a spare, with
                the outgoing device fitted but no cable connected. He plans the work on that basis,
                isolates and locks off the supply to the drive, and opens the way 7 chamber to
                terminate his new submain.
              </p>
              <p className="text-sm text-white mb-2">
                The sheet in the wallet is revision C, issued four years earlier. Revision E, issued
                eighteen months ago after a plant extension, reassigned way 7 to feed a small
                distribution board in the packing hall. The chamber is live. The lock-off he applied
                is on a different circuit entirely, and the only thing standing between him and a
                fault across a live busbar chamber is his prove-dead test — a control that exists
                precisely because paperwork fails.
              </p>
              <p className="text-sm text-white">
                Nothing in that story is exotic. The drawing was not wrong when it was issued; it
                simply stopped describing the installation the moment the plant changed. That is why
                revision control is a safety system and not an administrative formality, and why the
                first check on any drawing is whether it is the current issue.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> A drawing is a snapshot, not a live feed. It describes the
              installation as it was at the moment the revision was issued. Establish the revision
              first, verify it against the register second, and prove the installation by test
              before you rely on either.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Scales and Projection Awareness
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A scale states the relationship between a distance on the drawing and the same
              distance on the real installation. It is written as a ratio: the first number is the
              drawing, the second is reality. A scale of 1:1 is full size. A scale of 1:50 is a
              reduction — one unit on paper equals fifty on site. A scale of 2:1 is an enlargement,
              used for small components such as terminal detail. The scale is stated in the title
              block, and where different views on the same sheet use different scales, each view
              carries its own annotation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Scales You Will Meet</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>1:1</strong> — full size, used for drilling templates and small components
                </li>
                <li className="pl-1">
                  <strong>2:1 or 5:1</strong> — enlarged, used for detail views of fine features
                </li>
                <li className="pl-1">
                  <strong>1:5 or 1:10</strong> — enclosure general arrangements and panel layouts
                </li>
                <li className="pl-1">
                  <strong>1:50 or 1:100</strong> — building layout drawings and containment routes
                </li>
                <li className="pl-1">
                  <strong>1:200 and above</strong> — site plans and external distribution routes
                </li>
                <li className="pl-1">
                  <strong>NTS</strong> — not to scale, the norm on schematics and single-line
                  diagrams where geometry carries no meaning
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Never Scale From a Print</p>
              <p className="text-sm text-white">
                Paper stretches with humidity, photocopiers rescale, and PDFs are routinely printed
                with fit-to-page enabled, which silently changes the ratio. A dimension measured off
                a print with a rule may be several per cent out — enough to drill a gland plate in
                the wrong place. Use the stated dimension. Where no dimension is given, measure the
                installation itself or request a dimensioned drawing.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                First Angle and Third Angle Projection — Awareness Level
              </h3>
              <p className="text-sm text-white mb-2">
                Where an object is shown from more than one direction, the views must be arranged to
                an agreed convention or you cannot tell which side of the object you are looking at.
                Two conventions are in use worldwide, and they place the same views in opposite
                positions:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>First angle</strong> — the usual UK and European convention. The view
                  falls on the far side of the object, so the plan appears below the front elevation
                  and the view looking from the right appears on the left
                </li>
                <li className="pl-1">
                  <strong>Third angle</strong> — the usual North American convention. The view falls
                  on the near side, so the plan appears above the front elevation and the view
                  looking from the right appears on the right
                </li>
              </ul>
              <p className="text-sm text-white mt-2">
                The convention in use is declared by the projection symbol: a truncated cone drawn
                in two views, placed in or beside the title block. In first angle, the small circle
                (the narrow end seen end-on) sits on the opposite side to the tapered outline; in
                third angle it sits on the same side. You do not need to be able to construct
                projections to work safely, but you must be able to find that symbol and know what
                it changes. Section 6.1.3 develops orthographic projection in full.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> The practical consequence of getting projection
              wrong is mirrored equipment. Cable entries end up on the wrong side, hinge and door
              swing are reversed, and the terminal box on a motor faces into a wall. If your
              interpretation of a view puts something on the opposite side to what you can see on
              site, check the projection symbol before you conclude that the drawing is wrong.
            </p>
          </div>
        </section>

        {/* Section 06 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Drawing Registers, Red-Lining and As-Built Discipline
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A set of drawings without a register is a pile of paper. The register is the
              controlled index: every drawing number for the installation, its title, its current
              revision, its status and often its issue date and location. It is the only place that
              can tell you whether the sheet in your hand has been superseded, because a drawing
              cannot announce its own obsolescence. Checking the register before you work from a
              drawing is the equivalent of checking the calibration date on a test instrument.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                What a Drawing Register Gives You
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Drawing number and title:</strong> Match the sheet in your hand to the
                  controlled record, or find a drawing when you know the system but not the number
                </li>
                <li className="pl-1">
                  <strong>Current revision:</strong> The single most important column — it confirms
                  whether your copy is the latest issue
                </li>
                <li className="pl-1">
                  <strong>Status:</strong> For construction, as-built or superseded
                </li>
                <li className="pl-1">
                  <strong>Issue date:</strong> Lets you judge how much plant change may have
                  happened since
                </li>
                <li className="pl-1">
                  <strong>Holder or location:</strong> Tracks the controlled copies that must be
                  swapped out when a revision is issued
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Red-Lining: Marking Up What You Actually Found
              </h3>
              <p className="text-sm text-white mb-2">
                Red-lining is the practice of marking a drawing to record what was actually
                installed, as distinct from what the drawing shows. The name comes from the
                traditional use of a red pen on a print so that the mark-up cannot be mistaken for
                original content. Those mark-ups are collected by whoever controls the drawings and
                incorporated into the next issued revision, which is how a set of construction
                drawings eventually becomes a set of as-built drawings.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Mark at the time:</strong> Record the change while you are standing at the
                  equipment, not from memory at the end of the shift
                </li>
                <li className="pl-1">
                  <strong>Mark on the current revision:</strong> A mark-up on a superseded sheet
                  cannot be incorporated and may reintroduce old errors
                </li>
                <li className="pl-1">
                  <strong>Show what was removed as well as what was added:</strong> Strike through
                  the redundant item rather than erasing it, so the change is visible
                </li>
                <li className="pl-1">
                  <strong>Date and sign every mark-up:</strong> An unattributed change cannot be
                  queried, and an undated one cannot be sequenced
                </li>
                <li className="pl-1">
                  <strong>Return it into the system:</strong> A red-lined sheet in your van or a
                  photograph on your phone is not a record — it must reach document control
                </li>
                <li className="pl-1">
                  <strong>Do not red-line a guess:</strong> If you are not certain what is
                  installed, prove it by inspection and test first
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Drawings, Labelling and the Certificate
              </h3>
              <p className="text-sm text-white mb-2">
                Drawing discipline connects directly to the documentation required by BS
                7671:2018+A4:2026. The circuit information required by Regulation 514.9.1 — circuit
                type and composition, the means of compliance with Regulation 410.3.2,
                identification and location of the devices performing protection, isolation and
                switching, and any circuit or equipment vulnerable to the tests of Part 6 — has to
                remain true after your modification, not just on the day the installation was
                energised.
              </p>
              <p className="text-sm text-white mb-2">
                Inspection reflects that. Regulation 642.3(l) requires the inspection to include
                checking the labelling of protective devices, switches and terminals where relevant,
                and labelling only means anything if it corresponds to the circuit schedules and
                diagrams. Conductor identification carries the same logic: Regulation 514.3.1
                requires conductors to be identified so their function can be determined, and that
                identification must agree with the core references on the connection diagram.
              </p>
              <p className="text-sm text-white">
                Where an installation includes safety services, Regulation 560.7.9 requires full
                details of all electrical safety sources together with a general schematic diagram
                to be maintained adjacent to the distribution board, and notes that a single-line
                diagram is sufficient for that schematic. The word maintained is doing real work in
                that regulation: adding a generator or a changeover device and leaving the old
                schematic on the wall does not satisfy it.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard expects you to work
              to and maintain technical documentation, not merely read it. Returning accurate,
              dated, signed mark-ups into document control is part of completing the job, in the
              same way that completing the certification is.
            </p>
          </div>
        </section>

        {/* Section 07 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Electrical Symbols and IEC 60617
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical diagrams are written in symbols. A symbol is a compressed definition: a
              handful of lines that state what a device is, and often how it behaves. Because the
              whole point is that everyone reads them identically, symbols are standardised — and
              for electrotechnical diagrams the source is IEC 60617, maintained as a central online
              database. Earlier British Standard symbol publications, including BS EN 60617, were
              withdrawn, and IEC 60617 is now the reference for symbol definitions.
            </p>
            <p>
              BS 7671:2018+A4:2026 makes that explicit at Regulation 514.9.1: any symbol used in the
              diagrams, charts, tables or schedules provided with an installation shall comply with
              IEC 60617. The practical consequence for a maintenance technician is that symbols on a
              compliant modern diagram are not a house style you have to learn per site — they are a
              defined vocabulary. Legacy drawings, however, may predate the change, so check the
              drawing date and the symbol key on the sheet before assuming.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Common Symbols, Described in Words
              </h3>
              <p className="text-sm text-white mb-2">
                You will learn these fastest at the panel with a drawing in your hand, but the
                descriptions below give you the shapes to look for:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Normally open contact:</strong> Two short in-line conductor stubs with a
                  gap between them, one carrying a short angled bar that does not bridge the gap —
                  the circuit is open until the contact operates
                </li>
                <li className="pl-1">
                  <strong>Normally closed contact:</strong> The same arrangement with the angled bar
                  crossing the gap and a short stroke through it, indicating the contact is made
                  until it operates
                </li>
                <li className="pl-1">
                  <strong>Relay or contactor coil:</strong> A plain rectangle in the control circuit
                  with the device reference beside it, cross-referenced to the rungs on which its
                  contacts appear
                </li>
                <li className="pl-1">
                  <strong>Switch-disconnector and isolator:</strong> A contact symbol with the
                  additional marks that indicate its switching and isolating function; devices
                  suitable for isolation are marked accordingly on the equipment itself
                </li>
                <li className="pl-1">
                  <strong>Fuse:</strong> A narrow rectangle drawn across the conductor, with the
                  conductor continuing through it
                </li>
                <li className="pl-1">
                  <strong>Circuit-breaker:</strong> A contact symbol with an additional mark
                  distinguishing it as a device intended to break fault current, usually annotated
                  with its type and rating
                </li>
                <li className="pl-1">
                  <strong>Earth:</strong> A vertical stem meeting a stack of progressively shorter
                  horizontal bars; protective earth carries additional identification where it must
                  be distinguished from functional earth
                </li>
                <li className="pl-1">
                  <strong>Motor:</strong> A circle containing a letter M, commonly with the number
                  of phases or the supply type annotated alongside
                </li>
                <li className="pl-1">
                  <strong>Transformer:</strong> Two coil symbols drawn adjacent, separated by the
                  lines that represent the core
                </li>
                <li className="pl-1">
                  <strong>Lamp or indicator:</strong> A circle with two crossing diagonals, usually
                  annotated with the indication colour
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Symbols Versus Safety Signs
              </h3>
              <p className="text-sm text-white">
                Do not confuse diagram symbols with safety signage. IEC 60617 supplies the graphical
                symbols used in diagrams. Safety signs and warning notices — the triangles,
                prohibitions and mandatory signs fixed to equipment — are drawn from BS EN ISO 7010,
                a different standard with different rules about colour, shape and placement. A
                warning notice fixed to a distribution board and the symbol representing that board
                on a schematic come from two separate standards.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Reading Symbols Without Guessing
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Find the key first:</strong> Most drawing sets include a legend sheet;
                  where a symbol is unusual, the legend is the authority for that set
                </li>
                <li className="pl-1">
                  <strong>Read the annotation, not just the shape:</strong> Two devices may share a
                  symbol and differ entirely in rating, type and function — the text beside it
                  carries that
                </li>
                <li className="pl-1">
                  <strong>Check the state convention:</strong> Contacts are drawn in the
                  de-energised, unoperated state unless the sheet says otherwise; misreading that
                  inverts your whole understanding of the circuit
                </li>
                <li className="pl-1">
                  <strong>Follow cross-references:</strong> Coil and contact references tie together
                  parts of the same device drawn pages apart
                </li>
                <li className="pl-1">
                  <strong>When in doubt, prove it:</strong> A symbol tells you what was designed. A
                  test tells you what is installed. Where the two could differ and safety depends on
                  it, test
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">
                A Symbol Is Not a Substitute for Proving Dead
              </p>
              <p className="text-sm text-white">
                No diagram, however current and however well drawn, is a means of establishing that
                a conductor is dead. Drawings are a planning tool: they tell you where to isolate,
                what else may be live, and what may be fed from a second source. The isolation is
                then proved by safe isolation procedure using an approved voltage indicator and a
                proving unit, every time, at the point of work.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Symbols are standardised so that meaning does not depend
              on who drew the sheet. Regulation 514.9.1 requires compliance with IEC 60617 for the
              symbols used in the diagrams, charts, tables and schedules provided with an
              installation — so a symbol you cannot identify on a modern compliant drawing is a
              symbol worth looking up rather than guessing at.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Which Drawing, and Before You Use It</p>
                <ul className="space-y-0.5">
                  <li>Single-line — supplies, sources, isolation points</li>
                  <li>Schematic — control logic; wiring diagram — terminals</li>
                  <li>Layout/GA — position, dimensions, fit; P&amp;ID — process</li>
                  <li>Read the title block: number, revision, scale, projection</li>
                  <li>Check the revision against the drawing register</li>
                  <li>Never scale a dimension from a print</li>
                  <li>Red-line changes at the time, dated and signed</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Lines and BS 7671:2018+A4:2026</p>
                <ul className="space-y-0.5">
                  <li>Thick continuous — visible outlines</li>
                  <li>Thin dashed — hidden detail; thin chain — centre lines</li>
                  <li>Dot at a crossing — a connection</li>
                  <li>514.9.1 — diagram/chart/table information required</li>
                  <li>514.9.1 — symbols shall comply with IEC 60617</li>
                  <li>560.7.9 — schematic kept adjacent to the board</li>
                  <li>642.3(l) — labelling checked at inspection</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section1-2">
              Next: Legal and Safety Reasons
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule6Section1_1;
