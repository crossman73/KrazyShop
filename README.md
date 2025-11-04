# 🚀 화장품 성분 분석 서비스(CosmicScan)

## 프로젝트 개요
이미지 기반 AI 화장품 주요 성분 분석 및 개인화 추천 서비스

### 🎯 핵심 차별화
- **이미지 OCR**: 바코드 없이 제품명/성분 인식
- **AI 개인화**: 피부타입별 맞춤 분석  
- **커뮤니티**: 사용자 리뷰 + 투표 시스템
- **글로벌 DB**: 실시간 크롤링 기반 제품 정보

### 💰 비즈니스 모델
- **시장 규모**: $91.9B AI 뷰티 시장 (20.4% CAGR)
- **수익 모델**: Freemium + B2B 파트너십 + 데이터 라이센싱
- **투자 목표**: Seed $500K → Series A $5M

### 🗓️ 개발 일정 (임시 목표 설정)
- **3주 MVP**: 무료 환경 기반 프로토타입
- **3개월**: 한국 파일럿 (1만 MAU)
- **6개월**: 아시아 확장 (3만 MAU)  
- **18개월**: 글로벌 진출 (50만 MAU)

## 📂 프로젝트 구조 (고도화 필요)

```
cosmetic-analyzer/
├── Docs/                          # 📋 프로젝트 기획 문서
│   ├── business-plan.md           # 투자자용 비즈니스 기획서
│   ├── technical-architecture.md  # 무료 기반 기술 설계
│   ├── mvp-development-plan.md    # 3주 완성 개발 계획
│   ├── kpi-measurement-system.md  # 성과 측정 체계
│   ├── global-expansion-strategy.md # 글로벌 확장 전략
│   └── project-summary.md         # 전체 프로젝트 요약
├── README.md                      # 이 파일
└── (개발 진행 시 추가될 구조)
    ├── backend/                   # Python FastAPI
    ├── frontend/                  # Next.js + TypeScript
    ├── database/                  # Supabase PostgreSQL
    ├── ai-models/                 # OCR + ML 모델
    ├── docker/                    # 컨테이너 설정
    └── scripts/                   # 자동화 도구
```

## 🛠️ 기술 스택

### Frontend
- **Next.js 14**: React + TypeScript + SSR
- **Vercel**: 무료 배포 + CDN
- **TailwindCSS**: UI 프레임워크

### Backend  
- **Supabase**: PostgreSQL + Auth + Storage + Edge Functions
- **AI/ML**: Tesseract.js + Google Vision + HuggingFace
- **무료 환경**: 완전 제로 비용으로 시작

### 확장 계획
- **단계별 유료 전환**: 사용자 증가에 따른 인프라 확장
- **글로벌 배포**: 다국어 OCR + 지역별 최적화

## 🚀 빠른 시작

### 1. 환경 설정
```bash
# 프로젝트 클론
git clone [repository-url]
cd cosmetic-analyzer

# 문서 확인
ls Docs/  # 모든 기획 문서 확인
```

### 2. 개발 준비
```bash
# Supabase 프로젝트 생성
# Vercel 계정 설정
# Next.js 프로젝트 초기화 (예정)
```

### 3. MVP 개발 시작
자세한 일정은 [`Docs/mvp-development-plan.md`](Docs/mvp-development-plan.md) 참조

## 📊 핵심 지표

### 목표 KPIs
- **사용자**: MAU 50만명 (18개월)
- **수익**: ARR $2M (36개월)
- **투자**: Series A $5M (18개월)

자세한 지표는 [`Docs/kpi-measurement-system.md`](Docs/kpi-measurement-system.md) 참조

## 🌏 글로벌 전략

### 확장 순서
1. **한국 파일럿** (3개월) - K-뷰티 강점 활용
2. **아시아 확장** (6-12개월) - 일본, 대만, 홍콩
3. **서구 진출** (12-18개월) - 미국, 영국, 호주
4. **글로벌 완성** (18-24개월) - 유럽, 기타 신흥시장

자세한 전략은 [`Docs/global-expansion-strategy.md`](Docs/global-expansion-strategy.md) 참조

## 📋 다음 단계

### 즉시 실행
- [ ] Supabase 프로젝트 생성
- [ ] VSCode MCP Extension 설치  
- [ ] GitHub 레포지토리 설정

### Week 1 목표  
- [ ] Next.js + Vercel 배포 환경
- [ ] 기본 사용자 인증 구현
- [ ] 이미지 업로드 + OCR 프로토타입

### Month 1 목표
- [ ] 완성된 MVP 데모
- [ ] 한국 파일럿 사용자 100명
- [ ] 투자자 피칭 준비

## 📞 연락처

**프로젝트 문의**: [연락처 정보]  
**투자 관련**: [`Docs/business-plan.md`](Docs/business-plan.md) 참조

---
*CosmicScan Project - 2025-09-18*
