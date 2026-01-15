import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Compass, Brain, Target, BarChart3, Clock, Award, MapPin, TrendingUp, BookOpen, Users, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionCard from "../cards/SectionCard";
import ContentCard from "../cards/ContentCard";
import CareerDetailModal from "../modals/CareerDetailModal";
import { careerSections, getSectionById, type ContentItem, type CareerSection } from "../data/careerPathwaysData";

type ViewState = "hub" | "section";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

const ElectricianCareerPathways = () => {
  const [view, setView] = useState<ViewState>("hub");
  const [activeSection, setActiveSection] = useState<CareerSection | null>(null);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSectionClick = (sectionId: string) => {
    const section = getSectionById(sectionId);
    if (section) {
      setActiveSection(section);
      setView("section");
    }
  };

  const handleBackToHub = () => {
    setView("hub");
    setActiveSection(null);
  };

  const handleItemClick = (item: ContentItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Quick stats for the hub hero
  const quickStats = [
    { icon: TrendingUp, label: "Pathways", value: "15+", color: "text-elec-yellow" },
    { icon: Star, label: "Top Salary", value: "£85k+", color: "text-green-400" },
    { icon: MapPin, label: "UK Wide", value: "10 Regions", color: "text-blue-400" },
    { icon: Award, label: "JIB Aligned", value: "6 Grades", color: "text-amber-400" },
  ];

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {view === "hub" ? (
          <motion.div
            key="hub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Hero Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden bg-elec-gray/50 border border-elec-yellow/20 rounded-2xl"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow/60 via-elec-yellow to-elec-yellow/60" />

              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                    <Compass className="h-7 w-7 text-elec-yellow" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-white">
                      Career <span className="text-elec-yellow">Pathways</span>
                    </h1>
                    <p className="text-sm text-white mt-1">
                      Your complete guide to electrical career progression
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                  {quickStats.map((stat, idx) => (
                    <div key={idx} className="bg-white/5 rounded-xl p-3 text-center">
                      <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-1`} />
                      <div className="text-lg font-bold text-white">{stat.value}</div>
                      <div className="text-[10px] text-white">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Section Cards Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {careerSections.map((section, index) => (
                <SectionCard
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  description={section.description}
                  icon={section.icon}
                  color={section.color}
                  previewStat={section.previewStat}
                  statLabel={section.statLabel}
                  onClick={() => handleSectionClick(section.id)}
                  index={index}
                />
              ))}
            </motion.div>

            {/* Footer Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-xs text-white pt-4"
            >
              All information aligned with JIB grading scheme and BS 7671:2018+A3:2024
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {activeSection && (
              <>
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative overflow-hidden bg-elec-gray/50 border border-white/10 rounded-2xl"
                >
                  <div
                    className="absolute inset-x-0 top-0 h-[2px]"
                    style={{
                      background: activeSection.color === "yellow" ? "linear-gradient(90deg, rgba(245,197,24,0.6), rgba(245,197,24,1), rgba(245,197,24,0.6))" :
                                activeSection.color === "blue" ? "linear-gradient(90deg, rgba(59,130,246,0.6), rgba(59,130,246,1), rgba(59,130,246,0.6))" :
                                activeSection.color === "green" ? "linear-gradient(90deg, rgba(34,197,94,0.6), rgba(34,197,94,1), rgba(34,197,94,0.6))" :
                                activeSection.color === "purple" ? "linear-gradient(90deg, rgba(168,85,247,0.6), rgba(168,85,247,1), rgba(168,85,247,0.6))" :
                                activeSection.color === "orange" ? "linear-gradient(90deg, rgba(249,115,22,0.6), rgba(249,115,22,1), rgba(249,115,22,0.6))" :
                                activeSection.color === "amber" ? "linear-gradient(90deg, rgba(245,158,11,0.6), rgba(245,158,11,1), rgba(245,158,11,0.6))" :
                                "linear-gradient(90deg, rgba(239,68,68,0.6), rgba(239,68,68,1), rgba(239,68,68,0.6))"
                    }}
                  />

                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBackToHub}
                        className="text-white hover:text-white hover:bg-white/10 gap-1 -ml-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">Back</span>
                      </Button>

                      <div className={`p-2.5 rounded-xl ${
                        activeSection.color === "yellow" ? "bg-elec-yellow/10 border-elec-yellow/20" :
                        activeSection.color === "blue" ? "bg-blue-500/10 border-blue-500/20" :
                        activeSection.color === "green" ? "bg-green-500/10 border-green-500/20" :
                        activeSection.color === "purple" ? "bg-purple-500/10 border-purple-500/20" :
                        activeSection.color === "orange" ? "bg-orange-500/10 border-orange-500/20" :
                        activeSection.color === "amber" ? "bg-amber-500/10 border-amber-500/20" :
                        "bg-red-500/10 border-red-500/20"
                      } border`}>
                        <activeSection.icon className={`h-5 w-5 ${
                          activeSection.color === "yellow" ? "text-elec-yellow" :
                          activeSection.color === "blue" ? "text-blue-400" :
                          activeSection.color === "green" ? "text-green-400" :
                          activeSection.color === "purple" ? "text-purple-400" :
                          activeSection.color === "orange" ? "text-orange-400" :
                          activeSection.color === "amber" ? "text-amber-400" :
                          "text-red-400"
                        }`} />
                      </div>

                      <div className="flex-1">
                        <h2 className="text-lg sm:text-xl font-bold text-white">{activeSection.title}</h2>
                        <p className="text-sm text-white">{activeSection.description}</p>
                      </div>
                    </div>

                    {/* Section Stats */}
                    <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
                      <div className="text-center">
                        <div className={`text-xl font-bold ${
                          activeSection.color === "yellow" ? "text-elec-yellow" :
                          activeSection.color === "blue" ? "text-blue-400" :
                          activeSection.color === "green" ? "text-green-400" :
                          activeSection.color === "purple" ? "text-purple-400" :
                          activeSection.color === "orange" ? "text-orange-400" :
                          activeSection.color === "amber" ? "text-amber-400" :
                          "text-red-400"
                        }`}>{activeSection.items.length}</div>
                        <div className="text-xs text-white">Topics</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-xl font-bold ${
                          activeSection.color === "yellow" ? "text-elec-yellow" :
                          activeSection.color === "blue" ? "text-blue-400" :
                          activeSection.color === "green" ? "text-green-400" :
                          activeSection.color === "purple" ? "text-purple-400" :
                          activeSection.color === "orange" ? "text-orange-400" :
                          activeSection.color === "amber" ? "text-amber-400" :
                          "text-red-400"
                        }`}>{activeSection.previewStat}</div>
                        <div className="text-xs text-white">{activeSection.statLabel}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Content Cards Grid */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {activeSection.items.map((item, index) => (
                    <ContentCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      description={item.description}
                      icon={item.icon}
                      badge={item.badge}
                      stats={item.stats}
                      color={activeSection.color}
                      onClick={() => handleItemClick(item)}
                      index={index}
                    />
                  ))}
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      {selectedItem && (
        <CareerDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedItem.title}
          description={selectedItem.description}
          badge={selectedItem.badge}
          icon={selectedItem.icon}
          color={activeSection?.color || "yellow"}
          content={selectedItem.content}
          ctaText="Got it"
          ctaAction={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ElectricianCareerPathways;
