import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Clock, 
  Star, 
  Plus, 
  Filter,
  BookOpen,
  Users,
  Award,
  Building,
  Zap,
  Shield,
  Leaf,
  Smartphone
} from 'lucide-react';
import { CPD_ACTIVITY_TEMPLATES, QUICK_ACTIVITY_TEMPLATES } from '@/data/cpd-templates';
import { useEnhancedCPD } from '@/hooks/cpd/useEnhancedCPD';

const ActivityTemplates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const { addFromTemplate } = useEnhancedCPD();

  const categoryIcons: Record<string, React.ReactNode> = {
    'regulations-standards': <BookOpen className="h-4 w-4" />,
    'technical-skills': <Zap className="h-4 w-4" />,
    'safety-health': <Shield className="h-4 w-4" />,
    'business-commercial': <Building className="h-4 w-4" />,
    'professional-ethics': <Users className="h-4 w-4" />,
    'environmental-sustainability': <Leaf className="h-4 w-4" />,
    'digital-technology': <Smartphone className="h-4 w-4" />,
    'customer-service': <Award className="h-4 w-4" />
  };

  const filteredTemplates = CPD_ACTIVITY_TEMPLATES.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const popularTemplates = filteredTemplates.filter(t => t.isPopular).slice(0, 6);

  const handleUseTemplate = (template: any, additionalHours?: number) => {
    const hours = additionalHours || template.estimatedHours;
    addFromTemplate(template, { hours });
    setSelectedTemplate(null);
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'regulations-standards', label: 'Regulations & Standards' },
    { value: 'technical-skills', label: 'Technical Skills' },
    { value: 'safety-health', label: 'Safety & Health' },
    { value: 'business-commercial', label: 'Business & Commercial' },
    { value: 'professional-ethics', label: 'Professional Ethics' },
    { value: 'environmental-sustainability', label: 'Environmental' },
    { value: 'digital-technology', label: 'Digital Technology' },
    { value: 'customer-service', label: 'Customer Service' }
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search activity templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 bg-background border border-border rounded-md text-foreground"
        >
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <Tabs defaultValue="popular" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="quick">Quick Add</TabsTrigger>
        </TabsList>

        {/* Popular Templates */}
        <TabsContent value="popular" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularTemplates.map(template => (
              <Card key={template.id} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {categoryIcons[template.category]}
                      <Star className="h-4 w-4 text-yellow-500" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {template.estimatedHours}h
                    </Badge>
                  </div>
                  <CardTitle className="text-sm text-foreground">{template.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {template.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">
                      {template.category.replace('-', ' ')}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {template.type.replace('-', ' ')}
                    </Badge>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Use Template
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{template.title}</DialogTitle>
                      </DialogHeader>
                      <TemplateDetailModal 
                        template={template}
                        onUse={handleUseTemplate}
                      />
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* All Templates */}
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map(template => (
              <Card key={template.id} className="bg-card border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {categoryIcons[template.category]}
                      {template.isPopular && <Star className="h-4 w-4 text-yellow-500" />}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {template.estimatedHours}h
                    </Badge>
                  </div>
                  <CardTitle className="text-sm text-foreground">{template.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">
                        {template.category.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedTemplate(template)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{template.title}</DialogTitle>
                        </DialogHeader>
                        <TemplateDetailModal 
                          template={template}
                          onUse={handleUseTemplate}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Quick Add */}
        <TabsContent value="quick" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {QUICK_ACTIVITY_TEMPLATES.map(template => (
              <Card key={template.id} className="bg-card border-border hover:bg-muted/20 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm text-foreground">{template.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {template.estimatedHours}h
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {template.description}
                  </p>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleUseTemplate(template)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Quick Add
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Template Detail Modal Component
const TemplateDetailModal = ({ template, onUse }: { template: any; onUse: (template: any, hours?: number) => void }) => {
  const [customHours, setCustomHours] = useState(template.estimatedHours);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {template.category.replace('-', ' ')}
          </Badge>
          <Badge variant="outline">
            {template.type.replace('-', ' ')}
          </Badge>
        </div>
        
        {template.provider && (
          <p className="text-sm text-muted-foreground">
            <strong>Typical Provider:</strong> {template.provider}
          </p>
        )}
      </div>

      <div>
        <h4 className="font-medium text-foreground mb-2">Description</h4>
        <p className="text-sm text-muted-foreground">{template.description}</p>
      </div>

      {template.learningOutcomes && (
        <div>
          <h4 className="font-medium text-foreground mb-2">Learning Outcomes</h4>
          <ul className="list-disc list-inside space-y-1">
            {template.learningOutcomes.map((outcome: string, index: number) => (
              <li key={index} className="text-sm text-muted-foreground">{outcome}</li>
            ))}
          </ul>
        </div>
      )}

      {template.evidenceRequired && (
        <div>
          <h4 className="font-medium text-foreground mb-2">Evidence Required</h4>
          <div className="flex flex-wrap gap-1">
            {template.evidenceRequired.map((evidence: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {evidence.replace('-', ' ')}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <label className="text-sm font-medium text-foreground">Hours:</label>
          <Input
            type="number"
            value={customHours}
            onChange={(e) => setCustomHours(Number(e.target.value))}
            className="w-20"
            min="0.5"
            max="40"
            step="0.5"
          />
        </div>
        
        <Button 
          onClick={() => onUse(template, customHours)}
          className="ml-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add to CPD Log
        </Button>
      </div>
    </div>
  );
};

export default ActivityTemplates;