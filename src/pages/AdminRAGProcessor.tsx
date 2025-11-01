import { KnowledgeStatusPanel } from "@/components/admin/KnowledgeStatusPanel";
import { DocumentProcessor } from "@/components/admin/DocumentProcessor";
import { MaintenanceEnrichmentTester } from "@/components/admin/MaintenanceEnrichmentTester";
import { BookOpen, GraduationCap, Lightbulb, FileText, Zap, CheckCircle2, XCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const AdminRAGProcessor = () => {
  const { data: stats } = useQuery({
    queryKey: ['knowledge-stats-admin'],
    queryFn: async () => {
      const [bs7671Result, installationResult] = await Promise.all([
        supabase.from('bs7671_embeddings').select('id', { count: 'exact', head: false }),
        supabase.from('installation_knowledge').select('source', { count: 'exact', head: false })
      ]);

      const sourceCounts = installationResult.data?.reduce((acc: Record<string, number>, item) => {
        acc[item.source] = (acc[item.source] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      return {
        'bs7671': bs7671Result.data?.length || 0,
        'on-site-guide': sourceCounts['on-site-guide'] || 0,
        'city-guilds-book-1': sourceCounts['city-guilds-book-1'] || 0,
        'city-guilds-book-2': sourceCounts['city-guilds-book-2'] || 0,
        'city-guilds-level-2': sourceCounts['city-guilds-level-2'] || 0,
        'city-guilds-level-3': sourceCounts['city-guilds-level-3'] || 0,
        'emergency-lighting': sourceCounts['emergency-lighting'] || 0,
        'guidance-note-3': sourceCounts['guidance-note-3'] || 0,
        'design-guide': sourceCounts['design-guide'] || 0,
        'wiring-diagrams': sourceCounts['wiring-diagrams'] || 0,
        'ev-charging': sourceCounts['ev-charging'] || 0,
        'calculations-basic': sourceCounts['calculations-basic'] || 0,
        'inservice-testing': sourceCounts['inservice-testing'] || 0,
        'health-safety-management': sourceCounts['health-safety-management'] || 0,
        'nebosh-igc': sourceCounts['nebosh-igc'] || 0,
      };
    },
    refetchInterval: 5000,
  });

  const getStatusIcon = (source: string) => {
    const count = stats?.[source] || 0;
    if (count > 0) {
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    }
    return <XCircle className="w-5 h-5 text-muted-foreground/40" />;
  };

  const getStatusText = (source: string) => {
    const count = stats?.[source] || 0;
    if (count > 0) {
      return `✅ ${count} chunks`;
    }
    return 'Not uploaded';
  };

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

        <MaintenanceEnrichmentTester />

        <DocumentProcessor
          title="BS 7671 Wiring Regulations (18th Edition +A2:2022)"
          description="Core legal foundation - processes into bs7671_embeddings table"
          functionName="parse-bs7671"
          estimatedTime="Processing time: 15-20 minutes"
          icon={<BookOpen className="h-6 w-6 text-amber-600" />}
          requiresFileUpload={true}
          statusIcon={getStatusIcon('bs7671')}
          statusText={getStatusText('bs7671')}
        />

        <DocumentProcessor
          title="IET On-Site Guide"
          description="Practical installation companion - processes into installation_knowledge"
          functionName="parse-onsite-guide"
          estimatedTime="Processing time: 5-10 minutes"
          icon={<FileText className="h-6 w-6 text-blue-600" />}
          statusIcon={getStatusIcon('on-site-guide')}
          statusText={getStatusText('on-site-guide')}
        />

        <DocumentProcessor
          title="City & Guilds Book 1 (Level 2/3)"
          description="Foundation training materials - processes into installation_knowledge"
          functionName="parse-city-guilds-book-1"
          estimatedTime="Processing time: 3-8 minutes"
          icon={<GraduationCap className="h-6 w-6 text-green-600" />}
          requiresFileUpload={true}
          statusIcon={getStatusIcon('city-guilds-book-1')}
          statusText={getStatusText('city-guilds-book-1')}
        />

        <DocumentProcessor
          title="City & Guilds Book 2 (Level 3)"
          description="Advanced training materials - processes into installation_knowledge"
          functionName="parse-city-guilds-book-2"
          estimatedTime="Processing time: 3-8 minutes"
          icon={<GraduationCap className="h-6 w-6 text-purple-600" />}
          requiresFileUpload={true}
          statusIcon={getStatusIcon('city-guilds-book-2')}
          statusText={getStatusText('city-guilds-book-2')}
        />

        <DocumentProcessor
          title="City & Guilds Level 2 Revision Notes"
          description="Level 2 revision guide - processes into installation_knowledge"
          functionName="parse-city-guilds-level-2"
          estimatedTime="Processing time: 2-3 minutes"
          icon={<GraduationCap className="h-6 w-6 text-blue-500" />}
          requiresFileUpload={true}
          statusIcon={getStatusIcon('city-guilds-level-2')}
          statusText={getStatusText('city-guilds-level-2')}
        />

        <DocumentProcessor
          title="City & Guilds Level 3 Revision Notes"
          description="Level 3 advanced revision guide - processes into installation_knowledge"
          functionName="parse-city-guilds-level-3"
          estimatedTime="Processing time: 5-8 minutes"
          icon={<GraduationCap className="h-6 w-6 text-violet-600" />}
          requiresFileUpload={true}
          statusIcon={getStatusIcon('city-guilds-level-3')}
          statusText={getStatusText('city-guilds-level-3')}
        />

        <DocumentProcessor
          title="Health & Safety Risk Management (5th Ed)"
          description="H&S management guide - processes into installation_knowledge"
          functionName="parse-health-safety-management"
          estimatedTime="Processing time: 10-15 minutes"
          icon={<FileText className="h-6 w-6 text-red-600" />}
          requiresFileUpload={true}
          statusIcon={getStatusIcon('health-safety-management')}
          statusText={getStatusText('health-safety-management')}
        />

        <DocumentProcessor
          title="NEBOSH IGC IG1 Course Notes"
          description="NEBOSH international certificate - processes into installation_knowledge"
          functionName="parse-nebosh-igc"
          estimatedTime="Processing time: 5-8 minutes"
          icon={<FileText className="h-6 w-6 text-amber-600" />}
          requiresFileUpload={true}
          statusIcon={getStatusIcon('nebosh-igc')}
          statusText={getStatusText('nebosh-igc')}
        />

        <DocumentProcessor
          title="Emergency Lighting Guide (BS 5266)"
          description="Emergency lighting standards - processes into installation_knowledge"
          functionName="parse-emergency-lighting"
          estimatedTime="Processing time: 30 seconds - 2 minutes"
          icon={<Lightbulb className="h-6 w-6 text-yellow-600" />}
          requiresFileUpload={true}
          statusIcon={getStatusIcon('emergency-lighting')}
          statusText={getStatusText('emergency-lighting')}
        />

        <DocumentProcessor
          title="Guidance Note 3: Inspection & Testing"
          description="IET testing procedures - processes into installation_knowledge"
          functionName="parse-guidance-note-3"
          estimatedTime="Processing time: 10-12 minutes"
          icon={<Zap className="h-6 w-6 text-indigo-600" />}
          requiresFileUpload={true}
          statusIcon={getStatusIcon('guidance-note-3')}
          statusText={getStatusText('guidance-note-3')}
        />

        <DocumentProcessor
          title="Electrical Installation Design Guide"
          description="Design calculations and methods - processes into installation_knowledge"
          functionName="parse-design-guide"
          estimatedTime="Processing time: 2-3 minutes"
          icon={<FileText className="h-6 w-6 text-teal-600" />}
          requiresFileUpload={true}
          statusIcon={getStatusIcon('design-guide')}
          statusText={getStatusText('design-guide')}
        />

        <DocumentProcessor
          title="Electrical Wiring Diagrams"
          description="Circuit diagrams and symbols - processes into installation_knowledge"
          functionName="parse-wiring-diagrams"
          estimatedTime="Processing time: 8-10 minutes"
          icon={<FileText className="h-6 w-6 text-cyan-600" />}
          requiresFileUpload={true}
          statusIcon={getStatusIcon('wiring-diagrams')}
          statusText={getStatusText('wiring-diagrams')}
        />

        <DocumentProcessor
          title="IET Code of Practice: EV Charging"
          description="Electric vehicle charging infrastructure - processes into installation_knowledge"
          functionName="parse-ev-charging"
          estimatedTime="Processing time: 5-6 minutes"
          icon={<Zap className="h-6 w-6 text-emerald-600" />}
          requiresFileUpload={true}
          statusIcon={getStatusIcon('ev-charging')}
          statusText={getStatusText('ev-charging')}
        />

        <DocumentProcessor
          title="Electrical Installation Calculations: Basic"
          description="Basic electrical calculations - processes into installation_knowledge"
          functionName="parse-calculations-basic"
          estimatedTime="Processing time: 8-10 minutes"
          icon={<FileText className="h-6 w-6 text-orange-600" />}
          requiresFileUpload={true}
          statusIcon={getStatusIcon('calculations-basic')}
          statusText={getStatusText('calculations-basic')}
        />

        <DocumentProcessor
          title="IET Code of Practice: In-service Testing"
          description="PAT testing procedures - processes into installation_knowledge"
          functionName="parse-inservice-testing"
          estimatedTime="Processing time: 2-3 minutes"
          icon={<Zap className="h-6 w-6 text-rose-600" />}
          requiresFileUpload={true}
          statusIcon={getStatusIcon('inservice-testing')}
          statusText={getStatusText('inservice-testing')}
        />
      </div>
    </div>
  );
};

export default AdminRAGProcessor;
