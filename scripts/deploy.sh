#!/bin/bash

# =============================================================
# SEMUT INDONESIA — Deploy Script
# Jalankan setelah git pull:  bash scripts/deploy.sh
# =============================================================

set -e  # Stop jika ada error

echo ""
echo "============================================="
echo "   SEMUT INDONESIA — Deploy & Setup"
echo "============================================="
echo ""

# --- 1. Install dependencies (jika ada yang baru) ---
echo "[1/5] Installing dependencies..."
npm install --production=false
echo "      Done."
echo ""

# --- 2. Generate SESSION_SECRET jika belum ada di .env ---
echo "[2/5] Checking SESSION_SECRET..."
if [ ! -f ".env" ]; then
  touch .env
fi

if grep -q "SESSION_SECRET" .env; then
  echo "      SESSION_SECRET already set. Skipping."
else
  SECRET=$(node -e "console.log(require('crypto').randomBytes(48).toString('hex'))")
  echo "SESSION_SECRET=\"$SECRET\"" >> .env
  echo "      SESSION_SECRET generated and saved to .env"
fi
echo ""

# --- 3. Migrate passwords (hash plaintext passwords) ---
echo "[3/5] Running password migration..."
node scripts/migrate-passwords.mjs
echo ""

# --- 4. Build production ---
echo "[4/5] Building Next.js production..."
npm run build
echo ""

# --- 5. Restart server ---
echo "[5/5] Restarting server..."
if command -v pm2 &> /dev/null; then
  pm2 restart semut-indonesia --update-env 2>/dev/null || pm2 start npm --name "semut-indonesia" -- start
  echo "      Server restarted with PM2."
else
  echo "      PM2 not found. Please restart your server manually:"
  echo "      npm run start  OR  pm2 start npm --name 'semut-indonesia' -- start"
fi

echo ""
echo "============================================="
echo "   Deploy selesai!"
echo "============================================="
echo ""
