
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import CourseEnquiryForm from "./CourseEnquiryForm";
import { 
  X, MapPin, Clock, Users, BookOpen, TrendingUp, 
  PoundSterling, Award, Target, CheckCircle, 
  Calendar, Mail, Star, Briefcase, GraduationCap,
  ExternalLink, Wifi, Database, Shield
} from "lucide-react";
import { EnhancedCareerCourse } from "./enhancedCoursesData";

interface CourseDetailsModalProps {
  course: EnhancedCareerCourse;
  onClose: () => void;
}

const CourseDetailsModal = ({ course, onClose }: CourseDetailsModalProps) => {
  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "High": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Essential Qualifications": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Emerging Technologies": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Safety & Compliance": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Specialized Skills": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Business & Management": return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  // Enhanced data for live courses with fallbacks
  const hasValidData = (data: any[] | undefined) => data && data.length > 0;
  const getDisplayValue = (value: string | undefined, fallback: string) => value || fallback;
  
  // Generate smart content for missing data
  const generateCourseOutline = (title: string) => [
    "Course fundamentals and overview",
    "Core principles and regulations",
    "Practical application techniques",
    "Assessment and certification",
    "Industry best practices"
  ];

  const generateCareerOutcomes = (title: string) => [
    "Enhanced professional qualifications",
    "Improved career advancement opportunities",
    "Access to specialised project work",
    "Increased earning potential"
  ];

  const generatePrerequisites = () => [
    "Basic electrical knowledge recommended",
    "Valid electrical qualification preferred",
    "Safety awareness certification"
  ];

  // Use fallback content for live courses with missing data
  const displayCourseOutline = hasValidData(course.courseOutline) 
    ? course.courseOutline 
    : generateCourseOutline(course.title);
    
  const displayCareerOutcomes = hasValidData(course.careerOutcomes) 
    ? course.careerOutcomes 
    : generateCareerOutcomes(course.title);
    
  const displayPrerequisites = hasValidData(course.prerequisites) 
    ? course.prerequisites 
    : generatePrerequisites();

  const displayAccreditations = hasValidData(course.accreditation) 
    ? course.accreditation 
    : ["Industry recognised certification"];

  const displayLocations = hasValidData(course.locations) 
    ? course.locations 
    : ["Multiple UK locations", "Online delivery available"];

  const displayNextDates = hasValidData(course.nextDates) 
    ? course.nextDates 
    : ["Contact provider for available dates"];

  const isLiveCourse = course.isLive || course.source;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge className={`${getCategoryColor(course.category)} text-xs`}>
                  {course.category}
                </Badge>
                {isLiveCourse && (
                  <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-300 border-blue-500/30 flex items-center gap-1">
                    <Wifi className="h-3 w-3" />
                    Live Data
                  </Badge>
                )}
                <div className="flex items-center gap-1 bg-amber-400/20 text-amber-400 px-2 py-1 rounded text-xs">
                  <Star className="h-3 w-3 fill-amber-400" />
                  <span>{course.rating}</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-1">{course.title}</h3>
              <div className="flex items-center gap-3">
                <p className="text-elec-yellow text-lg">{getDisplayValue(course.provider, "Provider TBC")}</p>
                {course.external_url && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                    onClick={() => window.open(course.external_url, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Provider Site
                  </Button>
                )}
              </div>
              <p className="text-muted-foreground mt-2">{course.description}</p>
              {isLiveCourse && course.source && (
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Database className="h-3 w-3" />
                  Source: {course.source}
                </p>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Key Information Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-elec-dark/30 border-elec-yellow/10">
              <CardContent className="p-4 text-center">
                <Clock className="h-5 w-5 text-elec-yellow mx-auto mb-2" />
                <div className="font-medium">{course.duration}</div>
                <div className="text-xs text-muted-foreground">Duration</div>
              </CardContent>
            </Card>
            <Card className="bg-elec-dark/30 border-elec-yellow/10">
              <CardContent className="p-4 text-center">
                <Users className="h-5 w-5 text-elec-yellow mx-auto mb-2" />
                <div className="font-medium">{course.level}</div>
                <div className="text-xs text-muted-foreground">Level</div>
              </CardContent>
            </Card>
            <Card className="bg-elec-dark/30 border-elec-yellow/10">
              <CardContent className="p-4 text-center">
                <PoundSterling className="h-5 w-5 text-elec-yellow mx-auto mb-2" />
                <div className="font-medium text-sm">{course.price}</div>
                <div className="text-xs text-muted-foreground">Price Range</div>
              </CardContent>
            </Card>
            <Card className="bg-elec-dark/30 border-elec-yellow/10">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-5 w-5 text-elec-yellow mx-auto mb-2" />
                <div className="font-medium">{course.futureProofing}/5</div>
                <div className="text-xs text-muted-foreground">Future-Proof</div>
              </CardContent>
            </Card>
          </div>

          {/* Industry Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-elec-yellow/10 bg-elec-dark/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-elec-yellow" />
                  Industry Outlook
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Industry Demand:</span>
                  <Badge className={`${getDemandColor(course.industryDemand)} text-xs`}>
                    {course.industryDemand}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Salary Impact:</span>
                  <span className="text-sm text-green-400 font-medium">{course.salaryImpact}</span>
                </div>
                {course.employerSupport && (
                  <div className="flex items-center gap-2 text-sm text-green-400">
                    <Briefcase className="h-4 w-4" />
                    <span>Employer Support Available</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/10 bg-elec-dark/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-4 w-4 text-elec-yellow" />
                  Accreditations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {displayAccreditations.map((acc, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs bg-blue-500/10 text-blue-300 border-blue-500/30">
                      {acc}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-elec-yellow/10 bg-elec-dark/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-elec-yellow" />
                  Course Outline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {displayCourseOutline.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/10 bg-elec-dark/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-4 w-4 text-elec-yellow" />
                  Career Outcomes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {displayCareerOutcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{outcome}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Assessment & Prerequisites */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-elec-yellow/10 bg-elec-dark/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-elec-yellow" />
                  Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Method: </span>
                  <span className="text-muted-foreground">{course.assessmentMethod}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Continuous Assessment: </span>
                  <span className="text-muted-foreground">
                    {course.continuousAssessment ? "Yes" : "Final exam only"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/10 bg-elec-dark/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Prerequisites</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {displayPrerequisites.map((prereq, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1 h-1 rounded-full bg-elec-yellow" />
                      <span className="text-muted-foreground">{prereq}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Locations */}
          <Card className="border-elec-yellow/10 bg-elec-dark/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-4 w-4 text-elec-yellow" />
                Available Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {displayLocations.map((location, idx) => (
                  <span 
                    key={idx} 
                    className="text-sm bg-elec-gray/60 px-3 py-1 rounded-md flex items-center gap-1"
                  >
                    <MapPin className="h-3 w-3" />
                    {location}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Course Dates */}
          <Card className="border-elec-yellow/10 bg-elec-dark/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-4 w-4 text-elec-yellow" />
                Upcoming Course Dates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayNextDates.map((date, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{date}</TableCell>
                      <TableCell>{displayLocations[idx % displayLocations.length]}</TableCell>
                      <TableCell>{getDisplayValue(course.format?.split(',')[0], "To be confirmed")}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          idx % 3 === 0 ? "bg-red-500/20 text-red-300" : "bg-green-500/20 text-green-300"
                        }`}>
                          {idx % 3 === 0 ? "Limited spaces" : "Available"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {course.external_url ? (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                            onClick={() => window.open(course.external_url, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Book Now
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10">
                            Enquire
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="border-elec-yellow/20 bg-elec-gray/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="h-4 w-4 text-elec-yellow" />
                Course Enquiry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CourseEnquiryForm 
                course={course}
                onSuccess={() => {
                  // Modal could be closed here if desired
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsModal;
