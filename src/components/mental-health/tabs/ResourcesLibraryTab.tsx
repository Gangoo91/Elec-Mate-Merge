
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  FileText,
  Video,
  Search,
  ExternalLink,
  Star,
  Zap,
  Heart,
  Brain,
  Briefcase
} from "lucide-react";
import { useState } from "react";
import { useMentalHealth } from "@/contexts/MentalHealthContext";
import { cn } from "@/lib/utils";

const ResourcesLibraryTab = () => {
  const { favoriteResources, toggleFavoriteResource } = useMentalHealth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const resourceCategories = [
    { id: "all", label: "All", icon: BookOpen, color: "text-blue-400" },
    { id: "stress", label: "Stress", icon: Zap, color: "text-yellow-400" },
    { id: "anxiety", label: "Anxiety", icon: Brain, color: "text-purple-400" },
    { id: "workplace", label: "Work", icon: Briefcase, color: "text-green-400" },
    { id: "self-care", label: "Self-Care", icon: Heart, color: "text-pink-400" }
  ];

  const resources = [
    {
      id: "stress-guide",
      title: "Stress Management Guide for Electricians",
      description: "Proven techniques for managing workplace stress in electrical work",
      type: "document",
      category: "stress",
      url: "https://www.hse.gov.uk/stress/",
      source: "HSE"
    },
    {
      id: "anxiety-toolkit",
      title: "Anxiety Toolkit for On-Site Relief",
      description: "Quick anxiety management techniques for work breaks",
      type: "document",
      category: "anxiety",
      url: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/anxiety-and-panic-attacks/",
      source: "Mind"
    },
    {
      id: "mindfulness-video",
      title: "5-Minute Mindfulness for Tradespeople",
      description: "Short guided exercises for busy professionals",
      type: "video",
      category: "self-care",
      url: "https://www.headspace.com/work",
      source: "Headspace"
    },
    {
      id: "sleep-hygiene",
      title: "Sleep Guide for Shift Workers",
      description: "Healthy sleep patterns with irregular schedules",
      type: "document",
      category: "self-care",
      url: "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/tips-to-improve-your-mental-wellbeing/",
      source: "NHS"
    },
    {
      id: "workplace-communication",
      title: "Discussing Mental Health at Work",
      description: "How to talk to supervisors and colleagues",
      type: "document",
      category: "workplace",
      url: "https://www.mentalhealthatwork.org.uk/",
      source: "MHAW"
    },
    {
      id: "breathing-exercises",
      title: "Quick Breathing Exercises",
      description: "Simple techniques anywhere, anytime",
      type: "video",
      category: "stress",
      url: "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/",
      source: "NHS"
    },
    {
      id: "construction-wellbeing",
      title: "Construction Industry Wellbeing",
      description: "Mental health resources for construction workers",
      type: "document",
      category: "workplace",
      url: "https://www.matesinmind.org/",
      source: "Mates in Mind"
    },
    {
      id: "eic-support",
      title: "Electrical Industry Support",
      description: "Financial, practical and emotional support",
      type: "document",
      category: "workplace",
      url: "https://www.electricalcharity.org/",
      source: "EIC"
    },
    {
      id: "calm-resources",
      title: "CALM Resources for Men",
      description: "Support and resources for men's mental health",
      type: "document",
      category: "anxiety",
      url: "https://www.thecalmzone.net/help/get-help/",
      source: "CALM"
    },
    {
      id: "body-scan",
      title: "Body Scan Meditation",
      description: "Progressive relaxation technique",
      type: "video",
      category: "self-care",
      url: "https://www.youtube.com/watch?v=body-scan",
      source: "YouTube"
    },
    {
      id: "burnout-prevention",
      title: "Preventing Burnout at Work",
      description: "Recognise signs and take action early",
      type: "document",
      category: "stress",
      url: "https://www.mind.org.uk/information-support/tips-for-everyday-living/how-to-be-mentally-healthy-at-work/work-and-stress/",
      source: "Mind"
    },
    {
      id: "grounding-techniques",
      title: "5-4-3-2-1 Grounding Technique",
      description: "Quick anxiety relief using your senses",
      type: "video",
      category: "anxiety",
      url: "https://www.youtube.com/watch?v=grounding",
      source: "YouTube"
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const favoritesList = resources.filter(r => favoriteResources.includes(r.id));

  const getTypeStyles = (type: string) => {
    return type === 'video'
      ? { bg: 'bg-red-500/20', text: 'text-red-400', icon: Video }
      : { bg: 'bg-blue-500/20', text: 'text-blue-400', icon: FileText };
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center py-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 mb-3">
          <BookOpen className="h-6 w-6 text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">Resources Library</h2>
        <p className="text-sm text-white">
          Evidence-based guides and videos for your wellbeing
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        {!searchTerm && (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
        )}
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search resources..."
          className={cn("h-11", !searchTerm && "pl-10")}
        />
      </div>

      {/* Category Pills - Horizontal Scroll */}
      <div className="overflow-x-auto -mx-4 px-4 pb-2">
        <div className="flex gap-2 min-w-max">
          {resourceCategories.map(category => {
            const isSelected = selectedCategory === category.id;
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium
                  transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-foreground/70 hover:bg-white/20'
                }`}
              >
                <Icon className={`h-4 w-4 ${isSelected ? 'text-black' : category.color}`} />
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Favorites Section */}
      {favoritesList.length > 0 && selectedCategory === "all" && !searchTerm && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-yellow-400 flex items-center gap-2">
            <Star className="h-4 w-4 fill-yellow-400" />
            Your Favourites
          </h3>
          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            <div className="flex gap-3 min-w-max">
              {favoritesList.map(resource => {
                const typeStyles = getTypeStyles(resource.type);
                const TypeIcon = typeStyles.icon;
                return (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-48 flex-shrink-0 p-3 rounded-lg border border-yellow-500/20 bg-yellow-500/5
                      active:scale-[0.98] transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-6 h-6 rounded ${typeStyles.bg} flex items-center justify-center`}>
                        <TypeIcon className={`h-3 w-3 ${typeStyles.text}`} />
                      </div>
                      <span className="text-xs text-white">{resource.source}</span>
                    </div>
                    <h4 className="text-sm font-medium text-foreground line-clamp-2">{resource.title}</h4>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Resources List */}
      <div className="space-y-2">
        {filteredResources.length > 0 && (
          <p className="text-xs text-white">
            {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
          </p>
        )}

        {filteredResources.map((resource) => {
          const typeStyles = getTypeStyles(resource.type);
          const TypeIcon = typeStyles.icon;
          const isFavorite = favoriteResources.includes(resource.id);

          return (
            <Card key={resource.id} className="border-white/10 bg-white/5 overflow-hidden">
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg ${typeStyles.bg} flex items-center justify-center flex-shrink-0`}>
                    <TypeIcon className={`h-5 w-5 ${typeStyles.text}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-medium text-foreground text-sm leading-tight">{resource.title}</h4>
                        <p className="text-xs text-white mt-0.5 line-clamp-1">{resource.description}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavoriteResource(resource.id);
                        }}
                        className="p-1.5 -mt-0.5 -mr-1"
                      >
                        <Star
                          className={`h-4 w-4 ${
                            isFavorite
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-foreground/30'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <Badge className={`${typeStyles.bg} ${typeStyles.text} text-[10px] px-1.5 py-0`}>
                          {resource.type}
                        </Badge>
                        <span className="text-[10px] text-white">{resource.source}</span>
                      </div>
                      <Button size="sm" className="h-7 px-3 text-xs" asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <Card className="border-white/10 bg-white/5">
          <CardContent className="text-center py-8">
            <Search className="h-10 w-10 text-white mx-auto mb-3" />
            <h3 className="font-medium text-foreground mb-1">No resources found</h3>
            <p className="text-sm text-white mb-4">
              Try different search terms or categories
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-indigo-500/5">
        <CardContent className="p-4">
          <p className="text-sm text-blue-200">
            <strong className="text-blue-400">Tip:</strong> Star resources to save them for quick access later.
            All links open official, trusted sources.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesLibraryTab;
