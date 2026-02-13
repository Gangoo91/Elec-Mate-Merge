export interface ChecklistItem {
  id: string;
  text: string;
  whyItMatters: string;
  regulation?: string;
  riskLevel: 'critical' | 'important' | 'advisory';
}

export interface ChecklistCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  section: 'pre-job' | 'site-condition' | 'electrical';
  items: ChecklistItem[];
  estimatedMinutes: number;
}

export const sectionLabels: Record<string, { label: string; color: string }> = {
  'pre-job': { label: 'Pre-Job Safety', color: 'green' },
  'site-condition': { label: 'Site Conditions', color: 'blue' },
  'electrical': { label: 'Electrical Installation', color: 'yellow' },
};

export const siteAssessmentChecklist: ChecklistCategory[] = [
  // ============= PRE-JOB SAFETY (5 categories, 35 items) =============
  {
    id: 'ppe',
    name: 'Personal Protective Equipment',
    icon: 'HardHat',
    color: 'green',
    section: 'pre-job',
    estimatedMinutes: 3,
    items: [
      { id: 'ppe-hard-hat', text: 'Hard hat - BS EN 397 compliant with electrical protection', whyItMatters: 'Protects against falling objects and electrical arc flash. Non-compliance is a criminal offence under CDM 2015.', regulation: 'BS EN 397', riskLevel: 'critical' },
      { id: 'ppe-safety-glasses', text: 'Safety glasses - BS EN 166 impact resistant', whyItMatters: 'Prevents eye injuries from debris and arc flash. Eye injuries are the most common preventable injury on site.', regulation: 'BS EN 166', riskLevel: 'critical' },
      { id: 'ppe-insulated-gloves', text: 'Insulated gloves - voltage rated for the task', whyItMatters: 'Primary barrier against electric shock. Must be rated for the specific voltage you are working with.', regulation: 'BS EN 60903', riskLevel: 'critical' },
      { id: 'ppe-safety-boots', text: 'Safety boots - BS EN ISO 20345 with electrical protection', whyItMatters: 'Protects against falling objects, punctures, and provides electrical insulation from ground.', regulation: 'BS EN ISO 20345', riskLevel: 'critical' },
      { id: 'ppe-hi-vis', text: 'High-visibility clothing - appropriate to site requirements', whyItMatters: 'Ensures you are visible to vehicle operators and other workers, preventing struck-by incidents.', riskLevel: 'important' },
      { id: 'ppe-hearing', text: 'Hearing protection if required for noisy environments', whyItMatters: 'Prolonged noise exposure above 85dB causes permanent hearing damage. Damage is irreversible.', regulation: 'Noise at Work Regulations 2005', riskLevel: 'important' },
      { id: 'ppe-respiratory', text: 'Respiratory protection for dusty conditions', whyItMatters: 'Prevents inhalation of harmful dust, fibres, and fumes. Essential when drilling, chasing, or working near asbestos.', riskLevel: 'important' },
    ],
  },
  {
    id: 'electrical-safety-equipment',
    name: 'Electrical Safety Equipment',
    icon: 'Zap',
    color: 'yellow',
    section: 'pre-job',
    estimatedMinutes: 3,
    items: [
      { id: 'ese-voltage-indicator', text: 'Voltage indicator/tester calibrated and functioning', whyItMatters: 'Essential for proving dead before work begins. An uncalibrated tester could give false readings, leading to electric shock.', regulation: 'GS 38', riskLevel: 'critical' },
      { id: 'ese-lockoff', text: 'Lock-off devices available and in good condition', whyItMatters: 'Prevents accidental re-energisation while you are working on circuits. Required under the Electricity at Work Regulations.', regulation: 'Reg 12 EAWR 1989', riskLevel: 'critical' },
      { id: 'ese-prove-dead', text: 'Prove dead device tested before and after use', whyItMatters: 'Confirms your tester is working correctly. Testing on a known live source before and after proves the instrument did not fail during use.', regulation: 'GS 38', riskLevel: 'critical' },
      { id: 'ese-gs38-leads', text: 'GS38 compliant test leads and probes', whyItMatters: 'Non-compliant leads can arc, shatter, or expose live parts. GS38 leads have fused probes and shrouded tips.', regulation: 'GS 38', riskLevel: 'critical' },
      { id: 'ese-insulated-tools', text: 'Insulated tools rated for working voltage', whyItMatters: 'Provides an additional barrier against accidental contact with live parts during work.', regulation: 'BS EN 60900', riskLevel: 'critical' },
      { id: 'ese-emergency-contacts', text: 'Emergency contact numbers readily available', whyItMatters: 'In an emergency, seconds count. Having numbers to hand avoids delays that could cost lives.', riskLevel: 'important' },
      { id: 'ese-first-aid', text: 'First aid kit with electrical injury procedures', whyItMatters: 'Electrical burns require specific first aid. Standard burn treatment may not be sufficient for deep tissue electrical injuries.', riskLevel: 'important' },
    ],
  },
  {
    id: 'work-environment',
    name: 'Work Environment Assessment',
    icon: 'Eye',
    color: 'blue',
    section: 'pre-job',
    estimatedMinutes: 3,
    items: [
      { id: 'we-lighting', text: 'Adequate lighting for the work area', whyItMatters: 'Poor lighting leads to mistakes in wiring, missed hazards, and trips/falls. Colour identification of cables requires good light.', riskLevel: 'important' },
      { id: 'we-weather', text: 'Weather conditions suitable for electrical work', whyItMatters: 'Rain, wind, and lightning create extreme electrical hazards. Work must stop during electrical storms.', riskLevel: 'critical' },
      { id: 'we-dry', text: 'Work area clear of water and moisture', whyItMatters: 'Water dramatically reduces body resistance, making fatal electric shock more likely even at lower voltages.', regulation: 'Reg 6 EAWR 1989', riskLevel: 'critical' },
      { id: 'we-access', text: 'Access routes safe and unobstructed', whyItMatters: 'Clear routes allow quick evacuation in emergencies and prevent trips when carrying tools and materials.', riskLevel: 'important' },
      { id: 'we-evacuation', text: 'Emergency evacuation route identified', whyItMatters: 'You must know how to get out safely before you start work. Required under Fire Safety Order 2005.', regulation: 'Fire Safety Order 2005', riskLevel: 'critical' },
      { id: 'we-fire-ext', text: 'Fire extinguisher location noted', whyItMatters: 'Electrical fires require CO2 or dry powder extinguishers. Using the wrong type on electrical fires is dangerous.', riskLevel: 'important' },
      { id: 'we-ventilation', text: 'Ventilation adequate for the work being undertaken', whyItMatters: 'Prevents build-up of harmful fumes from soldering, cable jointing compounds, or battery gases.', riskLevel: 'important' },
    ],
  },
  {
    id: 'documentation-communication',
    name: 'Documentation and Communication',
    icon: 'FileText',
    color: 'purple',
    section: 'pre-job',
    estimatedMinutes: 3,
    items: [
      { id: 'dc-method-statement', text: 'Method statement reviewed and understood', whyItMatters: 'The method statement defines the safe system of work. Not following it invalidates your insurance and legal protection.', riskLevel: 'critical' },
      { id: 'dc-risk-assessment', text: 'Risk assessment completed and communicated', whyItMatters: 'A legal requirement before any work begins. Identifies hazards and the controls needed to manage them.', regulation: 'Management of H&S at Work Regs 1999', riskLevel: 'critical' },
      { id: 'dc-permit', text: 'Permit to work obtained if required', whyItMatters: 'Required for high-risk activities like live working, confined spaces, and hot work. Working without one is a criminal offence.', riskLevel: 'critical' },
      { id: 'dc-team-briefed', text: 'All team members briefed on safety procedures', whyItMatters: 'Everyone on site must understand the hazards and controls. Poor communication is a leading cause of electrical incidents.', riskLevel: 'important' },
      { id: 'dc-supervisor', text: 'Supervisor contact details confirmed', whyItMatters: 'You must be able to reach your supervisor quickly if conditions change or unexpected hazards are found.', riskLevel: 'important' },
      { id: 'dc-induction', text: 'Site induction completed', whyItMatters: 'Site inductions cover site-specific hazards, rules, and emergency procedures that you need to know before starting work.', riskLevel: 'important' },
      { id: 'dc-insurance', text: 'Insurance and certification documents available', whyItMatters: 'Working without valid insurance or certifications is illegal and leaves you personally liable for any incidents.', riskLevel: 'advisory' },
    ],
  },
  {
    id: 'tool-equipment-check',
    name: 'Tool and Equipment Check',
    icon: 'Wrench',
    color: 'orange',
    section: 'pre-job',
    estimatedMinutes: 3,
    items: [
      { id: 'te-pat', text: 'All tools PAT tested and in date', whyItMatters: 'PAT testing confirms tools are electrically safe. Using untested tools on site is a breach of the Electricity at Work Regulations.', regulation: 'Reg 4 EAWR 1989', riskLevel: 'critical' },
      { id: 'te-extension', text: 'Extension leads and portable equipment checked', whyItMatters: 'Damaged cables and connectors are a common cause of electric shock and fire on construction sites.', riskLevel: 'important' },
      { id: 'te-ladder', text: 'Ladder inspection completed if required', whyItMatters: 'Falls from ladders are one of the top causes of death on construction sites. Pre-use checks take 30 seconds.', regulation: 'Work at Height Regulations 2005', riskLevel: 'important' },
      { id: 'te-scaffolding', text: 'Scaffolding certification checked', whyItMatters: 'Scaffolding must be inspected by a competent person every 7 days and after adverse weather.', riskLevel: 'important' },
      { id: 'te-vehicle', text: 'Vehicle safety check completed', whyItMatters: 'Work vehicles must be roadworthy and tools properly secured. Unsecured loads cause injuries and accidents.', riskLevel: 'advisory' },
      { id: 'te-material-handling', text: 'Material handling equipment inspected', whyItMatters: 'Lifting equipment must be thoroughly examined at regular intervals. Failure of lifting equipment can be fatal.', regulation: 'LOLER 1998', riskLevel: 'important' },
      { id: 'te-communication', text: 'Communication devices tested and charged', whyItMatters: 'Reliable communication is essential for coordinating work and calling for help in emergencies.', riskLevel: 'advisory' },
    ],
  },

  // ============= SITE CONDITIONS (5 categories, 35 items) =============
  {
    id: 'access-working-space',
    name: 'Access and Working Space',
    icon: 'MapPin',
    color: 'blue',
    section: 'site-condition',
    estimatedMinutes: 3,
    items: [
      { id: 'aws-space', text: 'Adequate working space around electrical equipment (minimum 600mm)', whyItMatters: 'Cramped working conditions increase the risk of accidental contact with live parts and limit escape routes.', regulation: 'BS 7671:2018+A2:2022 Reg 513.1', riskLevel: 'critical' },
      { id: 'aws-clear-routes', text: 'Clear access routes to and from work area', whyItMatters: 'Obstructed routes delay emergency evacuation and increase trip hazards when carrying tools and materials.', riskLevel: 'important' },
      { id: 'aws-stable-platform', text: 'Stable working platform or surface', whyItMatters: 'Unstable surfaces increase fall risk and make precise electrical work difficult and dangerous.', riskLevel: 'critical' },
      { id: 'aws-escape', text: 'No obstructions in emergency escape routes', whyItMatters: 'In an electrical emergency you may need to move fast. Blocked routes can trap people.', riskLevel: 'critical' },
      { id: 'aws-vehicle-access', text: 'Vehicle access available if required', whyItMatters: 'Large equipment and heavy materials may need vehicle delivery. Confirm access before ordering.', riskLevel: 'advisory' },
      { id: 'aws-parking', text: 'Suitable parking arrangements for work vehicles', whyItMatters: 'Poorly parked vehicles can obstruct emergency access and create hazards for pedestrians.', riskLevel: 'advisory' },
      { id: 'aws-pedestrian', text: 'Pedestrian walkways clearly marked and safe', whyItMatters: 'Separating pedestrians from work areas and vehicle routes prevents struck-by incidents.', riskLevel: 'important' },
    ],
  },
  {
    id: 'environmental-conditions',
    name: 'Environmental Conditions',
    icon: 'Thermometer',
    color: 'orange',
    section: 'site-condition',
    estimatedMinutes: 3,
    items: [
      { id: 'ec-dry', text: 'Dry conditions - no risk of water ingress', whyItMatters: 'Moisture drastically reduces the body\'s electrical resistance, making even low voltages potentially lethal.', regulation: 'Reg 6 EAWR 1989', riskLevel: 'critical' },
      { id: 'ec-ventilation', text: 'Adequate ventilation in enclosed spaces', whyItMatters: 'Poor ventilation allows build-up of toxic fumes, reduces oxygen levels, and increases heat stress risk.', riskLevel: 'critical' },
      { id: 'ec-temperature', text: 'Temperature suitable for equipment and materials', whyItMatters: 'Cable insulation becomes brittle below 0°C and connections may fail at extreme temperatures. Optimal range: 5-30°C.', riskLevel: 'important' },
      { id: 'ec-wind', text: 'Wind conditions safe for overhead work', whyItMatters: 'High winds affect balance on elevated platforms and can swing suspended loads unpredictably.', riskLevel: 'important' },
      { id: 'ec-flammable', text: 'No flammable vapours or gases present', whyItMatters: 'Electrical sparks can ignite flammable atmospheres, causing explosions. Gas detection is essential in suspect areas.', regulation: 'DSEAR 2002', riskLevel: 'critical' },
      { id: 'ec-humidity', text: 'Humidity levels within acceptable ranges', whyItMatters: 'High humidity causes condensation on electrical equipment, reducing insulation resistance and causing tracking faults.', riskLevel: 'important' },
      { id: 'ec-air-quality', text: 'Air quality suitable for respiratory health', whyItMatters: 'Dust from chasing, drilling, or existing site contamination can cause serious lung disease. Assess before starting.', riskLevel: 'important' },
    ],
  },
  {
    id: 'lighting-visibility',
    name: 'Lighting and Visibility',
    icon: 'Sun',
    color: 'yellow',
    section: 'site-condition',
    estimatedMinutes: 2,
    items: [
      { id: 'lv-adequate', text: 'Adequate natural or artificial lighting', whyItMatters: 'Good lighting is essential for identifying cable colours, reading markings, and spotting hazards.', riskLevel: 'important' },
      { id: 'lv-emergency', text: 'Emergency lighting available if required', whyItMatters: 'If main lighting fails, you need to find your way out safely. Emergency lighting is a legal requirement in many buildings.', regulation: 'BS 5266', riskLevel: 'important' },
      { id: 'lv-signs', text: 'All warning signs and labels clearly visible', whyItMatters: 'Safety signs warn of hazards you may not expect. Obscured signs could lead to dangerous situations.', riskLevel: 'important' },
      { id: 'lv-colour', text: 'Colour identification possible in lighting conditions', whyItMatters: 'Correct cable colour identification is critical. Poor lighting or certain lamp types can make brown and grey look identical.', regulation: 'BS 7671:2018+A2:2022', riskLevel: 'critical' },
      { id: 'lv-portable', text: 'Additional portable lighting available if needed', whyItMatters: 'Task lighting improves safety in ceiling voids, under floors, and in distribution boards.', riskLevel: 'advisory' },
      { id: 'lv-glare', text: 'No glare or shadow issues affecting work', whyItMatters: 'Glare and deep shadows impair vision, increasing the risk of errors and accidents.', riskLevel: 'advisory' },
      { id: 'lv-backup', text: 'Backup lighting arrangements in place', whyItMatters: 'If your primary lighting source fails, backup lighting prevents being stranded in a dangerous area.', riskLevel: 'advisory' },
    ],
  },
  {
    id: 'structural-considerations',
    name: 'Structural Considerations',
    icon: 'Building',
    color: 'purple',
    section: 'site-condition',
    estimatedMinutes: 3,
    items: [
      { id: 'sc-suitable', text: 'Building structure suitable for proposed work', whyItMatters: 'The building must be able to support the equipment being installed. Overloading structures is dangerous and illegal.', riskLevel: 'important' },
      { id: 'sc-no-damage', text: 'No signs of structural damage or instability', whyItMatters: 'Working in or on damaged structures puts you at risk of collapse. Report concerns before entering.', riskLevel: 'critical' },
      { id: 'sc-cable-routes', text: 'Cable routes and fixing points accessible', whyItMatters: 'Planning cable routes in advance prevents rework and ensures compliance with separation requirements.', regulation: 'BS 7671:2018+A2:2022 Reg 521', riskLevel: 'important' },
      { id: 'sc-load-bearing', text: 'Load-bearing capacity adequate for equipment', whyItMatters: 'Heavy distribution boards and transformers need adequate support. Failure could cause injury and equipment damage.', riskLevel: 'important' },
      { id: 'sc-fire-stopping', text: 'Fire stopping and compartmentation maintained', whyItMatters: 'Cable penetrations through fire barriers must be properly sealed. Failure compromises the entire fire strategy.', regulation: 'Building Regulations Part B', riskLevel: 'critical' },
      { id: 'sc-materials', text: 'Building materials compatible with electrical work', whyItMatters: 'Some materials (e.g., foil-backed insulation) can create unintended electrical paths or interfere with installations.', riskLevel: 'advisory' },
      { id: 'sc-modifications', text: 'Structural modifications approved if required', whyItMatters: 'Unauthorised modifications to load-bearing walls or fire barriers are illegal and dangerous.', riskLevel: 'important' },
    ],
  },
  {
    id: 'weather-seasonal',
    name: 'Weather and Seasonal Factors',
    icon: 'Wind',
    color: 'green',
    section: 'site-condition',
    estimatedMinutes: 2,
    items: [
      { id: 'ws-current', text: 'Current weather conditions suitable for work', whyItMatters: 'Rain, ice, and high winds create serious hazards for electrical work, especially outdoors and at height.', riskLevel: 'critical' },
      { id: 'ws-forecast', text: 'Weather forecast checked for duration of work', whyItMatters: 'Conditions can change rapidly. Checking the forecast allows you to plan and avoid being caught out.', riskLevel: 'important' },
      { id: 'ws-seasonal', text: 'Seasonal considerations (frost, ice, heat)', whyItMatters: 'Frost makes surfaces slippery, heat causes fatigue and dehydration, and ice can damage equipment.', riskLevel: 'important' },
      { id: 'ws-rain-protection', text: 'Protection from rain and moisture available', whyItMatters: 'Temporary weather protection (tarpaulins, enclosures) keeps work areas dry for safe electrical work.', riskLevel: 'important' },
      { id: 'ws-wind-speed', text: 'Wind speed within safe working limits', whyItMatters: 'Work at height should stop above 15 mph wind speed. Crane and lifting operations have lower limits.', riskLevel: 'critical' },
      { id: 'ws-temperature-effects', text: 'Temperature effects on materials considered', whyItMatters: 'PVC cables crack below 0°C and thermal expansion can stress connections at high temperatures.', riskLevel: 'advisory' },
      { id: 'ws-contingency', text: 'Contingency plans for weather changes', whyItMatters: 'Have a plan for sudden weather changes: where to shelter, how to make work safe quickly, and when to resume.', riskLevel: 'advisory' },
    ],
  },

  // ============= ELECTRICAL INSTALLATION (5 categories, 40 items) =============
  {
    id: 'consumer-unit',
    name: 'Consumer Unit and Distribution',
    icon: 'CircuitBoard',
    color: 'yellow',
    section: 'electrical',
    estimatedMinutes: 4,
    items: [
      { id: 'cu-condition', text: 'Consumer unit condition and accessibility', whyItMatters: 'A damaged or inaccessible CU prevents safe isolation and makes fault finding dangerous.', regulation: 'BS 7671:2018+A2:2022 Reg 132.12', riskLevel: 'critical' },
      { id: 'cu-space', text: 'Adequate space for additional circuits if required', whyItMatters: 'Overcrowded consumer units increase the risk of incorrect connections and overheating.', riskLevel: 'important' },
      { id: 'cu-main-switch', text: 'Main switch operation and labelling', whyItMatters: 'The main switch must be clearly labelled and easily operable for emergency disconnection.', regulation: 'BS 7671:2018+A2:2022 Reg 537', riskLevel: 'critical' },
      { id: 'cu-rcd', text: 'RCD protection appropriate and functioning', whyItMatters: 'RCDs save lives by disconnecting in milliseconds when a fault is detected. They must trip within required times.', regulation: 'BS 7671:2018+A2:2022 Reg 411.3', riskLevel: 'critical' },
      { id: 'cu-breakers', text: 'Circuit breaker ratings and condition', whyItMatters: 'Incorrect ratings allow dangerous overloading. Damaged breakers may fail to trip during a fault.', riskLevel: 'critical' },
      { id: 'cu-busbars', text: 'Busbar connections tight and secure', whyItMatters: 'Loose busbar connections cause arcing and overheating, which can lead to fire.', riskLevel: 'critical' },
      { id: 'cu-ip-rating', text: 'IP rating appropriate for location', whyItMatters: 'Consumer units in garages, bathrooms, or outdoors need higher IP ratings to prevent moisture ingress.', regulation: 'BS 7671:2018+A2:2022', riskLevel: 'important' },
      { id: 'cu-isolation', text: 'Isolation and switching arrangements adequate', whyItMatters: 'Every circuit must have means of isolation for safe maintenance. Inadequate isolation puts lives at risk.', regulation: 'BS 7671:2018+A2:2022 Reg 537', riskLevel: 'critical' },
    ],
  },
  {
    id: 'existing-wiring',
    name: 'Existing Wiring',
    icon: 'Cable',
    color: 'blue',
    section: 'electrical',
    estimatedMinutes: 4,
    items: [
      { id: 'ew-cable-types', text: 'Cable types and conditions throughout installation', whyItMatters: 'Old or damaged cables may not meet current regulations and could be a fire or shock hazard.', regulation: 'BS 7671:2018+A2:2022', riskLevel: 'critical' },
      { id: 'ew-supports', text: 'Cable supports and fixing methods adequate', whyItMatters: 'Unsupported cables sag, overheat at pinch points, and are vulnerable to mechanical damage.', regulation: 'BS 7671:2018+A2:2022 Reg 522', riskLevel: 'important' },
      { id: 'ew-overheating', text: 'No signs of overheating or damage', whyItMatters: 'Discolouration, melted insulation, or burning smells indicate a dangerous fault that needs immediate attention.', riskLevel: 'critical' },
      { id: 'ew-cable-sizes', text: 'Appropriate cable sizes for circuit loading', whyItMatters: 'Undersized cables overheat under load, degrading insulation and eventually causing fire.', regulation: 'BS 7671:2018+A2:2022 Reg 523', riskLevel: 'critical' },
      { id: 'ew-junctions', text: 'Junction boxes and connections accessible', whyItMatters: 'Inaccessible connections cannot be inspected or maintained, and concealed faults are harder to find.', regulation: 'BS 7671:2018+A2:2022 Reg 526', riskLevel: 'important' },
      { id: 'ew-labelling', text: 'Cable identification and labelling present', whyItMatters: 'Poor labelling increases the risk of working on the wrong circuit and makes fault finding much harder.', regulation: 'BS 7671:2018+A2:2022 Reg 514', riskLevel: 'important' },
      { id: 'ew-segregation', text: 'Segregation of different voltage systems', whyItMatters: 'Mixing low voltage and extra-low voltage cables without proper segregation can introduce dangerous voltages.', regulation: 'BS 7671:2018+A2:2022 Reg 528', riskLevel: 'critical' },
      { id: 'ew-entry', text: 'Cable entry methods and sealing adequate', whyItMatters: 'Poor cable entries allow moisture, vermin, and fire to spread. IP ratings depend on proper sealing.', riskLevel: 'important' },
    ],
  },
  {
    id: 'earthing-bonding',
    name: 'Earthing and Bonding',
    icon: 'Shield',
    color: 'green',
    section: 'electrical',
    estimatedMinutes: 4,
    items: [
      { id: 'eb-met', text: 'Main earthing terminal condition and connection', whyItMatters: 'The MET is the foundation of the entire earthing system. A poor connection here compromises all protection.', regulation: 'BS 7671:2018+A2:2022 Reg 542', riskLevel: 'critical' },
      { id: 'eb-conductor', text: 'Earthing conductor size and condition', whyItMatters: 'An undersized earthing conductor may not carry fault current, preventing protective devices from operating.', regulation: 'BS 7671:2018+A2:2022 Reg 542', riskLevel: 'critical' },
      { id: 'eb-equipotential', text: 'Equipotential bonding to services complete', whyItMatters: 'Main bonding connects gas, water, and other services to earth, preventing dangerous voltages between them.', regulation: 'BS 7671:2018+A2:2022 Reg 544.1', riskLevel: 'critical' },
      { id: 'eb-supplementary', text: 'Supplementary bonding where required', whyItMatters: 'In special locations like bathrooms, supplementary bonding provides additional protection against electric shock.', regulation: 'BS 7671:2018+A2:2022 Reg 701', riskLevel: 'important' },
      { id: 'eb-electrode', text: 'Earth electrode system (if applicable)', whyItMatters: 'TT installations rely on the earth electrode for fault protection. Its resistance must be tested regularly.', regulation: 'BS 7671:2018+A2:2022 Reg 542.2', riskLevel: 'critical' },
      { id: 'eb-continuity', text: 'Continuity of protective conductors', whyItMatters: 'A broken CPC means exposed metalwork could become live during a fault with no protection.', regulation: 'BS 7671:2018+A2:2022 Reg 543', riskLevel: 'critical' },
      { id: 'eb-bonding-sizes', text: 'Bonding conductor sizes comply with BS 7671', whyItMatters: 'Undersized bonding conductors cannot carry prospective fault current, defeating the purpose of the bond.', regulation: 'BS 7671:2018+A2:2022 Reg 544', riskLevel: 'critical' },
      { id: 'eb-efli', text: 'Earth fault loop impedance within limits', whyItMatters: 'If Zs is too high, protective devices will not disconnect fast enough during a fault, leaving you exposed to shock.', regulation: 'BS 7671:2018+A2:2022 Reg 411', riskLevel: 'critical' },
    ],
  },
  {
    id: 'safety-systems',
    name: 'Safety Systems',
    icon: 'AlertTriangle',
    color: 'red',
    section: 'electrical',
    estimatedMinutes: 3,
    items: [
      { id: 'ss-rcd-testing', text: 'RCD testing and operation within limits', whyItMatters: 'RCDs must trip within 300ms at rated current and 40ms at 5x rated current. Slow RCDs do not protect.', regulation: 'BS 7671:2018+A2:2022 Reg 411.3', riskLevel: 'critical' },
      { id: 'ss-emergency-lighting', text: 'Emergency lighting systems functional', whyItMatters: 'Emergency lighting must work when main power fails. Test monthly and ensure batteries are maintained.', regulation: 'BS 5266', riskLevel: 'important' },
      { id: 'ss-fire-alarm', text: 'Fire alarm systems unaffected by work', whyItMatters: 'Your work must not compromise fire detection. If you isolate fire alarm circuits, temporary measures must be in place.', regulation: 'BS 5839', riskLevel: 'critical' },
      { id: 'ss-security', text: 'Security systems consideration', whyItMatters: 'Disabling security systems during work leaves the building vulnerable. Coordinate with the building manager.', riskLevel: 'advisory' },
      { id: 'ss-smoke-detection', text: 'Smoke detection systems operational', whyItMatters: 'Electrical work can produce smoke and dust that triggers detectors. Cover detectors and inform building management.', riskLevel: 'important' },
      { id: 'ss-emergency-stop', text: 'Emergency stop systems accessible', whyItMatters: 'Emergency stops on machinery must be accessible and functional at all times during electrical work nearby.', riskLevel: 'important' },
      { id: 'ss-intruder-alarm', text: 'Intruder alarm system compatibility', whyItMatters: 'New circuits and modifications should not interfere with existing intruder alarm wiring or zones.', riskLevel: 'advisory' },
      { id: 'ss-communications', text: 'Communication systems operational', whyItMatters: 'Fire panels, PA systems, and building intercoms must remain operational during your work.', riskLevel: 'important' },
    ],
  },
  {
    id: 'testing-documentation',
    name: 'Testing and Documentation',
    icon: 'FileText',
    color: 'purple',
    section: 'electrical',
    estimatedMinutes: 3,
    items: [
      { id: 'td-prev-certs', text: 'Previous test certificates available', whyItMatters: 'Historical test data shows trends and helps identify deteriorating insulation or increasing fault loop impedance.', riskLevel: 'important' },
      { id: 'td-compliant', text: 'Installation complies with current edition of BS 7671', whyItMatters: 'Non-compliant installations may have safety deficiencies that need addressing before new work begins.', regulation: 'BS 7671:2018+A2:2022', riskLevel: 'critical' },
      { id: 'td-test-results', text: 'Test results within acceptable limits', whyItMatters: 'Out-of-limits results indicate faults that must be rectified before the installation can be certified safe.', regulation: 'BS 7671:2018+A2:2022 Ch 61', riskLevel: 'critical' },
      { id: 'td-periodic', text: 'Periodic inspection due dates noted', whyItMatters: 'Overdue periodic inspections mean the installation has not been checked for developing faults.', regulation: 'BS 7671:2018+A2:2022 Ch 62', riskLevel: 'important' },
      { id: 'td-departures', text: 'Any departures from BS 7671 recorded', whyItMatters: 'All departures must be documented with justification. Undocumented departures create liability issues.', regulation: 'BS 7671:2018+A2:2022 Reg 120.3', riskLevel: 'important' },
      { id: 'td-changes', text: 'Installation changes properly documented', whyItMatters: 'Undocumented changes make future maintenance dangerous as assumptions about the installation may be wrong.', riskLevel: 'important' },
      { id: 'td-drawings', text: 'As-built drawings available and accurate', whyItMatters: 'Accurate drawings speed up fault finding and prevent accidental damage to concealed cables during other work.', riskLevel: 'advisory' },
      { id: 'td-manuals', text: 'Operation and maintenance manuals present', whyItMatters: 'Equipment manuals contain safety information, maintenance schedules, and troubleshooting procedures.', riskLevel: 'advisory' },
    ],
  },
];

export const getTotalItemCount = () => {
  return siteAssessmentChecklist.reduce((total, cat) => total + cat.items.length, 0);
};

export const getAllItemIds = () => {
  return siteAssessmentChecklist.flatMap(cat => cat.items.map(item => item.id));
};

export const getCategoriesBySection = (section: 'pre-job' | 'site-condition' | 'electrical') => {
  return siteAssessmentChecklist.filter(cat => cat.section === section);
};
