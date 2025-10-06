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
            <strong>BS 7671:</strong> Upload the text file directly below.
            <br />
            <strong>Other documents:</strong> Must be in Supabase Storage bucket <code>safety-resources</code> as: CITY-GUILDS-BOOK-1.txt, CITY-GUILDS-BOOK-2.txt, EMERGENCY-LIGHTING.txt
          </AlertDescription>
        </Alert>

        <KnowledgeStatusPanel />

        <DocumentProcessor
          title="BS 7671 Wiring Regulations (18th Edition +A2:2022)"
          description="Core legal foundation - processes into bs7671_embeddings table"
          functionName="parse-bs7671"
          estimatedTime="Processing time: 15-20 minutes"
          icon={<BookOpen className="h-6 w-6 text-amber-600" />}
          requiresFileUpload={true}
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

        <DocumentProcessor
          title="Guidance Note 3: Inspection & Testing"
          description="IET testing procedures - processes into installation_knowledge"
          functionName="parse-guidance-note-3"
          estimatedTime="Processing time: 10-12 minutes"
          icon={<Zap className="h-6 w-6 text-indigo-600" />}
          requiresFileUpload={true}
        />

        <DocumentProcessor
          title="Electrical Installation Design Guide"
          description="Design calculations and methods - processes into installation_knowledge"
          functionName="parse-design-guide"
          estimatedTime="Processing time: 2-3 minutes"
          icon={<FileText className="h-6 w-6 text-teal-600" />}
          requiresFileUpload={true}
        />

        <DocumentProcessor
          title="Electrical Wiring Diagrams"
          description="Circuit diagrams and symbols - processes into installation_knowledge"
          functionName="parse-wiring-diagrams"
          estimatedTime="Processing time: 8-10 minutes"
          icon={<FileText className="h-6 w-6 text-cyan-600" />}
          requiresFileUpload={true}
        />

        <DocumentProcessor
          title="IET Code of Practice: EV Charging"
          description="Electric vehicle charging infrastructure - processes into installation_knowledge"
          functionName="parse-ev-charging"
          estimatedTime="Processing time: 5-6 minutes"
          icon={<Zap className="h-6 w-6 text-emerald-600" />}
          requiresFileUpload={true}
        />

        <DocumentProcessor
          title="Electrical Installation Calculations: Basic"
          description="Basic electrical calculations - processes into installation_knowledge"
          functionName="parse-calculations-basic"
          estimatedTime="Processing time: 8-10 minutes"
          icon={<FileText className="h-6 w-6 text-orange-600" />}
          requiresFileUpload={true}
        />

        <DocumentProcessor
          title="IET Code of Practice: In-service Testing"
          description="PAT testing procedures - processes into installation_knowledge"
          functionName="parse-inservice-testing"
          estimatedTime="Processing time: 2-3 minutes"
          icon={<Zap className="h-6 w-6 text-rose-600" />}
          requiresFileUpload={true}
        />
      </div>
    </div>
  );
};

export default AdminRAGProcessor;
