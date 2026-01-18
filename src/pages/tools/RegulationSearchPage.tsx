import { ArrowLeft, Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AISearchInterface from "@/components/inspection-app/regulation-search/AISearchInterface";

const RegulationSearchPage = () => {
  const navigate = useNavigate();

  const handleRegulationSelect = (regulation: string) => {
    // Could navigate to a detail page or show inline
    console.log('Selected regulation:', regulation);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark via-elec-grey to-elec-dark">
      <main className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 space-y-4 sm:space-y-6 md:space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Search className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
                Regulation Search
              </h1>
              <p className="text-xs sm:text-sm text-white/60">AI-powered BS 7671 search</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="h-10 sm:h-11 px-3 sm:px-4 border-white/20 text-white/70 hover:text-white hover:bg-white/10 gap-2 touch-manipulation active:scale-[0.98] min-h-[44px]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </header>

        {/* Search Interface */}
        <AISearchInterface onRegulationSelect={handleRegulationSelect} />
      </main>
    </div>
  );
};

export default RegulationSearchPage;
