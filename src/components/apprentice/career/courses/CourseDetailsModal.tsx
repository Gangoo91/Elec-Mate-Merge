
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CareerCourse, TrainingCenter } from './coursesData';

interface CourseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  course?: CareerCourse | null;
  center?: TrainingCenter | null;
}

const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({ 
  isOpen, 
  onClose, 
  course = null, 
  center = null 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{course ? course.title : center ? center.name : 'Details'}</DialogTitle>
          <DialogDescription>
            {course ? course.description : center ? center.description || 'Learn more about this training center.' : 'Learn more about this course or training center.'}
          </DialogDescription>
        </DialogHeader>

        {course && (
          <>
            {/* Course Details */}
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Course Information</h3>
                <p><strong>Provider:</strong> {course.provider}</p>
                <p><strong>Duration:</strong> {course.duration}</p>
                <p><strong>Level:</strong> {course.level}</p>
                <p><strong>Skills Covered:</strong> {course.skills ? course.skills.join(', ') : 'Not specified'}</p>
              </div>
            </div>

            {/* Location Information */}
            <div className="hidden border-elec-yellow/20 bg-elec-gray/50 rounded-lg p-4">
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Locations</h3>
                {course.locations && course.locations.length > 0 ? (
                  <ul>
                    {course.locations.map((location, index) => (
                      <li key={index}>{location}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No specific locations provided. Contact the provider for more information.</p>
                )}
              </div>
            </div>
          </>
        )}

        {center && (
          <>
            {/* Training Center Details */}
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Training Center Information</h3>
                <p><strong>Address:</strong> {center.address}</p>
                <p><strong>Contact:</strong> {center.contact}</p>
                <p><strong>Website:</strong> <a href={center.website || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{center.website || 'Not available'}</a></p>
              </div>
            </div>

            {/* Courses Offered */}
            <div className="border-t border-elec-yellow/20 pt-4">
              <h3 className="text-lg font-bold">Courses Offered</h3>
              {center.coursesOffered && center.coursesOffered.length > 0 ? (
                <ul>
                  {center.coursesOffered.map((courseName: string, index: number) => (
                    <li key={index}>{courseName}</li>
                  ))}
                </ul>
              ) : (
                <p>No courses listed. Contact the center for more information.</p>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailsModal;
