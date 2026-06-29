import { ArrowLeft, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Introduction to CAD - MOET Module 6 Section 1.5';
const DESCRIPTION =
  'Computer-aided design fundamentals, 2D and 3D CAD systems, BIM integration, CAD viewers for maintenance, file formats, layer management and digital drawing workflows for electrical maintenance technicians.';

const quickCheckQuestions = [
  {
    id: 'cad-purpose',
    question:
      'What is the primary advantage of CAD over traditional manual draughting for engineering drawings?',
    options: [
      'Faster creation, easier modification, precise dimensioning and simple electronic sharing',
      'It removes the need for any site verification of the drawings that are produced',
      'CAD drawings can only ever be printed at A0 size in order to preserve their accuracy',
      'It guarantees that drawings always match the actual as-built installation on site',
    ],
    correctIndex: 0,
    explanation:
      'CAD (Computer-Aided Design) provides significant advantages: drawings can be created faster, modifications are made without starting from scratch, revision control can be automated, dimensions are mathematically precise, and drawings can be shared electronically. For maintenance, this means more accurate, more accessible and more up-to-date documentation.',
  },
  {
    id: '2d-vs-3d',
    question: 'How does 3D CAD modelling differ from 2D CAD draughting?',
    options: [
      '3D CAD can only produce static images, whereas 2D CAD allows editing',
      '2D CAD embeds rich asset data in every object, whereas 3D CAD is unable to',
      '2D CAD creates flat drawings; 3D CAD builds a full model from which 2D views are extracted',
      '3D CAD is used only for architecture and never for building electrical services',
    ],
    correctIndex: 2,
    explanation:
      '2D CAD replicates traditional draughting on screen — creating flat plan, elevation and section views. 3D CAD creates a complete digital model of the object, from which any number of 2D views can be automatically extracted. Changes to the 3D model automatically update all derived 2D drawings, ensuring consistency.',
  },
  {
    id: 'bim-definition',
    question: 'What does BIM (Building Information Modelling) add beyond standard 3D CAD?',
    options: [
      "It automatically prints all the project drawings to PDF without any user input",
      "It compresses the model file size so that large models open faster on a tablet",
      "It converts every drawing into a single flat 2D layer for improved on-screen clarity",
      "It adds data to every object — manufacturer, rating, maintenance schedule — a 'digital twin'",
    ],
    correctIndex: 3,
    explanation:
      'BIM goes beyond 3D geometry by embedding data into every object. A distribution board in a BIM model contains not just its physical dimensions but also its electrical rating, manufacturer, installation date, maintenance history, and linked documentation. This creates a comprehensive digital twin that supports maintenance planning and asset management.',
  },
  {
    id: 'cad-viewer',
    question:
      'A CAD viewer (as opposed to full CAD software) is useful for maintenance technicians because:',
    options: [
      'It lets you open, view, measure, search and print drawings without full design software',
      'It allows you to create and edit complete 3D parametric models entirely from scratch',
      'It automatically updates the as-built drawings whenever any site changes are made',
      'It removes the need to verify drawings against the actual physical installation',
    ],
    correctIndex: 0,
    explanation:
      'CAD viewers are lightweight applications (often free) that allow maintenance technicians to open CAD files, navigate 2D and 3D drawings, take measurements, search for components by name or reference, extract information, and print views — all without the full CAD design software or the training to use it.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'CAD stands for:',
    options: [
      'Computer-Assisted Drafting — manual drawing aided by a digitiser tablet',
      'Computer-Aided Design — software used to create, modify and manage engineering drawings and models',
      'Coordinated Asset Database — the central store of equipment records',
      'Construction Approval Document — a stage gate in the design process',
    ],
    correctAnswer: 1,
    explanation:
      'Computer-Aided Design (CAD) is the use of computer software to create, modify, analyse and manage engineering drawings and 3D models. It has largely replaced manual draughting in professional engineering practice.',
  },
  {
    id: 2,
    question: 'In a CAD drawing, layers are used to:',
    options: [
      'Compress the drawing into a smaller file so it opens faster on a tablet in the field',
      'Permanently lock the geometry so the drawing can be viewed but never altered',
      'Organise different types of information (e.g., electrical, structural, dimensions) that can be turned on or off independently for clarity',
      'Convert a 2D drawing into a full 3D model by stacking each view on top of the last',
    ],
    correctAnswer: 2,
    explanation:
      'Layers are like transparent overlays stacked on top of each other. Each layer contains a specific category of information — electrical circuits on one layer, structural elements on another, dimensions on another. Layers can be turned on or off, making complex drawings easier to read by showing only the relevant information.',
  },
  {
    id: 3,
    question: 'DWG and DXF are:',
    options: [
      'Two named layers that every electrical CAD drawing must contain by default',
      'Free CAD viewer applications used to open drawings on a mobile device',
      'BIM data standards used to hand over asset information to the maintenance team',
      'Common CAD file formats — DWG is native to AutoCAD; DXF is a universal interchange format',
    ],
    correctAnswer: 3,
    explanation:
      'DWG (Drawing) is the native file format of AutoCAD, the most widely used CAD software. DXF (Drawing eXchange Format) is an open interchange format designed to allow data sharing between different CAD systems. Most CAD software can read both formats.',
  },
  {
    id: 4,
    question: 'A parametric 3D CAD model allows:',
    options: [
      'Features driven by parameters — changing one dimension updates all related features',
      'Each view to be drawn separately, with no link maintained between the views',
      'Drawings to be exported only as flat, non-editable PDF files for distribution',
      'The finished model to be viewed but never modified again once it is created',
    ],
    correctAnswer: 0,
    explanation:
      'Parametric modelling links dimensions and features through mathematical relationships. If you change the width of an enclosure, all related features (mounting holes, internal rails, cable entry positions) update automatically to maintain the correct relationships. This makes design changes fast and consistent.',
  },
  {
    id: 5,
    question:
      'For a maintenance technician viewing a CAD drawing on a tablet, the most useful function is:',
    options: [
      'Creating new parametric 3D models of replacement parts directly on the tablet',
      'Zooming into specific areas, measuring distances between features, and searching for components by tag number',
      'Automatically updating the as-built drawing whenever a change is made on site',
      'Running clash detection across the architectural, structural and electrical models',
    ],
    correctAnswer: 1,
    explanation:
      'Maintenance technicians primarily use CAD viewers to zoom into detail, measure dimensions (for replacement parts or cable routing), and search for specific equipment by tag number or description. These navigation and query functions are the most practical for field work.',
  },
  {
    id: 6,
    question: 'BIM Level 2 (as required by the UK government for public projects) means:',
    options: [
      'Each discipline works in isolated 2D CAD with no requirement to share any digital model',
      'A single fully integrated model is held in one shared database that every party edits live',
      'All project disciplines create coordinated 3D models with embedded data, shared through a common data environment with agreed standards',
      'All drawings must be exported to PDF before being issued to the maintenance team',
    ],
    correctAnswer: 2,
    explanation:
      'BIM Level 2 requires all project disciplines (architectural, structural, mechanical, electrical) to produce coordinated 3D BIM models containing embedded asset data. Models are shared through a Common Data Environment (CDE) with standardised formats and naming conventions. This has significant implications for maintenance data handover.',
  },
  {
    id: 7,
    question: 'The Common Data Environment (CDE) in a BIM project is:',
    options: [
      'The native file format used by Revit to store a building model and its embedded data',
      'The 3D modelling software each discipline uses to author its part of the project',
      'A standard set of layer names that every drawing on the project must adopt',
      'A structured platform where all project information is stored, shared and version-managed',
    ],
    correctAnswer: 3,
    explanation:
      'The CDE is the single source of truth for all project documentation. It provides structured storage, version control, approval workflows, and controlled access. For maintenance, the CDE (or its handover output) contains all as-built drawings, O&M information, and equipment data in a structured, searchable format.',
  },
  {
    id: 8,
    question: 'When a CAD file is exported as a PDF, the main limitation is:',
    options: [
      'The PDF is a static image — you lose the ability to query layers, measure dynamically, search by component, or access embedded data',
      'The PDF cannot be opened on a tablet or phone, only on a desktop CAD workstation',
      'The PDF always loses the visual accuracy of the drawing, distorting dimensions and scale',
      'The PDF can only be produced from a 3D model, never from a flat 2D CAD drawing',
    ],
    correctAnswer: 0,
    explanation:
      'Exporting to PDF converts the intelligent CAD drawing into a static image. While PDFs are universally accessible and maintain visual accuracy, you lose layer control, dynamic measurement, component searching, and access to embedded attributes. For detailed maintenance work, viewing the native CAD file is preferable.',
  },
  {
    id: 9,
    question: 'IFC (Industry Foundation Classes) is:',
    options: [
      'The native proprietary file format used only by Autodesk Revit for BIM models',
      'An open file format for exchanging BIM data between different software platforms, enabling interoperability',
      'A UK layer-naming standard that classifies electrical and structural elements on a drawing',
      'A cloud platform that hosts BIM models for browser-based viewing on any device',
    ],
    correctAnswer: 1,
    explanation:
      'IFC is a vendor-neutral open standard for BIM data exchange. It allows models created in one BIM platform (e.g., Revit) to be opened and used in other platforms (e.g., Bentley, ArchiCAD). This interoperability is essential because maintenance teams may use different software from the original design team.',
  },
  {
    id: 10,
    question: 'As-built models in BIM are important for maintenance because:',
    options: [
      'They show the original design intent, so any site changes can be reversed later if needed',
      'They are smaller files than design models, making them faster to open on a tablet',
      'They accurately represent what was actually installed (not just what was designed), providing reliable information for maintenance planning, fault-finding and modification',
      'They remove the need to verify any information against the physical installation on site',
    ],
    correctAnswer: 2,
    explanation:
      'As-built models are updated to reflect the actual installation, incorporating all site changes, substitutions and modifications. For maintenance, as-built accuracy is critical — designing work based on a model that does not reflect reality risks incorrect isolation, wrong parts ordering, or incompatible modifications.',
  },
  {
    id: 11,
    question: 'Cloud-based CAD viewing platforms benefit maintenance teams by:',
    options: [
      'Allowing technicians to author full parametric 3D models directly in the web browser',
      'Removing the need for any internet connection once the drawing has been opened once',
      'Guaranteeing that the drawing always matches the physical installation on site',
      'Providing browser-based access to current drawings from any device without specialist software installation',
    ],
    correctAnswer: 3,
    explanation:
      'Cloud-based platforms allow maintenance technicians to access current drawings through a web browser on any device — tablet, phone or laptop — without installing specialist CAD software. This is particularly useful for field technicians who need to view drawings at the point of work.',
  },
  {
    id: 12,
    question: 'Under ST1426, awareness of digital drawing technologies is important because:',
    options: [
      'Navigating CAD viewers and using digital drawings and BIM data is now a core competence',
      'Technicians are now expected to author original CAD drawings and BIM models from scratch',
      'Paper drawings are no longer permitted on any UK maintenance site under the standard',
      'It removes the need to interpret traditional paper drawings once a site goes digital',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 requires maintenance technicians to use appropriate documentation and information technology. As the industry moves towards digital drawing systems and BIM-enabled asset management, the ability to access and interpret digital drawings is becoming as essential as reading paper drawings.',
  },
];

const faqs = [
  {
    question: 'Do I need to learn full CAD software as a maintenance technician?',
    answer:
      'No. You are not expected to design or create CAD drawings. However, you should be comfortable using CAD viewers to open, navigate, zoom, measure and print drawings. Many free and lightweight CAD viewers are available (such as Autodesk online viewer, eDrawings, or DWG TrueView) that are straightforward to learn. Basic BIM viewer skills are increasingly useful as BIM adoption grows.',
  },
  {
    question: 'What if the site I work on still uses paper drawings?',
    answer:
      'Many sites still use paper drawings, and paper remains a valid medium. However, the trend is firmly towards digital. Even on paper-based sites, equipment manufacturers increasingly provide digital drawings and 3D models. Developing digital viewing skills now prepares you for the transition that is underway across the industry.',
  },
  {
    question: 'How does BIM benefit me as a maintenance technician on a day-to-day basis?',
    answer:
      'BIM provides a searchable, data-rich model of the building and its services. In practice, this means you can search for any equipment by tag number and instantly see its location, specifications, maintenance history and linked documents. You can view the 3D spatial arrangement to understand access routes and clashes before starting work. This reduces time spent searching for information and improves the quality of maintenance planning.',
  },
  {
    question: 'What happens to BIM data when a building is handed over to the maintenance team?',
    answer:
      "Under UK BIM Level 2 requirements, a structured data handover (Asset Information Model) is provided at practical completion. This includes the as-built BIM model, equipment data sheets, O&M manuals, test certificates, and warranty information — all linked to the model. The maintenance team then uses this as the foundation of their asset management system, updating it throughout the building's operational life.",
  },
  {
    question: 'Can I update drawings from the field using a mobile device?',
    answer:
      "This depends on your organisation's systems and permissions. Some modern BIM and digital drawing platforms allow field technicians to add mark-ups, notes and photographs to drawings via a mobile app. These annotations are then reviewed by the drawing office for formal incorporation into the as-built records. This is more efficient than traditional paper red-line markups but requires appropriate training and access permissions.",
  },
];

const MOETModule6Section1_5 = () => {
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
            <Shield className="h-4 w-4" />
            <span>Module 6.1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Introduction to CAD
          </h1>
          <p className="text-white">
            Computer-aided design fundamentals, BIM integration, CAD viewers and digital drawing
            workflows
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
                <strong>CAD:</strong> Computer-Aided Design — digital creation and management of
                drawings
              </li>
              <li className="pl-1">
                <strong>2D vs 3D:</strong> Flat drawings vs full digital models with extracted views
              </li>
              <li className="pl-1">
                <strong>BIM:</strong> 3D models with embedded data — digital twin of the building
              </li>
              <li className="pl-1">
                <strong>File formats:</strong> DWG (AutoCAD native), DXF (interchange), IFC (BIM)
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">
              Electrical Maintenance Context
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>CAD viewers:</strong> Navigate digital drawings at the point of work
              </li>
              <li className="pl-1">
                <strong>Layers:</strong> Toggle electrical, structural and services information
              </li>
              <li className="pl-1">
                <strong>BIM handover:</strong> Structured data for asset management
              </li>
              <li className="pl-1">
                <strong>ST1426:</strong> Digital documentation competence increasingly expected
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the purpose and benefits of CAD for engineering drawing production and management',
              'Distinguish between 2D CAD draughting and 3D CAD modelling approaches',
              'Describe the concept of BIM and its relevance to maintenance and asset management',
              'Use CAD viewer tools to navigate, measure and print engineering drawings',
              'Identify common CAD file formats and their appropriate applications',
              'Understand how digital drawing technologies are changing maintenance documentation practices',
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
            What Is CAD and Why Does It Matter?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Computer-Aided Design (CAD) has transformed how engineering drawings are created,
              managed and used. In virtually all professional engineering practices, CAD software
              has replaced traditional manual draughting on paper or vellum. For maintenance
              technicians, this means that the drawings you use are increasingly created, stored and
              distributed digitally — and the ability to access and navigate digital drawings is
              becoming as important as the ability to read paper drawings.
            </p>
            <p>
              CAD provides precision that manual draughting cannot match: dimensions are
              mathematically exact, modifications do not require redrawing from scratch, copies are
              identical to the original, and drawings can be shared instantly across the world. For
              maintenance organisations, CAD-produced drawings are easier to update, search,
              cross-reference and integrate with asset management systems.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Key Advantages of CAD for Maintenance Documentation
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Accuracy:</strong> Dimensions are precise — no draughting errors or
                  scaling inaccuracies
                </li>
                <li className="pl-1">
                  <strong>Modification:</strong> Changes are made to the digital file; superseded
                  versions are archived automatically
                </li>
                <li className="pl-1">
                  <strong>Searchability:</strong> Components can be found by tag number, description
                  or attribute
                </li>
                <li className="pl-1">
                  <strong>Layers:</strong> Different types of information can be shown or hidden as
                  needed
                </li>
                <li className="pl-1">
                  <strong>Distribution:</strong> Drawings are shared digitally — no physical copies
                  to manage
                </li>
                <li className="pl-1">
                  <strong>Integration:</strong> CAD data can link to CMMS, BMS, and asset management
                  systems
                </li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Even if you never create a CAD drawing yourself,
              understanding how CAD works helps you use digital drawings more effectively,
              communicate with designers and drawing offices, and appreciate the capabilities and
              limitations of digital documentation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            2D CAD vs 3D CAD Modelling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              CAD systems operate in either 2D or 3D mode, and the approach significantly affects
              how drawings are created, modified and used. Understanding the difference helps you
              appreciate the capabilities of the drawings you receive and the possibilities for
              accessing information from them.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">2D CAD</th>
                      <th className="border border-white/10 px-3 py-2 text-left">3D CAD</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Output</td>
                      <td className="border border-white/10 px-3 py-2">
                        Flat plan, elevation, section views
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Full 3D digital model plus derived 2D views
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Modification</td>
                      <td className="border border-white/10 px-3 py-2">
                        Each view edited independently
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Change the model, all views update automatically
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Visualisation</td>
                      <td className="border border-white/10 px-3 py-2">
                        Requires mental 3D reconstruction
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Rotate and view from any angle
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Clash detection</td>
                      <td className="border border-white/10 px-3 py-2">
                        Manual checking between drawings
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Automatic — software identifies physical conflicts
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data embedding</td>
                      <td className="border border-white/10 px-3 py-2">
                        Limited to text annotations
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Rich data attributes on every component
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common CAD Software</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>AutoCAD:</strong> Industry standard 2D/3D CAD — DWG format, widely used
                  across all disciplines
                </li>
                <li className="pl-1">
                  <strong>Revit:</strong> BIM-focused 3D modelling — used for building services
                  including electrical design
                </li>
                <li className="pl-1">
                  <strong>MicroStation:</strong> Alternative CAD platform popular in infrastructure
                  and utilities
                </li>
                <li className="pl-1">
                  <strong>EPLAN:</strong> Specialist electrical design CAD for schematics, panel
                  layouts and wiring
                </li>
                <li className="pl-1">
                  <strong>SolidWorks:</strong> 3D mechanical CAD — used for equipment and component
                  design
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            CAD File Formats and Layers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding CAD file formats and the layer system helps you access the right
              information from digital drawings. Different formats serve different purposes, and
              layers allow complex drawings to be filtered so you see only what is relevant to your
              task.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common File Formats</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>DWG:</strong> Native AutoCAD format — contains full drawing intelligence
                  including layers, blocks and attributes
                </li>
                <li className="pl-1">
                  <strong>DXF:</strong> Drawing eXchange Format — open standard for sharing between
                  different CAD platforms
                </li>
                <li className="pl-1">
                  <strong>PDF:</strong> Static output — universally readable but loses layer control
                  and dynamic measurement
                </li>
                <li className="pl-1">
                  <strong>IFC:</strong> Industry Foundation Classes — open BIM exchange format
                </li>
                <li className="pl-1">
                  <strong>RVT:</strong> Native Revit (BIM) format — full model with embedded data
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Understanding Layers</h3>
              <p className="text-sm text-white mb-2">
                Layers are one of the most useful CAD features for maintenance technicians. A
                complex building services drawing may contain structural, architectural, mechanical
                and electrical information all on the same drawing. By turning layers on and off,
                you can isolate just the electrical information you need.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>E-POWER:</strong> Power distribution cables, switchgear, distribution
                  boards
                </li>
                <li className="pl-1">
                  <strong>E-LIGHT:</strong> Lighting circuits, luminaires, switching
                </li>
                <li className="pl-1">
                  <strong>E-CONTAINMENT:</strong> Cable trays, trunking, conduit routes
                </li>
                <li className="pl-1">
                  <strong>M-HVAC:</strong> Mechanical services (turn off when not needed)
                </li>
                <li className="pl-1">
                  <strong>A-WALLS:</strong> Architectural walls and partitions (keep on for context)
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Layer Naming Standards</p>
              <p className="text-sm text-white">
                BS 1192 and the Uniclass classification system define standard layer naming
                conventions for UK construction projects. Layer names typically follow the format:
                discipline prefix (E for electrical) followed by the element type. Understanding the
                naming convention allows you to quickly identify which layers contain the
                information you need, even on an unfamiliar drawing.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            BIM and Digital Twin Concepts
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building Information Modelling (BIM) represents the next evolution beyond traditional
              CAD. Rather than creating drawings that describe a building, BIM creates a digital
              model of the building that contains both geometry (what it looks like) and data (what
              it is, what it does, and how to maintain it). This model becomes a 'digital twin' that
              supports the building throughout its entire lifecycle.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                BIM Benefits for Maintenance
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Single source of truth:</strong> One model containing all building
                  information
                </li>
                <li className="pl-1">
                  <strong>Asset data:</strong> Every component has embedded specifications,
                  maintenance schedules and linked documents
                </li>
                <li className="pl-1">
                  <strong>3D navigation:</strong> Virtually walk through the building to plan access
                  and identify equipment
                </li>
                <li className="pl-1">
                  <strong>Clash detection:</strong> Identify conflicts between services before
                  physical work begins
                </li>
                <li className="pl-1">
                  <strong>Quantity extraction:</strong> Automatically count and list components for
                  ordering and budgeting
                </li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  BIM for Electrical Data
                </h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">
                    Distribution board: rated current, ways, manufacturer, model
                  </li>
                  <li className="pl-1">Cables: type, size, route, circuit reference</li>
                  <li className="pl-1">Luminaires: type, wattage, lamp type, mounting height</li>
                  <li className="pl-1">All linked to maintenance schedules in CMMS</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  UK BIM Requirements
                </h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">BIM Level 2 mandatory for public projects</li>
                  <li className="pl-1">ISO 19650 series governs information management</li>
                  <li className="pl-1">Asset Information Model (AIM) for operations</li>
                  <li className="pl-1">COBie data drops for asset handover</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Using CAD Viewers in Maintenance Practice
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              As a maintenance technician, you do not need to create CAD drawings, but you
              increasingly need to view and navigate them. CAD viewer applications — many of which
              are free — provide the tools you need to access digital drawings at the point of work,
              extract measurements, and find specific equipment within complex drawings.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Essential CAD Viewer Skills
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Zoom and pan:</strong> Navigate to specific areas of large drawings
                  quickly
                </li>
                <li className="pl-1">
                  <strong>Layer control:</strong> Show only the disciplines relevant to your task
                </li>
                <li className="pl-1">
                  <strong>Measure:</strong> Take distances, angles and areas directly from the
                  drawing
                </li>
                <li className="pl-1">
                  <strong>Search:</strong> Find components by tag number, description or attribute
                </li>
                <li className="pl-1">
                  <strong>Print/export:</strong> Print specific views or areas at the required scale
                </li>
                <li className="pl-1">
                  <strong>Markup:</strong> Add annotations and comments for red-line review
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Practical Workflow Example
              </h3>
              <p className="text-sm text-white">
                You receive a work order to replace a motor starter in MCC-01. Using the CAD viewer
                on your tablet: search for 'MCC-01' to locate the equipment on the GA drawing;
                switch to the panel layout layer to see the internal arrangement; zoom into the
                specific starter position to check dimensions; switch to the schematic layer to
                understand the circuit; and print the relevant views for reference during the
                physical work.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Digital Drawing Limitations</p>
              <p className="text-sm text-white">
                Digital drawings are only as accurate as their last update. If modifications have
                been made on site without updating the CAD drawing, the digital version will not
                match reality. Always verify critical information on site, report discrepancies, and
                never assume the digital drawing is correct without physical verification — the same
                principle that applies to paper drawings.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires competence
              in using information technology and documentation systems relevant to the workplace.
              As digital drawing systems become standard, CAD viewer skills and BIM awareness are
              increasingly part of the competence expected from qualified maintenance technicians.
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
                <p className="font-medium text-white mb-1">CAD File Formats</p>
                <ul className="space-y-0.5">
                  <li>DWG — AutoCAD native (most common)</li>
                  <li>DXF — universal interchange format</li>
                  <li>PDF — static output, universally readable</li>
                  <li>IFC — open BIM data exchange</li>
                  <li>RVT — Revit BIM native format</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">CAD Viewer Essentials</p>
                <ul className="space-y-0.5">
                  <li>Zoom, pan and navigate drawings</li>
                  <li>Toggle layers on/off for clarity</li>
                  <li>Measure distances and areas</li>
                  <li>Search by tag number or description</li>
                  <li>Print or export specific views</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Drawing Layouts
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section1">
              Back to Section 6.1 Hub
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule6Section1_5;
