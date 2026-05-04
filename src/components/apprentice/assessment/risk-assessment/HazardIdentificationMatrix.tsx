import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MobileInput } from '@/components/ui/mobile-input';
import { Search } from 'lucide-react';
import { hazardCategories } from '@/data/hazards';
import { cn } from '@/lib/utils';

interface HazardIdentificationMatrixProps {
  onHazardSelected: (hazard: string) => void;
}

const HazardIdentificationMatrix = ({ onHazardSelected }: HazardIdentificationMatrixProps) => {
  const [customHazard, setCustomHazard] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHazards = hazardCategories
    .map((category) => ({
      ...category,
      hazards: category.hazards.filter((hazard) =>
        hazard.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(
      (category) =>
        category.hazards.length > 0 ||
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleHazardSelect = (hazard: string) => {
    onHazardSelected(hazard);
  };

  const handleCustomHazardSubmit = () => {
    if (customHazard.trim()) {
      onHazardSelected(customHazard.trim());
      setCustomHazard('');
    }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Hazard identification matrix
        </span>
        <h3 className="text-[16px] sm:text-[18px] font-medium text-white">
          Select a hazard or add your own
        </h3>
      </div>

      <div className="relative">
        {!searchTerm && (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/55 pointer-events-none z-10" />
        )}
        <MobileInput
          label=""
          placeholder="Search hazards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={cn(!searchTerm && 'pl-10')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredHazards.map((category) => (
          <div
            key={category.id}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              {category.name}
            </span>
            <div className="space-y-1.5">
              {category.hazards.map((hazard, index) => (
                <button
                  key={index}
                  onClick={() => handleHazardSelect(hazard)}
                  className="w-full text-left p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-all touch-manipulation active:scale-[0.99] min-h-[44px]"
                >
                  <span className="text-[13px] text-white/85 leading-relaxed">{hazard}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Custom hazard
        </span>
        <div className="flex gap-2 items-end">
          <MobileInput
            label=""
            placeholder="Describe a specific hazard not listed above..."
            value={customHazard}
            onChange={(e) => setCustomHazard(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCustomHazardSubmit()}
            className="flex-1"
          />
          <Button
            onClick={handleCustomHazardSubmit}
            disabled={!customHazard.trim()}
            className="h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-30"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HazardIdentificationMatrix;
