import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useQualifications } from '@/hooks/qualification/useQualifications';

const QualificationCompliance = () => {
  const { userSelection, compliance, categories, loading } = useQualifications();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Compliance Data...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (!userSelection) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Qualification Compliance</CardTitle>
          <CardDescription>
            Select a qualification to track your compliance and progress.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const overallProgress = compliance.length > 0 
    ? Math.round(compliance.reduce((sum, c) => sum + c.compliance_percentage, 0) / compliance.length)
    : 0;

  const completedCategories = compliance.filter(c => c.compliance_percentage >= 100).length;
  const inProgressCategories = compliance.filter(c => c.compliance_percentage > 0 && c.compliance_percentage < 100).length;
  const notStartedCategories = compliance.filter(c => c.compliance_percentage === 0).length;

  return (
    <div className="space-y-6 bg-elec-gray min-h-screen p-4">
      {/* Main Progress Card - Simplified */}
      <Card className="border-elec-yellow/20 bg-elec-dark">
        <CardContent className="p-6 text-center">
          {/* Smaller percentage at the top */}
          <div className="text-3xl font-bold text-elec-yellow mb-3">
            {overallProgress}%
          </div>
          
          {/* Title and description */}
          <div className="space-y-2 mb-6">
            <h2 className="text-xl font-bold text-elec-light">Overall Progress</h2>
            <p className="text-sm text-elec-light/70 max-w-md mx-auto leading-relaxed">
              {userSelection.qualification?.title}
            </p>
            <p className="text-xs text-elec-light/60">
              {userSelection.qualification?.awarding_body}
            </p>
          </div>
          
          {/* Progress bar */}
          <div className="mb-6">
            <Progress 
              value={overallProgress} 
              className="w-full h-2 bg-elec-card"
            />
          </div>
          
          {/* Stats grid - Mobile optimized */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <CheckCircle className="h-5 w-5 text-green-400 mx-auto" />
              <div className="text-2xl font-bold text-green-400">{completedCategories}</div>
              <p className="text-xs text-elec-light/70 leading-tight">Completed</p>
            </div>
            <div className="text-center space-y-2">
              <Clock className="h-5 w-5 text-orange-400 mx-auto" />
              <div className="text-2xl font-bold text-orange-400">{inProgressCategories}</div>
              <p className="text-xs text-elec-light/70 leading-tight">In Progress</p>
            </div>
            <div className="text-center space-y-2">
              <AlertCircle className="h-5 w-5 text-red-400 mx-auto" />
              <div className="text-2xl font-bold text-red-400">{notStartedCategories}</div>
              <p className="text-xs text-elec-light/70 leading-tight">Not Started</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Progress Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-elec-light text-center">Category Progress</h3>
        <div className="grid gap-4">
          {compliance.map((complianceRecord) => {
            const category = categories.find(c => c.id === complianceRecord.category_id);
            if (!category) return null;

            const getStatusIcon = () => {
              if (complianceRecord.compliance_percentage >= 100) {
                return <CheckCircle className="h-5 w-5 text-green-400" />;
              } else if (complianceRecord.compliance_percentage > 0) {
                return <Clock className="h-5 w-5 text-orange-400" />;
              } else {
                return null; // No icon for not started
              }
            };

            return (
              <Card key={complianceRecord.id} className="border-elec-yellow/20 bg-elec-dark">
                <CardContent className="p-6">
                  {/* Percentage at the top - centered */}
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-elec-yellow mb-3">
                      {complianceRecord.compliance_percentage}%
                    </div>
                  </div>
                  
                  {/* Title - centered with optional status icon */}
                  <div className="text-center mb-4">
                    {getStatusIcon() && (
                      <div className="flex items-center justify-center mb-2">
                        {getStatusIcon()}
                      </div>
                    )}
                    <h4 className="font-semibold text-lg text-elec-light">{category.name}</h4>
                  </div>
                  
                  <p className="text-sm text-elec-light/70 mb-4 text-center leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Progress section */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-elec-light">
                      <span className="font-medium">Portfolio Entries</span>
                      <span className="font-bold">
                        {complianceRecord.completed_entries} / {complianceRecord.required_entries}
                      </span>
                    </div>
                    <Progress 
                      value={(complianceRecord.completed_entries / complianceRecord.required_entries) * 100} 
                      className="w-full h-3 bg-elec-card"
                    />
                  </div>

                  {/* Learning outcomes */}
                  {category.learning_outcomes && category.learning_outcomes.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                      <p className="text-xs font-medium text-elec-light/70 mb-2 text-center">Learning Outcomes:</p>
                      <ul className="text-xs text-elec-light/60 space-y-1">
                        {category.learning_outcomes.slice(0, 2).map((outcome, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-elec-yellow mt-1">•</span>
                            <span>{outcome}</span>
                          </li>
                        ))}
                        {category.learning_outcomes.length > 2 && (
                          <li className="flex items-start gap-2">
                            <span className="text-elec-yellow mt-1">•</span>
                            <span>And {category.learning_outcomes.length - 2} more...</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QualificationCompliance;