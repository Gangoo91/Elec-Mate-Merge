/**
 * Shared text processing utilities for agent responses
 * Converts markdown to clean HTML and segments content
 */

export interface ParsedSection {
  type: 'header' | 'paragraph' | 'list' | 'calculation' | 'citation';
  content: string;
  items?: string[];
}

/**
 * Remove markdown formatting and clean agent text
 */
export const cleanAgentText = (text: string): string => {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')  // Remove bold **text**
    .replace(/\*([^*]+)\*/g, '$1')      // Remove italic *text*
    .replace(/`([^`]+)`/g, '$1')        // Remove code `text`
    .replace(/#{1,6}\s+/g, '')          // Remove markdown headers
    .replace(/^\s*[-*+]\s+/gm, '')      // Remove list markers (for plain text)
    .trim();
};

/**
 * Parse agent response into structured sections
 */
export const parseAgentResponse = (text: string): ParsedSection[] => {
  const sections: ParsedSection[] = [];
  const lines = text.split('\n');
  
  let currentList: string[] = [];
  let currentParagraph = '';
  
  const flushParagraph = () => {
    if (currentParagraph.trim()) {
      sections.push({
        type: 'paragraph',
        content: currentParagraph.trim()
      });
      currentParagraph = '';
    }
  };
  
  const flushList = () => {
    if (currentList.length > 0) {
      sections.push({
        type: 'list',
        content: '',
        items: currentList
      });
      currentList = [];
    }
  };
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Skip empty lines
    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }
    
    // Header (markdown or all caps with colon)
    if (/^#{1,6}\s+/.test(trimmed) || (/^[A-Z\s&]{3,}:/.test(trimmed) && trimmed.length < 80)) {
      flushParagraph();
      flushList();
      const headerText = trimmed.replace(/^#{1,6}\s+/, '').replace(/\*\*/g, '');
      sections.push({
        type: 'header',
        content: headerText
      });
      continue;
    }
    
    // List item
    if (/^\s*[-*•]\s+/.test(trimmed)) {
      flushParagraph();
      const item = trimmed.replace(/^\s*[-*•]\s+/, '').replace(/\*\*/g, '');
      currentList.push(item);
      continue;
    }
    
    // Numbered list
    if (/^\s*\d+\.\s+/.test(trimmed)) {
      flushParagraph();
      const item = trimmed.replace(/^\s*\d+\.\s+/, '').replace(/\*\*/g, '');
      currentList.push(item);
      continue;
    }
    
    // BS 7671 citation or regulation reference
    if (/BS\s*7671|Reg(?:ulation)?\s*\d+|\d{3}\.\d+/.test(trimmed)) {
      flushParagraph();
      flushList();
      sections.push({
        type: 'citation',
        content: trimmed.replace(/\*\*/g, '')
      });
      continue;
    }
    
    // Calculation (contains mathematical symbols or units)
    if (/[÷×=]|mm²|kW|A\b|V\b|\d+\.\d+/.test(trimmed) && trimmed.length < 120) {
      flushParagraph();
      flushList();
      sections.push({
        type: 'calculation',
        content: trimmed.replace(/\*\*/g, '')
      });
      continue;
    }
    
    // Regular paragraph
    flushList();
    currentParagraph += (currentParagraph ? ' ' : '') + trimmed.replace(/\*\*/g, '');
  }
  
  // Flush remaining content
  flushParagraph();
  flushList();
  
  return sections;
};

/**
 * Extract specific sections from agent response
 */
export const extractSections = (text: string): Record<string, string> => {
  const sections: Record<string, string> = {};
  const lines = text.split('\n');
  
  let currentSection = '';
  let currentContent: string[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Check for section headers (all caps with colon or markdown headers)
    if (/^[A-Z\s&]{3,}:/.test(trimmed) || /^#{1,6}\s+[A-Z]/.test(trimmed)) {
      // Save previous section
      if (currentSection && currentContent.length > 0) {
        sections[currentSection] = currentContent.join('\n').trim();
      }
      
      // Start new section
      currentSection = trimmed
        .replace(/^#{1,6}\s+/, '')
        .replace(/[:\*]/g, '')
        .toLowerCase()
        .replace(/\s+/g, '_');
      currentContent = [];
    } else if (trimmed && currentSection) {
      currentContent.push(trimmed);
    }
  }
  
  // Save last section
  if (currentSection && currentContent.length > 0) {
    sections[currentSection] = currentContent.join('\n').trim();
  }
  
  return sections;
};
