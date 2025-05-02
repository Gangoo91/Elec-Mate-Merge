
export interface UserData {
  name: string;
  role: string;
  completedLessons: number;
  totalLessons: number;
}

export interface Course {
  id: number;
  title: string;
  progress?: number;
  students?: number;
  category: string;
  image: string;
}

// This would eventually come from an API or context
export const getDashboardData = () => {
  // Mock user data
  const user: UserData = {
    name: "Guest User",
    role: "visitor",
    completedLessons: 0,
    totalLessons: 48,
  };

  // Mock data for recent courses
  const recentCourses: Course[] = [
    {
      id: 1,
      title: "Electrical Installation Fundamentals",
      progress: 0,
      category: "Core Units",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Circuit Design & Analysis",
      progress: 0,
      category: "Theory",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      title: "Safe Working Practices",
      progress: 0,
      category: "Health & Safety",
      image: "/placeholder.svg",
    },
  ];
  
  // Mock data for popular courses
  const popularCourses: Course[] = [
    {
      id: 4,
      title: "Wiring Regulations BS 7671",
      students: 1245,
      category: "Regulations",
      image: "/placeholder.svg",
    },
    {
      id: 5,
      title: "Fault Finding Techniques",
      students: 987,
      category: "Practical Skills",
      image: "/placeholder.svg",
    },
    {
      id: 6,
      title: "Inspection & Testing",
      students: 762,
      category: "Certification",
      image: "/placeholder.svg",
    },
  ];

  return {
    user,
    recentCourses,
    popularCourses,
  };
};
