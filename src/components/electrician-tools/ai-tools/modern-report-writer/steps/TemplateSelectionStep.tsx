import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Zap, 
  Shield, 
  Gauge, 
  Car, 
  TestTube, 
  Search,
  Star,
  Clock,
  ArrowRight,
  Sparkles,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import { TemplateStepProps, ReportTemplate } from "../types";

const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    id: "eicr",
    name: "EICR (Electrical Installation Condition Report)",
    description: "Comprehensive inspection report for existing electrical installations",
    icon: FileText,
    difficulty: 'advanced',
    estimatedTime: '15-20 min',
    features: ['Full BS 7671 compliance', 'Fault categorisation', 'Next inspection dates'],
    category: 'inspection',
    isPopular: true
  },
  {
    id: "minor-works",
    name: "Minor Electrical Works Certificate",
    description: "Certificate for small electrical works and additions",
    icon: Zap,
    difficulty: 'basic',
    estimatedTime: '5-10 min',
    features: ['Quick completion', 'Circuit details', 'Test results'],
    category: 'certification',
    isPopular: true
  },
  {
    id: "periodic-inspection",
    name: "Periodic Inspection Report",
    description: "Regular inspection report for ongoing electrical safety",
    icon: Shield,
    difficulty: 'intermediate',
    estimatedTime: '10-15 min',
    features: ['Safety assessment', 'Recommendations', 'Compliance tracking'],
    category: 'inspection'
  },
  {
    id: "consumer-unit",
    name: "Consumer Unit Installation Certificate",
    description: "Certificate for new or replacement consumer units",
    icon: Gauge,
    difficulty: 'intermediate',
    estimatedTime: '8-12 min',
    features: ['RCD protection', 'Circuit count', 'Test results'],
    category: 'installation',
    isNew: true
  },
  {
    id: "ev-charger",
    name: "EV Charger Installation Certificate",
    description: "Installation certificate for electric vehicle charging points",
    icon: Car,
    difficulty: 'intermediate',
    estimatedTime: '10-15 min',
    features: ['Special requirements', 'Earthing arrangements', 'Power ratings'],
    category: 'installation',
    isNew: true
  },
  {
    id: "rcd-test",
    name: "RCD Test Certificate",
    description: "Testing certificate for residual current devices",
    icon: TestTube,
    difficulty: 'basic',
    estimatedTime: '5-8 min',
    features: ['Quick testing', 'Pass/fail results', 'Action required'],
    category: 'testing'
  }
];

const TemplateSelectionStep: React.FC<TemplateStepProps> = ({
  selectedTemplate,
  onTemplateSelect,
  onNext
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Templates", count: REPORT_TEMPLATES.length },
    { id: "inspection", label: "Inspection Reports", count: REPORT_TEMPLATES.filter(t => t.category === 'inspection').length },
    { id: "installation", label: "Installation Certificates", count: REPORT_TEMPLATES.filter(t => t.category === 'installation').length },
    { id: "testing", label: "Test Certificates", count: REPORT_TEMPLATES.filter(t => t.category === 'testing').length },
    { id: "certification", label: "General Certificates", count: REPORT_TEMPLATES.filter(t => t.category === 'certification').length }
  ];

  const filteredTemplates = REPORT_TEMPLATES.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTemplateSelect = (template: ReportTemplate) => {
    onTemplateSelect(template);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'bg-green-500/10 text-green-500 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/10 text-red-500 border-red-500/30';
      default: return 'bg-muted/10 text-muted-foreground border-muted/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-elec-gray border-elec-yellow/30 p-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-elec-yellow" />
            <h2 className="text-2xl font-bold text-white">Choose Your Report Template</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select from our collection of BS 7671:2018 compliant templates, designed to streamline your electrical reporting process.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mt-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-elec-dark border border-primary/30 text-white"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id 
                  ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90" 
                  : "border-elec-yellow/30 text-white hover:bg-elec-yellow/10"
                }
              >
                {category.label}
                <Badge 
                  className={`ml-2 text-xs font-medium px-2 py-0.5 rounded-full ${
                    selectedCategory === category.id 
                      ? 'bg-elec-dark text-elec-yellow border border-elec-yellow/30' 
                      : 'bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/30'
                  }`}
                >
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const Icon = template.icon;
          const isSelected = selectedTemplate?.id === template.id;
          
          return (
            <Card
              key={template.id}
              className={`relative cursor-pointer transition-all duration-200 hover:scale-105 ${
                isSelected
                  ? 'bg-elec-yellow/10 border-elec-yellow ring-2 ring-elec-yellow/50'
                  : 'bg-elec-gray border-elec-yellow/30 hover:border-elec-yellow/50 hover:bg-elec-yellow/5'
              }`}
              onClick={() => handleTemplateSelect(template)}
            >
              {/* Badges */}
              <div className="absolute top-4 right-4 flex gap-2">
                {template.isPopular && (
                  <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/30">
                    <Star className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                )}
                {template.isNew && (
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/30">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    New
                  </Badge>
                )}
              </div>

              <div className="p-6 pt-12">
                {/* Icon and Title */}
                <div className="flex items-start gap-3 mb-4">
                  <div className={`p-3 rounded-lg ${
                    isSelected ? 'bg-elec-yellow/20' : 'bg-elec-dark'
                  }`}>
                    <Icon className={`h-6 w-6 ${
                      isSelected ? 'text-elec-yellow' : 'text-white'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0 mr-4">
                    <h3 className={`font-semibold text-sm leading-tight ${
                      isSelected ? 'text-elec-yellow' : 'text-white'
                    }`}>
                      {template.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {template.description}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{template.estimatedTime}</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getDifficultyColor(template.difficulty)}`}
                    >
                      {template.difficulty}
                    </Badge>
                  </div>

                  {/* Features */}
                  <div className="space-y-1">
                    {template.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                    {template.features.length > 2 && (
                      <div className="text-xs text-muted-foreground pl-5">
                        +{template.features.length - 2} more features
                      </div>
                    )}
                  </div>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <div className="mt-4 flex items-center justify-center">
                    <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/50">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Selected
                    </Badge>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* No results */}
      {filteredTemplates.length === 0 && (
        <Card className="bg-elec-gray border-elec-yellow/30 p-8">
          <div className="text-center space-y-4">
            <div className="p-4 bg-muted/10 rounded-full w-fit mx-auto">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">No templates found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or category filters.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10"
            >
              Clear filters
            </Button>
          </div>
        </Card>
      )}

      {/* Continue Button */}
      {selectedTemplate && (
        <Card className="bg-elec-gray border-elec-yellow/30 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-medium text-white">
                {selectedTemplate.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Ready to continue with this template
              </p>
            </div>
            <Button
              onClick={onNext}
              className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 w-full sm:w-auto"
            >
              Continue to Client Details
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TemplateSelectionStep;