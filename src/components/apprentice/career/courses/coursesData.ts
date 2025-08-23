export interface CareerCourse {
  id: string | number;
  title: string;
  provider: string;
  duration: string;
  level: string;
  description: string;
  locations: string[];
  skills?: string[];
}

export interface TrainingCenter {
  id: string | number;
  name: string;
  address: string;
  contact: string;
  location: string;
  description?: string;
  website?: string;
  coursesOffered?: string[];
  image?: string;
}

export const careerCourses: CareerCourse[] = [
  {
    id: 1,
    title: "Level 3 Award in the Requirements for Electrical Installations BS 7671:2018+A2:2022",
    provider: "Trade Skills 4U",
    duration: "3 days",
    level: "Level 3",
    description:
      "This course is designed to provide you with the knowledge and skills to install, inspect, and test electrical installations in accordance with the BS 7671:2018+A2:2022.",
    locations: ["Crawley", "Leeds", "Warrington"],
    skills: ["18th Edition", "Wiring Regulations", "Electrical Installations"],
  },
  {
    id: 2,
    title: "Level 3 Certificate in Installing, Testing and Ensuring Compliance of Electrical Installations in Dwellings",
    provider: "NICEIC",
    duration: "5 days",
    level: "Level 3",
    description:
      "This course is designed to provide you with the knowledge and skills to install, inspect, and test electrical installations in dwellings.",
    locations: ["Dunstable"],
    skills: ["Electrical Installations", "Testing", "Compliance"],
  },
  {
    id: 3,
    title: "Level 3 Certificate in the Building Regulations for Electrical Installations in Dwellings",
    provider: "NICEIC",
    duration: "2 days",
    level: "Level 3",
    description:
      "This course is designed to provide you with the knowledge and skills to understand and apply the Building Regulations for electrical installations in dwellings.",
    locations: ["Hemel Hempstead"],
    skills: ["Building Regulations", "Electrical Installations", "Dwellings"],
  },
  {
    id: 4,
    title: "PAT Testing Course",
    provider: "PASS Training",
    duration: "1 day",
    level: "Entry Level",
    description:
      "This course is designed to provide you with the knowledge and skills to carry out PAT testing.",
    locations: ["Stockport"],
    skills: ["PAT Testing", "Electrical Safety"],
  },
  {
    id: 5,
    title: "Electrical Vehicle Charging Course",
    provider: "Electrical Courses Ltd",
    duration: "2 days",
    level: "Entry Level",
    description:
      "This course is designed to provide you with the knowledge and skills to install electrical vehicle charging points.",
    locations: ["Crawley", "Leeds", "Warrington"],
    skills: ["EV Charging", "Electrical Installations"],
  },
];

export const trainingCenters: TrainingCenter[] = [
  {
    id: 101,
    name: "Trade Skills 4U",
    address: "Unit 2, The Acorns, Crawley, RH11 0AN",
    contact: "01293 276944",
    location: "Crawley",
    description:
      "Trade Skills 4U is a leading provider of electrical training courses in the UK.",
    website: "https://www.tradeskills4u.co.uk/",
    coursesOffered: [
      "Level 3 Award in the Requirements for Electrical Installations BS 7671:2018+A2:2022",
      "Electrical Vehicle Charging Course",
    ],
    image: "/images/training-centre-1.webp",
  },
  {
    id: 102,
    name: "NICEIC",
    address: "Vanwall Business Park, Maidenhead, SL6 4UB",
    contact: "0333 7000 691",
    location: "Maidenhead",
    description:
      "NICEIC is a leading provider of electrical training courses in the UK.",
    website: "https://www.niceic.com/",
    coursesOffered: [
      "Level 3 Certificate in Installing, Testing and Ensuring Compliance of Electrical Installations in Dwellings",
      "Level 3 Certificate in the Building Regulations for Electrical Installations in Dwellings",
    ],
    image: "/images/training-centre-2.webp",
  },
  {
    id: 103,
    name: "PASS Training",
    address: "1 Alberto Street, Stockport, SK1 3SP",
    contact: "0161 667 6767",
    location: "Stockport",
    description:
      "PASS Training is a leading provider of electrical training courses in the UK.",
    website: "https://www.electricaltrainingcourse.co.uk/",
    coursesOffered: ["PAT Testing Course"],
    image: "/images/training-centre-3.webp",
  },
  {
    id: 104,
    name: "Electrical Courses Ltd",
    address: "Unit 2, The Acorns, Crawley, RH11 0AN",
    contact: "01293 276944",
    location: "Crawley",
    description:
      "Electrical Courses Ltd is a leading provider of electrical training courses in the UK.",
    website: "https://www.electricalcoursesltd.co.uk/",
    coursesOffered: ["Electrical Vehicle Charging Course"],
    image: "/images/training-centre-4.webp",
  },
];

export const ukLocations = [
  "London",
  "Manchester", 
  "Birmingham",
  "Leeds",
  "Glasgow",
  "Liverpool", 
  "Sheffield",
  "Bristol",
  "Newcastle",
  "Cardiff"
];
