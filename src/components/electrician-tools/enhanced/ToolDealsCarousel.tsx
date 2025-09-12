import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, ExternalLink, TrendingDown, Flame, Crown } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";

interface ToolDeal {
  id: string;
  title: string;
  supplier: string;
  originalPrice: string;
  salePrice: string;
  discount: string;
  rating: number;
  reviews: number;
  timeLeft: string;
  badge?: string;
  image?: string;
  features: string[];
  productUrl?: string;
}

const featuredDeals: ToolDeal[] = [
  {
    id: '1',
    title: 'DeWalt 18V Combi Drill Kit',
    supplier: 'Screwfix',
    originalPrice: '£179.99',
    salePrice: '£139.99',
    discount: '22%',
    rating: 4.8,
    reviews: 234,
    timeLeft: '2h 15m',
    badge: 'Deal of the Day',
    features: ['2x 2.0Ah Batteries', 'Fast Charger', 'Kit Box'],
    productUrl: 'https://screwfix.com'
  },
  {
    id: '2',
    title: 'Fluke 1AC Voltage Tester',
    supplier: 'RS Components',
    originalPrice: '£45.99',
    salePrice: '£32.99',
    discount: '28%',
    rating: 4.9,
    reviews: 156,
    timeLeft: '1 day',
    badge: 'Hot Deal',
    features: ['Non-contact detection', 'LED indicator', 'Pocket size'],
    productUrl: 'https://rs-online.com'
  },
  {
    id: '3',
    title: 'Makita 18V Impact Driver',
    supplier: 'Toolstation',
    originalPrice: '£89.99',
    salePrice: '£69.99',
    discount: '22%',
    rating: 4.7,
    reviews: 89,
    timeLeft: '6h 30m',
    badge: 'Flash Sale',
    features: ['Brushless motor', 'LED work light', 'Belt clip'],
    productUrl: 'https://toolstation.com'
  },
  {
    id: '4',
    title: 'Stanley Safety Boots',
    supplier: 'CEF',
    originalPrice: '£79.99',
    salePrice: '£54.99',
    discount: '31%',
    rating: 4.6,
    reviews: 78,
    timeLeft: '12h',
    badge: 'Best Seller',
    features: ['Steel toe cap', 'Slip resistant', 'S3 rated'],
    productUrl: 'https://cef.co.uk'
  },
  {
    id: '5',
    title: 'Fluke 117 Multimeter',
    supplier: 'TLC Direct',
    originalPrice: '£189.99',
    salePrice: '£149.99',
    discount: '21%',
    rating: 4.9,
    reviews: 203,
    timeLeft: '3 days',
    badge: 'Premium Deal',
    features: ['True RMS', 'AutoVolt', 'Non-contact voltage'],
    productUrl: 'https://tlc-direct.co.uk'
  }
];

const topDiscounts = [
  { title: 'Milwaukee 18V Circular Saw', discount: '35%', savings: '£52.00', supplier: 'Screwfix' },
  { title: 'Bosch GDR 18V Impact Driver', discount: '30%', savings: '£45.00', supplier: 'Toolstation' },
  { title: 'DeWalt Safety Glasses Set', discount: '28%', savings: '£15.00', supplier: 'CEF' },
  { title: 'Makita Tool Bag XL', discount: '25%', savings: '£18.00', supplier: 'TLC Direct' },
  { title: 'Fluke Socket Tester', discount: '24%', savings: '£12.00', supplier: 'RS Components' }
];

export const ToolDealsCarousel = () => {
  const [currentDeal, setCurrentDeal] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDeal((prev) => (prev + 1) % featuredDeals.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      
      const diff = endOfDay.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft(`${hours}h ${minutes}m`);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 60000);
    
    return () => clearInterval(timer);
  }, []);

  const getBadgeIcon = (badge?: string) => {
    switch (badge) {
      case 'Deal of the Day': return <Flame className="h-3 w-3" />;
      case 'Hot Deal': return <TrendingDown className="h-3 w-3" />;
      case 'Premium Deal': return <Crown className="h-3 w-3" />;
      default: return null;
    }
  };

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'Deal of the Day': return 'bg-red-500';
      case 'Hot Deal': return 'bg-orange-500';
      case 'Flash Sale': return 'bg-purple-500';
      case 'Best Seller': return 'bg-green-500';
      case 'Premium Deal': return 'bg-blue-500';
      default: return 'bg-primary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Deal of the Day Banner */}
      <Card className="overflow-hidden bg-gradient-to-r from-primary/10 via-background to-primary/10 border-primary/20">
        <CardContent className="p-0">
          <div className="relative">
            {/* Rotating Deal Display */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-primary animate-pulse" />
                  <h2 className="text-xl font-bold">Deal of the Day</h2>
                  {featuredDeals[currentDeal].badge && (
                    <Badge className={`${getBadgeColor(featuredDeals[currentDeal].badge)} text-white`}>
                      {getBadgeIcon(featuredDeals[currentDeal].badge)}
                      {featuredDeals[currentDeal].badge}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Ends in {timeLeft}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">{featuredDeals[currentDeal].title}</h3>
                    <p className="text-muted-foreground">by {featuredDeals[currentDeal].supplier}</p>
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-primary">
                      {featuredDeals[currentDeal].salePrice}
                    </span>
                    <span className="text-lg line-through text-muted-foreground">
                      {featuredDeals[currentDeal].originalPrice}
                    </span>
                    <Badge variant="destructive" className="text-sm">
                      Save {featuredDeals[currentDeal].discount}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{featuredDeals[currentDeal].rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({featuredDeals[currentDeal].reviews} reviews)
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-1">
                    {featuredDeals[currentDeal].features.map((feature, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      Add to Quote
                    </Button>
                    <Button variant="outline" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Deal Image Placeholder */}
                <div className="bg-muted/30 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <div className="text-4xl mb-2">🔧</div>
                    <p className="text-sm">Product Image</p>
                  </div>
                </div>
              </div>

              {/* Deal Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {featuredDeals.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentDeal(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentDeal ? 'bg-primary w-6' : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top 5 Discounts */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-green-500" />
            Top 5 Discounts Today
          </h3>
          <Button variant="outline" size="sm">
            View All Deals
          </Button>
        </div>

        <div className="space-y-3">
          {topDiscounts.map((deal, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="font-mono text-green-600 border-green-200">
                  #{index + 1}
                </Badge>
                <div>
                  <p className="font-medium text-sm">{deal.title}</p>
                  <p className="text-xs text-muted-foreground">{deal.supplier}</p>
                </div>
              </div>
              
              <div className="text-right">
                <Badge variant="destructive" className="mb-1">
                  {deal.discount} OFF
                </Badge>
                <p className="text-xs text-green-600 font-medium">
                  Save {deal.savings}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};