import React, { useState } from 'react';
import { BookOpen, Target, Clock, Award, ChevronRight, Play, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
  prerequisites: string[];
  learningOutcomes: string[];
  sections: {
    id: string;
    title: string;
    type: 'content' | 'quiz' | 'scenario' | 'calculation';
    completed: boolean;
    duration: string;
  }[];
  progress: number;
  nextRecommended?: string;
}

export const LearningPathDashboard = () => {
  const [selectedPath, setSelectedPath] = useState<'systematic' | 'competency' | 'refresher'>('systematic');

  const modules: LearningModule[] = [
    {
      id: 'legal-framework',
      title: 'Legal Framework & Responsibilities',
      description: 'Understand legal obligations, competency requirements, and regulatory compliance for electrical inspection and testing.',
      estimatedTime: '2.5 hours',
      difficulty: 'Foundation',
      prerequisites: [],
      learningOutcomes: [
        'Understand BS7671 requirements for inspection and testing',
        'Identify legal responsibilities and liability',
        'Recognise competency requirements',
        'Apply health and safety obligations'
      ],
      sections: [
        { id: 'intro', title: 'Introduction to Legal Framework', type: 'content', completed: true, duration: '20 min' },
        { id: 'bs7671', title: 'BS7671 Requirements', type: 'content', completed: true, duration: '30 min' },
        { id: 'competency', title: 'Competency & Training', type: 'content', completed: false, duration: '25 min' },
        { id: 'liability', title: 'Legal Liability', type: 'content', completed: false, duration: '20 min' },
        { id: 'safety', title: 'Health & Safety Requirements', type: 'content', completed: false, duration: '30 min' },
        { id: 'quiz', title: 'Knowledge Check', type: 'quiz', completed: false, duration: '15 min' }
      ],
      progress: 35,
      nextRecommended: 'test-equipment'
    },
    {
      id: 'test-equipment',
      title: 'Test Equipment & Calibration',
      description: 'Learn about electrical test instruments, calibration requirements, and proper equipment selection.',
      estimatedTime: '3 hours',
      difficulty: 'Foundation',
      prerequisites: ['legal-framework'],
      learningOutcomes: [
        'Select appropriate test equipment for different tests',
        'Understand calibration requirements and validity',
        'Apply safety considerations when using test equipment',
        'Interpret equipment specifications and limitations'
      ],
      sections: [
        { id: 'intro', title: 'Equipment Overview', type: 'content', completed: false, duration: '25 min' },
        { id: 'types', title: 'Types of Test Equipment', type: 'content', completed: false, duration: '40 min' },
        { id: 'calibration', title: 'Calibration & Accuracy', type: 'content', completed: false, duration: '30 min' },
        { id: 'safety', title: 'Equipment Safety', type: 'content', completed: false, duration: '25 min' },
        { id: 'selection', title: 'Equipment Selection Guide', type: 'content', completed: false, duration: '30 min' },
        { id: 'quiz', title: 'Equipment Quiz', type: 'quiz', completed: false, duration: '20 min' },
        { id: 'scenario', title: 'Equipment Selection Scenario', type: 'scenario', completed: false, duration: '10 min' }
      ],
      progress: 0
    },
    {
      id: 'visual-inspection',
      title: 'Visual Inspection Techniques',
      description: 'Master systematic visual inspection methods and defect identification.',
      estimatedTime: '2 hours',
      difficulty: 'Foundation',
      prerequisites: ['legal-framework'],
      learningOutcomes: [
        'Conduct systematic visual inspections',
        'Identify common visual defects',
        'Apply appropriate defect classification',
        'Document inspection findings effectively'
      ],
      sections: [
        { id: 'what-is', title: 'What is Visual Inspection?', type: 'content', completed: false, duration: '15 min' },
        { id: 'when', title: 'When to Inspect', type: 'content', completed: false, duration: '15 min' },
        { id: 'systematic', title: 'Systematic Approach', type: 'content', completed: false, duration: '25 min' },
        { id: 'defects', title: 'Common Defects', type: 'content', completed: false, duration: '30 min' },
        { id: 'documentation', title: 'Documentation', type: 'content', completed: false, duration: '20 min' },
        { id: 'quiz', title: 'Visual Inspection Quiz', type: 'quiz', completed: false, duration: '15 min' }
      ],
      progress: 0
    },
    {
      id: 'electrical-testing',
      title: 'Electrical Testing Methods',
      description: 'Learn comprehensive electrical testing procedures and result interpretation.',
      estimatedTime: '4 hours',
      difficulty: 'Intermediate',
      prerequisites: ['test-equipment', 'visual-inspection'],
      learningOutcomes: [
        'Perform all required electrical tests safely',
        'Interpret test results correctly',
        'Apply appropriate test sequences',
        'Troubleshoot test equipment issues'
      ],
      sections: [
        { id: 'continuity', title: 'Continuity Testing', type: 'content', completed: false, duration: '35 min' },
        { id: 'insulation', title: 'Insulation Resistance', type: 'content', completed: false, duration: '40 min' },
        { id: 'polarity', title: 'Polarity Testing', type: 'content', completed: false, duration: '30 min' },
        { id: 'earth-loop', title: 'Earth Fault Loop Impedance', type: 'content', completed: false, duration: '45 min' },
        { id: 'rcd', title: 'RCD Testing', type: 'content', completed: false, duration: '35 min' },
        { id: 'calculations', title: 'Test Calculations', type: 'calculation', completed: false, duration: '25 min' },
        { id: 'quiz', title: 'Testing Methods Quiz', type: 'quiz', completed: false, duration: '20 min' },
        { id: 'scenario', title: 'Testing Scenarios', type: 'scenario', completed: false, duration: '15 min' }
      ],
      progress: 0
    }
  ];

  const learningPaths = {
    systematic: {
      title: 'Systematic Learning Path',
      description: 'Comprehensive course covering all aspects from basics to advanced topics',
      modules: ['legal-framework', 'test-equipment', 'visual-inspection', 'electrical-testing'],
      estimatedTime: '11.5 hours',
      bestFor: 'New learners or comprehensive review'
    },
    competency: {
      title: 'Competency-Focused Path',
      description: 'Targeted learning for specific competency gaps',
      modules: ['visual-inspection', 'electrical-testing'],
      estimatedTime: '6 hours',
      bestFor: 'Experienced practitioners updating skills'
    },
    refresher: {
      title: 'Refresher Path',
      description: 'Quick review of key concepts and recent updates',
      modules: ['legal-framework', 'electrical-testing'],
      estimatedTime: '6.5 hours',
      bestFor: 'Periodic competency maintenance'
    }
  };

  const currentPath = learningPaths[selectedPath];
  const pathModules = modules.filter(m => currentPath.modules.includes(m.id));

  const calculateOverallProgress = () => {
    const totalProgress = pathModules.reduce((sum, module) => sum + module.progress, 0);
    return Math.round(totalProgress / pathModules.length);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Foundation': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <BookOpen className="h-6 w-6 text-elec-yellow" />
            Learning Path Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedPath} onValueChange={(value) => setSelectedPath(value as any)} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 bg-elec-dark">
              <TabsTrigger value="systematic" className="text-gray-300 data-[state=active]:bg-elec-yellow data-[state=active]:text-black">
                Systematic
              </TabsTrigger>
              <TabsTrigger value="competency" className="text-gray-300 data-[state=active]:bg-elec-yellow data-[state=active]:text-black">
                Competency
              </TabsTrigger>
              <TabsTrigger value="refresher" className="text-gray-300 data-[state=active]:bg-elec-yellow data-[state=active]:text-black">
                Refresher
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedPath} className="space-y-6">
              {/* Path Overview */}
              <div className="bg-elec-dark p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{currentPath.title}</h3>
                    <p className="text-gray-300 mb-2">{currentPath.description}</p>
                    <p className="text-sm text-gray-400">Best for: {currentPath.bestFor}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-elec-yellow">{calculateOverallProgress()}%</div>
                    <p className="text-sm text-gray-400">Complete</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-300">{currentPath.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-300">{pathModules.length} modules</span>
                  </div>
                </div>

                <Progress value={calculateOverallProgress()} className="h-3" />
              </div>

              {/* Module List */}
              <div className="space-y-4">
                {pathModules.map((module, index) => {
                  const isUnlocked = index === 0 || pathModules[index - 1].progress === 100;
                  const completedSections = module.sections.filter(s => s.completed).length;
                  
                  return (
                    <Card key={module.id} className={`bg-elec-dark border-transparent ${!isUnlocked ? 'opacity-60' : ''}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              module.progress === 100 ? 'bg-green-500' : 
                              module.progress > 0 ? 'bg-yellow-500' : 'bg-gray-600'
                            }`}>
                              {module.progress === 100 ? (
                                <CheckCircle className="h-6 w-6 text-foreground" />
                              ) : (
                                <BookOpen className="h-6 w-6 text-foreground" />
                              )}
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-semibold text-foreground">{module.title}</h4>
                              <p className="text-gray-300 text-sm mb-2">{module.description}</p>
                              
                              <div className="flex items-center gap-4">
                                <Badge variant="outline" className={`text-xs ${getDifficultyColor(module.difficulty)} text-foreground border-transparent`}>
                                  {module.difficulty}
                                </Badge>
                                <span className="text-xs text-gray-400">{module.estimatedTime}</span>
                                <span className="text-xs text-gray-400">
                                  {completedSections}/{module.sections.length} sections
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-xl font-bold text-elec-yellow mb-1">
                              {module.progress}%
                            </div>
                            <Button 
                              size="sm"
                              disabled={!isUnlocked}
                              className="bg-elec-yellow text-black hover:bg-yellow-500"
                            >
                              {module.progress === 0 ? (
                                <>
                                  <Play className="h-4 w-4 mr-1" />
                                  Start
                                </>
                              ) : module.progress === 100 ? (
                                'Review'
                              ) : (
                                'Continue'
                              )}
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>

                        <Progress value={module.progress} className="h-2 mb-4" />

                        {/* Learning Outcomes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-medium text-foreground mb-2">Learning Outcomes:</h5>
                            <ul className="text-xs text-gray-400 space-y-1">
                              {module.learningOutcomes.slice(0, 2).map((outcome, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <Target className="h-3 w-3 mt-0.5 text-elec-yellow flex-shrink-0" />
                                  {outcome}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="text-sm font-medium text-foreground mb-2">Section Types:</h5>
                            <div className="flex flex-wrap gap-1">
                              {Array.from(new Set(module.sections.map(s => s.type))).map(type => (
                                <Badge key={type} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {module.prerequisites.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-700">
                            <p className="text-xs text-gray-400">
                              Prerequisites: {module.prerequisites.join(', ')}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};