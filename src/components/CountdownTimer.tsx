/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CountdownTime } from "../types";
import { Calendar, Compass, FlameKindling, UtensilsCrossed } from "lucide-react";

function HourglassAnimation() {
  const [rotation, setRotation] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleFlip = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setRotation(prev => prev + 180);
    setTimeout(() => {
      setIsFlipping(false);
    }, 1200);
  };

  return (
    <div className="relative">
      <style>{`
        @keyframes sandFlow {
          to {
            stroke-dashoffset: -12;
          }
        }
        .animate-sand-trickle {
          animation: sandFlow 0.8s linear infinite;
        }
      `}</style>
      <motion.div
        onClick={handleFlip}
        className="cursor-pointer relative w-16 h-20 flex items-center justify-center p-1"
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <svg viewBox="0 0 60 80" className="w-full h-full drop-shadow-[0_4px_10px_rgba(194,132,52,0.15)]">
          {/* Hourglass outer body frame - Ancient bronze color */}
          <path d="M 5,5 L 55,5" stroke="#c28434" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 5,75 L 55,75" stroke="#c28434" strokeWidth="4.5" strokeLinecap="round" />
          
          {/* Support columns */}
          <line x1="10" y1="5" x2="10" y2="75" stroke="#8c5213" strokeWidth="2.5" />
          <line x1="50" y1="5" x2="50" y2="75" stroke="#8c5213" strokeWidth="2.5" />

          {/* Glass Bulbs - Upper & Lower chambers */}
          <path 
            d="M 14,8 C 14,24 24,38 28,40 C 24,42 14,56 14,72" 
            stroke="#4e7e60" 
            strokeWidth="2.5" 
            fill="none" 
            opacity="0.85" 
          />
          <path 
            d="M 46,8 C 46,24 36,38 32,40 C 36,42 46,56 46,72" 
            stroke="#4e7e60" 
            strokeWidth="2.5" 
            fill="none" 
            opacity="0.85" 
          />

          {/* Glass gloss shine highlights */}
          <path d="M 17,14 Q 21,24 23,28" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
          <path d="M 17,66 Q 21,58 23,54" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.3" />

          {/* SAND RENDERING SECTION */}
          
          {/* Upper chamber declining Sand Mound */}
          <motion.path 
            d="M 15,10 Q 30,12 45,10 Q 40,32 30,38 Q 20,32 15,10 Z" 
            fill="#ffd08f" 
            animate={{ scaleY: isFlipping ? [0, 1] : [1, 0.4] }}
            transition={{ duration: isFlipping ? 1.2 : 45, ease: "linear" }}
            style={{ transformOrigin: "center bottom" }}
          />

          {/* Glass bottleneck / neck orifice */}
          <circle cx="30" cy="40" r="1.5" fill="#c28434" />

          {/* Middle sand stream falling downwards */}
          {!isFlipping && (
            <line 
              x1="30" 
              y1="39" 
              x2="30" 
              y2="71" 
              stroke="#ffd08f" 
              strokeWidth="2.5" 
              strokeDasharray="4 3"
              className="animate-sand-trickle"
            />
          )}

          {/* Lower chamber rising Sand Mound */}
          <motion.path 
            d="M 23,72 Q 30,55 37,72 Z" 
            fill="#ffd08f"
            animate={{ scaleY: isFlipping ? [1, 0] : [0.3, 1] }}
            transition={{ duration: isFlipping ? 1.2 : 45, ease: "linear" }}
            style={{ transformOrigin: "center bottom" }}
          />

          {/* Falling landing sand splash ripples */}
          {!isFlipping && (
            <circle cx="30" cy="71" r="2" fill="#ffd08f" className="animate-ping" />
          )}

          {/* Subtle glass container shadow */}
          <ellipse cx="30" cy="74" rx="14" ry="2" fill="#000" opacity="0.4" />
        </svg>
      </motion.div>
    </div>
  );
}

interface CountdownTimerProps {
  onBonusTime?: () => void; // A function to trigger when user wrapper mini-game completes
}

export default function CountdownTimer({ onBonusTime }: CountdownTimerProps) {
  // Target date: June 18, 2026, 17:00:00 Local/Beijing Time
  // In Javascript Date, month is 0-indexed (0 = Jan, 5 = June)
  const targetDate = new Date(2026, 5, 18, 17, 0, 0);

  const calculateTimeLeft = (): CountdownTime => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isCompleted: false };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format with leading zero
  const pad = (num: number) => String(num).padStart(2, "0");

  // Percentage calculations for progress arcs (assuming starting from June 14, 2026, which is ~4 days in total)
  // 4 days total = 345600 seconds
  const totalSecondsInitial = 4 * 24 * 60 * 60;
  const currentDiffSeconds = Math.max(0, Math.floor((targetDate.getTime() - new Date().getTime()) / 1000));
  const progressRatio = Math.min(1, currentDiffSeconds / totalSecondsInitial);

  // Time metrics structure
  const timeUnits = [
    { label: "天", value: pad(timeLeft.days), sub: "DAYS", color: "from-[#c28434] to-[#8c5213]" },
    { label: "时", value: pad(timeLeft.hours), sub: "HOURS", color: "from-[#b87333] to-[#7c3f12]" },
    { label: "分", value: pad(timeLeft.minutes), sub: "MINUTES", color: "from-[#a0522d] to-[#5c2d12]" },
    { label: "秒", value: pad(timeLeft.seconds), sub: "SECONDS", color: "from-[#8b5a2b] to-[#4a2e0c]" },
  ];

  return (
    <div id="countdown-banner-container" className="relative overflow-hidden rounded-3xl border border-amber-900/30 bg-gradient-to-b from-[#062e1e]/90 to-[#021810]/95 p-6 md:p-8 text-white shadow-2xl backdrop-blur-md">
      {/* Decorative Traditional Border Patterns */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#c28434]/40" />
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#c28434]/40" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#c28434]/40" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#c28434]/40" />

      {/* Main Layout Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Side: Traditional Theme Callout */}
        <div className="lg:col-span-4 space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3  py-1 rounded-full border border-amber-500/30 bg-[#c28434]/10 text-[#d4af37] text-xs font-semibold tracking-wide uppercase">
            <Compass className="w-3.5 h-3.5 animate-spin-slow text-[#c28434]" />
            <span>盛世运河 · 香江两岸</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e3b26c] via-[#f3d39e] to-[#c28434] select-none tracking-tight">
            端午佳节 · 沧州美食之约
          </h2>

          <p className="text-sm text-emerald-100/80 leading-relaxed font-sans">
            大运河汤汤，洗净千年岁月。端午时夕，江畔苇香随风拂，带您启程沧州。
            在这座塞外运河之都，让我们循着四海惊叹的骨汤与焦香四溢的烤火烧，共赴一场指尖与舌尖的旷世欢歌！
          </p>

          <div id="target-date-badge" className="flex items-center justify-center lg:justify-start gap-2.5 text-xs text-[#c28434] font-mono bg-amber-500/5 py-1.5 px-3 rounded-lg border border-amber-900/40 inline-block w-fit mx-auto lg:mx-0">
            <Calendar className="w-4 h-4" />
            <span>启程时刻: 2026年6月18日 17:00 (本地时间)</span>
          </div>
        </div>

        {/* Right Side: The Luxurious Bronze-accented Countdown Grid */}
        <div className="lg:col-span-8 flex flex-col justify-center items-center w-full">
          
          {/* Subtitle with decorative line */}
          <div className="flex items-center gap-3 w-full max-w-lg mb-6">
            <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-700/50" />
            <span className="text-xs uppercase font-mono tracking-[4px] text-[#e3b26c]/80 flex items-center gap-1">
              <FlameKindling className="w-3 h-3 text-[#c28434]" /> 距离佳节盛宴启幕还有
            </span>
            <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-amber-700/50" />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-2xl justify-center">
            
            {/* Interactive Hourglass Container */}
            <div className="flex flex-col items-center gap-2 bg-[#02130c] p-4 rounded-3xl border border-amber-900/10 shadow-lg shrink-0 w-36 select-none group">
              <span className="text-[9px] text-[#e3b26c]/60 font-serif tracking-widest text-center uppercase leading-none">
                神州沙漏 · 岁越
              </span>
              
              <HourglassAnimation />

              <span className="text-[9px] text-emerald-100/30 font-mono text-center scale-95 leading-none">
                点击翻转流沙 🔄
              </span>
            </div>

            {/* Core Numbers */}
            <div className="grid grid-cols-4 gap-2 md:gap-3 flex-1 w-full">
              {timeUnits.map((u) => (
                <div 
                  key={u.label} 
                  className="relative flex flex-col items-center bg-gradient-to-b from-[#103e2c] to-[#041d13] border-t border-r border-[#c28434]/30 rounded-2xl md:rounded-3xl p-3 md:p-4 shadow-xl group hover:border-[#c28434]/70 transition-colors duration-300"
                >
                  {/* Ancient Bronze Ornament background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c28434]/5 to-transparent rounded-2xl md:rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating digital/traditional hybrid numbers */}
                  <span className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-[#ffd08f] to-[#b87333] tracking-widest leading-none drop-shadow-md font-mono select-none">
                    {u.value}
                  </span>

                  <span className="mt-2 text-[10px] md:text-xs text-[#d4af37] tracking-[2px] font-semibold flex items-center gap-1 justify-center">
                    {u.label}
                    <span className="hidden md:inline text-[8px] text-amber-600 font-normal">/ {u.sub}</span>
                  </span>

                  {/* Micro coppery bronze dot */}
                  <span className="absolute bottom-2 w-1 h-1 rounded-full bg-gradient-to-r from-[#c28434] to-[#f3d39e] opacity-30 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100" />
                </div>
              ))}
            </div>

          </div>

          {/* Quick interactive note / action */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-lg text-xs bg-[#0b2d20]/90 p-3 rounded-xl border border-amber-900/30">
            <span className="text-emerald-200/90 text-center sm:text-left flex items-center gap-1.5">
              <UtensilsCrossed className="w-3.5 h-3.5 text-amber-500" />
              觉得时间过得慢？在下方DIY端午枣粽可以提前解锁沧州美食故事！
            </span>
            {onBonusTime && (
              <button
                id="btn-quick-bonus-jumpToMaker"
                onClick={onBonusTime}
                className="px-3 py-1.5 bg-gradient-to-r from-[#c28434] to-[#8c5213] hover:from-[#d4af37] hover:to-[#a0522d] text-white font-medium rounded-lg shadow-md hover:shadow-amber-500/20 active:scale-95 transition-all text-[11px] shrink-0"
              >
                立即包个粽子 🥬
              </button>
            )}
          </div>

          {/* Linear Canal Wave Progress Bar represents current timeline progression */}
          <div className="w-full max-w-2xl mt-6 relative h-2 bg-emerald-950/90 rounded-full overflow-hidden border border-emerald-900/30">
            {/* The running water wave representation */}
            <div 
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#22845c]/80 via-[#c28434]/80 to-[#edd3af] rounded-full transition-all duration-1000"
              style={{ width: `${(1 - progressRatio) * 100}%` }}
            />
            {/* Wave crest glint */}
            <div 
              className="absolute top-0 bottom-0 w-2 bg-white/70 animate-pulse"
              style={{ left: `calc(${(1 - progressRatio) * 100}% - 4px)` }}
            />
          </div>
          <div className="w-full max-w-2xl px-1 mt-1.5 flex justify-between text-[10px] text-emerald-100/40 font-mono">
            <span>运河之水东折 (2026-06-14)</span>
            <span>美食大典开锣 !</span>
          </div>

        </div>

      </div>
    </div>
  );
}
