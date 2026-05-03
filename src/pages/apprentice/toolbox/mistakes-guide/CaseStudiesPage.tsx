import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import CaseStudiesTab from '@/components/apprentice/learning-mistakes/CaseStudiesTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const CaseStudiesPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/apprentice/toolbox/learning-from-mistakes')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Resilience"
          title="Case Studies"
          tone="yellow"
        />
      </motion.div>

      <Card className="border-green-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Real-World Learning Examples
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Learn from real scenarios that apprentice electricians have faced.
            Each case study walks through what happened, what went wrong, how
            it was resolved, and the lessons learned. These stories show that
            mistakes are part of the journey — not the end of it.
          </p>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h3 className="text-green-400 font-semibold text-sm mb-3">
              Case Study Topics
            </h3>
            <ul className="space-y-2">
              {[
                'Technical errors on real installations',
                'Safety near-misses and how they were handled',
                'Communication breakdowns and their consequences',
                'Failed assessments turned into pass marks',
                'Career setbacks that became turning points',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <CaseStudiesTab />
    </PageFrame>
  );
};

export default CaseStudiesPage;
