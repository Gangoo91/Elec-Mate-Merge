// Utility functions for processing electrical text content for better display

/**
 * Wraps consecutive list items in proper <ul> tags
 */
const wrapListItems = (text: string): string => {
  const lines = text.split('\n');
  const result: string[] = [];
  let inList = false;
  
  for (const line of lines) {
    const isBulletPoint = /^[\s]*[\-\*\+]\s/.test(line);
    
    if (isBulletPoint) {
      if (!inList) {
        result.push('<ul class="list-disc list-outside ml-6 space-y-2 mb-4 text-left">');
        inList = true;
      }
      const content = line.replace(/^[\s]*[\-\*\+]\s/, '');
      result.push(`  <li class="leading-relaxed text-gray-200 pl-2">${content}</li>`);
    } else {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      result.push(line);
    }
  }
  
  if (inList) {
    result.push('</ul>');
  }
  
  return result.join('\n');
};

export const processElectricalText = (text: string): string => {
  if (!text) return text;
  
  // First, wrap list items properly
  text = wrapListItems(text);
  
  return text
    // Format BS 7671 references
    .replace(/BS 7671:?(\d{4})?(\+A\d:?\d{4})?/gi, '<span class="inline-flex items-center px-2 py-1 rounded-md bg-elec-yellow/20 text-elec-yellow font-medium text-sm">BS 7671$1$2</span>')
    
    // Format regulation numbers (e.g., 411.3.3, 134.1.1)
    .replace(/(\d{3}\.\d+\.\d+)/g, '<span class="inline-flex items-center px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono text-xs">$1</span>')
    
    // Format classification codes (C1, C2, C3, FI)
    .replace(/\b(C[123]|FI)\b/g, '<span class="inline-flex items-center px-1.5 py-0.5 rounded-md bg-red-500/20 text-red-400 font-semibold text-xs">$1</span>')
    
    
    // Format safety classifications with proper colours
    .replace(/\b(SATISFACTORY|PASS)\b/gi, '<span class="inline-flex items-center px-2 py-1 rounded-md bg-green-500/20 text-green-400 font-medium text-sm">$1</span>')
    .replace(/\b(UNSATISFACTORY|FAIL|DANGEROUS)\b/gi, '<span class="inline-flex items-center px-2 py-1 rounded-md bg-red-500/20 text-red-400 font-medium text-sm">$1</span>')
    .replace(/\b(INVESTIGATION REQUIRED|IMPROVEMENT RECOMMENDED)\b/gi, '<span class="inline-flex items-center px-2 py-1 rounded-md bg-orange-500/20 text-orange-400 font-medium text-sm">$1</span>')
    
    
    // Bold text formatting
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    
    // Italic text formatting
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    
    // Format headings (starts with #)
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-white mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold text-white mt-6 mb-3">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-white mt-8 mb-4">$1</h1>')
    
    // Wrap paragraphs properly
    .split('\n\n')
    .map(para => {
      const trimmed = para.trim();
      if (trimmed && !trimmed.includes('<ul') && !trimmed.includes('<h')) {
        return `<p class="mb-4 text-gray-200 leading-relaxed text-left">${trimmed}</p>`;
      }
      return para;
    })
    .join('\n')
    
    // Single line breaks become <br/> only within paragraphs
    .replace(/(?<!>)\n(?!<)/g, '<br/>');
};

export const extractKeyPoints = (text: string): string[] => {
  if (!text) return [];
  
  const points: string[] = [];
  
  // Extract safety classifications
  const classifications = text.match(/\b(C[123]|FI)\b/g);
  if (classifications?.length) {
    points.push(`Safety classifications found: ${classifications.join(', ')}`);
  }
  
  // Extract regulation references
  const regulations = text.match(/\d{3}\.\d+\.\d+/g);
  if (regulations?.length) {
    points.push(`BS 7671 regulations referenced: ${regulations.slice(0, 3).join(', ')}${regulations.length > 3 ? '...' : ''}`);
  }
  
  // Extract key electrical terms
  const electricalTerms = text.match(/\b(RCD|RCBO|MCB|AFDD|SPD|earthing|bonding)\b/gi);
  if (electricalTerms?.length) {
    const uniqueTerms = [...new Set(electricalTerms.map(term => term.toUpperCase()))];
    points.push(`Key electrical components: ${uniqueTerms.slice(0, 3).join(', ')}`);
  }
  
  return points;
};

export const estimateReadingTime = (text: string): number => {
  if (!text) return 0;
  const wordsPerMinute = 200; // Average reading speed
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export const calculateReadabilityScore = (text: string): number => {
  if (!text) return 0;
  
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const words = text.split(/\s+/).length;
  const avgWordsPerSentence = words / Math.max(sentences, 1);
  
  // Flesch Reading Ease approximation adapted for electrical content
  if (avgWordsPerSentence < 8) return 95; // Very easy
  if (avgWordsPerSentence < 12) return 85; // Easy
  if (avgWordsPerSentence < 18) return 75; // Standard
  if (avgWordsPerSentence < 25) return 65; // Difficult
  return 50; // Very difficult
};