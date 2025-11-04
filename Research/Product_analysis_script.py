# 사용자 요구사항에 맞춘 정확한 서비스 모델 재정의

print("=== CosmicScan 서비스 핵심 목표 재정의 ===")

# 1. 핵심 기능 우선순위 (사용자 요구사항 기반)
core_features = {
    '기능명': [
        '이미지 OCR 제품인식',
        '성분 유해성 분석', 
        '성분 유익성 분석',
        '글로벌 인증 정보',
        '유사제품 추천',
        '함께 사용하면 좋은 제품',
        '같이 사용하면 안되는 제품',
        '최저가 판매처 검색',
        '가격 비교 시스템',
        '제품 성분 데이터베이스',
        '안전성 점수 계산',
        '제품 리뷰 시스템'
    ],
    '필수도': [10, 10, 9, 8, 9, 8, 9, 7, 7, 10, 9, 6],
    '개발난이도': [7, 8, 7, 6, 8, 9, 9, 8, 7, 9, 6, 5],
    'MVP_단계': ['1단계', '1단계', '1단계', '2단계', '2단계', '2단계', '2단계', '3단계', '3단계', '1단계', '1단계', '3단계'],
    '예상개발일': [5, 7, 5, 4, 6, 8, 8, 10, 6, 10, 3, 4]
}

import pandas as pd
df_core = pd.DataFrame(core_features)
df_core.to_csv('cosmicscan_core_features_utf8.csv', index=False, encoding='utf-8')
print("✅ cosmicscan_core_features_utf8.csv 생성")

# 2. 성분 분석 카테고리 정의
ingredient_analysis = {
    '분석카테고리': [
        '유해성분', '알레르기유발', '자극성분', '발암물질', '환경호르몬',
        '유익성분', '보습성분', '안티에이징', '미백성분', '진정성분',
        '글로벌인증', 'FDA승인', 'EMA승인', 'KFDA승인', '유기농인증'
    ],
    '중요도': [10, 9, 8, 10, 8, 8, 9, 7, 7, 8, 7, 8, 7, 9, 6],
    '데이터소스': [
        'EWG Database', 'INCI Dictionary', '식약처 DB', 'IARC DB', 'EU SCCS',
        '성분사전', '기능성화장품 DB', '미백기능 DB', '미백기능 DB', '진정성분 DB',
        'FDA DB', 'FDA DB', 'EMA DB', '식약처 DB', '유기농인증기관'
    ],
    '구현복잡도': [8, 7, 6, 9, 8, 6, 5, 7, 7, 5, 9, 8, 8, 7, 6]
}

df_analysis = pd.DataFrame(ingredient_analysis)
df_analysis.to_csv('ingredient_analysis_categories_utf8.csv', index=False, encoding='utf-8')
print("✅ ingredient_analysis_categories_utf8.csv 생성")

# 3. 제품 추천 시스템 로직
recommendation_logic = {
    '추천타입': [
        '유사제품_동일브랜드',
        '유사제품_다른브랜드', 
        '함께사용_보완성분',
        '함께사용_시너지효과',
        '사용금지_성분충돌',
        '사용금지_과다사용위험',
        '대체제품_저자극',
        '대체제품_고기능'
    ],
    '추천기준': [
        '주성분 유사도 80% 이상',
        '기능 카테고리 동일 + 성분 유사도 70%',
        '부족한 성분 보완 (보습+유분)',
        '상호 효과 증진 (비타민C+비타민E)',
        '반응 위험성 (AHA+BHA 동시사용)',
        '농도 과다 위험 (레티놀 중복)',
        '민감성 피부용 순한 성분',
        '효과 강화 버전'
    ],
    '신뢰도': [90, 85, 80, 75, 95, 90, 85, 80],
    '구현난이도': [6, 7, 8, 9, 8, 7, 6, 7]
}

df_recommendation = pd.DataFrame(recommendation_logic)
df_recommendation.to_csv('recommendation_system_logic_utf8.csv', index=False, encoding='utf-8')
print("✅ recommendation_system_logic_utf8.csv 생성")

# 4. 가격비교 시스템 설계
price_comparison = {
    '판매처': [
        '올리브영', '세포라', '롯데백화점', 'GS25', '편의점',
        '쿠팡', '11번가', 'G마켓', '옥션', '티몬',
        '공식몰', '브랜드직영몰', '면세점온라인', '해외직구'
    ],
    '크롤링난이도': [7, 8, 6, 5, 5, 8, 7, 7, 7, 6, 6, 5, 8, 9],
    '데이터신뢰도': [9, 9, 8, 7, 7, 8, 8, 8, 7, 7, 10, 9, 8, 6],
    '업데이트주기': ['일 2회', '일 1회', '일 1회', '주 1회', '주 1회', '실시간', '실시간', '실시간', '실시간', '실시간', '실시간', '실시간', '일 1회', '주 1회'],
    '법적이슈': ['없음', '없음', '없음', '없음', '없음', '없음', '없음', '없음', '없음', '없음', '없음', '없음', '주의', '높음']
}

df_price = pd.DataFrame(price_comparison)
df_price.to_csv('price_comparison_sources_utf8.csv', index=False, encoding='utf-8')
print("✅ price_comparison_sources_utf8.csv 생성")

print("\n=== 사용자 요구사항 반영 완료 ===")
print("총 4개 CSV 파일이 새로 생성되었습니다.")
print("1. 핵심 기능 우선순위")
print("2. 성분 분석 카테고리") 
print("3. 추천 시스템 로직")
print("4. 가격비교 시스템")