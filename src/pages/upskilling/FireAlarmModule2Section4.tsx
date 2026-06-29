import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'fam2-s4-spl',
    question:
      'BS 5839-1:2025 sets minimum sound pressure levels for fire alarm sounders. What are the three principal cases?',
    options: [
      'Three cases: 65 dB(A) general, 60 dB(A) small enclosed spaces, and 75 dB(A) at the bed-head.',
      'A single 65 dB(A) minimum applied uniformly to every area in every building type.',
      'A single 50 dB(A) minimum applied to general, enclosed and sleeping areas alike.',
      'A single 120 dB(A) minimum set at the pain threshold to cover every area.',
    ],
    correctIndex: 0,
    explanation:
      'Three minima, each at the quietest point (not an average): (a) general — 65 dB(A) anywhere a person may be present; (b) small enclosed spaces (typically <60 m² stairwells, lobbies) — 60 dB(A), reflecting the smaller volume and lower risk profile; (c) bed-head — 75 dB(A) measured at the head of the bed, calibrated to wake a sleeping person who may be protected by bedding, sleep depth and age-related hearing loss. The 75 dB(A) bed-head figure is a 2025 reaffirmation of evidence-based wake-up thresholds; lower levels do not reliably rouse a sleeping adult.',
  },
  {
    id: 'fam2-s4-tone',
    question:
      'BS 5839-1:2025 clause 15.1.12 governs use of fire alarm tones for purposes other than warning of fire. What does it permit?',
    options: [
      'Any purpose the duty-holder wants — the fire tone may be reused freely for any signalling.',
      'Music only — the tone may double as a chime or background announcement signal.',
      'Two exceptions: where the response is identical to fire, and the school class-change signal.',
      'Any purpose except music — every non-musical reuse of the fire tone is permitted.',
    ],
    correctIndex: 2,
    explanation:
      'Clause 15.1.12 permits two exceptions to the rule that evacuation tones should not be reused: (a) where the required response is identical to fire — i.e. immediate full evacuation, such as a major hazardous chemical release; and (b) in schools, where the signal marks the start or finish of class periods. The class-change signal should not exceed 10 seconds — extended from 5 seconds in 2017 to address data-lag in addressable systems. Lockdown/invacuation alarms are now acknowledged in the 2025 edition with reference to FIA guidance, but must use a different signal from the fire tone.',
  },
  {
    id: 'fam2-s4-vad',
    question:
      'A fire alarm system in a hotel uses sounders that meet the 75 dB(A) bed-head rule. The hotel also installs visual alarm devices (VADs). Which standard governs the VADs, and is BS EN 54-23 compliance always required?',
    options: [
      'BS EN 54-23 governs VADs and compliance is mandatory wherever any VAD is fitted at all.',
      'No product standard exists for VADs; performance is left entirely to the manufacturer.',
      'VADs are governed by BS EN 54-3, the same standard that covers audible sounders.',
      'BS EN 54-23 governs VADs, but is strictly required only where the VAD is the primary evacuation source.',
    ],
    correctIndex: 3,
    explanation:
      'BS EN 54-23 specifies VAD performance (light intensity, coverage volume, flash rate). Compliance is mandatory only where the VAD is the primary evacuation source — no audible sounders, or genuinely inadequate audible coverage. In a hotel with 75 dB(A) coverage at every bed-head the VAD is supplementary, supporting occupants who cannot hear the audible signal, so BS EN 54-23 is recommended but not strictly required. Accessibility guidance (Approved Document M, BS 8300) drives where supplementary VADs are provided.',
  },
  {
    id: 'fam2-s4-tone-type',
    question: 'What evacuation tone is recommended by BS 5839-1:2025 for the audible alarm signal?',
    options: [
      'A modulated slow-whoop (~800 down to 500 Hz) or two-tone (~500/1000 Hz), within the 500-1000 Hz band.',
      'Any tone the installer prefers, as the standard makes no recommendation on tone character.',
      'A continuous, unchanging monotone held at one frequency for the duration of the alarm.',
      'A spoken voice message only, with no audible tone, as the default BS 5839-1 signal.',
    ],
    correctIndex: 0,
    explanation:
      'The recommended evacuation tone is a slow whoop (sweep from approximately 800 Hz down to 500 Hz over about 1 second, repeated) or a two-tone (alternating roughly 500 Hz and 1000 Hz). Both sit in the 500-1000 Hz band of peak human auditory sensitivity, which penetrates typical building structures. The tone is harmonised so a person familiar with one fire alarm recognises it anywhere. Steady continuous tones are not recommended — the modulated character is what the brain identifies as "alarm". Voice messages are permitted (and required for PA-VAD systems under BS 5839-8) but the BS 5839-1 default is the modulated tone.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the BS 5839-1:2025 minimum sound pressure level at the QUIETEST point in a general protected area?',
    options: [
      '65 dB(A) at the quietest point, reliably above typical occupied-building ambient noise.',
      '50 dB(A) at the quietest point, matching the ambient level of a typical quiet office.',
      '85 dB(A) at the quietest point, ensuring the alarm is heard over heavy machinery noise.',
      '120 dB(A) at the quietest point, set at the threshold of pain for guaranteed attention.',
    ],
    correctAnswer: 0,
    explanation:
      'At the quietest point in any general (non-sleeping, non-small-enclosed) area where a person may be present, the sounder coverage must produce at least 65 dB(A) — a minimum at the worst point, not an average. It keeps the alarm above typical office, retail and manufacturing ambient noise and above the perception threshold of an alert adult; mid-corridor coverage often reaches 75-85 dB(A), but 65 dB(A) is the floor. Memorise 65 general, 60 small enclosed (<60 m²), 75 bed-head — unchanged from 2017 and evidence-calibrated.',
  },
  {
    id: 2,
    question:
      'For a small enclosed space such as a stairwell or lobby of less than 60 m², what is the minimum SPL?',
    options: [
      '65 dB(A) — the same general-area minimum applies, with no relaxation for small spaces.',
      '50 dB(A) — small enclosed transit spaces are relaxed by a full 15 dB below the general floor.',
      '60 dB(A) — relaxed 5 dB below the general minimum for the smaller volume and transit use.',
      '40 dB(A) — barely above the background level of a quiet, unoccupied stairwell at night.',
    ],
    correctAnswer: 2,
    explanation:
      'The 60 dB(A) threshold is 5 dB below the general 65 dB(A) minimum, reflecting the smaller volume of small enclosed spaces and their lower time-of-occupancy risk profile. A person in a small lobby is usually transiting through and will hear the higher level once they reach the corridor. The relaxation acknowledges practical sounder-loading constraints in tight stairwells while preserving audibility. Remember by exception: general 65, small enclosed 60, bed-head 75.',
  },
  {
    id: 3,
    question: 'For a sleeping-risk area, what is the minimum SPL at the BED-HEAD?',
    options: [
      '50 dB(A) at the bed-head, on the basis that a sleeping person is close to the sounder.',
      '65 dB(A) at the bed-head — the same level as the general waking-area minimum.',
      '120 dB(A) at the bed-head, set well above the pain threshold to guarantee waking.',
      '75 dB(A) measured at the head of the bed itself, not in the room or corridor outside.',
    ],
    correctAnswer: 3,
    explanation:
      'The 75 dB(A) bed-head minimum is measured at the head of the bed and is calibrated against evidence-based wake-up thresholds for sleeping adults — including those protected by bedding, sleep depth and age-related hearing loss. Lower levels do not reliably rouse a sleeping person; residential-fire investigations repeatedly cite inadequate bed-head SPL as a contributory factor to fatality. It is the highest of the three minima and the hardest to achieve — a closed bedroom door attenuates 15-20 dB, so the fix is usually a sounder/sounder-base inside the room or PA-VAD with voice messaging.',
  },
  {
    id: 4,
    question: 'What frequency range is recommended for fire alarm sounder tones?',
    options: [
      '500 to 1000 Hz, matching peak human auditory sensitivity and penetrating building structures.',
      '50 to 100 Hz, a low rumble chosen because bass frequencies travel furthest through walls.',
      'Around 20 kHz, at the very top of the human hearing range for maximum urgency.',
      'A single fixed tone of 50 Hz, matched to the mains supply frequency for stability.',
    ],
    correctAnswer: 0,
    explanation:
      'The recommended 500-1000 Hz band carries the BS 5839-1 evacuation tone (slow whoop sweeping ~500-800 Hz, or two-tone alternating ~500/1000 Hz) and corresponds to peak human auditory sensitivity, penetrating walls, doors and partitions with little attenuation. Tones much below 500 Hz are absorbed by soft furnishings and lose directional cues; tones much above 1000 Hz attenuate sharply through doors. The choice is hearing-physiology, not arbitrary — the tone must both penetrate the building and reach the listener.',
  },
  {
    id: 5,
    question:
      'BS 5839-1:2025 clause 15.1.12 permits fire alarm evacuation tones to be used for purposes OTHER than fire under what conditions?',
    options: [
      'Never — the fire evacuation tone may only ever signal an actual fire, with no exceptions.',
      'For any purpose the building manager chooses, provided occupants are briefed in advance.',
      'Two exceptions: where the response is identical to fire, and the school class-change signal.',
      'For any purpose, but only with prior written approval from the Fire and Rescue Service.',
    ],
    correctAnswer: 2,
    explanation:
      'Clause 15.1.12 permits two exceptions: (a) where the required response is identical to fire — immediate full evacuation, e.g. a hazardous chemical release; and (b) in schools, marking the start or finish of class periods. The class-change signal should not exceed 10 seconds (extended from 5 seconds in 2017 to address addressable-system data lag). Lockdown/invacuation use is now acknowledged with reference to FIA guidance, but the lockdown signal must differ from the fire evacuation tone. The principle holds: distinct signals for distinct responses, except where responses are identical.',
  },
  {
    id: 6,
    question: 'Which BS EN standard governs visual alarm devices (VADs)?',
    options: [
      'BS EN 54-3, the product standard that covers fire alarm sounders and their output.',
      'BS EN 50291, the product standard for domestic carbon monoxide detection devices.',
      'BS EN 54-7, the product standard for point-type optical and ionisation smoke detectors.',
      'BS EN 54-23, the product standard specifying VAD light intensity, coverage and flash.',
    ],
    correctAnswer: 3,
    explanation:
      'BS EN 54-23 specifies VAD optical performance — light intensity, coverage volume, flash characteristics, red colour and mounting. Compliance is required where the VAD is the primary evacuation source (e.g. inadequate audible coverage). Where the VAD is supplementary to compliant audible coverage, BS EN 54-23 is recommended but not strictly mandatory; accessibility guidance (Approved Document M / BS 8300) drives where supplementary VADs are needed. It is a relatively recent EN 54 addition (published 2010) — check the design intent before procurement.',
  },
  {
    id: 7,
    question:
      'A school wants to use the fire alarm sounders for the start-of-class signal. Per BS 5839-1:2025, what duration limit applies to the class-change signal?',
    options: [
      '10 seconds maximum, extended from 5 seconds in 2017 to address addressable-system data lag.',
      'No limit applies, provided staff are trained to recognise the class-change signal.',
      '60 seconds, long enough for pupils to move between rooms before the signal stops.',
      '5 minutes, mirroring the minimum alarm duration required for a genuine evacuation.',
    ],
    correctAnswer: 0,
    explanation:
      'Clause 15.1.12 limits the class-change signal to no more than 10 seconds. The duration was extended from 5 seconds in 2017 because, in some addressable installations, panel processing and bus communication consumed enough of the 5-second window that not all sounders received and ceased the signal in time. The 10-second value provides margin while keeping the signal clearly distinct from a fire alarm (which persists much longer). Schools with existing 5-second signals should reprogram to 10 seconds at the next modification.',
  },
  {
    id: 8,
    question: 'What is the recommended evacuation tone for BS 5839-1 systems?',
    options: [
      'A steady, continuous single-frequency tone held at a constant pitch and volume.',
      'A traditional rotating mechanical bell, as used in older manually operated systems.',
      'A modulated slow-whoop or two-tone in the 500-1000 Hz band, the BS 5839-1 standard.',
      'A high-pitched whistle blast, chosen to cut through general background noise.',
    ],
    correctAnswer: 2,
    explanation:
      'The recommended evacuation tone is typically a slow whoop (sweep ~800 down to ~500 Hz over about 1 second, repeated) or a two-tone (alternating ~500 and 1000 Hz), both within the 500-1000 Hz band. The modulated rising-falling or alternating character is what the brain reliably identifies as "alarm" — distinct from telephone rings, doorbells and machinery noise. Steady tones are not recommended. Voice evacuation messages are an option (BS 5839-8 PA-VAD) but the BS 5839-1 default is the modulated tone.',
  },
  {
    id: 9,
    question:
      'For a hotel with audible coverage meeting the 75 dB(A) bed-head minimum, are VADs required in every bedroom?',
    options: [
      'Yes — a VAD is mandatory in every bedroom regardless of the audible coverage achieved.',
      'Yes, but only one VAD is needed for the whole sleeping floor, sited in the corridor.',
      'No — sounders are always sufficient, and VADs are never required in sleeping accommodation.',
      'Not by BS 5839-1, but accessibility law drives targeted VAD provision in accessible and on-request rooms.',
    ],
    correctAnswer: 3,
    explanation:
      'The audible coverage already meets the BS 5839-1 requirement, so VADs are not required by that standard. However, accessibility guidance (Approved Document M, BS 8300, the Equality Act 2010) requires reasonable adjustment for occupants who cannot hear the signal: typically VADs as standard in a defined percentage of bedrooms (often 5-10 percent of accessible rooms) plus additional VADs on request for hearing-impaired guests. Where an older building cannot meet the 75 dB(A) bed-head minimum, VADs may become the primary evacuation source and BS EN 54-23 compliance becomes mandatory.',
  },
  {
    id: 10,
    question:
      'A sounder/VAD circuit is being calculated for loop loading. What information do you need to size the circuit?',
    options: [
      'Operating and quiescent current per device, cable resistance, battery capacity and panel circuit rating.',
      'Only the panel rating — once the panel current limit is known, no other figure is needed.',
      'Only the standby battery capacity, since the battery alone determines how many devices fit.',
      'Only the total cable length of the circuit, which fixes the device count on its own.',
    ],
    correctAnswer: 0,
    explanation:
      'You need the operating (alarm) current and quiescent current of each device, the cable resistance, the standby battery capacity and the panel circuit rating. Devices typically draw 3-30 mA quiescent and 30-200 mA active (depending on volume and VAD intensity). Total active current must not exceed the panel circuit rating, and battery capacity must support 24 hours quiescent plus 30 minutes alarm (the BS 5839-1:2025 minimum). The combination of high alarm current, end-of-line voltage drop and battery capacity must balance; manufacturer software handles the detail, but understanding the inputs lets you sanity-check the output.',
  },
];

const FireAlarmModule2Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Sounders and VADs | Fire Alarm Module 2.4 | Elec-Mate',
    description:
      'BS 5839-1:2025 sounder and VAD rules: 65 / 60 / 75 dB(A) minima, 500-1000 Hz tone, slow-whoop and two-tone evacuation signals, BS EN 54-23 VADs, clause 15.1.12 tone-use rules including 10-second class-change and lockdown acknowledgement.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 4"
            title="Sounders and VADs"
            description="The output side of the system. Audible signals to wake or alert occupants, visual signals to reach those who cannot hear. BS 5839-1:2025 sets sound pressure levels, tone characteristics, and the new clause 15.1.12 framework for non-fire use of fire alarm tones."
            tone="yellow"
          />

          <TLDR
            points={[
              'Sound pressure levels (clause 15) — minimum 65 dB(A) general / 60 dB(A) small enclosed (<60 m²) / 75 dB(A) at bed-head. Measured at the QUIETEST point, not averaged.',
              'Frequency — recommended 500-1000 Hz band; BS 5839-1 evacuation tone is slow-whoop (sweep) or two-tone (alternating).',
              'Tone purpose (clause 15.1.12) — fire alarm evacuation tone should not be used for other purposes EXCEPT (a) where response is identical to fire, or (b) in schools for class-change ≤ 10 seconds (extended from 5 s in 2017).',
              'Lockdown / invacuation — now ACKNOWLEDGED in BS 5839-1:2025 with reference to FIA guidance. Lockdown signal must be DIFFERENT from fire evacuation tone.',
              'VADs — BS EN 54-23 product standard. Compliance MANDATORY where VAD is primary evacuation source, RECOMMENDED where supplementary to compliant audible coverage.',
              'Accessibility — Approved Document M / BS 8300 / Equality Act 2010 drive WHERE VADs are needed in addition to audible (accessible rooms, on-request provision).',
              'Circuit calculation — sounder/VAD loop loading must support 24-hour quiescent + 30-minute alarm on standby battery, with cable voltage drop, end-of-line current and panel circuit rating all in balance.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply the BS 5839-1:2025 SPL minima: 65 dB(A) general, 60 dB(A) small enclosed (<60 m²), 75 dB(A) at bed-head — measured at the quietest point',
              'Recognise the 500-1000 Hz frequency recommendation and the slow-whoop and two-tone BS 5839-1 evacuation signals',
              'Apply clause 15.1.12 tone-use rules: identical-response exception, school class-change ≤ 10 seconds (NEW 2025 from 5 s), lockdown signal must differ from fire tone',
              'Identify the BS 5839-1:2025 acknowledgement of lockdown / invacuation systems and the cross-reference to FIA guidance',
              'Distinguish BS EN 54-23 mandatory primary-VAD compliance from supplementary VAD where audible coverage is compliant',
              'Apply Approved Document M / BS 8300 / Equality Act 2010 accessibility drivers for VAD provision in addition to audible',
              'Size sounder/VAD circuits for the 24-hour quiescent + 30-minute alarm standby battery requirement',
              'Audit existing sounder/VAD installations against the 65/60/75 dB(A) rule and identify upgrade needs',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Sound pressure level — clause 15</ContentEyebrow>

          <ConceptBlock
            title="The 65 / 60 / 75 dB(A) trio"
            plainEnglish="BS 5839-1:2025 specifies minimum sound pressure levels for fire alarm sounders at the QUIETEST point in the protected area where a person may be present. Three cases: 65 dB(A) for general areas; 60 dB(A) for small enclosed spaces (typically less than 60 m² stairwells, lobbies); 75 dB(A) at the head of any bed in sleeping-risk accommodation. The numbers are MINIMA, not averages — at the worst point in the protected area, the alarm signal must reach at least these levels."
            onSite="Bring an SPL meter to the commissioning visit. Measure at multiple points throughout the protected area, with all doors closed (the worst case for inter-room attenuation), with the alarm sounders operating. The reading at the quietest point must meet the 65/60/75 minimum for that area type. Bedroom measurements are taken with the bedroom door closed and the meter at bed-head height; corridor measurements are typically taken in the centre of the longest run with all doors to side rooms closed."
          >
            <p>The three thresholds and their rationale:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>65 dB(A) — general areas.</strong> Reliably above typical office, retail and
                manufacturing ambient noise (40-55 dB(A)). Reliably above the perception threshold
                for an alert adult. The 65 dB(A) floor ensures the alarm signal is unambiguously
                noticeable, not a marginal background noise.
              </li>
              <li>
                <strong>60 dB(A) — small enclosed spaces (&lt; 60 m²).</strong> 5 dB relaxation for
                stairwells, lobbies and similar small transit spaces. Reflects practical
                sounder-loading constraints and the lower time-of-occupancy risk profile (people are
                typically transiting through, not occupying for long periods).
              </li>
              <li>
                <strong>75 dB(A) — bed-head in sleeping-risk areas.</strong> 10 dB above the general
                threshold to reliably ROUSE A SLEEPING PERSON. Calibrated against evidence-based
                wake-up thresholds; lower levels do not reliably wake adults, particularly older
                adults with age-related hearing loss. Measurement is AT the bed-head with the door
                CLOSED.
              </li>
              <li>
                <strong>Margin in design.</strong> The values are minima — design for at least 5 dB
                margin at the worst point. Cable losses, sounder ageing, and unforeseen acoustic
                obstructions (added soft furnishings, partition walls erected post-commissioning)
                can erode commissioning-time margins. A design that just-meets the minimum at
                commissioning may fail later.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 15 (sound pressure levels)"
            clause={
              <>
                The minimum sound pressure level produced by fire alarm sounders should be: 65 dB(A)
                in any general area where a person may be present; 60 dB(A) in small enclosed spaces
                (typically less than 60 m²) such as stairwells and lobbies; and 75 dB(A) at the head
                of any bed in sleeping-risk accommodation, measured with the bedroom door closed.
                These values are MINIMA at the QUIETEST point in the protected area, not averages.
              </>
            }
            meaning="The 65 / 60 / 75 dB(A) trio is the load-bearing acoustic rule for sounder design. At the quietest point in the protected area, the alarm must reach at least these levels. In bedroom design particularly, the closed-door bed-head measurement reveals coverage shortfalls invisible to corridor SPL readings — many older systems with corridor-mounted sounders fall short at the bed-head when the bedroom door attenuates the signal by 15-20 dB."
          />

          <ConceptBlock
            title="Frequency and tone — what makes an alarm sound like an alarm"
            plainEnglish="The BS 5839-1 evacuation tone is in the 500-1000 Hz frequency band and uses one of two characteristic modulations: slow whoop (a frequency sweep from approximately 800 Hz down to 500 Hz over about 1 second, repeated) or two-tone (alternating between approximately 500 Hz and 1000 Hz). Both are widely recognisable; both are within the peak human-auditory-sensitivity band; both penetrate typical building structures with minimal attenuation. Steady continuous tones are NOT recommended — the modulated character of slow-whoop and two-tone is the cue the brain identifies as 'alarm'."
          >
            <p>Why these design choices:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>500-1000 Hz frequency band.</strong> Peak sensitivity of the human auditory
                system. Penetrates typical building structures (walls, doors, partitions) with
                relatively little attenuation. Lower frequencies (&lt; 500 Hz) are absorbed by soft
                furnishings and lose directional information; higher frequencies (&gt; 1000 Hz)
                attenuate sharply through doors and walls.
              </li>
              <li>
                <strong>Modulated character.</strong> Slow-whoop sweep or two-tone alternation
                differentiates the alarm from steady ambient sounds (fans, machinery, traffic). The
                brain recognises the modulation as 'alarm' more reliably than a steady tone.
              </li>
              <li>
                <strong>Universal recognisability.</strong> The BS 5839-1 evacuation tone is the
                same across all UK BS 5839-1 systems. A person who has heard it before in any
                building recognises it elsewhere. This harmonisation is a deliberate design choice.
              </li>
              <li>
                <strong>Voice messaging — alternative.</strong> BS 5839-8 PA-VAD systems use spoken
                voice evacuation messages instead of (or in addition to) tone signals. Voice gives
                clearer instructions but requires different system architecture and is not the
                default for BS 5839-1. PA-VAD is the right tool for very large or complex premises
                (stadiums, airports) where directional evacuation guidance is needed.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Sounder and VAD coverage diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Sounder coverage and VAD field — clause 15
            </h4>
            <svg
              viewBox="0 0 820 620"
              className="w-full h-auto"
              role="img"
              aria-label="Three coordinated diagrams. Top-left: clean floor plan showing BEDROOM A (≥75 dB(A) at bed-head), STAIRWELL <60 m² (≥60 dB(A)) and OPEN OFFICE (≥65 dB(A)) — each room labelled with its clause 15 SPL minimum INSIDE the room, no rings overlaid. Top-right: separate sounder coverage chart showing SPL falling with distance from a single sounder marker (~95 dB(A) at 1 m, ~85 dB(A) at 3 m, ~75 dB(A) at 10 m, ~65 dB(A) at 30 m) illustrating the inverse-square law without colliding with floor-plan content. Bottom: VAD field of view showing a ceiling-mounted C-3-3 VAD and a wall-mounted W-2-4-6 VAD with their coverage volumes, plus a background-noise margin strip stating ≥+5 dB above ambient lasting 30 s or longer."
            >
              {/* ===== TITLE ===== */}
              <text
                x="410"
                y="22"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="13"
                fontWeight="bold"
              >
                BS 5839-1:2025 clause 15 — sounder SPL and VAD coverage
              </text>

              {/* ===== TOP-LEFT: CLEAN FLOOR PLAN ===== */}
              <g>
                <text
                  x="195"
                  y="50"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="12"
                  fontWeight="bold"
                >
                  Floor plan — minimum SPL by room
                </text>
                <text x="195" y="66" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                  labels show clause 15 minima at the listening point
                </text>

                {/* Building outline */}
                <rect
                  x="40"
                  y="80"
                  width="370"
                  height="280"
                  rx="6"
                  fill="rgba(168,85,247,0.04)"
                  stroke="rgba(168,85,247,0.6)"
                  strokeWidth="1.5"
                />

                {/* Central corridor */}
                <rect
                  x="200"
                  y="90"
                  width="50"
                  height="260"
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                  strokeDasharray="3,2"
                />
                <text
                  x="225"
                  y="225"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="10"
                  fontWeight="bold"
                >
                  CORRIDOR
                </text>
                {/* Sounder marker in corridor (icon only, no rings here) */}
                <rect
                  x="217"
                  y="170"
                  width="16"
                  height="18"
                  rx="2"
                  fill="#FBBF24"
                  stroke="white"
                  strokeWidth="1"
                />
                <text
                  x="225"
                  y="184"
                  textAnchor="middle"
                  fill="black"
                  fontSize="10"
                  fontWeight="bold"
                >
                  S
                </text>

                {/* BEDROOM A (top-left) */}
                <rect
                  x="55"
                  y="95"
                  width="130"
                  height="120"
                  rx="4"
                  fill="rgba(34,211,238,0.05)"
                  stroke="#22D3EE"
                  strokeWidth="1.4"
                  strokeDasharray="3,2"
                />
                <text
                  x="120"
                  y="114"
                  textAnchor="middle"
                  fill="#22D3EE"
                  fontSize="11"
                  fontWeight="bold"
                >
                  BEDROOM A
                </text>
                <text
                  x="120"
                  y="129"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  door closed
                </text>
                {/* Bed graphic */}
                <rect
                  x="70"
                  y="158"
                  width="74"
                  height="42"
                  rx="3"
                  fill="rgba(255,255,255,0.08)"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1"
                />
                <rect x="70" y="158" width="14" height="42" fill="rgba(255,255,255,0.18)" />
                <text x="107" y="183" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  bed
                </text>
                {/* Bed-head measurement point — pillow side */}
                <circle cx="77" cy="166" r="3.5" fill="#EF4444" />
                <text
                  x="120"
                  y="208"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="10"
                  fontWeight="bold"
                >
                  ≥ 75 dB(A) at bed-head
                </text>

                {/* STAIRWELL (bottom-left) */}
                <rect
                  x="55"
                  y="240"
                  width="130"
                  height="100"
                  rx="4"
                  fill="rgba(251,191,36,0.05)"
                  stroke="#FBBF24"
                  strokeWidth="1.4"
                  strokeDasharray="3,2"
                />
                <text
                  x="120"
                  y="262"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="11"
                  fontWeight="bold"
                >
                  STAIRWELL
                </text>
                <text x="120" y="278" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  enclosed, &lt; 60 m²
                </text>
                <text
                  x="120"
                  y="305"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="11"
                  fontWeight="bold"
                >
                  ≥ 60 dB(A)
                </text>
                <text
                  x="120"
                  y="320"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  general area in stairs
                </text>

                {/* OPEN OFFICE (right side) */}
                <rect
                  x="265"
                  y="95"
                  width="135"
                  height="245"
                  rx="4"
                  fill="rgba(168,85,247,0.04)"
                  stroke="#A855F7"
                  strokeWidth="1.4"
                  strokeDasharray="3,2"
                />
                <text
                  x="332"
                  y="114"
                  textAnchor="middle"
                  fill="#A855F7"
                  fontSize="11"
                  fontWeight="bold"
                >
                  OPEN OFFICE
                </text>
                <text x="332" y="129" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  general area
                </text>
                <text
                  x="332"
                  y="220"
                  textAnchor="middle"
                  fill="#A855F7"
                  fontSize="11"
                  fontWeight="bold"
                >
                  ≥ 65 dB(A)
                </text>
                <text
                  x="332"
                  y="236"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  at any point in occupied area
                </text>
              </g>

              {/* ===== TOP-RIGHT: SOUNDER COVERAGE CHART (separate, no room overlay) ===== */}
              <g>
                <text
                  x="615"
                  y="50"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="12"
                  fontWeight="bold"
                >
                  SPL vs distance from sounder
                </text>
                <text x="615" y="66" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                  inverse-square law (point source, free field)
                </text>

                {/* Chart frame */}
                <rect
                  x="440"
                  y="80"
                  width="350"
                  height="280"
                  rx="6"
                  fill="rgba(255,255,255,0.025)"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1.2"
                />

                {/* Sounder at left edge of chart */}
                <rect
                  x="465"
                  y="210"
                  width="18"
                  height="20"
                  rx="2"
                  fill="#FBBF24"
                  stroke="white"
                  strokeWidth="1.2"
                />
                <text
                  x="474"
                  y="225"
                  textAnchor="middle"
                  fill="black"
                  fontSize="11"
                  fontWeight="bold"
                >
                  S
                </text>
                <text
                  x="474"
                  y="248"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="10"
                  fontWeight="bold"
                >
                  sounder
                </text>

                {/* Distance axis */}
                <line
                  x1="490"
                  y1="220"
                  x2="765"
                  y2="220"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="1.2"
                />
                <polygon points="765,220 757,216 757,224" fill="rgba(255,255,255,0.55)" />
                <text
                  x="628"
                  y="350"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="10"
                  fontWeight="bold"
                >
                  distance from sounder (m)
                </text>

                {/* Distance markers and SPL labels */}
                {/* 1 m → 95 dB(A) */}
                <line
                  x1="510"
                  y1="216"
                  x2="510"
                  y2="224"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="1.2"
                />
                <circle
                  cx="510"
                  cy="160"
                  r="14"
                  fill="rgba(239,68,68,0.18)"
                  stroke="#EF4444"
                  strokeWidth="1.4"
                />
                <text
                  x="510"
                  y="164"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="10"
                  fontWeight="bold"
                >
                  95
                </text>
                <text x="510" y="138" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  dB(A)
                </text>
                <text
                  x="510"
                  y="240"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="9.5"
                >
                  1 m
                </text>

                {/* 3 m → 85 dB(A) */}
                <line
                  x1="565"
                  y1="216"
                  x2="565"
                  y2="224"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="1.2"
                />
                <circle
                  cx="565"
                  cy="172"
                  r="13"
                  fill="rgba(251,191,36,0.18)"
                  stroke="#FBBF24"
                  strokeWidth="1.4"
                />
                <text
                  x="565"
                  y="176"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="10"
                  fontWeight="bold"
                >
                  85
                </text>
                <text x="565" y="150" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  dB(A)
                </text>
                <text
                  x="565"
                  y="240"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="9.5"
                >
                  3 m
                </text>

                {/* 10 m → 75 dB(A) */}
                <line
                  x1="640"
                  y1="216"
                  x2="640"
                  y2="224"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="1.2"
                />
                <circle
                  cx="640"
                  cy="183"
                  r="12"
                  fill="rgba(132,204,22,0.18)"
                  stroke="#84CC16"
                  strokeWidth="1.4"
                />
                <text
                  x="640"
                  y="187"
                  textAnchor="middle"
                  fill="#84CC16"
                  fontSize="10"
                  fontWeight="bold"
                >
                  75
                </text>
                <text x="640" y="160" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  dB(A)
                </text>
                <text
                  x="640"
                  y="240"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="9.5"
                >
                  10 m
                </text>

                {/* 30 m → 65 dB(A) */}
                <line
                  x1="730"
                  y1="216"
                  x2="730"
                  y2="224"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="1.2"
                />
                <circle
                  cx="730"
                  cy="195"
                  r="11"
                  fill="rgba(34,211,238,0.18)"
                  stroke="#22D3EE"
                  strokeWidth="1.4"
                />
                <text
                  x="730"
                  y="199"
                  textAnchor="middle"
                  fill="#22D3EE"
                  fontSize="10"
                  fontWeight="bold"
                >
                  65
                </text>
                <text x="730" y="172" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  dB(A)
                </text>
                <text
                  x="730"
                  y="240"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="9.5"
                >
                  30 m
                </text>

                {/* Smooth decay curve through points */}
                <path
                  d="M 510 160 Q 540 165 565 172 Q 600 178 640 183 Q 685 188 730 195"
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1.2"
                  strokeDasharray="4,3"
                />

                {/* Caption */}
                <text
                  x="615"
                  y="295"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="9.5"
                >
                  SPL falls ~6 dB per doubling of distance
                </text>
                <text
                  x="615"
                  y="310"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  design must place sounders so EVERY listening point
                </text>
                <text
                  x="615"
                  y="324"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  meets the room minimum on the floor plan (left)
                </text>
              </g>

              {/* ===== BOTTOM: VAD FIELD OF VIEW ===== */}
              <g>
                <text
                  x="410"
                  y="395"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="12"
                  fontWeight="bold"
                >
                  VAD field of view — BS EN 54-23 coverage codes
                </text>

                {/* Frame */}
                <rect
                  x="40"
                  y="408"
                  width="740"
                  height="155"
                  rx="6"
                  fill="rgba(168,85,247,0.04)"
                  stroke="rgba(168,85,247,0.45)"
                  strokeWidth="1.2"
                />

                {/* Ceiling VAD (left half) */}
                <text
                  x="180"
                  y="428"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="11"
                  fontWeight="bold"
                >
                  C-3-3 ceiling-mounted
                </text>
                <text x="180" y="442" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  cube of side 3 m centred below VAD
                </text>
                {/* Ceiling line */}
                <line
                  x1="80"
                  y1="455"
                  x2="280"
                  y2="455"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="2"
                />
                <text x="80" y="450" fill="rgba(255,255,255,0.5)" fontSize="9">
                  ceiling
                </text>
                {/* VAD device */}
                <rect
                  x="172"
                  y="455"
                  width="16"
                  height="10"
                  rx="2"
                  fill="#EF4444"
                  stroke="white"
                  strokeWidth="1"
                />
                {/* Cone */}
                <polygon
                  points="180,465 130,545 230,545"
                  fill="rgba(239,68,68,0.07)"
                  stroke="rgba(239,68,68,0.5)"
                  strokeWidth="1.2"
                  strokeDasharray="3,2"
                />
                {/* Floor */}
                <line
                  x1="80"
                  y1="545"
                  x2="280"
                  y2="545"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="2"
                />
                <text x="80" y="558" fill="rgba(255,255,255,0.5)" fontSize="9">
                  floor
                </text>
                <text
                  x="180"
                  y="510"
                  textAnchor="middle"
                  fill="rgba(239,68,68,0.85)"
                  fontSize="10"
                  fontWeight="bold"
                >
                  3 m × 3 m × 3 m
                </text>

                {/* Wall VAD (right half) */}
                <text
                  x="615"
                  y="428"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="11"
                  fontWeight="bold"
                >
                  W-2.4-6 wall-mounted
                </text>
                <text x="615" y="442" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  2.4 m mounting height min · 6 m projection
                </text>
                {/* Wall (vertical) */}
                <line
                  x1="480"
                  y1="455"
                  x2="480"
                  y2="555"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="2"
                />
                <text x="475" y="555" textAnchor="end" fill="rgba(255,255,255,0.5)" fontSize="9">
                  wall
                </text>
                {/* VAD device on wall */}
                <rect
                  x="480"
                  y="463"
                  width="10"
                  height="14"
                  rx="2"
                  fill="#EF4444"
                  stroke="white"
                  strokeWidth="1"
                />
                {/* Hemispherical projection forward */}
                <path
                  d="M 490 470 L 740 470 L 740 555 L 490 555 Z"
                  fill="rgba(239,68,68,0.04)"
                  stroke="rgba(239,68,68,0.3)"
                  strokeWidth="1"
                  strokeDasharray="3,2"
                />
                {/* Floor */}
                <line
                  x1="480"
                  y1="555"
                  x2="760"
                  y2="555"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="2"
                />
                {/* Distance arrow */}
                <line x1="495" y1="535" x2="735" y2="535" stroke="#22D3EE" strokeWidth="1.2" />
                <polygon points="735,535 727,531 727,539" fill="#22D3EE" />
                <polygon points="495,535 503,531 503,539" fill="#22D3EE" />
                <text
                  x="615"
                  y="528"
                  textAnchor="middle"
                  fill="#22D3EE"
                  fontSize="10"
                  fontWeight="bold"
                >
                  6 m projection
                </text>
                <text
                  x="615"
                  y="550"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  2.4 m mounting height (W-2.4-x)
                </text>
              </g>

              {/* ===== BOTTOM STRIP: AMBIENT NOISE MARGIN + EVAC TONE ===== */}
              <rect
                x="40"
                y="575"
                width="740"
                height="38"
                rx="8"
                fill="rgba(251,191,36,0.07)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1.2"
              />
              <text
                x="410"
                y="592"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                ⚠ Ambient-noise margin — clause 15 also requires +5 dB above ambient lasting ≥ 30 s
              </text>
              <text x="410" y="606" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Evacuation tone: slow-whoop (sweep ~800 → 500 Hz, 1 s) OR two-tone (alt. ~500 / 1000
                Hz) · 500-1000 Hz band
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>
            The ambient-noise margin — the rule the 65 dB floor doesn't cover
          </ContentEyebrow>

          <ConceptBlock
            title="+5 dB above any ambient noise lasting 30 seconds or more"
            plainEnglish="The 65/60/75 dB(A) minima are the FLOOR. BS 5839-1:2025 also requires that the alarm signal be at least 5 dB(A) above any persistent ambient sound — specifically, any sound that lasts 30 seconds or more. So in a workshop running a 70 dB(A) extract fan, 65 dB(A) coverage is not enough — you need at least 75 dB(A) at every point a person might be."
            onSite="Survey the actual ambient noise during commissioning, not the empty-shell condition. Run the plant and machinery that will normally be running. Note continuous-source levels (fans, compressors, machine tools, traffic noise on a roadside frontage). The design SPL is whichever is higher: the 65/60/75 floor, or 5 dB(A) above the persistent ambient. The 30-second qualifier means transient peaks (a single hammer blow, a passing emergency vehicle siren) don't trigger the rule — but anything that holds for half a minute does."
          >
            <p>Common cases where the +5 dB rule bites and the 65 dB(A) floor is not enough:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Light industrial / manufacturing.</strong> Continuous machine noise commonly
                runs 70–80 dB(A). Sounder coverage must be designed at least 5 dB(A) above that —
                75–85 dB(A) at every point.
              </li>
              <li>
                <strong>Plant rooms.</strong> Boilers, AHUs, compressors. Continuous SPL in the
                70–85 dB(A) range is normal; sounders must be specified accordingly.
              </li>
              <li>
                <strong>Kitchens during service.</strong> Extract hoods, dishwashers, cooking noise
                often produce sustained 65–75 dB(A) ambient.
              </li>
              <li>
                <strong>Music venues during operation.</strong> Programme material is exempt (it is
                neither continuous nor general background) but bar / corridor / lobby ambient with
                doors open to a venue can sustain 70+ dB(A).
              </li>
              <li>
                <strong>Roadside or trackside premises.</strong> Sustained traffic / rail noise can
                hold above 60 dB(A) for the busy hours; design for the worst sustained period, not
                the quiet-night minimum.
              </li>
            </ul>
            <p>
              Where audible coverage above ambient is impractical — typically very high persistent
              ambient (95+ dB(A)) or hearing-impaired occupants — the visual alarm device (VAD)
              becomes the primary evacuation signal and BS EN 54-23 compliance is mandatory (see the
              VAD subsection below).
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Tone use — clause 15.1.12 and the lockdown question</ContentEyebrow>

          <ConceptBlock
            title="When fire alarm tones can be used for other purposes"
            plainEnglish="Fire alarm sounders are dedicated to fire alarm purposes — that is the BS 5839-1 default. The 2025 edition (clause 15.1.12) clarifies the exceptions and accommodates new use cases that have emerged since the 2017 edition, particularly the use of fire infrastructure for school class-change signals and lockdown alarms."
          >
            <p>The 2025 framework — clause 15.1.12:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>General rule.</strong> Fire alarm evacuation tones should NOT be used for
                purposes other than warning of fire.
              </li>
              <li>
                <strong>Exception (a) — identical-response.</strong> Where the response required is
                identical to that for fire (immediate evacuation by all escape routes), the same
                evacuation tone may be used. Example: a hazardous chemical release in a chemistry
                building that requires the same evacuation as fire — using the fire tone is
                permitted because the human response is the same. The signal is unambiguous because
                the response is unambiguous.
              </li>
              <li>
                <strong>Exception (b) — schools, class-change.</strong> The fire alarm signal may be
                used to indicate the start or finish of predetermined periods (class change). The
                duration of the class-change signal SHOULD NOT EXCEED 10 SECONDS. The 10-second
                duration was extended from 5 seconds in the 2017 edition to address data-lag in
                addressable systems where 5 seconds proved unreliable.
              </li>
              <li>
                <strong>Lockdown / invacuation — acknowledged.</strong> The 2025 edition
                acknowledges that fire alarm infrastructure is increasingly used for lockdown or
                invacuation alarms (a different response from fire — staying inside, securing
                rooms). The lockdown signal must be DIFFERENT from the fire evacuation tone, so that
                occupants distinguish 'evacuate immediately' from 'lock down and stay'. FIA guidance
                (Use of fire alarm systems for lockdown — specifically in schools) is
                cross-referenced.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 15.1.12 (fire alarm tones for other purposes)"
            clause={
              <>
                Fire alarm evacuation tones should not be used for purposes other than warning of
                fire, except where: (a) the response required is identical to that required in the
                event of fire (i.e. immediate evacuation by use of all escape routes); or (b) in
                schools, the fire alarm signal is used to indicate the start or finish of
                predetermined periods. In these cases, the duration of class change signals should
                not exceed 10 s. NOTE: Guidance on the use of a fire alarm system as a lockdown
                alarm is available in FIA guidance document Use of fire alarm systems for lockdown
                (specifically in schools).
              </>
            }
            meaning="The 2025 edition formalises a small set of exceptions that previously sat in informal practice. The 5-to-10-second class-change extension fixes a real engineering reliability problem in addressable systems. The lockdown acknowledgement points users to FIA guidance for design of differential lockdown signals — preserving the principle that distinct emergency responses need distinct signals."
          />

          <ConceptBlock
            title="Lockdown and invacuation — different signal, same infrastructure"
            plainEnglish="Lockdown alarms (used in schools, hospitals and some commercial premises) signal a different emergency response from fire — instead of evacuating, occupants secure rooms in place. The 2025 edition acknowledges the growing use of fire alarm system infrastructure (panel, loop, sounders) to deliver lockdown alarms while emphasising that the lockdown SIGNAL must be distinct from the fire alarm signal."
          >
            <p>Design considerations for lockdown on fire infrastructure:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Distinct tone or message.</strong> Lockdown signal must be unmistakably
                different from fire evacuation tone. Common approaches: a pulsed continuous tone
                (different from slow-whoop and two-tone), a voice message ('LOCKDOWN — secure rooms
                now'), or a combination.
              </li>
              <li>
                <strong>Distinct trigger.</strong> Lockdown is triggered separately from fire alarm
                — typically by a dedicated button at reception or via key-operated switches in
                classrooms, NOT by a fire MCP. The cause-and-effect matrix routes the lockdown
                trigger to lockdown sounders and the fire trigger to fire sounders, even where the
                physical sounders are shared.
              </li>
              <li>
                <strong>FIA guidance.</strong> The FIA Guidance Note on Use of fire alarm systems
                for lockdown (specifically in schools) provides design templates, signal
                specifications, and operational guidance. The 2025 BS 5839-1 cross-reference anchors
                this guidance into the standard's framework.
              </li>
              <li>
                <strong>FRA implication.</strong> Sharing fire and lockdown infrastructure raises
                considerations for fire risk assessment — what happens if both alarms could
                conceivably trigger together (an attacker setting a fire). The FRA should address
                this.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Visual alarm devices — BS EN 54-23</ContentEyebrow>

          <ConceptBlock
            title="VADs — when, where and how"
            plainEnglish="Visual alarm devices (VADs) — typically high-intensity flashing red lights — provide alarm notification to occupants who cannot reliably hear the audible signal. BS EN 54-23 is the product standard, specifying light intensity, coverage volume, flash characteristics and mounting. The compliance requirement depends on the VAD's role: if the VAD is the PRIMARY evacuation source (e.g. environments with very high ambient noise where audible coverage is impractical), BS EN 54-23 compliance is mandatory; if the VAD is supplementary to compliant audible coverage, BS EN 54-23 compliance is recommended but not strictly required."
          >
            <p>VAD design considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>BS EN 54-23 product designations.</strong> Devices are categorised by
                mounting type and coverage volume. Ceiling-mounted (C) devices have specifications
                of the form C-3-3 (3 m × 3 m × 3 m coverage at floor level). Wall-mounted (W)
                devices have specifications of the form W-2.4-6 (mounted at 2.4 m height, projection
                6 m). Open-area devices (O) are also defined for areas without conventional walls.
              </li>
              <li>
                <strong>Primary evacuation source.</strong> Where the VAD is the primary trigger for
                occupants to evacuate (e.g. industrial environments where ambient noise exceeds the
                audible signal, or premises where some occupants are profoundly deaf and rely solely
                on visual signal), BS EN 54-23 compliance is mandatory. The product must be tested
                and certified against the standard.
              </li>
              <li>
                <strong>Supplementary VAD.</strong> Where the VAD supports compliant audible
                coverage (most accessibility-driven installations), BS EN 54-23 compliance is
                recommended but a less-stringent product may be permitted by the design.
                Manufacturer literature increasingly defaults to BS EN 54-23 for all VADs regardless
                of role.
              </li>
              <li>
                <strong>Accessibility drivers.</strong> Approved Document M (Building Regulations),
                BS 8300 (designing inclusive built environments) and the Equality Act 2010
                collectively drive WHERE VADs are required in addition to audible. Typical:
                accessible bedrooms in hotels (5-10 percent of stock), accessible toilets, quiet
                rooms, prayer rooms, and any space where audible coverage genuinely cannot meet the
                SPL minima.
              </li>
              <li>
                <strong>Flash rate and colour.</strong> BS EN 54-23 specifies flash characteristics
                — typically 0.5 to 2 Hz — and colour (red). Flash rates outside this band can
                trigger photosensitive epilepsy in some occupants; the standard balances conspicuity
                against safety.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Where audible cannot do the job — VAD as primary"
            plainEnglish="In environments where audible coverage cannot reach the 65/60/75 dB(A) minimum — typically very high ambient noise (printing presses, manufacturing, some industrial spaces), or environments where the occupants are profoundly deaf and audible signal serves no purpose — the VAD becomes the PRIMARY evacuation source. In these cases BS EN 54-23 compliance is mandatory and the VAD design must satisfy the full coverage-volume specification of the standard."
          >
            <p>Primary-VAD scenarios:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>High-ambient-noise industrial.</strong> Continuous machinery noise above the
                alarm SPL by a margin sufficient to mask the alarm. Audible coverage may still be
                provided as a supplementary signal but cannot meet the SPL minimum at the quietest
                accessible point above the machinery noise.
              </li>
              <li>
                <strong>Deaf-and-hard-of-hearing user-base.</strong> Some specialist premises (deaf
                schools, hearing-loss support charities) have a user base that is predominantly
                profoundly deaf. The audible signal is irrelevant to occupants; visual signal is the
                entire alarm. Tactile signals (pillow shakers, vibrating wristbands linked to the
                system) may also be specified.
              </li>
              <li>
                <strong>Healthcare specialist environments.</strong> MRI suites and similar spaces
                where the audible alarm is impractical (acoustic isolation requirements,
                non-magnetic hardware constraints). Visual signal becomes primary. Specialist
                MR-compatible VADs are required.
              </li>
            </ul>
            <p>
              In all primary-VAD scenarios, the VAD spacing and intensity must be calculated to meet
              BS EN 54-23 coverage at every point in the protected area. Pilot installations and
              on-site illuminance measurement are sometimes used to verify performance.
            </p>
          </ConceptBlock>

          <Scenario
            title="The hotel bedroom — bed-head SPL and accessibility VADs"
            situation="A 200-bedroom mid-market hotel is upgrading its fire alarm system from a 2017-edition design to BS 5839-1:2025. The original system had corridor-mounted sounders only; bed-head SPL measurements (taken at commissioning of the upgrade) show 62-68 dB(A) in most bedrooms — short of the 75 dB(A) minimum. The hotel has 16 designated 'accessible' bedrooms with hearing-impaired guests as a regular occupancy."
            whatToDo="Two parallel design strands. (1) Bed-head SPL — install a sounder OR sounder-base inside each bedroom. A sounder-base on the existing smoke detector (if the detector is BS EN 54-3 compliant) is the lowest-disruption option; a separate wall-mounted sounder is the alternative. The in-room sounder typically delivers 80-85 dB(A) at the bed-head, comfortably above the 75 dB(A) minimum. Verify by measurement at commissioning. (2) Accessibility VADs — install BS EN 54-23 compliant ceiling VADs in each of the 16 accessible bedrooms. Specification: typically C-3-3 ceiling-mount giving 3 m × 3 m × 3 m coverage at floor level, sufficient for a typical hotel bedroom. The VAD is supplementary to the in-room audible (which is now meeting the 75 dB(A) bed-head minimum) so BS EN 54-23 compliance is recommended but not strictly mandatory; specify it anyway because the cost difference is negligible and the inclusive-design benefit is real. Document under clauses 15 and 38; record the per-room SPL measurements in the commissioning certificate. Coverage upgrade cost: typically £80-150 per room for the in-room sounder, plus £200-300 per accessible room for the VAD."
            whyItMatters="The bed-head 75 dB(A) requirement is one of the most-failed criteria in old-system audits. Corridor-mounted sounders cannot reliably penetrate a closed bedroom door at the level needed to wake a sleeping adult. The 2025 maintenance regime expects the SPL to be measured at the bed-head with the door closed; when an audit identifies shortfall, the in-room sounder is the practical fix. VAD provision in accessible rooms is the accessibility complement — driven by Approved Document M and the Equality Act, not by BS 5839-1 directly, but specified through the BS 5839-1 system."
          />

          <CommonMistake
            title="Designing to 65 dB(A) at the corridor centre and assuming bedrooms are covered"
            whatHappens="A care home design measures 65 dB(A) in the centre of every corridor. The designer signs off the SPL as compliant. Bedroom doors close. The actual SPL at bed-head with door closed is 50-55 dB(A) — well below the 75 dB(A) minimum. A sleeping resident does not wake to a real alarm event. Investigation finds non-compliance with clause 15."
            doInstead="Measure SPL at the BED-HEAD with the BEDROOM DOOR CLOSED. The door typically attenuates the signal by 15-20 dB; corridor SPL of 80 dB(A) gives bed-head SPL of approximately 60-65 dB(A) — still short of 75 dB(A). The compliant solution is in-room sounder coverage (sounder-base on the bedroom smoke detector, or dedicated wall-mounted sounder inside the bedroom). Verify by measurement, not by extrapolation from corridor readings. The BS 5839-1:2025 maintenance regime expects the bed-head measurement, with the door closed, as part of every annual service in sleeping-risk premises."
          />

          <CommonMistake
            title="Using opaque ceiling VAD covers to match the room aesthetic"
            whatHappens="An office fit-out replaces the standard transparent VAD covers with brushed-aluminium opaque covers to match the architectural lighting scheme. The VAD light is partially obscured; intensity at coverage edge falls below the BS EN 54-23 minimum. A real alarm event occurs and a hearing-impaired occupant in a corner office does not see the alarm. The aesthetic substitution defeats the device's purpose."
            doInstead="Specify VADs with manufacturer-supplied compliant covers and lenses. Custom architectural finishes that obstruct the light path are non-compliant with BS EN 54-23. If aesthetic integration is a hard requirement, work with manufacturers offering low-profile ceiling VADs in finished colours that maintain compliance — these are increasingly available and cost-comparable. The principle: the device's compliance specification governs; cosmetic modification cannot defeat it."
          />

          <CommonMistake
            title="A school using fire alarm sounders for class-change at 5-second duration"
            whatHappens="A school programmed fire alarm sounders to indicate class-change with a 5-second signal under the 2017 edition. After upgrade to a modern addressable panel, the data-lag between trigger, panel processing, and sounder output occasionally exceeds 5 seconds. Some sounders sound for fewer than 5 seconds; some sound for slightly longer. Pupils and staff lose confidence in the signal — it is no longer reliably distinguishable from a brief fire-alarm trigger. The school requests an investigation."
            doInstead="Reprogramme to the 2025 clause 15.1.12 maximum of 10 seconds. The 10-second extension was specifically introduced to address this data-lag problem in addressable systems. The signal duration is now sufficient to ride out worst-case panel processing delays while remaining clearly distinguishable from a sustained fire alarm. Update the school logbook and operating manual to reflect the reprogrammed duration."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Sounder/VAD circuit calculation</ContentEyebrow>

          <ConceptBlock
            title="Loop loading and standby battery sizing"
            plainEnglish="Sounder/VAD circuit design balances four constraints: total alarm current within the panel circuit rating; cable voltage drop within manufacturer spec at end-of-line; standby battery capacity sufficient for 24 hours quiescent + 30 minutes alarm operation; and end-of-line monitoring resistor present. Modern manufacturers provide load-calculation software that handles the arithmetic; understanding the inputs lets you sanity-check the output."
          >
            <p>The four-constraint calculation:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Alarm current.</strong> Sum of operating currents of all sounders and VADs
                on the circuit. Sounders typically draw 30-60 mA each; VADs 30-200 mA each depending
                on intensity. Total must be within the panel circuit rating (often 0.5 A or 1 A per
                sounder circuit on conventional systems; loop current limits on addressable
                systems).
              </li>
              <li>
                <strong>Cable voltage drop.</strong> Cable resistance × alarm current = voltage
                drop. End-of-line voltage must remain above the manufacturer's minimum operating
                voltage (typically 18-21 V on a 24 V system). Long runs with high alarm current can
                drop end-of-line voltage below the threshold; the fix is larger cable or shorter
                circuit segments.
              </li>
              <li>
                <strong>Standby battery capacity.</strong> The 2025 edition (consistent with 2017)
                requires battery capacity for 24 hours quiescent operation followed by 30 minutes
                alarm operation, with appropriate margins for battery ageing. Quiescent current
                (panel + detectors + interfaces, typically 100-500 mA total for a small system)
                drives the 24-hour requirement; alarm current drives the 30-minute requirement. The
                battery sizes typically work out to 7-50 Ah depending on system size.
              </li>
              <li>
                <strong>End-of-line monitoring.</strong> Conventional sounder circuits use an
                end-of-line resistor to allow the panel to detect open or short faults on the
                circuit. Addressable systems typically use isolators and built-in monitoring. The
                end-of-line component must be specified in the design and present at commissioning.
              </li>
            </ul>
            <p>
              Get any of the four wrong and the system either fails commissioning, produces fault
              alarms in service, or fails to operate reliably in a real event. Manufacturer
              load-calculation software is the practical tool; experienced engineers cross-check
              with manual calculations on critical or unusual installations.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 25 (standby power supply) — sizing principles"
            clause={
              <>
                The standby battery should have sufficient capacity to maintain the system in the
                quiescent state for at least 24 hours, after which it should be capable of
                supporting full alarm load for at least 30 minutes. Where the building is unoccupied
                for periods exceeding 24 hours, the quiescent period may need to be extended (e.g.
                72 hours) to ensure faults can be addressed before battery exhaust. Battery capacity
                calculations should include appropriate ageing margins and the maximum expected
                fault-condition current.
              </>
            }
            meaning="The 24 hours + 30 minutes minimum is the floor. Premises unoccupied for longer periods (weekend-only office, holiday-let with infrequent occupancy) need extended quiescent capacity — 72 hours is a common specification. Sounder/VAD design feeds into this calculation directly: high alarm current = high 30-minute load = larger battery. Cost-effective design balances sounder/VAD count and intensity against battery capacity within architectural constraints."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'SPL minima — 65 dB(A) general / 60 dB(A) small enclosed (<60 m²) / 75 dB(A) bed-head. Measured at the QUIETEST point with doors closed.',
              'Frequency 500-1000 Hz · BS 5839-1 evacuation tone is slow-whoop (sweep) or two-tone (alternating). Modulated, not steady. Universally recognisable.',
              'Tone use — clause 15.1.12 — fire tone NOT for other purposes EXCEPT (a) identical-response, or (b) school class-change ≤ 10 seconds (extended from 5 s in 2017).',
              'Lockdown / invacuation — acknowledged in 2025 with FIA guidance cross-reference. Lockdown signal must DIFFER from fire tone.',
              'VADs — BS EN 54-23 product standard. MANDATORY where VAD is primary evacuation source, RECOMMENDED where supplementary to compliant audible.',
              'Accessibility — Approved Document M / BS 8300 / Equality Act drive WHERE VADs are needed in addition to audible (accessible rooms, on-request).',
              'Bed-head SPL — measure with bedroom door CLOSED. Corridor SPL is not a substitute. Many old systems fail this test; in-room sounder or sounder-base is the fix.',
              'Loop loading — alarm current within panel rating, cable voltage drop in spec, standby battery 24 h + 30 min, end-of-line monitoring present.',
              'Design margin — at least 5 dB above SPL minimum at the worst point. Cable ageing, sounder ageing, and post-commissioning building changes erode initial margins.',
              'Documentation — record SPL measurements per area in the commissioning certificate; include the VAD-coverage analysis and the cause-and-effect matrix (a 2025 documentation requirement).',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'My commissioning meter reads 64 dB(A) at the worst point in a corridor. The minimum is 65 dB(A). Is the system non-compliant?',
                answer:
                  'Yes — 64 dB(A) is below the 65 dB(A) minimum and the system is non-compliant against clause 15. The fix is either more sounders, higher-output sounders, or a different sounder location. The 1 dB shortfall looks small but is the difference between compliance and non-compliance; commissioning measurements typically include a small ±0.5 dB instrument tolerance, so 64 dB(A) reliably indicates the SPL is below 65 dB(A). Add coverage and re-measure.',
              },
              {
                question: 'Can I use voice evacuation messages instead of slow-whoop or two-tone?',
                answer:
                  'Yes, where the system is designed as a BS 5839-8 PA-VAD system (voice alarm system) and the design intent is voice messaging. PA-VAD systems are required for very large or complex premises where directional evacuation guidance is needed (stadiums, airports, large shopping centres). The voice messages must conform to BS 5839-8 and the system must satisfy the equivalent SPL requirements. For typical BS 5839-1 systems (offices, hotels, residential, schools) the slow-whoop or two-tone is the standard.',
              },
              {
                question:
                  'For the school class-change signal, can I use a different tone from the fire tone?',
                answer:
                  'Strictly, clause 15.1.12 permits the FIRE alarm tone to be used for class-change, not a different tone on the fire system. If the school wants a different class-change signal (e.g. a chime, a gentler tone), that is a separate signal infrastructure — not the fire alarm system. Practically many schools use the fire alarm sounders for class-change with the same tone as fire, distinguished only by the brief duration (≤ 10 seconds). A real fire alarm persists much longer and is unambiguously identifiable as fire.',
              },
              {
                question: 'Do I need a separate amplifier panel for VADs?',
                answer:
                  'Usually no. Modern fire alarm panels include sounder/VAD output circuits with sufficient capacity for typical installations. Very large installations or installations with high-intensity VADs may require booster panels or dedicated VAD-supply panels — manufacturer load calculations identify when this is needed. Specify in the system design before procurement; retrofitting amplification later is disruptive.',
              },
              {
                question: 'For lockdown, can I use the fire alarm sounders with a voice message?',
                answer:
                  'Yes — that is one of the common implementations. The fire alarm sounders are repurposed under the cause-and-effect matrix: when the lockdown trigger operates, the panel routes a voice message ("LOCKDOWN — secure rooms now") through the sounders. The fire trigger continues to route the standard evacuation tone. The two are distinct and unambiguous. The FIA Guidance Note on lockdown for schools provides design templates. The trigger is dedicated to lockdown (typically a key-operated switch or push-button at reception, NOT a fire MCP).',
              },
              {
                question:
                  'BS 5839-1 mentions 60 dB(A) for "small enclosed spaces". How small is small?',
                answer:
                  'Typically less than 60 m² floor area — stairwells, lobbies, small lift cars, small enclosed cupboards. The exact threshold is a design judgement; the 60 m² number is a working rule. Larger enclosed spaces (e.g. a 100 m² communal hall) revert to the 65 dB(A) general minimum. The relaxation reflects the lower likely time-of-occupancy in small transit spaces and the practical sounder-loading constraints in tight architectural geometry.',
              },
              {
                question:
                  'Can I use the fire alarm sounders to evacuate the building for a fire drill?',
                answer:
                  'Yes, of course — that is one of the standard purposes of the system. Fire drills require operating the alarm in a planned and announced way. The system response is identical to a real fire (which is the point of the drill — practising the response). Drills are scheduled, the FRS and ARC are notified in advance (per the new BS 5839-1:2025 false-alarm-notice label recommendation, see Section 5), and post-drill debriefs identify any operational issues for action.',
              },
              {
                question: 'For accessibility, do I need VADs in toilets and washrooms?',
                answer:
                  'Generally yes — Approved Document M / BS 8300 typically require VAD coverage in accessible toilets and changing facilities, because the audible alarm cannot be relied on in spaces where occupants may be alone, in privacy, and may have hearing impairment. The provision is supplementary to corridor audible coverage; BS EN 54-23 compliance is recommended. Specify ceiling-mounted VADs (often C-3-3) in each accessible toilet and changing facility, and include in the system commissioning verification.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Sounders and VADs — Module 2.4" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-2/section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.5 False alarm management
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule2Section4;
