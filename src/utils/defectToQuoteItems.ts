/**
 * EICR Defect-to-Quote Mapping
 * Maps BS 7671 defect observations to remedial work items with materials, labour, and time estimates.
 * Uses pricing data from the existing pricing engine.
 */

import { v4 as uuidv4 } from 'uuid';
import { MATERIAL_PRICES, LABOUR_RATES } from '@/lib/pricing-engine';

export interface DefectObservation {
  code: string; // C1, C2, C3, FI
  description: string;
  location?: string;
  circuitRef?: string;
}

export interface RemedialQuoteItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  category: 'materials' | 'labour';
  subcategory?: string;
  materialCode?: string;
  notes?: string;
  source: 'eicr-defect';
  defectCode: string;
  defectDescription: string;
  labourHours?: number;
}

interface RemedialMapping {
  materials: Array<{
    description: string;
    unitPrice: number;
    quantity: number;
    unit: string;
    subcategory: string;
  }>;
  labourHours: number;
  labourDescription: string;
  category: string;
}

/**
 * Defect-to-remedial mapping table.
 * Each entry: regex pattern → materials + labour needed to remediate.
 * Patterns match common EICR defect descriptions per BS 7671.
 */
const DEFECT_REMEDIAL_MAP: Array<{
  pattern: RegExp;
  mapping: RemedialMapping;
}> = [
  // ─── RCD / RCBO Protection ───
  {
    pattern: /rcd\s*protect|rcd\s*missing|no\s*rcd|additional\s*rcd|rcd\s*required/i,
    mapping: {
      materials: [
        {
          description: 'RCBO Type A 30mA 32A',
          unitPrice: MATERIAL_PRICES.rcbo.type_b_32a_30ma.price,
          quantity: 1,
          unit: 'units',
          subcategory: 'Protection Devices',
        },
      ],
      labourHours: 1.5,
      labourDescription: 'Install RCD/RCBO protection',
      category: 'Consumer Unit',
    },
  },
  {
    pattern: /rcbo|rcd\s*type\s*a/i,
    mapping: {
      materials: [
        {
          description: 'RCBO Type A 30mA 40A',
          unitPrice: MATERIAL_PRICES.rcbo.type_b_40a_30ma.price,
          quantity: 1,
          unit: 'units',
          subcategory: 'Protection Devices',
        },
      ],
      labourHours: 1,
      labourDescription: 'Replace/install RCBO',
      category: 'Consumer Unit',
    },
  },

  // ─── Consumer Unit ───
  {
    pattern: /consumer\s*unit|distribution\s*board|fuse\s*board|fuse\s*box|cu\s*replacement|non[\s-]*compliant\s*cu|plastic\s*consumer/i,
    mapping: {
      materials: [
        {
          description: '12-Way Metal Consumer Unit (Dual RCD)',
          unitPrice: MATERIAL_PRICES.consumer_units['12way_metal_dual_rcd'].price,
          quantity: 1,
          unit: 'units',
          subcategory: 'Distribution Equipment',
        },
        {
          description: 'Earth Clamp',
          unitPrice: MATERIAL_PRICES.sundries.earth_clamp.price,
          quantity: 2,
          unit: 'units',
          subcategory: 'Fixings & Supports',
        },
      ],
      labourHours: 6,
      labourDescription: 'Consumer unit replacement and circuit reconnection',
      category: 'Consumer Unit',
    },
  },

  // ─── Earthing & Bonding ───
  {
    pattern: /earth\s*bonding|main\s*bonding|protective\s*bonding|bonding\s*conductor|supplementary\s*bonding|lack\s*of\s*bonding/i,
    mapping: {
      materials: [
        {
          description: '10mm Earth Cable (metres)',
          unitPrice: MATERIAL_PRICES.cable['10mm_twin_earth'].price,
          quantity: 5,
          unit: 'metres',
          subcategory: 'Cables & Conductors',
        },
        {
          description: 'Earth Clamp',
          unitPrice: MATERIAL_PRICES.sundries.earth_clamp.price,
          quantity: 2,
          unit: 'units',
          subcategory: 'Fixings & Supports',
        },
      ],
      labourHours: 2,
      labourDescription: 'Install/replace protective bonding conductors',
      category: 'Earthing',
    },
  },
  {
    pattern: /earth\s*electrode|earth\s*rod|earthing\s*arrangement|earthing\s*conductor|main\s*earth/i,
    mapping: {
      materials: [
        {
          description: '16mm Earth Cable (metres)',
          unitPrice: MATERIAL_PRICES.cable['16mm_twin_earth'].price,
          quantity: 3,
          unit: 'metres',
          subcategory: 'Cables & Conductors',
        },
        {
          description: 'Earth Clamp',
          unitPrice: MATERIAL_PRICES.sundries.earth_clamp.price,
          quantity: 1,
          unit: 'units',
          subcategory: 'Fixings & Supports',
        },
      ],
      labourHours: 2.5,
      labourDescription: 'Upgrade/replace earthing arrangement',
      category: 'Earthing',
    },
  },

  // ─── Socket Outlets ───
  {
    pattern: /socket\s*outlet|damaged\s*socket|broken\s*socket|cracked\s*socket|loose\s*socket|socket\s*replace/i,
    mapping: {
      materials: [
        {
          description: 'Double Socket Outlet (Metal Clad)',
          unitPrice: MATERIAL_PRICES.accessories.metal_clad_socket_double.price,
          quantity: 1,
          unit: 'units',
          subcategory: 'Accessories',
        },
        {
          description: 'Metal Back Box (Double)',
          unitPrice: MATERIAL_PRICES.sundries.metal_back_box_double.price,
          quantity: 1,
          unit: 'units',
          subcategory: 'Fixings & Supports',
        },
      ],
      labourHours: 0.75,
      labourDescription: 'Replace damaged socket outlet',
      category: 'Accessories',
    },
  },

  // ─── Switches ───
  {
    pattern: /light\s*switch|damaged\s*switch|broken\s*switch|cracked\s*switch|switch\s*replace/i,
    mapping: {
      materials: [
        {
          description: 'Light Switch (1 Gang, Metal Clad)',
          unitPrice: MATERIAL_PRICES.accessories.metal_clad_switch_1gang.price,
          quantity: 1,
          unit: 'units',
          subcategory: 'Accessories',
        },
      ],
      labourHours: 0.5,
      labourDescription: 'Replace damaged light switch',
      category: 'Accessories',
    },
  },

  // ─── Wiring / Cable ───
  {
    pattern: /damaged\s*cable|cable\s*damage|cable\s*not\s*suitable|undersized\s*cable|inadequate\s*cable|rewire|cable\s*insulation/i,
    mapping: {
      materials: [
        {
          description: '2.5mm Twin & Earth Cable (metres)',
          unitPrice: MATERIAL_PRICES.cable['2.5mm_twin_earth'].price,
          quantity: 10,
          unit: 'metres',
          subcategory: 'Cables & Conductors',
        },
        {
          description: 'Cable Clips (100 pack)',
          unitPrice: MATERIAL_PRICES.sundries.cable_clips_100pack.price,
          quantity: 1,
          unit: 'units',
          subcategory: 'Fixings & Supports',
        },
      ],
      labourHours: 2,
      labourDescription: 'Replace/upgrade damaged cabling',
      category: 'Wiring',
    },
  },

  // ─── Junction Box ───
  {
    pattern: /junction\s*box|j[\s-]*box|inaccessible\s*joint|joint\s*not\s*accessible/i,
    mapping: {
      materials: [
        {
          description: 'Junction Box 30A',
          unitPrice: MATERIAL_PRICES.sundries.junction_box_30a.price,
          quantity: 1,
          unit: 'units',
          subcategory: 'Fixings & Supports',
        },
      ],
      labourHours: 0.75,
      labourDescription: 'Replace/install accessible junction box',
      category: 'Wiring',
    },
  },

  // ─── MCB / Overcurrent Protection ───
  {
    pattern: /mcb|overcurrent|overload\s*protection|circuit\s*breaker|incorrect\s*rating|fuse\s*rating/i,
    mapping: {
      materials: [
        {
          description: 'MCB Type B 32A',
          unitPrice: MATERIAL_PRICES.mcb.type_b_32a.price,
          quantity: 1,
          unit: 'units',
          subcategory: 'Protection Devices',
        },
      ],
      labourHours: 0.5,
      labourDescription: 'Replace MCB/overcurrent protection device',
      category: 'Consumer Unit',
    },
  },

  // ─── Ceiling Rose / Lighting ───
  {
    pattern: /ceiling\s*rose|light\s*fitting|lighting\s*point|damaged\s*light|pendant|luminaire/i,
    mapping: {
      materials: [
        {
          description: 'Ceiling Rose',
          unitPrice: MATERIAL_PRICES.accessories.ceiling_rose.price,
          quantity: 1,
          unit: 'units',
          subcategory: 'Accessories',
        },
      ],
      labourHours: 0.5,
      labourDescription: 'Replace ceiling rose/light fitting',
      category: 'Lighting',
    },
  },

  // ─── Cooker / High Power ───
  {
    pattern: /cooker|cooker\s*switch|cooker\s*outlet|cooker\s*circuit/i,
    mapping: {
      materials: [
        {
          description: 'Cooker Switch 45A',
          unitPrice: MATERIAL_PRICES.accessories.cooker_switch_45a.price,
          quantity: 1,
          unit: 'units',
          subcategory: 'Accessories',
        },
        {
          description: '6mm Twin & Earth Cable (metres)',
          unitPrice: MATERIAL_PRICES.cable['6mm_twin_earth'].price,
          quantity: 5,
          unit: 'metres',
          subcategory: 'Cables & Conductors',
        },
      ],
      labourHours: 2,
      labourDescription: 'Install/replace cooker circuit and switch',
      category: 'Circuits',
    },
  },

  // ─── Fused Spur ───
  {
    pattern: /fused\s*spur|fcu|fused\s*connection/i,
    mapping: {
      materials: [
        {
          description: 'Fused Spur 13A',
          unitPrice: MATERIAL_PRICES.accessories.fused_spur_13a.price,
          quantity: 1,
          unit: 'units',
          subcategory: 'Accessories',
        },
      ],
      labourHours: 0.75,
      labourDescription: 'Install/replace fused connection unit',
      category: 'Accessories',
    },
  },

  // ─── Conduit / Containment ───
  {
    pattern: /conduit|trunking|cable\s*containment|mechanical\s*protection/i,
    mapping: {
      materials: [
        {
          description: 'PVC Conduit 20mm (metres)',
          unitPrice: MATERIAL_PRICES.sundries.plastic_conduit_20mm_per_m.price,
          quantity: 3,
          unit: 'metres',
          subcategory: 'Cable Management',
        },
      ],
      labourHours: 1,
      labourDescription: 'Install cable containment/conduit',
      category: 'Containment',
    },
  },

  // ─── Labelling / Identification ───
  {
    pattern: /label|circuit\s*identification|circuit\s*chart|schedule\s*of\s*circuits|not\s*labelled|inadequate\s*labelling/i,
    mapping: {
      materials: [],
      labourHours: 1,
      labourDescription: 'Provide circuit identification and labelling',
      category: 'Documentation',
    },
  },

  // ─── Testing / Inspection ───
  {
    pattern: /re[\s-]*test|further\s*investigation|further\s*inspection|requires\s*testing/i,
    mapping: {
      materials: [],
      labourHours: 2,
      labourDescription: 'Further investigation and testing',
      category: 'Testing',
    },
  },
];

/**
 * Maps an array of EICR defect observations to remedial quote items.
 * Only processes C1, C2, C3, and FI coded defects.
 */
export function mapDefectsToQuoteItems(defects: DefectObservation[]): RemedialQuoteItem[] {
  const items: RemedialQuoteItem[] = [];
  const labourRate = LABOUR_RATES.hourly.electrician;

  for (const defect of defects) {
    // Only process actionable defect codes
    const code = defect.code?.toUpperCase?.() || '';
    if (!['C1', 'C2', 'C3', 'FI'].includes(code)) continue;

    const description = defect.description || '';
    if (!description.trim()) continue;

    let matched = false;

    for (const { pattern, mapping } of DEFECT_REMEDIAL_MAP) {
      if (pattern.test(description)) {
        matched = true;

        // Add material items
        for (const material of mapping.materials) {
          items.push({
            id: uuidv4(),
            description: material.description,
            quantity: material.quantity,
            unit: material.unit,
            unitPrice: material.unitPrice,
            totalPrice: material.unitPrice * material.quantity,
            category: 'materials',
            subcategory: material.subcategory,
            materialCode: generateCode(material.subcategory),
            notes: `${code} defect: ${truncate(description, 80)}${defect.location ? ` — ${defect.location}` : ''}`,
            source: 'eicr-defect',
            defectCode: code,
            defectDescription: description,
          });
        }

        // Add labour item
        if (mapping.labourHours > 0) {
          items.push({
            id: uuidv4(),
            description: mapping.labourDescription,
            quantity: mapping.labourHours,
            unit: 'hours',
            unitPrice: labourRate,
            totalPrice: labourRate * mapping.labourHours,
            category: 'labour',
            subcategory: mapping.category,
            notes: `${code} defect: ${truncate(description, 80)}${defect.location ? ` — ${defect.location}` : ''}`,
            source: 'eicr-defect',
            defectCode: code,
            defectDescription: description,
            labourHours: mapping.labourHours,
          });
        }

        break; // Use first match only
      }
    }

    // Fallback for unrecognised defects — add generic remedial labour
    if (!matched) {
      const urgencyHours = code === 'C1' ? 2 : code === 'C2' ? 1.5 : 1;
      items.push({
        id: uuidv4(),
        description: `Remedial work: ${truncate(description, 60)}`,
        quantity: urgencyHours,
        unit: 'hours',
        unitPrice: labourRate,
        totalPrice: labourRate * urgencyHours,
        category: 'labour',
        subcategory: 'General Remedial',
        notes: `${code} defect: ${description}${defect.location ? ` — ${defect.location}` : ''}`,
        source: 'eicr-defect',
        defectCode: code,
        defectDescription: description,
        labourHours: urgencyHours,
      });
    }
  }

  return items;
}

function generateCode(subcategory: string): string {
  const prefix = (subcategory || 'GEN').replace(/[^A-Z]/gi, '').substring(0, 3).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${random}`;
}

function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + '...';
}
