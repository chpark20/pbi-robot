import type { FAQCategory, L10n } from "@/types";

interface RawFAQItem {
  id: string;
  category: FAQCategory;
  question: L10n;
  answer: L10n;
}

export interface ResolvedFAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
}

const rawFAQ: RawFAQItem[] = [
  // ══════════════════════════════════════════
  //  제품 (product)
  // ══════════════════════════════════════════
  {
    id: "faq-p-01",
    category: "product",
    question: {
      ko: "AquaSense 2 Pro의 최대 청소 면적은 얼마인가요?",
      en: "What is the maximum cleaning area of AquaSense 2 Pro?",
    },
    answer: {
      ko: "AquaSense 2 Pro는 한 번의 충전으로 최대 500m²의 수영장을 청소할 수 있습니다. 동급 최고 수준의 30,000mAh 배터리를 탑재하여 대형 스포츠 시설 및 호텔 수영장에도 적합합니다. AquaSense 2 Ultra 모델은 600m²까지 지원합니다.",
      en: "The AquaSense 2 Pro can clean pools up to 500m² on a single charge. Equipped with a class-leading 30,000mAh battery, it is suitable for large sports facilities and hotel pools. The AquaSense 2 Ultra model supports up to 600m².",
    },
  },
  {
    id: "faq-p-02",
    category: "product",
    question: {
      ko: "SORA 70은 어떤 기상 조건에서 운영 가능한가요?",
      en: "Under what weather conditions can SORA 70 operate?",
    },
    answer: {
      ko: "SORA 70은 최대 풍속 35m/s, 기온 -10°C ~ +50°C 환경에서 안정적으로 운영 가능합니다. 강수 조건의 경우 IP65 이상의 방진·방수 등급을 갖추고 있어 소나기 수준의 강우에도 동작합니다. 단, 태풍·폭설 등 극한 기상 상황에서는 운영을 중단할 것을 권장합니다.",
      en: "The SORA 70 can operate stably in wind speeds up to 35m/s and temperatures from -10°C to +50°C. With an IP65 or higher dust and waterproof rating, it operates even in light rain conditions. However, operation is not recommended during extreme weather conditions such as typhoons or heavy snowfall.",
    },
  },
  {
    id: "faq-p-03",
    category: "product",
    question: {
      ko: "AquaSense 시리즈의 배터리 수명과 충전 시간은?",
      en: "What is the battery life and charging time of the AquaSense series?",
    },
    answer: {
      ko: "AquaSense 2 Pro의 배터리 수명은 약 500회 충전 주기(약 2~3년)이며, 완충 시 청소 시간은 약 4시간입니다. 충전은 전용 도킹 스테이션을 이용하며 완충까지 약 6시간이 소요됩니다. AquaSense 2 Ultra는 급속 충전을 지원하여 4시간 충전으로 완충이 가능합니다.",
      en: "The battery life of AquaSense 2 Pro is approximately 500 charge cycles (about 2-3 years), with a cleaning time of about 4 hours on a full charge. Charging uses a dedicated docking station and takes about 6 hours for a full charge. The AquaSense 2 Ultra supports fast charging, allowing a full charge in 4 hours.",
    },
  },
  {
    id: "faq-p-04",
    category: "product",
    question: {
      ko: "HiWonder EDU는 어떤 ROS 버전을 지원하나요?",
      en: "Which ROS versions does HiWonder EDU support?",
    },
    answer: {
      ko: "HiWonder EDU는 ROS2 Humble(LTS, 2022~2027)과 ROS2 Jazzy(LTS, 2024~2029)를 공식 지원합니다. 커리큘럼 v2.0 업데이트를 통해 Jazzy 환경에서의 실습 가이드가 추가되었습니다. ROS1은 공식 지원이 종료된 관계로 지원하지 않습니다.",
      en: "HiWonder EDU officially supports ROS2 Humble (LTS, 2022-2027) and ROS2 Jazzy (LTS, 2024-2029). Curriculum v2.0 update added practice guides for the Jazzy environment. ROS1 is not supported as official support has ended.",
    },
  },
  {
    id: "faq-p-05",
    category: "product",
    question: {
      ko: "AKERF는 어떤 수질 항목을 측정할 수 있나요?",
      en: "What water quality parameters can AKERF measure?",
    },
    answer: {
      ko: "AKERF는 7가지 수질 항목을 실시간으로 측정합니다: pH, 탁도(NTU), 용존산소(DO), 총질소(TN), 총인(TP), 수온, 전기전도도(EC). 측정 결과는 전용 앱 및 웹 대시보드에서 실시간으로 확인 가능하며, 기준값 초과 시 즉시 알림을 발송합니다.",
      en: "AKERF measures 7 water quality parameters in real time: pH, turbidity (NTU), dissolved oxygen (DO), total nitrogen (TN), total phosphorus (TP), water temperature, and electrical conductivity (EC). Measurement results can be viewed in real time on the dedicated app and web dashboard, with immediate alerts sent when values exceed standards.",
    },
  },

  // ══════════════════════════════════════════
  //  구매 (purchase)
  // ══════════════════════════════════════════
  {
    id: "faq-b-01",
    category: "purchase",
    question: {
      ko: "제품은 어디서 구매할 수 있나요?",
      en: "Where can I purchase the products?",
    },
    answer: {
      ko: "PBI Robot 제품은 공식 홈페이지 문의 또는 전국 공식 파트너사를 통해 구매하실 수 있습니다. 일반 소매점에서는 판매하지 않으며, 기업 대상 B2B 구매를 원하시는 경우 영업팀(sales@pbirobot.com)으로 별도 문의 부탁드립니다. 해외 구매는 각 국가별 공식 대리점을 통해 가능합니다.",
      en: "PBI Robot products can be purchased through the official website inquiry or through authorized partner companies nationwide. They are not sold at general retail stores. For corporate B2B purchases, please contact our sales team separately (sales@pbirobot.com). International purchases are available through official distributors in each country.",
    },
  },
  {
    id: "faq-b-02",
    category: "purchase",
    question: {
      ko: "구매 전 제품 시연을 받아볼 수 있나요?",
      en: "Can I get a product demonstration before purchasing?",
    },
    answer: {
      ko: "네, 가능합니다. 서울 강남 쇼룸에서 사전 예약을 통해 무료 시연을 받아보실 수 있습니다. 지방 고객의 경우 현장 출장 시연 서비스도 제공합니다(거리에 따라 출장비 별도). 문의하기 페이지 또는 전화(02-1234-5678)를 통해 예약해 주세요.",
      en: "Yes, it is possible. You can receive a free demonstration at our Seoul Gangnam showroom with advance reservation. For customers outside Seoul, we also provide on-site demonstration services (travel costs may apply depending on distance). Please make a reservation through the contact page or by phone (+82-2-1234-5678).",
    },
  },
  {
    id: "faq-b-03",
    category: "purchase",
    question: {
      ko: "가격 정책은 어떻게 되나요?",
      en: "What is the pricing policy?",
    },
    answer: {
      ko: "제품 가격은 모델 및 구성에 따라 다르며, 공식 홈페이지에는 '가격 문의' 방식으로 운영됩니다. 공개 가격은 AquaSense 2 Pro 2,500만원~, AquaSense 2 Ultra 3,200만원~, SORA 70 4,500만원~입니다. 설치비, 교육비, 유지보수 계약 비용은 별도이며, 영업팀에 별도 문의 시 맞춤 견적을 제공해 드립니다.",
      en: "Product prices vary by model and configuration, and our official website operates on a 'price inquiry' basis. Published prices start from KRW 25 million for AquaSense 2 Pro, KRW 32 million for AquaSense 2 Ultra, and KRW 45 million for SORA 70. Installation, training, and maintenance contract costs are separate. Custom quotes are available upon inquiry with our sales team.",
    },
  },
  {
    id: "faq-b-04",
    category: "purchase",
    question: {
      ko: "대량 구매 시 할인 혜택이 있나요?",
      en: "Are there discounts for bulk purchases?",
    },
    answer: {
      ko: "5대 이상 구매 시 수량에 따른 할인 혜택이 적용됩니다. 일반적으로 5~9대 5%, 10~19대 10%, 20대 이상 15% 할인을 제공합니다. 지자체, 공공기관, 스포츠 시설 운영사 등 대형 거래처는 별도 협의가 가능합니다. 자세한 내용은 법인 영업팀(sales@pbirobot.com)으로 문의해 주세요.",
      en: "Quantity discounts apply for purchases of 5 units or more. Typically: 5% for 5-9 units, 10% for 10-19 units, and 15% for 20+ units. Separate negotiations are available for large accounts such as local governments, public institutions, and sports facility operators. For more details, please contact our corporate sales team (sales@pbirobot.com).",
    },
  },
  {
    id: "faq-b-05",
    category: "purchase",
    question: {
      ko: "할부 또는 리스 구매가 가능한가요?",
      en: "Is installment or lease purchase available?",
    },
    answer: {
      ko: "네, 금융 파트너사와 협력하여 24개월 또는 36개월 할부 구매 서비스를 제공합니다. 또한 월 렌탈(리스) 방식으로 초기 비용 없이 이용 가능한 'PBI Robot as a Service(RaaS)' 프로그램도 운영 중입니다. 자세한 금융 조건은 영업팀에 문의하시면 안내해 드립니다.",
      en: "Yes, we provide 24 or 36-month installment payment services in partnership with financial companies. We also operate a 'PBI Robot as a Service (RaaS)' program that allows monthly rental (lease) usage without upfront costs. Please contact our sales team for detailed financial terms.",
    },
  },

  // ══════════════════════════════════════════
  //  A/S·지원 (support)
  // ══════════════════════════════════════════
  {
    id: "faq-s-01",
    category: "support",
    question: {
      ko: "제품 보증 기간은 어떻게 되나요?",
      en: "What is the product warranty period?",
    },
    answer: {
      ko: "PBI Robot 모든 제품의 기본 보증 기간은 구매일로부터 1년입니다. 옵션으로 2년 또는 3년 연장 보증 서비스를 제공합니다(유료). 배터리, 청소 브러시 등 소모품은 보증 기간 내라도 정상 마모로 인한 교체는 보증 범위에 포함되지 않습니다. 보증 내용 및 면책 조항은 제품 매뉴얼을 참조해 주세요.",
      en: "The standard warranty period for all PBI Robot products is 1 year from the purchase date. Optional 2-year or 3-year extended warranty services are available (paid). Consumables such as batteries and cleaning brushes are not covered by warranty if replacement is due to normal wear, even within the warranty period. Please refer to the product manual for warranty details and disclaimers.",
    },
  },
  {
    id: "faq-s-02",
    category: "support",
    question: {
      ko: "소모품(브러시, 필터 등) 교체 주기는 어떻게 되나요?",
      en: "What is the replacement cycle for consumables such as brushes and filters?",
    },
    answer: {
      ko: "주요 소모품의 권장 교체 주기는 다음과 같습니다. 청소 브러시: 약 300시간 사용 후 교체 권장 / 필터 카트리지: 월 1회 세척, 6개월마다 교체 / 배터리: 500회 충전 주기 후 교체(약 2~3년) / 흡입 모터: 약 3,000시간 후 정기 점검 권장. 소모품은 공식 홈페이지 또는 파트너사를 통해 구매 가능합니다.",
      en: "Recommended replacement cycles for major consumables: Cleaning brush: Replace after approximately 300 hours of use / Filter cartridge: Clean monthly, replace every 6 months / Battery: Replace after 500 charge cycles (approx. 2-3 years) / Suction motor: Regular inspection recommended after approximately 3,000 hours. Consumables can be purchased through the official website or partner companies.",
    },
  },
  {
    id: "faq-s-03",
    category: "support",
    question: {
      ko: "원격 A/S 지원이 가능한가요?",
      en: "Is remote service support available?",
    },
    answer: {
      ko: "네, 모든 PBI Robot 제품은 5G/Wi-Fi 원격 진단 기능을 탑재하고 있습니다. PBI Robot 서비스 엔지니어가 원격으로 오류 로그를 확인하고 펌웨어 업데이트, 파라미터 조정, 간단한 오류 복구를 수행할 수 있습니다. 원격 지원은 평일 09:00 ~ 18:00에 운영되며, 고장 신고 후 2시간 이내에 초기 진단을 제공합니다.",
      en: "Yes, all PBI Robot products are equipped with 5G/Wi-Fi remote diagnostic capabilities. PBI Robot service engineers can remotely check error logs and perform firmware updates, parameter adjustments, and simple error recovery. Remote support is available on weekdays from 09:00 to 18:00, with initial diagnosis provided within 2 hours of fault reporting.",
    },
  },
  {
    id: "faq-s-04",
    category: "support",
    question: {
      ko: "A/S 신청은 어떻게 하나요?",
      en: "How do I apply for after-sales service?",
    },
    answer: {
      ko: "A/S 신청 방법은 세 가지입니다. ① 전화: 고객센터(02-1234-5678) 상담 후 접수 / ② 이메일: support@pbirobot.com으로 제품명, 구매일, 증상 상세 작성 후 발송 / ③ 온라인: 공식 홈페이지 [A/S 신청] 메뉴 이용. A/S 접수 후 영업일 기준 1일 이내 담당자가 연락하며, 방문 수리가 필요한 경우 일정을 조율합니다.",
      en: "There are three ways to apply for after-sales service: ① Phone: Consultation and registration via customer service center (+82-2-1234-5678) / ② Email: Send to support@pbirobot.com with product name, purchase date, and detailed symptom description / ③ Online: Use the [A/S Application] menu on the official website. After registration, a representative will contact you within 1 business day, and if an on-site repair is needed, a schedule will be arranged.",
    },
  },

  // ══════════════════════════════════════════
  //  기타 (other)
  // ══════════════════════════════════════════
  {
    id: "faq-o-01",
    category: "other",
    question: {
      ko: "제품을 해외로 수출할 수 있나요?",
      en: "Can I export the products overseas?",
    },
    answer: {
      ko: "현재 미국, 캐나다, EU 27개국, 일본, 싱가포르, UAE, 호주 등 30여 개국에 공식 수출 가능합니다. 각 국가별 공식 대리점 정보는 홈페이지 [파트너사 찾기] 메뉴에서 확인할 수 있습니다. 리스트에 없는 국가의 경우 글로벌 영업팀(global@pbirobot.com)으로 문의해 주세요.",
      en: "Currently, official export is available to over 30 countries including the USA, Canada, 27 EU countries, Japan, Singapore, UAE, and Australia. Information on official distributors in each country can be found in the [Find a Partner] menu on the website. For countries not on the list, please contact our global sales team (global@pbirobot.com).",
    },
  },
  {
    id: "faq-o-02",
    category: "other",
    question: {
      ko: "OEM/ODM 개발이 가능한가요?",
      en: "Is OEM/ODM development available?",
    },
    answer: {
      ko: "네, PBI Robot은 B2B 고객을 위한 OEM/ODM 서비스를 제공합니다. 기존 제품 라인업을 기반으로 브랜드 커스터마이징, 특수 기능 추가, 산업별 특화 모델 개발이 가능합니다. 최소 발주 수량(MOQ), 개발 기간, 비용 등 세부 조건은 개발팀(bd@pbirobot.com)에 문의해 주시면 담당자가 상세 안내 드립니다.",
      en: "Yes, PBI Robot provides OEM/ODM services for B2B customers. Based on existing product lineups, brand customization, special function additions, and industry-specific model development are possible. Please contact our development team (bd@pbirobot.com) for detailed conditions such as minimum order quantity (MOQ), development period, and costs.",
    },
  },
  {
    id: "faq-o-03",
    category: "other",
    question: {
      ko: "PBI Robot에 투자 또는 파트너십을 제안하려면 어떻게 해야 하나요?",
      en: "How can I propose investment or a partnership with PBI Robot?",
    },
    answer: {
      ko: "투자 및 전략적 파트너십 제안은 경영기획팀(ir@pbirobot.com)으로 연락해 주세요. 이메일 제목에 '투자 제안' 또는 '파트너십 제안'을 기재해 주시고, 회사 소개 자료와 협력 희망 분야를 함께 첨부해 주시면 빠른 검토가 가능합니다. 일반적으로 수신 후 7영업일 이내에 초기 응답을 드립니다.",
      en: "For investment and strategic partnership proposals, please contact our Corporate Planning team (ir@pbirobot.com). Please include 'Investment Proposal' or 'Partnership Proposal' in the email subject, and attach a company profile and desired areas of collaboration for faster review. We generally provide an initial response within 7 business days of receipt.",
    },
  },
  {
    id: "faq-o-04",
    category: "other",
    question: {
      ko: "PBI Robot에 입사 지원은 어떻게 하나요?",
      en: "How can I apply for a job at PBI Robot?",
    },
    answer: {
      ko: "채용 공고는 공식 홈페이지 [채용] 페이지와 원티드, 링크드인, 사람인 등 주요 채용 플랫폼에 게재됩니다. 수시 채용 포지션이 없는 경우에도 인재풀 등록을 통해 이력서를 제출하실 수 있습니다(hr@pbirobot.com). PBI Robot은 로보틱스·AI·임베디드 SW·기구 설계 분야의 인재를 상시 환영합니다.",
      en: "Job postings are listed on the official website's [Careers] page and major recruitment platforms such as Wanted, LinkedIn, and Saramin. Even if there are no open positions, you can submit your resume through our talent pool registration (hr@pbirobot.com). PBI Robot always welcomes talented individuals in robotics, AI, embedded software, and mechanical design.",
    },
  },
];

// ─────────────────────────────────────────────────────────────
//  Helper functions
// ─────────────────────────────────────────────────────────────
function resolve(item: RawFAQItem, locale: "ko" | "en"): ResolvedFAQItem {
  return {
    id: item.id,
    category: item.category,
    question: item.question[locale],
    answer: item.answer[locale],
  };
}

export function getFAQ(locale: "ko" | "en"): ResolvedFAQItem[] {
  return rawFAQ.map((f) => resolve(f, locale));
}

export function getFAQByCategory(
  category: FAQCategory,
  locale: "ko" | "en"
): ResolvedFAQItem[] {
  return rawFAQ
    .filter((f) => f.category === category)
    .map((f) => resolve(f, locale));
}
