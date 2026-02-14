import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileText,
  Zap,
  Calculator,
  ClipboardCheck,
  GraduationCap,
  Brain,
  BookOpen,
  Layers,
  CircuitBoard,
  PenTool,
  ShieldCheck,
  Search,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Reading Drawings', href: '/guides/how-to-read-electrical-drawings' },
];

const tocItems = [
  { id: 'why-read-drawings', label: 'Why Reading Drawings Matters' },
  { id: 'types-of-drawings', label: 'Types of Electrical Drawings' },
  { id: 'bs-en-60617-symbols', label: 'BS EN 60617 Symbols' },
  { id: 'single-line-diagrams', label: 'Single-Line Diagrams' },
  { id: 'wiring-diagrams', label: 'Wiring Diagrams' },
  { id: 'schematic-diagrams', label: 'Schematic Diagrams' },
  { id: 'common-symbols-reference', label: 'Common Symbols Reference' },
  { id: 'reading-tips', label: 'Practical Reading Tips' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS EN 60617 is the international standard for graphical symbols on electrical drawings — knowing these symbols is essential for every UK electrician.',
  'Single-line (one-line) diagrams show the overall system layout in simplified form and are the most common drawing type you will encounter on site.',
  'Wiring diagrams show the physical connections between components and are used for installation, while schematic diagrams show the logical circuit operation.',
  'Reading drawings is a mandatory part of the Level 2 and Level 3 electrical qualifications and features heavily in the AM2 practical assessment.',
  'Elec-Mate includes a symbol reference library and AI-powered drawing interpretation to help you understand unfamiliar diagrams on site.',
];

const faqs = [
  {
    question: 'What is BS EN 60617 and why is it important?',
    answer:
      'BS EN 60617 is the international standard (adopted in the UK as a British Standard) for graphical symbols used on electrical and electronic diagrams. It provides a standardised set of symbols that engineers, designers, and electricians use to communicate circuit designs without ambiguity. Before this standard existed, different manufacturers, contractors, and countries used different symbols for the same components, leading to confusion and errors on site. Today, BS EN 60617 symbols appear on every circuit diagram, control panel schematic, and distribution board layout you will encounter in UK electrical work. Learning these symbols is a fundamental requirement for Level 2 and Level 3 electrical qualifications.',
  },
  {
    question: 'What is the difference between a single-line diagram and a wiring diagram?',
    answer:
      'A single-line diagram (also called a one-line diagram) is a simplified representation of an electrical system that uses single lines to represent three-phase conductors and standard symbols to represent components. It shows the overall system layout — the supply, distribution boards, protective devices, and major loads — without showing the detailed wiring connections. It is used for understanding the system architecture and for planning work. A wiring diagram, by contrast, shows every individual conductor, every terminal, and every physical connection. It is used for the actual installation work — running cables, making connections, and verifying that the wiring matches the design. Think of the single-line diagram as the map and the wiring diagram as the turn-by-turn directions.',
  },
  {
    question: 'What is a schematic diagram used for?',
    answer:
      'A schematic diagram (also called a circuit diagram or logic diagram) shows how a circuit works logically, without representing the physical layout or wiring. Components are drawn in a way that makes the circuit operation easy to understand — for example, a motor starter circuit might show the contactor coil, overload relay, start and stop buttons, and auxiliary contacts in a clear ladder format. Schematic diagrams are essential for fault-finding, especially on control circuits, motor starters, and automation systems. They tell you what should happen when a button is pressed or a sensor is activated, which helps you identify where a fault lies in the logical chain.',
  },
  {
    question: 'What are the most common electrical symbols I need to know?',
    answer:
      'The most common BS EN 60617 symbols you will encounter in UK domestic and commercial work include: a circle with an X inside for a luminaire (light fitting), two parallel vertical lines for a switch, a zigzag line for a resistor, a rectangle for a fuse, MCB symbols showing the tripping characteristic, RCD symbols with the test button, socket outlet symbols (single and double), distribution board symbols, motor symbols, transformer symbols, earth symbols (three horizontal lines decreasing in size), and cable route designations. Control circuit work adds contactor coils, relay contacts (normally open and normally closed), timer contacts, and sensor symbols. Most electricians memorise the 30 to 50 most common symbols through repeated exposure during training and on site.',
  },
  {
    question: 'How do I read a distribution board schedule?',
    answer:
      'A distribution board schedule is a table that lists every circuit connected to the board. Each row represents one circuit and typically includes: the circuit number, the circuit description (e.g., "Kitchen sockets", "Upstairs lighting"), the protective device type and rating (e.g., "32A Type B MCB", "16A RCBO"), the cable size and type (e.g., "2.5mm2 T+E"), the design current, the maximum Zs value, and any test results from the most recent inspection. Reading the schedule tells you what each circuit feeds, how it is protected, and what cable is used. This information is essential for testing (you need to know the expected Zs values), fault-finding (you need to identify which circuit serves a particular area), and alterations (you need to confirm the existing protection and cable ratings before adding loads).',
  },
  {
    question: 'Are electrical drawing skills tested in the AM2?',
    answer:
      'Yes. The AM2 practical assessment includes tasks that require you to read and interpret electrical drawings. You will be given a set of drawings — typically including a layout drawing, a wiring diagram, and a schedule — and you must install the circuit exactly as specified. This tests your ability to translate a drawing into a physical installation, including correct cable routes, connections, and protective device settings. You may also be asked to identify symbols, interpret a control circuit schematic, or complete a circuit diagram. The AM2 is the gateway to becoming a qualified electrician and joining a competent person scheme, so drawing interpretation skills are non-negotiable.',
  },
  {
    question: 'How does Elec-Mate help with understanding electrical drawings?',
    answer:
      'Elec-Mate includes a BS EN 60617 symbol reference library that you can search on site when you encounter an unfamiliar symbol. The 8 Elec-AI agents can also interpret and explain circuit diagrams — you can describe a circuit or upload a drawing and the AI will explain what the circuit does, identify the components, and highlight any potential issues. For apprentices, the Level 2 and Level 3 courses on the platform include dedicated modules on electrical drawing interpretation, with interactive exercises and practice diagrams. The AI board scanner also creates a digital representation of the consumer unit layout from a photograph, effectively generating a distribution board schedule automatically.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/bs7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Complete guide to BS 7671:2018+A3:2024 — the 18th Edition wiring regulations.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description: 'Everything you need to know about becoming an electrical apprentice in the UK.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/am2-exam-tips',
    title: 'AM2 Exam Tips',
    description:
      'Practical tips and preparation strategies for passing the AM2 assessment first time.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Calculate correct cable sizes using BS 7671 correction factors and tabulated current ratings.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Current regulations for consumer units including Amendment 3 and AFDD requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description: 'The correct order for dead and live testing as required by BS 7671 and GN3.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-read-drawings',
    heading: 'Why Reading Electrical Drawings Matters',
    content: (
      <>
        <p>
          Electrical drawings are the language of the industry. Every installation, alteration, and
          repair starts with a drawing that tells the electrician what to build, how to connect it,
          and what protection to provide. If you cannot read drawings, you cannot install correctly,
          you cannot fault-find efficiently, and you cannot verify that an installation matches its
          design.
        </p>
        <p>
          Drawing interpretation is a core competency assessed at every level of the{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
            electrical apprenticeship
          </SEOInternalLink>{' '}
          — from Level 2 through to Level 3 and the{' '}
          <SEOInternalLink href="/guides/am2-exam-tips">AM2 practical assessment</SEOInternalLink>.
          It is also a daily requirement on site: every new installation comes with a set of
          drawings, every control panel has a schematic, and every distribution board has a
          schedule.
        </p>
        <p>
          This guide covers the three main types of electrical drawings (single-line, wiring, and
          schematic), the BS EN 60617 symbol standard, and the most common symbols you will
          encounter in UK domestic and commercial work.
        </p>
      </>
    ),
  },
  {
    id: 'types-of-drawings',
    heading: 'Types of Electrical Drawings',
    content: (
      <>
        <p>
          There are three main types of electrical drawing, each serving a different purpose. A
          typical project may include all three, plus supporting documents such as cable schedules,
          board schedules, and layout drawings.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Single-Line (One-Line) Diagrams</h4>
                <p className="text-white text-sm leading-relaxed">
                  Show the overall system layout in simplified form. A single line represents all
                  conductors in a circuit. Used for system design, planning, and understanding the
                  distribution hierarchy. This is the drawing you look at first on any project.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Wiring Diagrams</h4>
                <p className="text-white text-sm leading-relaxed">
                  Show every individual conductor, terminal, and physical connection. Used for the
                  actual installation — running cables, making connections, and verifying the work
                  matches the design. More detailed than single-line diagrams.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <PenTool className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Schematic (Circuit) Diagrams</h4>
                <p className="text-white text-sm leading-relaxed">
                  Show how a circuit works logically, without representing the physical layout.
                  Essential for fault-finding on control circuits, motor starters, and automation
                  systems. Components are arranged to make the circuit operation clear.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'bs-en-60617-symbols',
    heading: 'BS EN 60617: The Symbol Standard',
    content: (
      <>
        <p>
          BS EN 60617 is the British (and European) adoption of the international standard IEC 60617
          for graphical symbols used on electrical diagrams. It defines a consistent set of symbols
          that every electrician, engineer, and designer uses to communicate without ambiguity.
        </p>
        <p>
          The standard is divided into parts covering different categories of symbols: general
          symbols, qualifying symbols, conductors and connecting devices, passive components,
          semiconductors, measuring instruments, and more. For most electricians, the key parts are:
        </p>
        <div className="space-y-4 my-4">
          {[
            {
              title: 'Part 2: General symbol elements',
              description:
                'Basic shapes and conventions used across all electrical diagrams, including line styles, crossing conventions, and connection indicators.',
            },
            {
              title: 'Part 3: Conductors and connecting devices',
              description:
                'Symbols for cables, busbars, terminals, connectors, plugs, sockets, and junction boxes.',
            },
            {
              title: 'Part 7: Switchgear and controlgear',
              description:
                'Symbols for isolators, circuit breakers, contactors, relays, fuses, MCBs, RCDs, and RCBOs — the components you work with every day.',
            },
            {
              title: 'Part 11: Architectural and topographical installation plans',
              description:
                'Symbols used on building layout drawings — socket outlets, switches, luminaires, distribution boards, and cable routes.',
            },
          ].map((part) => (
            <div
              key={part.title}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-5"
            >
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">{part.title}</h4>
                  <p className="text-white text-sm leading-relaxed">{part.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'single-line-diagrams',
    heading: 'How to Read Single-Line Diagrams',
    content: (
      <>
        <p>
          A single-line diagram is the first drawing you should look at on any project. It gives you
          the big picture — the supply source, the main switchgear, the distribution boards, and the
          major loads. Each line represents a complete circuit (all conductors), and standard
          symbols represent the protective devices and equipment.
        </p>
        <p>
          When reading a single-line diagram, work from the supply point downwards (or left to
          right). Identify the incoming supply, the main switch or isolator, the meter position, the
          main distribution board, any sub-main cables feeding secondary boards, and the final
          circuits. Note the protective device ratings at each level — this tells you the
          discrimination hierarchy.
        </p>
        <p>
          For three-phase systems, the single-line diagram is especially important because it shows
          how loads are distributed across the phases. Look for phase balance — ideally, the load on
          each phase should be roughly equal to avoid neutral overloading and voltage imbalance.
        </p>
        <SEOAppBridge
          title="AI explains unfamiliar circuit diagrams"
          description="Describe a circuit or a symbol to the Elec-AI agent and get an instant explanation of what it does, how it works, and which BS 7671 regulations apply. Like having a senior electrician on call 24/7."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'wiring-diagrams',
    heading: 'How to Read Wiring Diagrams',
    content: (
      <>
        <p>
          Wiring diagrams show every conductor, every terminal, and every physical connection in a
          circuit. They are the instructions you follow when installing, and the reference you use
          when fault-finding. Unlike schematic diagrams, wiring diagrams show the physical
          arrangement of components — where they are located and how the cables run between them.
        </p>
        <p>Key elements to identify on a wiring diagram:</p>
        <div className="space-y-4 my-4">
          {[
            {
              title: 'Terminal identifications',
              description:
                'Every terminal is labelled (L, N, E, or numbered). These labels tell you exactly where each conductor connects. If a terminal is labelled "L1" on the diagram, you connect to the terminal marked "L1" on the actual component.',
            },
            {
              title: 'Cable references',
              description:
                'Each cable is identified by type, size, and often a reference number. For example, "2.5mm2 T+E" or "4mm2 3-core SWA". The cable reference tells you what to install.',
            },
            {
              title: 'Connection indicators',
              description:
                'A filled dot at a junction means the conductors are connected. A crossing without a dot means the conductors cross but are not connected. This distinction is critical for correct installation.',
            },
            {
              title: 'Component positions',
              description:
                'Components are shown in their approximate physical positions. This helps you plan cable routes and understand the physical layout of the installation.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-5"
            >
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-white text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'schematic-diagrams',
    heading: 'How to Read Schematic Diagrams',
    content: (
      <>
        <p>
          Schematic diagrams show how a circuit works, not how it is physically wired. They are
          essential for fault-finding on control circuits, motor starters, lighting control systems,
          and building management systems.
        </p>
        <p>
          The most common format is the ladder diagram, where two vertical supply rails (L and N or
          L1 and L2) form the sides of the ladder, and each horizontal "rung" represents one control
          function. Each rung contains the control devices (buttons, switches, sensors) in series,
          followed by the load (coil, lamp, solenoid) at the end.
        </p>
        <p>
          When fault-finding with a schematic, trace the circuit from the supply through each
          contact and device to the load. If a particular function is not working, identify which
          rung controls that function, then check each component in series along that rung. A
          normally open contact that should be closed, a broken wire, or a faulty coil will break
          the circuit and prevent the function from operating.
        </p>
        <p>
          Understanding schematic diagrams is particularly important for electricians working on
          commercial and industrial installations, where control circuits can be complex.{' '}
          <SEOInternalLink href="/guides/how-to-become-electrician">Apprentices</SEOInternalLink>{' '}
          learn schematic reading as part of the Level 3 qualification, and it is tested in both
          theory exams and the AM2.
        </p>
      </>
    ),
  },
  {
    id: 'common-symbols-reference',
    heading: 'Common Electrical Symbols Quick Reference',
    content: (
      <>
        <p>
          These are the BS EN 60617 symbols you will encounter most often in UK domestic and
          commercial electrical work. Memorising these will allow you to read the majority of
          drawings you see on site.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-sm font-semibold text-white">Component</th>
                  <th className="p-4 text-sm font-semibold text-yellow-400">Symbol Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { component: 'Luminaire (light fitting)', symbol: 'Circle with X inside' },
                  {
                    component: 'Single-pole switch',
                    symbol: 'Two parallel vertical lines on a conductor',
                  },
                  { component: 'Two-way switch', symbol: 'Switch symbol with two throw positions' },
                  { component: 'Socket outlet (single)', symbol: 'Semicircle on a line' },
                  { component: 'Socket outlet (double)', symbol: 'Semicircle with 2 inside' },
                  { component: 'Fuse', symbol: 'Rectangle on a conductor' },
                  { component: 'MCB', symbol: 'Rectangle with tripping characteristic letter' },
                  { component: 'RCD', symbol: 'Rectangle with test button and delta symbol' },
                  {
                    component: 'Earth connection',
                    symbol: 'Three horizontal lines decreasing in size',
                  },
                  { component: 'Motor', symbol: 'Circle with M inside' },
                  { component: 'Transformer', symbol: 'Two coils (inductors) side by side' },
                  { component: 'Contactor coil', symbol: 'Circle with designation (e.g., KM1)' },
                  {
                    component: 'Normally open contact',
                    symbol: 'Two lines with a gap and a diagonal bar',
                  },
                  {
                    component: 'Normally closed contact',
                    symbol: 'Two lines with a diagonal bar and cross',
                  },
                ].map((row, i) => (
                  <tr key={row.component} className={i < 13 ? 'border-b border-white/5' : ''}>
                    <td className="p-4 text-sm text-white">{row.component}</td>
                    <td className="p-4 text-sm text-white">{row.symbol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p>
          Elec-Mate includes a searchable BS EN 60617 symbol reference library. If you encounter an
          unfamiliar symbol on site, open the app and look it up instantly.
        </p>
      </>
    ),
  },
  {
    id: 'reading-tips',
    heading: 'Practical Tips for Reading Drawings on Site',
    content: (
      <>
        <p>
          Reading drawings in a classroom is one thing. Reading them on a building site — often
          crumpled, coffee-stained, and poorly printed — is another. Here are practical tips that
          will help:
        </p>
        <div className="space-y-4 my-4">
          {[
            {
              title: 'Start with the title block',
              description:
                'The title block (usually bottom right) tells you the project name, drawing number, revision, scale, and date. Always check the revision — using an outdated drawing is a common and costly mistake.',
            },
            {
              title: 'Read the legend first',
              description:
                'The legend or key explains any non-standard symbols used on the drawing. Some designers use company-specific symbols or abbreviations that differ from BS EN 60617.',
            },
            {
              title: 'Follow the flow from supply to load',
              description:
                'Start at the incoming supply and trace the circuit through the main switch, distribution board, protective devices, and cables to the final load. This mirrors how the electricity flows and how the protection discrimination works.',
            },
            {
              title: 'Cross-reference with the schedule',
              description:
                'The distribution board schedule lists every circuit with its protective device, cable size, and description. Cross-reference this with the drawing to build a complete picture.',
            },
            {
              title: 'Mark up as you go',
              description:
                'Use a highlighter or coloured pen to mark circuits as you complete them. This prevents you from missing a circuit or wiring the same circuit twice.',
            },
          ].map((tip) => (
            <div key={tip.title} className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">{tip.title}</h4>
                  <p className="text-white text-sm leading-relaxed">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <SEOAppBridge
          title="Ask the AI about any electrical symbol or diagram"
          description="The 8 Elec-AI agents understand BS EN 60617 symbols, circuit diagrams, and control schematics. Describe what you see and get an instant explanation — like having a technical reference library in your pocket."
          icon={Brain}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HowToReadElectricalDrawingsPage() {
  return (
    <GuideTemplate
      title="How to Read Electrical Drawings | Symbols Guide UK"
      description="Learn how to read electrical drawings and diagrams. BS EN 60617 symbols explained, single-line diagrams, wiring diagrams, schematic diagrams, and a common symbols quick reference for UK electricians."
      datePublished="2025-07-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Skills Guide"
      badgeIcon={FileText}
      heroTitle={
        <>
          How to Read <span className="text-yellow-400">Electrical Drawings</span>
        </>
      }
      heroSubtitle="Electrical drawings are the language of the trade. This guide covers the three main types of electrical drawing, the BS EN 60617 symbol standard, and a quick reference of the most common symbols you will encounter in UK domestic and commercial work."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Drawings"
      relatedPages={relatedPages}
      ctaHeading="Master electrical drawings with Elec-Mate"
      ctaSubheading="Symbol reference library, AI-powered diagram interpretation, and apprentice training courses — all built for UK electricians. 7-day free trial, cancel anytime."
    />
  );
}
