import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  ChevronDown, 
  Wrench, 
  Cable, 
  Zap, 
  Shield, 
  Building, 
  Settings, 
  Menu,
  Boxes,
  Wifi,
  Flame,
  Car,
  Home,
  Thermometer,
  ShoppingCart,
  Calculator,
  Bot,
  RefreshCw,
  MoreHorizontal,
  GitCompare
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const MaterialsNavigationHeader = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mainCategories = [
    {
      id: "cables",
      title: "Cables & Wiring",
      icon: <Cable className="h-4 w-4" />,
      path: "/electrician/materials/category/cables",
      subcategories: [
        "Twin & Earth Cable",
        "SWA Armoured Cable", 
        "Flex Cables",
        "Data Cables",
        "Fire Rated Cables"
      ]
    },
    {
      id: "components",
      title: "Electrical Components",
      icon: <Zap className="h-4 w-4" />,
      path: "/electrician/materials/category/components",
      subcategories: [
        "Consumer Units",
        "MCBs & RCDs",
        "Isolators",
        "Switches",
        "Sockets"
      ]
    },
    {
      id: "protection",
      title: "Protection Equipment",
      icon: <Shield className="h-4 w-4" />,
      path: "/electrician/materials/category/protection",
      subcategories: [
        "Earth Rods",
        "Surge Protectors",
        "Circuit Breakers",
        "Safety Equipment"
      ]
    },
    {
      id: "lighting",
      title: "Lighting Solutions",
      icon: <Building className="h-4 w-4" />,
      path: "/electrician/materials/category/lighting",
      subcategories: [
        "LED Downlights",
        "LED Battens",
        "Emergency Lighting",
        "Fire Rated Lights"
      ]
    },
    {
      id: "accessories",
      title: "Installation Accessories",
      icon: <Settings className="h-4 w-4" />,
      path: "/electrician/materials/category/accessories",
      subcategories: [
        "Junction Boxes",
        "Cable Glands",
        "Fixings",
        "Tools"
      ]
    },
    {
      id: "cable-management",
      title: "Cable Management",
      icon: <Boxes className="h-4 w-4" />,
      path: "/electrician/materials/category/cable-management",
      subcategories: [
        "Trunking",
        "Conduit",
        "Cable Trays",
        "Cable Ties"
      ]
    }
  ];

  const moreTools = [
    {
      title: "Compare Products",
      icon: <GitCompare className="h-4 w-4" />,
      path: "/electrician/tools/compare"
    },
    {
      title: "Bulk Order",
      icon: <ShoppingCart className="h-4 w-4" />,
      path: "/electrician/tools/bulk-order"
    },
    {
      title: "Project Calculator",
      icon: <Calculator className="h-4 w-4" />,
      path: "/electrician/tools/calculator"
    },
    {
      title: "AI Recommendations",
      icon: <Bot className="h-4 w-4" />,
      path: "/electrician/tools/ai-recommendations"
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-elec-yellow/20">
      <div className="container flex h-16 items-center">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden mr-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {mainCategories.map((category) => (
            <DropdownMenu key={category.id}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-sm hover:bg-elec-yellow/10">
                  {category.icon}
                  {category.title}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-background border-elec-yellow/20">
                <DropdownMenuItem asChild>
                  <Link 
                    to={category.path}
                    className="font-medium text-elec-yellow flex items-center gap-2"
                  >
                    {category.icon}
                    View All {category.title}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {category.subcategories.map((subcat) => (
                  <DropdownMenuItem key={subcat} asChild>
                    <Link to={`${category.path}?subcategory=${encodeURIComponent(subcat)}`}>
                      {subcat}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>

        {/* More Tools Dropdown */}
        <div className="hidden md:block ml-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <MoreHorizontal className="h-4 w-4" />
                More Tools
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-background border-elec-yellow/20">
              {moreTools.map((tool) => (
                <DropdownMenuItem key={tool.title} asChild>
                  <Link to={tool.path} className="flex items-center gap-2">
                    {tool.icon}
                    {tool.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Admin Tools (moved to right) */}
        <div className="ml-auto flex items-center gap-2">
          <Badge variant="outline" className="hidden sm:flex text-xs">
            Weekly Auto-Update
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background border-elec-yellow/20">
              <DropdownMenuItem onClick={() => {/* handleUpdateProducts */}}>
                Weekly Refresh
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {/* handleForceUpdate */}}>
                Force Update
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-elec-yellow/20 bg-background">
          <div className="container py-4 space-y-2">
            {mainCategories.map((category) => (
              <div key={category.id} className="space-y-1">
                <Link
                  to={category.path}
                  className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-elec-yellow/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.icon}
                  {category.title}
                </Link>
              </div>
            ))}
            <div className="border-t border-elec-yellow/20 pt-2 mt-4">
              <div className="text-sm font-medium px-3 py-1 text-muted-foreground">More Tools</div>
              {moreTools.map((tool) => (
                <Link
                  key={tool.title}
                  to={tool.path}
                  className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-elec-yellow/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {tool.icon}
                  {tool.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default MaterialsNavigationHeader;