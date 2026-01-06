
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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-elec-gray to-elec-card border border-elec-yellow/20 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-white mb-2">{center.name}</h3>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-elec-yellow" />
                  <span>{center.location}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-lg border border-amber-500/30">
                  <Star className="h-4 w-4 fill-amber-400" />
                  <span className="font-medium">{center.rating}</span>
                </div>
                <span className="text-xs text-white/60">Est. {center.establishedYear}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{center.successRate}%</div>
                <div className="text-xs text-white/70 mt-1">Success Rate</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{center.employmentRate}%</div>
                <div className="text-xs text-white/70 mt-1">Employment Rate</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border-elec-yellow/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-elec-yellow">{center.studentCapacity}</div>
                <div className="text-xs text-white/70 mt-1">Capacity</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{center.establishedYear}</div>
                <div className="text-xs text-white/70 mt-1">Established</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <CardHeader className="pb-3 relative">
                <CardTitle className="text-lg flex items-center gap-3 text-white">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
                    <Phone className="h-4 w-4 text-elec-yellow" />
                  </div>
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 relative">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <MapPin className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/80">{center.address}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <Phone className="h-4 w-4 text-elec-yellow" />
                  <span className="text-sm text-white/80">{center.contact}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <Globe className="h-4 w-4 text-elec-yellow" />
                  <span className="text-sm text-white/80">{center.website}</span>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
                  <h5 className="text-sm font-medium mb-3 text-elec-yellow flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Opening Hours
                  </h5>
                  <div className="grid grid-cols-2 gap-2 text-sm text-white/70">
                    <div>Monday - Friday</div>
                    <div className="text-white">08:30 - 17:00</div>
                    <div>Saturday</div>
                    <div className="text-white">09:00 - 13:00</div>
                    <div>Sunday</div>
                    <div className="text-white/50">Closed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specializations & Courses */}
            <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-blue-500/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <CardHeader className="pb-3 relative">
                <CardTitle className="text-lg flex items-center gap-3 text-white">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
                    <Building className="h-4 w-4 text-blue-400" />
                  </div>
                  Specializations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative">
                <div>
                  <h5 className="text-sm font-medium mb-3 text-white/80">Areas of Expertise:</h5>
                  <div className="flex flex-wrap gap-2">
                    {center.specializations.map((spec, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-medium mb-3 text-white/80">Featured Courses:</h5>
                  <div className="space-y-2">
                    {center.courses.slice(0, 5).map((course, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm p-2 rounded-lg bg-white/5">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                        <span className="text-white/80">{course}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Accreditations & Support Services */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-amber-500/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <CardHeader className="pb-3 relative">
                <CardTitle className="text-lg flex items-center gap-3 text-white">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30">
                    <Award className="h-4 w-4 text-amber-400" />
                  </div>
                  Accreditations
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex flex-wrap gap-2">
                  {center.accreditations.map((acc, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs bg-amber-500/10 text-amber-400 border-amber-500/30">
                      {acc}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-green-500/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <CardHeader className="pb-3 relative">
                <CardTitle className="text-lg flex items-center gap-3 text-white">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
                    <Users className="h-4 w-4 text-green-400" />
                  </div>
                  Support Services
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-2">
                  {center.supportServices.map((service, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm p-2 rounded-lg bg-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                      <span className="text-white/80">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Facilities */}
          <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-purple-500/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <CardHeader className="pb-3 relative">
              <CardTitle className="text-lg flex items-center gap-3 text-white">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
                  <Building className="h-4 w-4 text-purple-400" />
                </div>
                Training Facilities
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {center.facilities.map((facility, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm p-3 bg-white/5 rounded-lg border border-white/10">
                    <CheckCircle className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                    <span className="text-white/80">{facility}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <CardHeader className="pb-3 relative">
              <CardTitle className="text-lg flex items-center gap-3 text-white">
                <div className="p-2 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
                  <Mail className="h-4 w-4 text-elec-yellow" />
                </div>
                Contact Training Centre
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Full Name</label>
                    <Input
                      placeholder="Your full name"
                      className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Email Address</label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Phone Number</label>
                    <Input
                      placeholder="Your contact number"
                      className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Course Interest</label>
                    <Select>
                      <SelectTrigger className="h-11 bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent className="bg-elec-gray border-white/20">
                        {center.courses.map((course) => (
                          <SelectItem key={course} value={course}>{course}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Message</label>
                  <Textarea
                    placeholder="Please tell us about your training requirements, preferred dates, or any specific questions..."
                    rows={4}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>
                <Button className="w-full h-11 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 touch-manipulation active:scale-95 transition-all">
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
