import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2222, AlertTriangle } from 'lucide-react';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const RightsPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button onClick={() => navigate('/apprentice/rights-and-pay')} className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Rights"
          title="Your rights"
          description="You have the same employment rights as any employee, plus extras. Your apprenticeship agreement is a legal contract — knowing what's in it protects you from unfair treatment and gets you the most from your training."
          tone="yellow"
        />
      </motion.div>

      {/* Employment Rights */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-green-400">
            Core Employment Rights
          </h2>
          <ul className="space-y-2">
            {[
              'A written apprenticeship agreement signed before you start',
              'A written statement of employment terms within 2 months',
              'National Minimum Wage for your age and year of apprenticeship',
              '28 days paid holiday per year (including bank holidays)',
              'Protection from unfair dismissal (after 2 years service)',
              'Protection from discrimination based on age, sex, race, disability, religion, or sexual orientation',
              'A safe and healthy working environment',
              'Rest breaks: 20 minutes if you work more than 6 hours',
              'Maximum 48-hour working week (you can opt out in writing, but cannot be forced to)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div></div>

      {/* Training Rights */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-blue-400">
            Training Rights
          </h2>
          <ul className="space-y-2">
            {[
              'At least 20% of your working hours must be off-the-job training',
              'Your employer must pay for all training costs, college fees, and exam fees',
              'You must never be asked to pay for your training',
              'Your End Point Assessment (EPA) must be fully funded by the employer/levy',
              'You should receive a structured training plan',
              'You are entitled to a qualified mentor or supervisor',
              'Time for study and coursework during working hours',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div></div>

      {/* Under 18 */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-purple-400">
            Additional Rights if Under 18
          </h2>
          <ul className="space-y-2">
            {[
              'Maximum 8 hours per day and 40 hours per week',
              'No night work (between 10pm and 6am, or 11pm and 7am)',
              '30-minute break if you work more than 4.5 hours',
              '12 hours rest between working days',
              '2 days off per week',
              'A specific risk assessment for young workers',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div></div>

      {/* What To Do */}
      <div className="rounded-xl border border-red-500/25 bg-red-500/[0.04]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-red-400">
            If Your Rights Are Not Being Met
          </h2>
          <div className="space-y-3">
            {[
              {
                step: '1. Talk to your employer',
                detail:
                  'Raise the issue informally first. Many problems are resolved through a simple conversation.',
              },
              {
                step: '2. Speak to your training provider',
                detail:
                  'Your college or training provider has a duty of care and can intervene on your behalf.',
              },
              {
                step: '3. Contact ACAS',
                detail:
                  'Free, confidential advice on workplace rights. Call 0300 123 1100 or visit acas.org.uk.',
              },
              {
                step: '4. Contact the Apprenticeship Helpline',
                detail:
                  'Call 0800 015 0600 for advice specific to apprenticeship issues.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1"
              >
                <p className="text-white font-semibold text-sm">{item.step}</p>
                <p className="text-white text-xs leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div></div>

      {/* Warning */}
      <div className="rounded-xl border border-red-500/25 bg-red-500/[0.04]">
        <div className="p-4 sm:p-5">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-red-400">Important:</strong> It is illegal for an
              employer to dismiss you or treat you unfairly for raising a genuine concern
              about your rights. This is called whistleblower protection.
            </p>
          </div>
        </div></div>
    </PageFrame>
  );
};

export default RightsPage;
