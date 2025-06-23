
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, ExternalLink, Star, Clock, Users, Smartphone, Globe } from "lucide-react";

const ResourcesTab = () => {
  const essentialBooks = [
    {
      title: "BS 7671 18th Edition Wiring Regulations",
      authors: ["The IET"],
      rating: 5,
      price: "£95.00",
      category: "Regulations",
      description: "The essential reference for all electrical work in the UK",
      pros: ["Authoritative source", "Latest regulations", "Comprehensive coverage"],
      cons: ["Expensive", "Dense technical language", "Regular updates needed"],
      bestFor: "All electrical qualifications and professional practice"
    },
    {
      title: "On-Site Guide (BS 7671:2018)",
      authors: ["The IET"],
      rating: 5,
      price: "£45.00",
      category: "Practical Guide",
      description: "Simplified guidance for practical application of BS 7671",
      pros: ["Easy to navigate", "Practical examples", "Exam-friendly format"],
      cons: ["Not comprehensive", "Simplified view only"],
      bestFor: "18th Edition exam preparation and on-site reference"
    },
    {
      title: "Electrical Installation Work",
      authors: ["Brian Scaddan"],
      rating: 4.5,
      price: "£35.00",
      category: "Textbook",
      description: "Comprehensive textbook covering Level 2 and 3 electrical installation",
      pros: ["Clear explanations", "Good illustrations", "Practice questions"],
      cons: ["Can be basic for advanced topics", "Regular edition updates"],
      bestFor: "Level 2 and 3 apprentices and students"
    },
    {
      title: "Advanced Electrical Installation Work",
      authors: ["Brian Scaddan"],
      rating: 4.5,
      price: "£40.00",
      category: "Advanced",
      description: "Advanced concepts for Level 3 and beyond",
      pros: ["Detailed theory", "Complex calculations", "Industry focus"],
      cons: ["Challenging for beginners", "Requires strong foundation"],
      bestFor: "Level 3 students and practicing electricians"
    },
    {
      title: "Electrical Installation Testing & Inspection",
      authors: ["Michael Drury"],
      rating: 4.8,
      price: "£42.00",
      category: "Testing",
      description: "Comprehensive guide to testing and inspection procedures",
      pros: ["Detailed procedures", "Real-world examples", "Current standards"],
      cons: ["Technical complexity", "Equipment-specific"],
      bestFor: "2391 preparation and professional testing work"
    }
  ];

  const digitalResources = [
    {
      category: "Official Apps",
      resources: [
        {
          name: "IET Wiring Matters",
          type: "App",
          cost: "Free",
          description: "Official IET app with latest wiring regulations updates and guidance",
          features: ["Regulation updates", "Technical articles", "Video content", "Offline access"]
        },
        {
          name: "NICEIC Technical Manual",
          type: "App", 
          cost: "Subscription",
          description: "Comprehensive technical guidance and inspection procedures",
          features: ["Step-by-step procedures", "Certificate templates", "Technical helpline", "Regular updates"]
        }
      ]
    },
    {
      category: "Study Apps",
      resources: [
        {
          name: "Electrical Calculations Pro",
          type: "Mobile App",
          cost: "£4.99",
          description: "Advanced calculator for electrical calculations and formulas",
          features: ["Cable sizing", "Voltage drop", "Fault calculations", "Unit conversions"]
        },
        {
          name: "BS 7671 Quiz Master",
          type: "Mobile App",
          cost: "£2.99",
          description: "Practice questions for 18th Edition preparation",
          features: ["1000+ questions", "Progress tracking", "Explanations", "Timed tests"]
        }
      ]
    },
    {
      category: "Online Platforms",
      resources: [
        {
          name: "Electrical Training Alliance",
          type: "Website",
          cost: "Various",
          description: "Comprehensive online electrical training courses",
          features: ["Video tutorials", "Interactive modules", "Progress tracking", "Certification"]
        },
        {
          name: "Khan Academy - Physics",
          type: "Website",
          cost: "Free",
          description: "Fundamental physics concepts underlying electrical theory",
          features: ["Video lessons", "Practice exercises", "Progress tracking", "Multiple languages"]
        }
      ]
    }
  ];

  const practiceResources = [
    {
      type: "Mock Exams",
      providers: [
        {
          name: "City & Guilds Past Papers",
          cost: "£15-25 each",
          description: "Official past examination papers with marking schemes",
          coverage: "All C&G electrical qualifications",
          format: "PDF downloads with answers"
        },
        {
          name: "EAL Practice Tests",
          cost: "£20-30 each", 
          description: "Practice tests aligned with EAL qualification standards",
          coverage: "Level 2 and 3 electrical installation",
          format: "Online tests with instant feedback"
        }
      ]
    },
    {
      type: "Question Banks",
      providers: [
        {
          name: "Lecturio Electrical",
          cost: "£29/month",
          description: "Comprehensive question bank with detailed explanations",
          coverage: "18th Edition, Level 2-3, AM2 preparation",
          format: "Online platform with mobile app"
        },
        {
          name: "Study Electrical Online",
          cost: "£19/month",
          description: "Adaptive question system targeting weak areas",
          coverage: "All major electrical qualifications",
          format: "Web-based with progress analytics"
        }
      ]
    }
  ];

  const freeResources = [
    {
      name: "YouTube - John Ward Electrical",
      type: "Video Content",
      description: "Practical electrical videos covering real-world scenarios",
      topics: ["Installation techniques", "Testing procedures", "Safety practices", "Tool reviews"],
      subscribers: "150K+",
      quality: "Professional"
    },
    {
      name: "Electrical Safety First",
      type: "Educational Content",
      description: "Free safety guidance and educational materials",
      topics: ["Safety regulations", "Best practices", "Industry updates", "Consumer guidance"],
      quality: "Official",
      format: "Articles, videos, downloads"
    },
    {
      name: "IET Knowledge Network",
      type: "Professional Network",
      description: "Professional discussions and technical articles",
      topics: ["Industry trends", "Technical discussions", "Career advice", "Standards updates"],
      membership: "Free registration",
      community: "Professional engineers"
    },
    {
      name: "Reddit - r/electricians",
      type: "Community Forum",
      description: "Active community of electricians sharing knowledge",
      topics: ["Troubleshooting", "Career advice", "Tool discussions", "Code questions"],
      members: "300K+",
      activity: "Very active"
    }
  ];

  const studyPlanners = [
    {
      name: "Notion Electrical Study Template",
      cost: "Free",
      features: ["Progress tracking", "Resource library", "Calendar integration", "Note-taking"],
      bestFor: "Comprehensive planning and organisation"
    },
    {
      name: "Trello Study Board",
      cost: "Free",
      features: ["Kanban boards", "Progress visualisation", "Collaboration", "Mobile sync"],
      bestFor: "Visual learners and project management approach"
    },
    {
      name: "Google Workspace Education",
      cost: "Free",
      features: ["Document sharing", "Calendar scheduling", "Video meetings", "Cloud storage"],
      bestFor: "Collaborative study and group work"
    },
    {
      name: "Anki Flashcards",
      cost: "Free (iOS paid)",
      features: ["Spaced repetition", "Custom decks", "Progress analytics", "Cross-platform"],
      bestFor: "Memorisation and regular review"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Complete Study Resources Library</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Curated collection of the best study resources for electrical apprentices. From essential textbooks 
            to cutting-edge digital tools, find everything you need for examination success.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 border border-elec-yellow/20 rounded-lg">
              <BookOpen className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">25+</p>
              <p className="text-xs text-muted-foreground">Essential Books</p>
            </div>
            <div className="text-center p-3 border border-elec-yellow/20 rounded-lg">
              <Smartphone className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">15+</p>
              <p className="text-xs text-muted-foreground">Mobile Apps</p>
            </div>
            <div className="text-center p-3 border border-elec-yellow/20 rounded-lg">
              <Globe className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
              <p className="text-lg font-bold text-white">50+</p>
              <p className="text-xs text-muted-foreground">Online Resources</p>
            </div>
            <div className="text-center p-3 border border-elec-yellow/20 rounded-lg">
              <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">Free</p>
              <p className="text-xs text-muted-foreground">Community Access</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Essential Books */}
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400">Essential Textbooks & References</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {essentialBooks.map((book, index) => (
              <div key={index} className="border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white mb-1">{book.title}</h4>
                    <p className="text-sm text-blue-300">by {book.authors.join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-white">{book.rating}</span>
                    </div>
                    <Badge variant="outline" className="text-xs border-blue-400/30 text-blue-400">
                      {book.category}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{book.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <h5 className="font-medium text-green-400 text-sm mb-1">Pros:</h5>
                    <ul className="space-y-1">
                      {book.pros.map((pro, proIndex) => (
                        <li key={proIndex} className="text-xs text-muted-foreground flex items-start gap-1">
                          <span className="text-green-400">+</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-orange-400 text-sm mb-1">Cons:</h5>
                    <ul className="space-y-1">
                      {book.cons.map((con, conIndex) => (
                        <li key={conIndex} className="text-xs text-muted-foreground flex items-start gap-1">
                          <span className="text-orange-400">-</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-blue-400 text-sm mb-1">Best For:</h5>
                    <p className="text-xs text-muted-foreground">{book.bestFor}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-white">{book.price}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-blue-500/30">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Digital Resources */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <CardHeader>
          <CardTitle className="text-green-400">Digital Study Tools & Apps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {digitalResources.map((category, index) => (
              <div key={index}>
                <h4 className="font-semibold text-white mb-4">{category.category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.resources.map((resource, resourceIndex) => (
                    <div key={resourceIndex} className="border border-green-500/20 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h5 className="font-medium text-white">{resource.name}</h5>
                          <p className="text-sm text-green-300">{resource.type}</p>
                        </div>
                        <Badge variant="outline" className="text-xs border-green-400/30 text-green-400">
                          {resource.cost}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      
                      <div className="space-y-1">
                        <h6 className="font-medium text-green-300 text-sm">Key Features:</h6>
                        <div className="flex flex-wrap gap-1">
                          {resource.features.map((feature, featureIndex) => (
                            <Badge key={featureIndex} variant="outline" className="text-xs border-white/20">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Practice Resources */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Practice Tests & Question Banks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {practiceResources.map((category, index) => (
              <div key={index}>
                <h4 className="font-semibold text-white mb-4">{category.type}</h4>
                <div className="space-y-4">
                  {category.providers.map((provider, providerIndex) => (
                    <div key={providerIndex} className="border border-elec-yellow/20 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium text-white">{provider.name}</h5>
                        <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-yellow">
                          {provider.cost}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{provider.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-elec-yellow font-medium">Coverage: </span>
                          <span className="text-muted-foreground">{provider.coverage}</span>
                        </div>
                        <div>
                          <span className="text-elec-yellow font-medium">Format: </span>
                          <span className="text-muted-foreground">{provider.format}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Free Resources */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400">Free Learning Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {freeResources.map((resource, index) => (
              <div key={index} className="border border-purple-500/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className="font-medium text-white">{resource.name}</h5>
                    <p className="text-sm text-purple-300">{resource.type}</p>
                  </div>
                  <Badge variant="outline" className="text-xs border-purple-400/30 text-purple-400">
                    Free
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {resource.topics.map((topic, topicIndex) => (
                      <Badge key={topicIndex} variant="outline" className="text-xs border-white/20">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="text-xs text-purple-300">
                    {resource.subscribers && `${resource.subscribers} subscribers`}
                    {resource.members && `${resource.members} members`}
                    {resource.quality && ` • ${resource.quality} quality`}
                    {resource.activity && ` • ${resource.activity}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Study Planning Tools */}
      <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10">
        <CardHeader>
          <CardTitle className="text-orange-400">Study Planning & Organisation Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studyPlanners.map((tool, index) => (
              <div key={index} className="border border-orange-500/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-white">{tool.name}</h5>
                  <Badge variant="outline" className="text-xs border-orange-400/30 text-orange-400">
                    {tool.cost}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{tool.bestFor}</p>
                
                <div className="space-y-1">
                  <h6 className="font-medium text-orange-300 text-sm">Features:</h6>
                  <div className="flex flex-wrap gap-1">
                    {tool.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="outline" className="text-xs border-white/20">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-orange-500/10">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold text-elec-yellow mb-2">Build Your Personal Study Library</h3>
          <p className="text-muted-foreground mb-4">
            Start with free resources and gradually build your collection based on your specific learning needs and budget.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              <Download className="h-4 w-4 mr-2" />
              Resource Checklist
            </Button>
            <Button variant="outline" className="border-elec-yellow/30">
              Compare Prices
            </Button>
            <Button variant="outline" className="border-elec-yellow/30">
              Free Trial Links
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesTab;
