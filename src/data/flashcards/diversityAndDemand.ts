import { FlashcardData } from './types';

export const diversityAndDemand: FlashcardData[] = [
  // ── Maximum Demand ────────────────────────────────────────────────────

  {
    id: 'dd1',
    question: "What is the definition of 'maximum demand' as used in BS 7671?",
    answer:
      'Maximum demand is the maximum current that a circuit, or an entire installation, is expected to draw at any given time. It is defined in Part 2 of BS 7671:2018+A2:2022 and is used to determine the rating of protective devices, cable sizes, and the capacity of the incoming supply.',
    category: 'Maximum Demand',
    difficulty: 'easy',
  },
  {
    id: 'dd2',
    question: 'What is the difference between maximum demand and assessed demand?',
    answer:
      'Maximum demand is the theoretical total load if every appliance and circuit were operating simultaneously at full load. Assessed demand (sometimes called the after-diversity maximum demand or ADMD) is the realistic figure calculated after applying diversity factors, reflecting the fact that not all loads will be in use at the same time. The assessed demand is always lower than or equal to the maximum demand.',
    category: 'Maximum Demand',
    difficulty: 'easy',
  },
  {
    id: 'dd3',
    question:
      'Why is it important to correctly calculate maximum demand before applying for a new or upgraded supply from the DNO?',
    answer:
      'The Distribution Network Operator (DNO) uses the maximum demand figure to determine the size of the service cable, cut-out fuse, and meter capacity they will provide. If the maximum demand is underestimated, the supply may be insufficient and could lead to overloading. If it is overestimated, the customer may pay unnecessarily for a larger supply than needed.',
    category: 'Maximum Demand',
    difficulty: 'medium',
  },
  {
    id: 'dd4',
    question:
      'A domestic property has a total connected load of 28 kW. After applying diversity, the assessed maximum demand is 14.5 kW. Which figure would be used to determine whether the existing 100A single-phase supply is adequate?',
    answer:
      'The assessed maximum demand of 14.5 kW is used. At 230V single-phase, 14.5 kW equates to approximately 63A (14,500 / 230 = 63A), which is well within the 100A supply capacity. The full 28 kW connected load would suggest 122A, which would appear to exceed the supply, but diversity recognises that all loads will not operate simultaneously.',
    category: 'Maximum Demand',
    difficulty: 'medium',
  },
  {
    id: 'dd5',
    question:
      'What is the typical maximum supply capacity for a standard domestic single-phase supply in the UK?',
    answer:
      'A standard domestic single-phase supply in the UK is typically rated at 100A, protected by a DNO cut-out fuse rated at 80A or 100A. At 230V, this provides a maximum capacity of approximately 23 kW (100 x 230 = 23,000W). If the assessed demand exceeds this, a three-phase supply or a supply upgrade may be required.',
    category: 'Maximum Demand',
    difficulty: 'easy',
  },
  {
    id: 'dd6',
    question:
      'How do you convert a load in kilowatts (kW) to current in amperes for a single-phase 230V supply?',
    answer:
      'For a purely resistive load (power factor of 1), use the formula I = P / V, so current in amps equals power in watts divided by 230V. For example, a 9.5 kW shower draws 9,500 / 230 = 41.3A. If the load has a power factor less than 1 (such as motors), use I = P / (V x power factor), which will give a higher current for the same wattage.',
    category: 'Maximum Demand',
    difficulty: 'easy',
  },

  // ── Diversity Factors ─────────────────────────────────────────────────

  {
    id: 'dd7',
    question: 'Why is diversity applied when calculating the total load of an installation?',
    answer:
      'Diversity is applied because in practice not all circuits and appliances in an installation will be operating at the same time or at their maximum rated load. For example, the cooker, electric shower, and immersion heater are unlikely to all be running simultaneously. Applying diversity gives a more realistic assessment of the actual current the installation will draw, avoiding unnecessarily oversized cables and equipment.',
    category: 'Diversity Factors',
    difficulty: 'easy',
  },
  {
    id: 'dd8',
    question: 'Where can the diversity allowances for domestic installations be found?',
    answer:
      'Diversity allowances for domestic installations are published in Table 1B of IET Guidance Note 1: Selection and Erection of Equipment. BS 7671 itself does not include specific diversity tables but references the IET Guidance Notes. It is important to note that Guidance Note 1 provides guidance rather than a mandatory requirement, and the designer must use professional judgement.',
    category: 'Diversity Factors',
    difficulty: 'medium',
  },
  {
    id: 'dd9',
    question:
      'What diversity factor is typically applied to lighting circuits in a domestic installation according to IET Guidance Note 1, Table 1B?',
    answer:
      'For domestic lighting circuits, a diversity factor of 66% of the total connected lighting load is typically applied. This means if the total lighting load is 3,000W, the assessed demand for lighting would be 2,000W (3,000 x 0.66). This recognises that not every light in the property will be switched on simultaneously during normal use.',
    category: 'Diversity Factors',
    difficulty: 'easy',
  },
  {
    id: 'dd10',
    question:
      'Explain the diversity allowance for cooking appliances in a domestic installation as per IET Guidance Note 1, Table 1B.',
    answer:
      'For a single cooking appliance, the first 10A of the rated current is taken at 100%, and the remaining current is taken at 30%, plus 5A if the appliance has a socket outlet. For example, a 12 kW cooker at 230V draws 52.2A: the first 10A at 100% = 10A, the remaining 42.2A at 30% = 12.7A, giving an assessed demand of 22.7A (or 27.7A if a socket outlet is fitted on the cooker control unit).',
    category: 'Diversity Factors',
    difficulty: 'medium',
  },
  {
    id: 'dd11',
    question: 'How is diversity applied to socket outlet circuits in a domestic installation?',
    answer:
      'According to IET Guidance Note 1, Table 1B, the first socket outlet ring circuit (or equivalent radial) is taken at 100% of its rated capacity. Each additional ring or radial circuit is assessed at 40% of its rated capacity. In practice, the first ring circuit is assumed at the full 32A rating, and any subsequent ring circuits are assessed at approximately 13A each (32A x 0.40 = 12.8A).',
    category: 'Diversity Factors',
    difficulty: 'medium',
  },
  {
    id: 'dd12',
    question:
      'Which types of domestic load are typically given NO diversity allowance and must be included at their full rated current?',
    answer:
      'Electric showers and immersion heaters are typically given no diversity allowance in domestic installations as per IET Guidance Note 1, Table 1B. They are included at 100% of their rated current. This is because an electric shower draws its full load whenever it is in use, and an immersion heater similarly draws its full rated current during its heating cycle.',
    category: 'Diversity Factors',
    difficulty: 'medium',
  },
  {
    id: 'dd13',
    question: 'What diversity factor is applied to domestic space heating circuits?',
    answer:
      'According to IET Guidance Note 1, Table 1B, for thermostatically controlled fixed space heating, the diversity allowance is the full load of the largest circuit plus 40% of the remaining heating circuits. For non-thermostatically controlled heating (such as panel heaters without a room thermostat), no diversity may be applied, and the full load should be used.',
    category: 'Diversity Factors',
    difficulty: 'hard',
  },
  {
    id: 'dd14',
    question:
      'Can diversity factors from IET Guidance Note 1 be applied to commercial or industrial installations?',
    answer:
      "No. The diversity factors in Table 1B of IET Guidance Note 1 are intended for domestic (household) installations only. Commercial and industrial installations require a bespoke assessment based on the specific load profile, usage patterns, and operational requirements of the premises. The designer must assess the likely demand using their professional knowledge and the client's operational data.",
    category: 'Diversity Factors',
    difficulty: 'hard',
  },

  // ── Load Assessment ───────────────────────────────────────────────────

  {
    id: 'dd15',
    question:
      'A domestic property has: 2 lighting circuits (total 2,400W), 3 ring final circuits, a 12 kW cooker, a 9.5 kW shower, and a 3 kW immersion heater. Calculate the assessed maximum demand using IET Guidance Note 1 diversity factors.',
    answer:
      'Lighting: 2,400W x 66% = 1,584W (6.9A). Cooker 12,000W / 230V = 52.2A: first 10A at 100% + 42.2A at 30% = 22.7A. Shower: 9,500 / 230 = 41.3A at 100%. Immersion heater: 3,000 / 230 = 13.0A at 100%. Socket outlets: first ring 32A at 100% + 2 additional rings at 40% = 32 + 12.8 + 12.8 = 57.6A. Total assessed demand: 6.9 + 22.7 + 41.3 + 13.0 + 57.6 = 141.5A. This would exceed a 100A supply and would require a supply upgrade or load management.',
    category: 'Load Assessment',
    difficulty: 'hard',
  },
  {
    id: 'dd16',
    question:
      'When carrying out a load assessment, should you use the nameplate rating of appliances or the measured running current?',
    answer:
      "For a design assessment, you should use the nameplate rating (or manufacturer's data) of the appliances, as this represents the maximum the appliance will draw. Measured running current may be lower due to partial load conditions, but the installation must be designed to handle the full rated load. Using nameplate data ensures the installation is safe under all foreseeable operating conditions as required by BS 7671 Regulation 311.1.",
    category: 'Load Assessment',
    difficulty: 'medium',
  },
  {
    id: 'dd17',
    question: 'What is the significance of power factor when assessing maximum demand?',
    answer:
      'Power factor (pf) is the ratio of real power (kW) to apparent power (kVA). Where loads have a power factor less than 1 (e.g. motors, fluorescent lighting with magnetic ballasts), the current drawn is higher than the kW figure alone suggests. The formula is I = P / (V x pf). A motor rated at 3 kW with a power factor of 0.8 draws 3,000 / (230 x 0.8) = 16.3A, compared to 13.0A if the power factor were unity.',
    category: 'Load Assessment',
    difficulty: 'hard',
  },
  {
    id: 'dd18',
    question:
      'What is the difference between kW and kVA, and which is used by the DNO to assess supply requirements?',
    answer:
      'kW (kilowatts) measures real or active power, which performs useful work. kVA (kilovolt-amperes) measures apparent power, which is the total power the supply must deliver including reactive components. DNOs typically assess supply capacity in kVA because the supply cables and transformers must handle the full apparent power. For a purely resistive load (pf = 1), kW and kVA are equal, but for inductive loads kVA will be higher than kW.',
    category: 'Load Assessment',
    difficulty: 'hard',
  },
  {
    id: 'dd19',
    question:
      'A domestic property is having an EV charger (7.4 kW) added to an existing installation. The current assessed demand before the addition is 58A. Will the existing 100A single-phase supply cope?',
    answer:
      'The EV charger draws 7,400 / 230 = 32.2A. Adding this to the existing 58A gives a total assessed demand of 90.2A. This is within the 100A supply capacity but leaves very little headroom. In practice, a load management device or smart charger with current limiting (to comply with BS 7671 Regulation 722.311.1.1) should be considered to dynamically reduce the charging current when other loads are high, preventing the supply from being exceeded.',
    category: 'Load Assessment',
    difficulty: 'medium',
  },

  // ── Supply Capacity ───────────────────────────────────────────────────

  {
    id: 'dd20',
    question:
      'What information must be provided to the DNO when applying for a new electrical supply or an upgrade?',
    answer:
      'The DNO will require the total assessed maximum demand in kVA or kW, the type of supply required (single-phase or three-phase), the address and site plan, and details of any large or unusual loads such as electric vehicle chargers, heat pumps, or three-phase equipment. They may also ask for a completed application form specifying the number and type of circuits. This allows the DNO to size the service cable, cut-out, and metering correctly.',
    category: 'Supply Capacity',
    difficulty: 'medium',
  },
  {
    id: 'dd21',
    question:
      'When would a domestic property require a three-phase supply instead of a standard single-phase supply?',
    answer:
      'A three-phase supply is typically required when the assessed maximum demand exceeds the capacity of a single-phase 100A supply (approximately 23 kW). This might arise where a property has large loads such as a heat pump, EV charger, electric cooker, and electric shower combined. A three-phase supply provides approximately 69 kW (100A per phase at 230V), but the loads must be balanced as evenly as possible across the three phases.',
    category: 'Supply Capacity',
    difficulty: 'medium',
  },
  {
    id: 'dd22',
    question: "What does 'load balancing' mean in the context of a three-phase domestic supply?",
    answer:
      'Load balancing means distributing the connected loads as evenly as possible across the three phases (L1, L2, L3) so that each phase carries approximately the same current. An unbalanced load causes higher current in the neutral conductor and reduces the effective capacity of the supply. For example, if total demand is 60A, each phase should carry approximately 20A rather than one phase carrying 40A and the others 10A each. BS 7671 Regulation 314.1 requires circuits to be arranged to distribute demand evenly.',
    category: 'Supply Capacity',
    difficulty: 'hard',
  },
  {
    id: 'dd23',
    question: 'What is the role of the DNO cut-out fuse and how does it relate to maximum demand?',
    answer:
      "The DNO cut-out fuse is the main protective device at the origin of the supply, typically rated at 80A or 100A for a domestic single-phase installation. It protects the DNO's service cable from overload and fault current. The assessed maximum demand of the installation must not exceed the rating of this fuse under normal operating conditions. The cut-out and its fuse are the property of the DNO and must not be interfered with by the electrician.",
    category: 'Supply Capacity',
    difficulty: 'easy',
  },
  {
    id: 'dd24',
    question:
      'What diversity factor is applied to water heating circuits (such as an immersion heater or instantaneous water heater) in a domestic installation?',
    answer:
      'According to IET Guidance Note 1, Table 1B, no diversity is applied to instantaneous water heaters (including electric showers) or storage water heaters (immersion heaters). They are assessed at 100% of their full rated current. This is because when these appliances are in use, they draw their full rated load and there is no partial loading to account for.',
    category: 'Diversity Factors',
    difficulty: 'easy',
  },
  {
    id: 'dd25',
    question:
      'An installation designer is unsure whether to apply diversity to a domestic heat pump rated at 5 kW. What guidance does IET Guidance Note 1 provide?',
    answer:
      "IET Guidance Note 1 does not include a specific diversity category for heat pumps, as they were less common when the table was originally produced. A heat pump with thermostatic control may be treated similarly to thermostatically controlled space heating. However, because a heat pump can run for extended periods (especially in cold weather), many designers choose to include it at 100% of its rated current to ensure the supply is not overloaded. Professional judgement and the manufacturer's data on the duty cycle should guide the decision.",
    category: 'Supply Capacity',
    difficulty: 'hard',
  },
];
