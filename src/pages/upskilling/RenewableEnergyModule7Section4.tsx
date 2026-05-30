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
    id: 'm7s4-ocpp-what',
    question: 'OCPP — what does it stand for and what does it do?',
    options: [
      'Optional Charger Protocol Plus',
      'Open Charge Point Protocol — open-source industry standard for communication between a chargepoint and a Charge Point Management System (CPMS). Enables: authentication, billing, monitoring, diagnostics, firmware updates, smart charging coordination, OCPP 1.6 (current widespread) and OCPP 2.0.1 (next generation)',
      'Outdoor Cable Power Plug',
      'Original Car Power Pack',
    ],
    correctIndex: 1,
    explanation:
      'OCPP = Open Charge Point Protocol. Managed by the Open Charge Alliance (OCA), an industry consortium. Open-source application protocol for chargepoint ↔ CPMS communication. UK 2025-26 deployed: OCPP 1.6 is the dominant version in commercial fleets (mature, widely supported); OCPP 2.0.1 is emerging (improves authentication, ISO 15118 plug-and-charge integration, smart-charging extensions, better firmware update workflows). Hardware-independent: chargers from different OEMs (ABB, Wallbox, Easee, EO Charging etc.) all talk OCPP to any compatible CPMS (Driivz, ChargePoint, Spirii, etc.).',
  },
  {
    id: 'm7s4-cpms',
    question: 'What is a CPMS (Charge Point Management System)?',
    options: [
      'A charger',
      'A cloud or on-premise software platform that manages a fleet of chargers via OCPP. Provides: authentication (who can charge), session control, billing, remote monitoring + diagnostics, firmware updates, smart-charging coordination, reporting. UK 2025-26 brands: Driivz, ChargePoint, Spirii, Monta, Charge Assist, Hubject (roaming), Octopus Electroverse (consumer-facing)',
      'A type of cable',
      'Hardware only',
    ],
    correctIndex: 1,
    explanation:
      'CPMS = Charge Point Management System. The cloud or on-premise software platform that talks to many chargers via OCPP. Provides the operational layer above the hardware: who can charge (authentication), how much they pay (billing), monitoring + diagnostics, firmware updates, smart-charging coordination. Critical for commercial / public / fleet sites where the operator needs centralised management. UK 2025-26 popular CPMS brands: Driivz (workplace), ChargePoint (workplace), Spirii (mixed), Monta (workplace + public), Charge Assist (UK-focused), Hubject (roaming + interop), Octopus Electroverse (consumer-facing). The install integrates the chargers with the customer’s chosen CPMS via OCPP credentials.',
  },
  {
    id: 'm7s4-authentication',
    question: 'How does a public-charging user authenticate at an OCPP charger?',
    options: [
      'Random password',
      'Multiple methods: (1) RFID card tap; (2) mobile app QR scan or proximity Bluetooth; (3) ISO 15118 plug-and-charge (vehicle credentials negotiate automatically — emerging); (4) contactless bank card at the payment terminal (PCAR 2023 mandatory for public). The CPMS validates against its authorisation database + starts the session',
      'Voice command',
      'No authentication',
    ],
    correctIndex: 1,
    explanation:
      'OCPP supports multiple authentication methods. RFID cards (tap-and-go, ~80% of UK 2025-26 commercial use); mobile app authentication (QR scan, Bluetooth proximity, or in-app start); ISO 15118 plug-and-charge (emerging — vehicle credentials negotiate with charger via PLC over CP, no customer action needed); contactless bank card payment terminal (PCAR 2023 mandatory for UK public chargers from late 2023). The CPMS receives the auth credential, validates against its database, returns authorisation, charger starts session. Cert evidence bundle records the authentication methods supported + payment terminal (if applicable) commissioning.',
  },
  {
    id: 'm7s4-smart-charging',
    question: 'How does OCPP coordinate smart charging across a multi-charger site?',
    options: [
      'It doesn’t',
      'OCPP includes Smart Charging profile messages. CPMS reads the site’s available power (from supply meter + DLM CT); sends "SetChargingProfile" messages to each charger announcing max current per session; chargers apply via CP PWM duty cycle to vehicles. Real-time coordination across the cluster; supports tariff windows, fleet priorities, peak shaving, BESS integration, PV self-consumption',
      'Customer turns chargers on / off manually',
      'Only fixed schedules',
    ],
    correctIndex: 1,
    explanation:
      'OCPP smart-charging messages let the CPMS coordinate the multi-charger site dynamically. "SetChargingProfile" message specifies max current (per session, per duration, per schedule). CPMS calculates the per-charger allocation based on: site supply capacity (DLM); tariff windows (Octopus Flux peaks for example); fleet priorities (departure times); BESS state-of-charge; PV generation. Sends profiles to each charger via OCPP; chargers apply via CP PWM duty cycle to their connected vehicles. Real-time updates as conditions change (vehicle plugs in / out; PV ramps; tariff window changes). UK 2025-26 reality: this is the operational mechanism behind workplace cost-allocation, fleet sequential scheduling, public-hub demand management, BESS-integrated peak-shaving. Section 7.5 covers DLM at scale; this section covers the OCPP protocol underneath.',
  },
];

const quizQuestions = [
  {
    question: 'A workplace install needs OCPP integration with the customer’s existing CPMS. What does the installer configure?',
    options: [
      'Nothing — works automatically',
      'For each charger: enter the CPMS endpoint URL + credentials (issued by the CPMS operator); set the chargepoint identifier (unique per charger); test OCPP boot notification (charger reports itself to CPMS on first energise); verify heartbeat messages flowing; test authentication via RFID card / app; verify smart-charging profile reception + CP duty-cycle response. Manufacturer-specific configuration via app or web portal. Cert evidence bundle records the OCPP credentials (test) + endpoint + commissioning test result',
      'CPMS configures itself',
      'No configuration needed',
    ],
    correctAnswer: 1,
    explanation:
      'OCPP commissioning per charger: (1) endpoint URL — the CPMS’s WebSocket URL (e.g. wss://cpms.example.com/ocpp); (2) credentials — username / password or token issued by the CPMS operator; (3) chargepoint identifier — unique string registered in the CPMS database; (4) boot notification test — charger reports itself to CPMS on first connection; (5) heartbeat verification — periodic keep-alive messages; (6) authentication test — RFID / app start of a session; (7) smart-charging profile test — CPMS sends SetChargingProfile + charger applies. Customer-facing: the customer’s site operator gets the chargers showing in their CPMS dashboard. Cert evidence bundle records OCPP commissioning per charger + the CPMS account integration.',
  },
  {
    question: 'OCPP 1.6 vs 2.0.1 — what’s the practical difference for UK 2025-26 installs?',
    options: [
      'Same thing',
      'OCPP 1.6 (released 2015) is widespread + mature; most installed UK chargers + CPMS support it. OCPP 2.0.1 (released 2020, updated 2024) adds: ISO 15118 plug-and-charge integration; richer authentication; enhanced smart-charging; better firmware update workflows; improved security. UK 2025-26 reality: most new commercial installs are OCPP 1.6 with 2.0.1 emerging on new + premium kit. Cert evidence bundle records the OCPP version per charger',
      '2.0.1 is obsolete',
      '1.6 doesn’t exist',
    ],
    correctAnswer: 1,
    explanation:
      'OCPP version landscape UK 2025-26: 1.6 dominant (mature, widely supported, most legacy + current chargers + CPMS); 2.0.1 emerging (improved capabilities; manufacturer + CPMS rollout ongoing). Key 2.0.1 improvements: ISO 15118 plug-and-charge integration (vehicle credentials negotiate via PLC); richer + more flexible smart-charging; better firmware update workflows; enhanced security (TLS-mandatory, certificate-based auth); improved monitoring + diagnostics. Customer choice typically driven by CPMS preference + charger OEM support. Cert evidence bundle records the OCPP version + the migration path (some chargers support over-the-air upgrade from 1.6 → 2.0.1).',
  },
  {
    question: 'ISO 15118 plug-and-charge — what does it enable?',
    options: [
      'Slower charging',
      'Vehicle and charger exchange credentials automatically via Power Line Communication (PLC) over the Control Pilot wire when plugged in. No RFID card, no app start, no manual action — the vehicle is recognised + billed via its embedded credentials. Major UX improvement for fleet / regular customers. Emerging in UK 2025-26 on new Mode 4 + premium Mode 3 chargers',
      'Wireless charging',
      'Same as RFID',
    ],
    correctAnswer: 1,
    explanation:
      'ISO 15118 = digital communication standard for EV charging. The "plug-and-charge" feature: vehicle and charger negotiate credentials automatically via PLC (Power Line Communication) over the Control Pilot wire. No customer action: plug in → vehicle identified → charger authorised + billed automatically. Emerging in UK 2025-26 on premium Mode 4 (Tesla, Audi, Porsche, Mercedes EQ) + some new Mode 3. OCPP 2.0.1 includes ISO 15118 integration messages. Cert evidence bundle records: charger ISO 15118 support; CPMS ISO 15118 integration; ECC (Elliptic Curve Cryptography) certificate authority used. Customer experience: the plug-and-charge user just plugs in + walks away.',
  },
  {
    question: 'A workplace site has 8 OCPP-enabled chargers + a CPMS. One charger goes offline (OCPP heartbeat lost). What happens?',
    options: [
      'All chargers stop',
      'The offline charger continues to operate locally (if previously authenticated session, it completes; new sessions may not start without CPMS authorisation depending on configuration). CPMS dashboard flags the charger as offline. Diagnostic check first: network connectivity (cable, Wi-Fi, cellular signal), CPMS endpoint reachability, charger firmware. Most outages resolve with network restoration. Cert evidence bundle records the diagnostic procedure + manufacturer support contact',
      'Customer notified by email',
      'No effect',
    ],
    correctAnswer: 1,
    explanation:
      'OCPP charger goes offline (heartbeat to CPMS lost) — local operation typically continues for any in-progress session. New session behaviour depends on configuration: "free vend" (allow charging without auth, default for some operators); "denied" (block new sessions until reconnection); "local list" (charger has a cached list of authorised RFID cards, allows from that list). CPMS dashboard alerts the operator; diagnostics: network connectivity (Ethernet + Wi-Fi + cellular backup), CPMS endpoint reachability, charger firmware. Most outages = network glitch + auto-recover. Cert evidence bundle includes the network architecture + diagnostic procedure + manufacturer + CPMS support contacts. UK 2025-26 reliability typical: 95-99% uptime; PCAR 2023 requires rapid chargers (50+ kW) >= 99% reliability target.',
  },
  {
    question: 'OCPP via cellular network — when is cellular essential vs Ethernet preferred?',
    options: [
      'Always Ethernet',
      'Ethernet preferred where available (more reliable, lower latency, no monthly cellular fee). Cellular essential for: remote sites without fixed network (motorway services, kerbside, rural fleet depots); backup connectivity in case the site’s primary network fails. UK 2025-26 commercial reality: Ethernet primary + cellular backup is the resilient pattern; cellular-only for isolated sites; Wi-Fi-only is least reliable (interference, range)',
      'Always cellular',
      'No network needed',
    ],
    correctAnswer: 1,
    explanation:
      'Network architecture for OCPP chargers: Ethernet primary where the site has wired network (workplaces, commercial premises); cellular (4G / 5G) primary where no wired network (motorway services, kerbside, rural). Cellular backup is the resilient pattern at sites with primary Ethernet — if the site network fails, chargers auto-failover to cellular. Wi-Fi is the weakest option: interference, range limits, security challenges. UK 2025-26 chargers typically have all three radios (Ethernet, Wi-Fi, cellular); installer configures the priority. Cert evidence bundle records the network configuration + SIM details + signal strength survey if cellular.',
  },
  {
    question: 'OCPP security — TLS-mandatory in OCPP 2.0.1. What is the install implication?',
    options: [
      'Nothing',
      'Each charger must have a TLS client certificate issued by the CPMS operator’s certificate authority. Installer commissions the charger with the certificate (typically loaded via the manufacturer app or USB on first energise). Certificate expires + needs renewal (typically annual or per CPMS policy). Cert evidence bundle records the certificate fingerprint + expiry date + renewal procedure',
      'Customer manages certificates',
      'Certificates not needed',
    ],
    correctAnswer: 1,
    explanation:
      'OCPP 2.0.1 mandates TLS (Transport Layer Security) on the OCPP WebSocket connection for security. Each charger holds a client certificate issued by the CPMS operator’s certificate authority (or a public CA in some cases). Commissioning: installer loads the certificate per the manufacturer’s procedure (manufacturer app, USB, OTA from CPMS). Certificate expiry: typically annual or per CPMS policy; renewal procedure documented in the cert evidence bundle. Without TLS: connection refused by modern CPMS. Cert evidence bundle: certificate fingerprint, issuing CA, expiry date, renewal procedure documented + assigned to the site operator.',
  },
];

const faqs = [
  {
    question: 'OCPP vs OCPI — what’s the difference?',
    answer:
      'OCPP (Open Charge Point Protocol) = chargepoint ↔ CPMS communication. OCPI (Open Charge Point Interface) = CPMS ↔ CPMS communication for roaming (so a customer’s home network app can authorise charging on a third-party network). Both managed by industry consortia. OCPP commissioned at the install; OCPI configured at the CPMS / network operator level (above installer scope but operationally relevant). UK 2025-26 roaming: Hubject is the dominant pan-European roaming hub; OCPI is the standard interface.',
  },
  {
    question: 'Open-source OCPP vs proprietary protocols?',
    answer:
      'OCPP is open-source (managed by Open Charge Alliance). Some legacy / cheap chargers use proprietary protocols that lock the customer into a single CPMS — avoid these. UK 2025-26 reputable brands all support OCPP (open) + their preferred / native CPMS. Open-OCPP support means the customer can change CPMS over the charger’s lifetime without replacing hardware. Cert evidence bundle records the chargers’ OCPP version + open-OCPP compliance (vs proprietary-only).',
  },
  {
    question: 'How is OCPP firmware update managed?',
    answer:
      'CPMS issues firmware update commands via OCPP messages. Chargers download the firmware (OCPP 1.6 uses HTTP / FTP URL; OCPP 2.0.1 has dedicated update messages). Verify, install, reboot. UK 2025-26 reality: critical security or feature updates typically rolled out by the CPMS operator quarterly or bi-annually; major version updates (OCPP 1.6 → 2.0.1) require explicit operator action. Cert evidence bundle: firmware version at install + update procedure + responsible parties.',
  },
  {
    question: 'What about chargers with NO network connection?',
    answer:
      'Standalone chargers without OCPP / CPMS — typical at small domestic + some basic commercial installs. Simpler hardware, no CPMS fees, no remote management — but also no fleet management, no smart-charging coordination, no usage reporting, no remote diagnostics. UK 2025-26 commercial sites: almost universally OCPP-enabled for the operational benefits. Cert evidence bundle for standalone install records the customer’s informed choice + acknowledgment of the trade-offs (no remote tools).',
  },
  {
    question: 'OCPP support across UK 2025-26 wallbox brands?',
    answer:
      'Universal among reputable brands. Ohme, Wallbox, Hypervolt, Andersen, PodPoint, Easee, EO Charging, MyEnergi Zappi, Tesla Wall Connector — all support OCPP 1.6 minimum, many supporting 2.0.1. Commercial / public DC fast: ABB, Tritium, Alpitronic, Kempower, Tesla — all OCPP-compliant. Confirm at quote stage: OCPP version + CPMS compatibility list. Cert evidence bundle records the manufacturer-declared OCPP support.',
  },
];

export default function RenewableEnergyModule7Section4() {
  const navigate = useNavigate();

  useSEO({
    title: 'OCPP & networked charging | Renewable Energy 7.4 | Elec-Mate',
    description:
      'Open Charge Point Protocol (OCPP) for chargepoint ↔ CPMS communication. OCPP 1.6 and 2.0.1, CPMS platforms (Driivz, ChargePoint, Spirii, Monta), authentication (RFID, app, ISO 15118 plug-and-charge), smart charging via OCPP profiles, OCPI roaming, network architecture, security (TLS), firmware updates.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-7')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 7
          </button>

          <PageHero
            eyebrow="Module 7 · Section 4 · Open Charge Point Protocol · OCPP 1.6 + 2.0.1"
            title="OCPP & networked charging"
            description="The industry-standard protocol that turns standalone chargers into managed fleets. OCPP 1.6 + 2.0.1, CPMS platforms, authentication, smart-charging coordination, ISO 15118 plug-and-charge, OCPI roaming, network architecture, security."
            tone="yellow"
          />

          <TLDR
            points={[
              'OCPP = Open Charge Point Protocol. Open-source industry standard for chargepoint ↔ CPMS communication. Managed by the Open Charge Alliance.',
              'OCPP 1.6 dominant in UK 2025-26 (mature, widespread). OCPP 2.0.1 emerging — improved authentication, ISO 15118 integration, smart-charging extensions, security.',
              'CPMS (Charge Point Management System) is the cloud / on-premise software that manages a fleet of chargers via OCPP. Auth, billing, monitoring, diagnostics, firmware, smart-charging coordination.',
              'Authentication methods via OCPP: RFID card (~80% UK commercial), mobile app, ISO 15118 plug-and-charge (emerging), contactless bank card terminal (PCAR 2023 mandatory for public).',
              'Smart charging via OCPP: CPMS sends "SetChargingProfile" messages; chargers apply via CP PWM duty cycle. Real-time coordination for site DLM, tariff windows, fleet priorities, BESS / PV integration.',
              'ISO 15118 plug-and-charge: vehicle and charger exchange credentials automatically via PLC over CP. No customer action; no RFID. Emerging in UK 2025-26.',
              'Network architecture: Ethernet primary + cellular backup is the resilient pattern. Wi-Fi-only least reliable. Cellular essential at remote sites.',
              'OCPP 2.0.1 mandates TLS security. Each charger has a TLS client certificate from the CPMS’s CA; installer commissions with certificate; renewal procedure documented in cert evidence bundle.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain OCPP’s role as the open-source standard for chargepoint ↔ CPMS communication.',
              'Distinguish OCPP 1.6 (dominant) from OCPP 2.0.1 (emerging, enhanced) — practical implications for new install.',
              'Identify the CPMS’s functional scope: authentication, billing, monitoring, diagnostics, firmware updates, smart-charging coordination.',
              'Configure OCPP commissioning per charger: endpoint, credentials, identifier, boot notification + heartbeat verification.',
              'Apply OCPP smart-charging via SetChargingProfile messages — CPMS coordinates the multi-charger site DLM.',
              'Explain ISO 15118 plug-and-charge: automatic vehicle ↔ charger credential exchange via PLC over CP.',
              'Design the network architecture: Ethernet + cellular backup for resilience; cellular for remote sites.',
              'Apply OCPP 2.0.1 TLS security: client certificate per charger, CA management, renewal procedure.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            OCPP is the lingua franca of commercial EV charging. Open the protocol, and the chargers and CPMS speak across vendors. Lock the protocol, and the customer is trapped.
          </Pullquote>

          <ContentEyebrow>What OCPP is and why it matters</ContentEyebrow>

          <ConceptBlock
            title="OCPP — Open Charge Point Protocol"
            plainEnglish="OCPP = the open-source application protocol that lets a chargepoint communicate with a Charge Point Management System (CPMS). Managed by the Open Charge Alliance (OCA), an industry consortium. Hardware-independent: chargers from any OEM that supports OCPP can talk to any OCPP-compliant CPMS."
            onSite="UK 2025-26 reality: virtually every reputable commercial wallbox + DC fast charger supports OCPP. The customer’s choice of CPMS is separate from the choice of charger hardware. This open architecture protects the customer from vendor lock-in — they can swap CPMS without replacing chargers."
          >
            <p>What OCPP enables:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Multi-vendor
                  interoperability</strong> — chargers from ABB, Wallbox, Easee, EO,
                MyEnergi, Tesla can all integrate with a single CPMS (Driivz, ChargePoint,
                Spirii, Monta, etc.)
              </li>
              <li>
                <strong className="text-white">Authentication</strong> — CPMS validates
                user credentials (RFID, app, plug-and-charge) before authorising a session
              </li>
              <li>
                <strong className="text-white">Billing</strong> — session data flows to
                CPMS; CPMS calculates cost; charges customer / employer / operator
              </li>
              <li>
                <strong className="text-white">Monitoring + diagnostics</strong>
                — real-time status of every charger; fault alerts; uptime tracking
              </li>
              <li>
                <strong className="text-white">Smart-charging
                  coordination</strong> — CPMS sends max-current profiles per charger per
                session; chargers apply via CP PWM
              </li>
              <li>
                <strong className="text-white">Firmware updates</strong> — CPMS pushes
                firmware updates remotely; chargers download, install, reboot
              </li>
              <li>
                <strong className="text-white">Open-source standard</strong> — protocol
                specifications publicly available; multiple implementations; vendor
                competition + no lock-in
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Open Charge Alliance · OCPP 1.6 + 2.0.1 — industry standard (not BS 7671)"
            clause="OCPP is an industry application protocol standard maintained by the Open Charge Alliance. OCPP 1.6 (released 2015) is widely deployed. OCPP 2.0.1 (released 2020, updated 2024) is the next generation with enhanced security, ISO 15118 integration, and richer smart-charging. Not a UK statutory regulation; not a BS 7671 requirement; but de-facto standard for commercial / public / fleet UK 2025-26 EV charging."
            meaning="OCPP is the operational protocol — separate from BS 7671 wiring regs, SCP Regulations 2021 (statutory smart-charging), PCAR 2023 (statutory public charging). The installer’s scope on OCPP: configure the chargers with the customer’s CPMS credentials at commissioning; verify the OCPP connection works (boot notification + heartbeat); test authentication + smart-charging profile reception. Cert evidence bundle records the OCPP version + CPMS account integration + commissioning test result. Ongoing operation is the site operator + CPMS’s responsibility; the installer’s role typically ends at handover."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>OCPP 1.6 vs 2.0.1 — versions in UK 2025-26</ContentEyebrow>

          <Pullquote>
            OCPP 1.6 is what’s deployed. OCPP 2.0.1 is what’s coming. The migration takes years.
          </Pullquote>

          <ConceptBlock
            title="OCPP 1.6 — the mainstream"
            plainEnglish="OCPP 1.6 (released 2015) is the dominant version deployed in UK 2025-26 commercial / public / fleet EV charging. Mature, widely supported by chargers + CPMS + roaming hubs. Most legacy + current new installs are OCPP 1.6."
            onSite="OCPP 1.6 covers the core operational scope: authentication, session control, billing data, monitoring, diagnostics, basic smart-charging (SetChargingProfile), firmware updates. Limitations: security is optional TLS; ISO 15118 plug-and-charge integration limited; smart-charging less granular than 2.0.1."
          >
            <p>OCPP 1.6 capabilities:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Boot + heartbeat</strong> — charger reports
                itself to CPMS on first power-up; periodic keep-alive messages
              </li>
              <li>
                <strong className="text-white">Authorise + StartTransaction +
                  StopTransaction</strong> — session lifecycle messages. CPMS validates
                credentials and tracks session start / stop / energy delivered
              </li>
              <li>
                <strong className="text-white">MeterValues</strong> — periodic energy +
                power + voltage + current reports during a session
              </li>
              <li>
                <strong className="text-white">SetChargingProfile</strong> — CPMS sends
                max current profile to the charger. Charger applies via CP PWM duty cycle
              </li>
              <li>
                <strong className="text-white">FirmwareUpdate</strong> — CPMS pushes
                firmware URL; charger downloads, installs, reboots
              </li>
              <li>
                <strong className="text-white">RemoteStartTransaction +
                  RemoteStopTransaction</strong> — CPMS can start / stop a session
                remotely (app-driven sessions)
              </li>
              <li>
                <strong className="text-white">DataTransfer</strong> — vendor-specific
                custom message extension (used for some manufacturer-unique features)
              </li>
              <li>
                <strong className="text-white">Security</strong> — TLS optional in 1.6;
                many production systems still use plain WebSocket. Authentication via
                basic auth or token
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="OCPP 2.0.1 — the next generation"
            plainEnglish="OCPP 2.0.1 (released 2020, updated 2024) is the next-generation protocol. Backwards-incompatible with 1.6 — chargers + CPMS need explicit 2.0.1 support. Improvements: TLS-mandatory security; ISO 15118 plug-and-charge integration; richer smart-charging with hierarchical profiles; better firmware update workflows; enhanced device management; PCAR-friendly transparency."
            onSite="UK 2025-26 reality: new premium kit (Tesla Wall Connector Gen 3+, ABB Terra new generations, Tritium PKM new generations, Wallbox Pulsar Max) ships with 2.0.1 support. Migration from 1.6 typically requires firmware update on both charger + CPMS sides; some legacy chargers can’t migrate (hardware limit)."
          >
            <p>OCPP 2.0.1 improvements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">TLS-mandatory</strong> — encrypted
                WebSocket connection; certificate-based client authentication; revocation
                support
              </li>
              <li>
                <strong className="text-white">ISO 15118 integration</strong> —
                plug-and-charge native; vehicle credentials authenticated automatically;
                no customer action required
              </li>
              <li>
                <strong className="text-white">Hierarchical
                  smart-charging</strong> — CPMS can set profiles at multiple levels
                (site, charger, connector, session); priority + override logic
              </li>
              <li>
                <strong className="text-white">Better firmware
                  updates</strong> — granular update messages; rollback support; signed
                firmware
              </li>
              <li>
                <strong className="text-white">Device management</strong> — richer
                monitoring + diagnostics + configuration messages
              </li>
              <li>
                <strong className="text-white">PCAR transparency</strong> — tariff
                advertisement messages (chargers publish current pricing per OCPP),
                supports PCAR 2023 pricing transparency requirements
              </li>
              <li>
                <strong className="text-white">Customer cert evidence bundle
                  record</strong> — OCPP version + migration path (some 1.6 chargers
                support OTA upgrade to 2.0.1; others fixed at 1.6 hardware)
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Installer scope — OCPP commissioning + network architecture</ContentEyebrow>

          <ConceptBlock
            title="OCPP commissioning per charger"
            plainEnglish="At install commissioning, the installer configures each charger to talk to the customer’s CPMS. Specific steps: endpoint URL + credentials + chargepoint identifier + boot notification test + heartbeat verification + authentication test + smart-charging profile test."
            onSite="The customer’s site operator (or their IT) provides the CPMS endpoint + credentials. The installer enters these per charger via the manufacturer app or web portal. Cert evidence bundle records the commissioning steps + the test results. Customer-facing benefit: chargers appear in their CPMS dashboard ready for fleet management."
          >
            <p>OCPP commissioning steps:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Endpoint URL</strong> — the CPMS’s
                WebSocket URL (e.g. wss://cpms.example.com/ocpp/1.6 or 2.0.1)
              </li>
              <li>
                <strong className="text-white">Credentials</strong> — username +
                password or token, issued by the CPMS operator. OCPP 2.0.1: TLS client
                certificate also required
              </li>
              <li>
                <strong className="text-white">Chargepoint
                  identifier</strong> — unique string for the charger, registered in the
                CPMS database (e.g. CP-001, or the serial number)
              </li>
              <li>
                <strong className="text-white">Boot
                  notification</strong> — first connection: charger reports itself to
                CPMS via BootNotification message. Test: charger appears in CPMS
                dashboard
              </li>
              <li>
                <strong className="text-white">Heartbeat</strong> — periodic keep-alive
                messages (typically every 60-300 seconds). Test: confirm
                heartbeat received at CPMS
              </li>
              <li>
                <strong className="text-white">Authentication test</strong> — RFID card
                tap or app session start. Verify session created + recorded in CPMS
              </li>
              <li>
                <strong className="text-white">Smart-charging
                  test</strong> — CPMS sends SetChargingProfile via OCPP; verify charger
                applies via CP PWM (vehicle current limit changes)
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> — OCPP
                version, endpoint, chargepoint identifier, commissioning test results,
                CPMS account holder
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Network architecture — Ethernet, cellular, Wi-Fi"
            plainEnglish="OCPP chargers need a reliable IP network connection to their CPMS. UK 2025-26 best-practice: Ethernet primary + cellular backup is the resilient pattern. Wi-Fi-only is least reliable (interference, range, security)."
            onSite="Survey the site network at quote stage. Workplace + commercial: typically Ethernet runs to each charger; cellular backup via 4G / 5G modems. Public hub + motorway services: cellular often the only option. Cellular site requires SIM management + signal strength survey + cellular carrier choice."
          >
            <p>Network options:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Ethernet
                  primary</strong> — wired connection from charger to site network
                switch / managed router. Most reliable, lowest latency, no monthly
                cellular fee. Standard at workplaces / commercial premises
              </li>
              <li>
                <strong className="text-white">Cellular backup</strong> — 4G / 5G
                modem inside the charger. Auto-failover when Ethernet fails. SIM card +
                monthly data plan (~£5-15/charger/month). Cell signal strength survey at
                each charger location
              </li>
              <li>
                <strong className="text-white">Cellular
                  primary</strong> — only network connection at remote sites
                (motorway services, kerbside, rural). Same SIM + signal management as
                backup
              </li>
              <li>
                <strong className="text-white">Wi-Fi</strong> — least reliable.
                Interference, range, security. Some commercial / workplace installs use
                Wi-Fi if Ethernet not practical; backup to cellular recommended
              </li>
              <li>
                <strong className="text-white">VLAN
                  separation</strong> — workplace / commercial sites typically put EV
                chargers on a separate VLAN from the office network for security +
                bandwidth management
              </li>
              <li>
                <strong className="text-white">Firewall + NAT</strong>
                — charger’s OCPP WebSocket connection outbound through the
                site’s firewall (port 80/443 typically). Inbound: not needed (CPMS
                doesn’t connect into the site)
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — network architecture diagram + IP addresses /
                hostnames + cellular SIM details (if applicable) + VLAN configuration
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="OCPI roaming — the cross-network layer"
            plainEnglish="OCPI = Open Charge Point Interface. Open-source protocol for CPMS ↔ CPMS communication enabling cross-network roaming. Example: an Octopus Electroverse customer pulls up at an Ionity charger; Electroverse CPMS contacts Ionity CPMS via OCPI; session authorised + billed to Octopus customer. Hubject is the dominant pan-European OCPI roaming hub."
            onSite="OCPI is configured at the CPMS / network operator level — above the installer’s scope. But operationally relevant: the installer’s charger commissioning enables OCPI by connecting chargers to the customer’s CPMS, which then connects upstream to OCPI hubs. Cert evidence bundle records the CPMS account holder + the OCPI roaming hubs configured (Hubject, Gireve, e-clearing.net common in UK 2025-26)."
          >
            <p>OCPI roaming architecture:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">CPO CPMS</strong> — the Chargepoint
                Operator’s management system. Manages the chargers via OCPP downstream
                and exposes them via OCPI upstream
              </li>
              <li>
                <strong className="text-white">eMSP CPMS</strong> — the e-Mobility
                Service Provider’s system. Holds the customer’s account + payment
                credentials. Customer-facing brand (Octopus Electroverse, BP Pulse,
                Shell Recharge etc.)
              </li>
              <li>
                <strong className="text-white">Roaming hub</strong> — Hubject is the
                dominant pan-European hub. Gireve, e-clearing.net are alternatives. The
                hub routes session authorisation + billing between CPO and eMSP CPMS
              </li>
              <li>
                <strong className="text-white">OCPI 2.2.1</strong> — current standard
                version. UK 2025-26 chargepoint networks broadly OCPI 2.2.1 compatible
              </li>
              <li>
                <strong className="text-white">PCAR 2023
                  alignment</strong> — PCAR mandates roaming acceptance at UK public
                charge points; OCPI is the technical layer that delivers this
              </li>
              <li>
                <strong className="text-white">Installer scope</strong> — OCPI is
                CPMS-to-CPMS, so installer’s job is to commission OCPP charger ↔ CPMS
                correctly; CPMS operator handles OCPI configuration
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — record CPMS account holder + roaming hub(s)
                configured + ongoing operator responsibilities for OCPI compliance
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 722.531.3.101 + OCPP smart-charging interaction"
            clause="Reg 722.531.3.101 specifies the RCD architecture for EV charging circuits. The protective devices (RCBO / RCD) operate independently of OCPP — protection is hard-wired, not network-dependent. OCPP smart-charging via SetChargingProfile messages adjusts the maximum current via the Control Pilot (CP) PWM duty cycle; the wallbox’s internal protective devices remain in circuit regardless of OCPP state."
            meaning="OCPP coordinates operational parameters (max current, session auth, tariff) but never bypasses the BS 7671 protective architecture. Reg 722.531.3.101 RCD trip + Reg 722.411.4 PME alternatives operate regardless of OCPP / CPMS state. Network outage = OCPP communication lost but protective devices unchanged + chargers can continue authorised sessions locally. Cert evidence bundle records: protective device coordination is independent of OCPP; smart-charging is operational layer; no OCPP message can override the protective device function."
          />

          <Pullquote>
            OCPP rides on top of BS 7671. The protocol carries the operational data; the regulations carry the safety. Get both right.
          </Pullquote>

          <Scenario
            title="Workplace OCPP install — 8 chargers + customer’s existing CPMS"
            situation="Workplace customer has an existing CPMS (Driivz) used at their other sites. New install: 8 × 22 kW three-phase wallboxes. Customer’s IT provides CPMS endpoint + per-charger credentials. Site has wired Ethernet + Wi-Fi + 4G signal."
            whatToDo="Per charger commissioning: enter Driivz endpoint URL (wss://driivz.example.com/ocpp) + credentials (username/token issued by Driivz operator) + chargepoint identifier (CP-Site-001 through CP-Site-008). OCPP 1.6 (customer’s CPMS supports 1.6 but not yet 2.0.1). Ethernet primary connection (each charger has its own Ethernet drop from the site managed switch on a dedicated EV VLAN). 4G cellular backup configured. Boot notification test: each charger reports to Driivz on first energise; dashboard confirms 8/8 online. Heartbeat verified. Authentication test: customer’s IT issues an RFID card; tap test on each charger; session created + recorded in Driivz. Smart-charging test: Driivz sends SetChargingProfile (limit one charger to 16 A); verify CP PWM reduces accordingly + vehicle responds. Cert evidence bundle: OCPP version + endpoint + 8 chargepoint identifiers + network architecture + commissioning test results + CPMS account holder details."
            whyItMatters="OCPP integration is the operational layer that turns a Section 722 install into a managed fleet. Customer-facing benefit: chargers visible in their existing CPMS dashboard; staff RFID cards work uniformly; reporting + cost allocation automatic; firmware updates remote. Installer scope: configure + verify + document. Customer scope: ongoing CPMS operations + monthly fees + user management. Cert evidence bundle is the handover artefact."
          />

          <Scenario
            title="Public hub OCPP integration — multi-vendor chargers + CPMS + roaming"
            situation="Public DC fast hub with 6 × 150 kW from one OEM + 2 × 350 kW from another. Operator uses ChargePoint CPMS + Hubject roaming integration. PCAR 2023 mandatory."
            whatToDo="Multi-vendor OCPP setup: all 8 chargers configured with ChargePoint OCPP endpoint despite different manufacturers — this is OCPP’s key value (vendor interop). OCPP 2.0.1 (premium DC fast brands support it; ChargePoint CPMS supports it). TLS client certificates per charger from ChargePoint’s CA; loaded at commissioning per manufacturer procedure. ISO 15118 plug-and-charge enabled for emerging premium EVs (vehicle credentials negotiate via PLC over CP). PCAR 2023: payment terminals at each charger (contactless bank card per PCAR); pricing transparency on display + OCPP-published tariff messages; 24/7 helpline phone number on each charger; uptime monitoring + open data feed via OCPP MeterValues + status. Hubject OCPI integration: ChargePoint CPMS connects to Hubject roaming hub; non-ChargePoint customers (e.g. Octopus Electroverse users) can authorise + pay via their home network. Cert evidence bundle: 8 × OCPP commissioning records + TLS certificate fingerprints + ISO 15118 setup + PCAR compliance evidence + OCPI roaming configuration + ongoing operator obligations."
            whyItMatters="Public DC fast hubs are the testing ground for the full OCPP capability set. Multi-vendor + 2.0.1 + ISO 15118 + PCAR transparency + OCPI roaming all integrate at the OCPP layer. The customer (hub operator) benefits from open-protocol vendor independence; the end-user (public driver) benefits from cross-network roaming + seamless plug-and-charge. UK 2025-26 reality: this is where the protocol’s value compounds. Cert evidence bundle is rich; ongoing operator scope is substantial."
          />

          <CommonMistake
            title="Skipping OCPP commissioning + handing the customer chargers with default credentials"
            whatHappens="Installer commissions the physical install (Section 722 + Part 6) but doesn’t configure OCPP. Customer receives chargers with default factory credentials; can’t connect to their CPMS. Customer waits for installer return visit or self-configures (sometimes incorrectly). Operational delay; customer dissatisfaction; reputation damage."
            doInstead="OCPP commissioning is part of the install, not a customer task. Get the CPMS endpoint + credentials from the customer’s IT / operator at quote stage. Configure each charger at commissioning. Test boot + heartbeat + auth + smart-charging. Cert evidence bundle records OCPP commissioning results. Customer receives a working integrated install."
          />

          <CommonMistake
            title="Using OCPP-incompatible / proprietary-protocol chargers on a multi-vendor site"
            whatHappens="Customer wants multi-vendor flexibility (some Wallbox + some EO chargers). Installer specs one of the brands as a cheap import that uses a proprietary protocol — works only with the OEM’s own CPMS. Customer can’t integrate all 8 chargers into a single CPMS. Loses the multi-vendor value; needs to either replace those chargers or run two separate CPMS."
            doInstead="Specify OCPP-compliant chargers at quote stage. Confirm the manufacturer DoC declares OCPP 1.6 (minimum) or 2.0.1 (premium). Cert evidence bundle records the OCPP version per charger. Open-protocol support is the customer’s long-term value protection."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'OCPP = Open Charge Point Protocol. Open-source industry standard for chargepoint ↔ CPMS communication. Managed by Open Charge Alliance.',
              'OCPP 1.6 dominant (UK 2025-26 mainstream). OCPP 2.0.1 emerging — TLS-mandatory, ISO 15118 integration, richer smart-charging, better firmware.',
              'CPMS = cloud / on-premise software managing a fleet of chargers via OCPP. Auth, billing, monitoring, diagnostics, firmware, smart-charging.',
              'Authentication methods: RFID (~80% UK commercial), mobile app, ISO 15118 plug-and-charge (emerging), contactless bank card (PCAR public).',
              'Smart-charging via OCPP SetChargingProfile messages. CPMS coordinates multi-charger site DLM, tariff windows, fleet priorities.',
              'ISO 15118 plug-and-charge: automatic vehicle ↔ charger credential exchange via PLC over CP. Emerging UK 2025-26 on premium kit.',
              'Network architecture: Ethernet primary + cellular backup = resilient pattern. Wi-Fi-only least reliable.',
              'OCPP 2.0.1 mandates TLS security. Each charger has client certificate; installer commissions + documents renewal procedure.',
              'OCPP commissioning per charger: endpoint URL, credentials, identifier, boot notification + heartbeat + auth + smart-charging tests.',
              'OCPI = CPMS ↔ CPMS roaming protocol (Hubject is the dominant European hub). Separate from OCPP but operationally connected.',
              'Cert evidence bundle records: OCPP version per charger + endpoint + credentials reference + commissioning tests + network architecture + CPMS account holder.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 4 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-7-section-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Mode 4 DC fast charging
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-7-section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                7.5 DLM at scale & charging clusters
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
