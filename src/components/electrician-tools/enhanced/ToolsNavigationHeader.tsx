import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Wrench, ArrowLeft, Settings, Menu, Scale, Calculator, Brain, Zap, HardHat, Shield, Package, ArrowUp } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface ToolsNavigationHeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

const toolCategories = [
  { name: 'Hand Tools', icon: Wrench, count: '200+' },
  { name: 'Power Tools', icon: Zap, count: '150+' },
  { name: 'Test Equipment', icon: Calculator, count: '80+' },
  { name: 'PPE', icon: HardHat, count: '120+' },
  { name: 'Safety Tools', icon: Shield, count: '90+' },
  { name: 'Access Tools & Equipment', icon: ArrowUp, count: '60+' },
  { name: 'Tool Storage', icon: Package, count: '75+' },
  { name: 'Specialist Tools', icon: Settings, count: '95+' }
];

export const ToolsNavigationHeader = ({ onRefresh, isRefreshing }: ToolsNavigationHeaderProps) => {
  const [isMoreToolsOpen, setIsMoreToolsOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        {/* Main Navigation Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Back Button & Title */}
          <div className="flex items-center gap-4">
            <Link to="/electrician">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                {!isMobile && "Electrician Hub"}
              </Button>
            </Link>
            
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              <h1 className="text-lg font-semibold hidden sm:block">Tools & Equipment</h1>
            </div>
          </div>

          {/* Right Side - Action Buttons */}
          <div className="flex items-center gap-2">
            {/* More Tools Dropdown */}
            <DropdownMenu open={isMoreToolsOpen} onOpenChange={setIsMoreToolsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Menu className="h-4 w-4" />
                  {!isMobile && "More Tools"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-sm border-border/50">
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <Scale className="h-4 w-4" />
                  Compare Tools
                  <Badge variant="secondary" className="ml-auto text-xs">Beta</Badge>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <Calculator className="h-4 w-4" />
                  Bulk Pricing Calculator
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <Brain className="h-4 w-4" />
                  AI Tool Recommendations
                  <Badge variant="secondary" className="ml-auto text-xs">New</Badge>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 cursor-pointer" onClick={onRefresh} disabled={isRefreshing}>
                  <Settings className="h-4 w-4" />
                  {isRefreshing ? 'Refreshing...' : 'Refresh Tool Data'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Categories Navigation - Desktop Only */}
        {!isMobile && (
          <div className="flex items-center gap-1 pb-4 overflow-x-auto">
            {toolCategories.map((category) => (
              <Link 
                key={category.name}
                to={`/electrician/tools?category=${encodeURIComponent(category.name)}`}
                className="group"
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-2 whitespace-nowrap hover:bg-primary/10 group"
                >
                  <category.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  <span className="text-sm">{category.name}</span>
                  <Badge variant="outline" className="text-xs text-muted-foreground group-hover:text-primary">
                    {category.count}
                  </Badge>
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};