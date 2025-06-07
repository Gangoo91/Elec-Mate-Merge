
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, X, Phone, Globe, Award, Users, Building, 
  Star, CheckCircle, Clock, Mail, Calendar 
} from "lucide-react";
import { EnhancedTrainingCenter } from "./enhancedCoursesData";

interface TrainingCenterDetailsModalProps {
  center: EnhancedTrainingCenter;
  onClose: () => void;
}

const TrainingCenterDetailsModal = ({ center, onClose }: TrainingCenterDetailsModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-2">{center.name}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-elec-yellow" />
                  <span>{center.location}</span>
                </div>
                <div className="flex items-center gap-1 bg-amber-400/20 text-amber-400 px-2 py-1 rounded">
                  <Star className="h-4 w-4 fill-amber-400" />
                  <span>{center.rating}</span>
                </div>
                <span className="text-xs">Est. {center.establishedYear}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-elec-dark/30 border-elec-yellow/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{center.successRate}%</div>
                <div className="text-xs text-muted-foreground">Success Rate</div>
              </CardContent>
            </Card>
            <Card className="bg-elec-dark/30 border-elec-yellow/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{center.employmentRate}%</div>
                <div className="text-xs text-muted-foreground">Employment Rate</div>
              </CardContent>
            </Card>
            <Card className="bg-elec-dark/30 border-elec-yellow/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-elec-yellow">{center.studentCapacity}</div>
                <div className="text-xs text-muted-foreground">Capacity</div>
              </CardContent>
            </Card>
            <Card className="bg-elec-dark/30 border-elec-yellow/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white">{center.establishedYear}</div>
                <div className="text-xs text-muted-foreground">Established</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card className="border-elec-yellow/10 bg-elec-dark/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Phone className="h-4 w-4 text-elec-yellow" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{center.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-elec-yellow" />
                  <span className="text-sm">{center.contact}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-elec-yellow" />
                  <span className="text-sm">{center.website}</span>
                </div>
                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-2 text-elec-yellow">Opening Hours</h5>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Monday - Friday</div>
                    <div>08:30 - 17:00</div>
                    <div>Saturday</div>
                    <div>09:00 - 13:00</div>
                    <div>Sunday</div>
                    <div>Closed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specializations & Courses */}
            <Card className="border-elec-yellow/10 bg-elec-dark/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building className="h-4 w-4 text-elec-yellow" />
                  Specializations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h5 className="text-sm font-medium mb-2">Areas of Expertise:</h5>
                  <div className="flex flex-wrap gap-2">
                    {center.specializations.map((spec, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-blue-500/10 text-blue-300 border-blue-500/30">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-medium mb-2">Featured Courses:</h5>
                  <div className="space-y-2">
                    {center.courses.slice(0, 5).map((course, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                        <span className="text-muted-foreground">{course}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Accreditations & Support Services */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-elec-yellow/10 bg-elec-dark/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-4 w-4 text-elec-yellow" />
                  Accreditations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {center.accreditations.map((acc, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs bg-amber-400/10 text-amber-400 border-amber-400/30">
                      {acc}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/10 bg-elec-dark/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-4 w-4 text-elec-yellow" />
                  Support Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {center.supportServices.map((service, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1 h-1 rounded-full bg-elec-yellow" />
                      <span className="text-muted-foreground">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Facilities */}
          <Card className="border-elec-yellow/10 bg-elec-dark/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Training Facilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {center.facilities.map((facility, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm p-2 bg-elec-dark/50 rounded">
                    <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                    <span className="text-muted-foreground">{facility}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="border-elec-yellow/20 bg-elec-gray/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="h-4 w-4 text-elec-yellow" />
                Contact Training Centre
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input type="email" placeholder="your.email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input placeholder="Your contact number" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Course Interest</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {center.courses.map((course) => (
                          <SelectItem key={course} value={course}>{course}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea 
                    placeholder="Please tell us about your training requirements, preferred dates, or any specific questions..." 
                    rows={4}
                  />
                </div>
                <Button className="w-full bg-elec-yellow text-elec-dark hover:bg-amber-400">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Enquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrainingCenterDetailsModal;
