import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowLeft, BookOpen, PoundSterling, Calculator, RefreshCw, Loader2, AlertCircle } from "lucide-react";
import EducationSearchForm, { SearchFilters } from "../../../apprentice/career/education/EducationSearchForm";
import FundingCalculator from "../../../apprentice/career/education/FundingCalculator";
import { useLiveEducationData, LiveEducationData } from "@/hooks/useLiveEducationData";
import LiveEducationCard from "./LiveEducationCard";
import KpiStrip from "./KpiStrip";
import InsightsAccordion from "./InsightsAccordion";

const ElectricianFurtherEducation = () => {
  const { educationData, analytics, loading, error, lastUpdated, isFromCache, refreshData } = useLiveEducationData('all');
  const [filteredOptions, setFilteredOptions] = useState<LiveEducationData[]>([]);
  const [selectedOption, setSelectedOption] = useState<LiveEducationData | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "details" | "funding">("grid");

  // Update filtered options when education data changes
  useEffect(() => {
    setFilteredOptions(educationData);
  }, [educationData]);

  const handleSearch = (filters: SearchFilters) => {
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
    if (filters.category && filters.category !== "All Categories") {
      filtered = filtered.filter(option => option.category === filters.category);
    }

    // Apply study mode filter
    if (filters.studyMode && filters.studyMode !== "All Study Modes") {
      filtered = filtered.filter(option => option.studyMode === filters.studyMode);
    }

    // Apply location filter
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filtered = filtered.filter(option => 
        option.locations.some(loc => loc.toLowerCase().includes(locationLower))
      );
    }

    // Apply level filter
    if (filters.level) {
      filtered = filtered.filter(option => option.level === filters.level);
    }

    // Apply funding type filter
    if (filters.fundingType) {
      filtered = filtered.filter(option => 
        option.fundingOptions.some(funding => funding.includes(filters.fundingType))
      );
    }

    setFilteredOptions(filtered);
  };

  const handleReset = () => {
    setFilteredOptions(educationData);
  };

  const handleViewDetails = (option: LiveEducationData) => {
    setSelectedOption(option);
    setViewMode("details");
  };

  const handleBackToGrid = () => {
    setSelectedOption(null);
    setViewMode("grid");
  };

  const handleShowFundingCalculator = () => {
    setViewMode("funding");
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

  if (viewMode === "details" && selectedOption) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBackToGrid}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Education Options
          </Button>
        </div>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-2xl">{selectedOption.title}</CardTitle>
            <p className="text-amber-400">{selectedOption.institution}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">{selectedOption.description}</p>
            
            {/* Detailed information sections would go here */}
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Detailed view implementation would continue here with comprehensive information,
                application forms, funding calculators, etc.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mobile-container mobile-section-spacing">
      {/* Header */}
      <div className="mobile-card-spacing">
        <h1 className="mobile-heading flex items-center gap-3">
          <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow flex-shrink-0" />
          <span className="leading-tight">Further Education for Electricians</span>
        </h1>
        <p className="mobile-text text-text-muted max-w-4xl">
          Discover comprehensive educational pathways to advance your electrical career. 
          From HNC certificates to master's degrees, find the right qualification to achieve your professional goals.
        </p>
      </div>

      {/* Quick KPIs */}
      <KpiStrip 
        analytics={analytics}
        isFromCache={isFromCache}
        lastUpdated={lastUpdated}
      />

      {/* Market Insights - Collapsible */}
      <InsightsAccordion analytics={analytics} />

      {/* Action Buttons */}
      <div className="mobile-action-bar">
        <Button 
          onClick={handleShowFundingCalculator}
          variant="outline"
          className="mobile-button-secondary w-full sm:w-auto"
        >
          <Calculator className="mr-2 h-4 w-4" />
          Funding Calculator
        </Button>
        <Button 
          onClick={() => refreshData(true)}
          variant="outline"
          className="mobile-button-secondary w-full sm:w-auto"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Force Refresh Live Data
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <Card className="mobile-card border-destructive/20 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3 text-destructive">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div className="mobile-small-text leading-relaxed">
                <strong>Connection Issue:</strong> {error} - Showing cached data if available.
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <EducationSearchForm onSearch={handleSearch} onReset={handleReset} />

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2">
          <h2 className="mobile-subheading">Available Programmes</h2>
          <span className="mobile-small-text text-text-subtle bg-elec-card px-2 py-1 rounded-md">
            {filteredOptions.length} {filteredOptions.length === 1 ? 'result' : 'results'}
          </span>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="mobile-card flex flex-col items-center justify-center py-8 space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-elec-yellow" />
          <div className="text-center space-y-3">
            <span className="mobile-text text-text-muted font-medium">Scraping live education data...</span>
            <div className="mobile-small-text text-text-subtle max-w-sm mx-auto leading-relaxed">
              Fetching latest courses from IDP Education, National Careers Service, and TradeSkills4U
            </div>
          </div>
        </div>
      )}

      {/* Education Options Grid */}
      {!loading && (
        <div className="mobile-grid-responsive md:grid-cols-2">
          {filteredOptions.map((option) => (
            <LiveEducationCard
              key={option.id}
              option={option}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredOptions.length === 0 && !loading && (
        <Card className="mobile-card">
          <CardContent className="p-6 sm:p-8 text-center">
            <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="mobile-subheading mb-3">No programmes found</h3>
            <p className="mobile-text text-text-muted mb-6 max-w-md mx-auto">
              Try adjusting your search criteria or explore different categories.
            </p>
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="mobile-button-secondary"
            >
              Reset Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Funding Information Card - Mobile optimized */}
      <Card className="mobile-card bg-gradient-to-br from-elec-card to-elec-card/80 border-elec-yellow/20">
        <CardHeader className="mobile-padding">
          <CardTitle className="flex items-center gap-3 mobile-subheading">
            <div className="p-2 rounded-full bg-elec-yellow/10">
              <PoundSterling className="h-5 w-5 text-elec-yellow flex-shrink-0" />
            </div>
            UK Education Funding Support
          </CardTitle>
        </CardHeader>
        <CardContent className="mobile-padding space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Government Support Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                <h4 className="font-semibold text-elec-yellow mobile-text">Government Support</h4>
              </div>
              <div className="space-y-4">
                <div className="bg-background/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h5 className="font-semibold text-foreground mobile-small-text mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    Advanced Learner Loan (19+)
                  </h5>
                  <p className="text-text-subtle mobile-small-text leading-relaxed">
                    Available for Level 3-6 qualifications. No upfront fees, only repay when earning £25,000+. 
                    9% of income above threshold.
                  </p>
                </div>
                <div className="bg-background/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h5 className="font-semibold text-foreground mobile-small-text mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    Student Finance England
                  </h5>
                  <p className="text-text-subtle mobile-small-text leading-relaxed">
                    Tuition fee loans up to £9,250 for degrees. Maintenance loans available based on household income. 
                    Repayment at 9% above £27,295.
                  </p>
                </div>
                <div className="bg-background/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h5 className="font-semibold text-foreground mobile-small-text mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    Postgraduate Loan
                  </h5>
                  <p className="text-text-subtle mobile-small-text leading-relaxed">
                    Up to £12,167 for Master's study. 6% interest rate. Same repayment terms as undergraduate loans.
                  </p>
                </div>
              </div>
            </div>

            {/* Industry & Employer Support Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                <h4 className="font-semibold text-elec-yellow mobile-text">Industry & Employer Support</h4>
              </div>
              <div className="space-y-4">
                <div className="bg-background/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h5 className="font-semibold text-foreground mobile-small-text mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    Apprenticeship Levy
                  </h5>
                  <p className="text-text-subtle mobile-small-text leading-relaxed">
                    Large employers (£3M+ payroll) contribute 0.5% to apprenticeship levy. Can fund degree apprenticeships.
                  </p>
                </div>
                <div className="bg-background/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h5 className="font-semibold text-foreground mobile-small-text mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    Professional Body Grants
                  </h5>
                  <p className="text-text-subtle mobile-small-text leading-relaxed">
                    IET scholarships (£1,000-£10,000), ECA Educational Trust grants, NECA bursaries for electrical study.
                  </p>
                </div>
                <div className="bg-background/30 rounded-lg p-4 border border-elec-yellow/10">
                  <h5 className="font-semibold text-foreground mobile-small-text mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                    Career Development Loans
                  </h5>
                  <p className="text-text-subtle mobile-small-text leading-relaxed">
                    Bank loans for vocational training. Government pays interest during study and one month after.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectricianFurtherEducation;