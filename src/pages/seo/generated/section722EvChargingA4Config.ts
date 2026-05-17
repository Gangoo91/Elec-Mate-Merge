import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition, published 15 April 2026),
// IET Guidance Note 7 (Special Locations), the IET Code of Practice for Electric
// Vehicle Charging Equipment Installation (5th Edition), and the Electric Vehicles
// (Smart Charge Points) Regulations 2021.

const published = '2026-05-17';
const modified = '2026-05-17';

export const section722EvChargingA4Config: GeneratedGuideConfig = {
  pagePath: '/guides/section-722-ev-charging-a4-2026-changes',
  title:
    'Section 722 EV Charging Changes (BS 7671:2018+A4:2026) | Elec-Mate',
  description:
    'A clause-by-clause walk-through of what Amendment 4:2026 changed in Section 722 of BS 7671 for electric vehicle charging installations — RDC-DD, PME (TN-C-S) earthing, outdoor IP ratings, Type B RCDs, bidirectional V2G, and the EIC paperwork that follows.',
  datePublished: published,
  dateModified: modified,
  readingTime: 16,
  badge: 'BS 7671 A4:2026 Update',
  badgeIcon: 'Zap',
  breadcrumbLabel: 'Section 722 A4:2026 Changes',
  heroPrefix: 'Section 722',
  heroHighlight: 'EV Charging',
  heroSuffix: '— What A4:2026 Actually Changed',
  heroSubtitle:
    'Amendment 4 to BS 7671:2018, published on 15 April 2026, reorganised Section 722 from the ground up. This guide is the clause-by-clause reading every UK installer needs — RDC-DD 6 mA DC detection, PME (TN-C-S) earthing for charge points, outdoor IP ratings, Type B versus Type A RCD selection, discrimination, bidirectional V2G implications, and how the EIC must record it all.',
  keyTakeaways: [
    'Section 722 has been substantially reorganised under A4:2026 — clause numbering is broadly preserved but the technical content of 722.411, 722.531, 722.531.3 and the annexes has materially changed.',
    'Residual Direct Current Detection Device (RDC-DD) at 6 mA DC remains mandatory for AC charge points without inherent isolation, but A4:2026 clarifies its position relative to the upstream Type A RCD and the conditions under which a Type B RCD discharges the duty on its own.',
    'PME (TN-C-S) supplies feeding outdoor EV charge points may only be used where one of the permitted exception conditions of Regulation 722.411.4.1 is satisfied — typically an open-PEN detection device meeting BS EN 62955, or a dedicated earth electrode arrangement.',
    'Outdoor charge points must achieve a minimum IP rating consistent with their installed environment — IPX4 against splashing water as a floor, with practical installations routinely specified at IP54 or IP65 for body and IK08 or higher against mechanical impact.',
    'Bidirectional charging (V2G / V2H / V2L) is recognised in A4:2026 alongside one-directional charging, and brings additional considerations around protection coordination, loss-of-mains detection, anti-islanding, and EIC documentation.',
    'The Electrical Installation Certificate (EIC) for an EV charger install must record the earthing arrangement (TN-C-S / TT / TN-S), the protective device types and ratings, the RDC-DD provision, and the inspection and test results — see the Elec-Mate EIC tool for a digital form aligned to A4:2026.',
  ],
  sections: [
    {
      id: 'why-section-722-was-rewritten',
      heading: 'Why Section 722 Was Rewritten in A4:2026',
      tocLabel: 'Why it changed',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Section 722 — Electric Vehicle Charging Installations — was first introduced into BS 7671 in the 17th Edition and has been re-edited at almost every amendment since. A2:2022 expanded the PME (TN-C-S) earthing rules; A3:2024 clarified open-PEN protection. A4:2026 is the first amendment to address bidirectional power flow head-on, and is drafted on the assumption that the typical EV charge point is an outdoor 7.4 kW domestic unit, not a commercial DC rapid charger.',
        },
        {
          type: 'paragraph',
          text:
            'The reorganisation is not cosmetic. A4:2026 brings Section 722 into line with the latest IEC 61851 series and with the Electric Vehicles (Smart Charge Points) Regulations 2021. It also tightens the link between Section 722 and the rest of BS 7671 — particularly Chapter 41 (protection against electric shock), Chapter 53 (protection, isolation, switching) and Section 712 where solar PV is co-located with V2G storage.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'This guide tracks A4:2026 — not earlier amendments',
          text:
            'If you are installing under BS 7671:2018+A2:2022 or +A3:2024, the headline rules are similar but a number of clauses differ. For a high-level summary of every A4:2026 change across the whole Standard, see the [BS 7671 A4:2026 summary guide](/guides/bs-7671-a4-2026-summary). For a full walk-through of Section 722 including everything carried forward from earlier amendments, see the [complete Section 722 guide](/guides/section-722-ev-charging-complete-guide).',
        },
      ],
    },
    {
      id: 'rdc-dd-6ma-dc',
      heading: 'RDC-DD and 6 mA DC Fault Current',
      tocLabel: 'RDC-DD (6 mA DC)',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Residual Direct Current Detection — detection of a smooth DC residual current of 6 mA or more on the AC side of an EV charge point — is the single clause that has caused more confusion than any other in Section 722. A4:2026 does not abandon the requirement; it sharpens the wording and clarifies how the duty interacts with the upstream RCD.',
        },
        {
          type: 'paragraph',
          text:
            'Regulation 722.531.3 (as renumbered under A4:2026) requires that, for AC charge points, protection against DC fault currents be provided either by a Type B RCD or by an RDC-DD that disconnects when smooth DC residual current of 6 mA or more is detected. The RDC-DD is permitted as an integral function of the charge point — and is how almost every commercially available 7.4 kW UK-market unit satisfies the clause. Where the RDC-DD is integral, the upstream RCD may be Type A rather than Type B.',
        },
        {
          type: 'list',
          items: [
            'A Type AC RCD is not acceptable on an EV charge point circuit — Type AC cannot reliably trip on the pulsating DC components characteristic of single-phase charging.',
            'A Type A RCD upstream combined with an integral RDC-DD inside a charge point that detects 6 mA DC and disconnects the supply is the canonical UK domestic arrangement under A4:2026.',
            'A Type B RCD upstream may be used in place of the Type A + RDC-DD combination, and is required where the charge point does not have an integral RDC-DD or where the installation is three-phase with no inherent DC isolation.',
            'Where multiple charge points share an upstream Type B RCD, discrimination must be considered — see the discrimination section below.',
            'The RDC-DD function must remain effective for the life of the installation and must be subject to the periodic test prescribed by the manufacturer; this should be recorded against the EIC and any subsequent EICR.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Do not assume Type A + integral RDC-DD without checking the data sheet',
          text:
            'Not every EV charge point on the UK market includes an integral RDC-DD that satisfies BS EN 62955. Some imports and heavy-duty commercial chargers require an external Type B RCD. Always confirm by manufacturer datasheet before specifying the upstream device. The Elec-Mate [cable size calculator](/guides/cable-size-for-ev-charger) prompts for the RDC-DD type as part of the design step.',
        },
      ],
    },
    {
      id: 'pme-earthing',
      heading: 'PME (TN-C-S) Earthing and the Open-PEN Problem',
      tocLabel: 'PME / open-PEN',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The PME (Protective Multiple Earthing) arrangement — known formally in BS 7671 as TN-C-S — is the default UK domestic supply, and the arrangement most likely to cause a dangerous touch voltage on outdoor metalwork during an open-PEN fault. An EV parked on the driveway is bonded to the vehicle chassis through the charging cable; if the supply PEN opens while load is drawn, the vehicle body can rise to a voltage close to line potential. Section 722 has restricted PME for EV charging since the 17th Edition; A4:2026 retains the restriction with refined exception conditions.',
        },
        {
          type: 'paragraph',
          text:
            'Regulation 722.411.4.1 prohibits the use of a PME earthing facility for the protective earthing of an outdoor EV charge point, except where one of the listed exception conditions is satisfied. The two practical routes are: provide a dedicated earth electrode and convert the charge point circuit to TT, or fit a device that detects an open-PEN condition and disconnects within the required time. Open-PEN detection devices are typically tested to BS EN 62955.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Option 1 — convert the charge point circuit to TT by driving an earth electrode local to the charge point, removing the PME connection from the charge point CPC, and protecting the circuit with an RCD providing the required disconnection time. The earth electrode resistance and the RCD operating current must together satisfy Regulation 411.5.3.',
            'Option 2 — retain the PME earthing facility and fit an open-PEN detection and disconnection device that operates when the line-to-earth voltage exceeds the threshold specified in BS EN 62955 (broadly 70 V for a sustained period or higher voltages for shorter periods).',
            'Option 3 (special cases) — where the EV charge point is located inside a building that is itself entirely on PME, and the parked vehicle cannot be touched simultaneously with extraneous-conductive-parts of the PME-earthed building, the prohibition does not bite. This is a narrow exception and should be documented carefully.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Earth electrode resistance for the TT route',
          text:
            'Driving a 1.2 m rod and recording the first measurement is not enough. The electrode resistance must be stable across seasons and soil moisture conditions, and the design must consider whether multiple electrodes are needed. A single deep electrode is often sufficient for domestic 7.4 kW; commercial installs should be supported by calculation. See our [EV charger installation guide](/ev-charger-installation) for typical earthing approaches.',
        },
        {
          type: 'paragraph',
          text:
            'The PME restriction does not apply to TN-S supplies (separate earth back to the distribution transformer) — TN-S installations carry no open-PEN risk and may earth the charge point through the existing arrangement. It also does not apply to Protective Neutral Bonding (PNB) supplies, but PNB is a specific DNO arrangement and should be confirmed in writing before relying on it.',
        },
      ],
    },
    {
      id: 'outdoor-ip-rating',
      heading: 'Outdoor IP and IK Ratings',
      tocLabel: 'IP / IK ratings',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A charge point on a UK driveway must survive rain, hose-down, dust, frost, salt spray near the coast, and accidental impact from car doors, bicycles and tools. A4:2026 reiterates the minimum IP rating against water ingress and updates the indicative IK rating for mechanical impact. The minimum requirement remains IPX4, but practical specification has tightened.',
        },
        {
          type: 'list',
          items: [
            'IPX4 is the floor for any outdoor charge point enclosure under Section 722. In practice almost all current UK-market units achieve IP54 or IP65 on the body, with the connector face typically certified separately.',
            'IK rating — mechanical impact — is not numerically prescribed in Section 722 but A4:2026 reinforces the duty under Regulation 522.6 to consider mechanical impact risk. Driveway-mounted units should achieve at least IK08 against accidental knocks.',
            'Pedestals and bollard-mounted units in public car parks should consider IK10 against deliberate impact, plus a vehicle impact barrier or bollard where exposed to vehicular movement.',
            'Wall-mounted units installed at adult shoulder height typically achieve IK08–IK10 from the manufacturer and do not require additional impact protection in domestic settings.',
            'The connector and cable management (tethered or socketed) must be specified to retain the IP rating when stowed — IPX4 for the connector when stowed in the holster is the practical minimum.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Where the charge point is mounted inside a dry, weatherproof, dust-free garage, the indoor IP regime applies and the minimum may be relaxed to IP21. If the garage is used as a wet workshop, has an unsealed roof, or has a permanently open vehicle door, treat it as outdoor for the purpose of Section 722.',
        },
      ],
    },
    {
      id: 'cable-selection',
      heading: 'Cable Selection for Outdoor EV Chargers',
      tocLabel: 'Cable selection',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Cable selection for an EV charge point is a standard BS 7671 design exercise, but several factors make the outcome materially different from a domestic socket circuit. The continuous duty cycle of charging, ambient temperature in the run to an outside wall, the protective device type, and the earthing arrangement (TT versus PME) all push the cable size up.',
        },
        {
          type: 'list',
          items: [
            '32 A circuit for a 7.4 kW single-phase charge point — minimum 6 mm² thermoplastic twin-and-earth on a short run, but most installs use 10 mm² to give thermal headroom and voltage drop margin, particularly where the run from the consumer unit to the charge point exceeds 15 metres.',
            'Three-phase 22 kW charge points require careful cable design — 32 A per phase is typical, and the cable size should be checked against grouping, ambient temperature and the cable installation method.',
            'Where the circuit is run buried underground from house to garage or outbuilding, SWA (steel wire armoured) cable to BS 5467 or BS 6724 with appropriate gland and earth tail is the canonical choice.',
            'Cables installed in conduit or trunking outdoors must be UV-stable or shielded from UV by the containment; standard thermoplastic insulation will degrade in direct sunlight over time.',
            'Voltage drop must be checked under continuous load — Appendix 4 of BS 7671 is the reference. For domestic installations a maximum voltage drop of 5% is the consumer-installation default and a 6 mm² cable on a 25 m run at 32 A is typically inside that limit.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Use the calculator for the specific design',
          text:
            'The cable size that satisfies BS 7671 for a given EV charger install depends on length, load, install method, ambient temperature, grouping, and protective device. The Elec-Mate [cable size calculator for EV chargers](/guides/cable-size-for-ev-charger) walks through all of these inputs and outputs a recommended size with the calculation visible.',
        },
      ],
    },
    {
      id: 'bidirectional-charging',
      heading: 'Bidirectional Charging — V2G, V2H, V2L',
      tocLabel: 'Bidirectional (V2G)',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Bidirectional charging — Vehicle-to-Grid (V2G), Vehicle-to-Home (V2H) and Vehicle-to-Load (V2L) — is the headline new content in A4:2026. Previous editions implicitly assumed power flow from grid to vehicle; A4:2026 explicitly recognises that the vehicle may also act as an export source under control of an inverter integral to or external to the charge point.',
        },
        {
          type: 'paragraph',
          text:
            'A bidirectional charge point behaves like a hybrid between a Section 722 charge point and a Section 712 / 551 generator installation. It must meet the EV charging duties when importing and the generator interface duties when exporting. A4:2026 brings the two together: protective devices, isolation, anti-islanding and loss-of-mains detection must satisfy the more onerous of the two.',
        },
        {
          type: 'list',
          items: [
            'Loss-of-mains detection — a V2G inverter must detect loss of grid supply and disconnect within the time prescribed by ENA G99 (or G98 for smaller installations). The disconnection time applies whether the vehicle is currently exporting or idle.',
            'Anti-islanding — the V2G system must not export into a de-energised section of the network. This is functionally identical to the requirement for a solar PV inverter and is typically certified by the manufacturer to the G99/G98 family.',
            'Protective coordination — the upstream RCD and circuit breaker must remain effective under both import and export current directions. Type B RCDs that are direction-independent are the standard choice; Type A is generally not suitable for bidirectional V2G.',
            'Earthing — the open-PEN considerations of Regulation 722.411.4.1 apply equally to bidirectional installations. The earthing arrangement does not change just because power direction reverses.',
            'EIC documentation — the certificate must record that the installation is bidirectional and reference both the EV charging regulations and the generator interface clauses. See our [smart EV charging](/smart-ev-charging) overview for how V2G is gated and certified.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'DNO notification is non-negotiable for V2G',
          text:
            'A V2G install that can export to the grid must be notified to the local DNO under ENA G98 (up to 16 A per phase) or pre-approved under G99 (above 16 A per phase). Connecting a V2G charge point without DNO notification is non-compliant regardless of how well the BS 7671 design is executed.',
        },
      ],
    },
    {
      id: 'type-b-vs-type-a-rcd',
      heading: 'Type B versus Type A RCD Selection',
      tocLabel: 'Type B vs Type A',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The choice between Type A upstream (paired with an integral RDC-DD inside the charge point) and Type B upstream (covering DC fault current on its own) is the single most important protection decision on an EV charging install. Both routes are permitted by A4:2026; the choice is driven by the charge point hardware, the wider installation, and the cost-and-discrimination trade-off.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Type A + integral RDC-DD — the dominant UK domestic arrangement. The upstream Type A RCD provides AC fault and pulsating DC fault protection; the integral RDC-DD inside the charge point handles smooth DC fault detection at 6 mA. Cheaper, simpler, and acceptable for any charge point with a certified RDC-DD.',
            'Type B RCD upstream — required where the charge point does not have an integral RDC-DD, or where multiple charge points share a single RCD without individual integral RDC-DDs, or where a three-phase charge point lacks inherent DC isolation. More expensive but covers all DC fault scenarios on its own.',
            'Where two or more charge points are protected by a single upstream RCD, the discrimination behaviour of the integral RDC-DDs against the upstream RCD must be considered — a fault on one charge point should not unnecessarily trip the others.',
            'Type B RCDs are not interchangeable with Type A in terms of tripping characteristics — a Type B may trip on conditions a Type A would not, and the design must allow for this when sizing upstream protection and considering nuisance tripping risk.',
          ],
        },
      ],
    },
    {
      id: 'discrimination',
      heading: 'Discrimination With Upstream Protective Devices',
      tocLabel: 'Discrimination',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Discrimination — the principle that a fault should be cleared by the nearest protective device only — is a normal Chapter 53 duty, but for EV charging it carries a specific risk. A Type A RCD on the EV circuit will sit in the same consumer unit as the other house RCDs. A fault on the EV circuit must not trip the whole house, and a fault elsewhere must not trip the EV circuit and disrupt charging overnight.',
        },
        {
          type: 'list',
          items: [
            'A dedicated RCD per EV charge point circuit is the canonical UK domestic arrangement — typically a 32 A or 40 A RCBO with Type A characteristic and 30 mA tripping current.',
            'Where the consumer unit has a main switch only and one RCD per row of circuits, the EV circuit should ideally be on its own row or its own dedicated RCBO to avoid loss of charging when an unrelated circuit faults.',
            'Selective (Type S) RCDs upstream may be considered where multiple downstream 30 mA RCDs are used — Type S provides a time delay that allows the nearest device to trip first.',
            'A Type B RCD upstream feeding multiple Type A + RDC-DD downstream charge points requires careful selection — the Type B will trip on DC fault current that the downstream Type A will not see, but the integral RDC-DD inside the downstream charge point will trip first on the 6 mA DC threshold.',
            'Where charge points are part of a larger commercial installation (workplace, fleet, public car park), the discrimination scheme should be documented in the design and referenced on the EIC. See our [workplace EV charging](/workplace-ev-charging) overview for typical multi-point arrangements.',
          ],
        },
      ],
    },
    {
      id: 'inspection-and-testing',
      heading: 'Inspection, Testing and the EIC',
      tocLabel: 'I&T and the EIC',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Every new EV charging installation requires an Electrical Installation Certificate (EIC) under Part 6 of BS 7671. The EIC is the same form as for any new addition, but Section 722 imposes specific items that must be recorded — and A4:2026 has tightened the wording on several of them.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Earthing arrangement — TN-C-S (with the exception condition under 722.411.4.1 explicitly named), TT (with the local earth electrode resistance recorded), or TN-S (with the supply earth confirmed in writing by the DNO).',
            'Protective device — the type, rating and breaking capacity of the upstream RCD or RCBO, and the type (Type A, Type B) and tripping current (typically 30 mA).',
            'RDC-DD provision — whether the charge point includes an integral RDC-DD certified to BS EN 62955, and the manufacturer model number.',
            'Open-PEN detection — if the earthing route is the open-PEN detection exception, the device model number and the BS EN 62955 certification.',
            'Inspection results — visible inspection of cable terminations, glands, IP rating, IK protection, mechanical security, identification of circuits, and confirmation of correct labelling at the consumer unit.',
            'Test results — continuity of CPC, insulation resistance (Line-Earth, Neutral-Earth and Line-Neutral with the charge point disconnected), polarity, earth fault loop impedance Zs, RCD operating time at IΔn and 5×IΔn, and where applicable the RDC-DD test using the procedure prescribed by the manufacturer.',
            'Functional test — confirmation that the charge point energises the vehicle correctly, that the contactor closes only when the control pilot is established, and (for V2G) that loss-of-mains detection operates correctly.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Use the Elec-Mate EIC tool for A4:2026 alignment',
          text:
            'The Elec-Mate EIC tool generates a BS 7671:2018+A4:2026-aligned Electrical Installation Certificate with the EV-specific schedule of inspections and test results pre-filled for the typical 7.4 kW domestic install. The tool prompts for the earthing route, RDC-DD provision, RCD type, and connects to the test results captured in the schedule.',
        },
      ],
    },
  ],
  howToHeading: 'How to Install an EV Charge Point Under A4:2026',
  howToDescription:
    'The compliant install sequence — from initial survey to EIC sign-off — for a typical UK 7.4 kW single-phase domestic charge point under the reorganised Section 722.',
  howToSteps: [
    {
      name: 'Survey the supply and confirm the earthing arrangement',
      text:
        'With DNO authority where required, confirm whether the supply is TN-C-S (PME), TN-S, or TT and photograph the service head. For PME supplies, decide now whether the install will use an open-PEN detection device or a local earth electrode under Regulation 722.411.4.1.',
    },
    {
      name: 'Size the circuit and select the protective devices',
      text:
        'Calculate the cable size against length, load, install method, ambient and grouping. Choose between a Type A RCBO paired with a charge point with integral RDC-DD, or a Type B RCBO covering DC fault detection on its own. Confirm the choice against the manufacturer datasheet for the specific charge point.',
    },
    {
      name: 'Install the cable, charge point body and earthing arrangement',
      text:
        'Run the cable to the outside location, gland and terminate at the charge point, install the open-PEN detection device or the local earth electrode as specified, and confirm IP rating and mechanical security. Use SWA for buried runs and UV-stable containment for any exposed external cable.',
    },
    {
      name: 'Inspect and test the installation',
      text:
        'Carry out continuity, insulation resistance, polarity, Zs and RCD timing tests. For the RDC-DD, follow the manufacturer procedure to verify 6 mA DC trip behaviour. For TT installs, measure the earth electrode resistance. Record every result against the EIC schedule.',
    },
    {
      name: 'Functional check and customer handover',
      text:
        'Use a test vehicle or a charge point test adaptor that simulates the control pilot, confirm the unit energises only on a valid pilot signal, and verify correct RCD trip behaviour. Hand over the EIC, manufacturer documentation, and a customer guide to periodic RDC-DD self-test.',
    },
    {
      name: 'Notify the DNO and (for V2G) submit G98 / G99',
      text:
        'For a one-directional 7.4 kW charge point, notify the DNO under the EV charging notification process. For V2G or other bidirectional installs, submit a G98 (up to 16 A per phase) or G99 application before energisation, and do not commission the export function until the DNO has acknowledged.',
    },
  ],
  faqs: [
    {
      question: 'Does A4:2026 still require an RDC-DD on AC EV charge points?',
      answer:
        'Yes — the requirement to detect 6 mA smooth DC residual current remains in A4:2026, under the renumbered Regulation 722.531.3. The duty can be discharged either by an integral RDC-DD inside the charge point (paired with an upstream Type A RCD) or by an upstream Type B RCD alone. A4:2026 sharpens the wording and the explicit linkage to BS EN 62955 for the device standard.',
    },
    {
      question: 'Can I still use a PME (TN-C-S) earth for an outdoor EV charge point?',
      answer:
        'Yes, but only under one of the exception conditions of Regulation 722.411.4.1. In practice this means either fitting an open-PEN detection device certified to BS EN 62955 that disconnects when the line-to-earth voltage rises above the threshold, or converting the charge point circuit to TT by driving a local earth electrode and removing the PME connection from the charge point CPC. Both routes are compliant; the choice is a cost, complexity and reliability trade-off.',
    },
    {
      question: 'Is a Type B RCD always required for an EV charger?',
      answer:
        'No. Under A4:2026, where the charge point includes an integral RDC-DD certified to BS EN 62955, the upstream RCD may be Type A. A Type B is required where the charge point lacks an integral RDC-DD, where multiple charge points share an upstream RCD without individual RDC-DDs, or where the install is three-phase without inherent DC isolation. Most domestic 7.4 kW UK-market units include the RDC-DD and are paired with a Type A.',
    },
    {
      question: 'What IP rating does an outdoor EV charge point need?',
      answer:
        'The minimum under Section 722 is IPX4 against splashing water from any direction. In practice, current UK-market charge points achieve IP54 or IP65 on the body, with the connector face certified separately. Mechanical impact protection should achieve at least IK08 for driveway-mounted units; pedestal-mounted units in public locations should consider IK10 plus a vehicle impact barrier.',
    },
    {
      question: 'Does Section 722 under A4:2026 cover V2G bidirectional charging?',
      answer:
        'Yes. A4:2026 is the first amendment to explicitly recognise bidirectional power flow — V2G (Vehicle-to-Grid), V2H (Vehicle-to-Home) and V2L (Vehicle-to-Load). A bidirectional install must satisfy both the EV charging duties of Section 722 and the generator interface duties of Section 712 / Section 551 / ENA G98 or G99, whichever is more onerous. DNO notification is mandatory before commissioning the export function.',
    },
    {
      question: 'What does the EIC have to record for an EV charger install?',
      answer:
        'The EIC must record the earthing arrangement (TN-C-S with the exception route named, TT with the earth electrode resistance, or TN-S confirmed by the DNO), the upstream protective device type and rating, the RDC-DD provision and certification, the inspection results, and the full schedule of test results including Zs, RCD operating times, and the RDC-DD test where required. For V2G installs, the EIC also records the loss-of-mains and anti-islanding test results. The Elec-Mate EIC tool generates this aligned to A4:2026.',
    },
    {
      question: 'How does A4:2026 affect existing EV charger installs that were certified under A2:2022 or A3:2024?',
      answer:
        'Existing installs remain compliant with the edition under which they were certified — BS 7671 does not apply retrospectively. New installs from 28 September 2026 must be designed and certified to A4:2026. The next periodic EICR should record the edition under which the original install was certified, and flag any condition that would no longer comply if reinstalled today — typically as a C3 (improvement recommended), not a C2.',
    },
    {
      question: 'Do I need a separate earth electrode for every PME charge point?',
      answer:
        'Only if the design relies on the TT route under Regulation 722.411.4.1. If the design uses an open-PEN detection device, no local earth electrode is required and the charge point earthing remains on the PME facility. The choice is a design decision driven by soil conditions, available space for an electrode, cost of the detection device versus the rod, and installer preference. Both are equally compliant under A4:2026.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/bs-7671-a4-2026-summary',
      title: 'BS 7671 A4:2026 Summary',
      description: 'A high-level walk-through of every meaningful change in Amendment 4:2026 across the whole Standard — AFDD, PME, schedule columns, model forms and Section 722.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/section-722-ev-charging-complete-guide',
      title: 'Section 722 — Complete Guide',
      description: 'The full Section 722 reference, including everything carried forward from earlier amendments alongside the A4:2026 changes covered on this page.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/cable-size-for-ev-charger',
      title: 'Cable Size for EV Charger',
      description: 'BS 7671 cable size calculator with EV-specific defaults — length, install method, protective device, ambient and grouping, with the working shown.',
      icon: 'Cable',
      category: 'Tool',
    },
    {
      href: '/guides/ev-charger-installation',
      title: 'EV Charger Installation Guide',
      description: 'End-to-end install walk-through — survey, design, install, test, certify, notify — for the typical 7.4 kW domestic charge point.',
      icon: 'Wrench',
      category: 'Guide',
    },
    {
      href: '/smart-ev-charging',
      title: 'Smart EV Charging',
      description: 'How smart charge point firmware, the Smart Charge Points Regulations 2021, and the BS 7671 hardware duties intersect — with a note on V2G bidirectional flows.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/workplace-ev-charging',
      title: 'Workplace EV Charging',
      description: 'Multi-point commercial and workplace EV charging — load balancing, discrimination, three-phase distribution, and EIC documentation across multiple chargers.',
      icon: 'Building2',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Certify your next EV install correctly under A4:2026',
  ctaSubheading:
    'The Elec-Mate EIC tool generates a BS 7671:2018+A4:2026-aligned Electrical Installation Certificate with Section 722 prompts built in — earthing route, RDC-DD provision, RCD type, Zs and RCD timing test results, ready to PDF for the customer. 7-day free trial, cancel anytime.',
};
