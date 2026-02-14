import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Calculator,
  GraduationCap,
  BookOpen,
  Brain,
  Zap,
  Target,
  Award,
  FolderOpen,
  ClipboardCheck,
  Gauge,
  ShieldCheck,
  BarChart3,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Apprentice', href: '/guides/electrical-apprenticeship-guide' },
  { label: 'Calculations', href: '/guides/calculations-for-apprentices' },
];

const tocItems = [
  { id: 'why-calculations-matter', label: 'Why Calculations Matter' },
  { id: 'ohms-law', label: "Ohm's Law" },
  { id: 'power-triangle', label: 'Power Triangle (P = V x I)' },
  { id: 'cable-sizing-basics', label: 'Cable Sizing Basics' },
  { id: 'voltage-drop', label: 'Voltage Drop' },
  { id: 'diversity', label: 'Diversity (Maximum Demand)' },
  { id: 'prospective-fault-current', label: 'Prospective Fault Current' },
  { id: 'tips-for-exams', label: 'Tips for Calculation Exams' },
  { id: 'elecmate-calculation-tools', label: 'Practice with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "Ohm's law (V = I x R) and the power formula (P = V x I) are the foundation of every electrical calculation. If you understand these two equations, you can work out almost anything.",
  'Cable sizing is not just about current capacity. You must also check voltage drop, disconnection time (using Zs), and thermal constraints (adiabatic equation) before selecting a cable.',
  'Voltage drop must not exceed 3% for lighting circuits and 5% for other circuits in most domestic installations, as recommended by BS 7671 Appendix 4.',
  'Diversity allows you to reduce the assumed maximum demand on a circuit or distribution board because not all loads operate at maximum simultaneously. IET guidance provides standard diversity factors.',
  'Elec-Mate provides 46+ courses, flashcards, mock exams, and an AI tutor that can walk you through any calculation step by step with worked examples.',
];

const faqs = [
  {
    question: "Why do I need to know Ohm's law as an electrician?",
    answer:
      "Ohm's law (V = I x R) is the most fundamental equation in electrical science. It describes the relationship between voltage (V, in volts), current (I, in amps), and resistance (R, in ohms). As an electrician, you use Ohm's law constantly, even if you do not always realise it. When you calculate the current drawn by a load (I = P/V), you are using a rearrangement of Ohm's law combined with the power formula. When you measure earth fault loop impedance and calculate whether the protective device will trip in time, you are applying Ohm's law to the fault loop circuit. When you calculate voltage drop across a cable, you are using V = I x R where R is the cable resistance. Understanding Ohm's law is not optional for the 18th Edition exam, C&G 2391, or the EPA professional discussion. The assessor will expect you to apply it to real scenarios.",
  },
  {
    question: 'How do I calculate cable size for a circuit?',
    answer:
      'Cable sizing involves several steps, and you must check all of them before selecting a cable. Step 1: Determine the design current (Ib) of the circuit based on the connected load. Step 2: Select the rating of the protective device (In). In must be equal to or greater than Ib. Step 3: Determine the current-carrying capacity (Iz) required, taking into account correction factors for ambient temperature (Ca), grouping (Cg), thermal insulation (Ci), and the type of protective device (if semi-enclosed fuses are used). The minimum Iz is calculated as In / (Ca x Cg x Ci). Step 4: Select a cable size from BS 7671 Appendix 4 tables that has a tabulated current-carrying capacity (It) equal to or greater than the required Iz. Step 5: Check voltage drop. Step 6: Check that the Zs at the furthest point does not exceed the maximum for the protective device. Step 7: If the circuit is protected by a device that does not provide overload protection, check the adiabatic equation for fault current withstand. All of these steps are covered in detail in the Elec-Mate courses.',
  },
  {
    question: 'What is voltage drop and why does it matter?',
    answer:
      "Voltage drop is the reduction in voltage that occurs as current flows through a cable due to the cable's resistance. All conductors have some resistance, and Ohm's law tells us that current flowing through a resistance produces a voltage drop (V = I x R). In a 230V domestic installation, if the voltage drop across a cable is too large, the voltage at the load (socket, light, appliance) will be too low for the equipment to function properly. BS 7671 Appendix 4 recommends that voltage drop should not exceed 3% for lighting circuits (6.9V) and 5% for other circuits (11.5V) in domestic installations. Voltage drop depends on the cable length, the cable size (cross-sectional area), and the current flowing through it. Longer runs and smaller cables produce more voltage drop. This is why cable sizing must include a voltage drop check — a cable might have sufficient current-carrying capacity but still produce an unacceptable voltage drop on a long run.",
  },
  {
    question: 'What is diversity and how do I apply it?',
    answer:
      'Diversity is the recognition that not all electrical loads in an installation operate at their maximum rated current simultaneously. For example, a house might have a 3kW immersion heater, a 10.5kW electric shower, a 3kW oven, ten 13A socket outlets, and twelve 100W light points. If you added up all the maximum currents, you would calculate a total demand that is unrealistically high because the shower, oven, and immersion heater are never all running at maximum at the same time. Diversity factors, published in the IET On-Site Guide and Guidance Note 1, allow you to reduce the assumed maximum demand. For example, the standard diversity factor for socket outlets is: first socket at 100% (13A), plus 40% of the remaining sockets. For cooking appliances: the first 10A at 100% plus 30% of the remainder plus 5A if the cooker control unit has a socket. Applying diversity gives a realistic maximum demand that determines the required size of the main switch, distribution board, and supply cable. Note: diversity is applied to determine maximum demand for the overall installation, not for individual circuit protection.',
  },
  {
    question: 'Do I need a scientific calculator for the exams?',
    answer:
      'Yes, you should bring a scientific calculator to your 18th Edition, C&G 2391, and Level 3 exams. Most calculation questions involve multiplying or dividing decimal numbers, and a calculator is much faster and more accurate than mental arithmetic. A basic scientific calculator (Casio FX-83GT or similar, around £10 to £15) is all you need. You do not need a graphing calculator or anything advanced. Make sure you know how to use it before the exam — practise with the same calculator you will bring. Some exam centres provide calculators, but bringing your own is advisable. Key functions you will use: basic arithmetic, square root (for adiabatic equation), and memory functions for multi-step calculations. You should also be comfortable rearranging equations by hand (e.g., rearranging V = I x R to find I = V/R) because the exam will not always present the equation in the form you need.',
  },
  {
    question: 'What calculations come up in the EPA professional discussion?',
    answer:
      'The EPA professional discussion is not a written calculation exam, but the assessor may ask you to explain the principles behind calculations you have applied in your portfolio evidence. For example, if your portfolio includes a cable sizing exercise, the assessor might ask: "How did you determine the design current for this circuit?", "What correction factors did you apply and why?", "Did you check voltage drop, and what was the result?", or "How did you verify that the Zs at the furthest point was within the maximum for the protective device?" The assessor wants to see that you understand the process, not just that you can punch numbers into a calculator. Being able to explain Ohm\'s law, the power formula, cable sizing methodology, and voltage drop in plain English demonstrates a level of understanding that moves you towards Merit or Distinction. Practise explaining calculations out loud, as if you were teaching a colleague.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/testing-procedures-apprentices',
    title: 'Testing Procedures for Apprentices',
    description: 'Step-by-step testing guide that shows where calculations apply in practice.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Interactive voltage drop calculator for BS 7671 compliant cable sizing.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Calculate cable size with correction factors, voltage drop, and Zs verification.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/guides/voltage-drop-guide-bs7671',
    title: 'Voltage Drop Guide',
    description: 'In-depth guide to voltage drop calculations under BS 7671.',
    icon: BarChart3,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-assessment-guide',
    title: 'Assessment Guide',
    description: 'What calculation knowledge the EPA assessor expects you to demonstrate.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description: 'Complete overview of the electrical apprenticeship from start to finish.',
    icon: GraduationCap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-calculations-matter',
    heading: 'Why Electrical Calculations Matter',
    content: (
      <>
        <p>
          Electrical calculations are not just academic exercises for passing exams. They are the
          tools you use to design safe, compliant circuits. Every cable you select, every protective
          device you specify, and every test result you interpret depends on your ability to apply
          basic electrical calculations correctly.
        </p>
        <p>
          As an{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
            electrical apprentice
          </SEOInternalLink>
          , you will encounter calculations in your Level 3 qualification, 18th Edition exam (C&G
          2382), inspection and testing qualification (C&G 2391), and in the{' '}
          <SEOInternalLink href="/guides/apprentice-assessment-guide">
            EPA professional discussion
          </SEOInternalLink>
          . You do not need to be a mathematician. You need to understand a handful of core
          equations and know how to apply them to real situations.
        </p>
        <p>
          This guide covers the essential calculations in simple terms, with worked examples that
          show you how each calculation applies on a real job site. If you can master these, you
          will be well-prepared for every exam and assessment in the apprenticeship.
        </p>
      </>
    ),
  },
  {
    id: 'ohms-law',
    heading: "Ohm's Law: The One Equation You Must Know",
    content: (
      <>
        <p>
          Ohm's law is the foundation of electrical science. It describes the relationship between
          three quantities that you will work with every day:
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4 text-center">
          <p className="text-2xl font-bold text-white mb-2">V = I x R</p>
          <p className="text-white text-sm">
            Voltage (V, volts) = Current (I, amps) x Resistance (R, ohms)
          </p>
        </div>
        <p>
          This single equation can be rearranged to find any of the three values if you know the
          other two:
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 text-center">
            <h3 className="font-bold text-white text-lg mb-2">Find Voltage</h3>
            <p className="text-xl font-bold text-white mb-1">V = I x R</p>
            <p className="text-white text-sm">
              "How much voltage is needed to push 10A through 2.3 ohms?" V = 10 x 2.3 = 23V
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5 text-center">
            <h3 className="font-bold text-white text-lg mb-2">Find Current</h3>
            <p className="text-xl font-bold text-white mb-1">I = V / R</p>
            <p className="text-white text-sm">
              "How much current flows through a 23-ohm heater at 230V?" I = 230 / 23 = 10A
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5 text-center">
            <h3 className="font-bold text-white text-lg mb-2">Find Resistance</h3>
            <p className="text-xl font-bold text-white mb-1">R = V / I</p>
            <p className="text-white text-sm">
              "What is the resistance of a load drawing 10A at 230V?" R = 230 / 10 = 23 ohms
            </p>
          </div>
        </div>
        <p>
          Every other calculation in this guide builds on Ohm's law. When you measure earth fault
          loop impedance (Zs) and calculate whether the protective device will trip, you are
          applying Ohm's law: fault current = voltage / loop impedance (If = Uo / Zs). When you
          calculate voltage drop, you are applying V = I x R to the cable resistance. Master this
          equation and everything else follows.
        </p>
      </>
    ),
  },
  {
    id: 'power-triangle',
    heading: 'The Power Triangle: P = V x I',
    content: (
      <>
        <p>
          The power formula tells you how much electrical power (in watts) a circuit delivers or
          consumes. Combined with Ohm's law, it gives you a complete toolkit for analysing any
          circuit.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4 text-center">
          <p className="text-2xl font-bold text-white mb-2">P = V x I</p>
          <p className="text-white text-sm">
            Power (P, watts) = Voltage (V, volts) x Current (I, amps)
          </p>
        </div>
        <p>Rearranging this gives you:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>I = P / V</strong> — use this to find the current drawn by a load when you
                know its power rating and the supply voltage. Example: a 3kW immersion heater at
                230V draws I = 3000 / 230 = 13.04A. This tells you the minimum cable and protective
                device rating needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>V = P / I</strong> — use this to find the voltage required for a given power
                and current. Less commonly used in day-to-day work but important for understanding
                transformer calculations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          By combining Ohm's law and the power formula, you can derive two more useful equations:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>P = I² x R</strong> — power dissipated by a resistance carrying a current.
                Used in the adiabatic equation and for calculating heat generated in cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>P = V² / R</strong> — power delivered to a resistance at a given voltage.
                Useful for calculating heater and lamp outputs.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In the real world, these calculations are used constantly. When a customer asks you to
          install an electric shower, you use I = P / V to determine the current drawn, then select
          the cable and protective device accordingly. When you are{' '}
          <SEOInternalLink href="/guides/testing-procedures-apprentices">
            testing a circuit
          </SEOInternalLink>{' '}
          and need to verify that the protective device will clear a fault, you are applying these
          same principles.
        </p>
      </>
    ),
  },
  {
    id: 'cable-sizing-basics',
    heading: 'Cable Sizing Basics',
    content: (
      <>
        <p>
          Cable sizing is one of the most important practical calculations you will perform as an
          electrician. Get it wrong and the cable overheats, the insulation degrades, and the
          installation becomes a fire risk. Get it right and the cable operates safely within its
          rated capacity for decades.
        </p>
        <p>The cable sizing process follows these steps:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Determine the design current (Ib)</strong> — calculate the current the circuit
              will carry under normal conditions using I = P / V. For a 7.2kW electric shower at
              230V: Ib = 7200 / 230 = 31.3A.
            </li>
            <li>
              <strong>Select the protective device (In)</strong> — choose a protective device rated
              at or above Ib. For 31.3A, use a 32A MCB.
            </li>
            <li>
              <strong>Apply correction factors</strong> — adjust the required current-carrying
              capacity for ambient temperature (Ca), grouping with other cables (Cg), and thermal
              insulation (Ci). The minimum required capacity is: Iz = In / (Ca x Cg x Ci).
            </li>
            <li>
              <strong>Select the cable</strong> — look up the current-carrying capacity tables in BS
              7671 Appendix 4 for the installation method and find a cable with It greater than or
              equal to Iz.
            </li>
            <li>
              <strong>Check voltage drop</strong> — calculate the voltage drop for the cable length
              and current. Ensure it is within the permitted limits.
            </li>
            <li>
              <strong>Check Zs</strong> — verify that the earth fault loop impedance at the furthest
              point is within the maximum for the protective device.
            </li>
          </ol>
        </div>
        <p>
          The correction factors are where many apprentices get confused. Think of them as penalties
          that reduce the cable's effective capacity. A cable in a hot loft (high ambient
          temperature) can carry less current than the same cable in a cool cellar. A cable bundled
          with other cables (grouping) generates more heat and must be derated. A cable covered in
          thermal insulation cannot dissipate heat effectively and must be derated further.
        </p>
        <SEOAppBridge
          title="Cable sizing made simple"
          description="Use the Elec-Mate cable sizing calculator to check current capacity, correction factors, voltage drop, and Zs in seconds. Or ask the AI tutor to walk you through a cable sizing problem step by step."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'voltage-drop',
    heading: 'Voltage Drop: Keeping the Voltage at the Load',
    content: (
      <>
        <p>
          Every cable has resistance. When current flows through it, some voltage is "dropped"
          across the cable, meaning the voltage at the load is lower than the voltage at the supply.
          This is voltage drop, and it is calculated using a version of Ohm's law:
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4 text-center">
          <p className="text-xl font-bold text-white mb-2">
            Voltage Drop = (mV/A/m x Ib x L) / 1000
          </p>
          <p className="text-white text-sm">
            Where mV/A/m is the voltage drop per amp per metre (from BS 7671 tables), Ib is the
            design current, and L is the cable length in metres.
          </p>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Worked Example</h3>
          <p className="text-white text-sm leading-relaxed">
            A 2.5mm² twin and earth cable supplies a 3kW immersion heater on a 15m run.
          </p>
          <ul className="space-y-2 text-white text-sm mt-3">
            <li>Design current: Ib = 3000 / 230 = 13.04A</li>
            <li>mV/A/m for 2.5mm² (clipped direct, Table 4D5A): 18 mV/A/m</li>
            <li>Voltage drop = (18 x 13.04 x 15) / 1000 = 3.52V</li>
            <li>As a percentage of 230V: (3.52 / 230) x 100 = 1.53%</li>
            <li>This is within the 5% limit for power circuits. Pass.</li>
          </ul>
        </div>
        <p>
          <SEOInternalLink href="/guides/voltage-drop-guide-bs7671">Voltage drop</SEOInternalLink>{' '}
          becomes a problem on long cable runs and with smaller cable sizes. If the calculated
          voltage drop exceeds the permitted limit, you have two options: use a larger cable (lower
          resistance per metre) or reduce the cable length (shorter route). In practice, you often
          need to upsize the cable by one size to bring the voltage drop within limits.
        </p>
      </>
    ),
  },
  {
    id: 'diversity',
    heading: 'Diversity: Realistic Maximum Demand',
    content: (
      <>
        <p>
          Diversity is the principle that not all electrical loads in an installation operate at
          their maximum rating simultaneously. A house might have 30A of socket circuits, a 40A
          shower, a 30A cooker, and 10A of lighting, but they are never all running at full load at
          the same time. Diversity allows you to calculate a realistic maximum demand rather than
          simply adding up all the circuit ratings.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">
            Common Diversity Factors (IET On-Site Guide)
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting</strong> — 66% of total lighting current demand. So if your
                lighting circuits total 10A, the diversified demand is 6.6A.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heating and hot water</strong> — the full load of the largest appliance,
                plus the remaining appliances at various percentages depending on type and
                thermostat control.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket outlets</strong> — 100% of the largest circuit plus 40% of the
                remaining circuits. For two 32A ring circuits: 32A + (0.4 x 32A) = 44.8A.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cooker</strong> — the first 10A at 100% plus 30% of the remaining current,
                plus 5A if the cooker control unit includes a socket outlet.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric shower</strong> — 100% (no diversity applied). Showers draw their
                full rated current whenever they are in use.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Understanding diversity is essential for designing domestic installations and for the 18th
          Edition exam. It determines the size of the main switch, the rating of the supply cable
          from the meter, and the maximum demand you declare to the Distribution Network Operator
          (DNO).
        </p>
      </>
    ),
  },
  {
    id: 'prospective-fault-current',
    heading: 'Prospective Fault Current: Will the Device Cope?',
    content: (
      <>
        <p>
          Prospective fault current (Ipf) is the maximum current that would flow if a short circuit
          or earth fault occurred at a given point in the installation. You need to know this
          because the protective device (MCB, RCBO, fuse) must be able to safely interrupt this
          current without damage.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How to calculate it</strong> — Ipf = Uo / Zs (or Ze for faults at the
                origin). For a typical domestic supply with Ze of 0.35 ohms: Ipf = 230 / 0.35 =
                657A. This is well within the 6kA (6,000A) breaking capacity of standard domestic
                MCBs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Why it matters</strong> — if the prospective fault current exceeds the
                breaking capacity of the protective device, the device could fail to interrupt the
                fault safely. This could cause an arc flash, fire, or explosion. In commercial and
                industrial installations with high fault levels, this is a critical design
                consideration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Measurement</strong> — your multifunction tester can measure Ipf directly at
                the origin of the installation. The reading must be recorded on the EIC or EICR.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For most domestic installations, the prospective fault current is well within the breaking
          capacity of standard MCBs (typically rated at 6kA or 10kA). However, always measure and
          record it. In some situations, particularly in industrial installations or properties very
          close to a substation, the fault level can be much higher.
        </p>
      </>
    ),
  },
  {
    id: 'tips-for-exams',
    heading: 'Tips for Calculation Questions in Exams',
    content: (
      <>
        <p>
          Calculation questions appear in the 18th Edition exam, Level 3 exam, C&G 2391, and the
          EPA. These tips will help you approach them confidently.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Write down what you know</strong> — before touching the calculator, list the
                values given in the question and identify which formula to use. This prevents the
                common mistake of rushing to calculate with the wrong equation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Watch the units</strong> — kilowatts vs watts (multiply kW by 1000),
                millivolts vs volts (divide mV by 1000), megohms vs ohms. Unit errors are the most
                common cause of wrong answers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sense-check your answer</strong> — if you calculate a current of 500A for a
                domestic socket circuit, something has gone wrong. Develop a feel for what
                reasonable values look like.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Know which BS 7671 tables to use</strong> — for cable sizing, voltage drop,
                and maximum Zs values. The exam allows you to use BS 7671, so know where to find the
                tables quickly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practice regularly</strong> — calculation skills are like any other skill:
                they improve with practice and deteriorate without it. Do at least a few calculation
                questions every week throughout the apprenticeship.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'elecmate-calculation-tools',
    heading: 'Practice Calculations with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate provides multiple tools to help you master electrical calculations at your own
          pace.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">46+ Courses with Calculation Modules</h4>
                <p className="text-white text-sm leading-relaxed">
                  Dedicated modules on Ohm's law, power calculations, cable sizing, voltage drop,
                  diversity, and fault current. Each module includes theory, worked examples, and
                  practice questions.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <BookOpen className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Flashcards and Mock Exams</h4>
                <p className="text-white text-sm leading-relaxed">
                  Quick-fire calculation flashcards and timed mock exams that simulate the real exam
                  format. Build speed and accuracy with daily practice sessions you can fit into any
                  break.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Built-in Calculators</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/voltage-drop-calculator">
                    voltage drop calculator
                  </SEOInternalLink>
                  ,{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>
                  , and other tools to check your manual calculations and understand how the numbers
                  work in practice.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Tutor</h4>
                <p className="text-white text-sm leading-relaxed">
                  Stuck on a calculation? Ask the AI tutor. It will walk you through the problem
                  step by step, explain which formula to use, and show you how to rearrange
                  equations. Like having a tutor in your pocket, available 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Master calculations with Elec-Mate"
          description="46+ courses, flashcards, mock exams, built-in calculators, and an AI tutor that walks you through every calculation step by step. Build confidence one equation at a time. 7-day free trial."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CalculationsForApprenticesPage() {
  return (
    <GuideTemplate
      title="Electrical Calculations for Apprentices | Easy Guide"
      description="Beginner-friendly guide to electrical calculations for UK apprentices. Ohm's law, power triangle, cable sizing, voltage drop, diversity, and prospective fault current explained in simple terms with worked examples."
      datePublished="2025-11-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={Calculator}
      heroTitle={
        <>
          Electrical Calculations for Apprentices:{' '}
          <span className="text-yellow-400">Every Formula Explained Simply</span>
        </>
      }
      heroSubtitle="Electrical calculations do not need to be intimidating. This guide covers every essential calculation in the apprenticeship — Ohm's law, power triangle, cable sizing, voltage drop, diversity, and fault current — in plain English with worked examples you can follow."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Calculations"
      relatedPages={relatedPages}
      ctaHeading="Master Calculations Step by Step"
      ctaSubheading="Elec-Mate's apprentice hub includes dedicated calculation modules with worked examples, flashcards, mock exams, built-in calculators, and an AI tutor that explains every step. 7-day free trial."
    />
  );
}
