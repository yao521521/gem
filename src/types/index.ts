export type EquipmentStatus = 'running' | 'idle' | 'stopped' | 'alarm';

export interface Position3D {
  x: number; // percentage in building/campus (0-100)
  y: number; // percentage (0-100)
  z: number; // floor or elevation (1-5)
}

export interface Equipment {
  id: string;
  code: string;
  name: string;
  category: '固体制剂核心' | '无菌注射制剂' | '包装联线' | '立体仓储' | '洁净公用工程';
  buildingId: string;
  workshopName: string;
  floor: number;
  status: EquipmentStatus;
  oee: number;
  runtimeHours: number;
  currentBatch?: string;
  drugName?: string;
  position3D: Position3D;
  telemetry: {
    speed?: number; // rpm
    pressure?: number; // kN or bar
    temp?: number; // °C
    vacuum?: number; // Pa / mbar
    vibration?: number; // mm/s
    power?: number; // kW
    yieldRate?: number; // %
  };
  lastMaintenance: string;
  maintenanceDueDays: number;
}

export interface Building {
  id: string;
  code: string;
  name: string;
  category: string;
  floors: number;
  areaM2: number;
  status: 'normal' | 'warning' | 'idle';
  equipmentCount: number;
  activeBatchCount: number;
  workshops: string[];
  description: string;
  cleanLevel: string;
}

export interface SystemIntegration {
  id: string;
  name: string;
  fullName: string;
  description: string;
  protocol: 'REST API' | 'OPC-UA' | 'DB Direct (ODBC/JDBC)' | 'MQTT' | 'Modbus TCP';
  syncFrequency: string;
  latencyMs: number;
  heartbeatStatus: 'online' | 'warning' | 'offline';
  todayTransfersCount: number;
  lastSyncTime: string;
  keyFields: string[];
}

export interface ProductionBatch {
  id: string;
  batchNo: string;
  drugName: string;
  spec: string;
  dosageForm: '薄膜包衣片' | '硬胶囊剂' | '注射用冻干粉针' | '小容量注射剂' | '颗粒剂';
  lineName: string;
  buildingName: string;
  planQty: number;
  finishedQty: number;
  unit: string;
  progressPercent: number;
  status: '领料配料' | '制粒混合' | '压片灌装' | '灭菌冻干' | '灯检包装' | 'QA放行中' | '已入库';
  operator: string;
  oee: number;
  deviationCount: number;
}

export interface EnvironmentalSensor {
  id: string;
  areaName: string;
  cleanGrade: 'B级' | 'C级' | 'D级' | 'CNC';
  type: 'temperature' | 'humidity' | 'differential_pressure' | 'air_velocity';
  value: number;
  unit: string;
  targetRange: [number, number];
  status: 'normal' | 'warning' | 'critical';
  trend: 'stable' | 'up' | 'down';
}

export interface FactoryAlarm {
  id: string;
  time: string;
  level: 'critical' | 'warning' | 'info';
  category: '工艺偏差' | '设备故障' | '洁净环境' | '质量预警' | '仓储物流';
  source: string;
  building: string;
  equipmentId?: string;
  description: string;
  suggestedAction: string;
  status: 'active' | 'processing' | 'resolved';
}

export interface AlignmentSection {
  id: string;
  title: string;
  iconName: string;
  keyConclusion: string;
  details: {
    subtitle: string;
    points: string[];
    riskOrNote?: string;
  }[];
  optionsCompared?: {
    name: string;
    pros: string;
    cons: string;
    costRisk: string;
    recommendation: '推荐' | '备选' | '不推荐';
  }[];
}

export interface ProjectTask {
  id: string;
  title: string;
  category: '3D建模' | '数据对接' | 'UI设计' | '硬件环境' | '客户协调';
  assignee: '青' | '杰' | '普' | '文' | '全员' | '发言人1 (厂方)' | string;
  role: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'normal';
  status: 'todo' | 'in_progress' | 'review' | 'done';
  description: string;
}
