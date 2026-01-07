import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  X,
  Package,
} from "lucide-react";
import { getMaterialCategoryStyle } from "./materialCategoryStyleUtils";

interface PremiumMaterialPageHeaderProps {
  categoryId: string;
  categoryName: string;
  materialCount: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterToggle: () => void;
  activeFiltersCount?: number;
}

const PremiumMaterialPageHeader = ({
  categoryId,
  categoryName,
  materialCount,
  searchTerm,
  onSearchChange,
  onFilterToggle,
  activeFiltersCount = 0,
}: PremiumMaterialPageHeaderProps) => {
  const style = getMaterialCategoryStyle(categoryId);
  const CategoryIcon = style.icon;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Navigation + Category Info */}
        <div className="flex items-center justify-between h-16 sm:h-[72px] gap-4">
          {/* Left: Back + Category */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <Link to="/electrician/materials">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 shrink-0"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>

            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`p-2 sm:p-2.5 rounded-xl ${style.iconBg} border shrink-0`}
              >
                <CategoryIcon className={`h-5 w-5 sm:h-6 sm:w-6 ${style.textColor}`} />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-white truncate">
                  {categoryName}
                </h1>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`${style.iconBg} ${style.textColor} border-transparent text-xs`}
                  >
                    <Package className="h-3 w-3 mr-1" />
                    {materialCount} materials
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Filter Button (Desktop) */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onFilterToggle}
              className="h-10 px-4 rounded-xl bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center bg-primary text-primary-foreground text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Bottom Row: Search Bar */}
        <div className="pb-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder={`Search ${categoryName.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-12 sm:h-14 pl-12 pr-12 text-base sm:text-lg
                         bg-white/5 border-white/10 rounded-xl
                         focus:border-primary/40 focus:ring-2 focus:ring-primary/20
                         placeholder:text-white/40"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg
                           bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="h-4 w-4 text-white/60" />
              </button>
            )}
          </div>

          {/* Filter Button (Mobile) */}
          <Button
            variant="outline"
            size="icon"
            onClick={onFilterToggle}
            className="sm:hidden h-12 w-12 rounded-xl bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 shrink-0 relative"
          >
            <SlidersHorizontal className="h-5 w-5" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default PremiumMaterialPageHeader;
