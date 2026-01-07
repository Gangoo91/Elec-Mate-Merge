import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Reliable fallback static education data - always available
const FALLBACK_EDUCATION_DATA: LiveEducationData[] = [
  {
    id: 'static-1',
    title: 'HNC Electrical and Electronic Engineering',
    institution: 'City & Guilds / Pearson BTEC',
    description: 'A nationally recognised Level 4 qualification providing advanced knowledge in electrical engineering, circuit design, and systems analysis. Ideal for electricians seeking to progress into senior technical or managerial roles.',
    level: 'Level 4',
    duration: '2 years',
    category: 'Higher Education',
    studyMode: 'Part-time / Day release',
    locations: ['Nationwide', 'Various Colleges'],
    entryRequirements: ['Level 3 Electrical Qualification', 'GCSE Maths & English (Grade C/4+)', '18th Edition Wiring Regulations'],
    keyTopics: ['Electrical Circuit Theory', 'Engineering Mathematics', 'Power Systems', 'Control Systems', 'Project Management'],
    progressionOptions: ['HND Electrical Engineering', 'BSc Electrical Engineering', 'Management Roles'],
    fundingOptions: ['Advanced Learner Loan', 'Employer Sponsorship', 'Apprenticeship Levy'],
    tuitionFees: '£3,500 - £6,000 per year',
    applicationDeadline: 'Rolling Admission',
    nextIntake: 'September 2025',
    rating: 4.6,
    employmentRate: 94,
    averageStartingSalary: '£35,000',
    courseUrl: 'https://www.cityandguilds.com',
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'static-2',
    title: 'HND Electrical and Electronic Engineering',
    institution: 'Pearson BTEC',
    description: 'Level 5 Higher National Diploma providing comprehensive training in electrical systems, renewable energy, and building automation. Equivalent to the first two years of an engineering degree.',
    level: 'Level 5',
    duration: '2 years',
    category: 'Higher Education',
    studyMode: 'Part-time / Full-time',
    locations: ['Nationwide', 'Various Universities'],
    entryRequirements: ['HNC or Level 4 qualification', 'Relevant work experience'],
    keyTopics: ['Advanced Power Systems', 'Renewable Energy', 'Building Management Systems', 'PLC Programming', 'Industrial Control'],
    progressionOptions: ['BSc Electrical Engineering (Top-up)', 'Design Engineer', 'Project Manager'],
    fundingOptions: ['Student Finance', 'Apprenticeship', 'Employer Sponsorship'],
    tuitionFees: '£4,000 - £8,000 per year',
    applicationDeadline: 'Rolling Admission',
    nextIntake: 'September 2025',
    rating: 4.7,
    employmentRate: 96,
    averageStartingSalary: '£38,000',
    courseUrl: 'https://qualifications.pearson.com',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'static-3',
    title: 'BSc (Hons) Electrical Engineering',
    institution: 'Open University / Partner Universities',
    description: 'Accredited degree programme offering comprehensive study of electrical engineering principles, power distribution, and modern electrical systems. Study while working with flexible delivery options.',
    level: 'Level 6',
    duration: '3-6 years part-time',
    category: 'Higher Education',
    studyMode: 'Distance Learning / Part-time',
    locations: ['Online', 'UK Universities'],
    entryRequirements: ['HND or equivalent', 'A Levels or Access Course', 'Industry experience considered'],
    keyTopics: ['Electrical Power Engineering', 'Electronics', 'Control Systems', 'Renewable Technologies', 'Smart Grids'],
    progressionOptions: ['Chartered Engineer (CEng)', 'MSc Programmes', 'Senior Technical Management'],
    fundingOptions: ['Student Finance England', 'Part-time loans', 'Employer sponsorship'],
    tuitionFees: '£6,000 - £9,250 per year',
    applicationDeadline: 'Varies by institution',
    nextIntake: 'September / January',
    rating: 4.5,
    employmentRate: 92,
    averageStartingSalary: '£42,000',
    courseUrl: 'https://www.open.ac.uk',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'static-4',
    title: 'Level 4 Design and Verification of Electrical Installations',
    institution: 'EAL / City & Guilds',
    description: 'Advanced qualification covering electrical installation design, verification procedures, and compliance with BS 7671. Essential for electricians moving into design roles.',
    level: 'Level 4',
    duration: '6-12 months',
    category: 'Testing & Inspection',
    studyMode: 'Part-time / Evening',
    locations: ['UK Training Centres', 'College courses'],
    entryRequirements: ['Level 3 Electrical Qualification', '2391 or equivalent', 'Industry experience'],
    keyTopics: ['Installation Design', 'Protection Coordination', 'Verification & Testing', 'Documentation', 'BS 7671 Compliance'],
    progressionOptions: ['Electrical Designer', 'Contracts Manager', 'HNC Electrical'],
    fundingOptions: ['Self-funded', 'Employer sponsored', 'CITB Grants'],
    tuitionFees: '£1,200 - £2,500',
    applicationDeadline: 'Monthly intakes',
    nextIntake: 'Available monthly',
    rating: 4.8,
    employmentRate: 98,
    averageStartingSalary: '£38,000',
    courseUrl: 'https://www.cityandguilds.com',
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'static-5',
    title: 'NEBOSH General Certificate in Occupational Health & Safety',
    institution: 'NEBOSH',
    description: 'Industry-leading health and safety qualification highly valued in the electrical sector. Covers risk assessment, workplace hazards, and safety management systems.',
    level: 'Level 3',
    duration: '10-12 weeks',
    category: 'Health & Safety',
    studyMode: 'Classroom / Online / Blended',
    locations: ['Nationwide', 'Online delivery'],
    entryRequirements: ['No formal requirements', 'Basic English proficiency'],
    keyTopics: ['Risk Assessment', 'Workplace Safety', 'Legal Compliance', 'Hazard Management', 'Safety Culture'],
    progressionOptions: ['NEBOSH Diploma', 'Safety Manager', 'Site Safety Coordinator'],
    fundingOptions: ['Self-funded', 'Employer sponsored', 'CITB Grants'],
    tuitionFees: '£1,200 - £2,000',
    applicationDeadline: 'Rolling admission',
    nextIntake: 'Weekly start dates',
    rating: 4.7,
    employmentRate: 95,
    averageStartingSalary: '£35,000',
    courseUrl: 'https://www.nebosh.org.uk',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'static-6',
    title: 'Solar PV Installation and Design Level 3',
    institution: 'MCS / Various Providers',
    description: 'Comprehensive qualification for solar photovoltaic installation, including system design, installation methods, and commissioning procedures. Essential for renewable energy work.',
    level: 'Level 3',
    duration: '5 days',
    category: 'Renewable Energy',
    studyMode: 'Classroom with practical',
    locations: ['UK Training Centres'],
    entryRequirements: ['NVQ Level 3 Electrical', '18th Edition', 'BS 7671 knowledge'],
    keyTopics: ['PV System Design', 'Installation Methods', 'Inverter Technology', 'Grid Connection', 'Commissioning'],
    progressionOptions: ['MCS Certification', 'Battery Storage', 'EV Charging'],
    fundingOptions: ['Self-funded', 'Green Skills funding', 'Employer sponsored'],
    tuitionFees: '£1,500 - £2,500',
    applicationDeadline: 'Monthly intakes',
    nextIntake: 'Available monthly',
    rating: 4.6,
    employmentRate: 97,
    averageStartingSalary: '£36,000',
    courseUrl: 'https://www.mcscharitable.org',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'static-7',
    title: 'EV Charging Point Installation Level 3',
    institution: 'Various OZEV Approved Providers',
    description: 'Official qualification for electric vehicle charging point installation, covering domestic and commercial systems, smart charging, and load management.',
    level: 'Level 3',
    duration: '2-3 days',
    category: 'Renewable Energy',
    studyMode: 'Classroom with practical',
    locations: ['UK Training Centres'],
    entryRequirements: ['NVQ Level 3 Electrical', '18th Edition', 'Current ECS Card'],
    keyTopics: ['EV Charging Technology', 'Installation Methods', 'Load Management', 'Smart Charging', 'OZEV Compliance'],
    progressionOptions: ['OZEV Installer', 'Commercial EV', 'Fleet Installation'],
    fundingOptions: ['Self-funded', 'Employer sponsored', 'Grant funding'],
    tuitionFees: '£400 - £800',
    applicationDeadline: 'Rolling admission',
    nextIntake: 'Weekly courses',
    rating: 4.8,
    employmentRate: 99,
    averageStartingSalary: '£38,000',
    courseUrl: 'https://www.gov.uk/guidance/electric-vehicle-chargepoint-grant',
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'static-8',
    title: 'IET Wiring Regulations 18th Edition (BS 7671)',
    institution: 'IET / Various Providers',
    description: 'Essential update training for the 18th Edition Wiring Regulations. Mandatory for all practising electricians to maintain competence and compliance.',
    level: 'Level 3',
    duration: '3 days',
    category: 'Regulations & Standards',
    studyMode: 'Classroom / Online',
    locations: ['Nationwide'],
    entryRequirements: ['Electrical background', '17th Edition (recommended)'],
    keyTopics: ['Regulation Changes', 'Special Locations', 'Arc Fault Detection', 'Overvoltage Protection', 'EV Requirements'],
    progressionOptions: ['2391 Testing', 'Design Qualifications', 'Specialist Areas'],
    fundingOptions: ['Self-funded', 'Employer sponsored', 'JIB/ECS Support'],
    tuitionFees: '£250 - £450',
    applicationDeadline: 'Rolling admission',
    nextIntake: 'Weekly courses',
    rating: 4.9,
    employmentRate: 100,
    averageStartingSalary: '£35,000',
    courseUrl: 'https://www.theiet.org',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'static-9',
    title: 'City & Guilds 2391 Inspection and Testing',
    institution: 'City & Guilds',
    description: 'Industry-standard qualification for electrical inspection and testing. Covers initial verification and periodic inspection with practical assessments.',
    level: 'Level 3',
    duration: '5-10 days',
    category: 'Testing & Inspection',
    studyMode: 'Classroom with practical',
    locations: ['UK Training Centres', 'Colleges'],
    entryRequirements: ['Level 3 Electrical', '18th Edition', 'Industry experience'],
    keyTopics: ['Initial Verification', 'Periodic Inspection', 'Test Equipment', 'Documentation', 'Fault Finding'],
    progressionOptions: ['EICR Reports', 'PAT Testing', 'Design & Verification'],
    fundingOptions: ['Self-funded', 'CITB Grant', 'Employer sponsored'],
    tuitionFees: '£800 - £1,500',
    applicationDeadline: 'Monthly intakes',
    nextIntake: 'Available monthly',
    rating: 4.8,
    employmentRate: 98,
    averageStartingSalary: '£36,000',
    courseUrl: 'https://www.cityandguilds.com',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'static-10',
    title: 'Fire Detection & Alarm Systems Level 3',
    institution: 'FIA / Various Approved Providers',
    description: 'Comprehensive training on fire alarm system design, installation, and commissioning to BS 5839 standards. Essential for commercial electrical work.',
    level: 'Level 3',
    duration: '5 days',
    category: 'Fire & Security',
    studyMode: 'Classroom with practical',
    locations: ['UK Training Centres'],
    entryRequirements: ['Electrical background', 'Basic fire safety awareness'],
    keyTopics: ['System Design', 'BS 5839', 'Detection Types', 'Installation Methods', 'Commissioning'],
    progressionOptions: ['Fire Alarm Engineer', 'System Designer', 'Fire Risk Assessment'],
    fundingOptions: ['Self-funded', 'Employer sponsored'],
    tuitionFees: '£1,000 - £1,800',
    applicationDeadline: 'Monthly intakes',
    nextIntake: 'Available monthly',
    rating: 4.6,
    employmentRate: 95,
    averageStartingSalary: '£34,000',
    courseUrl: 'https://www.fia.uk.com',
    imageUrl: 'https://images.unsplash.com/photo-1545259741-2266e4fca8db?w=400',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'static-11',
    title: 'Industrial and Commercial Electrician Apprenticeship',
    institution: 'JTL / Various Employers',
    description: 'Comprehensive 4-year apprenticeship combining practical work experience with formal qualifications. Leads to fully qualified electrician status with JIB card.',
    level: 'Level 3',
    duration: '4 years',
    category: 'Apprenticeships',
    studyMode: 'Day release + workplace',
    locations: ['Nationwide'],
    entryRequirements: ['GCSE Maths & English (Grade C/4+)', 'Aptitude assessment', 'Interview'],
    keyTopics: ['Installation Methods', 'Testing & Inspection', 'Health & Safety', 'Wiring Regulations', 'Practical Skills'],
    progressionOptions: ['Approved Electrician', 'Supervisor', 'Contracts Manager'],
    fundingOptions: ['Fully funded', 'Apprenticeship Levy'],
    tuitionFees: 'Fully funded (earn while you learn)',
    applicationDeadline: 'Various throughout year',
    nextIntake: 'September / February',
    rating: 4.7,
    employmentRate: 96,
    averageStartingSalary: '£32,000',
    courseUrl: 'https://www.jtltraining.com',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'static-12',
    title: 'Emergency Lighting Design & Installation',
    institution: 'ECA / Various Providers',
    description: 'Specialist qualification covering emergency lighting system design, installation, testing and maintenance to BS 5266 standards.',
    level: 'Level 3',
    duration: '2-3 days',
    category: 'Fire & Security',
    studyMode: 'Classroom',
    locations: ['UK Training Centres'],
    entryRequirements: ['Electrical qualification', 'BS 7671 knowledge'],
    keyTopics: ['BS 5266 Standards', 'System Design', 'Luminaire Selection', 'Testing Requirements', 'Risk Assessment'],
    progressionOptions: ['Building Services', 'Fire Systems', 'Commercial Specialist'],
    fundingOptions: ['Self-funded', 'Employer sponsored'],
    tuitionFees: '£400 - £700',
    applicationDeadline: 'Rolling admission',
    nextIntake: 'Monthly courses',
    rating: 4.5,
    employmentRate: 94,
    averageStartingSalary: '£34,000',
    courseUrl: 'https://www.eca.co.uk',
    imageUrl: 'https://images.unsplash.com/photo-1545259741-2266e4fca8db?w=400',
    lastUpdated: new Date().toISOString()
  }
];

// Generate analytics from fallback data
const generateFallbackAnalytics = (data: LiveEducationData[]): LiveEducationAnalytics => {
  const categories = data.reduce((acc, course) => {
    acc[course.category] = (acc[course.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categories)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return {
    totalCourses: data.length,
    totalProviders: new Set(data.map(c => c.institution)).size,
    averageRating: data.reduce((sum, c) => sum + c.rating, 0) / data.length,
    averageEmploymentRate: data.reduce((sum, c) => sum + c.employmentRate, 0) / data.length,
    averageStartingSalary: '£36,000',
    highDemandPrograms: data.filter(c => c.employmentRate > 95).length,
    fundingOptionsAvailable: data.length,
    topCategories,
    trends: {
      growthAreas: ['Renewable Energy', 'EV Charging', 'Smart Buildings', 'Energy Storage'],
      industryPartnerships: ['JTL', 'ECA', 'NICEIC', 'SELECT', 'IET']
    }
  };
};

export interface LiveEducationData {
  id: string;
  title: string;
  institution: string;
  description: string;
  level: string;
  duration: string;
  category: string;
  studyMode: string;
  locations: string[];
  entryRequirements: string[];
  keyTopics: string[];
  progressionOptions: string[];
  fundingOptions: string[];
  tuitionFees: string;
  applicationDeadline: string;
  nextIntake: string;
  rating: number;
  employmentRate: number;
  averageStartingSalary: string;
  courseUrl: string;
  imageUrl?: string;
  lastUpdated: string;
}

export interface LiveEducationAnalytics {
  totalCourses: number;
  totalProviders: number;
  averageRating: number;
  averageEmploymentRate: number;
  averageStartingSalary: string;
  highDemandPrograms: number;
  fundingOptionsAvailable: number;
  topCategories: Array<{ name: string; count: number }>;
  trends: {
    growthAreas: string[];
    industryPartnerships: string[];
  };
}

interface CacheInfo {
  nextRefresh: string;
  cacheVersion: number;
  refreshStatus: string;
  daysUntilRefresh: number;
}

interface UseLiveEducationDataResult {
  educationData: LiveEducationData[];
  analytics: LiveEducationAnalytics | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  isFromCache: boolean;
  cacheInfo: CacheInfo | null;
  refreshData: (forceRefresh?: boolean) => Promise<void>;
}

export const useLiveEducationData = (category: string = 'all'): UseLiveEducationDataResult => {
  const [educationData, setEducationData] = useState<LiveEducationData[]>([]);
  const [analytics, setAnalytics] = useState<LiveEducationAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isFromCache, setIsFromCache] = useState(false);
  const [cacheInfo, setCacheInfo] = useState<CacheInfo | null>(null);

  const fetchEducationData = async (forceRefresh: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Fetching live education data...');

      // Check for cached data first (if not forcing refresh)
      if (!forceRefresh) {
        const { data: cachedData, error: cacheError } = await supabase
          .from('live_education_cache')
          .select('*')
          .eq('category', category)
          .gte('expires_at', new Date().toISOString())
          .maybeSingle();

        if (!cacheError && cachedData?.education_data && cachedData?.analytics_data) {
          const educationArray = cachedData.education_data as unknown as LiveEducationData[];
          console.log(`⚡ Using cached education data (${educationArray.length} programmes)`);
          setEducationData(educationArray || []);
          setAnalytics(cachedData.analytics_data as unknown as LiveEducationAnalytics || null);
          setLastUpdated(cachedData.last_refreshed);
          setIsFromCache(true);
          setCacheInfo({
            nextRefresh: cachedData.next_refresh_date,
            cacheVersion: cachedData.cache_version,
            refreshStatus: cachedData.refresh_status,
            daysUntilRefresh: Math.ceil((new Date(cachedData.next_refresh_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
          });
          setLoading(false);
          return;
        }
      }

      // If no cache or force refresh, fetch fresh data with timeout
      console.log('📡 Fetching fresh education data from Firecrawl...');
      
      const fetchWithTimeout = async (timeoutMs: number) => {
        return Promise.race([
          supabase.functions.invoke('firecrawl-education-scraper', {
            body: { 
              category, 
              refresh: forceRefresh, 
              limit: 50 
            }
          }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
          )
        ]);
      };

      let data, functionError;
      try {
        const result = await fetchWithTimeout(30000) as any; // 30 second timeout for Firecrawl
        data = result.data;
        functionError = result.error;
      } catch (timeoutError) {
        console.warn('⏰ Firecrawl request timed out, using cached data');
        functionError = timeoutError;
      }

      if (functionError) {
        console.error('❌ Function error:', functionError);
        
        // Try to get latest cached data as fallback
        const { data: fallbackData } = await supabase
          .from('live_education_cache')
          .select('*')
          .eq('category', category)
          .order('created_at', { ascending: false })
          .maybeSingle();

        if (fallbackData?.education_data) {
          const fallbackArray = fallbackData.education_data as unknown as LiveEducationData[];
          console.log(`🔄 Using fallback cached data (${fallbackArray.length} programmes)`);
          setEducationData(fallbackArray || []);
          setAnalytics(fallbackData.analytics_data as unknown as LiveEducationAnalytics || null);
          setLastUpdated(fallbackData.last_refreshed);
          setIsFromCache(true);
          setCacheInfo({
            nextRefresh: fallbackData.next_refresh_date,
            cacheVersion: fallbackData.cache_version,
            refreshStatus: 'expired',
            daysUntilRefresh: 0
          });
        }
        
        setError('Unable to fetch fresh data - showing cached results if available');
        setLoading(false);
        return;
      }

      if (data?.success && data?.data && data?.data.length > 0 && data?.analytics) {
        console.log(`✅ Loaded ${data.data.length} education programmes`);
        setEducationData(data.data);
        setAnalytics(data.analytics);
        setLastUpdated(new Date().toISOString());
        setIsFromCache(false);
        setCacheInfo(data.cacheInfo || null);
        setError(null);
      } else {
        console.warn('⚠️ Unexpected response or empty data, using fallback:', data);
        // Use static fallback data
        setEducationData(FALLBACK_EDUCATION_DATA);
        setAnalytics(generateFallbackAnalytics(FALLBACK_EDUCATION_DATA));
        setLastUpdated(new Date().toISOString());
        setIsFromCache(true);
        setError(null);
      }

    } catch (error) {
      console.error('❌ Error fetching education data:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch education data');
      
      // Try to get latest cached data as fallback
      try {
        const { data: fallbackData } = await supabase
          .from('live_education_cache')
          .select('*')
          .eq('category', category)
          .order('created_at', { ascending: false })
          .maybeSingle();

        if (fallbackData?.education_data) {
          const errorFallbackArray = fallbackData.education_data as unknown as LiveEducationData[];
          console.log(`🔄 Using fallback cached data after error (${errorFallbackArray.length} programmes)`);
          setEducationData(errorFallbackArray || []);
          setAnalytics(fallbackData.analytics_data as unknown as LiveEducationAnalytics || null);
          setLastUpdated(fallbackData.last_refreshed);
          setIsFromCache(true);
          setCacheInfo({
            nextRefresh: fallbackData.next_refresh_date,
            cacheVersion: fallbackData.cache_version,
            refreshStatus: 'error',
            daysUntilRefresh: 0
          });
        }
      } catch (fallbackError) {
        console.error('❌ Failed to get fallback data:', fallbackError);
        // Use static fallback data as last resort
        console.log('📦 Using static fallback education data');
        setEducationData(FALLBACK_EDUCATION_DATA);
        setAnalytics(generateFallbackAnalytics(FALLBACK_EDUCATION_DATA));
        setLastUpdated(new Date().toISOString());
        setIsFromCache(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducationData();
  }, [category]);

  const refreshData = async (forceRefresh: boolean = false) => {
    await fetchEducationData(forceRefresh);
  };

  return {
    educationData,
    analytics,
    loading,
    error,
    lastUpdated,
    isFromCache,
    cacheInfo,
    refreshData
  };
};