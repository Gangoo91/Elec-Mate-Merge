import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ExternalLink, TrendingDown, Star } from "lucide-react";

interface MaterialDeal {
  id: string | number;
  name: string;
  category: string;
  price: string;
  salePrice?: string;
  supplier: string;
  image: string;
  discount?: number;
  isOnSale?: boolean;
  stockStatus?: string;
  productUrl?: string;
}

interface MaterialTopDiscountsProps {
  deals: MaterialDeal[];
}

const MaterialTopDiscounts = ({ deals }: MaterialTopDiscountsProps) => {
  if (!deals || deals.length === 0) return null;

  const getProductUrl = (deal: MaterialDeal) => {
    if (deal.productUrl) return deal.productUrl;
    
    // Fallback search URLs
    const supplier = (deal.supplier || "").toLowerCase();
    const term = encodeURIComponent(deal.name);
    
    if (supplier.includes("screwfix")) return `https://www.screwfix.com/search?search=${term}`;
    if (supplier.includes("city")) return `https://www.cef.co.uk/search?q=${term}`;
    if (supplier.includes("electricaldirect")) return `https://www.electricaldirect.co.uk/search?query=${term}`;
    if (supplier.includes("toolstation")) return `https://www.toolstation.com/search?q=${term}`;
    
    return "#";
  };

  return (
    <section className="p-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TrendingDown className="h-5 w-5 text-elec-yellow" />
          <h2 className="text-xl font-semibold text-elec-light">
            Top Discounts
          </h2>
        </div>
        <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs">
          Save up to {deals[0]?.discount}%
        </Badge>
      </div>

      {/* Carousel */}
      <Carousel className="w-full overflow-visible">
        <CarouselContent className="-ml-2 md:-ml-4 overflow-visible">
          {deals.map((deal, index) => (
            <CarouselItem key={deal.id} className="p-2 basis-[200px] md:basis-[220px]">
              <Card className="h-full bg-transparent bg-gradient-to-br from-white/10 via-white/5 to-transparent border-white/10 hover:border-elec-yellow/30 hover:shadow-lg hover:shadow-elec-yellow/5 hover:scale-[1.02] transition-all duration-300 rounded-lg group">
                {/* Compact Image section */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="h-32 overflow-hidden">
                    <img
                      src={deal.image || '/placeholder.svg'}
                      alt={deal.name}
                      className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  
                  {/* Compact badges */}
                  <div className="absolute top-1.5 left-1.5 right-1.5 flex items-start justify-between">
                    <Badge className="bg-background/90 text-foreground border-border text-[10px] px-1.5 py-0.5">
                      {deal.category || 'Materials'}
                    </Badge>
                    {deal.isOnSale && (
                      <Badge className="bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0.5 font-bold">
                        {deal.discount}% OFF
                      </Badge>
                    )}
                  </div>
                </div>

                <CardContent className="p-2.5 flex-grow flex flex-col">
                  {/* Compact supplier and stock */}
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-elec-yellow" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                      <span className="font-medium text-foreground text-[10px]">{deal.supplier || 'Supplier'}</span>
                    </div>
                    {deal.stockStatus && (
                      <span className="text-green-400 text-[10px]">{deal.stockStatus}</span>
                    )}
                  </div>

                  {/* Compact title */}
                  <h3 className="text-xs font-semibold line-clamp-2 mb-2 text-foreground leading-tight">
                    {deal.name}
                  </h3>

                  {/* Compact price section */}
                  <div className="pt-2 border-t border-white/10 mt-auto">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex flex-col">
                        {deal.salePrice ? (
                          <>
                            <span className="text-sm font-bold text-elec-yellow leading-none">
                              {deal.salePrice}
                            </span>
                            <span className="text-[10px] text-muted-foreground line-through">
                              {deal.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-bold text-elec-yellow leading-none">
                            {deal.price}
                          </span>
                        )}
                        <span className="text-[10px] text-muted-foreground">inc. VAT</span>
                      </div>
                    </div>

                    {/* Compact button */}
                    <Button 
                      size="sm" 
                      onClick={() => window.open(getProductUrl(deal), '_blank')}
                      className="w-full h-7 text-[10px] border border-elec-yellow text-elec-yellow bg-transparent hover:bg-elec-yellow hover:text-background transition-colors px-2"
                    >
                      <ExternalLink className="w-2.5 h-2.5 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-4 bg-elec-card/80 border-white/10 text-elec-light hover:bg-elec-yellow/10 hover:text-elec-yellow" />
        <CarouselNext className="hidden md:flex -right-4 bg-elec-card/80 border-white/10 text-elec-light hover:bg-elec-yellow/10 hover:text-elec-yellow" />
      </Carousel>
    </section>
  );
};

export default MaterialTopDiscounts;