
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { useLiveEducationData, LiveEducationData } from "@/hooks/useLiveEducationData";
import { 
  BookOpen, GraduationCap, Award, Users, 
  TrendingUp, RefreshCw, AlertCircle, Loader2,
  Filter, Search, MapPin, Clock, PoundSterling,
  Star, Calendar
} from "lucide-react";
import LiveEducationCard from "./LiveEducationCard";
import CourseDetailsView from "./CourseDetailsView";

const ElectricianFurtherEducation = () => {
  const { educationData, analytics, loading, error, lastUpdated, isFromCache, refreshData } = useLiveEducationData('electrical');
  const [selectedCourse, setSelectedCourse] = useState<LiveEducationData | null>(null);
  const [filter, setFilter] = useState('all');

  const handleViewDetails = (course: LiveEducationData) => {
    setSelectedCourse(course);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
  };

  const filteredData = educationData.filter(course => {
    if (filter === 'all') return true;
    if (filter === 'degree') return course.level.toLowerCase().includes('degree');
    if (filter === 'diploma') return course.level.toLowerCase().includes('diploma');
    if (filter === 'certificate') return course.level.toLowerCase().includes('certificate');
    return true;
  });

  const filterTabs = [
    {
      value: 'all',
      label: 'All Courses',
      icon: BookOpen,
      content: null
    },
    {
      value: 'degree',
      label: 'Degree Programs',
      icon: GraduationCap,
      content: null
    },
    {
      value: 'diploma',
      label: 'Diplomas',
      icon: Award,
      content: null
    },
    {
      value: 'certificate',
      label: 'Certificates',
      icon: Users,
      content: null
    }
  ];

  // If a course is selected, show the detailed view
  if (selectedCourse) {
    return (
      <CourseDetailsView 
        course={selectedCourse} 
        onBack={handleBackToCourses}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-elec-yellow mx-auto" />
          <p className="text-muted-foreground">Loading live education data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-500/20 bg-red-900/20">
        <CardContent className="p-6 text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto" />
          <div>
            <h3 className="text-lg font-semibold text-red-400 mb-2">Unable to Load Education Data</h3>
            <p className="text-red-300 mb-4">{error}</p>
            <Button 
              onClick={() => refreshData(true)}
              variant="outline"
              className="border-red-400/50 text-red-400 hover:bg-red-400/10"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Analytics */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-elec-yellow mb-2">
              Further Education Opportunities
            </h2>
            <p className="text-muted-foreground">
              Live data from UK education providers • {educationData.length} courses available
            </p>
          </div>
          <Button 
            variant="outline"
            onClick={() => refreshData(true)}
            className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>

        {/* Analytics Cards */}
        {analytics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-elec-yellow">
                  {analytics.totalCourses}
                </div>
                <div className="text-sm text-muted-foreground">Total Courses</div>
              </CardContent>
            </Card>
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {analytics.totalProviders}
                </div>
                <div className="text-sm text-muted-foreground">Providers</div>
              </CardContent>
            </Card>
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-amber-400">
                  {analytics.averageRating}
                </div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </CardContent>
            </Card>
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">
                  {analytics.averageEmploymentRate}%
                </div>
                <div className="text-sm text-muted-foreground">Employment Rate</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="space-y-4">
        <DropdownTabs
          tabs={filterTabs}
          defaultValue="all"
          placeholder="Filter by course type"
          onValueChange={(value) => setFilter(value)}
          className="mb-6"
        />
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((course, index) => (
          <LiveEducationCard
            key={`${course.id}-${index}`}
            option={course}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {filteredData.length === 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filter or check back later for new courses.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Data Status */}
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-elec-yellow/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Live data {isFromCache ? '(cached)' : '(fresh)'}</span>
        </div>
        {lastUpdated && (
          <span>Last updated: {new Date(lastUpdated).toLocaleString()}</span>
        )}
      </div>
    </div>
  );
};

export default ElectricianFurtherEducation;
