
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  MapPin, 
  Star, 
  GraduationCap, 
  Calendar,
  TrendingUp,
  Award,
  Users,
  CheckCircle,
  FileText,
  Target
} from "lucide-react";
import { CareerCourse } from "./coursesData";
import CourseEnquiryForm from "./CourseEnquiryForm";

interface CourseDetailsModalProps {
  course: CareerCourse | null;
  isOpen: boolean;
  onClose: () => void;
}

const CourseDetailsModal = ({ course, isOpen, onClose }: CourseDetailsModalProps) => {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  if (!course) return null;

  const handleEnquireClick = () => {
    setShowEnquiryForm(true);
  };

  const handleEnquirySuccess = () => {
    setShowEnquiryForm(false);
    onClose();
  };

  const handleBackToDetails = () => {
    setShowEnquiryForm(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-elec-gray border-elec-yellow/20">
        <DialogHeader>
          <DialogTitle className="text-2xl text-elec-yellow flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            {showEnquiryForm ? 'Course Enquiry' : course.title}
          </DialogTitle>
        </DialogHeader>

        {showEnquiryForm ? (
          <div className="space-y-4">
            <div className="p-4 bg-elec-yellow/5 border border-elec-yellow/20 rounded-lg">
              <h3 className="font-semibold text-elec-yellow mb-2">Course Details</h3>
              <p className="text-sm"><strong>Course:</strong> {course.title}</p>
              <p className="text-sm"><strong>Provider:</strong> {course.provider}</p>
            </div>
            
            <CourseEnquiryForm 
              course={course} 
              onSuccess={handleEnquirySuccess}
            />
            
            <Button 
              variant="outline" 
              onClick={handleBackToDetails}
              className="w-full"
            >
              Back to Course Details
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Course Header */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                    {course.provider}
                  </Badge>
                  {course.isLive && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      LIVE
                    </Badge>
                  )}
                </div>
                <p className="text-elec-light/80 mb-4">{course.description}</p>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-elec-yellow" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-elec-yellow" />
                    <span>{course.rating}/5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-elec-yellow" />
                    <span>{course.locations[0]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-elec-yellow" />
                    <span>{course.level}</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-80 bg-elec-yellow/5 border border-elec-yellow/20 rounded-lg p-4">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-elec-yellow">{course.price}</div>
                  <div className="text-sm text-elec-light/60">{course.format}</div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="font-medium text-elec-yellow mb-2">Next Available Dates:</h4>
                    <div className="space-y-1">
                      {course.nextDates.map((date, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <Calendar className="h-3 w-3 text-elec-yellow" />
                          <span>{date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                  variant="outline"
                  onClick={handleEnquireClick}
                >
                  Enquire
                </Button>
              </div>
            </div>

            <Separator className="bg-elec-yellow/20" />

            {/* Course Details Tabs */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Course Outline */}
                <div>
                  <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Course Outline
                  </h3>
                  <ul className="space-y-2">
                    {course.courseOutline.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prerequisites */}
                <div>
                  <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Prerequisites
                  </h3>
                  <ul className="space-y-1">
                    {course.prerequisites.map((prereq, idx) => (
                      <li key={idx} className="text-sm flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow"></span>
                        <span>{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Assessment */}
                <div>
                  <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Assessment Method
                  </h3>
                  <p className="text-sm">{course.assessmentMethod}</p>
                  {course.continuousAssessment && (
                    <Badge className="mt-2 bg-blue-500/20 text-blue-400 border-blue-500/30">
                      Continuous Assessment
                    </Badge>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Career Impact */}
                <div>
                  <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Career Impact
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Industry Demand</span>
                      <Badge className={
                        course.industryDemand === 'High' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                        course.industryDemand === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                        'bg-red-500/20 text-red-400 border-red-500/30'
                      }>
                        {course.industryDemand}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Future-Proofing</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < course.futureProofing ? 'text-elec-yellow fill-current' : 'text-gray-600'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Salary Impact</span>
                      <span className="text-sm font-medium text-elec-yellow">{course.salaryImpact}</span>
                    </div>
                  </div>
                </div>

                {/* Career Outcomes */}
                <div>
                  <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Career Outcomes
                  </h3>
                  <ul className="space-y-1">
                    {course.careerOutcomes.map((outcome, idx) => (
                      <li key={idx} className="text-sm flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow"></span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Accreditation */}
                <div>
                  <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Accreditation
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {course.accreditation.map((acc, idx) => (
                      <Badge key={idx} className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                        {acc}
                      </Badge>
                    ))}
                  </div>
                  {course.employerSupport && (
                    <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">
                      Employer Supported
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Locations */}
            {course.locations.length > 1 && (
              <>
                <Separator className="bg-elec-yellow/20" />
                <div>
                  <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Available Locations
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                    {course.locations.map((location, idx) => (
                      <Badge key={idx} variant="outline" className="border-elec-yellow/30 text-elec-light">
                        {location}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailsModal;
