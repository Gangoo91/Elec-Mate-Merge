
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calculator, Zap, Shield, AlertTriangle, Search, BookOpen, Clock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickReferenceTools = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const quickTools = [
    {
      title: 'Zs Calculator',
      description: 'Calculate maximum earth fault loop impedance values',
      icon: Calculator,
      color: 'bg-blue-500/10 text-blue-400',
      usage: 'Most Used',
      category: 'Testing',
      route: '/tools/zs-calculator'
    },
    {
      title: 'RCD Requirements',
      description: 'Check when RCD protection is required',
      icon: Shield,
      color: 'bg-green-500/10 text-green-400',
      usage: 'Essential',
      category: 'Safety',
      route: '/tools/rcd-requirements'
    },
    {
      title: 'Cable Capacity',
      description: 'Current carrying capacity and voltage drop',
      icon: Zap,
      color: 'bg-yellow-500/10 text-yellow-400',
      usage: 'Daily Use',
      category: 'Installation',
      route: '/tools/cable-capacity'
    },
    {
      title: 'Test Sequence',
      description: 'Correct order for electrical testing',
      icon: Clock,
      color: 'bg-purple-500/10 text-purple-400',
      usage: 'Reference',
      category: 'Testing',
      route: '/tools/test-sequence'
    },
    {
      title: 'Fault Finding',
      description: 'Common faults and troubleshooting guide',
      icon: AlertTriangle,
      color: 'bg-red-500/10 text-red-400',
      usage: 'Emergency',
      category: 'Diagnosis',
      route: '/tools/fault-finding'
    },
    {
      title: 'Regulation Search',
      description: 'Quick lookup of specific BS7671 regulations',
      icon: Search,
      color: 'bg-cyan-500/10 text-cyan-400',
      usage: 'Frequent',
      category: 'Reference',
      route: '/tools/regulation-search'
    }
  ];

  const filteredTools = quickTools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToolClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3 sm:space-y-4 px-2 sm:px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
          <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Quick Reference Tools</h2>
        </div>
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
          Access instant regulation information and practical tools for your daily electrical work
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted border-border text-foreground placeholder-gray-400"
          />
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool, index) => {
          const IconComponent = tool.icon;
          return (
            <Card 
              key={index} 
              className="bg-card border-border hover:border-elec-yellow/50 transition-all duration-300 cursor-pointer group hover:scale-105"
              onClick={() => handleToolClick(tool.route)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${tool.color} mb-3`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {tool.usage}
                  </Badge>
                </div>
                <CardTitle className="text-foreground group-hover:text-elec-yellow transition-colors text-lg">
                  {tool.title}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                    {tool.category}
                  </Badge>
                  <Button 
                    size="sm" 
                    className="bg-elec-yellow text-black hover:bg-elec-yellow/90 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToolClick(tool.route);
                    }}
                  >
                    Use Tool
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-card rounded-lg p-4 text-center border border-border">
          <TrendingUp className="h-5 w-5 text-elec-yellow mx-auto mb-2" />
          <div className="text-lg font-bold text-foreground">6</div>
          <div className="text-xs text-gray-400">Quick Tools</div>
        </div>
        <div className="bg-card rounded-lg p-4 text-center border border-border">
          <Calculator className="h-5 w-5 text-blue-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-foreground">12</div>
          <div className="text-xs text-gray-400">Calculators</div>
        </div>
        <div className="bg-card rounded-lg p-4 text-center border border-border">
          <BookOpen className="h-5 w-5 text-green-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-foreground">200+</div>
          <div className="text-xs text-gray-400">References</div>
        </div>
        <div className="bg-card rounded-lg p-4 text-center border border-border">
          <Shield className="h-5 w-5 text-red-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-foreground">50+</div>
          <div className="text-xs text-gray-400">Safety Rules</div>
        </div>
      </div>
    </div>
  );
};

export default QuickReferenceTools;
