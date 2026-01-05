import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Copy, Check, CheckCircle2, X, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
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
}

interface ElevenLabsSetupWizardProps {
  tools: Tool[];
  configuredTools: Set<string>;
  lastToolIndex: number;
  onMarkConfigured: (toolName: string) => void;
  onUpdateLastIndex: (index: number) => void;
  onClose: () => void;
}

export function ElevenLabsSetupWizard({
  tools,
  configuredTools,
  lastToolIndex,
  onMarkConfigured,
  onUpdateLastIndex,
  onClose
}: ElevenLabsSetupWizardProps) {
  const [currentIndex, setCurrentIndex] = useState(lastToolIndex);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const currentTool = tools[currentIndex];
  const progress = (configuredTools.size / tools.length) * 100;
  const isCurrentConfigured = configuredTools.has(currentTool?.name);

  useEffect(() => {
    onUpdateLastIndex(currentIndex);
  }, [currentIndex, onUpdateLastIndex]);

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      toast.success('Copied!');
      setTimeout(() => setCopiedField(null), 2000);
    } catch (e) {
      toast.error('Failed to copy');
    }
  };

  const CopyField = ({ label, value, fieldName, mono = false }: { label: string; value: string; fieldName: string; mono?: boolean }) => (
    <div className="space-y-1">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </label>
      <div className="flex items-start gap-2 bg-muted/50 rounded-md p-3 border border-border">
        <div className={`flex-1 text-sm ${mono ? 'font-mono' : ''}`}>{value}</div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={() => copyToClipboard(value, fieldName)}
        >
          {copiedField === fieldName ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );

  const goToNext = () => {
    if (currentIndex < tools.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const markAndNext = () => {
    if (!isCurrentConfigured) {
      onMarkConfigured(currentTool.name);
    }
    goToNext();
  };

  const skipToNextUnconfigured = () => {
    for (let i = currentIndex + 1; i < tools.length; i++) {
      if (!configuredTools.has(tools[i].name)) {
        setCurrentIndex(i);
        return;
      }
    }
    // Wrap around to beginning
    for (let i = 0; i < currentIndex; i++) {
      if (!configuredTools.has(tools[i].name)) {
        setCurrentIndex(i);
        return;
      }
    }
    toast.info('All tools are configured!');
  };

  if (!currentTool) return null;

  const getDataType = (type: string) => {
    switch (type) {
      case 'string': return 'String';
      case 'number': return 'Number';
      case 'boolean': return 'Boolean';
      case 'array': return 'Array';
      default: return 'String';
    }
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-lg font-semibold">ElevenLabs Setup Wizard</h2>
              <p className="text-sm text-muted-foreground">
                Tool {currentIndex + 1} of {tools.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-medium text-green-400">
                {configuredTools.size} configured
              </div>
              <div className="text-xs text-muted-foreground">
                {tools.length - configuredTools.size} remaining
              </div>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {Math.round(progress)}%
            </Badge>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-3">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-border p-2">
        <div className="flex items-center justify-center gap-2 max-w-4xl mx-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={skipToNextUnconfigured}
          >
            <SkipForward className="h-4 w-4 mr-1" /> Skip to Unconfigured
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNext}
            disabled={currentIndex === tools.length - 1}
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {/* Tool Header */}
          <Card className={isCurrentConfigured ? 'border-green-500/50 bg-green-500/5' : ''}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <code className="text-xl text-elec-yellow">{currentTool.name}</code>
                  {isCurrentConfigured && (
                    <Badge className="bg-green-500/20 text-green-400">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> Configured
                    </Badge>
                  )}
                </CardTitle>
                {currentTool.category && (
                  <Badge variant="secondary">{currentTool.category}</Badge>
                )}
              </div>
            </CardHeader>
          </Card>

          {/* Step 1: Name */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Badge className="bg-elec-yellow/20 text-elec-yellow">Step 1</Badge>
                Enter NAME in ElevenLabs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CopyField 
                label="Tool Name" 
                value={currentTool.name} 
                fieldName="name" 
                mono 
              />
            </CardContent>
          </Card>

          {/* Step 2: Description */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Badge className="bg-elec-yellow/20 text-elec-yellow">Step 2</Badge>
                Enter DESCRIPTION in ElevenLabs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CopyField 
                label="Tool Description" 
                value={currentTool.description} 
                fieldName="description" 
              />
            </CardContent>
          </Card>

          {/* Step 3: Parameters */}
          {currentTool.parameters && currentTool.parameters.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Badge className="bg-elec-yellow/20 text-elec-yellow">Step 3</Badge>
                  Add {currentTool.parameters.length} PARAMETER{currentTool.parameters.length > 1 ? 'S' : ''}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Click "Add param" in ElevenLabs for each parameter below:
                </p>

                {currentTool.parameters.map((param, index) => (
                  <div key={param.name} className="bg-muted/30 rounded-lg p-4 space-y-3 border border-border">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-elec-yellow">Parameter #{index + 1}</span>
                      {param.required && (
                        <Badge variant="destructive">Required</Badge>
                      )}
                    </div>

                    <div className="grid gap-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <span className="text-muted-foreground">Data type:</span>
                          <div className="font-medium">{getDataType(param.type)}</div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-muted-foreground">Required:</span>
                          <div className={param.required ? 'text-red-400 font-medium' : ''}>
                            {param.required ? 'Yes ✓ Check this' : 'No'}
                          </div>
                        </div>
                      </div>

                      <CopyField 
                        label="Identifier" 
                        value={param.name} 
                        fieldName={`param-${param.name}`} 
                        mono 
                      />

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Value Type
                        </label>
                        <div className="bg-muted/50 rounded-md p-3 border border-border text-sm">
                          Select: <strong>LLM Prompt</strong>
                        </div>
                      </div>

                      <CopyField 
                        label="Description" 
                        value={param.description} 
                        fieldName={`param-desc-${param.name}`} 
                      />

                      {param.enum && param.enum.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                              Enum Values ({param.enum.length}) - Add each one
                            </label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(param.enum!.join('\n'), `enums-${param.name}`)}
                            >
                              {copiedField === `enums-${param.name}` ? (
                                <><Check className="h-3 w-3 mr-1" /> Copied</>
                              ) : (
                                <><Copy className="h-3 w-3 mr-1" /> Copy All (one per line)</>
                              )}
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-1 bg-muted/50 rounded-md p-3 border border-border max-h-40 overflow-y-auto">
                            {param.enum.map((value) => (
                              <Badge
                                key={value}
                                variant="outline"
                                className="text-xs cursor-pointer hover:bg-elec-yellow/20 transition-colors"
                                onClick={() => copyToClipboard(value, `enum-${value}`)}
                              >
                                {value}
                                {copiedField === `enum-${value}` && <Check className="h-2 w-2 ml-1 text-green-500" />}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Step 4: Settings */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Badge className="bg-elec-yellow/20 text-elec-yellow">
                  Step {currentTool.parameters && currentTool.parameters.length > 0 ? '4' : '3'}
                </Badge>
                Configure SETTINGS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-lg p-4 space-y-2 border border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Wait for response:</span>
                  <span className="font-medium">
                    {currentTool.waitForResponse ? 'Yes ✓ Check this' : 'No (leave unchecked)'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Disable interruptions:</span>
                  <span className="font-medium">
                    {currentTool.disableInterruptions ? 'Yes ✓ Check this' : 'No (leave unchecked)'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 5: Create */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Badge className="bg-green-500/20 text-green-400">Final Step</Badge>
                Click "Create" in ElevenLabs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                size="lg"
                className="w-full"
                onClick={markAndNext}
              >
                {isCurrentConfigured ? (
                  <>Already Configured - Go to Next <ChevronRight className="h-4 w-4 ml-2" /></>
                ) : (
                  <><CheckCircle2 className="h-4 w-4 mr-2" /> Mark Complete & Go to Next Tool</>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
