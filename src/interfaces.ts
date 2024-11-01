import { ModeType } from "@scom/scom-chart-data-source-setup"

export interface IBarChartOptions {
  xColumn?: {
    key: string,
    type: 'time' | 'category',
    timeFormat?: string
  },
  yColumns?: string[],
  groupBy?: string,
  seriesOptions?: {
    key: string,
    title?: string,
    color?: string
  }[],
  stacking?: boolean,
  xAxis?: {
    title?: string,
    fontColor?: string,
    tickFormat?: string,
    reverseValues?: boolean
  },
  yAxis?: {
    title?: string,
    fontColor?: string,
    tickFormat?: string,
    labelFormat?: string,
    position?: 'left' | 'right'
  },
  legend?: {
    show?: boolean,
    fontColor?: string,
    scroll?: boolean,
    position?: 'top' | 'bottom' | 'left' | 'right'
  },
  padding?: {
    top?: number,
    bottom?: number,
    left?: number,
    right?: number
  },
  mergeDuplicateData?: boolean,
  showDataLabels?: boolean,
  percentage?: boolean
}

export interface IBarChartConfig {
  dataSource: string;
  queryId?: string;
  apiEndpoint?: string;
  title: string,
  description?: string,
  options: IBarChartOptions,
  file?: {
    cid: string,
    name: string
  },
  mode: ModeType
}

