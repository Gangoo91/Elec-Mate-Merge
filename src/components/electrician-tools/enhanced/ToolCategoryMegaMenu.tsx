import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Wrench, 
  Zap, 
  Calculator, 
  HardHat, 
  Shield, 
  Package, 
  ArrowUp, 
  Settings,
  TrendingUp,
  Star,
  ArrowRight
} from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";

interface ToolCategory {
  name: string;
  icon: any;
  description: string;
  count: string;
  priceRange: string;
  trending?: boolean;
  topBrands: string[];
  popularItems: string[];
  image?: string;
}

const toolCategories: ToolCategory[] = [
  {
    name: 'Hand Tools',
    icon: Wrench,
    description: 'Essential manual tools for electrical installations and maintenance',
    count: '200+',
    priceRange: '£5 - £150',
    trending: true,
    topBrands: ['Stanley', 'Bahco', 'Knipex', 'Wera'],
    popularItems: ['Screwdriver Sets', 'Wire Strippers', 'Pliers', 'Spanners']
  },
  {
    name: 'Power Tools',
    icon: Zap,
    description: 'Cordless and corded power tools for drilling, cutting and installation',
    count: '150+',
    priceRange: '£30 - £500',
    trending: true,
    topBrands: ['DeWalt', 'Makita', 'Milwaukee', 'Bosch'],
    popularItems: ['Combi Drills', 'Impact Drivers', 'Angle Grinders', 'SDS Drills']
  },
  {
    name: 'Test Equipment',
    icon: Calculator,
    description: 'Testing and measurement equipment for electrical safety compliance',
    count: '80+',
    priceRange: '£15 - £800',
    trending: true,
    topBrands: ['Fluke', 'Megger', 'Kewtech', 'Martindale'],
    popularItems: ['Multimeters', 'Socket Testers', 'Voltage Detectors', 'RCD Testers']
  },
  {
    name: 'PPE',
    icon: HardHat,
    description: 'Personal protective equipment for safe electrical working practices',
    count: '120+',
    priceRange: '£8 - £200',
    topBrands: ['Portwest', 'Stanley', 'JSP', 'Uvex'],
    popularItems: ['Safety Boots', 'Hard Hats', 'Safety Glasses', 'Insulated Gloves']
  },
  {
    name: 'Safety Tools',
    icon: Shield,
    description: 'Safety equipment and tools for hazard identification and protection',
    count: '90+',
    priceRange: '£10 - £300',
    topBrands: ['Brady', 'Martindale', 'Castell', 'Master Lock'],
    popularItems: ['Lockout Kits', 'Warning Signs', 'Safety Mats', 'Voltage Barriers']
  },
  {
    name: 'Access Tools & Equipment',
    icon: ArrowUp,
    description: 'Ladders, scaffolding and access equipment for working at height',
    count: '60+',
    priceRange: '£40 - £800',
    topBrands: ['Werner', 'Youngman', 'Zarges', 'Lyte'],
    popularItems: ['Step Ladders', 'Extension Ladders', 'Platform Steps', 'Trestles']
  },
  {
    name: 'Tool Storage',
    icon: Package,
    description: 'Tool bags, boxes and storage solutions for organisation and transport',
    count: '75+',
    priceRange: '£15 - £400',
    topBrands: ['DeWalt', 'Stanley', 'Makita', 'Bahco'],
    popularItems: ['Tool Bags', 'Tool Boxes', 'Van Racking', 'Belt Pouches']
  },
  {
    name: 'Specialist Tools',
    icon: Settings,
    description: 'Specialist electrical tools for specific installation and maintenance tasks',
    count: '95+',
    priceRange: '£20 - £600',
    topBrands: ['Greenlee', 'Klein', 'Ideal', 'Panduit'],
    popularItems: ['Cable Crimpers', 'Cable Pullers', 'Conduit Benders', 'Knockout Sets']
  }
];

export const ToolCategoryMegaMenu = () => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Browse Tool Categories</h2>
        <p className="text-muted-foreground">
          Find the right tools for your electrical projects with our comprehensive range
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {toolCategories.map((category) => (
          <Card 
            key={category.name}
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-background/50 border-border/50 hover:border-primary/20"
          >
            <CardContent className="p-6">
              {/* Category Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {category.count} tools
                    </Badge>
                  </div>
                </div>
                
                {category.trending && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {category.description}
              </p>

              {/* Price Range */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-muted-foreground">Price range:</span>
                <Badge variant="outline" className="text-xs font-mono">
                  {category.priceRange}
                </Badge>
              </div>

              {/* Top Brands */}
              <div className="mb-4">
                <p className="text-xs font-medium mb-2 text-muted-foreground">Top Brands:</p>
                <div className="flex flex-wrap gap-1">
                  {category.topBrands.slice(0, 3).map((brand) => (
                    <Badge key={brand} variant="secondary" className="text-xs">
                      {brand}
                    </Badge>
                  ))}
                  {category.topBrands.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{category.topBrands.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Popular Items */}
              <div className="mb-4">
                <p className="text-xs font-medium mb-2 text-muted-foreground">Popular Items:</p>
                <ul className="space-y-1">
                  {category.popularItems.slice(0, 3).map((item) => (
                    <li key={item} className="text-xs text-muted-foreground flex items-center gap-1">
                      <Star className="h-2 w-2 fill-yellow-400 text-yellow-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Browse Button */}
              <Link to={`/electrician/tools?category=${encodeURIComponent(category.name)}`}>
                <Button 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  variant="outline"
                >
                  Browse {category.name}
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <h4 className="font-semibold text-blue-900">BS 7671 Compliant</h4>
          </div>
          <p className="text-sm text-blue-700">
            All tools meet UK electrical safety standards and 18th Edition requirements
          </p>
        </Card>

        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h4 className="font-semibold text-green-900">Best Prices</h4>
          </div>
          <p className="text-sm text-green-700">
            Compare prices across major suppliers to find the best deals
          </p>
        </Card>

        <Card className="p-4 bg-purple-50 border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-5 w-5 text-purple-600" />
            <h4 className="font-semibold text-purple-900">Expert Reviews</h4>
          </div>
          <p className="text-sm text-purple-700">
            Read reviews from professional electricians and contractors
          </p>
        </Card>
      </div>
    </div>
  );
};