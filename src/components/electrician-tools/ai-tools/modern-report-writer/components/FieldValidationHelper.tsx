import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Info,
  BookOpen,
  Zap
} from "lucide-react";

interface ValidationRule {
  id: string;
  type: 'required' | 'format' | 'compliance' | 'recommendation';
  message: string;
  status: 'pass' | 'warning' | 'error' | 'info';
  regulation?: string; // BS 7671 reference
}

interface FieldValidationHelperProps {
  fieldId: string;
  value: string;
  rules?: ValidationRule[];
  showCompliance?: boolean;
}

const FieldValidationHelper: React.FC<FieldValidationHelperProps> = ({
  fieldId,
  value,
  rules = [],
  showCompliance = true
}) => {
  // Generate validation rules based on field type
  const generateRules = (): ValidationRule[] => {
    if (rules.length > 0) return rules;

    const baseRules: ValidationRule[] = [];

    switch (fieldId) {
      case 'inspectorQualification':
        baseRules.push(
          {
            id: '1',
            type: 'compliance',
            message: 'Inspector must hold appropriate qualifications per BS 7671',
            status: value ? 'pass' : 'warning',
            regulation: 'BS 7671:2018 Section 610.1'
          },
          {
            id: '2',
            type: 'recommendation',
            message: 'City & Guilds 2391 or equivalent recommended',
            status: value.includes('2391') ? 'pass' : 'info',
            regulation: 'Industry Standard'
          }
        );
        break;
      case 'overallAssessment':
        baseRules.push(
          {
            id: '1',
            type: 'required',
            message: 'Overall assessment must be specified',
            status: value ? 'pass' : 'error'
          },
          {
            id: '2',
            type: 'compliance',
            message: 'Assessment must follow BS 7671 criteria',
            status: ['satisfactory', 'unsatisfactory'].includes(value) ? 'pass' : 'warning',
            regulation: 'BS 7671:2018 Section 631'
          }
        );
        break;
      case 'extentOfInspection':
        baseRules.push(
          {
            id: '1',
            type: 'required',
            message: 'Extent of inspection must be documented',
            status: value ? 'pass' : 'error'
          },
          {
            id: '2',
            type: 'compliance',
            message: 'Minimum 10% testing recommended for domestic properties',
            status: value.includes('10-test') || value.includes('25-test') || value.includes('100-test') ? 'pass' : 'info',
            regulation: 'BS 7671:2018 Section 634.2'
          }
        );
        break;
      default:
        return [];
    }

    return baseRules;
  };

  const validationRules = generateRules();

  if (validationRules.length === 0) {
    return null;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return CheckCircle2;
      case 'warning': return AlertTriangle;
      case 'error': return XCircle;
      case 'info': return Info;
      default: return Info;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-400 border-green-500/30 bg-green-500/10';
      case 'warning': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      case 'error': return 'text-red-400 border-red-500/30 bg-red-500/10';
      case 'info': return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
      default: return 'text-muted-foreground border-muted/30 bg-muted/10';
    }
  };

  const passCount = validationRules.filter(rule => rule.status === 'pass').length;
  const totalRules = validationRules.length;

  return (
    <Card className="bg-elec-card border-elec-yellow/30 p-4 mt-2">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-elec-yellow" />
          <span className="text-sm font-medium text-white">Field Validation</span>
          <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-yellow">
            {passCount}/{totalRules} Checks
          </Badge>
        </div>
        
        {showCompliance && (
          <Badge 
            variant="outline" 
            className="text-xs border-blue-500/30 text-blue-400"
          >
            <BookOpen className="h-3 w-3 mr-1" />
            BS 7671:2018
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        {validationRules.map((rule) => {
          const IconComponent = getStatusIcon(rule.status);
          
          return (
            <div
              key={rule.id}
              className={`p-3 rounded-lg border ${getStatusColor(rule.status)} transition-all`}
            >
              <div className="flex items-start gap-3">
                <IconComponent className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">
                    {rule.message}
                  </div>
                  {rule.regulation && (
                    <div className="text-xs opacity-75 mt-1">
                      Reference: {rule.regulation}
                    </div>
                  )}
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ml-2 ${getStatusColor(rule.status)}`}
                >
                  {rule.type}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>

      {/* Compliance Score */}
      {showCompliance && (
        <div className="mt-4 pt-3 border-t border-elec-yellow/20">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Compliance Score:</span>
            <div className="flex items-center gap-2">
              <div className={`text-sm font-medium ${
                passCount === totalRules ? 'text-green-400' :
                passCount >= totalRules * 0.7 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {Math.round((passCount / totalRules) * 100)}%
              </div>
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  passCount === totalRules ? 'border-green-500/30 text-green-400' :
                  passCount >= totalRules * 0.7 ? 'border-yellow-500/30 text-yellow-400' : 'border-red-500/30 text-red-400'
                }`}
              >
                {passCount === totalRules ? 'Excellent' :
                 passCount >= totalRules * 0.7 ? 'Good' : 'Needs Attention'}
              </Badge>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default FieldValidationHelper;