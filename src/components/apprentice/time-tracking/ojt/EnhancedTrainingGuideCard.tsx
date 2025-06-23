
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, XCircle, Clock, Target } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const EnhancedTrainingGuideCard = () => {
  const isMobile = useIsMobile();

  const whatCounts = [
    {
      category: "Formal Learning",
      items: [
        "Theory lessons and lectures",
        "Classroom-based training sessions",
        "Online learning modules and courses",
        "Educational workshops and seminars"
      ]
    },
    {
      category: "Practical Training",
      items: [
        "Shadowing experienced colleagues",
        "Mentoring and coaching sessions",
        "Skills practice away from daily tasks",
        "Simulation and training exercises"
      ]
    },
    {
      category: "Assessment & Development",
      items: [
        "Learning support sessions",
        "Progress reviews and feedback",
        "Portfolio development time",
        "Research and study time"
      ]
    },
    {
      category: "External Activities",
      items: [
        "Industry visits and site tours",
        "Trade competitions and events",
        "Professional networking events",
        "Skills competitions and assessments"
      ]
    }
  ];

  const whatDoesntCount = [
    {
      category: "Regular Work Duties",
      items: [
        "Day-to-day operational tasks",
        "Routine maintenance work",
        "Standard client interactions",
        "Administrative paperwork"
      ]
    },
    {
      category: "Informal Learning",
      items: [
        "Casual conversations with colleagues",
        "Reading during break times",
        "Self-directed browsing",
        "Social media or entertainment"
      ]
    },
    {
      category: "Non-Learning Activities",
      items: [
        "General meetings (unless training focused)",
        "Travel time to work locations",
        "Equipment maintenance",
        "Lunch breaks and personal time"
      ]
    }
  ];

  const evidenceRequirements = [
    "Detailed records of training activities and duration",
    "Certificates of completion from courses",
    "Photographs of practical training work",
    "Projects, assignments, and assessments",
    "Witness testimonials from trainers or mentors",
    "Learning reflections and progress notes"
  ];

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-elec-yellow" />
          Off-the-Job Training Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Introduction */}
        <div className="bg-elec-dark p-4 rounded-lg border border-elec-yellow/20">
          <div className="flex items-start gap-3 mb-3">
            <Clock className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-elec-yellow font-medium mb-2">20% Minimum Requirement</h3>
              <p className="text-sm text-muted-foreground">
                Off-the-job training is learning that takes place outside of day-to-day work duties, 
                but within your paid working hours. This must represent at least 20% of your total working time.
              </p>
            </div>
          </div>
        </div>

        {/* What Counts Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <h3 className="text-lg font-semibold text-green-400">What Counts as Off-the-Job Training</h3>
          </div>
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
            {whatCounts.map((category, index) => (
              <Card key={index} className="bg-green-500/10 border-green-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-400 text-base">{category.category}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* What Doesn't Count Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="h-5 w-5 text-red-400" />
            <h3 className="text-lg font-semibold text-red-400">What Doesn't Count</h3>
          </div>
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
            {whatDoesntCount.map((category, index) => (
              <Card key={index} className="bg-red-500/10 border-red-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-red-400 text-base">{category.category}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm">
                        <XCircle className="h-3 w-3 text-red-400 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Evidence Requirements */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-semibold text-elec-yellow">Evidence Requirements</h3>
          </div>
          <Card className="bg-elec-yellow/10 border-elec-yellow/30">
            <CardContent className="pt-4">
              <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
                {evidenceRequirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Target className="h-3 w-3 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{requirement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedTrainingGuideCard;
