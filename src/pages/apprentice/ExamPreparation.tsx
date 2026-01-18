import React from 'react';
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Target, CheckCircle, AlertCircle, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const ExamPreparation = () => {
  const examTypes = [
    {
      title: "AM2 Practical Assessment",
      description: "End-point assessment for Level 3 Electrical Installation apprenticeship",
      duration: "5.5 hours",
      difficulty: "Advanced",
      topics: ["Fault finding", "Inspection and testing", "Installation work", "Health and safety"],
      progress: 65,
      link: "/apprentice/am2-prep"
    },
    {
      title: "18th Edition (BS 7671)",
      description: "Wiring Regulations examination",
      duration: "2 hours",
      difficulty: "Intermediate",
      topics: ["Regulations knowledge", "Design principles", "Installation methods", "Special locations"],
      progress: 80,
      link: "/apprentice/18th-edition"
    },
    {
      title: "2391 Inspection & Testing",
      description: "Initial verification and periodic inspection",
      duration: "2.5 hours",
      difficulty: "Advanced",
      topics: ["Testing procedures", "Test equipment", "Certification", "Fault diagnosis"],
      progress: 45,
      link: "/apprentice/inspection-testing"
    },
    {
      title: "Level 2 Technical Certificate",
      description: "Electrical installations knowledge assessment",
      duration: "1.5 hours",
      difficulty: "Intermediate",
      topics: ["Basic principles", "Safety procedures", "Tools and equipment", "Installation basics"],
      progress: 90,
      link: "/apprentice/level-2"
    }
  ];

  const studyResources = [
    {
      title: "Practice Questions",
      description: "Topic-specific questions with detailed explanations",
      icon: <Target className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />,
      count: "500+ questions"
    },
    {
      title: "Mock Examinations",
      description: "Full-length practice exams under timed conditions",
      icon: <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />,
      count: "12 mock exams"
    },
    {
      title: "Study Guides",
      description: "Comprehensive revision materials for each qualification",
      icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />,
      count: "8 study guides"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step explanations of complex topics",
      icon: <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />,
      count: "50+ videos"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Advanced": return "text-red-400";
      case "Intermediate": return "text-yellow-400";
      case "Beginner": return "text-green-400";
      default: return "text-primary";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-400";
    if (progress >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Back Button */}
      <SmartBackButton />

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          Examination Preparation
        </h1>
        <p className="text-sm sm:text-base text-white/70">
          Comprehensive preparation resources for electrical qualifications and assessments
        </p>
      </div>

      {/* Study Resources Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {studyResources.map((resource, index) => (
          <div key={index} className="bg-card/50 rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
                {resource.icon}
              </div>
              <h3 className="text-xs sm:text-sm font-semibold text-foreground">{resource.title}</h3>
            </div>
            <p className="text-[10px] sm:text-xs text-white/70 mb-2 line-clamp-2">{resource.description}</p>
            <span className="text-[10px] sm:text-xs text-primary font-medium">
              {resource.count}
            </span>
          </div>
        ))}
      </div>

      {/* Exam Types Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        {examTypes.map((exam, index) => (
          <div key={index} className="bg-card/50 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm sm:text-base font-semibold text-foreground">{exam.title}</h3>
              <span className={`text-[10px] sm:text-xs font-medium ${getDifficultyColor(exam.difficulty)}`}>
                {exam.difficulty}
              </span>
            </div>
            <p className="text-white/70 text-[10px] sm:text-xs mb-2">{exam.description}</p>
            <div className="flex items-center gap-1 mb-3">
              <Clock className="h-3 w-3 text-white/60" />
              <span className="text-[10px] sm:text-xs text-white/60">{exam.duration}</span>
            </div>

            <div className="mb-3">
              <p className="font-medium text-foreground mb-1.5 text-[10px] sm:text-xs">Key Topics:</p>
              <div className="flex flex-wrap gap-1">
                {exam.topics.map((topic, topicIndex) => (
                  <span key={topicIndex} className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] sm:text-xs font-medium text-foreground">Progress</span>
                <span className={`text-[10px] sm:text-xs font-medium ${getProgressColor(exam.progress)}`}>
                  {exam.progress}%
                </span>
              </div>
              <Progress value={exam.progress} className="h-1.5" />
            </div>

            <Link to={exam.link}>
              <Button className="w-full text-sm h-11 touch-manipulation">
                Start Preparation
              </Button>
            </Link>
          </div>
        ))}
      </div>

      {/* Exam Tips Section */}
      <div className="bg-card/50 rounded-lg p-3 sm:p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
            <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-foreground">Exam Success Tips</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2 text-xs sm:text-sm">Before the Exam</h4>
            <ul className="space-y-1.5 text-[10px] sm:text-xs text-white/80">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                Review regulations and standards thoroughly
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                Practice calculations and formulas
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                Take multiple mock exams under timed conditions
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                Get plenty of rest the night before
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2 text-xs sm:text-sm">During the Exam</h4>
            <ul className="space-y-1.5 text-[10px] sm:text-xs text-white/80">
              <li className="flex items-start gap-2">
                <AlertCircle className="h-3 w-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                Read all questions carefully before answering
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-3 w-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                Manage your time effectively
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-3 w-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                Answer easier questions first
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-3 w-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                Double-check calculations and answers
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2 text-xs sm:text-sm">Practical Assessments</h4>
            <ul className="space-y-1.5 text-[10px] sm:text-xs text-white/80">
              <li className="flex items-start gap-2">
                <Target className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                Follow safe isolation procedures
              </li>
              <li className="flex items-start gap-2">
                <Target className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                Use appropriate test equipment correctly
              </li>
              <li className="flex items-start gap-2">
                <Target className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                Document results clearly and accurately
              </li>
              <li className="flex items-start gap-2">
                <Target className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                Demonstrate professional working practices
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPreparation;
