import React from 'react';

/**
 * CV-specific markdown processor that only handles formatting appropriate for professional resumes
 * Excludes headers, code blocks, blockquotes, horizontal rules, and other elements unsuitable for CVs
 */

interface CVMarkdownToken {
  type: 'paragraph' | 'list' | 'text';
  content: string;
  items?: string[];
  ordered?: boolean;
}

export const processCVMarkdown = (text: string): JSX.Element => {
  if (!text) return <span></span>;

  // Clean up common AI-generated markdown artifacts
  const cleanedText = cleanAIMarkdownArtifacts(text);
  const tokens = tokenizeCVMarkdown(cleanedText);
  const elements: JSX.Element[] = [];

  tokens.forEach((token, index) => {
    switch (token.type) {
      case 'list':
        elements.push(renderCVList(token, index));
        break;
      case 'paragraph':
      default:
        elements.push(renderCVParagraph(token, index));
        break;
    }
  });

  return <div className="space-y-2">{elements}</div>;
};

const cleanAIMarkdownArtifacts = (text: string): string => {
  return text
    // Remove headers (# ## ### etc.)
    .replace(/^#{1,6}\s+/gm, '')
    // Remove blockquote markers (>)
    .replace(/^>\s+/gm, '')
    // Remove code block markers (```)
    .replace(/```[\s\S]*?```/g, '')
    // Remove horizontal rules (--- *** ___)
    .replace(/^(-{3,}|\*{3,}|_{3,})$/gm, '')
    // Remove inline code backticks when they wrap entire sentences
    .replace(/`([^`]{20,})`/g, '$1')
    // Clean up multiple line breaks
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const tokenizeCVMarkdown = (text: string): CVMarkdownToken[] => {
  const lines = text.split('\n');
  const tokens: CVMarkdownToken[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Process lists (bullet points for job responsibilities)
    const unorderedMatch = trimmed.match(/^[-*+•]\s+(.+)$/);
    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    
    if (unorderedMatch || orderedMatch) {
      const listItems = [];
      const isOrdered = !!orderedMatch;
      
      while (i < lines.length) {
        const currentLine = lines[i].trim();
        const unorderedItemMatch = currentLine.match(/^[-*+•]\s+(.+)$/);
        const orderedItemMatch = currentLine.match(/^\d+\.\s+(.+)$/);
        
        if ((isOrdered && orderedItemMatch) || (!isOrdered && unorderedItemMatch)) {
          listItems.push(isOrdered ? orderedItemMatch![1] : unorderedItemMatch![1]);
          i++;
        } else if (currentLine === '') {
          i++;
          // Check if next non-empty line continues the list
          let nextLineIndex = i;
          while (nextLineIndex < lines.length && lines[nextLineIndex].trim() === '') {
            nextLineIndex++;
          }
          if (nextLineIndex >= lines.length) break;
          
          const nextLine = lines[nextLineIndex].trim();
          const nextUnorderedMatch = nextLine.match(/^[-*+•]\s+(.+)$/);
          const nextOrderedMatch = nextLine.match(/^\d+\.\s+(.+)$/);
          
          if (!((isOrdered && nextOrderedMatch) || (!isOrdered && nextUnorderedMatch))) {
            break;
          }
        } else {
          break;
        }
      }
      
      tokens.push({
        type: 'list',
        items: listItems,
        ordered: isOrdered,
        content: ''
      });
      continue;
    }

    // Regular paragraph text
    const paragraphLines = [];
    while (i < lines.length && 
           lines[i].trim() !== '' && 
           !lines[i].trim().match(/^[-*+•]\s/) &&
           !lines[i].trim().match(/^\d+\.\s/)) {
      paragraphLines.push(lines[i].trim());
      i++;
    }
    
    if (paragraphLines.length > 0) {
      tokens.push({
        type: 'paragraph',
        content: paragraphLines.join(' ')
      });
    }
  }

  return tokens;
};

const renderCVList = (token: CVMarkdownToken, index: number): JSX.Element => {
  const items = token.items || [];
  
  if (token.ordered) {
    return (
      <ol key={index} className="list-decimal list-inside ml-4 space-y-1 text-gray-700">
        {items.map((item, itemIndex) => (
          <li key={itemIndex} className="leading-relaxed">
            {processCVInlineMarkdown(item)}
          </li>
        ))}
      </ol>
    );
  } else {
    return (
      <ul key={index} className="list-disc list-inside ml-4 space-y-1 text-gray-700">
        {items.map((item, itemIndex) => (
          <li key={itemIndex} className="leading-relaxed">
            {processCVInlineMarkdown(item)}
          </li>
        ))}
      </ul>
    );
  }
};

const renderCVParagraph = (token: CVMarkdownToken, index: number): JSX.Element => {
  return (
    <p key={index} className="text-gray-700 leading-relaxed">
      {processCVInlineMarkdown(token.content)}
    </p>
  );
};

const processCVInlineMarkdown = (text: string): (string | JSX.Element)[] => {
  if (!text) return [''];
  
  const elements: JSX.Element[] = [];
  let processedText = text;
  let elementKey = 0;

  // Only process CV-appropriate inline formatting
  
  // Process links [text](url) - useful for portfolios, certifications
  processedText = processedText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
    const placeholder = `__LINK_${elementKey}__`;
    elements.push(
      <a key={`link-${elementKey}`} href={url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
        {linkText}
      </a>
    );
    elementKey++;
    return placeholder;
  });

  // Process bold text (**text** or __text__) - for emphasis
  processedText = processedText.replace(/\*\*(.*?)\*\*/g, (match, content) => {
    const placeholder = `__BOLD_${elementKey}__`;
    elements.push(<strong key={`bold-${elementKey}`} className="font-semibold">{content}</strong>);
    elementKey++;
    return placeholder;
  });

  processedText = processedText.replace(/__(.*?)__/g, (match, content) => {
    const placeholder = `__BOLD_${elementKey}__`;
    elements.push(<strong key={`bold-${elementKey}`} className="font-semibold">{content}</strong>);
    elementKey++;
    return placeholder;
  });

  // Process italic text (*text* or _text_) - for subtle emphasis
  processedText = processedText.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, (match, content) => {
    const placeholder = `__ITALIC_${elementKey}__`;
    elements.push(<em key={`italic-${elementKey}`} className="italic">{content}</em>);
    elementKey++;
    return placeholder;
  });

  processedText = processedText.replace(/(?<!_)_([^_]+?)_(?!_)/g, (match, content) => {
    const placeholder = `__ITALIC_${elementKey}__`;
    elements.push(<em key={`italic-${elementKey}`} className="italic">{content}</em>);
    elementKey++;
    return placeholder;
  });

  // Split the text and replace placeholders with elements
  const parts = processedText.split(/(__(?:BOLD|ITALIC|LINK)_\d+__)/);
  const result: (string | JSX.Element)[] = [];

  parts.forEach((part) => {
    if (part.match(/^__(BOLD|ITALIC|LINK)_\d+__$/)) {
      const elementIndex = parseInt(part.match(/\d+/)?.[0] || '0');
      if (elements[elementIndex]) {
        result.push(elements[elementIndex]);
      }
    } else if (part) {
      result.push(part);
    }
  });

  return result.length > 0 ? result : [text];
};