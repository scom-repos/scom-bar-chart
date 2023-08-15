const visualizationOptions = {
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
}

export function getBuilderSchema() {
    return {
        general: {
            dataSchema: {
                type: 'object',
                required: ['title'],
                properties: {
                    title: {
                        type: 'string'
                    },
                    description: {
                        type: 'string'
                    }
                }
            },
            uiSchema: {
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
        advanced: {
            dataSchema: {
                type: 'object',
                properties: {
                    options: visualizationOptions
                }
            },
            uiSchema: {
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
        },
        theme: {
            dataSchema: {
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
            }
        }
    }
}

export function getEmbedderSchema() {
    return {
        general: {
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
                    options: visualizationOptions
                }
            }
        },
        theme: {
            dataSchema: {
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
            }
        }
    }
}