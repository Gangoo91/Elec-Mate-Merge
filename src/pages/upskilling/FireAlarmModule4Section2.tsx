import { ArrowLeft, ChevronLeft, ChevronRight, Battery } from 'lucide-react';
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
    id: 'fam4-s2-formula',
    question: 'Write out the BS 5839-1:2025 standby battery sizing formula in plain terms.',
    options: [
      'Cmin = T1·I1 only — standby current times standby hours, with no alarm term at all.',
      'Cmin = 1.25 × (T1·I1 + D·I2·T2), with 1.25 the ageing factor and D = 1.75 the alarm de-rating.',
      'Cmin = (T1·I1) ÷ 24 — standby capacity divided by the standby duration in hours.',
      'Cmin = D·I2 — the alarm current times the 1.75 de-rating factor only, with no duration.',
    ],
    correctIndex: 1,
    explanation:
      'The formula is one of the most often-cited BS 5839-1 calculations and one of the most often-mis-applied. The four factors — ageing, standby duration, alarm duration, alarm de-rating — each have to be present, and applied in the order shown. Skipping the 1.75 alarm de-rating is the single most common error and produces a battery that passes day-one but cannot deliver alarm current at end-of-life.',
  },
  {
    id: 'fam4-s2-standby',
    question:
      'BS 5839-1:2025 specifies the standby duration T1 as how many hours, and under what condition can it be reduced?',
    options: [
      'Always 12 hours, with no permitted reduction under any condition.',
      'Default 24 hours, reduced to 6 hours only with reliable automatic-start standby generation.',
      'Default 6 hours, increased to 24 hours where an alarm signal is received at an ARC.',
      'Default 72 hours, reduced to 24 hours where the building is staffed continuously.',
    ],
    correctIndex: 1,
    explanation:
      'The 24/6 hour split is the default mains-failure ride-through requirement. Most installations operate on the 24 h figure because automatic standby generation is uncommon outside large commercial / institutional sites. A site with a Cat 1 emergency standby generator that auto-starts on mains loss can justify 6 h, but only if the generator itself is reliable, periodically tested, and has fuel reserves to outlast the credible mains-fail event.',
  },
  {
    id: 'fam4-s2-en54-4',
    question:
      'BS 5839-1:2025 references which power supply equipment standards as acceptable for fire alarm primary / secondary power equipment?',
    options: [
      'BS EN 60204-1 only, the machinery electrical-equipment safety standard.',
      'BS EN 54-4 as the primary standard, plus BS EN 50131-6 Grade 4 (new in 2025) for transmission PSUs.',
      'BS EN 50525 only, the low-voltage energy cable construction standard.',
      'BS 7671 Section 560 only, the BS 7671 safety-services wiring rules.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 54-4 has long been the benchmark. The 2025 addition of BS EN 50131-6 Grade 4 as an acceptable alternative is recognised as one of the more practical changes in the new standard — it widens the supplier base for alarm-transmission power supplies without weakening the reliability bar.',
  },
  {
    id: 'fam4-s2-date-label',
    question:
      'BS 5839-1:2025 has formalised a long-standing custom regarding battery installation. What is now expected on every installed battery?',
    options: [
      'A serial number etched into the casing for warranty tracking.',
      'A label fixed to the battery showing its date of installation — the datum for the 4-year end-of-life replacement.',
      'A safety data sheet attached to the battery for COSHH purposes.',
      'No label is required; battery age is taken from the CIE commissioning record.',
    ],
    correctIndex: 1,
    explanation:
      'The date label is part of the maintenance audit trail. Without it, the maintainer has to guess battery age from CIE commissioning records, which may be incomplete. With it, the answer is on the battery itself — replace at four years from the date marked, sooner if periodic standby capacity tests indicate degradation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Write out the BS 5839-1:2025 standby battery sizing formula and identify each term.',
    options: [
      'Cmin = 1.25 × (T1·I1 + D·I2·T2), with 1.25 the ageing factor and D = 1.75 the alarm de-rating.',
      'Cmin = T1·I1 + I2·T2, summing standby and alarm capacity with no ageing factor or alarm de-rating.',
      'Cmin = 1.25 × T1·I1 + I2·T2, applying ageing to the standby term only and omitting the alarm de-rating.',
      'Cmin = (T1·I1 + I2·T2) × 1.75, applying a single 1.75 factor across both standby and alarm capacity.',
    ],
    correctAnswer: 0,
    explanation:
      'The formula has four engineering reasons for being structured the way it is: ageing (1.25), standby duration (T1), alarm duration (T2), and alarm de-rating (D = 1.75). Each term is independently necessary; missing any of them produces an undersized battery.',
  },
  {
    id: 2,
    question: 'The 1.25 factor in the standby battery sizing formula represents what?',
    options: [
      'A temperature-compensation factor correcting charge-voltage variation between cold and warm operation.',
      'A voltage-tolerance allowance for the spread between a fully charged and a partly discharged SLA cell.',
      'The four-year ageing factor that sizes the battery to meet the requirement at end-of-life, not when new.',
      'A general safety margin added to the calculated capacity to give the design extra design headroom.',
    ],
    correctAnswer: 2,
    explanation:
      'Sizing for end-of-life is the architectural principle. A battery that just meets the requirement when new will fail to meet it long before its replacement date. The 1.25 factor accepts the ageing reality and sizes for the worst-case (end-of-life) point.',
  },
  {
    id: 3,
    question:
      'The 1.75 de-rating factor (D) applied to the alarm portion of the formula represents what?',
    options: [
      'The high-discharge capacity loss of an SLA battery at the high sounder-load alarm current.',
      'The cable voltage drop between the battery and the most remote sounder on the alarm circuit.',
      'The charger inefficiency that must be made up when the battery recharges after an alarm event.',
      'A general safety margin added specifically to the alarm portion of the capacity calculation.',
    ],
    correctAnswer: 0,
    explanation:
      'High-current discharge characteristic is one of the SLA chemistry quirks the formula has to accommodate. The standard 20 h capacity rating does not predict the half-hour alarm discharge accurately; the 1.75 de-rating bridges the gap.',
  },
  {
    id: 4,
    question:
      'For a typical Category L2 system with standby current 200 mA and alarm current 1.6 A, calculate Cmin assuming T1 = 24 h, T2 = 0.5 h. Show the working.',
    options: [
      'Cmin = 24 × 0.2 = 4.8 Ah — standby capacity only, omitting the alarm portion and the ageing factor.',
      'Cmin = 24 × 0.2 + 1.6 × 0.5 = 5.6 Ah — standby plus alarm, with no de-rating or ageing applied.',
      'Cmin = 1.25 × (24 × 0.2 + 1.75 × 1.6 × 0.5) = 1.25 × 6.2 = 7.75 Ah, rounded up to 12 Ah.',
      'Cmin = (4.8 + 1.4) = 6.2 Ah — the bracket sum, but with the 1.25 ageing multiplier left off.',
    ],
    correctAnswer: 2,
    explanation:
      'The worked example demonstrates the practical application: write down each term, plug in the numbers, sum, multiply by 1.25, round up. Selecting the next available battery size above the calculated minimum is the correct rounding direction; rounding down breaks the formula.',
  },
  {
    id: 5,
    question:
      'BS 5839-1:2025 has relocated the detailed battery requirements to a different part of the standard. Where do they now sit?',
    options: [
      'In Annexe E, where the 2025 revision relocated the detailed sizing tables and methodology.',
      'In Annexe A, alongside the recommendations on system categories and detection area coverage.',
      'In the main body Section 1, merged with the scope, definitions and general principles clauses.',
      'Removed entirely — the 2025 revision deleted the sizing method and defers to the CIE manufacturer.',
    ],
    correctAnswer: 0,
    explanation:
      "Standards re-organisation rarely changes the engineering, but it does change where you look. The 2025 annexe placement reflects the standard's broader re-organisation; designers used to the 2017 numbering must update their reference habits.",
  },
  {
    id: 6,
    question:
      'BS 5839-1:2025 references which power supply equipment standards as acceptable for fire alarm transmission equipment?',
    options: [
      'IEC 62133 — the safety standard for secondary lithium cells used in portable equipment.',
      'BS 7671 Section 560 — the requirements for safety services, applied to the transmission PSU.',
      'BS EN 60950 — the legacy IT-equipment safety standard, applied to the transmission power supply.',
      'BS EN 54-4, or — new in 2025 — BS EN 50131-6 Grade 4, for the alarm transmission equipment PSU.',
    ],
    correctAnswer: 3,
    explanation:
      'The 2025 dual-standard recognition (BS EN 54-4 OR BS EN 50131-6 Grade 4 for transmission PSU) is one of the practical industry-friendly changes in the new standard.',
  },
  {
    id: 7,
    question:
      'A maintainer arrives at a site for the annual service and finds the SLA batteries unmarked — no installation date, no service record matching the batteries to a date. The batteries appear physically in good condition. What is the correct response?',
    options: [
      'Treat them as of unknown age and replace them with new dated batteries, updating the logbook.',
      'Run a 30-minute alarm discharge test; if they hold up, leave them and record it as proof of life.',
      'Leave them in place — physically sound batteries are serviceable until the next annual service.',
      'Leave them and re-inspect in 12 months, noting the missing date label as an observation only.',
    ],
    correctAnswer: 0,
    explanation:
      'The 2025 date-label recommendation exists precisely to prevent this situation. Where no date label exists on legacy batteries, the cautious response is replacement plus correct labelling on the new batteries. A standby capacity test can confirm degradation but not age; replacement removes the uncertainty.',
  },
  {
    id: 8,
    question:
      'Why does the formula apply the 1.25 ageing factor to BOTH the standby and the alarm portions, not just the standby portion?',
    options: [
      'Because the alarm event is short, the ageing factor is in practice only significant on the standby term.',
      'Because the standby term dominates, the 1.25 is effectively a standby-only correction outside the bracket.',
      'Because ageing-related capacity loss affects the whole battery — both standby and alarm performance decline.',
      'Because the alarm portion already carries the 1.75 de-rating, the 1.25 applies only to the alarm term.',
    ],
    correctAnswer: 2,
    explanation:
      'A common error is to apply the 1.25 only to the standby term, reasoning that the alarm event is short and ageing matters less. Wrong — at end-of-life the battery is aged for both purposes simultaneously. The bracket structure of the formula is intentional.',
  },
  {
    id: 9,
    question:
      'A Category L2 design has standby current 350 mA and alarm current 2.4 A. The CIE specifies a 24 h standby duration and the standard 0.5 h alarm duration. What is the correct Cmin and what is the next standard battery size to fit?',
    options: [
      'Cmin = 24 × 0.35 = 8.4 Ah, fit 12 Ah — sizing on the standby term alone, no alarm or ageing.',
      'Cmin = 8.4 + 2.1 = 10.5 Ah, fit 12 Ah — the bracket sum without the 1.25 ageing factor.',
      'Cmin = 13.1 Ah, fit 12 Ah — rounding the full result down to the nearest standard battery size.',
      'Cmin = 1.25 × (24 × 0.35 + 1.75 × 2.4 × 0.5) = 1.25 × 10.5 = 13.125 Ah, fit 17 Ah.',
    ],
    correctAnswer: 3,
    explanation:
      'A larger system shows the formula more visibly: I1 of 350 mA produces 8.4 Ah of standby alone, before the alarm portion or the ageing factor are added. End-of-life sizing is a meaningful constraint at this scale; 17 Ah is correct.',
  },
  {
    id: 10,
    question:
      'Why is the BS 5839-1:2025 formula calibrated to a 4-year design replacement cycle rather than a longer one (say 7-10 years)?',
    options: [
      'Because SLA float-charge life is limited — by about 4 years capacity has fallen to roughly 75-80% of nominal.',
      'Because the 4-year figure delivers a useful cost saving by triggering planned replacement on a predictable cycle.',
      'Because battery manufacturers lobbied for a shorter cycle to increase replacement sales of SLA units.',
      'Because 4 years is an arbitrary round figure chosen for ease of maintenance scheduling, not for chemistry.',
    ],
    correctAnswer: 0,
    explanation:
      'The four-year cycle is rooted in SLA chemistry behaviour under float charge in fire-alarm typical conditions. Different chemistries (LiFePO4, for example) would have different cycle lengths and the formula would not necessarily apply unchanged. The 1.25 factor and the 4-year cycle are paired engineering assumptions; if you change the chemistry, you have to change the calculation, ideally with manufacturer engineering support.',
  },
];

const FireAlarmModule4Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Secondary power and battery sizing | Fire Alarm Module 4.2 | Elec-Mate',
    description:
      'BS 5839-1:2025 Annexe E battery sizing — Cmin = 1.25 × (T1·I1 + D·I2·T2), the 4-year ageing factor, the 1.75 alarm de-rating, BS EN 54-4 and BS EN 50131-6 Grade 4 PSU references, and the 2025 battery date label.',
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
            eyebrow="Module 4 · Section 2"
            title="Secondary power and battery sizing"
            description="BS 5839-1:2025 Annexe E — the standby battery sizing formula Cmin = 1.25 × (T1·I1 + D·I2·T2), the 4-year ageing factor, the 1.75 alarm de-rating, the standby PSU standards (BS EN 54-4 and the new 2025 BS EN 50131-6 Grade 4 alternative), and the 2025 battery date label requirement."
            tone="yellow"
          />

          <TLDR
            points={[
              'Standby battery sizing formula: Cmin = 1.25 × (T1·I1 + D·I2·T2). All four terms must be present; mis-applying any one produces an undersized battery.',
              '1.25 = four-year ageing factor — books in 25% capacity loss across the design replacement cycle. Sizes for end-of-life capacity, not new.',
              'T1 = standby duration. Default 24 hours; reducible to 6 h ONLY where automatic standby generation is provided and reliable.',
              'T2 = alarm duration = 0.5 hours (30 minutes) — the standard alarm-current discharge time built into the formula.',
              'D = 1.75 de-rating factor on the alarm portion — accounts for SLA high-discharge capacity loss at sounder-load currents.',
              'I1 = standby current (CIE quiescent + interfaces); I2 = alarm current (CIE + sounders + visual alarms + interfaces in alarm).',
              'Battery requirements moved to ANNEXE E in the 2025 revision — engineering unchanged, location changed.',
              'Power supply equipment standards: BS EN 54-4 (long-standing) OR — NEW IN 2025 — BS EN 50131-6 Grade 4 acceptable for alarm transmission equipment PSU.',
              'BS 5839-1:2025 clause 16 — every installed battery should carry a permanent label showing the installation date. Datum for the 4-year replacement cycle.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Write out and apply the BS 5839-1:2025 standby battery sizing formula Cmin = 1.25 × (T1·I1 + D·I2·T2) with the correct value for each term',
              'Justify the 1.25 four-year ageing factor and the 1.75 alarm-portion de-rating in terms of SLA battery chemistry',
              'Select T1 correctly: 24 h default, 6 h only with reliable automatic standby generation; select T2 = 0.5 h',
              'Calculate Cmin for typical L2 / L3 / L4 / L5 systems and select the next-available standard battery size',
              'Reference BS EN 54-4 as the primary PSU equipment standard and BS EN 50131-6 Grade 4 as the 2025-introduced alternative for transmission PSU',
              'Apply the 2025 battery date-label recommendation and use the date as the datum for end-of-life replacement',
              'Locate the detailed battery requirements in BS 5839-1:2025 Annexe E (relocated from main body in 2017 edition)',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The standby battery formula — anatomy</ContentEyebrow>

          <ConceptBlock
            title="The four engineering reasons inside the formula"
            plainEnglish="Cmin = 1.25 × (T1·I1 + D·I2·T2) looks simple but every term in it is doing real engineering work. The formula has to size a battery that survives mains failure for the standby duration, supplies alarm current for the alarm duration, and does both at end-of-life — four years from installation — when the battery has lost capacity to ageing. Each factor in the formula handles one of those constraints."
            onSite="When you sit down to size a battery, write the formula at the top of the page first. Plug in the numbers second. The single most common error is sizing on standby alone — forgetting the alarm portion or the de-rating — and producing a battery that holds 24 hours of standby but cannot push the sounders for 30 minutes."
          >
            <p>The four terms, in order:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>1.25 — the four-year ageing factor.</strong> Sealed lead-acid (SLA)
                batteries on continuous float charge lose capacity over their service life. By the
                end of the four-year design replacement cycle, capacity has typically fallen to
                around 75-80% of nominal. The 1.25 multiplier sizes the battery so that the
                END-OF-LIFE capacity meets the requirement, not the new capacity. A battery that
                only meets the formula when new will fail to meet it long before its replacement
                date.
              </li>
              <li>
                <strong>T1·I1 — the standby capacity term.</strong> Standby current (I1) multiplied
                by standby duration (T1) gives the Ah needed to keep the system alive through mains
                failure. T1 is 24 h by default (reducible to 6 h only with reliable automatic
                standby generation). I1 is the quiescent draw of the CIE plus all always-energised
                interface devices.
              </li>
              <li>
                <strong>D·I2·T2 — the alarm capacity term.</strong> Alarm current (I2) multiplied by
                alarm duration (T2 = 0.5 h) gives the nominal Ah needed to drive the alarm event.
                The de-rating factor D = 1.75 accounts for SLA high-discharge capacity loss — the
                battery delivers substantially less than its 20 h-rated capacity when discharged at
                the high current required by a full bank of sounders.
              </li>
              <li>
                <strong>Sum and 1.25 multiplier.</strong> The standby and alarm portions are summed
                inside the bracket, then the whole sum is multiplied by 1.25 for ageing. Both
                standby AND alarm performance degrade with age; the 1.25 must be applied to both,
                which is why the brackets are around the sum.
              </li>
            </ul>
            <p>
              The result, Cmin, is the minimum required nominal battery capacity in Ah at the
              standard 20-hour discharge rate (the rate at which SLA batteries are nominally
              specified). The battery selected for fitting is the next available standard size equal
              to or greater than Cmin — rounding up only.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Annexe E (Standby battery sizing — relocated from main body)"
            clause={
              <>
                The minimum required battery capacity Cmin (Ah, at the 20 h discharge rate) for the
                standby supply of a fire detection and fire alarm system is given by:
                <br />
                <br />
                <strong>Cmin = 1.25 × (T1 × I1 + D × I2 × T2)</strong>
                <br />
                <br />
                where 1.25 is the ageing factor for a four-year design replacement cycle; T1 is the
                standby duration in hours; I1 is the standby current; T2 is the alarm duration in
                hours; I2 is the alarm current; and D = 1.75 is the de-rating factor applied to the
                alarm capacity to allow for the high-discharge capacity loss of sealed lead-acid
                batteries.
              </>
            }
            meaning="The four engineering factors are encoded in the formula. The 2025 standard has relocated this calculation to Annexe E from its previous position in the main body — designers must update their reference habits accordingly. The engineering is unchanged; only the location has changed."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Worked example — Category L2 system</ContentEyebrow>

          <ConceptBlock
            title="A typical L2 sizing calculation, step by step"
            plainEnglish="The clearest way to internalise the formula is to walk through a worked example. Take a Category L2 system in a small commercial building: a CIE drawing 200 mA quiescent, an alarm current of 1.6 A from the combined CIE + sounders + visual alarms in alarm, a standard 24 h standby duration (no auto-start generator on site), and the standard 0.5 h alarm duration. We will calculate Cmin, then select the battery to fit."
          >
            <p>The numbers:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>I1 (standby current) = 0.2 A.</strong> Sum of the CIE quiescent draw plus
                any always-energised interface devices (door-closer hold-open magnets, addressable
                loop quiescent, etc.).
              </li>
              <li>
                <strong>T1 (standby duration) = 24 h.</strong> No auto-start generator at this site;
                the default 24 h figure applies.
              </li>
              <li>
                <strong>I2 (alarm current) = 1.6 A.</strong> Sum of the CIE + all sounders + all
                visual alarms + all interfaces drawing power in alarm. This figure is taken from the
                CIE manufacturer&apos;s loading calculation worksheet and the sounder datasheets.
              </li>
              <li>
                <strong>T2 (alarm duration) = 0.5 h.</strong> Standard half-hour alarm capacity.
              </li>
              <li>
                <strong>D (alarm de-rating factor) = 1.75.</strong> Standard SLA high-discharge
                de-rating.
              </li>
              <li>
                <strong>1.25 (ageing factor).</strong> Standard four-year ageing.
              </li>
            </ul>
            <p>The calculation:</p>
            <div className="rounded-lg border border-elec-yellow/30 bg-elec-yellow/[0.04] p-4 my-3">
              <p className="text-[14px] text-white/90 font-mono">
                Cmin = 1.25 × (T1·I1 + D·I2·T2)
                <br />
                Cmin = 1.25 × (24 × 0.2 + 1.75 × 1.6 × 0.5)
                <br />
                Cmin = 1.25 × (4.8 + 1.4)
                <br />
                Cmin = 1.25 × 6.2
                <br />
                <strong>Cmin = 7.75 Ah</strong>
              </p>
            </div>
            <p>
              The minimum required capacity is 7.75 Ah. Standard SLA battery sizes available are
              typically 7 Ah, 12 Ah, 17 Ah. Selecting 7 Ah breaches the formula (under by 0.75 Ah);
              selecting 12 Ah meets the formula with modest margin. The correct selection is 12 Ah.
              On a 24 V CIE topology this is typically two 12 V 12 Ah batteries in series; on a
              dual-bank topology it might be 4 × 6 V 12 Ah batteries.
            </p>
            <p>
              The selected battery is fitted with a permanent installation-date label per BS
              5839-1:2025 clause 16, and the system logbook is updated with the install date and the
              calculated 4-year replacement target. The battery date and replacement target are also
              recorded on the design records and made available to future maintainers.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 16 (Battery installation labelling)"
            clause={
              <>
                Standby batteries should be fitted with a label showing the date of installation.
                The label may be a printed adhesive label, an engraved tag, or a permanent marker
                applied to the battery casing. The installation date is the datum for the design
                replacement cycle, and the battery should be replaced at intervals not exceeding the
                design cycle. The 2025 revision acknowledges the long-standing custom and practice
                of marking batteries with installation date and formalises it as a recommendation.
              </>
            }
            meaning="The date label is part of the maintenance audit trail. Without it, a maintainer cannot determine when replacement is due. With it, the answer is on the battery itself: replace at four years from the date marked, sooner if periodic standby capacity tests indicate accelerated degradation."
          />

          {/* Diagram — battery sizing flow */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Battery sizing — formula flow with worked example
            </h4>
            <svg
              viewBox="0 0 880 520"
              className="w-full h-auto"
              role="img"
              aria-label="Battery sizing flow diagram showing inputs (standby current I1, alarm current I2, durations T1 and T2), the standard factors (1.25 ageing, 1.75 de-rating), the formula Cmin equals 1.25 times open bracket T1 times I1 plus D times I2 times T2 close bracket, and the worked example yielding 7.75 Ah for a typical L2 system, with battery selection of next-available 12 Ah size."
            >
              {/* Inputs row */}
              <rect
                x="20"
                y="30"
                width="170"
                height="60"
                rx="8"
                fill="rgba(34,211,238,0.10)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              <text
                x="105"
                y="50"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                Standby current I1
              </text>
              <text
                x="105"
                y="68"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="13"
                fontWeight="bold"
              >
                0.2 A
              </text>
              <text x="105" y="83" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                CIE quiescent + interfaces
              </text>

              <rect
                x="210"
                y="30"
                width="170"
                height="60"
                rx="8"
                fill="rgba(34,211,238,0.10)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              <text
                x="295"
                y="50"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                Standby duration T1
              </text>
              <text
                x="295"
                y="68"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="13"
                fontWeight="bold"
              >
                24 h
              </text>
              <text x="295" y="83" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                no auto-start gen
              </text>

              <rect
                x="400"
                y="30"
                width="170"
                height="60"
                rx="8"
                fill="rgba(239,68,68,0.10)"
                stroke="#EF4444"
                strokeWidth="1.6"
              />
              <text
                x="485"
                y="50"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                Alarm current I2
              </text>
              <text
                x="485"
                y="68"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="13"
                fontWeight="bold"
              >
                1.6 A
              </text>
              <text x="485" y="83" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                CIE + sounders + VADs
              </text>

              <rect
                x="590"
                y="30"
                width="170"
                height="60"
                rx="8"
                fill="rgba(239,68,68,0.10)"
                stroke="#EF4444"
                strokeWidth="1.6"
              />
              <text
                x="675"
                y="50"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                Alarm duration T2
              </text>
              <text
                x="675"
                y="68"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="13"
                fontWeight="bold"
              >
                0.5 h
              </text>
              <text x="675" y="83" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                standard 30 min
              </text>

              {/* Factors row */}
              <rect
                x="120"
                y="125"
                width="220"
                height="60"
                rx="8"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="1.6"
              />
              <text
                x="230"
                y="146"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Ageing factor (4-year)
              </text>
              <text
                x="230"
                y="166"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="14"
                fontWeight="bold"
              >
                × 1.25
              </text>
              <text x="230" y="180" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                SLA capacity loss to end-of-life
              </text>

              <rect
                x="450"
                y="125"
                width="220"
                height="60"
                rx="8"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="1.6"
              />
              <text
                x="560"
                y="146"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Alarm de-rating D
              </text>
              <text
                x="560"
                y="166"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="14"
                fontWeight="bold"
              >
                × 1.75
              </text>
              <text x="560" y="180" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                high-discharge capacity loss
              </text>

              {/* Formula box */}
              <rect
                x="40"
                y="220"
                width="800"
                height="76"
                rx="10"
                fill="rgba(168,85,247,0.10)"
                stroke="#A855F7"
                strokeWidth="2"
              />
              <text
                x="440"
                y="246"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="12"
                fontWeight="bold"
              >
                FORMULA — BS 5839-1:2025 Annexe E
              </text>
              <text
                x="440"
                y="276"
                textAnchor="middle"
                fill="rgba(255,255,255,0.95)"
                fontSize="20"
                fontWeight="bold"
              >
                Cmin = 1.25 × (T1·I1 + D·I2·T2)
              </text>

              {/* Worked example */}
              <rect
                x="40"
                y="320"
                width="800"
                height="120"
                rx="10"
                fill="rgba(34,211,238,0.06)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              <text
                x="440"
                y="345"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="12"
                fontWeight="bold"
              >
                WORKED EXAMPLE — typical L2
              </text>
              <text
                x="440"
                y="370"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="13"
                fontFamily="ui-monospace,monospace"
              >
                Cmin = 1.25 × (24 × 0.2 + 1.75 × 1.6 × 0.5)
              </text>
              <text
                x="440"
                y="392"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="13"
                fontFamily="ui-monospace,monospace"
              >
                Cmin = 1.25 × (4.8 + 1.4)
              </text>
              <text
                x="440"
                y="414"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="13"
                fontFamily="ui-monospace,monospace"
              >
                Cmin = 1.25 × 6.2 = 7.75 Ah
              </text>

              {/* Selection */}
              <rect
                x="40"
                y="460"
                width="800"
                height="50"
                rx="10"
                fill="rgba(251,191,36,0.12)"
                stroke="#FBBF24"
                strokeWidth="1.6"
              />
              <text
                x="440"
                y="482"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="12"
                fontWeight="bold"
              >
                SELECT next available size ≥ 7.75 Ah → 12 Ah SLA pair
              </text>
              <text x="440" y="500" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Fit installation-date label per BS 5839-1:2025 clause 16 — replace at 4 years
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>The standby duration choice — 24 h or 6 h</ContentEyebrow>

          <ConceptBlock
            title="When can T1 be reduced from 24 h to 6 h"
            plainEnglish="The default standby duration is 24 hours. The intention is that even on a complete prolonged mains failure, the fire alarm continues to operate for a full day — long enough for the cause of the failure to be diagnosed and either fixed or escalated. The reduction to 6 hours is conditional: it applies only where AUTOMATIC standby generation is provided, AND that generation arrangement is itself reliable enough to be relied on within the 6 hours. Both conditions are required; either alone is not enough."
          >
            <p>What &quot;automatic standby generation&quot; means in this context:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Automatic start.</strong> The generator detects mains loss and starts itself
                without human intervention. Manual-start generators do not qualify — the standard
                cannot assume someone will be present to operate them within the 6 h window.
              </li>
              <li>
                <strong>Time to load.</strong> The generator reaches a stable supply within an
                acceptable time after mains loss — typically tens of seconds. Battery has to cover
                the gap between mains failure and generator stabilisation.
              </li>
              <li>
                <strong>Reliable.</strong> The generator is regularly maintained, periodically
                test-started under load, and has fuel reserves sufficient for the credible
                mains-fail event. A generator that is rarely tested or that has unreliable starting
                does not justify the reduction.
              </li>
              <li>
                <strong>Connected.</strong> The fire alarm primary supply is on a circuit that the
                generator powers — not on a circuit that remains de-energised when the generator is
                running.
              </li>
            </ul>
            <p>
              Where all four conditions are met, T1 = 6 h is justifiable. The battery sizing for a 6
              h system is materially smaller than the 24 h equivalent, which produces real cost
              savings and physical-space savings on large installations. The justification must be
              documented in the design records — both the standby duration choice and the evidence
              base for the generator reliability claim.
            </p>
            <p>
              Note that the 24/6 hour choice affects T1 (the standby term) only. T2 (the alarm
              duration) is fixed at 0.5 h regardless of the standby choice. Auto-start standby
              generation can shorten standby; it cannot affect the alarm-portion sizing.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Power supply equipment — the BS EN standards</ContentEyebrow>

          <ConceptBlock
            title="BS EN 54-4 and the new BS EN 50131-6 Grade 4 alternative"
            plainEnglish="The CIE incorporates a power supply unit (PSU) that takes the 230 V AC mains feed, charges the standby battery, and delivers the regulated low-voltage rails the system runs on. That PSU is itself a piece of safety-critical equipment and is built to a defined standard. BS EN 54-4 is the long-standing fire-alarm-specific PSU standard. The 2025 revision of BS 5839-1 has added a second acceptable standard — BS EN 50131-6 Grade 4 — for the specific case of alarm transmission equipment power supplies. The dual-standard recognition widens the supplier base without weakening the reliability bar."
          >
            <p>The two standards in context:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>
                  BS EN 54-4 — Fire detection and fire alarm systems: Power supply equipment.
                </strong>{' '}
                The fire-alarm-specific standard. Covers normal operation, fault tolerance, charge
                regime, monitoring, indication. Designed around the fire-alarm operating envelope:
                continuous float charge, periodic alarm discharge, long service life. The default
                reference for the CIE&apos;s integrated PSU and for any external standby PSUs
                feeding fire alarm equipment.
              </li>
              <li>
                <strong>
                  BS EN 50131-6 Grade 4 — Intruder alarm systems: Power supplies, Grade 4
                  reliability.
                </strong>{' '}
                The intruder-alarm power supply standard, at its highest grade. NEW IN 2025 as an
                acceptable standard for alarm transmission equipment PSUs. The recognition reflects
                that BS EN 50131-6 Grade 4 PSUs match the reliability characteristics required for
                fire alarm transmission, and many transmission equipment vendors have BS EN 50131-6
                product lines that can now be directly applied without separate BS EN 54-4
                certification.
              </li>
              <li>
                <strong>The scope distinction.</strong> The 2025 widening is specifically for ALARM
                TRANSMISSION equipment PSUs — not for the main CIE power supply. The CIE&apos;s
                integral PSU continues to be governed by BS EN 54-4 (or equivalent). The new
                acceptance is narrower than a blanket &quot;either standard, anywhere&quot;.
              </li>
            </ul>
            <p>
              Designers and installers should read the equipment marking to verify which standard
              the unit is built to. A BS EN 54-4-marked PSU is acceptable for fire alarm primary and
              secondary power. A BS EN 50131-6 Grade 4-marked PSU is acceptable for alarm
              transmission equipment power. Grade 1, 2 or 3 BS EN 50131-6 PSUs do NOT qualify; only
              Grade 4.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 19 / Alarm transmission power supply"
            clause={
              <>
                Where a separate power supply unit is used to power alarm transmission equipment,
                the power supply should conform to either BS EN 54-4 or BS EN 50131-6 Grade 4. The
                2025 revision recognises BS EN 50131-6 Grade 4 as an acceptable alternative to BS EN
                54-4 for this specific application, reflecting the equivalent reliability achieved
                at the highest grade of the intruder-alarm power supply standard.
              </>
            }
            meaning="The dual-standard recognition is one of the practical 2025 changes. Designers selecting a transmission PSU now have two acceptable routes; the supplier base widens; the reliability requirement is preserved at BS EN 50131-6 Grade 4 (not lower grades)."
          />

          <ConceptBlock
            title="What the PSU standards govern"
            plainEnglish="A standby PSU is not just a battery charger. It has to handle a long list of operating conditions reliably, and it has to fail in safe ways when something does go wrong. The PSU standards encode all of that into testable requirements — input voltage range, charge regime, deep-discharge protection, output regulation, fault monitoring, indication, environmental tolerance."
          >
            <p>The areas a BS EN 54-4 / BS EN 50131-6 Grade 4 PSU is tested against:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Input range.</strong> Operates correctly over a defined range of mains input
                voltage and frequency, and rides through brief mains dips without interrupting
                output.
              </li>
              <li>
                <strong>Charge regime.</strong> Supplies the SLA battery with the correct float
                voltage (typically around 13.6-13.8 V per 12 V battery, temperature-compensated),
                and limits charge current to the manufacturer-specified safe level.
              </li>
              <li>
                <strong>Battery monitoring.</strong> Continuously monitors the battery — open
                circuit, short circuit, low capacity at periodic load test. Reports faults to the
                CIE.
              </li>
              <li>
                <strong>Deep-discharge protection.</strong> When the battery falls below the
                low-voltage cutoff, the PSU disconnects the load to prevent battery damage. The
                threshold is set per chemistry / battery manufacturer.
              </li>
              <li>
                <strong>Output regulation.</strong> Maintains stable output rails through transient
                load events — sounder activation, charger inrush, mains-failure transition.
              </li>
              <li>
                <strong>Fault indication.</strong> Reports its own faults — internal supply fault,
                charger fault, battery fault, output fault — to the CIE for indication.
              </li>
              <li>
                <strong>Environmental tolerance.</strong> Operates over the temperature range
                expected in service, with humidity, vibration and other environmental constraints
                defined.
              </li>
            </ul>
            <p>
              The standards mark allows the designer to select equipment without having to test all
              of these characteristics individually — the third-party certification is the evidence
              that the equipment meets the requirements.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Battery date labelling and the 4-year cycle</ContentEyebrow>

          <ConceptBlock
            title="Why the install date is the controlling datum"
            plainEnglish="A battery does not announce its own age. Without an external record, an installer or maintainer has no way of knowing whether a battery is one year old or six. The 2025 standard formalises a long-standing custom-and-practice of marking installed batteries with their installation date — the date is then the single piece of information that lets the maintenance regime work. Replacement at four years from the date marked is the standard rule; some sites with hostile environments (high temperature, frequent discharge) replace earlier."
          >
            <p>What the date label provides:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Replacement scheduling.</strong> The maintenance team can produce a forward
                schedule of battery replacements simply by reading the install dates on each battery
                and adding 4 years. Without dates, scheduling depends on the system logbook (which
                may be missing or inconsistent).
              </li>
              <li>
                <strong>Age-related fault diagnosis.</strong> When a battery fails its standby
                capacity test at 18 months, the installer needs to know if 18 months is the issue.
                Without a date, the question is &quot;when was this fitted?&quot; — answered only by
                paperwork. With a date, the answer is on the battery.
              </li>
              <li>
                <strong>Mixed-stock identification.</strong> A site with multiple batteries may have
                units of different ages — a previously-replaced battery alongside the originals. The
                date labels distinguish them; without dates, all batteries look interchangeable.
              </li>
              <li>
                <strong>Independent verification.</strong> An auditor or fire-risk assessor can
                check battery replacement compliance directly from the batteries themselves, not
                only from documentation. The label is on-site evidence.
              </li>
            </ul>
            <p>
              The label format is not prescribed — a printed adhesive label, an engraved tag, or a
              permanent marker writing on the battery casing all work. What matters is that the date
              is permanent (will survive the four years until the battery is replaced) and legible
              (the maintainer at year 4 can read it). DD/MM/YYYY format is preferred for clarity.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 16 (Cabling, labelling and identification — battery date)"
            clause={
              <>
                Batteries should have a label fixed to them showing the date of installation. The
                standard acknowledges the long-standing custom and practice of labelling batteries
                with a permanent marker. The date marked is the datum for the design replacement
                cycle, and the replacement target should be recorded in the system logbook
                accordingly.
              </>
            }
            meaning="The date label is now a positive recommendation in the standard, not just a customary practice. The maintainer can read end-of-life directly from the battery."
          />

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

          <ContentEyebrow>Practical sizing pitfalls</ContentEyebrow>

          <Scenario
            title="The undersized standby — a Cat L3 system that fails at 14 hours"
            situation="A Category L3 system has been designed and installed in a small office building. The battery selection was based on standby alone: I1 = 0.3 A, T1 = 24 h, calculated 24 × 0.3 = 7.2 Ah, fitted 7 Ah. The alarm portion was not added; the de-rating was not applied; the ageing factor was not applied. At year 1, a mains failure occurs out of hours; the system runs for approximately 14 hours and then loses output. No alarm event occurred during the 14 h window so the consequence was limited, but the audit reveals the standby fell well short of the 24 h requirement."
            whatToDo="Re-calculate against the full BS 5839-1:2025 formula, including the alarm portion (I2·T2 with the 1.75 de-rating) and the 1.25 ageing factor. The proper Cmin for I1 = 0.3 A, I2 = 1.4 A, T1 = 24 h, T2 = 0.5 h is: 1.25 × (24 × 0.3 + 1.75 × 1.4 × 0.5) = 1.25 × (7.2 + 1.225) = 10.5 Ah. Round up to 12 Ah. The original 7 Ah is materially undersized. Replace with 12 Ah, fit installation-date labels, update logbook and design records, raise a system modification certificate."
            whyItMatters="The shortcut of 'standby only, no alarm portion' is one of the most common sizing errors and produces batteries that pass casual inspection but fail under load. The formula has four engineering reasons; skipping any of them produces a non-compliant battery. The mains-fail incident in this scenario revealed the under-sizing — the previous compliant inspections had not run a 24 h discharge to verify it. Battery sizing is a design-stage discipline, and the formula has to be applied in full."
          />

          <CommonMistake
            title="Applying the 1.25 ageing factor to the standby term only"
            whatHappens="The designer reasons: 'The alarm event is short — half an hour — so ageing barely affects it. I'll apply 1.25 to the standby term and ignore it on the alarm term.' The calculation produces Cmin = 1.25 × T1·I1 + D·I2·T2 (without the 1.25 multiplying the alarm portion). The result is materially smaller than the correct value. At end-of-life the battery may meet the standby duration but cannot deliver alarm current for the full 30 minutes; sounders trail off after 15-20 minutes and the alarm event is incomplete."
            doInstead="Apply the 1.25 to the WHOLE bracket: Cmin = 1.25 × (T1·I1 + D·I2·T2). The bracket structure of the formula is intentional — both standby and alarm performance degrade with age, and both must be sized against the aged capacity. The 1.25 sits outside the bracket; its scope is the sum, not just the standby term."
          />

          <CommonMistake
            title="Forgetting the 1.75 alarm de-rating"
            whatHappens="The designer applies the formula as Cmin = 1.25 × (T1·I1 + I2·T2), without the D = 1.75 de-rating on the alarm term. The mathematical result looks right at the 20 h discharge rate, but at the actual high-discharge currents required for sounder operation the SLA battery delivers significantly less than its nominal 20 h Ah. Day-one testing may pass; by year 2 the alarm portion is failing because the aged battery at high discharge is well below the required Ah."
            doInstead="The 1.75 alarm de-rating is not optional. It accounts for the SLA chemistry behaviour at the discharge rates encountered during alarm operation — the battery is being asked to deliver, say, 1.6 A from a nominal 12 Ah cell, which is a much more aggressive discharge than the 0.6 A nominal rate. The chemistry simply does not deliver full capacity at that rate. The 1.75 factor bridges the gap; apply it always."
          />

          <CommonMistake
            title="Mixing battery ages within one CIE"
            whatHappens="A maintainer replaces one of two SLA batteries in a CIE because that single battery has failed its capacity test. The other battery is left in place. After a few months the system starts producing battery faults intermittently. The cause: the older battery has lower internal impedance and slightly different terminal voltage, so the charger and the load see an imbalance between the cells. The newer cell is over-charged, the older cell is under-charged, both age faster, and the system reports faults."
            doInstead="Replace BATTERIES IN MATCHED PAIRS (or sets). When one battery fails, replace all batteries in that CIE's standby bank simultaneously. Fit fresh installation-date labels on all replacements; record the replacement in the logbook. The cost difference between one and two batteries is small; the reliability difference is substantial."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Cmin = 1.25 × (T1·I1 + D·I2·T2) — write the formula at the top of the page, plug in the numbers, sum, multiply by 1.25, round UP to next standard size.',
              '1.25 = four-year ageing factor — books in 25% capacity loss to end-of-life. Applies to the WHOLE bracket, not just the standby term.',
              'T1 = 24 h default. Reducible to 6 h ONLY where automatic standby generation is reliable, periodically tested, and connected to the fire alarm primary supply.',
              'T2 = 0.5 h alarm duration. Standard half-hour figure built into the formula.',
              'D = 1.75 alarm de-rating — accounts for SLA high-discharge capacity loss at sounder-load currents. Apply always; never skip.',
              'I1 = standby current = CIE quiescent + always-energised interfaces. I2 = alarm current = CIE + sounders + VADs + interfaces in alarm.',
              'Battery requirements relocated to ANNEXE E in BS 5839-1:2025. Engineering unchanged; reference location changed.',
              'PSU standards: BS EN 54-4 (long-standing) OR — NEW IN 2025 — BS EN 50131-6 Grade 4 acceptable for alarm transmission equipment.',
              'Battery date labels (BS 5839-1:2025 clause 16): permanent, legible, on every installed battery. Datum for the 4-year replacement cycle.',
              'Replace batteries in matched pairs / sets. Never mix ages within a single standby bank.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Why is the 4-year design replacement cycle the basis for the 1.25 ageing factor?',
                answer:
                  "The four-year cycle reflects the typical service life of sealed lead-acid (SLA) batteries on continuous float charge in the operating conditions found in fire alarm CIEs — moderate temperature, low discharge frequency, continuous trickle charge. By year 4, capacity has typically fallen to around 75-80% of nominal even on a battery that has not been alarm-discharged. The 1.25 multiplier (the inverse of 0.8) sizes the battery so that 80% of the new Ah equals or exceeds the requirement. Pushing replacement beyond 4 years means the formula's ageing factor no longer represents real capacity, and the battery may fail to deliver the required performance without warning.",
              },
              {
                question:
                  'I have a CIE rated for 0.5 h of alarm. Can I size T2 differently for an installation that requires longer alarm duration?',
                answer:
                  'Some installations — sites with extended evacuation times, or specific design requirements — may require alarm duration longer than the standard 0.5 h. The formula scales linearly: a longer T2 produces a proportionally larger I2·T2 term and therefore a larger Cmin. The minimum T2 = 0.5 h is the BS 5839-1 default; the design may specify longer where required by the building&apos;s evacuation strategy or by fire engineering. The formula structure is unchanged; only T2 changes.',
              },
              {
                question:
                  'The formula gives me Cmin = 7.75 Ah but the available battery sizes are 7 Ah and 12 Ah. Can I round to 7 Ah and accept a small under-size?',
                answer:
                  'No. The formula is a minimum; rounding down breaches it. Selecting 7 Ah produces an under-sized battery from day one — even before ageing or de-rating real-world variation. Round UP to 12 Ah. The formula is calibrated to be just sufficient at end-of-life with no margin; rounding down removes the small margin and produces an installation that may fail under load before the 4-year replacement is due.',
              },
              {
                question:
                  'My CIE has two parallel battery strings — does the formula apply to each string or to the total?',
                answer:
                  'The formula gives the total required capacity. If the CIE design has multiple parallel strings (some larger systems are built this way for redundancy or capacity), the total Ah of all strings must equal or exceed Cmin. Each individual string must also be sized to handle its share of the load — equipment-manufacturer-specific. Read the CIE manual for the topology rules; the BS 5839-1 formula gives the system-level total, but the per-string distribution is an equipment design decision.',
              },
              {
                question:
                  'Does the formula apply to lithium-iron-phosphate (LiFePO4) batteries instead of SLA?',
                answer:
                  'Not directly. The 1.25 ageing factor and the 1.75 de-rating are calibrated to SLA chemistry under fire-alarm-typical operating conditions. LiFePO4 has different ageing behaviour (longer service life, different float-charge characteristics) and different high-discharge characteristics (better delivery at high current). A LiFePO4 system needs the equivalent calculation done against the LiFePO4 chemistry parameters — which is typically supplied by the battery / CIE manufacturer rather than by an installer-level calculation. Apply the BS 5839-1 formula for SLA installations; for non-SLA chemistries, follow the manufacturer engineering.',
              },
              {
                question:
                  'I have an automatic standby generator on site that powers the whole building including the fire alarm. Can I use T1 = 6 h?',
                answer:
                  'Yes — provided the four conditions are met: automatic start, time-to-load within an acceptable window, reliable (regularly maintained, periodically test-started under load, fuel reserves), and connected to the fire alarm primary supply circuit. Document the justification in the design records, including the evidence base for the reliability claim. The 6 h figure produces a smaller battery and lower lifecycle cost; the conditions are non-trivial but verifiable.',
              },
              {
                question:
                  'What is the difference between BS EN 54-4 and BS EN 50131-6 Grade 4 in practical terms?',
                answer:
                  'BS EN 54-4 is the fire-alarm-specific PSU standard, calibrated to fire-alarm operating conditions (continuous float charge, periodic alarm discharge, long service life, fault reporting compatible with CIE supervision). BS EN 50131-6 Grade 4 is the highest-grade intruder-alarm PSU standard, calibrated to intruder-alarm operating conditions but at a reliability bar that matches the fire-alarm requirement for transmission equipment. The 2025 standard recognises BS EN 50131-6 Grade 4 as acceptable for alarm transmission equipment PSUs specifically — not for the main CIE PSU. Read equipment markings to verify the standard, and verify the application matches.',
              },
              {
                question:
                  'A maintenance visit finds a battery with no installation-date label. Is the system non-compliant?',
                answer:
                  'The 2025 standard recommends a date label on every installed battery. Existing installations from before the 2025 effective date have a transition period; new installations and any battery replacements are expected to apply the recommendation immediately. Where no date is present and no documentation evidences the install date, the practical response is to replace the battery (treating it as of unknown age) and fit a fresh installation-date label on the replacement. The replacement also resets the 4-year clock and restores audit-trail integrity.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Secondary power and battery sizing — Module 4.2" questions={quizQuestions} />

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
                navigate('/electrician/upskilling/fire-alarm-course/module-4/section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.3 Cable types and fire resistance
              </div>
            </button>
          </div>

          <div className="hidden">
            <Battery />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule4Section2;
