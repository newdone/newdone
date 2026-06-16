/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Utility to generate a fully styled, highly interactive, standalone HTML document
 * containing the "端午沧州美食行" content and interactive logic, allowing users
 * to run it offline as a single-file portable app!
 */
export function exportToSingleHTML(bannerPath?: string, canalPath?: string, zongziPath?: string) {
  const origin = window.location.origin;
  const bannerUrl = bannerPath 
    ? (bannerPath.startsWith('http') || bannerPath.startsWith('data:') ? bannerPath : `${origin}${bannerPath}`) 
    : "https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&auto=format&fit=crop&q=80";
  
  const canalUrl = canalPath 
    ? (canalPath.startsWith('http') || canalPath.startsWith('data:') ? canalPath : `${origin}${canalPath}`) 
    : "https://images.unsplash.com/photo-1599573030541-0ca238067b45?w=1000&auto=format&fit=crop&q=80";
  
  const zongziUrl = zongziPath 
    ? (zongziPath.startsWith('http') || zongziPath.startsWith('data:') ? zongziPath : `${origin}${zongziPath}`) 
    : "https://images.unsplash.com/photo-1511145103444-118837e42d76?w=500&auto=format&fit=crop&q=80";

  const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>端午沧州美食行 · 离线交互珍藏版</title>
  
  <!-- Tailwind CSS CDN for fluid responsive styles -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Exquisite Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Serif+SC:wght@500;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
            serif: ["Noto Serif SC", "Georgia", "serif"],
            mono: ["JetBrains Mono", "SFMono-Regular", "monospace"],
          }
        }
      }
    }
  </script>
  
  <style>
    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #010e09;
    }
    ::-webkit-scrollbar-thumb {
      background: #c2843440;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #c28434a0;
    }
    
    html {
      scroll-behavior: smooth;
    }
    
    body {
      background-color: #000503;
      background-image: radial-gradient(circle at center, #021810 0%, #010e09 50%, #000402 100%);
      color: #ecfdf5;
    }

    /* Simple interactive animations */
    .bounce-subtle {
      animation: bounceSubtle 3s infinite;
    }
    @keyframes bounceSubtle {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
  </style>
</head>
<body class="min-h-screen flex flex-col selection:bg-amber-500 selection:text-black font-sans">

  <!-- Header Section -->
  <header class="sticky top-0 z-50 bg-[#01110a]/80 backdrop-blur-md border-b border-amber-900/20 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
      
      <!-- Brand Logo -->
      <div class="flex items-center gap-3 cursor-pointer">
        <div class="w-10 h-10 rounded-full bg-gradient-to-r from-[#c28434] to-[#8c5213] p-0.5 flex items-center justify-center shadow-lg border border-amber-500/30">
          <span class="text-white text-lg font-serif font-black">沧</span>
        </div>
        <div>
          <h1 class="text-base font-serif font-black tracking-widest text-[#ffd08f] leading-none">端午沧州美食行</h1>
          <p class="text-[9px] text-emerald-100/40 uppercase font-mono tracking-wider mt-1">CANGZHOU OFFLINE COLLECTOR EDITION</p>
        </div>
      </div>

      <!-- Quick Anchor Nav -->
      <nav class="hidden md:flex items-center gap-1 bg-[#010906] p-1 rounded-full border border-amber-900/15">
        <a href="#section-countdown" class="px-4 py-1.5 rounded-full text-xs font-serif font-semibold text-emerald-100/80 hover:text-[#ffd08f] transition-colors">倒计时</a>
        <a href="#section-canal" class="px-4 py-1.5 rounded-full text-xs font-serif font-semibold text-emerald-100/80 hover:text-[#ffd08f] transition-colors">运河图</a>
        <a href="#section-gourmet" class="px-4 py-1.5 rounded-full text-xs font-serif font-semibold text-emerald-100/80 hover:text-[#ffd08f] transition-colors">美食志</a>
        <a href="#section-diy" class="px-4 py-1.5 rounded-full text-xs font-serif font-semibold text-emerald-100/80 hover:text-[#ffd08f] transition-colors">手作粽</a>
        <a href="#section-guestbook" class="px-4 py-1.5 rounded-full text-xs font-serif font-semibold text-emerald-100/80 hover:text-[#ffd08f] transition-colors">留言簿</a>
      </nav>

      <!-- Badge Info -->
      <div class="flex items-center gap-2">
        <span class="px-3 py-1 bg-[#103e2c] border border-[#c28434]/30 text-[#ffd08f] text-[10px] rounded-lg font-serif">
          🍃 极速离线版
        </span>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="relative overflow-hidden rounded-3xl mt-6 border border-amber-900/40 bg-gradient-to-r from-emerald-950 to-stone-900 h-80 min-h-[300px] flex items-center justify-center max-w-6xl mx-auto w-full shadow-2xl group">
    <!-- Banner Image Backdrop -->
    <img
      src="${bannerUrl}"
      alt="端午大运河盛景"
      class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-[1.01] transition-transform duration-1000"
    />
    
    <!-- Overlays -->
    <div class="absolute inset-0 bg-gradient-to-t from-[#010e09] via-black/40 to-black/10 mix-blend-multiply"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-[#062e1e]/60 via-transparent to-[#021810]/60"></div>
    
    <div class="space-y-4 relative z-10 max-w-2xl mx-auto p-6">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-black/60 backdrop-blur-md text-[#ffd08f] text-xs font-bold leading-none tracking-widest font-serif">
        <span>京杭运河襟淮海 · 铁狮雄镇绕清风</span>
      </div>
      <p class="text-4xl md:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ffd08f] via-[#c28434] to-[#8c5213] tracking-widest drop-shadow py-1.5 leading-none">
        端午佳节 沧州美食行
      </p>
      <p class="text-xs md:text-sm text-emerald-100/90 font-serif leading-relaxed tracking-wider max-w-2xl mx-auto italic drop-shadow-md">
        “本单文件离线珍藏版汇聚了沧州大运河端午庆典之旅的所有美食人文，可在断网状态下随意点阅，期待6月18号的运河美食汇合！”
      </p>
    </div>
  </section>

  <!-- Main Grid Box -->
  <main class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-16 flex-1">
    
    <!-- Module 1: Countdown -->
    <div id="section-countdown" class="scroll-mt-20">
      <div class="bg-gradient-to-br from-[#042418] via-[#01140e] to-[#010906] border border-[#c28434]/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div class="absolute -top-12 -right-12 w-48 h-48 bg-[#c28434]/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <!-- Calligraphy Promo Text -->
          <div class="lg:col-span-5 space-y-4">
            <span class="text-xs text-[#c28434] font-serif font-bold tracking-[3px] uppercase block">
              🔔 水路启航 · 运河锣鼓鸣
            </span>
            <h3 className="text-xl md:text-2xl font-serif text-white font-heavy lead-none">
              离线倒计时追光印记
            </h3>
            <p class="text-xs text-emerald-100/60 leading-relaxed font-serif pt-1 text-justify">
              本系统使用您的本地系统时钟进行实时演算。锁定于 <strong class="text-amber-400">2026年端午美食会（6月18日17:00）</strong>。
              长夜漫漫，运河两岸灯火长明，期待您踏足那一座充满小枣清甜的非遗铁狮古城！
            </p>
            <div class="flex items-center gap-4 text-[10px] text-amber-500 font-mono">
              <span class="flex items-center gap-1">⏰ 实时演算</span>
              <span class="text-emerald-500">•</span>
              <span class="flex items-center gap-1">🗺️ 精度 1秒</span>
            </div>
          </div>

          <!-- Countdown Grid -->
          <div class="lg:col-span-7 flex flex-col md:flex-row items-center gap-6 justify-center w-full">
            
            <!-- Dynamic Hourglass Card -->
            <div class="flex flex-col items-center gap-2 bg-[#010b06] border border-amber-900/30 p-4 rounded-2xl w-32 shrink-0">
              <span class="text-[9px] text-[#e3b26c]/60 font-serif tracking-widest text-center">古法神州沙漏</span>
              
              <!-- Simple SVG Hourglass -->
              <div class="w-12 h-16 relative hover:scale-105 transition-transform duration-300 cursor-pointer" onclick="toggleHourglass()">
                <svg viewBox="0 0 60 80" class="w-full h-full">
                  <path d="M 5,5 L 55,5" stroke="#c28434" stroke-width="4" />
                  <path d="M 5,75 L 55,75" stroke="#c28434" stroke-width="4" />
                  <path d="M 14,8 C 14,24 24,38 28,40 C 24,42 14,56 14,72" stroke="#4e7e60" stroke-width="2" fill="none" opacity="0.8" />
                  <path d="M 46,8 C 46,24 36,38 32,40 C 36,42 46,56 46,72" stroke="#4e7e60" stroke-width="2" fill="none" opacity="0.8" />
                  <!-- upper sand -->
                  <path d="M 15,10 Q 30,12 45,10 Q 40,32 30,38 Q 20,32 15,10 Z" fill="#ffd08f" id="hourglass-upper" />
                  <!-- lower sand -->
                  <path d="M 23,72 Q 30,60 37,72 Z" fill="#ffd08f" id="hourglass-lower" />
                  <line x1="30" y1="39" x2="30" y2="71" stroke="#ffd08f" stroke-width="2" stroke-dasharray="3 3" />
                </svg>
              </div>
              
              <span class="text-[8px] text-emerald-100/30 text-center font-mono uppercase">TAP TO FLIP 🔄</span>
            </div>

            <!-- Numbers Grid -->
            <div class="grid grid-cols-4 gap-2.5 flex-1 w-full text-center">
              <div class="bg-gradient-to-b from-[#103e2c] to-[#041d13] border border-[#c28434]/20 rounded-2xl p-4">
                <span class="text-3xl font-mono font-black text-amber-100" id="timer-days">--</span>
                <span class="block text-[10px] text-[#d4af37] tracking-widest mt-1">天</span>
              </div>
              <div class="bg-gradient-to-b from-[#103e2c] to-[#041d13] border border-[#c28434]/20 rounded-2xl p-4">
                <span class="text-3xl font-mono font-black text-amber-100" id="timer-hours">--</span>
                <span class="block text-[10px] text-[#d4af37] tracking-widest mt-1">时</span>
              </div>
              <div class="bg-gradient-to-b from-[#103e2c] to-[#041d13] border border-[#c28434]/20 rounded-2xl p-4">
                <span class="text-3xl font-mono font-black text-amber-100" id="timer-mins">--</span>
                <span class="block text-[10px] text-[#d4af37] tracking-widest mt-1">分</span>
              </div>
              <div class="bg-gradient-to-b from-[#103e2c] to-[#041d13] border border-[#c28434]/20 rounded-2xl p-4">
                <span class="text-3xl font-mono font-black text-amber-200" id="timer-secs">--</span>
                <span class="block text-[10px] text-amber-500 tracking-widest mt-1">秒</span>
              </div>
            </div> <!-- Close Numbers Grid -->

          </div> <!-- Close Countdown Grid wrapper -->

        </div> <!-- Close outer grid row -->

      </div> <!-- Close card background box -->
    </div> <!-- Close section element -->

    <div class="h-[1px] bg-gradient-to-r from-transparent via-amber-900/20 to-transparent"></div>

    <!-- MODULE 1.5: Explorers Crew (人物集结令) -->
    <div id="section-explorers" class="scroll-mt-20 relative bg-gradient-to-r from-[#031d10] via-[#052d19] to-[#031d10] border border-amber-900/30 rounded-3xl p-6 shadow-2xl overflow-hidden backdrop-blur-md">
      <div class="absolute top-0 right-0 w-32 h-32 opacity-10 bg-[radial-gradient(#c28434_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
      <div class="absolute -bottom-1 left-0 right-0 h-4 bg-amber-900/10 border-t border-amber-900/20 backdrop-filter"></div>

      <div class="relative z-10 space-y-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#c28434]/20 pb-4">
          <div class="text-center md:text-left">
            <h3 class="text-xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-[#ffd08f] to-[#c28434] select-none flex items-center justify-center md:justify-start gap-2">
              <span class="text-amber-500">✨</span> 运河美食探险团 · 人物集结令
            </h3>
            <p class="text-xs text-emerald-100/50 mt-1 text-left">
              特邀探险家与两位萌宠伙伴，已在京杭段古石桥上整装待发！点击头像听听他们的美食心声 📣
            </p>
          </div>
          <div class="flex items-center gap-2 bg-[#02140c] px-3 py-1.5 rounded-full border border-emerald-900 text-xs text-amber-500">
            <span>📷 实景卡通化技术 (免安装版)</span>
          </div>
        </div>

        <!-- Horizontal parade of characters -->
        <div class="flex flex-wrap md:flex-nowrap justify-center md:justify-around gap-4 md:gap-6 py-4 px-2 overflow-x-auto scrollbar-none">
          <!-- Character 1: aqiu -->
          <div onclick="selectExplorer('aqiu')" class="explorer-card relative flex flex-col items-center group cursor-pointer select-none transition-all duration-300 rounded-2xl p-2 max-w-[110px] shrink-0 border border-transparent" id="exp-card-aqiu">
            <div class="relative w-16 h-16 rounded-full shadow-lg overflow-hidden border-2 border-transparent group-hover:border-amber-500/50 transition-all duration-300" id="exp-avatar-aqiu-box">
              <!-- aqiu SVG -->
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="#132a1e" stroke="#c28434" stroke-width="2" />
                <path d="M 35,40 Q 50,15 65,40" fill="#1c1c1c" />
                <circle cx="70" cy="35" r="10" fill="#1c1c1c" />
                <circle cx="50" cy="46" r="22" fill="#ffd8c2" />
                <path d="M 28,40 Q 50,22 72,40 Q 65,30 50,32 Q 35,30 28,40 Z" fill="#1c1c1c" />
                <ellipse cx="42" cy="44" r="2.5" rx="1.5" ry="3" fill="#1c1c1c" />
                <ellipse cx="58" cy="44" r="2.5" rx="1.5" ry="3" fill="#1c1c1c" />
                <path d="M 40,41 Q 42,39 44,41" stroke="#1c1c1c" stroke-width="1" fill="none" />
                <path d="M 56,41 Q 58,39 60,41" stroke="#1c1c1c" stroke-width="1" fill="none" />
                <circle cx="37" cy="50" r="3" fill="#ff7f7f" opacity="0.6" />
                <circle cx="63" cy="50" r="3" fill="#ff7f7f" opacity="0.6" />
                <path d="M 44,53 Q 50,58 56,53" stroke="#aa3333" stroke-width="2.5" fill="none" stroke-linecap="round" />
                <path d="M 75,60 Q 82,45 80,40" stroke="#ffd8c2" stroke-width="5" fill="none" stroke-linecap="round" />
                <path d="M 80,40 Q 78,36 75,40" stroke="#ffd8c2" stroke-width="2" fill="none" />
                <path d="M 25,75 C 25,65 30,58 50,58 C 70,58 75,65 75,75 Z" fill="#2d3748" />
                <path d="M 32,58 Q 36,68 40,75" stroke="#3182ce" stroke-width="4.5" fill="none" />
                <path d="M 44,58 L 50,64 L 56,58" stroke="#ffffff" stroke-width="2" fill="none" />
              </svg>
            </div>
            <span class="mt-2 text-xs text-white font-serif font-bold group-hover:text-amber-300">阿秋</span>
            <span class="text-[9px] text-emerald-100/40 font-mono mt-0.5">美食先锋</span>
            <button onclick="likeExplorer('aqiu', event)" class="mt-2 flex items-center gap-1 text-[9px] text-rose-300 font-mono bg-[#010c07] px-2 py-0.5 rounded-full border border-emerald-950/80">
              <span class="text-rose-500">❤️</span> <span id="exp-likes-aqiu">28</span>
            </button>
          </div>

          <!-- Character 2: chaoge -->
          <div onclick="selectExplorer('chaoge')" class="explorer-card relative flex flex-col items-center group cursor-pointer select-none transition-all duration-300 rounded-2xl p-2 max-w-[110px] shrink-0 border border-transparent" id="exp-card-chaoge">
            <div class="relative w-16 h-16 rounded-full shadow-lg overflow-hidden border-2 border-transparent group-hover:border-amber-500/50 transition-all duration-300" id="exp-avatar-chaoge-box">
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="#2b0d0d" stroke="#c28434" stroke-width="2" />
                <circle cx="50" cy="46" r="21" fill="#ffdfcb" />
                <path d="M 28,34 Q 50,15 72,34 C 68,26 62,24 50,26 C 38,24 32,26 28,34 Z" fill="#1a1a1a" />
                <rect x="34" y="38" width="14" height="9" rx="3" fill="#111" stroke="#ffd700" stroke-width="1" />
                <rect x="52" y="38" width="14" height="9" rx="3" fill="#111" stroke="#ffd700" stroke-width="1" />
                <line x1="48" y1="41" x2="52" y2="41" stroke="#ffd700" stroke-width="2" />
                <path d="M 45,54 Q 50,59 55,54" stroke="#8a2222" stroke-width="3" fill="none" stroke-linecap="round" />
                <path d="M 23,75 Q 23,58 50,58 Q 77,58 77,75 Z" fill="#c53030" />
                <path d="M 44,58 L 50,65 L 56,58" fill="#4a5568" />
                <line x1="45" y1="62" x2="45" y2="72" stroke="#ffffff" stroke-width="1.5" />
                <line x1="55" y1="62" x2="55" y2="72" stroke="#ffffff" stroke-width="1.5" />
                <circle cx="34" cy="52" r="1.5" fill="#ffd700" />
              </svg>
            </div>
            <span class="mt-2 text-xs text-white font-serif font-bold group-hover:text-amber-300">潮哥</span>
            <span class="text-[9px] text-emerald-100/40 font-mono mt-0.5">驴火鉴赏官</span>
            <button onclick="likeExplorer('chaoge', event)" class="mt-2 flex items-center gap-1 text-[9px] text-rose-300 font-mono bg-[#010c07] px-2 py-0.5 rounded-full border border-emerald-950/80">
              <span class="text-rose-500">❤️</span> <span id="exp-likes-chaoge">32</span>
            </button>
          </div>

          <!-- Character 3: nuomi -->
          <div onclick="selectExplorer('nuomi')" class="explorer-card relative flex flex-col items-center group cursor-pointer select-none transition-all duration-300 rounded-2xl p-2 max-w-[110px] shrink-0 border border-transparent" id="exp-card-nuomi">
            <div class="relative w-16 h-16 rounded-full shadow-lg overflow-hidden border-2 border-transparent group-hover:border-amber-500/50 transition-all duration-300" id="exp-avatar-nuomi-box">
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="#301524" stroke="#c28434" stroke-width="2" />
                <circle cx="28" cy="26" r="11" fill="#2d1e25" />
                <circle cx="72" cy="26" r="11" fill="#2d1e25" />
                <circle cx="50" cy="48" r="22" fill="#ffece0" />
                <path d="M 26,45 Q 50,30 74,45 Q 70,36 50,38 Q 30,36 26,45 Z" fill="#2d1e25" />
                <circle cx="41" cy="46" r="3" fill="#111111" />
                <circle cx="42" cy="45" r="1" fill="#ffffff" />
                <circle cx="59" cy="46" r="3" fill="#111111" />
                <circle cx="60" cy="45" r="1" fill="#ffffff" />
                <circle cx="35" cy="53" r="5" fill="#ffa0a0" opacity="0.8" />
                <circle cx="65" cy="53" r="5" fill="#ffa0a0" opacity="0.8" />
                <path d="M 46,55 Q 50,60 54,55" stroke="#d53f8c" stroke-width="2.5" fill="none" stroke-linecap="round" />
                <path d="M 25,75 C 25,65 32,60 50,60 C 68,60 75,65 75,75 Z" fill="#eb4899" />
                <path d="M 38,60 Q 44,65 50,60 Q 56,65 62,60" stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round" />
                <path d="M 28,75 Q 18,63 26,58" stroke="#eb4899" stroke-width="7" fill="none" stroke-linecap="round" />
                <circle cx="26" cy="58" r="3.5" fill="#ffece0" />
              </svg>
            </div>
            <span class="mt-2 text-xs text-white font-serif font-bold group-hover:text-amber-300">小糯米</span>
            <span class="text-[9px] text-emerald-100/40 font-mono mt-0.5">红枣品鉴家</span>
            <button onclick="likeExplorer('nuomi', event)" class="mt-2 flex items-center gap-1 text-[9px] text-rose-300 font-mono bg-[#010c07] px-2 py-0.5 rounded-full border border-emerald-950/80">
              <span class="text-rose-500">❤️</span> <span id="exp-likes-nuomi">45</span>
            </button>
          </div>

          <!-- Character 4: wenai -->
          <div onclick="selectExplorer('wenai')" class="explorer-card relative flex flex-col items-center group cursor-pointer select-none transition-all duration-300 rounded-2xl p-2 max-w-[110px] shrink-0 border border-transparent" id="exp-card-wenai">
            <div class="relative w-16 h-16 rounded-full shadow-lg overflow-hidden border-2 border-transparent group-hover:border-amber-500/50 transition-all duration-300" id="exp-avatar-wenai-box">
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="#0c1d15" stroke="#c28434" stroke-width="2" />
                <path d="M 25,44 C 25,20 75,20 75,44 Z" fill="#2d302d" />
                <circle cx="50" cy="47" r="21" fill="#ffe0ce" />
                <path d="M 27,41 Q 50,28 73,41" stroke="#2d302d" stroke-width="5" fill="none" />
                <path d="M 38,46 Q 42,42 45,45" stroke="#222" stroke-width="2.5" fill="none" stroke-linecap="round" />
                <path d="M 55,46 Q 58,42 62,45" stroke="#222" stroke-width="2.5" fill="none" stroke-linecap="round" />
                <path d="M 44,53 Q 50,57 56,53" stroke="#9b2c2c" stroke-width="2" fill="none" stroke-linecap="round" />
                <ellipse cx="36" cy="50" rx="3.5" ry="2" fill="#e53e3e" opacity="0.4" />
                <ellipse cx="64" cy="50" rx="3.5" ry="2" fill="#e53e3e" opacity="0.4" />
                <path d="M 24,75 C 24,65 30,59 50,59 C 70,59 76,65 76,75 Z" fill="#4a5d4e" />
                <path d="M 44,59 L 50,64 L 56,59" fill="#ecc94b" />
                <path d="M 72,75 Q 82,63 74,58" stroke="#4a5d4e" stroke-width="7" fill="none" stroke-linecap="round" />
                <circle cx="74" cy="58" r="3.5" fill="#ffe0ce" />
              </svg>
            </div>
            <span class="mt-2 text-xs text-white font-serif font-bold group-hover:text-amber-300">温阿姨</span>
            <span class="text-[9px] text-emerald-100/40 font-mono mt-0.5">风光护航者</span>
            <button onclick="likeExplorer('wenai', event)" class="mt-2 flex items-center gap-1 text-[9px] text-rose-300 font-mono bg-[#010c07] px-2 py-0.5 rounded-full border border-emerald-950/80">
              <span class="text-rose-500">❤️</span> <span id="exp-likes-wenai">24</span>
            </button>
          </div>

          <!-- Character 5: daliang -->
          <div onclick="selectExplorer('daliang')" class="explorer-card relative flex flex-col items-center group cursor-pointer select-none transition-all duration-300 rounded-2xl p-2 max-w-[110px] shrink-0 border border-transparent" id="exp-card-daliang">
            <div class="relative w-16 h-16 rounded-full shadow-lg overflow-hidden border-2 border-transparent group-hover:border-amber-500/50 transition-all duration-300" id="exp-avatar-daliang-box">
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="#111f2d" stroke="#c28434" stroke-width="2" />
                <circle cx="50" cy="46" r="21" fill="#ffdcb9" />
                <path d="M 28,34 Q 50,10 72,34 M 32,32 L 35,22 L 40,26 L 45,18 L 50,24 L 55,18 L 60,26 L 65,22 L 68,32" stroke="#1d2731" stroke-width="4" fill="#1d2731" stroke-linejoin="round" />
                <ellipse cx="41" cy="45" rx="2" ry="3" fill="#1d2731" />
                <ellipse cx="59" cy="45" rx="2" ry="3" fill="#1d2731" />
                <path d="M 37,39 Q 41,36 44,39" stroke="#1d2731" stroke-width="2" fill="none" />
                <path d="M 43,52 Q 50,58 57,52" fill="#fff" />
                <path d="M 43,52 Q 50,58 57,52 Z" stroke="#1d2731" stroke-width="2" fill="none" />
                <path d="M 23,75 C 23,65 30,58 50,58 C 70,58 77,65 77,75 Z" fill="#1a202c" />
                <line x1="50" y1="58" x2="50" y2="75" stroke="#cbd5e0" stroke-width="2.5" />
                <path d="M 76,68 L 86,46 L 80,41" stroke="#1a202c" stroke-width="7.5" fill="none" stroke-linecap="round" />
                <circle cx="80" cy="41" r="4.5" fill="#ffdcb9" />
              </svg>
            </div>
            <span class="mt-2 text-xs text-white font-serif font-bold group-hover:text-amber-300">大亮</span>
            <span class="text-[9px] text-emerald-100/40 font-mono mt-0.5">热血领队</span>
            <button onclick="likeExplorer('daliang', event)" class="mt-2 flex items-center gap-1 text-[9px] text-rose-300 font-mono bg-[#010c07] px-2 py-0.5 rounded-full border border-emerald-950/80">
              <span class="text-rose-500">❤️</span> <span id="exp-likes-daliang">36</span>
            </button>
          </div>

          <!-- Character 6: juanjuan -->
          <div onclick="selectExplorer('juanjuan')" class="explorer-card relative flex flex-col items-center group cursor-pointer select-none transition-all duration-300 rounded-2xl p-2 max-w-[110px] shrink-0 border border-transparent" id="exp-card-juanjuan">
            <div class="relative w-16 h-16 rounded-full shadow-lg overflow-hidden border-2 border-transparent group-hover:border-amber-500/50 transition-all duration-300" id="exp-avatar-juanjuan-box">
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="#101525" stroke="#c28434" stroke-width="2" />
                <path d="M 28,75 Q 35,60 50,60 Q 65,60 72,75 Z" fill="#e2e8f0" />
                <path d="M 30,75 C 33,63 40,64 50,64 C 60,64 67,63 70,75 Z" fill="#3182ce" />
                <path d="M 50,64 V 75" stroke="#f6e05e" stroke-width="2" />
                <path d="M 26,35 C 20,40 20,62 30,62 C 34,62 34,45 32,38 Z" fill="#faf6f0" />
                <path d="M 74,35 C 80,40 80,62 70,62 C 66,62 66,45 68,38 Z" fill="#faf6f0" />
                <circle cx="50" cy="42" r="21" fill="#faf6f0" />
                <circle cx="40" cy="30" r="7" fill="#faf6f0" />
                <circle cx="60" cy="30" r="7" fill="#faf6f0" />
                <circle cx="50" cy="28" r="7" fill="#faf6f0" />
                <circle cx="43" cy="42" r="3.5" fill="#4a3728" />
                <circle cx="44" cy="41" r="1" fill="#fff" />
                <circle cx="57" cy="42" r="3.5" fill="#4a3728" />
                <circle cx="56" cy="41" r="1" fill="#fff" />
                <ellipse cx="50" cy="49" rx="7.5" ry="5.5" fill="#f4eae1" />
                <polygon points="47,47 53,47 50,51" fill="#111111" />
                <path d="M 48,51 Q 50,53 52,51" stroke="#111" stroke-width="1.5" fill="none" />
                <path d="M 38,62 Q 50,66 62,62" stroke="#e53e3e" stroke-width="3" fill="none" />
                <circle cx="50" cy="65" r="3" fill="#f6e05e" stroke="#c53030" stroke-width="0.5" />
              </svg>
            </div>
            <span class="mt-2 text-xs text-white font-serif font-bold group-hover:text-amber-300">卷卷</span>
            <span class="text-[9px] text-emerald-100/40 font-mono mt-0.5">白米大温汪</span>
            <button onclick="likeExplorer('juanjuan', event)" class="mt-2 flex items-center gap-1 text-[9px] text-rose-300 font-mono bg-[#010c07] px-2 py-0.5 rounded-full border border-emerald-950/80">
              <span class="text-rose-500">❤️</span> <span id="exp-likes-juanjuan">88</span>
            </button>
          </div>

          <!-- Character 7: meiqiu -->
          <div onclick="selectExplorer('meiqiu')" class="explorer-card relative flex flex-col items-center group cursor-pointer select-none transition-all duration-300 rounded-2xl p-2 max-w-[110px] shrink-0 border border-transparent" id="exp-card-meiqiu">
            <div class="relative w-16 h-16 rounded-full shadow-lg overflow-hidden border-2 border-transparent group-hover:border-amber-500/50 transition-all duration-300" id="exp-avatar-meiqiu-box">
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="#090d16" stroke="#c28434" stroke-width="2" />
                <path d="M 28,75 Q 35,60 50,60 Q 65,60 72,75 Z" fill="#2d3748" />
                <path d="M 28,34 L 14,20 Q 22,25 32,34 Z" fill="#202631" />
                <path d="M 72,34 L 86,20 Q 78,25 68,34 Z" fill="#202631" />
                <path d="M 26,32 L 18,24 Q 22,27 28,32 Z" fill="#fed7d7" opacity="0.6" />
                <path d="M 74,32 L 82,24 Q 78,27 72,32 Z" fill="#fed7d7" opacity="0.6" />
                <circle cx="50" cy="45" r="19" fill="#202631" />
                <path d="M 31,48 L 24,45 L 31,43" stroke="#2a3241" stroke-width="3" fill="#202631" />
                <path d="M 69,48 L 76,45 L 69,43" stroke="#2a3241" stroke-width="3" fill="#202631" />
                <circle cx="42" cy="42" r="3.5" fill="#cbd5e0" />
                <circle cx="42" cy="42" r="2" fill="#111111" />
                <circle cx="43" cy="41" r="0.7" fill="#ffffff" />
                <circle cx="58" cy="42" r="3.5" fill="#cbd5e0" />
                <circle cx="58" cy="42" r="2" fill="#111111" />
                <circle cx="57" cy="41" r="0.7" fill="#ffffff" />
                <ellipse cx="50" cy="49" rx="6" ry="4.5" fill="#1a202c" />
                <polygon points="48,47 52,47 50,49.5" fill="#000000" />
                <path d="M 47,51 Q 50,62 53,51 Z" fill="#ff7f7f" />
                <line x1="50" y1="51" x2="50" y2="56" stroke="#e53e3e" stroke-width="1" />
                <path d="M 36,60 Q 50,65 64,60" stroke="#319795" stroke-width="3.5" fill="none" />
              </svg>
            </div>
            <span class="mt-2 text-xs text-white font-serif font-bold group-hover:text-amber-300">煤球</span>
            <span class="text-[9px] text-emerald-100/40 font-mono mt-0.5">小黑酷汪</span>
            <button onclick="likeExplorer('meiqiu', event)" class="mt-2 flex items-center gap-1 text-[9px] text-rose-300 font-mono bg-[#010c07] px-2 py-0.5 rounded-full border border-emerald-950/80">
              <span class="text-rose-500">❤️</span> <span id="exp-likes-meiqiu">99</span>
            </button>
          </div>

        </div>

        <!-- Speech Bubble detail box -->
        <div id="offline-speech-bubble-area">
          <div class="text-center py-4 text-[11px] text-emerald-100/30 font-serif italic border border-dashed border-emerald-950 rounded-2xl bg-[#020e09]/50">
            💡 戳上方的探险队员头像，查看他们的端午秘密留言与大合照密语...
          </div>
        </div>

      </div>
    </div>

    <div class="h-[1px] bg-gradient-to-r from-transparent via-amber-900/20 to-transparent"></div>

    <!-- Module 2: The Interactive Canal Trip Map -->
    <div id="section-canal" class="scroll-mt-20 space-y-6">
      <div class="text-center md:text-left">
        <span class="text-[#c28434] text-xs font-serif font-bold tracking-widest block uppercase">🌊 百里水域仙境</span>
        <h2 class="text-2xl font-serif text-white font-heavy mt-1">京杭大运河 · 沧州秀色之旅</h2>
        <p class="text-xs text-emerald-100/50 mt-1">点击下方水域古闸驿站，领略端午非遗美食的漕运起源 culture！</p>
      </div>

      <!-- Exquisite Top Canal Showcase Banner -->
      <div class="relative rounded-3xl overflow-hidden border border-amber-900/40 bg-gradient-to-r from-emerald-950 to-stone-900 h-64 shadow-2xl group mb-6">
        <!-- Backdrop Image -->
        <img
          src="${canalUrl}"
          alt="沧州大运河盛景"
          class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-[1.01] transition-transform duration-1000"
        />
        <!-- Overlays -->
        <div class="absolute inset-0 bg-gradient-to-t from-[#021810] via-black/40 to-black/10 mix-blend-multiply"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-[#062e1e]/80 via-transparent to-[#021810]/80"></div>
        <!-- Content -->
        <div class="absolute inset-x-6 bottom-6 z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div class="space-y-1.5 max-w-xl text-left">
            <div class="inline-flex items-center gap-1.5 text-[10px] text-[#ffd08f] font-serif bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-500/10">
              <span>⚓ 世界非物质文化遗产 · 京杭大运河沧州段</span>
            </div>
            <h3 class="text-xl md:text-2xl font-serif font-black text-[#ffd08f] select-none">
              一帆凌波越燕赵，百折沧桑汇古今
            </h3>
            <p class="text-[11px] text-white/95 leading-relaxed font-sans line-clamp-2">
              沧州定格大运河千古之魂，伴随龙舟惊涛拍岸，散发出淳厚的小枣甘甜。
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#021810] border border-emerald-950 rounded-3xl p-6 shadow-xl">
        
        <!-- Left half: Navigation Path -->
        <div class="lg:col-span-4 space-y-3" id="canal-station-list">
          <div onclick="selectStation(0)" class="canal-btn p-3.5 rounded-xl border border-amber-500/30 bg-[#c28434]/10 hover:bg-[#c28434]/15 cursor-pointer transition-colors" id="station-0">
            <h4 class="text-xs font-serif text-amber-300 font-bold flex items-center gap-2">
              <span>📍 1. 捷地古闸 (百载船闸)</span>
            </h4>
            <p class="text-[10px] text-emerald-100/50 mt-1">大运河南北漕运的咽喉重地，红枣挂满梢头。</p>
          </div>
          <div onclick="selectStation(1)" class="canal-btn p-3.5 rounded-xl border border-transparent hover:bg-emerald-950/40 cursor-pointer transition-colors" id="station-1">
            <h4 class="text-xs font-serif text-white font-bold flex items-center gap-2">
              <span>📍 2. 沧州铁狮古城 (沧县)</span>
            </h4>
            <p class="text-[10px] text-emerald-100/50 mt-1">镇海大铁狮守护千百年，市井铁锅鱼汤飘香。</p>
          </div>
          <div onclick="selectStation(2)" class="canal-btn p-3.5 rounded-xl border border-transparent hover:bg-emerald-950/40 cursor-pointer transition-colors" id="station-2">
            <h4 class="text-xs font-serif text-white font-bold flex items-center gap-2">
              <span>📍 3. 河间古驿 (商旅走廊)</span>
            </h4>
            <p class="text-[10px] text-emerald-100/50 mt-1">历代驿使飞马传书之重镇，驴火酥香入魂。</p>
          </div>
          <div onclick="selectStation(3)" class="canal-btn p-3.5 rounded-xl border border-transparent hover:bg-emerald-950/40 cursor-pointer transition-colors" id="station-3">
            <h4 class="text-xs font-serif text-white font-bold flex items-center gap-2">
              <span>📍 4. 献县古单桥 (水陆并用)</span>
            </h4>
            <p class="text-[10px] text-emerald-100/50 mt-1">石雕奇功堪称一绝，温醇大枣醇厚甜香。</p>
          </div>
        </div>

        <!-- Right half: Station Details Showroom -->
        <div class="lg:col-span-8 bg-[#010c08] border border-emerald-950 rounded-2xl p-6 min-h-[360px] flex flex-col justify-between" id="station-detail-box">
          
          <!-- Dynamic Station Image Showcase -->
          <div class="w-full h-36 md:h-48 rounded-xl overflow-hidden mb-4 border border-emerald-900/40 relative">
            <img id="station-img" src="https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&auto=format&fit=crop&q=80" alt="大运河风光图解" class="w-full h-full object-cover opacity-85 hover:scale-[1.02] transition-all duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <span class="absolute bottom-3 right-3 text-[10px] font-mono text-amber-300 bg-black/40 px-2 py-0.5 rounded border border-amber-500/10 backdrop-blur-sm">CANGZHOU CANAL MURAL 🎨</span>
          </div>

          <!-- Station Details dynamically populated by JS -->
          <div class="space-y-3 flex-1 flex flex-col justify-center font-serif">
            <div>
              <span class="text-[10px] bg-amber-500/10 border border-amber-500/20 text-[#ffd08f] px-2.5 py-1 rounded-full font-serif font-bold uppercase inline-block" id="station-tag">
                捷地三分水 · 枣香满河闸
              </span>
            </div>
            <h3 class="text-xl font-serif font-black text-amber-100" id="station-title">捷地古闸 · 水路咽喉</h3>
            <p class="text-xs text-emerald-100/70 leading-relaxed text-justify" id="station-desc">
              捷地减河古闸建于明嘉靖年间，是京杭运河沧州段宣泄山洪、引黄济运的咽喉重地并享誉全国。两岸沙土地肥沃潮湿，村镇世代种植绝冠全国的金丝小枣。端午时节，空气中弥漫着清甜 and 粽叶清香。
            </p>
          </div>

          <!-- Highlight Card -->
          <div class="bg-[#032014] border border-amber-900/10 p-3 rounded-xl mt-4 flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center text-lg shrink-0">🌾</div>
            <div>
              <span class="text-[10px] text-amber-500 font-serif font-bold">地标美食印记</span>
              <p class="text-xs text-emerald-100/80 font-serif font-semibold mt-0.5" id="station-food">金丝小枣大粽 (软糯黏糯、枣香十里)</p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Divider -->
    <div class="h-[1px] bg-gradient-to-r from-transparent via-amber-900/20 to-transparent"></div>

    <!-- Module 3: Gourmet Deluxe interactive atlas -->
    <div id="section-gourmet" class="scroll-mt-20 space-y-6">
      <div class="text-center md:text-left">
        <span class="text-amber-500 text-xs font-serif font-bold uppercase tracking-widest block">🍲 箸间沧州名宴</span>
        <h2 class="text-2xl font-serif text-white font-black mt-1">沧州传统美食风华录</h2>
        <p class="text-xs text-emerald-100/50 mt-1">汇聚历代河工与世家食客赞叹的地道老店珍馐！</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <!-- Gourmet 1 -->
        <div class="bg-[#031c11] border border-emerald-950 rounded-2xl p-4 space-y-3 hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between">
          <div class="space-y-2">
            <div class="w-full h-32 rounded-xl overflow-hidden border border-emerald-900/20">
              <img src="https://images.unsplash.com/photo-1626082896492-766af4fc6595?w=500&auto=format&fit=crop&q=80" alt="河间驴肉火烧" class="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500" />
            </div>
            <div class="flex justify-between items-start pt-1">
              <h4 class="text-sm font-serif font-bold text-amber-200">河间驴肉火烧 🥐</h4>
              <span class="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-serif font-bold">酥脆不凡</span>
            </div>
            <p class="text-[11px] text-emerald-100/60 leading-relaxed text-justify">
              二十几层面皮外酥里嫩，煎烤至红铜金黄色，夹入焖煮入味、肥而不腻的五香纯正纯驴肉，咬一口酥皮扑簌。
            </p>
          </div>
          <div class="pt-3 border-t border-emerald-900/30 text-[10px] text-amber-500/80 font-serif flex justify-between">
            <span>原产地: 河间府古县</span>
            <span class="font-bold">¥ 12 / 个</span>
          </div>
        </div>

        <!-- Gourmet 2 -->
        <div class="bg-[#031c11] border border-emerald-950 rounded-2xl p-4 space-y-3 hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between">
          <div class="space-y-2">
            <div class="w-full h-32 rounded-xl overflow-hidden border border-emerald-900/20">
              <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80" alt="沧州老牌火锅鸡" class="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500" />
            </div>
            <div class="flex justify-between items-start pt-1">
              <h4 class="text-sm font-serif font-bold text-amber-200">沧州老牌火锅鸡 🔥</h4>
              <span class="text-[9px] bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded-full font-serif font-bold">香辣沸腾</span>
            </div>
            <p class="text-[11px] text-emerald-100/60 leading-relaxed text-justify">
              肉质紧实的本地土鸡，佐以数十种名贵香料爆炒，放入红铜火锅中慢煲，麻辣鲜香、配合沧州老白醋享用更是一绝！
            </p>
          </div>
          <div class="pt-3 border-t border-[#043321] text-[10px] text-amber-500/80 font-serif flex justify-between">
            <span>原产地: 沧州市区老巷</span>
            <span class="font-bold">¥ 88 / 大锅</span>
          </div>
        </div>

        <!-- Gourmet 3 -->
        <div class="bg-[#031c11] border border-emerald-950 rounded-2xl p-4 space-y-3 hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between">
          <div class="space-y-2">
            <div class="w-full h-32 rounded-xl overflow-hidden border border-emerald-900/20">
              <img src="https://images.unsplash.com/photo-1547592180-85f173990554?w=500&auto=format&fit=crop&q=80" alt="老沧州羊肠汤" class="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500" />
            </div>
            <div class="flex justify-between items-start pt-1">
              <h4 class="text-sm font-serif font-bold text-amber-200">老沧州羊肠汤 🥣</h4>
              <span class="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-serif font-bold">市井图腾</span>
            </div>
            <p class="text-[11px] text-emerald-100/60 leading-relaxed text-justify">
              老火彻夜熬制出如牛奶般浓稠纯白的汤底，羊肠、羊肚爽滑肥嫩。热烟腾腾时撒入辣椒油，早市喝上一碗，暖胃提神。
            </p>
          </div>
          <div class="pt-3 border-t border-emerald-900/30 text-[10px] text-amber-500/80 font-serif flex justify-between">
            <span>原产地: 运河码头早市</span>
            <span class="font-bold">¥ 15 / 碗</span>
          </div>
        </div>

        <!-- Gourmet 4 -->
        <div class="bg-[#031c11] border border-emerald-950 rounded-2xl p-4 space-y-3 hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between">
          <div class="space-y-2">
            <div class="w-full h-32 rounded-xl overflow-hidden border border-emerald-900/20">
              <img src="${zongziUrl}" alt="金丝小枣大粽" class="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500" />
            </div>
            <div class="flex justify-between items-start pt-1">
              <h4 class="text-sm font-serif font-bold text-amber-200">金丝小枣大粽 🍬</h4>
              <span class="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-serif font-bold">拉丝甜糯</span>
            </div>
            <p class="text-[11px] text-emerald-100/60 leading-relaxed text-justify">
              宽阔箬竹叶包裹塞满金丝小枣的大米粽，出锅时热气弥漫。咬下一口，糯米中裹挟着粘稠拉丝的蜜枣，枣香满溢，甜彻心扉！
            </p>
          </div>
          <div class="pt-3 border-t border-emerald-900/30 text-[10px] text-amber-500/80 font-serif flex justify-between">
            <span>原产地: 沧南万亩枣林</span>
            <span class="font-bold">¥ 5 / 个</span>
          </div>
        </div>

      </div>
    </div>

    <!-- Divider -->
    <div class="h-[1px] bg-gradient-to-r from-transparent via-amber-900/20 to-transparent"></div>

    <!-- Module 4: Wrap Zongzi DIY interactive Workshop -->
    <div id="section-diy" class="scroll-mt-20 space-y-6">
      <div class="text-center md:text-left">
        <span class="text-amber-500 text-xs font-serif font-bold uppercase tracking-widest block">🥬 非遗指尖民俗</span>
        <h2 class="text-2xl font-serif text-white font-black mt-1">手工金枣粽手作工坊</h2>
        <p class="text-xs text-emerald-100/50 mt-1">选择地道原料，包一颗属于您的定制饱满粽子！</p>
      </div>

      <div class="bg-gradient-to-br from-[#021c12] to-[#000d07] border border-amber-900/20 rounded-3xl p-6 md:p-8 shadow-xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <!-- Interactive selector -->
          <div class="space-y-5">
            <div class="space-y-1">
              <h4 class="text-xs text-amber-200 font-serif font-bold">1. 选择饱满馅料</h4>
              <p class="text-[10px] text-emerald-100/40">搭配不同馅料有不同的端午降福寓意哦</p>
            </div>

            <div class="grid grid-cols-3 gap-2">
              <button onclick="selectIngredient('jinsizao', '金丝小枣 🍬', '端午吉星高照')" class="ing-btn p-3 bg-[#010a06] border border-amber-500 text-white rounded-xl text-xs font-serif text-center active:scale-95 transition-all" id="ing-jinsizao">
                <span class="block text-lg mb-1">🍬</span>
                <span>金丝小枣</span>
              </button>
              <button onclick="selectIngredient('dashaoshao', '沧州高梁 🌾', '学业事业步步高')" class="ing-btn p-3 bg-[#010a06] border border-transparent text-emerald-100/70 rounded-xl text-xs font-serif text-center active:scale-95 transition-all" id="ing-dashaoshao">
                <span class="block text-lg mb-1">🌾</span>
                <span>沧州高梁</span>
              </button>
              <button onclick="selectIngredient('xiangshou', '咸沙蛋黄 🍳', '财源广茂圆满')" class="ing-btn p-3 bg-[#010a06] border border-transparent text-emerald-100/70 rounded-xl text-xs font-serif text-center active:scale-95 transition-all" id="ing-xiangshou">
                <span class="block text-lg mb-1">🍳</span>
                <span>咸沙蛋黄</span>
              </button>
            </div>

            <!-- Greeting card custom note -->
            <div class="space-y-1.5">
              <label class="text-xs text-emerald-200/80 font-serif block">2. 撰写端午安康贺词 (将铭刻在粽子上)</label>
              <input type="text" id="zongzi-card-text" maxlength="15" placeholder="端午安康，合家欢乐！" class="w-full p-2.5 bg-[#010906] border border-amber-900/30 rounded-xl focus:border-amber-400 focus:outline-none text-xs text-white">
            </div>

            <button onclick="wrapZongzi()" class="w-full py-2.5 bg-gradient-to-r from-[#c28434] to-[#8c5213] text-white rounded-xl font-serif text-xs font-bold shadow-md hover:from-amber-400 hover:to-amber-600 transition-colors">
              🥬 紧扣箬叶 · 包好端午粽
            </button>
          </div>

          <!-- Live visualizer -->
          <div class="flex flex-col items-center justify-center p-6 bg-[#010e09] border border-emerald-950 rounded-2xl min-h-[220px] relative text-center">
            
            <!-- Dynamic representation of wrapped ZONGZI -->
            <div id="zongzi-visual" class="space-y-4">
              <span class="text-6xl animate-bounce inline-block">🍃</span>
              <p class="text-xs text-emerald-100/40">选择馅料并点击“包好端午粽”，在这获取您的非遗手作！</p>
            </div>

            <div id="zongzi-result" class="hidden space-y-3">
              <div class="relative w-28 h-28 mx-auto flex items-center justify-center">
                <!-- Golden glow circle -->
                <div class="absolute inset-0 rounded-full bg-amber-500/10 animate-ping"></div>
                <span class="text-7xl relative z-10 select-none">🍙</span>
              </div>
              <p class="text-xs font-serif font-black text-amber-300" id="result-title">【金丝小枣粽】包裹成功！</p>
              <p class="text-[10px] text-emerald-100/70 font-mono" id="result-gog">福运签词 🎋: 端午吉星高照</p>
              
              <!-- Tag info -->
              <div class="px-3 py-1.5 bg-[#103e2c] text-amber-200 rounded-lg text-[10px] font-serif border border-emerald-900 break-all" id="result-card">
                "端午安康，合家欢乐！"
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="h-[1px] bg-gradient-to-r from-transparent via-amber-900/20 to-transparent"></div>

    <!-- Module 5: Local Offline Guestbook -->
    <div id="section-guestbook" class="scroll-mt-20 bg-[#021810] border border-emerald-950 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
      <div>
        <span class="text-[#c28434] text-xs font-serif font-bold tracking-widest block uppercase">🖋️ 游客旅迹墨宝</span>
        <h2 class="text-2xl font-serif text-white font-heavy mt-1">离线本地旅行留言墙</h2>
        <p class="text-xs text-emerald-100/50 mt-1">即使没有网络，您的旅行感言与心愿也会牢牢保存在这台电脑/浏览器上 💾</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Leave feedback -->
        <div class="lg:col-span-5 bg-[#010e09] border border-emerald-950 p-5 rounded-2xl space-y-4">
          <h3 class="text-sm font-serif text-amber-200 font-bold border-b border-emerald-900/40 pb-2">写下您的心情印记</h3>
          
          <div class="space-y-3">
            <div class="space-y-1">
              <label class="text-[10px] text-emerald-200/80 font-serif block">用户昵称</label>
              <input type="text" id="offline-name" placeholder="阿秋 / 旅航者" class="w-full p-2.5 bg-[#010906] border border-amber-900/20 rounded-xl focus:border-amber-400 focus:outline-none text-xs text-white">
            </div>

            <div class="space-y-1">
              <label class="text-[10px] text-emerald-200/80 font-serif block">留言内容</label>
              <textarea id="offline-msg" rows="3" placeholder="端午来沧州老街，吃了纯驴肉火烧，真的惊叹外壳如此之酥！期待端午会面！" class="w-full p-2.5 bg-[#010906] border border-amber-900/20 rounded-xl focus:border-amber-400 focus:outline-none text-xs text-white resize-none"></textarea>
            </div>

            <button onclick="postOfflineComment()" class="w-full py-2 bg-gradient-to-r from-[#c28434] to-[#8c5213] text-white rounded-xl text-xs font-serif font-bold hover:from-amber-400 active:scale-95 transition-all">
              📬 发布我的古街印记
            </button>
          </div>
        </div>

        <!-- Scrollable messages container -->
        <div class="lg:col-span-7 space-y-3.5 max-h-[380px] overflow-y-auto pr-2" id="offline-comments-wall">
          <!-- Populated by JS -->
        </div>

      </div>
    </div>

  </main>

  <footer class="border-t border-amber-900/20 bg-[#000805] py-8 text-center text-xs text-emerald-100/40 space-y-3 mt-auto">
    <div class="flex justify-center items-center gap-2 text-amber-600 font-serif text-[11px]">
      <span>🥬 裹福常安</span>
      <span>•</span>
      <span>🌊 长流不息</span>
    </div>
    <p>&copy; 2026 端午沧州美食行文旅特献 · 离线珍藏单文件。端午大运河风轻水阔，愿君常安康。</p>
  </footer>

  <!-- CORE INTERACTIVE LOGIC SCRIPT -->
  <script>
    // Explorers Crew (人物集结令) offline script
    const EXPLORERS = {
      aqiu: {
        name: '阿秋',
        role: '美食先锋',
        quote: '运河的风带着微甜的麦香和大枣的香气，和大家一起出游真是太棒了！我已经标好了路线，直接出发吧！🎒👋',
        svg: '<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="50" r="45" fill="#132a1e" stroke="#c28434" stroke-width="2" /><path d="M 35,40 Q 50,15 65,40" fill="#1c1c1c" /><circle cx="70" cy="35" r="10" fill="#1c1c1c" /><circle cx="50" cy="46" r="22" fill="#ffd8c2" /><path d="M 28,40 Q 50,22 72,40 Q 65,30 50,32 Q 35,30 28,40 Z" fill="#1c1c1c" /><ellipse cx="42" cy="44" r="2.5" rx="1.5" ry="3" fill="#1c1c1c" /><ellipse cx="58" cy="44" r="2.5" rx="1.5" ry="3" fill="#1c1c1c" /><path d="M 40,41 Q 42,39 44,41" stroke="#1c1c1c" stroke-width="1" fill="none" /><path d="M 56,41 Q 58,39 60,41" stroke="#1c1c1c" stroke-width="1" fill="none" /><circle cx="37" cy="50" r="3" fill="#ff7f7f" opacity="0.6" /><circle cx="63" cy="50" r="3" fill="#ff7f7f" opacity="0.6" /><path d="M 44,53 Q 50,58 56,53" stroke="#aa3333" stroke-width="2.5" fill="none" stroke-linecap="round" /><path d="M 75,60 Q 82,45 80,40" stroke="#ffd8c2" stroke-width="5" fill="none" stroke-linecap="round" /><path d="M 80,40 Q 78,36 75,40" stroke="#ffd8c2" stroke-width="2" fill="none" /><path d="M 25,75 C 25,65 30,58 50,58 C 70,58 75,65 75,75 Z" fill="#2d3748" /><path d="M 32,58 Q 36,68 40,75" stroke="#3182ce" stroke-width="4.5" fill="none" /><path d="M 44,58 L 50,64 L 56,58" stroke="#ffffff" stroke-width="2" fill="none" /></svg>'
      },
      chaoge: {
        name: '潮哥',
        role: '驴火鉴赏官',
        quote: '墨镜必不可少，红卫卫衣一穿。沧州的河间驴肉火烧，那可是舌尖上的绝绝子，必须趁热吃满口香！🕶️🥐',
        svg: '<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="50" r="45" fill="#2b0d0d" stroke="#c28434" stroke-width="2" /><circle cx="50" cy="46" r="21" fill="#ffdfcb" /><path d="M 28,34 Q 50,15 72,34 C 68,26 62,24 50,26 C 38,24 32,26 28,34 Z" fill="#1a1a1a" /><rect x="34" y="38" width="14" height="9" rx="3" fill="#111" stroke="#ffd700" stroke-width="1" /><rect x="52" y="38" width="14" height="9" rx="3" fill="#111" stroke="#ffd700" stroke-width="1" /><line x1="48" y1="41" x2="52" y2="41" stroke="#ffd700" stroke-width="2" /><path d="M 45,54 Q 50,59 55,54" stroke="#8a2222" stroke-width="3" fill="none" stroke-linecap="round" /><path d="M 23,75 Q 23,58 50,58 Q 77,58 77,75 Z" fill="#c53030" /><path d="M 44,58 L 50,65 L 56,58" fill="#4a5568" /><line x1="45" y1="62" x2="45" y2="72" stroke="#ffffff" stroke-width="1.5" /><line x1="55" y1="62" x2="55" y2="72" stroke="#ffffff" stroke-width="1.5" /><circle cx="34" cy="52" r="1.5" fill="#ffd700" /></svg>'
      },
      nuomi: {
        name: '小糯米',
        role: '红枣品鉴家',
        quote: '英妈妈！快看，咱们一起比个大爱心！❤️ 我要吃金丝小枣大粽子，里面有很多甜糯糯的小红枣哦！🌾🍬',
        svg: '<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="50" r="45" fill="#301524" stroke="#c28434" stroke-width="2" /><circle cx="28" cy="26" r="11" fill="#2d1e25" /><circle cx="72" cy="26" r="11" fill="#2d1e25" /><circle cx="50" cy="48" r="22" fill="#ffece0" /><path d="M 26,45 Q 50,30 74,45 Q 70,36 50,38 Q 30,36 26,45 Z" fill="#2d1e25" /><circle cx="41" cy="46" r="3" fill="#111111" /><circle cx="42" cy="45" r="1" fill="#ffffff" /><circle cx="59" cy="46" r="3" fill="#111111" /><circle cx="60" cy="45" r="1" fill="#ffffff" /><circle cx="35" cy="53" r="5" fill="#ffa0a0" opacity="0.8" /><circle cx="65" cy="53" r="5" fill="#ffa0a0" opacity="0.8" /><path d="M 46,55 Q 50,60 54,55" stroke="#d53f8c" stroke-width="2.5" fill="none" stroke-linecap="round" /><path d="M 25,75 C 25,65 32,60 50,60 C 68,60 75,65 75,75 Z" fill="#eb4899" /><path d="M 38,60 Q 44,65 50,60 Q 56,65 62,60" stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round" /><path d="M 28,75 Q 18,63 26,58" stroke="#eb4899" stroke-width="7" fill="none" stroke-linecap="round" /><circle cx="26" cy="58" r="3.5" fill="#ffece0" /></svg>'
      },
      wenai: {
        name: '温阿姨',
        role: '风光护航者',
        quote: '听着大运河号子，看着孩子们比划爱心，端午佳节，能与亲人共赏沧州水陆美景就是莫大安慰。🍵🍃',
        svg: '<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="50" r="45" fill="#0c1d15" stroke="#c28434" stroke-width="2" /><path d="M 25,44 C 25,20 75,20 75,44 Z" fill="#2d302d" /><circle cx="50" cy="47" r="21" fill="#ffe0ce" /><path d="M 27,41 Q 50,28 73,41" stroke="#2d302d" stroke-width="5" fill="none" /><path d="M 38,46 Q 42,42 45,45" stroke="#222" stroke-width="2.5" fill="none" stroke-linecap="round" /><path d="M 55,46 Q 58,42 62,45" stroke="#222" stroke-width="2.5" fill="none" stroke-linecap="round" /><path d="M 44,53 Q 50,57 56,53" stroke="#9b2c2c" stroke-width="2" fill="none" stroke-linecap="round" /><ellipse cx="36" cy="50" rx="3.5" ry="2" fill="#e53e3e" opacity="0.4" /><ellipse cx="64" cy="50" rx="3.5" ry="2" fill="#e53e3e" opacity="0.4" /><path d="M 24,75 C 24,65 30,59 50,59 C 70,59 76,65 76,75 Z" fill="#4a5d4e" /><path d="M 44,59 L 50,64 L 56,59" fill="#ecc94b" /><path d="M 72,75 Q 82,63 74,58" stroke="#4a5d4e" stroke-width="7" fill="none" stroke-linecap="round" /><circle cx="74" cy="58" r="3.5" fill="#ffe0ce" /></svg>'
      },
      daliang: {
        name: '大亮',
        role: '热血领队',
        quote: '沧州铁狮子，威风凛凛！吃货团集合，热辣火锅鸡上桌！香辣过瘾，大家端午都开心！🍻🔥',
        svg: '<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="50" r="45" fill="#111f2d" stroke="#c28434" stroke-width="2" /><circle cx="50" cy="46" r="21" fill="#ffdcb9" /><path d="M 28,34 Q 50,10 72,34 M 32,32 L 35,22 L 40,26 L 45,18 L 50,24 L 55,18 L 60,26 L 65,22 L 68,32" stroke="#1d2731" stroke-width="4" fill="#1d2731" stroke-linejoin="round" /><ellipse cx="41" cy="45" rx="2" ry="3" fill="#1d2731" /><ellipse cx="59" cy="45" rx="2" ry="3" fill="#1d2731" /><path d="M 37,39 Q 41,36 44,39" stroke="#1d2731" stroke-width="2" fill="none" /><path d="M 43,52 Q 50,58 57,52" fill="#fff" /><path d="M 43,52 Q 50,58 57,52 Z" stroke="#1d2731" stroke-width="2" fill="none" /><path d="M 23,75 C 23,65 30,58 50,58 C 70,58 77,65 77,75 Z" fill="#1a202c" />
                <line x1="50" y1="58" x2="50" y2="75" stroke="#cbd5e0" stroke-width="2.5" /><path d="M 76,68 L 86,46 L 80,41" stroke="#1a202c" stroke-width="7.5" fill="none" stroke-linecap="round" /><circle cx="80" cy="41" r="4.5" fill="#ffdcb9" /></svg>'
      },
      juanjuan: {
        name: '卷卷',
        role: '白米大温汪',
        quote: '汪汪！我是卷卷，大白扑克脸！我有一身软乎乎的奶油色大卷毛，穿着帅气的蓝色运动小背心和红色小铃铛！跑起来威风得很！🐶🐾',
        svg: '<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="50" r="45" fill="#101525" stroke="#c28434" stroke-width="2" /><path d="M 28,75 Q 35,60 50,60 Q 65,60 72,75 Z" fill="#e2e8f0" /><path d="M 30,75 C 33,63 40,64 50,64 C 60,64 67,63 70,75 Z" fill="#3182ce" /><path d="M 50,64 V 75" stroke="#f6e05e" stroke-width="2" /><path d="M 26,35 C 20,40 20,62 30,62 C 34,62 34,45 32,38 Z" fill="#faf6f0" /><path d="M 74,35 C 80,40 80,62 70,62 C 66,62 66,45 68,38 Z" fill="#faf6f0" /><circle cx="50" cy="42" r="21" fill="#faf6f0" /><circle cx="40" cy="30" r="7" fill="#faf6f0" /><circle cx="60" cy="30" r="7" fill="#faf6f0" /><circle cx="50" cy="28" r="7" fill="#faf6f0" /><circle cx="43" cy="42" r="3.5" fill="#4a3728" /><circle cx="44" cy="41" r="1" fill="#fff" /><circle cx="57" cy="42" r="3.5" fill="#4a3728" /><circle cx="56" cy="41" r="1" fill="#fff" /><ellipse cx="50" cy="49" rx="7.5" ry="5.5" fill="#f4eae1" /><polygon points="47,47 53,47 50,51" fill="#111111" /><path d="M 48,51 Q 50,53 52,51" stroke="#111" stroke-width="1.5" fill="none" /><path d="M 38,62 Q 50,66 62,62" stroke="#e53e3e" stroke-width="3" fill="none" /><circle cx="50" cy="65" r="3" fill="#f6e05e" stroke="#c53030" stroke-width="0.5" /></svg>'
      },
      meiqiu: {
        name: '煤球',
        role: '小黑酷汪',
        quote: '汪！我是煤球，超级帅的黑毛小酷汪！两只耳朵翘得高高的，总是笑眯眯吐舌头！跑起来就像一阵风！冲呀！⚡👅',
        svg: '<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="50" r="45" fill="#090d16" stroke="#c28434" stroke-width="2" /><path d="M 28,75 Q 35,60 50,60 Q 65,60 72,75 Z" fill="#2d3748" /><path d="M 28,34 L 14,20 Q 22,25 32,34 Z" fill="#202631" /><path d="M 72,34 L 86,20 Q 78,25 68,34 Z" fill="#202631" /><path d="M 26,32 L 18,24 Q 22,27 28,32 Z" fill="#fed7d7" opacity="0.6" /><path d="M 74,32 L 82,24 Q 78,27 72,32 Z" fill="#fed7d7" opacity="0.6" /><circle cx="50" cy="45" r="19" fill="#202631" /><path d="M 31,48 L 24,45 L 31,43" stroke="#2a3241" stroke-width="3" fill="#202631" /><path d="M 69,48 L 76,45 L 69,43" stroke="#2a3241" stroke-width="3" fill="#202631" /><circle cx="42" cy="42" r="3.5" fill="#cbd5e0" /><circle cx="42" cy="42" r="2" fill="#111111" /><circle cx="43" cy="41" r="0.7" fill="#ffffff" /><circle cx="58" cy="42" r="3.5" fill="#cbd5e0" /><circle cx="58" cy="42" r="2" fill="#111111" /><circle cx="57" cy="41" r="0.7" fill="#ffffff" /><ellipse cx="50" cy="49" rx="6" ry="4.5" fill="#1a202c" /><polygon points="48,47 52,47 50,49.5" fill="#000000" /><path d="M 47,51 Q 50,62 53,51 Z" fill="#ff7f7f" /><line x1="50" y1="51" x2="50" y2="56" stroke="#e53e3e" stroke-width="1" /><path d="M 36,60 Q 50,65 64,60" stroke="#319795" stroke-width="3.5" fill="none" /></svg>'
      }
    };

    let activeExplorerId = null;

    function selectExplorer(id) {
      const cards = document.getElementsByClassName("explorer-card");
      for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("bg-[#c28434]/15", "scale-105", "border-[#c28434]/40");
        cards[i].classList.add("border-transparent");
      }

      if (activeExplorerId === id) {
        // Toggle off
        activeExplorerId = null;
        document.getElementById("offline-speech-bubble-area").innerHTML = \`
          <div class="text-center py-4 text-[11px] text-emerald-100/30 font-serif italic border border-dashed border-emerald-950 rounded-2xl bg-[#020e09]/50">
            💡 戳上方的探险队员头像，查看他们的端午秘密留言与大合照密语...
          </div>
        \`;
        return;
      }

      // Toggle on
      activeExplorerId = id;
      document.getElementById("exp-card-" + id).classList.add("bg-[#c28434]/15", "scale-105", "border-[#c28434]/40");
      document.getElementById("exp-card-" + id).classList.remove("border-transparent");

      const exp = EXPLORERS[id];
      const bubbleArea = document.getElementById("offline-speech-bubble-area");

      bubbleArea.innerHTML = \`
        <div class="relative p-5 rounded-2xl border bg-[#052013] border-amber-900/40 flex flex-col md:flex-row gap-4 items-center shadow-xl">
          <div class="absolute top-[-8px] left-[15%] md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#052013] border-t border-l border-amber-900/40 rotate-45"></div>

          <div class="w-14 h-14 rounded-full border-2 border-[#c28434]/40 shrink-0 overflow-hidden bg-[#021810]">
            \${exp.svg}
          </div>

          <div class="flex-1 text-center md:text-left space-y-1">
            <div class="flex items-center justify-center md:justify-start gap-2">
              <span class="font-serif text-amber-300 font-bold text-sm">\${exp.name}</span>
              <span class="text-[10px] bg-[#c28434]/20 border border-[#c28434]/30 px-2 py-0.5 rounded-full font-mono text-amber-500">\${exp.role}</span>
            </div>
            <p class="text-xs text-emerald-100/90 leading-relaxed font-serif text-left">
              “ \${exp.quote} ”
            </p>
          </div>

          <button onclick="likeExplorer('\${id}', event)" class="px-3.5 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-300 font-serif font-bold text-[11px] active:scale-95 transition-all flex items-center gap-1 shrink-0">
            <span class="text-rose-500">❤️</span>
            <span>为TA点赞祝福 !</span>
          </button>
        </div>
      \`;
    }

    function likeExplorer(id, event) {
      if (event) {
        event.stopPropagation();
      }
      const likesElem = document.getElementById("exp-likes-" + id);
      if (likesElem) {
        let currentLikes = parseInt(likesElem.innerText) || 0;
        likesElem.innerText = currentLikes + 1;
      }
    }

    // System Target Date
    // Note: Month is 0-indexed in JS (5 = June)
    const targetDate = new Date(2026, 5, 18, 17, 0, 0).getTime();
    
    // Update offline countdown clock
    function updateClock() {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance < 0) {
        document.getElementById("timer-days").innerText = "00";
        document.getElementById("timer-hours").innerText = "00";
        document.getElementById("timer-mins").innerText = "00";
        document.getElementById("timer-secs").innerText = "00";
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((distance % (1000 * 60)) / 1000);
      
      document.getElementById("timer-days").innerText = days.toString().padStart(2, '0');
      document.getElementById("timer-hours").innerText = hours.toString().padStart(2, '0');
      document.getElementById("timer-mins").innerText = mins.toString().padStart(2, '0');
      document.getElementById("timer-secs").innerText = secs.toString().padStart(2, '0');
    }
    
    setInterval(updateClock, 1000);
    updateClock();

    // Sand Hourglass Toggle
    let isHourglassFlipped = false;
    function toggleHourglass() {
      isHourglassFlipped = !isHourglassFlipped;
      const upper = document.getElementById("hourglass-upper");
      const lower = document.getElementById("hourglass-lower");
      
      if (isHourglassFlipped) {
        upper.style.transform = "scaleY(0.4)";
        lower.style.transform = "scaleY(1.3)";
      } else {
        upper.style.transform = "scaleY(1)";
        lower.style.transform = "scaleY(0.4)";
      }
      upper.style.transition = "transform 1.2s ease-in-out";
      lower.style.transition = "transform 1.2s ease-in-out";
    }

    // Canal Navigation Map database
    const STATIONS = [
      {
        tag: "捷地三分水 · 枣香满河闸",
        title: "捷地古闸 · 水路咽喉",
        desc: "捷地减河古闸建于明嘉靖年间，是京杭运河沧州段宣泄山洪、引黄济运的咽喉重地。两岸沙土地肥沃潮湿，两岸村镇传统上盛产绝名天下的金丝小枣。端午时节，运河流水潺潺，空气中弥漫着煮枣和粽叶的缕缕清香。",
        food: "金丝小枣大粽 (软糯黏糯、枣香十里)"
      },
      {
        tag: "铁狮雄风 · 古城千年气派",
        title: "沧州铁狮古城 · 历史地标",
        desc: "沧县大铁狮子铸于五代后周，经历千百年风雨磨砺依然威严不屈。靠山吃山、靠水吃水，在这里有最地道的大运河炖鲜鱼，与香气浓郁的市井火锅鸡老铺，凝聚了燕赵好汉豪迈磊落、义薄云天的江湖性格。",
        food: "沧州大锅炖河鱼 / 秘制土鸡盘 (热辣滚大)"
      },
      {
        tag: "千骑传书 · 驿路飘溢酥火",
        title: "河间古驿 · 漕运商轴",
        desc: "河间府自古是南北大动脉的商帮、官使必经落脚点，汇聚四海行商，由此诞生了名垂华夏最便携的干粮——河间排刀火烧。漕运河班们揣着微温的驴火，吃下酥脆，一日行舟百里不在话下。",
        food: "五香脆层驴肉火烧 (层层酥脆、鲜嫩流汁)"
      },
      {
        tag: "古桥巍峨 · 运河温词长留",
        title: "献县单桥 · 水陆奇丽",
        desc: "献县单桥属于世界罕见的全石古石梁桥，历代石匠在石雕桥栏上刻下生动的猛兽瑞云图案。过往漕商常在一旁的茶铺喝上一碗热汤，并以沧南运来的香糯熟熟金枣，佐茶赏月，闲情悠游。",
        food: "温润蒸熟金丝红枣 (富含金线、甜汁醇厚)"
      }
    ];

    function selectStation(index) {
      // Toggle button states
      const btns = document.getElementsByClassName("canal-btn");
      for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove("border-amber-500/30", "bg-[#c28434]/10");
        btns[i].classList.add("border-transparent");
        btns[i].querySelector("h4").classList.remove("text-amber-300");
        btns[i].querySelector("h4").classList.add("text-white");
      }
      
      const activeBtn = document.getElementById("station-" + index);
      activeBtn.classList.remove("border-transparent");
      activeBtn.classList.add("border-amber-500/30", "bg-[#c28434]/10");
      activeBtn.querySelector("h4").classList.remove("text-white");
      activeBtn.querySelector("h4").classList.add("text-amber-300");

      // Update showroom
      const station = STATIONS[index];
      document.getElementById("station-tag").innerText = station.tag;
      document.getElementById("station-title").innerText = station.title;
      document.getElementById("station-desc").innerText = station.desc;
      document.getElementById("station-food").innerText = station.food;
    }

    // Zongzi wrapper recipe and interaction
    let selectedIng = {
      key: "jinsizao",
      name: "金丝小枣 🍬",
      wish: "端午吉星高照"
    };

    function selectIngredient(key, name, wish) {
      selectedIng = { key, name, wish };
      const buttons = document.getElementsByClassName("ing-btn");
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("border-amber-500", "text-white");
        buttons[i].classList.add("border-transparent", "text-emerald-100/70");
      }
      document.getElementById("ing-" + key).classList.add("border-amber-500", "text-white");
      document.getElementById("ing-" + key).classList.remove("border-transparent", "text-emerald-100/70");
    }

    function wrapZongzi() {
      // Hide visualizer, show result
      document.getElementById("zongzi-visual").classList.add("hidden");
      const res = document.getElementById("zongzi-result");
      res.classList.remove("hidden");
      
      const text = document.getElementById("zongzi-card-text").value.trim() || "端午安康，合家欢聚！";
      
      document.getElementById("result-title").innerText = "【" + selectedIng.name.split(" ")[0] + "大米粽】包裹成功！";
      document.getElementById("result-gog").innerText = "福运签词 🎋: " + selectedIng.wish;
      document.getElementById("result-card").innerText = '"' + text + '"';
    }

    // Local Storage Comment Engine for offline file persistence
    let comments = [
      {
        id: "of-1",
        name: "阿秋",
        msg: "端午假期前大运河水好清澈，我已经约好小糯米他们啦，期待在沧州捷地古石坝开吃第一颗金丝小枣粽！🎋🍙",
        date: "2026-06-14 18:24"
      },
      {
        id: "of-2",
        name: "大亮",
        msg: "我已经洗好大铜火锅了，到时候火锅鸡底热烈滚烫，大呼辣爽，再夹几个红亮的小甜枣解麻！大运河端午不见不散！🔥🍻",
        date: "2026-06-15 15:40"
      }
    ];

    function saveComments() {
      localStorage.setItem("cangzhou_offline_comments_v1", JSON.stringify(comments));
    }

    function loadComments() {
      const stored = localStorage.getItem("cangzhou_offline_comments_v1");
      if (stored) {
        try {
          comments = JSON.parse(stored);
        } catch (e) {}
      }
      renderComments();
    }

    function renderComments() {
      const parent = document.getElementById("offline-comments-wall");
      parent.innerHTML = "";
      
      comments.forEach(c => {
        const item = document.createElement("div");
        item.className = "bg-[#010906] px-4 py-3 rounded-xl border border-emerald-950 space-y-2";
        
        item.innerHTML = \`
          <div class="flex justify-between items-center text-[10px]">
            <span class="font-serif font-bold text-amber-200">\${escapeHTML(c.name)}</span>
            <span class="text-emerald-100/30 font-mono">\${c.date}</span>
          </div>
          <p class="text-[11px] text-emerald-100/80 leading-relaxed font-sans">\${escapeHTML(c.msg)}</p>
        \`;
        parent.appendChild(item);
      });
    }

    function postOfflineComment() {
      const name = document.getElementById("offline-name").value.trim();
      const msg = document.getElementById("offline-msg").value.trim();
      
      if (!name || !msg) {
        alert("请输入发表人姓名与印记感言哦！");
        return;
      }
      
      const now = new Date();
      const dateStr = now.getFullYear() + "-" + 
                      ((now.getMonth()+1).toString().padStart(2, '0')) + "-" + 
                      (now.getDate().toString().padStart(2, '0')) + " " + 
                      (now.getHours().toString().padStart(2, '0')) + ":" + 
                      (now.getMinutes().toString().padStart(2, '0'));
                      
      const newComment = {
        id: "of-" + Date.now(),
        name,
        msg,
        date: dateStr
      };
      
      comments.unshift(newComment);
      saveComments();
      renderComments();
      
      // Clear inputs
      document.getElementById("offline-name").value = "";
      document.getElementById("offline-msg").value = "";
    }

    function escapeHTML(str) {
      return str.replace(/[&<>'"]/g, 
        tag => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
        }[tag] || tag)
      );
    }

    // Initialize Page Comments
    window.onload = function() {
      loadComments();
    };
  </script>

</body>
</html>`;

  // Create real data-URI trigger for seamless user downloads in-browser
  const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "端午沧州美食行_免安装交互珍藏版.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
