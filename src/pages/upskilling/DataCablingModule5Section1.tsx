import { ArrowLeft, ChevronRight } from 'lucide-react';
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
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'datacabling-m5s1-untwist-limit',
    question:
      'You are terminating Cat6A onto a punchdown keystone. How much pair untwist is permitted at the termination, and why?',
    options: [
      'Up to 50 mm per pair — the cable construction is robust enough that the certifier will not register the untwisted length.',
      'Up to 25 mm per pair — any untwist that sits inside the keystone footprint has no effect on the measured channel.',
      'A maximum of 13 mm of untwist per pair — beyond that, NEXT (near-end crosstalk) and return loss degrade and the link will fail Class EA testing even with otherwise perfect cable and connectors.',
      'Untwist length is irrelevant provided the colour code is correct and every conductor is fully seated.',
    ],
    correctIndex: 2,
    explanation:
      'BS EN 50173-1 / ISO/IEC 11801-1 / ANSI/TIA-568.2-E all bound pair untwist at the termination — typically 13 mm maximum for Cat6A and Cat6, and even tighter for Cat6A in some manufacturer instructions. The reason is electrical: the twist itself is what cancels common-mode noise between pairs (NEXT), and once you untwist it, that cancellation collapses across the untwisted region. A long untwist also disrupts the characteristic impedance of the pair, which causes a return-loss spike. Both show up immediately on a Level III/IV/V certifier. Strip just enough cable to expose the conductors for the punchdown, fan the pairs into the right colour positions, and untwist only the last few millimetres — never further. Class is decided in the last 13 mm of every termination.',
  },
  {
    id: 'datacabling-m5s1-t568a-vs-t568b',
    question:
      'A site has half its outlets terminated to T568A and half to T568B because two crews worked different floors. Is this an acceptable handover?',
    options: [
      'No — the schemes are functionally equivalent end-to-end, but a site MUST be consistent. A channel made T568A-to-T568B becomes a crossover and will not work reliably for switch-to-device traffic across all device types.',
      'Yes — both schemes are valid and Ethernet treats them identically, so a mixed site needs no remedial work.',
      'No — T568A is not permitted on UK installations, so every T568A outlet must be re-terminated to T568B.',
      'Yes — auto-MDI/MDI-X on modern switches negotiates any crossover, so a mixed site is fully acceptable at handover.',
    ],
    correctIndex: 0,
    explanation:
      'T568A and T568B are both valid pin-out schemes. The pairs are the same; only the colour assignments to pins 1-2 and 3-6 are swapped. End-to-end, a T568A link and a T568B link are electrically identical and work the same way. The problem is when one outlet is T568A and the patch cord is T568B (or vice versa) — the resulting end-to-end channel is wired as a crossover, which on auto-MDI/MDI-X switches usually still links but on dumb-end devices (some IP cameras, legacy hubs, some PoE injectors) does not. The site discipline is: pick ONE scheme on day one, document it in the spec, and terminate every outlet, every patch panel and every cord to that scheme. T568B is the more common UK default; T568A is the US federal default. Either is fine — but pick one.',
  },
  {
    id: 'datacabling-m5s1-strip-length',
    question:
      'You are terminating 23 AWG Cat6A solid-core cable into a 110-style punchdown keystone. The manufacturer specifies a 25 mm jacket strip length. The installer routinely strips 60 mm because "it makes the colours easier to fan out". What is the consequence?',
    options: [
      'No consequence — strip length is purely cosmetic provided the conductors reach their slots.',
      'The over-stripped cable simply will not physically fit into the keystone hood and the cap will not close.',
      'Only the accuracy of the colour code matters; the length of jacket removed has no electrical effect.',
      'The over-stripped jacket exposes the pairs to longer untwist and removes the pair-binding the jacket provides against bend-induced impedance changes — NEXT and return loss both degrade. On Cat6A, a 60 mm strip is a near-guaranteed Class EA fail.',
    ],
    correctIndex: 3,
    explanation:
      'The cable jacket is part of the electrical design of the cable — it holds the pairs at a consistent geometry and provides the pair-to-pair separation the Category was certified at. Strip too much jacket and the pairs splay, untwist further than the 13 mm limit, and lose their characteristic impedance. The Cat6A certifier sees this as elevated NEXT and a return-loss bump near the connector. Manufacturer instructions typically specify a 20-30 mm strip for keystones — follow that exactly. Strip-length discipline is one of the cheapest, most-skipped install practices on a Cat6A job. It makes or breaks the channel.',
  },
  {
    id: 'datacabling-m5s1-tool-less',
    question:
      'A modern tool-less keystone uses an internal IDC mechanism that pierces the conductor when the closing cap is pressed. The contractor claims this is "as good as a punchdown — no tool needed". For a Cat6A install, is this a sound choice?',
    options: [
      'Yes, IF the keystone is rated to the Class being installed (Class EA for Cat6A), terminated to manufacturer instructions (strip length, lacing, untwist limit), and the channel is certified to TIA-1152-A / BS EN 50346 with documented results. Tool-less mechanisms are common on Cat6A keystones; what matters is the Class certification of the COMPONENT and the installed CHANNEL, not the presence or absence of a punchdown tool.',
      'No — tool-less keystones sit outside the cabling standards and a channel using them cannot be certified.',
      'No — only a 110 punchdown termination can deliver a genuine Class EA result on Cat6A.',
      'Only if the keystone is a shielded type, because tool-less mechanisms are unreliable on unshielded Cat6A.',
    ],
    correctIndex: 0,
    explanation:
      'Tool-less keystones are entirely standards-conformant, provided the keystone itself is rated to the Class you are installing and the install practice (strip length, lacing, untwist limit) follows the manufacturer instructions. The certifier does not care which IDC mechanism cut into the conductor — it cares about the resulting electrical channel. The two real risks with tool-less keystones are (1) cheap, unrated parts dressed up as Cat6A — verify the component certification, and (2) installer shortcuts because no tool is felt to be needed — which is when strip length and untwist discipline collapse. Use rated components, follow the instructions, and certify the channel.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What does the term "IDC" mean in the context of copper data terminations, and why does it matter?',
    options: [
      'Insulation Displacement Connection — the blade pierces the insulation to make a gas-tight contact.',
      'Insulation Detection Circuit — a certifier function that flags conductors stripped past their length.',
      'Internal Data Cable — the solid-core cable run between a patch panel and active comms-room gear.',
      'Industrial Data Connector — a ruggedised connector used where cabling enters harsh environments.',
    ],
    correctAnswer: 0,
    explanation:
      'IDC (Insulation Displacement Connection) is the universal copper-data termination mechanism. The blade displaces the insulation and bites into the copper conductor in a single press, forming a gas-tight contact that is as good or better than a screw terminal for low-current data signals. 110-style is the modern default for keystones and patch panels. Krone/LSA-PLUS is the European-origin telecoms standard, common on legacy voice frames. 66-block is the older US telecoms format, mostly on retrofits now. Tool-less keystones use a hidden IDC engaged by the closing cap. Every modern Cat5e/6/6A keystone is some form of IDC. Match the IDC slot gauge to the cable gauge — 22 AWG and 23 AWG are common Cat6A sizes; using a 24 AWG IDC slot with 22 AWG cable cracks the slot.',
  },
  {
    id: 2,
    question:
      'What is the maximum permitted pair untwist at the termination for a Cat6A keystone, and what happens if it is exceeded?',
    options: [
      'Up to 25 mm — untwist hidden below the keystone hood has no measurable effect on the channel.',
      'No fixed limit — provided the colour code is correct the link certifies regardless of untwist.',
      '13 mm maximum — beyond it, NEXT and return loss degrade and the certifier flags the link.',
      'Up to 50 mm — the cable jacket keeps binding the pairs once they are inside the keystone.',
    ],
    correctAnswer: 2,
    explanation:
      'The 13 mm pair-untwist limit is one of the fundamental Cat6A install rules. The twist is the electrical cancellation mechanism. Untwist beyond 13 mm and the link will fail or marginally pass Class EA — and marginal passes fail under load (PoE heat, temperature swings, cable movement). Strip the jacket only to the manufacturer-specified strip length (typically 20-30 mm), fan the pairs to their keystone positions, untwist the last few millimetres only, and seat them into the IDC. Trim flush. Done.',
  },
  {
    id: 3,
    question:
      'A patch panel port has been terminated, the cable tested, and shows a Class EA marginal pass at 99.5 m of effective electrical length on a 28 m physical run. What is the most likely root cause?',
    options: [
      'The physical run genuinely exceeds the 90 m permanent-link limit and must be shortened.',
      'The certifier is set to the wrong cable standard and is mis-calculating the propagation delay.',
      'The metal back-box behind the outlet is coupling to the pairs and inflating the measured length.',
      'Excessive untwist (and likely over-stripped jacket) reflecting energy and inflating the length.',
    ],
    correctAnswer: 3,
    explanation:
      'Effective electrical length on a certifier is calculated from propagation delay. A 28 m physical run that reads as 99.5 m electrically has reflections — energy is bouncing back and forth between impedance discontinuities, lengthening the apparent path. The most common causes are (1) excessive pair untwist at one or both terminations, (2) over-stripped jacket leaving the pairs splayed, (3) a kinked cable somewhere in the run, or (4) a damaged conductor. Re-terminate both ends to the manufacturer strip length and untwist limit, retest. If the length still reads inflated, the cable is damaged and must be re-pulled.',
  },
  {
    id: 4,
    question:
      'Which colour-code scheme is being terminated when the pin assignment is: pin 1 white-orange, pin 2 orange, pin 3 white-green, pin 4 blue, pin 5 white-blue, pin 6 green, pin 7 white-brown, pin 8 brown?',
    options: [
      'T568B — orange pair on pins 1-2, green on 3-6; the common UK commercial default.',
      'T568A — recognisable because the green pair lands on pins 1-2 and orange on pins 3-6.',
      'A crossover pinout — one end is wired so transmit and receive pairs are deliberately swapped.',
      'A two-pair telephony pinout where only the blue and orange pairs carry the voice channel.',
    ],
    correctAnswer: 0,
    explanation:
      'T568B: orange pair on pins 1-2, green pair on pins 3-6, blue pair on pins 4-5, brown pair on pins 7-8. T568A swaps orange and green: green pair on pins 1-2, orange pair on pins 3-6, blue pair on pins 4-5, brown pair on pins 7-8. End-to-end, a T568A channel and a T568B channel are electrically identical — Ethernet uses the same pairs the same way regardless of colour. The site discipline is: pick ONE scheme, document it, terminate everything to it. Mixing the two on a single channel produces an unintended crossover.',
  },
  {
    id: 5,
    question:
      'You are using a Krone/LSA-PLUS impact tool on a legacy voice frame and find the conductors are not seating fully. What is the first thing to check?',
    options: [
      'The Category of the cable, since a Cat6A conductor will not seat in a voice-rated IDC slot.',
      'The charge level of the continuity tester, as a low battery can give a false not-seated reading.',
      'The blade — a Krone blade in the right orientation and spring depth, not a 110 blade.',
      'The jacket colour of the cable, which on legacy voice frames indicates the correct slot.',
    ],
    correctAnswer: 2,
    explanation:
      'Punchdown tool blades are not interchangeable across IDC families. 110-style, Krone/LSA-PLUS, and 66-block each have their own blade geometry. A 110 blade in a Krone slot will not seat the conductor and will damage the slot. Krone blades have a "cut" side and a "no-cut" side — orient the cut side towards the cable end so the excess conductor is trimmed. Check the spring tension; under-set, it will not seat the conductor; over-set, it can crack the IDC body. After mechanical setup, the next thing to check is conductor gauge versus slot rating — using 26 AWG telephony wire in a slot rated for 22-24 AWG produces poor contact.',
  },
  {
    id: 6,
    question:
      'What practical effect does using a tool-less keystone (where the closing cap engages an internal IDC) have on the certified Class of an installed channel?',
    options: [
      'It reliably degrades the channel by one Class, as a cap-engaged IDC contacts worse than a punch.',
      'None, provided the keystone is rated to the Class and terminated to manufacturer instructions.',
      'It tends to improve the channel by one Class, as the cap applies more consistent contact force.',
      'Tool-less keystones fall outside the standards, so a channel using them cannot be certified.',
    ],
    correctAnswer: 1,
    explanation:
      'Tool-less keystones are entirely conformant when used correctly. The certification is on the COMPONENT (the keystone, with its rated Category and tested transmission performance) and on the installed CHANNEL (TIA-1152-A or BS EN 50346 testing). The IDC mechanism — punchdown blade or tool-less internal IDC — does not appear in the certification chain. What matters is component rating, strip length, untwist discipline, and certification with documented results. A Cat6A tool-less keystone, terminated correctly, delivers Class EA exactly as a punchdown one does.',
  },
  {
    id: 7,
    question:
      'Why does ANSI/TIA-568.2-E (and BS EN 50173-1) treat "consistent end-to-end pinout" as a binding rule rather than a recommendation?',
    options: [
      'Because mixing the two schemes makes a crossover that non-auto-MDI/MDI-X devices cannot handle.',
      'Because a mixed-scheme site looks unprofessional on the records even though every link works.',
      'Because T568A is not permitted on UK commercial work, so a mixed site breaches the standard.',
      'Because shielded Cat6A can only terminate to T568A, so any T568B shielded outlet will fail.',
    ],
    correctAnswer: 0,
    explanation:
      'The pinout-consistency rule exists because real-world devices are not all auto-MDI/MDI-X. A modern managed switch usually negotiates around a crossover; a $30 IP camera, a legacy unmanaged hub, a small-business PoE injector or a BMS controller often does not. A site that mixes T568A and T568B may work for the office Ethernet on day one and fail when the access-control system, the IP camera fleet, or the BMS rolls out three months later. Pick one scheme, document it in the spec, write it on every patch panel label, and terminate every outlet and cord to it.',
  },
  {
    id: 8,
    question:
      'A new Cat6A installation passes Class EA at handover. Six months later, several links have degraded to Class E and a few are intermittent. What is the most likely root cause?',
    options: [
      'The bulk cable has aged in service and lost transmission performance across the installation.',
      'The patch cords have worn out and should be swapped before any link is re-terminated at all.',
      'Marginal terminations drifting under PoE heat and thermal cycling — re-terminate and re-certify.',
      'The certifier gave false passes on day one and the links were never genuinely Class EA at all.',
    ],
    correctAnswer: 2,
    explanation:
      'Marginal pass terminations are unstable under thermal cycling. PoE current produces heat in the conductors; the cable warms during the day and cools overnight; the IDC contacts move microscopically; under-tightened or over-stripped terminations slowly degrade. A link that just-passed Class EA on day one because of generous untwist drifts to Class E in months. The lesson: do not accept marginal Class EA passes — re-terminate them at handover, before the contractor leaves site. Class EA at handover with comfortable margins is a 15-year link; Class EA marginal-pass at handover is a six-month link.',
  },
  {
    id: 9,
    question:
      'What is the practical difference between a 110-block / 110 keystone and a 66-block, and where would you still encounter each in 2026?',
    options: [
      'They are electrically identical and can be used interchangeably for Cat6A data terminations.',
      '110-style is the modern data default; 66-block is older voice-only, found on legacy frames.',
      '110-style is used for fibre breakout while 66-block is the copper data format — never overlapping.',
      'Only 66-block can carry Power over Ethernet, so any PoE device must terminate on a 66 frame.',
    ],
    correctAnswer: 1,
    explanation:
      '110-style is the modern data IDC. Every Cat5e / 6 / 6A keystone or patch panel uses 110 (or a tool-less variant of it). 66-block is the older Western Electric / AT&T format from the analogue-voice era — wider slot pitch, looser geometry, fine for telephony but not rated for high-frequency data. Modern installations do not use 66-blocks as data terminations; you may encounter them on legacy analogue-voice frames in older commercial buildings, and the right response is usually to leave the voice on the 66-block and run new Cat6A on 110-style for any data service. Krone/LSA-PLUS is the European telecoms equivalent of 66-block, slightly newer, and is also encountered on legacy voice frames.',
  },
  {
    id: 10,
    question: 'Conductor preparation is described as "where Class is decided" — why?',
    options: [
      'Because components come rated; the channel Class is decided by the last few millimetres at each end.',
      'Because it is a manufacturer marketing slogan with no real bearing on whether a channel certifies.',
      'Because the standards require a single named brand of keystone, decided at the procurement stage.',
      'Because virtually all data-cabling faults originate in the bulk cable run, not at the terminations.',
    ],
    correctAnswer: 0,
    explanation:
      'Field experience on certified Cat6A jobs is overwhelming: the dominant failure modes are at the termination, not in the cable run. Strip length, untwist, IDC seating and consistent end-to-end pinout decide whether the installed channel passes Class EA. The cable comes from the factory rated; the keystone comes rated; the patch panel comes rated; whether the link delivers the rating is decided in the last 13 mm at each end. That is why competent contractors invest in installer training and torque-controlled / factory-prepared terminations, and why TIA-1152-A / BS EN 50346 channel certification at handover is non-negotiable.',
  },
];

const faqs = [
  {
    question: 'Should I use T568A or T568B?',
    answer: (
      <>
        Either is electrically valid. T568B is the more common UK and commercial default; T568A is
        the US federal default. The binding rule is consistency: pick ONE scheme on day one,
        document it in the spec, label every patch panel with it, and terminate every outlet, every
        patch panel and every cord to it. Mixing the two within a single channel produces an
        unintended crossover, which Ethernet auto-MDI/MDI-X may or may not negotiate around — and
        many non-Ethernet ICT devices do not have auto-MDI/MDI-X.
      </>
    ),
  },
  {
    question: 'What is the maximum pair-untwist length at a Cat6A termination?',
    answer: (
      <>
        13 mm per pair, per BS EN 50173-1 / ISO/IEC 11801-1 / ANSI/TIA-568.2-E, and per most
        manufacturer instructions for Cat6A keystones and patch panels. Beyond 13 mm, near-end
        crosstalk (NEXT) and return loss degrade rapidly. The pair twist is the electrical
        cancellation mechanism — once it is removed, the cancellation collapses across the untwisted
        region. Strip the jacket only to the manufacturer{"'"}s specified strip length (typically
        20-30 mm), fan the pairs to their IDC positions, untwist the last few millimetres only, and
        seat them.
      </>
    ),
  },
  {
    question: 'Are tool-less keystones acceptable for a Cat6A install?',
    answer: (
      <>
        Yes, provided the keystone itself is rated to Class EA / Cat6A and is terminated according
        to manufacturer instructions (strip length, lacing, untwist limit). The certifier judges the
        installed electrical channel, not the IDC mechanism. The two practical risks with tool-less
        keystones are (1) cheap unrated components badged as Cat6A — verify the component
        certification, and (2) installer shortcuts because no tool feels needed — which is when
        strip length and untwist discipline collapse. Use rated components, follow the instructions,
        and certify the channel.
      </>
    ),
  },
  {
    question: 'What is the difference between 110-style, Krone/LSA-PLUS and 66-block?',
    answer: (
      <>
        Three IDC families. <strong>110-style</strong> is the modern data default — every Cat5e/6/6A
        keystone and patch panel uses 110 or a tool-less variant of it.{' '}
        <strong>Krone/LSA-PLUS</strong> is the European-origin telecoms IDC, common on legacy voice
        frames; it has a slightly different blade geometry and orientation.{' '}
        <strong>66-block</strong> is the older US telecoms format with looser slot geometry, fine
        for analogue voice, not rated for Cat5e or above. In 2026 you use 110 for every new data
        job; you may encounter 66-block or Krone on legacy voice frames in older buildings.
      </>
    ),
  },
  {
    question: 'Does Cat6A really need a different termination process from Cat6 or Cat5e?',
    answer: (
      <>
        The principles are the same — IDC, strip to spec, fan pairs, untwist within limit, seat —
        but Cat6A is far less forgiving. The 500 MHz frequency response and the tighter NEXT /
        return-loss specifications mean that a sloppy termination that scrapes a Class D pass on
        Cat5e will fail Class EA on Cat6A. The cable is also physically different: 23 AWG conductors
        (vs 24 AWG for Cat5e), pair separators inside the jacket, and tighter twist rates. Strip
        length, untwist, and IDC seating discipline all need to be markedly tighter. Treat Cat6A as
        a craft job, not a Cat5e job in different cable.
      </>
    ),
  },
  {
    question: 'Why does conductor preparation get described as "where Class is decided"?',
    answer: (
      <>
        Because the cable, the keystone and the patch panel all carry their factory-certified
        Category rating; what determines whether the installed CHANNEL meets the Class is the last
        few millimetres at each termination. Strip length, jacket integrity, pair-untwist length,
        IDC seating and consistent end-to-end pinout decide whether a Cat6A run delivers Class EA or
        a Class E channel from Cat6A components. The components are bought; the Class is built — at
        the termination. That is also why every modern contract requires TIA-1152-A / BS EN 50346
        channel certification at handover.
      </>
    ),
  },
];

const DataCablingModule5Section1 = () => {
  const navigate = useNavigate();

  useSEO(
    'Copper Termination Tools and Techniques | Data Cabling Module 5.1 | Elec-Mate',
    'Copper data terminations — IDC families (110-style, Krone/LSA-PLUS, 66-block, tool-less keystones), strip lengths, the 13 mm pair-untwist limit, T568A vs T568B colour schemes, consistent end-to-end pinout, and how conductor preparation decides whether a Cat6A run delivers Class EA at certification.'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 1"
            title="Copper Termination Tools and Techniques"
            description="The IDC families an installer meets in the field — 110-style, Krone/LSA-PLUS, 66-block and modern tool-less keystones — the strip lengths and 13 mm pair-untwist limit that decide Class EA on Cat6A, the T568A vs T568B colour schemes, and the consistent end-to-end pinout discipline that separates a 15-year channel from a six-month channel."
            tone="yellow"
          />

          <TLDR
            points={[
              'Every modern copper data termination uses an Insulation Displacement Connection (IDC) — 110-style is the modern data default; Krone/LSA-PLUS and 66-block are legacy telecoms formats still encountered on older voice frames; tool-less keystones engage an internal IDC when the cap is closed.',
              'Class is decided in the last 13 mm of every termination. Pair untwist beyond 13 mm collapses the NEXT cancellation and spikes return loss; over-stripped jackets splay the pairs and remove the geometry the Category was certified at. Manufacturer strip lengths (typically 20-30 mm) and the 13 mm untwist limit are non-negotiable for Cat6A.',
              'T568A and T568B are electrically identical end-to-end — they only swap orange and green on pins 1-2 and 3-6. The site discipline is consistency: pick ONE scheme, document it, and terminate every outlet, every patch panel and every cord to it. Mixing the two within a channel creates a wired crossover that may or may not work depending on the device.',
              'Marginal Class EA passes on day one drift under thermal cycling and PoE load — they are six-month links, not 15-year links. Re-terminate marginal passes before handover. Channel certification to TIA-1152-A / BS EN 50346 with documented results is the only objective record of what the building actually has.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the four IDC families an installer meets in the field — 110-style, Krone/LSA-PLUS, 66-block, and tool-less keystones — and pick the correct blade and orientation for each',
              'State the manufacturer strip-length range (typically 20-30 mm) and the 13 mm pair-untwist limit, and explain the electrical reason each matters for Class EA',
              'Distinguish T568A from T568B by pin-out, recognise that they are electrically equivalent end-to-end, and apply the consistent-pinout discipline at site level',
              'Recognise the conductor-gauge / IDC-slot pairing rule and the failure mode of using mismatched gauges',
              'Diagnose common termination defects from certifier output — inflated effective length, NEXT failures near a connector, return-loss spikes — and link each back to a termination practice',
              'Describe why marginal Class EA passes are unstable under thermal cycling and PoE load, and apply the no-marginal-pass handover discipline',
              'Explain why conductor preparation — not cable choice — is "where Class is decided" on a Cat6A installation',
              'Apply consistent termination practice across keystones, patch panels and 110 strips so the certifier sees a uniform channel from outlet to active port',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The IDC family you actually meet on site</ContentEyebrow>

          <ConceptBlock
            title="Insulation Displacement Connection — the universal copper-data termination"
            plainEnglish={`Every modern copper data termination — keystone, patch panel, 110 strip, voice block — uses an Insulation Displacement Connection (IDC). The IDC blade pierces the conductor's insulation as the conductor is forced into the slot, making a gas-tight metal-to-metal contact without requiring the installer to strip the conductor itself. The slot geometry is sized to a specific conductor gauge; using the wrong gauge produces a poor or intermittent contact.`}
            onSite="In the field you mostly meet four IDC families: 110-style (modern data default — every Cat5e / 6 / 6A keystone and patch panel), Krone/LSA-PLUS (European telecoms, common on legacy voice frames), 66-block (older US telecoms — analogue voice only, not rated for Cat5e or above), and tool-less keystones (an internal IDC engaged by the closing cap). The four are NOT interchangeable — a 110 blade in a Krone slot will not seat the conductor and will damage the slot."
          >
            <p>The four IDC families you meet, by where you meet them:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>110-style.</strong> The modern data default. Every Cat5e / Cat6 / Cat6A
                keystone, patch panel and IDC distribution strip uses 110-style or a tool-less
                variant of it. Standard 110 punchdown tool with a 110 blade. 22 / 23 / 24 AWG slot
                ratings — match cable gauge to slot. Used on every new data job in 2026.
              </li>
              <li>
                <strong>Krone / LSA-PLUS.</strong> European-origin telecoms IDC (Krone is the German
                manufacturer; LSA-PLUS is the technology family). Slightly different blade geometry
                and orientation from 110 — the blade has a "cut" side that must face the cable end
                so excess conductor is trimmed in the same stroke. Common on legacy analogue-voice
                frames and some industrial-controls termination strips. Not normally used on new
                data jobs.
              </li>
              <li>
                <strong>66-block.</strong> Older US telecoms format (Western Electric / AT&amp;T).
                Wider slot pitch, looser slot geometry, fine for analogue voice but{' '}
                <strong>not rated for Cat5e or above</strong>. You meet 66-blocks on legacy voice
                frames in older commercial buildings — leave them on the voice service and run new
                Cat6A on 110-style for any data service.
              </li>
              <li>
                <strong>Tool-less keystones.</strong> A modern variant of 110-style where the IDC is
                hidden inside the keystone body and engages when the closing cap is pressed. No
                external punchdown tool needed. Functionally and electrically equivalent to a
                punchdown 110 keystone if the keystone is rated to the Class being installed. Faster
                on site, but discipline (strip length, untwist limit) is identical.
              </li>
            </ul>
            <p>
              The two practical rules across all four IDC families: (1) match the conductor gauge to
              the IDC slot rating — using 22 AWG cable in a 24 AWG slot cracks the slot; using 26
              AWG telephony wire in a 22-24 AWG slot produces poor contact, and (2) use the right
              blade in the right orientation — 110 blades, Krone blades and 66-block blades are not
              interchangeable, and the wrong blade damages the slot.
            </p>
          </ConceptBlock>

          {/* IDC family diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              The four IDC families — slot geometry and where you meet them
            </h4>
            <svg
              viewBox="0 0 880 560"
              className="w-full h-auto"
              role="img"
              aria-label="Diagram of four insulation displacement connector families. The 110-style block, the Krone or LSA-PLUS block, the older 66-block, and the modern tool-less keystone. Each is labelled with its modern usage: 110 for all new data work, Krone for legacy European telecoms, 66-block for legacy US analogue voice only, and tool-less for fast modern Cat6A keystones."
            >
              {/* ===== Family-name row (above panels) ===== */}
              <text
                x="120"
                y="38"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                110-STYLE
              </text>
              <text
                x="320"
                y="38"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                KRONE / LSA-PLUS
              </text>
              <text
                x="520"
                y="38"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                66-BLOCK
              </text>
              <text
                x="740"
                y="38"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                TOOL-LESS KEYSTONE
              </text>

              {/* ===== Panel row (y=60 to y=200) — slot graphic only inside ===== */}

              {/* 110-style panel */}
              <rect
                x="40"
                y="60"
                width="160"
                height="140"
                rx="10"
                fill="rgba(234,179,8,0.12)"
                stroke="#EAB308"
                strokeWidth="1.6"
              />
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <rect
                  key={'s110-' + i}
                  x={56 + i * 18}
                  y="100"
                  width="6"
                  height="60"
                  rx="1"
                  fill="#FACC15"
                />
              ))}

              {/* Krone panel */}
              <rect
                x="240"
                y="60"
                width="160"
                height="140"
                rx="10"
                fill="rgba(34,211,238,0.12)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <line
                  key={'sk-' + i}
                  x1={258 + i * 20}
                  y1="100"
                  x2={266 + i * 20}
                  y2="160"
                  stroke="#22D3EE"
                  strokeWidth="3"
                />
              ))}

              {/* 66-block panel */}
              <rect
                x="440"
                y="60"
                width="160"
                height="140"
                rx="10"
                fill="rgba(168,85,247,0.12)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              {[0, 1, 2, 3, 4].map((i) => (
                <rect
                  key={'s66-' + i}
                  x={460 + i * 30}
                  y="100"
                  width="8"
                  height="60"
                  rx="1"
                  fill="#A855F7"
                />
              ))}

              {/* Tool-less keystone panel */}
              <rect
                x="640"
                y="60"
                width="200"
                height="140"
                rx="10"
                fill="rgba(34,197,94,0.12)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              <rect
                x="680"
                y="100"
                width="120"
                height="60"
                rx="6"
                fill="rgba(34,197,94,0.20)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />

              {/* ===== Caption row 1 (below panels) — modern usage ===== */}
              <text
                x="120"
                y="222"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Modern data default
              </text>
              <text
                x="320"
                y="222"
                textAnchor="middle"
                fill="#CFFAFE"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                European telecoms
              </text>
              <text
                x="520"
                y="222"
                textAnchor="middle"
                fill="#F3E8FF"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Legacy analogue voice
              </text>
              <text
                x="740"
                y="222"
                textAnchor="middle"
                fill="#DCFCE7"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Fast modern Cat6A
              </text>

              {/* ===== Caption row 2 (below panels) — slot detail ===== */}
              <text
                x="120"
                y="240"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                22 / 23 / 24 AWG slots
              </text>
              <text
                x="320"
                y="240"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                Angled blade · cut-side to cable
              </text>
              <text
                x="520"
                y="240"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                NOT rated for Cat5e+
              </text>
              <text
                x="740"
                y="240"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                Internal 110 cap-engaged IDC
              </text>

              {/* ===== Rules panel (clear of all shapes) ===== */}
              <rect
                x="40"
                y="270"
                width="800"
                height="200"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="60"
                y="294"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                INSTALLER RULES
              </text>

              <text
                x="60"
                y="320"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                RULE 1
              </text>
              <text x="130" y="320" fill="#E5E7EB" fontSize="11" fontFamily="system-ui">
                Match conductor gauge to IDC slot rating. 22 AWG into a 24 AWG slot cracks it.
              </text>

              <text
                x="60"
                y="348"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                RULE 2
              </text>
              <text x="130" y="348" fill="#E5E7EB" fontSize="11" fontFamily="system-ui">
                Right blade, right orientation. 110, Krone and 66 blades are NOT interchangeable.
              </text>

              <text
                x="60"
                y="376"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                RULE 3
              </text>
              <text x="130" y="376" fill="#E5E7EB" fontSize="11" fontFamily="system-ui">
                66-block is analogue voice only — never use as a new data termination on Cat5e+.
              </text>

              <text
                x="60"
                y="404"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                RULE 4
              </text>
              <text x="130" y="404" fill="#E5E7EB" fontSize="11" fontFamily="system-ui">
                Tool-less Cat6A keystones are conformant — install discipline is identical to
                punchdown.
              </text>

              <text
                x="60"
                y="438"
                fill="#9CA3AF"
                fontSize="10"
                fontStyle="italic"
                fontFamily="system-ui"
              >
                All four families are IDC; failure modes are identical — gauge mismatch, wrong
                blade, over-strip, excess untwist.
              </text>

              {/* ===== Source footer ===== */}
              <line
                x1="40"
                y1="496"
                x2="840"
                y2="496"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <text
                x="440"
                y="518"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10.5"
                fontWeight="600"
                fontFamily="system-ui"
              >
                ANSI/TIA-568.2-E · BS EN 50173-1 · ISO/IEC 11801-1
              </text>
              <text
                x="440"
                y="540"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                From 15 April 2026 — BS 7671:2018+A4:2026 §716 (PoE / ELV DC) governs the cabling
                these IDCs serve
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Strip length and the 13 mm pair-untwist limit</ContentEyebrow>

          <ConceptBlock
            title="Where Class EA is decided — the last 13 mm of every termination"
            plainEnglish="The cable, the keystone and the patch panel all leave the factory rated to a Category. Whether the installed channel delivers the matching Class is decided in the last few millimetres at each termination. Two install practices dominate — strip length (how much of the outer jacket is removed before the conductors are fanned to the IDC slots) and pair-untwist length (how much of each pair's twist is undone to seat the conductors). Get them wrong and Cat6A delivers a Class E or worse channel from Cat6A components. Get them right and Cat6A delivers Class EA with comfortable margins."
            onSite="On site, treat strip length as a manufacturer-specified number — typically 20-30 mm for keystones, 25-30 mm for patch panels — not as a feel. Use a strip tool with a depth stop, or measure each strip. Untwist is harder to police because it is invisible after the keystone cap closes; train installers to fan each pair to its slot, then untwist only the last few millimetres before seating. The 13 mm pair-untwist limit is the hard cap. Anything more degrades NEXT and return loss measurably."
          >
            <p>The two electrical effects that drive the rules:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Pair-twist cancellation collapses when untwisted.</strong> The reason a
                balanced twisted-pair carries 10GBASE-T at all is that the equal and opposite
                signals on the two conductors of each pair, twisted together, cancel common-mode
                noise and induce equal-and-opposite EMF in any neighbouring pair — the basis of low
                NEXT. The moment you untwist a pair, that cancellation collapses across the
                untwisted region. NEXT degrades. The certifier flags it.
              </li>
              <li>
                <strong>Characteristic impedance is set by pair geometry.</strong> The 100-ohm
                characteristic impedance of Cat5e/6/6A is set by the spacing of the two conductors
                within a pair, the jacket geometry, and the pair-to-pair separation set by the cable
                construction. Strip too much jacket, splay the pairs, untwist them, and you change
                the local geometry — which causes a discontinuity in the impedance. The signal sees
                that as a reflection, which shows up as elevated return loss and inflated effective
                length on the certifier.
              </li>
            </ul>
            <p>The numbers most installers should commit to memory for Cat6A:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Strip length:</strong> per manufacturer instructions — typically 20-30 mm
                for keystones, 25-30 mm for patch panels. Use a strip tool with a depth stop.
              </li>
              <li>
                <strong>Pair untwist:</strong> 13 mm maximum per pair. Untwist only the last few
                millimetres before seating the conductor in the IDC slot.
              </li>
              <li>
                <strong>Pair separation:</strong> respect the manufacturer{"'"}s pair-fan geometry —
                many Cat6A keystones provide a guide that holds each pair at the correct entry
                angle.
              </li>
              <li>
                <strong>Conductor seating:</strong> seat in one stroke with the correct blade, the
                correct orientation and the correct spring tension. Re-seating after a weak first
                attempt damages the IDC slot.
              </li>
            </ul>
          </ConceptBlock>

          {/* Strip / untwist diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Cat6A termination geometry — strip length and the 13 mm pair-untwist limit
            </h4>
            <svg
              viewBox="0 0 880 480"
              className="w-full h-auto"
              role="img"
              aria-label="A horizontal Cat6A cable with the outer jacket stripped back roughly 25 millimetres on the right end. The four pairs are visible inside the jacket and are then fanned out individually. Each pair is shown with twist preserved up to within 13 millimetres of where each conductor enters the IDC slot. The pair-untwist limit is labelled as 13 millimetres maximum. The strip-length zone is labelled as 20 to 30 millimetres typical, manufacturer-specified."
            >
              {/* ===== Zone labels (above) — clear of all shapes ===== */}
              <text
                x="180"
                y="40"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                CABLE — jacket intact
              </text>
              <text
                x="450"
                y="40"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                STRIP ZONE — 20-30 mm
              </text>
              <text
                x="700"
                y="40"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                UNTWIST ZONE — ≤ 13 mm
              </text>

              {/* ===== Strip-length bracket (above strip zone) ===== */}
              <line x1="340" y1="60" x2="560" y2="60" stroke="#FACC15" strokeWidth="1.4" />
              <line x1="340" y1="56" x2="340" y2="64" stroke="#FACC15" strokeWidth="1.4" />
              <line x1="560" y1="56" x2="560" y2="64" stroke="#FACC15" strokeWidth="1.4" />

              {/* ===== Untwist bracket (above untwist zone) ===== */}
              <line x1="600" y1="60" x2="800" y2="60" stroke="#FCD34D" strokeWidth="1.4" />
              <line x1="600" y1="56" x2="600" y2="64" stroke="#FCD34D" strokeWidth="1.4" />
              <line x1="800" y1="56" x2="800" y2="64" stroke="#FCD34D" strokeWidth="1.4" />

              {/* ===== Cable body (intact jacket) ===== */}
              <rect
                x="40"
                y="180"
                width="300"
                height="40"
                rx="6"
                fill="rgba(234,179,8,0.18)"
                stroke="#EAB308"
                strokeWidth="1.8"
              />

              {/* ===== Strip zone (jacket removed, pairs visible inside) — vertical pair stubs ===== */}
              <line
                x1="350"
                y1="180"
                x2="350"
                y2="220"
                stroke="rgba(234,179,8,0.30)"
                strokeWidth="1.4"
                strokeDasharray="3 3"
              />
              <line
                x1="560"
                y1="180"
                x2="560"
                y2="220"
                stroke="rgba(234,179,8,0.30)"
                strokeWidth="1.4"
                strokeDasharray="3 3"
              />

              {/* Four twisted pairs in strip zone — drawn as zig-zag pairs */}
              <path
                d="M 350 188 Q 360 180 370 188 Q 380 196 390 188 Q 400 180 410 188 Q 420 196 430 188 Q 440 180 450 188 Q 460 196 470 188 Q 480 180 490 188 Q 500 196 510 188 Q 520 180 530 188 Q 540 196 550 188"
                stroke="#F97316"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M 350 196 Q 360 204 370 196 Q 380 188 390 196 Q 400 204 410 196 Q 420 188 430 196 Q 440 204 450 196 Q 460 188 470 196 Q 480 204 490 196 Q 500 188 510 196 Q 520 204 530 196 Q 540 188 550 196"
                stroke="#FED7AA"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M 350 204 Q 360 196 370 204 Q 380 212 390 204 Q 400 196 410 204 Q 420 212 430 204 Q 440 196 450 204 Q 460 212 470 204 Q 480 196 490 204 Q 500 212 510 204 Q 520 196 530 204 Q 540 212 550 204"
                stroke="#22C55E"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M 350 212 Q 360 220 370 212 Q 380 204 390 212 Q 400 220 410 212 Q 420 204 430 212 Q 440 220 450 212 Q 460 204 470 212 Q 480 220 490 212 Q 500 204 510 212 Q 520 220 530 212 Q 540 204 550 212"
                stroke="#3B82F6"
                strokeWidth="2"
                fill="none"
              />

              {/* ===== Untwist zone — straight conductors fanning to IDC slots ===== */}
              {/* Pair 1 — orange */}
              <line x1="560" y1="188" x2="800" y2="156" stroke="#F97316" strokeWidth="2" />
              <line x1="560" y1="190" x2="800" y2="172" stroke="#FED7AA" strokeWidth="2" />
              {/* Pair 2 — green */}
              <line x1="560" y1="200" x2="800" y2="188" stroke="#22C55E" strokeWidth="2" />
              <line x1="560" y1="204" x2="800" y2="204" stroke="#BBF7D0" strokeWidth="2" />
              {/* Pair 3 — blue */}
              <line x1="560" y1="208" x2="800" y2="220" stroke="#3B82F6" strokeWidth="2" />
              <line x1="560" y1="212" x2="800" y2="236" stroke="#BFDBFE" strokeWidth="2" />
              {/* Pair 4 — brown */}
              <line x1="560" y1="216" x2="800" y2="252" stroke="#A16207" strokeWidth="2" />
              <line x1="560" y1="218" x2="800" y2="268" stroke="#D6BCFA" strokeWidth="2" />

              {/* ===== IDC keystone block (right) ===== */}
              <rect
                x="800"
                y="140"
                width="40"
                height="140"
                rx="6"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.20)"
                strokeWidth="1.6"
              />
              {[156, 172, 188, 204, 220, 236, 252, 268].map((y, i) => (
                <line
                  key={'idc-' + i}
                  x1="800"
                  y1={y}
                  x2="836"
                  y2={y}
                  stroke="#FACC15"
                  strokeWidth="1.4"
                />
              ))}

              {/* ===== Below-shape labels (clear zone, no overlap) ===== */}
              <text
                x="180"
                y="248"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                factory pair geometry preserved
              </text>
              <text
                x="450"
                y="248"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                manufacturer-specified · use depth-stop strip tool
              </text>
              <text
                x="700"
                y="298"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                untwist only the last few mm before IDC seat
              </text>
              <text
                x="820"
                y="298"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                IDC keystone
              </text>

              {/* ===== Rule footer (clear of all shapes) ===== */}
              <rect
                x="40"
                y="340"
                width="800"
                height="120"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="60"
                y="364"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                CAT 6A TERMINATION RULES
              </text>

              <text
                x="60"
                y="392"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                RULE 1
              </text>
              <text x="130" y="392" fill="#E5E7EB" fontSize="11" fontFamily="system-ui">
                Strip to manufacturer length (20-30 mm typical). Use a strip tool with a depth stop.
              </text>

              <text
                x="60"
                y="416"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                RULE 2
              </text>
              <text x="130" y="416" fill="#E5E7EB" fontSize="11" fontFamily="system-ui">
                Fan pairs without splaying. Preserve factory pair geometry up to the IDC slot.
              </text>

              <text
                x="60"
                y="440"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                RULE 3
              </text>
              <text x="130" y="440" fill="#E5E7EB" fontSize="11" fontFamily="system-ui">
                Untwist ≤ 13 mm per pair. Seat in one stroke. Re-seating damages the IDC slot.
              </text>
            </svg>
          </div>

          <RegsCallout
            source="ANSI/TIA-568.2-E (2024) · §6 (Balanced twisted-pair installation — paraphrased)"
            clause={
              <>
                Cabling components shall be terminated in accordance with the manufacturer{"'"}s
                instructions. Pair untwist at the termination shall not exceed the limit specified
                for the cabling Category, typically 13 mm for Category 6A. The cable jacket shall be
                removed only to the length necessary to allow termination of the pairs, and the pair
                geometry within the cable shall be preserved up to the point of termination.
              </>
            }
            meaning="The standards do not micro-manage the installer — they fix two boundaries (manufacturer instructions, 13 mm untwist) and require that the installed channel pass certification testing. In practice that means: read the keystone instructions, use a strip tool with a depth stop, untwist only the last 13 mm of each pair, and certify every channel to TIA-1152-A / BS EN 50346 with documented results. Marginal passes are not acceptable handover quality."
            cite="See also BS EN 50173-1 · §6.4 and ISO/IEC 11801-1 · §6.4 — same rule, EN/ISO Class terminology."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>T568A vs T568B and the consistent-pinout rule</ContentEyebrow>

          <ConceptBlock
            title="Two equivalent colour schemes — and the binding rule of consistency"
            plainEnglish="T568A and T568B are two pin-assignment schemes for the eight-pin RJ45 connector. They are electrically equivalent end-to-end — the same four pairs, used the same way by Ethernet, only with the orange and green colour assignments swapped on pins 1-2 and 3-6. Either scheme works. The binding rule is consistency: pick ONE scheme on day one, document it in the spec, label every patch panel with it, and terminate every outlet, every patch panel and every cord to it. Mixing the two within a channel produces a wired crossover, which Ethernet auto-MDI/MDI-X may negotiate around but many other ICT devices will not."
            onSite="In the UK, T568B is the more common commercial default; T568A is the US federal default. Either is fine. The wrong move is letting two crews work on different floors with different defaults, or a contractor finishing a floor in T568B and an electrician adding a remedial outlet in T568A. The site discipline is to write the chosen scheme into the spec, paint it on every patch panel header label, and inspect every termination at handover."
          >
            <p>The two schemes side by side:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>T568B (UK / commercial default).</strong> Pin 1 white-orange, pin 2 orange,
                pin 3 white-green, pin 4 blue, pin 5 white-blue, pin 6 green, pin 7 white-brown, pin
                8 brown. Orange pair on pins 1-2; green pair on pins 3-6.
              </li>
              <li>
                <strong>T568A (US federal default).</strong> Pin 1 white-green, pin 2 green, pin 3
                white-orange, pin 4 blue, pin 5 white-blue, pin 6 orange, pin 7 white-brown, pin 8
                brown. Green pair on pins 1-2; orange pair on pins 3-6.
              </li>
            </ul>
            <p>
              Because the two schemes only differ on which colour goes to pins 1-2 versus 3-6, an
              end-to-end T568A channel and an end-to-end T568B channel are electrically identical —
              the same four pairs carrying the same Ethernet signals the same way. The problem is
              mixing. A T568A outlet patched with a T568B cord becomes a wired crossover (pins 1-2
              to pins 3-6), which:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Modern auto-MDI/MDI-X switches usually negotiate around — they detect the crossover
                and re-map internally.
              </li>
              <li>
                Many older / cheaper / non-Ethernet ICT devices (some IP cameras, PoE injectors,
                legacy hubs, building-automation gateways) do not have auto-MDI/MDI-X and simply
                fail to communicate.
              </li>
              <li>
                Even when the device negotiates around, the inconsistency makes future fault-finding
                and patching slower — every link has to be checked individually.
              </li>
            </ul>
            <p>
              The consistent-pinout rule is therefore a site-management rule, not an
              electrical-performance rule. It is also one of the cheapest disciplines on a cabling
              job: pick T568B (or T568A — but pick one), write it into the spec, label it on every
              patch panel, and inspect every termination at handover.
            </p>
          </ConceptBlock>

          {/* T568A vs T568B diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              T568A and T568B — pin colour mapping and the only difference
            </h4>
            <svg
              viewBox="0 0 880 540"
              className="w-full h-auto"
              role="img"
              aria-label="Two RJ45 colour code charts side by side. On the left, T568A: pin 1 white-green, pin 2 green, pin 3 white-orange, pin 4 blue, pin 5 white-blue, pin 6 orange, pin 7 white-brown, pin 8 brown. On the right, T568B: pin 1 white-orange, pin 2 orange, pin 3 white-green, pin 4 blue, pin 5 white-blue, pin 6 green, pin 7 white-brown, pin 8 brown. The only difference highlighted: orange and green pairs swap on pins 1-2 and 3-6."
            >
              {/* ===== Scheme titles (above panels) ===== */}
              <text
                x="220"
                y="32"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                T568A · US federal default
              </text>
              <text
                x="660"
                y="32"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                T568B · UK / commercial default
              </text>

              {/* ===== T568A panel ===== */}
              <rect
                x="40"
                y="50"
                width="360"
                height="280"
                rx="10"
                fill="rgba(34,197,94,0.06)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />

              {/* Pin numbers row (above cores) */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((pin, i) => (
                <text
                  key={'apn-' + pin}
                  x={70 + i * 40}
                  y="80"
                  textAnchor="middle"
                  fill="#E5E7EB"
                  fontSize="10.5"
                  fontWeight="700"
                  fontFamily="system-ui"
                >
                  {pin}
                </text>
              ))}

              {/* Pin tops */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <rect
                  key={'apt-' + i}
                  x={62 + i * 40}
                  y="92"
                  width="16"
                  height="14"
                  rx="2"
                  fill="rgba(255,255,255,0.08)"
                  stroke="rgba(255,255,255,0.30)"
                  strokeWidth="1"
                />
              ))}

              {/* Cores (vertical bars) — A scheme */}
              {[
                { c: '#FFFFFF', s: '#22C55E' },
                { c: '#22C55E', s: '#22C55E' },
                { c: '#FFFFFF', s: '#F97316' },
                { c: '#3B82F6', s: '#3B82F6' },
                { c: '#FFFFFF', s: '#3B82F6' },
                { c: '#F97316', s: '#F97316' },
                { c: '#FFFFFF', s: '#A16207' },
                { c: '#A16207', s: '#A16207' },
              ].map((r, i) => (
                <rect
                  key={'aco-' + i}
                  x={64 + i * 40}
                  y="106"
                  width="12"
                  height="80"
                  rx="2"
                  fill={r.c}
                  stroke={r.s}
                  strokeWidth="1.6"
                />
              ))}

              {/* Pair group brackets (below cores, above colour-name row) */}
              <line x1="70" y1="200" x2="110" y2="200" stroke="#22C55E" strokeWidth="2" />
              <text
                x="90"
                y="216"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="9"
                fontFamily="system-ui"
              >
                PR 3
              </text>
              <line
                x1="150"
                y1="200"
                x2="270"
                y2="200"
                stroke="#F97316"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <text
                x="210"
                y="216"
                textAnchor="middle"
                fill="#FED7AA"
                fontSize="9"
                fontFamily="system-ui"
              >
                PR 2 (3 + 6)
              </text>
              <line x1="190" y1="226" x2="230" y2="226" stroke="#3B82F6" strokeWidth="2" />
              <text
                x="210"
                y="240"
                textAnchor="middle"
                fill="#BFDBFE"
                fontSize="9"
                fontFamily="system-ui"
              >
                PR 1
              </text>
              <line x1="310" y1="200" x2="350" y2="200" stroke="#A16207" strokeWidth="2" />
              <text
                x="330"
                y="216"
                textAnchor="middle"
                fill="#D6BCFA"
                fontSize="9"
                fontFamily="system-ui"
              >
                PR 4
              </text>

              {/* Colour names row (below cores) */}
              {['w/grn', 'grn', 'w/org', 'blu', 'w/blu', 'org', 'w/brn', 'brn'].map((name, i) => (
                <text
                  key={'acl-' + i}
                  x={70 + i * 40}
                  y="270"
                  textAnchor="middle"
                  fill="#E5E7EB"
                  fontSize="9.5"
                  fontFamily="system-ui"
                >
                  {name}
                </text>
              ))}

              {/* Difference highlight — pins 1-2 (grn) + 3+6 (org) */}
              <rect
                x="56"
                y="296"
                width="80"
                height="20"
                rx="3"
                fill="rgba(34,197,94,0.18)"
                stroke="#22C55E"
                strokeWidth="1.2"
              />
              <text
                x="96"
                y="310"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                grn pair
              </text>
              <rect
                x="136"
                y="296"
                width="120"
                height="20"
                rx="3"
                fill="rgba(249,115,22,0.18)"
                stroke="#F97316"
                strokeWidth="1.2"
              />
              <text
                x="196"
                y="310"
                textAnchor="middle"
                fill="#FED7AA"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                org pair (3 + 6)
              </text>

              {/* ===== T568B panel ===== */}
              <rect
                x="480"
                y="50"
                width="360"
                height="280"
                rx="10"
                fill="rgba(234,179,8,0.06)"
                stroke="#EAB308"
                strokeWidth="1.4"
              />

              {/* Pin numbers row */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((pin, i) => (
                <text
                  key={'bpn-' + pin}
                  x={510 + i * 40}
                  y="80"
                  textAnchor="middle"
                  fill="#E5E7EB"
                  fontSize="10.5"
                  fontWeight="700"
                  fontFamily="system-ui"
                >
                  {pin}
                </text>
              ))}

              {/* Pin tops */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <rect
                  key={'bpt-' + i}
                  x={502 + i * 40}
                  y="92"
                  width="16"
                  height="14"
                  rx="2"
                  fill="rgba(255,255,255,0.08)"
                  stroke="rgba(255,255,255,0.30)"
                  strokeWidth="1"
                />
              ))}

              {/* Cores — B scheme */}
              {[
                { c: '#FFFFFF', s: '#F97316' },
                { c: '#F97316', s: '#F97316' },
                { c: '#FFFFFF', s: '#22C55E' },
                { c: '#3B82F6', s: '#3B82F6' },
                { c: '#FFFFFF', s: '#3B82F6' },
                { c: '#22C55E', s: '#22C55E' },
                { c: '#FFFFFF', s: '#A16207' },
                { c: '#A16207', s: '#A16207' },
              ].map((r, i) => (
                <rect
                  key={'bco-' + i}
                  x={504 + i * 40}
                  y="106"
                  width="12"
                  height="80"
                  rx="2"
                  fill={r.c}
                  stroke={r.s}
                  strokeWidth="1.6"
                />
              ))}

              {/* Pair group brackets */}
              <line x1="510" y1="200" x2="550" y2="200" stroke="#F97316" strokeWidth="2" />
              <text
                x="530"
                y="216"
                textAnchor="middle"
                fill="#FED7AA"
                fontSize="9"
                fontFamily="system-ui"
              >
                PR 2
              </text>
              <line
                x1="590"
                y1="200"
                x2="710"
                y2="200"
                stroke="#22C55E"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <text
                x="650"
                y="216"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="9"
                fontFamily="system-ui"
              >
                PR 3 (3 + 6)
              </text>
              <line x1="630" y1="226" x2="670" y2="226" stroke="#3B82F6" strokeWidth="2" />
              <text
                x="650"
                y="240"
                textAnchor="middle"
                fill="#BFDBFE"
                fontSize="9"
                fontFamily="system-ui"
              >
                PR 1
              </text>
              <line x1="750" y1="200" x2="790" y2="200" stroke="#A16207" strokeWidth="2" />
              <text
                x="770"
                y="216"
                textAnchor="middle"
                fill="#D6BCFA"
                fontSize="9"
                fontFamily="system-ui"
              >
                PR 4
              </text>

              {/* Colour names row */}
              {['w/org', 'org', 'w/grn', 'blu', 'w/blu', 'grn', 'w/brn', 'brn'].map((name, i) => (
                <text
                  key={'bcl-' + i}
                  x={510 + i * 40}
                  y="270"
                  textAnchor="middle"
                  fill="#E5E7EB"
                  fontSize="9.5"
                  fontFamily="system-ui"
                >
                  {name}
                </text>
              ))}

              {/* Difference highlight */}
              <rect
                x="496"
                y="296"
                width="80"
                height="20"
                rx="3"
                fill="rgba(249,115,22,0.18)"
                stroke="#F97316"
                strokeWidth="1.2"
              />
              <text
                x="536"
                y="310"
                textAnchor="middle"
                fill="#FED7AA"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                org pair
              </text>
              <rect
                x="576"
                y="296"
                width="120"
                height="20"
                rx="3"
                fill="rgba(34,197,94,0.18)"
                stroke="#22C55E"
                strokeWidth="1.2"
              />
              <text
                x="636"
                y="310"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                grn pair (3 + 6)
              </text>

              {/* ===== Legend &amp; difference footer ===== */}
              <rect
                x="40"
                y="360"
                width="800"
                height="160"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="60"
                y="384"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                LEGEND
              </text>

              <rect
                x="60"
                y="400"
                width="14"
                height="14"
                rx="2"
                fill="#3B82F6"
                stroke="#3B82F6"
                strokeWidth="1.2"
              />
              <text x="84" y="412" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Pair 1 — blue (pins 4-5, both schemes)
              </text>

              <rect
                x="60"
                y="424"
                width="14"
                height="14"
                rx="2"
                fill="#F97316"
                stroke="#F97316"
                strokeWidth="1.2"
              />
              <text x="84" y="436" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Pair 2 — orange · A: pins 3+6 · B: pins 1-2
              </text>

              <rect
                x="460"
                y="400"
                width="14"
                height="14"
                rx="2"
                fill="#22C55E"
                stroke="#22C55E"
                strokeWidth="1.2"
              />
              <text x="484" y="412" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Pair 3 — green · A: pins 1-2 · B: pins 3+6
              </text>

              <rect
                x="460"
                y="424"
                width="14"
                height="14"
                rx="2"
                fill="#A16207"
                stroke="#A16207"
                strokeWidth="1.2"
              />
              <text x="484" y="436" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Pair 4 — brown (pins 7-8, both schemes)
              </text>

              <line
                x1="60"
                y1="460"
                x2="820"
                y2="460"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <text
                x="440"
                y="484"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Only difference: orange and green pairs swap on pins 1-2 and 3-6
              </text>
              <text
                x="440"
                y="504"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Same four pairs · electrically identical end-to-end · ANSI/TIA-568.2-E
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Conductor preparation as the deciding factor</ContentEyebrow>

          <ConceptBlock
            title="The cable came rated — the channel is built at the termination"
            plainEnglish="A common contractor mistake is treating cable Category as the deliverable. It is not. The cable is rated by the manufacturer; the keystone is rated by the manufacturer; the patch panel is rated by the manufacturer. What the contractor delivers is the installed channel — and the channel's Class is decided by the install practice at every termination. Strip length, jacket integrity, pair-untwist, IDC seating and consistent end-to-end pinout collectively decide whether a Cat6A run delivers Class EA at certification or a Class E channel from Cat6A components."
            onSite="The discipline is end-of-job certification with documented results. TIA-1152-A / BS EN 50346 channel testing, Level III/IV/V certifier, every link individually tested, every result archived. Marginal passes are re-terminated before handover. The contractor sees the certifier output as evidence; the client sees it as the warranty record. Without certification, what the building has is unknown — Cat6A components do not guarantee a Cat6A channel."
          >
            <p>Three concrete examples of how termination practice decides Class:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Over-stripped jacket → splayed pairs → return-loss spike.</strong> A 60 mm
                strip on a Cat6A keystone (instead of the 25 mm specified) splays the pairs across
                the keystone hood. The pair-to-pair separation that the cable construction was
                certified at is gone. The return-loss measurement spikes near the connector. The
                certifier reports a Class EA marginal pass or fail. Cause: strip-length discipline.
              </li>
              <li>
                <strong>Excess pair untwist → NEXT degradation.</strong> A 25 mm untwist (vs the 13
                mm cap) on the orange pair removes the cancellation across half the IDC region. NEXT
                between orange and green pairs degrades by 6-8 dB. The certifier reports near-end
                crosstalk failures on the affected pair-to-pair combinations. Cause: untwist
                discipline.
              </li>
              <li>
                <strong>Inconsistent pinout → working channel that intermittently fails.</strong> A
                floor terminated half in T568A and half in T568B works for the office laptops
                because the switches auto-negotiate. The same floor fails the access-control rollout
                because the door controllers do not have auto-MDI/MDI-X. Cause: pinout-consistency
                discipline.
              </li>
            </ul>
            <p>
              All three are termination practice. None is the cable{"'"}s fault. None is the
              keystone{"'"}s fault. All three are caught at certification — if the contractor
              certifies. None are caught at all if the contractor does not certify.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Common termination defects and how the certifier reports them"
            source="TIA-1152-A · BS EN 50346 — Level III/IV/V certifier output"
            headers={['Termination defect', 'Certifier symptom', 'Fix']}
            rows={[
              [
                'Over-stripped jacket',
                'Return-loss spike near connector; effective length inflated',
                'Re-terminate to manufacturer strip length (typically 20-30 mm)',
              ],
              [
                'Excess pair untwist (>13 mm)',
                'NEXT failure on affected pair combinations',
                'Re-terminate; untwist only the last 13 mm of each pair',
              ],
              [
                'Wrong IDC blade or orientation',
                'Intermittent continuity, marginal NEXT',
                'Use the correct blade for the IDC family; cut side toward cable',
              ],
              [
                'Conductor gauge / IDC slot mismatch',
                'Poor or intermittent contact; high DC resistance',
                'Match cable gauge to IDC slot rating; replace damaged keystone',
              ],
              [
                'Inconsistent T568A/T568B within channel',
                'Wire-map fails as crossover',
                'Re-terminate to the chosen site scheme; document at patch panel',
              ],
              [
                'Cable kinked or crushed in run',
                'Effective length inflated; return-loss bump mid-run',
                'Re-pull cable; bend radii per BS EN 50174-2',
              ],
              [
                'Marginal Class EA pass at handover',
                'Drift to Class E or fail under PoE thermal load within months',
                'Re-terminate at handover — do not accept marginal passes',
              ],
            ]}
            notes="Every modern field certifier (Fluke DSX, ideal SignalTEK, Softing) reports these symptoms automatically. The contractor's job is to read the report, identify the failing or marginal links, re-terminate them, and re-test. Class EA at handover with comfortable margins is a 15-year channel; marginal-pass Class EA is a six-month channel."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title="Treating Cat6A like Cat5e at the termination — and assuming the cable will compensate"
            whatHappens={
              <>
                Installer trained on Cat5e takes the same habits to Cat6A: 50 mm strip because "the
                colours fan out easier", 25 mm untwist because "it lets you see what you{"'"}re
                doing", strip tool with no depth stop, no manufacturer instructions read. Cable
                certifies at Class E (some links pass Class EA marginally). Six months in, the
                marginal passes drift under PoE thermal load. Client reports intermittent 10G
                failures. Contractor is back on site re-terminating every link.
              </>
            }
            doInstead={
              <>
                Treat Cat6A as a craft job, not a Cat5e job. Read the manufacturer instructions for
                the specific keystone or patch panel being used. Use a strip tool with a depth stop
                set to the manufacturer{"'"}s strip length. Untwist only the last 13 mm of each
                pair. Seat in one stroke with the correct blade. Certify every link to TIA-1152-A /
                BS EN 50346 with documented results. Re-terminate any marginal passes before
                handover. Treat each termination as where Class EA is built — because that is where
                it is.
              </>
            }
          />

          <Scenario
            title="A second-fix electrician adds three remedial outlets to an existing Cat6A floor — what is the binding discipline?"
            situation={
              <>
                A retrofit. The original Cat6A install was certified to Class EA two years ago and
                documented to T568B throughout. Three outlets need to be added to support a new
                meeting-room cluster. The on-call electrician has Cat6A cable and Cat6A keystones,
                but is more familiar with T568A from previous jobs. The client says "as long as it
                works".
              </>
            }
            whatToDo={
              <>
                Three rules govern the remedial work. (1) Match the existing site scheme — T568B,
                every outlet, every patch-panel termination. The site discipline of consistent
                pinout is more important than the electrician{"'"}s personal habit. (2) Use the same
                termination practice as the original install: manufacturer strip length, 13 mm
                untwist limit, correct IDC blade in the correct orientation. (3) Certify the three
                new links to TIA-1152-A / BS EN 50346, archive the results alongside the original
                2024 certification, and update the site administration record per BS EN 50174-1 /
                TIA-606-D so the patch panel labels reflect the new outlets.
              </>
            }
            whyItMatters={
              <>
                Remedial work is where most consistent-pinout violations creep in — a different
                electrician, a different default, three outlets that "work for now". Two years
                later, when the meeting-room cluster gets a refresh and the new IP phones do not
                have auto-MDI/MDI-X, those three outlets fail and nobody can trace the cause. The
                fix is to enforce site discipline at every remedial touch: same scheme, same
                termination practice, same certification regime, same documentation update. The cost
                of doing it right is fifteen extra minutes per outlet; the cost of doing it wrong is
                a half-day fault-find two years later.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'Every modern copper data termination is an Insulation Displacement Connection (IDC). 110-style is the default; Krone/LSA-PLUS and 66-block are legacy formats; tool-less keystones are conformant if rated to the Class.',
              'Strip length and the 13 mm pair-untwist limit are where Class EA is decided. Read the manufacturer instructions; use a strip tool with a depth stop; untwist only the last 13 mm of each pair.',
              'T568A and T568B are electrically equivalent end-to-end. The binding rule is consistency — pick ONE scheme, document it, terminate everything to it. Mixing within a channel creates an unintended crossover.',
              'Marginal Class EA passes drift under thermal cycling and PoE load. Re-terminate at handover. Class EA at handover with comfortable margins is a 15-year channel; marginal-pass Class EA is a six-month channel.',
              'Conductor preparation, not cable choice, decides the installed Class. Cat6A components terminated badly deliver a Class E channel; the same components terminated correctly deliver Class EA. Certify with TIA-1152-A / BS EN 50346 and archive the results.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-5')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Module 5
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-5-section-2')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: Link vs Channel Testing
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule5Section1;
