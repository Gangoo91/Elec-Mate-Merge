import { ArrowLeft, ClipboardCheck, Clock, BookOpen, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const SmartHomeModule8 = () => {
  const infoCards = [
    {
      id: 1,
      title: "Exam Overview",
      icon: ClipboardCheck,
      items: [
        "30 multiple-choice questions",
        "45-minute time limit",
        "Pass mark: 70% (21 correct answers)",
        "Covers all smart home technology areas",
        "Immediate results and detailed feedback"
      ]
    },
    {
      id: 2,
      title: "Topics Covered",
      icon: BookOpen,
      items: [
        "Smart home system fundamentals",
        "Communication protocols",
        "Lighting and scene programming",
        "HVAC and environmental control",
        "Security and access control",
        "Hubs and voice assistants",
        "Installation and safety"
      ]
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../smart-home-course">
          <Button
            variant="ghost"
            className="text-white hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Smart Home Course
          </Button>
        </Link>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Module 8: Mock Exam
            </h1>
            <p className="text-xl text-white mb-6">
              Test your knowledge with a comprehensive mock examination covering all aspects of smart home technology
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 8
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                45 minutes
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                30 Questions
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {infoCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-elec-yellow/30 hover:shadow-lg hover:shadow-elec-yellow/10 transition-all duration-300 h-full min-h-[200px]"
                >
                  {/* Accent line at top */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elec-yellow/50 to-transparent" />

                  {/* Hover glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl bg-elec-yellow/20 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

                  <CardContent className="relative p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-white/10">
                        <card.icon className="h-6 w-6 text-elec-yellow" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-bold text-white">{card.title}</h3>
                    </div>
                    <div className="space-y-3 text-white/70">
                      {card.items.map((item, i) => (
                        <p key={i} className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1">•</span>
                          {item}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card
              className="group relative overflow-hidden bg-elec-yellow/10 backdrop-blur-sm border border-elec-yellow/30 rounded-xl hover:bg-elec-yellow/15 hover:shadow-lg hover:shadow-elec-yellow/10 transition-all duration-300"
            >
              {/* Accent line at top */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elec-yellow/50 to-transparent" />

              {/* Hover glow */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl bg-elec-yellow/20 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

              <CardContent className="relative p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-white/10">
                    <CheckCircle className="h-6 w-6 text-elec-yellow" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Before You Begin</h3>
                </div>
                <div className="space-y-3 text-white/70">
                  <p className="flex items-start gap-2"><span className="text-elec-yellow mt-1">•</span>Ensure you have completed all previous modules</p>
                  <p className="flex items-start gap-2"><span className="text-elec-yellow mt-1">•</span>Review your module notes and key concepts</p>
                  <p className="flex items-start gap-2"><span className="text-elec-yellow mt-1">•</span>Find a quiet environment with stable internet connection</p>
                  <p className="flex items-start gap-2"><span className="text-elec-yellow mt-1">•</span>Allow uninterrupted time for the full 60-minute duration</p>
                  <p className="flex items-start gap-2"><span className="text-elec-yellow mt-1">•</span>Have a calculator and notepad available if needed</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="flex justify-center pt-6">
            <Link to="../smart-home-mock-exam">
              <Button
                className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200 px-8 py-3 text-lg font-semibold min-h-[48px]"
              >
                <Clock className="mr-2 h-5 w-5" />
                Start Mock Exam
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHomeModule8;
