import React from 'react';
import { PRODUCTION_BATCHES, ENVIRONMENTAL_SENSORS } from '../data/mockPharmaData';
import { ProductionBatch, EnvironmentalSensor } from '../types';
import { 
  ClipboardCheck, 
  Wind, 
  Droplets, 
  Thermometer, 
  TrendingUp, 
  AlertCircle, 
  Layers, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface LeftPanelProps {
  onSelectBatch?: (batch: ProductionBatch) => void;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({ onSelectBatch }) => {
  return (
    <div className="w-full flex flex-col gap-3.5 select-none">
      {/* 1. MES Production Execution & In-Progress Batches (MES品种进度与批次监控) */}
      <div className="glass-panel rounded-xl p-3.5 shadow-lg relative overflow-hidden">
        {/* Subtle accent border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-sky-400 to-transparent" />
        
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-slate-100 font-cyber">MES 批生产指令与品种进度</h2>
          </div>
          <span className="text-[10px] text-cyan-300 font-mono-tech bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
            在制批次: 6
          </span>
        </div>

        {/* Batch List */}
        <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
          {PRODUCTION_BATCHES.slice(0, 5).map((batch) => {
            let statusBadge = 'bg-cyan-950 text-cyan-300 border-cyan-500/40';
            if (batch.status === 'QA放行中') statusBadge = 'bg-emerald-950 text-emerald-300 border-emerald-500/40';
            if (batch.status === '灭菌冻干') statusBadge = 'bg-indigo-950 text-indigo-300 border-indigo-500/40';
            if (batch.deviationCount > 0) statusBadge = 'bg-amber-950 text-amber-300 border-amber-500/40';

            return (
              <div 
                key={batch.id}
                onClick={() => onSelectBatch && onSelectBatch(batch)}
                className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {batch.drugName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono-tech">
                      {batch.spec}
                    </span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${statusBadge}`}>
                    {batch.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono-tech">
                  <span>批号: {batch.batchNo}</span>
                  <span className="text-cyan-400 font-semibold">{batch.finishedQty.toLocaleString()} / {batch.planQty.toLocaleString()} {batch.unit}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full transition-all duration-500"
                    style={{ width: `${batch.progressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                  <span>产线: {batch.lineName}</span>
                  <div className="flex items-center gap-1.5">
                    <span>OEE: <b className="text-emerald-400 font-mono-tech">{batch.oee}%</b></span>
                    {batch.deviationCount > 0 ? (
                      <span className="text-amber-400 font-semibold flex items-center">
                        <AlertCircle className="w-2.5 h-2.5 mr-0.5" />偏差 {batch.deviationCount}
                      </span>
                    ) : (
                      <span className="text-emerald-400/80 flex items-center">
                        <CheckCircle2 className="w-2.5 h-2.5 mr-0.5" />0偏差
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. EMS / BMS Cleanroom Differential Pressure Gradient & Environment (洁净区压差梯度与温湿度) */}
      <div className="glass-panel rounded-xl p-3.5 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 to-indigo-500" />
        
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-sky-400" />
            <h2 className="text-sm font-bold text-slate-100 font-cyber">洁净室压差梯度与环境监测 (EMS)</h2>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono-tech flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            梯度合规
          </span>
        </div>

        {/* Visual Differential Pressure Cascade (压差阶梯图) */}
        <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800 mb-3">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
            <span>洁净梯度阶梯 (外走廊 &rarr; D级 &rarr; C级 &rarr; B级核心)</span>
            <span className="text-cyan-400 font-mono-tech">正压梯度 &ge; 10Pa/级</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-center font-mono-tech">
            <div className="p-1.5 rounded bg-slate-900/80 border border-slate-800">
              <div className="text-[9px] text-slate-400">CNC走廊</div>
              <div className="text-xs font-bold text-slate-300">0.0 Pa</div>
              <div className="text-[8px] text-slate-400">基准压</div>
            </div>
            <div className="p-1.5 rounded bg-cyan-950/40 border border-cyan-800/40">
              <div className="text-[9px] text-cyan-300">D级车间</div>
              <div className="text-xs font-bold text-cyan-300">+22.1 Pa</div>
              <div className="text-[8px] text-emerald-400">&Delta;P &gt; 10Pa</div>
            </div>
            <div className="p-1.5 rounded bg-sky-950/50 border border-sky-800/50">
              <div className="text-[9px] text-sky-300">C级辅助区</div>
              <div className="text-xs font-bold text-sky-300">+36.8 Pa</div>
              <div className="text-[8px] text-emerald-400">&Delta;P &gt; 12Pa</div>
            </div>
            <div className="p-1.5 rounded bg-indigo-950/60 border border-indigo-700/60">
              <div className="text-[9px] text-indigo-300">B级无菌区</div>
              <div className="text-xs font-bold text-indigo-300">+52.4 Pa</div>
              <div className="text-[8px] text-emerald-400">&Delta;P &gt; 15Pa</div>
            </div>
          </div>
        </div>

        {/* Real-time Environmental Sensors List */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {ENVIRONMENTAL_SENSORS.slice(3, 7).map((sensor) => (
            <div key={sensor.id} className="p-2 rounded bg-slate-900/60 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400 truncate max-w-[95px]">{sensor.areaName}</div>
                <div className="text-xs font-bold text-slate-100 font-mono-tech">
                  {sensor.value} <span className="text-[10px] text-slate-400 font-normal">{sensor.unit}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  正常
                </span>
                <div className="text-[9px] text-slate-400 mt-0.5 font-mono-tech">
                  [{sensor.targetRange[0]}-{sensor.targetRange[1]}]
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
