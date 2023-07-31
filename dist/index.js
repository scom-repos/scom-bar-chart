var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-bar-chart/global/interfaces.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ModeType = void 0;
    var ModeType;
    (function (ModeType) {
        ModeType["LIVE"] = "Live";
        ModeType["SNAPSHOT"] = "Snapshot";
    })(ModeType = exports.ModeType || (exports.ModeType = {}));
});
define("@scom/scom-bar-chart/global/utils.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fetchDataByCid = exports.readJsonFromFileExplorer = exports.callAPI = exports.concatUnique = exports.extractUniqueTimes = exports.groupByCategory = exports.groupArrayByKey = exports.formatNumberWithSeparators = exports.formatNumberByFormat = exports.formatNumber = void 0;
    ///<amd-module name='@scom/scom-bar-chart/global/utils.ts'/> 
    const formatNumber = (num, options) => {
        if (num === null)
            return '-';
        const { decimals, format, percentValues } = options || {};
        if (percentValues) {
            return `${(0, exports.formatNumberWithSeparators)(num, 2)}%`;
        }
        if (format) {
            return (0, exports.formatNumberByFormat)(num, format);
        }
        const absNum = Math.abs(num);
        if (absNum >= 1000000000) {
            return (0, exports.formatNumberWithSeparators)((num / 1000000000), decimals || 3) + 'B';
        }
        if (absNum >= 1000000) {
            return (0, exports.formatNumberWithSeparators)((num / 1000000), decimals || 3) + 'M';
        }
        if (absNum >= 1000) {
            return (0, exports.formatNumberWithSeparators)((num / 1000), decimals || 3) + 'K';
        }
        if (absNum < 0.0000001) {
            return (0, exports.formatNumberWithSeparators)(num);
        }
        if (absNum < 0.00001) {
            return (0, exports.formatNumberWithSeparators)(num, 6);
        }
        if (absNum < 0.001) {
            return (0, exports.formatNumberWithSeparators)(num, 4);
        }
        return (0, exports.formatNumberWithSeparators)(num, 2);
    };
    exports.formatNumber = formatNumber;
    const formatNumberByFormat = (num, format, separators) => {
        if (!format)
            return (0, exports.formatNumberWithSeparators)(num);
        const decimalPlaces = format.split('.')[1] ? format.split('.').length : 0;
        if (format.includes('%')) {
            return (0, exports.formatNumberWithSeparators)((num * 100), decimalPlaces) + '%';
        }
        const currencySymbol = format.indexOf('$') !== -1 ? '$' : '';
        const roundedNum = (0, exports.formatNumberWithSeparators)(num, decimalPlaces);
        if (separators || !(format.includes('m') || format.includes('a'))) {
            return format.indexOf('$') === 0 ? `${currencySymbol}${roundedNum}` : `${roundedNum}${currencySymbol}`;
        }
        const parts = roundedNum.split('.');
        const decimalPart = parts.length > 1 ? parts[1] : '';
        const integerPart = (0, exports.formatNumber)(parseInt(parts[0].replace(/,/g, '')), { decimals: decimalPart.length });
        return `${currencySymbol}${integerPart}`;
    };
    exports.formatNumberByFormat = formatNumberByFormat;
    const formatNumberWithSeparators = (value, precision) => {
        if (!value)
            value = 0;
        if (precision || precision === 0) {
            let outputStr = '';
            if (value >= 1) {
                outputStr = value.toLocaleString('en-US', { maximumFractionDigits: precision });
            }
            else {
                outputStr = value.toLocaleString('en-US', { maximumSignificantDigits: precision });
            }
            return outputStr;
        }
        return value.toLocaleString('en-US');
    };
    exports.formatNumberWithSeparators = formatNumberWithSeparators;
    const groupArrayByKey = (arr) => {
        const groups = new Map();
        for (const [key, value] of arr) {
            const strKey = key instanceof Date ? key.getTime().toString() : key.toString();
            const existingValue = groups.get(strKey);
            if (existingValue !== undefined) {
                if (typeof existingValue === 'number' && typeof value === 'number') {
                    groups.set(strKey, existingValue + value);
                }
                else {
                    groups.set(strKey, value);
                }
            }
            else {
                groups.set(strKey, value);
            }
        }
        return Array.from(groups.entries()).map(([key, value]) => {
            const parsedKey = isNaN(Number(key)) ? key : new Date(Number(key));
            return [parsedKey, value];
        });
    };
    exports.groupArrayByKey = groupArrayByKey;
    const groupByCategory = (data, category, xAxis, yAxis) => {
        return data.reduce((result, item) => {
            const _category = item[category];
            if (!result[_category]) {
                result[_category] = {};
            }
            result[_category][item[xAxis]] = item[yAxis];
            return result;
        }, {});
    };
    exports.groupByCategory = groupByCategory;
    const extractUniqueTimes = (data, keyValue) => {
        return data.reduce((acc, cur) => {
            if (!acc.hasOwnProperty(cur[keyValue])) {
                acc[cur[keyValue]] = null;
            }
            return acc;
        }, {});
    };
    exports.extractUniqueTimes = extractUniqueTimes;
    const concatUnique = (obj1, obj2) => {
        const merged = Object.assign(Object.assign({}, obj1), obj2);
        return Object.keys(merged).reduce((acc, key) => {
            if (!acc.hasOwnProperty(key)) {
                acc[key] = merged[key];
            }
            return acc;
        }, {});
    };
    exports.concatUnique = concatUnique;
    const callAPI = async (apiEndpoint) => {
        if (!apiEndpoint)
            return [];
        try {
            const response = await fetch(apiEndpoint);
            const jsonData = await response.json();
            return jsonData.result.rows || [];
        }
        catch (error) {
            console.log(error);
        }
        return [];
    };
    exports.callAPI = callAPI;
    const readJsonFromFileExplorer = async () => {
        return new Promise((resolve, reject) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = () => {
                const files = input.files;
                if (files && files.length > 0) {
                    const file = files[0];
                    const reader = new FileReader();
                    reader.readAsText(file, 'UTF-8');
                    reader.onload = (event) => {
                        var _a;
                        resolve((_a = event.target) === null || _a === void 0 ? void 0 : _a.result);
                    };
                    reader.onerror = (event) => {
                        var _a;
                        reject((_a = event.target) === null || _a === void 0 ? void 0 : _a.error);
                    };
                }
                else {
                    reject('No file selected');
                }
            };
            input.click();
        });
    };
    exports.readJsonFromFileExplorer = readJsonFromFileExplorer;
    const _fetchFileContentByCID = async (ipfsCid) => {
        let res;
        try {
            // const ipfsBaseUrl = `${window.location.origin}/ipfs/`;
            const ipfsBaseUrl = `https://ipfs.scom.dev/ipfs/`;
            res = await fetch(ipfsBaseUrl + ipfsCid);
        }
        catch (err) {
        }
        return res;
    };
    const fetchDataByCid = async (ipfsCid) => {
        const res = await _fetchFileContentByCID(ipfsCid);
        const content = await res.json();
        return content;
    };
    exports.fetchDataByCid = fetchDataByCid;
});
define("@scom/scom-bar-chart/global/index.ts", ["require", "exports", "@scom/scom-bar-chart/global/interfaces.ts", "@scom/scom-bar-chart/global/utils.ts"], function (require, exports, interfaces_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(interfaces_1, exports);
    __exportStar(utils_1, exports);
});
define("@scom/scom-bar-chart/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.chartStyle = exports.containerStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.containerStyle = components_1.Styles.style({
        width: 'var(--layout-container-width)',
        maxWidth: 'var(--layout-container-max_width)',
        textAlign: 'var(--layout-container-text_align)',
        margin: '0 auto',
        padding: 10
    });
    exports.chartStyle = components_1.Styles.style({
        display: 'block',
    });
});
define("@scom/scom-bar-chart/assets.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let moduleDir = components_2.application.currentModuleDir;
    function fullPath(path) {
        if (path.indexOf('://') > 0)
            return path;
        return `${moduleDir}/${path}`;
    }
    exports.default = {
        fullPath
    };
});
define("@scom/scom-bar-chart/data.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-bar-chart/data.json.ts'/> 
    exports.default = {
        defaultBuilderData: {
            apiEndpoint: "/dune/query/2360815",
            title: 'ETH Withdrawals after Shanghai Unlock',
            options: {
                xColumn: {
                    key: 'time',
                    type: 'time'
                },
                yColumns: [
                    'ETH',
                ],
                groupBy: 'category',
                stacking: true,
                legend: {
                    show: true
                },
                seriesOptions: [
                    {
                        key: 'Reward',
                        color: '#378944'
                    },
                    {
                        key: 'Full Withdraw',
                        color: '#b03030'
                    }
                ],
                xAxis: {
                    title: 'Date',
                    tickFormat: 'MMM DD'
                },
                yAxis: {
                    title: 'ETH',
                    position: 'left',
                    labelFormat: '0,000.ma'
                }
            }
        }
    };
});
define("@scom/scom-bar-chart/config/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.uploadStyle = exports.comboBoxStyle = void 0;
    const Theme = components_3.Styles.Theme.ThemeVars;
    components_3.Styles.cssRule('i-scom-bar-chart-data', {
        $nest: {
            'i-input > input': {
                padding: '0.5rem 1rem'
            },
            '.capture-btn': {
                whiteSpace: 'nowrap'
            }
        }
    });
    exports.comboBoxStyle = components_3.Styles.style({
        width: '100% !important',
        $nest: {
            '.selection': {
                width: '100% !important',
                maxWidth: '100%',
                padding: '0.5rem 1rem',
                color: Theme.input.fontColor,
                backgroundColor: Theme.input.background,
                borderRadius: 0
            },
            '.selection input': {
                color: 'inherit',
                backgroundColor: 'inherit',
                padding: 0
            },
            '.selection:focus-within': {
                backgroundColor: `darken(${Theme.input.background}, 20%)`
            },
            '> .icon-btn:hover': {
                backgroundColor: 'transparent'
            }
        }
    });
    exports.uploadStyle = components_3.Styles.style({
        height: 'auto',
        width: '100%',
        margin: 0,
        $nest: {
            '> .i-upload-wrapper': {
                marginBottom: 0
            }
        }
    });
});
define("@scom/scom-bar-chart/config/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-bar-chart/config/index.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-bar-chart/global/index.ts", "@scom/scom-bar-chart/config/index.css.ts", "@scom/scom-bar-chart/config/index.css.ts"], function (require, exports, components_4, index_1, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_4.Styles.Theme.ThemeVars;
    const modeOptions = [
        {
            label: 'Live',
            value: index_1.ModeType.LIVE
        },
        {
            label: 'Snapshot',
            value: index_1.ModeType.SNAPSHOT
        }
    ];
    let ScomBarChartData = class ScomBarChartData extends components_4.Module {
        constructor(parent, options) {
            super(parent, options);
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        get data() {
            return this._data;
        }
        set data(value) {
            this._data = value;
            this.renderUI();
        }
        get mode() {
            return this._data.mode;
        }
        set mode(value) {
            this._data.mode = value;
            this.updateMode();
        }
        get apiEndpoint() {
            return this._data.apiEndpoint;
        }
        set apiEndpoint(value) {
            this._data.apiEndpoint = value;
        }
        renderUI() {
            var _a;
            const findedMode = modeOptions.find((mode) => mode.value === this.data.mode);
            if (findedMode)
                this.modeSelect.selectedItem = findedMode;
            this.updateMode();
            this.endpointInput.value = (_a = this.data.apiEndpoint) !== null && _a !== void 0 ? _a : '';
            this.captureBtn.enabled = !!this.endpointInput.value;
        }
        onModeChanged() {
            this.data.mode = this.modeSelect.selectedItem.value;
            this.updateMode();
        }
        async updateMode() {
            var _a, _b;
            const isSnapshot = this.data.mode === index_1.ModeType.SNAPSHOT;
            this.captureBtn.visible = isSnapshot;
            this.endpointInput.readOnly = isSnapshot;
            this.requiredLb.visible = !isSnapshot;
            this.pnlUpload.visible = isSnapshot;
            this.fileNameLb.visible = !!((_a = this.data.file) === null || _a === void 0 ? void 0 : _a.cid);
            this.fileNameLb.caption = `File name: ${((_b = this.data.file) === null || _b === void 0 ? void 0 : _b.name) || ''}`;
        }
        async updateChartData() {
            const data = this.data.apiEndpoint ? await (0, index_1.callAPI)(this.data.apiEndpoint) : [];
            this._data.chartData = JSON.stringify(data, null, 4);
        }
        onUpdateEndpoint() {
            var _a;
            this.data.apiEndpoint = (_a = this.endpointInput.value) !== null && _a !== void 0 ? _a : '';
            this.captureBtn.enabled = !!this.data.apiEndpoint;
        }
        async onCapture() {
            var _a;
            this.captureBtn.rightIcon.spin = true;
            this.captureBtn.rightIcon.visible = true;
            try {
                await this.updateChartData();
                if ((_a = this._data.chartData) === null || _a === void 0 ? void 0 : _a.length)
                    await this.onUploadToIPFS();
            }
            catch (err) {
            }
            finally {
                this.captureBtn.rightIcon.spin = false;
                this.captureBtn.rightIcon.visible = false;
            }
        }
        async onUploadToIPFS() {
            var _a, _b;
            const result = (_b = (_a = (await components_4.application.uploadData('data.json', this.data.chartData)).data) === null || _a === void 0 ? void 0 : _a.links) === null || _b === void 0 ? void 0 : _b[0];
            if (result) {
                this.mdAlert.status = 'success';
                this.mdAlert.status = 'Success';
                this.mdAlert.content = 'Upload successfully!';
                this.mdAlert.showModal();
                this._data.file = { cid: result.cid, name: result.name };
            }
            else {
                this.mdAlert.status = 'error';
                this.mdAlert.status = 'Error';
                this.mdAlert.content = 'Upload failed!';
                this.mdAlert.showModal();
            }
        }
        async onImportFile(target, files) {
            const self = this;
            if (files && files.length > 0) {
                const file = files[0];
                this.fileNameLb.caption = `File name: ${file.name || ''}`;
                this.fileNameLb.visible = true;
                // this.uploadBtn.visible = false
                const reader = new FileReader();
                reader.readAsText(file, 'UTF-8');
                reader.onload = async (event) => {
                    var _a;
                    self._data.chartData = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
                    target.clear();
                    if (self._data.chartData)
                        await this.onUploadToIPFS();
                };
            }
            else {
                this.fileNameLb.visible = false;
                // this.uploadBtn.visible = true
            }
        }
        async onExportFile() {
            this.downloadBtn.rightIcon.spin = true;
            this.downloadBtn.rightIcon.visible = true;
            try {
                let chartData = this.data.chartData;
                if (this.data.mode === index_1.ModeType.LIVE) {
                    chartData = JSON.stringify(this.data.apiEndpoint ? await (0, index_1.callAPI)(this.data.apiEndpoint) : [], null, 4);
                }
                const blob = new Blob([chartData], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'data.json';
                a.click();
                URL.revokeObjectURL(url);
            }
            catch (err) {
            }
            finally {
                this.downloadBtn.rightIcon.spin = false;
                this.downloadBtn.rightIcon.visible = false;
            }
        }
        init() {
            super.init();
            const apiEndpoint = this.getAttribute('apiEndpoint', true);
            const mode = this.getAttribute('mode', true, index_1.ModeType.LIVE);
            const file = this.getAttribute('file', true);
            const chartData = this.getAttribute('chartData', true);
            this.data = { mode, apiEndpoint, file, chartData };
        }
        render() {
            return (this.$render("i-panel", null,
                this.$render("i-vstack", { gap: '10px' },
                    this.$render("i-vstack", { gap: '10px' },
                        this.$render("i-label", { caption: 'Mode' }),
                        this.$render("i-combo-box", { id: 'modeSelect', items: modeOptions, selectedItem: modeOptions[0], height: 42, width: '100%', class: index_css_1.comboBoxStyle, onChanged: this.onModeChanged })),
                    this.$render("i-vstack", { gap: '10px' },
                        this.$render("i-hstack", { gap: 4 },
                            this.$render("i-label", { caption: 'Api Endpoint' }),
                            this.$render("i-label", { id: "requiredLb", caption: '*', font: { color: '#ff0000' } })),
                        this.$render("i-hstack", { verticalAlignment: 'center', gap: '0.5rem' },
                            this.$render("i-input", { id: 'endpointInput', height: 42, width: '100%', onChanged: this.onUpdateEndpoint }),
                            this.$render("i-button", { id: 'captureBtn', height: 42, caption: 'Capture Snapshot', background: { color: Theme.colors.primary.main }, font: { color: Theme.colors.primary.contrastText }, rightIcon: { name: 'spinner', spin: false, fill: Theme.colors.primary.contrastText, width: 16, height: 16, visible: false }, class: "capture-btn", enabled: false, onClick: this.onCapture }))),
                    this.$render("i-vstack", { id: "pnlUpload", gap: '10px' },
                        this.$render("i-label", { caption: 'Upload' }),
                        this.$render("i-upload", { id: "uploadBtn", width: "100%", caption: 'Upload JSON file', onChanged: this.onImportFile, class: index_css_1.uploadStyle }),
                        this.$render("i-label", { id: "fileNameLb", visible: false, caption: '' })),
                    this.$render("i-vstack", { gap: '10px' },
                        this.$render("i-button", { id: "downloadBtn", margin: { top: 10 }, height: 42, width: "100%", font: { color: Theme.colors.primary.contrastText }, rightIcon: { name: 'spinner', spin: false, fill: Theme.colors.primary.contrastText, width: 16, height: 16, visible: false }, caption: "Download File", onClick: this.onExportFile }))),
                this.$render("i-alert", { id: "mdAlert" })));
        }
    };
    ScomBarChartData = __decorate([
        components_4.customModule,
        (0, components_4.customElements)('i-scom-bar-chart-data')
    ], ScomBarChartData);
    exports.default = ScomBarChartData;
});
define("@scom/scom-bar-chart", ["require", "exports", "@ijstech/components", "@scom/scom-bar-chart/global/index.ts", "@scom/scom-bar-chart/index.css.ts", "@scom/scom-bar-chart/assets.ts", "@scom/scom-bar-chart/data.json.ts", "@scom/scom-bar-chart/config/index.tsx"], function (require, exports, components_5, index_2, index_css_2, assets_1, data_json_1, index_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_5.Styles.Theme.ThemeVars;
    const currentTheme = components_5.Styles.Theme.currentTheme;
    const options = {
        type: 'object',
        properties: {
            xColumn: {
                type: 'object',
                title: 'X column',
                required: true,
                properties: {
                    key: {
                        type: 'string',
                        required: true
                    },
                    type: {
                        type: 'string',
                        enum: ['time', 'category'],
                        required: true
                    }
                }
            },
            yColumns: {
                type: 'array',
                title: 'Y columns',
                required: true,
                items: {
                    type: 'string'
                }
            },
            groupBy: {
                type: 'string'
            },
            stacking: {
                type: 'boolean'
            },
            legend: {
                type: 'object',
                title: 'Show Chart Legend',
                properties: {
                    show: {
                        type: 'boolean'
                    },
                    scroll: {
                        type: 'boolean'
                    },
                    position: {
                        type: 'string',
                        enum: ['top', 'bottom', 'left', 'right']
                    }
                }
            },
            showDataLabels: {
                type: 'boolean'
            },
            percentage: {
                type: 'boolean'
            },
            xAxis: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string'
                    },
                    tickFormat: {
                        type: 'string'
                    },
                    reverseValues: {
                        type: 'boolean'
                    }
                }
            },
            yAxis: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string'
                    },
                    tickFormat: {
                        type: 'string'
                    },
                    labelFormat: {
                        type: 'string'
                    },
                    position: {
                        type: 'string',
                        enum: ['left', 'right']
                    }
                }
            },
            seriesOptions: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        key: {
                            type: 'string',
                            required: true
                        },
                        title: {
                            type: 'string'
                        },
                        color: {
                            type: 'string',
                            format: 'color'
                        }
                    }
                }
            }
        }
    };
    let ScomBarChart = class ScomBarChart extends components_5.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this.chartData = [];
            this.apiEndpoint = '';
            this.mode = index_2.ModeType.LIVE;
            this._data = { apiEndpoint: '', title: '', options: undefined };
            this.tag = {};
            this.defaultEdit = true;
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            this.updateChartData();
        }
        getTag() {
            return this.tag;
        }
        async setTag(value) {
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    this.tag[prop] = newValue[prop];
                }
            }
            this.width = this.tag.width || 700;
            this.height = this.tag.height || 500;
            this.onUpdateBlock();
        }
        getPropertiesSchema() {
            const propertiesSchema = {
                type: 'object',
                properties: {
                    // apiEndpoint: {
                    //   type: 'string',
                    //   title: 'API Endpoint',
                    //   required: true
                    // },
                    title: {
                        type: 'string',
                        required: true
                    },
                    description: {
                        type: 'string'
                    },
                    options
                }
            };
            return propertiesSchema;
        }
        getGeneralSchema() {
            const propertiesSchema = {
                type: 'object',
                required: ['title'],
                properties: {
                    // apiEndpoint: {
                    //   type: 'string'
                    // },
                    title: {
                        type: 'string'
                    },
                    description: {
                        type: 'string'
                    }
                }
            };
            return propertiesSchema;
        }
        getAdvanceSchema() {
            const propertiesSchema = {
                type: 'object',
                properties: {
                    options
                }
            };
            return propertiesSchema;
        }
        getThemeSchema() {
            const themeSchema = {
                type: 'object',
                properties: {
                    darkShadow: {
                        type: 'boolean'
                    },
                    fontColor: {
                        type: 'string',
                        format: 'color'
                    },
                    backgroundColor: {
                        type: 'string',
                        format: 'color'
                    },
                    // width: {
                    //   type: 'string'
                    // },
                    height: {
                        type: 'string'
                    }
                }
            };
            return themeSchema;
        }
        _getActions(propertiesSchema, themeSchema, advancedSchema) {
            const actions = [
                {
                    name: 'Data Source',
                    icon: 'database',
                    command: (builder, userInputData) => {
                        let _oldData = { apiEndpoint: '', title: '', options: undefined };
                        return {
                            execute: async () => {
                                _oldData = Object.assign({}, this._data);
                                if (userInputData) {
                                    if (advancedSchema) {
                                        this._data = Object.assign(Object.assign({}, this._data), userInputData);
                                    }
                                    else {
                                        this._data = Object.assign({}, userInputData);
                                    }
                                }
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                                this.setData(this._data);
                            },
                            undo: () => {
                                if (advancedSchema)
                                    _oldData = Object.assign(Object.assign({}, _oldData), { options: this._data.options });
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(_oldData);
                                this.setData(_oldData);
                            },
                            redo: () => { }
                        };
                    },
                    customUI: {
                        render: (data, onConfirm) => {
                            const vstack = new components_5.VStack(null, { gap: '1rem' });
                            const config = new index_3.default(null, Object.assign(Object.assign({}, this._data), { chartData: JSON.stringify(this.chartData) }));
                            const hstack = new components_5.HStack(null, {
                                verticalAlignment: 'center',
                                horizontalAlignment: 'end'
                            });
                            const button = new components_5.Button(null, {
                                caption: 'Confirm',
                                width: 'auto',
                                height: 40,
                                font: { color: Theme.colors.primary.contrastText }
                            });
                            hstack.append(button);
                            vstack.append(config);
                            vstack.append(hstack);
                            button.onClick = async () => {
                                const { apiEndpoint, file, mode } = config.data;
                                if (mode === 'Live') {
                                    if (!apiEndpoint)
                                        return;
                                    this._data.apiEndpoint = apiEndpoint;
                                    this.updateChartData();
                                }
                                else {
                                    if (!(file === null || file === void 0 ? void 0 : file.cid))
                                        return;
                                    this.chartData = config.data.chartData ? JSON.parse(config.data.chartData) : [];
                                    this.onUpdateBlock();
                                }
                                if (onConfirm) {
                                    onConfirm(true, Object.assign(Object.assign({}, this._data), { apiEndpoint, file, mode }));
                                }
                            };
                            return vstack;
                        }
                    }
                },
                {
                    name: 'Settings',
                    icon: 'cog',
                    command: (builder, userInputData) => {
                        let _oldData = { apiEndpoint: '', title: '', options: undefined };
                        return {
                            execute: async () => {
                                _oldData = Object.assign({}, this._data);
                                if (userInputData) {
                                    if (advancedSchema) {
                                        this._data = Object.assign(Object.assign({}, this._data), userInputData);
                                    }
                                    else {
                                        this._data = Object.assign({}, userInputData);
                                    }
                                }
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                                this.setData(this._data);
                            },
                            undo: () => {
                                if (advancedSchema)
                                    _oldData = Object.assign(Object.assign({}, _oldData), { options: this._data.options });
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(_oldData);
                                this.setData(_oldData);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: propertiesSchema,
                    userInputUISchema: advancedSchema ? undefined : {
                        type: 'VerticalLayout',
                        elements: [
                            // {
                            //   type: 'Control',
                            //   scope: '#/properties/apiEndpoint',
                            //   title: 'API Endpoint'
                            // },
                            {
                                type: 'Control',
                                scope: '#/properties/title'
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/description'
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/options',
                                options: {
                                    detail: {
                                        type: 'VerticalLayout'
                                    }
                                }
                            }
                        ]
                    }
                },
                {
                    name: 'Theme Settings',
                    icon: 'palette',
                    command: (builder, userInputData) => {
                        let oldTag = {};
                        return {
                            execute: async () => {
                                if (!userInputData)
                                    return;
                                oldTag = JSON.parse(JSON.stringify(this.tag));
                                if (builder === null || builder === void 0 ? void 0 : builder.setTag)
                                    builder.setTag(userInputData);
                                else
                                    this.setTag(userInputData);
                            },
                            undo: () => {
                                if (!userInputData)
                                    return;
                                this.tag = JSON.parse(JSON.stringify(oldTag));
                                if (builder === null || builder === void 0 ? void 0 : builder.setTag)
                                    builder.setTag(this.tag);
                                else
                                    this.setTag(this.tag);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: themeSchema
                }
            ];
            if (advancedSchema) {
                const advanced = {
                    name: 'Advanced',
                    icon: 'sliders-h',
                    command: (builder, userInputData) => {
                        let _oldData = {};
                        return {
                            execute: async () => {
                                var _a;
                                _oldData = Object.assign({}, (_a = this._data) === null || _a === void 0 ? void 0 : _a.options);
                                if ((userInputData === null || userInputData === void 0 ? void 0 : userInputData.options) !== undefined)
                                    this._data.options = userInputData.options;
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                                this.setData(this._data);
                            },
                            undo: () => {
                                this._data.options = Object.assign({}, _oldData);
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                                this.setData(this._data);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: advancedSchema,
                    userInputUISchema: {
                        type: 'VerticalLayout',
                        elements: [
                            {
                                type: 'Control',
                                scope: '#/properties/options',
                                options: {
                                    detail: {
                                        type: 'VerticalLayout'
                                    }
                                }
                            }
                        ]
                    }
                };
                actions.push(advanced);
            }
            return actions;
        }
        getConfigurators() {
            const self = this;
            return [
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getActions: () => {
                        return this._getActions(this.getGeneralSchema(), this.getThemeSchema(), this.getAdvanceSchema());
                    },
                    getData: this.getData.bind(this),
                    setData: async (data) => {
                        const defaultData = data_json_1.default.defaultBuilderData;
                        await this.setData(Object.assign(Object.assign({}, defaultData), data));
                    },
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                },
                {
                    name: 'Emdedder Configurator',
                    target: 'Embedders',
                    getActions: () => {
                        return this._getActions(this.getPropertiesSchema(), this.getThemeSchema());
                    },
                    getLinkParams: () => {
                        const data = this._data || {};
                        return {
                            data: window.btoa(JSON.stringify(data))
                        };
                    },
                    setLinkParams: async (params) => {
                        if (params.data) {
                            const utf8String = decodeURIComponent(params.data);
                            const decodedString = window.atob(utf8String);
                            const newData = JSON.parse(decodedString);
                            let resultingData = Object.assign(Object.assign({}, self._data), newData);
                            await this.setData(resultingData);
                        }
                    },
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                }
            ];
        }
        updateStyle(name, value) {
            value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
        }
        updateTheme() {
            var _a, _b, _c;
            if (this.chartContainer) {
                this.chartContainer.style.boxShadow = ((_a = this.tag) === null || _a === void 0 ? void 0 : _a.darkShadow) ? '0 -2px 10px rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
            }
            this.updateStyle('--text-primary', (_b = this.tag) === null || _b === void 0 ? void 0 : _b.fontColor);
            this.updateStyle('--background-main', (_c = this.tag) === null || _c === void 0 ? void 0 : _c.backgroundColor);
        }
        onUpdateBlock() {
            this.renderChart();
            this.updateTheme();
        }
        async updateChartData() {
            if (this._data.mode === index_2.ModeType.LIVE)
                this.renderLiveData();
            else
                this.renderSnapshotData();
        }
        async renderSnapshotData() {
            var _a;
            if ((_a = this._data.file) === null || _a === void 0 ? void 0 : _a.cid) {
                this.loadingElm.visible = true;
                const data = await (0, index_2.fetchDataByCid)(this._data.file.cid);
                this.loadingElm.visible = false;
                if (data) {
                    this.chartData = data;
                    this.onUpdateBlock();
                    return;
                }
            }
            this.chartData = [];
            this.onUpdateBlock();
        }
        async renderLiveData() {
            if (this._data.apiEndpoint === this.apiEndpoint) {
                this.onUpdateBlock();
                return;
            }
            const apiEndpoint = this._data.apiEndpoint;
            this.apiEndpoint = apiEndpoint;
            if (apiEndpoint) {
                this.loadingElm.visible = true;
                let data = null;
                try {
                    data = await (0, index_2.callAPI)(apiEndpoint);
                }
                catch (_a) { }
                this.loadingElm.visible = false;
                if (data && this._data.apiEndpoint === apiEndpoint) {
                    this.chartData = data;
                    this.onUpdateBlock();
                    return;
                }
            }
            this.chartData = [];
            this.onUpdateBlock();
        }
        renderChart() {
            if ((!this.pnlChart && this._data.options) || !this._data.options)
                return;
            const { title, description, options } = this._data;
            this.lbTitle.caption = title;
            this.lbDescription.caption = description;
            this.lbDescription.visible = !!description;
            this.pnlChart.height = `calc(100% - ${this.vStackInfo.offsetHeight + 10}px)`;
            const { xColumn, yColumns, groupBy, seriesOptions, stacking, legend, showDataLabels, percentage, xAxis, yAxis } = options;
            const { key, type } = xColumn;
            let _legend = {
                show: legend === null || legend === void 0 ? void 0 : legend.show,
            };
            if (legend === null || legend === void 0 ? void 0 : legend.position) {
                _legend[legend.position] = 'auto';
                if (['left', 'right'].includes(legend.position)) {
                    _legend['orient'] = 'vertical';
                }
            }
            if (legend === null || legend === void 0 ? void 0 : legend.scroll) {
                _legend['type'] = 'scroll';
            }
            let _series = [];
            let arr = this.chartData;
            const item = (arr && arr[0]) || {};
            if (groupBy && item[groupBy] !== undefined) {
                const group = (0, index_2.groupByCategory)(arr, groupBy, key, yColumns[0]);
                const times = (0, index_2.extractUniqueTimes)(arr, key);
                let groupData = {};
                const keys = Object.keys(group);
                keys.map(v => {
                    const _data = (0, index_2.concatUnique)(times, group[v]);
                    groupData[v] = (0, index_2.groupArrayByKey)(Object.keys(_data).map(m => [type === 'time' ? new Date(m) : m, _data[m]]));
                });
                const isPercentage = percentage && groupData[keys[0]] && typeof groupData[keys[0]][0][1] === 'number';
                _series = keys.map(v => {
                    const seriesOpt = seriesOptions === null || seriesOptions === void 0 ? void 0 : seriesOptions.find(f => f.key === v);
                    let _data = [];
                    if (isPercentage) {
                        _data = groupData[v].map((vals, idx) => {
                            let total = 0;
                            for (const k of keys) {
                                total += groupData[k][idx][1];
                            }
                            return [vals[0], (vals[1] / total) * 100];
                        });
                    }
                    else {
                        _data = groupData[v];
                    }
                    return {
                        name: (seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.title) || v,
                        type: 'bar',
                        stack: stacking,
                        itemStyle: (seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.color) ? { color: seriesOpt.color } : undefined,
                        emphasis: {
                            focus: 'series'
                        },
                        showSymbol: false,
                        label: showDataLabels ? {
                            show: true,
                            formatter: function (params) {
                                return (0, index_2.formatNumber)(params.value);
                            }
                        } : undefined,
                        data: _data
                    };
                });
            }
            else {
                let groupData = {};
                let isPercentage = percentage && arr.length > 0;
                yColumns.map(col => {
                    if (isPercentage && typeof arr[0][col] !== 'number') {
                        isPercentage = false;
                    }
                    groupData[col] = (0, index_2.groupArrayByKey)(arr.map(v => [type === 'time' ? new Date(v[key]) : col, v[col]]));
                });
                _series = yColumns.map((col) => {
                    let _data = [];
                    const seriesOpt = seriesOptions === null || seriesOptions === void 0 ? void 0 : seriesOptions.find(f => f.key === col);
                    if (isPercentage) {
                        _data = groupData[col].map((vals, idx) => {
                            let total = 0;
                            for (const k of yColumns) {
                                total += groupData[k][idx][1];
                            }
                            return [vals[0], (vals[1] / total) * 100];
                        });
                    }
                    else {
                        _data = groupData[col];
                    }
                    return {
                        name: (seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.title) || col,
                        type: 'bar',
                        stack: stacking,
                        itemStyle: (seriesOpt === null || seriesOpt === void 0 ? void 0 : seriesOpt.color) ? { color: seriesOpt.color } : undefined,
                        emphasis: {
                            focus: 'series'
                        },
                        showSymbol: false,
                        label: showDataLabels ? {
                            show: true,
                            formatter: function (params) {
                                return (0, index_2.formatNumber)(params.value);
                            }
                        } : undefined,
                        data: _data
                    };
                });
            }
            let min = 0, max = 0;
            const isSingle = _series.length === 1;
            if (isSingle) {
                const arr = _series[0].data.filter(v => v[1] !== null).map(v => v[1]);
                min = Math.min(...arr);
                max = Math.max(...arr);
                const step = (max - min) / 5;
                min = min > step ? min - step : min;
                max += step;
            }
            const minInterval = (max - min) / 4;
            const power = Math.pow(10, Math.floor(Math.log10(minInterval)));
            const roundedInterval = Math.ceil(minInterval / power) * power;
            const _chartData = {
                tooltip: {
                    trigger: 'axis',
                    position: function (point, params, dom, rect, size) {
                        var x = point[0];
                        var y = point[1];
                        var viewWidth = document.documentElement.clientWidth;
                        var viewHeight = document.documentElement.clientHeight;
                        var boxWidth = size.contentSize[0];
                        var boxHeight = size.contentSize[1];
                        // calculate x position of tooltip
                        if (x + boxWidth > viewWidth) {
                            x = x - boxWidth;
                        }
                        // calculate y position of tooltip
                        if (y + boxHeight > viewHeight) {
                            y = y - boxHeight;
                        }
                        if (x < 0)
                            x = 0;
                        if (y < 0)
                            y = 0;
                        return [x, y];
                    },
                    formatter: (params) => {
                        let res = `<b>${xColumn.type === 'time' ? (0, components_5.moment)(params[0].axisValue).format('YYYY-MM-DD HH:mm') : params[0].axisValue}</b>`;
                        if (_series.length === 1) {
                            res += `<div style="display: flex; justify-content: space-between; gap: 10px"><span>${params[0].marker} ${params[0].seriesName}</span> ${params[0].value[1] === null ? '-' : percentage ? (0, index_2.formatNumber)(params[0].value[1], { percentValues: true }) : (0, index_2.formatNumberByFormat)(params[0].value[1], (yAxis === null || yAxis === void 0 ? void 0 : yAxis.labelFormat) ? yAxis.labelFormat : undefined)}</div>`;
                        }
                        else {
                            for (const param of params) {
                                if (param.value[1] !== null) {
                                    res += `<div style="display: flex; justify-content: space-between; gap: 10px"><span>${param.marker} ${param.seriesName}</span> ${percentage ? (0, index_2.formatNumber)(param.value[1], { percentValues: true }) : (0, index_2.formatNumberByFormat)(param.value[1], (yAxis === null || yAxis === void 0 ? void 0 : yAxis.labelFormat) ? yAxis.labelFormat : undefined)}</div>`;
                                }
                            }
                        }
                        return res;
                    },
                    axisPointer: {
                        type: 'cross',
                        label: {
                            show: false
                        }
                    }
                },
                legend: _legend,
                xAxis: {
                    type: type,
                    boundaryGap: false,
                    inverse: xAxis === null || xAxis === void 0 ? void 0 : xAxis.reverseValues,
                    name: (xAxis === null || xAxis === void 0 ? void 0 : xAxis.title) || '',
                    nameLocation: 'center',
                    nameGap: (xAxis === null || xAxis === void 0 ? void 0 : xAxis.title) ? 25 : 15,
                    nameTextStyle: {
                        fontWeight: 'bold'
                    },
                    axisLabel: {
                        fontSize: 10,
                        hideOverlap: true,
                        formatter: (xAxis === null || xAxis === void 0 ? void 0 : xAxis.tickFormat) ? (value, index) => {
                            if (type === 'time') {
                                return (0, components_5.moment)(value).format(xAxis.tickFormat);
                            }
                            else {
                                if (isNaN(value))
                                    return value;
                                return (0, index_2.formatNumber)(value, { format: xAxis.tickFormat, decimals: 2 });
                            }
                        } : undefined
                    }
                },
                yAxis: {
                    type: 'value',
                    name: (yAxis === null || yAxis === void 0 ? void 0 : yAxis.title) || '',
                    nameLocation: 'center',
                    nameGap: (yAxis === null || yAxis === void 0 ? void 0 : yAxis.title) ? 40 : 15,
                    nameTextStyle: {
                        fontWeight: 'bold'
                    },
                    position: (yAxis === null || yAxis === void 0 ? void 0 : yAxis.position) || 'left',
                    min: isSingle ? min : undefined,
                    max: isSingle ? max : undefined,
                    interval: isSingle ? roundedInterval : undefined,
                    axisLabel: {
                        showMinLabel: false,
                        showMaxLabel: false,
                        fontSize: 10,
                        position: 'end',
                        formatter: (value, index) => {
                            return (0, index_2.formatNumber)(value, { format: yAxis === null || yAxis === void 0 ? void 0 : yAxis.tickFormat, decimals: 2, percentValues: percentage });
                        }
                    },
                    splitNumber: 4
                },
                series: _series
            };
            this.pnlChart.clearInnerHTML();
            const chart = new components_5.BarChart(this.pnlChart, {
                data: _chartData,
                width: '100%',
                height: '100%'
            });
            chart.data = _chartData;
            chart.drawChart();
        }
        resizeChart() {
            var _a;
            if (this.pnlChart) {
                (_a = this.pnlChart.firstChild) === null || _a === void 0 ? void 0 : _a.resize();
            }
        }
        async init() {
            this.isReadyCallbackQueued = true;
            super.init();
            this.updateTheme();
            this.setTag({
                fontColor: currentTheme.text.primary,
                backgroundColor: currentTheme.background.main,
                darkShadow: false,
                height: 500
            });
            this.classList.add(index_css_2.chartStyle);
            // const { width, height, darkShadow } = this.tag || {};
            // this.width = width || 700;
            // this.height = height || 500;
            this.maxWidth = '100%';
            this.chartContainer.style.boxShadow = 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
            const lazyLoad = this.getAttribute('lazyLoad', true, false);
            if (!lazyLoad) {
                const data = this.getAttribute('data', true);
                if (data) {
                    this.setData(data);
                }
            }
            this.isReadyCallbackQueued = false;
            this.executeReadyCallback();
            window.addEventListener('resize', () => {
                setTimeout(() => {
                    this.resizeChart();
                }, 300);
            });
        }
        render() {
            return (this.$render("i-vstack", { id: "chartContainer", position: "relative", background: { color: Theme.background.main }, height: "100%", padding: { top: 10, bottom: 10, left: 10, right: 10 }, class: index_css_2.containerStyle },
                this.$render("i-vstack", { id: "loadingElm", class: "i-loading-overlay", visible: false },
                    this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                        this.$render("i-icon", { class: "i-loading-spinner_icon", image: { url: assets_1.default.fullPath('img/loading.svg'), width: 36, height: 36 } }))),
                this.$render("i-vstack", { id: "vStackInfo", width: "100%", maxWidth: "100%", margin: { left: 'auto', right: 'auto', bottom: 10 }, verticalAlignment: "center" },
                    this.$render("i-label", { id: "lbTitle", font: { bold: true, color: Theme.text.primary } }),
                    this.$render("i-label", { id: "lbDescription", margin: { top: 5 }, font: { color: Theme.text.primary } })),
                this.$render("i-panel", { id: "pnlChart", width: "100%", height: "inherit" })));
        }
    };
    ScomBarChart = __decorate([
        components_5.customModule,
        (0, components_5.customElements)('i-scom-bar-chart')
    ], ScomBarChart);
    exports.default = ScomBarChart;
});
