/**
 * Module 3 · Section 3 — Lighting circuits: one-way, two-way, intermediate
 * AM2 day-prep — AM2 Phase B (composite installation: cable, containment, circuits, terminations)
 * Switching that actually works on test day — strappers in the right place, neutrals at the fitting.
 */

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  TLDR,
  RegsCallout,
  Scenario,
  KeyTakeaways,
  FAQ,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Lighting Circuits — One-Way, Two-Way, Intermediate | AM2 Module 3.3 | Elec-Mate';
const DESCRIPTION =
  'Wiring AM2 lighting circuits cleanly — one-way, two-way and intermediate switching with strappers in the right place.';

const AM2Module3Section3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: 'one-way-switching',
      question: 'In one-way switching, what happens to the neutral wire?',
      options: [
        'It bypasses the switch and goes straight to the fitting',
        'It links through the switch to the fitting',
        'It goes directly to the fitting only',
        "It's not required for one-way switching",
      ],
      correctIndex: 0,
      explanation:
        'The neutral bypasses the switch completely and goes directly to the light fitting. Only the live conductor is switched in one-way switching.',
    },
    {
      id: 'two-way-wiring',
      question: 'What cable is typically used for two-way strapper connections?',
      options: [
        'Twin & earth cable',
        'Three-core and earth cable',
        'Single core cable',
        'Two separate single cables',
      ],
      correctIndex: 1,
      explanation:
        'Three-core and earth cable is used between two-way switches to provide the two strapper connections (L1 and L2) plus the common.',
    },
    {
      id: 'intermediate-switching',
      question: 'What makes intermediate switching different from two-way?',
      options: [
        'It can control from unlimited positions',
        'It has four terminals instead of three',
        'It uses a different type of cable',
        'It requires a special MCB',
      ],
      correctIndex: 1,
      explanation:
        'Intermediate switches have four terminals (two in, two out) allowing them to be inserted between two-way switches to provide switching from additional positions.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'What cable size is typically used for lighting circuits in AM2?',
      options: [
        '1.0mm²',
        '1.5mm²',
        '2.5mm²',
        '4.0mm²',
      ],
      correctAnswer: 1,
      explanation:
        'Lighting circuits typically use 1.5mm² twin & earth cable with 6A or 10A MCB protection in AM2 assessments.',
    },
    {
      id: 2,
      question: 'In one-way switching, which wire is actually switched?',
      options: [
        'All wires',
        'Neutral wire',
        'Live wire',
        'Earth wire',
      ],
      correctAnswer: 2,
      explanation:
        'Only the live wire is switched in one-way switching. The neutral goes directly to the fitting, bypassing the switch.',
    },
    {
      id: 3,
      question: 'What happens if strappers are connected incorrectly in two-way switching?',
      options: [
        'The MCB will trip',
        'The circuit works normally',
        'It creates a short circuit',
        "One switch position won't work",
      ],
      correctAnswer: 3,
      explanation:
        "Incorrect strapper connections mean the switches can't communicate properly, resulting in one switch position being ineffective.",
    },
    {
      id: 4,
      question: 'How many terminals does an intermediate switch have?',
      options: [
        '4 terminals',
        '3 terminals',
        '2 terminals',
        '6 terminals',
      ],
      correctAnswer: 0,
      explanation:
        'Intermediate switches have 4 terminals (numbered 1, 2, 3, 4) to allow crossing of the strapper connections when operated.',
    },
    {
      id: 5,
      question: 'What cable type is used between two-way switches?',
      options: [
        'Twin & earth cable',
        '3-core & earth cable',
        'Flex cable',
        'Single core cable',
      ],
      correctAnswer: 1,
      explanation:
        '3-core & earth cable is required between two-way switches to provide the two strapper connections (L1 and L2) plus earth continuity.',
    },
    {
      id: 6,
      question: 'Which conductor requires brown sleeving when used as a switched live?',
      options: [
        'Brown conductor',
        'Green/yellow conductor',
        'Blue conductor',
        'Black conductor',
      ],
      correctAnswer: 2,
      explanation:
        'When a blue conductor is used as a switched live (rather than neutral), it must be identified with brown sleeving at both ends.',
    },
    {
      id: 7,
      question: 'What is the minimum insulation resistance required for lighting circuits?',
      options: [
        '0.5 MΩ',
        '5 MΩ',
        '2 MΩ',
        '1 MΩ',
      ],
      correctAnswer: 3,
      explanation:
        'BS 7671 requires a minimum insulation resistance of 1 MΩ for circuits up to 500 V (including lighting), tested at 500 V DC.',
    },
    {
      id: 8,
      question: 'In intermediate switching, what happens when the intermediate switch is operated?',
      options: [
        'It crosses the internal connections',
        'It adds an extra live feed',
        'It breaks the circuit completely',
        'It isolates the earth connection',
      ],
      correctAnswer: 0,
      explanation:
        'When operated, the intermediate switch crosses its internal connections (1-4, 2-3 instead of 1-3, 2-4), changing the circuit state.',
    },
    {
      id: 9,
      question: 'What is the most common cause of two-way switching circuits not working properly?',
      options: [
        'The MCB rating is too low',
        'Strappers connected to wrong terminals',
        'The cable run is too long',
        'The neutral is undersized',
      ],
      correctAnswer: 1,
      explanation:
        'Incorrect strapper connections (L1 and L2 mixed up) is the most common fault, resulting in the light not responding to one of the switches.',
    },
    {
      id: 10,
      question: 'Where must the neutral conductor go in all switching arrangements?',
      options: [
        'Through all switch terminals',
        'Through the first switch only',
        'Direct to the light fitting, bypassing switches',
        'To earth terminal in each switch',
      ],
      correctAnswer: 2,
      explanation:
        'The neutral conductor must always go directly to the light fitting, bypassing all switches. Only the live conductor is switched.',
    },
  ];

  const learningOutcomes = [
    'Install one-way, two-way, and intermediate lighting circuits as per AM2 drawings and specifications',
    'Correctly identify and terminate all conductors with appropriate sleeving',
    'Wire switches and ceiling roses with professional workmanship standards',
    'Carry out required electrical tests before energisation according to NET standards',
    'Understand common candidate errors and how to avoid them',
    'Demonstrate safe working practices and systematic fault-finding techniques',
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/am2/module3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 3"
            title="Lighting Circuits - One-Way, Two-Way, Intermediate"
            description="Master lighting circuit installation for AM2 assessment - one-way, two-way, and intermediate switching with professional workmanship standards."
            tone="yellow"
          />

          <TLDR
            points={[
              'Lighting on AM2 = 1.5 mm² T&E on a 6 A MCB, with a 30 mA RCD covering luminaires in dwellings (Reg 411.3.4).',
              'One-way: switch the line, neutral goes straight to the fitting. Two-way: 3-core & earth between switches for L1/L2 strappers + COM. Intermediate: 4-terminal switch crosses strappers between two-ways.',
              "Brown sleeving on the blue when it's a switched live in a switch drop. Green/yellow sleeve on every CPC, every accessory.",
              "It's the switching logic that fails candidates, not the cable size — wire each switch position dead and prove it with continuity before energising.",
              'Energising before testing = automatic fail. Continuity, IR, polarity, then Zs.',
            ]}
          />

          <CommonMistake
            title="CRITICAL: Lighting Circuits Foundation for AM2 Success"
            whatHappens="Lighting circuits are fundamental to AM2 assessment. While they may seem simpler than power circuits, candidates frequently lose marks on conductor identification, poor workmanship, and incorrect switching arrangements. The assessor will check every connection, termination, and test result. Rushed work or poor understanding of switching principles leads to failure. Master the basics here - they're the foundation for everything else."
            doInstead="Treat lighting like the foundation it is — identify every conductor, sleeve every CPC, and verify each switch position before you move on."
          />

          <LearningOutcomes outcomes={learningOutcomes} />

          <ConceptBlock title="1. One-Way Switching - Complete Installation Guide">
            <p>
              <strong>Phase 1: Cable Installation & Preparation</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Route cable from consumer unit to switch position.</strong> Use 1.5mm² twin
                & earth cable. Ensure adequate support every 300mm horizontally, 400mm vertically.
                Cable must be mechanically protected where required.
              </li>
              <li>
                <strong>Continue cable from switch to ceiling rose.</strong> Maintain cable
                integrity. No joints in inaccessible areas. Use proper cable entry methods into back
                boxes and ceiling roses.
              </li>
              <li>
                <strong>Strip cable ends - Switch: 15mm, Ceiling rose: 20mm.</strong> Use proper
                cable strippers. No damage to conductor cores. Remove exactly the right amount of
                sheath - too much exposes cable, too little prevents proper termination.
              </li>
              <li>
                <strong>Apply green/yellow sleeving to CPC at both ends.</strong> Sleeving must
                cover all exposed copper CPC. Ensure sleeving doesn't interfere with terminations.
              </li>
            </ol>
            <p>
              <strong>Phase 2: Switch Connections</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70" start={5}>
              <li>
                <strong>Connect live feed (brown) to COM terminal.</strong> This is the permanent
                live from the consumer unit. Ensure tight connection with no exposed copper outside
                terminal.
              </li>
              <li>
                <strong>Connect switched live (brown) to L1 terminal.</strong> This feeds the light
                fitting when switch is closed. Apply brown identification sleeve if using different
                coloured conductor.
              </li>
              <li>
                <strong>Secure neutral and CPC in back box connector block.</strong> Neutral and CPC
                bypass the switch. Use proper connector block rated for the application. No joints
                in switch back box if possible.
              </li>
              <li>
                <strong>Secure switch to back box with correct screws.</strong> Switch must be level
                and flush. Cable must not be trapped. Ensure switch operates smoothly.
              </li>
            </ol>
            <p>
              <strong className="text-elec-yellow">Common Installation Errors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Switching neutral instead of live</strong> - Creates dangerous live circuit
                when "off"
              </li>
              <li>
                <strong>Poor conductor identification</strong> - Confusion during testing and future
                maintenance
              </li>
              <li>
                <strong>Loose terminations</strong> - Arcing, overheating, fire risk
              </li>
              <li>
                <strong>Exposed copper at terminals</strong> - Risk of short circuit and
                electrocution
              </li>
              <li>
                <strong>CPC not sleeved</strong> - Identification failure, doesn't meet BS7671
              </li>
              <li>
                <strong>Cable damaged during installation</strong> - Insulation resistance failure
              </li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Key Point:</strong> In one-way switching, only
              the live conductor is switched. The neutral must go directly to the fitting, not
              through the switch terminals.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 411.3.4"
            clause={
              <>
                "Within domestic (household) premises, additional protection by an RCD with a rated
                residual operating current not exceeding 30 mA shall be provided for AC final
                circuits supplying luminaires."
              </>
            }
            meaning={
              <>
                If the AM2 spec describes a dwelling-style installation, your lighting circuits must
                be on a 30 mA RCD (or RCBO). On a split board, lighting goes on the RCD side. With
                RCBOs per circuit, every lighting RCBO is the 30 mA type. A lighting circuit on a
                non-RCD-protected MCB in a dwelling spec is non-compliant.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 411.3.4."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 559.5.1"
            clause={
              <>
                "At each fixed lighting point one of the following shall be used for the termination
                of the wiring system: (a) a ceiling rose complying with BS 67; (b) a luminaire
                supporting coupler (LSC); (c) a batten lampholder or pendant set; (d) a luminaire
                complying with BS EN 60598; (e) a suitable socket-outlet; (f) a plug-in lighting
                distribution unit; (g) a connection unit complying with BS 1363-4; (h) appropriate
                terminals enclosed in a box; (i) a DCL outlet; (j) an installation coupler."
              </>
            }
            meaning={
              <>
                Every lighting point on the AM2 rig has to terminate in one of these — typically
                you'll be fitting a BS 67 ceiling rose or a BS EN 60598 luminaire. Don't make a
                joint in the void with a connector block and tape it up; that's not on the list.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 559.5.1."
          />

          <ConceptBlock title="2. Two-Way Switching - Complete Installation Guide">
            <p>
              <strong>Phase 1: Cable Installation & Planning</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Install 1.5mm² T&E from consumer unit to Switch 1 position.</strong> This
                carries the permanent live feed. Ensure proper cable support and protection
                throughout run.
              </li>
              <li>
                <strong>Install 1.5mm² 3-core & earth from Switch 1 to Switch 2.</strong> Critical
                cable - carries the two strappers. Plan route carefully to avoid damage. This cable
                enables the two-way switching function.
              </li>
              <li>
                <strong>Install 1.5mm² T&E from Switch 2 to light fitting.</strong> Carries switched
                live to fitting. Neutral continues from Switch 1 position through connector blocks.
              </li>
            </ol>
            <p>
              <strong>Phase 2: Switch 1 Connections (Feed Point)</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70" start={4}>
              <li>
                <strong>Connect permanent live (brown) to COM terminal.</strong> This is the live
                feed from the consumer unit. Ensure maximum contact area and tight connection.
              </li>
              <li>
                <strong>Connect first strapper to L1 terminal.</strong> Use brown-sleeved conductor
                from 3-core cable. This will connect to L1 on Switch 2.
              </li>
              <li>
                <strong>Connect second strapper to L2 terminal.</strong> Use black-sleeved conductor
                from 3-core cable. This will connect to L2 on Switch 2.
              </li>
            </ol>
            <p>
              <strong>Phase 3: Switch 2 Connections (Load Point)</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70" start={7}>
              <li>
                <strong>Connect switched live (to light) to COM terminal.</strong> This feeds the
                light fitting. When either switch position allows continuity through strappers,
                light will operate.
              </li>
              <li>
                <strong>Connect first strapper from Switch 1 to L1.</strong> Match the conductor
                sleeving - brown to brown, maintaining consistent identification.
              </li>
              <li>
                <strong>Connect second strapper from Switch 1 to L2.</strong> Match the conductor
                sleeving - black to black. These connections complete the strapper circuit.
              </li>
            </ol>
            <p>
              <strong className="text-elec-yellow">Critical Two-Way Switching Errors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Incorrect strapper connections</strong> - Light operates from one switch
                only
              </li>
              <li>
                <strong>Using wrong cable types</strong> - Twin & earth instead of 3-core between
                switches
              </li>
              <li>
                <strong>Poor conductor identification</strong> - Confusion about which strapper is
                which
              </li>
              <li>
                <strong>Neutral through switch terminals</strong> - Dangerous and incorrect practice
              </li>
              <li>
                <strong>CPC not continuous</strong> - Safety regulation failure
              </li>
              <li>
                <strong>Mixed up COM terminals</strong> - Circuit completely non-functional
              </li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Common Error:</strong> Swapping L1 and L2
              connections means one switch position won't work. Always check both switches operate
              the light in both positions.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <ConceptBlock title="3. Intermediate Switching - Complete Installation Guide">
            <p>
              <strong>Phase 1: Circuit Planning</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Install first two-way switch exactly as in two-way switching.</strong> This
                receives the live feed and sends out the two strappers. Install and wire completely
                before adding intermediate.
              </li>
              <li>
                <strong>Run 3-core & earth from first two-way to intermediate switch.</strong>{' '}
                Carries the two strappers from first switch. Plan cable route to avoid damage.
              </li>
              <li>
                <strong>Run 3-core & earth from intermediate to final two-way switch.</strong>{' '}
                Carries modified strapper signals to final switch. Multiple intermediates can be
                chained.
              </li>
            </ol>
            <p>
              <strong>Phase 2: Intermediate Switch Connections</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70" start={4}>
              <li>
                <strong>Connect first strapper from Switch 1 to Terminal 1.</strong> Input from L1
                of first two-way switch. Maintains brown identification sleeving.
              </li>
              <li>
                <strong>Connect second strapper from Switch 1 to Terminal 2.</strong> Input from L2
                of first two-way switch. Maintains black identification sleeving.
              </li>
              <li>
                <strong>Connect first strapper to Switch 2 from Terminal 3.</strong> Output to L1 of
                final two-way switch. Apply appropriate identification sleeving.
              </li>
              <li>
                <strong>Connect second strapper to Switch 2 from Terminal 4.</strong> Output to L2
                of final two-way switch. Complete strapper circuit through intermediate.
              </li>
            </ol>
            <p>
              <strong>Phase 3: Final Two-Way Switch</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70" start={8}>
              <li>
                <strong>Wire final two-way switch COM to light fitting.</strong> This provides the
                switched live output when circuit continuity is established.
              </li>
              <li>
                <strong>Connect L1 and L2 to strappers from intermediate.</strong> Complete the
                switching circuit. Maintain consistent conductor identification throughout.
              </li>
              <li>
                <strong>Ensure neutral and CPC continuity throughout circuit.</strong> These bypass
                all switches and must maintain continuity from source to light fitting.
              </li>
            </ol>
            <p>
              <strong>How Intermediate Switching Works — Internal Crossing:</strong> The
              intermediate switch internally crosses its connections when operated. This allows it
              to "reverse" the strapper signals between the two-way switches.
            </p>
            <p>
              <strong>Normal Position:</strong> Terminal 1 - Terminal 3, Terminal 2 - Terminal 4.
              Strappers pass through unchanged.
            </p>
            <p>
              <strong>Operated Position:</strong> Terminal 1 - Terminal 4, Terminal 2 - Terminal 3.
              Strappers are crossed, changing circuit state.
            </p>
            <p>
              <strong className="text-elec-yellow">Critical Installation Points:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Wrong terminal connections</strong> - Circuit won't work from all positions
              </li>
              <li>
                <strong>Poor strapper identification</strong> - Impossible to trace faults
              </li>
              <li>
                <strong>Using 4-core cable</strong> - Not required, wastes conductor
              </li>
              <li>
                <strong>Neutral through intermediate</strong> - Bypass all switches completely
              </li>
              <li>
                <strong>Inconsistent sleeving</strong> - Testing and maintenance difficulties
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <ConceptBlock title="Testing and Verification">
            <p>
              <strong>Continuity Tests:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Protective conductor continuity</li>
              <li>Ring final circuit continuity (if applicable)</li>
              <li>Switched live continuity in all switch positions</li>
              <li>Neutral conductor continuity</li>
            </ul>
            <p>
              <strong>Other Required Tests:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Insulation resistance (1MO minimum)</li>
              <li>Polarity at all relevant points</li>
              <li>Earth fault loop impedance</li>
              <li>RCD operation (if applicable)</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Testing Sequence for Lighting Circuits:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Visual inspection - Check all connections, sleeving, mechanical security</li>
              <li>Continuity of protective conductors</li>
              <li>Continuity of ring final circuit conductors (if applicable)</li>
              <li>Insulation resistance between conductors</li>
              <li>Polarity testing - Ensure switch breaks live, not neutral</li>
              <li>Earth fault loop impedance (after energisation)</li>
              <li>Functional testing - All switches operate light correctly</li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="AM2 Assessment Tips">
            <p>
              <strong>Time Management:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Plan cable routes before starting installation</li>
              <li>Prepare all cable ends together to save time</li>
              <li>Apply sleeving systematically to avoid confusion</li>
              <li>Test each section as you complete it</li>
            </ul>
            <p>
              <strong>Quality Checkpoints:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>All conductors properly identified and sleeved</li>
              <li>No exposed copper at terminals</li>
              <li>Switches and ceiling roses level and secure</li>
              <li>Cable properly supported throughout run</li>
              <li>All connections tight and mechanically sound</li>
            </ul>
            <p>
              <strong>Common Candidate Failures:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Energising circuits before completing all required tests</li>
              <li>Poor conductor identification leading to testing difficulties</li>
              <li>Incorrect switch wiring causing operational failures</li>
              <li>Damaged cables causing insulation resistance failures</li>
              <li>Unsafe working practices during installation</li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Two-way switching only works from one switch"
            situation={
              <>
                You've wired a two-way circuit between two switches with 3-core & earth. Switch A
                turns the light on and off correctly. Switch B does nothing — light stays in
                whatever state Switch A left it. Cabling is correct, all terminations look tight,
                nothing tripped.
              </>
            }
            whatToDo={
              <>
                Isolate. The fault is almost always crossed strappers — L1/L2 swapped at one end, so
                one position of Switch B parallels the strappers instead of switching between them.
                Open Switch B, lift the brown and the black-with-brown-sleeve, swap them between L1
                and L2, retighten. Test with the meter dead-side first: continuity between COM-A and
                COM-B should make and break in all four switch combinations.
              </>
            }
            whyItMatters={
              <>
                Two-way switching is one of the most common AM2 fail points because the cabling
                "looks right" — both switches operate, both have continuity, but the logic is
                broken. Catching it dead with a continuity test before energising is what an
                assessor expects to see.
              </>
            }
          />

          <FAQ
            items={[
              {
                question: 'Why does the blue conductor in a switch drop need brown sleeving?',
                answer:
                  "Because at that point it's a switched live, not a neutral. BS 7671 requires conductors to be identified by their function — a blue cable acting as a switched line has to be sleeved brown at both ends so the next person opening that ceiling rose or switch isn't fooled into thinking it's neutral. On AM2, missed brown sleeving on a switched live is a classic identification fail.",
              },
              {
                question:
                  'Do I have to use 3-core & earth between two-way switches, or can I run two singles?',
                answer:
                  "On the AM2 rig, run 3-core & earth — that's what the spec calls for and what the assessor expects to see. Singles in conduit are technically valid but only if the spec says singles in conduit. Don't substitute.",
              },
              {
                question: 'Does the CPC have to go to a plastic switch?',
                answer:
                  'Yes — terminate the CPC into the earth terminal in the back box (not the switch plate, which is plastic). The CPC has to be continuous through the circuit even if the immediate accessory is all-insulated. Sleeve it green/yellow and park it in the back-box earth terminal. Cutting it short or leaving it floating fails BS 7671 identification and continuity.',
              },
              {
                question: 'How do I add a third switching position to a two-way circuit?',
                answer:
                  'Drop in an intermediate switch between the two two-ways. Pull a 3-core & earth from the first two-way to the intermediate (carrying the two strappers), then another 3-core & earth from the intermediate to the second two-way. The intermediate has 4 terminals and crosses 1↔3/2↔4 with 1↔4/2↔3 when operated. You can chain multiple intermediates the same way.',
              },
              {
                question: "What's the minimum insulation resistance for a lighting circuit?",
                answer:
                  "1 MΩ at 500 V DC between live conductors and to earth, per BS 7671. Anything lower needs investigation. Most healthy lighting circuits read >200 MΩ on a calibrated tester. If you're seeing under 1 MΩ, it's almost always damaged insulation at a termination, a screw through a cable, or moisture in an outdoor run — not an actual cable fault.",
              },
              {
                question:
                  'Can I energise the lighting just to check the switches work, then test properly afterwards?',
                answer:
                  'No. Energising before completing continuity, IR and polarity is an automatic AM2 fail. The whole point of the test sequence is to catch a fault before it becomes live — reverse polarity, low IR, broken CPC. Test dead first, every time. The assessor will be watching for it and recording the order.',
              },
            ]}
          />

          <KeyTakeaways
            points={[
              '1.5 mm² T&E on a 6 A MCB for lighting; 30 mA RCD additional protection in dwellings (Reg 411.3.4).',
              'Switch the line, never the neutral. Neutral goes straight to the fitting.',
              'One-way: 1× T&E in, 1× T&E out. Two-way: 3-core & earth between switches. Intermediate: 4-terminal switch crossing the strappers.',
              'Blue used as a switched live = brown sleeve at both ends. Every CPC sleeved green/yellow.',
              'Reg 559.5.1 — terminate at every lighting point in an approved fitting/accessory. No bare connector blocks in voids.',
              'Test dead before energising: continuity, IR (≥1 MΩ), polarity, then Zs once live. Energising untested = fail.',
            ]}
          />

          <Quiz questions={quizQuestions} title="Lighting Circuits Knowledge Check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module3/section2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Power Circuits
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module3/section4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Terminations & Connections
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module3Section3;
