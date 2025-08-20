import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { ToolCategory } from "@/data/electrician/toolData";
import * as Icons from "lucide-react";

interface ToolCategoryCardProps {
  category: ToolCategory;
  showSearchLink?: boolean;
}

const ToolCategoryCard = ({ category, showSearchLink = false }: ToolCategoryCardProps) => {
  // Get the icon component dynamically
  const IconComponent = (Icons as any)[category.icon] || Icons.Wrench;

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray/50 hover:bg-elec-gray/70 transition-all duration-200 h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-elec-yellow/20 rounded-lg">
              <IconComponent className="h-5 w-5 text-elec-yellow" />
            </div>
            <CardTitle className="text-lg">{category.name}</CardTitle>
          </div>
          <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
            {category.totalCount} tools
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {category.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-elec-dark/30 rounded-lg p-3 text-center">
            <div className="text-elec-yellow font-semibold">{category.essentialCount}</div>
            <div className="text-muted-foreground text-xs">Essential</div>
          </div>
          <div className="bg-elec-dark/30 rounded-lg p-3 text-center">
            <div className="text-elec-yellow font-semibold">
              £{category.priceRange.min}-{category.priceRange.max}
            </div>
            <div className="text-muted-foreground text-xs">Price Range</div>
          </div>
        </div>

        {/* Popular Brands */}
        <div>
          <h4 className="text-sm font-medium mb-2 text-white">Popular Brands:</h4>
          <div className="flex flex-wrap gap-1">
            {category.popularBrands.slice(0, 3).map((brand) => (
              <Badge 
                key={brand} 
                variant="outline" 
                className="text-xs border-elec-yellow/20 text-muted-foreground"
              >
                {brand}
              </Badge>
            ))}
          </div>
        </div>

        {/* Top Tools */}
        <div>
          <h4 className="text-sm font-medium mb-2 text-white">Top Tools:</h4>
          <ul className="space-y-1">
            {category.topTools.slice(0, 3).map((tool) => (
              <li key={tool} className="text-xs text-muted-foreground flex items-center gap-1">
                <Star className="h-3 w-3 text-elec-yellow" />
                {tool}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <Link to={`/electrician/tools/category/${category.id}`} className="block">
            <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Browse {category.name}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          
          {showSearchLink && (
            <Link to={`/electrician/tools/search?category=${category.id}`} className="block">
              <Button variant="outline" size="sm" className="w-full border-elec-yellow/30 hover:bg-elec-yellow/10">
                Search in Category
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCategoryCard;