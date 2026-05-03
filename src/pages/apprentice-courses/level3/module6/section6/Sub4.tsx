/**
 * Module 6 · Section 6 · Subsection 4 — BIM models + AutoCAD / Revit / Trimble overview for L3 designer
 * Maps to C&G 2365-03 / Unit 305 / LO5 / AC 5.7
 *   AC 5.7 — "Identify the digital tools commonly used to produce design documentation"
 *
 * Layered depth: 2366-03 Unit 304 / AC 5.7
 *
 * The L3 designer's overview of the digital tooling landscape — what BIM is, how
 * AutoCAD, Revit and Trimble fit, IFC and shared model exchange, BIM levels
 * (UK BS EN ISO 19650 series), CDE platforms, and how the L3 electrical designer
 * participates in a multi-discipline BIM model. Not a software course — a
 * literacy course so the L3 designer can read, contribute to and request from
 * a BIM workflow without being a BIM specialist.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  "BIM, AutoCAD, Revit, Trimble overview (5.7) | Level 3 Module 6.6.4 | Elec-Mate";
const DESCRIPTION =
  "Digital tooling literacy for the L3 designer — what BIM is, how AutoCAD, Revit and Trimble Stabicad fit, BS EN ISO 19650 information management, CDE platforms and IFC exchange.";

const checks = [
  {
    id: "m6-s6-sub4-bim-definition",
    question:
      "Which of the following best describes BIM (Building Information Modelling) as the L3 designer needs to understand it?",
    options: [
      "A 3D rendering of the building.",
      "A coordinated digital model of the building containing geometry plus structured information (object types, properties, relationships, system memberships) that all disciplines contribute to and read from. The information matters more than the 3D — the 'I' in BIM is the value.",
      "A type of CAD software.",
      "A government building regulation.",
    ],
    correctIndex: 1,
    explanation:
      "BIM is fundamentally about information sharing across disciplines and across the building's lifecycle. The 3D geometry is the visible bit; the structured information attached to every object (this is a TP+N distribution board, supplied from MSB-1, serving floor 2 lighting and power, manufactured by X, model Y, with these design ratings) is what makes BIM useful. UK industry has converged on BS EN ISO 19650 as the information management standard. Without the information layer, a 3D model is just a drawing; with it, it is a queryable database of the building.",
  },
  {
    id: "m6-s6-sub4-tool-fit",
    question:
      "Which of the following best matches the typical role of each tool on a UK commercial fit-out?",
    options: [
      "AutoCAD for everything.",
      "AutoCAD for 2D drawings (SLDs, layouts, schedules) and small projects; Revit for full BIM model authoring on multi-discipline projects; Trimble Stabicad / ProDesign / Amtech for electrical-specific design (calc + schedule + drawing in one electrical-aware environment); IFC for cross-tool exchange.",
      "Revit only.",
      "Trimble for civil engineering only — not for electrical.",
    ],
    correctIndex: 1,
    explanation:
      "Each tool has a sweet spot. AutoCAD excels at 2D documentation and is the universal lingua franca for drawings. Revit is the dominant BIM authoring tool for full multi-discipline modelling. Electrical-specific suites (Trimble Stabicad, ProDesign, Amtech) bring the BS 7671 calc engine and schedule generation into one environment that exports to AutoCAD or Revit. IFC (Industry Foundation Classes) is the open exchange format that lets these tools share models without proprietary lock-in. The L3 designer needs literacy in all four categories — not expertise in all four packages.",
  },
  {
    id: "m6-s6-sub4-iso-19650",
    question:
      "BS EN ISO 19650 (UK BIM standard) primarily addresses:",
    options: [
      "Electrical safety standards.",
      "Information management for the construction phase of building works — defining roles (Appointing Party, Lead Appointed Party, Task Team), information requirements (EIR, OIR, AIR), the Common Data Environment (CDE), and how information flows between the parties throughout the lifecycle.",
      "How to draft a single-line diagram.",
      "Cable selection for BIM-modelled installations.",
    ],
    correctIndex: 1,
    explanation:
      "BS EN ISO 19650 is an information management standard, not a CAD standard. It defines the roles, processes and protocols for managing information across the parties on a project — from the client's information requirements (EIR / OIR / AIR) through the production team's deliverables to the asset operations phase. The CDE (Common Data Environment) is the central platform. UK BIM Level 2 compliance typically means working to ISO 19650 with a structured CDE. The L3 designer's BIM literacy must include the role names and the CDE workflow, not just the software.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What does BIM stand for and what is its core idea?",
    options: [
      "Building Insurance Management — for risk on construction projects.",
      "Building Information Modelling — a coordinated digital model of the building containing geometry plus structured information that all disciplines contribute to and read from.",
      "Better Installation Methodology.",
      "British Industry Manual.",
    ],
    correctAnswer: 1,
    explanation:
      "BIM is Building Information Modelling. The core idea is one shared digital model of the building, with geometry plus structured information about every object, used by every discipline through the building's lifecycle. The 'M' is sometimes also read as Management — emphasising the information management discipline rather than just the model file.",
  },
  {
    id: 2,
    question: "What is the difference between AutoCAD and Revit?",
    options: [
      "There is no difference.",
      "AutoCAD is primarily a 2D drafting tool with 3D extensions; it is the lingua franca for drawings and works well for SLDs, layouts and schedules. Revit is a 3D BIM authoring tool — every object carries metadata and is part of a coordinated model with structural, mechanical and architectural disciplines.",
      "AutoCAD is for engineers, Revit for architects.",
      "Revit is free, AutoCAD is paid.",
    ],
    correctAnswer: 1,
    explanation:
      "AutoCAD is a drafting tool with strong 2D documentation capability and a long industry history; many SLDs, layouts and schedules are still produced in AutoCAD. Revit is a parametric BIM authoring tool where every object is an instance of a family and carries metadata used by other disciplines. Most projects use both — Revit for the model, AutoCAD for documentation views and standalone schematics that do not need to be parametric.",
  },
  {
    id: 3,
    question:
      "What is Trimble Stabicad (and similar packages such as Amtech, ProDesign, Hevacomp)?",
    options: [
      "Generic CAD software.",
      "Electrical-specific design suites that combine BS 7671 calculation engines with schedule generation and CAD drafting in one environment. They produce SLDs, schedules, calc sheets and Revit-exportable models from one shared dataset, removing the duplication between calc tool and CAD tool.",
      "Pricing software for electricians.",
      "Project management tools.",
    ],
    correctAnswer: 1,
    explanation:
      "Electrical design suites like Trimble Stabicad, Amtech (now part of Trimble), ProDesign and Hevacomp combine the calc engine, schedule generation and CAD drafting in one electrical-aware environment. The advantage is single-source data — change a cable size in the calc and the SLD, the schedule and the Revit model update together. The disadvantage is licence cost and steeper learning curve. Smaller designers often run a spreadsheet calc plus AutoCAD drawings; larger firms invest in the integrated suite.",
  },
  {
    id: 4,
    question: "What is IFC (Industry Foundation Classes)?",
    options: [
      "A type of cable.",
      "An open, vendor-neutral file format defined by buildingSMART for exchanging BIM data between tools. IFC lets a Revit model be read by ArchiCAD, a Trimble Stabicad model be read by Revit, and an MEP model be checked against a structural model regardless of authoring tool.",
      "An electrical standard.",
      "A British Standard for fire-stopping.",
    ],
    correctAnswer: 1,
    explanation:
      "IFC is the open exchange format for BIM data, maintained by the buildingSMART consortium. It lets models from different authoring tools be combined, queried and clash-detected without proprietary lock-in. UK government BIM Level 2 procurement specifications typically require IFC deliverables alongside the native model files. Most projects exchange via IFC even when all parties use Revit, because it forces a clean separation between the model and the authoring tool.",
  },
  {
    id: 5,
    question: "What is a Common Data Environment (CDE)?",
    options: [
      "An office where designers work.",
      "The single shared online platform where all project information is stored, controlled and exchanged — drawings, models, schedules, RFIs, change orders, all under structured access control and revision management. Examples include Autodesk Construction Cloud, Procore, Asite, Aconex, Viewpoint For Projects.",
      "A type of database for circuit calculations.",
      "An old name for a server.",
    ],
    correctAnswer: 1,
    explanation:
      "A CDE is the central source-of-truth platform for project information. BS EN ISO 19650 defines the CDE roles (Work In Progress, Shared, Published, Archive) and the workflows between them. Every drawing, every model, every RFI, every revision lives on the CDE; nothing important should live on someone's local laptop. The CDE is what makes coordinated multi-discipline working possible at scale.",
  },
  {
    id: 6,
    question: "What is 'clash detection' in a BIM workflow?",
    options: [
      "A test of fire alarm systems.",
      "A coordination check run in tools like Navisworks or Revit's built-in clash detection that finds geometric collisions between disciplines — e.g. a cable tray running through a structural beam, an HVAC duct passing through a fire compartment without a fire-stop, electrical conduit crossing a sprinkler pipe at the same height.",
      "A type of breaker tripping.",
      "A network protocol.",
    ],
    correctAnswer: 1,
    explanation:
      "Clash detection is one of BIM's headline benefits. By combining the electrical, mechanical, structural and architectural models in a clash detection tool, the project finds geometric and clearance conflicts before they show up on site. A clash that would have cost £5,000 to fix on site is a 30-second mouse-click resolution in the model. The L3 designer attends clash detection meetings to resolve the electrical-discipline clashes — re-routing cable trays, moving DBs, agreeing fire-stop locations.",
  },
  {
    id: 7,
    question: "What is the typical level of BIM literacy expected of an L3 electrical designer?",
    options: [
      "Full Revit certification.",
      "Functional literacy — able to navigate a coordinated model, read electrical objects with their attached information, raise and respond to clashes, contribute electrical content via either Revit (if competent) or by working with a BIM technician who imports the L3 designer's content into Revit, and understand the CDE and ISO 19650 roles. Full Revit authoring skill is a specialist add-on.",
      "Zero — BIM is for architects.",
      "Master-level certification in all BIM tools.",
    ],
    correctAnswer: 1,
    explanation:
      "L3 designers need BIM literacy, not BIM mastery. The skill expectations: navigate a model, read object metadata, participate in coordination meetings, understand clash reports, raise electrical-discipline clashes, contribute the SLD and schedule data either directly into Revit or by handing it to a BIM technician to model. Full Revit authoring is a specialist career path. Many L3 designers work in Trimble Stabicad or ProDesign and export to Revit via IFC; they never need to author native Revit families themselves.",
  },
  {
    id: 8,
    question: "Why does BIM matter for the L3 electrical designer specifically?",
    options: [
      "It is required by law on every project.",
      "On any multi-discipline project of meaningful size, BIM is how electrical coordinates with structural, mechanical, architectural and fire engineering disciplines. The L3 designer who cannot read or contribute to a BIM model is locked out of a growing share of commercial, public sector and HRRB work where BIM is the procurement default.",
      "Because BIM produces certificates automatically.",
      "Because it eliminates the need for an EIC.",
    ],
    correctAnswer: 1,
    explanation:
      "BIM is now the procurement default for UK public sector work and most large commercial projects. Designers who cannot participate in a BIM workflow are progressively excluded from those tenders. The skill is not full Revit mastery but functional literacy — navigate, read, contribute, coordinate. Get that, and the L3 designer can work on the modern multi-discipline project. Refuse it, and the available pipeline shrinks year on year.",
  },
];

const faqs = [
  {
    question: "Do I need to learn Revit if I am working as an L3 designer on small commercial jobs?",
    answer:
      "Not as an authoring tool, no — small commercial jobs rarely run on Revit. Most small commercial designers work in AutoCAD plus a spreadsheet calc, or in an electrical suite like Amtech / Trimble Stabicad / ProDesign. What you do need is BIM literacy: enough to navigate a Revit model someone else has authored, read electrical objects, attend a clash detection meeting and contribute electrical content via export. Full Revit authoring is a specialist skill set that takes 6 to 12 months to develop competently; you can pick it up later if your career moves toward larger BIM projects.",
  },
  {
    question: "What is the difference between BIM Level 1, 2 and 3?",
    answer:
      "UK BIM maturity levels — Level 0 is paper drawings or unmanaged CAD, Level 1 is managed CAD in 2D or 3D with a CDE, Level 2 is full collaborative working with separate discipline models exchanged via IFC and combined for clash detection (this is the UK government BIM Level 2 mandate from 2016), Level 3 is fully integrated, real-time, single-model collaboration with embedded asset data through the building's lifecycle. Most UK projects work at Level 2; Level 3 is aspirational and project-by-project where the client invests in it. ISO 19650 codifies Level 2 working.",
  },
  {
    question: "What is the LOD (Level of Development) in a BIM model?",
    answer:
      "LOD describes how detailed and reliable an object in the model is at a given project phase. LOD 100 is conceptual (a generic block representing 'a distribution board, somewhere'); LOD 200 is approximate geometry and basic information; LOD 300 is precise geometry and confirmed information used for detailed design and procurement (a specific manufacturer's TP+N board, accurate dimensions, real ratings); LOD 400 adds fabrication and installation detail; LOD 500 is the as-built model with verified information. The L3 designer's outputs typically sit at LOD 300 to 400 by the time the design is issued for construction. ISO 19650 uses 'Level of Information Need' as a more nuanced replacement.",
  },
  {
    question: "Which CDE platform should I learn?",
    answer:
      "Whichever your client uses. Autodesk Construction Cloud (formerly BIM 360) is dominant in the Revit ecosystem. Procore is dominant in general construction management. Asite is common in UK public sector. Aconex (Oracle) is common on large infrastructure. Viewpoint For Projects is common in fit-out. The interfaces differ; the underlying ISO 19650 workflow is the same — Work In Progress, Shared, Published, Archive. Learn the workflow once and you can adapt to any platform in a couple of days. Most platforms offer free training and certification paths.",
  },
  {
    question: "Can I use BIM for a domestic CU upgrade?",
    answer:
      "Technically yes; practically no. BIM tooling and the ISO 19650 process are built for multi-discipline projects with significant coordination needs. A domestic CU upgrade does not have those needs — there is no structural model to coordinate with, no fire engineer to clash-check, no M&E coordinator. AutoCAD or hand-drawn schedules plus a spreadsheet calc are the proportionate tools. The principle is fit-for-purpose: BIM scales up brilliantly to large multi-discipline projects, scales down poorly to single-discipline small works. The L3 designer needs the judgement to know when each tool is right.",
  },
  {
    question: "What does the Building Safety Act 2022 add to BIM expectations on HRRBs?",
    answer:
      "The BSA 2022 requires a 'golden thread' of information for higher-risk residential buildings (HRRBs — broadly residential buildings 18 m or seven storeys and above) — accessible, accurate, current building information that survives the building's lifetime. BIM is the practical mechanism for delivering the golden thread because it embeds information in objects and supports lifecycle access. The Building Safety Regulator (BSR) is increasingly expecting BIM-based information delivery on HRRBs. Sub 5 covers the golden thread in detail; the BIM literacy from this Sub is what enables the L3 designer to participate in delivering it on HRRBs.",
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module6-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 6 · Subsection 4"
            title="BIM, AutoCAD, Revit, Trimble — digital tooling for the L3 designer"
            description="A literacy overview of the digital tooling landscape. What BIM is, how AutoCAD, Revit and electrical suites like Trimble Stabicad fit, BS EN ISO 19650 information management, the CDE, IFC exchange, and the L3 designer's place in a multi-discipline BIM workflow."
            tone="amber"
          />

          <TLDR
            points={[
              "BIM (Building Information Modelling) is a coordinated digital model of the building containing geometry plus structured information that all disciplines contribute to and read from. The information matters more than the 3D — the 'I' in BIM is the value.",
              "AutoCAD is the 2D drafting lingua franca; Revit is the dominant BIM authoring tool; Trimble Stabicad / ProDesign / Amtech are electrical-specific suites combining calc, schedule and CAD; IFC is the vendor-neutral exchange format.",
              "BS EN ISO 19650 is the UK BIM information management standard. It defines the roles, the information requirements (EIR / OIR / AIR), the Common Data Environment (CDE) workflow and the deliverables.",
              "The L3 designer needs BIM literacy, not BIM mastery — navigate a model, read object metadata, attend clash detection meetings, contribute electrical content. Full Revit authoring is a specialist add-on.",
              "BIM is the procurement default for UK public sector work, most large commercial projects and HRRBs under the Building Safety Act 2022. Designers who cannot participate are progressively excluded.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Define BIM (Building Information Modelling) and explain why the 'I' (information) matters more than the '3D'.",
              "Describe the typical role of AutoCAD, Revit and electrical-specific suites (Trimble Stabicad, Amtech, ProDesign, Hevacomp) in a UK design workflow.",
              "Explain the purpose of IFC (Industry Foundation Classes) as the vendor-neutral exchange format for BIM data.",
              "Outline the BS EN ISO 19650 roles (Appointing Party, Lead Appointed Party, Task Team) and the Common Data Environment (CDE) workflow.",
              "Identify the BIM literacy expected of an L3 designer — navigate, read, contribute, coordinate — and distinguish it from full Revit authoring competence.",
              "Participate in a clash detection workflow and resolve electrical-discipline clashes against structural, mechanical and architectural models.",
              "Recognise where BIM is the procurement default (public sector, large commercial, HRRBs under BSA 2022) and where simpler tools remain proportionate (small commercial, domestic).",
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="What BIM actually is"
            plainEnglish="A coordinated digital model of the building. Every object in the model carries information about itself. Every discipline contributes and reads. One source of truth across the lifecycle."
            onSite="The visible bit is the 3D model. The valuable bit is the information attached to each object. A breaker in the BIM model is not just a 3D shape — it is a database row that knows its rating, its supply, its downstream circuits and its design Zs."
          >
            <p>
              BIM (Building Information Modelling, sometimes Building Information Management) is a
              process and toolset for producing a coordinated digital model of a building that
              contains both geometry and structured information. The model is shared across all
              project disciplines — architecture, structure, mechanical, electrical, fire, public
              health, BMS — and used through the building's lifecycle, from design through
              construction to operation, maintenance and eventual demolition.
            </p>
            <p>
              The L3 designer needs to understand four things about BIM:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>It is coordinated</strong> — every discipline's model occupies the same coordinate system, so geometric clashes can be found and resolved before they reach site.</li>
              <li><strong>It carries information</strong> — every object is parameterised. A distribution board object knows its type, supply origin, downstream circuits, ratings and manufacturer reference. Querying the model gives discipline-specific reports without redrawing.</li>
              <li><strong>It is shared</strong> — all parties work from a single source of truth on a Common Data Environment (CDE), with structured access control, revision management and audit trail.</li>
              <li><strong>It survives the lifecycle</strong> — the as-built model becomes the operations and maintenance dataset for the building owner, used by future maintainers, retrofit designers and (on HRRBs) Building Safety Regulator audits.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The toolset — AutoCAD, Revit, Trimble Stabicad and friends</ContentEyebrow>

          <ConceptBlock
            title="AutoCAD — the 2D lingua franca"
            plainEnglish="The universal 2D drafting tool. Strong for SLDs, layouts and schedules. Still the most common documentation tool in UK electrical design."
            onSite="Almost every UK electrical designer can read an AutoCAD DWG. It is the lowest common denominator for sharing drawings across organisations and tools."
          >
            <p>
              AutoCAD (Autodesk) is the long-established 2D drafting tool that has been the
              electrical industry standard for decades. Its strengths:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Universal compatibility</strong> — DWG files open in almost every CAD tool. PDF and DWG sharing is the default exchange for drawings outside a BIM workflow.</li>
              <li><strong>2D documentation</strong> — strong layer control, dimensioning, annotation and printing. SLDs, layouts and schedule drawings work naturally.</li>
              <li><strong>Lightweight</strong> — runs on modest hardware. A small designer with a laptop can produce a complete commercial design pack.</li>
              <li><strong>Scriptable</strong> — AutoLISP and ObjectARX let firms automate repetitive drafting tasks (e.g. drop a panel symbol with annotations from a database).</li>
            </ul>
            <p>
              AutoCAD's weakness is that it is fundamentally 2D. Its 3D extensions exist but it is
              not a parametric BIM authoring tool. On a multi-discipline BIM project AutoCAD is
              still used for documentation views and standalone schematics, but the model itself
              is authored in Revit or another BIM tool.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Revit — the BIM authoring tool"
            plainEnglish="The dominant tool for 3D parametric BIM modelling. Every object is an instance of a family with parameters and metadata. Discipline-aware: structural, MEP and architectural Revit work together."
          >
            <p>
              Revit (Autodesk) is the dominant 3D BIM authoring tool in the UK. Its features for
              the L3 designer:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Parametric families</strong> — every object (a luminaire, a DB, a cable tray) is an instance of a family with editable parameters. Change the family, every instance updates.</li>
              <li><strong>Discipline modules</strong> — Revit MEP (mechanical, electrical, plumbing) provides electrical-aware tools. Revit Architecture is the architect's view, Revit Structure is the structural engineer's.</li>
              <li><strong>Worksharing</strong> — multiple users edit one central model concurrently via a worksharing or cloud-collaboration mechanism. Conflicts are resolved through workset ownership.</li>
              <li><strong>Schedules</strong> — Revit can produce live schedules direct from the model. Add a luminaire to the model, the Schedule of Luminaires updates automatically.</li>
              <li><strong>Coordination views</strong> — combine architectural, structural and MEP models for review and clash detection.</li>
            </ul>
            <p>
              Revit's drawback is the learning curve. Authoring native Revit content competently
              takes 6 to 12 months of regular use. Many L3 designers leave Revit authoring to a
              specialist BIM technician and contribute electrical content via export from an
              electrical suite or via spreadsheet handover for the BIM technician to model.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Trimble Stabicad, Amtech, ProDesign, Hevacomp — the electrical suites"
            plainEnglish="Electrical-aware design environments. BS 7671 calc engine, schedule generation and CAD drafting in one tool. Single-source data — change a cable size and SLD, schedule and Revit export update together."
            onSite="The integrated suites remove the duplication between calc tool, drafting tool and BIM tool. The cost is licence fee and training; the benefit is consistency and speed."
          >
            <p>
              Electrical-specific design suites combine three jobs in one environment:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Trimble Stabicad</strong> — full electrical (and mechanical) design suite with native Revit integration. Strong on commercial fit-out and HRRBs.</li>
              <li><strong>Amtech (Trimble)</strong> — electrical-only suite, strong BS 7671 calc engine, popular with mid-size firms. Now part of the Trimble portfolio.</li>
              <li><strong>ProDesign</strong> — UK-developed electrical design suite with Vd, fault and discrimination calc, schedule generation, AutoCAD output. Common in small to mid-size firms.</li>
              <li><strong>Hevacomp</strong> — electrical and mechanical design with calc and drawing in one tool. Strong on lighting design (BS EN 12464-1, daylight integration).</li>
              <li><strong>Trimble DesignLink</strong> — links calc and Revit MEP for live model updates from electrical changes.</li>
            </ul>
            <p>
              The advantage of these suites is single-source data: change a cable size in the calc
              and the SLD, the schedule and the Revit export all update together. The
              disadvantage is licence cost (typically £2,000 to £8,000 per seat per year) and a
              steeper learning curve than a spreadsheet plus AutoCAD. Smaller designers often
              start with spreadsheet plus AutoCAD; larger firms invest in the integrated suite.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 514.9.1 (Diagrams, charts, tables and similar information) — amended in A4:2026"
            clause="Regulation 514.9.1 requires that a diagram, chart, table or equivalent form of information be provided at every distribution board sufficient to identify the circuits — typically covering the type and composition of each circuit (points of utilisation served, number and size of conductors, type of wiring) and the devices performing protection, isolation and switching. A4:2026 amended 514.9.1 to include an exception for domestic (household) premises; consult the published A4:2026 wording for the precise scope of that exception."
            meaning={
              <>
                Reg 514.9.1 sets the per-DB chart requirement which BIM-based design discharges
                naturally — Revit, Stabicad and the other electrical suites generate the per-DB
                circuit chart directly from the model, with the points of utilisation, the
                conductor specs and the protective devices all populated from object metadata.
                A4:2026 added a domestic exception which narrows scope for household installs;
                non-domestic work is full force. The BIM advantage is single-source consistency —
                the same data drives the SLD, the schedules and the per-DB chart, so all three
                cannot fall out of sync.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 51, Regulation 514.9.1."
          />

          <CommonMistake
            title="Treating BIM as a 3D rendering exercise rather than an information model"
            whatHappens={
              <>
                A junior designer is asked to 'do BIM' on a project and spends weeks making the
                model look pretty in 3D — adding textures, light fittings with realistic finishes,
                rendered views for the client presentation. The information layer is neglected.
                Object parameters are missing, the schedule pulls back blanks, the model cannot be
                used for procurement or operations. The pretty 3D model has no BIM value.
              </>
            }
            doInstead={
              <>
                Get the information layer right first. Every electrical object should carry its
                type, supply origin, downstream service, ratings, manufacturer reference and any
                design parameters. The 3D appearance can be schematic — what matters is that the
                model is queryable, that schedules pull the right data, that clash detection
                works on accurate geometry, and that the as-built model becomes a useful
                operations dataset. Fancy rendering is a separate task done late if at all.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>BS EN ISO 19650 and the CDE</ContentEyebrow>

          <ConceptBlock
            title="BS EN ISO 19650 — UK BIM information management standard"
            plainEnglish="The standard that defines roles, information requirements and the CDE workflow. UK BIM Level 2 compliance means working to ISO 19650."
          >
            <p>
              BS EN ISO 19650 (in several parts) is the UK adoption of the international standard
              for information management on construction projects. The relevant parts:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Part 1</strong> — concepts and principles. Defines the underlying terminology and the information lifecycle.</li>
              <li><strong>Part 2</strong> — delivery phase of the assets. The construction-phase processes most relevant to the L3 designer.</li>
              <li><strong>Part 3</strong> — operational phase of the assets. The asset-management processes after handover.</li>
              <li><strong>Part 4</strong> — information exchange. Standards for handing over information between parties.</li>
              <li><strong>Part 5</strong> — security-minded approach to information management. Cyber security for BIM data.</li>
            </ul>
            <p>
              The standard names roles and information artefacts that the L3 designer encounters:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Appointing Party</strong> — the client who commissions the work.</li>
              <li><strong>Lead Appointed Party</strong> — the principal contractor or design lead.</li>
              <li><strong>Appointed Party</strong> — a discipline-lead organisation (e.g. an MEP consultancy).</li>
              <li><strong>Task Team</strong> — the working team within an appointed party (e.g. the L3 electrical designer plus a junior plus a BIM technician).</li>
              <li><strong>EIR (Exchange Information Requirements)</strong> — the client's specification for what information they need at each project stage.</li>
              <li><strong>OIR (Organisational Information Requirements)</strong> — the client's standing requirements for asset operation.</li>
              <li><strong>AIR (Asset Information Requirements)</strong> — what information is needed for ongoing operation of the finished asset.</li>
              <li><strong>BEP (BIM Execution Plan)</strong> — the project's plan for delivering the EIR.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.1 (Design documentation framework, Regs 132.2–132.5)"
            clause="The information required as a basis for design is stated in Regulations 132.2 to 132.5. The requirements to which the design shall conform are stated in Regulations 132.6 to 132.16. Designers shall therefore determine and record the information listed in 132.2–132.5 to demonstrate conformity with subsequent design requirements."
            meaning={
              <>
                The Reg 132.1 framework sets the BS 7671 documentation duty. BIM is one delivery
                mechanism for that duty, but the framework does not mandate BIM — it mandates
                that the Regs 132.2–132.5 information is determined and recorded. A spreadsheet
                plus AutoCAD plus a calc sheet can satisfy the duty just as a full BIM model
                can. What BIM adds is queryability, lifecycle persistence and integration with
                the operations and maintenance phase. On HRRBs the BSA 2022 golden thread pushes
                BIM toward de facto requirement; on smaller commercial work the choice is
                proportionate to the project complexity.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.1 framework."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="The Common Data Environment (CDE)"
            plainEnglish="The single shared platform where all project information lives. Drawings, models, schedules, RFIs, change orders. Structured access control, revision management, audit trail."
          >
            <p>
              The CDE is the operational heart of any BIM project. ISO 19650 defines four CDE
              states that information passes through:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Work In Progress (WIP)</strong> — owned by one task team, edited freely. Not visible to other parties.</li>
              <li><strong>Shared</strong> — published for review and coordination by other task teams. Version-controlled and stable enough for others to work against, but not yet authoritative.</li>
              <li><strong>Published</strong> — formally released as the project's authoritative reference. Used for procurement, construction and contracts.</li>
              <li><strong>Archive</strong> — superseded versions retained for audit. Read-only. Cannot be worked from but cannot be lost.</li>
            </ul>
            <p>
              Common UK CDE platforms:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Autodesk Construction Cloud (formerly BIM 360)</strong> — dominant in the Revit ecosystem. Strong model coordination and clash detection.</li>
              <li><strong>Procore</strong> — strong on construction management, RFIs and document control. Common across general construction.</li>
              <li><strong>Asite</strong> — common on UK public sector and infrastructure work.</li>
              <li><strong>Aconex (Oracle)</strong> — common on large infrastructure and major projects.</li>
              <li><strong>Viewpoint For Projects (Trimble)</strong> — common in fit-out and contractor-led projects.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>IFC and clash detection</ContentEyebrow>

          <ConceptBlock
            title="IFC — the open exchange format"
            plainEnglish="A vendor-neutral file format for sharing BIM data between tools. Lets a Revit model be read by ArchiCAD, Trimble Stabicad data be read by Revit, and the L3 designer's calc tool exchange with the architect's BIM tool."
          >
            <p>
              IFC (Industry Foundation Classes) is maintained by the buildingSMART consortium and
              is the open exchange format for BIM. It defines a standard schema for building
              objects (walls, doors, ducts, electrical equipment, structural members) and their
              relationships. Why IFC matters:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Vendor independence</strong> — projects do not get locked into one tool. Native files (RVT for Revit, DWG for AutoCAD, IFC export from Stabicad) all share via IFC.</li>
              <li><strong>UK BIM Level 2 mandate</strong> — government procurement specs typically require IFC deliverables alongside native model files.</li>
              <li><strong>Clash detection</strong> — IFC models from different disciplines combine cleanly in Navisworks, Solibri or Revit's clash detection module.</li>
              <li><strong>Lifecycle handover</strong> — the as-built IFC model can be opened by future tools the project never anticipated. A 30-year retention obligation does not depend on the original authoring tool still existing.</li>
            </ul>
            <p>
              The L3 designer rarely authors IFC directly — it is an export format. What matters
              is that the electrical content the designer produces can round-trip through IFC
              cleanly, with the right object types, the right metadata and the right relationships
              preserved.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Clash detection — the headline BIM benefit"
            plainEnglish="Combine the electrical, mechanical, structural and architectural models. The clash detection tool finds geometric collisions before they reach site. A 30-second model fix replaces a £5,000 site fix."
            onSite="Attend the clash detection meetings. Resolve the electrical-discipline clashes by re-routing cable trays, moving DBs or agreeing fire-stop locations. The L3 designer's job at clash detection is to defend the electrical strategy and adjust where it does not compromise the design."
          >
            <p>
              Clash detection is run in tools like Navisworks (Autodesk), Solibri (Trimble) or
              Revit's built-in module. The combined federated model is queried for geometric
              clashes between disciplines:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Hard clashes</strong> — physical intersections (cable tray through a structural beam, conduit through a duct). Must be resolved.</li>
              <li><strong>Soft clashes</strong> — clearance violations (cable tray within 25 mm of a hot pipe; insufficient access space around a DB). Should be resolved.</li>
              <li><strong>Workflow clashes</strong> — sequencing issues (DB cannot be installed until plasterboard is up, but plasterboard cannot finish until DB is in). Programme implications.</li>
            </ul>
            <p>
              Each clash is logged as an issue in the CDE. Each issue has an owner, a discipline,
              a status and a resolution. The L3 designer's role at clash detection is to:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Review clashes assigned to the electrical discipline.</li>
              <li>Decide whether to re-route, re-locate, accept clearance reduction, or push back to another discipline.</li>
              <li>Update the electrical model (or the BIM technician's working copy) to resolve.</li>
              <li>Re-publish the resolved electrical model for the next round of detection.</li>
            </ul>
            <p>
              Clash detection runs cyclically through design development. Early rounds find lots
              of clashes; later rounds find few. By the time the design is published for
              construction, clash count should be near zero. Clashes that reach site cost real
              money; clashes resolved in the model cost a few minutes.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The L3 designer's place in the BIM workflow</ContentEyebrow>

          <ConceptBlock
            title="What an L3 designer needs to be able to do in BIM"
            plainEnglish="Navigate, read, contribute, coordinate. Not full Revit authoring. Not BIM management. Functional literacy that lets the designer work on multi-discipline projects without being the BIM specialist."
          >
            <p>
              The L3 designer's BIM literacy targets:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Navigate a model</strong> — open a federated model in a viewer (Navisworks Freedom is free), pan, zoom, rotate, isolate disciplines, look up object metadata.</li>
              <li><strong>Read electrical objects</strong> — find a DB in the model, read its properties, trace the supply, list its downstream circuits.</li>
              <li><strong>Attend coordination meetings</strong> — participate in clash detection reviews, resolve electrical clashes, agree changes with other disciplines.</li>
              <li><strong>Raise and respond to BIM-linked RFIs</strong> — an RFI on a CDE can include direct links to model elements; the designer responds in the same workflow.</li>
              <li><strong>Contribute electrical content</strong> — either author directly in Revit MEP (specialist skill) or hand calc-and-schedule data to a BIM technician for modelling. Most L3 designers do the second.</li>
              <li><strong>Read a clash report</strong> — understand discipline codes, clash categories and resolution status.</li>
              <li><strong>Understand the CDE workflow</strong> — know which CDE state a document is in, what it means for editing rights, and how to publish for sharing.</li>
              <li><strong>Apply ISO 19650 role names</strong> — recognise the Appointing Party / Lead Appointed Party / Task Team structure on a project and know where the L3 designer fits.</li>
            </ul>
            <p>
              These skills can be built in 2 to 3 weeks of focused learning plus on-the-job
              practice. They do not require a Revit certification. Full Revit MEP authoring
              competence is a separate 6 to 12 month skill build that some L3 designers undertake
              and others delegate to specialists.
            </p>
          </ConceptBlock>

          <Scenario
            title="Multi-discipline office fit-out — the L3 designer's first BIM project"
            situation={
              <>
                You have been working as an L3 designer on small commercial fit-outs in AutoCAD
                plus a spreadsheet calc. A new project lands — a 6,500 sq m office fit-out for a
                public-sector tenant. Procurement requires BIM Level 2 deliverables to ISO 19650.
                The project will run on Autodesk Construction Cloud as the CDE; the architect and
                structural engineer will author in Revit; you are the named electrical designer.
                You do not have Revit authoring competence.
              </>
            }
            whatToDo={
              <>
                Do not panic. The L3 designer's role here is electrical design competence; full
                Revit authoring can be delegated. Action plan: (1) Confirm the BIM Execution Plan
                (BEP) and the EIR. Read what the client wants and at what LOD by which project
                stage. (2) Engage a BIM technician (in-house or freelance) to author the
                electrical Revit content from your design data. Many designers work this way
                routinely. (3) Choose your authoring environment for the calc and SLD —
                spreadsheet plus AutoCAD if that is what you know, or invest in an electrical
                suite (ProDesign or Stabicad) that exports natively to Revit. (4) Get viewer
                literacy on the CDE — Autodesk Construction Cloud has free training. Get
                comfortable navigating the federated model, reading object metadata, and
                participating in coordination workflows. (5) Attend every clash detection meeting.
                Take the electrical clashes back to the BIM technician with your decisions on
                re-routes. (6) Treat RFIs through the CDE — they may link directly to model
                elements rather than to traditional drawings. (7) Build your literacy as you go.
                The first BIM project is the steepest learning curve; the second one is much
                easier. You will be a competent BIM-aware L3 designer within one project cycle.
              </>
            }
            whyItMatters={
              <>
                BIM is the procurement default for an increasing share of UK commercial and
                public-sector work. Designers who refuse to engage are progressively excluded
                from the available pipeline. The good news: BIM literacy (not BIM mastery) is
                achievable in weeks, not months. The L3 designer who treats the first BIM project
                as a learning investment opens up the next 10 years of career to the larger and
                more interesting projects in the market. The L3 designer who refuses to engage
                stays in the small-commercial slice of the market where AutoCAD-only is still
                acceptable — a slice that shrinks every year.
              </>
            }
          />

          <SectionRule />

          <CommonMistake
            title="L3 designer trying to learn full Revit authoring before doing the first BIM project"
            whatHappens={
              <>
                The designer signs up for a Revit certification course and spends three months
                trying to learn Revit MEP from scratch. The first BIM project arrives in week 6
                of the course; the designer panics, takes the project but underdelivers because
                they are still learning the tool. The combination of learning Revit and running
                a live project at the same time produces a slow, error-prone first project.
              </>
            }
            doInstead={
              <>
                Separate the skills. Build BIM literacy first (navigate, read, coordinate, ISO
                19650, CDE) — that is two to three weeks of focused study. Take the first BIM
                project with that literacy, plus a BIM technician handling the Revit authoring
                from your design data. Build Revit authoring competence later, in parallel with
                live work, over 6 to 12 months. The two paths are separable; treating them as one
                makes both fail.
              </>
            }
          />

          <SectionRule />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 644.1.1 (New installation — defects to be corrected before Certificate issued)"
            clause="For a new installation, any defect or omission revealed during the inspection and testing shall be corrected before the Certificate is issued."
            meaning={
              <>
                Reg 644.1.1 is the regulatory backstop that makes the BIM data quality matter for
                EIC issue. If the as-installed state of the building does not match the BIM model,
                the inspector finds disagreement at handover — that is a defect or omission for
                the purposes of this regulation. Either the install is brought back to match the
                model or the model is updated to as-installed and re-issued. BIM does not change
                the regulatory requirement; it changes the speed and accuracy with which the
                update can be made. A well-maintained model with structured object metadata
                supports a 4-week handover; a model that drifted from the install during
                construction can take months to true up.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 644.1.1."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "BIM (Building Information Modelling) is a coordinated digital model of the building containing geometry plus structured information that all disciplines contribute to and read from. The information matters more than the 3D.",
              "AutoCAD is the 2D drafting lingua franca, still dominant for SLDs, layouts and schedules on smaller projects. Revit is the dominant 3D BIM authoring tool. Trimble Stabicad / Amtech / ProDesign / Hevacomp are electrical-specific suites combining calc, schedule and CAD.",
              "IFC (Industry Foundation Classes) is the vendor-neutral exchange format that lets BIM models from different tools combine, share and clash-check. UK government BIM Level 2 typically requires IFC deliverables.",
              "BS EN ISO 19650 is the UK BIM information management standard. It defines the roles (Appointing Party, Lead Appointed Party, Task Team), the information requirements (EIR / OIR / AIR / BEP) and the Common Data Environment (CDE) workflow.",
              "The CDE has four states — Work In Progress, Shared, Published, Archive. Common platforms: Autodesk Construction Cloud, Procore, Asite, Aconex, Viewpoint For Projects.",
              "Clash detection is the headline BIM benefit. Combine discipline models in Navisworks, Solibri or Revit; the L3 designer attends coordination meetings and resolves electrical clashes by re-routing or re-locating.",
              "L3 designers need BIM literacy, not BIM mastery — navigate, read, contribute, coordinate. Achievable in 2 to 3 weeks of focused learning. Full Revit MEP authoring is a separable 6 to 12 month skill build.",
              "BIM is the procurement default for UK public sector, large commercial and HRRBs under the Building Safety Act 2022. Reg 132.13 does not mandate BIM but Reg 132.13 sufficiency is increasingly delivered through BIM on larger projects.",
            ]}
          />

          <Quiz
            title="BIM and digital tooling — knowledge check"
            questions={quizQuestions}
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/level3-module6-section6-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.3 RFI workflow + chain accountability
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/level3-module6-section6-5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.5 Design pack handover + golden thread
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
