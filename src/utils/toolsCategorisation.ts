export interface CategorisedItems {
  [category: string]: string[];
}

// Categorise tools into logical groups based on keywords
export const categorizeTools = (tools: string[]): CategorisedItems => {
  const categories: CategorisedItems = {
    'Hand Tools': [],
    'Power Tools': [],
    'Test & Measurement': [],
    'Safety Equipment': [],
    'Specialised Tools': [],
    'Documentation': []
  };

  const handToolKeywords = ['screwdriver', 'pliers', 'spanner', 'wire stripper', 'wire cutters', 'crimper', 'utility knife', 'hammer', 'chisel', 'file', 'hacksaw', 'adjustable', 'socket set', 'allen key', 'side cutters', 'snips'];
  
  const powerToolKeywords = ['drill', 'saw', 'grinder', 'impact driver', 'impact drill', 'sds', 'combi drill', 'jigsaw', 'circular saw', 'reciprocating', 'angle grinder'];
  
  const testKeywords = ['multimeter', 'tester', 'voltage', 'proving unit', 'earth loop', 'insulation resistance', 'rcd tester', 'socket tester', 'continuity', 'test meter', 'test equipment', 'megger', 'fluke'];
  
  const safetyKeywords = ['lock-off', 'lock off', 'lockoff', 'barrier', 'sign', 'warning', 'gloves', 'goggles', 'safety glasses', 'hard hat', 'hi-vis', 'high vis', 'ear defenders', 'dust mask', 'respirator', 'safety boots', 'harness', 'isolator tag'];
  
  const specialisedKeywords = ['cable puller', 'fish tape', 'draw tape', 'conduit bender', 'hydraulic crimper', 'cable stripper', 'armoured cable', 'gland kit', 'knockout punch', 'hole saw set', 'cable detector', 'stud finder', 'laser level', 'spirit level'];
  
  const documentationKeywords = ['drawing', 'camera', 'notepad', 'certificate', 'form', 'clipboard', 'pen', 'marker', 'label', 'site plan', 'schematic', 'documentation'];

  tools.forEach((tool) => {
    const lowerTool = tool.toLowerCase();
    let categorised = false;

    if (handToolKeywords.some(keyword => lowerTool.includes(keyword))) {
      categories['Hand Tools'].push(tool);
      categorised = true;
    } else if (powerToolKeywords.some(keyword => lowerTool.includes(keyword))) {
      categories['Power Tools'].push(tool);
      categorised = true;
    } else if (testKeywords.some(keyword => lowerTool.includes(keyword))) {
      categories['Test & Measurement'].push(tool);
      categorised = true;
    } else if (safetyKeywords.some(keyword => lowerTool.includes(keyword))) {
      categories['Safety Equipment'].push(tool);
      categorised = true;
    } else if (specialisedKeywords.some(keyword => lowerTool.includes(keyword))) {
      categories['Specialised Tools'].push(tool);
      categorised = true;
    } else if (documentationKeywords.some(keyword => lowerTool.includes(keyword))) {
      categories['Documentation'].push(tool);
      categorised = true;
    }

    // Default to Hand Tools if no match found
    if (!categorised) {
      categories['Hand Tools'].push(tool);
    }
  });

  // Remove empty categories
  Object.keys(categories).forEach(key => {
    if (categories[key].length === 0) {
      delete categories[key];
    }
  });

  return categories;
};

// Categorise materials into logical groups based on keywords
export const categorizeMaterials = (materials: string[]): CategorisedItems => {
  const categories: CategorisedItems = {
    'Cables & Wiring': [],
    'Containment': [],
    'Accessories': [],
    'Consumer Units & Protection': [],
    'Lighting & Switches': [],
    'Fixings & Fasteners': []
  };

  const cableKeywords = ['cable', 'twin and earth', 'twin & earth', 'swa', 'armoured', 'flex', 'meter tails', 'tails', 'wire', '1.5mm', '2.5mm', '4mm', '6mm', '10mm', '16mm', 'coax', 'cat5', 'cat6', 'data cable'];
  
  const containmentKeywords = ['conduit', 'trunking', 'tray', 'basket', 'clip', 'saddle', 'gland', 'coupler', 'box', 'adaptable box', 'junction box', 'enclosure'];
  
  const accessoryKeywords = ['back box', 'pattress', 'grommet', 'connector', 'terminal', 'terminal block', 'wago', 'junction', 'socket', 'outlet', 'faceplate', 'grid', 'insert'];
  
  const protectionKeywords = ['consumer unit', 'cu', 'mcb', 'rcd', 'rcbo', 'spd', 'surge', 'isolator', 'main switch', 'breaker', 'fuse', 'din rail'];
  
  const lightingKeywords = ['light fitting', 'lamp', 'led', 'downlight', 'switch', 'dimmer', 'bulb', 'gu10', 'luminaire', 'batten', 'emergency light'];
  
  const fixingsKeywords = ['screw', 'rawlplug', 'plug', 'cable tie', 'zip tie', 'nail', 'anchor', 'fixing', 'toggle', 'cavity', 'bracket', 'fastener'];

  materials.forEach((material) => {
    const lowerMaterial = material.toLowerCase();
    let categorised = false;

    if (cableKeywords.some(keyword => lowerMaterial.includes(keyword))) {
      categories['Cables & Wiring'].push(material);
      categorised = true;
    } else if (containmentKeywords.some(keyword => lowerMaterial.includes(keyword))) {
      categories['Containment'].push(material);
      categorised = true;
    } else if (accessoryKeywords.some(keyword => lowerMaterial.includes(keyword))) {
      categories['Accessories'].push(material);
      categorised = true;
    } else if (protectionKeywords.some(keyword => lowerMaterial.includes(keyword))) {
      categories['Consumer Units & Protection'].push(material);
      categorised = true;
    } else if (lightingKeywords.some(keyword => lowerMaterial.includes(keyword))) {
      categories['Lighting & Switches'].push(material);
      categorised = true;
    } else if (fixingsKeywords.some(keyword => lowerMaterial.includes(keyword))) {
      categories['Fixings & Fasteners'].push(material);
      categorised = true;
    }

    // Default to Accessories if no match found
    if (!categorised) {
      categories['Accessories'].push(material);
    }
  });

  // Remove empty categories
  Object.keys(categories).forEach(key => {
    if (categories[key].length === 0) {
      delete categories[key];
    }
  });

  return categories;
};
