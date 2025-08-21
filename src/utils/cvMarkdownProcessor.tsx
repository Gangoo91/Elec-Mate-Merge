import React from 'react';

// Simple CV-appropriate markdown processor
export const processCVMarkdown = (text: string): React.ReactNode => {
  if (!text) return null;

  // Split text into lines for processing
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let key = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${key++}`} className="list-disc list-inside space-y-1 ml-2">
          {currentList.map((item, idx) => (
            <li key={idx} className="text-sm">
              {processInlineMarkdown(item)}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const processInlineMarkdown = (text: string): React.ReactNode => {
    // Process bold text **text**
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Process italic text *text*
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Process links [text](url)
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>');

    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  lines.forEach((line, index) => {
    line = line.trim();
    
    if (!line) {
      flushList();
      if (elements.length > 0) {
        elements.push(<br key={`br-${key++}`} />);
      }
      return;
    }

    // Handle bullet points (- or * at start)
    if (line.match(/^[-*]\s+/)) {
      const listItem = line.replace(/^[-*]\s+/, '');
      currentList.push(listItem);
      return;
    }

    // If we have accumulated list items, flush them
    flushList();

    // Regular paragraph
    elements.push(
      <span key={`p-${key++}`}>
        {processInlineMarkdown(line)}
        {index < lines.length - 1 && <br />}
      </span>
    );
  });

  // Flush any remaining list items
  flushList();

  return <div className="space-y-2">{elements}</div>;
};