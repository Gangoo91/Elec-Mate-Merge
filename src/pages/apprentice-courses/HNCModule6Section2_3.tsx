/**
 * Module 6 · Section 2 · Subsection 3 — Biomass Systems
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Biomass boilers, fuel storage, handling systems, emissions control and integration with building services
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Biomass Systems - HNC Module 6 Section 2.3';
const DESCRIPTION =
  'Master biomass heating systems for building services: boiler types, fuel storage and handling, automatic feed systems, emissions control, flue requirements, ash management, and integration with heating systems.';

const quickCheckQuestions = [
  {
    id: 'biomass-fuel-types',
    question:
      'Which biomass fuel type typically offers the most consistent combustion characteristics?',
    options: [
      'Wood pellets',
      'Logs',
      'Miscanthus bales',
      'Wood chips',
    ],
    correctIndex: 0,
    explanation:
      'Wood pellets offer the most consistent combustion due to standardised moisture content (typically <10%), uniform size, and consistent calorific value. This enables precise automated control and higher combustion efficiency.',
  },
  {
    id: 'fuel-storage',
    question: 'What is the primary reason biomass fuel stores must be kept dry?',
    options: [
      'Damp fuel poses an electric shock risk to the feed auger',
      'Moisture reduces calorific value and combustion efficiency',
      'Dry fuel is a legal requirement under the Clean Air Act',
      'Wet pellets expand and jam the boiler ignition element',
    ],
    correctIndex: 1,
    explanation:
      'Moisture in biomass fuel significantly reduces its calorific value (energy content) and combustion efficiency. Energy is wasted evaporating water rather than producing heat, and wet fuel can cause incomplete combustion and increased emissions.',
  },
  {
    id: 'emissions-control',
    question:
      'What is the primary method of particulate emissions control in modern biomass boilers?',
    options: [
      'Catalytic converters fitted to the combustion chamber',
      'Selective non-catalytic reduction (SNCR) urea injection',
      'Activated carbon scrubbers in the condensate drain',
      'Electrostatic precipitators or cyclonic separators',
    ],
    correctIndex: 3,
    explanation:
      'Modern biomass boilers typically use electrostatic precipitators (ESP) or cyclonic/multicyclonic separators to remove particulate matter from flue gases. ESPs are highly effective, achieving >99% particulate removal.',
  },
  {
    id: 'buffer-vessel',
    question: 'Why is a buffer vessel essential in most biomass heating systems?',
    options: [
      'To prevent boiler short-cycling and thermal shock',
      'To store hot water for domestic use',
      'To filter impurities from the system',
      'To increase system pressure',
    ],
    correctIndex: 0,
    explanation:
      'Buffer vessels prevent short-cycling (frequent on/off operation) which reduces efficiency and increases emissions. They also protect against thermal shock during load changes and provide thermal mass for more stable operation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What moisture content is typically required for wood pellets to meet ENplus A1 quality standard?',
    options: [
      'Less than 5%',
      'Less than 10%',
      'Less than 15%',
      'Less than 20%',
    ],
    correctAnswer: 1,
    explanation:
      'ENplus A1 quality pellets must have moisture content below 10% (typically 8-10%). This ensures consistent combustion, high calorific value (minimum 4.6 kWh/kg), and reliable automatic feed system operation.',
  },
  {
    id: 2,
    question:
      'Which type of biomass boiler is most suitable for small commercial applications requiring automated operation?',
    options: [
      'Batch-fed chip boiler',
      'Log gasification boiler',
      'Pellet boiler with vacuum feed',
      'Straw bale boiler',
    ],
    correctAnswer: 2,
    explanation:
      'Pellet boilers with vacuum or auger feed systems offer fully automated operation ideal for small commercial applications. They provide precise modulation, automatic ignition, and minimal operator intervention.',
  },
  {
    id: 3,
    question:
      'What is the typical storage volume required for wood pellets to provide one heating season for a 50kW system?',
    options: [
      '10-15 tonnes',
      '2-3 tonnes',
      '20-25 tonnes',
      '5-8 tonnes',
    ],
    correctAnswer: 3,
    explanation:
      "A 50kW pellet boiler operating at average load typically requires 5-8 tonnes of pellets annually. Storage should accommodate at least one delivery (typically 3-6 tonnes) or ideally a full season's supply.",
  },
  {
    id: 4,
    question:
      'What is the minimum recommended flue height above roof level for a biomass boiler installation?',
    options: [
      '1 metre above highest point within 10m',
      'Level with the ridge of the nearest roof',
      '300mm above the point of penetration through the roof',
      '5 metres above the highest point within 10m',
    ],
    correctAnswer: 0,
    explanation:
      'Flue terminals should be at least 1 metre above the highest point of any structure within 10 metres to ensure adequate dispersion of combustion products and prevent downdraught issues.',
  },
  {
    id: 5,
    question: 'What type of automatic feed system uses negative pressure to transport pellets?',
    options: [
      'Auger feed system',
      'Pneumatic vacuum system',
      'Belt conveyor system',
      'Gravity feed system',
    ],
    correctAnswer: 1,
    explanation:
      'Pneumatic vacuum systems use negative pressure to transport pellets through flexible pipes from the store to the boiler. They can handle longer distances (up to 25m) and multiple direction changes compared to auger systems.',
  },
  {
    id: 6,
    question: 'What is the primary purpose of a de-ashing system in a biomass boiler?',
    options: [
      'To filter particulates from the flue gases before discharge',
      'To dry incoming fuel before it reaches the combustion chamber',
      'To automatically remove combustion residue from the grate',
      'To remove condensate from the base of the flue system',
    ],
    correctAnswer: 2,
    explanation:
      'Automatic de-ashing systems remove ash from the combustion grate and transfer it to external ash bins. This maintains airflow through the fuel bed, ensures consistent combustion, and reduces manual maintenance.',
  },
  {
    id: 7,
    question: 'What is the typical ash content of good quality wood pellets?',
    options: [
      '10-12%',
      '2-3%',
      '5-7%',
      'Less than 0.7%',
    ],
    correctAnswer: 3,
    explanation:
      'High-quality wood pellets (ENplus A1) have ash content below 0.7%. Lower ash content reduces de-ashing frequency, minimises maintenance, and indicates cleaner fuel with fewer impurities.',
  },
  {
    id: 8,
    question:
      'Which regulation specifically governs emissions from medium combustion plants including biomass boilers?',
    options: [
      'Medium Combustion Plant Directive (MCPD)',
      'The Gas Safety (Installation and Use) Regulations',
      'The Construction (Design and Management) Regulations',
      'The Pressure Equipment (Safety) Regulations',
    ],
    correctAnswer: 0,
    explanation:
      'The Medium Combustion Plant Directive (MCPD), implemented in the UK as the Environmental Permitting Regulations, sets emission limits for plants 1-50MW thermal input, including NOx, SO2, and particulate matter.',
  },
  {
    id: 9,
    question: 'What is the recommended minimum buffer vessel size for a 100kW biomass boiler?',
    options: [
      '500 litres',
      '1,000-1,500 litres',
      '3,000-5,000 litres',
      '10,000 litres',
    ],
    correctAnswer: 1,
    explanation:
      'Buffer vessel sizing typically follows 10-20 litres per kW of boiler output. For a 100kW boiler, 1,000-2,000 litres is recommended to prevent short-cycling and provide adequate thermal storage for load variations.',
  },
  {
    id: 10,
    question: 'What safety device prevents fire spreading from the boiler back to the fuel store?',
    options: [
      'A pressure relief valve on the boiler flow connection',
      'A flue gas spillage detector in the boiler room',
      'Drop tube or rotary valve with fire protection',
      'A low-water cut-off on the buffer vessel',
    ],
    correctAnswer: 2,
    explanation:
      'Drop tubes (creating an air gap) or rotary valves with thermal fuses prevent burn-back from the combustion chamber to the fuel store. These are essential safety features required by insurance and regulations.',
  },
  {
    id: 11,
    question: 'What is the typical calorific value of dry wood chips at 25% moisture content?',
    options: [
      '2.0 kWh/kg',
      '5.5 kWh/kg',
      '4.8 kWh/kg',
      '3.5 kWh/kg',
    ],
    correctAnswer: 3,
    explanation:
      'Wood chips at 25% moisture content have approximately 3.5 kWh/kg calorific value. This compares to 4.8 kWh/kg for pellets (<10% moisture) and reduces to about 2.5 kWh/kg at 40% moisture.',
  },
  {
    id: 12,
    question:
      'Which thermal store configuration is most suitable for integrating biomass with solar thermal?',
    options: [
      'Multi-zone stratified thermal store',
      'A single small buffer vessel sized only for anti-cycling',
      'A direct unvented cylinder with no buffer at all',
      'An open-vented header tank in the roof space',
    ],
    correctAnswer: 0,
    explanation:
      'Multi-zone stratified thermal stores allow different temperature zones for various heat sources and demands. Solar thermal feeds the lower zone, biomass the middle/upper zones, maximising efficiency of both systems.',
  },
];

const faqs = [
  {
    question: 'How do I size a biomass fuel store for a commercial installation?',
    answer:
      'Calculate annual fuel consumption based on heat demand and boiler efficiency (typically 85-92%). For pellets: annual heat demand (kWh) ÷ 4,800 (kWh/tonne) ÷ efficiency = tonnes required. Size storage for at least one delivery (3-6 tonnes for blown delivery) or ideally 50-100% of annual requirement. Consider access for delivery vehicles, store structural requirements for bulk material, and factor in a 15-20% contingency.',
  },
  {
    question: 'What maintenance schedule is required for biomass boilers?',
    answer:
      'Daily: Check fuel levels and system operation. Weekly: Empty ash bin (frequency depends on fuel quality and load). Monthly: Clean heat exchanger tubes, check combustion parameters, inspect seals. Annually: Full service including burner inspection, flue cleaning, safety device testing, and combustion analysis. Keep maintenance logs for warranty and RHI compliance if applicable.',
  },
  {
    question: 'Can biomass boilers operate in Smoke Control Areas?',
    answer:
      'Yes, but only if the appliance is DEFRA-exempt (listed on the DEFRA website) and uses authorised fuels. Most modern pellet boilers achieve exemption status. Wood chip and log boilers may not qualify due to higher emissions. Always verify exemption status before specifying equipment for Smoke Control Areas and ensure the specific fuel type is also approved.',
  },
  {
    question: 'How does biomass integrate with existing heating systems?',
    answer:
      'Biomass typically connects via a buffer vessel to the heating system primary circuit. The buffer vessel decouples the boiler from variable building loads, preventing short-cycling. Low-loss headers may be used for multiple circuits. Existing boilers can be retained as backup/peak load duty. Controls should prioritise biomass with fossil fuel backup only when required or during maintenance periods.',
  },
  {
    question: 'What are the key planning considerations for biomass installations?',
    answer:
      'Key considerations include: delivery vehicle access (articulated lorries for blown pellet delivery), noise from fuel delivery and plant operation, flue height and dispersion modelling for larger installations, fuel store location and fire separation requirements, visual impact of flue and buildings, and local air quality constraints. Pre-application consultation with the planning authority is recommended for installations over 400kW.',
  },
  {
    question: 'How do RHI requirements affect biomass system design?',
    answer:
      'Although the domestic RHI closed in 2022 and non-domestic RHI closed to new applications in 2021, existing accredited installations must maintain compliance. Requirements included: MCS certification for installations under 45kW, metering of heat output, use of sustainable fuel (typically requiring Biomass Suppliers List registration), annual fuel sustainability reporting, and maintenance records. Similar requirements may apply to successor schemes.',
  },
];

const HNCModule6Section2_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section2")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 2 · Subsection 3"
            title="Biomass Systems"
            description="Biomass boilers, fuel storage, handling systems, emissions control and integration with building services"
            tone="purple"
          />

          <TLDR
            points={[
              "Biomass boilers burn wood pellets, chips or logs — a low-carbon (not zero-carbon) fuel where the regrowth carbon cycle is shorter than the combustion release. Typical efficiencies 85–92% for pellets, 75–85% for chips.",
              "Air-quality compliance is now the dominant design constraint: Clean Air Act smoke control areas require Defra-exempt appliances and Ecodesign Lot 20 (PM ≤40 mg/Nm³ for pellets, ≤60 for chips) emissions limits.",
              "Fuel storage and handling drive most of the design complexity — pellet silo capacity for 4–8 weeks consumption, auger or vacuum feed, ash removal, and statutory annual sweep/inspection.",
            ]}
          />

          <RegsCallout
            source="The Air Quality (Domestic Solid Fuels Standards) (England) Regulations 2020 + Ecodesign Lot 20"
            clause="No person shall sell, offer for sale or supply for use in a domestic premises any solid fuel that does not meet the prescribed sulphur content, smoke emission and particulate matter standards. Solid fuel boilers placed on the market shall meet the seasonal space heating efficiency and emission limits set out in Commission Regulation (EU) 2015/1189 (Ecodesign Lot 20)."
            meaning={
              <>
                Even outside smoke control areas, only Ecodesign-compliant biomass boilers can lawfully be installed in dwellings. Within smoke control areas (most urban England), the appliance must additionally appear on the Defra exempt appliance list. Old log boilers and stoves cannot be specified for new installations.
              </>
            }
            cite="Source: SI 2020/1095 — legislation.gov.uk; Ecodesign Lot 20 — eur-lex.europa.eu"
          />

          <LearningOutcomes
            outcomes={[
              "Compare biomass boiler types and their applications",
              "Specify fuel storage and automatic handling systems",
              "Design emissions control and flue systems to regulations",
              "Size buffer vessels and thermal stores for biomass integration",
              "Plan ash handling and maintenance requirements",
              "Integrate biomass with conventional heating systems",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Biomass Boiler Types and Fuel">
            <p>Biomass heating uses organic material - primarily wood in various forms - as fuel to generate heat. When sourced sustainably, biomass is considered carbon-neutral as the CO2 released during combustion equals that absorbed during growth. Boiler selection depends on fuel availability, automation requirements, and heat demand profile.</p>
            <p><strong>Biomass fuel comparison:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Wood pellets:</strong> &lt;10% — 4.8 kWh/kg — Fully automatic</li>
              <li><strong>Wood chips (G30):</strong> 20-30% — 3.5 kWh/kg — Automatic</li>
              <li><strong>Wood chips (G50):</strong> 30-50% — 2.5-3.0 kWh/kg — Automatic</li>
              <li><strong>Logs (seasoned):</strong> 15-20% — 4.0-4.3 kWh/kg — Manual batch</li>
            </ul>
            <p><strong>Boiler Types by Application</strong></p>
            <p><strong>Pellet Boilers (10-500kW)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fully automated operation</li>
              <li>High modulation range (30-100%)</li>
              <li>Compact fuel storage</li>
              <li>Low ash production (&lt;1%)</li>
              <li>Ideal: commercial, schools, care homes</li>
            </ul>
            <p><strong>Chip Boilers (50kW-10MW)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lower fuel cost per kWh</li>
              <li>Larger fuel store required</li>
              <li>More robust feed systems</li>
              <li>Higher ash content (1-3%)</li>
              <li>Ideal: estates, industry, district heating</li>
            </ul>
            <p><strong>Fuel Quality Standards</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>ENplus:</strong> European pellet quality certification (A1, A2, B grades)</li>
              <li><strong>Woodsure:</strong> UK quality assurance for logs, chips, briquettes</li>
              <li><strong>BSL:</strong> Biomass Suppliers List - sustainability certification</li>
            </ul>
            <p><strong>Specification note:</strong> Always specify fuel quality requirements in tender documents - poor fuel quality is the primary cause of biomass system problems.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Fuel Storage and Handling Systems">
            <p>Proper fuel storage is critical for biomass system reliability. Storage must keep fuel dry, allow efficient delivery and extraction, and maintain fire separation from the boiler plant. Automatic handling systems transport fuel from store to boiler with minimal operator intervention.</p>
            <p><strong>Pellet Storage</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Bulk silo (internal/external)</li>
              <li>Underground tank</li>
              <li>Purpose-built store room</li>
              <li>Fabric silo systems</li>
              <li>Pneumatic delivery via tanker</li>
            </ul>
            <p><strong>Chip Storage</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Walking floor bunker</li>
              <li>Inclined agitator system</li>
              <li>Rotating arm/sweep system</li>
              <li>Tipper access required</li>
              <li>Larger volumes (2-3x pellets)</li>
            </ul>
            <p><strong>Key Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Weatherproof construction</li>
              <li>Ventilation to control humidity</li>
              <li>Fire-rated separation</li>
              <li>Vehicle access for delivery</li>
              <li>Level sensors for monitoring</li>
            </ul>
            <p><strong>Automatic Feed Systems</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Auger (screw conveyor):</strong> 6-8 metres — Short, straight runs — Simple, reliable, limited flexibility</li>
              <li><strong>Pneumatic vacuum:</strong> 20-25 metres — Remote stores, direction changes — Pellets only, quiet operation</li>
              <li><strong>Macerating auger:</strong> 8-15 metres — Larger chips (G50) — Handles variable chip sizes</li>
              <li><strong>Belt/chain conveyor:</strong> 50+ metres — Large chip installations — Higher capacity, more maintenance</li>
            </ul>
            <p><strong>Fire Safety - Burn-Back Prevention</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Drop tube:</strong> Creates air gap between feed system and combustion chamber</li>
              <li><strong>Rotary valve:</strong> Provides positive isolation, thermal fuse triggers closure</li>
              <li><strong>Water dousing:</strong> Temperature sensor activates water spray in feed tube</li>
              <li><strong>Fire-rated construction:</strong> 60-minute separation between store and boiler</li>
            </ul>
            <p><strong>Design tip:</strong> Allow 15-20% additional storage capacity beyond calculated requirements to accommodate delivery schedule variations and ensure continuous operation.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Emissions Control and Flue Systems">
            <p>Biomass combustion produces particulate matter (PM), nitrogen oxides (NOx), carbon monoxide (CO), and volatile organic compounds (VOCs). Modern boilers incorporate primary combustion controls and may require secondary abatement equipment to meet emission limits, particularly for larger installations subject to environmental permitting.</p>
            <p><strong>Emission Limits (Medium Combustion Plant Directive)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Thermal input:</strong> 1-50 MW</li>
              <li><strong>NOx limit:</strong> 300 mg/Nm3 (new plant &gt;5MW)</li>
              <li><strong>PM limit:</strong> 30 mg/Nm3 (new plant &gt;5MW)</li>
              <li><strong>SO2 limit:</strong> 200 mg/Nm3</li>
            </ul>
            <p>Note: Tighter limits apply in certain areas and for larger plant</p>
            <p><strong>Emissions Control Technologies</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Primary measures:</strong> Optimised combustion air, staged combustion, lambda control</li>
              <li><strong>Cyclonic separator:</strong> 70-85% PM removal, low maintenance, common on chip boilers</li>
              <li><strong>Multicyclone:</strong> 85-95% PM removal, moderate cost</li>
              <li><strong>Electrostatic precipitator (ESP):</strong> &gt;99% PM removal, higher cost, required for strict limits</li>
              <li><strong>Fabric filter (baghouse):</strong> &gt;99% PM removal, used in larger industrial plant</li>
            </ul>
            <p><strong>Flue System Design</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Flue material:</strong> Stainless steel 316L minimum — Condensing flues require higher grades</li>
              <li><strong>Terminal height:</strong> 1m above highest point within 10m — Dispersion modelling may require more</li>
              <li><strong>Insulation:</strong> Twin-wall insulated throughout — Maintains flue gas temperature</li>
              <li><strong>Condensate drain:</strong> Required at base of flue — Acidic - may need neutralisation</li>
              <li><strong>Access for cleaning:</strong> Inspection hatches required — Annual cleaning essential</li>
            </ul>
            <p><strong>Planning consideration:</strong> Flue heights above 10m may require planning permission. Early consultation with local authority is recommended for installations over 200kW.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="System Integration and Operation">
            <p>Successful biomass integration requires careful hydraulic design to maximise efficiency, prevent operational problems, and ensure seamless integration with building heating systems. Buffer vessels, thermal stores, and backup provision are key design considerations.</p>
            <p><strong>Hydraulic Integration Components</strong></p>
            <p><strong>Buffer Vessel</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Prevents short-cycling (on/off)</li>
              <li>Absorbs load variations</li>
              <li>Size: 10-20 litres per kW</li>
              <li>Single temperature zone</li>
              <li>Essential for all biomass systems</li>
            </ul>
            <p><strong>Thermal Store</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Stratified temperature zones</li>
              <li>Multiple heat source integration</li>
              <li>DHW via internal coil possible</li>
              <li>Size: 25-50 litres per kW</li>
              <li>Preferred for multi-source systems</li>
            </ul>
            <p><strong>Typical System Configuration</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Biomass boiler:</strong> Primary heat generation — 60-80% of design heat load</li>
              <li><strong>Buffer vessel:</strong> Load smoothing, anti-cycling — 10-20 litres per kW biomass</li>
              <li><strong>Backup boiler (gas/oil):</strong> Peak load, maintenance cover — 100% of design load</li>
              <li><strong>Low-loss header:</strong> Hydraulic separation — For multiple circuit systems</li>
              <li><strong>Plate heat exchanger:</strong> System separation — If water quality differs</li>
            </ul>
            <p><strong>Control Strategy</strong></p>
            <p><strong>Cascade control:</strong> Biomass boiler operates as lead, backup as lag</p>
            <p><strong>Weather compensation:</strong> Flow temperature varies with external conditions</p>
            <p><strong>Buffer management:</strong> Boiler fires to maintain buffer temperature band</p>
            <p><strong>Modulation:</strong> Modern boilers modulate 30-100% to match load</p>
            <p><strong>Anti-cycling:</strong> Minimum run time and rest periods programmed</p>
            <p><strong>BMS integration:</strong> Enable/disable, alarm monitoring, energy metering</p>
            <p><strong>Ash Handling Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Automatic de-ashing:</strong> Auger removes ash from grate to external bin</li>
              <li><strong>Ash bin sizing:</strong> Typically 4-8 weeks between emptying for pellet systems</li>
              <li><strong>Disposal:</strong> Wood ash can be used as fertiliser (pH alkaline) or general waste</li>
              <li><strong>Access:</strong> Ensure ash bin is accessible for manual removal</li>
              <li><strong>Compaction:</strong> Some systems compact ash to reduce emptying frequency</li>
            </ul>
            <p><strong>Design note:</strong> Undersizing the biomass boiler to 60-80% of peak load and relying on backup for peaks is often more cost-effective than sizing biomass for 100% peak load.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Fuel Store Sizing</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate pellet storage for a 150kW boiler serving a care home with 1,200,000 kWh annual heat demand.</p>
            <p>Step 1: Calculate annual fuel requirement</p>
            <p>Annual heat demand: 1,200,000 kWh</p>
            <p>Boiler efficiency: 90%</p>
            <p>Fuel energy required: 1,200,000 / 0.90 = 1,333,333 kWh</p>
            <p>Step 2: Convert to fuel mass</p>
            <p>Pellet calorific value: 4,800 kWh/tonne</p>
            <p>Annual pellet requirement: 1,333,333 / 4,800 = 278 tonnes</p>
            <p>Step 3: Size fuel store</p>
            <p>Delivery capacity: 6 tonnes (blown delivery tanker)</p>
            <p>Deliveries per year: 278 / 6 = 46 deliveries</p>
            <p>Target: One delivery per week maximum in winter</p>
            <p>Recommended store: 10-12 tonnes capacity</p>
            <p>Pellet bulk density: 650 kg/m3</p>
            <p>Store volume: 12,000 / 650 = 18.5 m3 (minimum 20 m3)</p>
            <p>
              <strong>Example 2: Buffer Vessel Sizing</strong>
            </p>
            <p><strong>Scenario:</strong> Size a buffer vessel for a 200kW wood chip boiler with minimum modulation of 40%.</p>
            <p>Step 1: Determine minimum output</p>
            <p>Minimum modulation: 40% of 200kW = 80kW</p>
            <p>Building base load (summer): ~30kW</p>
            <p>Excess heat when cycling: 80 - 30 = 50kW</p>
            <p>Step 2: Calculate storage requirement</p>
            <p>Minimum run time (for clean burn): 30 minutes</p>
            <p>Energy to store: 50kW x 0.5h = 25 kWh</p>
            <p>Temperature differential: 80°C - 60°C = 20K</p>
            <p>Water specific heat: 4.18 kJ/kg·K</p>
            <p>Step 3: Size buffer</p>
            <p>Volume = (25 x 3600) / (4.18 x 20 x 1) = 1,076 litres</p>
            <p>Recommended: 1,500 litre buffer vessel</p>
            <p>Check: 1,500 / 200 = 7.5 litres/kW (within 10-20 range)</p>
            <p>
              <strong>Example 3: Ash Production Estimate</strong>
            </p>
            <p><strong>Scenario:</strong> Estimate ash bin emptying frequency for a 100kW pellet boiler.</p>
            <p>Step 1: Estimate fuel consumption</p>
            <p>Average load: 60kW (60% of rated output)</p>
            <p>Daily operating hours: 12 hours average</p>
            <p>Daily energy: 60 x 12 = 720 kWh</p>
            <p>Daily pellet use: 720 / (4.8 x 0.9) = 167 kg</p>
            <p>Step 2: Calculate ash production</p>
            <p>Pellet ash content (ENplus A1): 0.5%</p>
            <p>Daily ash: 167 x 0.005 = 0.84 kg</p>
            <p>Weekly ash: 0.84 x 7 = 5.9 kg</p>
            <p>Step 3: Determine emptying frequency</p>
            <p>Ash bin capacity: 50 litres (typical)</p>
            <p>Ash bulk density: ~300 kg/m3</p>
            <p>Bin capacity by mass: 0.05 x 300 = 15 kg</p>
            <p>Emptying frequency: 15 / 5.9 = every 2.5 weeks</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Design Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Confirm fuel availability, quality, and supply chain reliability</li>
              <li>Assess delivery vehicle access - articulated lorry turning circle 25m</li>
              <li>Calculate fuel store size for minimum 2-3 weeks supply at peak demand</li>
              <li>Design buffer/thermal store to prevent short-cycling</li>
              <li>Specify emissions control to meet MCPD limits if applicable</li>
              <li>Plan flue route and terminal position for dispersion and planning compliance</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Pellet calorific value: <strong>4.8 kWh/kg</strong> at &lt;10% moisture</li>
              <li>Wood chip calorific value: <strong>3.5 kWh/kg</strong> at 25% moisture</li>
              <li>Buffer vessel: <strong>10-20 litres per kW</strong> boiler output</li>
              <li>Flue terminal: <strong>1m above highest point within 10m</strong></li>
              <li>Boiler efficiency: <strong>85-92%</strong> typical for modern units</li>
              <li>Pellet bulk density: <strong>650 kg/m3</strong></li>
            </ul>
            <p>
              <strong>Common Problems to Avoid:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Poor fuel quality:</strong> Specify ENplus or Woodsure certification</li>
              <li><strong>Inadequate storage:</strong> Wet fuel causes bridging and combustion issues</li>
              <li><strong>No buffer vessel:</strong> Short-cycling damages boiler and increases emissions</li>
              <li><strong>Undersized flue:</strong> Poor draught causes incomplete combustion</li>
              <li><strong>Blocked feed systems:</strong> Ensure fuel is correctly sized for feed mechanism</li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Rural school biomass under-performs after fuel switch"
            situation={
              <>
                A rural primary school installed a 100 kW wood-chip boiler under the (now closed) RHI scheme. The original supplier provided G30/G50 chips at 25% moisture and the system met its predicted efficiency. The new fuel supplier delivers G50 chips at 38% moisture. Output drops, ash builds up, and the school overrides to oil backup.
              </>
            }
            whatToDo={
              <>
                Verify against the boiler manufacturer fuel specification (typically ENplus or equivalent moisture/ash class). If the new fuel exceeds the spec, the supplier is in breach of contract — switch back. If switching is not viable, clean out the boiler, recalibrate combustion air, and accept reduced output capacity (typically 60–70% of nameplate at high moisture). Long-term: install a moisture-monitored fuel store or specify a boiler with adaptive combustion control. Update the BMS to alarm when oil backup runs &gt;5% of operating hours.
              </>
            }
            whyItMatters={
              <>
                Biomass success is 90% fuel quality, 10% boiler. Cheap wet fuel destroys efficiency, increases emissions and accelerates wear. The fuel supply contract is the most important document on the project — moisture %, ash %, particle size, delivery interval.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Pellet boilers 85–92% efficient, fully automated; chip boilers 75–85%, larger fuel stores; log gasifiers manual.",
              "Fuel quality (moisture, ash, size) drives performance — ENplus A1 pellets, G30/G50 chips at <25% moisture.",
              "Ecodesign Lot 20 emissions: PM ≤40 (pellets), ≤60 (chips) mg/Nm³ — non-compliant appliances unlawful.",
              "Smoke control areas: Defra-exempt appliances only — check the published exempt list.",
              "Fuel storage: 4–8 weeks consumption typical; auger feed for chips, vacuum or auger for pellets.",
              "Statutory chimney sweep annually + insurance-required boiler service; ash disposal plan needed.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section2-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Heat pump technology
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section2-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Small-scale wind
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section2_3;
