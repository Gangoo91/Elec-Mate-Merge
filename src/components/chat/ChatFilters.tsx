
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChatCategory } from '@/hooks/chat/useGlobalChat';

interface ChatFiltersProps {
  activeCategory: ChatCategory;
  setActiveCategory: (category: ChatCategory) => void;
}

const ChatFilters = ({ activeCategory, setActiveCategory }: ChatFiltersProps) => {
  const isMobile = useIsMobile();
  const [showAllCategories, setShowAllCategories] = useState(!isMobile);
  
  const categories: ChatCategory[] = ['All', 'General', 'Questions', 'Tips', 'News'];
  
  // For mobile, we initially show only a few categories
  const visibleCategories = showAllCategories ? categories : categories.slice(0, 3);
  
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2">
        {visibleCategories.map((category) => (
          <Button
            key={category}
            onClick={() => setActiveCategory(category)}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            className={`text-sm font-medium transition-all ${
              activeCategory === category 
                ? 'bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90'
                : 'hover:bg-elec-yellow/20 text-white border-elec-yellow/30'
            }`}
          >
            {category}
            {activeCategory === category && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 border-2 border-elec-yellow rounded-md"
                transition={{ duration: 0.2 }}
                initial={false}
              />
            )}
          </Button>
        ))}
        
        {isMobile && categories.length > 3 && (
          <Button
            onClick={() => setShowAllCategories(!showAllCategories)}
            variant="ghost"
            size="sm"
            className="text-xs text-elec-yellow/80 hover:text-elec-yellow"
          >
            {showAllCategories ? 'Show Less' : 'More...'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChatFilters;
