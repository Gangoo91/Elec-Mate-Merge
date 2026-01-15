#!/bin/bash
# Elec-Mate Scraper Setup Script
# Run this to set up everything automatically

set -e

echo "========================================="
echo "  Elec-Mate Scraper Setup"
echo "========================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: Run this script from the services/scraper directory${NC}"
    exit 1
fi

# Step 1: Install dependencies
echo -e "\n${YELLOW}Step 1: Installing dependencies...${NC}"
npm install

# Step 2: Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo -e "\n${YELLOW}Step 2: Creating .env file...${NC}"

    # Use the Elec-Mate Supabase project
    cat > .env << 'EOF'
# Elec-Mate Supabase Configuration
SUPABASE_URL=https://jtwygbeceundfgnkirof.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE

# Server Configuration
PORT=3001

# Enable cron jobs for automatic scraping
ENABLE_CRON=true
EOF

    echo -e "${RED}IMPORTANT: Edit .env and add your SUPABASE_SERVICE_ROLE_KEY${NC}"
    echo "Get it from: https://supabase.com/dashboard/project/jtwygbeceundfgnkirof/settings/api"
    read -p "Press Enter after you've added the key..."
else
    echo -e "\n${GREEN}Step 2: .env file already exists${NC}"
fi

# Step 3: Apply database migration
echo -e "\n${YELLOW}Step 3: Applying database migration...${NC}"
npm run migrate 2>/dev/null || node scripts/apply-migration.js

# Step 4: Build TypeScript
echo -e "\n${YELLOW}Step 4: Building TypeScript...${NC}"
npm run build

# Step 5: Test connection
echo -e "\n${YELLOW}Step 5: Testing Supabase connection...${NC}"
npm run test:connection 2>/dev/null || echo "Connection test not available"

echo -e "\n${GREEN}=========================================${NC}"
echo -e "${GREEN}  Setup Complete!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo "To start scraping:"
echo "  npm run dev          # Development mode with hot reload"
echo "  npm start            # Production mode"
echo ""
echo "To run a manual scrape:"
echo "  npm run scrape:all   # All suppliers (~25,000 products)"
echo "  npm run scrape:deals # Deals only"
echo ""
echo "Cron jobs (when ENABLE_CRON=true):"
echo "  - Deals: Every 4 hours"
echo "  - Full catalog: Weekly (Sunday 2am)"
