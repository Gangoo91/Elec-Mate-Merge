import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CourseEnquiryForm from "./CourseEnquiryForm";

interface CourseEnquiryModalProps {
  course: {
    id: string;
    title: string;
    provider: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const CourseEnquiryModal: React.FC<CourseEnquiryModalProps> = ({
  course,
  open,
  onOpenChange,
  onSuccess
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Enquire About Course</DialogTitle>
          <DialogDescription>
            Send an enquiry about {course.title} to {course.provider}
          </DialogDescription>
        </DialogHeader>
        
        <CourseEnquiryForm
          course={course}
          onSuccess={() => {
            onSuccess?.();
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CourseEnquiryModal;