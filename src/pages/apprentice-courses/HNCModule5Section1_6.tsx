/**
 * Module 5 · Section 1 · Subsection 6 — Building Services Coordination
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   MEP sequencing, interface management, clash detection and installation priorities — the operational reality of fitting electrical, mechanical and public health into the same ceiling void.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Building Services Coordination - HNC Module 5 Section 1.6';
const DESCRIPTION =
  'Master MEP coordination for building services: sequencing, interface management, BIM clash detection, coordination drawings, and installation priorities for electrical, mechanical, and plumbing systems.';

const quickCheckQuestions = [
  {
    id: 'mep-definition',
    question: 'What does MEP stand for in building services coordination?',
    options: [
      'Maximum Equipment Priority',
      'Mechanical, Electrical, and Plumbing',
      'Main Electrical Panel',
      'Multi-Element Programme',
    ],
    correctIndex: 1,
    explanation:
      'MEP stands for Mechanical, Electrical, and Plumbing - the three main building services disciplines that must be coordinated to avoid clashes and ensure efficient installation.',
  },
  {
    id: 'clash-detection',
    question: 'What is the primary purpose of BIM clash detection?',
    options: [
      'To identify conflicts between services before installation',
      'To calculate the total material cost of all building services',
      'To schedule labour and plant hire across the project programme',
      'To generate the operation and maintenance manuals at handover',
    ],
    correctIndex: 0,
    explanation:
      'BIM clash detection identifies where different building services (pipes, ducts, cables) would physically occupy the same space, allowing resolution during design rather than costly on-site modifications.',
  },
  {
    id: 'installation-priority',
    question: 'Which service typically has installation priority in ceiling voids?',
    options: [
      'Data cabling',
      'Electrical containment',
      'Lighting fixtures',
      'Drainage (gravity-fed)',
    ],
    correctIndex: 3,
    explanation:
      'Drainage and gravity-fed services have priority because they cannot be rerouted easily - they require specific gradients (falls) to function. All other services must work around them.',
  },
  {
    id: 'coordination-drawing',
    question: 'A coordination drawing shows:',
    options: [
      'Only the electrical containment routes for a single trade',
      'The structural steelwork and foundations of the building',
      'All services overlaid with routing agreements',
      'A schedule of the test results for each final circuit',
    ],
    correctIndex: 2,
    explanation:
      'Coordination drawings show all MEP services overlaid on the same drawing with agreed routing, levels, and separation distances. They are the master reference for installation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the typical sequence for MEP installation in a ceiling void?',
    options: [
      'Electrical first, then mechanical, then plumbing',
      'Drainage, then ductwork, then pipework, then electrical',
      'All trades install simultaneously',
      'Plumbing first, then electrical, then mechanical',
    ],
    correctAnswer: 1,
    explanation:
      'The standard sequence is: 1) Drainage (gravity-fed), 2) Large ductwork, 3) Pipework, 4) Electrical containment, 5) Small services/cabling. This ensures inflexible services are installed first.',
  },
  {
    id: 2,
    question: "In BIM clash detection, a 'hard clash' refers to:",
    options: [
      'A clash requiring structural changes',
      'A difficult negotiation between trades',
      'Physical intersection of two objects',
      'Software compatibility issues',
    ],
    correctAnswer: 2,
    explanation:
      'A hard clash is where two objects physically occupy the same space (e.g., a pipe passing through a duct). Soft clashes relate to clearance, access, or tolerance violations.',
  },
  {
    id: 3,
    question: 'Why do gravity drainage systems have installation priority?',
    options: [
      'They are the most expensive services to install on a project',
      'They carry the highest fire risk of all building services',
      'They are always installed by the principal contractor first',
      'They cannot be rerouted - require specific gradients',
    ],
    correctAnswer: 3,
    explanation:
      'Gravity drainage must maintain specific falls (gradients) to function. Unlike pumped or pressurised systems, the route cannot be altered significantly without affecting performance.',
  },
  {
    id: 4,
    question: 'What is the purpose of a services coordination meeting?',
    options: [
      'To resolve routing conflicts and agree installation sequence',
      'To negotiate the final contract price with the client',
      'To select the BIM software each contractor will use',
      'To review the health and safety method statements only',
    ],
    correctAnswer: 0,
    explanation:
      'Coordination meetings bring all MEP contractors together to resolve clashes, agree routes, confirm installation sequences, and ensure all parties understand the coordination drawings.',
  },
  {
    id: 5,
    question:
      'The minimum clearance typically required for electrical cable tray maintenance access is:',
    options: [
      '100mm',
      '150mm',
      '300mm',
      '50mm',
    ],
    correctAnswer: 1,
    explanation:
      "150mm clear space is typically required above cable trays for pulling cables and maintenance access. This 'soft clash' requirement must be coordinated with other services.",
  },
  {
    id: 6,
    question: 'What does LOD 300 mean in BIM coordination?',
    options: [
      'Level of Detail - basic conceptual model',
      'Level of Design - final approved design',
      'Level of Development - accurate geometry and quantities',
      'Level of Documentation - complete specifications',
    ],
    correctAnswer: 2,
    explanation:
      'LOD 300 (Level of Development) means model elements are geometrically accurate with specific dimensions and quantities - suitable for coordination and clash detection.',
  },
  {
    id: 7,
    question: 'When coordinating services in a riser, what principle applies?',
    options: [
      'Largest services go in the centre',
      'Electrical services always go on the left',
      'All services can be positioned anywhere',
      'Services requiring access go to the outside',
    ],
    correctAnswer: 3,
    explanation:
      'Services requiring regular maintenance access (isolation valves, distribution boards, meters) must be positioned for accessibility, typically towards the riser door opening.',
  },
  {
    id: 8,
    question: "A 'soft clash' in BIM coordination typically refers to:",
    options: [
      'Clearance violations for access or maintenance',
      'A disagreement between contractors at a coordination meeting',
      'Physical intersection of two objects',
      'A modelling error caused by an out-of-date software version',
    ],
    correctAnswer: 0,
    explanation:
      "Soft clashes occur when minimum clearances for access, maintenance, insulation, or operational requirements are violated - the objects don't physically intersect but are too close.",
  },
  {
    id: 9,
    question: 'What is the purpose of service zone allocation in coordination?',
    options: [
      'To assign each trade a separate area of the site to work in',
      'To define specific vertical and horizontal zones for each service type',
      'To set the working hours during which each trade may install',
      'To allocate the project budget between the different disciplines',
    ],
    correctAnswer: 1,
    explanation:
      'Service zone allocation defines dedicated corridors or layers for each service type (e.g., electrical at high level, pipework at mid-level), preventing ad-hoc routing and clashes.',
  },
  {
    id: 10,
    question: 'Interface management in MEP coordination ensures:',
    options: [
      'All contractors use the same software',
      'Consistent working hours for all trades',
      'Clear responsibility boundaries between disciplines',
      'Uniform pricing across all trades',
    ],
    correctAnswer: 2,
    explanation:
      "Interface management defines where one contractor's work ends and another's begins, ensuring no gaps or overlaps in responsibility and clear accountability at connection points.",
  },
  {
    id: 11,
    question: 'When should BIM clash detection ideally occur?',
    options: [
      'Only after the building has been handed over to the client',
      'Once all services have been physically installed on site',
      'During the final commissioning and testing phase',
      'During design development before construction',
    ],
    correctAnswer: 3,
    explanation:
      'Clash detection should occur during design development (RIBA Stage 4) when changes are cheap to make. Discovering clashes on site causes delays and cost overruns.',
  },
  {
    id: 12,
    question:
      'What colour coding is typically used for electrical services on coordination drawings?',
    options: [
      'Orange or Yellow',
      'Green',
      'Red',
      'Blue',
    ],
    correctAnswer: 0,
    explanation:
      'Electrical services are typically shown in orange or yellow on coordination drawings. Blue is usually HVAC/ductwork, green is pipework/plumbing, and red is fire services.',
  },
];

const faqs = [
  {
    question: 'What is the role of the MEP coordinator?',
    answer:
      "The MEP coordinator manages the interface between mechanical, electrical, and plumbing contractors. They run coordination meetings, maintain the combined services model, manage clash detection, produce coordination drawings, and ensure all parties follow the agreed installation sequence. On large projects, this is often a dedicated role; on smaller projects, it may be part of the M&E contractor's responsibilities.",
  },
  {
    question: 'How are coordination clashes typically resolved?',
    answer:
      'Clashes are resolved through a hierarchy: 1) Gravity services (drainage) have priority - reroute everything else. 2) Large ductwork is difficult to reroute - adjust smaller services. 3) Structural penetrations are fixed - services must fit. 4) Aesthetic requirements (ceiling heights) constrain vertical space. 5) Remaining conflicts are resolved by negotiation at coordination meetings, typically with the latest installer making adjustments.',
  },
  {
    question: 'What information should be on a coordination drawing?',
    answer:
      'Coordination drawings should show: all services with agreed routes, levels (typically as offsets from finished floor level), service zone boundaries, penetration locations through structure, clearances maintained, interface points between contractors, installation sequence notes, and cross-references to specification clauses. They should be signed off by all relevant trades.',
  },
  {
    question: "Why can't all services be coordinated using 2D drawings alone?",
    answer:
      'Complex buildings have services running at multiple levels and crossing in three dimensions. 2D drawings show plan or section views but cannot easily represent all interactions. BIM allows all services to be modelled in 3D, with automated clash detection finding conflicts that would be missed on 2D overlays. This is especially important in congested areas like plant rooms and risers.',
  },
  {
    question: 'What happens when a clash is discovered during installation?',
    answer:
      'On-site clashes require immediate resolution through the site coordination process. Options include: rerouting one service, adjusting levels, creating new penetrations, or redesigning sections. All changes must be recorded on as-built drawings. On-site clashes are expensive - they cause delays, rework, and may require removing installed work. This is why pre-construction coordination is so important.',
  },
  {
    question: 'How does building handover relate to coordination?',
    answer:
      'At handover, the coordination drawings become as-built records showing actual installed positions. O&M manuals must reference these for future maintenance access. Poor coordination during construction leads to services installed in non-coordinated positions, making future maintenance difficult and increasing building operational costs.',
  },
];

const HNCModule5Section1_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 1 · Subsection 6"
            title="Building Services Coordination"
            description="MEP sequencing, interface management, clash detection, and installation priorities for complex building services."
            tone="purple"
          />

          <TLDR
            points={[
              "Coordination is the discipline of fitting all MEP services in the available zones without clashes — done in 3D before site, not in the ceiling void with hammers.",
              "Installation priority sequence is established by physical hierarchy: drainage (gravity) → ductwork (large, fixed) → pipework → containment → cable tray → small power cabling → ceiling.",
              "BIM Level 2 with federated models and weekly clash detection meetings is the modern standard — Navisworks or similar.",
              "Coordination drawings are signed off before any service is installed — a contractor that installs ahead of coordinated drawings owns every clash.",
              "For occupied buildings and tight refurbishments, allow extra coordination time — scanning, point-clouds and survey-led modelling rather than as-built guesses.",
            ]}
          />

          <RegsCallout
            source="ISO 19650-2:2018 — Information management using building information modelling — Delivery phase of the assets"
            clause="The standard sets out requirements for managing information collaboratively using BIM during the delivery phase of assets, including the appointment processes, federation strategy, common data environment, and information model production."
            meaning={
              <>
                ISO 19650 is the international successor to PAS 1192-2. Where the employer's information requirements (EIR) call for BIM Level 2, federated coordination through a common data environment is contractually obligatory. Coordination is no longer a "nice to have" optional process — it is the deliverable that controls clash risk and as-built O&M information quality.
              </>
            }
            cite="Source: ISO 19650-2:2018 (refer to BSI published text for verbatim clauses)."
          />


          <LearningOutcomes
            outcomes={[
              'Understand the MEP coordination process and its importance',
              'Apply BIM clash detection to identify service conflicts',
              'Determine correct installation sequencing for multiple trades',
              'Interpret and produce coordination drawings',
              'Manage interfaces between building services disciplines',
              'Apply service priority rules in ceiling voids and risers',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="MEP Coordination Fundamentals">
            <p>
              Building services coordination is the process of ensuring that mechanical, electrical,
              and plumbing (MEP) systems can be installed without physical conflicts, while
              maintaining required access for operation and maintenance. Poor coordination is one of
              the largest causes of construction delays and cost overruns in modern buildings.
            </p>
            <p>
              <strong>The MEP coordination challenge:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Multiple disciplines:</strong> Electrical, HVAC, plumbing, fire, data,
                security all compete for space
              </li>
              <li>
                <strong>Limited zones:</strong> Ceiling voids, risers, and service corridors have
                finite space
              </li>
              <li>
                <strong>Different contractors:</strong> Each trade designs independently then must
                integrate
              </li>
              <li>
                <strong>Timing conflicts:</strong> Installation sequences must be carefully planned
              </li>
            </ul>
            <p>
              <strong>
                Typical Building Services in a Commercial Building (Discipline — Services — Space
                Requirement):
              </strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mechanical:</strong> Ductwork, pipework, plant — Largest, up to 600mm ducts
              </li>
              <li>
                <strong>Electrical:</strong> Containment, busbar, lighting — Medium, typically
                50-150mm trays
              </li>
              <li>
                <strong>Plumbing:</strong> Drainage, water, gas — Variable, drainage needs falls
              </li>
              <li>
                <strong>Fire:</strong> Sprinklers, detection, alarms — Sprinkler heads need ceiling
                access
              </li>
              <li>
                <strong>Data/Comms:</strong> Structured cabling, containment — Separation from power
                required
              </li>
              <li>
                <strong>Security:</strong> CCTV, access control cabling — Small, typically shares
                data routes
              </li>
            </ul>
            <p>
              <strong>Key principle:</strong> Coordination is not about finding space for services —
              it's about ensuring all services can be installed, operated, and maintained throughout
              the building's life.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="BIM Clash Detection">
            <p>
              Building Information Modelling (BIM) has revolutionised services coordination. By
              creating 3D digital models of all services, software can automatically detect where
              elements would physically clash, allowing resolution during design rather than
              expensive on-site modifications.
            </p>
            <p>
              <strong>Hard Clashes:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Physical intersection of objects</li>
              <li>Pipe passing through ductwork</li>
              <li>Cable tray through structural beam</li>
              <li>Must be resolved - cannot install</li>
            </ul>
            <p>
              <strong>Soft Clashes:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Clearance or tolerance violations</li>
              <li>Insufficient maintenance access</li>
              <li>Insulation thickness conflicts</li>
              <li>Important for long-term operation</li>
            </ul>
            <p>
              <strong>BIM Level of Development (LOD) for Coordination (LOD — Description — Suitable For):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>LOD 100:</strong> Conceptual - approximate location — Early feasibility
                studies
              </li>
              <li>
                <strong>LOD 200:</strong> Approximate geometry and size — Scheme design spatial
                planning
              </li>
              <li>
                <strong>LOD 300:</strong> Accurate geometry and quantities — Clash detection and
                coordination
              </li>
              <li>
                <strong>LOD 350:</strong> Includes interface connections — Detailed coordination
              </li>
              <li>
                <strong>LOD 400:</strong> Fabrication detail — Manufacture and installation
              </li>
            </ul>
            <p>
              <strong>Common Clash Detection Errors to Avoid:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Running detection at wrong LOD - false clashes from inaccurate models</li>
              <li>Ignoring soft clashes - causes maintenance problems later</li>
              <li>Not including insulation thickness in model</li>
              <li>Missing structural penetration sleeves and builders work</li>
            </ul>
            <p>
              <strong>Best practice:</strong> Run clash detection weekly during detailed design.
              Resolve all hard clashes before issuing for construction.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Installation Sequencing and Priorities">
            <p>
              Installation sequence is critical for efficient MEP coordination. The fundamental rule
              is that inflexible services must be installed first, with more flexible services
              working around them. Getting the sequence wrong leads to costly rework and delays.
            </p>
            <p>
              <strong>Standard Ceiling Void Installation Sequence:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Drainage (gravity-fed):</strong> Cannot be rerouted, requires specific
                falls
              </li>
              <li>
                <strong>2. Large ductwork (main supply/extract):</strong> Inflexible due to size
              </li>
              <li>
                <strong>3. Sprinkler mains and branches:</strong> Needs ceiling penetration positions
              </li>
              <li>
                <strong>4. Pipework (heating/chilled water):</strong> Can route around fixed services
              </li>
              <li>
                <strong>5. Electrical containment (main trays):</strong> Flexible routing possible
              </li>
              <li>
                <strong>6. Small ductwork (FCU connections):</strong> Final HVAC connections
              </li>
              <li>
                <strong>7. Data/comms containment:</strong> Needs separation from power
              </li>
              <li>
                <strong>8. Final fix (cables, sensors, diffusers):</strong> After ceiling grid
              </li>
            </ul>
            <p>
              <strong>Service Priority Rules (Priority — Service — Reason):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1 (Highest):</strong> Gravity drainage — Fixed falls, cannot be rerouted
              </li>
              <li>
                <strong>2:</strong> Large ductwork (&gt;400mm) — Size makes rerouting impractical
              </li>
              <li>
                <strong>3:</strong> Sprinkler systems — Fixed head positions to ceiling
              </li>
              <li>
                <strong>4:</strong> Pipework — Some flexibility with offsets
              </li>
              <li>
                <strong>5:</strong> Electrical containment — Highly flexible routing
              </li>
              <li>
                <strong>6 (Lowest):</strong> Data/security cabling — Most flexible, last to install
              </li>
            </ul>
            <p>
              <strong>Real-World Example — Hospital Corridor:</strong> A hospital corridor has 600mm
              ceiling void depth. Services required:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>100mm soil pipe with 1:40 fall (100mm + fall = ~150mm zone)</li>
              <li>400mm x 300mm supply duct</li>
              <li>Sprinkler pipework (50mm diameter)</li>
              <li>Medical gas pipework (22mm copper)</li>
              <li>Electrical containment (150mm tray)</li>
              <li>Data cabling (basket tray)</li>
              <li>
                <strong>Solution:</strong> Soil pipe at highest level (for fall), duct below,
                sprinkler/pipework mid-level, electrical low level with data below. Cross-overs
                coordinated at specific points.
              </li>
            </ul>
            <p>
              <strong>Remember:</strong> The contractor who installs last often makes the most
              adjustments. Ensure your installation slot in the programme reflects your service
              priority.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Coordination Drawings and Interface Management">
            <p>
              Coordination drawings are the definitive record of agreed service routes. They combine
              all MEP services on single drawings showing how conflicts have been resolved.
              Interface management ensures clear responsibility boundaries between contractors at
              connection points.
            </p>
            <p>
              <strong>Coordination Drawing Requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Combined plans:</strong> All services overlaid with clear identification
              </li>
              <li>
                <strong>Service levels:</strong> Heights shown as offsets from FFL (e.g., +2850 to
                soffit)
              </li>
              <li>
                <strong>Cross-sections:</strong> Critical congested areas shown in section
              </li>
              <li>
                <strong>Colour coding:</strong> Orange = electrical, blue = HVAC, green = pipework,
                red = fire
              </li>
              <li>
                <strong>Service zones:</strong> Defined corridors for each service type
              </li>
              <li>
                <strong>Sign-off boxes:</strong> All relevant trades to approve
              </li>
            </ul>
            <p>
              <strong>Service Zone Allocation Example —</strong> Ceiling void depth: 600mm (FFL
              +3000 to structure +3600). Zone allocation (from structure down):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>+3600 to +3450: Drainage zone (150mm)</li>
              <li>+3450 to +3150: Ductwork zone (300mm)</li>
              <li>+3150 to +3050: Pipework zone (100mm)</li>
              <li>+3050 to +3000: Electrical/data zone (50mm + ceiling)</li>
              <li>Cross-overs only at designated points</li>
            </ul>
            <p>
              <strong>Interface Management Matrix (Interface Point — Responsibility A — Responsibility B):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>FCU electrical connection:</strong> Electrical: cable to isolator —
                Mechanical: isolator to FCU
              </li>
              <li>
                <strong>Distribution board supply:</strong> Electrical: supply cable — Mechanical:
                builder's work box
              </li>
              <li>
                <strong>Fire alarm detector:</strong> Fire: detector and cable — Ceiling: access
                provision
              </li>
              <li>
                <strong>BMS sensor:</strong> Controls: sensor and cable — Mechanical: duct
                penetration
              </li>
            </ul>
            <p>
              <strong>Coordination Meeting Process:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Review:</strong> Examine clash report from latest BIM coordination
              </li>
              <li>
                <strong>Resolve:</strong> Agree solutions for each clash with responsible party
              </li>
              <li>
                <strong>Update:</strong> All parties update their models to reflect agreements
              </li>
              <li>
                <strong>Verify:</strong> Re-run clash detection to confirm resolution
              </li>
              <li>
                <strong>Issue:</strong> Publish updated coordination drawings
              </li>
              <li>
                <strong>Record:</strong> Document decisions in meeting minutes
              </li>
            </ul>
            <p>
              <strong>Documentation tip:</strong> All coordination decisions must be recorded. If
              it's not documented, it didn't happen — and will likely cause disputes later.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Ceiling Void Clash Resolution:</strong> A 450mm supply duct
              clashes with a 150mm electrical cable tray at the same level (+3200).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Priority assessment — Ductwork: Priority 2 (large, inflexible)</li>
              <li>Cable tray: Priority 5 (flexible routing)</li>
              <li>Resolution: Duct maintains level at +3200</li>
              <li>Cable tray drops to +3050 for 2m either side of crossing</li>
              <li>Transition pieces at drop points</li>
              <li>
                <strong>Result:</strong> Electrical contractor makes adjustment.
              </li>
            </ul>
            <p>
              <strong>Example 2 — Riser Coordination:</strong> 2m x 1.5m electrical riser must
              accommodate main cables, distribution boards, and metering.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Distribution boards: 750mm clear working space (BS 7671)</li>
              <li>Meters: visible and accessible from door</li>
              <li>Main cables: pulling access at each floor</li>
              <li>Layout solution: boards on wall opposite door (access from doorway)</li>
              <li>Meters adjacent to door on side wall</li>
              <li>Cable ladder on wall beside boards</li>
              <li>Fire stopping at each floor penetration</li>
              <li>
                <strong>Key:</strong> Accessibility drives layout, not just space.
              </li>
            </ul>
            <p>
              <strong>Example 3 — Plant Room Installation Sequence:</strong> Plan installation
              sequence for a basement plant room with chillers, pumps, switchgear, and controls.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Week 1-2: Builder's work complete (plinths, penetrations)</li>
              <li>Week 3-4: Major plant delivery (chillers, AHUs)</li>
              <li>Week 5-6: Pipework first fix (headers, main runs)</li>
              <li>Week 7-8: Ductwork connections to plant</li>
              <li>Week 9-10: Electrical containment and main cables</li>
              <li>Week 11-12: Switchgear installation and terminations</li>
              <li>Week 13-14: Controls wiring and BMS</li>
              <li>Week 15-16: Commissioning preparation</li>
              <li>
                <strong>Critical:</strong> Switchgear energised before mechanical commissioning.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Coordination checklist for electrical contractors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Attend all coordination meetings - decisions made without you affect you</li>
              <li>Provide accurate 3D models at correct LOD for clash detection</li>
              <li>Include cable tray with cables, not empty containment</li>
              <li>Show 150mm access clearance above containment</li>
              <li>Mark distribution board locations early - they drive containment routes</li>
              <li>Coordinate ceiling penetrations with ceiling contractor</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Maintenance access clearance: <strong>150mm minimum</strong>
              </li>
              <li>
                Working space at distribution boards: <strong>750mm</strong>
              </li>
              <li>
                BIM LOD for coordination: <strong>LOD 300 minimum</strong>
              </li>
              <li>
                Drainage fall: <strong>1:40 to 1:80</strong> (25-12.5mm per metre)
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Not attending coordination meetings</strong> — Decisions are made; your
                  work gets rerouted
                </li>
                <li>
                  <strong>Installing before coordination is complete</strong> — Expensive rework
                </li>
                <li>
                  <strong>Ignoring soft clashes</strong> — Creates maintenance problems for building
                  life
                </li>
                <li>
                  <strong>Not documenting changes</strong> — Leads to payment disputes and as-built
                  errors
                </li>
              </ul>
            }
            doInstead="Attend every coordination meeting, complete coordination before installation begins, treat soft clashes as seriously as hard clashes, and document every routing decision for the as-built record."
          />

          <SectionRule />

          <Scenario
            title="Clash discovered after structural openings cast in concrete"
            situation={
              <>
                You are managing a hospital MEP package. The mechanical contractor installs the AHU plant before electrical containment is coordinated. When the electrical sub arrives to install the LV riser, the busbar route clashes with a primary ductwork run that is already insulated and fixed. The structural slab penetration was sized for the original electrical route only.
              </>
            }
            whatToDo={
              <>
                Stop the works. Issue a coordination NCR. Convene a clash-resolution meeting with structural, mechanical, electrical and the architect. Use the federated BIM model to identify three options: relocate busbar (added cost, no programme impact), break out and re-form penetration (cost and programme impact), or oversize busbar enclosure (commercial impact). Cost and programme each option, present to client, agree mitigation. Update coordination drawings and re-issue.
              </>
            }
            whyItMatters={
              <>
                Coordination clashes discovered on site cost 10–100× more than the same clash resolved on a model. The contractor that installed first and "moved on" usually owns the cost — but the programme hit is shared by everyone. Discipline at coordination stage protects the entire project.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Install priority by physical hierarchy: drainage → large ductwork → pipework → containment → cabling → ceiling finishes.",
              "BIM Level 2 with federated models and weekly clash detection is the modern standard.",
              "Coordination drawings signed off before any installation begins — install ahead and you own every clash.",
              "Allow zone tolerances: 75–100mm clear between services, 150mm between hot and cold pipes for insulation.",
              "For occupied buildings, point-cloud survey beats as-built drawings every time.",
              "Interface ownership matrix: every service-to-service interface needs a named owner.",
              "Re-coordinate after every design change — small changes cascade into clashes downstream.",
              "ISO 19650-2 provides the contractual framework when BIM Level 2 is in the EIR.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section1-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Risk management
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Procurement and contracts
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section1_6;
