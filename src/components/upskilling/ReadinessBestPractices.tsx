
import { Target, Clock, Users, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ReadinessBestPractices = () => {
  const bestPractices = [
    {
      category: "Time Management",
      icon: Clock,
      practices: [
        "Allow adequate time for thorough readiness checks",
        "Don't rush due to commercial pressure",
        "Build buffer time into testing schedules",
        "Consider complexity of the installation"
      ]
    },
    {
      category: "Communication",
      icon: Users,
      practices: [
        "Brief all team members on testing procedures",
        "Establish clear communication protocols",
        "Ensure client understands testing implications",
        "Coordinate with other trades on site"
      ]
    },
    {
      category: "Risk Assessment",
      icon: AlertCircle,
      practices: [
        "Continuously assess changing site conditions",
        "Consider environmental factors affecting tests",
        "Evaluate impact on building occupants",
        "Plan for emergency procedures"
      ]
    },
    {
      category: "Quality Assurance",
      icon: Target,
      practices: [
        "Use consistent readiness check procedures",
        "Maintain detailed records of all checks",
        "Review and learn from previous experiences",
        "Seek peer review for complex installations"
      ]
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Target className="h-5 w-5 text-elec-yellow" />
          Best Practices for Readiness Confirmation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground leading-relaxed">
          These practices have been developed from industry experience and help ensure consistent, thorough readiness confirmation across all types of electrical installations.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2">
          {bestPractices.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div key={index} className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <IconComponent className="h-5 w-5 text-elec-yellow" />
                  <h3 className="text-foreground font-medium">{category.category}</h3>
                </div>
                <ul className="space-y-2">
                  {category.practices.map((practice, practiceIndex) => (
                    <li key={practiceIndex} className="text-foreground text-sm flex items-start gap-2">
                      <span className="text-elec-yellow text-xs mt-1">•</span>
                      {practice}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <h3 className="text-green-200 font-medium mb-3">Professional Development</h3>
          <p className="text-foreground text-sm leading-relaxed">
            Regularly review and update your readiness confirmation procedures. Stay informed about new equipment types, 
            changing regulations, and industry best practices. Consider joining professional bodies and attending 
            continuing professional development courses to maintain competency.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
