import { Book, GraduationCap, School } from "lucide-react";

export const courseCategories = [
  {
    id: "eal",
    title: "EAL Courses",
    description: "Electrical and technical qualifications certified by Excellence, Achievement & Learning",
    icon: Book,
    courses: [
      "Level 2 Diploma in Electrical Installation",
      "Level 3 Advanced Diploma in Electrical Installation",
      "Level 3 NVQ Diploma in Electrotechnical Technology",
      "Level 3 Award in the Requirements for Electrical Installations (18th Edition)",
      "Level 3 Award in the Initial Verification and Certification of Electrical Installations",
      "Level 4 Award in the Design and Verification of Electrical Installations"
    ]
  },
  {
    id: "cityGuilds",
    title: "City & Guilds Courses",
    description: "Industry-standard vocational qualifications for electrical professionals",
    icon: GraduationCap,
    courses: [
      "Level 2 Electrical",
      "Level 3 Electrical",
      "Level 2 Plumbing",
      "Level 3 Plumbing"
    ]
  },
  {
    id: "higher",
    title: "Higher Learning Courses",
    description: "Advanced qualification courses including HNC, HND and degree-level studies",
    icon: School,
    courses: [
      "HNC Electrical Engineering",
      "HND Electrical Engineering",
      "BSc Electrical Engineering"
    ]
  },
  {
    id: "further",
    title: "Further Learning Courses",
    description: "Specialized short courses and additional certifications for career advancement",
    icon: Book,
    courses: [
      "18th Edition Regulations",
      "Electric Vehicle Charging",
      "Smart Home Installation"
    ]
  },
  {
    id: "onJob",
    title: "On the Job Courses",
    description: "Practical courses that can be completed during work hours and count toward qualifications",
    icon: GraduationCap,
    courses: [
      "Site Safety Management",
      "Risk Assessment Training",
      "First Aid Certification",
      "Working at Heights"
    ]
  }
];
