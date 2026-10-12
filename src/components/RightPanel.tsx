import React from 'react';
import { FACTORY_ALARMS, SYSTEM_INTEGRATIONS } from '../data/mockPharmaData';
import { FactoryAlarm, SystemIntegration } from '../types';
import { 
  Package, 
  ShieldAlert, 
  Server, 
  Activity, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Cpu,
  Layers,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface RightPanelProps {
  onSelectAlarm?: (alarm: FactoryAlarm) => void;
  onOpenSystemDetail?: (sys: SystemIntegration) => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  onSelectAlarm,
  onOpenSystemDetail
}) => {
  return (
    <div className="w-full flex flex-col gap-3.5 select-none">
      {/* 1. Real-time Alarm Central (实时告警中枢与偏差处置) */}
      <div className="glass-panel rounded-xl p-3.5 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rose-500 via-amber-500 to-transparent" />
        
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <h2 className="text-sm font-bold text-slate-100 font-cyber">SCADA / DCS 实时异常预警</h2>
          </div>
          <span className="text-[10px] text-rose-300 font-mono-tech bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/40 animate-pulse">
            1条紧急 / 2条警告
          </span>
        </div>

        {/* Alarm Feed */}
        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
          {FACTORY_ALARMS.map((alm) => {
            let borderStyle = 'border-slate-800 hover:border-slate-700';
            let badgeBg = 'bg-slate-800 text-slate-300';
            let iconColor = 'text-slate-400';

            if (alm.level === 'critical') {
              borderStyle = 'border-rose-900/60 bg-rose-950/20 hover:border-rose-500/60';
              badgeBg = 'bg-rose-950 text-rose-300 border-rose-500/40';
              iconColor = 'text-rose-400 animate-pulse';
            } else if (alm.level === 'warning') {
              borderStyle = 'border-amber-900/50 bg-amber-950/15 hover:border-amber-500/60';
              badgeBg = 'bg-amber-950 text-amber-300 border-amber-500/40';
              iconColor = 'text-amber-400';
            } else {
              borderStyle = 'border-cyan-900/40 bg-cyan-950/10 hover:border-cyan-500/40';
              badgeBg = 'bg-cyan-950 text-cyan-300 border-cyan-500/30';
              iconColor = 'text-cyan-400';
            }

            return (
              <div
                key={alm.id}
                onClick={() => onSelectAlarm && onSelectAlarm(alm)}
                className={`p-2 rounded-lg border transition-all cursor-pointer ${borderStyle}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className={`w-3.5 h-3.5 ${iconColor}`} />
                    <span className="text-xs font-bold text-slate-200 truncate max-w-[170px]">
                      {alm.source}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono-tech text-slate-400">{alm.time}</span>
                </div>

                <p className="text-[11px] text-slate-300 leading-snug line-clamp-2 mb-1">
                  {alm.description}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>位置: {alm.building}</span>
                  <span className={`px-1.5 py-0.2 rounded border text-[9px] font-mono-tech ${badgeBg}`}>
                    {alm.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. WMS Smart High-Bay Warehouse & Logistics (6#智能仓储与物流效能) */}
      <div className="glass-panel rounded-xl p-3.5 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 to-indigo-500" />
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-slate-100 font-cyber">6# 智能立体仓储与AGV调度 (WMS)</h2>
          </div>
          <span className="text-[10px] text-cyan-300 font-mono-tech">
            18米双立柱堆垛机
          </span>
        </div>

        {/* Warehouse KPI grid */}
        <div className="grid grid-cols-3 gap-2 mb-2 text-center">
          <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400">立体库位利用率</div>
            <div className="text-sm font-bold text-cyan-300 font-mono-tech">86.4%</div>
            <div className="text-[9px] text-emerald-400">12,480 / 14,440</div>
          </div>
          <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400">今日出入库周转</div>
            <div className="text-sm font-bold text-sky-300 font-mono-tech">482 托</div>
            <div className="text-[9px] text-slate-400">入260 / 出222</div>
          </div>
          <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400">激光AGV作业</div>
            <div className="text-sm font-bold text-emerald-400 font-mono-tech">16 / 16 台</div>
            <div className="text-[9px] text-emerald-400">无异常调度</div>
          </div>
        </div>

        {/* Inventory QA Release status bars */}
        <div className="space-y-1.5 text-[11px]">
          <div>
            <div className="flex justify-between text-slate-300 mb-0.5">
              <span>原辅料放行状态分布</span>
              <span className="font-mono-tech text-emerald-400">合格 94.2%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full flex overflow-hidden">
              <div className="bg-emerald-500 h-full" style={{ width: '94.2%' }} title="检验合格" />
              <div className="bg-amber-500 h-full" style={{ width: '4.8%' }} title="待验" />
              <div className="bg-rose-500 h-full" style={{ width: '1.0%' }} title="隔离" />
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 mt-0.5">
              <span className="text-emerald-400">● 已合格放行</span>
              <span className="text-amber-400">● 待验快检中 (4.8%)</span>
              <span className="text-rose-400">● 异常隔离 (1.0%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Multi-System Integration Links (多系统数据源心跳与健康度) */}
      <div className="glass-panel rounded-xl p-3.5 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-cyan-500" />
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-slate-100 font-cyber">多系统数据集成链路 (直连架构)</h2>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono-tech flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            全系统直连
          </span>
        </div>

        {/* System link status items */}
        <div className="space-y-1.5 text-xs">
          {SYSTEM_INTEGRATIONS.map((sys) => (
            <div 
              key={sys.id} 
              onClick={() => onOpenSystemDetail && onOpenSystemDetail(sys)}
              className="p-1.5 rounded bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-200 font-mono-tech w-12">{sys.name}</span>
                <span className="text-[10px] text-slate-400 truncate max-w-[130px]">{sys.fullName.split(' ')[0]}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono-tech">
                <span className="text-slate-400">{sys.protocol}</span>
                <span className="text-cyan-400">{sys.latencyMs}ms</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
