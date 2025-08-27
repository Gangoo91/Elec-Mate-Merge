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
  let currentFieldGroup: { key: string; value: string }[] = [];
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
                      <td key={cellIdx} className="p-2 text-foreground font-normal">
                        {processInlineMarkdown(cell.trim(), 'paragraph')}
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
            <li key={idx} className="text-foreground font-normal">
              {processInlineMarkdown(item, 'paragraph')}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const flushFieldGroup = () => {
    if (currentFieldGroup.length > 0) {
      // Group fields by category for better organization
      const sections = {
        'Client Details': [] as { key: string; value: string }[],
        'Installation Details': [] as { key: string; value: string }[],
        'Work Details': [] as { key: string; value: string }[],
        'Testing Results': [] as { key: string; value: string }[],
        'Inspector Details': [] as { key: string; value: string }[],
        'Other': [] as { key: string; value: string }[]
      };

      // Categorize fields based on their keys
      currentFieldGroup.forEach(field => {
        const keyLower = field.key.toLowerCase();
        
        if (keyLower.includes('client') || keyLower.includes('name') || keyLower.includes('address') || keyLower.includes('phone')) {
          sections['Client Details'].push(field);
        } else if (keyLower.includes('installation') || keyLower.includes('supply') || keyLower.includes('earthing') || keyLower.includes('main switch')) {
          sections['Installation Details'].push(field);
        } else if (keyLower.includes('work') || keyLower.includes('circuit') || keyLower.includes('description') || keyLower.includes('extent')) {
          sections['Work Details'].push(field);
        } else if (keyLower.includes('test') || keyLower.includes('fault') || keyLower.includes('c1') || keyLower.includes('c2') || keyLower.includes('c3') || keyLower.includes('assessment') || keyLower.includes('result')) {
          sections['Testing Results'].push(field);
        } else if (keyLower.includes('inspector') || keyLower.includes('tester') || keyLower.includes('installer') || keyLower.includes('qualification') || keyLower.includes('date')) {
          sections['Inspector Details'].push(field);
        } else {
          sections['Other'].push(field);
        }
      });

      elements.push(
        <Card key={`fields-${key++}`} className="bg-card/30 border-border/30 overflow-hidden">
          <div className="bg-primary/5 border-b border-border/20 px-6 py-4">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Report Information
            </h3>
          </div>
          
          <div className="p-6">
            <div className="grid gap-6">
              {Object.entries(sections).map(([sectionTitle, fields]) => {
                if (fields.length === 0) return null;
                
                return (
                  <div key={sectionTitle} className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-border/10">
                      <h4 className="text-sm font-semibold text-primary/80 uppercase tracking-wide">
                        {sectionTitle}
                      </h4>
                    </div>
                    
                    <div className="grid gap-3 sm:grid-cols-2">
                      {fields.map((field, idx) => (
                        <div key={idx} className="group hover:bg-muted/20 rounded-lg p-3 transition-colors">
                          <div className="space-y-1">
                            <dt className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                              {field.key}
                            </dt>
                            <dd className="text-base font-semibold text-foreground">
                              {field.value}
                            </dd>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      );
      currentFieldGroup = [];
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

  const processInlineMarkdown = (text: string, context: 'heading' | 'paragraph' = 'paragraph'): React.ReactNode => {
    // Normalize text: trim and normalize spaces
    text = text.trim().replace(/\s+/g, ' ');
    
    // Return null for empty content
    if (!text) return null;

    // Store elements with their placeholders
    const elementMap = new Map<string, React.ReactNode>();
    let currentText = text;
    let key = 0;

    // Process compliance badges - replace with React components
    currentText = currentText.replace(/\[BS 7671[^\]]*\]/g, (match) => {
      const id = `__BADGE_${key++}__`;
      elementMap.set(id, 
        <Badge key={id} variant="outline" className="bg-primary/10 text-primary border-primary/20">
          {match}
        </Badge>
      );
      return id;
    });
    
    // Process result badges (PASS/FAIL/SATISFACTORY/UNSATISFACTORY)
    currentText = currentText.replace(/\b(PASS|SATISFACTORY)\b/g, (match) => {
      const id = `__SUCCESS_${key++}__`;
      elementMap.set(id,
        <Badge key={id} className="bg-green-500/10 text-green-600 border-green-500/20">
          {match}
        </Badge>
      );
      return id;
    });
    
    currentText = currentText.replace(/\b(FAIL|UNSATISFACTORY|DANGER)\b/g, (match) => {
      const id = `__ERROR_${key++}__`;
      elementMap.set(id,
        <Badge key={id} className="bg-red-500/10 text-red-600 border-red-500/20">
          {match}
        </Badge>
      );
      return id;
    });
    
    // Process code classifications (C1, C2, C3, FI)
    currentText = currentText.replace(/\b(C1|C2|C3|FI)\b/g, (match) => {
      const id = `__CODE_${key++}__`;
      const colorClasses = {
        'C1': 'bg-red-500/10 text-red-600 border-red-500/20',
        'C2': 'bg-orange-500/10 text-orange-600 border-orange-500/20',
        'C3': 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
        'FI': 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      };
      elementMap.set(id,
        <Badge key={id} className={colorClasses[match]}>
          {match}
        </Badge>
      );
      return id;
    });
    
    // Process measurements and values
    currentText = currentText.replace(/(\d+\.?\d*)\s*(Ω|V|A|kW|Hz|mm²?|m)/g, 
      '<span className="font-mono font-semibold text-primary">$1$2</span>'
    );
    
    // Process bold text **text** - only apply bold styling in heading context
    if (context === 'heading') {
      currentText = currentText.replace(/\*\*(.*?)\*\*/g, '<strong className="font-semibold text-primary">$1</strong>');
    } else {
      // In paragraph context, remove bold markers and render as normal text
      currentText = currentText.replace(/\*\*(.*?)\*\*/g, '$1');
    }
    
    // Process italic text *text*
    currentText = currentText.replace(/\*(.*?)\*/g, '<em className="italic">$1</em>');
    
    // Process links [text](url)
    currentText = currentText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, 
      '<a href="$2" className="text-primary hover:underline font-medium">$1</a>'
    );

    // If we have elements to replace, create a compound component
    if (elementMap.size > 0) {
      const parts = currentText.split(/(__\w+_\d+__)/);
      return (
        <span>
          {parts.map((part, idx) => {
            const elementMatch = part.match(/^__(\w+)_(\d+)__$/);
            if (elementMatch && elementMap.has(part)) {
              return elementMap.get(part);
            }
            // Only render non-empty text parts
            return part.trim() ? (
              <span key={idx} dangerouslySetInnerHTML={{ __html: part }} />
            ) : null;
          })}
        </span>
      );
    }

    // For simple text without special elements, validate it's not empty
    return currentText.trim() ? (
      <span dangerouslySetInnerHTML={{ __html: currentText }} />
    ) : null;
  };

  const getHeadingComponent = (level: number, text: string) => {
    const headingClasses = {
      1: 'text-xl font-bold text-primary mb-4 text-center justify-center',
      2: 'text-xl font-bold text-primary mb-3 text-left',
      3: 'text-xl font-bold text-primary mb-2 text-left',
      4: 'text-xl font-bold text-primary mb-2 text-left',
      5: 'text-xl font-bold text-primary mb-2 text-left',
      6: 'text-xl font-bold text-primary mb-1 text-left'
    };

    const icons = {
      1: <FileText className="h-6 w-6 mr-2" />,
      2: <Info className="h-5 w-5 mr-2" />,
      3: <CheckCircle className="h-4 w-4 mr-2" />,
    };

    return (
      <div key={`heading-${key++}`} className={`flex items-center ${headingClasses[level] || headingClasses[6]}`}>
        {level <= 3 && icons[level]}
        {processInlineMarkdown(text, 'heading')}
      </div>
    );
  };

  lines.forEach((line, index) => {
    line = line.trim();
    
    // Skip horizontal rules (lines with only dashes)
    if (line.match(/^-+$/)) {
      return;
    }
    
    // Skip lines with only special characters or whitespace
    if (line.match(/^[\s\-_=*#|]+$/)) {
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
        flushFieldGroup();
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
      flushFieldGroup();
      return;
    }

    // Handle headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushTable();
      flushList();
      flushFieldGroup();
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
      flushFieldGroup();
      const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell && cell.length > 0);
      // Only add rows with meaningful content
      if (cells.length > 0 && cells.some(cell => cell.length > 0)) {
        currentTable.push(cells);
      }
      return;
    }

    // Handle bullet points
    if (line.match(/^[-*]\s+/)) {
      flushTable();
      flushFieldGroup();
      const listItem = line.replace(/^[-*]\s+/, '').trim();
      // Only add non-empty list items
      if (listItem && listItem.length > 0) {
        currentList.push(listItem);
      }
      return;
    }

    // Handle numbered lists
    if (line.match(/^\d+\.\s+/)) {
      flushTable();
      flushFieldGroup();
      const listItem = line.replace(/^\d+\.\s+/, '').trim();
      // Only add non-empty list items
      if (listItem && listItem.length > 0) {
        currentList.push(listItem);
      }
      return;
    }

    // Check for field pattern (Field Name: Value)
    const fieldMatch = line.match(/^([A-Za-z\s]+):\s*(.+)$/);
    if (fieldMatch) {
      flushTable();
      flushList();
      const [, key, value] = fieldMatch;
      currentFieldGroup.push({ key: key.trim(), value: value.trim() });
      return;
    }

    // Flush pending elements
    flushTable();
    flushList();
    flushFieldGroup();

    // Handle special alert boxes
    if (line.toLowerCase().includes('danger') || line.toLowerCase().includes('warning')) {
      elements.push(
        <Card key={`alert-${key++}`} className="bg-red-500/5 border-red-500/20 p-4">
          <div className="flex items-start gap-3 text-left">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="text-foreground text-left font-normal">
              {processInlineMarkdown(line, 'paragraph')}
            </div>
          </div>
        </Card>
      );
      return;
    }

    // Regular paragraph
    elements.push(
      <div key={`p-${key++}`} className="text-foreground leading-relaxed text-left font-normal">
        {processInlineMarkdown(line, 'paragraph')}
      </div>
    );
  });

  // Flush any remaining elements
  flushTable();
  flushList();
  flushFieldGroup();
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