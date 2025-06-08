
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import { BookOpen, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MentalHealthResources = () => {
  const resources = [
    {
      title: "Mind - Mental Health Charity",
      description: "Information and support for mental health problems",
      url: "https://www.mind.org.uk/",
      type: "Website"
    },
    {
      title: "NHS Mental Health Services",
      description: "Find local NHS mental health support and services",
      url: "https://www.nhs.uk/mental-health/",
      type: "Healthcare"
    },
    {
      title: "Samaritans",
      description: "Free confidential emotional support 24/7",
      url: "https://www.samaritans.org/",
      type: "Helpline"
    },
    {
      title: "CALM - Campaign Against Living Miserably", 
      description: "Support specifically for men facing difficult times",
      url: "https://www.thecalmzone.net/",
      type: "Support"
    },
    {
      title: "Mental Health First Aid England",
      description: "Training and resources for mental health awareness",
      url: "https://mhfaengland.org/",
      type: "Training"
    },
    {
      title: "Electrical Industries Charity",
      description: "Practical, emotional and financial support for electrical workers",
      url: "https://www.electricalcharity.org/",
      type: "Industry Support"
    }
  ];

  const selfHelpResources = [
    {
      title: "Stress Management Techniques",
      description: "Practical techniques for managing workplace stress",
      type: "Guide"
    },
    {
      title: "Mindfulness for Apprentices",
      description: "Simple mindfulness exercises you can do during breaks",
      type: "Audio/Video"
    },
    {
      title: "Work-Life Balance Planner",
      description: "Tool to help you plan and maintain healthy boundaries",
      type: "Interactive Tool"
    },
    {
      title: "Mental Health First Aid",
      description: "How to recognise and respond to mental health issues in yourself and others",
      type: "Educational"
    }
  ];

  return (
    <MentalHealthPageLayout
      title="Mental Health Resources"
      description="Comprehensive resources and support options for apprentice wellbeing"
      icon={<BookOpen className="h-6 w-6 text-blue-400" />}
      color="blue"
    >
      <div className="space-y-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow">External Support Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((resource, index) => (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-white">{resource.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-elec-yellow/10 rounded-md text-elec-yellow">
                      {resource.type}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-elec-yellow/20 hover:bg-elec-yellow/10"
                    onClick={() => window.open(resource.url, '_blank')}
                  >
                    Visit Resource
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow">Self-Help Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selfHelpResources.map((resource, index) => (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-white">{resource.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-blue-500/10 rounded-md text-blue-400">
                      {resource.type}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-elec-yellow/20 hover:bg-elec-yellow/10"
                  >
                    Access Resource
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow">Emergency Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center border border-red-500/20 rounded-lg p-4 bg-red-500/5">
                <h4 className="font-semibold text-red-400 mb-2">🚨 Emergency</h4>
                <p className="text-2xl font-bold text-white mb-1">999</p>
                <p className="text-xs text-muted-foreground">Immediate danger or serious mental health crisis</p>
              </div>
              
              <div className="text-center border border-orange-500/20 rounded-lg p-4 bg-orange-500/5">
                <h4 className="font-semibold text-orange-400 mb-2">📞 Crisis Support</h4>
                <p className="text-lg font-bold text-white mb-1">116 123</p>
                <p className="text-xs text-muted-foreground">Samaritans - Free 24/7 emotional support</p>
              </div>
              
              <div className="text-center border border-blue-500/20 rounded-lg p-4 bg-blue-500/5">
                <h4 className="font-semibold text-blue-400 mb-2">💬 Text Support</h4>
                <p className="text-lg font-bold text-white mb-1">Text SHOUT to 85258</p>
                <p className="text-xs text-muted-foreground">Free 24/7 crisis text line</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MentalHealthPageLayout>
  );
};

export default MentalHealthResources;
