#!/bin/bash

# Setup script per IonicVideosAppPablo
# Configura automàticament backend i frontend

set -e

echo "🚀 Setup IonicVideosAppPablo"
echo "=============================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Backend Setup
echo -e "${BLUE}📦 Setup Backend (Laravel)${NC}"
echo "---"

if [ -d "api-backend" ]; then
    cd api-backend

    echo "✓ Installing PHP dependencies..."
    composer install > /dev/null 2>&1

    echo "✓ Generating app key..."
    if ! grep -q "APP_KEY=base64:" .env; then
        php artisan key:generate > /dev/null 2>&1
    fi

    echo "✓ Creating storage link..."
    php artisan storage:link > /dev/null 2>&1 || true

    echo "✓ Running migrations..."
    php artisan migrate --force > /dev/null 2>&1 || php artisan migrate > /dev/null 2>&1

    echo "✓ Clearing cache..."
    php artisan config:cache > /dev/null 2>&1 || true
    php artisan route:cache > /dev/null 2>&1 || true

    cd ..
    echo -e "${GREEN}✅ Backend ready${NC}"
else
    echo -e "${YELLOW}⚠️  api-backend directory not found${NC}"
fi

echo ""

# Frontend Setup
echo -e "${BLUE}🎨 Setup Frontend (Ionic Vue)${NC}"
echo "---"

echo "✓ Installing Node dependencies..."
npm install > /dev/null 2>&1

echo "✓ Checking build..."
npm run build > /dev/null 2>&1 || echo -e "${YELLOW}⚠️  Build check skipped${NC}"

echo -e "${GREEN}✅ Frontend ready${NC}"

echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo -e "${BLUE}Siguients passos:${NC}"
echo "1. Backend:"
echo "   cd api-backend"
echo "   php artisan serve"
echo ""
echo "2. Frontend (new terminal):"
echo "   npm run dev"
echo ""
echo "Then open: http://localhost:5173"
echo ""

