Run a production build and report on bundle size.

Steps:

1. Run `npm run build` in /Users/andrewmoore/elec-mate-merge
2. Show the total dist size (uncompressed, gzip, brotli)
3. List the 10 largest JS chunks with their sizes
4. Run `npm run size` to check against size budgets
5. If any budget is exceeded, suggest what to optimise
6. Compare with previous build if dist/ existed before
