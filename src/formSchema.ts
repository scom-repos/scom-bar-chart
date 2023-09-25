function visualizationOptions(columns: string[]) {
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
    }
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
}


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
}

export function getBuilderSchema(columns: string[]) {
    return {
        dataSchema: {
            type: 'object',
            required: ['title'],
            properties: {
                title: {
                    type: 'string'
                },
                description: {
                    type: 'string'
                },
                ...theme
            }
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
    }
}

export function getEmbedderSchema(columns: string[]) {
    return {
        dataSchema: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                    required: true
                },
                description: {
                    type: 'string'
                },
                options: visualizationOptions(columns),
                ...theme
            }
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
    }
}