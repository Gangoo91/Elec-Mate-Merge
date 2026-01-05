import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, CheckCircle, AlertTriangle, Eye, Shield } from 'lucide-react';

interface InspectionSectionProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const inspectionCategories = {
  connections: {
    title: 'Connections & Terminations',
    icon: '🔗',
    items: [
      {
        id: 'conductor_connections',
        text: 'Connection of conductors properly made and secure',
        clause: '526.5'
      },
      {
        id: 'termination_adequacy',
        text: 'Adequacy of terminations and connections',
        clause: '526.1'
      },
      {
        id: 'conductor_identification',
        text: 'Identification of conductors (live, neutral, earth)',
        clause: '514.3'
      },
      {
        id: 'polarity_connections',
        text: 'Correct polarity at all single pole devices',
        clause: '612.6'
      }
    ]
  },
  installation: {
    title: 'Installation Methods',
    icon: '⚡',
    items: [
      {
        id: 'cable_selection',
        text: 'Selection and erection of equipment suitable for external influences',
        clause: '512.2'
      },
      {
        id: 'cable_routing',
        text: 'Routing of cables in prescribed safe zones or adequately protected',
        clause: '522.6'
      },
      {
        id: 'mechanical_protection',
        text: 'Adequate protection against mechanical damage',
        clause: '522.6'
      },
      {
        id: 'environmental_conditions',
        text: 'Environmental conditions and IP rating compliance',
        clause: '512.2'
      }
    ]
  },
  safety: {
    title: 'Safety & Protection',
    icon: '🛡️',
    items: [
      {
        id: 'earthing_bonding',
        text: 'Earthing and bonding arrangements',
        clause: '411.3'
      },
      {
        id: 'rcd_protection',
        text: 'RCD protection where required (special locations)',
        clause: '411.3.3'
      },
      {
        id: 'fire_barriers',
        text: 'Presence of fire barriers, suitable seals and protection',
        clause: '527.1'
      },
      {
        id: 'warning_notices',
        text: 'Presence of appropriate warning notices and labels',
        clause: '514.12'
      }
    ]
  },
  compliance: {
    title: 'General Compliance',
    icon: '📋',
    items: [
      {
        id: 'accessibility',
        text: 'Accessibility of equipment for operation and maintenance',
        clause: '513.1'
      },
      {
        id: 'isolation_switching',
        text: 'Provision of isolation and switching devices',
        clause: '462.1'
      },
      {
        id: 'overcurrent_protection',
        text: 'Selection and coordination of overcurrent protective devices',
        clause: '430.3'
      },
      {
        id: 'documentation',
        text: 'Adequacy of documentation provided',
        clause: '514.9'
      }
    ]
  }
};

const InspectionSection = ({ formData, onUpdate }: InspectionSectionProps) => {
  const handleInspectionUpdate = (itemId: string, outcome: string, notes?: string) => {
    const inspectionResults = { ...(formData.inspectionResults || {}) };
    inspectionResults[itemId] = { outcome, notes: notes || '' };
    onUpdate('inspectionResults', inspectionResults);
  };

  const getInspectionStats = () => {
    const results = formData.inspectionResults || {};
    const total = Object.keys(inspectionCategories).reduce((acc, cat) => 
      acc + inspectionCategories[cat as keyof typeof inspectionCategories].items.length, 0
    );
    const completed = Object.keys(results).filter(key => results[key]?.outcome).length;
    const satisfactory = Object.keys(results).filter(key => 
      results[key]?.outcome === 'satisfactory'
    ).length;
    const defects = Object.keys(results).filter(key => 
      ['unsatisfactory', 'C1', 'C2', 'C3'].includes(results[key]?.outcome)
    ).length;

    return { total, completed, satisfactory, defects };
  };

  const stats = getInspectionStats();

  return (
    <div className="space-y-6">
      {/* Inspection Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Search className="h-5 w-5 text-primary" />
            Visual Inspection Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Eye className="h-4 w-4" />
            <AlertDescription>
              Visual inspection is mandatory for all electrical work. Each item must be assessed 
              in accordance with BS 7671:2018 requirements.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-muted/30 rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Items</div>
            </div>
            <div className="p-3 bg-blue-50/80 dark:bg-blue-950/30 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
              <div className="text-sm text-blue-600">Completed</div>
            </div>
            <div className="p-3 bg-green-50/80 dark:bg-green-950/30 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{stats.satisfactory}</div>
              <div className="text-sm text-green-600">Satisfactory</div>
            </div>
            <div className="p-3 bg-red-50/80 dark:bg-red-950/30 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-600">{stats.defects}</div>
              <div className="text-sm text-red-600">Defects Found</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inspection Categories */}
      {Object.entries(inspectionCategories).map(([categoryKey, category]) => (
        <Card key={categoryKey}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <span className="text-xl">{category.icon}</span>
              {category.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {category.items.map((item) => {
              const result = formData.inspectionResults?.[item.id];
              
              return (
                <div key={item.id} className="border border-border/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Label className="text-sm font-medium leading-relaxed">
                          {item.text}
                        </Label>
                        <Badge variant="outline" className="text-xs">
                          BS 7671: {item.clause}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs text-muted-foreground mb-1 block">
                            Inspection Result *
                          </Label>
                          <Select
                            value={result?.outcome || ''}
                            onValueChange={(value) => handleInspectionUpdate(item.id, value, result?.notes)}
                          >
                            <SelectTrigger className="text-sm">
                              <SelectValue placeholder="Select outcome" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="satisfactory">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-3 w-3 text-green-600" />
                                  Satisfactory
                                </div>
                              </SelectItem>
                              <SelectItem value="unsatisfactory">
                                <div className="flex items-center gap-2">
                                  <AlertTriangle className="h-3 w-3 text-red-600" />
                                  Unsatisfactory
                                </div>
                              </SelectItem>
                              <SelectItem value="C1">
                                <div className="flex items-center gap-2">
                                  <AlertTriangle className="h-3 w-3 text-red-700" />
                                  C1 - Danger present
                                </div>
                              </SelectItem>
                              <SelectItem value="C2">
                                <div className="flex items-center gap-2">
                                  <AlertTriangle className="h-3 w-3 text-orange-600" />
                                  C2 - Potentially dangerous
                                </div>
                              </SelectItem>
                              <SelectItem value="C3">
                                <div className="flex items-center gap-2">
                                  <AlertTriangle className="h-3 w-3 text-yellow-600" />
                                  C3 - Improvement recommended
                                </div>
                              </SelectItem>
                              <SelectItem value="na">N/A - Not applicable</SelectItem>
                              <SelectItem value="limitation">LIM - Inspection limitation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="text-xs text-muted-foreground mb-1 block">
                            Notes & Observations
                          </Label>
                          <Textarea
                            placeholder="Add notes, observations, or remedial actions required..."
                            value={result?.notes || ''}
                            onChange={(e) => handleInspectionUpdate(item.id, result?.outcome || '', e.target.value)}
                            className="text-sm min-h-[60px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Visual indicators */}
                  {result?.outcome && (
                    <div className="flex justify-end">
                      {result.outcome === 'satisfactory' && (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Satisfactory
                        </Badge>
                      )}
                      {['unsatisfactory', 'C1', 'C2', 'C3'].includes(result.outcome) && (
                        <Badge variant="destructive">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {result.outcome === 'unsatisfactory' ? 'Unsatisfactory' : result.outcome}
                        </Badge>
                      )}
                      {result.outcome === 'na' && (
                        <Badge variant="secondary">N/A</Badge>
                      )}
                      {result.outcome === 'limitation' && (
                        <Badge variant="outline">Limited</Badge>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}

      {/* Overall Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-primary" />
            Overall Inspection Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="overallAssessment" className="text-sm font-medium">
              Overall Visual Inspection Result *
            </Label>
            <Select
              value={formData.overallInspectionResult || ''}
              onValueChange={(value) => onUpdate('overallInspectionResult', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select overall result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="satisfactory">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Satisfactory - No defects found
                  </div>
                </SelectItem>
                <SelectItem value="unsatisfactory">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    Unsatisfactory - Defects require attention
                  </div>
                </SelectItem>
                <SelectItem value="limitation">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-amber-600" />
                    Limited inspection - Access restrictions apply
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="inspectionLimitations" className="text-sm font-medium">
              Inspection Limitations & Restrictions
            </Label>
            <Textarea
              id="inspectionLimitations"
              placeholder="Record any areas that could not be inspected, access limitations, or other restrictions that affected the inspection..."
              value={formData.inspectionLimitations || ''}
              onChange={(e) => onUpdate('inspectionLimitations', e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          
          <div>
            <Label htmlFor="remedialActions" className="text-sm font-medium">
              Remedial Actions Required
            </Label>
            <Textarea
              id="remedialActions"
              placeholder="Detail any immediate actions required, follow-up work needed, or recommendations for improvement..."
              value={formData.remedialActions || ''}
              onChange={(e) => onUpdate('remedialActions', e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          {stats.defects > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>{stats.defects} defect(s) identified.</strong> All defects must be addressed 
                and remedial actions documented before the installation can be considered compliant 
                with BS 7671.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InspectionSection;