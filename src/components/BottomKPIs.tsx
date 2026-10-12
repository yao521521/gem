import React from 'react';
import { 
  TrendingUp, 
  Gauge, 
  Award, 
  Zap, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Cpu
} from 'lucide-react';

export const BottomKPIs: React.FC = () => {
  const kpis = [
    {
      title: '今日制剂总产量',
      value: '1,428,500',
      unit: '片/支',
      subtext: '日计划达成率 98.4%',
      trend: '+4.2%',
      isPositive: true,
      icon: TrendingUp,
      color: 'text-cyan-400',
      badgeBg: 'bg-cyan-950/60 border-cyan-500/30'
    },
    {
      title: '全厂设备综合效率 (OEE)',
      value: '88.6%',
      unit: '',
      subtext: '固体制剂 91.2% / 注射剂 94.8%',
      trend: '+1.8%',
      isPositive: true,
      icon: Gauge,
      color: 'text-emerald-400',
      badgeBg: 'bg-emerald-950/60 border-emerald-500/30'
    },
    {
      title: '产品批放行合格率',
      value: '99.85%',
      unit: '',
      subtext: '近30天0批次重大召回',
      trend: 'GMP合规',
      isPositive: true,
      icon: Award,
      color: 'text-sky-300',
      badgeBg: 'bg-sky-950/60 border-sky-500/30'
    },
    {
      title: '在运设备总负荷',
      value: '178 / 216',
      unit: '台',
      subtext: '设备综合开机率 82.4%',
      trend: '运转正常',
      isPositive: true,
      icon: Cpu,
      color: 'text-indigo-300',
      badgeBg: 'bg-indigo-950/60 border-indigo-500/30'
    },
    {
      title: '吨产品综合单耗',
      value: '142.6',
      unit: 'kWh/万片',
      subtext: '较环比下降 3.5% (绿色节能)',
      trend: '-3.5%',
      isPositive: true,
      icon: Zap,
      color: 'text-amber-300',
      badgeBg: 'bg-amber-950/60 border-amber-500/30'
    },
    {
      title: '安全生产无事故',
      value: '1,482',
      unit: '天',
      subtext: '连续安全平稳运行中',
      trend: '安全受控',
      isPositive: true,
      icon: ShieldCheck,
      color: 'text-emerald-400',
      badgeBg: 'bg-emerald-950/60 border-emerald-500/30'
    }
  ];

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 select-none">
      {kpis.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div
            key={index}
            className="glass-panel rounded-xl p-2.5 shadow-md hover:border-cyan-400/40 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-slate-400 truncate max-w-[110px]">{item.title}</span>
              <IconComponent className={`w-3.5 h-3.5 ${item.color}`} />
            </div>

            <div className="flex items-baseline gap-1 my-0.5">
              <span className="text-lg lg:text-xl font-bold text-slate-100 font-mono-tech tracking-tight">
                {item.value}
              </span>
              {item.unit && <span className="text-[10px] text-slate-400">{item.unit}</span>}
            </div>

            <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-800/80">
              <span className="text-slate-400 truncate max-w-[90px]">{item.subtext}</span>
              <span className="font-mono-tech text-emerald-400 font-semibold">{item.trend}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
