import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Factory3DTwin } from './components/Factory3DTwin';
import { LeftPanel } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { BottomKPIs } from './components/BottomKPIs';
import { AlignmentRoadmapView } from './components/AlignmentRoadmapView';
import { EquipmentDetailModal } from './components/EquipmentDetailModal';
import { RequirementSummaryModal } from './components/RequirementSummaryModal';
import { Equipment, ProductionBatch, FactoryAlarm } from './types';
import { KEY_EQUIPMENTS, BUILDINGS } from './data/mockPharmaData';
import { 
  Building2, 
  Layers, 
  Maximize2, 
  Activity, 
  Eye, 
  ChevronRight, 
  Radio, 
  SlidersHorizontal 
} from 'lucide-react';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'macro' | 'workshop' | 'alignment'>('macro');
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isRequirementModalOpen, setIsRequirementModalOpen] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  // When clicking an alarm that references an equipment, jump directly to it
  const handleSelectAlarm = (alarm: FactoryAlarm) => {
    if (alarm.equipmentId) {
      const eq = KEY_EQUIPMENTS.find(e => e.id === alarm.equipmentId);
      if (eq) {
        setSelectedEquipment(eq);
        setSelectedBuildingId(eq.buildingId);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Cyber Command Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        selectedBuildingId={selectedBuildingId}
        setSelectedBuildingId={setSelectedBuildingId}
        onOpenRequirementModal={() => setIsRequirementModalOpen(true)}
        isSimulating={isSimulating}
        setIsSimulating={setIsSimulating}
      />

      {/* Main Screen Body */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto p-2.5 sm:p-4 flex flex-col gap-3.5">
        {/* VIEW 1: 宏观管理驾驶舱 (Executive Presentation View) */}
        {activeView === 'macro' && (
          <div className="flex-1 flex flex-col gap-3.5">
            {/* Top 3-Column Panorama */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 flex-1">
              {/* Left Column: MES Batches & EMS Cleanroom (3.2 cols on xl) */}
              <div className="lg:col-span-3 xl:col-span-3 flex flex-col gap-3.5">
                <LeftPanel />
              </div>

              {/* Center Column: 3D Isometric Factory Digital Twin (6 cols on xl) */}
              <div className="lg:col-span-6 xl:col-span-6 flex flex-col">
                <Factory3DTwin
                  selectedBuildingId={selectedBuildingId}
                  setSelectedBuildingId={setSelectedBuildingId}
                  onSelectEquipment={setSelectedEquipment}
                  selectedEquipment={selectedEquipment}
                />
              </div>

              {/* Right Column: SCADA Alarms, WMS Logistics & System Links (3 cols on xl) */}
              <div className="lg:col-span-3 xl:col-span-3 flex flex-col gap-3.5">
                <RightPanel onSelectAlarm={handleSelectAlarm} />
              </div>
            </div>

            {/* Bottom Panoramic KPI Banner */}
            <BottomKPIs />
          </div>
        )}

        {/* VIEW 2: 车间生产中控孪生 (Process Engineering & Deep Dive) */}
        {activeView === 'workshop' && (
          <div className="flex-1 flex flex-col gap-4">
            {/* Split layout: 3D Twin on top/left, Equipment Inventory Table on right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-7">
                <Factory3DTwin
                  selectedBuildingId={selectedBuildingId}
                  setSelectedBuildingId={setSelectedBuildingId}
                  onSelectEquipment={setSelectedEquipment}
                  selectedEquipment={selectedEquipment}
                />
              </div>

              {/* Equipment Inventory & SCADA Telemetry Table */}
              <div className="lg:col-span-5 glass-panel rounded-xl p-4 border border-cyan-500/25 flex flex-col">
                <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-bold text-slate-100 font-cyber">
                      产线重点设备清单与实时工况 (200+台总览)
                    </h3>
                  </div>
                  <span className="text-[10px] text-cyan-300 font-mono-tech">
                    点击设备可深入查看SCADA遥测
                  </span>
                </div>

                <div className="flex-1 max-h-[500px] overflow-y-auto space-y-2 pr-1">
                  {KEY_EQUIPMENTS.map((eq) => (
                    <div
                      key={eq.id}
                      onClick={() => setSelectedEquipment(eq)}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                        selectedEquipment?.id === eq.id
                          ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2 h-2 rounded-full ${
                          eq.status === 'running' ? 'bg-emerald-400' :
                          eq.status === 'alarm' ? 'bg-rose-500 animate-ping' :
                          eq.status === 'idle' ? 'bg-sky-400' : 'bg-slate-400'
                        }`} />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-100">{eq.name}</span>
                            <span className="text-[10px] font-mono-tech text-cyan-300">{eq.code}</span>
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {eq.workshopName} • {eq.category}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end text-right">
                        <span className="text-xs font-bold text-emerald-400 font-mono-tech">
                          OEE {eq.oee}%
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono-tech">
                          {eq.telemetry.speed ? `${eq.telemetry.speed} rpm` : eq.telemetry.vacuum ? `${eq.telemetry.vacuum} Pa` : '就绪'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom KPIs */}
            <BottomKPIs />
          </div>
        )}

        {/* VIEW 3: 需求对齐与方案推进看板 (Requirements & Implementation Alignment Panel) */}
        {activeView === 'alignment' && (
          <AlignmentRoadmapView />
        )}
      </main>

      {/* Equipment Detailed SCADA Telemetry Modal */}
      <EquipmentDetailModal
        equipment={selectedEquipment}
        onClose={() => setSelectedEquipment(null)}
      />

      {/* Meeting Alignment Summary Modal */}
      <RequirementSummaryModal
        isOpen={isRequirementModalOpen}
        onClose={() => setIsRequirementModalOpen(false)}
      />
    </div>
  );
};
