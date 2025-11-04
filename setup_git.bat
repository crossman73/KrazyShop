@echo off
echo ========================================
echo Git Repository Setup and Push
echo ========================================
echo.

REM Git 초기화
echo [1/6] Initializing Git repository...
git init
if errorlevel 1 (
    echo ERROR: Git initialization failed
    pause
    exit /b 1
)

REM 모든 파일 스테이징
echo.
echo [2/6] Staging all files...
git add .
if errorlevel 1 (
    echo ERROR: Failed to stage files
    pause
    exit /b 1
)

REM 초기 커밋
echo.
echo [3/6] Creating initial commit...
git commit -m "Initial commit: CosmicScan project - cosmetic analyzer with AI-powered analysis"
if errorlevel 1 (
    echo ERROR: Commit failed
    pause
    exit /b 1
)

REM 기본 브랜치를 main으로 변경
echo.
echo [4/6] Setting default branch to main...
git branch -M main
if errorlevel 1 (
    echo ERROR: Failed to rename branch
    pause
    exit /b 1
)

REM GitHub 저장소 연결
echo.
echo [5/6] Adding remote repository...
git remote add origin https://github.com/crossman73/KrazyShop.git
if errorlevel 1 (
    echo WARNING: Remote might already exist, trying to update...
    git remote set-url origin https://github.com/crossman73/KrazyShop.git
)

REM Push
echo.
echo [6/6] Pushing to GitHub...
git push -u origin main
if errorlevel 1 (
    echo ERROR: Push failed. Please check:
    echo - GitHub authentication (you may need to enter credentials)
    echo - Repository permissions
    echo - Internet connection
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCCESS! Repository pushed to GitHub
echo ========================================
echo Repository: https://github.com/crossman73/KrazyShop
echo.
pause
