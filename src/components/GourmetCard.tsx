/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, MouseEvent, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CangzhouFood } from "../types";
import { CANGZHOU_GOURMETS } from "../data";
import { ChevronRight, MapPin, Heart, BookOpen, Sparkles, Check } from "lucide-react";
import zongziImg from "../assets/images/traditional_zongzi_1781491787791.jpg";

export default function GourmetCard() {
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>("jujube-zong");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const detailCardRef = useRef<HTMLDivElement>(null);

  const toggleFavorite = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectFood = (id: string) => {
    setSelectedFoodId(id);
    // Smooth scroll down to details if on mobile (screen width < 1024px)
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        detailCardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  };

  const selectedFood = CANGZHOU_GOURMETS.find(f => f.id === selectedFoodId) || CANGZHOU_GOURMETS[0];

  // Helper to map food items to icons or custom visual displays
  const getFoodStats = (id: string) => {
    switch (id) {
      case "jujube-zong":
        return { rating: "4.9", popularity: "🔥 爆棚", diff: "中等", time: "2-3小时", image: zongziImg };
      case "hotpot-chicken":
        return { rating: "5.0", popularity: "🔥 顶流", diff: "极难", time: "1.5小时", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80" };
      case "donkey-burger":
        return { rating: "4.8", popularity: "🔥 经典", diff: "超高", time: "45分钟", image: "https://images.unsplash.com/photo-1626082896492-766af4fc6595?w=600&auto=format&fit=crop&q=80" };
      case "lamp-intestine":
        return { rating: "4.7", popularity: "🔥 硬核", diff: "极具挑战", time: "4.5小时", image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80" };
      default:
        return { rating: "4.8", popularity: "🔥 推荐", diff: "中等", time: "1小时", image: "" };
    }
  };

  return (
    <div id="cangzhou-gourmet-section" className="space-y-8">
      
      {/* Headings */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-amber-900/30 pb-4">
        <div>
          <h2 className="text-2xl font-serif text-[#ffd08f] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#c28434]" /> 沧州端午美食志
          </h2>
          <p className="text-sm text-emerald-100/60 mt-1">
            探寻南运河畔流传千年的味蕾烙印，感受硬汉古城的柔情美味
          </p>
        </div>
        <div className="mt-3 md:mt-0 text-xs text-amber-500/80 font-mono tracking-wider bg-[#c28434]/5 py-1 px-2.5 rounded border border-amber-900/30">
          * 提示：点击左侧美食卡片，在右侧解锁非遗民俗历史
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Grid: Vertical List of Cuisines */}
        <div className="lg:col-span-4 space-y-4">
          {CANGZHOU_GOURMETS.map((food) => {
            const isSelected = food.id === selectedFoodId;
            const stats = getFoodStats(food.id);
            return (
              <div
                id={`gourmet-item-${food.id}`}
                key={food.id}
                onClick={() => handleSelectFood(food.id)}
                className={`relative group cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 ${
                  isSelected
                    ? "bg-gradient-to-r from-[#103e2c] to-[#041d13] border-[#c28434] shadow-xl text-white scale-[1.01]"
                    : "bg-[#06291a]/40 border-amber-950/20 text-[#a3c9b8]/80 hover:bg-[#06291a]/80 hover:border-amber-900/40"
                }`}
              >
                {/* Visual Indicator */}
                <span className={`absolute top-0 bottom-0 left-0 w-1.5 rounded-l-2xl ${isSelected ? "bg-[#c28434]" : "bg-transparent group-hover:bg-[#c28434]/40"}`} />

                <div className="flex gap-4 items-center">
                  
                  {/* Miniature Image / Icon Container */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-amber-900/30 flex-shrink-0 bg-emerald-950">
                    <img
                      src={stats.image}
                      alt={food.nativeName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Main texts */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-serif text-lg font-bold truncate ${isSelected ? "text-[#ffd08f]" : "text-emerald-100"}`}>
                        {food.nativeName}
                      </h3>
                      <button
                        onClick={(e) => toggleFavorite(food.id, e)}
                        className="text-amber-500 hover:text-red-400 p-1 rounded-full hover:bg-white/5 active:scale-90 transition-all"
                      >
                        <Heart className={`w-4 h-4 ${favorites[food.id] ? "fill-red-400 text-red-400" : "text-amber-500/50"}`} />
                      </button>
                    </div>
                    
                    <p className="text-[12px] text-emerald-100/50 mt-1 line-clamp-1 italic font-serif">
                      “{food.tagline}”
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-900/40 px-1.5 py-0.5 rounded leading-none">
                        人气: {stats.rating}
                      </span>
                      <span className="text-[10px] text-emerald-100/40 flex items-center gap-0.5">
                        <MapPin className="w-3 h-3 text-red-400" /> 沧州正宗
                      </span>
                    </div>
                  </div>

                  <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isSelected ? "text-[#c28434] translate-x-1" : "text-emerald-100/20 group-hover:text-[#c28434]"}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Grid: Exquisite Detail Panel */}
        <div id="gourmet-detail-card" ref={detailCardRef} className="lg:col-span-8 bg-gradient-to-br from-[#062e1e] to-[#01140c] border border-amber-900/40 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative min-h-[480px]">
          
          {/* Subtle traditional water flower decor background watermark */}
          <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-[#01140c]/50 to-[#01140c] opacity-80" />
          
          <div className="relative z-10 space-y-6">
            
            {/* Header section with image and metadata banner */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              
              {/* Splendid full sized food card photo */}
              <div className="w-full md:w-44 h-44 rounded-2xl overflow-hidden border-2 border-amber-500/20 bg-emerald-950 flex-shrink-0 relative group">
                <img
                  src={getFoodStats(selectedFood.id).image}
                  alt={selectedFood.nativeName}
                  className="w-full h-full object-cover scale-100 hover:scale-[1.03] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2.5 right-2 text-[10px] bg-[#c28434]/90 text-white font-mono rounded px-1.5 py-0.5 leading-none">
                  非遗非虚构
                </span>
              </div>

              {/* Title, Subtitle, and metrics */}
              <div className="space-y-3.5 flex-1 w-full">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffd08f] to-[#c28434] tracking-wider select-none">
                    {selectedFood.nativeName}
                  </h1>
                  <span className="text-xs text-amber-500 font-serif border border-amber-500/30 bg-amber-500/5 px-2 py-0.5 rounded-full select-none">
                    {selectedFood.name}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-900/50">
                  <span className="text-xs text-emerald-200/90 font-serif leading-relaxed line-clamp-2 italic">
                    “ {selectedFood.tagline} ”
                  </span>
                </div>

                {/* Triple stats display */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-[#0b2d20] p-1.5 rounded-lg border border-emerald-900/30">
                    <p className="text-emerald-100/50 text-[10px]">工艺难度</p>
                    <p className="font-medium text-[#ffd08f] mt-0.5">{getFoodStats(selectedFood.id).diff}</p>
                  </div>
                  <div className="bg-[#0b2d20] p-1.5 rounded-lg border border-emerald-900/30">
                    <p className="text-emerald-100/50 text-[10px]">熬煮工时</p>
                    <p className="font-medium text-[#c28434] mt-0.5">{getFoodStats(selectedFood.id).time}</p>
                  </div>
                  <div className="bg-[#0b2d20] p-1.5 rounded-lg border border-emerald-900/30">
                    <p className="text-emerald-100/50 text-[10px]">吃货人气</p>
                    <p className="font-medium text-emerald-400 mt-0.5">{getFoodStats(selectedFood.id).popularity}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* In-depth folklore & description */}
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Left Column: Delicacy details */}
              <div className="space-y-3 bg-[#021810]/50 p-4 rounded-xl border border-emerald-900/20">
                <h4 className="text-[#e2b77c] text-xs font-serif font-bold uppercase tracking-wider flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> 味觉全貌 / Profile
                </h4>
                <p className="text-xs text-emerald-100/80 leading-relaxed text-justify">
                  {selectedFood.description}
                </p>

                <div className="space-y-2 pt-2">
                  <p className="text-[10px] text-amber-500/80 font-bold tracking-wider uppercase">原料解构 Ingredients</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedFood.ingredients.map(ing => (
                      <span key={ing} className="text-[10px] px-2 py-0.5 rounded bg-[#103e2c] border border-[#c28434]/20 text-emerald-200 flex items-center gap-1">
                        <Check className="w-2.5 h-2.5 text-[#ffd08f]" /> {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Historical / Festival connection */}
              <div className="space-y-4">
                
                <div className="space-y-2 bg-[#021810]/50 p-4 rounded-xl border border-emerald-900/20">
                  <h4 className="text-[#e2b77c] text-xs font-serif font-bold uppercase tracking-wider">
                     运河人文与历史故事
                  </h4>
                  <p className="text-xs text-emerald-100/70 leading-relaxed text-justify">
                    {selectedFood.history}
                  </p>
                </div>

                <div className="space-y-1.5 bg-amber-500/5 p-3 rounded-xl border border-amber-900/20 relative overflow-hidden">
                  <span className="absolute -right-2 -bottom-2 text-4xl text-amber-950/20 font-black">端午</span>
                  <p className="text-[#c28434] text-[11px] font-bold font-serif">端午食礼文化</p>
                  <p className="text-[11px] text-emerald-100/80 leading-relaxed">
                    {selectedFood.festivalConnection}
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Restaurant / Diner coordinates navigation */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-4 border-t border-amber-900/30">
            <div>
              <p className="text-[#ffdfb2] text-xs font-serif font-bold flex items-center gap-1 mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#c28434]" /> 沧州特色打卡老铺
              </p>
              <div className="space-y-1">
                {selectedFood.recommendedSpots.map((spot, idx) => (
                  <div key={spot} className="text-[11px] text-emerald-100/80 flex items-center gap-1 bg-[#0b2d20]/50 p-1 rounded">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#c28434]/20 text-[#c28434] text-[9px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span className="truncate">{spot}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-end">
              <div className="text-center p-3 rounded-xl border border-amber-[#c28434]/20 bg-[#c28434]/5 w-full max-w-sm">
                <p className="text-xs font-serif text-[#ffd08f]">端午出行温习贴士</p>
                <p className="text-[10px] text-emerald-100/50 mt-1 leading-normal text-justify">
                  大运河文化带已全面铺设美食水路！建议先游览【百狮园码头】乘船看铁狮，上岸即享滚烫的火锅鸡与酥脆的河间火烧，最是惬意不过。
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
