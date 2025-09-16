import { 
  EnhancedCPDEntry, 
  CPDSettings, 
  ProfessionalBodyRequirement, 
  ComplianceAnalysis,
  CPDReminder,
  EvidenceFile,
  CPDCategory
} from '@/types/cpd-enhanced';

class EnhancedCPDService {
  private readonly ENTRIES_KEY = 'enhanced_cpd_entries';
  private readonly SETTINGS_KEY = 'cpd_settings';
  private readonly REMINDERS_KEY = 'cpd_reminders';

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
    const entries = this.getEntries();
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
  uploadEvidence(entryId: string, file: File, type: string): Promise<EvidenceFile> {
    return new Promise((resolve) => {
      // Simulate file upload and OCR processing
      const evidenceFile: EvidenceFile = {
        id: crypto.randomUUID(),
        type: type as any,
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
        uploadDate: new Date().toISOString(),
        verified: false,
        extractedData: this.simulateOCRExtraction(file.name)
      };

      // In real implementation, this would upload to cloud storage
      // and perform actual OCR processing
      
      setTimeout(() => resolve(evidenceFile), 1000);
    });
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
  getEntries(): EnhancedCPDEntry[] {
    const stored = localStorage.getItem(this.ENTRIES_KEY);
    return stored ? JSON.parse(stored) : this.getDefaultEntries();
  }

  saveEntry(entry: Omit<EnhancedCPDEntry, 'id' | 'createdAt' | 'updatedAt'>): EnhancedCPDEntry {
    const entries = this.getEntries();
    const newEntry: EnhancedCPDEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    entries.push(newEntry);
    this.saveEntries(entries);
    return newEntry;
  }

  private saveEntries(entries: EnhancedCPDEntry[]): void {
    localStorage.setItem(this.ENTRIES_KEY, JSON.stringify(entries));
  }

  // Settings Management
  getSettings(): CPDSettings {
    const stored = localStorage.getItem(this.SETTINGS_KEY);
    return stored ? JSON.parse(stored) : this.getDefaultSettings();
  }

  saveSettings(settings: CPDSettings): void {
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
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