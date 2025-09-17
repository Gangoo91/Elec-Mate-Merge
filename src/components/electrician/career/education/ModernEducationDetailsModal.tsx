import { ExternalLink, X, MapPin, Clock, Star, GraduationCap, Calendar, Users, BookOpen, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { LiveEducationData } from "@/hooks/useLiveEducationData";

interface ModernEducationDetailsModalProps {
  programme: LiveEducationData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModernEducationDetailsModal = ({ programme, open, onOpenChange }: ModernEducationDetailsModalProps) => {
  if (!programme) return null;

  const getCategoryColor = (category: string) => {
    const colors = {
      "Degree": "bg-blue-500/20 border-blue-500/30 text-blue-300",
      "Certificate": "bg-green-500/20 border-green-500/30 text-green-300",
      "Diploma": "bg-purple-500/20 border-purple-500/30 text-purple-300",
      "Apprenticeship": "bg-orange-500/20 border-orange-500/30 text-orange-300",
      "Foundation": "bg-cyan-500/20 border-cyan-500/30 text-cyan-300",
      "Master": "bg-red-500/20 border-red-500/30 text-red-300",
      "HNC": "bg-yellow-500/20 border-yellow-500/30 text-yellow-300",
      "HND": "bg-pink-500/20 border-pink-500/30 text-pink-300",
    };
    return colors[category as keyof typeof colors] || "bg-white/10 border-white/20 text-white/80";
  };

  const getLevelColor = (level: string) => {
    const colors = {
      "Level 3": "bg-green-500/20 border-green-500/30 text-green-300",
      "Level 4": "bg-blue-500/20 border-blue-500/30 text-blue-300",
      "Level 5": "bg-purple-500/20 border-purple-500/30 text-purple-300",
      "Level 6": "bg-red-500/20 border-red-500/30 text-red-300",
      "Level 7": "bg-yellow-500/20 border-yellow-500/30 text-yellow-300",
    };
    return colors[level as keyof typeof colors] || "bg-white/10 border-white/20 text-white/80";
  };

  const getCategoryImage = (category: string) => {
    const images = {
      "Degree": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop&auto=format",
      "Certificate": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop&auto=format",
      "Diploma": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=400&fit=crop&auto=format",
      "Apprenticeship": "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=400&fit=crop&auto=format",
      "Foundation": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&auto=format",
      "Master": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&auto=format",
      "HNC": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop&auto=format",
      "HND": "https://images.unsplash.com/photo-1574188041339-3d9d896ce7f8?w=800&h=400&fit=crop&auto=format",
    };
    return images[category as keyof typeof images] || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop&auto=format";
  };

  const formatDuration = (duration: string) => {
    // Handle various duration formats
    const patterns = [
      { regex: /(\d+)\s*years?/i, format: (n: number) => `${n} year${n > 1 ? 's' : ''}` },
      { regex: /(\d+)\s*months?/i, format: (n: number) => `${n} month${n > 1 ? 's' : ''}` },
      { regex: /(\d+)\s*weeks?/i, format: (n: number) => `${n} week${n > 1 ? 's' : ''}` },
      { regex: /(\d+)\s*days?/i, format: (n: number) => `${n} day${n > 1 ? 's' : ''}` }
    ];

    for (const pattern of patterns) {
      const match = duration.match(pattern.regex);
      if (match) {
        const number = parseInt(match[1]);
        return pattern.format(number);
      }
    }

    return duration;
  };

  const handleVisitProvider = () => {
    // For now, search for the institution online since institutionUrl isn't in the data structure
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(programme.institution + ' official website')}`;
    window.open(searchUrl, '_blank', 'noopener,noreferrer');
  };

  const handleApplyNow = () => {
    if (programme.courseUrl) {
      window.open(programme.courseUrl, '_blank', 'noopener,noreferrer');
    } else {
      // Fallback to institution search
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(programme.title + ' ' + programme.institution + ' apply')}`;
      window.open(searchUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-elec-card to-elec-card/80 border-elec-yellow/20 text-white">
        <DialogHeader className="sr-only">
          <h2>Programme Details</h2>
        </DialogHeader>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 top-4 text-white/80 hover:text-white hover:bg-white/10 z-10"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Hero Section */}
        <div className="relative -m-6 mb-6">
          <div className="relative h-48 sm:h-64 overflow-hidden">
            <img
              src={getCategoryImage(programme.category)}
              alt={programme.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className={cn("text-sm font-medium", getCategoryColor(programme.category))}>
                {programme.category}
              </Badge>
              <Badge className={cn("text-sm font-medium", getLevelColor(programme.level))}>
                {programme.level}
              </Badge>
            </div>

            {/* Title & Institution */}
            <div className="absolute bottom-4 left-4 right-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                {programme.title}
              </h1>
              <p className="text-elec-yellow text-lg font-semibold">
                {programme.institution}
              </p>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{programme.rating.toFixed(1)}</div>
            <div className="text-xs text-white/80">Rating</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <GraduationCap className="h-5 w-5 text-elec-yellow mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{programme.employmentRate}%</div>
            <div className="text-xs text-white/80">Employment</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Clock className="h-5 w-5 text-elec-yellow mx-auto mb-2" />
            <div className="text-lg font-bold text-white">{formatDuration(programme.duration)}</div>
            <div className="text-xs text-white/80">Duration</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <BookOpen className="h-5 w-5 text-elec-yellow mx-auto mb-2" />
            <div className="text-lg font-bold text-white">{programme.studyMode}</div>
            <div className="text-xs text-white/80">Study Mode</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Programme Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Programme Overview</h3>
              <p className="text-white/90 leading-relaxed">{programme.description}</p>
            </div>

            {/* Key Topics */}
            {programme.keyTopics.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Key Topics Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {programme.keyTopics.map((topic, index) => (
                    <Badge key={index} variant="outline" className="text-white/80 border-white/20">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {programme.entryRequirements.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Entry Requirements</h3>
                <ul className="space-y-2">
                  {programme.entryRequirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2 text-white/90">
                      <ArrowRight className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Career Outcomes / Progression Options */}
            {programme.progressionOptions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Progression Opportunities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {programme.progressionOptions.map((option, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-elec-yellow" />
                        <span className="text-white/90 text-sm">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            {/* Cost & Financial Info */}
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Financial Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">Tuition Fees:</span>
                  <span className="text-white font-semibold">{programme.tuitionFees}</span>
                </div>
                {programme.averageStartingSalary && (
                  <div className="flex justify-between">
                    <span className="text-white/80">Starting Salary:</span>
                    <span className="text-elec-yellow font-semibold">{programme.averageStartingSalary}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Locations */}
            {programme.locations.length > 0 && (
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Study Locations</h3>
                <div className="space-y-2">
                  {programme.locations.map((location, index) => (
                    <div key={index} className="flex items-center gap-2 text-white/90">
                      <MapPin className="h-4 w-4 text-elec-yellow" />
                      <span className="text-sm">{location}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Next Intake */}
            {programme.nextIntake && (
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Next Intake</h3>
                <div className="flex items-center gap-2 text-white/90">
                  <Calendar className="h-4 w-4 text-elec-yellow" />
                  <span className="text-sm">{programme.nextIntake}</span>
                </div>
              </div>
            )}

            {/* Funding Options */}
            {programme.fundingOptions.length > 0 && (
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Funding Options</h3>
                <div className="space-y-2">
                  {programme.fundingOptions.map((option, index) => (
                    <div key={index} className="flex items-center gap-2 text-white/90">
                      <ArrowRight className="h-4 w-4 text-elec-yellow" />
                      <span className="text-sm">{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-white/10">
          <Button
            onClick={handleApplyNow}
            className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Apply Now
          </Button>
          <Button
            variant="outline"
            onClick={handleVisitProvider}
            className="flex-1 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit Provider Site
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModernEducationDetailsModal;