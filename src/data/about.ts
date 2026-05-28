import type { L10n } from "@/types";

// ── Timeline ──────────────────────────────────────────────────
export interface TimelineEvent {
  year: number;
  month?: number;
  title: L10n;
  description: L10n;
}

export const timeline: TimelineEvent[] = [
  {
    year: 2015,
    month: 3,
    title: { ko: "PBI Robot 설립", en: "PBI Robot Founded" },
    description: {
      ko: "KAIST 출신 연구진이 주축이 되어 서울 강남구에서 PBI Robot을 설립. 수영장 청소 로봇 R&D에 착수.",
      en: "Founded in Gangnam, Seoul by KAIST-trained researchers. Commenced R&D on pool cleaning robots.",
    },
  },
  {
    year: 2017,
    month: 6,
    title: { ko: "첫 번째 제품 출시 — AquaSense 1.0", en: "First Product Launch — AquaSense 1.0" },
    description: {
      ko: "국내 최초 AI 비전 기반 수영장 청소 로봇 AquaSense 1.0 출시. 출시 6개월 만에 300대 판매 달성.",
      en: "Launched South Korea's first AI vision-based pool cleaning robot AquaSense 1.0. Achieved 300 units sold within 6 months.",
    },
  },
  {
    year: 2019,
    month: 9,
    title: { ko: "시리즈 A 투자 유치 & SORA 시리즈 개발 착수", en: "Series A Funding & SORA Series Development" },
    description: {
      ko: "50억 원 시리즈 A 투자 유치. 벽면 청소 로봇 SORA 시리즈 개발을 위한 R&D 센터 설립.",
      en: "Secured KRW 5 billion Series A. Established R&D center for SORA series wall cleaning robot development.",
    },
  },
  {
    year: 2021,
    month: 4,
    title: { ko: "SORA 70/30/10 출시 & 특허 30건 달성", en: "SORA 70/30/10 Launch & 30 Patents Achieved" },
    description: {
      ko: "벽면 청소 로봇 SORA 3종 동시 출시. 국내외 특허 30건 등록 돌파. 중동 시장 첫 수출.",
      en: "Simultaneous launch of 3 SORA wall cleaning robots. Exceeded 30 domestic and international patents. First export to Middle East market.",
    },
  },
  {
    year: 2023,
    month: 7,
    title: { ko: "HiWonder EDU 출시 & 교육 사업 진출", en: "HiWonder EDU Launch & Education Market Entry" },
    description: {
      ko: "ROS2 기반 교육용 로봇 HiWonder EDU 출시. 전국 40개 대학·고교와 교육 파트너십 체결.",
      en: "Launched ROS2-based educational robot HiWonder EDU. Signed educational partnerships with 40 universities and high schools nationwide.",
    },
  },
  {
    year: 2025,
    month: 12,
    title: { ko: "시리즈 B 투자 150억 & 글로벌 확장", en: "KRW 15B Series B & Global Expansion" },
    description: {
      ko: "150억 원 시리즈 B 투자 유치. 미국·유럽 법인 설립 및 Akerf 음압 흡착 특허 기술 공개.",
      en: "Secured KRW 15B Series B. Established US and European subsidiaries. Released Akerf negative pressure adhesion patent technology.",
    },
  },
];

// ── Team ─────────────────────────────────────────────────────
export interface TeamMember {
  name: L10n;
  role: L10n;
  bio: L10n;
  image: string;
}

export const team: TeamMember[] = [
  {
    name: { ko: "홍길동", en: "Gildong Hong" },
    role: { ko: "대표이사 / CEO", en: "CEO & Co-Founder" },
    bio: {
      ko: "KAIST 로봇공학 박사. 전 삼성전자 로봇사업부 수석연구원. AI 비전 로봇 특허 18건 보유.",
      en: "PhD in Robotics from KAIST. Former Principal Researcher at Samsung Electronics Robot Division. Holds 18 AI vision robot patents.",
    },
    image: "/images/team/ceo.jpg",
  },
  {
    name: { ko: "김지영", en: "Jiyeong Kim" },
    role: { ko: "CTO / 기술이사", en: "CTO" },
    bio: {
      ko: "서울대 전기공학 박사. 로봇 임베디드 시스템 및 SLAM 알고리즘 전문가.",
      en: "PhD in Electrical Engineering from Seoul National University. Expert in robot embedded systems and SLAM algorithms.",
    },
    image: "/images/team/cto.jpg",
  },
  {
    name: { ko: "박민준", en: "Minjun Park" },
    role: { ko: "CDO / 최고디자인책임자", en: "CDO" },
    bio: {
      ko: "영국 RCA 산업디자인 석사. 레드닷 어워드 수상. 제품 UX와 인더스트리얼 디자인 총괄.",
      en: "MA in Industrial Design from RCA, UK. Red Dot Award winner. Oversees product UX and industrial design.",
    },
    image: "/images/team/cdo.jpg",
  },
  {
    name: { ko: "이수진", en: "Sujin Lee" },
    role: { ko: "CFO / 최고재무책임자", en: "CFO" },
    bio: {
      ko: "연세대 경영학 학사 및 하버드 MBA. 전 KB 인베스트먼트 파트너. 투자 및 재무전략 총괄.",
      en: "BS in Business from Yonsei, Harvard MBA. Former Partner at KB Investment. Oversees investment and financial strategy.",
    },
    image: "/images/team/cfo.jpg",
  },
  {
    name: { ko: "최재훈", en: "Jaehoon Choi" },
    role: { ko: "VP of Engineering", en: "VP of Engineering" },
    bio: {
      ko: "한양대 기계공학 박사. 부압 흡착 메커니즘 핵심 발명자. Akerf 개발 총괄.",
      en: "PhD in Mechanical Engineering from Hanyang University. Key inventor of negative pressure adhesion mechanism. Leads Akerf development.",
    },
    image: "/images/team/vpe.jpg",
  },
  {
    name: { ko: "강나연", en: "Nayeon Kang" },
    role: { ko: "VP of Education", en: "VP of Education" },
    bio: {
      ko: "POSTECH 컴퓨터과학 박사. ROS2 교육 커리큘럼 설계자. HiWonder EDU 사업부 총괄.",
      en: "PhD in Computer Science from POSTECH. ROS2 curriculum designer. Leads HiWonder EDU business unit.",
    },
    image: "/images/team/vpedu.jpg",
  },
];

// ── Core Values ───────────────────────────────────────────────
export interface CoreValue {
  icon: string;
  title: L10n;
  description: L10n;
}

export const coreValues: CoreValue[] = [
  {
    icon: "Lightbulb",
    title: { ko: "혁신 (Innovation)", en: "Innovation" },
    description: {
      ko: "문제를 다른 시각으로 바라보고 기존의 한계를 넘는 기술을 끊임없이 탐구합니다.",
      en: "We constantly explore technology that looks at problems from different angles and transcends existing limitations.",
    },
  },
  {
    icon: "Heart",
    title: { ko: "신뢰 (Trust)", en: "Trust" },
    description: {
      ko: "제품 품질과 서비스에 대한 약속을 지킴으로써 고객과의 신뢰를 쌓아갑니다.",
      en: "We build trust with customers by keeping our promises regarding product quality and service.",
    },
  },
  {
    icon: "Globe",
    title: { ko: "지속가능성 (Sustainability)", en: "Sustainability" },
    description: {
      ko: "사람과 환경 모두에 이로운 기술을 개발하여 지속 가능한 미래를 만들어갑니다.",
      en: "We develop technology that benefits both people and the environment to create a sustainable future.",
    },
  },
];
