/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CANAL_STATIONS } from "../data";
import { Ship, Landmark, Compass, Waves, Map, Anchor } from "lucide-react";
import canalImg from "../assets/images/cangzhou_canal_1781491761710.jpg";

export default function CanalScroll() {
  const [activeStationId, setActiveStationId] = useState<string>("baishi");

  const activeStation = CANAL_STATIONS.find((s) => s.id === activeStationId) || CANAL_STATIONS[0];

  return (
    <div id="canal-scenic-viewport" className="space-y-8">
      
      {/* Exquisite Top Canal Showcase Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-900/40 bg-gradient-to-r from-emerald-950 to-stone-900 h-64 md:h-80 shadow-2xl group">
        {/* Layer 1: Ink Wash Painting Backdrop */}
        <img
          src={canalImg}
          alt="沧州大运河盛景"
          className="absolute inset-0 w-full h-full object-cover opacity-75 md:opacity-90 group-hover:scale-[1.01] transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />

        {/* Layer 2: Traditional Bronze/Green tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#021810] via-black/40 to-black/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#062e1e]/80 via-transparent to-[#021810]/80" />

        {/* Content on Mural */}
        <div className="absolute inset-x-6 bottom-6 md:inset-x-8 md:bottom-8 z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-[10px] md:text-xs text-[#ffd08f] font-serif bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/20">
              <Anchor className="w-3.5 h-3.5 animate-bounce text-[#c28434]" />
              <span>世界非物质文化遗产 · 京杭大运河沧州段</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffd08f] via-white to-amber-500 select-none drop-shadow-md">
              一帆凌波越燕赵，百折沧桑汇古今
            </h3>
            <p className="text-xs text-white/80 leading-relaxed font-sans line-clamp-2 md:line-clamp-none">
              沧州是京杭大运河蜿蜒流经最长的城市，也是唯一有镇海铁狮守护的运河明珠。
              端午期间，重温运河涛声，江上龙舟破浪，岸边稻黍正黄。
            </p>
          </div>
          
          <div className="hidden sm:flex flex-col items-center bg-black/60 border border-amber-950/50 backdrop-blur-md px-4 py-3 rounded-2xl shrink-0 text-center text-[11px] max-w-xs">
            <span className="text-amber-500 font-serif font-medium flex items-center gap-1"><Compass className="w-3.5 h-3.5" /> 运河百里图志</span>
            <span className="text-white/70 mt-1">沧州运河段全程约216公里，蜿蜒曲折，留存漕运码头、沉船闸等水文化遗存数十处。</span>
          </div>
        </div>

        {/* Glowing floating text representing ancient poetry */}
        <div className="absolute top-6 right-6 font-serif text-[10px] text-amber-500/50 flex flex-col gap-1 tracking-widest writing-mode-vertical">
          <span>運河如織</span>
          <span>歲月如歌</span>
        </div>
      </div>

      {/* Dynamic Navigation Line & Stream map representing Water currents */}
      <div className="bg-[#042014]/90 rounded-2xl p-5 border border-amber-900/20 shadow-lg relative overflow-hidden">
        
        {/* Decorative river bank background grid */}
        <div className="absolute inset-x-0 top-1/2 h-[3px] bg-gradient-to-r from-amber-900/10 via-amber-700/60 to-amber-900/10 transform -translate-y-1/2" />
        <div className="absolute inset-x-0 top-[calc(1/2*100%+4px)] h-1 bg-[#c28434]/20 animate-pulse transform -translate-y-1/2" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-stretch justify-between gap-4">
          
          {/* Legend and description label */}
          <div className="flex items-center gap-2 text-xs font-serif text-[#ffd08f] shrink-0">
            <span className="p-1.5 rounded bg-amber-500/10 border border-amber-900/40 text-[#c28434]">
              <Waves className="w-4 h-4 animate-pulse" />
            </span>
            <span>南运河流向图 <span className="text-emerald-100/40 italic font-mono text-[9px]">/ MAP OF STATIONS</span></span>
          </div>

          {/* Interactive Stations Row along the line */}
          <div className="flex-1 flex overflow-x-auto md:overflow-visible pb-2 md:pb-0 items-center justify-start md:justify-around gap-6 md:gap-2 px-2 md:px-8 scrollbar-none">
            {CANAL_STATIONS.map((st) => {
              const isActive = (st.id === activeStationId);
              return (
                <button
                  id={`canal-step-${st.id}`}
                  key={st.id}
                  onClick={() => setActiveStationId(st.id)}
                  className={`relative flex flex-col items-center group focus:outline-none transition-all py-1 px-3 rounded-lg shrink-0 ${
                    isActive ? "scale-105" : "hover:scale-102"
                  }`}
                >
                  {/* Floating marker dot */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-15 ${
                    isActive 
                      ? "bg-gradient-to-r from-[#ffd08f] to-[#c28434] border-2 border-amber-950 scale-110 shadow-lg ring-4 ring-[#c28434]/20" 
                      : "bg-[#0b2d20] border border-amber-900/40 text-emerald-100/60 group-hover:bg-[#103e2c] group-hover:text-emerald-200"
                  }`}>
                    <Ship className={`w-4 h-4 ${isActive ? "text-amber-950" : "text-[#c28434]/60 animate-smooth-float"}`} />
                  </div>

                  <span className={`text-xs mt-2 font-serif transition-colors ${
                    isActive ? "text-[#ffd08f] font-bold" : "text-emerald-100/50 group-hover:text-emerald-200"
                  }`}>
                    {st.name}
                  </span>

                  {/* Micro subtext */}
                  <span className="text-[9px] text-emerald-100/30 group-hover:text-emerald-100/50 font-mono transition-colors">
                    {st.mileage.slice(0, 4)}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

      </div>

      {/* Station information card details */}
      <div id="station-details-deck" className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#01140c]/40 rounded-3xl p-6 border border-amber-950/40">
        
        {/* Left info */}
        <div className="md:col-span-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs rounded bg-[#c28434]/20 text-[#ffd08f] font-serif border border-amber-900/50">
              运河明珠
            </span>
            <h4 className="text-2xl font-serif text-white font-black">
              {activeStation.name}
            </h4>
            <span className="text-[11px] font-mono text-emerald-100/40">
              {activeStation.mileage}
            </span>
          </div>

          <p className="text-xs text-emerald-100/70 leading-relaxed text-justify">
            {activeStation.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            {/* Artifact card */}
            <div className="bg-[#0b2d20]/60 p-3.5 rounded-xl border border-emerald-900/40 space-y-1">
              <span className="text-[#ffd08f] text-[10px] uppercase font-mono tracking-wider flex items-center gap-1">
                <Landmark className="w-3.5 h-3.5 text-[#c28434]" /> 历史非遗遗存
              </span>
              <p className="text-xs text-stone-100 leading-snug">
                {activeStation.historicRelic}
              </p>
              <p className="text-[10px] text-emerald-100/40 pt-1 leading-normal">
                沧州段运河千年来百折不挠，沿岸堆积了丰富的漕运与兵戎文物，是实打实的安全水博园。
              </p>
            </div>

            {/* Food combo card */}
            <div className="bg-[#1c3a2a]/60 p-3.5 rounded-xl border border-[#c28434]/20 space-y-1.5">
              <span className="text-[#ffd08f] text-[10px] uppercase font-mono tracking-wider flex items-center gap-1">
                🍜 对应地标代表美味
              </span>
              <div className="flex items-center justify-between">
                <span className="text-sm font-serif font-black text-[#c28434]">
                  {activeStation.specialtyGourmet}
                </span>
                <span className="text-[9px] bg-red-950/50 border border-red-900/55 px-1.5 py-0.5 rounded text-red-400">
                  游河必吃
                </span>
              </div>
              <p className="text-[10px] text-emerald-100/60 leading-normal">
                大沙质土壤配合水利，造就了高甜度的枣。而重体力码头劳作，催生了高能扎实的火烧与羊肠。
              </p>
            </div>

          </div>
        </div>

        {/* Right contextual graphic sidebar */}
        <div className="md:col-span-4 bg-[#0a2318] rounded-2xl p-5 border border-amber-900/10 flex flex-col justify-between text-center select-none relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-[#0b2d20] to-transparent opacity-60" />
          
          <div className="space-y-3 relative z-10">
            <span className="text-xs text-[#c28434] uppercase font-serif font-bold tracking-widest">水色两岸名胜</span>
            <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto border border-amber-900/40">
              <Ship className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <p className="text-xs text-emerald-100 font-bold font-serif">{activeStation.name} · 民俗</p>
            <p className="text-[11px] text-emerald-100/50 leading-relaxed text-left">
              端午期间，南运河沿岸将举行非遗花会、运河小市、和古曲吟唱，伴随着龙舟划过的哗哗江流声，还原大宋大明漕运商肆的如织繁盛。
            </p>
          </div>

          <div className="pt-4 border-t border-amber-900/30 text-[10px] text-emerald-100/30 font-serif flex items-center justify-around">
            <span>船笛悠悠 🌊</span>
            <span>·</span>
            <span>浪遏飞舟 🚣</span>
          </div>
        </div>

      </div>

    </div>
  );
}
