import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  Activity,
  Lightbulb,
  Cable,
  Gauge,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Calculator,
  FileCheck2,
  CircuitBoard,
  PlugZap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'How Electricity Works', href: '/guides/how-electricity-works' },
];

const tocItems = [
  { id: 'what-is-electricity', label: 'What Is Electricity?' },
  { id: 'voltage-current-resistance', label: 'Voltage, Current and Resistance' },
  { id: 'ohms-law', label: "Ohm's Law" },
  { id: 'ac-vs-dc', label: 'AC vs DC' },
  { id: 'power-and-energy', label: 'Power and Energy' },
  { id: 'circuits-explained', label: 'Circuits Explained' },
  { id: 'why-it-matters', label: 'Why It Matters for Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Electricity is the flow of electrons through a conductor. Voltage pushes them, current measures how many flow, and resistance opposes the flow.',
  "Ohm's Law (V = I x R) is the single most important formula in electrical work. Every calculation you do on site traces back to it.",
  'The UK mains supply is 230V AC at 50Hz. AC alternates direction 50 times per second, which is why transformers work and why we can transmit power efficiently over long distances.',
  'Power (watts) equals voltage multiplied by current (P = V x I). This is how you size cables, calculate maximum demand, and check whether a circuit can handle the load.',
  'Understanding basic electrical theory is the foundation for every qualification, from Level 2 apprenticeship through to C&G 2391 inspection and testing.',
];

const faqs = [
  {
    question: 'What is the difference between voltage and current?',
    answer:
      'Voltage is the electrical pressure that pushes electrons through a conductor. It is measured in volts (V). Think of it as the force behind the flow. Current is the rate at which electrons actually flow through the conductor, measured in amperes (A). A useful analogy is water in a pipe: voltage is the water pressure, current is the flow rate (litres per second), and resistance is the width of the pipe. You can have high voltage with low current (a static shock) or low voltage with high current (a car battery cranking a starter motor). In UK domestic installations, the supply voltage is 230V AC. The current drawn depends on the load connected — a 3kW kettle draws about 13A, while an LED lamp might draw 0.04A.',
  },
  {
    question: 'Why does the UK use AC instead of DC?',
    answer:
      'The UK mains supply uses alternating current (AC) at 230V and 50Hz because AC can be easily stepped up and down using transformers. Power stations generate electricity at relatively low voltages, step it up to 275kV or 400kV for efficient long-distance transmission (higher voltage means lower current and less energy lost as heat in the cables), and then step it down through a series of substations to the 230V that reaches your home. DC cannot be transformed as easily or cheaply. Thomas Edison championed DC in the early days of electricity, but Nikola Tesla and George Westinghouse demonstrated that AC was far more practical for power distribution. The UK adopted AC as the standard, and it remains so today. DC is still used in specific applications — batteries, solar panels, electronic circuits, and EV charging — but the national grid and domestic supply are AC.',
  },
  {
    question: "What is Ohm's Law and why does it matter on site?",
    answer:
      "Ohm's Law states that voltage (V) equals current (I) multiplied by resistance (R): V = I x R. You can rearrange it to find any of the three values if you know the other two: I = V / R, or R = V / I. On site, this matters constantly. When you measure earth fault loop impedance (Zs), you are measuring resistance in the fault path. The prospective fault current (PFC) is calculated from Ohm's Law: I = V / Zs. If Zs is 0.5 ohms on a 230V circuit, the prospective fault current is 460A. That tells you whether the protective device will disconnect fast enough to protect against electric shock. Every cable sizing calculation, every fault current check, and every protective device selection traces back to Ohm's Law.",
  },
  {
    question: 'What is the difference between power and energy?',
    answer:
      'Power is the rate at which energy is used, measured in watts (W) or kilowatts (kW). Energy is the total amount of power consumed over time, measured in kilowatt-hours (kWh). A 3kW immersion heater running for 2 hours uses 6kWh of energy. A 100W lamp running for 10 hours uses 1kWh. Your electricity meter measures energy in kWh — that is what you pay for. Power matters when sizing circuits: a 32A ring circuit at 230V can deliver a maximum of 7,360W (7.36kW) of power at any instant. Energy matters when calculating running costs and maximum demand over time.',
  },
  {
    question: 'What is the difference between a series circuit and a parallel circuit?',
    answer:
      'In a series circuit, components are connected end to end in a single path. The same current flows through every component, but the voltage is divided between them. If one component fails (opens), the entire circuit stops working — like old-style Christmas tree lights where one blown bulb killed the whole string. In a parallel circuit, components are connected across the supply so each one has the full supply voltage across it. The current divides between the branches. If one component fails, the others continue to work. UK domestic socket circuits (ring finals and radials) connect sockets in parallel so that each socket receives the full 230V and operates independently. Lighting circuits also connect lamps in parallel for the same reason.',
  },
  {
    question: 'How does Elec-Mate help apprentices learn electrical theory?',
    answer:
      "Elec-Mate includes a full Study Centre with structured courses covering Level 2 and Level 3 electrical theory — including Ohm's Law, AC theory, power calculations, circuit types, and BS 7671 regulations. Each topic is broken into short, focused sections with diagrams and worked examples. The AI tutor can answer questions in plain English, test your understanding with practice questions, and explain concepts in different ways until they make sense. Apprentices can study on their phone between jobs, on the train, or during breaks — building knowledge steadily throughout their apprenticeship.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-acronyms-glossary',
    title: 'Electrical Acronyms Glossary',
    description:
      'A-Z reference of every electrical acronym you will encounter — MCB, RCD, RCBO, AFDD, SPD, and more.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/what-is-a-circuit-breaker',
    title: 'What Is a Circuit Breaker?',
    description:
      'How MCBs work, thermal and magnetic trip mechanisms, and the difference between Type B, C, and D.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/what-is-an-rcd',
    title: 'What Is an RCD?',
    description:
      'How residual current devices detect earth leakage and protect against electric shock.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/what-is-earthing',
    title: 'What Is Earthing?',
    description:
      'Why earthing matters, how it provides safety, and the different earthing arrangements in the UK.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete guide to the IET Wiring Regulations — the standard that governs all electrical installation work in the UK.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description:
      'Everything you need to know about becoming an electrician through the apprenticeship route.',
    icon: GraduationCap,
    category: 'Career',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-electricity',
    heading: 'What Is Electricity?',
    content: (
      <>
        <p>
          Electricity is the flow of tiny charged particles called electrons through a conductor —
          typically a copper or aluminium wire. Every atom has electrons orbiting its nucleus. In
          conductive materials like copper, some electrons are loosely bound and can move freely
          from atom to atom. When a voltage (electrical pressure) is applied across a conductor,
          these free electrons drift in one direction, creating an electric current.
        </p>
        <p>
          That is the simplest explanation. In practice, electricity is the energy source that
          powers everything from the lights in your home to the motors in an industrial plant. As an
          electrician, you work with electricity every day — installing the cables that carry it,
          fitting the protective devices that control it, and testing the installations that use it
          safely.
        </p>
        <p>
          To work safely and competently, you need to understand three fundamental quantities:{' '}
          <strong>voltage</strong>, <strong>current</strong>, and <strong>resistance</strong>. These
          three are related by{' '}
          <SEOInternalLink href="/guides/how-electricity-works">Ohm's Law</SEOInternalLink>, and
          every electrical calculation on site comes back to them.
        </p>
      </>
    ),
  },
  {
    id: 'voltage-current-resistance',
    heading: 'Voltage, Current and Resistance',
    content: (
      <>
        <p>
          These are the three pillars of electrical theory. Get these right and everything else
          follows.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Voltage (V) — The Pressure</h4>
                <p className="text-white text-sm leading-relaxed">
                  Voltage is the electrical pressure — the force that pushes electrons through a
                  conductor. It is measured in volts (V). The UK mains supply is 230V. A car battery
                  is 12V. A lightning bolt can be 300 million volts. Voltage is sometimes called
                  electromotive force (EMF) when referring to the source, or potential difference
                  (PD) when measured across a component.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Activity className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Current (I) — The Flow</h4>
                <p className="text-white text-sm leading-relaxed">
                  Current is the rate of flow of electrons, measured in amperes (A). One ampere
                  means approximately 6.24 x 10^18 electrons passing a point every second. A typical
                  UK socket circuit is protected at 32A. A lighting circuit is usually protected at
                  6A. The current drawn depends on the load — plug in a 3kW kettle and the circuit
                  draws about 13A.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Gauge className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Resistance (R) — The Opposition</h4>
                <p className="text-white text-sm leading-relaxed">
                  Resistance opposes the flow of current, measured in ohms (Ω). Every material has
                  some resistance. Copper has very low resistance (good conductor). Rubber has
                  extremely high resistance (good insulator). The resistance of a cable depends on
                  its material, length, and cross-sectional area. Longer cables and thinner cables
                  have more resistance — which is why{' '}
                  <SEOInternalLink href="/guides/cable-sizing-guide-bs7671">
                    cable sizing
                  </SEOInternalLink>{' '}
                  matters.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          The water pipe analogy is useful: voltage is the water pressure, current is the flow rate,
          and resistance is the narrowness of the pipe. Increase the pressure (voltage) and more
          water (current) flows. Narrow the pipe (increase resistance) and less water flows for the
          same pressure.
        </p>
      </>
    ),
  },
  {
    id: 'ohms-law',
    heading: "Ohm's Law: The Most Important Formula in Electrical Work",
    content: (
      <>
        <p>Ohm's Law is the relationship between voltage, current, and resistance. It states:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 text-center">
          <p className="text-2xl font-bold text-yellow-400 mb-2">V = I x R</p>
          <p className="text-white text-sm">Voltage (volts) = Current (amps) x Resistance (ohms)</p>
        </div>
        <p>You can rearrange it to find any value:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>To find current:</strong> I = V / R — if you know the voltage and
                resistance, divide voltage by resistance to get the current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>To find resistance:</strong> R = V / I — if you know the voltage and
                current, divide voltage by current to get the resistance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>To find voltage:</strong> V = I x R — if you know the current and
                resistance, multiply them to get the voltage.
              </span>
            </li>
          </ul>
        </div>
        <p>
          On site, you use Ohm's Law constantly — even if you do not realise it. When you measure
          earth fault loop impedance (Zs) and calculate prospective fault current (PFC), you are
          using I = V / Zs. When you check{' '}
          <SEOInternalLink href="/guides/voltage-drop-guide-bs7671">voltage drop</SEOInternalLink>{' '}
          across a cable run, you are using V = I x R. When you size a cable for a given load, the
          resistance per metre of the conductor matters because of Ohm's Law.
        </p>
        <SEOAppBridge
          title="Electrical calculations on your phone"
          description="Elec-Mate includes built-in calculators for cable sizing, voltage drop, maximum demand, prospective fault current, and more. Enter the values, get the answer — with the working shown and the relevant BS 7671 regulation referenced."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'ac-vs-dc',
    heading: 'AC vs DC: Alternating Current and Direct Current',
    content: (
      <>
        <p>
          There are two types of electrical current: alternating current (AC) and direct current
          (DC). The UK mains supply is AC. Batteries, solar panels, and most electronic devices run
          on DC.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Alternating Current (AC)</h3>
            <p className="text-white text-sm leading-relaxed">
              In AC, the direction of electron flow reverses at regular intervals. The UK supply
              alternates at 50 hertz (Hz), meaning the current changes direction 50 times per
              second. AC is used for mains power because it can be easily stepped up and down using
              transformers. This makes it efficient for long-distance transmission — power stations
              generate at around 25kV, step up to 400kV for the National Grid, then step down
              through substations to the 230V that reaches homes and businesses.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Direct Current (DC)</h3>
            <p className="text-white text-sm leading-relaxed">
              In DC, electrons flow in one direction only. Batteries produce DC. Solar photovoltaic
              panels produce DC (which is then converted to AC by an inverter for connection to the
              mains). Electronic circuits inside computers, phones, and LED drivers all run on DC.
              Electric vehicles charge using DC (or AC converted to DC by the on-board charger). As
              renewable energy and battery storage grow, electricians are working with DC circuits
              more frequently.
            </p>
          </div>
        </div>
        <p>
          As an electrician, you need to understand both. Most of your installation work involves AC
          circuits, but{' '}
          <SEOInternalLink href="/guides/solar-panel-installation-guide">
            solar PV installations
          </SEOInternalLink>
          ,{' '}
          <SEOInternalLink href="/guides/ev-charger-installation-guide">
            EV charger installations
          </SEOInternalLink>
          , and{' '}
          <SEOInternalLink href="/guides/battery-storage-guide">
            battery storage systems
          </SEOInternalLink>{' '}
          all involve DC components. The testing and safety procedures differ between AC and DC, and
          BS 7671 has specific requirements for both.
        </p>
      </>
    ),
  },
  {
    id: 'power-and-energy',
    heading: 'Power and Energy: Watts, Kilowatts and Kilowatt-Hours',
    content: (
      <>
        <p>
          Power and energy are related but different. Power is the rate of doing work — how much
          electrical energy is being used per second. Energy is the total amount used over time.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power (P) is measured in watts (W).</strong> The formula is P = V x I. A
                230V supply delivering 13A provides 2,990W (approximately 3kW). One kilowatt (kW) is
                1,000 watts. Power tells you the instantaneous load on a circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Energy is measured in kilowatt-hours (kWh).</strong> One kWh is the energy
                used by a 1kW load running for one hour. A 3kW immersion heater running for 2 hours
                uses 6kWh. This is what electricity meters measure and what consumers pay for.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power also equals I squared times R (P = I²R).</strong> This is important
                because it shows that power loss in a cable increases with the square of the
                current. Double the current and you get four times the heat loss. This is why cables
                must be correctly sized — undersized cables overheat.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When you calculate{' '}
          <SEOInternalLink href="/guides/max-demand-guide">maximum demand</SEOInternalLink> for an
          installation, you are working out the total power (in kW or kVA) that all the connected
          loads could draw at the same time. This determines the size of the main incoming cable,
          the main switch, and the supply fuse. Get it wrong and the supply trips under load.
        </p>
      </>
    ),
  },
  {
    id: 'circuits-explained',
    heading: 'Circuits Explained: Series, Parallel and How UK Wiring Works',
    content: (
      <>
        <p>
          A circuit is a closed loop that allows current to flow from the supply, through the load,
          and back to the supply. If the loop is broken — by a switch, a fuse, or a fault — current
          stops flowing.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <CircuitBoard className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Series Circuits</h4>
                <p className="text-white text-sm leading-relaxed">
                  Components connected in a single path. The same current flows through each
                  component. The total resistance is the sum of all resistances. If one component
                  fails open, the whole circuit stops. Practical example: the trip coil inside an
                  MCB is in series with the circuit it protects — when the coil trips, it breaks the
                  series path and disconnects the supply.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <PlugZap className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Parallel Circuits</h4>
                <p className="text-white text-sm leading-relaxed">
                  Components connected across the supply so each has the full voltage. Current
                  divides between branches. If one branch fails, the others continue working. Almost
                  all domestic circuits connect loads in parallel — each socket on a ring circuit
                  gets 230V regardless of how many other sockets are in use.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Cable className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Ring Final Circuits</h4>
                <p className="text-white text-sm leading-relaxed">
                  Unique to UK wiring, a{' '}
                  <SEOInternalLink href="/guides/ring-circuit-fault-finding">
                    ring final circuit
                  </SEOInternalLink>{' '}
                  connects sockets in a loop — the cable leaves the consumer unit, visits each
                  socket in turn, and returns to the same MCB terminal. This means current can flow
                  to any socket from both directions, effectively halving the maximum current in any
                  section of cable. This allows 2.5mm² cable to serve a 32A circuit.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Understanding circuit types is essential for fault finding. A break in a ring circuit
          turns it into a radial — it still works, but the cable may be overloaded because current
          can only flow from one direction. The R1+R2 continuity test during an{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">EICR</SEOInternalLink>{' '}
          checks for exactly this kind of fault.
        </p>
      </>
    ),
  },
  {
    id: 'why-it-matters',
    heading: 'Why Electrical Theory Matters for Every Electrician',
    content: (
      <>
        <p>
          Electrical theory is not just something you learn for exams and forget. Every task on site
          depends on it — whether you realise it or not.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sizing</strong> — you need to know current, resistance, voltage drop,
                and thermal effects to select the right cable for a circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protective device selection</strong> — choosing between Type B, C, and D
                MCBs requires understanding of prospective fault current and motor inrush currents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing and inspection</strong> — every test you carry out during an EICR
                measures a quantity rooted in basic theory: resistance, impedance, current, voltage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault finding</strong> — diagnosing a fault requires understanding what
                normal readings look like and what abnormal readings indicate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safety</strong> — understanding why earthing, bonding, and RCDs protect
                against electric shock comes directly from knowing how current flows through the
                body and back to the source.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Whether you are a first-year apprentice learning the basics or a qualified electrician
          preparing for{' '}
          <SEOInternalLink href="/guides/city-guilds-2391-exam-tips">C&G 2391</SEOInternalLink>,
          strong electrical theory makes everything else easier. It is the difference between
          following procedures by rote and genuinely understanding what you are doing and why.
        </p>
        <SEOAppBridge
          title="Study electrical theory on your phone"
          description="Elec-Mate's Study Centre covers all the theory you need — from basic Ohm's Law through to three-phase calculations and BS 7671 regulations. Short, focused sections with worked examples. Study between jobs or on the train."
          icon={GraduationCap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HowElectricityWorksPage() {
  return (
    <GuideTemplate
      title="How Electricity Works | Basic Electrical Theory Guide"
      description="Plain English guide to how electricity works. Covers voltage, current, resistance, Ohm's Law, AC vs DC, power calculations, and circuit types. Essential theory for electricians and apprentices."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Electrical Theory"
      badgeIcon={Zap}
      heroTitle={
        <>
          How Electricity Works:{' '}
          <span className="text-yellow-400">Basic Electrical Theory in Plain English</span>
        </>
      }
      heroSubtitle="Voltage, current, resistance, Ohm's Law, AC vs DC, power, and circuits — explained clearly for electricians and apprentices. This is the foundation of everything you do on site."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Theory"
      relatedPages={relatedPages}
      ctaHeading="Learn Electrical Theory With Elec-Mate"
      ctaSubheading="Structured study courses, AI tutor, practice questions, and built-in calculators. Everything an apprentice or qualified electrician needs to master electrical theory. 7-day free trial."
    />
  );
}
