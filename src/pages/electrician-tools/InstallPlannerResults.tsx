import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, RotateCcw, Loader } from "lucide-react";
import { ResultsPage } from "@/components/install-planner/ResultsPage";
import { InstallPlanDataV2 } from "@/components/install-planner-v2/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  agentName?: string;
  agentEmoji?: string;
  structuredData?: any;
}

interface LocationState {
  messages: Message[];
  planData: InstallPlanDataV2;
  activeAgents: string[];
}

const InstallPlannerResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { companyProfile } = useCompanyProfile();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const state = location.state as LocationState;
  
  if (!state || !state.messages) {
    navigate('/electrician/install-planner?mode=ai');
    return null;
  }

  const { messages, planData, activeAgents } = state;

  // Find designer message with structured data
  const designerMessage = messages.find(
    m => m.role === 'assistant' && m.agentName === 'designer' && m.structuredData
  );

  // Extract structured data from designer message
  const getDesignerData = () => {
    if (designerMessage?.structuredData) {
      return designerMessage.structuredData;
    }

    // Fallback: try to parse JSON from content
    const jsonMatch = designerMessage?.content.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[1]);
      } catch (e) {
        console.warn('Could not parse designer JSON from content:', e);
      }
    }

    return null;
  };

  const handleDownloadPDF = async () => {
    const designerData = getDesignerData();
    
    if (!designerData) {
      toast({
        title: "No Design Data",
        description: "Generate a circuit design first to create a PDF.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingPDF(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Please sign in to generate PDFs');

      console.log('🎨 Generating cable calculation PDF...');

      const { data, error } = await supabase.functions.invoke('generate-design-spec-pdf', {
        body: {
          designData: designerData,
          planData,
          companyDetails: companyProfile ? {
            company_name: companyProfile.company_name,
            company_logo_url: companyProfile.logo_url,
            company_address: `${companyProfile.company_address || ''}, ${companyProfile.company_postcode || ''}`,
            company_phone: companyProfile.company_phone,
            company_email: companyProfile.company_email,
            company_website: companyProfile.company_website,
            registration_number: companyProfile.company_registration,
            vat_number: companyProfile.vat_number,
          } : undefined,
          userId: user.id,
        }
      });

      if (error || !data?.success) {
        throw new Error(data?.error || 'PDF generation failed');
      }

      // Open PDF in new tab
      window.open(data.downloadUrl, '_blank');
      
      toast({
        title: "PDF Generated",
        description: "Your cable calculation specification is ready!",
      });

    } catch (error) {
      console.error('❌ PDF generation error:', error);
      toast({
        title: "PDF Generation Failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleNewConsultation = () => {
    navigate('/electrician/install-planner?mode=ai');
  };

  const handleExport = () => {
    handleDownloadPDF();
  };

  const designerData = getDesignerData();

  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="container mx-auto px-6 lg:px-12 xl:px-20 py-6">
        <div className="space-y-6 animate-fade-in">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link to="/electrician/install-planner?mode=ai">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back to AI Designer
                </Button>
              </Link>
              
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                  Installation Design Results
                </h1>
                <p className="text-muted-foreground text-sm md:text-base mt-1">
                  BS 7671:2018+A3:2024 Compliant
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF || !designerData}
                className="gap-2"
              >
                {isGeneratingPDF ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download PDF
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleNewConsultation}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                New Consultation
              </Button>
            </div>
          </div>

          {/* Results component */}
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
