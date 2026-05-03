import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import StudyPsychologyTab from '@/components/apprentice/study-tips/StudyPsychologyTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const PsychologyPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/apprentice/toolbox/study-tips')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Study"
          title="Study Psychology"
          tone="yellow"
        />
      </motion.div>

      <Card className="border-red-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            The Mental Side of Studying
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Your mindset has a massive impact on how effectively you learn.
            Understanding motivation, dealing with procrastination, managing
            study anxiety, and building confidence are just as important as
            the study techniques themselves.
          </p>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h3 className="text-red-400 font-semibold text-sm mb-3">
              Topics Covered
            </h3>
            <ul className="space-y-2">
              {[
                'Overcoming procrastination — why we avoid studying',
                'Building motivation when you feel like giving up',
                'Managing exam anxiety and performance pressure',
                'Growth mindset — believing you can improve',
                'Celebrating progress and staying positive',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <StudyPsychologyTab />
    </PageFrame>
  );
};

export default PsychologyPage;
