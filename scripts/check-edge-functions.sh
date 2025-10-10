#!/bin/bash

# Pre-deploy guard: Check for common edge function syntax issues
# Detects invalid "} catch (" patterns after valid try/catch blocks

echo "🔍 Checking edge functions for syntax issues..."

ISSUES_FOUND=0

# Check for stray catch blocks in Promise.all(map(async...)) patterns
while IFS= read -r file; do
  # Look for "} catch (" appearing after another catch block
  if grep -n "} catch (" "$file" | grep -q "} catch ("; then
    echo "⚠️  Potential duplicate catch block in: $file"
    grep -n "} catch (" "$file"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
  fi
done < <(find supabase/functions -name "index.ts" -type f)

if [ $ISSUES_FOUND -eq 0 ]; then
  echo "✅ No syntax issues detected"
  exit 0
else
  echo "❌ Found $ISSUES_FOUND potential issue(s)"
  echo "Review the files above before deploying"
  exit 1
fi
