import { Book } from 'lucide-react';
import { Link } from 'react-router-dom';

const OffJobTrainingInfo = () => {
  return (
    <div className="bg-white/5 border border-elec-yellow/20 rounded-md p-4">
      <div className="flex items-center gap-2 mb-2">
        <Book className="h-5 w-5 text-elec-yellow" />
        <h3 className="font-semibold">Off-the-Job Training</h3>
      </div>
      <p className="text-sm text-white">
        Off-the-job training is a fixed number of hours set by your apprenticeship standard — 1,066
        hours for an Installation &amp; Maintenance Electrician (ST0152) for starts from 1 August
        2025. All courses in the Study Centre count toward it. Your time spent learning on this app
        is automatically tracked in the{' '}
        <Link to="/apprentice/ojt-hub" className="text-elec-yellow hover:underline">
          Off-the-Job Time Keeping
        </Link>{' '}
        section.
      </p>
    </div>
  );
};

export default OffJobTrainingInfo;
