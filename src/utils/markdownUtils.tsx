import React from 'react';

export const processMarkdown = (text: string): JSX.Element => {
  if (!text) return <span></span>;

  // Split text into lines for processing
  const lines = text.split('\n').filter(line => line.trim() !== '');
  const elements: JSX.Element[] = [];

  let listItems: string[] = [];
  let inList = false;

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    // Check if this is a list item
    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      const listItem = trimmedLine.substring(2).trim();
      listItems.push(listItem);
      inList = true;
    } else {
      // If we were in a list and this line is not a list item, close the list
      if (inList && listItems.length > 0) {
        elements.push(
          <ul key={`list-${index}`} className="list-disc list-inside ml-4 space-y-1 text-gray-700">
            {listItems.map((item, listIndex) => (
              <li key={listIndex}>{processInlineMarkdown(item)}</li>
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
      
      // Process regular paragraph
      if (trimmedLine) {
        elements.push(
          <p key={`para-${index}`} className="text-gray-700 leading-relaxed mb-2">
            {processInlineMarkdown(trimmedLine)}
          </p>
        );
      }
    }
  });

  // Handle any remaining list items
  if (inList && listItems.length > 0) {
    elements.push(
      <ul key="list-final" className="list-disc list-inside ml-4 space-y-1 text-gray-700">
        {listItems.map((item, listIndex) => (
          <li key={listIndex}>{processInlineMarkdown(item)}</li>
        ))}
      </ul>
    );
  }

  return <div className="space-y-2">{elements}</div>;
};

const processInlineMarkdown = (text: string): (string | JSX.Element)[] => {
  const elements: (string | JSX.Element)[] = [];
  let currentText = text;
  let elementKey = 0;

  // Process bold text (**text** or __text__)
  currentText = currentText.replace(/\*\*(.*?)\*\*/g, (match, content) => {
    const placeholder = `__BOLD_${elementKey}__`;
    elements.push(<strong key={`bold-${elementKey}`} className="font-semibold">{content}</strong>);
    elementKey++;
    return placeholder;
  });

  currentText = currentText.replace(/__(.*?)__/g, (match, content) => {
    const placeholder = `__BOLD_${elementKey}__`;
    elements.push(<strong key={`bold-${elementKey}`} className="font-semibold">{content}</strong>);
    elementKey++;
    return placeholder;
  });

  // Process italic text (*text* or _text_)
  currentText = currentText.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, (match, content) => {
    const placeholder = `__ITALIC_${elementKey}__`;
    elements.push(<em key={`italic-${elementKey}`} className="italic">{content}</em>);
    elementKey++;
    return placeholder;
  });

  currentText = currentText.replace(/(?<!_)_([^_]+?)_(?!_)/g, (match, content) => {
    const placeholder = `__ITALIC_${elementKey}__`;
    elements.push(<em key={`italic-${elementKey}`} className="italic">{content}</em>);
    elementKey++;
    return placeholder;
  });

  // Split the text and replace placeholders with elements
  const parts = currentText.split(/(__(?:BOLD|ITALIC)_\d+__)/);
  const result: (string | JSX.Element)[] = [];

  parts.forEach((part, index) => {
    if (part.startsWith('__BOLD_') || part.startsWith('__ITALIC_')) {
      const elementIndex = parseInt(part.match(/\d+/)?.[0] || '0');
      result.push(elements[elementIndex]);
    } else if (part) {
      result.push(part);
    }
  });

  return result.length > 0 ? result : [text];
};