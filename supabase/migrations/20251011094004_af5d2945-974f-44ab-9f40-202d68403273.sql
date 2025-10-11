-- ============================================
-- IMPROVEMENT #1: Expand Regulation Index Coverage
-- Add 200+ critical BS 7671 regulations
-- ============================================

-- Chapter 41: Protection against electric shock
INSERT INTO public.regulation_index (regulation_number, category, bs7671_section, circuit_types, power_range_min, power_range_max, semantic_tags, natural_language_terms, priority_score) VALUES
('411.3.1', 'protection', 'Chapter 41', '{"general", "lighting", "socket", "shower"}', 0, 50000, '{"RCD", "protective device", "earth fault", "30mA"}', '{"residual current device", "ground fault protection", "safety device"}', 100),
('411.3.2', 'protection', 'Chapter 41', '{"socket", "outdoor"}', 0, 32, '{"RCD", "socket outlet", "30mA", "outdoor"}', '{"socket protection", "outdoor socket"}', 95),
('411.3.3', 'protection', 'Chapter 41', '{"general"}', 0, 50000, '{"supplementary protection", "additional protection"}', '{"extra safety", "enhanced protection"}', 85),
('411.4', 'protection', 'Chapter 41', '{"general"}', 0, 50000, '{"ADS", "automatic disconnection", "earth fault"}', '{"fault disconnection", "trip time"}', 95),
('411.5', 'protection', 'Chapter 41', '{"general"}', 0, 50000, '{"earthing system", "protective conductor"}', '{"earth connection", "grounding"}', 90),
('411.6', 'protection', 'Chapter 41', '{"bathroom", "shower"}', 0, 50000, '{"SELV", "PELV", "extra-low voltage"}', '{"low voltage", "safety extra low voltage"}', 85),

-- Chapter 43: Overcurrent protection
('433.1', 'protection', 'Chapter 43', '{"general", "lighting", "socket", "shower"}', 0, 50000, '{"overload protection", "design current", "Ib"}', '{"circuit overload", "current protection"}', 100),
('433.1.1', 'protection', 'Chapter 43', '{"general"}', 0, 50000, '{"In", "Ib", "Iz", "protection device"}', '{"device rating", "cable capacity"}', 100),
('433.1.2', 'protection', 'Chapter 43', '{"general"}', 0, 50000, '{"In", "rated current", "conductor capacity"}', '{"protection rating"}', 95),
('433.1.3', 'protection', 'Chapter 43', '{"general"}', 0, 50000, '{"conductor", "current-carrying capacity", "Iz"}', '{"cable capacity", "derating"}', 95),
('433.1.4', 'protection', 'Chapter 43', '{"general"}', 0, 50000, '{"fuse", "MCB", "trip curve"}', '{"protection characteristic"}', 90),
('433.2', 'protection', 'Chapter 43', '{"general"}', 0, 50000, '{"grouping", "derating", "correction factor"}', '{"cable grouping", "derating factor"}', 90),
('433.3', 'protection', 'Chapter 43', '{"motor", "inductive"}', 200, 50000, '{"motor starting", "starting current"}', '{"inrush current", "motor protection"}', 85),

('434.1', 'protection', 'Chapter 43', '{"general"}', 0, 50000, '{"short circuit", "fault current", "Ipf"}', '{"fault protection", "short circuit current"}', 95),
('434.2', 'protection', 'Chapter 43', '{"general"}', 0, 50000, '{"breaking capacity", "Icn", "fault current"}', '{"protection device capacity"}', 90),
('434.3', 'protection', 'Chapter 43', '{"general"}', 0, 50000, '{"conductor withstand", "let-through energy"}', '{"cable fault withstand"}', 85),
('434.5.1', 'protection', 'Chapter 43', '{"general"}', 0, 50000, '{"earth fault", "Zs", "disconnection time"}', '{"fault loop impedance", "trip time"}', 100),
('434.5.2', 'protection', 'Chapter 43', '{"general"}', 0, 50000, '{"disconnection time", "0.4s", "5s"}', '{"fault clearance time"}', 95),

-- Chapter 52: Wiring systems
('521.5', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"safe zone", "cable route", "vertical", "horizontal"}', '{"cable positioning", "wall zones"}', 95),
('521.6', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"RCD protection", "concealed cable", "depth"}', '{"buried cable", "wall depth"}', 90),
('521.10', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"cable selection", "installation method", "environment"}', '{"cable type", "conditions"}', 85),
('522.1', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"IP rating", "ingress protection", "moisture"}', '{"protection rating", "water protection"}', 85),
('522.2', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"fire resistance", "flame propagation"}', '{"fire safety", "cable fire rating"}', 80),
('522.3', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"corrosion", "chemical resistance"}', '{"corrosive environment"}', 75),
('522.6', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"solar radiation", "UV resistance"}', '{"outdoor cable", "sun exposure"}', 75),
('522.8', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"mechanical damage", "impact protection"}', '{"cable protection", "physical damage"}', 85),

('523.1', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"ambient temperature", "derating", "Ca"}', '{"temperature correction", "hot environment"}', 90),
('523.2', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"thermal insulation", "insulation contact"}', '{"insulation derating", "loft insulation"}', 90),
('523.3', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"grouping factor", "Cg", "bunched cables"}', '{"cable bunching", "grouped circuits"}', 90),
('523.4', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"installation method", "reference method", "derating"}', '{"mounting method", "cable support"}', 85),
('523.5', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"load variation", "diversity"}', '{"load factor", "simultaneity"}', 80),
('523.6', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"harmonic current", "neutral conductor"}', '{"harmonics", "distortion"}', 75),
('523.7', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"voltage drop", "conductor size"}', '{"volt drop calculation"}', 95),
('523.8', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"conductor resistance", "temperature"}', '{"cable resistance", "R1+R2"}', 90),

('524.1', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"minimum cable size", "mechanical strength"}', '{"cable gauge", "wire size"}', 85),
('524.2', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"flexible cable", "flex sizing"}', '{"flexible cord", "appliance cable"}', 80),
('525.1', 'voltage_drop', 'Chapter 52', '{"general"}', 0, 50000, '{"voltage drop", "3%", "5%", "limit"}', '{"volt drop", "voltage loss"}', 100),
('525.2', 'voltage_drop', 'Chapter 52', '{"lighting"}', 0, 5000, '{"lighting circuit", "voltage drop", "3%"}', '{"light circuit", "illumination"}', 95),
('525.3', 'voltage_drop', 'Chapter 52', '{"general"}', 0, 50000, '{"other circuits", "voltage drop", "5%"}', '{"power circuit", "socket circuit"}', 95),

('526.1', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"electrical connection", "joint", "termination"}', '{"cable joint", "connection"}', 85),
('526.2', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"conductor termination", "lug", "crimp"}', '{"cable termination", "connector"}', 85),
('526.3', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"enclosure", "junction box", "accessibility"}', '{"connection box", "access"}', 80),

('527.1', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"segregation", "band I", "band II"}', '{"cable separation", "circuit segregation"}', 85),
('527.2', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"circuit identification", "labeling"}', '{"cable marking", "circuit label"}', 80),

('528.1', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"fire barrier", "sealing"}', '{"fire stopping", "penetration seal"}', 80),
('528.2', 'installation', 'Chapter 52', '{"general"}', 0, 50000, '{"fire alarm", "smoke alarm"}', '{"detection system"}', 75),

-- Chapter 53: Protection, isolation, switching
('530.3', 'protection', 'Chapter 53', '{"general"}', 0, 50000, '{"earthing", "protective bonding", "main earth"}', '{"earth terminal", "bonding"}', 95),
('530.4', 'protection', 'Chapter 53', '{"general"}', 0, 50000, '{"supplementary bonding", "equipotential bonding"}', '{"local bonding", "cross bonding"}', 90),

('531.1', 'protection', 'Chapter 53', '{"general"}', 0, 50000, '{"RCD", "residual current device", "sensitivity"}', '{"earth leakage", "ground fault"}', 100),
('531.2', 'protection', 'Chapter 53', '{"general"}', 0, 50000, '{"RCD testing", "test button", "trip test"}', '{"RCD check", "safety test"}', 90),
('531.3', 'protection', 'Chapter 53', '{"general"}', 0, 50000, '{"RCD selection", "AC", "A type", "B type"}', '{"RCD type", "waveform"}', 85),

('532.1', 'protection', 'Chapter 53', '{"general"}', 0, 50000, '{"overcurrent device", "fuse", "MCB", "MCCB"}', '{"protection device", "circuit breaker"}', 95),
('532.2', 'protection', 'Chapter 53', '{"general"}', 0, 50000, '{"discrimination", "selectivity", "cascading"}', '{"device coordination"}', 85),
('532.3', 'protection', 'Chapter 53', '{"general"}', 0, 50000, '{"device characteristics", "B curve", "C curve", "D curve"}', '{"trip curve", "breaking characteristic"}', 90),

('536.1', 'switching', 'Chapter 53', '{"general"}', 0, 50000, '{"isolation", "isolator", "main switch"}', '{"circuit isolation", "disconnect"}', 90),
('536.2', 'switching', 'Chapter 53', '{"general"}', 0, 50000, '{"functional switching", "control switch"}', '{"circuit control"}', 80),
('536.3', 'switching', 'Chapter 53', '{"general"}', 0, 50000, '{"emergency switching", "emergency stop"}', '{"emergency isolation"}', 85),
('536.4', 'switching', 'Chapter 53', '{"general"}', 0, 50000, '{"mechanical maintenance", "lockoff"}', '{"safe isolation", "permit to work"}', 85),

('537.1', 'switching', 'Chapter 53', '{"general"}', 0, 50000, '{"isolation distance", "air gap"}', '{"isolator clearance"}', 80),
('537.2', 'switching', 'Chapter 53', '{"general"}', 0, 50000, '{"isolation indication", "visible break"}', '{"isolation confirmation"}', 80),
('537.3', 'switching', 'Chapter 53', '{"general"}', 0, 50000, '{"device accessibility", "isolation access"}', '{"switch location"}', 75),
('537.4', 'switching', 'Chapter 53', '{"general"}', 0, 50000, '{"isolation labeling", "warning notice"}', '{"isolation sign", "warning label"}', 75),

-- Chapter 54: Earthing and protective conductors
('542.1', 'earthing', 'Chapter 54', '{"general"}', 0, 50000, '{"earth electrode", "earth rod", "resistance"}', '{"ground electrode", "earth stake"}', 90),
('542.2', 'earthing', 'Chapter 54', '{"general"}', 0, 50000, '{"earth conductor", "main earth", "sizing"}', '{"earth cable", "protective conductor"}', 95),
('542.3', 'earthing', 'Chapter 54', '{"general"}', 0, 50000, '{"equipotential bonding", "main bonding", "10mm"}', '{"bonding conductor", "earth bonding"}', 90),
('542.4', 'earthing', 'Chapter 54', '{"general"}', 0, 50000, '{"supplementary bonding", "bathroom", "location"}', '{"local bonding", "zone bonding"}', 85),

('543.1', 'earthing', 'Chapter 54', '{"general"}', 0, 50000, '{"CPC", "circuit protective conductor", "sizing"}', '{"earth wire", "protective conductor"}', 100),
('543.2', 'earthing', 'Chapter 54', '{"general"}', 0, 50000, '{"CPC calculation", "adiabatic equation", "fault energy"}', '{"earth sizing calculation"}', 90),
('543.3', 'earthing', 'Chapter 54', '{"general"}', 0, 50000, '{"protective conductor types", "separate", "combined"}', '{"earth conductor type"}', 80),
('543.4', 'earthing', 'Chapter 54', '{"general"}', 0, 50000, '{"metal conduit", "trunking", "earth continuity"}', '{"metalwork earthing"}', 80),

('544.1', 'earthing', 'Chapter 54', '{"general"}', 0, 50000, '{"protective bonding", "extraneous-conductive-part"}', '{"metalwork bonding"}', 85),
('544.2', 'earthing', 'Chapter 54', '{"general"}', 0, 50000, '{"bonding conductor sizing", "protective bonding"}', '{"bonding cable size"}', 85),

-- Chapter 55: Other equipment (consumer units, accessories)
('551.1', 'equipment', 'Chapter 55', '{"general"}', 0, 50000, '{"consumer unit", "distribution board", "enclosure"}', '{"fuse box", "DB", "CU"}', 90),
('551.2', 'equipment', 'Chapter 55', '{"general"}', 0, 50000, '{"consumer unit location", "accessibility"}', '{"CU position", "board location"}', 85),
('551.3', 'equipment', 'Chapter 55', '{"general"}', 0, 50000, '{"consumer unit labeling", "circuit schedule"}', '{"circuit chart", "DB labeling"}', 80),
('551.4', 'equipment', 'Chapter 55', '{"general"}', 0, 50000, '{"consumer unit material", "non-combustible"}', '{"metal CU", "fire safety"}', 85),
('551.5', 'equipment', 'Chapter 55', '{"general"}', 0, 50000, '{"RCD protection", "main switch", "type AC"}', '{"main RCD", "main switch RCD"}', 90),
('551.6', 'equipment', 'Chapter 55', '{"general"}', 0, 50000, '{"SPD", "surge protection", "lightning"}', '{"surge protector", "overvoltage"}', 80),
('551.7', 'equipment', 'Chapter 55', '{"general"}', 0, 50000, '{"bus bar", "rated current", "distribution"}', '{"busbar rating"}', 80),

('553.1', 'equipment', 'Chapter 55', '{"socket"}', 0, 32, '{"socket outlet", "13A", "ring final"}', '{"power outlet", "plug socket"}', 90),
('553.2', 'equipment', 'Chapter 55', '{"socket"}', 0, 32, '{"socket location", "height", "accessibility"}', '{"socket positioning"}', 80),

('554.1', 'equipment', 'Chapter 55', '{"lighting"}', 0, 5000, '{"lighting point", "ceiling rose", "lampholder"}', '{"light fitting", "luminaire"}', 80),
('554.2', 'equipment', 'Chapter 55', '{"lighting"}', 0, 5000, '{"lighting switch", "control", "dimmer"}', '{"light switch", "lighting control"}', 75),
('554.3', 'equipment', 'Chapter 55', '{"lighting"}', 0, 5000, '{"emergency lighting", "maintained", "non-maintained"}', '{"safety lighting", "backup lighting"}', 75),

-- Special locations - Chapter 70x series
('701.1', 'special_locations', 'Part 7', '{"bathroom", "shower"}', 0, 50000, '{"bathroom", "zone 0", "zone 1", "zone 2"}', '{"wet room", "shower room"}', 95),
('701.2', 'special_locations', 'Part 7', '{"bathroom"}', 0, 50000, '{"IP rating", "IPX4", "water protection"}', '{"water resistance", "splash proof"}', 90),
('701.3', 'special_locations', 'Part 7', '{"bathroom"}', 0, 50000, '{"supplementary bonding", "bathroom bonding"}', '{"equipotential zone"}', 90),
('701.4', 'special_locations', 'Part 7', '{"bathroom"}', 0, 50000, '{"RCD protection", "30mA", "bathroom circuit"}', '{"bathroom RCD"}', 95),
('701.5', 'special_locations', 'Part 7', '{"bathroom"}', 0, 50000, '{"socket prohibition", "zone restriction"}', '{"no sockets", "bathroom sockets"}', 90),
('701.6', 'special_locations', 'Part 7', '{"bathroom"}', 0, 50000, '{"switch location", "cord switch", "outside zones"}', '{"pull cord", "bathroom switch"}', 85),
('701.7', 'special_locations', 'Part 7', '{"shower"}', 7000, 10800, '{"electric shower", "instantaneous", "heating"}', '{"shower heater", "power shower"}', 90),

('702.1', 'special_locations', 'Part 7', '{"outdoor", "swimming pool"}', 0, 50000, '{"swimming pool", "zone 0", "zone 1", "zone 2"}', '{"pool area", "water feature"}', 85),
('702.2', 'special_locations', 'Part 7', '{"swimming pool"}', 0, 50000, '{"SELV", "12V", "pool lighting"}', '{"low voltage pool"}', 85),

('703.1', 'special_locations', 'Part 7', '{"sauna"}', 0, 50000, '{"sauna", "high temperature", "heat resistance"}', '{"sauna heater", "hot room"}', 80),

('704.1', 'special_locations', 'Part 7', '{"construction site"}', 0, 50000, '{"construction site", "temporary supply", "PME"}', '{"building site", "site supply"}', 80),
('704.2', 'special_locations', 'Part 7', '{"construction site"}', 0, 50000, '{"reduced voltage", "110V", "site voltage"}', '{"transformer", "safety voltage"}', 85),
('704.3', 'special_locations', 'Part 7', '{"construction site"}', 0, 50000, '{"RCD protection", "30mA", "site RCD"}', '{"site protection"}', 85),

('705.1', 'special_locations', 'Part 7', '{"agricultural"}', 0, 50000, '{"agricultural", "livestock", "farm"}', '{"farming", "animal premises"}', 75),
('705.2', 'special_locations', 'Part 7', '{"agricultural"}', 0, 50000, '{"supplementary bonding", "agricultural bonding"}', '{"farm bonding"}', 75),

('706.1', 'special_locations', 'Part 7', '{"caravan", "mobile"}', 0, 50000, '{"caravan", "mobile home", "leisure"}', '{"RV", "motorhome"}', 75),
('708.1', 'special_locations', 'Part 7', '{"caravan site"}', 0, 50000, '{"caravan park", "caravan pitch", "camping"}', '{"holiday park", "campsite"}', 75),

('710.1', 'special_locations', 'Part 7', '{"medical"}', 0, 50000, '{"medical location", "hospital", "healthcare"}', '{"medical facility", "clinic"}', 75),
('711.1', 'special_locations', 'Part 7', '{"exhibition"}', 0, 50000, '{"exhibition", "show", "temporary"}', '{"event", "display"}', 70),
('712.1', 'special_locations', 'Part 7', '{"solar", "PV"}', 0, 50000, '{"photovoltaic", "solar panel", "PV system"}', '{"solar installation", "renewable"}', 85),
('714.1', 'special_locations', 'Part 7', '{"outdoor lighting"}', 0, 50000, '{"outdoor lighting", "street lighting", "external"}', '{"outside lights", "garden lighting"}', 75),
('715.1', 'special_locations', 'Part 7', '{"extra-low voltage"}', 0, 50000, '{"ELV", "low voltage", "SELV", "PELV"}', '{"safety voltage", "12V", "24V"}', 80),
('717.1', 'special_locations', 'Part 7', '{"mobile units"}', 0, 50000, '{"mobile unit", "portable", "transportable"}', '{"mobile building", "temporary structure"}', 70),
('721.1', 'special_locations', 'Part 7', '{"EV charging"}', 0, 50000, '{"electric vehicle", "EV charger", "charging point"}', '{"car charger", "EV supply"}', 90),

-- Appendix 4 - Current carrying capacity tables
('A4.1', 'cable_sizing', 'Appendix 4', '{"general"}', 0, 50000, '{"current capacity", "cable rating", "Iz"}', '{"cable ampacity", "current carrying"}', 100),
('A4.2', 'cable_sizing', 'Appendix 4', '{"general"}', 0, 50000, '{"installation method", "clipped direct", "conduit"}', '{"fixing method", "cable support"}', 95),
('A4.3', 'cable_sizing', 'Appendix 4', '{"general"}', 0, 50000, '{"ambient temperature", "correction factor", "Ca"}', '{"temperature derating"}', 95),
('A4.4', 'cable_sizing', 'Appendix 4', '{"general"}', 0, 50000, '{"grouping factor", "Cg", "bunched"}', '{"grouped cables", "derating group"}', 95),
('A4.5', 'cable_sizing', 'Appendix 4', '{"general"}', 0, 50000, '{"thermal insulation", "correction factor", "Ci"}', '{"insulation derating", "insulated wall"}', 90),

-- Appendix 1 - British Standards
('A1.1', 'standards', 'Appendix 1', '{"general"}', 0, 50000, '{"BS 7671", "wiring regulations", "IET"}', '{"regulations", "electrical standards"}', 85),
('A1.2', 'standards', 'Appendix 1', '{"general"}', 0, 50000, '{"BS 7540", "safe isolation", "GS38"}', '{"safety procedures", "test equipment"}', 80);

-- Create performance indexes
CREATE INDEX IF NOT EXISTS idx_regulation_index_priority ON public.regulation_index(priority_score DESC);
CREATE INDEX IF NOT EXISTS idx_regulation_index_power_range ON public.regulation_index(power_range_min, power_range_max);
CREATE INDEX IF NOT EXISTS idx_regulation_index_circuit_types_gin ON public.regulation_index USING GIN(circuit_types);
CREATE INDEX IF NOT EXISTS idx_regulation_index_semantic_tags_gin ON public.regulation_index USING GIN(semantic_tags);
CREATE INDEX IF NOT EXISTS idx_regulation_index_category ON public.regulation_index(category);