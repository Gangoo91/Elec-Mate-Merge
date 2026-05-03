import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import StressManagementTab from '@/components/apprentice/time-management/StressManagementTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const StressPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/apprentice/toolbox/time-management')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Time"
          title="Stress & Wellbeing"
          tone="yellow"
        />
      </motion.div>

      <Card className="border-orange-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Managing Stress as an Apprentice
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Feeling stressed is normal — especially when you are balancing work,
            study, and exams. The key is recognising it early and having
            strategies to manage it. These techniques will help you stay in
            control and protect your mental health.
          </p>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <h3 className="text-orange-400 font-semibold text-sm mb-3">
              Stress Management Tips
            </h3>
            <ul className="space-y-2">
              {[
                'Recognise your stress triggers early',
                'Use breathing techniques to calm down quickly',
                'Talk to someone you trust when things get tough',
                'Exercise regularly — even a 20-minute walk helps',
                'Sleep is not a luxury — protect your 7-8 hours',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-orange-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <StressManagementTab />
    </PageFrame>
  );
};

export default StressPage;
