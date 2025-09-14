// Utility functions for processing electrical text content for better display

export const processElectricalText = (text: string): string => {
  if (!text) return text;
  
  return text
    // Format BS 7671 references
    .replace(/BS 7671:?(\d{4})?(\+A\d:?\d{4})?/gi, '<span class="inline-flex items-center px-2 py-1 rounded-md bg-elec-yellow/20 text-elec-yellow font-medium text-sm">BS 7671$1$2</span>')
    
    // Format regulation numbers (e.g., 411.3.3, 134.1.1)
    .replace(/(\d{3}\.\d+\.\d+)/g, '<span class="inline-flex items-center px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono text-xs">$1</span>')
    
    // Format classification codes (C1, C2, C3, FI)
    .replace(/\b(C[123]|FI)\b/g, '<span class="inline-flex items-center px-1.5 py-0.5 rounded-md bg-red-500/20 text-red-400 font-semibold text-xs">$1</span>')
    
    // Format electrical terms
    .replace(/\b(RCD|RCBO|MCB|AFDD|SPD)\b/g, '<span class="font-medium text-elec-yellow">$1</span>')
    
    // Format safety classifications with proper colours
    .replace(/\b(SATISFACTORY|PASS)\b/gi, '<span class="inline-flex items-center px-2 py-1 rounded-md bg-green-500/20 text-green-400 font-medium text-sm">$1</span>')
    .replace(/\b(UNSATISFACTORY|FAIL|DANGEROUS)\b/gi, '<span class="inline-flex items-center px-2 py-1 rounded-md bg-red-500/20 text-red-400 font-medium text-sm">$1</span>')
    .replace(/\b(INVESTIGATION REQUIRED|IMPROVEMENT RECOMMENDED)\b/gi, '<span class="inline-flex items-center px-2 py-1 rounded-md bg-orange-500/20 text-orange-400 font-medium text-sm">$1</span>')
    
    // Format measurements and readings
    .replace(/(\d+\.?\d*)\s?(Ω|ohms?|A|V|kV|mA|ms|MΩ)/gi, '<span class="font-mono text-sm bg-muted/50 px-1 py-0.5 rounded">$1$2</span>')
    
    // Bold text formatting
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    
    // Italic text formatting
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    
    // Format headings (starts with #)
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-foreground mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold text-foreground mt-6 mb-3">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-foreground mt-8 mb-4">$1</h1>')
    
    // Format lists
    .replace(/^[\s]*[\-\*\+]\s(.*)$/gm, '<li class="ml-4 mb-1 text-foreground">• $1</li>')
    
    // Convert paragraph breaks
    .replace(/\n\n/g, '</p><p class="mb-4 text-foreground leading-relaxed">')
    
    // Convert line breaks
    .replace(/\n/g, '<br/>')
    
    // Format UK electrical terms with proper emphasis
    .replace(/\b(earthing|earth|neutral|live|CPC|equipotential bonding)\b/gi, '<span class="font-medium text-blue-400">$1</span>')
    
    // Format safety warnings
    .replace(/\b(DANGER|WARNING|CAUTION|IMMEDIATELY|URGENT)\b/gi, '<span class="inline-flex items-center px-2 py-1 rounded-md bg-red-500/30 text-red-300 font-bold text-sm animate-pulse">⚠️ $1</span>');
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