# 🏗️ CosmicScan 기술 아키텍처 (무료 최적화)

## System Overview
```
사용자 → Vercel (Next.js) → Supabase (All-in-One Backend) → External APIs
```

## 무료 서비스 스택

### Frontend Layer
- **Next.js 14**: React + TypeScript
- **Vercel**: 무료 배포 + CDN
- **TailwindCSS**: UI 프레임워크
- **PWA**: 모바일 앱 경험

### Backend Layer  
- **Supabase Edge Functions**: 서버리스 API
- **PostgreSQL**: 사용자/제품 데이터 (500MB)
- **Supabase Auth**: 소셜 로그인
- **Supabase Storage**: 이미지 저장 (1GB)

### AI/ML Services
- **Tesseract.js**: 클라이언트 사이드 OCR
- **Google Vision API**: 백업 OCR (1000건/월)
- **HuggingFace**: 텍스트 분석 모델
- **OpenAI GPT-3.5**: 성분 해석 (제한적)

## Database Schema (PostgreSQL)

### Users Table
```sql
users (
  id uuid PRIMARY KEY,
  email text UNIQUE,
  skin_type jsonb,        -- 피부타입 정보
  preferences jsonb,      -- 선호/기피 성분
  created_at timestamp
)
```

### Products Table  
```sql
products (
  id uuid PRIMARY KEY,
  name text,
  brand text,
  ingredients jsonb,      -- 성분 리스트
  safety_score integer,   -- 안전성 점수
  image_url text,
  created_at timestamp
)
```

### Analyses Table
```sql
analyses (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  product_id uuid REFERENCES products(id),
  image_url text,         -- 사용자 업로드 이미지
  ocr_result jsonb,       -- OCR 결과
  analysis_result jsonb,  -- AI 분석 결과
  created_at timestamp
)
```

## API Design

### Core Endpoints
```
POST /api/analyze-image    # 이미지 분석
GET  /api/products/search  # 제품 검색
POST /api/user/profile     # 프로필 설정
GET  /api/recommendations  # 개인화 추천
```

### Edge Functions Structure
```
supabase/functions/
├── analyze-image/         # OCR + 성분 분석
├── search-products/       # 제품 검색
├── get-recommendations/   # 개인화 추천
└── crawl-products/        # 제품 정보 크롤링
```

## Performance Optimization

### 클라이언트 최적화
- **이미지 압축**: 업로드 전 리사이징
- **캐싱**: Next.js SWR로 데이터 캐싱
- **Lazy Loading**: 이미지/컴포넌트 지연 로딩

### 서버 최적화  
- **Connection Pooling**: Supabase 기본 제공
- **Query Optimization**: 인덱스 최적화
- **Edge Caching**: Vercel Edge Network

## Security & Privacy

### 데이터 보호
- **Supabase RLS**: Row Level Security
- **이미지 암호화**: 업로드 시 자동 암호화  
- **GDPR 준수**: 사용자 데이터 삭제 지원

### API 보안
- **JWT 토큰**: Supabase Auth
- **Rate Limiting**: Edge Functions 내장
- **CORS 설정**: 도메인 제한

## Monitoring & Analytics

### 무료 모니터링
- **Supabase Dashboard**: DB 상태 모니터링
- **Vercel Analytics**: 성능 모니터링
- **Google Analytics**: 사용자 행동 분석

### 핵심 KPIs
- **OCR 정확도**: 성분 인식률
- **응답 시간**: API 레이턴시  
- **사용자 만족도**: 분석 결과 평점

## Scalability Plan

### 무료 → 유료 전환점
- **DB 용량**: 500MB → 2GB (월 $25)
- **Function 호출**: 500K → 2M (월 $25)
- **Storage**: 1GB → 100GB (월 $10)

### 마이그레이션 계획
```
Phase 1: 완전 무료 (1K 사용자)
Phase 2: 부분 유료 (10K 사용자, 월 $60)
Phase 3: 전용 서버 (100K 사용자, 월 $500)
```

---
*기술 아키텍처 v1.0 - 2025-09-18*
