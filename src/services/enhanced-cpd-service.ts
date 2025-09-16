import { 
  EnhancedCPDEntry, 
  CPDSettings, 
  ProfessionalBodyRequirement, 
  ComplianceAnalysis,
  CPDReminder,
  EvidenceFile,
  CPDCategory
} from '@/types/cpd-enhanced';
import { supabase } from '@/integrations/supabase/client';
import { professionalBodyService } from '@/services/professionalBodyService';

export interface CPDComplianceStats {
  compliance_percentage: number;
  total_hours: number;
  required_hours: number;
  entries_count: number;
  verified_entries: number;
  pending_verification: number;
  categories: {
    id: string;
    name: string;
    completed_hours: number;
    required_hours: number;
    percentage: number;
  }[];
}

class EnhancedCPDService {
  private readonly REMINDERS_KEY = 'cpd_reminders';
  private readonly SETTINGS_KEY = 'cpd_settings';

  // Professional Body Compliance
  getProfessionalBodyRequirements(): ProfessionalBodyRequirement[] {
    const settings = this.getSettings();
    return settings.professionalBodies;
  }

  updateProfessionalBody(body: ProfessionalBodyRequirement): void {
    const settings = this.getSettings();
    const index = settings.professionalBodies.findIndex(b => b.body === body.body);
    
    if (index >= 0) {
      settings.professionalBodies[index] = body;
    } else {
      settings.professionalBodies.push(body);
    }
    
    this.saveSettings(settings);
  }

  getComplianceAnalysis(): ComplianceAnalysis {
    const entries = this.getDefaultEntries();
    const requirements = this.getProfessionalBodyRequirements();
    const currentYear = new Date().getFullYear();
    
    // Filter entries for current assessment period
    const yearEntries = entries.filter(entry => 
      new Date(entry.date).getFullYear() === currentYear
    );

    const totalHours = yearEntries.reduce((sum, entry) => sum + entry.hours, 0);
    const requiredHours = requirements.reduce((sum, req) => sum + (req.minHoursPerYear || 35), 0);
    
    // Category analysis
    const categoryMap = new Map<CPDCategory, number>();
    yearEntries.forEach(entry => {
      const current = categoryMap.get(entry.category) || 0;
      categoryMap.set(entry.category, current + entry.hours);
    });

    const categoryGaps = Array.from(categoryMap.entries()).map(([category, completed]) => ({
      category,
      completed,
      required: this.getRequiredHoursForCategory(category, requirements),
      status: completed >= this.getRequiredHoursForCategory(category, requirements) 
        ? 'complete' as const
        : completed >= this.getRequiredHoursForCategory(category, requirements) * 0.7 
        ? 'on-track' as const 
        : 'behind' as const
    }));

    const overallStatus = totalHours >= requiredHours 
      ? 'compliant' as const
      : totalHours >= requiredHours * 0.8 
      ? 'at-risk' as const 
      : 'non-compliant' as const;

    return {
      overallStatus,
      hoursCompleted: totalHours,
      hoursRequired: requiredHours,
      categoryGaps,
      recommendations: this.generateRecommendations(categoryGaps, overallStatus),
      nextDeadlines: this.getUpcomingDeadlines(requirements)
    };
  }

  private getRequiredHoursForCategory(category: CPDCategory, requirements: ProfessionalBodyRequirement[]): number {
    // Basic category requirements - can be customized per professional body
    const categoryRequirements: Record<CPDCategory, number> = {
      'regulations-standards': 8,
      'technical-skills': 10,
      'safety-health': 6,
      'business-commercial': 4,
      'professional-ethics': 2,
      'environmental-sustainability': 3,
      'digital-technology': 4,
      'customer-service': 3
    };
    
    return categoryRequirements[category] || 0;
  }

  private generateRecommendations(categoryGaps: any[], overallStatus: string): string[] {
    const recommendations: string[] = [];
    
    if (overallStatus === 'non-compliant') {
      recommendations.push('Urgent: You are significantly behind on your CPD requirements. Consider booking formal training courses.');
    } else if (overallStatus === 'at-risk') {
      recommendations.push('Warning: You are at risk of not meeting your annual CPD target. Plan additional activities soon.');
    }

    categoryGaps.forEach(gap => {
      if (gap.status === 'behind') {
        recommendations.push(`Focus on ${gap.category.replace('-', ' ')} activities - you need ${gap.required - gap.completed} more hours.`);
      }
    });

    return recommendations;
  }

  private getUpcomingDeadlines(requirements: ProfessionalBodyRequirement[]): Array<{date: string, type: string, description: string}> {
    const deadlines: Array<{date: string, type: string, description: string}> = [];
    
    requirements.forEach(req => {
      if (req.renewalDate) {
        deadlines.push({
          date: req.renewalDate,
          type: 'Professional Body Renewal',
          description: `${req.body} membership renewal due`
        });
      }
      
      if (req.nextAssessment) {
        deadlines.push({
          date: req.nextAssessment,
          type: 'Assessment',
          description: `${req.body} assessment due`
        });
      }
    });

    return deadlines.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  // Enhanced Evidence Management
  async uploadEvidence(entryId: string, file: File, type: string): Promise<EvidenceFile> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Upload file to Supabase storage
      const fileName = `${user.id}/${entryId}/${crypto.randomUUID()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('cpd-evidence')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get signed URL for the uploaded file
      const { data: urlData } = await supabase.storage
        .from('cpd-evidence')
        .createSignedUrl(fileName, 60 * 60 * 24 * 365); // 1 year expiry

      const evidenceFile: EvidenceFile = {
        id: crypto.randomUUID(),
        type: type as any,
        fileName: file.name,
        fileUrl: urlData?.signedUrl || '',
        uploadDate: new Date().toISOString(),
        verified: false,
        extractedData: this.simulateOCRExtraction(file.name)
      };

      return evidenceFile;
    } catch (error) {
      console.error('Error uploading evidence:', error);
      throw error;
    }
  }

  private simulateOCRExtraction(fileName: string): Record<string, any> {
    // Simulate OCR data extraction based on file type
    if (fileName.toLowerCase().includes('certificate')) {
      return {
        certificateNumber: 'CERT-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        issueDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        hours: Math.floor(Math.random() * 8) + 1
      };
    }
    
    return {};
  }

  // Smart Reminders
  getActiveReminders(): CPDReminder[] {
    const stored = localStorage.getItem(this.REMINDERS_KEY);
    const reminders: CPDReminder[] = stored ? JSON.parse(stored) : [];
    
    // Generate dynamic reminders
    const dynamicReminders = this.generateDynamicReminders();
    
    return [...reminders.filter(r => !r.dismissed), ...dynamicReminders];
  }

  private generateDynamicReminders(): CPDReminder[] {
    const reminders: CPDReminder[] = [];
    const analysis = this.getComplianceAnalysis();
    const requirements = this.getProfessionalBodyRequirements();
    
    // Compliance warnings
    if (analysis.overallStatus === 'at-risk') {
      reminders.push({
        id: 'compliance-warning',
        type: 'goal-progress',
        title: 'CPD Progress Warning',
        message: `You're behind on your annual CPD target. ${analysis.hoursRequired - analysis.hoursCompleted} hours remaining.`,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'medium',
        dismissed: false,
        actionRequired: 'Book additional training activities'
      });
    }

    // Renewal reminders
    requirements.forEach(req => {
      const renewalDate = new Date(req.renewalDate);
      const daysUntilRenewal = Math.ceil((renewalDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      
      if (daysUntilRenewal <= 90 && daysUntilRenewal > 0) {
        reminders.push({
          id: `renewal-${req.body}`,
          type: 'renewal',
          title: `${req.body} Renewal Due Soon`,
          message: `Your ${req.body} membership renewal is due in ${daysUntilRenewal} days.`,
          dueDate: req.renewalDate,
          priority: daysUntilRenewal <= 30 ? 'high' : 'medium',
          dismissed: false,
          actionRequired: 'Prepare renewal documentation'
        });
      }
    });

    return reminders;
  }

  dismissReminder(id: string): void {
    const stored = localStorage.getItem(this.REMINDERS_KEY);
    const reminders: CPDReminder[] = stored ? JSON.parse(stored) : [];
    
    const index = reminders.findIndex(r => r.id === id);
    if (index >= 0) {
      reminders[index].dismissed = true;
    }
    
    localStorage.setItem(this.REMINDERS_KEY, JSON.stringify(reminders));
  }

  // Enhanced Entry Management
  async getEntries(userId: string): Promise<EnhancedCPDEntry[]> {
    try {
      const { data, error } = await supabase
        .from('cpd_entries')
        .select('*')
        .eq('user_id', userId)
        .order('date_completed', { ascending: false });

      if (error) throw error;

      return data?.map(this.mapDatabaseToEntry) || [];
    } catch (error) {
      console.error('Error fetching CPD entries:', error);
      return [];
    }
  }

  async saveEntry(entry: Omit<EnhancedCPDEntry, 'id' | 'createdAt' | 'updatedAt'>, userId: string): Promise<EnhancedCPDEntry> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('cpd_entries')
        .insert({
          user_id: userId,
          date: entry.date,
          activity: entry.activity,
          category: entry.category,
          type: entry.type,
          hours: entry.hours,
          provider: entry.provider,
          description: entry.description,
          learning_outcomes: entry.learningOutcomes,
          reflection_notes: entry.reflectionNotes,
          skills_gained: entry.skillsGained,
          evidence_files: JSON.stringify(entry.evidenceFiles),
          status: entry.status || 'pending',
          is_automatic: entry.isAutomatic || false
        })
        .select()
        .single();

      if (error) throw error;

      return this.mapDatabaseToEntry(data);
    } catch (error) {
      console.error('Error saving CPD entry:', error);
      throw error;
    }
  }

  private mapDatabaseToEntry(data: any): EnhancedCPDEntry {
    return {
      id: data.id,
      date: data.date,
      activity: data.activity,
      category: data.category,
      type: data.type,
      hours: data.hours,
      provider: data.provider,
      description: data.description,
      learningOutcomes: data.learning_outcomes,
      reflectionNotes: data.reflection_notes,
      skillsGained: data.skills_gained || [],
      evidenceFiles: data.evidence_files ? JSON.parse(data.evidence_files) : [],
      status: data.status,
      isAutomatic: data.is_automatic,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }

  // New Supabase methods for enhanced dashboard
  async getComplianceStats(userId: string, professionalBodyId: string): Promise<CPDComplianceStats> {
    try {
      const currentYear = new Date().getFullYear();
      
      // Get entries for current year
      const { data: entries, error: entriesError } = await supabase
        .from('cpd_entries')
        .select('*')
        .eq('user_id', userId)
        .gte('date_completed', `${currentYear}-01-01`)
        .lte('date_completed', `${currentYear}-12-31`);

      if (entriesError) throw entriesError;

      // Get professional body
      const { data: profBody, error: profBodyError } = await supabase
        .from('professional_bodies')
        .select('*')
        .eq('id', professionalBodyId)
        .single();

      if (profBodyError) throw profBodyError;

      const totalHours = entries?.reduce((sum, entry) => sum + entry.hours, 0) || 0;
      const requiredHours = profBody?.cpd_hours_required || 35;
      const compliancePercentage = Math.round((totalHours / requiredHours) * 100);
      
      const verifiedEntries = entries?.filter(e => e.status === 'verified').length || 0;
      const pendingEntries = entries?.filter(e => e.status === 'pending').length || 0;

      // Calculate category breakdown
      const categoryStats = profBody?.professional_body_categories?.map((cat: any) => {
        const categoryEntries = entries?.filter(e => e.category === cat.category_name) || [];
        const completedHours = categoryEntries.reduce((sum, entry) => sum + entry.hours, 0);
        const requiredHours = cat.required_hours || 0;
        
        return {
          id: cat.id,
          name: cat.category_name,
          completed_hours: completedHours,
          required_hours: requiredHours,
          percentage: requiredHours > 0 ? Math.round((completedHours / requiredHours) * 100) : 0
        };
      }) || [];

      return {
        compliance_percentage: compliancePercentage,
        total_hours: totalHours,
        required_hours: requiredHours,
        entries_count: entries?.length || 0,
        verified_entries: verifiedEntries,
        pending_verification: pendingEntries,
        categories: categoryStats
      };
    } catch (error) {
      console.error('Error getting compliance stats:', error);
      throw error;
    }
  }

  async generatePortfolio(userId: string, professionalBodyId: string, title: string): Promise<void> {
    try {
      const entries = await this.getEntries(userId);
      const stats = await this.getComplianceStats(userId, professionalBodyId);
      
      // Insert portfolio record
      const { data, error } = await supabase
        .from('cpd_portfolios')
        .insert({
          user_id: userId,
          professional_body_id: professionalBodyId,
          title,
          period_start: `${new Date().getFullYear()}-01-01`,
          period_end: `${new Date().getFullYear()}-12-31`,
          total_hours: stats.total_hours,
          compliance_percentage: stats.compliance_percentage,
          status: 'ready'
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error generating portfolio:', error);
      throw error;
    }
  }

  // Settings Management
  getSettings(): CPDSettings {
    // Return default settings for now - in real implementation this would be from database
    return this.getDefaultSettings();
  }

  saveSettings(settings: CPDSettings): void {
    // In real implementation this would save to database
    console.log('Settings saved:', settings);
  }

  private getDefaultSettings(): CPDSettings {
    return {
      professionalBodies: [
        {
          body: 'NICEIC',
          renewalDate: '2024-12-31',
          minHoursPerYear: 35,
          requiredCategories: ['regulations-standards', 'technical-skills', 'safety-health'],
          assessmentRequired: false,
          complianceStatus: 'compliant'
        }
      ],
      notificationPreferences: {
        email: true,
        push: true,
        remindBefore: 30
      },
      autoTrackingEnabled: true,
      requireSupervisorApproval: false,
      defaultProvider: 'Company Training'
    };
  }

  private getDefaultEntries(): EnhancedCPDEntry[] {
    return [
      {
        id: '1',
        date: '2024-01-15',
        activity: 'BS 7671 18th Edition Update Seminar',
        category: 'regulations-standards',
        type: 'formal-training',
        hours: 8,
        provider: 'NICEIC',
        description: 'Comprehensive update on the latest changes to BS 7671 including EV charging requirements',
        learningOutcomes: 'Understanding of new requirements for EV charging and energy storage systems',
        evidenceFiles: [],
        status: 'verified',
        isAutomatic: false,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        reflectionNotes: 'Excellent course covering practical applications of the new regulations.',
        skillsGained: ['EV charging installation', 'Energy storage systems', 'Updated testing procedures']
      }
    ];
  }

  // Analytics & Reporting
  getDetailedAnalytics() {
    const entries = this.getEntries();
    const currentYear = new Date().getFullYear();
    
    // Time-based analysis
    const monthlyData = this.getMonthlyBreakdown(entries, currentYear);
    const categoryData = this.getCategoryBreakdown(entries, currentYear);
    const providerData = this.getProviderBreakdown(entries, currentYear);
    
    return {
      monthlyProgress: monthlyData,
      categoryBreakdown: categoryData,
      providerBreakdown: providerData,
      learningEffectiveness: this.calculateLearningEffectiveness(entries),
      competencyGaps: this.identifyCompetencyGaps(entries)
    };
  }

  private getMonthlyBreakdown(entries: EnhancedCPDEntry[], year: number) {
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(year, i, 1).toLocaleString('default', { month: 'short' }),
      hours: 0,
      activities: 0
    }));

    entries
      .filter(entry => new Date(entry.date).getFullYear() === year)
      .forEach(entry => {
        const month = new Date(entry.date).getMonth();
        months[month].hours += entry.hours;
        months[month].activities += 1;
      });

    return months;
  }

  private getCategoryBreakdown(entries: EnhancedCPDEntry[], year: number) {
    const categoryMap = new Map<string, { hours: number; activities: number }>();
    
    entries
      .filter(entry => new Date(entry.date).getFullYear() === year)
      .forEach(entry => {
        const current = categoryMap.get(entry.category) || { hours: 0, activities: 0 };
        categoryMap.set(entry.category, {
          hours: current.hours + entry.hours,
          activities: current.activities + 1
        });
      });

    return Array.from(categoryMap.entries()).map(([category, data]) => ({
      category: category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      ...data
    }));
  }

  private getProviderBreakdown(entries: EnhancedCPDEntry[], year: number) {
    const providerMap = new Map<string, { hours: number; activities: number }>();
    
    entries
      .filter(entry => new Date(entry.date).getFullYear() === year)
      .forEach(entry => {
        const current = providerMap.get(entry.provider) || { hours: 0, activities: 0 };
        providerMap.set(entry.provider, {
          hours: current.hours + entry.hours,
          activities: current.activities + 1
        });
      });

    return Array.from(providerMap.entries())
      .map(([provider, data]) => ({ provider, ...data }))
      .sort((a, b) => b.hours - a.hours);
  }

  private calculateLearningEffectiveness(entries: EnhancedCPDEntry[]) {
    // Simple effectiveness calculation based on evidence quality and reflection
    const totalEntries = entries.length;
    const entriesWithEvidence = entries.filter(e => e.evidenceFiles.length > 0).length;
    const entriesWithReflection = entries.filter(e => e.reflectionNotes).length;
    const verifiedEntries = entries.filter(e => e.status === 'verified').length;

    return {
      evidenceRate: Math.round((entriesWithEvidence / totalEntries) * 100),
      reflectionRate: Math.round((entriesWithReflection / totalEntries) * 100),
      verificationRate: Math.round((verifiedEntries / totalEntries) * 100),
      overallEffectiveness: Math.round(((entriesWithEvidence + entriesWithReflection + verifiedEntries) / (totalEntries * 3)) * 100)
    };
  }

  private identifyCompetencyGaps(entries: EnhancedCPDEntry[]) {
    const skillsGained = new Set<string>();
    entries.forEach(entry => {
      entry.skillsGained?.forEach(skill => skillsGained.add(skill));
    });

    // Define key competency areas for electricians
    const keyCompetencies = [
      'EV charging installation',
      'Solar PV systems',
      'Smart home technology',
      'Advanced fault finding',
      'Energy efficiency',
      'Building automation',
      'Power quality analysis',
      'Emergency lighting systems'
    ];

    const gaps = keyCompetencies.filter(competency => !skillsGained.has(competency));
    
    return {
      totalCompetencies: keyCompetencies.length,
      acquiredCompetencies: skillsGained.size,
      identifiedGaps: gaps,
      completionPercentage: Math.round((skillsGained.size / keyCompetencies.length) * 100)
    };
  }
}

export const enhancedCPDService = new EnhancedCPDService();