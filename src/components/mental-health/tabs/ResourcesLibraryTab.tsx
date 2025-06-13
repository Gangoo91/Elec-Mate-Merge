
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Video, Headphones, Download, ExternalLink, Star, Eye, Zap } from "lucide-react";

const ResourcesLibraryTab = () => {
  const resourceCategories = [
    {
      title: "Industry-Specific Guides",
      icon: <Zap className="h-5 w-5 text-elec-yellow" />,
      count: 25,
      description: "Mental health resources tailored specifically for electrical workers",
      items: [
        "Mental Health in the Electrical Industry",
        "Dealing with Workplace Pressure",
        "Managing Shift Work and Mental Health",
        "Construction Site Mental Wellbeing",
        "Self-Employment and Mental Health",
        "Seasonal Work and Emotional Balance"
      ]
    },
    {
      title: "Stress Management Guides",
      icon: <FileText className="h-5 w-5 text-blue-400" />,
      count: 18,
      description: "Comprehensive guides for managing workplace and personal stress",
      items: [
        "Quick Stress Relief Techniques",
        "Workplace Pressure Management",
        "Building Resilience at Work",
        "Recognising Burnout Signs",
        "Time Management for Wellbeing",
        "Work-Life Balance Strategies"
      ]
    },
    {
      title: "Video Resources",
      icon: <Video className="h-5 w-5 text-green-400" />,
      count: 22,
      description: "Educational videos and demonstrations for visual learners",
      items: [
        "Breathing Exercise Tutorials",
        "Mental Health First Aid Training",
        "Mindfulness for Busy Professionals",
        "Stress Management Workshops",
        "Sleep Hygiene and Recovery",
        "Communication Skills Training"
      ]
    },
    {
      title: "Audio Content",
      icon: <Headphones className="h-5 w-5 text-purple-400" />,
      count: 30,
      description: "Podcasts, meditations, and audio support for on-the-go learning",
      items: [
        "Daily Meditation Sessions",
        "Sleep Stories for Better Rest",
        "Motivational Podcasts for Trades",
        "Relaxation Soundscapes",
        "Mental Health Conversations",
        "Industry Success Stories"
      ]
    },
    {
      title: "Interactive Tools",
      icon: <Download className="h-5 w-5 text-orange-400" />,
      count: 15,
      description: "Downloadable worksheets, planners, and assessment tools",
      items: [
        "Mental Health Self-Assessment",
        "Stress Level Tracker",
        "Mood Diary Templates",
        "Goal Setting Worksheets",
        "Emergency Contact Templates",
        "Self-Care Planning Tools"
      ]
    },
    {
      title: "Professional Development",
      icon: <FileText className="h-5 w-5 text-cyan-400" />,
      count: 12,
      description: "Resources for mental health and career growth",
      items: [
        "Confidence Building Guides",
        "Career Transition Support",
        "Leadership and Mental Health",
        "Mentoring Best Practices",
        "Workplace Communication",
        "Professional Boundaries"
      ]
    }
  ];

  const featuredResources = [
    {
      title: "Mental Health First Aid for Electricians",
      type: "Comprehensive Guide",
      description: "Essential knowledge for recognising and responding to mental health issues in the electrical workplace",
      duration: "25 min read",
      difficulty: "Beginner",
      rating: 4.9,
      views: 2150,
      category: "industry-specific"
    },
    {
      title: "Stress Management for Shift Workers",
      type: "Video Series",
      description: "5-part series covering stress management techniques specifically for electrical workers on shifts",
      duration: "60 mins total",
      difficulty: "All Levels",
      rating: 4.8,
      views: 1890,
      category: "video"
    },
    {
      title: "Mindfulness for Busy Electricians",
      type: "Audio Course",
      description: "Weekly podcast series featuring mindfulness practices designed for busy electrical professionals",
      duration: "30 mins per episode",
      difficulty: "Beginner",
      rating: 4.7,
      views: 3200,
      category: "audio"
    },
    {
      title: "Mental Health Toolkit for Trades",
      type: "Interactive Toolkit",
      description: "Comprehensive toolkit including self-assessments, worksheets, and planning templates",
      duration: "Self-paced",
      difficulty: "All Levels",
      rating: 4.8,
      views: 1650,
      category: "tools"
    },
    {
      title: "Dealing with Workplace Anxiety",
      type: "Practical Guide",
      description: "Evidence-based strategies for managing anxiety in high-pressure electrical work environments",
      duration: "20 min read",
      difficulty: "Intermediate",
      rating: 4.6,
      views: 2800,
      category: "guides"
    },
    {
      title: "Building Resilience in Construction",
      type: "Workshop Recording",
      description: "Recording of interactive workshop on developing emotional resilience in the construction industry",
      duration: "90 mins",
      difficulty: "Intermediate",
      rating: 4.9,
      views: 1200,
      category: "video"
    }
  ];

  const industrySpotlight = [
    {
      title: "Seasonal Affective Disorder in Outdoor Electrical Work",
      description: "Understanding and managing SAD when working outdoors during winter months",
      readTime: "15 min",
      category: "Seasonal Health"
    },
    {
      title: "Mental Health Challenges for Apprentices",
      description: "Supporting young people entering the electrical industry",
      readTime: "20 min",
      category: "Apprentice Support"
    },
    {
      title: "Self-Employment and Mental Wellbeing",
      description: "Managing the mental health challenges of running your own electrical business",
      readTime: "18 min",
      category: "Business Wellbeing"
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
            All resources are evidence-based, peer-reviewed, and tailored to the unique challenges faced by electrical professionals.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">120+</div>
              <div className="text-sm text-muted-foreground">Total Resources</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">4.8/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
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

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Industry Spotlight</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {industrySpotlight.map((resource, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4 hover:border-elec-yellow/40 transition-colors">
                <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow mb-2">
                  {resource.category}
                </Badge>
                <h4 className="font-semibold text-white mb-2">{resource.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{resource.readTime}</span>
                  <Button size="sm" variant="outline">
                    Read Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resourceCategories.map((category, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-colors">
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
                {category.items.slice(0, 4).map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-2 text-sm">
                    <ExternalLink className="h-3 w-3 text-elec-yellow flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
                {category.items.length > 4 && (
                  <li className="text-sm text-muted-foreground italic">
                    +{category.items.length - 4} more...
                  </li>
                )}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredResources.map((resource, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4 hover:border-elec-yellow/40 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow">
                        {resource.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{resource.duration}</span>
                    </div>
                    <h4 className="font-semibold text-white mb-2">{resource.title}</h4>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-elec-yellow mb-1">
                      <Star className="h-3 w-3 fill-current" />
                      {resource.rating}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Eye className="h-3 w-3" />
                      {resource.views}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/40">
                    {resource.difficulty}
                  </Badge>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80">
                      <Download className="h-3 w-3 mr-1" />
                      Access
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/20 bg-green-500/5">
        <CardHeader>
          <CardTitle className="text-green-400">Quick Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 justify-start border-green-500/20 hover:bg-green-500/10">
              <div className="text-left">
                <div className="font-semibold">Crisis Resources</div>
                <div className="text-sm text-muted-foreground">Immediate help and emergency contacts</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start border-blue-500/20 hover:bg-blue-500/10">
              <div className="text-left">
                <div className="font-semibold">Interactive Tools</div>
                <div className="text-sm text-muted-foreground">Mood trackers and self-assessment tools</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start border-purple-500/20 hover:bg-purple-500/10">
              <div className="text-left">
                <div className="font-semibold">Support Network</div>
                <div className="text-sm text-muted-foreground">Connect with peers and professionals</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesLibraryTab;
