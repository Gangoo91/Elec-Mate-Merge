/**
 * Comprehensive Materials Database for UK Electrical Work
 * Organised by category for easy browsing
 */

export interface MaterialDefinition {
  id: string;
  category: string;
  name: string;
  description?: string;
  sizes?: string[];
}

export const MATERIAL_CATEGORIES = [
  { id: 'cable', name: 'Cables', icon: 'Cable' },
  { id: 'containment', name: 'Containment', icon: 'Box' },
  { id: 'accessories', name: 'Accessories', icon: 'Plug' },
  { id: 'distribution', name: 'Distribution', icon: 'Zap' },
  { id: 'fixings', name: 'Fixings', icon: 'Hammer' },
  { id: 'lighting', name: 'Lighting', icon: 'Lightbulb' },
  { id: 'terminations', name: 'Terminations', icon: 'Link' },
  { id: 'earthing', name: 'Earthing', icon: 'Ground' },
] as const;

export const MATERIALS_DATABASE: MaterialDefinition[] = [
  // CABLES
  { id: 'twin-earth-1mm', category: 'cable', name: '1mm² Twin & Earth Cable', description: 'Lighting circuits', sizes: ['1mm²'] },
  { id: 'twin-earth-1.5mm', category: 'cable', name: '1.5mm² Twin & Earth Cable', description: 'Lighting circuits', sizes: ['1.5mm²'] },
  { id: 'twin-earth-2.5mm', category: 'cable', name: '2.5mm² Twin & Earth Cable', description: 'Ring mains, radials', sizes: ['2.5mm²'] },
  { id: 'twin-earth-4mm', category: 'cable', name: '4mm² Twin & Earth Cable', description: 'High power circuits', sizes: ['4mm²'] },
  { id: 'twin-earth-6mm', category: 'cable', name: '6mm² Twin & Earth Cable', description: 'Cooker, shower circuits', sizes: ['6mm²'] },
  { id: 'twin-earth-10mm', category: 'cable', name: '10mm² Twin & Earth Cable', description: 'EV chargers, large loads', sizes: ['10mm²'] },
  { id: 'twin-earth-16mm', category: 'cable', name: '16mm² Twin & Earth Cable', description: 'Sub-mains', sizes: ['16mm²'] },
  { id: 'three-core-earth', category: 'cable', name: '3-Core & Earth Cable', description: '2-way switching', sizes: ['1mm²', '1.5mm²'] },
  { id: 'swa-2core', category: 'cable', name: 'SWA Cable 2-Core', description: 'External/underground', sizes: ['2.5mm²', '4mm²', '6mm²', '10mm²', '16mm²', '25mm²'] },
  { id: 'swa-3core', category: 'cable', name: 'SWA Cable 3-Core', description: 'External 3-phase', sizes: ['2.5mm²', '4mm²', '6mm²', '10mm²', '16mm²', '25mm²'] },
  { id: 'swa-4core', category: 'cable', name: 'SWA Cable 4-Core', description: '3-phase + neutral', sizes: ['2.5mm²', '4mm²', '6mm²', '10mm²', '16mm²', '25mm²'] },
  { id: 'flex-2core', category: 'cable', name: '2-Core Flex', description: 'Appliance connections', sizes: ['0.75mm²', '1mm²', '1.5mm²', '2.5mm²'] },
  { id: 'flex-3core', category: 'cable', name: '3-Core Flex', description: 'Earthed appliances', sizes: ['0.75mm²', '1mm²', '1.5mm²', '2.5mm²'] },
  { id: 'data-cat5e', category: 'cable', name: 'Cat5e Data Cable', description: 'Network cabling', sizes: ['UTP', 'STP'] },
  { id: 'data-cat6', category: 'cable', name: 'Cat6 Data Cable', description: 'High speed network', sizes: ['UTP', 'STP'] },
  { id: 'data-cat6a', category: 'cable', name: 'Cat6a Data Cable', description: '10Gbps network', sizes: ['UTP', 'STP'] },
  { id: 'fire-cable', category: 'cable', name: 'Fire Resistant Cable', description: 'FP200/MICC fire alarm', sizes: ['1.5mm²', '2.5mm²'] },
  { id: 'coax-cable', category: 'cable', name: 'Coaxial Cable', description: 'TV/satellite', sizes: ['RG6', 'RG59'] },
  { id: 'speaker-cable', category: 'cable', name: 'Speaker Cable', description: 'Audio systems', sizes: ['1.5mm²', '2.5mm²', '4mm²'] },
  { id: 'meter-tails', category: 'cable', name: 'Meter Tails', description: 'DNO to consumer unit', sizes: ['16mm²', '25mm²', '35mm²'] },
  { id: 'bonding-cable', category: 'cable', name: 'Earth Bonding Cable', description: 'Main/supplementary bonding', sizes: ['6mm²', '10mm²', '16mm²'] },

  // CONTAINMENT
  { id: 'oval-conduit', category: 'containment', name: 'Oval Conduit', description: 'Plastered walls', sizes: ['16mm', '20mm'] },
  { id: 'round-conduit', category: 'containment', name: 'Round Conduit (PVC)', description: 'Surface/concealed', sizes: ['20mm', '25mm', '32mm'] },
  { id: 'steel-conduit', category: 'containment', name: 'Steel Conduit', description: 'Heavy duty protection', sizes: ['20mm', '25mm', '32mm'] },
  { id: 'flexible-conduit', category: 'containment', name: 'Flexible Conduit', description: 'Movement areas', sizes: ['20mm', '25mm', '32mm'] },
  { id: 'mini-trunking', category: 'containment', name: 'Mini Trunking', description: 'Surface wiring', sizes: ['16x16mm', '25x16mm', '38x25mm'] },
  { id: 'dado-trunking', category: 'containment', name: 'Dado Trunking', description: 'Office installations', sizes: ['Various'] },
  { id: 'cable-tray', category: 'containment', name: 'Cable Tray', description: 'Heavy duty support', sizes: ['150mm', '225mm', '300mm', '450mm'] },
  { id: 'cable-basket', category: 'containment', name: 'Cable Basket', description: 'Data centres', sizes: ['100mm', '200mm', '300mm'] },
  { id: 'cable-trunking', category: 'containment', name: 'PVC Trunking', description: 'Surface cables', sizes: ['40x25mm', '50x50mm', '100x50mm'] },
  { id: 'floor-box', category: 'containment', name: 'Floor Box', description: 'Floor outlets', sizes: ['Single', 'Double', 'Multi-gang'] },
  { id: 'back-box-16mm', category: 'containment', name: '16mm Metal Back Box', description: 'Shallow flush mounting', sizes: ['1G', '2G'] },
  { id: 'back-box-25mm', category: 'containment', name: '25mm Metal Back Box', description: 'Flush mounting', sizes: ['1G', '2G'] },
  { id: 'back-box-35mm', category: 'containment', name: '35mm Metal Back Box', description: 'Deep flush mounting', sizes: ['1G', '2G'] },
  { id: 'back-box-47mm', category: 'containment', name: '47mm Metal Back Box', description: 'Extra deep mounting', sizes: ['1G', '2G'] },
  { id: 'pattress-box', category: 'containment', name: 'Surface Pattress Box', description: 'Surface mounting', sizes: ['1G', '2G'] },
  { id: 'dry-lining-box', category: 'containment', name: 'Dry Lining Back Box', description: 'Plasterboard walls', sizes: ['1G', '2G', '35mm', '47mm'] },

  // ACCESSORIES
  { id: 'socket-13a', category: 'accessories', name: '13A Socket Outlet', description: 'Single/double switched', sizes: ['1G', '2G'] },
  { id: 'socket-usb', category: 'accessories', name: 'USB Socket Outlet', description: 'With USB charging', sizes: ['1G', '2G'] },
  { id: 'socket-20a', category: 'accessories', name: '20A DP Switch', description: 'Water heater etc', sizes: ['With neon', 'Without neon'] },
  { id: 'socket-45a', category: 'accessories', name: '45A Cooker Switch', description: 'With/without socket', sizes: ['With socket', 'Without socket'] },
  { id: 'fused-spur', category: 'accessories', name: 'Fused Connection Unit', description: 'Fixed appliances', sizes: ['Switched', 'Unswitched'] },
  { id: 'light-switch-1g', category: 'accessories', name: '1 Gang Light Switch', description: '1-way or 2-way', sizes: ['1-way', '2-way'] },
  { id: 'light-switch-2g', category: 'accessories', name: '2 Gang Light Switch', description: '1-way or 2-way', sizes: ['1-way', '2-way'] },
  { id: 'light-switch-3g', category: 'accessories', name: '3 Gang Light Switch', description: '1-way or 2-way', sizes: ['1-way', '2-way'] },
  { id: 'dimmer-switch', category: 'accessories', name: 'Dimmer Switch', description: 'Trailing edge LED', sizes: ['1G', '2G'] },
  { id: 'blank-plate', category: 'accessories', name: 'Blank Plate', description: 'Covering unused boxes', sizes: ['1G', '2G'] },
  { id: 'ceiling-rose', category: 'accessories', name: 'Ceiling Rose', description: 'Pendant connection', sizes: ['Standard'] },
  { id: 'junction-box', category: 'accessories', name: 'Junction Box', description: 'Cable connections', sizes: ['20A', '30A', 'Maintenance free'] },
  { id: 'pull-cord', category: 'accessories', name: 'Pull Cord Switch', description: 'Bathroom/WC', sizes: ['6A', '45A'] },
  { id: 'shaver-socket', category: 'accessories', name: 'Shaver Socket', description: 'Bathroom use', sizes: ['Dual voltage'] },
  { id: 'outdoor-socket', category: 'accessories', name: 'Outdoor Socket', description: 'IP66 weatherproof', sizes: ['1G', '2G'] },
  { id: 'grid-switch', category: 'accessories', name: 'Grid Switch Module', description: 'Modular systems', sizes: ['Various'] },

  // DISTRIBUTION
  { id: 'mcb-b', category: 'distribution', name: 'Type B MCB', description: 'General purpose', sizes: ['6A', '10A', '16A', '20A', '32A', '40A', '50A', '63A'] },
  { id: 'mcb-c', category: 'distribution', name: 'Type C MCB', description: 'Inductive loads', sizes: ['6A', '10A', '16A', '20A', '32A', '40A', '50A', '63A'] },
  { id: 'rcbo', category: 'distribution', name: 'RCBO', description: 'Combined MCB+RCD', sizes: ['6A', '10A', '16A', '20A', '32A', '40A'] },
  { id: 'rcd-30ma', category: 'distribution', name: '30mA RCD', description: 'Personal protection', sizes: ['40A', '63A', '80A', '100A'] },
  { id: 'rcd-100ma', category: 'distribution', name: '100mA RCD', description: 'Fire protection', sizes: ['40A', '63A', '80A', '100A'] },
  { id: 'main-switch', category: 'distribution', name: 'Main Switch', description: 'Isolator', sizes: ['63A', '80A', '100A', '125A'] },
  { id: 'consumer-unit', category: 'distribution', name: 'Consumer Unit', description: 'Metal clad', sizes: ['6 way', '10 way', '12 way', '16 way', '18 way'] },
  { id: 'split-load-cu', category: 'distribution', name: 'Split Load Consumer Unit', description: 'Dual RCD', sizes: ['10 way', '12 way', '16 way'] },
  { id: 'garage-unit', category: 'distribution', name: 'Garage Unit', description: 'Small outbuilding', sizes: ['2 way', '4 way'] },
  { id: 'distribution-board', category: 'distribution', name: '3-Phase Distribution Board', description: 'Commercial/industrial', sizes: ['12 way', '18 way', '24 way'] },
  { id: 'isolator-switch', category: 'distribution', name: 'Isolator Switch', description: 'Local isolation', sizes: ['20A', '32A', '40A', '63A', '100A'] },
  { id: 'henley-block', category: 'distribution', name: 'Henley Block', description: 'Service cut-out', sizes: ['60A', '80A', '100A'] },
  { id: 'busbar', category: 'distribution', name: 'Busbar', description: 'Board connections', sizes: ['Various'] },

  // FIXINGS
  { id: 'saddle-clip', category: 'fixings', name: 'Saddle Clip', description: 'Cable support', sizes: ['For various cable sizes'] },
  { id: 'p-clip', category: 'fixings', name: 'P-Clip', description: 'Cable securing', sizes: ['Various sizes'] },
  { id: 'cable-clip', category: 'fixings', name: 'Cable Clip', description: 'Round/flat cable', sizes: ['Various sizes'] },
  { id: 'conduit-clip', category: 'fixings', name: 'Conduit Clip', description: 'Conduit support', sizes: ['20mm', '25mm', '32mm'] },
  { id: 'trunking-clip', category: 'fixings', name: 'Trunking Clip', description: 'Trunking support', sizes: ['Various sizes'] },
  { id: 'rawl-plug', category: 'fixings', name: 'Wall Plugs', description: 'Masonry fixing', sizes: ['Red', 'Brown', 'Yellow', 'Blue'] },
  { id: 'toggle-fixing', category: 'fixings', name: 'Toggle/Hollow Wall Fixing', description: 'Plasterboard', sizes: ['Various'] },
  { id: 'nail-in-clip', category: 'fixings', name: 'Nail-In Clip', description: 'Quick fixing', sizes: ['Various'] },
  { id: 'cable-tie', category: 'fixings', name: 'Cable Ties', description: 'Bundle cables', sizes: ['100mm', '200mm', '300mm', '370mm'] },
  { id: 'fire-clip', category: 'fixings', name: 'Fire Rated Cable Clip', description: 'Fire cable support', sizes: ['For FP200'] },

  // LIGHTING
  { id: 'led-downlight', category: 'lighting', name: 'LED Downlight', description: 'Recessed ceiling', sizes: ['5W', '7W', '10W', '15W'] },
  { id: 'led-panel', category: 'lighting', name: 'LED Panel', description: 'Suspended ceiling', sizes: ['600x600mm', '1200x300mm', '1200x600mm'] },
  { id: 'led-batten', category: 'lighting', name: 'LED Batten', description: 'Surface mount', sizes: ['2ft', '4ft', '5ft', '6ft'] },
  { id: 'led-bulkhead', category: 'lighting', name: 'LED Bulkhead', description: 'Utility areas', sizes: ['Round', 'Oval'] },
  { id: 'emergency-light', category: 'lighting', name: 'Emergency Light', description: 'Non-maintained/maintained', sizes: ['3hr', 'Self-test'] },
  { id: 'exit-sign', category: 'lighting', name: 'Emergency Exit Sign', description: 'Illuminated signage', sizes: ['Various'] },
  { id: 'pir-sensor', category: 'lighting', name: 'PIR Sensor', description: 'Motion detection', sizes: ['Ceiling', 'Wall'] },
  { id: 'photocell', category: 'lighting', name: 'Photocell', description: 'Daylight sensing', sizes: ['Various'] },
  { id: 'lamp-holder', category: 'lighting', name: 'Lamp Holder', description: 'ES, BC, GU10', sizes: ['E27', 'B22', 'GU10', 'E14'] },
  { id: 'led-driver', category: 'lighting', name: 'LED Driver', description: 'LED power supply', sizes: ['Various wattages'] },

  // TERMINATIONS
  { id: 'connector-block', category: 'terminations', name: 'Connector Block', description: 'Strip connector', sizes: ['3A', '5A', '15A', '30A'] },
  { id: 'wago-221', category: 'terminations', name: 'Wago 221 Connectors', description: 'Lever connectors', sizes: ['2 way', '3 way', '5 way'] },
  { id: 'wago-773', category: 'terminations', name: 'Wago 773 Push Connectors', description: 'Push-in type', sizes: ['2 way', '3 way', '4 way', '8 way'] },
  { id: 'crimp-bootlace', category: 'terminations', name: 'Bootlace Ferrules', description: 'Wire end terminals', sizes: ['Various sizes'] },
  { id: 'ring-terminal', category: 'terminations', name: 'Ring Terminals', description: 'Bolt connections', sizes: ['Various sizes'] },
  { id: 'cable-gland', category: 'terminations', name: 'Cable Gland', description: 'SWA termination', sizes: ['20mm', '25mm', '32mm', '40mm', '50mm'] },
  { id: 'gland-shroud', category: 'terminations', name: 'Gland Shroud', description: 'SWA earth connection', sizes: ['Various'] },
  { id: 'lug-terminal', category: 'terminations', name: 'Cable Lug', description: 'Large cable termination', sizes: ['Various'] },
  { id: 'earth-bar', category: 'terminations', name: 'Earth Bar', description: 'Multiple earths', sizes: ['4 way', '6 way', '8 way', '12 way'] },
  { id: 'heat-shrink', category: 'terminations', name: 'Heat Shrink Tubing', description: 'Insulation', sizes: ['Various diameters'] },
  { id: 'pvc-tape', category: 'terminations', name: 'PVC Insulating Tape', description: 'General insulation', sizes: ['Various colours'] },
  { id: 'self-amalg-tape', category: 'terminations', name: 'Self-Amalgamating Tape', description: 'Waterproof joints', sizes: ['Standard'] },

  // EARTHING
  { id: 'earth-rod', category: 'earthing', name: 'Earth Rod', description: 'TT earthing', sizes: ['1.2m', '1.5m', '2.4m'] },
  { id: 'earth-clamp', category: 'earthing', name: 'Earth Clamp', description: 'Rod/pipe connection', sizes: ['Various'] },
  { id: 'earth-block', category: 'earthing', name: 'Earth Terminal Block', description: 'Main earth terminal', sizes: ['Various'] },
  { id: 'bonding-clamp', category: 'earthing', name: 'Bonding Clamp', description: 'Pipe bonding', sizes: ['15mm', '22mm', '28mm', '35mm', '42mm', '54mm'] },
  { id: 'earth-label', category: 'earthing', name: 'Safety Electrical Connection Label', description: 'BS 951 label', sizes: ['Standard'] },
  { id: 'earth-mat', category: 'earthing', name: 'Earth Mat', description: 'Equipotential bonding', sizes: ['Various'] },
  { id: 'cpc-connection', category: 'earthing', name: 'CPC Connection', description: 'Circuit earth', sizes: ['Various'] },
];

// Helper function to get materials by category
export const getMaterialsByCategory = (categoryId: string): MaterialDefinition[] => {
  return MATERIALS_DATABASE.filter(material => material.category === categoryId);
};

// Search materials
export const searchMaterials = (query: string): MaterialDefinition[] => {
  const lowerQuery = query.toLowerCase();
  return MATERIALS_DATABASE.filter(material =>
    material.name.toLowerCase().includes(lowerQuery) ||
    material.description?.toLowerCase().includes(lowerQuery)
  );
};
