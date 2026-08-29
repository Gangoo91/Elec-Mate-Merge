/**
 * Module 2 · Section 4 · Subsection 6 — Building Acoustics and Compliance
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Reverberation time and the Sabine relationship, absorption versus insulation,
 *   airborne and impact transmission, flanking paths, NR-style criteria for
 *   services noise, and the Approved Document E compliance landscape.
 */

import { useNavigate } from 'react-router-dom';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Building Acoustics and Compliance - HNC Module 2 Section 4.6';
const DESCRIPTION =
  'Reverberation time and the Sabine relationship, absorption versus sound insulation, airborne and impact transmission, flanking paths, NR criteria for services noise, and the Approved Document E compliance landscape.';

const quickCheckQuestions = [
  {
    id: 'db-summation',
    question:
      'Two identical fans, running independently, each produce the same sound pressure level at a listening position. What is the combined level?',
    options: [
      'The same level as one fan',
      'About 3 dB higher than one fan',
      'Double the level in dB',
      'About 10 dB higher than one fan',
    ],
    correctIndex: 1,
    explanation:
      'Two equal, uncorrelated sources double the acoustic power at that point, and a doubling of power is +10 log(2) = +3 dB. Levels in decibels are logarithmic, so they never add arithmetically.',
  },
  {
    id: 'absorption-vs-insulation',
    question:
      'A tenant complains of hearing the neighbouring flat through the party wall. They line their side of the wall with open-cell acoustic foam. What happens?',
    options: [
      'The wall now blocks far more sound between the flats',
      'Their own room sounds less live, but the neighbour is still audible',
      'The impact sound from the floor above is fixed as well',
      'The mass of the wall has been effectively doubled',
    ],
    correctIndex: 1,
    explanation:
      'Foam absorbs sound arriving at its surface, which shortens reverberation inside the room. It adds almost no surface mass and does nothing to the transmission path, so sound insulation between the flats is essentially unchanged. Absorption and insulation are different problems.',
  },
  {
    id: 'flanking-path',
    question:
      'A separating wall is upgraded to a much heavier construction, but the measured performance barely improves. What is the most likely cause?',
    options: [
      'The absorption coefficient of the wall finish is too low',
      'The reverberation time of the receiving room is too short',
      'Sound is flanking around the wall through the connected structure',
      'The new wall is too heavy for the mass law to apply',
    ],
    correctIndex: 2,
    explanation:
      'Flanking transmission bypasses the separating element through junctions, continuous screeds, continuous cavity leaves, ceiling voids and service penetrations. Once flanking dominates, further upgrading the direct partition buys almost nothing.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What physically is sound in air?',
    options: [
      'A transverse electromagnetic wave',
      'A longitudinal pressure wave in the air',
      'A flow of charged particles through the air',
      'A standing wave that requires a solid medium',
    ],
    correctAnswer: 1,
    explanation:
      'Sound in air is a longitudinal wave: alternating compressions and rarefactions of air pressure travelling outwards from a vibrating source. It needs a medium, which is why vibration isolation and air gaps are such powerful control measures.',
  },
  {
    id: 2,
    question: 'The decibel scale is logarithmic. What does a 10 dB increase represent?',
    options: [
      'Ten times the sound power, and subjectively about twice as loud',
      'Ten times the sound power, and subjectively ten times as loud',
      'Twice the sound power, and subjectively twice as loud',
      'Ten times the frequency of the sound',
    ],
    correctAnswer: 0,
    explanation:
      'Each 10 dB step is a factor of ten in acoustic power. Subjective loudness does not follow power linearly: a 10 dB rise is generally reported as roughly a doubling of loudness, while a 3 dB rise (double the power) is only just noticeable.',
  },
  {
    id: 3,
    question: 'What does A-weighting do to a measured sound spectrum?',
    options: [
      'It amplifies the low frequencies to match the ear',
      'It removes all frequencies above the speech range',
      'It converts sound power level into sound pressure level',
      'It de-emphasises low frequencies to approximate the ear response',
    ],
    correctAnswer: 3,
    explanation:
      'A-weighting applies a frequency-dependent filter that reduces the contribution of low frequencies, roughly following the ear reduced sensitivity there at moderate levels. It produces a single number in dB(A) but hides low-frequency detail.',
  },
  {
    id: 4,
    question: 'What is an absorption coefficient?',
    options: [
      'The fraction of incident sound energy not reflected by a surface, from 0 to 1',
      'The mass per unit area of a surface in kg/m²',
      'The reduction in level in dB across a partition',
      'The ratio of reverberation time to room volume',
    ],
    correctAnswer: 0,
    explanation:
      'The absorption coefficient (alpha) runs from 0 (perfectly reflective) to 1 (all incident energy absorbed or transmitted away). It is frequency dependent, so it is quoted per octave band, not as a single figure.',
  },
  {
    id: 5,
    question: 'How is reverberation time T60 defined?',
    options: [
      'The time for a source to reach steady state in a room',
      'The time for the sound level to decay by 60 dB after the source stops',
      'The time taken for sound to travel 60 metres in air',
      'The time for the level to fall to 60% of its original value',
    ],
    correctAnswer: 1,
    explanation:
      'T60 is the time in seconds for the sound pressure level in a room to fall by 60 dB after the source is switched off. In practice it is measured over a smaller decay range and extrapolated.',
  },
  {
    id: 6,
    question:
      'Using RT = 0.161 V / A, what happens to reverberation time if the total absorption A is doubled while the volume stays the same?',
    options: ['It doubles', 'It halves', 'It is unchanged', 'It falls by 60 dB'],
    correctAnswer: 1,
    explanation:
      'Absorption appears in the denominator, so doubling the total absorption in m² sabins halves the reverberation time. This is why adding an absorbent ceiling has such a dramatic effect on a hard-finished room.',
  },
  {
    id: 7,
    question: 'Which of these is an impact sound problem rather than an airborne sound problem?',
    options: [
      'Speech from the flat next door through the party wall',
      'A television heard through a lightweight partition',
      'Footfall from the flat above heard through the floor',
      'Fan noise heard through a supply air grille',
    ],
    correctAnswer: 2,
    explanation:
      'Impact sound is energy injected directly into the structure — footsteps, dropped objects, machinery feet — which then radiates as airborne sound in the receiving room. Speech, television and fan noise all start as airborne sound.',
  },
  {
    id: 8,
    question: 'What does the mass law describe, qualitatively?',
    options: [
      'That sound insulation improves as surface mass and frequency increase',
      'That absorption improves as material thickness increases',
      'That reverberation time increases with room volume',
      'That sound power falls with the square of distance',
    ],
    correctAnswer: 0,
    explanation:
      'In the mass-controlled region, the transmission loss of a single leaf rises with both its surface mass and the frequency of the sound. It is a guide, not a guarantee: stiffness, panel resonance, the coincidence dip and any air leak all limit real performance.',
  },
  {
    id: 9,
    question: 'What is an NR (Noise Rating) curve used for in a building services specification?',
    options: [
      'Rating the sound insulation of a separating floor',
      'Rating the absorption of a suspended ceiling tile',
      'Rating the octave-band spectrum of steady background noise from services',
      'Rating the impact of footfall on a floating floor',
    ],
    correctAnswer: 2,
    explanation:
      'NR curves are a family of octave-band curves. The NR of a measured spectrum is the lowest curve that no octave band exceeds. Because they work band by band, they catch the low-frequency rumble that a single dB(A) figure can hide.',
  },
  {
    id: 10,
    question:
      'Which Building Regulations approved document covers resistance to the passage of sound in England?',
    options: [
      'Approved Document B',
      'Approved Document E',
      'Approved Document L',
      'Approved Document P',
    ],
    correctAnswer: 1,
    explanation:
      'Approved Document E covers resistance to the passage of sound — sound insulation between and within dwellings and rooms for residential purposes, reverberation in common internal parts, and acoustic conditions in schools. Always work from the current edition for any figure.',
  },
];

const faqs = [
  {
    question: 'Why can I not just add absorption to fix a noise complaint between two rooms?',
    answer:
      'Because absorption and insulation solve different problems. Absorption controls the sound field inside a room: it soaks up reflected energy, shortens reverberation and lowers the reverberant level. Insulation controls how much energy crosses from one space to another, and it is driven by mass, decoupling, damping and above all airtightness. A porous absorber is lightweight and open — exactly the wrong properties for blocking transmission. Treat the room with absorption when it sounds live or echoey; treat the construction when the neighbour is audible.',
  },
  {
    question: 'Is a short reverberation time always better?',
    answer:
      'No. Short reverberation suits speech clarity — meeting rooms, classrooms, open-plan offices, call centres. But an over-damped room feels oppressive and dead, speech loses natural reinforcement so people raise their voices, and music loses body. Rooms for music generally want longer reverberation than rooms for speech, and large volumes naturally reverberate longer than small ones. The design target comes from the use of the space and the project specification, not from a general preference for less.',
  },
  {
    question: 'Why does the same fan sound fine on paper as dB(A) and still generate complaints?',
    answer:
      'Because a single A-weighted figure discards the shape of the spectrum. A-weighting deliberately discounts low frequencies, so a fan with a strong low-frequency rumble or a discrete blade-passing tone can meet a dB(A) figure and still be intrusive — the ear picks tones and rumble out of a steady background very readily. Octave-band criteria such as NR are used precisely because they are evaluated band by band, and a specification that names a tonal character penalty is stricter again.',
  },
  {
    question: 'What is flanking transmission and why does it cap what I can achieve?',
    answer:
      'Flanking is any path that bypasses the element you are relying on. Common ones are a continuous floor screed running under a partition, a continuous inner leaf of a cavity wall past a separating wall junction, a ceiling void shared over the top of a partition, a floating floor bridged by rigid skirting, back-to-back sockets, and unsealed service penetrations. Total transmission is the sum of the direct and all flanking paths, so once flanking dominates the result, upgrading the direct partition changes the measurement barely at all. This is why junction detailing and sealing get as much attention as the partition build-up.',
  },
  {
    question: 'How is compliance with Approved Document E actually demonstrated on site?',
    answer:
      'At awareness level there are two familiar routes for new-build attached dwellings. One is pre-completion testing, where an acoustic tester measures a sample of separating walls and floors in the finished building and reports airborne and impact performance. The other is Robust Details, where the builder registers plots against pre-approved construction details and builds strictly to them, in place of testing. Either way, the site work has to match the detail: a bridged floating floor or an unsealed penetration will show up in the numbers. Read the current edition of the approved document for the applicable values and scope — none are reproduced here.',
  },
  {
    question: 'Where does acoustics touch the electrical services specifically?',
    answer:
      'More often than people expect. Transformers and reactors hum through magnetostriction at twice the supply frequency and its harmonics, so a substation or riser next to a quiet space needs isolating and enclosing. Standby generators, UPS units and their cooling fans are among the loudest plant in a building. Luminaire drivers and dimming systems can whistle or buzz in a quiet room. And every conduit, tray, trunking run and cable that bridges an isolated plinth is a rigid connection that shorts out the vibration isolation the mechanical designer paid for. Penetrations for cables through separating walls and floors also have to be sealed acoustically as well as for fire.',
  },
];

const HNCModule2Section4_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage>
      <HubMasthead
        section="Module 2 · Section 4 · Subsection 6"
        title="Building acoustics and compliance"
        backTo="/study-centre/apprentice/h-n-c-module2-section4"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Reverberation, absorption versus insulation, airborne and impact transmission, services
          noise criteria and the compliance landscape.
        </p>

        <TLDR
          points={[
            'You treat the decibel as a logarithmic ratio: doubling sound power is +3 dB, two equal independent sources sum to +3 dB, and ten times the power is +10 dB.',
            'You separate absorption (what a room does to its own sound field) from insulation (what a construction does to sound crossing between spaces) — the single most common confusion in building acoustics.',
            'You calculate reverberation time from RT = 0.161 V / A and know that doubling the total absorption halves the reverberation time.',
            'You distinguish airborne from impact transmission, and you know flanking paths cap what any separating element can deliver.',
            'You know where compliance sits: Approved Document E for sound insulation in dwellings and residential buildings, and NR-style octave-band criteria written into the services specification for plant noise.',
          ]}
        />

        <RegsCallout
          source="Building Regulations 2010 (England) — Approved Document E: Resistance to the passage of sound"
          clause="Requirements E1 to E4 cover protection against sound from other parts of the building and adjoining buildings, protection against sound within a dwelling-house, reverberation in the common internal parts of buildings containing flats or rooms for residential purposes, and acoustic conditions in schools."
          meaning={
            <>
              Approved Document E is the compliance document you name when the question is sound
              insulation in dwellings and residential buildings. It is where separating walls and
              floors, their junction details, and the routes for demonstrating performance are dealt
              with. Design criteria for building services noise are a different matter: they come
              from the project specification, informed by industry guidance such as CIBSE and BS
              8233, and they are usually written as octave-band or NR-style limits per room type.
              This page deliberately reproduces no numeric values from either — figures change
              between editions and must be read from the current published document for the project.
            </>
          }
          cite="Source: Building Regulations 2010, Approved Document E (Resistance to the passage of sound) — gov.uk. Services noise criteria: project specification, informed by CIBSE guidance and BS 8233. Always work from the current edition."
        />

        <LearningOutcomes
          outcomes={[
            'Explain why acoustics is a building services engineering problem',
            'Use the decibel correctly as a logarithmic quantity and combine levels',
            'Distinguish sound absorption from sound insulation and select the right remedy',
            'Define reverberation time and calculate it using the Sabine relationship',
            'Distinguish airborne, impact and flanking transmission paths',
            'Describe the compliance landscape for sound insulation and services noise',
          ]}
          initialVisibleCount={3}
        />

        <SectionRule />

        <ConceptBlock
          title="Why acoustics lands on the services engineer"
          plainEnglish="Almost everything that makes noise in a finished building was installed by the services trades. If the room is too noisy, the plant is usually the reason."
        >
          <p>
            Once a building is complete and the site huts have gone, the noise sources left inside
            it are overwhelmingly building services. Fans, pumps, compressors, chillers, boilers,
            generators, lifts, transformers and the air moving through ductwork run continuously and
            predictably, which is exactly what makes them noticeable. Occupants tune out
            intermittent noise far more readily than they tune out a steady hum.
          </p>
          <p>
            <strong>The three routes plant noise takes into a quiet room:</strong>
          </p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
              <strong>Airborne:</strong> the machine radiates sound into the plant room, which then
              has to cross the plant room construction — walls, floor, roof, doors and any gap
              around them — to reach the space beyond.
            </li>
            <li>
              <strong>Duct-borne:</strong> the fan puts acoustic energy straight into the ductwork,
              which carries it past every partition in the building and delivers it at the grille.
              The duct is a purpose-built path between spaces, and it is why attenuators exist.
            </li>
            <li>
              <strong>Structure-borne:</strong> rotating and reciprocating plant vibrates its
              supports. That vibration travels efficiently through concrete and steel with very
              little loss and re-radiates as airborne noise from walls, floors and ceilings a long
              way from the plant.
            </li>
          </ul>
          <p>
            <strong>Electrical services are not exempt.</strong> Transformers hum through
            magnetostriction of the core — a tone at twice the supply frequency and its harmonics,
            so 100 Hz and above on a 50 Hz system. Standby generators and their radiators are among
            the loudest items in any building. UPS systems, inverters, and the cooling fans in comms
            rooms run day and night. Luminaire drivers and dimming equipment can buzz or whistle
            audibly in an otherwise quiet room. And every containment run, conduit and cable that
            rigidly bridges an isolated plant base short-circuits the vibration isolation somebody
            else has carefully specified.
          </p>
          <p>
            <strong>Why it matters commercially:</strong> acoustics is cheap at design stage and
            brutal after handover. A longer attenuator on a schedule is a line item; retrofitting
            one into a finished ceiling void, or re-isolating a chiller on an occupied roof, costs
            access, disruption and reputation.
          </p>
        </ConceptBlock>

        <SectionRule />

        <ConceptBlock
          title="Sound, frequency and the decibel"
          plainEnglish="Sound is a pressure wave. The decibel is a logarithm, not a unit of loudness — which is why two identical fans give you +3 dB, not double."
        >
          <p>
            Sound in air is a <strong>longitudinal pressure wave</strong>. A vibrating surface
            alternately compresses and rarefies the air next to it, and that disturbance propagates
            outwards at roughly 340 m/s in air at normal room conditions. Nothing travels with the
            wave except the disturbance itself: the air molecules oscillate about their rest
            position. Because a medium is required, an air gap or a soft resilient layer is a
            genuinely effective interruption — which is the whole basis of vibration isolation and
            cavity construction.
          </p>
          <p>
            <strong>Frequency and wavelength.</strong> Frequency f (Hz) is the number of pressure
            cycles per second and determines pitch. Wavelength follows from the speed of sound: at
            around 340 m/s, a 100 Hz tone has a wavelength of roughly 3.4 m, while a 3.4 kHz tone is
            about 100 mm. This single fact explains an enormous amount of practical acoustics.
            Low-frequency sound has wavelengths comparable with the size of rooms, doors and
            barriers, so it diffracts around obstacles, drives partitions into resonance, and needs
            thick or deep treatments. High-frequency sound behaves more like a beam: it is easily
            absorbed by thin porous layers and easily blocked by modest barriers.
          </p>
          <p>
            <strong>Octave bands.</strong> Acoustic data is almost never given as a single figure.
            The audible range is divided into octave bands, each one spanning a doubling of
            frequency, identified by their centre frequencies: 63, 125, 250, 500, 1k, 2k, 4k and 8
            kHz. Third-octave bands split each of these into three for finer work. Absorption
            coefficients, attenuator insertion losses, sound reduction indices and plant sound power
            data are all published band by band, because every one of those quantities is strongly
            frequency dependent.
          </p>
          <p>
            <strong>The decibel.</strong> The ear covers an enormous range of pressures, so sound is
            expressed logarithmically relative to a reference. Sound pressure level is Lp = 20
            log₁₀(p / p₀), where p₀ is the standard reference pressure of 20 µPa. That reference is
            why 0 dB does not mean silence — it means a pressure equal to the reference, which is
            around the threshold of hearing for a healthy young ear.
          </p>
          <p>
            <strong>The consequences of a log scale:</strong>
          </p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
              <strong>Doubling the sound power is +3 dB</strong>, because 10 log₁₀(2) = 3.01.
              Halving the power is −3 dB.
            </li>
            <li>
              <strong>Two equal, independent sources sum to +3 dB</strong> at a point, not to double
              the number. Four equal sources give +6 dB, ten give +10 dB.
            </li>
            <li>
              <strong>Ten times the power is +10 dB</strong>, and a 10 dB rise is generally reported
              as sounding about twice as loud. Loudness and power are not the same thing.
            </li>
            <li>
              <strong>Levels never add arithmetically.</strong> 60 dB plus 60 dB is 63 dB, not 120
              dB.
            </li>
            <li>
              <strong>Small differences vanish.</strong> When one source is much louder than
              another, adding the quieter one changes the total hardly at all. There is no point
              silencing the second-loudest item until the loudest is dealt with.
            </li>
          </ul>
          <p>
            <strong>Free-field distance loss.</strong> For a point source radiating into free space
            with no reflections, the same power spreads over a sphere whose area grows with the
            square of distance. Doubling the distance therefore drops the level by 6 dB. Inside a
            reverberant room this only holds close to the source; further away the reverberant field
            dominates and moving back gains you very little.
          </p>
          <p>
            <strong>A-weighting.</strong> The ear is not equally sensitive at all frequencies: at
            moderate levels it is markedly less sensitive to low frequencies. A-weighting is a
            standard filter that mimics this, discounting the low bands before the level is summed
            into a single figure, written dB(A). It is convenient and it correlates reasonably with
            annoyance for broadband noise. Its weakness is precisely its convenience: it throws away
            the spectrum. A fan with a heavy low-frequency rumble or a discrete tone can meet a
            dB(A) figure and still be intolerable, which is why services noise is usually specified
            band by band as well.
          </p>
          <p>
            <strong>An indicative ladder, for intuition only:</strong> 0 dB is the reference at the
            threshold of hearing; a quiet rural night or an unoccupied library sits around 30 dB;
            ordinary conversation at a metre is around 60 dB; a busy road at the kerb is around 80
            dB; the threshold of pain is in the region of 120 to 130 dB. Treat these as orientation,
            not as design values — design values come from the project criteria.
          </p>
        </ConceptBlock>

        <InlineCheck {...quickCheckQuestions[0]} />

        <SectionRule />

        <ConceptBlock
          title="Absorption versus insulation — the classic confusion"
          plainEnglish="Foam on the wall makes your room sound better. It does not stop your neighbour hearing you. Different problem, different physics, different product."
        >
          <p>
            This is the confusion that catches out clients, contractors and a fair number of
            engineers, and it is worth meeting head-on. Absorption and insulation are not points on
            the same scale. They are answers to two different questions.
          </p>
          <p>
            <strong>Absorption</strong> asks: what happens to sound energy when it strikes a surface
            inside a room? A porous, open, lightweight material lets the wave in, and the air
            movement within its structure loses energy to friction as heat. Absorption controls the
            sound field <em>inside</em> the room where it is fitted. It reduces reflections,
            shortens reverberation, lowers the reverberant level and improves speech clarity. It is
            measured by the absorption coefficient α, which runs from 0 for a perfectly reflective
            surface to 1 where all incident energy is absorbed or otherwise not returned. It is
            frequency dependent, so it is quoted per octave band.
          </p>
          <p>
            <strong>Insulation</strong> asks: how much energy gets from one space to another? That
            is governed by the mass of the construction, by whether the two sides are decoupled, by
            damping, and above all by airtightness. It is measured as a sound reduction index in dB,
            band by band, and it lives in the construction, not in the room finish.
          </p>
          <p>
            <strong>The properties are close to opposites:</strong>
          </p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
              <strong>Open-cell foam:</strong> excellent absorber, negligible insulator. It is light
              and porous, and a porous material is by definition not airtight.
            </li>
            <li>
              <strong>A dense solid sheet:</strong> good insulator, near-zero absorber. It is heavy
              and airtight, and it reflects almost everything back into the room.
            </li>
            <li>
              <strong>A tiled or glazed hard room:</strong> possibly well insulated from its
              neighbours and still unbearable to be in, because it has no absorption at all.
            </li>
            <li>
              <strong>An absorbent, lightweight demountable partition:</strong> a pleasant office
              acoustic and no confidentiality whatsoever.
            </li>
          </ul>
          <p>
            <strong>Diagnose before you specify.</strong> If the complaint is that the space is
            echoey, harsh, hard to hold a conversation in, or that speech carries across an open
            plan, that is a reverberation problem and absorption is the remedy. If the complaint is
            that you can hear a specific source in an adjacent space — the meeting next door, the
            neighbour, the plant room — that is a transmission problem and no amount of absorption
            on the receiving side will solve it. The two remedies do not substitute for each other,
            though a properly designed construction often contains both, using absorption inside a
            cavity or an enclosure to stop energy building up before it reaches the outer leaf.
          </p>
          <p>
            <strong>The one place absorption helps a transmission complaint</strong> is indirect: it
            lowers the reverberant level striking the partition in the source room, and the
            reverberant build-up of whatever does arrive in the receiving room. Both effects are
            real but modest, and neither substitutes for mass and sealing.
          </p>
        </ConceptBlock>

        <InlineCheck {...quickCheckQuestions[1]} />

        <SectionRule />

        <ConceptBlock
          title="Reverberation and its control"
          plainEnglish="Reverberation is how long the sound hangs about after the source stops. Hard surfaces make it long, soft surfaces make it short, and people count as soft surfaces."
        >
          <p>
            When a source runs in an enclosed space, the listener hears the direct sound plus a
            dense succession of reflections from every surface. Each reflection loses a fraction of
            its energy to the surface it strikes. When the source stops, the reflected field decays.{' '}
            <strong>
              Reverberation time, T60, is defined as the time in seconds for the sound pressure
              level in the room to fall by 60 dB after the source is switched off.
            </strong>{' '}
            In practice a 60 dB decay is hard to capture above the background, so the decay is
            measured over a smaller range and extrapolated.
          </p>
          <p>
            <strong>What drives it.</strong> Two things only, to a first approximation: the volume
            of the room, and the total absorption inside it. A large volume means the sound travels
            further between reflections, so it takes more reflections and more time to decay. More
            absorption means each reflection takes a bigger bite out of the energy. The Sabine
            relationship expresses exactly that:
          </p>
          <p>
            <strong>RT = 0.161 V / A</strong> — where RT is reverberation time in seconds, V is room
            volume in m³, and A is the total absorption in m² sabins, found by summing the area of
            every surface multiplied by its absorption coefficient: A = Σ (S × α).
          </p>
          <p>
            <strong>Reading the formula properly:</strong>
          </p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
              Volume is on top, so bigger rooms reverberate longer for the same finishes. Atria,
              sports halls and warehouses are naturally reverberant.
            </li>
            <li>
              Absorption is on the bottom, so <strong>doubling A halves RT</strong>. Equally,
              halving A doubles RT — which is what happens when a client strips a carpet and an
              absorbent ceiling out of a refurbished office.
            </li>
            <li>
              A is frequency dependent because α is, so RT must be evaluated per octave band. A room
              can be well controlled at 2 kHz and boomy at 125 Hz.
            </li>
            <li>
              It is an approximation. Sabine assumes a diffuse field with absorption spread fairly
              evenly. It over-predicts in rooms that are very absorbent or very irregular, or where
              all the absorption sits on one surface.
            </li>
          </ul>
          <p>
            <strong>Where the absorption comes from in a real building:</strong>
          </p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
              <strong>Suspended ceilings:</strong> acoustic tiles are usually the single biggest
              contributor, because the ceiling is a large uninterrupted area. A solid plasterboard
              ceiling specified for fire or aesthetics removes that absorption entirely.
            </li>
            <li>
              <strong>Floor finishes:</strong> carpet absorbs usefully at mid and high frequencies;
              hard flooring absorbs essentially nothing. Carpet swapped for hard floor is one of the
              commonest causes of a room becoming unusable after a refit.
            </li>
            <li>
              <strong>Wall treatments:</strong> fabric-faced panels, perforated linings with a
              backing, acoustic rafts and baffles where ceiling area is unavailable.
            </li>
            <li>
              <strong>Soft furnishings:</strong> curtains, upholstered seating and screens all
              contribute, and clients remove them without telling anybody.
            </li>
            <li>
              <strong>Occupants:</strong> people are effective absorbers. A full room reverberates
              noticeably less than an empty one, so an empty-room measurement is not the occupied
              condition, and a hall designed only for the full case will sound wrong when it is half
              empty.
            </li>
            <li>
              <strong>Low-frequency control:</strong> thin porous absorbers do little below a few
              hundred hertz. Deep porous layers, air gaps behind panels, membrane absorbers and
              Helmholtz-type resonators are what control the bottom end, and they need physical
              depth — a coordination issue in a tight ceiling void.
            </li>
          </ul>
          <p>
            <strong>More is not automatically better.</strong> An over-damped room sounds dead and
            oppressive; speakers lose the natural reinforcement that carries their voice, so they
            raise it, and effort goes up rather than down. Speech-critical spaces want short
            reverberation; spaces for music generally want longer. The target for any given room
            comes from its use and the project specification.
          </p>
        </ConceptBlock>

        <SectionRule />

        <ConceptBlock
          title="Worked examples"
          plainEnglish="Two Sabine calculations you can follow line by line, and a decibel addition. Every number is shown."
        >
          <p>
            <strong>Example 1: Reverberation time of a hard-finished meeting room.</strong> A
            meeting room measures 8 m × 6 m × 3 m high. The floor is carpeted, the ceiling is solid
            plaster and the walls are painted plaster. Find the reverberation time at 500 Hz.
          </p>
          <p>
            <em>Step 1 — volume.</em>
          </p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
              V = 8 × 6 × 3 = <strong>144 m³</strong>
            </li>
          </ul>
          <p>
            <em>
              Step 2 — surface areas and absorption. Coefficients below are indicative textbook
              values at 500 Hz; use the manufacturer measured data on a real job.
            </em>
          </p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
              <strong>Floor:</strong> 8 × 6 = 48 m², carpet α = 0.25 → 48 × 0.25 ={' '}
              <strong>12.00 m² sabins</strong>
            </li>
            <li>
              <strong>Ceiling:</strong> 48 m², solid plaster α = 0.05 → 48 × 0.05 ={' '}
              <strong>2.40 m² sabins</strong>
            </li>
            <li>
              <strong>Walls:</strong> perimeter = 2 × (8 + 6) = 28 m; area = 28 × 3 = 84 m², painted
              plaster α = 0.03 → 84 × 0.03 = <strong>2.52 m² sabins</strong>
            </li>
          </ul>
          <p>
            <em>Step 3 — total absorption.</em>
          </p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
              A = 12.00 + 2.40 + 2.52 = <strong>16.92 m² sabins</strong>
            </li>
          </ul>
          <p>
            <em>Step 4 — apply Sabine.</em>
          </p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>RT = 0.161 V / A = 0.161 × 144 / 16.92</li>
            <li>0.161 × 144 = 23.184</li>
            <li>
              RT = 23.184 / 16.92 = <strong>1.37 s</strong>
            </li>
          </ul>
          <p>
            That is a long reverberation time for a room whose entire purpose is speech. Expect
            complaints about intelligibility and about conference calls being hard to follow.
          </p>
          <p>
            <strong>Example 2: The effect of an absorbent ceiling.</strong> The same room is fitted
            with a mineral-fibre suspended ceiling, α = 0.70 at 500 Hz. Nothing else changes.
          </p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
              New ceiling absorption = 48 × 0.70 = <strong>33.60 m² sabins</strong> (was 2.40)
            </li>
            <li>
              New total A = 12.00 + 33.60 + 2.52 = <strong>48.12 m² sabins</strong>
            </li>
            <li>RT = 23.184 / 48.12</li>
            <li>
              RT = <strong>0.48 s</strong>
            </li>
          </ul>
          <p>
            One change of finish has taken the room from 1.37 s to 0.48 s — a factor of nearly three
            — because total absorption went up by nearly a factor of three. This is the practical
            meaning of absorption sitting in the denominator, and it is why the ceiling is the first
            thing an acoustician asks about.
          </p>
          <p>
            <strong>Example 3: Sizing wall panels to hit a target.</strong> Suppose the suspended
            ceiling is not available and the target for the original hard room is 0.80 s at 500 Hz.
            How much wall panelling of α = 0.85 is needed?
          </p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Rearrange Sabine for the absorption required: A = 0.161 V / RT</li>
            <li>
              A required = 23.184 / 0.80 = <strong>28.98 m² sabins</strong>
            </li>
            <li>
              Absorption already present = 16.92 m² sabins, so the shortfall is 28.98 − 16.92 ={' '}
              <strong>12.06 m² sabins</strong>
            </li>
            <li>
              <strong>Careful:</strong> panels mounted on the wall cover wall area that already had
              α = 0.03, so the <em>net</em> gain per square metre is 0.85 − 0.03 = 0.82, not 0.85.
            </li>
            <li>
              Panel area = 12.06 / 0.82 = <strong>14.7 m²</strong>
            </li>
            <li>
              <em>Check:</em> 14.7 × 0.82 = 12.05 m² sabins gained; A = 16.92 + 12.05 = 28.97; RT =
              23.184 / 28.97 = <strong>0.80 s</strong> ✓
            </li>
          </ul>
          <p>
            Roughly 15 m² of panel out of 84 m² of available wall — a plausible scheme. Forgetting
            to deduct the covered surface is a common slip; on a room with a more absorbent existing
            finish it would leave the design meaningfully short.
          </p>
          <p>
            <strong>Example 4: Combining two plant items.</strong> A fan produces 65 dB at a
            listening position and a nearby pump produces 59 dB. What is the total?
          </p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
              Convert each to a power ratio: 10^(65/10) = 3.162 × 10⁶ and 10^(59/10) = 0.794 × 10⁶
            </li>
            <li>Sum the ratios: 3.162 × 10⁶ + 0.794 × 10⁶ = 3.956 × 10⁶</li>
            <li>
              Convert back: 10 log₁₀(3.956 × 10⁶) = <strong>66.0 dB</strong>
            </li>
          </ul>
          <p>
            The pump, 6 dB quieter, adds only 1 dB to the total. Silencing the pump alone can gain
            at most that 1 dB, so the fan is the item worth spending money on. Note the contrast
            with two <em>equal</em> sources: 65 dB and 65 dB would give 68.0 dB, the familiar +3 dB.
          </p>
        </ConceptBlock>

        <SectionRule />

        <ConceptBlock
          title="Airborne, impact and flanking transmission"
          plainEnglish="Airborne = the sound starts in the air. Impact = the sound starts in the structure. Flanking = the sound goes round the wall you were relying on."
        >
          <p>
            Sound insulation between spaces is assessed against two distinct excitation types,
            because the physics and the remedies differ.
          </p>
          <p>
            <strong>Airborne transmission.</strong> A source radiates into the air of the source
            room — speech, a television, a radio, a fan. The airborne pressure field drives the
            separating construction into vibration, and the construction re-radiates sound into the
            receiving room. Resistance is dominated by:
          </p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
              <strong>Mass:</strong> heavier constructions are harder to drive. This is the mass law
              — in the mass-controlled region, transmission loss rises with both surface mass and
              frequency, so heavy walls beat light ones and high frequencies pass less easily than
              low ones. A useful rule of thumb, not a law of nature.
            </li>
            <li>
              <strong>Decoupling:</strong> two independent leaves with a cavity outperform a single
              leaf of the same total mass, because there is no rigid path for the vibration to
              cross. Absorption in the cavity improves it further. Any rigid tie, bridging fixing or
              debris in the cavity partly undoes the benefit.
            </li>
            <li>
              <strong>Damping and stiffness:</strong> real panels resonate and suffer a coincidence
              dip where the bending wavelength in the panel matches the airborne wavelength. At
              those frequencies performance falls well below what mass alone would predict.
            </li>
            <li>
              <strong>Airtightness:</strong> a small unsealed gap can dominate the result no matter
              how good the construction. Sound follows air. An undersealed door, an open ceiling
              void, an unfilled socket box or an unsealed cable penetration will define the outcome.
            </li>
          </ul>
          <p>
            <strong>Impact transmission.</strong> Here the energy is injected directly into the
            structure: footfall, dropped objects, furniture dragged across a floor, a machine foot
            hammering its plinth. There is no airborne stage on the source side, so mass in the
            floor slab alone is a poor defence — the energy is already in the structure and travels
            through it very efficiently. Impact performance is assessed with a standardised tapping
            machine on the floor above and a measurement below, and the descriptors are the opposite
            way round from airborne ones: for impact, a lower measured level is better, whereas for
            airborne insulation a higher figure is better. The remedies are resilient: soft floor
            coverings, resilient underlays, floating floor constructions on resilient layers, and
            isolated ceilings beneath.
          </p>
          <p>
            <strong>Flanking transmission.</strong> Total transmission between two rooms is the sum
            of the direct path through the separating element and every path that bypasses it. Once
            the flanking sum approaches the direct path, upgrading the separating element stops
            buying anything measurable — which is exactly the situation where site teams have
            already spent the money and cannot understand why the test failed.
          </p>
          <p>
            <strong>Common flanking paths:</strong>
          </p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>A continuous floor screed running unbroken beneath a separating partition</li>
            <li>
              A continuous inner leaf of an external cavity wall past a separating wall junction
            </li>
            <li>A partition stopped at the suspended ceiling with a shared void above it</li>
            <li>A floating floor bridged rigidly by skirting, a pipe clip or a fixing screw</li>
            <li>Continuous window mullions, sills, and continuous perimeter trunking</li>
            <li>Back-to-back socket outlets and recessed luminaires in a common void</li>
            <li>Unsealed cable, conduit, duct and pipe penetrations</li>
            <li>
              <strong>Crosstalk:</strong> shared ductwork serving two rooms, which is a
              purpose-built acoustic short circuit between them — controlled with crosstalk
              attenuators, lined bends or separate branches
            </li>
          </ul>
          <p>
            <strong>The practical lesson:</strong> junction detailing, sealing and the discipline of
            the installing trades matter at least as much as the specification of the partition
            itself. On an electrical package that means agreeing penetration sealing, avoiding
            back-to-back accessories on separating constructions, and never letting containment form
            a rigid bridge across a designed acoustic break.
          </p>
        </ConceptBlock>

        <InlineCheck {...quickCheckQuestions[2]} />

        <SectionRule />

        <ConceptBlock
          title="Rating services noise — NR curves and the specification"
          plainEnglish="A single dB(A) number hides rumble and tones. NR curves grade the noise band by band, which is why services specs use them."
        >
          <p>
            Background noise from building services is steady, continuous and usually broadband with
            tonal components sitting on top. Rating it with one A-weighted number is convenient but
            blunt, so services specifications conventionally use an octave-band rating method, of
            which the <strong>Noise Rating (NR)</strong> family is the common UK form.
          </p>
          <p>
            <strong>How an NR rating works, conceptually:</strong>
          </p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
              NR is a family of curves plotted across the octave bands from 63 Hz to 8 kHz. Each
              curve is identified by a number.
            </li>
            <li>
              The curves slope downwards with frequency: they permit more level in the low bands
              than the high ones, mirroring the reduced sensitivity of the ear at low frequency at
              these levels.
            </li>
            <li>
              To rate a measured or predicted spectrum, plot it against the family. The NR value is
              the <strong>lowest curve that no octave band exceeds</strong>. A single offending band
              sets the rating, no matter how good the others are.
            </li>
            <li>
              That single-band rule is the point. It catches the low-frequency rumble of a large
              fan, or the blade-passing tone of an axial unit, that a dB(A) figure would average
              away.
            </li>
          </ul>
          <p>
            <strong>Where it enters the job.</strong> The project specification, informed by
            industry design guidance such as CIBSE and BS 8233, sets a criterion per room type —
            tighter in bedrooms, consulting rooms and recording spaces, looser in circulation,
            kitchens and workshops. The services engineer then has to demonstrate the design meets
            it. That is a chain calculation, band by band:
          </p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
              Start from the plant sound power level in each octave band, from the manufacturer
            </li>
            <li>
              Subtract natural attenuation along the duct run: straight runs, bends, branches, end
              reflection
            </li>
            <li>Subtract the insertion loss of any attenuator, from the manufacturer band data</li>
            <li>
              Add regenerated noise generated by the airflow itself at dampers, bends, terminal
              units and grilles — this sets a floor no attenuator can get below
            </li>
            <li>Convert to a room sound pressure level using the room absorption and distance</li>
            <li>Compare band by band against the criterion curve</li>
          </ul>
          <p>
            <strong>Regenerated noise deserves emphasis</strong> because it is the trap. Fitting a
            longer attenuator reduces the fan contribution but does nothing about noise created
            downstream of it by air moving too fast through a damper or grille. Above a certain
            velocity the terminal itself is the source, and the only fix is a bigger duct, a larger
            terminal, or less pressure to throw away. Controlling velocity is therefore an acoustic
            decision as much as an energy one.
          </p>
          <p>
            <strong>The control toolkit, in the order you reach for it:</strong>
          </p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
              <strong>At source:</strong> quieter plant run near its best efficiency point, located
              away from sensitive rooms, with sound power limits written into the purchase
              specification rather than argued after delivery.
            </li>
            <li>
              <strong>In the path:</strong> attenuators sized band by band, lined plenums, crosstalk
              attenuators between rooms on a common branch, heavy sealed plant room construction
              with acoustic doors, anti-vibration mounts and inertia bases, and flexible connections
              on every duct, pipe, conduit and cable crossing an isolation break.
            </li>
            <li>
              <strong>At the receiver:</strong> room absorption, layout that keeps desks and beds
              away from terminals, and — only as a last resort in industrial situations —
              administrative controls and hearing protection.
            </li>
          </ul>
        </ConceptBlock>

        <SectionRule />

        <ConceptBlock
          title="The compliance landscape"
          plainEnglish="Part E is the legal floor for sound insulation in homes. Services noise criteria come from the specification. Know which question you are answering."
        >
          <p>
            Two separate compliance questions get muddled constantly, and being clear about which
            one is in play is half the battle in a site meeting.
          </p>
          <p>
            <strong>
              1. Sound insulation in dwellings and residential buildings — Approved Document E.
            </strong>{' '}
            In England, the Building Regulations requirement for resistance to the passage of sound
            is supported by Approved Document E. At awareness level, its scope covers:
          </p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
              Protection against sound from other parts of the building and from adjoining buildings
              — separating walls and separating floors, for both airborne and impact sound
            </li>
            <li>Protection against sound within a dwelling-house — internal walls and floors</li>
            <li>
              Reverberation in the common internal parts of buildings containing flats or rooms for
              residential purposes — corridors, stairwells and entrance halls
            </li>
            <li>Acoustic conditions in schools</li>
          </ul>
          <p>
            <strong>How performance is demonstrated.</strong> For new-build attached dwellings there
            are two familiar routes. <strong>Pre-completion testing</strong> engages an acoustic
            tester to measure a sample of separating walls and floors in the finished building,
            reporting airborne and impact performance for comparison against the applicable values.
            Alternatively, <strong>Robust Details</strong> allows the builder to register plots
            against pre-approved separating constructions and build strictly to those details, in
            place of testing. Both routes depend entirely on workmanship: a bridged floating floor,
            a missing cavity closer, an unsealed service penetration or a back-to-back socket will
            show up in a test and will invalidate the assumptions behind a registered detail.
          </p>
          <p>
            <strong>Note deliberately:</strong> no numeric values from Approved Document E are
            reproduced anywhere on this page. The applicable figures depend on the edition, the
            nation and the construction type. Read them from the current published document for the
            project — quoting a remembered number is how people end up designing to a superseded
            requirement.
          </p>
          <p>
            <strong>2. Services noise criteria — the project specification.</strong> How loud the
            ventilation is allowed to be in a finished bedroom is not an Approved Document E
            question. It is a contractual performance question, set out in the project specification
            and the employer requirements, typically as an NR-style octave-band criterion or an
            equivalent per room type. Those criteria are informed by industry design guidance —
            CIBSE publications for building services noise and vibration, and BS 8233 for sound
            insulation and noise reduction in buildings — which the specification writer draws on.
            The services engineer demonstrates compliance by calculation at design stage and by
            commissioning measurement afterwards.
          </p>
          <p>
            <strong>3. Other regimes you will meet by name.</strong> Noise breaking out of a
            building and affecting neighbours — a rooftop chiller, a generator test, a kitchen
            extract fan — is normally handled through planning conditions and an environmental noise
            assessment, with a local authority environmental health officer as arbiter. Occupational
            noise exposure in plant rooms and workshops is a separate health and safety regime of
            exposure assessment, control measures and hearing protection. Each has its own methods
            and its own numbers; never carry a figure from one into another.
          </p>
          <p>
            <strong>Good practice on your job:</strong> fix the criterion for every sensitive room
            at the start, in writing, and record which document and edition it came from. Keep the
            calculation chain that shows the design meets it. Coordinate the acoustic details early
            with the architect and structural engineer, because most of them are junctions and voids
            rather than products. And measure at commissioning with the system balanced — a
            criterion that was never verified is a criterion that was never met.
          </p>
        </ConceptBlock>

        <SectionRule />

        <ConceptBlock
          title="Practical guidance"
          plainEnglish="The short list to carry into a design review or a site walk."
        >
          <p>
            <strong>Diagnose before you specify:</strong>
          </p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
              <strong>Room sounds echoey or speech is unclear</strong> → reverberation problem → add
              absorption, ceiling first
            </li>
            <li>
              <strong>A source in another space is audible</strong> → transmission problem → mass,
              decoupling, sealing, and check flanking
            </li>
            <li>
              <strong>Footfall or banging from above</strong> → impact problem → resilient layer,
              floating floor, isolated ceiling
            </li>
            <li>
              <strong>Steady hum or rumble when plant runs</strong> → services noise → attenuation,
              velocity, and check the vibration isolation for rigid bridges
            </li>
          </ul>
          <p>
            <strong>Data discipline:</strong>
          </p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Work in octave bands, not single figures, for any calculation that matters</li>
            <li>
              Use manufacturer measured data for absorption and insertion loss, not typical values
            </li>
            <li>Keep sound power and sound pressure clearly distinct in your working</li>
            <li>State the room condition your reverberation figures assume — empty or occupied</li>
            <li>Record the criterion, its source document and its edition alongside the result</li>
          </ul>
          <p>
            <strong>The things that ruin an otherwise sound design:</strong>
          </p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>An unsealed penetration or an undersealed door in a good partition</li>
            <li>A partition stopped at the ceiling grid with the void running over the top</li>
            <li>A single rigid conduit, pipe or taut cable bridging an isolated plant base</li>
            <li>A late client change from carpet and tiles to hard floor and plasterboard</li>
            <li>Duct velocities pushed up when the riser space shrank at coordination stage</li>
            <li>A shared duct branch serving two rooms that were supposed to be confidential</li>
          </ul>
        </ConceptBlock>

        <CommonMistake
          title="Common mistakes to avoid"
          whatHappens={
            <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
              <li>
                <strong>Absorption sold as insulation:</strong> foam on a party wall that changes
                nothing for the neighbour
              </li>
              <li>
                <strong>Adding decibels arithmetically:</strong> reporting 60 dB plus 60 dB as 120
                dB instead of 63 dB
              </li>
              <li>
                <strong>Designing on dB(A) alone:</strong> passing the number while a low-frequency
                rumble or a fan tone dominates the room
              </li>
              <li>
                <strong>Ignoring flanking:</strong> upgrading the partition when the screed, the
                void or the penetrations are setting the result
              </li>
              <li>
                <strong>Forgetting regenerated noise:</strong> a longer attenuator that cannot help
                because the grille itself is the source
              </li>
              <li>
                <strong>Quoting remembered compliance figures:</strong> designing to a value from a
                superseded edition instead of reading the current document
              </li>
            </ul>
          }
          doInstead="Diagnose the mechanism before choosing a product — absorption for reverberation, mass and sealing for transmission, resilience for impact. Combine levels logarithmically and work band by band. Walk the flanking paths and the penetrations before you upgrade a partition. Control duct and terminal velocity so regenerated noise cannot set the floor. And read the criterion out of the current published document every time, recording its source and edition with the calculation."
        />

        <SectionRule />

        <Scenario
          title="Plant room directly above a bedroom"
          situation={
            <>
              In a mixed-use block, a ground-floor plant room containing pumps, a pressurisation set
              and an air handling unit sits directly beneath a residential bedroom on the floor
              above. The separating floor is a concrete slab. The occupier reports a continuous low
              hum that is worst at night, is audible with the windows shut, and does not change when
              the bedroom door is closed. Ventilation to the bedroom is via a separate system and
              the noise persists when it is switched off.
            </>
          }
          whatToDo={
            <>
              Read the symptoms first. Noise unaffected by closing the door and unaffected by the
              bedroom ventilation is not arriving through the air or the ductwork — it is
              structure-borne, radiating from the slab and the walls of the room itself. Confirm by
              switching plant items individually and logging octave-band levels in the bedroom, so
              the offending item and its dominant bands are identified rather than guessed. Then
              inspect the isolation: check that every pump and the AHU sits on correctly selected
              anti-vibration mounts at the right static deflection, that the mounts are evenly
              loaded and not bottomed out, and — most importantly — walk every connection for rigid
              bridges. Pipework without flexible connectors, rigid hangers into the slab, conduit
              and containment fixed to both the plant and the structure, and drainage or trap
              connections all short-circuit the isolation. Add flexible sections, resilient hangers
              and isolated supports as required, and consider an inertia base for the worst
              offender. Address the airborne component separately if measurement shows one: sealing
              the plant room construction, an acoustic door set, and treating the slab soffit.
              Re-measure against the octave-band criterion for the bedroom taken from the project
              specification, at night, with all plant in its normal operating state.
            </>
          }
          whyItMatters={
            <>
              A structure-borne complaint answered with airborne remedies is money spent for no
              change, and it destroys credibility with the client. Low-frequency hum in a bedroom is
              also the most complained-about noise problem there is, because it is steady, it is
              worst when the background is lowest, and A-weighted measurements systematically
              understate how intrusive it feels. Getting the diagnosis right — a fifteen-minute
              switching exercise — determines whether the remedial spend works.
            </>
          }
        />

        <SectionRule />

        <Scenario
          title="A noisy VAV box over an open-plan office"
          situation={
            <>
              A refurbished open-plan floor has variable air volume terminal units in the ceiling
              void. At low occupancy the floor is acceptable, but on warm afternoons when the boxes
              open up, staff seated beneath two of them report a rushing hiss and raise their voices
              to be heard. The suspended ceiling is an absorbent mineral tile, the fit-out is
              otherwise unchanged, and the AHU attenuators were specified and installed to the
              original design.
            </>
          }
          whatToDo={
            <>
              Recognise the mechanism: the noise appears only when airflow is high, so it is
              regenerated noise created at or near the terminal, not fan noise carried down the
              duct. Attenuators upstream of the box cannot fix it. Take octave-band measurements
              beneath an affected box at low and high flow to confirm the spectrum shifts with
              airflow, and compare against the criterion in the specification. Then look at what
              sets the velocity: check the box is not undersized for the design flow, check the
              pressure drop it is throwing away, and check the flexible connection to the diffuser —
              a crushed, sharply bent or over-long flexible is a very common cause of both
              turbulence and lost attenuation. Remedies in order of preference are to reduce the
              pressure drop across the terminal so it does not have to throttle so hard, to fit a
              larger box or diffuser so the same flow moves more slowly, to fit a lined discharge
              section or a small terminal attenuator, and to correct the flexible connection
              routing. Only after that consider relocating desks. Verify the fix at full design
              flow, not on a mild day.
            </>
          }
          whyItMatters={
            <>
              Regenerated noise is the one part of the chain that gets worse the harder the system
              works, so it appears late, in service, on the hottest day, when the building is full
              and the client is watching. It is also routinely misdiagnosed as fan noise, leading to
              expensive attenuator work that changes nothing. And in an open plan, raised voices are
              self-reinforcing: as soon as people speak up to beat the background, the background is
              the voices, and the floor stops working as a place to concentrate.
            </>
          }
        />

        <SectionRule />

        <FAQ items={faqs} />

        <SectionRule />

        <KeyTakeaways
          points={[
            'Sound in air is a longitudinal pressure wave; the medium is required, which is why air gaps and resilient layers are such effective interruptions.',
            'The decibel is logarithmic: doubling the sound power is +3 dB, two equal independent sources sum to +3 dB, and ten times the power is +10 dB and reads as roughly twice as loud.',
            'A-weighting produces a single dB(A) figure by discounting low frequencies — convenient, but it hides the rumble and tones that generate complaints.',
            'Work in octave bands (63 Hz to 8 kHz centres): absorption, insertion loss and sound reduction are all strongly frequency dependent.',
            'Absorption coefficient runs 0 to 1 and controls the sound field inside a room; insulation is a property of the construction and controls what crosses between rooms. They are not interchangeable.',
            'Reverberation time T60 is the time for the level to fall 60 dB after the source stops; RT = 0.161 V / A, so doubling total absorption halves the reverberation time.',
            'Airborne transmission is resisted by mass, decoupling, damping and airtightness; impact transmission is injected into the structure and needs resilient layers, not just mass.',
            'Flanking paths — continuous screeds and leaves, shared ceiling voids, bridged floating floors, back-to-back accessories, unsealed penetrations, shared ductwork — cap what any partition can deliver.',
            'NR curves rate steady services noise band by band; the rating is set by the worst single octave band, which is exactly why they are used instead of a single figure.',
            'Approved Document E is the compliance document for sound insulation in dwellings and residential buildings, with pre-completion testing or Robust Details as the demonstration routes; services noise criteria come from the project specification, informed by CIBSE and BS 8233. Read every figure from the current published document.',
          ]}
        />

        <Quiz title="Test Your Knowledge" questions={quizQuestions} />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4-5')}
            className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
          >
            <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous
            </div>
            <div className="mt-1 text-[14px] font-semibold text-white truncate">
              Noise Control Methods
            </div>
          </button>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4-7')}
            className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
          >
            <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
              Next subsection <ChevronRight className="h-3 w-3" />
            </div>
            <div className="mt-1 text-[14px] font-semibold text-black truncate">
              Standards and Guidelines
            </div>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default HNCModule2Section4_6;
