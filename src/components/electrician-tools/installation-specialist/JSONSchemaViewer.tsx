import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Code, Copy, Check, ChevronDown, Database } from "lucide-react";
import { useState } from "react";
import { INSTALLATION_METHOD_FULL_SCHEMA, INSTALLATION_METHOD_SIMPLIFIED_SCHEMA } from "@/types/installation-method-schema";

interface JSONSchemaViewerProps {
  fullMethodStatement: any;
  mode?: 'full' | 'simplified';
}

export const JSONSchemaViewer = ({ fullMethodStatement, mode = 'full' }: JSONSchemaViewerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'data' | 'schema'>('data');
  
  const schema = mode === 'full' 
    ? INSTALLATION_METHOD_FULL_SCHEMA 
    : INSTALLATION_METHOD_SIMPLIFIED_SCHEMA;

  const handleCopy = async () => {
    const content = activeTab === 'schema' 
      ? JSON.stringify(schema, null, 2)
      : JSON.stringify(fullMethodStatement, null, 2);
    
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="border-border/50 bg-card">
        <CardContent className="p-4 sm:p-6">
          <CollapsibleTrigger className="w-full">
            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-3">
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 w-full sm:w-auto">
                <div className="p-2.5 rounded-lg bg-slate-500/10 border border-slate-500/20">
                  <Database className="h-5 w-5 sm:h-4 sm:w-4 text-slate-400" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-bold text-base sm:text-lg text-foreground">JSON Schema & Output Data</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    View structured output and API schema ({mode} mode)
                  </p>
                </div>
              </div>
              <ChevronDown 
                className={`h-5 w-5 text-muted-foreground transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`} 
              />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent className="pt-4">
            {/* Tab Controls */}
            <div className="flex gap-2 mb-3">
              <Button
                size="sm"
                variant={activeTab === 'data' ? 'default' : 'outline'}
                onClick={() => setActiveTab('data')}
                className="flex-1 h-9 text-xs sm:text-sm"
              >
                <Code className="h-4 w-4 mr-1.5" />
                Output Data
              </Button>
              <Button
                size="sm"
                variant={activeTab === 'schema' ? 'default' : 'outline'}
                onClick={() => setActiveTab('schema')}
                className="flex-1 h-9 text-xs sm:text-sm"
              >
                <Database className="h-4 w-4 mr-1.5" />
                Schema Definition
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="px-3 h-9"
                title={copied ? "Copied!" : "Copy to clipboard"}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* JSON Display */}
            <div className="bg-slate-950 rounded-lg p-3 sm:p-4 overflow-x-auto max-h-[400px] sm:max-h-[500px] overflow-y-auto border border-slate-800">
              <pre className="text-[10px] sm:text-xs font-mono text-slate-200 leading-relaxed">
                {activeTab === 'schema' 
                  ? JSON.stringify(schema, null, 2)
                  : JSON.stringify(fullMethodStatement, null, 2)
                }
              </pre>
            </div>

            {/* Info Footer */}
            <div className="mt-3 pt-3 border-t border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Developer Note:</strong> This schema describes the Installation Method Agent's structured output. 
                Use this for API integration, custom PDF templates, or data export workflows.
              </p>
            </div>
          </CollapsibleContent>
        </CardContent>
      </Card>
    </Collapsible>
  );
};
