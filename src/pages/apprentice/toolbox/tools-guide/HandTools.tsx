
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, SlidersHorizontal, Wrench, Star, Shield, Zap } from "lucide-react";
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

  const quickStats = [
    { label: "Tool Categories", value: "6+", icon: Wrench, color: "text-elec-yellow", bg: "from-elec-yellow/10 to-elec-yellow/5", border: "border-elec-yellow/30" },
    { label: "Price Filters", value: "7", icon: Star, color: "text-blue-400", bg: "from-blue-500/10 to-blue-500/5", border: "border-blue-500/30" },
    { label: "UK Suppliers", value: "5+", icon: Shield, color: "text-green-400", bg: "from-green-500/10 to-green-500/5", border: "border-green-500/30" },
    { label: "Quality Focus", value: "100%", icon: Zap, color: "text-purple-400", bg: "from-purple-500/10 to-purple-500/5", border: "border-purple-500/30" }
  ];

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
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8 pb-20">
      {/* Hero Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <div className="p-3 bg-elec-yellow/20 rounded-2xl mb-4">
          <Wrench className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
          Hand Tools for Electricians
        </h1>
        <p className="text-white/80 max-w-2xl mb-4 text-sm sm:text-base">
          Professional hand tools with UK prices. Everything you need for electrical work from quality suppliers.
        </p>
        <SmartBackButton />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className={`${stat.border} bg-gradient-to-br ${stat.bg}`}>
            <CardContent className="p-4 text-center">
              <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-white/70">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <CardContent className="p-4 space-y-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            <Input
              placeholder="Search hand tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/60 focus:border-elec-yellow/50"
            />
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
                    : 'border-white/30 text-white hover:bg-white/10'
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
                className="text-white/80 hover:text-white hover:bg-white/10"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {showAdvanced ? 'Hide' : 'Show'} Advanced
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="animate-pulse text-white/60">Loading tools...</div>
        </div>
      ) : handTools.length === 0 ? (
        <Card className="border-white/10 bg-white/5">
          <CardContent className="text-center py-16">
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
          </CardContent>
        </Card>
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
  );
};

export default HandTools;
