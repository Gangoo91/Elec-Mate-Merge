import React from 'react';

const AboutCard = () => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4 animate-fade-in">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        About these safety scenarios
      </span>

      <p className="text-[14px] text-white/85 leading-relaxed">
        These interactive case studies are based on real situations encountered by UK electrical
        apprentices and electricians. Each scenario is designed to help you apply your knowledge of
        UK electrical regulations, safety standards, and professional conduct.
      </p>

      <p className="text-[14px] text-white/85 leading-relaxed">
        All references to regulations are specific to the UK electrical industry, including BS 7671
        (IET Wiring Regulations), the Electricity at Work Regulations 1989, and other relevant HSE
        guidelines. Practising these scenarios will help prepare you for real-world decision making
        on the job.
      </p>
    </div>
  );
};

export default AboutCard;
