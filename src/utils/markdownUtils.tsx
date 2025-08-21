import React from 'react';

export interface MarkdownElement {
  type: 'text' | 'bold' | 'italic' | 'list' | 'paragraph';
  content: string;
  children?: MarkdownElement[];
}

/**
 * Lightweight markdown parser for CV content
 * Handles: **bold**, *italic*, lists (- or *), and line breaks
 */
export const parseMarkdown = (text: string): MarkdownElement[] => {
  if (!text) return [];

  // Split into lines and process
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  const elements: MarkdownElement[] = [];

  for (const line of lines) {
    // Check if line is a list item
    if (line.match(/^[-*]\s+/)) {
      const content = line.replace(/^[-*]\s+/, '').trim();
      elements.push({
        type: 'list',
        content: processInlineFormatting(content)
      });
    } else if (line.length > 0) {
      // Regular paragraph
      elements.push({
        type: 'paragraph',
        content: processInlineFormatting(line)
      });
    }
  }

  return elements;
};

/**
 * Process inline formatting like **bold** and *italic*
 */
const processInlineFormatting = (text: string): string => {
  // Handle **bold** and __bold__
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__(.*?)__/g, '<strong>$1</strong>');
  
  // Handle *italic* and _italic_ (but not already processed bold)
  text = text.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>');
  text = text.replace(/(?<!_)_([^_]+?)_(?!_)/g, '<em>$1</em>');
  
  return text;
};

/**
 * Render markdown elements as JSX
 */
export const renderMarkdown = (elements: MarkdownElement[]): JSX.Element[] => {
  return elements.map((element, index) => {
    switch (element.type) {
      case 'list':
        return (
          <div key={index} className="flex items-start gap-3">
            <span className="text-cv-gold mt-1.5 text-xs">▪</span>
            <span 
              className="flex-1 text-justify" 
              dangerouslySetInnerHTML={{ __html: element.content }}
            />
          </div>
        );
      case 'paragraph':
        return (
          <div 
            key={index} 
            className="text-justify"
            dangerouslySetInnerHTML={{ __html: element.content }}
          />
        );
      default:
        return <span key={index}>{element.content}</span>;
    }
  });
};

/**
 * Convert markdown text to formatted JSX for CV display
 */
export const formatMarkdownForCV = (text: string): JSX.Element[] => {
  const elements = parseMarkdown(text);
  return renderMarkdown(elements);
};

/**
 * Legacy function for backward compatibility - converts description to bullet points
 * Now handles markdown properly
 */
export const formatDescription = (description: string): JSX.Element[] => {
  if (!description) return [];
  
  // If it contains markdown formatting, use the markdown parser
  if (description.includes('**') || description.includes('*') || description.includes('-') || description.includes('\n')) {
    return formatMarkdownForCV(description);
  }
  
  // Fallback to sentence splitting for plain text
  const sentences = description.split(/[.\n]+/).filter(item => item.trim().length > 0);
  return sentences.map((sentence, index) => (
    <div key={index} className="flex items-start gap-3">
      <span className="text-cv-gold mt-1.5 text-xs">▪</span>
      <span className="flex-1 text-justify">{sentence.trim()}</span>
    </div>
  ));
};