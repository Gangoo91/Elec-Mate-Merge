import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

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
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Enter your full name"
          className="bg-background"
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="Enter your email address"
          className="bg-background"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number (Optional)</Label>
        <Input
          id="phone"
          type="tel"
          {...register("phone")}
          placeholder="Enter your phone number"
          className="bg-background"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="preferredStartDate">Preferred Start Date</Label>
        <Input
          id="preferredStartDate"
          type="date"
          {...register("preferredStartDate")}
          className="bg-background"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message">Message (Optional)</Label>
        <textarea
          id="message"
          {...register("message")}
          rows={4}
          placeholder="Any specific questions or requirements..."
          className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending Enquiry...
          </>
        ) : (
          'Send Enquiry'
        )}
      </Button>
    </form>
  );
}