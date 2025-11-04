# CosmicScan 제품 외형 인식 시스템 - 정확도 최적화 설계

## 🎯 제품 외형 DB 구축 전략

### 핵심 과제 해결
사용자가 지적하신 **"유사한 제품 외형에 오정보를 주는 일이 없어야 한다"**는 핵심 과제를 해결하기 위해 **최소한의 정보로 정확도를 확보하는 알고리즘**을 설계했습니다.

### 제품 외형 DB 필요성
1. **OCR 보완**: 성분표가 보이지 않거나 흐릿한 경우 외형으로 제품 식별
2. **사용자 편의성**: 제품 전체 사진만으로도 즉시 분석 가능
3. **정확성 향상**: 외형 + 성분 정보 교차검증으로 신뢰도 극대화
4. **확장성**: 향후 브랜드 협력 시 제품 등록 자동화

## 🏗️ Supabase 기반 제품 외형 DB 스키마

### 제품 외형 테이블 설계
```sql
-- 제품 외형 마스터 테이블
product_visuals (
  id uuid PRIMARY KEY,
  product_id uuid REFERENCES products(id),
  
  -- 형태 특징
  shape_category text, -- 'tube', 'bottle', 'jar', 'compact', 'stick'
  shape_ratio numeric, -- 가로:세로 비율
  package_type text,   -- 'plastic', 'glass', 'metal', 'paper'
  
  -- 색상 특징 (HSV 색상공간)
  primary_color_h integer,   -- 주색상 Hue (0-360)
  primary_color_s integer,   -- 주색상 Saturation (0-100)  
  primary_color_v integer,   -- 주색상 Value (0-100)
  secondary_colors jsonb,    -- 보조색상들 [{h,s,v}, ...]
  
  -- 브랜드 식별 요소
  logo_position text,        -- 'top', 'center', 'bottom', 'side'
  logo_size_ratio numeric,   -- 로고 크기 비율 (0.0-1.0)
  brand_text_style text,     -- 'serif', 'sans-serif', 'script', 'display'
  
  -- 고유 특징점 (SIFT/ORB 특징)
  feature_descriptors bytea, -- 특징점 디스크립터 (바이너리)
  feature_keypoints jsonb,   -- 특징점 좌표 배열
  
  -- 메타데이터
  confidence_score numeric DEFAULT 0.0, -- 인식 신뢰도
  validation_count integer DEFAULT 0,   -- 검증 횟수
  created_at timestamp DEFAULT now()
);

-- 제품 외형 유사도 매트릭스
visual_similarity_matrix (
  id uuid PRIMARY KEY,
  product_a_id uuid REFERENCES products(id),
  product_b_id uuid REFERENCES products(id),
  similarity_score numeric, -- 0.0-1.0 유사도
  difference_factors jsonb, -- 차이점 상세 정보
  risk_level text CHECK (risk_level IN ('low', 'medium', 'high')),
  created_at timestamp DEFAULT now()
);

-- 오판 방지 규칙
misidentification_rules (
  id uuid PRIMARY KEY,
  rule_name text,
  condition_json jsonb,    -- 조건 (브랜드, 카테고리, 형태 등)
  action text,             -- 'block', 'warn', 'require_confirmation'
  confidence_penalty numeric DEFAULT 0.0, -- 신뢰도 감점
  created_at timestamp DEFAULT now()
);
```

## 🤖 제품 외형 인식 알고리즘

### 1단계: 다중 특징 추출 (Multi-Feature Extraction)

```typescript
// Supabase Edge Function: 제품 외형 분석
export async function analyzeProductVisual(imageBuffer: ArrayBuffer) {
  const features = {
    // 1. 형태 분석 (OpenCV.js)
    shape: await extractShapeFeatures(imageBuffer),
    
    // 2. 색상 분석 (HSV 히스토그램)
    colors: await extractColorFeatures(imageBuffer),
    
    // 3. 브랜드 요소 (OCR + 위치 분석)
    brand: await extractBrandFeatures(imageBuffer),
    
    // 4. 특징점 (SIFT/ORB)
    keypoints: await extractKeypoints(imageBuffer)
  }
  
  return features
}

// 형태 특징 추출
async function extractShapeFeatures(image) {
  return {
    category: classifyShape(image),     // CNN 기반 형태 분류
    ratio: calculateAspectRatio(image), // 가로:세로 비율
    contours: extractContours(image),   // 윤곽선 정보
    symmetry: analyzeSymmetry(image)    // 대칭성 분석
  }
}

// 색상 특징 추출 (HSV 색상공간 활용)
async function extractColorFeatures(image) {
  const hsvImage = convertToHSV(image)
  return {
    dominant: findDominantColors(hsvImage, 3), // 상위 3개 색상
    histogram: calculateHistogram(hsvImage),   // HSV 히스토그램
    distribution: analyzeColorDistribution(hsvImage) // 색상 분포
  }
}
```

### 2단계: 6단계 검증 프로세스

```yaml
1차_형태분류: CNN 기반 형태 분류 (신뢰도 85% 이상)
2차_색상매칭: HSV 색상공간 분석 (색차 ΔE < 3)  
3차_브랜드식별: SIFT/ORB 특징점 매칭 (90% 이상)
4차_크기검증: 비율 기반 크기 추정 (오차 ±15%)
5차_텍스처확인: LBP 텍스처 분석 (65% 이상)
6차_종합판단: 가중치 기반 종합점수 (80% 이상)
```

### 3단계: 유사제품 오판 방지 시스템

```typescript
// 오판 위험 체크 함수
async function checkMisidentificationRisk(candidateProduct, extractedFeatures) {
  const risks = []
  
  // 1. 동일 패키지 형태 체크
  if (candidateProduct.shape_category === extractedFeatures.shape.category) {
    const brandDiff = compareBrands(candidateProduct.brand, extractedFeatures.brand)
    if (brandDiff > 0.8) { // 브랜드가 다른데 형태가 같음
      risks.push({
        type: 'same_package_different_brand',
        severity: 'high',
        confidence_penalty: 0.3
      })
    }
  }
  
  // 2. 색상 유사도 체크  
  const colorSimilarity = calculateColorSimilarity(
    candidateProduct.colors, 
    extractedFeatures.colors
  )
  if (colorSimilarity > 0.9 && brandDiff > 0.7) {
    risks.push({
      type: 'similar_colors_different_product',
      severity: 'medium', 
      confidence_penalty: 0.15
    })
  }
  
  // 3. 시리즈 제품 구분
  const seriesRisk = checkProductSeries(candidateProduct, extractedFeatures)
  if (seriesRisk.detected) {
    risks.push(seriesRisk)
  }
  
  return risks
}

// 최종 매칭 결정 로직
async function finalizeProductMatch(candidates, risks) {
  return candidates.map(candidate => {
    let finalScore = candidate.base_confidence
    
    // 위험 요소별 신뢰도 감점
    risks.forEach(risk => {
      finalScore -= risk.confidence_penalty
    })
    
    // 추가 검증 필요 여부
    const requiresConfirmation = risks.some(r => r.severity === 'high')
    
    return {
      ...candidate,
      final_confidence: Math.max(0, finalScore),
      requires_confirmation: requiresConfirmation,
      risk_factors: risks
    }
  }).sort((a, b) => b.final_confidence - a.final_confidence)
}
```

## 📊 최소 정보로 최대 정확도 확보 전략

### 핵심 7가지 정보 (정확도 기여도 순)

1. **브랜드 로고** (30%): SIFT 특징점 + OCR 조합
2. **제품명 텍스트** (25%): OCR 텍스트 추출 + 유사도 비교  
3. **패키지 형태** (20%): CNN 기반 형태 분류
4. **주색상** (10%): HSV 히스토그램 매칭
5. **용량 표시** (8%): OCR 숫자 인식
6. **제품 카테고리** (5%): 분류 모델 추론
7. **특징적 디자인** (2%): 고유 특징점 매칭

### 데이터 최적화 전략

```yaml
이미지_압축: WebP 포맷, 품질 80%, 최대 500KB
특징점_압축: 상위 100개 키포인트만 저장
색상_압축: 대표 색상 5개만 HSV 값으로 저장
메타데이터: JSON 압축으로 50KB 이하 유지

총_데이터크기: 제품당 평균 800KB
검색_속도: 평균 300ms 이하 (Supabase 쿼리 최적화)
정확도_목표: 95% 이상 (오판율 5% 미만)
```

## 🛡️ 오정보 방지 메커니즘

### 1. 다단계 검증 시스템
```yaml
Level_1: 자동 매칭 (신뢰도 95% 이상)
Level_2: 경고 표시 (신뢰도 80-95%)  
Level_3: 수동 확인 (신뢰도 80% 미만)
Level_4: 매칭 실패 (대안 검색 제공)
```

### 2. 사용자 피드백 학습
```sql
-- 사용자 피드백 테이블
user_feedback (
  id uuid PRIMARY KEY,
  user_id uuid,
  matched_product_id uuid,
  actual_product_id uuid,
  feedback_type text, -- 'correct', 'incorrect', 'similar_but_different'
  confidence_before numeric,
  created_at timestamp DEFAULT now()
);

-- 피드백 기반 신뢰도 조정
UPDATE product_visuals 
SET confidence_score = confidence_score * 0.9 
WHERE id IN (
  SELECT matched_product_id 
  FROM user_feedback 
  WHERE feedback_type = 'incorrect'
  AND created_at > now() - interval '30 days'
);
```

### 3. 실시간 품질 모니터링
```typescript
// 품질 지표 실시간 추적
interface QualityMetrics {
  daily_accuracy: number        // 일간 정확도
  false_positive_rate: number   // 오탐지율  
  false_negative_rate: number   // 미탐지율
  user_satisfaction: number     // 사용자 만족도
  avg_confidence: number        // 평균 신뢰도
}

// 품질이 임계값 이하로 떨어지면 자동 알림
if (metrics.daily_accuracy < 0.9) {
  await sendAlert('accuracy_degradation', metrics)
  await triggerModelRetraining()
}
```

## 🚀 구현 로드맵

### Week 1-2: 기본 인프라 구축
- Supabase 테이블 스키마 생성
- 기본 이미지 처리 파이프라인 구축  
- 100개 제품 샘플 데이터 수집

### Week 3-4: 알고리즘 구현
- 형태/색상/브랜드 특징 추출기 개발
- SIFT/ORB 특징점 매칭 시스템
- 오판 방지 규칙 엔진 구현

### Week 5-6: 검증 및 최적화
- 1000개 제품 데이터로 정확도 테스트
- 사용자 피드백 시스템 구축
- 성능 최적화 (응답시간 300ms 이하)

이 시스템을 통해 **최소한의 시각 정보**로도 **95% 이상의 정확도**를 확보하면서, **유사 제품 오판을 방지**하는 견고한 제품 외형 인식 시스템을 구축할 수 있습니다. 특히 Supabase의 **PostgreSQL + Edge Functions**를 활용하여 무료 환경에서도 엔터프라이즈급 성능을 달성할 수 있도록 설계했습니다.