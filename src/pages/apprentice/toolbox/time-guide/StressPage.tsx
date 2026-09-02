import StressManagementTab from '@/components/apprentice/time-management/StressManagementTab';
import { motion } from 'framer-motion';
import { itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead, HubSectionHeading } from '@/components/hub/HubPrimitives';
import GuideIntro from './GuideIntro';

const StressPage = () => {
  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · Time"
        title="Stress & Wellbeing"
        backTo="/apprentice/toolbox/time-management"
      />
      <HubBody>
        <motion.div variants={itemVariants}>
          <GuideIntro
            eyebrow="Apprentice · Time"
            title="Managing stress as an apprentice"
            blurb="Feeling stressed is normal — especially when you are balancing work, study, and exams. The key is recognising it early and having strategies to manage it. These techniques will help you stay in control and protect your mental health."
            listLabel="Stress management tips"
            items={[
              'Recognise your stress triggers early',
              'Use breathing techniques to calm down quickly',
              'Talk to someone you trust when things get tough',
              'Exercise regularly — even a 20-minute walk helps',
              'Sleep is not a luxury — protect your 7-8 hours',
            ]}
          />
        </motion.div>

        <motion.section variants={itemVariants} className="space-y-4 sm:space-y-5">
          <HubSectionHeading>Fatigue & driving home</HubSectionHeading>
          <div className="border-y sm:border sm:rounded-md border-elec-yellow/20 bg-transparent sm:bg-white/[0.05] -mx-4 px-4 py-4 sm:mx-0 sm:p-4 space-y-2.5">
            <p className="text-white text-[12.5px] leading-relaxed">
              After a long physical day and a long commute, tiredness behind the wheel is a real
              trade hazard. Tired driving slows your reactions just like alcohol does.
            </p>
            <ul className="space-y-2">
              {[
                'Never start a long drive home if you are already exhausted — take a break, get a coffee, or rest before setting off.',
                'On long journeys, plan a proper break roughly every two hours.',
                'Do not try to study or revise when you are overtired — you will retain little and lose more rest.',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[12.5px] text-white leading-relaxed"
                >
                  <span className="mt-[7px] h-1 w-1 rounded-full bg-elec-yellow/85 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-white leading-relaxed pt-1">
              Sources: HSE fatigue guidance, NHS sleep and tiredness advice.
            </p>
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-4 sm:space-y-5">
          <HubSectionHeading>Help built for our industry</HubSectionHeading>
          <div className="border-y sm:border sm:rounded-md border-elec-yellow/20 bg-transparent sm:bg-white/[0.05] -mx-4 px-4 py-4 sm:mx-0 sm:p-4 space-y-2.5">
            <p className="text-white text-[12.5px] leading-relaxed">
              The Electrical Industries Charity supports everyone in the electrotechnical trade —
              including apprentices. It offers free, confidential help with mental health, money
              worries, bereavement and legal issues, plus free apprentice mental-health training.
            </p>
            <a
              href="tel:08006521618"
              className="inline-flex items-center justify-center h-11 w-full sm:w-auto px-4 rounded-md border border-elec-yellow/40 bg-white/[0.06] text-elec-yellow text-sm font-medium touch-manipulation hover:bg-elec-yellow/15 transition-colors"
            >
              Electrical Industries Charity — 0800 652 1618
            </a>
            <p className="text-[11px] text-white leading-relaxed pt-1">
              Free support line. More at electricalcharity.org/find-help. In an emergency, always
              call 999.
            </p>
          </div>
        </motion.section>

        <StressManagementTab />
      </HubBody>
    </HubPage>
  );
};

export default StressPage;
