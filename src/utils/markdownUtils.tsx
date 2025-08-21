import React from 'react';

interface MarkdownToken {
  type: 'heading' | 'paragraph' | 'list' | 'blockquote' | 'code' | 'hr' | 'link' | 'text';
  content: string;
  level?: number;
  items?: string[];
  ordered?: boolean;
  url?: string;
  title?: string;
}

export const processMarkdown = (text: string): JSX.Element => {
  if (!text) return <span></span>;

  const tokens = tokenizeMarkdown(text);
  const elements: JSX.Element[] = [];

  tokens.forEach((token, index) => {
    switch (token.type) {
      case 'heading':
        elements.push(renderHeading(token, index));
        break;
      case 'blockquote':
        elements.push(renderBlockquote(token, index));
        break;
      case 'list':
        elements.push(renderList(token, index));
        break;
      case 'code':
        elements.push(renderCodeBlock(token, index));
        break;
      case 'hr':
        elements.push(renderHorizontalRule(index));
        break;
      case 'paragraph':
      default:
        elements.push(renderParagraph(token, index));
        break;
    }
  });

  return <div className="space-y-3">{elements}</div>;
};

const tokenizeMarkdown = (text: string): MarkdownToken[] => {
  const lines = text.split('\n');
  const tokens: MarkdownToken[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Headers
    const headerMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headerMatch) {
      tokens.push({
        type: 'heading',
        level: headerMatch[1].length,
        content: headerMatch[2]
      });
      i++;
      continue;
    }

    // Blockquotes
    if (trimmed.startsWith('> ')) {
      const blockquoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        blockquoteLines.push(lines[i].trim().substring(2));
        i++;
      }
      tokens.push({
        type: 'blockquote',
        content: blockquoteLines.join('\n')
      });
      continue;
    }

    // Code blocks
    if (trimmed.startsWith('```')) {
      const codeLines = [];
      i++; // Skip opening ```
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // Skip closing ```
      tokens.push({
        type: 'code',
        content: codeLines.join('\n')
      });
      continue;
    }

    // Horizontal rule
    if (trimmed.match(/^(-{3,}|\*{3,}|_{3,})$/)) {
      tokens.push({ type: 'hr', content: '' });
      i++;
      continue;
    }

    // Lists
    const unorderedMatch = trimmed.match(/^[-*+]\s+(.+)$/);
    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    
    if (unorderedMatch || orderedMatch) {
      const listItems = [];
      const isOrdered = !!orderedMatch;
      
      while (i < lines.length) {
        const currentLine = lines[i].trim();
        const unorderedItemMatch = currentLine.match(/^[-*+]\s+(.+)$/);
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
          const nextUnorderedMatch = nextLine.match(/^[-*+]\s+(.+)$/);
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

    // Regular paragraph
    const paragraphLines = [];
    while (i < lines.length && 
           lines[i].trim() !== '' && 
           !lines[i].trim().startsWith('#') &&
           !lines[i].trim().startsWith('> ') &&
           !lines[i].trim().startsWith('```') &&
           !lines[i].trim().match(/^[-*+]\s/) &&
           !lines[i].trim().match(/^\d+\.\s/) &&
           !lines[i].trim().match(/^(-{3,}|\*{3,}|_{3,})$/)) {
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

const renderHeading = (token: MarkdownToken, index: number): JSX.Element => {
  const level = token.level || 1;
  const content = processInlineMarkdown(token.content);
  
  const headingClasses = {
    1: "text-xl font-bold text-foreground mb-4 mt-6 first:mt-0",
    2: "text-lg font-semibold text-foreground mb-3 mt-5 first:mt-0",
    3: "text-base font-semibold text-foreground mb-2 mt-4 first:mt-0",
    4: "text-sm font-semibold text-foreground mb-2 mt-3 first:mt-0",
    5: "text-sm font-medium text-foreground mb-1 mt-2 first:mt-0",
    6: "text-xs font-medium text-foreground mb-1 mt-2 first:mt-0"
  };

  const className = headingClasses[level as keyof typeof headingClasses] || headingClasses[1];

  switch (level) {
    case 1: return <h1 key={index} className={className}>{content}</h1>;
    case 2: return <h2 key={index} className={className}>{content}</h2>;
    case 3: return <h3 key={index} className={className}>{content}</h3>;
    case 4: return <h4 key={index} className={className}>{content}</h4>;
    case 5: return <h5 key={index} className={className}>{content}</h5>;
    case 6: return <h6 key={index} className={className}>{content}</h6>;
    default: return <h1 key={index} className={className}>{content}</h1>;
  }
};

const renderBlockquote = (token: MarkdownToken, index: number): JSX.Element => {
  return (
    <blockquote key={index} className="border-l-4 border-muted-foreground/30 pl-4 italic text-muted-foreground my-4">
      {processInlineMarkdown(token.content)}
    </blockquote>
  );
};

const renderList = (token: MarkdownToken, index: number): JSX.Element => {
  const items = token.items || [];
  
  if (token.ordered) {
    return (
      <ol key={index} className="list-decimal list-inside ml-4 space-y-1 text-foreground/90">
        {items.map((item, itemIndex) => (
          <li key={itemIndex} className="leading-relaxed">
            {processInlineMarkdown(item)}
          </li>
        ))}
      </ol>
    );
  } else {
    return (
      <ul key={index} className="list-disc list-inside ml-4 space-y-1 text-foreground/90">
        {items.map((item, itemIndex) => (
          <li key={itemIndex} className="leading-relaxed">
            {processInlineMarkdown(item)}
          </li>
        ))}
      </ul>
    );
  }
};

const renderCodeBlock = (token: MarkdownToken, index: number): JSX.Element => {
  return (
    <pre key={index} className="bg-muted p-3 rounded-md overflow-x-auto text-sm font-mono my-4">
      <code className="text-foreground">{token.content}</code>
    </pre>
  );
};

const renderHorizontalRule = (index: number): JSX.Element => {
  return <hr key={index} className="border-muted-foreground/30 my-6" />;
};

const renderParagraph = (token: MarkdownToken, index: number): JSX.Element => {
  return (
    <p key={index} className="text-foreground/90 leading-relaxed mb-2">
      {processInlineMarkdown(token.content)}
    </p>
  );
};

const processInlineMarkdown = (text: string): (string | JSX.Element)[] => {
  if (!text) return [''];
  
  const elements: JSX.Element[] = [];
  let processedText = text;
  let elementKey = 0;

  // Process strikethrough (~~text~~)
  processedText = processedText.replace(/~~(.*?)~~/g, (match, content) => {
    const placeholder = `__STRIKE_${elementKey}__`;
    elements.push(
      <span key={`strike-${elementKey}`} className="line-through text-muted-foreground">
        {content}
      </span>
    );
    elementKey++;
    return placeholder;
  });

  // Process code spans (`code`)
  processedText = processedText.replace(/`([^`]+)`/g, (match, content) => {
    const placeholder = `__CODE_${elementKey}__`;
    elements.push(
      <code key={`code-${elementKey}`} className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
        {content}
      </code>
    );
    elementKey++;
    return placeholder;
  });

  // Process links [text](url)
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

  // Process bold text (**text** or __text__)
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

  // Process italic text (*text* or _text_) - avoid conflicts with bold
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
  const parts = processedText.split(/(__(?:BOLD|ITALIC|CODE|LINK|STRIKE)_\d+__)/);
  const result: (string | JSX.Element)[] = [];

  parts.forEach((part) => {
    if (part.match(/^__(BOLD|ITALIC|CODE|LINK|STRIKE)_\d+__$/)) {
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