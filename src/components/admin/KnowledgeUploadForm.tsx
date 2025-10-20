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
  targetType: "bs7671" | "installation" | "pricing" | "design" | "project-management" | "health-safety" | "inspection-testing" | "maintenance" | "tutor";
  isProcessing: boolean;
  onProcessingStart: () => void;
  onProcessingComplete: (stats: { 
    total: number; 
    processed: number; 
    status: string;
    jobId?: string;
    cacheId?: string;
  }) => void;
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
      let tableName = "bs7671_embeddings";
      
      if (targetType === "installation") {
        tableName = "installation_knowledge";
      } else if (targetType === "pricing") {
        tableName = "pricing_embeddings";
      } else if (targetType === "design") {
        tableName = "design_knowledge";
      } else if (targetType === "project-management") {
        tableName = "project_mgmt_knowledge";
      } else if (targetType === "health-safety") {
        tableName = "health_safety_knowledge";
      } else if (targetType === "inspection-testing") {
        tableName = "inspection_testing_knowledge";
      } else if (targetType === "maintenance") {
        tableName = "maintenance_knowledge";
      } else if (targetType === "tutor") {
        tableName = "tutor_knowledge";
      }

      const { error } = await supabase.from(tableName as any).delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
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
      // Check if this is an Excel file for pricing data
      const isExcel = selectedFile.name.toLowerCase().match(/\.(xlsx|xls)$/);
      
      if (targetType === "pricing" && isExcel) {
        // Handle Excel pricing uploads
        console.log('📊 Processing Excel pricing file:', selectedFile.name);
        
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('filename', selectedFile.name);
        
        const { data, error } = await supabase.functions.invoke('parse-supplier-pricing', {
          body: formData,
        });

        if (error) {
          console.error("Excel parsing error:", error);
          throw new Error(error.message || "Failed to parse Excel file");
        }

        if (data?.error) {
          throw new Error(data.error);
        }

        onProcessingComplete({
          total: data.products_found || 0,
          processed: data.products_found || 0,
          status: "processing",
          jobId: data.job_id,
          cacheId: data.cache_id,
        });

        toast({
          title: "Excel import started",
          description: `Processing ${data.products_found} products from ${data.supplier}. Embeddings generating...`,
        });

        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      // Handle PDF and text-based uploads
      const isPdf = selectedFile.type === 'application/pdf';
      
      if (isPdf && targetType === "inspection-testing") {
        // Handle PDF for inspection-testing
        console.log('📄 Processing PDF for inspection-testing:', selectedFile.name);
        
        const reader = new FileReader();
        const fileData = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(selectedFile);
        });

        const { data, error } = await supabase.functions.invoke('parse-inspection-testing-pdf', {
          body: { fileData },
        });

        if (error) {
          console.error("PDF parsing error:", error);
          throw new Error(error.message || "Failed to parse PDF file");
        }

        if (data?.error) {
          throw new Error(data.error);
        }

        onProcessingComplete({
          total: data.total || 0,
          processed: data.processed || 0,
          status: "completed",
        });

        toast({
          title: "PDF processing complete",
          description: `Successfully processed ${data.processed} chunks from PDF.`,
        });

        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      // Handle text-based uploads (existing logic)
      const fileContent = await selectedFile.text();
      
      // Determine which edge function to call based on targetType
      let edgeFunctionName = "parse-bs7671";
      
      if (targetType === "installation") {
        const filename = selectedFile.name.toLowerCase();
        if (filename.includes("table")) {
          edgeFunctionName = "parse-bs7671-tables";
        } else if (filename.includes("calc") || filename.includes("sizing") || filename.includes("calculation")) {
          edgeFunctionName = "parse-calculations-basic";
        } else {
          edgeFunctionName = "parse-onsite-guide";
        }
      } else if (targetType === "design") {
        edgeFunctionName = "parse-design-guide";
      } else if (targetType === "project-management") {
        edgeFunctionName = "parse-project-management";
      } else if (targetType === "health-safety") {
        edgeFunctionName = "parse-health-safety";
      } else if (targetType === "inspection-testing") {
        edgeFunctionName = "parse-inspection-testing";
      } else if (targetType === "maintenance") {
        edgeFunctionName = "parse-maintenance-knowledge";
      } else if (targetType === "tutor") {
        edgeFunctionName = "parse-tutor-knowledge";
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
            accept={targetType === "pricing" ? ".txt,.pdf,.xlsx,.xls" : ".txt,.pdf"}
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
            "Upload UK wholesaler price lists in Excel format (.xlsx, .xls). The system will automatically detect columns for product names, SKUs, prices, and brands."}
          {targetType === "design" && 
            "Upload circuit design examples, calculation walkthroughs, wiring diagrams, schematics, and design specifications as text files."}
          {targetType === "project-management" && 
            "Upload project management guides, templates, and best practices for electrical projects."}
          {targetType === "health-safety" && 
            "Upload health & safety regulations, risk assessments, and safety procedures."}
          {targetType === "inspection-testing" && 
            "Upload inspection procedures, testing guides, and EICR documentation."}
          {targetType === "maintenance" && 
            "Upload maintenance procedures, inspection guides, fault diagnosis steps, and servicing instructions as text files. The system will chunk and embed content for fast retrieval."}
          {targetType === "tutor" && 
            "Upload course materials, exam prep guides, worked examples, theory explanations, and training resources as text files. Content will be embedded for semantic search."}
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
