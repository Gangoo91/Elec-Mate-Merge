#!/bin/bash

# Pre-deploy guard: Check for common edge function issues
# Enforces shared framework adoption and best practices

echo "🔍 Checking edge functions for issues..."

ISSUES_FOUND=0
WARNINGS_FOUND=0

# Check for stray catch blocks in Promise.all(map(async...)) patterns
while IFS= read -r file; do
  # Look for "} catch (" appearing after another catch block
  if grep -n "} catch (" "$file" | grep -q "} catch ("; then
    echo "⚠️  Potential duplicate catch block in: $file"
    grep -n "} catch (" "$file"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
  fi
done < <(find supabase/functions -name "index.ts" -type f)

# Check for old import patterns (should use _shared/deps.ts)
echo ""
echo "📦 Checking for direct deno.land imports..."
while IFS= read -r file; do
  if [[ "$file" != *"_shared"* ]]; then
    if grep -q 'from "https://deno.land' "$file"; then
      echo "❌ Direct deno.land import found in: $file"
      echo "   Use: import { serve, createClient } from '../_shared/deps.ts'"
      ISSUES_FOUND=$((ISSUES_FOUND + 1))
    fi
  fi
done < <(find supabase/functions -name "index.ts" -type f)

# Check for manual CORS headers (should import from _shared/cors.ts)
echo ""
echo "🌐 Checking for manual CORS headers..."
while IFS= read -r file; do
  if [[ "$file" != *"_shared"* ]]; then
    if grep -q "corsHeaders = {" "$file"; then
      echo "⚠️  Manual CORS headers found in: $file"
      echo "   Consider: import { corsHeaders } from '../_shared/cors.ts'"
      WARNINGS_FOUND=$((WARNINGS_FOUND + 1))
    fi
  fi
done < <(find supabase/functions -name "index.ts" -type f)

# Check for unprotected fetch calls (should wrap with retry/timeout)
echo ""
echo "🔒 Checking for unprotected fetch calls..."
while IFS= read -r file; do
  if [[ "$file" != *"_shared"* ]]; then
    if grep -q "await fetch(" "$file"; then
      if ! grep -q "withRetry\|withTimeout" "$file"; then
        echo "⚠️  Unprotected fetch() call found in: $file"
        echo "   Consider: withRetry(() => withTimeout(fetch(...), Timeouts.STANDARD))"
        WARNINGS_FOUND=$((WARNINGS_FOUND + 1))
      fi
    fi
  fi
done < <(find supabase/functions -name "index.ts" -type f)

# Summary
echo ""
echo "================================"
if [ $ISSUES_FOUND -eq 0 ] && [ $WARNINGS_FOUND -eq 0 ]; then
  echo "✅ No issues detected - ready to deploy!"
  exit 0
elif [ $ISSUES_FOUND -eq 0 ]; then
  echo "✅ No critical issues found"
  echo "⚠️  Found $WARNINGS_FOUND warning(s) - consider fixing before deploy"
  exit 0
else
  echo "❌ Found $ISSUES_FOUND critical issue(s)"
  echo "⚠️  Found $WARNINGS_FOUND warning(s)"
  echo "Fix critical issues before deploying"
  exit 1
fi
