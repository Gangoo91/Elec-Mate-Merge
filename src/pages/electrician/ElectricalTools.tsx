import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Wrench } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { useToolCategories } from "@/hooks/useToolCategories";
import EnhancedToolCategoryDisplay from "@/components/electrician-tools/EnhancedToolCategoryDisplay";
import BatchToolsRefreshButton from "@/components/electrician-tools/BatchToolsRefreshButton";
import PremiumCategoryCard from "@/components/electrician-tools/PremiumCategoryCard";
import { queryClient } from "@/lib/queryClient";

const ElectricalTools = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const { categories: toolCategories, isLoading } = useToolCategories();
  
  const selectedCategory = searchParams.get('category');
  
  // If a category is selected, show the enhanced category display
  if (selectedCategory) {
    return <EnhancedToolCategoryDisplay categoryName={selectedCategory} />;
  }

  const filteredCategories = toolCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Premium Header */}
      <header className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
              <Wrench className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Professional Tools
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Premium electrical tools from trusted UK suppliers
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <BatchToolsRefreshButton
              onSuccess={() => {
                queryClient.invalidateQueries({ queryKey: ['toolCategories'] });
                queryClient.invalidateQueries({ queryKey: ['toolsData'] });
              }}
            />
            <SmartBackButton />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-lg">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search tool categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 bg-white/5 border-white/10 rounded-xl text-base
                       focus:border-primary/40 focus:ring-2 focus:ring-primary/20
                       placeholder:text-white/40"
          />
        </div>
      </header>

      {/* Premium Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 stagger-enter">
        {filteredCategories.map((category) => (
          <PremiumCategoryCard
            key={category.name}
            category={category}
            onClick={() => navigate(`/electrician/tools?category=${encodeURIComponent(category.name)}`)}
            isLoading={isLoading}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-16">
          <div className="p-4 rounded-full bg-white/5 w-fit mx-auto mb-4">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No categories found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Try adjusting your search terms or browse all available tool categories.
          </p>
        </div>
      )}
    </div>
  );
};

export default ElectricalTools;