import { useState } from "react";
import { Globe, FileText, Video, BookOpen, ChevronDown, ExternalLink, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { LucideIcon } from "lucide-react";

interface Resource {
  title: string;
  description: string;
  type: 'document' | 'video' | 'article' | 'website';
  url: string;
}

interface CommunityResourcesListProps {
  resources: Resource[];
}

type ResourceType = 'website' | 'document' | 'video' | 'article';

interface SectionConfig {
  color: string;
  icon: LucideIcon;
  label: string;
  borderClass: string;
  bgClass: string;
  iconBgClass: string;
  iconClass: string;
  badgeClass: string;
}

const sectionConfigs: Record<ResourceType, SectionConfig> = {
  website: {
    color: 'blue',
    icon: Globe,
    label: 'Websites',
    borderClass: 'border-blue-500/20',
    bgClass: 'from-blue-500/10',
    iconBgClass: 'bg-blue-500/20',
    iconClass: 'text-blue-400',
    badgeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  document: {
    color: 'cyan',
    icon: FileText,
    label: 'Documents',
    borderClass: 'border-cyan-500/20',
    bgClass: 'from-cyan-500/10',
    iconBgClass: 'bg-cyan-500/20',
    iconClass: 'text-cyan-400',
    badgeClass: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  },
  video: {
    color: 'purple',
    icon: Video,
    label: 'Videos',
    borderClass: 'border-purple-500/20',
    bgClass: 'from-purple-500/10',
    iconBgClass: 'bg-purple-500/20',
    iconClass: 'text-purple-400',
    badgeClass: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  },
  article: {
    color: 'amber',
    icon: BookOpen,
    label: 'Articles',
    borderClass: 'border-amber-500/20',
    bgClass: 'from-amber-500/10',
    iconBgClass: 'bg-amber-500/20',
    iconClass: 'text-amber-400',
    badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
};

const CommunityResourcesList = ({ resources }: CommunityResourcesListProps) => {
  const [expandedSection, setExpandedSection] = useState<ResourceType | null>('website');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [suggestion, setSuggestion] = useState({ title: '', description: '', url: '' });

  // Group resources by type
  const groupedResources = resources.reduce((acc, resource) => {
    const type = resource.type as ResourceType;
    if (!acc[type]) acc[type] = [];
    acc[type].push(resource);
    return acc;
  }, {} as Record<ResourceType, Resource[]>);

  const handleSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your suggestion!", {
      description: "Our team will review it shortly."
    });
    setIsSheetOpen(false);
    setSuggestion({ title: '', description: '', url: '' });
  };

  const toggleSection = (type: ResourceType) => {
    setExpandedSection(expandedSection === type ? null : type);
  };

  const ResourceSection = ({ type }: { type: ResourceType }) => {
    const typeResources = groupedResources[type] || [];
    if (typeResources.length === 0) return null;

    const config = sectionConfigs[type];
    const Icon = config.icon;
    const isExpanded = expandedSection === type;

    return (
      <Card className={`${config.borderClass} overflow-hidden`}>
        {/* Collapsible Header */}
        <button
          onClick={() => toggleSection(type)}
          className={`w-full p-4 flex items-center justify-between bg-gradient-to-r ${config.bgClass} to-transparent
            min-h-[72px] touch-manipulation active:opacity-80 transition-colors duration-300`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${config.iconBgClass} flex items-center justify-center`}>
              <Icon className={`h-5 w-5 ${config.iconClass}`} />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-foreground">{config.label}</h3>
              <p className="text-xs text-white/70">{typeResources.length} resource{typeResources.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={config.badgeClass}>
              {typeResources.length}
            </Badge>
            <div
              className="transition-transform duration-300"
              style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <ChevronDown className="h-5 w-5 text-white/70" />
            </div>
          </div>
        </button>

        {/* Collapsible Content */}
        {isExpanded && (
          <CardContent className="p-3 pt-0 space-y-2">
            {typeResources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-3 rounded-lg ${config.borderClass} bg-white/[0.02]
                  hover:bg-white/[0.05] active:scale-[0.99] transition-all duration-300 min-h-[60px]
                  touch-manipulation`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm">{resource.title}</h4>
                    <p className="text-xs text-white/70 line-clamp-2 mt-0.5">{resource.description}</p>
                  </div>
                  <ExternalLink className={`h-4 w-4 ${config.iconClass} flex-shrink-0 mt-0.5`} />
                </div>
              </a>
            ))}
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-3">
      {/* Resource Sections by Type */}
      {(['website', 'document', 'video', 'article'] as ResourceType[]).map((type) => (
        <ResourceSection key={type} type={type} />
      ))}

      {/* Suggest Resource Button */}
      <Button
        variant="outline"
        className="w-full h-11 border-cyan-500/30 hover:bg-cyan-500/10 text-cyan-400
          touch-manipulation active:scale-[0.99] transition-all duration-300"
        onClick={() => setIsSheetOpen(true)}
      >
        <FilePlus className="h-4 w-4 mr-2" />
        Suggest a Resource
      </Button>

      {/* Suggestion Form Bottom Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="bottom" className="h-[60vh] rounded-t-2xl">
          <SheetHeader className="pb-4 border-b border-white/10">
            <SheetTitle className="flex items-center gap-2">
              <FilePlus className="h-5 w-5 text-cyan-400" />
              Suggest a Resource
            </SheetTitle>
            <SheetDescription>
              Help grow our community resources library
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSuggestion} className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="title">Resource Title</Label>
              <Input
                id="title"
                className="h-11 touch-manipulation text-base border-white/30 focus:border-cyan-500 focus:ring-cyan-500"
                value={suggestion.title}
                onChange={(e) => setSuggestion({ ...suggestion, title: e.target.value })}
                required
                placeholder="Enter resource name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                className="h-11 touch-manipulation text-base border-white/30 focus:border-cyan-500 focus:ring-cyan-500"
                value={suggestion.description}
                onChange={(e) => setSuggestion({ ...suggestion, description: e.target.value })}
                required
                placeholder="Brief description of the resource"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">Resource URL</Label>
              <Input
                id="url"
                type="url"
                className="h-11 touch-manipulation text-base border-white/30 focus:border-cyan-500 focus:ring-cyan-500"
                value={suggestion.url}
                onChange={(e) => setSuggestion({ ...suggestion, url: e.target.value })}
                required
                placeholder="https://..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-11 touch-manipulation"
                onClick={() => setIsSheetOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-11 bg-cyan-500 hover:bg-cyan-600 text-black touch-manipulation"
              >
                Submit Suggestion
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CommunityResourcesList;
