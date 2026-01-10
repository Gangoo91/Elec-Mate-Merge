
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, FileText, Video, Headphones, ExternalLink, Search, AlertCircle, Heart, Brain } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ResourcesLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // External Mental Health Support Services (verified UK resources)
  const externalResources = [
    {
      title: "Mind - Mental Health Charity",
      description: "Information and support for mental health problems across the UK",
      url: "https://www.mind.org.uk/",
      type: "Website",
      category: "external"
    },
    {
      title: "NHS Mental Health Services",
      description: "Find local NHS mental health support and services near you",
      url: "https://www.nhs.uk/mental-health/",
      type: "Healthcare",
      category: "external"
    },
    {
      title: "Samaritans",
      description: "Free confidential emotional support available 24/7 by phone, email, and letter",
      url: "https://www.samaritans.org/",
      type: "Helpline",
      category: "external"
    },
    {
      title: "CALM - Campaign Against Living Miserably",
      description: "Leading movement against suicide, offering support for men facing difficult times",
      url: "https://www.thecalmzone.net/",
      type: "Support",
      category: "external"
    },
    {
      title: "Mental Health First Aid England",
      description: "Training and resources to support mental health awareness in the workplace",
      url: "https://mhfaengland.org/",
      type: "Training",
      category: "external"
    },
    {
      title: "Electrical Industries Charity",
      description: "Practical, emotional and financial support specifically for electrical workers",
      url: "https://www.electricalcharity.org/",
      type: "Industry",
      category: "external"
    },
    {
      title: "Mates in Mind",
      description: "Mental health support programme for construction and related industries",
      url: "https://matesinmind.org/",
      type: "Industry",
      category: "external"
    },
    {
      title: "Anxiety UK",
      description: "Support and information for those living with anxiety disorders",
      url: "https://www.anxietyuk.org.uk/",
      type: "Support",
      category: "external"
    }
  ];

  // Self-help and educational resources
  const selfHelpResources = [
    {
      title: "Stress Management for Tradespeople",
      description: "Practical techniques for managing workplace stress specific to electrical work",
      type: "Guide",
      category: "guides"
    },
    {
      title: "Mindfulness During Work Breaks",
      description: "Simple 5-minute mindfulness exercises you can do on site",
      type: "Audio",
      category: "audio"
    },
    {
      title: "Work-Life Balance Planner",
      description: "Interactive tool to help you plan and maintain healthy boundaries",
      type: "Tool",
      category: "tools"
    },
    {
      title: "Sleep Hygiene for Shift Workers",
      description: "Evidence-based strategies for better sleep when working irregular hours",
      type: "Guide",
      category: "guides"
    },
    {
      title: "Recognising Burnout",
      description: "Learn the warning signs and what to do if you're experiencing burnout",
      type: "Video",
      category: "videos"
    },
    {
      title: "Building Resilience in Construction",
      description: "Practical skills for developing mental toughness and resilience",
      type: "Video",
      category: "videos"
    }
  ];

  // Crisis resources
  const crisisResources = [
    {
      title: "Emergency Services",
      phone: "999",
      description: "Immediate danger or serious mental health crisis",
      color: "red"
    },
    {
      title: "Samaritans 24/7",
      phone: "116 123",
      description: "Free emotional support anytime, day or night",
      color: "blue"
    },
    {
      title: "Shout Crisis Text Line",
      phone: "Text SHOUT to 85258",
      description: "Free 24/7 text support for mental health crises",
      color: "purple"
    }
  ];

  const allResources = [...externalResources, ...selfHelpResources];

  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const externalFiltered = filteredResources.filter(r => r.category === "external");
  const selfHelpFiltered = filteredResources.filter(r => r.category !== "external");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center py-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-3">
          <BookOpen className="h-6 w-6 text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-1">Resources Library</h2>
        <p className="text-sm text-white/70">
          Comprehensive mental health support and guidance
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search resources..."
          className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/20 focus:ring-1 focus:ring-white/10 touch-manipulation"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setSelectedCategory("all")}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all touch-manipulation active:scale-95",
            selectedCategory === "all"
              ? "bg-blue-500 text-white"
              : "bg-white/10 text-white/70 hover:bg-white/15"
          )}
        >
          All Resources
        </button>
        <button
          onClick={() => setSelectedCategory("external")}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all touch-manipulation active:scale-95",
            selectedCategory === "external"
              ? "bg-blue-500 text-white"
              : "bg-white/10 text-white/70 hover:bg-white/15"
          )}
        >
          External Support
        </button>
        <button
          onClick={() => setSelectedCategory("guides")}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all touch-manipulation active:scale-95",
            selectedCategory === "guides"
              ? "bg-green-500 text-white"
              : "bg-white/10 text-white/70 hover:bg-white/15"
          )}
        >
          Guides
        </button>
        <button
          onClick={() => setSelectedCategory("videos")}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all touch-manipulation active:scale-95",
            selectedCategory === "videos"
              ? "bg-purple-500 text-white"
              : "bg-white/10 text-white/70 hover:bg-white/15"
          )}
        >
          Videos
        </button>
        <button
          onClick={() => setSelectedCategory("audio")}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all touch-manipulation active:scale-95",
            selectedCategory === "audio"
              ? "bg-orange-500 text-white"
              : "bg-white/10 text-white/70 hover:bg-white/15"
          )}
        >
          Audio
        </button>
        <button
          onClick={() => setSelectedCategory("tools")}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all touch-manipulation active:scale-95",
            selectedCategory === "tools"
              ? "bg-pink-500 text-white"
              : "bg-white/10 text-white/70 hover:bg-white/15"
          )}
        >
          Tools
        </button>
      </div>

      {/* Crisis Banner */}
      <Card className="border-red-500/30 bg-red-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3 mb-3">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-400 text-sm mb-1">In Crisis?</h3>
              <p className="text-xs text-white/70">If you're in immediate danger or experiencing a mental health crisis, contact emergency services</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {crisisResources.map((resource, index) => (
              <a
                key={index}
                href={resource.phone.startsWith("Text") ? `sms:85258?body=SHOUT` : `tel:${resource.phone.replace(/\s/g, '')}`}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg transition-all touch-manipulation active:scale-[0.98]",
                  resource.color === "red" && "border border-red-500/30 bg-red-500/10 hover:bg-red-500/20",
                  resource.color === "blue" && "border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20",
                  resource.color === "purple" && "border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20"
                )}
              >
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{resource.title}</div>
                  <div className="text-xs text-white/70 mt-0.5">{resource.description}</div>
                </div>
                <div className={cn(
                  "text-lg font-bold whitespace-nowrap ml-3",
                  resource.color === "red" && "text-red-400",
                  resource.color === "blue" && "text-blue-400",
                  resource.color === "purple" && "text-purple-400"
                )}>
                  {resource.phone}
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* External Support Services */}
      {(selectedCategory === "all" || selectedCategory === "external") && externalFiltered.length > 0 && (
        <Card className="border-blue-500/20 bg-white/5">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <Heart className="h-5 w-5" />
              External Support Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {externalFiltered.map((resource, index) => (
                <div
                  key={index}
                  className="border border-white/10 bg-white/5 rounded-lg p-4 hover:border-blue-500/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm mb-1">{resource.title}</h4>
                      <p className="text-sm text-white/70">{resource.description}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-blue-500/10 rounded-md text-blue-400 ml-3 whitespace-nowrap">
                      {resource.type}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-11 border-blue-500/30 text-white hover:bg-blue-500/10 touch-manipulation active:scale-[0.98] transition-all"
                    onClick={() => window.open(resource.url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Resource
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Self-Help Resources */}
      {(selectedCategory === "all" || ["guides", "videos", "audio", "tools"].includes(selectedCategory)) && selfHelpFiltered.length > 0 && (
        <Card className="border-green-500/20 bg-white/5">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Self-Help & Educational Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {selfHelpFiltered.map((resource, index) => (
                <div
                  key={index}
                  className="border border-white/10 bg-white/5 rounded-lg p-4 hover:border-green-500/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm mb-1">{resource.title}</h4>
                      <p className="text-sm text-white/70">{resource.description}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-500/10 rounded-md text-green-400 ml-3 whitespace-nowrap">
                      {resource.type}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-11 border-green-500/30 text-white hover:bg-green-500/10 touch-manipulation active:scale-[0.98] transition-all"
                  >
                    Access Resource
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {filteredResources.length === 0 && (
        <Card className="border-white/10 bg-white/5">
          <CardContent className="text-center py-8">
            <Search className="h-10 w-10 text-white/60 mx-auto mb-3" />
            <p className="text-sm text-white/70">No resources found matching your search</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
              className="mt-4"
            >
              Clear filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Info Footer */}
      <Card className="border-purple-500/20 bg-purple-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <BookOpen className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-purple-400 text-sm mb-1">About These Resources</h4>
              <p className="text-xs text-white/70">
                All external resources are verified UK mental health services and charities.
                Self-help resources are designed specifically for electrical workers and tradespeople.
                Remember: these resources complement professional help but don't replace it.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesLibrary;
