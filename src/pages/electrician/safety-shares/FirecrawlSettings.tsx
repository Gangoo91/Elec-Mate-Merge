import { Helmet } from "react-helmet";
import { Settings } from "lucide-react";
import BackButton from "@/components/common/BackButton";
import FirecrawlConfigPanel from "@/components/firecrawl/FirecrawlConfigPanel";
import FirecrawlStatusWidget from "@/components/firecrawl/FirecrawlStatusWidget";

const FirecrawlSettings = () => {
  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Firecrawl Configuration - Elec-Mate</title>
        <meta name="description" content="Configure Firecrawl API integration for real-time UK electrical tender and contract data" />
      </Helmet>
      
      <div className="space-y-8 animate-fade-in max-w-6xl mx-auto p-6">
        <div className="flex items-center gap-4">
          <BackButton customUrl="/electrician/safety-shares/projects" />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-elec-yellow">Firecrawl Configuration</h1>
              <p className="text-muted-foreground">
                Configure real-time data integration for UK electrical tenders and contracts
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Status Widget */}
          <div className="lg:col-span-1">
            <FirecrawlStatusWidget />
          </div>
          
          {/* Configuration Panel */}
          <div className="lg:col-span-2">
            <FirecrawlConfigPanel />
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-elec-card border border-elec-yellow/10 rounded-lg">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Real-Time Data</h3>
            <p className="text-gray-300 text-sm">
              Automatically scrape and update project data from key UK sources including Contracts Finder, 
              Find Tender Service, and National Grid ESO.
            </p>
          </div>
          
          <div className="p-6 bg-elec-card border border-elec-yellow/10 rounded-lg">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Smart Filtering</h3>
            <p className="text-gray-300 text-sm">
              Advanced keyword filtering ensures only relevant electrical infrastructure projects 
              are captured, reducing noise and improving data quality.
            </p>
          </div>
          
          <div className="p-6 bg-elec-card border border-elec-yellow/10 rounded-lg">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Automated Processing</h3>
            <p className="text-gray-300 text-sm">
              Intelligent data normalization, duplicate detection, and categorization ensures 
              consistent, high-quality project information.
            </p>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="bg-elec-card border border-elec-yellow/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow mb-4">Quick Setup Guide</h3>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-elec-yellow text-black flex items-center justify-center text-sm font-bold mt-0.5">1</div>
              <div>
                <h4 className="font-medium text-white">Get Firecrawl API Key</h4>
                <p className="text-sm">Sign up at firecrawl.dev and obtain your API key from the dashboard.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-elec-yellow text-black flex items-center justify-center text-sm font-bold mt-0.5">2</div>
              <div>
                <h4 className="font-medium text-white">Configure Connection</h4>
                <p className="text-sm">Enter your API key in the Connection tab and test the connection.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-elec-yellow text-black flex items-center justify-center text-sm font-bold mt-0.5">3</div>
              <div>
                <h4 className="font-medium text-white">Customize Sources</h4>
                <p className="text-sm">Enable/disable data sources and add custom URLs as needed.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-elec-yellow text-black flex items-center justify-center text-sm font-bold mt-0.5">4</div>
              <div>
                <h4 className="font-medium text-white">Set up Automation</h4>
                <p className="text-sm">Enable scheduled refresh to keep project data current automatically.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirecrawlSettings;