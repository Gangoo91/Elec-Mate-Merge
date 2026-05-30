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
    id: 'm6s7-smart-regs-scope',
    question:
      'The UK Electric Vehicles (Smart Charge Points) Regulations 2021 apply to which installs?',
    options: [
      'Only commercial',
      'All charge points sold or installed in the UK from 30 June 2022 onward for use in domestic / workplace (charging private vehicles). Exemptions for some public / specific commercial uses. The regulations are statutory — not BS 7671 — but binding on UK installs',
      'Only after 2025',
      'Only EVs older than 5 years',
    ],
    correctIndex: 1,
    explanation:
      'UK Electric Vehicles (Smart Charge Points) Regulations 2021 (SI 2021/1467) came into force 30 June 2022 (smart functionality requirements) and 30 December 2022 (security requirements). Apply to: chargepoints sold or installed in Great Britain for use in domestic premises OR a workplace. Exemptions: rapid chargepoints (Mode 4 DC); chargepoints designed solely for personal use by employees on the employer’s premises (some narrow cases); chargepoints exclusively for fleet vehicles (some cases). Statutory regulations — separate from BS 7671 but binding on UK installs. Cert evidence bundle records the install date + the manufacturer DoC for SCP Regulations compliance.',
  },
  {
    id: 'm6s7-default-off-peak',
    question: 'What is the "default off-peak charging" requirement?',
    options: [
      'No charging during peak',
      'The chargepoint must be PRE-CONFIGURED at install to default to charging only during off-peak hours (08:00-11:00 and 16:00-22:00 EXCLUDED in the default; charging permitted outside these hours). Customer can override on the device for an individual session, but the device returns to off-peak default. Aim: shift EV charging away from grid peak demand without customer-side intervention',
      'Customer chooses',
      'No requirement',
    ],
    correctIndex: 1,
    explanation:
      'Default off-peak charging — the SCP Regulations 2021’s flagship requirement. Chargepoints must be pre-configured to NOT charge during peak hours (08:00-11:00 and 16:00-22:00, Monday-Friday) by default. Charging during these hours is permitted only if the customer actively overrides for an individual session. The default returns automatically. Aim: smooth UK grid demand by shifting EV charging to overnight + weekend windows when grid capacity is plentiful and renewables / nuclear baseload dominate. Reduces peak-shaving requirements + cost-shifts to customer via off-peak tariff savings. Reg 722.311.201 load curtailment carve-out enables the regulatory framework.',
  },
  {
    id: 'm6s7-randomised-delay',
    question: 'What is the "randomised delay" requirement?',
    options: [
      'No delay',
      'When a charging schedule begins (off-peak window opens), the chargepoint must wait a RANDOM duration of up to 600 seconds (10 minutes default) before actually starting to draw current. Prevents the entire UK’s EVs all simultaneously drawing at 23:30:00 sharp, which would create a synchronised grid demand spike. Customer can override delay for an individual session',
      'Always 1 hour delay',
      'Customer sets the delay',
    ],
    correctIndex: 1,
    explanation:
      'Randomised delay = up to 600 seconds (10 min) random wait between schedule start and actual current draw. The SCP Regulations 2021 require this on all UK domestic / workplace chargepoints. The aim is to prevent a synchronised demand spike — if every UK EV starts charging at exactly 02:00 on Octopus Intelligent Go, the grid would see a multi-GW jump in seconds. Spreading the start across a 10-minute random window smooths the ramp-up. Customer can override the delay for individual sessions (e.g. "charge immediately" override on the app), but the default randomised delay returns. Cert evidence bundle records the chargepoint’s SCP Regulations compliance via manufacturer DoC.',
  },
  {
    id: 'm6s7-tariff-octopus-go',
    question: 'Octopus Intelligent Go EV tariff — what is the typical UK 2025-26 structure?',
    options: [
      'Same rate all day',
      'Cheap rate ~7p/kWh between 23:30 and 05:30 (6-hour window); standard rate ~27p/kWh outside that window (varies). The "Intelligent" element: Octopus integrates with the customer’s EV / wallbox to schedule charging within the cheap window. Customer can charge at any time but at very different rates',
      'Free between 00:00 and 24:00',
      'Cheap rate at 12:00-13:00 only',
    ],
    correctIndex: 1,
    explanation:
      'Octopus Intelligent Go (UK 2025-26 typical): ~7p/kWh between 23:30 and 05:30; ~27p/kWh standard rate at all other times. Verify current rates at install time (tariffs change). The "Intelligent" feature: Octopus connects to the customer’s vehicle (via OEM API — Tesla, VW Group, Volvo, Renault, Polestar etc.) or to the wallbox (Ohme, MyEnergi, Wallbox etc.) and schedules charging within the cheap window automatically. Customer plugs in at 18:00; the system waits, then charges at 7p/kWh from 23:30 onwards. Tariff savings for typical UK 50 km/day driver: ~£300-£600/year vs flat-rate import. Cert evidence bundle records the tariff in the customer handover pack.',
  },
];

const quizQuestions = [
  {
    question:
      'A wallbox installed in 2020 (before the SCP Regulations 2021 came into force) doesn’t have smart-charging functionality. Is it currently compliant?',
    options: [
      'Yes — pre-2022 grandfather rights',
      'The SCP Regulations 2021 apply to chargepoints SOLD OR INSTALLED from 30 June 2022 onward. A 2020-installed chargepoint is not retroactively non-compliant. However: best-practice EICR notes the SCP-Regs status and recommends upgrade if practical. Customer may benefit from upgrading to a smart chargepoint to access EV tariffs (savings typically pay back the upgrade in 1-2 years)',
      'No — must be removed',
      'No — must be retrofitted',
    ],
    correctAnswer: 1,
    explanation:
      'SCP Regulations 2021 apply prospectively to chargepoints sold / installed from 30 June 2022 (smart functionality) and 30 December 2022 (security). Pre-2022 installs are not retroactively non-compliant — they predate the regulations. However: customers may benefit from upgrading to a smart chargepoint to access EV tariffs (Octopus Intelligent Go etc.). EICR best-practice: note the pre-SCP status, recommend upgrade if customer wants tariff access. Cert evidence bundle records the install date + the regulatory framework at that time.',
  },
  {
    question:
      'An installer is asked to commission a 2025-26-new wallbox. What SCP Regulations compliance evidence should be in the cert evidence bundle?',
    options: [
      'Just the install date',
      'Manufacturer Declaration of Conformity citing SCP Regulations 2021 compliance: (1) default off-peak charging configured; (2) randomised delay enabled (up to 600 s); (3) security requirements per BS EN IEC 63110 / 63119 / NCSC IoT guidance referenced; (4) data privacy compliance per UK GDPR. Plus customer handover documentation explaining the default schedule + override mechanism',
      'Customer’s signature only',
      'No evidence needed',
    ],
    correctAnswer: 1,
    explanation:
      'Cert evidence bundle for SCP Regulations 2021 compliance: (1) manufacturer DoC explicitly citing compliance; (2) default off-peak schedule pre-configured (charged in factory; verify at commissioning); (3) randomised delay enabled and configured per the regulations; (4) security / cybersecurity standards referenced (typically BS EN IEC 63110 series for EV charging communications; UK NCSC IoT security guidance); (5) data privacy per UK GDPR if the chargepoint uses cloud services. Customer handover: explain the default off-peak schedule + how to override for one-off sessions + tariff integration if applicable. Without this documentation, the install isn’t SCP-Regs compliant even if the wallbox is.',
  },
  {
    question:
      'A customer wants to charge their EV at 19:00 during the SCP-Regs default peak window. Can they?',
    options: [
      'No — illegal',
      'Yes — the customer can override the default off-peak schedule for an individual charging session. The override is per-session (one-off "charge now") and the default off-peak returns automatically for subsequent sessions. Some wallboxes / apps make this explicit; others use a button or app-toggle. UK SCP-Regs intent: encourage off-peak but not prohibit on-peak; customer choice on individual sessions',
      'Only with DNO permission',
      'Only by tariff change',
    ],
    correctAnswer: 1,
    explanation:
      'SCP Regulations 2021 require DEFAULT off-peak; customer override for individual sessions is explicitly permitted. The chargepoint returns to the default off-peak schedule after the override session completes. Customer benefit: occasional emergency / high-priority charging (e.g. "drive to hospital this evening") can override the schedule. Tariff side: charging at 19:00 on Intelligent Go costs ~27p/kWh vs 7p off-peak — customer pays the premium for the override. Cert evidence bundle for the install documents the default schedule + override mechanism; customer handover explains both.',
  },
  {
    question:
      'Octopus Flux vs Intelligent Go — which is appropriate for a customer with PV + BESS + EV?',
    options: [
      'Same thing',
      'Flux is designed for PV + BESS + EV households: ~33p/kWh export during 16:00-19:00; ~12p/kWh import 02:00-05:00; encourages exporting excess PV during expensive grid hours + charging BESS / EV during cheap window. Intelligent Go is single-purpose EV-charging-focused: 7p import 23:30-05:30 only. PV + BESS customers usually pick Flux; EV-only customers usually pick Intelligent Go',
      'Flux is just public',
      'Intelligent Go is illegal',
    ],
    correctAnswer: 1,
    explanation:
      'Octopus Flux (UK 2025-26 typical): export ~33p/kWh 16:00-19:00 (encourage exporting expensive grid hours); import ~12p/kWh 02:00-05:00 (charge BESS / EV cheaply); standard rate ~28p/kWh other hours. Designed for prosumer households with PV + BESS + EV. Octopus Intelligent Go: import ~7p/kWh 23:30-05:30; standard ~27p other hours. Single-purpose EV-tariff. Customer’s setup determines the tariff choice. The wallbox install is compatible with both; the smart-charging schedule is configured to match the tariff windows. Cert evidence bundle records the tariff at handover; customer can switch later (tariff changes don’t require wallbox change).',
  },
  {
    question:
      'A customer wants the wallbox to charge the EV from their PV surplus during the day (when PV is generating excess). What’s the install consideration?',
    options: [
      'Not possible',
      'PV-tracking ("solar diverter") functionality — the wallbox monitors household PV generation + consumption; when there’s surplus PV being exported, the wallbox charges the EV at the surplus rate. Some wallboxes (MyEnergi Zappi was the original; Hypervolt Home 3 Pro; some Wallbox + Easee variants) include this functionality. Requires CT clamp installation to read household generation. Customer benefit: self-consume PV via EV instead of exporting at low SEG rate',
      'Always on by default',
      'Illegal under SCP',
    ],
    correctAnswer: 1,
    explanation:
      'PV-tracking / solar diverter functionality lets the wallbox match its EV charge rate to the PV surplus in real time. Customer benefit: self-consume PV (avoid ~25p/kWh import) instead of exporting at ~5-15p/kWh SEG rate. CT clamp installation on the incoming tails reads generation; wallbox calculates surplus; CP duty cycle announces matching current. Brands with this functionality: MyEnergi Zappi (the original UK product with this feature); Hypervolt Home 3 Pro; some Wallbox / Easee variants. Cert evidence bundle records the CT clamp installation + PV-tracking configuration + customer handover education on the feature.',
  },
  {
    question:
      'The SCP Regulations 2021 security requirements reference cybersecurity standards. Why does an EV chargepoint need cybersecurity?',
    options: [
      'No reason',
      'Modern smart chargepoints are connected devices: cloud services for scheduling, OEM vehicle API access, customer app, OTA firmware updates. Each is an attack surface. Compromise could (1) maliciously turn EVs on/off en masse to attack the grid; (2) steal customer data (driving patterns, tariff usage); (3) modify firmware to bypass safety features. SCP-Regs require security per recognised standards (BS EN IEC 63110 + NCSC IoT guidance)',
      'Random',
      'For warranty',
    ],
    correctAnswer: 1,
    explanation:
      'Smart EV chargepoints are connected IoT devices — multiple attack surfaces (cloud APIs, mobile apps, firmware updates, vehicle communication). Threats: (1) grid attacks — coordinated mass-turning-on of EVs to overload local distribution; (2) data exfiltration — customer driving patterns, location, tariff data; (3) firmware tampering — bypass safety features. SCP Regulations 2021 require security measures aligned with recognised cybersecurity standards including BS EN IEC 63110 series (EV charging communications) and UK NCSC IoT security guidance. Manufacturer DoC declares compliance; installer verifies in cert evidence bundle. UK 2025-26 reality: reputable wallbox brands meet these requirements as standard; budget / no-name brands sometimes don’t.',
  },
];

const faqs = [
  {
    question: 'Are the SCP Regulations 2021 the same as BS 7671?',
    answer:
      'No — separate frameworks. BS 7671 (Section 722) covers the electrical wiring and protective measures. The Smart Charge Points Regulations 2021 are statutory (UK Government — SI 2021/1467) and cover smart functionality, default off-peak charging, randomised delay, security, and data privacy. Both apply to UK domestic EV install. Cert evidence bundle integrates both: BS 7671 / Section 722 compliance + SCP Regs compliance.',
  },
  {
    question: 'How is the default off-peak schedule actually set?',
    answer:
      'Manufacturer configures the default in factory firmware. At commissioning, the installer verifies the default is active (typically shown in the wallbox app or display: "Charging restricted: 08:00-11:00 and 16:00-22:00 Mon-Fri"). Customer can use the app to set up their own preferred schedule (e.g. align with Octopus Intelligent Go cheap window 23:30-05:30); the off-peak default is still active outside of that customer-defined window. Customer can override per-session.',
  },
  {
    question: 'How long is the randomised delay typically?',
    answer:
      'Up to 600 seconds (10 minutes) per the SCP Regulations 2021. Each wallbox generates a random delay value between 0 and 600 seconds at each schedule start. The result: UK’s overnight charging starts spread evenly across the 10 minutes after schedule open, rather than all at once. Customer can configure to disable the delay for individual sessions (e.g. "charge immediately") but the default returns.',
  },
  {
    question: 'What if the customer’s wallbox brand goes out of business?',
    answer:
      'Real risk in a fast-moving market. The wallbox typically keeps working — the SCP-Regs compliance is built into the device firmware. Smart-charging features (cloud scheduling, OEM vehicle API integration) may stop working if the cloud service shuts down. Mitigation: customer can switch to a different smart-charging service (some wallboxes are Open Charge Point Protocol — OCPP — compatible and can be re-pointed at alternative providers). Some functionality may degrade. Customer education at handover: prefer manufacturers with established UK service networks.',
  },
  {
    question: 'Does the customer need to register the wallbox with DNO?',
    answer:
      'For a single 7 kW single-phase Mode 3 install on a typical 100 A domestic supply: no DNO notification typically required (below thresholds in EREC G98 / G99). For three-phase / 22 kW / multi-wallbox / commercial installs: DNO notification under G98 or G99 may apply. The wallbox manufacturer’s install guide usually flags this. Cert evidence bundle records any DNO notification + response. Note: this is a SUPPLY notification, separate from the SCP Regulations 2021 compliance.',
  },
];

export default function RenewableEnergyModule6Section7() {
  const navigate = useNavigate();

  useSEO({
    title: 'Smart Charge Points Regulations & EV tariffs | Renewable Energy 6.7 | Elec-Mate',
    description:
      'UK Electric Vehicles (Smart Charge Points) Regulations 2021: default off-peak charging, randomised delay, security and data privacy. Octopus Intelligent Go, Flux, Cosy EV tariffs. PV-tracking solar diverter functionality. Customer handover education.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 7 · UK Electric Vehicles (Smart Charge Points) Regulations 2021"
            title="Smart Charge Points Regulations + EV tariffs"
            description="UK SI 2021/1467 — default off-peak charging, randomised delay up to 600 s, security and data privacy. Octopus Intelligent Go / Flux / Cosy EV tariff structures. PV-tracking solar diverter functionality. Customer handover education on the smart-charging behaviour."
            tone="yellow"
          />

          <TLDR
            points={[
              'UK Electric Vehicles (Smart Charge Points) Regulations 2021 (SI 2021/1467) — statutory regulations applicable from 30 June 2022 (smart functionality) and 30 December 2022 (security). Apply to UK domestic / workplace chargepoints; separate from BS 7671.',
              'Default off-peak charging — chargepoint pre-configured at install to NOT charge during peak hours (08:00-11:00 and 16:00-22:00 Mon-Fri). Customer can override per-session; default returns automatically.',
              'Randomised delay — up to 600 s (10 min) random wait between schedule start and actual current draw. Prevents synchronised UK-wide demand spike when off-peak window opens.',
              'Security requirements — cybersecurity per recognised standards (BS EN IEC 63110 series for EV charging communications; UK NCSC IoT security guidance). Customer data privacy per UK GDPR.',
              'Octopus Intelligent Go — UK 2025-26 typical: ~7p/kWh 23:30-05:30; ~27p/kWh other times. EV-tariff-focused; integrates with vehicle / wallbox for automatic scheduling.',
              'Octopus Flux — designed for PV + BESS + EV households. ~33p/kWh export 16:00-19:00; ~12p/kWh import 02:00-05:00; encourages exporting expensive peak + charging cheap.',
              'Octopus Cosy — twin cheap windows (~13p/kWh morning + ~13p/kWh afternoon); expensive evening (~40p). Designed for heat-pump households; works for EV with two cycles per day.',
              'PV-tracking ("solar diverter") functionality — wallbox monitors PV generation and self-consumes EV charging from surplus. CT clamp + wallbox configuration. Brands: MyEnergi Zappi (pioneer), Hypervolt Home 3 Pro, others.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply the UK Electric Vehicles (Smart Charge Points) Regulations 2021 — verify default off-peak, randomised delay, security and data privacy at commissioning.',
              'Distinguish SCP Regulations 2021 (statutory) from BS 7671 / Section 722 (wiring regulations); recognise both apply.',
              'Configure customer’s wallbox to match their chosen tariff (Intelligent Go, Flux, Cosy, etc.); verify default off-peak + override mechanism remain functional.',
              'Apply PV-tracking / solar diverter functionality where customer has PV: CT clamp installation, wallbox configuration, customer handover on self-consumption.',
              'Document SCP Regulations 2021 compliance evidence: manufacturer DoC, default schedule verification, randomised delay configuration, security standards reference.',
              'Educate the customer at handover on the smart-charging behaviour: schedule, override, tariff integration, manufacturer app.',
              'Recognise the pre-2022 install scenario where SCP Regulations don’t apply retroactively; document the install date in the cert evidence bundle.',
              'Diagnose tariff / scheduling issues (vehicle waiting for off-peak window; randomised delay; override not functioning).',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            BS 7671 makes the install safe. The SCP Regulations make the install smart. Customer
            handover education ties them together.
          </Pullquote>

          <ContentEyebrow>
            UK Electric Vehicles (Smart Charge Points) Regulations 2021
          </ContentEyebrow>

          <ConceptBlock
            title="What the SCP Regulations 2021 require"
            plainEnglish="The UK Electric Vehicles (Smart Charge Points) Regulations 2021 (SI 2021/1467) are UK statutory regulations setting requirements for the smart functionality, security and data privacy of EV chargepoints sold or installed in Great Britain for domestic / workplace use."
            onSite="Apply from 30 June 2022 (smart functionality requirements) and 30 December 2022 (security requirements). Pre-2022 chargepoints are not retroactively covered — they predate the regulations. UK 2025-26 reality: every reputable wallbox brand declares SCP-Regs compliance in the manufacturer DoC."
          >
            <p>The four main requirement areas:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">1. Default off-peak charging</strong> — chargepoint
                pre-configured to NOT charge during peak hours (08:00-11:00 and 16:00-22:00
                Monday-Friday); permitted outside these hours. Customer can override per-session
              </li>
              <li>
                <strong className="text-white">2. Randomised delay</strong> — when a charging
                schedule begins, the chargepoint waits a random duration (up to 600 seconds / 10
                minutes) before drawing current. Prevents synchronised UK-wide demand spikes
              </li>
              <li>
                <strong className="text-white">3. Security</strong> — cybersecurity measures aligned
                with recognised standards (typically BS EN IEC 63110 series for EV charging
                communications and UK NCSC IoT security guidance). Protects against grid-attack /
                data-exfiltration / firmware-tampering threats
              </li>
              <li>
                <strong className="text-white">4. Data privacy</strong>— UK GDPR compliance for any
                customer data processed by the chargepoint or its cloud services. Manufacturer
                privacy notice required
              </li>
              <li>
                <strong className="text-white">Statutory not BS 7671</strong> — these are UK
                Government regulations under SI 2021/1467, separate from BS 7671. Both frameworks
                apply to UK domestic EV install
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> — manufacturer DoC for
                SCP-Regs compliance; verification at commissioning that default off-peak schedule is
                active and randomised delay is enabled
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="UK Statutory Instrument 2021/1467 — Electric Vehicles (Smart Charge Points) Regulations 2021"
            clause="Default off-peak charging shall be configured such that the chargepoint does not authorise charging during peak hours (08:00-11:00 and 16:00-22:00, Monday-Friday) by default. A randomised delay of up to 600 seconds shall be applied between schedule start and current draw. Security and data privacy measures shall align with recognised standards."
            meaning="UK statutory regulations applicable to all domestic / workplace chargepoints sold or installed from 30 June 2022 onward. Default off-peak shifts EV charging away from grid peak hours; randomised delay prevents synchronised demand spikes; security protects the connected-device attack surface; data privacy protects customer data. Manufacturer DoC declares compliance; installer verifies at commissioning. Cert evidence bundle records: manufacturer DoC + commissioning verification + customer handover documentation of the smart-charging behaviour."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>UK 2025-26 EV tariffs and their match to install</ContentEyebrow>

          <Pullquote>
            Tariff = when and how cheaply the customer charges. Wallbox = the kit that delivers it.
            Match them carefully at handover.
          </Pullquote>

          <ConceptBlock
            title="Octopus Intelligent Go — the EV-focused tariff"
            plainEnglish="Octopus Intelligent Go is the UK 2025-26 dominant EV-tariff (verified at install time — tariffs change). Cheap rate ~7p/kWh between 23:30 and 05:30 (6 hours); standard rate ~27p/kWh outside that window. The “Intelligent” feature: Octopus integrates with the customer’s vehicle or wallbox to automatically schedule charging within the cheap window."
            onSite="Customer plugs in at 18:00; Octopus + the vehicle / wallbox coordinate to start charging at 23:30 (after the randomised delay). By 05:30, the vehicle is fully charged at 7p/kWh. Tariff savings for typical UK 50 km/day driver: ~£300-£600/year vs flat-rate import. Cert evidence bundle records the tariff in the customer handover pack."
          >
            <p>Intelligent Go install considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Vehicle compatibility</strong>— Octopus integrates
                with most major EV OEMs via their APIs (Tesla, VW Group, Volvo, Renault, Polestar,
                BMW, Hyundai, Kia, etc.); also via OCPP-compatible wallboxes
              </li>
              <li>
                <strong className="text-white">Wallbox compatibility</strong> — Ohme (built around
                Octopus tariff integration), MyEnergi Zappi, Wallbox Pulsar Plus, Hypervolt, EO
                Charging, Easee, Tesla Wall Connector — all support Intelligent Go integration in UK
                2025-26
              </li>
              <li>
                <strong className="text-white">Customer setup</strong> — Octopus app + manufacturer
                wallbox app linked; vehicle credentials entered; cheap window configured (matches
                default tariff window); SCP-Regs default off-peak active
              </li>
              <li>
                <strong className="text-white">Charging behaviour</strong> — vehicle plugged in any
                time of day; charging delayed to start within the cheap window automatically.
                Customer-facing display shows "waiting for cheap rate"
              </li>
              <li>
                <strong className="text-white">Override</strong> — customer can charge immediately
                if needed (e.g. "drive in 2 hours"); Octopus charges at the higher rate for that
                session
              </li>
              <li>
                <strong className="text-white">Annual savings</strong> — typical UK 50 km/day driver
                consuming ~3,000 kWh/year through wallbox: ~£300-£600 saved vs flat-rate import.
                Higher mileage drivers save more
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Octopus Flux — for PV + BESS + EV prosumer households"
            plainEnglish="Octopus Flux is designed for households with PV + BESS + EV. Three-hour export window 16:00-19:00 at ~33p/kWh (peak grid demand); three-hour import window 02:00-05:00 at ~12p/kWh (cheap overnight); standard rate ~28p/kWh other hours. Encourages exporting expensive PV during peak and charging BESS / EV cheaply."
            onSite="Common UK 2025-26 prosumer tariff. The wallbox configures its charge schedule to match the Flux cheap window (02:00-05:00). The BESS (Module 5) also configures for Flux: discharge to load during 16:00-19:00 expensive window; charge from grid during 02:00-05:00. PV self-consumption maximised during the day; export only when grid is expensive."
          >
            <p>Flux install considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Tariff geometry</strong> — three hours cheap import
                (02:00- 05:00); three hours peak export (16:00-19:00); standard rate other hours
              </li>
              <li>
                <strong className="text-white">PV + BESS sweet spot</strong> — PV charges BESS
                during day (free); BESS discharges to loads / exports during 16:00-19:00 peak (sells
                at 33p/kWh); EV charges from grid during 02:00-05:00 cheap window (12p/kWh)
              </li>
              <li>
                <strong className="text-white">EV-only on Flux</strong> — customer with EV but no PV
                / BESS: Intelligent Go is cheaper than Flux for pure EV charging (7p vs 12p)
              </li>
              <li>
                <strong className="text-white">Wallbox config</strong> — set charge window to
                02:00-05:00 with randomised delay; SCP-Regs default off-peak naturally aligns
              </li>
              <li>
                <strong className="text-white">Annual savings vs flat rate</strong> — prosumer
                household ~£800-£1,200/year vs flat-rate import + standard SEG export. Variance
                depends on PV size, BESS size, EV mileage
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Octopus Cosy — for heat-pump households (also works for EV)"
            plainEnglish="Octopus Cosy was designed for heat-pump customers. Twin cheap windows (~13p/kWh morning ~04:00-07:00 + ~13p/kWh afternoon ~13:00-16:00); expensive evening ~40p/kWh 16:00-19:00; standard rate other hours. Heat pumps run during the cheap windows; EV can two-cycle (charge each window)."
            onSite="Customer with heat pump + EV typically picks Cosy. The wallbox can configure to charge during one or both cheap windows. Customer education at handover: explain the Cosy geometry and how the wallbox + heat pump together exploit the cheap windows."
          >
            <p>Cosy specifics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Twin cheap windows</strong> — morning ~04:00-07:00
                and afternoon ~13:00-16:00. Heat pump runs through both, batching its heat
                production
              </li>
              <li>
                <strong className="text-white">Expensive evening</strong> — ~40p/kWh 16:00-19:00.
                Customer avoids drawing during this window
              </li>
              <li>
                <strong className="text-white">EV scheduling</strong> — wallbox configured for the
                morning window (overnight + early morning). Some customers two-cycle (morning +
                afternoon) for long-distance days
              </li>
              <li>
                <strong className="text-white">Tariff vs rate</strong> — Cosy not as cheap per kWh
                as Intelligent Go (13p vs 7p) but designed for multi-cycle heat-pump households
                where the twin windows fit the pattern
              </li>
              <li>
                <strong className="text-white">Customer decision</strong> — Intelligent Go =
                cheapest pure EV; Cosy = best for heat pump + EV combination
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="PV-tracking (“solar diverter”) functionality"
            plainEnglish="Some wallboxes can monitor the household’s PV generation and dynamically match the EV charge rate to the PV surplus. When PV is exporting (more generation than household consumption), the wallbox uses the surplus for EV charging instead of letting it export at low SEG rate."
            onSite="UK customers with PV + EV but no BESS often want this functionality. CT clamp on incoming tails reads grid import / export direction. When exporting, the wallbox throttles the EV charge to match the surplus — typically minimum charge rate 6 A (1.4 kW per BS EN 61851 Mode 3 minimum) — so the EV charges only on free PV. When PV insufficient, wallbox either stops charging or supplements from grid (configurable)."
          >
            <p>PV-tracking install considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Brand availability</strong> — MyEnergi Zappi (UK
                pioneer of this feature); Hypervolt Home 3 Pro; Wallbox Pulsar Plus (with eco mode);
                Easee Home (with Equalizer); EO Mini Pro 3 (some variants)
              </li>
              <li>
                <strong className="text-white">CT clamp on tails</strong> — required for
                PV-tracking. Reads household import / export direction. Same hardware serves DLM
              </li>
              <li>
                <strong className="text-white">Operating modes</strong> — typical: ECO (charges only
                on surplus PV); ECO+ (charges on surplus + small grid top-up if PV insufficient);
                FAST (ignores PV, charges full rate)
              </li>
              <li>
                <strong className="text-white">Customer benefit</strong> — self-consumed PV vs
                exported. ~25p/kWh import avoided vs 5-15p SEG export = ~10-20p/kWh net benefit.
                Over a year, can be £100-£400 saving for customer with PV + EV
              </li>
              <li>
                <strong className="text-white">Combination with tariff</strong> — PV-tracking during
                day + Intelligent Go / Flux at night. The wallbox switches automatically: day =
                follow PV; night = follow cheap-window
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> — CT clamp installation
                + PV-tracking configuration + customer handover education
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>The engineering case + the tariff / install boundary</ContentEyebrow>

          <Pullquote>
            UK 2025-26 EV peak demand could double grid load at 17:00. Smart charging is the engineering response. The customer earns the savings; the grid earns the stability.
          </Pullquote>

          <ConceptBlock
            title="Why grid demand-shifting matters — the engineering case"
            plainEnglish="UK 2025-26 EV stock is ~2 million vehicles (and growing rapidly). Average daily charge ~10 kWh per vehicle. If every UK EV charged simultaneously at 17:00 home-from-work peak, that adds ~14 GW to the grid — comparable to the entire UK overnight low. Synchronised EV charging would force significant grid investment + emissions; demand-shifting to overnight troughs is the engineering answer."
            onSite="The customer doesn’t care about grid engineering — they care about cheap charging. The SCP Regulations 2021 + EV tariffs ALIGN the two: cheap rates for the customer + spread demand for the grid. Customer education at handover: explain the why behind the default off-peak schedule + randomised delay; most customers find it interesting once explained."
          >
            <p>The grid engineering numbers (UK 2025-26):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">UK EV stock</strong> — ~2 million in
                early 2026; ~30% YoY growth. Projected ~6 million by 2030
              </li>
              <li>
                <strong className="text-white">Average per-vehicle daily
                  charge</strong> — ~10 kWh (UK average ~50 km/day at ~5 km/kWh)
              </li>
              <li>
                <strong className="text-white">Synchronised peak risk</strong> — if all
                charged at 17:00 simultaneously, ~14 GW additional load. UK overnight low load is ~25 GW; peak is ~45 GW. A synchronised EV pulse would land in the same window as the existing evening peak — un-buildable without massive grid investment
              </li>
              <li>
                <strong className="text-white">Demand-shifting to
                  overnight</strong> — 23:00-07:00 window has ~10-15 GW spare capacity vs daytime peak. Spreading EV charging across this window is essentially free for the grid
              </li>
              <li>
                <strong className="text-white">Smart-charging response</strong> —
                SCP Regulations 2021 (default off-peak + randomised delay) is the regulatory mechanism that engineers the demand-shift WITHOUT requiring customer-side intervention. Aligned with EV tariffs that pay the customer for the shift
              </li>
              <li>
                <strong className="text-white">The customer’s
                  savings</strong> — ~£400/year on Octopus Intelligent Go vs flat-rate import (typical UK 2025-26 driver). The customer is the engineering response’s beneficiary
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — records SCP Regulations 2021 compliance + the customer’s tariff choice. The engineering response and the customer-side outcome both documented
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Tariff vs install — who owns what at the boundary"
            plainEnglish="The wallbox install is the installer’s responsibility (BS 7671 / Section 722 / SCP Regulations 2021). The tariff is the customer’s contract with their electricity supplier. The two meet at the wallbox’s smart-charging configuration. Understanding the boundary prevents support-call confusion."
            onSite="Customer asks the installer about tariff savings or tariff changes — politely route them to their electricity supplier. Customer asks the supplier about wallbox commissioning or RCD type — supplier routes back to the installer. The wallbox app sits at the boundary: customer’s tariff data flows in via the app; installer’s install + commissioning data flows out via the app + cert evidence bundle."
          >
            <p>The boundary in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Installer
                  ownership</strong> — BS 7671 install + Section 722 compliance + manufacturer DoC + SCP Regulations factory configuration + commissioning + cert evidence bundle + customer handover education
              </li>
              <li>
                <strong className="text-white">Customer
                  ownership</strong> — choice of electricity supplier + tariff; ongoing payment of bills; customer-side override of charging schedule for specific sessions; ongoing maintenance / use of the wallbox app
              </li>
              <li>
                <strong className="text-white">Supplier
                  ownership</strong> — tariff rates + windows + smart-charging integration with the customer’s wallbox / vehicle; billing; supplier app
              </li>
              <li>
                <strong className="text-white">Wallbox manufacturer
                  ownership</strong> — product conformity + Declaration of Conformity + firmware updates + cloud services + customer support for product issues
              </li>
              <li>
                <strong className="text-white">Handover
                  documentation</strong> — installer hands customer the cert evidence bundle + customer-facing operating instructions; customer keeps the bundle for warranty / EICR / property-sale evidence
              </li>
              <li>
                <strong className="text-white">Tariff change
                  scenario</strong> — customer switches from Octopus Intelligent Go to Octopus Flux (e.g. they’ve added PV+BESS). Customer reconfigures the wallbox app to the new tariff windows; no installer involvement needed; cert evidence bundle remains valid (install didn’t change). Customer may notify installer for service contract update
              </li>
              <li>
                <strong className="text-white">Common support-call
                  confusion</strong> — customer calls installer about tariff savings being lower than expected. Installer’s role is to verify the install is operating correctly (default off-peak + randomised delay still working) and route the customer to the supplier for tariff queries. The customer / supplier / installer triangle requires polite boundary discipline
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="EV + Octopus Intelligent Go install — straightforward case"
            situation="Customer has bought an electric vehicle (compatible with Octopus Intelligent Go via OEM API). Switching to Octopus Intelligent Go tariff. Wallbox selected: Ohme ePod (designed around the tariff integration). No PV, no BESS, no heat pump."
            whatToDo="Install per Sections 6.1-6.6 (Section 722 + earthing + RCD + cable + outdoor + connector). Commissioning includes SCP Regulations 2021 verification: default off-peak schedule active (verify in Ohme app); randomised delay enabled (verify); security and data privacy declared by manufacturer. Tariff integration: link Ohme account to Octopus Intelligent Go via the Ohme app; customer provides Octopus account credentials; tariff windows configured automatically. Customer handover: explain default off-peak; explain Intelligent Go scheduling; demonstrate override mechanism; expected annual savings (~£400-£600 for typical mileage); manufacturer support contact. Cert evidence bundle: BS 7671 / Section 722 install pack + SCP Regulations 2021 compliance evidence + Octopus tariff configuration + customer handover signed."
            whyItMatters="This is the dominant UK 2025-26 EV install pattern: standard 7 kW wallbox + Octopus Intelligent Go. The SCP Regulations are met by the manufacturer factory configuration; the installer’s job is to verify and document. Tariff integration is customer-side primarily; the installer ensures the wallbox is correctly registered with Octopus and that the cheap-window schedule is active. Customer-side savings deliver the value proposition of the install."
          />

          <Scenario
            title="PV + BESS + EV prosumer install on Octopus Flux"
            situation="Customer with existing PV + BESS install (Module 5) wants to add a wallbox and switch to Octopus Flux tariff. Wallbox: MyEnergi Zappi (PV-tracking + Flux-compatible)."
            whatToDo="Install per Sections 6.1-6.6. Zappi-specific: CT clamp on incoming tails (also serves DLM + PV-tracking). Commissioning: SCP-Regs verified (default off-peak + randomised delay + manufacturer compliance DoC); PV-tracking configured (ECO+ mode — charges on PV surplus during day + grid supplement if PV insufficient); Flux tariff windows configured (charge during 02:00-05:00 cheap import; opportunistically charge from PV during day). The PV + BESS (Module 5) also configured for Flux: discharge to loads / export during 16:00-19:00 peak. Customer handover: explain the Flux geometry; demonstrate the Zappi’s mode switching (ECO+ during day for PV; charge from cheap window at night); annual savings estimate (~£800-£1,200 vs flat-rate). Cert evidence bundle: full install pack + SCP-Regs + Flux configuration + Module 5 BESS interaction."
            whyItMatters="Prosumer installs are the UK 2025-26 growth area. The combination of PV + BESS + EV under a tariff like Flux maximises self-consumption + exports during expensive grid hours + charges cheaply during cheap hours. The MyEnergi Zappi + Octopus Flux pair is a particularly popular combination because the wallbox + tariff are well-integrated. Cert evidence bundle records the multi-system integration so future EICR / service understands the interactions."
          />

          <CommonMistake
            title="Skipping customer handover education on the SCP-Regs default off-peak"
            whatHappens="Installer commissions the wallbox without explaining the default off-peak schedule. Customer plugs in at 18:00 the next day; nothing happens (wallbox refusing to charge because 18:00 is in the SCP-Regs default peak window 16:00-22:00). Customer panics — calls installer thinking something is broken."
            doInstead="Customer handover MUST cover: (1) the default off-peak schedule and why it exists; (2) the cheap-window the wallbox is configured for; (3) the override mechanism for one-off urgent charging; (4) how the manufacturer app shows charging status. 10-minute customer walkthrough at handover prevents the next-day support call. Cert evidence bundle includes a customer handover signed acknowledgment that they’ve been briefed."
          />

          <CommonMistake
            title="Configuring the wallbox’s smart-charging schedule to override the SCP-Regs default off-peak"
            whatHappens="Customer asks for a custom schedule that includes charging during 16:00-22:00 daily; installer agrees and configures it. The configuration overrides the SCP-Regs default off-peak. EICR finding: SCP Regulations 2021 non-compliance — chargepoint configured to charge during peak hours by default, breaching the default-off-peak requirement."
            doInstead="The SCP-Regs default off-peak is a SETUP REQUIREMENT, not a one-time configuration. The wallbox must be configured such that the DEFAULT (no customer intervention) does NOT permit charging during peak hours. Customer can override per individual session, but the default returns. If the customer wants daily charging during 16:00-22:00, they must do it via per-session overrides — not by reconfiguring the default. Cert evidence bundle records the default schedule + the override mechanism."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'UK Electric Vehicles (Smart Charge Points) Regulations 2021 (SI 2021/1467) — statutory regulations for UK domestic / workplace chargepoints sold or installed from 30 June 2022 onward.',
              'Four requirements: default off-peak charging, randomised delay (up to 600 s), security (cybersecurity standards), data privacy (UK GDPR).',
              'Default off-peak: chargepoint pre-configured to NOT charge during 08:00-11:00 and 16:00-22:00 Mon-Fri. Customer can override per-session; default returns automatically.',
              'Randomised delay: up to 600 s (10 min) random wait between schedule start and current draw. Prevents synchronised UK-wide demand spike.',
              'Security per BS EN IEC 63110 series + UK NCSC IoT guidance. Manufacturer DoC declares compliance.',
              'UK 2025-26 EV tariffs: Octopus Intelligent Go (7p/kWh 23:30-05:30; EV-focused); Flux (12p import + 33p export; PV+BESS+EV); Cosy (twin 13p windows; heat-pump focused).',
              'PV-tracking ("solar diverter") functionality: wallbox monitors PV surplus and matches EV charge rate. Brands: MyEnergi Zappi, Hypervolt Home 3 Pro, Wallbox Pulsar Plus, Easee Home.',
              'Tariff vs install: install is the wallbox + cable + protective devices. Tariff is the customer-supplier-side service. Wallbox configuration ties them together at commissioning.',
              'Customer handover MUST cover: default off-peak + override mechanism + tariff scheduling + app guidance + expected annual savings.',
              'Pre-2022 chargepoints are NOT retroactively covered by SCP-Regs. EICR best-practice: note status, recommend upgrade for tariff access.',
              'Cert evidence bundle: SCP-Regs compliance DoC + commissioning verification + tariff configuration + customer handover signed.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 7 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-6-section-6')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Connector, CP/PP & dynamic load management
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-6-section-8')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.8 Commissioning, EICR & handover
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
