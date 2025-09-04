
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BookOpen, Users, Clock, Star, Wrench, TestTube, HardHat, Package, Cable, FolderOpen, CalendarDays, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface GuideMetadata {
  guide_type: string;
  status: string;
  estimated_availability?: string;
  development_status?: string;
  description?: string;
}

interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  difficulty: string;
  rating: number;
  readers: number;
  updated: string;
  badge: string;
  icon: any;
  status: "complete" | "coming-soon";
  metadata?: GuideMetadata;
}

interface GuideSelectorProps {
  onSelectGuide: (guideId: string, guideTitle: string) => void;
}

const GuideSelector = ({ onSelectGuide }: GuideSelectorProps) => {
  const [guidesMetadata, setGuidesMetadata] = useState<GuideMetadata[]>([]);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(true);

  // Fetch guide metadata from the database
  useEffect(() => {
    const fetchGuideMetadata = async () => {
      try {
        const { data, error } = await supabase
          .from('tool_guide_metadata')
          .select('*');
        
        if (error) {
          console.error('Error fetching guide metadata:', error);
        } else {
          setGuidesMetadata(data || []);
        }
      } catch (error) {
        console.error('Failed to fetch guide metadata:', error);
      } finally {
        setIsLoadingMetadata(false);
      }
    };

    fetchGuideMetadata();
  }, []);

  const guides: Guide[] = [
    {
      id: "testing-equipment",
      title: "Essential Testing Equipment Guide 2025",
      description: "Complete guide to choosing multifunction testers, PAT testers, and calibration requirements for compliance.",
      category: "Testing Equipment",
      readTime: "8 min",
      difficulty: "Beginner",
      rating: 4.8,
      readers: 2340,
      updated: "2 days ago",
      badge: "Most Popular",
      icon: TestTube,
      status: "complete"
    },
    {
      id: "power-tools",
      title: "Power Tools for Electricians: What to Buy First",
      description: "Priority list for apprentices and new electricians - build your toolkit without breaking the bank.",
      category: "Power Tools",
      readTime: "12 min",
      difficulty: "Beginner",
      rating: 4.7,
      readers: 1890,
      updated: "1 week ago",
      badge: "Beginner Guide",
      icon: Wrench,
      status: "complete"
    },
    {
      id: "hand-tools",
      title: "Professional Hand Tools: Investment Guide",
      description: "High-quality hand tools that will last a career. Investment pieces for experienced professionals.",
      category: "Hand Tools",
      readTime: "15 min",
      difficulty: "Intermediate",
      rating: 4.9,
      readers: 1567,
      updated: "3 days ago",
      badge: "Professional Choice",
      icon: Package,
      status: "complete"
    },
    {
      id: "ppe",
      title: "PPE Buying Guide: Safety Without Compromise",
      description: "Navigate PPE standards, find comfortable protection, and understand compliance requirements.",
      category: "Safety Equipment",
      readTime: "10 min",
      difficulty: "Essential",
      rating: 4.6,
      readers: 1560,
      updated: "5 days ago",
      badge: "Safety Focus",
      icon: HardHat,
      status: "complete"
    },
    {
      id: "cable-tools",
      title: "Cable Preparation & Termination Tools",
      description: "Comprehensive guide to cable stripping, crimping, and termination equipment for all cable types.",
      category: "Cable Tools",
      readTime: "12 min",
      difficulty: "Intermediate",
      rating: 4.5,
      readers: 890,
      updated: "Available Now",
      badge: "New Guide",
      icon: Cable,
      status: "complete"
    },
    {
      id: "storage",
      title: "Tool Storage & Organisation Systems",
      description: "Professional storage solutions from toolboxes to van organisation and workshop setups.",
      category: "Storage & Organisation",
      readTime: "8 min",
      difficulty: "All Levels",
      rating: 4.4,
      readers: 657,
      updated: "Coming Soon",
      badge: "Productivity",
      icon: FolderOpen,
      status: "coming-soon"
    },
    {
      id: "inspection",
      title: "Inspection Tools & Equipment Guide",
      description: "Comprehensive guide to inspection cameras, thermal imaging, and testing equipment for fault finding.",
      category: "Inspection Equipment",
      readTime: "10 min",
      difficulty: "Intermediate",
      rating: 0,
      readers: 0,
      updated: "Coming Soon",
      badge: "In Development",
      icon: TestTube,
      status: "coming-soon"
    },
    {
      id: "smart-tools",
      title: "Smart & IoT Electrical Tools",
      description: "Next-generation tools with app connectivity, remote monitoring, and automated diagnostics.",
      category: "Smart Tools",
      readTime: "12 min",
      difficulty: "Advanced",
      rating: 0,
      readers: 0,
      updated: "Coming Soon",
      badge: "Future Tech",
      icon: Wrench,
      status: "coming-soon"
    }
  ];

  // Merge guides with metadata
  const enrichedGuides = guides.map(guide => {
    const metadata = guidesMetadata.find(m => m.guide_type === guide.id);
    return {
      ...guide,
      status: metadata?.status === 'coming-soon' ? 'coming-soon' : guide.status,
      metadata
    } as Guide;
  });

  const handleGuideClick = (guide: Guide) => {
    if (guide.status === "coming-soon") {
      // Prevent interaction for coming soon guides
      return;
    }
    onSelectGuide(guide.id, guide.title);
  };

  const formatEstimatedDate = (dateString?: string) => {
    if (!dateString) return null;
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', { 
        month: 'short', 
        year: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  const getDevelopmentStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in-development': return 'text-blue-400';
      case 'planning': return 'text-amber-400';
      case 'research': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {enrichedGuides.map((guide) => {
          const isComingSoon = guide.status === "coming-soon";
          const estimatedDate = formatEstimatedDate(guide.metadata?.estimated_availability);
          
          return (
            <div key={guide.id} className="relative">
              <Card 
                className={`border-elec-yellow/20 bg-elec-gray transition-all duration-300 ${
                  isComingSoon 
                    ? "opacity-50 grayscale cursor-not-allowed" 
                    : "hover:border-elec-yellow/50 cursor-pointer hover:shadow-lg hover:scale-[1.02]"
                }`}
                onClick={() => handleGuideClick(guide)}
              >
                {/* Coming Soon Overlay */}
                {isComingSoon && (
                  <div className="absolute inset-0 bg-black/20 rounded-lg pointer-events-none z-10 flex items-center justify-center">
                    <div className="bg-elec-gray/90 border border-elec-yellow/30 rounded-lg px-4 py-2 text-center">
                      <AlertCircle className="h-5 w-5 text-amber-400 mx-auto mb-1" />
                      <p className="text-sm font-medium text-white">Guide In Development</p>
                      {estimatedDate && (
                        <p className="text-xs text-muted-foreground">Expected: {estimatedDate}</p>
                      )}
                    </div>
                  </div>
                )}

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={`${
                        guide.badge === "Most Popular" ? "bg-elec-yellow/20 text-elec-yellow" :
                        guide.badge === "Beginner Guide" ? "bg-green-500/20 text-green-400" :
                        guide.badge === "Professional Choice" ? "bg-purple-500/20 text-purple-400" :
                        guide.badge === "Safety Focus" ? "bg-red-500/20 text-red-400" :
                        guide.badge === "New Guide" ? "bg-blue-500/20 text-blue-400" :
                        guide.badge === "In Development" ? "bg-amber-500/20 text-amber-400" :
                        guide.badge === "Future Tech" ? "bg-purple-500/20 text-purple-400" :
                        "bg-amber-500/20 text-amber-400"
                      }`}>
                        {guide.badge}
                      </Badge>
                      
                      {isComingSoon && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="outline" className="bg-gray-500/20 text-gray-400 border-gray-500/30">
                              <CalendarDays className="h-3 w-3 mr-1" />
                              Coming Soon
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-center">
                              <p className="font-medium">Guide Status: {guide.metadata?.development_status || 'In Development'}</p>
                              {estimatedDate && <p className="text-sm">Expected: {estimatedDate}</p>}
                              {guide.metadata?.description && (
                                <p className="text-sm mt-1 max-w-xs">{guide.metadata.description}</p>
                              )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {guide.readTime}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      isComingSoon ? "bg-gray-500/20" : "bg-elec-yellow/20"
                    }`}>
                      <guide.icon className={`h-5 w-5 ${
                        isComingSoon ? "text-gray-400" : "text-elec-yellow"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className={`text-lg leading-tight ${
                        isComingSoon ? "text-gray-300" : "text-white"
                      }`}>
                        {guide.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{guide.description}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{guide.category}</span>
                    <span>{guide.difficulty}</span>
                    <span>Updated {guide.updated}</span>
                  </div>
                  
                  {guide.status === "complete" && (
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
                  )}

                  {isComingSoon && guide.metadata && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Development Status:</span>
                      <span className={`font-medium capitalize ${getDevelopmentStatusColor(guide.metadata.development_status)}`}>
                        {guide.metadata.development_status?.replace('-', ' ') || 'In Progress'}
                      </span>
                    </div>
                  )}
                  
                  <div className={`flex items-center text-sm font-medium ${
                    guide.status === "complete" 
                      ? "text-elec-yellow hover:text-elec-yellow/80" 
                      : "text-gray-400"
                  }`}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    {guide.status === "complete" ? "Read Complete Guide" : "Guide In Development"}
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default GuideSelector;
