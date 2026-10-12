import React, { useState } from 'react';
import { ALIGNMENT_SECTIONS, PROJECT_TASKS } from '../data/mockPharmaData';
import { AlignmentSection, ProjectTask } from '../types';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Box, 
  Network, 
  FileCheck, 
  Server, 
  ListTodo, 
  ChevronRight, 
  Sparkles, 
  Plus, 
  UserCheck, 
  ShieldCheck,
  Send,
  Download,
  Layers,
  Cpu
} from 'lucide-react';

export const AlignmentRoadmapView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sections' | 'tasks' | 'calculator'>('sections');
  const [tasks, setTasks] = useState<ProjectTask[]>(PROJECT_TASKS);
  const [selectedSection, setSelectedSection] = useState<AlignmentSection>(ALIGNMENT_SECTIONS[0]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState<'青' | '杰' | '普' | '文'>('青');

  // Toggle task status
  const handleToggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextStatus = t.status === 'done' ? 'todo' : t.status === 'todo' ? 'in_progress' : 'done';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: ProjectTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      category: '客户协调',
      assignee: newTaskAssignee,
      role: newTaskAssignee === '青' ? 'BI前端/UI架构' : newTaskAssignee === '杰' ? '3D孪生' : newTaskAssignee === '普' ? '系统数据' : '基础设施',
      dueDate: '待定',
      priority: 'high',
      status: 'in_progress',
      description: '新增需求对齐跟进项'
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  return (
    <div className="w-full flex flex-col gap-4 select-none pb-6">
      {/* Top Banner explaining the origin */}
      <div className="glass-panel-amber rounded-xl p-4 shadow-lg border border-amber-500/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-100 font-cyber">
                纪要落地看板：制剂药厂BI大屏需求对齐与方案推进
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-950 border border-amber-500/50 text-amber-300 font-mono-tech">
                项目对齐纪要成果
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              深度对齐大屏展示范围（4栋核心楼）、3D外观级建模精度、MES/WMS/SCADA直连路径、两页样例下周二交付及团队协作待办。
            </p>
          </div>
        </div>

        {/* Navigation Tabs inside the panel */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-lg border border-amber-500/30 text-xs">
          <button
            onClick={() => setActiveTab('sections')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'sections' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            4大核心议题对齐
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'tasks' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <ListTodo className="w-3.5 h-3.5" />
            <span>待办协作跟进</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'calculator' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            3D建模档位选型评估
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'sections' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column: 4 Sections Selector */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            {ALIGNMENT_SECTIONS.map((sec, idx) => {
              const isSelected = selectedSection.id === sec.id;
              return (
                <div
                  key={sec.id}
                  onClick={() => setSelectedSection(sec)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'glass-panel-amber border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                      : 'glass-panel border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-amber-400 font-mono-tech">
                      议题 0{idx + 1}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                      已达成共识
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-100 mb-1.5">
                    {sec.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {sec.keyConclusion}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed View of Selected Section */}
          <div className="lg:col-span-8 glass-panel rounded-xl p-5 shadow-lg border border-cyan-500/20 flex flex-col gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-amber-400 font-mono-tech">
                  议题推进方案详情
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                  方案对齐生效
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 font-cyber mb-2">
                {selectedSection.title}
              </h3>
              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed">
                <b className="text-amber-300">核心决策结论：</b>{selectedSection.keyConclusion}
              </div>
            </div>

            {/* Sub-points breakdown */}
            <div className="space-y-4">
              {selectedSection.details.map((item, idx) => (
                <div key={idx} className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
                  <h4 className="text-xs font-bold text-cyan-300 mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {item.subtitle}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-cyan-400/80 mt-0.5">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Options compared table if present */}
            {selectedSection.optionsCompared && (
              <div className="mt-2">
                <h4 className="text-xs font-bold text-slate-200 mb-2 flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5 text-amber-400" />
                  3D展示精度对比与决策矩阵
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {selectedSection.optionsCompared.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className={`p-3 rounded-lg border text-xs flex flex-col justify-between ${
                        opt.recommendation === '推荐'
                          ? 'bg-emerald-950/30 border-emerald-500/50 shadow-sm'
                          : opt.recommendation === '备选'
                          ? 'bg-slate-900/80 border-slate-700'
                          : 'bg-slate-950/80 border-slate-800 opacity-70'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-slate-100">{opt.name.split('：')[0]}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                            opt.recommendation === '推荐' ? 'bg-emerald-500 text-black' :
                            opt.recommendation === '备选' ? 'bg-sky-950 text-sky-300 border border-sky-500/40' :
                            'bg-slate-800 text-slate-400'
                          }`}>
                            {opt.recommendation}
                          </span>
                        </div>
                        <div className="text-[11px] text-emerald-300/90 mb-1">
                          <b>优势:</b> {opt.pros}
                        </div>
                        <div className="text-[11px] text-slate-400 mb-2">
                          <b>代价:</b> {opt.cons}
                        </div>
                      </div>
                      <div className="text-[10px] pt-1.5 border-t border-slate-800 font-mono-tech text-cyan-300">
                        {opt.costRisk}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Task Collaborations Tab */}
      {activeTab === 'tasks' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 flex flex-col gap-3">
            {/* Add Task Box */}
            <form onSubmit={handleAddTask} className="glass-panel p-3.5 rounded-xl flex gap-2 items-center">
              <input
                type="text"
                placeholder="添加新待办任务 (如: 催要5#楼2F压片洁净车间CAD平面图)..."
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
                className="flex-1 bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <select
                value={newTaskAssignee}
                onChange={e => setNewTaskAssignee(e.target.value as any)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:outline-none"
              >
                <option value="青">负责人: 青 (UI/前端)</option>
                <option value="杰">负责人: 杰 (3D孪生)</option>
                <option value="普">负责人: 普 (数据集成)</option>
                <option value="文">负责人: 文 (基础设施)</option>
              </select>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>添加</span>
              </button>
            </form>

            {/* Task list */}
            <div className="space-y-2.5">
              {tasks.map((task) => {
                const isDone = task.status === 'done';
                return (
                  <div
                    key={task.id}
                    onClick={() => handleToggleTask(task.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isDone
                        ? 'bg-slate-950/60 border-slate-800 opacity-60'
                        : 'glass-panel border-cyan-500/20 hover:border-cyan-500/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button className="mt-0.5 text-slate-400 hover:text-emerald-400">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-600 hover:border-cyan-400" />
                        )}
                      </button>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`text-xs font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                            {task.title}
                          </h4>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700 text-slate-300">
                            {task.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-snug">
                          {task.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0 text-right">
                      <span className="text-xs font-bold text-amber-300 font-mono-tech">
                        {task.assignee} ({task.role})
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono-tech flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        截止: {task.dueDate}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Team Responsibility Matrix */}
          <div className="lg:col-span-4 glass-panel rounded-xl p-4 border border-cyan-500/20 flex flex-col gap-3">
            <h3 className="text-xs font-bold text-slate-100 font-cyber flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-cyan-400" />
              团队人员分工与责任边界 (会议纪要明确)
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <div className="flex justify-between font-bold text-slate-200 mb-1">
                  <span className="text-cyan-300">青 (视觉与前端)</span>
                  <span className="text-emerald-400 font-mono-tech">推进中</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  负责下周二前交付两页样例效果图（管理驾驶舱 + 车间监控孪生屏），推进交互与UI板块对齐。
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <div className="flex justify-between font-bold text-slate-200 mb-1">
                  <span className="text-cyan-300">杰 (3D孪生技术)</span>
                  <span className="text-emerald-400 font-mono-tech">推进中</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  负责4栋核心大楼外形级模型、楼层剖切视图及200+台设备状态灯位映射，确保Web端流畅度。
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <div className="flex justify-between font-bold text-slate-200 mb-1">
                  <span className="text-cyan-300">普 (数据对接与架构)</span>
                  <span className="text-emerald-400 font-mono-tech">推进中</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  负责MES、WMS只读数据库视图与SCADA OPC-UA高频接口定义，避免中间件转译失真，建立缓存。
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <div className="flex justify-between font-bold text-slate-200 mb-1">
                  <span className="text-cyan-300">文 (基础设施与合规)</span>
                  <span className="text-sky-400 font-mono-tech">待办</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  负责独立渲染服务器选型、大屏物理点对点映射及药厂内部物理隔离局域网部署安全合规。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3D Precision Calculator Tab */}
      {activeTab === 'calculator' && (
        <div className="glass-panel rounded-xl p-5 border border-cyan-500/20 max-w-4xl mx-auto w-full">
          <h3 className="text-sm font-bold text-slate-100 font-cyber mb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            3D孪生建模档位选型评估与综合ROI
          </h3>
          <p className="text-xs text-slate-300 mb-4">
            针对制剂药厂200+台设备、4栋厂房进行技术路径选型评估。根据会议纪要，方案A为当前最具可行性的推荐方案。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-emerald-500/50 bg-emerald-950/20 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-emerald-300">方案A：外形级建模 (当前采纳)</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-black text-[10px] font-bold">最终共识</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 mb-3">
                  <li>• 建模对象：4栋建筑 + 200+台设备外形</li>
                  <li>• 零件拆解：不做机械爆炸图</li>
                  <li>• 状态映射：绿/蓝/灰/红灯位</li>
                  <li>• WebGL帧率：&gt; 55 FPS (极流畅)</li>
                  <li>• 硬件要求：标准工作站即可驱动</li>
                </ul>
              </div>
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-[11px] text-emerald-300 font-mono-tech">
                工期紧、预算可控、交付风险极低
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-200">方案B：高精构件+爆炸图</span>
                  <span className="px-1.5 py-0.5 rounded bg-rose-950 border border-rose-500/40 text-rose-300 text-[10px]">不推荐</span>
                </div>
                <ul className="text-xs text-slate-400 space-y-1.5 mb-3">
                  <li>• 建模对象：内构传动轴、冲模、阀门</li>
                  <li>• 零件拆解：支持多级爆炸分解</li>
                  <li>• 状态映射：动态机械动画</li>
                  <li>• WebGL帧率：20~30 FPS (显卡负荷重)</li>
                  <li>• 硬件要求：顶配双RTX 4090图形机</li>
                </ul>
              </div>
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-[11px] text-rose-400 font-mono-tech">
                重复率低导致成本暴增4倍，工期不可控
              </div>
            </div>

            <div className="p-4 rounded-xl border border-sky-800 bg-sky-950/20 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-sky-200">方案C：局部工艺粒子动画</span>
                  <span className="px-1.5 py-0.5 rounded bg-sky-950 border border-sky-500/40 text-sky-300 text-[10px]">二期增项</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 mb-3">
                  <li>• 建模对象：外形模型 + 核心流道粒子</li>
                  <li>• 零件拆解：仅做颗粒/液体管路流动</li>
                  <li>• 状态映射：根据PLC实时流速驱动</li>
                  <li>• WebGL帧率：45~50 FPS</li>
                  <li>• 硬件要求：主流图形渲染主机</li>
                </ul>
              </div>
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-[11px] text-sky-300 font-mono-tech">
                建议待一期顺利交付后作为二期升级
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
