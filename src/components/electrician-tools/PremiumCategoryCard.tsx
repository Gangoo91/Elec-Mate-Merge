import { Package, TrendingUp, Store, ArrowRight, Loader2 } from "lucide-react";
import { getCategoryStyle } from "./categoryStyleUtils";

interface ToolCategory {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
  priceRange?: string;
}

interface PremiumCategoryCardProps {
  category: ToolCategory;
  onClick: () => void;
  isLoading?: boolean;
}

const PremiumCategoryCard = ({ category, onClick, isLoading = false }: PremiumCategoryCardProps) => {
  const style = getCategoryStyle(category.name);
  const IconComponent = style.icon;
  const isTrending = category.count > 20;
  const hasData = category.count > 0;

  return (
    <div
      onClick={onClick}
      className={`category-card-premium ${style.colorClass} ${style.borderHover} group min-h-[280px] sm:min-h-[300px] flex flex-col`}
    >
      {/* Decorative Glow Blob */}
      <div
        className={`category-glow ${style.glowColor} w-32 h-32 sm:w-40 sm:h-40 -top-16 -right-16 sm:-top-20 sm:-right-20`}
      />

      {/* Secondary Glow */}
      <div
        className={`category-glow ${style.glowColor} w-24 h-24 sm:w-32 sm:h-32 -bottom-12 -left-12 sm:-bottom-16 sm:-left-16 opacity-20`}
      />

      {/* Main Content */}
      <div className="relative z-10 p-5 sm:p-6 flex flex-col h-full">
        {/* Header: Icon + Category Name */}
        <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
          <div className={`category-icon-container ${style.iconBg} border`}>
            <IconComponent className="icon-float-on-hover h-8 w-8 sm:h-10 sm:w-10 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight mb-1">
              {category.name}
            </h3>
            {isTrending && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-400">
                <TrendingUp className="h-3 w-3" />
                Trending
              </span>
            )}
          </div>
        </div>

        {/* 2x2 Metrics Grid */}
        <div className="metrics-grid mb-4 sm:mb-5">
          {/* Tool Count */}
          <div className="metric-box">
            <Package className="h-4 w-4 text-primary shrink-0" />
            <div className="min-w-0">
              <span className="text-xs text-white/60 block">Tools</span>
              {isLoading ? (
                <Loader2 className="h-3 w-3 animate-spin text-primary" />
              ) : (
                <span className="text-sm font-semibold text-white">
                  {hasData ? category.count : "—"}
                </span>
              )}
            </div>
          </div>

          {/* Price Range */}
          <div className="metric-box">
            <span className="text-primary font-bold text-sm shrink-0">£</span>
            <div className="min-w-0">
              <span className="text-xs text-white/60 block">Price Range</span>
              <span className="text-sm font-semibold text-white truncate block">
                {category.priceRange || "Various"}
              </span>
            </div>
          </div>

          {/* Suppliers */}
          <div className="metric-box">
            <Store className="h-4 w-4 text-primary shrink-0" />
            <div className="min-w-0">
              <span className="text-xs text-white/60 block">Suppliers</span>
              <span className="text-sm font-semibold text-white">4+</span>
            </div>
          </div>

          {/* Stock/Status */}
          <div className={`metric-box ${hasData ? "metric-box-highlight" : ""}`}>
            {hasData ? (
              <>
                <div className="h-2 w-2 rounded-full bg-green-500 shrink-0 animate-pulse" />
                <div className="min-w-0">
                  <span className="text-xs text-white/60 block">Status</span>
                  <span className="text-sm font-semibold text-green-400">In Stock</span>
                </div>
              </>
            ) : (
              <>
                <Loader2 className="h-4 w-4 text-white/40 animate-spin shrink-0" />
                <div className="min-w-0">
                  <span className="text-xs text-white/60 block">Status</span>
                  <span className="text-sm font-medium text-white/40">Loading</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Description - Progressive Disclosure */}
        <p className="reveal-on-hover text-sm text-white/70 leading-relaxed line-clamp-2 mb-4">
          {category.description}
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer: Browse Arrow */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <span className="text-sm text-white/60 group-hover:text-white transition-colors">
            Browse {category.count > 0 ? `${category.count} tools` : "category"}
          </span>
          <ArrowRight className="arrow-reveal h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default PremiumCategoryCard;
