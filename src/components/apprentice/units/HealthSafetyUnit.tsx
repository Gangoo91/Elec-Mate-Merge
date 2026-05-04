import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { healthAndSafetySections } from '@/data/healthAndSafety/index';
import BackButton from '../BackButton';
import { useAuth } from '@/contexts/AuthContext';
import { userKey } from '@/lib/userStorage';
import { storageGetSync } from '@/utils/storage';

interface HealthSafetyUnitProps {
  unitCode: string;
  onResourceClick: (type: string) => void;
}

const HealthSafetyUnit = ({ unitCode, onResourceClick }: HealthSafetyUnitProps) => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { courseSlug, sectionId } = useParams();
  const { user } = useAuth();

  // Load completion status (user-scoped)
  useEffect(() => {
    const storedQuizStatus = storageGetSync(
      userKey(user?.id, `unit_${unitCode}_quiz_completed`)
    );
    if (storedQuizStatus === 'true') {
      setQuizCompleted(true);
    }
  }, [unitCode, user?.id]);

  const handleSectionClick = () => {
    // Report study activity when opening a section
    onResourceClick('learning');
  };

  // Create a URL slug from a section number and title
  const createSectionSlug = (sectionNumber: string) => {
    return sectionNumber.toLowerCase().replace(/\//g, '-');
  };

  // Section 1 specific content
  const renderSection1Content = () => {
    const subsections = [
      {
        slug: '1.1',
        title: 'Legislation and Regulations',
        description:
          'Study of key health and safety laws relevant to electrical work, including the Health and Safety at Work Act, Electricity at Work Regulations, and COSHH.',
      },
      {
        slug: '1.2',
        title: 'Roles and Responsibilities',
        description:
          'Identification of duties for employers, employees, and other stakeholders in maintaining a safe working environment.',
      },
      {
        slug: '1.3',
        title: 'Risk Assessment & Implementation',
        description:
          'Learn how to conduct thorough risk assessments, create proper method statements, and implement effective incident reporting procedures in electrical work.',
      },
    ];

    return (
      <div className="space-y-4 mt-6">
        <div className="space-y-2">
          <h2 className="text-[20px] sm:text-[22px] font-semibold text-white leading-tight">
            Health and Safety in Electrical Work
          </h2>
          <p className="text-[14px] text-white/70 leading-relaxed">
            This section covers the key legislation and regulations that govern health and safety in
            electrical work, along with the roles and responsibilities of different stakeholders in
            maintaining a safe work environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          {subsections.map((s) => (
            <Link
              key={s.slug}
              to={`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/section/1/subsection/${s.slug}`}
              onClick={handleSectionClick}
              className="block touch-manipulation"
            >
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 h-full active:bg-white/[0.04] transition-colors space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 font-mono">
                    {s.slug}
                  </span>
                  <h3 className="text-[16px] font-semibold text-white leading-tight">{s.title}</h3>
                </div>
                <p className="text-[14px] text-white/70 leading-relaxed">{s.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Add Back Button at the top */}
      <div className="mb-6">
        <BackButton courseSlug={courseSlug} unitSlug={unitCode.toLowerCase().replace('/', '-')} />
      </div>

      {/* Display Section 1 specific content if we're on section 1 */}
      {sectionId === '1' && renderSection1Content()}

      {/* Original Health and Safety Content - keep this for other sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {healthAndSafetySections.map((section) => {
          const sectionSlug = createSectionSlug(section.sectionNumber);
          return (
            <Link
              key={section.sectionNumber}
              to={`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/section/${sectionSlug}`}
              onClick={handleSectionClick}
              className="block touch-manipulation h-full"
            >
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 h-full active:bg-white/[0.04] transition-colors">
                <div className="flex items-baseline gap-3">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 font-mono">
                    {section.sectionNumber}
                  </span>
                  <h3 className="text-[16px] font-semibold text-white leading-tight">
                    {section.title}
                  </h3>
                </div>
              </div>
            </Link>
          );
        })}

        {/* Quiz Section */}
        <Link
          to={`/apprentice/study/eal/${courseSlug}/unit/${unitCode.toLowerCase().replace('/', '-')}/quiz`}
          onClick={() => {
            handleSectionClick();
            onResourceClick('assessment');
          }}
          className="block touch-manipulation h-full"
        >
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 h-full relative active:bg-white/[0.04] transition-colors">
            <div className="flex items-baseline gap-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Quiz
              </span>
              <h3 className="text-[16px] font-semibold text-white leading-tight">
                Health & Safety Assessment
              </h3>
            </div>

            {quizCompleted && (
              <CheckCircle className="absolute top-4 right-4 h-4 w-4 text-elec-yellow" />
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HealthSafetyUnit;
