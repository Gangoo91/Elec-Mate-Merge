
export interface SearchResult {
  id: string;
  title: string;
  regulation: string;
  description: string;
  category: string;
  content: string;
  relevance: number;
}

export interface SearchableItem {
  id: string;
  title: string;
  regulation: string;
  description: string;
  category: string;
  content: string;
  keywords: string[];
}

// Comprehensive searchable regulation database
// BS 7671 Table 41.3 values - these are the MAXIMUM permitted values from the standard
const SEARCHABLE_REGULATIONS: SearchableItem[] = [
  // Zs Values - BS 7671 Table 41.3(a) Type B MCBs
  {
    id: 'zs-6a-b',
    title: '6A Type B MCB Maximum Zs',
    regulation: 'Table 41.3(a)',
    description: 'Maximum earth fault loop impedance for 6A Type B MCB',
    category: 'Zs Values',
    content: '7.28Ω (BS 7671 Table 41.3(a) - 0.4s disconnection)',
    keywords: ['zs', 'earth fault', 'loop impedance', '6a', 'mcb', 'type b', 'protection']
  },
  {
    id: 'zs-10a-b',
    title: '10A Type B MCB Maximum Zs',
    regulation: 'Table 41.3(a)',
    description: 'Maximum earth fault loop impedance for 10A Type B MCB',
    category: 'Zs Values',
    content: '4.37Ω (BS 7671 Table 41.3(a) - 0.4s disconnection)',
    keywords: ['zs', 'earth fault', 'loop impedance', '10a', 'mcb', 'type b', 'protection']
  },
  {
    id: 'zs-16a-b',
    title: '16A Type B MCB Maximum Zs',
    regulation: 'Table 41.3(a)',
    description: 'Maximum earth fault loop impedance for 16A Type B MCB',
    category: 'Zs Values',
    content: '2.73Ω (BS 7671 Table 41.3(a) - 0.4s disconnection)',
    keywords: ['zs', 'earth fault', 'loop impedance', '16a', 'mcb', 'type b', 'protection']
  },
  {
    id: 'zs-20a-b',
    title: '20A Type B MCB Maximum Zs',
    regulation: 'Table 41.3(a)',
    description: 'Maximum earth fault loop impedance for 20A Type B MCB',
    category: 'Zs Values',
    content: '2.19Ω (BS 7671 Table 41.3(a) - 0.4s disconnection)',
    keywords: ['zs', 'earth fault', 'loop impedance', '20a', 'mcb', 'type b', 'protection']
  },
  {
    id: 'zs-32a-b',
    title: '32A Type B MCB Maximum Zs',
    regulation: 'Table 41.3(a)',
    description: 'Maximum earth fault loop impedance for 32A Type B MCB',
    category: 'Zs Values',
    content: '1.37Ω (BS 7671 Table 41.3(a) - 0.4s disconnection)',
    keywords: ['zs', 'earth fault', 'loop impedance', '32a', 'mcb', 'type b', 'protection']
  },
  // RCD Requirements
  {
    id: 'rcd-sockets',
    title: 'Socket Outlet RCD Protection',
    regulation: '411.3.3',
    description: 'RCD protection required for socket outlets',
    category: 'RCD Requirements',
    content: 'Socket outlets not exceeding 20A and for general use require 30mA RCD protection',
    keywords: ['rcd', 'socket', 'outlet', '30ma', 'protection', 'shock', 'safety']
  },
  {
    id: 'rcd-cables',
    title: 'Cable Burial RCD Protection',
    regulation: '522.6.202',
    description: 'RCD protection for buried cables',
    category: 'RCD Requirements',
    content: 'Cables buried less than 50mm in walls require 30mA RCD protection',
    keywords: ['rcd', 'cable', 'buried', 'wall', '50mm', 'protection', 'damage']
  },
  // Testing Standards
  {
    id: 'test-sequence',
    title: 'Testing Sequence Order',
    regulation: 'Regulation 612',
    description: 'Correct order for electrical testing',
    category: 'Testing',
    content: 'Continuity, Insulation, Polarity, Earth fault loop impedance, RCD operation',
    keywords: ['test', 'sequence', 'order', 'continuity', 'insulation', 'polarity', 'zs', 'rcd']
  },
  {
    id: 'insulation-min',
    title: 'Minimum Insulation Resistance',
    regulation: '612.3.2',
    description: 'Minimum acceptable insulation resistance values',
    category: 'Testing',
    content: 'Minimum 1MΩ for most circuits (0.5MΩ for SELV and circuits with electronic equipment)',
    keywords: ['insulation', 'resistance', '1meg', 'meg', 'test', 'minimum']
  },
  // Safety Requirements
  {
    id: 'bathroom-zones',
    title: 'Bathroom Zone Classification',
    regulation: '701.32',
    description: 'IP rating requirements for bathroom zones',
    category: 'Safety',
    content: 'Zone 0: IPX7, Zone 1: IPX4, Zone 2: IPX4, Outside zones: IPX1',
    keywords: ['bathroom', 'zone', 'ip', 'rating', 'water', 'protection', 'shower']
  },
  {
    id: 'isolation-requirements',
    title: 'Circuit Isolation Requirements',
    regulation: '537.2.1.1',
    description: 'Every circuit must be capable of isolation',
    category: 'Safety',
    content: 'Every circuit must have means of isolation for maintenance and emergency switching',
    keywords: ['isolation', 'circuit', 'maintenance', 'emergency', 'switch', 'isolator']
  }
];

// Simple search function
export const searchRegulations = (query: string): SearchResult[] => {
  if (!query.trim()) return [];
  
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
  
  const results = SEARCHABLE_REGULATIONS.map(item => {
    let relevance = 0;
    const searchableText = [
      item.title,
      item.regulation,
      item.description,
      item.content,
      ...item.keywords
    ].join(' ').toLowerCase();
    
    // Calculate relevance score
    searchTerms.forEach(term => {
      if (item.title.toLowerCase().includes(term)) relevance += 10;
      if (item.regulation.toLowerCase().includes(term)) relevance += 8;
      if (item.keywords.some(keyword => keyword.includes(term))) relevance += 5;
      if (searchableText.includes(term)) relevance += 2;
    });
    
    return {
      ...item,
      relevance
    };
  }).filter(item => item.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 10);
  
  return results;
};

// Get suggestions for common searches
export const getSearchSuggestions = (): string[] => [
  'RCD requirements',
  'Zs values',
  'Testing sequence',
  'Bathroom zones',
  'Socket outlets',
  'Cable protection',
  'Insulation resistance',
  'Earth fault loop',
  'MCB ratings',
  'IP ratings'
];
