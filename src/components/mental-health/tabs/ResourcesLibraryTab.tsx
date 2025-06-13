
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Video, Headphones, Download, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const ResourcesLibraryTab = () => {
  const resourceCategories = [
    {
      title: "Stress Management Guides",
      icon: <FileText className="h-5 w-5 text-blue-400" />,
      count: 12,
      description: "Comprehensive guides for managing workplace stress",
      items: [
        "Quick Stress Relief Techniques",
        "Workplace Pressure Management",
        "Building Resilience at Work",
        "Recognising Burnout Signs"
      ]
    },
    {
      title: "Video Resources",
      icon: <Video className="h-5 w-5 text-green-400" />,
      count: 8,
      description: "Educational videos and demonstrations",
      items: [
        "Breathing Exercise Tutorials",
        "Mental Health First Aid",
        "Work-Life Balance Tips",
        "Mindfulness for Electricians"
      ]
    },
    {
      title: "Audio Content",
      icon: <Headphones className="h-5 w-5 text-purple-400" />,
      count: 15,
      description: "Podcasts and guided meditations",
      items: [
        "Daily Meditation Sessions",
        "Sleep Stories for Better Rest",
        "Motivational Podcasts",
        "Relaxation Soundscapes"
      ]
    },
    {
      title: "Downloadable Materials",
      icon: <Download className="h-5 w-5 text-orange-400" />,
      count: 20,
      description: "PDFs, worksheets, and reference materials",
      items: [
        "Mental Health Action Plans",
        "Mood Tracking Sheets",
        "Emergency Contact Templates",
        "Self-Care Checklists"
      ]
    }
  ];

  const featuredResources = [
    {
      title: "Mental Health First Aid for Trades",
      type: "Guide",
      description: "Essential knowledge for supporting colleagues in crisis",
      duration: "15 min read",
      difficulty: "Beginner"
    },
    {
      title: "Mindful Electrician Toolkit",
      type: "Toolkit",
      description: "Practical mindfulness techniques for busy workdays",
      duration: "30 min",
      difficulty: "All Levels"
    },
    {
      title: "Building Emotional Resilience",
      type: "Workshop",
      description: "Interactive workshop on developing emotional strength",
      duration: "1 hour",
      difficulty: "Intermediate"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Mental Health Resources Library</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Access our comprehensive collection of mental health resources designed specifically for the electrical industry.
            All resources are evidence-based and tailored to the unique challenges faced by electrical professionals.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">55+</div>
              <div className="text-sm text-muted-foreground">Total Resources</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">4.8/5</div>
              <div className="text-sm text-muted-foreground">User Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Access</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">Free</div>
              <div className="text-sm text-muted-foreground">All Content</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resourceCategories.map((category, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {category.icon}
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </div>
                <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/40">
                  {category.count} items
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-2 text-sm">
                    <ExternalLink className="h-3 w-3 text-elec-yellow flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-4" size="sm">
                Browse {category.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Featured Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredResources.map((resource, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow">
                    {resource.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{resource.duration}</span>
                </div>
                <h4 className="font-semibold text-white mb-2">{resource.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Level: {resource.difficulty}</span>
                  <Button size="sm" variant="outline">
                    Access
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesLibraryTab;
