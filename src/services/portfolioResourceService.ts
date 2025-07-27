import { PortfolioResource } from '@/data/portfolioResources';
import { toast } from 'sonner';

export class PortfolioResourceService {
  /**
   * Simulates downloading a resource file
   * In a real implementation, this would handle actual file downloads
   */
  static async downloadResource(resource: PortfolioResource): Promise<void> {
    try {
      // Simulate download delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock blob for demonstration
      const content = this.generateMockFileContent(resource);
      const blob = new Blob([content], { type: this.getMimeType(resource.fileType) });
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resource.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${resource.fileType}`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
      
      toast.success(`Downloaded: ${resource.title}`);
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download resource');
    }
  }

  /**
   * Opens a resource in a new tab/window
   */
  static openResource(resource: PortfolioResource): void {
    if (resource.externalUrl) {
      window.open(resource.externalUrl, '_blank');
    } else {
      // For demo purposes, show a message about the resource
      toast.info(`Opening: ${resource.title}`);
    }
  }

  /**
   * Gets the appropriate MIME type for a file extension
   */
  private static getMimeType(fileType: string): string {
    const mimeTypes: Record<string, string> = {
      'pdf': 'application/pdf',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'mp4': 'video/mp4',
      'html': 'text/html'
    };
    
    return mimeTypes[fileType] || 'application/octet-stream';
  }

  /**
   * Generates mock file content for demonstration
   */
  private static generateMockFileContent(resource: PortfolioResource): string {
    if (resource.fileType === 'pdf') {
      return `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(${resource.title}) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
0000000367 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
444
%%EOF`;
    } else if (resource.fileType === 'html') {
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resource.title}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
        .provider { color: #6b7280; font-size: 14px; margin-bottom: 20px; }
        .content { background: #f9fafb; padding: 20px; border-radius: 8px; }
    </style>
</head>
<body>
    <h1>${resource.title}</h1>
    <div class="provider">Provided by: ${resource.provider}</div>
    <div class="content">
        <p>${resource.description}</p>
        <p>This is a comprehensive resource covering all aspects of the topic. In a real implementation, this would contain the full content of the resource.</p>
        <h2>Key Topics Covered:</h2>
        <ul>
            ${resource.tags.map(tag => `<li>${tag}</li>`).join('')}
        </ul>
        <p><strong>Difficulty Level:</strong> ${resource.difficulty}</p>
        <p><strong>Estimated Reading Time:</strong> ${resource.estimatedTime}</p>
        <p><strong>Last Updated:</strong> ${resource.lastUpdated}</p>
    </div>
</body>
</html>`;
    } else {
      return `${resource.title}

${resource.description}

Provider: ${resource.provider}
Type: ${resource.type}
Category: ${resource.category}
Difficulty: ${resource.difficulty}
Estimated Time: ${resource.estimatedTime}
Last Updated: ${resource.lastUpdated}

Tags: ${resource.tags.join(', ')}

This is a mock ${resource.fileType.toUpperCase()} file for demonstration purposes. 
In a real implementation, this would contain the actual resource content.`;
    }
  }

  /**
   * Tracks resource usage for analytics
   */
  static trackResourceUsage(resource: PortfolioResource, action: 'view' | 'download' | 'open'): void {
    // In a real implementation, this would send analytics data to a service
    console.log(`Resource ${action}:`, {
      resourceId: resource.id,
      title: resource.title,
      provider: resource.provider,
      action,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Gets resource statistics
   */
  static getResourceStats(resources: PortfolioResource[]) {
    const totalResources = resources.length;
    const providerStats = resources.reduce((acc, resource) => {
      acc[resource.provider] = (acc[resource.provider] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const typeStats = resources.reduce((acc, resource) => {
      acc[resource.type] = (acc[resource.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const newResources = resources.filter(r => r.isNew).length;
    const premiumResources = resources.filter(r => r.isPremium).length;

    return {
      totalResources,
      providerStats,
      typeStats,
      newResources,
      premiumResources
    };
  }
}