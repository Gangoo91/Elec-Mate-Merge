import { ChevronLeft, FileText, BookOpen, PenTool, MessageSquare, SpellCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const FunctionalSkillsModule2 = () => {
  useSEO(
    "Module 2: English for Electricians",
    "Technical reading, writing, communication skills and professional documentation for the electrical trade"
  );

  const sections = [
    {
      number: "2.1",
      title: "Reading Technical Documents",
      description:
        "BS 7671, datasheets, regulations, method statements and O&M manuals",
      icon: BookOpen,
      href: "/study-centre/apprentice/functional-skills/module2/section1",
    },
    {
      number: "2.2",
      title: "Technical Writing",
      description:
        "EICR/EIC forms, method statements, emails, reports and site notes",
      icon: PenTool,
      href: "/study-centre/apprentice/functional-skills/module2/section2",
    },
    {
      number: "2.3",
      title: "Communication Skills",
      description:
        "Client communication, site meetings, telephone manner and explaining technical work",
      icon: MessageSquare,
      href: "/study-centre/apprentice/functional-skills/module2/section3",
    },
    {
      number: "2.4",
      title: "Spelling, Grammar & Punctuation",
      description:
        "Trade vocabulary, homophones, technical terminology and proofreading",
      icon: SpellCheck,
      href: "/study-centre/apprentice/functional-skills/module2/section4",
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Back Button */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1 h-11 touch-manipulation"
            asChild
          >
            <Link to="/study-centre/apprentice/functional-skills">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Functional Skills
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 py-10 px-6"
      >
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <FileText className="w-10 h-10 text-white/90" />
          <div>
            <p className="text-green-100 text-sm font-medium">Module 2</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              English for Electricians
            </h1>
          </div>
        </div>
      </motion.div>

      {/* Sections Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {sections.map((section, index) => (
          <motion.div key={index} variants={item}>
            <ModuleCard
              number={section.number}
              title={section.title}
              description={section.description}
              icon={section.icon}
              href={section.href}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FunctionalSkillsModule2;
