import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Trash2, Loader2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface KnowledgeUploadFormProps {
  targetType: "bs7671" | "installation" | "pricing";
  isProcessing: boolean;
  onProcessingStart: () => void;
  onProcessingComplete: (stats: { total: number; processed: number; status: string }) => void;
}

export default function KnowledgeUploadForm({
  targetType,
  isProcessing,
  onProcessingStart,
  onProcessingComplete,
}: KnowledgeUploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isClearing, setIsClearing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleClearDatabase = async () => {
    setIsClearing(true);
    try {
      const tableName = targetType === "bs7671" 
        ? "bs7671_embeddings" 
        : targetType === "installation"
        ? "installation_knowledge"
        : "pricing_embeddings";

      const { error } = await supabase.from(tableName).delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      if (error) throw error;

      toast({
        title: "Database cleared",
        description: `All ${targetType} entries have been removed.`,
      });
    } catch (error) {
      console.error("Error clearing database:", error);
      toast({
        title: "Error",
        description: "Failed to clear database. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsClearing(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    onProcessingStart();

    try {
      const fileContent = await selectedFile.text();
      
      // Determine which edge function to call based on targetType
      let edgeFunctionName = "parse-bs7671";
      
      if (targetType === "installation") {
        // Route installation knowledge to the appropriate parser
        const filename = selectedFile.name.toLowerCase();
        if (filename.includes("calc") || filename.includes("sizing") || filename.includes("calculation")) {
          edgeFunctionName = "parse-calculations-basic";
        } else {
          edgeFunctionName = "parse-onsite-guide";
        }
      }
      
      console.log(`Routing to edge function: ${edgeFunctionName}`);
      
      const { data, error } = await supabase.functions.invoke(edgeFunctionName, {
        body: { fileContent },
      });

      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message || "Edge function returned an error");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      // Normalize response data from different edge functions
      const chunksProcessed = data.chunksProcessed || data.chunks_processed || data.processed || 0;
      const chunksCreated = data.chunksCreated || data.chunks_created || chunksProcessed;

      onProcessingComplete({
        total: chunksCreated,
        processed: chunksProcessed,
        status: "completed",
      });

      toast({
        title: "Processing complete",
        description: `Successfully processed ${chunksProcessed} chunks.`,
      });

      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Processing failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
      onProcessingComplete({
        total: 0,
        processed: 0,
        status: "failed",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="file-upload">Select File</Label>
        <div className="flex gap-2">
          <Input
            id="file-upload"
            ref={fileInputRef}
            type="file"
            accept=".txt,.pdf"
            onChange={handleFileSelect}
            disabled={isProcessing}
          />
        </div>
        {selectedFile && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>{selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)</span>
          </div>
        )}
      </div>

      <Alert>
        <AlertDescription>
          {targetType === "bs7671" && 
            "Upload the full BS 7671:2018+A3:2024 text file. The parser will extract individual regulations and generate embeddings."}
          {targetType === "installation" && 
            "Upload installation guides, On-Site Guide content, or technical documentation."}
          {targetType === "pricing" && 
            "Upload pricing data in text format with item names, categories, and costs."}
        </AlertDescription>
      </Alert>

      <div className="flex gap-2">
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || isProcessing}
          className="flex-1"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload & Process
            </>
          )}
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={isProcessing || isClearing}>
              {isClearing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear Database?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all {targetType} entries from the database.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearDatabase}>
                Clear Database
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
