/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Leaf, Gift, Check, Flame, Share2, Award, RefreshCw } from "lucide-react";

interface ZongziMakerProps {
  onWrappedSuccess?: () => void;
}

export default function ZongziMaker({ onWrappedSuccess }: ZongziMakerProps) {
  // Game states: 'select-leaf' | 'select-fillings' | 'wrapping' | 'steaming' | 'done'
  const [gameState, setGameState] = useState<'select-leaf' | 'select-fillings' | 'wrapping' | 'steaming' | 'done'>('select-leaf');
  
  const [selectedLeaf, setSelectedLeaf] = useState<string>("fresh-bamboo");
  const [selectedFillings, setSelectedFillings] = useState<string[]>(["jujube"]); // Default start with golden silk jujube
  const [steamTimeSeconds, setSteamTimeSeconds] = useState<number>(3);
  const [blessingTarget, setBlessingTarget] = useState<string>("");
  const [blessingCardGenerated, setBlessingCardGenerated] = useState<boolean>(false);

  const leaves = [
    { id: "fresh-bamboo", name: "清香新鲜苇叶", desc: "采自南运河湿地，青翠欲滴，自带天然草本清香", color: "bg-emerald-800" },
    { id: "dry-bamboo", name: "传统山中箬竹叶", desc: "皮薄坚韧，盛水不漏，熬煮后醇厚香气悠长", color: "bg-emerald-950" }
  ];

  const fillings = [
    { id: "jujube", name: "沧州特产金丝小枣", desc: "拉丝金黄、甜入骨髓，端午枣粽的至高尊神", isLocal: true },
    { id: "egg-yolk", name: "运河滩涂咸鸭蛋黄", desc: "红润流油，咸香软糯，与糯米完美沙沙融合", isLocal: false },
    { id: "bean-paste", name: "传统手捣红豆沙", desc: "绵软细腻，微甜不腻，老少皆宜的经典素配", isLocal: false },
    { id: "marinated-pork", name: "黑猪鲜嫩酱香五花", desc: "肥瘦相间，油香浸透白糯，豪迈扎实北国味道", isLocal: true }
  ];

  const handleToggleFilling = (id: string) => {
    if (selectedFillings.includes(id)) {
      if (selectedFillings.length > 1) {
        setSelectedFillings(prev => prev.filter(f => f !== id));
      }
    } else {
      if (selectedFillings.length < 3) {
        setSelectedFillings(prev => [...prev, id]);
      }
    }
  };

  const startWrapping = () => {
    setGameState('wrapping');
    setTimeout(() => {
      setGameState('steaming');
      // Set interval mockup for steaming
      let t = 3;
      const interval = setInterval(() => {
        t -= 1;
        setSteamTimeSeconds(t);
        if (t <= 0) {
          clearInterval(interval);
          setGameState('done');
          if (onWrappedSuccess) {
            onWrappedSuccess();
          }
        }
      }, 1000);
    }, 2000);
  };

  const handleReset = () => {
    setGameState('select-leaf');
    setSelectedFillings(["jujube"]);
    setBlessingTarget("");
    setBlessingCardGenerated(false);
    setSteamTimeSeconds(3);
  };

  const getBlessingQuote = () => {
    const primaryFilling = fillings.find(f => f.id === selectedFillings[0])?.name || "金丝小枣";
    return `大运河水汤汤，苇叶清香，包裹着【${primaryFilling}】的甜蜜，祝您端午安康！愿您日子如沧州金丝甜枣般甜美红火，运势深沉如运河之流长，豪迈似塞外铁狮！`;
  };

  return (
    <div id="zongzi-interactive-maker" className="bg-[#05281a]/40 border border-amber-900/30 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
      
      {/* Ancient Copper Design Header */}
      <div className="flex items-center justify-between border-b border-amber-900/20 pb-4">
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-emerald-400" />
          <h3 className="text-xl font-serif text-[#ffd08f] font-bold">
            指尖传情 · 端午枣粽 DIY 堂
          </h3>
        </div>
        <span className="text-[10px] text-amber-500 font-serif border border-amber-900/50 bg-[#c28434]/10 py-1 px-2.5 rounded">
          运河码头 · 传统手工体验
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[360px]">
        
        {/* Left Side: Interactivity Area */}
        <div className="lg:col-span-7 space-y-5">
          <AnimatePresence mode="wait">
            
            {/* Step 1: SELECT LEAF */}
            {gameState === 'select-leaf' && (
              <motion.div
                key="select-leaf-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <span className="text-amber-500 text-[10px] uppercase font-mono tracking-wider font-bold">第一步 · 择叶奠基</span>
                  <h4 className="text-base text-white font-serif">选择包粽子的箬箬竹箬</h4>
                  <p className="text-xs text-emerald-100/50">箬竹箬是承载白白糯米的基础，也是清香的关键。采自运河的叶片最为尊贵。</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {leaves.map((l) => {
                    const isSelected = selectedLeaf === l.id;
                    return (
                      <div
                        key={l.id}
                        onClick={() => setSelectedLeaf(l.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between h-28 ${
                          isSelected 
                            ? "bg-gradient-to-br from-[#103e2c] to-[#041d13] border-[#c28434] text-white" 
                            : "bg-[#062418]/60 border-amber-950/20 text-emerald-100/60 hover:bg-[#062418] hover:border-amber-900/40"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-serif font-bold text-sm tracking-wide">{l.name}</span>
                          {isSelected && <span className="p-0.5 rounded-full bg-amber-500 text-amber-950"><Check className="w-3.5 h-3.5" /></span>}
                        </div>
                        <p className="text-[10px] text-emerald-100/40 line-clamp-2 leading-relaxed mt-2">{l.desc}</p>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => setGameState('select-fillings')}
                  className="w-full mt-2 py-3 bg-gradient-to-r from-[#c28434] to-[#8c5213] hover:from-[#d4af37] text-white font-serif text-sm font-bold rounded-xl shadow-lg hover:shadow-amber-500/10 active:scale-98 transition-all"
                >
                  包裹饱满白糯米，下一步 ➔
                </button>
              </motion.div>
            )}

            {/* Step 2: SELECT FILLINGS */}
            {gameState === 'select-fillings' && (
              <motion.div
                key="select-fillings-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <span className="text-amber-500 text-[10px] uppercase font-mono tracking-wider font-bold">第二步 · 填筑灵魂</span>
                  <div className="flex items-center justify-between">
                    <h4 className="text-base text-white font-serif">选择特制填心 (可多选，限3种)</h4>
                    <span className="text-[10px] text-[#ffd08f] font-mono leading-none">已选: {selectedFillings.length}/3</span>
                  </div>
                  <p className="text-xs text-emerald-100/50">沧州尤克红小枣是重中之重，让甜丝拉扯千年；您也可加入蛋黄或酱香肥肉丰富滋味。</p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {fillings.map((f) => {
                    const isSelected = selectedFillings.includes(f.id);
                    return (
                      <div
                        key={f.id}
                        onClick={() => handleToggleFilling(f.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 relative ${
                          isSelected 
                            ? "bg-gradient-to-br from-[#103e2c] to-[#041d13] border-[#c28434] text-white" 
                            : "bg-[#062418]/50 border-amber-950/20 text-emerald-100/60 hover:bg-[#062418] hover:border-amber-900/30"
                        }`}
                      >
                        <div className="flex justify-between items-center gap-1">
                          <span className="font-serif font-bold text-xs truncate">{f.name}</span>
                          {f.isLocal && <span className="text-[8px] bg-[#c28434]/20 text-[#ffd08f] border border-[#c28434]/40 px-1 rounded transform scale-90">沧州味</span>}
                        </div>
                        <p className="text-[9px] text-emerald-100/30 line-clamp-2 leading-tight mt-1">{f.desc}</p>
                        
                        {isSelected && (
                          <div className="absolute right-1 bottom-1 w-3 h-3 rounded-full bg-[#c28434] flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Navigation actions */}
                <div className="flex gap-2.5 pt-2">
                  <button
                    onClick={() => setGameState('select-leaf')}
                    className="w-1/3 py-2 border border-amber-900/40 hover:bg-[#c28434]/10 text-[#ffd08f] text-xs font-serif rounded-lg transition-all"
                  >
                    重新选叶
                  </button>
                  <button
                    onClick={startWrapping}
                    className="flex-1 py-2.5 bg-gradient-to-r from-[#c28434] to-[#8c5213] hover:from-[#d4af37] text-white font-serif text-xs font-bold rounded-lg shadow-md hover:shadow-amber-500/10 active:scale-[0.98] transition-all"
                  >
                    手工扎绳，开缠！🎀
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: WRAPPING ANIMATION */}
            {gameState === 'wrapping' && (
              <motion.div
                key="wrapping-progress"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center py-8 space-y-4"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-24 h-24 bg-gradient-to-br from-emerald-600 to-emerald-900 rounded-3xl flex items-center justify-center shadow-xl border border-[#c28434]/40 relative"
                  >
                    <Leaf className="w-10 h-10 text-emerald-300 animate-pulse" />
                    {/* Golden silk twine effect wrapping around leaf */}
                    <div className="absolute inset-x-0 top-1/2 h-1 bg-yellow-500 transform border-t border-b border-[#c28434]" />
                    <div className="absolute inset-y-0 left-1/2 w-1 bg-yellow-500 transform border-l border-r border-[#c28434]" />
                  </motion.div>
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-serif text-white font-bold text-lg animate-pulse">正在精细包裹粽叶，收线打结...</h4>
                  <p className="text-xs text-emerald-100/50">用铜线将白糯米、沧州红枣与高山叶层层缠绕，勒出完美的四角金塔形状。</p>
                </div>
              </motion.div>
            )}

            {/* Step 4: STEAMING ANIMATION */}
            {gameState === 'steaming' && (
              <motion.div
                key="steaming-progress"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center py-8 space-y-4"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-24 h-24 bg-gradient-to-b from-[#8c5213] to-[#4a2e0c] rounded-full flex items-center justify-center shadow-2xl border-2 border-[#c28434]/50 relative"
                  >
                    <Flame className="w-10 h-10 text-orange-500 animate-pulse" />
                    <span className="absolute -top-1 font-serif text-[10px] text-amber-500 bg-stone-900 border border-amber-900/40 rounded px-1">古铜蒸釜</span>
                    
                    {/* Steaming cloud particle effect */}
                    <span className="absolute top-0 right-0 left-0 text-white/40 text-xs animate-bounce">♨ ♨</span>
                  </motion.div>
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-serif text-[#ffd08f] font-bold text-lg">大火煨火蒸煮中... {steamTimeSeconds}s</h4>
                  <p className="text-[12px] text-emerald-100/50">运河甘泉沸腾，红枣融化为金丝甜浆，米粒舒展，美味正在升华。</p>
                </div>
              </motion.div>
            )}

            {/* Step 5: COMPLETION / CARD GENERATOR */}
            {gameState === 'done' && (
              <motion.div
                key="recipe-complete"
                className="space-y-4"
              >
                <div className="p-4 rounded-xl border border-amber-900/30 bg-[#0d3b27]/80 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-full bg-amber-500/20 text-[#ffd08f]"><Award className="w-5 h-5 text-amber-400" /></span>
                    <div>
                      <h4 className="font-serif text-[#ffd08f] text-sm font-bold">包裹大成功！您的端午专属金枣粽已熟透</h4>
                      <p className="text-[10px] text-emerald-100/40">已存入您的运河旅人百宝箱中</p>
                    </div>
                  </div>

                  <hr className="border-amber-900/15" />

                  {/* Input form to customized gift blessing text */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-emerald-100/50 uppercase tracking-wider block">请在下方题写您想祝福的人 (如：沧州游子 / 家人)：</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="例：远方的挚友"
                        value={blessingTarget}
                        onChange={(e) => setBlessingTarget(e.target.value)}
                        className="flex-1 bg-emerald-950/80 border border-amber-950/50 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#c28434]"
                      />
                      <button
                        onClick={() => setBlessingCardGenerated(true)}
                        className="bg-gradient-to-r from-[#c28434] to-[#8c5213] text-white font-serif text-xs font-bold px-4 py-2 rounded-lg hover:from-[#d4af37]"
                      >
                        寄送祝福信帖
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-2 border border-amber-900/30 hover:bg-[#c28434]/10 text-emerald-100/60 hover:text-white text-xs font-serif rounded-lg transition-all flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> 包另一个其他馅料的粽子
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Right Side: Virtual Platter Visualizer (Always renders to represent Zongzi element in background) */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center">
          <div className="relative w-full max-w-xs hover:scale-[1.01] transition-transform duration-500">
            
            {/* Background elements represents Chinese tea mat or lattice */}
            <div className="absolute inset-0 bg-radial-gradient from-[#0b2d20]/90 via-transparent to-transparent opacity-60 rounded-full" />
            
            <div className="relative bg-[#0b251a]/85 border-2 border-dashed border-[#c28434]/30 rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center space-y-4">
              
              <AnimatePresence mode="wait">
                {blessingCardGenerated ? (
                  /* Blessing Greeting Card View */
                  <motion.div
                    key="greeting-card-element"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full text-center space-y-3 relative p-4 bg-gradient-to-b from-[#103e2c] to-[#041d13] border border-amber-500/30 rounded-2xl"
                  >
                    {/* Retro seal logo */}
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full border border-red-800 flex items-center justify-center font-serif text-[8px] text-red-500 bg-red-950/20 font-bold select-none rotate-12">
                      端午安
                    </div>
                    
                    <span className="text-[10px] font-mono text-amber-500 tracking-widest uppercase block">端午沧州美食行 · 祝福</span>
                    
                    <div className="font-serif space-y-2 mt-4 text-justify">
                      <p className="text-sm font-bold text-[#ffd08f]">致 {blessingTarget || "有福之人"}：</p>
                      <p className="text-[11px] text-emerald-100/80 leading-relaxed text-indent-2">
                        {getBlessingQuote()}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-amber-900/20 flex justify-between items-center text-[9px] text-emerald-100/30 font-serif">
                      <span>大运河畔 · 敬奉</span>
                      <span>2026 粽叶留香</span>
                    </div>

                    <button
                      onClick={() => alert("祝福短柬已为您虚拟打包，复制文本即可发送给微信好友！")}
                      className="mt-2 w-full py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded text-[#ffd08f] text-[10px] flex items-center justify-center gap-1.5"
                    >
                      <Share2 className="w-3 h-3" /> 打包发送好友
                    </button>
                  </motion.div>
                ) : (
                  /* Standard Plate Visual representation of wrapping steps */
                  <motion.div
                    key="standard-plate-element"
                    className="space-y-3 w-full text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span className="text-xs text-[#ffd08f] font-serif tracking-wider flex items-center justify-center gap-1">
                      <Gift className="w-3.5 h-3.5 text-[#c28434]" /> 青铜飨宴盘 / PLATE
                    </span>
                    
                    {/* Visual Plate Graphic */}
                    <div className="w-40 h-40 rounded-full border-4 border-[#c28434]/40 bg-[#061810] shadow-inner relative flex items-center justify-center overflow-hidden mx-auto">
                      {/* Leaf background element in plate */}
                      {gameState !== 'select-leaf' && (
                        <motion.div 
                          className="absolute w-36 h-20 bg-emerald-800/20 rounded-full transform rotate-12"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                        />
                      )}

                      {/* Rice/Filling element on plate */}
                      {gameState === 'select-fillings' && (
                        <motion.div 
                          className="absolute w-20 h-20 bg-amber-100/10 rounded-full border border-yellow-500/10 flex flex-wrap gap-1 p-2 items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-white select-none shadow" />
                          <span className="w-2.5 h-2.5 rounded-full bg-white select-none shadow" />
                          {selectedFillings.includes("jujube") && <span className="w-3 h-3 rounded-full bg-red-700 select-none shadow-md animate-pulse" title="金丝小枣" />}
                        </motion.div>
                      )}

                      {/* Full wrapped product on plate */}
                      {gameState === 'done' && (
                        <motion.div 
                          className="w-24 h-24 bg-gradient-to-br from-emerald-800 to-emerald-950 border border-emerald-600 rounded-xl relative rotate-45 flex items-center justify-center"
                          initial={{ scale: 0, rotate: 0 }}
                          animate={{ scale: 1, rotate: 45 }}
                        >
                          {/* Ties */}
                          <div className="absolute inset-x-0 h-1 bg-yellow-600/60" />
                          <div className="absolute inset-y-0 w-1 bg-yellow-600/60" />
                          <span className="absolute text-[8px] text-amber-400 font-serif transform -rotate-45 font-bold">香熟</span>
                        </motion.div>
                      )}

                      {gameState === 'select-leaf' && (
                        <div className="text-center p-2 space-y-1">
                          <Leaf className="w-8 h-8 text-emerald-800/40 mx-auto animate-bounce" />
                          <span className="text-[10px] text-emerald-100/30 font-sans block">等待盛物...</span>
                        </div>
                      )}
                    </div>

                    <div className="text-center space-y-1 pt-2">
                      <p className="text-xs font-serif font-bold text-emerald-100">
                        {gameState === 'select-leaf' && "正在净手择叶"}
                        {gameState === 'select-fillings' && "正在饱馅甜米"}
                        {gameState === 'wrapping' && "巧妇收边密缠丝"}
                        {gameState === 'steaming' && "古釜煮枣泉香溢"}
                        {gameState === 'done' && "枣香甜润大功成!"}
                      </p>
                      <p className="text-[10px] text-emerald-100/40 px-2 line-clamp-2">
                        {gameState === 'select-leaf' && "好的开端是成功的一半。清香的箬竹叶能够最大化逼出枣香。"}
                        {gameState === 'select-fillings' && `已选择: ${selectedFillings.map(f => fillings.find(fi=>fi.id === f)?.name).join("、")}`}
                        {gameState === 'wrapping' && "大运河两岸手艺精湛，包出的粽子四角分明，煮而不漏。"}
                        {gameState === 'steaming' && "蒸煮过程要以猛火吊滚，再小火慢焖，红枣拉丝正是这一刻形成。"}
                        {gameState === 'done' && "剥开绿叶，金丝小枣软烂如泥，糯米早已染满淡淡的江南竹香与枣蜜香！"}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
