import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, MapPin, Filter, X } from 'lucide-react';
import { educationCategories, studyModes } from './enhancedEducationData';
import { cn } from '@/lib/utils';

interface EducationSearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  onReset: () => void;
}

export interface SearchFilters {
  searchTerm: string;
  category: string;
  studyMode: string;
  location: string;
  level: string;
  fundingType: string;
  maxCost: string;
}

const EducationSearchForm = ({ onSearch, onReset }: EducationSearchFormProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    category: '',
    studyMode: '',
    location: '',
    level: '',
    fundingType: '',
    maxCost: '',
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleReset = () => {
    const resetFilters: SearchFilters = {
      searchTerm: '',
      category: '',
      studyMode: '',
      location: '',
      level: '',
      fundingType: '',
      maxCost: '',
    };
    setFilters(resetFilters);
    onReset();
  };

  const activeFilterCount = Object.values(filters).filter((value) => value !== '').length;

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <div className="relative">
        {!filters.searchTerm && (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/55 pointer-events-none" />
        )}
        <Input
          placeholder="Search courses, institutions, or qualifications..."
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          className={cn(
            'h-11 text-base touch-manipulation bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 focus:border-yellow-500 focus:ring-yellow-500',
            !filters.searchTerm && 'pl-10'
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Select
          value={filters.category}
          onValueChange={(value) => handleFilterChange('category', value)}
        >
          <SelectTrigger className="h-11 touch-manipulation bg-white/[0.03] border-white/10 text-white">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-elec-gray border-white/10">
            {educationCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.studyMode}
          onValueChange={(value) => handleFilterChange('studyMode', value)}
        >
          <SelectTrigger className="h-11 touch-manipulation bg-white/[0.03] border-white/10 text-white">
            <SelectValue placeholder="Study mode" />
          </SelectTrigger>
          <SelectContent className="bg-elec-gray border-white/10">
            {studyModes.map((mode) => (
              <SelectItem key={mode} value={mode}>
                {mode}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/55" />
          <Input
            placeholder="Location or region"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="h-11 text-base touch-manipulation pl-10 bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 focus:border-yellow-500 focus:ring-yellow-500"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-white/85 hover:text-white hover:bg-white/[0.05] h-9"
        >
          <Filter className="mr-2 h-4 w-4" />
          Advanced filters {showAdvanced ? '▲' : '▼'}
        </Button>

        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
              {activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-white/55 hover:text-white hover:bg-white/[0.05] h-9"
            >
              <X className="h-4 w-4 mr-1" />
              Clear all
            </Button>
          </div>
        )}
      </div>

      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-white/[0.06]">
          <Select
            value={filters.level}
            onValueChange={(value) => handleFilterChange('level', value)}
          >
            <SelectTrigger className="h-11 touch-manipulation bg-white/[0.03] border-white/10 text-white">
              <SelectValue placeholder="Education level" />
            </SelectTrigger>
            <SelectContent className="bg-elec-gray border-white/10">
              <SelectItem value="Level 4">Level 4 (HNC)</SelectItem>
              <SelectItem value="Level 5">Level 5 (HND / Foundation)</SelectItem>
              <SelectItem value="Level 6">Level 6 (Bachelor's)</SelectItem>
              <SelectItem value="Level 7">Level 7 (Master's)</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.fundingType}
            onValueChange={(value) => handleFilterChange('fundingType', value)}
          >
            <SelectTrigger className="h-11 touch-manipulation bg-white/[0.03] border-white/10 text-white">
              <SelectValue placeholder="Funding type" />
            </SelectTrigger>
            <SelectContent className="bg-elec-gray border-white/10">
              <SelectItem value="Student Finance">Student finance</SelectItem>
              <SelectItem value="Advanced Learner Loan">Advanced learner loan</SelectItem>
              <SelectItem value="Employer Sponsorship">Employer sponsorship</SelectItem>
              <SelectItem value="Scholarships">Scholarships</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.maxCost}
            onValueChange={(value) => handleFilterChange('maxCost', value)}
          >
            <SelectTrigger className="h-11 touch-manipulation bg-white/[0.03] border-white/10 text-white">
              <SelectValue placeholder="Maximum cost" />
            </SelectTrigger>
            <SelectContent className="bg-elec-gray border-white/10">
              <SelectItem value="£3000">Under £3,000</SelectItem>
              <SelectItem value="£6000">Under £6,000</SelectItem>
              <SelectItem value="£10000">Under £10,000</SelectItem>
              <SelectItem value="unlimited">Any cost</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default EducationSearchForm;
