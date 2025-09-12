import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingDown, ExternalLink } from "lucide-react";
import { ToolItem } from "@/hooks/useToolsData";

interface TopDiscountsSidebarProps {
  tools: ToolItem[];
  className?: string;
}

const TopDiscountsSidebar = ({ tools, className }: TopDiscountsSidebarProps) => {
  // Filter tools on sale and sort by discount percentage
  const discountedTools = tools
    .filter(tool => tool.isOnSale && tool.salePrice && tool.price)
    .map(tool => {
      const originalPrice = parseFloat(tool.price.replace(/[£,]/g, ''));
      const salePrice = parseFloat(tool.salePrice!.replace(/[£,]/g, ''));
      const discountPercent = Math.round(((originalPrice - salePrice) / originalPrice) * 100);
      return { ...tool, discountPercent };
    })
    .filter(tool => tool.discountPercent > 0)
    .sort((a, b) => b.discountPercent - a.discountPercent)
    .slice(0, 5);

  if (discountedTools.length === 0) {
    return null;
  }

  return (
    <Card className={`border-elec-yellow/20 bg-elec-card/50 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingDown className="h-5 w-5 text-elec-yellow" />
          Top 5 Discounts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {discountedTools.map((tool, index) => (
          <div 
            key={tool.id || index}
            className="p-3 bg-elec-gray/30 rounded-lg border border-elec-yellow/10 hover:border-elec-yellow/20 transition-colors"
          >
            <div className="flex items-start gap-2 mb-2">
              <Badge variant="destructive" className="text-xs font-bold">
                -{tool.discountPercent}%
              </Badge>
              <span className="text-xs text-muted-foreground">#{index + 1}</span>
            </div>
            
            <h4 className="text-sm font-medium text-elec-light line-clamp-2 mb-2">
              {tool.name}
            </h4>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-bold text-elec-yellow">{tool.salePrice}</span>
              <span className="text-xs line-through text-muted-foreground">{tool.price}</span>
            </div>
            
            <div className="text-xs text-muted-foreground mb-2">
              {tool.supplier}
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs h-8 border-elec-yellow/30 hover:bg-elec-yellow/10"
              asChild
            >
              <a 
                href={tool.productUrl || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View Deal
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TopDiscountsSidebar;