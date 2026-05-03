import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Shield, HardHat, Eye, Star } from 'lucide-react';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
import PPETab from '@/components/apprentice/tools-guide/PPETab';

const PPESafety = () => {
  const navigate = useNavigate();
  const quickStats = [
    {
      label: 'Basic PPE Items',
      value: '5+',
      icon: Shield,
      color: 'text-elec-yellow',
      bg: 'from-elec-yellow/10 to-elec-yellow/5',
      border: 'border-elec-yellow/30',
    },
    {
      label: 'Specialist PPE',
      value: '5+',
      icon: HardHat,
      color: 'text-orange-400',
      bg: 'from-orange-500/10 to-orange-500/5',
      border: 'border-orange-500/30',
    },
    {
      label: 'BS Standards',
      value: '6+',
      icon: Eye,
      color: 'text-blue-400',
      bg: 'from-blue-500/10 to-blue-500/5',
      border: 'border-blue-500/30',
    },
    {
      label: 'Safety Priority',
      value: '#1',
      icon: Star,
      color: 'text-green-400',
      bg: 'from-green-500/10 to-green-500/5',
      border: 'border-green-500/30',
    },
  ];

  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/apprentice/toolbox/tools-guide')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · PPE"
          title="PPE & safety equipment"
          description="Hard hats, eye protection, gloves, arc-flash kit and the bits most apprentices forget. Standards, fit, and what actually saves you on a real job."
          tone="yellow"
        />
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className={`${stat.border} bg-gradient-to-br ${stat.bg}`}>
            <CardContent className="p-4 text-center">
              <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-white">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* PPE Content */}
      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <PPETab />
      </Card>
    </PageFrame>
  );
};

export default PPESafety;
