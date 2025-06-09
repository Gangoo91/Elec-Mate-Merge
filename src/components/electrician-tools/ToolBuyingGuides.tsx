
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Clock, Star, ArrowRight } from "lucide-react";

const ToolBuyingGuides = () => {
  const guides = [
    {
      title: "Essential Testing Equipment Guide 2024",
      description: "Complete guide to choosing multifunction testers, PAT testers, and calibration requirements for compliance.",
      category: "Testing Equipment",
      readTime: "8 min",
      difficulty: "Beginner",
      rating: 4.8,
      readers: 2340,
      updated: "2 days ago",
      highlights: ["Fluke vs Megger comparison", "Budget recommendations", "Calibration schedules"],
      badge: "Most Popular"
    },
    {
      title: "Power Tools for Electricians: What to Buy First",
      description: "Priority list for apprentices and new electricians - build your toolkit without breaking the bank.",
      category: "Power Tools",
      readTime: "12 min",
      difficulty: "Beginner",
      rating: 4.7,
      readers: 1890,
      updated: "1 week ago",
      highlights: ["Budget breakdown", "Brand comparisons", "Essential vs nice-to-have"],
      badge: "Beginner Guide"
    },
    {
      title: "Advanced Hand Tools: Professional Selection",
      description: "High-quality hand tools that will last a career. Investment pieces for experienced professionals.",
      category: "Hand Tools",
      readTime: "15 min",
      difficulty: "Advanced",
      rating: 4.9,
      readers: 987,
      updated: "3 days ago",
      highlights: ["German vs Japanese tools", "Lifetime warranties", "Ergonomic considerations"],
      badge: "Expert Level"
    },
    {
      title: "PPE Buying Guide: Safety Without Compromise",
      description: "Navigate PPE standards, find comfortable protection, and understand compliance requirements.",
      category: "Safety Equipment",
      readTime: "10 min",
      difficulty: "Intermediate",
      rating: 4.6,
      readers: 1560,
      updated: "5 days ago",
      highlights: ["EN standards explained", "Comfort vs protection", "Replacement schedules"],
      badge: "Safety Focus"
    }
  ];

  const quickTips = [
    {
      title: "Tool Warranties",
      tip: "Always register tools for warranty. Keep receipts and check manufacturer policies."
    },
    {
      title: "Buy Quality",
      tip: "Invest in tools you use daily. Cheap tools cost more long-term through replacements."
    },
    {
      title: "Check Reviews",
      tip: "Read reviews from actual electricians, not general DIY users for relevant insights."
    },
    {
      title: "Calibration",
      tip: "Factor in calibration costs for testing equipment - budget £100-200 annually."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Expert Buying Guides</h2>
          <p className="text-muted-foreground">Professional recommendations from experienced electricians</p>
        </div>
        <Button variant="outline" size="sm" className="border-elec-yellow/30">
          View All Guides
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Guides */}
        <div className="lg:col-span-2 space-y-4">
          {guides.map((guide, index) => (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <Badge className={`${
                    guide.badge === "Most Popular" ? "bg-elec-yellow/20 text-elec-yellow" :
                    guide.badge === "Beginner Guide" ? "bg-green-500/20 text-green-400" :
                    guide.badge === "Expert Level" ? "bg-purple-500/20 text-purple-400" :
                    "bg-red-500/20 text-red-400"
                  }`}>
                    {guide.badge}
                  </Badge>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {guide.readTime}
                  </div>
                </div>
                <CardTitle className="text-lg text-white leading-tight">
                  {guide.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{guide.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{guide.category}</span>
                  <span>{guide.difficulty}</span>
                  <span>Updated {guide.updated}</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-400 fill-current" />
                    <span>{guide.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-blue-400" />
                    <span>{guide.readers.toLocaleString()} readers</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white">Key Topics:</h4>
                  <div className="flex flex-wrap gap-1">
                    {guide.highlights.map((highlight, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-elec-yellow/30">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Guide
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Quick Tips Sidebar */}
        <div className="space-y-4">
          <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/10 to-blue-500/10">
            <CardHeader>
              <CardTitle className="text-lg text-elec-yellow">Quick Buying Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickTips.map((tip, index) => (
                <div key={index} className="p-3 bg-elec-dark/50 rounded-lg">
                  <h4 className="font-medium text-white text-sm mb-1">{tip.title}</h4>
                  <p className="text-xs text-muted-foreground">{tip.tip}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className="border-green-500/20 bg-green-500/10">
            <CardHeader>
              <CardTitle className="text-lg text-green-400">This Week's Highlight</CardTitle>
            </CardHeader>
            <CardContent>
              <h4 className="font-medium text-white mb-2">Black Friday Tool Deals</h4>
              <p className="text-sm text-green-300 mb-3">
                Comprehensive guide to the best Black Friday deals on electrical tools and equipment.
              </p>
              <Button variant="outline" size="sm" className="w-full border-green-500/30">
                Read Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ToolBuyingGuides;
