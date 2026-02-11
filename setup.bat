@echo off
echo Red Market - Setup Script
echo ============================
echo.

echo Installing dependencies...
call npm install

echo.
echo Setting up database...
call npx prisma generate
call npx prisma db push

echo.
echo Seeding database with sample products...
call npx tsx prisma/seed.ts

echo.
echo Setup complete!
echo.
echo To start the development server, run:
echo    npm run dev
echo.
echo Then open http://localhost:3000 in your browser
echo.
pause
