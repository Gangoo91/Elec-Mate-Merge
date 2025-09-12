import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Cable, 
  Zap, 
  Shield, 
  Settings, 
  Lightbulb,
  Wrench
} from 'lucide-react';

interface ToolCategory {
  name: string;
  icon: any;
  description: string;
  count: string;
}

const toolCategories: ToolCategory[] = [
  {
    name: 'Cables & Wiring',
    icon: Cable,
    description: 'Twin & Earth, SWA, flex cables and data cables',
    count: '324 products available'
  },
  {
    name: 'Electrical Components',
    icon: Zap,
    description: 'Consumer units, MCBs, RCDs and isolators',
    count: '186 products available'
  },
  {
    name: 'Protection Equipment',
    icon: Shield,
    description: 'Earth rods, surge protectors and circuit breakers',
    count: '95 products available'
  },
  {
    name: 'Installation Accessories',
    icon: Settings,
    description: 'Junction boxes, cable glands and trunking',
    count: '412 products available'
  },
  {
    name: 'Lighting Solutions',
    icon: Lightbulb,
    description: 'LED downlights, battens and emergency lighting',
    count: '278 products available'
  },
  {
    name: 'Electrical Tools',
    icon: Wrench,
    description: 'Testing equipment, hand tools and power tools',
    count: '156 products available'
  }
];

export const ToolCategoryMegaMenu = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {toolCategories.map((category) => (
          <Link 
            key={category.name}
            to={`/electrician/tools?category=${encodeURIComponent(category.name)}`}
            className="block"
          >
            <Card className="group bg-slate-800/90 border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/10 cursor-pointer">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <category.icon className="h-8 w-8 text-yellow-400" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-400 text-base leading-relaxed">
                      {category.description}
                    </p>
                    <p className="text-gray-500 text-sm font-medium">
                      {category.count}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};