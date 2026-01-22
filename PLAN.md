# Plan: Fix PDF Preview in Certificate Viewer

## Problem

The PDF preview in `ReportPdfViewer.tsx` shows an empty box because:

1. **CORS Error**: Direct requests to PDF Monkey's S3 bucket (`pdfmonkey-store.s3.eu-west-3.amazonaws.com`) are blocked by CORS policy
2. **`isPdfUrlValid()`** makes a direct HEAD request (line 158) that fails due to CORS
3. **`handleDownload()`** makes a direct HEAD request (line 404) that also fails due to CORS

The `proxy-pdf` edge function already exists to bypass CORS, but it's not being used in all the right places.

## Solution

### Step 1: Fix `isPdfUrlValid()` function

**Current behaviour**: Makes a direct HEAD request to the PDF URL → fails due to CORS

**Fix**: Use expiry date only for validation - don't make HEAD requests that will be blocked:

```typescript
const isPdfUrlValid = async (url: string, expiresAt?: string): Promise<boolean> => {
  // Check expiry date only - don't make HEAD request (CORS blocked)
  if (expiresAt) {
    const expiryDate = new Date(expiresAt);
    if (new Date() > expiryDate) {
      return false;
    }
    return true;
  }
  // No expiry date - assume valid, let proxy handle errors
  return true;
};
```

### Step 2: Fix `handleDownload()` function

**Current behaviour**: Makes a direct HEAD request, then opens URL → fails due to CORS

**Fix**: Use the existing blob URL for download:

```typescript
const handleDownload = async () => {
  if (!report) return;

  // Use blob URL if available (already fetched via proxy)
  if (blobUrl) {
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${report.certificate_number}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // Fallback: open PDF URL directly
  if (pdfUrl) {
    window.open(pdfUrl, '_blank');
  }
};
```

### Step 3: Ensure proxy-pdf edge function is deployed

```bash
npx supabase functions deploy proxy-pdf --project-ref jtwygbeceundfgnkirof
```

## Files to Modify

1. `/src/components/reports/ReportPdfViewer.tsx`
   - Fix `isPdfUrlValid()` (lines 146-164)
   - Fix `handleDownload()` (lines 399-425)

## Testing

1. Navigate to Inspection & Testing → My Reports
2. Click on a certificate to open the PDF viewer
3. Verify PDF displays in the preview area
4. Verify Download button works
5. Verify Edit button works
