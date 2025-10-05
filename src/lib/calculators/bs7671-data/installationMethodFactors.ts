// BS 7671 Installation Method Derating Factors
// Reference: BS 7671 Appendix 4, Table 4A2

export interface InstallationMethod {
  code: string;
  description: string;
  factor: number;
  examples: string[];
}

// Installation methods and their derating factors
export const installationMethods: Record<string, InstallationMethod> = {
  'clipped-direct': {
    code: 'C',
    description: 'Clipped direct to surface',
    factor: 1.0,
    examples: ['Clipped to masonry wall', 'Clipped to ceiling', 'Surface mounted on plaster']
  },
  'trunking-perforated': {
    code: 'B',
    description: 'In perforated trunking on wall',
    factor: 0.95,
    examples: ['PVC trunking (ventilated)', 'Metal trunking (perforated)']
  },
  'trunking-enclosed': {
    code: 'B',
    description: 'In enclosed trunking',
    factor: 0.90,
    examples: ['Sealed PVC trunking', 'Metal trunking (non-ventilated)']
  },
  'conduit-surface': {
    code: 'A2',
    description: 'In conduit on wall or ceiling',
    factor: 0.80,
    examples: ['PVC conduit on surface', 'Steel conduit surface mounted']
  },
  'conduit-embedded': {
    code: 'A1',
    description: 'In conduit buried in masonry',
    factor: 0.70,
    examples: ['Conduit chased into brick wall', 'Conduit in concrete screed']
  },
  'conduit-insulation': {
    code: 'A1',
    description: 'In conduit in thermally insulating wall',
    factor: 0.50,
    examples: ['Conduit in insulated stud wall', 'Cable in cavity wall insulation']
  },
  'cable-tray': {
    code: 'E',
    description: 'On cable tray (perforated)',
    factor: 1.0,
    examples: ['Perforated cable tray', 'Wire mesh tray', 'Cable ladder']
  },
  'cable-basket': {
    code: 'F',
    description: 'On cable ladder or basket',
    factor: 1.0,
    examples: ['Wire cable basket', 'Open ladder system']
  },
  'free-air': {
    code: 'G',
    description: 'Free air (spaced from surface)',
    factor: 1.15,
    examples: ['Suspended on catenary wire', 'Air spaced from wall >0.3× cable diameter']
  },
  'buried-direct': {
    code: 'D',
    description: 'Direct burial in ground',
    factor: 1.0,
    examples: ['SWA cable buried in soil', 'Cable in ground with sand bedding']
  },
  'buried-duct': {
    code: 'D',
    description: 'In buried ducting',
    factor: 0.90,
    examples: ['Cable in underground plastic duct', 'Cable in concrete duct system']
  },
  'loft-insulation-contact': {
    code: 'A',
    description: 'In loft insulation (contact)',
    factor: 0.50,
    examples: ['Cable touching loft insulation', 'Cable surrounded by thermal insulation']
  },
  'loft-insulation-above': {
    code: 'B',
    description: 'In loft with insulation above',
    factor: 0.70,
    examples: ['Cable below loft insulation', 'Cable on ceiling with insulation above']
  },
  'loft-free': {
    code: 'C',
    description: 'In loft free from insulation',
    factor: 1.0,
    examples: ['Cable clipped in loft void', 'Cable on battens clear of insulation']
  }
};

export const getInstallationMethodFactor = (method: string): number => {
  return installationMethods[method]?.factor || 1.0;
};

export const getInstallationMethodDescription = (method: string): string => {
  return installationMethods[method]?.description || method;
};

// Grouping for cable selection based on run location
export const locationToCableType: Record<string, string[]> = {
  'inside': ['pvc-twin-earth', 'pvc-single'],
  'outside': ['swa', 'xlpe-twin-earth'],
  'underground': ['swa'],
  'loft': ['pvc-twin-earth', 'xlpe-twin-earth'],
  'plant-room': ['xlpe-single', 'xlpe-twin-earth'],
  'data-center': ['lsf', 'xlpe-single']
};

// Installation run to cable type suitability
export const runMethodCompatibility: Record<string, string[]> = {
  'clipped-direct': ['pvc-twin-earth', 'xlpe-twin-earth', 'swa'],
  'trunking-perforated': ['pvc-single', 'xlpe-single'],
  'trunking-enclosed': ['pvc-single', 'xlpe-single'],
  'conduit-surface': ['pvc-single', 'xlpe-single'],
  'conduit-embedded': ['pvc-single', 'xlpe-single'],
  'conduit-insulation': ['pvc-single', 'xlpe-single'],
  'cable-tray': ['pvc-twin-earth', 'xlpe-twin-earth', 'swa', 'pvc-single', 'xlpe-single'],
  'cable-basket': ['swa', 'xlpe-twin-earth'],
  'free-air': ['swa'],
  'buried-direct': ['swa'],
  'buried-duct': ['swa', 'xlpe-single'],
  'loft-insulation-contact': ['pvc-twin-earth'],
  'loft-insulation-above': ['pvc-twin-earth'],
  'loft-free': ['pvc-twin-earth']
};
