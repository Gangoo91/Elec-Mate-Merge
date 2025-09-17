import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowLeft, BookOpen, PoundSterling, Calculator, RefreshCw, Loader2, AlertCircle } from "lucide-react";
import { useLiveEducationData, LiveEducationData } from "@/hooks/useLiveEducationData";
import ModernEducationHero from "./ModernEducationHero";
import ModernEducationFeaturedCarousel from "./ModernEducationFeaturedCarousel";
import ModernEducationGrid from "./ModernEducationGrid";
import ModernEducationFilters, { EducationFilters } from "./ModernEducationFilters";
import ModernEducationDetailsModal from "./ModernEducationDetailsModal";
import FundingCalculator from "../../../apprentice/career/education/FundingCalculator";

const ElectricianFurtherEducation = () => {
  const { educationData, analytics, loading, error, lastUpdated, isFromCache, refreshData, cacheInfo } = useLiveEducationData('all');
  const [filteredOptions, setFilteredOptions] = useState<LiveEducationData[]>([]);
  const [selectedOption, setSelectedOption] = useState<LiveEducationData | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "funding">("grid");
  const [modalOpen, setModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Update filtered options when education data changes
  useEffect(() => {
    setFilteredOptions(educationData);
  }, [educationData]);

  const handleFiltersChange = (filters: EducationFilters) => {
    let filtered = educationData;

    // Apply search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(option => 
        option.title.toLowerCase().includes(searchLower) ||
        option.institution.toLowerCase().includes(searchLower) ||
        option.description.toLowerCase().includes(searchLower) ||
        option.keyTopics.some(topic => topic.toLowerCase().includes(searchLower))
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(option => option.category === filters.category);
    }

    // Apply level filter
    if (filters.level) {
      filtered = filtered.filter(option => option.level === filters.level);
    }

    // Apply study mode filter
    if (filters.studyMode) {
      filtered = filtered.filter(option => option.studyMode === filters.studyMode);
    }

    // Apply location filter
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filtered = filtered.filter(option => 
        option.locations.some(loc => loc.toLowerCase().includes(locationLower))
      );
    }

  // Apply sorting
    switch (filters.sortBy) {
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "employment":
        filtered.sort((a, b) => (b.employmentRate || 0) - (a.employmentRate || 0));
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "duration":
        filtered.sort((a, b) => {
          const aDuration = parseInt(a.duration.match(/\d+/)?.[0] || "0");
          const bDuration = parseInt(b.duration.match(/\d+/)?.[0] || "0");
          return aDuration - bDuration;
        });
        break;
      case "fees":
        filtered.sort((a, b) => {
          const aFees = parseInt(a.tuitionFees.replace(/[^\d]/g, "") || "0");
          const bFees = parseInt(b.tuitionFees.replace(/[^\d]/g, "") || "0");
          return aFees - bFees;
        });
        break;
    }

    setFilteredOptions(filtered);
  };

  const handleReset = () => {
    setFilteredOptions(educationData);
  };

  const handleViewDetails = (option: LiveEducationData) => {
    setSelectedOption(option);
    setModalOpen(true);
  };

  const handleBackToGrid = () => {
    setSelectedOption(null);
    setViewMode("grid");
  };

  const handleShowFundingCalculator = () => {
    setViewMode("funding");
  };

  const handleRefreshData = async () => {
    try {
      setIsRefreshing(true);
      await refreshData(true); // Force refresh
    } finally {
      setIsRefreshing(false);
    }
  };

  if (viewMode === "funding") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBackToGrid}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Education Options
          </Button>
        </div>
        <FundingCalculator />
      </div>
    );
  }


  // Get featured programmes (top 6 highest rated or employment rate)
  const featuredProgrammes = filteredOptions
    .filter(prog => (prog.rating || 0) >= 4.0 || (prog.employmentRate || 0) >= 80)
    .slice(0, 6);
  
  // Get remaining programmes for grid
  const gridProgrammes = filteredOptions.filter(prog => 
    !featuredProgrammes.find(featured => featured.id === prog.id)
  );

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <ModernEducationHero 
        analytics={analytics}
        isFromCache={isFromCache}
        lastUpdated={lastUpdated}
        onFundingCalculator={handleShowFundingCalculator}
        onRefreshData={handleRefreshData}
        isRefreshing={isRefreshing}
      />

      {/* Error Message */}
      {error && (
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3 text-destructive">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div className="text-sm leading-relaxed">
                <strong>Connection Issue:</strong> {error} - Showing cached data if available.
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-elec-yellow" />
          <div className="text-center space-y-3">
            <span className="text-lg font-medium text-white">Fetching live education data...</span>
            <div className="text-sm text-white/80 max-w-md mx-auto leading-relaxed">
              Gathering latest programmes from universities, colleges, and training providers
            </div>
          </div>
        </div>
      )}

      {!loading && (
        <>

          {/* Modern Filters */}
          <div id="education-filters">
            <ModernEducationFilters
              programmes={educationData}
              onFiltersChange={handleFiltersChange}
              onReset={handleReset}
              resultCount={filteredOptions.length}
            />
          </div>

          {/* Results Section */}
          {filteredOptions.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">No programmes found</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Try adjusting your search criteria or explore different categories.
                </p>
                <Button variant="outline" onClick={handleReset}>
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {/* Featured Carousel */}
              {featuredProgrammes.length > 0 && (
                <div className="transform transition-all duration-300">
                  <ModernEducationFeaturedCarousel 
                    programmes={featuredProgrammes}
                    onProgrammeClick={handleViewDetails}
                  />
                </div>
              )}

              {/* Remaining Programmes Grid */}
              {gridProgrammes.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent flex-1" />
                    <h3 className="text-xl font-semibold text-white px-4">
                      {featuredProgrammes.length > 0 ? 'More Education Programmes' : 'All Programmes'}
                    </h3>
                    <div className="h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent flex-1" />
                  </div>
                  <div className="transform transition-all duration-300">
                    <ModernEducationGrid 
                      programmes={gridProgrammes}
                      onProgrammeClick={handleViewDetails}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Funding Information Card */}
      <Card className="bg-gradient-to-br from-elec-card to-elec-card/80 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-elec-yellow/10">
              <PoundSterling className="h-5 w-5 text-elec-yellow flex-shrink-0" />
            </div>
            UK Education Funding Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Government Support Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                <h4 className="font-semibold text-elec-yellow">Government Support</h4>
              </div>
              <div className="space-y-4">
                <div className="bg-background/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h5 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    Advanced Learner Loan (19+)
                  </h5>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Available for Level 3-6 qualifications. No upfront fees, only repay when earning £25,000+. 
                    9% of income above threshold.
                  </p>
                </div>
                <div className="bg-background/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h5 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    Student Finance England
                  </h5>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Tuition fee loans up to £9,250 for degrees. Maintenance loans available based on household income. 
                    Repayment at 9% above £27,295.
                  </p>
                </div>
                <div className="bg-background/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h5 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    Postgraduate Loan
                  </h5>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Up to £12,167 for Master's study. 6% interest rate. Same repayment terms as undergraduate loans.
                  </p>
                </div>
              </div>
            </div>

            {/* Industry & Employer Support Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                <h4 className="font-semibold text-elec-yellow">Industry & Employer Support</h4>
              </div>
              <div className="space-y-4">
                <div className="bg-background/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h5 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    Apprenticeship Levy
                  </h5>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Large employers (£3M+ payroll) contribute 0.5% to apprenticeship levy. Can fund degree apprenticeships.
                  </p>
                </div>
                <div className="bg-background/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h5 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    Professional Body Grants
                  </h5>
                  <p className="text-white/80 text-sm leading-relaxed">
                    IET scholarships (£1,000-£10,000), ECA Educational Trust grants, NECA bursaries for electrical study.
                  </p>
                </div>
                <div className="bg-background/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h5 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    Career Development Loans
                  </h5>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Bank loans for vocational training. Government pays interest during study and one month after.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Education Details Modal */}
      <ModernEducationDetailsModal
        programme={selectedOption}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default ElectricianFurtherEducation;