// BS 7671 Installation Method Derating Factors
// Reference: BS 7671 Appendix 4, Table 4A2

export interface InstallationMethod {
  code: string;
  description: string;
  factor: number;
  examples: string[];
  category: 'enclosed' | 'surface' | 'clipped' | 'underground' | 'free-air' | 'domestic';
  tableRef: string;
}

// Complete BS 7671 Installation methods with derating factors
export const installationMethods: Record<string, InstallationMethod> = {
  // Method A - Enclosed in conduit in thermally insulating wall
  'conduit-insulated-wall': {
    code: 'A',
    description: 'Enclosed in conduit in thermally insulating wall',
    factor: 0.77,
    examples: ['Conduit chased into insulated stud wall'],
    category: 'enclosed',
    tableRef: '4A2'
  },
  
  // Method A1 - Enclosed in conduit in masonry
  'conduit-masonry': {
    code: 'A1',
    description: 'Enclosed in conduit in masonry',
    factor: 0.77,
    examples: ['Conduit chased into brick wall', 'Conduit in concrete'],
    category: 'enclosed',
    tableRef: '4A2'
  },
  
  // Method A2 - Enclosed in conduit on surface
  'conduit-surface': {
    code: 'A2',
    description: 'Enclosed in conduit on surface',
    factor: 0.83,
    examples: ['PVC conduit on surface', 'Steel conduit surface mounted'],
    category: 'enclosed',
    tableRef: '4A2'
  },
  
  // Method B1 - Enclosed in trunking on wall
  'trunking-surface': {
    code: 'B1',
    description: 'Enclosed in trunking on wall',
    factor: 0.90,
    examples: ['PVC trunking on wall', 'Metal trunking surface mounted'],
    category: 'surface',
    tableRef: '4A2'
  },
  
  // Method B2 - Enclosed in trunking flush
  'trunking-flush': {
    code: 'B2',
    description: 'Enclosed in trunking flush in wall',
    factor: 0.88,
    examples: ['Skirting trunking', 'Dado trunking flush mounted'],
    category: 'surface',
    tableRef: '4A2'
  },
  
  // Method C - Clipped direct
  'clipped-direct': {
    code: 'C',
    description: 'Clipped direct to surface',
    factor: 1.00,
    examples: ['Clipped to masonry wall', 'Clipped to ceiling', 'On battens'],
    category: 'clipped',
    tableRef: '4A2'
  },
  
  // Method C - On non-perforated tray
  'tray-non-perforated': {
    code: 'C',
    description: 'On non-perforated cable tray',
    factor: 0.95,
    examples: ['Solid cable tray', 'Steel tray without ventilation'],
    category: 'clipped',
    tableRef: '4A2'
  },
  
  // Method D1 - Buried direct in ground
  'buried-direct': {
    code: 'D1',
    description: 'Buried direct in ground',
    factor: 1.00,
    examples: ['SWA cable buried in soil', 'Cable with sand bedding'],
    category: 'underground',
    tableRef: '4A2'
  },
  
  // Method D2 - In buried ducts
  'buried-duct': {
    code: 'D2',
    description: 'In buried ducts',
    factor: 0.80,
    examples: ['Cable in underground plastic duct', 'In concrete duct bank'],
    category: 'underground',
    tableRef: '4A2'
  },
  
  // Method E - Multicore on perforated tray
  'tray-perforated': {
    code: 'E',
    description: 'Multicore on perforated cable tray',
    factor: 1.00,
    examples: ['Perforated cable tray', 'Wire mesh tray'],
    category: 'free-air',
    tableRef: '4A2'
  },
  
  // Method E - On cable ladder
  'cable-ladder': {
    code: 'E',
    description: 'Multicore on cable ladder',
    factor: 1.00,
    examples: ['Cable ladder', 'Cable basket', 'Wire mesh basket'],
    category: 'free-air',
    tableRef: '4A2'
  },
  
  // Method F - Single-core on perforated tray trefoil
  'tray-single-trefoil': {
    code: 'F',
    description: 'Single-core cables on perforated tray (trefoil)',
    factor: 0.98,
    examples: ['Three single cables in trefoil on tray'],
    category: 'free-air',
    tableRef: '4A2'
  },
  
  // Method F - Single-core on perforated tray flat spaced
  'tray-single-flat': {
    code: 'F',
    description: 'Single-core cables on perforated tray (flat spaced)',
    factor: 1.00,
    examples: ['Single cables flat on tray, spaced one diameter'],
    category: 'free-air',
    tableRef: '4A2'
  },
  
  // Method G - Spaced from surface
  'free-air-spaced': {
    code: 'G',
    description: 'Free air, spaced from surface',
    factor: 1.15,
    examples: ['Suspended on catenary wire', 'Spaced from wall >0.3D'],
    category: 'free-air',
    tableRef: '4A2'
  },
  
  // Domestic Special Cases - Methods 100-103 (Regulation 523.9)
  'ceiling-insulation-below100': {
    code: '100',
    description: 'Above plasterboard ceiling, insulation ≤100mm',
    factor: 0.81,
    examples: ['Loft with less than 100mm insulation above cable'],
    category: 'domestic',
    tableRef: '52.2'
  },
  
  'ceiling-insulation-over100': {
    code: '101',
    description: 'Above plasterboard ceiling, insulation >100mm',
    factor: 0.68,
    examples: ['Loft with more than 100mm insulation above cable'],
    category: 'domestic',
    tableRef: '52.2'
  },
  
  'stud-wall-touching': {
    code: '102',
    description: 'In stud wall, cable touching insulation',
    factor: 0.55,
    examples: ['Cable in contact with cavity wall insulation'],
    category: 'domestic',
    tableRef: '52.2'
  },
  
  'stud-wall-not-touching': {
    code: '103',
    description: 'In stud wall, cable not touching insulation',
    factor: 0.78,
    examples: ['Cable spaced from insulation by clip or batten'],
    category: 'domestic',
    tableRef: '52.2'
  },
  
  // Legacy mappings for backwards compatibility
  'in-conduit': {
    code: 'B',
    description: 'In conduit/trunking',
    factor: 0.90,
    examples: ['General conduit/trunking installation'],
    category: 'enclosed',
    tableRef: '4A2'
  },
  
  'cable-tray': {
    code: 'E',
    description: 'On cable tray',
    factor: 1.00,
    examples: ['General cable tray installation'],
    category: 'free-air',
    tableRef: '4A2'
  },
  
  'free-air': {
    code: 'E',
    description: 'Free air',
    factor: 1.00,
    examples: ['General free air installation'],
    category: 'free-air',
    tableRef: '4A2'
  }
};

// Installation method categories for UI grouping
export const installationCategories = {
  enclosed: {
    label: 'Enclosed (Methods A, B)',
    description: 'Conduit, trunking in wall or on surface'
  },
  surface: {
    label: 'Surface Mounted (Method B)',
    description: 'Trunking on or flush with surface'
  },
  clipped: {
    label: 'Clipped Direct (Method C)',
    description: 'Clipped to surface or on non-perforated tray'
  },
  underground: {
    label: 'Underground (Method D)',
    description: 'Buried direct or in ducts'
  },
  'free-air': {
    label: 'Free Air (Methods E, F, G)',
    description: 'Perforated tray, ladder, or spaced from surface'
  },
  domestic: {
    label: 'Domestic Special (100-103)',
    description: 'Thermal insulation scenarios per Reg 523.9'
  }
};

export const getInstallationMethodFactor = (method: string): number => {
  return installationMethods[method]?.factor || 1.0;
};

export const getInstallationMethodDescription = (method: string): string => {
  return installationMethods[method]?.description || method;
};

export const getInstallationMethodCode = (method: string): string => {
  return installationMethods[method]?.code || 'C';
};

export const getInstallationMethodCategory = (method: string): string => {
  return installationMethods[method]?.category || 'clipped';
};

export const getInstallationMethodTableRef = (method: string): string => {
  return installationMethods[method]?.tableRef || '4A2';
};

// Get methods by category for UI grouping
export const getMethodsByCategory = (category: string): Array<{ value: string; label: string; code: string }> => {
  return Object.entries(installationMethods)
    .filter(([_, method]) => method.category === category)
    .map(([key, method]) => ({
      value: key,
      label: `${method.description} (${method.code})`,
      code: method.code
    }));
};

// Map user-friendly installation method names to BS 7671 Reference Methods
export const cableRunToReferenceMethod: Record<string, string> = {
  'conduit-insulated-wall': 'A',
  'conduit-masonry': 'A1',
  'conduit-surface': 'A2',
  'trunking-surface': 'B1',
  'trunking-flush': 'B2',
  'clipped-direct': 'C',
  'tray-non-perforated': 'C',
  'buried-direct': 'D1',
  'buried-duct': 'D2',
  'tray-perforated': 'E',
  'cable-ladder': 'E',
  'tray-single-trefoil': 'F',
  'tray-single-flat': 'F',
  'free-air-spaced': 'G',
  'ceiling-insulation-below100': '100',
  'ceiling-insulation-over100': '101',
  'stud-wall-touching': '102',
  'stud-wall-not-touching': '103',
  // Legacy mappings
  'in-conduit': 'B',
  'cable-tray': 'E',
  'free-air': 'E'
};

export const getReferenceMethod = (installationMethod: string): string => {
  return cableRunToReferenceMethod[installationMethod] || 'C';
};

// Check if method requires underground-specific factors
export const isUndergroundMethod = (method: string): boolean => {
  const category = installationMethods[method]?.category;
  return category === 'underground';
};

// Check if method is a domestic thermal insulation scenario
export const isDomesticInsulationMethod = (method: string): boolean => {
  const category = installationMethods[method]?.category;
  return category === 'domestic';
};
