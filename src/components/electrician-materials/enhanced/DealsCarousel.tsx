import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Clock, 
  Flame, 
  ExternalLink,
  ShoppingCart,
  Eye
} from 'lucide-react';

interface Deal {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  supplier: string;
  category: string;
  timeLeft: string;
  image: string;
  features: string[];
  inStock: boolean;
  popular: boolean;
}

const DealsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('23:45:12');

  const dailyDeals: Deal[] = [
    {
      id: '1',
      title: 'Schneider Acti 9 Consumer Unit',
      description: '10-Way Dual RCD Consumer Unit with 6 MCBs',
      originalPrice: 179.99,
      salePrice: 129.99,
      discount: 28,
      supplier: 'CEF',
      category: 'Consumer Units',
      timeLeft: '23:45:12',
      image: '/placeholder.svg',
      features: [
        '18th Edition Compliant',
        'Pre-wired with RCDs',
        '2-Year Warranty',
        'Free Next Day Delivery'
      ],
      inStock: true,
      popular: true
    },
    {
      id: '2',
      title: 'LED Fire Rated Downlights Pack',
      description: 'Pack of 6 IP65 Fire Rated Downlights with GU10 LEDs',
      originalPrice: 89.99,
      salePrice: 59.99,
      discount: 33,
      supplier: 'Screwfix',
      category: 'Lighting',
      timeLeft: '23:45:12',
      image: '/placeholder.svg',
      features: [
        '90-Minute Fire Rating',
        'Dimmable GU10 LEDs Included',
        'IP65 Bathroom Safe',
        'Quick Twist Lock Fitting'
      ],
      inStock: true,
      popular: false
    },
    {
      id: '3',
      title: 'Twin & Earth Cable Bundle',
      description: '100m of 2.5mm² Twin & Earth Cable',
      originalPrice: 124.99,
      salePrice: 94.99,
      discount: 24,
      supplier: 'Toolstation',
      category: 'Cables',
      timeLeft: '23:45:12',
      image: '/placeholder.svg',
      features: [
        'BS 6004-1 Standard',
        'High Quality Copper Conductors',
        'Grey PVC Sheath',
        'Trade Quality Cable'
      ],
      inStock: true,
      popular: true
    }
  ];

  const topDiscounts = [
    { product: 'Emergency Lighting Kit', discount: 45, price: '£89.99', supplier: 'ElectricalDirect' },
    { product: 'Smart Thermostat Bundle', discount: 40, price: '£149.99', supplier: 'Screwfix' },
    { product: 'SWA 4 Core Cable 25m', discount: 35, price: '£234.99', supplier: 'CEF' },
    { product: 'Metal Clad Sockets 10 Pack', discount: 30, price: '£67.99', supplier: 'Toolstation' },
    { product: 'LED Batten Lights 5ft', discount: 28, price: '£24.99', supplier: 'TLC' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % dailyDeals.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + dailyDeals.length) % dailyDeals.length);
  };

  const currentDeal = dailyDeals[currentIndex];

  return (
    <div className="space-y-6">
      {/* Deal of the Day Carousel */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-gray/70 overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Flame className="h-6 w-6 text-elec-yellow" />
              Deal of the Day
              <Badge variant="secondary" className="bg-elec-yellow text-black">
                SAVE {currentDeal.discount}%
              </Badge>
            </CardTitle>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-elec-yellow" />
              <span className="font-mono text-elec-yellow">{timeRemaining}</span>
              <span className="text-muted-foreground">left</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-elec-yellow/50">
                    {currentDeal.supplier}
                  </Badge>
                  <Badge variant="outline" className="border-elec-yellow/50">
                    {currentDeal.category}
                  </Badge>
                  {currentDeal.popular && (
                    <Badge className="bg-elec-yellow text-black">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Popular
                    </Badge>
                  )}
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{currentDeal.title}</h3>
                  <p className="text-muted-foreground">{currentDeal.description}</p>
                </div>
                
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-elec-yellow">
                    £{currentDeal.salePrice.toFixed(2)}
                  </span>
                  <span className="text-lg line-through text-muted-foreground">
                    £{currentDeal.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-green-400 font-medium">
                    Save £{(currentDeal.originalPrice - currentDeal.salePrice).toFixed(2)}
                  </span>
                </div>
                
                <ul className="space-y-1">
                  {currentDeal.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Star className="h-3 w-3 text-elec-yellow mr-2 fill-current" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Quote
                  </Button>
                  <Button variant="outline" className="border-elec-yellow/50">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="bg-elec-card w-full h-48 lg:h-64 rounded-md flex items-center justify-center text-elec-yellow/50 border border-elec-yellow/20">
                  Product Image
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-background/80 hover:bg-background"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-background/80 hover:bg-background"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-4 gap-1">
              {dailyDeals.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-elec-yellow' : 'bg-muted'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top 5 Discounts */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <Star className="h-5 w-5 text-elec-yellow fill-current" />
            Top 5 Discounts Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topDiscounts.map((deal, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-md bg-elec-card hover:bg-elec-card/70 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge className="bg-elec-yellow text-black font-bold">
                    -{deal.discount}%
                  </Badge>
                  <div>
                    <div className="font-medium text-white">{deal.product}</div>
                    <div className="text-sm text-muted-foreground">{deal.supplier}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-elec-yellow">{deal.price}</div>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealsCarousel;