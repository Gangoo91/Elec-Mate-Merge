import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  BookOpen,
  Zap,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  ClipboardCheck,
  Eye,
  Grid2x2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/electrical-design-guide' },
  { label: 'How to Read Wiring Diagrams', href: '/how-to-read-wiring-diagram' },
];

const tocItems = [
  { id: 'types-of-diagrams', label: 'Types of Electrical Diagrams' },
  { id: 'iec-vs-bs', label: 'IEC vs BS Symbols' },
  { id: 'common-symbols', label: 'Common Symbols Explained' },
  { id: 'circuit-diagrams', label: 'Reading Circuit Diagrams' },
  { id: 'wiring-diagrams', label: 'Reading Wiring Diagrams' },
  { id: 'single-line', label: 'Reading Single-Line Diagrams' },
  { id: 'three-phase', label: 'Reading Three-Phase Diagrams' },
  { id: 'practical-tips', label: 'Practical Reading Tips' },
  { id: 'for-electricians', label: 'For Electricians: Diagrams and Certification' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'There are three main types of electrical diagram used in the UK: schematic (circuit) diagrams showing how components are connected electrically, wiring diagrams showing physical connections between components, and single-line (one-line) diagrams used for power distribution systems.',
  'The UK traditionally uses BS symbols derived from BS EN 60617 (now aligned with IEC 60617). Most modern UK electrical drawings use IEC symbols, which are the international standard. Both symbol sets appear on UK drawings, and electricians need to recognise both.',
  'A single-line diagram (SLD) represents three-phase power systems using a single line per phase for clarity. It shows the distribution hierarchy from supply to load, protective devices, transformer ratings, and bus arrangements. SLDs are essential for commercial and industrial electrical work.',
  'Reading a wiring diagram requires identifying the supply point, tracing the circuit from supply through the protective device to the load, identifying switching arrangements, and noting the conductor colours and sizes specified.',
  'Three-phase diagrams show all three phases and neutral (and sometimes earth). Understanding star (Y) and delta connections, phase labelling (L1, L2, L3), and how three-phase loads are distributed across phases is essential for commercial and industrial work.',
];

const faqs = [
  {
    question: 'What is the difference between a schematic diagram and a wiring diagram?',
    answer:
      'A schematic diagram (also called a circuit diagram) shows the electrical connections between components using standardised symbols, without regard to the physical location or appearance of the components. It shows how the circuit works electrically. A wiring diagram shows the physical connections between components — where wires go, which terminals they connect to, and the physical layout of components. Wiring diagrams are used for installation and maintenance, while schematic diagrams are used for understanding circuit function and fault-finding.',
  },
  {
    question: 'What electrical symbols do UK drawings use?',
    answer:
      'UK electrical drawings use symbols based on BS EN 60617, which is the British adoption of the IEC 60617 international standard. In practice, most modern UK electrical drawings use IEC symbols, which are the same standard. Older UK drawings may use legacy BS symbols that differ from IEC equivalents. The IET Wiring Regulations (BS 7671) reference IEC 60617 for circuit symbols. Where drawings use non-standard symbols, a symbol legend (key) should always be provided.',
  },
  {
    question: 'What is a single-line diagram and when is it used?',
    answer:
      'A single-line diagram (SLD), also called a one-line diagram, represents a three-phase electrical distribution system using a single line to represent all three phases, for the sake of clarity. SLDs show the hierarchy of the distribution system — from the incoming supply (DNO cutout or transformer) through the main switchboard to sub-distribution boards and final circuit protective devices. SLDs are used extensively for commercial buildings, industrial facilities, and infrastructure projects. They show circuit breaker ratings, transformer ratings, cable sizes, and protection coordination without the complexity of showing all three phases separately.',
  },
  {
    question: 'How do I identify phases on a three-phase diagram?',
    answer:
      'In the UK, three-phase conductors are labelled L1, L2, and L3 (replacing the old red, yellow, and blue colour coding, which was changed in 2004 to align with European harmonised colours). On diagrams, phases may also be shown as R, S, T (older convention) or A, B, C (American convention on some imported equipment). The neutral conductor is labelled N and the protective earth conductor is labelled PE. Combined neutral and earth conductors (PEN conductors, used in TN-C systems) are labelled PEN. Always check the diagram\'s legend to confirm the labelling convention used.',
  },
  {
    question: 'What does a star connection look like on a wiring diagram?',
    answer:
      'A star (Y) connection shows three load components or windings connected at one end to a common neutral point, with the other end of each connected to a phase conductor (L1, L2, L3). The neutral point may or may not be connected to the system neutral, depending on the system configuration. On a diagram, star connections are often represented by the letter Y or a Y-shaped symbol. Balanced star loads draw equal current from each phase. Unbalanced star loads (common in building services) result in neutral current.',
  },
  {
    question: 'How do I read relay and contactor diagrams?',
    answer:
      'Relay and contactor control circuit diagrams typically show the coil and contacts separately. The coil is the element that energises when current flows; the contacts are shown elsewhere in the circuit, controlled by the coil. Normally open (NO) contacts are shown as a gap between two lines — they open the circuit until the coil is energised. Normally closed (NC) contacts are shown with a diagonal line across the contact gap — they close the circuit and open when the coil is energised. Each contact symbol is labelled with the relay or contactor reference (e.g., K1) to link it back to its coil.',
  },
  {
    question: 'Why do some wiring diagrams show conductors in different colours?',
    answer:
      'Conductor colours on wiring diagrams represent the harmonised cable core colours specified in BS 7671 and IEC 60446. In the UK: brown = line/phase L1, black = line/phase L2, grey = line/phase L3, blue = neutral, green-and-yellow = protective earth. On older drawings, the pre-2004 UK colours may be shown: red = phase, black = neutral, green-and-yellow = earth. Diagrams using non-standard colours should have a colour legend. When connecting to equipment with conductors marked in non-harmonised colours, confirm polarity using a test instrument — never rely on colour alone where there is any ambiguity.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrical-design-guide',
    title: 'Electrical Design Guide',
    description: 'Principles of electrical system design, load assessment, diversity, and cable sizing.',
    icon: BookOpen,
    category: 'Technical Guide',
  },
  {
    href: '/single-phase-vs-three-phase',
    title: 'Single Phase vs Three Phase',
    description: 'Differences between single-phase and three-phase supplies, when each is required, and upgrade costs.',
    icon: Zap,
    category: 'Technical Guide',
  },
  {
    href: '/continuity-testing-r1-r2',
    title: 'Continuity Testing R1+R2',
    description: 'How to measure R1+R2 values, interpret results, and use test data in the schedule of test results.',
    icon: ClipboardCheck,
    category: 'Technical Guide',
  },
  {
    href: '/transformer-installation-guide',
    title: 'Transformer Installation Guide',
    description: 'Specifying, installing, and commissioning distribution transformers in commercial installations.',
    icon: Grid2x2,
    category: 'Technical Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'types-of-diagrams',
    heading: 'Types of Electrical Diagram: Schematic, Wiring, and Single-Line',
    content: (
      <>
        <p>
          Understanding the difference between types of electrical diagram is the first step
          to reading them confidently. Each type serves a different purpose and is used in
          different contexts.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Schematic diagram (circuit diagram)</strong> — shows how components
                are connected electrically, using standardised symbols. Does not show
                physical layout. Used for understanding circuit operation and for fault-finding.
                Components are represented by symbols, not their physical appearance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiring diagram</strong> — shows the physical connections between
                components, including which terminals wires connect to, cable routes, and
                sometimes the physical location of components. Used for installation
                and maintenance. More practical but less clear than schematics for
                understanding circuit logic.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single-line diagram (SLD)</strong> — represents three-phase power
                distribution systems using one line per circuit for clarity. Shows the full
                distribution hierarchy from incoming supply through switchboards to final
                circuits. Used in commercial and industrial electrical engineering.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Block diagram</strong> — shows the functional blocks of a system
                and how they relate to each other, without detailed component or connection
                information. Used for system overviews and communication with non-technical
                stakeholders.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'iec-vs-bs',
    heading: 'IEC Symbols vs BS Symbols: Which Standard Applies?',
    content: (
      <>
        <p>
          UK electrical drawings use symbols from two overlapping standards. Understanding
          which applies and how they relate prevents confusion when reading older or
          internationally produced drawings.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IEC 60617 (current standard)</strong> — the International
                Electrotechnical Commission standard for graphical symbols for electrical
                diagrams. The UK adopted this as BS EN 60617. Modern UK electrical drawings
                use IEC 60617 symbols. This is what you will encounter on current drawings
                from UK and international engineers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Legacy BS symbols</strong> — older UK drawings (pre-2000s) may use
                BS 3939 symbols, which differ from IEC 60617 in some respects. The most
                commonly encountered differences are in switch and relay symbols, motor
                representations, and transformer winding notation. When reading older
                drawings, check for a legend.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Always check the drawing legend</strong> — any drawing that uses
                non-standard or project-specific symbols should include a symbol legend.
                If no legend is provided, assume IEC 60617 for modern drawings and
                BS 3939 for older ones. When in doubt, clarify with the designer.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-symbols',
    heading: 'Common Electrical Symbols Explained',
    content: (
      <>
        <p>
          The following are the most frequently encountered symbols on UK electrical drawings,
          based on IEC 60617 / BS EN 60617.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switch (single-pole)</strong> — a line with a diagonal break, typically
                with a small arc or angle. The diagonal indicates the switch can break the
                circuit. A two-pole switch has two of these in parallel, connected by a
                dashed line (indicating they operate together).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit breaker (MCB)</strong> — a rectangle with a diagonal line
                inside (or in some conventions, the standard switch symbol with a specific
                annotation). On SLDs, circuit breakers are shown as a square with a diagonal
                break, sometimes with the rating annotated (e.g., &quot;32A B-type&quot;).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transformer</strong> — two circles side by side (representing the
                primary and secondary windings) connected to the circuit. Star and delta
                connections are indicated by Y and triangle symbols respectively. Transformer
                ratios (e.g., 11kV/415V) are typically annotated alongside.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Motor</strong> — a circle with the letter M inside. Three-phase motors
                typically show three input lines. DC motors may show a circle with M and
                arrows indicating direction of rotation. The motor rating (kW) and supply
                voltage are usually annotated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Relay coil</strong> — a rectangle or circle labelled with the
                relay reference (e.g., K1, CR1). The coil is the electromagnetic component
                that operates when energised. Relay contacts (controlled by the coil) are
                shown separately in the circuit, linked by the same reference.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fuse</strong> — a rectangle with a line through it (sometimes shown
                as a small rectangle or diamond). The fuse rating is annotated. BS 88 HRC
                fuses, BS 1361 fuses, and BS 3036 rewirable fuses all use the same generic
                symbol but may be annotated differently.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth symbol</strong> — three horizontal lines of decreasing length,
                stacked vertically (or sometimes a single vertical line terminating in
                three shorter lines). The protective earth (PE) symbol is connected to all
                exposed conductive parts and metalwork.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'circuit-diagrams',
    heading: 'Reading Circuit (Schematic) Diagrams',
    content: (
      <>
        <p>
          A circuit diagram shows the electrical path from supply to load. Reading it
          systematically, from supply through protective device to load and back to supply,
          is the most reliable approach.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1: Identify the supply</strong> — find the supply terminals
                (usually at the top or left of the diagram). Note the voltage and frequency.
                On a control circuit, this may be a 230V supply or a stepped-down 24V or
                12V supply from a control transformer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2: Identify protective devices</strong> — fuses, MCBs, or
                RCBOs in series with the circuit. Note their ratings. These define the
                maximum current the circuit can safely carry.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3: Trace the current path</strong> — follow the line from supply
                through the protective device, through any switching devices, through the
                load component, and back to the neutral or return. Identify all series and
                parallel elements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4: Identify control elements</strong> — switches, relays, and
                contactors that control when the load operates. On control circuits, a series
                of normally open and normally closed contacts creates logic conditions
                that must all be satisfied before the load can operate.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'wiring-diagrams',
    heading: 'Reading Wiring Diagrams',
    content: (
      <>
        <p>
          A wiring diagram shows which physical terminals are connected to which conductors.
          It is the most directly useful diagram type for installation and fault-finding on site.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Terminal numbering</strong> — terminals on components are numbered
                or lettered in the wiring diagram. Wire references (e.g., W1, W2, or using
                a wire numbering system) link the terminal on one component to the terminal
                on another. Follow the wire reference to find where it goes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable references</strong> — cables are typically labelled with a
                reference (e.g., C1, C2) that matches the cable schedule. The cable schedule
                specifies the cable type, size, core colours, and length. Cross-reference
                the wiring diagram with the cable schedule for full information.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multi-core cable representation</strong> — a thick line with a number
                indicating the number of conductors (e.g., a line with &quot;4c&quot; means a
                4-core cable). Individual cores within the cable may be shown branching from
                the main line to their respective terminals.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'single-line',
    heading: 'Reading Single-Line Diagrams (SLDs)',
    content: (
      <>
        <p>
          Single-line diagrams (SLDs) are the primary tool for communicating the structure
          of a power distribution system. They are used in commercial buildings, industrial
          facilities, data centres, and any installation with a distribution hierarchy more
          complex than a simple domestic consumer unit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Read from top to bottom</strong> — SLDs typically show the incoming
                supply at the top (DNO cutout, transformer, or site incoming point) and
                cascade downward through the distribution hierarchy to final circuits and
                loads. The &quot;parent&quot; board is above its &quot;child&quot; sub-boards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Busbar representation</strong> — horizontal lines represent busbars
                (copper bars distributing supply to multiple circuit breakers). The main
                LV busbar in a switchboard is shown as a thick horizontal line with circuit
                breakers connecting to it vertically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protective device ratings</strong> — each circuit breaker, fuse, or
                switch on the SLD is annotated with its rating (e.g., &quot;400A 4P ACB&quot; for
                a 400-amp 4-pole air circuit breaker). Cable sizes between boards are also
                annotated (e.g., &quot;4 x 240mm CWA SWA&quot;).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transformer representation</strong> — on SLDs, transformers are shown
                as two circles side by side with winding notation (e.g., Dyn11 for delta
                primary, star secondary, 11 o&apos;clock vector group). The primary and secondary
                voltages and transformer rating (kVA) are annotated.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The{' '}
          <SEOInternalLink href="/electrical-design-guide">
            electrical design guide
          </SEOInternalLink>{' '}
          covers SLD production and interpretation in more detail for those working in
          commercial electrical design.
        </p>
      </>
    ),
  },
  {
    id: 'three-phase',
    heading: 'Reading Three-Phase Electrical Diagrams',
    content: (
      <>
        <p>
          Three-phase diagrams show all three phase conductors, neutral (if present), and
          earth. They are used for motor starters, three-phase distribution boards, and
          three-phase load connections.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Phase labelling</strong> — UK drawings label phases L1, L2, L3 (or
                the older R, Y, B using red, yellow, blue colours). On three-phase diagrams
                from European manufacturers, phases may be labelled L1, L2, L3 or 1, 2, 3.
                American-convention drawings may label phases A, B, C. Always check the legend.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Star (Y) connection</strong> — three loads or windings connected at
                a common neutral point. Each load connects between a phase conductor and neutral.
                Phase voltage (230V in a 400V system) is applied across each load. Used in
                balanced and unbalanced resistive and inductive loads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Delta connection</strong> — three loads connected in a closed triangle
                between phase conductors (no neutral connection). Line voltage (400V in a 400V
                system) is applied across each load. Used in three-phase motors and transformers.
                Higher current per winding than star configuration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Star-delta starter</strong> — a common three-phase motor starting
                arrangement. The motor starts in star (reduced voltage across each winding,
                lower starting current) and is automatically switched to delta after a set
                time (full voltage, full power). Shown on diagrams as two contactors (K2 star,
                K3 delta) plus the main contactor (K1).
              </span>
            </li>
          </ul>
        </div>
        <p>
          The{' '}
          <SEOInternalLink href="/single-phase-vs-three-phase">
            single phase vs three phase guide
          </SEOInternalLink>{' '}
          explains the practical difference between supply types and when three-phase
          is required for UK installations.
        </p>
      </>
    ),
  },
  {
    id: 'practical-tips',
    heading: 'Practical Tips for Reading Electrical Drawings on Site',
    content: (
      <>
        <p>
          Reading electrical drawings on site in a practical installation context requires
          a different approach to reading them at a desk. The following habits save time
          and reduce errors.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Start with the drawing schedule</strong> — a drawing schedule lists
                all drawings in the package and their revision status. Always confirm you have
                the current revision of each drawing before working to it. Installing to
                a superseded drawing is a common cause of rework.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cross-reference SLD to board schedule</strong> — the SLD gives the
                big picture; the board schedule gives the detail (circuit numbers, protective
                device ratings, cable sizes, load descriptions). Read both together.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mark up drawings as you work</strong> — use a pencil or marked-up
                PDF to record what you have installed, connections made, and any deviations
                from the drawing. Your mark-ups form the basis of as-fitted (red line) drawings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Always verify with instruments</strong> — never assume a circuit is
                correct based on the drawing alone. Use a multifunction tester to verify
                polarity, continuity, and insulation resistance after installation. Drawings
                can contain errors, and site conditions can deviate from design.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Diagrams, Testing, and Certification',
    content: (
      <>
        <p>
          The ability to read and work from electrical diagrams is a core competency for
          any qualified electrician. It underpins accurate installation, effective
          fault-finding, and complete certification.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Record Your Circuits Accurately</h4>
                <p className="text-white text-sm leading-relaxed">
                  After installation, the circuit details from your drawing feed directly into
                  your test documentation and certificate. Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certificate app
                  </SEOInternalLink>{' '}
                  to enter circuit information, test results, and board details on your phone
                  before you leave site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <BookOpen className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Study Centre for Electrical Theory</h4>
                <p className="text-white text-sm leading-relaxed">
                  Elec-Mate&apos;s Study Centre includes modules on electrical theory, BS 7671
                  regulations, and test and inspection — all designed for electricians in the
                  trade. Access it alongside your practical work to build your technical knowledge.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Certify your installation work with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EIC and EICR completion, AI board scanning, and instant PDF certificates. 7-day free trial."
          icon={Zap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HowToReadWiringDiagramPage() {
  return (
    <GuideTemplate
      title="How to Read a Wiring Diagram | UK Electrical Drawing Guide 2026"
      description="How to read electrical wiring diagrams, circuit diagrams, and single-line diagrams. IEC vs BS symbols, common symbols (switches, motors, transformers, relays), reading SLDs, three-phase diagrams, and practical tips for UK electricians."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Technical Guide"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          How to Read a Wiring Diagram:{' '}
          <span className="text-yellow-400">Symbols, Single-Line Diagrams and Three-Phase Explained</span>
        </>
      }
      heroSubtitle="Understanding electrical wiring diagrams is a core skill for any electrician or electrical engineer. This guide explains the difference between schematic, wiring, and single-line diagrams; IEC vs BS symbol sets; common symbols for switches, motors, transformers, and relays; how to read single-line and three-phase diagrams; and practical tips for working from drawings on site."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Reading Electrical Diagrams"
      relatedPages={relatedPages}
      ctaHeading="Complete Electrical Certificates with Elec-Mate"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EIC and EICR completion, AI board scanning, and instant PDF export. 7-day free trial."
    />
  );
}
