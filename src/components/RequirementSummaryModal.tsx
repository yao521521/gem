import React from 'react';
import { 
  X, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Box, 
  Network, 
  Server, 
  Calendar,
  Sparkles,
  Layers
} from 'lucide-react';

interface RequirementSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequirementSummaryModal: React.FC<RequirementSummaryModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none animate-in fade-in">
      <div 
        className="w-full max-w-3xl bg-[#091122] border border-amber-500/40 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.2)] overflow-hidden flex flex-col max-h-[85vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 px-5 py-4 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 font-cyber">
                《制剂药厂BI大屏需求对齐与方案推进》纪要要点全景
              </h3>
              <p className="text-xs text-amber-300/80 font-mono-tech">
                MEETING ALIGNMENT MEMORANDUM & TECHNICAL SPECIFICATIONS
              </p>
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
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-200 leading-relaxed">
          {/* Executive Summary */}
          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30">
            <h4 className="font-bold text-amber-300 text-sm mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              会议背景与整体原则
            </h4>
            <p className="text-slate-300">
              项目工期紧凑、各系统协调难度大。报价中已充分保留后续变更与成本缓冲空间。核心展示对象为药厂4栋建筑，涵盖固体制剂车间、无菌注射车间、立库与动力公用工程。核心定位为<strong>集团高管参观决策驾驶舱</strong>与<strong>中控车间运行监测大屏</strong>。
            </p>
          </div>

          {/* 4 Core Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2 font-bold text-cyan-300 text-xs mb-2">
                <Box className="w-4 h-4 text-cyan-400" />
                <span>一、3D建模范围与精度共识</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li>• <strong>范围：</strong>园区共4栋核心建筑（5#生产楼、6#仓储楼、质检楼、动力楼）。</li>
                <li>• <strong>车间布局：</strong>含固体制剂多层结构，小隔间散置排布。洁净区禁止无人机拍摄，由厂方提供鸟瞰图与CAD。</li>
                <li>• <strong>设备精细度：</strong>全厂200+台设备，重复率低。统一采纳<strong>“外形级高精外观建模”</strong>，不做零件级机械爆炸图。</li>
                <li>• <strong>状态灯位：</strong>绿色(运行)、蓝色(待机)、灰色(停机)、橙红脉冲(异常报警)。</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2 font-bold text-emerald-300 text-xs mb-2">
                <Network className="w-4 h-4 text-emerald-400" />
                <span>二、多系统数据对接与技术路径</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li>• <strong>数据源：</strong>MES(批次/OEE/进度)、WMS(立库利用率/AGV)、SCADA(主压/转速/温湿度)、LIMS(检验放行)、EMS(压差梯度)。</li>
                <li>• <strong>防转译失真：</strong>避免多层第三方中间件转译，优先采用只读数据库视图(ODBC/JDBC)或官方接口直连。</li>
                <li>• <strong>前置缓存：</strong>增设In-Memory高速缓存层，生产网与大屏物理隔离，零生产停机风险。</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2 font-bold text-sky-300 text-xs mb-2">
                <Calendar className="w-4 h-4 text-sky-400" />
                <span>三、样例设计与时间节点</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li>• <strong>首期交付：</strong>下周二前率先出具<strong>两页高保真样例效果图</strong>供领导层对齐。</li>
                <li>• <strong>第1页：</strong>【管理驾驶舱】全厂宏观产能、批次交付、质量雷达与能耗。</li>
                <li>• <strong>第2页：</strong>【车间监控孪生屏】单车间产线透视、压差梯度阶梯与设备运行状态。</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2 font-bold text-amber-300 text-xs mb-2">
                <Server className="w-4 h-4 text-amber-400" />
                <span>四、硬件部署与运维安全</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li>• <strong>硬件配置：</strong>独立高性能图形渲染工作站驱动超清LED物理拼墙（支持16:9 / 21:9 超宽映射）。</li>
                <li>• <strong>网络隔离：</strong>部署于药厂内部物理隔离局域网，不接入公网，严格满足GMP计算机化系统合规要求。</li>
                <li>• <strong>责任分工：</strong>青(UI/前端)、杰(3D建模)、普(数据对接)、文(硬件与合规)。</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono-tech">
            AI Studio 构建引擎已完成全部业务建模与页面落地
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold transition-colors"
          >
            返回大屏系统
          </button>
        </div>
      </div>
    </div>
  );
};
