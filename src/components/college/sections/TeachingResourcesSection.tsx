import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useToast } from '@/hooks/use-toast';
import {
  PageFrame,
  PageHero,
  FilterBar,
  EmptyState,
  itemVariants,
} from '@/components/college/primitives';

export function TeachingResourcesSection() {
  const { courses } = useCollegeSupabase();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCourse, setFilterCourse] = useState<string>('all');

  const uploadResource = () =>
    toast({
      title: 'Upload Resource',
      description: 'Teaching resources storage is coming soon.',
    });

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Curriculum · Teaching Resources"
          title="Materials library"
          description="Slides, handouts, videos and reference materials — shared across courses and cohorts."
          tone="amber"
          actions={
            <button
              onClick={uploadResource}
              className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              Upload resource →
            </button>
          }
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FilterBar
          tabs={[
            { value: 'all', label: 'All' },
            { value: 'document', label: 'Documents' },
            { value: 'video', label: 'Videos' },
            { value: 'presentation', label: 'Slides' },
            { value: 'spreadsheet', label: 'Sheets' },
            { value: 'link', label: 'Links' },
          ]}
          activeTab={filterType}
          onTabChange={setFilterType}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search resources…"
          actions={
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="h-10 px-3 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-full text-[13px] text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
            >
              <option value="all">All Courses</option>
              {courses
                .filter((c) => c.status === 'Active')
                .map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
            </select>
          }
        />
      </motion.div>

      <EmptyState
        title="No teaching resources uploaded yet"
        description="Upload slides, handouts and reference materials. They'll be organised by course and searchable by tag."
        action="Upload resource"
        onAction={uploadResource}
      />
    </PageFrame>
  );
}
