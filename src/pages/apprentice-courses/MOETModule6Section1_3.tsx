import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Orthographic Projection (Engineering Drawings) - MOET Module 6 Section 1.3";
const DESCRIPTION = "First and third angle orthographic projection, standard views, BS 8888 drawing conventions, hidden detail, auxiliary views and their application to electrical maintenance engineering drawings.";

const quickCheckQuestions = [
  {
    id: "ortho-purpose",
    question: "What is the primary purpose of orthographic projection in engineering drawings?",
    options: [
      "To create artistic representations of equipment",
      "To represent a three-dimensional object accurately using two or more two-dimensional views projected at right angles to each other",
      "To show only the front face of an object",
      "To calculate the weight of a component"
    ],
    correctIndex: 1,
    explanation: "Orthographic projection uses two or more 2D views, each projected at right angles, to fully describe a 3D object. By viewing the object from the front, side and top (plan), every feature can be accurately represented with precise dimensions — essential for manufacture, installation and maintenance."
  },
  {
    id: "first-vs-third",
    question: "How do first angle and third angle projection differ in view arrangement?",
    options: [
      "They produce different shaped views",
      "In first angle projection each view shows what you would see looking through the object; in third angle each view is positioned on the same side as the direction of viewing",
      "First angle is used only in the USA, third angle only in the UK",
      "There is no practical difference between them"
    ],
    correctIndex: 1,
    explanation: "In first angle (BS 8888, widely used in the UK and Europe), views are placed opposite to the direction of viewing — the right side view appears on the left of the front view. In third angle (ASME Y14.5, common in North America), views are placed on the same side as the viewing direction. Both convey identical information; you must check the projection symbol to know which convention is used."
  },
  {
    id: "hidden-detail",
    question: "Hidden detail lines on an orthographic drawing are represented by:",
    options: [
      "Thick continuous lines",
      "Thin dashed lines showing features that exist but cannot be seen in that particular view",
      "Red coloured lines",
      "Wavy lines"
    ],
    correctIndex: 1,
    explanation: "Hidden detail lines are thin, evenly spaced dashes. They show features such as holes, slots, internal channels and recesses that are present but not visible from the viewing direction. For electrical maintenance, hidden detail lines often indicate concealed cable routes, internal wiring spaces and rear-mounted components within enclosures."
  },
  {
    id: "auxiliary-view",
    question: "An auxiliary view is used when:",
    options: [
      "The drawing needs to be made larger",
      "A feature lies on an inclined surface that cannot be shown in true shape in any of the standard orthographic views",
      "The draughtsman runs out of space on the drawing",
      "Colour coding is required"
    ],
    correctIndex: 1,
    explanation: "Auxiliary views project a view onto a plane that is parallel to an inclined surface, showing that surface in its true shape and size. This is necessary when features on angled surfaces (such as cable entry plates on angled enclosure faces) would appear distorted in standard front, side or plan views."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Orthographic projection is defined as:",
    options: [
      "A method of drawing objects in 3D perspective",
      "A method of representing a 3D object by projecting its features onto two or more mutually perpendicular planes",
      "A free-hand sketching technique",
      "A method of drawing circuits"
    ],
    correctAnswer: 1,
    explanation: "Orthographic projection projects the features of a 3D object onto two or more planes that are at right angles to each other. This produces a set of related 2D views (front, side, plan) that together provide a complete and dimensionally accurate description of the object."
  },
  {
    id: 2,
    question: "The projection symbol showing a truncated cone viewed from the side distinguishes:",
    options: [
      "Metric from imperial drawings",
      "First angle from third angle projection",
      "Isometric from oblique drawings",
      "Assembly from detail drawings"
    ],
    correctAnswer: 1,
    explanation: "The standard projection symbol (a truncated cone shown in two views) indicates which projection convention is used. In first angle, the circle (end view) appears on the opposite side to the direction of viewing. In third angle, the circle appears on the same side. This symbol is placed in the title block and must be checked before reading any drawing."
  },
  {
    id: 3,
    question: "In first angle projection, the plan view is positioned:",
    options: [
      "Above the front view",
      "Below the front view, because you look down onto the object and the view falls below",
      "To the right of the front view",
      "On a separate sheet"
    ],
    correctAnswer: 1,
    explanation: "In first angle projection, the plan (top view) is placed below the front elevation. This follows the principle that the view is projected through the object — looking down from above, the view lands on the plane below. In third angle, the plan would be above the front view."
  },
  {
    id: 4,
    question: "Centre lines on orthographic drawings indicate:",
    options: [
      "Cutting planes for sections",
      "The axes of symmetry, centres of holes, and centre lines of cylindrical features",
      "The edges of the object",
      "Hidden features"
    ],
    correctAnswer: 1,
    explanation: "Centre lines (thin chain lines — long dash, short dash, long dash) indicate axes of symmetry, centres of circular features (holes, shafts, bosses), and the central axis of cylindrical components. They are essential reference lines for dimensioning and are used to locate features such as bolt hole patterns on motor mounting plates."
  },
  {
    id: 5,
    question: "A section view is indicated on the parent view by:",
    options: [
      "A thick red line",
      "A cutting plane line with arrows showing the direction of viewing and a reference letter at each end",
      "A dotted circle",
      "Shading across the entire view"
    ],
    correctAnswer: 1,
    explanation: "The cutting plane is shown as a chain line with thick dashes at the ends and corners, with arrows indicating the viewing direction. Reference letters (A-A, B-B) at each end link the cutting plane on the parent view to the corresponding sectional view drawn elsewhere on the sheet."
  },
  {
    id: 6,
    question: "BS 8888 is the standard that governs:",
    options: [
      "Electrical installation practices",
      "Technical product documentation and specification, including engineering drawing conventions in the UK",
      "Building regulations",
      "Health and safety at work"
    ],
    correctAnswer: 1,
    explanation: "BS 8888 'Technical product documentation and specification' is the UK standard for engineering drawing practice. It defines line types, dimensioning methods, tolerancing, projection conventions, and all other aspects of technical drawing preparation. It aligns with the international ISO 128 series."
  },
  {
    id: 7,
    question: "A dimension line that terminates with arrowheads at each end, with the dimension value placed above or on the line, is called:",
    options: [
      "A leader line",
      "A linear dimension showing the distance between two points or features",
      "A centre line",
      "A cutting plane line"
    ],
    correctAnswer: 1,
    explanation: "Linear dimensions use thin lines with arrowheads or oblique strokes at each end, with the value (in millimetres, without unit symbol) placed above or breaking the line. Projection lines extend from the features being measured to the dimension line. This is the standard BS 8888 dimensioning method."
  },
  {
    id: 8,
    question: "When reading an orthographic drawing of a motor terminal box, the front elevation typically shows:",
    options: [
      "Only the manufacturer's logo",
      "The face of the terminal box viewed from the front, including cable entry positions, gland plate, terminal layout and external dimensions",
      "Only the motor nameplate data",
      "The circuit diagram of the motor"
    ],
    correctAnswer: 1,
    explanation: "The front elevation of a terminal box shows features visible from the front: cable entry knockouts or gland plate, terminal arrangement, fixing screws, and overall height and width dimensions. The side view shows depth, and the plan view shows the top profile and any top-entry cable positions."
  },
  {
    id: 9,
    question: "Projection lines used with dimensions must:",
    options: [
      "Touch the object outline",
      "Extend from the feature with a small gap between the outline and the start of the projection line",
      "Be drawn freehand",
      "Be thicker than the object outline"
    ],
    correctAnswer: 1,
    explanation: "Projection lines (also called extension lines) extend from the feature being dimensioned to the dimension line. They must leave a small gap (approximately 1 mm) between the object outline and the start of the projection line, and extend slightly beyond the dimension line. This keeps the drawing clear and unambiguous."
  },
  {
    id: 10,
    question: "An isometric view differs from an orthographic view because:",
    options: [
      "Isometric views are less accurate",
      "An isometric view shows three faces of the object simultaneously in a single pictorial view, while orthographic views show one face per view",
      "Isometric views use hidden detail lines",
      "Orthographic views show all three dimensions in one view"
    ],
    correctAnswer: 1,
    explanation: "Isometric drawing shows three faces simultaneously using axes at 30 degrees to the horizontal, providing a pictorial 3D appearance. Orthographic projection shows only one face per view but provides accurate, dimensioned representations. Isometric views are useful for visualisation; orthographic views are used for precise manufacture and maintenance information."
  },
  {
    id: 11,
    question: "For an electrical maintenance technician, orthographic drawings are most useful for:",
    options: [
      "Calculating electricity consumption",
      "Understanding the physical dimensions, mounting arrangements, cable entry positions and internal layout of electrical equipment and enclosures",
      "Designing new circuits",
      "Ordering stationery supplies"
    ],
    correctAnswer: 1,
    explanation: "Orthographic drawings give maintenance technicians precise information about equipment dimensions (for replacement compatibility), mounting bolt patterns, cable entry positions and sizes, internal component layout, and access space requirements. This information is essential for planning equipment replacement, cable routing and maintenance access."
  },
  {
    id: 12,
    question: "The scale of a drawing (e.g., 1:5) means:",
    options: [
      "The drawing is 5 times larger than the real object",
      "Every 1 mm on the drawing represents 5 mm on the real object — the drawing is one fifth of full size",
      "The drawing uses 5 different views",
      "The drawing was created by 5 people"
    ],
    correctAnswer: 1,
    explanation: "A scale of 1:5 means the drawing is one fifth of the actual size — 1 unit on the drawing equals 5 units in reality. Common scales include 1:1 (full size), 1:2 (half size), 2:1 (twice full size for small components). The scale is stated in the title block. Never scale dimensions from a drawing — always use the stated dimension values."
  }
];

const faqs = [
  {
    question: "Do electrical maintenance technicians need to create orthographic drawings?",
    answer: "You are unlikely to create formal orthographic drawings yourself, but you must be able to read and interpret them accurately. Equipment manufacturers' installation drawings, enclosure layout drawings, and equipment general arrangement (GA) drawings are all presented in orthographic projection. Being able to extract dimensions, identify features, and understand the spatial arrangement of equipment is a core maintenance competence."
  },
  {
    question: "How do I know whether a drawing uses first or third angle projection?",
    answer: "Check the projection symbol in or near the title block. First angle projection is indicated by a truncated cone symbol where the smaller circle is on the opposite side to the viewing direction. Third angle shows the smaller circle on the same side. If no symbol is present, check the drawing origin — UK and European drawings typically use first angle; North American drawings use third angle. If in doubt, check by comparing what you can identify on site against the views on the drawing."
  },
  {
    question: "What is the relationship between orthographic drawings and 3D CAD models?",
    answer: "Modern 3D CAD systems create a digital model from which orthographic views are automatically extracted. The 3D model is the 'master', and the orthographic drawing is a communication document derived from it. For maintenance, you may receive either the 3D model (viewed in a CAD viewer) or traditional orthographic drawings extracted from it. The projection principles are identical — 3D CAD simply automates the creation of orthographic views."
  },
  {
    question: "Why do some drawings show more than three views?",
    answer: "Three views (front, side, plan) are sufficient for most objects, but complex components may require additional views — rear elevation, opposite side view, bottom view, auxiliary views for inclined features, or sectional views for internal features. The number of views should be the minimum needed to fully describe the object without ambiguity. More complex equipment enclosures may require four, five or even six views."
  },
  {
    question: "How do I use orthographic drawings during equipment replacement?",
    answer: "When replacing equipment, use the orthographic drawing to verify: mounting bolt hole centres and pattern, overall dimensions and clearances, cable entry positions and sizes, weight and centre of gravity (for lifting), and foundation or support requirements. Compare the replacement equipment drawing with the existing installation drawing to confirm compatibility before ordering."
  }
];

const MOETModule6Section1_3 = () => {
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
            <span>Module 6.1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Orthographic Projection
          </h1>
          <p className="text-white/80">
            First and third angle projection, standard views, hidden detail and auxiliary views for engineering drawings
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Orthographic:</strong> 3D objects shown as 2D views projected at 90 degrees</li>
              <li className="pl-1"><strong>First angle:</strong> UK/Europe standard — views opposite viewing direction</li>
              <li className="pl-1"><strong>Third angle:</strong> North American standard — views same side as viewing</li>
              <li className="pl-1"><strong>BS 8888:</strong> UK standard for engineering drawing conventions</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Enclosure layouts:</strong> Cable entries, gland plates, internal arrangement</li>
              <li className="pl-1"><strong>Motor drawings:</strong> Mounting dimensions, terminal box orientation</li>
              <li className="pl-1"><strong>Equipment GA:</strong> Physical dimensions for replacement planning</li>
              <li className="pl-1"><strong>ST1426:</strong> Drawing interpretation competence for EPA</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the principles of orthographic projection and its purpose in engineering drawings",
              "Distinguish between first angle and third angle projection and identify the convention from the symbol",
              "Interpret standard views — front elevation, side elevation and plan",
              "Read hidden detail lines, centre lines and section indicators on orthographic drawings",
              "Understand auxiliary views for features on inclined surfaces",
              "Apply orthographic drawing interpretation to electrical equipment installation and replacement"
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
            Principles of Orthographic Projection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Orthographic projection is the standard method of representing three-dimensional objects on
              two-dimensional engineering drawings. The object is viewed from several directions — typically
              front, side and above — with each view projected onto a flat plane at right angles to the
              viewing direction. This produces a set of related views that together describe the object
              completely and accurately, with precise dimensions that can be used for manufacture, installation
              and maintenance.
            </p>
            <p>
              For electrical maintenance technicians, orthographic drawings appear on equipment general
              arrangement (GA) drawings, enclosure layout drawings, motor installation drawings, switchgear
              compartment drawings, and cable tray and containment details. Understanding how to read these
              views is essential for planning equipment replacement, verifying mounting dimensions, locating
              cable entry points, and understanding the physical arrangement of equipment you maintain.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Three Principal Views</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Front elevation:</strong> The view from the front of the object — usually chosen to show the most characteristic shape or the face with the most features</li>
                <li className="pl-1"><strong>Side elevation:</strong> The view from the left or right side, showing the depth and features not visible from the front</li>
                <li className="pl-1"><strong>Plan (top view):</strong> The view from above, showing the width and depth of the object and the arrangement of features on the top surface</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Why Multiple Views Are Needed</h3>
              <p className="text-sm text-white mb-2">
                A single 2D view cannot fully describe a 3D object. A front view shows height and width
                but not depth. A side view shows height and depth but not width. A plan shows width and depth
                but not height. Together, these three views provide complete dimensional information. Features
                visible in one view can be projected across to locate the same feature in an adjacent view.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When reading orthographic drawings, always check how many views are
              provided and look at all of them together. A feature that appears as a simple rectangle in the
              front view might be revealed as a circular hole in the plan view — the views work together
              to build the complete picture.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            First Angle vs Third Angle Projection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              There are two internationally recognised conventions for arranging orthographic views: first
              angle projection (used predominantly in the UK and Europe, governed by BS 8888) and third angle
              projection (used predominantly in North America, governed by ASME Y14.5). Both produce identical
              information — the difference is solely in where the views are positioned relative to the front
              elevation.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">First Angle (BS 8888)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Third Angle (ASME Y14.5)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Plan position</td><td className="border border-white/10 px-3 py-2">Below the front elevation</td><td className="border border-white/10 px-3 py-2">Above the front elevation</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Right side view</td><td className="border border-white/10 px-3 py-2">To the left of the front elevation</td><td className="border border-white/10 px-3 py-2">To the right of the front elevation</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Left side view</td><td className="border border-white/10 px-3 py-2">To the right of the front elevation</td><td className="border border-white/10 px-3 py-2">To the left of the front elevation</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Principle</td><td className="border border-white/10 px-3 py-2">View falls onto the plane behind the object</td><td className="border border-white/10 px-3 py-2">View falls onto the plane between observer and object</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Common use</td><td className="border border-white/10 px-3 py-2">UK, Europe, Commonwealth countries</td><td className="border border-white/10 px-3 py-2">USA, Canada</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Always Check the Projection Symbol</p>
              <p className="text-sm text-white">
                Before reading any orthographic drawing, locate the projection symbol in the title block. If
                you read a first angle drawing assuming third angle convention (or vice versa), features will
                appear on the wrong side of the object and your interpretation will be completely incorrect.
                This can lead to serious errors — drilling cable entry holes on the wrong side of an enclosure,
                mounting equipment with the wrong orientation, or misidentifying component positions.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> In the UK, most engineering drawings use first angle projection
              per BS 8888. However, equipment manufactured in North America (many large motors, switchgear, and
              transformers) will use third angle. International projects may use either convention — always
              verify from the symbol.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Line Types and Drawing Conventions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Engineering drawings use standardised line types to convey different kinds of information. Each
              line type has a specific meaning defined by BS 8888 and ISO 128. As a maintenance technician,
              recognising these line types allows you to extract the maximum information from a drawing
              quickly and accurately.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Line Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Appearance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Continuous thick</td><td className="border border-white/10 px-3 py-2">Solid, heavy line</td><td className="border border-white/10 px-3 py-2">Visible outlines and edges</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Continuous thin</td><td className="border border-white/10 px-3 py-2">Solid, light line</td><td className="border border-white/10 px-3 py-2">Dimension lines, projection lines, hatching, leader lines</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Dashed thin</td><td className="border border-white/10 px-3 py-2">Even dashes</td><td className="border border-white/10 px-3 py-2">Hidden edges and outlines</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Chain thin</td><td className="border border-white/10 px-3 py-2">Long-short-long dashes</td><td className="border border-white/10 px-3 py-2">Centre lines, axes of symmetry</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Chain thick at ends</td><td className="border border-white/10 px-3 py-2">Long-short with thick ends</td><td className="border border-white/10 px-3 py-2">Cutting planes for sections</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Continuous thin irregular</td><td className="border border-white/10 px-3 py-2">Wavy freehand line</td><td className="border border-white/10 px-3 py-2">Short break lines (object continues beyond)</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reading Hidden Detail for Electrical Maintenance</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cable entry knockouts:</strong> Often shown as hidden detail on the rear elevation of an enclosure</li>
                <li className="pl-1"><strong>Internal DIN rails:</strong> Shown as hidden detail on the front view when the door is closed</li>
                <li className="pl-1"><strong>Rear-mounted components:</strong> Terminal strips, busbars and internal wiring channels behind a panel face</li>
                <li className="pl-1"><strong>Concealed fixings:</strong> Bolt holes and mounting points not visible from the viewing direction</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Hidden detail lines are essential in maintenance. They tell you what
              is behind, beneath or inside a surface that you cannot see in that view. When planning cable
              entries or locating internal components, the hidden detail lines on the drawing may be more
              useful than the visible outlines.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Sections, Auxiliary Views and Detail Views
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When standard orthographic views cannot adequately describe an object — particularly its internal
              features or features on inclined surfaces — additional views are used. Sectional views cut
              through the object to reveal internal arrangement; auxiliary views project inclined surfaces
              in true shape; detail views enlarge specific areas for clarity. All three are common on
              electrical equipment drawings.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Sectional Views</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Full section:</strong> Complete cut through the object</li>
                  <li className="pl-1"><strong>Half section:</strong> Half sectioned, half external (for symmetrical objects)</li>
                  <li className="pl-1"><strong>Removed section:</strong> Cross-section drawn separately</li>
                  <li className="pl-1"><strong>Hatching:</strong> 45-degree lines on cut material; different angles for adjacent parts</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Auxiliary and Detail Views</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Auxiliary views:</strong> Show true shape of inclined surfaces</li>
                  <li className="pl-1"><strong>Detail views:</strong> Enlarged areas for fine features</li>
                  <li className="pl-1"><strong>Exploded views:</strong> Components separated along assembly axis</li>
                  <li className="pl-1"><strong>Partial views:</strong> Only the relevant portion of a symmetrical object</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Electrical Maintenance Applications</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Switchgear sections:</strong> Internal busbar arrangement, contact mechanism, arc chute position</li>
                <li className="pl-1"><strong>Transformer sections:</strong> Core and winding arrangement, tap changer position, oil level</li>
                <li className="pl-1"><strong>Cable trunking sections:</strong> Internal dividers, cable capacity, lid fixing detail</li>
                <li className="pl-1"><strong>Motor terminal box detail:</strong> Enlarged view showing terminal arrangement, link configuration</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> Sectional views on switchgear drawings are invaluable for
              understanding access routes for maintenance. They show which compartments can be opened, how
              internal barriers are arranged, and where live busbars are located relative to maintenance
              access points — critical safety information for anyone working inside the switchgear.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Applying Orthographic Drawing Skills in Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The ability to read orthographic drawings fluently translates directly into more effective and
              safer maintenance practice. From verifying replacement equipment compatibility to planning
              cable routes and understanding switchgear access, orthographic drawing interpretation is a
              daily skill for maintenance technicians in industrial and commercial environments.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Application Scenarios</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Motor replacement:</strong> Compare the orthographic GA drawing of the replacement motor with the existing installation — verify mounting bolt centres, shaft height, terminal box position and overall dimensions</li>
                <li className="pl-1"><strong>Enclosure modification:</strong> Use the orthographic drawing to locate suitable positions for additional cable entries without fouling internal components shown in hidden detail</li>
                <li className="pl-1"><strong>Switchgear maintenance:</strong> Use sectional views to understand internal arrangement and plan safe access routes for testing and inspection</li>
                <li className="pl-1"><strong>Cable containment:</strong> Read plan views and sections to determine cable capacity, routing and support requirements</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Reading Errors to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wrong projection:</strong> Always check the projection symbol before interpreting view positions</li>
                <li className="pl-1"><strong>Scaling from the drawing:</strong> Never measure from the paper — use the stated dimension values only</li>
                <li className="pl-1"><strong>Ignoring hidden detail:</strong> Dashed lines contain critical information about concealed features</li>
                <li className="pl-1"><strong>Missing the revision:</strong> Ensure you are reading the current revision of the drawing</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Safety Implication</p>
              <p className="text-sm text-white">
                Misreading an orthographic drawing can have serious safety consequences. Drilling a cable entry
                hole in the wrong position could breach an internal safety barrier or damage a busbar.
                Installing a motor with the wrong orientation could position the terminal box inaccessibly
                or misalign the drive coupling. Always verify your interpretation against the physical
                equipment before carrying out any modification.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires competence in
              interpreting technical drawings and documentation. Orthographic drawing interpretation is
              specifically assessed — demonstrating that you can extract accurate information from
              multi-view drawings and apply it to practical maintenance tasks.
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
                <p className="font-medium text-white mb-1">Projection Conventions</p>
                <ul className="space-y-0.5">
                  <li>First angle (BS 8888) — views opposite viewing direction</li>
                  <li>Third angle (ASME Y14.5) — views same side as viewing</li>
                  <li>Always check projection symbol in title block</li>
                  <li>Both convey identical information</li>
                  <li>UK/Europe typically first angle</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Line Types</p>
                <ul className="space-y-0.5">
                  <li>Thick continuous — visible outlines</li>
                  <li>Thin dashed — hidden detail</li>
                  <li>Chain thin — centre lines</li>
                  <li>Thin continuous — dimensions, hatching</li>
                  <li>Chain thick ends — cutting planes</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section1-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Legal and Safety
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section1-4">
              Next: Drawing Layouts and Title Blocks
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule6Section1_3;
