import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  AmendmentBadge,
  RegBadge,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';
import { videos } from '@/data/study-centre/video-library';

const inlineChecks = [
  {
    id: 'm5s4-isolation-vs-switching',
    question:
      'You are about to replace a damaged 32 A socket-outlet on a TN-C-S domestic circuit. Which BS 7671 function are you actually relying on to make the work safe?',
    options: [
      'Functional switching (Reg 537.5) — flip the local light switch off before working',
      'Switching for mechanical maintenance (Reg 463.1) — turn off the appliance switch only',
      'Isolation (Reg 462.1 / 537.2) — secure, verified disconnection of the conductors with a lock-off',
      'Emergency switching (Reg 537.4) — hit the nearest stop button to drop the supply',
    ],
    correctIndex: 2,
    explanation:
      'Replacing the socket exposes you to live conductors. That is electrical work — not maintenance of an item of equipment. Reg 462.1 / 537.2 isolation is the only function that gives you the legal safe-disconnection state required by EAWR Reg 13 (Dead Working) and the HSE GS 38 / HSG 85 safe isolation procedure. Functional switching does not lock off, and switching for mechanical maintenance protects against mechanical movement of equipment, not electrical contact with conductors.',
  },
  {
    id: 'm5s4-pen-prohibition',
    question:
      'You are designing a 100 A main switch for a TN-C-S (PME) domestic consumer unit. Which conductor must NOT be broken by the switch?',
    options: [
      'The line conductor, which must stay continuous through the switch at all times',
      'The protective earth (PE), though the neutral may be freely broken by the switch',
      'The PEN conductor — Reg 461.2 prohibits switching the combined protective + neutral in TN-C-S',
      'No conductor restriction applies, so the main switch may break any combination',
    ],
    correctIndex: 2,
    explanation:
      'Reg 461.2 is unambiguous: in TN-C and TN-C-S systems the PEN conductor SHALL NOT be isolated or switched. The PEN runs continuous from the DNO transformer through to the consumer MET. Inside the installation, N and PE split AT the MET — and post-MET the neutral may be switched (typically as part of a double-pole or four-pole isolator) but the upstream PEN never. Breaking the PEN under load creates the open-PEN failure that drives every Class I exposed metal part toward line voltage.',
  },
  {
    id: 'm5s4-emergency-vs-functional',
    question:
      'A workshop bench saw has a red mushroom-head stop button on the operator panel. Which BS 7671 function does this perform, and where must it be located?',
    options: [
      'Functional switching — sited anywhere convenient to the operator at the bench',
      'Emergency switching (Reg 537.4) — readily accessible and identifiable, to disconnect the supply rapidly',
      'Isolation — provided only at the supply origin in the distribution board',
      'Switching for mechanical maintenance — mounted adjacent to the motor housing',
    ],
    correctIndex: 1,
    explanation:
      'Reg 537.4 governs emergency switching: rapid disconnection of supply to remove an unexpected danger (entanglement, runaway machinery, fire). The device must be identifiable (typically red on yellow background per BS EN ISO 13850), readily accessible from the operator position, latched or held off until reset, and capable of breaking the full load current. Functional switching (537.5) is normal operational on/off; isolation is for electrical work. The mushroom-head stop is specifically emergency switching.',
  },
  {
    id: 'm5s4-indication-of-position',
    question:
      'A rotary isolator is fitted to feed a rooftop air-handling unit. The isolator handle has positions marked but no other indication. Reg 537.2 requires what additional feature for the device to qualify as a means of isolation?',
    options: [
      'Nothing further, since a handle marked OPEN / CLOSED is sufficient on its own',
      'Reliable indication of the actual contact position — visible gap, linked indicator, or positive-break compliance',
      'A red LED on the front of the isolator, taken as the position indication',
      'A separate voltmeter wired permanently across the load side of the contacts',
    ],
    correctIndex: 1,
    explanation:
      'Reg 537.2.5 requires that the position of the contacts of the isolating device shall be either externally visible, OR clearly and reliably indicated. A handle alone is NOT sufficient — handles can detach, internal linkages can fail, contacts can weld closed while the handle moves freely. Acceptable solutions include a viewing window showing the actual contact gap, or a switch-disconnector compliant with BS EN 60947-3 that provides positive contact indication ("positive break" — handle position cannot show OFF unless contacts are physically separated). This is why a generic "rotary switch" is not always a valid isolator.',
  },
  {
    id: 'm5s4-lockoff',
    question:
      'You have switched the circuit OFF at the local isolator and proved dead with a GS 38 voltage indicator. The customer is on site. To complete safe isolation per HSE guidance and BS 7671 Reg 537.2.7, what is the next mandatory step?',
    options: [
      'Hang a paper "do not switch on" sign on the isolator and start the work',
      'Apply a padlock to the isolator, attach a personal warning label, and keep the key on your person',
      'Photograph the isolator in its off position as a record and then proceed',
      'Ask the customer not to touch the isolator and then start the work',
    ],
    correctIndex: 1,
    explanation:
      'Reg 537.2.7 (and HSE GS 38, HSG 85, EAWR 1989 Reg 13) requires that the means of isolation be secured against inadvertent or unauthorised reclosure. A padlock with a unique key carried by the worker is the standard. Multi-person work uses a hasp so each worker fits their own padlock and the supply cannot be restored until ALL locks are removed. A paper sign alone does not satisfy "secure" — it is advisory, not preventive. The lock-off + tag + key-on-person trio is the defining feature of safe isolation.',
  },
  {
    id: 'm5s4-mechanical-maintenance',
    question:
      'A commercial dishwasher needs its drum belt replaced. The maintenance engineer wants to operate the local rotary switch to make the work safe. Which BS 7671 function applies, and what does the regulation actually require?',
    options: [
      'Isolation (Reg 462) — full secure disconnection of the conductors before the belt change',
      'Switching for mechanical maintenance (Reg 463.1) — break all line conductors and prevent restart',
      'Functional switching (Reg 537.5) — any rocker switch on the appliance is acceptable',
      'Emergency switching (Reg 537.4) — hit the e-stop to make the machine safe',
    ],
    correctIndex: 1,
    explanation:
      'Reg 463.1 covers switching for mechanical maintenance: where work on non-electrical parts (belts, bearings, blades) requires the equipment to be inactive but does not require electrical work. Reg 537.3 lists the device requirements: must be manually operated, break all line conductors (so motor cannot inadvertently restart on a single phase), cannot inadvertently reclose, and ideally include a means of locking the device in the OFF position. It is a step less than full isolation but more than functional switching — the focus is preventing mechanical movement during the maintenance task.',
  },
  {
    id: 'm5s4-emergency-stop-access',
    question:
      'On a fixed installation an emergency switching device is placed inside a locked cupboard for "security". Why does this fail Reg 537.4?',
    options: [
      'It does not fail, since the security benefit overrides the accessibility requirement',
      'Reg 537.4.2 requires the operating means to be readily accessible where danger occurs — a locked cupboard defeats that',
      'It fails only in the event that the cupboard lock is later broken or jammed',
      'It fails because emergency switches must always be mounted outside, never inside',
    ],
    correctIndex: 1,
    explanation:
      'Emergency switching depends on speed and certainty. Reg 537.4.2 requires the operator (or anyone present) to reach and actuate the device immediately when the dangerous condition arises. A locked enclosure, a lift to a high mounting position, an obstruction or signage covering the device all defeat the purpose. The product itself can be enclosed (e.g. red mushroom under a hinged transparent flap to prevent accidental knocks), but the means of OPERATING it must remain readily accessible. Where the operator may be in several locations, multiple emergency-switching devices are needed.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'BS 7671 Section 537 distinguishes four functions. Which option correctly maps each to its primary BS 7671 reference?',
    options: [
      'Isolation (461.2), mechanical maintenance (462.1), emergency (463.1), functional (537.4)',
      'All four switching functions are governed by Reg 537.1 alone, with no separate references',
      'Isolation and emergency switching are treated as a single combined function under Reg 461',
      'Isolation (462 / 537.2), mechanical maintenance (463 / 537.3), emergency (537.4), functional (537.5)',
    ],
    correctAnswer: 3,
    explanation:
      'Section 462 sets the design intent for isolation; Reg 537.2 lists the device requirements. Section 463 sets intent for switching for mechanical maintenance; Reg 537.3 lists the device requirements. Reg 537.4 covers emergency switching (and emergency stopping, where the danger is mechanical). Reg 537.5 covers functional switching — normal operational control. Each function has different device requirements, different positioning rules and different risk profiles.',
  },
  {
    id: 2,
    question:
      'A single-phase 230 V isolator on a TN-C-S consumer unit submain. How many poles must the isolator break, and which conductor must remain unbroken?',
    options: [
      'Double-pole, breaking line and post-MET neutral; the PEN upstream of the MET is never broken',
      'Single-pole, breaking the line only and leaving the neutral and PEN both unbroken',
      'Triple-pole, breaking line, neutral and the protective earth conductor all together',
      'No pole restriction, so any single-pole switch is acceptable as the isolator here',
    ],
    correctAnswer: 0,
    explanation:
      'Single-phase TN-C-S installations split N from PEN at the MET. Downstream of the MET, the neutral is just a neutral and may be switched. A double-pole isolator on a sub-main breaks both line and neutral simultaneously, giving full disconnection of the live conductors. The PEN, upstream of the MET, is the combined PE+N coming from the DNO — Reg 461.2 prohibits switching it under any circumstance. The protective earth conductor (PE / CPC) is also never broken by the isolator — it must remain continuous to maintain the fault-protection earth path on adjacent equipment.',
  },
  {
    id: 3,
    question:
      'Reg 537.2.5 / 537.2.6 sets the requirement for indicating the position of an isolator. Which combination of features SATISFIES the regulation for a small commercial DB main switch?',
    options: [
      'A handle marked ON / OFF only, with no separate reliable contact-position indication',
      'A neon indicator lamp on the front of the device, taken as the sole position indication',
      'A BS EN 60947-3 switch-disconnector with positive contact indication, padlocking and a label',
      'A multimeter left clipped across the load terminals, read as the position indicator',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 537.2.5 requires reliable indication of the position of the contacts. A BS EN 60947-3 switch-disconnector with positive (or "guaranteed") contact indication ensures that an OFF handle position can only occur with the contacts physically separated. Reg 537.2.7 requires the device be capable of being secured in the OFF position (padlocking facility). Reg 537.2.4 (and Reg 514) requires labelling identifying which circuits the device isolates. Together these are the device-level requirements; a handle-only switch falls short of all three.',
  },
  {
    id: 4,
    question:
      'A workshop bench saw has a red mushroom-head emergency stop. The motor draws 12 A. Which standard governs the e-stop device itself, and what is the role of the contactor in the supply?',
    options: [
      'BS 7671 alone governs the e-stop, and no contactor is required in the supply',
      'BS EN ISO 13850 governs the actuator; the e-stop drops out a contactor that breaks the motor current',
      'BS EN 60898 governs it — the emergency stop is simply an MCB by another name',
      'No standard applies; emergency stops are advisory devices with no requirements',
    ],
    correctAnswer: 1,
    explanation:
      'Machinery e-stops follow BS EN ISO 13850 (formerly EN 418): red mushroom on yellow background, latched once pressed, requires deliberate reset, available stop categories 0 (immediate removal of power), 1 (controlled stop then removal of power) and 2 (controlled stop, power maintained — rare for true emergency). On significant motor loads the e-stop typically operates a control circuit that drops out a contactor; the contactor breaks the full load current. BS 7671 Reg 537.4 sets the installation-side requirements (accessibility, identifiability, breaking capacity adequate for the prospective fault current at that point).',
  },
  {
    id: 5,
    question:
      'Reg 537.2.7 requires a means of isolation to be secured against inadvertent reclosure. A two-electrician crew is replacing a 100 A submain. What is the correct lock-off arrangement?',
    options: [
      'One electrician fits a padlock and the other relies on the first person\'s lock',
      'Apply a single padlock to the isolator and share the one key between the two of them',
      'A signed paper notice on the isolator is sufficient when more than one person is present',
      'A multi-lock hasp takes each electrician\'s own padlock; the supply returns only when all locks are removed',
    ],
    correctAnswer: 3,
    explanation:
      'Multi-person lock-out / tag-out (LOTO) is built around the principle that no single person controls the supply on behalf of others. A hasp accepts multiple padlocks; each worker locks on at the start of their work and removes their lock only when they personally are clear and confirm they no longer need the supply de-energised. This is the safe-system-of-work backbone in HSG 85 and EAWR Reg 13 — sharing keys, "I will lock for both of us", or paper notices all break the principle of personal control of personal energy.',
  },
  {
    id: 6,
    question:
      'A commercial kitchen has a wall-mounted red mushroom-head "all off" button at the entrance, intended to disconnect cookers, fryers and extraction in an emergency. What BS 7671 reg governs this device, and what is the practical consequence on the design?',
    options: [
      'Reg 537.4 emergency switching — readily accessible, breaking the full load via a contactor or shunt-trip',
      'Reg 462.1 isolation — the device need only be capable of being locked off at the board',
      'Reg 537.5 functional switching — any convenient on/off switch at the entrance is acceptable',
      'No regulation governs this device, since an all-off button is purely an advisory convenience',
    ],
    correctAnswer: 0,
    explanation:
      'A kitchen "all-off" emergency switch is a textbook Reg 537.4 application — disconnect supply rapidly to remove an unexpected danger (fire, runaway equipment, gas leak with electrical ignition risk, person trapped). Reg 537.4.4 requires the operating means at any place where danger may arise (entrance is correct). Reg 537.4.5 lets you implement it as a switch directly, or via a contactor / shunt-trip-equipped circuit-breaker provided the auxiliary supply is reliable. Labelling per Reg 537.4.3 must identify the circuits cut. Resetting must be deliberate so the supply does not auto-restore.',
  },
  {
    id: 7,
    question:
      'A site electrician finds a 63 A TPN submain isolator labelled only "Isolator". The DB it feeds serves three workshops. What BS 7671 / installation-cert observation applies?',
    options: [
      'Pass, since the device itself is correct and labelling carries no observation',
      'C1 immediate danger, since an under-labelled isolator is live and dangerous as found',
      'C3 / FI under Reg 537.2.4 / Reg 514 — the isolator must identify what it controls',
      'No code applies, since circuit labelling on a sub-mains isolator is entirely optional',
    ],
    correctAnswer: 2,
    explanation:
      'Section 514 (identification and labelling) and Reg 537.2.4 require the means of isolation to be clearly labelled to identify what it isolates. Multi-DB sites with generic "Isolator" labels are a routine source of safe-isolation incidents — the wrong device gets locked off and the worker proves dead at the local outlet, which is dead for unrelated reasons. The correct observation is typically C3 (improvement recommended) where the labelling is missing but the risk is mitigated by other circuit identification, or FI (further investigation) where the labelling is so absent that the isolation function cannot be verified at all.',
  },
  {
    id: 8,
    question:
      'Which conductor — in any system earthing arrangement — may NEVER be interrupted by an isolator, switch-fuse or any switching device?',
    options: [
      'The neutral conductor in a TN-S earthing system',
      'The protective earth (CPC), and the PEN in TN-C / TN-C-S (Reg 461.2)',
      'The line conductor on a single-phase final circuit',
      'The neutral conductor in any TT earthing system',
    ],
    correctAnswer: 1,
    explanation:
      'Two universal rules. (1) The protective earth (CPC) is never broken by switching or isolation — interrupting the CPC removes fault protection on equipment that may still be live on adjacent circuits, and re-energising the previously-isolated circuit through a broken CPC means the first earth fault has no path. (2) The PEN conductor in TN-C / TN-C-S is never broken (Reg 461.2) — open-PEN under load drives every CPC-connected exposed metal part toward line voltage. The neutral may be switched in TN-S, TN-C-S (post-MET), TT and IT systems where required, but the PEN upstream of the MET in TN-C-S is sacrosanct.',
  },
];

const faqItems = [
  {
    question:
      'What is the practical difference between isolation and switching for mechanical maintenance?',
    answer:
      'Isolation (Reg 462 / 537.2) is for ELECTRICAL work — cutting cables, changing accessories, testing dead. The risk is electric shock from contact with live conductors. Switching for mechanical maintenance (Reg 463 / 537.3) is for NON-ELECTRICAL work on equipment — replacing a belt, clearing a jam, cleaning a blade. The risk is mechanical movement (the motor inadvertently restarting). Both must prevent inadvertent restoration of supply, but isolation has stricter device requirements (positive contact indication, padlocking facility, labelling) because the worker is exposed to live conductors not just moving parts.',
  },
  {
    question:
      'Why does Reg 461.2 prohibit switching the PEN in TN-C-S, when other systems happily switch the neutral?',
    answer:
      'In TN-S, TN-C-S (post-MET), TT and IT, the neutral is JUST a neutral — separated from the protective earth. Breaking it under load drops the neutral voltage of downstream loads but does not affect the earthing of upstream Class I equipment. In TN-C and TN-C-S the PEN is COMBINED protective-earth + neutral — it is the only earth path back to the source. Breaking the PEN under load means the neutral current diverts through whatever earth paths exist (extraneous-conductive-parts, water pipes, soil), driving the local earth potential toward line voltage. Every Class I exposed metal part bonded to the MET rises with it. Touching the kettle while standing on a wet floor in contact with the cooker becomes a fatal-shock fault path. The risk is invisible to a basic IR test — it only manifests under load with the PEN open.',
  },
  {
    question: 'Can a 13 A plug be used as a means of isolation under BS 7671?',
    answer:
      'Reg 537.2.1.5 permits a plug and socket-outlet up to 16 A to be used as a means of isolation provided the action of withdrawing the plug breaks all relevant live conductors, the socket is accessible and identifiable, and the plug is under the control of the person doing the work (typically by removing it from the socket and keeping it in their possession or applying a "blanking-off" device). It is acceptable for portable equipment, plug-in fixed appliances within reach, and the like. It is NOT acceptable as the means of isolation for hard-wired final circuits, sub-mains, or anywhere the cable disappears into a wall — there is no "withdrawable plug" to remove.',
  },
  {
    question: 'Does emergency switching always need a separate device from isolation?',
    answer:
      'No — Reg 537.4.5 allows a single device to perform both functions provided it meets the more onerous requirements of each. In practice this is rare for two reasons. (1) Emergency switching is typically positioned at the operator location (entrance to a kitchen, beside a saw); isolation is positioned at the supply origin (DB, switchboard). The locations are different. (2) Emergency switching needs to be operable instantly without keys, padlocks or prior consent; isolation needs a lock-off facility. Combining them often compromises the emergency function. Most installations use separate devices: a contactor or shunt-trip MCB driven by the e-stop loop, with a separate lockable isolator at the DB.',
  },
  {
    question:
      'A bathroom shower has a 45 A double-pole pull-cord switch in the ceiling. Is that the means of isolation for the shower?',
    answer:
      'No — Reg 537.2.1 requires the means of isolation be capable of being secured against inadvertent reclosure (Reg 537.2.7). A pull-cord switch in the ceiling is a functional switch (Reg 537.5) — it lets the user turn the shower on and off without entering the bathroom in a wet state. It does not lock off, has no positive contact indication and typically is not labelled as the isolator. The means of isolation for the shower circuit is the shower MCB or RCBO at the consumer unit, which CAN be locked off using an MCB lock-off device. On any service work, lock off at the CU and prove dead at the shower; do not rely on the pull-cord.',
  },
  {
    question: 'Are switch-disconnectors and isolators the same thing?',
    answer:
      'In modern BS 7671 / BS EN 60947-3 terminology a SWITCH-DISCONNECTOR is a device that combines isolation (off-load safety separation with verified contact gap) AND on-load switching (rated to make and break load current). A pure ISOLATOR may only be safely operated when off-load (its contact gap is verified for safety but the contacts themselves may not be rated for on-load arcing). Practically, almost every modern domestic and commercial isolator IS a switch-disconnector — they are designed to break load current and provide isolation. The pure off-load isolator survives mostly in HV / industrial contexts where you operate them only after upstream switchgear has dropped the load.',
  },
  {
    question: 'What labelling does an isolator actually need?',
    answer:
      'Section 514 (identification) and Reg 537.2.4 together require: (a) clear identification of which circuits the device isolates — typically by reference to the circuit chart, DB way number or descriptive label ("Workshop 2 sub-main", "Compressor", "Domestic CU"); (b) where the device is one of several similar devices, additional unambiguous identification; (c) where remote from the equipment being isolated, a notice at the equipment indicating where the means of isolation is located (Reg 461.3, Reg 514.1.2); (d) for emergency switching, additional identification per Reg 537.4.3 (red on yellow background, lettered "EMERGENCY STOP" or equivalent).',
  },
  {
    question: 'How does PUWER 1998 interact with BS 7671 Section 462?',
    answer:
      'PUWER (Provision and Use of Work Equipment Regulations 1998) is the statutory framework for any work equipment. Reg 19 of PUWER specifically requires every employer to ensure work equipment is provided with suitable means to isolate it from all sources of energy, that the means is clearly identifiable and accessible, and that reconnection of an energy source does not expose any person to a risk to their health or safety. BS 7671 Section 462 / Reg 537.2 is how the electrical-energy isolation half of that statutory duty is discharged. EAWR 1989 Reg 13 (Dead Working) sits alongside, requiring that work on or near live conductors be avoided unless unreasonable, with safe isolation as the primary route.',
  },
  {
    question: 'A three-phase TPN motor isolator — does it need to break the neutral as well?',
    answer:
      'It depends on the system. In a TN-S or TN-C-S three-phase distribution where the load is balanced (e.g. star-connected motor with neutral return), a four-pole switch-disconnector (TPN) breaks all three lines AND the neutral, giving complete safe isolation. In a delta-connected three-phase load with no neutral connection, a three-pole isolator suffices — there is no neutral at the motor to break. Always check the load type. Also check Reg 461.2 — the PEN upstream of any TN-C-S MET is never broken regardless of pole count downstream. Industrial best practice on motors is TPN switch-disconnectors with positive contact indication and a padlocking facility, located within sight of the motor (Reg 463.1).',
  },
];

const BS7671Module5Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Isolation, Switching & Emergency Controls | BS 7671:2018+A4:2026 | Module 5.4',
    description:
      'BS 7671 Section 462, 463 and 537 — isolation for electrical work, switching for mechanical maintenance, emergency switching and functional switching. Includes the Reg 461.2 PEN prohibition, lock-off procedure, indication of position and multi-pole isolation requirements.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 4"
            title="Isolation, switching and emergency controls"
            description="The four functions BS 7671 actually distinguishes — isolation, switching for mechanical maintenance, emergency switching and functional switching — with the device requirements of Section 537, the PEN prohibition of Reg 461.2 and the safe-isolation procedure that ties it all to EAWR 1989 / PUWER 1998."
            actions={
              <>
                <RegBadge>462.1</RegBadge>
                <RegBadge>537.2</RegBadge>
                <RegBadge>461.2</RegBadge>
                <AmendmentBadge regs={['461.2']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 7671 distinguishes four switching functions — isolation (Section 462 / Reg 537.2), switching for mechanical maintenance (Section 463 / Reg 537.3), emergency switching (Reg 537.4) and functional switching (Reg 537.5) — each with different device requirements and different regulatory drivers.',
              'Reg 461.2 prohibits isolation or switching of the PEN conductor in TN-C and TN-C-S systems. Inside the installation, N and PE are split AT the MET — only post-MET neutrals may be switched.',
              'Means of isolation must be labelled, capable of being secured in the OFF position (lock-off), positioned for accessibility, and provide reliable indication that the contacts have actually opened (Reg 537.2.4 / 537.2.5 / 537.2.7).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish the four BS 7671 switching functions — isolation, switching for mechanical maintenance, emergency switching and functional switching — and select the correct device class for each.',
              'Apply Reg 461.2 correctly: identify why the PEN conductor must never be switched in TN-C / TN-C-S, where the N / PE split occurs, and which conductors a single-phase TN-C-S main switch may legitimately interrupt.',
              'Specify a means of isolation that meets Reg 537.2 — positive contact indication, lock-off facility, labelling and accessibility — and recognise non-compliant alternatives on an EICR.',
              'Apply the safe-isolation procedure (HSE GS 38, HSG 85, EAWR Reg 13) on site: select isolator, prove dead, lock off, tag, retain key, verify GS 38 indicator on a known live source.',
              'Specify emergency switching per Reg 537.4 — accessibility, identifiability (red on yellow), latching action, contactor / shunt-trip integration, and the relationship with BS EN ISO 13850 machinery e-stops.',
              'Decide single-pole vs double-pole vs TPN isolation based on system earthing (TN-S / TN-C-S / TT / IT), load configuration (single-phase / three-phase / star / delta), and the universal rules: never break the CPC, never break the PEN.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Four functions, one section</ContentEyebrow>

          <ConceptBlock
            title="The four switching functions BS 7671 actually distinguishes"
            plainEnglish="Not every switch is the same. BS 7671 splits the act of cutting power into four functions, each driven by a different risk and each with different device requirements."
            onSite="Read the function from the work, not the hardware. Are you about to touch live conductors? — that is isolation. Are you replacing a belt on an idle machine? — that is switching for mechanical maintenance. Has something gone catastrophically wrong right now? — that is emergency switching. Are you just turning the lights off for the night? — that is functional switching."
          >
            <p>
              Section 462 and Reg 537.2 govern <strong>isolation</strong> — separating part of the
              installation from every source of supply for safe electrical work. Section 463 and Reg
              537.3 govern <strong>switching for mechanical maintenance</strong> — preventing
              inadvertent mechanical movement of equipment during non-electrical maintenance. Reg
              537.4 governs <strong>emergency switching</strong> — rapid disconnection to remove an
              unexpected danger. Reg 537.5 governs <strong>functional switching</strong> — normal
              operational on/off control. Each function has its own device class, its own
              positioning rules and its own labelling. Choosing the wrong function is the most
              common Section 537 design mistake on inspection.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Isolation — Section 462 and Reg 537.2</ContentEyebrow>

          <ConceptBlock
            title="What isolation actually requires"
            plainEnglish="A verified, secured separation of the circuit from every source of supply, evidenced by reliable indication that the contacts have opened, with a means of preventing inadvertent reclosure."
            onSite="Five elements: (1) the device breaks ALL relevant live conductors; (2) it has positive indication that the contacts are physically open; (3) it can be secured (padlocked) in the OFF position; (4) it is labelled to identify which circuits it isolates; (5) it is accessible to the person doing the work."
          >
            <p>
              Section 462 sets the design intent: every installation shall provide means whereby
              every circuit can be isolated from each of the live supply conductors, except where
              specifically permitted otherwise. Reg 462.1 requires that effective means, suitably
              placed for ready operation, be provided so that all voltage may be cut off from every
              installation, every circuit and every item of equipment as may be required to prevent
              or remove a hazard. Reg 537.2 then translates that intent into device-level
              requirements — the physical attributes the isolating device must possess.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 462.1 — Isolation"
            clause="Every installation shall be provided with means of isolation. Effective means, suitably placed for ready operation, shall be provided so that all voltage may be cut off from every installation, every circuit and every item of equipment as may be required to prevent or remove a hazard."
            meaning="The legal default is a means of isolation EVERYWHERE: at origin, at every distribution board, at every item of equipment that may need maintenance. The exceptions are narrow (e.g. very small fixed equipment within a final circuit) — and even there, the upstream final-circuit OPD typically performs the isolation function via lock-off at the consumer unit."
            cite="BS 7671:2018+A4:2026, Reg 462.1 (p.83)"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 537.2 — Devices for isolation"
            clause="A device used for isolation shall be selected and/or installed so as to prevent any unintentional re-closure caused, for instance, by mechanical shocks or vibrations. The position of the contacts of the isolating device shall be either externally visible or clearly and reliably indicated. An indication of the OFF position shall only occur when the OFF position has actually been achieved on each pole. Provision shall be made to secure off-load isolating devices against inadvertent and unauthorised opening."
            meaning="Three device-level requirements lock together: positive contact indication (Reg 537.2.5 / 537.2.6), prevention of unintentional reclosure including padlocking facility (Reg 537.2.7), and identification labelling (Reg 537.2.4 / Reg 514). Miss any one and the device is not a valid means of isolation under BS 7671."
            cite="BS 7671:2018+A4:2026, Reg 537.2 (p.149)"
          />

          <ConceptBlock
            title="Indication of position — why a marked handle is not enough"
            plainEnglish="A handle position tells you the handle is in the OFF position. It does not tell you the contacts have actually opened — handles can detach, linkages can fail, contacts can weld."
            onSite="Acceptable indication routes: (a) externally visible contact gap (e.g. an air-break disconnector with a viewing window), (b) a switch-disconnector compliant with BS EN 60947-3 with positive contact indication where the OFF marking is mechanically interlocked with the actual contact separation, or (c) an isolator with a contact-status auxiliary that is itself rated to indicate position reliably. Never accept a generic rotary switch as an isolator."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>The PEN prohibition — Reg 461.2</ContentEyebrow>

          <ConceptBlock
            title="Why TN-C and TN-C-S forbid switching the PEN"
            plainEnglish="In TN-C-S the PEN is the combined protective-earth + neutral conductor coming from the DNO. It is the ONLY earth path back to the source. Break it under load and every Class I exposed metal part rises toward line voltage."
            onSite="Reg 461.2 is unconditional in TN-C and TN-C-S systems: no isolation, no switching, no fuse, no breaker on the PEN. The PEN is continuous from the DNO transformer star point through to the consumer MET. Inside the installation, N and PE are SPLIT at the MET, and the post-MET neutral may be switched as part of a double-pole or four-pole isolator. The PEN itself never is."
          >
            <p>
              The reasoning is fault-current physics. In normal operation the PEN carries the
              neutral return current of the loads, so it sits at approximately 0 V relative to true
              earth. A correctly bonded MET ties every CPC-connected exposed metal part to that 0 V
              reference. Open the PEN with load on the system and the neutral current has nowhere to
              go — it diverts through whatever earth paths are available
              (extraneous-conductive-parts, plumbing, structural steel, soil moisture). The voltage
              of the local earth reference RISES toward line voltage, and every Class I exposed
              metal part bonded to the MET rises with it. The fault is INVISIBLE to a basic
              insulation-resistance test — it only manifests under load with the PEN open upstream.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 461.2 — General requirements for isolation and switching"
            clause="In a TN-C system, the PEN conductor shall not be isolated or switched. In a TN-C-S system, the PEN conductor shall not be switched or isolated."
            meaning='No exceptions, no risk-assessment route, no "but the customer wanted a master switch that breaks everything" argument. The PEN is sacrosanct upstream of the consumer MET in any TN-C or TN-C-S installation. Designers must lay out the main switch / main isolator as double-pole (line + post-MET neutral only) or four-pole TPN (three lines + post-MET neutral) — never four-pole including PEN.'
            cite="BS 7671:2018+A4:2026, Reg 461.2 (p.83)"
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>
            Switching for mechanical maintenance — Section 463 and Reg 537.3
          </ContentEyebrow>

          <ConceptBlock
            title="When the work is mechanical, not electrical"
            plainEnglish="Replacing a belt, clearing a jam, sharpening a blade, lubricating bearings — the worker is exposed to mechanical movement, not live conductors. The function is to make the equipment safely INACTIVE without necessarily isolating it electrically."
            onSite="Reg 463.1 / 537.3 device requirements: manually operated, breaks all line conductors of the supply (so a single-phase loss cannot leave the motor running on two phases), cannot inadvertently re-close, and ideally provides a means of locking in the OFF position. The lock-off requirement is softer than for full isolation but in practice almost every modern switch-disconnector meets both."
          >
            <p>
              Section 463 sets the design intent: where mechanical maintenance involves a risk of
              physical injury, suitable means shall be provided to switch off the supply. Reg
              537.3.1 requires the device to be inserted in the main supply circuit (so the
              maintenance worker controls the SOURCE, not just a downstream sub-circuit), to be
              manually operated (not auto-resetting), to have an OFF position that is reliably
              indicated, and to break all line conductors of the supply simultaneously. Reg 537.3.2
              requires precautions against inadvertent or unintentional restoration of the supply
              during the maintenance work — typically by lock-off, position-within-sight, or a
              key-operated-handle.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 537.3 — Devices for switching off for mechanical maintenance"
            clause="Devices for switching off for mechanical maintenance shall be inserted, where practicable, in the main supply circuit. Manual operation of the device shall be possible. The device shall be selected and installed so as to prevent any unintentional or inadvertent re-closure during the mechanical maintenance, unless the means of switching off is kept under continuous supervision of the person performing the maintenance work. Where contacts are not visible, an indication of the OFF position shall be reliable."
            meaning="The device must be inside the work area or under the worker's control. Lock-off, key-removed-handle or continuous personal supervision are the three accepted ways to prevent inadvertent reclosure. A switch on a wall in the next room with a paper notice is not under supervision."
            cite="BS 7671:2018+A4:2026, Reg 537.3 (p.151)"
          />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Emergency switching — Reg 537.4</ContentEyebrow>

          <ConceptBlock
            title="Rapid disconnection in unexpected danger"
            plainEnglish="A red mushroom-head button you can hit instantly when something has gone seriously wrong — entanglement, runaway machinery, fire, person in contact with conductors. The function is speed and certainty, not maintenance."
            onSite="Reg 537.4 device requirements: readily accessible from any place where the danger may arise, identifiable (red actuator on yellow background, BS EN ISO 13850), latched once operated (does not auto-reset), capable of breaking the full prospective load current, and reset only by deliberate action. Multiple e-stops may be required where the danger may arise in several locations — site them at every operator station and every entrance."
          >
            <p>
              Reg 537.4.1 sets the function: emergency switching shall remove unexpected danger that
              may give rise to an electric shock or other risk of injury, by removing or switching
              off the supply quickly. Reg 537.4.2 sets accessibility: the means of operating shall
              be readily accessible at every place where danger may occur. Reg 537.4.3 sets
              identification: red actuator on a yellow background, with adjacent identifying label.
              Reg 537.4.4 / 537.4.5 set the operating mode: latched after actuation (so the supply
              cannot auto-restore), reset only by deliberate manual action, and able to break the
              full load current of the controlled circuit (directly or via a contactor /
              shunt-trip).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 537.4 — Devices for emergency switching"
            clause="A device for emergency switching shall act as directly as possible on the appropriate supply conductors. The arrangement shall be such that one single action will interrupt the appropriate supply. The means of operating devices for emergency switching shall be readily accessible at places where danger may occur. The means of operation (handle, push-button etc) of devices for emergency switching shall be clearly identifiable, preferably by colouring. If a colour is to be used for identification, this colour shall be RED, with a contrasting background."
            meaning="Single action — not a sequence, not a coded entry, not a key turn. Red on yellow is the visual language. Operates directly on the supply conductors (or via a contactor whose drop-out is wired so loss of the e-stop loop drops the contactor — fail-safe). Readily accessible everywhere the danger may arise."
            cite="BS 7671:2018+A4:2026, Reg 537.4 (p.151)"
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>Functional switching — Reg 537.5</ContentEyebrow>

          <ConceptBlock
            title="Normal operational control — and what it is not"
            plainEnglish="The light switches, the thermostat, the appliance rocker switch, the timer that turns the immersion on at 4 a.m. Functional switching is the everyday on/off of the installation."
            onSite="Reg 537.5 sets gentle requirements compared with isolation or emergency switching. The device must be suitable for the most onerous duty it is intended to perform (load class, frequency of operation, environmental rating). It is NOT required to provide isolation, NOT required to be lockable, NOT required to provide positive contact indication. Critically: a functional switch is not a means of isolation — using one as such is the most common safe-isolation failure on inspection."
          >
            <p>
              Reg 537.5.1 requires the device be suitable for the most demanding operating
              conditions of the controlled circuit (rated current, voltage, frequency of operation,
              breaking capacity at the prospective short-circuit current at that point). Reg 537.5.2
              permits semiconductor switching devices (solid-state relays, triacs) for functional
              control where they are suitable for the load — but Reg 537.2.3 explicitly excludes
              such devices from being used as a means of isolation because they may not provide a
              verified contact gap. The mental model: a functional switch controls the load while
              live conductors remain present in the device; an isolator separates the conductors so
              the device can be safely worked on.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Means of isolation — labelled, lockable, accessible</ContentEyebrow>

          <ConceptBlock
            title="The three attributes of a compliant means of isolation"
            plainEnglish="Labelled (identifies what it isolates), lockable (can be secured against re-energisation), accessible (the worker can reach and operate it without exposing themselves to other risks)."
            onSite="Labelling: Section 514 plus Reg 537.2.4 — circuit identification and where remote from the equipment, a sign at the equipment indicating where the isolator is located. Lockable: padlocking facility built into the handle (modern switch-disconnectors), or a third-party lock-off device that physically prevents handle movement (MCB lock-offs, cassette locks). Accessible: the device is positioned where it can be reached and operated without working at height, climbing, or moving heavy items — Reg 132.12 (accessibility for operation, inspection, testing and maintenance)."
          >
            <p>
              The three attributes are independent — a beautifully labelled isolator that cannot be
              locked off is not a means of isolation; a perfectly lockable isolator that is not
              labelled creates a real risk that the wrong device is locked off; a labelled and
              lockable isolator behind a piled-up storage cupboard is inaccessible. All three must
              be present for the device to satisfy Section 537. On EICR, missing any one is
              typically a C3 (improvement) where the risk is mitigated by other circuit
              identification, or an FI (further investigation) where the failure mode prevents the
              isolation function being verified at all.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>
            Padlock-off / lock-out / tag-out — the safe-isolation procedure
          </ContentEyebrow>

          <ConceptBlock
            title="HSE GS 38 / HSG 85 / EAWR 1989 Reg 13 — the procedure that ties BS 7671 to statutory law"
            plainEnglish="A documented sequence: select the correct isolator, switch off, lock off, tag with personal warning, prove dead with a GS 38 indicator on a known live source first, then verify dead at the work location, then verify the indicator is still functional on the known live source afterward."
            onSite="The full sequence: (1) IDENTIFY the correct isolator using the circuit chart, schedule of test results, or trace from the work location upstream. (2) SWITCH OFF and ANNOUNCE to anyone on site. (3) LOCK OFF with a padlock or hasp+padlock; key in your possession. (4) TAG with your name, date, work description. (5) Use a GS 38-compliant voltage indicator (NOT a multimeter); test it on a known live source first to verify the indicator works. (6) Test at the work location across L-N, L-PE and N-PE — all three must read dead. (7) Re-test the indicator on the known live source to confirm it has not failed silently. (8) Begin work."
          >
            <p>
              The procedure is a chain — every step protects against a different failure mode. Step
              5 / step 7 (prove the indicator works before AND after testing at the work location)
              protect against an indicator that has gone open-circuit or had its battery die
              mid-task — without the post-test on a known live source, an open-circuit indicator
              reads &quot;dead&quot; everywhere including a live conductor. Step 3 (personal padlock
              with key in your possession) protects against a co-worker, customer or cleaner
              switching the supply back on. Step 4 (tag with your name) makes the isolation visible
              to anyone who arrives later. EAWR 1989 Reg 13 (Dead Working) is the statutory hook:
              the procedure is the evidence the duty was discharged.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <VideoCard
            url={videos.safeIsolation.url}
            title={videos.safeIsolation.title}
            channel={videos.safeIsolation.channel}
            duration={videos.safeIsolation.duration}
            topic="Watch · JIB safe isolation procedure"
            caption="Craig Wiltshire walks the JIB safe isolation sequence end-to-end on a real consumer unit — identify the isolator, lock off, prove the GS 38 indicator on a known live source, test L-N / L-PE / N-PE at the work location, then prove the indicator again. That is the practical test sequence Reg 462 and HSE GS 38 require — watching it once on video makes the written procedure click."
          />

          <SectionRule />

          <ContentEyebrow>
            Multi-pole isolation — system earthing and load configuration
          </ContentEyebrow>

          <ConceptBlock
            title="Single-pole, double-pole, TPN — picking the right number of poles"
            plainEnglish="Number of poles depends on (a) the system earthing arrangement and (b) the load configuration. Two universal rules: never break the CPC, never break the PEN."
            onSite="Single-phase TN-S / TN-C-S (post-MET) installation: double-pole isolator breaks line and post-MET neutral. Single-phase TT: double-pole isolator breaks line and neutral. Three-phase star-connected with neutral (e.g. 400 V TPN distribution): four-pole switch-disconnector (TPN) breaks three lines plus neutral. Three-phase delta-connected (no neutral, e.g. delta motor): three-pole isolator breaks all three lines. In every case the CPC is continuous through the isolator — it is never switched. In TN-C / TN-C-S the PEN upstream of the MET is continuous regardless of pole count downstream."
          >
            <p>
              The reason for breaking the neutral on a double-pole or TPN isolator is fault
              isolation — if the line is broken but the neutral remains connected, a fault to earth
              on the now-isolated neutral can drive current through unexpected paths (especially in
              TT where Ra is high). Breaking both removes that risk. The reason for never breaking
              the CPC is fault protection on adjacent equipment — if the CPC is interrupted at the
              isolator, equipment fed from the same DB but on a different circuit relies on a CPC
              that may have been compromised by the act of opening the isolator. The CPC is the
              spine of the installation; isolators interrupt only the live conductors of the
              specific circuit being isolated.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Designing a TN-C-S main switch as break-everything-including-PEN"
            whatHappens='A handyman or unqualified contractor fits a master cut-off switch on the supply side of the cut-out, breaking line, neutral AND the incoming PEN — "so the property is fully dead in an emergency". Reg 461.2 prohibits this in TN-C / TN-C-S. Under load with the switch open, the PEN is broken and every Class I exposed metal part bonded to the MET drifts toward line voltage. The fault is invisible until someone touches the kettle while standing on the (now elevated) wet floor.'
            doInstead="In TN-C-S the PEN is continuous from the DNO transformer to the consumer MET. The main switch sits AFTER the MET and breaks line and post-MET neutral only — never the PEN. If the requirement is for a single switch that fully de-energises the property in an emergency, that requirement is NOT met in TN-C-S using a switch on the PEN — it is met by an emergency switching device after the MET, controlling everything downstream. For total mains kill including the supply side, that is a DNO operation, not a customer one."
          />

          <CommonMistake
            title="Unlabelled or generically-labelled sub-mains isolator"
            whatHappens='A site has six TPN isolators in the riser cupboard, all labelled "Isolator" or with faded handwritten tags. An electrician arrives to work on a circuit on the third-floor unit. They lock off what they think is the right isolator, prove dead at the local outlet — which reads dead because that outlet has a separate fault — and start work. Live conductors remain in the cable they assumed was isolated. The fault is the wrong-device-locked-off failure mode that section 514 / Reg 537.2.4 labelling exists to prevent.'
            doInstead="Every means of isolation must be uniquely identified — by reference to the circuit chart, DB way, building zone or descriptive label. Where multiple similar devices exist, additional unambiguous identification is required (Reg 514). On any cert (EICR, EIC, MWC) where this fails, the inspector should record an observation — typically C3 where labelling is partial, FI where the labelling failure prevents the isolation function being verified."
          />

          <CommonMistake
            title="Emergency switch behind a locked door or up a ladder"
            whatHappens='A workshop e-stop is fitted at high level above a saw bench, ostensibly "out of the way of accidental knocks", but actually requires reaching across the running machine to operate. Or a kitchen all-off switch is fitted inside the manager&apos;s office, locked overnight when the cleaning shift uses the kitchen. Reg 537.4.2 fails: the means of operating is not readily accessible at the place where danger may occur, and the rapid-disconnection purpose is defeated.'
            doInstead="Site emergency switching at every operator position and every entrance to the area where the danger may arise. Mount at a height reachable without stretching (typically 1.0 to 1.6 m). Protect against accidental knocks using a hinged transparent flap or guarded mushroom — NOT by hiding behind a locked door. Where the workshop has multiple operator positions, multiple e-stops are wired in series so any one will drop the supply contactor."
          />

          <SectionRule />

          <ContentEyebrow>
            Indication of position — how isolators tell you they have actually opened
          </ContentEyebrow>

          <ConceptBlock
            title="Positive contact indication — the BS EN 60947-3 mechanical guarantee"
            plainEnglish="A switch-disconnector designed so the OFF marking on the handle CANNOT show unless the contacts are physically separated. The handle and contacts are mechanically linked — no soft springs, no plastic interlocks that can fail."
            onSite='Read the device datasheet. BS EN 60947-3 switch-disconnectors with positive contact indication carry a specific symbol (often a circle and bar with a dot, or the words "positive break" or "guaranteed isolation"). For domestic CU isolators the spec sheet should explicitly state compliance. Generic rotary cam switches without that compliance are NOT valid means of isolation under Reg 537.2 — the contacts may have welded closed while the handle moves freely to OFF.'
          >
            <p>
              The failure mode positive contact indication protects against is contact welding —
              high fault current through a closing or opening contact creates an arc that can fuse
              the contact metals. A welded contact stays closed regardless of handle position. A
              handle-only indication can show OFF while the contacts remain closed, and the worker
              proceeds to operate on what they believe to be a dead circuit. Positive contact
              indication ties the OFF marking to the actual contact position through a mechanical
              interlock that fails safe — the handle physically cannot reach the OFF position unless
              the contacts have separated.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Workshop bench saw with emergency stop"
            situation="A small commercial joinery has a single-phase 230 V 16 A bench saw on a TN-C-S supply. The customer wants an emergency stop on the saw, plus a means of isolation for blade changes. The saw motor is 2.2 kW. The local sub-DB is in the corridor 8 m away."
            whatToDo="Three devices, three functions. (1) Functional switching: the saw's own start / stop pushbutton on the operator panel — Reg 537.5, normal operational control, drives the motor contactor. (2) Emergency switching: red mushroom-head e-stop on the operator panel and a second on the wall behind the saw — Reg 537.4, BS EN ISO 13850 stop category 0 or 1, red on yellow background, latches, drops out the motor contactor when actuated. (3) Switching for mechanical maintenance / isolation: a TPN switch-disconnector with positive contact indication and padlocking facility, mounted within sight of the saw at 1.2 m — Reg 463.1 / 537.3 (mechanical maintenance) and Reg 537.2 (isolation for blade change / electrical work). The TPN isolator breaks line and neutral; it does NOT break the CPC and does NOT break any PEN. The corridor sub-DB still has its own way isolator for upstream isolation."
            whyItMatters="One device per function is the cleanest design. Combining functions is permitted (Reg 537.4.5) but rarely worth the compromise — the e-stop wants to be at the operator, the isolator wants to be at the equipment, and the functional switch wants to be on the appliance. Three devices, three locations, three sets of requirements. On the cert, the EIC schedule of inspection records each function separately with the device identification."
          />

          <Scenario
            title="Commercial kitchen with all-off mains isolator"
            situation="A 60-cover restaurant kitchen has a 100 A TPN sub-DB feeding cookers, fryers, dishwashers, extraction and lighting on TN-C-S. The customer wants an all-off emergency switch at the kitchen entrance to disconnect all cooking equipment in case of fire or runaway machinery. The kitchen DB is in a back corridor."
            whatToDo='Two devices serving distinct functions. (1) Means of isolation: the existing 100 A TPN switch-disconnector at the sub-DB — Reg 462.1 / 537.2. Lockable, labelled ("Kitchen Sub-DB"), within sight of the DB. Used for electrical work on the kitchen circuits. (2) Emergency switching: a red mushroom-head pushbutton at the kitchen entrance — Reg 537.4. Drives a 100 A contactor (or a shunt-trip on the sub-DB main switch) which interrupts the supply to the kitchen DB. Latches once pressed; reset by a deliberate key-operated reset at the DB so a panicked re-press during the incident does not auto-restore. Labelled with a sign "EMERGENCY: Kitchen All-Off" in red on yellow per Reg 537.4.3. The contactor is rated for the prospective fault current at that point and the labelling at the kitchen DB indicates that the supply is also controlled by the entrance e-stop (Reg 461.3 — sign at the equipment indicating where the isolator is located, applied here in reverse — sign at the DB indicating that emergency switching is also at the entrance).'
            whyItMatters="The kitchen all-off is a textbook Reg 537.4 application — fire is the foreseeable danger, the entrance is where someone responds, the contactor drops the load. The means-of-isolation function (full lockable disconnection for service) lives at the sub-DB. Combining them onto one device would either compromise the e-stop accessibility (lock at the DB) or the isolation lockability (e-stop at the entrance). Two devices, two functions, two separate compliance arguments."
          />

          <SectionRule />

          <ContentEyebrow>Designer&apos;s quick reference</ContentEyebrow>

          <ConceptBlock
            title="Picking the right switching function for a given task"
            plainEnglish="Walk a four-step decision tree. (1) What is the worker doing? (2) What conductor or component will they touch? (3) What is the foreseeable failure mode? (4) Which BS 7671 reg series applies?"
            onSite="(1) Touching live conductors? — Isolation, Section 462 / Reg 537.2. Lock off, prove dead, GS 38, padlock with key in pocket. (2) Touching mechanical parts of equipment, no electrical work? — Switching for mechanical maintenance, Section 463 / Reg 537.3. Lock off or position-within-sight, but device requirements lighter than for isolation. (3) Removing unexpected danger right now? — Emergency switching, Reg 537.4. Red on yellow, readily accessible, latched. (4) Normal operational on/off, no work, no emergency? — Functional switching, Reg 537.5. Suitable for the load and the duty cycle, no isolation requirement. (5) Cross-cutting universal rules: never break the CPC, never break the PEN in TN-C / TN-C-S (Reg 461.2)."
          >
            <p>
              The four-function decision tree maps cleanly onto the EIC schedule of inspection:
              every isolator is recorded as Section 462 / 537.2 with its identification and
              lockability ticked, every switch for mechanical maintenance under Section 463 / 537.3,
              every emergency switching device under Reg 537.4 with its red-on-yellow labelling and
              latching action confirmed, and every functional switch as part of the normal circuit
              description. Inspectors and designers using the same vocabulary eliminates the most
              common Section 537 disagreement on cert — is this device an isolator, or just a
              switch?
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'Four switching functions: isolation (462 / 537.2) for electrical work, switching for mechanical maintenance (463 / 537.3) for non-electrical work on equipment, emergency switching (537.4) for unexpected danger, functional switching (537.5) for normal operational control. Each has different device requirements.',
              'Reg 461.2 prohibits switching or isolating the PEN conductor in TN-C and TN-C-S systems. The PEN is continuous from DNO to MET; only post-MET neutrals may be switched.',
              'A means of isolation must be labelled (Section 514 / 537.2.4), lockable (537.2.7), accessible (132.12) and provide reliable indication of contact position (537.2.5 / 537.2.6) — typically a BS EN 60947-3 switch-disconnector with positive contact indication.',
              'Safe-isolation procedure (HSE GS 38, HSG 85, EAWR 1989 Reg 13): identify, switch off, lock off, tag, prove indicator on known live, prove dead at work location, prove indicator on known live again. Personal padlock with key in worker possession.',
              'Emergency switching: red on yellow (BS EN ISO 13850), readily accessible at every place danger may arise, latched action, breaks full load current via contactor or shunt-trip. Never combined with isolation if it compromises either function.',
              'Universal pole-count rules: never break the CPC, never break the PEN in TN-C / TN-C-S. Number of poles otherwise depends on system earthing and load configuration — single-phase TN typically double-pole, three-phase star with neutral typically four-pole TPN, three-phase delta typically three-pole.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-5-section-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.5 Grid interaction and anti-islanding
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module5Section4;
