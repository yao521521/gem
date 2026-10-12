import { Building, Equipment, ProductionBatch, EnvironmentalSensor, FactoryAlarm, SystemIntegration, AlignmentSection, ProjectTask } from '../types';

export const BUILDINGS: Building[] = [
  {
    id: 'b-5',
    code: '5# 生产楼',
    name: '固体制剂与无菌注射剂核心生产大楼',
    category: '制剂生产中心',
    floors: 4,
    areaM2: 18500,
    status: 'normal',
    equipmentCount: 86,
    activeBatchCount: 14,
    cleanLevel: 'B级 / C级 / D级',
    description: '涵盖口服固体制剂车间（压片、制粒、包衣、胶囊充填）、无菌注射剂洗烘灌封联线与冻干车间、自动化包装车间。',
    workshops: ['1F 包装与外包装联线车间', '2F 口服固体制剂车间(D级)', '3F 无菌注射剂车间(B/C级)', '4F HVAC净化空调机房']
  },
  {
    id: 'b-6',
    code: '6# 仓储楼',
    name: '自动化立体仓储与物流中枢',
    category: '智能物流中心',
    floors: 3,
    areaM2: 12000,
    status: 'normal',
    equipmentCount: 44,
    activeBatchCount: 8,
    cleanLevel: 'CNC / 常温阴凉',
    description: '配有18米高自动化堆垛机立体高架库、AGV调度枢纽、原辅料取样分装洁净室（D级）、成品恒温暂存区。',
    workshops: ['1F 原辅料入库与取样间', '2F 自动化立体堆垛仓库区', '3F 包装材料库与放行发运区']
  },
  {
    id: 'b-qa',
    code: '质检验楼',
    name: 'QC检验中心与QA质量放行大楼',
    category: '质量控制中心',
    floors: 3,
    areaM2: 6800,
    status: 'normal',
    equipmentCount: 48,
    activeBatchCount: 19,
    cleanLevel: 'C级 / B级局部百级',
    description: '理化实验室、高效液相色谱(HPLC)室、无菌检验室、阳性对照室、留样观察室及微生物限度检测室。',
    workshops: ['1F 留样库与理化前处理', '2F 仪器精密分析室(HPLC/GC)', '3F 微生物限度与无菌检验室']
  },
  {
    id: 'b-power',
    code: '改造与动力楼',
    name: '公用工程系统与综合动力中心',
    category: '公用能源中心',
    floors: 2,
    areaM2: 5200,
    status: 'warning',
    equipmentCount: 38,
    activeBatchCount: 0,
    cleanLevel: '工业级 / 封闭循环',
    description: '纯化水制备与多效蒸馏水注射用水(WFI)机组、纯蒸汽发生器、洁净压缩空气站、制冷循环机组与配电中控。',
    workshops: ['1F 纯化水与WFI注射用水制备站', '2F 洁净压空站与冷热源站']
  }
];

// Sample 30 primary detailed equipment models (representing the 216 total devices in factory)
export const KEY_EQUIPMENTS: Equipment[] = [
  // 5# Building - Oral Solid Dosage
  {
    id: 'eq-press-01',
    code: 'TP-201',
    name: '高速双出料旋转式压片机 #1',
    category: '固体制剂核心',
    buildingId: 'b-5',
    workshopName: '2F 口服固体制剂车间(D级)',
    floor: 2,
    status: 'running',
    oee: 92.4,
    runtimeHours: 3410,
    currentBatch: 'B20261011-A01',
    drugName: '阿莫西林克拉维酸钾片 0.375g',
    position3D: { x: 32, y: 44, z: 2 },
    telemetry: { speed: 68, pressure: 78.5, temp: 22.4, vibration: 0.8, power: 18.2, yieldRate: 99.6 },
    lastMaintenance: '2026-09-28',
    maintenanceDueDays: 17
  },
  {
    id: 'eq-press-02',
    code: 'TP-202',
    name: '高速双出料旋转式压片机 #2',
    category: '固体制剂核心',
    buildingId: 'b-5',
    workshopName: '2F 口服固体制剂车间(D级)',
    floor: 2,
    status: 'running',
    oee: 89.1,
    runtimeHours: 2950,
    currentBatch: 'B20261011-A03',
    drugName: '布洛芬缓释胶囊 0.3g(微丸压片)',
    position3D: { x: 38, y: 44, z: 2 },
    telemetry: { speed: 62, pressure: 72.1, temp: 22.8, vibration: 0.9, power: 17.5, yieldRate: 99.4 },
    lastMaintenance: '2026-09-20',
    maintenanceDueDays: 9
  },
  {
    id: 'eq-press-03',
    code: 'TP-203',
    name: '智能高效压片机 #3',
    category: '固体制剂核心',
    buildingId: 'b-5',
    workshopName: '2F 口服固体制剂车间(D级)',
    floor: 2,
    status: 'alarm',
    oee: 64.3,
    runtimeHours: 4120,
    currentBatch: 'B20261011-A08',
    drugName: '二甲双胍片 0.5g',
    position3D: { x: 44, y: 44, z: 2 },
    telemetry: { speed: 45, pressure: 94.2, temp: 26.1, vibration: 2.4, power: 21.0, yieldRate: 97.2 },
    lastMaintenance: '2026-08-15',
    maintenanceDueDays: -3
  },
  {
    id: 'eq-gran-01',
    code: 'FL-101',
    name: '沸腾制粒干燥机机组 300L',
    category: '固体制剂核心',
    buildingId: 'b-5',
    workshopName: '2F 口服固体制剂车间(D级)',
    floor: 2,
    status: 'running',
    oee: 94.0,
    runtimeHours: 1820,
    currentBatch: 'B20261011-A02',
    drugName: '头孢克肟分散片 0.1g',
    position3D: { x: 25, y: 35, z: 2 },
    telemetry: { speed: 850, pressure: 4.8, temp: 58.2, power: 34.5, yieldRate: 99.8 },
    lastMaintenance: '2026-10-02',
    maintenanceDueDays: 21
  },
  {
    id: 'eq-mix-01',
    code: 'MX-102',
    name: '三维运动混合机 1000L',
    category: '固体制剂核心',
    buildingId: 'b-5',
    workshopName: '2F 口服固体制剂车间(D级)',
    floor: 2,
    status: 'idle',
    oee: 84.5,
    runtimeHours: 2100,
    position3D: { x: 28, y: 52, z: 2 },
    telemetry: { speed: 0, power: 0.5, temp: 21.8, yieldRate: 100 },
    lastMaintenance: '2026-10-05',
    maintenanceDueDays: 24
  },
  {
    id: 'eq-coat-01',
    code: 'CT-201',
    name: '全封闭高效薄膜包衣机 350',
    category: '固体制剂核心',
    buildingId: 'b-5',
    workshopName: '2F 口服固体制剂车间(D级)',
    floor: 2,
    status: 'running',
    oee: 91.5,
    runtimeHours: 3200,
    currentBatch: 'B20261011-A01',
    drugName: '阿莫西林克拉维酸钾片 0.375g',
    position3D: { x: 50, y: 38, z: 2 },
    telemetry: { speed: 12, pressure: 3.2, temp: 46.5, power: 22.0, yieldRate: 99.7 },
    lastMaintenance: '2026-09-25',
    maintenanceDueDays: 14
  },
  {
    id: 'eq-caps-01',
    code: 'CP-201',
    name: '全自动硬胶囊充填机 3500型',
    category: '固体制剂核心',
    buildingId: 'b-5',
    workshopName: '2F 口服固体制剂车间(D级)',
    floor: 2,
    status: 'running',
    oee: 88.7,
    runtimeHours: 2600,
    currentBatch: 'B20261011-A04',
    drugName: '头孢克肟胶囊 0.1g',
    position3D: { x: 55, y: 48, z: 2 },
    telemetry: { speed: 3200, pressure: 5.6, temp: 22.1, power: 14.8, yieldRate: 99.5 },
    lastMaintenance: '2026-09-29',
    maintenanceDueDays: 18
  },

  // 5# Building - Sterile Injectable lines
  {
    id: 'eq-ster-01',
    code: 'IN-301',
    name: '无菌超声波洗烘灌封联线 #1',
    category: '无菌注射制剂',
    buildingId: 'b-5',
    workshopName: '3F 无菌注射剂车间(B/C级)',
    floor: 3,
    status: 'running',
    oee: 93.8,
    runtimeHours: 4180,
    currentBatch: 'B20261011-J01',
    drugName: '注射用奥美拉唑钠 40mg',
    position3D: { x: 30, y: 65, z: 3 },
    telemetry: { speed: 400, pressure: 6.2, temp: 310.0, power: 48.0, yieldRate: 99.85 },
    lastMaintenance: '2026-10-01',
    maintenanceDueDays: 20
  },
  {
    id: 'eq-lyo-01',
    code: 'LY-301',
    name: '真空冷冻干燥机组 30m² (FDA合规)',
    category: '无菌注射制剂',
    buildingId: 'b-5',
    workshopName: '3F 无菌注射剂车间(B/C级)',
    floor: 3,
    status: 'running',
    oee: 95.2,
    runtimeHours: 5200,
    currentBatch: 'B20261011-J01',
    drugName: '注射用奥美拉唑钠 40mg',
    position3D: { x: 42, y: 68, z: 3 },
    telemetry: { vacuum: 8.5, temp: -42.8, pressure: 0.08, power: 65.0, yieldRate: 99.9 },
    lastMaintenance: '2026-09-18',
    maintenanceDueDays: 7
  },
  {
    id: 'eq-lyo-02',
    code: 'LY-302',
    name: '真空冷冻干燥机组 30m² #2',
    category: '无菌注射制剂',
    buildingId: 'b-5',
    workshopName: '3F 无菌注射剂车间(B/C级)',
    floor: 3,
    status: 'running',
    oee: 94.6,
    runtimeHours: 4900,
    currentBatch: 'B20261011-J02',
    drugName: '注射用胸腺五肽 10mg',
    position3D: { x: 54, y: 68, z: 3 },
    telemetry: { vacuum: 9.1, temp: -44.2, pressure: 0.09, power: 63.8, yieldRate: 99.88 },
    lastMaintenance: '2026-09-12',
    maintenanceDueDays: 2
  },
  {
    id: 'eq-pack-01',
    code: 'PK-101',
    name: '全自动高速铝塑泡罩装盒一体机 #1',
    category: '包装联线',
    buildingId: 'b-5',
    workshopName: '1F 包装与外包装联线车间',
    floor: 1,
    status: 'running',
    oee: 91.0,
    runtimeHours: 3750,
    currentBatch: 'B20261010-A11',
    drugName: '阿莫西林克拉维酸钾片 0.375g',
    position3D: { x: 26, y: 22, z: 1 },
    telemetry: { speed: 280, pressure: 5.5, temp: 135.0, power: 24.5, yieldRate: 99.4 },
    lastMaintenance: '2026-09-24',
    maintenanceDueDays: 13
  },
  {
    id: 'eq-pack-02',
    code: 'PK-102',
    name: '机器人自动装箱贴标码垛系统',
    category: '包装联线',
    buildingId: 'b-5',
    workshopName: '1F 包装与外包装联线车间',
    floor: 1,
    status: 'running',
    oee: 96.5,
    runtimeHours: 1980,
    currentBatch: 'B20261010-A11',
    position3D: { x: 48, y: 22, z: 1 },
    telemetry: { speed: 35, pressure: 6.0, temp: 23.5, power: 12.0, yieldRate: 99.95 },
    lastMaintenance: '2026-10-04',
    maintenanceDueDays: 23
  },

  // 6# Building - WMS & Logistics
  {
    id: 'eq-wms-01',
    code: 'ASRS-01',
    name: '18米双立柱自动化堆垛机 #1',
    category: '立体仓储',
    buildingId: 'b-6',
    workshopName: '2F 自动化立体堆垛仓库区',
    floor: 2,
    status: 'running',
    oee: 96.0,
    runtimeHours: 4800,
    position3D: { x: 68, y: 42, z: 2 },
    telemetry: { speed: 180, power: 32.0, yieldRate: 100 },
    lastMaintenance: '2026-09-22',
    maintenanceDueDays: 11
  },
  {
    id: 'eq-wms-02',
    code: 'ASRS-02',
    name: '18米双立柱自动化堆垛机 #2',
    category: '立体仓储',
    buildingId: 'b-6',
    workshopName: '2F 自动化立体堆垛仓库区',
    floor: 2,
    status: 'running',
    oee: 95.2,
    runtimeHours: 4720,
    position3D: { x: 74, y: 42, z: 2 },
    telemetry: { speed: 175, power: 31.5, yieldRate: 100 },
    lastMaintenance: '2026-09-22',
    maintenanceDueDays: 11
  },
  {
    id: 'eq-agv-01',
    code: 'AGV-01',
    name: '激光SLAM导航无轨搬运AGV #1',
    category: '立体仓储',
    buildingId: 'b-6',
    workshopName: '1F 原辅料入库与取样间',
    floor: 1,
    status: 'running',
    oee: 93.4,
    runtimeHours: 1420,
    position3D: { x: 65, y: 28, z: 1 },
    telemetry: { speed: 1.4, power: 1.8, temp: 24.0, yieldRate: 100 },
    lastMaintenance: '2026-10-03',
    maintenanceDueDays: 22
  },
  {
    id: 'eq-agv-02',
    code: 'AGV-02',
    name: '激光SLAM导航无轨搬运AGV #2',
    category: '立体仓储',
    buildingId: 'b-6',
    workshopName: '1F 原辅料入库与取样间',
    floor: 1,
    status: 'idle',
    oee: 88.0,
    runtimeHours: 1390,
    position3D: { x: 72, y: 28, z: 1 },
    telemetry: { speed: 0, power: 0.2, temp: 23.5, yieldRate: 100 },
    lastMaintenance: '2026-10-03',
    maintenanceDueDays: 22
  },

  // Power & Utilities Building
  {
    id: 'eq-pw-01',
    code: 'PW-101',
    name: '双级反渗透+EDI纯化水制备机组 10t/h',
    category: '洁净公用工程',
    buildingId: 'b-power',
    workshopName: '1F 纯化水与WFI注射用水制备站',
    floor: 1,
    status: 'running',
    oee: 98.2,
    runtimeHours: 7200,
    position3D: { x: 22, y: 78, z: 1 },
    telemetry: { speed: 2900, pressure: 8.5, temp: 25.4, power: 45.0, yieldRate: 99.98 },
    lastMaintenance: '2026-09-15',
    maintenanceDueDays: 5
  },
  {
    id: 'eq-wfi-01',
    code: 'WFI-101',
    name: '多效蒸馏水注射用水(WFI)机组 5t/h',
    category: '洁净公用工程',
    buildingId: 'b-power',
    workshopName: '1F 纯化水与WFI注射用水制备站',
    floor: 1,
    status: 'running',
    oee: 99.1,
    runtimeHours: 7150,
    position3D: { x: 30, y: 78, z: 1 },
    telemetry: { pressure: 4.2, temp: 86.8, power: 55.0, yieldRate: 100 },
    lastMaintenance: '2026-09-15',
    maintenanceDueDays: 5
  },
  {
    id: 'eq-ps-01',
    code: 'PS-101',
    name: '纯蒸汽发生器 3t/h (GMP标准)',
    category: '洁净公用工程',
    buildingId: 'b-power',
    workshopName: '1F 纯化水与WFI注射用水制备站',
    floor: 1,
    status: 'running',
    oee: 97.4,
    runtimeHours: 6800,
    position3D: { x: 38, y: 78, z: 1 },
    telemetry: { pressure: 3.8, temp: 142.5, power: 42.0, yieldRate: 100 },
    lastMaintenance: '2026-09-10',
    maintenanceDueDays: 1
  },
  {
    id: 'eq-hvac-01',
    code: 'HVAC-01',
    name: '3#生产楼B级净化空调循环机组 AHU-01',
    category: '洁净公用工程',
    buildingId: 'b-power',
    workshopName: '2F 洁净压空站与冷热源站',
    floor: 2,
    status: 'running',
    oee: 96.8,
    runtimeHours: 8100,
    position3D: { x: 45, y: 82, z: 2 },
    telemetry: { speed: 1450, pressure: 480, temp: 19.8, power: 37.0, yieldRate: 100 },
    lastMaintenance: '2026-09-30',
    maintenanceDueDays: 19
  }
];

export const PRODUCTION_BATCHES: ProductionBatch[] = [
  {
    id: 'b-1',
    batchNo: 'B20261011-A01',
    drugName: '阿莫西林克拉维酸钾片',
    spec: '0.375g * 24片/盒',
    dosageForm: '薄膜包衣片',
    lineName: '5#生产楼 固体制剂2号线',
    buildingName: '5# 生产楼',
    planQty: 250000,
    finishedQty: 198000,
    unit: '片',
    progressPercent: 79.2,
    status: '压片灌装',
    operator: '张建军(主管)',
    oee: 92.4,
    deviationCount: 0
  },
  {
    id: 'b-2',
    batchNo: 'B20261011-J01',
    drugName: '注射用奥美拉唑钠',
    spec: '40mg * 10支/盒',
    dosageForm: '注射用冻干粉针',
    lineName: '5#生产楼 无菌注射剂1号线',
    buildingName: '5# 生产楼',
    planQty: 80000,
    finishedQty: 68000,
    unit: '支',
    progressPercent: 85.0,
    status: '灭菌冻干',
    operator: '李晓敏(班长)',
    oee: 95.2,
    deviationCount: 0
  },
  {
    id: 'b-3',
    batchNo: 'B20261011-A02',
    drugName: '头孢克肟分散片',
    spec: '0.1g * 12片/板',
    dosageForm: '薄膜包衣片',
    lineName: '5#生产楼 固体制剂1号线',
    buildingName: '5# 生产楼',
    planQty: 150000,
    finishedQty: 142500,
    unit: '片',
    progressPercent: 95.0,
    status: '灯检包装',
    operator: '王志刚',
    oee: 94.0,
    deviationCount: 0
  },
  {
    id: 'b-4',
    batchNo: 'B20261011-A04',
    drugName: '头孢克肟胶囊',
    spec: '0.1g * 20粒/盒',
    dosageForm: '硬胶囊剂',
    lineName: '5#生产楼 胶囊充填联线',
    buildingName: '5# 生产楼',
    planQty: 120000,
    finishedQty: 54000,
    unit: '粒',
    progressPercent: 45.0,
    status: '制粒混合',
    operator: '陈雪',
    oee: 88.7,
    deviationCount: 1
  },
  {
    id: 'b-5',
    batchNo: 'B20261011-A08',
    drugName: '盐酸二甲双胍片',
    spec: '0.5g * 48片/盒',
    dosageForm: '薄膜包衣片',
    lineName: '5#生产楼 固体制剂3号线',
    buildingName: '5# 生产楼',
    planQty: 300000,
    finishedQty: 105000,
    unit: '片',
    progressPercent: 35.0,
    status: '压片灌装',
    operator: '刘伟',
    oee: 64.3,
    deviationCount: 2
  },
  {
    id: 'b-6',
    batchNo: 'B20261010-A11',
    drugName: '布洛芬缓释胶囊',
    spec: '0.3g * 30粒/瓶',
    dosageForm: '硬胶囊剂',
    lineName: '5#生产楼 高速泡罩外包线',
    buildingName: '5# 生产楼',
    planQty: 90000,
    finishedQty: 88200,
    unit: '瓶',
    progressPercent: 98.0,
    status: 'QA放行中',
    operator: '赵海峰',
    oee: 96.5,
    deviationCount: 0
  }
];

export const ENVIRONMENTAL_SENSORS: EnvironmentalSensor[] = [
  {
    id: 'env-1',
    areaName: '5#楼 3F无菌注射剂灌装核心区 (B级背景)',
    cleanGrade: 'B级',
    type: 'differential_pressure',
    value: 52.4,
    unit: 'Pa',
    targetRange: [45.0, 65.0],
    status: 'normal',
    trend: 'stable'
  },
  {
    id: 'env-2',
    areaName: '5#楼 3F无菌灌装辅助走廊 (C级)',
    cleanGrade: 'C级',
    type: 'differential_pressure',
    value: 36.8,
    unit: 'Pa',
    targetRange: [30.0, 45.0],
    status: 'normal',
    trend: 'stable'
  },
  {
    id: 'env-3',
    areaName: '5#楼 2F固体制剂压片洁净室 (D级)',
    cleanGrade: 'D级',
    type: 'differential_pressure',
    value: 22.1,
    unit: 'Pa',
    targetRange: [18.0, 28.0],
    status: 'normal',
    trend: 'stable'
  },
  {
    id: 'env-4',
    areaName: '5#楼 2F压片洁净室温湿度',
    cleanGrade: 'D级',
    type: 'temperature',
    value: 22.3,
    unit: '°C',
    targetRange: [18.0, 24.0],
    status: 'normal',
    trend: 'stable'
  },
  {
    id: 'env-5',
    areaName: '5#楼 2F压片洁净室相对湿度',
    cleanGrade: 'D级',
    type: 'humidity',
    value: 51.6,
    unit: '%RH',
    targetRange: [45.0, 65.0],
    status: 'normal',
    trend: 'stable'
  },
  {
    id: 'env-6',
    areaName: '5#楼 3F冻干装卸料区压差梯度',
    cleanGrade: 'B级',
    type: 'differential_pressure',
    value: 48.2,
    unit: 'Pa',
    targetRange: [40.0, 60.0],
    status: 'normal',
    trend: 'stable'
  },
  {
    id: 'env-7',
    areaName: '动力楼 纯化水电导率在线监测',
    cleanGrade: 'CNC',
    type: 'air_velocity',
    value: 0.88,
    unit: 'μS/cm',
    targetRange: [0.1, 1.1],
    status: 'normal',
    trend: 'stable'
  },
  {
    id: 'env-8',
    areaName: '动力楼 WFI注射用水电导率(85℃)',
    cleanGrade: 'CNC',
    type: 'air_velocity',
    value: 0.42,
    unit: 'μS/cm',
    targetRange: [0.05, 0.55],
    status: 'normal',
    trend: 'stable'
  }
];

export const SYSTEM_INTEGRATIONS: SystemIntegration[] = [
  {
    id: 'sys-mes',
    name: 'MES',
    fullName: '制药制造执行系统 (Siemens Opcenter Pharma)',
    description: '核心负责电子批记录(eBR)、工单派发、批次投料防错、工序节拍及OEE统计。',
    protocol: 'REST API',
    syncFrequency: '5秒 / 实时推流',
    latencyMs: 38,
    heartbeatStatus: 'online',
    todayTransfersCount: 184520,
    lastSyncTime: '刚刚',
    keyFields: ['batch_id', 'drug_code', 'oee_score', 'step_status', 'plan_qty', 'actual_qty']
  },
  {
    id: 'sys-wms',
    name: 'WMS',
    fullName: '智能立库与物流仓储系统',
    description: '负责6#立体仓库位利用率、原辅料条码追溯、放行状态校验与AGV自动调度指令。',
    protocol: 'DB Direct (ODBC/JDBC)',
    syncFrequency: '10秒',
    latencyMs: 62,
    heartbeatStatus: 'online',
    todayTransfersCount: 92400,
    lastSyncTime: '5秒前',
    keyFields: ['pallet_id', 'location_code', 'agv_task_state', 'stock_in_out', 'qa_release_flag']
  },
  {
    id: 'sys-scada',
    name: 'SCADA / PLC',
    fullName: '产线集散控制与高速PLC自控网',
    description: '实时采集200+台设备转速、主压压力、片重差异、电机振动与温度。',
    protocol: 'OPC-UA',
    syncFrequency: '1秒 (高频心跳)',
    latencyMs: 16,
    heartbeatStatus: 'online',
    todayTransfersCount: 864000,
    lastSyncTime: '1秒前',
    keyFields: ['tag_speed', 'tag_pressure', 'tag_vacuum', 'tag_power', 'alarm_word']
  },
  {
    id: 'sys-lims',
    name: 'LIMS',
    fullName: '实验室信息管理系统 (QC/QA)',
    description: '管理检验工单、原辅料快检、中间品均一性、成品批放行及微生物限度检测。',
    protocol: 'REST API',
    syncFrequency: '30秒',
    latencyMs: 85,
    heartbeatStatus: 'online',
    todayTransfersCount: 14800,
    lastSyncTime: '12秒前',
    keyFields: ['sample_id', 'test_item', 'result_value', 'release_status', 'qa_signature']
  },
  {
    id: 'sys-ems',
    name: 'EMS / BMS',
    fullName: '洁净环境在线监测与建筑能耗管理系统',
    description: '监测全厂D级/C级/B级洁净室压差梯度、温湿度、尘埃粒子、纯化水WFI水质回路。',
    protocol: 'Modbus TCP',
    syncFrequency: '3秒',
    latencyMs: 24,
    heartbeatStatus: 'online',
    todayTransfersCount: 382000,
    lastSyncTime: '2秒前',
    keyFields: ['dp_value', 'temp_deg', 'rh_percent', 'particle_05', 'conductivity']
  }
];

export const FACTORY_ALARMS: FactoryAlarm[] = [
  {
    id: 'alm-1',
    time: '19:08:42',
    level: 'critical',
    category: '工艺偏差',
    source: 'TP-203 智能高速压片机 #3',
    building: '5# 生产楼 2F',
    equipmentId: 'eq-press-03',
    description: '主压压力持续偏高(94.2 kN > 警戒线90 kN)，伴随转速自动降频，片重离散度上升。',
    suggestedAction: '建议工艺班长停机检查模冲磨损与预压机构，复测微丸流动性。',
    status: 'active'
  },
  {
    id: 'alm-2',
    time: '18:55:10',
    level: 'warning',
    category: '设备故障',
    source: 'PS-101 纯蒸汽发生器',
    building: '改造与动力楼 1F',
    equipmentId: 'eq-ps-01',
    description: '冷凝排放回路温控阀动作反馈微滞后(延迟1.8s)，蒸汽压力轻微波动。',
    suggestedAction: '动力班组已派遣工程师现场核验气动执行机构定位器。',
    status: 'processing'
  },
  {
    id: 'alm-3',
    time: '18:42:35',
    level: 'warning',
    category: '仓储物流',
    source: 'ASRS-02 立体堆垛机 #2',
    building: '6# 仓储楼 2F',
    equipmentId: 'eq-wms-02',
    description: '货位#4-12-08光电检测反射信号弱，出现重载取货二次校验提示。',
    suggestedAction: 'WMS系统已临时锁定该货位，引导AGV优先使用备用巷道。',
    status: 'resolved'
  },
  {
    id: 'alm-4',
    time: '17:30:19',
    level: 'info',
    category: '质量预警',
    source: 'QC-HPLC 1260液相色谱仪',
    building: '质检验楼 2F',
    description: '批次 B20261011-A01 阿莫西林含量均一性测定合格(RSD=1.12%)，已同步放行。',
    suggestedAction: 'LIMS已触发自动打标，通知5#楼包装线启动外包装联线。',
    status: 'resolved'
  }
];

// Meeting Alignment Items based directly on 纪要_制剂药厂BI大屏需求对齐与方案推进.pdf
export const ALIGNMENT_SECTIONS: AlignmentSection[] = [
  {
    id: 'sec-1',
    title: 'BI大屏展示范围与3D建模精度',
    iconName: 'Box',
    keyConclusion: '确定以园区4栋建筑为主体，设备模型采用外形级精细外观建模，不做内部零件爆炸分解；状态通过颜色直观呈现，确保渲染流畅度与预算可控。',
    details: [
      {
        subtitle: '空间结构与建模范围',
        points: [
          '园区包含4栋核心建筑：5#生产楼、6#仓储楼、质检验楼、改造与动力楼，围绕现有厂区进行宏观孪生布局。',
          '生产楼内部分层剖切：含固体制剂车间、无菌注射车间、包装车间等多层结构；车间内部小隔间（20~60㎡）散置排布。',
          '洁净室严苛管理：洁净区禁止无人机拍摄，由厂方提供既有鸟瞰规划图、厂房CAD平面图及各车间实拍照片作为建模输入。'
        ]
      },
      {
        subtitle: '设备建模精度与动态呈现',
        points: [
          '全厂设备总量约200+台，因同类型机型重复率较低（<25%），全部做精细内构成本不可控。',
          '决策方向：采用“外形级高精外观建模”，不做零件级机械拆卸或爆炸分解动画。',
          '运行状态色彩规范：运行中（翠绿）、待机（天蓝）、停机（冷灰）、告警/异常（橙红脉冲）。'
        ]
      }
    ],
    optionsCompared: [
      {
        name: '方案A：外形级建模 + 状态色彩映射 (最终采纳)',
        pros: '制作周期短，WebGL轻量化渲染帧率高(>50fps)，预算最优，完全满足高管参观与中控调度诉求。',
        cons: '无设备内部零部件机械运作透视。',
        costRisk: '成本低 / 交付风险极低',
        recommendation: '推荐'
      },
      {
        name: '方案B：高精构件建模 + 局部爆炸分解',
        pros: '视觉冲击力极强，支持查看压片冲模与灌装泵细微机械传动。',
        cons: '建模工作量暴增4倍，大屏端显卡压力过重，容易发生Web端掉帧卡顿。',
        costRisk: '成本极高 / 周期不可控',
        recommendation: '不推荐'
      },
      {
        name: '方案C：部分关键工艺动态粒子动画 (视二期预算)',
        pros: '在关键制粒、压片、冻干环节叠加物料流动粒子效果，增强科技感。',
        cons: '需结合二期现场PLC实时节拍数据深度适配。',
        costRisk: '成本适中 / 建议作为二期增项',
        recommendation: '备选'
      }
    ]
  },
  {
    id: 'sec-2',
    title: '多系统数据对接方式与技术难点',
    iconName: 'Network',
    keyConclusion: '避免繁琐的多层中间件转译失真，优先支持只读账号直连数据库(ODBC/JDBC)或成熟REST API/OPC-UA集成；建立数据缓存层，保障大屏毫秒级刷新。',
    details: [
      {
        subtitle: '对接系统源头矩阵',
        points: [
          'MES系统：获取品种进度、批号、生产工单、OEE综合指标与产线实际节拍。',
          'WMS系统：立体仓库位动态利用率、原辅料库存周转与AGV搬运指令。',
          'SCADA / DCS：压片机主压压力、转速、冻干真空度等关键工艺控制参数。',
          'LIMS系统：批放行检验合格率、快检状态与质检放行状态。',
          'EMS / BMS：洁净室D/C/B级压差梯度、温湿度及公用工程水电气能耗。'
        ]
      },
      {
        subtitle: '技术路径与避坑考量',
        points: [
          '风险防范：多系统接口规范不一，若经过第三方多层信息转译极易失真或延迟增大。',
          '推荐路径：MES/WMS采用官方只读库视图直连获取核心事实表；SCADA/EMS采用OPC-UA/Modbus高频推流。',
          '增设内存缓冲层（Redis/In-Memory Cache），大屏前端与生产数据库物理读写隔离，确保生产系统零停机风险。'
        ]
      }
    ]
  },
  {
    id: 'sec-3',
    title: '方案样例设计与交付计划',
    iconName: 'FileCheck',
    keyConclusion: '下周二前率先交付两页高保真样例效果图（含管理视角宏观屏与车间监控工艺屏），供高管与业务领导评审，快速收敛需求。',
    details: [
      {
        subtitle: '输入材料准备',
        points: [
          '厂方发言人提供厂区俯瞰总图、设备明细清单清单及4栋建筑CAD平面布局。',
          '提供MES、WMS、SCADA当前现有数据字典与关键字段样例。'
        ]
      },
      {
        subtitle: '两页样例输出规格',
        points: [
          '第1页：【高层管理视角】宏观驾驶舱，侧重集团参观、全厂综合产能、批次总览、能耗及质量雷达。',
          '第2页：【车间调度中控视角】工艺与设备数字孪生，侧重单车间产线透视、压差梯度、设备实时参数与异常告警。'
        ]
      }
    ]
  },
  {
    id: 'sec-4',
    title: '硬件部署与后续运维考量',
    iconName: 'Server',
    keyConclusion: '支持大屏私有化离线部署，独立高性能渲染工作站驱动超清LED物理拼墙；内网网络隔离，满足药监GMP计算机化系统附录合规。',
    details: [
      {
        subtitle: '大屏硬件与显卡配置',
        points: [
          '大屏物理规格：超宽LED显示拼墙（支持16:9 / 21:9 分辨率点对点映射）。',
          '渲染主机：配置独立图形工作站（建议RTX 4080/4090及以上），支持多屏同步分发。'
        ]
      },
      {
        subtitle: '网络隔离与数据安全',
        points: [
          '由于制药企业商业机密与GMP法规要求，大屏系统部署于药厂内部隔离专网。',
          '严格限制外部公网访问，支持内部局域网浏览器授权终端（领导办公室、中控室）。'
        ]
      }
    ]
  }
];

export const PROJECT_TASKS: ProjectTask[] = [
  {
    id: 'task-1',
    title: '提供厂区CAD平面图与设备清单分类',
    category: '客户协调',
    assignee: '发言人1 (厂方)',
    role: '制剂药厂信息化对接人',
    dueDate: '2026-10-13',
    priority: 'high',
    status: 'done',
    description: '整理4栋楼建筑平面CAD图、200+台设备型号台账及洁净区鸟瞰照片。'
  },
  {
    id: 'task-2',
    title: '两页高保真BI大屏样例设计与评审',
    category: 'UI设计',
    assignee: '青',
    role: 'BI前端与视觉架构师',
    dueDate: '下周二 (2026-10-14)',
    priority: 'high',
    status: 'in_progress',
    description: '完成管理视角驾驶舱与车间监控孪生屏两页交互原型，供领导层决策对齐。'
  },
  {
    id: 'task-3',
    title: '4栋建筑与核心设备外形级3D建模',
    category: '3D建模',
    assignee: '杰',
    role: '三维数字孪生工程师',
    dueDate: '2026-10-17',
    priority: 'high',
    status: 'in_progress',
    description: '按外形级标准建立5#生产楼、6#仓储楼、质检楼、动力楼及核心压片/灌装/冷冻机模型。'
  },
  {
    id: 'task-4',
    title: '多系统(MES/WMS/SCADA)数据直连接口技术预研',
    category: '数据对接',
    assignee: '普',
    role: '系统集成与后端工程师',
    dueDate: '2026-10-16',
    priority: 'high',
    status: 'in_progress',
    description: '对齐MES、WMS只读数据库视图授权，测试OPC-UA采集网关与Redis缓存方案。'
  },
  {
    id: 'task-5',
    title: '大屏硬件选型与GMP计算机系统合规评估',
    category: '硬件环境',
    assignee: '文',
    role: '基础设施与合规专员',
    dueDate: '2026-10-18',
    priority: 'medium',
    status: 'todo',
    description: '评估独立渲染工作站配置、现场LED拼墙点对点分辨率及内网安全隔离审计。'
  }
];
