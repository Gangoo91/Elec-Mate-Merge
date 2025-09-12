import { Card, CardContent } from "@/components/ui/card";
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
  Cable
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
    description: 'High-quality cables, wires and electrical connections',
    count: '180+'
  },
  {
    name: 'Hand Tools',
    icon: Wrench,
    description: 'Essential manual tools for electrical work',
    count: '120+'
  },
  {
    name: 'Power Tools',
    icon: Zap,
    description: 'Professional cordless and corded power tools',
    count: '85+'
  },
  {
    name: 'Test Equipment',
    icon: Calculator,
    description: 'Testing and measurement equipment for compliance',
    count: '60+'
  },
  {
    name: 'PPE',
    icon: HardHat,
    description: 'Personal protective equipment for safety',
    count: '95+'
  },
  {
    name: 'Safety Tools',
    icon: Shield,
    description: 'Safety equipment and hazard protection tools',
    count: '70+'
  },
  {
    name: 'Access Equipment',
    icon: ArrowUp,
    description: 'Ladders, scaffolding and height access tools',
    count: '45+'
  },
  {
    name: 'Tool Storage',
    icon: Package,
    description: 'Tool bags, boxes and storage solutions',
    count: '55+'
  }
];

export const ToolCategoryMegaMenu = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {toolCategories.map((category) => (
          <Link 
            key={category.name}
            to={`/electrician/tools?category=${encodeURIComponent(category.name)}`}
            className="block group"
          >
            <Card className="bg-card border-elec-yellow/30 hover:border-elec-yellow/60 transition-all duration-300 hover:shadow-lg hover:shadow-elec-yellow/10 h-full">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <category.icon className="h-8 w-8 text-elec-yellow" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-elec-yellow transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {category.description}
                    </p>
                    <p className="text-xs text-muted-foreground/80">
                      {category.count} products
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