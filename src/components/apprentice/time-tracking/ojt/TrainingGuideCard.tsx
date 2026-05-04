import { useIsMobile } from '@/hooks/use-mobile';

const TrainingGuideCard = () => {
  const isMobile = useIsMobile();

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        Off-the-job training guide
      </span>
      <p className="text-[14px] text-white/85 leading-relaxed">
        Off-the-job training is a key requirement for all apprenticeships. It refers to the learning
        that takes place outside of day-to-day work duties, but within your paid working hours. This
        should represent at least 20% of your total working time.
      </p>
      <div className={`grid grid-cols-1 ${isMobile ? 'gap-3' : 'md:grid-cols-2 gap-3'}`}>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            What counts as off-the-job training
          </span>
          <ul className="space-y-1.5">
            {[
              'Theory lessons and lectures',
              'Practical training (shadowing, mentoring)',
              'Learning support sessions',
              'Online learning and research',
              'Industry visits or competitions',
            ].map((item) => (
              <li
                key={item}
                className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Evidence requirements
          </span>
          <ul className="space-y-1.5">
            {[
              'Records of training activities',
              'Certificates of completion',
              'Photographs of practical work',
              'Projects and assignments',
              'Witness testimonials',
            ].map((item) => (
              <li
                key={item}
                className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrainingGuideCard;
