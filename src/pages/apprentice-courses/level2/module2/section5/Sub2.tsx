/**
 * Magnetic flux and flux density (5.2).
 * City & Guilds 2365-02 → Unit 202 → LO5 → AC 5.2.
 * Apprentice-quality content from scratch — gives the apprentice the
 * vocabulary and units they need before electromagnetic induction lands.
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
import { BarMagnet } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Magnetic flux and flux density (5.2) | Level 2 Module 2.5.2 | Elec-Mate';
const DESCRIPTION =
  'Flux Φ in webers, flux density B in tesla, the relationship Φ = B × A and the worked maths your AM2 examiner will expect. The numbers behind every transformer rating you’ll meet.';

const checks = [
  {
    id: 'flux-units',
    question: 'What’s the SI unit of magnetic flux Φ?',
    options: [
      'Weber (Wb)',
      'Tesla (T)',
      'Henry (H)',
      'Ampere-turn (At)',
    ],
    correctIndex: 0,
    explanation:
      'Flux is measured in webers (Wb). Flux DENSITY is measured in tesla (T). Don’t mix them up — flux is the total amount of magnetism through an area, flux density is how concentrated it is.',
  },
  {
    id: 'flux-density-calc',
    question: 'A field of 0.5 T passes through an area of 0.02 m². What is the total flux?',
    options: [
      '25 Wb',
      '10 Wb',
      '0.025 Wb',
      '0.01 Wb',
    ],
    correctIndex: 3,
    explanation:
      'Φ = B × A = 0.5 × 0.02 = 0.01 Wb. That’s 10 milliwebers — about the order of magnitude inside a small transformer core at full load.',
  },
  {
    id: 'flux-area-effect',
    question: 'You double the area of a coil but keep the field the same. The flux through it:',
    options: [
      'Stays the same',
      'Halves',
      'Doubles',
      'Quadruples',
    ],
    correctIndex: 2,
    explanation:
      'Flux is field × area. Double the area → double the flux. That’s exactly why bigger transformers have bigger core cross-sections — more flux per turn means more EMF for the same number of turns.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does the symbol Φ (capital phi) represent?',
    options: [
      'Flux density',
      'Magnetic flux',
      'Force',
      'Frequency',
    ],
    correctAnswer: 1,
    explanation:
      'Φ is magnetic flux — the total "amount" of magnetism passing through a surface, measured in webers (Wb).',
  },
  {
    id: 2,
    question: 'What does the symbol B represent?',
    options: [
      'Magnetic force',
      'Magnetic flux',
      'Magnetic flux density',
      'Magnetic charge',
    ],
    correctAnswer: 2,
    explanation:
      'B is flux density — the strength of the field at a particular point, measured in tesla (T) or webers per square metre (Wb/m²).',
  },
  {
    id: 3,
    question: 'One tesla is equal to:',
    options: [
      '1 m²/Wb',
      '1 Wb',
      '1 V/Wb',
      '1 Wb/m²',
    ],
    correctAnswer: 3,
    explanation:
      '1 T = 1 Wb/m². The tesla is just the weber spread out over a square metre. That’s why bigger area for the same flux means lower density — and lower density means weaker pull.',
  },
  {
    id: 4,
    question: 'A flux of 0.02 Wb passes through an area of 0.04 m². What is B?',
    options: [
      '0.5 T',
      '2 T',
      '0.0008 T',
      '0.08 T',
    ],
    correctAnswer: 0,
    explanation:
      'B = Φ / A = 0.02 / 0.04 = 0.5 T. A typical small permanent magnet sits in this range; transformer iron operates around 1.0 to 1.7 T at peak.',
  },
  {
    id: 5,
    question: 'A coil sits in a 0.8 T field. The cross-section of the coil is 50 cm². What is the flux through it?',
    options: [
      '4 Wb',
      '0.004 Wb',
      '0.0016 Wb',
      '40 Wb',
    ],
    correctAnswer: 1,
    explanation:
      'Convert area to m²: 50 cm² = 0.005 m². Φ = B × A = 0.8 × 0.005 = 0.004 Wb = 4 mWb. Watch the unit conversion — that’s where most apprentices lose marks.',
  },
  {
    id: 6,
    question: 'Why do transformer cores use a high-permeability material like silicon steel?',
    options: [
      'It is cheaper than copper and easier to wind',
      'It insulates the windings from the core',
      'It carries far more flux for the same magnetising current',
      'It stops the core rusting in damp conditions',
    ],
    correctAnswer: 2,
    explanation:
      'High-permeability materials concentrate flux. The same magnetising current produces a much higher B in silicon steel than in air — which means a smaller, lighter, more efficient transformer.',
  },
  {
    id: 7,
    question: 'Roughly what flux density does the Earth’s magnetic field reach at the surface?',
    options: [
      'About 5 T',
      'About 50 mT',
      'About 0.5 T',
      'About 50 µT',
    ],
    correctAnswer: 3,
    explanation:
      'About 50 microtesla. Compare that to a fridge magnet (~5 mT) and a transformer core (~1.5 T) — the Earth’s field is a hundred times weaker than a fridge magnet, but enough to swing a compass.',
  },
  {
    id: 8,
    question: 'Why does this matter for an electrician?',
    options: [
      'Transformer ratings, motor torque and RCD sensitivity all come from how much flux is produced and how dense it is',
      'It sets the maximum length a cable run can be before voltage drop fails',
      'It decides the disconnection time of a protective device on an earth fault',
      'It fixes the insulation resistance minimum for a new circuit',
    ],
    correctAnswer: 0,
    explanation:
      'Every nameplate kVA rating, every motor torque figure, every RCD trip threshold traces back to controlled flux and density. Designers do the maths — but you need the vocabulary to read what they specified.',
  },
];

const faqs = [
  {
    question: 'What’s the difference between flux and flux density in plain English?',
    answer:
      'Think of flux as the total amount of "magnetic stuff" passing through a surface — like the total amount of water flowing through a pipe each second. Flux density is how concentrated that stuff is per square metre — like the speed of the water in a particular cross-section. Squeeze the same flux into a smaller area and the density goes up.',
  },
  {
    question: 'Why are there two different units — webers and tesla?',
    answer:
      'Because they describe two different things. Total flux through a coil decides how much EMF the coil generates when the flux changes (Faraday’s law — next subsection). Density decides the force on a current-carrying conductor sitting in the field (F = BIL). Two different jobs, two different units.',
  },
  {
    question: 'Where does the name "tesla" come from?',
    answer:
      'Nikola Tesla — the engineer who pioneered AC power systems in the late 1800s. The unit was named in his honour by the IEC in 1960. The "weber" is named after Wilhelm Weber, a 19th-century German physicist who worked on units for electricity and magnetism.',
  },
  {
    question: 'How big a flux density can you get in a real magnet?',
    answer:
      'Permanent magnets max out around 1.4 T (a strong neodymium magnet at its surface). Transformer cores at peak operation hit 1.5 to 1.7 T — push them higher and the iron "saturates" and refuses to take more flux. Big medical MRI machines run at 1.5 to 3 T over a much bigger volume. The strongest sustained magnetic fields ever created in a lab are around 45 T.',
  },
  {
    question: 'I see "magnetomotive force" in the textbook — is that flux too?',
    answer:
      'No. Magnetomotive force (mmf) is the magnetic equivalent of voltage — it’s what drives the flux around a magnetic circuit. Measured in ampere-turns (At), it equals the current times the number of coil turns (NI). Flux is the result of mmf overcoming the magnetic resistance ("reluctance") of the path. Same shape as Ohm’s law: mmf = flux × reluctance.',
  },
  {
    question: 'Do I need to remember Φ = B × A for the exam?',
    answer:
      'Yes — and the way you’ll use it is to swap between the two whenever the question gives you one and asks for the other. Practise it both ways: Φ = B × A (find flux), B = Φ / A (find density), A = Φ / B (find area). Watch out for areas given in cm² — always convert to m² first.',
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 2 · Section 5 · Subsection 2"
            title="Magnetic flux and flux density"
            description="Flux Φ in webers, flux density B in tesla, and the simple equation that ties them together. The numerical language behind every transformer kVA rating and every motor nameplate."
            tone="emerald"
          />

          <TLDR
            points={[
              'Magnetic flux Φ is the total amount of magnetism through a surface, measured in webers (Wb).',
              'Flux density B is how concentrated the flux is — measured in tesla (T), where 1 T = 1 Wb/m².',
              'They’re tied together by Φ = B × A. Bigger area or stronger field = more flux. Standard exam-question territory.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define magnetic flux Φ and state its SI unit (the weber).',
              'Define magnetic flux density B and state its SI unit (the tesla).',
              'State and apply the relationship Φ = B × A in worked calculations.',
              'Convert between webers, milliwebers and microwebers, and between tesla, millitesla and microtesla.',
              'Recognise typical flux-density values — Earth’s field, fridge magnet, transformer core, neodymium magnet.',
              'Explain why a high-permeability core (silicon steel, ferrite) carries far more flux than air for the same current.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>From "field" to a number</ContentEyebrow>

          <ConceptBlock
            title="Picture water flowing through a pipe"
            plainEnglish="Forget the formulas for a second. Two everyday quantities, one familiar picture — that’s all flux and flux density really are."
            onSite="Once the picture sticks, the maths stops feeling like maths and starts feeling like plumbing. Every transformer kVA, every motor torque rating, every RCD sensitivity is just this same idea with a different pipe."
          >
            <p>
              Picture water flowing through a pipe. The total amount of water passing through that
              pipe per second is the <strong>flux</strong> — how much "stuff" is getting through.
              How fast that water is moving in any one cross-section is the <strong>density</strong>{' '}
              — how packed the flow is at one specific spot. Squeeze the same flux into a smaller
              pipe and the density goes up; widen the pipe and the density drops, even though the
              total flow hasn’t changed.
            </p>
            <p>
              Magnetism works the same way. The total amount of magnetic field passing through a
              surface is <strong>magnetic flux Φ</strong> (the Greek capital "phi"), measured in{' '}
              <strong>webers (Wb)</strong>. How concentrated that field is per square metre is{' '}
              <strong>magnetic flux density B</strong>, measured in <strong>tesla (T)</strong>.
              Tied together by one short equation:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Φ = B × A</strong> — total flux equals density times area.
              </li>
            </ul>
            <p>
              The next blocks unpack each of these properly — units, scale, worked examples — and
              then you’ll see why every transformer designer in the country lives inside this one
              equation. You won’t do those design calcs on site, but you’ll see the units
              everywhere: on transformer plates, on motor data sheets, in BS 7671 itself.
            </p>
          </ConceptBlock>

          <BarMagnet
            eyebrow="Bar magnet — flux through the air"
            caption="Imagine each field line as one ‘unit’ of flux. Pick any small surface around the magnet — count how many lines pass through it, and that’s the flux Φ for that surface."
          />

          <SectionRule />

          <ContentEyebrow>Flux Φ — the total amount</ContentEyebrow>

          <ConceptBlock
            title="Magnetic flux Φ is the total amount of field passing through a surface"
            plainEnglish="Picture cupping your hands round one pole of a magnet. The number of field lines threading through the gap between your hands is the flux. More lines = more flux."
            onSite="If you’ve ever wound a temporary coil to test a relay, the number of turns multiplied by the flux through one turn is what decides how much EMF you’ll induce when the field changes. That’s the heart of every transformer."
          >
            <p>
              <strong>Magnetic flux</strong> (symbol <strong>Φ</strong>, the Greek capital "phi")
              is the total amount of magnetic field crossing a particular area. It’s measured in
              <strong> webers</strong> (Wb). One weber is a fairly chunky amount — for everyday
              electrical kit you’ll see milliwebers (mWb, thousandths) and microwebers (µWb,
              millionths) more often.
            </p>
            <p>
              The bigger the surface, or the stronger the field passing through it, the more flux
              you have. If the surface is tilted at an angle to the field, you only count the
              component of the field that’s perpendicular to the surface — but for the Level 2
              exam, you’ll always be given the case where field and surface are at right angles to
              each other.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IEC 60050 — International Electrotechnical Vocabulary, 121-11-23"
            clause="Magnetic flux: scalar quantity equal to the surface integral of the magnetic flux density over a specified surface."
            meaning={
              <>
                In English: flux is the total of the flux density over the whole surface you
                care about. For a uniform field at right angles to the surface — which is what
                Level 2 questions always assume — that simplifies down to{' '}
                <strong>Φ = B × A</strong>. Don’t panic at the formal wording; the version you’ll
                actually use is the simple one.
              </>
            }
            cite="Source: IEC Electropedia (electropedia.org) — entry 121-11-23."
          />

          <SectionRule />

          <ContentEyebrow>Flux density B — how concentrated</ContentEyebrow>

          <ConceptBlock
            title="Flux density B is the flux per unit area"
            plainEnglish="If flux is the total amount of water through a pipe each second, density is how packed the field is at one specific spot. Same total flux squeezed into a smaller cross-section means a higher density."
          >
            <p>
              <strong>Magnetic flux density</strong> (symbol <strong>B</strong>) is the strength
              of the field at a particular point — the flux per square metre of cross-section.
              It’s measured in <strong>tesla (T)</strong>, where:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1 T = 1 Wb/m²</strong>
              </li>
              <li>
                Smaller fields are quoted in millitesla (1 mT = 0.001 T) or microtesla (1 µT =
                0.000001 T).
              </li>
            </ul>
            <p>
              A few real-world numbers to anchor the scale:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Earth’s magnetic field at the surface:</strong> about 50 µT — weak, but
                enough to swing a compass.
              </li>
              <li>
                <strong>A small fridge magnet:</strong> about 5 mT (5,000 µT). A hundred times
                stronger than the Earth’s field.
              </li>
              <li>
                <strong>A typical neodymium "rare earth" magnet:</strong> 0.5 to 1.4 T at the
                surface.
              </li>
              <li>
                <strong>A transformer core at full load:</strong> 1.0 to 1.7 T — pushed to the
                point where the iron is just shy of saturating.
              </li>
              <li>
                <strong>A medical MRI scanner magnet:</strong> 1.5 to 3 T over a much bigger
                volume.
              </li>
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

          <ContentEyebrow>The equation that ties them together</ContentEyebrow>

          <ConceptBlock
            title="Φ = B × A — the one formula to remember"
            plainEnglish="Total flux equals the field strength times the area it’s passing through. Same shape as ‘distance equals speed times time’ — just different quantities."
            onSite="A transformer is sized to keep B inside the silicon steel below saturation. The designer picks an area A big enough that Φ = B × A delivers the EMF the secondary needs. Every kVA rating you’ve ever read is this formula in disguise."
          >
            <p>
              For a uniform field B passing through an area A at right angles, the total flux is:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Φ = B × A</strong>
              </li>
              <li>Φ in webers (Wb)</li>
              <li>B in tesla (T)</li>
              <li>A in square metres (m²)</li>
            </ul>
            <p>
              Rearrange it for the unknown you’re after. If you’ve got Φ and A, then{' '}
              <strong>B = Φ / A</strong>. If you’ve got Φ and B, then <strong>A = Φ / B</strong>.
              Three forms, one formula. Same idea as the V = IR triangle from Ohm’s law.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Worked example — flux through a coil">
            <p>
              A bar magnet produces a uniform field of <strong>B = 0.5 T</strong> in the gap
              between its poles. A small rectangular coil with cross-section <strong>A = 0.02 m²
              </strong> sits squarely in the gap, perpendicular to the field.
            </p>
            <p>What’s the flux through one turn of the coil?</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Φ = B × A</strong>
              </li>
              <li>
                <strong>Φ = 0.5 × 0.02 = 0.01 Wb</strong>
              </li>
              <li>That’s 10 mWb (10 milliwebers).</li>
            </ul>
            <p>
              In the next subsection — and again in Sub5, the AC generator — you’ll see that the
              EMF induced in a coil depends on how fast Φ changes, multiplied by the number of
              turns. That’s why this number matters: it’s the input to every induction
              calculation that follows.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <ConceptBlock title="Worked example — finding flux density from flux">
            <p>
              A transformer core has a cross-sectional area of <strong>A = 25 cm²</strong> and the
              total flux through it is <strong>Φ = 4 mWb</strong>. What is the flux density inside
              the core?
            </p>
            <p>Step one — convert the units to SI:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>A = 25 cm² = 25 × 10⁻⁴ m² = 0.0025 m²</li>
              <li>Φ = 4 mWb = 4 × 10⁻³ Wb = 0.004 Wb</li>
            </ul>
            <p>Step two — apply B = Φ / A:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>B = 0.004 / 0.0025 = 1.6 T</strong>
              </li>
            </ul>
            <p>
              That’s right at the top end of normal operation for silicon steel — push it any
              higher and the core saturates and starts heating up badly. This is exactly the maths
              a transformer designer is doing when they spec the laminations.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Why a core changes everything</ContentEyebrow>

          <ConceptBlock
            title="High-permeability materials concentrate flux — that’s what cores are for"
            plainEnglish="Air is a poor conductor of magnetism. Silicon steel is thousands of times better. Wrap your coil round a steel core and you get hundreds of times more flux for the same current."
            onSite="That’s why every transformer, every contactor coil and every motor stator has an iron or silicon-steel core inside it. Take the core out and the device wouldn’t work — there wouldn’t be enough flux to do anything useful."
          >
            <p>
              Different materials let magnetic flux pass through them more or less easily. The
              property is called <strong>permeability</strong> (symbol µ). Air has a permeability
              very close to 1. Soft iron is about 5,000 times higher. Grain-oriented silicon steel
              (the stuff transformer cores are stamped from) can hit 40,000.
            </p>
            <p>
              Practical consequence: for the same magnetising current, a coil wound round a
              silicon-steel core produces a flux density thousands of times higher than the same
              coil in air. That’s why every transformer, every motor and every solenoid has a core
              of magnetic material running through the middle of its windings — without it the
              device would need to be the size of a fridge to do the same job.
            </p>
            <p>
              There’s a limit, though. Pile too much flux into a piece of iron and the domains
              run out of room to align — the iron <strong>saturates</strong>. Push past that and
              the extra magnetising current just gets dissipated as heat. That’s why transformer
              designers aim for B around 1.5 T in silicon steel — close to the limit, but not
              over it.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN IEC 60404-2:2024 — Magnetic materials, Part 2: Methods of measurement of magnetic properties of electrical steel strip and sheet"
            clause="The magnetic flux density and the corresponding magnetic field strength are determined under defined conditions to characterise the magnetic properties of electrical steel sheet and strip used in transformer and rotating-machine cores."
            meaning={
              <>
                Manufacturers test electrical steel to this standard so designers can pick a grade
                that hits a known flux density at a known magnetising current — and stays below
                saturation at full load. When you see "M4 grain-oriented silicon steel, 0.30 mm
                lamination" on a transformer spec sheet, this standard is what’s behind the
                numbers.
              </>
            }
            cite="Reference: BS EN IEC 60404 series — full text via BSI."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <SectionRule />

          <ContentEyebrow>Where flux density shows up on site</ContentEyebrow>

          <ConceptBlock
            title="Where flux density shows up on site — three real components, three real numbers"
            plainEnglish="The B figure isn’t a textbook curiosity. It’s on data sheets, it sets pickup voltages, and it’s the reason kit either works or doesn’t."
            onSite="Three real components where the tesla figure decides whether you’re happy or chasing a fault:"
          >
            <p>
              You’ll never measure flux density directly with the kit on your van. But the figure
              decides what the kit on the panel actually does. Three places it matters:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>A transformer core running hot under ESQCR.</strong> Designers size every
                transformer to operate around <strong>1.5 T</strong> peak in the silicon steel —
                close to saturation but not over it. If supply voltage drifts up to the top of the
                ±10% ESQCR window (so 253 V instead of 230 V), the peak flux in the core climbs
                with it. Push past the saturation knee and the iron stops carrying extra flux —
                the magnetising current shoots up instead and the core overheats. That’s why a
                transformer running on a permanently high supply gets warm even at light load.
              </li>
              <li>
                <strong>A contactor coil pulling in unreliably below 80% supply voltage.</strong>{' '}
                The coil is sized to develop the flux density needed to overcome the spring and
                pull the armature in. The standard rule of thumb is the coil must work at{' '}
                <strong>80%</strong> of nominal supply (so 184 V on a 230 V coil) and reliably
                drop out below 65% — flux density scales with coil voltage, and below the 80%
                threshold there isn’t enough B to hold the armature in against the spring.
              </li>
              <li>
                <strong>The "1.5 T" line on a relay coil data sheet.</strong> When a relay or
                solenoid coil spec quotes a peak operating flux density (often 1.0 to 1.7 T for
                soft-iron parts), that’s the B the magnetic circuit needs to develop for the
                armature to pull in cleanly. Below it, the contacts chatter or won’t close.
                Above it, the iron saturates and you waste the rest as heat.
              </li>
            </ul>
            <p>
              In all three cases the figure on the page in this Sub — tesla — is the figure that
              decides whether the kit on the wall does its job.
            </p>
          </ConceptBlock>

          <Scenario
            title="A contactor that won’t stay in — chattering on a long sub-main"
            situation={
              <>
                You’re called to a workshop where a 230 V contactor feeding a small extraction
                fan keeps "chattering" — pulling in, dropping out, pulling in again, two or three
                times a second. The audible buzz is brutal. The control circuit is a simple latch:
                push a start button, the contactor pulls in, an auxiliary contact holds it. You
                check the supply at the coil terminals while it’s trying to hold in. Your meter
                reads <strong>180 V</strong> across the coil — on a contactor whose nameplate
                says "230 V AC, pickup 80% nominal".
              </>
            }
            whatToDo={
              <>
                Do the maths. 180 V on a 230 V nominal coil is <strong>78%</strong> of nominal
                — below the 80% pickup threshold the contactor needs. Translation: the coil isn’t
                generating enough flux density to hold the armature in against its spring. The
                armature pulls partway in, the air gap drops, the coil draws more current
                briefly, the supply drops further (because it was already weak), the contactor
                drops out, the cycle repeats — that’s the chatter. <strong>Trace the supply drop
                first.</strong> Most likely a long thin control-circuit cable run from the panel
                with too much voltage drop under the inrush current; sometimes a knackered upstream
                contact, sometimes a worn neutral. If the supply genuinely is 180 V at the panel
                bus and there’s nothing you can do about it (a long sub-main on a difficult site),
                then specify a coil rated for the actual voltage you’ve got — most contactor
                ranges sell 110 V or 24 V coils for exactly this case, with a separate control
                transformer feeding them.
              </>
            }
            whyItMatters={
              <>
                Flux density isn’t abstract physics. The 80% pickup threshold on a coil is the
                line between "kit holds in cleanly" and "kit chatters, contacts weld, motor runs
                single-phase, building burns down". A contactor stuck chattering can weld its main
                contacts in seconds and lose phase isolation on whatever it’s feeding. The number
                that decides which side of that line you sit on is B in the magnetic circuit of
                the coil — exactly the quantity this Sub puts numbers on.
              </>
            }
          />

          <SectionRule />

          <CommonMistake
            title="Forgetting to convert cm² to m² before plugging into Φ = B × A"
            whatHappens={
              <>
                The exam gives you a coil with area <strong>50 cm²</strong> in a field of{' '}
                <strong>0.4 T</strong>. You write Φ = 0.4 × 50 = 20 Wb and confidently underline
                it. But 20 Wb is enormous — bigger than the flux inside a small transformer. The
                actual answer is{' '}
                <strong>0.4 × 0.005 = 0.002 Wb (2 mWb)</strong>. You’ve dropped a factor of
                10,000.
              </>
            }
            doInstead={
              <>
                Always convert the area to <strong>square metres</strong> first: 1 cm² = 0.0001
                m² = 1 × 10⁻⁴ m². So 50 cm² = 50 × 10⁻⁴ = 0.005 m². Then plug into Φ = B × A. The
                same trap catches people with mm² (1 mm² = 1 × 10⁻⁶ m²). Get the units right
                before you press the equals sign.
              </>
            }
          />

          <Scenario
            title="The data sheet says ‘core flux density 1.5 T’ — what does that actually tell you?"
            situation={
              <>
                You’re reading the spec sheet for a 100 kVA transformer the project manager has
                ordered. One line reads <strong>"Peak core flux density: 1.5 T"</strong>. The
                manager asks you what it means in plain language.
              </>
            }
            whatToDo={
              <>
                Tell them: 1.5 tesla is how packed the magnetic field gets inside the silicon
                steel core at the peak of each AC cycle. That figure is chosen by the designer
                deliberately — high enough to make the transformer compact and efficient, but low
                enough to stay below the saturation point of the steel (around 1.7-2.0 T). Push
                higher and the core overheats and the transformer wastes energy and trips on
                temperature.
              </>
            }
            whyItMatters={
              <>
                Knowing what the numbers mean stops you nodding along to specifications you don’t
                understand. It also helps you spot when a contractor is pulling a fast one — for
                example, claiming a transformer rating that the core size simply can’t physically
                deliver without saturating. Φ = B × A puts a hard limit on what’s possible.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Magnetic flux Φ is the total amount of field through a surface. Unit: weber (Wb).',
              'Magnetic flux density B is the field per square metre. Unit: tesla (T), where 1 T = 1 Wb/m².',
              'Φ = B × A — the one equation you need to remember. Rearrange to find any of the three.',
              'Always convert areas from cm² or mm² to m² before plugging into the formula. That’s where most exam marks get lost.',
              'High-permeability cores (silicon steel, ferrite) concentrate flux thousands of times more than air — that’s why every transformer and motor has one.',
              'Iron and steel saturate around 1.7-2.0 T. Designers aim for around 1.5 T at peak — close to the limit but stable.',
            ]}
          />

          <Quiz title="Magnetic flux and flux density — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/level2/module2/section5/5-1')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.1 Magnets, poles, attraction and repulsion
              </div>
            </button>
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/level2/module2/section5/5-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.3 Magnetic effect of current — fields, solenoids
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
