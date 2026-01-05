import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModuleCard } from "@/components/shared/ModuleCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Zap, BookOpen, Shield, Award, GraduationCap, ArrowLeft, CheckCircle, Settings, Info, AlertTriangle } from "lucide-react";

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
      icon: <Shield className="h-4 w-4 text-elec-yellow" />
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
      icon: <Zap className="h-4 w-4 text-elec-yellow" />
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
      icon: <Settings className="h-4 w-4 text-elec-yellow" />
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
      icon: <BookOpen className="h-4 w-4 text-elec-yellow" />
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
      icon: <CheckCircle className="h-4 w-4 text-elec-yellow" />
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
      icon: <Zap className="h-4 w-4 text-amber-400" />
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
      icon: <BookOpen className="h-4 w-4 text-elec-yellow" />
    }
  ];

  // AM2 Assessment modules
  const am2Modules = [
    {
      id: "am2-prep",
      title: "AM2 Exam Preparation",
      description: "Complete AM2 assessment preparation - practical tasks and theory revision",
      category: "AM2",
      duration: "8 weeks",
      progress: 0,
      lessonsCount: 20,
      questionsCount: 400,
      icon: <Award className="h-4 w-4 text-amber-400" />
    },
    {
      id: "am2-mock",
      title: "AM2 Mock Exams",
      description: "Timed practice exams simulating the real AM2 assessment conditions",
      category: "AM2",
      duration: "2 weeks",
      progress: 0,
      lessonsCount: 8,
      questionsCount: 200,
      icon: <GraduationCap className="h-4 w-4 text-green-400" />
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
    <div className="min-h-screen bg-elec-dark">
      {/* Header */}
      <div className="bg-elec-gray/50 border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            {/* Back Button */}
            <Button
              variant="ghost"
              className="w-fit text-muted-foreground hover:text-white p-0"
              onClick={() => navigate("/study-centre")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Study Centre
            </Button>

            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-elec-yellow" />
                Training Resources
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Study materials to support your Level 2 & AM2 preparation
              </p>
            </div>

            {/* Important Notice */}
            <Card className="bg-amber-500/10 border-amber-500/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <Info className="h-4 w-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Training Aid Notice</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      These materials are designed as a <strong className="text-amber-400">supplementary training aid</strong> to support
                      your college studies and on-the-job learning. This is not a replacement for formal qualifications,
                      registered training providers, or official City & Guilds/EAL courses. Always refer to your college
                      tutors and official course materials for accredited learning.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl bg-elec-gray/50 border border-white/10 p-3">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Topics</div>
                <div className="text-2xl font-bold text-white">{allModules.length}</div>
              </div>
              <div className="rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 p-3">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Practice Qs</div>
                <div className="text-2xl font-bold text-elec-yellow">{totalQuestions.toLocaleString()}</div>
              </div>
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">In Progress</div>
                <div className="text-2xl font-bold text-amber-400">{inProgressCount}</div>
              </div>
              <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-3">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Completed</div>
                <div className="text-2xl font-bold text-green-400">{completedCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search topics by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-elec-gray/50 border-white/10 text-white placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Tabs for filtering */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full sm:w-auto mb-6 flex-wrap h-auto bg-elec-gray/50 border border-white/10">
            <TabsTrigger value="all" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              All ({filteredModules.length})
            </TabsTrigger>
            <TabsTrigger value="Level 2" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              Level 2 ({filterByCategory("Level 2").length})
            </TabsTrigger>
            <TabsTrigger value="AM2" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              AM2 ({filterByCategory("AM2").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredModules.map((module) => (
                <ModuleCard
                  key={module.id}
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
              ))}
            </div>
          </TabsContent>

          <TabsContent value="Level 2" className="mt-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filterByCategory("Level 2").map((module) => (
                <ModuleCard
                  key={module.id}
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
              ))}
            </div>
          </TabsContent>

          <TabsContent value="AM2" className="mt-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filterByCategory("AM2").map((module) => (
                <ModuleCard
                  key={module.id}
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
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No topics found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search
            </p>
          </div>
        )}

        {/* Footer Disclaimer */}
        <Card className="mt-8 bg-elec-gray/30 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Disclaimer:</strong> Elec-Mate study materials are provided for revision and practice purposes only.
                  They do not constitute formal qualifications and should be used alongside your official college curriculum.
                  For accredited qualifications, please contact registered training providers such as City & Guilds, EAL,
                  or your local college.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
