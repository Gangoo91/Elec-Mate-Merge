# PDF Monkey Integration - Implementation Summary

## ✅ What Was Implemented

### 1. **New Edge Function: `generate-design-spec-pdf`**
**Location:** `supabase/functions/generate-design-spec-pdf/index.ts`

**Purpose:** Generate professional Designer Calculations PDF using PDF Monkey API

**Features:**
- ✅ Calls PDF Monkey API with Template ID `8C64318C-A404-4A55-9039-294164C19FB4`
- ✅ Fetches company profile from database (logo, contact details)
- ✅ Transforms Designer Agent output to PDF Monkey JSON schema
- ✅ Polls for PDF generation completion (max 30 seconds)
- ✅ Returns PDF download URL on success
- ✅ Returns fallback flag if PDF Monkey unavailable

**Configuration:**
- Added to `supabase/config.toml` with `verify_jwt = false`
- Uses `PDF_MONKEY_API_KEY` from Supabase secrets

---

### 2. **Updated: `generate-professional-package` Edge Function**
**Location:** `supabase/functions/generate-professional-package/index.ts`

**Changes:**
- ✅ Added `generateDesignSpecWithPDFMonkey()` function
- ✅ Modified Design Spec generation to try PDF Monkey first
- ✅ Automatic fallback to jsPDF if PDF Monkey fails
- ✅ Downloads generated PDF from PDF Monkey URL
- ✅ Adds to ZIP bundle alongside other documents

**Flow:**
```
Try PDF Monkey
  ↓ Success → Download PDF → Add to ZIP
  ↓ Failure → Fallback to jsPDF → Add to ZIP
```

---

### 3. **Enhanced: Designer Agent Output**
**Location:** `supabase/functions/designer-agent/index.ts`

**Added Circuit Metadata:**
```typescript
structuredData.circuit = {
  name: "Electric Shower Circuit",           // Formatted name
  circuitType: "shower",                     // Raw type
  loadType: "Fixed Appliance",               // Category
  power: 9500,                               // Watts
  totalLoadKW: "9.50",                       // kW (formatted)
  cableLength: 15,                           // metres
  voltage: 230,                              // volts
  phases: "Single Phase"                     // phase config
}
```

**Added Helper Functions:**
- `formatCircuitName()` - Converts circuit types to display names
- `formatLoadType()` - Categorizes circuit types

---

## 📋 PDF Monkey JSON Schema Mapping

### Document Structure
```json
{
  "document": {
    "reference": "DS-Kitchen_Rewire-2025-10-08",
    "generated_date": "08/10/2025",
    "registration_number": "N/A",
    "vat_number": "N/A"
  },
  "company_details": {
    "company_name": "From company_profiles table or fallback",
    "company_address": "From company_profiles or companyDetails",
    "company_phone": "...",
    "company_email": "...",
    "company_website": "...",
    "company_logo_url": "From company_profiles.logo_url"
  },
  "client_details": {
    "client_name": "From clientDetails",
    "property_address": "From designData.location or clientDetails",
    "postcode": "...",
    "contact_number": "...",
    "email": "..."
  },
  "project_info": {
    "project_name": "Kitchen Rewire",
    "location": "Site address",
    "design_engineer": "From company_profiles or fallback",
    "design_date": "08/10/2025",
    "installation_type": "Domestic Installation"
  },
  "design_parameters": {
    "voltage": 230,
    "phases": "Single Phase",
    "supply_type": "TN-S Single Phase",
    "earthing_system": "TN-S",
    "ze": "0.35",
    "ambient_temperature": 25,
    "installation_method": "Clipped Direct",
    "cable_type": "6242Y Twin & Earth"
  },
  "circuits": [
    {
      "circuit_number": 1,
      "circuit_name": "Electric Shower Circuit",
      "load_type": "Fixed Appliance",
      "total_load_kw": "9.50",
      "cable_length": 15,
      "ib": "41.3",
      "protection": "45A B",
      "cable_size": 10,
      "compliance_status": "pass",
      "cable_spec": "10mm² 6242Y T&E",
      "table_ref": "Table 4D5",
      "it": "52.0",
      "ca": "0.94",
      "cg": "1.00",
      "iz": "48.9",
      "equation": "Iz = It × Ca × Cg = 52A × 0.94 × 1.00 = 48.9A",
      "vd_percent": "2.45",
      "vd_volts": "5.64",
      "vd_max": 3,
      "max_zs": "1.15",
      "zs_regulation": "Table 41.3",
      "in": 45,
      "rcd_rating": "30mA RCD Required",
      "rcd_reason": "Bathroom location",
      "reg_1": "Regulation 411.3.2.2 - Automatic disconnection of supply",
      "reg_2": "Regulation 525 - Voltage drop in consumers installations",
      "reg_3": "Regulation 415.1 - Protection by RCD"
    }
  ]
}
```

---

## 🔄 Data Flow

```
User completes Install Planner conversation
  ↓
Designer Agent runs calculations
  ↓ Outputs structured circuit data
  ↓
User clicks "Export Professional Package"
  ↓
generate-professional-package invoked
  ↓
For Design Spec:
  ├─ Try: generate-design-spec-pdf (PDF Monkey)
  │   ├─ Fetch company profile from DB
  │   ├─ Transform data to JSON schema
  │   ├─ POST to PDF Monkey API
  │   ├─ Poll for completion (30s max)
  │   ├─ Download generated PDF
  │   └─ Return PDF bytes
  │
  └─ Fallback: generateDesignSpec (jsPDF)
      └─ Legacy PDF generation
  ↓
Add PDF to ZIP bundle
  ↓
Download ZIP package
```

---

## 🎨 HTML Template Features

Your PDF Monkey template includes:
- ✅ Professional header with company logo
- ✅ Client and project information boxes
- ✅ Design parameters in modern card layout
- ✅ Circuit calculations with compliance badges
- ✅ Detailed calculation tables
- ✅ BS 7671 references
- ✅ Professional disclaimer section
- ✅ Proper page breaks for circuit section

---

## 🛠️ Testing Checklist

### Test Scenarios:
1. **✅ PDF Monkey Success**
   - Company profile exists
   - Logo URL valid
   - Circuits have complete data
   - Expected: Professional PDF generated

2. **✅ PDF Monkey Fallback**
   - API key missing
   - PDF Monkey API down
   - Timeout during polling
   - Expected: jsPDF fallback works

3. **✅ Missing Data Handling**
   - No company profile
   - No logo URL
   - Missing client details
   - Expected: Uses fallback values ("N/A")

4. **✅ Multiple Circuits**
   - 1 circuit
   - 3 circuits
   - 5+ circuits
   - Expected: All circuits rendered correctly

---

## 📝 Configuration

### Environment Variables Required:
```bash
PDF_MONKEY_API_KEY=your_api_key_here  # ✅ Already set
```

### Supabase Tables Used:
- `company_profiles` - For logo and company details
- `conversation_memory` - For session data
- `saved_designs` - For storing design data

---

## 🚀 Next Steps

### To Complete Installation Package PDF:
1. Create PDF Monkey template for "Installation Package"
2. Get Template ID
3. Create `generate-installation-package-pdf` edge function
4. Add Combined PDF option to export dialog

### Optional Enhancements:
- Add custom branding colors from company profile
- Support for multi-page circuit calculations
- PDF preview before download
- Email delivery of PDFs

---

## 📞 Support

**PDF Monkey Documentation:**
- API Docs: https://www.pdfmonkey.io/docs/api
- Template Builder: https://app.pdfmonkey.io/

**Implementation Files:**
- `supabase/functions/generate-design-spec-pdf/index.ts`
- `supabase/functions/generate-professional-package/index.ts`
- `supabase/functions/designer-agent/index.ts`
- `supabase/config.toml`

---

**Status:** ✅ Ready for Testing  
**Date:** 2025-10-08  
**Template ID:** 8C64318C-A404-4A55-9039-294164C19FB4
