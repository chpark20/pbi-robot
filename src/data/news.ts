import type { NewsCategory, L10n } from "@/types";

interface RawNewsItem {
  id: string;
  slug: string;
  date: string;
  category: NewsCategory;
  thumbnail: string;
  title: L10n;
  summary: L10n;
  content: L10n;
}

export interface ResolvedNewsItem {
  id: string;
  slug: string;
  date: string;
  category: NewsCategory;
  thumbnail: string;
  title: string;
  summary: string;
  content: string;
}

const rawNews: RawNewsItem[] = [
  // ── 1. Press ──────────────────────────────────────────────────
  {
    id: "news-2026-05",
    slug: "aquasense-2-ultra-launch",
    date: "2026-05-15",
    category: "press",
    thumbnail: "/images/news/aquasense-2-ultra-launch.jpg",
    title: {
      ko: "AquaSense 2 Ultra 공식 출시 — UV 살균 탑재 수영장 로봇",
      en: "AquaSense 2 Ultra Officially Launched — Pool Robot with UV Sterilization",
    },
    summary: {
      ko: "PBI Robot이 UV-C 살균 기능과 듀얼 AI 카메라를 탑재한 프리미엄 수영장 청소 로봇 AquaSense 2 Ultra를 공식 출시했습니다.",
      en: "PBI Robot has officially launched the AquaSense 2 Ultra, a premium pool cleaning robot equipped with UV-C sterilization and dual AI cameras.",
    },
    content: {
      ko: `PBI Robot(대표 홍길동)은 2026년 5월 15일 UV-C 살균 기능과 쌍안 AI 카메라를 탑재한 프리미엄 수영장 청소 로봇 'AquaSense 2 Ultra'를 공식 출시했습니다.

AquaSense 2 Ultra는 기존 AquaSense 2 Pro 대비 청소 면적이 20% 향상된 최대 600m²를 지원하며, 새롭게 탑재된 AI 오염 감지 알고리즘은 조류·이물질·화학물질 잔류를 실시간으로 분석합니다.

주요 사양으로는 듀얼 카메라(RGB + 적외선), 40,000mAh 대용량 배터리, 5G 원격 모니터링, UV-C 살균 모듈, IPX8 방수 등급 등이 있습니다. 국내 출시가는 3,200만원이며, 공식 파트너사를 통해 구매 가능합니다.

PBI Robot 관계자는 "AquaSense 2 Ultra는 단순한 청소를 넘어 수질 위생까지 책임지는 올인원 솔루션"이라며 "국내외 고급 리조트 및 스포츠 시설을 주요 타겟으로 마케팅을 전개할 계획"이라고 밝혔습니다.`,
      en: `PBI Robot (CEO Gildong Hong) announced on May 15, 2026 the official launch of 'AquaSense 2 Ultra', a premium pool cleaning robot equipped with UV-C sterilization and dual AI cameras.

The AquaSense 2 Ultra supports pools up to 600m², a 20% improvement over the existing AquaSense 2 Pro, and the newly integrated AI contamination detection algorithm analyzes algae, debris, and chemical residues in real time.

Key specifications include dual cameras (RGB + infrared), 40,000mAh high-capacity battery, 5G remote monitoring, UV-C sterilization module, and IPX8 waterproof rating. The domestic price is KRW 32 million, available through official partner companies.

A PBI Robot spokesperson said, "The AquaSense 2 Ultra is an all-in-one solution that goes beyond simple cleaning to take responsibility for water hygiene," adding that they plan to target premium domestic and international resorts and sports facilities.`,
    },
  },

  // ── 2. Award ──────────────────────────────────────────────────
  {
    id: "news-2026-04",
    slug: "ces-2026-award",
    date: "2026-04-20",
    category: "award",
    thumbnail: "/images/news/ces-2026.jpg",
    title: {
      ko: "CES 2026 혁신상 수상 — SORA 70 로봇 청소 부문",
      en: "CES 2026 Innovation Award — SORA 70 Robot Cleaning Category",
    },
    summary: {
      ko: "PBI Robot의 SORA 70이 세계 최대 가전·IT 전시회 CES 2026에서 로봇 청소 부문 혁신상을 수상했습니다.",
      en: "PBI Robot's SORA 70 won the Innovation Award in the robot cleaning category at CES 2026, the world's largest consumer electronics show.",
    },
    content: {
      ko: `미국 라스베가스에서 개최된 CES 2026에서 PBI Robot의 건물 외벽 청소 로봇 SORA 70이 로봇 청소 부문 혁신상(Innovation Award)을 수상했습니다.

CES 혁신상은 세계 최대 IT·가전 전시회인 CES에서 기술적 혁신성, 실용성, 디자인 완성도를 기준으로 심사하는 권위 있는 상입니다. 올해 로봇 청소 부문에는 전 세계 47개 기업이 출품했으며, SORA 70은 그 중 유일하게 혁신상을 수상한 한국 기업 제품이 되었습니다.

심사위원회는 "SORA 70의 AI 기반 표면 인식 기술과 초고층 빌딩에서도 안정적으로 동작하는 자기력 부착 시스템이 기존 제품과 차별화된 혁신을 이루었다"고 수상 이유를 밝혔습니다.

PBI Robot은 이번 수상을 계기로 북미 및 유럽 시장 진출을 본격화할 계획이며, 2026년 하반기 글로벌 파트너십 체결을 목표로 하고 있습니다.`,
      en: `At CES 2026 held in Las Vegas, USA, PBI Robot's building facade cleaning robot SORA 70 won the Innovation Award in the robot cleaning category.

The CES Innovation Award is a prestigious award at the world's largest IT and consumer electronics show, judged on technological innovation, practicality, and design quality. This year, 47 companies worldwide submitted products in the robot cleaning category, and SORA 70 became the only Korean product to win the Innovation Award.

The judging committee noted, "SORA 70's AI-based surface recognition technology and magnetic attachment system that operates stably even in ultra-high-rise buildings achieved differentiated innovation from existing products."

PBI Robot plans to accelerate its entry into the North American and European markets following this award, with a goal of establishing global partnerships in the second half of 2026.`,
    },
  },

  // ── 3. Press ──────────────────────────────────────────────────
  {
    id: "news-2026-03",
    slug: "hiwonder-curriculum-v2",
    date: "2026-03-10",
    category: "press",
    thumbnail: "/images/news/hiwonder-curriculum.jpg",
    title: {
      ko: "HiWonder EDU 커리큘럼 v2.0 — ROS2 Jazzy + YOLO v9 추가",
      en: "HiWonder EDU Curriculum v2.0 — ROS2 Jazzy + YOLO v9 Added",
    },
    summary: {
      ko: "교육용 로봇 HiWonder EDU의 커리큘럼이 v2.0으로 업데이트되었습니다. ROS2 Jazzy와 YOLO v9 객체 인식 모듈이 새롭게 추가됩니다.",
      en: "The curriculum for the educational robot HiWonder EDU has been updated to v2.0. New ROS2 Jazzy and YOLO v9 object recognition modules have been added.",
    },
    content: {
      ko: `PBI Robot은 교육용 로봇 플랫폼 HiWonder EDU의 커리큘럼을 v2.0으로 업데이트한다고 발표했습니다.

커리큘럼 v2.0의 주요 변경 사항은 다음과 같습니다.

■ ROS2 Jazzy 지원: 기존 ROS2 Humble에서 최신 LTS 버전인 Jazzy로 마이그레이션 가이드 제공
■ YOLO v9 통합: 실시간 객체 인식(사람, 장애물, 표지판) 심화 과정 신설
■ Nav2 고급 과정: 동적 장애물 회피, 다중 목표 경로 계획 실습
■ 클라우드 연동: AWS RoboMaker 기반 시뮬레이션 환경 실습 과정 추가

v2.0 커리큘럼은 2026년 3월부터 전국 30개 협력 대학 및 고등학교에 배포되며, 기존 구매 고객에게도 무상으로 제공됩니다.`,
      en: `PBI Robot announced the update of the curriculum for the educational robot platform HiWonder EDU to v2.0.

The main changes in curriculum v2.0 are as follows:

■ ROS2 Jazzy Support: Migration guide from existing ROS2 Humble to the latest LTS version, Jazzy
■ YOLO v9 Integration: New advanced course for real-time object recognition (people, obstacles, signs)
■ Advanced Nav2 Course: Hands-on practice with dynamic obstacle avoidance and multi-goal path planning
■ Cloud Integration: Added practice course based on AWS RoboMaker simulation environment

The v2.0 curriculum will be distributed to 30 partner universities and high schools nationwide from March 2026, and will also be provided free of charge to existing customers.`,
    },
  },

  // ── 4. Press ──────────────────────────────────────────────────
  {
    id: "news-2025-12",
    slug: "series-b-funding",
    date: "2025-12-05",
    category: "press",
    thumbnail: "/images/news/funding.jpg",
    title: {
      ko: "PBI Robot, 시리즈 B 투자 150억 유치 성공",
      en: "PBI Robot Successfully Raises KRW 15 Billion in Series B Funding",
    },
    summary: {
      ko: "PBI Robot이 국내외 주요 VC로부터 총 150억 원 규모의 시리즈 B 투자를 유치했습니다. 글로벌 시장 진출과 R&D 확대에 활용할 예정입니다.",
      en: "PBI Robot has secured a total of KRW 15 billion in Series B investment from major domestic and international VCs, to be used for global market expansion and R&D.",
    },
    content: {
      ko: `PBI Robot은 2025년 12월 국내 KVentures와 글로벌 TechBridge Capital로부터 총 150억 원의 시리즈 B 투자를 유치했다고 발표했습니다.

이번 투자는 회사 설립 이후 최대 규모로, 주요 투자자로는 KVentures(60억), TechBridge Capital(50억), 미래에셋벤처투자(40억)가 참여했습니다.

조달된 자금은 ▲글로벌 세일즈 네트워크 구축(북미·유럽·동남아) ▲R&D 인력 확충(로보틱스·AI·임베디드) ▲스마트 팩토리 증설 ▲신제품 개발 등에 활용될 예정입니다.

PBI Robot 홍길동 대표는 "이번 투자를 발판으로 2027년 IPO를 목표로 하겠다"며 "글로벌 청소 로봇 시장에서 확고한 입지를 다지겠다"고 밝혔습니다.`,
      en: `PBI Robot announced in December 2025 that it has secured a total of KRW 15 billion in Series B investment from domestic KVentures and global TechBridge Capital.

This investment is the largest since the company's founding. Key investors include KVentures (KRW 6 billion), TechBridge Capital (KRW 5 billion), and Mirae Asset Venture Investment (KRW 4 billion).

The raised funds will be used for ▲building a global sales network (North America, Europe, Southeast Asia) ▲expanding R&D workforce (robotics, AI, embedded systems) ▲expanding smart factory capacity ▲new product development.

PBI Robot CEO Gildong Hong stated, "We will aim for an IPO in 2027 based on this investment," adding, "We will solidify our position in the global cleaning robot market."`,
    },
  },

  // ── 5. Exhibition ─────────────────────────────────────────────
  {
    id: "news-2025-10",
    slug: "korea-robot-expo-2025",
    date: "2025-10-15",
    category: "exhibition",
    thumbnail: "/images/news/robot-expo.jpg",
    title: {
      ko: "2025 대한민국 로봇 산업 대전 참가",
      en: "2025 Korea Robot Industry Exhibition Participation",
    },
    summary: {
      ko: "PBI Robot이 일산 KINTEX에서 개최되는 2025 대한민국 로봇 산업 대전에 참가합니다. AquaSense 2와 SORA 전 라인업을 직접 체험하실 수 있습니다.",
      en: "PBI Robot participates in the 2025 Korea Robot Industry Exhibition at KINTEX, Ilsan. Experience the full lineup of AquaSense 2 and SORA series in person.",
    },
    content: {
      ko: `PBI Robot이 2025년 10월 15일(수)부터 18일(토)까지 일산 KINTEX에서 개최되는 '2025 대한민국 로봇 산업 대전'에 참가합니다.

■ 전시 부스: B홀 307호 (PBI Robot 전용 체험 부스)
■ 전시 기간: 2025년 10월 15일(수) ~ 18일(토), 10:00 ~ 18:00
■ 관람 무료

부스에서 체험 가능한 제품:
• AquaSense 2 Pro / Ultra — 수영장 청소 로봇 수중 시연
• SORA 70 / 30 / 10 — 건물 외벽 청소 로봇 라이브 데모
• HiWonder EDU — 로봇 코딩 체험 프로그램 (사전 예약 필수)
• AKERF — 수질 측정 로봇 실시간 데모

전시 기간 중 현장 구매 계약 체결 시 특별 할인(최대 15%)과 무상 설치 서비스를 제공합니다. 상담 예약은 공식 홈페이지에서 가능합니다.`,
      en: `PBI Robot will participate in the '2025 Korea Robot Industry Exhibition' held at KINTEX, Ilsan from Wednesday, October 15 to Saturday, October 18, 2025.

■ Exhibition Booth: Hall B, #307 (PBI Robot dedicated experience booth)
■ Exhibition Period: Oct. 15 (Wed) – Oct. 18 (Sat), 2025, 10:00 – 18:00
■ Free admission

Products available for hands-on experience at the booth:
• AquaSense 2 Pro / Ultra — Pool cleaning robot underwater demonstration
• SORA 70 / 30 / 10 — Building facade cleaning robot live demo
• HiWonder EDU — Robot coding experience program (advance reservation required)
• AKERF — Water quality measuring robot real-time demo

Special discounts (up to 15%) and free installation services are available for on-site purchase contracts during the exhibition period. Consultation reservations are available on the official website.`,
    },
  },

  // ── 6. Award ──────────────────────────────────────────────────
  {
    id: "news-2025-07",
    slug: "iso-cert-2025",
    date: "2025-07-22",
    category: "award",
    thumbnail: "/images/news/iso-cert.jpg",
    title: {
      ko: "ISO 9001:2015 품질경영시스템 인증 획득",
      en: "ISO 9001:2015 Quality Management System Certification Obtained",
    },
    summary: {
      ko: "PBI Robot이 국제표준화기구(ISO)의 품질경영시스템 인증인 ISO 9001:2015를 획득했습니다. 글로벌 B2B 파트너십 확대에 박차를 가할 계획입니다.",
      en: "PBI Robot has obtained the ISO 9001:2015 Quality Management System certification from the International Organization for Standardization, accelerating global B2B partnership expansion.",
    },
    content: {
      ko: `PBI Robot이 국제표준화기구(ISO)의 품질경영시스템 인증인 ISO 9001:2015를 획득했습니다.

ISO 9001:2015는 제품 및 서비스의 일관된 품질을 보장하고 고객 만족을 지속적으로 향상시키기 위한 국제 표준입니다. 전 세계 170여 개국에서 적용되며, 수출 및 글로벌 B2B 거래에서 신뢰성의 기준이 됩니다.

PBI Robot은 6개월간의 내부 심사 및 개선 활동을 거쳐 인증을 취득했습니다. 인증 범위는 로봇 제품 설계·개발·제조·품질검사·고객서비스 전 과정에 걸쳐 있습니다.

이번 인증 취득을 계기로 PBI Robot은 동남아시아, 중동, 유럽 등 신규 시장의 정부 조달 및 대형 건설사 파트너십에 적극 나설 계획입니다.`,
      en: `PBI Robot has obtained ISO 9001:2015, the Quality Management System certification from the International Organization for Standardization (ISO).

ISO 9001:2015 is an international standard designed to ensure consistent quality of products and services and continuously improve customer satisfaction. Applied in over 170 countries worldwide, it serves as a standard of reliability in exports and global B2B transactions.

PBI Robot obtained the certification after 6 months of internal auditing and improvement activities. The scope covers the entire process of robot product design, development, manufacturing, quality inspection, and customer service.

With this certification, PBI Robot plans to actively pursue government procurement and large construction company partnerships in new markets including Southeast Asia, the Middle East, and Europe.`,
    },
  },

  // ── 7. Press ──────────────────────────────────────────────────
  {
    id: "news-2025-05",
    slug: "sora-series-launch",
    date: "2025-05-10",
    category: "press",
    thumbnail: "/images/news/sora-launch.jpg",
    title: {
      ko: "SORA 시리즈 3종 동시 출시 — 소형부터 초고층까지",
      en: "SORA Series — Three Models Launched for All Building Types",
    },
    summary: {
      ko: "건물 외벽 청소 로봇 SORA 70, SORA 30, SORA 10이 동시 출시됩니다. 소형 빌딩부터 70층 이상 초고층 건물까지 전 규모를 커버합니다.",
      en: "Building facade cleaning robots SORA 70, SORA 30, and SORA 10 launch simultaneously, covering all building scales from small structures to 70+ story skyscrapers.",
    },
    content: {
      ko: `PBI Robot의 건물 외벽 청소 로봇 SORA 시리즈 3종(SORA 70, SORA 30, SORA 10)이 2025년 5월 동시 출시됩니다.

■ SORA 70 — 초고층 전문
최대 적용 층수: 70층 이상 / 탑재 하중: 15kg / 운영 조건: 최대 풍속 35m/s / 고압 워터젯 + UV-C 살균

■ SORA 30 — 중층 빌딩 최적
최대 적용 층수: 30층 이하 / 탑재 하중: 12kg / 전동식 로프 시스템 / 2인 1조 운영

■ SORA 10 — 소형·상업시설 특화
최대 적용 층수: 10층 이하 / 본체 중량: 8kg / 원격 조작 방식 / 간편 설치

세 모델 모두 AI 기반 이미지 인식으로 오염 부위를 자동 감지하며, 스마트폰 앱 원격 제어를 지원합니다. 국내 출시가는 SORA 70 기준 4,500만원부터 시작합니다.`,
      en: `PBI Robot's building facade cleaning robot SORA series (SORA 70, SORA 30, SORA 10) will launch simultaneously in May 2025.

■ SORA 70 — Skyscraper Specialist
Max applicable floors: 70+ / Payload: 15kg / Operating conditions: max wind speed 35m/s / High-pressure water jet + UV-C sterilization

■ SORA 30 — Mid-Rise Optimized
Max applicable floors: up to 30 / Payload: 12kg / Motorized rope system / 2-person team operation

■ SORA 10 — Small Buildings & Commercial Facilities
Max applicable floors: up to 10 / Unit weight: 8kg / Remote control method / Easy installation

All three models feature AI-based image recognition for automatic contamination detection and support smartphone app remote control. Domestic pricing starts from KRW 45 million for SORA 70.`,
    },
  },

  // ── 8. Exhibition ─────────────────────────────────────────────
  {
    id: "news-2025-03",
    slug: "smart-city-mou",
    date: "2025-03-05",
    category: "exhibition",
    thumbnail: "/images/news/smart-city.jpg",
    title: {
      ko: "스마트시티 구축 사업 MOU 체결 — 대형 건설사와 협약",
      en: "MOU Signed for Smart City Development — Agreement with Major Construction Company",
    },
    summary: {
      ko: "PBI Robot이 국내 대형 건설사와 스마트시티 자동화 청소 시스템 구축을 위한 MOU를 체결했습니다. 5년간 200억 규모의 장기 협력입니다.",
      en: "PBI Robot signed an MOU with a major domestic construction company for automated cleaning systems in smart city projects — a KRW 20 billion, 5-year collaboration.",
    },
    content: {
      ko: `PBI Robot이 국내 대형 건설사와 스마트시티 자동화 청소 시스템 구축을 위한 업무 협약(MOU)을 체결했습니다.

이번 협약을 통해 신규 스마트시티 단지 내 수영장, 공공시설, 고층 건물에 PBI Robot의 로봇 솔루션이 통합 적용될 예정입니다.

■ 적용 예정 제품 및 활용 범위
• AquaSense 2 Pro: 단지 내 공공 수영장 자동 청소 및 수질 모니터링
• SORA 30 / 10: 상업 시설 및 주거 건물 외벽 자동 청소
• AKERF: 수질 실시간 모니터링 및 이상 알림 시스템

협약 기간은 2025년 ~ 2030년(5년), 총 계약 규모는 200억 원입니다. 첫 번째 스마트시티 프로젝트는 2026년 착공 예정이며, PBI Robot은 현장 설치, 운영 관리, 유지보수를 포함한 토털 솔루션을 제공합니다.

PBI Robot은 이번 협약을 교두보로 스마트시티 및 대형 복합 단지 시장 진출을 가속화할 계획입니다.`,
      en: `PBI Robot signed a Memorandum of Understanding (MOU) with a major domestic construction company for the development of automated cleaning systems in smart city projects.

Through this agreement, PBI Robot's robotic solutions will be integrated into pools, public facilities, and high-rise buildings within new smart city complexes.

■ Products to be applied and scope of use
• AquaSense 2 Pro: Automated cleaning and water quality monitoring for public pools within the complex
• SORA 30 / 10: Automated facade cleaning for commercial facilities and residential buildings
• AKERF: Real-time water quality monitoring and anomaly alert system

The agreement period is 2025–2030 (5 years), with a total contract value of KRW 20 billion. The first smart city project is scheduled to break ground in 2026, with PBI Robot providing a total solution including on-site installation, operational management, and maintenance.

PBI Robot plans to accelerate its entry into the smart city and large mixed-use complex market, using this agreement as a stepping stone.`,
    },
  },
];

// ─────────────────────────────────────────────────────────────
//  Helper: resolve L10n fields to a single locale
// ─────────────────────────────────────────────────────────────
function resolve(item: RawNewsItem, locale: "ko" | "en"): ResolvedNewsItem {
  return {
    id: item.id,
    slug: item.slug,
    date: item.date,
    category: item.category,
    thumbnail: item.thumbnail,
    title: item.title[locale],
    summary: item.summary[locale],
    content: item.content[locale],
  };
}

export function getNews(locale: "ko" | "en"): ResolvedNewsItem[] {
  return rawNews.map((n) => resolve(n, locale));
}

export function getNewsBySlug(
  slug: string,
  locale: "ko" | "en"
): ResolvedNewsItem | undefined {
  const raw = rawNews.find((n) => n.slug === slug);
  return raw ? resolve(raw, locale) : undefined;
}

export function getAllNewsSlugs(): string[] {
  return rawNews.map((n) => n.slug);
}
