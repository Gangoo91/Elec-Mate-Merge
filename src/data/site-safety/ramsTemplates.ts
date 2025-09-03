export interface RAMSTemplate {
  id: string;
  category: string;
  hazard: string;
  risk: string;
  likelihood: number;
  severity: number;
  controls: string;
  residualRisk: number;
  icon: string;
  description: string;
}

export const ramsTemplates: RAMSTemplate[] = [
  {
    id: 'elec-shock',
    category: 'Electrical Hazards',
    hazard: 'Live electrical conductors and equipment',
    risk: 'Electric shock, burns, electrocution',
    likelihood: 3,
    severity: 5,
    controls: 'Isolation and lock-off procedures, PPE (insulated gloves, boots), voltage testing, competent person supervision, emergency procedures in place.',
    residualRisk: 2,
    icon: '⚡',
    description: 'Basic electrical shock protection'
  },
  {
    id: 'working-height',
    category: 'Working at Height',
    hazard: 'Working above 2 metres on ladders, scaffolds, platforms',
    risk: 'Falls causing serious injury or death',
    likelihood: 2,
    severity: 5,
    controls: 'Use of proper access equipment, safety harnesses, edge protection, competent person supervision, regular equipment inspection.',
    residualRisk: 1,
    icon: '🪜',
    description: 'Fall protection measures'
  },
  {
    id: 'manual-handling',
    category: 'Manual Handling',
    hazard: 'Lifting, carrying, moving equipment and materials',
    risk: 'Back injury, muscle strain, cuts from sharp edges',
    likelihood: 3,
    severity: 2,
    controls: 'Mechanical lifting aids where possible, team lifting for heavy items, proper lifting techniques, cut-resistant gloves for sharp materials.',
    residualRisk: 1,
    icon: '📦',
    description: 'Safe lifting and handling'
  },
  {
    id: 'hot-work',
    category: 'Fire & Explosion',
    hazard: 'Hot work activities, flammable materials',
    risk: 'Fire, explosion, burns',
    likelihood: 2,
    severity: 4,
    controls: 'Hot work permits, fire watch, extinguishers on site, removal of combustible materials, proper ventilation.',
    residualRisk: 1,
    icon: '🔥',
    description: 'Fire prevention and protection'
  },
  {
    id: 'chemical-exposure',
    category: 'Hazardous Materials',
    hazard: 'Exposure to chemicals, solvents, adhesives',
    risk: 'Chemical burns, respiratory problems, skin irritation',
    likelihood: 2,
    severity: 3,
    controls: 'Read safety data sheets, use appropriate PPE (gloves, masks), ensure adequate ventilation, eye wash facilities available.',
    residualRisk: 1,
    icon: '🧪',
    description: 'Chemical safety protection'
  },
  {
    id: 'noise-exposure',
    category: 'Environmental',
    hazard: 'Power tools, drilling, cutting operations',
    risk: 'Hearing damage, noise-induced hearing loss',
    likelihood: 4,
    severity: 2,
    controls: 'Hearing protection (ear defenders/plugs), regular breaks from noisy activities, noise level monitoring.',
    residualRisk: 1,
    icon: '🔊',
    description: 'Hearing protection'
  },
  {
    id: 'confined-space',
    category: 'Environmental',
    hazard: 'Working in confined spaces (ducts, voids, plant rooms)',
    risk: 'Asphyxiation, entrapment, difficulty in emergency evacuation',
    likelihood: 2,
    severity: 4,
    controls: 'Confined space entry procedures, atmospheric testing, emergency rescue plan, communication systems, trained attendant.',
    residualRisk: 1,
    icon: '🕳️',
    description: 'Confined space safety'
  },
  {
    id: 'tool-safety',
    category: 'Tools & Equipment',
    hazard: 'Power tools, hand tools, defective equipment',
    risk: 'Cuts, crushing, electric shock from faulty tools',
    likelihood: 3,
    severity: 3,
    controls: 'Daily tool inspections, PAT testing for electrical tools, proper storage and handling, training in correct use.',
    residualRisk: 1,
    icon: '🔧',
    description: 'Tool and equipment safety'
  }
];

export const getTemplatesByCategory = (category?: string): RAMSTemplate[] => {
  if (!category) return ramsTemplates;
  return ramsTemplates.filter(template => template.category === category);
};

export const getTemplateById = (id: string): RAMSTemplate | undefined => {
  return ramsTemplates.find(template => template.id === id);
};