
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Globe, Phone, Users } from "lucide-react";

const ResourcesTab = () => {
  const freeResources = [
    {
      category: "Official Publications",
      icon: BookOpen,
      resources: [
        {
          name: "IET Wiring Matters Magazine",
          description: "Free technical articles and regulation updates",
          access: "Available online at theiet.org",
          type: "Free"
        },
        {
          name: "HSE Electrical Safety Publications",
          description: "Health and Safety Executive guidance documents",
          access: "hse.gov.uk/electricity",
          type: "Free"
        },
        {
          name: "NICEIC Technical Helpline",
          description: "Free advice on technical questions",
          access: "0333 015 6626 for registered electricians",
          type: "Free"
        }
      ]
    },
    {
      category: "Online Learning",
      icon: Globe,
      resources: [
        {
          name: "City & Guilds SmartScreen",
          description: "Practice questions and mock exams",
          access: "Through your training provider",
          type: "Free"
        },
        {
          name: "YouTube Channels",
          description: "Joe Robinson, Electrical2go, and ElectricalBible",
          access: "Free video tutorials and explanations",
          type: "Free"
        },
        {
          name: "Khan Academy",
          description: "Basic electrical engineering principles",
          access: "khanacademy.org",
          type: "Free"
        }
      ]
    },
    {
      category: "Mobile Apps",
      icon: Phone,
      resources: [
        {
          name: "18th Edition Regs",
          description: "Quick reference for BS 7671 regulations",
          access: "Available on iOS and Android",
          type: "Paid"
        },
        {
          name: "Electrical Calculations",
          description: "Practice calculations on the go",
          access: "Various apps available",
          type: "Free/Paid"
        },
        {
          name: "Quizlet",
          description: "Create and use flashcards for memorisation",
          access: "quizlet.com or mobile app",
          type: "Free/Premium"
        }
      ]
    },
    {
      category: "Study Communities",
      icon: Users,
      resources: [
        {
          name: "Reddit r/electricians",
          description: "Community discussions and Q&A",
          access: "reddit.com/r/electricians",
          type: "Free"
        },
        {
          name: "ElectriciansForums",
          description: "UK-focused electrical trade discussions",
          access: "electriciansforums.net",
          type: "Free"
        },
        {
          name: "Local Study Groups",
          description: "Form groups with fellow apprentices",
          access: "Through your training provider or college",
          type: "Free"
        }
      ]
    }
  ];

  const recommendedBooks = [
    {
      title: "BS 7671:2018 18th Edition",
      author: "IET",
      description: "The essential wiring regulations - your exam bible",
      price: "£90-110",
      essential: true
    },
    {
      title: "On-Site Guide",
      author: "IET",
      description: "Simplified guidance for common installations",
      price: "£40-50",
      essential: true
    },
    {
      title: "Guidance Note 3: Inspection & Testing",
      author: "IET",
      description: "Detailed procedures for testing electrical installations",
      price: "£50-60",
      essential: false
    },
    {
      title: "Advanced Electrical Installation Work",
      author: "Trevor Linsley",
      description: "Comprehensive textbook covering Level 3 topics",
      price: "£30-40",
      essential: false
    }
  ];

  const practiceResources = [
    {
      type: "Mock Exams",
      sources: [
        "City & Guilds official practice papers",
        "EAL sample assessments",
        "Training provider mock exams",
        "Online test platforms"
      ],
      tips: "Take under exam conditions with time limits"
    },
    {
      type: "Calculation Practice",
      sources: [
        "Textbook exercises",
        "Online calculation tools",
        "Past paper questions",
        "Mobile apps with random problems"
      ],
      tips: "Practice until calculations become automatic"
    },
    {
      type: "Regulation Practice",
      sources: [
        "BS 7671 appendices",
        "On-Site Guide exercises",
        "Quick reference cards",
        "Flashcard apps"
      ],
      tips: "Focus on most commonly tested regulations"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Free Study Resources</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {freeResources.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="h-5 w-5 text-elec-yellow" />
                    <h3 className="font-semibold text-white">{category.category}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {category.resources.map((resource, resourceIndex) => (
                      <div key={resourceIndex} className="bg-black/20 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-medium text-white text-sm">{resource.name}</h4>
                          <Badge 
                            variant={resource.type === "Free" ? "success" : "outline"} 
                            className="text-xs"
                          >
                            {resource.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{resource.description}</p>
                        <p className="text-xs text-elec-yellow">{resource.access}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Essential Textbooks & References</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedBooks.map((book, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white">{book.title}</h4>
                  {book.essential && (
                    <Badge variant="yellow" className="text-xs">
                      Essential
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">by {book.author}</p>
                <p className="text-sm text-muted-foreground mb-3">{book.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-elec-yellow">{book.price}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Practice & Assessment Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {practiceResources.map((practice, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">{practice.type}</h3>
                <ul className="space-y-2 mb-4">
                  {practice.sources.map((source, sourceIndex) => (
                    <li key={sourceIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                      {source}
                    </li>
                  ))}
                </ul>
                <div className="bg-elec-yellow/10 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-elec-yellow">Tip:</strong> {practice.tips}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300">Study Budget Tips with Elec-Mate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-white mb-2">Free First</h4>
              <p>Start with free resources before investing in paid materials. Many apprentices pass using mainly free resources available through Elec-Mate and other platforms.</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Essential vs Nice-to-Have</h4>
              <p>BS 7671 and On-Site Guide are essential. Other books can wait until you've mastered the basics with Elec-Mate's study tools.</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Second-Hand Options</h4>
              <p>Look for used textbooks from previous students, but ensure they're the current edition. Use Elec-Mate's community to find study partners for cost sharing.</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Library Access</h4>
              <p>Many local libraries have electrical textbooks, and college libraries often have extended borrowing periods. Complement this with Elec-Mate's digital resources.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesTab;
