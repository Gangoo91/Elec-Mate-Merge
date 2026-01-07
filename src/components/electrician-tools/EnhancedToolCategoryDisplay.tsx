import { useMemo, useState } from "react";
import { Helmet } from "react-helmet";

import { useToolsData, type ToolItem } from "@/hooks/useToolsData";

// New premium components
import PremiumToolPageHeader from "./PremiumToolPageHeader";
import SlideOutFilters, { type FilterState } from "./SlideOutFilters";
import CategoryToolsCarousel from "./CategoryToolsCarousel";
import EnhancedProductGrid from "./EnhancedProductGrid";
import InlineCompareSection from "./InlineCompareSection";
import InlineAIInsightsSection from "./InlineAIInsightsSection";
import ProfessionalTips from "./ProfessionalTips";

// Category metadata
const CATEGORY_META: Record<string, { title: string; description: string }> = {
  "test-equipment": {
    title: "Test Equipment",
    description: "Multimeters, socket testers, insulation testers and PAT equipment",
  },
  "safety-tools": {
    title: "Safety Tools",
    description: "PPE, safety equipment and protective devices",
  },
  "power-tools": {
    title: "Power Tools",
    description: "Drills, saws, grinders and cordless tool systems",
  },
  "hand-tools": {
    title: "Hand Tools",
    description: "Screwdrivers, pliers, strippers and manual tools",
  },
  "installation-tools": {
    title: "Installation Tools",
    description: "Cable management, conduit, trunking and installation accessories",
  },
  "cable-wiring": {
    title: "Cable & Wiring",
    description: "Cables, wires, cable rods and wiring accessories",
  },
  "electrical-components": {
    title: "Electrical Components",
    description: "Switches, sockets, outlets and electrical fittings",
  },
  lighting: {
    title: "Lighting",
    description: "LED lights, fittings, downlights and lighting accessories",
  },
  "access-tools": {
    title: "Access Tools & Equipment",
    description: "Ladders, steps, access platforms and safety equipment",
  },
  "tool-storage": {
    title: "Tool Storage",
    description: "Tool bags, cases, vans racking and storage solutions",
  },
  "specialist-tools": {
    title: "Specialist Tools",
    description: "Cable tools, crimpers, benders and specialised equipment",
  },
};

interface EnhancedToolCategoryDisplayProps {
  categoryName: string;
}

const EnhancedToolCategoryDisplay = ({
  categoryName,
}: EnhancedToolCategoryDisplayProps) => {
  // Get category metadata
  const categoryKey = categoryName.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "");
  const meta = CATEGORY_META[categoryKey] || {
    title: categoryName,
    description: "Browse curated tools by category",
  };

  // Fetch tools data
  const { data: allTools, isLoading } = useToolsData();

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    priceRanges: [],
    availability: [],
    suppliers: [],
  });
  const [selectedItems, setSelectedItems] = useState<ToolItem[]>([]);

  // Category mapping for filtering
  const getCategoryMappings = (frontendCategory: string): string[] => {
    const mappings: Record<string, string[]> = {
      "Test Equipment": ["Test Equipment", "Testing Equipment", "Test & Measurement", "Testers"],
      "Safety Tools": ["Safety Tools", "Safety Equipment", "PPE", "Personal Protective Equipment"],
      "Power Tools": ["Power Tools", "Electric Tools", "Cordless Tools", "Battery Tools"],
      "Hand Tools": ["Hand Tools", "Manual Tools", "Basic Tools", "Cable Rods", "Cable Rod Sets"],
      "Installation Tools": ["Installation Tools", "Cable Ties", "Cable Clips", "Conduit", "Trunking"],
      "Cable & Wiring": ["Cable & Wiring", "Hook Up Wire", "Cable", "Power Cable", "Control Cable"],
      "Electrical Components": ["Electrical Components", "Switches", "Sockets", "Outlets", "Consumer Units"],
      Lighting: ["Lighting", "LED Lighting", "Light Fittings", "Downlights", "Emergency Lighting"],
      "Access Tools & Equipment": ["Access Tools & Equipment", "Access Equipment", "Ladders & Steps"],
      "Tool Storage": ["Tool Storage", "Storage", "Tool Bags", "Cases & Bags"],
      "Specialist Tools": ["Specialist Tools", "Electrical Tools", "Cable Tools", "Wiring Tools"],
    };
    return mappings[frontendCategory] || [frontendCategory];
  };

  // Filter tools by category
  const categoryTools = useMemo(() => {
    if (!allTools) return [];
    const validCategories = getCategoryMappings(categoryName);
    return allTools.filter((tool) => validCategories.includes(tool.category));
  }, [allTools, categoryName]);

  // Apply search and filters
  const filteredTools = useMemo(() => {
    let result = categoryTools;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (tool) =>
          tool.name?.toLowerCase().includes(term) ||
          tool.supplier?.toLowerCase().includes(term) ||
          tool.brand?.toLowerCase().includes(term)
      );
    }

    // Brand filter
    if (filters.brands.length > 0) {
      result = result.filter((tool) => {
        const brand = tool.brand || tool.name?.split(" ")[0];
        return filters.brands.includes(brand);
      });
    }

    // Price range filter
    if (filters.priceRanges.length > 0) {
      result = result.filter((tool) => {
        const priceMatch = tool.price?.match(/£([\d,]+\.?\d*)/);
        if (!priceMatch) return false;
        const price = parseFloat(priceMatch[1].replace(",", ""));

        return filters.priceRanges.some((range) => {
          switch (range) {
            case "Under £25": return price < 25;
            case "£25 - £50": return price >= 25 && price <= 50;
            case "£50 - £100": return price >= 50 && price <= 100;
            case "£100 - £250": return price >= 100 && price <= 250;
            case "£250 - £500": return price >= 250 && price <= 500;
            case "Over £500": return price > 500;
            default: return false;
          }
        });
      });
    }

    // Availability filter
    if (filters.availability.length > 0) {
      result = result.filter(
        (tool) => tool.stockStatus && filters.availability.includes(tool.stockStatus)
      );
    }

    // Supplier filter
    if (filters.suppliers.length > 0) {
      result = result.filter(
        (tool) => tool.supplier && filters.suppliers.includes(tool.supplier)
      );
    }

    return result;
  }, [categoryTools, searchTerm, filters]);

  // Compare handlers
  const handleAddToCompare = (item: ToolItem) => {
    if (selectedItems.length >= 3) return;
    if (!selectedItems.find((s) => s.id === item.id)) {
      setSelectedItems((prev) => [...prev, item]);
    }
  };

  const handleRemoveFromCompare = (itemId: string) => {
    setSelectedItems((prev) => prev.filter((item) => String(item.id) !== itemId));
  };

  const clearComparison = () => {
    setSelectedItems([]);
  };

  // Active filters count
  const activeFiltersCount =
    filters.brands.length +
    filters.priceRanges.length +
    filters.availability.length +
    filters.suppliers.length;

  // SEO metadata
  const pageTitle = `${meta.title} | ElecMate Professional Tools`;
  const pageDescription = `${meta.title} for UK electricians — ${meta.description}. BS 7671 18th Edition compliant.`;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      {/* Premium Sticky Header with Search */}
      <PremiumToolPageHeader
        categoryName={categoryName}
        toolCount={filteredTools.length}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterToggle={() => setFiltersOpen(true)}
        activeFiltersCount={activeFiltersCount}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
        {/* Featured Carousel */}
        {categoryTools.length > 0 && (
          <CategoryToolsCarousel
            tools={categoryTools}
            categoryName={categoryName}
          />
        )}

        {/* Product Grid */}
        <section>
          <EnhancedProductGrid
            tools={filteredTools}
            searchTerm={searchTerm}
            filters={filters}
            isLoading={isLoading}
            onAddToCompare={handleAddToCompare}
            onRemoveFromCompare={handleRemoveFromCompare}
            selectedItems={selectedItems}
            isCompareDisabled={selectedItems.length >= 3}
          />
        </section>

        {/* Inline Compare Section */}
        {selectedItems.length > 0 && (
          <InlineCompareSection
            items={selectedItems}
            onRemoveItem={handleRemoveFromCompare}
            onClearAll={clearComparison}
          />
        )}

        {/* AI Insights Section */}
        <InlineAIInsightsSection
          tools={categoryTools}
          categoryName={categoryName}
        />

        {/* Professional Tips */}
        <ProfessionalTips />
      </main>

      {/* Slide-out Filter Panel */}
      <SlideOutFilters
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        tools={categoryTools}
      />
    </div>
  );
};

export default EnhancedToolCategoryDisplay;
