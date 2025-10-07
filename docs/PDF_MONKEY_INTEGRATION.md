# PDF Monkey Integration Guide

## Overview

The Electrician's Toolkit uses PDF Monkey for professional, branded PDF generation with custom templates. This system allows users to upload their own templates and automatically fill them with project data.

## Architecture

### Database Tables

1. **`pdf_templates`** - Stores user template configurations
   - `pdf_monkey_template_id` - Your PDF Monkey template ID
   - `field_mapping` - JSON mapping of template placeholders to data fields
   - `file_url` - Reference file for template preview
   - `is_active` - Enable/disable templates

2. **`document_field_schemas`** - Standard field definitions for each document type
   - Defines the expected data structure
   - Provides example data for testing
   - Version-controlled schemas

### Edge Functions

Separate edge function for each document type:
- `generate-design-spec-pdf` - Design specifications with calculations
- `generate-quote-pdf` - Client quotes with pricing
- `generate-rams-pdf` - Risk assessments and method statements
- `generate-checklist-pdf` - Installation checklists (future)
- `generate-test-schedule-pdf` - Test schedules (future)

### Fallback System

If PDF Monkey is not configured or fails:
1. Edge function returns `useFallback: true`
2. Frontend automatically generates PDF using jsPDF
3. Users still get professional documents without external service

## Setup Guide

### 1. Create PDF Monkey Account

1. Sign up at [pdfmonkey.io](https://pdfmonkey.io)
2. Get your API key from Settings
3. Add API key to Supabase secrets: `PDF_MONKEY_API_KEY`

### 2. Create Templates

Each template needs placeholders matching our standard schemas:

#### Design Specification Template

```json
{
  "projectDetails": {
    "projectName": "{{projectName}}",
    "location": "{{location}}",
    "date": "{{date}}"
  },
  "designParameters": {
    "voltage": "{{voltage}}",
    "phases": "{{phases}}",
    "totalLoad": "{{totalLoad}}",
    "designCurrent": "{{designCurrent}}"
  },
  "cableDesign": {
    "cableSize": "{{cableSize}}",
    "cableType": "{{cableType}}",
    "length": "{{length}}",
    "installationMethod": "{{installationMethod}}"
  },
  "circuits": [
    {
      "circuitRef": "{{circuits[0].circuitRef}}",
      "description": "{{circuits[0].description}}",
      "cableSize": "{{circuits[0].cableSize}}",
      "cpcSize": "{{circuits[0].cpcSize}}",
      "protectiveDevice": "{{circuits[0].protectiveDevice}}",
      "loadCurrent": "{{circuits[0].loadCurrent}}"
    }
  ],
  "calculations": {
    "voltageDrop": "{{voltageDrop}}",
    "voltageDropPercent": "{{voltageDropPercent}}",
    "zs": "{{zs}}",
    "capacity": "{{capacity}}"
  },
  "environmental": {
    "ambientTemp": "{{ambientTemp}}",
    "grouping": "{{grouping}}",
    "earthing": "{{earthing}}",
    "ze": "{{ze}}"
  },
  "compliance": {
    "compliant": "{{compliant}}",
    "warnings": "{{warnings}}",
    "recommendations": "{{recommendations}}"
  }
}
```

#### Quote Template

```json
{
  "quoteNumber": "{{quoteNumber}}",
  "date": "{{date}}",
  "expiryDate": "{{expiryDate}}",
  "clientData": {
    "name": "{{clientName}}",
    "company": "{{clientCompany}}",
    "address": "{{clientAddress}}",
    "email": "{{clientEmail}}",
    "phone": "{{clientPhone}}"
  },
  "items": [
    {
      "description": "{{items[0].description}}",
      "quantity": "{{items[0].quantity}}",
      "unitPrice": "{{items[0].unitPrice}}",
      "total": "{{items[0].total}}"
    }
  ],
  "subtotal": "{{subtotal}}",
  "vat": "{{vat}}",
  "total": "{{total}}",
  "terms": "{{terms}}"
}
```

#### RAMS Template

```json
{
  "projectName": "{{projectName}}",
  "location": "{{location}}",
  "date": "{{date}}",
  "assessor": "{{assessor}}",
  "activities": ["{{activities}}"],
  "hazards": [
    {
      "hazard": "{{hazards[0].hazard}}",
      "risk": "{{hazards[0].risk}}",
      "likelihood": "{{hazards[0].likelihood}}",
      "severity": "{{hazards[0].severity}}",
      "controls": "{{hazards[0].controls}}",
      "residualRisk": "{{hazards[0].residualRisk}}"
    }
  ]
}
```

### 3. Configure in Application

1. Go to Installation Planner V2
2. Find "PDF Template Manager" card
3. Upload your reference template file (optional)
4. Click "Configure" on the template
5. Enter your PDF Monkey template ID
6. Map fields (optional - auto-maps if names match)

### 4. Field Mapping

If your template uses different placeholder names, create a mapping:

```json
{
  "client_name": "clientData.name",
  "client_email": "clientData.email",
  "quote_ref": "quoteNumber",
  "line_items": "items",
  "grand_total": "total"
}
```

Format: `"yourTemplatePlaceholder": "ourDataPath"`

## Testing

### View Standard Schemas

Query the `document_field_schemas` table to see expected data structures:

```sql
SELECT document_type, example_data 
FROM document_field_schemas 
WHERE document_type = 'design_spec';
```

### Test Edge Function

```typescript
const { data, error } = await supabase.functions.invoke('generate-design-spec-pdf', {
  body: {
    designData: {
      projectDetails: {
        projectName: "Test Project",
        location: "London",
        date: "2025-09-15"
      },
      // ... rest of schema
    },
    userId: 'your-user-id'
  }
});
```

## Troubleshooting

### PDF Monkey API Errors

Check edge function logs:
```bash
supabase functions logs generate-design-spec-pdf
```

Common issues:
- **401 Unauthorized**: Check API key in secrets
- **404 Not Found**: Verify template ID
- **422 Unprocessable**: Check field mapping matches template

### Fallback Not Working

If jsPDF fallback fails:
1. Check browser console for errors
2. Verify data structure matches expected format
3. Check network tab for edge function response

### Field Mapping Issues

Test your mapping:
```typescript
const testMapping = {
  "template_field": "data.path.to.value"
};

// Function to test mapping
function testFieldMapping(data: any, mapping: any) {
  Object.entries(mapping).forEach(([key, path]) => {
    const value = path.split('.').reduce((o, p) => o?.[p], data);
    console.log(`${key} -> ${value}`);
  });
}
```

## Best Practices

1. **Start with Standard Templates**: Use our example templates first
2. **Test with Example Data**: Use data from `document_field_schemas`
3. **Gradual Customisation**: Start with auto-mapping, add custom maps as needed
4. **Version Control**: Keep template versions in PDF Monkey
5. **Fallback Ready**: Always test without PDF Monkey configured

## Commercial Benefits

### For Users
- ✅ Professional branded documents
- ✅ Consistent company identity
- ✅ No manual PDF creation
- ✅ Automatic data population
- ✅ Works offline (fallback)

### For Business
- 🎯 **Premium Feature**: Charge for custom branding
- 🎯 **Lock-in**: Users invest time in template setup
- 🎯 **Professionalism**: Higher perceived value
- 🎯 **Automation**: Save hours per project
- 🎯 **Compliance**: Consistent documentation

## Future Enhancements

- [ ] Template marketplace (share/sell templates)
- [ ] Multi-language support
- [ ] Conditional sections (show/hide based on data)
- [ ] Signature integration
- [ ] Automated email delivery
- [ ] Template versioning UI
- [ ] Preview before generation

## Support

For issues or questions:
1. Check edge function logs
2. Verify data against schemas
3. Test with example data
4. Check PDF Monkey dashboard
