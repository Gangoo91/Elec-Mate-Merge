import html2pdf from 'html2pdf.js';
import { InstallPlanDataV2, CalculationResult } from '@/components/install-planner-v2/types';

// Generate QR code as data URL
const generateQRCode = async (text: string): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const size = 120;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Simple QR placeholder - draw a bordered box with text
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);
      ctx.strokeStyle = '#003087';
      ctx.lineWidth = 3;
      ctx.strokeRect(0, 0, size, size);
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Wrap text
      const words = text.match(/.{1,8}/g) || [text];
      const lineHeight = 14;
      const startY = (size - words.length * lineHeight) / 2;
      
      words.forEach((word, i) => {
        ctx.fillText(word, size / 2, startY + i * lineHeight + lineHeight / 2);
      });
    }
    
    resolve(canvas.toDataURL());
  });
};

export const generatePlanReference = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  return `IP-${year}-${randomNum}`;
};

const formatDate = (date?: string | Date): string => {
  if (!date) {
    return new Date().toLocaleDateString('en-GB');
  }
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-GB');
};

const getCableTypeName = (cableType: string): string => {
  const names: Record<string, string> = {
    'pvc-single': 'FP200 Gold Fire Rated',
    'xlpe-single': 'XLPE Single Core (90°C)',
    'pvc-twin-earth': 'PVC Twin & Earth',
    'xlpe-twin-earth': 'XLPE Twin & Earth (90°C)',
    'swa': 'SWA Armoured Cable',
    'micc': 'Mineral Insulated (MICC)',
    'aluminium-xlpe': 'Aluminium XLPE'
  };
  return names[cableType] || cableType;
};

const getLocationName = (location?: string): string => {
  const names: Record<string, string> = {
    'inside': 'Inside building',
    'outside': 'External',
    'underground': 'Underground',
    'loft': 'Loft space',
    'plant-room': 'Plant room',
    'data-center': 'Data centre'
  };
  return location ? names[location] || location : 'Inside building';
};

export const generateInstallationPlanPDF = async (
  planData: InstallPlanDataV2,
  result: CalculationResult,
  companyLogo?: string
): Promise<void> => {
  const planReference = planData.projectInfo?.planReference || generatePlanReference();
  const designCurrent = (planData.totalLoad / planData.voltage).toFixed(1);
  const cableTypeName = getCableTypeName(planData.cableType);
  const locationName = getLocationName(planData.location);
  
  // Generate QR code for plan reference
  const qrCodeDataUrl = await generateQRCode(planReference);
  
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Electrical Installation Plan - ${planReference}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10pt;
            line-height: 1.3;
            color: #333;
            background: white;
        }
        
        .page {
            width: 210mm;
            min-height: 297mm;
            padding: 10mm;
            margin: 0 auto;
            background: white;
            position: relative;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
            padding-bottom: 8px;
            border-bottom: 3px solid #003087;
        }
        
        .logo-placeholder {
            width: 120px;
            height: 45px;
            border: 2px dashed #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 8pt;
            color: #999;
        }
        
        .header-right {
            text-align: right;
        }
        
        .compliance-badge {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 3px;
            font-weight: bold;
            font-size: 9pt;
            margin-bottom: 6px;
        }
        
        .compliance-badge.compliant {
            background: #28a745;
            color: white;
        }
        
        .compliance-badge.non-compliant {
            background: #dc3545;
            color: white;
        }
        
        .plan-reference {
            font-size: 9pt;
            color: #666;
            margin-bottom: 2px;
        }
        
        .main-title {
            background: linear-gradient(135deg, #003087 0%, #0052cc 100%);
            color: white;
            padding: 10px 15px;
            margin-bottom: 10px;
            border-radius: 4px;
        }
        
        .main-title h1 {
            font-size: 15pt;
            margin-bottom: 3px;
        }
        
        .main-title .subtitle {
            font-size: 9pt;
            opacity: 0.9;
        }
        
        .section {
            margin-bottom: 12px;
        }
        
        .section-title {
            font-size: 12pt;
            font-weight: bold;
            color: #003087;
            margin-bottom: 8px;
            padding-bottom: 3px;
            border-bottom: 2px solid #ffd700;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px 20px;
            margin-bottom: 10px;
        }
        
        .info-item {
            display: flex;
            align-items: center;
        }
        
        .info-label {
            font-weight: bold;
            min-width: 140px;
            color: #555;
            font-size: 10pt;
        }
        
        .info-value {
            color: #000;
            flex: 1;
            font-size: 10pt;
        }
        
        .calculation-box {
            background: #f8f9fa;
            border-left: 4px solid #003087;
            padding: 8px;
            margin-bottom: 10px;
        }
        
        .calculation-box h3 {
            font-size: 10pt;
            color: #003087;
            margin-bottom: 5px;
        }
        
        .calc-row {
            margin-bottom: 4px;
            font-size: 9pt;
        }
        
        .calc-formula {
            background: white;
            padding: 5px;
            margin: 5px 0;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 9pt;
        }
        
        .disclaimer-box {
            background: #fff3cd;
            border: 2px solid #856404;
            border-left: 5px solid #856404;
            padding: 10px;
            margin-bottom: 10px;
        }
        
        .disclaimer-box h3 {
            color: #856404;
            margin-bottom: 6px;
            font-size: 11pt;
            font-weight: bold;
        }
        
        .disclaimer-box p {
            color: #856404;
            margin-bottom: 5px;
            font-size: 9pt;
            line-height: 1.3;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }
        
        th {
            background: #003087;
            color: white;
            padding: 5px;
            text-align: left;
            font-size: 9pt;
        }
        
        td {
            border: 1px solid #ddd;
            padding: 5px;
            font-size: 9pt;
        }
        
        tr:nth-child(even) {
            background: #f8f9fa;
        }
        
        .text-right {
            text-align: right;
        }
        
        .cost-summary {
            background: #f8f9fa;
            border: 2px solid #003087;
            padding: 10px;
            margin-top: 10px;
        }
        
        .cost-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            font-size: 10pt;
        }
        
        .cost-row.total {
            border-top: 2px solid #003087;
            padding-top: 6px;
            margin-top: 6px;
            font-size: 11pt;
            font-weight: bold;
        }
        
        .warning-box {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 8px;
            margin-bottom: 10px;
        }
        
        .warning-box h3 {
            color: #856404;
            margin-bottom: 5px;
            font-size: 10pt;
        }
        
        .warning-box ul {
            margin-left: 20px;
        }
        
        .warning-box li {
            color: #856404;
            margin-bottom: 3px;
            font-size: 9pt;
        }
        
        .recommendation-box {
            background: #d1ecf1;
            border-left: 4px solid #0c5460;
            padding: 8px;
            margin-bottom: 10px;
        }
        
        .recommendation-box h3 {
            color: #0c5460;
            margin-bottom: 5px;
            font-size: 10pt;
        }
        
        .recommendation-box ul {
            margin-left: 20px;
        }
        
        .recommendation-box li {
            color: #0c5460;
            margin-bottom: 3px;
            font-size: 9pt;
        }
        
        .guidance-item {
            margin-bottom: 10px;
        }
        
        .guidance-title {
            font-weight: bold;
            color: #003087;
            margin-bottom: 4px;
            font-size: 10pt;
        }
        
        .guidance-item ul {
            margin-left: 20px;
        }
        
        .guidance-item li {
            margin-bottom: 3px;
            font-size: 9pt;
        }
        
        .footer {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-top: 2px solid #003087;
            font-size: 8pt;
            color: #666;
        }
        
        .footer-center {
            flex: 1;
            text-align: center;
            font-weight: bold;
            color: #003087;
        }
        
        .qr-code {
            width: 50px;
            height: 50px;
            border: 1px solid #ccc;
        }
        
        .protective-device-section {
            margin-top: 12px;
            padding-top: 10px;
            border-top: 1px solid #e0e0e0;
        }

        @media print {
            .page {
                margin: 0;
                padding: 12mm;
            }
        }
    </style>
</head>
<body>
    <div class="page">
        <div class="header">
            <div class="logo-placeholder">${companyLogo ? `<img src="${companyLogo}" style="max-width: 100%; max-height: 100%;" />` : 'Company Logo'}</div>
            <div class="header-right">
                <div class="compliance-badge ${result.compliant ? 'compliant' : 'non-compliant'}">
                    ${result.compliant ? '✓ BS 7671 COMPLIANT' : '✗ NON-COMPLIANT'}
                </div>
                <div class="plan-reference">Reference: ${planReference}</div>
                <div class="plan-reference">Date: ${formatDate()}</div>
            </div>
        </div>

        <div class="disclaimer-box">
            <h3>⚠️ Important Disclaimer</h3>
            <p><strong>This installation plan is for guidance purposes only.</strong> All calculations and recommendations must be verified by a qualified electrician before any work commences. This document does not replace professional assessment or certification.</p>
            <p>The installer is responsible for ensuring compliance with BS 7671:2018+A3:2024, Building Regulations Part P, and all relevant legislation. Electrical installation work must only be carried out by competent persons registered with an appropriate scheme (NICEIC, NAPIT, ELECSA, etc.).</p>
        </div>

        <div class="main-title">
            <h1>Electrical Installation Plan</h1>
            <div class="subtitle">${planData.installationType.charAt(0).toUpperCase() + planData.installationType.slice(1)} Installation - ${planData.loadType}</div>
        </div>

        <div class="section">
            <h2 class="section-title">Installation Details</h2>
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">Installation Type:</span>
                    <span class="info-value">${planData.installationType.charAt(0).toUpperCase() + planData.installationType.slice(1)}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Load Type:</span>
                    <span class="info-value">${planData.loadType}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Total Load:</span>
                    <span class="info-value">${planData.totalLoad} W</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Design Current:</span>
                    <span class="info-value">${designCurrent} A</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Supply Voltage:</span>
                    <span class="info-value">${planData.voltage} V</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Phases:</span>
                    <span class="info-value">${planData.phases === 'single' ? 'Single Phase' : 'Three Phase'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Earthing System:</span>
                    <span class="info-value">${planData.environmentalProfile.finalApplied.earthing}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Ze:</span>
                    <span class="info-value">${planData.environmentalProfile.finalApplied.ze} Ω</span>
                </div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">Cable Design & Calculations</h2>
            
            <div class="calculation-box">
                <h3>Design Current Calculation</h3>
                <div class="calc-formula">
                    Ib = P / V = ${planData.totalLoad}W / ${planData.voltage}V = ${designCurrent} A
                </div>
            </div>

            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">Cable Length:</span>
                    <span class="info-value">${planData.cableLength} m</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Installation Method:</span>
                    <span class="info-value">${planData.installationMethod}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Cable Location:</span>
                    <span class="info-value">${locationName}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Cable Type:</span>
                    <span class="info-value">${cableTypeName}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Cable Size:</span>
                    <span class="info-value">${result.recommendedCableSize} mm²</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Base Capacity:</span>
                    <span class="info-value">${result.capacity} A</span>
                </div>
            </div>

            <div class="calculation-box">
                <h3>Derating Factors</h3>
                <div class="calc-row"><strong>Ambient Temperature:</strong> ${planData.environmentalProfile.finalApplied.ambientTemp}°C → Factor: ${result.factors.temperature}</div>
                <div class="calc-row"><strong>Grouping:</strong> ${planData.environmentalProfile.finalApplied.grouping} cable(s) → Factor: ${result.factors.grouping}</div>
                <div class="calc-row"><strong>Overall Derating Factor:</strong> ${result.factors.overall.toFixed(2)}</div>
                <div class="calc-formula">
                    Derated Capacity = ${result.capacity}A × ${result.factors.overall.toFixed(2)} = ${result.deratedCapacity.toFixed(1)} A
                </div>
            </div>

            <div class="calculation-box">
                <h3>Voltage Drop</h3>
                <div class="calc-row"><strong>Voltage Drop:</strong> ${result.voltageDrop.toFixed(2)} V</div>
                <div class="calc-row"><strong>Percentage:</strong> ${result.voltageDropPercent.toFixed(2)}%</div>
                <div class="calc-row"><strong>Maximum Permitted:</strong> 5.0% (BS 7671)</div>
                <div class="calc-row" style="color: ${result.voltageDropPercent <= 5 ? '#28a745' : '#dc3545'}; font-weight: bold;">
                    ${result.voltageDropPercent <= 5 ? '✓ Within acceptable limits' : '✗ Exceeds acceptable limits'}
                </div>
            </div>

            <div class="info-grid protective-device-section">
                <div class="info-item">
                    <span class="info-label">Protective Device:</span>
                    <span class="info-value">${result.protectiveDevice}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Zs (Loop Impedance):</span>
                    <span class="info-value">${result.zs.toFixed(3)} Ω</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Safety Margin:</span>
                    <span class="info-value">${result.safetyMargin.toFixed(1)}%</span>
                </div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">Materials & Components</h2>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Specification</th>
                        <th>Qty</th>
                        <th class="text-right">Unit Cost</th>
                        <th class="text-right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${result.materials.map(material => `
                    <tr>
                        <td>${material.name}</td>
                        <td>${material.specification}</td>
                        <td>${material.quantity}</td>
                        <td class="text-right">${material.unitCost ? `£${material.unitCost.toFixed(2)}` : '-'}</td>
                        <td class="text-right">${material.totalCost ? `£${material.totalCost.toFixed(2)}` : '-'}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>

            <div class="cost-summary">
                <div class="cost-row">
                    <span>Materials Cost:</span>
                    <span>£${result.costEstimate.materials.toFixed(2)}</span>
                </div>
                <div class="cost-row">
                    <span>Labour Cost (@ £45/hr):</span>
                    <span>£${result.costEstimate.labour.toFixed(2)}</span>
                </div>
                <div class="cost-row">
                    <span>Subtotal:</span>
                    <span>£${result.costEstimate.total.toFixed(2)}</span>
                </div>
                <div class="cost-row">
                    <span>VAT (20%):</span>
                    <span>£${(result.costEstimate.total * 0.2).toFixed(2)}</span>
                </div>
                <div class="cost-row total">
                    <span>TOTAL:</span>
                    <span>£${(result.costEstimate.total * 1.2).toFixed(2)}</span>
                </div>
            </div>
        </div>

        ${result.warnings.length > 0 ? `
        <div class="warning-box">
            <h3>⚠️ Important Warnings</h3>
            <ul>
                ${result.warnings.map(warning => `<li>${warning}</li>`).join('')}
            </ul>
        </div>
        ` : ''}

        ${result.recommendations.length > 0 ? `
        <div class="recommendation-box">
            <h3>💡 Recommendations</h3>
            <ul>
                ${result.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
        ` : ''}

        <div class="section">
            <h2 class="section-title">Practical Installation Guidance</h2>
            ${result.practicalGuidance.map(guide => `
            <div class="guidance-item">
                <div class="guidance-title">${guide.title}</div>
                <ul>
                    ${guide.points.map(point => `<li>${point}</li>`).join('')}
                </ul>
            </div>
            `).join('')}
        </div>

        <div class="section">
            <h2 class="section-title">Site Information</h2>
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">Property Address:</span>
                    <span class="info-value">${planData.siteInfo?.propertyAddress || '_________________________________'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Postcode:</span>
                    <span class="info-value">${planData.siteInfo?.postcode || '_________________________________'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Client Name:</span>
                    <span class="info-value">${planData.siteInfo?.clientName || '_________________________________'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Contact Number:</span>
                    <span class="info-value">${planData.siteInfo?.contactNumber || '_________________________________'}</span>
                </div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">Regulatory References</h2>
            <div class="calculation-box">
                <div class="calc-row"><strong>BS 7671:2018+A3:2024</strong> - Requirements for Electrical Installations (18th Edition)</div>
                <div class="calc-row"><strong>Building Regulations Part P</strong> - Electrical safety in dwellings</div>
                <div class="calc-row"><strong>IET Wiring Regulations</strong> - Design and verification compliance</div>
                <div class="calc-row"><strong>BS 6004</strong> - PVC insulated cables specification</div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">Install Planner</h2>
            <div style="background: #f8f9fa; padding: 15px; border: 2px solid #003087;">
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Planned Start Date:</span>
                        <span class="info-value">${planData.projectInfo?.plannedStartDate ? formatDate(planData.projectInfo.plannedStartDate) : '_________________________________'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Estimated Duration:</span>
                        <span class="info-value">${planData.projectInfo?.estimatedDuration || '_________________________________'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Lead Electrician:</span>
                        <span class="info-value">${planData.projectInfo?.leadElectrician || '_________________________________'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Registration Number:</span>
                        <span class="info-value">${planData.projectInfo?.registrationNumber || '_________________________________'}</span>
                    </div>
                </div>
                
                <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ccc;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                        <div>
                            <div style="margin-bottom: 8px; font-weight: bold; color: #003087; font-size: 10pt;">Client Approval:</div>
                            <div style="margin-bottom: 5px; font-size: 9pt;">Signature: _______________________________</div>
                            <div style="margin-bottom: 5px; font-size: 9pt;">Print Name: _______________________________</div>
                            <div style="font-size: 9pt;">Date: _______________________________</div>
                        </div>
                        <div>
                            <div style="margin-bottom: 8px; font-weight: bold; color: #003087; font-size: 10pt;">Electrician Confirmation:</div>
                            <div style="margin-bottom: 5px; font-size: 9pt;">Signature: _______________________________</div>
                            <div style="margin-bottom: 5px; font-size: 9pt;">Print Name: _______________________________</div>
                            <div style="font-size: 9pt;">Date: _______________________________</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
            <div style="flex: 1;">
                <div style="font-weight: bold; margin-bottom: 2px;">Electrical Installation Plan ${planReference}</div>
                <div>Generated: ${formatDate()} | Controlled document - Verify before use</div>
            </div>
            <div class="footer-center">Page 1</div>
            <div style="text-align: right;">
                <img src="${qrCodeDataUrl}" alt="Plan Reference QR" class="qr-code" />
            </div>
        </div>
    </div>
</body>
</html>
  `;

  const options = {
    margin: 0,
    filename: `Installation_Plan_${planReference}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait'
    }
  };

  await html2pdf().set(options).from(htmlContent).save();
};
