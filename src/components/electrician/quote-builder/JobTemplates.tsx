import { Loader2, X } from 'lucide-react';
import { jobTemplates } from '@/data/jobTemplates';
import { JobTemplate } from '@/types/quote';
import { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { inputCn, chipBase, chipOn, chipOff } from '@/components/forms/fieldStyles';

interface JobTemplatesProps {
  onSelectTemplate: (template: JobTemplate) => void;
}

export const JobTemplates = ({ onSelectTemplate }: JobTemplatesProps) => {
  const [loadingTemplate, setLoadingTemplate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { toast } = useToast();

  /*
   * Derived from the data, not hand-listed. The hardcoded list mixed work types
   * (Installation, Upgrade, Rewire, Testing) with sectors (Domestic,
   * Commercial), so a template could only ever appear under one of two axes it
   * legitimately belonged to — filtering by Installation hid every domestic
   * install. Deriving it also means a new category in the data can never go
   * missing from the filter.
   */
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(jobTemplates.map((t) => t.category))).sort()],
    []
  );

  const filteredTemplates = useMemo(() => {
    return jobTemplates.filter((template) => {
      const matchesSearch = searchQuery === '' || template.name.toLowerCase().includes(searchQuery.toLowerCase()) || template.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleTemplateSelect = async (template: JobTemplate) => {
    setLoadingTemplate(template.id);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      onSelectTemplate(template);
      toast({ title: 'Template Applied', description: `"${template.name}" added` });
    } finally {
      setLoadingTemplate(null);
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

  const getTemplateTotal = (template: JobTemplate) =>
    template.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <input
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn(inputCn, "pr-8")}
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 touch-manipulation">
            <X className="h-4 w-4 text-white" />
          </button>
        )}
      </div>

      {/* Category pills — no icons */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-3 px-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              chipBase,
              'shrink-0 px-3.5 text-[12px]',
              selectedCategory === category ? chipOn : chipOff
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Templates grid — 3 col on mobile, clean cards */}
      {filteredTemplates.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-[13px] text-white">No templates found</p>
          <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} className="mt-1 text-[12px] text-elec-yellow touch-manipulation">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {filteredTemplates.map((template) => {
            const total = getTemplateTotal(template);
            const isLoading = loadingTemplate === template.id;

            return (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                disabled={isLoading}
                className="flex min-h-[92px] flex-col justify-between rounded-xl border border-white/[0.08] bg-white/[0.04] p-3 text-left transition-all touch-manipulation active:scale-[0.97] active:bg-white/[0.07] disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 text-elec-yellow animate-spin mx-auto" />
                ) : (
                  <>
                    <p className="text-[13px] font-medium text-white leading-tight line-clamp-2">{template.name}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[11px] text-white">{template.items.length} items</span>
                      <span className="text-[12px] font-bold text-elec-yellow">{formatCurrency(total)}</span>
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
