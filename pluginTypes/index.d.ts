/// <amd-module name="@scom/scom-bar-chart/global/interfaces.ts" />
declare module "@scom/scom-bar-chart/global/interfaces.ts" {
    export interface IBarChartOptions {
        xColumn?: {
            key: string;
            type: 'time' | 'category';
        };
        yColumns?: string[];
        groupBy?: string;
        seriesOptions?: {
            key: string;
            title?: string;
            color?: string;
        }[];
        stacking?: boolean;
        xAxis?: {
            title?: string;
            tickFormat?: string;
            reverseValues?: boolean;
        };
        yAxis?: {
            title?: string;
            tickFormat?: string;
            labelFormat?: string;
            position?: 'left' | 'right';
        };
        legend?: {
            show?: boolean;
            scroll?: boolean;
            position?: 'top' | 'bottom' | 'left' | 'right';
        };
        showDataLabels?: boolean;
        percentage?: boolean;
    }
    export enum ModeType {
        LIVE = "Live",
        SNAPSHOT = "Snapshot"
    }
    export interface IBarChartConfig {
        apiEndpoint?: string;
        title: string;
        description?: string;
        options: IBarChartOptions;
        file?: {
            cid?: string;
            name?: string;
        };
        mode?: ModeType;
    }
}
/// <amd-module name="@scom/scom-bar-chart/global/utils.ts" />
declare module "@scom/scom-bar-chart/global/utils.ts" {
    export const formatNumber: (num: number, options?: {
        format?: string;
        decimals?: number;
        percentValues?: boolean;
    }) => any;
    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;
    export const formatNumberWithSeparators: (value: number, precision?: number) => string;
    export const groupArrayByKey: (arr: [Date | string, string | number][]) => (string | number | Date)[][];
    export const groupByCategory: (data: {
        [key: string]: any;
    }[], category: string, xAxis: string, yAxis: string) => {
        [key: string]: any;
    };
    export const extractUniqueTimes: (data: {
        [key: string]: any;
    }[], keyValue: string) => {
        [key: string]: any;
    };
    export const concatUnique: (obj1: {
        [key: string]: any;
    }, obj2: {
        [key: string]: any;
    }) => {};
    export const callAPI: (apiEndpoint: string) => Promise<any>;
    export const readJsonFromFileExplorer: () => Promise<string>;
    export const fetchDataByCid: (ipfsCid: string) => Promise<any>;
}
/// <amd-module name="@scom/scom-bar-chart/global/index.ts" />
declare module "@scom/scom-bar-chart/global/index.ts" {
    export interface PageBlock {
        getData: () => any;
        setData: (data: any) => Promise<void>;
        getTag: () => any;
        setTag: (tag: any) => Promise<void>;
        validate?: () => boolean;
        defaultEdit?: boolean;
        tag?: any;
        readonly onEdit: () => Promise<void>;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        edit: () => Promise<void>;
        confirm: () => Promise<void>;
        discard: () => Promise<void>;
        config: () => Promise<void>;
    }
    export * from "@scom/scom-bar-chart/global/interfaces.ts";
    export * from "@scom/scom-bar-chart/global/utils.ts";
}
/// <amd-module name="@scom/scom-bar-chart/index.css.ts" />
declare module "@scom/scom-bar-chart/index.css.ts" {
    export const containerStyle: string;
    export const chartStyle: string;
}
/// <amd-module name="@scom/scom-bar-chart/assets.ts" />
declare module "@scom/scom-bar-chart/assets.ts" {
    function fullPath(path: string): string;
    const _default: {
        fullPath: typeof fullPath;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-bar-chart/data.json.ts" />
declare module "@scom/scom-bar-chart/data.json.ts" {
    const _default_1: {
        defaultBuilderData: {
            apiEndpoint: string;
            title: string;
            options: {
                xColumn: {
                    key: string;
                    type: string;
                };
                yColumns: string[];
                groupBy: string;
                stacking: boolean;
                legend: {
                    show: boolean;
                };
                seriesOptions: {
                    key: string;
                    color: string;
                }[];
                xAxis: {
                    title: string;
                    tickFormat: string;
                };
                yAxis: {
                    title: string;
                    position: string;
                    labelFormat: string;
                };
            };
        };
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-bar-chart/config/index.css.ts" />
declare module "@scom/scom-bar-chart/config/index.css.ts" {
    export const comboBoxStyle: string;
    export const uploadStyle: string;
}
/// <amd-module name="@scom/scom-bar-chart/config/interface.ts" />
declare module "@scom/scom-bar-chart/config/interface.ts" {
    import { ModeType } from "@scom/scom-bar-chart/global/index.ts";
    export interface IConfigData {
        mode: ModeType;
        apiEndpoint: string;
        file?: {
            cid?: string;
            name?: string;
        };
        chartData?: string;
    }
}
/// <amd-module name="@scom/scom-bar-chart/config/index.tsx" />
declare module "@scom/scom-bar-chart/config/index.tsx" {
    import { Module, Container, ControlElement } from '@ijstech/components';
    import "@scom/scom-bar-chart/config/index.css.ts";
    import { IConfigData } from "@scom/scom-bar-chart/config/interface.ts";
    import { ModeType } from "@scom/scom-bar-chart/global/index.ts";
    interface ScomImageCropElement extends ControlElement {
        mode?: ModeType;
        apiEndpoint: string;
        file?: any;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-bar-chart-data']: ScomImageCropElement;
            }
        }
    }
    export default class ScomBarChartData extends Module {
        private _data;
        private modeSelect;
        private endpointInput;
        private captureBtn;
        private uploadBtn;
        private downloadBtn;
        private mdAlert;
        private requiredLb;
        private fileNameLb;
        private pnlUpload;
        constructor(parent?: Container, options?: any);
        static create(options?: ScomImageCropElement, parent?: Container): Promise<ScomBarChartData>;
        get data(): IConfigData;
        set data(value: IConfigData);
        get mode(): ModeType;
        set mode(value: ModeType);
        get apiEndpoint(): string;
        set apiEndpoint(value: string);
        private renderUI;
        private onModeChanged;
        private updateMode;
        private updateChartData;
        private onUpdateEndpoint;
        private onCapture;
        private onUploadToIPFS;
        private onImportFile;
        private onExportFile;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-bar-chart" />
declare module "@scom/scom-bar-chart" {
    import { Module, ControlElement, Container, IDataSchema, VStack } from '@ijstech/components';
    import { IBarChartConfig } from "@scom/scom-bar-chart/global/index.ts";
    interface ScomBarChartElement extends ControlElement {
        lazyLoad?: boolean;
        data: IBarChartConfig;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-bar-chart']: ScomBarChartElement;
            }
        }
    }
    export default class ScomBarChart extends Module {
        private chartContainer;
        private vStackInfo;
        private pnlChart;
        private loadingElm;
        private lbTitle;
        private lbDescription;
        private chartData;
        private apiEndpoint;
        private mode;
        private _data;
        tag: any;
        defaultEdit: boolean;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        readonly onEdit: () => Promise<void>;
        static create(options?: ScomBarChartElement, parent?: Container): Promise<ScomBarChart>;
        constructor(parent?: Container, options?: ScomBarChartElement);
        private getData;
        private setData;
        private getTag;
        private setTag;
        private getPropertiesSchema;
        private getGeneralSchema;
        private getAdvanceSchema;
        private getThemeSchema;
        private _getActions;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => ({
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                customUI: {
                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void) => VStack;
                };
                userInputDataSchema?: undefined;
                userInputUISchema?: undefined;
            } | {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema: {
                    type: string;
                    elements: ({
                        type: string;
                        scope: string;
                        options?: undefined;
                    } | {
                        type: string;
                        scope: string;
                        options: {
                            detail: {
                                type: string;
                            };
                        };
                    })[];
                };
                customUI?: undefined;
            } | {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                customUI?: undefined;
                userInputUISchema?: undefined;
            })[];
            getData: any;
            setData: (data: IBarChartConfig) => Promise<void>;
            getTag: any;
            setTag: any;
            getLinkParams?: undefined;
            setLinkParams?: undefined;
        } | {
            name: string;
            target: string;
            getActions: () => ({
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                customUI: {
                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void) => VStack;
                };
                userInputDataSchema?: undefined;
                userInputUISchema?: undefined;
            } | {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema: {
                    type: string;
                    elements: ({
                        type: string;
                        scope: string;
                        options?: undefined;
                    } | {
                        type: string;
                        scope: string;
                        options: {
                            detail: {
                                type: string;
                            };
                        };
                    })[];
                };
                customUI?: undefined;
            } | {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                customUI?: undefined;
                userInputUISchema?: undefined;
            })[];
            getLinkParams: () => {
                data: string;
            };
            setLinkParams: (params: any) => Promise<void>;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        })[];
        private updateStyle;
        private updateTheme;
        private onUpdateBlock;
        private updateChartData;
        private renderSnapshotData;
        private renderLiveData;
        private renderChart;
        private resizeChart;
        init(): Promise<void>;
        render(): any;
    }
}
