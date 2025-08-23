
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileInput } from "@/components/ui/mobile-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  X, MapPin, Clock, Users, BookOpen, TrendingUp, 
  PoundSterling, Award, Target, CheckCircle, 
  Calendar, Mail, Star, Briefcase, GraduationCap,
  ArrowLeft
} from "lucide-react";
import { EnhancedCareerCourse } from "./enhancedCoursesData";
import { useIsMobile } from "@/hooks/use-mobile";

interface CourseDetailsModalProps {
  course: EnhancedCareerCourse;
  onClose: () => void;
}

const CourseDetailsModal = ({ course, onClose }: CourseDetailsModalProps) => {
  const isMobile = useIsMobile();
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

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-0 sm:p-4">
      <div className={`bg-elec-dark border border-elec-yellow/20 ${
        isMobile 
          ? 'w-full h-full rounded-none' 
          : 'rounded-lg w-full max-w-5xl max-h-[90vh]'
      } overflow-y-auto`}>
        <div className={`${isMobile ? 'p-4' : 'p-6'} space-y-${isMobile ? '4' : '6'}`}>
          {/* Header */}
          <div className={`flex ${isMobile ? 'flex-col' : 'justify-between items-start'}`}>
            {isMobile && (
              <div className="flex items-center justify-between w-full mb-4">
                <MobileButton variant="ghost" size="icon" onClick={onClose}>
                  <ArrowLeft className="h-5 w-5" />
                </MobileButton>
                <h3 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-semibold text-center flex-1`}>
                  Course Details
                </h3>
                <div className="w-8" /> {/* Spacer for centering */}
              </div>
            )}
            
            <div className="flex-1">
              <div className={`flex items-center ${isMobile ? 'flex-wrap' : ''} gap-2 sm:gap-3 mb-2`}>
                <Badge className={`${getCategoryColor(course.category)} ${isMobile ? 'text-xs' : 'text-xs'}`}>
                  {isMobile ? course.category.split(' ')[0] : course.category}
                </Badge>
                <div className="flex items-center gap-1 bg-amber-400/20 text-amber-400 px-2 py-1 rounded text-xs">
                  <Star className="h-3 w-3 fill-amber-400" />
                  <span>{course.rating}</span>
                </div>
              </div>
              <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-semibold mb-1`}>
                {course.title}
              </h3>
              <p className={`text-elec-yellow ${isMobile ? 'text-base' : 'text-lg'}`}>
                {course.provider}
              </p>
              <p className={`text-muted-foreground mt-2 ${isMobile ? 'text-sm' : ''}`}>
                {course.description}
              </p>
            </div>
            
            {!isMobile && (
              <MobileButton variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </MobileButton>
            )}
          </div>

          {/* Key Information Grid */}
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'} gap-${isMobile ? '3' : '4'}`}>
            <Card className="bg-elec-dark/30 border-elec-yellow/10">
              <CardContent className={`${isMobile ? 'p-3' : 'p-4'} text-center`}>
                <Clock className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-elec-yellow mx-auto mb-2`} />
                <div className={`font-medium ${isMobile ? 'text-sm' : ''}`}>{course.duration}</div>
                <div className={`${isMobile ? 'text-xs' : 'text-xs'} text-muted-foreground`}>Duration</div>
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
                  {course.accreditation.map((acc, idx) => (
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
                  {course.courseOutline.map((item, idx) => (
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
                  {course.careerOutcomes.map((outcome, idx) => (
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
                  {course.prerequisites.map((prereq, idx) => (
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
                {course.locations.map((location, idx) => (
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
                  {course.nextDates.map((date, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{date}</TableCell>
                      <TableCell>{course.locations[idx % course.locations.length]}</TableCell>
                      <TableCell>{course.format.split(',')[0]}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          idx % 3 === 0 ? "bg-red-500/20 text-red-300" : "bg-green-500/20 text-green-300"
                        }`}>
                          {idx % 3 === 0 ? "Limited spaces" : "Available"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <MobileButton size="sm" variant="outline" className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10">
                          Enquire
                        </MobileButton>
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
              <form className="space-y-4">
                <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2'} gap-4`}>
                  <MobileInput
                    label="Full Name"
                    placeholder="Your full name"
                    value=""
                    onChange={() => {}}
                  />
                  <MobileInput
                    label="Email Address"
                    type="email"
                    placeholder="your.email@example.com"
                    value=""
                    onChange={() => {}}
                  />
                  <MobileInput
                    label="Phone Number"
                    type="tel"
                    placeholder="Your contact number"
                    value=""
                    onChange={() => {}}
                  />
                  <MobileSelectWrapper
                    label="Preferred Location"
                    placeholder="Select location"
                    value=""
                    onValueChange={() => {}}
                    options={course.locations.map(location => ({ value: location, label: location }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea 
                    placeholder="Please tell us about your experience level, preferred dates, or any specific questions about this course..." 
                    rows={isMobile ? 3 : 4}
                    className="resize-none"
                  />
                </div>
                <MobileButton className="w-full bg-elec-yellow text-elec-dark hover:bg-amber-400">
                  <Mail className="mr-2 h-4 w-4" />
                  Submit Course Enquiry
                </MobileButton>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsModal;
