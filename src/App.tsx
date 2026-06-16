/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, RefObject } from "react";
import { motion } from "motion/react";
import { Ship, Leaf, Compass, MapPin, Heart, HelpCircle, ChevronDown, Award, FileDown } from "lucide-react";
import CountdownTimer from "./components/CountdownTimer";
import GourmetCard from "./components/GourmetCard";
import CanalScroll from "./components/CanalScroll";
import ZongziMaker from "./components/ZongziMaker";
import ExplorersCrew from "./components/ExplorersCrew";
import Guestbook from "./components/Guestbook";
import { exportToSingleHTML } from "./utils/exporter";
import cangzhouBanner from "./assets/images/cangzhou_banner_1781591943875.jpg";
import canalImg from "./assets/images/cangzhou_canal_1781491761710.jpg";
import traditionalZongzi from "./assets/images/traditional_zongzi_1781491787791.jpg";

export default function App() {
  const [activeTab, setActiveTab] = useState<"countdown" | "canal" | "gourmet" | "diy">("countdown");
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  
  // Create refs to easily scroll to elements
  const countdownRef = useRef<HTMLDivElement>(null);
  const canalRef = useRef<HTMLDivElement>(null);
  const gourmetRef = useRef<HTMLDivElement>(null);
  const diyRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: RefObject<HTMLDivElement | null>, tabName: "countdown" | "canal" | "gourmet" | "diy") => {
    setActiveTab(tabName);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleExport = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      // Helper function to read local images as Base64 so they work 100% offline
      const toBase64 = async (url: string): Promise<string> => {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error("Image server error");
          const blob = await res.blob();
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = () => resolve(url);
            reader.readAsDataURL(blob);
          });
        } catch (e) {
          console.warn("Base64 resolution fallback:", url, e);
          return url;
        }
      };

      const [base64Banner, base64Canal, base64Zongzi] = await Promise.all([
        toBase64(cangzhouBanner),
        toBase64(canalImg),
        toBase64(traditionalZongzi)
      ]);

      exportToSingleHTML(base64Banner, base64Canal, base64Zongzi);
    } catch (err) {
      exportToSingleHTML(cangzhouBanner, canalImg, traditionalZongzi);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div id="app-root-wrapper" className="min-h-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#032516] via-[#01140e] to-[#000503] text-emerald-100 flex flex-col selection:bg-amber-500 selection:text-black">
      
      {/* Floating Decorative Top Navigation Row */}
      <header className="sticky top-0 z-50 bg-[#01110a]/80 backdrop-blur-md border-b border-amber-900/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-18 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => scrollToSection(countdownRef, "countdown")}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#c28434] to-[#8c5213] p-0.5 flex items-center justify-center shadow-lg border border-amber-500/30">
              <span className="text-white text-lg font-calligraphy font-bold">沧</span>
            </div>
            <div>
              <h1 className="text-lg font-serif font-black tracking-widest text-[#ffd08f] leading-none">端午沧州美食行</h1>
              <p className="text-[9px] text-emerald-100/40 uppercase font-mono tracking-wider mt-0.5 mt-1">Cangzhou Canal Food Trip</p>
            </div>
          </div>

          {/* Quick Section Anchor Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-[#010906] p-1 rounded-full border border-amber-900/15">
            {[
              { id: "countdown", name: "端午倒计时", ref: countdownRef },
              { id: "canal", name: "百里运河图", ref: canalRef },
              { id: "gourmet", name: "沧州美食志", ref: gourmetRef },
              { id: "diy", name: "手作金枣粽", ref: diyRef }
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  id={`nav-tab-${tab.id}`}
                  key={tab.id}
                  onClick={() => scrollToSection(tab.ref, tab.id as any)}
                  className={`px-4 py-1.5 rounded-full text-xs font-serif font-semibold tracking-wider transition-all duration-300 ${
                    isSelected
                      ? "bg-gradient-to-r from-[#c28434] to-[#8c5213] text-white shadow shadow-amber-500/20"
                      : "text-emerald-100/60 hover:text-[#ffd08f] hover:bg-[#103e2c]/30"
                  }`}
                >
                  {tab.name}
                </button>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="flex items-center gap-3">
            <button
              id="btn-nav-export"
              onClick={handleExport}
              disabled={isExporting}
              className={`px-3 py-1.5 rounded-lg border border-amber-500/30 bg-[#c28434]/15 text-amber-300 transition-all flex items-center gap-1.5 text-xs font-serif font-bold ${
                isExporting ? "opacity-50 cursor-not-allowed" : "hover:bg-[#c28434]/30 hover:text-white cursor-pointer"
              }`}
              title="导出此应用的单文件离线珍藏版"
            >
              <FileDown className={`w-4 h-4 text-amber-400 ${isExporting ? "animate-bounce" : ""}`} />
              <span>{isExporting ? "正在打包图片..." : "导出本地 HTML"}</span>
            </button>

            <button
              id="btn-nav-help"
              onClick={() => setShowHelpModal(true)}
              className="p-1.5 rounded-lg border border-amber-900/30 bg-[#c28434]/5 text-[#ffd08f] hover:bg-[#c28434]/20 transition-all cursor-pointer"
              title="了解沧州文旅背景"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            
            <button
               onClick={() => scrollToSection(diyRef, "diy")}
               className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#103e2c] to-[#041d13] border border-[#c28434]/60 text-[#ffd08f] text-xs font-serif font-bold hover:border-amber-400 active:scale-95 transition-all shadow-md shadow-emerald-950/40"
            >
               包粽子 🥬
            </button>
          </div>

        </div>
      </header>

      {/* Hero Header Area with majestic traditional graphic and atmospheric lines */}
      <section className="relative overflow-hidden rounded-3xl mt-6 border border-amber-900/40 bg-gradient-to-r from-[#021810] to-[#010e09] min-h-[300px] flex items-center justify-center max-w-7xl mx-auto w-full text-center shadow-2xl group">
        
        {/* Banner Image Backdrop with zoom hover effect */}
        <img
          src={cangzhouBanner}
          alt="端午沧州美食行盛景"
          className="absolute inset-0 w-full h-full object-cover opacity-80 md:opacity-90 group-hover:scale-[1.01] transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        
        {/* Dual gradients overlays: dark layer & ambient green tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#010e09] via-black/40 to-black/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#062e1e]/60 via-transparent to-[#021810]/60" />

        <div className="space-y-4 max-w-3xl mx-auto relative z-10 p-6 md:p-8">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-black/60 backdrop-blur-md text-[#ffd08f] text-xs font-bold leading-none tracking-widest font-serif">
            <Ship className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>京杭运河襟淮海 · 铁狮雄镇绕清风</span>
          </div>

          <p className="text-4xl md:text-5xl font-calligraphy font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#ffd08f] via-[#c28434] to-[#8c5213] tracking-widest drop-shadow py-1.5 select-none">
            端午佳节 沧州美食行
          </p>

          <p className="text-xs md:text-sm text-emerald-100/90 font-serif leading-relaxed tracking-wider max-w-2xl mx-auto italic drop-shadow-md">
            “大运河南来，北出燕关，千叠白浪淘不尽这十里枣香。
            沧州骨汤浑厚，火烧焦脆，更有金丝小枣粽软糯黏连。端午启程在即，共赴美食胜宴！”
          </p>

          <div className="flex justify-center pt-3">
             <button 
               onClick={() => scrollToSection(countdownRef, "countdown")}
               className="p-1.5 rounded-full border border-amber-500/30 text-amber-500 hover:text-white hover:bg-amber-500/20 active:scale-95 transition-all animate-bounce bg-black/40 backdrop-blur-md"
             >
                <ChevronDown className="w-4.5 h-4.5" />
             </button>
          </div>

        </div>

      </section>

      {/* Main Container Core Modules */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 pb-16 space-y-16">
        
        {/* MODULE 1: Primary Real-time Countdown Gate */}
        <div ref={countdownRef} id="module-countdown" className="scroll-mt-24 space-y-8">
          <CountdownTimer onBonusTime={() => scrollToSection(diyRef, "diy")} />
          <ExplorersCrew />
        </div>

        {/* Decorative Wave Divider */}
        <div className="flex items-center gap-4 py-2 select-none justify-center">
          <span className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#c28434]/30" />
          <span className="text-[10px] uppercase font-mono tracking-[4px] text-amber-500/40 font-bold">
            🌊 水波滔滔 漕运千里 🚢
          </span>
          <span className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#c28434]/30" />
        </div>

        {/* MODULE 2: The Interactive Canal Journey Map */}
        <div ref={canalRef} id="module-canal" className="scroll-mt-24 space-y-4">
          <div className="text-center md:text-left space-y-1 pl-1">
            <span className="text-amber-500 text-xs font-serif font-bold uppercase tracking-widest flex items-center justify-center md:justify-start gap-1">
              <Compass className="w-4 h-4 text-[#c28434]" /> 京杭大运河 · 沧州秀色
            </span>
            <h2 className="text-2xl font-serif text-white font-heavy">南运河寻味长河</h2>
            <p className="text-xs text-emerald-100/40">点击水文哨站，游览历代沧州运河支点，解密地标美食的人文基因</p>
          </div>
          <CanalScroll />
        </div>

        {/* Decorative Wave Divider */}
        <div className="flex items-center gap-4 py-2 select-none justify-center">
          <span className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#c28434]/30" />
          <span className="text-[10px] uppercase font-mono tracking-[4px] text-amber-500/40 font-bold">
            🥬 千年小枣 箬叶飘香 🥙
          </span>
          <span className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#c28434]/30" />
        </div>

        {/* MODULE 3: Gourmet Deluxe Interactive Catalog */}
        <div ref={gourmetRef} id="module-gourmet" className="scroll-mt-24">
          <GourmetCard />
        </div>

        {/* Decorative Wave Divider */}
        <div className="flex items-center gap-4 py-2 select-none justify-center">
          <span className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#c28434]/30" />
          <span className="text-[10px] uppercase font-mono tracking-[4px] text-amber-500/40 font-bold">
             灶下柴温 箸间年味 ♨
          </span>
          <span className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#c28434]/30" />
        </div>

        {/* MODULE 4: Tactile Cooking Workshop (Wrap Zongzi) */}
        <div ref={diyRef} id="module-diy" className="scroll-mt-24 space-y-4">
          <div className="text-center md:text-left space-y-1 pl-1">
            <span className="text-amber-500 text-xs font-serif font-bold uppercase tracking-widest flex items-center justify-center md:justify-start gap-1">
               端午民俗体验中心
            </span>
            <h2 className="text-2xl font-serif text-white font-heavy">水路甜香 · 非遗手工包枣粽</h2>
            <p className="text-xs text-emerald-100/40">体验大运河老渔家包粽秘籍，包一颗寄托福运的金丝枣粽，撰写并保存您的端午安康贺卡</p>
          </div>
          <ZongziMaker />
        </div>

        {/* Decorative Wave Divider */}
        <div className="flex items-center gap-4 py-2 select-none justify-center">
          <span className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#c28434]/30" />
          <span className="text-[10px] uppercase font-mono tracking-[4px] text-amber-500/40 font-bold">
             古街墨宝 游人笔录 🖋️
          </span>
          <span className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#c28434]/30" />
        </div>

        {/* MODULE 5: The Tour Guestbook and Photo Wall */}
        <div id="module-guestbook" className="scroll-mt-24">
          <Guestbook />
        </div>

      </main>

      {/* Exquisite footer with copyright and blessing */}
      <footer className="mt-auto border-t border-amber-900/30 bg-[#000805] py-8 px-4 text-center text-xs text-emerald-100/50 space-y-4">
        
        {/* Sizable visual element */}
        <div className="flex justify-center items-center gap-2 text-amber-500/60 font-serif">
          <span>箬叶裹福 🥬</span>
          <span>·</span>
          <span>河清海静 🌊</span>
          <span>·</span>
          <span>美食常驻 🍜</span>
        </div>

        <p className="max-w-2xl mx-auto leading-relaxed">
          &copy; 2026 端午沧州美食行文旅特献。古运河浪里藏珍，沧州味天下闻名。 
          本倒计时时间锁定于 <strong>2026年6月18日 17:00</strong>，端午长假美食狂欢倒计时鸣锣！
        </p>

        <p className="text-[10px] text-emerald-100/20 font-mono tracking-wider">
          DESIGNED FOR AI STUDIO BUILD · HEBEI CANGZHOU CANAL CULTURE MUSEUM
        </p>
        
      </footer>

      {/* 文旅信息弹窗 Info Modal */}
      {showHelpModal && (
        <div id="help-dialog" className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#042014]/95 border-2 border-[#c28434] rounded-3xl p-6 max-w-lg text-left shadow-2xl relative space-y-4">
            
            <div className="flex justify-between items-center border-b border-amber-900/30 pb-3">
              <h3 className="text-lg font-serif text-[#ffd08f] font-bold">沧州大运河与红枣文化背景</h3>
              <button 
                onClick={() => setShowHelpModal(false)}
                className="text-stone-400 hover:text-white hover:bg-white/10 w-6 h-6 rounded-full flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-emerald-100/95 leading-relaxed overflow-y-auto max-h-[360px] pr-1">
              <p className="font-serif text-[#ffd08f] font-semibold flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" /> 1. 大运河的馈赠
              </p>
              <p className="text-justify">
                流入沧州的隋唐大运河（南运河段）造就了沧州“水旱码头”的地理奇迹。
                漕运的发展融合了川陕、齐鲁和幽燕文化，塑造了沧州美食“融合并蓄、豪迈扎实、易于携带”的属性。
              </p>

              <p className="font-serif text-[#ffd08f] font-semibold flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" /> 2. 沧州金丝小枣的奥秘
              </p>
              <p className="text-justify">
                沧州是我国最具历史感的小枣主产区。沙质河床提供了极高的昼夜温差与微量元素，
                催生小枣微拉金丝、含糖度在水果中独具鳌头。每逢端午，小枣入糯，是京津冀民俗中不可替代的标志。
              </p>

              <p className="font-serif text-[#ffd08f] font-semibold flex items-center gap-1">
                🍜 3. 市井烟火气
              </p>
              <p className="text-justify">
                无论是早市那碗滚烫浓白的【羊肠汤】，还是深夜巷口炉中焦香酥脆的【河间驴肉火烧】，
                抑或是朋友小聚时那盆热辣豪迈的【火锅鸡】，都是沧州在粗犷刚烈的燕赵大地上，流淌出的温暖柔情。
              </p>
            </div>

            <button
              id="btn-dialog-close"
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2 bg-[#c28434] hover:bg-amber-500 text-white font-serif font-bold text-xs rounded-xl shadow-lg transition-all"
            >
              了解，开启美食寻礼
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
