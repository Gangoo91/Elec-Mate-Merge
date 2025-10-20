/**
 * Generates professional HTML template for Maintenance Instructions PDF
 * Maps agent output to structured HTML with signatures embedded
 */

export interface MaintenanceSignatures {
  technician: {
    name: string;
    date: string;
    signatureDataUrl: string;
  };
  supervisor: {
    name: string;
    date: string;
    signatureDataUrl: string;
  };
}

export interface MaintenanceTemplateData {
  jobReference?: string;
  dateIssued: string;
  taskDescription: string;
  location: string;
  estimatedDuration: string;
  responsiblePerson?: string;
  equipmentType: string;
  maintenanceType: string;
  steps: Array<{
    stepNumber: number;
    title: string;
    description: string;
    riskLevel?: 'low' | 'medium' | 'high';
    compliance?: string;
    timeEstimate?: string;
  }>;
  preWorkChecklist: string[];
  testingTable?: Array<{
    testName: string;
    expectedValue: string;
    passFailCriteria: string;
  }>;
  commonFaults?: Array<{
    symptom: string;
    diagnosis: string;
    remedy: string;
  }>;
  signatures?: MaintenanceSignatures;
}

export const generateMaintenanceHTML = (data: MaintenanceTemplateData): string => {
  const getRiskBadgeClass = (level?: string) => {
    switch (level) {
      case 'high': return 'risk-high';
      case 'medium': return 'risk-medium';
      default: return 'risk-low';
    }
  };

  const getRiskBadgeText = (level?: string) => {
    switch (level) {
      case 'high': return 'HIGH RISK';
      case 'medium': return 'MEDIUM RISK';
      default: return 'LOW RISK';
    }
  };

  return `
<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maintenance Instruction - ${data.equipmentType}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #2c3e50;
            background: white;
            padding: 40px;
            max-width: 210mm;
            margin: 0 auto;
        }
        .header {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
            padding: 30px;
            margin-bottom: 30px;
            border-radius: 8px;
        }
        .header h1 { font-size: 28px; font-weight: 600; margin-bottom: 8px; }
        .header .subtitle { font-size: 14px; opacity: 0.9; }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-bottom: 30px;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            border-left: 4px solid #2a5298;
        }
        .info-item { display: flex; flex-direction: column; }
        .info-label {
            font-size: 11px;
            font-weight: 600;
            color: #6c757d;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }
        .info-value { font-size: 14px; font-weight: 500; color: #2c3e50; }
        .section {
            margin-bottom: 35px;
            page-break-inside: avoid;
        }
        .section-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e9ecef;
        }
        .section-number {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
            width: 36px;
            height: 36px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 16px;
            margin-right: 15px;
        }
        .section-title { font-size: 20px; font-weight: 600; color: #1e3c72; }
        .checklist {
            background: white;
            border: 1px solid #e9ecef;
            border-radius: 6px;
            overflow: hidden;
        }
        .checklist-item {
            padding: 15px 20px;
            border-bottom: 1px solid #e9ecef;
            display: flex;
            align-items: flex-start;
        }
        .checklist-item:last-child { border-bottom: none; }
        .checklist-item:nth-child(even) { background: #f8f9fa; }
        .checkbox {
            width: 20px;
            height: 20px;
            border: 2px solid #6c757d;
            border-radius: 4px;
            margin-right: 15px;
            flex-shrink: 0;
            margin-top: 2px;
        }
        .checklist-text { flex: 1; font-size: 14px; line-height: 1.6; }
        .step {
            background: white;
            border: 1px solid #e9ecef;
            border-radius: 6px;
            padding: 20px;
            margin-bottom: 15px;
        }
        .step-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            margin-bottom: 12px;
        }
        .step-number {
            display: inline-block;
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 14px;
            margin-right: 10px;
            vertical-align: middle;
        }
        .risk-badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .risk-low { background: #d4edda; color: #155724; }
        .risk-medium { background: #fff3cd; color: #856404; }
        .risk-high { background: #f8d7da; color: #721c24; }
        .step-title { font-size: 16px; font-weight: 600; color: #1e3c72; display: inline; }
        .step-description {
            font-size: 14px;
            color: #495057;
            line-height: 1.7;
            margin-bottom: 10px;
        }
        .step-compliance {
            background: #f0f8ff;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            color: #004085;
            margin-top: 10px;
        }
        .test-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            font-size: 13px;
        }
        .test-table th {
            background: #1e3c72;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
        }
        .test-table td {
            padding: 12px;
            border: 1px solid #e9ecef;
            background: white;
        }
        .test-table tr:nth-child(even) td { background: #f8f9fa; }
        .fault-diagnosis {
            background: white;
            border: 1px solid #e9ecef;
            border-radius: 6px;
            margin-bottom: 20px;
            overflow: hidden;
        }
        .fault-header {
            background: #dc3545;
            color: white;
            padding: 12px 15px;
            font-weight: 600;
            font-size: 14px;
        }
        .fault-body { padding: 15px; }
        .fault-flow {
            display: grid;
            grid-template-columns: 1fr auto 1fr auto 1fr;
            gap: 10px;
            align-items: center;
            font-size: 13px;
        }
        .fault-arrow { color: #6c757d; font-weight: 700; font-size: 18px; }
        .fault-box { padding: 10px; border-radius: 4px; text-align: center; }
        .symptom-box { background: #f8d7da; border: 1px solid #dc3545; }
        .diagnosis-box { background: #fff3cd; border: 1px solid #ffc107; }
        .remedy-box { background: #d4edda; border: 1px solid #28a745; }
        .sign-off {
            margin-top: 40px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
            page-break-inside: avoid;
        }
        .sign-box {
            border: 2px solid #e9ecef;
            border-radius: 6px;
            padding: 20px;
        }
        .sign-label {
            font-size: 12px;
            font-weight: 600;
            color: #6c757d;
            text-transform: uppercase;
            margin-bottom: 15px;
            letter-spacing: 0.5px;
        }
        .sign-signature {
            border: 2px solid #dee2e6;
            border-radius: 4px;
            margin-bottom: 10px;
            height: 100px;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .sign-signature img {
            max-width: 100%;
            max-height: 100%;
        }
        .sign-field {
            font-size: 12px;
            color: #495057;
            margin-bottom: 8px;
        }
        .sign-field strong { color: #2c3e50; }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e9ecef;
            text-align: center;
            font-size: 11px;
            color: #6c757d;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>MAINTENANCE INSTRUCTION</h1>
        <div class="subtitle">Professional Electrical Maintenance Documentation - BS 7671:2018+A3:2024 Compliant</div>
    </div>

    <div class="info-grid">
        <div class="info-item">
            <div class="info-label">Job Reference</div>
            <div class="info-value">${data.jobReference || 'MI-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0')}</div>
        </div>
        <div class="info-item">
            <div class="info-label">Date Issued</div>
            <div class="info-value">${data.dateIssued}</div>
        </div>
        <div class="info-item">
            <div class="info-label">Task Description</div>
            <div class="info-value">${data.taskDescription}</div>
        </div>
        <div class="info-item">
            <div class="info-label">Location</div>
            <div class="info-value">${data.location || 'As specified on site'}</div>
        </div>
        <div class="info-item">
            <div class="info-label">Estimated Duration</div>
            <div class="info-value">${data.estimatedDuration}</div>
        </div>
        <div class="info-item">
            <div class="info-label">Equipment Type</div>
            <div class="info-value">${data.equipmentType}</div>
        </div>
    </div>

    ${data.preWorkChecklist?.length ? `
    <div class="section">
        <div class="section-header">
            <div class="section-number">1</div>
            <div class="section-title">Pre-Work Requirements</div>
        </div>
        <div class="checklist">
            ${data.preWorkChecklist.map(item => `
                <div class="checklist-item">
                    <div class="checkbox"></div>
                    <div class="checklist-text">${item}</div>
                </div>
            `).join('')}
        </div>
    </div>
    ` : ''}

    <div class="section">
        <div class="section-header">
            <div class="section-number">2</div>
            <div class="section-title">Work Steps & Procedures</div>
        </div>

        ${data.steps.map(step => `
            <div class="step">
                <div class="step-header">
                    <div class="step-left">
                        <div class="step-number">${step.stepNumber}</div>
                        <h3 class="step-title">${step.title}</h3>
                        <span class="risk-badge ${getRiskBadgeClass(step.riskLevel)}">${getRiskBadgeText(step.riskLevel)}</span>
                    </div>
                </div>
                <div class="step-description">${step.description}</div>
                ${step.compliance ? `
                    <div class="step-compliance">
                        <strong>BS 7671:</strong> ${step.compliance}
                    </div>
                ` : ''}
                ${step.timeEstimate ? `
                    <div style="margin-top: 10px; font-size: 12px; color: #6c757d;">
                        ⏱ Time: ${step.timeEstimate}
                    </div>
                ` : ''}
            </div>
        `).join('')}
    </div>

    ${data.testingTable?.length ? `
    <div class="section">
        <div class="section-header">
            <div class="section-number">3</div>
            <div class="section-title">Testing Requirements</div>
        </div>
        <table class="test-table">
            <thead>
                <tr>
                    <th>Test Name</th>
                    <th>Expected Value</th>
                    <th>Pass/Fail Criteria</th>
                    <th>Actual Reading</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
                ${data.testingTable.map(test => `
                    <tr>
                        <td>${test.testName}</td>
                        <td>${test.expectedValue}</td>
                        <td>${test.passFailCriteria}</td>
                        <td>_____________</td>
                        <td>_____________</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>
    ` : ''}

    ${data.commonFaults?.length ? `
    <div class="section">
        <div class="section-header">
            <div class="section-number">4</div>
            <div class="section-title">Common Faults & Troubleshooting</div>
        </div>
        ${data.commonFaults.map((fault, idx) => `
            <div class="fault-diagnosis">
                <div class="fault-header">Fault Scenario ${idx + 1}: ${fault.symptom}</div>
                <div class="fault-body">
                    <div class="fault-flow">
                        <div class="fault-box symptom-box">
                            <strong>Symptom</strong><br>${fault.symptom}
                        </div>
                        <div class="fault-arrow">→</div>
                        <div class="fault-box diagnosis-box">
                            <strong>Diagnosis</strong><br>${fault.diagnosis}
                        </div>
                        <div class="fault-arrow">→</div>
                        <div class="fault-box remedy-box">
                            <strong>Remedy</strong><br>${fault.remedy}
                        </div>
                    </div>
                </div>
            </div>
        `).join('')}
    </div>
    ` : ''}

    ${data.signatures ? `
    <div class="section">
        <div class="section-header">
            <div class="section-number">5</div>
            <div class="section-title">Sign-Off & Completion</div>
        </div>
        <div class="sign-off">
            <div class="sign-box">
                <div class="sign-label">Work Completed By (Technician)</div>
                <div class="sign-signature">
                    ${data.signatures.technician.signatureDataUrl ? 
                        `<img src="${data.signatures.technician.signatureDataUrl}" alt="Technician Signature" />` :
                        '<span style="color: #6c757d;">No signature</span>'
                    }
                </div>
                <div class="sign-field"><strong>Name:</strong> ${data.signatures.technician.name || '_________________________'}</div>
                <div class="sign-field"><strong>Date:</strong> ${data.signatures.technician.date || '_________________________'}</div>
                <div class="sign-field" style="font-size: 10px; color: #6c757d; margin-top: 10px;">
                    Digitally signed on ${new Date().toLocaleString('en-GB')}
                </div>
            </div>
            <div class="sign-box">
                <div class="sign-label">Verified & Approved By (Supervisor/AP)</div>
                <div class="sign-signature">
                    ${data.signatures.supervisor.signatureDataUrl ? 
                        `<img src="${data.signatures.supervisor.signatureDataUrl}" alt="Supervisor Signature" />` :
                        '<span style="color: #6c757d;">No signature</span>'
                    }
                </div>
                <div class="sign-field"><strong>Name:</strong> ${data.signatures.supervisor.name || '_________________________'}</div>
                <div class="sign-field"><strong>Date:</strong> ${data.signatures.supervisor.date || '_________________________'}</div>
                <div class="sign-field" style="font-size: 10px; color: #6c757d; margin-top: 10px;">
                    Digitally signed on ${new Date().toLocaleString('en-GB')}
                </div>
            </div>
        </div>
    </div>
    ` : ''}

    <div class="footer">
        <p>This maintenance instruction was generated in accordance with BS 7671:2018+A3:2024</p>
        <p style="margin-top: 5px;">Document generated: ${new Date().toLocaleString('en-GB')}</p>
    </div>
</body>
</html>
  `.trim();
};
