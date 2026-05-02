/**
 * Module 4 · Section 3 · Subsection 5 — Earth Fault Protection
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   RCD types AC / A / F / B, Type S time-delayed selectivity, BS 7671 Regulation 411
 *   automatic disconnection in TN / TT systems, Regulation 415 additional protection
 *   (≤30mA), RA × IΔn ≤ 50V for TT systems and Type B requirement for EV charging.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
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

const TITLE = 'Earth Fault Protection - HNC Module 4 Section 3.5';
const DESCRIPTION =
  'Master earth fault protection for building services: RCDs (Type AC/A/F/B), time-delayed RCDs, TN/TT system requirements, Zs verification, and additional protection requirements.';

const quickCheckQuestions = [
  {
    id: 'rcd-types',
    question: 'Which RCD type is required for circuits supplying variable speed drives?',
    options: ['Type AC', 'Type A', 'Type F', 'Type B'],
    correctIndex: 2,
    explanation:
      'Type F RCDs are designed for circuits with variable speed drives (VSDs). They detect composite waveforms that include high-frequency components, which Type AC and Type A may not sense correctly.',
  },
  {
    id: 'additional-protection',
    question: 'According to BS 7671, what is the maximum RCD rating for additional protection?',
    options: ['10mA', '30mA', '100mA', '300mA'],
    correctIndex: 1,
    explanation:
      'Regulation 415.1 requires RCDs with IΔn ≤ 30mA for additional protection against electric shock. This applies to socket outlets ≤32A, mobile equipment outdoors, and cables in walls without protection.',
  },
  {
    id: 'tt-system-rcd',
    question: 'In a TT system, why are RCDs essential for earth fault protection?',
    options: [
      'Lower installation cost',
      'Higher fault currents',
      'High earth electrode resistance limits fault current',
      'They are not essential',
    ],
    correctIndex: 2,
    explanation:
      'TT systems have high earth fault loop impedance due to earth electrode resistance. Fault currents may be too low to operate overcurrent devices quickly enough. RCDs detect the imbalance and trip regardless of fault current magnitude.',
  },
  {
    id: 'time-delayed-rcd',
    question: 'What is the purpose of a time-delayed (Type S) RCD?',
    options: [
      'Faster operation',
      'To allow discrimination with downstream RCDs',
      'Higher sensitivity',
      'To reduce nuisance tripping from surges',
    ],
    correctIndex: 1,
    explanation:
      'Time-delayed (selective) RCDs have an intentional delay (typically 150-500ms) to allow downstream instantaneous RCDs to operate first, achieving discrimination in the earth fault protection system.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does a Type AC RCD detect?',
    options: [
      'AC residual currents only (sinusoidal)',
      'AC and pulsating DC residual currents',
      'Smooth DC residual currents',
      'High-frequency residual currents',
    ],
    correctAnswer: 0,
    explanation:
      'Type AC RCDs only detect sinusoidal AC residual currents. They may not operate correctly with DC components, making them unsuitable for circuits with electronic equipment that can produce pulsating DC faults.',
  },
  {
    id: 2,
    question:
      'According to BS 7671, RCDs for socket outlets rated up to 20A in domestic premises must have:',
    options: ['IΔn ≤ 100mA', 'IΔn ≤ 30mA', 'IΔn ≤ 10mA', 'No RCD requirement'],
    correctAnswer: 1,
    explanation:
      'Regulation 411.3.3 requires additional protection by RCDs with IΔn ≤ 30mA for socket-outlets with rated current ≤ 32A intended for general use. This provides protection against direct contact in case of basic protection failure.',
  },
  {
    id: 3,
    question:
      'In a TN-S system, what is the maximum Zs for a 32A Type B MCB with 0.4s disconnection?',
    options: ['0.72Ω', '1.15Ω', '1.37Ω (A4:2026)', '1.44Ω (pre-A4)'],
    correctAnswer: 2,
    explanation:
      'BS 7671:2018+A4:2026 Table 41.3 gives 1.37Ω for B32 at 230V — the older 1.44Ω figure is the pre-A4 value before Cmin = 0.95 was applied to U0. Use 1.37Ω on current designs and verification.',
  },
  {
    id: 4,
    question: 'For TT systems, the product RA × IΔn must not exceed:',
    options: ['25V', '50V', '120V', '230V'],
    correctAnswer: 1,
    explanation:
      'Regulation 411.5.3 requires RA × IΔn ≤ 50V in TT systems, where RA is the sum of earth electrode and protective conductor resistances. This limits touch voltage during an earth fault.',
  },
  {
    id: 5,
    question:
      'Under BS 7671:2018+A4:2026, what is the maximum operating time for a general 30mA RCD at the AC test current of IΔn?',
    options: ['40ms', '130ms', '300ms', '500ms'],
    correctAnswer: 2,
    explanation:
      'A4:2026 redrafted Reg 643.3 and deleted Table 3A — the verification test is now a single AC test at rated residual operating current (IΔn), with a 300ms maximum operating time for a general (instantaneous) RCD. The older 5×IΔn test (which had a 40ms limit) is no longer required for compliance.',
  },
  {
    id: 6,
    question: 'Type A RCDs detect:',
    options: ['AC only', 'AC and pulsating DC', 'Smooth DC only', 'High-frequency only'],
    correctAnswer: 1,
    explanation:
      "Type A RCDs detect sinusoidal AC and pulsating DC residual currents. They're suitable for most modern electronic equipment which may produce pulsating DC earth faults through rectifier circuits.",
  },
  {
    id: 7,
    question: 'What is the minimum operating time for a time-delayed (Type S) RCD at IΔn?',
    options: ['40ms', '130ms', '300ms', '500ms'],
    correctAnswer: 1,
    explanation:
      "Type S (selective) RCDs have a minimum non-operating time of 130ms at IΔn, ensuring they don't operate before downstream instantaneous RCDs. Maximum operating time is typically 500ms at IΔn.",
  },
  {
    id: 8,
    question: 'When is a 300mA RCD typically used instead of 30mA?',
    options: [
      'Socket outlet protection',
      'Fire protection for fixed equipment',
      'Bathroom circuits',
      'Outdoor equipment',
    ],
    correctAnswer: 1,
    explanation:
      "300mA RCDs provide fire protection by detecting earth fault currents before they generate enough heat to cause a fire. They're used for fixed equipment where 30mA additional protection isn't required.",
  },
  {
    id: 9,
    question: 'What is the Zs limit for a circuit protected by a 30mA RCD in a TT system?',
    options: [
      "Zs doesn't apply with RCDs",
      'RA ≤ 1667Ω (50V ÷ 30mA)',
      'Same as TN system',
      'RA ≤ 200Ω',
    ],
    correctAnswer: 1,
    explanation:
      'For TT systems with 30mA RCD: RA × IΔn ≤ 50V, so RA ≤ 50V ÷ 0.03A = 1667Ω maximum. This high limit is achievable with modest earth electrodes, which is why RCDs are essential for TT systems.',
  },
  {
    id: 10,
    question: 'Which RCD type is required for EV charging circuits according to BS 7671?',
    options: [
      'Type AC',
      'Type A',
      'Type B or Type A with additional DC protection',
      'Any type is acceptable',
    ],
    correctAnswer: 2,
    explanation:
      'EV chargers can produce smooth DC fault currents that Type AC and Type A cannot detect. BS 7671 requires Type B RCD or Type A with additional DC protection (6mA DC detection) for EV charging points.',
  },
];

const faqs = [
  {
    question: "What's the difference between additional protection and fault protection?",
    answer:
      "Fault protection (automatic disconnection) operates when insulation fails and an earth fault occurs - it's the safety net when basic protection fails. Additional protection (30mA RCD) provides an extra layer that operates quickly enough to prevent fibrillation if someone touches a live part directly - it compensates for carelessness or damage to basic protection. Both are required for most final circuits.",
  },
  {
    question: 'When can RCDs be omitted for socket outlets?',
    answer:
      "BS 7671 Regulation 411.3.3 Exception allows omission of 30mA RCD protection for socket outlets in commercial/industrial premises where: the socket is for a specific item of equipment under supervision; risk assessment shows the RCD creates a greater hazard (e.g., freezers); or the outlet is labelled to indicate it's for a specific purpose only. Socket outlets in domestic premises require RCD protection without exception.",
  },
  {
    question: 'Why do some circuits experience nuisance RCD tripping?',
    answer:
      'Common causes include: cumulative earth leakage from multiple electronic devices exceeding 30mA threshold; transient surge currents during switching or lightning; faulty equipment with degraded insulation; incorrect RCD type for load (e.g., Type AC with VSD producing DC components); neutral-earth faults downstream. Solutions include distributing loads across multiple RCDs, using Type A or F devices, or investigating and fixing the underlying leakage.',
  },
  {
    question: 'How do I test RCDs on site?',
    answer:
      'Under BS 7671:2018+A4:2026 (Reg 643.3 redrafted, Table 3A deleted): use a calibrated RCD tester that applies an AC test current between line and earth at the rated residual operating current (IΔn) — regardless of RCD Type. For 30mA RCDs the maximum operating time is 300ms. Also operate the integral test button (verifies mechanical operation) and run the no-trip test at 0.5 × IΔn. For time-delayed (Type S) RCDs, verify both minimum (130ms) and maximum operating times. The older 5 × IΔn shot is no longer part of the BS 7671 verification methodology.',
  },
  {
    question: 'What is RCD discrimination and how is it achieved?',
    answer:
      'RCD discrimination ensures only the RCD nearest the fault operates. Achieved by: 1) Current discrimination - upstream RCD has higher IΔn (e.g., 100mA upstream, 30mA downstream); 2) Time discrimination - upstream RCD is time-delayed (Type S); 3) Both together for best selectivity. A 100mA Type S upstream will discriminate with 30mA instantaneous downstream at most fault levels.',
  },
  {
    question: 'Do three-phase circuits need different RCD considerations?',
    answer:
      'Yes. Three-phase RCDs must be 4-pole (3 phases + neutral all through the device). Unbalanced loads can cause standing leakage current. Earth faults on one phase affect all three phases when the RCD trips. Consider using individual single-phase RCBOs for better discrimination. Type B RCDs for three-phase motor circuits detect all fault types including DC components from VSD rectifiers.',
  },
];

const HNCModule4Section3_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3 · Subsection 5"
            title="Earth Fault Protection"
            description="RCD types, applications, and earth fault protection requirements for different earthing systems."
            tone="purple"
          />

          <TLDR
            points={[
              'BS 7671 Reg 411.3.3 (revised in A4:2026) requires 30&nbsp;mA RCD additional protection on socket-outlets ≤ 32&nbsp;A — exception for non-dwellings with documented risk assessment.',
              'BS 7671 Reg 411.3.4 (introduced in A4:2026) requires 30&nbsp;mA RCD on AC final circuits supplying luminaires within domestic (household) premises.',
              'RCD types: AC (resistive only), A (AC + pulsating DC), F (A + high freq for VSDs), B (A + smooth DC for EV chargers, PV, BMS).',
              'Test: A4:2026 revised RCD test methodology — single-shot 1×IΔn (NOT 5×IΔn as in older guidance) — verifies disconnection within 300&nbsp;ms.',
              'For TT systems: R_A × IΔn ≤ 50&nbsp;V — earth electrode resistance must be low enough that residual current trips before touch voltage exceeds 50&nbsp;V.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 411.3.3 (Additional protection by RCD on socket-outlets)"
            clause="Regulation 411.3.3 has been revised and now applies to socket-outlets with a rated current not exceeding 32 A. There is an exception to omit RCD protection where, other than for a dwelling, a documented risk assessment determines that RCD protection is not necessary."
            meaning={
              <>
                A4:2026 widened Reg 411.3.3 from 20&nbsp;A to 32&nbsp;A — the 30&nbsp;mA RCD
                additional protection requirement now bites on more circuits. The only escape
                is a documented risk assessment in non-dwellings. Reg 411.3.4, also new in
                A4:2026, additionally requires 30&nbsp;mA RCDs on AC final circuits supplying
                luminaires in domestic premises. For kitchens (multiple wet appliances) and
                bathrooms (zone restrictions), specify Type A or F RCBOs as default — Type AC
                is now obsolete in most modern installations because of the prevalence of
                pulsating-DC fault paths from electronics.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 411.3.3 and 411.3.4; BS 7671 Section 415; BS EN 61008/61009 (RCD/RCBO standards)."
          />

          <LearningOutcomes
            outcomes={[
              'Differentiate between RCD types (AC, A, F, B) and their applications',
              'Apply BS 7671 requirements for additional protection',
              'Verify earth fault protection for TN and TT systems',
              'Use time-delayed RCDs for discrimination',
              'Calculate maximum Zs and RA values for compliant installations',
              'Select appropriate RCDs for different load types',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="RCD Types and Characteristics">
            <p>
              Residual Current Devices (RCDs) detect imbalance between line and neutral currents,
              indicating current flowing to earth. Different types detect different waveforms.
            </p>
            <p>
              <strong>RCD type classification (type / detects / applications):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Type AC:</strong> sinusoidal AC only — limited, resistive loads only
              </li>
              <li>
                <strong>Type A:</strong> AC + pulsating DC — general purpose, electronics, IT
              </li>
              <li>
                <strong>Type F:</strong> Type A + high frequencies — VSDs, inverters, motor controls
              </li>
              <li>
                <strong>Type B:</strong> all types + smooth DC — EV chargers, 3-phase rectifiers
              </li>
            </ul>
            <p>
              <strong>RCD sensitivity ratings (IΔn) — high sensitivity (≤30mA):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>30mA — additional protection</li>
              <li>10mA — enhanced protection (medical)</li>
              <li>Provides shock protection</li>
            </ul>
            <p>
              <strong>Medium sensitivity (100-500mA):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>100mA — fire protection</li>
              <li>300mA — fire protection</li>
              <li>500mA — sub-main protection</li>
            </ul>
            <p>
              <strong>RCD operating times — BS 7671:2018+A4:2026 verification (test current / general instantaneous / Type S time-delayed):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>IΔn (single AC test per Reg 643.3) — ≤300ms — 130ms - 500ms</li>
              <li>0.5 × IΔn — must NOT trip (both types)</li>
            </ul>
            <p className="text-sm text-white/70">
              A4:2026 redrafted Reg 643.3 and deleted Appendix 3 Table 3A. Regardless of RCD Type,
              an AC test at IΔn is used to verify effectiveness — the older 5 × IΔn shot (≤40ms)
              is no longer part of BS 7671 verification. Manufacturer product standards
              (BS EN 61008/61009) still set the 40ms figure at 5 × IΔn for type-test purposes.
            </p>
            <p>
              <strong>Selection guide:</strong> Type A minimum for most applications. Type F for
              VSD circuits. Type B for EV charging and three-phase rectifiers.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Additional Protection (Regulation 415)">
            <p>
              Additional protection using 30mA RCDs is required as a secondary measure for certain
              circuits where there's increased risk of direct contact or where basic protection
              may be compromised.
            </p>
            <p>
              <strong>Circuits requiring 30mA RCD protection:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Socket outlets with rated current ≤32A</li>
              <li>Mobile equipment used outdoors with current ≤32A</li>
              <li>Cables installed in walls at depth &lt;50mm without mechanical protection</li>
              <li>Cables in walls/partitions containing metal parts (any depth)</li>
              <li>Circuits in locations with increased shock risk (bathrooms, etc.)</li>
            </ul>
            <p>
              <strong>BS 7671 Regulation 411.3.3 requirements (application / requirement / notes):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Domestic sockets — 30mA RCD mandatory — all socket outlets</li>
              <li>Commercial sockets ≤32A — 30mA RCD mandatory — unless specific exemption</li>
              <li>Outdoor equipment — 30mA RCD mandatory — mobile equipment ≤32A</li>
              <li>Cables in walls — 30mA RCD if shallow — &lt;50mm or metal present</li>
            </ul>
            <p>
              <strong>Exemptions from 30mA:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Specific labelled socket (supervised use)</li>
              <li>Risk assessment shows RCD creates hazard</li>
              <li>FELV circuits</li>
              <li>Certain industrial applications</li>
            </ul>
            <p>
              <strong>Common exemption examples:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Freezer circuit (labelled socket)</li>
              <li>Fire alarm supply</li>
              <li>Emergency lighting feed</li>
              <li>Medical equipment circuits</li>
            </ul>
            <p>
              <strong>Important:</strong> Additional protection is NOT a substitute for fault
              protection — both must be provided where required.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="TN and TT System Requirements">
            <p>
              Earth fault protection requirements differ significantly between TN systems (where
              the supply network provides the earth return) and TT systems (where a local earth
              electrode is used).
            </p>
            <p>
              <strong>TN system earth fault protection:</strong> In TN systems, earth fault loop
              impedance is low because the return path is through the supply neutral. Overcurrent
              devices can provide earth fault protection if Zs is low enough.
            </p>
            <p>
              <strong>Formula:</strong> Zs ≤ U<sub>o</sub> / I<sub>a</sub> — where Ia is the
              current causing automatic disconnection in required time.
            </p>
            <p>
              <strong>TN system maximum Zs values — BS 7671:2018+A4:2026 Table 41.3 (230V, 0.4s):</strong>
            </p>
            <p>
              For Type B 32A the maximum Zs is <strong>1.37Ω</strong> (the older 1.44Ω was the
              pre-A4 figure before Cmin = 0.95 was applied to U<sub>0</sub> in Reg 411.4.4).
              Read all other device ratings directly from the current Table 41.3 — A4:2026
              reduced every tabulated maximum by ~5% versus pre-A4. Do not work from memorised
              pre-A4 values on design or verification.
            </p>
            <p>
              <strong>TT system earth fault protection:</strong> In TT systems, the earth fault
              path includes the installation's earth electrode resistance (RA), which is typically
              much higher than the TN metallic path. RCDs are almost always required.
            </p>
            <p>
              <strong>Formula:</strong> R<sub>A</sub> × I<sub>Δn</sub> ≤ 50V — limits touch
              voltage on exposed-conductive-parts during a fault.
            </p>
            <p>
              <strong>TT system maximum RA values (RCD rating IΔn / maximum RA / typical use):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>30mA — 1667Ω — final circuits with additional protection</li>
              <li>100mA — 500Ω — fire protection, sub-distribution</li>
              <li>300mA — 166Ω — fire protection only</li>
              <li>500mA — 100Ω — main incomer protection</li>
            </ul>
            <p>
              <strong>Key point:</strong> TT systems require RCDs because fault currents are
              typically too low to operate overcurrent devices within required times.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Time-Delayed RCDs and Discrimination">
            <p>
              Time-delayed (selective or Type S) RCDs allow discrimination in earth fault
              protection systems by deliberately delaying operation to let downstream RCDs trip
              first.
            </p>
            <p>
              <strong>RCD discrimination methods:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Current discrimination:</strong> upstream IΔn &gt; downstream IΔn (e.g.,
                100mA vs 30mA)
              </li>
              <li>
                <strong>Time discrimination:</strong> upstream Type S (delayed) vs downstream
                instantaneous
              </li>
              <li>
                <strong>Combined:</strong> both current and time — most reliable
              </li>
            </ul>
            <p>
              <strong>Typical discrimination arrangement (level / RCD type / IΔn / time):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Main incomer — Type S (delayed) — 300mA — 300-500ms</li>
              <li>Sub-distribution — Type S (delayed) — 100mA — 150-200ms</li>
              <li>Final circuits — instantaneous — 30mA — ≤300ms @ IΔn (BS 7671 A4:2026 verification per Reg 643.3)</li>
            </ul>
            <p>
              <strong>Discrimination benefits:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Only affected circuit trips</li>
              <li>Supply maintained to other circuits</li>
              <li>Easier fault location</li>
              <li>Reduced disruption</li>
            </ul>
            <p>
              <strong>Discrimination verification:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Check time characteristics overlap</li>
              <li>Allow 50ms minimum margin</li>
              <li>Consider current ranges</li>
              <li>Test on site with calibrated tester</li>
            </ul>
            <p>
              <strong>RCBO vs split-load boards:</strong> RCBOs (combined RCD + MCB) offer better
              discrimination than split-load boards because each circuit has independent RCD
              protection. A fault on one circuit doesn't affect others. Split-load boards with
              shared RCDs will disconnect all circuits on that RCD for any single circuit fault.
            </p>
            <p>
              <strong>Design consideration:</strong> For critical installations, use individual
              RCBOs or dedicated RCDs per circuit to maximise discrimination and supply
              availability.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — TN system Zs verification:</strong> A 32A Type B MCB protects a
              circuit with measured Zs = 0.85Ω at the furthest point. Is disconnection time
              adequate?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>From BS 7671:2018+A4:2026 Table 41.3:</li>
              <li>
                32A Type B MCB max Zs = <strong>1.37Ω</strong> for 0.4s (Cmin = 0.95 applied to U<sub>0</sub>)
              </li>
              <li>Apply temperature correction:</li>
              <li>
                Design Zs = 0.85 × 1.2 = <strong>1.02Ω</strong>
              </li>
              <li>1.02Ω &lt; 1.37Ω — disconnection time adequate</li>
            </ul>
            <p>
              <strong>Example 2 — TT system RCD selection:</strong> A TT installation has earth
              electrode resistance RA = 85Ω. What RCD rating is required for fault protection?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Requirement: RA × IΔn ≤ 50V</li>
              <li>Rearranging: IΔn ≤ 50V / RA</li>
              <li>
                IΔn ≤ 50 / 85 = <strong>0.588A = 588mA</strong>
              </li>
              <li>500mA: 85 × 0.5 = 42.5V &lt; 50V — pass</li>
              <li>300mA: 85 × 0.3 = 25.5V &lt; 50V — pass</li>
              <li>100mA: 85 × 0.1 = 8.5V &lt; 50V — pass</li>
              <li>30mA: 85 × 0.03 = 2.55V &lt; 50V — pass</li>
              <li>30mA provides best protection and additional protection</li>
            </ul>
            <p>
              <strong>Example 3 — RCD type selection for VSD circuit:</strong> A 7.5kW variable
              speed drive supplies an AHU fan. What RCD type is required?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>VSD characteristics: rectifier stage produces DC components</li>
              <li>PWM output creates high-frequency components</li>
              <li>Earth faults may include smooth DC</li>
              <li>Type AC: detects AC only — not suitable</li>
              <li>Type A: AC + pulsating DC — marginal</li>
              <li>Type F: AC + pulsating DC + HF — suitable</li>
              <li>Type B: all types including smooth DC — best</li>
              <li>Select Type F minimum, Type B preferred</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>RCD selection summary:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>General circuits:</strong> Type A, 30mA
              </li>
              <li>
                <strong>VSD/inverter:</strong> Type F minimum, 30mA
              </li>
              <li>
                <strong>EV charging:</strong> Type B, or Type A + 6mA DC
              </li>
              <li>
                <strong>Fire protection:</strong> Type A, 100-300mA
              </li>
              <li>
                <strong>Discrimination:</strong> Type S (time-delayed) upstream
              </li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Additional protection: <strong>≤30mA</strong>
              </li>
              <li>
                TT requirement: <strong>RA × IΔn ≤ 50V</strong>
              </li>
              <li>
                30mA RCD max trip time at 150mA: <strong>40ms</strong>
              </li>
              <li>
                Type S minimum delay at IΔn: <strong>130ms</strong>
              </li>
              <li>
                No-trip test current: <strong>0.5 × IΔn</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Type AC for electronics</strong> — use Type A minimum
                </li>
                <li>
                  <strong>Ignoring RCD type for VSDs</strong> — need Type F or B
                </li>
                <li>
                  <strong>TT without RCD</strong> — almost always required
                </li>
                <li>
                  <strong>No discrimination planning</strong> — multiple RCDs need coordination
                </li>
              </ul>
            }
            doInstead="Specify Type A as the floor for any circuit feeding electronics, step up to Type F or Type B where VSDs / EV chargers are present, fit an RCD on every TT final circuit and verify RA × IΔn ≤ 50V, and plan RCD discrimination using Type S upstream of instantaneous downstream devices."
          />

          <SectionRule />

          <Scenario
            title="Domestic kitchen and bathroom — RCD coordination under A4:2026"
            situation={
              <>
                A new-build dwelling. Kitchen has socket-outlets serving the worktop, an
                integrated dishwasher, washing machine, induction hob and downlighters. Bathroom
                has shower, towel rail, mirror demister, fan and downlighters. The client wants
                fewer nuisance trips — one RCD covering everything has caused the whole upstairs
                to lose power on a single dishwasher fault.
              </>
            }
            whatToDo={
              <>
                Apply Reg 411.3.3 (A4:2026): 30&nbsp;mA RCD on every socket-outlet ≤ 32&nbsp;A.
                Apply Reg 411.3.4 (A4:2026): 30&nbsp;mA RCD on every AC final circuit supplying
                luminaires in the dwelling. Specify individual 30&nbsp;mA Type A RCBOs per
                circuit — not shared RCDs. This means a fault on the dishwasher trips only the
                dishwasher, not the kitchen lights or the bathroom. For the induction hob (often
                30+&nbsp;A), confirm if it&rsquo;s a 32&nbsp;A or 40&nbsp;A circuit — Reg 411.3.3
                applies up to 32&nbsp;A. Test under A4:2026 method: single-shot 1×IΔn (NOT
                5×IΔn — that was older guidance), confirm disconnection within 300&nbsp;ms.
              </>
            }
            whyItMatters={
              <>
                Sharing one RCD across multiple circuits guarantees nuisance trips and complaints.
                A4:2026 widened the 411.3.3 socket-outlet RCD requirement to 32&nbsp;A and
                introduced 411.3.4 for luminaires in dwellings — both push the design toward
                per-circuit RCBOs. Use the older 5×IΔn test method on certification and the
                EICR is technically non-compliant.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 411.3.3 (A4:2026): 30&nbsp;mA RCD additional protection on every socket-outlet ≤ 32&nbsp;A — only escape is a documented risk assessment in non-dwellings.',
              'Reg 411.3.4 (A4:2026, NEW): 30&nbsp;mA RCD additional protection on every AC final circuit supplying luminaires in domestic premises.',
              'RCD types: AC (resistive only — now largely obsolete), A (AC + pulsating DC, general purpose), F (A + high freq, for VSDs), B (A + smooth DC, for EV / PV / BMS).',
              'Per-circuit RCBOs preferred over shared RCDs — fault on one circuit trips only that circuit, no cascade nuisance.',
              'Test methodology under A4:2026: single-shot 1×IΔn (NOT 5×IΔn — that was older guidance), verifies disconnection within 300&nbsp;ms.',
              'TT systems: R_A × IΔn ≤ 50&nbsp;V — earth electrode resistance must be low enough that touch voltage stays below 50&nbsp;V.',
              'Time-delayed (S-type) RCDs at sub-main level give discrimination with downstream 30&nbsp;mA RCDs — fault stays local.',
              'Z_s_max under Table 41.3 (A4:2026): B32 = 1.37&nbsp;Ω (NOT 1.44 — older value), C32 = 0.68&nbsp;Ω, B16 = 2.73&nbsp;Ω.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section3-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Discrimination and coordination
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section3-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Arc fault detection
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section3_5;
