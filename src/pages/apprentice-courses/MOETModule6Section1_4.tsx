import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Drawing Layouts and Title Blocks - MOET Module 6 Section 1.4";
const DESCRIPTION = "Standard drawing sheet sizes, title block information, border layouts, revision tables, parts lists, drawing registers and document management conventions for electrical maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "title-block-purpose",
    question: "What is the primary purpose of the title block on an engineering drawing?",
    options: [
      "To fill empty space on the drawing sheet",
      "To provide essential identification and reference information including drawing number, title, scale, projection, revision status and approval signatures",
      "To display the company logo only",
      "To list the cost of the project"
    ],
    correctIndex: 1,
    explanation: "The title block is the 'identity card' of the drawing. It contains the drawing number (unique identifier), title, scale, projection convention, revision status, originator, checker, approver, date, and often material and finish specifications. This information is essential for document control and ensuring you are reading the correct, current drawing."
  },
  {
    id: "drawing-number",
    question: "Why is the drawing number the most important piece of information on an engineering drawing?",
    options: [
      "It tells you the size of the paper",
      "It is the unique identifier used to retrieve, reference, cross-reference and manage the drawing throughout the life of the installation",
      "It indicates the order in which drawings should be read",
      "It shows how many drawings exist in total"
    ],
    correctIndex: 1,
    explanation: "The drawing number is the unique reference that connects the drawing to the document management system, the asset register, the O&M manual, and all cross-references. When ordering parts, reporting discrepancies, or requesting information, the drawing number is the key to finding the correct document."
  },
  {
    id: "revision-table",
    question: "A revision table on a drawing shows:",
    options: [
      "A list of all the company's drawings",
      "A chronological record of all changes made to the drawing, including revision letter, date, description of change and who authorised it",
      "The original designer's notes",
      "A schedule of future planned changes"
    ],
    correctIndex: 1,
    explanation: "The revision table (or revision history) is an audit trail of every change made to the drawing since its original issue. Each entry records the revision identifier (letter or number), the date of change, a brief description of what changed, and who approved the change. This is essential for understanding the drawing's history and confirming you have the current version."
  },
  {
    id: "sheet-sizes",
    question: "The standard paper sizes used for engineering drawings in the UK follow which series?",
    options: [
      "Letter, Legal, Tabloid",
      "The ISO A series: A0 (largest standard), A1, A2, A3, A4 (smallest common size)",
      "B1 through B5",
      "Custom sizes chosen by each company"
    ],
    correctIndex: 1,
    explanation: "UK engineering drawings use the ISO A series: A0 (841 x 1189 mm) is the largest standard size; A1 is half of A0, A2 is half of A1, and so on. A3 and A4 are commonly used for smaller detail drawings and schematic diagrams. The aspect ratio of all A sizes is 1 to the square root of 2, meaning each size folds exactly into the next smaller size."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The title block on an engineering drawing is positioned:",
    options: [
      "In the centre of the drawing",
      "In the bottom right corner of the drawing sheet, visible when the drawing is folded to A4 size",
      "At the top of the drawing",
      "On the reverse side of the paper"
    ],
    correctAnswer: 1,
    explanation: "The title block is positioned in the bottom right corner so that it remains visible when larger drawings (A0, A1, A2) are folded down to A4 size for filing. This allows the drawing to be identified without unfolding it — essential for quick retrieval from filing cabinets or plan chests."
  },
  {
    id: 2,
    question: "A drawing scale of 1:2 means:",
    options: [
      "The drawing is twice the actual size",
      "The drawing is half the actual size — every 1 mm on the drawing represents 2 mm in reality",
      "There are two copies of the drawing",
      "The drawing has two views"
    ],
    correctAnswer: 1,
    explanation: "A scale of 1:2 is a reduction — the drawing is half the actual size. Scales greater than 1:1 (e.g., 2:1, 5:1) are enlargements used for small components. Scales less than 1:1 (e.g., 1:2, 1:5, 1:10, 1:50) are reductions used for large equipment or building layouts. The scale is always stated in the title block."
  },
  {
    id: 3,
    question: "The border around an engineering drawing serves to:",
    options: [
      "Make the drawing look more attractive",
      "Define the drawing area, provide zone references for locating features, and accommodate filing margin and trim marks",
      "Show the maximum printable area of the printer",
      "Indicate where to fold the drawing"
    ],
    correctAnswer: 1,
    explanation: "The border defines the usable drawing area, provides a filing margin (left side, typically 20 mm for binding), and often includes zone reference marks (letters vertically, numbers horizontally) that allow specific features to be located by grid reference — similar to map coordinates."
  },
  {
    id: 4,
    question: "When a drawing states 'Do Not Scale', this means:",
    options: [
      "The drawing is not drawn to any scale",
      "You must use only the written dimension values, not measurements taken from the paper, as the printed size may not accurately represent the stated scale",
      "The drawing has no dimensions",
      "The scale bar is incorrect"
    ],
    correctAnswer: 1,
    explanation: "The warning 'Do Not Scale' reminds users that measurements taken directly from the paper (using a ruler) may be inaccurate due to printing variations, paper shrinkage, or photocopying distortion. Always use the stated dimension figures. If a dimension is not shown and cannot be determined from other dimensions, request clarification from the drawing originator."
  },
  {
    id: 5,
    question: "A drawing register is:",
    options: [
      "A type of cash register",
      "A controlled index of all drawings in a project or installation, showing drawing numbers, titles, current revision status and distribution",
      "A method of registering copyright",
      "A temperature control device"
    ],
    correctAnswer: 1,
    explanation: "The drawing register is the master index of all drawings. It lists every drawing number, its title, current revision, issue date, and who holds controlled copies. The register is essential for document control — it tells you whether a drawing exists, what its current revision is, and where to find it."
  },
  {
    id: 6,
    question: "The difference between a general arrangement (GA) drawing and a detail drawing is:",
    options: [
      "GA drawings are always larger in paper size",
      "A GA drawing shows the overall layout and spatial arrangement of equipment, while a detail drawing shows individual components with full manufacturing information",
      "Detail drawings are more important than GA drawings",
      "GA drawings use third angle projection only"
    ],
    correctAnswer: 1,
    explanation: "GA drawings show how equipment is arranged within a space — equipment positions, clearances, access routes, and relationships between items. Detail drawings show individual components with precise dimensions, tolerances, material specifications, and manufacturing information. For maintenance, the GA drawing helps you find the equipment; the detail drawing helps you work on it."
  },
  {
    id: 7,
    question: "A parts list (bill of materials) on a drawing contains:",
    options: [
      "Only the total cost of all components",
      "Item numbers matching balloon references on the drawing, component descriptions, quantities, part numbers and material specifications",
      "A list of tools required",
      "The names of the people who built the assembly"
    ],
    correctAnswer: 1,
    explanation: "The parts list provides comprehensive identification for every component: item number (matching the drawing's balloon references), description, quantity required, manufacturer's part number or drawing reference, and material specification. This is the primary resource for ordering replacement components during maintenance."
  },
  {
    id: 8,
    question: "Zone references on a drawing border (e.g., 'B3') are used to:",
    options: [
      "Indicate the paper quality",
      "Locate specific features on large drawings by referencing the grid coordinates along the border edges",
      "Show the drawing revision",
      "Indicate areas that have been modified"
    ],
    correctAnswer: 1,
    explanation: "Zone references work like map grid references. Letters run vertically (A, B, C from bottom) and numbers horizontally (1, 2, 3 from right). A note saying 'See detail at B3' directs you to the intersection of column 3 and row B on the drawing. This is essential for quickly finding features on large A0 or A1 drawings."
  },
  {
    id: 9,
    question: "The originator, checker and approver signatures in the title block demonstrate:",
    options: [
      "How many people are employed in the drawing office",
      "That the drawing has been through a formal review process — created by a competent person, technically checked, and formally approved for issue",
      "Who owns the copyright",
      "The management hierarchy"
    ],
    correctAnswer: 1,
    explanation: "The three signatures represent quality control stages: the originator created the drawing, the checker verified technical accuracy, and the approver formally released it for use. This three-stage process reduces errors and provides accountability. Unsigned or incomplete approval blocks should raise concern about the drawing's reliability."
  },
  {
    id: 10,
    question: "When a drawing references another drawing (cross-reference), this means:",
    options: [
      "The other drawing is a duplicate",
      "Related information is contained on the referenced drawing and both should be read together for complete understanding",
      "The referenced drawing has been superseded",
      "The drawing is incomplete"
    ],
    correctAnswer: 1,
    explanation: "Cross-references link related drawings. For example, a GA drawing may reference detail drawings for individual components, schematic drawings for circuit logic, and cable schedule drawings for wiring information. During maintenance, you often need to consult multiple cross-referenced drawings to get the complete picture."
  },
  {
    id: 11,
    question: "For electrical maintenance, the most important drawing layout information to check first is:",
    options: [
      "The paper size",
      "The drawing number, revision status, scale and projection convention — to confirm you have the correct, current drawing and can interpret it accurately",
      "The company name",
      "The colour of the border"
    ],
    correctAnswer: 1,
    explanation: "Before reading any technical content, verify: the drawing number (correct drawing for the job), revision status (current version, not superseded), scale (to understand proportions), and projection convention (to interpret views correctly). These four checks take seconds but prevent serious interpretation errors."
  },
  {
    id: 12,
    question: "Under BS EN ISO 7200, the title block must contain as a minimum:",
    options: [
      "Only the drawing title",
      "The drawing number, title, originator, legal owner, date, scale, projection symbol and sheet number",
      "Only the revision number",
      "Just the company logo and address"
    ],
    correctAnswer: 1,
    explanation: "BS EN ISO 7200 specifies mandatory title block fields: drawing number, title, legal owner (organisation), originator name, date, scale, projection symbol, and sheet numbering (if multi-sheet). Additional fields for checker, approver, material, finish, and tolerances are recommended but not always mandatory."
  }
];

const faqs = [
  {
    question: "Where do I find engineering drawings for equipment I am maintaining?",
    answer: "Engineering drawings are typically found in the Operation and Maintenance (O&M) manual provided at project handover, the manufacturer's installation and maintenance manual, the site drawing register or document management system (DMS), the computerised maintenance management system (CMMS), or the CDM health and safety file. If drawings are not available, contact the equipment manufacturer with the model and serial number, or the original installing contractor."
  },
  {
    question: "What should I do if I cannot find a drawing for a piece of equipment?",
    answer: "First, check all available sources: O&M manuals, the drawing register, CMMS, manufacturer's website, and the original installer or consultant. If the drawing truly does not exist, it may need to be created as part of an as-built documentation exercise. Report the gap to your supervisor — a missing drawing is a documentation deficiency that should be addressed, particularly for safety-critical equipment."
  },
  {
    question: "How do I read a drawing that has been folded to A4 size?",
    answer: "Engineering drawings larger than A4 are folded to A4 size for filing, with the title block visible on the front. To read the full drawing, unfold it carefully on a clean, flat surface. Drawings that are frequently referenced on site can be mounted on plan boards or accessed digitally on a tablet or laptop to avoid wear and tear from repeated folding and unfolding."
  },
  {
    question: "Can I make notes on a drawing during maintenance?",
    answer: "You should not write on controlled copies of drawings. If you discover a discrepancy between the drawing and the actual installation, create a red-line markup on a separate copy (or photograph and annotate) and submit it through the formal change control process. Making unofficial notes on controlled drawings creates confusion about what is original and what has been added."
  },
  {
    question: "What is the difference between a drawing and a specification?",
    answer: "A drawing shows graphically what something looks like — its shape, dimensions, layout and arrangement. A specification describes in words what something must do or be — performance requirements, material properties, test criteria, and acceptance standards. Both are needed for a complete technical description. For maintenance, the drawing tells you what the equipment is; the specification tells you what it should do."
  }
];

const MOETModule6Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 6.1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Drawing Layouts and Title Blocks
          </h1>
          <p className="text-white/80">
            Standard sheet sizes, title block content, revision tables, drawing registers and document conventions
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Title block:</strong> Drawing number, title, scale, projection, revision, approvals</li>
              <li className="pl-1"><strong>Sheet sizes:</strong> ISO A series — A0 (largest) through A4</li>
              <li className="pl-1"><strong>Revision table:</strong> Chronological audit trail of all changes</li>
              <li className="pl-1"><strong>Drawing register:</strong> Master index of all project drawings</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Document control:</strong> Ensures you work from the correct, current drawing</li>
              <li className="pl-1"><strong>Parts lists:</strong> Essential for ordering replacement components</li>
              <li className="pl-1"><strong>Cross-references:</strong> Link GA, schematic and cable drawings together</li>
              <li className="pl-1"><strong>ST1426:</strong> Documentation management competence for EPA</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the standard information contained in a drawing title block",
              "Explain the purpose and content of revision tables for document control",
              "Describe ISO A series sheet sizes and their application to engineering drawings",
              "Use drawing registers and cross-references to navigate drawing sets",
              "Interpret parts lists for ordering replacement maintenance components",
              "Apply drawing layout knowledge to locate and verify technical information"
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
            The Title Block — Drawing Identity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The title block is the most important administrative area on any engineering drawing. Positioned
              in the bottom right corner of the sheet (so it remains visible when larger sheets are folded to
              A4), it contains all the information needed to identify, manage and correctly interpret the
              drawing. Before reading any technical content, the title block should be your first point of
              reference.
            </p>
            <p>
              BS EN ISO 7200 defines the standard requirements for title blocks. While individual organisations
              may add additional fields, the core information remains consistent across industries. For
              electrical maintenance technicians, understanding the title block ensures you are working from
              the correct, current version of the drawing — a fundamental safety requirement.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Title Block Fields</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Drawing number:</strong> Unique identifier — the primary reference for the drawing</li>
                <li className="pl-1"><strong>Drawing title:</strong> Descriptive name (e.g., "MCC-01 General Arrangement — Front Elevation")</li>
                <li className="pl-1"><strong>Scale:</strong> Relationship between drawing size and actual size (e.g., 1:10)</li>
                <li className="pl-1"><strong>Projection symbol:</strong> First angle or third angle indicator</li>
                <li className="pl-1"><strong>Revision:</strong> Current revision letter or number</li>
                <li className="pl-1"><strong>Date:</strong> Date of original issue and current revision</li>
                <li className="pl-1"><strong>Originator:</strong> Name of the person who created the drawing</li>
                <li className="pl-1"><strong>Checker:</strong> Name of the person who verified technical accuracy</li>
                <li className="pl-1"><strong>Approver:</strong> Name of the person who authorised issue</li>
                <li className="pl-1"><strong>Sheet number:</strong> Sheet X of Y (for multi-sheet drawings)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">First Check — Every Time</p>
              <p className="text-sm text-white">
                Every time you pick up a drawing, check four things in the title block before reading anything
                else: the drawing number (is this the right drawing?), the revision (is this the current
                version?), the scale (how do I interpret dimensions?), and the projection symbol (which
                convention is used?). This four-second check prevents the most common drawing interpretation errors.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Sheet Sizes, Borders and Zone References
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Engineering drawings use standardised sheet sizes from the ISO A series. Understanding these
              sizes and the layout conventions for borders, margins and zone references helps you navigate
              drawings efficiently — particularly large format drawings that are common for site layouts,
              single-line diagrams and general arrangement drawings.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Size</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Dimensions (mm)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use in Electrical</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">A0</td><td className="border border-white/10 px-3 py-2">841 x 1189</td><td className="border border-white/10 px-3 py-2">Site layouts, large single-line diagrams, floor plans</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">A1</td><td className="border border-white/10 px-3 py-2">594 x 841</td><td className="border border-white/10 px-3 py-2">Equipment GA drawings, schematic diagrams, distribution layouts</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">A2</td><td className="border border-white/10 px-3 py-2">420 x 594</td><td className="border border-white/10 px-3 py-2">Panel layout drawings, wiring diagrams, cable schedules</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">A3</td><td className="border border-white/10 px-3 py-2">297 x 420</td><td className="border border-white/10 px-3 py-2">Detail drawings, component drawings, small schematics</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">A4</td><td className="border border-white/10 px-3 py-2">210 x 297</td><td className="border border-white/10 px-3 py-2">Data sheets, cover sheets, small details, certificates</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Border and Zone Conventions</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Filing margin:</strong> 20 mm on the left edge (for binding); 10 mm on other edges</li>
                <li className="pl-1"><strong>Zone references:</strong> Letters (A, B, C) vertically from bottom; numbers (1, 2, 3) horizontally from right</li>
                <li className="pl-1"><strong>Grid system:</strong> Allows features to be located by reference (e.g., "Motor M3 is at zone C4")</li>
                <li className="pl-1"><strong>Centring marks:</strong> Small marks at the midpoint of each border edge for alignment</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Revision Tables and Change Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The revision table is the audit trail of every change made to a drawing. It is positioned
              adjacent to or above the title block and provides a chronological record of modifications
              from the original issue to the current revision. For maintenance technicians, the revision
              table tells you how the drawing has evolved and confirms you are looking at the latest version.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Revision Table Structure</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Rev</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Date</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">By</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">-</td><td className="border border-white/10 px-3 py-2">15/03/2023</td><td className="border border-white/10 px-3 py-2">First issue for construction</td><td className="border border-white/10 px-3 py-2">JB</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">A</td><td className="border border-white/10 px-3 py-2">22/06/2023</td><td className="border border-white/10 px-3 py-2">Cable entry positions updated per site survey</td><td className="border border-white/10 px-3 py-2">KM</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">B</td><td className="border border-white/10 px-3 py-2">10/11/2023</td><td className="border border-white/10 px-3 py-2">As-built — reflects installed arrangement</td><td className="border border-white/10 px-3 py-2">KM</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Working from the Wrong Revision</p>
              <p className="text-sm text-white">
                Using a superseded drawing revision is a significant safety risk. Cable routes may have
                changed, equipment may have been relocated, protection settings may have been updated,
                or additional circuits may have been added. If the drawing does not match what you find on
                site, stop work and verify which is correct — the drawing or the installation. Report
                discrepancies through the formal document control process.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Revision clouds (irregular cloud-shaped outlines) on the drawing
              body highlight areas that changed in the current revision. Look for these to quickly identify
              what has been modified without comparing the entire drawing to the previous version.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Drawing Types and Cross-Referencing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A complete set of engineering drawings for an electrical installation comprises many different
              types of drawing, each serving a specific purpose. Understanding the drawing types and how
              they cross-reference each other allows you to navigate the complete drawing set efficiently
              and find the information you need.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Drawing Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What It Shows</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Maintenance Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Site layout</td><td className="border border-white/10 px-3 py-2">Equipment positions within building/site</td><td className="border border-white/10 px-3 py-2">Locating equipment, planning access</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">General arrangement</td><td className="border border-white/10 px-3 py-2">Equipment dimensions, mounting, clearances</td><td className="border border-white/10 px-3 py-2">Replacement planning, compatibility</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Single-line diagram</td><td className="border border-white/10 px-3 py-2">Power distribution architecture</td><td className="border border-white/10 px-3 py-2">Isolation planning, fault-finding</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Schematic diagram</td><td className="border border-white/10 px-3 py-2">Circuit logic and operation</td><td className="border border-white/10 px-3 py-2">Understanding circuit function</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Wiring diagram</td><td className="border border-white/10 px-3 py-2">Physical terminal connections</td><td className="border border-white/10 px-3 py-2">Wiring, testing, reconnection</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Cable schedule</td><td className="border border-white/10 px-3 py-2">Cable types, sizes, routes, references</td><td className="border border-white/10 px-3 py-2">Cable identification, replacement</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cross-Referencing Between Drawings</h3>
              <p className="text-sm text-white mb-2">
                Drawing sets are interconnected through cross-references. A GA drawing may reference the
                schematic diagram for circuit logic, the cable schedule for cable specifications, and the
                single-line diagram for the distribution hierarchy. Cross-references use drawing numbers
                and often include zone references to locate specific features.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Equipment tag numbers link across all drawing types</li>
                <li className="pl-1">Cable references connect schematic, wiring and cable schedule drawings</li>
                <li className="pl-1">Circuit references link the SLD to distribution board schedules</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Drawing Registers and Document Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A drawing register (also called a document register or transmittal log) is the master index
              of all drawings in a project or installation. It is the starting point for finding any drawing
              and confirms the current revision status of every document. For maintenance organisations,
              the drawing register is managed within the document management system (DMS) or the CMMS.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Drawing Register Content</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Drawing number:</strong> Unique identifier for each drawing</li>
                <li className="pl-1"><strong>Title:</strong> Descriptive name of the drawing content</li>
                <li className="pl-1"><strong>Current revision:</strong> The latest approved revision letter or number</li>
                <li className="pl-1"><strong>Date of current revision:</strong> When the latest revision was issued</li>
                <li className="pl-1"><strong>Status:</strong> For construction, for information, as-built, superseded</li>
                <li className="pl-1"><strong>Distribution:</strong> Who holds controlled copies</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Controlled Copies</h3>
                <p className="text-sm text-white">
                  Controlled copies are registered in the DMS and are automatically replaced when a new
                  revision is issued. The holder always has the current version. Use controlled copies for
                  all active maintenance work.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Uncontrolled Copies</h3>
                <p className="text-sm text-white">
                  Uncontrolled copies are snapshots at a specific revision and are not updated. They may be
                  used for reference or training but must be clearly marked 'UNCONTROLLED' to prevent
                  accidental use for active work.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires competence in using
              technical documentation systems. Navigating drawing registers, verifying revision status, and
              understanding document control principles are assessed competences — they demonstrate the
              professional approach expected of a qualified maintenance technician.
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
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
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
                <p className="font-medium text-white mb-1">Title Block Essentials</p>
                <ul className="space-y-0.5">
                  <li>Drawing number — unique identifier</li>
                  <li>Revision — current version status</li>
                  <li>Scale — drawing to actual size ratio</li>
                  <li>Projection — first or third angle symbol</li>
                  <li>Approvals — originator, checker, approver</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">ISO A Sheet Sizes</p>
                <ul className="space-y-0.5">
                  <li>A0: 841 x 1189 mm (site layouts)</li>
                  <li>A1: 594 x 841 mm (GA drawings)</li>
                  <li>A2: 420 x 594 mm (panel layouts)</li>
                  <li>A3: 297 x 420 mm (detail drawings)</li>
                  <li>A4: 210 x 297 mm (data sheets)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section1-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Orthographic Projection
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section1-5">
              Next: Introduction to CAD
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule6Section1_4;
