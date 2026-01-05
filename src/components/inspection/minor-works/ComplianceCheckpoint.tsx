import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Shield,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ComplianceItem {
  label: string;
  status: 'pass' | 'fail' | 'pending' | 'warning';
  regulation: string;
  details?: string;
  section?: string;
}

interface ComplianceCheckpointProps {
  items: ComplianceItem[];
  overallScore: number;
  onItemClick?: (section: string) => void;
  formData?: any;
}

export function ComplianceCheckpoint({ 
  items, 
  overallScore,
  onItemClick,
  formData 
}: ComplianceCheckpointProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [showJsonPreview, setShowJsonPreview] = useState(false);

  const passCount = items.filter(item => item.status === 'pass').length;
  const failCount = items.filter(item => item.status === 'fail').length;
  const pendingCount = items.filter(item => item.status === 'pending').length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    }
  };

  const getScoreColor = () => {
    if (overallScore >= 80) return "text-green-400";
    if (overallScore >= 50) return "text-amber-400";
    return "text-red-400";
  };

  const getProgressColor = () => {
    if (overallScore >= 80) return "bg-gradient-to-r from-green-500/80 to-emerald-500/80";
    if (overallScore >= 50) return "bg-gradient-to-r from-amber-500/80 to-yellow-500/80";
    return "bg-gradient-to-r from-red-500/80 to-rose-500/80";
  };

  const canGenerate = overallScore >= 80 && failCount === 0;

  const generatePdfMonkeyPayload = () => {
    if (!formData) return null;
    
    return {
      certificate: {
        certificate_number: formData.certificateNumber || "",
        generated_date: new Date().toISOString(),
      },
      client_installation: {
        property_address: formData.propertyAddress || "",
        postcode: formData.postcode || "",
        client_name: formData.clientName || "",
        person_ordering_work: formData.personOrderingWork || "",
        work_date: formData.workDate || "",
        date_completed: formData.dateOfCompletion || "",
        next_inspection_due: formData.nextInspectionDue || "",
        contractor_name: formData.contractorName || "",
        contractor_address: formData.contractorAddress || "",
      },
      work_description: {
        work_type: formData.workType || "",
        work_location: formData.workLocation || "",
        work_description: formData.workDescription || "",
        departures_from_bs7671: formData.departuresFromBS7671 || "",
      },
      supply_earthing: {
        supply_voltage: formData.supplyVoltage || "230V",
        frequency: formData.frequency || "50Hz",
        supply_phases: formData.supplyPhases || "1",
        earthing_arrangement: formData.earthingArrangement || "",
        main_earthing_conductor: {
          size: formData.mainEarthingConductorSize || "",
          custom_size: formData.mainEarthingConductorSizeCustom || "",
        },
        main_bonding_conductor: {
          size: formData.mainBondingConductorSize || "",
          custom_size: formData.mainBondingConductorSizeCustom || "",
        },
        bonding_connections: {
          water: Boolean(formData.bondingWater),
          gas: Boolean(formData.bondingGas),
          oil: Boolean(formData.bondingOil),
          structural: Boolean(formData.bondingStructural),
          other: Boolean(formData.bondingOther),
        },
      },
      circuit_details: {
        distribution_board: formData.distributionBoard || "",
        circuit_designation: formData.circuitDesignation || "",
        circuit_description: formData.circuitDescription || "",
        protective_device: {
          type: formData.protectiveDeviceType || "",
          rating: formData.protectiveDeviceRating || "",
          ka_rating: formData.protectiveDeviceKaRating || "",
        },
        protection_devices: {
          rcd: Boolean(formData.protectionRcd),
          rcbo: Boolean(formData.protectionRcbo),
          afdd: Boolean(formData.protectionAfdd),
          spd: Boolean(formData.protectionSpd),
        },
        cable: {
          live_size: formData.liveConductorSize || "",
          cpc_size: formData.cpcSize || "",
          type: formData.cableType || "",
          installation_method: formData.installationMethod || "",
          reference_method: formData.referenceMethod || "",
        },
      },
      test_results: {
        dead_tests: {
          continuity_r1_r2: formData.continuityR1R2 || "",
          ring_circuit: {
            r1_end_to_end: formData.ringR1EndToEnd || "",
            rn_end_to_end: formData.ringRnEndToEnd || "",
            r2_end_to_end: formData.ringR2EndToEnd || "",
            r1_cross: formData.ringR1Cross || "",
            rn_cross: formData.ringRnCross || "",
            r2_cross: formData.ringR2Cross || "",
            ring_final_continuity: formData.ringFinalContinuity || "",
          },
          earth_electrode_resistance: formData.earthElectrodeResistance || "",
          polarity: formData.polarity || "",
        },
        insulation_resistance: {
          test_voltage: formData.insulationTestVoltage || "500V",
          live_neutral: formData.insulationLiveNeutral || "",
          live_earth: formData.insulationLiveEarth || "",
          neutral_earth: formData.insulationNeutralEarth || "",
        },
        live_tests: {
          earth_fault_loop_impedance: formData.earthFaultLoopImpedance || "",
          max_permitted_zs: formData.maxPermittedZs || "",
          prospective_fault_current: formData.prospectiveFaultCurrent || "",
          phase_rotation: formData.phaseRotation || "",
          functional_testing: formData.functionalTesting || "",
        },
        rcd_tests: {
          rating: formData.rcdRating || "",
          trip_time_1x: formData.rcdOneX || "",
          rcbo_overcurrent_trip: formData.rcboTripTime || "",
        },
        afdd_tests: {
          test_button: formData.afddTestButton || "",
          trip_time: formData.afddTripTime || "",
        },
        spd_tests: {
          indicator_status: formData.spdIndicatorStatus || "",
          test_button: formData.spdTestButton || "",
          visual_inspection: formData.spdVisualInspection || "",
        },
      },
      test_equipment: {
        primary_tester: {
          model: formData.testEquipmentModel || "",
          serial: formData.testEquipmentSerial || "",
          calibration_date: formData.testEquipmentCalDate || "",
        },
        test_temperature: formData.testTemperature || "20°C",
        legacy_individual_testers: {
          continuity: {
            make: formData.continuityTesterMake || "",
            serial: formData.continuityTesterSerial || "",
            calibration: formData.continuityTesterCalDate || "",
          },
          insulation: {
            make: formData.insulationTesterMake || "",
            serial: formData.insulationTesterSerial || "",
            calibration: formData.insulationTesterCalDate || "",
          },
          loop: {
            make: formData.loopTesterMake || "",
            serial: formData.loopTesterSerial || "",
            calibration: formData.loopTesterCalDate || "",
          },
        },
      },
      declaration: {
        competent_person: {
          name: formData.electricianName || "",
          position: formData.position || "",
          qualification_level: formData.qualificationLevel || "",
          scheme_provider: formData.schemeProvider || "",
          registration_number: formData.registrationNumber || "",
        },
        declarations: {
          bs7671_compliance: Boolean(formData.bs7671Compliance),
          test_results_accurate: Boolean(formData.testResultsAccurate),
          work_safety: Boolean(formData.workSafety),
          part_p_notification: Boolean(formData.partPNotification),
        },
        signature: {
          date: formData.signatureDate || "",
          signature_data: formData.signature || "",
          additional_notes: formData.additionalNotes || "",
        },
      },
      observations: formData.observations?.map((obs: any) => ({
        code: obs.defectCode?.toUpperCase() || 'C3',
        description: obs.description || obs.item || "",
        photo_evidence: obs.photoEvidence || [],
        photo_count: obs.photoEvidence?.length || 0,
      })) || [],
      metadata: {
        generated_at: new Date().toLocaleString('en-GB'),
        form_version: "1.0",
      },
    };
  };

  const copyJsonToClipboard = () => {
    const payload = generatePdfMonkeyPayload();
    if (payload) {
      navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    }
  };

  return (
    <Card className="w-full p-6 border-2">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-bold">BS 7671 Compliance Checkpoint</h3>
        </div>

        {/* Score Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Compliance Score
            </span>
            <span className={cn("text-3xl font-bold", getScoreColor())}>
              {overallScore}%
            </span>
          </div>
          
          <div className="relative">
            <Progress value={overallScore} className="h-3" />
            <div 
              className={cn("absolute inset-0 h-3 rounded-full transition-all", getProgressColor())}
              style={{ width: `${overallScore}%` }}
            />
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="font-medium">{passCount} Pass</span>
            </div>
            <div className="flex items-center gap-1">
              <XCircle className="h-4 w-4 text-red-400" />
              <span className="font-medium">{failCount} Fail</span>
            </div>
            <div className="flex items-center gap-1">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span className="font-medium">{pendingCount} Pending</span>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => {
                  setExpandedItem(expandedItem === item.label ? null : item.label);
                  if (item.section && onItemClick) {
                    onItemClick(item.section);
                  }
                }}
                className={cn(
                  "w-full p-3 rounded-lg border-2 transition-all hover:shadow-md",
                  "flex items-center justify-between gap-2 text-left",
                  item.status === 'pass' && "border-green-500/30 bg-green-500/10",
                  item.status === 'fail' && "border-red-500/30 bg-red-500/10",
                  item.status === 'pending' && "border-amber-500/30 bg-amber-500/10",
                  item.status === 'warning' && "border-amber-500/30 bg-amber-500/10"
                )}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getStatusIcon(item.status)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.label}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {item.regulation}
                    </Badge>
                  </div>
                </div>
                {item.details && (
                  expandedItem === item.label ? 
                    <ChevronUp className="h-4 w-4 shrink-0" /> : 
                    <ChevronDown className="h-4 w-4 shrink-0" />
                )}
              </button>
              
              {expandedItem === item.label && item.details && (
                <div className="mt-2 p-3 bg-muted rounded-lg text-sm">
                  {item.details}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Status Alert */}
        {canGenerate ? (
          <Alert className="border-green-500/50 bg-green-500/10">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-300">
              All compliance checks passed. You may proceed to generate your certificate.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="border-red-500/50 bg-red-500/10">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-300">
              Please resolve compliance issues before generating certificate. Complete the required fields and ensure all tests meet BS 7671 standards.
            </AlertDescription>
          </Alert>
        )}

        {/* PDF Monkey JSON Preview */}
        {formData && (
          <div className="space-y-2">
            <button
              onClick={() => setShowJsonPreview(!showJsonPreview)}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {showJsonPreview ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              <span>PDF Monkey JSON Payload</span>
              <Badge variant="outline" className="text-xs">Debug</Badge>
            </button>
            
            {showJsonPreview && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    This shows the JSON data structure that will be sent to PDF Monkey API
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyJsonToClipboard}
                    className="text-xs"
                  >
                    Copy JSON
                  </Button>
                </div>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-auto max-h-96">
                  {JSON.stringify(generatePdfMonkeyPayload(), null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
