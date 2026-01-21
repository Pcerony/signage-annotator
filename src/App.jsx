import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Map as MapIcon, 
  Upload, 
  ImageIcon, 
  Sliders, 
  PenTool, 
  BarChart2, 
  Trash2, 
  Sun,
  Contrast,
  Layers,
  List,
  MousePointer2,
  Plus,
  Folder,
  FolderOpen,
  Edit3,
  CornerUpLeft,
  X,
  Settings,
  Link as LinkIcon,
  Unlink,
  GripVertical,
  Filter,
  ZoomIn,
  ZoomOut,
  Save,
  RotateCcw,
  Hexagon,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  MapPin,
  FilePlus,
  Maximize,
  Download,
  UploadCloud,
  PieChart,
  Activity,
  Globe,
  Leaf,
  Cloud,
  Check
} from 'lucide-react';

// --- 翻译字典 ---
const TRANSLATIONS = {
  zh: {
    appTitle: "标识标注器",
    appSubtitle: "Signage Analytics",
    navMap: "平面图",
    navEditor: "标注详情",
    navStats: "数据看板",
    loadProject: "读取存档",
    saveProject: "保存项目",
    uploadMap: "上传植物园平面图",
    selectImage: "选择图片文件",
    mapToolbarView: "浏览/移动",
    mapToolbarAdd: "添加标识点",
    mapToolbarDrawZone: "绘制新区域",
    mapToolbarEditZone: "调整区域形状",
    zoneDrawTip: "请在地图上点击位置以绘制多边形区域",
    zoneClose: "闭合区域",
    undoPoint: "撤销点",
    placePinTip: "请在地图上点击位置以放置图片",
    listTitle: "标识清单",
    batchUpload: "批量添加图片",
    unlocatedFolder: "📍 未定点 (待放置)",
    unlocatedLabel: "点击地图放置",
    zoneUnzoned: "未分区",
    zoneSetting: "设置区域属性",
    editZoneTitle: "编辑区域属性",
    labelZoneId: "区域代号 (ID)",
    labelZoneName: "区域名称 (可选)",
    labelZoneColor: "区域颜色",
    btnSave: "保存",
    btnDeleteZone: "删除区域",
    confirmDeleteZone: "删除区域只会移除区域划分，图片将归入\"未分区\"，确定删除吗？",
    editorTitle: "图片工作台",
    backToMap: "返回",
    zoomLabel: "视图缩放",
    modeHighlight: "突出选区",
    modeDraw: "标注分析",
    highlightTitle: "标识区域选区",
    highlightDesc: "在图片上点击多个点以绘制多边形。闭合后，选区外部将变为黑白，突出内部的标识内容。",
    pointsCount: "已有点位",
    minPoints: "至少需3点",
    resetSelection: "重置选区",
    applySelection: "选区生效",
    imageParams: "图像参数",
    brightness: "亮度",
    contrast: "对比度",
    dimensionTitle: "分析维度",
    undo: "撤销",
    clear: "清空",
    notesTitle: "图片备注",
    notesPlaceholder: "在此输入文字备注...",
    saveChanges: "保存所有更改",
    statusSaving: "自动保存中...",
    statusSaved: "已同步",
    deletePin: "删除此点位",
    confirmDeletePin: "确定删除此标识点吗？此操作不可恢复。",
    currentModeHighlight: "突出选区模式",
    currentModeDraw: "标注分析模式",
    statsTitle: "标识系统数据看板",
    statsModeGroup: "统计模式: 按植物实体 (去重)",
    statsModeCount: "统计模式: 按图片累加",
    statTotalZones: "区域总数",
    statTotalPins: "标识点位总数",
    statTotalElements: "已分析元素",
    statTotalEntities: "涉及植物实体 (组)",
    statDominant: "主导维度",
    statDominantAtmosphere: "氛围感 (Atmosphere)",
    statDominantRelevance: "相关性 (Relevance)",
    statDominantClarity: "清晰度 (Clarity)",
    chartRadarTitle: "整体评价平衡 (Overall Balance)",
    chartStackTitle: "区域横向对比 (Zone Comparison)",
    chartZoneFeatures: "区域特征速览",
    chartDetailTitle: "细分指标分析 (Detailed Breakdown)",
    noData: "暂无数据",
    featureStrong: "强氛围感",
    featureHighRel: "高相关性",
    featureHighClear: "高清晰度",
    cat_A_group: "A. 氛围营造 (Inspirational Atmosphere)",
    cat_R_group: "R. 受众关联 (Audience Relevance)",
    cat_S_group: "S. 结构清晰 (Structural Clarity)",
    cat_A1: "A1: 提问与互动 (Inquiry & Interaction)",
    cat_A2: "A2: 叙事语调 (Narrative Tone)",
    cat_R1: "R1: 生活经验连接 (Life Exp. Connection)",
    cat_R2: "R2: 感官引导 (Sensory Guidance)",
    cat_S1: "S1: 信息层级 (Info Hierarchy)",
    cat_S2: "S2: 文本量控制 (Text Volume Control)",
    cat_S3: "S3: 图文融合 (Visual-Text Integration)",
    msgSaved: "保存成功！",
    msgLoadSuccess: "项目读取成功！",
    msgLoadErr: "文件格式错误，无法读取。",
    alertZoneExist: "区域 ID 已存在。",
    alertZone3Points: "区域至少需要3个点",
    removeFromGroup: "从组合中移除",
    mergeWithPrev: "与上一张合并"
  },
  en: {
    appTitle: "Signage Annotator",
    appSubtitle: "Professional Tool",
    navMap: "Map View",
    navEditor: "Editor",
    navStats: "Dashboard",
    loadProject: "Load Project",
    saveProject: "Save Project",
    uploadMap: "Upload Garden Map",
    selectImage: "Select Image File",
    mapToolbarView: "Browse / Move",
    mapToolbarAdd: "Add Pin",
    mapToolbarDrawZone: "Draw Zone",
    mapToolbarEditZone: "Edit Zone Shape",
    zoneDrawTip: "Click on map to draw polygon area",
    zoneClose: "Close Zone",
    undoPoint: "Undo Point",
    placePinTip: "Click on map to place the pending image",
    listTitle: "Signage List",
    batchUpload: "Batch Add",
    unlocatedFolder: "📍 Unlocated (Pending)",
    unlocatedLabel: "Click map to place",
    zoneUnzoned: "Unzoned",
    zoneSetting: "Zone Settings",
    editZoneTitle: "Edit Zone Properties",
    labelZoneId: "Zone ID",
    labelZoneName: "Zone Name (Optional)",
    labelZoneColor: "Zone Color",
    btnSave: "Save",
    btnDeleteZone: "Delete Zone",
    confirmDeleteZone: "Deleting a zone only removes the boundary. Pins will be moved to 'Unzoned'. Proceed?",
    editorTitle: "Image Workbench",
    backToMap: "Back",
    zoomLabel: "Zoom",
    modeHighlight: "Highlight",
    modeDraw: "Annotate",
    highlightTitle: "Area Highlight",
    highlightDesc: "Draw a polygon to define the signage area. The outside will turn B&W to highlight the content.",
    pointsCount: "Points",
    minPoints: "Min 3 pts",
    resetSelection: "Reset",
    applySelection: "Apply",
    imageParams: "Image Parameters",
    brightness: "Brightness",
    contrast: "Contrast",
    dimensionTitle: "Analysis Dimensions",
    undo: "Undo",
    clear: "Clear",
    notesTitle: "Notes",
    notesPlaceholder: "Enter observations here...",
    saveChanges: "Save Changes",
    statusSaving: "Saving...",
    statusSaved: "Synced",
    deletePin: "Delete Pin",
    confirmDeletePin: "Are you sure you want to delete this pin? This cannot be undone.",
    currentModeHighlight: "Highlight Mode",
    currentModeDraw: "Annotation Mode",
    statsTitle: "Analytics Dashboard",
    statsModeGroup: "Mode: By Plant Entity (Unique)",
    statsModeCount: "Mode: By Image Count (Total)",
    statTotalZones: "Total Zones",
    statTotalPins: "Total Pins",
    statTotalElements: "Analyzed Elements",
    statTotalEntities: "Plant Entities",
    statDominant: "Dominant Dimension",
    statDominantAtmosphere: "Atmosphere",
    statDominantRelevance: "Relevance",
    statDominantClarity: "Clarity",
    chartRadarTitle: "Overall Balance",
    chartStackTitle: "Zone Comparison",
    chartZoneFeatures: "Zone Features",
    chartDetailTitle: "Detailed Breakdown",
    noData: "No Data",
    featureStrong: "Strong Atmosphere",
    featureHighRel: "High Relevance",
    featureHighClear: "High Clarity",
    cat_A_group: "A. Inspirational Atmosphere",
    cat_R_group: "R. Audience Relevance",
    cat_S_group: "S. Structural Clarity",
    cat_A1: "A1: Inquiry and Interaction",
    cat_A2: "A2: Narrative Tone",
    cat_R1: "R1: Life Experience Connection",
    cat_R2: "R2: Sensory Guidance",
    cat_S1: "S1: Information Hierarchy",
    cat_S2: "S2: Text Volume Control",
    cat_S3: "S3: Visual-Text Integration",
    msgSaved: "Saved Successfully!",
    msgLoadSuccess: "Project Loaded Successfully!",
    msgLoadErr: "Invalid file format.",
    alertZoneExist: "Zone ID already exists.",
    alertZone3Points: "Zone needs at least 3 points",
    removeFromGroup: "Remove from Group",
    mergeWithPrev: "Merge with Previous"
  }
};

// --- 常量定义 (使用 Translation Key) ---
const ANALYSIS_CATEGORIES = [
  { id: 'A1', groupKey: 'cat_A_group', shortGroup: 'Atmosphere', nameKey: 'cat_A1', color: 'rgba(239, 68, 68, 0.5)', hex: '#ef4444' }, 
  { id: 'A2', groupKey: 'cat_A_group', shortGroup: 'Atmosphere', nameKey: 'cat_A2', color: 'rgba(249, 115, 22, 0.5)', hex: '#f97316' },
  { id: 'R1', groupKey: 'cat_R_group', shortGroup: 'Relevance', nameKey: 'cat_R1', color: 'rgba(59, 130, 246, 0.5)', hex: '#3b82f6' },
  { id: 'R2', groupKey: 'cat_R_group', shortGroup: 'Relevance', nameKey: 'cat_R2', color: 'rgba(168, 85, 247, 0.5)', hex: '#a855f7' },
  { id: 'S1', groupKey: 'cat_S_group', shortGroup: 'Clarity', nameKey: 'cat_S1', color: 'rgba(34, 197, 94, 0.5)', hex: '#22c55e' },
  { id: 'S2', groupKey: 'cat_S_group', shortGroup: 'Clarity', nameKey: 'cat_S2', color: 'rgba(132, 204, 22, 0.5)', hex: '#84cc16' }, 
  { id: 'S3', groupKey: 'cat_S_group', shortGroup: 'Clarity', nameKey: 'cat_S3', color: 'rgba(20, 184, 166, 0.5)', hex: '#14b8a6' },
];

const ZONE_PALETTE = [
    { fill: 'rgba(239, 68, 68, 0.3)', stroke: '#ef4444', name: 'Red' }, 
    { fill: 'rgba(59, 130, 246, 0.3)', stroke: '#3b82f6', name: 'Blue' },
    { fill: 'rgba(34, 197, 94, 0.3)', stroke: '#22c55e', name: 'Green' }, 
    { fill: 'rgba(249, 115, 22, 0.3)', stroke: '#f97316', name: 'Orange' },
    { fill: 'rgba(168, 85, 247, 0.3)', stroke: '#a855f7', name: 'Purple' },
    { fill: 'rgba(236, 72, 153, 0.3)', stroke: '#ec4899', name: 'Pink' },
    { fill: 'rgba(14, 165, 233, 0.3)', stroke: '#0ea5e9', name: 'Sky' },
    { fill: 'rgba(100, 116, 139, 0.3)', stroke: '#64748b', name: 'Gray' },
];

// --- 算法辅助 ---
const isPointInPolygon = (point, vs) => {
    let x = point.x, y = point.y;
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        let xi = vs[i].x, yi = vs[i].y;
        let xj = vs[j].x, yj = vs[j].y;
        let intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
};

// --- SVG 图表组件 ---
const RadarChart = ({ data }) => {
    const size = 300;
    const center = size / 2;
    const radius = 100;
    const levels = 4;
    const angleSlice = (Math.PI * 2) / data.length;

    const getCoordinates = (index, value) => {
        const angle = index * angleSlice - Math.PI / 2; 
        return {
            x: center + Math.cos(angle) * (radius * value),
            y: center + Math.sin(angle) * (radius * value)
        };
    };

    const gridPoints = Array.from({ length: levels }).map((_, l) => {
        const levelFactor = (l + 1) / levels;
        return data.map((_, i) => getCoordinates(i, levelFactor));
    });

    const maxValue = Math.max(...data.map(d => d.value)) || 1;
    const shapePoints = data.map((d, i) => getCoordinates(i, d.value / maxValue));
    const pathString = shapePoints.map((p, i) => (i === 0 ? 'M' : 'L') + `${p.x},${p.y}`).join(' ') + 'Z';

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
            {gridPoints.map((levelPoints, i) => (
                <polygon key={i} points={levelPoints.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#e2e8f0" strokeWidth="1" />
            ))}
            {data.map((_, i) => {
                const end = getCoordinates(i, 1.1);
                const start = { x: center, y: center };
                return <line key={i} x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="#e2e8f0" />;
            })}
            <path d={pathString} fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2" />
            {data.map((d, i) => {
                const pos = getCoordinates(i, 1.35);
                const dot = getCoordinates(i, d.value / maxValue);
                return (
                    <g key={i}>
                        <circle cx={dot.x} cy={dot.y} r="3" fill="#10b981" />
                        <text x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#64748b" fontWeight="500">
                            {d.label.split(':')[0]}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

const StackedBarChart = ({ zones, data }) => {
    if (zones.length === 0) return <div className="text-center text-slate-400 py-10">No Data</div>;

    const groupColors = { 'Atmosphere': '#ef4444', 'Relevance': '#3b82f6', 'Clarity': '#22c55e' };
    const maxTotal = Math.max(...zones.map(z => {
        const d = data[z.id] || { Atmosphere: 0, Relevance: 0, Clarity: 0 };
        return d.Atmosphere + d.Relevance + d.Clarity;
    })) || 1;

    return (
        <div className="w-full space-y-3">
            {zones.map(z => {
                const d = data[z.id] || { Atmosphere: 0, Relevance: 0, Clarity: 0 };
                const total = d.Atmosphere + d.Relevance + d.Clarity;
                const pctA = total ? (d.Atmosphere / total) * 100 : 0;
                const pctR = total ? (d.Relevance / total) * 100 : 0;
                const pctS = total ? (d.Clarity / total) * 100 : 0;
                const barWidth = maxTotal ? (total / maxTotal) * 100 : 0;

                return (
                    <div key={z.id} className="flex items-center gap-3">
                        <div className="w-16 text-xs font-bold text-slate-600 truncate text-right">{z.id}</div>
                        <div className="flex-1 h-6 bg-slate-50 rounded-md overflow-hidden flex relative">
                            {total > 0 ? (
                                <div className="flex h-full rounded-md overflow-hidden" style={{ width: `${barWidth}%` }}>
                                    <div style={{ width: `${pctA}%`, background: groupColors.Atmosphere }} title={`A: ${d.Atmosphere}`} />
                                    <div style={{ width: `${pctR}%`, background: groupColors.Relevance }} title={`R: ${d.Relevance}`} />
                                    <div style={{ width: `${pctS}%`, background: groupColors.Clarity }} title={`S: ${d.Clarity}`} />
                                </div>
                            ) : (
                                <div className="w-full text-[10px] text-slate-300 flex items-center justify-center">-</div>
                            )}
                        </div>
                        <div className="w-8 text-xs text-slate-400 text-right">{total}</div>
                    </div>
                );
            })}
        </div>
    );
};

// --- 子组件：通用 ---
const TooltipButton = ({ onClick, icon, active, label }) => (
    <div className="relative group">
        <button 
            onClick={onClick}
            className={`p-2.5 rounded-lg transition-all duration-200 ${active ? 'bg-emerald-50 text-emerald-600 shadow-inner' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
        >
            {icon}
        </button>
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
            {label}
        </div>
    </div>
);

const ZoneEditModal = ({ zone, onClose, onSave, onDelete, t }) => {
    const [formData, setFormData] = useState({ id: zone.id, name: zone.name || '', colorIndex: zone.colorIndex || 0 });
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-80 p-5 animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-slate-800">{t('editZoneTitle')}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">{t('labelZoneId')}</label>
                        <input type="text" maxLength="3" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value.toUpperCase()})} className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">{t('labelZoneName')}</label>
                        <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2">{t('labelZoneColor')}</label>
                        <div className="grid grid-cols-4 gap-2">
                            {ZONE_PALETTE.map((c, i) => (
                                <button key={i} onClick={() => setFormData({...formData, colorIndex: i})} className={`w-8 h-8 rounded-full border-2 transition-transform ${formData.colorIndex === i ? 'border-slate-600 scale-110' : 'border-transparent hover:scale-105'}`} style={{ backgroundColor: c.stroke }} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex gap-2">
                    <button onClick={() => onSave(zone.id, formData)} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">{t('btnSave')}</button>
                    <button onClick={() => { if(confirm(t('confirmDeleteZone'))) onDelete(zone.id); }} className="p-2 border border-red-200 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                </div>
            </div>
        </div>
    );
};

// --- 组件：地图视图 ---
const MapView = ({ 
    mapImage, setMapImage, pins, setPins, zones, setZones, 
    editingPinId, setEditingPinId, setActiveTab, mapMode, setMapMode, 
    currentZonePoints, setCurrentZonePoints, onEditImage, t
}) => {
    const [draggingPinId, setDraggingPinId] = useState(null);
    const [draggingZonePoint, setDraggingZonePoint] = useState(null); 
    const [tempClickPos, setTempClickPos] = useState(null);
    const [collapsedZones, setCollapsedZones] = useState({});
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); 
    const [editingZone, setEditingZone] = useState(null); 
    const [draggedListItemIndex, setDraggedListItemIndex] = useState(null);
    const [placingPinId, setPlacingPinId] = useState(null);
    const [mapZoom, setMapZoom] = useState(1); 

    const contentRef = useRef(null);
    const fileInputRef = useRef(null);
    const pinInputRef = useRef(null);
    const batchInputRef = useRef(null); 

    const pinsWithInfo = useMemo(() => {
        const categorizedPins = pins.map(pin => {
            if (pin.x === null || pin.y === null) return { ...pin, zoneId: 'unlocated' };
            const foundZone = zones.find(z => isPointInPolygon({x: pin.x, y: pin.y}, z.points));
            return { ...pin, zoneId: foundZone ? foundZone.id : '?' };
        });
        const zoneCounters = {}; const groupMapping = {}; 
        return categorizedPins.map(pin => {
            const zid = pin.zoneId;
            if (zid === 'unlocated') return { ...pin, displayName: '?' };
            if (!zoneCounters[zid]) zoneCounters[zid] = 0;
            let mainNumber; let subChar = '';
            if (pin.groupId) {
                const groupKey = `${zid}_${pin.groupId}`;
                if (groupMapping[groupKey] !== undefined) {
                    mainNumber = groupMapping[groupKey].number;
                    groupMapping[groupKey].subCount++;
                    subChar = '-' + String.fromCharCode(97 + groupMapping[groupKey].subCount); 
                } else {
                    zoneCounters[zid]++;
                    mainNumber = zoneCounters[zid];
                    groupMapping[groupKey] = { number: mainNumber, subCount: 0 };
                    subChar = '-a';
                }
            } else {
                zoneCounters[zid]++;
                mainNumber = zoneCounters[zid];
            }
            return { ...pin, displayName: `${zid}-${mainNumber}${subChar}` };
        });
    }, [pins, zones]);

    const groupedPins = useMemo(() => {
        const groups = { 'unlocated': [] };
        groups['?'] = [];
        zones.forEach(z => groups[z.id] = []);
        pinsWithInfo.forEach((pin, index) => {
            if (!groups[pin.zoneId]) groups[pin.zoneId] = [];
            groups[pin.zoneId].push({ ...pin, originalIndex: index });
        });
        if (groups['?'].length === 0) delete groups['?'];
        if (groups['unlocated'].length === 0) delete groups['unlocated'];
        return groups;
    }, [pinsWithInfo, zones]);

    const getRelativeCoords = (e) => {
        if (!contentRef.current) return { x: 0, y: 0 };
        const rect = contentRef.current.getBoundingClientRect();
        const clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
        const clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);
        const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
        const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
        return { x, y };
    };

    const handleListDragStart = (e, index) => { setDraggedListItemIndex(index); e.dataTransfer.effectAllowed = "move"; };
    const handleListDragOver = (e) => { e.preventDefault(); };
    const handleListDrop = (e, targetIndex) => {
        e.preventDefault();
        if (draggedListItemIndex === null || draggedListItemIndex === targetIndex) return;
        const newPins = [...pins];
        const [movedItem] = newPins.splice(draggedListItemIndex, 1);
        newPins.splice(targetIndex, 0, movedItem);
        setPins(newPins);
        setDraggedListItemIndex(null);
    };
    const toggleGroup = (currentIndex, previousIndex) => {
        const newPins = [...pins];
        const currentPin = newPins[currentIndex];
        if (currentPin.groupId) currentPin.groupId = null;
        else if (previousIndex >= 0) {
            const prevPin = newPins[previousIndex];
            const newGroupId = prevPin.groupId || `group_${Date.now()}_${Math.random()}`;
            prevPin.groupId = newGroupId;
            currentPin.groupId = newGroupId;
        }
        setPins(newPins);
    };
    const handleBatchUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        Promise.all(files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    resolve({
                        id: Date.now() + Math.random(), 
                        x: null, y: null,
                        imageSrc: event.target.result, originalImageSrc: event.target.result,
                        filters: { brightness: 100, contrast: 100 },
                        annotations: [], highlightPoly: [], notes: '', groupId: null
                    });
                };
                reader.readAsDataURL(file);
            });
        })).then(newPins => {
            setPins(prev => [...prev, ...newPins]);
            setCollapsedZones(prev => ({ ...prev, 'unlocated': false }));
        });
    };
    const startPlacingPin = (pinId) => { setPlacingPinId(pinId); setMapMode('place_pending'); };
    const handleMouseDown = (e) => {
        if (!mapImage) return;
        const coords = getRelativeCoords(e);
        if (mapMode === 'draw_zone') setCurrentZonePoints(prev => [...prev, coords]);
    };
    const handleMouseMove = (e) => {
        const coords = getRelativeCoords(e);
        setMousePos(coords);
        if (draggingPinId) setPins(prev => prev.map(p => p.id === draggingPinId ? { ...p, x: coords.x, y: coords.y } : p));
        if (draggingZonePoint) setZones(prev => prev.map(z => {
            if (z.id === draggingZonePoint.zoneId) {
                const newPoints = [...z.points];
                newPoints[draggingZonePoint.pointIndex] = coords;
                return { ...z, points: newPoints };
            }
            return z;
        }));
    };
    const handleMouseUp = () => { setDraggingPinId(null); setDraggingZonePoint(null); };
    const handleMapClick = (e) => {
        const coords = getRelativeCoords(e);
        if (mapMode === 'add_pin' && !draggingPinId) {
            setTempClickPos(coords);
            pinInputRef.current.click();
        } else if (mapMode === 'place_pending' && placingPinId) {
            setPins(prev => prev.map(p => p.id === placingPinId ? { ...p, x: coords.x, y: coords.y } : p));
            setPlacingPinId(null);
            setMapMode('view');
        }
    };
    
    // 修复：独立的删除处理函数
    const handleDeletePin = (e, id) => {
        e.stopPropagation(); // 阻止事件冒泡
        if (window.confirm(t('confirmDeletePin'))) {
            setPins(prev => prev.filter(p => p.id !== id));
            // 如果删除了当前正在编辑的 Pin，清理编辑状态
            if (editingPinId === id) {
                setEditingPinId(null);
            }
        }
    };

    const finishZone = () => {
        if (currentZonePoints.length < 3) return alert(t('alertZone3Points'));
        let nextLetter = 'A';
        for(let i=0; i<26; i++) {
            const char = String.fromCharCode(65 + i);
            if(!zones.find(z => z.id === char)) { nextLetter = char; break; }
        }
        setZones([...zones, { id: nextLetter, name: '', colorIndex: zones.length % ZONE_PALETTE.length, points: currentZonePoints }]);
        setCurrentZonePoints([]);
        setMapMode('view');
    };
    const handleZoneSave = (oldId, newData) => {
        if (oldId !== newData.id && zones.find(z => z.id === newData.id)) return alert(t('alertZoneExist'));
        setZones(zones.map(z => z.id === oldId ? { ...z, id: newData.id, name: newData.name, colorIndex: newData.colorIndex } : z));
        setEditingZone(null);
    };
    const handleZoneDelete = (id) => {
        setZones(zones.filter(z => z.id !== id));
        setEditingZone(null);
    };

    return (
        <div className="flex h-full bg-slate-50 overflow-hidden" onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} onTouchEnd={handleMouseUp} onTouchMove={handleMouseMove}>
            {editingZone && <ZoneEditModal zone={editingZone} onClose={() => setEditingZone(null)} onSave={handleZoneSave} onDelete={handleZoneDelete} t={t} />}
            <div className="flex-1 flex flex-col p-4 overflow-hidden relative">
                <div className="absolute top-6 left-6 z-20 bg-white shadow-lg border border-slate-100 rounded-xl p-1.5 flex flex-col gap-2">
                    <TooltipButton active={mapMode === 'view'} onClick={() => setMapMode('view')} icon={<MousePointer2 size={20} />} label={t('mapToolbarView')} />
                    <TooltipButton active={mapMode === 'add_pin'} onClick={() => setMapMode('add_pin')} icon={<Plus size={20} />} label={t('mapToolbarAdd')} />
                    <div className="w-full h-px bg-slate-200 my-1"></div>
                    <TooltipButton active={mapMode === 'draw_zone'} onClick={() => { setMapMode('draw_zone'); setCurrentZonePoints([]); }} icon={<Layers size={20} />} label={t('mapToolbarDrawZone')} />
                    <TooltipButton active={mapMode === 'edit_zone'} onClick={() => setMapMode(mapMode === 'edit_zone' ? 'view' : 'edit_zone')} icon={<Edit3 size={20} />} label={t('mapToolbarEditZone')} />
                </div>
                {mapMode === 'place_pending' && <div className="absolute top-6 left-20 z-20 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm flex items-center gap-3 animate-pulse cursor-default pointer-events-none"><MapPin size={16} /><span>{t('placePinTip')}</span></div>}
                {mapMode === 'draw_zone' && <div className="absolute top-6 left-20 z-20 bg-slate-800/90 backdrop-blur text-white px-4 py-2 rounded-lg shadow-lg text-sm flex items-center gap-3 animate-fade-in"><span>{t('pointsCount')}: {currentZonePoints.length}</span><div className="h-4 w-px bg-slate-600"></div><button onClick={finishZone} className="bg-emerald-500 hover:bg-emerald-600 px-3 py-1 rounded text-xs font-bold transition-colors">{t('zoneClose')}</button><button onClick={() => { if(currentZonePoints.length > 0) setCurrentZonePoints(prev => prev.slice(0, -1)); else setMapMode('view'); }} className="text-slate-300 hover:text-white flex items-center gap-1"><CornerUpLeft size={14}/> {t('undoPoint')}</button></div>}
                <div className="bg-white rounded-xl shadow-inner border border-slate-200 h-full flex items-center justify-center overflow-hidden relative">
                    {!mapImage ? (
                        <div className="text-center p-10 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300">
                            <Upload className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-slate-600 font-medium mb-4">{t('uploadMap')}</h3>
                            <button onClick={() => fileInputRef.current.click()} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2 mx-auto shadow-lg shadow-emerald-200">{t('selectImage')}</button>
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onload = (ev) => setMapImage(ev.target.result); reader.readAsDataURL(file); } }} />
                        </div>
                    ) : (
                        <div className="w-full h-full overflow-auto bg-slate-100 relative custom-scrollbar">
                            <div 
                                ref={contentRef} 
                                className="relative inline-block" 
                                style={{ 
                                    cursor: mapMode === 'add_pin' ? 'crosshair' : mapMode === 'draw_zone' ? 'crosshair' : mapMode === 'place_pending' ? 'cell' : 'default',
                                    width: `${mapZoom * 100}%`,
                                    height: 'auto'
                                }}
                            >
                                <img src={mapImage} alt="Map" className="block w-full h-auto pointer-events-auto" onMouseDown={handleMouseDown} onClick={handleMapClick} draggable={false} />
                                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }} viewBox="0 0 100 100" preserveAspectRatio="none">
                                    {zones.map((zone) => {
                                        const style = ZONE_PALETTE[zone.colorIndex || 0];
                                        return (
                                            <g key={zone.id}>
                                                <polygon points={zone.points.map(p => `${p.x},${p.y}`).join(' ')} fill={style.fill} stroke={style.stroke} strokeWidth="0.5" strokeLinejoin="round" />
                                                {zone.points.length > 0 && <text x={zone.points[0].x} y={zone.points[0].y} fill={style.stroke} fontSize="1.5" fontWeight="900" paintOrder="stroke" stroke="white" strokeWidth="0.3" dy="-1">{zone.name ? `${zone.id}-${zone.name}` : `${zone.id}区`}</text>}
                                                {mapMode === 'edit_zone' && zone.points.map((p, pIdx) => (
                                                    <circle key={pIdx} cx={p.x} cy={p.y} r="1" fill="white" stroke={style.stroke} strokeWidth="0.5" className="cursor-move pointer-events-auto hover:r-1.5 transition-all" onMouseDown={(e) => { e.stopPropagation(); setDraggingZonePoint({ zoneId: zone.id, pointIndex: pIdx }); }} />
                                                ))}
                                            </g>
                                        );
                                    })}
                                    {currentZonePoints.length > 0 && (
                                        <g>
                                            <polygon points={currentZonePoints.map(p => `${p.x},${p.y}`).join(' ')} fill="rgba(0,0,0,0.1)" stroke="#333" strokeWidth="0.5" strokeDasharray="1" />
                                            <line x1={currentZonePoints[currentZonePoints.length-1].x} y1={currentZonePoints[currentZonePoints.length-1].y} x2={mousePos.x} y2={mousePos.y} stroke="#333" strokeWidth="0.3" strokeDasharray="1" />
                                            <line x1={mousePos.x} y1={mousePos.y} x2={currentZonePoints[0].x} y2={currentZonePoints[0].y} stroke="rgba(16, 185, 129, 0.5)" strokeWidth="0.5" />
                                            {currentZonePoints.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="0.8" fill="white" stroke="#333" strokeWidth="0.2" />)}
                                        </g>
                                    )}
                                </svg>
                                {pinsWithInfo.filter(p => p.x !== null).map(pin => (
                                    <div key={pin.id} className={`absolute transform -translate-x-1/2 -translate-y-full group cursor-pointer transition-transform duration-200 z-30 ${draggingPinId === pin.id ? 'scale-125 z-50' : ''}`} style={{ left: `${pin.x}%`, top: `${pin.y}%` }} onMouseDown={(e) => { e.stopPropagation(); if(mapMode === 'view') setDraggingPinId(pin.id); }} onClick={(e) => { if(!draggingPinId) { e.stopPropagation(); const listEl = document.getElementById(`pin-item-${pin.id}`); if(listEl) { listEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); listEl.classList.add('bg-yellow-100'); setTimeout(() => listEl.classList.remove('bg-yellow-100'), 1000); } if (mapMode === 'view') setEditingPinId(pin.id); } }}>
                                        <div className="relative flex flex-col items-center">
                                            <div className={`px-2 py-0.5 rounded shadow-sm text-[10px] font-bold mb-1 whitespace-nowrap backdrop-blur-sm transition-colors ${editingPinId === pin.id ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white/90 text-slate-700 border border-slate-200'}`}>{pin.displayName}</div>
                                            <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-colors ${editingPinId === pin.id ? 'bg-emerald-500' : 'bg-slate-700 hover:bg-slate-600'}`}>
                                                {pin.displayName.includes('-') && !pin.displayName.endsWith('-a') && pin.groupId ? <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div> : pin.annotations.length > 0 ? <div className="w-2.5 h-2.5 rounded-full bg-white"></div> : <div className="w-2 h-2 rounded-full border border-white/50"></div>}
                                            </div>
                                            <div className={`w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent ${editingPinId === pin.id ? 'border-t-emerald-500' : 'border-t-slate-700 hover:border-t-slate-600'}`}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <input type="file" ref={pinInputRef} className="hidden" accept="image/*" onChange={(e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onload = (event) => { const newPin = { id: Date.now(), x: tempClickPos.x, y: tempClickPos.y, imageSrc: event.target.result, originalImageSrc: event.target.result, filters: { brightness: 100, contrast: 100 }, annotations: [], highlightPoly: [], notes: '', groupId: null }; setPins([...pins, newPin]); setMapMode('view'); }; reader.readAsDataURL(file); } }} />
                    
                    {mapImage && (
                        <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-white/90 backdrop-blur shadow-lg px-4 py-2 rounded-full border border-slate-200 z-50">
                            <button onClick={() => setMapZoom(z => Math.max(0.25, z - 0.25))} className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><ZoomOut size={16}/></button>
                            <span className="text-xs font-mono text-slate-600 w-12 text-center">{(mapZoom * 100).toFixed(0)}%</span>
                            <button onClick={() => setMapZoom(z => Math.min(4, z + 0.25))} className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><ZoomIn size={16}/></button>
                            <button onClick={() => setMapZoom(1)} className="text-xs text-slate-400 hover:text-slate-600 ml-1"><Maximize size={14}/></button>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-64 bg-white border-l shadow-2xl z-30 flex flex-col h-full">
                <div className="p-3 border-b bg-slate-50 flex justify-between items-center shrink-0">
                    <h3 className="font-bold text-slate-700 flex items-center gap-2 text-sm"><List size={16} /> {t('listTitle')}</h3>
                    <div className="flex gap-2">
                        <input type="file" multiple ref={batchInputRef} className="hidden" accept="image/*" onChange={handleBatchUpload} />
                        <button onClick={() => batchInputRef.current.click()} className="p-1.5 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors" title={t('batchUpload')}><FilePlus size={16} /></button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                    {Object.keys(groupedPins).sort((a, b) => { if (a === 'unlocated') return -1; if (b === 'unlocated') return 1; return a.localeCompare(b); }).map((zoneId) => {
                        const isUnlocated = zoneId === 'unlocated';
                        const zoneObj = zones.find(z => z.id === zoneId);
                        const zoneName = isUnlocated ? t('unlocatedFolder') : (zoneObj ? (zoneObj.name ? `${zoneObj.id}区 - ${zoneObj.name}` : `${zoneObj.id} 区`) : t('zoneUnzoned'));
                        const zoneColor = isUnlocated ? '#f59e0b' : (zoneObj ? ZONE_PALETTE[zoneObj.colorIndex || 0].stroke : '#94a3b8');
                        const items = groupedPins[zoneId];
                        if (!items) return null;
                        return (
                            <div key={zoneId} className={`border rounded-lg overflow-hidden ${isUnlocated ? 'bg-orange-50/50 border-orange-100' : 'bg-white border-slate-200'}`}>
                                <div className="flex items-center justify-between p-2 bg-slate-50/80 hover:bg-slate-100 group select-none">
                                    <div onClick={() => setCollapsedZones(prev => ({ ...prev, [zoneId]: !prev[zoneId] }))} className="flex items-center gap-2 font-medium text-slate-700 flex-1 cursor-pointer">
                                        {collapsedZones[zoneId] ? <Folder size={16} className="text-slate-400" /> : <FolderOpen size={16} style={{ color: zoneColor }} />}
                                        <span className={`truncate max-w-[120px] text-sm ${isUnlocated ? 'text-orange-700 font-bold' : ''}`} title={zoneName}>{zoneName}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs text-slate-400 mr-1">{items.length}</span>
                                        {!isUnlocated && zoneObj && <button onClick={() => setEditingZone(zoneObj)} className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-emerald-600 transition-colors" title={t('zoneSetting')}><Settings size={14} /></button>}
                                    </div>
                                </div>
                                {!collapsedZones[zoneId] && (
                                    <div className="divide-y divide-slate-100">
                                        {items.map((pin, idx) => {
                                            const canGroupWithPrev = idx > 0 && !isUnlocated;
                                            const isGrouped = !!pin.groupId;
                                            return (
                                                <div 
                                                    key={pin.id} 
                                                    id={`pin-item-${pin.id}`} 
                                                    draggable 
                                                    onDragStart={(e) => handleListDragStart(e, pin.originalIndex)} 
                                                    onDragOver={handleListDragOver} 
                                                    onDrop={(e) => handleListDrop(e, pin.originalIndex)} 
                                                    onClick={() => { 
                                                        if (isUnlocated) { 
                                                            startPlacingPin(pin.id); 
                                                        } else { 
                                                            setEditingPinId(pin.id); 
                                                            onEditImage(pin); 
                                                        } 
                                                    }} 
                                                    className={`flex justify-between items-center gap-2 p-2 hover:bg-slate-50 transition-colors cursor-pointer group relative ${editingPinId === pin.id ? 'bg-emerald-50/50' : ''} ${isGrouped ? 'pl-6' : ''} ${isUnlocated && placingPinId === pin.id ? 'ring-2 ring-emerald-500 bg-emerald-50' : ''}`}
                                                >
                                                    {isGrouped && <div className="absolute left-3 top-[-10px] bottom-1/2 border-l-2 border-b-2 border-slate-200 w-3 rounded-bl-lg"></div>}
                                                    <div className="flex gap-2 items-center flex-1 min-w-0">
                                                        <div className="flex flex-col items-center justify-center text-slate-300 cursor-move hover:text-slate-500"><GripVertical size={14} /></div>
                                                        {!isUnlocated && <div className="flex flex-col justify-center">{isGrouped ? <button onClick={(e) => { e.stopPropagation(); toggleGroup(pin.originalIndex, -1); }} className="p-1 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded" title={t('removeFromGroup')}><Unlink size={14} /></button> : <button onClick={(e) => { e.stopPropagation(); if(canGroupWithPrev) toggleGroup(pin.originalIndex, items[idx-1].originalIndex); }} className={`p-1 rounded ${canGroupWithPrev ? 'text-slate-200 hover:text-blue-500 hover:bg-blue-50' : 'text-transparent pointer-events-none'}`} title={t('mergeWithPrev')}><LinkIcon size={14} /></button>}</div>}
                                                        <div className="w-10 h-10 bg-slate-200 rounded overflow-hidden shrink-0 border border-slate-200 relative">
                                                            <img src={pin.imageSrc} className="w-full h-full object-cover" alt="" />
                                                            {pin.annotations.length > 0 && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-tl shadow-sm"></div>}
                                                        </div>
                                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                            <div className="flex justify-between items-center">
                                                                <span className={`text-xs font-bold ${editingPinId === pin.id ? 'text-emerald-700' : 'text-slate-700'}`}>{isUnlocated ? t('unlocatedLabel') : pin.displayName}</span>
                                                            </div>
                                                            <div className="text-[10px] text-slate-400 truncate">{pin.notes || (pin.annotations.length > 0 ? `${pin.annotations.length} marks` : "No notes")}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                        {!isUnlocated && <button onClick={(e) => { e.stopPropagation(); onEditImage(pin); }} className="p-1 hover:bg-slate-200 rounded text-slate-500" title="Edit"><Edit3 size={12} /></button>}
                                                        <button onClick={(e) => handleDeletePin(e, pin.id)} className="p-1 hover:bg-red-100 rounded text-slate-400 hover:text-red-500" title={t('deletePin')}><Trash2 size={12} /></button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// --- 组件：图片编辑器 (重构版：自动保存 & 状态分离) ---
const ImageEditor = ({ pin, setPins, setActiveTab, t }) => {
    // 1. Data State (需要持久化的数据)
    const [filters, setFilters] = useState(pin.filters);
    const [highlightPoly, setHighlightPoly] = useState(pin.highlightPoly || []);
    const [paths, setPaths] = useState(pin.annotations);
    const [notes, setNotes] = useState(pin.notes || '');

    // 2. View State (仅 UI 交互，无需保存)
    const [viewState, setViewState] = useState({
        mode: 'draw', 
        isDrawing: false,
        zoom: 1,
        isImageLoaded: false,
        brushColor: ANALYSIS_CATEGORIES[0],
        brushSize: 6,
        isSaving: false // 保存状态指示
    });

    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    // 重置状态当 Pin ID 改变 (切换图片)
    useEffect(() => {
        setFilters(pin.filters);
        setHighlightPoly(pin.highlightPoly || []);
        setPaths(pin.annotations);
        setNotes(pin.notes || '');
        setViewState(prev => ({ ...prev, isImageLoaded: false }));
    }, [pin.id]);

    // 自动保存逻辑 (Debounced)
    useEffect(() => {
        setViewState(prev => ({ ...prev, isSaving: true }));
        const handler = setTimeout(() => {
            setPins(prev => prev.map(p => p.id === pin.id ? {
                ...p,
                annotations: paths,
                highlightPoly,
                filters,
                notes
            } : p));
            setViewState(prev => ({ ...prev, isSaving: false }));
        }, 800); // 800ms 延迟保存

        return () => clearTimeout(handler);
    }, [paths, highlightPoly, filters, notes]);

    // Canvas 渲染
    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = pin.imageSrc;

        img.onload = () => {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            setViewState(prev => ({ ...prev, isImageLoaded: true }));
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 绘制背景 (黑白或彩色)
            const hasHighlight = highlightPoly.length > 0;
            if (hasHighlight) {
                // 黑白底图
                ctx.filter = `grayscale(100%) brightness(${filters.brightness}%) contrast(${filters.contrast}%)`;
                ctx.drawImage(img, 0, 0);
                
                // 彩色选区
                if (highlightPoly.length > 2) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(highlightPoly[0].x, highlightPoly[0].y);
                    for(let i=1; i<highlightPoly.length; i++) ctx.lineTo(highlightPoly[i].x, highlightPoly[i].y);
                    ctx.closePath();
                    ctx.clip();
                    ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%)`;
                    ctx.drawImage(img, 0, 0);
                    ctx.restore();
                    // 边框
                    ctx.beginPath();
                    ctx.moveTo(highlightPoly[0].x, highlightPoly[0].y);
                    for(let i=1; i<highlightPoly.length; i++) ctx.lineTo(highlightPoly[i].x, highlightPoly[i].y);
                    ctx.closePath();
                    ctx.lineWidth = 2; ctx.strokeStyle = '#fff'; ctx.stroke();
                    ctx.lineWidth = 1; ctx.strokeStyle = '#333'; ctx.stroke();
                }
            } else {
                ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%)`;
                ctx.drawImage(img, 0, 0);
            }
            ctx.filter = 'none';

            // 绘制编辑中的选区点线
            if (viewState.mode === 'highlight' && highlightPoly.length > 0) {
                 ctx.fillStyle = '#fff'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
                 highlightPoly.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); });
                 if (highlightPoly.length > 1) { ctx.beginPath(); ctx.moveTo(highlightPoly[0].x, highlightPoly[0].y); for(let i=1; i<highlightPoly.length; i++) ctx.lineTo(highlightPoly[i].x, highlightPoly[i].y); ctx.stroke(); }
            }

            // 绘制标注路径
            paths.forEach(path => {
                ctx.beginPath(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = path.width; ctx.strokeStyle = path.color;
                if (path.points.length > 0) { ctx.moveTo(path.points[0].x, path.points[0].y); path.points.forEach(p => ctx.lineTo(p.x, p.y)); }
                ctx.stroke();
            });
        };
    }, [pin.imageSrc, filters, paths, viewState.mode, highlightPoly]);

    const getCoords = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;
        let clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
        let clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);
        return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
    };

    const handleCanvasClick = (e) => { if (viewState.mode === 'highlight') { const coords = getCoords(e); setHighlightPoly(prev => [...prev, coords]); } };
    
    const handleStart = (e) => { 
        if (viewState.mode !== 'draw') return; 
        const { x, y } = getCoords(e); 
        setViewState(p => ({ ...p, isDrawing: true })); 
        setPaths([...paths, { color: viewState.brushColor.color, category: viewState.brushColor.id, width: viewState.brushSize, points: [{ x, y }] }]); 
    };
    
    const handleMove = (e) => { 
        if (viewState.mode !== 'draw' || !viewState.isDrawing) return; 
        const { x, y } = getCoords(e); 
        const newPaths = [...paths]; 
        newPaths[newPaths.length - 1].points.push({ x, y }); 
        setPaths(newPaths); 
    };
    
    const handleEnd = () => setViewState(p => ({ ...p, isDrawing: false }));

    const groupedCategories = useMemo(() => {
        const groups = {};
        ANALYSIS_CATEGORIES.forEach(cat => { if (!groups[cat.groupKey]) groups[cat.groupKey] = []; groups[cat.groupKey].push(cat); });
        return groups;
    }, []);

    return (
        <div className="flex h-full bg-slate-50 overflow-hidden text-slate-800">
             <div className="w-80 bg-white border-r border-slate-200 flex flex-col h-full z-10 shadow-lg shrink-0 overflow-y-auto">
                 <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
                     <h3 className="font-bold text-slate-800 flex items-center gap-2"><Sliders size={18}/> {t('editorTitle')}</h3>
                     {/* 自动保存状态指示器 */}
                     <div className="flex items-center gap-1 text-xs font-medium">
                         {viewState.isSaving ? (
                             <span className="text-blue-500 flex items-center gap-1"><Cloud size={12} className="animate-pulse"/> {t('statusSaving')}</span>
                         ) : (
                             <span className="text-emerald-500 flex items-center gap-1"><Check size={12}/> {t('statusSaved')}</span>
                         )}
                     </div>
                 </div>
                 
                 <div className="p-4 space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase"><span>{t('zoomLabel')}</span><span>{(viewState.zoom * 100).toFixed(0)}%</span></div>
                        <div className="flex gap-2">
                            <button onClick={() => setViewState(p => ({...p, zoom: Math.max(0.1, p.zoom - 0.1)}))} className="p-2 bg-slate-100 rounded hover:bg-slate-200 text-slate-600"><ZoomOut size={16}/></button>
                            <button onClick={() => setViewState(p => ({...p, zoom: 1}))} className="flex-1 bg-slate-100 rounded hover:bg-slate-200 text-xs font-mono text-slate-600">1:1</button>
                            <button onClick={() => setViewState(p => ({...p, zoom: Math.min(3, p.zoom + 0.1)}))} className="p-2 bg-slate-100 rounded hover:bg-slate-200 text-slate-600"><ZoomIn size={16}/></button>
                        </div>
                    </div>
                    
                    <div className="bg-slate-100 p-1 rounded-lg flex">
                        <button onClick={() => setViewState(p => ({...p, mode: 'highlight'}))} className={`flex-1 py-1.5 text-sm rounded-md flex items-center justify-center gap-2 transition-all ${viewState.mode === 'highlight' ? 'bg-white shadow text-blue-600 font-medium' : 'text-slate-500 hover:text-slate-700'}`}><Hexagon size={14} /> {t('modeHighlight')}</button>
                        <button onClick={() => setViewState(p => ({...p, mode: 'draw'}))} className={`flex-1 py-1.5 text-sm rounded-md flex items-center justify-center gap-2 transition-all ${viewState.mode === 'draw' ? 'bg-white shadow text-emerald-600 font-medium' : 'text-slate-500 hover:text-slate-700'}`}><PenTool size={14} /> {t('modeDraw')}</button>
                    </div>

                    {viewState.mode === 'highlight' && (
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 space-y-3 animate-fade-in">
                            <div className="flex items-start gap-2">
                                <Hexagon className="text-blue-500 mt-0.5 shrink-0" size={16} />
                                <div><h4 className="text-sm font-bold text-blue-700">{t('highlightTitle')}</h4><p className="text-xs text-blue-600/80 mt-1 leading-relaxed">{t('highlightDesc')}</p></div>
                            </div>
                            
                            <div className="space-y-4 p-3 bg-white/50 rounded-lg border border-blue-200">
                                <h4 className="text-xs font-bold text-blue-400 uppercase">{t('imageParams')}</h4>
                                <div><div className="flex justify-between text-xs text-blue-600 mb-1"><span>{t('brightness')}</span><span>{filters.brightness}%</span></div><input type="range" min="50" max="150" value={filters.brightness} onChange={(e) => setFilters(p => ({...p, brightness: parseInt(e.target.value)}))} className="w-full h-1 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"/></div>
                                <div><div className="flex justify-between text-xs text-blue-600 mb-1"><span>{t('contrast')}</span><span>{filters.contrast}%</span></div><input type="range" min="50" max="150" value={filters.contrast} onChange={(e) => setFilters(p => ({...p, contrast: parseInt(e.target.value)}))} className="w-full h-1 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"/></div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-blue-800 bg-white/50 p-2 rounded"><span>{t('pointsCount')}: <strong>{highlightPoly.length}</strong></span>{highlightPoly.length < 3 && <span className="text-orange-500">{t('minPoints')}</span>}</div>
                            <div className="grid grid-cols-1">
                                <button onClick={() => setHighlightPoly([])} className="px-3 py-2 bg-white border border-blue-200 text-blue-600 text-xs rounded hover:bg-blue-50 transition-colors">{t('resetSelection')}</button>
                            </div>
                        </div>
                    )}

                    {viewState.mode === 'draw' && (
                        <>
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-slate-400 uppercase">{t('dimensionTitle')}</h4>
                                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                                    {Object.entries(groupedCategories).map(([groupKey, items]) => (
                                        <div key={groupKey}>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider pl-1">{t(groupKey)}</div>
                                            <div className="space-y-2">
                                                {items.map(cat => (
                                                    <button key={cat.id} onClick={() => setViewState(p => ({...p, brushColor: cat}))} className={`w-full flex items-center gap-3 p-2.5 rounded-lg border text-sm transition-all text-left ${viewState.brushColor.id === cat.id ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 shadow-sm' : 'border-slate-200 hover:bg-slate-50'}`}>
                                                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.hex }} />
                                                        <span className="text-slate-700 text-xs font-medium leading-tight">{t(cat.nameKey)}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2 pt-2 border-t border-slate-100">
                                    <button onClick={() => setPaths(paths.slice(0, -1))} className="flex-1 py-1.5 text-xs border border-slate-300 rounded hover:bg-slate-50 text-slate-600 flex items-center justify-center gap-1"><RotateCcw size={12}/> {t('undo')}</button>
                                    <button onClick={() => setPaths([])} className="flex-1 py-1.5 text-xs border border-red-200 rounded bg-red-50 text-red-600 hover:bg-red-100">{t('clear')}</button>
                                </div>
                            </div>
                             <div className="space-y-2">
                                <h4 className="text-xs font-bold text-slate-400 uppercase">{t('notesTitle')}</h4>
                                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border border-slate-300 rounded-lg p-3 text-sm h-24 focus:ring-2 focus:ring-emerald-500 outline-none resize-none bg-slate-50 text-slate-700 placeholder-slate-400" placeholder={t('notesPlaceholder')} />
                            </div>
                        </>
                    )}

                    <div className="pt-4 border-t border-slate-200 mt-auto">
                        <button onClick={() => setActiveTab('map')} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors mb-2">
                            <MapIcon size={16} /> {t('backToMap')}
                        </button>
                        <button onClick={() => { if(confirm(t('confirmDeletePin'))) { setPins(prev => prev.filter(p => p.id !== pin.id)); setActiveTab('map'); } }} className="w-full bg-white border border-red-200 text-red-500 hover:bg-red-50 py-2.5 rounded-lg text-sm transition-colors">
                            {t('deletePin')}
                        </button>
                    </div>
                 </div>
             </div>

             {/* 右侧画布 */}
             <div className="flex-1 bg-slate-100 overflow-hidden flex items-center justify-center p-8 relative">
                 <div ref={containerRef} className="overflow-auto w-full h-full flex items-center justify-center custom-scrollbar">
                     {!viewState.isImageLoaded && <div className="absolute inset-0 flex items-center justify-center text-slate-400 gap-2"><div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>Loading...</div>}
                     <canvas 
                        ref={canvasRef} 
                        onClick={handleCanvasClick}
                        onMouseDown={handleStart} onMouseMove={handleMove} onMouseUp={handleEnd} onMouseLeave={handleEnd}
                        onTouchStart={handleStart} onTouchMove={handleMove} onTouchEnd={handleEnd}
                        className={`block shadow-xl bg-white transition-transform duration-200 ease-out origin-center ${viewState.mode === 'draw' ? 'cursor-crosshair' : 'cursor-crosshair'}`}
                        style={{ transform: `scale(${viewState.zoom})` }}
                    />
                 </div>
                 <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white/90 backdrop-blur shadow-lg px-4 py-2 rounded-full border border-slate-200">
                     <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
                        <button onClick={() => setViewState(p => ({...p, zoom: Math.max(0.1, p.zoom - 0.1)}))} className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><ZoomOut size={16}/></button>
                        <span className="text-xs font-mono text-slate-600 w-12 text-center">{(viewState.zoom * 100).toFixed(0)}%</span>
                        <button onClick={() => setViewState(p => ({...p, zoom: Math.min(3, p.zoom + 0.1)}))} className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><ZoomIn size={16}/></button>
                        <button onClick={() => setViewState(p => ({...p, zoom: 1}))} className="text-xs text-slate-400 hover:text-slate-600 ml-1"><Maximize size={14}/></button>
                     </div>
                     <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <span className={`w-2 h-2 rounded-full ${viewState.mode === 'highlight' ? 'bg-blue-500' : 'bg-emerald-500'}`}></span>
                        {viewState.mode === 'highlight' ? t('currentModeHighlight') : t('currentModeDraw')}
                     </div>
                 </div>
             </div>
        </div>
    );
};

// --- 组件：统计分析 ---
const StatsView = ({ pins, zones, t }) => {
    const [isGroupMode, setIsGroupMode] = useState(false);
    const stats = useMemo(() => {
        let total = 0; const catCounts = {};
        ANALYSIS_CATEGORIES.forEach(c => catCounts[c.id] = 0);
        if (isGroupMode) {
            const groups = {};
            pins.forEach(pin => { const key = pin.groupId || `single_${pin.id}`; if (!groups[key]) groups[key] = []; groups[key].push(pin); });
            Object.values(groups).forEach(groupPins => {
                const categoriesInGroup = new Set();
                groupPins.forEach(pin => { pin.annotations.forEach(a => categoriesInGroup.add(a.category)); });
                categoriesInGroup.forEach(catId => { if (catCounts[catId] !== undefined) { catCounts[catId]++; total++; } });
            });
        } else {
            pins.forEach(p => { p.annotations.forEach(a => { if(catCounts[a.category] !== undefined) { catCounts[a.category]++; total++; } }); });
        }
        return { total, catCounts };
    }, [pins, isGroupMode]);

    const zoneDetailStats = useMemo(() => {
        const zoneData = {};
        zones.forEach(z => { zoneData[z.id] = { Atmosphere: 0, Relevance: 0, Clarity: 0, total: 0, topFeature: null }; });
        pins.forEach(pin => {
            const foundZone = zones.find(z => isPointInPolygon({x: pin.x, y: pin.y}, z.points));
            if (!foundZone) return;
            pin.annotations.forEach(a => {
                const cat = ANALYSIS_CATEGORIES.find(c => c.id === a.category);
                if (cat) { zoneData[foundZone.id][cat.shortGroup]++; zoneData[foundZone.id].total++; }
            });
        });
        Object.keys(zoneData).forEach(zid => {
            const d = zoneData[zid];
            if (d.total > 0) {
                const maxVal = Math.max(d.Atmosphere, d.Relevance, d.Clarity);
                if (maxVal === d.Atmosphere) d.topFeature = t('featureStrong');
                else if (maxVal === d.Relevance) d.topFeature = t('featureHighRel');
                else d.topFeature = t('featureHighClear');
            } else { d.topFeature = t('noData'); }
        });
        return zoneData;
    }, [pins, zones, t]);

    const groupedStats = useMemo(() => {
        const groups = {};
        ANALYSIS_CATEGORIES.forEach(cat => {
            if (!groups[cat.groupKey]) groups[cat.groupKey] = { nameKey: cat.groupKey, items: [], total: 0 };
            const count = stats.catCounts[cat.id];
            const pct = stats.total ? ((count / stats.total) * 100).toFixed(1) : 0;
            groups[cat.groupKey].items.push({ ...cat, count, pct });
            groups[cat.groupKey].total += count;
        });
        return Object.values(groups);
    }, [stats]);

    const radarData = useMemo(() => ANALYSIS_CATEGORIES.map(cat => ({ label: t(cat.nameKey), value: stats.catCounts[cat.id] || 0 })), [stats, t]);

    return (
        <div className="h-full bg-slate-50 p-8 overflow-auto">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-100 p-2 rounded-lg"><BarChart2 className="text-emerald-600" size={24}/></div>
                        <h2 className="text-2xl font-bold text-slate-800">{t('statsTitle')}</h2>
                    </div>
                    <button onClick={() => setIsGroupMode(!isGroupMode)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${isGroupMode ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
                        <Filter size={16} />
                        {isGroupMode ? t('statsModeGroup') : t('statsModeCount')}
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"><div className="text-slate-400 text-xs font-bold uppercase mb-2">{t('statTotalZones')}</div><div className="text-4xl font-black text-slate-800">{zones.length}</div></div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"><div className="text-slate-400 text-xs font-bold uppercase mb-2">{t('statTotalPins')}</div><div className="text-4xl font-black text-blue-600">{pins.length}</div></div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"><div className="text-slate-400 text-xs font-bold uppercase mb-2">{isGroupMode ? t('statTotalEntities') : t('statTotalElements')}</div><div className="text-4xl font-black text-emerald-600">{stats.total}</div></div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"><div className="text-slate-400 text-xs font-bold uppercase mb-2">{t('statDominant')}</div><div className="text-lg font-bold text-slate-800">{(() => { const totals = { A: 0, R: 0, S: 0 }; ANALYSIS_CATEGORIES.forEach(c => totals[c.shortGroup[0]] += stats.catCounts[c.id]); const max = Math.max(totals.A, totals.R, totals.S); if (max === 0) return '-'; if (max === totals.A) return t('statDominantAtmosphere'); if (max === totals.R) return t('statDominantRelevance'); return t('statDominantClarity'); })()}</div></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col"><h3 className="font-bold text-slate-700 mb-6 flex items-center gap-2"><Activity size={18}/> {t('chartRadarTitle')}</h3><div className="flex-1 flex items-center justify-center min-h-[300px]">{stats.total > 0 ? <RadarChart data={radarData} /> : <div className="text-slate-300">{t('noData')}</div>}</div></div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col"><h3 className="font-bold text-slate-700 mb-6 flex items-center gap-2"><BarChart2 size={18}/> {t('chartStackTitle')}</h3><div className="flex-1 overflow-auto custom-scrollbar"><StackedBarChart zones={zones} data={zoneDetailStats} /></div></div>
                </div>
                {zones.length > 0 && (
                    <div>
                        <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><MapIcon size={18}/> {t('chartZoneFeatures')}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{zones.map(z => (<div key={z.id} className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm"><div className="flex justify-between items-center mb-2"><span className="font-bold text-slate-700">{z.id}</span><span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">n={zoneDetailStats[z.id]?.total || 0}</span></div><div className="text-xs text-slate-500"><div className="font-medium text-emerald-600">{zoneDetailStats[z.id]?.topFeature}</div></div></div>))}</div>
                    </div>
                )}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-700 mb-6 flex justify-between items-center">{t('chartDetailTitle')}</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {groupedStats.map(group => (
                            <div key={group.nameKey} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col h-full">
                                <div className="pb-4 mb-4 border-b border-slate-50 flex justify-between items-end"><h4 className="font-bold text-sm text-slate-700 w-3/4">{t(group.nameKey)}</h4><span className="text-2xl font-black text-slate-800">{group.total}</span></div>
                                <div className="space-y-4 flex-1">{group.items.map(item => (<div key={item.id}><div className="flex justify-between text-xs mb-1.5"><span className="text-slate-600 font-medium truncate pr-2" title={t(item.nameKey)}>{t(item.nameKey).split(': ')[1]}</span><span className="text-slate-400">{item.count} ({item.pct}%)</span></div><div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="h-full rounded-full transition-all duration-1000" style={{ width: `${item.pct}%`, backgroundColor: item.hex }}></div></div></div>))}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- App Component ---
const App = () => {
  const [activeTab, setActiveTab] = useState('map'); 
  const [mapImage, setMapImage] = useState(null);
  const [pins, setPins] = useState([]); 
  const [zones, setZones] = useState([]); 
  const [editingPinId, setEditingPinId] = useState(null);
  const [mapMode, setMapMode] = useState('view');
  const [currentZonePoints, setCurrentZonePoints] = useState([]);
  const [lang, setLang] = useState('zh'); // 'zh' or 'en'
  const projectInputRef = useRef(null);

  const t = (key) => TRANSLATIONS[lang][key] || key;
  const activePin = useMemo(() => pins.find(p => p.id === editingPinId), [pins, editingPinId]);

  const handleSaveProject = () => {
    const projectData = { version: "2.0", timestamp: Date.now(), mapImage, pins, zones };
    const blob = new Blob([JSON.stringify(projectData)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url; link.download = `plant-signage-project-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };
  const handleLoadProject = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.mapImage) setMapImage(data.mapImage); if (data.pins) setPins(data.pins); if (data.zones) setZones(data.zones);
        alert(t('msgLoadSuccess'));
      } catch (err) { alert(t('msgLoadErr')); }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100 font-sans text-slate-800 overflow-hidden">
      <header className="bg-white/80 backdrop-blur-md border-b px-6 py-2 flex items-center justify-between z-40 shadow-sm shrink-0">
        <div className="flex-1 flex items-center gap-2">
            <div className="bg-emerald-600 text-white p-1.5 rounded-md shadow-sm">
                <Leaf size={18} />
            </div>
            <span className="font-bold text-slate-800 text-lg tracking-tight">{t('appTitle')}</span>
        </div>
        <nav className="flex bg-slate-100/50 p-1 rounded-lg gap-1">
            {['map', 'editor', 'stats'].map(tab => (
                <button 
                    key={tab}
                    onClick={() => {
                        if (tab === 'editor' && !activePin) return alert("请先在地图上选择或添加一张图片");
                        setActiveTab(tab);
                    }}
                    className={`px-6 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === tab ? 'bg-white shadow text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    {tab === 'map' && <MapIcon size={16} />}
                    {tab === 'editor' && <PenTool size={16} />}
                    {tab === 'stats' && <BarChart2 size={16} />}
                    <span className="hidden sm:inline">{tab === 'map' ? t('navMap') : tab === 'editor' ? t('navEditor') : t('navStats')}</span>
                </button>
            ))}
        </nav>
        <div className="flex-1 flex justify-end gap-2">
            <button onClick={() => setLang(l => l === 'zh' ? 'en' : 'zh')} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded transition-colors" title="Switch Language">
                <Globe size={14} /> {lang === 'zh' ? 'EN' : '中文'}
            </button>
            <div className="h-6 w-px bg-slate-200 mx-1 self-center"></div>
            <input type="file" ref={projectInputRef} className="hidden" accept=".json" onChange={handleLoadProject} />
            <button onClick={() => projectInputRef.current.click()} className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors" title={t('loadProject')}><UploadCloud size={18} /></button>
            <button onClick={handleSaveProject} className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors" title={t('saveProject')}><Download size={18} /></button>
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden relative">
        {activeTab === 'map' && <MapView mapImage={mapImage} setMapImage={setMapImage} pins={pins} setPins={setPins} zones={zones} setZones={setZones} editingPinId={editingPinId} setEditingPinId={setEditingPinId} setActiveTab={setActiveTab} mapMode={mapMode} setMapMode={setMapMode} currentZonePoints={currentZonePoints} setCurrentZonePoints={setCurrentZonePoints} onEditImage={(pin) => { setEditingPinId(pin.id); setActiveTab('editor'); }} t={t} />}
        {activeTab === 'editor' && activePin && <ImageEditor key={activePin.id} pin={activePin} setPins={setPins} setActiveTab={setActiveTab} t={t} />}
        {activeTab === 'stats' && <StatsView pins={pins} zones={zones} t={t} />}
      </main>
    </div>
  );
};

export default App;