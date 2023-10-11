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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
define("@scom/scom-bar-chart/global/interfaces.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-bar-chart/global/utils.ts", ["require", "exports", "@ijstech/eth-wallet", "@ijstech/components"], function (require, exports, eth_wallet_1, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.concatUnique = exports.extractUniqueTimes = exports.groupByCategory = exports.groupArrayByKey = exports.formatNumberByFormat = exports.formatNumber = exports.isNumeric = void 0;
    const isNumeric = (value) => {
        if (value instanceof eth_wallet_1.BigNumber) {
            return !value.isNaN() && value.isFinite();
        }
        if (typeof value === 'string') {
            const parsed = new eth_wallet_1.BigNumber(value);
            return !parsed.isNaN() && parsed.isFinite();
        }
        return !isNaN(value) && isFinite(value);
    };
    exports.isNumeric = isNumeric;
    const formatNumber = (num, options) => {
        if (num === null)
            return '-';
        const { decimals, format, percentValues } = options || {};
        if (percentValues) {
            return `${components_1.FormatUtils.formatNumber(num, { decimalFigures: 2 })}%`;
        }
        if (format) {
            return (0, exports.formatNumberByFormat)(num, format);
        }
        const absNum = Math.abs(num);
        if (absNum >= 1000) {
            return components_1.FormatUtils.formatNumber(num, { decimalFigures: decimals, shortScale: true });
        }
        if (absNum < 0.0000001) {
            return components_1.FormatUtils.formatNumber(num, { decimalFigures: 0 });
        }
        if (absNum < 0.00001) {
            return components_1.FormatUtils.formatNumber(num, { decimalFigures: 6 });
        }
        if (absNum < 1) {
            return components_1.FormatUtils.formatNumber(num, { decimalFigures: 4 });
        }
        return components_1.FormatUtils.formatNumber(num, { decimalFigures: 2 });
    };
    exports.formatNumber = formatNumber;
    const formatNumberByFormat = (num, format, separators) => {
        if (!format)
            return components_1.FormatUtils.formatNumber(num, { decimalFigures: 0 });
        const decimalFigures = format.split('.')[1] ? format.split('.')[1].length : 0;
        if (format.includes('%')) {
            return components_1.FormatUtils.formatNumber((num * 100), { decimalFigures }) + '%';
        }
        const currencySymbol = format.indexOf('$') !== -1 ? '$' : '';
        const roundedNum = components_1.FormatUtils.formatNumber(num, { decimalFigures });
        if (separators || !(format.includes('m') || format.includes('a'))) {
            return format.indexOf('$') === 0 ? `${currencySymbol}${roundedNum}` : `${roundedNum}${currencySymbol}`;
        }
        const parts = roundedNum.split('.');
        const decimalPart = parts.length > 1 ? parts[1] : '';
        const integerPart = (0, exports.formatNumber)(parseInt(parts[0].replace(/,/g, '')), { decimals: decimalPart.length });
        return `${currencySymbol}${integerPart}`;
    };
    exports.formatNumberByFormat = formatNumberByFormat;
    const groupArrayByKey = (arr, isMerged) => {
        if (!isMerged)
            return arr;
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
});
define("@scom/scom-bar-chart/global/index.ts", ["require", "exports", "@scom/scom-bar-chart/global/interfaces.ts", "@scom/scom-bar-chart/global/utils.ts"], function (require, exports, interfaces_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-bar-chart/global/index.ts'/> 
    __exportStar(interfaces_1, exports);
    __exportStar(utils_1, exports);
});
define("@scom/scom-bar-chart/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.chartStyle = exports.textStyle = exports.containerStyle = void 0;
    exports.containerStyle = components_2.Styles.style({
        width: 'var(--layout-container-width)',
        maxWidth: 'var(--layout-container-max_width)',
        textAlign: 'var(--layout-container-text_align)',
        margin: '0 auto',
        padding: 10,
        background: 'var(--custom-background-color, var(--background-main))'
    });
    exports.textStyle = components_2.Styles.style({
        color: 'var(--custom-text-color, var(--text-primary))'
    });
    exports.chartStyle = components_2.Styles.style({
        display: 'block',
    });
});
define("@scom/scom-bar-chart/assets.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let moduleDir = components_3.application.currentModuleDir;
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
            // apiEndpoint: "/dune/query/2360815",
            "dataSource": "Dune",
            "queryId": "2360815",
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
define("@scom/scom-bar-chart/formSchema.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getEmbedderSchema = exports.getBuilderSchema = void 0;
    ///<amd-module name='@scom/scom-bar-chart/formSchema.ts'/> 
    function visualizationOptions(columns) {
        return {
            type: 'object',
            title: 'Visualization Options',
            properties: {
                xColumn: {
                    type: 'object',
                    title: 'X column',
                    required: true,
                    properties: {
                        key: {
                            type: 'string',
                            enum: columns,
                            required: true
                        },
                        type: {
                            type: 'string',
                            enum: ['time', 'category'],
                            required: true
                        },
                        timeFormat: {
                            type: 'string'
                        }
                    }
                },
                yColumns: {
                    type: 'array',
                    title: 'Y columns',
                    required: true,
                    items: {
                        type: 'string',
                        enum: columns
                    }
                },
                groupBy: {
                    type: 'string',
                    enum: ['', ...columns]
                },
                mergeDuplicateData: {
                    type: 'boolean'
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
                        fontColor: {
                            type: 'string',
                            format: 'color'
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
                padding: {
                    type: 'object',
                    title: 'Padding (px)',
                    properties: {
                        top: {
                            type: 'number'
                        },
                        bottom: {
                            type: 'number'
                        },
                        left: {
                            type: 'number'
                        },
                        right: {
                            type: 'number'
                        }
                    }
                },
                xAxis: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string'
                        },
                        fontColor: {
                            type: 'string',
                            format: 'color'
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
                        fontColor: {
                            type: 'string',
                            format: 'color'
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
    }
    const theme = {
        darkShadow: {
            type: 'boolean'
        },
        customFontColor: {
            type: 'boolean'
        },
        fontColor: {
            type: 'string',
            format: 'color'
        },
        customBackgroundColor: {
            type: 'boolean'
        },
        backgroundColor: {
            type: 'string',
            format: 'color'
        },
        height: {
            type: 'string'
        }
    };
    const themeUISchema = {
        type: 'Category',
        label: 'Theme',
        elements: [
            {
                type: 'VerticalLayout',
                elements: [
                    {
                        type: 'HorizontalLayout',
                        elements: [
                            {
                                type: 'Control',
                                scope: '#/properties/customFontColor'
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/fontColor',
                                rule: {
                                    effect: 'ENABLE',
                                    condition: {
                                        scope: '#/properties/customFontColor',
                                        schema: {
                                            const: true
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        type: 'HorizontalLayout',
                        elements: [
                            {
                                type: 'Control',
                                scope: '#/properties/customBackgroundColor'
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/backgroundColor',
                                rule: {
                                    effect: 'ENABLE',
                                    condition: {
                                        scope: '#/properties/customBackgroundColor',
                                        schema: {
                                            const: true
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        type: 'HorizontalLayout',
                        elements: [
                            {
                                type: 'Control',
                                scope: '#/properties/darkShadow'
                            },
                            {
                                type: 'Control',
                                scope: '#/properties/height'
                            }
                        ]
                    }
                ]
            }
        ]
    };
    function getBuilderSchema(columns) {
        return {
            dataSchema: {
                type: 'object',
                required: ['title'],
                properties: Object.assign({ title: {
                        type: 'string'
                    }, description: {
                        type: 'string'
                    } }, theme)
            },
            uiSchema: {
                type: 'Categorization',
                elements: [
                    {
                        type: 'Category',
                        label: 'General',
                        elements: [
                            {
                                type: 'VerticalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/title'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/description'
                                    }
                                ]
                            }
                        ]
                    },
                    themeUISchema
                ]
            },
            advanced: {
                dataSchema: {
                    type: 'object',
                    properties: {
                        options: visualizationOptions(columns)
                    }
                },
                uiSchema: {
                    type: 'VerticalLayout',
                    elements: [
                        {
                            type: 'HorizontalLayout',
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
                    ]
                }
            }
        };
    }
    exports.getBuilderSchema = getBuilderSchema;
    function getEmbedderSchema(columns) {
        return {
            dataSchema: {
                type: 'object',
                properties: Object.assign({ title: {
                        type: 'string',
                        required: true
                    }, description: {
                        type: 'string'
                    }, options: visualizationOptions(columns) }, theme)
            },
            uiSchema: {
                type: 'Categorization',
                elements: [
                    {
                        type: 'Category',
                        label: 'General',
                        elements: [
                            {
                                type: 'VerticalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/title'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/description'
                                    },
                                    {
                                        type: 'HorizontalLayout',
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
                                ]
                            }
                        ]
                    },
                    themeUISchema
                ]
            }
        };
    }
    exports.getEmbedderSchema = getEmbedderSchema;
});
define("@scom/scom-bar-chart/dataOptionsForm.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ScomBarChartDataOptionsForm = class ScomBarChartDataOptionsForm extends components_4.Module {
        constructor(parent, options) {
            super(parent, options);
        }
        get data() {
            return this._data;
        }
        set data(value) {
            this._data = value;
            this.renderUI();
        }
        async refreshFormData() {
            this._data = await this.formEl.getFormData();
            return this._data;
        }
        renderUI() {
            this.formEl.clearInnerHTML();
            this.formEl.jsonSchema = JSON.parse(this._dataSchema);
            this.formEl.uiSchema = JSON.parse(this._uiSchema);
            this.formEl.formOptions = {
                columnWidth: '100%',
                columnsPerRow: 1,
                confirmButtonOptions: {
                    hide: true
                }
            };
            this.formEl.renderForm();
            this.formEl.clearFormData();
            this.formEl.setFormData(this._data);
            const inputs = this.formEl.querySelectorAll('[scope]');
            for (let input of inputs) {
                const inputEl = input;
                inputEl.onChanged = this.onInputChanged;
            }
        }
        async onInputChanged() {
            const data = await this.formEl.getFormData();
            await this.onCustomInputChanged(data);
        }
        async onCustomInputChanged(data) {
        }
        async init() {
            super.init();
            this.onInputChanged = this.onInputChanged.bind(this);
            const dataSchema = this.getAttribute('dataSchema', true);
            this._dataSchema = dataSchema;
            const uiSchema = this.getAttribute('uiSchema', true);
            this._uiSchema = uiSchema;
            const options = this.getAttribute('options', true, {});
            this.data = {
                options
            };
        }
        render() {
            return (this.$render("i-panel", null,
                this.$render("i-vstack", { gap: '0.5rem' },
                    this.$render("i-panel", { id: 'pnlForm' },
                        this.$render("i-form", { id: 'formEl' })))));
        }
    };
    ScomBarChartDataOptionsForm = __decorate([
        components_4.customModule,
        (0, components_4.customElements)('i-scom-bar-chart-data-options-form')
    ], ScomBarChartDataOptionsForm);
    exports.default = ScomBarChartDataOptionsForm;
});
define("@scom/scom-bar-chart", ["require", "exports", "@ijstech/components", "@scom/scom-bar-chart/global/index.ts", "@scom/scom-bar-chart/index.css.ts", "@scom/scom-bar-chart/assets.ts", "@scom/scom-bar-chart/data.json.ts", "@scom/scom-chart-data-source-setup", "@scom/scom-bar-chart/formSchema.ts", "@scom/scom-bar-chart/dataOptionsForm.tsx"], function (require, exports, components_5, index_1, index_css_1, assets_1, data_json_1, scom_chart_data_source_setup_1, formSchema_1, dataOptionsForm_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_5.Styles.Theme.ThemeVars;
    const DefaultData = {
        dataSource: scom_chart_data_source_setup_1.DataSource.Dune,
        queryId: '',
        apiEndpoint: '',
        title: '',
        options: undefined,
        mode: scom_chart_data_source_setup_1.ModeType.LIVE
    };
    let ScomBarChart = class ScomBarChart extends components_5.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this.columnNames = [];
            this.chartData = [];
            this._data = DefaultData;
            this.tag = {};
            this.defaultEdit = true;
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            if (!(data === null || data === void 0 ? void 0 : data.mode))
                data.mode = scom_chart_data_source_setup_1.ModeType.LIVE;
            this._data = data;
            this.updateChartData();
        }
        getTag() {
            return this.tag;
        }
        async setTag(value, fromParent) {
            if (fromParent) {
                this.tag.parentFontColor = value.fontColor;
                this.tag.parentCustomFontColor = value.customFontColor;
                this.tag.parentBackgroundColor = value.backgroundColor;
                this.tag.parentCustomBackgroundColor = value.customBackgoundColor;
                this.tag.customWidgetsBackground = value.customWidgetsBackground;
                this.tag.widgetsBackground = value.widgetsBackground;
                this.tag.customWidgetsColor = value.customWidgetsColor;
                this.tag.widgetsColor = value.widgetsColor;
                this.onUpdateBlock();
                return;
            }
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
        _getActions(dataSchema, uiSchema, advancedSchema) {
            const builderSchema = (0, formSchema_1.getBuilderSchema)(this.columnNames);
            const actions = [
                {
                    name: 'Edit',
                    icon: 'edit',
                    command: (builder, userInputData) => {
                        let oldData = DefaultData;
                        let oldTag = {};
                        return {
                            execute: async () => {
                                oldData = JSON.parse(JSON.stringify(this._data));
                                const { title, description, options } = userInputData, themeSettings = __rest(userInputData, ["title", "description", "options"]);
                                const generalSettings = {
                                    title,
                                    description,
                                };
                                if (advancedSchema) {
                                    this._data = Object.assign(Object.assign({}, this._data), generalSettings);
                                }
                                else {
                                    this._data = Object.assign(Object.assign({}, generalSettings), { options });
                                }
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                                this.setData(this._data);
                                oldTag = JSON.parse(JSON.stringify(this.tag));
                                if (builder === null || builder === void 0 ? void 0 : builder.setTag)
                                    builder.setTag(themeSettings);
                                else
                                    this.setTag(themeSettings);
                            },
                            undo: () => {
                                if (advancedSchema)
                                    oldData = Object.assign(Object.assign({}, oldData), { options: this._data.options });
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(oldData);
                                this.setData(oldData);
                                this.tag = JSON.parse(JSON.stringify(oldTag));
                                if (builder === null || builder === void 0 ? void 0 : builder.setTag)
                                    builder.setTag(this.tag);
                                else
                                    this.setTag(this.tag);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: dataSchema,
                    userInputUISchema: uiSchema
                },
                {
                    name: 'Data',
                    icon: 'database',
                    command: (builder, userInputData) => {
                        let _oldData = DefaultData;
                        return {
                            execute: async () => {
                                _oldData = Object.assign({}, this._data);
                                if (userInputData === null || userInputData === void 0 ? void 0 : userInputData.mode)
                                    this._data.mode = userInputData === null || userInputData === void 0 ? void 0 : userInputData.mode;
                                if (userInputData === null || userInputData === void 0 ? void 0 : userInputData.file)
                                    this._data.file = userInputData === null || userInputData === void 0 ? void 0 : userInputData.file;
                                if (userInputData === null || userInputData === void 0 ? void 0 : userInputData.dataSource)
                                    this._data.dataSource = userInputData === null || userInputData === void 0 ? void 0 : userInputData.dataSource;
                                if (userInputData === null || userInputData === void 0 ? void 0 : userInputData.queryId)
                                    this._data.queryId = userInputData === null || userInputData === void 0 ? void 0 : userInputData.queryId;
                                if (userInputData === null || userInputData === void 0 ? void 0 : userInputData.apiEndpoint)
                                    this._data.apiEndpoint = userInputData === null || userInputData === void 0 ? void 0 : userInputData.apiEndpoint;
                                if ((userInputData === null || userInputData === void 0 ? void 0 : userInputData.options) !== undefined)
                                    this._data.options = userInputData.options;
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                                this.setData(this._data);
                            },
                            undo: () => {
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(_oldData);
                                this.setData(_oldData);
                            },
                            redo: () => { }
                        };
                    },
                    customUI: {
                        render: (data, onConfirm, onChange) => {
                            const vstack = new components_5.VStack(null, { gap: '1rem' });
                            const dataSourceSetup = new scom_chart_data_source_setup_1.default(null, Object.assign(Object.assign({}, this._data), { chartData: JSON.stringify(this.chartData), onCustomDataChanged: async (dataSourceSetupData) => {
                                    if (onChange) {
                                        onChange(true, Object.assign(Object.assign({}, this._data), dataSourceSetupData));
                                    }
                                } }));
                            const hstackBtnConfirm = new components_5.HStack(null, {
                                verticalAlignment: 'center',
                                horizontalAlignment: 'end'
                            });
                            const button = new components_5.Button(null, {
                                caption: 'Confirm',
                                width: 'auto',
                                height: 40,
                                font: { color: Theme.colors.primary.contrastText }
                            });
                            hstackBtnConfirm.append(button);
                            vstack.append(dataSourceSetup);
                            const dataOptionsForm = new dataOptionsForm_1.default(null, {
                                options: this._data.options,
                                dataSchema: JSON.stringify(advancedSchema),
                                uiSchema: JSON.stringify(builderSchema.advanced.uiSchema)
                            });
                            vstack.append(dataOptionsForm);
                            vstack.append(hstackBtnConfirm);
                            if (onChange) {
                                dataOptionsForm.onCustomInputChanged = async (optionsFormData) => {
                                    onChange(true, Object.assign(Object.assign(Object.assign({}, this._data), optionsFormData), dataSourceSetup.data));
                                };
                            }
                            button.onClick = async () => {
                                const { dataSource, file, mode } = dataSourceSetup.data;
                                if (mode === scom_chart_data_source_setup_1.ModeType.LIVE && !dataSource)
                                    return;
                                if (mode === scom_chart_data_source_setup_1.ModeType.SNAPSHOT && !(file === null || file === void 0 ? void 0 : file.cid))
                                    return;
                                if (onConfirm) {
                                    const optionsFormData = await dataOptionsForm.refreshFormData();
                                    onConfirm(true, Object.assign(Object.assign(Object.assign({}, this._data), optionsFormData), dataSourceSetup.data));
                                }
                            };
                            return vstack;
                        }
                    }
                }
            ];
            // if (advancedSchema) {
            //   const advanced = {
            //     name: 'Advanced',
            //     icon: 'sliders-h',
            //     command: (builder: any, userInputData: any) => {
            //       let _oldData: IBarChartOptions = {};
            //       return {
            //         execute: async () => {
            //           _oldData = JSON.parse(JSON.stringify(this._data?.options));
            //           if (userInputData?.options !== undefined) this._data.options = userInputData.options;
            //           if (builder?.setData) builder.setData(this._data);
            //           this.setData(this._data);
            //         },
            //         undo: () => {
            //           this._data.options = JSON.parse(JSON.stringify(_oldData));
            //           if (builder?.setData) builder.setData(this._data);
            //           this.setData(this._data);
            //         },
            //         redo: () => { }
            //       }
            //     },
            //     userInputDataSchema: advancedSchema,
            //     userInputUISchema: builderSchema.advanced.uiSchema as any
            //   }
            //   actions.push(advanced);
            // }
            return actions;
        }
        getConfigurators() {
            const self = this;
            return [
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getActions: () => {
                        const builderSchema = (0, formSchema_1.getBuilderSchema)(this.columnNames);
                        const dataSchema = builderSchema.dataSchema;
                        const uiSchema = builderSchema.uiSchema;
                        const advancedSchema = builderSchema.advanced.dataSchema;
                        return this._getActions(dataSchema, uiSchema, advancedSchema);
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
                        const embedderSchema = (0, formSchema_1.getEmbedderSchema)(this.columnNames);
                        const dataSchema = embedderSchema.dataSchema;
                        const uiSchema = embedderSchema.uiSchema;
                        return this._getActions(dataSchema, uiSchema);
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
            var _a;
            if (this.chartContainer) {
                this.chartContainer.style.boxShadow = ((_a = this.tag) === null || _a === void 0 ? void 0 : _a.darkShadow) ? '0 -2px 10px rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
            }
            const tags = this.tag || {};
            this.updateStyle('--custom-text-color', tags.customFontColor ? tags.fontColor : tags.customWidgetsColor ? tags.widgetsColor : tags.parentCustomFontColor ? tags.parentFontColor : '');
            this.updateStyle('--custom-background-color', tags.customBackgroundColor ? tags.backgroundColor : tags.customWidgetsBackground ? tags.widgetsBackground : tags.parentCustomBackgroundColor ? tags.parentBackgroundColor : '');
        }
        onUpdateBlock() {
            this.renderChart();
            this.updateTheme();
        }
        async updateChartData() {
            var _a;
            this.loadingElm.visible = true;
            if (((_a = this._data) === null || _a === void 0 ? void 0 : _a.mode) === scom_chart_data_source_setup_1.ModeType.SNAPSHOT)
                await this.renderSnapshotData();
            else
                await this.renderLiveData();
            this.loadingElm.visible = false;
        }
        async renderSnapshotData() {
            var _a;
            if ((_a = this._data.file) === null || _a === void 0 ? void 0 : _a.cid) {
                try {
                    const data = await (0, scom_chart_data_source_setup_1.fetchContentByCID)(this._data.file.cid);
                    if (data) {
                        const { metadata, rows } = data;
                        this.chartData = rows;
                        this.columnNames = (metadata === null || metadata === void 0 ? void 0 : metadata.column_names) || [];
                        this.onUpdateBlock();
                        return;
                    }
                }
                catch (_b) { }
            }
            this.chartData = [];
            this.columnNames = [];
            this.onUpdateBlock();
        }
        async renderLiveData() {
            const dataSource = this._data.dataSource;
            if (dataSource) {
                try {
                    const data = await (0, scom_chart_data_source_setup_1.callAPI)({
                        dataSource,
                        queryId: this._data.queryId,
                        apiEndpoint: this._data.apiEndpoint
                    });
                    if (data) {
                        const { metadata, rows } = data;
                        this.chartData = rows;
                        this.columnNames = (metadata === null || metadata === void 0 ? void 0 : metadata.column_names) || [];
                        this.onUpdateBlock();
                        return;
                    }
                }
                catch (_a) { }
            }
            this.chartData = [];
            this.columnNames = [];
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
            const { xColumn, yColumns, groupBy, seriesOptions, mergeDuplicateData, stacking, legend, showDataLabels, percentage, xAxis, yAxis, padding = {} } = options;
            const { key, type, timeFormat } = xColumn;
            let _legend = {
                show: legend === null || legend === void 0 ? void 0 : legend.show,
            };
            if (legend && legend.show) {
                if (legend.position) {
                    _legend[legend.position] = 'auto';
                    if (['left', 'right'].includes(legend.position)) {
                        _legend['orient'] = 'vertical';
                    }
                }
                if (legend.scroll) {
                    _legend['type'] = 'scroll';
                }
                if (legend.fontColor) {
                    _legend['textStyle'] = { color: legend.fontColor };
                }
            }
            let _series = [];
            let arr = this.chartData;
            const item = (arr && arr[0]) || {};
            if (groupBy && item[groupBy] !== undefined) {
                const group = (0, index_1.groupByCategory)(arr, groupBy, key, yColumns[0]);
                const times = (0, index_1.extractUniqueTimes)(arr, key);
                let groupData = {};
                const keys = Object.keys(group);
                keys.map(v => {
                    const _data = (0, index_1.concatUnique)(times, group[v]);
                    groupData[v] = (0, index_1.groupArrayByKey)(Object.keys(_data).map(m => [type === 'time' ? (0, components_5.moment)(m, timeFormat).toDate() : m, _data[m]]), mergeDuplicateData);
                });
                const isPercentage = percentage && groupData[keys[0]] && (0, index_1.isNumeric)(groupData[keys[0]][0][1]);
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
                                return (0, index_1.formatNumber)(params.value);
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
                    if (isPercentage && !(0, index_1.isNumeric)(arr[0][col])) {
                        isPercentage = false;
                    }
                    groupData[col] = (0, index_1.groupArrayByKey)(arr.map(v => [type === 'time' ? (0, components_5.moment)(v[key], timeFormat).toDate() : col, v[col]]), mergeDuplicateData);
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
                                return (0, index_1.formatNumber)(params.value);
                            }
                        } : undefined,
                        data: _data
                    };
                });
            }
            // let min = 0, max = 0;
            // const isSingle = _series.length === 1;
            // if (isSingle) {
            //   const arr = _series[0].data.filter(v => v[1] !== null).map(v => v[1]);
            //   min = Math.min(...arr);
            //   max = Math.max(...arr);
            //   const step = (max - min) / 5;
            //   min = min > step ? min - step : min;
            //   max += step;
            // }
            // const minInterval = (max - min) / 4;
            // const power = Math.pow(10, Math.floor(Math.log10(minInterval)));
            // const roundedInterval = Math.ceil(minInterval / power) * power;
            const gridPadding = {
                top: padding.top || 60,
                bottom: padding.bottom || 60,
                left: padding.left || '10%',
                right: padding.right || '10%'
            };
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
                            res += `<div style="display: flex; justify-content: space-between; gap: 10px"><span>${params[0].marker} ${params[0].seriesName}</span> ${params[0].value[1] === null ? '-' : percentage ? (0, index_1.formatNumber)(params[0].value[1], { percentValues: true }) : (0, index_1.formatNumberByFormat)(params[0].value[1], (yAxis === null || yAxis === void 0 ? void 0 : yAxis.labelFormat) ? yAxis.labelFormat : undefined)}</div>`;
                        }
                        else {
                            for (const param of params) {
                                if (param.value[1] !== null) {
                                    res += `<div style="display: flex; justify-content: space-between; gap: 10px"><span>${param.marker} ${param.seriesName}</span> ${percentage ? (0, index_1.formatNumber)(param.value[1], { percentValues: true }) : (0, index_1.formatNumberByFormat)(param.value[1], (yAxis === null || yAxis === void 0 ? void 0 : yAxis.labelFormat) ? yAxis.labelFormat : undefined)}</div>`;
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
                grid: Object.assign({ containLabel: true }, gridPadding),
                xAxis: {
                    type: type,
                    boundaryGap: false,
                    inverse: xAxis === null || xAxis === void 0 ? void 0 : xAxis.reverseValues,
                    name: (xAxis === null || xAxis === void 0 ? void 0 : xAxis.title) || '',
                    nameLocation: 'center',
                    nameGap: (xAxis === null || xAxis === void 0 ? void 0 : xAxis.title) ? 25 : 15,
                    nameTextStyle: {
                        fontWeight: 'bold',
                        color: xAxis === null || xAxis === void 0 ? void 0 : xAxis.fontColor
                    },
                    axisLabel: {
                        fontSize: 10,
                        color: xAxis === null || xAxis === void 0 ? void 0 : xAxis.fontColor,
                        hideOverlap: true,
                        formatter: (xAxis === null || xAxis === void 0 ? void 0 : xAxis.tickFormat) ? (value, index) => {
                            if (type === 'time') {
                                return (0, components_5.moment)(value).format(xAxis.tickFormat);
                            }
                            else {
                                if (isNaN(value))
                                    return value;
                                return (0, index_1.formatNumber)(value, { format: xAxis.tickFormat, decimals: 2 });
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
                        fontWeight: 'bold',
                        color: yAxis === null || yAxis === void 0 ? void 0 : yAxis.fontColor
                    },
                    position: (yAxis === null || yAxis === void 0 ? void 0 : yAxis.position) || 'left',
                    // min: isSingle ? min : undefined,
                    // max: isSingle ? max : undefined,
                    // interval: isSingle ? roundedInterval : undefined,
                    axisLabel: {
                        // showMinLabel: false,
                        // showMaxLabel: false,
                        fontSize: 10,
                        color: yAxis === null || yAxis === void 0 ? void 0 : yAxis.fontColor,
                        position: 'end',
                        formatter: (value, index) => {
                            return (0, index_1.formatNumber)(value, { format: yAxis === null || yAxis === void 0 ? void 0 : yAxis.tickFormat, decimals: 2, percentValues: percentage });
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
                darkShadow: false,
                height: 500
            });
            this.classList.add(index_css_1.chartStyle);
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
            return (this.$render("i-vstack", { id: "chartContainer", position: "relative", height: "100%", padding: { top: 10, bottom: 10, left: 10, right: 10 }, class: index_css_1.containerStyle },
                this.$render("i-vstack", { id: "loadingElm", class: "i-loading-overlay", visible: false },
                    this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                        this.$render("i-icon", { class: "i-loading-spinner_icon", image: { url: assets_1.default.fullPath('img/loading.svg'), width: 36, height: 36 } }))),
                this.$render("i-vstack", { id: "vStackInfo", width: "100%", maxWidth: "100%", margin: { left: 'auto', right: 'auto', bottom: 10 }, verticalAlignment: "center" },
                    this.$render("i-label", { id: "lbTitle", font: { bold: true }, class: index_css_1.textStyle }),
                    this.$render("i-label", { id: "lbDescription", margin: { top: 5 }, class: index_css_1.textStyle })),
                this.$render("i-panel", { id: "pnlChart", width: "100%", height: "inherit" })));
        }
    };
    ScomBarChart = __decorate([
        components_5.customModule,
        (0, components_5.customElements)('i-scom-bar-chart')
    ], ScomBarChart);
    exports.default = ScomBarChart;
});
