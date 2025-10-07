import { QuoteItem, Quote, QuoteClient, JobDetails, QuoteSettings } from '@/types/quote';
import { v4 as uuidv4 } from 'uuid';

export interface CostEngineerMaterial {
  item: string;
  quantity: number;
  unitPrice: number;
  supplier: string;
  total: number;
}

export interface CostEngineerOutput {
  materials: CostEngineerMaterial[];
  labour: {
    hours: number;
    rate: number;
    total: number;
  };
  totalCost: number;
  vatAmount?: number;
  breakdown?: {
    materialsTotal: number;
    labourTotal: number;
  };
  valueEngineering?: string[];
}

/**
 * Transforms Cost Engineer output into Quote Builder format
 * Converts AI-generated cost breakdown into formal quotation items
 */
export function transformCostOutputToQuoteItems(
  costOutput: CostEngineerOutput,
  conversationId?: string
): QuoteItem[] {
  const quoteItems: QuoteItem[] = [];
  
  // Add material items
  costOutput.materials.forEach(material => {
    quoteItems.push({
      id: uuidv4(),
      description: material.item,
      quantity: material.quantity,
      unit: determineUnit(material.item),
      unitPrice: material.unitPrice,
      totalPrice: material.total,
      category: 'materials',
      subcategory: categorizeMaterial(material.item),
      materialCode: generateMaterialCode(material.item),
      notes: `Supplier: ${material.supplier}`,
    });
  });
  
  // Add labour item
  if (costOutput.labour.hours > 0) {
    quoteItems.push({
      id: uuidv4(),
      description: 'Electrical Installation Labour',
      quantity: costOutput.labour.hours,
      unit: 'hours',
      unitPrice: costOutput.labour.rate,
      totalPrice: costOutput.labour.total,
      category: 'labour',
      workerType: 'Qualified Electrician',
      hours: costOutput.labour.hours,
      hourlyRate: costOutput.labour.rate,
    });
  }
  
  return quoteItems;
}

/**
 * Creates a complete Quote object from Cost Engineer output
 */
export function createQuoteFromCostOutput(
  costOutput: CostEngineerOutput,
  client: QuoteClient,
  jobDetails: JobDetails,
  settings: Partial<QuoteSettings> = {},
  conversationId?: string
): Partial<Quote> {
  const items = transformCostOutputToQuoteItems(costOutput, conversationId);
  
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  
  const defaultSettings: QuoteSettings = {
    labourRate: costOutput.labour.rate || 45,
    overheadPercentage: settings.overheadPercentage || 15,
    profitMargin: settings.profitMargin || 20,
    vatRate: settings.vatRate || 20,
    vatRegistered: settings.vatRegistered ?? true,
  };
  
  const overhead = subtotal * (defaultSettings.overheadPercentage / 100);
  const profit = subtotal * (defaultSettings.profitMargin / 100);
  const subtotalWithMargins = subtotal + overhead + profit;
  const vatAmount = defaultSettings.vatRegistered 
    ? subtotalWithMargins * (defaultSettings.vatRate / 100)
    : 0;
  const total = subtotalWithMargins + vatAmount;
  
  return {
    quoteNumber: generateQuoteNumber(),
    client,
    jobDetails,
    items,
    settings: defaultSettings,
    subtotal,
    overhead,
    profit,
    vatAmount,
    total,
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    notes: costOutput.valueEngineering?.join('\n'),
  };
}

function determineUnit(itemName: string): string {
  const itemLower = itemName.toLowerCase();
  
  if (itemLower.includes('cable') || itemLower.includes('wire')) return 'metres';
  if (itemLower.includes('conduit') || itemLower.includes('trunking')) return 'metres';
  if (itemLower.includes('mcb') || itemLower.includes('rcbo') || itemLower.includes('switch')) return 'units';
  if (itemLower.includes('board') || itemLower.includes('panel')) return 'units';
  if (itemLower.includes('socket') || itemLower.includes('light')) return 'units';
  if (itemLower.includes('clip') || itemLower.includes('cleat')) return 'units';
  
  return 'units';
}

function categorizeMaterial(itemName: string): string {
  const itemLower = itemName.toLowerCase();
  
  if (itemLower.includes('cable') || itemLower.includes('wire')) return 'Cables & Conductors';
  if (itemLower.includes('mcb') || itemLower.includes('rcbo') || itemLower.includes('rcd')) return 'Protection Devices';
  if (itemLower.includes('board') || itemLower.includes('panel') || itemLower.includes('enclosure')) return 'Distribution Equipment';
  if (itemLower.includes('socket') || itemLower.includes('switch')) return 'Accessories';
  if (itemLower.includes('conduit') || itemLower.includes('trunking')) return 'Cable Management';
  if (itemLower.includes('clip') || itemLower.includes('cleat') || itemLower.includes('tie')) return 'Fixings & Supports';
  
  return 'General Materials';
}

function generateMaterialCode(itemName: string): string {
  const category = categorizeMaterial(itemName).replace(/[^A-Z]/g, '').substring(0, 3);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${category}-${random}`;
}

function generateQuoteNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().substring(2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `Q${year}${month}-${random}`;
}
