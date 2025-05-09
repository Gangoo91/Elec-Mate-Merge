
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
    id: "ealLevel3",
    title: "EAL Level 3 Units",
    description: "Core units for the Level 3 Advanced Diploma in Electrical Installation",
    icon: Book,
    courses: [
      "QELTK3/002 - Environmental legislation and technology systems",
      "ELEC3/04A - Installation planning and design",
      "ELEC3/05 - Installation Craft Skills",
      "QELTK3/006 - Inspection and testing principles",
      "QELTK3/007 - Diagnosing and correcting faults",
      "ELEC3/08B - Electrical Science and principles"
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
