import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, RotateCcw, Loader } from "lucide-react";
import { ResultsPage } from "@/components/install-planner/ResultsPage";
import { InstallPlanDataV2 } from "@/components/install-planner-v2/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectDetailsForm, ProjectDetailsData } from "@/components/install-planner/ProjectDetailsForm";

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
  const { conversationId } = useParams();
  const { companyProfile } = useCompanyProfile();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "results";
  const setActiveTab = (tab: string) => setSearchParams({ tab }, { replace: false });
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agentResults, setAgentResults] = useState<any[]>([]);

  const state = location.state as LocationState;
  
  // Project details form state
  const [projectDetails, setProjectDetails] = useState<ProjectDetailsData>({
    companyName: companyProfile?.company_name || 'Your Company',
    companyLogoUrl: companyProfile?.logo_url,
    companyAddress: companyProfile?.company_address || '',
    companyPostcode: companyProfile?.company_postcode || '',
    companyPhone: companyProfile?.company_phone || '',
    companyEmail: companyProfile?.company_email || '',
    companyWebsite: companyProfile?.company_website,
    registrationNumber: companyProfile?.company_registration,
    vatNumber: companyProfile?.vat_number,
    clientName: '',
    propertyAddress: '',
    postcode: '',
    contactNumber: '',
    clientEmail: '',
    projectName: '',
    location: '',
    designEngineer: '',
    designDate: new Date().toISOString().split('T')[0],
    installationType: 'domestic',
  });

  // Fetch results from database if conversationId provided
  useEffect(() => {
    const fetchResultsFromDB = async (convId: string) => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('consultation_results')
          .select('*')
          .eq('conversation_id', convId)
          .order('created_at', { ascending: true });
        
        if (error) {
          console.error('Failed to load results:', error);
          toast({
            title: "Failed to load results",
            description: "Redirecting to install planner",
            variant: "destructive",
          });
          navigate('/electrician/install-planner');
          return;
        }
        
        setAgentResults(data || []);
      } catch (error) {
        console.error('Error fetching results:', error);
        navigate('/electrician/install-planner');
      } finally {
        setIsLoading(false);
      }
    };

    if (conversationId) {
      fetchResultsFromDB(conversationId);
    } else if (!state?.messages) {
      navigate('/electrician/install-planner?mode=ai');
    }
  }, [conversationId, navigate]);

  // Initialize project details from planData and companyProfile
  useEffect(() => {
    if (!state || !state.planData) return;
    
    const { planData } = state;
    setProjectDetails(prev => ({
      ...prev,
      companyName: companyProfile?.company_name || prev.companyName,
      companyLogoUrl: companyProfile?.logo_url || prev.companyLogoUrl,
      companyAddress: companyProfile?.company_address || prev.companyAddress,
      companyPostcode: companyProfile?.company_postcode || prev.companyPostcode,
      companyPhone: companyProfile?.company_phone || prev.companyPhone,
      companyEmail: companyProfile?.company_email || prev.companyEmail,
      companyWebsite: companyProfile?.company_website || prev.companyWebsite,
      registrationNumber: companyProfile?.company_registration || prev.registrationNumber,
      vatNumber: companyProfile?.vat_number || prev.vatNumber,
      clientName: planData.siteInfo?.clientName || prev.clientName,
      propertyAddress: planData.siteInfo?.propertyAddress || prev.propertyAddress,
      postcode: planData.siteInfo?.postcode || prev.postcode,
      contactNumber: planData.siteInfo?.contactNumber || prev.contactNumber,
      projectName: `${planData.installationType} Installation`,
      location: planData.siteInfo?.propertyAddress || prev.location,
      designEngineer: planData.projectInfo?.leadElectrician || prev.designEngineer,
      installationType: planData.installationType,
    }));
  }, [companyProfile, state]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('installPlanner_projectDetails', JSON.stringify(projectDetails));
  }, [projectDetails]);
  
  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('installPlanner_projectDetails');
    if (saved) {
      try {
        setProjectDetails(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved project details', e);
      }
    }
  }, []);
  
  // Show loading state while fetching
  if (isLoading) {
    return (
      <div className="min-h-screen bg-elec-dark flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin mx-auto mb-4 text-elec-yellow" />
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    );
  }

  // Use database results if available, otherwise fall back to location.state
  const messages = agentResults.length > 0
    ? agentResults.map(r => ({
        role: 'assistant' as const,
        content: r.output_data?.response || '',
        agentName: r.agent_type,
        structuredData: r.output_data
      }))
    : state?.messages || [];

  const planData: InstallPlanDataV2 = state?.planData || {
    mode: 'ai-guided',
    installationType: 'domestic',
    loadType: 'general',
    totalLoad: 0,
    voltage: 230,
    phases: 'single',
    cableLength: 0,
    cableType: 'T&E',
    installationMethod: 'A',
    circuits: [],
    siteInfo: {},
    projectInfo: {},
    environmentalProfile: {
      autoDetected: {
        ambientTemp: 30,
        conditions: 'normal',
        earthing: 'TN-S',
        ze: 0.35,
        grouping: 1
      },
      userOverrides: {},
      finalApplied: {
        ambientTemp: 30,
        conditions: 'normal',
        earthing: 'TN-S',
        ze: 0.35,
        grouping: 1
      }
    }
  };
  const activeAgents = state?.activeAgents || [];

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
          companyDetails: {
            company_name: projectDetails.companyName,
            company_logo_url: projectDetails.companyLogoUrl,
            company_address: `${projectDetails.companyAddress}, ${projectDetails.companyPostcode}`,
            company_phone: projectDetails.companyPhone,
            company_email: projectDetails.companyEmail,
            company_website: projectDetails.companyWebsite,
            registration_number: projectDetails.registrationNumber,
            vat_number: projectDetails.vatNumber,
          },
          clientDetails: {
            client_name: projectDetails.clientName,
            property_address: projectDetails.propertyAddress,
            postcode: projectDetails.postcode,
            contact_number: projectDetails.contactNumber,
            email: projectDetails.clientEmail,
          },
          projectInfo: {
            project_name: projectDetails.projectName,
            location: projectDetails.location,
            design_engineer: projectDetails.designEngineer,
            design_date: projectDetails.designDate,
            installation_type: projectDetails.installationType,
          },
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

  // Check if required fields are filled
  const requiredFieldsFilled = projectDetails.companyName && 
    projectDetails.clientName && 
    projectDetails.propertyAddress && 
    projectDetails.projectName && 
    projectDetails.designEngineer;

  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 py-6">
        <div className="space-y-6 animate-fade-in">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <Link to="/electrician/install-planner?mode=ai">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
              </Link>
              
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                  Installation Design Results
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  BS 7671:2018+A3:2024 Compliant
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button 
                variant="outline" 
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF || !designerData || !requiredFieldsFilled}
                className="gap-2 flex-1 sm:flex-none"
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
                className="gap-2 flex-1 sm:flex-none"
              >
                <RotateCcw className="h-4 w-4" />
                New Consultation
              </Button>
            </div>

            {!requiredFieldsFilled && (
              <div className="bg-card border border-yellow-500/30 rounded-lg p-3 text-sm text-yellow-200">
                ⚠️ Complete all required fields in "Project Details" tab to enable PDF download
              </div>
            )}
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="results">Design Results</TabsTrigger>
              <TabsTrigger value="details">
                Project Details
                {requiredFieldsFilled && <span className="ml-2">✓</span>}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="results">
              <ResultsPage
                messages={messages}
                selectedAgents={activeAgents}
                onExport={handleExport}
                onNewConsultation={handleNewConsultation}
              />
            </TabsContent>
            
            <TabsContent value="details">
              <ProjectDetailsForm
                companyProfile={companyProfile}
                planData={planData}
                value={projectDetails}
                onChange={setProjectDetails}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default InstallPlannerResults;
