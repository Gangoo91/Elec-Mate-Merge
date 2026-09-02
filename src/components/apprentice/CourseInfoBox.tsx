import { BookOpen } from 'lucide-react';

const CourseInfoBox = () => {
  return (
    <div className="text-sm text-white bg-white/5 border border-elec-yellow/20 rounded-md p-4">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="h-4 w-4 text-elec-yellow" />
        <p className="font-medium">Off-the-Job Training Info</p>
      </div>
      <p>
        Your apprenticeship carries a fixed off-the-job training total set by its standard (1,066
        hours for ST0152, for starts from 1 August 2025) — this course counts toward it. Your time
        spent learning on this app is automatically tracked in the Off-the-Job Time Keeping section.
      </p>
    </div>
  );
};

export default CourseInfoBox;
