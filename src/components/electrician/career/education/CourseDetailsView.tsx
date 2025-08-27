
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, GraduationCap, MapPin, Clock, PoundSterling, 
  Star, Calendar, Users, TrendingUp, BookOpen, Target,
  ExternalLink, Copy, Heart, CheckCircle, AlertCircle,
  Building, Award, Banknote
} from "lucide-react";
import { LiveEducationData } from "@/hooks/useLiveEducationData";
import { useState } from "react";

interface CourseDetailsViewProps {
  course: LiveEducationData;
  onBack: () => void;
}

const CourseDetailsView = ({ course, onBack }: CourseDetailsViewProps) => {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleCopyUrl = () => {
    if (course.courseUrl) {
      navigator.clipboard.writeText(course.courseUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-amber-400 fill-amber-400' 
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const getEmploymentColor = (rate: number) => {
    if (rate >= 95) return 'text-green-400';
    if (rate >= 90) return 'text-blue-400';
    if (rate >= 85) return 'text-amber-400';
    return 'text-muted-foreground';
  };

  const getLevelColor = (level: string) => {
    const levelLower = level.toLowerCase();
    if (levelLower.includes('degree') || levelLower.includes('bachelor')) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    if (levelLower.includes('master')) return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    if (levelLower.includes('diploma') || levelLower.includes('certificate')) return 'bg-green-500/20 text-green-400 border-green-500/30';
    return 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-elec-yellow/30 hover:bg-elec-yellow/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
      </div>

      {/* Hero Section */}
      <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-gray to-elec-gray/80">
        <CardHeader className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className={getLevelColor(course.level)}>
                  {course.level}
                </Badge>
                <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
                  {course.category}
                </Badge>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                  {course.studyMode}
                </Badge>
              </div>
              
              <CardTitle className="text-2xl md:text-3xl text-elec-yellow leading-tight">
                {course.title}
              </CardTitle>
              
              <div className="flex items-center gap-2 text-amber-400">
                <GraduationCap className="h-5 w-5" />
                <span className="font-medium text-lg">{course.institution}</span>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  {renderStars(course.rating)}
                  <span className="ml-1 font-medium">{course.rating}</span>
                </div>
                <div className={`flex items-center gap-1 ${getEmploymentColor(course.employmentRate)}`}>
                  <Users className="h-4 w-4" />
                  <span className="font-medium">{course.employmentRate}% employed</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                onClick={handleSave}
                variant="outline"
                className="border-elec-yellow/30 hover:bg-elec-yellow/10"
              >
                <Heart className={`h-4 w-4 mr-2 ${saved ? 'fill-red-500 text-red-500' : ''}`} />
                {saved ? 'Saved' : 'Save Course'}
              </Button>
              {course.courseUrl && (
                <Button 
                  onClick={() => window.open(course.courseUrl, '_blank')}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Apply Now
                </Button>
              )}
            </div>
          </div>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-elec-yellow/20">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-lg font-bold text-elec-yellow">
                <Clock className="h-4 w-4" />
                {course.duration}
              </div>
              <div className="text-xs text-muted-foreground">Duration</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-lg font-bold text-green-400">
                <PoundSterling className="h-4 w-4" />
                {course.averageStartingSalary}
              </div>
              <div className="text-xs text-muted-foreground">Starting Salary</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-lg font-bold text-blue-400">
                <MapPin className="h-4 w-4" />
                {course.locations.length}
              </div>
              <div className="text-xs text-muted-foreground">Locations</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-lg font-bold text-purple-400">
                <Calendar className="h-4 w-4" />
                {course.nextIntake}
              </div>
              <div className="text-xs text-muted-foreground">Next Intake</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-5 bg-elec-gray border border-elec-yellow/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black">Overview</TabsTrigger>
          <TabsTrigger value="requirements" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black">Requirements</TabsTrigger>
          <TabsTrigger value="financial" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black">Financial</TabsTrigger>
          <TabsTrigger value="locations" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black">Locations</TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-elec-yellow" />
                Course Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {course.description}
              </p>
              
              {course.keyTopics.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Key Topics Covered
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {course.keyTopics.map((topic, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-elec-dark/50 rounded border border-elec-yellow/10">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {course.progressionOptions.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Career Progression Pathways
                  </h4>
                  <div className="space-y-2">
                    {course.progressionOptions.map((option, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-3 bg-blue-500/10 rounded border border-blue-500/20">
                        <Award className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-blue-100">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Employment Rate Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Graduate Employment Rate</span>
                  <span className={`text-sm font-bold ${getEmploymentColor(course.employmentRate)}`}>
                    {course.employmentRate}%
                  </span>
                </div>
                <Progress value={course.employmentRate} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-elec-yellow" />
                Entry Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.entryRequirements.length > 0 ? (
                <div className="space-y-2">
                  {course.entryRequirements.map((requirement, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-3 bg-amber-500/10 rounded border border-amber-500/20">
                      <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-amber-100">{requirement}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Entry requirements information will be available from the institution.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PoundSterling className="h-5 w-5 text-elec-yellow" />
                  Tuition Fees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-elec-yellow">
                  {course.tuitionFees}
                </div>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Banknote className="h-5 w-5 text-green-400" />
                  Expected Starting Salary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">
                  {course.averageStartingSalary}
                </div>
              </CardContent>
            </Card>
          </div>

          {course.fundingOptions.length > 0 && (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-elec-yellow" />
                  Funding Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {course.fundingOptions.map((option, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-3 bg-green-500/10 rounded border border-green-500/20">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-green-100">{option}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="locations" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-elec-yellow" />
                Available Locations ({course.locations.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {course.locations.map((location, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-blue-500/10 rounded border border-blue-500/20">
                    <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <span className="text-sm text-blue-100">{location}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-elec-yellow" />
                  Next Intake
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-elec-yellow">
                  {course.nextIntake}
                </div>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  Application Deadline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-red-400">
                  {course.applicationDeadline}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Bar */}
      <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-gray to-elec-gray/80">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="font-semibold text-elec-yellow">Ready to Apply?</h3>
              <p className="text-sm text-muted-foreground">
                Take the next step in your electrical career
              </p>
            </div>
            <div className="flex gap-2">
              {course.courseUrl && (
                <Button 
                  onClick={handleCopyUrl}
                  variant="outline"
                  className="border-elec-yellow/30 hover:bg-elec-yellow/10"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? 'Copied!' : 'Copy Link'}
                </Button>
              )}
              {course.courseUrl && (
                <Button 
                  onClick={() => window.open(course.courseUrl, '_blank')}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Course Page
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Data Indicator */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span>Live data • Last updated: {new Date(course.lastUpdated).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default CourseDetailsView;
