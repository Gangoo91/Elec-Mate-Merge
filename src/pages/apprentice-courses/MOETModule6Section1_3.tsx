/**
 * MOET · Module 6 · Section 1 · Subsection 3 — Orthographic Projection
 * (Engineering Drawings)
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
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Orthographic Projection (Engineering Drawings) - MOET Module 6 Section 1.3';
const DESCRIPTION =
  'First and third angle orthographic projection, standard views, BS 8888 drawing conventions, hidden detail, auxiliary views and their application to electrical maintenance engineering drawings.';

const quickCheckQuestions = [
  {
    id: 'ortho-purpose',
    question: 'What is the primary purpose of orthographic projection in engineering drawings?',
    options: [
      'To represent a 3D object accurately using two or more 2D views projected at right angles to each other',
      'To show a single pictorial view that conveys the overall appearance of an object at a glance',
      'To indicate the electrical circuit connections between components within an enclosure',
      'To record the manufacturing tolerances and surface finishes required for each machined face',
    ],
    correctIndex: 0,
    explanation:
      'Orthographic projection uses two or more 2D views, each projected at right angles, to fully describe a 3D object. By viewing the object from the front, side and top (plan), every feature can be accurately represented with precise dimensions — essential for manufacture, installation and maintenance.',
  },
  {
    id: 'first-vs-third',
    question: 'How do first angle and third angle projection differ in view arrangement?',
    options: [
      'First angle uses millimetres while third angle uses inches for all dimensions',
      'In first angle each view is projected through the object so it falls on the far side; in third angle each view is placed on the same side as the viewing direction',
      'First angle shows hidden detail as solid lines while third angle uses dashed lines',
      'First angle drawings include a section view while third angle drawings never do',
    ],
    correctIndex: 1,
    explanation:
      'In first angle (BS 8888, widely used in the UK and Europe), views are placed opposite to the direction of viewing — the right side view appears on the left of the front view. In third angle (ASME Y14.5, common in North America), views are placed on the same side as the viewing direction. Both convey identical information; you must check the projection symbol to know which convention is used.',
  },
  {
    id: 'hidden-detail',
    question: 'Hidden detail lines on an orthographic drawing are represented by:',
    options: [
      'Thick continuous lines drawn slightly heavier than the visible outline',
      'Thin chain lines made up of alternating long and short dashes',
      'Thin dashed lines showing features that exist but cannot be seen in that particular view',
      'Wavy freehand lines indicating that the object continues beyond the view',
    ],
    correctIndex: 2,
    explanation:
      'Hidden detail lines are thin, evenly spaced dashes. They show features such as holes, slots, internal channels and recesses that are present but not visible from the viewing direction. For electrical maintenance, hidden detail lines often indicate concealed cable routes, internal wiring spaces and rear-mounted components within enclosures.',
  },
  {
    id: 'auxiliary-view',
    question: 'An auxiliary view is used when:',
    options: [
      'A feature lies on an inclined surface that cannot be shown in true shape in any of the standard orthographic views',
      'The object is too large to fit on the drawing sheet at the chosen scale',
      'An internal feature needs to be revealed by cutting through the object',
      'The drawing must be reproduced at a different scale for a separate document',
    ],
    correctIndex: 0,
    explanation:
      'Auxiliary views project a view onto a plane that is parallel to an inclined surface, showing that surface in its true shape and size. This is necessary when features on angled surfaces (such as cable entry plates on angled enclosure faces) would appear distorted in standard front, side or plan views.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Orthographic projection is defined as:',
    options: [
      'A method of representing a 3D object by projecting its features onto two or more mutually perpendicular planes',
      'A method of showing three faces of an object in a single view using axes at 30 degrees',
      'A method of drawing an object as it appears to the eye, with distant features made smaller',
      'A method of recording only the overall dimensions of an object without showing its shape',
    ],
    correctAnswer: 0,
    explanation:
      'Orthographic projection projects the features of a 3D object onto two or more planes that are at right angles to each other. This produces a set of related 2D views (front, side, plan) that together provide a complete and dimensionally accurate description of the object.',
  },
  {
    id: 2,
    question: 'The projection symbol showing a truncated cone viewed from the side distinguishes:',
    options: [
      'Isometric from oblique drawings',
      'Metric from imperial drawings',
      'First angle from third angle projection',
      'Assembly from detail drawings',
    ],
    correctAnswer: 2,
    explanation:
      'The standard projection symbol (a truncated cone shown in two views) indicates which projection convention is used. In first angle, the circle (end view) appears on the opposite side to the direction of viewing. In third angle, the circle appears on the same side. This symbol is placed in the title block and must be checked before reading any drawing.',
  },
  {
    id: 3,
    question: 'In first angle projection, the plan view is positioned:',
    options: [
      'To the left of the front view, aligned horizontally with it',
      'On a separate sheet cross-referenced by a letter',
      'Above the front view, aligned vertically with it',
      'Below the front view, because you look down onto the object and the view falls below',
    ],
    correctAnswer: 3,
    explanation:
      'In first angle projection, the plan (top view) is placed below the front elevation. This follows the principle that the view is projected through the object — looking down from above, the view lands on the plane below. In third angle, the plan would be above the front view.',
  },
  {
    id: 4,
    question: 'Centre lines on orthographic drawings indicate:',
    options: [
      'The axes of symmetry, centres of holes, and centre lines of cylindrical features',
      'The edges of the object that are hidden from the viewing direction',
      'The boundary of a sectioned area that has been cut through',
      'The leader lines that point from a note to the feature it describes',
    ],
    correctAnswer: 0,
    explanation:
      'Centre lines (thin chain lines — long dash, short dash, long dash) indicate axes of symmetry, centres of circular features (holes, shafts, bosses), and the central axis of cylindrical components. They are essential reference lines for dimensioning and are used to locate features such as bolt hole patterns on motor mounting plates.',
  },
  {
    id: 5,
    question: 'A section view is indicated on the parent view by:',
    options: [
      'A thin continuous line running diagonally across the whole view',
      'A cutting plane line with arrows showing the direction of viewing and a reference letter at each end',
      'A row of evenly spaced dashes around the perimeter of the feature',
      'A wavy freehand break line drawn through the middle of the object',
    ],
    correctAnswer: 1,
    explanation:
      'The cutting plane is shown as a chain line with thick dashes at the ends and corners, with arrows indicating the viewing direction. Reference letters (A-A, B-B) at each end link the cutting plane on the parent view to the corresponding sectional view drawn elsewhere on the sheet.',
  },
  {
    id: 6,
    question: 'BS 8888 is the standard that governs:',
    options: [
      'The colour identification of cores in fixed wiring installations',
      'The testing and inspection of completed electrical installations',
      'Technical product documentation and specification, including engineering drawing conventions in the UK',
      'The selection and erection of cable containment systems',
    ],
    correctAnswer: 2,
    explanation:
      "BS 8888 'Technical product documentation and specification' is the UK standard for engineering drawing practice. It defines line types, dimensioning methods, tolerancing, projection conventions, and all other aspects of technical drawing preparation. It aligns with the international ISO 128 series.",
  },
  {
    id: 7,
    question:
      'A dimension line that terminates with arrowheads at each end, with the dimension value placed above or on the line, is called:',
    options: [
      'A projection line marking the limit of a measured feature',
      'A leader line connecting a note to the feature it refers to',
      'A centre line locating the axis of a circular feature',
      'A linear dimension showing the distance between two points or features',
    ],
    correctAnswer: 3,
    explanation:
      'Linear dimensions use thin lines with arrowheads or oblique strokes at each end, with the value (in millimetres, without unit symbol) placed above or breaking the line. Projection lines extend from the features being measured to the dimension line. This is the standard BS 8888 dimensioning method.',
  },
  {
    id: 8,
    question:
      'When reading an orthographic drawing of a motor terminal box, the front elevation typically shows:',
    options: [
      'The face of the terminal box viewed from the front, including cable entry positions, gland plate, terminal layout and external dimensions',
      'The internal winding arrangement and the rotor position within the stator',
      'A pictorial 3D view of the whole motor including the cooling fan and feet',
      'Only the depth of the box and the top-entry cable knockouts',
    ],
    correctAnswer: 0,
    explanation:
      'The front elevation of a terminal box shows features visible from the front: cable entry knockouts or gland plate, terminal arrangement, fixing screws, and overall height and width dimensions. The side view shows depth, and the plan view shows the top profile and any top-entry cable positions.',
  },
  {
    id: 9,
    question: 'Projection lines used with dimensions must:',
    options: [
      'Be drawn as thick continuous lines to stand out from the outline',
      'Leave a small gap between the object outline and the start of the projection line',
      'Touch the object outline directly with no gap at all',
      'Be drawn as chain lines to distinguish them from the dimension line',
    ],
    correctAnswer: 1,
    explanation:
      'Projection lines (also called extension lines) extend from the feature being dimensioned to the dimension line. They must leave a small gap (approximately 1 mm) between the object outline and the start of the projection line, and extend slightly beyond the dimension line. This keeps the drawing clear and unambiguous.',
  },
  {
    id: 10,
    question: 'An isometric view differs from an orthographic view because:',
    options: [
      'It always shows hidden detail while orthographic views never do',
      'It is drawn to a smaller scale than any orthographic view',
      'An isometric view shows three faces of the object simultaneously in a single pictorial view, while orthographic views show one face per view',
      'It can only be used for cylindrical objects, not rectangular ones',
    ],
    correctAnswer: 2,
    explanation:
      'Isometric drawing shows three faces simultaneously using axes at 30 degrees to the horizontal, providing a pictorial 3D appearance. Orthographic projection shows only one face per view but provides accurate, dimensioned representations. Isometric views are useful for visualisation; orthographic views are used for precise manufacture and maintenance information.',
  },
  {
    id: 11,
    question:
      'For an electrical maintenance technician, orthographic drawings are most useful for:',
    options: [
      'Calculating the electrical load and cable size for a circuit',
      'Recording the test results from a periodic inspection',
      'Producing a pictorial impression of equipment for a client presentation',
      'Understanding the physical dimensions, mounting arrangements, cable entry positions and internal layout of electrical equipment and enclosures',
    ],
    correctAnswer: 3,
    explanation:
      'Orthographic drawings give maintenance technicians precise information about equipment dimensions (for replacement compatibility), mounting bolt patterns, cable entry positions and sizes, internal component layout, and access space requirements. This information is essential for planning equipment replacement, cable routing and maintenance access.',
  },
  {
    id: 12,
    question: 'The scale of a drawing (e.g., 1:5) means:',
    options: [
      'Every 1 mm on the drawing represents 5 mm on the real object — the drawing is one fifth of full size',
      'Every 5 mm on the drawing represents 1 mm on the real object — the drawing is five times full size',
      'The drawing must always be reproduced on A5 sheets',
      'Five separate views are required to fully describe the object',
    ],
    correctAnswer: 0,
    explanation:
      'A scale of 1:5 means the drawing is one fifth of the actual size — 1 unit on the drawing equals 5 units in reality. Common scales include 1:1 (full size), 1:2 (half size), 2:1 (twice full size for small components). The scale is stated in the title block. Never scale dimensions from a drawing — always use the stated dimension values.',
  },
];

const faqs = [
  {
    question: 'Do electrical maintenance technicians need to create orthographic drawings?',
    answer:
      "You are unlikely to create formal orthographic drawings yourself, but you must be able to read and interpret them accurately. Equipment manufacturers' installation drawings, enclosure layout drawings, and equipment general arrangement (GA) drawings are all presented in orthographic projection. Being able to extract dimensions, identify features, and understand the spatial arrangement of equipment is a core maintenance competence.",
  },
  {
    question: 'How do I know whether a drawing uses first or third angle projection?',
    answer:
      'Check the projection symbol in or near the title block. First angle projection is indicated by a truncated cone symbol where the smaller circle is on the opposite side to the viewing direction. Third angle shows the smaller circle on the same side. If no symbol is present, check the drawing origin — UK and European drawings typically use first angle; North American drawings use third angle. If in doubt, check by comparing what you can identify on site against the views on the drawing.',
  },
  {
    question: 'What is the relationship between orthographic drawings and 3D CAD models?',
    answer:
      "Modern 3D CAD systems create a digital model from which orthographic views are automatically extracted. The 3D model is the 'master', and the orthographic drawing is a communication document derived from it. For maintenance, you may receive either the 3D model (viewed in a CAD viewer) or traditional orthographic drawings extracted from it. The projection principles are identical — 3D CAD simply automates the creation of orthographic views.",
  },
  {
    question: 'Why do some drawings show more than three views?',
    answer:
      'Three views (front, side, plan) are sufficient for most objects, but complex components may require additional views — rear elevation, opposite side view, bottom view, auxiliary views for inclined features, or sectional views for internal features. The number of views should be the minimum needed to fully describe the object without ambiguity. More complex equipment enclosures may require four, five or even six views.',
  },
  {
    question: 'How do I use orthographic drawings during equipment replacement?',
    answer:
      'When replacing equipment, use the orthographic drawing to verify: mounting bolt hole centres and pattern, overall dimensions and clearances, cable entry positions and sizes, weight and centre of gravity (for lifting), and foundation or support requirements. Compare the replacement equipment drawing with the existing installation drawing to confirm compatibility before ordering.',
  },
];

const MOETModule6Section1_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 6 · Section 6.1 · Subsection 3"
        title="Orthographic Projection (Engineering Drawings)"
        backTo="/study-centre/apprentice/m-o-e-t-module6-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            First and third angle projection, standard views, hidden detail and auxiliary views for
            engineering drawings.
          </p>

          <TLDR
            points={[
              'Orthographic: 3D objects shown as 2D views projected at 90 degrees.',
              'First angle: UK/Europe standard — views opposite viewing direction.',
              'Third angle: North American standard — views same side as viewing.',
              'BS 8888: UK standard for engineering drawing conventions.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the principles of orthographic projection and its purpose in engineering drawings',
              'Distinguish between first angle and third angle projection and identify the convention from the symbol',
              'Interpret standard views — front elevation, side elevation and plan',
              'Read hidden detail lines, centre lines and section indicators on orthographic drawings',
              'Understand auxiliary views for features on inclined surfaces',
              'Apply orthographic drawing interpretation to electrical equipment installation and replacement',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Enclosure layouts:</strong> cable entries, gland plates, internal
                arrangement.
              </li>
              <li>
                <strong>Motor drawings:</strong> mounting dimensions, terminal box orientation.
              </li>
              <li>
                <strong>Equipment GA:</strong> physical dimensions for replacement planning.
              </li>
              <li>
                <strong>ST1426:</strong> drawing interpretation competence for EPA.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Principles of orthographic projection</ContentEyebrow>

          <ConceptBlock title="Principles of orthographic projection">
            <p>
              Orthographic projection is the standard method of representing three-dimensional
              objects on two-dimensional engineering drawings. The object is viewed from several
              directions — typically front, side and above — with each view projected onto a flat
              plane at right angles to the viewing direction. This produces a set of related views
              that together describe the object completely and accurately, with precise dimensions
              that can be used for manufacture, installation and maintenance.
            </p>
            <p>
              For electrical maintenance technicians, orthographic drawings appear on equipment
              general arrangement (GA) drawings, enclosure layout drawings, motor installation
              drawings, switchgear compartment drawings, and cable tray and containment details.
              Understanding how to read these views is essential for planning equipment replacement,
              verifying mounting dimensions, locating cable entry points, and understanding the
              physical arrangement of equipment you maintain.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The three principal views">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Front elevation:</strong> the view from the front of the object — usually
                chosen to show the most characteristic shape or the face with the most features.
              </li>
              <li>
                <strong>Side elevation:</strong> the view from the left or right side, showing the
                depth and features not visible from the front.
              </li>
              <li>
                <strong>Plan (top view):</strong> the view from above, showing the width and depth
                of the object and the arrangement of features on the top surface.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Why multiple views are needed">
            <p>
              A single 2D view cannot fully describe a 3D object. A front view shows height and
              width but not depth. A side view shows height and depth but not width. A plan shows
              width and depth but not height. Together, these three views provide complete
              dimensional information. Features visible in one view can be projected across to
              locate the same feature in an adjacent view.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key point">
            <p>
              When reading orthographic drawings, always check how many views are provided and look
              at all of them together. A feature that appears as a simple rectangle in the front
              view might be revealed as a circular hole in the plan view — the views work together
              to build the complete picture.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>First angle vs third angle projection</ContentEyebrow>

          <ConceptBlock title="First angle vs third angle projection">
            <p>
              There are two internationally recognised conventions for arranging orthographic views:
              first angle projection (used predominantly in the UK and Europe, governed by BS 8888)
              and third angle projection (used predominantly in North America, governed by ASME
              Y14.5). Both produce identical information — the difference is solely in where the
              views are positioned relative to the front elevation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="First angle vs third angle: how they differ">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Feature</th>
                    <th className="py-2 pr-4 font-medium text-white">First angle (BS 8888)</th>
                    <th className="py-2 font-medium text-white">Third angle (ASME Y14.5)</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Plan position</td>
                    <td className="py-2 pr-4">Below the front elevation</td>
                    <td className="py-2">Above the front elevation</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Right side view</td>
                    <td className="py-2 pr-4">To the left of the front elevation</td>
                    <td className="py-2">To the right of the front elevation</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Left side view</td>
                    <td className="py-2 pr-4">To the right of the front elevation</td>
                    <td className="py-2">To the left of the front elevation</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Principle</td>
                    <td className="py-2 pr-4">View falls onto the plane behind the object</td>
                    <td className="py-2">View falls onto the plane between observer and object</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Common use</td>
                    <td className="py-2 pr-4">UK, Europe, Commonwealth countries</td>
                    <td className="py-2">USA, Canada</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <CommonMistake
            title="Reading a drawing under the wrong projection convention"
            whatHappens={
              <>
                <p>
                  Before reading any orthographic drawing, locate the projection symbol in the title
                  block. If you read a first angle drawing assuming third angle convention (or vice
                  versa), features will appear on the wrong side of the object and your
                  interpretation will be completely incorrect.
                </p>
                <p>
                  This can lead to serious errors — drilling cable entry holes on the wrong side of
                  an enclosure, mounting equipment with the wrong orientation, or misidentifying
                  component positions.
                </p>
              </>
            }
            doInstead={
              <>
                In the UK, most engineering drawings use first angle projection per BS 8888.
                However, equipment manufactured in North America (many large motors, switchgear, and
                transformers) will use third angle. International projects may use either convention
                — always verify from the symbol.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Line types and drawing conventions</ContentEyebrow>

          <ConceptBlock title="Line types and drawing conventions">
            <p>
              Engineering drawings use standardised line types to convey different kinds of
              information. Each line type has a specific meaning defined by BS 8888 and ISO 128. As
              a maintenance technician, recognising these line types allows you to extract the
              maximum information from a drawing quickly and accurately.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Standard line types and their purpose">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Line type</th>
                    <th className="py-2 pr-4 font-medium text-white">Appearance</th>
                    <th className="py-2 font-medium text-white">Purpose</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Continuous thick</td>
                    <td className="py-2 pr-4">Solid, heavy line</td>
                    <td className="py-2">Visible outlines and edges</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Continuous thin</td>
                    <td className="py-2 pr-4">Solid, light line</td>
                    <td className="py-2">
                      Dimension lines, projection lines, hatching, leader lines
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Dashed thin</td>
                    <td className="py-2 pr-4">Even dashes</td>
                    <td className="py-2">Hidden edges and outlines</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Chain thin</td>
                    <td className="py-2 pr-4">Long-short-long dashes</td>
                    <td className="py-2">Centre lines, axes of symmetry</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Chain thick at ends</td>
                    <td className="py-2 pr-4">Long-short with thick ends</td>
                    <td className="py-2">Cutting planes for sections</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Continuous thin irregular</td>
                    <td className="py-2 pr-4">Wavy freehand line</td>
                    <td className="py-2">Short break lines (object continues beyond)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Reading hidden detail for electrical maintenance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable entry knockouts:</strong> often shown as hidden detail on the rear
                elevation of an enclosure.
              </li>
              <li>
                <strong>Internal DIN rails:</strong> shown as hidden detail on the front view when
                the door is closed.
              </li>
              <li>
                <strong>Rear-mounted components:</strong> terminal strips, busbars and internal
                wiring channels behind a panel face.
              </li>
              <li>
                <strong>Concealed fixings:</strong> bolt holes and mounting points not visible from
                the viewing direction.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Key point">
            <p>
              Hidden detail lines are essential in maintenance. They tell you what is behind,
              beneath or inside a surface that you cannot see in that view. When planning cable
              entries or locating internal components, the hidden detail lines on the drawing may be
              more useful than the visible outlines.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Sections, auxiliary views and detail views</ContentEyebrow>

          <ConceptBlock title="Sections, auxiliary views and detail views">
            <p>
              When standard orthographic views cannot adequately describe an object — particularly
              its internal features or features on inclined surfaces — additional views are used.
              Sectional views cut through the object to reveal internal arrangement; auxiliary views
              project inclined surfaces in true shape; detail views enlarge specific areas for
              clarity. All three are common on electrical equipment drawings.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Sectional views">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Full section:</strong> complete cut through the object.
              </li>
              <li>
                <strong>Half section:</strong> half sectioned, half external (for symmetrical
                objects).
              </li>
              <li>
                <strong>Removed section:</strong> cross-section drawn separately.
              </li>
              <li>
                <strong>Hatching:</strong> 45-degree lines on cut material; different angles for
                adjacent parts.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Auxiliary and detail views">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Auxiliary views:</strong> show true shape of inclined surfaces.
              </li>
              <li>
                <strong>Detail views:</strong> enlarged areas for fine features.
              </li>
              <li>
                <strong>Exploded views:</strong> components separated along assembly axis.
              </li>
              <li>
                <strong>Partial views:</strong> only the relevant portion of a symmetrical object.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Electrical maintenance applications">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Switchgear sections:</strong> internal busbar arrangement, contact
                mechanism, arc chute position.
              </li>
              <li>
                <strong>Transformer sections:</strong> core and winding arrangement, tap changer
                position, oil level.
              </li>
              <li>
                <strong>Cable trunking sections:</strong> internal dividers, cable capacity, lid
                fixing detail.
              </li>
              <li>
                <strong>Motor terminal box detail:</strong> enlarged view showing terminal
                arrangement, link configuration.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Maintenance tip">
            <p>
              Sectional views on switchgear drawings are invaluable for understanding access routes
              for maintenance. They show which compartments can be opened, how internal barriers are
              arranged, and where live busbars are located relative to maintenance access points —
              critical safety information for anyone working inside the switchgear.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Applying orthographic drawing skills in maintenance</ContentEyebrow>

          <ConceptBlock title="Applying orthographic drawing skills in maintenance">
            <p>
              The ability to read orthographic drawings fluently translates directly into more
              effective and safer maintenance practice. From verifying replacement equipment
              compatibility to planning cable routes and understanding switchgear access,
              orthographic drawing interpretation is a daily skill for maintenance technicians in
              industrial and commercial environments.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Practical application scenarios">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Motor replacement:</strong> compare the orthographic GA drawing of the
                replacement motor with the existing installation — verify mounting bolt centres,
                shaft height, terminal box position and overall dimensions.
              </li>
              <li>
                <strong>Enclosure modification:</strong> use the orthographic drawing to locate
                suitable positions for additional cable entries without fouling internal components
                shown in hidden detail.
              </li>
              <li>
                <strong>Switchgear maintenance:</strong> use sectional views to understand internal
                arrangement and plan safe access routes for testing and inspection.
              </li>
              <li>
                <strong>Cable containment:</strong> read plan views and sections to determine cable
                capacity, routing and support requirements.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common reading errors to avoid"
            whatHappens={
              <ul className="list-disc space-y-1.5 pl-5 marker:text-orange-300/70">
                <li>
                  <strong>Wrong projection:</strong> misreading view positions because the
                  projection symbol was not checked first.
                </li>
                <li>
                  <strong>Scaling from the drawing:</strong> measuring directly from the paper
                  instead of using the stated dimension values.
                </li>
                <li>
                  <strong>Ignoring hidden detail:</strong> missing critical information about
                  concealed features carried in the dashed lines.
                </li>
                <li>
                  <strong>Missing the revision:</strong> working from an out-of-date issue of the
                  drawing.
                </li>
              </ul>
            }
            doInstead={
              <>
                Always check the projection symbol before interpreting view positions. Never measure
                from the paper — use the stated dimension values only. Read hidden detail lines as
                carefully as visible outlines. Ensure you are reading the current revision of the
                drawing before starting any work.
              </>
            }
          />

          <ConceptBlock title="Safety implication">
            <p>
              Misreading an orthographic drawing can have serious safety consequences. Drilling a
              cable entry hole in the wrong position could breach an internal safety barrier or
              damage a busbar. Installing a motor with the wrong orientation could position the
              terminal box inaccessibly or misalign the drive coupling. Always verify your
              interpretation against the physical equipment before carrying out any modification.
            </p>
          </ConceptBlock>

          <ConceptBlock title="ST1426 link">
            <p>
              The maintenance technician standard requires competence in interpreting technical
              drawings and documentation. Orthographic drawing interpretation is specifically
              assessed — demonstrating that you can extract accurate information from multi-view
              drawings and apply it to practical maintenance tasks.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Orthographic projection represents a 3D object using two or more 2D views projected at right angles.',
              'First angle (BS 8888, UK/Europe): views placed opposite the viewing direction — plan below the front elevation.',
              'Third angle (ASME Y14.5, North America): views placed on the same side as the viewing direction.',
              'Always check the projection symbol in the title block before interpreting a drawing.',
              'Standard line types: thick continuous for visible outlines, thin dashed for hidden detail, chain thin for centre lines, chain thick at ends for cutting planes.',
              'Sectional, auxiliary and detail views extend the standard three views for internal features, inclined surfaces and fine detail.',
              'Never scale dimensions from the drawing — always use the stated dimension values.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section1-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Legal and Safety Reasons (EAWR, BS 7671 Principles)
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section1-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Drawing Layouts and Title Blocks
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule6Section1_3;
