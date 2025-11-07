export interface MaterialItem {
  item: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  supplier?: string;
}

export interface LabourDetails {
  hours: number;
  rate: number;
  total: number;
  description?: string;
}

export interface AdditionalCost {
  description: string;
  cost: number;
}

export interface ParsedCostAnalysis {
  totalCost: number;
  materialsTotal: number;
  materialsWholesale?: number;
  materialsMarkup?: number;
  labourTotal: number;
  materials: MaterialItem[];
  labour: LabourDetails;
  additionalCosts: AdditionalCost[];
  vatAmount: number;
  vatRate: number;
  subtotal: number;
  rawText: string;
}

/**
 * Parses the AI Cost Engineer response to extract structured cost data
 */
export function parseCostAnalysis(aiResponse: string): ParsedCostAnalysis {
  const materials: MaterialItem[] = [];
  let materialsTotal = 0;
  let labourTotal = 0;
  let labourHours = 0;
  let labourRate = 0;
  let vatAmount = 0;
  let vatRate = 20;
  let totalCost = 0;
  let subtotal = 0;

  // Extract materials section
  const materialsSectionMatch = aiResponse.match(/MATERIALS BREAKDOWN([\s\S]*?)(?:Subtotal Materials:|LABOUR ESTIMATE|$)/i);
  if (materialsSectionMatch) {
    const materialsText = materialsSectionMatch[1];
    
    // Match various material formats:
    // • Item (qty) - £price from Supplier
    // - Item (qty) - £price
    // * Item x qty - £price
    const materialRegex = /[•\-\*]\s*(.+?)\s*(?:\(([^)]+)\)|x\s*(\d+))\s*-\s*£([\d.,]+)(?:\s+from\s+(.+?))?(?:\s+[✓⚠].*)?$/gm;
    let match;
    
    while ((match = materialRegex.exec(materialsText)) !== null) {
      const [, itemName, qtyInParens, qtyAfterX, price, supplier] = match;
      const quantity = parseQuantity(qtyInParens || qtyAfterX || '1');
      const unitPrice = parseFloat(price.replace(/,/g, ''));
      
      materials.push({
        item: itemName.trim(),
        quantity,
        unit: determineUnit(qtyInParens || qtyAfterX || ''),
        unitPrice,
        total: unitPrice,
        supplier: supplier?.trim()
      });
      
      materialsTotal += unitPrice;
    }
  }

  // Extract materials subtotal if explicitly stated
  const materialsSubtotalMatch = aiResponse.match(/(?:Subtotal Materials?|Materials Total):\s*£([\d.,]+)/i);
  if (materialsSubtotalMatch) {
    materialsTotal = parseFloat(materialsSubtotalMatch[1].replace(/,/g, ''));
  }

  // Extract labour section
  const labourSectionMatch = aiResponse.match(/LABOUR ESTIMATE([\s\S]*?)(?:Subtotal Labour:|PROJECT TOTAL|FINAL|$)/i);
  if (labourSectionMatch) {
    const labourText = labourSectionMatch[1];
    
    // Extract installation time
    const timeMatch = labourText.match(/(?:Installation time|Duration|Time required):\s*([\d.]+)\s*hours?/i);
    if (timeMatch) {
      labourHours = parseFloat(timeMatch[1]);
    }
    
    // Extract rate
    const rateMatch = labourText.match(/Rate:\s*£([\d.,]+)(?:\/day|\/hour|per day|per hour)?/i);
    if (rateMatch) {
      labourRate = parseFloat(rateMatch[1].replace(/,/g, ''));
    }
    
    // Extract labour cost
    const costMatch = labourText.match(/(?:Labour cost|Labour Total):\s*£([\d.,]+)/i);
    if (costMatch) {
      labourTotal = parseFloat(costMatch[1].replace(/,/g, ''));
    }
  }

  // Extract labour subtotal if not found in section
  const labourSubtotalMatch = aiResponse.match(/(?:Subtotal Labour|Labour Total):\s*£([\d.,]+)/i);
  if (labourSubtotalMatch && labourTotal === 0) {
    labourTotal = parseFloat(labourSubtotalMatch[1].replace(/,/g, ''));
  }

  // Extract VAT
  const vatMatch = aiResponse.match(/VAT\s*\((\d+)%\):\s*£([\d.,]+)/i);
  if (vatMatch) {
    vatRate = parseInt(vatMatch[1]);
    vatAmount = parseFloat(vatMatch[2].replace(/,/g, ''));
  }

  // FORCE CALCULATION: Always calculate subtotal from components
  // Do NOT trust extracted "Net Total" from AI as it may include hidden margins
  const calculatedSubtotal = materialsTotal + labourTotal;
  
  // Extract subtotal from text for validation only
  const subtotalMatch = aiResponse.match(/(?:Subtotal|Net Total):\s*£([\d.,]+)/i);
  const extractedSubtotal = subtotalMatch ? parseFloat(subtotalMatch[1].replace(/,/g, '')) : 0;
  
  // Detect and log discrepancies
  if (extractedSubtotal > 0 && Math.abs(extractedSubtotal - calculatedSubtotal) > 0.01) {
    const difference = extractedSubtotal - calculatedSubtotal;
    console.warn('⚠️ SUBTOTAL MISMATCH DETECTED:', {
      extracted: extractedSubtotal,
      calculated: calculatedSubtotal,
      difference: difference,
      differencePercent: ((difference / calculatedSubtotal) * 100).toFixed(2) + '%',
      materials: materialsTotal,
      labour: labourTotal
    });
  }
  
  // Always use calculated value
  subtotal = calculatedSubtotal;

  // Calculate VAT if not found
  if (vatAmount === 0 && subtotal > 0) {
    vatAmount = subtotal * (vatRate / 100);
  }

  // Extract final total
  const finalTotalMatch = aiResponse.match(/(?:FINAL QUOTE|TOTAL COST|Grand Total|Final Total):\s*£([\d.,]+)/i);
  if (finalTotalMatch) {
    totalCost = parseFloat(finalTotalMatch[1].replace(/,/g, ''));
  } else {
    totalCost = subtotal + vatAmount;
  }

  return {
    totalCost,
    materialsTotal,
    labourTotal,
    materials,
    labour: {
      hours: labourHours,
      rate: labourRate,
      total: labourTotal,
      description: labourHours > 0 ? `Installation Labour (${labourHours} hours)` : 'Installation Labour'
    },
    additionalCosts: [],
    vatAmount,
    vatRate,
    subtotal,
    rawText: aiResponse
  };
}

function parseQuantity(quantityStr: string): number {
  if (!quantityStr) return 1;
  const match = quantityStr.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 1;
}

function determineUnit(quantityStr: string): string {
  if (!quantityStr) return 'each';
  const lower = quantityStr.toLowerCase();
  
  if (lower.includes('metre') || (lower.includes('m') && !lower.includes('mm'))) return 'm';
  if (lower.includes('meter')) return 'm';
  if (lower.includes('roll')) return 'roll';
  if (lower.includes('box')) return 'box';
  if (lower.includes('pack')) return 'pack';
  if (lower.includes('length')) return 'length';
  
  return 'each';
}
