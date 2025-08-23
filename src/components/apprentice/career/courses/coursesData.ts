export interface CareerCourse {
  id: string | number; // Changed from number to string | number
  title: string;
  provider: string;
  duration: string;
  level: string;
  category: string;
  description: string;
  locations: string[];
  price?: string;
  certification?: string;
  skills?: string[];
}

export interface TrainingCenter {
  id: number;
  name: string;
  description: string;
  address: string;
  contact: string;
  website: string;
  coursesOffered: number[];
  image: string;
}

export const careerCourses: CareerCourse[] = [
  {
    id: 1,
    title: "Level 3 Award in the Requirements for Electrical Installations BS7671:2018+A2:2022",
    provider: "Trade Skills 4U",
    duration: "3 days",
    level: "Level 3",
    category: "Regulations",
    description:
      "This course is designed to provide you with the knowledge and skills to understand the latest wiring regulations.",
    locations: ["Crawley", "Gatwick", "Leeds", "Warrington"],
    price: "£495",
    certification: "City & Guilds",
    skills: ["BS7671", "Wiring Regulations", "Electrical Installations"],
  },
  {
    id: 2,
    title: "Level 3 Award in Initial Verification and Certification of Electrical Installations",
    provider: "Trade Skills 4U",
    duration: "5 days",
    level: "Level 3",
    category: "Inspection & Testing",
    description:
      "This course is designed to provide you with the knowledge and skills to carry out initial verification and certification of electrical installations.",
    locations: ["Crawley", "Gatwick", "Leeds", "Warrington"],
    price: "£795",
    certification: "City & Guilds",
    skills: [
      "Initial Verification",
      "Electrical Installations",
      "Inspection & Testing",
    ],
  },
  {
    id: 3,
    title: "Level 3 Award in Periodic Inspection and Testing of Electrical Installations",
    provider: "Trade Skills 4U",
    duration: "3 days",
    level: "Level 3",
    category: "Inspection & Testing",
    description:
      "This course is designed to provide you with the knowledge and skills to carry out periodic inspection and testing of electrical installations.",
    locations: ["Crawley", "Gatwick", "Leeds", "Warrington"],
    price: "£495",
    certification: "City & Guilds",
    skills: [
      "Periodic Inspection",
      "Electrical Installations",
      "Inspection & Testing",
    ],
  },
  {
    id: 4,
    title: "Level 3 Award in the In-Service Inspection and Testing of Electrical Equipment (PAT Testing)",
    provider: "Trade Skills 4U",
    duration: "1 day",
    level: "Level 3",
    category: "Inspection & Testing",
    description:
      "This course is designed to provide you with the knowledge and skills to carry out in-service inspection and testing of electrical equipment (PAT Testing).",
    locations: ["Crawley", "Gatwick", "Leeds", "Warrington"],
    price: "£195",
    certification: "City & Guilds",
    skills: ["PAT Testing", "Electrical Equipment", "Inspection & Testing"],
  },
  {
    id: 5,
    title: "Electric Vehicle Charging Point Installation Course",
    provider: "Trade Skills 4U",
    duration: "2 days",
    level: "Level 3",
    category: "Electric Vehicles",
    description:
      "This course is designed to provide you with the knowledge and skills to install electric vehicle charging points.",
    locations: ["Crawley", "Gatwick", "Leeds", "Warrington"],
    price: "£595",
    certification: "City & Guilds",
    skills: ["Electric Vehicles", "Charging Points", "Electrical Installations"],
  },
  {
    id: 6,
    title: "Solar Panel Installation Course",
    provider: "Trade Skills 4U",
    duration: "3 days",
    level: "Level 3",
    category: "Renewable Energy",
    description:
      "This course is designed to provide you with the knowledge and skills to install solar panels.",
    locations: ["Crawley", "Gatwick", "Leeds", "Warrington"],
    price: "£795",
    certification: "City & Guilds",
    skills: ["Solar Panels", "Renewable Energy", "Electrical Installations"],
  },
  {
    id: 7,
    title: "18th Edition Wiring Regulations Course",
    provider: "Electrical Courses Ltd",
    duration: "3 days",
    level: "Level 3",
    category: "Regulations",
    description:
      "This course is designed to provide you with the knowledge and skills to understand the latest wiring regulations.",
    locations: ["London", "Birmingham", "Manchester", "Glasgow"],
    price: "£450",
    certification: "City & Guilds",
    skills: ["BS7671", "Wiring Regulations", "Electrical Installations"],
  },
  {
    id: 8,
    title: "Inspection and Testing Course",
    provider: "Electrical Courses Ltd",
    duration: "5 days",
    level: "Level 3",
    category: "Inspection & Testing",
    description:
      "This course is designed to provide you with the knowledge and skills to carry out inspection and testing of electrical installations.",
    locations: ["London", "Birmingham", "Manchester", "Glasgow"],
    price: "£750",
    certification: "City & Guilds",
    skills: ["Inspection & Testing", "Electrical Installations"],
  },
  {
    id: 9,
    title: "PAT Testing Course",
    provider: "Electrical Courses Ltd",
    duration: "1 day",
    level: "Level 3",
    category: "Inspection & Testing",
    description:
      "This course is designed to provide you with the knowledge and skills to carry out PAT Testing.",
    locations: ["London", "Birmingham", "Manchester", "Glasgow"],
    price: "£180",
    certification: "City & Guilds",
    skills: ["PAT Testing", "Electrical Equipment", "Inspection & Testing"],
  },
  {
    id: 10,
    title: "Electric Vehicle Charging Point Installation Course",
    provider: "Electrical Courses Ltd",
    duration: "2 days",
    level: "Level 3",
    category: "Electric Vehicles",
    description:
      "This course is designed to provide you with the knowledge and skills to install electric vehicle charging points.",
    locations: ["London", "Birmingham", "Manchester", "Glasgow"],
    price: "£550",
    certification: "City & Guilds",
    skills: ["Electric Vehicles", "Charging Points", "Electrical Installations"],
  },
  {
    id: 11,
    title: "Solar Panel Installation Course",
    provider: "Electrical Courses Ltd",
    duration: "3 days",
    level: "Level 3",
    category: "Renewable Energy",
    description:
      "This course is designed to provide you with the knowledge and skills to install solar panels.",
    locations: ["London", "Birmingham", "Manchester", "Glasgow"],
    price: "£750",
    certification: "City & Guilds",
    skills: ["Solar Panels", "Renewable Energy", "Electrical Installations"],
  },
  {
    id: 12,
    title: "Level 2 Electrical Installation Course",
    provider: "Nescot",
    duration: "1 year",
    level: "Level 2",
    category: "Electrical Installations",
    description:
      "This course is designed to provide you with the knowledge and skills to carry out electrical installations.",
    locations: ["Ewell", "Surrey"],
    price: "£3000",
    certification: "City & Guilds",
    skills: ["Electrical Installations"],
  },
  {
    id: 13,
    title: "Level 3 Electrical Installation Course",
    provider: "Nescot",
    duration: "1 year",
    level: "Level 3",
    category: "Electrical Installations",
    description:
      "This course is designed to provide you with the knowledge and skills to carry out electrical installations.",
    locations: ["Ewell", "Surrey"],
    price: "£4000",
    certification: "City & Guilds",
    skills: ["Electrical Installations"],
  },
  {
    id: 14,
    title: "HNC Electrical Engineering",
    provider: "Kingston College",
    duration: "2 years",
    level: "Level 4",
    category: "Higher Education",
    description:
      "This course is designed to provide you with the knowledge and skills to work as an electrical engineer.",
    locations: ["Kingston", "Surrey"],
    price: "£6000",
    certification: "Pearson",
    skills: ["Electrical Engineering"],
  },
  {
    id: 15,
    title: "HND Electrical Engineering",
    provider: "Kingston College",
    duration: "2 years",
    level: "Level 5",
    category: "Higher Education",
    description:
      "This course is designed to provide you with the knowledge and skills to work as an electrical engineer.",
    locations: ["Kingston", "Surrey"],
    price: "£7000",
    certification: "Pearson",
    skills: ["Electrical Engineering"],
  },
];

export const trainingCenters: TrainingCenter[] = [
  {
    id: 1,
    name: "Trade Skills 4U",
    description:
      "Trade Skills 4U is a leading provider of electrical training courses in the UK.",
    address: "Unit 1, The Acorns, Crawley, West Sussex, RH11 0AN",
    contact: "0800 856 4448",
    website: "https://www.tradeskills4u.co.uk/",
    coursesOffered: [1, 2, 3, 4, 5, 6],
    image:
      "https://www.tradeskills4u.co.uk/images/easyblog_articles/448/b2ap3_large_ts4u-crawley-training-centre-004.jpg",
  },
  {
    id: 2,
    name: "Electrical Courses Ltd",
    description:
      "Electrical Courses Ltd is a leading provider of electrical training courses in the UK.",
    address: "Unit 2, The Acorns, Crawley, West Sussex, RH11 0AN",
    contact: "0800 856 4449",
    website: "https://www.electricalcoursesltd.co.uk/",
    coursesOffered: [7, 8, 9, 10, 11],
    image:
      "https://www.electricalcoursesltd.co.uk/wp-content/uploads/2017/03/electrical-courses-ltd-training-centre.jpg",
  },
  {
    id: 3,
    name: "Nescot",
    description:
      "Nescot is a leading provider of further education courses in the UK.",
    address: "Reigate Road, Ewell, Surrey, KT17 3DS",
    contact: "020 8394 1731",
    website: "https://www.nescot.ac.uk/",
    coursesOffered: [12, 13],
    image: "https://www.nescot.ac.uk/Content/images/buildings/005.jpg",
  },
  {
    id: 4,
    name: "Kingston College",
    description:
      "Kingston College is a leading provider of further education courses in the UK.",
    address: "Kingston Hall Road, Kingston upon Thames, Surrey, KT1 2AQ",
    contact: "020 8268 6200",
    website: "https://www.kingston-college.ac.uk/",
    coursesOffered: [14, 15],
    image:
      "https://www.kingston-college.ac.uk/wp-content/uploads/2020/09/Kingston-College-1024x683.jpg",
  },
];
