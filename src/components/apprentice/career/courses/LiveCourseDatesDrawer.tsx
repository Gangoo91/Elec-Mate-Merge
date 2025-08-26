import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  MapPin, 
  Users, 
  ExternalLink,
  Phone,
  Mail,
  Clock,
  Loader2
} from "lucide-react";
import { LiveCourse, useLiveCourses } from "@/hooks/useLiveCourses";
import CourseEnquiryModal from "./CourseEnquiryModal";

interface LiveCourseDatesDrawerProps {
  course: LiveCourse;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LiveCourseDatesDrawer: React.FC<LiveCourseDatesDrawerProps> = ({
  course,
  open,
  onOpenChange
}) => {
  const [courseDates, setCourseDates] = useState<any>(null);
  const [loadingDates, setLoadingDates] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const { getCourseDates } = useLiveCourses();

  useEffect(() => {
    if (open && course.detailsUrl) {
      fetchCourseDates();
    }
  }, [open, course.detailsUrl]);

  const fetchCourseDates = async () => {
    setLoadingDates(true);
    try {
      const result = await getCourseDates(course.detailsUrl, course.id, course.provider);
      if (result.success) {
        setCourseDates(result.dates);
      }
    } catch (error) {
      console.error('Error fetching course dates:', error);
    } finally {
      setLoadingDates(false);
    }
  };

  const getAvailabilityColor = (availability: string) => {
    const lower = availability.toLowerCase();
    if (lower.includes('full') || lower.includes('closed')) return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    if (lower.includes('few') || lower.includes('limited')) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
    return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const allDates = [
    ...(course.upcomingDates || []),
    ...(courseDates?.upcomingDates || [])
  ].filter((date, index, self) => 
    index === self.findIndex(d => d.startDate === date.startDate && d.location === date.location)
  );

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-lg">{course.courseTitle}</DrawerTitle>
            <DrawerDescription>
              Available dates and booking information for {course.provider}
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-6 overflow-y-auto">
            {loadingDates ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                <span>Loading available dates...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Course Overview */}
                <Card className="bg-elec-gray">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{course.priceRange}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Available Dates */}
                {allDates.length > 0 ? (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-base">Available Dates</h3>
                    {allDates.map((date, index) => (
                      <Card key={index} className="bg-elec-gray">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 font-medium">
                                <Calendar className="w-4 h-4 text-primary" />
                                {formatDate(date.startDate)}
                                {date.endDate && (
                                  <>
                                    <span className="text-muted-foreground">-</span>
                                    {formatDate(date.endDate)}
                                  </>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                {date.location}
                              </div>
                            </div>
                            
                            {date.availability && (
                              <Badge className={getAvailabilityColor(date.availability)}>
                                <Users className="w-3 h-3 mr-1" />
                                {date.availability}
                              </Badge>
                            )}
                          </div>

                          <div className="flex justify-between items-center">
                            {date.price && (
                              <span className="font-medium text-primary">{date.price}</span>
                            )}
                            
                            <div className="flex gap-2">
                              {date.bookingUrl ? (
                                <Button
                                  size="sm"
                                  onClick={() => window.open(date.bookingUrl, '_blank')}
                                  className="text-xs"
                                >
                                  Book Now
                                  <ExternalLink className="w-3 h-3 ml-1" />
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setShowEnquiryForm(true)}
                                  className="text-xs"
                                >
                                  Enquire
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="bg-elec-gray">
                    <CardContent className="p-4 text-center">
                      <Calendar className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground mb-3">
                        No specific dates available online. Contact the provider for availability.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setShowEnquiryForm(true)}
                        className="w-full"
                      >
                        Contact Provider
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Booking Instructions */}
                {(courseDates?.bookingInstructions || course.bookingInstructions) && (
                  <Card className="bg-elec-gray">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">How to Book</h3>
                      <p className="text-sm text-muted-foreground">
                        {courseDates?.bookingInstructions || course.bookingInstructions}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Contact Information */}
                {(courseDates?.contactInfo || course.contactInfo) && (
                  <Card className="bg-elec-gray">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Contact Information</h3>
                      <div className="space-y-2">
                        {(courseDates?.contactInfo?.phone || course.contactInfo?.phone) && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <a 
                              href={`tel:${courseDates?.contactInfo?.phone || course.contactInfo?.phone}`}
                              className="text-primary hover:underline"
                            >
                              {courseDates?.contactInfo?.phone || course.contactInfo?.phone}
                            </a>
                          </div>
                        )}
                        {(courseDates?.contactInfo?.email || course.contactInfo?.email) && (
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <a 
                              href={`mailto:${courseDates?.contactInfo?.email || course.contactInfo?.email}`}
                              className="text-primary hover:underline"
                            >
                              {courseDates?.contactInfo?.email || course.contactInfo?.email}
                            </a>
                          </div>
                        )}
                        {(courseDates?.contactInfo?.bookingUrl || course.contactInfo?.bookingUrl) && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(courseDates?.contactInfo?.bookingUrl || course.contactInfo?.bookingUrl, '_blank')}
                            className="w-full mt-2"
                          >
                            Visit Booking Page
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Quick Enquiry */}
                <Card className="bg-elec-gray border-primary/20">
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold mb-2">Need More Information?</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Send an enquiry directly to the training provider
                    </p>
                    <Button
                      onClick={() => setShowEnquiryForm(true)}
                      className="w-full"
                    >
                      Send Enquiry
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>

      <CourseEnquiryModal
        course={{
          id: course.id,
          title: course.courseTitle,
          provider: course.provider
        }}
        open={showEnquiryForm}
        onOpenChange={setShowEnquiryForm}
        onSuccess={() => {
          setShowEnquiryForm(false);
          onOpenChange(false);
        }}
      />
    </>
  );
};

export default LiveCourseDatesDrawer;