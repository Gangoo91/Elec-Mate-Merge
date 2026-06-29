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
  Pullquote,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm11s8-reg-643-redraft',
    question:
      'What did A4:2026 change in Reg 643.3 (insulation resistance test)?',
    options: [
      'It now requires every installation to be tested at 1000 V DC regardless of equipment, raising the voltage to improve fault detection on LCT circuits',
      'It clarified a 250 V DC follow-on test after equipment is connected, alongside the 500 V DC test done before connection',
      'It was deleted, so insulation resistance testing is no longer required where electronic equipment such as PV inverters or EV chargers is connected',
      'It now mandates an AC insulation resistance test in place of the DC test to avoid polarising the electronics in connected LCT equipment',
    ],
    correctIndex: 1,
    explanation:
      'A4:2026 redrafted Reg 643.3 to clarify the IR (insulation resistance) test sequence around electronics-rich equipment. Previously the regulation required a single 500 V DC IR test which could damage sensitive electronics in PV inverters, BESS, EV chargers, heat pump VSDs, etc. Redrafted approach: (1) 500 V DC IR test on the installation BEFORE equipment is connected — verifies cable + accessory insulation integrity. (2) Connect equipment. (3) 250 V DC IR test on the installation AFTER equipment connected — verifies IR remains acceptable without risking electronics damage. Both test results recorded on schedule of test. The redraft acknowledges that modern LCT installs always have electronics-rich equipment + the test sequence must accommodate. Cert evidence bundle: schedule of test records both IR readings + Reg 643.3 (A4:2026) compliance.',
  },
  {
    id: 'm11s8-rcd-test-table-3a',
    question:
      'What did A4:2026 change about RCD testing and Table 3A?',
    options: [
      'It deleted Table 3A, so a single AC test at IΔn now verifies any RCD; Type is still selected per Reg 531.3.3',
      'It expanded Table 3A with separate tripping-time columns for Type F and Type B, and testing is now done against the device-specific row',
      'It retained Table 3A but added a requirement to test every RCD at five times IΔn as well as at IΔn against smooth DC residual currents',
      'It removed the requirement to test RCDs at commissioning, replacing it with a manufacturer self-certification declaration for each device',
    ],
    correctIndex: 0,
    explanation:
      'A4:2026 deleted Table 3A (Time / current performance criteria for tests of RCDs) from Appendix 3. Under Reg 643.8 + associated Appendix 3 changes, a single alternating current test at the rated residual operating current (IΔn) is now used to verify RCD effectiveness regardless of RCD Type — a general non-delay RCD must disconnect within 300 ms at IΔn (Reg 643.8 NOTE). Practitioners should no longer rely on Table 3A for pass/fail criteria. RCD Type is still SELECTED per Reg 531.3.3: (1) Type AC — alternating sinusoidal residual. (2) Type A — AC + pulsating DC residual. (3) Type F — AC + composite + high-frequency (covers VSD-supplied loads). (4) Type B — AC + pulsating DC + smooth DC residual (covers full LCT electronics range). LCT installs often use Type B RCDs (BESS, EV chargers, heat pump VSDs may produce a smooth DC component) — but the verification test is the single AC test at IΔn. Cert evidence bundle: per-RCD test result on schedule of test, including Type identification + measured operating time at IΔn.',
  },
  {
    id: 'm11s8-evidence-bundle',
    question:
      'What goes into the M11 commissioning cert evidence bundle for an LCT install?',
    options: [
      'The EIC alone, since the schedule of inspection and schedule of test results already capture everything required for an LCT install',
      'A multi-document bundle: Part 6 test records, Chapter 81 efficiency records, SPD and LPS records, fault assessment, anti-islanding test, DoCs and the EIC',
      'The DNO connection agreement plus the inverter manufacturer DoC, which between them satisfy all BS 7671 verification requirements for the install',
      'A single combined MCS certificate that covers the design, installation and verification of every low-carbon technology on the project',
    ],
    correctIndex: 1,
    explanation:
      'M11 commissioning cert evidence bundle integrates all M11 sections: (1) Reg 643 Part 6 — schedule of inspection (Reg 643.1) + schedule of test results (Reg 643.2-643.12) including Reg 643.3 redrafted IR sequence, RCD verification by a single AC test at IΔn (Table 3A deleted), continuity, polarity, EFLI, functional. (2) Chapter 81 — per-circuit efficiency design table + EEMS configuration (Reg 825.1) + monitoring plan + payback model + customer evidence. (3) BS EN 62305 — risk assessment summary or full report + LPS records (where applicable) + separation distance calculation (Reg 712.534.101 where PV inside LPS protected volume). (4) Section 443 + 534 — SPD selection per location + Type + Uc + Up + In/Iimp + Iscc + manufacturer DoCs + Reg 443.4.1 + Reg 534.4 + Reg 712.534.102.1 compliance. (5) Multi-source fault — Reg 826.1.2.1 per-protective-device per-source-configuration assessment + OCPD selection + Reg 826.1.2.2 bidirectional + Reg 826.1.2.3 coordination + Reg 826.1.1.3 minimum earth-fault. (6) Anti-islanding — Reg 551.7.4 + Reg 551.7.5 + G98 / G99 + manufacturer DoC + commissioning test + DNO sign-off + Reg 826.1.1.5 island mode. (7) Per-LCT manufacturer DoCs + MCS handover (where applicable). (8) Final EIC + customer handover pack.',
  },
  {
    id: 'm11s8-eicr-scope',
    question:
      'What does the EICR scope for an LCT install verify in years 5-10 post-install?',
    options: [
      'Only the items recorded on the original EIC schedule of test results, repeated identically with no review of SPDs, anti-islanding or LPS records',
      'The energy performance against the Chapter 81 design only, since safety verification belongs to the original installer and is not revisited at EICR',
      'Safety against the install-date amendment plus SPD status, anti-islanding, the standard Part 6 tests and the LPS records, with EICR codes applied',
      'Full compliance with the latest amendment in force at the EICR date, coding any divergence from current standards as C2 regardless of install date',
    ],
    correctIndex: 2,
    explanation:
      'EICR scope for LCT install in years 5-10 post-install: (1) Verifies safety against install-date amendment — EICR codes (C1 immediate danger, C2 potentially dangerous, C3 improvement recommended, FI further investigation) per Chapter 65 + Appendix 6 against the BS 7671 amendment in force at original install. (2) Reviews Chapter 81 / 82 records (including the EEMS per Reg 825.1) — for consistency with install + customer use (year-1 verification record + ongoing monitoring); Chapter 81 records do not retroactively impose efficiency requirements on pre-A4:2026 installs but post-A4:2026 EICR may flag absent Chapter 81 evidence as C3 (improvement). (3) SPD status — visual indicators on each SPD; flagged failures = replacement; cert evidence updated. (4) Anti-islanding functional test — modern inverter self-test mode + manufacturer DoC review; failure = generator disconnect until repaired. (5) A4:2026 test methods — Reg 643.3 redrafted IR sequence (500 V DC pre-equipment + 250 V DC post-equipment); RCD verification by a single AC test at IΔn (Table 3A deleted). (6) LPS visual inspection per BS EN 62305-3 Annex E cycle (1-4 years per LPL); earth resistance measurement; LPS specialist may be appropriate. (7) Manufacturer DoCs cross-referenced to current install state. (8) EICR report references the install\'s amendment + the EICR\'s amendment + any divergence in current state.',
  },
];

const quizQuestions = [
  {
    question:
      'A new-build domestic LCT install post-A4:2026: PV + BESS + heat pump + EV charger. What is the full commissioning chain?',
    options: [
      'A reduced chain: install per the manufacturer instructions, do IR and EFLI tests and notify the DNO — no Chapter 81, SPD or anti-islanding records',
      'Design records, install, Part 6 verification, anti-islanding test, EEMS commissioning, then the cert bundle, EIC and handover',
      'The full chain but with the IR test omitted, because connecting PV inverters, BESS and EV chargers makes insulation resistance testing unreliable',
      'The full chain but with anti-islanding replaced by a visual check of the inverter display, since G98 and G99 do not apply to domestic installs',
    ],
    correctAnswer: 1,
    explanation:
      'Full M11 commissioning chain for post-A4:2026 LCT install: (1) Pre-install design records — Chapter 81 per-circuit efficiency design table; Reg 826.1.2.1 multi-source fault assessment per protective device per source configuration; BS EN 62305-2 risk summary (R1 + R4 typical for residential without LPS); SPD selection rationale per Reg 443.4.1 + Reg 534.4 family + Reg 712.534.102.1; G99 connection offer (where applicable); EEMS design records (Reg 825.1); monitoring plan. (2) Install — per design; LCT manufacturer DoCs collected. (3) Reg 643 Part 6 verification — schedule of inspection (Reg 643.1); IR test per Reg 643.3 A4:2026 redraft (500 V DC pre-equipment + 250 V DC post-equipment); continuity (Reg 643.2.1); polarity (Reg 643.6); RCD verification by a single AC test at IΔn (Table 3A deleted in A4:2026); EFLI (Reg 643.7); functional (Reg 643.10); schedule of test results. (4) Anti-islanding test — G98 simulated by installer + manufacturer DoC OR G99 DNO-witnessed (or accepted equivalent); verify disconnection within G99 time. (5) EEMS commissioning (Reg 825.1) — coordinated operation of PV / BESS / heat pump / EV verified against the Chapter 81 efficiency design; monitoring sub-meters operational; customer training on system + EEMS app. (6) Cert evidence bundle assembled — all design records + test records + manufacturer DoCs + EIC + handover. (7) Customer handover pack delivered.',
  },
  {
    question:
      'How does the LPS inspection cycle integrate with EICR + ongoing customer maintenance?',
    options: [
      'The LPS inspection and the EICR run on the same cycle and are done together by the same competent person, producing a single combined certificate',
      'The LPS is inspected only once at installation; thereafter it is covered entirely by the periodic EICR and needs no separate inspection cycle',
      'Two separate but related cycles: the LPS on its 1-4 year Annex E interval and the EICR on its own period, with the EICR reviewing LPS evidence',
      'The two cycles are entirely separate and must never be cross-referenced, so the EICR makes no mention of the LPS status or inspection records',
    ],
    correctAnswer: 2,
    explanation:
      'LPS inspection cycle (BS EN 62305-3 Annex E) + EICR (BS 7671) are separate but related: (1) LPS inspection cycle — visual + measurement at intervals: LPL I = 1 year visual + 1 year detailed; LPL II = 1 year visual + 2 year detailed; LPL III = 2 year visual + 4 year detailed; LPL IV = 4 year both. UK 2025-26 ATLAS-accredited specialist or chartered engineer with LPS competency. Inspection certificate retained with property records + insurance. (2) EICR cycle — per BS 7671 / Building Regs / property type. Typical 5-10 years residential; 5 years commercial; specific durations per landlord regs / business sector. (3) Two cycles — separate documents + dates + competent persons. EICR scope reviews LPS evidence for consistency (LPS certificate within cycle? Last inspection visible damage? Earth termination test current?) + reflects findings in EICR report (e.g. C3 improvement note if LPS overdue). (4) After significant lightning event — out-of-cycle inspection recommended for both LPS (visual + earth) + electrical install (SPD status + IR + RCD functional). (5) Customer maintenance plan — should integrate both LPS + EICR cycles + insurance reporting requirements. (6) Cert evidence bundle — both documents in the customer\'s property file.',
  },
  {
    question:
      'Chapter 81 verification at commissioning — what specifically does the verifier confirm?',
    options: [
      'Only that the installed equipment matches the quotation; energy efficiency is assessed later at the year-1 visit, not at commissioning',
      'That cable sizes, voltage drop, EEMS configuration and monitoring points match the design, with the energy estimate and payback model recorded',
      'Only the safety items in Reg 643 Part 6, because Chapter 81 is design guidance and is not verified at commissioning of the installation',
      'That the predicted payback period is under ten years, since this is the single pass/fail criterion Chapter 81 sets for an LCT install',
    ],
    correctAnswer: 1,
    explanation:
      'Chapter 81 verification at commissioning confirms efficiency design alongside Reg 643 safety verification: (1) Cable CSA per-circuit — matches Chapter 81 design records; verifier checks actual cable size at install vs design table; per-circuit upsize matches rationale documented. (2) Voltage drop calculation — design voltage drop matches install configuration; functional test at commissioning can measure (within tolerance). (3) EEMS configuration (Reg 825.1) — the EEMS commissioning sheet records the configured devices, tariff signal, load priority, schedule; verifier checks against Chapter 81 efficiency design intent. (4) Monitoring points — sub-meters wired + commissioned + reading; CT clamps in place + reading; smart-meter export wired + reporting. (5) Annual energy estimate per LCT component documented — PV kWp expected yield, BESS round-trip kWh, heat pump SCOP, EV expected kWh/year. (6) Payback model attached — economic + carbon assumptions + payback in years per Chapter 81 design choices. (7) Year-1 verification trigger set — monitoring plan defines when actual is compared to design; significant deviation (>20% typical threshold) triggers investigation. (8) Cert evidence bundle integrates Chapter 81 efficiency verification + Reg 643 safety verification + per-LCT manufacturer DoCs + EIC + customer handover.',
  },
  {
    question:
      'What is the relationship between commissioning + the Year-1 verification visit?',
    options: [
      'Commissioning is the initial verification at install; year-1 then compares actual energy use to the Chapter 81 design, with deviation triggering review',
      'Commissioning and the year-1 verification are the same event under different names, both carried out on the day the installation is energised',
      'Year-1 verification is a mandatory BS 7671 regulation requiring a full repeat of the Reg 643 Part 6 safety tests exactly 12 months after commissioning',
      'Commissioning covers the energy design while year-1 covers the electrical safety tests, which are deferred until the system has run for a full year',
    ],
    correctAnswer: 0,
    explanation:
      'Commissioning vs Year-1 verification: (1) Commissioning — Reg 643 Part 6 initial verification at install completion + Chapter 81 design records confirmation + manufacturer DoCs collected + customer handover. Single event at install end. (2) Year-1 verification — follow-up at typically 12 months post-install: (a) Review actual annual energy use per LCT component (PV kWh generated; BESS kWh in/out; heat pump kWh consumed; EV kWh consumed). (b) Compare to Chapter 81 design assumption. (c) Significant deviation (typical threshold >20%) triggers investigation: customer load profile differs from assumption; equipment performance differs from manufacturer claim; tariff change; install fault. (d) Designer / installer engages with customer + may update design records. (3) Year-1 verification is a Chapter 81 design construct — not a separate BS 7671 reg. Designer\'s assumption-validation good practice + Chapter 81 monitoring plan typically defines it. (4) Documentation — year-1 verification report attached to original cert evidence bundle; updated payback model where applicable; customer-facing update. (5) Customer relationship — year-1 verification reinforces installer / customer relationship + builds trust in design process; future LCT add-ons + EICR easier with established record. (6) Cert evidence bundle: commissioning records + year-1 verification report + ongoing monitoring data summary.',
  },
  {
    question:
      'How does the EICR report handle a post-A4:2026 install vs a pre-A4:2026 install?',
    options: [
      'Both are assessed identically against the latest amendment in force at the EICR date, so a pre-A4:2026 install is coded C2 wherever it falls short',
      'Codes apply against the install-date amendment, so missing Chapter 81 records are not a safety code on a pre-A4:2026 install but may be C3 on a newer one',
      'A pre-A4:2026 install is automatically coded C1 (immediate danger) at any post-A4:2026 EICR because it predates the current edition of BS 7671',
      'The amendment dates are irrelevant to EICR coding; codes are assigned solely on the inspector\'s judgement without reference to the standard in force',
    ],
    correctAnswer: 1,
    explanation:
      'EICR handling of pre- vs post-A4:2026 installs: (1) EICR codes apply against install-date amendment — Chapter 65 + Appendix 6 of BS 7671 + customer obligation defined per Building Regs / landlord regs / commercial agreement. (2) Pre-A4:2026 install + post-A4:2026 EICR: verifier confirms install\'s original amendment (e.g. A2:2022); EICR codes against THAT amendment. Chapter 81 absence is NOT a code (was not required at install date); BS EN 62305-2 was referenced but A4:2026 changed criteria — verifier notes evolution but does not retroactively fail. Reg 643.3 / Reg 643.4 redrafts — verifier uses current test method per current standards (250 V follow-on test for electronics is good practice regardless of install date). (3) Post-A4:2026 install + post-A4:2026 EICR: full A4:2026 scope; Chapter 81 records reviewed + cert evidence bundle expected; missing Chapter 81 evidence on a post-A4:2026 install = C3 improvement or FI further investigation; absent SPDs without owner opt-out = potential C3 / FI. (4) EICR report — records install\'s amendment + EICR\'s amendment for traceability + any divergence in current state. (5) Cert evidence bundle: EICR report + reference to install-date amendment + ongoing maintenance plan + LPS inspection record (where applicable). Honest framing prevents over- or under-codify based on amendment misapplication.',
  },
  {
    question:
      'What is the M11 module\'s contribution to the broader renewable energy course (M1-M12)?',
    options: [
      'M11 covers only the lightning protection (BS EN 62305) for LCT installs; the efficiency, fault and anti-islanding topics belong to other modules',
      'M11 simply repeats the technology-specific content of M1-M10 as a revision module, adding no new design or verification material at all',
      'M11 covers the financial payback and customer sales case for LCT installs, with the technical design and verification handled entirely in M12',
      'It is the integrating design and verification layer — efficiency, lightning, SPDs, multi-source fault, anti-islanding and commissioning across every LCT',
    ],
    correctAnswer: 3,
    explanation:
      'M11 in the renewable energy course context: (1) M1-M10 covered the specific LCT technologies — PV (M2-M4), BESS (M5), EV (M6-M7), heat pumps (M8), other LCT (M9), hybrid + EMS + smart export (M10). Each module covers the technology-specific scope. (2) M11 covers the integrating post-A4:2026 design + verification stack that applies to every LCT install: (a) Chapter 81 efficiency design — applies to every install. (b) BS EN 62305 lightning + Section 443 / 534 SPDs — applies wherever the LCT install needs protection. (c) Reg 826.1.2.1 multi-source fault contribution — applies to every PEI. (d) Reg 551.7.5 anti-islanding — applies to every grid-paralleled generator. (e) Reg 643 commissioning — applies to every install. (3) M11 §8 ties the chain together — the commissioning verification integrates Chapter 81 + lightning + SPDs + fault + anti-islanding + the BS 7671 safety verification into one cert evidence bundle. (4) M12 (next module) covers full testing + commissioning + handover detail across all LCT — IV / IR on DC, BESS health, PEN faults, MCS handover packs, EICR follow-up. M12 is the closing detail module. (5) Together M11 + M12 = the design + verification + handover framework for any LCT install. M11 sets the post-A4:2026 stack; M12 closes the testing detail.',
  },
];

const faqs = [
  {
    question: 'What test instrument does the redrafted Reg 643.3 IR test require?',
    answer:
      'A test instrument that can apply 500 V DC + 250 V DC IR test voltages. Most modern multifunction installation testers (Fluke 1664/1674, Megger MFT1741, Metrel MI3155, Kewtech KT64DL) support both voltages + the redrafted A4:2026 sequence. Manufacturer DoC for the tester confirms compliance. Cert evidence: tester model + serial + last calibration on schedule of test.',
  },
  {
    question: 'How do I verify EEMS commissioning at handover?',
    answer:
      'EEMS commissioning sheet: coordinated devices listed (PV inverter, BESS, heat pump, EV charger, immersion diverter), tariff signal source, load priority set, schedule programmed, override capability tested, monitoring dashboard accessible to customer, customer trained on app + manual override. Sheet signed by installer + customer. Attached to Chapter 81 design records + cert evidence bundle.',
  },
  {
    question: 'What\'s the typical customer handover pack contents post-A4:2026?',
    answer:
      'BS 7671 EIC + schedule of inspection + schedule of test results + Chapter 81 efficiency design records + Chapter 82 PEI documentation + EEMS commissioning sheet (Reg 825.1) + BS EN 62305 risk summary + LPS records (where applicable) + SPD records + manufacturer DoCs per LCT component + G99 / G98 reference + anti-islanding test record + monitoring plan + payback model + year-1 verification trigger + customer training acknowledgement.',
  },
  {
    question: 'Does the customer need to do anything during the LCT install lifetime?',
    answer:
      'Yes — visual SPD status check (window indicators); monitor energy app for unusual patterns; report any tripping / loss of function; engage EICR + LPS inspection cycles per their scheduled dates; insurance updates as needed. Installer\'s customer handover pack should set expectations + provide ongoing contact details.',
  },
  {
    question: 'What happens if a Chapter 81 monitoring point fails after install?',
    answer:
      'Investigation. Possible: sub-meter / CT clamp failure; data-logger or portal connectivity issue; customer\'s system configuration change. Repair or replace as needed; updated monitoring restored. Chapter 81 cert evidence bundle is the design record; absent monitoring data for a period is documented + restored.',
  },
];

export default function RenewableEnergyModule11Section8() {
  const navigate = useNavigate();

  useSEO({
    title: 'Commissioning verification — Chapter 81 + lightning + fault + anti-islanding | Renewable Energy 11.8 | Elec-Mate',
    description:
      'Reg 643 Part 6 initial verification + Reg 643.3 redrafted IR sequence + RCD verification by a single AC test at IΔn (Table 3A deleted in A4:2026) + Chapter 81 efficiency verification + BS EN 62305 LPS inspection cycle + SPD records + anti-islanding test + cert evidence bundle integration.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-11')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 11
          </button>

          <PageHero
            eyebrow="Module 11 · Section 8 · BS 7671 Reg 643 Part 6 + Chapter 81 + BS EN 62305 + cert evidence bundle"
            title="Commissioning verification — Chapter 81, lightning, fault, anti-islanding"
            description="Reg 643 Part 6 initial verification + Reg 643.3 redrafted IR sequence + RCD verification by a single AC test at IΔn (Table 3A deleted in A4:2026) + Chapter 81 efficiency verification + BS EN 62305 LPS inspection cycle + SPD records + anti-islanding commissioning test + integrating cert evidence bundle. The closing M11 chain."
            tone="yellow"
          />

          <TLDR
            points={[
              'M11 §8 integrates the full M11 commissioning chain — Chapter 81 + lightning + SPDs + multi-source fault + anti-islanding + Reg 643 Part 6 verification.',
              'Reg 643.3 redrafted in A4:2026: IR test sequence around electronics — 500 V DC pre-equipment connection + 250 V DC post-equipment to confirm IR without risking damage.',
              'Table 3A (RCD time/current performance criteria) deleted in A4:2026: a single AC test at IΔn now verifies the RCD regardless of Type (AC / A / F / B) per Reg 643.8 + Appendix 3 (general non-delay RCD must disconnect within 300 ms). RCD Type is still selected per Reg 531.3.3.',
              'Chapter 81 verification: per-circuit cable CSA matches design + voltage drop matches install + EEMS configured per design + monitoring points operational + annual energy estimate documented.',
              'BS EN 62305 LPS inspection cycle (Annex E): 1-4 years per LPL; UK 2025-26 ATLAS specialist; separate from EICR cycle but cross-referenced.',
              'SPD records: per location + Type + Uc + Up + In/Iimp + Iscc + manufacturer DoCs + visual status indicators checked periodically.',
              'Anti-islanding commissioning: G98 simulated test + manufacturer DoC OR G99 DNO-witnessed (or accepted equivalent); cert evidence with disconnection time recorded.',
              'EICR scope years 5-10: verifies safety against install-date amendment; reviews Chapter 81/82 records (incl. the EEMS per Reg 825.1) for consistency; not retroactive on pre-A4:2026 installs.',
              'M11 + M12: M11 sets the design + verification stack; M12 closes with full testing + commissioning + handover detail across all LCT.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply Reg 643.3 redrafted IR test sequence: 500 V DC pre-equipment + 250 V DC post-equipment.',
              'Apply the revised A4:2026 RCD verification — a single AC test at IΔn regardless of RCD Type (Table 3A deleted).',
              'Verify Chapter 81 efficiency design at commissioning alongside Reg 643 safety verification.',
              'Integrate BS EN 62305 LPS inspection cycle with EICR + customer maintenance plan.',
              'Verify SPD selection records + manufacturer DoCs + visual status indicators per location.',
              'Verify anti-islanding commissioning test record per G98 / G99 + manufacturer DoC + DNO sign-off.',
              'Assemble the integrating cert evidence bundle for an M11-scope LCT install.',
              'Handle EICR scope in years 5-10 — install-date amendment vs current amendment.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Eight sections, one chain. Chapter 81 efficiency. Lightning protection. SPDs. Multi-source fault. Anti-islanding. Reg 643 verification. The cert evidence bundle is where it all lands.
          </Pullquote>

          <ContentEyebrow>Reg 643 Part 6 — initial verification with A4:2026 redrafts</ContentEyebrow>

          <ConceptBlock
            title="Reg 643 Part 6 initial verification — the safety baseline"
            plainEnglish="Reg 643 covers initial verification of an installation at completion. Continuity of protective conductors (Reg 643.2), insulation resistance (Reg 643.3, redrafted in A4:2026), separation by SELV/PELV/electrical separation (Reg 643.4), polarity (Reg 643.6), RCD operation (verified by a single AC test at IΔn — Table 3A deleted in A4:2026), earth fault loop impedance (Reg 643.7), functional tests (Reg 643.10), schedule of inspection + schedule of test results. The safety baseline for every install — LCT or not."
            onSite="UK 2025-26 LCT install commissioning: Reg 643 verification + Chapter 81 efficiency verification + manufacturer-specific tests run together. Multifunction installation tester (Fluke / Megger / Metrel / Kewtech etc.) supports the standard suite. A4:2026 redrafts incorporated."
          >
            <p>Reg 643 verification elements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Continuity of
                  protective conductors (Reg 643.2)</strong> — verify low-resistance
                path of protective conductors (CPC, bonding) using continuity tester;
                R1+R2 measurement for fault loop impedance pre-calculation
              </li>
              <li>
                <strong className="text-white">Insulation resistance
                  (Reg 643.3 — A4:2026 redraft)</strong> — 500 V DC IR test pre-equipment
                connection (verify cable + accessory insulation); connect equipment;
                250 V DC IR test post-equipment to confirm IR remains acceptable
                without damaging electronics
              </li>
              <li>
                <strong className="text-white">Protection by SELV /
                  PELV (Reg 643.4)</strong> — verification of separation per
                Chapter 41
              </li>
              <li>
                <strong className="text-white">Polarity (Reg 643.6)</strong>
                — verify line + neutral correctly connected at all relevant points;
                particularly important for LCT installs with bidirectional sources
              </li>
              <li>
                <strong className="text-white">RCD operation
                  (single AC test at IΔn — Table 3A deleted in A4:2026)</strong> —
                functional + an AC test at IΔn verifies the RCD regardless of Type
                (AC / A / F / B per Reg 531.3.3); Type B still selected where smooth
                DC residual current paths exist (BESS / EV / heat pump VSD)
              </li>
              <li>
                <strong className="text-white">Earth fault loop
                  impedance (Reg 643.7)</strong> — measure Zs at each circuit + verify
                against design (Z_s_max for OCPD operating time per Reg 411.3.2);
                multi-source PEI may need per-source-configuration measurement
              </li>
              <li>
                <strong className="text-white">Functional tests
                  (Reg 643.10)</strong> — switchgear, RCDs, interlocks, control
                circuits, EEMS, anti-islanding operate per design
              </li>
              <li>
                <strong className="text-white">Schedule of inspection
                  + schedule of test results</strong> — per Reg 643.1 + 644 (deleted
                in A4:2026 renumbering); cert evidence record
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 643.3 A4:2026 redraft — IR test sequence with electronics"
            plainEnglish="Pre-A4:2026: single 500 V DC IR test could damage sensitive electronics. A4:2026 redraft: 500 V DC IR test on installation BEFORE equipment connected (verify cable + accessory) + 250 V DC IR test AFTER equipment connected (verify IR remains acceptable without damaging electronics). Both results recorded."
            onSite="Practical: do the 500 V DC sweep at the install\'s pre-energise state — all loads + electronics disconnected; cable + isolators in place. Verify good IR (typically >1 MΩ). Connect electronics. Re-test at 250 V DC. Both results on schedule of test."
          >
            <p>Reg 643.3 A4:2026 IR test sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Stage 1 — pre-equipment
                  IR</strong> — 500 V DC IR test on installation with all electronics
                + loads disconnected (PV inverter, BESS, EV charger, heat pump
                VSD, sensitive electronics isolated). Verify cable + accessory
                insulation integrity. Typical acceptable IR &gt; 1 MΩ
              </li>
              <li>
                <strong className="text-white">Stage 2 — connect
                  equipment</strong> — connect all loads + electronics in normal
                operating configuration
              </li>
              <li>
                <strong className="text-white">Stage 3 — post-equipment
                  IR</strong> — 250 V DC IR test on installation in normal operating
                configuration. Verifies overall IR with electronics in circuit
                without applying 500 V DC across them (which could damage)
              </li>
              <li>
                <strong className="text-white">Threshold</strong>
                — acceptable IR per Reg 643.3 + Table 64 (e.g. &gt;1 MΩ at 500 V DC
                for SELV / PELV / FELV; &gt;1 MΩ at 230/400 V LV; &gt;0.5 MΩ at 250 V DC
                post-equipment per equipment standard)
              </li>
              <li>
                <strong className="text-white">Equipment-specific
                  concerns</strong> — PV inverters + BESS + EV chargers + heat pump
                VSDs have surge protection internally that can shunt 500 V DC test
                voltage; manufacturer DoC declares maximum applied test voltage
                + recommended sequence
              </li>
              <li>
                <strong className="text-white">Modern tester
                  support</strong> — Fluke 1664/1674, Megger MFT1741, Metrel MI3155,
                Kewtech KT64DL etc. — most modern multifunction testers support
                500 V + 250 V + multiple IR ranges. Tester manufacturer DoC + last
                calibration on schedule of test
              </li>
              <li>
                <strong className="text-white">Cert evidence</strong>
                — schedule of test records BOTH 500 V (pre-equipment) + 250 V
                (post-equipment) IR results + Reg 643.3 A4:2026 compliance
              </li>
              <li>
                <strong className="text-white">DC side PV / BESS</strong>
                — DC strings + BESS DC have manufacturer-specific test methods (often
                lower DC test voltage 250-500 V vs the inverter\'s open-circuit
                voltage); follow PV + BESS manufacturer instructions
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.3 — Insulation resistance verification (A4:2026 redraft)"
            clause="Reg 643.3 has been redrafted. The requirements for testing insulation resistance where equipment is likely to influence the verification test or be damaged has been clarified and reference is made to a 250 V DC test following the connection of equipment."
            meaning="Reg 643.3 was redrafted in A4:2026 specifically to address the testing of electronics-rich installations. Pre-A4:2026 single 500 V DC IR test could damage sensitive electronics (PV inverters, BESS, EV chargers, heat pump VSDs all have internal surge protection that can shunt high-voltage test). The redraft establishes a two-stage sequence: (1) 500 V DC IR before equipment connection — verifies cable + accessory insulation integrity. (2) 250 V DC IR after equipment connection — confirms IR remains acceptable in normal operating configuration without risking equipment damage. Both results recorded on schedule of test. Practical consequence: LCT installs are now testable safely + thoroughly without damaging the electronics that justify the test in the first place. Modern multifunction testers support both voltages. Cert evidence bundle: schedule of test with both readings + Reg 643.3 A4:2026 compliance + tester manufacturer DoC + last calibration. M11 §8 integrates this into the broader commissioning chain alongside Chapter 81 + RCD verification by a single AC test at IΔn (Table 3A deleted in A4:2026) + anti-islanding verification + cert evidence bundle assembly."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Integrating Chapter 81 + lightning + SPD + fault + anti-islanding</ContentEyebrow>

          <Pullquote>
            One install, one commissioning, one cert evidence bundle. Reg 643 safety + Chapter 81 efficiency + BS EN 62305 lightning + Section 443/534 SPDs + Reg 826 PEI + Reg 551.7.5 anti-islanding — all integrated.
          </Pullquote>

          <ConceptBlock
            title="The integrating commissioning chain"
            plainEnglish="M11 commissioning brings together all M11 sections into one verification chain. The cert evidence bundle assembles: Reg 643 Part 6 safety; Chapter 81 efficiency; BS EN 62305 risk + LPS records; Section 443 + 534 + Reg 712.534.102.1 SPD selection; Reg 826.1.2.1 multi-source fault assessment; Reg 551.7.5 + G98 / G99 anti-islanding test; per-LCT manufacturer DoCs; EIC + customer handover."
            onSite="The commissioning visit is a coordinated event: safety tester runs the Reg 643 suite; Chapter 81 designer / installer verifies design records vs install; LPS specialist signs off (where applicable); DNO witnesses anti-islanding (G99 typical); EEMS commissioner verifies smart-control + monitoring; customer trained + handed the bundle."
      >
            <p>Commissioning chain elements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Pre-commissioning design
                  records</strong> — Chapter 81 per-circuit design + Reg 826.1.2.1
                multi-source fault + BS EN 62305-2 risk + SPD selection rationale
                + G99 connection offer (where applicable) + EEMS configuration
              </li>
              <li>
                <strong className="text-white">Install completion</strong>
                — all LCT components installed per design; manufacturer DoCs
                collected; system configured + tested individually
              </li>
              <li>
                <strong className="text-white">Reg 643 safety
                  verification</strong> — schedule of inspection + IR (500 V DC
                pre + 250 V DC post per A4:2026 redraft) + continuity + polarity
                + RCD verification by a single AC test at IΔn (Table 3A deleted)
                + EFLI + functional tests; schedule of test results
              </li>
              <li>
                <strong className="text-white">Chapter 81 efficiency
                  verification</strong> — cable CSA matches design + voltage drop
                matches install + EEMS configured per design + monitoring points
                operational + annual energy estimate documented
              </li>
              <li>
                <strong className="text-white">BS EN 62305 records</strong>
                — risk assessment summary + LPS records + separation distance
                calculation (where applicable) + LPS specialist sign-off (where
                applicable) + earth termination test
              </li>
              <li>
                <strong className="text-white">SPD records</strong>
                — per location + Type + Uc + Up + In/Iimp + Iscc + manufacturer
                DoCs + Reg 443.4.1 + Reg 534.4 family + Reg 712.534.102.1
                compliance + visual status indicators initial state
              </li>
              <li>
                <strong className="text-white">Anti-islanding test</strong>
                — G98 simulated by installer + manufacturer DoC OR G99 DNO-witnessed
                (or accepted equivalent); disconnection time measured + recorded
                + DNO sign-off where applicable
              </li>
              <li>
                <strong className="text-white">PEI integration</strong>
                — Chapter 82 documentation: single-line diagram, changeover
                (Reg 551.6), island mode (Reg 826.1.1.5) test record, source
                placement per Reg 551.7.2.1
              </li>
              <li>
                <strong className="text-white">EEMS commissioning</strong>
                — EEMS commissioning sheet (Reg 825.1): coordinated devices, tariff
                signal, load priority, schedule, monitoring, customer training
              </li>
              <li>
                <strong className="text-white">Final cert evidence
                  bundle + EIC + customer handover</strong> — assembled document
                set delivered to customer; installer keeps copy; future EICR scope
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Cert evidence bundle — complete checklist"
            plainEnglish="The cert evidence bundle for an M11-scope LCT install is comprehensive. Multiple documents + manufacturer DoCs + test records + design records + DNO + LPS specialist sign-offs (where applicable) + EIC + customer handover pack. Typical residential bundle 15-30 pages; commercial 50-200 pages."
            onSite="The bundle is the customer\'s + installer\'s + insurer\'s + future EICR-verifier\'s evidence chain. Building it during commissioning + ensuring nothing is missed = professional install delivery. The customer evidence bundle is what differentiates a quality install from a quick install."
          >
            <p>Cert evidence bundle checklist:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">BS 7671 EIC</strong>
                — Electrical Installation Certificate per Appendix 6 BS 7671
                + schedule of inspection + schedule of test results
              </li>
              <li>
                <strong className="text-white">Chapter 81 records</strong>
                — per-circuit efficiency design table; payback model; EEMS
                configuration; monitoring plan; annual energy estimate per LCT
                component; year-1 verification trigger
              </li>
              <li>
                <strong className="text-white">Chapter 82 PEI
                  documentation</strong> — single-line diagram; operating modes
                (Reg 824.2); changeover (Reg 551.6); island mode test
                record (Reg 826.1.1.5); source placement per Reg 551.7.2.1; per-
                protective-device fault assessment per Reg 826.1.2.1
              </li>
              <li>
                <strong className="text-white">EEMS records (Reg 825.1)</strong>
                — EEMS commissioning sheet; coordinated devices; tariff signal;
                load priority; schedule; customer training acknowledgement
              </li>
              <li>
                <strong className="text-white">BS EN 62305 records</strong>
                — risk assessment summary (residential) or full report (commercial
                / heritage); LPS records + earth termination test (where applicable);
                separation distance calculation (where PV inside LPS); LPS specialist
                sign-off (where applicable)
              </li>
              <li>
                <strong className="text-white">SPD records</strong>
                — per location + Type + Uc + Up + In/Iimp + Iscc + manufacturer
                DoCs + Reg 443.4.1 + Reg 534.4 family + Reg 712.534.102.1 compliance
                + visual status indicators
              </li>
              <li>
                <strong className="text-white">Anti-islanding records</strong>
                — Reg 551.7.4 + Reg 551.7.5 compliance via G98 / G99 reference +
                manufacturer DoC + protection settings (G99) + commissioning test
                record + DNO sign-off (where applicable)
              </li>
              <li>
                <strong className="text-white">LCT manufacturer
                  DoCs</strong> — PV inverter; BESS; heat pump; EV charger; other
                LCT per install; each with relevant standards (BS EN 50549,
                IEC standards, MCS approvals)
              </li>
              <li>
                <strong className="text-white">MCS handover pack
                  (where applicable)</strong> — MIS 3002 PV; MIS 3005 heat pump;
                MIS 3003 wind; MIS 3008 hydro; etc. Integrates with BS 7671 cert
                evidence
              </li>
              <li>
                <strong className="text-white">EREC reference</strong>
                — G98 post-installation notification or G99 connection offer +
                acceptance + DNO commissioning certificate
              </li>
              <li>
                <strong className="text-white">Customer handover
                  pack</strong> — operations guide; energy app overview; SPD visual
                check instructions; emergency contacts; LPS + EICR cycle dates;
                year-1 verification trigger
              </li>
              <li>
                <strong className="text-white">Installer record</strong>
                — installer keeps full copy + serves as basis for future EICR,
                customer enquiries, insurance claims
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · RCD verification — Table 3A deleted (Reg 643.8 + Appendix 3)"
            clause="Table 3A (Time/current performance criteria for tests of RCDs) in Appendix 3 has been DELETED in A4:2026. The previous requirement to test according to that table is no longer applicable; instead, under Reg 643.8, a single alternating current test at the rated residual operating current (IΔn) is used to verify the RCD's effectiveness regardless of RCD Type — a general non-delay RCD must disconnect within 300 ms (Reg 643.8 NOTE). A functional test is also carried out at commissioning."
            meaning="A4:2026 deleted Table 3A and simplified RCD verification: regardless of RCD Type, an AC test at IΔn confirms the device trips and is effective — practitioners should NOT rely on the deleted Table 3A for pass/fail criteria. RCD Type is still SELECTED per Reg 531.3.3: (a) Type AC — alternating sinusoidal residual; (b) Type A — alternating + pulsating DC residual; (c) Type F — alternating + composite + high-frequency (covers VSD-supplied loads); (d) Type B — alternating + pulsating DC + smooth DC residual (covers full LCT electronics range). For LCT installs: BESS inverters, EV chargers, heat pump VSDs may produce smooth DC residual under fault conditions → a Type B RCD is selected per manufacturer DoC — but the verification test is the single AC test at IΔn, not a per-Type time/current profile. Modern multifunction testers (Fluke, Megger, Metrel etc.) perform the AC test at IΔn. Cert evidence bundle: schedule of test records RCD Type + measured operating time at IΔn + tester manufacturer DoC + last calibration."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>EICR + Year-1 verification + ongoing maintenance</ContentEyebrow>

          <ConceptBlock
            title="Year-1 verification — Chapter 81 monitoring follow-up"
            plainEnglish="Year-1 verification = follow-up visit (or remote review) typically 12 months post-install to compare actual energy use to Chapter 81 design assumptions. Significant deviation (>20% threshold typical) triggers investigation. Not a separate BS 7671 reg; Chapter 81 design construct + good practice."
            onSite="The year-1 verification visit reinforces designer / installer relationship with customer + validates design assumptions. Customer monitoring data review; PV yield vs estimate; heat pump SCOP vs estimate; EV consumption vs assumption; BESS round-trip vs design. Designer engages with customer if significant deviation."
          >
            <p>Year-1 verification process:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Trigger</strong>
                — typically 12 months post-install; Chapter 81 design records set
                the trigger date + criteria
              </li>
              <li>
                <strong className="text-white">Data review</strong>
                — actual annual kWh per LCT component (PV; BESS in/out; heat pump;
                EV; immersion diverter) vs Chapter 81 design estimate
              </li>
              <li>
                <strong className="text-white">Deviation threshold</strong>
                — typical &gt;20% deviation triggers investigation. Smaller deviations
                noted + tracked; large deviations actioned
              </li>
              <li>
                <strong className="text-white">Investigation causes</strong>
                — customer load profile differs from assumption; equipment
                performance differs from manufacturer claim; tariff change; install
                fault; weather variance (PV)
              </li>
              <li>
                <strong className="text-white">Customer engagement</strong>
                — installer / designer visits or remote review; updated load profile;
                possible install adjustment (e.g. add immersion diverter; reschedule
                EEMS); updated design records
              </li>
              <li>
                <strong className="text-white">Year-1 report</strong>
                — attached to original cert evidence bundle; updated payback model
                where applicable; customer-facing update + reinforcement of
                relationship
              </li>
              <li>
                <strong className="text-white">Future follow-ups</strong>
                — year-3 / year-5 reviews where customer / installer agree;
                supports EICR + LPS inspection coordination
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — year-1 verification report + ongoing monitoring
                data summary + customer feedback
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="EICR scope years 5-10 post-install"
            plainEnglish="EICR (Electrical Installation Condition Report) scope verifies safety against install-date amendment + reviews Chapter 81/82 records (incl. the EEMS per Reg 825.1) for consistency. Codes C1/C2/C3/FI per safety reg breach against install-date amendment. Not retroactive on pre-A4:2026 installs. Post-A4:2026 installs may have C3 (improvement) on absent Chapter 81 records."
            onSite="UK 2025-26 typical EICR for LCT install: visual + functional checks; SPD status indicators; anti-islanding self-test via inverter; RCD operation by a single AC test at IΔn (Table 3A deleted in A4:2026); IR per Reg 643.3 redraft; EFLI; LPS visual (LPS specialist where applicable). Recorded against install-date amendment + current amendment. EICR report references both."
          >
            <p>EICR scope detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Install-date amendment</strong>
                — EICR codes against the amendment in force at install (e.g. A2:2022
                for 2020 install). New regs added post-install are NOT retroactively
                imposed
              </li>
              <li>
                <strong className="text-white">Visual inspection</strong>
                — accessible components; signs of damage / overheating / corrosion;
                cable + accessory condition; CU + sub-board condition; SPD visual
                status indicators
              </li>
              <li>
                <strong className="text-white">Continuity + IR</strong>
                — per Reg 643.2 + Reg 643.3 (A4:2026 redraft applies to test method
                regardless of install date — 250 V DC post-equipment is good
                practice for electronics)
              </li>
              <li>
                <strong className="text-white">RCD operation</strong>
                — single AC test at IΔn (current method; Table 3A deleted in
                A4:2026); Type identification per Reg 531.3.3 + functional test
              </li>
              <li>
                <strong className="text-white">EFLI</strong> —
                Zs measurement; verify against design + Reg 411.3.2 disconnection
                time
              </li>
              <li>
                <strong className="text-white">Functional tests</strong>
                — switchgear, RCDs, anti-islanding (inverter self-test), EEMS
                operation, monitoring active
              </li>
              <li>
                <strong className="text-white">LPS visual</strong>
                — air termination integrity + down conductor condition + earth
                electrode visible; LPS specialist + measurement at LPS inspection
                cycle dates
              </li>
              <li>
                <strong className="text-white">Codes</strong> —
                C1 immediate danger; C2 potentially dangerous; C3 improvement
                recommended; FI further investigation. Per Appendix 6
              </li>
              <li>
                <strong className="text-white">Report references</strong>
                — install-date amendment + EICR-date amendment + any divergence
                + recommended actions
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle update</strong> — EICR report added to bundle; customer
                evidence chain continues
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 651 / 652 / 653 — Periodic inspection + reporting + EICR"
            clause="Chapter 65 covers periodic inspection of an existing installation. Reg 651 general; Reg 652 inspection; Reg 653 testing; Reg 653.2 (now requires the report to include guidance for the recipient(s) based on the model in Appendix 6, plus a note pointing out that photographic and/or thermographic images can be appended). The EICR records safety against install-date amendment + current state."
            meaning="Chapter 65 + Reg 651-653 cover the EICR (Electrical Installation Condition Report) process — periodic verification of an existing installation\'s safety. EICR scope for LCT installs is the M11 ongoing-compliance anchor: verifies safety against install-date amendment + reviews Chapter 81/82 records (incl. the EEMS per Reg 825.1) for consistency + records current state of SPDs + anti-islanding + LPS + IR + RCD + EFLI + continuity. Reg 653.2 was updated to require EICR to include guidance for recipients based on Appendix 6 model + note that photographic / thermographic images can be appended (useful for SPD visual indicators, LPS condition, etc.). Cert evidence bundle: EICR report attached to original install records; install-date amendment vs EICR-date amendment recorded for traceability; codes (C1/C2/C3/FI) per safety reg breach against install-date amendment; Chapter 81 records review (post-A4:2026 install only); LPS inspection cross-reference; SPD status; anti-islanding functional test; future actions + maintenance plan updates."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="Full M11 commissioning — post-A4:2026 domestic LCT install"
            situation="New-build 4-bed detached, post-A4:2026 install. 6 kWp PV + 13 kWh BESS + 7 kW ASHP + 7 kW EV charger; Octopus Cosy tariff; SolarEdge inverter + Tesla Powerwall + Daikin ASHP + Zappi EV charger. UK 2025-26."
            whatToDo="Full M11 commissioning chain: (1) Pre-commissioning design records assembled — Chapter 81 per-circuit table (heat pump 32 A circuit upsized to 10 mm² T+E for payback; EV charger 32 A circuit upsized to 10 mm² for payback + voltage drop margin; PV DC strings upsized to 6 mm² PV-DC for MPP voltage hold; general circuits at Reg 525 floor); Reg 826.1.2.1 fault assessment per protective device per source combination (DNO 16 kA at origin; PV/BESS inverter contributions <100 A combined; CU RCBOs Icn 16 kA); BS EN 62305-2 risk summary (residential no LPS; R1 below tolerable; R4 owner-assessed; Reg 443.4.1 (c) criterion = SPDs required); SPD selection (Type 2 at CU; Type 2 on PV DC near inverter); G99 connection offer (PV inverter 26 A AC + BESS hybrid inverter > G98 threshold); EEMS configuration (SolarEdge ONE + Powerwall app coordinated; Cosy tariff signal; PV self-consume → BESS charge → export priority; EV charge on Cosy off-peak window; heat pump on Cosy heat-pump windows; immersion diverter on PV excess). (2) Install completion — per design. (3) Reg 643 Part 6 verification — IR test sequence per Reg 643.3 A4:2026 redraft (500 V DC pre + 250 V DC post; both >1 MΩ); RCD verification by a single AC test at IΔn — Table 3A deleted in A4:2026 (RCBOs Type A at CU; Type B selected per manufacturer DoC at BESS + EV charger circuits; each verified to trip at IΔn on the AC test); continuity R1+R2 measured per circuit; polarity verified; EFLI Zs measured + verified against Reg 411.3.2; functional tests. (4) Anti-islanding test — G99 DNO-accepted equivalent: installer simulated grid-loss test by opening main switch; inverter disconnects within 150 ms (recorded); manufacturer self-test mode also run + logged; DNO accepts simulated test + manufacturer DoC + installer report. (5) Chapter 81 efficiency verification — cable CSA matches design; voltage drop calculated; EEMS configured + tested (manual + scheduled operation verified); monitoring sub-meters reading; customer trained on app. (6) Cert evidence bundle assembled — EIC + schedule of inspection + schedule of test + Chapter 81 design records + EEMS commissioning sheet + monitoring plan + Reg 826.1.2.1 fault assessment + BS EN 62305-2 risk summary + SPD records (2 × Type 2 + manufacturer DoCs) + G99 connection offer + DNO commissioning certificate + anti-islanding test record + per-LCT manufacturer DoCs (PV + BESS + ASHP + EV charger) + customer handover pack. (7) Year-1 verification trigger set in customer plan."
            whyItMatters="Real UK 2025-26 post-A4:2026 LCT install. Comprehensive cert evidence bundle = professional install delivery. Customer evidence is insurance-ready + EICR-ready + future-buyer-ready. ~25-page bundle for a residential install. Designer/installer + customer + DNO + LPS specialist (where applicable) all coordinated. M11 §8 is the closing chain that brings it all together."
          />

          <Scenario
            title="EICR on a 2022 PV + BESS install in 2026 (pre-A4:2026 → post-A4:2026 EICR)"
            situation="Existing 2022 PV (4 kWp) + BESS (9 kWh) install. Installed under BS 7671:2018+A2:2022. Customer arranging sale of property; EICR requested in 2026 (post-A4:2026). UK 2025-26."
            whatToDo="EICR scope: (1) Confirm install-date amendment — original EIC dated 2022 references A2:2022. EICR scope tested against A2:2022 NOT A4:2026. (2) Visual + functional — visual inspection of accessible components; SPD visual indicators (Type 2 SPDs from 2022 install; check status windows green); cable + accessory condition. (3) IR test — per Reg 643.3 A4:2026 redraft (current test method); 500 V DC pre-equipment + 250 V DC post-equipment; result satisfies original install spec. (4) RCD test — single AC test at IΔn per the current A4:2026 method (Table 3A deleted); RCDs Type A from 2022 install — verify each trips at IΔn. (5) Continuity + polarity + EFLI — verified per current method. (6) Anti-islanding functional — inverter self-test mode + manufacturer DoC review (G99 from 2022 install). (7) Chapter 81 records — NOT in original install (pre-A4:2026); EICR does NOT retroactively impose Chapter 81 absence as a code; verifier notes the install date amendment + records the absence as expected. (8) EICR codes — C1/C2/C3/FI per safety reg breach against A2:2022 amendment. SPDs present + working; anti-islanding present + verified; RCDs operating; IR / EFLI within tolerance. No code applied for absence of Chapter 81 efficiency records (not retroactive). (9) Cert evidence bundle update — EICR report attached to original 2022 EIC + amendments referenced + maintenance plan + future EICR date. (10) Customer evidence — clear EICR + property sale documentation + insurance + buyer reassurance."
            whyItMatters="Honest EICR framing prevents over-codify of pre-A4:2026 installs. Customer + property sale + future buyer all benefit from clear documentation of install-date amendment vs EICR-date amendment. EICR scope is safety against install-date amendment; not retroactive Chapter 81 imposition. Cert evidence bundle preserves the install record + supports the customer\'s legitimate property transaction."
          />

          <CommonMistake
            title="Skipping the 250 V DC follow-on IR test"
            whatHappens={`Installer does the 500 V DC IR test pre-equipment connection (~good practice) but skips the 250 V DC post-equipment test ("the install passed at 500 V DC, why do another test?"). Reg 643.3 A4:2026 redraft REQUIRES the post-equipment test to confirm IR remains acceptable with electronics in circuit. Cert evidence bundle is incomplete; future EICR / inspector / insurer can't verify the install was fully tested per A4:2026.`}
            doInstead="Do BOTH tests + record both results on the schedule of test. Pre-equipment 500 V DC verifies cable + accessory; post-equipment 250 V DC confirms IR with electronics in circuit. Both are integral to the Reg 643.3 A4:2026 redraft. Cert evidence bundle records both readings + tester manufacturer DoC + last calibration. Without both, the install isn\'t fully verified per current BS 7671."
          />

          <CommonMistake
            title="Treating commissioning as one big checklist without integration"
            whatHappens="Installer treats Reg 643 + Chapter 81 + BS EN 62305 + SPD + anti-islanding as separate tick-box exercises; doesn\'t see the integrating commissioning chain; misses cross-references (e.g. SPD record without referencing the BS EN 62305-2 risk assessment that justified the SPD; fault assessment without referencing the multi-source design rationale). Cert evidence bundle is a stack of unrelated documents rather than an integrated install record."
            doInstead="Commissioning is the integrating event — the M11 chain ties Chapter 81 + lightning + SPDs + multi-source fault + anti-islanding + Reg 643 verification into ONE cert evidence bundle. Cross-references between sections matter: SPD selection traces to BS EN 62305-2 risk assessment + Reg 443.4.1 trigger + Reg 712.534.102.1 PV-specific (where applicable); Chapter 81 cable design traces to Reg 525 floor + Reg 826.1.2.1 fault assessment + EEMS configuration; anti-islanding traces to Reg 551.7.5 + G98/G99 + manufacturer DoC + DNO sign-off. The bundle should READ AS ONE STORY, not as separate documents. Future EICR / inspector / insurer can follow the chain."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'M11 §8 integrates the full M11 commissioning chain — Chapter 81 + BS EN 62305 + Section 443/534 SPDs + Reg 826.1.2.1 multi-source fault + Reg 551.7.5 anti-islanding + Reg 643 Part 6 verification.',
              'Reg 643.3 A4:2026 redraft: IR test sequence — 500 V DC pre-equipment + 250 V DC post-equipment. Both results recorded.',
              'Table 3A deleted in A4:2026: RCD verification is now a single AC test at IΔn regardless of Type (per Reg 643.8 + Appendix 3; general non-delay RCD must disconnect within 300 ms). RCD Type still selected per Reg 531.3.3.',
              'Chapter 81 verification at commissioning: cable CSA matches design + voltage drop matches install + EEMS configured per design + monitoring operational + annual energy estimate documented.',
              'BS EN 62305 LPS inspection cycle (Annex E): 1-4 years per LPL. Separate from EICR cycle but cross-referenced. ATLAS specialist UK 2025-26.',
              'SPD records: per location + Type + Uc + Up + In/Iimp + Iscc + manufacturer DoCs + visual status indicators + Reg 443.4.1 + Reg 534.4 family compliance.',
              'Anti-islanding commissioning: G98 simulated + manufacturer DoC OR G99 DNO-witnessed (or accepted equivalent); cert evidence with disconnection time + DNO sign-off.',
              'Cert evidence bundle: complete + integrated + customer-readable + insurance-ready + EICR-ready. Typical residential 15-30 pages; commercial 50-200 pages.',
              'Year-1 verification: Chapter 81 design construct + good practice. Actual vs design comparison + investigation if >20% deviation.',
              'EICR scope years 5-10: verifies safety against install-date amendment; reviews Chapter 81/82 records (incl. the EEMS per Reg 825.1) for consistency; not retroactive on pre-A4:2026 installs.',
              'M11 + M12: M11 sets the post-A4:2026 design + verification stack; M12 closes with full testing + commissioning + handover detail across all LCT.',
              'Customer evidence chain = professional install delivery + insurance + property sale + future buyer + ongoing maintenance + legal compliance.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 8 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-11-section-7')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                11.7 Anti-islanding deep
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-11')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Module overview <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 11 complete
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
