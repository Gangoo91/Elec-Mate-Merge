import { ArrowLeft, BookOpen, Calendar, Monitor, ClipboardList, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "4.1",
    title: "Importance of Lifelong Learning in the Trade",
    description: "Understanding the value of continuous learning and skill development",
    icon: BookOpen,
    href: "../level3-module7-section4-4-1",
  },
  {
    number: "4.2", 
    title: "Attending Courses and Seminars (e.g. 18th Edition updates)",
    description: "Participating in formal training courses and industry seminars",
    icon: Calendar,
    href: "../level3-module7-section4-4-2",
  },
  {
    number: "4.3",
    title: "Online Learning Platforms and Digital Resources",
    description: "Utilising digital learning platforms and online resources for skill development",
    icon: Monitor,
    href: "../level3-module7-section4-4-3",
  },
  {
    number: "4.4",
    title: "Recording and Tracking CPD",
    description: "Methods for documenting and tracking continuing professional development",
    icon: ClipboardList,
    href: "../level3-module7-section4-4-4",
  },
  {
    number: "4.5",
    title: "Future-proofing Skills (green tech, automation, smart systems)",
    description: "Developing skills in emerging technologies and future industry trends",
    icon: Zap,
    href: "../level3-module7-section4-4-5",
  },
];

const Level3Module7Section4 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 4 - Continuing Professional Development (CPD)
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Lifelong learning, skills development and staying current with industry changes
          </p>
        </div>

        {/* Subsections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subsections.map((subsection, index) => (
            <ModuleCard
              key={index}
              number={subsection.number}
              title={subsection.title}
              description={subsection.description}
              icon={subsection.icon}
              href={subsection.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Level3Module7Section4;