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
import { HeatPumpSiting } from '@/components/study-centre/diagrams/renewableGapSvg';

const inlineChecks = [
  {
    id: 'm8s3-thermal-fixed-equipment',
    question:
      'Why does Reg 421.11 + Reg 421.1.4 apply to a heat pump outdoor unit?',
    options: [
      'Doesn’t apply',
      'A heat pump outdoor unit is fixed equipment that generates / concentrates heat in normal operation (compressor body + outdoor coil + fan). Reg 421.11 requires protection of persons + livestock + property against harmful effects of heat or fire; Reg 421.1.4 requires sufficient distance to fixed objects / building elements so they are not subjected to dangerous temperatures in normal conditions. Manufacturer install manual specifies clearance, ventilation, vibration isolation — read TOGETHER with BS 7671 not in place of it',
      'Only for indoor',
      'Only PV',
    ],
    correctIndex: 1,
    explanation:
      'Reg 421.11 is the foundational fixed-equipment thermal-protection regulation: protection of persons, livestock and property against harmful effects of heat or fire generated in electrical installations. Reg 421.1.4 specifically targets fixed equipment causing concentration / focusing of heat — must be at sufficient distance from fixed objects / building elements so that those elements are not subjected to dangerous temperature in normal conditions. Heat pump outdoor unit fits both: compressor body + outdoor coil + fan generate heat in normal operation (compressor + condenser side); defrost cycle creates intermittent thermal pulses. The manufacturer install manual specifies clearance dimensions (typically 200-500 mm to walls + 1-2 m in front of fan) + ventilation requirements + vibration isolation pads. BS 7671 + manufacturer instructions read together. Cert evidence bundle records: manufacturer install manual reference + clearance verified at install + adjacent material thermal-safe.',
  },
  {
    id: 'm8s3-422-3-2',
    question:
      'Reg 422.3.2 enclosure temperature limits — when do they apply on a heat pump install?',
    options: [
      'No application',
      'Reg 422.3.2 applies where dust or fibres sufficient to cause a fire hazard could accumulate on an enclosure — then enclosure surface temperature shall not exceed 90 °C in normal conditions or 115 °C under fault. On a heat pump install this is a location-driven check: any enclosure (CU, DHW cylinder cover, outdoor isolator) sited where combustible dust/fibres could build up must be assessed against these limits. It is not a blanket cap on every surface in a clean dwelling',
      '500 °C',
      'No limits',
    ],
    correctIndex: 1,
    explanation:
      'Reg 422.3.2 applies specifically where materials such as dust or fibres sufficient to cause a fire hazard could accumulate on an enclosure of electrical equipment — in that condition the enclosure surface shall not exceed 90 °C in normal conditions or 115 °C under fault. The figures are a fire-hazard-accumulation safeguard, not a universal limit on every CU, cylinder cover or isolator surface. So the application is location-driven: where a heat pump CU, DHW cylinder immersion cover or outdoor isolator sits in a dusty / fibrous environment (e.g. a loft, store or workshop where deposits build up), assess the enclosure surface temperature against the limits. Modern compliant equipment carries manufacturer DoC confirming surface temperatures; cert evidence bundle records the DoC reference + visual inspection at commissioning + any thermal imaging at EICR.',
  },
  {
    id: 'm8s3-522-2-cable-protection',
    question:
      'Reg 522.2.1 wiring protection from external heat sources — where on a heat pump install?',
    options: [
      'No relevance',
      'Cable runs near hot pipework (primary heating flow / return at 35-55 °C typical for heat pump systems vs 70-80 °C for legacy boilers; lower temperature reduces but does not eliminate the concern); cable runs near the outdoor unit body (the compressor body + outdoor coil generate heat in normal operation); cable runs through compartments with restricted ventilation. Method per Reg 522.2.1: shielding, distance, higher-rated cable, local reinforcement, or selection accounting for the additional temperature rise',
      'Only solar',
      'Only EV',
    ],
    correctIndex: 1,
    explanation:
      'Reg 522.2.1 sets out methods to protect wiring systems from external heat sources: (a) shielding; (b) placing sufficiently far from the source of heat; (c) selecting a system with due regard for the additional temperature rise which may occur; (d) local reinforcement or substitution of insulating material. Heat pump-relevant scenarios: (1) primary heating flow / return pipework at 35-55 °C (typical heat pump operating temperature; lower than legacy 70-80 °C boiler systems but still significant if cable runs in contact); (2) cable runs near outdoor unit body (compressor + coil generate heat in normal operation); (3) cable runs through DHW cupboard with cylinder + immersion (restricted ventilation + warm-air accumulation); (4) cable runs through loft / roof void exposed to summer ambient temperatures. Cert evidence bundle records: cable route survey + heat source proximity + chosen protection method per Reg 522.2.1.',
  },
  {
    id: 'm8s3-ip-ik',
    question:
      'IP + IK ratings for heat pump outdoor unit + outdoor isolator — what should the installer verify?',
    options: [
      'No requirements',
      'Outdoor unit IP rating: typically IPX4 minimum (splash-water resistance per BS EN 60529); IK rating typically IK07 minimum (mechanical impact resistance per BS EN 62262 — protects against accidental impact). Outdoor isolator: IPX4 / IK07 typical; some sites need higher (IPX5 splash-water + IK10 high-impact in vandalism-prone or exposed locations). Cable glands rated to maintain enclosure IP. Cert evidence bundle records the ratings as installed',
      'IP00',
      'Same as indoor',
    ],
    correctIndex: 1,
    explanation:
      'Outdoor heat pump installs require appropriate IP (Ingress Protection per BS EN 60529) + IK (Impact code per BS EN 62262) ratings. Outdoor unit: typically IPX4 minimum (splash-water resistance from any direction); IK07 minimum (5 J impact). Outdoor isolator: typically IPX4 / IK07; vandalism-prone or exposed locations may need IPX5 (water jets) + IK10 (20 J impact). Cable glands maintain enclosure IP — replacing factory-fitted blanking plugs with rated glands appropriate to cable size. UK 2025-26 typical outdoor isolator: Hager JK series or similar, IPX4 + IK07 standard. Cert evidence bundle records: outdoor unit IP / IK from manufacturer DoC + outdoor isolator IP / IK from product spec + gland selection.',
  },
];

const quizQuestions = [
  {
    question:
      'Outdoor unit siting — what clearance + thermal considerations apply?',
    options: [
      'Right against wall',
      'Per manufacturer install manual + Reg 421.1.4: typically 200-500 mm to walls + 1-2 m in front of fan + 300-500 mm above + ventilation airflow path unobstructed. Defrost cycle thermal pulses + condensate drip pattern + noise impact on neighbours (PDR 42 dB(A) at 1m from neighbouring building). Hot pipework (primary flow / return) routed away from cable per Reg 522.2.1. Cable glands maintain enclosure IP per BS EN 60529',
      'Indoor only',
      'No clearance',
    ],
    correctAnswer: 1,
    explanation:
      'Outdoor unit siting integrates multiple constraints. Thermal (Reg 421.1.4 + manufacturer instructions): 200-500 mm clearance to walls, 1-2 m in front of fan (airflow); 300-500 mm above (top air discharge on some models); ventilation airflow unobstructed. Operational: condensate drip pattern (drainage required, away from paths + vegetation); defrost cycle pulses (intermittent water dripping from defrost melt). Noise: PDR (Permitted Development Rights) requires ≤42 dB(A) at 1m from neighbouring building (planning permission needed otherwise — check the customer’s property + neighbouring properties). Cable protection (Reg 522.2.1): cable route away from hot primary pipework; through outdoor wall via gland-sealed entry maintaining enclosure IP. Cert evidence bundle records: siting drawing + clearance dimensions + noise calc + condensate drainage detail + cable route + IP / IK ratings.',
  },
  {
    question: 'Defrost cycle — what is it electrically + thermally?',
    options: [
      'Not real',
      'Defrost cycle: heat pump reverses refrigerant flow temporarily (~5-15 min) to melt frost off the outdoor coil. Electrically: compressor continues running (no electrical anomaly); reversing valve operates + fan stops temporarily; immersion may activate as backup heat if customer is calling for heat. Thermally: outdoor unit drips condensate as frost melts; nearby cable / pipework experiences intermittent water + thermal cycling. Drainage + cable routing accommodate this',
      'Refrigerant leak',
      'Customer fault',
    ],
    correctAnswer: 1,
    explanation:
      'Defrost cycle is normal heat pump operation. When frost builds on the outdoor coil (cold + humid conditions reduce evaporator efficiency), the heat pump reverses refrigerant flow for 5-15 min — heat from the refrigerant circuit melts the frost off the coil. Electrically: compressor continues running (no anomaly visible to a tester); reversing valve operates; fan typically stops during defrost (so heat stays at coil); immersion backup may activate to maintain customer heating output during the defrost (heat pump output drops temporarily). Thermally: outdoor unit drips condensate water as frost melts (typical 1-3 L per cycle); intermittent thermal cycling. Installer considerations: condensate drainage at outdoor unit base + away from paving; cable route + outdoor isolator location away from condensate drip pattern; primary pipework routed so backup immersion can carry the load during defrost. Cert evidence bundle: drainage detail + cable route + customer expectation note (defrost is normal, not a fault).',
  },
  {
    question: 'Outdoor isolator — where + what type?',
    options: [
      'Indoor only',
      'Locally accessible at the outdoor unit per BS EN 60947-3 isolator (visible break + lockable in OFF). Position: typically 1-2 m from outdoor unit on the wall (or pole-mounted if free-standing unit); 1-1.5 m mounting height for accessibility. IP / IK rating outdoor (IPX4 / IK07 minimum). Used for safe isolation during service / maintenance / refrigerant work. Reg 537 isolation + switching framework applies',
      'No isolator',
      'Same as indoor',
    ],
    correctAnswer: 1,
    explanation:
      'Outdoor isolator at heat pump outdoor unit: locally accessible BS EN 60947-3 isolator with visible break + lockable in OFF position. Position 1-2 m from outdoor unit (typical), 1-1.5 m mounting height for accessibility. IP / IK outdoor rated (typical IPX4 / IK07 minimum). Function: safe isolation during service / maintenance / refrigerant work — the F-Gas Cat 1 person needs the electrical supply isolated to make refrigerant connections safely; the electrician / service engineer needs isolation to work on the outdoor unit electrical compartment. Reg 537 isolation + switching framework applies (Hager JK20 / Wylex IP66 / similar UK 2025-26 typical product). Cert evidence bundle records: isolator product + location + IP / IK + commissioning visible-break + lockable-OFF verification.',
  },
  {
    question: 'Cable from indoor CU to outdoor unit — what type + protection?',
    options: [
      '1.5 mm² T+E indoor',
      'Outdoor section: SWA (Steel Wire Armoured) cable, typically 3-core 10 mm² (single-phase) or 5-core 6-10 mm² (three-phase) per Appendix 4 sustained current calc. Armour as CPC where designed (Reg 543) or separate green-yellow CPC. Gland-sealed entry to indoor + outdoor enclosures maintaining IP rating. Mechanical protection per Reg 522.6 (cable in conduit / through structural penetrations protected against damage)',
      'Bare wire',
      'No outdoor cable',
    ],
    correctAnswer: 1,
    explanation:
      'Outdoor cable from indoor CU to outdoor unit: SWA (Steel Wire Armoured) is standard. Typical 3-core 10 mm² for single-phase 32 A heat pump circuit (or 6 mm² for smaller installs); 5-core 6-10 mm² for three-phase. Cable sized per Appendix 4 sustained current carrying capacity + voltage drop calc (run length + per-phase / line current). Armour as CPC where designed per Reg 543 + manufacturer DoC (separate green-yellow CPC if armour not relied on). Gland-sealed entry at indoor + outdoor enclosures maintaining IP rating. Mechanical protection per Reg 522.6: cable in conduit through building penetrations; SWA outdoor; UV-resistant outer sheath where exposed to sunlight; clipped at appropriate intervals. Cert evidence bundle records: cable type + cross-section + length + route + gland details + CPC arrangement (armour or separate).',
  },
  {
    question: 'Condensate drainage from outdoor unit — electrical implication?',
    options: [
      'No implication',
      'Condensate (water from coil dehumidification + defrost cycle) drips from outdoor unit base. Typical 1-3 L per defrost cycle in winter; less in summer. Must drain to suitable point (gravel + soakaway, surface water drain, or gravity to suitable disposal). Cable + isolator location away from drip pattern; outdoor cable run protected; condensate must not pool around unit base (icing risk creates trip hazard + thermal damage to cable insulation if standing water freezes against cable)',
      'No water',
      'Customer fault',
    ],
    correctAnswer: 1,
    explanation:
      'Condensate drainage is a heat pump install requirement. Outdoor unit dehumidifies the air (water condenses on the cold evaporator coil) + drips condensate. Defrost cycle adds intermittent 1-3 L per cycle (frost melt-water). Drainage options: (1) gravel + soakaway directly under unit base; (2) outdoor drain connection via PVC pipework + grating; (3) gravity-flow to surface water drain or external gully. Electrical implications: cable + outdoor isolator located away from drip pattern (water on cable insulation + isolator enclosure long-term degrades integrity); condensate must not pool around unit base (winter icing creates trip hazard + risk of ice damaging cable / isolator + risk of static water reaching live parts during defrost-cycle drain). Cert evidence bundle records: drainage detail + cable / isolator location vs drip pattern.',
  },
  {
    question: 'IP rating BS EN 60529 — first digit vs second digit?',
    options: [
      'No meaning',
      'IP first digit: protection against solid foreign objects (0-6). 6 = dust-tight; 5 = dust-protected. IP second digit: protection against ingress of water (0-9). 4 = splash from any direction; 5 = water jet; 6 = powerful water jet; 7 = temporary submersion. UK 2025-26 outdoor heat pump unit + outdoor isolator typically IPX4 (X = unspecified / not relevant for solid-object protection in this context) — splash from any direction. Cable glands selected to maintain the enclosure rating',
      'Random',
      'No rating',
    ],
    correctAnswer: 1,
    explanation:
      'IP rating per BS EN 60529: two-digit code XY where X = solid object protection (0-6; 6 = dust-tight) + Y = water ingress protection (0-9; 4 = splash from any direction, 5 = water jet, 6 = powerful water jet, 7 = temporary submersion, 9 = high-pressure / high-temperature water jets). Outdoor heat pump enclosures typically IPX4 or IPX5: splash-resistant against any direction (rain) or water jet (pressure washing); X indicates unspecified first digit (solid-object protection less critical for these specific enclosures, or alternative rating per manufacturer). Manufacturer DoC declares the rating per outdoor unit + outdoor isolator. Cable glands must maintain the rating: UK 2025-26 standard practice is metric brass glands with rubber sealing washers + neoprene sleeves to match cable diameter. Cert evidence bundle records the IP rating per enclosure + verified visual inspection at commissioning.',
  },
];

const faqs = [
  {
    question: 'Can the outdoor unit go in a permit shelter / lean-to?',
    answer:
      'Provided manufacturer ventilation clearance is maintained + the shelter does not restrict airflow. Heat pump outdoor unit needs free airflow across the evaporator coil; enclosing it in a poorly ventilated shelter dramatically reduces efficiency + can cause fault shutdowns. Manufacturer install manual specifies the minimum air-volume + free-area requirements. Cert evidence bundle records the configuration; customer education that the unit must not be boxed in.',
  },
  {
    question: 'What about ground-source heat pump siting?',
    answer:
      'GSHP indoor unit only — typically utility room or basement. Borehole / horizontal collector outdoor by specialist drilling contractor (not electrical scope). Electrical scope: dedicated circuit from CU to GSHP indoor unit; circulation pumps for ground loop; controls. Same Reg 421/422/522/411/415 framework applies — just everything is indoor.',
  },
  {
    question: 'PDR + planning permission for outdoor unit?',
    answer:
      'UK Permitted Development Rights 2019 + MCS Planning Standard: outdoor unit ≤0.6 m³ + ≤42 dB(A) at 1m from neighbouring building + ≥1m from property boundary + not visible from highway in certain conservation contexts. Most domestic ASHP installs fit PDR. Non-conforming installs need planning permission (4-8 weeks typical). Customer’s MCS company handles planning conversation; electrical installer’s scope picks up post-planning.',
  },
  {
    question: 'What does the outdoor isolator look like in service?',
    answer:
      'BS EN 60947-3 rotary isolator in IP66 / IK10 enclosure (typical premium outdoor product). Visible break window showing OFF / ON. Lock hole for padlock (lockable OFF). 32 A or 40 A rated typical for single-phase ASHP; 32 A 4-pole for three-phase. Mounted on the outdoor wall 1-1.5 m height, 1-2 m from outdoor unit. Used for service / maintenance / refrigerant work isolation.',
  },
  {
    question: 'Cable run through cavity / through-wall — what to watch?',
    answer:
      'Through-wall penetration: drilled at downward angle to outside (prevents water ingress); sleeve through penetration; fire-stopping per Reg 527 + Building Regs Part B; cable not in contact with cavity insulation (Reg 522.2.1 + cavity insulation thermal sleeving). Outdoor section: SWA + gland-sealed entry maintaining IP. Cert evidence bundle records the penetration detail + fire-stopping.',
  },
];

export default function RenewableEnergyModule8Section3() {
  const navigate = useNavigate();

  useSEO({
    title: 'Outdoor unit siting + thermal/cable protection | Renewable Energy 8.3 | Elec-Mate',
    description:
      'Heat pump outdoor unit siting + thermal + cable protection. Reg 421.11 + 421.1.4 fixed-equipment thermal protection, Reg 422.3.2 enclosure temperature limits, Reg 522.2.1 wiring protection from external heat, IP / IK ratings per BS EN 60529 + BS EN 62262, condensate drainage, defrost cycle, PDR noise + clearance.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-8')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 8
          </button>

          <PageHero
            eyebrow="Module 8 · Section 3 · BS 7671:2018+A4:2026 · Reg 421 + 422 + 522 + BS EN 60529 + BS EN 62262"
            title="Outdoor unit siting + thermal/cable protection"
            description="Heat pump outdoor unit siting + cable / wiring system protection. Reg 421.11 + Reg 421.1.4 fixed-equipment thermal protection, Reg 422.3.2 enclosure temperature limits, Reg 522.2.1 wiring protection from external heat, IP / IK ratings (BS EN 60529 + BS EN 62262), condensate drainage, defrost cycle, PDR noise + clearance, outdoor isolator."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 421.11 + Reg 421.1.4 apply to heat pump outdoor unit as fixed equipment generating heat in normal operation. Manufacturer clearance + ventilation + vibration isolation read TOGETHER with BS 7671.',
              'Reg 422.3.2: where dust / fibres sufficient to cause a fire hazard could accumulate on an enclosure, surface temperature shall not exceed 90 °C normal / 115 °C fault. Location-driven check on the CU, DHW cylinder enclosure, outdoor isolator — not a blanket cap.',
              'Reg 522.2.1 wiring protection from external heat — methods (a) shielding, (b) distance, (c) higher-rated cable, (d) local reinforcement. Cable routes near primary pipework + outdoor unit + cylinder cupboard.',
              'IP rating per BS EN 60529 + IK rating per BS EN 62262. Outdoor heat pump unit + isolator typical IPX4 / IK07 minimum; vandalism-prone or exposed locations IPX5 / IK10.',
              'Outdoor cable typically 3-core SWA (single-phase) or 5-core SWA (three-phase). Gland-sealed entry maintaining enclosure IP. Mechanical protection per Reg 522.6.',
              'Outdoor isolator BS EN 60947-3 with visible break + lockable OFF. 1-2 m from outdoor unit at 1-1.5 m mounting height.',
              'Condensate drainage: 1-3 L per defrost cycle in winter. Cable + isolator located away from drip pattern. Condensate to soakaway / drain — must not pool.',
              'PDR planning: outdoor unit ≤42 dB(A) at 1m from neighbouring building; ≥1m from property boundary; ≤0.6 m³ volume. Customer’s MCS company handles planning; electrical installer picks up post-planning.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply Reg 421.11 + Reg 421.1.4 to heat pump outdoor unit siting; verify manufacturer clearance + ventilation.',
              'Apply Reg 422.3.2 enclosure temperature limits (90 °C normal / 115 °C fault) to heat pump CU + cylinder cupboard + outdoor isolator where dust / fibres could accumulate and cause a fire hazard.',
              'Apply Reg 522.2.1 wiring protection from external heat to cable routes near hot pipework + outdoor unit + cylinder.',
              'Select IP + IK ratings per BS EN 60529 + BS EN 62262 for outdoor unit + outdoor isolator + cable glands.',
              'Size outdoor SWA cable per Appendix 4 sustained current carrying capacity + voltage drop.',
              'Locate + specify outdoor isolator per BS EN 60947-3 with visible break + lockable OFF.',
              'Plan condensate drainage + cable routing to avoid drip / pooling impact on cable + isolator.',
              'Coordinate with MCS company on PDR planning requirements (noise + clearance + property boundary).',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            The outdoor unit is fixed equipment in the open weather. Every BS 7671 protection regulation that applies to fixed equipment, plus every outdoor consideration, lands at this install.
          </Pullquote>

          <ContentEyebrow>Reg 421 + Reg 422 — thermal protection of fixed equipment</ContentEyebrow>

          <ConceptBlock
            title="Reg 421.11 + Reg 421.1.4 applied to the heat pump outdoor unit"
            plainEnglish="A heat pump outdoor unit is fixed equipment that generates + concentrates heat in normal operation. Compressor body + outdoor coil + fan all generate heat; defrost cycle creates intermittent thermal pulses. Reg 421.11 protects persons + livestock + property from harmful thermal effects; Reg 421.1.4 requires sufficient distance to fixed objects / building elements."
            onSite="Manufacturer install manual specifies the practical detail: clearance, ventilation, vibration isolation. These instructions are read TOGETHER with BS 7671 not in place of it. The installer’s job: verify the chosen siting meets BOTH the manufacturer’s instructions AND the general BS 7671 regulations + UK PDR planning. Cert evidence bundle records: manufacturer install manual reference + version + clearance verified."
          >
            <p>Practical clearance + thermal considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Wall clearance</strong> —
                typically 200-500 mm to the wall behind the outdoor unit (manufacturer
                spec). Permits service access + airflow + thermal dissipation
              </li>
              <li>
                <strong className="text-white">Fan-discharge
                  clearance</strong> — typically 1-2 m in front of the fan discharge.
                Airflow path unobstructed. Some models have top-discharge configuration
                (300-500 mm above)
              </li>
              <li>
                <strong className="text-white">Side clearance</strong> —
                typically 200-500 mm to adjacent walls / structures
              </li>
              <li>
                <strong className="text-white">Ventilation</strong> — outdoor
                unit must NOT be enclosed in a poorly ventilated shelter / box.
                Enclosure restricts airflow → reduces efficiency → potential fault
                shutdowns. Manufacturer specifies minimum free-area + airflow volume
              </li>
              <li>
                <strong className="text-white">Vibration isolation</strong>
                — outdoor unit typically mounted on anti-vibration pads / brackets.
                Reduces transmission of compressor vibration to building structure +
                noise transmission to occupants / neighbours
              </li>
              <li>
                <strong className="text-white">Defrost cycle thermal
                  pulses</strong> — intermittent reverse-cycle operation melts frost
                off coil. Adjacent cable / pipework + condensate drainage detail
                designed to accommodate
              </li>
              <li>
                <strong className="text-white">Combustible material
                  clearance</strong> — outdoor unit kept clear of combustible materials
                (Reg 422.4 CA2 conditions). Cladding, decking, vegetation, stored
                material around outdoor unit considered
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — siting drawing showing clearance dimensions + manufacturer
                spec reference + photographs at commissioning
              </li>
            </ul>
          </ConceptBlock>

          <HeatPumpSiting caption="Outdoor-unit clearances, condensate drain and protected cable entry." />

          <ConceptBlock
            title="Reg 422.3.2 enclosure temperature limits"
            plainEnglish="Reg 422.3.2 applies where dust or fibres sufficient to cause a fire hazard could accumulate on an enclosure of electrical equipment — in that condition the enclosure surface shall not exceed 90 °C under normal conditions or 115 °C under fault conditions. So it is a location-driven check, not a blanket cap: assess any heat pump enclosure (CU containing the RCBOs, DHW cylinder cover, outdoor isolator) against these limits where it sits somewhere combustible dust/fibres could build up."
            onSite="Modern compliant equipment carries manufacturer DoC confirming surface temperature compliance under normal + fault conditions. Designer verifies via product spec. EICR thermal imaging optional but increasingly used at large commercial sites (cylinder / CU thermal scan)."
          >
            <p>422.3.2 application points where dust / fibre accumulation could cause a fire hazard:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">CU enclosure</strong> —
                containing heat pump 32 A RCBO + immersion 16 A RCBO + main RCD. Verify
                CU manufacturer DoC declares thermal compliance under loaded
                conditions
              </li>
              <li>
                <strong className="text-white">DHW cylinder
                  enclosure</strong> — immersion access cover + cylinder shell. Verify
                manufacturer thermal spec — immersion + heat pump primary together can
                warm the enclosure
              </li>
              <li>
                <strong className="text-white">Outdoor isolator
                  enclosure</strong> — exposed to direct sun + outdoor unit heat. UK
                summer ambient can be high; verify isolator manufacturer thermal spec
                for outdoor applications
              </li>
              <li>
                <strong className="text-white">Cable termination
                  zones</strong> — at outdoor unit + indoor termination. Verify
                terminal block + cable insulation thermal compatibility per
                manufacturer
              </li>
              <li>
                <strong className="text-white">Junction boxes</strong> —
                where intermediate terminations made. Manufacturer thermal spec applies
              </li>
              <li>
                <strong className="text-white">Thermal imaging at
                  EICR</strong> — optional but increasingly used at commercial sites or
                where surface temperature concern raised. EICR-grade FLIR camera. Cert
                evidence bundle records images + max surface temperatures
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 421.11 + Reg 421.1.4 — Protection against thermal effects + concentration of heat"
            clause="Reg 421.11: Persons, livestock and property shall be protected against harmful effects of heat or fire which may be generated or propagated in electrical installations. Manufacturers’ instructions shall be taken into account in addition to the requirements of BS 7671. Reg 421.1.4: Fixed equipment causing a concentration and focusing of heat shall be at a sufficient distance from any fixed object or building element so that the object or element is not subjected to a dangerous temperature in normal conditions."
            meaning="Reg 421.11 is foundational fixed-equipment thermal protection — heat pump outdoor units, immersion heaters in DHW cylinders, and the compressor itself all generate heat in normal operation. Reg 421.1.4 specifically targets fixed equipment causing concentration / focusing of heat — outdoor coil + compressor body fit this. Manufacturer install manual gives the practical detail (clearance, ventilation, vibration isolation, defrost-cycle drainage); BS 7671 sets the regulatory framework. Cert evidence bundle records: manufacturer install manual reference + version + clearance verified at install + adjacent material thermal-safe + cable / pipework routing accommodating thermal effects."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Wiring protection + IP / IK ratings</ContentEyebrow>

          <Pullquote>
            The outdoor cable is in the British weather for the install’s entire life. SWA + gland-sealed entry + appropriate IP rating is not optional — it is the baseline.
          </Pullquote>

          <ConceptBlock
            title="Reg 522.2.1 wiring protection from external heat sources"
            plainEnglish="Reg 522.2.1 specifies protection methods for wiring exposed to external heat: (a) shielding; (b) distance; (c) higher-rated cable accounting for additional temperature rise; (d) local reinforcement or insulation substitution. Heat-pump-relevant scenarios where this applies: cable runs near primary pipework, near outdoor unit body, through cylinder cupboard, through loft / roof void."
            onSite="UK 2025-26 heat pump systems run primary flow / return at 35-55 °C (lower than legacy 70-80 °C boilers); concern reduced but not eliminated. Cable routes through warm spaces (DHW cupboard + loft) experience elevated ambient temperatures. Designer applies the appropriate method at design stage."
          >
            <p>Cable + heat source scenarios on heat pump install:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Primary flow / return
                  pipework</strong> — 35-55 °C typical for heat pump systems. Method
                (b) distance from cable + (a) shielding if cable run forced close.
                Avoid clipping cable directly against insulated pipework
              </li>
              <li>
                <strong className="text-white">Outdoor unit body
                  proximity</strong> — compressor + outdoor coil generate heat. Cable
                routed away from compressor body via cable management built into the
                unit; entry through factory-provided gland points
              </li>
              <li>
                <strong className="text-white">DHW cylinder
                  cupboard</strong> — restricted ventilation + warm-air accumulation
                from cylinder + immersion + circulation pumps. Cable in the cupboard
                runs at elevated ambient temperature — Method (c) cable rated for the
                expected ambient
              </li>
              <li>
                <strong className="text-white">Loft / roof void</strong> —
                summer ambient can exceed 50 °C in poorly ventilated lofts. Cable
                sized per Appendix 4 for high ambient temperature (correction factor
                Ca per Table 4B1)
              </li>
              <li>
                <strong className="text-white">Through-wall
                  penetration</strong> — cable in conduit / sleeved penetration;
                fire-stopping per Reg 527 + Building Regs Part B
              </li>
              <li>
                <strong className="text-white">Cable in contact with
                  cavity insulation</strong> — cavity wall insulation can elevate
                conductor temperature; Reg 522.2 + Table 4B requires thermal sleeve or
                rated cable
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — cable route survey + heat source proximity per zone
                + chosen protection method + Appendix 4 sizing + correction factors
                applied
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="IP + IK ratings for outdoor equipment"
            plainEnglish="IP rating per BS EN 60529 = Ingress Protection (solid + water). IK rating per BS EN 62262 = Impact protection. Outdoor heat pump unit + outdoor isolator + cable glands all require appropriate ratings. UK 2025-26 baseline: IPX4 + IK07 minimum for typical domestic outdoor. Exposed / vandalism-prone locations: IPX5 + IK10."
            onSite="Manufacturer DoC declares the outdoor unit IP / IK rating. Outdoor isolator product spec declares its rating. Cable glands must MAINTAIN the enclosure rating — replacing factory blanking plugs with appropriate brass glands + sealing washers + sleeves. Cert evidence bundle records the ratings + glands as installed."
          >
            <p>IP / IK practical selection:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">IP first digit</strong> —
                solid object protection 0-6 (6 = dust-tight; X = unspecified). Outdoor
                unit typically X (rated by second digit only) or 4-5
              </li>
              <li>
                <strong className="text-white">IP second digit</strong>
                — water ingress 0-9. 4 = splash from any direction (standard outdoor
                domestic); 5 = water jet; 6 = powerful water jet; 7 = temporary
                submersion. UK 2025-26 typical outdoor unit IPX4
              </li>
              <li>
                <strong className="text-white">IK rating</strong> — impact
                resistance per BS EN 62262. IK07 = 5 J impact (standard outdoor
                domestic); IK10 = 20 J (high-impact / vandalism-prone)
              </li>
              <li>
                <strong className="text-white">Outdoor unit
                  baseline</strong> — IPX4 / IK07 typical for UK 2025-26 domestic ASHP
                (Vaillant aroTHERM Plus, Mitsubishi Ecodan, Daikin Altherma 3 H, NIBE
                F2120 — all IPX4 minimum)
              </li>
              <li>
                <strong className="text-white">Outdoor isolator
                  selection</strong> — typically Hager JK series or similar; IPX4 /
                IK07 typical; IP66 / IK10 premium for exposed locations
              </li>
              <li>
                <strong className="text-white">Cable gland
                  selection</strong> — metric brass glands with rubber sealing washers
                + neoprene sleeves matched to cable diameter. Maintains IP rating
                across the enclosure boundary
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — outdoor unit IP / IK from manufacturer DoC +
                outdoor isolator product spec + gland model + commissioning visual
                inspection
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Outdoor cable + isolator selection"
            plainEnglish="Outdoor cable from indoor CU to outdoor unit: SWA (Steel Wire Armoured) typical. 3-core for single-phase (L + N + CPC or armour-as-CPC); 5-core for three-phase. Sized per Appendix 4 sustained current + voltage drop. Outdoor isolator per BS EN 60947-3 with visible break + lockable OFF — 1-2 m from outdoor unit at 1-1.5 m mounting height."
            onSite="UK 2025-26 standard heat pump outdoor cable: 10 mm² 3-core SWA (single-phase 32 A circuit) or 6-10 mm² 5-core SWA (three-phase). Indoor section: 6 mm² T+E or singles in conduit. Gland-sealed entry maintaining IP at indoor + outdoor enclosures."
          >
            <p>Outdoor wiring + isolator practical:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">SWA cable type</strong> —
                steel-wire-armoured cable, outer LSF / PVC sheath, copper conductors.
                Mechanical protection from physical damage + UV / weather resistance +
                armour as CPC where designed
              </li>
              <li>
                <strong className="text-white">Cross-section</strong> —
                10 mm² 3-core for single-phase 32 A circuit (typical UK 2025-26 ASHP
                up to 12 kW thermal). 6 mm² 5-core for three-phase 16 A per phase.
                Larger sizes for longer runs / higher current
              </li>
              <li>
                <strong className="text-white">CPC arrangement</strong> —
                armour as CPC per Reg 543 (provided armour adequately sized + connected
                at both ends) OR separate green-yellow CPC conductor. Manufacturer DoC
                confirms armour cross-section meets CPC requirements
              </li>
              <li>
                <strong className="text-white">Gland-sealed
                  entry</strong> — brass gland + sealing washer + neoprene sleeve at
                both enclosures (indoor termination + outdoor unit). Maintains IP
                rating
              </li>
              <li>
                <strong className="text-white">Outdoor isolator</strong>
                — BS EN 60947-3 rotary isolator. IPX4 / IK07 enclosure minimum.
                Visible break window. Padlock-hole for lockable OFF. 32 A or 40 A
                rated typical (single-phase); 32 A 4-pole (three-phase)
              </li>
              <li>
                <strong className="text-white">Isolator position</strong>
                — 1-2 m from outdoor unit, 1-1.5 m mounting height for accessibility.
                Used for safe isolation during service / maintenance / refrigerant
                work
              </li>
              <li>
                <strong className="text-white">Reg 537 isolation
                  framework</strong> — isolator is an isolating device per Reg 537.
                Visible break + lockable OFF + clear marking confirm isolation
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — cable type + cross-section + length + route + gland
                + isolator product + IP / IK + commissioning visible-break +
                lockable-OFF verification
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 522.2.1 — Protection of wiring systems from external heat sources"
            clause="In order to avoid the effects of heat from external sources, one or more of the following methods or an equally effective method shall be used to protect a wiring system: (a) shielding; (b) placing sufficiently far from the source of heat; (c) selecting a system with due regard for the additional temperature rise which may occur; (d) local reinforcement or substitution of insulating material."
            meaning="Reg 522.2.1 sets the four-method framework for protecting wiring from external heat. On heat pump installs, multiple zones invoke this: primary heating pipework (35-55 °C), outdoor unit body (compressor + coil heat), DHW cylinder cupboard (restricted ventilation + warm air), loft / roof void (summer ambient). Designer chooses appropriate method per zone: (a) shielding via heat-resistant sleeve / fire blanket where cable run forced close; (b) distance — most common, cable routed away from heat source; (c) higher-rated cable with appropriate correction factor (Ca per Table 4B1 in Appendix 4); (d) local reinforcement / substitution at specific points. Cert evidence bundle records: cable route survey + heat source proximity per zone + chosen method + Appendix 4 sizing calc + correction factors."
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="Standard suburban ASHP outdoor install"
            situation="4-bed semi-detached. 9 kW Vaillant aroTHERM Plus R290 outdoor unit. Installer surveys: side garden 3 m wide, brick wall 4 m long; existing flowerbed against wall; soft-landscape ground (gravel sub-base). PDR-compliant: 1.5 m from boundary, no acoustic challenge from neighbours, 38 dB(A) at boundary calculated. Indoor CU 12-way Wylex, 4 spare ways."
            whatToDo="Outdoor unit siting per manufacturer: 300 mm clearance to brick wall (rear); 1.5 m clearance to fan discharge (front); 400 mm above; 500 mm side clearance to fence (each side). Anti-vibration pads beneath unit. Condensate drain to gravel soakaway directly beneath unit (1 m × 1 m × 300 mm gravel pit). Outdoor isolator: Hager JK220 (32 A, IP66, IK10), 1.2 m mounting height, 1 m horizontal from outdoor unit on the brick wall. Cable: 10 mm² 3-core SWA from indoor CU dedicated way → through-wall penetration (drilled at downward angle, sleeved + fire-stopped with PYRO-COAT mortar per Reg 527 + Building Regs Part B) → external SWA run clipped to wall → outdoor isolator gland-sealed entry → outdoor unit cable management gland. Armour as CPC per Reg 543 (10 mm² SWA armour adequately sized for 32 A circuit). Indoor segment: 6 mm² T+E from CU to indoor termination junction box near through-wall penetration; SWA gland-sealed onto JB. Cert evidence bundle: outdoor unit clearance dimensions + photographs + manufacturer install manual reference (Vaillant aroTHERM Plus install manual + version + date) + outdoor isolator product spec (Hager JK220) + cable type + Appendix 4 calc + gland selection + condensate drainage detail."
            whyItMatters="Standard suburban ASHP install — covers all the routine BS 7671 outdoor regs. Clear documentation in the cert evidence bundle simplifies the MCS company handover pack + future EICR + customer’s ongoing maintenance. UK 2025-26 typical ~£800-1,500 electrical-scope labour cost for this configuration (excluding any CU change)."
          />

          <Scenario
            title="Outdoor unit on flat roof — exposed location"
            situation="3-storey townhouse. No suitable ground location for outdoor unit (small front courtyard with bins; rear is paved garden directly against neighbour’s patio with noise concerns). Customer’s flat roof (over the rear extension) selected. Heat pump 10 kW Mitsubishi Ecodan. Flat roof access via internal hatch + ladder."
            whatToDo="Roof-mounted outdoor unit considerations: structural assessment first (heat pump + frame + ice load ~150-200 kg; check structural engineer’s sign-off). Anti-vibration brackets + decoupled mounting frame on rubber pads. PDR compliance: ≤42 dB(A) at neighbour 1 m from building (specialist acoustic assessment — flat roof can amplify noise; planning permission likely needed). Outdoor unit weather + UV exposure: choose product with higher IP rating (IP55 for exposed locations) + UV-resistant outer coating. Outdoor isolator: IP66 / IK10 (premium product e.g. Hager JK320); mounted on parapet wall accessible from rooftop hatch. Cable: 10 mm² 3-core SWA in galvanised steel conduit through the wall + into roof void → through dedicated rooftop conduit clipped to parapet → outdoor isolator → outdoor unit. UV protection on visible cable runs. Condensate drainage: connected to existing roof drainage system + checked for adequate flow capacity. Cable + isolator location protected from heavy footfall during maintenance. Cert evidence bundle: structural assessment + acoustic assessment + planning consent (if needed) + manufacturer IP-rated product spec + cable route detail + drainage detail."
            whyItMatters="Roof-mounted outdoor units are emerging in UK 2025-26 urban / multi-occupancy installs where ground locations are inadequate. Substantially higher install complexity + cost (~£3-5k electrical-scope above standard suburban). PDR planning challenge typical (flat roof noise amplification). Cert evidence bundle is richer + must integrate structural + acoustic + electrical layers. Customer-facing communication: cost + complexity vs not installing a heat pump at all."
          />

          <CommonMistake
            title="Enclosing the outdoor unit in a poorly ventilated shelter"
            whatHappens="Customer requests visual screening of the outdoor unit (aesthetic + planning concern). Installer / customer encloses unit in a timber-louvred shelter that restricts airflow. Heat pump efficiency drops dramatically (COP decline from 3 to 1.5 in cold conditions); fault shutdowns during peak demand; warranty void because manufacturer ventilation clearance violated. Customer cold + heating bill higher than the gas system being replaced."
            doInstead="Manufacturer ventilation clearance is non-negotiable. If aesthetic / planning screening is required: open-louvred screen with ≥80% free area at louvre; structural distance maintained per manufacturer spec; airflow path verified post-install. Better: screen the unit visually with planting / fencing that maintains the airflow path. Cert evidence bundle records the screening + verified ventilation."
          />

          <CommonMistake
            title="Cable in contact with hot pipework or cavity wall insulation without thermal consideration"
            whatHappens="Cable from outdoor unit runs through cylinder cupboard clipped against the insulated DHW primary flow pipework (heat pump systems run primary at 35-55 °C — lower than legacy boilers but still significant for cable sustained current). Over years, cable insulation thermally degrades; insulation resistance drops; eventual fault."
            doInstead="Reg 522.2.1 protection methods. Route cable distance from hot pipework (method b — most common); if forced close, use heat-resistant sleeve / cable-tray standoff (method a shielding); higher-rated cable with Appendix 4 correction factor Ca (method c). For cavity wall insulation contact: thermal sleeve over cable or rated cable. Cert evidence bundle records the protection method per cable zone."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 421.11 + Reg 421.1.4 frame fixed-equipment thermal protection. Heat pump outdoor unit is fixed equipment generating heat in normal operation.',
              'Manufacturer install manual specifies clearance + ventilation + vibration isolation. Read TOGETHER with BS 7671 not in place of it.',
              'Reg 422.3.2 enclosure surface temperature limits: 90 °C normal / 115 °C fault — apply where dust / fibres sufficient to cause a fire hazard could accumulate on the CU, cylinder or outdoor isolator enclosure.',
              'Reg 522.2.1 four protection methods for wiring from external heat: (a) shielding, (b) distance, (c) higher-rated cable, (d) local reinforcement.',
              'IP rating per BS EN 60529 + IK rating per BS EN 62262. Outdoor heat pump baseline IPX4 / IK07; exposed / vandalism-prone locations IPX5 / IK10.',
              'Outdoor cable typically 3-core SWA (single-phase) or 5-core SWA (three-phase). Sized per Appendix 4. Armour as CPC per Reg 543 where designed.',
              'Outdoor isolator BS EN 60947-3 with visible break + lockable OFF. 1-2 m from outdoor unit at 1-1.5 m mounting height.',
              'Cable glands maintain enclosure IP rating. Metric brass with rubber sealing washers + neoprene sleeves matched to cable diameter.',
              'Defrost cycle creates intermittent thermal pulses + 1-3 L condensate per cycle. Drainage + cable / isolator location designed accordingly.',
              'PDR planning: outdoor unit ≤42 dB(A) at 1m from neighbouring building; ≥1m from property boundary; ≤0.6 m³ volume.',
              'Cert evidence bundle: siting drawing + clearance dimensions + manufacturer DoC references + IP / IK ratings + cable type + glands + isolator + condensate detail + photographs at commissioning.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 3 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-8-section-2')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Supply assessment + DNO notification
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-8-section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                8.4 Wiring + dedicated circuit + ADS
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
