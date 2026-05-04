import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calculator } from 'lucide-react';
import EducationSearchForm, { SearchFilters } from './education/EducationSearchForm';
import EnhancedEducationCard from './education/EnhancedEducationCard';
import EducationAnalyticsDashboard from './education/EducationAnalyticsDashboard';
import FundingCalculator from './education/FundingCalculator';
import {
  enhancedEducationOptions,
  EnhancedEducationOption,
} from './education/enhancedEducationData';

const EnhancedFurtherEducation = () => {
  const [filteredOptions, setFilteredOptions] =
    useState<EnhancedEducationOption[]>(enhancedEducationOptions);
  const [selectedOption, setSelectedOption] = useState<EnhancedEducationOption | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'details' | 'funding'>('grid');

  const handleSearch = (filters: SearchFilters) => {
    let filtered = enhancedEducationOptions;

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (option) =>
          option.title.toLowerCase().includes(searchLower) ||
          option.institution.toLowerCase().includes(searchLower) ||
          option.description.toLowerCase().includes(searchLower) ||
          option.keyTopics.some((topic) => topic.toLowerCase().includes(searchLower))
      );
    }

    if (filters.category && filters.category !== 'All Categories') {
      filtered = filtered.filter((option) => option.category === filters.category);
    }

    if (filters.studyMode && filters.studyMode !== 'All Study Modes') {
      filtered = filtered.filter((option) => option.studyMode === filters.studyMode);
    }

    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filtered = filtered.filter((option) =>
        option.locations.some((loc) => loc.toLowerCase().includes(locationLower))
      );
    }

    if (filters.level) {
      filtered = filtered.filter((option) => option.level === filters.level);
    }

    if (filters.fundingType) {
      filtered = filtered.filter((option) =>
        option.fundingOptions.some((funding) => funding.includes(filters.fundingType))
      );
    }

    setFilteredOptions(filtered);
  };

  const handleReset = () => {
    setFilteredOptions(enhancedEducationOptions);
  };

  const handleViewDetails = (option: EnhancedEducationOption) => {
    setSelectedOption(option);
    setViewMode('details');
  };

  const handleBackToGrid = () => {
    setSelectedOption(null);
    setViewMode('grid');
  };

  const handleShowFundingCalculator = () => {
    setViewMode('funding');
  };

  if (viewMode === 'funding') {
    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          onClick={handleBackToGrid}
          className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to education options
        </Button>
        <FundingCalculator />
      </div>
    );
  }

  if (viewMode === 'details' && selectedOption) {
    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          onClick={handleBackToGrid}
          className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to education options
        </Button>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            {selectedOption.institution}
          </span>
          <h2 className="text-[20px] font-bold text-white leading-tight">
            {selectedOption.title}
          </h2>
          <p className="text-[14px] text-white/85 leading-relaxed">{selectedOption.description}</p>
          <p className="text-[13px] text-white/55">
            Detailed view continues here with comprehensive information, application forms and
            funding calculators.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Further education
        </span>
        <h2 className="text-[20px] sm:text-[24px] font-bold tracking-tight text-white leading-tight">
          Advance your qualifications
        </h2>
        <p className="text-[14px] text-white/70 leading-relaxed max-w-2xl">
          Educational pathways to advance your career in the electrical industry — from HNC
          certificates to master&apos;s degrees.
        </p>
      </div>

      <EducationAnalyticsDashboard />

      <div className="flex flex-wrap gap-2">
        <Button
          onClick={handleShowFundingCalculator}
          variant="outline"
          className="h-11 border-white/15 text-white hover:bg-white/[0.05] flex items-center gap-2 touch-manipulation"
        >
          <Calculator className="h-4 w-4" />
          Funding calculator
        </Button>
      </div>

      <EducationSearchForm onSearch={handleSearch} onReset={handleReset} />

      <div className="flex items-baseline justify-between">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Available programmes
        </span>
        <span className="text-[12px] text-white/55">
          {filteredOptions.length} {filteredOptions.length === 1 ? 'result' : 'results'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOptions.map((option) => (
          <EnhancedEducationCard
            key={option.id}
            option={option}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {filteredOptions.length === 0 && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 text-center space-y-3">
          <h3 className="text-[16px] font-semibold text-white">No programmes found</h3>
          <p className="text-[14px] text-white/70 leading-relaxed">
            Try adjusting your search criteria or explore different categories.
          </p>
          <Button
            variant="outline"
            onClick={handleReset}
            className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
          >
            Reset filters
          </Button>
        </div>
      )}

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          UK education funding support
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-[13px] text-white">Government support</p>
            <div className="space-y-2">
              <div className="space-y-1">
                <p className="text-[13px] text-white/85">Advanced Learner Loan (19+)</p>
                <p className="text-[12px] text-white/70 leading-relaxed">
                  Available for Level 3-6 qualifications. No upfront fees, only repay when earning
                  £25,000+. 9% of income above threshold.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[13px] text-white/85">Student Finance England</p>
                <p className="text-[12px] text-white/70 leading-relaxed">
                  Tuition fee loans up to £9,250 for degrees. Maintenance loans available based on
                  household income. Repayment at 9% above £27,295.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[13px] text-white/85">Postgraduate Loan</p>
                <p className="text-[12px] text-white/70 leading-relaxed">
                  Up to £12,167 for Master&apos;s study. 6% interest rate. Same repayment terms as
                  undergraduate loans.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[13px] text-white">Industry & employer support</p>
            <div className="space-y-2">
              <div className="space-y-1">
                <p className="text-[13px] text-white/85">Apprenticeship Levy</p>
                <p className="text-[12px] text-white/70 leading-relaxed">
                  Large employers (£3M+ payroll) contribute 0.5% to apprenticeship levy. Can fund
                  degree apprenticeships.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[13px] text-white/85">Professional body grants</p>
                <p className="text-[12px] text-white/70 leading-relaxed">
                  IET scholarships, ECA Educational Trust grants, NECA bursaries for electrical
                  study.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[13px] text-white/85">Career Development Loans</p>
                <p className="text-[12px] text-white/70 leading-relaxed">
                  Bank loans for vocational training. Government pays interest during study and one
                  month after.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedFurtherEducation;
