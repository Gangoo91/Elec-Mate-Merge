import { useLocation, useNavigate } from "react-router-dom";
import { ResultsPage } from "@/components/install-planner/ResultsPage";
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

  const handleExport = async () => {
    setIsExporting(true);
    
    toast.info("Generating Package...", {
      description: "Creating professional documents"
    });

    try {
      const { data, error } = await supabase.functions.invoke('generate-professional-package', {
        body: { 
          messages,
          designData: planData,
          companyName: "Your Company Name",
          clientName: "Client Name"
        }
      });

      if (error) throw error;

      // Download ZIP
      const blob = new Blob([data], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Electrical_Design_Package_${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Package Ready! 🎉", {
        description: "Professional documents downloaded as ZIP"
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

          {/* Results Page Content */}
          <ResultsPage
            messages={messages}
            selectedAgents={activeAgents}
            onExport={handleExport}
            onNewConsultation={handleNewConsultation}
          />
        </div>
      </div>
    </div>
  );
};

export default InstallPlannerResults;
