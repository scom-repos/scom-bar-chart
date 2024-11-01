/// <amd-module name="@scom/scom-bar-chart/interfaces.ts" />
declare module "@scom/scom-bar-chart/interfaces.ts" {
    import { ModeType } from "@scom/scom-chart-data-source-setup";
    export interface IBarChartOptions {
        xColumn?: {
            key: string;
            type: 'time' | 'category';
            timeFormat?: string;
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
            fontColor?: string;
            tickFormat?: string;
            reverseValues?: boolean;
        };
        yAxis?: {
            title?: string;
            fontColor?: string;
            tickFormat?: string;
            labelFormat?: string;
            position?: 'left' | 'right';
        };
        legend?: {
            show?: boolean;
            fontColor?: string;
            scroll?: boolean;
            position?: 'top' | 'bottom' | 'left' | 'right';
        };
        padding?: {
            top?: number;
            bottom?: number;
            left?: number;
            right?: number;
        };
        mergeDuplicateData?: boolean;
        showDataLabels?: boolean;
        percentage?: boolean;
    }
    export interface IBarChartConfig {
        dataSource: string;
        queryId?: string;
        apiEndpoint?: string;
        title: string;
        description?: string;
        options: IBarChartOptions;
        file?: {
            cid: string;
            name: string;
        };
        mode: ModeType;
    }
}
/// <amd-module name="@scom/scom-bar-chart/data.json.ts" />
declare module "@scom/scom-bar-chart/data.json.ts" {
    const _default: {
        defaultBuilderData: {
            mode: string;
            dataSource: string;
            queryId: string;
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
    export default _default;
}
/// <amd-module name="@scom/scom-bar-chart/formSchema.ts" />
declare module "@scom/scom-bar-chart/formSchema.ts" {
    export function getBuilderSchema(columns: string[]): {
        dataSchema: {
            type: string;
            required: string[];
            properties: {
                darkShadow: {
                    type: string;
                };
                customFontColor: {
                    type: string;
                };
                fontColor: {
                    type: string;
                    format: string;
                };
                customBackgroundColor: {
                    type: string;
                };
                backgroundColor: {
                    type: string;
                    format: string;
                };
                height: {
                    type: string;
                };
                title: {
                    type: string;
                };
                description: {
                    type: string;
                };
            };
        };
        uiSchema: {
            type: string;
            elements: ({
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        elements: ({
                            type: string;
                            scope: string;
                            rule?: undefined;
                        } | {
                            type: string;
                            scope: string;
                            rule: {
                                effect: string;
                                condition: {
                                    scope: string;
                                    schema: {
                                        const: boolean;
                                    };
                                };
                            };
                        })[];
                    }[];
                }[];
            } | {
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                    }[];
                }[];
            })[];
        };
        advanced: {
            dataSchema: {
                type: string;
                properties: {
                    options: {
                        type: string;
                        title: string;
                        properties: {
                            xColumn: {
                                type: string;
                                title: string;
                                required: boolean;
                                properties: {
                                    key: {
                                        type: string;
                                        enum: string[];
                                        required: boolean;
                                    };
                                    type: {
                                        type: string;
                                        enum: string[];
                                        required: boolean;
                                    };
                                    timeFormat: {
                                        type: string;
                                    };
                                };
                            };
                            yColumns: {
                                type: string;
                                title: string;
                                required: boolean;
                                items: {
                                    type: string;
                                    enum: string[];
                                };
                            };
                            groupBy: {
                                type: string;
                                enum: string[];
                            };
                            mergeDuplicateData: {
                                type: string;
                            };
                            stacking: {
                                type: string;
                            };
                            legend: {
                                type: string;
                                title: string;
                                properties: {
                                    show: {
                                        type: string;
                                    };
                                    fontColor: {
                                        type: string;
                                        format: string;
                                    };
                                    scroll: {
                                        type: string;
                                    };
                                    position: {
                                        type: string;
                                        enum: string[];
                                    };
                                };
                            };
                            showDataLabels: {
                                type: string;
                            };
                            percentage: {
                                type: string;
                            };
                            padding: {
                                type: string;
                                title: string;
                                properties: {
                                    top: {
                                        type: string;
                                    };
                                    bottom: {
                                        type: string;
                                    };
                                    left: {
                                        type: string;
                                    };
                                    right: {
                                        type: string;
                                    };
                                };
                            };
                            xAxis: {
                                type: string;
                                properties: {
                                    title: {
                                        type: string;
                                    };
                                    fontColor: {
                                        type: string;
                                        format: string;
                                    };
                                    tickFormat: {
                                        type: string;
                                    };
                                    reverseValues: {
                                        type: string;
                                    };
                                };
                            };
                            yAxis: {
                                type: string;
                                properties: {
                                    title: {
                                        type: string;
                                    };
                                    fontColor: {
                                        type: string;
                                        format: string;
                                    };
                                    tickFormat: {
                                        type: string;
                                    };
                                    labelFormat: {
                                        type: string;
                                    };
                                    position: {
                                        type: string;
                                        enum: string[];
                                    };
                                };
                            };
                            seriesOptions: {
                                type: string;
                                items: {
                                    type: string;
                                    properties: {
                                        key: {
                                            type: string;
                                            required: boolean;
                                        };
                                        title: {
                                            type: string;
                                        };
                                        color: {
                                            type: string;
                                            format: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            uiSchema: {
                type: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                        options: {
                            detail: {
                                type: string;
                            };
                        };
                    }[];
                }[];
            };
        };
    };
    export function getEmbedderSchema(columns: string[]): {
        dataSchema: {
            type: string;
            properties: {
                darkShadow: {
                    type: string;
                };
                customFontColor: {
                    type: string;
                };
                fontColor: {
                    type: string;
                    format: string;
                };
                customBackgroundColor: {
                    type: string;
                };
                backgroundColor: {
                    type: string;
                    format: string;
                };
                height: {
                    type: string;
                };
                title: {
                    type: string;
                    required: boolean;
                };
                description: {
                    type: string;
                };
                options: {
                    type: string;
                    title: string;
                    properties: {
                        xColumn: {
                            type: string;
                            title: string;
                            required: boolean;
                            properties: {
                                key: {
                                    type: string;
                                    enum: string[];
                                    required: boolean;
                                };
                                type: {
                                    type: string;
                                    enum: string[];
                                    required: boolean;
                                };
                                timeFormat: {
                                    type: string;
                                };
                            };
                        };
                        yColumns: {
                            type: string;
                            title: string;
                            required: boolean;
                            items: {
                                type: string;
                                enum: string[];
                            };
                        };
                        groupBy: {
                            type: string;
                            enum: string[];
                        };
                        mergeDuplicateData: {
                            type: string;
                        };
                        stacking: {
                            type: string;
                        };
                        legend: {
                            type: string;
                            title: string;
                            properties: {
                                show: {
                                    type: string;
                                };
                                fontColor: {
                                    type: string;
                                    format: string;
                                };
                                scroll: {
                                    type: string;
                                };
                                position: {
                                    type: string;
                                    enum: string[];
                                };
                            };
                        };
                        showDataLabels: {
                            type: string;
                        };
                        percentage: {
                            type: string;
                        };
                        padding: {
                            type: string;
                            title: string;
                            properties: {
                                top: {
                                    type: string;
                                };
                                bottom: {
                                    type: string;
                                };
                                left: {
                                    type: string;
                                };
                                right: {
                                    type: string;
                                };
                            };
                        };
                        xAxis: {
                            type: string;
                            properties: {
                                title: {
                                    type: string;
                                };
                                fontColor: {
                                    type: string;
                                    format: string;
                                };
                                tickFormat: {
                                    type: string;
                                };
                                reverseValues: {
                                    type: string;
                                };
                            };
                        };
                        yAxis: {
                            type: string;
                            properties: {
                                title: {
                                    type: string;
                                };
                                fontColor: {
                                    type: string;
                                    format: string;
                                };
                                tickFormat: {
                                    type: string;
                                };
                                labelFormat: {
                                    type: string;
                                };
                                position: {
                                    type: string;
                                    enum: string[];
                                };
                            };
                        };
                        seriesOptions: {
                            type: string;
                            items: {
                                type: string;
                                properties: {
                                    key: {
                                        type: string;
                                        required: boolean;
                                    };
                                    title: {
                                        type: string;
                                    };
                                    color: {
                                        type: string;
                                        format: string;
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        uiSchema: {
            type: string;
            elements: ({
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        elements: ({
                            type: string;
                            scope: string;
                            rule?: undefined;
                        } | {
                            type: string;
                            scope: string;
                            rule: {
                                effect: string;
                                condition: {
                                    scope: string;
                                    schema: {
                                        const: boolean;
                                    };
                                };
                            };
                        })[];
                    }[];
                }[];
            } | {
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: ({
                        type: string;
                        scope: string;
                        elements?: undefined;
                    } | {
                        type: string;
                        elements: {
                            type: string;
                            scope: string;
                            options: {
                                detail: {
                                    type: string;
                                };
                            };
                        }[];
                        scope?: undefined;
                    })[];
                }[];
            })[];
        };
    };
}
/// <amd-module name="@scom/scom-bar-chart/dts/index.ts" />
declare module "@scom/scom-bar-chart/dts/index.ts" {
    const _default_1: "/// <amd-module name=\"@scom/scom-bar-chart/interfaces.ts\" />\ndeclare module \"@scom/scom-bar-chart/interfaces.ts\" {\n    import { ModeType } from \"@scom/scom-chart-data-source-setup\";\n    export interface IBarChartOptions {\n        xColumn?: {\n            key: string;\n            type: 'time' | 'category';\n            timeFormat?: string;\n        };\n        yColumns?: string[];\n        groupBy?: string;\n        seriesOptions?: {\n            key: string;\n            title?: string;\n            color?: string;\n        }[];\n        stacking?: boolean;\n        xAxis?: {\n            title?: string;\n            fontColor?: string;\n            tickFormat?: string;\n            reverseValues?: boolean;\n        };\n        yAxis?: {\n            title?: string;\n            fontColor?: string;\n            tickFormat?: string;\n            labelFormat?: string;\n            position?: 'left' | 'right';\n        };\n        legend?: {\n            show?: boolean;\n            fontColor?: string;\n            scroll?: boolean;\n            position?: 'top' | 'bottom' | 'left' | 'right';\n        };\n        padding?: {\n            top?: number;\n            bottom?: number;\n            left?: number;\n            right?: number;\n        };\n        mergeDuplicateData?: boolean;\n        showDataLabels?: boolean;\n        percentage?: boolean;\n    }\n    export interface IBarChartConfig {\n        dataSource: string;\n        queryId?: string;\n        apiEndpoint?: string;\n        title: string;\n        description?: string;\n        options: IBarChartOptions;\n        file?: {\n            cid: string;\n            name: string;\n        };\n        mode: ModeType;\n    }\n}\n/// <amd-module name=\"@scom/scom-bar-chart/data.json.ts\" />\ndeclare module \"@scom/scom-bar-chart/data.json.ts\" {\n    const _default: {\n        defaultBuilderData: {\n            mode: string;\n            dataSource: string;\n            queryId: string;\n            title: string;\n            options: {\n                xColumn: {\n                    key: string;\n                    type: string;\n                };\n                yColumns: string[];\n                groupBy: string;\n                stacking: boolean;\n                legend: {\n                    show: boolean;\n                };\n                seriesOptions: {\n                    key: string;\n                    color: string;\n                }[];\n                xAxis: {\n                    title: string;\n                    tickFormat: string;\n                };\n                yAxis: {\n                    title: string;\n                    position: string;\n                    labelFormat: string;\n                };\n            };\n        };\n    };\n    export default _default;\n}\n/// <amd-module name=\"@scom/scom-bar-chart/formSchema.ts\" />\ndeclare module \"@scom/scom-bar-chart/formSchema.ts\" {\n    export function getBuilderSchema(columns: string[]): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                    }[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n        advanced: {\n            dataSchema: {\n                type: string;\n                properties: {\n                    options: {\n                        type: string;\n                        title: string;\n                        properties: {\n                            xColumn: {\n                                type: string;\n                                title: string;\n                                required: boolean;\n                                properties: {\n                                    key: {\n                                        type: string;\n                                        enum: string[];\n                                        required: boolean;\n                                    };\n                                    type: {\n                                        type: string;\n                                        enum: string[];\n                                        required: boolean;\n                                    };\n                                    timeFormat: {\n                                        type: string;\n                                    };\n                                };\n                            };\n                            yColumns: {\n                                type: string;\n                                title: string;\n                                required: boolean;\n                                items: {\n                                    type: string;\n                                    enum: string[];\n                                };\n                            };\n                            groupBy: {\n                                type: string;\n                                enum: string[];\n                            };\n                            mergeDuplicateData: {\n                                type: string;\n                            };\n                            stacking: {\n                                type: string;\n                            };\n                            legend: {\n                                type: string;\n                                title: string;\n                                properties: {\n                                    show: {\n                                        type: string;\n                                    };\n                                    fontColor: {\n                                        type: string;\n                                        format: string;\n                                    };\n                                    scroll: {\n                                        type: string;\n                                    };\n                                    position: {\n                                        type: string;\n                                        enum: string[];\n                                    };\n                                };\n                            };\n                            showDataLabels: {\n                                type: string;\n                            };\n                            percentage: {\n                                type: string;\n                            };\n                            padding: {\n                                type: string;\n                                title: string;\n                                properties: {\n                                    top: {\n                                        type: string;\n                                    };\n                                    bottom: {\n                                        type: string;\n                                    };\n                                    left: {\n                                        type: string;\n                                    };\n                                    right: {\n                                        type: string;\n                                    };\n                                };\n                            };\n                            xAxis: {\n                                type: string;\n                                properties: {\n                                    title: {\n                                        type: string;\n                                    };\n                                    fontColor: {\n                                        type: string;\n                                        format: string;\n                                    };\n                                    tickFormat: {\n                                        type: string;\n                                    };\n                                    reverseValues: {\n                                        type: string;\n                                    };\n                                };\n                            };\n                            yAxis: {\n                                type: string;\n                                properties: {\n                                    title: {\n                                        type: string;\n                                    };\n                                    fontColor: {\n                                        type: string;\n                                        format: string;\n                                    };\n                                    tickFormat: {\n                                        type: string;\n                                    };\n                                    labelFormat: {\n                                        type: string;\n                                    };\n                                    position: {\n                                        type: string;\n                                        enum: string[];\n                                    };\n                                };\n                            };\n                            seriesOptions: {\n                                type: string;\n                                items: {\n                                    type: string;\n                                    properties: {\n                                        key: {\n                                            type: string;\n                                            required: boolean;\n                                        };\n                                        title: {\n                                            type: string;\n                                        };\n                                        color: {\n                                            type: string;\n                                            format: string;\n                                        };\n                                    };\n                                };\n                            };\n                        };\n                    };\n                };\n            };\n            uiSchema: {\n                type: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                        options: {\n                            detail: {\n                                type: string;\n                            };\n                        };\n                    }[];\n                }[];\n            };\n        };\n    };\n    export function getEmbedderSchema(columns: string[]): {\n        dataSchema: {\n            type: string;\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                    required: boolean;\n                };\n                description: {\n                    type: string;\n                };\n                options: {\n                    type: string;\n                    title: string;\n                    properties: {\n                        xColumn: {\n                            type: string;\n                            title: string;\n                            required: boolean;\n                            properties: {\n                                key: {\n                                    type: string;\n                                    enum: string[];\n                                    required: boolean;\n                                };\n                                type: {\n                                    type: string;\n                                    enum: string[];\n                                    required: boolean;\n                                };\n                                timeFormat: {\n                                    type: string;\n                                };\n                            };\n                        };\n                        yColumns: {\n                            type: string;\n                            title: string;\n                            required: boolean;\n                            items: {\n                                type: string;\n                                enum: string[];\n                            };\n                        };\n                        groupBy: {\n                            type: string;\n                            enum: string[];\n                        };\n                        mergeDuplicateData: {\n                            type: string;\n                        };\n                        stacking: {\n                            type: string;\n                        };\n                        legend: {\n                            type: string;\n                            title: string;\n                            properties: {\n                                show: {\n                                    type: string;\n                                };\n                                fontColor: {\n                                    type: string;\n                                    format: string;\n                                };\n                                scroll: {\n                                    type: string;\n                                };\n                                position: {\n                                    type: string;\n                                    enum: string[];\n                                };\n                            };\n                        };\n                        showDataLabels: {\n                            type: string;\n                        };\n                        percentage: {\n                            type: string;\n                        };\n                        padding: {\n                            type: string;\n                            title: string;\n                            properties: {\n                                top: {\n                                    type: string;\n                                };\n                                bottom: {\n                                    type: string;\n                                };\n                                left: {\n                                    type: string;\n                                };\n                                right: {\n                                    type: string;\n                                };\n                            };\n                        };\n                        xAxis: {\n                            type: string;\n                            properties: {\n                                title: {\n                                    type: string;\n                                };\n                                fontColor: {\n                                    type: string;\n                                    format: string;\n                                };\n                                tickFormat: {\n                                    type: string;\n                                };\n                                reverseValues: {\n                                    type: string;\n                                };\n                            };\n                        };\n                        yAxis: {\n                            type: string;\n                            properties: {\n                                title: {\n                                    type: string;\n                                };\n                                fontColor: {\n                                    type: string;\n                                    format: string;\n                                };\n                                tickFormat: {\n                                    type: string;\n                                };\n                                labelFormat: {\n                                    type: string;\n                                };\n                                position: {\n                                    type: string;\n                                    enum: string[];\n                                };\n                            };\n                        };\n                        seriesOptions: {\n                            type: string;\n                            items: {\n                                type: string;\n                                properties: {\n                                    key: {\n                                        type: string;\n                                        required: boolean;\n                                    };\n                                    title: {\n                                        type: string;\n                                    };\n                                    color: {\n                                        type: string;\n                                        format: string;\n                                    };\n                                };\n                            };\n                        };\n                    };\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                    }[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        scope: string;\n                        elements?: undefined;\n                    } | {\n                        type: string;\n                        elements: {\n                            type: string;\n                            scope: string;\n                            options: {\n                                detail: {\n                                    type: string;\n                                };\n                            };\n                        }[];\n                        scope?: undefined;\n                    })[];\n                }[];\n            })[];\n        };\n    };\n}\n/// <amd-module name=\"@scom/scom-bar-chart/dts/index.ts\" />\ndeclare module \"@scom/scom-bar-chart/dts/index.ts\" {\n    const _default_1: \"/// <amd-module name=\"@scom/scom-bar-chart/global/interfaces.ts\" />\ndeclare module \"@scom/scom-bar-chart/global/interfaces.ts\" {\n    import { BigNumber } from \"@ijstech/eth-wallet\";\n    import { ModeType } from \"@scom/scom-chart-data-source-setup\";\n    export interface IBarChartOptions {\n        xColumn?: {\n            key: string;\n            type: 'time' | 'category';\n            timeFormat?: string;\n        };\n        yColumns?: string[];\n        groupBy?: string;\n        seriesOptions?: {\n            key: string;\n            title?: string;\n            color?: string;\n        }[];\n        stacking?: boolean;\n        xAxis?: {\n            title?: string;\n            fontColor?: string;\n            tickFormat?: string;\n            reverseValues?: boolean;\n        };\n        yAxis?: {\n            title?: string;\n            fontColor?: string;\n            tickFormat?: string;\n            labelFormat?: string;\n            position?: 'left' | 'right';\n        };\n        legend?: {\n            show?: boolean;\n            fontColor?: string;\n            scroll?: boolean;\n            position?: 'top' | 'bottom' | 'left' | 'right';\n        };\n        padding?: {\n            top?: number;\n            bottom?: number;\n            left?: number;\n            right?: number;\n        };\n        mergeDuplicateData?: boolean;\n        showDataLabels?: boolean;\n        percentage?: boolean;\n    }\n    export interface IBarChartConfig {\n        dataSource: string;\n        queryId?: string;\n        apiEndpoint?: string;\n        title: string;\n        description?: string;\n        options: IBarChartOptions;\n        file?: {\n            cid: string;\n            name: string;\n        };\n        mode: ModeType;\n    }\n    export interface IFormatNumberOptions {\n        precision?: number;\n        roundingMode?: BigNumber.RoundingMode;\n    }\n}\n/// <amd-module name=\"@scom/scom-bar-chart/global/utils.ts\" />\ndeclare module \"@scom/scom-bar-chart/global/utils.ts\" {\n    import { BigNumber } from '@ijstech/eth-wallet';\n    export const isNumeric: (value: string | number | BigNumber) => boolean;\n    export const formatNumber: (num: number, options?: {\n        format?: string;\n        decimals?: number;\n        percentValues?: boolean;\n    }) => any;\n    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;\n    export const groupArrayByKey: (arr: [Date | string, string | number][], isMerged?: boolean) => (string | number | Date)[][];\n    export const groupByCategory: (data: {\n        [key: string]: any;\n    }[], category: string, xAxis: string, yAxis: string) => {\n        [key: string]: any;\n    };\n    export const extractUniqueTimes: (data: {\n        [key: string]: any;\n    }[], keyValue: string) => {\n        [key: string]: any;\n    };\n    export const concatUnique: (obj1: {\n        [key: string]: any;\n    }, obj2: {\n        [key: string]: any;\n    }) => {};\n}\n/// <amd-module name=\"@scom/scom-bar-chart/global/index.ts\" />\ndeclare module \"@scom/scom-bar-chart/global/index.ts\" {\n    export * from \"@scom/scom-bar-chart/global/interfaces.ts\";\n    export * from \"@scom/scom-bar-chart/global/utils.ts\";\n}\n/// <amd-module name=\"@scom/scom-bar-chart/index.css.ts\" />\ndeclare module \"@scom/scom-bar-chart/index.css.ts\" {\n    export const containerStyle: string;\n    export const textStyle: string;\n    export const chartStyle: string;\n}\n/// <amd-module name=\"@scom/scom-bar-chart/assets.ts\" />\ndeclare module \"@scom/scom-bar-chart/assets.ts\" {\n    function fullPath(path: string): string;\n    const _default: {\n        fullPath: typeof fullPath;\n    };\n    export default _default;\n}\n/// <amd-module name=\"@scom/scom-bar-chart/data.json.ts\" />\ndeclare module \"@scom/scom-bar-chart/data.json.ts\" {\n    const _default_1: {\n        defaultBuilderData: {\n            mode: string;\n            dataSource: string;\n            queryId: string;\n            title: string;\n            options: {\n                xColumn: {\n                    key: string;\n                    type: string;\n                };\n                yColumns: string[];\n                groupBy: string;\n                stacking: boolean;\n                legend: {\n                    show: boolean;\n                };\n                seriesOptions: {\n                    key: string;\n                    color: string;\n                }[];\n                xAxis: {\n                    title: string;\n                    tickFormat: string;\n                };\n                yAxis: {\n                    title: string;\n                    position: string;\n                    labelFormat: string;\n                };\n            };\n        };\n    };\n    export default _default_1;\n}\n/// <amd-module name=\"@scom/scom-bar-chart/formSchema.ts\" />\ndeclare module \"@scom/scom-bar-chart/formSchema.ts\" {\n    export function getBuilderSchema(columns: string[]): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                    }[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n        advanced: {\n            dataSchema: {\n                type: string;\n                properties: {\n                    options: {\n                        type: string;\n                        title: string;\n                        properties: {\n                            xColumn: {\n                                type: string;\n                                title: string;\n                                required: boolean;\n                                properties: {\n                                    key: {\n                                        type: string;\n                                        enum: string[];\n                                        required: boolean;\n                                    };\n                                    type: {\n                                        type: string;\n                                        enum: string[];\n                                        required: boolean;\n                                    };\n                                    timeFormat: {\n                                        type: string;\n                                    };\n                                };\n                            };\n                            yColumns: {\n                                type: string;\n                                title: string;\n                                required: boolean;\n                                items: {\n                                    type: string;\n                                    enum: string[];\n                                };\n                            };\n                            groupBy: {\n                                type: string;\n                                enum: string[];\n                            };\n                            mergeDuplicateData: {\n                                type: string;\n                            };\n                            stacking: {\n                                type: string;\n                            };\n                            legend: {\n                                type: string;\n                                title: string;\n                                properties: {\n                                    show: {\n                                        type: string;\n                                    };\n                                    fontColor: {\n                                        type: string;\n                                        format: string;\n                                    };\n                                    scroll: {\n                                        type: string;\n                                    };\n                                    position: {\n                                        type: string;\n                                        enum: string[];\n                                    };\n                                };\n                            };\n                            showDataLabels: {\n                                type: string;\n                            };\n                            percentage: {\n                                type: string;\n                            };\n                            padding: {\n                                type: string;\n                                title: string;\n                                properties: {\n                                    top: {\n                                        type: string;\n                                    };\n                                    bottom: {\n                                        type: string;\n                                    };\n                                    left: {\n                                        type: string;\n                                    };\n                                    right: {\n                                        type: string;\n                                    };\n                                };\n                            };\n                            xAxis: {\n                                type: string;\n                                properties: {\n                                    title: {\n                                        type: string;\n                                    };\n                                    fontColor: {\n                                        type: string;\n                                        format: string;\n                                    };\n                                    tickFormat: {\n                                        type: string;\n                                    };\n                                    reverseValues: {\n                                        type: string;\n                                    };\n                                };\n                            };\n                            yAxis: {\n                                type: string;\n                                properties: {\n                                    title: {\n                                        type: string;\n                                    };\n                                    fontColor: {\n                                        type: string;\n                                        format: string;\n                                    };\n                                    tickFormat: {\n                                        type: string;\n                                    };\n                                    labelFormat: {\n                                        type: string;\n                                    };\n                                    position: {\n                                        type: string;\n                                        enum: string[];\n                                    };\n                                };\n                            };\n                            seriesOptions: {\n                                type: string;\n                                items: {\n                                    type: string;\n                                    properties: {\n                                        key: {\n                                            type: string;\n                                            required: boolean;\n                                        };\n                                        title: {\n                                            type: string;\n                                        };\n                                        color: {\n                                            type: string;\n                                            format: string;\n                                        };\n                                    };\n                                };\n                            };\n                        };\n                    };\n                };\n            };\n            uiSchema: {\n                type: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                        options: {\n                            detail: {\n                                type: string;\n                            };\n                        };\n                    }[];\n                }[];\n            };\n        };\n    };\n    export function getEmbedderSchema(columns: string[]): {\n        dataSchema: {\n            type: string;\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                    required: boolean;\n                };\n                description: {\n                    type: string;\n                };\n                options: {\n                    type: string;\n                    title: string;\n                    properties: {\n                        xColumn: {\n                            type: string;\n                            title: string;\n                            required: boolean;\n                            properties: {\n                                key: {\n                                    type: string;\n                                    enum: string[];\n                                    required: boolean;\n                                };\n                                type: {\n                                    type: string;\n                                    enum: string[];\n                                    required: boolean;\n                                };\n                                timeFormat: {\n                                    type: string;\n                                };\n                            };\n                        };\n                        yColumns: {\n                            type: string;\n                            title: string;\n                            required: boolean;\n                            items: {\n                                type: string;\n                                enum: string[];\n                            };\n                        };\n                        groupBy: {\n                            type: string;\n                            enum: string[];\n                        };\n                        mergeDuplicateData: {\n                            type: string;\n                        };\n                        stacking: {\n                            type: string;\n                        };\n                        legend: {\n                            type: string;\n                            title: string;\n                            properties: {\n                                show: {\n                                    type: string;\n                                };\n                                fontColor: {\n                                    type: string;\n                                    format: string;\n                                };\n                                scroll: {\n                                    type: string;\n                                };\n                                position: {\n                                    type: string;\n                                    enum: string[];\n                                };\n                            };\n                        };\n                        showDataLabels: {\n                            type: string;\n                        };\n                        percentage: {\n                            type: string;\n                        };\n                        padding: {\n                            type: string;\n                            title: string;\n                            properties: {\n                                top: {\n                                    type: string;\n                                };\n                                bottom: {\n                                    type: string;\n                                };\n                                left: {\n                                    type: string;\n                                };\n                                right: {\n                                    type: string;\n                                };\n                            };\n                        };\n                        xAxis: {\n                            type: string;\n                            properties: {\n                                title: {\n                                    type: string;\n                                };\n                                fontColor: {\n                                    type: string;\n                                    format: string;\n                                };\n                                tickFormat: {\n                                    type: string;\n                                };\n                                reverseValues: {\n                                    type: string;\n                                };\n                            };\n                        };\n                        yAxis: {\n                            type: string;\n                            properties: {\n                                title: {\n                                    type: string;\n                                };\n                                fontColor: {\n                                    type: string;\n                                    format: string;\n                                };\n                                tickFormat: {\n                                    type: string;\n                                };\n                                labelFormat: {\n                                    type: string;\n                                };\n                                position: {\n                                    type: string;\n                                    enum: string[];\n                                };\n                            };\n                        };\n                        seriesOptions: {\n                            type: string;\n                            items: {\n                                type: string;\n                                properties: {\n                                    key: {\n                                        type: string;\n                                        required: boolean;\n                                    };\n                                    title: {\n                                        type: string;\n                                    };\n                                    color: {\n                                        type: string;\n                                        format: string;\n                                    };\n                                };\n                            };\n                        };\n                    };\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                    }[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        scope: string;\n                        elements?: undefined;\n                    } | {\n                        type: string;\n                        elements: {\n                            type: string;\n                            scope: string;\n                            options: {\n                                detail: {\n                                    type: string;\n                                };\n                            };\n                        }[];\n                        scope?: undefined;\n                    })[];\n                }[];\n            })[];\n        };\n    };\n}\n/// <amd-module name=\"@scom/scom-bar-chart/dataOptionsForm.tsx\" />\ndeclare module \"@scom/scom-bar-chart/dataOptionsForm.tsx\" {\n    import { Module, ControlElement, Container } from '@ijstech/components';\n    interface IData {\n        options: any;\n    }\n    interface ScomBarChartDataOptionsFormElement extends ControlElement {\n        dataSchema?: string;\n        uiSchema?: string;\n        options: any;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                [\"i-scom-bar-chart-data-options-form\"]: ScomBarChartDataOptionsFormElement;\n            }\n        }\n    }\n    export default class ScomBarChartDataOptionsForm extends Module {\n        private formEl;\n        private _dataSchema;\n        private _uiSchema;\n        private _data;\n        constructor(parent?: Container, options?: any);\n        get data(): IData;\n        set data(value: IData);\n        refreshFormData(): Promise<IData>;\n        private renderUI;\n        private onInputChanged;\n        onCustomInputChanged(data: IData): Promise<void>;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n/// <amd-module name=\"@scom/scom-bar-chart/dts/index.ts\" />\ndeclare module \"@scom/scom-bar-chart/dts/index.ts\" {\n    const _default_2: \"/// <amd-module name=\"@scom/scom-bar-chart/global/interfaces.ts\" />\ndeclare module \"@scom/scom-bar-chart/global/interfaces.ts\" {\n    import { BigNumber } from \"@ijstech/eth-wallet\";\n    import { ModeType } from \"@scom/scom-chart-data-source-setup\";\n    export interface IBarChartOptions {\n        xColumn?: {\n            key: string;\n            type: 'time' | 'category';\n            timeFormat?: string;\n        };\n        yColumns?: string[];\n        groupBy?: string;\n        seriesOptions?: {\n            key: string;\n            title?: string;\n            color?: string;\n        }[];\n        stacking?: boolean;\n        xAxis?: {\n            title?: string;\n            fontColor?: string;\n            tickFormat?: string;\n            reverseValues?: boolean;\n        };\n        yAxis?: {\n            title?: string;\n            fontColor?: string;\n            tickFormat?: string;\n            labelFormat?: string;\n            position?: 'left' | 'right';\n        };\n        legend?: {\n            show?: boolean;\n            fontColor?: string;\n            scroll?: boolean;\n            position?: 'top' | 'bottom' | 'left' | 'right';\n        };\n        padding?: {\n            top?: number;\n            bottom?: number;\n            left?: number;\n            right?: number;\n        };\n        mergeDuplicateData?: boolean;\n        showDataLabels?: boolean;\n        percentage?: boolean;\n    }\n    export interface IBarChartConfig {\n        dataSource: string;\n        queryId?: string;\n        apiEndpoint?: string;\n        title: string;\n        description?: string;\n        options: IBarChartOptions;\n        file?: {\n            cid: string;\n            name: string;\n        };\n        mode: ModeType;\n    }\n    export interface IFormatNumberOptions {\n        precision?: number;\n        roundingMode?: BigNumber.RoundingMode;\n    }\n}\n/// <amd-module name=\"@scom/scom-bar-chart/global/utils.ts\" />\ndeclare module \"@scom/scom-bar-chart/global/utils.ts\" {\n    import { BigNumber } from '@ijstech/eth-wallet';\n    export const isNumeric: (value: string | number | BigNumber) => boolean;\n    export const formatNumber: (num: number, options?: {\n        format?: string;\n        decimals?: number;\n        percentValues?: boolean;\n    }) => any;\n    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;\n    export const groupArrayByKey: (arr: [Date | string, string | number][], isMerged?: boolean) => (string | number | Date)[][];\n    export const groupByCategory: (data: {\n        [key: string]: any;\n    }[], category: string, xAxis: string, yAxis: string) => {\n        [key: string]: any;\n    };\n    export const extractUniqueTimes: (data: {\n        [key: string]: any;\n    }[], keyValue: string) => {\n        [key: string]: any;\n    };\n    export const concatUnique: (obj1: {\n        [key: string]: any;\n    }, obj2: {\n        [key: string]: any;\n    }) => {};\n}\n/// <amd-module name=\"@scom/scom-bar-chart/global/index.ts\" />\ndeclare module \"@scom/scom-bar-chart/global/index.ts\" {\n    export * from \"@scom/scom-bar-chart/global/interfaces.ts\";\n    export * from \"@scom/scom-bar-chart/global/utils.ts\";\n}\n/// <amd-module name=\"@scom/scom-bar-chart/index.css.ts\" />\ndeclare module \"@scom/scom-bar-chart/index.css.ts\" {\n    export const containerStyle: string;\n    export const textStyle: string;\n    export const chartStyle: string;\n}\n/// <amd-module name=\"@scom/scom-bar-chart/assets.ts\" />\ndeclare module \"@scom/scom-bar-chart/assets.ts\" {\n    function fullPath(path: string): string;\n    const _default: {\n        fullPath: typeof fullPath;\n    };\n    export default _default;\n}\n/// <amd-module name=\"@scom/scom-bar-chart/data.json.ts\" />\ndeclare module \"@scom/scom-bar-chart/data.json.ts\" {\n    const _default_1: {\n        defaultBuilderData: {\n            dataSource: string;\n            queryId: string;\n            title: string;\n            options: {\n                xColumn: {\n                    key: string;\n                    type: string;\n                };\n                yColumns: string[];\n                groupBy: string;\n                stacking: boolean;\n                legend: {\n                    show: boolean;\n                };\n                seriesOptions: {\n                    key: string;\n                    color: string;\n                }[];\n                xAxis: {\n                    title: string;\n                    tickFormat: string;\n                };\n                yAxis: {\n                    title: string;\n                    position: string;\n                    labelFormat: string;\n                };\n            };\n        };\n    };\n    export default _default_1;\n}\n/// <amd-module name=\"@scom/scom-bar-chart/formSchema.ts\" />\ndeclare module \"@scom/scom-bar-chart/formSchema.ts\" {\n    export function getBuilderSchema(columns: string[]): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                    }[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n        advanced: {\n            dataSchema: {\n                type: string;\n                properties: {\n                    options: {\n                        type: string;\n                        title: string;\n                        properties: {\n                            xColumn: {\n                                type: string;\n                                title: string;\n                                required: boolean;\n                                properties: {\n                                    key: {\n                                        type: string;\n                                        enum: string[];\n                                        required: boolean;\n                                    };\n                                    type: {\n                                        type: string;\n                                        enum: string[];\n                                        required: boolean;\n                                    };\n                                    timeFormat: {\n                                        type: string;\n                                    };\n                                };\n                            };\n                            yColumns: {\n                                type: string;\n                                title: string;\n                                required: boolean;\n                                items: {\n                                    type: string;\n                                    enum: string[];\n                                };\n                            };\n                            groupBy: {\n                                type: string;\n                                enum: string[];\n                            };\n                            mergeDuplicateData: {\n                                type: string;\n                            };\n                            stacking: {\n                                type: string;\n                            };\n                            legend: {\n                                type: string;\n                                title: string;\n                                properties: {\n                                    show: {\n                                        type: string;\n                                    };\n                                    fontColor: {\n                                        type: string;\n                                        format: string;\n                                    };\n                                    scroll: {\n                                        type: string;\n                                    };\n                                    position: {\n                                        type: string;\n                                        enum: string[];\n                                    };\n                                };\n                            };\n                            showDataLabels: {\n                                type: string;\n                            };\n                            percentage: {\n                                type: string;\n                            };\n                            padding: {\n                                type: string;\n                                title: string;\n                                properties: {\n                                    top: {\n                                        type: string;\n                                    };\n                                    bottom: {\n                                        type: string;\n                                    };\n                                    left: {\n                                        type: string;\n                                    };\n                                    right: {\n                                        type: string;\n                                    };\n                                };\n                            };\n                            xAxis: {\n                                type: string;\n                                properties: {\n                                    title: {\n                                        type: string;\n                                    };\n                                    fontColor: {\n                                        type: string;\n                                        format: string;\n                                    };\n                                    tickFormat: {\n                                        type: string;\n                                    };\n                                    reverseValues: {\n                                        type: string;\n                                    };\n                                };\n                            };\n                            yAxis: {\n                                type: string;\n                                properties: {\n                                    title: {\n                                        type: string;\n                                    };\n                                    fontColor: {\n                                        type: string;\n                                        format: string;\n                                    };\n                                    tickFormat: {\n                                        type: string;\n                                    };\n                                    labelFormat: {\n                                        type: string;\n                                    };\n                                    position: {\n                                        type: string;\n                                        enum: string[];\n                                    };\n                                };\n                            };\n                            seriesOptions: {\n                                type: string;\n                                items: {\n                                    type: string;\n                                    properties: {\n                                        key: {\n                                            type: string;\n                                            required: boolean;\n                                        };\n                                        title: {\n                                            type: string;\n                                        };\n                                        color: {\n                                            type: string;\n                                            format: string;\n                                        };\n                                    };\n                                };\n                            };\n                        };\n                    };\n                };\n            };\n            uiSchema: {\n                type: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                        options: {\n                            detail: {\n                                type: string;\n                            };\n                        };\n                    }[];\n                }[];\n            };\n        };\n    };\n    export function getEmbedderSchema(columns: string[]): {\n        dataSchema: {\n            type: string;\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                    required: boolean;\n                };\n                description: {\n                    type: string;\n                };\n                options: {\n                    type: string;\n                    title: string;\n                    properties: {\n                        xColumn: {\n                            type: string;\n                            title: string;\n                            required: boolean;\n                            properties: {\n                                key: {\n                                    type: string;\n                                    enum: string[];\n                                    required: boolean;\n                                };\n                                type: {\n                                    type: string;\n                                    enum: string[];\n                                    required: boolean;\n                                };\n                                timeFormat: {\n                                    type: string;\n                                };\n                            };\n                        };\n                        yColumns: {\n                            type: string;\n                            title: string;\n                            required: boolean;\n                            items: {\n                                type: string;\n                                enum: string[];\n                            };\n                        };\n                        groupBy: {\n                            type: string;\n                            enum: string[];\n                        };\n                        mergeDuplicateData: {\n                            type: string;\n                        };\n                        stacking: {\n                            type: string;\n                        };\n                        legend: {\n                            type: string;\n                            title: string;\n                            properties: {\n                                show: {\n                                    type: string;\n                                };\n                                fontColor: {\n                                    type: string;\n                                    format: string;\n                                };\n                                scroll: {\n                                    type: string;\n                                };\n                                position: {\n                                    type: string;\n                                    enum: string[];\n                                };\n                            };\n                        };\n                        showDataLabels: {\n                            type: string;\n                        };\n                        percentage: {\n                            type: string;\n                        };\n                        padding: {\n                            type: string;\n                            title: string;\n                            properties: {\n                                top: {\n                                    type: string;\n                                };\n                                bottom: {\n                                    type: string;\n                                };\n                                left: {\n                                    type: string;\n                                };\n                                right: {\n                                    type: string;\n                                };\n                            };\n                        };\n                        xAxis: {\n                            type: string;\n                            properties: {\n                                title: {\n                                    type: string;\n                                };\n                                fontColor: {\n                                    type: string;\n                                    format: string;\n                                };\n                                tickFormat: {\n                                    type: string;\n                                };\n                                reverseValues: {\n                                    type: string;\n                                };\n                            };\n                        };\n                        yAxis: {\n                            type: string;\n                            properties: {\n                                title: {\n                                    type: string;\n                                };\n                                fontColor: {\n                                    type: string;\n                                    format: string;\n                                };\n                                tickFormat: {\n                                    type: string;\n                                };\n                                labelFormat: {\n                                    type: string;\n                                };\n                                position: {\n                                    type: string;\n                                    enum: string[];\n                                };\n                            };\n                        };\n                        seriesOptions: {\n                            type: string;\n                            items: {\n                                type: string;\n                                properties: {\n                                    key: {\n                                        type: string;\n                                        required: boolean;\n                                    };\n                                    title: {\n                                        type: string;\n                                    };\n                                    color: {\n                                        type: string;\n                                        format: string;\n                                    };\n                                };\n                            };\n                        };\n                    };\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                    }[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        scope: string;\n                        elements?: undefined;\n                    } | {\n                        type: string;\n                        elements: {\n                            type: string;\n                            scope: string;\n                            options: {\n                                detail: {\n                                    type: string;\n                                };\n                            };\n                        }[];\n                        scope?: undefined;\n                    })[];\n                }[];\n            })[];\n        };\n    };\n}\n/// <amd-module name=\"@scom/scom-bar-chart/dataOptionsForm.tsx\" />\ndeclare module \"@scom/scom-bar-chart/dataOptionsForm.tsx\" {\n    import { Module, ControlElement, Container } from '@ijstech/components';\n    interface IData {\n        options: any;\n    }\n    interface ScomBarChartDataOptionsFormElement extends ControlElement {\n        dataSchema?: string;\n        uiSchema?: string;\n        options: any;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                [\"i-scom-bar-chart-data-options-form\"]: ScomBarChartDataOptionsFormElement;\n            }\n        }\n    }\n    export default class ScomBarChartDataOptionsForm extends Module {\n        private formEl;\n        private _dataSchema;\n        private _uiSchema;\n        private _data;\n        constructor(parent?: Container, options?: any);\n        get data(): IData;\n        set data(value: IData);\n        refreshFormData(): Promise<IData>;\n        private renderUI;\n        private onInputChanged;\n        onCustomInputChanged(data: IData): Promise<void>;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n/// <amd-module name=\"@scom/scom-bar-chart/dts/index.ts\" />\ndeclare module \"@scom/scom-bar-chart/dts/index.ts\" {\n    const _default_2: \"/// <amd-module name=\"@scom/scom-bar-chart/global/interfaces.ts\" />\ndeclare module \"@scom/scom-bar-chart/global/interfaces.ts\" {\n    import { BigNumber } from \"@ijstech/eth-wallet\";\n    import { ModeType } from \"@scom/scom-chart-data-source-setup\";\n    export interface IBarChartOptions {\n        xColumn?: {\n            key: string;\n            type: 'time' | 'category';\n            timeFormat?: string;\n        };\n        yColumns?: string[];\n        groupBy?: string;\n        seriesOptions?: {\n            key: string;\n            title?: string;\n            color?: string;\n        }[];\n        stacking?: boolean;\n        xAxis?: {\n            title?: string;\n            fontColor?: string;\n            tickFormat?: string;\n            reverseValues?: boolean;\n        };\n        yAxis?: {\n            title?: string;\n            fontColor?: string;\n            tickFormat?: string;\n            labelFormat?: string;\n            position?: 'left' | 'right';\n        };\n        legend?: {\n            show?: boolean;\n            fontColor?: string;\n            scroll?: boolean;\n            position?: 'top' | 'bottom' | 'left' | 'right';\n        };\n        padding?: {\n            top?: number;\n            bottom?: number;\n            left?: number;\n            right?: number;\n        };\n        mergeDuplicateData?: boolean;\n        showDataLabels?: boolean;\n        percentage?: boolean;\n    }\n    export interface IBarChartConfig {\n        dataSource: string;\n        queryId?: string;\n        apiEndpoint?: string;\n        title: string;\n        description?: string;\n        options: IBarChartOptions;\n        file?: {\n            cid: string;\n            name: string;\n        };\n        mode: ModeType;\n    }\n    export interface IFormatNumberOptions {\n        precision?: number;\n        roundingMode?: BigNumber.RoundingMode;\n    }\n}\n/// <amd-module name=\"@scom/scom-bar-chart/global/utils.ts\" />\ndeclare module \"@scom/scom-bar-chart/global/utils.ts\" {\n    import { BigNumber } from '@ijstech/eth-wallet';\n    export const isNumeric: (value: string | number | BigNumber) => boolean;\n    export const formatNumber: (num: number, options?: {\n        format?: string;\n        decimals?: number;\n        percentValues?: boolean;\n    }) => any;\n    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;\n    export const groupArrayByKey: (arr: [Date | string, string | number][], isMerged?: boolean) => (string | number | Date)[][];\n    export const groupByCategory: (data: {\n        [key: string]: any;\n    }[], category: string, xAxis: string, yAxis: string) => {\n        [key: string]: any;\n    };\n    export const extractUniqueTimes: (data: {\n        [key: string]: any;\n    }[], keyValue: string) => {\n        [key: string]: any;\n    };\n    export const concatUnique: (obj1: {\n        [key: string]: any;\n    }, obj2: {\n        [key: string]: any;\n    }) => {};\n}\n/// <amd-module name=\"@scom/scom-bar-chart/global/index.ts\" />\ndeclare module \"@scom/scom-bar-chart/global/index.ts\" {\n    export * from \"@scom/scom-bar-chart/global/interfaces.ts\";\n    export * from \"@scom/scom-bar-chart/global/utils.ts\";\n}\n/// <amd-module name=\"@scom/scom-bar-chart/index.css.ts\" />\ndeclare module \"@scom/scom-bar-chart/index.css.ts\" {\n    export const containerStyle: string;\n    export const textStyle: string;\n    export const chartStyle: string;\n}\n/// <amd-module name=\"@scom/scom-bar-chart/assets.ts\" />\ndeclare module \"@scom/scom-bar-chart/assets.ts\" {\n    function fullPath(path: string): string;\n    const _default: {\n        fullPath: typeof fullPath;\n    };\n    export default _default;\n}\n/// <amd-module name=\"@scom/scom-bar-chart/data.json.ts\" />\ndeclare module \"@scom/scom-bar-chart/data.json.ts\" {\n    const _default_1: {\n        defaultBuilderData: {\n            dataSource: string;\n            queryId: string;\n            title: string;\n            options: {\n                xColumn: {\n                    key: string;\n                    type: string;\n                };\n                yColumns: string[];\n                groupBy: string;\n                stacking: boolean;\n                legend: {\n                    show: boolean;\n                };\n                seriesOptions: {\n                    key: string;\n                    color: string;\n                }[];\n                xAxis: {\n                    title: string;\n                    tickFormat: string;\n                };\n                yAxis: {\n                    title: string;\n                    position: string;\n                    labelFormat: string;\n                };\n            };\n        };\n    };\n    export default _default_1;\n}\n/// <amd-module name=\"@scom/scom-bar-chart/formSchema.ts\" />\ndeclare module \"@scom/scom-bar-chart/formSchema.ts\" {\n    export function getBuilderSchema(columns: string[]): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                    }[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n        advanced: {\n            dataSchema: {\n                type: string;\n                properties: {\n                    options: {\n                        type: string;\n                        title: string;\n                        properties: {\n                            xColumn: {\n                                type: string;\n                                title: string;\n                                required: boolean;\n                                properties: {\n                                    key: {\n                                        type: string;\n                                        enum: string[];\n                                        required: boolean;\n                                    };\n                                    type: {\n                                        type: string;\n                                        enum: string[];\n                                        required: boolean;\n                                    };\n                                    timeFormat: {\n                                        type: string;\n                                    };\n                                };\n                            };\n                            yColumns: {\n                                type: string;\n                                title: string;\n                                required: boolean;\n                                items: {\n                                    type: string;\n                                    enum: string[];\n                                };\n                            };\n                            groupBy: {\n                                type: string;\n                                enum: string[];\n                            };\n                            mergeDuplicateData: {\n                                type: string;\n                            };\n                            stacking: {\n                                type: string;\n                            };\n                            legend: {\n                                type: string;\n                                title: string;\n                                properties: {\n                                    show: {\n                                        type: string;\n                                    };\n                                    fontColor: {\n                                        type: string;\n                                        format: string;\n                                    };\n                                    scroll: {\n                                        type: string;\n                                    };\n                                    position: {\n                                        type: string;\n                                        enum: string[];\n                                    };\n                                };\n                            };\n                            showDataLabels: {\n                                type: string;\n                            };\n                            percentage: {\n                                type: string;\n                            };\n                            padding: {\n                                type: string;\n                                title: string;\n                                properties: {\n                                    top: {\n                                        type: string;\n                                    };\n                                    bottom: {\n                                        type: string;\n                                    };\n                                    left: {\n                                        type: string;\n                                    };\n                                    right: {\n                                        type: string;\n                                    };\n                                };\n                            };\n                            xAxis: {\n                                type: string;\n                                properties: {\n                                    title: {\n                                        type: string;\n                                    };\n                                    fontColor: {\n                                        type: string;\n                                        format: string;\n                                    };\n                                    tickFormat: {\n                                        type: string;\n                                    };\n                                    reverseValues: {\n                                        type: string;\n                                    };\n                                };\n                            };\n                            yAxis: {\n                                type: string;\n                                properties: {\n                                    title: {\n                                        type: string;\n                                    };\n                                    fontColor: {\n                                        type: string;\n                                        format: string;\n                                    };\n                                    tickFormat: {\n                                        type: string;\n                                    };\n                                    labelFormat: {\n                                        type: string;\n                                    };\n                                    position: {\n                                        type: string;\n                                        enum: string[];\n                                    };\n                                };\n                            };\n                            seriesOptions: {\n                                type: string;\n                                items: {\n                                    type: string;\n                                    properties: {\n                                        key: {\n                                            type: string;\n                                            required: boolean;\n                                        };\n                                        title: {\n                                            type: string;\n                                        };\n                                        color: {\n                                            type: string;\n                                            format: string;\n                                        };\n                                    };\n                                };\n                            };\n                        };\n                    };\n                };\n            };\n            uiSchema: {\n                type: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                        options: {\n                            detail: {\n                                type: string;\n                            };\n                        };\n                    }[];\n                }[];\n            };\n        };\n    };\n    export function getEmbedderSchema(columns: string[]): {\n        dataSchema: {\n            type: string;\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                    required: boolean;\n                };\n                description: {\n                    type: string;\n                };\n                options: {\n                    type: string;\n                    title: string;\n                    properties: {\n                        xColumn: {\n                            type: string;\n                            title: string;\n                            required: boolean;\n                            properties: {\n                                key: {\n                                    type: string;\n                                    enum: string[];\n                                    required: boolean;\n                                };\n                                type: {\n                                    type: string;\n                                    enum: string[];\n                                    required: boolean;\n                                };\n                                timeFormat: {\n                                    type: string;\n                                };\n                            };\n                        };\n                        yColumns: {\n                            type: string;\n                            title: string;\n                            required: boolean;\n                            items: {\n                                type: string;\n                                enum: string[];\n                            };\n                        };\n                        groupBy: {\n                            type: string;\n                            enum: string[];\n                        };\n                        mergeDuplicateData: {\n                            type: string;\n                        };\n                        stacking: {\n                            type: string;\n                        };\n                        legend: {\n                            type: string;\n                            title: string;\n                            properties: {\n                                show: {\n                                    type: string;\n                                };\n                                fontColor: {\n                                    type: string;\n                                    format: string;\n                                };\n                                scroll: {\n                                    type: string;\n                                };\n                                position: {\n                                    type: string;\n                                    enum: string[];\n                                };\n                            };\n                        };\n                        showDataLabels: {\n                            type: string;\n                        };\n                        percentage: {\n                            type: string;\n                        };\n                        padding: {\n                            type: string;\n                            title: string;\n                            properties: {\n                                top: {\n                                    type: string;\n                                };\n                                bottom: {\n                                    type: string;\n                                };\n                                left: {\n                                    type: string;\n                                };\n                                right: {\n                                    type: string;\n                                };\n                            };\n                        };\n                        xAxis: {\n                            type: string;\n                            properties: {\n                                title: {\n                                    type: string;\n                                };\n                                fontColor: {\n                                    type: string;\n                                    format: string;\n                                };\n                                tickFormat: {\n                                    type: string;\n                                };\n                                reverseValues: {\n                                    type: string;\n                                };\n                            };\n                        };\n                        yAxis: {\n                            type: string;\n                            properties: {\n                                title: {\n                                    type: string;\n                                };\n                                fontColor: {\n                                    type: string;\n                                    format: string;\n                                };\n                                tickFormat: {\n                                    type: string;\n                                };\n                                labelFormat: {\n                                    type: string;\n                                };\n                                position: {\n                                    type: string;\n                                    enum: string[];\n                                };\n                            };\n                        };\n                        seriesOptions: {\n                            type: string;\n                            items: {\n                                type: string;\n                                properties: {\n                                    key: {\n                                        type: string;\n                                        required: boolean;\n                                    };\n                                    title: {\n                                        type: string;\n                                    };\n                                    color: {\n                                        type: string;\n                                        format: string;\n                                    };\n                                };\n                            };\n                        };\n                    };\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                    }[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        scope: string;\n                        elements?: undefined;\n                    } | {\n                        type: string;\n                        elements: {\n                            type: string;\n                            scope: string;\n                            options: {\n                                detail: {\n                                    type: string;\n                                };\n                            };\n                        }[];\n                        scope?: undefined;\n                    })[];\n                }[];\n            })[];\n        };\n    };\n}\n/// <amd-module name=\"@scom/scom-bar-chart/dataOptionsForm.tsx\" />\ndeclare module \"@scom/scom-bar-chart/dataOptionsForm.tsx\" {\n    import { Module, ControlElement, Container } from '@ijstech/components';\n    interface IData {\n        options: any;\n    }\n    interface ScomBarChartDataOptionsFormElement extends ControlElement {\n        dataSchema?: string;\n        uiSchema?: string;\n        options: any;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                [\"i-scom-bar-chart-data-options-form\"]: ScomBarChartDataOptionsFormElement;\n            }\n        }\n    }\n    export default class ScomBarChartDataOptionsForm extends Module {\n        private formEl;\n        private _dataSchema;\n        private _uiSchema;\n        private _data;\n        constructor(parent?: Container, options?: any);\n        get data(): IData;\n        set data(value: IData);\n        refreshFormData(): Promise<IData>;\n        private renderUI;\n        private onInputChanged;\n        onCustomInputChanged(data: IData): Promise<void>;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n/// <amd-module name=\"@scom/scom-bar-chart\" />\ndeclare module \"@scom/scom-bar-chart\" {\n    import { Module, ControlElement, Container, IDataSchema, VStack, IUISchema, Modal } from '@ijstech/components';\n    import { IBarChartConfig } from \"@scom/scom-bar-chart/global/index.ts\";\n    interface ScomBarChartElement extends ControlElement {\n        lazyLoad?: boolean;\n        data: IBarChartConfig;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                ['i-scom-bar-chart']: ScomBarChartElement;\n            }\n        }\n    }\n    interface ICustomWidget {\n        showConfigurator: (parent: Modal, prop: string) => void;\n    }\n    export default class ScomBarChart extends Module implements ICustomWidget {\n        private chartContainer;\n        private vStackInfo;\n        private pnlChart;\n        private loadingElm;\n        private lbTitle;\n        private lbDescription;\n        private columnNames;\n        private chartData;\n        private _data;\n        tag: any;\n        defaultEdit: boolean;\n        static create(options?: ScomBarChartElement, parent?: Container): Promise<ScomBarChart>;\n        constructor(parent?: Container, options?: ScomBarChartElement);\n        showConfigurator(parent: Modal, prop: string): void;\n        private onConfigSave;\n        private getData;\n        private setData;\n        private getTag;\n        private setTag;\n        private _getActions;\n        getConfigurators(): ({\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getData: any;\n            setData: (data: IBarChartConfig) => Promise<void>;\n            getTag: any;\n            setTag: any;\n            getLinkParams?: undefined;\n            setLinkParams?: undefined;\n        } | {\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getLinkParams: () => {\n                data: string;\n            };\n            setLinkParams: (params: any) => Promise<void>;\n            getData: any;\n            setData: any;\n            getTag: any;\n            setTag: any;\n        })[];\n        private updateStyle;\n        private updateTheme;\n        private onUpdateBlock;\n        private updateChartData;\n        private renderSnapshotData;\n        private renderLiveData;\n        private renderChart;\n        private resizeChart;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n\";\n    export default _default_2;\n}\n/// <amd-module name=\"@scom/scom-bar-chart\" />\ndeclare module \"@scom/scom-bar-chart\" {\n    import { Module, ControlElement, Container, IDataSchema, VStack, IUISchema, Modal } from '@ijstech/components';\n    import { IBarChartConfig } from \"@scom/scom-bar-chart/global/index.ts\";\n    interface ScomBarChartElement extends ControlElement {\n        lazyLoad?: boolean;\n        data: IBarChartConfig;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                ['i-scom-bar-chart']: ScomBarChartElement;\n            }\n        }\n    }\n    interface ICustomWidget {\n        showConfigurator: (parent: Modal, prop: string) => void;\n        register: () => {\n            types: string;\n            defaultData: string;\n        };\n    }\n    export default class ScomBarChart extends Module implements ICustomWidget {\n        private chartContainer;\n        private vStackInfo;\n        private pnlChart;\n        private loadingElm;\n        private lbTitle;\n        private lbDescription;\n        private columnNames;\n        private chartData;\n        private _data;\n        tag: any;\n        defaultEdit: boolean;\n        static create(options?: ScomBarChartElement, parent?: Container): Promise<ScomBarChart>;\n        constructor(parent?: Container, options?: ScomBarChartElement);\n        showConfigurator(parent: Modal, prop: string): void;\n        register(): {\n            types: string;\n            defaultData: string;\n        };\n        private onConfigSave;\n        private getData;\n        private setData;\n        private getTag;\n        private setTag;\n        private _getActions;\n        getConfigurators(): ({\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getData: any;\n            setData: (data: IBarChartConfig) => Promise<void>;\n            getTag: any;\n            setTag: any;\n            getLinkParams?: undefined;\n            setLinkParams?: undefined;\n        } | {\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getLinkParams: () => {\n                data: string;\n            };\n            setLinkParams: (params: any) => Promise<void>;\n            getData: any;\n            setData: any;\n            getTag: any;\n            setTag: any;\n        })[];\n        private updateStyle;\n        private updateTheme;\n        private onUpdateBlock;\n        private updateChartData;\n        private renderSnapshotData;\n        private renderLiveData;\n        private renderChart;\n        private resizeChart;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n\";\n    export default _default_2;\n}\n/// <amd-module name=\"@scom/scom-bar-chart\" />\ndeclare module \"@scom/scom-bar-chart\" {\n    import { Module, ControlElement, Container, IDataSchema, VStack, IUISchema, Modal } from '@ijstech/components';\n    import { IBarChartConfig } from \"@scom/scom-bar-chart/global/index.ts\";\n    interface ScomBarChartElement extends ControlElement {\n        lazyLoad?: boolean;\n        data: IBarChartConfig;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                ['i-scom-bar-chart']: ScomBarChartElement;\n            }\n        }\n    }\n    interface ICustomWidget {\n        showConfigurator: (parent: Modal, prop: string) => void;\n        register: () => {\n            types: string;\n            defaultData: IBarChartConfig;\n        };\n    }\n    export default class ScomBarChart extends Module implements ICustomWidget {\n        private chartContainer;\n        private vStackInfo;\n        private pnlChart;\n        private loadingElm;\n        private lbTitle;\n        private lbDescription;\n        private columnNames;\n        private chartData;\n        private _data;\n        tag: any;\n        defaultEdit: boolean;\n        static create(options?: ScomBarChartElement, parent?: Container): Promise<ScomBarChart>;\n        constructor(parent?: Container, options?: ScomBarChartElement);\n        showConfigurator(parent: Modal, prop: string): void;\n        register(): {\n            types: string;\n            defaultData: IBarChartConfig;\n        };\n        private onConfigSave;\n        private getData;\n        private setData;\n        private getTag;\n        private setTag;\n        private _getActions;\n        getConfigurators(): ({\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getData: any;\n            setData: (data: IBarChartConfig) => Promise<void>;\n            getTag: any;\n            setTag: any;\n            getLinkParams?: undefined;\n            setLinkParams?: undefined;\n        } | {\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getLinkParams: () => {\n                data: string;\n            };\n            setLinkParams: (params: any) => Promise<void>;\n            getData: any;\n            setData: any;\n            getTag: any;\n            setTag: any;\n        })[];\n        private updateStyle;\n        private updateTheme;\n        private onUpdateBlock;\n        private updateChartData;\n        private renderSnapshotData;\n        private renderLiveData;\n        private renderChart;\n        resize(): void;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n\";\n    export default _default_1;\n}\n/// <amd-module name=\"@scom/scom-bar-chart\" />\ndeclare module \"@scom/scom-bar-chart\" {\n    import { ControlElement, Container, Modal } from '@ijstech/components';\n    import { ScomCharts } from '@scom/scom-charts';\n    import { IBarChartConfig, IBarChartOptions } from \"@scom/scom-bar-chart/interfaces.ts\";\n    interface ScomBarChartElement extends ControlElement {\n        lazyLoad?: boolean;\n        data: IBarChartConfig;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                ['i-scom-bar-chart']: ScomBarChartElement;\n            }\n        }\n    }\n    interface ICustomWidget {\n        showConfigurator: (parent: Modal, prop: string) => void;\n        register: () => {\n            types: string;\n            defaultData: IBarChartConfig;\n        };\n    }\n    export default class ScomBarChart extends ScomCharts<IBarChartOptions> implements ICustomWidget {\n        static create(options?: ScomBarChartElement, parent?: Container): Promise<ScomBarChart>;\n        constructor(parent?: Container, options?: ScomBarChartElement);\n        register(): {\n            types: string;\n            defaultData: IBarChartConfig;\n        };\n        getFormSchema(columns: string[]): {\n            builderSchema: {\n                dataSchema: {\n                    type: string;\n                    required: string[];\n                    properties: {\n                        darkShadow: {\n                            type: string;\n                        };\n                        customFontColor: {\n                            type: string;\n                        };\n                        fontColor: {\n                            type: string;\n                            format: string;\n                        };\n                        customBackgroundColor: {\n                            type: string;\n                        };\n                        backgroundColor: {\n                            type: string;\n                            format: string;\n                        };\n                        height: {\n                            type: string;\n                        };\n                        title: {\n                            type: string;\n                        };\n                        description: {\n                            type: string;\n                        };\n                    };\n                };\n                uiSchema: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                elements: ({\n                                    type: string;\n                                    scope: string;\n                                    rule?: undefined;\n                                } | {\n                                    type: string;\n                                    scope: string;\n                                    rule: {\n                                        effect: string;\n                                        condition: {\n                                            scope: string;\n                                            schema: {\n                                                const: boolean;\n                                            };\n                                        };\n                                    };\n                                })[];\n                            }[];\n                        }[];\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                };\n                advanced: {\n                    dataSchema: {\n                        type: string;\n                        properties: {\n                            options: {\n                                type: string;\n                                title: string;\n                                properties: {\n                                    xColumn: {\n                                        type: string;\n                                        title: string;\n                                        required: boolean;\n                                        properties: {\n                                            key: {\n                                                type: string;\n                                                enum: string[];\n                                                required: boolean;\n                                            };\n                                            type: {\n                                                type: string;\n                                                enum: string[];\n                                                required: boolean;\n                                            };\n                                            timeFormat: {\n                                                type: string;\n                                            };\n                                        };\n                                    };\n                                    yColumns: {\n                                        type: string;\n                                        title: string;\n                                        required: boolean;\n                                        items: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                    };\n                                    groupBy: {\n                                        type: string;\n                                        enum: string[];\n                                    };\n                                    mergeDuplicateData: {\n                                        type: string;\n                                    };\n                                    stacking: {\n                                        type: string;\n                                    };\n                                    legend: {\n                                        type: string;\n                                        title: string;\n                                        properties: {\n                                            show: {\n                                                type: string;\n                                            };\n                                            fontColor: {\n                                                type: string;\n                                                format: string;\n                                            };\n                                            scroll: {\n                                                type: string;\n                                            };\n                                            position: {\n                                                type: string;\n                                                enum: string[];\n                                            };\n                                        };\n                                    };\n                                    showDataLabels: {\n                                        type: string;\n                                    };\n                                    percentage: {\n                                        type: string;\n                                    };\n                                    padding: {\n                                        type: string;\n                                        title: string;\n                                        properties: {\n                                            top: {\n                                                type: string;\n                                            };\n                                            bottom: {\n                                                type: string;\n                                            };\n                                            left: {\n                                                type: string;\n                                            };\n                                            right: {\n                                                type: string;\n                                            };\n                                        };\n                                    };\n                                    xAxis: {\n                                        type: string;\n                                        properties: {\n                                            title: {\n                                                type: string;\n                                            };\n                                            fontColor: {\n                                                type: string;\n                                                format: string;\n                                            };\n                                            tickFormat: {\n                                                type: string;\n                                            };\n                                            reverseValues: {\n                                                type: string;\n                                            };\n                                        };\n                                    };\n                                    yAxis: {\n                                        type: string;\n                                        properties: {\n                                            title: {\n                                                type: string;\n                                            };\n                                            fontColor: {\n                                                type: string;\n                                                format: string;\n                                            };\n                                            tickFormat: {\n                                                type: string;\n                                            };\n                                            labelFormat: {\n                                                type: string;\n                                            };\n                                            position: {\n                                                type: string;\n                                                enum: string[];\n                                            };\n                                        };\n                                    };\n                                    seriesOptions: {\n                                        type: string;\n                                        items: {\n                                            type: string;\n                                            properties: {\n                                                key: {\n                                                    type: string;\n                                                    required: boolean;\n                                                };\n                                                title: {\n                                                    type: string;\n                                                };\n                                                color: {\n                                                    type: string;\n                                                    format: string;\n                                                };\n                                            };\n                                        };\n                                    };\n                                };\n                            };\n                        };\n                    };\n                    uiSchema: {\n                        type: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                                options: {\n                                    detail: {\n                                        type: string;\n                                    };\n                                };\n                            }[];\n                        }[];\n                    };\n                };\n            };\n            embededSchema: {\n                dataSchema: {\n                    type: string;\n                    properties: {\n                        darkShadow: {\n                            type: string;\n                        };\n                        customFontColor: {\n                            type: string;\n                        };\n                        fontColor: {\n                            type: string;\n                            format: string;\n                        };\n                        customBackgroundColor: {\n                            type: string;\n                        };\n                        backgroundColor: {\n                            type: string;\n                            format: string;\n                        };\n                        height: {\n                            type: string;\n                        };\n                        title: {\n                            type: string;\n                            required: boolean;\n                        };\n                        description: {\n                            type: string;\n                        };\n                        options: {\n                            type: string;\n                            title: string;\n                            properties: {\n                                xColumn: {\n                                    type: string;\n                                    title: string;\n                                    required: boolean;\n                                    properties: {\n                                        key: {\n                                            type: string;\n                                            enum: string[];\n                                            required: boolean;\n                                        };\n                                        type: {\n                                            type: string;\n                                            enum: string[];\n                                            required: boolean;\n                                        };\n                                        timeFormat: {\n                                            type: string;\n                                        };\n                                    };\n                                };\n                                yColumns: {\n                                    type: string;\n                                    title: string;\n                                    required: boolean;\n                                    items: {\n                                        type: string;\n                                        enum: string[];\n                                    };\n                                };\n                                groupBy: {\n                                    type: string;\n                                    enum: string[];\n                                };\n                                mergeDuplicateData: {\n                                    type: string;\n                                };\n                                stacking: {\n                                    type: string;\n                                };\n                                legend: {\n                                    type: string;\n                                    title: string;\n                                    properties: {\n                                        show: {\n                                            type: string;\n                                        };\n                                        fontColor: {\n                                            type: string;\n                                            format: string;\n                                        };\n                                        scroll: {\n                                            type: string;\n                                        };\n                                        position: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                    };\n                                };\n                                showDataLabels: {\n                                    type: string;\n                                };\n                                percentage: {\n                                    type: string;\n                                };\n                                padding: {\n                                    type: string;\n                                    title: string;\n                                    properties: {\n                                        top: {\n                                            type: string;\n                                        };\n                                        bottom: {\n                                            type: string;\n                                        };\n                                        left: {\n                                            type: string;\n                                        };\n                                        right: {\n                                            type: string;\n                                        };\n                                    };\n                                };\n                                xAxis: {\n                                    type: string;\n                                    properties: {\n                                        title: {\n                                            type: string;\n                                        };\n                                        fontColor: {\n                                            type: string;\n                                            format: string;\n                                        };\n                                        tickFormat: {\n                                            type: string;\n                                        };\n                                        reverseValues: {\n                                            type: string;\n                                        };\n                                    };\n                                };\n                                yAxis: {\n                                    type: string;\n                                    properties: {\n                                        title: {\n                                            type: string;\n                                        };\n                                        fontColor: {\n                                            type: string;\n                                            format: string;\n                                        };\n                                        tickFormat: {\n                                            type: string;\n                                        };\n                                        labelFormat: {\n                                            type: string;\n                                        };\n                                        position: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                    };\n                                };\n                                seriesOptions: {\n                                    type: string;\n                                    items: {\n                                        type: string;\n                                        properties: {\n                                            key: {\n                                                type: string;\n                                                required: boolean;\n                                            };\n                                            title: {\n                                                type: string;\n                                            };\n                                            color: {\n                                                type: string;\n                                                format: string;\n                                            };\n                                        };\n                                    };\n                                };\n                            };\n                        };\n                    };\n                };\n                uiSchema: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                elements: ({\n                                    type: string;\n                                    scope: string;\n                                    rule?: undefined;\n                                } | {\n                                    type: string;\n                                    scope: string;\n                                    rule: {\n                                        effect: string;\n                                        condition: {\n                                            scope: string;\n                                            schema: {\n                                                const: boolean;\n                                            };\n                                        };\n                                    };\n                                })[];\n                            }[];\n                        }[];\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: ({\n                                type: string;\n                                scope: string;\n                                elements?: undefined;\n                            } | {\n                                type: string;\n                                elements: {\n                                    type: string;\n                                    scope: string;\n                                    options: {\n                                        detail: {\n                                            type: string;\n                                        };\n                                    };\n                                }[];\n                                scope?: undefined;\n                            })[];\n                        }[];\n                    })[];\n                };\n            };\n        };\n        getChartData(): {\n            chartData: any;\n            defaulBuildertData: IBarChartConfig;\n        };\n        init(): Promise<void>;\n    }\n}\n";
    export default _default_1;
}
/// <amd-module name="@scom/scom-bar-chart" />
declare module "@scom/scom-bar-chart" {
    import { ControlElement, Container, Modal } from '@ijstech/components';
    import { ScomCharts } from '@scom/scom-charts';
    import { IBarChartConfig, IBarChartOptions } from "@scom/scom-bar-chart/interfaces.ts";
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
    interface ICustomWidget {
        showConfigurator: (parent: Modal, prop: string) => void;
        register: () => {
            types: string;
            defaultData: IBarChartConfig;
        };
    }
    export default class ScomBarChart extends ScomCharts<IBarChartOptions> implements ICustomWidget {
        static create(options?: ScomBarChartElement, parent?: Container): Promise<ScomBarChart>;
        constructor(parent?: Container, options?: ScomBarChartElement);
        register(): {
            types: string;
            defaultData: IBarChartConfig;
        };
        getFormSchema(columns: string[]): {
            builderSchema: {
                dataSchema: {
                    type: string;
                    required: string[];
                    properties: {
                        darkShadow: {
                            type: string;
                        };
                        customFontColor: {
                            type: string;
                        };
                        fontColor: {
                            type: string;
                            format: string;
                        };
                        customBackgroundColor: {
                            type: string;
                        };
                        backgroundColor: {
                            type: string;
                            format: string;
                        };
                        height: {
                            type: string;
                        };
                        title: {
                            type: string;
                        };
                        description: {
                            type: string;
                        };
                    };
                };
                uiSchema: {
                    type: string;
                    elements: ({
                        type: string;
                        label: string;
                        elements: {
                            type: string;
                            elements: {
                                type: string;
                                elements: ({
                                    type: string;
                                    scope: string;
                                    rule?: undefined;
                                } | {
                                    type: string;
                                    scope: string;
                                    rule: {
                                        effect: string;
                                        condition: {
                                            scope: string;
                                            schema: {
                                                const: boolean;
                                            };
                                        };
                                    };
                                })[];
                            }[];
                        }[];
                    } | {
                        type: string;
                        label: string;
                        elements: {
                            type: string;
                            elements: {
                                type: string;
                                scope: string;
                            }[];
                        }[];
                    })[];
                };
                advanced: {
                    dataSchema: {
                        type: string;
                        properties: {
                            options: {
                                type: string;
                                title: string;
                                properties: {
                                    xColumn: {
                                        type: string;
                                        title: string;
                                        required: boolean;
                                        properties: {
                                            key: {
                                                type: string;
                                                enum: string[];
                                                required: boolean;
                                            };
                                            type: {
                                                type: string;
                                                enum: string[];
                                                required: boolean;
                                            };
                                            timeFormat: {
                                                type: string;
                                            };
                                        };
                                    };
                                    yColumns: {
                                        type: string;
                                        title: string;
                                        required: boolean;
                                        items: {
                                            type: string;
                                            enum: string[];
                                        };
                                    };
                                    groupBy: {
                                        type: string;
                                        enum: string[];
                                    };
                                    mergeDuplicateData: {
                                        type: string;
                                    };
                                    stacking: {
                                        type: string;
                                    };
                                    legend: {
                                        type: string;
                                        title: string;
                                        properties: {
                                            show: {
                                                type: string;
                                            };
                                            fontColor: {
                                                type: string;
                                                format: string;
                                            };
                                            scroll: {
                                                type: string;
                                            };
                                            position: {
                                                type: string;
                                                enum: string[];
                                            };
                                        };
                                    };
                                    showDataLabels: {
                                        type: string;
                                    };
                                    percentage: {
                                        type: string;
                                    };
                                    padding: {
                                        type: string;
                                        title: string;
                                        properties: {
                                            top: {
                                                type: string;
                                            };
                                            bottom: {
                                                type: string;
                                            };
                                            left: {
                                                type: string;
                                            };
                                            right: {
                                                type: string;
                                            };
                                        };
                                    };
                                    xAxis: {
                                        type: string;
                                        properties: {
                                            title: {
                                                type: string;
                                            };
                                            fontColor: {
                                                type: string;
                                                format: string;
                                            };
                                            tickFormat: {
                                                type: string;
                                            };
                                            reverseValues: {
                                                type: string;
                                            };
                                        };
                                    };
                                    yAxis: {
                                        type: string;
                                        properties: {
                                            title: {
                                                type: string;
                                            };
                                            fontColor: {
                                                type: string;
                                                format: string;
                                            };
                                            tickFormat: {
                                                type: string;
                                            };
                                            labelFormat: {
                                                type: string;
                                            };
                                            position: {
                                                type: string;
                                                enum: string[];
                                            };
                                        };
                                    };
                                    seriesOptions: {
                                        type: string;
                                        items: {
                                            type: string;
                                            properties: {
                                                key: {
                                                    type: string;
                                                    required: boolean;
                                                };
                                                title: {
                                                    type: string;
                                                };
                                                color: {
                                                    type: string;
                                                    format: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                    uiSchema: {
                        type: string;
                        elements: {
                            type: string;
                            elements: {
                                type: string;
                                scope: string;
                                options: {
                                    detail: {
                                        type: string;
                                    };
                                };
                            }[];
                        }[];
                    };
                };
            };
            embededSchema: {
                dataSchema: {
                    type: string;
                    properties: {
                        darkShadow: {
                            type: string;
                        };
                        customFontColor: {
                            type: string;
                        };
                        fontColor: {
                            type: string;
                            format: string;
                        };
                        customBackgroundColor: {
                            type: string;
                        };
                        backgroundColor: {
                            type: string;
                            format: string;
                        };
                        height: {
                            type: string;
                        };
                        title: {
                            type: string;
                            required: boolean;
                        };
                        description: {
                            type: string;
                        };
                        options: {
                            type: string;
                            title: string;
                            properties: {
                                xColumn: {
                                    type: string;
                                    title: string;
                                    required: boolean;
                                    properties: {
                                        key: {
                                            type: string;
                                            enum: string[];
                                            required: boolean;
                                        };
                                        type: {
                                            type: string;
                                            enum: string[];
                                            required: boolean;
                                        };
                                        timeFormat: {
                                            type: string;
                                        };
                                    };
                                };
                                yColumns: {
                                    type: string;
                                    title: string;
                                    required: boolean;
                                    items: {
                                        type: string;
                                        enum: string[];
                                    };
                                };
                                groupBy: {
                                    type: string;
                                    enum: string[];
                                };
                                mergeDuplicateData: {
                                    type: string;
                                };
                                stacking: {
                                    type: string;
                                };
                                legend: {
                                    type: string;
                                    title: string;
                                    properties: {
                                        show: {
                                            type: string;
                                        };
                                        fontColor: {
                                            type: string;
                                            format: string;
                                        };
                                        scroll: {
                                            type: string;
                                        };
                                        position: {
                                            type: string;
                                            enum: string[];
                                        };
                                    };
                                };
                                showDataLabels: {
                                    type: string;
                                };
                                percentage: {
                                    type: string;
                                };
                                padding: {
                                    type: string;
                                    title: string;
                                    properties: {
                                        top: {
                                            type: string;
                                        };
                                        bottom: {
                                            type: string;
                                        };
                                        left: {
                                            type: string;
                                        };
                                        right: {
                                            type: string;
                                        };
                                    };
                                };
                                xAxis: {
                                    type: string;
                                    properties: {
                                        title: {
                                            type: string;
                                        };
                                        fontColor: {
                                            type: string;
                                            format: string;
                                        };
                                        tickFormat: {
                                            type: string;
                                        };
                                        reverseValues: {
                                            type: string;
                                        };
                                    };
                                };
                                yAxis: {
                                    type: string;
                                    properties: {
                                        title: {
                                            type: string;
                                        };
                                        fontColor: {
                                            type: string;
                                            format: string;
                                        };
                                        tickFormat: {
                                            type: string;
                                        };
                                        labelFormat: {
                                            type: string;
                                        };
                                        position: {
                                            type: string;
                                            enum: string[];
                                        };
                                    };
                                };
                                seriesOptions: {
                                    type: string;
                                    items: {
                                        type: string;
                                        properties: {
                                            key: {
                                                type: string;
                                                required: boolean;
                                            };
                                            title: {
                                                type: string;
                                            };
                                            color: {
                                                type: string;
                                                format: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                uiSchema: {
                    type: string;
                    elements: ({
                        type: string;
                        label: string;
                        elements: {
                            type: string;
                            elements: {
                                type: string;
                                elements: ({
                                    type: string;
                                    scope: string;
                                    rule?: undefined;
                                } | {
                                    type: string;
                                    scope: string;
                                    rule: {
                                        effect: string;
                                        condition: {
                                            scope: string;
                                            schema: {
                                                const: boolean;
                                            };
                                        };
                                    };
                                })[];
                            }[];
                        }[];
                    } | {
                        type: string;
                        label: string;
                        elements: {
                            type: string;
                            elements: ({
                                type: string;
                                scope: string;
                                elements?: undefined;
                            } | {
                                type: string;
                                elements: {
                                    type: string;
                                    scope: string;
                                    options: {
                                        detail: {
                                            type: string;
                                        };
                                    };
                                }[];
                                scope?: undefined;
                            })[];
                        }[];
                    })[];
                };
            };
        };
        getChartData(): {
            chartData: any;
            defaulBuildertData: IBarChartConfig;
        };
        init(): Promise<void>;
    }
}
