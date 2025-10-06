import { KnowledgeStatusPanel } from "@/components/admin/KnowledgeStatusPanel";
import { DocumentProcessor } from "@/components/admin/DocumentProcessor";
import { BookOpen, GraduationCap, Lightbulb, FileText, Zap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdminRAGProcessor = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">RAG Database Management</h1>
          <p className="text-muted-foreground">
            Process and add electrical installation guides to the AI knowledge base
          </p>
        </div>

        <Alert>
          <AlertDescription>
            <strong>Important:</strong> Files must be uploaded to Supabase Storage bucket <code>safety-resources</code> before processing.
            Upload these files: bs7671-wiring-regs.txt, CITY-GUILDS-BOOK-1.txt, CITY-GUILDS-BOOK-2.txt, EMERGENCY-LIGHTING.txt
          </AlertDescription>
        </Alert>

        <KnowledgeStatusPanel />

        <DocumentProcessor
          title="BS 7671 Wiring Regulations (18th Edition +A2:2022)"
          description="Core legal foundation - processes into bs7671_embeddings table"
          functionName="parse-bs7671"
          estimatedTime="Processing time: 15-20 minutes"
          icon={<BookOpen className="h-6 w-6 text-amber-600" />}
        />

        <DocumentProcessor
          title="IET On-Site Guide"
          description="Practical installation companion - processes into installation_knowledge"
          functionName="parse-onsite-guide"
          estimatedTime="Processing time: 5-10 minutes"
          icon={<FileText className="h-6 w-6 text-blue-600" />}
        />

        <DocumentProcessor
          title="City & Guilds Book 1 (Level 2/3)"
          description="Foundation training materials - processes into installation_knowledge"
          functionName="parse-city-guilds-book-1"
          estimatedTime="Processing time: 3-8 minutes"
          icon={<GraduationCap className="h-6 w-6 text-green-600" />}
        />

        <DocumentProcessor
          title="City & Guilds Book 2 (Level 3)"
          description="Advanced training materials - processes into installation_knowledge"
          functionName="parse-city-guilds-book-2"
          estimatedTime="Processing time: 3-8 minutes"
          icon={<GraduationCap className="h-6 w-6 text-purple-600" />}
        />

        <DocumentProcessor
          title="Emergency Lighting Guide (BS 5266)"
          description="Emergency lighting standards - processes into installation_knowledge"
          functionName="parse-emergency-lighting"
          estimatedTime="Processing time: 30 seconds - 2 minutes"
          icon={<Lightbulb className="h-6 w-6 text-yellow-600" />}
        />
      </div>
    </div>
  );
};

export default AdminRAGProcessor;
