import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition), the IET On-Site Guide, plus the
// CDM 2015 statutory framework, the Electricity at Work Regulations 1989
// and the Work at Height Regulations 2005.

const published = '2026-05-17';
const modified = '2026-05-18';

export const ramsForSolarPVInstallationConfig: GeneratedGuideConfig = {
  pagePath: '/guides/rams-for-solar-pv-installation',
  title:
    'RAMS for Solar PV Installation — UK Method Statement Guide',
  description:
    'How to write a Risk Assessment and Method Statement (RAMS) for a UK solar PV installation. Covers working at height, live DC strings, inverter mounting…',
  datePublished: published,
  dateModified: modified,
  readingTime: 14,
  badge: 'Solar PV Safety Documentation',
  badgeIcon: 'ShieldCheck',
  breadcrumbLabel: 'RAMS for Solar PV',
  heroPrefix: 'RAMS for',
  heroHighlight: 'Solar PV Installation',
  heroSuffix: '— Method Statement (UK)',
  heroSubtitle:
    'Solar PV installs combine working at height, live DC conductors that cannot be switched off in daylight, heavy inverter lifts, AC tie-in to the consumer unit, DNO notification under G98 or G99, and — increasingly — adjacent battery storage. This guide explains every hazard category, the BS 7671 and CDM duties behind them, and exactly what a credible Risk Assessment and Method Statement must contain before scaffold goes up.',
  keyTakeaways: [
    'Live DC strings cannot be "turned off". A PV module exposed to daylight is a permanent voltage source — RAMS must treat the DC side as live for the entire shift, not just during energising.',
    'Working at Height Regulations 2005 Reg 6 requires height work to be avoided where reasonably practicable; where not, fall prevention before fall arrest. Roof access on a domestic install almost always needs edge protection or a fall-arrest harness with an anchor designed for the load.',
    'BS 7671:2018+A4:2026 Section 712 (Solar PV) sets the technical wiring requirements and Amendment 4 adds the new EIC item 14.0 "Prosumer Low-Voltage Installation" certification line — the RAMS should reference both because they drive isolation and inspection method.',
    'G98 (Engineering Recommendation G98) covers small-scale connect-and-notify (single-phase up to 16A per phase, three-phase up to 16A per phase per micro-generator). G99 covers larger installs that must be applied for and approved by the DNO before energising.',
    'CDM 2015 Regulation 15 (the contractor\'s duty) and Regulation 8 (general duty of competence) apply to every solar PV install in scope of CDM — including most domestic retrofits that involve more than one trade or last more than 30 working days / 500 person-days.',
    'Battery storage adjacent to a PV system introduces thermal-runaway, gas-vent, and DC arc-flash risks. RAMS must reference IET Code of Practice for Electrical Energy Storage Systems and treat the battery as a separate hazard tier even when the inverter is hybrid.',
  ],
  sections: [
    {
      id: 'why-pv-rams-different',
      heading: 'Why a Solar PV RAMS Is Different',
      tocLabel: 'Why PV RAMS is different',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A standard "electrical work" Risk Assessment and Method Statement is built around safe isolation, lock-off, and proving dead before work — the discipline that underpins the [safe isolation method statement](/guides/method-statement-safe-isolation). Solar PV breaks one of those assumptions on day one: a photovoltaic module exposed to daylight produces voltage continuously, and that voltage cannot be switched off. The only way to bring a DC string near zero is to physically cover the panels or wait for darkness — neither is a control measure you can sensibly write into a domestic installation plan.',
        },
        {
          type: 'paragraph',
          text:
            'On top of that, every solar PV install combines four hazard families in a single short visit:',
        },
        {
          type: 'list',
          items: [
            'Work at height — almost every install involves a pitched or flat roof, ladder access, ridge or eave proximity, and panel handling at the working position.',
            'Live electrical work — DC strings are live whenever it\'s light; the AC side requires safe isolation at the consumer unit; the DNO supply itself cannot normally be killed by the installer.',
            'Manual handling — modules typically weigh 18–25 kg each, inverters 15–35 kg, and hybrid inverters with battery modules can exceed 50 kg. Roof access multiplies the handling risk.',
            'Environmental — wind speed on a roof, slip from morning dew or moss, sun exposure, and temperatures inside a loft that routinely exceed 40 °C.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'DC isolation does not make the modules safe',
          text:
            'Opening the DC isolator at the inverter end disconnects the inverter from the array — it does not disconnect the panels from each other. The string between the panels and the isolator remains at full open-circuit voltage (typically 350–600 V DC for a domestic string) whenever daylight is on the modules. Treat the DC cabling as live for the duration of the works.',
        },
      ],
    },
    {
      id: 'pv-hazards-controls',
      heading: 'Hazards and Control Measures',
      tocLabel: 'Hazards and controls',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The hazard register below maps the dominant risks on a UK domestic or small-commercial solar PV install to the corresponding control measure. A working RAMS will list each one with a residual-risk score, the responsible person, and the evidence that the control has been applied.',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Falls from height during roof access — eliminate where possible by using a mobile elevated work platform (MEWP), otherwise scaffold with edge protection or a properly anchored fall-arrest harness. Ladder-only access for module handling is rarely defensible under WAHR 2005 Reg 6.',
            'Falling objects — exclusion zone at ground level, panels passed up by hand or by hoist (never thrown), tools tethered or in pouches, debris netting where work is over a public area.',
            'Live DC contact — terminate panel-to-panel connections only when the strings are physically covered or when one end of the string is open at the isolator; use IP-rated MC4 connectors only; never disconnect under load.',
            'AC tie-in to the consumer unit — full safe isolation of the affected ways at the consumer unit, lock-off, proved dead at point of work using a GS38 voltage indicator, and a test before / test after on the proving unit.',
            'Inverter and battery lifting — two-person lift for inverters above ~20 kg, mechanical lift for battery modules, route planned to avoid stairs / awkward angles, anchor points checked before mounting.',
            'Thermal runaway and gas venting from lithium battery storage — battery sited per manufacturer instructions (typically 600 mm clear, non-combustible substrate, ventilation route), smoke / heat detection in the battery room considered, isolation in an accessible position outside the battery enclosure.',
            'Weather — daily wind-speed check (typical stop-work threshold 17 mph for module handling, 23 mph for all roof work), surface inspection for ice / wet moss / lichen before stepping onto tiles, sun-exposure rotation in summer.',
            'Lone working — at least two operatives on the roof during module placement; if a single-operative phase is unavoidable (e.g. inverter commissioning), document the lone-worker check-in interval and emergency contact route.',
          ],
        },
      ],
    },
    {
      id: 'regulatory-framework',
      heading: 'Regulatory and Standards Framework',
      tocLabel: 'Regulations and standards',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A solar PV RAMS that doesn\'t name the right legislation and standards is worth nothing in a post-incident HSE interview. The minimum reference list for a UK install is below — the RAMS narrative should anchor each control measure to one of these.',
        },
        {
          type: 'list',
          items: [
            'BS 7671:2018+A4:2026 Section 712 — Solar Photovoltaic (PV) Power Supply Systems. Sets the technical wiring requirements for PV installations: cable selection, DC isolation, string protection, earthing of the array frame.',
            'BS 7671:2018+A4:2026 EIC item 14.0 — Prosumer Low-Voltage Installation. New under Amendment 4 (effective 2026), the [Prosumer LV section of the EIC](/guides/prosumer-low-voltage-electrical-installation) requires the inspector to certify the export-capable installation, including PV. The RAMS sets the inspection method that produces this evidence.',
            'CDM 2015 Regulation 8 — general duty: every duty holder must have the skills, knowledge, experience and (where relevant) organisational capability. The contractor must be able to evidence this on request.',
            'CDM 2015 Regulation 15 — contractor duties: plan, manage and monitor construction work; provide site induction; cooperate with the principal contractor where one is appointed. The RAMS is one of the primary documents demonstrating Reg 15 compliance — see the [CDM 2015 guide for electricians](/guides/cdm-2015-for-electricians).',
            'Electricity at Work Regulations 1989 Regulation 4 — duty to ensure systems are constructed and maintained so as to prevent danger so far as reasonably practicable.',
            'Electricity at Work Regulations 1989 Regulation 14 — work on or near live conductors. Live work is permitted only where it is unreasonable in all the circumstances to disconnect, and where suitable precautions are taken. The continuous DC voltage on a daylit array is the textbook EAWR Reg 14 scenario.',
            'Work at Height Regulations 2005 — Reg 6 (hierarchy: avoid → prevent → minimise), Reg 7 (selection of work equipment), Reg 8 (specific requirements for guard rails, ladders, MEWPs).',
            'IET Code of Practice for Grid-Connected Solar Photovoltaic Systems (4th Edition) — the industry reference for design, installation, commissioning and handover of PV.',
            'IET Code of Practice for Electrical Energy Storage Systems — required reading where a battery is part of the installation.',
            'MCS standards (MCS 015 installation standard, MIS 3002 product/installation requirements) — required for the customer to claim Smart Export Guarantee payments.',
            'Engineering Recommendation G98 (small-scale) and G99 (above the G98 threshold) — DNO notification or application before energising the export-capable system.',
          ],
        },
      ],
    },
    {
      id: 'g98-g99',
      heading: 'G98 vs G99 — DNO Interaction',
      tocLabel: 'G98 vs G99',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Connecting a PV installation to the grid is not a free action — the Distribution Network Operator has to know about it. The RAMS must reference which Engineering Recommendation applies and what notification step has been completed before the inverter is energised.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'G98 (connect and notify): up to 16 A per phase per microgenerator. Typical domestic single-phase install up to ~3.68 kW falls here. The installer notifies the DNO after commissioning, normally within 28 days.',
            'G98 multi-microgenerator: combinations of generators (e.g. PV + battery hybrid) still under the per-phase 16 A limit can use G98, but the cumulative export must be considered.',
            'G99 (apply and approve): above the G98 threshold, three-phase systems exceeding the per-phase limit, or any installation the DNO requires under their regional guidance. G99 must be applied for and approved before connection — the installer cannot energise on the day.',
            'G99 Type A test: smaller G99 installations (≤ 1 MW) require Type A interface protection settings tested and recorded at commissioning. The RAMS should reference the witness-test procedure.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Anti-islanding is not optional',
          text:
            'Both G98 and G99 require inverters that include anti-islanding protection (loss-of-mains detection). If the grid drops, the inverter must disconnect within the regulator-defined time so it can\'t energise a dead grid that linesmen believe to be safe. The RAMS commissioning section should record the anti-islanding test result, not just "inverter switched on".',
        },
      ],
    },
    {
      id: 'method-statement-structure',
      heading: 'Method Statement Structure',
      tocLabel: 'Method statement structure',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A credible PV method statement reads as a sequence — what happens first, who does it, what evidence is generated, what triggers a stop. It is not a generic "we will work safely" paragraph. The sequence below is the minimum framework; tailor it to the specific site, install size and presence of battery storage.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Pre-arrival: confirm G98 notification or G99 approval reference; confirm roof survey, fixing schedule and structural sign-off; verify deliveries (panels, mounting, inverter, isolators, cabling) match the design.',
            'On-arrival: site induction, customer brief on the working day, exclusion-zone setup at ground level, identification of the main isolator and consumer unit, photograph of existing installation for record.',
            'Scaffold / MEWP inspection: tag check, edge-protection inspection, harness anchor test where used, daily handover documentation.',
            'Roof mounting installation: rails or roof hooks fitted to manufacturer torque, weather-seal under tiles inspected, ridge-line clearances verified.',
            'Panel placement: panels passed up under controlled lift, MC4 connectors mated only when the string is "open" at the isolator end, panel handling within wind-speed limit.',
            'DC cabling: routed through purpose-made cable entries, secured against UV and abrasion, conduits sealed at the building line, polarity verified before energising.',
            'Inverter and DC isolator installation: mounted per manufacturer instructions, ventilation clearances respected, two-person lift recorded.',
            'AC side connection: safe isolation of the AC supply ways, lock-off applied, proved dead per the [safe isolation method](/guides/method-statement-safe-isolation), new AC isolator or RCBO installed per the design, terminations torqued.',
            'Battery (where present): mounted to a non-combustible substrate, manufacturer-specified ventilation observed, DC isolator on the battery side accessible, all gas-vent routes left clear.',
            'Commissioning: insulation resistance test of DC strings (string OC voltage and SC current recorded), AC side energised, inverter started, anti-islanding test recorded, G98 notification (or G99 witness test) completed.',
            'Handover: customer walk-through, isolator location and shut-down procedure explained, [Solar PV Certificate](/solar-pv-certificate) issued, EIC including item 14.0 Prosumer LV completed, MCS documents handed over.',
            'Site clear: scaffold de-tagged, off-cuts removed, customer property check, photographs filed against the job.',
          ],
        },
      ],
    },
    {
      id: 'battery-storage-rams',
      heading: 'Adjacent Battery Storage — Extra RAMS Sections',
      tocLabel: 'Battery storage RAMS',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Where the design includes battery energy storage — increasingly the norm rather than the exception — the RAMS must be expanded to recognise that a lithium battery installation is not "just another piece of electrical kit". The IET Code of Practice for Electrical Energy Storage Systems sets the benchmark and the RAMS should map each of its key requirements onto a control measure.',
        },
        {
          type: 'list',
          items: [
            'Siting: indoor location with minimum manufacturer-specified clearances; non-habitable space preferred; no living-space wall directly behind the battery without thermal-barrier evidence.',
            'Ventilation: route specified by the battery manufacturer; sealed cupboards are normally not permitted for lithium chemistry.',
            'Fire detection: smoke or heat detection considered for the room or enclosure; outcome recorded in the RAMS even if the conclusion is "not required for this product".',
            'Isolation: accessible isolator outside the battery enclosure so first responders can isolate without opening the unit; signage at the consumer unit and the main isolator marking the presence of stored energy.',
            'Manual handling: battery modules typically 25–50 kg each; mechanical lift, two-person handling, and stair-route assessment all documented.',
            'Commissioning: charge and discharge cycle observed, BMS communication verified, alarm states tested.',
            'Customer brief: shutdown sequence (battery first, inverter second, AC last), warning signs that need a call-out, manufacturer support route.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Thermal runaway is a slow-onset emergency',
          text:
            'A lithium battery in thermal runaway gives warning — swelling, hissing, electrolyte odour, rising case temperature — before the event becomes uncontrolled. The customer brief in the RAMS must include "what to look for and what to do" so the homeowner doesn\'t open the enclosure to investigate.',
        },
      ],
    },
    {
      id: 'inspection-certification',
      heading: 'Inspection, Certification and the EIC Item 14.0 Step',
      tocLabel: 'Inspection and certification',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A solar PV install generates documentary outputs that have to line up with the RAMS — if the method statement says "DC insulation resistance recorded at commissioning", the certificate must contain those readings. Under BS 7671:2018+A4:2026 the certification path is:',
        },
        {
          type: 'list',
          items: [
            'Electrical Installation Certificate (EIC) for the new PV circuit, completed against the [BS 7671 A4:2026 EIC model form](/guides/bs-7671-a4-2026-eic-model-form) — including the new item 14.0 Prosumer Low-Voltage Installation tick where the system is export-capable.',
            'Schedule of Test Results capturing insulation resistance of DC strings, polarity, AC side continuity and Zs, RCD test for the AC tie-in.',
            'Solar-specific commissioning record (string open-circuit voltage, short-circuit current, irradiance at time of test, inverter firmware, anti-islanding test).',
            'MCS certification document for the customer\'s Smart Export Guarantee application.',
            'G98 notification confirmation (or G99 approval and witness test record).',
            'Customer handover pack — RAMS, EIC, MCS, manufacturer manuals, shutdown procedure.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Item 14.0 is new under A4:2026',
          text:
            'Before Amendment 4, an export-capable PV install was certified on the same EIC form as any other circuit. From 2026, the EIC has a dedicated Prosumer Low-Voltage Installation line that recognises the installation as a generator as well as a consumer. The RAMS inspection step should reference 14.0 explicitly so the office knows which model form to issue.',
        },
      ],
    },
  ],
  howToSteps: [
    {
      name: 'Open the RAMS Generator and pick the Solar PV template',
      text:
        'Elec-Mate\'s RAMS Generator pre-loads the Section 712, CDM 2015 and WAHR 2005 references for solar PV, plus the standard hazard register. You start from a credible baseline rather than a blank page.',
    },
    {
      name: 'Add the site-specific work-at-height plan',
      text:
        'Specify scaffold, MEWP or harness-and-anchor; record the daily inspection regime; capture the wind-speed stop-work threshold for module handling versus general roof work.',
    },
    {
      name: 'Document DC string isolation and live-work controls',
      text:
        'State that DC strings are treated as live throughout; that MC4 mating happens only with the string open at the isolator; that no live disconnection under load is permitted.',
    },
    {
      name: 'Confirm G98 notification or G99 approval',
      text:
        'Record the DNO reference, the engineering recommendation that applies, and (for G99) the witness-test date. The RAMS cannot end with "energise inverter" if the DNO step is missing.',
    },
    {
      name: 'Add the battery storage section where applicable',
      text:
        'If the design includes battery storage, append the IET CoP for EES checklist — siting, ventilation, isolation, manual handling, customer brief on thermal-runaway warning signs.',
    },
    {
      name: 'Link the RAMS to the EIC and Solar PV Certificate',
      text:
        'Reference the Electrical Installation Certificate (including the new item 14.0 Prosumer LV) and the dedicated Solar PV commissioning record. The customer handover pack should be itemised in the RAMS.',
    },
  ],
  howToHeading: 'How to build a Solar PV RAMS in Elec-Mate',
  howToDescription:
    'Six steps from blank page to signed-off Solar PV RAMS — the same sequence used by the in-app generator.',
  faqs: [
    {
      question: 'Do I really need a RAMS for a small domestic solar PV install?',
      answer:
        'Yes — and treating the job as "too small for paperwork" is one of the easiest ways to fall foul of CDM 2015 and the HSE. Almost every PV install is in scope of CDM because it involves more than one trade (electrician, roofer, scaffolder), and the contractor duties under Reg 15 require the work to be planned, managed and monitored. A written RAMS is the standard evidence that this has been done. It also protects the installer if anything goes wrong after handover.',
    },
    {
      question: 'Can a PV DC string ever be made dead during installation?',
      answer:
        'Only by covering the modules (an opaque cover blocks the photovoltaic effect) or by working in genuine darkness. Opening the DC isolator at the inverter does not de-energise the panels themselves — the cable between the modules and the open isolator remains at full string open-circuit voltage in daylight. The RAMS should therefore treat the DC side as a permanent live source and rely on connector design (MC4) and sequencing (mate only when the string is open at one end) rather than "isolation".',
    },
    {
      question: 'What is the difference between G98 and G99 for solar PV?',
      answer:
        'G98 is the connect-and-notify Engineering Recommendation for small generators — up to 16 A per phase per microgenerator. A typical 3.68 kW single-phase domestic PV array sits under G98 and the DNO can be notified after commissioning. G99 covers anything above the G98 threshold and must be applied for and approved by the DNO before energising. Three-phase installs, larger commercial PV, or systems combined with a battery that push export over the G98 limit will normally be G99. The RAMS should record which one applies and reference the DNO confirmation.',
    },
    {
      question: 'Does the new BS 7671 A4:2026 EIC item 14.0 apply to PV?',
      answer:
        'Yes — item 14.0 "Prosumer Low-Voltage Installation" on the new A4:2026 EIC model form is the tick that certifies an installation as export-capable. Any grid-connected solar PV install (or PV-plus-battery system that exports) needs the inspector to complete item 14.0 in addition to the standard EIC content. The RAMS commissioning step should reference 14.0 explicitly so the certificate generated matches the work done.',
    },
    {
      question: 'How does battery storage change the RAMS?',
      answer:
        'A battery adds a separate hazard tier. Manual handling rises sharply (battery modules are heavy and awkward), there is a thermal-runaway risk that has no equivalent on a panels-only install, the battery must be sited and ventilated per the manufacturer and the IET Code of Practice for Electrical Energy Storage Systems, and the customer needs a clear brief on shutdown sequence and warning signs. The RAMS gains a dedicated battery section that mirrors the CoP for EES checklist rather than just adding a line to the PV section.',
    },
    {
      question: 'Can Elec-Mate generate the RAMS automatically?',
      answer:
        'The Elec-Mate RAMS Generator produces a UK-compliant Solar PV method statement with the Section 712, EIC item 14.0, CDM 2015 and Work at Height Regulations references in place, the hazard register pre-populated, and the document linked to the Solar PV Certificate so the same job stays consistent end-to-end. You edit the site-specific details, sign off the document, and hand it over to the customer with the rest of the install pack.',
    },
    {
      question: 'Who signs the RAMS off?',
      answer:
        'The principal contractor (or the contractor on smaller jobs where one is not appointed) is responsible under CDM 2015 Reg 15 for the RAMS being suitable. The competent person who carries out the work signs to confirm they have read it, understood it and will follow the method. On larger commercial sites a client representative or principal designer may also countersign. The RAMS should record the names, roles and dates so the audit trail is complete.',
    },
  ],
  relatedPages: [
    {
      href: '/tools/rams-generator',
      title: 'RAMS Generator',
      description:
        'Build a UK-compliant Risk Assessment and Method Statement for solar PV (or any electrical job) with templates aligned to CDM 2015 and BS 7671.',
      icon: 'FileText',
      category: 'Tool',
    },
    {
      href: '/tools/solar-pv-certificate',
      title: 'Solar PV Certificate',
      description:
        'Digital solar PV commissioning and handover document — string test results, inverter detail, anti-islanding record, customer pack.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/guides/electrical-rams-template-uk',
      title: 'Electrical RAMS Template (UK)',
      description:
        'The general-purpose UK electrical RAMS template — what every Risk Assessment and Method Statement must contain.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/prosumer-low-voltage-electrical-installation',
      title: 'Prosumer Low-Voltage Installation (EIC item 14.0)',
      description:
        'The new BS 7671:2018+A4:2026 EIC line for export-capable installations including solar PV and battery storage.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/working-at-height-electricians',
      title: 'Working at Height for Electricians',
      description:
        'Work at Height Regulations 2005 explained for electrical work — hierarchy of control, equipment selection, daily inspection regime.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/method-statement-safe-isolation',
      title: 'Safe Isolation Method Statement',
      description:
        'The companion document for the AC side of a PV install — full safe isolation procedure with GS38 proving, lock-off and test sequence.',
      icon: 'CheckCircle2',
      category: 'Guide',
    },
    {
      href: '/guides/cdm-2015-for-electricians',
      title: 'CDM 2015 for Electricians',
      description:
        'How the Construction (Design and Management) Regulations 2015 apply to electrical contractors — duties under Reg 8 and Reg 15.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-eic-model-form',
      title: 'BS 7671 A4:2026 EIC Model Form',
      description:
        'The new EIC model form under Amendment 4 — including item 14.0 Prosumer LV and the updated schedule columns.',
      icon: 'FileText',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Speed up your Solar PV RAMS — pre-built UK templates',
  ctaSubheading:
    'Elec-Mate\'s RAMS Generator drops a Section 712-aligned solar PV method statement onto the job in minutes — full hazard register, work-at-height controls, G98/G99 step, battery-storage section where you need it, and a direct link to the Solar PV Certificate so the install pack stays consistent end-to-end. 7-day free trial, cancel anytime.',
};
