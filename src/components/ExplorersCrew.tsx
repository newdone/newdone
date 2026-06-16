/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, MessageCircle, Heart, HeartCrack } from "lucide-react";

interface Explorer {
  id: string;
  name: string;
  role: string;
  themeColor: string;
  quote: string;
  avatarClass: string;
  renderAvatar: () => React.ReactNode;
}

export default function ExplorersCrew() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({
    aqiu: 28,
    chaoge: 32,
    nuomi: 45,
    wenai: 24,
    daliang: 36,
    juanjuan: 88,
    meiqiu: 99,
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const explorers: Explorer[] = [
    {
      id: "aqiu",
      name: "阿秋",
      role: "美食先锋",
      themeColor: "#2a4d3e",
      quote: "运河的风带着微甜的麦香和大枣的香气，和大家一起出游真是太棒了！我已经标好了路线，直接出发吧！🎒👋",
      avatarClass: "bg-slate-800",
      renderAvatar: () => (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Female, dark ponytail, black denim/jacket */}
          <circle cx="50" cy="50" r="45" fill="#132a1e" stroke="#c28434" strokeWidth="2" />
          {/* Hair back */}
          <path d="M 35,40 Q 50,15 65,40" fill="#1c1c1c" />
          <circle cx="70" cy="35" r="10" fill="#1c1c1c" /> {/* Ponytail */}
          {/* Face */}
          <circle cx="50" cy="46" r="22" fill="#ffd8c2" />
          {/* Hair front */}
          <path d="M 28,40 Q 50,22 72,40 Q 65,30 50,32 Q 35,30 28,40 Z" fill="#1c1c1c" />
          {/* Eyes & Smile */}
          <ellipse cx="42" cy="44" r="2.5" rx="1.5" ry="3" fill="#1c1c1c" />
          <ellipse cx="58" cy="44" r="2.5" rx="1.5" ry="3" fill="#1c1c1c" />
          <path d="M 40,41 Q 42,39 44,41" stroke="#1c1c1c" strokeWidth="1" fill="none" />
          <path d="M 56,41 Q 58,39 60,41" stroke="#1c1c1c" strokeWidth="1" fill="none" />
          {/* Rosy cheeks */}
          <circle cx="37" cy="50" r="3" fill="#ff7f7f" opacity="0.6" />
          <circle cx="63" cy="50" r="3" fill="#ff7f7f" opacity="0.6" />
          {/* Smile */}
          <path d="M 44,53 Q 50,58 56,53" stroke="#aa3333" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Hand waving */}
          <path d="M 75,60 Q 82,45 80,40" stroke="#ffd8c2" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M 80,40 Q 78,36 75,40" stroke="#ffd8c2" strokeWidth="2" fill="none" />
          {/* Clothes: Black jacket with blue strap */}
          <path d="M 25,75 C 25,65 30,58 50,58 C 70,58 75,65 75,75 Z" fill="#2d3748" />
          {/* Blue strap */}
          <path d="M 32,58 Q 36,68 40,75" stroke="#3182ce" strokeWidth="4.5" fill="none" />
          {/* Inner Collar */}
          <path d="M 44,58 L 50,64 L 56,58" stroke="#ffffff" strokeWidth="2" fill="none" />
        </svg>
      ),
    },
    {
      id: "chaoge",
      name: "潮哥",
      role: "驴火鉴赏官",
      themeColor: "#b23b3b",
      quote: "墨镜必不可少，红卫卫衣一穿。沧州的河间驴肉火烧，那可是舌尖上的绝绝子，必须趁热吃满口香！🕶️🥐",
      avatarClass: "bg-red-950",
      renderAvatar: () => (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Male, sunglasses, red hoodie */}
          <circle cx="50" cy="50" r="45" fill="#2b0d0d" stroke="#c28434" strokeWidth="2" />
          {/* Face */}
          <circle cx="50" cy="46" r="21" fill="#ffdfcb" />
          {/* Hair */}
          <path d="M 28,34 Q 50,15 72,34 C 68,26 62,24 50,26 C 38,24 32,26 28,34 Z" fill="#1a1a1a" />
          {/* Sunglasses (very cool!) */}
          <rect x="34" y="38" width="14" height="9" rx="3" fill="#111" stroke="#ffd700" strokeWidth="1" />
          <rect x="52" y="38" width="14" height="9" rx="3" fill="#111" stroke="#ffd700" strokeWidth="1" strokeLinecap="round" />
          <line x1="48" y1="41" x2="52" y2="41" stroke="#ffd700" strokeWidth="2" />
          {/* Smile */}
          <path d="M 45,54 Q 50,59 55,54" stroke="#8a2222" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Red hoodie hood edge & body */}
          <path d="M 23,75 Q 23,58 50,58 Q 77,58 77,75 Z" fill="#c53030" />
          {/* Inner dark gray shirt collar */}
          <path d="M 44,58 L 50,65 L 56,58" fill="#4a5568" />
          {/* Hoodie strings */}
          <line x1="45" y1="62" x2="45" y2="72" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="55" y1="62" x2="55" y2="72" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
          {/* Star on cheek */}
          <circle cx="34" cy="52" r="1.5" fill="#ffd700" />
        </svg>
      ),
    },
    {
      id: "nuomi",
      name: "小糯米",
      role: "红枣品鉴家",
      themeColor: "#cc6688",
      quote: "英妈妈！快看，咱们一起比个大爱心！❤️ 我要吃金丝小枣大粽子，里面有很多甜糯糯的小红枣哦！🌾🍬",
      avatarClass: "bg-pink-950",
      renderAvatar: () => (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Little girl, twin buns, pink jacket */}
          <circle cx="50" cy="50" r="45" fill="#301524" stroke="#c28434" strokeWidth="2" />
          {/* Hair buns */}
          <circle cx="28" cy="26" r="11" fill="#2d1e25" />
          <circle cx="72" cy="26" r="11" fill="#2d1e25" />
          {/* Face */}
          <circle cx="50" cy="48" r="22" fill="#ffece0" />
          {/* Hair Bangs */}
          <path d="M 26,45 Q 50,30 74,45 Q 70,36 50,38 Q 30,36 26,45 Z" fill="#2d1e25" />
          {/* Eyes (big & glowing) */}
          <circle cx="41" cy="46" r="3" fill="#111111" />
          <circle cx="42" cy="45" r="1" fill="#ffffff" />
          <circle cx="59" cy="46" r="3" fill="#111111" />
          <circle cx="60" cy="45" r="1" fill="#ffffff" />
          {/* Cheeks (super rosy) */}
          <circle cx="35" cy="53" r="5" fill="#ffa0a0" opacity="0.8" />
          <circle cx="65" cy="53" r="5" fill="#ffa0a0" opacity="0.8" />
          {/* Laughing mouth */}
          <path d="M 46,55 Q 50,60 54,55" stroke="#d53f8c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Pink clothes */}
          <path d="M 25,75 C 25,65 32,60 50,60 C 68,60 75,65 75,75 Z" fill="#eb4899" />
          {/* Fluffy white collar */}
          <path d="M 38,60 Q 44,65 50,60 Q 56,65 62,60" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Left sleeve making part of heart */}
          <path d="M 28,75 Q 18,63 26,58" stroke="#eb4899" strokeWidth="7" fill="none" strokeLinecap="round" />
          <circle cx="26" cy="58" r="3.5" fill="#ffece0" />
        </svg>
      ),
    },
    {
      id: "wenai",
      name: "温阿姨",
      role: "风光护航者",
      themeColor: "#5c7a5c",
      quote: "听着大运河号子，看着孩子们比划爱心，端午佳节，能与亲人共赏沧州水陆美景就是莫大安慰。🍵🍃",
      avatarClass: "bg-emerald-950",
      renderAvatar: () => (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Gentle adult female, short hair, olive green coat */}
          <circle cx="50" cy="50" r="45" fill="#0c1d15" stroke="#c28434" strokeWidth="2" />
          {/* Hair back */}
          <path d="M 25,44 C 25,20 75,20 75,44 Z" fill="#2d302d" />
          {/* Face */}
          <circle cx="50" cy="47" r="21" fill="#ffe0ce" />
          {/* Hair side bangs */}
          <path d="M 27,41 Q 50,28 73,41" stroke="#2d302d" strokeWidth="5" fill="none" />
          {/* Warm curved eyes */}
          <path d="M 38,46 Q 42,42 45,45" stroke="#222" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 55,46 Q 58,42 62,45" stroke="#222" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Gentle smile */}
          <path d="M 44,53 Q 50,57 56,53" stroke="#9b2c2c" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Cheek glow */}
          <ellipse cx="36" cy="50" rx="3.5" ry="2" fill="#e53e3e" opacity="0.4" />
          <ellipse cx="64" cy="50" rx="3.5" ry="2" fill="#e53e3e" opacity="0.4" />
          {/* Olive-Green / Sage Coat */}
          <path d="M 24,75 C 24,65 30,59 50,59 C 70,59 76,65 76,75 Z" fill="#4a5d4e" />
          {/* Yellow inner scarf */}
          <path d="M 44,59 L 50,64 L 56,59" fill="#ecc94b" />
          {/* Right hand making other half of heart */}
          <path d="M 72,75 Q 82,63 74,58" stroke="#4a5d4e" strokeWidth="7" fill="none" strokeLinecap="round" />
          <circle cx="74" cy="58" r="3.5" fill="#ffe0ce" />
        </svg>
      ),
    },
    {
      id: "daliang",
      name: "大亮",
      role: "热血领队",
      themeColor: "#223344",
      quote: "沧州铁狮子，威风凛凛！吃货团集合，热辣火锅鸡上桌！香辣过瘾，大家端午都开心！🍻🔥",
      avatarClass: "bg-blue-950",
      renderAvatar: () => (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Enthusiastic male, sporty black leather jacket, hand high */}
          <circle cx="50" cy="50" r="45" fill="#111f2d" stroke="#c28434" strokeWidth="2" />
          {/* Face */}
          <circle cx="50" cy="46" r="21" fill="#ffdcb9" />
          {/* Spiky dynamic hair */}
          <path d="M 28,34 Q 50,10 72,34 M 32,32 L 35,22 L 40,26 L 45,18 L 50,24 L 55,18 L 60,26 L 65,22 L 68,32" stroke="#1d2731" strokeWidth="4" fill="#1d2731" strokeLinejoin="round" />
          {/* Bright cheerful eyes */}
          <ellipse cx="41" cy="45" rx="2" ry="3" fill="#1d2731" />
          <ellipse cx="59" cy="45" rx="2" ry="3" fill="#1d2731" />
          {/* Dynamic brows */}
          <path d="M 37,39 Q 41,36 44,39" stroke="#1d2731" strokeWidth="2" fill="none" />
          {/* Smiling mouth showing teeth */}
          <path d="M 43,52 Q 50,58 57,52" fill="#fff" />
          <path d="M 43,52 Q 50,58 57,52 Z" stroke="#1d2731" strokeWidth="2" fill="none" />
          {/* Black leather jacket */}
          <path d="M 23,75 C 23,65 30,58 50,58 C 70,58 77,65 77,75 Z" fill="#1a202c" />
          {/* Metallic jacket zipper line */}
          <line x1="50" y1="58" x2="50" y2="75" stroke="#cbd5e0" strokeWidth="2.5" />
          {/* Raised high arm */}
          <path d="M 76,68 L 86,46 L 80,41" stroke="#1a202c" strokeWidth="7.5" fill="none" strokeLinecap="round" />
          <circle cx="80" cy="41" r="4.5" fill="#ffdcb9" />
        </svg>
      ),
    },
    {
      id: "juanjuan",
      name: "卷卷",
      role: "帅气白波米",
      themeColor: "#3182ce",
      quote: "汪汪！我是卷卷，大白扑克脸！我有一身软乎乎的奶油色大卷毛，穿着帅气的蓝色运动小背心和红色小铃铛！跑起来威风得很！🐶🐾",
      avatarClass: "bg-indigo-950",
      renderAvatar: () => (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* White curly dog with sky-blue vest, red bell */}
          <circle cx="50" cy="50" r="45" fill="#101525" stroke="#c28434" strokeWidth="2" />
          {/* Dog background chest */}
          <path d="M 28,75 Q 35,60 50,60 Q 65,60 72,75 Z" fill="#e2e8f0" />
          {/* Sky-blue Vest */}
          <path d="M 30,75 C 33,63 40,64 50,64 C 60,64 67,63 70,75 Z" fill="#3182ce" />
          <path d="M 50,64 V 75" stroke="#f6e05e" strokeWidth="2" /> {/* yellow stripes */}
          {/* Fluffy white curly ears */}
          <path d="M 26,35 C 20,40 20,62 30,62 C 34,62 34,45 32,38 Z" fill="#faf6f0" />
          <path d="M 74,35 C 80,40 80,62 70,62 C 66,62 66,45 68,38 Z" fill="#faf6f0" />
          {/* Fluffy head - represented by overlapping bubbles representing curls */}
          <circle cx="50" cy="42" r="21" fill="#faf6f0" />
          <circle cx="40" cy="30" r="7" fill="#faf6f0" />
          <circle cx="60" cy="30" r="7" fill="#faf6f0" />
          <circle cx="50" cy="28" r="7" fill="#faf6f0" />
          {/* Eyes (warm brown, sleepy look) */}
          <circle cx="43" cy="42" r="3.5" fill="#4a3728" />
          <circle cx="44" cy="41" r="1" fill="#fff" />
          <circle cx="57" cy="42" r="3.5" fill="#4a3728" />
          <circle cx="56" cy="41" r="1" fill="#fff" />
          {/* Dog snout / nose */}
          <ellipse cx="50" cy="49" rx="7.5" ry="5.5" fill="#f4eae1" />
          <polygon points="47,47 53,47 50,51" fill="#111111" />
          {/* Cute mouth line */}
          <path d="M 48,51 Q 50,53 52,51" stroke="#111" strokeWidth="1.5" fill="none" />
          {/* Red tag collar with a tiny bell */}
          <path d="M 38,62 Q 50,66 62,62" stroke="#e53e3e" strokeWidth="3" fill="none" />
          <circle cx="50" cy="65" r="3" fill="#f6e05e" stroke="#c53030" strokeWidth="0.5" />
        </svg>
      ),
    },
    {
      id: "meiqiu",
      name: "煤球",
      role: "闪电黑色拉风犬",
      themeColor: "#4299e1",
      quote: "汪！我是煤球，超级帅的黑毛小酷汪！两只耳朵翘得高高的，总是笑眯眯吐舌头！跑起来就像一阵风！冲呀！⚡👅",
      avatarClass: "bg-slate-900",
      renderAvatar: () => (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Scruffy black dog, alert ears, pink tongue */}
          <circle cx="50" cy="50" r="45" fill="#090d16" stroke="#c28434" strokeWidth="2" />
          {/* Dog body */}
          <path d="M 28,75 Q 35,60 50,60 Q 65,60 72,75 Z" fill="#2d3748" />
          {/* Alert pointy dog ears */}
          <path d="M 28,34 L 14,20 Q 22,25 32,34 Z" fill="#202631" />
          <path d="M 72,34 L 86,20 Q 78,25 68,34 Z" fill="#202631" />
          {/* Ear inner pink */}
          <path d="M 26,32 L 18,24 Q 22,27 28,32 Z" fill="#fed7d7" opacity="0.6" />
          <path d="M 74,32 L 82,24 Q 78,27 72,32 Z" fill="#fed7d7" opacity="0.6" />
          {/* Fluffy alert Black Head */}
          <circle cx="50" cy="45" r="19" fill="#202631" />
          {/* Cheek tufts */}
          <path d="M 31,48 L 24,45 L 31,43" stroke="#2a3241" strokeWidth="3" fill="#202631" />
          <path d="M 69,48 L 76,45 L 69,43" stroke="#2a3241" strokeWidth="3" fill="#202631" />
          {/* Large sparkling eyes */}
          <circle cx="42" cy="42" r="3.5" fill="#cbd5e0" />
          <circle cx="42" cy="42" r="2" fill="#111111" />
          <circle cx="43" cy="41" r="0.7" fill="#ffffff" />
          <circle cx="58" cy="42" r="3.5" fill="#cbd5e0" />
          <circle cx="58" cy="42" r="2" fill="#111111" />
          <circle cx="57" cy="41" r="0.7" fill="#ffffff" />
          {/* Snout with pink tongue */}
          <ellipse cx="50" cy="49" rx="6" ry="4.5" fill="#1a202c" />
          <polygon points="48,47 52,47 50,49.5" fill="#000000" />
          {/* Cute pink tongue sticking out */}
          <path d="M 47,51 Q 50,62 53,51 Z" fill="#ff7f7f" />
          <line x1="50" y1="51" x2="50" y2="56" stroke="#e53e3e" strokeWidth="1" />
          {/* Green active color collar */}
          <path d="M 36,60 Q 50,65 64,60" stroke="#319795" strokeWidth="3.5" fill="none" />
        </svg>
      ),
    },
  ];

  const selectedExplorer = explorers.find((e) => e.id === activeId);

  return (
    <div id="explorers-crew" className="relative bg-gradient-to-r from-[#031d10] via-[#052d19] to-[#031d10] border border-amber-900/30 rounded-3xl p-6 shadow-2xl overflow-hidden backdrop-blur-md">
      
      {/* Decorative Traditional Element (Gold cloud watermarks) */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10 bg-[radial-gradient(#c28434_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Decorative Bridge archway watermark to reflect the photo bridge setting */}
      <div className="absolute -bottom-1 left-0 right-0 h-4 bg-amber-900/10 border-t border-amber-900/20 backdrop-filter" />

      <div className="relative z-10 space-y-6">
        
        {/* Unit Title and Prompt info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#c28434]/20 pb-4">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-[#ffd08f] to-[#c28434] select-none flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
              运河美食探险团 · 人物集结令
            </h3>
            <p className="text-xs text-emerald-100/50 mt-1">
              五位特邀探险家与两位萌宠伙伴，已在京杭段古石桥上整装待发！点击头像听听他们的美食心声 📣
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#02140c] px-3 py-1.5 rounded-full border border-emerald-900 text-xs text-amber-500">
            <span>📷 实景卡通化技术</span>
          </div>
        </div>

        {/* Floating Parade Bridge - Row of Avatar Nodes */}
        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-around gap-6 py-4 px-2 overflow-x-auto scrollbar-none">
          {explorers.map((exp) => {
            const isActive = exp.id === activeId;
            return (
              <div
                id={`explorer-node-${exp.id}`}
                key={exp.id}
                onClick={() => setActiveId(isActive ? null : exp.id)}
                className={`relative flex flex-col items-center group cursor-pointer select-none transition-all duration-300 rounded-2xl p-2 max-w-[110px] shrink-0 ${
                  isActive 
                    ? "bg-[#c28434]/15 scale-105 border border-[#c28434]/40" 
                    : "hover:bg-[#103e2c]/30 border border-transparent"
                }`}
              >
                {/* Avatar SVG Bubble Container */}
                <div className="relative w-18 h-18 rounded-full shadow-lg overflow-hidden border-2 border-transparent group-hover:border-amber-500/50 group-hover:scale-105 transition-all duration-300">
                  {exp.renderAvatar()}
                  
                  {/* Glowing Ring when active */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full border-2 border-[#d4af37] animate-pulse" />
                  )}
                </div>

                {/* Name & Badge below */}
                <span className="mt-2.5 text-xs text-white font-serif font-bold group-hover:text-amber-300 transition-colors">
                  {exp.name}
                </span>

                <span className="text-[10px] text-emerald-100/40 font-mono mt-0.5 scale-90 leading-none">
                  {exp.role}
                </span>

                {/* Micro heart counts */}
                <button
                  id={`btn-explorer-like-${exp.id}`}
                  onClick={(e) => handleLike(exp.id, e)}
                  className="mt-2 flex items-center gap-1 text-[10px] text-amber-500/60 hover:text-rose-400 font-mono scale-90 transition-colors bg-[#010c07] px-2 py-0.5 rounded-full border border-emerald-950/80"
                >
                  <Heart className="w-2.5 h-2.5 fill-current text-rose-500/70" />
                  <span>{likes[exp.id]}</span>
                </button>

                {/* Small indicator when active */}
                {isActive && (
                  <motion.div 
                    layoutId="activePointer" 
                    className="absolute -bottom-1 w-2 h-2 rounded-full bg-amber-500" 
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Speech dialogue container */}
        <AnimatePresence mode="wait">
          {selectedExplorer ? (
            <motion.div
              id="explorer-speech-bubble"
              key={selectedExplorer.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="relative p-5 rounded-2xl border bg-[#052013] border-amber-900/40 flex flex-col md:flex-row gap-4 items-center shadow-xl"
            >
              {/* Cute quote bubble handle */}
              <div className="absolute top-[-8px] left-[15%] md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#052013] border-t border-l border-amber-900/40 rotate-45" />

              <div className="w-14 h-14 rounded-full border-2 border-[#c28434]/40 shrink-0 overflow-hidden">
                {selectedExplorer.renderAvatar()}
              </div>

              <div className="flex-1 text-center md:text-left space-y-1">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="font-serif text-amber-300 font-bold text-sm">
                    {selectedExplorer.name}
                  </span>
                  <span className="text-[10px] bg-[#c28434]/20 border border-[#c28434]/30 px-2 py-0.5 rounded-full font-mono text-amber-500">
                    {selectedExplorer.role}
                  </span>
                </div>
                <p className="text-xs text-emerald-100/90 leading-relaxed font-serif">
                  “ {selectedExplorer.quote} ”
                </p>
              </div>

              {/* Heart/blessing button inside bubble */}
              <button
                id="btn-bubble-support"
                onClick={(e) => handleLike(selectedExplorer.id, e)}
                className="px-3.5 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-300 font-serif font-bold text-[11px] active:scale-95 transition-all flex items-center gap-1 shrink-0"
              >
                <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
                <span>为TA点赞祝福 !</span>
              </button>
            </motion.div>
          ) : (
            <div className="text-center py-4 text-[11px] text-emerald-100/30 font-serif italic border border-dashed border-emerald-950 rounded-2xl bg-[#020e09]/50">
              💡 戳上方的探险队员头像，查看他们的端午秘密留言与大合照密语...
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
