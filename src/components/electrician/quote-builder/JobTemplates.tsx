import { Button } from "@/components/ui/button";
import { Clock, Plus, Wrench, Package, Zap, Loader2, Search, X, Check, ChevronRight, Home, Building2, Sun, TestTube, Cable, Plug } from "lucide-react";
import { jobTemplates } from "@/data/jobTemplates";
import { JobTemplate } from "@/types/quote";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface JobTemplatesProps {
  onSelectTemplate: (template: JobTemplate) => void;
}

// Simplified category config with icons
const categoryConfig: Record<string, { icon: typeof Home; color: string }> = {
  'Installation': { icon: Plug, color: 'bg-blue-500' },
  'Upgrade': { icon: Cable, color: 'bg-orange-500' },
  'Rewire': { icon: Wrench, color: 'bg-purple-500' },
  'Testing': { icon: TestTube, color: 'bg-green-500' },
  'Domestic': { icon: Home, color: 'bg-teal-500' },
  'Commercial': { icon: Building2, color: 'bg-indigo-500' },
  'Renewable': { icon: Sun, color: 'bg-emerald-500' },
};

export const JobTemplates = ({ onSelectTemplate }: JobTemplatesProps) => {
  const [loadingTemplate, setLoadingTemplate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { toast } = useToast();

  const categories = ["All", "Installation", "Upgrade", "Rewire", "Testing", "Domestic", "Commercial", "Renewable"];

  const filteredTemplates = useMemo(() => {
    return jobTemplates.filter(template => {
      const matchesSearch = searchQuery === "" ||
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "All" ||
        template.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleTemplateSelect = async (template: JobTemplate) => {
    setLoadingTemplate(template.id);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      onSelectTemplate(template);
      toast({
        title: "Template Applied",
        description: `"${template.name}" added to invoice`,
      });
    } finally {
      setLoadingTemplate(null);
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

  const getTemplateTotal = (template: JobTemplate) => {
    return template.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          <span className="text-[15px] font-semibold text-white">Job Templates</span>
        </div>
        <span className="text-[12px] text-white/50">{filteredTemplates.length} templates</span>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
        <input
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 pl-10 pr-10 rounded-xl bg-white/[0.05] border border-white/[0.06] text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/[0.1]"
          >
            <X className="h-4 w-4 text-white/50" />
          </button>
        )}
      </div>

      {/* Category Pills - Horizontal Scroll */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          const config = categoryConfig[category];
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium transition-all touch-manipulation active:scale-[0.98]',
                isActive
                  ? 'bg-elec-yellow text-black'
                  : 'bg-white/[0.05] text-white/70 border border-white/[0.06]'
              )}
            >
              {config && <config.icon className="h-3.5 w-3.5" />}
              {category}
            </button>
          );
        })}
      </div>

      {/* Templates List */}
      {filteredTemplates.length === 0 ? (
        <div className="text-center py-8">
          <Package className="h-10 w-10 mx-auto mb-3 text-white/30" />
          <p className="text-[14px] text-white/50">No templates found</p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
            className="mt-2 text-[13px] text-elec-yellow"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTemplates.map((template) => {
            const config = categoryConfig[template.category];
            const total = getTemplateTotal(template);
            const isLoading = loadingTemplate === template.id;

            return (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                disabled={isLoading}
                className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-all touch-manipulation active:scale-[0.99] disabled:opacity-50 text-left"
              >
                <div className="flex items-start gap-3">
                  {/* Category Icon */}
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                    config?.color || 'bg-white/[0.1]'
                  )}>
                    {config ? <config.icon className="h-5 w-5 text-white" /> : <Package className="h-5 w-5 text-white" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-white truncate">{template.name}</p>
                        <p className="text-[12px] text-white/50 line-clamp-1 mt-0.5">{template.description}</p>
                      </div>
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 text-elec-yellow animate-spin flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-white/30 flex-shrink-0" />
                      )}
                    </div>

                    {/* Meta Row */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 text-[11px] text-white/40">
                        <Clock className="h-3 w-3" />
                        <span>{template.estimatedHours}h</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-white/40">
                        <Package className="h-3 w-3" />
                        <span>{template.items.length} items</span>
                      </div>
                      <span className="ml-auto text-[13px] font-semibold text-elec-yellow">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
