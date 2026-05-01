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
    id: 'patm3-s3-discolour',
    question:
      'You inspect the plug body of a desktop heater. The plastic around the L pin shows a brown ring of discolouration about 5 mm wide; the body is otherwise intact and the pins look clean. Pass, fail, or test?',
    options: [
      'Pass — discolouration is cosmetic.',
      'Fail at inspection. Brown discolouration around a pin is heat damage to the moulded body — it indicates that the L contact has been dissipating heat from a high-resistance joint. IET CoP “do not test, fail it” applies; replace the lead and inspect the matching socket.',
      'Test electrically and pass on insulation resistance.',
      'Pass after a load test under nameplate current.',
    ],
    correctIndex: 1,
    explanation:
      'IET CoP Ch 15 fails visible heat damage at the inspection stage. A discolour ring around a pin shows the body has been heated repeatedly — the pin contact resistance is the source. The plug fails; the matching socket (often heated equally) is also flagged for inspection.',
  },
  {
    id: 'patm3-s3-mod',
    question:
      'A 10 m extension reel has been modified by the user — the reel’s 10 A overload cut-out has been bypassed by a wire link. The flex is otherwise undamaged. Action?',
    options: [
      'Pass if the reel is fully unwound during use.',
      'Fail and quarantine. Bypassing a manufacturer-fitted overload device is unauthorised modification (IET CoP s.15) and removes a safety function the equipment was certified with. The reel is removed from service permanently or repaired by the manufacturer / authorised agent.',
      'Replace the link with a heavier-rated fuse.',
      'Pass — the reel will be protected by the supply MCB.',
    ],
    correctIndex: 1,
    explanation:
      'Cable reels must have an integral overload cut-out to manage the de-rated current of the partially-unwound coil. Bypassing it is unauthorised modification and the reel is failed permanently — a manufacturer-supplied safety feature has been defeated.',
  },
  {
    id: 'patm3-s3-melted',
    question:
      'A C13 connector body shows a softened / slightly melted area on the L side of the connector face. The pins look straight but mildly oxidised. The lead and appliance are otherwise sound. What does this tell you?',
    options: [
      'Cosmetic — moulded plastic always softens slightly with age.',
      'The L contact has been dissipating heat. The connector body has been hot enough to deform. Fail the lead; inspect the appliance inlet (matching male side) — if it shows the same softening, the appliance fails too because the heat source may be internal.',
      'PAT-test it and decide based on insulation resistance.',
      'Replace the C13 cable with a higher-rated one.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 60320 connectors are made of moulded plastic with a defined operating temperature. A softened body means the contact temperature has exceeded that envelope. The lead fails; the matching inlet is inspected because, with IEC connectors, both ends share the heat — and a hot inlet can mean internal trouble in the appliance.',
  },
  {
    id: 'patm3-s3-dnt',
    question:
      'You arrive at an appliance and notice a hand-written note taped to it: “fuse keeps blowing — replaced with foil”. The plug carries a folded strip of aluminium foil where the BS 1362 fuse should be. Inspect or fail?',
    options: [
      'Open the plug and see if the foil is making good contact before deciding.',
      'Fail at inspection — “do not test, fail it”. A foil-substituted fuse is unauthorised modification and removes overload protection from the flex. Quarantine the appliance, label as failed, and report the substitution to the duty-holder.',
      'Replace the foil with a 13 A BS 1362 and test.',
      'Pass — foil has higher current capacity than a fuse.',
    ],
    correctIndex: 1,
    explanation:
      'Foil-substituted fuses are one of the textbook examples of dangerous unauthorised modification. The fuse is defeated, the flex is unprotected, and the underlying overload that was blowing the original fuse is still there. CoP fails on sight.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following is an indicator of overheating that the IET CoP requires you to flag at the visual inspection stage?',
    options: [
      'A cool plug body with normal pin colour',
      'Brown / black discolouration on the plug body around a pin',
      'A plug body with a sticker on it',
      'A flex slightly curled from being coiled in storage',
    ],
    correctAnswer: 1,
    explanation:
      'Discolouration of the moulded plug body around a pin is heat damage — the pin has been hot and the heat has migrated into the body. IET CoP s.15.6 lists this as an inspection fail. The other options are not heat damage.',
  },
  {
    id: 2,
    question:
      'You find a cable junction made by twisting two 1.5 mm² 3-core flexes together inside a layer of insulation tape, between the appliance and the plug. Per IET CoP, what is this?',
    options: [
      'An acceptable repair if executed properly',
      'Unauthorised modification — flex must be continuous from plug to appliance, or use an approved coupler. Failed at inspection',
      'A construction technique used by some manufacturers',
      'Acceptable on Class II equipment',
    ],
    correctAnswer: 1,
    explanation:
      'IET CoP Ch 15 does not permit twisted-and-taped cable joints in flexes. Flex must be a single continuous run, or use approved couplers. Twisted joins are unauthorised modification and a definite fail at the visual stage.',
  },
  {
    id: 3,
    question:
      'A workshop tool has had its earth pin broken off the moulded plug, and the user has filed the L and N pins narrower so the plug fits a foreign socket pattern. The flex is otherwise sound. CoP position?',
    options: [
      'Replace the plug only',
      'Fail and quarantine. Defeating the earth on a Class I appliance is a serious unauthorised modification — the protective measure has been removed. The appliance is removed from service until a competent person investigates and refits a compliant BS 1363 plug',
      'PAT-test electrically and decide on insulation resistance',
      'Pass if the appliance is double-insulated',
    ],
    correctAnswer: 1,
    explanation:
      'Removing the earth pin from a Class I appliance defeats the fault-protection method the appliance was designed and certified with. This is the most serious category of unauthorised modification. The appliance is failed and quarantined. The CoP allows refitting a compliant BS 1363 plug as the remediation.',
  },
  {
    id: 4,
    question: 'IET CoP “do not test, fail it” means:',
    options: [
      'Skip the visual inspection if the equipment looks new',
      'Where visible damage compromises safety, the equipment is failed at the visual stage and not subjected to electrical testing',
      'Test electrically first, decide visually second',
      'Always test before failing',
    ],
    correctAnswer: 1,
    explanation:
      'IET CoP and HSG107 are explicit: visible safety-compromising defects are failed at the visual stage. Electrical testing is for verifying a passable item. Connecting a known-failed item to the tester risks the tester, the inspector, and gives no useful information.',
  },
  {
    id: 5,
    question:
      'A heater flex is hardened, brittle and crumbles at the touch near the appliance entry. The outer sheath is intact. What does this indicate, and what is the action?',
    options: [
      'Normal age-hardening — pass',
      'Heat damage from prolonged exposure to elevated temperature near a heat source. The PVC has degraded; the flex is no longer reliable. Fail and replace with appropriate heat-resisting flex',
      'Cosmetic — the inner cores are still insulated',
      'Pass after a successful insulation-resistance test',
    ],
    correctAnswer: 1,
    explanation:
      'PVC flex degrades when held above its rated continuous operating temperature for long periods. The flex becoming brittle is the visible sign. The lead is failed and replaced with the correct heat-resisting flex (1.25 mm² or 1.5 mm² HR for heating appliances).',
  },
  {
    id: 6,
    question:
      'A C13 (kettle) inlet on a server power supply shows a clearly scorched L contact area and a faint smell of melted plastic. The lead is undamaged. CoP action?',
    options: [
      'Replace the lead and re-test',
      'Fail the appliance, not just the lead. Scorching at the appliance inlet means heat is being generated at the L contact inside the equipment — internal fault. Refer for engineering inspection; do not return to service on a new lead alone',
      'Test the lead in isolation and pass it',
      'Pass — server PSUs run hot',
    ],
    correctAnswer: 1,
    explanation:
      'Scorching at the inlet points to a high-resistance internal joint or a damaged inlet inside the appliance. Replacing only the lead leaves the underlying fault. The appliance is failed at the visual stage and referred for engineering inspection.',
  },
  {
    id: 7,
    question:
      'A user has wrapped a section of damaged outer sheath in PVC tape “to protect it”. The tape covers about 80 mm of flex. CoP position?',
    options: [
      'Acceptable temporary fix; re-inspect at next cycle',
      'Fail. Tape is not a CoP-recognised remediation for sheath damage. The flex is no longer to original construction; replace the lead',
      'Pass after a successful insulation-resistance test',
      'Pass if the appliance is Class II',
    ],
    correctAnswer: 1,
    explanation:
      'Outer-sheath damage means the flex is no longer to original construction. Tape does not restore the mechanical or electrical protection of the sheath. IET CoP fails the lead at inspection and the lead is replaced.',
  },
  {
    id: 8,
    question:
      'A flex coupler used to extend an appliance lead consists of a chocolate-block / strip-connector inside a piece of clear shrink-tube. CoP position?',
    options: [
      'Acceptable — the connection is enclosed',
      'Fail. Strip-connectors are not approved couplers for flexible cables in service. Use a proper inline coupler or a BS 1363 plug-and-trailing-socket pair. The connection is unauthorised modification',
      'Pass if the conductors are individually shrink-sleeved',
      'Pass on a Class II appliance',
    ],
    correctAnswer: 1,
    explanation:
      'Strip-connectors (often called chocolate blocks) are designed for fixed-wiring termination, not for in-service flex couplings that may be moved or pulled. The CoP does not recognise this as a coupler — it is failed at inspection.',
  },
  {
    id: 9,
    question:
      'Inspecting a kettle, you find that the user has filed down the C15/C16 latching tab on the connector to make the lead easier to insert / remove. The latching is now disabled. CoP?',
    options: [
      'Pass — the latch is convenience',
      'Fail. The latch on C15/C16 is part of BS EN 60320 construction; defeating it is unauthorised modification. The lead is replaced',
      'PAT-test and pass on insulation resistance',
      'Pass after the user signs a disclaimer',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 60320 specifies latching where applicable. A user filing the latch off is unauthorised modification of a manufacturer-supplied safety / retention feature. The lead is failed and replaced.',
  },
  {
    id: 10,
    question:
      'Which of the following is the correct sequence for a PAT inspector who finds visible heat damage at the formal visual inspection stage?',
    options: [
      'Test electrically; if it passes, return to service',
      'Quarantine the equipment; record the defect on the PAT register; report to the duty-holder; do not subject to electrical testing',
      'Carry out the rewire; re-test; return to service',
      'Send the equipment for fixed-wiring inspection',
    ],
    correctAnswer: 1,
    explanation:
      'Visible heat damage triggers “do not test, fail it”. The equipment is removed from service immediately, the defect is recorded on the register, and the duty-holder is informed. Electrical testing is not used to rescue a known-failed item.',
  },
];

const PATTestingModule3Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Signs of overheating or modification | PAT Testing Module 3.3 | Elec-Mate',
    description:
      'IET CoP Ch 15 + HSG107: discolouration patterns, heat damage to plug and socket, melted insulation, unauthorised modifications, and the “do not test, fail it” rule for safety-critical defects.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/pat-testing-module-3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="PAT M3 · Section 3"
            title="Signs of overheating or modification"
            description="The defect catalogue: discolouration, scorching, melting, hardened insulation, foil fuses, bypassed cut-outs and removed earth pins. The “do not test, fail it” rule in practice."
            tone="yellow"
          />

          <TLDR
            points={[
              'Heat damage on a moulded plug or connector body shows up as discolouration (brown / black ring around a pin), softened plastic, melted plastic, or scorching. All are inspection fails.',
              'Heat at one end of an IEC connector usually means heat at the other end. Scorching at the appliance inlet implies internal fault in the appliance — fail the appliance, not just the lead.',
              'PVC flex degrades when held above its rated temperature. Hardened, brittle, crumbling flex near a heat source is heat damage and the lead is replaced with the correct heat-resisting flex.',
              'Unauthorised modification — foil fuses, bypassed overload cut-outs, removed earth pins, twisted-and-taped joins, strip-connector couplers — is failed at inspection. Several are immediate safety quarantines.',
              'IET CoP “do not test, fail it” — visible safety-compromising defects stop the test sequence. The PA tester is not used to rescue a failed item.',
              'When you find heat damage, inspect the matching socket / inlet too. Both ends of the contact share the heat history.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify visible signs of overheating on plugs, connectors, sockets and flexes — discolouration, scorching, softening, melted plastic, hardened insulation',
              'Diagnose where the heat came from — high-resistance contact, internal appliance fault, environmental over-temperature — and direct the remediation accordingly',
              'Recognise unauthorised modifications — foil fuses, bypassed cut-outs, removed earth pins, twisted-and-taped joins, non-standard couplers — and apply the IET CoP fail-at-inspection rule',
              'Apply the “do not test, fail it” principle from IET CoP Ch 15 / HSG107 and document the decision on the PAT register',
              'Inspect both ends of a connection (plug + socket, IEC plug + appliance inlet) when heat damage is found at one end',
              'Refer suspected internal-fault appliances for engineering inspection rather than attempting electrical-test-based clearance',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>How to read heat damage</ContentEyebrow>

          <ConceptBlock
            title="The heat damage sequence — discolouration, softening, melting, scorching"
            plainEnglish="Heat damage to moulded plastic happens in stages. The stages are recognisable, and they let you read how hot the part has been and for how long."
            onSite="Compare the suspect plug or connector to a clean reference. The differences are usually obvious once you know what you are looking at."
          >
            <p>The four stages of visible heat damage on moulded plug / connector plastic:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Discolouration.</strong> A brown or yellowed ring on white plastic, or a
                lightening on dark plastic, localised around a pin or a contact area. The plastic
                has been hot enough to begin chemical change — typically above its rated temperature
                for many cycles. <em>Inspection fail.</em>
              </li>
              <li>
                <strong>Softening / sagging.</strong> The plastic has been hot enough to deform
                slightly. Edges that should be sharp are rounded; faces that should be flat are
                slightly bulged. The plug or connector may be loose in its socket because the
                geometry has shifted. <em>Inspection fail.</em>
              </li>
              <li>
                <strong>Melting.</strong> Visible melted areas, drip patterns, or fused-together
                plastic at the contact. The temperature has been well above rated and the connector
                cannot be considered to BS EN 60320 / BS 1363 dimensions any more.{' '}
                <em>Inspection fail; quarantine.</em>
              </li>
              <li>
                <strong>Scorching / charring.</strong> Black / brown burned plastic, often with a
                smell. There has been sustained high-temperature heat or an arcing event. The
                appliance / lead is fail-and-investigate — there is a fault that the part was
                visibly trying to warn about. <em>Quarantine and refer.</em>
              </li>
            </ol>
            <p>
              Each stage is a fail. The diagnostic value is in deciding whether to investigate
              further. Discolouration on a plug usually means a poor pin contact (replace plug,
              inspect socket). Scorching at the appliance inlet usually means an internal fault in
              the equipment (refer for engineering inspection).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice for In-service Inspection and Testing of Electrical Equipment, 5th Edition (2020), s.15.6"
            clause={
              <>
                The inspector should look for any signs of overheating, including discolouration of
                the plug body, signs of arcing or burning at the pins or connector contacts, melted
                or distorted plastic on the plug or connector body, and any sign of scorching on the
                equipment, the appliance inlet or the supply socket. Where any sign of overheating
                is found, the equipment shall not be put back into service until the cause has been
                identified and rectified.
              </>
            }
            meaning="The CoP names the visible signs explicitly and is clear: heat damage stops the equipment going back into service until the root cause has been found and fixed. Electrical testing is not the route back to service."
          />

          <SectionRule />

          <ContentEyebrow>Heat damage to flexes</ContentEyebrow>

          <ConceptBlock
            title="What happens to PVC flex when it runs hot"
            plainEnglish="PVC flex insulation has a rated continuous operating temperature — typically 70 °C for ordinary PVC, 90 °C for thermosetting variants. When the flex runs above that for sustained periods, the PVC degrades. The visible signs are hardness, brittleness, surface cracking, discolouration and eventually crumbling."
            onSite="Bend the flex gently between fingers near the appliance entry. If the sheath cracks or the surface flakes, it has been over-temperature. Replace with the correct flex type for the application."
          >
            <p>The mechanisms and where you see them:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Hardened sheath near a heat source.</strong> The flex on a kettle, iron, or
                fan heater that runs near the body of the appliance often shows hardening within
                100–200 mm of the appliance entry. PVC has lost its plasticiser and is no longer
                flexible.
              </li>
              <li>
                <strong>Surface cracking.</strong> Fine longitudinal or circumferential cracks
                across the sheath. The flex will fail in service shortly — the cracks propagate
                until the inner cores are exposed.
              </li>
              <li>
                <strong>Discolouration.</strong> Yellowing of white sheath, lightening of dark
                sheath, or visible browning. Heat-induced chemical change in the PVC.
              </li>
              <li>
                <strong>Melted / fused to the appliance body.</strong> The flex has touched a hot
                part of the appliance and the sheath has welded itself to the body. The flex is
                damaged at that contact point; the appliance routing is wrong.
              </li>
              <li>
                <strong>Crumbling / powdering when handled.</strong> Severe degradation. The PVC has
                lost mechanical integrity. Replace immediately and remove from service.
              </li>
            </ul>
            <p>
              The remediation is always to replace the flex, with appropriate heat-resisting flex if
              the application warrants it. Section 4 covers environmental considerations that
              influence flex selection.
            </p>
          </ConceptBlock>

          <Scenario
            title="An office fan heater pulled out of summer storage"
            situation="A 2 kW fan heater stored over summer is brought back into the office for autumn. The flex is clearly hardened within 200 mm of the appliance — the sheath is brittle and shows fine cracks when bent. The appliance is otherwise clean and the plug looks fine."
            whatToDo="Fail at the visual stage. PVC flex on a 2 kW heater is being asked to do a job it cannot reliably do — replace with 1.25 mm² heat-resisting flex per IET CoP Table 15.4 and BS EN 50525 H05RR-F (or H07RN-F for harder-duty environments). Re-inspect after rewiring."
            whyItMatters="A hardened sheath within months of installation tells you the wrong flex was specified, not just that this lead has aged. The fix is to use heat-resisting flex on a heater, not to replace ordinary PVC with the same ordinary PVC."
          />

          <SectionRule />

          <ContentEyebrow>Heat damage at the contact — diagnosing the cause</ContentEyebrow>

          <ConceptBlock
            title="The high-resistance contact loop"
            plainEnglish="The most common cause of heat damage on plugs, sockets, and IEC connectors is a high-resistance contact between two pieces of metal that should be joined low-resistance. Higher contact resistance means more I²R heat at that contact for a given current. The heat both indicates the problem and accelerates it — oxidation grows, contact resistance rises further, the part heats more."
          >
            <p>The mechanism, end to end:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                A small piece of corrosion or oxide forms on the pin or the socket contact. Contact
                resistance rises slightly.
              </li>
              <li>
                Current passing through the contact dissipates more heat than before — even a few
                tens of milliohms times tens of amps² is several watts at a small contact area.
              </li>
              <li>
                The heat accelerates oxidation. Contact resistance rises further. The cycle is
                self-reinforcing.
              </li>
              <li>
                The plastic around the contact discolours, then softens, then melts. By the time you
                can see it, the contact has been hot for thousands of hours.
              </li>
              <li>
                Eventually the contact either welds (mechanical damage on next removal), arcs
                (visible scorching, possible flashover), or fails open (appliance simply stops
                working).
              </li>
            </ol>
            <p>
              The diagnostic implication: when you find heat damage on the plug body around a pin,
              the matching socket has the same heat history. Inspect the socket, flag it for
              fixed-wiring inspection, and treat it as failed until the fixed-wiring electrician has
              cleared it.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Replacing a heat-damaged plug and ignoring the matching socket"
            whatHappens="A plug body shows discolouration around the L pin. The PAT inspector replaces the plug. The new plug goes back into the same socket, where the matching contact has the same oxidation and the same elevated temperature history. Within a few weeks the new plug is showing the same discolouration, but now it can be passed off as a recurring fault rather than the same fault."
            doInstead="When heat damage is found on a plug, the matching socket is failed-by-association until inspected. Flag for fixed-wiring inspection; the duty-holder needs to know. The PAT register entry should record that the socket was the suspected co-cause."
          />

          <CommonMistake
            title="Treating scorching at the appliance inlet as a lead problem"
            whatHappens="A C13 lead has visible scorching at the appliance inlet — the male side on the appliance. The inspector replaces the lead. The new lead picks up the scorching pattern within a few weeks because the heat source is inside the appliance — a high-resistance internal joint at the inlet, or a damaged inlet — and it has not been addressed."
            doInstead="Scorching at the appliance inlet means the appliance fails, not just the lead. Refer for engineering inspection. The lead may be replaced, but it is the appliance that needs investigation. CoP “do not test, fail it” covers this case explicitly."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Unauthorised modification — the catalogue</ContentEyebrow>

          <ConceptBlock
            title="The classes of unauthorised modification you actually find"
            plainEnglish="Unauthorised modification means any change made to the equipment that is outside the manufacturer’s instructions and outside the IET CoP’s permitted remediations. The CoP fails all of them at the visual stage; some are immediate safety quarantines."
            onSite="The pattern is recognisable. Someone tried to fix a problem with the wrong tool. The fix removes a safety function the manufacturer or the standard put there, and the original problem is still present underneath."
          >
            <p>The common categories:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Foil-substituted fuses.</strong> A folded strip of aluminium foil where a BS
                1362 cartridge fuse should be. Removes overload protection. Immediate quarantine.
              </li>
              <li>
                <strong>Wrong-rating fuses fitted to stop nuisance blowing.</strong> 13 A in place
                of 5 A or 3 A on equipment that legitimately blows the smaller fuse. Removes
                effective overload protection.
              </li>
              <li>
                <strong>Removed earth pin on Class I equipment.</strong> Defeats the protective
                measure the appliance was certified with. The user has typically done this to fit a
                foreign socket or to silence an RCD. Immediate quarantine.
              </li>
              <li>
                <strong>Bypassed overload cut-outs on cable reels.</strong> A wire link in place of
                the reel’s 10 A overload cut-out. Removes the de-rating safety for partly-unwound
                use. Immediate quarantine.
              </li>
              <li>
                <strong>Twisted-and-taped flex joints.</strong> Flex extended or repaired by
                twisting two flexes together inside insulation tape. High contact resistance, no
                mechanical retention, no proper insulation barrier. Fail.
              </li>
              <li>
                <strong>Strip-connectors as flex couplers.</strong> Chocolate-block /
                strip-connector used inside shrink tubing to join two flexes. Not an approved
                coupler for flexible cables in service. Fail.
              </li>
              <li>
                <strong>Filed pins / filed latches.</strong> User has narrowed BS 1363 pins to fit a
                foreign socket, or filed off the C15/C16 latch tab. Defeats standard construction.
                Fail.
              </li>
              <li>
                <strong>Permanent travel adaptors on imported equipment.</strong> Foreign-pattern
                adaptor in long-term use, typically with no fuse. Should be a BS 1363 plug
                conversion. Fail.
              </li>
              <li>
                <strong>Home-made earth links / supplementary earths.</strong> A separate earth wire
                run from the appliance to a metal pipe / radiator. Indicates the user knew something
                was wrong with the original earth path; the appliance fails until a competent person
                has investigated.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice for In-service Inspection and Testing of Electrical Equipment, 5th Edition (2020), s.15"
            clause={
              <>
                Equipment that has been subjected to unauthorised modification, including but not
                limited to non-standard repairs to flexible cables, replacement of fuses with
                non-standard items, bypassing of manufacturer-fitted protective devices, or
                modification to plugs or connectors that defeats the protective measure of the
                equipment, shall be failed at the formal visual inspection and shall not be returned
                to service until rectified by a competent person.
              </>
            }
            meaning="The CoP catches all of these under one clause: any modification that defeats a manufacturer- or standards-fitted safety feature is failed at inspection. Rectification by a competent person is the only path back to service."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The “do not test, fail it” rule</ContentEyebrow>

          <ConceptBlock
            title="Why electrical testing is not a way out for failed items"
            plainEnglish="The IET CoP frames electrical testing as verification of a passable item, not as a rescue tool for a failed one. If the visual inspection has shown that the equipment is not safe, putting it on the tester does not make it safe — it just adds a measurement to the record."
            onSite="If you would not plug the appliance into a normal socket and use it, you do not plug it into the tester."
          >
            <p>Why the rule exists:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Safety of the inspector.</strong> A failed appliance can have an internal
                fault that the tester cannot see — and which the test sequence may bring out under
                the test voltage / current.
              </li>
              <li>
                <strong>Safety of the test instrument.</strong> Foil-substituted fuses, melted
                connectors, exposed conductors — all can produce currents the PA tester is not
                designed for.
              </li>
              <li>
                <strong>Integrity of the record.</strong> A “tested OK” record on an item with a
                visible fail at the visual stage misleads the next inspector and the duty-holder.
                Far better to record the visual fail and the action.
              </li>
              <li>
                <strong>Speed.</strong> Time spent testing a failed item is time not spent on the
                rest of the inventory. The CoP&rsquo;s position is pragmatic as well as principled.
              </li>
            </ul>
            <p>
              The defects that trigger the rule include all of those covered in this section —
              outer-sheath damage exposing cores, cracked plug bodies, damaged cord grips, signs of
              overheating, unauthorised modifications, wrong-rating or substituted fuses. They are
              also the defects covered in Section 1 (cable / plug damage) and Section 2 (rewiring /
              fuse). The visual inspection is the gate.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSG107 — Maintaining portable electrical equipment (HSE, 4th Edition 2013, reissued)"
            clause={
              <>
                Equipment that fails the formal visual inspection should be removed from service
                immediately and should not be subjected to combined inspection and testing until it
                has been repaired and the visual inspection passed. The maintenance regime should
                ensure that information about defects found is fed back to the duty-holder so that
                broader patterns — such as a particular department or a particular type of equipment
                showing repeated defects — can be addressed by management action rather than by the
                inspection regime alone.
              </>
            }
            meaning="HSG107 endorses the CoP rule and adds the management-feedback dimension: a single failed appliance is a remediation; a pattern of failed appliances is a duty-holder issue that the inspection register must surface."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Reading both ends — the matching-side rule</ContentEyebrow>

          <ConceptBlock
            title="Heat damage is rarely one-sided"
            plainEnglish="A pin and a socket contact form a single electrical joint. If that joint has been hot, both pieces of metal share the heat history. The plug shows the visible damage first because moulded plastic discolours sooner than ceramic / phenolic socket bases — but the socket is part of the same fault."
          >
            <p>The matching-side checks:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>BS 1363 plug shows heat damage</strong> → flag the matching socket for
                fixed-wiring inspection. Record on the PAT register that the socket was the
                suspected co-cause and which socket / room.
              </li>
              <li>
                <strong>IEC connector shows heat damage at the lead end</strong> → inspect the
                appliance inlet (the male side on the appliance). If it shows the same softening /
                scorching, the appliance fails too.
              </li>
              <li>
                <strong>IEC inlet on appliance shows heat damage</strong> → fail the appliance. The
                lead may also need replacing, but the heat source is inside the equipment — refer
                for engineering inspection.
              </li>
              <li>
                <strong>Junction-box / fused connection unit serving an appliance</strong> shows
                heat damage → fixed-wiring inspection territory; out of scope for the PAT inspector
                but flagged on the register and reported to the duty-holder.
              </li>
            </ul>
          </ConceptBlock>

          {/* Heat damage / cause-and-effect diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Heat damage — what it tells you about where the fault is
            </h4>
            <svg
              viewBox="0 0 800 360"
              className="w-full h-auto"
              role="img"
              aria-label="Diagram showing three heat damage scenarios: discolouration on the plug body (which means high-resistance pin contact and the matching socket should also be inspected), softening on the cord-end IEC connector (which means high-resistance lead contact and the matching appliance inlet should be inspected), and scorching at the appliance inlet (which means an internal fault in the appliance and the appliance is failed for engineering inspection)."
            >
              {/* Three column scenarios */}
              <rect
                x="30"
                y="30"
                width="240"
                height="280"
                rx="10"
                fill="rgba(239,68,68,0.06)"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth="1.4"
              />
              <text
                x="150"
                y="56"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                Plug body discolouration
              </text>
              <rect
                x="60"
                y="76"
                width="180"
                height="90"
                rx="8"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.2"
              />
              <circle
                cx="150"
                cy="120"
                r="14"
                fill="rgba(120,53,15,0.6)"
                stroke="#EF4444"
                strokeWidth="1.4"
              />
              <text
                x="150"
                y="125"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                L
              </text>
              <text x="150" y="156" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                brown ring around L pin
              </text>
              <text
                x="150"
                y="186"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                → high-R pin contact
              </text>
              <text x="150" y="208" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Action: replace plug
              </text>
              <text x="150" y="226" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Flag: matching socket
              </text>
              <text x="150" y="244" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Refer: fixed-wiring
              </text>
              <text x="150" y="262" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                inspector
              </text>

              <rect
                x="280"
                y="30"
                width="240"
                height="280"
                rx="10"
                fill="rgba(239,68,68,0.06)"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth="1.4"
              />
              <text
                x="400"
                y="56"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                IEC connector softened
              </text>
              <rect
                x="310"
                y="76"
                width="180"
                height="90"
                rx="8"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.2"
              />
              <path
                d="M340,110 Q400,100 460,110 L460,140 Q400,150 340,140 Z"
                fill="rgba(120,53,15,0.4)"
                stroke="#EF4444"
                strokeWidth="1.2"
              />
              <text x="400" y="156" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                softened L-side body
              </text>
              <text
                x="400"
                y="186"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                → high-R lead contact
              </text>
              <text x="400" y="208" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Action: replace lead
              </text>
              <text x="400" y="226" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Inspect: appliance inlet
              </text>
              <text x="400" y="244" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                If inlet damaged →
              </text>
              <text x="400" y="262" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                appliance also fails
              </text>

              <rect
                x="530"
                y="30"
                width="240"
                height="280"
                rx="10"
                fill="rgba(239,68,68,0.10)"
                stroke="#EF4444"
                strokeWidth="1.6"
              />
              <text
                x="650"
                y="56"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                Inlet scorched / charred
              </text>
              <rect
                x="560"
                y="76"
                width="180"
                height="90"
                rx="8"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.2"
              />
              <rect
                x="600"
                y="100"
                width="100"
                height="40"
                rx="4"
                fill="rgba(0,0,0,0.7)"
                stroke="#EF4444"
                strokeWidth="1.4"
              />
              <text
                x="650"
                y="124"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                ⚠ scorched
              </text>
              <text x="650" y="156" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                black/brown burn pattern
              </text>
              <text
                x="650"
                y="186"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                → INTERNAL fault
              </text>
              <text x="650" y="208" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Action: FAIL appliance
              </text>
              <text x="650" y="226" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Quarantine; refer for
              </text>
              <text x="650" y="244" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                engineering inspection.
              </text>
              <text x="650" y="262" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Do not test electrically.
              </text>

              {/* Bottom rule */}
              <rect
                x="30"
                y="324"
                width="740"
                height="30"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text
                x="400"
                y="343"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Heat damage is shared between both contact halves. Inspect both ends. “Do not test,
                fail it.”
              </text>
            </svg>
          </div>

          <Scenario
            title="A bench-top extension reel that shut down at high load"
            situation="A 10 m cable reel in a workshop has tripped repeatedly when used at high load with the cable still partly coiled. The user has opened the reel, removed the in-built thermal cut-out, and bridged its terminals with a wire link. The reel now ‘works’ at full load with the cable coiled. The flex itself is intact."
            whatToDo="Fail at inspection. Quarantine the reel. Bypassing a manufacturer-fitted thermal cut-out is unauthorised modification and removes a safety function — partly-unwound cable reels need de-rating because the coil acts as an inductor and heats. The reel either goes back to the manufacturer for repair to original specification or is permanently retired."
            whyItMatters="The user’s ‘fix’ removed the protection that was keeping the reel safe at high load on a coiled drum. The next high-load use will heat the coil to insulation breakdown — fire risk. The CoP fail-and-quarantine response is the only correct action; PAT-testing the reel as if it were unmodified would be dishonest."
          />

          <SectionRule />

          <ContentEyebrow>Recording the fail and feeding it back</ContentEyebrow>

          <ConceptBlock
            title="What goes on the PAT register when an item fails the visual inspection"
            plainEnglish="A visual fail is recorded with the same rigour as a passing test. The defect is described, the action taken is recorded, and the duty-holder is informed. HSG107 emphasises that the register is a tool for management as well as for the next inspector."
          >
            <p>The minimum data set for a visual fail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Equipment identifier and location.</li>
              <li>Date of inspection and inspector name / ID.</li>
              <li>
                Description of the defect — not just a code. &ldquo;Discolouration on plug body
                around L pin&rdquo; is more useful than &ldquo;visual fail&rdquo;.
              </li>
              <li>
                Suspected cause — high-resistance pin contact, internal fault, environmental
                over-temperature, unauthorised modification.
              </li>
              <li>
                Action taken — quarantined, replaced, repaired and re-inspected, sent for
                engineering inspection.
              </li>
              <li>
                Matching-side observation — was the socket / inlet inspected, what was found, was
                fixed-wiring inspection requested.
              </li>
              <li>
                Duty-holder notification — who was told and when. For unauthorised modifications,
                this is mandatory feedback so management can address the source.
              </li>
            </ul>
            <p>
              Patterns matter. Three plugs from the same department all showing the same heat damage
              is a workplace problem, not three separate appliances. The register is the tool that
              surfaces patterns; the PAT inspector&rsquo;s diligent recording is what makes that
              surfacing possible.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Heat damage to plastic goes through stages: discolouration → softening → melting → scorching. Each stage is an inspection fail.',
              'The most common cause of heat damage is a high-resistance contact at a pin, an IEC connector, or a flex termination. The current heats the contact, the contact oxidises, and the cycle accelerates.',
              'Heat damage is shared between both halves of a connection. When you fail a plug for heat damage, flag the matching socket for fixed-wiring inspection.',
              'Scorching at the appliance inlet means the appliance fails — not just the lead. Refer for engineering inspection.',
              'PVC flex hardens, cracks and crumbles when held above its rated temperature. Replace with appropriate heat-resisting flex on heating appliances.',
              'Unauthorised modifications — foil fuses, bypassed cut-outs, removed earth pins, twisted-and-taped joins, filed pins — are failed at inspection. Several are immediate safety quarantines.',
              '“Do not test, fail it” — visible safety-compromising defects stop the test sequence. Electrical testing is for verifying passable items, not rescuing failed ones.',
              'Record the fail with description and action on the PAT register. Patterns of failures across a department are a duty-holder issue, not just inspection cycles.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'How can I tell discolouration from a manufacturing colour difference?',
                answer:
                  'Compare to a clean reference plug from the same manufacturer. Manufacturing colour is uniform across the body; heat discolouration is localised to the area around a pin or contact and is usually circular / oval rather than uniform. If in doubt, fail conservatively — IET CoP s.15.6 puts the inspector’s judgement first and the cost of a replacement plug is trivial.',
              },
              {
                question:
                  'A plug body has been black from new (some manufacturers do this). How do I detect heat damage?',
                answer:
                  'Look for changes in surface texture rather than colour. Heat-damaged plastic has a slightly matted / chalky surface near the affected pin, where the original surface was smooth and glossy. You can also feel softening — gentle pressure with a fingernail near the pin will sometimes deform the surface where the body has been hot.',
              },
              {
                question:
                  'I cannot inspect the matching socket because it is in a sealed building location. What do I do?',
                answer:
                  'Record on the PAT register that the matching socket was inaccessible during the inspection and flag it for the next fixed-wiring (EICR) cycle. The duty-holder is informed so they can arrange access. The PAT inspector’s scope ends at the plug; the duty-holder’s scope covers the fixed wiring.',
              },
              {
                question:
                  'Can a load test reveal a high-resistance contact that the visual inspection missed?',
                answer:
                  'Sometimes. Some PA testers measure earth-leakage current and load current under nameplate load — a high-resistance L pin contact will show as elevated heating in the plug during the load test. But the load test is not a substitute for the visual inspection: by the time a load test reveals a contact issue, the visual inspection should already have failed the part on discolouration. The load test is a useful confirmation, not a replacement.',
              },
              {
                question:
                  'A cable reel has the manufacturer’s thermal cut-out intact but the user keeps the cable fully coiled at high load. CoP position?',
                answer:
                  'The reel passes the modification check (the safety device is intact). The user behaviour is a separate issue — coiled cable at high load over-heats; the cut-out should operate to protect it. The PAT inspector flags this as user-training feedback to the duty-holder. If the reel has been operating its cut-out repeatedly, the flex inside the coil may have heat damage; cycle through the inspection again accordingly.',
              },
              {
                question:
                  'A user has marked a flex with electrical tape “to identify it”. Is that an unauthorised modification?',
                answer:
                  'No, marking tape on a sound flex is not modification. It is a label. The CoP cares about modifications that defeat protective functions — tape that covers nothing structural or electrical does not do that. The exception: if the tape is hiding damage (the typical reason a user adds tape), the inspector inspects under the tape. Tape over damaged sheath is failed.',
              },
              {
                question:
                  'A plug has been swapped from another appliance — same manufacturer, same model. CoP position?',
                answer:
                  'Provided the plug is compliant with BS 1363, the fuse is correct for the flex, the cord grip is on the outer sheath, and the inspector’s formal visual inspection passes the result, the swap is acceptable. The CoP does not require plugs to be original to the appliance — only that the assembly is to standard. Record the swap on the register so the audit trail is intact.',
              },
              {
                question:
                  'How do I describe a defect on the register so it is useful to the next inspector?',
                answer:
                  'Be specific. “Brown discolouration ring on plug body around L pin, ~5 mm wide; no visible scorching; pins clean” is far more useful than “heat damage”. Include the location of the defect, its size, and what was not affected as well as what was. The next inspector wants to know whether the same item has the same defect again, which means knowing exactly what was found.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Signs of overheating or modification — PAT M3.3" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-3-section-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.4 Environmental considerations
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

export default PATTestingModule3Section3;
