import { QuoteItem, Quote, QuoteClient, JobDetails, QuoteSettings } from "@/types/quote";

/**
 * Parses the Cost Engineer agent's response to extract quote data
 */
export function parseQuoteFromCostAgent(
  costEngineerResponse: string,
  client?: Partial<QuoteClient>,
  jobDetails?: Partial<JobDetails>
): Partial<Quote> {
  const items: QuoteItem[] = [];
  let materialsSubtotal = 0;
  let labourSubtotal = 0;
  let vatAmount = 0;
  let finalTotal = 0;

  // Extract materials
  const materialsSectionMatch = costEngineerResponse.match(/MATERIALS BREAKDOWN([\s\S]*?)(?:Subtotal Materials:|LABOUR ESTIMATE|$)/i);
  if (materialsSectionMatch) {
    const materialsText = materialsSectionMatch[1];
    // Match bullet point items: • [Item] (qty) - £[price] from [Supplier]
    const materialRegex = /[•\-\*]\s*(.+?)\s*\(([^)]+)\)\s*-\s*£([\d.,]+)(?:\s+from\s+(.+?))?(?:\s+[✓⚠].*)?$/gm;
    let match;
    
    while ((match = materialRegex.exec(materialsText)) !== null) {
      const [, itemName, quantity, price, supplier] = match;
      const unitPrice = parseFloat(price.replace(/,/g, ''));
      
      items.push({
        id: `mat-${items.length + 1}`,
        description: itemName.trim(),
        quantity: parseQuantity(quantity.trim()),
        unit: determineUnit(quantity.trim()),
        unitPrice,
        totalPrice: unitPrice,
        category: 'materials',
        materialCode: generateMaterialCode(itemName.trim())
      });
      
      materialsSubtotal += unitPrice;
    }
  }

  // Extract materials subtotal
  const materialsSubtotalMatch = costEngineerResponse.match(/Subtotal Materials:\s*£([\d.,]+)/i);
  if (materialsSubtotalMatch) {
    materialsSubtotal = parseFloat(materialsSubtotalMatch[1].replace(/,/g, ''));
  }

  // Extract labour
  const labourSectionMatch = costEngineerResponse.match(/LABOUR ESTIMATE([\s\S]*?)(?:Subtotal Labour:|PROJECT TOTAL|$)/i);
  if (labourSectionMatch) {
    const labourText = labourSectionMatch[1];
    
    // Extract installation time
    const timeMatch = labourText.match(/Installation time:\s*([\d.]+)\s*hours?/i);
    const rateMatch = labourText.match(/Rate:\s*£([\d.,]+)\/day/i);
    const costMatch = labourText.match(/Labour cost:\s*£([\d.,]+)/i);
    
    if (timeMatch && costMatch) {
      const hours = parseFloat(timeMatch[1]);
      const cost = parseFloat(costMatch[1].replace(/,/g, ''));
      const rate = rateMatch ? parseFloat(rateMatch[1].replace(/,/g, '')) : 0;
      
      items.push({
        id: 'labour-1',
        description: `Installation Labour (${hours} hours)`,
        quantity: hours,
        unit: 'hours',
        unitPrice: rate / 8, // Convert day rate to hourly
        totalPrice: cost,
        category: 'labour'
      });
      
      labourSubtotal = cost;
    }
  }

  // Extract labour subtotal
  const labourSubtotalMatch = costEngineerResponse.match(/Subtotal Labour:\s*£([\d.,]+)/i);
  if (labourSubtotalMatch) {
    labourSubtotal = parseFloat(labourSubtotalMatch[1].replace(/,/g, ''));
  }

  // Extract VAT and final total
  const vatMatch = costEngineerResponse.match(/VAT \(20%\):\s*£([\d.,]+)/i);
  if (vatMatch) {
    vatAmount = parseFloat(vatMatch[1].replace(/,/g, ''));
  }

  const finalTotalMatch = costEngineerResponse.match(/FINAL QUOTE:\s*£([\d.,]+)/i);
  if (finalTotalMatch) {
    finalTotal = parseFloat(finalTotalMatch[1].replace(/,/g, ''));
  }

  // Calculate subtotal if not found
  const subtotal = materialsSubtotal + labourSubtotal;
  
  // Calculate VAT if not found (20%)
  if (!vatAmount) {
    vatAmount = subtotal * 0.2;
  }

  // Calculate final total if not found
  if (!finalTotal) {
    finalTotal = subtotal + vatAmount;
  }

  // Create quote object
  const quote: Partial<Quote> = {
    items,
    client: {
      name: client?.name || "Client Name",
      email: client?.email || "",
      phone: client?.phone || "",
      address: client?.address || "",
      postcode: ""
    },
    jobDetails: {
      title: jobDetails?.title || "Electrical Installation",
      description: jobDetails?.description || "",
      location: jobDetails?.location || ""
    },
    settings: {
      labourRate: labourSubtotal > 0 && items.find(i => i.category === 'labour') 
        ? (items.find(i => i.category === 'labour')!.unitPrice * 8) 
        : 250,
      overheadPercentage: 0,
      profitMargin: 0,
      vatRate: 20,
      vatRegistered: true
    },
    subtotal,
    overhead: 0,
    profit: 0,
    vatAmount,
    total: finalTotal,
    quoteNumber: generateQuoteNumber(),
    status: 'draft',
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return quote;
}

function parseQuantity(quantityStr: string): number {
  const match = quantityStr.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 1;
}

function determineUnit(quantityStr: string): string {
  const lower = quantityStr.toLowerCase();
  if (lower.includes('m') && !lower.includes('mm')) return 'm';
  if (lower.includes('metre')) return 'm';
  if (lower.includes('meter')) return 'm';
  return 'each';
}

function generateMaterialCode(itemName: string): string {
  const words = itemName.split(' ').filter(w => w.length > 2);
  return words.slice(0, 3).map(w => w.substring(0, 3).toUpperCase()).join('-');
}

function generateQuoteNumber(): string {
  const now = new Date();
  return `Q-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}
