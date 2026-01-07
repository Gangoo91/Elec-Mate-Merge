import { Badge } from "@/components/ui/badge";
import { Package, Loader2, ArrowRight } from "lucide-react";
import { getMaterialCategoryStyle } from "./materialCategoryStyleUtils";

export interface MaterialCategory {
  id: string;
  title: string;
  description: string;
  path: string;
  productCount: number;
}

interface PremiumMaterialCategoryCardProps {
  category: MaterialCategory;
  onClick: () => void;
  isLoading?: boolean;
}

const PremiumMaterialCategoryCard = ({
  category,
  onClick,
  isLoading = false,
}: PremiumMaterialCategoryCardProps) => {
  const style = getMaterialCategoryStyle(category.id);
  const Icon = style.icon;

  return (
    <button
      onClick={onClick}
      className={`
        group relative w-full text-left overflow-hidden rounded-2xl
        bg-gradient-to-br ${style.gradientFrom} ${style.gradientTo}
        border ${style.borderColor}
        transition-all duration-500 ease-out
        hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1
        focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background
      `}
    >
      {/* Glow effect on hover */}
      <div
        className={`
          absolute inset-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-500
          ${style.glowColor} blur-xl
        `}
      />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/20 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Content */}
      <div className="relative p-6 space-y-4">
        {/* Icon */}
        <div
          className={`
            inline-flex p-4 rounded-2xl border
            ${style.iconBg}
            group-hover:scale-110 transition-transform duration-300
          `}
        >
          <Icon className={`h-8 w-8 ${style.textColor}`} />
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors">
            {category.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Product Count */}
        <div className="flex items-center justify-between">
          {isLoading ? (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Loading...</span>
            </div>
          ) : category.productCount > 0 ? (
            <Badge
              variant="outline"
              className={`${style.iconBg} ${style.textColor} border-transparent gap-1.5`}
            >
              <Package className="h-3 w-3" />
              {category.productCount} available
            </Badge>
          ) : (
            <span className="text-xs text-muted-foreground italic">
              Data being collected
            </span>
          )}

          {/* Arrow indicator */}
          <div
            className={`
              p-2 rounded-xl bg-white/5 border border-white/10
              group-hover:bg-white/10 group-hover:border-white/20
              transition-all duration-300
              group-hover:translate-x-1
            `}
          >
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 h-1
          bg-gradient-to-r ${style.gradientFrom} via-transparent ${style.gradientTo}
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
        `}
      />
    </button>
  );
};

export default PremiumMaterialCategoryCard;
