import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import KnowledgeUploadForm from "@/components/admin/KnowledgeUploadForm";
import ProcessingProgress from "@/components/admin/ProcessingProgress";

export default function KnowledgeUploader() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStats, setProcessingStats] = useState<{
    total: number;
    processed: number;
    status: string;
  } | null>(null);

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Knowledge Base Uploader</h1>
        <p className="text-muted-foreground">
          Upload and process technical documents to populate the AI knowledge base
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Admin Only</AlertTitle>
        <AlertDescription>
          This page is for uploading BS 7671 regulations, installation knowledge, and pricing data.
          Processing large files may take several minutes.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="bs7671" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bs7671">BS 7671 Regulations</TabsTrigger>
          <TabsTrigger value="installation">Installation Knowledge</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Data</TabsTrigger>
        </TabsList>

        <TabsContent value="bs7671" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>BS 7671:2018+A3:2024 Regulations</CardTitle>
              <CardDescription>
                Upload the full BS 7671 text file. This will extract individual regulations
                (e.g., 411.3.2, 522.6.6) and generate embeddings for AI-powered lookups.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <KnowledgeUploadForm
                targetType="bs7671"
                isProcessing={isProcessing}
                onProcessingStart={() => setIsProcessing(true)}
                onProcessingComplete={(stats) => {
                  setIsProcessing(false);
                  setProcessingStats(stats);
                }}
              />
            </CardContent>
          </Card>

          {processingStats && (
            <ProcessingProgress
              total={processingStats.total}
              processed={processingStats.processed}
              status={processingStats.status}
            />
          )}
        </TabsContent>

        <TabsContent value="installation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Installation Knowledge</CardTitle>
              <CardDescription>
                Upload On-Site Guide, City & Guilds content, or other technical documentation
                for installation guidance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <KnowledgeUploadForm
                targetType="installation"
                isProcessing={isProcessing}
                onProcessingStart={() => setIsProcessing(true)}
                onProcessingComplete={(stats) => {
                  setIsProcessing(false);
                  setProcessingStats(stats);
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Data</CardTitle>
              <CardDescription>
                Upload pricing information for materials, labour rates, and product catalogues.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <KnowledgeUploadForm
                targetType="pricing"
                isProcessing={isProcessing}
                onProcessingStart={() => setIsProcessing(true)}
                onProcessingComplete={(stats) => {
                  setIsProcessing(false);
                  setProcessingStats(stats);
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
