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
    ChevronLeft,
    MapPin,
    FilePlus,
    Maximize,
    Minimize,
    Download,
    UploadCloud,
    Activity,
    Globe,
    Leaf,
    Cloud,
    Check,
    RefreshCw,
    ImageOff,
    FolderPlus,
    Move,
    Tag,
    Copy,
    FileText,
    Info,
    LayoutDashboard,
    Map as MapIconReg,
    PieChart,
    Grid,
    Zap,
    Thermometer,
    AlignLeft,

    CheckSquare,
    AlertCircle
} from 'lucide-react';

// --- 翻译字典 ---
const TRANSLATIONS = {
    zh: {
        appTitle: "标识标注器",
        appSubtitle: "Signage Analytics",
        navMap: "平面图",
        navEditor: "标注详情",
        navStats: "数据看板",
        loadProject: "读取存档 (.json)",
        saveProject: "保存项目 (.json)",
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
        createZoneFolder: "新建区域文件夹",
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
        modeMove: "移动视图",
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
        duplicatePin: "复制图片(用于标注另一标识)",
        currentModeHighlight: "突出选区模式",
        currentModeDraw: "标注分析模式",
        currentModeMove: "移动/拖拽模式",
        statsTitle: "标识系统数据看板",
        statsModeGroup: "统计模式: 按植物实体 (去重)",
        statsModeCount: "统计模式: 按图片累加",
        statsViewCharts: "统计图表",
        statsViewMap: "空间特征分布",
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
        chartHeatmapTitle: "特征共现热力图 (Co-occurrence Matrix)",
        chartDensityTitle: "区域信息密度 (Avg. Annotations/Sign)",
        chartCompositionTitle: "维度构成概览",
        statHealthTitle: "数据完整性",
        statHealthAnnotated: "已标注",
        statHealthNotes: "含备注",
        noData: "暂无数据",
        featureStrong: "强氛围感",
        featureHighRel: "高相关性",
        featureHighClear: "高清晰度",
        cat_A_group: "A. 氛围营造 (Inspirational Atmosphere)",
        cat_R_group: "R. 受众关联 (Audience Relevance)",
        cat_S_group: "S. 结构清晰 (Structural Clarity)",
        cat_A1: "A1: 提问与互动",
        cat_A2: "A2: 叙事语调",
        cat_R1: "R1: 生活经验连接",
        cat_R2: "R2: 感官引导",
        cat_S1: "S1: 信息层级",
        cat_S2: "S2: 文本量控制",
        cat_S3: "S3: 图文融合",
        msgSaved: "保存成功！",
        msgLoadSuccess: "项目读取成功！底图已恢复，请使用右侧列表的“批量修复”功能恢复标识图片。",
        msgLoadErr: "文件格式错误，无法读取。",
        alertZoneExist: "区域 ID 已存在。",
        alertZone3Points: "区域至少需要3个点",
        removeFromGroup: "从组合中移除",
        mergeWithPrev: "与上一张合并",
        btnReplaceMap: "更换底图",
        btnRemoveMap: "移除底图",
        btnAddImageNoMap: "直接添加图片 (跳过地图)",
        confirmRemoveMap: "确定要移除底图吗？已有的标点数据会保留在列表中，但将失去空间位置显示。",
        dropToZone: "拖放至此区域",
        drawZoneOnMap: "在地图上框选此区域",
        noTags: "暂无标注 (请选择右侧维度进行绘制)",
        listFullscreen: "全屏/退出全屏",
        exportLLM: "导出 AI 分析报告 (TXT)",
        exportLLMTitle: "导出自然语言描述数据，供 LLM 分析",
        prevImage: "上一张 ([)",
        nextImage: "下一张 (])",
        savingProject: "正在保存...",
        missingImage: "图片缺失",
        relinkImage: "点击重新关联图片",
        batchRelink: "批量修复图片",
        batchRelinkTip: "选择包含原图的文件夹或多个文件，系统将根据文件名自动匹配恢复。",
        relinkSuccess: "成功恢复 {count} 张图片！",
        originalFile: "原文件名",
        uploadMapToView: "请先上传底图以查看点位分布",
        saveTip: "提示：仅保存纯数据。底图和标识图片需在读档后重新加载。",
        panTip: "",
        mapLegend: "特征图例",
        statTotalAnnotations: "总标注数",
        chartDimDist: "维度分布",
        legendA: "A (氛围感)",
        legendR: "R (相关性)",
        legendS: "S (清晰度)",
        tabOverall: "总分析",
        tabRegional: "各区域分析",
        tabMap: "空间特征分布",
        currentZone: "当前图片所在区域:",
        statusEnabled: "已启用",
        statusDisabled: "已禁用",
        drawZoneBoundary: "绘制 {id} 区 边界",
        missingImagesBanner: "部分图片缺失，请修复"
    },
    en: {
        appTitle: "Signage Annotator",
        appSubtitle: "Professional Tool",
        navMap: "Map View",
        navEditor: "Editor",
        navStats: "Dashboard",
        loadProject: "Load Project (.json)",
        saveProject: "Save Project (.json)",
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
        createZoneFolder: "New Zone Folder",
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
        modeMove: "Pan/Move",
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
        duplicatePin: "Duplicate (For 2nd Sign)",
        currentModeHighlight: "Highlight Mode",
        currentModeDraw: "Annotation Mode",
        currentModeMove: "Pan Mode",
        statsTitle: "Analytics Dashboard",
        statsModeGroup: "Mode: By Plant Entity (Unique)",
        statsModeCount: "Mode: By Image Count (Total)",
        statsViewCharts: "Charts",
        statsViewMap: "Spatial Map",
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
        chartHeatmapTitle: "Co-occurrence Matrix",
        chartDensityTitle: "Information Density (Avg. Annotations/Sign)",
        chartCompositionTitle: "Composition Overview",
        statHealthTitle: "Data Health",
        statHealthAnnotated: "Annotated",
        statHealthNotes: "With Notes",
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
        msgLoadSuccess: "Metadata loaded! Please upload map and use 'Batch Relink' to restore images.",
        msgLoadErr: "Invalid file format.",
        alertZoneExist: "Zone ID already exists.",
        alertZone3Points: "Zone needs at least 3 points",
        removeFromGroup: "Remove from Group",
        mergeWithPrev: "Merge with Previous",
        btnReplaceMap: "Replace Map",
        btnRemoveMap: "Remove Map",
        btnAddImageNoMap: "Add Images (Skip Map)",
        confirmRemoveMap: "Are you sure? Pins will remain in list but lose spatial context.",
        dropToZone: "Drop to move here",
        drawZoneOnMap: "Draw zone boundary on map",
        noTags: "No tags",
        listFullscreen: "Fullscreen / Exit",
        exportLLM: "Export AI Report (TXT)",
        exportLLMTitle: "Export natural language data for LLM analysis",
        prevImage: "Previous ([)",
        nextImage: "Next (])",
        savingProject: "Saving Metadata...",
        missingImage: "Missing Image",
        relinkImage: "Click to relink image",
        batchRelink: "Batch Relink Images",
        batchRelinkTip: "Select original images to restore display.",
        relinkSuccess: "Successfully relinked {count} images!",
        originalFile: "Filename",
        uploadMapToView: "Please upload map to view pins",
        saveTip: "Note: Saves data only. Map & Images excluded.",
        toolHand: "Hand Tool",
        toolZoomIn: "Zoom In",
        toolZoomOut: "Zoom Out",
        toolFit: "Fit Screen",
        mapLegend: "Feature Legend",
        statTotalAnnotations: "Total Annotations",
        chartDimDist: "Dimension Distribution",
        legendA: "A (Atmosphere)",
        legendR: "R (Relevance)",
        legendS: "S (Clarity)",
        tabOverall: "Overall Analysis",
        tabRegional: "Regional Analysis",
        tabMap: "Spatial Distribution",
        currentZone: "Current Zone:",
        statusEnabled: "Enabled",
        statusDisabled: "Disabled",
        drawZoneBoundary: "Draw Zone {id} Boundary",
        missingImagesBanner: "Some images missing. Please fix."
    }
};

// --- 常量定义 ---
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

// --- SVG Math Helpers ---
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
    return d;
};

// --- New Advanced Charts ---





// --- SVG 图表组件 ---
const RadarChart = ({ data }) => {
    const size = 300;
    const center = size / 2;
    const radius = 100;
    const levels = 4;
    const angleSlice = (Math.PI * 2) / data.length;
    const chartId = useMemo(() => Math.random().toString(36).substr(2, 9), []);

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

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
            <defs>
                {data.map((d, i) => {
                    const nextIndex = (i + 1) % data.length;
                    const nextD = data[nextIndex];
                    const p1 = shapePoints[i];
                    const p2 = shapePoints[nextIndex];
                    return (
                        <linearGradient key={`grad-${chartId}-${i}`} id={`grad-${chartId}-${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor={d.color || '#94a3b8'} stopOpacity="0.4" />
                            <stop offset="100%" stopColor={nextD.color || '#94a3b8'} stopOpacity="0.4" />
                        </linearGradient>
                    );
                })}
                {data.map((d, i) => {
                    const nextIndex = (i + 1) % data.length;
                    const nextD = data[nextIndex];
                    const p1 = shapePoints[i];
                    const p2 = shapePoints[nextIndex];
                    return (
                        <linearGradient key={`stroke-${chartId}-${i}`} id={`stroke-${chartId}-${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor={d.color || '#94a3b8'} />
                            <stop offset="100%" stopColor={nextD.color || '#94a3b8'} />
                        </linearGradient>
                    );
                })}
            </defs>

            {gridPoints.map((levelPoints, i) => (
                <polygon key={i} points={levelPoints.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#e2e8f0" strokeWidth="1" />
            ))}
            {data.map((_, i) => {
                const end = getCoordinates(i, 1.1);
                const start = { x: center, y: center };
                return <line key={i} x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="#e2e8f0" />;
            })}

            {/* Partitioned Gradient Fill Segments */}
            {data.map((_, i) => {
                const nextIndex = (i + 1) % data.length;
                const p1 = shapePoints[i];
                const p2 = shapePoints[nextIndex];
                // Triangle: Center -> P1 -> P2 -> Center
                return (
                    <path
                        key={`slice-${i}`}
                        d={`M ${center},${center} L ${p1.x},${p1.y} L ${p2.x},${p2.y} Z`}
                        fill={`url(#grad-${chartId}-${i})`}
                        stroke="none"
                    />
                );
            })}

            {/* Partitioned Stroke Lines for Perimeter */}
            {data.map((_, i) => {
                const nextIndex = (i + 1) % data.length;
                const p1 = shapePoints[i];
                const p2 = shapePoints[nextIndex];
                return (
                    <line
                        key={`edge-${i}`}
                        x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                        stroke={`url(#stroke-${chartId}-${i})`}
                        strokeWidth="2"
                    />
                );
            })}

            {data.map((d, i) => {
                const pos = getCoordinates(i, 1.35);
                const dot = getCoordinates(i, d.value / maxValue);
                return (
                    <g key={i}>
                        <circle cx={dot.x} cy={dot.y} r="4" fill={d.color || "#10b981"} stroke="white" strokeWidth="1.5" />
                        <text x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill={d.color || "#64748b"} fontWeight="700">
                            {d.label.split(':')[0]}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

const StackedBarChart = ({ zones, data, t }) => {
    if (zones.length === 0) return <div className="text-center text-slate-400 py-10">No Data</div>;

    const maxTotal = Math.max(...zones.map(z => {
        const d = data[z.id] || { Atmosphere: 0, Relevance: 0, Clarity: 0 };
        return d.Atmosphere + d.Relevance + d.Clarity;
    })) || 1;

    return (
        <div className="w-full space-y-4">
            {zones.map(z => {
                const d = data[z.id] || { Atmosphere: 0, Relevance: 0, Clarity: 0 };
                const total = d.Atmosphere + d.Relevance + d.Clarity;
                const pctA = total ? (d.Atmosphere / total) * 100 : 0;
                const pctR = total ? (d.Relevance / total) * 100 : 0;
                const pctS = total ? (d.Clarity / total) * 100 : 0;
                const barWidth = maxTotal ? (total / maxTotal) * 100 : 0;

                return (
                    <div key={z.id} className="flex items-center gap-3">
                        <div className="w-12 text-xs font-bold text-slate-600 truncate text-right shrink-0" title={z.id}>{z.id}</div>

                        {/* Track Background */}
                        <div className="flex-1 bg-slate-50 rounded-full h-8 flex items-center px-1 overflow-hidden relative">
                            {/* The Bar */}
                            <div className="h-5 rounded-md overflow-hidden flex relative min-w-[2px] transition-all duration-500 ease-out" style={{ width: `${Math.max(1, barWidth)}%` }}>
                                {pctA > 0 && <div style={{ width: `${pctA}%` }} className="h-full bg-red-400 relative group"><div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div></div>}
                                {pctR > 0 && <div style={{ width: `${pctR}%` }} className="h-full bg-blue-400 relative group"><div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div></div>}
                                {pctS > 0 && <div style={{ width: `${pctS}%` }} className="h-full bg-emerald-400 relative group"><div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div></div>}
                            </div>

                            {/* Hover Tooltip Overlay (Invisible but captures hover for title) */}
                            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-auto cursor-help"
                                title={`${t ? t('cat_A_group') : 'A'}: ${d.Atmosphere} | ${t ? t('cat_R_group') : 'R'}: ${d.Relevance} | ${t ? t('cat_S_group') : 'S'}: ${d.Clarity}`}>
                            </div>
                        </div>

                        <div className="w-8 text-xs font-bold text-slate-500 text-right shrink-0">{total}</div>
                    </div>
                );
            })}
        </div>
    );
};

// New Chart: Doughnut
const DoughnutChart = ({ data, total }) => {
    let cumulativePercent = 0;
    // r=40, strokeWidth=10, 2*PI*r=251.33
    const RADIUS = 40;
    const STROKE = 10;
    const CIRCUM = 2 * Math.PI * RADIUS;
    return (
        <div className="relative w-52 h-52 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {data.map((item, i) => {
                    const percent = total > 0 ? item.value / total : 0;
                    const dashArray = percent * CIRCUM;
                    const dashOffset = -cumulativePercent * CIRCUM;
                    cumulativePercent += percent;
                    return (
                        <circle
                            key={i}
                            r={RADIUS}
                            cx="50"
                            cy="50"
                            fill="transparent"
                            stroke={item.color}
                            strokeWidth={STROKE}
                            strokeDasharray={`${dashArray} ${CIRCUM - dashArray}`}
                            strokeDashoffset={dashOffset}
                        />
                    );
                })}
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold text-slate-700">{total}</span>
                <span className="text-xs text-slate-400 uppercase">Elements</span>
            </div>
        </div>
    );
};

// New Chart: Heatmap Grid
const HeatmapGrid = ({ matrix, labels }) => {
    const maxVal = Math.max(...matrix.flat()) || 1;
    return (
        <div className="flex flex-col overflow-auto">
            <div className="flex">
                <div className="w-12 h-12"></div>
                {labels.map(l => <div key={l} className="w-10 h-12 flex items-center justify-center text-[10px] font-bold text-slate-600">{l}</div>)}
            </div>
            {matrix.map((row, i) => (
                <div key={i} className="flex items-center">
                    <div className="w-12 h-10 flex items-center justify-center text-[10px] font-bold text-slate-600">{labels[i]}</div>
                    {row.map((val, j) => (
                        <div
                            key={j}
                            className="w-10 h-10 flex items-center justify-center border border-white text-[10px] font-bold"
                            style={{
                                backgroundColor: `rgba(16, 185, 129, ${val / maxVal})`,
                                color: val / maxVal > 0.5 ? '#ffffff' : '#1e293b'
                            }}
                            title={`${labels[i]} & ${labels[j]}: ${val}`}
                        >
                            {val > 0 ? val : ''}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

// --- Toast Component (Replaces Alert) ---
const Toast = ({ message, type = 'info', onClose }) => (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 rounded-lg shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300 ${type === 'error' ? 'bg-red-500 text-white' :
        type === 'success' ? 'bg-emerald-600 text-white' :
            'bg-slate-800 text-white'
        }`}>
        {type === 'success' && <CheckCircle2 size={16} />}
        {type === 'error' && <Info size={16} />}
        {type === 'info' && <Info size={16} />}
        <span className="text-sm font-medium">{message}</span>
    </div>
);

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
                        <input type="text" maxLength="3" value={formData.id} onChange={e => setFormData({ ...formData, id: e.target.value.toUpperCase() })} className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">{t('labelZoneName')}</label>
                        <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2">{t('labelZoneColor')}</label>
                        <div className="grid grid-cols-4 gap-2">
                            {ZONE_PALETTE.map((c, i) => (
                                <button key={i} onClick={() => setFormData({ ...formData, colorIndex: i })} className={`w-8 h-8 rounded-full border-2 transition-transform ${formData.colorIndex === i ? 'border-slate-600 scale-110' : 'border-transparent hover:scale-105'}`} style={{ backgroundColor: c.stroke }} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex gap-2">
                    <button onClick={() => onSave(zone.id, formData)} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">{t('btnSave')}</button>
                    <button onClick={() => { if (confirm(t('confirmDeleteZone'))) onDelete(zone.id); }} className="p-2 border border-red-200 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                </div>
            </div>
        </div>
    );
};

// --- 组件：地图视图 ---
const MapView = ({
    mapImage, setMapImage, pins, setPins, zones, setZones,
    editingPinId, setEditingPinId, setActiveTab, mapMode, setMapMode,
    currentZonePoints, setCurrentZonePoints, onEditImage, t, showToast
}) => {
    const [draggingPinId, setDraggingPinId] = useState(null);
    const [draggingZonePoint, setDraggingZonePoint] = useState(null);
    const [tempClickPos, setTempClickPos] = useState(null);
    const [collapsedZones, setCollapsedZones] = useState({});
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [editingZone, setEditingZone] = useState(null);
    const [placingPinId, setPlacingPinId] = useState(null);
    const [mapZoom, setMapZoom] = useState(1);
    const [drawingForZoneId, setDrawingForZoneId] = useState(null);

    const [isListFullscreen, setIsListFullscreen] = useState(false);

    const contentRef = useRef(null);
    const fileInputRef = useRef(null);
    const pinInputRef = useRef(null);
    const batchInputRef = useRef(null);
    const relinkInputRef = useRef(null);

    const pinsWithInfo = useMemo(() => {
        const categorizedPins = pins.map(pin => {
            if (pin.x === null || pin.y === null) return { ...pin, zoneId: 'unlocated' };
            const foundZone = zones.find(z => isPointInPolygon({ x: pin.x, y: pin.y }, z.points));
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



    const handleZoneDrop = (e, targetZoneId) => {
        e.preventDefault();
        // List drag-drop removed; zone drop kept for backward compatibility
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

    const handleDuplicatePin = (e, pin) => {
        e.stopPropagation();
        const newPin = {
            ...pin,
            id: Date.now() + Math.random(),
            annotations: [],
            highlightPoly: [],
            notes: '',
            groupId: null
        };
        setPins(prev => {
            const idx = prev.findIndex(p => p.id === pin.id);
            const copy = [...prev];
            if (idx === -1) {
                copy.push(newPin);
            } else {
                copy.splice(idx + 1, 0, newPin);
            }
            return copy;
        });
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
                        fileName: file.name,
                        filters: { brightness: 100, contrast: 100 },
                        annotations: [], highlightPoly: [], notes: '', groupId: null,
                        manualZoneId: null
                    });
                };
                reader.readAsDataURL(file);
            });
        })).then(newPins => {
            setPins(prev => [...prev, ...newPins]);
            setCollapsedZones(prev => ({ ...prev, 'unlocated': false }));
        });
    };

    // 批量重链图片
    const handleBatchRelink = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const fileMap = {};
        files.forEach(f => fileMap[f.name] = f);

        let restoredCount = 0;
        const promises = pins.map(pin => {
            if (!pin.imageSrc && pin.fileName && fileMap[pin.fileName]) {
                restoredCount++;
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        resolve({ ...pin, imageSrc: ev.target.result, originalImageSrc: ev.target.result });
                    };
                    reader.readAsDataURL(fileMap[pin.fileName]);
                });
            }
            return Promise.resolve(pin);
        });

        Promise.all(promises).then(finalPins => {
            setPins(finalPins);
            showToast(t('relinkSuccess').replace('{count}', restoredCount), 'success');
        });
    };

    const handleCreateZoneFolder = () => {
        let nextLetter = 'A';
        for (let i = 0; i < 26; i++) {
            const char = String.fromCharCode(65 + i);
            if (!zones.find(z => z.id === char)) { nextLetter = char; break; }
        }
        setZones([...zones, { id: nextLetter, name: '未标定区域', colorIndex: zones.length % ZONE_PALETTE.length, points: [] }]);
    };

    const startDrawingForZone = (zoneId) => { setDrawingForZoneId(zoneId); setCurrentZonePoints([]); setMapMode('draw_zone'); };
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
        e.stopPropagation();
        // 移除二次确认，直接删除
        setPins(prev => prev.filter(p => p.id !== id));
        if (editingPinId === id) setEditingPinId(null);
    };

    const finishZone = () => {
        if (currentZonePoints.length < 3) return showToast(t('alertZone3Points'), 'error');
        if (drawingForZoneId) {
            setZones(prev => prev.map(z => z.id === drawingForZoneId ? { ...z, points: currentZonePoints } : z));
            setDrawingForZoneId(null);
        } else {
            let nextLetter = 'A';
            for (let i = 0; i < 26; i++) {
                const char = String.fromCharCode(65 + i);
                if (!zones.find(z => z.id === char)) { nextLetter = char; break; }
            }
            setZones([...zones, { id: nextLetter, name: '', colorIndex: zones.length % ZONE_PALETTE.length, points: currentZonePoints }]);
        }
        setCurrentZonePoints([]);
        setMapMode('view');
    };

    const cancelDraw = () => { setCurrentZonePoints([]); setDrawingForZoneId(null); setMapMode('view'); };

    const handleZoneSave = (oldId, newData) => {
        if (oldId !== newData.id && zones.find(z => z.id === newData.id)) return showToast(t('alertZoneExist'), 'error');
        setZones(zones.map(z => z.id === oldId ? { ...z, id: newData.id, name: newData.name, colorIndex: newData.colorIndex } : z));
        setEditingZone(null);
    };
    const handleZoneDelete = (id) => {
        setZones(zones.filter(z => z.id !== id));
        setEditingZone(null);
    };

    const handleRemoveMap = () => {
        if (confirm(t('confirmRemoveMap'))) {
            setMapImage(null);
        }
    };

    // 检查是否有缺失图片的 Pin
    const hasMissingImages = useMemo(() => pins.some(p => !p.imageSrc), [pins]);

    return (
        <div className="flex h-full bg-slate-50 overflow-hidden" onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} onTouchEnd={handleMouseUp} onTouchMove={handleMouseMove}>
            {editingZone && <ZoneEditModal zone={editingZone} onClose={() => setEditingZone(null)} onSave={handleZoneSave} onDelete={handleZoneDelete} t={t} />}

            {!isListFullscreen && (
                <div className="flex-1 flex flex-col p-4 overflow-hidden relative">
                    <div className="absolute top-6 left-6 z-20 bg-white shadow-lg border border-slate-100 rounded-xl p-1.5 flex flex-col gap-2">
                        <TooltipButton active={mapMode === 'view'} onClick={() => setMapMode('view')} icon={<MousePointer2 size={20} />} label={t('mapToolbarView')} />
                        <TooltipButton active={mapMode === 'add_pin'} onClick={() => setMapMode('add_pin')} icon={<Plus size={20} />} label={t('mapToolbarAdd')} />
                        <div className="w-full h-px bg-slate-200 my-1"></div>
                        <TooltipButton active={mapMode === 'draw_zone' && !drawingForZoneId} onClick={() => { setDrawingForZoneId(null); setMapMode('draw_zone'); setCurrentZonePoints([]); }} icon={<Layers size={20} />} label={t('mapToolbarDrawZone')} />
                        <TooltipButton active={mapMode === 'edit_zone'} onClick={() => setMapMode(mapMode === 'edit_zone' ? 'view' : 'edit_zone')} icon={<Edit3 size={20} />} label={t('mapToolbarEditZone')} />
                    </div>

                    {mapImage && (
                        <div className="absolute top-6 right-6 z-20 flex gap-2">
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onload = (ev) => setMapImage(ev.target.result); reader.readAsDataURL(file); } }} />
                            <button onClick={() => fileInputRef.current.click()} className="flex items-center gap-1 bg-white hover:bg-slate-50 text-slate-600 px-3 py-2 rounded-lg shadow-md border border-slate-200 text-xs font-medium transition-colors">
                                <RefreshCw size={14} /> {t('btnReplaceMap')}
                            </button>
                            <button onClick={handleRemoveMap} className="flex items-center gap-1 bg-white hover:bg-red-50 text-red-500 px-3 py-2 rounded-lg shadow-md border border-slate-200 text-xs font-medium transition-colors">
                                <ImageOff size={14} /> {t('btnRemoveMap')}
                            </button>
                        </div>
                    )}

                    {mapMode === 'place_pending' && <div className="absolute top-6 left-20 z-20 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm flex items-center gap-3 animate-pulse cursor-default pointer-events-none"><MapPin size={16} /><span>{t('placePinTip')}</span></div>}
                    {mapMode === 'draw_zone' && <div className="absolute top-6 left-20 z-20 bg-slate-800/90 backdrop-blur text-white px-4 py-2 rounded-lg shadow-lg text-sm flex items-center gap-3 animate-fade-in"><span>{drawingForZoneId ? t('drawZoneBoundary').replace('{id}', drawingForZoneId) : t('pointsCount')}: {currentZonePoints.length}</span><div className="h-4 w-px bg-slate-600"></div><button onClick={finishZone} className="bg-emerald-500 hover:bg-emerald-600 px-3 py-1 rounded text-xs font-bold transition-colors">{t('zoneClose')}</button><button onClick={() => { if (currentZonePoints.length > 0) setCurrentZonePoints(prev => prev.slice(0, -1)); else cancelDraw(); }} className="text-slate-300 hover:text-white flex items-center gap-1"><CornerUpLeft size={14} /> {t('undoPoint')}</button></div>}

                    <div className="bg-white rounded-xl shadow-inner border border-slate-200 h-full flex items-center justify-center overflow-hidden relative">
                        {!mapImage ? (
                            <div className="text-center p-10 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 max-w-md w-full">
                                <Upload className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-slate-600 font-medium mb-4">{t('uploadMap')}</h3>
                                <div className="flex flex-col gap-3">
                                    <button onClick={() => fileInputRef.current.click()} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 w-full">
                                        <ImageIcon size={18} /> {t('selectImage')}
                                    </button>
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <div className="h-px bg-slate-200 flex-1"></div>
                                        <span>OR</span>
                                        <div className="h-px bg-slate-200 flex-1"></div>
                                    </div>
                                    <button onClick={() => batchInputRef.current.click()} className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-6 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 w-full">
                                        <FilePlus size={18} /> {t('btnAddImageNoMap')}
                                    </button>
                                </div>
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
                                                <line x1={currentZonePoints[currentZonePoints.length - 1].x} y1={currentZonePoints[currentZonePoints.length - 1].y} x2={mousePos.x} y2={mousePos.y} stroke="#333" strokeWidth="0.3" strokeDasharray="1" />
                                                <line x1={mousePos.x} y1={mousePos.y} x2={currentZonePoints[0].x} y2={currentZonePoints[0].y} stroke="rgba(16, 185, 129, 0.5)" strokeWidth="0.5" />
                                                {currentZonePoints.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="0.8" fill="white" stroke="#333" strokeWidth="0.2" />)}
                                            </g>
                                        )}
                                    </svg>
                                    {pinsWithInfo.filter(p => p.x !== null).map(pin => (
                                        <div key={pin.id} className={`absolute transform -translate-x-1/2 -translate-y-full group cursor-pointer transition-transform duration-200 z-30 ${draggingPinId === pin.id ? 'scale-125 z-50' : ''}`} style={{ left: `${pin.x}%`, top: `${pin.y}%` }} onMouseDown={(e) => { e.stopPropagation(); if (mapMode === 'view') setDraggingPinId(pin.id); }} onClick={(e) => { if (!draggingPinId) { e.stopPropagation(); const listEl = document.getElementById(`pin-item-${pin.id}`); if (listEl) { listEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); listEl.classList.add('bg-yellow-100'); setTimeout(() => listEl.classList.remove('bg-yellow-100'), 1000); } if (mapMode === 'view') setEditingPinId(pin.id); } }}>
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
                                <button onClick={() => setMapZoom(z => Math.max(0.25, z - 0.25))} className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><ZoomOut size={16} /></button>
                                <span className="text-xs font-mono text-slate-600 w-12 text-center">{(mapZoom * 100).toFixed(0)}%</span>
                                <button onClick={() => setMapZoom(z => Math.min(4, z + 0.25))} className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><ZoomIn size={16} /></button>
                                <button onClick={() => setMapZoom(1)} className="text-xs text-slate-400 hover:text-slate-600 ml-1"><Maximize size={14} /></button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 清单侧边栏 - 根据全屏状态调整宽度 */}
            <div className={`${isListFullscreen ? 'w-full' : 'w-64'} bg-white border-l shadow-2xl z-30 flex flex-col h-full`}>
                <div className="p-3 border-b bg-slate-50 flex justify-between items-center shrink-0">
                    <h3 className="font-bold text-slate-700 flex items-center gap-2 text-sm">
                        <List size={16} /> {t('listTitle')}
                    </h3>
                    <div className="flex gap-1 items-center">
                        <button
                            onClick={() => setIsListFullscreen(!isListFullscreen)}
                            className={`p-1.5 rounded transition-colors ${isListFullscreen ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                            title={t('listFullscreen')}
                        >
                            {isListFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                        </button>
                        <div className="w-px h-4 bg-slate-300 mx-1"></div>
                        <button onClick={handleCreateZoneFolder} className="p-1.5 bg-slate-100 text-slate-600 rounded hover:bg-slate-200 transition-colors" title={t('createZoneFolder')}><FolderPlus size={16} /></button>
                        <input type="file" multiple ref={batchInputRef} className="hidden" accept="image/*" onChange={handleBatchUpload} />
                        <button onClick={() => batchInputRef.current.click()} className="p-1.5 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors" title={t('batchUpload')}><FilePlus size={16} /></button>
                    </div>
                </div>

                {/* 批量修复提示栏 */}
                {hasMissingImages && (
                    <div className="bg-amber-50 p-2 border-b border-amber-100 flex flex-col gap-2">
                        <div className="text-[10px] text-amber-700 flex items-center gap-1">
                            <ImageIcon size={12} /> {t('missingImagesBanner')}
                        </div>
                        <input type="file" multiple webkitdirectory="" ref={relinkInputRef} className="hidden" onChange={handleBatchRelink} />
                        <button
                            onClick={() => relinkInputRef.current.click()}
                            className="w-full py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs rounded font-medium flex items-center justify-center gap-1 transition-colors"
                            title={t('batchRelinkTip')}
                        >
                            <FolderOpen size={14} /> {t('batchRelink')}
                        </button>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                    {/* 修复：使用 sort 排序 key，并确保只渲染存在的 key，避免 undefined 错误 */}
                    {Object.keys(groupedPins).sort((a, b) => {
                        if (a === 'unlocated') return -1;
                        if (b === 'unlocated') return 1;
                        return a.localeCompare(b);
                    }).map((zoneId) => {
                        const isUnlocated = zoneId === 'unlocated';
                        const zoneObj = zones.find(z => z.id === zoneId);
                        const zoneName = isUnlocated ? t('unlocatedFolder') : (zoneObj ? (zoneObj.name ? `${zoneObj.id}区 - ${zoneObj.name}` : `${zoneObj.id} 区`) : t('zoneUnzoned'));
                        const zoneColor = isUnlocated ? '#f59e0b' : (zoneObj ? ZONE_PALETTE[zoneObj.colorIndex || 0].stroke : '#94a3b8');
                        const items = groupedPins[zoneId];
                        const hasPoints = zoneObj?.points?.length > 0;

                        if (!items) return null;

                        return (
                            <div
                                key={zoneId}
                                className={`border rounded-lg overflow-hidden ${isUnlocated ? 'bg-orange-50/50 border-orange-100' : 'bg-white border-slate-200'}`}
                                onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('ring-2', 'ring-emerald-400'); }}
                                onDragLeave={(e) => { e.currentTarget.classList.remove('ring-2', 'ring-emerald-400'); }}
                                onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove('ring-2', 'ring-emerald-400'); handleZoneDrop(e, zoneId); }}
                            >
                                <div className="flex items-center justify-between p-2 bg-slate-50/80 hover:bg-slate-100 group select-none">
                                    <div onClick={() => setCollapsedZones(prev => ({ ...prev, [zoneId]: !prev[zoneId] }))} className="flex items-center gap-2 font-medium text-slate-700 flex-1 cursor-pointer min-w-0">
                                        {collapsedZones[zoneId] ? <Folder size={16} className="text-slate-400 shrink-0" /> : <FolderOpen size={16} style={{ color: zoneColor }} className="shrink-0" />}
                                        <div className="flex flex-col min-w-0">
                                            <span className={`truncate text-sm ${isUnlocated ? 'text-orange-700 font-bold' : ''}`} title={zoneName}>{zoneName}</span>
                                            {!isUnlocated && !hasPoints && <span className="text-[10px] text-orange-500 flex items-center gap-1">未在地图标定</span>}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 shrink-0">
                                        {/* 如果是未标定的逻辑区域，显示绘制按钮 */}
                                        {!isUnlocated && !hasPoints && zoneObj && (
                                            <button
                                                onClick={() => startDrawingForZone(zoneId)}
                                                className="p-1 hover:bg-emerald-100 text-emerald-600 rounded"
                                                title={t('drawZoneOnMap')}
                                            >
                                                <MapIcon size={14} />
                                            </button>
                                        )}
                                        <span className="text-xs text-slate-400 mr-1">{items.length}</span>
                                        {!isUnlocated && zoneObj && <button onClick={() => setEditingZone(zoneObj)} className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-emerald-600 transition-colors" title={t('zoneSetting')}><Settings size={14} /></button>}
                                    </div>
                                </div>
                                {!collapsedZones[zoneId] && (
                                    <div className={`divide-y divide-slate-100 ${isListFullscreen ? 'grid grid-cols-3 gap-2 p-2 divide-y-0' : ''}`}>
                                        {items.length === 0 && <div className="p-4 text-center text-xs text-slate-400 italic col-span-full">{t('dropToZone')}</div>}
                                        {items.map((pin, idx) => {
                                            const canGroupWithPrev = idx > 0 && !isUnlocated;
                                            const isGrouped = !!pin.groupId;
                                            return (
                                                <div
                                                    key={pin.id}
                                                    id={`pin-item-${pin.id}`}
                                                    onClick={() => {
                                                        setEditingPinId(pin.id);
                                                        onEditImage(pin);
                                                    }}
                                                    className={`flex gap-3 p-2 hover:bg-slate-50 transition-colors cursor-pointer group relative 
                                                        ${editingPinId === pin.id ? 'bg-emerald-50/50' : ''} 
                                                        ${isGrouped ? 'pl-6' : ''} 
                                                        ${isUnlocated && placingPinId === pin.id ? 'ring-2 ring-emerald-500 bg-emerald-50' : ''}
                                                        ${isListFullscreen ? 'border border-slate-200 rounded-lg flex-col items-start' : 'items-center'}
                                                    `}
                                                >
                                                    {!isListFullscreen && isGrouped && <div className="absolute left-3 top-[-10px] bottom-1/2 border-l-2 border-b-2 border-slate-200 w-3 rounded-bl-lg"></div>}

                                                    {/* 图片展示区 (带缺失状态) */}
                                                    <div className={`bg-slate-200 rounded overflow-hidden shrink-0 border border-slate-200 relative group/img flex items-center justify-center ${isListFullscreen ? 'w-full h-64' : 'w-10 h-10'}`}>
                                                        {pin.imageSrc ? (
                                                            <img src={pin.imageSrc} className="w-full h-full object-contain" alt="" />
                                                        ) : (
                                                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100">
                                                                <ImageOff size={isListFullscreen ? 24 : 14} />
                                                                {isListFullscreen && <span className="text-[10px] mt-1 text-center px-1">{pin.fileName || t('missingImage')}</span>}
                                                            </div>
                                                        )}

                                                        {isUnlocated && (
                                                            <div
                                                                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer"
                                                                onClick={(e) => { e.stopPropagation(); startPlacingPin(pin.id); }}
                                                                title="放置到地图"
                                                            >
                                                                <MapPin size={isListFullscreen ? 32 : 16} className="text-white" />
                                                            </div>
                                                        )}
                                                        {pin.annotations.length > 0 && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-tl shadow-sm"></div>}
                                                    </div>

                                                    <div className="flex-1 min-w-0 flex flex-col justify-center w-full">
                                                        <div className="flex justify-between items-center w-full">
                                                            <span className={`text-xs font-bold ${editingPinId === pin.id ? 'text-emerald-700' : 'text-slate-700'} ${isListFullscreen ? 'text-sm' : ''}`}>
                                                                {isUnlocated ? t('unlocatedLabel') : pin.displayName}
                                                            </span>
                                                            {!isUnlocated && !isListFullscreen && (
                                                                <button onClick={(e) => { e.stopPropagation(); onEditImage(pin); }} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 rounded text-slate-500" title="Edit"><Edit3 size={12} /></button>
                                                            )}
                                                        </div>

                                                        <div className={`text-[10px] text-slate-400 truncate ${isListFullscreen ? 'text-xs whitespace-normal line-clamp-1 h-5' : ''}`}>
                                                            {/* 如果图片缺失，显示文件名提示 */}
                                                            {!pin.imageSrc ? (
                                                                <span className="text-red-400 flex items-center gap-1">
                                                                    <ImageOff size={10} /> {pin.fileName || 'Missing'}
                                                                </span>
                                                            ) : (
                                                                pin.notes || (pin.annotations.length > 0 ? `${pin.annotations.length} marks` : "No notes")
                                                            )}
                                                        </div>

                                                        {isListFullscreen && pin.annotations.length > 0 && (
                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                {[...new Set(pin.annotations.map(a => a.category))].map(catId => {
                                                                    const cat = ANALYSIS_CATEGORIES.find(c => c.id === catId);
                                                                    return cat ? (
                                                                        <span key={catId} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[9px] font-medium">
                                                                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.hex }}></span>
                                                                            {t(cat.nameKey)}
                                                                        </span>
                                                                    ) : null;
                                                                })}
                                                            </div>
                                                        )}

                                                        {isListFullscreen && (
                                                            <div className="flex gap-1 mt-1 pt-1 border-t border-slate-100 w-full justify-end">
                                                                <button onClick={(e) => handleDeletePin(e, pin.id)} className="px-2 py-1 text-red-500 hover:bg-red-50 rounded text-xs flex items-center gap-1"><Trash2 size={12} /></button>
                                                                <button onClick={(e) => handleDuplicatePin(e, pin)} className="px-2 py-1 text-blue-500 hover:bg-blue-50 rounded text-xs flex items-center gap-1"><Copy size={12} /></button>
                                                                <button onClick={(e) => { e.stopPropagation(); onEditImage(pin); }} className="px-2 py-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded text-xs flex items-center gap-1"><Edit3 size={12} /></button>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {!isListFullscreen && (
                                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                            <button onClick={(e) => handleDuplicatePin(e, pin)} className="p-1 hover:bg-blue-100 rounded text-slate-400 hover:text-blue-500" title={t('duplicatePin')}><Copy size={12} /></button>
                                                            <button onClick={(e) => handleDeletePin(e, pin.id)} className="p-1 hover:bg-red-100 rounded text-slate-400 hover:text-red-500" title={t('deletePin')}><Trash2 size={12} /></button>
                                                        </div>
                                                    )}
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
const ImageEditor = ({ pin, setPins, setActiveTab, t, onNavigate, hasPrev, hasNext, pins, zones }) => {
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
        brushSize: 28, // Increased default brush size (thicker)
        isSaving: false, // 保存状态指示
        offset: { x: 0, y: 0 },
        isPanning: false,
        lastMousePos: { x: 0, y: 0 }
    });
    // 维度启用状态（用于 S 组为基础维度的开关逻辑）。S 组默认开启。优先加载 pin 保存的设置。
    const [dimEnabled, setDimEnabled] = useState(() => {
        const map = {};
        ANALYSIS_CATEGORIES.forEach(c => { map[c.id] = true; });
        if (pin.dimEnabled) {
            Object.keys(pin.dimEnabled).forEach(k => { map[k] = !!pin.dimEnabled[k]; });
        }
        return map;
    });

    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const restoreInputRef = useRef(null); // 单张恢复 input

    // NEW: Persistent Image Object Reference
    const imageObjRef = useRef(null);

    // 重置状态当 Pin ID 改变 (切换图片)
    useEffect(() => {
        setFilters(pin.filters);
        setHighlightPoly(pin.highlightPoly || []);
        setPaths(pin.annotations);
        setNotes(pin.notes || '');
        // Do NOT reset zoom/offset aggressively to avoid jarring jumps
        setViewState(prev => ({ ...prev, isImageLoaded: false }));
        imageObjRef.current = null; // Clear current image ref
    }, [pin.id]);

    // 快捷键监听
    useEffect(() => {
        const handleKeyDown = (e) => {
            // 避免在输入框中触发
            if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;

            if (e.key === '[') {
                if (hasPrev) onNavigate(-1);
            } else if (e.key === ']') {
                if (hasNext) onNavigate(1);
            } else if (e.code === 'Space') {
                setViewState(prev => ({ ...prev, mode: 'move' }));
            }
        };
        const handleKeyUp = (e) => {
            // 避免在输入框中触发
            if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
            if (e.code === 'Space') {
                setViewState(prev => ({ ...prev, mode: 'draw' }));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [hasPrev, hasNext, onNavigate]);

    // 自动保存逻辑 (Debounced)
    useEffect(() => {
        setViewState(prev => ({ ...prev, isSaving: true }));
        const handler = setTimeout(() => {
            setPins(prev => prev.map(p => p.id === pin.id ? {
                ...p,
                annotations: paths,
                highlightPoly,
                filters,
                notes,
                dimEnabled
            } : p));
            setViewState(prev => ({ ...prev, isSaving: false }));
        }, 800); // 800ms 延迟保存

        return () => clearTimeout(handler);
    }, [paths, highlightPoly, filters, notes, dimEnabled]);

    // 计算已使用的维度 — 对 S 组使用开关优先级：当 S 组某维度被关闭时即视为不存在；开启时即视为存在
    const usedCategories = useMemo(() => {
        const present = new Set();
        ANALYSIS_CATEGORIES.forEach(c => {
            if (c.groupKey === 'cat_S_group') {
                if (dimEnabled && dimEnabled[c.id]) present.add(c.id);
            } else {
                if (paths.some(p => p.category === c.id)) present.add(c.id);
            }
        });
        return ANALYSIS_CATEGORIES.filter(c => present.has(c.id));
    }, [paths, dimEnabled]);

    // 计算当前图片所属的文件夹 (zone) 以及在该文件夹中的序号与总数
    const folderIndexInfo = useMemo(() => {
        // determine zone id for the active pin
        let zid;
        if (pin.x === null || pin.y === null) zid = 'unlocated';
        else {
            const found = (zones || []).find(z => isPointInPolygon({ x: pin.x, y: pin.y }, z.points));
            zid = found ? found.id : '?';
        }

        // annotate every pin with its zone id (cheap but simple)
        const pinsWithZone = (pins || []).map(p => {
            if (p.x === null || p.y === null) return { ...p, _zoneId: 'unlocated' };
            const f = (zones || []).find(z => isPointInPolygon({ x: p.x, y: p.y }, z.points));
            return { ...p, _zoneId: f ? f.id : '?' };
        });

        const group = pinsWithZone.filter(p => p._zoneId === zid);
        const pos = group.findIndex(p => p.id === pin.id);
        return { zoneId: zid, index: pos === -1 ? null : pos + 1, total: group.length };
    }, [pin, pins, zones]);

    // 2. Image Loading & Auto-fit Logic (Separated)
    useEffect(() => {
        if (!pin.imageSrc) return; // 如果没有图片数据，跳过加载

        // If we already have the correct image loaded, don't reload
        if (imageObjRef.current && imageObjRef.current.src === pin.imageSrc) {
            setViewState(prev => ({ ...prev, isImageLoaded: true }));
            return;
        }

        const img = new Image();
        img.src = pin.imageSrc;

        img.onload = () => {
            imageObjRef.current = img; // Persist the loaded image object

            // Auto-fit Logic
            if (containerRef.current) {
                const { clientWidth, clientHeight } = containerRef.current;
                const padding = 40; // Space for comfort
                const scale = Math.min(
                    (clientWidth - padding) / img.naturalWidth,
                    (clientHeight - padding) / img.naturalHeight
                );
                // Ensure zoom is reasonable (between 0.1 and 1)
                const fitZoom = Math.min(Math.max(scale, 0.1), 1);

                setViewState(prev => ({ ...prev, isImageLoaded: true, zoom: fitZoom, offset: { x: 0, y: 0 } }));
            }
        };
    }, [pin.imageSrc]); // Only runs when image source changes

    // 单张恢复处理
    const handleRestoreImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            // 立即更新 pin 数据，这将触发上面的 useEffect 重新加载图片
            setPins(prev => prev.map(p => p.id === pin.id ? {
                ...p,
                imageSrc: event.target.result,
                originalImageSrc: event.target.result
            } : p));
        };
        reader.readAsDataURL(file);
    };

    // 3. Canvas Drawing Logic (Runs on every change)
    useEffect(() => {
        if (!canvasRef.current || !viewState.isImageLoaded || !imageObjRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = imageObjRef.current; // Use the PRE-LOADED image

        // Ensure canvas size matches image
        if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
        }

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
                for (let i = 1; i < highlightPoly.length; i++) ctx.lineTo(highlightPoly[i].x, highlightPoly[i].y);
                ctx.closePath();
                ctx.clip();

                // 恢复滤镜为彩色
                ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%)`;
                ctx.drawImage(img, 0, 0);
                ctx.restore();

                // 绘制选区边框
                ctx.beginPath();
                ctx.moveTo(highlightPoly[0].x, highlightPoly[0].y);
                for (let i = 1; i < highlightPoly.length; i++) ctx.lineTo(highlightPoly[i].x, highlightPoly[i].y);
                ctx.closePath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#fff';
                ctx.stroke();
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#333';
                ctx.stroke();
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
            if (highlightPoly.length > 1) { ctx.beginPath(); ctx.moveTo(highlightPoly[0].x, highlightPoly[0].y); for (let i = 1; i < highlightPoly.length; i++) ctx.lineTo(highlightPoly[i].x, highlightPoly[i].y); ctx.stroke(); }
        }

        // 5. 绘制标注路径及标签 (放大版本)
        paths.forEach(path => {
            // 绘制路径
            ctx.beginPath();
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineWidth = path.width || 12; // Default 12 if undefined
            const catConfig = ANALYSIS_CATEGORIES.find(c => c.id === path.category);
            const isSGroup = catConfig ? catConfig.groupKey === 'cat_S_group' : false;
            const enabled = dimEnabled && dimEnabled[path.category] !== undefined ? dimEnabled[path.category] : true;
            // If this path belongs to S group and that dimension is disabled, skip drawing (treated as absent)
            if (isSGroup && !enabled) {
                return; // do not render S-group paths when disabled
            }
            ctx.strokeStyle = path.color;
            if (path.points.length > 0) { ctx.moveTo(path.points[0].x, path.points[0].y); path.points.forEach(p => ctx.lineTo(p.x, p.y)); }
            ctx.stroke();

            if (path.points.length > 0) {
                const startP = path.points[0];
                const labelColor = (isSGroup && !enabled) ? '#999' : (catConfig ? catConfig.hex : '#333');
                ctx.save(); ctx.font = 'bold 28px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                ctx.beginPath(); ctx.arc(startP.x, startP.y, 26, 0, Math.PI * 2);
                ctx.fillStyle = 'white'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = labelColor; ctx.stroke();
                ctx.fillStyle = labelColor; ctx.fillText(path.category, startP.x, startP.y); ctx.restore();
            }
        });
    }, [pin.imageSrc, filters, paths, viewState.mode, highlightPoly, viewState.isImageLoaded, dimEnabled]);

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

    const handleMouseDown = (e) => {
        if (viewState.mode === 'move' || e.button === 1 || e.button === 2) {
            setViewState(prev => ({ ...prev, isPanning: true, lastMousePos: { x: e.clientX, y: e.clientY } }));
            return;
        }
        if (viewState.mode === 'highlight') handleCanvasClick(e);
        else if (viewState.mode === 'draw') handleStart(e);
    };

    const handleMouseMove = (e) => {
        if (viewState.isPanning) {
            const dx = e.clientX - viewState.lastMousePos.x;
            const dy = e.clientY - viewState.lastMousePos.y;
            setViewState(prev => ({
                ...prev,
                offset: { x: prev.offset.x + dx, y: prev.offset.y + dy },
                lastMousePos: { x: e.clientX, y: e.clientY }
            }));
            return;
        }
        if (viewState.mode === 'draw' && viewState.isDrawing) handleMove(e);
    };

    const handleMouseUp = (e) => {
        if (viewState.isPanning) {
            setViewState(prev => ({ ...prev, isPanning: false }));
        } else if (viewState.mode === 'draw') {
            handleEnd(e);
        }
    };

    const groupedCategories = useMemo(() => {
        const groups = {};
        ANALYSIS_CATEGORIES.forEach(cat => { if (!groups[cat.groupKey]) groups[cat.groupKey] = []; groups[cat.groupKey].push(cat); });
        return groups;
    }, []);

    return (
        <div className="flex h-full bg-slate-50 overflow-hidden text-slate-800">
            <div className="w-80 bg-white border-r border-slate-200 flex flex-col h-full z-10 shadow-lg shrink-0 overflow-y-auto">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between items-center mb-1">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2"><Sliders size={18} /> {t('editorTitle')}</h3>
                            {/* 自动保存状态指示器 */}
                            <div className="flex items-center gap-1 text-xs font-medium">
                                {viewState.isSaving ? (
                                    <span className="text-blue-500 flex items-center gap-1"><Cloud size={12} className="animate-pulse" /> {t('statusSaving')}</span>
                                ) : (
                                    <span className="text-emerald-500 flex items-center gap-1"><Check size={12} /> {t('statusSaved')}</span>
                                )}
                            </div>
                        </div>
                        {/* Folder indicator - minimal, full-width, no bg/shadow, large numbers */}
                        <div className="mt-3">
                            <div className="w-full px-2 py-2 rounded-md flex items-center justify-between">
                                <div className="text-sm text-slate-600"><span className="text-xs text-slate-500 mr-2">{t('currentZone')}</span>{folderIndexInfo.zoneId}</div>
                                <div className="text-right">
                                    {folderIndexInfo.index ? (
                                        <div className="text-2xl font-extrabold text-slate-800 leading-none">{folderIndexInfo.index}<span className="text-base font-medium text-slate-500"> / {folderIndexInfo.total}</span></div>
                                    ) : (
                                        <div className="text-2xl font-extrabold text-slate-800">{folderIndexInfo.total} 张</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 导航栏 (上一张 / 下一张) */}
                        <div className="flex items-center gap-2 mt-2 bg-slate-100 p-1 rounded-lg">
                            <button
                                onClick={() => hasPrev && onNavigate(-1)}
                                disabled={!hasPrev}
                                className={`p-1.5 rounded transition-colors flex-1 flex justify-center ${!hasPrev ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}
                                title={t('prevImage')}
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                onClick={() => hasNext && onNavigate(1)}
                                disabled={!hasNext}
                                className={`p-1.5 rounded transition-colors flex-1 flex justify-center ${!hasNext ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}
                                title={t('nextImage')}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-4 space-y-6">


                    <div className="bg-slate-100 p-1 rounded-lg flex gap-1">
                        <button onClick={() => setViewState(p => ({ ...p, mode: 'highlight' }))} className={`flex-1 py-1.5 text-xs rounded-md flex flex-col items-center justify-center gap-1 transition-all ${viewState.mode === 'highlight' ? 'bg-white shadow text-blue-600 font-medium' : 'text-slate-500 hover:text-slate-700'}`}><Hexagon size={16} /> {t('modeHighlight')}</button>
                        <button onClick={() => setViewState(p => ({ ...p, mode: 'draw' }))} className={`flex-1 py-1.5 text-xs rounded-md flex flex-col items-center justify-center gap-1 transition-all ${viewState.mode === 'draw' ? 'bg-white shadow text-emerald-600 font-medium' : 'text-slate-500 hover:text-slate-700'}`}><PenTool size={16} /> {t('modeDraw')}</button>
                    </div>

                    {viewState.mode === 'highlight' && (
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 space-y-3 animate-fade-in">
                            <div className="flex items-start gap-2"><Hexagon className="text-blue-500 mt-0.5 shrink-0" size={16} /><div><h4 className="text-sm font-bold text-blue-700">{t('highlightTitle')}</h4><p className="text-xs text-blue-600/80 mt-1 leading-relaxed">{t('highlightDesc')}</p></div></div>
                            <div className="space-y-4 p-3 bg-white/50 rounded-lg border border-blue-200">
                                <h4 className="text-xs font-bold text-blue-400 uppercase">{t('imageParams')}</h4>
                                <div><div className="flex justify-between text-xs text-blue-600 mb-1"><span>{t('brightness')}</span><span>{filters.brightness}%</span></div><input type="range" min="50" max="150" value={filters.brightness} onChange={(e) => setFilters(p => ({ ...p, brightness: parseInt(e.target.value) }))} className="w-full h-1 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500" /></div>
                                <div><div className="flex justify-between text-xs text-blue-600 mb-1"><span>{t('contrast')}</span><span>{filters.contrast}%</span></div><input type="range" min="50" max="150" value={filters.contrast} onChange={(e) => setFilters(p => ({ ...p, contrast: parseInt(e.target.value) }))} className="w-full h-1 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500" /></div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold text-slate-400 uppercase">{t('notesTitle')}</h4>
                                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border border-slate-300 rounded-lg p-3 text-sm h-24 focus:ring-2 focus:ring-emerald-500 outline-none resize-none bg-slate-50 text-slate-700 placeholder-slate-400" placeholder={t('notesPlaceholder')} />
                            </div>
                            <div className="flex items-center justify-between text-xs text-blue-800 bg-white/50 p-2 rounded"><span>{t('pointsCount')}: <strong>{highlightPoly.length}</strong></span>{highlightPoly.length < 3 && <span className="text-orange-500">{t('minPoints')}</span>}</div>
                            <div className="grid grid-cols-2 gap-2">
                                <button onClick={() => setHighlightPoly([])} className="px-3 py-2 bg-white border border-blue-200 text-blue-600 text-xs rounded hover:bg-blue-50 transition-colors">{t('resetSelection')}</button>
                                <div className="flex gap-2 justify-end">
                                    <button onClick={() => setViewState(p => ({ ...p, mode: 'move' }))} className="px-3 py-2 bg-white border border-blue-200 text-blue-600 text-xs rounded hover:bg-blue-50 transition-colors">{t('applySelection')}</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {viewState.mode === 'draw' && (
                        <>
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-slate-400 uppercase">{t('dimensionTitle')}</h4>
                                <div className="space-y-4 pr-1">
                                    {Object.entries(groupedCategories).map(([groupKey, items]) => (
                                        <div key={groupKey}>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider pl-1">{t(groupKey)}</div>
                                            <div className="space-y-2">
                                                {items.map(cat => (
                                                    <div key={cat.id} className="flex items-center justify-between gap-2">
                                                        <button onClick={() => setViewState(p => ({ ...p, brushColor: cat }))} className={`flex-1 flex items-center gap-3 p-2.5 rounded-lg border text-sm transition-all text-left ${viewState.brushColor.id === cat.id ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 shadow-sm' : 'border-slate-200 hover:bg-slate-50'}`}>
                                                            <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.hex }} />
                                                            <span className="text-slate-700 text-xs font-medium leading-tight">{t(cat.nameKey)}</span>
                                                        </button>
                                                        {cat.groupKey === 'cat_S_group' && (
                                                            <button onClick={(e) => { e.stopPropagation(); setDimEnabled(prev => ({ ...prev, [cat.id]: !prev[cat.id] })); }} aria-pressed={dimEnabled[cat.id]} className={`ml-3 relative w-10 h-6 rounded-full transition-colors ${dimEnabled[cat.id] ? 'bg-emerald-500' : 'bg-slate-200'}`} title={dimEnabled[cat.id] ? t('statusEnabled') : t('statusDisabled')}>
                                                                <span className={`absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow transform transition-transform ${dimEnabled[cat.id] ? 'translate-x-4' : 'translate-x-0'}`} />
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2 pt-2 border-t border-slate-100">
                                    <button onClick={() => setPaths(paths.slice(0, -1))} className="flex-1 py-1.5 text-xs border border-slate-300 rounded hover:bg-slate-50 text-slate-600 flex items-center justify-center gap-1"><RotateCcw size={12} /> {t('undo')}</button>
                                    <button onClick={() => setPaths([])} className="flex-1 py-1.5 text-xs border border-red-200 rounded bg-red-50 text-red-600 hover:bg-red-100">{t('clear')}</button>
                                </div>
                            </div>

                        </>
                    )}

                    <div className="pt-4 border-t border-slate-200 mt-auto">
                        {/* backToMap button removed per UX request */}
                    </div>
                </div>
            </div>

            {/* 右侧画布 */}
            <div className="flex-1 bg-slate-100 overflow-hidden flex items-center justify-center p-8 relative">
                {/* 状态栏 (HUD) - 显示已添加的维度 */}
                <div className="absolute top-6 left-6 flex flex-wrap gap-2 pointer-events-none z-10 max-w-[80%]">
                    {usedCategories.length > 0 ? (
                        usedCategories.map(cat => (
                            <div key={cat.id} className="bg-white/90 backdrop-blur shadow-sm pl-2 pr-3 py-1.5 rounded-full border border-slate-200 flex items-center gap-2 text-xs font-bold text-slate-700 animate-in fade-in zoom-in duration-300">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.hex }}></span>
                                {t(cat.nameKey)}
                            </div>
                        ))
                    ) : (
                        <div className="bg-white/50 backdrop-blur px-3 py-1.5 rounded-full text-xs text-slate-500 italic border border-slate-200/50">
                            {t('noTags')}
                        </div>
                    )}
                </div>



                <div ref={containerRef} className="overflow-hidden w-full h-full flex items-center justify-center bg-slate-200 relative">
                    {/* 缺失图片时的 UI */}
                    {!pin.imageSrc && (
                        <div className="flex flex-col items-center justify-center text-slate-400 gap-4">
                            <ImageOff size={48} className="text-slate-300" />
                            <div className="text-center"><p className="font-medium text-slate-600">{t('missingImage')}</p><p className="text-xs text-slate-400 mt-1">{t('originalFile')}: {pin.fileName}</p></div>
                            <input type="file" ref={restoreInputRef} className="hidden" accept="image/*" onChange={handleRestoreImage} />
                            <button onClick={() => restoreInputRef.current.click()} className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors">{t('relinkImage')}</button>
                        </div>
                    )}

                    {pin.imageSrc && !viewState.isImageLoaded && <div className="absolute inset-0 flex items-center justify-center text-slate-400 gap-2"><div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>Loading...</div>}

                    {pin.imageSrc && (
                        <canvas
                            ref={canvasRef}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onClick={handleCanvasClick} // Now safely defined
                            className={`block shadow-2xl transition-transform duration-75 ease-out origin-center ${viewState.mode === 'move' || viewState.isPanning ? 'cursor-grab active:cursor-grabbing' : 'cursor-crosshair'}`}
                            style={{
                                transform: `translate(${viewState.offset.x}px, ${viewState.offset.y}px) scale(${viewState.zoom})`,
                                touchAction: 'none'
                            }}
                        />
                    )}
                </div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-white/90 backdrop-blur shadow-lg px-3 py-2 rounded-full border border-slate-200">
                    <div className="flex items-center gap-2">
                        <button onClick={() => setViewState(p => ({ ...p, zoom: Math.max(0.1, p.zoom - 0.1) }))} className="p-2 bg-slate-100 rounded hover:bg-slate-200 text-slate-600 transition-colors" title={t('toolZoomOut')}><ZoomOut size={16} /></button>
                        <button onClick={() => setViewState(p => ({ ...p, zoom: Math.min(3, p.zoom + 0.1) }))} className="p-2 bg-slate-100 rounded hover:bg-slate-200 text-slate-600 transition-colors" title={t('toolZoomIn')}><ZoomIn size={16} /></button>
                    </div>
                    <div className="h-4 w-px bg-slate-300" />
                    <button onClick={() => hasPrev && onNavigate(-1)} disabled={!hasPrev} className={`p-2 rounded transition-colors ${!hasPrev ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`} title={t('prevImage')}><ChevronLeft size={16} /></button>
                    <button onClick={() => hasNext && onNavigate(1)} disabled={!hasNext} className={`p-2 rounded transition-colors ${!hasNext ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`} title={t('nextImage')}><ChevronRight size={16} /></button>
                    <div className="h-4 w-px bg-slate-300" />
                    <button onClick={() => { const duplicated = { ...pin, id: 'pin_' + Date.now(), groupId: null }; setPins(prev => { const idx = prev.findIndex(p => p.id === pin.id); const cp = [...prev]; if (idx === -1) cp.push(duplicated); else cp.splice(idx + 1, 0, duplicated); return cp; }); }} className="p-2 rounded bg-white hover:bg-slate-50 text-slate-600 border border-slate-100 flex items-center justify-center" title={t('duplicatePin')}><Copy size={16} /></button>
                    <button onClick={() => { if (confirm(t('confirmDeletePin'))) { setPins(prev => prev.filter(p => p.id !== pin.id)); setActiveTab('map'); } }} className="p-2 rounded bg-white hover:bg-red-50 text-red-600 border border-slate-100 flex items-center justify-center" title={t('deletePin')}><Trash2 size={16} /></button>
                </div>
            </div>
        </div>
    );
};

// --- 组件：统计分析 ---
const StatsView = ({ pins, zones, mapImage, t }) => {
    const [isGroupMode, setIsGroupMode] = useState(false);
    const [viewMode, setViewMode] = useState('overall'); // 'overall', 'regions', or 'map'

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
            pins.forEach(p => { p.annotations.forEach(a => { if (catCounts[a.category] !== undefined) { catCounts[a.category]++; total++; } }); });
        }
        return { total, catCounts };
    }, [pins, isGroupMode]);

    // NEW Analytics Calculation
    const deepAnalytics = useMemo(() => {
        // 1. Co-occurrence Matrix
        const catIds = ANALYSIS_CATEGORIES.map(c => c.id);
        const matrix = Array(catIds.length).fill(0).map(() => Array(catIds.length).fill(0));

        pins.forEach(pin => {
            const pinCats = [...new Set(pin.annotations.map(a => a.category))];
            for (let i = 0; i < pinCats.length; i++) {
                for (let j = 0; j < pinCats.length; j++) {
                    const idx1 = catIds.indexOf(pinCats[i]);
                    const idx2 = catIds.indexOf(pinCats[j]);
                    if (idx1 !== -1 && idx2 !== -1) {
                        matrix[idx1][idx2]++;
                    }
                }
            }
        });

        // 2. Zone Density (Annotations per Pin per Zone)
        const densityData = zones.map(z => {
            let pinCount = 0;
            let annoCount = 0;
            pins.forEach(pin => {
                if (isPointInPolygon({ x: pin.x, y: pin.y }, z.points)) {
                    pinCount++;
                    annoCount += pin.annotations.length;
                }
            });
            return {
                id: z.id,
                val: pinCount ? (annoCount / pinCount).toFixed(1) : 0,
                color: ZONE_PALETTE[z.colorIndex || 0].stroke
            };
        });

        // 3. Composition (Doughnut) - 详细版（按维度细分）
        const compData = ANALYSIS_CATEGORIES.map(cat => ({
            label: cat.id,
            value: stats.catCounts[cat.id] || 0,
            color: cat.hex
        })).filter(d => d.value > 0);

        // 4. Data Health
        const annotatedPins = pins.filter(p => p.annotations.length > 0).length;
        const notedPins = pins.filter(p => p.notes && p.notes.trim().length > 0).length;

        return { matrix, catIds, densityData, compData, annotatedPins, notedPins };
    }, [pins, zones, stats]);

    const zoneDetailStats = useMemo(() => {
        const zoneData = {};
        zones.forEach(z => { zoneData[z.id] = { Atmosphere: 0, Relevance: 0, Clarity: 0, total: 0, topFeature: null }; });
        pins.forEach(pin => {
            const foundZone = zones.find(z => isPointInPolygon({ x: pin.x, y: pin.y }, z.points));
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

    const radarData = useMemo(() => ANALYSIS_CATEGORIES.map(cat => ({ label: t(cat.nameKey), value: stats.catCounts[cat.id] || 0, color: cat.hex })), [stats, t]);

    // Region-wise analysis (维度占比 for each zone)
    const regionAnalytics = useMemo(() => {
        return zones.map(zone => {
            const catCounts = {};
            ANALYSIS_CATEGORIES.forEach(c => catCounts[c.id] = 0);
            let total = 0;

            pins.forEach(pin => {
                if (pin.x !== null && pin.y !== null && isPointInPolygon({ x: pin.x, y: pin.y }, zone.points)) {
                    pin.annotations.forEach(a => {
                        if (catCounts[a.category] !== undefined) {
                            catCounts[a.category]++;
                            total++;
                        }
                    });
                }
            });

            const radarData = ANALYSIS_CATEGORIES.map(cat => ({
                label: t(cat.nameKey),
                value: catCounts[cat.id] || 0,
                color: cat.hex
            }));

            return { zoneId: zone.id, zoneName: zone.name || zone.id, catCounts, total, radarData };
        });
    }, [pins, zones, t]);

    // Pin with features for map view
    const pinsWithFeatures = useMemo(() => {
        return pins.filter(p => p.x !== null).map(pin => {
            const uniqueCats = [...new Set(pin.annotations.map(a => a.category))];
            const catColors = uniqueCats.map(cid => {
                const config = ANALYSIS_CATEGORIES.find(c => c.id === cid);
                return config ? config.hex : '#ccc';
            });
            return { ...pin, featureColors: catColors };
        });
    }, [pins]);

    // Force-directed layout for labels to avoid overlap
    const distributedPins = useMemo(() => {
        if (viewMode !== 'map' || !mapImage) return [];

        // Initial positions
        // Use a shallow copy to modify positions
        let nodes = pinsWithFeatures.map(p => ({
            ...p,
            lx: p.x, // label x
            ly: p.y - 4, // label y (starts slightly above pin)
            baseX: p.x,
            baseY: p.y
        }));

        const iterations = 60; // Enough for simple convergence
        const canvasRatio = 1; // Assuming mostly square-ish aspect ratio for simplicity in % math
        // Treat X and Y as percentage units.
        // A capsule is roughly 4% wide and 3% tall on typical screen
        const nodeRadius = 3;

        for (let k = 0; k < iterations; k++) {
            // Repulsion
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const a = nodes[i];
                    const b = nodes[j];
                    const dx = a.lx - b.lx;
                    const dy = (a.ly - b.ly) * canvasRatio;
                    const distSq = dx * dx + dy * dy;
                    const minDist = nodeRadius * 2.5; // Minimum distance

                    if (distSq < minDist * minDist && distSq > 0.01) {
                        const dist = Math.sqrt(distSq);
                        const force = (minDist - dist) / dist * 0.5; // 0.5 is strength factor
                        const fx = dx * force;
                        const fy = (dy * force) / canvasRatio;

                        a.lx += fx;
                        a.ly += fy;
                        b.lx -= fx;
                        b.ly -= fy;
                    }
                }
            }

            // Attraction to origin (Spring force)
            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                const targetY = n.baseY - 4; // Ideally above the pin
                const dx = n.baseX - n.lx;
                const dy = targetY - n.ly;

                n.lx += dx * 0.05;
                n.ly += dy * 0.05;
            }
        }

        return nodes;
    }, [pinsWithFeatures, viewMode, mapImage]);

    // 新增：导出 LLM 报告逻辑
    const handleExportLLMReport = () => {
        const timestamp = new Date().toLocaleString();
        let report = `# Botanical Signage Analysis Report\nGenerated: ${timestamp}\n\n`;

        // 1. Overview
        report += `## 1. System Overview\n`;
        report += `- Total Zones: ${zones.length}\n`;
        report += `- Total Pins: ${pins.length}\n`;
        report += `- Analyzed Elements: ${stats.total}\n\n`;

        // 2. Zone Breakdown
        report += `## 2. Zone Analysis\n`;
        Object.keys(zoneDetailStats).forEach(zid => {
            const z = zoneDetailStats[zid];
            report += `- Zone ${zid}: ${z.total} elements. Dominant Feature: ${z.topFeature}\n`;
        });
        report += `\n`;

        // 3. Detailed Pin Data
        report += `## 3. Detailed Pin Data\n`;
        pins.forEach((pin, index) => {
            const foundZone = zones.find(z => isPointInPolygon({ x: pin.x, y: pin.y }, z.points));
            const zoneId = foundZone ? foundZone.id : (pin.x === null ? 'Unlocated' : 'Unknown');

            report += `\n[Pin ID: ${pin.id}]\n`;
            report += `- Location: Zone ${zoneId}\n`;
            report += `- Group ID: ${pin.groupId || 'None'}\n`;
            report += `- Notes: "${pin.notes || 'None'}"\n`;
            report += `- Annotations:\n`;

            if (pin.annotations.length === 0) {
                report += `  (No annotations)\n`;
            } else {
                const pinCats = {};
                pin.annotations.forEach(a => {
                    pinCats[a.category] = (pinCats[a.category] || 0) + 1;
                });
                Object.entries(pinCats).forEach(([catId, count]) => {
                    const catName = ANALYSIS_CATEGORIES.find(c => c.id === catId)?.name || catId;
                    report += `  - ${catName}: ${count}\n`;
                });
            }
        });

        // Download
        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `signage-analysis-report-${Date.now()}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="h-full bg-slate-50 p-8 overflow-auto">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-100 p-2 rounded-lg"><BarChart2 className="text-emerald-600" size={24} /></div>
                        <h2 className="text-2xl font-bold text-slate-800">{t('statsTitle')}</h2>
                    </div>

                    <div className="flex gap-2">
                        {/* Export Button Moved to Footer */}
                        <button onClick={() => setIsGroupMode(!isGroupMode)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${isGroupMode ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
                            <Filter size={16} />
                            {isGroupMode ? t('statsModeGroup') : t('statsModeCount')}
                        </button>
                    </div>
                </div>

                {/* New Tab Bar Location */}
                <div className="flex gap-1 border-b border-slate-200 mb-6">
                    <button
                        onClick={() => setViewMode('overall')}
                        className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all border-b-2 ${viewMode === 'overall' ? 'border-emerald-500 text-emerald-700 bg-emerald-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                    >
                        <LayoutDashboard size={16} />
                        {t('tabOverall')}
                    </button>
                    <button
                        onClick={() => setViewMode('regions')}
                        className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all border-b-2 ${viewMode === 'regions' ? 'border-blue-500 text-blue-700 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                    >
                        <Grid size={16} />
                        {t('tabRegional')}
                    </button>
                    <button
                        onClick={() => setViewMode('map')}
                        className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all border-b-2 ${viewMode === 'map' ? 'border-indigo-500 text-indigo-700 bg-indigo-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                    >
                        <MapIconReg size={16} />
                        {t('tabMap')}
                    </button>
                </div>

                {/* NEW: Expanded Top Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
                        <div className="flex justify-between items-start"><div className="text-slate-400 text-[10px] font-bold uppercase">{t('statTotalZones')}</div><MapIconReg size={16} className="text-slate-300" /></div>
                        <div className="text-3xl font-black text-slate-800">{zones.length}</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
                        <div className="flex justify-between items-start"><div className="text-slate-400 text-[10px] font-bold uppercase">{t('statTotalPins')}</div><MapPin size={16} className="text-blue-300" /></div>
                        <div className="text-3xl font-black text-blue-600">{pins.length}</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
                        <div className="flex justify-between items-start"><div className="text-slate-400 text-[10px] font-bold uppercase">{isGroupMode ? t('statTotalEntities') : t('statTotalElements')}</div><Tag size={16} className="text-emerald-300" /></div>
                        <div className="text-3xl font-black text-emerald-600">{stats.total}</div>
                    </div>
                    {/* Health Check Metrics */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
                        <div className="flex justify-between items-start"><div className="text-slate-400 text-[10px] font-bold uppercase">{t('statHealthTitle')}</div><Activity size={16} className="text-orange-300" /></div>
                        <div className="flex gap-4 items-end">
                            <div><div className="text-lg font-bold text-slate-700">{Math.round((deepAnalytics.annotatedPins / (pins.length || 1)) * 100)}%</div><div className="text-[9px] text-slate-400">{t('statHealthAnnotated')}</div></div>
                            <div><div className="text-lg font-bold text-slate-700">{Math.round((deepAnalytics.notedPins / (pins.length || 1)) * 100)}%</div><div className="text-[9px] text-slate-400">{t('statHealthNotes')}</div></div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
                        <div className="flex justify-between items-start"><div className="text-slate-400 text-[10px] font-bold uppercase">{t('statDominant')}</div><Zap size={16} className="text-purple-300" /></div>
                        <div className="text-lg font-bold text-slate-800 leading-tight mt-1">{(() => { const totals = { A: 0, R: 0, S: 0 }; ANALYSIS_CATEGORIES.forEach(c => totals[c.shortGroup[0]] += stats.catCounts[c.id]); const max = Math.max(totals.A, totals.R, totals.S); if (max === 0) return '-'; if (max === totals.A) return t('statDominantAtmosphere'); if (max === totals.R) return t('statDominantRelevance'); return t('statDominantClarity'); })()}</div>
                    </div>
                </div>

                {viewMode === 'overall' ? (
                    <>
                        {/* Unified Grid Layout: 3 Columns */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* --- ROW 1: Overview Metrics (3 Cols) --- */}

                            {/* 1. Radar Chart (Overall Balance) */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col h-full">
                                <h3 className="font-bold text-slate-700 mb-6 flex items-center gap-2 text-sm">
                                    <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-md"><Hexagon size={16} /></div>
                                    {t('chartRadarTitle')}
                                </h3>
                                {/* Removed min-h restriction */}
                                <div className="flex-1 flex items-center justify-center p-4">
                                    {stats.total > 0 ? <RadarChart data={radarData} /> : <div className="text-slate-300">{t('noData')}</div>}
                                </div>
                            </div>

                            {/* 2. Composition Doughnut (Category Distribution) */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col h-full">
                                <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-sm">
                                    <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-md"><PieChart size={16} /></div>
                                    {t('chartCompositionTitle')}
                                </h3>
                                {/* Removed min-h restriction */}
                                <div className="flex-1 flex items-center justify-center p-4">
                                    <DoughnutChart data={deepAnalytics.compData} total={stats.total} />
                                </div>
                                <div className="flex flex-wrap gap-2 justify-center mt-4">
                                    {deepAnalytics.compData.map(d => (
                                        <div key={d.label} className="flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
                                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></span>
                                            {d.label} <span className="text-slate-400">({d.value})</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 3. Information Density (Health/Stats) - Moved UP */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col h-full">
                                <h3 className="font-bold text-slate-700 mb-6 flex items-center gap-2 text-sm">
                                    <div className="p-1.5 bg-orange-50 text-orange-600 rounded-md"><Thermometer size={16} /></div>
                                    {t('chartDensityTitle')}
                                </h3>
                                {/* Removed overflow-auto and fixed height */}
                                {/* Removed overflow-auto and fixed height */}
                                <div className="flex-1 flex flex-col justify-center gap-3">
                                    {deepAnalytics.densityData.map((d, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <span className="w-12 text-xs font-bold text-right text-slate-500">{d.id}</span>
                                            <div className="flex-1 bg-slate-50 rounded-full h-4 overflow-hidden relative border border-slate-100">
                                                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (d.val / 5) * 100)}%`, backgroundColor: d.color }}></div>
                                                <span className="absolute inset-0 flex items-center justify-end px-2 text-[10px] font-bold text-slate-600 mix-blend-multiply">{d.val}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* --- ROW 2: Deep Dive (Mixed Span) --- */}

                            {/* 4. Stacked Bar (Comparison) - Span 2 */}
                            {/* Removed h-[400px] */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col lg:col-span-2">
                                <h3 className="font-bold text-slate-700 mb-6 flex items-center gap-2 text-sm">
                                    <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md"><AlignLeft size={16} /></div>
                                    {t('chartStackTitle')}
                                </h3>
                                {/* Removed overflow-auto */}
                                <div className="flex-1">
                                    <StackedBarChart zones={zones} data={zoneDetailStats} t={t} />
                                </div>
                            </div>

                            {/* 5. Heatmap (Correlation) - Span 1 */}
                            {/* Removed h-[400px] */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
                                <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-sm">
                                    <div className="p-1.5 bg-pink-50 text-pink-600 rounded-md"><Grid size={16} /></div>
                                    {t('chartHeatmapTitle')}
                                </h3>
                                {/* Removed overflow-auto */}
                                <div className="flex-1 flex items-center justify-center">
                                    <HeatmapGrid matrix={deepAnalytics.matrix} labels={deepAnalytics.catIds} />
                                </div>
                            </div>




                        </div>

                        {zones.length > 0 && (
                            <div>
                                <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-sm"><MapIcon size={16} /> {t('chartZoneFeatures')}</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{zones.map(z => (<div key={z.id} className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm"><div className="flex justify-between items-center mb-2"><span className="font-bold text-slate-700">{z.id}</span><span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">n={zoneDetailStats[z.id]?.total || 0}</span></div><div className="text-xs text-slate-500"><div className="font-medium text-emerald-600">{zoneDetailStats[z.id]?.topFeature}</div></div></div>))}</div>
                            </div>
                        )}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-700 mb-6 flex justify-between items-center text-sm"><span className="flex items-center gap-2"><CheckSquare size={16} /> {t('chartDetailTitle')}</span></h3>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {groupedStats.map(group => (
                                    <div key={group.nameKey} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col h-full">
                                        <div className="pb-4 mb-4 border-b border-slate-50 flex justify-between items-end"><h4 className="font-bold text-sm text-slate-700 w-3/4">{t(group.nameKey)}</h4><span className="text-2xl font-black text-slate-800">{group.total}</span></div>
                                        <div className="space-y-4 flex-1">
                                            {group.items.map(item => (
                                                <div key={item.id} className="mb-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-slate-700 font-medium">{t(item.nameKey)}</span>
                                                        <span className="text-slate-400 text-xs">{item.count} ({item.pct}%)</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : viewMode === 'regions' ? (
                    // ========== REGIONS ANALYSIS VIEW ==========
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {regionAnalytics.filter(r => r.total > 0).length > 0 ? (
                            regionAnalytics.map(region => (
                                region.total > 0 && (
                                    <div key={region.zoneId} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                                        <div className="flex justify-between items-center mb-6">
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-800">{region.zoneName || region.zoneId}</h3>
                                                <p className="text-sm text-slate-500 mt-1">{t('statTotalAnnotations')}: {region.total}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            {/* 区域雷达图 */}
                                            <div className="flex items-center justify-center min-h-[300px] bg-slate-50 rounded-lg">
                                                {region.total > 0 ? <RadarChart data={region.radarData} /> : <div className="text-slate-300">{t('noData')}</div>}
                                            </div>

                                            {/* 区域维度详细数据 */}
                                            <div>
                                                <h4 className="font-bold text-slate-700 mb-4">{t('chartDimDist')}</h4>
                                                <div className="space-y-2">
                                                    {ANALYSIS_CATEGORIES.map(cat => {
                                                        const count = region.catCounts[cat.id] || 0;
                                                        const pct = region.total ? ((count / region.total) * 100).toFixed(1) : 0;
                                                        return (
                                                            <div key={cat.id} className="flex items-center gap-2">
                                                                <span className="w-12 text-xs font-bold text-slate-600">{cat.id}</span>
                                                                <div className="flex-1 bg-slate-100 rounded-md h-8 overflow-hidden relative flex items-center justify-end px-2">
                                                                    <div className="absolute inset-0 transition-all" style={{ width: `${pct}%`, backgroundColor: cat.hex, opacity: 0.7 }}></div>
                                                                    <span className="text-xs font-bold text-slate-700 relative z-10">{count} ({pct}%)</span>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))
                        ) : (
                            <div className="col-span-full bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center text-slate-400">
                                {t('noData')}
                            </div>
                        )}
                    </div>
                ) : (
                    // ========== MAP VIEW ==========
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col h-[700px]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-slate-700 flex items-center gap-2"><MapIconReg size={18} /> {t('statsViewMap')}</h3>
                            <div className="flex gap-2">
                                <div className="text-xs flex items-center gap-2 bg-slate-50 px-3 py-1 rounded border border-slate-200">
                                    <span className="font-bold text-slate-500">{t('mapLegend')}:</span>
                                    <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span><span className="text-slate-600">{t('legendA')}</span></div>
                                    <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span><span className="text-slate-600">{t('legendR')}</span></div>
                                    <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span><span className="text-slate-600">{t('legendS')}</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 bg-slate-50 rounded-lg border border-slate-200 overflow-auto relative custom-scrollbar">
                            {mapImage ? (
                                <div className="relative inline-block w-full" style={{ minWidth: '800px' }}>
                                    <img src={mapImage} className="w-full h-auto block opacity-80" alt="Map Base" />
                                    {/* Overlay Zones */}
                                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        {zones.map((zone) => {
                                            const style = ZONE_PALETTE[zone.colorIndex || 0];
                                            return <polygon key={zone.id} points={zone.points.map(p => `${p.x},${p.y}`).join(' ')} fill={style.fill} stroke={style.stroke} strokeWidth="0.2" />;
                                        })}
                                    </svg>

                                    {/* Overlay Connector Lines (Leader Lines) */}
                                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        {distributedPins.map(pin => {
                                            // Only draw line if the label has moved significantly from the base
                                            const moved = Math.abs(pin.lx - pin.baseX) > 0.5 || Math.abs(pin.ly - (pin.baseY - 4)) > 0.5;
                                            if (!moved) return null;
                                            return (
                                                <line
                                                    key={`line-${pin.id}`}
                                                    x1={pin.baseX}
                                                    y1={pin.baseY}
                                                    x2={pin.lx}
                                                    y2={pin.ly}
                                                    stroke="#64748b"
                                                    strokeWidth="0.15"
                                                    opacity="0.6"
                                                />
                                            );
                                        })}
                                    </svg>

                                    {/* Overlay Pins and Labels */}
                                    {distributedPins.map(pin => (
                                        <div key={pin.id}>
                                            {/* Original Pin Location (The Dot) */}
                                            <div
                                                className="absolute transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 rounded-full border border-white shadow-sm z-10 pointer-events-none"
                                                style={{ left: `${pin.baseX}%`, top: `${pin.baseY}%` }}
                                            />

                                            {/* The Floating Feature Capsule */}
                                            <div
                                                className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:z-50 transition-all duration-300 ease-out group"
                                                style={{ left: `${pin.lx}%`, top: `${pin.ly}%` }}
                                            >
                                                <div className="flex flex-col items-center">
                                                    {/* Feature Capsule */}
                                                    <div className="bg-white rounded-full shadow-md border border-slate-200 p-0.5 flex gap-0.5 items-center justify-center min-w-[20px] h-5 px-1 hover:scale-110 transition-transform cursor-default">
                                                        {pin.featureColors.length > 0 ? (
                                                            pin.featureColors.map((color, idx) => (
                                                                <div key={idx} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                                                            ))
                                                        ) : (
                                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                                        )}
                                                    </div>

                                                    {/* Tooltip on Hover */}
                                                    <div className="absolute top-full mt-1 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                                                        {pin.displayName || 'Pin'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-400 italic">
                                    {t('uploadMapToView')}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Footer Actions */}
                <div className="flex justify-center pt-8 border-t border-slate-200">
                    <button onClick={handleExportLLMReport} className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold bg-slate-800 text-white hover:bg-slate-900 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        <FileText size={18} />
                        {t('exportLLM')}
                    </button>
                </div>
            </div>
        </div >
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
    const [toast, setToast] = useState(null);

    const t = (key) => TRANSLATIONS[lang][key] || key;
    const activePin = useMemo(() => pins.find(p => p.id === editingPinId), [pins, editingPinId]);

    const showToast = (message, type = 'info') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // 新增：导航函数
    const handleNavigatePin = (direction) => {
        // 1. 获取当前所有 Pin 的顺序 (与列表一致)
        // 这里简单使用 pins 数组顺序。如果 MapView 进行了排序，需要保持一致。
        // 由于 MapView 的 groupedPins 逻辑比较复杂，我们这里简单实现：
        // 在整个 pins 数组中查找。如果需要严格遵循列表视图的顺序（分区域），需要复用 groupedPins 逻辑。
        // 为了简单且符合直觉（按添加顺序或当前过滤后的顺序），我们先按 pins 数组索引。
        // 更佳实践是：App 维护一个 sortedPins 列表，但这会增加复杂度。
        // 考虑到用户体验，通常按 ID 或添加顺序即可，或者在 MapView 内部处理。

        // 让我们尝试在 App 中构建一个简单的线性列表，逻辑同 MapView 的 pinsWithInfo
        const currentIndex = pins.findIndex(p => p.id === editingPinId);
        if (currentIndex === -1) return;

        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < pins.length) {
            setEditingPinId(pins[newIndex].id);
        }
    };

    const handleSaveProject = () => {
        // If JSZip is available (production), implement zip logic here
        // For simplicity in this single-file context without npm, we stick to JSON fallback
        // Or prompt user to npm install jszip as discussed before.
        // Given the constraints, the JSON fallback is safer here unless user confirmed installation.
        const projectData = { version: "2.0", timestamp: Date.now(), mapImage, pins: pins.map(p => ({ ...p, imageSrc: null, originalImageSrc: null })), zones };
        const blob = new Blob([JSON.stringify(projectData)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a'); link.href = url; link.download = `plant-signage-project-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(link); link.click(); document.body.removeChild(link);
    };

    const handleLoadProject = (e) => {
        const file = e.target.files[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                if (data.mapImage) setMapImage(data.mapImage); else setMapImage(null); // Reset map if not present
                if (data.pins) setPins(data.pins); if (data.zones) setZones(data.zones);
                showToast(t('msgLoadSuccess'), 'success');
            } catch (err) { showToast(t('msgLoadErr'), 'error'); }
        };
        reader.readAsText(file);
    };

    return (
        <div className="flex flex-col h-screen bg-slate-100 font-sans text-slate-800 overflow-hidden relative">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
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
                                if (tab === 'editor' && !activePin) return showToast("请先在地图上选择或添加一张图片", 'error');
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
                {activeTab === 'map' && <MapView mapImage={mapImage} setMapImage={setMapImage} pins={pins} setPins={setPins} zones={zones} setZones={setZones} editingPinId={editingPinId} setEditingPinId={setEditingPinId} setActiveTab={setActiveTab} mapMode={mapMode} setMapMode={setMapMode} currentZonePoints={currentZonePoints} setCurrentZonePoints={setCurrentZonePoints} onEditImage={(pin) => { setEditingPinId(pin.id); setActiveTab('editor'); }} t={t} showToast={showToast} />}
                {activeTab === 'editor' && activePin && (
                    <ImageEditor
                        key={activePin.id}
                        pin={activePin}
                        setPins={setPins}
                        setActiveTab={setActiveTab}
                        t={t}
                        // 传递导航属性
                        onNavigate={handleNavigatePin}
                        hasPrev={pins.findIndex(p => p.id === activePin.id) > 0}
                        hasNext={pins.findIndex(p => p.id === activePin.id) < pins.length - 1}
                        pins={pins}
                        zones={zones}
                    />
                )}
                {activeTab === 'stats' && <StatsView pins={pins} zones={zones} mapImage={mapImage} t={t} />}
            </main>
        </div>
    );
};

export default App;