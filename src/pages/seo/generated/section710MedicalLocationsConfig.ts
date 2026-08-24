import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 Section 710 (printed text), with IET Guidance
// Note 3 (Inspection & Testing, 9th Edition) used only where cited.
// Every regulation number below was read from the printed A4:2026 text.

const published = '2026-05-17';
const modified = '2026-08-07';

export const section710MedicalLocationsConfig: GeneratedGuideConfig = {
  pagePath: '/guides/bs-7671-section-710-medical-locations',
  title: 'Section 710 Medical Locations: Groups 0, 1 & 2',
  description:
    'Every medical location is group 0, 1 or 2 (Reg 710.3). AFDDs are prohibited in all three, RCDs required on group 1 final circuits ≤32 A, bonding ≤0.2 Ω.',
  datePublished: published,
  dateModified: modified,
  readingTime: 15,
  badge: 'BS 7671 Section 710',
  badgeIcon: 'ShieldCheck',
  breadcrumbLabel: 'Section 710 Medical Locations',
  heroPrefix: 'BS 7671',
  heroHighlight: 'Section 710',
  heroSuffix: 'Medical Locations',
  heroSubtitle:
    'Electrical installation requirements for hospitals, private clinics, medical and dental practices and healthcare centres. Covers group 0/1/2 classification, medical IT systems, the AFDD prohibition, RCD rules and the reduced SELV/PELV limits in BS 7671:2018+A4:2026.',
  answerBox: {
    question: 'Does BS 7671 apply to medical locations?',
    answer:
      'Yes. Section 710 of BS 7671:2018+A4:2026 sets particular requirements for patient healthcare facilities — hospitals, private clinics, medical and dental practices, healthcare centres and dedicated medical rooms in the workplace. Those requirements supplement or modify the general requirements elsewhere in BS 7671. Every location is first classified as group 0, 1 or 2 under Regulation 710.3.',
  },
  keyTakeaways: [
    'Section 710 classifies every medical location as group 0, 1 or 2 (Regulation 710.3). The group is set by the medical procedures that will take place there, and every protective decision follows from it.',
    'AFDDs shall not be used in circuits in medical locations of group 0, 1 and 2 (Regulation 710.421.1.7) — the prohibition covers all three groups, not just 0 and 2 — nor in any circuit supplied by a medical IT system (Regulation 710.421.1.7.101).',
    'Additional protection by RCD is required in all final circuits of group 1 medical locations with a rated current not exceeding 32 A, and in all final circuits of group 2 (Regulation 710.411.4.205). Type AC RCDs shall not be used in group 1 or group 2 (Regulation 710.531.3.3.101).',
    'An RCD shall not be used for additional protection in final circuits supplied by a medical IT system (Regulation 710.415.1).',
    'A medical IT system is required in group 2 locations for final circuits of ME equipment and ME systems intended for life support and surgical applications within the patient environment (Regulation 710.411.6.1.101), and shall be monitored by a MED-IMD (Regulation 710.538.1.101).',
    'Total leakage current of the medical IT transformer plus all connected final circuits, without load, shall not exceed 10 mA (Regulation 710.411.6.1.101). The transformer itself is limited to 0.5 mA in no-load condition (Regulation 710.555.201(a)).',
    'SELV/PELV current-using equipment in group 1 and group 2 locations is limited to 25 V AC RMS or 60 V ripple-free DC (Regulation 710.414.1.101). FELV shall not be used as a protective measure at all (Regulation 710.411.7).',
    'A supplementary protective equipotential bonding system shall be installed in every group 1 and group 2 medical location (Regulation 710.415.2.101), and the resistance between simultaneously accessible parts shall not exceed 0.2 Ω (Regulation 710.415.2.102).',
    'Group 2 distribution boards need full overcurrent selectivity: a short-circuit on a final circuit shall not interrupt the incoming circuits of the upstream board (Regulation 710.535.1.101).',
  ],
  sections: [
    {
      id: 'medical-location-groups',
      heading: 'Medical Location Groups 0, 1 and 2',
      tocLabel: 'Medical location groups',
      blocks: [
        {
          type: 'paragraph',
          text: 'Section 710 of BS 7671:2018+A4:2026 applies to patient healthcare facilities such as hospitals, private clinics, medical and dental practices, healthcare centres and dedicated medical rooms in the workplace, and to installations in locations designed for medical research on patients (Regulation 710.1). It sits in Part 7, so its particular requirements supplement or modify the general requirements elsewhere in BS 7671 (Section 700) — they do not simply sit on top of them. The requirements do not apply to the medical electrical (ME) equipment itself; for that, see the BS EN 60601 series.',
        },
        {
          type: 'paragraph',
          text: 'Two risks drive the whole section: patients have reduced body resistance because the skin is often cut or broken, and a failure of supply threatens life-supporting equipment. Locations are classified into three groups, defined in Part 2:',
        },
        {
          type: 'list',
          tone: 'info',
          items: [
            'Group 0 — a medical location where ME equipment or ME systems are not intended to be applied, and where discontinuity of the supply does not represent a risk to patient safety.',
            'Group 1 — a medical location where ME equipment or ME systems are intended to be used externally or invasively on any part of the patient, and where discontinuity of the supply does not represent a risk to patient safety.',
            'Group 2 — a medical location where ME equipment or ME systems are intended to be applied for treatment or diagnosis and where discontinuity of the supply does represent a risk to patient safety. Operating theatres are the clearest example; Section 710 refers to a typical theatre layout in Figure 710.2.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'The group is set by the procedures, not by the room name',
          text: 'Regulation 710.3 requires the relevant medical staff to indicate which medical procedures will take place in the location; the classification is then determined from that intended use. Annex A710 (Table A710) gives examples of group allocation, but it is informative and explicitly a guide only — the note to Annex A710 states that the requirements of Regulation 710.3 cannot be satisfied by using the table alone. Where a location is used for different procedures, the higher group classification should be applied.',
        },
        {
          type: 'paragraph',
          text: 'Several general protective measures are simply off the table in medical locations, whatever the group:',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Obstacles and placing out of reach (Section 417) shall not be used — Regulation 710.410.3.5.',
            'Non-conducting location (Regulation 418.1), earth-free local equipotential bonding (Regulation 418.2) and electrical separation for more than one item of current-using equipment (Regulation 418.3) shall not be used — Regulation 710.410.3.6.',
            'FELV shall not be used as a method of protection against electric shock, irrespective of voltage — Regulation 710.411.7.',
            'PEN conductors shall not be used in medical locations and medical buildings downstream of the main distribution board — Regulation 710.312.2.',
            'Final circuits for ME equipment and ME systems shall be for the exclusive use of that equipment — Regulation 710.314.101.',
          ],
        },
      ],
    },
    {
      id: 'medical-it-systems',
      heading: 'Medical IT Systems',
      tocLabel: 'Medical IT systems',
      blocks: [
        {
          type: 'paragraph',
          text: 'A medical IT system is an IT electrical system meeting the specific requirements for medical applications — an isolated supply in which a first insulation fault does not automatically disconnect the circuit. Regulation 710.411.6.1.101 requires one in group 2 medical locations for the final circuits of ME equipment and ME systems intended for life support and surgical applications within the patient environment. At least one medical IT system shall be provided for each group of rooms serving the same function (Regulation 710.411.6.3.101.1).',
        },
        {
          type: 'paragraph',
          text: 'Not everything in a group 2 room belongs on it. ME equipment and ME systems not intended to be connected to a medical IT system shall be connected to dedicated final circuits as specified by the manufacturer — Regulation 710.411.6.1.101 gives equipment rated above 5 kVA, X-ray equipment and the supply of movements of fixed operating tables as examples.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'No RCD on a medical IT final circuit',
          text: 'Regulation 710.415.1 states that additional protection by means of an RCD shall not be used in final circuits supplied by a medical IT system. That is a "shall not" — an absolute prohibition. The NOTE to Regulation 710.411.4.205 says the same thing in advisory language ("should not be provided") and cross-refers to 710.415.1. An RCD would defeat the point of the system: it would disconnect on a first fault, during a procedure.',
        },
        {
          type: 'list',
          items: [
            'Each medical IT transformer shall be equipped with a medical insulation monitoring device (MED-IMD) to Annexes A and B of BS EN 61557-8 (Regulations 710.411.6.3.101.1 and 710.538.1.101), installed in the medical IT system distribution board.',
            'The alarm system shall have a green lamp for normal operation, a non-cancellable yellow lamp and a silenceable audible alarm at the minimum set insulation resistance, and shall sound at the staff base and in the vicinity of the equipment. User instruction notices explaining each signal and the first-fault procedure shall be provided in the location.',
            'Where a medical IT system serves more than one room or more than one patient place of treatment, an insulation fault location system to BS EN 61557-9 shall be installed in addition to the IMD (Regulation 710.411.6.3.3). The transformer shall also have overload and over-temperature monitoring (Regulation 710.411.6.3.2).',
            'With all final circuits connected and without load, the total leakage current of the medical IT transformer plus all connected final circuits shall not exceed 10 mA (Regulation 710.411.6.1.101). Separately, the transformer output winding and enclosure leakage in no-load condition shall not exceed 0.5 mA (Regulation 710.555.201(a)).',
            'Transformers shall conform to BS EN 61558-2-15, be single-phase, and be rated not less than 0.5 kVA and not more than 10 kVA; where several are needed in one room they shall not be paralleled, and three-phase loads need a separate three-phase transformer (Regulation 710.555.201).',
            'The live conductors of medical IT final circuits shall be identified by the colour brown and distinguished by the alphanumeric markings L1 and L2 (Regulation 710.514.3.201).',
            'On the primary side, an overcurrent protective device shall be used for fault current protection only; overload protection shall not be installed in the secondary circuit; and each single-phase final circuit shall have a double-pole circuit-breaker (Regulation 710.531.2.2.3.101).',
            'It is recommended that a final circuit connected to the medical IT distribution board is limited to 25 m, and the transformer should be within 30 m of the equipment or socket-outlets it serves (NOTE 5 to Regulation 710.411.6.1.101 and NOTE 1 to Regulation 710.512.1.101).',
            'Socket-outlets on a medical IT system at a patient place of treatment shall be individually protected or supplied by a minimum of two final circuits, and those intended to supply ME equipment shall conform to BS 1363-2, be unswitched, be identified blue and be permanently marked "Medical Equipment Only" (Regulation 710.55.101.1).',
          ],
        },
      ],
    },
    {
      id: 'afdd-prohibition',
      heading: 'AFDDs Are Prohibited in Medical Locations',
      tocLabel: 'AFDD prohibition',
      blocks: [
        {
          type: 'paragraph',
          text: 'This is the item most often got wrong. The prohibition covers every group, not just group 0 and group 2:',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Regulation 710.421.1.7 — AFDDs shall not be used in circuits in medical locations of group 0, 1 and 2. Because every medical location is classified into one of those three groups, an AFDD has no place in any circuit within a medical location.',
            'Regulation 710.421.1.7.101 — AFDDs shall not be used in circuits supplied by IT systems specified as medical IT systems in Regulation 710.411.6. This applies to the circuit wherever it runs, regardless of the group of the room it serves.',
            'The prohibition attaches to the circuit, not to the board. An AFDD upstream of a medical location circuit is still an AFDD in that circuit.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'The general AFDD rules do not create an exception here',
          text: 'Regulation 421.1.7 requires AFDDs on socket-outlet final circuits not exceeding 32 A in Higher Risk Residential Buildings, HMOs, purpose-built student accommodation and care homes, and recommends them elsewhere. Section 710 overrides that inside a medical location: 710.421.1.7 is a "shall not". Where a care home contains medical locations of group 0, 1 or 2, the medical location circuits are excluded from the AFDD requirement. If an AFDD is found on such a circuit during inspection it should be recorded as a departure and removed, with the change noted on the circuit documentation and the client informed.',
        },
      ],
    },
    {
      id: 'rcd-requirements',
      heading: 'RCD Protection — Which Circuits, Which Type',
      tocLabel: 'RCD requirements',
      blocks: [
        {
          type: 'paragraph',
          text: 'Regulation 710.411.4.205 requires additional protection by RCDs having the characteristics specified in Regulation 415.1.1 in all final circuits in medical locations of (a) group 1 with rated current not exceeding 32 A, and (b) group 2. Note that sub-clause (a) is about the group of the location, not the classification of the equipment. Where the regulation does not require an RCD, one is not precluded.',
        },
        {
          type: 'list',
          items: [
            'Group 0 — no RCD required by Regulation 710.411.4.205; additional protection by RCD is not precluded on other circuits.',
            'Group 1 — required in all final circuits with a rated current not exceeding 32 A. A circuit rated above 32 A is not captured by sub-clause (a).',
            'Group 2 — required in all final circuits, with no current threshold.',
            'Any group, supplied by a medical IT system — an RCD shall not be used for additional protection (Regulation 710.415.1).',
            'RCDs of Type AC shall not be used in medical locations of group 1 and group 2 (Regulation 710.531.3.3.101). Residual current monitors of Type AC shall not be used either (Regulation 710.538.4.201).',
            'In a TT system, RCDs shall be used as protective devices in group 1 and group 2 medical locations, except for circuits of a medical IT system (Regulation 710.411.5.201). The formula in Regulation 411.5.3(b) is modified so that RA × IΔn shall not exceed 25 V AC or 60 V DC (Regulation 710.411.5.3).',
          ],
        },
        {
          type: 'paragraph',
          text: 'Regulation 710.531.3.3.101 also requires consideration to be given to limiting the number of socket-outlets on one final circuit, to reduce unwanted tripping when several items of equipment are used at once — a practical point that shapes circuit counts at bedheads and in treatment rooms.',
        },
      ],
    },
    {
      id: 'selv-pelv-voltage-limits',
      heading: 'Reduced SELV and PELV Limits',
      tocLabel: 'SELV/PELV voltage',
      blocks: [
        {
          type: 'callout',
          tone: 'default',
          title: '25 V AC RMS or 60 V ripple-free DC',
          text: 'Where SELV and/or PELV circuits are used in medical locations of group 1 and group 2, the nominal voltage applied to current-using equipment shall not exceed 25 V AC RMS or 60 V ripple-free DC (Regulation 710.414.1.101). Protection by basic insulation of live parts (Regulation 416.1) or by barriers or enclosures (Regulation 416.2) shall still be provided.',
        },
        {
          type: 'list',
          items: [
            'A source described in Regulation 414.3(d) shall not be used for SELV or PELV in group 1 or group 2 locations (Regulation 710.414.3).',
            'In group 2 locations using PELV, exposed-conductive-parts of equipment — operating theatre luminaires, for example — shall be connected to the circuit protective conductor (Regulation 710.414.4.1).',
            'In group 1 and group 2 locations using PELV, exposed-conductive-parts shall also be connected to the equipotential bonding busbar by supplementary protective equipotential bonding conductors (Regulation 710.415.2.201).',
            'FELV shall not be used as a method of protection against electric shock in medical locations, irrespective of the voltage value (Regulation 710.411.7).',
          ],
        },
        {
          type: 'paragraph',
          text: 'The 25 V AC / 60 V DC pair recurs across the section, but through different regulations. Regulations 710.419.2 and 710.419.3 modify the voltages given in Regulations 419.2 and 419.3 to 25 V AC and 60 V DC for group 1 and group 2 locations; Regulation 710.414.1.101 sets the SELV/PELV equipment limit. They are separate requirements that happen to share a number.',
        },
      ],
    },
    {
      id: 'supplementary-bonding',
      heading: 'Supplementary Protective Equipotential Bonding',
      tocLabel: 'Supplementary bonding',
      blocks: [
        {
          type: 'paragraph',
          text: 'Supplementary bonding is not a fallback in medical locations — it is a standing requirement. Regulation 710.415.2.101 states that in each medical location of group 1 and group 2 a supplementary protective equipotential bonding system shall be installed, with the bonding conductors connected to the equipotential bonding busbar (EBB) to equalise potential differences between parts within the patient environment.',
        },
        {
          type: 'list',
          tone: 'info',
          items: [
            'Parts to be connected: protective conductors; extraneous-conductive-parts, unless intended to be isolated from earth; screens against electromagnetic, electrostatic and interference fields; conductive floor grids, mesh and tapes; metal screens of isolating transformers and cable shields; and any supplementary equipotential bonding connection points. Parts intended to be isolated from earth shall not be connected.',
            'The resistance between simultaneously accessible exposed-conductive-parts (including socket-outlet and fixed-equipment protective conductor terminals), extraneous-conductive-parts and the bonding points shall meet Regulation 710.415.2.2 and shall not exceed 0.2 Ω (Regulation 710.415.2.102). The 0.2 Ω figure is based on a 25 A Type B circuit-breaker to BS EN 60898-1; other ratings may require a lower value.',
            'Regulation 710.415.2.2 modifies the formulae in Regulation 415.2.2 so that the resistance limit is derived from 25 V in AC systems and 60 V in DC systems, in place of the usual 50 V.',
            'The EBB shall be within or near the medical location it serves, readily accessible, in a suitable enclosure and not in a ceiling void. Its connection to the system earthing shall have a cross-sectional area at least equal to the largest conductor connected to it, and connections shall be accessible, clearly labelled and individually disconnectable (Regulation 710.415.2.103).',
            'Supplementary equipotential bonding connection points shall be available in group 2 locations and may be provided in group 1. The number is determined by the designer with those responsible for ME equipment use, and recorded in the information required by Regulation 710.514.9.101.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Where automatic disconnection cannot be achieved',
          text: 'Regulation 710.419.201 states that in group 1 and group 2 medical locations where automatic disconnection of supply cannot be achieved, the conventional touch voltage limit Uc for IT, TN and TT systems shall not exceed 25 V AC or 60 V DC — and that a supplementary protective equipotential bonding system according to Regulations 710.415.2 and 710.419.3 is deemed to meet this requirement. Because 710.415.2.101 already requires that bonding system in every group 1 and group 2 location, the practical question is whether it has been measured and recorded, not whether it exists.',
        },
        {
          type: 'paragraph',
          text: 'Recording is a specific Section 710 duty. Regulation 710.514.9.101(g) requires the information provided to the user to include a record schedule and test data for the supplementary protective equipotential bonding system — the connected items, the cross-sectional area of the conductors and the end-to-end resistance measurement — based on the example in Annex B710. The inclusion of that Schedule of Test Results is one of the changes A4:2026 made to Section 710. IET Guidance Note 3 likewise states that in group 1 and group 2 medical locations the values of the supplementary bonding conductors need to be measured and recorded, allowing for additional resistance at terminations.',
        },
      ],
    },
    {
      id: 'overcurrent-selectivity',
      heading: 'Overcurrent Selectivity for Group 2 Locations',
      tocLabel: 'Overcurrent selectivity',
      blocks: [
        {
          type: 'paragraph',
          text: 'Regulation 710.535.1.101 applies specifically to group 2 medical locations: in order to comply with the requirements for continuous supply, selectivity shall be required for any prospective overcurrent, and in the case of a short-circuit in a final circuit the incoming circuits of the upstream distribution board shall not be interrupted.',
        },
        {
          type: 'list',
          items: [
            'Distribution board design must demonstrate full discrimination — the final-circuit device operates before the upstream incomer.',
            'That means co-ordinating time-current characteristics between the final-circuit protective devices and the upstream incoming devices, using the manufacturer’s co-ordination tables.',
            'Record the evidence: co-ordination tables or documented time-current curve analysis showing the incoming circuits stay energised during a downstream short-circuit.',
            'A failure to achieve selectivity in a group 2 location is a non-compliance — one final-circuit fault could drop supply to several life-support circuits at once.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Regulation 710.51.1.101.1 tightens up where those boards go. Boards supplying final circuits of group 2 medical locations shall be clearly labelled, readily accessible for maintenance with local infection prevention and control in mind, on the same building level and within the same fire compartment as the locations they supply, and immediately adjacent or as close as practicable to the group 2 location served. They shall not be located within stairwells or lift lobbies, or accessed directly off them. Regulation 710.512.1.101 imposes comparable rules on medical IT transformers, including final circuit wiring with a minimum survival duration of 60 minutes.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Selectivity has to be designed in',
          text: 'Retrofitting discrimination — swapping devices, adding current-limiting fuses, redesigning boards — is far more disruptive in a working theatre suite than getting it right at design stage. Check the manufacturer’s co-ordination tables while the board schedule is still on paper, and keep the evidence for verification.',
        },
      ],
    },
    {
      id: 'safety-services',
      heading: 'Safety Services and Changeover Times',
      tocLabel: 'Safety services',
      blocks: [
        {
          type: 'paragraph',
          text: 'Regulation 710.560.4.1 classifies electrical sources for safety services for medical locations by how quickly they become available. Where sources of differing classification are provided, the classification giving the highest security of supply shall be met.',
        },
        {
          type: 'list',
          tone: 'info',
          items: [
            'Class A — no-break: an automatic supply system providing a continuous supply within specified conditions during the period of transition.',
            'Class C — short break: an automatic supply system available within 0.5 s.',
            'Class E — medium break: an automatic supply system available within 15 s.',
            'Class F — long break: an automatic supply system available in more than 15 s.',
          ],
        },
        {
          type: 'list',
          items: [
            'A short-break or no-break supply, with a monitoring threshold of 85 % of nominal voltage at the relevant distribution board, is required for operating theatre table luminaires, ME equipment containing light sources or equipment essential to the procedure, and critical life-supporting ME equipment; changeover shall not exceed 0.5 s (Regulation 710.560.6.103.1).',
            'Other ME equipment and systems shall be connected automatically within 15 s to a source able to maintain the connection for at least 24 h, triggered when a line conductor drops below 85 % of nominal voltage for more than 3 s (Regulation 710.560.6.103.2). Outside hospitals and establishments with overnight or sleeping accommodation, that 24 h may be reduced to a minimum of three hours if justified and documented.',
            'In group 2 rooms, a minimum of 90 % of luminaires shall be supplied from the electrical source for safety services; in group 1 rooms, at least one luminaire per room. The changeover period for safety lighting shall not exceed 15 s (Regulation 710.560.9.101).',
            'Group 1 and group 2 locations shall have a minimum of two lighting circuits from at least two different sources of supply, at least one supplied from an electrical source for safety services (Regulation 710.559.101).',
            'Group 2 locations shall be protected against total loss of power by two independent supplies in accordance with BS 8519 plus a UPS, sited for fire separation (Regulation 710.313.1.102). This requirement for independent supplies is one of the A4:2026 changes to Section 710.',
            'Automatic transfer or changeover equipment shall conform to BS EN 60947-6-1, be wired in an inherently short-circuit and earth-fault free manner between the switch and the subsequent protective device, maintain safe separation between supply lines, and be provided with a bypass switching arrangement for maintenance (Regulation 710.536.101).',
            'Primary batteries shall not be used as an electrical source for safety services, and the readiness of the source shall be monitored and indicated at a suitable location (Regulations 710.560.6.1.101 and 710.560.6.1.102).',
          ],
        },
        {
          type: 'paragraph',
          text: 'Regulation 710.512.2.101 adds a siting rule worth remembering on survey: electrical equipment such as socket-outlets and switches installed below any medical-gas outlet for oxidising or flammable gases shall be at least 0.2 m from the outlet, centre to centre.',
        },
      ],
    },
    {
      id: 'inspection-and-testing',
      heading: 'Inspection, Testing and Documentation',
      tocLabel: 'Inspection and testing',
      blocks: [
        {
          type: 'paragraph',
          text: 'Regulation 710.643.1.201 requires the dates and results of each verification to be recorded, and sets tests that are carried out in addition to the requirements of Chapter 64 — both before commissioning and after alteration or repairs, before re-commissioning. Two of the listed items are:',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Complete functional tests of the insulation monitoring devices associated with the medical IT system, covering insulation failure, transformer high temperature, overload and discontinuity, together with the audible and/or visual alarms linked to them (Regulation 710.643.1.201(a)).',
            'Measurements of leakage current as specified by Regulations 710.411.6 and 710.555.201(a) — that is, the 10 mA total for the transformer plus all connected final circuits without load, and the 0.5 mA no-load transformer figure (Regulation 710.643.1.201(b)).',
          ],
        },
        {
          type: 'paragraph',
          text: 'On top of those, a Section 710 inspection is checking things a standard EICR schedule does not prompt for:',
        },
        {
          type: 'list',
          items: [
            'Supplementary protective equipotential bonding present in every group 1 and group 2 location, with end-to-end resistance measured, not more than 0.2 Ω, and recorded per Regulation 710.514.9.101(g) using the Annex B710 example.',
            'No RCDs on final circuits supplied by a medical IT system, and no Type AC RCDs or Type AC residual current monitors in group 1 or group 2 locations.',
            'No AFDDs in circuits in any medical location of group 0, 1 or 2, or in any circuit supplied by a medical IT system.',
            'L1/L2 alphanumeric markings, with brown insulation, on medical IT final circuit live conductors.',
            'Medical IT socket-outlets at patient places of treatment: unswitched, blue, marked "Medical Equipment Only", and either individually protected or fed from at least two final circuits.',
            'Overcurrent selectivity evidence for group 2 distribution boards — confirmation that a final-circuit short-circuit does not interrupt the incoming circuits.',
            'Documentation under Regulation 710.514.9.101: overview and block diagrams, control schematics, the functional description of the safety services supply, the bonding layout and EBB detail, and the assessment of how many bonding connection points each location needs. Regulation 710.514.9.102 adds the operating instructions, the logbook of tests and inspections, and written procedures for emergency switching and isolation.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Medical locations need specialist references',
          text: 'IET Guidance Note 3 lists medical locations as an installation type requiring specialist knowledge and directs the reader to the IET Guide to Electrical Installations in Medical Locations, IET Guidance Note 7 (Special Locations) and the relevant Health Technical Memoranda. BS 7671 itself points to HTM 06-01 and HTM 06-02 in the notes to Regulation 710.1, and to BS EN 62353 for the inspection and testing of ME equipment (Regulation 710.6). Guidance Note 3 also notes that where continuity of supply has health implications, isolation for testing needs planning well in advance — inspection windows in a live hospital are negotiated, not assumed.',
        },
      ],
    },
  ],
  howToSteps: [
    {
      name: 'Classify the medical location group',
      text: 'Before any design decision, get the relevant medical staff to indicate which procedures will take place in each location, and determine the group (0, 1 or 2) from that intended use per Regulation 710.3. Use Annex A710 as a guide only. Where a location is used for different procedures, apply the higher classification. Document the outcome — every later decision depends on it.',
    },
    {
      name: 'Identify circuits supplied by a medical IT system',
      text: 'Trace every final circuit in a group 2 location to establish whether it is supplied from a medical IT system or from a TN/TT system. Medical IT circuits carry their own rules: no RCD for additional protection (710.415.1), no AFDD (710.421.1.7.101), brown insulation with L1/L2 marking, double-pole breakers, and no overload protection in the transformer secondary.',
    },
    {
      name: 'Apply the RCD rules by group',
      text: 'Group 1: additional protection by RCD in all final circuits rated not more than 32 A. Group 2: all final circuits. Use RCDs with the characteristics of Regulation 415.1.1, and not Type AC in group 1 or group 2. Leave RCDs off medical IT final circuits entirely. Record the reasoning on the circuit schedule.',
    },
    {
      name: 'Leave AFDDs out of the medical locations',
      text: 'Regulation 710.421.1.7 prohibits AFDDs in circuits in medical locations of group 0, 1 and 2, and 710.421.1.7.101 prohibits them in circuits supplied by a medical IT system. Where the wider premises trigger the general AFDD requirement of Regulation 421.1.7 — a care home, for instance — keep the medical location circuits out of that scope and note why.',
    },
    {
      name: 'Apply the reduced SELV/PELV limits',
      text: 'In group 1 or group 2 locations, SELV/PELV current-using equipment is limited to 25 V AC RMS or 60 V ripple-free DC (Regulation 710.414.1.101). Check equipment ratings against that limit before specifying, and remember that basic insulation or barriers/enclosures are still required.',
    },
    {
      name: 'Design, install and measure the supplementary bonding',
      text: 'Every group 1 and group 2 location needs a supplementary protective equipotential bonding system connected to its EBB (Regulation 710.415.2.101). Site the EBB in or near the location, accessible and out of ceiling voids. Measure end-to-end resistance, confirm it does not exceed 0.2 Ω, and record it on the Schedule of Test Results per Regulation 710.514.9.101(g) using the Annex B710 example.',
    },
    {
      name: 'Prove selectivity on group 2 boards',
      text: "For every distribution board supplying group 2 circuits, confirm full discrimination between final-circuit devices and the upstream incoming device (Regulation 710.535.1.101). Use the manufacturer's co-ordination tables or time-current curves to show a final-circuit short-circuit will not operate the incomer, and file the analysis in the O&M pack.",
    },
    {
      name: 'Verify the medical IT system before handover',
      text: 'Run the complete IMD functional test — insulation failure, transformer over-temperature, overload, discontinuity and the linked alarms. Measure total leakage of the transformer plus all final circuits with no load: above 10 mA and the installation does not comply with Regulation 710.411.6.1.101, so find the offending circuit and remediate before sign-off. Record dates and results (Regulation 710.643.1.201).',
    },
  ],
  howToHeading: 'How to apply Section 710 on a real medical project',
  howToDescription:
    'Practical sequence for an electrician or designer working on a hospital, clinic, dental practice or healthcare centre installation.',
  faqs: [
    {
      question: 'What is the difference between a group 1 and a group 2 medical location?',
      answer:
        'Both are locations where ME equipment or ME systems are applied to the patient. The dividing line is what happens when the supply fails. In a group 1 location, ME equipment is intended to be used externally or invasively on any part of the patient but discontinuity of the supply does not represent a risk to patient safety. In a group 2 location, discontinuity of the supply does represent a risk to patient safety. That single difference drives the medical IT system requirement, the RCD threshold, the selectivity requirement and the safety-services changeover times. The classification is determined under Regulation 710.3 from the procedures the medical staff say will take place there, and it must be documented before design begins.',
    },
    {
      question: 'Can I install an AFDD on a circuit in a dental surgery?',
      answer:
        'Not if the circuit is in a medical location. Regulation 710.421.1.7 states that AFDDs shall not be used in circuits in medical locations of group 0, 1 and 2 — all three groups, so the prohibition covers every medical location, whatever its classification. Regulation 710.421.1.7.101 separately prohibits AFDDs in any circuit supplied by a medical IT system. Circuits elsewhere in the building that are not in a medical location — the office, the staff kitchen, the plant room — are outside Section 710 and follow the general rules in Regulation 421.1.7.',
    },
    {
      question: 'Why are RCDs prohibited on medical IT system final circuits?',
      answer:
        'A medical IT system exists so that a first insulation fault does not automatically disconnect the circuit, keeping critical equipment supplied. An RCD would defeat that: it would trip on the first fault, cutting supply to life-support or surgical equipment mid-procedure. Regulation 710.415.1 therefore states that additional protection by means of an RCD shall not be used in final circuits supplied by a medical IT system. The safety function is provided instead by a MED-IMD to BS EN 61557-8, which continuously monitors insulation and raises a yellow lamp and audible alarm at the staff base and in the vicinity, so the fault can be cleared at a planned shutdown.',
    },
    {
      question: 'What SELV voltage can I apply in an operating theatre?',
      answer:
        'An operating theatre is a group 2 medical location, so Regulation 710.414.1.101 applies: where SELV and/or PELV circuits are used in group 1 and group 2 medical locations, the nominal voltage applied to current-using equipment shall not exceed 25 V AC RMS or 60 V ripple-free DC. Protection by basic insulation of live parts, or by barriers or enclosures, is still required. Where PELV is used in a group 2 location, exposed-conductive-parts such as theatre luminaires shall be connected to the circuit protective conductor (Regulation 710.414.4.1) and to the EBB by supplementary bonding conductors (Regulation 710.415.2.201).',
    },
    {
      question: 'How quickly must the standby supply take over in a hospital?',
      answer:
        'It depends on the load. Operating theatre table luminaires, ME equipment containing light sources or equipment essential to the procedure, and critical life-supporting ME equipment need a short-break or no-break supply connected automatically within 0.5 s (Regulation 710.560.6.103.1). Other ME equipment and systems shall be connected automatically within 15 s to a source able to hold the load for at least 24 h (Regulation 710.560.6.103.2). Safety lighting changeover shall not exceed 15 s, with at least 90 % of luminaires in a group 2 room supplied from the safety-services source (Regulation 710.560.9.101).',
    },
    {
      question: 'Do veterinary practices count as medical locations?',
      answer:
        'Not automatically. The scope in Regulation 710.1 is patient healthcare facilities — hospitals, private clinics, medical and dental practices, healthcare centres and dedicated medical rooms in the workplace. NOTE 3 to that regulation then says that, where applicable, the requirements of the section can also be used in veterinary clinics and care homes with medical locations of group 0, 1 or 2. That is permissive rather than mandatory. It is worth noting that BS 7671 defines a patient as a living being, person or animal, undergoing a medical, surgical or dental procedure, so applying Section 710 to a veterinary theatre is a defensible design decision — but it is a decision to record, not an automatic scope call.',
    },
    {
      question: 'What is Annex A710 — can I rely on it for group classification?',
      answer:
        'Annex A710 is informative. It gives Table A710, a list of example medical locations with suggested group numbers and safety-service classifications. The annex itself states that a definitive list is impracticable, that the examples are a guide only, that they should be read in conjunction with Regulation 710.3, and that the requirements of Regulation 710.3 cannot be satisfied by using the table alone. Use it to sense-check a classification, never to make one: the group comes from the procedures the medical staff confirm will take place, and it should be agreed and documented in writing.',
    },
    {
      question: 'What changed for medical locations in BS 7671:2018+A4:2026?',
      answer:
        'The A4:2026 summary of changes describes Section 710 as a major revision, and singles out two things: requirements for independent supplies in medical locations of group 2, and the inclusion of a Schedule of Test Results for recording the resistance of supplementary protective equipotential bonding conductors. Note that the AFDD prohibition itself is not new at A4 — Section 710 has carried AFDD requirements since Amendment 1:2020. What has changed at A4 is the general AFDD regulation outside medical locations, which makes it more important to be clear that Section 710 excludes them inside.',
    },
  ],
  relatedPages: [
    {
      href: '/tools/eicr-certificate',
      title: 'EICR Certificate Tool',
      description:
        'Digital EICR with BS 7671 A4:2026 observation codes — includes medical location periodic inspection workflow.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/tools/earth-loop-impedance-calculator',
      title: 'Earth Loop Impedance (Zs) Calculator',
      description: 'Verify ADS compliance per Regulation 411 for medical location final circuits.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/guides/afdd-arc-fault-detection',
      title: 'AFDD Arc Fault Detection Guide',
      description:
        'Where AFDDs are required under A4:2026 — and where, as in medical locations, they are prohibited.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-amendment-4-2026',
      title: 'BS 7671 Amendment 4 (2026) Summary',
      description: 'What changed in A4:2026 across the whole standard, section by section.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-observation-codes-explained',
      title: 'EICR Observation Codes (C1, C2, C3, FI)',
      description: 'Common observation codes used during medical location periodic inspection.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/electrical-testing-calculators',
      title: 'All 70 Electrical Calculators',
      description:
        'Voltage drop, cable sizing, Zs, fault current, adiabatic, RCD — every calc free to use.',
      icon: 'Calculator',
      category: 'Tools',
    },
  ],
  ctaHeading: 'Run medical location inspections with confidence',
  ctaSubheading:
    'Elec-Mate ships the digital EICR tool, 70+ calculators and A4:2026 reference materials UK electricians use on hospital and clinic projects. 7-day free trial, cancel anytime.',
};
