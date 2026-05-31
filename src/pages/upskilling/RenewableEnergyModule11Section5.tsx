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
import { SpdCoordination } from '@/components/study-centre/diagrams/renewableGapSvg';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm11s5-spd-type-selection',
    question:
      'Per Reg 534.4.1.1, where does each SPD Type sit?',
    options: [
      'No rules',
      '(a) SPDs installed at the origin of the electrical installation shall be Type 1 or Type 2. (b) SPDs installed close to sensitive equipment to further protect against switching transients originating within the building shall be Type 2 or Type 3. NOTE: Type 1 SPDs are often referred to as equipotential bonding SPDs and are fitted at the origin of the electrical installation. Type 1 = direct lightning current; Type 2 = indirect surge; Type 3 = residual surge close to equipment',
      'Random',
      'All same type',
    ],
    correctIndex: 1,
    explanation:
      'Reg 534.4.1.1 codifies SPD Type-by-location in BS 7671: (a) SPDs at the origin of the electrical installation = Type 1 or Type 2. Type 1 used where direct or partial direct lightning current is possible (structure with external LPS, or where Reg 712.534.102.1 PV inside LPS + s not kept). Type 2 used where only indirect surge is expected (most domestic origins without LPS). (b) SPDs close to sensitive equipment = Type 2 or Type 3. Type 2 covers indirect surge; Type 3 handles residual transients after upstream SPDs + switching transients originating within the building. (c) The Reg NOTE adds: Type 1 are "equipotential bonding SPDs" at origin — they bond surge current to the equipotential earth system during a strike. Test waveforms: Type 1 tested with 10/350 µs (direct lightning); Type 2 with 8/20 µs (indirect surge); Type 3 with combination waveform. Cert evidence bundle: SPD per location + Type + Reg 534.4.1.1 compliance.',
  },
  {
    id: 'm11s5-up-uw-coordination',
    question:
      'What is voltage protection level Up vs equipment rated impulse withstand voltage Uw?',
    options: [
      'Random',
      'Up = the SPD\'s voltage protection level — the maximum voltage that appears across the protected equipment when the SPD operates. Uw = the equipment\'s rated impulse withstand voltage — what the equipment can survive without damage. Per Reg 534.4.4.1: Up < Uw for protection to work. Reg 443.6.1 + Table 443.2 classify equipment by Uw based on overvoltage category. SPD selection: Up must be lower than the lowest Uw of any equipment downstream',
      'Same thing',
      'No relationship',
    ],
    correctIndex: 1,
    explanation:
      'Up vs Uw is the fundamental SPD-equipment coordination: (1) Up (voltage protection level) — maximum voltage that appears across the protected equipment when the SPD operates during a surge. Specified on SPD manufacturer DoC; typical Type 1 Up ~2.5-4 kV, Type 2 Up ~1.5-2.5 kV, Type 3 Up ~1.0-1.5 kV. (2) Uw (rated impulse withstand voltage) — what the equipment can survive without damage. Reg 443.6.1 + Table 443.2 classify equipment by overvoltage category (OVC): Category IV (most robust, origin equipment) Uw 6 kV at 230/400 V; Category III (distribution) Uw 4 kV; Category II (current-using equipment) Uw 2.5 kV; Category I (specially protected electronics) Uw 1.5 kV. (3) Coordination rule (Reg 534.4.4.1): Up < Uw — SPD must limit voltage below equipment\'s withstand. (4) For LCT installs: PV inverters, BESS, EV chargers, smart-meter are Category II (Uw 2.5 kV) — SPD Up at the equipment location must be well below 2.5 kV. (5) Reg 534.4.8: if distance between SPD + protected equipment > 10 m, oscillations can double the voltage at equipment terminals — additional Type 3 SPD close to equipment may be needed. (6) Cert evidence bundle: SPD Up + equipment Uw documented per circuit + Reg 534.4.4.1 compliance.',
  },
  {
    id: 'm11s5-fault-protection',
    question:
      'Per Reg 534.4.6, what must remain effective even if the SPD fails?',
    options: [
      'Nothing',
      'Fault protection (as defined in Chapter 41) must remain effective in the protected installation even in the event of SPD failure. Method: in TN systems, generally via the OCPD on the supply side of the SPD; in TT systems, by the installation\'s RCD or OCPD coordinated with the SPD. SPDs include internal disconnectors (thermal + short-circuit) that disconnect a failed SPD from the supply — but the upstream protective device must still provide fault protection if the disconnector fails',
      'Random',
      'No protection',
    ],
    correctIndex: 1,
    explanation:
      'Reg 534.4.6 covers fault protection during SPD failure. The categorical requirement: fault protection (Chapter 41 ADS — automatic disconnection of supply) must remain effective even if the SPD fails. Failure modes: (1) SPD short-circuits internally (thermal runaway during repeated surge events). (2) SPD\'s internal disconnector trips. (3) SPD ages + impedance changes. (4) Direct lightning strike exceeds SPD energy capability. Coordination per Reg 534.4.6: (a) TN systems — fault protection generally fulfilled by the OCPD on the supply side of the SPD (Figure 16A1 of Appendix 16). SPD\'s own internal disconnector trips first; if it fails, upstream OCPD trips. (b) TT systems — fault protection by the installation\'s RCD or coordinated OCPD. SPD positioned + protected such that any fault current path is sensed by the upstream RCD / OCPD. (c) Internal disconnector — SPDs have built-in thermal + short-circuit disconnectors that disconnect a failed SPD. (d) Designer records: SPD upstream OCPD type + rating + coordination with internal disconnector. Cert evidence bundle: SPD location + OCPD upstream + Reg 534.4.6 compliance.',
  },
  {
    id: 'm11s5-pv-spd-selection',
    question:
      'Per Reg 712.534.102.1, what determines whether a PV install needs Type 1 SPDs?',
    options: [
      'Always Type 1',
      'Generally Type 2 SPDs apply for PV. Type 1 SPDs are required ONLY when (a) protection against direct lightning strokes IS specified (i.e. structure has an external LPS), AND (b) separation distance s between PV + LPS is NOT kept per BS EN 62305-3. When both conditions hold, Type 1 SPDs are required typically in conjunction with Type 2 downstream. For domestic PV without LPS: Type 2 only suffices',
      'Random',
      'Never Type 1',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.534.102.1 is the PV SPD Type-selection rule. Default: Type 2 SPDs apply on PV side. Type 1 trigger: BOTH conditions must hold — (a) direct strike protection is specified for the structure (i.e. external LPS exists), AND (b) separation distance s between PV metal parts + LPS parts is NOT kept per BS EN 62305-3. The two-condition test means: (1) Domestic PV no LPS → Type 2 only (no direct strike protection scope = no Type 1 trigger). (2) Domestic PV with LPS + s kept → Type 2 only (separation maintained = PV "isolated" from LPS = no direct partial current expected). (3) Commercial PV with LPS + s not kept → Type 1 + Type 2 (PV bonded to LPS = direct partial current possible = Type 1 required to handle it + Type 2 downstream for coordinated protection). The "generally in conjunction with Type 2 SPDs" reflects coordinated protection — Type 1 catches direct partial current; Type 2 handles residual + indirect downstream. Cert evidence bundle: BS EN 62305-3 separation distance calculation + Reg 712.534.102.1 SPD selection per the result + manufacturer DoC.',
  },
];

const quizQuestions = [
  {
    question:
      'Reg 443.4.1 (A4:2026 redraft) — when is SPD protection now required?',
    options: [
      'Never',
      'Where consequences could result in: (a) serious injury to or loss of human life; (b) failure of a safety service as defined in Part 2; (c) significant financial or data loss. For all OTHER cases, protection against transient overvoltages shall be provided UNLESS the owner of the installation declares acceptance of the risk. A4:2026 simplified the trigger from a calculated-risk-level method (CRL) to a category test + owner opt-out. Annex A443 (CRL method) was deleted',
      'Random',
      'Only commercial',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 443.4.1 in A4:2026 was redrafted to simplify SPD requirement triggers. New criteria for when SPDs are required: (a) consequence of overvoltage could result in serious injury to / loss of human life; (b) failure of a safety service (as defined in Part 2); (c) significant financial or data loss. For all OTHER cases, SPDs shall be provided UNLESS the owner explicitly accepts the risk in writing. This is an opt-out model, not an opt-in. Practical effect: SPDs are the default expectation in most installs UNLESS owner explicitly opts out. (c) significant financial / data loss typically applies to LCT installs (PV inverter + BESS + EV charger + smart meter all costly + data-rich). Annex A443 (calculated risk level CRL method) was DELETED in A4:2026 — A4:2026 explicitly moved away from the formal calculation to a category-based test. BS EN 62305-2 remains the methodology where a formal risk assessment is appropriate (e.g. high-risk / heritage / commercial). Cert evidence bundle: SPD selection rationale + owner declaration if opted out + risk assessment summary where applied.',
  },
  {
    question:
      'Reg 534.4.4.4 sets the nominal discharge current (In) + impulse discharge current (Iimp). What do these mean for SPD selection?',
    options: [
      'Random',
      'In (nominal discharge current) = the 8/20 µs surge current the SPD can handle multiple times without degradation — Type 2 SPD selection criterion. Iimp (impulse discharge current) = the 10/350 µs partial direct lightning current the SPD can handle — Type 1 SPD selection criterion. Higher In / Iimp = more robust SPD + higher cost. Selection: match Type 2 In to expected indirect surge magnitude; match Type 1 Iimp to expected partial direct current per LPL + current sharing',
      'Same thing',
      'No relevance',
    ],
    correctAnswer: 1,
    explanation:
      'SPD discharge ratings per Reg 534.4.4.4: (1) In (nominal discharge current) — 8/20 µs surge current that the SPD can handle multiple times without performance degradation. Type 2 SPD selection criterion. Typical Type 2 SPDs: In 5 kA, 10 kA, 20 kA, 40 kA, 65 kA. Higher In = better surge handling capability + higher cost. (2) Iimp (impulse discharge current) — 10/350 µs partial direct lightning current that the SPD can handle. Type 1 SPD selection criterion. Typical Type 1 SPDs: Iimp 12.5 kA, 25 kA, 50 kA, 100 kA per pole. Higher Iimp = better direct-strike capability. (3) Selection driven by exposure: Type 2 In matched to expected indirect surge magnitude (depends on supply system, building exposure, BS EN 62305-2 risk assessment); typical residential 5-20 kA, commercial 20-40 kA. Type 1 Iimp matched to expected partial direct current per LPL + current sharing (e.g. 4 down conductors → Iimp ~ Itotal / 4 per conductor); typical LPL III with 4 down conductors → Iimp ~25 kA per conductor. (4) Reg 534.4.4.4.2 + Table 534.4 + Appendix 16 Table 16A4 provide standard values for LPL + system. (5) Cert evidence bundle: SPD In / Iimp ratings per location + selection rationale.',
  },
  {
    question:
      'Reg 534.4.8 — what happens when distance between SPD + protected equipment exceeds 10 m?',
    options: [
      'No effect',
      'Per Reg 534.4.8: if distance between SPD + equipment exceeds 10 m, oscillations could lead to voltage at the equipment terminals up to TWICE the SPD\'s Up. Consideration shall be given to additional coordinated SPDs closer to the equipment. Practical effect: sub-distribution boards may need additional Type 2 / Type 3 SPDs; sensitive electronics within 10 m of a Type 2 SPD; for runs > 10 m to inverter / BESS / sensitive load, place a Type 2 / Type 3 SPD locally',
      'Random',
      'Move the SPD',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 534.4.8 covers the SPD-to-equipment distance effect. Verbatim concept: if the distance between the SPD + the equipment to be protected (protective distance) is greater than 10 m, oscillations could lead to a voltage at the equipment terminals of up to TWICE the SPD\'s voltage protection level (Up). Consequence: the equipment sees a higher transient voltage than Up suggests; the Up < Uw coordination per Reg 534.4.4.1 may fail with the doubled voltage. Solution: additional coordinated SPDs closer to the equipment. Practical install application: (1) Long cable runs from origin SPD to equipment > 10 m — add Type 2 or Type 3 SPD locally at equipment. (2) PV install: inverter typically within 5-10 m of DC SPD at the inverter location → coordination usually OK; sub-array / string SPDs may be needed if string lengths long. (3) Sub-distribution: if sub-board > 10 m from origin SPD, additional Type 2 at sub-board. (4) Sensitive electronics (server, medical, control panel): Type 3 within 10 m even with Type 2 upstream. (5) Cert evidence bundle: SPD distance per protected equipment + Reg 534.4.8 compliance.',
  },
  {
    question:
      'Reg 534.4.2 sets two connection modes for SPDs — common mode + differential mode. What are they?',
    options: [
      'Random',
      '(a) Common mode: between live conductors and PE (line-to-earth, neutral-to-earth). (b) Differential mode: between live conductors (line-to-line, line-to-neutral). Most lightning + surge events drive common-mode current (everything rising vs earth); differential mode is more about local switching events. Modern SPDs typically protect both modes — manufacturer specifies whether it is common-mode, differential-mode, or combined. Reg 534.4.2 says protection shall be provided in one or both modes as appropriate',
      'Same mode',
      'No modes',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 534.4.2 SPD connection modes — verbatim: protection against transient overvoltages shall be provided (a) between live conductors and PE (common mode protection); and/or (b) between live conductors (differential mode protection). NOTE: For further information see DD CLC/TS 61643-12. (1) Common mode — surge appears between live conductor(s) and protective earth (PE). Everything rises vs earth. Typical lightning-related surge (atmospheric origin) is largely common mode — direct or induced strike raises the local potential of all live conductors against the distant ground reference. (2) Differential mode — surge appears between live conductors (line-to-line, line-to-neutral). Typical of local switching events (motor switching, transformer energising), bench-top equipment with internal switching, harmonic-related. (3) Modern SPD products typically protect both modes (combined or coordinated). Manufacturer DoC specifies. (4) For PV / BESS / EV / heat pump LCT applications: common mode dominates (lightning + induced from grid); SPDs combining both modes recommended. (5) Cert evidence bundle: SPD modes per location + manufacturer DoC + Reg 534.4.2 compliance.',
  },
  {
    question:
      'For a typical UK 2025-26 residential PV install — what SPD selection drops out?',
    options: [
      'No SPDs',
      'Typical residential: (1) AC side at consumer unit — Type 2 SPD; common + differential mode; In 5-20 kA; manufacturer DoC; Up < 1.5 kV. (2) DC side near inverter (within 10 m of equipment per Reg 534.4.8) — Type 2 SPD on DC strings; Iimp / In rated for DC waveform; Up matched to inverter Uw. (3) No Type 1 needed (no LPS = no Reg 712.534.102.1 trigger). (4) Owner opt-out option per Reg 443.4.1 unlikely to be taken (LCT install = (c) significant financial loss criterion). Cert evidence: 2 × Type 2 SPDs documented + Reg 712.534.102.1 + Reg 534 compliance',
      'Random',
      'Type 1 only',
    ],
    correctAnswer: 1,
    explanation:
      'Typical UK 2025-26 residential PV (no LPS) SPD selection: (1) AC side at origin (consumer unit) — Type 2 SPD; protects AC side of the inverter + downstream household loads. Common + differential mode protection (combined SPDs typical). In rating: 5-20 kA typical residential; Up < 1.5 kV to coordinate with Category II equipment (Uw 2.5 kV at 230 V single-phase). Connects to CU\'s main earthing terminal. (2) DC side near inverter — Type 2 SPD on PV DC strings, within 10 m of inverter per Reg 534.4.8. DC-rated SPD (different waveform handling from AC); In rating per manufacturer; Up matched to inverter DC-side Uw. Located in DC junction box or integrated into inverter. (3) No Type 1 SPDs — no external LPS on the structure = no Reg 712.534.102.1 Type 1 trigger. (4) Reg 443.4.1 compliance — (c) significant financial / data loss criterion applies to LCT install (PV inverter + BESS + smart meter); SPDs required by default; owner opt-out unlikely. (5) Reg 534.4.6 fault protection — upstream OCPD (CU MCB / RCBO for AC; PV DC isolator + inverter internal protection for DC). (6) Cert evidence bundle: 2 × Type 2 SPDs documented + Reg 712.534.102.1 + Reg 534 + manufacturer DoC + Reg 443.4.1 compliance.',
  },
  {
    question:
      'How does SPD selection scale for a commercial LCT site — 200 kWp PV + 500 kWh BESS + multi-source PEI + existing LPS?',
    options: [
      'Same as domestic',
      'Commercial scale: (1) Type 1 SPDs at origin (LPS present + commercial-scale arrays + likely bonded sections); Iimp rated per LPL + current sharing. (2) Type 2 SPDs at sub-distribution boards (multiple boards across site); In 20-40 kA typical. (3) Type 3 SPDs close to sensitive electronics (EEMS / BMS server, medical / process control). (4) DC SPDs on each string + at inverter; large arrays may have additional in-string SPDs. (5) Coordination across sources per Chapter 82 PEI. Cert evidence bundle: per-board SPD selection + Reg 712.534.102.1 + Reg 534.4 family compliance + LPS specialist sign-off',
      'No commercial SPDs',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Commercial LCT site SPD selection scale: (1) Type 1 SPDs at origin — LPS present + commercial-scale arrays typically have bonded sections (s not always achievable across entire array). Iimp rated per BS EN 62305-1 LPL + current sharing across down conductors. Typical 25-50 kA per pole. (2) Type 2 SPDs at sub-distribution boards — multiple sub-boards across site; each may need its own Type 2; In 20-40 kA typical commercial. Reg 534.4.1.2 LPZ zone-boundary placement. (3) Type 3 SPDs close to sensitive electronics — EEMS / BMS server, control panels, sensitive process control, medical equipment if applicable. Within 10 m per Reg 534.4.8. (4) DC SPDs on each PV string + at inverter — large arrays typically have additional in-string SPDs for long DC runs. (5) BESS DC + AC SPDs — coordinated with PV + other sources per Chapter 82 PEI. (6) EV fleet charging — Type 2 SPDs at submain + at each charger if long runs. (7) Coordination across sources — Reg 826 PEI multi-source rules apply; SPDs selected so each source\'s contribution is protected. (8) LPS specialist sign-off — full BS EN 62305 application typically. (9) Cert evidence bundle: comprehensive — per-board SPD selection + Reg 712.534.102.1 + Reg 534.4 family compliance + LPS specialist sign-off + manufacturer DoCs.',
  },
];

const faqs = [
  {
    question: 'Why was the calculated risk level (CRL) method removed from Reg 443.5 in A4:2026?',
    answer:
      'A4:2026 simplified the SPD requirement trigger. The CRL method (formerly Annex A443) was deleted in favour of the category-based test in Reg 443.4.1 + owner opt-out. The change reduces design complexity for most installs (LCT installs typically trigger the (c) significant financial / data loss criterion); BS EN 62305-2 risk assessment remains the methodology for formal cases.',
  },
  {
    question: 'Can Type 1 + Type 2 be combined in a single SPD device?',
    answer:
      'Yes — manufacturers offer combined Type 1+2 SPDs that meet both standards in a single unit. Useful where a single device covers the origin + immediate downstream protection. Reg 534.4.4.5 covers SPD coordination requirements; combined devices are pre-coordinated by the manufacturer.',
  },
  {
    question: 'What\'s the lifetime of an SPD — do they need replacing?',
    answer:
      'SPDs have a finite life — repeated surge events gradually degrade the internal MOV (metal-oxide varistor) or spark-gap elements. Most SPDs have a visual status indicator (window) showing condition; once flagged failed, replace. Periodic inspection (often as part of EICR / LPS inspection cycle) verifies status. After a known significant surge / strike event, inspect immediately.',
  },
  {
    question: 'Do EV chargers need their own SPD?',
    answer:
      'Typically yes — EV chargers are LCT equipment with significant data + replacement cost; Reg 443.4.1 (c) criterion applies. Type 2 SPD at the EV charger\'s sub-distribution board OR upstream CU usually suffices; check distance to EV charger per Reg 534.4.8 + manufacturer DoC. Some EV chargers include integral SPDs — verify per manufacturer.',
  },
  {
    question: 'What if the customer opts out of SPDs per Reg 443.4.1?',
    answer:
      'Customer must explicitly declare acceptance of the risk in writing — this is the opt-out path. For LCT installs the (c) significant financial / data loss criterion typically applies, making opt-out hard to justify on grounds. Designer records the customer\'s written declaration as part of the cert evidence bundle. Future EICR / inspection sees the documented choice.',
  },
];

export default function RenewableEnergyModule11Section5() {
  const navigate = useNavigate();

  useSEO({
    title: 'BS EN 62305-4 + Section 443 / 534 SPDs | Renewable Energy 11.5 | Elec-Mate',
    description:
      'SPD requirement triggers per Reg 443.4.1 (A4:2026 redraft). Reg 534.4.1.1 Type 1 / 2 / 3 selection by location. Reg 534.4.4 coordination + voltage protection level Up vs equipment Uw. Reg 534.4.8 distance effect. Reg 712.534.102.1 PV SPDs.',
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
            eyebrow="Module 11 · Section 5 · BS 7671 Section 443 + Section 534 · BS EN 62305-4 SPDs"
            title="BS EN 62305-4 + Section 443 / 534 surge protective devices (SPDs)"
            description="Reg 443.4.1 SPD requirement triggers (A4:2026 redraft). Reg 534.4.1.1 Type 1 / 2 / 3 by location. Reg 534.4.4 selection parameters (Up, Uc, In, Iimp). Reg 534.4.6 fault protection. Reg 534.4.8 distance effect. Reg 712.534.102.1 PV SPDs. Cert evidence."
            tone="yellow"
          />

          <TLDR
            points={[
              'A4:2026 redrafted Reg 443.4.1 SPD triggers: required where consequence could cause (a) loss of life, (b) failure of safety service, (c) significant financial / data loss. For other cases: required UNLESS owner opts out in writing. Annex A443 CRL method deleted.',
              'Reg 534.4.1.1: SPDs at origin = Type 1 or Type 2; SPDs close to sensitive equipment = Type 2 or Type 3. Type 1 NOTE = "equipotential bonding SPDs" at origin.',
              'Type 1 = direct lightning current (10/350 µs); Type 2 = indirect surge (8/20 µs); Type 3 = residual + switching transients close to equipment.',
              'Reg 534.4.4.1 coordination: Up (SPD voltage protection level) < Uw (equipment rated impulse withstand voltage). Reg 443.6.1 + Table 443.2 classify equipment by overvoltage category.',
              'Reg 534.4.4.4 + Table 534.4: In (nominal discharge current 8/20 µs) for Type 2; Iimp (impulse discharge current 10/350 µs) for Type 1. Selection per LPL + current sharing.',
              'Reg 534.4.8 distance effect: if SPD-to-equipment > 10 m, voltage at equipment can reach up to 2 × Up due to oscillations. Add Type 2 / Type 3 closer to equipment.',
              'Reg 534.4.6 fault protection: ADS must remain effective if SPD fails. TN: upstream OCPD; TT: RCD or coordinated OCPD. Internal SPD disconnector + upstream protection layered.',
              'Reg 712.534.102.1 PV SPDs: Type 2 generally; Type 1 (with Type 2) only when LPS + s not kept. Most domestic PV = Type 2 only.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply Reg 443.4.1 (A4:2026 redraft) SPD requirement triggers: (a) life, (b) safety service, (c) financial / data loss; owner opt-out for other cases.',
              'Select SPD Type per Reg 534.4.1.1 by location: Type 1 / 2 at origin; Type 2 / 3 close to equipment.',
              'Coordinate Up (SPD voltage protection level) with Uw (equipment impulse withstand voltage) per Reg 534.4.4.1 + Reg 443.6.1 + Table 443.2.',
              'Select In / Iimp per Reg 534.4.4.4 + Table 534.4 + LPL + current sharing.',
              'Apply Reg 534.4.8 distance effect: > 10 m triggers additional SPD consideration.',
              'Configure Reg 534.4.6 fault protection during SPD failure: TN OCPD or TT RCD coordination.',
              'Select PV SPDs per Reg 712.534.102.1: Type 2 generally; Type 1 trigger via LPS + s not kept.',
              'Build cert evidence bundle: SPD per location + Type + In/Iimp/Up + manufacturer DoC + Reg 443/534/712 compliance.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Up below Uw. SPD upstream of equipment within 10 m. Fault protection still works if SPD dies. That\'s the SPD trinity per BS 7671 Section 534.
          </Pullquote>

          <ContentEyebrow>SPD requirement triggers + A4:2026 changes</ContentEyebrow>

          <ConceptBlock
            title="Reg 443.4.1 (A4:2026 redraft) — when SPDs are now required"
            plainEnglish="A4:2026 simplified the SPD requirement test. SPDs are required where the consequence of overvoltage could cause: (a) serious injury or loss of human life; (b) failure of a safety service; (c) significant financial or data loss. For all OTHER cases, SPDs shall be provided UNLESS the owner explicitly accepts the risk in writing. Annex A443 (calculated risk level CRL method) was deleted."
            onSite="UK 2025-26 practical effect: SPDs are the default expectation in most installs unless owner explicitly opts out. LCT installs (PV / BESS / EV / heat pump) typically trigger (c) significant financial / data loss criterion — opt-out is hard to justify on grounds. Designer records SPD selection rationale + customer evidence."
          >
            <p>Reg 443.4.1 A4:2026 redraft detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">(a) Life criterion</strong>
                — consequence of overvoltage could result in serious injury to /
                loss of human life. Applies to: medical equipment, critical care,
                public safety installations
              </li>
              <li>
                <strong className="text-white">(b) Safety service
                  criterion</strong> — failure of a safety service as defined in BS
                7671 Part 2. Applies to: fire alarm, emergency lighting,
                fire-fighting pumps, lifts, smoke control
              </li>
              <li>
                <strong className="text-white">(c) Financial / data
                  loss criterion</strong> — significant financial or data loss. Applies
                to: LCT installs (PV / BESS / EV / smart meter — high replacement
                cost + data); commercial IT; servers; control systems
              </li>
              <li>
                <strong className="text-white">Other cases</strong>
                — SPDs SHALL be provided UNLESS owner explicitly declares acceptance
                of the risk in writing. Opt-out path requires evidence
              </li>
              <li>
                <strong className="text-white">Annex A443 deleted</strong>
                — the calculated risk level (CRL) method (formerly used to determine
                SPD requirement) was deleted in A4:2026. Simpler category-based
                test now applies
              </li>
              <li>
                <strong className="text-white">BS EN 62305-2 role</strong>
                — remains as the formal risk-assessment methodology where appropriate
                (heritage, commercial, high-risk). For most LCT installs the
                Reg 443.4.1 (c) criterion is sufficient justification
              </li>
              <li>
                <strong className="text-white">Practical impact</strong>
                — SPDs now expected in most installs. Owner opt-out documentation
                required if not installed
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — SPD selection rationale + Reg 443.4.1 criterion
                applied + owner opt-out declaration if applicable + design records
              </li>
            </ul>
          </ConceptBlock>

          <SpdCoordination caption="Coordinated Type 1 / 2 / 3 SPDs clamp the surge progressively lower along the installation." />

          <ConceptBlock
            title="Reg 443.4.2 — switching overvoltage protection"
            plainEnglish="Reg 443.4.2 covers protection against switching overvoltages from equipment within the building. Switching overvoltages = transient voltages produced by switching of loads (motor stop / start, transformer energising, capacitor switching, fault clearance). These transients are typically lower magnitude than lightning but higher frequency + occur more often. SPDs (Type 2 / Type 3) handle both lightning-induced + switching surges."
            onSite="LCT installs are switching-rich: PV inverters switch at high frequency; BESS inverters switch bidirectionally; EV chargers switch on / off + at PWM frequency; heat pump VSDs switch at high frequency. Switching overvoltages are continuous low-level events that gradually stress equipment + cumulative SPD activations contribute to SPD ageing. Designer accounts for both lightning + switching SPD scope."
          >
            <p>Reg 443.4.2 switching overvoltage scope:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Sources of switching
                  overvoltage</strong> — motor switching (start / stop); transformer
                energising / de-energising; capacitor switching; fault clearance
                by protective devices; arc events in switchgear
              </li>
              <li>
                <strong className="text-white">LCT-specific sources</strong>
                — PV inverter PWM switching; BESS bidirectional switching; EV
                charger PWM; heat pump VSD switching; on/off cycling of all LCT
                equipment
              </li>
              <li>
                <strong className="text-white">Magnitude</strong>
                — typically lower than lightning-induced surges (hundreds of V to
                low kV); but higher frequency + cumulative
              </li>
              <li>
                <strong className="text-white">SPD coverage</strong>
                — Type 2 + Type 3 SPDs handle switching surges via 8/20 µs +
                combination waveform testing. Designed for both lightning indirect
                + switching events
              </li>
              <li>
                <strong className="text-white">Reg 826.1.4 PEI</strong>
                — Switching overvoltages in a PEI may be more frequent + perhaps
                greater than in a non-PEI installation (due to switching between
                sources, load shedding, load shifting). Consideration is given to
                SPD installation
              </li>
              <li>
                <strong className="text-white">Sensitive electronics</strong>
                — particularly susceptible to switching transients; Reg 534.4.8
                + Type 3 SPDs close to equipment
              </li>
              <li>
                <strong className="text-white">SPD ageing</strong>
                — repeated low-level switching activations accumulate; SPDs need
                visual indicator check + periodic verification
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — SPD selection accounts for both lightning + switching;
                Reg 443.4.2 noted in design records
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 443.4.1 — SPD requirement triggers (A4:2026 redraft)"
            clause="Protection against transient overvoltages shall be provided where the consequence caused by the overvoltage could result in: (a) serious injury to, or loss of, human life; (b) failure of a safety service, as defined in Part 2; and (c) significant financial or data loss. For all other cases, protection against transient overvoltages shall be provided unless the owner of the installation declares acceptance of the risk."
            meaning="Reg 443.4.1 in A4:2026 replaced the previous calculated risk level (CRL) approach with a category test + opt-out model. Three categorical triggers: (a) life risk, (b) safety service failure, (c) significant financial / data loss. For all other cases, SPDs are required UNLESS owner explicitly declines in writing. Practical effect for UK 2025-26 LCT installs: (c) typically applies (LCT equipment is costly + data-rich) — SPDs are the default expectation. Owner opt-out path exists but requires written customer declaration accepted as part of the cert evidence bundle. Annex A443 (CRL method) was deleted — A4:2026 simplified the test. BS EN 62305-2 risk assessment remains the appropriate methodology where a formal assessment is warranted (heritage / high-risk / commercial scale). M11 §5 covers Section 534 SPD selection in depth; M11 §3 + §4 covered BS EN 62305 lightning framework. Cert evidence bundle: Reg 443.4.1 trigger applied + SPD selection rationale + owner opt-out declaration if not installed + BS EN 62305-2 risk summary where applied."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>SPD Type selection + coordination per Section 534</ContentEyebrow>

          <Pullquote>
            Three Types, three jobs, three locations. Type 1 catches the lightning at the door; Type 2 cleans up downstream; Type 3 wraps up the last 10 metres to the sensitive electronics.
          </Pullquote>

          <ConceptBlock
            title="SPD Types — what each is for"
            plainEnglish="Three Types of SPD, each tested + classified to handle different threat profiles. Type 1 = direct partial lightning current (10/350 µs waveform); used where partial direct current can reach the SPD (origin of installation in structure with LPS). Type 2 = indirect surge current (8/20 µs waveform); used downstream of Type 1 OR at origin where no LPS. Type 3 = residual + switching transients close to sensitive equipment (combination waveform)."
            onSite="UK 2025-26 residential without LPS: Type 2 at CU + Type 2 at DC near inverter. Commercial with LPS: Type 1 at origin + Type 2 at sub-boards + Type 3 close to sensitive electronics. Always check manufacturer DoC for the test class + parameters."
          >
            <p>SPD Type detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Type 1 SPD</strong>
                — tested with 10/350 µs impulse waveform; classified by Iimp (impulse
                discharge current). Used at origin in structure with external LPS
                — handles partial direct lightning current that arrives at the
                installation entry. NOTE: Reg 534.4.1.1 — Type 1 SPDs are often
                referred to as "equipotential bonding SPDs"
              </li>
              <li>
                <strong className="text-white">Type 2 SPD</strong>
                — tested with 8/20 µs surge waveform; classified by In (nominal
                discharge current). Used at LPZ 1/2 boundary (sub-boards), OR at
                origin where no external LPS. Handles indirect lightning surge +
                switching surge
              </li>
              <li>
                <strong className="text-white">Type 3 SPD</strong>
                — tested with combination waveform; for residual surge after upstream
                SPDs + switching transients originating within the building. Used
                close to sensitive equipment (within 10 m per Reg 534.4.8 if Type 2
                is upstream + &gt; 10 m away)
              </li>
              <li>
                <strong className="text-white">Combined Type 1+2</strong>
                — manufacturers offer combined devices that meet both Type 1 + Type
                2 standards in a single SPD. Useful where a single unit covers
                origin + immediate downstream protection
              </li>
              <li>
                <strong className="text-white">Combined Type 2+3</strong>
                — manufacturers offer combined Type 2 + Type 3 devices for
                sub-distribution where local sensitive equipment is within range
              </li>
              <li>
                <strong className="text-white">Test waveforms</strong>
                — defined in EN 61643-11 (BS EN 61643-11 in UK). Type 1 = 10/350 µs;
                Type 2 = 8/20 µs; Type 3 = combination
              </li>
              <li>
                <strong className="text-white">PV-specific</strong>
                — PV-DC SPDs tested differently (DC waveforms + DC switching);
                manufacturer DoC specifies. Reg 712.534.102.1 references the Type
                framework
              </li>
              <li>
                <strong className="text-white">Cert evidence</strong>
                — SPD Type + test waveform + manufacturer DoC documented per location
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 534.4.4 — SPD selection parameters"
            plainEnglish="Reg 534.4.4 lists the parameters considered for SPD selection: (a) voltage protection level Up vs equipment Uw; (b) continuous operating voltage Uc vs supply system; (c) nominal discharge current In or impulse discharge current Iimp; (d) SPD coordination; (e) expected short-circuit current Iscc. Manufacturer DoC declares each; designer matches to install."
            onSite="The SPD product DoC declares all these parameters; designer matches them to the install. Typical UK 2025-26 residential Type 2 SPD spec: Uc 275-385 V (1-phase 230 V system); Up < 1.5 kV; In 5-20 kA; Iscc 25 kA. Commercial Type 1+2: Uc per system; Up < 2.5 kV; Iimp 25-50 kA; In 20-40 kA; Iscc per supply."
          >
            <p>Reg 534.4.4 SPD selection parameters:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Up — voltage
                  protection level</strong> — Reg 534.4.4.1 + 443.6.1. Maximum voltage
                across protected equipment during SPD operation. Must be &lt; Uw (equipment
                rated impulse withstand voltage)
              </li>
              <li>
                <strong className="text-white">Uw — equipment
                  rated impulse withstand</strong> — Reg 443.6.1 + Table 443.2.
                Category IV (origin) 6 kV; Category III (distribution) 4 kV;
                Category II (current-using) 2.5 kV; Category I (specially
                protected) 1.5 kV. At 230/400 V nominal
              </li>
              <li>
                <strong className="text-white">Uc — continuous
                  operating voltage</strong> — Reg 534.4.4.3. Maximum voltage that
                can be continuously applied to the SPD without operation. Must be
                ≥ nominal supply voltage. Typical 275-385 V for 230 V systems
              </li>
              <li>
                <strong className="text-white">In — nominal discharge
                  current</strong> — Reg 534.4.4.4. For Type 2 SPDs; 8/20 µs surge
                current the SPD handles multiple times. 5 kA, 10 kA, 20 kA, 40 kA,
                65 kA typical values
              </li>
              <li>
                <strong className="text-white">Iimp — impulse
                  discharge current</strong> — Reg 534.4.4.4. For Type 1 SPDs;
                10/350 µs partial direct lightning current. 12.5 kA, 25 kA, 50 kA,
                100 kA per pole typical
              </li>
              <li>
                <strong className="text-white">Coordination
                  (Reg 534.4.4.5)</strong> — SPDs in series (Type 1 + Type 2 + Type 3)
                must coordinate — each handles its expected range without
                overloading downstream devices
              </li>
              <li>
                <strong className="text-white">Iscc — expected
                  short-circuit current</strong> — Reg 534.4.4.6. SPD must withstand
                + interrupt the prospective short-circuit current at its install
                location. Typical 6-25 kA depending on supply
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — per-SPD selection record: Type, Uc, Up, In/Iimp,
                Iscc + manufacturer DoC + Reg 534.4.4 compliance
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 534.4.1.1 — SPD Type by location"
            clause="Where SPDs are required: (a) SPDs installed at the origin of the electrical installation shall be Type 1 or Type 2; (b) SPDs installed close to sensitive equipment to further protect against switching transients originating within the building shall be Type 2 or Type 3. NOTE: Type 1 SPDs are often referred to as equipotential bonding SPDs and are fitted at the origin of the electrical installation."
            meaning={`Reg 534.4.1.1 codifies the SPD Type-by-location rule. (a) Origin SPDs: Type 1 (where external LPS) or Type 2 (where no LPS). (b) Equipment-local SPDs: Type 2 or Type 3. Combined with Reg 534.4.1.2 LPZ-boundary rule, the practical placement strategy is: (1) Origin (LPZ 0/1 boundary) — Type 1 if LPS present, Type 2 otherwise. (2) Sub-distribution (LPZ 1/2 boundary) — Type 2. (3) Equipment-local (LPZ 2/3 boundary) — Type 3 within 10 m of sensitive equipment per Reg 534.4.8. NOTE on Type 1 = "equipotential bonding SPDs" — they bond the surge current to the equipotential earth system during a strike, equalising potential between live conductors + PE. Cert evidence bundle: SPD layout diagram showing locations + Types + Reg 534.4.1.1 + Reg 534.4.1.2 compliance + manufacturer DoCs.`}
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>SPD distance effect + fault protection</ContentEyebrow>

          <ConceptBlock
            title="Reg 534.4.8 — the 10 m distance rule"
            plainEnglish="If the distance between an SPD + the equipment it protects is more than 10 m, oscillations in the cable can produce a voltage at the equipment terminals of up to TWICE the SPD\'s voltage protection level Up. The Reg 534.4.4.1 Up < Uw coordination breaks. Solution: additional coordinated SPDs closer to the equipment (Type 2 or Type 3)."
            onSite="Practical impact: a Type 2 SPD at the consumer unit protects equipment within 10 m well. Equipment > 10 m from the SPD (sub-distribution boards, distant inverters, EV chargers at end of long submains) needs additional local SPDs to maintain the Up < Uw coordination. Cert evidence: distance per SPD-protected-equipment pair documented."
          >
            <p>Reg 534.4.8 distance effect detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">The mechanism</strong>
                — cable inductance + capacitance form an oscillating circuit when
                the SPD operates (sudden current change). Voltage at the equipment
                terminals can be up to 2 × Up due to oscillation peaks
              </li>
              <li>
                <strong className="text-white">Threshold</strong>
                — Reg 534.4.8 specifies 10 m as the practical threshold beyond which
                oscillations significantly affect equipment voltage
              </li>
              <li>
                <strong className="text-white">Effect on
                  coordination</strong> — if Up doubles at the equipment, the
                Up &lt; Uw coordination per Reg 534.4.4.1 may fail; equipment sees
                higher transient than design
              </li>
              <li>
                <strong className="text-white">Solution 1</strong>
                — add coordinated SPD (Type 2 or Type 3) closer to the equipment
                — within 10 m
              </li>
              <li>
                <strong className="text-white">Solution 2</strong>
                — select SPD at origin with lower Up so that 2 × Up still &lt; Uw at
                equipment (less common; usually cheaper to add local SPD)
              </li>
              <li>
                <strong className="text-white">Solution 3</strong>
                — reduce cable run if practical (rare to be feasible after design)
              </li>
              <li>
                <strong className="text-white">LCT applications</strong>
                — PV inverter typically 5-10 m from DC SPD at the inverter location
                (within tolerance); long DC string runs (&gt; 10 m to inverter) may
                need additional string-level SPDs. EV chargers at end of long
                submain need local SPD
              </li>
              <li>
                <strong className="text-white">Cert evidence</strong>
                — SPD location vs protected equipment distance documented +
                Reg 534.4.8 compliance per circuit
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 534.4.6 — fault protection when SPD fails"
            plainEnglish="SPDs have a finite life + can fail. Reg 534.4.6: fault protection (ADS per Chapter 41) must remain effective even if the SPD fails. Method: TN systems — upstream OCPD on the supply side of the SPD generally fulfils fault protection. TT systems — coordinated RCD or OCPD. SPDs have internal disconnectors but upstream protection is the safety backstop."
            onSite="SPD failure modes: thermal failure (cumulative heat from repeated surges), short-circuit failure, end-of-life impedance drift. Internal disconnector typically trips first; upstream OCPD trips if disconnector fails. Designer specifies upstream protective device + verifies coordination at install."
          >
            <p>Reg 534.4.6 fault protection chain:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">SPD failure modes</strong>
                — (1) thermal: cumulative heat from repeated MOV activations leads
                to thermal runaway. (2) short-circuit: severe surge exceeds energy
                capability + SPD shorts. (3) end-of-life: impedance drift after
                many minor surges
              </li>
              <li>
                <strong className="text-white">Internal disconnector</strong>
                — most modern SPDs include a thermal disconnector (responds to
                thermal failure) + short-circuit disconnector (responds to MOV
                short). Visual status indicator window
              </li>
              <li>
                <strong className="text-white">TN systems
                  (Reg 534.4.6(a))</strong> — fault protection generally fulfilled
                by the OCPD on the supply side of the SPD. Appendix 16 Figure 16A1
                illustrates. The OCPD is rated + coordinated with the SPD\'s
                internal disconnector
              </li>
              <li>
                <strong className="text-white">TT systems
                  (Reg 534.4.6(b))</strong> — fault protection by the installation\'s
                RCD or coordinated OCPD. SPD positioned so any fault current path
                is sensed by upstream RCD
              </li>
              <li>
                <strong className="text-white">Status monitoring</strong>
                — SPDs have visual status indicators (window: green = OK, red =
                failed). Periodic inspection (often part of EICR / LPS inspection)
                verifies. After known significant surge / strike event, inspect
                + replace if flagged
              </li>
              <li>
                <strong className="text-white">SPD replacement</strong>
                — once flagged failed, replace promptly. The internal disconnector
                may have isolated the SPD but the protection is gone — equipment
                downstream is unprotected until replacement
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — SPD upstream OCPD specification + Reg 534.4.6
                compliance + customer instruction sheet on visual status check
              </li>
              <li>
                <strong className="text-white">EICR scope</strong>
                — verifier records SPD status during EICR; failed SPDs flagged for
                replacement
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.534.102.1 — PV SPD Type selection (re-cited)"
            clause="Generally, SPDs shall be Type 2. If protection against effects of direct lightning strokes is specified and separation distance, s, is not kept in accordance with BS EN 62305-3, Type 1 SPDs shall be used (generally in conjunction with Type 2 SPDs)."
            meaning="Reg 712.534.102.1 is the PV-specific SPD Type-selection rule. Default: Type 2 on PV side. Type 1 trigger: BOTH (a) direct strike protection specified (LPS present) AND (b) separation distance s not kept per BS EN 62305-3. When both conditions hold, Type 1 SPDs are required typically with Type 2 downstream — coordinated protection. The vast majority of UK 2025-26 domestic PV installs have no LPS → Type 2 only. Commercial / industrial PV with existing LPS may trigger Type 1 if array geometry forces non-isolated layout. Cert evidence bundle: BS EN 62305-3 separation calculation + Reg 712.534.102.1 SPD selection + manufacturer DoC. For DC-side PV SPDs, manufacturer DoC declares DC waveform handling + DC switching capability — DC SPDs differ from AC SPDs. Reg 534.4 family parameters (Up, Uc, In/Iimp, Iscc) apply to both AC + DC SPDs."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="Typical UK 2025-26 domestic PV + BESS + EV — SPD scope"
            situation="3-bed semi, 5 kWp PV + 9 kWh BESS + 7 kW EV charger; no external LPS on building; suburban location. Post-A4:2026 install."
            whatToDo="SPD selection chain: (1) Reg 443.4.1 trigger — (c) significant financial / data loss applies (LCT install £15-20k value); SPDs required by default; no owner opt-out. (2) Reg 712.534.102.1 — Type 2 only (no LPS = no Type 1 trigger). (3) AC origin SPD — Type 2 at CU; Uc 275-385 V; Up < 1.5 kV; In 10-20 kA; Iscc 6-10 kA per supply; combined common + differential mode; manufacturer DoC. (4) PV DC SPD — Type 2 on DC strings near inverter (inverter within 10 m of CU typically, but Reg 534.4.8 distance check confirms); DC waveform-rated; Up matched to inverter DC Uw. (5) BESS DC + AC — BESS inverter typically integrates SPDs; verify per manufacturer DoC; supplementary external Type 2 if Reg 534.4.8 distance > 10 m or manufacturer recommends. (6) EV charger — Type 2 SPD at EV charger sub-distribution OR integrated in charger per manufacturer DoC; coordinate with CU Type 2; Reg 534.4.8 distance check. (7) No Type 3 required typically — domestic equipment within 10 m of upstream Type 2 in most cases. (8) Reg 534.4.6 fault protection — TN-C-S supply; upstream MCBs / RCBOs at CU + SPD internal disconnectors layered. (9) Cert evidence bundle — SPDs documented (Type 2 × 3-4 locations) + manufacturer DoCs + Reg 443.4.1 + Reg 712.534.102.1 + Reg 534.4 family compliance + EIC."
            whyItMatters="Typical UK 2025-26 domestic LCT pattern. SPD scope is bounded + clear under A4:2026. Designer-led + electrician-installed. Customer evidence: ~3-4 SPDs documented + Reg 443.4.1 (c) criterion + manufacturer DoCs. Future EICR + LPS inspection cycle verifies SPD status."
          />

          <Scenario
            title="Commercial PV + LPS + multi-source PEI"
            situation="200 kWp PV + 500 kWh BESS + 4 × commercial EV chargers on a 1990s warehouse with existing LPS (BS 6651 era, upgraded to current BS EN 62305-3 as part of project). Chapter 82 PEI scope. UK 2025-26 commercial."
            whatToDo="Multi-tier SPD design: (1) Origin Type 1 SPDs — LPS present + array sections bonded (s not kept across full geometry); Iimp 25-50 kA per pole rated for LPL II current sharing; at AC origin + at DC entry to building per Reg 712.534.102.1 + Reg 534.4.1.1. (2) Type 2 SPDs at sub-distribution boards — multiple sub-boards across site (PV sub-board, BESS sub-board, EV charging sub-board, general loads); In 20-40 kA per board; Reg 534.4.1.2 LPZ-boundary placement. (3) Type 3 SPDs close to sensitive electronics — EEMS / BMS control panel, server room, sensitive control PLCs; within 10 m per Reg 534.4.8. (4) DC SPDs — Type 1 + Type 2 on PV DC at strings + inverters; manufacturer-specific DoC for DC waveform + DC switching; long DC string runs may need additional in-string SPDs. (5) BESS DC + AC SPDs — coordinated with PV; Chapter 82 PEI multi-source consideration. (6) EV charger SPDs — Type 2 at each sub-board + Type 2 or integral per charger; Reg 534.4.8 distance per charger location. (7) Reg 534.4.6 fault protection — TN-S supply typical commercial; coordinated upstream OCPDs + RCDs; SPD internal disconnectors layered. (8) Cert evidence bundle — comprehensive: 15-25 SPDs documented across site; per-board selection record; Reg 443.4.1 + Reg 712.534.102.1 + Reg 534.4 family + Reg 826.1.4 PEI compliance; LPS specialist sign-off; manufacturer DoCs; multi-tier diagram; commercial EIC. ~10-20 pages."
            whyItMatters="Commercial LCT site = multi-tier SPD scope. Investment in SPDs is small fraction of total install cost; protection of inverters + BESS + EV chargers + EEMS + control systems is high-value. Multi-trade delivery: LPS specialist + designer + electrician + EEMS commissioner. Cert evidence bundle comprehensive + insurance-ready."
          />

          <CommonMistake
            title="Treating Reg 443.4.1 opt-out as the default path"
            whatHappens={`Installer skips SPDs on a domestic LCT install + writes "owner accepted risk" on the EIC without an actual owner declaration. Customer didn't understand the risk + had no written choice. First serious surge: inverter destroyed; insurance claim challenges competent install. Designer/installer in difficulty.`}
            doInstead="Reg 443.4.1 (A4:2026) opt-out requires explicit owner declaration in writing. For LCT installs the (c) significant financial / data loss criterion typically applies — opt-out is hard to justify on grounds. Default position: install SPDs. If owner explicitly wants to opt out, written declaration + designer brief on the residual risk + customer acceptance documented. Cert evidence bundle includes the declaration. Without it, the absence of SPDs is a Reg 443.4.1 breach."
          />

          <CommonMistake
            title="Ignoring Reg 534.4.8 distance to far equipment"
            whatHappens={`Installer fits Type 2 SPD at CU + assumes all equipment is protected. EV charger at end of 25 m submain has no local SPD. Voltage at the charger during a surge event reaches up to 2 × Up = 3 kV, exceeding the charger's Category II Uw of 2.5 kV. Charger destroyed.`}
            doInstead={`Always check Reg 534.4.8 distance per SPD-protected-equipment pair. > 10 m = additional local SPD (Type 2 or Type 3 per location). Manufacturer DoCs often specify minimum SPD location for that equipment. Cert evidence: distance documented per protected equipment + Reg 534.4.8 compliance + additional SPDs installed where required.`}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A4:2026 redrafted Reg 443.4.1 SPD triggers: (a) life, (b) safety service, (c) financial / data loss + owner opt-out for other cases. Annex A443 CRL method deleted.',
              'LCT installs typically trigger (c) significant financial / data loss — SPDs are default expectation; owner opt-out is hard to justify on grounds.',
              'Reg 534.4.1.1: SPDs at origin = Type 1 (LPS present) or Type 2 (no LPS); SPDs close to sensitive equipment = Type 2 or Type 3.',
              'Reg 534.4.1.2: LPZ-boundary placement — SPD at each cable crossing of LPZ interfaces.',
              'Type 1 = direct partial lightning (10/350 µs, Iimp); Type 2 = indirect surge (8/20 µs, In); Type 3 = residual + switching close to equipment.',
              'Reg 534.4.4.1 coordination: Up (SPD voltage protection level) < Uw (equipment Uw). Reg 443.6.1 + Table 443.2 OVC: IV 6 kV, III 4 kV, II 2.5 kV, I 1.5 kV.',
              'Reg 534.4.8 distance: > 10 m between SPD + equipment can produce up to 2 × Up at equipment terminals. Add local SPD.',
              'Reg 534.4.6 fault protection: ADS must remain effective if SPD fails. TN: upstream OCPD; TT: RCD or coordinated OCPD.',
              'Reg 712.534.102.1 PV: Type 2 generally; Type 1 (with Type 2) only when LPS + s not kept. Most domestic PV = Type 2 only.',
              'Reg 826.1.4 PEI: switching overvoltages may be more frequent in multi-source PEI. SPD scope considered for PEI sites.',
              'Cert evidence bundle: SPDs per location + Type + Uc + Up + In/Iimp + Iscc + manufacturer DoCs + Reg 443.4.1 + Reg 534.4 family compliance + Reg 712.534.102.1 (for PV).',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 5 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-11-section-4')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                11.4 BS EN 62305-3 LPS for PV / wind
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-11-section-6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                11.6 Fault contribution from multi-source sites
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
