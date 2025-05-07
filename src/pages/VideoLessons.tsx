import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Play, Filter, Search, Clock, BookOpen, Star, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useVideoTracking } from "@/hooks/video-lessons/useVideoTracking";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VideoLessons = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const { trackVideoView } = useVideoTracking();
  
  // Track when a user clicks to watch a video
  const handleWatchVideo = (videoTitle: string) => {
    trackVideoView(videoTitle);
    // In a real app, this would also play the video
  };
  
  // Mock video categories
  const categories = [
    "Core Units", 
    "Practical Skills", 
    "Theory", 
    "Health & Safety", 
    "Regulations", 
    "Advanced Topics"
  ];
  
  // Mock videos
  const videos = [
    {
      id: 1,
      title: "Understanding Circuit Protection Devices",
      thumbnail: "/placeholder.svg",
      duration: "23:45",
      category: "Core Units",
      difficulty: "Beginner",
      instructor: "David Williams",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Cable Installation Techniques",
      thumbnail: "/placeholder.svg",
      duration: "18:30",
      category: "Practical Skills",
      difficulty: "Intermediate",
      instructor: "Sarah Johnson",
      rating: 4.7,
    },
    {
      id: 3,
      title: "Ohm's Law and Its Applications",
      thumbnail: "/placeholder.svg",
      duration: "15:20",
      category: "Theory",
      difficulty: "Beginner",
      instructor: "Mark Thomas",
      rating: 4.9,
    },
    {
      id: 4,
      title: "Working Safely at Heights",
      thumbnail: "/placeholder.svg",
      duration: "21:10",
      category: "Health & Safety",
      difficulty: "Beginner",
      instructor: "Emma Lewis",
      rating: 4.6,
    },
    {
      id: 5,
      title: "Wiring Regulations Update 2023",
      thumbnail: "/placeholder.svg",
      duration: "32:15",
      category: "Regulations",
      difficulty: "Advanced",
      instructor: "James Parker",
      rating: 4.9,
    },
    {
      id: 6,
      title: "Three-Phase Systems Explained",
      thumbnail: "/placeholder.svg",
      duration: "27:40",
      category: "Advanced Topics",
      difficulty: "Advanced",
      instructor: "Rachel Woods",
      rating: 4.8,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Video Lessons</h1>
        <p className="text-muted-foreground">
          Watch professional tutorials and improve your electrical skills.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search for videos..." 
            className="pl-9 bg-elec-gray border-elec-yellow/20"
          />
        </div>
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-[160px] bg-elec-gray border-elec-yellow/20">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[160px] bg-elec-gray border-elec-yellow/20">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Featured Video */}
      <Card className="border-elec-yellow/20 bg-elec-gray overflow-hidden">
        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-2 aspect-video bg-elec-dark relative">
            <img 
              src="/placeholder.svg" 
              alt="Featured Video" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="h-16 w-16 rounded-full bg-elec-yellow/90 flex items-center justify-center cursor-pointer hover:bg-elec-yellow transition-colors"
                onClick={() => handleWatchVideo("Complete Guide to Consumer Units")}
              >
                <Play className="h-8 w-8 text-elec-dark ml-1" />
              </div>
            </div>
          </div>
          <div className="md:col-span-3 p-6 flex flex-col">
            <div>
              <Badge className="bg-elec-yellow text-elec-dark mb-3">Featured</Badge>
              <h2 className="text-2xl font-bold mb-2">Complete Guide to Consumer Units</h2>
              <p className="text-muted-foreground mb-4">
                Master the installation and configuration of modern consumer units with this
                comprehensive guide for electrical professionals.
              </p>
              <div className="flex flex-wrap gap-4 text-sm mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-elec-yellow" />
                  <span>45:12</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4 text-elec-yellow" />
                  <span>Core Units</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-elec-yellow" />
                  <span>4.9 (126 ratings)</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-auto">
              <img 
                src="/placeholder.svg" 
                alt="Instructor" 
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">Robert Johnson</p>
                <p className="text-xs text-muted-foreground">Master Electrician • 15+ years experience</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Video Categories */}
      <Tabs defaultValue="all" className="space-y-4" value={activeFilter} onValueChange={setActiveFilter}>
        <TabsList className="bg-elec-gray border border-elec-yellow/20">
          <TabsTrigger value="all">All Videos</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger 
              key={category} 
              value={category.toLowerCase().replace(/\s+/g, '-')}
              className="hidden md:flex" // Hide on mobile to prevent overflow
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <Card key={video.id} className="border-elec-yellow/20 bg-elec-gray overflow-hidden">
                <div className="aspect-video relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  <div 
                    className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/50 transition-opacity cursor-pointer"
                    onClick={() => handleWatchVideo(video.title)}
                  >
                    <div className="h-12 w-12 rounded-full bg-elec-yellow/90 flex items-center justify-center">
                      <Play className="h-6 w-6 text-elec-dark ml-0.5" />
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{video.title}</CardTitle>
                  <CardDescription>{video.category} • {video.difficulty}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-elec-yellow" />
                        <span className="text-sm ml-1">{video.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">by {video.instructor}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1 text-elec-yellow hover:text-elec-yellow/80 p-0"
                      onClick={() => handleWatchVideo(video.title)}
                    >
                      Watch
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="outline" className="w-full">Load More Videos</Button>
        </TabsContent>

        {categories.map((category) => (
          <TabsContent 
            key={category}
            value={category.toLowerCase().replace(/\s+/g, '-')}
            className="space-y-6"
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {videos
                .filter(video => video.category === category)
                .map((video) => (
                  <Card key={video.id} className="border-elec-yellow/20 bg-elec-gray overflow-hidden">
                    <div className="aspect-video relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                      <div 
                        className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/50 transition-opacity cursor-pointer"
                        onClick={() => handleWatchVideo(video.title)}
                      >
                        <div className="h-12 w-12 rounded-full bg-elec-yellow/90 flex items-center justify-center">
                          <Play className="h-6 w-6 text-elec-dark ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{video.title}</CardTitle>
                      <CardDescription>{video.category} • {video.difficulty}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-elec-yellow" />
                            <span className="text-sm ml-1">{video.rating}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">by {video.instructor}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1 text-elec-yellow hover:text-elec-yellow/80 p-0">
                          Watch
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              }
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Collections Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Popular Learning Paths</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-lg">MOET Level 3 Preparation</CardTitle>
              <CardDescription>8 videos • 2.5 hours total</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>0%</span>
                </div>
                <div className="h-2 w-full bg-elec-dark rounded-full overflow-hidden">
                  <div className="h-full bg-elec-yellow w-0 rounded-full"></div>
                </div>
              </div>
              <Button className="w-full">Start Learning Path</Button>
            </CardContent>
          </Card>
          
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-lg">Testing & Inspection Masterclass</CardTitle>
              <CardDescription>12 videos • 3.8 hours total</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>0%</span>
                </div>
                <div className="h-2 w-full bg-elec-dark rounded-full overflow-hidden">
                  <div className="h-full bg-elec-yellow w-0 rounded-full"></div>
                </div>
              </div>
              <Button className="w-full">Start Learning Path</Button>
            </CardContent>
          </Card>
          
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-lg">Introduction to Electrical Installations</CardTitle>
              <CardDescription>10 videos • 3.2 hours total</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>0%</span>
                </div>
                <div className="h-2 w-full bg-elec-dark rounded-full overflow-hidden">
                  <div className="h-full bg-elec-yellow w-0 rounded-full"></div>
                </div>
              </div>
              <Button className="w-full">Start Learning Path</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoLessons;
