import { ArrowLeft, ChevronLeft, ChevronRight, Cable } from 'lucide-react';
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
    id: 'fam4-s3-ph30',
    question:
      'Standard fire-resistant cables for fire detection and fire alarm systems are tested to PH30 per BS EN 50200 Annex E. What does PH30 actually mean?',
    options: [
      'A 30 V maximum test voltage applied to the cable during its type-test.',
      'Circuit integrity maintained for 30 minutes under simultaneous fire (842 °C), water spray and shock.',
      'A 30 mm minimum bending-radius limit for the installed fire-resistant cable.',
      'A 30 °C continuous-temperature rating for the cable sheath in service.',
    ],
    correctIndex: 1,
    explanation:
      'PH (Pruefung Hardness — German origin of the test designation) classifications combine three simultaneous stresses, not just temperature. The "30" is minutes of survival under combined fire / water / shock. This is the test that distinguishes a "fire-resistant" cable from a merely "fire-retardant" one.',
  },
  {
    id: 'fam4-s3-ph120',
    question:
      'BS 5839-1:2025 distinguishes between standard cables and ENHANCED cables. What is enhanced cable, and where is it used?',
    options: [
      'Any cable fitted with a copper screen for EMC and interference purposes.',
      'PH120 — 120 minutes of integrity, for voice alarm in phased evacuation and life-critical interfaces.',
      'Any double-insulated cable rated for use with Class II equipment.',
      'Any cable with a fire-resistant outer sheath applied over standard cores.',
    ],
    correctIndex: 1,
    explanation:
      'Enhanced (PH120) is the longer-survival category, used selectively where the consequence of cable loss in fire is unacceptable within 30 minutes. The selection rule is driven by evacuation strategy and fire-engineering analysis, not by general "more is better" thinking — over-specifying enhanced cable in a small simple building is unjustified and costly.',
  },
  {
    id: 'fam4-s3-bs8519',
    question:
      'BS 8519 is referenced alongside BS 5839-1 for life-safety cable systems. What does BS 8519 do?',
    options: [
      'It publishes the BSI list of approved cable manufacturers and product codes.',
      'It is the code of practice for selecting and installing fire-resistant cable systems.',
      'It specifies a single mandatory cable type for all UK life-safety applications.',
      'It replaces BS 5839-1 as the governing standard for fire alarm systems.',
    ],
    correctIndex: 1,
    explanation:
      'BS 8519 is the engineering-practice companion to the system-specification standards. Designers and installers should treat BS 8519 as the practical reference for HOW to build a fire-resistant cable system that meets the BS 5839-1 selection rules.',
  },
  {
    id: 'fam4-s3-ficore',
    question:
      'Common fire-resistant cable types found on UK fire alarm installations include FP200 Gold, FP PLUS, and MICC (mineral-insulated copper-clad, "Pyro"). Which statement about their selection is correct?',
    options: [
      'All three are fully interchangeable on any fire alarm circuit without restriction.',
      'FP200 Gold is the standard PH30 choice, FP PLUS the enhanced PH120, and MICC the extreme option.',
      'MICC is obsolete and no longer permitted on new fire alarm installations.',
      'FP200 Gold is the enhanced cable and FP PLUS the standard everyday one.',
    ],
    correctIndex: 1,
    explanation:
      'The cable selection follows a hierarchy of fire-survival capability and cost. Most buildings use FP200 Gold (or equivalent PH30 cable) for the bulk of fire alarm wiring. FP PLUS or equivalent PH120 is reserved for specific circuits where extended survival is mandated. MICC is reserved for extreme-environment or critical-life-safety duty.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'PH30 fire-resistant cable to BS EN 50200 Annex E maintains circuit integrity under what test conditions?',
    options: [
      'Fire only, at 842 °C, for 30 minutes — the flame applied without water spray or impact.',
      'Mechanical shock only, with repeated impacts for 30 minutes to simulate falling debris.',
      'Fire (842 °C) + water spray + mechanical shock together for 30 minutes, carrying signal throughout.',
      'Fire only, for 120 minutes, representing the longer enhanced-cable survival duration.',
    ],
    correctAnswer: 2,
    explanation:
      'The combined-stress test is what makes PH-classified cables genuinely "fire-resistant" rather than merely "fire-retardant" (which means slow to ignite, not capable of continued operation in fire).',
  },
  {
    id: 2,
    question:
      'When does BS 5839-1:2025 require ENHANCED (PH120) cable rather than standard (PH30)?',
    options: [
      'Where the evacuation strategy or fire-engineering design needs cable survival beyond 30 minutes.',
      'On detection circuits only, since detectors report longest; sounder circuits can stay on standard PH30.',
      'Always, on every fire alarm circuit, because enhanced cable is inherently safer than standard cable.',
      'Never in practice — PH120 is a theoretical category and UK installations always use standard PH30.',
    ],
    correctAnswer: 0,
    explanation:
      'Enhanced cable selection is a design decision driven by evacuation strategy and fire engineering — typically voice alarm in phased evacuation, extended-evacuation buildings, and life-critical interfaces to suppression / AOV / lift control. The decision is recorded in the design records, justifying why standard PH30 is insufficient and PH120 is required.',
  },
  {
    id: 3,
    question: 'BS 8519 sits alongside BS 5839-1 for life-safety cable systems. What is its scope?',
    options: [
      'A published list of cable products approved by BSI for use on UK fire alarm systems.',
      'A direct replacement for BS 5839-1, superseding its cabling and segregation clauses entirely.',
      'A collection of manufacturer cable datasheets gathered into a single BSI reference document.',
      'The code of practice for selecting and installing fire-resistant cable SYSTEMS for life safety.',
    ],
    correctAnswer: 3,
    explanation:
      'BS 8519 is the engineering-practice standard for the cable system. Treat BS 5839-1 as "what" and BS 8519 as "how to install it correctly".',
  },
  {
    id: 4,
    question:
      'BS EN 50200 Annex E is referenced for fire-resistant cable testing in fire alarm applications. What is the test method?',
    options: [
      'A 842 °C gas flame with periodic water spray and mechanical impact together, while the cable carries signal.',
      'A static heat-soak in an oven at a fixed temperature, with the cable energised but not impacted or sprayed.',
      'A pure mechanical pull test measuring the tensile force the cable withstands before the conductors part.',
      'An insulation-resistance (megger) test at elevated temperature to confirm the dielectric survives heat.',
    ],
    correctAnswer: 0,
    explanation:
      'The Annex E test combines fire, water and mechanical shock — a realistic representation of conditions a fire alarm cable would face during a real building fire with active fire-fighting. The PH classification is the survival time under these combined stresses.',
  },
  {
    id: 5,
    question:
      'A designer is specifying cable for a 10-storey residential building with phased evacuation strategy. Which cable category applies to the voice alarm sounder circuits?',
    options: [
      'PH15 — a reduced category, acceptable because the sounders only operate for the first evacuation phase.',
      'PH30 standard — 30 minutes of survival is adequate for any residential voice alarm sounder circuit.',
      'PH120 enhanced — phased evacuation in a high-rise can run well beyond 30 minutes, so sounders need it.',
      'Non-fire-rated cable, since the sounders are fully tested and proven before practical handover.',
    ],
    correctAnswer: 2,
    explanation:
      'Phased evacuation is one of the textbook drivers for enhanced cable selection. The evacuation duration drives the cable survival requirement; phased evacuation in a high-rise demands longer cable survival than simultaneous evacuation in a small building.',
  },
  {
    id: 6,
    question:
      'Mineral-insulated copper-clad (MICC, "Pyro") cable retains its place in modern fire alarm installations because of which combination of properties?',
    options: [
      'Its low material cost and ready availability, making it the economy choice for routine fire alarm wiring.',
      'Its flexibility and tool-less termination, making it the fastest fire-resistant cable to install on site.',
      'Its modest fire resistance combined with light weight, suiting temporary and short-life installations.',
      'Inorganic MgO insulation that cannot burn, a copper sheath earth, and fire survival well beyond PH120.',
    ],
    correctAnswer: 3,
    explanation:
      'MICC is the legacy high-performance choice that has not been displaced by polymeric fire-resistant cables for the most demanding applications. The fire / mechanical performance and longevity justify the higher cost and skilled-labour requirement in those niches.',
  },
  {
    id: 7,
    question:
      'A simple Category L3 system in a single-storey small office building, simultaneous evacuation, no extended-evacuation considerations, no life-critical interfaces. What cable category is the design-correct selection for the detection and sounder circuits?',
    options: [
      'PH30 standard (typically FP200 Gold) — no enhanced-cable driver applies for this building.',
      'PH120 enhanced, to give the building the maximum available fire-survival margin throughout.',
      'Non-fire-rated cable, because a single-storey building evacuates before cable survival matters.',
      'Pyro / MICC, on the basis that the most robust cable is always the safest possible specification.',
    ],
    correctAnswer: 0,
    explanation:
      'Cable selection is calibrated to the building\'s evacuation strategy and fire-engineering requirements. PH30 is the default for routine applications; enhanced is for specific drivers; MICC is for extreme cases. Over-specifying is not "safer" — it is unjustified cost.',
  },
  {
    id: 8,
    question:
      'BS 5839-1:2025 clause 16 (cabling, labelling and identification) directs that fire alarm cables should be of a single common colour. What is the operative colour and why?',
    options: [
      'Brown, matching the line-conductor colour so the cabling reads as a normal power circuit.',
      'Red, applied end-to-end across all fire alarm cabling and the dedicated LV mains feed.',
      'White, chosen purely for maximum visibility in dark voids, risers and ceiling spaces.',
      'Black, to keep the fire alarm cabling visually discreet within shared containment runs.',
    ],
    correctAnswer: 1,
    explanation:
      'Red is applied end-to-end across all fire alarm cabling, and the 2025 clarification extends it to the dedicated LV mains feed. The single-common-colour rule is one of the lowest-cost, highest-impact engineering controls available: the cabling is identifiable at a glance, less likely to be disturbed during unrelated work, and faster to trace than identifying cables by termination at fault-finding time.',
  },
  {
    id: 9,
    question:
      'A circuit serves a fire-suppression release interface — a 24 V DC release signal from the CIE to a gas-suppression panel that operates a critical life-safety function in a server room. Which cable category is correct?',
    options: [
      'Non-fire-rated cable, since the release signal is a brief pulse rather than a sustained supply.',
      'Standard PH30 — 30 minutes of survival is adequate for any 24 V DC interface release circuit.',
      'CAT5e structured-cabling cable, as the release signal is only low-voltage DC at modest current.',
      'Enhanced PH120 or higher — a life-critical release where cable failure could leave suppression inoperative.',
    ],
    correctAnswer: 3,
    explanation:
      'Life-critical interfaces are textbook enhanced-cable applications. The consequence of cable failure during a fire — suppression not operating — is exactly the failure mode enhanced cable is designed to prevent.',
  },
  {
    id: 10,
    question:
      'Why does BS 5839-1:2025 require fire-resistant cables to retain INTEGRITY (continuous operation) rather than merely RESIST IGNITION during a fire event?',
    options: [
      'Because the fire alarm must keep operating THROUGH the fire — losing function early leaves no detection or sounders.',
      'For cosmetic reasons — integrity-rated cable carries clearer markings and a tidier appearance in containment.',
      'For cost reasons — integrity-rated cable is cheaper to manufacture than ordinary ignition-resistant cable.',
      'For manufacturing convenience — the integrity test is simpler for cable makers to certify their products against.',
    ],
    correctAnswer: 0,
    explanation:
      'The distinction between "fire-retardant" (slow to ignite) and "fire-resistant" (continues to function in fire) is the engineering distinction that matters. The PH classification quantifies fire-resistance; fire-retardant cables alone do not meet BS 5839-1 requirements for fire alarm circuits.',
  },
];

const FireAlarmModule4Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Cable types and fire resistance | Fire Alarm Module 4.3 | Elec-Mate',
    description:
      'BS 5839-1:2025 cable categories — Standard PH30 (BS EN 50200 Annex E) for routine circuits, Enhanced PH120 (with BS 8434-2) for voice alarm / phased evacuation / life-critical interfaces, BS 8519 cable system code, and the major cable types (FP200 Gold, FP PLUS, MICC).',
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
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3"
            title="Cable types and fire resistance"
            description="BS 5839-1:2025 cable categories — Standard PH30 to BS EN 50200 Annex E for routine circuits, Enhanced PH120 with BS 8434-2 for voice alarm / phased evacuation / life-critical interfaces, the BS 8519 code of practice, and the major cable families used in UK fire alarm work."
            tone="yellow"
          />

          <TLDR
            points={[
              'Two BS 5839-1:2025 cable categories: STANDARD (PH30) for most circuits, ENHANCED (PH120) for life-critical / phased-evacuation / extended-evacuation duty.',
              'PH30: 30 minutes of circuit integrity under combined fire (842 °C) + water spray + mechanical shock per BS EN 50200 Annex E.',
              'PH120: 120 minutes of circuit integrity under the same combined stresses, additionally tested per BS 8434-2 for the longer survival.',
              'Selection is DESIGN-DRIVEN by evacuation strategy and fire engineering — building height, evacuation type (simultaneous vs phased vs extended), and life-critical interface presence.',
              'BS 8519 is the code of practice for fire-resistant power and control cable SYSTEMS in life-safety applications — the engineering-practice companion to BS 5839-1.',
              'Common types: FP200 Gold (PH30, default), FP PLUS (PH120, enhanced), MICC / Pyro (mineral-insulated copper-clad — extreme-environment / critical-life-safety duty).',
              'BS 5839-1:2025 clause 16 — single common colour, RED preferred, end-to-end including the LV mains feed.',
              'Fire-RESISTANT (continued operation in fire) is required; fire-RETARDANT (slow to ignite) alone is not sufficient.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish Standard (PH30) from Enhanced (PH120) cable categories per BS 5839-1:2025 and select the correct category for a given application',
              'Explain the BS EN 50200 Annex E test (combined fire / water / mechanical shock) and the BS 8434-2 supplementary test for enhanced cables',
              'Apply BS 8519 as the code of practice for fire-resistant cable system selection and installation',
              'Identify the major UK fire alarm cable types (FP200 Gold, FP PLUS, MICC / Pyro) and the application envelope of each',
              'Justify cable selection in design records by reference to evacuation strategy, building height, and life-critical interface presence',
              'Apply the BS 5839-1:2025 single-colour rule (red preferred) to all fire alarm cabling end-to-end',
              'Distinguish fire-RESISTANT (continued operation) from fire-RETARDANT (slow to ignite), and recognise why the system needs the former',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The two cable categories — Standard and Enhanced</ContentEyebrow>

          <ConceptBlock
            title="Standard (PH30) — the default for most circuits"
            plainEnglish="A PH30 cable is one that has been tested under the BS EN 50200 Annex E procedure — a defined gas flame at 842 °C, periodic water spray representing fire-fighting water hitting the cable, and periodic mechanical impact representing falling debris — and continued to carry signal or power for at least 30 minutes. The PH classification is the time of circuit integrity under those combined stresses. Standard PH30 cable is the default selection for routine fire alarm circuits in most buildings: detection loops, sounder circuits, interface circuits in non-extended-evacuation buildings."
            onSite="When you pick up a coil of FP200 Gold or equivalent on the van, you are picking up a PH30 cable. It is the workhorse of UK fire alarm installation. It survives the standard test — fire + water + shock for 30 minutes — and it terminates with relatively conventional methods (gland and termination, no specialised tooling beyond standard cable preparation)."
          >
            <p>What PH30 testing actually involves:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Fire.</strong> A defined gas flame at 842 °C is applied to the cable along a
                specified length. The temperature represents a fully developed cellulosic fire — the
                standard reference fire condition for building-fire testing.
              </li>
              <li>
                <strong>Water spray.</strong> At defined intervals during the fire exposure, water
                spray is applied to the cable. The spray simulates fire-fighting water reaching the
                cable during fire-service intervention. Water on a hot cable is a severe stress:
                thermal shock, ingress potential, dielectric stress.
              </li>
              <li>
                <strong>Mechanical shock.</strong> At defined intervals, a mechanical impact is
                applied to the cable mounting or to the cable itself. The impact simulates falling
                debris, ceiling collapse, or other mechanical events occurring during a fire.
              </li>
              <li>
                <strong>Circuit integrity.</strong> Throughout the test, the cable carries low-
                voltage signal or power (typically a representative load). The cable must continue
                to carry that signal without short circuit or open circuit for the full 30 minutes.
                Failure (short or open) ends the test.
              </li>
            </ul>
            <p>
              A PH30-classified cable has passed this combined-stress test for 30 minutes. The
              classification is what gives the design engineer confidence that the cable will
              continue to operate during a real fire event for at least the standard duration.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 50200:2015 Annex E (Method of test for resistance to fire of unprotected small cables for use in emergency circuits)"
            clause={
              <>
                The test method described in this Annex evaluates the ability of small cables to
                maintain circuit integrity when exposed simultaneously to fire (gas flame at 842
                °C), water spray (at specified intervals representing fire-fighting water
                application), and mechanical shock (at specified intervals representing falling
                debris). The classification PHnn indicates the duration in minutes for which the
                cable maintained circuit integrity under the combined exposure. PH30 is the minimum
                duration commonly applied to fire detection and fire alarm cables.
              </>
            }
            meaning="The Annex E procedure is the test that distinguishes a fire-resistant cable from one that is merely fire-retardant. The combined stress — fire + water + shock simultaneously — is the realistic representation of a building fire with active fire-fighting. The PH classification is what the designer relies on for fire-survival assurance."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <ConceptBlock
            title="Enhanced (PH120) — for the longer-survival applications"
            plainEnglish="Enhanced cable is PH120 — 120 minutes of circuit integrity under the same BS EN 50200 Annex E combined-stress test, with additional verification per BS 8434-2 for the longer duration. Enhanced cable is selected where the design analysis identifies a fire-survival requirement greater than 30 minutes. The driver is the building's evacuation strategy and fire engineering, not a generic preference for 'better' cable."
          >
            <p>The applications where Enhanced cable is mandated:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Voice alarm in phased evacuation.</strong> Phased evacuation (typical in
                high-rise residential, large hotels, complex commercial buildings) means people
                evacuate progressively over time — the floor of fire and one above first, then
                additional floors as the fire develops. Voice alarm sounders must remain operational
                throughout. Standard PH30 may be insufficient if the phased evacuation period
                exceeds 30 minutes, which it often does in tall buildings.
              </li>
              <li>
                <strong>Extended evacuation.</strong> Buildings with long evacuation routes,
                restricted-mobility populations, or complex layout that drives evacuation times
                beyond 30 minutes. Hospitals, care homes, large public assembly buildings, deep
                basements, complex underground stations — all may require enhanced cable to match
                their evacuation duration.
              </li>
              <li>
                <strong>Life-critical interfaces.</strong> Cables driving life-safety functions that
                must operate THROUGH the fire event, not just at the start. Examples: fire-
                suppression release signals, AOV (Automatic Opening Vent) operation, lift-control
                signals (firefighter override, evacuation lift control), smoke-control plant start.
                Loss of these signals during a developing fire is potentially catastrophic.
              </li>
              <li>
                <strong>Building height.</strong> High-rise buildings have inherent extended-
                evacuation characteristics. Even where a simultaneous evacuation strategy is
                nominally adopted, the practical evacuation time is long, and the enhanced cable
                gives the system survival headroom.
              </li>
              <li>
                <strong>Fire-engineering requirement.</strong> Where a specific fire-engineering
                analysis identifies a cable survival requirement, the analysis governs. Some
                fire-engineering solutions for non-standard buildings produce specific cable
                survival demands above standard PH30.
              </li>
            </ul>
            <p>
              The selection of Enhanced cable is recorded in the design records, with the
              justification — which of the above drivers applies, and why standard PH30 is
              insufficient. Over-specification (using Enhanced cable where Standard is adequate) is
              not 'safer'; it is unjustified cost and unjustified design choice.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 (Cable categories) and BS 8434-2 (Methods of test for assessment of the fire integrity of electric cables — Test for unprotected small cables for use in emergency circuits — BS EN 50200 with a 930 °C flame and water spray)"
            clause={
              <>
                Where the evacuation strategy or fire-engineering design requires fire-resistant
                cable survival in excess of the standard 30 minutes, ENHANCED cable should be
                specified. Enhanced cable is classified PH120 to BS EN 50200 Annex E supplemented by
                BS 8434-2 (which extends the test methodology for the longer duration and
                higher-temperature variant). Enhanced cable applications include: voice alarm
                systems serving phased evacuation; extended-evacuation buildings; life-critical
                interfaces to fire-suppression, AOV, lift-control, smoke-control plant; and any
                installation where the design analysis identifies a cable survival requirement
                greater than PH30 provides.
              </>
            }
            meaning="Enhanced cable is design-driven, not default. The BS 8434-2 supplementary test confirms PH120 performance; BS 5839-1 ties the selection to the evacuation strategy and life-critical interface analysis. Document the decision in design records with the driver justified."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>BS 8519 — the code of practice for the cable system</ContentEyebrow>

          <ConceptBlock
            title="What BS 8519 contributes to the engineering"
            plainEnglish="BS 5839-1 says WHICH circuits need fire resistance and what survival category they need. BS 8519 says HOW to install a fire-resistant cable system that actually delivers the survival category in service. The cable alone is not the system — the system is the cable PLUS the supports, fixings, terminations, joints, and the segregation arrangement. A PH120 cable supported on plastic clips that fail at 60 minutes of fire produces a 60-minute system, not a 120-minute system. BS 8519 covers the supports, fixings and arrangements that have to match the cable category."
          >
            <p>What BS 8519 covers in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Cable selection by application.</strong> Cross-references PH category to
                application — power, control, detection, voice alarm — and references the
                appropriate product standards.
              </li>
              <li>
                <strong>Support systems.</strong> Clips, cleats, ties, brackets — all of which must
                match the cable category. A PH120 cable requires PH120-rated supports; otherwise the
                supports fail before the cable does and the cable falls, defeating the survival
                assurance. BS 8519 specifies what 'matched' means for each support type.
              </li>
              <li>
                <strong>Containment.</strong> Trunking, conduit, basket, tray — fire-rated where
                needed, structurally rated for the load including the cable&apos;s weight in fire
                conditions (cables sag and stress supports during fire), and chosen to preserve the
                cable&apos;s fire-survival capability.
              </li>
              <li>
                <strong>Joints.</strong> Where joints are unavoidable, they are made within
                fire-rated junction boxes designed to maintain the system&apos;s PH category.
                Plastic junction boxes do not qualify; metal fire-rated boxes with the appropriate
                seal / gland system do.
              </li>
              <li>
                <strong>Terminations.</strong> Cable termination at the device (sounder, detector,
                interface, CIE) preserves the cable&apos;s integrity. Mechanical strain relief,
                appropriate gland selection (where used), correct preparation methods.
              </li>
              <li>
                <strong>Segregation.</strong> Spatial separation from non-life-safety circuits to
                prevent a fault on a non-safety circuit from compromising a safety circuit.
                Coordinates with BS 7671 528 (segregation) and with BS 5839-1 clause 26.
              </li>
              <li>
                <strong>Routing.</strong> Avoidance of high-risk fire-source areas where
                practicable, alternative routing where fire-source proximity is unavoidable, and
                consideration of fire compartmentation.
              </li>
            </ul>
            <p>
              BS 8519 is practical guidance — the standard that an experienced fire-alarm installer
              uses as their everyday installation reference. Where BS 5839-1 is the system-level
              specification, BS 8519 is the installation-level engineering practice.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 8519:2020 (Selection and installation of fire-resistant power and control cable systems for life safety applications — Code of practice)"
            clause={
              <>
                This British Standard gives recommendations for the selection of fire-resistant
                cables and methods of their installation in fire-resistant cable systems for the
                life-safety circuits of buildings. It covers cable selection by application, the
                selection and installation of fire-rated supports and containment, the avoidance or
                fire-rating of joints, the segregation of life-safety circuits from non-safety
                circuits, and the documentation requirements for the as-installed cable system.
              </>
            }
            meaning="BS 8519 is the engineering-practice companion to BS 5839-1, BS 5266 (emergency lighting), and other life-safety system standards. It governs the cable system as a whole — cable plus supports plus terminations plus segregation — and ensures that the installed system delivers the fire-survival category the design specifies."
          />

          {/* Diagram — cable cross-section comparison */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Fire-resistant cable cross-sections — typical UK types
            </h4>
            <svg
              viewBox="0 0 880 380"
              className="w-full h-auto"
              role="img"
              aria-label="Three cable cross-section diagrams: FP200 Gold (PH30 standard, polymeric construction with red sheath), FP PLUS (PH120 enhanced, similar polymeric construction with additional fire-resistant layer), and MICC mineral insulated copper clad cable showing copper sheath, mineral insulation, and copper conductors. Each shows PH classification, application, and key construction features."
            >
              {/* FP200 Gold */}
              <g>
                <circle
                  cx="150"
                  cy="130"
                  r="80"
                  fill="rgba(239,68,68,0.10)"
                  stroke="#EF4444"
                  strokeWidth="2"
                />
                <circle
                  cx="150"
                  cy="130"
                  r="60"
                  fill="rgba(239,68,68,0.06)"
                  stroke="rgba(239,68,68,0.5)"
                  strokeWidth="1.4"
                  strokeDasharray="3,2"
                />
                <circle
                  cx="150"
                  cy="130"
                  r="38"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1.2"
                />
                <circle cx="135" cy="125" r="6" fill="#FBBF24" />
                <circle cx="165" cy="125" r="6" fill="#3B82F6" />
                <circle cx="150" cy="145" r="6" fill="rgba(255,255,255,0.85)" />
                <text
                  x="135"
                  y="129"
                  textAnchor="middle"
                  fill="#000"
                  fontSize="7"
                  fontWeight="bold"
                >
                  L
                </text>
                <text
                  x="165"
                  y="129"
                  textAnchor="middle"
                  fill="#FFF"
                  fontSize="7"
                  fontWeight="bold"
                >
                  N
                </text>
                <text
                  x="150"
                  y="149"
                  textAnchor="middle"
                  fill="#000"
                  fontSize="7"
                  fontWeight="bold"
                >
                  CPC
                </text>
                <text
                  x="150"
                  y="240"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="13"
                  fontWeight="bold"
                >
                  FP200 Gold
                </text>
                <text
                  x="150"
                  y="258"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.75)"
                  fontSize="11"
                >
                  PH30 Standard
                </text>
                <text
                  x="150"
                  y="275"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  red LSZH sheath
                </text>
                <text
                  x="150"
                  y="290"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  mica/glass-tape insulation
                </text>
                <text
                  x="150"
                  y="305"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  routine fire alarm circuits
                </text>
              </g>

              {/* FP PLUS */}
              <g>
                <circle
                  cx="440"
                  cy="130"
                  r="80"
                  fill="rgba(239,68,68,0.14)"
                  stroke="#EF4444"
                  strokeWidth="2.4"
                />
                <circle
                  cx="440"
                  cy="130"
                  r="68"
                  fill="rgba(251,191,36,0.10)"
                  stroke="#FBBF24"
                  strokeWidth="1.6"
                />
                <circle
                  cx="440"
                  cy="130"
                  r="56"
                  fill="rgba(239,68,68,0.06)"
                  stroke="rgba(239,68,68,0.5)"
                  strokeWidth="1.4"
                  strokeDasharray="3,2"
                />
                <circle
                  cx="440"
                  cy="130"
                  r="34"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1.2"
                />
                <circle cx="425" cy="125" r="5" fill="#FBBF24" />
                <circle cx="455" cy="125" r="5" fill="#3B82F6" />
                <circle cx="440" cy="143" r="5" fill="rgba(255,255,255,0.85)" />
                <text
                  x="425"
                  y="129"
                  textAnchor="middle"
                  fill="#000"
                  fontSize="6"
                  fontWeight="bold"
                >
                  L
                </text>
                <text
                  x="455"
                  y="129"
                  textAnchor="middle"
                  fill="#FFF"
                  fontSize="6"
                  fontWeight="bold"
                >
                  N
                </text>
                <text
                  x="440"
                  y="240"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="13"
                  fontWeight="bold"
                >
                  FP PLUS
                </text>
                <text
                  x="440"
                  y="258"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.75)"
                  fontSize="11"
                >
                  PH120 Enhanced
                </text>
                <text
                  x="440"
                  y="275"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  red LSZH sheath
                </text>
                <text
                  x="440"
                  y="290"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  + extra fire barrier layer
                </text>
                <text
                  x="440"
                  y="305"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  VA, phased evac, life-critical
                </text>
              </g>

              {/* MICC */}
              <g>
                <circle
                  cx="730"
                  cy="130"
                  r="80"
                  fill="rgba(217,119,6,0.20)"
                  stroke="#D97706"
                  strokeWidth="3"
                />
                <text
                  x="780"
                  y="60"
                  textAnchor="middle"
                  fill="#D97706"
                  fontSize="10"
                  fontWeight="bold"
                >
                  copper sheath
                </text>
                <line x1="770" y1="65" x2="780" y2="80" stroke="#D97706" strokeWidth="1" />
                <circle
                  cx="730"
                  cy="130"
                  r="60"
                  fill="rgba(255,255,255,0.10)"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="1.4"
                />
                <text x="640" y="95" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  MgO mineral
                </text>
                <line
                  x1="670"
                  y1="100"
                  x2="685"
                  y2="115"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1"
                />
                <circle cx="715" cy="125" r="8" fill="#D97706" />
                <circle cx="745" cy="125" r="8" fill="#D97706" />
                <circle cx="730" cy="148" r="8" fill="#D97706" />
                <text
                  x="730"
                  y="240"
                  textAnchor="middle"
                  fill="#D97706"
                  fontSize="13"
                  fontWeight="bold"
                >
                  MICC / Pyro
                </text>
                <text
                  x="730"
                  y="258"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.75)"
                  fontSize="11"
                >
                  PH120+ extreme duty
                </text>
                <text
                  x="730"
                  y="275"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  copper sheath + MgO
                </text>
                <text
                  x="730"
                  y="290"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  refineries, tunnels, marine
                </text>
                <text
                  x="730"
                  y="305"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  50+ year service life
                </text>
              </g>

              {/* Comparison footer */}
              <rect
                x="40"
                y="335"
                width="800"
                height="38"
                rx="8"
                fill="rgba(168,85,247,0.06)"
                stroke="rgba(168,85,247,0.4)"
                strokeWidth="1.4"
              />
              <text
                x="440"
                y="354"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                Selection driven by evacuation strategy + fire engineering — not "more is better"
              </text>
              <text x="440" y="368" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                BS 5839-1:2025 categories · BS EN 50200 Annex E · BS 8434-2 · BS 8519 installation
                practice
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>The major UK fire alarm cable types</ContentEyebrow>

          <ConceptBlock
            title="FP200 Gold and FP PLUS — the Prysmian polymeric range"
            plainEnglish="FP200 Gold is the most widely-used PH30-classified fire-resistant cable in UK fire alarm work. It is a polymeric (plastic-based) construction with mica or glass-tape fire barrier around the conductors, low-smoke zero-halogen (LSZH) sheath, and red colour as standard. FP PLUS is the same manufacturer's enhanced version — PH120-classified for extended-survival applications. Together they cover most UK fire alarm cable selections — FP200 Gold for routine circuits, FP PLUS where enhanced is needed."
          >
            <p>FP200 Gold characteristics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Construction.</strong> Stranded copper conductors, mica / glass tape fire
                barrier (the layer that gives the fire resistance), LSZH inner insulation, LSZH red
                outer sheath. Available in 2-core, 4-core and multi-core variants for different
                circuit topologies.
              </li>
              <li>
                <strong>Fire performance.</strong> PH30 to BS EN 50200 Annex E. Continuous circuit
                integrity for 30 minutes under combined fire / water / shock.
              </li>
              <li>
                <strong>Smoke / toxicity.</strong> LSZH (Low Smoke Zero Halogen) — produces limited
                smoke during fire and no halogenated gases. Important in occupied buildings where
                smoke obscuration would impede evacuation and where halogen emissions would be toxic
                and corrosive.
              </li>
              <li>
                <strong>Termination.</strong> Standard preparation — strip outer sheath, separate
                cores, strip core insulation, terminate at device. No specialised tooling required.
                Compatible with conventional fire-rated junction boxes for joints.
              </li>
              <li>
                <strong>Cost / availability.</strong> Wide availability, competitive cost, common
                stock item with most fire alarm wholesalers. The default routine cable for the bulk
                of UK fire alarm work.
              </li>
            </ul>
            <p>
              FP PLUS differs by adding an additional fire-barrier layer that gives the PH120
              capability:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Construction.</strong> Same conductor / inner insulation / sheath
                architecture as FP200 Gold, with an additional intermediate fire-barrier layer that
                provides the extended fire-survival capability. Maintains the LSZH /
                low-smoke-zero-halogen properties.
              </li>
              <li>
                <strong>Fire performance.</strong> PH120 to BS EN 50200 Annex E supplemented by BS
                8434-2. Continuous circuit integrity for 120 minutes under combined fire / water /
                shock.
              </li>
              <li>
                <strong>Selection.</strong> Where the design analysis identifies an enhanced cable
                requirement — voice alarm in phased evacuation, extended-evacuation buildings,
                life-critical interfaces. Cost is higher than FP200 Gold; that cost is justified
                only by the design requirement.
              </li>
            </ul>
            <p>
              Equivalent products from other manufacturers exist (different brand names but the same
              PH classifications and equivalent test pedigree). Designers can specify by PH
              classification rather than by trade name where they want manufacturer flexibility;
              installers verify that the cable supplied meets the specified category by the
              third-party certification on the cable&apos;s drum / packaging.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="MICC (Pyro) — mineral-insulated copper-clad"
            plainEnglish="MICC is the legacy high-performance fire-resistant cable. It is constructed entirely from inorganic materials: copper conductors embedded in compressed magnesium oxide (MgO) mineral insulation, surrounded by a seamless copper outer sheath. There is no plastic anywhere in the cable. MICC does not burn — there is nothing in it that can burn. It survives fire conditions far beyond the polymeric cables' envelope. The trade-offs are higher material cost, more skilled labour for terminations (specialised tools and seals), and physical inflexibility (the copper sheath does not allow tight bending)."
          >
            <p>MICC characteristics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Construction.</strong> Solid copper conductors, compressed MgO mineral
                insulation, seamless copper outer sheath. Manufactured by a swaging process that
                compresses the assembly into a continuous length. No joints, no inserts, no
                non-metallic components inside the cable.
              </li>
              <li>
                <strong>Fire performance.</strong> Vastly exceeds PH120. The copper sheath remains
                mechanically intact at temperatures that would have destroyed polymeric cables an
                hour earlier; the MgO insulation maintains its dielectric properties through the
                event. Real-world performance is documented in service in extreme environments —
                refinery process areas, tunnel installations, marine vessels — where polymeric
                cables would not be acceptable at all.
              </li>
              <li>
                <strong>Termination.</strong> Specialised tooling required: pot seals (a sealed end
                fitting that excludes moisture from the hygroscopic MgO insulation), gland fittings,
                specific stripping and crimping methods. Termination by an installer without the
                appropriate training is poor practice; specialised installers handle MICC work.
              </li>
              <li>
                <strong>EMI / earth.</strong> The copper sheath provides intrinsic EMI screening and
                acts as the protective conductor (CPC) for the cable. No separate earth core is
                needed; the sheath is the earth return.
              </li>
              <li>
                <strong>Service life.</strong> Documented installations from the 1960s and 1970s
                still operating. The all-metal construction has no plastic that ages or embrittles.
                Where life-cycle cost matters, MICC&apos;s long service life can offset its higher
                initial cost.
              </li>
              <li>
                <strong>Applications.</strong> Refineries, petrochemical plants, tunnels, marine
                vessels, critical-life-safety circuits in major installations. Niche but enduring;
                MICC remains the right choice where its properties are needed.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Selection in practice — the design decision</ContentEyebrow>

          <Scenario
            title="A 12-storey residential building with phased evacuation"
            situation="A 12-storey residential building has a Cat L1 fire alarm system designed around a phased evacuation strategy. On detection, the floor of fire and the floor immediately above it evacuate first; further floors are progressively alerted as the fire develops. The building's evacuation strategy assumes a typical evacuation period of 60-90 minutes for full-building clearance. The design team is selecting cable for the voice alarm sounder circuits and the detection loops."
            whatToDo="The phased evacuation strategy with a 60-90 minute total clearance time is a textbook driver for ENHANCED cable on the voice alarm sounder circuits — sounders must operate throughout the full evacuation period, and a 30-minute cable failure would leave the upper floors un-alerted during a developing event. Specify PH120 (FP PLUS or equivalent) for the voice alarm circuits. The detection loops, which operate to detect fire (rather than to deliver evacuation messages throughout the event), can typically remain on standard PH30 unless the fire-engineering analysis specifically identifies a longer-survival requirement; document the decision either way. The life-critical interfaces (firefighter lift override, smoke-control plant start) are also enhanced. Record the selection rationale in the design records, citing the phased evacuation strategy and the building height as the drivers."
            whyItMatters="The cost difference between PH30 and PH120 cable is meaningful — perhaps 30-50% per metre — but materially smaller than the consequence of cable failure during phased evacuation in a high-rise. The design records carry the engineering judgment that justifies the cost. A future audit or insurer review will look for the design rationale; if PH30 had been used everywhere on this building, the design would be vulnerable to challenge at the next fire-risk assessment or insurance renewal. Specifying PH120 where it is needed, and PH30 where it is not, is the disciplined design practice."
          />

          <Scenario
            title="A small single-storey office — over-specification problem"
            situation="A 200-square-metre single-storey office building has a Cat L3 fire alarm system, simultaneous evacuation strategy, no extended-evacuation considerations, no life-critical interfaces. The new owner has insisted on 'the best cable available — money is no object'. The contractor has quoted FP PLUS (PH120) throughout. The design engineer flags the specification as over-engineered."
            whatToDo="The disciplined response is to specify PH30 (FP200 Gold or equivalent) throughout — the design analysis identifies no driver for enhanced cable. The 30-minute fire-survival capability is well in excess of the simultaneous-evacuation duration for the 200 m² building. Specifying PH120 produces a cost increase with no design justification. Document the cable selection in the design records with the rationale: simultaneous evacuation, single-storey, no life-critical interfaces — PH30 standard cable provides adequate fire survival. Where the client insists on PH120 despite the analysis, document the client request as a non-engineering decision; the system remains compliant either way, but the design records are clear about the rationale."
            whyItMatters="Standards-driven design is not 'more is always better'. Each specification decision has to be justified by the design analysis. Over-specification is not 'safer'; it is unjustified cost, and at audit it raises the question 'why was this specified?' The disciplined answer — 'there was no engineering driver, the client requested it' — is acceptable; the lazy answer 'we always specify enhanced cable' is not, because it suggests the engineering analysis was not done."
          />

          <CommonMistake
            title="Specifying enhanced cable globally regardless of application"
            whatHappens="A small commercial premises with a Cat L3 system, simultaneous evacuation, no life-critical interfaces, gets PH120 enhanced cable throughout because 'we always use the best cable for fire alarms'. The cable cost is materially higher than necessary; the supports and containment may also have been upgraded to match. The system is over-engineered relative to the building's actual evacuation strategy and fire-engineering requirements. At audit, the design records cannot justify the selection — they either say 'standard practice' (which is not an engineering justification) or are silent on the cable selection rationale."
            doInstead="Apply the BS 5839-1:2025 / BS 8519 selection logic to each circuit: identify the evacuation strategy (simultaneous, phased, extended), the building height, the presence of life-critical interfaces. Standard PH30 is the default unless one of the enhanced-cable drivers applies. Document the selection rationale in the design records — both for cost-justification and for future audit defensibility."
          />

          <CommonMistake
            title="Mismatching cable category and support category"
            whatHappens="A PH120 enhanced cable is specified and installed correctly. The supports, however, are plastic clips rated for general-purpose use — no fire rating. In a real fire event, the plastic clips melt at perhaps 60 minutes, the cable falls, and the cable's 120-minute fire-survival capability is irrelevant because the cable is no longer in the path it needs to be in. The system has been delivered with a 60-minute survival cap, not the specified 120 minutes."
            doInstead="Apply BS 8519 cable-system thinking: the PH category is a SYSTEM property, not just a cable property. Cable + supports + fixings + containment must all match. A PH120 cable system needs PH120-rated supports and fixings. Specify and install them as a matched set; verify the support rating against the cable category at design and at installation. The cable manufacturer's technical data and BS 8519 give the support specifications."
          />

          <CommonMistake
            title="Assuming 'fire-retardant' equates to 'fire-resistant'"
            whatHappens="A general-purpose installation cable marked 'fire-retardant' is selected for a fire alarm sounder circuit on the assumption that fire-retardant means it can survive a fire. The cable is fire-retardant — it resists ignition and propagates flame slowly — but it has no PH classification. In a fire event the cable may continue to carry signal for a short period, but it has no defined survival duration; the polymeric insulation softens, the conductors short or open, the circuit fails. The fire alarm has no fire-survival assurance."
            doInstead="The two terms are different. Fire-RETARDANT means slow to ignite and slow to propagate flame — useful for general installations but not sufficient for fire alarm circuits that must continue to operate during a fire. Fire-RESISTANT means the cable continues to carry signal during a fire — the PH classification quantifies it. BS 5839-1 fire alarm circuits need fire-resistant cable with a defined PH category, NOT fire-retardant cable. Read the cable's third-party certification and the PH classification on the drum; do not rely on 'fire-retardant' marketing language."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Two BS 5839-1:2025 cable categories: STANDARD (PH30) for routine circuits, ENHANCED (PH120) for life-critical / phased-evacuation / extended-evacuation duty.',
              'PH30 = 30 minutes circuit integrity under combined fire (842 °C) + water spray + mechanical shock per BS EN 50200 Annex E.',
              'PH120 = 120 minutes under the same combined stresses, additionally tested per BS 8434-2.',
              'Enhanced cable selection is DESIGN-DRIVEN — evacuation strategy, building height, life-critical interfaces. Document the rationale in design records.',
              'BS 8519 is the code of practice for the cable SYSTEM (cable + supports + fixings + terminations + segregation). Engineering practice companion to BS 5839-1.',
              'Common UK types: FP200 Gold (PH30, default), FP PLUS (PH120, enhanced), MICC / Pyro (extreme-environment / critical duty).',
              'Cable category is a SYSTEM property — supports, fixings, containment must all match the PH category. PH120 cable on plastic clips is a 60-minute system.',
              'BS 5839-1:2025 clause 16: single common colour, RED preferred, end-to-end including LV mains feed.',
              'Fire-RESISTANT (continued operation) is required; fire-RETARDANT (slow to ignite) alone is not sufficient.',
              'Over-specification is not safer — it is unjustified cost. Each cable selection must be justified by the design analysis.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'What is the difference between fire-retardant and fire-resistant cable?',
                answer:
                  'Fire-retardant means slow to ignite and slow to propagate flame — useful for limiting fire spread but does not guarantee continued operation during a fire. Fire-resistant means the cable continues to carry signal or power during a fire for a defined duration — the PH classification (PH30, PH120 etc) quantifies how long. BS 5839-1 fire alarm circuits require fire-RESISTANT cable, not just fire-retardant cable. The PH classification is what matters; fire-retardant marketing language alone is insufficient.',
              },
              {
                question:
                  'Why does the BS EN 50200 Annex E test apply fire, water spray AND mechanical shock together?',
                answer:
                  'Because that is what real building fires look like. A fire alarm cable in a real fire is exposed to flame, to water from fire-fighting operations, AND to mechanical impact from falling debris or ceiling collapse — all simultaneously. Testing only one stress at a time would not predict performance under combined stresses, which are typically more demanding than any single stress alone. The combined test is realistic engineering.',
              },
              {
                question: 'Can I mix standard and enhanced cables on the same fire alarm system?',
                answer:
                  'Yes, where the design analysis supports it. A single fire alarm system may have enhanced cable on the voice alarm sounder circuits (because of phased evacuation) and standard cable on the detection loops (because the detection loops do not need extended survival). The mix is documented in the design records, with the per-circuit rationale. The installer must clearly identify which circuits are which during installation; mis-routing could result in standard cable being used where enhanced was specified.',
              },
              {
                question:
                  'Is BS 8519 a separate standard I need to read, or is it covered by BS 5839-1?',
                answer:
                  'BS 8519 is a separate code of practice and BS 5839-1 references it. Where BS 5839-1 specifies what survival category is needed, BS 8519 specifies how to install a cable system that delivers it — supports, fixings, terminations, segregation. Designers and installers should hold both standards. BS 8519 is particularly important for the installation team; it is the practical reference for matching cable category to support category and for installing a coherent fire-resistant cable system.',
              },
              {
                question: 'My CIE manual recommends a specific cable type. Should I follow it?',
                answer:
                  'The CIE manufacturer&apos;s recommendation is one input. The design must also satisfy BS 5839-1:2025 / BS 8519 / BS 7671 Section 560 — sometimes the manufacturer&apos;s recommendation is more conservative than the standard, sometimes less. Where the recommendation is more conservative (specifying enhanced cable where the standard would allow standard), follow the recommendation. Where the recommendation is less conservative (specifying standard cable where the design analysis identifies an enhanced-cable driver), follow the standard. The standards are the floor; manufacturer recommendations can lift the floor but cannot lower it.',
              },
              {
                question: 'How long is MICC service life in fire alarm applications?',
                answer:
                  'Documented installations from the 1960s and 1970s are still in service. The all-metal construction has no plastic that ages or embrittles. The MgO mineral insulation is hygroscopic, so the seal at terminations matters — a properly sealed MICC installation has effectively unlimited service life. A poorly sealed installation absorbs moisture and the dielectric properties degrade; this is the failure mode to design out. The skilled-labour requirement at terminations is what ensures the seals are right; that is why MICC installation is typically handled by specialised installers.',
              },
              {
                question:
                  'Can I use the same red colour for fire alarm cable AND for emergency lighting cables?',
                answer:
                  'BS 5266 (emergency lighting) has its own conventions; BS 5839-1 specifies red as preferred for fire alarm. Where both systems exist in the same building, the design records should clarify the cable colour conventions and any potential for confusion at the device or junction-box level. In practice the two systems use different cable types (different cores, different category) and the visual distinction is often clear at the device end. Where any confusion is possible, document the convention and label terminations to avoid mis-identification during maintenance.',
              },
              {
                question: 'What fire-engineering analysis is needed to justify enhanced cable?',
                answer:
                  'A formal fire-engineering report is not always required — most enhanced-cable selections are driven by straightforward design rules (phased evacuation, building height threshold, named life-critical interfaces). Where the building or strategy is unusual, a documented fire-engineering analysis identifies the cable survival requirement explicitly. The design records should record either the design rule that drives the selection (e.g. "phased evacuation strategy per BS 5839-1:2025 — enhanced cable on voice alarm circuits") or a reference to the fire-engineering analysis that supports the selection.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Cable types and fire resistance — Module 4.3" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-4/section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.4 Wiring methods and protection
              </div>
            </button>
          </div>

          <div className="hidden">
            <Cable />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule4Section3;
