/**
 * FirecrawlIntegration.js - Core module for UK Electrical Tender & Contract tracking
 * Handles Firecrawl API integration, data processing, and normalization
 */

import { supabase } from "@/integrations/supabase/client";

class FirecrawlIntegration {
  constructor() {
    this.apiKey = null;
    this.rateLimitDelay = 1000; // 1 second between requests (60/min)
    this.maxRetries = 3;
    this.defaultSources = [
      {
        url: 'https://www.contractsfinder.service.gov.uk/Search/Results',
        name: 'Contracts Finder',
        active: true,
        type: 'government'
      },
      {
        url: 'https://www.find-tender.service.gov.uk/Search/Results',
        name: 'Find Tender Service',
        active: true,
        type: 'government'
      },
      {
        url: 'https://ted.europa.eu/en/browse-tenders',
        name: 'TED (Tenders Electronic Daily)',
        active: true,
        type: 'european'
      },
      {
        url: 'https://www.nationalgrideso.com/future-energy/projects',
        name: 'National Grid ESO Projects',
        active: true,
        type: 'utility'
      }
    ];
    
    this.electricalKeywords = [
      'electrical', 'power transmission', 'substation', 'grid reinforcement',
      'renewable energy connection', 'smart grid', 'EV charging infrastructure',
      'LED lighting', 'building management system', 'fire alarm system',
      'emergency lighting', 'switchgear', 'transformer', 'cable installation',
      'HVDC', 'solar installation', 'wind farm connection', 'battery storage'
    ];
  }

  /**
   * Initialize with API key and validate connection
   */
  async initialize(apiKey) {
    if (!this.validateApiKey(apiKey)) {
      throw new Error('Invalid API key format');
    }
    
    this.apiKey = apiKey;
    return await this.testConnection();
  }

  /**
   * Validate API key format (alphanumeric, non-empty)
   */
  validateApiKey(apiKey) {
    return typeof apiKey === 'string' && 
           apiKey.length > 0 && 
           /^[a-zA-Z0-9_-]+$/.test(apiKey);
  }

  /**
   * Test connection to Firecrawl API
   */
  async testConnection() {
    try {
      const { data, error } = await supabase.functions.invoke('test-firecrawl-connection', {
        body: { apiKey: this.apiKey }
      });
      
      if (error) throw error;
      return data.success;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }

  /**
   * Scrape single URL with retry logic
   */
  async scrapeUrl(url, keywords = this.electricalKeywords) {
    let lastError;
    
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const { data, error } = await supabase.functions.invoke('scrape-single-url', {
          body: {
            apiKey: this.apiKey,
            url,
            keywords,
            attempt
          }
        });
        
        if (error) throw error;
        
        // Rate limiting
        await this.delay(this.rateLimitDelay);
        
        return this.normalizeData(data.projects || []);
        
      } catch (error) {
        lastError = error;
        console.warn(`Scrape attempt ${attempt} failed:`, error);
        
        if (attempt < this.maxRetries) {
          // Exponential backoff
          await this.delay(this.rateLimitDelay * Math.pow(2, attempt - 1));
        }
      }
    }
    
    throw lastError;
  }

  /**
   * Crawl multiple URLs in bulk
   */
  async crawlUrls(urls = this.defaultSources, keywords = this.electricalKeywords) {
    try {
      const { data, error } = await supabase.functions.invoke('fetch-projects', {
        body: {
          apiKey: this.apiKey,
          sources: urls.filter(s => s.active),
          keywords
        }
      });
      
      if (error) throw error;
      
      return {
        success: true,
        projects: this.normalizeData(data.projectDetails || []),
        metadata: {
          scrapedCount: data.scrapedProjects,
          insertedCount: data.inserted,
          errors: data.errors
        }
      };
    } catch (error) {
      console.error('Bulk crawl failed:', error);
      return {
        success: false,
        error: error.message,
        projects: []
      };
    }
  }

  /**
   * Replace stale data with fresh data
   */
  async replaceData(existingData, keywords = this.electricalKeywords) {
    try {
      // Get fresh data from all sources
      const crawlResult = await this.crawlUrls(this.defaultSources, keywords);
      
      if (!crawlResult.success) {
        throw new Error(crawlResult.error);
      }
      
      const freshProjects = crawlResult.projects;
      const deduplicatedProjects = this.removeDuplicates(freshProjects);
      
      // Update database with normalized data
      const { data, error } = await supabase.functions.invoke('update-major-projects', {
        body: {
          projects: deduplicatedProjects,
          replaceAll: true
        }
      });
      
      if (error) throw error;
      
      return {
        success: true,
        replacedCount: deduplicatedProjects.length,
        projects: deduplicatedProjects,
        metadata: crawlResult.metadata
      };
      
    } catch (error) {
      console.error('Data replacement failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Schedule periodic refresh
   */
  async scheduleRefresh(intervalHours = 24, keywords = this.electricalKeywords) {
    const intervalMs = intervalHours * 60 * 60 * 1000;
    
    // Store schedule in localStorage for persistence
    const schedule = {
      interval: intervalHours,
      keywords,
      lastRun: null,
      nextRun: Date.now() + intervalMs,
      active: true
    };
    
    localStorage.setItem('firecrawl_schedule', JSON.stringify(schedule));
    
    // Set up interval
    const intervalId = setInterval(async () => {
      try {
        console.log('Running scheduled refresh...');
        const result = await this.replaceData([], keywords);
        
        if (result.success) {
          console.log(`Scheduled refresh completed: ${result.replacedCount} projects updated`);
          
          // Update schedule
          schedule.lastRun = Date.now();
          schedule.nextRun = Date.now() + intervalMs;
          localStorage.setItem('firecrawl_schedule', JSON.stringify(schedule));
          
          // Dispatch custom event for UI updates
          window.dispatchEvent(new CustomEvent('firecrawl-refresh-complete', {
            detail: result
          }));
        }
      } catch (error) {
        console.error('Scheduled refresh failed:', error);
      }
    }, intervalMs);
    
    return intervalId;
  }

  /**
   * Normalize scraped data to match database schema
   */
  normalizeData(projects) {
    return projects.map(project => ({
      title: this.cleanString(project.title || project.snippet || 'Untitled Project'),
      summary: this.cleanString(project.snippet || project.summary || project.title || ''),
      content: this.buildContent(project),
      awarded_to: this.cleanString(project.client || project.awarded_to || 'Unknown Authority'),
      project_value: this.normalizeValue(project.contractValue || project.project_value || 'TBC'),
      location: this.normalizeLocation(project.location || 'UK'),
      status: this.normalizeStatus(project.status || 'active'),
      category: this.normalizeCategory(project.category || this.determineCategoryFromContent(project)),
      electrical_scope: this.determineElectricalScope(project),
      technologies: this.extractTechnologies(project),
      date_awarded: this.normalizeDate(project.startDate || project.date_awarded),
      tender_deadline: this.normalizeDate(project.deadline || project.tender_deadline),
      source_url: project.url || project.source_url,
      external_project_url: project.external_project_url || project.url,
      duration: this.normalizeDuration(project.duration),
      contractor_count: this.estimateContractorCount(project.contractValue || project.project_value)
    }));
  }

  /**
   * Remove duplicates based on title and authority similarity
   */
  removeDuplicates(projects) {
    const seen = new Map();
    
    return projects.filter(project => {
      const key = `${project.title.toLowerCase().substring(0, 50)}-${project.awarded_to.toLowerCase()}`;
      const hash = this.simpleHash(key);
      
      if (seen.has(hash)) {
        // Keep the one with more complete data
        const existing = seen.get(hash);
        if (this.calculateCompleteness(project) > this.calculateCompleteness(existing)) {
          seen.set(hash, project);
          return true;
        }
        return false;
      }
      
      seen.set(hash, project);
      return true;
    });
  }

  /**
   * Helper methods for data normalization
   */
  cleanString(str) {
    return str ? str.trim().replace(/\s+/g, ' ').substring(0, 500) : '';
  }

  normalizeValue(value) {
    if (!value || value === 'TBC') return 'TBC';
    
    // Convert various formats to standard £XM or £XK format
    const cleaned = value.replace(/[,\\s]/g, '');
    const match = cleaned.match(/£?(\d+(?:\.\d+)?)(million|m|thousand|k|billion|b)?/i);
    
    if (match) {
      const num = parseFloat(match[1]);
      const unit = match[2]?.toLowerCase();
      
      if (unit?.includes('b')) return `£${num}B`;
      if (unit?.includes('m')) return `£${num}M`;
      if (unit?.includes('k') || unit?.includes('thousand')) return `£${num}K`;
      if (num > 1000000) return `£${(num / 1000000).toFixed(1)}M`;
      if (num > 1000) return `£${(num / 1000).toFixed(0)}K`;
      return `£${num}`;
    }
    
    return value;
  }

  normalizeLocation(location) {
    if (!location) return 'UK';
    
    // Ensure it ends with UK if it's a UK location
    const cleaned = location.trim();
    return cleaned.includes('UK') ? cleaned : `${cleaned}, UK`;
  }

  normalizeStatus(status) {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('tender') || statusLower.includes('open')) return 'active';
    if (statusLower.includes('award')) return 'awarded';
    if (statusLower.includes('progress')) return 'in_progress';
    if (statusLower.includes('complet')) return 'completed';
    return 'active';
  }

  normalizeCategory(category) {
    if (!category) return 'Infrastructure';
    
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('health')) return 'Healthcare';
    if (categoryLower.includes('transport')) return 'Transport';
    if (categoryLower.includes('education') || categoryLower.includes('school')) return 'Education';
    if (categoryLower.includes('energy') || categoryLower.includes('renewable')) return 'Energy';
    if (categoryLower.includes('tech') || categoryLower.includes('digital')) return 'Technology';
    
    return category;
  }

  normalizeDate(dateStr) {
    if (!dateStr) return null;
    
    try {
      const date = new Date(dateStr);
      return date.toISOString().split('T')[0]; // YYYY-MM-DD format
    } catch {
      return null;
    }
  }

  normalizeDuration(duration) {
    if (!duration) return '18 months';
    
    // Standardize duration format
    const durationLower = duration.toLowerCase();
    if (durationLower.includes('month')) return duration;
    if (durationLower.includes('year')) {
      const years = parseFloat(duration);
      return `${years * 12} months`;
    }
    
    return duration;
  }

  // Additional helper methods
  buildContent(project) {
    const parts = [
      project.summary || project.snippet,
      project.content,
      project.description
    ].filter(Boolean);
    
    return parts.join('\n\n').substring(0, 2000);
  }

  determineCategoryFromContent(project) {
    const content = `${project.title || ''} ${project.summary || ''} ${project.content || ''}`.toLowerCase();
    
    if (content.includes('hospital') || content.includes('health')) return 'Healthcare';
    if (content.includes('transport') || content.includes('railway')) return 'Transport';
    if (content.includes('school') || content.includes('university')) return 'Education';
    if (content.includes('renewable') || content.includes('solar') || content.includes('wind')) return 'Energy';
    
    return 'Infrastructure';
  }

  determineElectricalScope(project) {
    const content = `${project.title || ''} ${project.summary || ''}`.toLowerCase();
    
    if (content.includes('high voltage') || content.includes('transmission')) return 'High Voltage';
    if (content.includes('low voltage') || content.includes('distribution')) return 'Low Voltage';
    if (content.includes('control') || content.includes('automation')) return 'Control Systems';
    if (content.includes('emergency') || content.includes('backup')) return 'Emergency Systems';
    if (content.includes('renewable') || content.includes('solar')) return 'Renewable Energy Systems';
    if (content.includes('data') || content.includes('server')) return 'Data Center Infrastructure';
    
    return 'General Electrical';
  }

  extractTechnologies(project) {
    const content = `${project.title || ''} ${project.summary || ''}`.toLowerCase();
    const technologies = [];
    
    if (content.includes('led')) technologies.push('LED Lighting');
    if (content.includes('smart') || content.includes('bms')) technologies.push('Smart Building Systems');
    if (content.includes('solar') || content.includes('pv')) technologies.push('Solar/PV Systems');
    if (content.includes('battery') || content.includes('storage')) technologies.push('Battery Storage');
    if (content.includes('ev') || content.includes('charging')) technologies.push('EV Charging');
    if (content.includes('fire alarm')) technologies.push('Fire Alarm Systems');
    if (content.includes('security')) technologies.push('Security Systems');
    if (content.includes('hvac')) technologies.push('HVAC Controls');
    
    return technologies.length > 0 ? technologies : ['General Electrical'];
  }

  estimateContractorCount(value) {
    const numValue = parseFloat((value || '').replace(/[£,KMB]/g, ''));
    
    if (value?.includes('B') || numValue > 500) return 30;
    if (value?.includes('M') && numValue > 100) return 20;
    if (value?.includes('M') && numValue > 50) return 15;
    if (value?.includes('M') || numValue > 10) return 10;
    if (numValue > 1) return 8;
    
    return 5;
  }

  calculateCompleteness(project) {
    const fields = ['title', 'summary', 'awarded_to', 'project_value', 'location', 'category'];
    return fields.reduce((score, field) => {
      return score + (project[field] && project[field] !== 'TBC' ? 1 : 0);
    }, 0);
  }

  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Export configuration for backup
   */
  exportConfig() {
    return {
      sources: this.defaultSources,
      keywords: this.electricalKeywords,
      settings: {
        rateLimitDelay: this.rateLimitDelay,
        maxRetries: this.maxRetries
      },
      schedule: JSON.parse(localStorage.getItem('firecrawl_schedule') || '{}')
    };
  }

  /**
   * Import configuration from backup
   */
  importConfig(config) {
    if (config.sources) this.defaultSources = config.sources;
    if (config.keywords) this.electricalKeywords = config.keywords;
    if (config.settings) {
      this.rateLimitDelay = config.settings.rateLimitDelay || this.rateLimitDelay;
      this.maxRetries = config.settings.maxRetries || this.maxRetries;
    }
    if (config.schedule) {
      localStorage.setItem('firecrawl_schedule', JSON.stringify(config.schedule));
    }
  }
}

// Export singleton instance
export const firecrawlIntegration = new FirecrawlIntegration();
export default FirecrawlIntegration;
