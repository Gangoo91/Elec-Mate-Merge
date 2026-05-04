import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { openExternalUrl } from '@/utils/open-external-url';
import AccreditationSearchForm, {
  AccreditationSearchFilters,
} from './accreditation/AccreditationSearchForm';
import AccreditationCard from './accreditation/AccreditationCard';
import AccreditationDetailView from './accreditation/AccreditationDetailView';
import AccreditationAnalytics from './accreditation/AccreditationAnalytics';
import {
  enhancedAccreditationOptions,
  AccreditationOption,
} from './accreditation/enhancedAccreditationData';

const EnhancedProfessionalAccreditation = () => {
  const [filteredOptions, setFilteredOptions] = useState<AccreditationOption[]>(
    enhancedAccreditationOptions
  );
  const [selectedAccreditation, setSelectedAccreditation] = useState<AccreditationOption | null>(
    null
  );
  const [viewMode, setViewMode] = useState<'grid' | 'details'>('grid');

  const handleSearch = (filters: AccreditationSearchFilters) => {
    let filtered = enhancedAccreditationOptions;

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (option) =>
          option.title.toLowerCase().includes(searchLower) ||
          option.provider.toLowerCase().includes(searchLower) ||
          option.description.toLowerCase().includes(searchLower) ||
          option.benefits.some((benefit) => benefit.toLowerCase().includes(searchLower)) ||
          option.category.toLowerCase().includes(searchLower)
      );
    }

    if (filters.category && filters.category !== 'All Categories') {
      filtered = filtered.filter((option) => option.category === filters.category);
    }

    if (filters.level && filters.level !== 'All Levels') {
      filtered = filtered.filter((option) => option.level === filters.level);
    }

    if (filters.onlineOnly) {
      filtered = filtered.filter((option) => option.onlineAvailable);
    }

    if (filters.maxCost && filters.maxCost !== 'All Costs') {
      filtered = filtered.filter((option) => {
        const costStr = option.cost.toLowerCase();
        switch (filters.maxCost) {
          case 'Under £200':
            return (
              costStr.includes('£150') || costStr.includes('£100') || costStr.includes('under')
            );
          case '£200-£500':
            return (
              costStr.includes('£200') ||
              costStr.includes('£300') ||
              costStr.includes('£400') ||
              costStr.includes('£250')
            );
          case '£500-£1000':
            return (
              costStr.includes('£500') ||
              costStr.includes('£600') ||
              costStr.includes('£700') ||
              costStr.includes('£800') ||
              costStr.includes('£900')
            );
          case 'Over £1000':
            return (
              costStr.includes('£1000') ||
              costStr.includes('£1200') ||
              costStr.includes('over £1000')
            );
          default:
            return true;
        }
      });
    }

    if (filters.provider && filters.provider !== 'All Providers') {
      filtered = filtered.filter(
        (option) =>
          option.accreditationBody === filters.provider ||
          option.provider.includes(filters.provider)
      );
    }

    setFilteredOptions(filtered);
  };

  const handleReset = () => {
    setFilteredOptions(enhancedAccreditationOptions);
  };

  const handleViewDetails = (accreditation: AccreditationOption) => {
    setSelectedAccreditation(accreditation);
    setViewMode('details');
  };

  const handleBackToGrid = () => {
    setSelectedAccreditation(null);
    setViewMode('grid');
  };

  if (viewMode === 'details' && selectedAccreditation) {
    return (
      <AccreditationDetailView accreditation={selectedAccreditation} onBack={handleBackToGrid} />
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Professional accreditation
        </span>
        <h2 className="text-[20px] sm:text-[24px] font-bold tracking-tight text-white leading-tight">
          Professional accreditations
        </h2>
        <p className="text-[14px] text-white/70 leading-relaxed max-w-2xl">
          Recognised professional accreditations to enhance your standing and open new
          opportunities — from industry memberships to specialist certifications.
        </p>
      </div>

      <AccreditationAnalytics />

      <AccreditationSearchForm
        onSearch={handleSearch}
        onReset={handleReset}
        resultsCount={filteredOptions.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Why get accredited?
          </span>
          <ul className="space-y-2">
            {[
              {
                title: 'Professional recognition',
                body: 'Demonstrate your expertise and commitment to industry standards.',
              },
              {
                title: 'Career advancement',
                body: 'Access higher-level positions and increased earning potential.',
              },
              {
                title: 'Continuous learning',
                body: 'Stay current with evolving technologies and regulations.',
              },
              {
                title: 'Network access',
                body: 'Connect with industry professionals and exclusive opportunities.',
              },
            ].map((item) => (
              <li key={item.title} className="space-y-0.5">
                <p className="text-[13px] text-white">{item.title}</p>
                <p className="text-[12px] text-white/70 leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Getting started
          </span>
          <ul className="space-y-2">
            {[
              {
                title: 'Assess your goals',
                body: 'Consider your career objectives and specialisation interests.',
              },
              {
                title: 'Check requirements',
                body: 'Ensure you meet the prerequisites for your chosen accreditation.',
              },
              {
                title: 'Plan your investment',
                body: 'Budget for training costs and ongoing renewal fees.',
              },
              {
                title: 'Start early',
                body: 'Many accreditations require time to complete and demonstrate competence.',
              },
            ].map((item) => (
              <li key={item.title} className="space-y-0.5">
                <p className="text-[13px] text-white">{item.title}</p>
                <p className="text-[12px] text-white/70 leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Available accreditations
        </span>
        <span className="text-[12px] text-white/55">
          {filteredOptions.length} {filteredOptions.length === 1 ? 'option' : 'options'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOptions.map((accreditation) => (
          <AccreditationCard
            key={accreditation.id}
            accreditation={accreditation}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {filteredOptions.length === 0 && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 text-center space-y-3">
          <h3 className="text-[16px] font-semibold text-white">No accreditations found</h3>
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
          Professional development resources
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-[13px] text-white">Industry bodies</p>
            {[
              { name: 'Institution of Engineering and Technology (IET)', url: 'https://www.theiet.org' },
              { name: "Electrical Contractors' Association (ECA)", url: 'https://www.eca.co.uk' },
              { name: 'NICEIC', url: 'https://www.niceic.com' },
            ].map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => openExternalUrl(item.url)}
                className="w-full flex items-center justify-between gap-2 text-left text-[13px] text-white/85 hover:text-white touch-manipulation min-h-[44px] py-1"
              >
                <span>{item.name}</span>
                <ExternalLink className="h-3.5 w-3.5 text-white/40" />
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-[13px] text-white">Training providers</p>
            {[
              { name: 'CITB Construction Training', url: 'https://www.citb.co.uk' },
              { name: 'IOSH Training Network', url: 'https://www.iosh.com' },
            ].map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => openExternalUrl(item.url)}
                className="w-full flex items-center justify-between gap-2 text-left text-[13px] text-white/85 hover:text-white touch-manipulation min-h-[44px] py-1"
              >
                <span>{item.name}</span>
                <ExternalLink className="h-3.5 w-3.5 text-white/40" />
              </button>
            ))}
            <div className="flex items-center justify-between gap-2 text-[13px] text-white/55 py-1">
              <span>Local training centres</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProfessionalAccreditation;
