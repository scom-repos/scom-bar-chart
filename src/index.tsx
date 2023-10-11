import {
  Module,
  customModule,
  ControlElement,
  customElements,
  Container,
  IDataSchema,
  HStack,
  Label,
  VStack,
  Styles,
  Panel,
  BarChart,
  moment,
  Button,
  IUISchema
} from '@ijstech/components';
import { IBarChartConfig, formatNumber, groupByCategory, extractUniqueTimes, concatUnique, groupArrayByKey, formatNumberByFormat, IBarChartOptions, isNumeric } from './global/index';
import { chartStyle, containerStyle, textStyle } from './index.css';
import assets from './assets';
import configData from './data.json';
import ScomChartDataSourceSetup, { ModeType, fetchContentByCID, callAPI, DataSource } from '@scom/scom-chart-data-source-setup';
import { getBuilderSchema, getEmbedderSchema } from './formSchema';
import ScomBarChartDataOptionsForm from './dataOptionsForm';
const Theme = Styles.Theme.ThemeVars;

interface ScomBarChartElement extends ControlElement {
  lazyLoad?: boolean;
  data: IBarChartConfig;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-bar-chart']: ScomBarChartElement;
    }
  }
}

const DefaultData: IBarChartConfig = {
  dataSource: DataSource.Dune,
  queryId: '',
  apiEndpoint: '',
  title: '',
  options: undefined,
  mode: ModeType.LIVE
};

@customModule
@customElements('i-scom-bar-chart')
export default class ScomBarChart extends Module {
  private chartContainer: VStack;
  private vStackInfo: HStack;
  private pnlChart: Panel;
  private loadingElm: Panel;
  private lbTitle: Label;
  private lbDescription: Label;
  private columnNames: string[] = [];
  private chartData: { [key: string]: string | number }[] = [];

  private _data: IBarChartConfig = DefaultData;
  tag: any = {};
  defaultEdit: boolean = true;

  static async create(options?: ScomBarChartElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: ScomBarChartElement) {
    super(parent, options);
  }

  private getData() {
    return this._data;
  }

  private async setData(data: IBarChartConfig) {
    if (!data?.mode) data.mode = ModeType.LIVE;
    this._data = data;
    this.updateChartData();
  }

  private getTag() {
    return this.tag;
  }

  private async setTag(value: any, fromParent?: boolean) {
    if (fromParent) {
      this.tag.parentFontColor = value.fontColor;
      this.tag.parentCustomFontColor = value.customFontColor;
      this.tag.parentBackgroundColor = value.backgroundColor;
      this.tag.parentCustomBackgroundColor = value.customBackgoundColor;
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

  private _getActions(dataSchema: IDataSchema, uiSchema: IUISchema, advancedSchema?: IDataSchema) {
    const builderSchema = getBuilderSchema(this.columnNames);
    const actions = [
      {
        name: 'Edit',
        icon: 'edit',
        command: (builder: any, userInputData: any) => {
          let oldData: IBarChartConfig = DefaultData;
          let oldTag = {};
          return {
            execute: async () => {
              oldData = JSON.parse(JSON.stringify(this._data));
              const {
                title,
                description,
                options,
                ...themeSettings
              } = userInputData;

              const generalSettings = {
                title,
                description,
              };

              if (advancedSchema) {
                this._data = { ...this._data, ...generalSettings };
              } else {
                this._data = { ...generalSettings as IBarChartConfig, options };
              }
              if (builder?.setData) builder.setData(this._data);
              this.setData(this._data);

              oldTag = JSON.parse(JSON.stringify(this.tag));
              if (builder?.setTag) builder.setTag(themeSettings);
              else this.setTag(themeSettings);
            },
            undo: () => {
              if (advancedSchema) oldData = { ...oldData, options: this._data.options };
              if (builder?.setData) builder.setData(oldData);
              this.setData(oldData);

              this.tag = JSON.parse(JSON.stringify(oldTag));
              if (builder?.setTag) builder.setTag(this.tag);
              else this.setTag(this.tag);
            },
            redo: () => { }
          }
        },
        userInputDataSchema: dataSchema,
        userInputUISchema: uiSchema
      },
      {
        name: 'Data',
        icon: 'database',
        command: (builder: any, userInputData: any) => {
          let _oldData: IBarChartConfig = DefaultData;
          return {
            execute: async () => {
              _oldData = { ...this._data };
              if (userInputData?.mode) this._data.mode = userInputData?.mode;
              if (userInputData?.file) this._data.file = userInputData?.file;
              if (userInputData?.dataSource) this._data.dataSource = userInputData?.dataSource;
              if (userInputData?.queryId) this._data.queryId = userInputData?.queryId;
              if (userInputData?.apiEndpoint) this._data.apiEndpoint = userInputData?.apiEndpoint;
              if (userInputData?.options !== undefined) this._data.options = userInputData.options;
              if (builder?.setData) builder.setData(this._data);
              this.setData(this._data);
            },
            undo: () => {
              if (builder?.setData) builder.setData(_oldData);
              this.setData(_oldData);
            },
            redo: () => { }
          }
        },
        customUI: {
          render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => {
            const vstack = new VStack(null, { gap: '1rem' });
            const dataSourceSetup = new ScomChartDataSourceSetup(null, {
              ...this._data,
              chartData: JSON.stringify(this.chartData),
              onCustomDataChanged: async (dataSourceSetupData: any) => {
                if (onChange) {
                  onChange(true, {
                    ...this._data,
                    ...dataSourceSetupData
                  });
                }
              }
            });
            const hstackBtnConfirm = new HStack(null, {
              verticalAlignment: 'center',
              horizontalAlignment: 'end'
            });
            const button = new Button(null, {
              caption: 'Confirm',
              width: 'auto',
              height: 40,
              font: { color: Theme.colors.primary.contrastText }
            });
            hstackBtnConfirm.append(button);
            vstack.append(dataSourceSetup);
            const dataOptionsForm = new ScomBarChartDataOptionsForm(null, {
              options: this._data.options,
              dataSchema: JSON.stringify(advancedSchema),
              uiSchema: JSON.stringify(builderSchema.advanced.uiSchema)
            });
            vstack.append(dataOptionsForm);
            vstack.append(hstackBtnConfirm);
            if (onChange) {
              dataOptionsForm.onCustomInputChanged = async (optionsFormData: any) => {
                onChange(true, {
                  ...this._data,
                  ...optionsFormData,
                  ...dataSourceSetup.data
                });
              }
            }
            button.onClick = async () => {
              const { dataSource, file, mode } = dataSourceSetup.data;
              if (mode === ModeType.LIVE && !dataSource) return;
              if (mode === ModeType.SNAPSHOT && !file?.cid) return;
              if (onConfirm) {
                const optionsFormData = await dataOptionsForm.refreshFormData();
                onConfirm(true, {
                  ...this._data,
                  ...optionsFormData,
                  ...dataSourceSetup.data
                });
              }
            }
            return vstack;
          }
        }
      }
    ]
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
    return actions
  }

  getConfigurators() {
    const self = this;
    return [
      {
        name: 'Builder Configurator',
        target: 'Builders',
        getActions: () => {
          const builderSchema = getBuilderSchema(this.columnNames);
          const dataSchema = builderSchema.dataSchema as IDataSchema;
          const uiSchema = builderSchema.uiSchema as IUISchema;
          const advancedSchema = builderSchema.advanced.dataSchema as any;
          return this._getActions(dataSchema, uiSchema, advancedSchema);
        },
        getData: this.getData.bind(this),
        setData: async (data: IBarChartConfig) => {
          const defaultData = configData.defaultBuilderData;
          await this.setData({ ...defaultData, ...data });
        },
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      },
      {
        name: 'Emdedder Configurator',
        target: 'Embedders',
        getActions: () => {
          const embedderSchema = getEmbedderSchema(this.columnNames);
          const dataSchema = embedderSchema.dataSchema as any;
          const uiSchema = embedderSchema.uiSchema as IUISchema;
          return this._getActions(dataSchema, uiSchema);
        },
        getLinkParams: () => {
          const data = this._data || {};
          return {
            data: window.btoa(JSON.stringify(data))
          }
        },
        setLinkParams: async (params: any) => {
          if (params.data) {
            const utf8String = decodeURIComponent(params.data);
            const decodedString = window.atob(utf8String);
            const newData = JSON.parse(decodedString);
            let resultingData = {
              ...self._data,
              ...newData
            };
            await this.setData(resultingData);
          }
        },
        getData: this.getData.bind(this),
        setData: this.setData.bind(this),
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      }
    ]
  }

  private updateStyle(name: string, value: any) {
    value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
  }

  private updateTheme() {
    if (this.chartContainer) {
      this.chartContainer.style.boxShadow = this.tag?.darkShadow ? '0 -2px 10px rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
    }
    const tags = this.tag || {};
    this.updateStyle('--custom-text-color', tags.customFontColor ? tags.fontColor : tags.parentCustomFontColor ? tags.parentFontColor : '');
    this.updateStyle('--custom-background-color', tags.customBackgroundColor ? tags.backgroundColor : tags.parentCustomBackgroundColor ? tags.parentBackgroundColor : '');
  }

  private onUpdateBlock() {
    this.renderChart();
    this.updateTheme();
  }

  private async updateChartData() {
    this.loadingElm.visible = true;
    if (this._data?.mode === ModeType.SNAPSHOT)
      await this.renderSnapshotData();
    else
      await this.renderLiveData();
    this.loadingElm.visible = false;
  }

  private async renderSnapshotData() {
    if (this._data.file?.cid) {
      try {
        const data = await fetchContentByCID(this._data.file.cid);
        if (data) {
          const { metadata, rows } = data;
          this.chartData = rows;
          this.columnNames = metadata?.column_names || [];
          this.onUpdateBlock();
          return;
        }
      } catch { }
    }
    this.chartData = [];
    this.columnNames = [];
    this.onUpdateBlock();
  }

  private async renderLiveData() {
    const dataSource = this._data.dataSource as DataSource;
    if (dataSource) {
      try {
        const data = await callAPI({
          dataSource,
          queryId: this._data.queryId,
          apiEndpoint: this._data.apiEndpoint
        });
        if (data) {
          const { metadata, rows } = data;
          this.chartData = rows;
          this.columnNames = metadata?.column_names || [];
          this.onUpdateBlock();
          return;
        }
      } catch { }
    }
    this.chartData = [];
    this.columnNames = [];
    this.onUpdateBlock();
  }

  private renderChart() {
    if ((!this.pnlChart && this._data.options) || !this._data.options) return;
    const { title, description, options } = this._data;
    this.lbTitle.caption = title;
    this.lbDescription.caption = description;
    this.lbDescription.visible = !!description;
    this.pnlChart.height = `calc(100% - ${this.vStackInfo.offsetHeight + 10}px)`;
    const { xColumn, yColumns, groupBy, seriesOptions, mergeDuplicateData, stacking, legend, showDataLabels, percentage, xAxis, yAxis, padding = {} } = options;
    const { key, type, timeFormat } = xColumn;
    let _legend = {
      show: legend?.show,
    }
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
      const group = groupByCategory(arr, groupBy, key, yColumns[0]);
      const times = extractUniqueTimes(arr, key);
      let groupData: { [key: string]: any[] } = {};
      const keys = Object.keys(group);
      keys.map(v => {
        const _data = concatUnique(times, group[v]);
        groupData[v] = groupArrayByKey(Object.keys(_data).map(m => [type === 'time' ? moment(m, timeFormat).toDate() : m, _data[m]]), mergeDuplicateData);
      });
      const isPercentage = percentage && groupData[keys[0]] && isNumeric(groupData[keys[0]][0][1]);
      _series = keys.map(v => {
        const seriesOpt = seriesOptions?.find(f => f.key === v);
        let _data = [];
        if (isPercentage) {
          _data = groupData[v].map((vals, idx) => {
            let total = 0;
            for (const k of keys) {
              total += groupData[k][idx][1];
            }
            return [vals[0], (vals[1] / total) * 100];
          });
        } else {
          _data = groupData[v];
        }
        return {
          name: seriesOpt?.title || v,
          type: 'bar',
          stack: stacking,
          itemStyle: seriesOpt?.color ? { color: seriesOpt.color } : undefined,
          emphasis: {
            focus: 'series'
          },
          showSymbol: false,
          label: showDataLabels ? {
            show: true,
            formatter: function (params: any) {
              return formatNumber(params.value);
            }
          } : undefined,
          data: _data
        }
      });
    } else {
      let groupData: { [key: string]: any[] } = {};
      let isPercentage = percentage && arr.length > 0;
      yColumns.map(col => {
        if (isPercentage && !isNumeric(arr[0][col])) {
          isPercentage = false;
        }
        groupData[col] = groupArrayByKey(arr.map(v => [type === 'time' ? moment(v[key], timeFormat).toDate() : col, v[col]]), mergeDuplicateData);
      });
      _series = yColumns.map((col) => {
        let _data = [];
        const seriesOpt = seriesOptions?.find(f => f.key === col);
        if (isPercentage) {
          _data = groupData[col].map((vals, idx) => {
            let total = 0;
            for (const k of yColumns) {
              total += groupData[k][idx][1];
            }
            return [vals[0], (vals[1] / total) * 100];
          });
        } else {
          _data = groupData[col];
        }
        return {
          name: seriesOpt?.title || col,
          type: 'bar',
          stack: stacking,
          itemStyle: seriesOpt?.color ? { color: seriesOpt.color } : undefined,
          emphasis: {
            focus: 'series'
          },
          showSymbol: false,
          label: showDataLabels ? {
            show: true,
            formatter: function (params: any) {
              return formatNumber(params.value);
            }
          } : undefined,
          data: _data
        }
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
    }
    const _chartData: any = {
      tooltip: {
        trigger: 'axis',
        position: function (point: any, params: any, dom: any, rect: any, size: any) {
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
          if (x < 0) x = 0;
          if (y < 0) y = 0;
          return [x, y];
        },
        formatter: (params: any) => {
          let res = `<b>${xColumn.type === 'time' ? moment(params[0].axisValue).format('YYYY-MM-DD HH:mm') : params[0].axisValue}</b>`;
          if (_series.length === 1) {
            res += `<div style="display: flex; justify-content: space-between; gap: 10px"><span>${params[0].marker} ${params[0].seriesName}</span> ${params[0].value[1] === null ? '-' : percentage ? formatNumber(params[0].value[1], { percentValues: true }) : formatNumberByFormat(params[0].value[1], yAxis?.labelFormat ? yAxis.labelFormat : undefined)}</div>`;
          } else {
            for (const param of params) {
              if (param.value[1] !== null) {
                res += `<div style="display: flex; justify-content: space-between; gap: 10px"><span>${param.marker} ${param.seriesName}</span> ${percentage ? formatNumber(param.value[1], { percentValues: true }) : formatNumberByFormat(param.value[1], yAxis?.labelFormat ? yAxis.labelFormat : undefined)}</div>`;
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
      grid: {
        containLabel: true,
        ...gridPadding
      },
      xAxis: {
        type: type,
        boundaryGap: false,
        inverse: xAxis?.reverseValues,
        name: xAxis?.title || '',
        nameLocation: 'center',
        nameGap: xAxis?.title ? 25 : 15,
        nameTextStyle: {
          fontWeight: 'bold',
          color: xAxis?.fontColor
        },
        axisLabel: {
          fontSize: 10,
          color: xAxis?.fontColor,
          hideOverlap: true,
          formatter: xAxis?.tickFormat ? (value: number, index: number) => {
            if (type === 'time') {
              return moment(value).format(xAxis.tickFormat)
            } else {
              if (isNaN(value)) return value;
              return formatNumber(value, { format: xAxis.tickFormat, decimals: 2 })
            }
          } : undefined
        }
      },
      yAxis: {
        type: 'value',
        name: yAxis?.title || '',
        nameLocation: 'center',
        nameGap: yAxis?.title ? 40 : 15,
        nameTextStyle: {
          fontWeight: 'bold',
          color: yAxis?.fontColor
        },
        position: yAxis?.position || 'left',
        // min: isSingle ? min : undefined,
        // max: isSingle ? max : undefined,
        // interval: isSingle ? roundedInterval : undefined,
        axisLabel: {
          // showMinLabel: false,
          // showMaxLabel: false,
          fontSize: 10,
          color: yAxis?.fontColor,
          position: 'end',
          formatter: (value: number, index: number) => {
            return formatNumber(value, { format: yAxis?.tickFormat, decimals: 2, percentValues: percentage })
          }
        },
        splitNumber: 4
      },
      series: _series
    };
    this.pnlChart.clearInnerHTML();
    const chart = new BarChart(this.pnlChart, {
      data: _chartData,
      width: '100%',
      height: '100%'
    });
    chart.data = _chartData;
    chart.drawChart();
  }

  private resizeChart() {
    if (this.pnlChart) {
      (this.pnlChart.firstChild as BarChart)?.resize();
    }
  }

  async init() {
    this.isReadyCallbackQueued = true;
    super.init();
    this.updateTheme();
    this.setTag({
      darkShadow: false,
      height: 500
    })
    this.classList.add(chartStyle);
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
    return (
      <i-vstack
        id="chartContainer"
        position="relative"
        height="100%"
        padding={{ top: 10, bottom: 10, left: 10, right: 10 }}
        class={containerStyle}
      >
        <i-vstack id="loadingElm" class="i-loading-overlay" visible={false}>
          <i-vstack class="i-loading-spinner" horizontalAlignment="center" verticalAlignment="center">
            <i-icon
              class="i-loading-spinner_icon"
              image={{ url: assets.fullPath('img/loading.svg'), width: 36, height: 36 }}
            />
          </i-vstack>
        </i-vstack>
        <i-vstack
          id="vStackInfo"
          width="100%"
          maxWidth="100%"
          margin={{ left: 'auto', right: 'auto', bottom: 10 }}
          verticalAlignment="center"
        >
          <i-label id="lbTitle" font={{ bold: true }} class={textStyle} />
          <i-label id="lbDescription" margin={{ top: 5 }} class={textStyle} />
        </i-vstack>
        <i-panel id="pnlChart" width="100%" height="inherit" />
      </i-vstack>
    )
  }
}