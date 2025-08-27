import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, CheckCircle, Info, FileText } from 'lucide-react';

// Enhanced markdown processor specifically for electrical reports
export const processReportMarkdown = (text: string): React.ReactNode => {
  if (!text) return null;

  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;
  let currentTable: string[][] = [];
  let currentList: string[] = [];
  let isInCodeBlock = false;
  let codeBlockContent = '';

  const flushTable = () => {
    if (currentTable.length > 0) {
      elements.push(
        <Card key={`table-${key++}`} className="bg-card/50 border-border/30 p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30">
                  {currentTable[0].map((header, idx) => (
                    <th key={idx} className="text-left p-2 font-semibold text-primary">
                      {header.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentTable.slice(1).map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-b border-border/20">
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="p-2 text-foreground">
                        {processInlineMarkdown(cell.trim())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      );
      currentTable = [];
    }
  };

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${key++}`} className="list-disc list-inside space-y-2 ml-4">
          {currentList.map((item, idx) => (
            <li key={idx} className="text-foreground">
              {processInlineMarkdown(item)}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const flushCodeBlock = () => {
    if (codeBlockContent) {
      elements.push(
        <Card key={`code-${key++}`} className="bg-muted/30 border-border/30 p-4">
          <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
            {codeBlockContent}
          </pre>
        </Card>
      );
      codeBlockContent = '';
    }
  };

  const processInlineMarkdown = (text: string): React.ReactNode => {
    // Process compliance badges
    text = text.replace(/\[BS 7671[^\]]*\]/g, (match) => 
      `<span class="inline-flex items-center px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md border border-primary/20">${match}</span>`
    );
    
    // Process result badges (PASS/FAIL/SATISFACTORY/UNSATISFACTORY)
    text = text.replace(/\b(PASS|SATISFACTORY)\b/g, 
      '<span class="inline-flex items-center px-2 py-1 text-xs font-bold bg-green-500/10 text-green-600 rounded-md border border-green-500/20">$1</span>'
    );
    text = text.replace(/\b(FAIL|UNSATISFACTORY|DANGER)\b/g, 
      '<span class="inline-flex items-center px-2 py-1 text-xs font-bold bg-red-500/10 text-red-600 rounded-md border border-red-500/20">$1</span>'
    );
    
    // Process measurements and values
    text = text.replace(/(\d+\.?\d*)\s*(Ω|V|A|kW|Hz|mm²?|m)/g, 
      '<span class="font-mono font-semibold text-primary">$1$2</span>'
    );
    
    // Process code classifications (C1, C2, C3, FI)
    text = text.replace(/\b(C1|C2|C3|FI)\b/g, (match) => {
      const colors = {
        'C1': 'bg-red-500/10 text-red-600 border-red-500/20',
        'C2': 'bg-orange-500/10 text-orange-600 border-orange-500/20',
        'C3': 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
        'FI': 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      };
      return `<span class="inline-flex items-center px-2 py-1 text-xs font-bold rounded-md border ${colors[match]}">${match}</span>`;
    });
    
    // Process bold text **text**
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-primary">$1</strong>');
    
    // Process italic text *text*
    text = text.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    
    // Process links [text](url)
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, 
      '<a href="$2" class="text-primary hover:underline font-medium">$1</a>'
    );

    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  const getHeadingComponent = (level: number, text: string) => {
    const headingClasses = {
      1: 'text-2xl font-bold text-primary mb-4 text-center justify-center',
      2: 'text-xl font-semibold text-primary mb-3 text-left',
      3: 'text-lg font-medium text-primary mb-2 text-left',
      4: 'text-base font-medium text-primary mb-2 text-left',
      5: 'text-sm font-medium text-primary mb-2 text-left',
      6: 'text-sm font-medium text-primary mb-1 text-left'
    };

    const icons = {
      1: <FileText className="h-6 w-6 mr-2" />,
      2: <Info className="h-5 w-5 mr-2" />,
      3: <CheckCircle className="h-4 w-4 mr-2" />,
    };

    return (
      <div key={`heading-${key++}`} className={`flex items-center ${headingClasses[level] || headingClasses[6]}`}>
        {level <= 3 && icons[level]}
        {processInlineMarkdown(text)}
      </div>
    );
  };

  lines.forEach((line, index) => {
    line = line.trim();
    
    // Skip horizontal rules (lines with only dashes)
    if (line.match(/^-+$/)) {
      return;
    }
    
    // Handle code blocks
    if (line.startsWith('```')) {
      if (isInCodeBlock) {
        flushCodeBlock();
        isInCodeBlock = false;
      } else {
        flushTable();
        flushList();
        isInCodeBlock = true;
      }
      return;
    }
    
    if (isInCodeBlock) {
      codeBlockContent += line + '\n';
      return;
    }
    
    if (!line) {
      flushTable();
      flushList();
      if (elements.length > 0) {
        elements.push(<div key={`spacer-${key++}`} className="h-4" />);
      }
      return;
    }

    // Handle headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushTable();
      flushList();
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      
      if (level === 1) {
        elements.push(
          <Card key={`header-card-${key++}`} className="bg-primary/5 border-primary/20 p-6 mb-6 text-center">
            {getHeadingComponent(level, text)}
          </Card>
        );
      } else {
        elements.push(getHeadingComponent(level, text));
      }
      return;
    }

    // Handle tables
    if (line.includes('|')) {
      flushList();
      const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
      if (cells.length > 0) {
        currentTable.push(cells);
      }
      return;
    }

    // Handle bullet points
    if (line.match(/^[-*]\s+/)) {
      flushTable();
      const listItem = line.replace(/^[-*]\s+/, '');
      currentList.push(listItem);
      return;
    }

    // Handle numbered lists
    if (line.match(/^\d+\.\s+/)) {
      flushTable();
      const listItem = line.replace(/^\d+\.\s+/, '');
      currentList.push(listItem);
      return;
    }

    // Flush pending elements
    flushTable();
    flushList();

    // Handle special alert boxes
    if (line.toLowerCase().includes('danger') || line.toLowerCase().includes('warning')) {
      elements.push(
        <Card key={`alert-${key++}`} className="bg-red-500/5 border-red-500/20 p-4">
          <div className="flex items-start gap-3 text-left">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="text-foreground text-left">
              {processInlineMarkdown(line)}
            </div>
          </div>
        </Card>
      );
      return;
    }

    // Regular paragraph
    elements.push(
      <div key={`p-${key++}`} className="text-foreground leading-relaxed text-left">
        {processInlineMarkdown(line)}
      </div>
    );
  });

  // Flush any remaining elements
  flushTable();
  flushList();
  flushCodeBlock();

  return (
    <div className="space-y-4 max-w-none">
      {elements}
    </div>
  );
};

// Professional report header component
export const ReportHeader = ({ 
  title, 
  subtitle, 
  reportType, 
  date 
}: { 
  title: string;
  subtitle?: string;
  reportType?: string;
  date?: string;
}) => (
  <Card className="bg-primary/5 border-primary/20 p-6 mb-6">
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary mb-1">{title}</h1>
          {subtitle && (
            <p className="text-muted-foreground text-lg">{subtitle}</p>
          )}
          {reportType && (
            <Badge variant="secondary" className="mt-2">
              {reportType}
            </Badge>
          )}
        </div>
      </div>
      {date && (
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Generated</p>
          <p className="font-medium text-foreground">{date}</p>
        </div>
      )}
    </div>
  </Card>
);