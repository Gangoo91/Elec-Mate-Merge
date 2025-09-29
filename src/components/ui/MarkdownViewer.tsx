import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Info, FileText } from 'lucide-react';

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ 
  content, 
  className = "" 
}) => {
  return (
    <div className={`prose prose-neutral dark:prose-invert max-w-none text-left ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Custom heading styling with electrical theme
          h1: ({ children }) => (
            <Card className="bg-[hsl(var(--primary-bg-muted))] border-[hsl(var(--primary-muted))]/ 20 p-6 mb-6 text-center">
              <div className="flex items-center justify-center text-xl font-bold text-[hsl(var(--primary-muted))] mb-0">
                <FileText className="h-6 w-6 mr-2" />
                {children}
              </div>
            </Card>
          ),
          h2: ({ children }) => (
            <div className="flex items-center text-xl font-bold text-[hsl(var(--primary-muted))] mb-3 text-left mt-6">
              <Info className="h-5 w-5 mr-2" />
              {children}
            </div>
          ),
          h3: ({ children }) => (
            <div className="flex items-center text-lg font-bold text-[hsl(var(--primary-muted))] mb-2 text-left mt-4">
              <CheckCircle className="h-4 w-4 mr-2" />
              {children}
            </div>
          ),
          h4: ({ children }) => (
            <div className="text-base font-bold text-[hsl(var(--primary-muted))] mb-2 text-left mt-3">
              {children}
            </div>
          ),
          h5: ({ children }) => (
            <div className="text-sm font-bold text-[hsl(var(--primary-subtle))] mb-1 text-left mt-2">
              {children}
            </div>
          ),
          h6: ({ children }) => (
            <div className="text-sm font-bold text-[hsl(var(--primary-subtle))] mb-1 text-left mt-2">
              {children}
            </div>
          ),
          
          // Custom table styling for electrical reports
          table: ({ children }) => (
            <Card className="bg-card/50 border-border/30 p-4 my-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  {children}
                </table>
              </div>
            </Card>
          ),
          thead: ({ children }) => (
            <thead>
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody>
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="border-b border-border/20">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="text-left p-2 font-semibold text-[hsl(var(--primary-muted))]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="p-2 text-[hsl(var(--text-muted))] font-normal">
              {processElectricalContent(children)}
            </td>
          ),
          
          // Custom paragraph styling with electrical processing
          p: ({ children }) => {
            const content = processElectricalContent(children);
            
            // Check for danger/warning content
            const textContent = typeof children === 'string' ? children : 
              React.Children.toArray(children).join('').toLowerCase();
            
            if (textContent.includes('danger') || textContent.includes('warning')) {
              return (
                <Card className="bg-red-500/5 border-red-500/20 p-4 my-4">
                  <div className="flex items-start gap-3 text-left">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="text-[hsl(var(--text-muted))] text-left font-normal">
                      {content}
                    </div>
                  </div>
                </Card>
              );
            }
            
            return (
              <div className="text-[hsl(var(--text-muted))] leading-relaxed text-left font-normal mb-4">
                {content}
              </div>
            );
          },
          
          // Custom list styling
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 ml-4 my-4">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 ml-4 my-4">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-[hsl(var(--text-muted))] font-normal">
              {processElectricalContent(children)}
            </li>
          ),
          
          // Custom code block styling
          pre: ({ children }) => (
            <Card className="bg-muted/30 border-border/30 p-4 my-4">
              <pre className="text-sm text-[hsl(var(--text-muted))] whitespace-pre-wrap font-mono overflow-x-auto">
                {children}
              </pre>
            </Card>
          ),
          code: ({ children, className }) => {
            // Inline code
            if (!className) {
              return (
                <code className="px-1.5 py-0.5 rounded text-sm font-mono text-[hsl(var(--text-muted))]">
                  {children}
                </code>
              );
            }
            // Block code (handled by pre)
            return <code className={className}>{children}</code>;
          },
          
          // Custom link styling
          a: ({ href, children }) => (
            <a 
              href={href} 
              className="text-primary hover:underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          
          // Custom blockquote styling
          blockquote: ({ children }) => (
            <Card className="bg-muted/20 border-l-4 border-[hsl(var(--primary-muted))] p-4 my-4">
              <div className="text-[hsl(var(--text-muted))] italic">
                {children}
              </div>
            </Card>
          ),
          
          // Custom strong/em styling
          strong: ({ children }) => (
            <strong className="font-semibold text-[hsl(var(--primary-muted))]">
              {processElectricalContent(children)}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-[hsl(var(--text-muted))]">
              {children}
            </em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

// Helper function to process electrical-specific content
const processElectricalContent = (children: React.ReactNode): React.ReactNode => {
  if (typeof children === 'string') {
    return processTextForElectricalElements(children);
  }
  
  if (Array.isArray(children)) {
    return children.map((child, index) => 
      typeof child === 'string' 
        ? processTextForElectricalElements(child)
        : child
    );
  }
  
  return children;
};

// Process text for electrical-specific elements like badges and measurements
const processTextForElectricalElements = (text: string): React.ReactNode => {
  let key = 0;
  const elements: React.ReactNode[] = [];
  let remainingText = text;
  
  // Process BS 7671 compliance badges
  remainingText = remainingText.replace(/(\[BS 7671[^\]]*\])/g, (match) => {
    const placeholder = `__BS_BADGE_${key++}__`;
    elements.push(
      <Badge key={placeholder} variant="outline" className="bg-[hsl(var(--primary-bg-muted))] text-[hsl(var(--primary-muted))] border-[hsl(var(--primary-muted))]/30 mx-1">
        {match}
      </Badge>
    );
    return placeholder;
  });
  
  // Process result badges (PASS/FAIL/SATISFACTORY/UNSATISFACTORY)
  remainingText = remainingText.replace(/\b(PASS|SATISFACTORY)\b/g, (match) => {
    const placeholder = `__SUCCESS_${key++}__`;
    elements.push(
      <Badge key={placeholder} className="bg-green-500/10 text-green-600 border-green-500/20 mx-1">
        {match}
      </Badge>
    );
    return placeholder;
  });
  
  remainingText = remainingText.replace(/\b(FAIL|UNSATISFACTORY|DANGER)\b/g, (match) => {
    const placeholder = `__ERROR_${key++}__`;
    elements.push(
      <Badge key={placeholder} className="bg-red-500/10 text-red-600 border-red-500/20 mx-1">
        {match}
      </Badge>
    );
    return placeholder;
  });
  
  // Process code classifications (C1, C2, C3, FI)
  remainingText = remainingText.replace(/\b(C1|C2|C3|FI)\b/g, (match) => {
    const placeholder = `__CODE_${key++}__`;
    const colorClasses = {
      'C1': 'bg-red-500/10 text-red-600 border-red-500/20',
      'C2': 'bg-orange-500/10 text-orange-600 border-orange-500/20',
      'C3': 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
      'FI': 'bg-blue-500/10 text-blue-600 border-blue-500/20'
    };
    elements.push(
      <Badge key={placeholder} className={`${colorClasses[match]} mx-1`}>
        {match}
      </Badge>
    );
    return placeholder;
  });
  
  // Process measurements and values
  remainingText = remainingText.replace(/(\d+\.?\d*)\s*(Ω|V|A|kW|Hz|mm²?|m)\b/g, (match, value, unit) => {
    const placeholder = `__MEASUREMENT_${key++}__`;
    elements.push(
      <span key={placeholder} className="font-mono font-semibold text-[hsl(var(--primary-muted))]">
        {value}{unit}
      </span>
    );
    return placeholder;
  });
  
  // If no special elements were found, return the original text
  if (elements.length === 0) {
    return text;
  }
  
  // Split text by placeholders and recombine with elements
  const parts = remainingText.split(/(__\w+_\d+__)/);
  const elementMap = new Map<string, React.ReactNode>();
  
  // Create a map of placeholders to elements
  let elementIndex = 0;
  remainingText.replace(/(__\w+_\d+__)/g, (match) => {
    if (elementIndex < elements.length) {
      elementMap.set(match, elements[elementIndex]);
      elementIndex++;
    }
    return match;
  });
  
  return (
    <span>
      {parts.map((part, index) => {
        if (part.match(/^__\w+_\d+__$/)) {
          return elementMap.get(part) || part;
        }
        return part || null;
      })}
    </span>
  );
};

export default MarkdownViewer;