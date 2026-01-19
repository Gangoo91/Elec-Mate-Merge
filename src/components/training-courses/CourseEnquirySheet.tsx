import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Phone,
  Mail,
  ExternalLink,
  MapPin,
  Clock,
  PoundSterlingSterling,
  Star,
  Send,
  CheckCircle2,
  Building2,
  Calendar
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import type { EnhancedCareerCourse } from "@/components/apprentice/career/courses/enhancedCoursesData";

interface CourseEnquirySheetProps {
  course: EnhancedCareerCourse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CourseEnquirySheet = ({ course, open, onOpenChange }: CourseEnquirySheetProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!course) return;

    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email");
      return;
    }

    setIsSubmitting(true);

    try {
      // Get current user if logged in
      const { data: { user } } = await supabase.auth.getUser();

      // Save enquiry to database
      const { error } = await supabase.from("course_enquiries").insert({
        course_id: course.id,
        user_id: user?.id || null,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message || null,
        status: "pending",
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Enquiry sent successfully!");

      // Reset form after delay
      setTimeout(() => {
        setFormData({ name: "", email: "", phone: "", message: "" });
        setIsSubmitted(false);
        onOpenChange(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to submit enquiry:", err);
      toast.error("Failed to send enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!course) return null;

  // Extract additional fields from the transformed course
  const contactPhone = (course as any).contact_phone;
  const contactEmail = (course as any).contact_email;
  const bookingUrl = (course as any).booking_url;
  const venuePostcode = (course as any).venue_postcode;
  const nextDates = (course as any).next_dates;
  const distance = (course as any)._distance;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[90vh] sm:h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-background"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-4 pb-0 flex-shrink-0">
            <SheetTitle className="text-left text-lg">Enquire About Course</SheetTitle>
          </SheetHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Course Summary Card */}
            <div className="bg-elec-gray/50 border border-blue-500/20 rounded-xl p-4">
              <h3 className="font-semibold text-white text-base leading-tight">{course.title}</h3>
              <div className="flex items-center gap-2 mt-2 text-sm text-white/70">
                <Building2 className="h-3.5 w-3.5" />
                <span>{course.provider}</span>
              </div>

              <div className="flex flex-wrap gap-3 mt-3">
                <div className="flex items-center gap-1.5 text-sm">
                  <PoundSterling className="h-3.5 w-3.5 text-green-400" />
                  <span className="text-white">{course.price}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Clock className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-white/70">{course.duration}</span>
                </div>
                {course.rating && (
                  <div className="flex items-center gap-1.5 text-sm">
                    <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-white">{course.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>

              {/* Location info */}
              {(course.location || venuePostcode) && (
                <div className="flex items-center gap-1.5 mt-3 text-sm text-white/70">
                  <MapPin className="h-3.5 w-3.5 text-purple-400" />
                  <span>
                    {course.location}
                    {venuePostcode && ` (${venuePostcode})`}
                    {distance && ` • ${distance.toFixed(1)} miles`}
                  </span>
                </div>
              )}

              {/* Next dates */}
              {nextDates && nextDates.length > 0 && (
                <div className="flex items-center gap-1.5 mt-2 text-sm text-white/70">
                  <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Next: {nextDates.slice(0, 2).join(", ")}</span>
                </div>
              )}
            </div>

            {/* Success State */}
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Enquiry Sent!</h3>
                <p className="text-sm text-white/60 mt-1">
                  The training provider will contact you shortly.
                </p>
              </div>
            ) : (
              <>
                {/* Enquiry Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm text-white/80">
                      Your Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-blue-500/50 touch-manipulation"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm text-white/80">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-blue-500/50 touch-manipulation"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm text-white/80">
                      Phone Number (optional)
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="07XXX XXXXXX"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-blue-500/50 touch-manipulation"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm text-white/80">
                      Message (optional)
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="I'm interested in this course and would like more information about..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={4}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-blue-500/50 touch-manipulation text-base resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium gap-2"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Enquiry
                      </>
                    )}
                  </Button>
                </form>

                {/* Direct Contact Options */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-white/50 text-center mb-3">
                    Or contact the provider directly
                  </p>

                  <div className="flex gap-2">
                    {contactPhone && (
                      <Button
                        variant="outline"
                        asChild
                        className="flex-1 h-11 bg-white/5 border-white/10 text-white hover:text-white hover:bg-white/10 gap-2"
                      >
                        <a href={`tel:${contactPhone}`}>
                          <Phone className="h-4 w-4" />
                          Call
                        </a>
                      </Button>
                    )}

                    {contactEmail && (
                      <Button
                        variant="outline"
                        asChild
                        className="flex-1 h-11 bg-white/5 border-white/10 text-white hover:text-white hover:bg-white/10 gap-2"
                      >
                        <a href={`mailto:${contactEmail}`}>
                          <Mail className="h-4 w-4" />
                          Email
                        </a>
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      asChild
                      className={cn(
                        "h-11 bg-white/5 border-white/10 text-white hover:text-white hover:bg-white/10 gap-2",
                        !contactPhone && !contactEmail ? "flex-1" : "flex-1"
                      )}
                    >
                      <a
                        href={bookingUrl || course.external_url || course.visitLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Website
                      </a>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CourseEnquirySheet;
