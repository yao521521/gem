import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Layers, 
  FileText, 
  Maximize2, 
  Minimize2, 
  Activity, 
  Radio, 
  ShieldCheck, 
  Clock, 
  ChevronRight,
  SlidersHorizontal,
  Flame,
  Droplets,
  Zap,
  Info
} from 'lucide-react';

interface HeaderProps {
  activeView: 'macro' | 'workshop' | 'alignment';
  setActiveView: (view: 'macro' | 'workshop' | 'alignment') => void;
  selectedBuildingId: string;
  setSelectedBuildingId: (id: string) => void;
  onOpenRequirementModal: () => void;
  isSimulating: boolean;
  setIsSimulating: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  selectedBuildingId,
  setSelectedBuildingId,
  onOpenRequirementModal,
  isSimulating,
  setIsSimulating
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('zh-CN', { hour12: false }));
      setDateStr(now.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ' 星期' + ['日','一','二','三','四','五','六'][now.getDay()]);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <header className="relative w-full z-30 select-none">
      {/* Top Industrial cyber ribbon */}
      <div className="h-1 bg-gradient-to-r from-cyan-600 via-sky-400 to-indigo-600 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
      
      <div className="bg-[#070d1c]/95 border-b border-cyan-500/20 px-4 py-2.5 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        {/* Left: Branding & Status Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Building2 className="w-5 h-5 text-cyan-400" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-sky-300 font-cyber">
                  制剂药厂BI大屏数字孪生系统
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded font-mono-tech">
                  GMP COMPLIANT
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide font-mono-tech flex items-center gap-2">
                <span>PHARMA 4.0 INTELLIGENT DISPATCH & MONITORING</span>
                <span className="text-cyan-500/60">•</span>
                <span className="text-cyan-400">4栋核心建筑联动中</span>
              </p>
            </div>
          </div>
        </div>

        {/* Center: View Mode Nav Buttons (Meeting Requirement: Macro View + Workshop View + Alignment View) */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-lg border border-cyan-500/30 shadow-inner">
          <button
            onClick={() => setActiveView('macro')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeView === 'macro'
                ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-cyan-200" />
            <span>宏观管理驾驶舱</span>
          </button>

          <button
            onClick={() => setActiveView('workshop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeView === 'workshop'
                ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-200" />
            <span>车间数字孪生中控</span>
          </button>

          <button
            onClick={() => setActiveView('alignment')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeView === 'alignment'
                ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                : 'text-amber-400/90 hover:text-amber-200 hover:bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-300" />
            <span>需求对齐与方案推进</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping ml-0.5" />
          </button>
        </div>

        {/* Right: Quick actions, Live telemetry toggle, Clock, Fullscreen */}
        <div className="flex items-center gap-3">
          {/* Simulation Toggle */}
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            title="切换实时数据流仿真刷新"
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs transition-colors ${
              isSimulating 
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' 
                : 'bg-slate-800/80 border-slate-700 text-slate-400'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${isSimulating ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
            <span className="font-mono-tech text-[11px]">{isSimulating ? '数据推流中 (1Hz)' : '推流已暂停'}</span>
          </button>

          {/* Quick Requirement Summary Link */}
          <button
            onClick={onOpenRequirementModal}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/80 text-xs transition-all shadow-sm"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="font-medium">纪要要点</span>
          </button>

          {/* Digital Clock */}
          <div className="hidden sm:flex flex-col items-end pl-2 border-l border-slate-800 font-mono-tech">
            <span className="text-sm font-semibold text-cyan-200 tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400" />
              {timeStr}
            </span>
            <span className="text-[10px] text-slate-400">{dateStr}</span>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-md bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title={isFullscreen ? "退出大屏全屏" : "开启大屏全屏展示"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 text-cyan-400" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Secondary Quick Subnav: 4 Building Selector when in 3D / Workshop mode */}
      <div className="bg-[#050b17]/90 border-b border-cyan-900/30 px-4 py-1.5 flex items-center justify-between text-xs overflow-x-auto">
        <div className="flex items-center gap-2 text-slate-400 shrink-0">
          <span className="text-cyan-400 font-semibold flex items-center gap-1 font-mono-tech">
            <Radio className="w-3 h-3 animate-ping" />
            园区建筑快速视点:
          </span>
          <button
            onClick={() => setSelectedBuildingId('all')}
            className={`px-2 py-0.5 rounded transition-colors ${
              selectedBuildingId === 'all'
                ? 'bg-cyan-500/20 text-cyan-200 font-semibold border border-cyan-400/40'
                : 'hover:text-slate-200'
            }`}
          >
            🌐 园区全景鸟瞰
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={() => setSelectedBuildingId('b-5')}
            className={`px-2 py-0.5 rounded transition-colors ${
              selectedBuildingId === 'b-5'
                ? 'bg-cyan-500/20 text-cyan-200 font-semibold border border-cyan-400/40'
                : 'hover:text-slate-200'
            }`}
          >
            🏢 5# 固体制剂与无菌注射楼 (核心)
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={() => setSelectedBuildingId('b-6')}
            className={`px-2 py-0.5 rounded transition-colors ${
              selectedBuildingId === 'b-6'
                ? 'bg-cyan-500/20 text-cyan-200 font-semibold border border-cyan-400/40'
                : 'hover:text-slate-200'
            }`}
          >
            📦 6# 智能立体仓储楼
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={() => setSelectedBuildingId('b-qa')}
            className={`px-2 py-0.5 rounded transition-colors ${
              selectedBuildingId === 'b-qa'
                ? 'bg-cyan-500/20 text-cyan-200 font-semibold border border-cyan-400/40'
                : 'hover:text-slate-200'
            }`}
          >
            🔬 质检验楼 (QC/QA)
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={() => setSelectedBuildingId('b-power')}
            className={`px-2 py-0.5 rounded transition-colors ${
              selectedBuildingId === 'b-power'
                ? 'bg-cyan-500/20 text-cyan-200 font-semibold border border-cyan-400/40'
                : 'hover:text-slate-200'
            }`}
          >
            ⚡ 改造与动力楼 (纯水/WFI/蒸汽)
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[11px] text-slate-400 font-mono-tech shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>运行 178台</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>待机 22台</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <span>停机 11台</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="text-rose-400 font-semibold">告警 5台</span>
          </div>
        </div>
      </div>
    </header>
  );
};
