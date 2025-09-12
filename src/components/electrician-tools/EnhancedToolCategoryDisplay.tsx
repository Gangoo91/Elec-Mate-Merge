import { useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, ArrowLeft, RefreshCw, Loader2 } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import ToolCard from "@/components/electrician-tools/ToolCard";
import DealOfTheDay from "@/components/electrician-tools/DealOfTheDay";
import AlwaysVisibleSearch from "@/components/electrician-tools/AlwaysVisibleSearch";
import QuickFiltersBar from "@/components/electrician-tools/QuickFiltersBar";
import TopDiscountsSidebar from "@/components/electrician-tools/TopDiscountsSidebar";
import MoreToolsSection from "@/components/electrician-tools/MoreToolsSection";
import ToolRefreshButton from "@/components/electrician-tools/ToolRefreshButton";
import { useToolsData, type ToolItem } from "@/hooks/useToolsData";

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  "test-equipment": {
    title: "Test Equipment",
    description: "Multimeters, socket testers, insulation testers and PAT equipment"
  },
  "safety-tools": {
    title: "Safety Tools",
    description: "PPE, safety equipment and protective devices"
  },
  "power-tools": {
    title: "Power Tools",
    description: "Drills, saws, grinders and cordless tool systems"
  },
  "hand-tools": {
    title: "Hand Tools",
    description: "Screwdrivers, pliers, strippers and manual tools"
  },
  "installation-tools": {
    title: "Installation Tools",
    description: "Cable management, conduit, trunking and installation accessories"
  },
  "cable-wiring": {
    title: "Cable & Wiring",
    description: "Cables, wires, cable rods and wiring accessories"
  },
  "electrical-components": {
    title: "Electrical Components",
    description: "Switches, sockets, outlets and electrical fittings"
  },
  "lighting": {
    title: "Lighting",
    description: "LED lights, fittings, downlights and lighting accessories"
  },
  "access-tools": {
    title: "Access Tools & Equipment",
    description: "Ladders, steps, access platforms and safety equipment"
  },
  "tool-storage": {
    title: "Tool Storage",
    description: "Tool bags, cases, vans racking and storage solutions"
  },
  "specialist-tools": {
    title: "Specialist Tools",
    description: "Cable tools, crimpers, benders and specialised equipment"
  }
};

interface EnhancedToolCategoryDisplayProps {
  categoryName: string;
}

const EnhancedToolCategoryDisplay = ({ categoryName }: EnhancedToolCategoryDisplayProps) => {
  const categoryKey = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
  const meta = CATEGORY_META[categoryKey] || { title: categoryName, description: "Browse curated tools by category" };
  
  // Use comprehensive tools data
  const { data: allTools, isLoading, error, refetch } = useToolsData();

  // Filter state for the tools
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<ToolItem[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const isMobile = useIsMobile();
  
  // Comprehensive category mapping function
  const getCategoryMappings = (frontendCategory: string): string[] => {
    const mappings: Record<string, string[]> = {
      'Test Equipment': ['Test Equipment', 'Testing Equipment', 'Test & Measurement', 'Testers'],
      'Safety Tools': ['Safety Tools', 'Safety Equipment', 'PPE', 'Personal Protective Equipment'],
      'Power Tools': ['Power Tools', 'Electric Tools', 'Cordless Tools', 'Battery Tools'],
      'Hand Tools': ['Hand Tools', 'Manual Tools', 'Basic Tools', 'Cable Rods', 'Cable Rod Sets', 'Fish Tape'],
      'Installation Tools': ['Installation Tools', 'Cable Ties', 'Cable Clips', 'Conduit', 'Mini Trunking', 'Trunking', 'Accessories'],
      'Cable & Wiring': ['Cable & Wiring', 'Hook Up Wire', 'Cable', 'Power Cable', 'Control Cable', 'Ethernet Cable', 'Coaxial Cable', 'SWA Cable', 'Fire Alarm Cable'],
      'Electrical Components': ['Electrical Components', 'Switches', 'Sockets', 'Outlets', 'Light Switches', 'Dimmers', 'Electrical Accessories', 'Wiring Accessories', 'Plugs & Sockets', 'Junction Boxes', 'Consumer Units', 'Distribution', 'RCDs', 'MCBs', 'Fuses', 'Isolators'],
      'Lighting': ['Lighting', 'LED Lighting', 'Light Fittings', 'Downlights', 'Emergency Lighting', 'Commercial Lighting', 'Outdoor Lighting'],
      'Access Tools & Equipment': ['Access Tools & Equipment', 'Access Equipment', 'Ladders & Steps', 'Access'],
      'Tool Storage': ['Tool Storage', 'Storage', 'Tool Bags', 'Cases & Bags'],
      'Specialist Tools': ['Specialist Tools', 'Electrical Tools', 'Cable Tools', 'Wiring Tools']
    };
    
    return mappings[frontendCategory] || [frontendCategory];
  };

  // Get keywords for category fallback searches
  const getCategoryKeywords = (category: string): string[] => {
    const keywordMap: Record<string, string[]> = {
      'Test Equipment': ['multimeter', 'tester', 'meter', 'clamp', 'voltage', 'continuity', 'insulation'],
      'Safety Tools': ['helmet', 'gloves', 'glasses', 'boots', 'harness', 'vest', 'safety'],
      'Power Tools': ['drill', 'cordless', '18v', '12v', 'grinder', 'saw', 'impact', 'sds', 'battery'],
      'Hand Tools': ['screwdriver', 'pliers', 'wire stripper', 'cable cutter', 'crimping', 'spanner'],
      'Measuring Tools': ['level', 'tape measure', 'ruler', 'detector', 'spirit level', 'laser'],
      'Cable Tools': ['cable', 'wire', 'stripper', 'cutter', 'puller', 'crimper'],
      'Lighting Tools': ['torch', 'light', 'led', 'inspection', 'headlamp', 'work light']
    };
    
    return keywordMap[category] || [category.toLowerCase()];
  };

  // Filter and search the tools with enhanced filtering logic
  const filteredTools = useMemo(() => {
    if (!allTools) return [];
    
    // Filter by category first with improved matching
    const possibleMatches = getCategoryMappings(categoryName);
    let categoryFiltered = allTools.filter(tool => {
      const toolCategory = tool.category;
      const toolName = tool.name?.toLowerCase() || '';
      const toolDescription = tool.description?.toLowerCase() || '';
      
      // Try exact and partial category matches
      const categoryMatch = possibleMatches.some(match => 
        toolCategory === match || 
        toolCategory?.toLowerCase().includes(match.toLowerCase()) ||
        match.toLowerCase().includes(toolCategory?.toLowerCase() || '')
      );
      
      if (categoryMatch) return true;
      
      // Fallback: search by keywords in name/description for Power Tools
      if (categoryName === 'Power Tools') {
        const powerToolKeywords = ['drill', 'cordless', '18v', '12v', 'angle grinder', 'circular saw', 'impact driver', 'reciprocating saw', 'sds', 'battery'];
        return powerToolKeywords.some(keyword => 
          toolName.includes(keyword) || toolDescription.includes(keyword)
        );
      }
      
      // Fallback: search by keywords for other categories
      const categoryKeywords = getCategoryKeywords(categoryName);
      return categoryKeywords.some(keyword => 
        toolName.includes(keyword) || toolDescription.includes(keyword)
      );
    });
    
    // If no category-specific tools found, show related tools from Hand Tools for Power Tools
    if (categoryFiltered.length === 0 && categoryName === 'Power Tools') {
      categoryFiltered = allTools.filter(tool => {
        const toolName = tool.name?.toLowerCase() || '';
        const relatedKeywords = ['drill', 'driver', 'bit', 'battery', 'charger', 'grinder'];
        return relatedKeywords.some(keyword => toolName.includes(keyword));
      });
    }
    
    // Apply search filter
    if (searchTerm) {
      categoryFiltered = categoryFiltered.filter(tool =>
        tool.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.supplier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.highlights?.some(highlight => 
          typeof highlight === 'string' && highlight.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply quick filters
    if (activeFilters.length > 0) {
      categoryFiltered = categoryFiltered.filter(tool => {
        return activeFilters.every(filter => {
          switch (filter) {
            case "on-sale":
              return tool.isOnSale === true;
            case "in-stock":
              return tool.stockStatus === "In Stock";
            case "next-day":
              return true; // Would need to check shipping info
            case "trade-price":
              return true; // Would need to check trade pricing
            case "high-rated":
              return true; // Would need rating data
            case "screwfix":
              return tool.supplier?.toLowerCase().includes("screwfix");
            case "toolstation":
              return tool.supplier?.toLowerCase().includes("toolstation");
            default:
              return true;
          }
        });
      });
    }
    
    return categoryFiltered;
  }, [allTools, categoryName, searchTerm, activeFilters]);


  const pageTitle = `${meta.title} | ElecMate Professional Tools`;
  const pageDescription = `${meta.title} for UK electricians — ${meta.description}. BS 7671 18th Edition compliant guidance.`.slice(0, 160);

  const handleAddToCompare = (item: ToolItem) => {
    if (selectedItems.length >= 3) return;
    if (!selectedItems.find(selected => selected.id === item.id)) {
      setSelectedItems(prev => [...prev, item]);
    }
  };

  const handleRemoveFromCompare = (itemId: string) => {
    setSelectedItems(prev => prev.filter(item => String(item.id) !== itemId));
  };

  const clearComparison = () => {
    setSelectedItems([]);
  };

  if (error) {
    return (
      <main className="space-y-6 animate-fade-in">
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
        </Helmet>
        
        <div className="text-center space-y-4">
          <p className="text-red-400">Failed to load tools data</p>
          <Button 
            variant="outline" 
            onClick={() => refetch()}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Try Again
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mobile-container mobile-safe-area">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>

      <header className="mobile-section-spacing">
        <div className="flex flex-wrap gap-2 mb-4">
          <Link to="/electrician/tools">
            <Button variant="outline" size="sm" className="touch-target mobile-interactive bg-elec-gray/50 border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10">
              <ArrowLeft className="h-4 w-4" /> Back to Tools
            </Button>
          </Link>
          <ToolRefreshButton
            isFetching={isLoading}
            lastFetchTime={0}
            onRefresh={refetch}
            categoryName={categoryName}
            className="shrink-0 touch-target"
          />
        </div>
        <div className="space-y-3">
          <h1 className="mobile-heading font-bold tracking-tight flex items-center gap-3">
            <Wrench className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-elec-yellow flex-shrink-0" />
            <span className="min-w-0 text-elec-light">{meta.title}</span>
          </h1>
          <p className="mobile-text text-text-muted leading-relaxed pl-9 sm:pl-10 lg:pl-11">{meta.description}</p>
        </div>
      </header>

      {/* Always Visible Search */}
      <section className="mobile-section-spacing">
        <div className="space-y-4">
          <AlwaysVisibleSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search tools, brands, model numbers..."
          />
          <QuickFiltersBar onFiltersChange={setActiveFilters} />
        </div>
      </section>

      {/* Deal of the Day Banner */}
      <section className="mobile-section-spacing">
        <DealOfTheDay />
      </section>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mobile-section-spacing">
        {/* Tools Grid - 3 columns on desktop */}
        <div className="lg:col-span-3">
          {/* Results Summary */}
          {filteredTools.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-elec-gray/50 rounded-lg border border-elec-yellow/20 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Found <strong className="text-elec-yellow">{filteredTools.length} tools</strong>
                  {searchTerm && ` matching "${searchTerm}"`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Sort by:</span>
                <select className="text-xs bg-elec-dark border border-elec-yellow/30 rounded px-2 py-1 text-white">
                  <option>Best Match</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Customer Rating</option>
                  <option>Newest First</option>
                </select>
              </div>
            </div>
          )}

          {/* Tools Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-elec-yellow" />
                <p className="mobile-text text-text-muted">Loading {categoryName.toLowerCase()}...</p>
              </div>
            </div>
          ) : filteredTools.length === 0 ? (
            <div className="text-center space-y-6 py-12">
              <div className="space-y-3">
                <Wrench className="h-12 w-12 mx-auto text-elec-yellow/50" />
                <h3 className="mobile-text font-semibold text-elec-light">No tools found</h3>
                <p className="mobile-small-text text-text-muted max-w-md mx-auto">
                  {searchTerm 
                    ? `No tools match "${searchTerm}" in ${categoryName}`
                    : `No tools available in ${categoryName} category`
                  }
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {searchTerm && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm("")}
                    className="bg-elec-gray/50 border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10"
                  >
                    Clear Search
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => refetch()}
                  disabled={isLoading}
                  className="bg-elec-gray/50 border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  Refresh Tools
                </Button>
              </div>
            </div>
          ) : (
            <div className="mobile-grid-responsive grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredTools.map((tool, index) => (
                <ToolCard
                  key={tool.id || index}
                  item={tool}
                  onAddToCompare={handleAddToCompare}
                  onRemoveFromCompare={handleRemoveFromCompare}
                  isSelected={selectedItems.some(selected => String(selected.id || selected.name) === String(tool.id || tool.name))}
                  isCompareDisabled={selectedItems.length >= 3}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar - Top 5 Discounts */}
        <div className="lg:col-span-1">
          <TopDiscountsSidebar tools={filteredTools} />
        </div>
      </div>

      {/* More Tools Section */}
      <section className="mobile-section-spacing">
        <MoreToolsSection
          selectedItems={selectedItems}
          onRemoveFromCompare={handleRemoveFromCompare}
          onClearComparison={clearComparison}
          categoryName={categoryName}
          tools={filteredTools}
        />
      </section>
    </main>
  );
};

export default EnhancedToolCategoryDisplay;