import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Package, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MaterialItem {
  item: string;
  leadTime: string;
  supplier?: string;
  cost?: number;
  criticalPath?: boolean;
}

interface MaterialProcurementCardProps {
  materialProcurement: {
    orderNow?: MaterialItem[];
    orderWeek1?: MaterialItem[];
  };
  materialProgress: Record<string, { ordered: boolean; date?: string }>;
  onToggleMaterial: (id: string, date?: string) => void;
}

const MaterialProcurementCard = ({
  materialProcurement,
  materialProgress,
  onToggleMaterial
}: MaterialProcurementCardProps) => {
  const hasOrderNow = materialProcurement.orderNow && materialProcurement.orderNow.length > 0;
  const hasOrderWeek1 = materialProcurement.orderWeek1 && materialProcurement.orderWeek1.length > 0;

  if (!hasOrderNow && !hasOrderWeek1) return null;

  const renderMaterialList = (items: MaterialItem[], priority: 'high' | 'medium') => (
    <div className="space-y-2">
      {items.map((item, idx) => {
        const itemId = `${priority}-${idx}`;
        const isOrdered = materialProgress[itemId]?.ordered || false;
        
        return (
          <div 
            key={idx}
            className={`p-3 rounded-lg border transition-all ${
              isOrdered 
                ? 'bg-muted/30 border-border/40 opacity-70' 
                : priority === 'high'
                ? 'bg-destructive/5 border-destructive/20'
                : 'bg-warning/5 border-warning/20'
            }`}
          >
            <div className="flex items-start gap-3">
              <Checkbox
                checked={isOrdered}
                onCheckedChange={() => onToggleMaterial(itemId)}
                className="mt-1"
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className={`font-medium text-sm ${isOrdered ? 'line-through text-muted-foreground' : ''}`}>
                      {item.item}
                    </div>
                    {item.supplier && (
                      <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        {item.supplier}
                        {(item.supplier.includes('CEF') || item.supplier.includes('Screwfix') || item.supplier.includes('TLC')) && (
                          <ExternalLink className="h-3 w-3" />
                        )}
                      </div>
                    )}
                  </div>
                  {item.cost && (
                    <div className="text-sm font-semibold text-pink-400">
                      £{item.cost}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      priority === 'high' 
                        ? 'bg-destructive/20 border-destructive/40' 
                        : 'bg-warning/20 border-warning/40'
                    }`}
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {item.leadTime}
                  </Badge>
                  {item.criticalPath && (
                    <Badge variant="outline" className="text-xs bg-pink-400/20 border-pink-400/40">
                      Critical Path
                    </Badge>
                  )}
                  {isOrdered && materialProgress[itemId]?.date && (
                    <Badge variant="outline" className="text-xs bg-success/20 border-success/40">
                      Ordered {materialProgress[itemId].date}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Package className="h-5 w-5 text-pink-400" />
          Material Procurement Tracker
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Track orders and lead times to avoid project delays
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Now Section */}
        {hasOrderNow && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h5 className="font-semibold text-sm flex items-center gap-2">
                🔴 Order Immediately
                <Badge variant="destructive" className="text-xs">High Priority</Badge>
              </h5>
              <div className="text-xs text-muted-foreground">
                {materialProcurement.orderNow!.filter((_, idx) => 
                  materialProgress[`high-${idx}`]?.ordered
                ).length} / {materialProcurement.orderNow!.length} ordered
              </div>
            </div>
            {renderMaterialList(materialProcurement.orderNow!, 'high')}
          </div>
        )}

        {/* Order Week 1 Section */}
        {hasOrderWeek1 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h5 className="font-semibold text-sm flex items-center gap-2">
                📅 Order Week 1
                <Badge variant="outline" className="text-xs bg-warning/20 border-warning/40">
                  Medium Priority
                </Badge>
              </h5>
              <div className="text-xs text-muted-foreground">
                {materialProcurement.orderWeek1!.filter((_, idx) => 
                  materialProgress[`medium-${idx}`]?.ordered
                ).length} / {materialProcurement.orderWeek1!.length} ordered
              </div>
            </div>
            {renderMaterialList(materialProcurement.orderWeek1!, 'medium')}
          </div>
        )}

        {/* Quick Links */}
        <div className="pt-3 border-t border-border/40">
          <div className="text-xs text-muted-foreground mb-2">Quick Supplier Links:</div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" className="text-xs h-8" asChild>
              <a href="https://www.cef.co.uk" target="_blank" rel="noopener noreferrer">
                CEF <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-8" asChild>
              <a href="https://www.screwfix.com" target="_blank" rel="noopener noreferrer">
                Screwfix <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-8" asChild>
              <a href="https://www.tlc-direct.co.uk" target="_blank" rel="noopener noreferrer">
                TLC Direct <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialProcurementCard;
