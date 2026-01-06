// Mental Health Podcast Data - Curated list for UK electricians and tradespeople

export interface PodcastLinks {
  spotify?: string;
  apple?: string;
  youtube?: string;
  website?: string;
  facebook?: string;
}

export interface Podcast {
  id: string;
  name: string;
  host: string;
  description: string;
  topics: string[];
  category: 'trades-specific' | 'general-mental-health' | 'personal-stories' | 'sleep-anxiety';
  featured?: boolean;
  imageUrl?: string;
  links: PodcastLinks;
}

export const podcastCategories = [
  { id: 'all', label: 'All Podcasts' },
  { id: 'trades-specific', label: 'Trades & Construction' },
  { id: 'general-mental-health', label: 'General Wellbeing' },
  { id: 'personal-stories', label: 'Personal Stories' },
  { id: 'sleep-anxiety', label: 'Sleep & Anxiety' },
] as const;

export const podcasts: Podcast[] = [
  // ============================================
  // FEATURED - User's Friend's Podcast
  // ============================================
  {
    id: "share-your-story",
    name: "Share Your Story",
    host: "Share Your Story Team",
    description: "Real people sharing their mental health journeys. Personal stories of struggle, recovery, and hope that remind us we're never alone. A supportive space for honest conversations about mental health.",
    topics: ["Personal Recovery", "Real Stories", "Hope", "Community Support", "Lived Experience"],
    category: "personal-stories",
    featured: true,
    links: {
      youtube: "https://www.youtube.com/@ShareYourStoryPodcast",
      facebook: "https://www.facebook.com/ShareYourStoryPodcast"
    }
  },

  // ============================================
  // TRADES/CONSTRUCTION SPECIFIC
  // ============================================
  {
    id: "mates-in-mind",
    name: "Mates in Mind Podcast",
    host: "Mates in Mind",
    description: "Mental health awareness specifically for the construction and related industries. Toolbox talks, expert interviews, and practical guidance for improving workplace mental health support.",
    topics: ["Construction", "Workplace Wellbeing", "Toolbox Talks", "Industry Support"],
    category: "trades-specific",
    links: {
      website: "https://www.matesinmind.org/",
      spotify: "https://open.spotify.com/show/matesinmind"
    }
  },
  {
    id: "lighthouse-podcast",
    name: "The Lighthouse Podcast",
    host: "Lighthouse Construction Industry Charity",
    description: "Stories from the construction industry charity supporting workers and their families. Real experiences from tradespeople who've faced mental health challenges and found support.",
    topics: ["Construction Workers", "Family Support", "Crisis Help", "Recovery Stories"],
    category: "trades-specific",
    links: {
      website: "https://www.lighthouseclub.org/"
    }
  },
  {
    id: "andys-man-club-talks",
    name: "Andy's Man Club Conversations",
    host: "Andy's Man Club",
    description: "Men talking openly about mental health. Andy's Man Club runs free peer support groups across the UK where men can speak openly about their struggles.",
    topics: ["Men's Mental Health", "Peer Support", "Open Conversations", "Community"],
    category: "trades-specific",
    links: {
      website: "https://andysmanclub.co.uk/",
      youtube: "https://www.youtube.com/@AndysManClubUK"
    }
  },

  // ============================================
  // GENERAL MENTAL HEALTH
  // ============================================
  {
    id: "happy-place",
    name: "Happy Place",
    host: "Fearne Cotton",
    description: "One of the UK's most popular wellbeing podcasts. Honest conversations about mental health, happiness, and living a more balanced life with celebrity and expert guests.",
    topics: ["Wellbeing", "Happiness", "Life Balance", "Celebrity Stories", "Mindfulness"],
    category: "general-mental-health",
    links: {
      spotify: "https://open.spotify.com/show/5ysocJgQgbKKqfCLPL0P5m",
      apple: "https://podcasts.apple.com/gb/podcast/happy-place/id1404395710"
    }
  },
  {
    id: "feel-better-live-more",
    name: "Feel Better, Live More",
    host: "Dr Rangan Chatterjee",
    description: "Dr Chatterjee explores the four pillars of health: relaxation, food, movement, and sleep. Practical advice backed by science to help you feel better every day.",
    topics: ["Health", "Sleep", "Stress", "Lifestyle", "Science-Based"],
    category: "general-mental-health",
    links: {
      spotify: "https://open.spotify.com/show/7lsMIODQsbn36VFdv3rSK5",
      apple: "https://podcasts.apple.com/gb/podcast/feel-better-live-more-with-dr-rangan-chatterjee/id1333552422"
    }
  },
  {
    id: "mental-health-foundation",
    name: "Mental Health Foundation Podcast",
    host: "Mental Health Foundation",
    description: "Evidence-based mental health content from the UK's leading charity. Research, campaigns, and practical tips for maintaining good mental health.",
    topics: ["Research", "Prevention", "Public Health", "Awareness"],
    category: "general-mental-health",
    links: {
      website: "https://www.mentalhealth.org.uk/"
    }
  },
  {
    id: "mind-your-head",
    name: "Mind Your Head",
    host: "Mind Charity",
    description: "Official podcast from Mind, the UK's leading mental health charity. Expert advice, personal stories, and guidance on getting support when you need it.",
    topics: ["Mental Health Support", "Charity", "Expert Advice", "Resources"],
    category: "general-mental-health",
    links: {
      website: "https://www.mind.org.uk/"
    }
  },

  // ============================================
  // PERSONAL STORIES / RECOVERY
  // ============================================
  {
    id: "mentally-yours",
    name: "Mentally Yours",
    host: "Metro.co.uk",
    description: "Real people sharing their mental health stories without filter. From anxiety to addiction, depression to eating disorders - honest conversations that break the stigma.",
    topics: ["Personal Stories", "Anxiety", "Depression", "Recovery", "Stigma-Breaking"],
    category: "personal-stories",
    links: {
      spotify: "https://open.spotify.com/show/0NK8z4NxyuogrBs5a0w4Id",
      apple: "https://podcasts.apple.com/gb/podcast/mentally-yours/id1143539825"
    }
  },
  {
    id: "mad-world",
    name: "Mad World",
    host: "Bryony Gordon",
    description: "Telegraph columnist Bryony Gordon talks honestly about mental health with a range of guests including royalty and celebrities. Vulnerable, real conversations.",
    topics: ["Celebrity Stories", "Honest Conversations", "OCD", "Addiction", "Recovery"],
    category: "personal-stories",
    links: {
      spotify: "https://open.spotify.com/show/0s0Io8dKE44tDsZ1IgPLbh"
    }
  },
  {
    id: "the-naked-professors",
    name: "The Naked Professors",
    host: "Various Academics",
    description: "University professors strip back their professional personas to discuss mental health, imposter syndrome, and the pressures of modern life with refreshing honesty.",
    topics: ["Men's Mental Health", "Imposter Syndrome", "Work Pressure", "Academic Life"],
    category: "personal-stories",
    links: {
      spotify: "https://open.spotify.com/show/nakedprofessors"
    }
  },

  // ============================================
  // SLEEP & ANXIETY
  // ============================================
  {
    id: "sleepy",
    name: "Sleepy",
    host: "Otis Gray",
    description: "Bedtime stories for grown-ups. Calm, slow readings of classic literature designed to help you drift off to sleep. Perfect for those nights when your mind won't switch off.",
    topics: ["Sleep Aid", "Bedtime Stories", "Relaxation", "Insomnia Help"],
    category: "sleep-anxiety",
    links: {
      spotify: "https://open.spotify.com/show/5TibIA8dcNvBbEjSwFNkdv",
      apple: "https://podcasts.apple.com/gb/podcast/sleepy/id1093888753"
    }
  },
  {
    id: "nothing-much-happens",
    name: "Nothing Much Happens",
    host: "Kathryn Nicolai",
    description: "Bedtime stories for adults where nothing much happens. Gentle, calming narratives specifically designed to help you fall asleep peacefully.",
    topics: ["Sleep Stories", "Calm", "Relaxation", "Bedtime"],
    category: "sleep-anxiety",
    links: {
      spotify: "https://open.spotify.com/show/5R3VnRZKKnqc3i4nPOvaBN",
      apple: "https://podcasts.apple.com/gb/podcast/nothing-much-happens-bedtime-stories-to-help-you-sleep/id1378040733"
    }
  },
  {
    id: "the-anxiety-guy",
    name: "The Anxiety Guy",
    host: "Dennis Simsek",
    description: "Practical strategies for overcoming anxiety from someone who's been there. Evidence-based techniques, success stories, and daily tips for managing anxiety.",
    topics: ["Anxiety", "CBT Techniques", "Recovery", "Daily Tips"],
    category: "sleep-anxiety",
    links: {
      spotify: "https://open.spotify.com/show/1sU2DPUQ6XNc5TzKXh81Q3",
      apple: "https://podcasts.apple.com/gb/podcast/the-anxiety-guy-podcast/id1040107262"
    }
  }
];

// Helper function to get podcasts by category
export const getPodcastsByCategory = (category: string): Podcast[] => {
  if (category === 'all') return podcasts;
  return podcasts.filter(p => p.category === category);
};

// Get featured podcast
export const getFeaturedPodcast = (): Podcast | undefined => {
  return podcasts.find(p => p.featured);
};
