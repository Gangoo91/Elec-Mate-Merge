import { BookOpen, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const FunctionalSkills = () => {
  return (
    <div className="min-h-screen pb-24 bg-elec-dark">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden">
        {/* Dark gradient background matching sidebar */}
        <div className="absolute inset-0 bg-gradient-to-br from-elec-dark via-neutral-900 to-elec-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-600/10 via-transparent to-transparent" />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 rounded-full bg-green-500/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-10 w-24 h-24 rounded-full bg-emerald-500/10 blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="mb-4 text-white/60 hover:text-white hover:bg-white/10 gap-2"
              asChild
            >
              <Link to="/study-centre/apprentice">
                <ChevronLeft className="h-4 w-4" />
                Back to Study Centre
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Icon with glow */}
            <div className="relative inline-flex mb-4">
              <div className="absolute inset-0 bg-green-500/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 shadow-2xl shadow-green-500/25">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold">
                <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                  Functional Skills
                </span>
              </h1>
              <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                Coming Soon
              </Badge>
            </div>
            <p className="text-sm text-white/50 max-w-md mx-auto">
              Comprehensive functional skills training in maths, English, and IT designed specifically for electrical apprentices
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/5 border-white/10 overflow-hidden">
            {/* Accent line at top */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />

            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white mb-4">
                What to Expect
              </h2>
              <p className="text-white/50 mb-6">
                This course will provide essential skills development in:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-green-500/20 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <div>
                    <span className="font-semibold text-white">Mathematics:</span>
                    <span className="text-white/50 ml-1">Practical calculations, measurements, and problem-solving relevant to electrical work</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-green-500/20 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <div>
                    <span className="font-semibold text-white">English:</span>
                    <span className="text-white/50 ml-1">Technical writing, documentation, and communication skills for the workplace</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-green-500/20 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <div>
                    <span className="font-semibold text-white">Digital Skills:</span>
                    <span className="text-white/50 ml-1">IT competencies including software tools, digital documentation, and online research</span>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-white/40 mt-6"
        >
          This course is currently under development and will be available soon.
        </motion.p>
      </div>
    </div>
  );
};

export default FunctionalSkills;
