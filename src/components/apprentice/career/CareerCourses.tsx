
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, Users, Calendar, Star, Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

// Enhanced industry courses including MEWP, PASMA, etc.
const careerCourses = [
  {
    id: 1,
    title: "18th Edition Wiring Regulations",
    provider: "NICEIC",
    description: "Essential course covering the latest BS7671 electrical regulations for all UK installations.",
    duration: "3 days",
    level: "Intermediate",
    price: "£350 - £450",
    format: "Classroom and online options",
    nextDates: ["15 June 2025", "22 July 2025", "18 August 2025"],
    rating: 4.8,
    locations: ["London", "Manchester", "Birmingham", "Glasgow"]
  },
  {
    id: 2,
    title: "Inspection & Testing",
    provider: "City & Guilds",
    description: "Learn how to properly test and verify electrical installations to industry standards.",
    duration: "5 days",
    level: "Advanced",
    price: "£600 - £750",
    format: "Classroom with practical assessments",
    nextDates: ["10 June 2025", "14 July 2025", "11 September 2025"],
    rating: 4.7,
    locations: ["Cardiff", "Newcastle", "London", "Edinburgh"]
  },
  {
    id: 3,
    title: "Electric Vehicle Charging",
    provider: "ECA",
    description: "Specialised training for installing and maintaining EV charging points.",
    duration: "2 days",
    level: "Intermediate",
    price: "£375 - £450",
    format: "Blended learning with practical sessions",
    nextDates: ["5 June 2025", "3 August 2025", "7 October 2025"],
    rating: 4.9,
    locations: ["Bristol", "London", "Manchester", "Leeds"]
  },
  {
    id: 4,
    title: "MEWP Operator Training (IPAF)",
    provider: "IPAF Certified",
    description: "Mobile Elevating Work Platform operation certification, essential for electricians working at height.",
    duration: "1-2 days",
    level: "All levels",
    price: "£200 - £350",
    format: "Practical training with theory assessment",
    nextDates: ["8 June 2025", "15 July 2025", "9 September 2025"],
    rating: 4.8,
    locations: ["Birmingham", "Manchester", "Bristol", "London", "Glasgow"]
  },
  {
    id: 5,
    title: "PASMA Towers for Users",
    provider: "PASMA Accredited",
    description: "Essential training for safe assembly, dismantling and use of mobile access towers.",
    duration: "1 day",
    level: "All levels",
    price: "£150 - £200",
    format: "Classroom with practical assessment",
    nextDates: ["12 June 2025", "21 July 2025", "18 August 2025"],
    rating: 4.7,
    locations: ["London", "Liverpool", "Edinburgh", "Cardiff"]
  },
  {
    id: 6,
    title: "Working at Heights & Harness Safety",
    provider: "Construction Skills",
    description: "Critical safety training for electrical work at height including harness use and rescue procedures.",
    duration: "1 day",
    level: "All levels",
    price: "£120 - £180",
    format: "Practical training with theory components",
    nextDates: ["20 June 2025", "25 July 2025", "15 September 2025"],
    rating: 4.9,
    locations: ["Newcastle", "Sheffield", "London", "Belfast"]
  },
  {
    id: 7,
    title: "Fire Alarm Systems Installation",
    provider: "FIA",
    description: "Comprehensive training on designing, installing and maintaining fire detection systems.",
    duration: "4 days",
    level: "Intermediate",
    price: "£500 - £600",
    format: "Classroom with practical elements",
    nextDates: ["8 June 2025", "10 August 2025", "12 October 2025"],
    rating: 4.8,
    locations: ["London", "Manchester", "Birmingham", "Glasgow"]
  },
  {
    id: 8,
    title: "Asbestos Awareness",
    provider: "UKATA Certified",
    description: "Critical safety training for identifying and working safely around potential asbestos materials.",
    duration: "Half day",
    level: "All levels",
    price: "£70 - £90",
    format: "Classroom or online options",
    nextDates: ["5 June 2025", "10 July 2025", "12 August 2025"],
    rating: 4.6,
    locations: ["Online", "London", "Manchester", "Birmingham", "Edinburgh"]
  },
  {
    id: 9,
    title: "Hazardous Areas & ATEX Training",
    provider: "CompEx",
    description: "Specialist training for electricians working in potentially explosive atmospheres and hazardous environments.",
    duration: "5 days",
    level: "Advanced",
    price: "£900 - £1,200",
    format: "Classroom with practical assessments",
    nextDates: ["13 June 2025", "18 July 2025", "22 September 2025"],
    rating: 4.9,
    locations: ["Aberdeen", "Manchester", "London", "Southampton"]
  },
  {
    id: 10,
    title: "First Aid at Work",
    provider: "St John Ambulance",
    description: "Essential first aid qualification for site workers, covering emergency response procedures.",
    duration: "3 days",
    level: "All levels",
    price: "£250 - £350",
    format: "Practical training with assessments",
    nextDates: ["10 June 2025", "15 July 2025", "20 August 2025"],
    rating: 4.8,
    locations: ["Nationwide", "London", "Manchester", "Birmingham", "Glasgow", "Bristol"]
  },
  {
    id: 11,
    title: "Confined Spaces Training",
    provider: "City & Guilds",
    description: "Safety training for working in restricted access areas with potential hazards.",
    duration: "2 days",
    level: "Intermediate",
    price: "£350 - £450",
    format: "Practical exercises with theory components",
    nextDates: ["22 June 2025", "17 July 2025", "12 September 2025"],
    rating: 4.7,
    locations: ["Leeds", "London", "Birmingham", "Newcastle"]
  },
  {
    id: 12,
    title: "Emergency Lighting Installation & Maintenance",
    provider: "Industry Qualifications",
    description: "Specialized certification for installing, testing and maintaining emergency lighting systems.",
    duration: "2 days",
    level: "Intermediate",
    price: "£320 - £400",
    format: "Classroom with hands-on practice",
    nextDates: ["8 June 2025", "20 July 2025", "15 September 2025"],
    rating: 4.6,
    locations: ["London", "Manchester", "Bristol", "Edinburgh"]
  },
  {
    id: 13,
    title: "Smart Home/Building Automation Systems",
    provider: "KNX Association",
    description: "Modern technology integration training for intelligent building systems installation and programming.",
    duration: "5 days",
    level: "Advanced",
    price: "£850 - £1,200",
    format: "Classroom with practical programming exercises",
    nextDates: ["14 June 2025", "19 July 2025", "13 September 2025"],
    rating: 4.9,
    locations: ["London", "Manchester", "Bristol"]
  },
  {
    id: 14,
    title: "Electric Vehicle Charging Installation (Advanced)",
    provider: "IET Academy",
    description: "Advanced training for complex EV charging installations including three-phase and commercial systems.",
    duration: "3 days",
    level: "Advanced",
    price: "£550 - £700",
    format: "Classroom with advanced practical assessments",
    nextDates: ["24 June 2025", "22 July 2025", "19 September 2025"],
    rating: 4.8,
    locations: ["London", "Birmingham", "Manchester", "Glasgow"]
  },
  {
    id: 15,
    title: "Testing & Inspection Periodic (Advanced)",
    provider: "NAPIT",
    description: "Comprehensive training for conducting periodic inspection and testing of electrical installations.",
    duration: "4 days",
    level: "Advanced",
    price: "£650 - £800",
    format: "Classroom with extensive practical assessment",
    nextDates: ["18 June 2025", "16 July 2025", "24 September 2025"],
    rating: 4.7,
    locations: ["London", "Manchester", "Leeds", "Newcastle", "Cardiff"]
  },
  {
    id: 16,
    title: "Commercial & Industrial 3-Phase Systems",
    provider: "ECA",
    description: "Specialized power systems training for complex commercial and industrial installations.",
    duration: "4 days",
    level: "Advanced",
    price: "£700 - £850",
    format: "Classroom and practical workshop sessions",
    nextDates: ["9 June 2025", "21 July 2025", "22 September 2025"],
    rating: 4.8,
    locations: ["Birmingham", "London", "Manchester", "Glasgow"]
  },
  {
    id: 17,
    title: "Data Cabling & Network Infrastructure",
    provider: "CNet Training",
    description: "Installation and testing of structured cabling systems for network and communications.",
    duration: "3 days",
    level: "Intermediate",
    price: "£450 - £600",
    format: "Hands-on practical training with theory",
    nextDates: ["11 June 2025", "16 July 2025", "23 September 2025"],
    rating: 4.6,
    locations: ["London", "Manchester", "Birmingham", "Edinburgh"]
  },
  {
    id: 18,
    title: "Thermal Imaging/Thermography",
    provider: "FLIR Training Centre",
    description: "For preventative maintenance and fault finding using thermal imaging technology.",
    duration: "2 days",
    level: "Intermediate",
    price: "£550 - £700",
    format: "Hands-on equipment training with analysis techniques",
    nextDates: ["17 June 2025", "29 July 2025", "25 September 2025"],
    rating: 4.7,
    locations: ["London", "Birmingham", "Manchester", "Aberdeen"]
  }
];

// Course training centers data
const trainingCenters = [
  {
    id: 1,
    name: "National Training Centre",
    location: "London",
    address: "123 Electrical Way, London, EC1A 1BB",
    contact: "020 7123 4567",
    courses: ["18th Edition Wiring Regulations", "Inspection & Testing", "Electric Vehicle Charging", "MEWP Operator Training (IPAF)"],
    facilities: ["Workshop spaces", "Classroom facilities", "On-site parking", "Refreshments provided"]
  },
  {
    id: 2,
    name: "Northern Electrical Academy",
    location: "Manchester",
    address: "45 Power Street, Manchester, M1 2WD",
    contact: "0161 765 4321",
    courses: ["PASMA Towers for Users", "Working at Heights & Harness Safety", "18th Edition Wiring Regulations", "MEWP Operator Training (IPAF)"],
    facilities: ["Mock installation areas", "Computer suite", "Cafeteria", "Free parking"]
  },
  {
    id: 3,
    name: "Midlands Training Hub",
    location: "Birmingham",
    address: "78 Circuit Avenue, Birmingham, B4 6TH",
    contact: "0121 876 5432",
    courses: ["Fire Alarm Systems Installation", "18th Edition Wiring Regulations", "MEWP Operator Training (IPAF)"],
    facilities: ["Practical training areas", "Modern classrooms", "Accommodation available nearby", "Lunch included"]
  },
  {
    id: 4,
    name: "Scottish Electrical Institute",
    location: "Glasgow",
    address: "27 Voltage Road, Glasgow, G1 2BC",
    contact: "0141 432 1098",
    courses: ["18th Edition Wiring Regulations", "Inspection & Testing", "MEWP Operator Training (IPAF)", "Fire Alarm Systems Installation"],
    facilities: ["State-of-the-art equipment", "Small class sizes", "Central location", "Disabled access"]
  }
];

// Available UK locations for filtering
const ukLocations = [
  "All Locations", "London", "Manchester", "Birmingham", "Glasgow", "Edinburgh",
  "Belfast", "Cardiff", "Newcastle", "Liverpool", "Leeds", "Bristol", "Sheffield", "Online",
  "Aberdeen", "Southampton", "Nationwide"
];

const CareerCourses = () => {
  const [activeTab, setActiveTab] = useState("courses"); // courses or directory
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState(careerCourses);
  const [filteredCenters, setFilteredCenters] = useState(trainingCenters);
  
  const form = useForm({
    defaultValues: {
      location: "All Locations",
      searchQuery: "",
    }
  });

  // Handle search and filtering
  const handleSearch = (values) => {
    const { location, searchQuery } = values;
    
    // Filter courses based on search criteria
    const coursesResult = careerCourses.filter(course => {
      const locationMatch = location === "All Locations" || course.locations.includes(location);
      const searchMatch = searchQuery === "" || 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.provider.toLowerCase().includes(searchQuery.toLowerCase());
      
      return locationMatch && searchMatch;
    });
    
    setFilteredCourses(coursesResult);
    
    // Filter centers based on search criteria
    const centersResult = trainingCenters.filter(center => {
      const locationMatch = location === "All Locations" || center.location === location;
      const searchMatch = searchQuery === "" || 
        center.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        center.courses.some(course => course.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return locationMatch && searchMatch;
    });
    
    setFilteredCenters(centersResult);
  };
  
  const viewCourseDetails = (course) => {
    setSelectedCourse(course);
  };
  
  const viewCenterDetails = (center) => {
    setSelectedCenter(center);
  };
  
  const handleClose = () => {
    setSelectedCourse(null);
    setSelectedCenter(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Career Courses</h2>
        <p className="text-muted-foreground">
          Professional development courses are essential for staying current with industry standards and expanding your skillset.
          These popular courses can help you advance your electrical career and increase your earning potential.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-elec-yellow/20">
        <button 
          className={`px-4 py-2 font-medium ${activeTab === "courses" ? "text-elec-yellow border-b-2 border-elec-yellow" : "text-gray-400"}`}
          onClick={() => setActiveTab("courses")}
        >
          Available Courses
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === "directory" ? "text-elec-yellow border-b-2 border-elec-yellow" : "text-gray-400"}`}
          onClick={() => setActiveTab("directory")}
        >
          Training Center Directory
        </button>
      </div>
      
      {/* Search and Filter */}
      <Card className="border-elec-yellow/20 bg-elec-gray/80">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Find Courses & Training Centers</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSearch)} className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="searchQuery"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input 
                          placeholder="Search courses or centers..." 
                          className="pl-8"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="w-full md:w-48">
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ukLocations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-elec-yellow text-elec-dark hover:bg-amber-400">
                Search
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Courses Tab Content */}
      {activeTab === "courses" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="border-elec-yellow/20 bg-elec-gray h-full flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <div className="flex items-center gap-1 bg-amber-400/20 text-amber-400 px-2 py-1 rounded text-xs">
                    <Star className="h-3 w-3 fill-amber-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-amber-400">Provider: {course.provider}</p>
              </CardHeader>
              <CardContent className="pt-2 flex-grow flex flex-col">
                <p className="text-sm mb-4">{course.description}</p>
                
                <div className="mt-auto space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-elec-yellow" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-elec-yellow" />
                      <span>{course.level}</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <BookOpen className="h-3.5 w-3.5 text-elec-yellow" />
                      <span>{course.format}</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <MapPin className="h-3.5 w-3.5 text-elec-yellow" />
                      <span>{course.locations.slice(0, 3).join(", ")}{course.locations.length > 3 ? ", +" + (course.locations.length - 3) : ""}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-elec-yellow/10 pt-3 space-y-2">
                    <p className="text-xs text-elec-yellow flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Upcoming Dates:</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {course.nextDates.map((date, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs bg-elec-dark/60 px-2 py-1 rounded-md"
                        >
                          {date}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <p className="text-xs text-amber-400/80">
                        Price range: {course.price}
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                        onClick={() => viewCourseDetails(course)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredCourses.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No courses found matching your search criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => form.reset()}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      )}
      
      {/* Training Centers Directory Tab Content */}
      {activeTab === "directory" && (
        <div className="space-y-6">
          {filteredCenters.map((center) => (
            <Card key={center.id} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div>
                    <CardTitle className="text-xl">{center.name}</CardTitle>
                    <div className="flex items-center gap-1.5 text-sm mt-1">
                      <MapPin className="h-3.5 w-3.5 text-elec-yellow" />
                      <span>{center.location}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 self-start"
                    onClick={() => viewCenterDetails(center)}
                  >
                    View Center Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-elec-yellow mb-2">Available Courses:</h4>
                    <ul className="text-xs grid gap-1.5">
                      {center.courses.map((course, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <span className="h-1 w-1 rounded-full bg-elec-yellow"></span>
                          <span>{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-elec-yellow mb-2">Facilities:</h4>
                    <ul className="text-xs grid gap-1.5">
                      {center.facilities.map((facility, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <span className="h-1 w-1 rounded-full bg-elec-yellow"></span>
                          <span>{facility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredCenters.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No training centers found matching your search criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => form.reset()}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      )}
      
      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-semibold">{selectedCourse.title}</h3>
                  <p className="text-amber-400">{selectedCourse.provider}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleClose}>
                  Close
                </Button>
              </div>
              
              <p>{selectedCourse.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-elec-yellow/10 pt-4">
                <div>
                  <h4 className="text-sm text-elec-yellow">Duration</h4>
                  <p className="text-sm">{selectedCourse.duration}</p>
                </div>
                <div>
                  <h4 className="text-sm text-elec-yellow">Level</h4>
                  <p className="text-sm">{selectedCourse.level}</p>
                </div>
                <div>
                  <h4 className="text-sm text-elec-yellow">Format</h4>
                  <p className="text-sm">{selectedCourse.format}</p>
                </div>
                <div>
                  <h4 className="text-sm text-elec-yellow">Price</h4>
                  <p className="text-sm">{selectedCourse.price}</p>
                </div>
              </div>
              
              <div className="border-t border-elec-yellow/10 pt-4">
                <h4 className="text-sm text-elec-yellow mb-2">Available Locations</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCourse.locations.map((location, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs bg-elec-gray px-2 py-1 rounded-md flex items-center gap-1"
                    >
                      <MapPin className="h-3 w-3" />
                      {location}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-elec-yellow/10 pt-4">
                <h4 className="text-sm text-elec-yellow mb-2">Upcoming Course Dates</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedCourse.nextDates.map((date, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{date}</TableCell>
                        <TableCell>{selectedCourse.locations[idx % selectedCourse.locations.length]}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-0.5 rounded text-xs ${idx % 3 === 0 ? "bg-red-500/20 text-red-300" : "bg-green-500/20 text-green-300"}`}>
                            {idx % 3 === 0 ? "Limited spaces" : "Available"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline">Enquire</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="border-t border-elec-yellow/10 pt-4">
                <h4 className="text-sm text-elec-yellow mb-2">Course Enquiry</h4>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm">Name</label>
                      <Input placeholder="Your full name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Email</label>
                      <Input type="email" placeholder="Your email address" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Phone</label>
                      <Input placeholder="Your contact number" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Preferred location</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedCourse.locations.map((location) => (
                            <SelectItem key={location} value={location}>{location}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Message</label>
                    <Textarea placeholder="Any specific questions or requirements..." />
                  </div>
                  <Button className="w-full bg-elec-yellow text-elec-dark hover:bg-amber-400">
                    Submit Enquiry
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Training Center Details Modal */}
      {selectedCenter && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-semibold">{selectedCenter.name}</h3>
                  <p className="text-amber-400 flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {selectedCenter.location}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleClose}>
                  Close
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-elec-yellow/10 pt-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-elec-yellow mb-2">Address</h4>
                    <p className="text-sm">{selectedCenter.address}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-elec-yellow mb-2">Contact</h4>
                    <p className="text-sm">{selectedCenter.contact}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-elec-yellow mb-2">Facilities</h4>
                    <ul className="text-sm grid gap-1.5">
                      {selectedCenter.facilities.map((facility, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <span className="h-1 w-1 rounded-full bg-elec-yellow"></span>
                          <span>{facility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-elec-yellow mb-2">Available Courses</h4>
                    <ul className="text-sm grid gap-1.5">
                      {selectedCenter.courses.map((course, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <span className="h-1 w-1 rounded-full bg-elec-yellow"></span>
                          <span>{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-elec-yellow mb-2">Opening Hours</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Monday - Friday</div>
                      <div>08:30 - 17:00</div>
                      <div>Saturday</div>
                      <div>09:00 - 13:00</div>
                      <div>Sunday</div>
                      <div>Closed</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-elec-yellow/10 pt-4">
                <h4 className="text-sm text-elec-yellow mb-2">Contact Training Center</h4>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm">Name</label>
                      <Input placeholder="Your full name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Email</label>
                      <Input type="email" placeholder="Your email address" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Phone</label>
                      <Input placeholder="Your contact number" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Course interest</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedCenter.courses.map((course) => (
                            <SelectItem key={course} value={course}>{course}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Message</label>
                    <Textarea placeholder="Any specific questions or requirements..." />
                  </div>
                  <Button className="w-full bg-elec-yellow text-elec-dark hover:bg-amber-400">
                    Contact Center
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <Card className="border-elec-yellow/20 bg-elec-gray/50 p-4">
        <div className="flex gap-3 items-start">
          <BookOpen className="h-6 w-6 text-elec-yellow mt-1" />
          <div>
            <h3 className="font-medium text-lg mb-1">Course Selection Tips</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Choose courses that are accredited by recognised industry bodies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Look for courses with hands-on practical components to build real-world skills</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Consider your career goals when selecting courses - focus on areas that align with your desired specialisation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Ask your employer about funding opportunities or if they offer time off for professional development</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">•</span>
                <span>Industry safety courses like MEWP and PASMA are valuable qualifications that can set you apart from other candidates</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CareerCourses;

