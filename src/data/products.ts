import type { ProductCategory, ProductFeature, ProductImage, ProductSpec, L10n } from "@/types";

// ── Raw (bilingual) product type ──────────────────────────────
interface RawProduct {
  id: string;
  slug: string;
  category: ProductCategory;
  name: L10n;
  tagline: L10n;
  description: L10n;
  features: Array<{ icon: string; title: L10n; description: L10n }>;
  specs: Array<{ label: L10n; value: string }>;
  images: string[];
}

// ── Locale-resolved Product type ─────────────────────────────
export interface ResolvedProduct {
  id: string;
  slug: string;
  category: ProductCategory;
  name: string;
  tagline: string;
  description: string;
  features: ProductFeature[];
  specs: ProductSpec[];
  images: ProductImage[];
}

// ─────────────────────────────────────────────────────────────
//  Raw Data
// ─────────────────────────────────────────────────────────────
const rawProducts: RawProduct[] = [
  // ── 1. AquaSense 2 Pro ──────────────────────────────────────
  {
    id: "aquasense-2-pro",
    slug: "aquasense-2-pro",
    category: "pool",
    name: { ko: "AquaSense 2 Pro", en: "AquaSense 2 Pro" },
    tagline: {
      ko: "AI 비전으로 완벽한 수영장 청소",
      en: "Perfect Pool Cleaning with AI Vision",
    },
    description: {
      ko: "AquaSense 2 Pro는 최첨단 AI 비전 기술을 탑재한 수영장 청소 로봇입니다. 딥러닝 기반 오염 감지 알고리즘이 바닥과 벽면의 미세 오염까지 완벽하게 인식하여 효율적인 나선형 청소 경로를 자동으로 생성합니다.",
      en: "AquaSense 2 Pro is a pool cleaning robot powered by cutting-edge AI vision technology. Its deep learning contamination detection algorithm automatically generates efficient spiral cleaning paths for perfect cleaning of even microscopic contaminants.",
    },
    features: [
      {
        icon: "Eye",
        title: { ko: "AI 비전 오염 감지", en: "AI Vision Contamination Detection" },
        description: {
          ko: "딥러닝 카메라가 바닥, 벽면, 수선(水線)의 오염을 실시간 감지합니다.",
          en: "Deep learning cameras detect contamination on the floor, walls, and waterline in real time.",
        },
      },
      {
        icon: "Navigation",
        title: { ko: "스마트 나선형 경로", en: "Smart Spiral Path" },
        description: {
          ko: "풀 형태를 자동 맵핑하여 중복 없는 최적 청소 경로를 생성합니다.",
          en: "Automatically maps pool shape to generate optimal non-overlapping cleaning paths.",
        },
      },
      {
        icon: "Zap",
        title: { ko: "고효율 4단 필터", en: "High-Efficiency 4-Stage Filter" },
        description: {
          ko: "50μm 초미세 필터로 머리카락부터 미세조류까지 99.9% 제거합니다.",
          en: "50μm ultra-fine filter removes 99.9% of debris from hair to micro-algae.",
        },
      },
      {
        icon: "Smartphone",
        title: { ko: "IoT 스마트 제어", en: "IoT Smart Control" },
        description: {
          ko: "전용 앱으로 스케줄 설정, 청소 현황, 필터 교체 알림을 실시간 확인합니다.",
          en: "Set schedules, monitor cleaning status, and receive filter replacement alerts via the dedicated app.",
        },
      },
    ],
    specs: [
      { label: { ko: "정격 전압", en: "Rated Voltage" }, value: "24V DC" },
      { label: { ko: "모터 출력", en: "Motor Output" }, value: "150W" },
      { label: { ko: "청소 속도", en: "Cleaning Speed" }, value: "120 m²/h" },
      { label: { ko: "방수 등급", en: "Waterproof Rating" }, value: "IP68" },
      { label: { ko: "필터 정밀도", en: "Filter Precision" }, value: "50 μm" },
      { label: { ko: "본체 중량", en: "Unit Weight" }, value: "6.5 kg" },
      { label: { ko: "케이블 길이", en: "Cable Length" }, value: "18 m" },
      { label: { ko: "수심 범위", en: "Depth Range" }, value: "0.5 – 4.5 m" },
    ],
    images: [
      "/images/products/aquasense-2-pro/main.jpg",
      "/images/products/aquasense-2-pro/side.jpg",
      "/images/products/aquasense-2-pro/filter.jpg",
      "/images/products/aquasense-2-pro/app.jpg",
    ],
  },

  // ── 2. AquaSense 2 Ultra ────────────────────────────────────
  {
    id: "aquasense-2-ultra",
    slug: "aquasense-2-ultra",
    category: "pool",
    name: { ko: "AquaSense 2 Ultra", en: "AquaSense 2 Ultra" },
    tagline: {
      ko: "UV 살균과 AI의 완벽한 조합",
      en: "The Perfect Union of UV Sterilization and AI",
    },
    description: {
      ko: "AquaSense 2 Ultra는 Pro 모델의 AI 비전 기술에 UV-C 살균 램프를 추가하여 세균과 바이러스까지 제거하는 프리미엄 수영장 청소 로봇입니다. 쌍안 AI 카메라와 수질 탁도 센서가 결합되어 완벽한 수질 관리를 실현합니다.",
      en: "AquaSense 2 Ultra is a premium pool cleaning robot that adds UV-C germicidal lamps to Pro's AI vision technology to eliminate bacteria and viruses. Combined dual AI cameras and water turbidity sensors achieve perfect water quality management.",
    },
    features: [
      {
        icon: "Sun",
        title: { ko: "UV-C 살균 시스템", en: "UV-C Sterilization System" },
        description: {
          ko: "254nm UV-C 램프가 청소 경로 전체를 살균하여 99.99% 세균·바이러스를 제거합니다.",
          en: "254nm UV-C lamps sterilize the entire cleaning path, eliminating 99.99% of bacteria and viruses.",
        },
      },
      {
        icon: "Camera",
        title: { ko: "쌍안 AI 카메라", en: "Dual AI Cameras" },
        description: {
          ko: "전·후방 4K 카메라가 입체적으로 오염 분포를 분석하여 집중 청소 구역을 설정합니다.",
          en: "Front and rear 4K cameras analyze contamination distribution in 3D and set intensive cleaning zones.",
        },
      },
      {
        icon: "Droplets",
        title: { ko: "수질 탁도 센서", en: "Water Turbidity Sensor" },
        description: {
          ko: "실시간 탁도 측정으로 수질 상태를 앱에 전송하고 청소 주기를 자동 조정합니다.",
          en: "Real-time turbidity measurement sends water quality status to the app and automatically adjusts cleaning cycles.",
        },
      },
      {
        icon: "BatteryCharging",
        title: { ko: "자동 충전 도크", en: "Auto Charging Dock" },
        description: {
          ko: "청소 완료 후 자동으로 도크로 귀환하여 다음 청소를 위해 충전을 시작합니다.",
          en: "Automatically returns to the dock after cleaning to start charging for the next cycle.",
        },
      },
    ],
    specs: [
      { label: { ko: "정격 전압", en: "Rated Voltage" }, value: "36V DC" },
      { label: { ko: "모터 출력", en: "Motor Output" }, value: "250W" },
      { label: { ko: "청소 속도", en: "Cleaning Speed" }, value: "200 m²/h" },
      { label: { ko: "UV 파장", en: "UV Wavelength" }, value: "254 nm" },
      { label: { ko: "방수 등급", en: "Waterproof Rating" }, value: "IP68" },
      { label: { ko: "필터 정밀도", en: "Filter Precision" }, value: "20 μm" },
      { label: { ko: "본체 중량", en: "Unit Weight" }, value: "8.2 kg" },
      { label: { ko: "케이블 길이", en: "Cable Length" }, value: "20 m" },
    ],
    images: [
      "/images/products/aquasense-2-ultra/main.jpg",
      "/images/products/aquasense-2-ultra/uv.jpg",
      "/images/products/aquasense-2-ultra/dock.jpg",
      "/images/products/aquasense-2-ultra/app.jpg",
    ],
  },

  // ── 3. SORA 70 ───────────────────────────────────────────────
  {
    id: "sora-70",
    slug: "sora-70",
    category: "wall",
    name: { ko: "SORA 70", en: "SORA 70" },
    tagline: {
      ko: "70m² 대형 파사드를 단숨에",
      en: "Large 70m² Facade Cleaned in One Pass",
    },
    description: {
      ko: "SORA 70은 고층 건물의 대형 유리 파사드와 외벽을 위해 설계된 대형 벽면 청소 로봇입니다. 자기 흡착 방식과 음압 흡착을 병용한 듀얼 어드히전 시스템으로 어떤 각도의 벽면에서도 안정적으로 작동합니다.",
      en: "SORA 70 is a large wall cleaning robot designed for large glass facades and exterior walls of high-rise buildings. The dual adhesion system combining magnetic and negative pressure adhesion operates stably on walls at any angle.",
    },
    features: [
      {
        icon: "Magnet",
        title: { ko: "듀얼 어드히전", en: "Dual Adhesion System" },
        description: {
          ko: "자기 흡착과 음압 흡착을 동시에 사용하여 수직·역경사 벽면에서도 최대 80kg 하중을 지지합니다.",
          en: "Simultaneous magnetic and negative pressure adhesion supports up to 80kg load even on vertical and inverted slopes.",
        },
      },
      {
        icon: "Move",
        title: { ko: "전방향 이동", en: "Omnidirectional Movement" },
        description: {
          ko: "메카넘 휠 4개로 전후좌우 및 대각선 이동이 자유로워 복잡한 파사드도 커버합니다.",
          en: "4 mecanum wheels allow free forward, backward, lateral, and diagonal movement to cover complex facades.",
        },
      },
      {
        icon: "Video",
        title: { ko: "4K 영상 녹화", en: "4K Video Recording" },
        description: {
          ko: "청소와 동시에 외벽 상태를 4K 영상으로 기록하여 건물 유지보수 이력을 자동 생성합니다.",
          en: "Simultaneously records the building exterior in 4K video while cleaning, automatically creating maintenance history.",
        },
      },
      {
        icon: "Shield",
        title: { ko: "3중 안전 장치", en: "Triple Safety System" },
        description: {
          ko: "전원 차단 시 자동 잠금, 낙하 감지 센서, 이중 안전 와이어로 최고 수준의 안전성을 보장합니다.",
          en: "Automatic lock on power cut, fall detection sensors, and dual safety wire guarantee the highest level of safety.",
        },
      },
    ],
    specs: [
      { label: { ko: "청소 면적", en: "Cleaning Area" }, value: "70 m²" },
      { label: { ko: "이동 속도", en: "Movement Speed" }, value: "0.5 m/s" },
      { label: { ko: "벽두께 대응", en: "Wall Thickness Range" }, value: "0 – 8 mm" },
      { label: { ko: "최대 하중", en: "Max. Payload" }, value: "80 kg" },
      { label: { ko: "배터리", en: "Battery" }, value: "48V 20Ah (4h)" },
      { label: { ko: "본체 중량", en: "Unit Weight" }, value: "12 kg" },
      { label: { ko: "제어 방식", en: "Control Method" }, value: "무선 리모컨 + 앱" },
      { label: { ko: "통신", en: "Communication" }, value: "Wi-Fi 6 / 4G LTE" },
    ],
    images: [
      "/images/products/sora-70/main.jpg",
      "/images/products/sora-70/adhesion.jpg",
      "/images/products/sora-70/facade.jpg",
    ],
  },

  // ── 4. SORA 30 ───────────────────────────────────────────────
  {
    id: "sora-30",
    slug: "sora-30",
    category: "wall",
    name: { ko: "SORA 30", en: "SORA 30" },
    tagline: {
      ko: "중형 건물을 위한 최적화된 솔루션",
      en: "Optimized Solution for Mid-Rise Buildings",
    },
    description: {
      ko: "SORA 30은 5~15층 규모의 중형 건물을 위해 최적화된 벽면 청소 로봇입니다. SORA 70의 핵심 기술을 경량화하여 설치와 운용이 더욱 간편해졌습니다.",
      en: "SORA 30 is a wall cleaning robot optimized for mid-rise buildings of 5-15 floors. Lightweight core technology from SORA 70 makes installation and operation simpler.",
    },
    features: [
      {
        icon: "Weight",
        title: { ko: "경량 고강도 프레임", en: "Lightweight High-Strength Frame" },
        description: {
          ko: "항공 알루미늄 합금 프레임으로 무게는 낮추고 강도는 극대화했습니다.",
          en: "Aerospace aluminum alloy frame minimizes weight while maximizing strength.",
        },
      },
      {
        icon: "Brush",
        title: { ko: "광폭 청소 브러시", en: "Wide Cleaning Brush" },
        description: {
          ko: "600mm 광폭 브러시로 1회 패스 청소 폭을 늘려 작업 시간을 단축합니다.",
          en: "600mm wide brush increases single-pass cleaning width and reduces work time.",
        },
      },
      {
        icon: "AlertTriangle",
        title: { ko: "자동 엣지 감지", en: "Auto Edge Detection" },
        description: {
          ko: "레이저 센서가 건물 모서리를 자동 감지하여 안전하게 방향을 전환합니다.",
          en: "Laser sensors automatically detect building edges and safely change direction.",
        },
      },
      {
        icon: "RefreshCw",
        title: { ko: "자동 세척수 순환", en: "Auto Water Circulation" },
        description: {
          ko: "5L 내장 탱크와 자동 순환 펌프로 외부 급수 없이 연속 청소가 가능합니다.",
          en: "Built-in 5L tank and auto circulation pump enable continuous cleaning without external water supply.",
        },
      },
    ],
    specs: [
      { label: { ko: "청소 면적", en: "Cleaning Area" }, value: "30 m²" },
      { label: { ko: "이동 속도", en: "Movement Speed" }, value: "0.4 m/s" },
      { label: { ko: "배터리", en: "Battery" }, value: "36V 15Ah (3h)" },
      { label: { ko: "본체 중량", en: "Unit Weight" }, value: "8 kg" },
      { label: { ko: "브러시 폭", en: "Brush Width" }, value: "600 mm" },
      { label: { ko: "물 탱크", en: "Water Tank" }, value: "5 L" },
      { label: { ko: "제어 방식", en: "Control Method" }, value: "무선 리모컨" },
      { label: { ko: "통신", en: "Communication" }, value: "Wi-Fi 5 / 블루투스" },
    ],
    images: [
      "/images/products/sora-30/main.jpg",
      "/images/products/sora-30/detail.jpg",
      "/images/products/sora-30/operation.jpg",
    ],
  },

  // ── 5. SORA 10 ───────────────────────────────────────────────
  {
    id: "sora-10",
    slug: "sora-10",
    category: "wall",
    name: { ko: "SORA 10", en: "SORA 10" },
    tagline: {
      ko: "소형 건물을 위한 컴팩트 파워",
      en: "Compact Power for Low-Rise Buildings",
    },
    description: {
      ko: "SORA 10은 1~4층 소규모 건물과 단독 주택을 위한 초소형 벽면 청소 로봇입니다. 가정용으로 운용 가능한 수준의 간편한 조작성과 합리적인 가격을 실현했습니다.",
      en: "SORA 10 is an ultra-compact wall cleaning robot for 1-4 story small buildings and detached houses. It achieves household-level ease of operation and reasonable pricing.",
    },
    features: [
      {
        icon: "Package",
        title: { ko: "원터치 탈착 브러시", en: "One-Touch Detachable Brush" },
        description: {
          ko: "도구 없이 손으로 브러시를 탈부착할 수 있어 세척과 교체가 간편합니다.",
          en: "Brushes can be attached/detached by hand without tools for easy cleaning and replacement.",
        },
      },
      {
        icon: "Sliders",
        title: { ko: "수동/자동 듀얼 모드", en: "Manual/Auto Dual Mode" },
        description: {
          ko: "리모컨 수동 조작과 자동 패턴 청소 두 가지 모드를 지원합니다.",
          en: "Supports two modes: remote control manual operation and automatic pattern cleaning.",
        },
      },
      {
        icon: "Battery",
        title: { ko: "2시간 연속 작동", en: "2-Hour Continuous Operation" },
        description: {
          ko: "경량 리튬 배터리로 충전 1회에 최대 10m² 면적을 청소합니다.",
          en: "Lightweight lithium battery cleans up to 10m² per charge.",
        },
      },
      {
        icon: "Leaf",
        title: { ko: "저소음 모터", en: "Low-Noise Motor" },
        description: {
          ko: "50dB 이하의 저소음 설계로 주거 환경에서도 조용하게 운용합니다.",
          en: "Low-noise design under 50dB allows quiet operation in residential environments.",
        },
      },
    ],
    specs: [
      { label: { ko: "청소 면적", en: "Cleaning Area" }, value: "10 m²" },
      { label: { ko: "이동 속도", en: "Movement Speed" }, value: "0.3 m/s" },
      { label: { ko: "배터리", en: "Battery" }, value: "24V 10Ah (2h)" },
      { label: { ko: "본체 중량", en: "Unit Weight" }, value: "5 kg" },
      { label: { ko: "소음", en: "Noise Level" }, value: "< 50 dB" },
      { label: { ko: "제어 방식", en: "Control Method" }, value: "블루투스 리모컨" },
      { label: { ko: "충전 시간", en: "Charging Time" }, value: "90 min" },
    ],
    images: [
      "/images/products/sora-10/main.jpg",
      "/images/products/sora-10/detail.jpg",
    ],
  },

  // ── 6. Akerf ─────────────────────────────────────────────────
  {
    id: "akerf",
    slug: "akerf",
    category: "wall",
    name: { ko: "AKF-CRC1", en: "AKF-CRC1" },
    tagline: {
      ko: "음압 흡착으로 어떤 표면도 정복",
      en: "Conquering Any Surface with Negative Pressure",
    },
    description: {
      ko: "Akerf는 자체 개발한 음압(陰壓) 흡착 메커니즘을 탑재한 차세대 벽면 청소 로봇입니다. 자성이 없는 콘크리트, 유리, 세라믹 타일 등 비자성 재질 벽면에서도 강력한 흡착력을 유지하여 SORA 시리즈가 닿지 못하는 영역을 커버합니다.",
      en: "Akerf is a next-generation wall cleaning robot with proprietary negative pressure adhesion mechanism. It maintains strong adhesion on non-magnetic surfaces such as concrete, glass, and ceramic tiles, covering areas where the SORA series cannot reach.",
    },
    features: [
      {
        icon: "Wind",
        title: { ko: "음압 흡착 메커니즘", en: "Negative Pressure Adhesion" },
        description: {
          ko: "독자 개발 임펠러 어셈블리가 최대 8kPa 음압을 생성하여 비자성 벽면에 강력하게 흡착합니다.",
          en: "Proprietary impeller assembly generates up to 8kPa negative pressure for powerful adhesion on non-magnetic walls.",
        },
      },
      {
        icon: "Layers",
        title: { ko: "다중 표면 호환", en: "Multi-Surface Compatibility" },
        description: {
          ko: "유리, 콘크리트, 세라믹, 알루미늄 패널 등 10가지 이상의 건축 표면에 대응합니다.",
          en: "Compatible with 10+ architectural surfaces including glass, concrete, ceramic, and aluminum panels.",
        },
      },
      {
        icon: "BarChart2",
        title: { ko: "실시간 압력 모니터링", en: "Real-time Pressure Monitoring" },
        description: {
          ko: "압력 센서가 흡착 상태를 1ms 단위로 모니터링하여 이상 감지 시 즉시 알림을 전송합니다.",
          en: "Pressure sensors monitor adhesion status in 1ms units and immediately send alerts when anomalies are detected.",
        },
      },
      {
        icon: "Droplet",
        title: { ko: "밀봉 강화 스커트", en: "Reinforced Sealing Skirt" },
        description: {
          ko: "불규칙한 표면 굴곡에도 기밀을 유지하는 4중 밀봉 스커트 구조를 채택했습니다.",
          en: "Adopts a 4-layer sealing skirt structure that maintains airtightness even on irregular surface irregularities.",
        },
      },
    ],
    specs: [
      { label: { ko: "최대 음압", en: "Max. Negative Pressure" }, value: "8 kPa" },
      { label: { ko: "청소 면적", en: "Cleaning Area" }, value: "50 m²" },
      { label: { ko: "이동 속도", en: "Movement Speed" }, value: "0.45 m/s" },
      { label: { ko: "배터리", en: "Battery" }, value: "48V 25Ah (5h)" },
      { label: { ko: "본체 중량", en: "Unit Weight" }, value: "15 kg" },
      { label: { ko: "대응 표면", en: "Compatible Surfaces" }, value: "10+ 재질" },
      { label: { ko: "압력 응답", en: "Pressure Response" }, value: "< 1 ms" },
      { label: { ko: "IP 등급", en: "IP Rating" }, value: "IP65" },
    ],
    images: [
      "/images/products/akerf/main.jpg",
      "/images/products/akerf/mechanism.jpg",
      "/images/products/akerf/surface.jpg",
      "/images/products/akerf/detail.jpg",
    ],
  },

  // ── 7. HiWonder ─────────────────────────────────────────────
  {
    id: "hiwonder",
    slug: "hiwonder",
    category: "edu",
    name: { ko: "HiWonder EDU", en: "HiWonder EDU" },
    tagline: {
      ko: "ROS2로 여는 로봇 교육의 미래",
      en: "Opening the Future of Robot Education with ROS2",
    },
    description: {
      ko: "HiWonder EDU는 ROS2(Robot Operating System 2) 기반의 교육 전문 로봇 플랫폼입니다. NVIDIA Jetson Nano를 탑재하여 실제 산업 현장과 동일한 AI·로봇 기술을 교육 환경에서 체험할 수 있습니다. 초·중급 프로그래밍부터 LiDAR SLAM까지 단계별 커리큘럼을 제공합니다.",
      en: "HiWonder EDU is an education-focused robot platform based on ROS2 (Robot Operating System 2). Equipped with NVIDIA Jetson Nano, it enables experience of the same AI and robotics technology found in actual industrial sites in an educational environment, with step-by-step curriculum from beginner programming to LiDAR SLAM.",
    },
    features: [
      {
        icon: "Cpu",
        title: { ko: "NVIDIA Jetson Nano", en: "NVIDIA Jetson Nano" },
        description: {
          ko: "128코어 GPU가 탑재된 Jetson Nano로 실시간 AI 추론 및 영상 처리 실습이 가능합니다.",
          en: "128-core GPU Jetson Nano enables real-time AI inference and image processing practice.",
        },
      },
      {
        icon: "Map",
        title: { ko: "LiDAR SLAM 내비게이션", en: "LiDAR SLAM Navigation" },
        description: {
          ko: "360° LiDAR와 ROS2 Nav2 스택으로 자율 지도 생성과 경로 계획을 실습합니다.",
          en: "Practice autonomous map creation and path planning with 360° LiDAR and ROS2 Nav2 stack.",
        },
      },
      {
        icon: "BookOpen",
        title: { ko: "단계별 커리큘럼", en: "Step-by-Step Curriculum" },
        description: {
          ko: "Python 기초부터 C++ ROS2 노드 작성, 딥러닝 YOLO 물체 감지까지 40개 실습 모듈을 제공합니다.",
          en: "Provides 40 practice modules from Python basics to C++ ROS2 node writing and deep learning YOLO object detection.",
        },
      },
      {
        icon: "Puzzle",
        title: { ko: "모듈형 하드웨어", en: "Modular Hardware" },
        description: {
          ko: "카메라, 로봇 팔, 라이다, IMU 등 15종의 모듈을 조합하여 다양한 구성을 실험합니다.",
          en: "Experiment with various configurations by combining 15 types of modules including cameras, robot arms, LiDAR, and IMU.",
        },
      },
    ],
    specs: [
      { label: { ko: "메인 프로세서", en: "Main Processor" }, value: "NVIDIA Jetson Nano 4GB" },
      { label: { ko: "운영체제", en: "Operating System" }, value: "Ubuntu 22.04 + ROS2 Humble" },
      { label: { ko: "배터리", en: "Battery" }, value: "14.8V 10Ah (4h)" },
      { label: { ko: "LiDAR 범위", en: "LiDAR Range" }, value: "360° / 12 m" },
      { label: { ko: "카메라", en: "Camera" }, value: "Intel RealSense D435i" },
      { label: { ko: "프로그래밍 언어", en: "Programming Language" }, value: "Python 3 / C++17" },
      { label: { ko: "통신", en: "Communication" }, value: "Wi-Fi 6 / Bluetooth 5.0" },
      { label: { ko: "본체 중량", en: "Unit Weight" }, value: "3.2 kg" },
    ],
    images: [
      "/images/products/hiwonder/main.jpg",
      "/images/products/hiwonder/ros2.jpg",
      "/images/products/hiwonder/curriculum.jpg",
      "/images/products/hiwonder/modules.jpg",
    ],
  },
];

// ─────────────────────────────────────────────────────────────
//  Public API
// ─────────────────────────────────────────────────────────────

/** Returns all products resolved to a specific locale */
export function getProducts(locale: "ko" | "en"): ResolvedProduct[] {
  return rawProducts.map((p) => resolveProduct(p, locale));
}

/** Returns a single product by slug, resolved to a specific locale */
export function getProductBySlug(
  slug: string,
  locale: "ko" | "en"
): ResolvedProduct | undefined {
  const raw = rawProducts.find((p) => p.slug === slug);
  return raw ? resolveProduct(raw, locale) : undefined;
}

/** Returns all product slugs (for generateStaticParams) */
export function getAllSlugs(): string[] {
  return rawProducts.map((p) => p.slug);
}

// ─────────────────────────────────────────────────────────────
//  Internal helpers
// ─────────────────────────────────────────────────────────────
function resolveProduct(p: RawProduct, locale: "ko" | "en"): ResolvedProduct {
  return {
    id: p.id,
    slug: p.slug,
    category: p.category,
    name: p.name[locale],
    tagline: p.tagline[locale],
    description: p.description[locale],
    features: p.features.map((f) => ({
      icon: f.icon,
      title: f.title[locale],
      description: f.description[locale],
    })),
    specs: p.specs.map((s) => ({
      label: s.label[locale],
      value: s.value,
    })),
    images: p.images.map((src, i) => ({
      src,
      alt: `${p.name[locale]} ${i + 1}`,
      isPrimary: i === 0,
    })),
  };
}
