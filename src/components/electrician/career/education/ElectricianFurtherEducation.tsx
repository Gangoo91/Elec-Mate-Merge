import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowLeft, BookOpen, PoundSterling, Users, Target, Calculator } from "lucide-react";
import EducationSearchForm, { SearchFilters } from "../../../apprentice/career/education/EducationSearchForm";
import EnhancedEducationCard from "../../../apprentice/career/education/EnhancedEducationCard";
import EducationAnalyticsDashboard from "../../../apprentice/career/education/EducationAnalyticsDashboard";
import FundingCalculator from "../../../apprentice/career/education/FundingCalculator";
import { enhancedEducationOptions, EnhancedEducationOption } from "../../../apprentice/career/education/enhancedEducationData";

const ElectricianFurtherEducation = () => {
  const [filteredOptions, setFilteredOptions] = useState<EnhancedEducationOption[]>(enhancedEducationOptions);
  const [selectedOption, setSelectedOption] = useState<EnhancedEducationOption | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "details" | "funding">("grid");

  const handleSearch = (filters: SearchFilters) => {
    let filtered = enhancedEducationOptions;

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
    setFilteredOptions(enhancedEducationOptions);
  };

  const handleViewDetails = (option: EnhancedEducationOption) => {
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
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-elec-yellow" />
          Further Education for Electricians
        </h2>
        <p className="text-muted-foreground">
          Discover comprehensive educational pathways to advance your electrical career. 
          From HNC certificates to master's degrees, find the right qualification to achieve your professional goals.
        </p>
      </div>

      {/* Analytics Dashboard */}
      <EducationAnalyticsDashboard />

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={handleShowFundingCalculator}
          variant="outline"
          className="border-elec-yellow/30 hover:bg-elec-yellow/10"
        >
          <Calculator className="mr-2 h-4 w-4" />
          Funding Calculator
        </Button>
      </div>

      {/* Search and Filters */}
      <EducationSearchForm onSearch={handleSearch} onReset={handleReset} />

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">Available Programmes</h3>
          <span className="text-sm text-muted-foreground">
            ({filteredOptions.length} {filteredOptions.length === 1 ? 'result' : 'results'})
          </span>
        </div>
      </div>

      {/* Education Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOptions.map((option) => (
          <EnhancedEducationCard
            key={option.id}
            option={option}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredOptions.length === 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-8 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No programmes found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or explore different categories.
            </p>
            <Button variant="outline" onClick={handleReset}>
              Reset Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Funding Information Card */}
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <PoundSterling className="h-5 w-5 text-elec-yellow" />
            UK Education Funding Support
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3 text-amber-400">Government Support</h4>
            <div className="space-y-3 text-sm">
              <div>
                <h5 className="font-medium text-white">Advanced Learner Loan (19+)</h5>
                <p className="text-xs text-muted-foreground mt-1">
                  Available for Level 3-6 qualifications. No upfront fees, only repay when earning £25,000+. 
                  9% of income above threshold.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-white">Student Finance England</h5>
                <p className="text-xs text-muted-foreground mt-1">
                  Tuition fee loans up to £9,250 for degrees. Maintenance loans available based on household income. 
                  Repayment at 9% above £27,295.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-white">Postgraduate Loan</h5>
                <p className="text-xs text-muted-foreground mt-1">
                  Up to £12,167 for Master's study. 6% interest rate. Same repayment terms as undergraduate loans.
                </p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-3 text-amber-400">Industry & Employer Support</h4>
            <div className="space-y-3 text-sm">
              <div>
                <h5 className="font-medium text-white">Apprenticeship Levy</h5>
                <p className="text-xs text-muted-foreground mt-1">
                  Large employers (£3M+ payroll) contribute 0.5% to apprenticeship levy. Can fund degree apprenticeships.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-white">Professional Body Grants</h5>
                <p className="text-xs text-muted-foreground mt-1">
                  IET scholarships (£1,000-£10,000), ECA Educational Trust grants, NECA bursaries for electrical study.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-white">Career Development Loans</h5>
                <p className="text-xs text-muted-foreground mt-1">
                  Bank loans for vocational training. Government pays interest during study and one month after.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-elec-yellow">96%</div>
            <div className="text-sm text-muted-foreground">Electrician Employment Rate</div>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-elec-yellow">£15k+</div>
            <div className="text-sm text-muted-foreground">Average Salary Increase</div>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-elec-yellow">82%</div>
            <div className="text-sm text-muted-foreground">Get Jobs Before Graduating</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ElectricianFurtherEducation;