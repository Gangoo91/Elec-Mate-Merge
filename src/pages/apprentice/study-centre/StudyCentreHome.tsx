import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModuleCard } from "@/components/shared/ModuleCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Zap, BookOpen, Shield, Award, GraduationCap, CheckCircle, Settings, Info, AlertTriangle, Target, Flame, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function StudyCentreHome() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Level 2 Electrical Installation modules (7 modules)
  const level2Modules = [
    {
      id: "level2-module1",
      title: "Module 1: Health and Safety",
      description: "Health and Safety in Building Services Engineering - HASAWA, PPE, risk assessments",
      category: "Level 2",
      duration: "4 weeks",
      progress: 0,
      lessonsCount: 12,
      questionsCount: 250,
      icon: <Shield className="h-4 w-4 text-blue-400" />
    },
    {
      id: "level2-module2",
      title: "Module 2: Electrical Science",
      description: "Principles of electrical science - Ohm's law, circuits, magnetism, AC/DC theory",
      category: "Level 2",
      duration: "6 weeks",
      progress: 0,
      lessonsCount: 18,
      questionsCount: 250,
      icon: <Zap className="h-4 w-4 text-blue-400" />
    },
    {
      id: "level2-module3",
      title: "Module 3: Electrical Installations",
      description: "Electrical installation technology - wiring systems, containment, accessories",
      category: "Level 2",
      duration: "8 weeks",
      progress: 0,
      lessonsCount: 24,
      questionsCount: 250,
      icon: <Settings className="h-4 w-4 text-blue-400" />
    },
    {
      id: "level2-module4",
      title: "Module 4: Installation Methods",
      description: "Installation methods, procedures and requirements for electrical systems",
      category: "Level 2",
      duration: "6 weeks",
      progress: 0,
      lessonsCount: 16,
      questionsCount: 250,
      icon: <BookOpen className="h-4 w-4 text-blue-400" />
    },
    {
      id: "level2-module5",
      title: "Module 5: Inspection & Testing",
      description: "Understanding inspection and testing of electrical installations",
      category: "Level 2",
      duration: "5 weeks",
      progress: 0,
      lessonsCount: 14,
      questionsCount: 250,
      icon: <CheckCircle className="h-4 w-4 text-blue-400" />
    },
    {
      id: "level2-module6",
      title: "Module 6: Fault Diagnosis",
      description: "Electrical fault diagnosis and rectification techniques",
      category: "Level 2",
      duration: "4 weeks",
      progress: 0,
      lessonsCount: 12,
      questionsCount: 250,
      icon: <Zap className="h-4 w-4 text-purple-400" />
    },
    {
      id: "level2-module7",
      title: "Module 7: Regulations",
      description: "Understanding BS7671 wiring regulations and building regulations",
      category: "Level 2",
      duration: "4 weeks",
      progress: 0,
      lessonsCount: 10,
      questionsCount: 250,
      icon: <BookOpen className="h-4 w-4 text-blue-400" />
    }
  ];

  // AM2 Assessment modules
  const am2Modules = [
    {
      id: "am2",
      title: "AM2 Preparation & Guidance",
      description: "Complete AM2 assessment preparation - practical tasks, testing, fault diagnosis and exam strategy",
      category: "AM2",
      duration: "8 weeks",
      progress: 0,
      lessonsCount: 20,
      questionsCount: 400,
      icon: <Award className="h-4 w-4 text-elec-yellow" />
    }
  ];

  // Combine all modules
  const allModules = [...level2Modules, ...am2Modules];

  const filteredModules = allModules.filter(module =>
    module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filterByCategory = (category?: string) => {
    if (!category) return filteredModules;
    return filteredModules.filter(module => module.category === category);
  };

  const completedCount = allModules.filter(m => m.progress === 100).length;
  const inProgressCount = allModules.filter(m => m.progress > 0 && m.progress < 100).length;
  const totalQuestions = allModules.reduce((sum, m) => sum + m.questionsCount, 0);

  return (
    <div className="pb-24 bg-elec-dark">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden">
        {/* Dark gradient background matching sidebar */}
        <div className="absolute inset-0 bg-gradient-to-br from-elec-dark via-neutral-900 to-elec-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent" />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 rounded-full bg-blue-500/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-10 w-24 h-24 rounded-full bg-purple-500/10 blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />

        <div className="relative px-4 pt-4 pb-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/study-centre")}
              className="mb-4 text-white hover:text-white hover:bg-white/10 gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Study Centre
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Icon with glow */}
            <div className="relative inline-flex mb-4">
              <div className="absolute inset-0 bg-blue-500/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 shadow-2xl shadow-blue-500/25">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                Apprentice Training
              </span>
            </h1>
            <p className="text-sm text-white/50 max-w-[320px] mx-auto">
              Level 2 & AM2 study materials to support your electrical apprenticeship
            </p>
          </motion.div>

          {/* Premium Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 grid grid-cols-4 gap-2"
          >
            {[
              { value: allModules.length, label: "Topics", icon: BookOpen, color: "from-blue-500 to-cyan-400" },
              { value: totalQuestions.toLocaleString(), label: "Questions", icon: Target, color: "from-purple-500 to-pink-400" },
              { value: inProgressCount, label: "Active", icon: Flame, color: "from-orange-500 to-red-400" },
              { value: completedCount, label: "Done", icon: CheckCircle, color: "from-emerald-500 to-teal-400" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + idx * 0.05 }}
                className="relative group"
              >
                <div className="relative flex flex-col items-center p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                  <div className={cn("p-1.5 rounded-lg bg-gradient-to-br mb-1.5", stat.color)}>
                    <stat.icon className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-lg font-bold text-white">{stat.value}</span>
                  <span className="text-[10px] text-white/50 uppercase tracking-wider font-medium">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 space-y-4 -mt-2">
        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 p-4"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 shrink-0">
              <Info className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white mb-1">Training Aid Notice</p>
              <p className="text-xs text-white/50 leading-relaxed">
                These materials are designed as a <span className="text-amber-400 font-medium">supplementary training aid</span> to support
                your college studies and on-the-job learning.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          {!searchQuery && (
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
          )}
          <Input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn("bg-white/5 border-white/10 text-white placeholder:text-white focus:border-blue-500/50 focus:ring-blue-500/20", !searchQuery && "pl-10")}
          />
        </motion.div>

        {/* Tabs and Module Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full sm:w-auto mb-4 flex-wrap h-auto bg-white/5 border border-white/10 p-1">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white text-white"
              >
                All ({filteredModules.length})
              </TabsTrigger>
              <TabsTrigger
                value="Level 2"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-white"
              >
                Level 2 ({filterByCategory("Level 2").length})
              </TabsTrigger>
              <TabsTrigger
                value="AM2"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-elec-yellow data-[state=active]:to-amber-500 data-[state=active]:text-elec-dark text-white"
              >
                AM2 ({filterByCategory("AM2").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {filteredModules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    <ModuleCard
                      title={module.title}
                      description={module.description}
                      category={module.category}
                      duration={module.duration}
                      progress={module.progress}
                      completed={module.progress === 100}
                      lessonsCount={module.lessonsCount}
                      questionsCount={module.questionsCount}
                      icon={module.icon}
                      onClick={() => navigate(`/study-centre/apprentice/${module.id}`)}
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="Level 2" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {filterByCategory("Level 2").map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <ModuleCard
                      title={module.title}
                      description={module.description}
                      category={module.category}
                      duration={module.duration}
                      progress={module.progress}
                      completed={module.progress === 100}
                      lessonsCount={module.lessonsCount}
                      questionsCount={module.questionsCount}
                      icon={module.icon}
                      onClick={() => navigate(`/study-centre/apprentice/${module.id}`)}
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="AM2" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {filterByCategory("AM2").map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <ModuleCard
                      title={module.title}
                      description={module.description}
                      category={module.category}
                      duration={module.duration}
                      progress={module.progress}
                      completed={module.progress === 100}
                      lessonsCount={module.lessonsCount}
                      questionsCount={module.questionsCount}
                      icon={module.icon}
                      onClick={() => navigate(`/study-centre/apprentice/${module.id}`)}
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Empty State */}
        {filteredModules.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="p-4 rounded-2xl bg-white/5 inline-block mb-4">
              <BookOpen className="h-12 w-12 text-white/30" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No topics found</h3>
            <p className="text-sm text-white/50">
              Try adjusting your search
            </p>
          </motion.div>
        )}

        {/* Footer Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl bg-white/5 border border-white/10 p-4"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
            <p className="text-xs text-white leading-relaxed">
              <strong className="text-white">Disclaimer:</strong> Elec-Mate study materials are provided for revision and practice purposes only.
              For accredited qualifications, please contact registered training providers.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
