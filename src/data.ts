/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CangzhouFood, CanalStation } from "./types";

export const CANGZHOU_GOURMETS: CangzhouFood[] = [
  {
    id: "jujube-zong",
    name: "Golden Silk Jujube Zongzi",
    nativeName: "金丝小枣粽子",
    tagline: "千年贡枣缀香黍，运河甘泉裹绿衣",
    description: "沧州金丝小枣以皮薄肉厚、含糖量高、掰开能拉出细金丝而闻名。在端午节，当地人将红润剔透的小枣镶入香糯的黍米或糯米中，用新鲜芦苇叶包好。经大火蒸煮，枣香与苇香、米香浑然一体，是运河两岸端午时节最温馨的乡土美味。",
    ingredients: ["沧州金丝小枣", "香糯白糯米", "天然高山箬叶", "太行山泉水"],
    history: "沧州红枣栽培历史逾3000年，始于春秋，繁盛于唐宋，曾被列为明清皇家贡品。运河水系滋养了沿岸肥沃的沙质土壤，成就了小枣独一无二的甜密风味，使其成为端午粽子的灵魂伴侣。",
    recommendedSpots: [
      "沧县建国镇红枣示范基地",
      "沧州鼓楼古街老字号点心铺",
      "百狮园端午非遗美食集市"
    ],
    festivalConnection: "端午佳节，沧州各家各户清晨便开始熬煮枣粽。甜美的小枣不仅中和了粽子本身的清淡，拉出的闪亮金丝更寓意着生活甜蜜长久、福运延绵不断。"
  },
  {
    id: "hotpot-chicken",
    name: "Cangzhou Hotpot Chicken",
    nativeName: "沧州火锅鸡",
    tagline: "川味香辣融北风，一锅红火暖乡情",
    description: "选用肉质鲜嫩的散养三黄鸡，佐以数十种川滇香料及沧州特产红干椒。鸡肉在特制的铜锅中煨煮，随着红油沸腾，麻辣鲜香扑鼻而来。吃时必配上当地醇厚的沧州米醋与捣碎的紫皮大蒜，酸辣解腻，酥软脱骨，让人大呼过瘾。",
    ingredients: ["嫩滑散养鸡肉", "沧州特产豆瓣酱", "太行红干椒", "沧州老米醋", "紫皮大蒜"],
    history: "起源于20世纪80年代的沧州街头，是南北文化交流的奇妙结晶。沧州人将南方川味火锅的豪放麻辣，与北方炖大鸡的淳朴做法合二为一，迅速火遍全城，成为无数外地游子回乡后第一顿必吃的‘灵魂家常味’。",
    recommendedSpots: [
      "老沧州火锅鸡（运河区总店）",
      "028火锅鸡（沧县红街店）",
      "沧州老兵火锅鸡连锁"
    ],
    festivalConnection: "在端午龙舟赛后，沧州百姓常阖家聚拢在热气腾腾的铜锅旁。红亮的干油、沸腾的鸡汤代表着日子红红火火，是大快朵颐、把酒言欢的首选美食。"
  },
  {
    id: "donkey-burger",
    name: "Hejian Donkey Burger",
    nativeName: "河间驴肉火烧",
    tagline: "层层金黄酥脆皮，软糯醇香天上肉",
    description: "‘天上龙肉，地上驴肉’。河间驴肉火烧采用死面（不发酵面团）经反复摺叠擀制，在平底锅和烤炉里双重炙烤，形成外皮金黄酥脆、内里空心呈百叶状的火烧。趁热剖开，塞入经过二十余味中药焖煮、肥而不腻、瘦而不柴的冷切驴肉与清脆青椒，咬一口，酥皮粉碎，丰腴多汁。",
    ingredients: ["手工多层空心火烧", "秘制冷切驴肉", "焖淋驴肉老汤", "新鲜小青椒"],
    history: "河间驴肉火烧历史可追溯至唐代。相传唐玄宗李隆基下江南途经河间，品尝后大加赞赏。大运河漕运兴盛时期，火烧因易于携带且高能美味，成为运河纤夫、客商最喜爱的干粮，流传至今成为非物质文化遗产。",
    recommendedSpots: [
      "高家驴肉火烧（河间府前街店）",
      "大马驴肉火烧（运河堤畔店）",
      "沧州西客站非遗火烧铺"
    ],
    festivalConnection: "端午出游大运河，带上几个外脆里嫩的驴肉火烧作为行囊野餐，就着运河的和煦微风，每一口都是流淌了千年的市井烟火气。"
  },
  {
    id: "lamp-intestine",
    name: "Cangzhou Lamb Intestine Soup",
    nativeName: "沧州羊肠汤",
    tagline: "沸腾白汤含五脏，沧州汉子最爱香",
    description: "沧州俗语：‘不吃羊肠子，白来沧州子’。选用洗净的羊小肠、羊大肠、羊血、羊肺等，放入大骨吊制而成的老汤中慢火慢熬。盛汤时，师傅刀工脆落，将各种内脏切段码入大碗，浇上奶白滚烫的高汤。撒上大把碧绿的香菜与一勺通红的辣油，看似粗犷，入口却毫无腥膻，鲜美至极，汤暖润胃。",
    ingredients: ["新鲜羊肠、羊血、鲜羊肺", "原滚羊骨老汤", "葱姜八角秘制料", "本地野生香菜"],
    history: "起源于运河漕运时期的早市。早晨天色未亮，运河码头的纤夫工人们就需要高能量的食物御寒、充沛体力。那一碗滚烫、油汪、廉价却极富滋养的羊肠汤便应运而生，磨砺出了沧州人豪爽大气的性格底色。",
    recommendedSpots: [
      "兴盛羊肠子（新华路老店）",
      "水月寺羊肠子（经典坊）",
      "市府西街老坎羊肠"
    ],
    festivalConnection: "端午朝阳初升，运河畔晨雾袅袅，一碗羊肠汤下肚，浑身热汗淋漓，仿佛能唤醒古老燕赵之地的万丈豪情，干劲十足地迎接龙舟竞渡。"
  }
];

export const CANAL_STATIONS: CanalStation[] = [
  {
    id: "jiedi",
    name: "捷地御口",
    mileage: "运河沧州段起点",
    description: "捷地减河与南运河在此汇聚。康熙皇帝曾六下江南，五次驻跸沧州，在此亲题河防诗，堪称南运河上最为震撼的‘御制皇家水利丰碑’。",
    historicRelic: "清代石闸、御碑亭及始建于明代的镇水铜犀",
    specialtyGourmet: "金丝小枣粽子",
    longitudePercent: 15
  },
  {
    id: "baishi",
    name: "百狮园码头",
    mileage: "运河城区核心段",
    description: "穿过沧州城区的南运河在这里形成一个优美的几字湾。百狮园沿河而建，林木繁茂，怪石叠嶂，雕刻有上百只形态各异的石狮，生动还原桥梁雕刻艺术。",
    historicRelic: "百年古桑树群、非遗运河号子台、铁狮子微缩雕像",
    specialtyGourmet: "沧州火锅鸡",
    longitudePercent: 45
  },
  {
    id: "shuishi",
    name: "水月寺古渡",
    mileage: "古运河漕运枢纽",
    description: "自宋代以来，这里便是南北盐运和商贸的必经关隘，‘万家灯火临河岸，千帆林立水月间’，承载了沧州千年的集市繁华和码头故事。",
    historicRelic: "水月禅寺旧址、漕运税所闸台遗迹",
    specialtyGourmet: "沧州羊肠汤",
    longitudePercent: 75
  },
  {
    id: "hejian-station",
    name: "河间古城驿",
    mileage: "大运河两翼重镇",
    description: "位于运河西侧的千年古县，古为‘燕赵雄关’，曾设皇家贡品驿站。因北运河漕粮流经，文风昌盛，是古今游客进入沧州大饱口福的西大门。",
    historicRelic: "河间府署、毛公书院旧址、古城墙遗风",
    specialtyGourmet: "河间驴肉火烧",
    longitudePercent: 95
  }
];
