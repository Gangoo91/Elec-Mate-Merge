
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal } from "lucide-react";
import { useToolsData } from "@/hooks/useToolsData";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import ToolsFeaturedCarousel from "@/components/electrician-tools/ToolsFeaturedCarousel";
import ToolsGrid from "@/components/electrician-tools/ToolsGrid";
import EssentialToolsQuickRef from "@/components/electrician-tools/EssentialToolsQuickRef";
import SimpleJobKits from "@/components/electrician-tools/SimpleJobKits";
import ToolComparison from "@/components/electrician-tools/ToolComparison";
import ProfessionalTips from "@/components/electrician-tools/ProfessionalTips";
import QuickToolFinder from "@/components/electrician-tools/QuickToolFinder";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const HandTools = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { data: tools = [], isLoading } = useToolsData();

  // Quick filter options
  const quickFilters = [
    { id: "all", label: "All Tools" },
    { id: "essential", label: "Essential Only" },
    { id: "under20", label: "Under £20" },
    { id: "under50", label: "Under £50" },
    { id: "testing", label: "Testing Tools" },
    { id: "cutting", label: "Cutting Tools" },
    { id: "instock", label: "In Stock" }
  ];

  // Filter tools for hand tools and apply search + quick filters
  const handTools = tools.filter(tool => {
    const isHandTool = tool.category?.toLowerCase().includes('hand') || 
                     tool.name.toLowerCase().includes('screwdriver') ||
                     tool.name.toLowerCase().includes('pliers') ||
                     tool.name.toLowerCase().includes('spanner') ||
                     tool.name.toLowerCase().includes('wrench') ||
                     tool.name.toLowerCase().includes('cutter') ||
                     tool.name.toLowerCase().includes('stripper');
    
    const matchesSearch = !searchTerm || 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.supplier?.toLowerCase().includes(searchTerm.toLowerCase());

    // Apply quick filters
    let matchesFilter = true;
    if (selectedFilter === "essential") {
      matchesFilter = tool.name.toLowerCase().includes('screwdriver') ||
                     tool.name.toLowerCase().includes('tester') ||
                     tool.name.toLowerCase().includes('stripper') ||
                     tool.name.toLowerCase().includes('cutter');
    } else if (selectedFilter === "under20") {
      const price = parseFloat((tool.salePrice || tool.price).replace(/[£,]/g, ''));
      matchesFilter = price < 20;
    } else if (selectedFilter === "under50") {
      const price = parseFloat((tool.salePrice || tool.price).replace(/[£,]/g, ''));
      matchesFilter = price < 50;
    } else if (selectedFilter === "testing") {
      matchesFilter = tool.name.toLowerCase().includes('tester') ||
                     tool.name.toLowerCase().includes('meter');
    } else if (selectedFilter === "cutting") {
      matchesFilter = tool.name.toLowerCase().includes('cutter') ||
                     tool.name.toLowerCase().includes('stripper');
    } else if (selectedFilter === "instock") {
      matchesFilter = tool.stockStatus === "In Stock";
    }
    
    return isHandTool && matchesSearch && matchesFilter;
  });

  // Get featured tools (first 6 for carousel)
  const featuredTools = handTools.slice(0, 6);
  const featuredToolIds = featuredTools.map(tool => tool.id || 0);
  
  // Get remaining tools for grid
  const gridTools = handTools.slice(6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 animate-fade-in max-w-6xl">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-elec-dark/95 backdrop-blur-sm pb-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <SmartBackButton />
            
            <div className="relative w-full sm:flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
              <Input
                placeholder="Search hand tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-elec-gray/50 border-elec-yellow/30 text-white placeholder:text-white/60 focus:border-elec-yellow/50"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            {quickFilters.map((filter) => (
              <Badge
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                className={`cursor-pointer transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90'
                    : 'border-elec-yellow/30 text-white hover:bg-elec-yellow/10'
                }`}
                onClick={() => setSelectedFilter(filter.id)}
              >
                {filter.label}
              </Badge>
            ))}
          </div>

          {/* Results count */}
          {!isLoading && handTools.length > 0 && (
            <div className="flex items-center justify-between text-sm text-white/80">
              <span>{handTools.length} tools found</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-white/80 hover:text-white"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {showAdvanced ? 'Hide' : 'Show'} Advanced
              </Button>
            </div>
          )}
        </div>

        {/* Page Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Hand Tools for Electricians</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Professional hand tools with UK prices. Everything you need for electrical work.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-pulse text-white/60">Loading tools...</div>
          </div>
        ) : handTools.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-elec-yellow/10 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-elec-yellow" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No Hand Tools Found</h3>
            <p className="text-white/80">Try adjusting your filters or search terms.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedFilter("all");
              }}
              className="mt-4 border-elec-yellow/30 text-white hover:bg-elec-yellow/10"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Essential Tools Quick Reference */}
            <EssentialToolsQuickRef />

            {/* Simple Job Kits */}
            <SimpleJobKits />

            {/* Advanced Tools Section (Collapsible) */}
            <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
              <CollapsibleContent className="space-y-6">
                {/* Quick Tool Finder */}
                <QuickToolFinder />
                
                {/* Tool Comparison */}
                <ToolComparison tools={handTools} />
                
                {/* Professional Tips */}
                <ProfessionalTips />
              </CollapsibleContent>
            </Collapsible>
            
            {/* Featured Carousel */}
            {featuredTools.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent flex-1" />
                  <h3 className="text-xl font-semibold text-white px-4">
                    Featured Hand Tools
                  </h3>
                  <div className="h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent flex-1" />
                </div>
                <ToolsFeaturedCarousel />
              </div>
            )}

            {/* All Tools Grid */}
            {gridTools.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent flex-1" />
                  <h3 className="text-xl font-semibold text-white px-4">
                    Browse All Hand Tools
                  </h3>
                  <div className="h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent flex-1" />
                </div>
                <ToolsGrid 
                  tools={gridTools}
                  excludeIds={featuredToolIds}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HandTools;
