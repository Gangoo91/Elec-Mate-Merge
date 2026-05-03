import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CircuitBoard, Shield, Zap, Star } from 'lucide-react';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
import TestEquipmentTab from '@/components/apprentice/tools-guide/TestEquipmentTab';

const TestEquipment = () => {
  const navigate = useNavigate();
  const quickStats = [
    {
      label: 'Basic Tools',
      value: '5+',
      icon: Zap,
      color: 'text-elec-yellow',
      bg: 'from-elec-yellow/10 to-elec-yellow/5',
      border: 'border-elec-yellow/30',
    },
    {
      label: 'Advanced Tools',
      value: '5+',
      icon: CircuitBoard,
      color: 'text-blue-400',
      bg: 'from-blue-500/10 to-blue-500/5',
      border: 'border-blue-500/30',
    },
    {
      label: 'UK Standards',
      value: 'GS38',
      icon: Shield,
      color: 'text-green-400',
      bg: 'from-green-500/10 to-green-500/5',
      border: 'border-green-500/30',
    },
    {
      label: '18th Edition',
      value: 'BS7671',
      icon: Star,
      color: 'text-purple-400',
      bg: 'from-purple-500/10 to-purple-500/5',
      border: 'border-purple-500/30',
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
          eyebrow="Apprentice · Test equipment"
          title="Test equipment"
          description="Multifunction testers, clamp meters, voltage indicators, GS38 leads. What's calibrated, what's compliant, and what passes BS 7671:2018+A4:2026 testing."
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

      {/* Test Equipment Content */}
      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <TestEquipmentTab />
      </Card>
    </PageFrame>
  );
};

export default TestEquipment;
