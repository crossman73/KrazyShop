# 🏗️ CosmicScan 서비스 모델 & 마이크로서비스 아키텍처

## 서비스 모델 분화

### 🎯 B2C 서비스 (사용자 사이트)
```
개인 사용자 (Free)
├── 기본 성분 분석 (월 10회 제한)
├── 기본 안전성 점수
├── 커뮤니티 참여 (리뷰 읽기)
└── 기본 제품 검색

프리미엄 사용자 ($4.99/월)  
├── 무제한 성분 분석
├── AI 개인화 추천
├── 상세 성분 해석
├── 제품 비교 (최대 5개)
├── 트렌드 인사이트
└── 커뮤니티 풀 액세스

VIP 사용자 ($9.99/월)
├── 프리미엄 모든 기능
├── 전문가 상담 (월 2회)
├── 맞춤 성분 알림
├── API 접근 (제한적)
└── 우선 고객지원
```

### 🏢 B2B 서비스 (기업 사이트)
```
Starter ($99/월)
├── 브랜드 제품 분석 리포트
├── 경쟁사 비교 분석
├── 월간 시장 트렌드
└── 기본 API (1000 calls/월)

Professional ($499/월)
├── Starter 모든 기능  
├── 소비자 인사이트 대시보드
├── 커스텀 분석 리포트
├── API 확장 (10K calls/월)
└── 전담 어카운트 매니저

Enterprise ($1,999/월)
├── Professional 모든 기능
├── 화이트라벨 솔루션
├── 온프레미스 배포 옵션
├── 무제한 API 접근
├── 24/7 기술 지원
└── 커스텀 개발 지원
```

### 🛠️ 관리자 사이트 (Internal)
```
운영 관리
├── 사용자 관리 (가입/탈퇴/정지)
├── 콘텐츠 관리 (제품/리뷰/신고)
├── 시스템 모니터링 (성능/오류)
└── 고객 지원 (티켓/FAQ)

데이터 관리
├── 제품 데이터베이스 관리
├── 성분 안전성 DB 업데이트
├── 크롤링 스케줄 관리
└── AI 모델 훈련/배포

비즈니스 인텔리전스
├── KPI 대시보드 (MAU/MRR/Churn)
├── 수익 분석 (구독/API/B2B)
├── 사용자 행동 분석
└── 경쟁사 모니터링
```

## 🏗️ 마이크로서비스 아키텍처

### Core Services (핵심 서비스)
```
user-service          # 회원 관리
├── 사용자 인증/인가
├── 프로필 관리  
├── 구독 상태 관리
└── 권한 관리

community-service     # 커뮤니티
├── 리뷰/평점 관리
├── 토론/댓글 시스템
├── 좋아요/북마크
└── 신고/모더레이션

payment-service       # 결제 관리
├── 구독 결제 (Stripe)
├── 사용량 기반 과금
├── 환불/취소 처리
└── 빌링 히스토리

analysis-service      # 성분 분석
├── OCR 이미지 처리
├── 성분 매칭/분석
├── AI 개인화 추천
└── 분석 결과 저장

product-service       # 제품 관리
├── 제품 데이터베이스
├── 브랜드 정보 관리
├── 제품 검색/필터
└── 크롤링 데이터 수집
```

### Data & Analytics Services
```
data-aggregation      # 데이터 집계
├── 사용자 행동 데이터 수집
├── 성분 분석 결과 집계  
├── 제품 인기도/트렌드
└── 실시간 통계 생성

insights-service      # 인사이트 생성
├── 시장 트렌드 분석
├── 소비자 선호도 분석
├── 브랜드 성과 분석
└── 예측 모델링

reporting-service     # 리포팅
├── B2B 커스텀 리포트
├── 관리자 대시보드
├── KPI 모니터링
└── 알림/경고 시스템
```

### Infrastructure Services  
```
api-gateway          # API 관리
├── 라우팅/로드밸런싱
├── 인증/인가 검증
├── 요청 제한/쿼터  
├── API 버전 관리
└── 모니터링/로깅

notification-service # 알림 관리  
├── 이메일 발송
├── 푸시 알림
├── SMS 발송
└── 인앱 알림

file-service         # 파일 관리
├── 이미지 업로드/저장
├── 이미지 최적화/CDN
├── 파일 보안/암호화
└── 백업/복구
```

## 🌐 멀티 사이트 구조

### Frontend Applications
```
B2C Web App (Next.js)
├── 도메인: app.cosmicscan.com
├── 사용자 화장품 분석 UI
├── 커뮤니티 인터랙션
└── 개인 대시보드

B2B Dashboard (Next.js)  
├── 도메인: business.cosmicscan.com
├── 브랜드 인사이트 대시보드
├── API 사용량 모니터링
└── 커스텀 리포트 생성

Admin Panel (Next.js)
├── 도메인: admin.cosmicscan.com  
├── 운영 관리 도구
├── 데이터 관리 인터페이스
└── BI 대시보드

Mobile App (React Native)
├── iOS/Android 네이티브
├── 카메라 OCR 최적화
├── 오프라인 모드 지원
└── 푸시 알림
```

## 🔧 무료 환경 POC 구현 전략

### Phase 1: Core MVP (무료 환경)
```
Supabase 기반 통합 서비스
├── PostgreSQL: 모든 데이터 통합
├── Supabase Auth: 통합 인증
├── Edge Functions: 마이크로서비스 시뮬레이션  
├── Storage: 이미지/파일 관리
└── Realtime: 커뮤니티 실시간 기능

Vercel 멀티 사이트 배포
├── app.cosmicscan.com (B2C)
├── admin.cosmicscan.com (관리자)
├── api.cosmicscan.com (API Gateway)
└── 서브도메인 기반 라우팅
```

### Phase 2: 투자 후 확장
```
AWS/GCP 마이크로서비스 분리
├── Kubernetes/Docker 컨테이너화
├── 서비스별 독립 데이터베이스
├── API Gateway (Kong/AWS API Gateway)
├── 메시지 큐 (Redis/RabbitMQ)
└── 모니터링 (Datadog/New Relic)

독립 결제/보안 시스템
├── Stripe Connect 멀티 테넌트
├── OAuth 2.0/JWT 표준화
├── GDPR/SOC2 컴플라이언스
└── 데이터 파이프라인 (Kafka)
```

## 💾 데이터 아키텍처

### 데이터베이스 분리 전략
```
User Database (PostgreSQL)
├── 사용자 프로필/인증
├── 구독/결제 정보
├── 개인 설정/선호도
└── 활동 로그

Product Database (MongoDB)  
├── 제품 정보/메타데이터
├── 성분 데이터베이스
├── 브랜드 정보
└── 크롤링 데이터

Analytics Database (ClickHouse/BigQuery)
├── 사용자 행동 이벤트
├── 성분 분석 결과
├── 비즈니스 메트릭
└── A/B 테스트 데이터

Cache Layer (Redis)
├── 세션 저장
├── API 응답 캐시
├── 실시간 데이터
└── 메시지 큐
```

---
*서비스 모델 & 아키텍처 설계 v1.0 - 2025-09-18*
