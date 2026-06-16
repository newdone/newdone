/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Upload, Camera, Trash2, Send, Check, User, Heart, Sparkles, Image as ImageIcon } from "lucide-react";

interface GuestbookPost {
  id: string;
  name: string;
  avatarIndex: number;
  message: string;
  date: string;
  imageUrl?: string; // Base64 or placeholder
  likes: number;
}

const PRESET_AVATARS = [
  "👩‍🌾 阿秋", "🕶️ 潮哥", "👧 小糯米", "🧥 温阿姨", "💪 大亮", "🎒 游客旅行家", "🌾 运河纤夫"
];

const INITIAL_POSTS: GuestbookPost[] = [
  {
    id: "init-1",
    name: "阿秋",
    avatarIndex: 0,
    message: "端午节提前来大运河堤探路啦！大石桥栏杆上雕刻的狮子栩栩如生，河面水波粼粼。带两只小家伙（卷卷和煤球）来散步，吹着晚风太惬意了！两只在桥头跑得停不下来，期待6月18号真正的运河美食大汇合！🌊🍂",
    date: "2026-06-14 18:24",
    imageUrl: "bridge-parade-photo", // We will render a beautifully stylized mock water-colored sketch representing their first photo in the guestbook!
    likes: 42,
  },
  {
    id: "init-2",
    name: "潮哥",
    avatarIndex: 1,
    message: "刚刚在河间驿站要了三个爆肚驴肉火烧。那个皮擀得真是有几十层，咬下去酥得渣直掉，伴着热汤吃真是一绝！配上沧州地道的高梁小烧，那豪爽的感觉，一秒代入漕运江湖。强推老字号！🕶️🔥",
    date: "2026-06-14 20:12",
    likes: 35,
  },
  {
    id: "init-3",
    name: "小糯米",
    avatarIndex: 2,
    message: "我和温妈妈吃到了第一颗刚出锅的金丝小枣粽子！糯米黏黏的、亮闪闪的，拨开真的有亮亮细细的金丝，红枣好甜呀！我还给卷卷和煤球闻了闻，两只小乖乖一直摇尾巴流口水，好喜欢沧州的老大桥！❤️🐶🐾",
    date: "2026-06-14 21:05",
    likes: 68,
  }
];

export default function Guestbook() {
  const [posts, setPosts] = useState<GuestbookPost[]>([]);
  const [userName, setUserName] = useState("");
  const [avatarIndex, setAvatarIndex] = useState(5); // Default to游客
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load posts from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cangzhou_guestbook_posts_v1");
    if (stored) {
      try {
        setPosts(JSON.parse(stored));
      } catch (e) {
        setPosts(INITIAL_POSTS);
      }
    } else {
      setPosts(INITIAL_POSTS);
      localStorage.setItem("cangzhou_guestbook_posts_v1", JSON.stringify(INITIAL_POSTS));
    }

    const storedLikes = localStorage.getItem("cangzhou_guestbook_liked_v1");
    if (storedLikes) {
      try {
        setLikedPosts(JSON.parse(storedLikes));
      } catch (e) {}
    }
  }, []);

  // Save helper
  const savePostsToLocalStorage = (newPosts: GuestbookPost[]) => {
    setPosts(newPosts);
    try {
      localStorage.setItem("cangzhou_guestbook_posts_v1", JSON.stringify(newPosts));
    } catch (e) {
      // If quota exceeded, alert or strip oldest images
      const strippedPosts = newPosts.map((p, i) => {
        if (i > 5) return { ...p, imageUrl: undefined }; // keep images only on top new ones to save space
        return p;
      });
      localStorage.setItem("cangzhou_guestbook_posts_v1", JSON.stringify(strippedPosts));
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const resizeAndProcessImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas to scale image to max 600px width/height to save localStorage quota
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 500;
        const MAX_HEIGHT = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7); // 70% quality jpeg compression
          setImageFile(compressedBase64);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        resizeAndProcessImage(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        resizeAndProcessImage(file);
      }
    }
  };

  const handleLikePost = (id: string) => {
    const isLiked = likedPosts[id];
    let newLikesMap = { ...likedPosts, [id]: !isLiked };
    setLikedPosts(newLikesMap);
    localStorage.setItem("cangzhou_guestbook_liked_v1", JSON.stringify(newLikesMap));

    const updated = posts.map((p) => {
      if (p.id === id) {
        return { ...p, likes: isLiked ? p.likes - 1 : p.likes + 1 };
      }
      return p;
    });
    savePostsToLocalStorage(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;
    if (!message.trim()) return;

    const newPost: GuestbookPost = {
      id: "post-" + Date.now(),
      name: userName,
      avatarIndex,
      message,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      imageUrl: imageFile || undefined,
      likes: 0
    };

    const updated = [newPost, ...posts];
    savePostsToLocalStorage(updated);

    // Reset fields
    setUserName("");
    setMessage("");
    setImageFile(null);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDeletePost = (id: string) => {
    const confirmDelete = window.confirm("确定要删除这条留言吗？");
    if (!confirmDelete) return;
    const updated = posts.filter((p) => p.id !== id);
    savePostsToLocalStorage(updated);
  };

  return (
    <div id="canal-message-wall" className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-gradient-to-b from-[#062e1e]/90 to-[#021810]/95 border border-amber-900/40 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#c28434_0.4px,transparent_0.4px)] [background-size:12px_12px] opacity-10 pointer-events-none" />

      {/* Title Panel */}
      <div className="lg:col-span-12 space-y-2 border-b border-amber-900/20 pb-4">
        <span className="text-[#c28434] text-xs font-serif font-bold tracking-[3px] uppercase flex items-center gap-1">
          <MessageSquare className="w-4 h-4 text-amber-500 animate-pulse" />
          运河岸畔留言簿 · 旅途印记
        </span>
        <h2 className="text-2xl font-serif text-white font-heavy flex items-center gap-2">
          大运河美食与故事留言墙
        </h2>
        <p className="text-xs text-emerald-100/50">
          端午出游大运河，两岸留情心相偎。快来写下您的端午出游小愿望，上传旅途中的美食抓拍与游记随笔吧！
        </p>
      </div>

      {/* Left section: The Leave-Message Form */}
      <div className="lg:col-span-5 bg-[#031c11] border border-emerald-900/60 rounded-2xl p-5 md:p-6 shadow-md h-fit relative space-y-4">
        <h3 className="text-md font-serif text-[#ffd08f] font-bold flex items-center gap-2 pb-2 border-b border-emerald-900/30">
          <Camera className="w-4 h-4 text-amber-500" />
          写下您的旅行印记
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* User Name and Preset Avatar */}
          <div className="space-y-1.5">
            <label className="text-xs text-emerald-200/80 font-serif block">署名 / 用户昵称</label>
            <div className="relative">
              <input
                id="input-guestbook-username"
                type="text"
                required
                maxLength={12}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="阿秋 / 潮哥 / 食客旅行家"
                className="w-full pl-9 pr-3 py-2 bg-[#020e09] border border-amber-900/30 rounded-xl focus:border-amber-400 focus:outline-none text-xs text-white"
              />
              <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-emerald-100/40" />
            </div>
          </div>

          {/* Quick Identity Selector */}
          <div className="space-y-1.5">
            <label className="text-xs text-emerald-200/80 font-serif block">选择对应角色身份</label>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_AVATARS.map((avatar, idx) => {
                const isSelected = avatarIndex === idx;
                return (
                  <button
                    id={`choice-avatar-${idx}`}
                    type="button"
                    key={idx}
                    onClick={() => {
                      setAvatarIndex(idx);
                      // Auto populate name if empty
                      if (!userName.trim()) {
                        setUserName(avatar.substring(3));
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-serif transition-colors ${
                      isSelected
                        ? "bg-gradient-to-r from-[#c28434] to-[#8c5213] text-white font-bold stroke-1 shadow"
                        : "bg-[#010906] text-emerald-100/60 hover:text-white border border-emerald-950"
                    }`}
                  >
                    {avatar}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message Content */}
          <div className="space-y-1.5">
            <label className="text-xs text-emerald-200/80 font-serif block">在运河边想对大家说些什么？</label>
            <textarea
              id="textarea-guestbook-msg"
              required
              rows={4}
              maxLength={220}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="大闸下的大运河夕阳好美呀！吃一碗刚出锅的羊肠汤，浑身暖和！"
              className="w-full p-3 bg-[#020e09] border border-amber-900/30 rounded-xl focus:border-amber-400 focus:outline-none text-xs text-white placeholder:text-stone-600 resize-none font-sans"
            />
          </div>

          {/* DRAG & DROP PHOTO UPLOAD COMPONENT */}
          <div className="space-y-1.5">
            <label className="text-xs text-emerald-200/80 font-serif block">上传风景/美食照片 (点击或拖入)</label>
            
            <input
              id="file-guestbook-uploader"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            <div
              id="drop-target-area"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                isDragging 
                  ? "border-amber-400 bg-emerald-950/40 scale-[0.99]" 
                  : "border-amber-900/30 bg-[#010a06] hover:border-amber-500/50"
              }`}
            >
              {imageFile ? (
                <div className="relative w-full max-h-[120px] rounded-lg overflow-hidden group">
                  <img src={imageFile} alt="Upload preview" className="w-full h-full object-cover max-h-[120px]" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      id="btn-remove-uploaded-img"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage();
                      }}
                      className="p-1 px-2.5 bg-rose-600 text-white rounded-md text-[10px] font-sans hover:bg-rose-500 active:scale-95 transition-all text-center flex items-center gap-1.5 font-bold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>移除此图片</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-[#c28434]/70 animate-bounce" />
                  <div className="text-center">
                    <p className="text-[10px] text-emerald-200 font-bold">拖曳图片到这里，或点击浏览文件夹</p>
                    <p className="text-[9px] text-emerald-100/30 mt-0.5">支持 JPG、PNG 格式 (系统将自动无损瘦身封装)</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            id="btn-submit-guestbook"
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#c28434] to-[#8c5213] hover:from-amber-400 hover:to-amber-600 text-white text-xs font-serif font-bold active:scale-98 transition-all shadow-md flex items-center justify-center gap-2"
          >
            {submitSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" />
                <span>投递成功！已载入运河画卷</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>敲响锣鼓 · 发布留言</span>
              </>
            )}
          </button>

        </form>

      </div>

      {/* Right section: Interactive Posts Flow Wall */}
      <div className="lg:col-span-7 flex flex-col space-y-4">
        
        <div className="flex items-center justify-between pl-1">
          <span className="text-xs text-white/70 font-serif font-bold">
            最新运河足迹 ({posts.length} 条评论)
          </span>
          <span className="text-[10px] text-emerald-100/40">
            按发表时间同步排序
          </span>
        </div>

        {/* Scrollable listing box */}
        <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2 scrollbar-thin">
          <AnimatePresence>
            {posts.map((post) => {
              const hasLiked = !!likedPosts[post.id];
              const isDefaultPost1 = post.id === "init-1";
              
              return (
                <motion.div
                  id={`guestbook-post-${post.id}`}
                  key={post.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-[#03150d] border border-emerald-950 rounded-2xl p-4 shadow-sm relative space-y-3 hover:border-amber-900/30 transition-all duration-300"
                >
                  {/* Top line with Avatar and user detail */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#c28434]/15 border border-[#c28434]/30 flex items-center justify-center text-xs text-amber-500 font-serif font-black">
                        {post.name.substring(0, 1)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5 font-sans">
                          {post.name}
                          <span className="text-[9px] bg-[#103e2c] border border-emerald-900 px-1.5 py-0.2 rounded font-serif text-[#ffd08f] scale-90">
                            {PRESET_AVATARS[post.avatarIndex] || "🎒 游客"}
                          </span>
                        </div>
                        <span className="text-[8px] text-emerald-100/30 block font-mono">
                          {post.date}
                        </span>
                      </div>
                    </div>

                    {/* Like & delete option */}
                    <div className="flex items-center gap-2">
                      
                      {/* Delete icon ONLY for user generated posts */}
                      {!post.id.startsWith("init") && (
                        <button
                          id={`btn-post-del-${post.id}`}
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1 hover:bg-rose-950/40 text-stone-500 hover:text-rose-400 rounded-lg transition-colors scale-90"
                          title="删除留言"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        id={`btn-post-like-${post.id}`}
                        onClick={() => handleLikePost(post.id)}
                        className={`px-2.5 py-1 rounded-full border text-[10px] flex items-center gap-1.5 transition-all ${
                          hasLiked
                            ? "bg-rose-500/15 border-rose-500/40 text-rose-300"
                            : "bg-[#010906] border-emerald-950 text-emerald-100/50 hover:text-white"
                        }`}
                      >
                        <Heart className={`w-3 h-3 ${hasLiked ? "fill-current text-rose-500" : ""}`} />
                        <span>{post.likes}</span>
                      </button>

                    </div>
                  </div>

                  {/* Body text */}
                  <p className="text-xs text-emerald-100/80 leading-relaxed font-sans whitespace-pre-wrap pl-10">
                    {post.message}
                  </p>

                  {/* Rendering Custom Images inside the posts line */}
                  {post.imageUrl && (
                    <div className="pl-10">
                      <div className="relative rounded-xl overflow-hidden border border-amber-900/10 max-w-[280px]">
                        
                        {/* Rendering simulated cute watercolor sketch block representing the family photo */}
                        {post.imageUrl === "bridge-parade-photo" ? (
                          <div className="relative w-full h-[140px] bg-gradient-to-br from-[#0c2a1c] to-[#010c08] p-3 flex flex-col justify-between overflow-hidden">
                            {/* Water ripples decorative background */}
                            <div className="absolute inset-x-0 bottom-0 h-8 bg-[#c4c4c4]/10 border-t border-emerald-900" />
                            
                            {/* SVG mini representational silhouette inside the card */}
                            <div className="w-full h-2/3 flex items-end justify-around relative px-4 drop-shadow-md">
                              <span className="text-lg">👩‍🌾</span>
                              <span className="text-lg">🕶️</span>
                              <span className="text-base">👧</span>
                              <span className="text-lg">🧥</span>
                              <span className="text-lg">💪</span>
                              <span className="text-sm absolute left-6 bottom-1">🐩</span>
                              <span className="text-sm absolute right-14 bottom-1">🐾</span>
                            </div>

                            <div className="relative z-10 flex justify-between items-center mt-2">
                              <span className="text-[9px] text-[#ffd08f]/80 font-serif font-black flex items-center gap-1 border-t border-[#ffd08f]/20 pt-1 w-full">
                                <Sparkles className="w-3 h-3 text-amber-500 animate-spin-slow" />
                                珍贵快照 · 捷地古闸石板桥上的我们与黑宝、白宝
                              </span>
                            </div>
                          </div>
                        ) : (
                          // Real uploaded file representation
                          <img 
                            src={post.imageUrl} 
                            alt="Traveller uploaded" 
                            className="w-full h-auto object-cover max-h-[180px] hover:scale-[1.03] transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        )}

                        <div className="absolute top-1.5 right-1.5 bg-black/70 px-2 py-0.5 rounded text-[8px] font-mono text-amber-500 flex items-center gap-1">
                          <ImageIcon className="w-2.5 h-2.5" />
                          <span>IMAGE ATTACHED</span>
                        </div>
                      </div>
                    </div>
                  )}

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
