import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ExternalLink,
  Clock,
  PoundSterling,
  Award,
  CheckCircle,
  TrendingUp,
  MapPin,
  Star,
  ChevronRight,
  Briefcase,
  BookOpen,
  Shield,
  Users,
} from "lucide-react";
import { AccreditationOption } from "../../../apprentice/career/accreditation/enhancedAccreditationData";
import { getBrandInfo, getLogoUrl, getInitials } from "./accreditationBranding";
import { cn } from "@/lib/utils";

interface ElectricianAccreditationDetailViewProps {
  accreditation: AccreditationOption;
  onBack: () => void;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

type TabType = "overview" | "benefits" | "requirements" | "process";

const ElectricianAccreditationDetailView = ({ accreditation, onBack }: ElectricianAccreditationDetailViewProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const brandInfo = getBrandInfo(accreditation.accreditationBody);
  const logoUrl = getLogoUrl(accreditation.accreditationBody, accreditation.website);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Entry Level": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "Advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Expert": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default: return "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30";
    }
  };

  const tabs = [
    { id: "overview" as TabType, label: "Overview", icon: Award },
    { id: "benefits" as TabType, label: "Benefits", icon: Star },
    { id: "requirements" as TabType, label: "Requirements", icon: BookOpen },
    { id: "process" as TabType, label: "Get Started", icon: ChevronRight },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-2 text-white/60 hover:text-white hover:bg-white/10 -ml-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </motion.div>

      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-elec-gray/50 border rounded-2xl"
        style={{ borderColor: brandInfo.brandColor + "40" }}
      >
        {/* Gradient accent line */}
        <div
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{ background: `linear-gradient(to right, ${brandInfo.brandColor}60, ${brandInfo.brandColor}, ${brandInfo.brandColor}60)` }}
        />

        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            {/* Logo */}
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center border-2 bg-white/5 flex-shrink-0"
              style={{ borderColor: brandInfo.brandColor + "60" }}
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={`${accreditation.accreditationBody} logo`}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : (
                <span className="text-lg font-bold" style={{ color: brandInfo.brandColor }}>
                  {getInitials(accreditation.accreditationBody)}
                </span>
              )}
            </div>

            {/* Title & Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline" className={getDifficultyColor(accreditation.difficulty)}>
                  {accreditation.level}
                </Badge>
                {accreditation.onlineAvailable && (
                  <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    Online Available
                  </Badge>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">
                {accreditation.title}
              </h1>
              <p className="text-sm sm:text-base" style={{ color: brandInfo.brandColor }}>
                {accreditation.provider}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <Clock className="h-5 w-5 text-elec-yellow mx-auto mb-1" />
              <div className="text-sm font-medium text-white truncate">{accreditation.duration}</div>
              <div className="text-[10px] text-white/50">Duration</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <PoundSterling className="h-5 w-5 text-green-400 mx-auto mb-1" />
              <div className="text-sm font-medium text-white truncate">{accreditation.cost}</div>
              <div className="text-[10px] text-white/50">Investment</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <MapPin className="h-5 w-5 text-blue-400 mx-auto mb-1" />
              <div className="text-sm font-medium text-white truncate">
                {accreditation.locations.length > 1 ? 'UK-wide' : accreditation.locations[0]}
              </div>
              <div className="text-[10px] text-white/50">Locations</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <TrendingUp className="h-5 w-5 text-purple-400 mx-auto mb-1" />
              <div className="text-sm font-medium text-white">{accreditation.popularity}%</div>
              <div className="text-[10px] text-white/50">Popularity</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation - Mobile-Friendly Horizontal Scroll */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0",
              activeTab === tab.id
                ? "bg-elec-yellow text-black"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "overview" && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
              {/* Description */}
              <motion.div variants={itemVariants} className="bg-elec-gray/50 border border-white/10 rounded-xl p-4 sm:p-5">
                <p className="text-white/80 leading-relaxed">{accreditation.description}</p>
              </motion.div>

              {/* Career Impact */}
              <motion.div variants={itemVariants} className="bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/20 rounded-xl p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-elec-yellow/20">
                    <TrendingUp className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-elec-yellow mb-1">Career Impact</h3>
                    <p className="text-sm text-white/80">{accreditation.careerImpact}</p>
                  </div>
                </div>
              </motion.div>

              {/* Key Benefits Preview */}
              <motion.div variants={itemVariants} className="bg-elec-gray/50 border border-white/10 rounded-xl p-4 sm:p-5">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Key Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {accreditation.benefits.slice(0, 4).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                      <span className="text-white/70">{benefit}</span>
                    </div>
                  ))}
                </div>
                {accreditation.benefits.length > 4 && (
                  <button
                    onClick={() => setActiveTab("benefits")}
                    className="mt-3 text-sm text-elec-yellow hover:text-elec-yellow/80 flex items-center gap-1"
                  >
                    View all {accreditation.benefits.length} benefits
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </motion.div>
            </motion.div>
          )}

          {activeTab === "benefits" && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
              {/* Professional Recognition */}
              <motion.div variants={itemVariants} className="bg-elec-gray/50 border border-white/10 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Award className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-white">Professional Recognition</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-purple-300 mb-1">Industry Standing</h4>
                    <p className="text-xs text-white/60">Instant credibility and recognition within the electrical industry</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-purple-300 mb-1">Consumer Trust</h4>
                    <p className="text-xs text-white/60">Customers actively seek accredited professionals</p>
                  </div>
                </div>
              </motion.div>

              {/* Business Advantages */}
              <motion.div variants={itemVariants} className="bg-elec-gray/50 border border-white/10 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Briefcase className="h-5 w-5 text-green-400" />
                  </div>
                  <h3 className="font-semibold text-white">Business Advantages</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-start gap-3 bg-green-500/10 rounded-lg p-3">
                    <PoundSterling className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-green-300">Higher Rates</h4>
                      <p className="text-xs text-white/60">Command 15-25% premium pricing over non-accredited competitors</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-blue-500/10 rounded-lg p-3">
                    <Users className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-300">Marketing Edge</h4>
                      <p className="text-xs text-white/60">Use accreditation logos and materials to win more contracts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-purple-500/10 rounded-lg p-3">
                    <Shield className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-purple-300">Insurance Discounts</h4>
                      <p className="text-xs text-white/60">Access reduced premiums through accreditation body partnerships</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* All Benefits List */}
              <motion.div variants={itemVariants} className="bg-elec-gray/50 border border-white/10 rounded-xl p-4 sm:p-5">
                <h3 className="font-semibold text-white mb-4">All Benefits</h3>
                <div className="space-y-2">
                  {accreditation.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-2 bg-white/5 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "requirements" && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
              {/* Essential Requirements */}
              <motion.div variants={itemVariants} className="bg-elec-gray/50 border border-white/10 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-amber-500/20">
                    <BookOpen className="h-5 w-5 text-amber-400" />
                  </div>
                  <h3 className="font-semibold text-white">Essential Requirements</h3>
                </div>
                <div className="space-y-2">
                  {accreditation.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-amber-400">{idx + 1}</span>
                      </div>
                      <span className="text-sm text-white/80">{req}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Experience */}
              <motion.div variants={itemVariants} className="bg-elec-gray/50 border border-white/10 rounded-xl p-4 sm:p-5">
                <h3 className="font-semibold text-white mb-4">Experience Requirements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-blue-500/10 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-400">2-4</div>
                    <div className="text-xs text-white/60">Years Experience</div>
                  </div>
                  <div className="bg-purple-500/10 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-purple-400">BS 7671</div>
                    <div className="text-xs text-white/60">Compliance</div>
                  </div>
                  <div className="bg-green-500/10 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-400">£2m+</div>
                    <div className="text-xs text-white/60">Insurance</div>
                  </div>
                </div>
              </motion.div>

              {/* Documentation */}
              <motion.div variants={itemVariants} className="bg-elec-gray/50 border border-white/10 rounded-xl p-4 sm:p-5">
                <h3 className="font-semibold text-white mb-3">Documentation Needed</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "Qualification certificates",
                    "Work portfolio & references",
                    "CPD records",
                    "Insurance documents",
                    "Business registration",
                    "Character references",
                  ].map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                      {doc}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "process" && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
              {/* Steps */}
              <motion.div variants={itemVariants} className="bg-elec-gray/50 border border-white/10 rounded-xl p-4 sm:p-5">
                <h3 className="font-semibold text-white mb-4">Application Steps</h3>
                <div className="space-y-3">
                  {accreditation.nextSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-elec-yellow">{idx + 1}</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-sm text-white/80">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Timeline */}
              <motion.div variants={itemVariants} className="bg-elec-gray/50 border border-white/10 rounded-xl p-4 sm:p-5">
                <h3 className="font-semibold text-white mb-4">Typical Timeline</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <div className="text-sm font-medium text-blue-300 mb-1">Preparation</div>
                    <div className="text-xs text-white/60">2-4 weeks to gather documents</div>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                    <div className="text-sm font-medium text-amber-300 mb-1">Assessment</div>
                    <div className="text-xs text-white/60">1-6 weeks for review</div>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <div className="text-sm font-medium text-green-300 mb-1">Approval</div>
                    <div className="text-xs text-white/60">1-2 weeks final decision</div>
                  </div>
                </div>
              </motion.div>

              {/* Investment */}
              <motion.div variants={itemVariants} className="bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/20 rounded-xl p-4 sm:p-5">
                <h3 className="font-semibold text-white mb-4">Investment</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-elec-yellow">{accreditation.cost}</div>
                    <div className="text-xs text-white/60">Initial Cost</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">+15-25%</div>
                    <div className="text-xs text-white/60">Premium Rates</div>
                  </div>
                </div>
                <p className="text-xs text-white/60 mt-3">
                  Most professionals recoup costs within 2-3 contracts through premium pricing
                </p>
              </motion.div>

              {/* CTA */}
              <motion.div variants={itemVariants}>
                {accreditation.website && (
                  <Button
                    onClick={() => window.open(accreditation.website, '_blank')}
                    className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 h-12 text-base font-medium"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Apply on Provider Website
                  </Button>
                )}
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Fixed Bottom CTA for Mobile */}
      {accreditation.website && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-elec-dark/95 backdrop-blur-lg border-t border-white/10 sm:hidden z-50">
          <Button
            onClick={() => window.open(accreditation.website, '_blank')}
            className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 h-12"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Visit Provider Website
          </Button>
        </div>
      )}

      {/* Bottom padding for fixed button on mobile */}
      <div className="h-20 sm:hidden" />
    </div>
  );
};

export default ElectricianAccreditationDetailView;
