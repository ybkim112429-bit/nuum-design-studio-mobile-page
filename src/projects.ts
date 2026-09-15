/* ------------------------------------------------------------------ *
 * PROJECT DATABASE · real work
 * Source: existing portfolio of NUUM's creative director (Kim Yeong Beom),
 *   https://ybkim112429-bit.github.io/ybkim-portfolio/
 * Cover + stitched sequence images are the real project images, hotlinked
 *   from that repository. Categories mirror the source portfolio; empty
 *   categories are never shown. No fabricated projects.
 * Only confirmable facts are recorded — unknown fields stay empty and are
 *   hidden in the UI. Roles vary by engagement; nothing is rewritten as
 *   "solely by NUUM".
 * ------------------------------------------------------------------ */

const BASE = "https://ybkim112429-bit.github.io/ybkim-portfolio/assets/images";
const cover = (slug: string) => `${BASE}/project-covers/${slug}.jpg`;
const stitch = (slug: string) => `${BASE}/project-stitches/${slug}.jpg`;

export type CatKey =
  | "hospitality"
  | "culture"
  | "food"
  | "education"
  | "office"
  | "healthcare"
  | "entertainment"
  | "realestate";

export const CATEGORIES: { key: CatKey; en: string; cn: string }[] = [
  { key: "hospitality", en: "HOSPITALITY", cn: "酒店" },
  { key: "culture", en: "CULTURE & EXHIBITION", cn: "文化 · 展陈" },
  { key: "food", en: "FOOD & BEVERAGE", cn: "餐饮" },
  { key: "education", en: "EDUCATION & SPORTS", cn: "教育 · 体育" },
  { key: "office", en: "OFFICE & CIVIC", cn: "办公 · 政务" },
  { key: "healthcare", en: "HEALTHCARE & WELLNESS", cn: "医疗 · 康养" },
  { key: "entertainment", en: "ENTERTAINMENT", cn: "娱乐" },
  { key: "realestate", en: "REAL ESTATE", cn: "地产" },
];

export type Project = {
  slug: string;
  cn: string; // Chinese name — primary
  en: string; // English name — secondary
  cat: CatKey;
  place: string; // "" when not confirmable
  year: string; // "" when not confirmable
  award?: string;
  cover: string;
  stitch: string;
  overviewCn: string;
  overviewEn: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "qingdao-beer-time-coast-hotel",
    cn: "青岛啤酒时光海岸花园酒店",
    en: "QINGDAO BEER TIME COAST GARDEN HOTEL",
    cat: "hospitality",
    place: "Qingdao",
    year: "2021–2022",
    award: "MUSE Design Awards · Platinum, 2023",
    cover: cover("qingdao-beer-time-coast-hotel"),
    stitch: stitch("qingdao-beer-time-coast-hotel"),
    overviewCn:
      "以海岸的光与时间为线索，为旅居重构一处可以慢下来的场所。约 1.5 万㎡ 的尺度里，让空间回到停留本身。",
    overviewEn:
      "A coastal retreat organised around light and the passage of time — roughly 15,000 m² shaped so the space returns to the act of staying.",
  },
  {
    slug: "qingdao-snow-world-hotel",
    cn: "青岛滑雪世界酒店",
    en: "QINGDAO SNOW WORLD HOTEL",
    cat: "hospitality",
    place: "Qingdao",
    year: "",
    cover: cover("qingdao-snow-world-hotel"),
    stitch: stitch("qingdao-snow-world-hotel"),
    overviewCn: "在冰雪主题与旅居体验之间，寻找一种克制而温暖的空间语言。",
    overviewEn:
      "Between an alpine theme and the calm of hospitality, a restrained yet warm spatial language.",
  },
  {
    slug: "linyi-agricultural-research-hotel",
    cn: "临沂农业研究院酒店设计",
    en: "LINYI AGRICULTURAL RESEARCH HOTEL",
    cat: "hospitality",
    place: "Linyi",
    year: "",
    cover: cover("linyi-agricultural-research-hotel"),
    stitch: stitch("linyi-agricultural-research-hotel"),
    overviewCn: "将研究院的理性秩序，转译为可居可停的待客空间。",
    overviewEn:
      "The measured order of a research institute, translated into space made for rest and welcome.",
  },
  {
    slug: "dezhou-qishi-museum",
    cn: "德州奇石博物馆",
    en: "DEZHOU CURIOUS STONE MUSEUM",
    cat: "culture",
    place: "Dezhou",
    year: "",
    cover: cover("dezhou-qishi-museum"),
    stitch: stitch("dezhou-qishi-museum"),
    overviewCn: "以石为主角，用最克制的界面让藏品自己说话。",
    overviewEn:
      "Stone as the protagonist — the quietest of interfaces, letting the collection speak for itself.",
  },
  {
    slug: "luhua-cultural-academy",
    cn: "鲁花国学文化馆",
    en: "LUHUA SINOLOGY CULTURAL HALL",
    cat: "culture",
    place: "Shandong",
    year: "",
    cover: cover("luhua-cultural-academy"),
    stitch: stitch("luhua-cultural-academy"),
    overviewCn: "在当代空间里安放传统的秩序与温度，让文化可被身体感知。",
    overviewEn:
      "The order and warmth of tradition set within a contemporary space, made perceptible to the body.",
  },
  {
    slug: "qingdao-historic-architecture-museum",
    cn: "青岛历史建筑展览馆",
    en: "QINGDAO HISTORIC ARCHITECTURE MUSEUM",
    cat: "culture",
    place: "Qingdao",
    year: "",
    cover: cover("qingdao-historic-architecture-museum"),
    stitch: stitch("qingdao-historic-architecture-museum"),
    overviewCn: "让城市的记忆在展陈中被重新阅读，尊重原有的尺度与关系。",
    overviewEn:
      "The city's memory re-read through exhibition, respecting the original scale and relationships.",
  },
  {
    slug: "rolls-royce-showroom",
    cn: "青岛劳斯莱斯展厅 · 万丽海景店",
    en: "ROLLS-ROYCE SHOWROOM · RENAISSANCE",
    cat: "culture",
    place: "Qingdao",
    year: "",
    cover: cover("rolls-royce-showroom"),
    stitch: stitch("rolls-royce-showroom"),
    overviewCn: "以静默的材料与光，衬托品牌本身的分量。",
    overviewEn:
      "Silent materials and light, set to carry the weight of the marque itself.",
  },
  {
    slug: "shijiazhuang-aquarium-renovation",
    cn: "石家庄海洋馆改造",
    en: "SHIJIAZHUANG AQUARIUM RENOVATION",
    cat: "culture",
    place: "Shijiazhuang",
    year: "",
    cover: cover("shijiazhuang-aquarium-renovation"),
    stitch: stitch("shijiazhuang-aquarium-renovation"),
    overviewCn: "在既有结构中重塑观展的动线与氛围，让空间重新呼吸。",
    overviewEn:
      "Within the existing structure, the visitor's path and atmosphere are reshaped so the space breathes again.",
  },
  {
    slug: "zoucheng-old-no1-cultural-plaza",
    cn: "邹城市老一中文创广场",
    en: "ZOUCHENG NO.1 SCHOOL CULTURAL PLAZA",
    cat: "culture",
    place: "Zoucheng",
    year: "",
    cover: cover("zoucheng-old-no1-cultural-plaza"),
    stitch: stitch("zoucheng-old-no1-cultural-plaza"),
    overviewCn: "把校园的集体记忆，转化为可停留、可交流的城市文创场所。",
    overviewEn:
      "The collective memory of a school turned into a public place for gathering and exchange.",
  },
  {
    slug: "hey-yogurt-store-03",
    cn: "HEY YOGURT 三号店",
    en: "HEY YOGURT STORE NO.03",
    cat: "food",
    place: "",
    year: "",
    cover: cover("hey-yogurt-store-03"),
    stitch: stitch("hey-yogurt-store-03"),
    overviewCn: "以品牌为核心，用材料与光线塑造轻盈而当代的味觉场景。",
    overviewEn:
      "Brand at the core — material and light shaping a light, contemporary scene for taste.",
  },
  {
    slug: "hey-yogurt-store-04",
    cn: "HEY YOGURT 四号店",
    en: "HEY YOGURT STORE NO.04",
    cat: "food",
    place: "",
    year: "",
    cover: cover("hey-yogurt-store-04"),
    stitch: stitch("hey-yogurt-store-04"),
    overviewCn: "延续品牌语言，在新的场地条件下寻找恰当的比例与节奏。",
    overviewEn:
      "The brand language continued, finding the right proportion and rhythm for a new site.",
  },
  {
    slug: "hey-yogurt-store-05",
    cn: "HEY YOGURT 五号店",
    en: "HEY YOGURT STORE NO.05",
    cat: "food",
    place: "",
    year: "",
    cover: cover("hey-yogurt-store-05"),
    stitch: stitch("hey-yogurt-store-05"),
    overviewCn: "在连锁的一致性与场地的独特性之间，保持克制的平衡。",
    overviewEn:
      "A restrained balance between the consistency of a chain and the particularity of a site.",
  },
  {
    slug: "yuexiang-wagyu-restaurant",
    cn: "青岛悦厢和牛",
    en: "YUEXIANG WAGYU RESTAURANT",
    cat: "food",
    place: "Qingdao",
    year: "",
    cover: cover("yuexiang-wagyu-restaurant"),
    stitch: stitch("yuexiang-wagyu-restaurant"),
    overviewCn: "以温润的材质与低语般的光，营造一处专注于味觉的静空间。",
    overviewEn:
      "Warm materials and light like a whisper, a quiet room devoted to taste.",
  },
  {
    slug: "cup-swimming-pool",
    cn: "中国石油大学游泳馆",
    en: "CHINA UNIVERSITY OF PETROLEUM NATATORIUM",
    cat: "education",
    place: "Qingdao",
    year: "",
    cover: cover("cup-swimming-pool"),
    stitch: stitch("cup-swimming-pool"),
    overviewCn: "在大跨度的运动空间里，用光与结构建立清晰而理性的秩序。",
    overviewEn:
      "In a long-span sports hall, light and structure establish a clear, rational order.",
  },
  {
    slug: "ouc-huangdao-library",
    cn: "中国海洋大学图书馆",
    en: "OCEAN UNIVERSITY OF CHINA LIBRARY",
    cat: "education",
    place: "Qingdao",
    year: "",
    cover: cover("ouc-huangdao-library"),
    stitch: stitch("ouc-huangdao-library"),
    overviewCn: "为阅读与思考，塑造一处安静、专注而持久的空间。",
    overviewEn:
      "A space for reading and thought — quiet, focused and enduring.",
  },
  {
    slug: "shandong-foreign-language-vocational-university-1",
    cn: "山东外国语职业技术大学 · 1 号楼",
    en: "SHANDONG FL VOCATIONAL UNIVERSITY · BLDG 1",
    cat: "education",
    place: "Shandong",
    year: "",
    cover: cover("shandong-foreign-language-vocational-university-1"),
    stitch: stitch("shandong-foreign-language-vocational-university-1"),
    overviewCn: "以清晰的动线与克制的界面，服务于日常的教与学。",
    overviewEn:
      "Clear circulation and restrained surfaces, in service of everyday teaching and learning.",
  },
  {
    slug: "shandong-foreign-language-vocational-university-2",
    cn: "山东外国语职业技术大学 · 2 号楼",
    en: "SHANDONG FL VOCATIONAL UNIVERSITY · BLDG 2",
    cat: "education",
    place: "Shandong",
    year: "",
    cover: cover("shandong-foreign-language-vocational-university-2"),
    stitch: stitch("shandong-foreign-language-vocational-university-2"),
    overviewCn: "延续校园整体语言，在第二栋中深化空间的秩序与温度。",
    overviewEn:
      "The campus language continued — order and warmth deepened in the second building.",
  },
  {
    slug: "emeishan-road-middle-school",
    cn: "峨嵋山路中学",
    en: "EMEISHAN ROAD MIDDLE SCHOOL",
    cat: "education",
    place: "Qingdao",
    year: "",
    cover: cover("emeishan-road-middle-school"),
    stitch: stitch("emeishan-road-middle-school"),
    overviewCn: "为成长中的身体与心智，设计明亮、有序而不张扬的校园空间。",
    overviewEn:
      "For growing bodies and minds — a campus that is bright, ordered and unassuming.",
  },
  {
    slug: "baoyuan-road-kindergarten",
    cn: "宝源路幼儿园",
    en: "BAOYUAN ROAD KINDERGARTEN",
    cat: "education",
    place: "",
    year: "",
    cover: cover("baoyuan-road-kindergarten"),
    stitch: stitch("baoyuan-road-kindergarten"),
    overviewCn: "以柔和的尺度与色彩，为孩子建立安全、友好的第一处公共空间。",
    overviewEn:
      "Gentle scale and colour, a child's first public space — safe and welcoming.",
  },
  {
    slug: "hisense-liaoyang-road-office",
    cn: "海信 · 辽阳路 1 号办公样板间",
    en: "HISENSE LIAOYANG ROAD OFFICE",
    cat: "office",
    place: "Qingdao",
    year: "",
    cover: cover("hisense-liaoyang-road-office"),
    stitch: stitch("hisense-liaoyang-road-office"),
    overviewCn: "以理性的秩序与克制的材料，塑造当代企业的工作场景。",
    overviewEn:
      "Rational order and restrained materials, shaping a contemporary corporate workplace.",
  },
  {
    slug: "rizhao-port-guomao-h-office",
    cn: "日照港国贸 H 座办公楼改造",
    en: "RIZHAO PORT GUOMAO TOWER H OFFICE",
    cat: "office",
    place: "Rizhao",
    year: "",
    cover: cover("rizhao-port-guomao-h-office"),
    stitch: stitch("rizhao-port-guomao-h-office"),
    overviewCn: "在既有办公楼中重塑空间品质，让日常工作更有尊严。",
    overviewEn:
      "Spatial quality renewed within an existing office tower, giving daily work more dignity.",
  },
  {
    slug: "zhongjia-yingrui-medical-industrial-park",
    cn: "烟台中嘉英瑞医工产业园",
    en: "YANTAI ZHONGJIA YINGRUI MEDICAL PARK",
    cat: "office",
    place: "Yantai",
    year: "",
    cover: cover("zhongjia-yingrui-medical-industrial-park"),
    stitch: stitch("zhongjia-yingrui-medical-industrial-park"),
    overviewCn: "为医工融合的产业空间，建立清晰、理性而人性的空间框架。",
    overviewEn:
      "A clear, rational and humane spatial framework for a medical-industrial park.",
  },
  {
    slug: "shouguang-rehabilitation-center",
    cn: "寿光康复中心",
    en: "SHOUGUANG REHABILITATION CENTER",
    cat: "healthcare",
    place: "Shouguang",
    year: "",
    cover: cover("shouguang-rehabilitation-center"),
    stitch: stitch("shouguang-rehabilitation-center"),
    overviewCn: "以温和的光线与材质，为康复与疗愈建立安定的空间氛围。",
    overviewEn:
      "Soft light and material, a settled atmosphere made for recovery and care.",
  },
  {
    slug: "qingdao-cancer-hospital",
    cn: "青岛肿瘤医院室内设计",
    en: "QINGDAO CANCER HOSPITAL",
    cat: "healthcare",
    place: "Qingdao",
    year: "",
    cover: cover("qingdao-cancer-hospital"),
    stitch: stitch("qingdao-cancer-hospital"),
    overviewCn: "在严谨的医疗流程之上，以人性的尺度缓解空间的紧张。",
    overviewEn:
      "Upon a rigorous clinical process, a human scale that eases the tension of the space.",
  },
  {
    slug: "changchun-shanye-bar",
    cn: "长春山也酒吧",
    en: "CHANGCHUN SHANYE BAR",
    cat: "entertainment",
    place: "Changchun",
    year: "",
    cover: cover("changchun-shanye-bar"),
    stitch: stitch("changchun-shanye-bar"),
    overviewCn: "以低光与厚重的材质，营造夜晚里可以沉浸的情绪场所。",
    overviewEn:
      "Low light and heavy material, an immersive place for the mood of the night.",
  },
  {
    slug: "inner-mongolia-naobao-water-world",
    cn: "内蒙古脑包水上乐园室内设计",
    en: "INNER MONGOLIA NAOBAO WATER WORLD",
    cat: "entertainment",
    place: "Inner Mongolia",
    year: "",
    cover: cover("inner-mongolia-naobao-water-world"),
    stitch: stitch("inner-mongolia-naobao-water-world"),
    overviewCn: "在大体量的娱乐空间中，用清晰的秩序驾驭复杂的体验。",
    overviewEn:
      "Within a large entertainment volume, a clear order governs a complex experience.",
  },
  {
    slug: "huangdao-ruiyuan-sales-center",
    cn: "瑞源售楼处",
    en: "RUIYUAN SALES CENTER",
    cat: "realestate",
    place: "Qingdao",
    year: "",
    cover: cover("huangdao-ruiyuan-sales-center"),
    stitch: stitch("huangdao-ruiyuan-sales-center"),
    overviewCn: "以克制而有质感的空间，承载对未来生活的想象。",
    overviewEn:
      "A restrained, tactile space carrying the imagination of a future life.",
  },
];

/** Categories that actually contain projects, in fixed order, with counts. */
export function activeCategories() {
  return CATEGORIES.map((c) => ({
    ...c,
    count: PROJECTS.filter((p) => p.cat === c.key).length,
  })).filter((c) => c.count > 0);
}
