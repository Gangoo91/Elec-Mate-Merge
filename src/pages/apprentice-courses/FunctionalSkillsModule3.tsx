import { ChevronLeft, Laptop, FolderOpen, Table, Smartphone, ShieldCheck } from "lucide-react";
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

const FunctionalSkillsModule3 = () => {
  useSEO(
    "Module 3: Digital Skills for Electricians",
    "Computer basics, spreadsheets, digital documentation, apps and online safety for electrical professionals"
  );

  const sections = [
    {
      number: "3.1",
      title: "Computer Basics & File Management",
      description:
        "OS navigation, file types, cloud storage, naming conventions and backups",
      icon: FolderOpen,
      href: "/study-centre/apprentice/functional-skills/module3/section1",
    },
    {
      number: "3.2",
      title: "Spreadsheets & Calculations",
      description:
        "Excel and Sheets for cable calculations, material lists, job costing and formulae",
      icon: Table,
      href: "/study-centre/apprentice/functional-skills/module3/section2",
    },
    {
      number: "3.3",
      title: "Digital Documentation & Apps",
      description:
        "Certification software, PDF annotation, photo evidence and digital tools",
      icon: Smartphone,
      href: "/study-centre/apprentice/functional-skills/module3/section3",
    },
    {
      number: "3.4",
      title: "Online Safety & Communication",
      description:
        "Email etiquette, phishing awareness, passwords, GDPR and social media",
      icon: ShieldCheck,
      href: "/study-centre/apprentice/functional-skills/module3/section4",
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
          <Laptop className="w-10 h-10 text-white/90" />
          <div>
            <p className="text-green-100 text-sm font-medium">Module 3</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Digital Skills for Electricians
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

export default FunctionalSkillsModule3;
