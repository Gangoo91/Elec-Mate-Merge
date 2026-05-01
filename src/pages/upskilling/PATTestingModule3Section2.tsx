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
    id: 'patm3-s2-fuse-pick',
    question:
      'A bench lamp is rated 60 W at 230 V and the supplied flex is 0.75 mm² 3-core. Which BS 1362 fuse should be in the BS 1363 plug?',
    options: [
      '13 A — the standard plug fuse',
      '3 A — appliance current is ~0.26 A and 0.75 mm² flex is rated around 6 A. The fuse must protect the flex; IET CoP s.15.4 / Table 15.4 sets 3 A for low-current appliances',
      '5 A — closest match to the 0.26 A appliance current',
      '13 A — fuse rating only matters for the appliance, not the flex',
    ],
    correctIndex: 1,
    explanation:
      'IET CoP Table 15.4 gives 3 A for appliances rated up to about 700 W on 230 V where the flex is small (0.75 mm² or smaller). The cardinal rule: the fuse protects the flex, not the appliance. A 13 A fuse on 0.75 mm² flex leaves the flex unprotected on overload.',
  },
  {
    id: 'patm3-s2-rewire-trigger',
    question:
      'A moulded BS 1363 plug on a kettle lead has a damaged cord grip — the outer sheath has been pulled past the strain-relief boot. The flex is otherwise undamaged. Repair, rewire, or replace?',
    options: [
      'Glue the sheath back into the boot.',
      'Cut the moulded plug off, strip back to undamaged flex, and fit a new BS 1363 rewireable plug — IET CoP recognises “convert-to-rewireable” as a permitted remediation when the moulded plug is the failed component and the flex is sound.',
      'Tape the boot.',
      'Discard the kettle.',
    ],
    correctIndex: 1,
    explanation:
      'When the failed component is the moulded plug and the flex is sound and long enough, the CoP-permitted remediation is to remove the moulded plug, cut back to undamaged sheath, and fit a compliant BS 1363 rewireable plug with the correct fuse for the flex. Re-inspect before returning to service.',
  },
  {
    id: 'patm3-s2-cable-rule',
    question: 'The “fuse must protect the cable” rule from IET CoP s.15.4 means what, exactly?',
    options: [
      'The fuse rating must be ≥ the cable rating so the fuse never blows.',
      'The fuse rating must be ≤ the current-carrying capacity of the flex, so an overload large enough to damage the flex causes the fuse to operate before the flex is damaged.',
      'The fuse rating must equal the appliance running current.',
      'The fuse rating must be the lowest available BS 1362 rating regardless.',
    ],
    correctIndex: 1,
    explanation:
      'The fuse exists to protect the flex from overload current that the flex cannot carry safely. So fuse rating ≤ flex rating is the inequality to remember. Sizing the fuse to the appliance running current alone fails on appliances with high inrush — the working rule is fuse to flex, with the appliance start current accommodated by the fuse’s I²t time-current curve.',
  },
  {
    id: 'patm3-s2-flex-size',
    question:
      'A 2 kW fan heater (~8.7 A at 230 V) comes with 1.0 mm² 3-core flex and a moulded plug fitted with a 13 A fuse. Pass or fail at inspection?',
    options: [
      'Pass — heater current is within 13 A.',
      'Fail. 1.0 mm² flex on BS 6500 / BS EN 50525 PVC ratings is typically rated around 10 A — close to the heater current with no margin. The 13 A fuse does not protect the flex on overload. A 10–13 A appliance should normally use 1.25 mm² or 1.5 mm² flex; the lead is incorrectly assembled.',
      'Pass after a successful insulation-resistance test.',
      'Pass if the heater has a thermal cut-out.',
    ],
    correctIndex: 1,
    explanation:
      'For appliances drawing close to 13 A, the flex must be rated to carry that current with margin and the fuse must protect it. 1.0 mm² flex with a 13 A fuse is the classic mis-match — technically capable in steady-state but with no overload margin. Heating appliances should be on 1.25 mm² or 1.5 mm² heat-resisting flex.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A BS 1362 fuse is fitted in a BS 1363 plug. What is its primary purpose?',
    options: [
      'To protect the appliance from supply faults',
      'To protect the flexible cord (the flex) from sustained overload current that would damage it',
      'To protect the user from electric shock',
      'To act as the appliance’s on/off switch',
    ],
    correctAnswer: 1,
    explanation:
      'BS 1362 / BS 1363 are clear that the plug fuse protects the flex from overload. Shock protection is provided by the fixed-wiring protective devices and earthing/RCDs, not the plug fuse. The fuse is sized to the flex, with the appliance start current accommodated by the fuse time-current curve.',
  },
  {
    id: 2,
    question:
      'IET CoP 5th Edition Table 15.4 gives indicative fuse ratings by appliance. Which set is the standard BS 1362 ratings used in BS 1363 plugs?',
    options: ['1 A, 2 A, 5 A, 10 A', '3 A, 5 A, 13 A', '3 A, 13 A only', '6 A, 10 A, 16 A, 20 A'],
    correctAnswer: 1,
    explanation:
      'BS 1362 cartridge fuses for use in BS 1363 plugs are made in 3 A, 5 A and 13 A as the common preferred ratings (1 A, 2 A and 7 A also exist but are rarely fitted by manufacturers). 3 A and 13 A are by far the most common; 5 A is used for some appliances such as TVs, audio kit and some small motors.',
  },
  {
    id: 3,
    question: 'IET CoP s.15.4 — “the fuse must protect the cable” — means the fuse rating must be:',
    options: [
      'Equal to the appliance rated current',
      'Equal to or greater than the cable’s current-carrying capacity',
      'Equal to or less than the cable’s current-carrying capacity, so the cable cannot be damaged by an overload before the fuse operates',
      'Set to 13 A for any appliance under 3 kW',
    ],
    correctAnswer: 2,
    explanation:
      'The fuse rating must be at most the cable rating — fuse ≤ cable. That way an overload large enough to damage the cable will trigger the fuse first. The appliance running current sets the lower bound (so the fuse does not nuisance-blow), but the upper bound is set by the flex.',
  },
  {
    id: 4,
    question:
      'A 5 m extension lead has a BS 1363 plug fitted with a 13 A fuse, 1.0 mm² 3-core flex, and a single 13 A trailing socket. Compliant?',
    options: [
      'Yes — 13 A flex, 13 A fuse, 13 A socket all match',
      'No — 1.0 mm² flex is rated below 13 A; the fuse does not protect the flex on overload. The plug fuse must be sized to the flex, or the flex up-sized to 1.25 mm² or 1.5 mm² for 13 A use',
      'Yes if used only indoors',
      'Yes if the lead is < 10 m',
    ],
    correctAnswer: 1,
    explanation:
      '1.0 mm² flex is typically rated around 10 A on BS 6500 / BS EN 50525 ratings. A 13 A fuse on a 1.0 mm² flex breaks the cable rule. Either the fuse must come down (and the trailing socket effectively de-rated, which is poor practice on a generic extension lead) or the flex must come up. Generic 13 A extension leads should be 1.25 mm² or 1.5 mm² flex.',
  },
  {
    id: 5,
    question:
      'When should a moulded BS 1363 plug be cut off and replaced with a rewireable BS 1363 plug under the IET CoP?',
    options: [
      'Whenever the inspector prefers a rewireable',
      'When the moulded plug is the failed component and the flex is sound — for example, damaged cord grip, scorched body around a pin, cracked plug body. The conversion preserves the sound flex and is a CoP-permitted remediation',
      'Never — moulded plugs cannot be replaced',
      'Only if the appliance is Class II',
    ],
    correctAnswer: 1,
    explanation:
      'IET CoP allows conversion of a moulded plug to a rewireable BS 1363 plug as a permitted remediation when the moulded plug is the failed component and the flex is otherwise sound. The new plug is fitted with the correct BS 1362 fuse for the flex and the lead is re-inspected before return to service.',
  },
  {
    id: 6,
    question:
      'A 2 kW kettle (~8.7 A at 230 V) is supplied with 1.25 mm² heat-resistant flex and a moulded plug. What BS 1362 fuse is appropriate?',
    options: [
      '3 A — minimises nuisance current',
      '5 A — middle of the range',
      '13 A — kettle current is close to 13 A and 1.25 mm² flex is rated for 13 A use; the fuse protects the flex',
      'No fuse — kettles are exempt',
    ],
    correctAnswer: 2,
    explanation:
      'IET CoP Table 15.4 puts kettles on 13 A — running current up to 13 A, supplied flex rated for 13 A, fuse rating 13 A. A 3 A or 5 A fuse would nuisance-blow on every boil cycle. The fuse-to-flex rule still holds: 1.25 mm² flex / 13 A fuse is matched.',
  },
  {
    id: 7,
    question:
      'You inspect a desk lamp with 0.5 mm² 3-core flex and a 13 A fuse fitted in the plug. The lamp is 40 W. Action?',
    options: [
      'Pass — appliance current is well below 13 A',
      'Fail / remediate. 0.5 mm² flex is typically rated below 5 A; a 13 A fuse does not protect the flex. Replace the fuse with a 3 A and re-inspect',
      'Fail and replace the lamp',
      'Pass after PAT',
    ],
    correctAnswer: 1,
    explanation:
      '0.5 mm² flex is the smallest commonly-used flex size and is rated around 3 A in many BS 6500 / BS EN 50525 tables. A 13 A fuse is far above the flex rating. Replace with a 3 A fuse and re-inspect. The remediation is in scope of the PAT inspection.',
  },
  {
    id: 8,
    question:
      'A repair has been made by twisting two flexes together inside a piece of insulation tape, between the plug and the appliance. What is the IET CoP position?',
    options: [
      'Acceptable if the insulation tape is heavy-duty',
      'Fail. Cable joints in flexes are not permitted by IET CoP s.15 — a flex must be a single continuous run from plug to appliance, or use a proper coupler. The repair is unauthorised modification (Section 3) and the lead is failed at inspection',
      'Pass after a successful insulation-resistance test',
      'Pass if the joint is staggered',
    ],
    correctAnswer: 1,
    explanation:
      'IET CoP does not permit cable joints in flexes by twisting and taping. Flex must be continuous, or use approved couplers (BS 1363 plug-and-trailing-socket, or proper 3-core couplers). Twisted-and-taped joints are unauthorised modification — failed at inspection.',
  },
  {
    id: 9,
    question:
      'An older audio amplifier has a label on the rear: “Replace fuse only with 5 A type”. The plug has a 13 A fuse fitted. Does the manufacturer’s label override the inspector’s judgement?',
    options: [
      'No — manufacturer labels are advisory',
      'Yes. IET CoP s.15.4 directs the inspector to follow the manufacturer’s instructions where a specific fuse rating is specified. Replace the 13 A with a 5 A and re-inspect. The manufacturer has sized the fuse for both the flex and any internal protection',
      'Only if the equipment is under warranty',
      'Only on Class I equipment',
    ],
    correctAnswer: 1,
    explanation:
      'Where the manufacturer specifies a fuse rating on the equipment, that rating is followed. The CoP defers to manufacturer instructions in such cases — a 13 A fuse where 5 A is specified is a fail at inspection.',
  },
  {
    id: 10,
    question:
      'You rewire a BS 1363 plug. The flex is 1.5 mm² 3-core. What conductor lengths inside the plug — L, N, E — are correct per BS 1363 construction?',
    options: [
      'All three the same length',
      'Earth shortest, line and neutral longer',
      'Earth longest, then neutral, then line shortest — so that under any flex pull, line disconnects first, neutral second, and earth is last to break',
      'Line longest (active conductor)',
    ],
    correctAnswer: 2,
    explanation:
      'BS 1363 plug construction makes the earth conductor longest inside the plug, with line shortest. Under any failure of the cord grip, line disconnects first, neutral second, and earth is the last connection to break. This is the same fail-safe principle as “first to make, last to break” on the external earth pin.',
  },
];

const PATTestingModule3Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Rewiring and correct fuse ratings | PAT Testing Module 3.2 | Elec-Mate',
    description:
      'IET CoP Ch 15 + BS 1362 + BS 1363: when rewiring is required, BS 1362 fuse rating selection per IET CoP Table 15.4, the “fuse must protect the cable” rule, and converting a failed moulded plug to a compliant rewireable.',
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
            eyebrow="PAT M3 · Section 2"
            title="Rewiring and correct fuse ratings"
            description="When rewiring is needed, how to size a BS 1362 fuse to the flex, and the cardinal rule that keeps appliance leads safe — the fuse must protect the cable."
            tone="yellow"
          />

          <TLDR
            points={[
              'The plug fuse protects the flex, not the appliance. Fuse rating ≤ flex current-carrying capacity is the inequality to remember.',
              'BS 1362 fuses for BS 1363 plugs come in 3 A, 5 A and 13 A as the common ratings. IET CoP Table 15.4 maps appliance type to fuse rating.',
              'Rewiring is required when the plug is the failed component and the flex is sound, when a non-rewireable plug needs a rating change the existing fuse cannot give, or after damage that has compromised the moulded plug.',
              'Converting a moulded plug to a BS 1363 rewireable is a permitted remediation in the IET CoP — provided the flex is undamaged and long enough to terminate cleanly.',
              'Appliance manufacturer instructions override generic guidance. A label saying “replace fuse only with 5 A” is followed; a 13 A fuse where 5 A is specified is a fail at inspection.',
              'Cable joints in flexes are not permitted. Flex is continuous from plug to appliance, or uses an approved coupler — twisted-and-taped joins are unauthorised modification.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply the IET CoP “fuse protects the cable” rule and pick the correct BS 1362 fuse rating for a given flex / appliance combination',
              'Read IET CoP Table 15.4 and use it as the working reference for plug-fuse selection',
              'Recognise when a flex is undersized for the fuse fitted (or for the appliance current) and remediate or fail',
              'Carry out a CoP-compliant rewire of a BS 1363 plug — strip lengths, conductor lengths inside the plug (earth longest), cord grip on outer sheath, fuse rating to flex',
              'Convert a failed moulded plug to a BS 1363 rewireable plug as a permitted remediation, and re-inspect before returning to service',
              'Recognise non-permitted “repairs” — twisted-and-taped flex joins, foreign-object fuse substitutes, wrong-rating fuses fitted “to stop blowing” — and fail them at inspection',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>
            The fuse-to-flex rule — what BS 1362 and BS 1363 are doing
          </ContentEyebrow>

          <ConceptBlock
            title="Why the plug fuse exists in the first place"
            plainEnglish="The 13 A socket-outlet circuit in a UK installation is protected at 32 A (ring final) or 20 A (radial). That overcurrent device protects the fixed wiring — but a flex on an appliance is much smaller than the fixed wiring and would be damaged long before a 32 A device operated. The plug fuse fills the gap: it is sized to the flex so that an overload that could damage the flex blows the fuse first."
            onSite="If you remember nothing else from this section, remember: fuse rating ≤ flex rating. The fuse is for the flex, not the appliance."
          >
            <p>
              The system is layered. The fixed-wiring protective device (Type B MCB or BS 1361 fuse)
              protects the fixed cable. The plug fuse protects the appliance flex. The appliance has
              its own internal protection — typically a thermal cut-out or an internal fuse — that
              protects the appliance itself. Each device protects what it is sized for. Mis-sizing
              the plug fuse breaks one of those layers.
            </p>
            <p>
              BS 1362 specifies the cartridge fuse used in BS 1363 plugs. The standard ratings made
              by manufacturers and stocked widely are 3 A, 5 A and 13 A. 1 A, 2 A and 7 A also exist
              but are uncommon. The fuse is a high-breaking-capacity (HBC) cartridge — it can
              interrupt fault currents far above its nameplate rating without rupturing.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice for In-service Inspection and Testing of Electrical Equipment, 5th Edition (2020), s.15.4"
            clause={
              <>
                The fuse fitted to the plug should be sized to provide overload protection to the
                flexible cable. The fuse rating should not exceed the current-carrying capacity of
                the flexible cable. Where the manufacturer of the equipment specifies a particular
                fuse rating, that rating shall be followed.
              </>
            }
            meaning="Two rules in one regulation: (1) fuse rating ≤ flex rating, always; and (2) where the manufacturer specifies a rating, that rating is followed regardless. Both are checked at the visual inspection stage."
          />

          <RegsCallout
            source="BS 1362:1973+A4:2017 — General purpose fuse links for domestic and similar purposes"
            clause={
              <>
                Fuse links shall comply with the requirements of this standard. The preferred values
                of rated current shall be 3 A, 5 A and 13 A. The fuse link shall be of the cartridge
                type, with high breaking capacity, suitable for use in 13 A plugs and connection
                units to BS 1363.
              </>
            }
            meaning="BS 1362 names 3 A, 5 A and 13 A as the preferred ratings — these are the three you actually find in stock. The HBC requirement is what allows the fuse to interrupt a real short-circuit without exploding."
          />

          <SectionRule />

          <ContentEyebrow>IET CoP Table 15.4 — the working reference</ContentEyebrow>

          <ConceptBlock
            title="How Table 15.4 maps appliance type to fuse rating"
            plainEnglish="The IET CoP gives an indicative table that ties appliance type and rated current to BS 1362 fuse rating, taking into account the flex sizes typically supplied with each appliance type. The table is indicative — the inspector’s job is to verify it against the actual flex on the appliance in front of them."
          >
            <p>The general logic of Table 15.4:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Appliance type / power</th>
                    <th className="text-center text-white/80 py-2">Approx. current</th>
                    <th className="text-center text-white/80 py-2">Typical flex</th>
                    <th className="text-center text-elec-yellow py-2">BS 1362 fuse</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      Small appliances ≤ 700 W (lamps, radios, chargers, small AV)
                    </td>
                    <td className="text-center">≤ 3 A</td>
                    <td className="text-center">0.5 / 0.75 mm²</td>
                    <td className="text-center text-elec-yellow">3 A</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      Medium appliances ~ 700–1200 W (some TVs, audio amps, small motors)
                    </td>
                    <td className="text-center">~ 3–5 A</td>
                    <td className="text-center">0.75 mm²</td>
                    <td className="text-center text-elec-yellow">5 A</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      Larger appliances &gt; 1200 W (kettles, irons, fan heaters, microwaves)
                    </td>
                    <td className="text-center">~ 5–13 A</td>
                    <td className="text-center">1.25 / 1.5 mm² heat-resisting</td>
                    <td className="text-center text-elec-yellow">13 A</td>
                  </tr>
                  <tr>
                    <td className="py-2">Manufacturer-specified rating (any class)</td>
                    <td className="text-center">per label</td>
                    <td className="text-center">per OEM</td>
                    <td className="text-center text-elec-yellow">As specified</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The table reflects the typical flex size manufacturers supply with each class of
              appliance. Where the actual flex disagrees with the typical — for example, a heater
              fitted with 1.0 mm² instead of 1.25 mm² — the inspector applies the fuse-to-flex rule
              and the result may not match the table. The flex on the appliance in front of you is
              the fact; the table is the starting point.
            </p>
          </ConceptBlock>

          {/* Fuse rating matching diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Fuse selection — match the fuse to the flex, not to the appliance
            </h4>
            <svg
              viewBox="0 0 800 380"
              className="w-full h-auto"
              role="img"
              aria-label="Three appliance examples — desk lamp on 0.75 mm flex with a 3 A fuse, audio amp on 0.75 mm flex with a 5 A fuse, and kettle on 1.25 mm flex with a 13 A fuse — each showing the BS 1362 fuse correctly sized to the flex. A bottom band states the rule: BS 1362 fuse rating must be less than or equal to the flex current-carrying capacity."
            >
              {/* Lamp / 3A */}
              <rect
                x="40"
                y="40"
                width="220"
                height="240"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.4"
              />
              <text
                x="150"
                y="62"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Desk lamp · 60 W
              </text>
              <text x="150" y="80" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                ~0.26 A · 0.75 mm² flex
              </text>
              <line
                x1="60"
                y1="100"
                x2="240"
                y2="100"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
              <text x="60" y="124" fill="rgba(255,255,255,0.7)" fontSize="10">
                Flex rating
              </text>
              <text x="240" y="124" textAnchor="end" fill="#22C55E" fontSize="10" fontWeight="bold">
                ~6 A
              </text>
              <text x="60" y="148" fill="rgba(255,255,255,0.7)" fontSize="10">
                Appliance I
              </text>
              <text x="240" y="148" textAnchor="end" fill="rgba(255,255,255,0.85)" fontSize="10">
                0.26 A
              </text>
              <rect
                x="60"
                y="180"
                width="180"
                height="46"
                rx="6"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text
                x="150"
                y="201"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="11"
                fontWeight="bold"
              >
                3 A BS 1362
              </text>
              <text x="150" y="218" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                3 A ≤ 6 A flex rating ✓
              </text>
              <text x="150" y="252" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                CoP Table 15.4
              </text>

              {/* Amp / 5A */}
              <rect
                x="290"
                y="40"
                width="220"
                height="240"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.4"
              />
              <text
                x="400"
                y="62"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Audio amp · 800 W
              </text>
              <text x="400" y="80" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                ~3.5 A · 0.75 mm² flex
              </text>
              <line
                x1="310"
                y1="100"
                x2="490"
                y2="100"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
              <text x="310" y="124" fill="rgba(255,255,255,0.7)" fontSize="10">
                Flex rating
              </text>
              <text x="490" y="124" textAnchor="end" fill="#22C55E" fontSize="10" fontWeight="bold">
                ~6 A
              </text>
              <text x="310" y="148" fill="rgba(255,255,255,0.7)" fontSize="10">
                Appliance I
              </text>
              <text x="490" y="148" textAnchor="end" fill="rgba(255,255,255,0.85)" fontSize="10">
                3.5 A
              </text>
              <rect
                x="310"
                y="180"
                width="180"
                height="46"
                rx="6"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text
                x="400"
                y="201"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="11"
                fontWeight="bold"
              >
                5 A BS 1362
              </text>
              <text x="400" y="218" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                5 A ≤ 6 A flex rating ✓
              </text>
              <text x="400" y="252" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Manufacturer label may say 5 A
              </text>

              {/* Kettle / 13A */}
              <rect
                x="540"
                y="40"
                width="220"
                height="240"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.4"
              />
              <text
                x="650"
                y="62"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Kettle · 2 kW
              </text>
              <text x="650" y="80" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                ~8.7 A · 1.25 mm² flex
              </text>
              <line
                x1="560"
                y1="100"
                x2="740"
                y2="100"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
              <text x="560" y="124" fill="rgba(255,255,255,0.7)" fontSize="10">
                Flex rating
              </text>
              <text x="740" y="124" textAnchor="end" fill="#22C55E" fontSize="10" fontWeight="bold">
                ~13 A
              </text>
              <text x="560" y="148" fill="rgba(255,255,255,0.7)" fontSize="10">
                Appliance I
              </text>
              <text x="740" y="148" textAnchor="end" fill="rgba(255,255,255,0.85)" fontSize="10">
                8.7 A
              </text>
              <rect
                x="560"
                y="180"
                width="180"
                height="46"
                rx="6"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text
                x="650"
                y="201"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="11"
                fontWeight="bold"
              >
                13 A BS 1362
              </text>
              <text x="650" y="218" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                13 A ≤ 13 A flex rating ✓
              </text>
              <text x="650" y="252" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Heat-resisting flex (HR)
              </text>

              {/* Bottom band — the rule */}
              <rect
                x="40"
                y="304"
                width="720"
                height="56"
                rx="10"
                fill="rgba(251,191,36,0.08)"
                stroke="rgba(251,191,36,0.3)"
                strokeWidth="1.2"
              />
              <text
                x="400"
                y="328"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="12"
                fontWeight="bold"
              >
                Rule: BS 1362 fuse rating ≤ flex current-carrying capacity
              </text>
              <text x="400" y="346" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Fuse protects the flex. Appliance running current sets the lower bound; flex rating
                sets the upper.
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

          <ContentEyebrow>Flex sizes — current-carrying capacity at a glance</ContentEyebrow>

          <ConceptBlock
            title="BS 6500 / BS EN 50525 typical ratings for 3-core PVC flex"
            plainEnglish="Flex current-carrying capacity depends on the cable type, the insulation, and the installation conditions. BS 6500 and the modern BS EN 50525 series cover the common UK flex types. The figures below are typical for 3-core PVC-insulated flex used at room temperature — manufacturer data sheets are the authoritative source for the actual flex on the appliance."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Flex csa</th>
                    <th className="text-center text-white/80 py-2">
                      Typical I rating (3-core PVC)
                    </th>
                    <th className="text-center text-elec-yellow py-2">Compatible BS 1362 fuse</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">0.5 mm²</td>
                    <td className="text-center">~ 3 A</td>
                    <td className="text-center text-elec-yellow">3 A only</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">0.75 mm²</td>
                    <td className="text-center">~ 6 A</td>
                    <td className="text-center text-elec-yellow">3 A or 5 A</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">1.0 mm²</td>
                    <td className="text-center">~ 10 A</td>
                    <td className="text-center text-elec-yellow">3 A, 5 A (10 A rare)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">1.25 mm² (heat-resisting)</td>
                    <td className="text-center">~ 13 A</td>
                    <td className="text-center text-elec-yellow">3 A, 5 A or 13 A</td>
                  </tr>
                  <tr>
                    <td className="py-2">1.5 mm²</td>
                    <td className="text-center">~ 16 A (de-rated to 13 A by plug)</td>
                    <td className="text-center text-elec-yellow">Up to 13 A</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              For appliances drawing close to 13 A — kettles, fan heaters, irons — heat-resisting
              flex (typically 1.25 mm² or 1.5 mm² with cross-linked or rubber insulation) is the
              norm. The combination of higher current and proximity to a heat source makes ordinary
              PVC flex unsuitable.
            </p>
          </ConceptBlock>

          <Scenario
            title="A 1 kW oil-filled radiator with mismatched flex"
            situation="A 1 kW oil-filled radiator (~4.3 A at 230 V) has been brought into a serviced office. The supplied flex is 0.5 mm² 3-core PVC and the moulded plug carries a 13 A fuse."
            whatToDo="Fail at inspection. 0.5 mm² flex is rated around 3 A — below the appliance running current and well below the 13 A fuse. Two breaches: the flex cannot carry the appliance’s steady-state current with margin, and the fuse does not protect the flex on overload. Quarantine the appliance and refer for repair / replacement; the office should not be using this radiator."
            whyItMatters="Under-rated flex on a heater is a fire risk. A 0.5 mm² flex carrying 4.3 A continuously will run hot — well above its rated temperature — and the PVC will degrade. The 13 A fuse will never operate at this current. Visual inspection caught it; electrical testing alone might not have."
          />

          <SectionRule />

          <ContentEyebrow>When rewiring is needed — and when it is not</ContentEyebrow>

          <ConceptBlock
            title="The four common rewiring triggers"
            plainEnglish="Rewiring a BS 1363 plug — fitting a new compliant rewireable plug to an existing flex — is a permitted remediation in the IET CoP for specific situations. It is not a free-for-all repair option."
            onSite="The principle is simple: rewire when the plug is the failed component and the flex is sound. Replace the lead when the flex is damaged."
          >
            <p>
              The four situations where rewiring (or fitting a new rewireable plug) is the correct
              remediation:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Damaged moulded plug, sound flex.</strong> Cracked plug body, scorched body
                around a pin, damaged cord grip, broken / missing pins. Cut the moulded plug off
                back to undamaged flex, fit a compliant BS 1363 rewireable plug with the correct BS
                1362 fuse for the flex, re-inspect.
              </li>
              <li>
                <strong>Wrong-rating fuse permanently fitted in a moulded plug.</strong> Some
                moulded plugs make fuse change easy; others do not. Where a non-changeable moulded
                plug carries the wrong rating fuse for the flex, conversion to rewireable with the
                correct fuse is the remediation.
              </li>
              <li>
                <strong>Re-termination after re-stripping.</strong> A rewireable plug with a damaged
                conductor strand at the L, N or E terminal can have the flex cut back to undamaged
                conductor and re-terminated, provided the resulting flex is still long enough for
                the appliance’s installed position.
              </li>
              <li>
                <strong>Conversion to a UK plug after import.</strong> Imported equipment fitted
                with a non-UK plug is converted to BS 1363 with the correct fuse. The existing
                non-UK plug is removed entirely (not adapted with a foreign-pattern adaptor in
                permanent service).
              </li>
            </ol>
            <p>
              Where the flex itself is damaged — outer sheath breached, conductor damaged outside
              the plug, evidence of crushing or melting — rewiring the plug does not fix the
              underlying defect. The lead is replaced.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Fitting a higher-rating fuse because the existing one keeps blowing"
            whatHappens="A 5 A fuse on an audio amp blows after a few weeks. Rather than investigating, someone fits a 13 A fuse and the problem ‘goes away’. The fuse now does not protect the 0.75 mm² flex, and the underlying fault — usually a degrading PSU drawing more current as it ages — continues unaddressed. The flex is the next thing to fail, often catastrophically."
            doInstead="A fuse that operates is doing its job. The action is to investigate why — overload, internal fault, age — not to fit a larger one. If the manufacturer label specifies 5 A, that rating stands. IET CoP s.15.4 fails the over-rated fuse at inspection."
          />

          <CommonMistake
            title="Twisted-and-taped flex joints to extend a short lead"
            whatHappens="A short kettle lead has been extended by twisting two flexes together inside a wad of insulation tape. Visually the join is hidden inside the tape; electrically the contact resistance at the join is high and rising. The join eventually heats, melts the tape, and either sets the surrounding material alight or exposes live conductors."
            doInstead="Cable joints in flexes are not permitted by the IET CoP. Replace with a single continuous flex of the correct length and size, or use an approved coupler (BS 1363 plug into BS 1363 trailing socket, or a proper 3-core inline coupler designed for the rating). Twisted-and-taped joins are unauthorised modification — failed at inspection."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Rewiring a BS 1363 plug — the procedure</ContentEyebrow>

          <ConceptBlock
            title="Step-by-step rewire to BS 1363"
            plainEnglish="A rewire is a careful sequence: cut back to undamaged flex, strip the outer sheath the right amount, strip each core to the right length, terminate at the correct terminal, fit the cord grip onto the outer sheath (not the cores), and finish with the correct BS 1362 fuse for the flex."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Isolate.</strong> Plug must be out of the socket. Confirm with the user that
                the appliance is out of service for repair.
              </li>
              <li>
                <strong>Cut back to undamaged flex.</strong> If converting from a moulded plug, cut
                cleanly through the flex above the moulded body, past any kinking or stretched
                sheath. If re-terminating a rewireable, cut back past any damaged conductor.
              </li>
              <li>
                <strong>Strip the outer sheath.</strong> Roughly the length needed to reach the
                furthest terminal (earth) plus a small allowance for the cord grip. Do not nick the
                inner cores when stripping the sheath.
              </li>
              <li>
                <strong>Cut each core to length.</strong> Earth longest, neutral mid, line shortest
                — so that under any cord-grip failure, line disconnects first, neutral second, earth
                last.
              </li>
              <li>
                <strong>Strip each core.</strong> Strip enough insulation to fully fill the terminal
                with conductor, no more. Bare conductor must not protrude beyond the terminal.
                Insulation must not be crushed under the screw.
              </li>
              <li>
                <strong>Terminate.</strong> Brown to the L terminal (right-hand side, fused side,
                with plug face down). Blue to N (left). Green-and-yellow to E (top). All strands
                under the terminal screw or pillar; no stray strands outside.
              </li>
              <li>
                <strong>Cord grip.</strong> Tighten the cord grip onto the outer sheath of the flex.
                Confirm by gentle pull — the flex must not move at the cord grip.
              </li>
              <li>
                <strong>Fuse.</strong> Fit the correct BS 1362 fuse for the flex (and per any
                manufacturer instruction). Confirm the rating is visible through the fuse window.
              </li>
              <li>
                <strong>Close and inspect.</strong> Replace the plug cover. Carry out the formal
                visual inspection again — pin condition, cord grip, sheath entry, fuse rating
                visible — before the plug is reconnected.
              </li>
              <li>
                <strong>Re-test.</strong> Continuity, insulation resistance and (where applicable)
                load tests follow per the relevant chapters of M4. The visual inspection is the
                gate; the electrical tests confirm the rewire is sound.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="BS 1363-1:2016+A1:2018 — 13 A plugs, socket-outlets, adaptors and connection units"
            clause={
              <>
                The internal length of the protective conductor in a rewireable plug shall be such
                that, if the cord anchorage fails, the protective conductor is the last conductor to
                be subjected to mechanical strain. The line and neutral conductors shall be of
                shorter length than the protective conductor. The cord anchorage shall grip the
                outer sheath of the flexible cord and shall not depend on the conductors for its
                action.
              </>
            }
            meaning="Earth longest inside the plug — codified in the standard. Cord grip on outer sheath, never on conductors. Both are checked at the visual inspection that follows the rewire."
          />

          <Scenario
            title="A moulded plug on a microwave with a damaged cord grip"
            situation="A 800 W microwave (~3.5 A at 230 V) in a small-office kitchen has a moulded BS 1363 plug. The cord grip on the plug has split and the sheath is no longer clamped — gentle pull on the flex moves the cores at the plug body. The flex itself is sound and the appliance inlet is clean."
            whatToDo="Convert to a BS 1363 rewireable plug. Cut the moulded plug off above the moulded body. Strip back to clean sheath. Fit a compliant rewireable plug — earth longest, line shortest, cord grip on outer sheath, BS 1362 fuse rating per the manufacturer label or 13 A as the default for a microwave at this power. Re-inspect, then carry out the M4 electrical test sequence before returning to service."
            whyItMatters="The conversion is in scope of the PAT remediation. The alternative — replacing the entire flex — is unnecessary because only the moulded plug failed. The CoP allows the lower-effort, lower-cost remediation when the flex is sound."
          />

          <SectionRule />

          <ContentEyebrow>Manufacturer instructions and the inspector’s judgement</ContentEyebrow>

          <ConceptBlock
            title="When the equipment label tells you the fuse rating"
            plainEnglish="Where a manufacturer specifies a fuse rating on the equipment — typically a label on the back saying ‘fuse 5 A’ or similar — that rating is followed. The manufacturer has sized the fuse considering both the flex and any internal fault behaviour."
          >
            <p>
              The IET CoP defers to manufacturer instructions where they are specific. The practical
              consequences:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                A label saying &ldquo;replace fuse only with 5 A type&rdquo; means the inspector
                does not fit a 13 A even if the flex would carry it.
              </li>
              <li>
                A label saying &ldquo;3 A&rdquo; on a small appliance with 0.75 mm² flex confirms
                the CoP Table 15.4 default and is followed.
              </li>
              <li>
                If the manufacturer label is unreadable or the equipment is unmarked, the inspector
                applies CoP Table 15.4 and the fuse-to-flex rule.
              </li>
              <li>
                If the manufacturer label gives a rating that is higher than the flex rating, that
                is a manufacturing defect on the appliance — investigate, do not blindly fit the
                higher fuse. Refer for engineering inspection if uncertain.
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

          <SectionRule />

          <ContentEyebrow>Non-rewireable plugs — when to convert</ContentEyebrow>

          <ConceptBlock
            title="Why most modern equipment is supplied with moulded plugs"
            plainEnglish="Manufacturers fit moulded plugs because they are factory-assembled to a controlled standard, eliminate user-rewire errors, and allow the plug-and-flex assembly to be tested as a unit. They are sealed — fuse change is the only normal field operation. Where the moulded plug fails or the fuse cannot be changed, conversion to a BS 1363 rewireable is the IET CoP remediation."
          >
            <p>The decision tree at inspection:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Moulded plug intact, fuse correct, flex sound</strong> → pass; no rewire
                needed.
              </li>
              <li>
                <strong>Moulded plug intact, fuse wrong rating</strong> → change the fuse if the
                plug allows; if it does not, convert to rewireable with correct fuse.
              </li>
              <li>
                <strong>Moulded plug damaged, flex sound</strong> → cut off, fit BS 1363 rewireable,
                fit correct fuse, re-inspect.
              </li>
              <li>
                <strong>Moulded plug damaged, flex damaged</strong> → replace the lead.
              </li>
              <li>
                <strong>Non-UK plug fitted (imported equipment)</strong> → convert to BS 1363 with
                correct fuse. Do not use a permanent travel adaptor.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="HSG107 — Maintaining portable electrical equipment (HSE, 4th Edition 2013, reissued)"
            clause={
              <>
                Equipment supplied with a non-UK plug should have the plug replaced with a 13 A plug
                to BS 1363 fitted with the correct rating of fuse for the equipment, or be supplied
                via an approved adaptor only for very short-term use. Permanent use of
                foreign-pattern adaptors is not recommended.
              </>
            }
            meaning="HSG107 is explicit: imported equipment used in a UK workplace gets the plug converted, not adaptered. Adaptors are short-term — for example, while a UK plug is being fitted — not a permanent solution."
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
              'BS 1362 fuse protects the flex, not the appliance. Fuse rating ≤ flex current-carrying capacity is the inequality to remember.',
              'BS 1362 ratings stocked are 3 A, 5 A and 13 A. 1 A, 2 A and 7 A exist but are uncommon.',
              'IET CoP Table 15.4 is the working reference: small ≤ 700 W → 3 A; medium 700–1200 W → 5 A; larger > 1200 W → 13 A; manufacturer label overrides.',
              '0.5 mm² flex → 3 A only. 0.75 mm² → up to 5 A. 1.0 mm² → up to 10 A. 1.25 / 1.5 mm² heat-resisting → up to 13 A.',
              'Rewire when the plug is the failed component and the flex is sound. Replace the lead when the flex is damaged.',
              'Earth longest inside the plug, line shortest. Cord grip clamps the outer sheath. Fuse rating visible and matched to the flex.',
              'Twisted-and-taped flex joints are unauthorised modification — failed at inspection. Use a continuous flex or an approved coupler.',
              'Imported equipment with non-UK plug → convert to BS 1363 with correct fuse. Permanent adaptors are not a solution.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'My PAT tester does not check the fuse rating. Why does the visual inspection?',
                answer:
                  'The PA tester checks earth continuity, insulation resistance, and (where supported) load and earth-leakage current. None of those reveal an over-rated fuse — a 13 A fuse on 0.5 mm² flex passes every electrical test until the flex actually overloads. The visual inspection is where the fuse rating is verified, against IET CoP Table 15.4 and the manufacturer label.',
              },
              {
                question: 'Can I use a 7 A fuse instead of a 5 A on an 800 W appliance?',
                answer:
                  '7 A is a recognised BS 1362 rating but is not commonly stocked. The CoP defaults to the more common ratings: 3 A, 5 A, 13 A. A 5 A fuse on an 800 W appliance with a small flex is the standard choice. If the manufacturer specifies 7 A, that rating stands; otherwise use 5 A.',
              },
              {
                question: 'Is a 13 A fuse always safe for flex sized 1.25 mm² or larger?',
                answer:
                  'Generally yes for the fuse-to-flex rule, because 1.25 mm² heat-resisting flex is rated around 13 A and 1.5 mm² is higher still. But check the manufacturer label first — some equipment specifies a lower rating because of internal protection considerations or because the flex routing is in a hot environment. Manufacturer label first; fuse-to-flex rule second.',
              },
              {
                question:
                  'A moulded plug has a fuse cover but no obvious way to change the fuse. Do I rewire?',
                answer:
                  'Most moulded BS 1363 plugs have a slide-out fuse carrier accessed via a slot or recess. Inspect carefully before deciding to convert — if the fuse is changeable, replace it with the correct rating. If the plug is genuinely sealed (some early moulded plugs are), conversion to a rewireable BS 1363 with the correct fuse is the CoP remediation.',
              },
              {
                question:
                  'I rewired a plug. Do I need to PAT-test again before returning to service?',
                answer:
                  'Yes. The CoP treats a rewire as a repair: the formal visual inspection is repeated to confirm the work, and the electrical test sequence (continuity, insulation resistance, etc.) is repeated to verify integrity. The rewire result and the post-rewire test results both go on the PAT register.',
              },
              {
                question: 'What is heat-resisting flex and when is it required?',
                answer:
                  'Heat-resisting flex (often abbreviated HR or HOFR / H05RR-F in the BS EN 50525 code) uses cross-linked or rubber insulation rated for higher continuous operating temperatures than ordinary PVC. It is required where the flex passes near a heat source — kettles, irons, fan heaters, immersion-style appliances. Standard PVC flex on a heating appliance is a defect at inspection.',
              },
              {
                question:
                  'A foreign appliance has a non-UK plug. The user has fitted a travel adaptor and the lead has been in service for months. CoP position?',
                answer:
                  'Fail at inspection. HSG107 recommends conversion to BS 1363, not permanent use of a travel adaptor. Travel adaptors are designed for short-term use and typically have no fuse — leaving the foreign appliance protected only by the fixed-wiring 32 A device, which does not protect the foreign flex. Convert to a BS 1363 plug with the correct fuse for the flex.',
              },
              {
                question: 'Can I fit a smaller fuse than CoP Table 15.4 suggests?',
                answer:
                  'Yes — the table is a maximum guideline based on typical flex sizes, not a minimum. A smaller fuse will operate sooner on overload, which is safer if the appliance does not nuisance-blow it. The constraint is the appliance start current; if a 3 A fuse is adequate for an audio amp that the table puts on 5 A and the fuse does not nuisance-blow, the smaller fuse is acceptable. Fuse must protect flex remains the rule.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Rewiring &amp; correct fuse ratings — PAT M3.2" questions={quizQuestions} />

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
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-3-section-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.3 Signs of overheating or modification
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

export default PATTestingModule3Section2;
