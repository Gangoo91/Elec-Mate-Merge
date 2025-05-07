
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import MentalHealthMate from "@/components/mental-health/MentalHealthMate";

const ElectricianMentalHealth = () => {
  const resources = [
    {
      id: 1,
      title: "Managing Workplace Stress",
      description: "Techniques for handling stress on job sites and during training",
      type: "Guide",
      link: "/electrician/mental-health/stress-management"
    },
    {
      id: 2,
      title: "Electrician Support Network",
      description: "Connect with fellow electrical professionals in a supportive environment",
      type: "Community",
      link: "/electrician/mental-health/support-network"
    },
    {
      id: 3,
      title: "Work-Life Balance",
      description: "Strategies for maintaining balance during your electrical career",
      type: "Workshop",
      link: "/electrician/mental-health/work-life-balance"
    },
    {
      id: 4,
      title: "Crisis Resources",
      description: "Immediate support options for urgent mental health concerns",
      type: "Helpline",
      link: "/electrician/mental-health/crisis-resources"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Mental Health Hub</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Resources and support for maintaining wellbeing during your electrical career
          </p>
        </div>
        <Link to="/electrical-hub" className="self-start sm:self-auto">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">Back to Electrical Hub</Button>
        </Link>
      </div>
      
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Heart className="h-5 w-5 text-elec-yellow" />
            Your Wellbeing Matters
          </CardTitle>
          <CardDescription className="text-sm">
            The electrical trade can be demanding. Remember to prioritise your mental health.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm sm:text-base mb-4">
            If you're experiencing distress or need immediate support, contact the Samaritans at <span className="font-medium">116 123</span> (free, 24/7)
          </p>
        </CardContent>
      </Card>

      {/* Mental Health Mate feature */}
      <MentalHealthMate />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {resources.map((resource) => (
          <Link 
            to={resource.link} 
            key={resource.id} 
            className="block transition-all hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow focus-visible:ring-offset-2 rounded-lg"
          >
            <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:shadow-md hover:border-elec-yellow/30 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base sm:text-xl">{resource.title}</CardTitle>
                  <span className="text-xs px-2 py-1 bg-elec-yellow/10 rounded-md text-elec-yellow">
                    {resource.type}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{resource.description}</p>
                <Button className="w-full text-sm" size="sm">Access Resource</Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ElectricianMentalHealth;
