
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
      "Level 2 Electrical Installation",
      "Level 3 Electrical Installation",
      "2391 Inspection & Testing",
      "Maintenance Operability Electrical Testing (MOET)",
      "18th Edition Wiring Regulations",
      "2377 PAT Testing"
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
  }
];
