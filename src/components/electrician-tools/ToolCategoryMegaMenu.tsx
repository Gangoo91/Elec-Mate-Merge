import { Card, CardContent } from "@/components/ui/card";
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
  ArrowRight
} from 'lucide-react';

interface ToolCategory {
  name: string;
  icon: any;
  description: string;
  count: string;
}

const toolCategories: ToolCategory[] = [
  {
    name: 'Hand Tools',
    icon: Wrench,
    description: 'Essential manual tools for electrical installations and maintenance',
    count: '200+'
  },
  {
    name: 'Power Tools',
    icon: Zap,
    description: 'Cordless and corded power tools for drilling, cutting and installation',
    count: '150+'
  },
  {
    name: 'Test Equipment',
    icon: Calculator,
    description: 'Testing and measurement equipment for electrical safety compliance',
    count: '80+'
  },
  {
    name: 'PPE',
    icon: HardHat,
    description: 'Personal protective equipment for safe electrical working practices',
    count: '120+'
  },
  {
    name: 'Safety Tools',
    icon: Shield,
    description: 'Safety equipment and tools for hazard identification and protection',
    count: '90+'
  },
  {
    name: 'Access Tools & Equipment',
    icon: ArrowUp,
    description: 'Ladders, scaffolding and access equipment for working at height',
    count: '60+'
  },
  {
    name: 'Tool Storage',
    icon: Package,
    description: 'Tool bags, boxes and storage solutions for organisation and transport',
    count: '75+'
  },
  {
    name: 'Specialist Tools',
    icon: Settings,
    description: 'Specialist electrical tools for specific installation and maintenance tasks',
    count: '95+'
  }
];

export const ToolCategoryMegaMenu = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {toolCategories.map((category) => (
          <Card 
            key={category.name}
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} tools</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                {category.description}
              </p>

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
    </div>
  );
};