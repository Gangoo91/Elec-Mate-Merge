
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  id: number;
  title: string;
  progress?: number;
  students?: number;
  category: string;
  image: string;
  onClick?: () => void;
}

const CourseCard = ({ id, title, progress, students, category, image, onClick }: CourseCardProps) => {
  return (
    <motion.div
      key={id}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="touch-manipulation"
    >
      <div
        className={cn(
          "overflow-hidden rounded-xl sm:rounded-2xl",
          "bg-white/[0.03] border border-white/10",
          "hover:bg-white/[0.06] hover:border-elec-yellow/30",
          "transition-all duration-200",
          onClick && "cursor-pointer"
        )}
        onClick={onClick}
      >
        {/* Image container */}
        <div className="aspect-video relative bg-elec-dark/30">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
          />
          {/* Category badge */}
          <div className={cn(
            "absolute top-1.5 right-1.5 sm:top-2 sm:right-2",
            "bg-elec-dark/80 backdrop-blur-sm",
            "text-[10px] sm:text-xs px-2 py-1 rounded-lg",
            "border border-white/10",
            "text-white/80"
          )}>
            {category}
          </div>
          {/* Progress bar */}
          {progress !== undefined && progress > 0 && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-elec-dark/50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-elec-yellow"
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4">
          <h3 className="text-sm sm:text-base font-semibold text-white mb-2 line-clamp-2">
            {title}
          </h3>
          <div className="flex justify-between items-center">
            <div className="text-[10px] sm:text-xs text-white/60">
              {progress !== undefined ? (
                <span>{progress}% complete</span>
              ) : (
                <span>{students} students</span>
              )}
            </div>
            <Button
              size="sm"
              variant="ghost"
              className={cn(
                "gap-1.5 h-8 sm:h-9",
                "bg-elec-yellow/10 hover:bg-elec-yellow/20",
                "text-elec-yellow border border-elec-yellow/20",
                "text-xs sm:text-sm rounded-lg"
              )}
            >
              <Play className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              Start
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
