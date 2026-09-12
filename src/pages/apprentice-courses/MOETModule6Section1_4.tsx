/**
 * MOET · Module 6 · Section 1 · Subsection 4 — Drawing Layouts and Title Blocks
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered: no verified ST1426 KSB statement list for Module 6 was
 * available at conversion time (Modules 1–4 have verified lists; Module 6
 * does not). Rather than invent statements or borrow another module's list,
 * this header omits specific KSB quotes. Flagged for follow-up once a
 * verified Module 6 KSB list exists.
 *
 * Reference conversion for the MOET redesign — the pattern every other
 * subsection page follows. Content preserved from the original; structure,
 * shell and reading measure rebuilt on the study-centre learning kit.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Drawing Layouts and Title Blocks - MOET Module 6 Section 1.4';
const DESCRIPTION =
  'Standard drawing sheet sizes, title block information, border layouts, revision tables, parts lists, drawing registers and document management conventions for electrical maintenance technicians.';

const quickCheckQuestions = [
  {
    id: 'title-block-purpose',
    question: 'What is the primary purpose of the title block on an engineering drawing?',
    options: [
      'To list every dimension and tolerance shown on the drawing in a single table',
      'To provide a legend explaining all the symbols used throughout the drawing body',
      'To provide key identification information — drawing number, title, scale, revision and approvals',
      'To record the names of everyone who has viewed or borrowed a copy of the drawing',
    ],
    correctIndex: 2,
    explanation:
      "The title block is the 'identity card' of the drawing. It contains the drawing number (unique identifier), title, scale, projection convention, revision status, originator, checker, approver, date, and often material and finish specifications. This information is essential for document control and ensuring you are reading the correct, current drawing.",
  },
  {
    id: 'drawing-number',
    question:
      'Why is the drawing number the most important piece of information on an engineering drawing?',
    options: [
      'It indicates the scale at which the drawing has been produced',
      'It is the unique identifier used to retrieve, reference and manage the drawing',
      'It shows the order in which the drawings were created on the project',
      'It records the file size and storage location of the digital drawing',
    ],
    correctIndex: 1,
    explanation:
      'The drawing number is the unique reference that connects the drawing to the document management system, the asset register, the O&M manual, and all cross-references. When ordering parts, reporting discrepancies, or requesting information, the drawing number is the key to finding the correct document.',
  },
  {
    id: 'revision-table',
    question: 'A revision table on a drawing shows:',
    options: [
      'A list of every component and material quantity required to build the item',
      'A chronological record of changes: revision letter, date, description and who authorised it',
      'A schedule of the dimensions and tolerances that must be inspected',
      'An index of all the other drawings cross-referenced from this sheet',
    ],
    correctIndex: 1,
    explanation:
      "The revision table (or revision history) is an audit trail of every change made to the drawing since its original issue. Each entry records the revision identifier (letter or number), the date of change, a brief description of what changed, and who approved the change. This is essential for understanding the drawing's history and confirming you have the current version.",
  },
  {
    id: 'sheet-sizes',
    question:
      'The standard paper sizes used for engineering drawings in the UK follow which series?',
    options: [
      'The ISO B series: B0, B1, B2, B3, B4 used for technical drawings',
      'The Imperial series: Letter, Legal, Tabloid and Ledger sizes',
      'The ISO C series: C0, C1, C2, C3, C4 used for envelopes and drawings',
      'The ISO A series: A0 (largest standard), A1, A2, A3, A4 (smallest common size)',
    ],
    correctIndex: 3,
    explanation:
      'UK engineering drawings use the ISO A series: A0 (841 x 1189 mm) is the largest standard size; A1 is half of A0, A2 is half of A1, and so on. A3 and A4 are commonly used for smaller detail drawings and schematic diagrams. The aspect ratio of all A sizes is 1 to the square root of 2, meaning each size folds exactly into the next smaller size.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The title block on an engineering drawing is positioned:',
    options: [
      'In the top left corner, so it is the first thing read when scanning the sheet',
      'In the bottom right corner of the drawing sheet, visible when the drawing is folded to A4 size',
      'In the centre of the sheet, surrounded by the drawing views',
      'Along the left-hand binding margin, running vertically up the sheet',
    ],
    correctAnswer: 1,
    explanation:
      'The title block is positioned in the bottom right corner so that it remains visible when larger drawings (A0, A1, A2) are folded down to A4 size for filing. This allows the drawing to be identified without unfolding it — essential for quick retrieval from filing cabinets or plan chests.',
  },
  {
    id: 2,
    question: 'A drawing scale of 1:2 means:',
    options: [
      'The drawing is twice the actual size — every 2 mm on the drawing represents 1 mm in reality',
      'The drawing shows two views of the same component side by side',
      'The drawing is half the actual size — every 1 mm on the drawing represents 2 mm in reality',
      'The drawing must be photocopied at 200% to reach its true size',
    ],
    correctAnswer: 2,
    explanation:
      'A scale of 1:2 is a reduction — the drawing is half the actual size. Scales greater than 1:1 (e.g., 2:1, 5:1) are enlargements used for small components. Scales less than 1:1 (e.g., 1:2, 1:5, 1:10, 1:50) are reductions used for large equipment or building layouts. The scale is always stated in the title block.',
  },
  {
    id: 3,
    question: 'The border around an engineering drawing serves to:',
    options: [
      'Hold the title block, parts list and revision table in a fixed layout',
      'Indicate the scale and projection convention applied across the whole sheet',
      'Show the load-bearing edges of the component or assembly being drawn',
      'Define the drawing area, provide zone references and accommodate the filing margin',
    ],
    correctAnswer: 3,
    explanation:
      'The border defines the usable drawing area, provides a filing margin (left side, typically 20 mm for binding), and often includes zone reference marks (letters vertically, numbers horizontally) that allow specific features to be located by grid reference — similar to map coordinates.',
  },
  {
    id: 4,
    question: "When a drawing states 'Do Not Scale', this means:",
    options: [
      'Use only the written dimension values, never measurements taken from the printed paper',
      'The drawing has no scale and is purely diagrammatic with no real proportions at all',
      'The drawing must not be enlarged or reduced when it is photocopied for issue',
      'The drawing is confidential and must not be copied or distributed any further',
    ],
    correctAnswer: 0,
    explanation:
      "The warning 'Do Not Scale' reminds users that measurements taken directly from the paper (using a ruler) may be inaccurate due to printing variations, paper shrinkage, or photocopying distortion. Always use the stated dimension figures. If a dimension is not shown and cannot be determined from other dimensions, request clarification from the drawing originator.",
  },
  {
    id: 5,
    question: 'A drawing register is:',
    options: [
      'A log of every person who has signed out a paper copy of a drawing',
      'A controlled index of all project drawings with their current revision status',
      'A record of the changes made to a single drawing across its revisions',
      'A schedule of the dimensions that must be checked on each component',
    ],
    correctAnswer: 1,
    explanation:
      'The drawing register is the master index of all drawings. It lists every drawing number, its title, current revision, issue date, and who holds controlled copies. The register is essential for document control — it tells you whether a drawing exists, what its current revision is, and where to find it.',
  },
  {
    id: 6,
    question: 'The difference between a general arrangement (GA) drawing and a detail drawing is:',
    options: [
      'A GA drawing is always at a larger scale than a detail drawing',
      'A GA drawing is hand-drawn while a detail drawing is produced in CAD',
      'A GA drawing shows the overall layout of equipment; a detail drawing shows a single component',
      'A GA drawing is uncontrolled whereas a detail drawing is always controlled',
    ],
    correctAnswer: 2,
    explanation:
      'GA drawings show how equipment is arranged within a space — equipment positions, clearances, access routes, and relationships between items. Detail drawings show individual components with precise dimensions, tolerances, material specifications, and manufacturing information. For maintenance, the GA drawing helps you find the equipment; the detail drawing helps you work on it.',
  },
  {
    id: 7,
    question: 'A parts list (bill of materials) on a drawing contains:',
    options: [
      'The revision history of the drawing and who authorised each change',
      'The scale, projection and approval signatures applying to the whole sheet',
      'A chronological list of every drawing issued on the project up to date',
      'Item numbers, component descriptions, quantities, part numbers and material specifications',
    ],
    correctAnswer: 3,
    explanation:
      "The parts list provides comprehensive identification for every component: item number (matching the drawing's balloon references), description, quantity required, manufacturer's part number or drawing reference, and material specification. This is the primary resource for ordering replacement components during maintenance.",
  },
  {
    id: 8,
    question: "Zone references on a drawing border (e.g., 'B3') are used to:",
    options: [
      'Locate specific features on large drawings by referencing the grid coordinates along the border edges',
      'Indicate the revision level of each separate area of the drawing',
      'Number the sheets in a multi-sheet drawing set in the correct order',
      'Show the recommended folding lines for filing the drawing to A4 size',
    ],
    correctAnswer: 0,
    explanation:
      "Zone references work like map grid references. Letters run vertically (A, B, C from bottom) and numbers horizontally (1, 2, 3 from right). A note saying 'See detail at B3' directs you to the intersection of column 3 and row B on the drawing. This is essential for quickly finding features on large A0 or A1 drawings.",
  },
  {
    id: 9,
    question: 'The originator, checker and approver signatures in the title block demonstrate:',
    options: [
      'That three separate copies of the drawing have been printed and filed',
      'That the drawing has been created, technically checked, and approved for issue',
      'That the drawing is uncontrolled and may be used for reference only',
      'That the drawing has been superseded and replaced by a later revision',
    ],
    correctAnswer: 1,
    explanation:
      "The three signatures represent quality control stages: the originator created the drawing, the checker verified technical accuracy, and the approver formally released it for use. This three-stage process reduces errors and provides accountability. Unsigned or incomplete approval blocks should raise concern about the drawing's reliability.",
  },
  {
    id: 10,
    question: 'When a drawing references another drawing (cross-reference), this means:',
    options: [
      'The referenced drawing supersedes this one and must be used instead',
      'The referenced drawing is an earlier revision kept only for the record',
      'Related information sits on the referenced drawing and both should be read together',
      'The referenced drawing is held by a different department and is not available',
    ],
    correctAnswer: 2,
    explanation:
      'Cross-references link related drawings. For example, a GA drawing may reference detail drawings for individual components, schematic drawings for circuit logic, and cable schedule drawings for wiring information. During maintenance, you often need to consult multiple cross-referenced drawings to get the complete picture.',
  },
  {
    id: 11,
    question:
      'For electrical maintenance, the most important drawing layout information to check first is:',
    options: [
      'The parts list, so replacement components can be ordered in advance',
      'The zone reference grid, so individual features can be located quickly on the sheet',
      'The filing margin width, so the drawing can be bound into the document set correctly',
      'The drawing number, revision status, scale and projection convention before anything else',
    ],
    correctAnswer: 3,
    explanation:
      'Before reading any technical content, verify: the drawing number (correct drawing for the job), revision status (current version, not superseded), scale (to understand proportions), and projection convention (to interpret views correctly). These four checks take seconds but prevent serious interpretation errors.',
  },
  {
    id: 12,
    question: 'Under BS EN ISO 7200, the title block must contain as a minimum:',
    options: [
      'The drawing number, title, originator, legal owner, date, scale, projection symbol and sheet number',
      'Only the drawing number and the date of issue, with all other fields optional',
      'A full bill of materials and a revision history for every drawing',
      'The checker and approver signatures, but the drawing number is optional',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN ISO 7200 specifies mandatory title block fields: drawing number, title, legal owner (organisation), originator name, date, scale, projection symbol, and sheet numbering (if multi-sheet). Additional fields for checker, approver, material, finish, and tolerances are recommended but not always mandatory.',
  },
];

const faqs = [
  {
    question: 'Where do I find engineering drawings for equipment I am maintaining?',
    answer:
      "Engineering drawings are typically found in the Operation and Maintenance (O&M) manual provided at project handover, the manufacturer's installation and maintenance manual, the site drawing register or document management system (DMS), the computerised maintenance management system (CMMS), or the CDM health and safety file. If drawings are not available, contact the equipment manufacturer with the model and serial number, or the original installing contractor.",
  },
  {
    question: 'What should I do if I cannot find a drawing for a piece of equipment?',
    answer:
      "First, check all available sources: O&M manuals, the drawing register, CMMS, manufacturer's website, and the original installer or consultant. If the drawing truly does not exist, it may need to be created as part of an as-built documentation exercise. Report the gap to your supervisor — a missing drawing is a documentation deficiency that should be addressed, particularly for safety-critical equipment.",
  },
  {
    question: 'How do I read a drawing that has been folded to A4 size?',
    answer:
      'Engineering drawings larger than A4 are folded to A4 size for filing, with the title block visible on the front. To read the full drawing, unfold it carefully on a clean, flat surface. Drawings that are frequently referenced on site can be mounted on plan boards or accessed digitally on a tablet or laptop to avoid wear and tear from repeated folding and unfolding.',
  },
  {
    question: 'Can I make notes on a drawing during maintenance?',
    answer:
      'You should not write on controlled copies of drawings. If you discover a discrepancy between the drawing and the actual installation, create a red-line markup on a separate copy (or photograph and annotate) and submit it through the formal change control process. Making unofficial notes on controlled drawings creates confusion about what is original and what has been added.',
  },
  {
    question: 'What is the difference between a drawing and a specification?',
    answer:
      'A drawing shows graphically what something looks like — its shape, dimensions, layout and arrangement. A specification describes in words what something must do or be — performance requirements, material properties, test criteria, and acceptance standards. Both are needed for a complete technical description. For maintenance, the drawing tells you what the equipment is; the specification tells you what it should do.',
  },
];

const MOETModule6Section1_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 6 · Section 6.1 · Subsection 4"
        title="Drawing Layouts and Title Blocks"
        backTo="/study-centre/apprentice/m-o-e-t-module6-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Standard sheet sizes, title block content, revision tables, drawing registers and
            document conventions
          </p>

          <TLDR
            points={[
              'Title block: drawing number, title, scale, projection, revision status and approvals — always check it before reading the drawing.',
              'Sheet sizes follow the ISO A series — A0 (largest) down to A4 — with the title block visible in the bottom right even when folded to A4.',
              'The revision table is the audit trail: date, description and who authorised the change since first issue.',
              'The drawing register is the master index of every drawing and its current revision — the starting point for finding anything.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the standard information contained in a drawing title block',
              'Explain the purpose and content of revision tables for document control',
              'Describe ISO A series sheet sizes and their application to engineering drawings',
              'Use drawing registers and cross-references to navigate drawing sets',
              'Interpret parts lists for ordering replacement maintenance components',
              'Apply drawing layout knowledge to locate and verify technical information',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The title block</ContentEyebrow>

          <ConceptBlock
            title="The Title Block — Drawing Identity"
            onSite="Every time you pick up a drawing, check four things in the title block before reading anything else: the drawing number (is this the right drawing?), the revision (is this the current version?), the scale (how do I interpret dimensions?), and the projection symbol (which convention is used?). This four-second check prevents the most common drawing interpretation errors."
          >
            <p>
              The title block is the most important administrative area on any engineering drawing.
              Positioned in the bottom right corner of the sheet (so it remains visible when larger
              sheets are folded to A4), it contains all the information needed to identify, manage
              and correctly interpret the drawing. Before reading any technical content, the title
              block should be your first point of reference.
            </p>
            <p>
              BS EN ISO 7200 defines the standard requirements for title blocks. While individual
              organisations may add additional fields, the core information remains consistent
              across industries. For electrical maintenance technicians, understanding the title
              block ensures you are working from the correct, current version of the drawing — a
              fundamental safety requirement.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Standard Title Block Fields">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Drawing number:</strong> Unique identifier — the primary reference for the
                drawing
              </li>
              <li>
                <strong>Drawing title:</strong> Descriptive name (e.g., "MCC-01 General Arrangement
                — Front Elevation")
              </li>
              <li>
                <strong>Scale:</strong> Relationship between drawing size and actual size (e.g.,
                1:10)
              </li>
              <li>
                <strong>Projection symbol:</strong> First angle or third angle indicator
              </li>
              <li>
                <strong>Revision:</strong> Current revision letter or number
              </li>
              <li>
                <strong>Date:</strong> Date of original issue and current revision
              </li>
              <li>
                <strong>Originator:</strong> Name of the person who created the drawing
              </li>
              <li>
                <strong>Checker:</strong> Name of the person who verified technical accuracy
              </li>
              <li>
                <strong>Approver:</strong> Name of the person who authorised issue
              </li>
              <li>
                <strong>Sheet number:</strong> Sheet X of Y (for multi-sheet drawings)
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Sheet sizes and borders</ContentEyebrow>

          <ConceptBlock title="Sheet Sizes, Borders and Zone References">
            <p>
              Engineering drawings use standardised sheet sizes from the ISO A series. Understanding
              these sizes and the layout conventions for borders, margins and zone references helps
              you navigate drawings efficiently — particularly large format drawings that are common
              for site layouts, single-line diagrams and general arrangement drawings.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="ISO A Series Sheet Sizes"
            headers={['Size', 'Dimensions (mm)', 'Typical Use in Electrical']}
            rows={[
              ['A0', '841 x 1189', 'Site layouts, large single-line diagrams, floor plans'],
              [
                'A1',
                '594 x 841',
                'Equipment GA drawings, schematic diagrams, distribution layouts',
              ],
              ['A2', '420 x 594', 'Panel layout drawings, wiring diagrams, cable schedules'],
              ['A3', '297 x 420', 'Detail drawings, component drawings, small schematics'],
              ['A4', '210 x 297', 'Data sheets, cover sheets, small details, certificates'],
            ]}
          />

          <ConceptBlock title="Border and Zone Conventions">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Filing margin:</strong> 20 mm on the left edge (for binding); 10 mm on other
                edges
              </li>
              <li>
                <strong>Zone references:</strong> Letters (A, B, C) vertically from bottom; numbers
                (1, 2, 3) horizontally from right
              </li>
              <li>
                <strong>Grid system:</strong> Allows features to be located by reference (e.g.,
                "Motor M3 is at zone C4")
              </li>
              <li>
                <strong>Centring marks:</strong> Small marks at the midpoint of each border edge for
                alignment
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Revision tables and change control</ContentEyebrow>

          <ConceptBlock title="Revision Tables and Change Control">
            <p>
              The revision table is the audit trail of every change made to a drawing. It is
              positioned adjacent to or above the title block and provides a chronological record of
              modifications from the original issue to the current revision. For maintenance
              technicians, the revision table tells you how the drawing has evolved and confirms you
              are looking at the latest version.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Revision Table Structure"
            headers={['Rev', 'Date', 'Description', 'By']}
            rows={[
              ['-', '15/03/2023', 'First issue for construction', 'JB'],
              ['A', '22/06/2023', 'Cable entry positions updated per site survey', 'KM'],
              ['B', '10/11/2023', 'As-built — reflects installed arrangement', 'KM'],
            ]}
          />

          <CommonMistake
            title="Working from the Wrong Revision"
            whatHappens={
              <>
                Using a superseded drawing revision is a significant safety risk. Cable routes may
                have changed, equipment may have been relocated, protection settings may have been
                updated, or additional circuits may have been added.
              </>
            }
            doInstead={
              <>
                If the drawing does not match what you find on site, stop work and verify which is
                correct — the drawing or the installation. Report discrepancies through the formal
                document control process.
              </>
            }
          />

          <ConceptBlock title="Revision clouds">
            <p>
              <strong>Key point:</strong> Revision clouds (irregular cloud-shaped outlines) on the
              drawing body highlight areas that changed in the current revision. Look for these to
              quickly identify what has been modified without comparing the entire drawing to the
              previous version.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Drawing types and cross-referencing</ContentEyebrow>

          <ConceptBlock title="Drawing Types and Cross-Referencing">
            <p>
              A complete set of engineering drawings for an electrical installation comprises many
              different types of drawing, each serving a specific purpose. Understanding the drawing
              types and how they cross-reference each other allows you to navigate the complete
              drawing set efficiently and find the information you need.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Drawing Types and Cross-Referencing"
            headers={['Drawing Type', 'What It Shows', 'Maintenance Use']}
            rows={[
              [
                'Site layout',
                'Equipment positions within building/site',
                'Locating equipment, planning access',
              ],
              [
                'General arrangement',
                'Equipment dimensions, mounting, clearances',
                'Replacement planning, compatibility',
              ],
              [
                'Single-line diagram',
                'Power distribution architecture',
                'Isolation planning, fault-finding',
              ],
              [
                'Schematic diagram',
                'Circuit logic and operation',
                'Understanding circuit function',
              ],
              ['Wiring diagram', 'Physical terminal connections', 'Wiring, testing, reconnection'],
              [
                'Cable schedule',
                'Cable types, sizes, routes, references',
                'Cable identification, replacement',
              ],
            ]}
          />

          <ConceptBlock title="Cross-Referencing Between Drawings">
            <p>
              Drawing sets are interconnected through cross-references. A GA drawing may reference
              the schematic diagram for circuit logic, the cable schedule for cable specifications,
              and the single-line diagram for the distribution hierarchy. Cross-references use
              drawing numbers and often include zone references to locate specific features.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Equipment tag numbers link across all drawing types</li>
              <li>Cable references connect schematic, wiring and cable schedule drawings</li>
              <li>Circuit references link the SLD to distribution board schedules</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Drawing registers and document management</ContentEyebrow>

          <ConceptBlock title="Drawing Registers and Document Management">
            <p>
              A drawing register (also called a document register or transmittal log) is the master
              index of all drawings in a project or installation. It is the starting point for
              finding any drawing and confirms the current revision status of every document. For
              maintenance organisations, the drawing register is managed within the document
              management system (DMS) or the CMMS.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Drawing Register Content">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Drawing number:</strong> Unique identifier for each drawing
              </li>
              <li>
                <strong>Title:</strong> Descriptive name of the drawing content
              </li>
              <li>
                <strong>Current revision:</strong> The latest approved revision letter or number
              </li>
              <li>
                <strong>Date of current revision:</strong> When the latest revision was issued
              </li>
              <li>
                <strong>Status:</strong> For construction, for information, as-built, superseded
              </li>
              <li>
                <strong>Distribution:</strong> Who holds controlled copies
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Controlled Copies">
            <p>
              Controlled copies are registered in the DMS and are automatically replaced when a new
              revision is issued. The holder always has the current version. Use controlled copies
              for all active maintenance work.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Uncontrolled Copies"
            onSite="ST1426 link: the maintenance technician standard requires competence in using technical documentation systems. Navigating drawing registers, verifying revision status, and understanding document control principles are assessed competences — they demonstrate the professional approach expected of a qualified maintenance technician."
          >
            <p>
              Uncontrolled copies are snapshots at a specific revision and are not updated. They may
              be used for reference or training but must be clearly marked 'UNCONTROLLED' to prevent
              accidental use for active work.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Drawing number — unique identifier',
              'Revision — current version status',
              'Scale — drawing to actual size ratio',
              'Projection — first or third angle symbol',
              'Approvals — originator, checker, approver',
              'A0: 841 x 1189 mm (site layouts)',
              'A1: 594 x 841 mm (GA drawings)',
              'A2: 420 x 594 mm (panel layouts)',
              'A3: 297 x 420 mm (detail drawings)',
              'A4: 210 x 297 mm (data sheets)',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section1-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Orthographic Projection (Engineering Drawings)
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section1-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Introduction to CAD
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule6Section1_4;
