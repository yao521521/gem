import React from 'react';
import { Equipment } from '../types';
import { 
  X, 
  Activity, 
  Gauge, 
  Cpu, 
  Clock, 
  Calendar, 
  Layers, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Wrench,
  Radio,
  FileCheck
} from 'lucide-react';

interface EquipmentDetailModalProps {
  equipment: Equipment | null;
  onClose: () => void;
}

export const EquipmentDetailModal: React.FC<EquipmentDetailModalProps> = ({
  equipment,
  onClose
}) => {
  if (!equipment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in select-none">
      <div 
        className="w-full max-w-2xl bg-[#091122] border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 px-5 py-3.5 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-3 h-3 rounded-full ${
              equipment.status === 'running' ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' :
              equipment.status === 'alarm' ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e] animate-ping' :
              equipment.status === 'idle' ? 'bg-sky-400' : 'bg-slate-500'
            }`} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-100 font-cyber">{equipment.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-mono-tech">
                  {equipment.code}
                </span>
              </div>
              <span className="text-xs text-slate-400">{equipment.workshopName} • {equipment.category}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Status & OEE banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-400">运行状态</div>
              <div className="text-sm font-bold mt-0.5 font-mono-tech flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${
                  equipment.status === 'running' ? 'bg-emerald-400' :
                  equipment.status === 'alarm' ? 'bg-rose-500' :
                  equipment.status === 'idle' ? 'bg-sky-400' : 'bg-slate-400'
                }`} />
                <span className={
                  equipment.status === 'running' ? 'text-emerald-400' :
                  equipment.status === 'alarm' ? 'text-rose-400' :
                  equipment.status === 'idle' ? 'text-sky-300' : 'text-slate-400'
                }>
                  {equipment.status === 'running' ? '正常运行中' :
                   equipment.status === 'alarm' ? '异常报警' :
                   equipment.status === 'idle' ? '待机待料' : '计划停机'}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-400">设备综合效率 OEE</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5 font-mono-tech">
                {equipment.oee}%
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-400">累计运行时长</div>
              <div className="text-sm font-bold text-slate-200 mt-0.5 font-mono-tech">
                {equipment.runtimeHours.toLocaleString()} 小时
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-400">距下次定保周期</div>
              <div className={`text-sm font-bold mt-0.5 font-mono-tech ${
                equipment.maintenanceDueDays < 0 ? 'text-rose-400' :
                equipment.maintenanceDueDays <= 3 ? 'text-amber-400' : 'text-cyan-300'
              }`}>
                {equipment.maintenanceDueDays < 0 ? `逾期 ${Math.abs(equipment.maintenanceDueDays)} 天` : `${equipment.maintenanceDueDays} 天后`}
              </div>
            </div>
          </div>

          {/* Current Batch Information */}
          {equipment.currentBatch && (
            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-cyan-400 font-mono-tech">当前执行批次 (MES同步)</div>
                <div className="text-xs font-bold text-slate-100 mt-0.5 font-mono-tech">
                  {equipment.currentBatch} - {equipment.drugName}
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-cyan-950 border border-cyan-400/40 text-cyan-300 text-[11px] font-semibold">
                在制品生产中
              </span>
            </div>
          )}

          {/* SCADA Real-Time Telemetry Parameters */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 mb-2 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              SCADA / PLC 实时传感器遥测指标
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs font-mono-tech">
              {equipment.telemetry.speed !== undefined && (
                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">主轴/转速:</span>
                  <span className="text-cyan-300 font-bold">{equipment.telemetry.speed} rpm</span>
                </div>
              )}
              {equipment.telemetry.pressure !== undefined && (
                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">主压/工作压力:</span>
                  <span className="text-cyan-300 font-bold">{equipment.telemetry.pressure} kN</span>
                </div>
              )}
              {equipment.telemetry.temp !== undefined && (
                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">腔体温度:</span>
                  <span className="text-cyan-300 font-bold">{equipment.telemetry.temp} °C</span>
                </div>
              )}
              {equipment.telemetry.vacuum !== undefined && (
                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">真空度:</span>
                  <span className="text-cyan-300 font-bold">{equipment.telemetry.vacuum} Pa</span>
                </div>
              )}
              {equipment.telemetry.power !== undefined && (
                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">瞬时功率:</span>
                  <span className="text-cyan-300 font-bold">{equipment.telemetry.power} kW</span>
                </div>
              )}
              {equipment.telemetry.yieldRate !== undefined && (
                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">实时成品率:</span>
                  <span className="text-emerald-400 font-bold">{equipment.telemetry.yieldRate}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Micro Trend Waveform (Simulated live sparkline) */}
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <TrendingUp className="w-3.5 h-3.5" />
                近24小时工况稳定性波动曲线
              </span>
              <span className="text-[10px] font-mono-tech text-emerald-400">波动方差 &lt; 0.6% (正常)</span>
            </div>

            <div className="h-16 w-full flex items-end gap-1 pt-2">
              {[42, 45, 48, 47, 52, 58, 60, 59, 62, 64, 65, 63, 67, 72, 70, 74, 76, 75, 78, 80, 82, 85, 84, 88].map((h, i) => (
                <div key={i} className="flex-1 bg-slate-800 hover:bg-cyan-400 rounded-t transition-all flex flex-col justify-end" style={{ height: `${h}%` }}>
                  <div className="h-1 bg-cyan-400 rounded-t" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono-tech">
            最后维护归档: {equipment.lastMaintenance}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors"
          >
            关闭详情
          </button>
        </div>
      </div>
    </div>
  );
};
