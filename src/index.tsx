import {
  customModule,
  ControlElement,
  customElements,
  Container,
  moment,
  Modal
} from '@ijstech/components';
import { ScomCharts, formatNumber, groupByCategory, extractUniqueTimes, concatUnique, groupArrayByKey, formatNumberByFormat, isNumeric } from '@scom/scom-charts';
import { IBarChartConfig, IBarChartOptions } from './interfaces';
import configData from './data.json';
import { getBuilderSchema, getEmbedderSchema } from './formSchema';
import types from './dts/index';


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

interface ICustomWidget {
  showConfigurator: (parent: Modal, prop: string) => void;
  register: () => { types: string; defaultData: IBarChartConfig };
}

@customModule
@customElements('i-scom-bar-chart', {
  icon: 'chart-bar',
  className: 'ScomBarChart',
  props: {
    data: {type: 'object'}
  },
  events: {}
})
export default class ScomBarChart extends ScomCharts<IBarChartOptions> implements ICustomWidget {

  static async create(options?: ScomBarChartElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: ScomBarChartElement) {
    super(parent, options);
  }

  register() {
    return { types, defaultData: configData.defaultBuilderData as IBarChartConfig };
  }

  getFormSchema(columns: string[]) {
    return {
      builderSchema: getBuilderSchema(columns),
      embededSchema: getEmbedderSchema(columns)
    }
  }

  getChartData() {
    const { options } = this.model.getData();
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
    return { chartData: _chartData, defaulBuildertData: configData.defaultBuilderData as IBarChartConfig };
  }

  async init() {
    super.init();
  }
}