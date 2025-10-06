import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, FileText } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface DocumentProcessorProps {
  title: string;
  description: string;
  functionName: string;
  estimatedTime: string;
  icon?: React.ReactNode;
  requiresFileUpload?: boolean;
  statusIcon?: React.ReactNode;
  statusText?: string;
}

export const DocumentProcessor = ({ 
  title, 
  description, 
  functionName, 
  estimatedTime,
  icon,
  requiresFileUpload = false,
  statusIcon,
  statusText
}: DocumentProcessorProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleProcess = async () => {
    if (requiresFileUpload && !selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    setIsProcessing(true);
    setResult(null);
    setError(null);
    
    try {
      toast.info(`Starting ${title} processing...`, {
        description: estimatedTime
      });

      let body = {};
      if (requiresFileUpload && selectedFile) {
        const fileContent = await selectedFile.text();
        body = { fileContent };
      }
      
      const { data, error: funcError } = await supabase.functions.invoke(functionName, {
        body
      });
      
      if (funcError) {
        throw new Error(funcError.message || `Function invocation failed: ${funcError}`);
      }

      if (data?.error) {
        throw new Error(data.error);
      }
      
      setResult(data);
      toast.success(`Successfully processed ${title}!`, {
        description: `${data.chunks_processed || data.chunksProcessed || 'Multiple'} chunks added to database`
      });
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      console.error(`${title} processing error:`, err);
      setError(errorMessage);
      toast.error(`Failed to process ${title}`, {
        description: errorMessage,
        duration: 8000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {icon || <FileText className="h-6 w-6 text-primary" />}
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          {statusIcon && (
            <div className="flex items-center gap-2 text-sm">
              {statusIcon}
              <span className="text-muted-foreground">{statusText}</span>
            </div>
          )}
        </div>

        {requiresFileUpload && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Upload Document</label>
            <input
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
            {selectedFile && (
              <p className="text-xs text-muted-foreground">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <Button 
            onClick={handleProcess} 
            disabled={isProcessing || (requiresFileUpload && !selectedFile)}
            className="gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                Process Document
              </>
            )}
          </Button>
          
          {isProcessing && (
            <span className="text-sm text-muted-foreground">{estimatedTime}</span>
          )}
        </div>

        {error && (
          <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="font-semibold text-destructive mb-2">❌ Processing Failed</div>
            <div className="text-sm text-destructive/90 font-mono whitespace-pre-wrap">{error}</div>
          </div>
        )}

        {result && !error && (
          <div className="mt-4 p-4 bg-muted rounded-lg space-y-2">
            <div className="font-semibold text-green-600">✅ Processing Complete</div>
            <div className="text-sm space-y-1">
              <p>Chunks Created: <strong>{result.chunks_created || result.chunksCreated || result.chunksProcessed || 'N/A'}</strong></p>
              <p>Embeddings Processed: <strong>{result.chunks_processed || result.embeddingsProcessed || result.processed || 'N/A'}</strong></p>
              {result.message && <p className="text-muted-foreground italic">{result.message}</p>}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
