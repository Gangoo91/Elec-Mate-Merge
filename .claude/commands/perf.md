Run a full performance audit on the app.

Steps:

1. Run `npm run build` if dist/ doesn't exist or is older than src/
2. Show bundle size breakdown (top 15 largest chunks)
3. Show brotli vs gzip vs uncompressed totals
4. Run `npm run size` to check size budgets
5. Run `oxlint src/ --quiet` to check for code quality issues
6. Count total files in src/ by type (.ts, .tsx, .css)
7. Provide actionable recommendations for improving performance:
   - Which chunks could be code-split further
   - Which vendor bundles are unexpectedly large
   - Any render-blocking resources
