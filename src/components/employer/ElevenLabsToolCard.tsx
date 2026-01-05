import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check, CheckCircle2, Circle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from 'sonner';

interface ToolParameter {
  name: string;
  type: string;
  description: string;
  required: boolean;
  enum?: string[];
}

interface Tool {
  name: string;
  description: string;
  parameters?: ToolParameter[];
  category?: string;
  waitForResponse?: boolean;
  disableInterruptions?: boolean;
  executionMode?: 'immediate' | 'deferred';
}

interface ElevenLabsToolCardProps {
  tool: Tool;
  index: number;
  totalTools?: number;
  isConfigured: boolean;
  onToggleConfigured: (toolName: string) => void;
  defaultExpanded?: boolean;
}

export function ElevenLabsToolCard({ 
  tool, 
  index, 
  totalTools = 307,
  isConfigured, 
  onToggleConfigured,
  defaultExpanded = false 
}: ElevenLabsToolCardProps) {
  const [isOpen, setIsOpen] = useState(defaultExpanded);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      toast.success(`Copied ${fieldName}`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (e) {
      toast.error('Failed to copy');
    }
  };

  const CopyButton = ({ text, fieldName, size = 'sm' }: { text: string; fieldName: string; size?: 'sm' | 'xs' }) => (
    <Button
      variant="ghost"
      size="icon"
      className={size === 'xs' ? 'h-6 w-6' : 'h-8 w-8'}
      onClick={(e) => {
        e.stopPropagation();
        copyToClipboard(text, fieldName);
      }}
    >
      {copiedField === fieldName ? (
        <Check className={size === 'xs' ? 'h-3 w-3 text-green-500' : 'h-4 w-4 text-green-500'} />
      ) : (
        <Copy className={size === 'xs' ? 'h-3 w-3' : 'h-4 w-4'} />
      )}
    </Button>
  );

  const getDataType = (type: string) => {
    switch (type) {
      case 'string': return 'String';
      case 'number': return 'Number';
      case 'boolean': return 'Boolean';
      case 'array': return 'Array';
      case 'object': return 'Object';
      default: return 'String';
    }
  };

  return (
    <Card className={`border-2 ${isConfigured ? 'border-green-500/50 bg-green-500/5' : 'border-border'} ${index % 2 === 0 ? 'bg-elec-gray' : 'bg-muted/20'}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between p-3 sm:p-4 cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2 sm:gap-3">
              <Checkbox
                checked={isConfigured}
                onCheckedChange={() => onToggleConfigured(tool.name)}
                onClick={(e) => e.stopPropagation()}
                className="h-5 w-5 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
              />
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-xs px-2 py-0.5">
                  {index + 1}/{totalTools}
                </Badge>
                <code className="text-sm font-semibold text-elec-yellow">{tool.name}</code>
              </div>
              {tool.parameters && tool.parameters.length > 0 && (
                <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
                  {tool.parameters.length} param{tool.parameters.length > 1 ? 's' : ''}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {isConfigured && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 hidden sm:inline-flex">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Done
                </Badge>
              )}
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4 border-t border-border">
            {/* Tool Name */}
            <div className="space-y-2 pt-4">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Name (copy to ElevenLabs)
              </label>
              <div className="flex items-center gap-2 bg-muted/50 rounded-md p-2">
                <code className="flex-1 text-sm font-mono">{tool.name}</code>
                <CopyButton text={tool.name} fieldName="name" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Description (copy to ElevenLabs)
              </label>
              <div className="flex items-start gap-2 bg-muted/50 rounded-md p-2">
                <p className="flex-1 text-sm text-foreground/80">{tool.description}</p>
                <CopyButton text={tool.description} fieldName="description" />
              </div>
            </div>

            {/* Parameters */}
            {tool.parameters && tool.parameters.length > 0 && (
              <div className="space-y-3">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Parameters ({tool.parameters.length})
                </label>
                
                {tool.parameters.map((param, paramIndex) => (
                  <div key={param.name} className="bg-muted/30 rounded-lg p-3 space-y-2 border border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-elec-yellow">Parameter #{paramIndex + 1}</span>
                      {param.required && (
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      )}
                    </div>

                    <div className="grid gap-2 text-sm">
                      {/* Data Type */}
                      <div className="flex items-center justify-between py-1 border-b border-border/30">
                        <span className="text-muted-foreground">Data type:</span>
                        <span className="font-medium">{getDataType(param.type)}</span>
                      </div>

                      {/* Identifier */}
                      <div className="flex items-center justify-between py-1 border-b border-border/30">
                        <span className="text-muted-foreground">Identifier:</span>
                        <div className="flex items-center gap-1">
                          <code className="text-elec-yellow font-mono">{param.name}</code>
                          <CopyButton text={param.name} fieldName={`param-${param.name}`} size="xs" />
                        </div>
                      </div>

                      {/* Required */}
                      <div className="flex items-center justify-between py-1 border-b border-border/30">
                        <span className="text-muted-foreground">Required:</span>
                        <span className={param.required ? 'text-red-400' : 'text-muted-foreground'}>
                          {param.required ? 'Yes ✓' : 'No'}
                        </span>
                      </div>

                      {/* Value Type */}
                      <div className="flex items-center justify-between py-1 border-b border-border/30">
                        <span className="text-muted-foreground">Value Type:</span>
                        <span className="font-medium">LLM Prompt</span>
                      </div>

                      {/* Description */}
                      <div className="py-1 border-b border-border/30">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Description:</span>
                          <CopyButton text={param.description} fieldName={`param-desc-${param.name}`} size="xs" />
                        </div>
                        <p className="text-foreground/80 mt-1">{param.description}</p>
                      </div>

                      {/* Enum Values */}
                      {param.enum && param.enum.length > 0 && (
                        <div className="py-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-muted-foreground">Enum Values ({param.enum.length}):</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 text-xs"
                              onClick={() => copyToClipboard(param.enum!.join('\n'), `enums-${param.name}`)}
                            >
                              {copiedField === `enums-${param.name}` ? (
                                <><Check className="h-3 w-3 mr-1" /> Copied</>
                              ) : (
                                <><Copy className="h-3 w-3 mr-1" /> Copy All</>
                              )}
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
                            {param.enum.map((value) => (
                              <Badge
                                key={value}
                                variant="outline"
                                className="text-xs cursor-pointer hover:bg-elec-yellow/20"
                                onClick={() => copyToClipboard(value, `enum-${value}`)}
                              >
                                {value}
                                {copiedField === `enum-${value}` && <Check className="h-2 w-2 ml-1" />}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ElevenLabs Settings */}
            <div className="space-y-2 pt-2 border-t border-border">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                ElevenLabs Settings
              </label>
              <div className="grid gap-2 text-sm bg-muted/30 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Wait for response:</span>
                  <span>{tool.waitForResponse ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Disable interruptions:</span>
                  <span>{tool.disableInterruptions ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Execution mode:</span>
                  <span>{tool.executionMode || 'Immediate'}</span>
                </div>
              </div>
            </div>

            {/* Mark as Configured Button */}
            <div className="pt-2">
              <Button
                variant={isConfigured ? 'outline' : 'default'}
                className="w-full"
                onClick={() => onToggleConfigured(tool.name)}
              >
                {isConfigured ? (
                  <><CheckCircle2 className="h-4 w-4 mr-2" /> Marked as Configured</>
                ) : (
                  <><Circle className="h-4 w-4 mr-2" /> Mark as Configured</>
                )}
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
