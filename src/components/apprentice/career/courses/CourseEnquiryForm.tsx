
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, User, Mail, Phone, Calendar, MessageSquare } from "lucide-react";

const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  preferredStartDate: z.string().optional(),
  message: z.string().optional(),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

interface CourseEnquiryFormProps {
  course: {
    id: number | string;
    title: string;
    provider: string;
  };
  onSuccess?: () => void;
}

export default function CourseEnquiryForm({ course, onSuccess }: CourseEnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);

    try {
      const { data: response, error } = await supabase.functions.invoke('course-enquiry', {
        body: {
          courseId: course.id.toString(),
          courseTitle: course.title,
          courseProvider: course.provider,
          enquirerName: data.name,
          enquirerEmail: data.email,
          enquirerPhone: data.phone,
          message: data.message,
          preferredStartDate: data.preferredStartDate,
        }
      });

      if (error) {
        throw error;
      }

      if (!response?.success) {
        throw new Error(response?.error || 'Failed to submit enquiry');
      }

      toast({
        title: "Enquiry Sent Successfully",
        description: "The course provider will contact you soon.",
        variant: "success"
      });

      reset();
      onSuccess?.();

    } catch (error: any) {
      console.error('Error submitting enquiry:', error);
      toast({
        title: "Failed to Send Enquiry",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white/80 flex items-center gap-2">
            <User className="h-3.5 w-3.5 text-elec-yellow" />
            Full Name *
          </Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Enter your full name"
            className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40"
          />
          {errors.name && (
            <p className="text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/80 flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-elec-yellow" />
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Enter your email address"
            className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40"
          />
          {errors.email && (
            <p className="text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white/80 flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-elec-yellow" />
            Phone Number (Optional)
          </Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="Enter your phone number"
            className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredStartDate" className="text-white/80 flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-elec-yellow" />
            Preferred Start Date
          </Label>
          <Input
            id="preferredStartDate"
            type="date"
            {...register("preferredStartDate")}
            className="h-11 bg-white/5 border-white/20 text-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-white/80 flex items-center gap-2">
          <MessageSquare className="h-3.5 w-3.5 text-elec-yellow" />
          Message (Optional)
        </Label>
        <textarea
          id="message"
          {...register("message")}
          rows={4}
          placeholder="Any specific questions or requirements..."
          className="w-full px-3 py-3 border border-white/20 bg-white/5 rounded-lg text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-elec-yellow/50 focus:border-elec-yellow/50 transition-all"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-11 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 touch-manipulation active:scale-95 transition-all font-medium"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending Enquiry...
          </>
        ) : (
          <>
            <Mail className="mr-2 h-4 w-4" />
            Send Enquiry
          </>
        )}
      </Button>
    </form>
  );
}
