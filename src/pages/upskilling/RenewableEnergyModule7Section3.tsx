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
import { Mode4DcArchitecture } from '@/components/study-centre/diagrams/renewableSld';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm7s3-mode-4-power',
    question: 'What power range defines Mode 4 DC fast charging in UK 2025-26?',
    options: [
      '7 kW only',
      '50 kW (early generation), 150 kW (current mid-market), 350 kW (ultra-rapid). The charger includes the AC-to-DC conversion electronics internally, delivering DC directly to the vehicle’s battery and bypassing the vehicle’s on-board charger',
      '22 kW max',
      '1 MW',
    ],
    correctIndex: 1,
    explanation:
      'Mode 4 DC fast charging delivers DC power directly to the vehicle’s battery via the CCS Combo 2 (or CHAdeMO or Tesla NACS) connector. UK 2025-26 generations: 50 kW = early hardware (~2017-onwards); 150 kW = current mid-market mainstream; 350 kW = ultra-rapid hubs (motorway service hubs). The internal AC-to-DC conversion electronics (typically liquid-cooled IGBT modules) handle the conversion + voltage regulation; vehicle on-board charger bypassed. Cable + connector sized for the full DC current (200 A+ on 150 kW units, 500 A+ on 350 kW units — often liquid-cooled cables).',
  },
  {
    id: 'm7s3-61851-23',
    question: 'Which BS EN standard covers DC charging stations specifically?',
    options: [
      'BS EN 61851-1 only',
      'BS EN 61851-23 — DC electric vehicle charging station requirements (DC fast charging electronics, safety, communication). Layered with BS EN 61851-1 (general requirements for the family) and BS EN IEC 62196-3 (DC accessories like CCS Combo 2)',
      'BS EN 60898 only',
      'BS 7671 only',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 61851 series structure: -1 general requirements; -22 AC EV charging stations; -23 DC EV charging stations; -24 digital communication. Mode 4 DC fast charging stations conform to BS EN 61851-23 (and -1 for general framework). Manufacturer DoC declares parts applied. UK 2025-26 reputable Mode 4 brands (ABB Terra, Tritium PKM, Alpitronic HYC, Kempower S-series, EVgo + Tesla) all declare -23 conformity. Reg 722.511.101 mandates conformity to "appropriate parts of BS EN 61851 series" — for DC fast, that’s -1 + -23 + -24. Cert evidence bundle records the parts declared.',
  },
  {
    id: 'm7s3-ccs-combo-2',
    question: 'CCS Combo 2 connector — how does it differ from the standard Type 2 connector?',
    options: [
      'It’s the same',
      'CCS Combo 2 = standard Type 2 AC connector (top) + two large DC pins (bottom) for high-current DC. One physical socket on the vehicle accepts BOTH AC Mode 3 (via Type 2 cable) AND DC Mode 4 (via CCS Combo 2 cable). UK / European DC fast standard per BS EN IEC 62196-3. CHAdeMO uses a SEPARATE DC-only socket on the vehicle',
      'CCS is CHAdeMO',
      'Smaller than Type 2',
    ],
    correctIndex: 1,
    explanation:
      'CCS Combo 2 = Combined Charging System Combo 2. Per BS EN IEC 62196-3. The vehicle has a SINGLE physical socket that accepts both AC (Mode 3 via Type 2 plug) and DC (Mode 4 via CCS Combo 2 plug). When AC charging: the Type 2 cable’s top connector engages the AC pins; the DC pins are inactive. When DC fast charging: the CCS plug engages BOTH the top AC pins (CP signalling + safety) AND the bottom DC pins (high-current DC delivery). Same vehicle, one socket, two modes. CHAdeMO is the alternative Japanese-market DC standard, declining in UK 2025-26 — uses a SEPARATE DC-only socket on the vehicle. Tesla NACS is the USA-origin DC standard expanding into UK 2025-26.',
  },
  {
    id: 'm7s3-supply-requirements',
    question: 'What DNO supply infrastructure is typically required for a 150 kW Mode 4 charger?',
    options: [
      'Domestic 100 A single-phase',
      'Three-phase LV supply at ~250 A per phase (150 kW / 400 V / √3 ≈ 217 A per phase nominal, plus efficiency losses + diversity). For multi-charger hubs (typically 6-12 chargers): dedicated DNO HV connection (11 kV typical) + on-site transformer (1,000-2,000 kVA) + LV switchgear. Single 150 kW on existing commercial LV supply: rare; typically requires DNO upgrade',
      'Standard domestic supply',
      '24 V DC',
    ],
    correctIndex: 1,
    explanation:
      'Single 150 kW Mode 4 charger nominally needs ~217 A per phase at 400 V three-phase (ignoring losses). With conversion efficiency ~93-95% + power factor + DLM headroom, actual peak current ~240-260 A per phase. Commercial LV supplies typically max ~400-630 A per phase — accommodating maybe 2-3 × 150 kW chargers if dedicated. Multi-charger hubs (6+ × 150 kW or any 350 kW units) require dedicated HV connection (11 kV typical) + on-site transformer + LV switchgear. UK 2025-26 lead time for new HV connection: 6-18 months + significant cost (£100-£500k+). Cert evidence bundle records the DNO connection agreement + transformer specification + LV switchgear conformity.',
  },
];

const quizQuestions = [
  {
    question: 'A public DC fast hub developer wants 8 × 150 kW chargers + 2 × 350 kW ultra-rapid. Total supply requirement?',
    options: [
      '100 A',
      '8 × 150 kW + 2 × 350 kW = 1,900 kW peak. With DLM + diversity (~70%): real demand ~1,330 kW. At 11 kV HV: ~70 A on HV side; transformer ~2,000 kVA. Site infrastructure: dedicated substation + transformer + LV switchgear + canopy + payment infra. Cost: ~£500k-£1.5m total project. Lead time: 6-18 months DNO + planning + civils',
      '32 A three-phase',
      'No DNO involvement',
    ],
    correctAnswer: 1,
    explanation:
      'Multi-charger ultra-rapid hubs are major grid infrastructure projects. Peak load arithmetic: 8 × 150 + 2 × 350 = 1,200 + 700 = 1,900 kW. Real demand with DLM (60-70% utilisation typical at UK 2025-26 hubs): ~1,300 kW. HV-side current at 11 kV three-phase: ~70 A. Transformer sized for ~2,000 kVA with headroom + voltage regulation. LV switchgear handles the ~2,000 A per phase nominal. Project cost dominated by grid infrastructure (transformer + substation + connection + LV switchgear ~£200-£500k) + canopy + payment + chargers (~£40-100k per unit × 10 = £400-1,000k). Lead time: DNO connection 6-18 months + planning + civils. Cert evidence bundle integrates the full vendor / engineering / regulatory picture.',
  },
  {
    question: 'Why are 150 kW+ Mode 4 charging cables typically liquid-cooled?',
    options: [
      'Aesthetics',
      'High DC current (200-500 A) through a flexible cable for sustained periods creates significant I²R heat. At 500 A continuous, conventional dry cable would need ~95-120 mm² copper and weigh too much for the customer to handle (~6-8 kg per metre). Liquid-cooled cables use smaller-conductor copper (~50 mm²) with internal coolant circulation; manageable customer-facing weight (~2-3 kg/m). 50 kW units typically use dry cable; 150 kW+ use liquid-cooled',
      'Cheaper that way',
      'Required by law',
    ],
    correctAnswer: 1,
    explanation:
      'I²R heat in the charging cable scales with current squared. 50 kW @ ~200 A through dry conventional copper cable: manageable thermal; ~50-70 mm² copper + insulation; cable weight ~3-4 kg/m. 150 kW @ ~400 A: cable would need ~95 mm² for thermal headroom = ~5-6 kg/m. 350 kW @ 500 A+: ~120-150 mm² dry = 7-9 kg/m — uncomfortable + impossible for customer to handle. Liquid-cooled cables (water-glycol coolant pumped through cable around smaller-section copper) drop the operating temperature; allow smaller copper (~50 mm² at 500 A); cable weight ~2-3 kg/m. UK 2025-26 reality: 50 kW = dry cable; 150 kW = either depending on manufacturer; 350 kW = always liquid-cooled. Cable is part of the charger; not customer-supplied. Cert evidence bundle records the cable type + thermal management spec.',
  },
  {
    question: 'BS EN IEC 62196-3 vs BS EN IEC 62196-2 — what’s the difference?',
    options: [
      'Same standard',
      'BS EN IEC 62196-2 = AC accessories (Type 2 connector for Mode 3 single-phase + three-phase). BS EN IEC 62196-3 = DC accessories (CCS Combo 2 connector for Mode 4 DC fast). Both part of the BS EN IEC 62196 family of conductive EV charging accessories. Multi-mode vehicle socket combines AC pins (62196-2) + DC pins (62196-3) in one physical inlet',
      '62196-3 is industrial only',
      '62196-2 is obsolete',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN IEC 62196 family: -1 general; -2 AC accessories (Type 2 for Mode 3); -3 DC accessories (CCS Combo 2 for Mode 4); -6 ultra-high-power DC (emerging for >350 kW). UK / European EV inlet integrates -2 + -3 into a single Combined Charging System Combo 2 physical socket on the vehicle — accepts both AC Mode 3 and DC Mode 4 plugs. CHAdeMO has its own separate connector standards (declining in UK). Tesla NACS is a different connector + protocol family (USA-origin, expanding). Cert evidence bundle for a Mode 4 install records the connector standards (-2 + -3) declared by the charger manufacturer.',
  },
  {
    question: 'For a 50 kW DC fast charger on a commercial site with existing 200 A LV supply per phase, can the existing supply accommodate?',
    options: [
      'No',
      '50 kW Mode 4 ≈ 80 A per phase nominal (50,000 / 400 / √3 ≈ 72 A; + efficiency losses + DLM headroom ~80 A). On a 200 A per phase supply: yes, accommodating 50 kW Mode 4 + the existing site base load is feasible. DLM still recommended to manage coincident peak. G99 application typically required (above G98 threshold)',
      'Need 1 MW supply',
      'Domestic supply OK',
    ],
    correctAnswer: 1,
    explanation:
      '50 kW Mode 4 is the smallest Mode 4 generation + the most accommodating for existing commercial LV supplies. Nominal current per phase: 50,000 / 400 / √3 ≈ 72 A; with efficiency losses + DLM headroom ~80 A per phase. A commercial site with 200 A per phase existing LV supply can accommodate one 50 kW charger + existing base load (subject to DLM). G99 application typically required (above G98 per-phase threshold; full Mode 4 commercial charger). Cert evidence bundle records the supply capacity assessment + DNO G99 reference. UK 2025-26 reality: 50 kW units suit retail / supermarket / smaller commercial sites where existing LV supply has headroom; 150 kW+ requires HV upgrade.',
  },
  {
    question: 'Where do Reg 722.411.4 PME-on-EV alternatives apply on a Mode 4 DC fast install?',
    options: [
      'Don’t apply',
      'Apply uniformly — Section 722 scope includes DC fast. The PME-on-EV outdoor prohibition + alternatives (b)-(e) apply per charger. Common routes are (b) dedicated TT electrode or (c) OPDD integrated in the charger. Route (b) is used at some multi-charger hubs, but Reg 722.411.4 NOTE 3 cautions a TT system may not be appropriate where sufficient separation from PEN-connected buried metalwork can’t be assured',
      'Only for AC',
      'Only for domestic',
    ],
    correctAnswer: 1,
    explanation:
      'Section 722 scope includes Mode 4 DC fast — same Reg 722.411.4 PME-on-EV prohibition applies. Outdoor Mode 4 charger on TN-C-S supply needs one of (b)-(e) alternatives. UK 2025-26 commercial reality: route (b) dedicated TT electrode is used at some multi-charger hubs (a dedicated on-site transformer’s LV side can be earthed as a TT system). But Reg 722.411.4 NOTE 3 cautions that creating a TT system may not be an appropriate solution where sufficient separation from buried metalwork connected to the supply PEN conductor can’t be assured — so a TT electrode is route (b), not a default. A dedicated on-site transformer giving a genuinely separated source is instead the Reg 722.413.1.2 route. Route (c) OPDD integrated in the Mode 4 charger’s power electronics is also common (manufacturer-declared). Cert evidence bundle records the chosen route + manufacturer DoC + electrode Ra (if route b).',
  },
  {
    question: 'Mode 4 charger commissioning — what additional tests are required beyond Mode 3?',
    options: [
      'Same as Mode 3',
      'BS EN 61851-23 DC commissioning per manufacturer procedure: high-voltage DC isolation verification, DC contactor functional test, vehicle CP/PP + DC-side communication negotiation, liquid-cooling system function (if applicable), thermal monitoring + over-temperature protection self-test, payment terminal commissioning (if public), OCPP integration test. Reg 722.531.3.101 / 411 ADS verified per phase on the AC input. Manufacturer-specific procedures documented in cert evidence bundle',
      'No commissioning',
      'Customer tests it',
    ],
    correctAnswer: 1,
    explanation:
      'Mode 4 commissioning extends the Mode 3 procedure with DC-specific tests. Beyond Mode 3 (Part 6 visual + IR + RCD + ADS + Section 722 OPDD + RDC-PD + CP/PP): Mode 4 adds high-voltage DC isolation verification (~750-1000 VDC bus); DC contactor functional test (the charger’s internal DC contactors that engage when the vehicle is plugged in); DC-side communication negotiation (vehicle and charger exchange DC current + voltage capability); liquid-cooling system function (if applicable); thermal monitoring + over-temperature protection self-test; payment terminal commissioning (PCAR-compliant for public); OCPP integration test with the CPMS. Manufacturer-specific procedure detailed in the install manual. Cert evidence bundle for Mode 4 install is significantly thicker than Mode 3 — DC commissioning + manufacturer engineer sign-off often required for warranty.',
  },
];

const faqs = [
  {
    question: 'Tesla NACS in UK — where does it fit?',
    answer:
      'Tesla NACS (North American Charging Standard) is Tesla’s proprietary connector + protocol, recently opened up for industry adoption in the USA. UK 2025-26 reality: NACS is emerging as a second DC fast standard alongside CCS Combo 2 at some new hubs (Tesla Supercharger network is now opening to non-Tesla EVs with adapters; some new public hubs offer both CCS and NACS). Reg 722 + BS EN 61851-23 still apply at the install level; the connector standard is the difference. Cert evidence bundle records which connector(s) the install supports.',
  },
  {
    question: 'CHAdeMO — still installing in UK 2025-26?',
    answer:
      'Declining but present. UK 2025-26 reality: new public DC fast installs are predominantly CCS-only or CCS + Tesla NACS. Dedicated CHAdeMO units are rare on new installs; some multi-protocol units include a CHAdeMO outlet alongside CCS. Legacy Japanese-market vehicles (early Nissan Leaf, Mitsubishi i-MiEV, Outlander PHEV early) still use CHAdeMO. Cert evidence bundle records the connector standards supported.',
  },
  {
    question: 'How does Section 722 + Chapter 82 interact on a V2G-capable DC fast charger?',
    answer:
      'V2G DC fast = bidirectional Mode 4. The vehicle becomes a SOURCE within the PEI when discharging back to grid. Section 722 covers the EV-circuit safety. Chapter 82 (Prosumer’s Electrical Installation) governs the bidirectional integration — neutral handling, anti-islanding, protective-measure persistence across grid → island transitions. Reg 826.1.1.2.2 explicit on neutral in island mode. Currently rare in UK 2025-26 commercial; V2G at scale is emerging (trial programmes with fleet operators + utility partnerships). M10 covers V2G in depth.',
  },
  {
    question: 'Inductive (wireless) DC charging — Section 722 scope?',
    answer:
      'Inductive charging is EXCLUDED from Section 722 scope (M6.1 covered this). IEC 61980 series covers inductive specifically. Inductive at DC fast scale is emerging (taxi ranks, bus depots) but UK 2025-26 install volume is negligible. Where inductive is encountered, BS EN IEC 61980 is the applicable product standard; the install side still follows BS 7671 general requirements + relevant Sections (522 external influences, 411 ADS, etc.).',
  },
  {
    question: 'Mode 4 ultra-rapid charging cable lifetime?',
    answer:
      'Liquid-cooled cables on 350 kW units have shorter service life than dry cables due to mechanical stress + cooling system + frequent plug-in cycles. UK 2025-26 typical: 5-7 year cable replacement at 350 kW hubs (vs 10-15 years for dry Mode 3 cables). Cable replacement is a manufacturer / service contract item; install date + estimated replacement schedule in cert evidence bundle for the hub operator.',
  },
];

export default function RenewableEnergyModule7Section3() {
  const navigate = useNavigate();

  useSEO({
    title: 'Mode 4 DC fast charging | Renewable Energy 7.3 | Elec-Mate',
    description:
      'Mode 4 DC fast EV charging — BS EN 61851-23 DC stations, CCS Combo 2 (BS EN IEC 62196-3), CHAdeMO + Tesla NACS, 50/150/350 kW generations, liquid-cooled cables, DNO HV supply requirements, transformer + LV switchgear infrastructure.',
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
            eyebrow="Module 7 · Section 3 · BS 7671:2018+A4:2026 · Section 722 + BS EN 61851-23 + BS EN IEC 62196-3"
            title="Mode 4 DC fast charging"
            description="DC fast EV charging — BS EN 61851-23 DC charging stations, CCS Combo 2 connector (BS EN IEC 62196-3), CHAdeMO + Tesla NACS variants, 50 / 150 / 350 kW generations, liquid-cooled cables on high-power units, DNO HV supply infrastructure, transformer + LV switchgear."
            tone="yellow"
          />

          <TLDR
            points={[
              'Mode 4 = DC fast charging. Charger contains internal AC-to-DC conversion electronics; delivers DC directly to vehicle battery bypassing the vehicle’s on-board charger.',
              'UK 2025-26 generations: 50 kW (early-mainstream, retail / supermarket sites), 150 kW (current mid-market, public hubs), 350 kW (ultra-rapid, motorway service hubs).',
              'BS EN 61851-23 — DC charging station product standard. Layered with BS EN 61851-1 (general) and BS EN IEC 62196-3 (DC accessories like CCS Combo 2 connector).',
              'CCS Combo 2 — UK / European DC fast standard. Single vehicle socket accepts both AC (Mode 3 via Type 2 plug) and DC (Mode 4 via CCS Combo 2 plug). Per BS EN IEC 62196-3.',
              'CHAdeMO — declining Japanese DC standard, separate vehicle socket. Tesla NACS — USA-origin standard, expanding into UK at some new hubs.',
              'Supply requirements: 50 kW ≈ 80 A per phase (existing commercial LV often accommodates); 150 kW ≈ 240 A per phase (typically dedicated supply); 350 kW + multi-charger hubs = HV DNO connection + on-site transformer + LV switchgear.',
              'Liquid-cooled cables on 150 kW+ units — high DC current + flexibility + ergonomic weight at the customer-facing end. 50 kW typically dry cable; 350 kW always liquid-cooled.',
              'Section 722 PME-on-EV alternatives still apply per charger (M6.2). Commissioning extends Mode 3 procedure with DC-specific tests (DC isolation, DC contactor, communication negotiation, thermal protection, payment terminal — if public).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish Mode 4 DC fast from Mode 3 AC: internal AC-to-DC conversion, DC delivery, bypass of vehicle on-board charger.',
              'Identify the BS EN 61851-23 + BS EN IEC 62196-3 product standards for DC fast equipment + connectors.',
              'Compare CCS Combo 2, CHAdeMO, Tesla NACS connector standards + their UK 2025-26 install relevance.',
              'Size the DNO supply for Mode 4 generations (50 kW commercial LV, 150 kW dedicated, 350 kW HV).',
              'Recognise liquid-cooled cable requirements on 150 kW+ designs + the maintenance / replacement implications.',
              'Apply Section 722 PME-on-EV alternatives uniformly per Mode 4 charger.',
              'Run Mode 4 commissioning per manufacturer procedure: DC isolation + contactor + communication + thermal + payment + OCPP.',
              'Assemble the Mode 4 cert evidence bundle: BS 7671 + 61851-23 + 62196-3 + DNO G99 + transformer + LV switchgear + PCAR / PAS 1899 (if public) + commissioning per charger.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            DC fast charging is electrical infrastructure dressed as a customer-facing kiosk. The transformer behind the pillar is where the money lives.
          </Pullquote>

          <ContentEyebrow>What Mode 4 DC fast actually is</ContentEyebrow>

          <ConceptBlock
            title="The AC-to-DC conversion moves into the charger"
            plainEnglish="In Mode 3 AC charging (M6 + M7.2), the vehicle’s on-board charger handles the AC-to-DC conversion + battery management. The wallbox just delivers regulated AC. In Mode 4 DC fast charging, the charger ITSELF contains the AC-to-DC conversion electronics — high-power IGBT modules, magnetics, control + protection electronics. The charger negotiates with the vehicle’s BMS and delivers regulated DC directly to the battery."
            onSite="Mode 4 chargers are bigger, heavier, more expensive than Mode 3 — the internal conversion electronics add ~£15-50k of cost depending on power rating. UK 2025-26 dominant brands: ABB Terra, Tritium PKM, Alpitronic HYC, Kempower S-series, EVgo, Tesla Supercharger V3 / V4. Each manufacturer’s electronics + cooling + communication are slightly different; cert evidence bundle records the model + serial number + manufacturer DoC + commissioning per manufacturer procedure."
          >
            <p>Mode 4 architecture vs Mode 3:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Mode 3 AC</strong> — wallbox delivers
                regulated AC; vehicle on-board charger does AC-to-DC + BMS communication.
                Wallbox size: ~30 × 50 cm, ~5-10 kg
              </li>
              <li>
                <strong className="text-white">Mode 4 DC</strong> — charger contains
                AC-to-DC electronics + thermal management + DC contactors + communication.
                Vehicle’s BMS still manages the battery but receives DC directly.
                Charger size: ~1-2 m tall, 30-200 cm wide, 100-2,000 kg
              </li>
              <li>
                <strong className="text-white">Power
                  range</strong> — Mode 3: 3.7-22 kW typical. Mode 4: 50-350 kW typical;
                emerging 500 kW + 1 MW for HGV
              </li>
              <li>
                <strong className="text-white">Vehicle compatibility</strong> — Mode 3:
                works with any EV (even slow OBCs fall back gracefully). Mode 4: vehicle
                must have DC fast charging capability (most modern EVs do; some early
                models or low-end don’t)
              </li>
              <li>
                <strong className="text-white">Charging time</strong> — Mode 3: 8-12 hours
                for typical 60 kWh battery. Mode 4 at 150 kW: ~25-40 min to 80%. Mode 4 at
                350 kW: ~15-20 min to 80% (battery + vehicle ramping limits)
              </li>
              <li>
                <strong className="text-white">Cost per
                  unit</strong> — Mode 3: £600-£4,000 (domestic to commercial workplace).
                Mode 4: £15-100k+ depending on power rating
              </li>
              <li>
                <strong className="text-white">Site infrastructure</strong> — Mode 3:
                typically existing supply. Mode 4 50 kW: existing commercial LV may
                accommodate; 150+ kW: usually dedicated DNO upgrade or HV; multi-hub:
                dedicated substation + transformer
              </li>
            </ul>
          </ConceptBlock>

          <Mode4DcArchitecture caption="In Mode 4 the AC→DC conversion happens in the charger, not the car." />

          <RegsCallout
            source="BS EN 61851-23 — DC Electric Vehicle Charging Station product standard"
            clause="BS EN 61851-23 specifies requirements for DC charging stations supplying electric vehicles — including safety, communication, fault protection, thermal management, isolation, DC contactor function, and commissioning verification. Layered with BS EN 61851-1 (general) and BS EN IEC 62196-3 (DC accessories)."
            meaning={`BS EN 61851-23 is the product standard for Mode 4 DC fast chargers. Manufacturer DoC declares conformity. UK 2025-26 reputable brands all declare. Reg 722.511.101 of BS 7671 mandates conformity to "appropriate parts of BS EN 61851 series" — for Mode 4 DC fast that’s -1 (general) + -23 (DC stations) + often -24 (digital communication). Installer verifies via DoC at quote stage; cert evidence bundle includes the DoC + test certificate references.`}
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Connector families — CCS Combo 2, CHAdeMO, Tesla NACS</ContentEyebrow>

          <Pullquote>
            One vehicle socket. Two pin sets. Same physical inlet supports AC Mode 3 and DC Mode 4 — that’s the genius of CCS Combo 2.
          </Pullquote>

          <ConceptBlock
            title="CCS Combo 2 — UK / European DC fast standard"
            plainEnglish="CCS Combo 2 = Combined Charging System Combo 2 per BS EN IEC 62196-3. The vehicle has ONE physical inlet that accepts both AC Mode 3 (via Type 2 plug per BS EN IEC 62196-2) and DC Mode 4 (via CCS Combo 2 plug per BS EN IEC 62196-3). The CCS Combo 2 plug extends below the Type 2 plug with two large DC pins."
            onSite="UK / European EVs (manufactured for the UK / EU market) carry CCS Combo 2 inlets as standard. Plug-in EVs from VW Group, BMW, Mercedes, Ford, Hyundai, Kia, Volvo, Polestar, MG, Nissan (post-2018), Vauxhall, Citroen, Peugeot, Renault, etc. — all CCS Combo 2. UK 2025-26 reality: CCS Combo 2 is the dominant standard at new DC fast installs."
          >
            <p>CCS Combo 2 pin set:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Top (Type 2 portion)</strong> — L1, L2, L3,
                N, PE, CP, PP. Same 7-pin layout as standard Type 2 connector (per BS EN
                IEC 62196-2). Used for AC Mode 3 charging
              </li>
              <li>
                <strong className="text-white">Bottom (DC portion)</strong> — two large DC
                power pins (DC+ and DC-) sized for high current (up to 500+ A on
                ultra-rapid). Per BS EN IEC 62196-3
              </li>
              <li>
                <strong className="text-white">Dual mode</strong> — same vehicle inlet
                accepts both plug types. AC plug engages top pins only; DC plug engages
                top (signalling) + bottom (DC delivery)
              </li>
              <li>
                <strong className="text-white">Communication</strong> — DC charging uses
                ISO 15118 (Digital Communication, PLC-over-CP) negotiating voltage, current,
                state-of-charge updates, plug-and-charge authentication
              </li>
              <li>
                <strong className="text-white">UK 2025-26
                  dominance</strong> — virtually every new EV sold in UK 2025-26 has CCS
                Combo 2. Public DC fast hubs predominantly CCS-only or CCS + Tesla NACS
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — charger manufacturer DoC citing BS EN IEC 62196-3
                conformity + ISO 15118 if plug-and-charge supported
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="CHAdeMO and Tesla NACS — secondary DC standards"
            plainEnglish="CHAdeMO = Japanese DC standard, separate vehicle inlet from CCS. Declining in UK 2025-26 as the legacy Japanese-market EVs age out. Tesla NACS = USA-origin standard, emerging in UK 2025-26 as Tesla opens the Supercharger network + non-Tesla brands adopt the connector."
            onSite="UK 2025-26 new install reality: CCS Combo 2 always; CHAdeMO rarely (legacy support only); Tesla NACS emerging on Tesla Supercharger sites + some new multi-protocol hubs. Customer-facing implication: vehicles with CCS-only socket can’t use CHAdeMO chargers and vice versa; adapters exist (Tesla NACS → CCS for example) but introduce complexity."
          >
            <p>Connector landscape UK 2025-26:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">CCS Combo 2 (dominant)</strong> — per BS EN
                IEC 62196-3. Virtually all UK 2025-26 new EVs. New install standard
              </li>
              <li>
                <strong className="text-white">CHAdeMO (declining)</strong> — Japanese
                origin. Legacy Nissan Leaf early models, Mitsubishi, Lexus. UK 2025-26 new
                installs rarely include dedicated CHAdeMO; multi-protocol units may add
                CHAdeMO outlet
              </li>
              <li>
                <strong className="text-white">Tesla NACS (emerging)</strong> — USA origin;
                Tesla’s North American Charging Standard. Opening to industry adoption.
                UK 2025-26: appearing on Tesla Supercharger sites open to non-Tesla EVs +
                some new multi-protocol hubs
              </li>
              <li>
                <strong className="text-white">GB/T (Chinese)</strong> — Chinese-market
                standard. Not in UK domestic install scope; appears on imported Chinese
                EVs (rare in UK)
              </li>
              <li>
                <strong className="text-white">Multi-protocol units</strong> — some
                commercial DC fast chargers include 2 or 3 connector cables (CCS + CHAdeMO,
                or CCS + NACS) to support multiple vehicle types at one bay
              </li>
              <li>
                <strong className="text-white">Adapters</strong> — vehicle-to-connector
                adapters exist (e.g. NACS → CCS for non-Tesla vehicles using Superchargers)
                but customer-side; not installer’s scope
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Supply infrastructure — from LV to HV</ContentEyebrow>

          <ConceptBlock
            title="Supply scaling per Mode 4 generation"
            plainEnglish="Mode 4 charger generations have very different supply requirements. 50 kW units fit on existing commercial LV supplies. 150 kW units typically require dedicated supply upgrade. 350 kW + multi-charger hubs require HV DNO connection + on-site transformer + LV switchgear."
            onSite="Supply assessment is the first design step. Sketch the per-phase current at peak load; compare to existing supply capacity. UK 2025-26 reality: 50 kW Mode 4 single charger is feasible on most commercial LV supplies. 150 kW+ usually drives new connection / HV upgrade. Multi-charger hubs are real-estate + grid projects with electrical inside."
          >
            <p>Supply requirements by power rating:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">50 kW Mode 4</strong> — ~80 A per phase
                nominal at 400 V three-phase. Most commercial LV supplies (200-400 A per
                phase) accommodate one 50 kW unit + existing base load + DLM. G99
                application typical
              </li>
              <li>
                <strong className="text-white">150 kW Mode 4</strong> — ~240 A per phase
                nominal. Existing commercial LV usually insufficient; DNO upgrade
                typical (new connection ~400-630 A per phase) or HV (11 kV) connection.
                G99 application + DNO approval mandatory
              </li>
              <li>
                <strong className="text-white">350 kW Mode 4</strong> — ~550 A per phase
                nominal per charger. Multi-charger 350 kW hub requires dedicated HV
                connection + on-site transformer (1-2 MVA per hub of 4-8 chargers) + LV
                switchgear. £100-£500k+ grid infrastructure cost; 6-18 month lead time
              </li>
              <li>
                <strong className="text-white">Multi-charger hubs</strong> — 6-12
                chargers per hub typical. DLM coordinates across all units; peak demand
                ~60-70% of nominal aggregate (utilisation factor). HV connection +
                substation + transformer + LV switchgear. Real estate + planning + civils
                are major components of the project alongside electrical
              </li>
              <li>
                <strong className="text-white">Transformer
                  sizing</strong> — typically 1.5-2× peak nominal demand for margin +
                future expansion. 1,500-2,000 kVA common at 6-8 × 150 kW hubs
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> — DNO
                connection agreement + reference + transformer specification + LV
                switchgear conformity to BS EN IEC 61439-1 / -2 + (relevant SLD)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Liquid-cooled cables on 150 kW+ designs"
            plainEnglish="High DC current (200-500 A) through a flexible cable for sustained periods creates significant I²R heat. Conventional dry cable would need oversized copper (~95-150 mm²) to handle thermal load — too heavy for the customer to manhandle. Liquid-cooled cables circulate water-glycol coolant around smaller-section copper, dropping operating temperature and cable weight."
            onSite="Liquid-cooled cables are part of the charger (factory-fitted, customer-facing); not site-built. Cooling system has its own pump + reservoir + heat exchanger inside the charger pillar. Manufacturer service contract covers cable + cooling system maintenance / replacement (typically 5-7 year cable replacement at 350 kW intensive sites)."
          >
            <p>Liquid-cooled cable considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Dry cable limits</strong> — conventional
                dry copper cable at 500 A sustained needs ~120-150 mm² + thermal headroom
                = ~7-9 kg/m. Uncomfortable for customer to manhandle
              </li>
              <li>
                <strong className="text-white">Liquid-cooled cable</strong> — water-glycol
                coolant pumped through cable around ~50 mm² copper. Operating temperature
                dropped; cable weight ~2-3 kg/m
              </li>
              <li>
                <strong className="text-white">Generation
                  thresholds</strong> — 50 kW typically dry cable; 150 kW manufacturer
                choice; 350 kW always liquid-cooled
              </li>
              <li>
                <strong className="text-white">Cooling
                  system</strong> — pump + reservoir + heat exchanger inside the charger
                pillar. Service interval typically annual
              </li>
              <li>
                <strong className="text-white">Cable lifetime</strong> — 5-7 years
                typical at 350 kW intensive sites; longer at lower utilisation. Cable
                replacement is a manufacturer / service contract item
              </li>
              <li>
                <strong className="text-white">Customer-facing
                  weight</strong> — manageable (2-3 kg/m) so end users can plug in
                without strain; mounted holster on the pillar reduces lifting requirement
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — cable type + cooling system spec + manufacturer
                service interval + first cable replacement scheduled date
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="ISO 15118 — digital communication for DC fast"
            plainEnglish="ISO 15118 is the digital communication protocol the EV and the Mode 4 charger use to negotiate DC charging — voltage, current, state-of-charge, plug-and-charge authentication. Communication is via PLC (Power Line Communication) over the Control Pilot pin — same physical CP pin as Mode 3, but with digital data riding the signal."
            onSite="UK 2025-26 reality: ISO 15118-2 (DIN SPEC 70121 legacy + ISO 15118-2 current) is the standard implementation on virtually all CCS Combo 2 Mode 4 chargers. ISO 15118-20 (next-generation, supports bidirectional V2G + wireless charging + advanced PnC) emerging. Plug-and-charge: vehicle authenticates to the network via certificate exchange; customer plugs in + walks away. Cert evidence bundle records the ISO 15118 version + plug-and-charge support + manufacturer DoC."
          >
            <p>ISO 15118 capability layers:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">DIN SPEC 70121</strong> — legacy DC
                communication (basic negotiation, no plug-and-charge). Pre-2018 CCS chargers
              </li>
              <li>
                <strong className="text-white">ISO 15118-2</strong> — current standard.
                Supports plug-and-charge with PKI certificate exchange. UK 2025-26
                mainstream
              </li>
              <li>
                <strong className="text-white">ISO 15118-20</strong> — next-generation.
                Supports bidirectional V2G + wireless charging + simplified PnC. Emerging
                in UK 2025-26
              </li>
              <li>
                <strong className="text-white">PLC over CP</strong> — physical
                implementation. HomePlug Green PHY 10 Mbps digital data riding the
                Control Pilot signal
              </li>
              <li>
                <strong className="text-white">Plug-and-charge</strong> — vehicle
                certificate authenticates to operator’s back-office; charging session
                authorised without RFID / app / contactless card
              </li>
              <li>
                <strong className="text-white">Pricing transparency</strong> — ISO
                15118-2 supports the charger displaying tariff to the vehicle; vehicle
                shows price to driver before authorising. PCAR 2023 alignment
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> — ISO 15118
                version + plug-and-charge support + manufacturer DoC + commissioning test
                with a known-compatible vehicle
              </li>
            </ul>
          </ConceptBlock>

          <Pullquote>
            Liquid-cooled cable, dedicated HV substation, ISO 15118 plug-and-charge — DC fast is where electrical install meets digital infrastructure.
          </Pullquote>

          <ConceptBlock
            title="Liquid-cooled cable maintenance"
            plainEnglish="Liquid-cooled cable on a high-power Mode 4 charger has a cooling system: pump + reservoir + heat exchanger + coolant fluid inside the charger pillar. Ongoing maintenance is on the CPO + manufacturer — coolant level checks, pump function, cable replacement on schedule. The installer’s role ends at commissioning; ongoing maintenance is a separate service contract."
            onSite="At install + handover, document the cooling system specification + manufacturer service interval + first cable replacement scheduled date. The CPO (or site operator) owns the maintenance schedule. UK 2025-26 manufacturer service contracts typically include annual cooling system inspection + 5-7 year cable replacement at 350 kW intensive sites. Coolant fluid is manufacturer-specified (water-glycol mix typical); replenishment is a service task, not a customer DIY."
          >
            <p>Liquid-cooled cable maintenance considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Cooling system inspection</strong> — annual
                typical. Pump function, coolant level, heat exchanger function, leak check
              </li>
              <li>
                <strong className="text-white">Coolant replenishment</strong> —
                manufacturer-specified (water-glycol typical). Service contract item
              </li>
              <li>
                <strong className="text-white">Cable replacement
                  interval</strong> — 5-7 years at 350 kW intensive (motorway hub
                10-15+ sessions/day); longer at lower utilisation. Customer-facing cable
                is the wear part
              </li>
              <li>
                <strong className="text-white">Cable replacement
                  procedure</strong> — disconnect charger from grid; isolate DC bus;
                technician swap cable + plug assembly; cooling system flush + refill;
                commissioning retest. Typically 4-8 hours per cable
              </li>
              <li>
                <strong className="text-white">Leak detection</strong> — modern chargers
                include coolant-pressure / level sensor; alarm raised via OCPP if leak
                detected; charger automatically de-rates or shuts down to prevent damage
              </li>
              <li>
                <strong className="text-white">Service contract</strong> — typical 5-10
                year manufacturer or 3rd-party service contract. Cost ~£2-5k per charger
                per year for 350 kW intensive
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> — first
                cable replacement date + service contract reference + cooling system spec.
                CPO owns the maintenance schedule going forward
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Section 722 PME-on-EV alternatives applied to Mode 4"
            clause="Reg 722.411.4 PME-on-EV outdoor prohibition + alternatives (b TT electrode / c OPDD / d L-N voltage device / e equivalent disconnection) applies per charger regardless of charging mode. Mode 4 DC fast chargers in outdoor public-facing locations must invoke one of the alternatives."
            meaning="Section 722 scope includes Mode 4. Same Reg 722.411.4 alternatives apply per charger. UK 2025-26 commercial reality: route (b) dedicated TT electrode is used at some multi-charger hubs. But take care — Reg 722.411.4 NOTE 3 cautions that creating a TT system (for the charging equipment or the whole installation) as an alternative to PME may not be an appropriate solution, due to the inability to provide sufficient separation from buried metalwork connected to the supply PEN conductor. A TT electrode is route (b), not a default; where a dedicated on-site transformer provides a genuinely separated source that is instead the Reg 722.413.1.2 separated-source measure. Route (c) OPDD integrated in the Mode 4 charger’s power electronics is also common. Cert evidence bundle records the chosen route per charger + electrode Ra (if route b) + OPDD function self-test result (if route c) + manufacturer DoC declaring three-phase OPDD."
          />

          <InlineCheck {...inlineChecks[3]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 722.413.1.2 — separated source via isolating transformer (a distinct Section 722 electrical-separation measure, not a 722.411.4 PME indent)"
            clause="This protective measure shall be limited to the supply of one electric vehicle supplied from one unearthed source. The circuit shall be supplied through a fixed isolating transformer complying with BS EN 61558-2-4."
            meaning="Reg 722.413.1.2 codifies the separated-source PME alternative: a fixed isolating transformer (per BS EN 61558-2-4) supplying one charging point from one unearthed source. This is the structural alternative to OPDD (route c) and dedicated TT electrode (route b). Public DC fast hubs with dedicated on-site transformers often achieve this naturally — the LV side of the dedicated hub transformer is its own separated source per charger cluster. UK 2025-26 reality: route (c) OPDD dominates Mode 3; route (b) TT dominates Mode 4 hubs; route per 722.413.1.2 separated source via dedicated isolating transformer is the specialist option (commercial-curtilage, fleet, certain Mode 4 architectures). Annex A722 Item A illustrates a Class I separated-source EV charging point arrangement. Cert evidence bundle records the transformer DoC + the one-charging-point-per-transformer constraint."
          />

          <SectionRule />

          <Scenario
            title="50 kW Mode 4 single charger — retail site"
            situation="Supermarket customer wants a single 50 kW Mode 4 DC fast charger in the customer car park. Existing commercial three-phase 200 A per phase supply. Public access (Section 722 + PCAR 2023 + PAS 1899). Customer pays per-session via contactless card + app."
            whatToDo="Design: single 50 kW Mode 4 charger (e.g. ABB Terra 54 or Tritium PKM50). ~80 A per phase nominal — feasible on existing 200 A supply with DLM margin for store base load. G99 application to DNO (above G98 per-phase threshold for Mode 4 commercial). BS EN 61851-23 + BS EN IEC 62196-3 (CCS Combo 2 connector) conformity declared. PME-on-EV: route (c) OPDD integrated in charger electronics. RCD architecture: 4-pole Type B on the dedicated AC final circuit; charger’s internal protection covers DC side. IET CoP dedicated final circuit per charger. PCAR 2023: payment terminal compliant + 24/7 helpline + pricing transparency on display + open data feed; PAS 1899 accessibility: bay layout, charger mounting heights, signage. Cert evidence bundle: BS 7671 EIC + manufacturer DoC + DNO G99 + PCAR / PAS 1899 evidence + commissioning per BS EN 61851-23 manufacturer procedure + payment terminal commissioning. Total project ~£25-40k including the charger (~£15-20k), install labour, payment integration, signage."
            whyItMatters="Single 50 kW Mode 4 on existing supply is the most accessible Mode 4 install pattern for commercial sites. Retail / supermarket / leisure venues use this pattern. Customer value: attract EV-driving customers; revenue from charging + adjacent retail. The install is significant but manageable — supply assessment + DNO G99 + PCAR / PAS 1899 layers ON TOP of standard Section 722 install. Cert evidence bundle is fuller than Mode 3 commercial but follows the same eight-layer regulatory stack from M7.1."
          />

          <Scenario
            title="Public DC fast hub — 6 × 150 kW + 2 × 350 kW"
            situation="A motorway services operator commissioning a new public DC fast hub. 6 × 150 kW + 2 × 350 kW = 1,900 kW peak. Public access PCAR 2023 mandatory. Greenfield site — no existing supply infrastructure."
            whatToDo="Real-estate + grid + electrical project. Site selection driven by DNO HV capacity availability (initial DNO budget query). DNO HV connection (11 kV) + dedicated substation + on-site transformer 2,000 kVA + LV switchgear (BS EN IEC 61439-1 / -2). Multi-charger LV assembly per BS EN IEC 61439-7. Each charger’s dedicated final circuit per IET Code of Practice for EV Charging Equipment Installation; PME-on-EV per Reg 722.411.4 (route b TT electrode common at dedicated-transformer sites); BS EN 61851-23 + BS EN IEC 62196-3 (+ Tesla NACS on some chargers if multi-protocol). DLM coordinates across 8 chargers + transformer capacity. OCPP 1.6 + 2.0.1 integration to operator’s CPMS. PCAR 2023 compliance: payment (each charger has contactless card + RFID + app), 24/7 helpline, pricing transparency, roaming via Hubject / OCPI, open data feed (uptime / availability / pricing). PAS 1899 accessibility: bay layouts, accessible bays per ratio, signage, kerb cuts. Local planning permission + environmental permit. Cert evidence bundle: structured digital folder with all 8 regulatory layers + DNO + transformer + LV switchgear + per-charger commissioning + PCAR + PAS 1899 + OCPP + ongoing operator obligations. Total project ~£800k-£1.5m + 12-24 month timeline."
            whyItMatters="Public DC fast hubs are the visible face of UK 2025-26 EV infrastructure investment. Gridserve, InstaVolt, IONITY, Tesla Supercharger, MFG EV Power, BP Pulse, Octopus Electroverse — major operators investing hundreds of millions in UK hub build-out. The electrical install is one engineering layer of many. Cert evidence bundle is enormous + structured — multiple vendors + multiple compliance frameworks. Installers in this space typically specialise (electrical contractor partnering with civils + DNO + charger OEM + CPMS). The competence + project management vs Mode 3 single-wallbox install is a step change."
          />

          <CommonMistake
            title="Quoting a 150 kW Mode 4 charger on existing 100 A domestic single-phase supply"
            whatHappens="Misjudged site survey — installer quotes the customer’s preferred 150 kW Mode 4 charger thinking the existing house supply will work. Real numbers: 150 kW @ 400 V three-phase = ~240 A per phase nominal vs 100 A single-phase supply (~22 kW max). DNO refuses to upgrade; customer can’t install. Project dies; installer loses the lead + customer trust."
            doInstead="Supply assessment at quote stage. Per-phase nominal current vs existing DNO supply capacity. If insufficient: discuss DNO upgrade cost + timeline at first contact; or recommend appropriate Mode 3 / lower-power Mode 4 that fits the supply. 50 kW Mode 4 is the entry-level option for commercial sites with existing LV supply; 150 kW+ requires new connection. Cert evidence bundle records the supply assessment + the rationale for the charger selection."
          />

          <CommonMistake
            title="Skipping the BS EN 61851-23 manufacturer commissioning procedure"
            whatHappens={`Installer completes the AC-side install (Part 6 IR, RCBO test, Section 722 OPDD test) but skips the BS EN 61851-23 manufacturer DC-side procedure because "it’s just plug in and go". Charger fails to charge a vehicle correctly on day 1 because internal DC contactor wasn’t commissioned + thermal monitoring wasn’t calibrated. Manufacturer warranty void because procedure not followed.`}
            doInstead="BS EN 61851-23 + manufacturer install manual procedure is mandatory for Mode 4 commissioning. Includes: high-voltage DC isolation verification; DC contactor functional test; vehicle CP/PP + ISO 15118 negotiation; thermal monitoring + over-temperature protection calibration; payment terminal commissioning; OCPP integration test. Manufacturer engineer attendance often required for warranty. Cert evidence bundle records the manufacturer commissioning report + sign-off. Installer’s scope ends at AC-side install; the DC-side commissioning is manufacturer-led (or at least manufacturer-defined procedure followed by trained installer)."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Mode 4 DC fast = charger contains internal AC-to-DC conversion + DC delivery directly to vehicle battery, bypassing the vehicle’s on-board charger.',
              'UK 2025-26 generations: 50 kW (retail / commercial LV), 150 kW (dedicated supply or HV), 350 kW (HV hubs).',
              'BS EN 61851-23 — DC charging station product standard. Layered with BS EN 61851-1 (general) and BS EN IEC 62196-3 (DC connectors).',
              'CCS Combo 2 — UK / European DC fast standard. Single vehicle inlet for AC Mode 3 + DC Mode 4. Per BS EN IEC 62196-3.',
              'CHAdeMO declining; Tesla NACS emerging. UK 2025-26 new installs predominantly CCS-only or CCS + Tesla NACS multi-protocol.',
              'Supply scaling: 50 kW ~80 A per phase (existing LV); 150 kW ~240 A per phase (DNO upgrade or HV); 350 kW ~550 A per phase (HV + transformer).',
              'Multi-charger hubs require HV DNO connection + on-site transformer (1-2 MVA) + LV switchgear (BS EN IEC 61439-1/-2) + multi-charger LV assembly (BS EN IEC 61439-7).',
              'Liquid-cooled cables on 150+ kW units — manage I²R heat at high current; reduce customer-facing cable weight. 5-7 year service interval.',
              'Section 722 PME-on-EV alternatives apply per charger. Route (b) TT electrode common at dedicated-transformer hubs; route (c) OPDD integrated in charger electronics.',
              'Mode 4 commissioning extends Mode 3 with DC-specific tests: DC isolation, DC contactor, ISO 15118 communication negotiation, thermal monitoring, payment terminal (if public), OCPP integration.',
              'Cert evidence bundle for Mode 4 install integrates all 8 regulatory layers + manufacturer DC commissioning report + DNO connection agreement + transformer / LV switchgear specifications.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 3 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-7-section-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Three-phase 22 kW Mode 3 install
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-7-section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                7.4 OCPP & networked charging
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
