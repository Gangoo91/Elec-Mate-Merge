
import React from 'react';
import { SubsectionProps } from './types';
import CourseContentSection from '../../CourseContentSection';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const Subsection1_1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  console.log("Rendering Subsection1_1 component with subsectionId:", subsectionId);
  console.log("Completion status:", isCompleted);
  
  return (
    <div className="space-y-6">
      <CourseContentSection
        title="Health and Safety at Work Act 1974"
        description="The Health and Safety at Work Act 1974 is the primary piece of legislation covering occupational health and safety in Great Britain. It sets out the general duties that employers have towards employees and members of the public, and that employees have to themselves and to each other."
        keyPoints={[
          "Employers must ensure the health, safety and welfare of all employees",
          "Workplaces must be maintained to be safe and without risks to health",
          "Safe systems of work must be provided and maintained",
          "Information, instruction, training and supervision must be provided as necessary",
          "Employees have a duty to take reasonable care of their own health and safety"
        ]}
        icon="safety"
        subsectionId={subsectionId}
      />

      {/* Add completion button if needed */}
      <div className="mt-8">
        {!isCompleted && (
          <Button
            onClick={markAsComplete}
            className="w-full bg-elec-yellow hover:bg-amber-500 text-elec-dark font-medium py-3 rounded-md"
          >
            Mark as Complete
          </Button>
        )}
        {isCompleted && (
          <div className="text-center py-3 bg-green-600/20 border border-green-500/50 text-green-400 rounded-md flex items-center justify-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Section Completed</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subsection1_1;
