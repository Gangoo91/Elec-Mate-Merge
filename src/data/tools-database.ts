/**
 * Comprehensive Tools Database for UK Electrical Work
 * Organised by category for easy browsing
 */

export interface ToolDefinition {
  id: string;
  category: string;
  name: string;
  description?: string;
  brand?: string;
}

export const TOOL_CATEGORIES = [
  { id: 'testing', name: 'Testing Equipment', icon: 'Gauge' },
  { id: 'hand', name: 'Hand Tools', icon: 'Wrench' },
  { id: 'power', name: 'Power Tools', icon: 'Zap' },
  { id: 'cable', name: 'Cable Tools', icon: 'Cable' },
  { id: 'measuring', name: 'Measuring', icon: 'Ruler' },
  { id: 'access', name: 'Access Equipment', icon: 'ArrowUp' },
  { id: 'fixings', name: 'Fixings & Installation', icon: 'Hammer' },
  { id: 'lighting', name: 'Lighting & Vision', icon: 'Flashlight' },
] as const;

export const TOOLS_DATABASE: ToolDefinition[] = [
  // TESTING EQUIPMENT
  { id: 'multifunction-tester', category: 'testing', name: 'Multifunction Tester', description: 'MFT for full installation testing', brand: 'Fluke/Megger/Kewtech' },
  { id: 'insulation-tester', category: 'testing', name: 'Insulation Resistance Tester', description: 'IR testing at 250V/500V/1000V' },
  { id: 'multimeter', category: 'testing', name: 'Digital Multimeter', description: 'AC/DC voltage, current, resistance' },
  { id: 'true-rms-multimeter', category: 'testing', name: 'True RMS Multimeter', description: 'Accurate readings on non-sinusoidal waveforms' },
  { id: 'clamp-meter', category: 'testing', name: 'Clamp Meter', description: 'Non-contact current measurement' },
  { id: 'rcd-tester', category: 'testing', name: 'RCD Tester', description: 'Trip time and current testing' },
  { id: 'loop-tester', category: 'testing', name: 'Loop Impedance Tester', description: 'Zs and Ze testing' },
  { id: 'earth-tester', category: 'testing', name: 'Earth Electrode Tester', description: 'RA measurement' },
  { id: 'voltage-indicator', category: 'testing', name: 'Voltage Indicator (GS38)', description: 'Proving unit for safe isolation' },
  { id: 'proving-unit', category: 'testing', name: 'Proving Unit', description: 'For testing voltage indicators' },
  { id: 'non-contact-tester', category: 'testing', name: 'Non-Contact Voltage Tester', description: 'Quick live detection' },
  { id: 'socket-tester', category: 'testing', name: 'Socket Tester', description: 'Quick polarity/earth check' },
  { id: 'pfc-tester', category: 'testing', name: 'PFC/PSCC Tester', description: 'Prospective fault current' },
  { id: 'pat-tester', category: 'testing', name: 'PAT Tester', description: 'Portable appliance testing' },
  { id: 'ev-tester', category: 'testing', name: 'EV Charger Tester', description: 'Type 2 / Mode 3 testing' },
  { id: 'phase-rotation', category: 'testing', name: 'Phase Rotation Tester', description: '3-phase sequence testing' },
  { id: 'thermal-camera', category: 'testing', name: 'Thermal Imaging Camera', description: 'Hot spot detection' },
  { id: 'power-analyser', category: 'testing', name: 'Power Quality Analyser', description: 'Harmonics and power factor' },

  // HAND TOOLS
  { id: 'vde-screwdriver-set', category: 'hand', name: 'VDE Insulated Screwdriver Set', description: '1000V rated' },
  { id: 'vde-pliers', category: 'hand', name: 'VDE Combination Pliers', description: '1000V rated' },
  { id: 'side-cutters', category: 'hand', name: 'Side Cutters/Diagonal Pliers', description: 'Cable cutting' },
  { id: 'long-nose-pliers', category: 'hand', name: 'Long Nose Pliers', description: 'Precision work' },
  { id: 'wire-strippers', category: 'hand', name: 'Wire Strippers', description: 'Automatic or manual' },
  { id: 'cable-knife', category: 'hand', name: 'Electrician\'s Cable Knife', description: 'VDE insulated' },
  { id: 'junior-hacksaw', category: 'hand', name: 'Junior Hacksaw', description: 'Cutting conduit/trunking' },
  { id: 'adjustable-spanner', category: 'hand', name: 'Adjustable Spanner', description: 'Various sizes' },
  { id: 'socket-set', category: 'hand', name: 'Socket Set', description: 'Metric set' },
  { id: 'allen-keys', category: 'hand', name: 'Allen Key Set', description: 'Hex keys metric' },
  { id: 'torx-set', category: 'hand', name: 'Torx Screwdriver Set', description: 'For consumer units' },
  { id: 'terminal-screwdriver', category: 'hand', name: 'Terminal Screwdriver', description: 'Flat blade for terminals' },
  { id: 'pozidriv-screwdriver', category: 'hand', name: 'Pozidriv Screwdriver Set', description: 'PZ1, PZ2, PZ3' },
  { id: 'hammer', category: 'hand', name: 'Claw Hammer', description: 'General purpose' },
  { id: 'club-hammer', category: 'hand', name: 'Club Hammer', description: 'For chisels/bolsters' },
  { id: 'bolster-chisel', category: 'hand', name: 'Bolster Chisel', description: 'For chasing' },
  { id: 'cold-chisel', category: 'hand', name: 'Cold Chisel Set', description: 'Masonry work' },
  { id: 'wood-chisel', category: 'hand', name: 'Wood Chisel Set', description: 'For back boxes' },
  { id: 'files', category: 'hand', name: 'File Set', description: 'Flat, round, half-round' },
  { id: 'hand-saw', category: 'hand', name: 'Hand Saw', description: 'For floorboards' },

  // POWER TOOLS
  { id: 'combi-drill', category: 'power', name: 'Combi Drill', description: 'Cordless 18V+' },
  { id: 'impact-driver', category: 'power', name: 'Impact Driver', description: 'For fixings' },
  { id: 'sds-drill', category: 'power', name: 'SDS Hammer Drill', description: 'Masonry drilling' },
  { id: 'angle-grinder', category: 'power', name: 'Angle Grinder', description: '115mm/125mm' },
  { id: 'wall-chaser', category: 'power', name: 'Wall Chaser', description: 'Cable routes' },
  { id: 'reciprocating-saw', category: 'power', name: 'Reciprocating Saw', description: 'Demolition work' },
  { id: 'jigsaw', category: 'power', name: 'Jigsaw', description: 'Cutting curves' },
  { id: 'circular-saw', category: 'power', name: 'Circular Saw', description: 'Straight cuts' },
  { id: 'mitre-saw', category: 'power', name: 'Mitre Saw', description: 'Trunking angles' },
  { id: 'router', category: 'power', name: 'Router', description: 'Cable recesses' },
  { id: 'hot-air-gun', category: 'power', name: 'Hot Air Gun', description: 'Heat shrink' },
  { id: 'threader', category: 'power', name: 'Conduit Threader', description: 'Steel conduit' },

  // CABLE TOOLS
  { id: 'cable-cutters', category: 'cable', name: 'Cable Cutters', description: 'Heavy duty' },
  { id: 'cable-ratchet-cutters', category: 'cable', name: 'Ratchet Cable Cutters', description: 'Large cables' },
  { id: 'crimping-tool', category: 'cable', name: 'Crimping Tool', description: 'Bootlace ferrules' },
  { id: 'hydraulic-crimper', category: 'cable', name: 'Hydraulic Crimper', description: 'Large lugs' },
  { id: 'cable-gland-spanner', category: 'cable', name: 'Cable Gland Spanner Set', description: 'SWA glands' },
  { id: 'swa-stripper', category: 'cable', name: 'SWA Cable Stripper', description: 'Armoured cable' },
  { id: 'cable-rod-set', category: 'cable', name: 'Cable Rod Set', description: 'Cable routing' },
  { id: 'fish-tape', category: 'cable', name: 'Fish Tape/Draw Wire', description: 'Pulling cables' },
  { id: 'cable-sock', category: 'cable', name: 'Cable Pulling Sock', description: 'Large cable pulls' },
  { id: 'cable-lubricant', category: 'cable', name: 'Cable Lubricant', description: 'For long pulls' },
  { id: 'cable-tie-gun', category: 'cable', name: 'Cable Tie Gun', description: 'Professional finish' },
  { id: 'conduit-bender', category: 'cable', name: 'Conduit Bender', description: '20mm/25mm' },
  { id: 'pipe-cutter', category: 'cable', name: 'Pipe/Conduit Cutter', description: 'Clean cuts' },
  { id: 'knockout-punch', category: 'cable', name: 'Knockout Punch Set', description: 'Enclosure entries' },

  // MEASURING
  { id: 'tape-measure', category: 'measuring', name: 'Tape Measure', description: '5m/8m' },
  { id: 'laser-measure', category: 'measuring', name: 'Laser Distance Measure', description: 'Accurate distances' },
  { id: 'spirit-level', category: 'measuring', name: 'Spirit Level', description: '600mm/1200mm' },
  { id: 'laser-level', category: 'measuring', name: 'Laser Level', description: 'Line/cross laser' },
  { id: 'cable-detector', category: 'measuring', name: 'Cable/Pipe Detector', description: 'Avoid buried services' },
  { id: 'stud-finder', category: 'measuring', name: 'Stud Finder', description: 'Locate joists' },
  { id: 'folding-rule', category: 'measuring', name: 'Folding Rule', description: 'For vertical measurements' },
  { id: 'cable-length-meter', category: 'measuring', name: 'Cable Length Meter', description: 'Measuring drums' },

  // ACCESS EQUIPMENT
  { id: 'step-ladder', category: 'access', name: 'Step Ladder', description: 'Fibreglass insulated' },
  { id: 'extension-ladder', category: 'access', name: 'Extension Ladder', description: 'Fibreglass' },
  { id: 'platform-steps', category: 'access', name: 'Platform Steps', description: 'Stable working platform' },
  { id: 'hop-up', category: 'access', name: 'Hop-Up Platform', description: 'Low level access' },
  { id: 'tower-scaffold', category: 'access', name: 'Mobile Tower Scaffold', description: 'Extended height work' },
  { id: 'podium-steps', category: 'access', name: 'Podium Steps', description: 'Enclosed platform' },

  // FIXINGS & INSTALLATION
  { id: 'rawl-plugs', category: 'fixings', name: 'Wall Plugs/Rawl Plugs', description: 'Various sizes' },
  { id: 'masonry-bits', category: 'fixings', name: 'Masonry Drill Bits', description: 'SDS/Standard' },
  { id: 'wood-bits', category: 'fixings', name: 'Wood Drill Bits', description: 'Flat/Auger' },
  { id: 'hole-saw-kit', category: 'fixings', name: 'Hole Saw Kit', description: 'For downlights' },
  { id: 'core-drill', category: 'fixings', name: 'Diamond Core Drill', description: 'Large holes' },
  { id: 'pop-rivet-gun', category: 'fixings', name: 'Pop Rivet Gun', description: 'Metal fixings' },
  { id: 'rawl-bolt-setter', category: 'fixings', name: 'Anchor Bolt Setting Tool', description: 'Heavy duty fixings' },

  // LIGHTING & VISION
  { id: 'head-torch', category: 'lighting', name: 'Head Torch', description: 'Hands-free lighting' },
  { id: 'work-light', category: 'lighting', name: 'LED Work Light', description: 'Area illumination' },
  { id: 'inspection-torch', category: 'lighting', name: 'Inspection Torch', description: 'Tight spaces' },
  { id: 'inspection-camera', category: 'lighting', name: 'Inspection Camera/Endoscope', description: 'Cavity inspection' },
  { id: 'inspection-mirror', category: 'lighting', name: 'Inspection Mirror', description: 'Extendable' },
];

// Helper function to get tools by category
export const getToolsByCategory = (categoryId: string): ToolDefinition[] => {
  return TOOLS_DATABASE.filter(tool => tool.category === categoryId);
};

// Search tools
export const searchTools = (query: string): ToolDefinition[] => {
  const lowerQuery = query.toLowerCase();
  return TOOLS_DATABASE.filter(tool =>
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.description?.toLowerCase().includes(lowerQuery) ||
    tool.brand?.toLowerCase().includes(lowerQuery)
  );
};

// Common quick-add tools for different job types
export const QUICK_ADD_TOOLS = [
  'multimeter',
  'insulation-tester',
  'vde-screwdriver-set',
  'side-cutters',
  'wire-strippers',
  'combi-drill',
  'tape-measure',
  'spirit-level',
];
