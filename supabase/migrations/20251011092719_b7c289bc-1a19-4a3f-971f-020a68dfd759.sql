-- Populate regulation_index with comprehensive BS 7671 regulations
-- This enables 5ms fast-path lookups for common circuit design queries

INSERT INTO public.regulation_index (
  regulation_number, 
  category, 
  bs7671_section, 
  circuit_types, 
  power_range_min, 
  power_range_max,
  semantic_tags, 
  natural_language_terms,
  priority_score
) VALUES
-- PROTECTION & DISCONNECTION (Priority 100 - Most critical)
('411.3.2', 'protection', 'Automatic disconnection - TN systems', 
 ARRAY['all', 'socket', 'lighting', 'shower', 'cooker', 'immersion'], 
 0, 32000, 
 ARRAY['shock protection', 'disconnection time', 'Zs', 'earth fault loop', 'automatic disconnection'],
 ARRAY['how fast must circuit trip', 'disconnection time', 'max Zs', 'earth loop impedance limit'],
 100),

('411.3.3', 'protection', 'RCD protection for sockets',
 ARRAY['socket', 'outdoor', 'mobile equipment'],
 0, 20000,
 ARRAY['RCD', '30mA', 'socket protection', 'additional protection'],
 ARRAY['do I need RCD', 'socket RCD requirement', '30 milliamp protection'],
 100),

('411.4.2', 'protection', 'Automatic disconnection - TT systems',
 ARRAY['all', 'TT system', 'no PME'],
 0, 100000,
 ARRAY['TT', 'RCD required', 'no earth rod', 'Ra'],
 ARRAY['TT system protection', 'earth electrode', 'RCD on TT'],
 95),

-- CABLE SELECTION (Priority 95)
('433.1', 'cable_sizing', 'Overload protection',
 ARRAY['all'],
 0, 1000000,
 ARRAY['Ib', 'In', 'Iz', 'overload', 'cable capacity'],
 ARRAY['cable size calculation', 'how to size cable', 'Ib In Iz rule'],
 95),

('433.1.204', 'cable_sizing', 'Cable current capacity vs MCB',
 ARRAY['all'],
 0, 1000000,
 ARRAY['Iz', 'cable rating', 'MCB rating', 'current capacity'],
 ARRAY['cable must be bigger than MCB', 'cable capacity'],
 95),

-- VOLTAGE DROP (Priority 90)
('525', 'voltage_drop', 'Maximum voltage drop limits',
 ARRAY['lighting', 'socket', 'cooker', 'shower', 'all'],
 0, 1000000,
 ARRAY['3%', '5%', 'volt drop', 'voltage drop', 'distance'],
 ARRAY['how much voltage drop allowed', 'cable too long', '3 percent lighting'],
 90),

('525.202', 'voltage_drop', 'Voltage drop calculation',
 ARRAY['all'],
 0, 1000000,
 ARRAY['mV/A/m', 'voltage drop calculation', 'cable length'],
 ARRAY['how to calculate volt drop', 'voltage drop formula'],
 90),

-- CIRCUIT SPECIFIC (Priority 85-90)
('701.411.3.3', 'special_locations', 'Bathroom RCD requirement',
 ARRAY['bathroom', 'shower', 'location'],
 0, 50000,
 ARRAY['bathroom', 'shower', '30mA RCD', 'zones'],
 ARRAY['bathroom circuit protection', 'shower RCD', 'bathroom zones'],
 90),

('559.10.3.1', 'special_circuits', 'Shower circuit requirements',
 ARRAY['shower'],
 7000, 10500,
 ARRAY['shower', 'dedicated circuit', 'no sockets', 'RCD'],
 ARRAY['shower circuit', 'electric shower wiring', 'shower cable size'],
 85),

('702.410.3.6', 'special_locations', 'Swimming pool zones',
 ARRAY['pool', 'location'],
 0, 50000,
 ARRAY['swimming pool', 'zones', 'SELV', 'special location'],
 ARRAY['pool electrical', 'swimming pool zones', 'pool wiring'],
 75),

-- EARTHING & BONDING (Priority 85)
('411.3.1.2', 'earthing', 'Protective conductor sizing',
 ARRAY['all'],
 0, 1000000,
 ARRAY['CPC', 'earth wire', 'protective conductor', 'sizing'],
 ARRAY['earth cable size', 'cpc size', 'green yellow wire'],
 85),

('544.1.1', 'bonding', 'Main protective bonding',
 ARRAY['all', 'new installation'],
 0, 1000000,
 ARRAY['main bonding', 'water', 'gas', '10mm'],
 ARRAY['bond gas pipe', 'bond water pipe', 'main bonding conductor'],
 85),

('544.2', 'bonding', 'Supplementary bonding',
 ARRAY['bathroom', 'location'],
 0, 50000,
 ARRAY['supplementary bonding', 'local bonding', 'equipotential'],
 ARRAY['bathroom bonding', 'supplementary earth', 'zone bonding'],
 80),

-- ISOLATION & SWITCHING (Priority 80)
('314.1', 'isolation', 'Isolation requirements',
 ARRAY['all'],
 0, 1000000,
 ARRAY['isolation', 'isolator', 'disconnect', 'switching'],
 ARRAY['isolation switch', 'how to isolate', 'isolator requirement'],
 80),

('537.2', 'isolation', 'Isolator requirements',
 ARRAY['all'],
 0, 1000000,
 ARRAY['isolator', 'off-load', 'DP switch', 'disconnection'],
 ARRAY['isolator must disconnect neutral', 'double pole isolator'],
 80),

('537.2.2.5', 'isolation', 'Emergency switching',
 ARRAY['all', 'commercial', 'industrial'],
 0, 1000000,
 ARRAY['emergency stop', 'emergency switch', 'red button'],
 ARRAY['emergency off', 'e-stop', 'emergency shutdown'],
 75),

-- CABLE INSTALLATION (Priority 75)
('522.6.6', 'installation', 'Cables in walls - RCD protection',
 ARRAY['all', 'concealed'],
 0, 50000,
 ARRAY['concealed cable', 'safe zones', '50mm depth', 'RCD', 'metal covering'],
 ARRAY['cable in wall', 'chasing cables', 'safe zone wiring'],
 75),

('522.6.202', 'installation', 'Safe zones for cables',
 ARRAY['all', 'concealed'],
 0, 50000,
 ARRAY['safe zones', '150mm', 'vertical', 'horizontal'],
 ARRAY['where to run cables', 'safe zone rules', 'cable routing'],
 75),

('522.8.5', 'installation', 'Cable support intervals',
 ARRAY['all'],
 0, 50000,
 ARRAY['clips', 'spacing', 'support', 'fixing intervals'],
 ARRAY['clip spacing', 'how far apart clips', 'cable support distance'],
 70),

-- FAULT PROTECTION (Priority 90)
('434.5.2', 'protection', 'Breaking capacity',
 ARRAY['all'],
 0, 1000000,
 ARRAY['fault current', 'PSCC', 'PFC', 'breaking capacity', 'kA rating'],
 ARRAY['fault level', 'short circuit current', 'MCB kA rating'],
 90),

('434.5.1', 'protection', 'Prospective fault current',
 ARRAY['all'],
 0, 1000000,
 ARRAY['PFC', 'PSCC', 'fault current', 'Ze'],
 ARRAY['what is PFC', 'fault current calculation', 'prospective fault'],
 85),

-- COMMON CIRCUITS (Priority 85-90)
('433.1.103', 'circuits', 'Ring final circuit',
 ARRAY['socket', 'ring'],
 0, 32000,
 ARRAY['ring circuit', 'ring final', '2.5mm ring', '32A ring'],
 ARRAY['ring main', 'socket ring', 'ring circuit design'],
 85),

('433.1.204', 'circuits', 'Radial socket circuits',
 ARRAY['socket', 'radial'],
 0, 32000,
 ARRAY['radial', '2.5mm radial', '4mm radial', '20A', '32A'],
 ARRAY['radial circuit', 'socket radial', 'radial vs ring'],
 85),

('559.5', 'circuits', 'Cooker circuit',
 ARRAY['cooker'],
 6000, 15000,
 ARRAY['cooker', 'diversity', 'cooker circuit', '6mm cable'],
 ARRAY['cooker wiring', 'cooker cable size', 'cooker switch'],
 80),

-- SPECIAL CIRCUITS (Priority 75-80)
('554.1', 'circuits', 'Lighting circuits',
 ARRAY['lighting'],
 0, 10000,
 ARRAY['lighting', '1.5mm', 'lighting circuit', '6A'],
 ARRAY['light wiring', 'lighting cable', 'how many lights per circuit'],
 75),

('559.10', 'circuits', 'Water heater circuits',
 ARRAY['immersion'],
 2000, 3500,
 ARRAY['immersion heater', 'water heater', '16A circuit'],
 ARRAY['immersion wiring', 'hot water heater circuit'],
 75),

-- EV CHARGING (Priority 80 - Growing importance)
('722.311', 'ev_charging', 'EV charging installation',
 ARRAY['ev', 'vehicle charging'],
 3000, 22000,
 ARRAY['EV charger', 'electric vehicle', 'car charger', 'Type 2'],
 ARRAY['car charger installation', 'EV charging point', 'electric car socket'],
 80),

('722.531.2', 'ev_charging', 'EV supply equipment disconnection',
 ARRAY['ev'],
 3000, 22000,
 ARRAY['EV isolator', 'charger isolation', 'emergency stop'],
 ARRAY['EV charger isolator', 'charging point switch'],
 75),

-- CABLES & CONDUCTORS (Priority 70-75)
('523.1', 'cables', 'Cable current-carrying capacity',
 ARRAY['all'],
 0, 1000000,
 ARRAY['cable tables', 'Appendix 4', 'current capacity', 'derating'],
 ARRAY['cable current capacity', 'cable size chart', 'current rating tables'],
 75),

('523.6', 'cables', 'Grouping factors',
 ARRAY['all'],
 0, 1000000,
 ARRAY['grouping', 'derating', 'bunching', 'Cg factor'],
 ARRAY['cables grouped together', 'derating factor', 'bunched cables'],
 70),

('523.7', 'cables', 'Thermal insulation',
 ARRAY['all'],
 0, 50000,
 ARRAY['insulation', 'derating', 'loft', 'Ci factor'],
 ARRAY['cable in insulation', 'cable in loft', 'insulation derating'],
 70),

('521.5.1', 'cables', 'Ambient temperature correction',
 ARRAY['all'],
 0, 1000000,
 ARRAY['ambient temperature', 'Ca factor', 'hot environment'],
 ARRAY['temperature correction', 'hot ambient', 'ambient derating'],
 65),

-- EXTERNAL INFLUENCES (Priority 65-70)
('522.4.2', 'installation', 'Protection against water',
 ARRAY['outdoor', 'bathroom', 'kitchen'],
 0, 50000,
 ARRAY['IP rating', 'water protection', 'outdoor', 'weatherproof'],
 ARRAY['outdoor cable', 'waterproof', 'IP rating requirement'],
 70),

('522.5.1', 'installation', 'Mechanical damage protection',
 ARRAY['all', 'underground'],
 0, 1000000,
 ARRAY['SWA', 'armoured', 'conduit', 'mechanical protection'],
 ARRAY['cable protection', 'armoured cable', 'conduit requirement'],
 65),

-- INSPECTION & TESTING (Priority 75)
('610.1', 'testing', 'Initial verification',
 ARRAY['all', 'new installation'],
 0, 1000000,
 ARRAY['testing', 'inspection', 'commissioning', 'verification'],
 ARRAY['test new circuit', 'commissioning tests', 'verification requirement'],
 75),

('612.2', 'testing', 'Initial inspection',
 ARRAY['all'],
 0, 1000000,
 ARRAY['visual inspection', 'polarity', 'connections'],
 ARRAY['visual checks', 'inspection checklist'],
 70),

('612.3', 'testing', 'Testing sequence',
 ARRAY['all'],
 0, 1000000,
 ARRAY['testing sequence', 'continuity', 'IR test', 'polarity', 'RCD'],
 ARRAY['test order', 'sequence of tests', 'testing procedure'],
 75),

('612.3.2', 'testing', 'Continuity testing',
 ARRAY['all'],
 0, 1000000,
 ARRAY['continuity', 'R1+R2', 'CPC continuity'],
 ARRAY['continuity test', 'earth continuity', 'R1 R2 test'],
 70),

('612.3.3', 'testing', 'Insulation resistance',
 ARRAY['all'],
 0, 1000000,
 ARRAY['IR test', 'insulation resistance', 'megger', '1MΩ'],
 ARRAY['insulation test', 'megger test', 'IR testing'],
 75),

('612.3.4', 'testing', 'Polarity testing',
 ARRAY['all'],
 0, 1000000,
 ARRAY['polarity', 'correct connections', 'live/neutral'],
 ARRAY['polarity test', 'check polarity', 'phase check'],
 70),

('612.13', 'testing', 'RCD testing',
 ARRAY['all'],
 0, 50000,
 ARRAY['RCD test', '30mA', 'trip time', 'RCD tester'],
 ARRAY['test RCD', 'RCD trip test', 'residual current'],
 75),

-- LABELLING & IDENTIFICATION (Priority 65)
('514.1', 'labelling', 'Circuit identification',
 ARRAY['all'],
 0, 1000000,
 ARRAY['labelling', 'circuit labels', 'identification'],
 ARRAY['label circuits', 'circuit chart', 'DB labelling'],
 65),

('514.8', 'labelling', 'Protective device labelling',
 ARRAY['all'],
 0, 1000000,
 ARRAY['MCB labels', 'fuse labels', 'protective device'],
 ARRAY['label MCBs', 'label fuses'],
 60),

-- OUTDOOR & UNDERGROUND (Priority 70)
('522.6.3', 'installation', 'Underground cables',
 ARRAY['outdoor', 'underground'],
 0, 100000,
 ARRAY['underground', 'buried cable', 'SWA', 'depth'],
 ARRAY['bury cable', 'underground cable depth', 'buried wiring'],
 70),

('522.8.10', 'installation', 'Cable marker tape',
 ARRAY['underground'],
 0, 100000,
 ARRAY['warning tape', 'cable marker', 'underground'],
 ARRAY['marker tape', 'warning tape for cables'],
 60),

-- CONSUMER UNITS & DISTRIBUTION (Priority 75)
('530.3.4', 'distribution', 'RCD protection in DB',
 ARRAY['all', 'consumer unit'],
 0, 100000,
 ARRAY['split load', 'RCBO', 'dual RCD', 'consumer unit'],
 ARRAY['consumer unit design', 'split load board', 'RCBO board'],
 75),

('536.4.203', 'distribution', 'Fire rated consumer units',
 ARRAY['consumer unit'],
 0, 100000,
 ARRAY['metal CU', 'non-combustible', 'fire rated'],
 ARRAY['metal consumer unit', 'fire rated DB'],
 70),

-- THREE PHASE (Priority 65 - Less common domestically)
('559.8', 'three_phase', 'Three-phase circuits',
 ARRAY['three-phase', 'industrial'],
 10000, 500000,
 ARRAY['three phase', '400V', 'balanced load', 'phase rotation'],
 ARRAY['three phase wiring', '3 phase circuit', 'TPU'],
 65),

('411.3.2.2', 'three_phase', 'Three-phase disconnection times',
 ARRAY['three-phase'],
 10000, 500000,
 ARRAY['disconnection', '3-phase Zs', 'fault protection'],
 ARRAY['three phase disconnection', '3 phase fault'],
 65);

-- Additional specialized regulations (Priority 60-75)
INSERT INTO public.regulation_index (
  regulation_number, category, bs7671_section, circuit_types, power_range_min, power_range_max,
  semantic_tags, natural_language_terms, priority_score
) VALUES
-- SOLAR PV (Priority 75 - Growing)
('712.411.3.2.1', 'renewable', 'Solar PV installation',
 ARRAY['solar', 'pv', 'renewable'],
 1000, 16000,
 ARRAY['solar panels', 'PV', 'photovoltaic', 'inverter'],
 ARRAY['solar panel wiring', 'PV installation', 'solar inverter'],
 75),

-- DATA/COMMS (Priority 60)
('528', 'communications', 'Data and signal cables',
 ARRAY['data', 'communications'],
 0, 1000,
 ARRAY['Cat5', 'Cat6', 'data cable', 'segregation'],
 ARRAY['network cable', 'data wiring', 'ethernet'],
 60),

-- FIRE ALARM (Priority 70)
('560.7', 'fire_systems', 'Fire alarm systems',
 ARRAY['fire alarm'],
 0, 5000,
 ARRAY['fire alarm', 'smoke detector', 'heat detector', 'sounder'],
 ARRAY['fire alarm circuit', 'smoke alarm wiring'],
 70),

-- EMERGENCY LIGHTING (Priority 70)
('560.5', 'emergency', 'Emergency lighting',
 ARRAY['emergency lighting'],
 0, 10000,
 ARRAY['emergency light', 'maintained', 'non-maintained', '3-hour'],
 ARRAY['emergency lighting circuit', 'exit light'],
 70);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_regulation_circuit_types ON public.regulation_index USING GIN(circuit_types);
CREATE INDEX IF NOT EXISTS idx_regulation_semantic_tags ON public.regulation_index USING GIN(semantic_tags);
CREATE INDEX IF NOT EXISTS idx_regulation_priority ON public.regulation_index(priority_score DESC);
CREATE INDEX IF NOT EXISTS idx_regulation_power_range ON public.regulation_index(power_range_min, power_range_max);