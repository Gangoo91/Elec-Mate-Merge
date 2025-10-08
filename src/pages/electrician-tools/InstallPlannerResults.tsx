import { useLocation, useNavigate } from "react-router-dom";
import { EnhancedResultsPage } from "@/components/install-planner-v2/EnhancedResultsPage";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const InstallPlannerResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);

  const { messages = [], planData = {}, activeAgents = [] } = location.state || {};

  // If no state data, redirect back to planner
  if (!messages || messages.length === 0) {
    navigate('/electrician/install-planner');
    return null;
  }

  const handleExport = async (selectedDocs?: string[], clientDetails?: any, companyDetails?: any) => {
    setIsExporting(true);
    
    const docCount = selectedDocs?.length || 6;
    toast.info(`Generating ${docCount} document${docCount !== 1 ? 's' : ''}...`, {
      description: "Creating professional PDFs"
    });

    try {
      const { data, error } = await supabase.functions.invoke('generate-professional-package', {
        body: { 
          messages,
          designData: planData,
          clientDetails,
          companyDetails,
          selectedDocuments: selectedDocs
        }
      });

      if (error) throw error;

      // Download ZIP
      const blob = new Blob([data], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const packageType = docCount === 6 ? 'Full' : `${docCount}doc`;
      const timestamp = new Date().toISOString().split('T')[0];
      a.download = `ElecMate_${packageType}_Package_${timestamp}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Package Downloaded! 🎉", {
        description: `${docCount} professional document${docCount !== 1 ? 's' : ''} ready`
      });
    } catch (error) {
      console.error('Export error:', error);
      toast.error("Export Failed", {
        description: error instanceof Error ? error.message : "Unknown error occurred"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleNewConsultation = () => {
    navigate('/electrician/install-planner');
  };

  const handleReEngageAgent = (agentId: string) => {
    // Navigate back to planner with targetAgent parameter
    navigate('/electrician/install-planner', {
      state: {
        resumeMessages: messages,
        resumePlanData: planData,
        targetAgent: agentId
      }
    });
  };

  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="space-y-6 animate-fade-in">
          {/* Back Button */}
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/electrician/install-planner')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Planner
            </Button>
          </div>

          {/* Enhanced Results Page Content */}
          <EnhancedResultsPage
            messages={messages}
            selectedAgents={activeAgents}
            circuits={planData?.circuits || []}
            projectId={planData?.projectId}
            projectName={planData?.projectName || "Installation Design"}
            onExport={handleExport}
            onNewConsultation={handleNewConsultation}
            onReEngageAgent={handleReEngageAgent}
          />
        </div>
      </div>
    </div>
  );
};

export default InstallPlannerResults;
