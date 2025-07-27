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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Overall Progress
            <Badge variant={overallProgress >= 100 ? "default" : "secondary"}>
              {overallProgress}%
            </Badge>
          </CardTitle>
          <CardDescription>
            {userSelection.qualification?.title} • {userSelection.qualification?.awarding_body}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={overallProgress} className="w-full" />
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-semibold">{completedCategories}</span>
              </div>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="font-semibold">{inProgressCategories}</span>
              </div>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <AlertCircle className="h-4 w-4 text-gray-400" />
                <span className="font-semibold">{notStartedCategories}</span>
              </div>
              <p className="text-xs text-muted-foreground">Not Started</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Category Progress</h3>
        <div className="grid gap-4">
          {compliance.map((complianceRecord) => {
            const category = categories.find(c => c.id === complianceRecord.category_id);
            if (!category) return null;

            const getStatusIcon = () => {
              if (complianceRecord.compliance_percentage >= 100) {
                return <CheckCircle className="h-5 w-5 text-green-600" />;
              } else if (complianceRecord.compliance_percentage > 0) {
                return <Clock className="h-5 w-5 text-yellow-600" />;
              } else {
                return <AlertCircle className="h-5 w-5 text-gray-400" />;
              }
            };

            const getStatusColor = () => {
              if (complianceRecord.compliance_percentage >= 100) return "default";
              if (complianceRecord.compliance_percentage > 0) return "secondary";
              return "outline";
            };

            return (
              <Card key={complianceRecord.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon()}
                      <h4 className="font-medium">{category.name}</h4>
                    </div>
                    <Badge variant={getStatusColor()}>
                      {complianceRecord.compliance_percentage}%
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {category.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Portfolio Entries</span>
                      <span>
                        {complianceRecord.completed_entries} / {complianceRecord.required_entries}
                      </span>
                    </div>
                    <Progress 
                      value={(complianceRecord.completed_entries / complianceRecord.required_entries) * 100} 
                      className="w-full" 
                    />
                  </div>

                  {category.learning_outcomes && category.learning_outcomes.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Learning Outcomes:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {category.learning_outcomes.slice(0, 2).map((outcome, index) => (
                          <li key={index}>• {outcome}</li>
                        ))}
                        {category.learning_outcomes.length > 2 && (
                          <li>• And {category.learning_outcomes.length - 2} more...</li>
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