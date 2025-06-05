
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  BookOpen, 
  Video, 
  FileText, 
  ExternalLink, 
  ChevronDown, 
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  PlayCircle,
  Download,
  Eye
} from "lucide-react";

interface EducationalResource {
  id: string;
  title: string;
  type: 'theory' | 'video' | 'example' | 'regulation' | 'tip' | 'warning';
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  regulation?: string;
  externalUrl?: string;
  downloadUrl?: string;
}

interface CalculatorEducationalContentProps {
  calculatorType: string;
  currentInputs?: Record<string, any>;
  currentOutputs?: Record<string, any>;
}

const CalculatorEducationalContent: React.FC<CalculatorEducationalContentProps> = ({
  calculatorType,
  currentInputs = {},
  currentOutputs = {}
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['theory']);

  // Mock educational content - in a real app, this would come from a CMS or API
  const getEducationalContent = (calcType: string): EducationalResource[] => {
    const baseContent: Record<string, EducationalResource[]> = {
      'ohms-law': [
        {
          id: '1',
          title: 'Understanding Ohm\'s Law',
          type: 'theory',
          content: 'Ohm\'s Law states that the current flowing through a conductor is directly proportional to the voltage across it and inversely proportional to its resistance. The formula is V = I × R, where V is voltage (volts), I is current (amperes), and R is resistance (ohms).',
          difficulty: 'beginner',
          estimatedTime: '5 min',
          regulation: 'BS 7671'
        },
        {
          id: '2',
          title: 'Practical Applications in Electrical Installations',
          type: 'example',
          content: 'In electrical installations, Ohm\'s Law helps calculate appropriate cable sizes, protective device ratings, and voltage drops. For example, if you know the load current and cable resistance, you can calculate voltage drop to ensure compliance with BS 7671 regulations.',
          difficulty: 'intermediate',
          estimatedTime: '10 min'
        },
        {
          id: '3',
          title: 'Common Mistakes and Safety Considerations',
          type: 'warning',
          content: 'Always ensure measurements are taken with the circuit de-energised when possible. Remember that resistance values can change with temperature, and always account for this in your calculations. Never exceed the current-carrying capacity of conductors.',
          difficulty: 'beginner',
          estimatedTime: '3 min'
        }
      ],
      'voltage-drop': [
        {
          id: '1',
          title: 'BS 7671 Voltage Drop Requirements',
          type: 'regulation',
          content: 'BS 7671 requires that voltage drop should not exceed 3% for lighting circuits and 5% for other circuits under normal operating conditions. This ensures proper operation of electrical equipment and compliance with UK electrical regulations.',
          difficulty: 'intermediate',
          estimatedTime: '8 min',
          regulation: 'BS 7671 Section 525'
        },
        {
          id: '2',
          title: 'Calculating Voltage Drop in Practice',
          type: 'example',
          content: 'To calculate voltage drop: VD = (mV/A/m × Ib × L) / 1000, where mV/A/m is the cable\'s voltage drop per ampere per metre, Ib is the design current, and L is the cable length. Always use the appropriate values from cable manufacturers\' data.',
          difficulty: 'intermediate',
          estimatedTime: '12 min'
        }
      ],
      'cable-sizing': [
        {
          id: '1',
          title: 'Cable Selection Methodology',
          type: 'theory',
          content: 'Cable sizing involves considering current-carrying capacity, voltage drop, short-circuit protection, and environmental factors. The cable must carry the design current while meeting voltage drop limits and withstanding fault conditions.',
          difficulty: 'advanced',
          estimatedTime: '15 min'
        },
        {
          id: '2',
          title: 'Derating Factors Application',
          type: 'tip',
          content: 'Apply appropriate derating factors for ambient temperature, grouping, and thermal insulation. Common factors: ambient temperature >30°C reduces capacity, grouping multiple cables reduces capacity, thermal insulation requires special consideration.',
          difficulty: 'intermediate',
          estimatedTime: '10 min'
        }
      ]
    };

    return baseContent[calcType] || [];
  };

  const resources = getEducationalContent(calculatorType);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'theory': return <BookOpen className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'example': return <PlayCircle className="h-4 w-4" />;
      case 'regulation': return <FileText className="h-4 w-4" />;
      case 'tip': return <Lightbulb className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'theory': return 'border-blue-500/30 text-blue-400';
      case 'video': return 'border-purple-500/30 text-purple-400';
      case 'example': return 'border-green-500/30 text-green-400';
      case 'regulation': return 'border-red-500/30 text-red-400';
      case 'tip': return 'border-yellow-500/30 text-yellow-400';
      case 'warning': return 'border-orange-500/30 text-orange-400';
      default: return 'border-gray-500/30 text-gray-400';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = [];
    }
    acc[resource.type].push(resource);
    return acc;
  }, {} as Record<string, EducationalResource[]>);

  // Generate contextual tips based on current calculation
  const getContextualTips = () => {
    const tips: string[] = [];
    
    if (calculatorType === 'voltage-drop' && currentInputs.length > 50) {
      tips.push('For long cable runs, consider larger cable sizes to reduce voltage drop.');
    }
    
    if (calculatorType === 'ohms-law' && currentOutputs.power > 3000) {
      tips.push('High power calculations require careful consideration of heat dissipation.');
    }
    
    if (calculatorType === 'cable-sizing' && currentInputs.ambientTemp > 35) {
      tips.push('High ambient temperatures require derating - consider ventilation or larger cables.');
    }
    
    return tips;
  };

  const contextualTips = getContextualTips();

  if (resources.length === 0) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-8 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Educational Content Coming Soon</h3>
          <p className="text-muted-foreground">
            Educational resources for this calculator are being developed.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Contextual Tips */}
      {contextualTips.length > 0 && (
        <Card className="border-yellow-500/30 bg-yellow-500/10">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Smart Tips for Current Calculation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {contextualTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Educational Content Tabs */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Educational Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="theory">Theory</TabsTrigger>
              <TabsTrigger value="practical">Practical</TabsTrigger>
              <TabsTrigger value="regulations">Regulations</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="space-y-4">
                {Object.entries(groupedResources).map(([type, typeResources]) => (
                  <Collapsible
                    key={type}
                    open={expandedSections.includes(type)}
                    onOpenChange={() => toggleSection(type)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between p-4 h-auto border border-elec-yellow/20 hover:border-elec-yellow/40"
                      >
                        <div className="flex items-center gap-3">
                          {getTypeIcon(type)}
                          <span className="font-medium capitalize">{type.replace('-', ' ')}</span>
                          <Badge variant="outline" className="ml-2">
                            {typeResources.length}
                          </Badge>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform ${
                          expandedSections.includes(type) ? 'rotate-180' : ''
                        }`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <div className="space-y-3 pl-4">
                        {typeResources.map(resource => (
                          <Card key={resource.id} className="border-elec-yellow/10">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <h4 className="font-medium">{resource.title}</h4>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className={getDifficultyColor(resource.difficulty)}>
                                    {resource.difficulty}
                                  </Badge>
                                  <Badge variant="outline" className={getTypeColor(resource.type)}>
                                    {getTypeIcon(resource.type)}
                                    <span className="ml-1">{resource.estimatedTime}</span>
                                  </Badge>
                                </div>
                              </div>
                              
                              <p className="text-sm text-muted-foreground mb-3">
                                {resource.content}
                              </p>

                              {resource.regulation && (
                                <div className="flex items-center gap-2 mb-3">
                                  <FileText className="h-4 w-4 text-blue-400" />
                                  <span className="text-sm text-blue-400">{resource.regulation}</span>
                                </div>
                              )}

                              <div className="flex gap-2">
                                {resource.externalUrl && (
                                  <Button variant="outline" size="sm" asChild>
                                    <a href={resource.externalUrl} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-4 w-4 mr-2" />
                                      Learn More
                                    </a>
                                  </Button>
                                )}
                                {resource.downloadUrl && (
                                  <Button variant="outline" size="sm" asChild>
                                    <a href={resource.downloadUrl} download>
                                      <Download className="h-4 w-4 mr-2" />
                                      Download
                                    </a>
                                  </Button>
                                )}
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  Mark as Read
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="theory" className="mt-6">
              <div className="space-y-4">
                {resources.filter(r => r.type === 'theory' || r.type === 'regulation').map(resource => (
                  <Card key={resource.id} className="border-blue-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-blue-400">{resource.title}</h4>
                        <Badge variant="outline" className={getDifficultyColor(resource.difficulty)}>
                          {resource.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {resource.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="practical" className="mt-6">
              <div className="space-y-4">
                {resources.filter(r => r.type === 'example' || r.type === 'tip').map(resource => (
                  <Card key={resource.id} className="border-green-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-green-400">{resource.title}</h4>
                        <Badge variant="outline" className={getDifficultyColor(resource.difficulty)}>
                          {resource.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {resource.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="regulations" className="mt-6">
              <div className="space-y-4">
                {resources.filter(r => r.type === 'regulation' || r.regulation).map(resource => (
                  <Card key={resource.id} className="border-red-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-red-400">{resource.title}</h4>
                        <Badge variant="outline" className="border-red-500/30 text-red-400">
                          {resource.regulation || 'BS 7671'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {resource.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalculatorEducationalContent;
