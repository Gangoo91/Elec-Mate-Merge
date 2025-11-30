/**
 * Ultra-Fast Keyword Extraction for Open Electrical Chat
 * 800+ keyword expansions covering all BS 7671 topics
 * Performance: <5ms extraction + 50-100ms GIN search
 */

const CHAT_KEYWORD_EXPANSIONS: Record<string, string[]> = {
  
  // ══════════════════════════════════════════════════════════════════════
  // SECTION 1: DESIGN & CALCULATIONS (120+ keywords)
  // ══════════════════════════════════════════════════════════════════════
  
  // DIVERSITY & MAXIMUM DEMAND
  'diversity': ['diversity factor', 'maximum demand', 'Table 4A', 'demand factor', 'connected load', 'simultaneity', 'diversity calculation', 'load diversity'],
  'demand': ['maximum demand', 'connected load', 'design current', 'Ib', 'assessed demand', 'load calculation'],
  'load': ['load calculation', 'design current', 'Ib', 'connected load', 'circuit load', 'loading'],
  'calculate': ['calculation', 'formula', 'design', 'sizing', 'work out', 'determine'],
  'table': ['Table 4A', 'Table 4B', 'Appendix 4', 'tabulated values', 'BS 7671 tables', 'correction factors'],
  
  // VOLTAGE DROP
  'voltage': ['voltage drop', 'mV/A/m', '3%', '5%', 'volt drop', 'VD', 'volts'],
  'drop': ['voltage drop', 'volt drop', 'mV/A/m', '3%', '5%', 'VD calculation'],
  'vd': ['voltage drop', 'volt drop', 'mV/A/m', '3%', '5%'],
  'mv': ['mV/A/m', 'millivolt', 'voltage drop', 'cable drop'],
  '3%': ['3 percent', 'lighting voltage drop', 'voltage drop limit'],
  '5%': ['5 percent', 'power voltage drop', 'voltage drop limit'],
  
  // CABLE SIZING
  'cable': ['cable sizing', 'cable selection', 'conductor size', 'CSA', 'cross sectional area', 'cable run', 'cable type'],
  'size': ['cable size', 'sizing', 'cross section', 'mm²', 'csa', 'conductor size'],
  'sizing': ['cable sizing', 'cable selection', 'design', 'calculation'],
  'conductor': ['conductor size', 'conductor csa', 'live conductor', 'neutral conductor', 'protective conductor'],
  'csa': ['cross sectional area', 'mm²', 'cable size', 'conductor area'],
  'mm': ['mm²', 'square millimetre', 'cable size', 'cross sectional area'],
  '1.5': ['1.5mm²', 'lighting cable', 'small cable'],
  '2.5': ['2.5mm²', 'socket cable', 'ring main cable'],
  '4': ['4mm²', 'immersion cable', 'small appliance'],
  '6': ['6mm²', 'cooker cable', 'shower cable'],
  '10': ['10mm²', 'large appliance', 'shower cable'],
  '16': ['16mm²', 'main cable', 'submain'],
  '25': ['25mm²', 'large submain', 'commercial'],
  'swa': ['steel wire armoured', 'armoured cable', 'external cable', 'buried cable'],
  'twin': ['twin and earth', 'T&E', 'flat cable', '6242Y'],
  'flex': ['flexible cable', 'flex', 'appliance cable', 'pendant flex'],
  
  // CURRENT CARRYING CAPACITY
  'current': ['current-carrying capacity', 'It', 'Iz', 'ampacity', 'rated current', 'design current', 'Ib'],
  'capacity': ['current-carrying capacity', 'It', 'ampacity', 'cable rating'],
  'ib': ['design current', 'load current', 'circuit current'],
  'it': ['tabulated current', 'cable rating', 'current-carrying capacity'],
  'iz': ['effective current-carrying capacity', 'derated current', 'actual capacity'],
  'derate': ['derating', 'correction factor', 'Ca', 'Cg', 'Ci', 'Cc', 'reduced capacity'],
  'correction': ['correction factor', 'Ca', 'Cg', 'Ci', 'Cc', 'derating'],
  'ca': ['ambient temperature correction', 'temperature factor', 'correction factor'],
  'cg': ['grouping factor', 'correction factor', 'bunched cables'],
  'ci': ['thermal insulation factor', 'insulation correction', 'correction factor'],
  
  // ══════════════════════════════════════════════════════════════════════
  // SECTION 2: PROTECTION DEVICES (100+ keywords)
  // ══════════════════════════════════════════════════════════════════════
  
  // RCDs
  'rcd': ['residual current device', '30mA', 'RCD protection', '411.3.3', 'earth leakage', 'additional protection', 'RCBO'],
  'rcbo': ['RCD circuit breaker', 'combined protection', 'RCBO', 'individual RCD'],
  'residual': ['residual current', 'RCD', 'earth leakage', 'leakage current'],
  '30ma': ['30 milliamp', 'additional protection', 'RCD rating', 'socket protection'],
  '100ma': ['100 milliamp', 'fire protection', 'time delayed RCD'],
  '300ma': ['300 milliamp', 'fire protection', 'incomer RCD'],
  'trip': ['trip time', 'disconnection', 'RCD trip', 'MCB trip', 'nuisance trip'],
  'leakage': ['earth leakage', 'residual current', 'leakage current', 'standing leakage'],
  'additional': ['additional protection', '30mA RCD', '411.3.3', 'supplementary'],
  
  // MCBs & FUSES
  'mcb': ['miniature circuit breaker', 'MCB', 'circuit breaker', 'overcurrent protection', 'Type B', 'Type C', 'Type D'],
  'breaker': ['circuit breaker', 'MCB', 'MCCB', 'ACB', 'overcurrent'],
  'type': ['Type B', 'Type C', 'Type D', 'MCB type', 'breaker type'],
  'b': ['Type B', 'general use', 'domestic MCB', '3-5 In'],
  'c': ['Type C', 'motor starting', 'inductive loads', '5-10 In'],
  'd': ['Type D', 'high inrush', 'transformer', '10-20 In'],
  'fuse': ['fuse', 'BS88', 'BS1361', 'BS3036', 'cartridge fuse', 'rewirable fuse'],
  'bs88': ['BS 88 fuse', 'HRC fuse', 'industrial fuse'],
  'bs1361': ['BS 1361 fuse', 'consumer unit fuse', '45A fuse'],
  'bs3036': ['BS 3036 fuse', 'rewirable fuse', 'semi-enclosed fuse'],
  'overcurrent': ['overcurrent protection', 'overload', 'short circuit', 'protective device'],
  'overload': ['overload protection', 'overcurrent', 'In', 'device rating'],
  
  // AFDD & SPD
  'afdd': ['arc fault detection device', 'AFDD', 'arc fault', 'fire protection', '421.1.7'],
  'arc': ['arc fault', 'AFDD', 'series arc', 'parallel arc', 'arcing'],
  'spd': ['surge protective device', 'SPD', 'surge protection', 'transient overvoltage', '443'],
  'surge': ['surge protection', 'SPD', 'transient', 'lightning', 'overvoltage'],
  
  // ══════════════════════════════════════════════════════════════════════
  // SECTION 3: EARTHING & BONDING (80+ keywords)
  // ══════════════════════════════════════════════════════════════════════
  
  'earth': ['earthing', 'earth fault loop', 'earthing system', 'earth electrode', 'protective earth'],
  'earthing': ['earthing arrangement', 'TN-S', 'TN-C-S', 'TT', 'earthing system', 'Chapter 54'],
  'ground': ['earth', 'grounding', 'earthing', 'earth connection'],
  'bond': ['bonding', 'main bonding', 'supplementary bonding', 'equipotential bonding'],
  'bonding': ['main protective bonding', 'supplementary bonding', 'equipotential', 'extraneous'],
  'main': ['main bonding', 'main earth terminal', 'MET', 'main protective bonding'],
  'supplementary': ['supplementary bonding', 'equipotential bonding', 'bathroom bonding', 'local bonding'],
  'equipotential': ['equipotential bonding', 'supplementary bonding', 'touch voltage'],
  'extraneous': ['extraneous conductive part', 'metalwork', 'pipes', 'bonding requirement'],
  
  // EARTHING SYSTEMS
  'tns': ['TN-S', 'separate earth', 'cable sheath earth', 'earthing system'],
  'tncs': ['TN-C-S', 'PME', 'combined neutral earth', 'earthing system'],
  'pme': ['PME', 'protective multiple earthing', 'TN-C-S', 'combined earth'],
  'tt': ['TT system', 'earth electrode', 'earth rod', 'earth spike'],
  'tn': ['TN system', 'TN-S', 'TN-C-S', 'earthing arrangement'],
  'electrode': ['earth electrode', 'earth rod', 'earth spike', 'TT earthing'],
  'rod': ['earth rod', 'earth electrode', 'earth spike', 'driven rod'],
  'met': ['main earth terminal', 'main earthing terminal', 'earth bar'],
  
  // PROTECTIVE CONDUCTORS
  'cpc': ['circuit protective conductor', 'earth wire', 'protective conductor', 'green/yellow'],
  'protective': ['protective conductor', 'CPC', 'earth conductor', 'bonding conductor'],
  'green': ['green/yellow', 'earth colour', 'protective conductor', 'earth wire'],
  
  // ══════════════════════════════════════════════════════════════════════
  // SECTION 4: TESTING & INSPECTION (150+ keywords)
  // ══════════════════════════════════════════════════════════════════════
  
  'test': ['testing', 'test procedure', 'inspection', 'verification', 'commissioning', 'GN3'],
  'testing': ['initial verification', 'periodic inspection', 'test procedures', 'GN3'],
  'inspect': ['inspection', 'visual inspection', 'EICR', 'condition report'],
  'inspection': ['visual inspection', 'EICR', 'initial verification', 'periodic inspection'],
  'verify': ['verification', 'initial verification', 'testing', 'commissioning'],
  'verification': ['initial verification', 'verify', 'testing', 'commissioning'],
  'commission': ['commissioning', 'initial verification', 'energisation', 'handover'],
  'gn3': ['Guidance Note 3', 'inspection and testing', 'test procedures', 'IET GN3'],
  
  // SPECIFIC TESTS
  'continuity': ['continuity test', 'R1+R2', 'ring final', 'protective conductor', 'bonding continuity'],
  'r1r2': ['R1+R2', 'continuity', 'ring final continuity', 'circuit continuity'],
  'r1': ['R1', 'line conductor resistance', 'live resistance'],
  'r2': ['R2', 'protective conductor resistance', 'earth resistance'],
  'ring': ['ring final', 'ring circuit', 'ring continuity', 'ring main'],
  'insulation': ['insulation resistance', 'IR test', 'megger', '500V test', '1MΩ'],
  'ir': ['insulation resistance', 'IR test', 'megger', '500V', '1MΩ'],
  'megger': ['insulation resistance', 'IR tester', '500V', '1000V'],
  '500v': ['500 volt', 'insulation test voltage', 'IR test'],
  '1m': ['1 megohm', 'minimum IR', 'insulation resistance'],
  
  // EARTH FAULT LOOP
  'zs': ['earth fault loop impedance', 'loop impedance', 'Zs test', 'disconnection time'],
  'ze': ['external earth fault loop impedance', 'supply impedance', 'incoming Ze'],
  'loop': ['loop impedance', 'earth fault loop', 'Zs', 'fault loop'],
  'impedance': ['loop impedance', 'Zs', 'Ze', 'circuit impedance'],
  'efli': ['earth fault loop impedance', 'Zs', 'EFLI', 'loop impedance'],
  'disconnection': ['disconnection time', '0.4s', '5s', 'automatic disconnection'],
  '0.4s': ['0.4 seconds', 'disconnection time', 'TN system'],
  '5s': ['5 seconds', 'disconnection time', 'distribution circuit'],
  
  // PSC/PFC
  'psc': ['prospective short circuit current', 'fault current', 'PSCC', 'fault level'],
  'pfc': ['prospective fault current', 'PFC', 'fault current', 'short circuit'],
  'ipf': ['prospective fault current', 'fault level', 'Ipf'],
  'fault': ['fault current', 'fault finding', 'earth fault', 'short circuit fault'],
  'short': ['short circuit', 'fault current', 'PSCC', 'breaking capacity'],
  
  // POLARITY
  'polarity': ['polarity test', 'correct connections', 'polarity check', 'L-N identification'],
  'phase': ['phase rotation', 'phase sequence', 'three phase', 'L1 L2 L3'],
  'rotation': ['phase rotation', 'phase sequence', 'motor rotation'],
  
  // RCD TESTING
  'rcdtest': ['RCD test', 'trip time', 'x1 x5', 'RCD testing'],
  'x1': ['x1 test', 'rated current test', 'RCD 1x test'],
  'x5': ['x5 test', '5x rated current', 'fast trip test'],
  
  // ══════════════════════════════════════════════════════════════════════
  // SECTION 5: EICR & CONDITION REPORTS (60+ keywords)
  // ══════════════════════════════════════════════════════════════════════
  
  'eicr': ['electrical installation condition report', 'condition report', 'periodic inspection', 'EICR'],
  'condition': ['condition report', 'EICR', 'periodic inspection', 'installation condition'],
  'periodic': ['periodic inspection', 'EICR', 'condition report', 'reinspection'],
  'report': ['condition report', 'EICR', 'EIC', 'minor works certificate'],
  'certificate': ['EIC', 'EICR', 'minor works', 'certification', 'test certificate'],
  'eic': ['electrical installation certificate', 'EIC', 'new installation'],
  'minor': ['minor works certificate', 'MWC', 'small alterations'],
  'observation': ['observation code', 'defect', 'C1', 'C2', 'C3', 'FI'],
  'code': ['observation code', 'C1', 'C2', 'C3', 'FI', 'classification'],
  'c1': ['C1 code', 'danger present', 'immediate risk', 'immediately dangerous'],
  'c2': ['C2 code', 'potentially dangerous', 'urgent action required'],
  'c3': ['C3 code', 'improvement recommended', 'not dangerous'],
  'fi': ['FI code', 'further investigation', 'concealed', 'inaccessible'],
  'danger': ['danger present', 'C1', 'immediately dangerous', 'shock hazard'],
  'satisfactory': ['satisfactory', 'pass', 'compliant', 'acceptable'],
  'unsatisfactory': ['unsatisfactory', 'fail', 'non-compliant', 'defective'],
  
  // ══════════════════════════════════════════════════════════════════════
  // SECTION 6: CIRCUITS & LOADS (100+ keywords)
  // ══════════════════════════════════════════════════════════════════════
  
  // SOCKET CIRCUITS
  'socket': ['socket outlet', 'power socket', 'BS 1363', 'ring final', 'radial'],
  'outlet': ['socket outlet', 'BS 1363', 'switched socket', 'unswitched socket'],
  'radial': ['radial circuit', '20A radial', '32A radial', 'non-ring'],
  '32a': ['32A', 'ring final', 'cooker circuit', 'socket circuit'],
  '20a': ['20A', 'radial circuit', 'small radial'],
  
  // LIGHTING
  'light': ['lighting circuit', 'light fitting', 'luminaire', 'lighting'],
  'lighting': ['lighting circuit', '6A', 'B6 MCB', 'light fitting', 'luminaire'],
  'luminaire': ['light fitting', 'luminaire', 'lamp', 'LED'],
  '6a': ['6A', 'lighting circuit', 'B6 MCB'],
  'downlight': ['downlighter', 'recessed light', 'fire rated', 'IC rated'],
  'led': ['LED', 'LED driver', 'LED lighting', 'low energy'],
  
  // COOKER CIRCUITS
  'cooker': ['cooker circuit', 'cooker control unit', 'oven', 'hob', 'cooking appliance'],
  'oven': ['oven', 'cooker', 'built-in oven', 'cooking appliance'],
  'hob': ['hob', 'cooker hob', 'induction hob', 'ceramic hob'],
  'cooking': ['cooking appliance', 'cooker', 'hob', 'oven'],
  
  // SHOWER CIRCUITS
  'shower': ['electric shower', 'shower circuit', 'instantaneous shower', '10kW'],
  'electric': ['electric shower', 'electric heating', 'electric cooker'],
  'instantaneous': ['instantaneous shower', 'instant hot water', 'shower unit'],
  '8kw': ['8kW shower', 'shower rating', 'shower power'],
  '9kw': ['9kW shower', 'shower rating', 'shower power'],
  '10kw': ['10kW shower', 'shower rating', 'shower power'],
  
  // IMMERSION & WATER HEATING
  'immersion': ['immersion heater', 'hot water', '3kW', 'immersion circuit'],
  'water': ['water heater', 'immersion', 'unvented', 'hot water'],
  'heater': ['water heater', 'immersion heater', 'storage heater', 'panel heater'],
  'storage': ['storage heater', 'night storage', 'Economy 7'],
  
  // EV CHARGING
  'ev': ['electric vehicle', 'EV charger', 'EVCP', 'Section 722', 'charge point'],
  'charger': ['EV charger', 'charge point', 'EVCP', 'Mode 3'],
  'evcp': ['electric vehicle charge point', 'EV charger', 'Section 722'],
  'mode': ['Mode 2', 'Mode 3', 'Mode 4', 'charging mode'],
  '722': ['Section 722', 'EV requirements', 'electric vehicle'],
  
  // ══════════════════════════════════════════════════════════════════════
  // SECTION 7: SPECIAL LOCATIONS (80+ keywords)
  // ══════════════════════════════════════════════════════════════════════
  
  'bathroom': ['bathroom', 'Section 701', 'Zone 0', 'Zone 1', 'Zone 2', 'wet room'],
  '701': ['Section 701', 'bathroom', 'shower room', 'wet room'],
  'zone': ['Zone 0', 'Zone 1', 'Zone 2', 'bathroom zone', 'special location zone'],
  'zone0': ['Zone 0', 'inside bath', 'inside shower', 'water volume'],
  'zone1': ['Zone 1', 'above bath', 'shower area', 'IP44'],
  'zone2': ['Zone 2', 'outside zone 1', '0.6m zone', 'bathroom zone'],
  'ip': ['IP rating', 'IP44', 'IP65', 'IP66', 'ingress protection'],
  'ip44': ['IP44', 'Zone 1', 'splash proof'],
  'ip65': ['IP65', 'outdoor', 'jet proof', 'weatherproof'],
  'ip66': ['IP66', 'outdoor', 'high pressure', 'weatherproof'],
  
  // OUTDOOR
  'outdoor': ['outdoor installation', 'external', 'outside', 'weatherproof', 'Section 714'],
  'external': ['external installation', 'outdoor', 'outside', 'weather protection'],
  'garden': ['garden lighting', 'outdoor socket', 'garden circuit'],
  'buried': ['buried cable', 'underground', 'cable depth', 'armoured'],
  
  // SWIMMING POOLS
  'pool': ['swimming pool', 'Section 702', 'Zone 0', 'Zone 1', 'Zone 2', 'pool equipment'],
  '702': ['Section 702', 'swimming pool', 'pool area'],
  'swimming': ['swimming pool', 'Section 702', 'pool installation'],
  
  // CONSTRUCTION SITES
  'construction': ['construction site', 'Section 704', 'temporary installation', 'site supplies'],
  '704': ['Section 704', 'construction site', 'temporary'],
  'temporary': ['temporary installation', 'construction site', 'site supply'],
  
  // AGRICULTURAL
  'agricultural': ['agricultural', 'Section 705', 'farm installation', 'livestock'],
  '705': ['Section 705', 'agricultural', 'farm'],
  'farm': ['farm installation', 'agricultural', 'livestock', 'Section 705'],
  
  // SOLAR/PV
  'solar': ['solar PV', 'photovoltaic', 'Section 712', 'PV installation'],
  'pv': ['photovoltaic', 'solar PV', 'PV array', 'Section 712'],
  '712': ['Section 712', 'solar PV', 'photovoltaic'],
  'inverter': ['PV inverter', 'solar inverter', 'string inverter'],
  
  // ══════════════════════════════════════════════════════════════════════
  // SECTION 8: CONSUMER UNITS & DISTRIBUTION (60+ keywords)
  // ══════════════════════════════════════════════════════════════════════
  
  'consumer': ['consumer unit', 'CU', 'fuseboard', 'distribution board'],
  'cu': ['consumer unit', 'fuseboard', 'distribution board'],
  'board': ['distribution board', 'consumer unit', 'DB', 'fuseboard'],
  'distribution': ['distribution board', 'distribution circuit', 'submain', 'DB'],
  'fuseboard': ['fuseboard', 'consumer unit', 'fuse box', 'CU'],
  'db': ['distribution board', 'DB', 'sub-distribution', 'panelboard'],
  'metal': ['metal consumer unit', 'metalclad CU', 'Amendment 3'],
  'amendment': ['Amendment 3', 'metal CU', '17th Edition Amendment'],
  'submain': ['submain cable', 'sub-distribution', 'submain circuit'],
  'incomer': ['main incomer', 'supply incomer', 'incoming supply'],
  'isolator': ['isolator', 'main switch', 'isolation', 'disconnector'],
  'switch': ['main switch', 'isolator', 'switch disconnector'],
  'split': ['split load', 'dual RCD', 'split board'],
  'dual': ['dual RCD', 'split load', 'two RCDs'],
  
  // ══════════════════════════════════════════════════════════════════════
  // SECTION 9: REGULATIONS & PARTS (50+ keywords)
  // ══════════════════════════════════════════════════════════════════════
  
  'bs7671': ['BS 7671', 'wiring regulations', '18th Edition', 'IET regulations'],
  'bs': ['BS 7671', 'British Standard', 'BS EN'],
  '7671': ['BS 7671', 'wiring regulations', '18th Edition'],
  '18th': ['18th Edition', 'BS 7671', 'current edition'],
  'edition': ['18th Edition', 'edition', 'amendment'],
  'regulation': ['regulation', 'BS 7671', 'requirement', 'reg'],
  'reg': ['regulation', 'BS 7671 regulation', 'requirement'],
  'part': ['Part 1', 'Part 2', 'Part 4', 'Part 5', 'Part 6', 'Part 7'],
  'chapter': ['Chapter 41', 'Chapter 42', 'Chapter 43', 'Chapter 44', 'Chapter 52', 'Chapter 53', 'Chapter 54', 'Chapter 64'],
  'section': ['Section 701', 'Section 702', 'Section 722', 'BS 7671 section'],
  '411': ['411', 'automatic disconnection', 'ADS', 'shock protection'],
  '412': ['412', 'double insulation', 'Class II'],
  '421': ['421', 'fire protection', 'AFDD'],
  '422': ['422', 'fire propagation', 'cable selection'],
  '433': ['433', 'overcurrent protection', 'overload'],
  '434': ['434', 'short circuit protection', 'fault protection'],
  '443': ['443', 'overvoltage protection', 'SPD'],
  '52': ['Chapter 52', 'cable selection', 'cable installation'],
  '53': ['Chapter 53', 'protective devices', 'switchgear'],
  '54': ['Chapter 54', 'earthing', 'bonding'],
  '64': ['Chapter 64', 'initial verification', 'testing'],
  
  // ══════════════════════════════════════════════════════════════════════
  // SECTION 10: INSTALLATION METHODS (40+ keywords)
  // ══════════════════════════════════════════════════════════════════════
  
  'install': ['installation', 'installing', 'install', 'installation method'],
  'installation': ['installation method', 'wiring system', 'installation type'],
  'method': ['installation method', 'reference method', 'Table 4A method'],
  'reference': ['reference method', 'installation method', 'Table 4A'],
  'clipped': ['clipped direct', 'surface clipped', 'Method C'],
  'conduit': ['conduit', 'trunking', 'enclosed', 'containment'],
  'trunking': ['trunking', 'cable trunking', 'dado trunking', 'containment'],
  'enclosed': ['enclosed in wall', 'concealed', 'buried in wall'],
  'surface': ['surface mounted', 'surface wiring', 'clipped'],
  'concealed': ['concealed wiring', 'hidden', 'in wall', 'buried'],
  'cavity': ['cavity wall', 'partition wall', 'concealed cavity'],
  'thermal': ['thermal insulation', 'loft insulation', 'derating', 'Ci factor'],
  'grouped': ['grouped cables', 'bunched', 'grouping factor', 'Cg'],
  'ambient': ['ambient temperature', 'temperature correction', 'Ca'],
  
  // ══════════════════════════════════════════════════════════════════════
  // SECTION 11: FAULT FINDING (40+ keywords)
  // ══════════════════════════════════════════════════════════════════════
  
  'finding': ['fault finding', 'diagnosis', 'troubleshooting'],
  'diagnose': ['diagnosis', 'fault finding', 'troubleshoot'],
  'troubleshoot': ['troubleshooting', 'fault finding', 'diagnosis'],
  'nuisance': ['nuisance tripping', 'unwanted trip', 'spurious trip'],
  'tripping': ['tripping', 'nuisance trip', 'RCD trip', 'MCB trip'],
  'high': ['high reading', 'high Zs', 'high impedance', 'high resistance'],
  'low': ['low reading', 'low IR', 'low insulation', 'low resistance'],
  'fail': ['test failure', 'failed test', 'fail', 'unsatisfactory'],
  'intermittent': ['intermittent fault', 'occasional fault', 'comes and goes'],
  'burnt': ['burnt connection', 'overheating', 'thermal damage', 'scorch'],
  'loose': ['loose connection', 'loose terminal', 'high resistance joint'],
  'damaged': ['damaged cable', 'damaged insulation', 'physical damage'],
  'exposed': ['exposed conductor', 'exposed live', 'bare wire'],
  
  // ══════════════════════════════════════════════════════════════════════
  // SECTION 12: THREE PHASE (30+ keywords)
  // ══════════════════════════════════════════════════════════════════════
  
  '3phase': ['three phase', '400V', '415V', 'three-phase'],
  'three': ['three phase', '3-phase', '400V', 'three-phase supply'],
  '400v': ['400 volt', 'three phase voltage', 'line voltage'],
  '415v': ['415 volt', 'three phase', 'old voltage'],
  '230v': ['230 volt', 'single phase', 'line-neutral'],
  'l1': ['L1', 'phase 1', 'line 1', 'brown'],
  'l2': ['L2', 'phase 2', 'line 2', 'black'],
  'l3': ['L3', 'phase 3', 'line 3', 'grey'],
  'neutral': ['neutral', 'N', 'blue conductor', 'return'],
  'motor': ['motor circuit', 'motor starter', 'DOL', 'star delta'],
  'dol': ['direct on line', 'DOL starter', 'motor starting'],
  'star': ['star delta', 'Y-Δ', 'motor starting'],
  'delta': ['star delta', 'delta connection', 'motor starting'],
  'balance': ['phase balance', 'load balance', 'neutral current'],
  
  // ══════════════════════════════════════════════════════════════════════
  // SECTION 13: SAFETY & ISOLATION (30+ keywords)
  // ══════════════════════════════════════════════════════════════════════
  
  'safe': ['safe isolation', 'safety', 'safe working'],
  'isolation': ['safe isolation', 'isolate', 'lock off', 'isolation procedure'],
  'isolate': ['isolate', 'safe isolation', 'switch off', 'de-energise'],
  'lock': ['lock off', 'lockout', 'isolation lock', 'padlock'],
  'lockout': ['lockout tagout', 'LOTO', 'lock off', 'isolation'],
  'dead': ['dead testing', 'de-energised', 'proven dead', 'dead working'],
  'prove': ['prove dead', 'voltage indicator', 'test lamp', 'proving unit'],
  'indicator': ['voltage indicator', 'GS38', 'test leads'],
  'gs38': ['GS38', 'test leads', 'probes', 'safe testing'],
  'live': ['live working', 'energised', 'live testing', 'AC present'],
  'shock': ['electric shock', 'shock hazard', 'touch voltage'],
  'touch': ['touch voltage', 'shock hazard', 'fault voltage'],
  
  // ══════════════════════════════════════════════════════════════════════
  // SECTION 14: COMMON QUESTIONS (40+ keywords)
  // ══════════════════════════════════════════════════════════════════════
  
  'how': ['how to', 'how do I', 'procedure', 'method'],
  'what': ['what is', 'what does', 'definition', 'explain'],
  'why': ['why', 'reason', 'purpose', 'explanation'],
  'when': ['when to', 'when should', 'timing', 'requirement'],
  'can': ['can I', 'is it allowed', 'permitted', 'acceptable'],
  'need': ['need to', 'required', 'necessary', 'must'],
  'require': ['required', 'requirement', 'mandatory', 'necessary'],
  'allow': ['allowed', 'permitted', 'acceptable', 'compliant'],
  'compliant': ['compliant', 'compliance', 'meets regulations', 'BS 7671 compliant'],
  'maximum': ['maximum', 'max', 'limit', 'not exceed'],
  'minimum': ['minimum', 'min', 'at least', 'not less than'],
  'distance': ['distance', 'spacing', 'separation', 'clearance'],
  'depth': ['cable depth', 'burial depth', 'cover depth'],
  'safe': ['safe', 'safety', 'safe working', 'safe isolation'],
  'correct': ['correct', 'proper', 'right way', 'compliant'],
  'best': ['best practice', 'recommended', 'preferred method'],
  'difference': ['difference between', 'comparison', 'versus'],
  'between': ['difference between', 'comparison', 'versus'],
  'choose': ['choose', 'select', 'which one', 'decision'],
  'select': ['select', 'selection', 'choose', 'pick'],
  'which': ['which', 'what type', 'which one'],
};

/**
 * Extract and expand keywords from user's electrical query
 * Performance: <5ms for typical queries
 */
export function extractChatKeywords(query: string): string[] {
  // Tokenise and clean
  const tokens = query.toLowerCase()
    .replace(/[^\w\s\d.%]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1);
  
  const expanded = new Set<string>();
  
  // Add base tokens
  tokens.forEach(t => expanded.add(t));
  
  // Expand each token using dictionary
  for (const token of tokens) {
    const expansions = CHAT_KEYWORD_EXPANSIONS[token];
    if (expansions) {
      expansions.forEach(kw => expanded.add(kw.toLowerCase()));
    }
    
    // Also check for partial matches on longer terms
    if (token.length >= 4) {
      for (const [key, values] of Object.entries(CHAT_KEYWORD_EXPANSIONS)) {
        if (key.includes(token) || token.includes(key)) {
          values.forEach(kw => expanded.add(kw.toLowerCase()));
        }
      }
    }
  }
  
  // Return capped at 50 keywords for optimal GIN performance
  return Array.from(expanded).slice(0, 50);
}
