import React, { useState } from 'react';
import { BUILDINGS, KEY_EQUIPMENTS } from '../data/mockPharmaData';
import { Building, Equipment } from '../types';
import { 
  Building2, 
  Layers, 
  Maximize, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Gauge, 
  Zap, 
  Cpu, 
  Wind, 
  Eye, 
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';

interface Factory3DTwinProps {
  selectedBuildingId: string;
  setSelectedBuildingId: (id: string) => void;
  onSelectEquipment: (eq: Equipment) => void;
  selectedEquipment: Equipment | null;
}

export const Factory3DTwin: React.FC<Factory3DTwinProps> = ({
  selectedBuildingId,
  setSelectedBuildingId,
  onSelectEquipment,
  selectedEquipment
}) => {
  const [activeFloor, setActiveFloor] = useState<number>(2); // 1, 2, 3, 4 for 5# building
  const [showPipes, setShowPipes] = useState<boolean>(true);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [hoveredEq, setHoveredEq] = useState<Equipment | null>(null);

  // Filter equipments for current view
  const visibleEquipments = KEY_EQUIPMENTS.filter(eq => {
    if (selectedBuildingId !== 'all' && eq.buildingId !== selectedBuildingId) return false;
    if (selectedBuildingId === 'b-5' && eq.floor !== activeFloor) return false;
    if (filterCategory !== 'all' && eq.category !== filterCategory) return false;
    return true;
  });

  const currentBuilding = BUILDINGS.find(b => b.id === selectedBuildingId);

  return (
    <div className="relative w-full h-full min-h-[460px] lg:min-h-[580px] bg-gradient-to-b from-[#080f21] via-[#060b18] to-[#040711] rounded-xl border border-cyan-500/25 overflow-hidden shadow-[inset_0_0_60px_rgba(6,182,212,0.06)] flex flex-col">
      {/* 3D Viewport Header Overlay */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left viewpoint title */}
        <div className="pointer-events-auto flex items-center gap-2.5 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/30 text-xs shadow-lg">
          <Building2 className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-slate-100 font-cyber">
            {selectedBuildingId === 'all' 
              ? '园区宏观空间数字孪生全景 (4栋核心大楼联动)' 
              : `${currentBuilding?.code} - ${currentBuilding?.name}`}
          </span>
          {selectedBuildingId === 'b-5' && (
            <span className="px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono-tech text-[10px]">
              {activeFloor}F 剖切层
            </span>
          )}
        </div>

        {/* Right view control tools */}
        <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/85 backdrop-blur-md px-2 py-1 rounded-lg border border-cyan-500/30 text-xs">
          {selectedBuildingId === 'b-5' && (
            <div className="flex items-center gap-1 border-r border-slate-700 pr-2 mr-1">
              <span className="text-slate-400 text-[11px] font-mono-tech">楼层:</span>
              {[1, 2, 3, 4].map(fl => (
                <button
                  key={fl}
                  onClick={() => setActiveFloor(fl)}
                  className={`px-1.5 py-0.5 text-[11px] rounded transition-all font-mono-tech ${
                    activeFloor === fl
                      ? 'bg-cyan-500 text-black font-bold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {fl}F
                </button>
              ))}
            </div>
          )}

          {/* Pipe Conduits toggle */}
          <button
            onClick={() => setShowPipes(!showPipes)}
            className={`px-2 py-0.5 rounded text-[11px] transition-colors flex items-center gap-1 ${
              showPipes ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>洁净管网(WFI/PW)</span>
          </button>

          {/* Reset View */}
          <button
            onClick={() => setSelectedBuildingId('all')}
            className="p-1 text-slate-400 hover:text-cyan-300 transition-colors"
            title="复位至园区鸟瞰视角"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Isometric Canvas / Visualizer */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center p-4 overflow-hidden tech-grid-bg select-none">
        {/* Subtle glowing ground grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-transparent to-transparent pointer-events-none" />

        {/* Campus SVG Map & Interactive 3D Mockup */}
        <div className="relative w-full max-w-[960px] aspect-[16/10] flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 1000 620" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Gradients for buildings */}
              <linearGradient id="grad-b5" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0c2340" />
                <stop offset="100%" stopColor="#081426" />
              </linearGradient>
              <linearGradient id="grad-b6" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#102a3a" />
                <stop offset="100%" stopColor="#071822" />
              </linearGradient>
              <linearGradient id="grad-qa" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#132338" />
                <stop offset="100%" stopColor="#0a1524" />
              </linearGradient>
              <linearGradient id="grad-power" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1f1e29" />
                <stop offset="100%" stopColor="#0f1118" />
              </linearGradient>

              {/* Laser pipeline pulse */}
              <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Ground grid lines */}
            <g opacity="0.25">
              <path d="M 50,310 L 500,50 L 950,310 L 500,570 Z" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
              <path d="M 150,310 L 500,110 L 850,310 L 500,510 Z" stroke="#0ea5e9" strokeWidth="1" fill="none" />
              <line x1="500" y1="50" x2="500" y2="570" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 4" />
              <line x1="50" y1="310" x2="950" y2="310" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 4" />
            </g>

            {/* Clean Pipeline Conduit Networks (PW, WFI, Pure Steam, Compressed Air) */}
            {showPipes && (
              <g id="utility-pipes">
                {/* Purified Water PW (Cyan flow) */}
                <path
                  d="M 280,480 L 360,430 L 450,430 L 450,260 L 380,220"
                  stroke="#06b6d4"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                  filter="url(#glow-cyan)"
                  fill="none"
                  opacity="0.85"
                />
                {/* WFI Injection Water (Emerald flow) */}
                <path
                  d="M 290,490 L 370,440 L 460,440 L 460,250 L 390,210"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeDasharray="8 4"
                  fill="none"
                  opacity="0.8"
                />
                {/* Pure Steam PS (Amber flow) */}
                <path
                  d="M 270,470 L 350,420 L 440,420 L 440,270 L 370,230"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                  fill="none"
                  opacity="0.7"
                />
              </g>
            )}

            {/* 1. Building 5# (固体制剂与无菌注射核心生产大楼) */}
            <g
              id="building-5"
              className="cursor-pointer transition-transform duration-300 hover:opacity-95"
              onClick={() => setSelectedBuildingId('b-5')}
            >
              {/* Isometric 3D box for Building 5 */}
              {/* Shadow */}
              <polygon points="260,340 540,180 570,300 290,460" fill="#030814" opacity="0.6" />
              {/* Left face */}
              <polygon points="240,240 240,360 380,440 380,320" fill="#091c30" stroke="#0ea5e9" strokeWidth="1.2" />
              {/* Right face */}
              <polygon points="380,320 380,440 540,350 540,230" fill="#051424" stroke="#0ea5e9" strokeWidth="1.2" />
              {/* Top face */}
              <polygon
                points="240,240 380,320 540,230 400,150"
                fill="url(#grad-b5)"
                stroke={selectedBuildingId === 'b-5' ? '#22d3ee' : '#0284c7'}
                strokeWidth={selectedBuildingId === 'b-5' ? '2.5' : '1.5'}
              />

              {/* Floor slice level markings on building 5 */}
              <line x1="240" y1="270" x2="380" y2="350" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
              <line x1="380" y1="350" x2="540" y2="260" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
              <line x1="240" y1="300" x2="380" y2="380" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
              <line x1="380" y1="380" x2="540" y2="290" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
              <line x1="240" y1="330" x2="380" y2="410" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
              <line x1="380" y1="410" x2="540" y2="320" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />

              {/* Building Label Tag */}
              <g transform="translate(350, 180)">
                <rect x="-70" y="-22" width="140" height="26" rx="4" fill="#040b17" stroke="#06b6d4" strokeWidth="1.2" />
                <text x="0" y="-4" fill="#e0f2fe" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                  5# 固体制剂生产楼
                </text>
                <circle cx="-55" cy="-9" r="3.5" fill="#10b981" />
              </g>

              {/* Micro badge: 4 floors, 86 equipments */}
              <g transform="translate(435, 290)">
                <rect x="-40" y="-12" width="80" height="20" rx="3" fill="#030712" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.9" />
                <text x="0" y="2" fill="#7dd3fc" fontSize="9" textAnchor="middle" fontFamily="monospace">
                  4F / 86台设备
                </text>
              </g>
            </g>

            {/* 2. Building 6# (自动化立体仓储楼) */}
            <g
              id="building-6"
              className="cursor-pointer transition-transform duration-300 hover:opacity-95"
              onClick={() => setSelectedBuildingId('b-6')}
            >
              {/* Isometric box for Warehouse */}
              {/* Left face */}
              <polygon points="620,180 620,320 740,390 740,250" fill="#08202c" stroke="#0ea5e9" strokeWidth="1.2" />
              {/* Right face */}
              <polygon points="740,250 740,390 870,310 870,170" fill="#05151e" stroke="#0ea5e9" strokeWidth="1.2" />
              {/* Top face */}
              <polygon
                points="620,180 740,250 870,170 750,100"
                fill="url(#grad-b6)"
                stroke={selectedBuildingId === 'b-6' ? '#22d3ee' : '#0ea5e9'}
                strokeWidth={selectedBuildingId === 'b-6' ? '2.5' : '1.5'}
              />

              {/* High rack warehouse shelf markings */}
              <line x1="640" y1="210" x2="640" y2="330" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
              <line x1="680" y1="230" x2="680" y2="350" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
              <line x1="780" y1="240" x2="780" y2="370" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
              <line x1="820" y1="215" x2="820" y2="345" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />

              {/* Building Label Tag */}
              <g transform="translate(740, 130)">
                <rect x="-65" y="-22" width="130" height="26" rx="4" fill="#040b17" stroke="#0ea5e9" strokeWidth="1.2" />
                <text x="0" y="-4" fill="#e0f2fe" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                  6# 智能立体仓储楼
                </text>
                <circle cx="-50" cy="-9" r="3.5" fill="#10b981" />
              </g>

              {/* Micro badge: ASRS 86.4% utilization */}
              <g transform="translate(800, 240)">
                <rect x="-42" y="-12" width="84" height="20" rx="3" fill="#030712" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.9" />
                <text x="0" y="2" fill="#38bdf8" fontSize="9" textAnchor="middle" fontFamily="monospace">
                  库容率 86.4%
                </text>
              </g>
            </g>

            {/* 3. Building QA (质检验与研发大楼) */}
            <g
              id="building-qa"
              className="cursor-pointer transition-transform duration-300 hover:opacity-95"
              onClick={() => setSelectedBuildingId('b-qa')}
            >
              {/* Isometric box for QA Building */}
              {/* Left face */}
              <polygon points="460,370 460,470 560,530 560,430" fill="#0e1d2e" stroke="#0ea5e9" strokeWidth="1.2" />
              {/* Right face */}
              <polygon points="560,430 560,530 670,460 670,360" fill="#081420" stroke="#0ea5e9" strokeWidth="1.2" />
              {/* Top face */}
              <polygon
                points="460,370 560,430 670,360 570,300"
                fill="url(#grad-qa)"
                stroke={selectedBuildingId === 'b-qa' ? '#22d3ee' : '#0ea5e9'}
                strokeWidth={selectedBuildingId === 'b-qa' ? '2.5' : '1.5'}
              />

              {/* Building Label Tag */}
              <g transform="translate(565, 335)">
                <rect x="-60" y="-22" width="120" height="26" rx="4" fill="#040b17" stroke="#38bdf8" strokeWidth="1.2" />
                <text x="0" y="-4" fill="#e0f2fe" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                  质检验楼 (QC/QA)
                </text>
                <circle cx="-45" cy="-9" r="3.5" fill="#10b981" />
              </g>

              {/* Micro badge: 19 active tests */}
              <g transform="translate(615, 415)">
                <rect x="-35" y="-12" width="70" height="20" rx="3" fill="#030712" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.9" />
                <text x="0" y="2" fill="#7dd3fc" fontSize="9" textAnchor="middle" fontFamily="monospace">
                  批放行 99.8%
                </text>
              </g>
            </g>

            {/* 4. Building Power & Clean Utilities (动力与改造楼) */}
            <g
              id="building-power"
              className="cursor-pointer transition-transform duration-300 hover:opacity-95"
              onClick={() => setSelectedBuildingId('b-power')}
            >
              {/* Isometric box for Power building */}
              {/* Left face */}
              <polygon points="180,410 180,500 280,560 280,470" fill="#181724" stroke="#f59e0b" strokeWidth="1.2" />
              {/* Right face */}
              <polygon points="280,470 280,560 380,500 380,410" fill="#0e0d16" stroke="#f59e0b" strokeWidth="1.2" />
              {/* Top face */}
              <polygon
                points="180,410 280,470 380,410 280,350"
                fill="url(#grad-power)"
                stroke={selectedBuildingId === 'b-power' ? '#f59e0b' : '#d97706'}
                strokeWidth={selectedBuildingId === 'b-power' ? '2.5' : '1.5'}
              />

              {/* Chimney / Cooling Tower / Water loop icons */}
              <circle cx="250" cy="400" r="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
              <circle cx="300" cy="425" r="12" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.2" />

              {/* Building Label Tag */}
              <g transform="translate(280, 385)">
                <rect x="-60" y="-22" width="120" height="26" rx="4" fill="#040b17" stroke="#f59e0b" strokeWidth="1.2" />
                <text x="0" y="-4" fill="#fef3c7" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                  改造与动力楼
                </text>
                <circle cx="-45" cy="-9" r="3.5" fill="#f59e0b" />
              </g>

              {/* Micro badge: PW + WFI Injection */}
              <g transform="translate(325, 460)">
                <rect x="-35" y="-12" width="70" height="20" rx="3" fill="#030712" stroke="#f59e0b" strokeWidth="0.8" opacity="0.9" />
                <text x="0" y="2" fill="#fbbf24" fontSize="9" textAnchor="middle" fontFamily="monospace">
                  纯化水/WFI
                </text>
              </g>
            </g>

            {/* Cleanroom Environment Overlay (when inspecting 5# building) */}
            {selectedBuildingId === 'b-5' && (
              <g id="cleanroom-layer" opacity="0.95">
                {/* 2F D-Grade Clean Zone outline */}
                <polygon
                  points="260,265 375,335 480,270 365,200"
                  fill="rgba(6, 182, 212, 0.12)"
                  stroke="#22d3ee"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <text x="370" y="270" fill="#67e8f9" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                  [D级洁净压片区 22Pa / 22.3°C / 51.6%RH]
                </text>
              </g>
            )}

            {/* Equipment Model Hotspots / Floating Status Beacons */}
            {visibleEquipments.map((eq) => {
              // Map percentage position to SVG coords
              let posX = 150 + (eq.position3D.x * 6.8);
              let posY = 120 + (eq.position3D.y * 3.8);

              // Status color mapping
              let statusFill = '#10b981'; // running emerald
              let pulseClass = '';
              if (eq.status === 'alarm') {
                statusFill = '#f43f5e'; // rose alarm
                pulseClass = 'animate-ping';
              } else if (eq.status === 'idle') {
                statusFill = '#38bdf8'; // sky idle
              } else if (eq.status === 'stopped') {
                statusFill = '#94a3b8'; // slate stopped
              }

              const isSelected = selectedEquipment?.id === eq.id;

              return (
                <g
                  key={eq.id}
                  transform={`translate(${posX}, ${posY})`}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectEquipment(eq);
                  }}
                  onMouseEnter={() => setHoveredEq(eq)}
                  onMouseLeave={() => setHoveredEq(null)}
                >
                  {/* Outer selection ring */}
                  {isSelected && (
                    <circle cx="0" cy="0" r="14" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="3 3" className="animate-spin" />
                  )}

                  {/* Pulsing ring for alarms */}
                  {eq.status === 'alarm' && (
                    <circle cx="0" cy="0" r="12" fill="#f43f5e" opacity="0.4" className={pulseClass} />
                  )}

                  {/* Machine box / marker base */}
                  <rect x="-7" y="-7" width="14" height="14" rx="3" fill="#020617" stroke={statusFill} strokeWidth="1.8" />
                  <circle cx="0" cy="0" r="3" fill={statusFill} />

                  {/* Quick Code Badge */}
                  <g transform="translate(0, -12)">
                    <rect x="-24" y="-9" width="48" height="13" rx="2" fill="#040d1a" stroke={statusFill} strokeWidth="0.8" opacity="0.9" />
                    <text x="0" y="0" fill="#f8fafc" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      {eq.code}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Hover Inspector Tooltip Card */}
        {hoveredEq && (
          <div className="absolute bottom-4 left-4 z-30 pointer-events-none bg-slate-900/95 backdrop-blur-md border border-cyan-400/40 p-3 rounded-lg shadow-2xl max-w-xs animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between gap-2 border-b border-slate-700/80 pb-1.5 mb-2">
              <div className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${
                  hoveredEq.status === 'running' ? 'bg-emerald-400' :
                  hoveredEq.status === 'alarm' ? 'bg-rose-500 animate-ping' :
                  hoveredEq.status === 'idle' ? 'bg-sky-400' : 'bg-slate-400'
                }`} />
                <span className="font-bold text-slate-100 text-xs">{hoveredEq.name}</span>
              </div>
              <span className="text-[10px] font-mono-tech text-cyan-300 font-semibold">{hoveredEq.code}</span>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-slate-300 mb-2">
              <div>工序: <span className="text-slate-100">{hoveredEq.category}</span></div>
              <div>OEE: <span className="text-emerald-400 font-bold">{hoveredEq.oee}%</span></div>
              <div className="col-span-2">车间: <span className="text-slate-200">{hoveredEq.workshopName}</span></div>
              {hoveredEq.currentBatch && (
                <div className="col-span-2">在制批次: <span className="text-cyan-300 font-mono-tech">{hoveredEq.currentBatch}</span></div>
              )}
            </div>

            <div className="flex items-center justify-between text-[10px] bg-slate-950/80 px-2 py-1 rounded border border-slate-800 text-slate-400">
              <span>点击查看实时SCADA曲线与详情</span>
              <Eye className="w-3 h-3 text-cyan-400" />
            </div>
          </div>
        )}
      </div>

      {/* Viewport Bottom Controls: Category Filter & Legend */}
      <div className="bg-[#050a16]/95 border-t border-cyan-900/40 px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-400 text-[11px]">设备分类:</span>
          {[
            { id: 'all', label: '全部设备 (216)' },
            { id: '固体制剂核心', label: '固体制剂 (压片/制粒/包衣)' },
            { id: '无菌注射制剂', label: '无菌注射 (灌装/冻干)' },
            { id: '包装联线', label: '包装码垛' },
            { id: '立体仓储', label: '立库AGV' },
            { id: '洁净公用工程', label: '纯水/WFI/蒸汽' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                filterCategory === cat.id
                  ? 'bg-cyan-600/30 text-cyan-200 border border-cyan-400/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>运行 (外形绿)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            <span>待机 (外形蓝)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
            <span>停机 (冷灰)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-rose-400 font-medium">告警 (橙红脉冲)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
